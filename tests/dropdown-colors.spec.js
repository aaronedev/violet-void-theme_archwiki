const { test, expect } = require('@playwright/test')
const { readScopedUserStyle } = require('../scripts/lib/userstyle-test-css')

test('dropdown surfaces and links stay readable and language menu fits mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; }
    .vector-dropdown { position: relative; width: 157px; }
    .vector-dropdown-content { display: none; position: absolute; right: 0; width: 200px; background-color: white !important; }
    .vector-dropdown-checkbox:checked ~ .vector-dropdown-content { display: block; }
    #content a { color: #07b !important; }
  </style></head><body><main id="content">
    <div id="p-lang-btn" class="vector-dropdown"><input id="language" class="vector-dropdown-checkbox" type="checkbox"><label for="language">Languages</label>
      <div class="vector-dropdown-content"><div class="vector-menu-content"><ul><li><a href="#lang">Deutsch</a></li></ul></div></div>
    </div></main></body></html>`)
  await page.addStyleTag({ content: readScopedUserStyle() })
  const panel = page.locator('.vector-dropdown-content')
  await expect(panel).toBeHidden()
  await page.locator('#language').check()
  await expect(panel).toBeVisible()
  await expect(panel).toHaveCSS('background-color', 'rgb(32, 32, 32)')
  await expect(panel.locator('a')).toHaveCSS('color', 'rgb(231, 231, 231)')
  const rect = await panel.boundingBox()
  expect(rect.x).toBeGreaterThanOrEqual(0)
  expect(rect.x + rect.width).toBeLessThanOrEqual(390)
  await page.locator('#language').uncheck()
  await expect(panel).toBeHidden()
})
