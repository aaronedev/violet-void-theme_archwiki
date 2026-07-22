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
  const matchingRules = []

  function visit(node) {
    if (node.type === 'rule' && node.selector.includes(selectorFragment)) {
      matchingRules.push(node)
    }

    for (const child of node.nodes || []) visit(child)
  }

  for (const node of root.nodes || []) visit(node)
  return matchingRules
}

function rulesWithSelector(root, selector) {
  const matchingRules = []

  function visit(node) {
    if (node.type === 'rule' && node.selectors.includes(selector)) {
      matchingRules.push(node)
    }

    for (const child of node.nodes || []) visit(child)
  }

  for (const node of root.nodes || []) visit(node)
  return matchingRules
}

function declarationValue(rule, property) {
  return rule.nodes.find(
    (node) => node.type === 'decl' && node.prop === property
  )?.value
}

test('rulesContaining finds rules nested in multiple at-rule levels', () => {
  const root = postcss.parse(
    '@media (min-width: 1px) { @supports (display: grid) { .nested-contract { color: red } } }'
  )

  assert.equal(rulesContaining(root, '.nested-contract').length, 1)
})

test('selector lookup excludes pseudo-state variants', () => {
  const root = postcss.parse(
    '@media (min-width: 1px) { .exact-contract { color: red } .exact-contract:active { color: green } .exact-contract:hover { color: blue } }'
  )

  assert.equal(rulesWithSelector(root, '.exact-contract').length, 1)
})

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

test('canonical artifact terminates the cascade layer order', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)

    assert.match(
      css,
      /^@layer base, components, utilities, overrides;$/m
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('canonical artifact emits only valid CSS comments', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)

    assert.doesNotMatch(css, /^\s*\/\//m)
  } finally {
    removeFixture(rootDir)
  }
})

