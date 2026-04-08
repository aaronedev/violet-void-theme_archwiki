import { test, expect, chromium } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

const PAGES = [
  { name: 'main-page', url: 'https://wiki.archlinux.org/title/Main_page' },
  { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
  { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
  { name: 'installation-guide', url: 'https://wiki.archlinux.org/title/Installation_guide' },
  { name: 'firefox', url: 'https://wiki.archlinux.org/title/Firefox' },
]
const STATES = ['default', 'menu-open', 'toc-open', 'search-active']
const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 375, height: 667 },
}
const CSS_PATH = path.join(process.cwd(), 'dist', 'main.css')
const OUT_DIR = path.join(process.cwd(), '.agent/archwiki/current')

async function injectCSS(page) {
  const css = fs.readFileSync(CSS_PATH, 'utf8')
  await page.evaluate((cssContent) => {
    const style = document.createElement('style')
    style.id = 'violet-void-theme'
    style.textContent = cssContent
    document.head.appendChild(style)
  }, css)
}

for (const pageInfo of PAGES) {
  for (const viewport of Object.keys(VIEWPORTS)) {
    for (const state of STATES) {
      const filename = `${pageInfo.name}.${viewport}.${state}.png`
      const outputPath = path.join(OUT_DIR, filename)

      test(`capture ${filename}`, async () => {
        const vp = VIEWPORTS[viewport]
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        await page.setViewportSize(vp)

        await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(2000)
        await injectCSS(page)
        await page.waitForTimeout(1000)

        if (state === 'menu-open') {
          const selectors = ['#vector-main-menu-dropdown-checkbox', '#mw-navigation button[aria-label="Menu"]', '.vector-main-menu-toggle button', '[data-mw-navigation-toggle]']
          for (const sel of selectors) {
            const el = page.locator(sel).first()
            if (await el.count() > 0) {
              await el.click({ force: true })
              await page.waitForTimeout(800)
              break
            }
          }
        } else if (state === 'toc-open') {
          const selectors = ['.vector-toc-toggle', '#toc-toggle-button', '#toc-toggle', '.toc-toggle', '[id*="toctoggle"]']
          for (const sel of selectors) {
            const el = page.locator(sel).first()
            if (await el.count() > 0) {
              await el.click({ force: true })
              await page.waitForTimeout(800)
              break
            }
          }
        } else if (state === 'search-active') {
          const selectors = ['.cdx-search-input__input', '#searchInput', 'input[type="search"]', 'input[name="search"]']
          for (const sel of selectors) {
            const el = page.locator(sel).first()
            if (await el.count() > 0) {
              await el.click({ force: true })
              await el.fill('systemd')
              await page.waitForTimeout(800)
              break
            }
          }
        }

        await page.screenshot({ path: outputPath, fullPage: false })
        const hash = crypto.createHash('md5').update(fs.readFileSync(outputPath)).digest('hex').slice(0, 8)
        console.log(`✓ ${filename} [${hash}]`)
        await browser.close()
      })
    }
  }
}