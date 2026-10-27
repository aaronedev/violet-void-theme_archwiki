const { test, expect } = require('@playwright/test')
const { readScopedUserStyle } = require('../scripts/lib/userstyle-test-css')

for (const width of [320, 375, 768, 1440]) {
  test(`Vector menu layout and checkbox state at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.setContent(`<!doctype html><html class="client-js"><head><style>
      .vector-dropdown-content { display: none; position: absolute; width: 32px; }
      .vector-dropdown-checkbox:checked ~ .vector-dropdown-content { display: block; }
      .vector-dropdown-checkbox { position: absolute; opacity: 0; }
      .vector-toc-list { list-style: none; }
    </style></head><body><div id="vector-main-menu-dropdown" class="vector-dropdown">
      <input id="menu" class="vector-dropdown-checkbox" type="checkbox"><label for="menu">Menu</label>
      <div class="vector-dropdown-content"><div id="vector-main-menu" class="vector-pinnable-element vector-main-menu">
        <div class="vector-menu-content"><a href="#example">Example</a></div></div></div></div>
      <nav class="vector-pinned-container" style="width: 180px"><div class="vector-toc vector-pinnable-element">
        <ul class="vector-toc-contents"><li class="vector-toc-list-item vector-toc-list-item-expanded">
          <a class="vector-toc-link" href="#section"><span class="vector-toc-text"><span class="vector-toc-numb">1</span><span>A long section heading that wraps across several lines</span></span></a>
          <button class="vector-toc-toggle" aria-label="Toggle section"><span class="vector-icon"></span></button>
          <ul class="vector-toc-list"><li class="vector-toc-list-item"><a class="vector-toc-link" href="#child"><span class="vector-toc-text"><span class="vector-toc-numb">1.1</span><span>Child</span></span></a></li></ul>
        </li></ul></div></nav></body></html>`)
    await page.addStyleTag({ content: readScopedUserStyle() })
    const panel = page.locator('.vector-dropdown-content')
    await expect(panel).toBeHidden()
    await page.locator('label[for="menu"]').click()
    await expect(panel).toBeVisible()
    const layout = await page.evaluate(() => {
      const panel = document.querySelector('.vector-dropdown-content')
      const inner = document.querySelector('#vector-main-menu')
      const toggle = document.querySelector('.vector-toc-toggle').getBoundingClientRect()
      const link = document.querySelector('.vector-toc-link').getBoundingClientRect()
      return { panel: panel.getBoundingClientRect().width, innerBackground: getComputedStyle(inner).backgroundImage,
        innerBorder: getComputedStyle(inner).borderTopWidth, topDelta: toggle.top - link.top,
        textDisplay: getComputedStyle(document.querySelector('.vector-toc-text')).display }
    })
    expect(layout.panel).toBeGreaterThan(180)
    expect(layout.panel).toBeLessThanOrEqual(width - 32)
    expect(layout.innerBackground).toBe('none')
    expect(layout.innerBorder).toBe('0px')
    expect(Math.abs(layout.topDelta)).toBeLessThan(12)
    expect(layout.textDisplay).toBe('flex')
    await page.locator('label[for="menu"]').click()
    await expect(panel).toBeHidden()
    await page.locator('label[for="menu"]').hover()
    await expect(panel).toBeHidden()
    await page.evaluate(() => document.documentElement.className = 'client-nojs')
    await expect(page.locator('.vector-toc-toggle')).toBeHidden()
    await page.locator('label[for="menu"]').click()
    await expect(panel).toBeVisible()
    await page.locator('label[for="menu"]').click()
    await expect(panel).toBeHidden()
  })
}
