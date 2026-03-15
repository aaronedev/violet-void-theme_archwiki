const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const stylus = require('stylus')
const autoprefixer = require('autoprefixer-stylus')
const pkg = require('../package.json')

const inputFile = path.join(__dirname, '../src/main.styl')
const outputFile = path.join(__dirname, '../dist/main.css')
const distDir = path.dirname(outputFile)
const pkgFile = path.join(__dirname, '../package.json')

const isTruthy = (value) =>
  ['1', 'true', 'yes'].includes(String(value).toLowerCase())
const autoCommitEnabled =
  !isTruthy(process.env.SKIP_GIT_COMMIT) && !isTruthy(process.env.CI)
const runGitHooks = isTruthy(process.env.RUN_GIT_HOOKS)

const tryAddFile = (filePath, { forceIfIgnored = false } = {}) => {
  const absolutePath = path.join(__dirname, '..', filePath)
  if (!fs.existsSync(absolutePath)) {
    console.log(`Skipping auto-commit: missing ${filePath}`)
    return false
  }

  try {
    execFileSync('git', ['add', filePath], { stdio: 'inherit' })
    return true
  } catch (error) {
    if (forceIfIgnored) {
      try {
        execFileSync('git', ['add', '-f', filePath], { stdio: 'inherit' })
        console.log(`Added ignored file: ${filePath}`)
        return true
      } catch (forceError) {
        const message =
          forceError && forceError.message
            ? forceError.message
            : String(forceError)
        console.log(
          `Skipping auto-commit: unable to add ${filePath} (${message})`
        )
        return false
      }
    }

    const message = error && error.message ? error.message : String(error)
    console.log(`Skipping auto-commit: unable to add ${filePath} (${message})`)
    return false
  }
}

const tryAutoCommit = (newVersion) => {
  if (!autoCommitEnabled) {
    return
  }

  try {
    execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      stdio: 'ignore',
    })
  } catch {
    console.log('Skipping auto-commit: not a git repo')
    return
  }

  const staged = execFileSync('git', ['diff', '--cached', '--name-only'], {
    encoding: 'utf8',
  }).trim()
  if (staged) {
    console.log('Skipping auto-commit: staged changes present')
    return
  }

  const status = execFileSync('git', ['status', '--porcelain'], {
    encoding: 'utf8',
  }).trim()
  if (!status) {
    console.log('Skipping auto-commit: working tree clean')
    return
  }

  const allowedChangedFiles = new Set(['package.json', 'dist/main.css'])
  const otherChanges = status
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.slice(2).trim())
    .map((filePath) => {
      const renameMatch = filePath.match(/.+ -> (.+)$/)
      return renameMatch ? renameMatch[1] : filePath
    })
    .filter((filePath) => !allowedChangedFiles.has(filePath))

  if (otherChanges.length) {
    console.log('Skipping auto-commit: other working tree changes present')
    return
  }

  tryAddFile('package.json')
  // dist/main.css is gitignored - don't force add
  // tryAddFile('dist/main.css', { forceIfIgnored: true })

  const stagedAfterAdd = execFileSync(
    'git',
    ['diff', '--cached', '--name-only'],
    {
      encoding: 'utf8',
    }
  ).trim()
  if (!stagedAfterAdd) {
    console.log('Skipping auto-commit: nothing staged after add')
    return
  }

  const message = `chore: verbump ${newVersion}`
  const noVerifyFlag = runGitHooks ? '' : ' --no-verify'
  try {
    const commitArgs = ['commit', '-m', message]
    if (!runGitHooks) commitArgs.push('--no-verify')
    execFileSync('git', commitArgs, { stdio: 'inherit' })
  } catch (error) {
    const errorMessage = error && error.message ? error.message : String(error)
    console.log(`Skipping auto-commit: git commit failed (${errorMessage})`)
  }
}

// Bump version
const now = new Date()
const pad = (n) => n.toString().padStart(2, '0')
const version = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.${pad(now.getHours())}.${pad(now.getMinutes())}`

pkg.userStyle.version = version
fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n')
console.log(`Bumped version to ${version}`)

// Create dist dir if not exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Generate UserStyle header
const header = `/* ==UserStyle==
@name         ${pkg.name}
@version      ${version}
@namespace    ${pkg.userStyle.namespace}
@description  ${pkg.description}
@author       ${pkg.author}
@github       ${pkg.repository.url}
@homepageURL  ${pkg.homepage}
@license      ${pkg.license}
==/UserStyle== */

`

const stylContent = fs.readFileSync(inputFile, 'utf8')

console.log('Building CSS...')

stylus(stylContent)
  .set('filename', inputFile)
  .set('compress', true)
  .use(autoprefixer())
  .render((err, css) => {
    if (err) {
      console.error('Error building CSS:', err)
      process.exit(1)
    }

    // Check if the original @document block was preserved (Stylus usually handles it)
    // If we want to move the @document block *after* the UserStyle header (which we do),
    // we just prepend the header.

    const finalCss = header + css
    fs.writeFileSync(outputFile, finalCss)
    console.log(`Build complete: ${outputFile}`)
    tryAutoCommit(version)
  })
