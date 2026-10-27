const { test, expect } = require('@playwright/test')
const { readScopedUserStyle } = require('../scripts/lib/userstyle-test-css')

test('article links preserve their pressed colors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setContent(`<!doctype html><main id="content"><div class="mw-parser-output">
    <p><a id="ordinary" href="#ordinary">Ordinary link</a></p>
    <p class="archwiki-template-pkg"><a id="package" href="#package">Package</a></p>
    <p class="archwiki-template-man"><a id="manual" href="#manual">Manual</a></p>
  </div></main>`)
  await page.addStyleTag({ content: readScopedUserStyle() })
  for (const [id, hover, active] of [
    ['ordinary', 'rgb(253, 124, 255)', 'rgb(255, 26, 103)'],
    ['package', 'rgb(66, 255, 173)', 'rgb(66, 255, 151)'],
    ['manual', 'rgb(66, 255, 173)', 'rgb(66, 255, 151)'],
  ]) {
    const link = page.locator(`#${id}`)
    await link.hover()
    await expect(link).toHaveCSS('color', hover)
    await page.mouse.down()
    try {
      await expect(link).toHaveCSS('color', active)
    } finally {
      await page.mouse.up()
    }
  }
})
