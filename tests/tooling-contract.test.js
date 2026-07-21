const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')

function loadPlaywrightConfig(environment) {
  const configPath = path.join(root, 'playwright.config.js')
  const previous = {}

  for (const [name, value] of Object.entries(environment)) {
    previous[name] = process.env[name]
    if (value === undefined) delete process.env[name]
    else process.env[name] = value
  }

  delete require.cache[require.resolve(configPath)]

  try {
    return require(configPath)
  } finally {
    delete require.cache[require.resolve(configPath)]
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  }
}

test('explicit Chromium executable applies to desktop and mobile projects', () => {
  const executablePath = '/opt/chromium-explicit'
  const config = loadPlaywrightConfig({
    PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: executablePath,
    PLAYWRIGHT_MCP_EXECUTABLE_PATH: '/opt/chromium-mcp',
  })

  for (const name of ['chromium', 'Mobile Chrome']) {
    const project = config.projects.find((candidate) => candidate.name === name)
    assert.ok(project, `missing ${name} project`)
    assert.equal(project.use.launchOptions?.executablePath, executablePath)
  }
})

test('MCP Chromium executable is the compatibility fallback for both projects', () => {
  const executablePath = '/opt/chromium-mcp'
  const config = loadPlaywrightConfig({
    PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: undefined,
    PLAYWRIGHT_MCP_EXECUTABLE_PATH: executablePath,
  })

  for (const name of ['chromium', 'Mobile Chrome']) {
    const project = config.projects.find((candidate) => candidate.name === name)
    assert.equal(project.use.launchOptions?.executablePath, executablePath)
  }
})

test('visual scripts separate the reliable Chromium run from the full matrix', () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
  )

  assert.match(packageJson.scripts['test:visual'], /--project=chromium(?:\s|$)/)
  assert.equal(
    packageJson.scripts['test:visual:all'],
    'playwright test visual-regression',
  )
  assert.equal(
    packageJson.scripts['test:tooling'],
    'node --test tests/tooling-contract.test.js',
  )
})

test('Codex worktree environment installs, builds, and exposes core actions', () => {
  const environmentPath = path.join(
    root,
    '.codex',
    'environments',
    'environment.toml',
  )
  assert.ok(fs.existsSync(environmentPath), 'missing Codex environment config')

  const environment = fs.readFileSync(environmentPath, 'utf8')
  assert.match(environment, /^version\s*=\s*1\s*$/m)
  assert.match(environment, /^name\s*=\s*["']violet-void-theme-archwiki["']\s*$/m)
  assert.match(environment, /\[setup\]/)
  assert.match(environment, /\[setup\.linux\]/)

  function setupScript(section) {
    const escapedSection = section.replace('.', '\\.')
    const match = environment.match(
      new RegExp(
        `\\[${escapedSection}\\][\\s\\S]*?script\\s*=\\s*(?:'''|\"\"\")([\\s\\S]*?)(?:'''|\"\"\")`,
      ),
    )
    assert.ok(match, `missing ${section} script`)
    return match[1]
  }

  const setupScripts = [setupScript('setup'), setupScript('setup.linux')]

  const requiredSetupFragments = [
    'CODEX_WORKTREE_PATH:-$PWD',
    'set -euo pipefail',
    'npm ci',
    'npm run build',
    'npm run setup:stylus',
  ]
  for (const fragment of requiredSetupFragments) {
    for (const script of setupScripts) {
      assert.ok(script.includes(fragment), `setup must include ${fragment}`)
    }
  }

  for (const action of [
    'Build',
    'Build tests',
    'Visual Chromium',
    'Visual all browsers',
  ]) {
    assert.match(
      environment,
      new RegExp(`name\\s*=\\s*["']${action}["']`),
      `missing ${action} action`,
    )
  }
  for (const command of [
    'npm run build',
    'npm run test:build',
    'npm run test:visual',
    'npm run test:visual:all',
  ]) {
    assert.match(environment, new RegExp(command.replaceAll(' ', '\\s+')))
  }
})
