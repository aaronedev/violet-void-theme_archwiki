const test = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const child_process = require('child_process')
const { tryAddFile } = require('../../../scripts/build.js')

test('tryAddFile', async (t) => {
  let execSyncCalls = []
  let fsExistsSyncResult = true

  // Mock console.log to suppress noise and potentially assert on it
  const originalConsoleLog = console.log
  let consoleLogs = []
  console.log = (msg) => consoleLogs.push(msg)

  // Mock fs.existsSync
  const originalExistsSync = fs.existsSync
  fs.existsSync = (path) => {
    return fsExistsSyncResult
  }

  // Mock child_process.execSync
  const originalExecSync = child_process.execSync
  let execSyncImpl = (cmd) => {
    execSyncCalls.push(cmd)
  }
  child_process.execSync = (cmd, opts) => execSyncImpl(cmd, opts)

  t.afterEach(() => {
    execSyncCalls = []
    consoleLogs = []
    fsExistsSyncResult = true
    execSyncImpl = (cmd) => {
      execSyncCalls.push(cmd)
    }
  })

  // Cleanup after all tests
  t.after(() => {
    console.log = originalConsoleLog
    fs.existsSync = originalExistsSync
    child_process.execSync = originalExecSync
  })

  await t.test('returns false if file does not exist', () => {
    fsExistsSyncResult = false
    const result = tryAddFile('some-file.txt')
    assert.strictEqual(result, false)
    assert.strictEqual(execSyncCalls.length, 0)
    assert.match(consoleLogs[0], /Skipping auto-commit: missing some-file.txt/)
  })

  await t.test('returns true on successful git add', () => {
    fsExistsSyncResult = true
    const result = tryAddFile('some-file.txt')
    assert.strictEqual(result, true)
    assert.deepStrictEqual(execSyncCalls, ['git add some-file.txt'])
  })

  await t.test('returns false on git add error (no force)', () => {
    fsExistsSyncResult = true
    execSyncImpl = (cmd) => {
      const error = new Error('Command failed')
      throw error
    }
    const result = tryAddFile('some-file.txt')
    assert.strictEqual(result, false)
    assert.match(
      consoleLogs[0],
      /Skipping auto-commit: unable to add some-file.txt \(Command failed\)/
    )
  })

  await t.test('returns true on git add error but successful force add', () => {
    fsExistsSyncResult = true
    execSyncImpl = (cmd) => {
      if (cmd === 'git add some-file.txt') {
        const error = new Error('Ignored file')
        throw error
      }
      execSyncCalls.push(cmd)
    }
    const result = tryAddFile('some-file.txt', { forceIfIgnored: true })
    assert.strictEqual(result, true)
    assert.deepStrictEqual(execSyncCalls, ['git add -f some-file.txt'])
    assert.match(consoleLogs[0], /Added ignored file: some-file.txt/)
  })

  await t.test('returns false on git add error and failed force add', () => {
    fsExistsSyncResult = true
    execSyncImpl = (cmd) => {
      const error = new Error('Force command failed')
      throw error
    }
    const result = tryAddFile('some-file.txt', { forceIfIgnored: true })
    assert.strictEqual(result, false)
    assert.match(
      consoleLogs[0],
      /Skipping auto-commit: unable to add some-file.txt \(Force command failed\)/
    )
  })
})
