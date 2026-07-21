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
  const canonicalPath = path.join(rootDir, 'dist', canonicalFilename)
  const legacyPath = path.join(rootDir, 'dist', 'main.css')
  const outputPath = fs.existsSync(canonicalPath) ? canonicalPath : legacyPath

  assert.ok(fs.existsSync(outputPath), 'build did not produce a CSS artifact')
  return { css: fs.readFileSync(outputPath, 'utf8'), outputPath }
}

function removeFixture(rootDir) {
  fs.rmSync(rootDir, { recursive: true, force: true })
}

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