test('starting-style rules are not hidden behind invalid feature queries', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const root = postcss.parse(css)
    const supportsRules = []
    const startingStyleRules = []

    root.walkAtRules('supports', (rule) => supportsRules.push(rule))
    root.walkAtRules('starting-style', (rule) => startingStyleRules.push(rule))

    assert.ok(startingStyleRules.length > 0, 'expected @starting-style rules')
    assert.equal(
      supportsRules.some((rule) => rule.params.includes('@starting-style')),
      false,
      '@starting-style cannot be tested as an @supports condition'
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('advanced table row filtering uses valid nth-child selector lists', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const root = postcss.parse(css)

    assert.doesNotMatch(css, /:nth-child\(of\s/)

    for (const selector of [
      'table tr:nth-child(n of :not(.header-row):not(.mw-empty-elt))',
      '.wikitable tr:nth-child(n of :not(.highlight):not(.mw-empty-elt)):hover',
      'table tbody tr:nth-child(n of :not(.header):not(.footer))',
      '.mw-parser-output table tr:nth-child(n of :not(.mw-empty-elt):not([style*="display: none"])).alternate',
      'table.striped tr:nth-child(odd of :not(.header-row):not(.mw-empty-elt))',
      'table.striped tr:nth-child(even of :not(.header-row):not(.mw-empty-elt))',
    ]) {
      assert.ok(
        rulesWithSelector(root, selector).length > 0,
        `missing valid filtered table selector ${selector}`
      )
    }
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

test('canonical CSS contains no discarded or malformed theme declarations', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const root = postcss.parse(css)
    const unresolvedStylusTokens = []
    const emptyRules = []
    const unscopedCustomProperties = []
    const descriptorOnlyProperties = new Set([
      'font-display',
      'size-adjust',
      'ascent-override',
      'descent-override',
      'line-gap-override',
    ])
    const descriptorsInOrdinaryRules = []
    const lengthOnlyTransforms = []
    const percentageIntrinsicSizes = []
    const percentageColumnWidths = []

    root.walk((node) => {
      if (
        node.type === 'decl' &&
        /\$[A-Za-z][\w-]*/.test(`${node.prop}:${node.value}`)
      ) {
        unresolvedStylusTokens.push(`${node.prop}:${node.value}`)
      }
      if (node.type === 'atrule' && /\$[A-Za-z][\w-]*/.test(node.params)) {
        unresolvedStylusTokens.push(`@${node.name} ${node.params}`)
      }
      if (
        node.type === 'rule' &&
        !node.nodes.some((child) => child.type !== 'comment')
      ) {
        emptyRules.push(node.selector)
      }
      if (
        node.type === 'decl' &&
        node.prop.startsWith('--') &&
        node.parent.type === 'atrule' &&
        node.parent.name === '-moz-document'
      ) {
        unscopedCustomProperties.push(node.prop)
      }
      if (
        node.type === 'decl' &&
        descriptorOnlyProperties.has(node.prop) &&
        node.parent.type === 'rule'
      ) {
        descriptorsInOrdinaryRules.push(
          `${node.parent.selector} { ${node.prop}:${node.value} }`
        )
      }
      if (
        node.type === 'decl' &&
        node.prop === 'transform' &&
        /^-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|vw|vh|vmin|vmax|cm|mm|in|pt|pc|q)$/.test(
          node.value
        )
      ) {
        lengthOnlyTransforms.push(`${node.parent.selector}:${node.value}`)
      }
      if (
        node.type === 'decl' &&
        [
          'contain-intrinsic-size',
          'contain-intrinsic-inline-size',
          'contain-intrinsic-block-size',
        ].includes(node.prop) &&
        node.value.includes('%')
      ) {
        percentageIntrinsicSizes.push(`${node.prop}:${node.value}`)
      }
      if (
        node.type === 'decl' &&
        node.prop === 'column-width' &&
        node.value.includes('%')
      ) {
        percentageColumnWidths.push(node.value)
      }
    })

    assert.deepEqual(unresolvedStylusTokens, [])
    assert.deepEqual(emptyRules, [])
    assert.deepEqual(unscopedCustomProperties, [])
    assert.deepEqual(descriptorsInOrdinaryRules, [])
    assert.deepEqual(lengthOnlyTransforms, [])
    assert.deepEqual(percentageIntrinsicSizes, [])
    assert.deepEqual(percentageColumnWidths, [])
    assert.doesNotMatch(css, /inset-block-autoinset-inline-automax-width/)

    const modalDialog = rulesWithSelector(root, '.modal-logical dialog')[0]
    assert.ok(modalDialog, 'missing .modal-logical dialog rule')
    assert.equal(declarationValue(modalDialog, 'inset-block'), 'auto')
    assert.equal(declarationValue(modalDialog, 'inset-inline'), 'auto')
    assert.equal(declarationValue(modalDialog, 'max-width'), '90vw')
    assert.equal(declarationValue(modalDialog, 'max-height'), '90vh')

    const spinKeyframes = []
    root.walkAtRules('keyframes', (atRule) => {
      if (atRule.params === 'spin') spinKeyframes.push(atRule)
    })
    assert.ok(spinKeyframes.length > 0, 'missing spin keyframes')
    for (const keyframes of spinKeyframes) {
      assert.ok(
        keyframes.nodes.every(
          (node) =>
            node.type === 'rule' &&
            node.selectors.every((selector) =>
              /^(?:from|to|(?:\d+(?:\.\d+)?%))$/.test(selector)
            )
        ),
        '@keyframes spin contains declarations or non-keyframe selectors'
      )
    }
    const bufferingRule = rulesWithSelector(root, 'video:buffering')[0]
    assert.ok(bufferingRule, 'missing video:buffering rule')
    assert.equal(declarationValue(bufferingRule, 'opacity'), '.8')
    assert.ok(
      rulesContaining(root, 'video:buffering .video-play-overlay').some(
        (rule) =>
          declarationValue(rule, 'background-color') ===
          'rgba(24,24,24,0.5)'
      ),
      'buffering overlay lost its themed background'
    )
    const pausedIndicator = rulesWithSelector(root, 'video:paused::after').find(
      (rule) => declarationValue(rule, 'border-style') === 'solid'
    )
    assert.ok(pausedIndicator, 'missing paused media indicator')
    assert.deepEqual(
      pausedIndicator.nodes
        .filter((node) => node.type === 'decl' && node.prop === 'opacity')
        .map((node) => node.value),
      ['0']
    )
    assert.ok(
      rulesWithSelector(root, 'video:paused:hover::after').some(
        (rule) => declarationValue(rule, 'opacity') === '.8'
      ),
      'paused media hover does not reveal the indicator'
    )

    for (const invalidKeyword of [
      'auto',
      'alphabetic',
      'hanging',
      'ideographic',
    ]) {
      assert.equal(
        root.nodes.length > 0 &&
          rulesContaining(root, `.initial-letter-${invalidKeyword}`).length,
        0,
        `invalid initial-letter keyword utility remains: ${invalidKeyword}`
      )
    }
    assert.ok(
      rulesWithSelector(root, '.initial-letter-3-2').some(
        (rule) => declarationValue(rule, 'initial-letter') === '3 2'
      ),
      'numeric initial-letter utility was removed'
    )

    const expandedCollapsible = rulesWithSelector(
      root,
      '.mw-collapsible:not(.mw-collapsed) .mw-collapsible-content'
    )[0]
    assert.equal(
      declarationValue(expandedCollapsible, 'content-visibility'),
      'visible'
    )
    assert.equal(
      declarationValue(expandedCollapsible, 'contain-intrinsic-size'),
      undefined
    )

    for (const selector of [
      '.infobox th',
      '.infobox td',
      '.wikitable th',
      '.vector-menu li:hover',
    ]) {
      assert.ok(rulesWithSelector(root, selector).length > 0, `${selector} missing`)
    }
    assert.doesNotMatch(css, /@supports\s*\(\s*@scope\s*\)/)

    const searchLabel = rulesContaining(
      root,
      '.cdx-menu-item__text__label'
    ).find((rule) => declarationValue(rule, 'display') === 'block')
    assert.equal(
      searchLabel.nodes.filter(
        (node) => node.type === 'decl' && node.prop === 'max-width'
      ).length,
      1
    )
    for (const selector of [
      '.cdx-text-input__icon-vue.cdx-text-input__start-icon svg',
      '.vector-icon svg',
    ]) {
      const blockSvgRule = rulesContaining(root, selector).find(
        (rule) => declarationValue(rule, 'display') === 'block'
      )
      assert.ok(blockSvgRule, `missing block SVG rule for ${selector}`)
      assert.equal(declarationValue(blockSvgRule, 'vertical-align'), undefined)
    }

    const activeToggle = rulesWithSelector(
      root,
      '.notification-types .notification-type .toggle-switch.active::after'
    )[0]
    assert.equal(
      declarationValue(activeToggle, 'transform'),
      'translateX(1.25rem)'
    )
    for (const [selector, expected] of [
      ['.navbox', '0 50px'],
      ['.references', '0 30px'],
      ['h1', '0 1em'],
      ['.mw-parser-output > p', '0 1.5em'],
      ['li', '0 1.5em'],
      ['tr', '0 1.5em'],
    ]) {
      assert.ok(
        rulesWithSelector(root, selector).some(
          (rule) => declarationValue(rule, 'contain-intrinsic-size') === expected
        ),
        `${selector} must emit contain-intrinsic-size:${expected}`
      )
    }
    assert.ok(
      rulesWithSelector(root, '.content-visibility-inline-full').some(
        (rule) =>
          declarationValue(rule, 'contain-intrinsic-inline-size') === '100vw'
      ),
      'full-inline content visibility utility must use a valid length'
    )
    assert.ok(
      rulesWithSelector(root, '.mw-gallery-masonry').some(
        (rule) =>
          rule.parent.type === 'atrule' &&
          rule.parent.name === 'media' &&
          rule.parent.params === '(max-width:480px)' &&
          declarationValue(rule, 'column-width') === 'auto' &&
          declarationValue(rule, 'grid-template-columns') === '1fr'
      ),
      'mobile masonry must retain a one-column grid with valid column width'
    )
  } finally {
    removeFixture(rootDir)
  }
})

test('reduced-data complex gradients use the Void base surface', () => {
  const rootDir = createFixture()

  try {
    runBuild(rootDir)
    const { css } = readProducedCss(rootDir)
    const root = postcss.parse(css)
    const reducedDataGradient = rulesWithSelector(root, '.complex-gradient').find(
      (rule) =>
        rule.parent.type === 'atrule' &&
        rule.parent.name === 'media' &&
        rule.parent.params === '(prefers-reduced-data:reduce)'
    )

    assert.ok(
      reducedDataGradient,
      'missing reduced-data .complex-gradient rule'
    )
    assert.equal(
      declarationValue(reducedDataGradient, 'background'),
      '#181818'
    )
    assert.doesNotMatch(css, /background:\s*simple(?:[;}])/)
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
    assert.ok(scope, 'canonical CSS must include @-moz-document scope')
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
      /\.vector-toc \.vector-toc-toggle\s*\{[^}]*background:\s*transparent;[^}]*border:\s*0;[^}]*box-shadow:\s*none;[^}]*width:\s*24px;[^}]*height:\s*24px;/s
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
      /html\.client-nojs #vector-toc-pinned-container\s*\{[^}]*width:\s*min\(22rem,\s*calc\(100vw - 2rem\)\)\s*!important;[^}]*max-width:\s*calc\(100vw - 2rem\)\s*!important;[^}]*max-height:\s*12rem\s*!important;[^}]*box-sizing:\s*border-box;[^}]*overflow-y:\s*auto;/s
    )
    assert.match(css, /@media \(max-width:768px\)\{[^}]*html\.client-nojs/s)
    assert.doesNotMatch(
      css,
      /@media \(max-width:\$breakpoint-sm\)\{html\.client-nojs/s
    )
    assert.doesNotMatch(css, /\.mw-parser-output a\.external::after\s*\{[^}]*content:\s*attr\(title\)/s)
    assert.doesNotMatch(css, /\.mw-parser-output a\.external\s*,\s*\.mw-parser-output \.link\s*\{[^}]*position:\s*relative/s)
    assert.doesNotMatch(css, /\.mw-footer\s*\{[^}]*position:\s*fixed/s)
    const currentRelatedArticlesRule = rulesContaining(
      root,
      '.archwiki-template-meta-related-articles'
    ).find((rule) => declarationValue(rule, 'background')?.includes('#181818'))
    const currentRelatedArticlesBackground = currentRelatedArticlesRule?.nodes.find(
      (node) => node.type === 'decl' && node.prop === 'background-color'
    )
    assert.equal(
      currentRelatedArticlesBackground?.value,
      '#181818',
      'current related-articles template must keep the dark Void surface'
    )
    assert.equal(
      currentRelatedArticlesBackground?.important,
      true,
      'current related-articles template must beat the mobile upstream surface'
    )
    assert.match(
      css,
      /html body \.mw-parser-output a:not\(\[role=(?:"|')?button(?:"|')?\]\):not\(\.new\)\s*\{[^}]*color:\s*#b3a7d8\s*!important;?/s
    )
    assert.match(
      css,
      /html body #content \.mw-parser-output a:not\(\[role=(?:"|')?button(?:"|')?\]\):not\(\.new\)(?:\s*,\s*html body \.mw-parser-output a:not\(\[role=(?:"|')?button(?:"|')?\]\):not\(\.new\))?\s*\{[^}]*color:\s*#b3a7d8\s*!important;?/s
    )
    assert.match(
      css,
      /html body \.mw-parser-output \.archwiki-template-(?:man|pkg) a:not\(\[role=(?:"|')?button(?:"|')?\]\):not\(\.new\)[^}]*color:\s*#42ff97\s*!important/s
    )

    const articleLinkSelectors = [
      'html body #content .mw-parser-output a:not([role="button"]):not(.new)',
      'html body .mw-parser-output a:not([role="button"]):not(.new)',
    ]
    for (const selector of articleLinkSelectors) {
      assert.ok(
        rulesWithSelector(root, selector).some(
          (rule) =>
            declarationValue(rule, 'color') === '#b3a7d8' &&
            rule.nodes.some(
              (node) =>
                node.type === 'decl' &&
                node.prop === 'color' &&
                node.important === true
            )
        ),
        `${selector} must preserve excluded link states`
      )
    }

    const terminalLinkSelectors = [
      'html body #content .mw-parser-output .archwiki-template-man a:not([role="button"]):not(.new)',
      'html body #content .mw-parser-output .archwiki-template-pkg a:not([role="button"]):not(.new)',
      'html body .mw-parser-output .archwiki-template-man a:not([role="button"]):not(.new)',
      'html body .mw-parser-output .archwiki-template-pkg a:not([role="button"]):not(.new)',
      '.archwiki-template-man a:not([role="button"]):not(.new)',
      '.archwiki-template-pkg a:not([role="button"]):not(.new)',
    ]
    for (const selector of terminalLinkSelectors) {
      assert.ok(
        rulesWithSelector(root, selector).some(
          (rule) =>
            declarationValue(rule, 'color') === '#42ff97' &&
            rule.nodes.some(
              (node) =>
                node.type === 'decl' &&
                node.prop === 'color' &&
                node.important === true
            )
        ),
        `${selector} must preserve excluded terminal-link states`
      )
    }

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
