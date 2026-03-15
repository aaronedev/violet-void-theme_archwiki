#!/usr/bin/env node
/**
 * Console Error Fixer for ArchWiki Theme
 *
 * Runs a headless browser with Stylus extension, captures CSS console errors,
 * and applies automatic fixes to the source files.
 *
 * Usage:
 *   node scripts/console-fixer.js [--browser=firefox|chromium] [--dry-run] [--fix]
 */

const { chromium, firefox } = require('playwright')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const THEME_PATH = path.join(__dirname, '..', 'dist', 'main.css')
const SRC_DIR = path.join(__dirname, '..', 'src')
const EXTENSIONS_DIR = path.join(__dirname, '..', '.browser-extensions')

// CSS error patterns and their fixes
const ERROR_FIXES = {
  // Unknown property - wrap in @supports
  "Unknown property '(.+?)'": {
    action: 'wrap_supports',
    getMessage: (match) => `Property '${match[1]}' not supported`,
    getFix: (match) => `@supports (${match[1]}: auto)`,
  },
  // Unknown pseudo-class/element
  "Unknown pseudo-class or pseudo-element '(.+?)'": {
    action: 'wrap_supports_selector',
    getMessage: (match) => `Pseudo-element '${match[1]}' not supported`,
    getFix: (match) => `@supports selector(${match[1]})`,
  },
  // Unrecognized at-rule
  "Unrecognized at-rule or error parsing at-rule '(@.+?)'": {
    action: 'wrap_supports',
    getMessage: (match) => `At-rule '${match[1]}' not supported`,
    getFix: (match) => `@supports (${match[1]})`,
  },
  // Ruleset ignored due to bad selector
  'Ruleset ignored due to bad selector': {
    action: 'investigate',
    getMessage: () => 'Bad selector - needs manual review',
  },
  // Error in parsing value
  "Error in parsing value for '(.+?)'": {
    action: 'investigate',
    getMessage: (match) =>
      `Invalid value for '${match[1]}' - needs manual review`,
  },
}

class ConsoleFixer {
  constructor(options = {}) {
    this.browser = options.browser || 'firefox'
    this.dryRun = options.dryRun || false
    this.autoFix = options.autoFix || false
    this.errors = []
    this.fixes = []
  }

  async ensureExtensions() {
    if (!fs.existsSync(EXTENSIONS_DIR)) {
      fs.mkdirSync(EXTENSIONS_DIR, { recursive: true })
    }

    // Download Stylus extension for Firefox (XPI)
    const firefoxExtPath = path.join(EXTENSIONS_DIR, 'stylus-firefox.xpi')
    if (!fs.existsSync(firefoxExtPath)) {
      console.log('📥 Downloading Stylus extension for Firefox...')
      const xpiUrl =
        'https://addons.mozilla.org/firefox/downloads/latest/styl-us/addon-styl-us-latest.xpi'
      execSync(`curl -L -o "${firefoxExtPath}" "${xpiUrl}"`, {
        stdio: 'inherit',
      })
    }

    // Download Stylus extension for Chrome (CRX)
    const chromeExtPath = path.join(EXTENSIONS_DIR, 'stylus-chrome.crx')
    if (!fs.existsSync(chromeExtPath)) {
      console.log('📥 Downloading Stylus extension for Chrome...')
      // Chrome Web Store doesn't allow direct downloads, so we'll extract from the page
      // For now, we'll use a different approach - unpacked extension
      const unpackedPath = path.join(EXTENSIONS_DIR, 'stylus-chrome')
      if (!fs.existsSync(unpackedPath)) {
        console.log('⚠️  Chrome extension needs manual download from:')
        console.log(
          '    https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne'
        )
        console.log('    Or use Firefox for automated testing')
      }
    }

    return { firefoxExtPath, chromeExtPath }
  }

  async launchBrowser() {
    const { firefoxExtPath } = await this.ensureExtensions()

    if (this.browser === 'firefox') {
      // Firefox with extension
      const userDataDir = path.join(EXTENSIONS_DIR, 'firefox-profile')
      if (!fs.existsSync(userDataDir)) {
        fs.mkdirSync(userDataDir, { recursive: true })
      }

      return await firefox.launchPersistentContext(userDataDir, {
        headless: true,
        args: [],
        // Install the Stylus extension
        initialExtensions: [firefoxExtPath],
      })
    } else {
      // Chromium with extension (requires unpacked extension)
      const unpackedPath = path.join(EXTENSIONS_DIR, 'stylus-chrome')
      if (!fs.existsSync(unpackedPath)) {
        throw new Error(
          'Chrome extension not found. Please download and unpack Stylus extension first.'
        )
      }

      return await chromium.launchPersistentContext(
        path.join(EXTENSIONS_DIR, 'chrome-profile'),
        {
          headless: true,
          args: [
            `--disable-extensions-except=${unpackedPath}`,
            `--load-extension=${unpackedPath}`,
          ],
        }
      )
    }
  }

  async injectTheme(page) {
    const css = fs.readFileSync(THEME_PATH, 'utf-8')

    // Wait for Stylus to be ready
    await page.waitForTimeout(2000)

    // Inject the theme using page.addStyleTag
    await page.addStyleTag({
      content: css,
    })

    console.log('✅ Theme injected')
  }

