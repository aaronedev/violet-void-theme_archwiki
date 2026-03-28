const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  // Load the theme on initial page
  await page.goto('https://wiki.archlinux.org')
  await page.waitForLoadState('networkidle')
  await page.addStyleTag({ path: './dist/main.css' })
  await page.waitForTimeout(500)

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
      fn: async () => {
        // Click the main menu dropdown checkbox (use click, not check, to properly trigger)
        const menuCheckbox = page
          .locator('#vector-main-menu-dropdown-checkbox')
          .first()
        if ((await menuCheckbox.count()) > 0) {
          await menuCheckbox.click()
          await page.waitForTimeout(500)
        }
      },
    },
    {
      name: 'toc-open',
      fn: async () => {
        // TOC toggle: click the button that toggles TOC visibility
        const tocToggle = page
          .locator(
            '#toc-toggle-button, .toc-toggle button, button[data-target="toc"], .vector-toc-toggle-button'
          )
          .first()
        if ((await tocToggle.count()) > 0) {
          await tocToggle.click()
          await page.waitForTimeout(300)
        }
      },
    },
    {
      name: 'search-active',
      fn: async () => {
        // Click the search input to activate it
        const searchInput = page
          .locator(
            '.cdx-search-input__input, #searchInput, input[name="search"]'
          )
          .first()
        if ((await searchInput.count()) > 0) {
          await searchInput.click()
          await page.waitForTimeout(300)
        }
      },
    },
  ]

  const results = []

  // Helper to reset all interactive states
  async function resetStates() {
    try {
      await page
        .locator('#vector-main-menu-dropdown-checkbox')
        .first()
        .uncheck({ force: true })
    } catch (e) {}
    try {
      await page
        .locator('#toc-toggle-button, .toc-toggle button')
        .first()
        .click()
    } catch (e) {}
    try {
      await page.keyboard.press('Escape')
    } catch (e) {}
    await page.waitForTimeout(200)
  }

  for (const p of pages) {
    for (const s of states) {
      try {
        await resetStates()
        await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 })
        // Re-add style tag after navigation (style may not persist across navigations)
        await page.addStyleTag({ path: './dist/main.css' })
        await page.waitForTimeout(300)
        await s.fn()
        await page.waitForTimeout(300)

        const path = `.agent/archwiki/current/${p.name}.desktop.${s.name}.png`
        await page.screenshot({ path, fullPage: false })
        results.push({ page: p.name, state: s.name, status: 'ok', path })
      } catch (e) {
        results.push({
          page: p.name,
          state: s.name,
          status: 'error',
          error: e.message.slice(0, 100),
        })
      }
    }
  }

  // Mobile narrow width
  await context.close()
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.addStyleTag({ path: './dist/main.css' })

  // Mobile states (no search-active on mobile in this simple set)
  const mobileStates = states.slice(0, 3) // default, menu-open, toc-open

  for (const p of pages.slice(0, 2)) {
    for (const s of mobileStates) {
      try {
        await mobilePage.goto(p.url, {
          waitUntil: 'networkidle',
          timeout: 30000,
        })
        await mobilePage.addStyleTag({ path: './dist/main.css' })
        await mobilePage.waitForTimeout(300)
        await s.fn()
        await mobilePage.waitForTimeout(300)

        const path = `.agent/archwiki/current/${p.name}.mobile.${s.name}.png`
        await mobilePage.screenshot({ path, fullPage: false })
        results.push({
          page: p.name,
          state: s.name,
          status: 'ok',
          path,
          mobile: true,
        })
      } catch (e) {
        results.push({
          page: p.name,
          state: s.name,
          status: 'error',
          error: e.message.slice(0, 100),
          mobile: true,
        })
      }
    }
  }

  await browser.close()

  console.log('\n=== CAPTURE RESULTS ===')
  for (const r of results) {
    const flag = r.status === 'error' ? '❌' : '✅'
    const mobile = r.mobile ? ' [mobile]' : ' [desktop]'
    if (r.status === 'error') {
      console.log(`${flag} ${r.page}${mobile} - ${r.state}: ${r.error}`)
    } else {
      console.log(`${flag} ${r.page}${mobile} - ${r.state}: ${r.path}`)
    }
  }

  // Verify distinct hashes
  const { execSync } = require('child_process')
  const hashes = {}
  results
    .filter((r) => r.status === 'ok')
    .forEach((r) => {
      try {
        const hash = execSync(
          `md5sum .agent/archwiki/current/${r.path.split('/').pop()}`
        )
          .toString()
          .slice(0, 32)
        if (!hashes[hash]) hashes[hash] = []
        hashes[hash].push(r.path.split('/').pop())
      } catch (e) {}
    })

  console.log('\n=== HASH VERIFICATION ===')
  const totalOk = results.filter((r) => r.status === 'ok').length
  const uniqueHashes = Object.keys(hashes).length
  console.log(`Total OK captures: ${totalOk}`)
  console.log(`Unique hashes: ${uniqueHashes}`)
  if (uniqueHashes < totalOk) {
    console.log('WARNING: Some captures are identical!')
    Object.entries(hashes).forEach(([hash, files]) => {
      if (files.length > 1)
        console.log(`  Duplicate hash ${hash}: ${files.join(', ')}`)
    })
  } else {
    console.log('All captures are visually distinct.')
  }
})()
