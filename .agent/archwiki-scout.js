// Visual Scout - ArchWiki Interactive States
// Captures interactive UI states and detects visual issues

const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const AGENT_DIR = path.join(__dirname)
const SCREENSHOTS_DIR = path.join(AGENT_DIR, 'current')
const BASELINES_DIR = path.join(AGENT_DIR, 'baselines')

// Ensure directories exist
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
if (!fs.existsSync(BASELINES_DIR)) fs.mkdirSync(BASELINES_DIR, { recursive: true })

const PAGES = [
  { name: 'main-page', url: 'https://wiki.archlinux.org/title/Main_page' },
  { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
  { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
  { name: 'installation-guide', url: 'https://wiki.archlinux.org/title/Installation_guide' },
  { name: 'firefox', url: 'https://wiki.archlinux.org/title/Firefox' },
]

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
}

async function delay(ms) {
  await new Promise(r => setTimeout(r, ms))
}

async function captureState(page, name) {
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${name}.png`)
  await page.screenshot({ path: screenshotPath, fullPage: false })
  console.log(`  ✓ Captured: ${name}`)
  return screenshotPath
}

async function getPageInfo(page) {
  return await page.evaluate(() => {
    const body = document.body
    const html = document.documentElement
    return {
      scrollWidth: body.scrollWidth,
      scrollHeight: body.scrollHeight,
      clientWidth: body.clientWidth,
      hasHorizontalOverflow: body.scrollWidth > body.clientWidth + 5,
      hasVerticalOverflow: body.scrollHeight > body.clientHeight + 5,
    }
  })
}

async function checkOverlayIssues(page) {
  return await page.evaluate(() => {
    const issues = []
    // Check for elements with z-index > 9999
    const allEls = Array.from(document.querySelectorAll('*'))
    const highZ = allEls
      .map(el => {
        const z = parseInt(getComputedStyle(el).zIndex)
        return { tag: el.tagName, class: el.className.substring(0, 40), z }
      })
      .filter(el => !isNaN(el.z) && el.z > 9999)
      .slice(0, 5)
    
    if (highZ.length > 0) {
      issues.push({ type: 'high-z-index', details: highZ })
    }
    
    // Check for fixed/sticky elements
    const fixedSticky = allEls
      .filter(el => {
        const pos = getComputedStyle(el).position
        return pos === 'fixed' || pos === 'sticky'
      })
      .map(el => ({ tag: el.tagName, class: el.className.substring(0, 40), pos: getComputedStyle(el).position }))
      .slice(0, 5)
    
    if (fixedSticky.length > 0) {
      issues.push({ type: 'fixed-sticky-elements', details: fixedSticky })
    }
    
    // Check for translucent overlays
    const translucent = allEls
      .filter(el => {
        const bg = getComputedStyle(el).backgroundColor
        return bg.includes('rgba') || bg.includes('transparent')
      })
      .filter(el => {
        const opacity = parseFloat(getComputedStyle(el).opacity)
        return opacity < 1 && opacity > 0
      })
      .map(el => ({ tag: el.tagName, class: el.className.substring(0, 40) }))
      .slice(0, 3)
    
    if (translucent.length > 0) {
      issues.push({ type: 'translucent-elements', details: translucent })
    }
    
    return issues
  })
}

async function checkContrastIssues(page) {
  return await page.evaluate(() => {
    const issues = []
    const textEls = Array.from(document.querySelectorAll('p, span, a, li, td, th, h1, h2, h3, h4, h5, h6'))
    
    for (const el of textEls.slice(0, 100)) {
      const color = getComputedStyle(el).color
      const bg = getComputedStyle(el).backgroundColor
      const fs = parseFloat(getComputedStyle(el).fontSize)
      
      if (fs < 10 && fs > 0) {
        issues.push({
          type: 'tiny-font',
          tag: el.tagName,
          fontSize: fs,
          text: el.textContent.substring(0, 30)
        })
      }
    }
    
    return issues.slice(0, 5)
  })
}

async function checkNavIssues(page) {
  return await page.evaluate(() => {
    const issues = []
    
    // Check sidebar/nav for text wrapping issues
    const navItems = Array.from(document.querySelectorAll('.mw-sidebar a, #mw-sidebar a, nav a, .nav a'))
      .slice(0, 20)
    
    for (const item of navItems) {
      const width = item.offsetWidth
      const scrollW = item.scrollWidth
      if (scrollW > width + 2) {
        issues.push({
          type: 'nav-text-overflow',
          text: item.textContent.trim().substring(0, 30),
          offsetW: width,
          scrollW: scrollW,
          overflow: scrollW - width
        })
      }
    }
    
    // Check for menu/dropdown
    const menus = document.querySelectorAll('.dropdown, .menu, .popup, [role="menu"], [role="navigation"]')
    for (const menu of menus) {
      const rect = menu.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        issues.push({
          type: 'menu-visible',
          tag: menu.tagName,
          class: menu.className.substring(0, 40),
          w: Math.round(rect.width),
          h: Math.round(rect.height)
        })
      }
    }
    
    return issues.slice(0, 10)
  })
}

async function checkTOC(page) {
  return await page.evaluate(() => {
    const issues = []
    
    // Find TOC
    const toc = document.querySelector('.toc, #toc, [role="navigation"][aria-label="Table of contents"]')
    if (toc) {
      const rect = toc.getBoundingClientRect()
      issues.push({
        type: 'toc-found',
        visible: rect.width > 0 && rect.height > 0,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        class: toc.className.substring(0, 40)
      })
    }
    
    // Check for collapsed/expandable sections
    const collapsibles = document.querySelectorAll('.mw-collapsible, [aria-expanded], details')
    if (collapsibles.length > 0) {
      issues.push({
        type: 'collapsibles-found',
        count: collapsibles.length
      })
    }
    
    return issues
  })
}

async function checkSearchState(page) {
  return await page.evaluate(() => {
    const issues = []
    
    // Find search inputs
    const searchInputs = document.querySelectorAll('input[type="search"], input[name="search"], #searchInput, .cdx-search-input__input')
    
    for (const input of searchInputs) {
      const rect = input.getBoundingClientRect()
      const focused = document.activeElement === input
      issues.push({
        type: 'search-input',
        focused,
        visible: rect.width > 0 && rect.height > 0,
        w: Math.round(rect.width),
        class: input.className.substring(0, 40)
      })
    }
    
    // Check search results dropdown
    const dropdowns = document.querySelectorAll('.cdx-search-input__suggestions, .search-results, .suggestions')
    for (const dd of dropdowns) {
      const rect = dd.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        issues.push({
          type: 'search-dropdown-visible',
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          class: dd.className.substring(0, 40)
        })
      }
    }
    
    return issues
  })
}

async function checkHamburgerMenu(page) {
  return await page.evaluate(() => {
    const issues = []
    
    // Look for hamburger/menu toggle
    const toggles = document.querySelectorAll('.mw-ui-button, #mw-sidebar-button, [aria-label="Menu"], .menu-toggle, .hamburger, #n-shownav')
    
    for (const toggle of toggles) {
      const rect = toggle.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        const text = toggle.textContent.trim().substring(0, 20)
        issues.push({
          type: 'menu-toggle',
          text,
          visible: true,
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          class: toggle.className.substring(0, 40)
        })
      }
    }
    
    // Check if sidebar is visible
    const sidebar = document.querySelector('.mw-sidebar, #mw-sidebar, #sidebar')
    if (sidebar) {
      const rect = sidebar.getBoundingClientRect()
      issues.push({
        type: 'sidebar',
        visible: rect.width > 0 && rect.height > 0,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        class: sidebar.className.substring(0, 40)
      })
    }
    
    return issues
  })
}

async function checkCodeBlocks(page) {
  return await page.evaluate(() => {
    const issues = []
    const codeBlocks = Array.from(document.querySelectorAll('pre, code, .mw-highlight'))
    
    for (const block of codeBlocks.slice(0, 10)) {
      const rect = block.getBoundingClientRect()
      const scrollW = block.scrollWidth
      if (rect.width > 0 && scrollW > rect.width + 5) {
        issues.push({
          type: 'code-overflow',
          tag: block.tagName,
          class: block.className.substring(0, 40),
          w: Math.round(rect.width),
          scrollW,
          overflow: scrollW - rect.width
        })
      }
    }
    
    return issues.slice(0, 5)
  })
}

async function checkTables(page) {
  return await page.evaluate(() => {
    const issues = []
    const tables = Array.from(document.querySelectorAll('.wikitable, table'))
    
    for (const table of tables.slice(0, 5)) {
      const rect = table.getBoundingClientRect()
      const scrollW = table.scrollWidth
      const scrollH = table.scrollHeight
      if (rect.width > 0 && scrollW > rect.width + 5) {
        issues.push({
          type: 'table-horizontal-overflow',
          w: Math.round(rect.width),
          scrollW,
          overflow: scrollW - rect.width,
          class: table.className.substring(0, 40)
        })
      }
      if (rect.height > 0 && scrollH > rect.height + 5) {
        issues.push({
          type: 'table-vertical-overflow',
          h: Math.round(rect.height),
          scrollH,
          overflow: scrollH - rect.height,
          class: table.className.substring(0, 40)
        })
      }
    }
    
    return issues.slice(0, 5)
  })
}

async function run() {
  console.log('🎨 Violet Void ArchWiki Visual Scout')
  console.log('==================================\n')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORTS.desktop,
    deviceScaleFactor: 1
  })
  const page = await context.newPage()

  // Load the theme CSS
  const cssPath = path.join(__dirname, '..', '..', 'dist', 'main.css')
  await page.addStyleTag({ path: cssPath })

  const findings = []
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16)

  for (const { name, url } of PAGES) {
    console.log(`\n📄 ${name} (${url})`)
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await delay(500)
      
      // === DEFAULT STATE ===
      console.log('  → Default state')
      await captureState(page, `${name}.desktop.default`)
      const pageInfo = await getPageInfo(page)
      const overlayIssues = await checkOverlayIssues(page)
      const navIssues = await checkNavIssues(page)
      const tocIssues = await checkTOC(page)
      const searchIssues = await checkSearchState(page)
      const codeIssues = await checkCodeBlocks(page)
      const tableIssues = await checkTables(page)
      const contrastIssues = await checkContrastIssues(page)
      
      // === MENU OPEN STATE ===
      console.log('  → Menu open state')
      try {
        // Try clicking hamburger or sidebar toggle
        const menuToggle = page.locator('.mw-ui-button, #mw-sidebar-button, [aria-label="Menu"], .menu-toggle, #n-shownav').first()
        if (await menuToggle.count() > 0) {
          await menuToggle.click()
          await delay(300)
          await captureState(page, `${name}.desktop.menu-open`)
          await checkNavIssues(page)
        } else {
          // Try pressing the key
          await page.keyboard.press('m')
          await delay(300)
          await captureState(page, `${name}.desktop.menu-open`)
        }
      } catch (e) {
        console.log(`  ! Could not open menu: ${e.message.substring(0, 50)}`)
      }
      
      // === TOC OPEN STATE ===
      console.log('  → TOC state')
      try {
        const tocToggle = page.locator('.toc-toggle, #toc-toggle, .mw-toc-toggle').first()
        if (await tocToggle.count() > 0) {
          await tocToggle.click()
          await delay(300)
          await captureState(page, `${name}.desktop.toc-open`)
        }
        // Try clicking the TOC toggle link
        const tocLink = page.locator('a[href="#toc"], a[href*="toctitle"]').first()
        if (await tocLink.count() > 0) {
          await tocLink.click()
          await delay(300)
          await captureState(page, `${name}.desktop.toc-open`)
        }
      } catch (e) {
        // TOC might not exist or be toggleable
      }
      
      // === SEARCH ACTIVE STATE ===
      console.log('  → Search active state')
      try {
        const searchInput = page.locator('input[type="search"], input[name="search"], #searchInput, .cdx-search-input__input').first()
        if (await searchInput.count() > 0) {
          await searchInput.click()
          await delay(200)
          await searchInput.fill('systemd')
          await delay(500)
          await captureState(page, `${name}.desktop.search-active`)
          const searchStateIssues = await checkSearchState(page)
          if (searchStateIssues.length > 0) {
            findings.push({
              page: name,
              state: 'search-active',
              viewport: 'desktop',
              issues: searchStateIssues
            })
          }
        }
      } catch (e) {
        console.log(`  ! Search not interactable: ${e.message.substring(0, 50)}`)
      }
      
      // === MOBILE VIEW ===
      console.log('  → Mobile viewport')
      await page.setViewportSize(VIEWPORTS.mobile)
      await delay(300)
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.addStyleTag({ path: cssPath })
      await delay(500)
      await captureState(page, `${name}.mobile.default`)
      
      // Mobile menu open
      try {
        const mobileToggle = page.locator('.mw-ui-button, [aria-label="Menu"], .menu-toggle').first()
        if (await mobileToggle.count() > 0) {
          await mobileToggle.click()
          await delay(300)
          await captureState(page, `${name}.mobile.menu-open`)
          const mobileNavIssues = await checkNavIssues(page)
          if (mobileNavIssues.length > 0) {
            findings.push({
              page: name,
              state: 'menu-open',
              viewport: 'mobile',
              issues: mobileNavIssues
            })
          }
        }
      } catch (e) {
        console.log(`  ! Mobile menu not interactable`)
      }
      
      // === TABLET VIEW ===
      console.log('  → Tablet viewport')
      await page.setViewportSize(VIEWPORTS.tablet)
      await delay(300)
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.addStyleTag({ path: cssPath })
      await delay(500)
      await captureState(page, `${name}.tablet.default`)
      
      // === AGGREGATE FINDINGS ===
      if (pageInfo.hasHorizontalOverflow) {
        findings.push({
          page: name,
          state: 'default',
          viewport: 'desktop',
          issues: [{ type: 'horizontal-overflow', ...pageInfo }]
        })
      }
      if (overlayIssues.length > 0) {
        findings.push({ page: name, state: 'default', viewport: 'desktop', issues: overlayIssues })
      }
      if (codeIssues.length > 0) {
        findings.push({ page: name, state: 'default', viewport: 'desktop', issues: codeIssues })
      }
      if (tableIssues.length > 0) {
        findings.push({ page: name, state: 'default', viewport: 'desktop', issues: tableIssues })
      }
      if (contrastIssues.length > 0) {
        findings.push({ page: name, state: 'default', viewport: 'desktop', issues: contrastIssues })
      }
      if (navIssues.length > 0) {
        findings.push({ page: name, state: 'default', viewport: 'desktop', issues: navIssues })
      }
      
    } catch (e) {
      console.log(`  ✗ Error: ${e.message.substring(0, 100)}`)
      findings.push({ page: name, error: e.message.substring(0, 100) })
    }
  }

  await browser.close()
  
  // Generate report
  console.log('\n\n📋 FINDINGS SUMMARY')
  console.log('==================')
  
  const realFindings = findings.filter(f => !f.error && f.issues && f.issues.length > 0)
  
  if (realFindings.length === 0) {
    console.log('✓ No visual issues detected')
  } else {
    for (const finding of realFindings) {
      console.log(`\n${finding.page} (${finding.viewport}, ${finding.state}):`)
      for (const issue of finding.issues) {
        console.log(`  - [${issue.type}] ${JSON.stringify(issue).substring(0, 100)}`)
      }
    }
  }
  
  // Write findings to a JSON file for later processing
  const reportPath = path.join(AGENT_DIR, 'reports', `scout-${Date.now()}.json`)
  const report = {
    timestamp: now,
    pages: PAGES.map(p => p.name),
    viewports: Object.keys(VIEWPORTS),
    findings: findings,
    summary: {
      total: findings.length,
      withIssues: realFindings.length,
      clean: findings.length - realFindings.length
    }
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 Report saved to: ${reportPath}`)
  
  return report
}

run().catch(console.error)
