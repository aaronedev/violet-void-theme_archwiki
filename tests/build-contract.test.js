const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const postcss = require('postcss')

const repositoryRoot = path.resolve(__dirname, '..')
const canonicalFilename = 'violet-void-theme-archwiki.user.css'

function createFixture() {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'violet-void-build-'))

  fs.cpSync(path.join(repositoryRoot, 'src'), path.join(rootDir, 'src'), {
    recursive: true,
  })
  fs.cpSync(
    path.join(repositoryRoot, 'scripts'),
    path.join(rootDir, 'scripts'),
    {
      recursive: true,
    }
  )
  fs.copyFileSync(
    path.join(repositoryRoot, 'package.json'),
    path.join(rootDir, 'package.json')
  )
  fs.symlinkSync(
    path.join(repositoryRoot, 'node_modules'),
    path.join(rootDir, 'node_modules'),
    'dir'
  )

  return rootDir
}

function runBuild(rootDir, { observeGit = false } = {}) {
  const env = { ...process.env }
  let gitMarker

  if (observeGit) {
    const binDir = path.join(rootDir, 'test-bin')
    gitMarker = path.join(rootDir, 'git-invoked')
    fs.mkdirSync(binDir, { recursive: true })
    fs.writeFileSync(
      path.join(binDir, 'git'),
      `#!/bin/sh\nprintf invoked > "${gitMarker}"\nexit 1\n`,
      { mode: 0o755 }
    )
    env.PATH = `${binDir}:${env.PATH}`
    delete env.CI
    delete env.SKIP_GIT_COMMIT
  }

  const result = spawnSync(process.execPath, ['scripts/build.js'], {
    cwd: rootDir,
    encoding: 'utf8',
    env,
  })

  assert.equal(
    result.status,
    0,
    `build failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  )

  return { gitMarker }
}

function readProducedCss(rootDir) {
  const outputPath = path.join(rootDir, 'dist', canonicalFilename)

  assert.ok(fs.existsSync(outputPath), 'build did not produce a CSS artifact')
  return { css: fs.readFileSync(outputPath, 'utf8'), outputPath }
}

function rulesContaining(root, selectorFragment) {
  return root.nodes
    .flatMap((node) => (node.type === 'atrule' ? node.nodes || [] : [node]))
    .filter(
      (node) => node.type === 'rule' && node.selector.includes(selectorFragment)
    )
}

function declarationValue(rule, property) {
  return rule.nodes.find(
    (node) => node.type === 'decl' && node.prop === property
  )?.value
}

function removeFixture(rootDir) {
  fs.rmSync(rootDir, { recursive: true, force: true })
}

test('scoped UserCSS extraction returns only ordered inner CSS', () => {
  const { extractScopedCss } = require('../scripts/lib/userstyle-test-css')
  const userCss = `/* ==UserStyle==
@name Example
==/UserStyle== */

@-moz-document domain("archlinux.org") {
  body { color: red; }
  a { color: blue; }
}`

  const css = extractScopedCss(userCss)

  assert.doesNotMatch(css, /UserStyle|-moz-document/)
  assert.match(css, /^\s*body \{ color: red; \}/)
  assert.ok(css.indexOf('body') < css.indexOf('a {'))
})

test('scoped UserCSS extraction requires exactly one document scope', () => {
  const { extractScopedCss } = require('../scripts/lib/userstyle-test-css')

  assert.throws(
    () => extractScopedCss('body { color: red; }'),
    /exactly one top-level @-moz-document/
  )
  assert.throws(
    () =>
      extractScopedCss(
        '@-moz-document domain("archlinux.org") {}\n@-moz-document domain("example.com") {}'
      ),
    /exactly one top-level @-moz-document/
  )
})

test('scoped UserCSS extraction rejects non-comment top-level content', () => {
  const { extractScopedCss } = require('../scripts/lib/userstyle-test-css')
  const userCss =
    '/* metadata */\n@-moz-document domain("archlinux.org") { body { color: red; } }\nhtml { color: blue; }'

  assert.throws(
    () => extractScopedCss(userCss),
    /top-level rule outside @-moz-document/
  )
})

test('scope normalizer rejects top-level ordinary rules', () => {
  const { scopeBubbledAtRules } = require('../scripts/lib/userstyle-build')
  const css =
    '@-moz-document domain("archlinux.org"){a{color:blue}}body{color:red}'

  assert.throws(
    () => scopeBubbledAtRules(css),
    /Refusing to relocate top-level rule outside @-moz-document/
  )
})

test('generated CSS has one site scope and no global style rules', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const root = postcss.parse(css)
    const documentSections = root.nodes.filter(
      (node) => node.type === 'atrule' && node.name === '-moz-document'
    )
    const unscopedStyleNodes = root.nodes.filter(
      (node) => node.type !== 'comment' && node !== documentSections[0]
    )

    assert.equal(documentSections.length, 1)
    for (const matcher of [
      'url-prefix("https://wiki.archlinux.org")',
      'url-prefix("http://wiki.archlinux.org")',
      'domain("archlinux.org")',
      'domain("wiki.archlinux.org")',
      'domain("bbs.archlinux.org")',
      'domain("aur.archlinux.org")',
      'domain("bugs.archlinux.org")',
      'domain("gitlab.archlinux.org")',
      'domain("repos.archlinux.org")',
      'domain("security.archlinux.org")',
      'domain("lists.archlinux.org")',
      'domain("man.archlinux.org")',
    ]) {
      assert.ok(
        documentSections[0].params.includes(matcher),
        `site scope is missing ${matcher}`
      )
    }
    assert.equal(
      unscopedStyleNodes.length,
      0,
      `found ${unscopedStyleNodes.length} top-level style sections outside the site scope`
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('build is deterministic and never rewrites package.json or invokes Git', () => {
  const rootDir = createFixture()

  try {
    const packagePath = path.join(rootDir, 'package.json')
    const packageBefore = fs.readFileSync(packagePath)
    const firstRun = runBuild(rootDir, { observeGit: true })
    const firstOutput = readProducedCss(rootDir).css
    const secondRun = runBuild(rootDir, { observeGit: true })
    const secondOutput = readProducedCss(rootDir).css

    assert.deepEqual(fs.readFileSync(packagePath), packageBefore)
    assert.equal(firstOutput, secondOutput)
    assert.equal(fs.existsSync(firstRun.gitMarker), false, 'build invoked Git')
    assert.equal(fs.existsSync(secondRun.gitMarker), false, 'build invoked Git')
  } finally {
    removeFixture(rootDir)
  }
})

test('canonical artifact has complete installable UserCSS metadata', () => {
  const rootDir = createFixture()

  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json')))
    runBuild(rootDir)
    const { css, outputPath } = readProducedCss(rootDir)

    assert.equal(path.basename(outputPath), canonicalFilename)
    assert.match(css, /^\/\* ==UserStyle==/)
    assert.match(css, /^@name\s+violet-void-theme_archwiki$/m)
    assert.match(
      css,
      /^@namespace\s+github\.com\/aaronedev\/violet-void-theme$/m
    )
    assert.match(css, new RegExp(`^@version\\s+${pkg.userStyle.version}$`, 'm'))
    assert.match(
      css,
      /^@homepageURL\s+https:\/\/github\.com\/aaronedev\/violet-void-theme_archwiki$/m
    )
    assert.match(
      css,
      /^@supportURL\s+https:\/\/github\.com\/aaronedev\/violet-void-theme_archwiki\/issues$/m
    )
    assert.match(
      css,
      /^@updateURL\s+https:\/\/raw\.githubusercontent\.com\/aaronedev\/violet-void-theme_archwiki\/main\/dist\/violet-void-theme-archwiki\.user\.css$/m
    )
    assert.match(css, /^@license\s+MIT$/m)
    assert.match(css, /==\/UserStyle== \*\//)
  } finally {
    removeFixture(rootDir)
  }
})

test('viewport height utilities are emitted exactly once each', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)

    for (const selector of ['h-dvh', 'h-svh', 'h-lvh']) {
      const matches = css.match(new RegExp(`\\.${selector}(?=[,{])`, 'g')) || []
      assert.equal(
        matches.length,
        1,
        `expected .${selector} once, found ${matches.length}`
      )
    }
  } finally {
    removeFixture(rootDir)
  }
})

test('void reading surface contracts are emitted in canonical CSS', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const documentRoot = postcss.parse(css)
    const scope = documentRoot.nodes.find(
      (node) => node.type === 'atrule' && node.name === '-moz-document'
    )
    const root = { nodes: scope.nodes }

    assert.equal(
      rulesContaining(root, '.mw-parser-output').some(
        (rule) => declarationValue(rule, 'animation-name') === 'reading-progress'
      ),
      false,
      'article content must not be the reading-progress target'
    )
    assert.match(
      css,
      /input\[type=["']checkbox["']\]:not\(\.vector-dropdown-checkbox\)/
    )
    assert.match(
      css,
      /\.vector-toc \.vector-toc-text\s*\{[^}]*word-break:\s*normal\s*!important;?[^}]*overflow-wrap:\s*normal\s*!important;?/s
    )
    assert.match(
      css,
      /\.vector-toc-list-item:has\(> \.vector-toc-toggle\)\s*>\s*\.vector-toc-link/
    )
    assert.match(
      css,
      /html\.client-nojs \.vector-page-titlebar-toc \.vector-dropdown-content\s*\{[^}]*width:\s*min\(22rem,\s*calc\(100vw - 2rem\)\)\s*!important;[^}]*max-height:\s*min\(60vh,\s*28rem\);[^}]*overflow-y:\s*auto;/s
    )
    assert.equal(
      rulesContaining(root, '.vector-page-titlebar-toc').some(
        (rule) => declarationValue(rule, 'display') === 'flex'
      ),
      false,
      'titlebar TOC must preserve Vector display behavior'
    )
    assert.match(
      css,
      /html\.vector-feature-toc-pinned-clientpref-1 \.vector-page-titlebar-toc\s*\{[^}]*display:\s*none;?/s
    )
    assert.match(
      css,
      /\.vector-toc \.vector-toc-toggle\s*\{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*width:\s*24px;[^}]*height:\s*24px;/s
    )
    assert.match(
      css,
      /\.vector-toc \.vector-toc-toggle \.vector-icon\s*\{[^}]*display:\s*none;?/s
    )
    assert.match(
      css,
      /\.vector-toc \.vector-toc-toggle::before\s*\{[^}]*content:\s*["']▸["']/s
    )
    assert.match(
      css,
      /\.vector-toc-list-item-expanded\s*>\s*\.vector-toc-toggle::before\s*\{[^}]*transform:\s*rotate\(90deg\)/s
    )
    assert.match(
      css,
      /html\.client-nojs #vector-toc-pinned-container\s*\{[^}]*width:\s*min\(22rem,\s*calc\(100vw - 2rem\)\)\s*!important;[^}]*max-width:\s*calc\(100vw - 2rem\)\s*!important;[^}]*max-height:\s*12rem;[^}]*box-sizing:\s*border-box;[^}]*overflow-y:\s*auto;/s
    )
    assert.doesNotMatch(css, /\.mw-parser-output a\.external::after\s*\{[^}]*content:\s*attr\(title\)/s)
    assert.doesNotMatch(css, /\.mw-parser-output a\.external\s*,\s*\.mw-parser-output \.link\s*\{[^}]*position:\s*relative/s)
    assert.doesNotMatch(css, /\.mw-footer\s*\{[^}]*position:\s*fixed/s)
    assert.match(
      css,
      /html body \.mw-parser-output a\s*\{[^}]*color:\s*#b3a7d8\s*!important;?/s
    )
    assert.match(
      css,
      /html body #content \.mw-parser-output a:not\(\[role=(?:"|')?button(?:"|')?\]\):not\(\.new\)(?:\s*,\s*html body \.mw-parser-output a)?\s*\{[^}]*color:\s*#b3a7d8\s*!important;?/s
    )
    assert.match(
      css,
      /html body \.mw-parser-output \.archwiki-template-(?:man|pkg) a[^}]*color:\s*#42ff97\s*!important/s
    )

    assert.ok(
      rulesContaining(root, '.wikitable').some(
        (rule) =>
          declarationValue(rule, 'box-shadow') === 'none' &&
          declarationValue(rule, 'border-radius') === '0'
      ),
      'primary wikitable must be flat'
    )
    for (const selector of ['.ambox', '.ombox', '.imbox', '.tmbox']) {
      assert.ok(
        rulesContaining(root, selector).some(
          (rule) => declarationValue(rule, 'box-shadow') === 'none'
        ),
        `${selector} must be flat`
      )
    }
    assert.ok(
      rulesContaining(root, 'h1::after').some(
        (rule) => declarationValue(rule, 'background') === '#8950c7'
      )
    )
    assert.ok(
      rulesContaining(root, 'h2').some(
        (rule) =>
          declarationValue(rule, 'border-bottom') ===
          '1px solid rgba(137,80,199,0.35)'
      )
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('canonical complete artifact is at most 1,000,000 bytes', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const artifactPath = path.join(rootDir, 'dist', canonicalFilename)

    assert.ok(fs.existsSync(artifactPath), `missing ${canonicalFilename}`)
    assert.ok(
      fs.statSync(artifactPath).size <= 1_000_000,
      'canonical artifact exceeds 1,000,000 bytes'
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('release rejects invalid versions without changing package.json', () => {
  for (const version of [undefined, '1', '1.2.', 'v1.2', '1..2']) {
    const rootDir = createFixture()

    try {
      const packagePath = path.join(rootDir, 'package.json')
      const packageBefore = fs.readFileSync(packagePath)
      const args = ['scripts/release.js']
      if (version !== undefined) args.push(version)
      const result = spawnSync(process.execPath, args, {
        cwd: rootDir,
        encoding: 'utf8',
      })

      assert.notEqual(result.status, 0, `release accepted ${String(version)}`)
      assert.match(result.stderr, /dot-separated numeric version/)
      assert.deepEqual(fs.readFileSync(packagePath), packageBefore)
    } finally {
      removeFixture(rootDir)
    }
  }
})

test('release updates userStyle.version and builds the canonical artifact', () => {
  const rootDir = createFixture()

  try {
    const version = '2099.07.21'
    const result = spawnSync(
      process.execPath,
      ['scripts/release.js', version],
      {
        cwd: rootDir,
        encoding: 'utf8',
      }
    )
    const pkg = JSON.parse(
      fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')
    )
    const artifactPath = path.join(rootDir, 'dist', canonicalFilename)

    assert.equal(
      result.status,
      0,
      `release failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
    )
    assert.equal(pkg.userStyle.version, version)
    assert.ok(fs.existsSync(artifactPath))
    assert.match(
      fs.readFileSync(artifactPath, 'utf8'),
      /^@version\s+2099\.07\.21$/m
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('release compilation failure preserves package and existing artifact bytes', () => {
  const rootDir = createFixture()

  try {
    const packagePath = path.join(rootDir, 'package.json')
    const artifactPath = path.join(rootDir, 'dist', canonicalFilename)
    const artifactBefore = Buffer.from([0, 255, 1, 254, 2, 253])
    const packageBefore = fs.readFileSync(packagePath)

    fs.mkdirSync(path.dirname(artifactPath), { recursive: true })
    fs.writeFileSync(artifactPath, artifactBefore)
    fs.writeFileSync(
      path.join(rootDir, 'src', 'main.styl'),
      'body\n  color rgba(\n'
    )

    const result = spawnSync(
      process.execPath,
      ['scripts/release.js', '2099.07.22'],
      {
        cwd: rootDir,
        encoding: 'utf8',
      }
    )

    assert.notEqual(result.status, 0, 'release unexpectedly succeeded')
    assert.deepEqual(fs.readFileSync(packagePath), packageBefore)
    assert.deepEqual(fs.readFileSync(artifactPath), artifactBefore)
  } finally {
    removeFixture(rootDir)
  }
})

test('watch uses the shared writer and builds once on startup', async () => {
  const rootDir = createFixture()

  try {
    const { startWatch } = require('../scripts/watch')
    const watcher = await startWatch({ rootDir, log: () => {} })
    const artifactPath = path.join(rootDir, 'dist', canonicalFilename)

    try {
      assert.ok(fs.existsSync(artifactPath))
    } finally {
      watcher.close()
    }
  } finally {
    removeFixture(rootDir)
  }
})
