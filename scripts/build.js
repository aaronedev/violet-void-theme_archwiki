const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const stylus = require('stylus')
const autoprefixer = require('autoprefixer-stylus')
const pkg = require('../package.json')

const inputFile = path.join(__dirname, '../src/main.styl')
const outputFile = path.join(__dirname, '../dist/main.css')
const distDir = path.dirname(outputFile)
const pkgFile = path.join(__dirname, '../package.json')

const isTruthy = (value) => ['1', 'true', 'yes'].includes(String(value).toLowerCase())
const autoCommitEnabled = !isTruthy(process.env.SKIP_GIT_COMMIT) && !isTruthy(process.env.CI)

const tryAutoCommit = (newVersion) => {
  if (!autoCommitEnabled) {
    return
  }

  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
  } catch {
    console.log('Skipping auto-commit: not a git repo')
    return
  }

  const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim()
  if (staged) {
    console.log('Skipping auto-commit: staged changes present')
    return
  }

  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim()
  if (!status) {
    console.log('Skipping auto-commit: working tree clean')
    return
  }

  const filesToCommit = ['package.json', 'dist/main.css']
  execSync(`git add ${filesToCommit.join(' ')}`, { stdio: 'inherit' })

  const stagedAfterAdd = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim()
  if (!stagedAfterAdd) {
    console.log('Skipping auto-commit: nothing staged after add')
    return
  }

  const message = `chore: verbump ${newVersion}`
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' })
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
