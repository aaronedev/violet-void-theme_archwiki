const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  await page.goto('https://wiki.archlinux.org/title/Installation_guide', {
    waitUntil: 'networkidle',
  })
  await page.addStyleTag({ path: './dist/main.css' })
  await page.waitForTimeout(500)

  const checks = await page.evaluate(() => {
    const results = {}

    // Get all checkbox inputs
    const checkboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
    results.checkboxCount = checkboxes.length
    results.checkboxes = checkboxes.map((cb) => ({
      id: cb.id,
      className: cb.className,
      zIndex: getComputedStyle(cb).zIndex,
      position: getComputedStyle(cb).position,
      pointerEvents: getComputedStyle(cb).pointerEvents,
      visibility: getComputedStyle(cb).visibility,
      display: getComputedStyle(cb).display,
      width: cb.offsetWidth,
      height: cb.offsetHeight,
      checked: cb.checked,
    }))

    // Get all dropdown/menu related elements
    const dropdowns = Array.from(
      document.querySelectorAll(
        '[class*="dropdown"], [class*="menu"], [id*="menu"], [id*="dropdown"]'
      )
    )
    results.dropdownCount = dropdowns.length
    results.dropdowns = dropdowns.slice(0, 5).map((d) => ({
      tag: d.tagName,
      id: d.id,
      className: d.className.substring(0, 80),
      zIndex: getComputedStyle(d).zIndex,
      position: getComputedStyle(d).position,
    }))

    // Check search input area
    const searchInputs = Array.from(
      document.querySelectorAll(
        'input[type="search"], input[type="text"][name*="search"], .cdx-search-input'
      )
    )
    results.searchCount = searchInputs.length
    results.searchInputs = searchInputs.map((s) => ({
      id: s.id,
      className: s.className.substring(0, 60),
      zIndex: getComputedStyle(s).zIndex,
      position: getComputedStyle(s).position,
      width: s.offsetWidth,
      height: s.offsetHeight,
    }))

    // Get body scroll dimensions
    results.horizontalOverflow =
      document.body.scrollWidth > document.body.clientWidth
    results.scrollWidth = document.body.scrollWidth
    results.clientWidth = document.body.clientWidth

    // Check all visible elements with z-index > 100
    const highZ = Array.from(document.querySelectorAll('*'))
      .filter((el) => {
        const z = parseInt(getComputedStyle(el).zIndex)
        return z > 100 && getComputedStyle(el).position !== 'static'
      })
      .slice(0, 10)
      .map((el) => ({
        tag: el.tagName,
        id: el.id,
        className: el.className.substring(0, 60),
        zIndex: getComputedStyle(el).zIndex,
      }))
    results.highZIndexElements = highZ

    // Check search button
    const searchBtns = Array.from(
      document.querySelectorAll('button, [role="button"], .cdx-button')
    )
    results.buttonCount = searchBtns.length
    results.buttons = searchBtns.slice(0, 5).map((b) => ({
      tag: b.tagName,
      id: b.id,
      className: b.className.substring(0, 60),
      zIndex: getComputedStyle(b).zIndex,
      pointerEvents: getComputedStyle(b).pointerEvents,
    }))

    return results
  })

  console.log(JSON.stringify(checks, null, 2))

  await browser.close()
})()
