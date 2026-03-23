const test = require('node:test')
const assert = require('node:assert')
const cp = require('child_process')
const path = require('path')

test('build.js handles git commit failure', async (t) => {
  // Save original environment variables
  const origEnv = { ...process.env }

  // Set environment variables to enable auto-commit path
  process.env.SKIP_GIT_COMMIT = 'false'
  process.env.CI = 'false'
  process.env.RUN_GIT_HOOKS = 'false'

  // Clean up after the test
  t.after(() => {
    process.env = origEnv
  })

  let diffCallCount = 0

  // Mock execSync to simulate the specific git states
  const execSyncMock = t.mock.method(cp, 'execSync', (cmd) => {
    if (cmd.startsWith('git rev-parse')) {
      return '' // inside work tree
    }
    if (cmd === 'git diff --cached --name-only') {
      diffCallCount++
      // First time it's called (checking staged changes), return empty.
      // Second time (after tryAddFile), return 'package.json'
      if (diffCallCount === 1) return ''
      return 'package.json\n'
    }
    if (cmd === 'git status --porcelain') {
      return ' M package.json\n'
    }
    if (cmd.startsWith('git add')) {
      return ''
    }
    if (cmd.startsWith('git commit')) {
      throw new Error('Mocked commit failure')
    }
    return ''
  })

  // Mock console.log to intercept the output
  const logs = []
  t.mock.method(console, 'log', (msg) => {
    logs.push(msg)
  })

  // Clear the require cache to ensure the script runs
  const scriptPath = path.resolve(__dirname, '../../scripts/build.js')
  delete require.cache[scriptPath]

  // We require the build script. It immediately runs.
  require(scriptPath)

  // Wait a short amount of time to ensure async tasks (if any) finish
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Verify the log was produced
  const hasCommitFailureLog = logs.some((msg) =>
    typeof msg === 'string' && msg.includes('Skipping auto-commit: git commit failed (Mocked commit failure)')
  )

  assert.strictEqual(
    hasCommitFailureLog,
    true,
    'Should log git commit failure message\nLogs captured:\n' + logs.join('\n')
  )
})
