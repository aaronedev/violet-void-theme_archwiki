const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: true })

  // Desktop context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
  })

  const desktopPage = await desktopContext.newPage()

  // Load theme CSS
  await desktopPage.goto('about:blank')
  await desktopPage.addStyleTag({ path: './dist/main.css' })

  const pages = [
    { name: 'main-page', url: 'https://wiki.archlinux.org/title/Main_page' },
    { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
    { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
    {
      name: 'installation-guide',
      url: 'https://wiki.archlinux.org/title/Installation_guide',
    },
  ]

  const states = [
    { name: 'default', fn: async () => {} },
    {
      name: 'menu-open',
      fn: async (p) => {
        // Try Vector's main menu dropdown
        const cb = p.locator('#vector-main-menu-dropdown-checkbox')
        if ((await cb.count()) > 0) {
          await cb.check({ force: true })
          await p.waitForTimeout(600)
        }
      },
    },
    {
      name: 'toc-open',
      fn: async (p) => {
        // Click TOC toggle if present
        const toggle = p
          .locator('.vector-toc-toggle, #toc-toggle, [data-target="toc"]')
          .first()
        if ((await toggle.count()) > 0) {
          await toggle.click()
          await p.waitForTimeout(400)
        }
      },
    },
    {
      name: 'search-active',
      fn: async (p) => {
        // Focus the search input
        const search = p
          .locator('#searchInput, .vector-search-box-input, [name="search"]')
          .first()
        if ((await search.count()) > 0) {
          await search.click()
          await p.waitForTimeout(400)
        }
      },
    },
  ]

  const results = []

  console.log('=== DESKTOP (1440x900) ===')

  for (const pg of pages) {
    for (const s of states) {
      try {
        await desktopPage.goto(pg.url, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        })
        await desktopPage.waitForTimeout(800)

        await s.fn(desktopPage)
        await desktopPage.waitForTimeout(400)

        const safeName = `${pg.name}.desktop.${s.name}`
        const path = `.agent/archwiki/current/${safeName}.png`
        await desktopPage.screenshot({ path, fullPage: false, timeout: 10000 })
        console.log(`OK: ${safeName}`)
        results.push({ page: pg.name, state: s.name, status: 'ok', path })

        // Cleanup interactive state
        if (s.name === 'menu-open') {
          try {
            const cb = desktopPage.locator(
              '#vector-main-menu-dropdown-checkbox'
            )
            if ((await cb.count()) > 0) await cb.uncheck({ force: true })
          } catch (e) {}
          await desktopPage.waitForTimeout(300)
        }
      } catch (e) {
        console.log(`ERR: ${pg.name}.${s.name} - ${e.message.slice(0, 80)}`)
        results.push({
          page: pg.name,
          state: s.name,
          status: 'error',
          error: e.message.slice(0, 120),
        })
      }
    }
  }

  // Mobile context
  console.log('\n=== MOBILE (375x667) ===')

  await desktopContext.close()
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.addStyleTag({ path: './dist/main.css' })

  const mobileStates = [
    { name: 'default', fn: async () => {} },
    {
      name: 'menu-open',
      fn: async (p) => {
        // Mobile hamburger
        const btn = p
          .locator(
            '.vector-sticky-pinning-container, .vector-main-menu-trigger, #mw-editableNavigation'
          )
          .first()
        if ((await btn.count()) > 0) {
          await btn.click().catch(() => {})
          await p.waitForTimeout(600)
        }
        // Also try checkbox approach
        const cb = p.locator('#vector-main-menu-dropdown-checkbox')
        if ((await cb.count()) > 0) {
          await cb.check({ force: true }).catch(() => {})
          await p.waitForTimeout(600)
        }
      },
    },
  ]

  for (const pg of pages.slice(0, 2)) {
    for (const s of mobileStates) {
      try {
        await mobilePage.goto(pg.url, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        })
        await mobilePage.waitForTimeout(800)

        await s.fn(mobilePage)
        await mobilePage.waitForTimeout(400)

        const safeName = `${pg.name}.mobile.${s.name}`
        const path = `.agent/archwiki/current/${safeName}.png`
        await mobilePage.screenshot({ path, fullPage: false, timeout: 10000 })
        console.log(`OK: ${safeName}`)
        results.push({
          page: pg.name,
          state: s.name,
          status: 'ok',
          path,
          mobile: true,
        })

        if (s.name === 'menu-open') {
          try {
            const cb = mobilePage.locator('#vector-main-menu-dropdown-checkbox')
            if ((await cb.count()) > 0) await cb.uncheck({ force: true })
          } catch (e) {}
          await mobilePage.waitForTimeout(300)
        }
      } catch (e) {
        console.log(
          `ERR: ${pg.name}.mobile.${s.name} - ${e.message.slice(0, 80)}`
        )
        results.push({
          page: pg.name,
          state: s.name,
          status: 'error',
          error: e.message.slice(0, 120),
        })
      }
    }
  }

  await browser.close()

  console.log('\n=== SUMMARY ===')
  console.log(
    `Total: ${results.length}, OK: ${results.filter((r) => r.status === 'ok').length}, Errors: ${results.filter((r) => r.status === 'error').length}`
  )

  // Write results
  const fs = require('fs')
  fs.writeFileSync(
    '.agent/archwiki/reports/scout-results.json',
    JSON.stringify(results, null, 2)
  )
  console.log('Results saved to .agent/archwiki/reports/scout-results.json')
})()