  parseConsoleMessage(msg) {
    const text = msg.text()
    const errors = []

    for (const [pattern, config] of Object.entries(ERROR_FIXES)) {
      const regex = new RegExp(pattern)
      const match = text.match(regex)

      if (match) {
        errors.push({
          raw: text,
          type: config.action,
          message: config.getMessage(match),
          property: match[1] || null,
          location: msg.location(),
        })
      }
    }

    return errors
  }

  async captureErrors(context) {
    const page = await context.newPage()

    // Collect console messages
    const consoleMessages = []
    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        const parsed = this.parseConsoleMessage(msg)
        if (parsed.length > 0) {
          consoleMessages.push(...parsed)
        }
      }
    })

    // Also capture page errors
    page.on('pageerror', (error) => {
      consoleMessages.push({
        raw: error.message,
        type: 'pageerror',
        message: error.message,
      })
    })

    // Navigate to the site
    console.log('🌐 Navigating to wiki.archlinux.org...')
    await page.goto('https://wiki.archlinux.org/', { waitUntil: 'networkidle' })

    // Inject theme
    await this.injectTheme(page)

    // Wait for any async CSS parsing
    await page.waitForTimeout(3000)

    // Get all console messages
    const allMessages = await page.evaluate(() => {
      // Trigger a reflow to ensure all CSS is parsed
      document.body.offsetHeight
      return 'done'
    })

    await page.close()

    return consoleMessages
  }

  generateFixes(errors) {
    const fixes = []
    const seen = new Set()

    for (const error of errors) {
      if (error.property && !seen.has(error.property)) {
        seen.add(error.property)

        if (error.type === 'wrap_supports') {
          fixes.push({
            property: error.property,
            fix: `@supports (${error.property}: auto) { ... }`,
            autoFixable: true,
          })
        } else if (error.type === 'wrap_supports_selector') {
          fixes.push({
            property: error.property,
            fix: `@supports selector(${error.property}) { ... }`,
            autoFixable: true,
          })
        } else if (error.type === 'investigate') {
          fixes.push({
            property: error.property,
            fix: 'Manual review required',
            autoFixable: false,
          })
        }
      }
    }

    return fixes
  }

  findInSourceFiles(property) {
    const results = []
    const files = fs.readdirSync(SRC_DIR, { recursive: true })

    for (const file of files) {
      if (!file.endsWith('.styl')) continue

      const filePath = path.join(SRC_DIR, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const lines = content.split('\n')

      lines.forEach((line, idx) => {
        if (line.includes(property)) {
          results.push({
            file: filePath,
            line: idx + 1,
            content: line.trim(),
          })
        }
      })
    }

    return results
  }

  printReport(errors, fixes) {
    console.log('\n' + '='.repeat(60))
    console.log('📊 CONSOLE ERROR REPORT')
    console.log('='.repeat(60))

    // Group errors by type
    const byType = {}
    for (const error of errors) {
      const key = error.property || error.type
      if (!byType[key]) {
        byType[key] = { count: 0, examples: [] }
      }
      byType[key].count++
      if (byType[key].examples.length < 2) {
        byType[key].examples.push(error.raw)
      }
    }

    console.log('\n📋 Errors found:\n')
    for (const [key, data] of Object.entries(byType)) {
      console.log(`  ${key}`)
      console.log(`    Count: ${data.count}`)
      console.log(`    Example: ${data.examples[0].substring(0, 80)}...`)
    }

    console.log('\n🔧 Suggested fixes:\n')
    for (const fix of fixes) {
      const sourceLocations = this.findInSourceFiles(fix.property)
      console.log(`  ${fix.property}`)
      console.log(`    Fix: ${fix.fix}`)
      console.log(`    Auto-fixable: ${fix.autoFixable ? '✅' : '❌'}`)
      if (sourceLocations.length > 0) {
        console.log(`    Found in:`)
        for (const loc of sourceLocations.slice(0, 3)) {
          console.log(`      ${path.relative(SRC_DIR, loc.file)}:${loc.line}`)
        }
      }
      console.log()
    }

    const autoFixable = fixes.filter((f) => f.autoFixable).length
    console.log(
      `📈 Summary: ${errors.length} errors, ${fixes.length} unique issues`
    )
    console.log(
      `   ${autoFixable} auto-fixable, ${fixes.length - autoFixable} need manual review`
    )
  }

  async run() {
    console.log(`🚀 Console Fixer starting (${this.browser})...`)
    console.log(`   Dry run: ${this.dryRun}`)
    console.log(`   Auto fix: ${this.autoFix}`)

    let context
    try {
      context = await this.launchBrowser()
      const errors = await this.captureErrors(context)
      const fixes = this.generateFixes(errors)

      this.printReport(errors, fixes)

      if (this.autoFix && fixes.some((f) => f.autoFixable)) {
        console.log(
          '\n⚡ Auto-fixing not implemented yet - use dry-run to see what needs fixing'
        )
        // TODO: Implement actual auto-fixing
      }

      return { errors, fixes }
    } finally {
      if (context) {
        await context.close()
      }
    }
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2)
  const options = {
    browser: 'firefox',
    dryRun: false,
    autoFix: false,
  }

  for (const arg of args) {
    if (arg.startsWith('--browser=')) {
      options.browser = arg.split('=')[1]
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--fix') {
      options.autoFix = true
    }
  }

  const fixer = new ConsoleFixer(options)
  await fixer.run()
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { ConsoleFixer }
