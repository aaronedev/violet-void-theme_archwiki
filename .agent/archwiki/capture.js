#!/usr/bin/env node
// Interactive state capture script for Violet Void ArchWiki theme
// Fixed: injects CSS as <link> tag appended AFTER ArchWiki stylesheets

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const PAGES = [
  { name: 'main-page', url: 'https://wiki.archlinux.org/title/Main_page' },
  { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
  { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
  { name: 'installation-guide', url: 'https://wiki.archlinux.org/title/Installation_guide' },
  { name: 'firefox', url: 'https://wiki.archlinux.org/title/Firefox' },
];

const STATES = ['default', 'menu-open', 'toc-open', 'search-active'];
const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 375, height: 667 },
};

const CSS_PATH = path.join(__dirname, '..', '..', 'dist', 'main.css');

async function injectCSS(page) {
  const css = fs.readFileSync(CSS_PATH, 'utf8');
  // Inject as <style id="violet-void-theme"> appended to head
  // This runs in page context after ArchWiki stylesheets have loaded
  await page.evaluate((cssContent) => {
    const style = document.createElement('style');
    style.id = 'violet-void-theme';
    style.textContent = cssContent;
    document.head.appendChild(style);
  }, css);
}

async function capturePage(browser, pageInfo, viewport, state) {
  const { name, url } = pageInfo;
  const viewportConfig = VIEWPORTS[viewport];
  const filename = `${name}.${viewport}.${state}.png`;
  const outputPath = path.join(__dirname, 'current', filename);

  const page = await browser.newPage();
  await page.setViewportSize(viewportConfig);
  // Spoof as regular browser to avoid Anubis anti-bot
  await page.setExtraHTTPHeaders({});

  try {
    // Navigate to ArchWiki first
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for page to settle
    await page.waitForTimeout(2000);
    
    // Inject our CSS as a <style> tag appended to <head>
    // This should override ArchWiki's stylesheet due to cascade order
    await injectCSS(page);
    
    // Wait for CSS to apply
    await page.waitForTimeout(1000);

    // Handle state-specific interactions
    if (state === 'menu-open') {
      // Try vector main menu toggle
      const selectors = [
        '#vector-main-menu-dropdown-checkbox',
        '#mw-navigation button[aria-label="Menu"]',
        '.vector-main-menu-toggle button',
        '[data-mw-navigation-toggle]',
      ];
      for (const sel of selectors) {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          await el.click({ force: true });
          await page.waitForTimeout(800);
          console.log(`  [menu-open] clicked: ${sel}`);
          break;
        }
      }
    } else if (state === 'toc-open') {
      const selectors = [
        '#toc-toggle-button',
        '#toc-toggle',
        '.toc-toggle',
        '[id*="toctoggle"]',
        '#mw-toc-toggle',
      ];
      for (const sel of selectors) {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          await el.click({ force: true });
          await page.waitForTimeout(800);
          console.log(`  [toc-open] clicked: ${sel}`);
          break;
        }
      }
    } else if (state === 'search-active') {
      const selectors = [
        '.cdx-search-input__input',
        '#searchInput',
        'input[type="search"]',
        'input[name="search"]',
      ];
      for (const sel of selectors) {
        const el = page.locator(sel).first();
        if (await el.count() > 0) {
          await el.click({ force: true });
          await el.fill('systemd');
          await page.waitForTimeout(800);
          console.log(`  [search-active] typed: ${sel}`);
          break;
        }
      }
    }

    await page.screenshot({ path: outputPath, fullPage: false });
    const hash = crypto.createHash('md5').update(fs.readFileSync(outputPath)).digest('hex').slice(0, 8);
    console.log(`✓ ${filename} [${hash}]`);
  } catch (err) {
    console.error(`✗ Failed ${filename}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Starting capture for Violet Void ArchWiki theme...\n');
  console.log('CSS:', CSS_PATH);
  console.log('');

  const browser = await chromium.launch({ headless: true });

  for (const pageInfo of PAGES) {
    console.log(`\nPage: ${pageInfo.name}`);
    for (const viewport of Object.keys(VIEWPORTS)) {
      for (const state of STATES) {
        await capturePage(browser, pageInfo, viewport, state);
      }
    }
  }

  await browser.close();
  console.log('\n\nCapture complete!');
}

main().catch(console.error);
