const { chromium } = require('playwright')
const { injectUserStyle } = require('./lib/userstyle-test-css')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  await page.goto('https://wiki.archlinux.org/title/Installation_guide', {
    waitUntil: 'networkidle',
  })
  await injectUserStyle(page)
  await page.waitForTimeout(500)

  const checks = await page.evaluate(() => {
    const results = {}

    // Check for horizontal overflow
    const body = document.body
    results.horizontalOverflow = body.scrollWidth > body.clientWidth
    results.scrollWidth = body.scrollWidth
    results.clientWidth = body.clientWidth

    // Check dropdown/checkbox stacking
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    results.checkboxCount = checkboxes.length
    results.checkboxZIndex = []
    checkboxes.forEach((cb) => {
      const style = getComputedStyle(cb)
      results.checkboxZIndex.push({
        id: cb.id || cb.className,
        zIndex: style.zIndex,
        position: style.position,
        pointerEvents: style.pointerEvents,
        visibility: style.visibility,
        display: style.display,
      })
    })

    // Check menu dropdown z-index
    const dropdowns = document.querySelectorAll('.vector-dropdown')
    results.dropdownCount = dropdowns.length
    results.dropdownZIndex = []
    dropdowns.forEach((d) => {
      const style = getComputedStyle(d)
      results.dropdownZIndex.push({
        class: d.className.substring(0, 50),
        zIndex: style.zIndex,
        position: style.position,
      })
    })

    // Check for translucent backgrounds in panels
    const panels = document.querySelectorAll(
      '.mw-panel, #mw-panel, .vector-sticky-pills-container'
    )
    results.panelCount = panels.length
    results.panelStyles = []
    panels.forEach((p) => {
      const style = getComputedStyle(p)
      const bg = style.backgroundColor
      const opacity = style.opacity
      results.panelStyles.push({
        class: p.className.substring(0, 40),
        backgroundColor: bg,
        opacity: opacity,
        backdropFilter: style.backdropFilter,
      })
    })

    // Check TOC
    const toc = document.querySelector('#toc, .toc')
    if (toc) {
      const style = getComputedStyle(toc)
      results.tocZIndex = style.zIndex
      results.tocBackground = style.backgroundColor
      results.tocOpacity = style.opacity
    }

    // Check nav/menu
    const nav = document.querySelector(
      '.vector-nav, .vector-sticky-pills-container'
    )
    if (nav) {
      const style = getComputedStyle(nav)
      results.navZIndex = style.zIndex
      results.navBackground = style.backgroundColor
    }

    // Check search button
    const searchBtn = document.querySelector('.cdx-search-input__end-button')
    if (searchBtn) {
      const style = getComputedStyle(searchBtn)
      results.searchBtnBackground = style.backgroundColor
      results.searchBtnColor = style.color
      results.searchBtnZIndex = style.zIndex
    }

    // Check main content area
    const content = document.querySelector('#content')
    if (content) {
      const style = getComputedStyle(content)
      results.contentBg = style.backgroundColor
    }

    // Check for any very low contrast text
    const allText = document.querySelectorAll('p, span, a, li')
    let lowContrastCount = 0
    allText.forEach((el) => {
      const color = getComputedStyle(el).color
      if (color === 'rgb(0, 0, 0)' || color === 'rgb(34, 34, 34)') {
        lowContrastCount++
      }
    })
    results.darkTextCount = lowContrastCount

    return results
  })

  console.log('=== INTERACTIVE STATE ANALYSIS ===')
  console.log(JSON.stringify(checks, null, 2))

  await browser.close()
})()
