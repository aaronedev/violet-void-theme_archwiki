const { test, expect } = require('@playwright/test')
const { readScopedUserStyle } = require('../scripts/lib/userstyle-test-css')

test('article headings, links, header, and mobile navigation remain readable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; }
    .vector-header { background-color: #f6f9fc !important; }
    #firstHeading { color: #222; }
    .mw-heading h2 { color: #101418; }
    .mw-heading h2::before { content: "1"; color: #6b3e26; }
    .vector-header .vector-icon { background-color: #202122; }
    .mw-parser-output a { color: #07b !important; }
    #archnavbarmenu, #archnavbarlist { min-width: max-content; }
    #archnavbarlist { display: flex; overflow: hidden !important; }
    #archnavbarlist li { min-width: 90px; }
  </style></head><body>
    <div id="archnavbar"><div id="archnavbarlogo">Logo</div><div id="archnavbarmenu"><ul id="archnavbarlist"><li><a href="#home">Home</a></li><li><a href="#packages">Packages</a></li><li><a href="#forums">Forums</a></li><li><a href="#wiki">Wiki</a></li><li><a href="#aur">AUR</a></li><li><a href="#download">Download</a></li></ul></div></div>
    <header class="vector-header">Header<span class="vector-icon"></span></header><main id="content"><h1 id="firstHeading">Title</h1>
    <div class="mw-parser-output"><div class="mw-heading"><h2>Section</h2></div><a href="#a">Link</a></div></main>
  </body></html>`)
  await page.addStyleTag({ content: readScopedUserStyle() })
  await expect(page.locator('#firstHeading')).toHaveCSS(
    'color',
    'rgb(231, 231, 231)'
  )
  await expect(page.locator('.mw-heading h2')).toHaveCSS(
    'color',
    'rgb(231, 231, 231)'
  )
  await expect(page.locator('.mw-parser-output a')).toHaveCSS(
    'color',
    'rgb(199, 184, 255)'
  )
  await expect(page.locator('.vector-header')).toHaveCSS(
    'background-color',
    'rgb(24, 24, 24)'
  )
  await expect(page.locator('.vector-header .vector-icon')).toHaveCSS(
    'background-color',
    'rgb(231, 231, 231)'
  )
  expect(
    await page
      .locator('.mw-heading h2')
      .evaluate((e) => getComputedStyle(e, '::before').color)
  ).toBe('rgb(199, 184, 255)')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(390)
  const menu = page.locator('#archnavbarmenu')
  expect(await menu.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true)
  const download = menu.getByRole('link', { name: 'Download' })
  for (const name of [
    'Home',
    'Packages',
    'Forums',
    'Wiki',
    'AUR',
    'Download',
  ]) {
    await page.keyboard.press('Tab')
    await expect(menu.getByRole('link', { name })).toBeFocused()
  }
  await expect(download).toBeFocused()
  await expect(download).toBeVisible()
  const opacity = () =>
    download.evaluate((link) => {
      let value = 1
      for (let node = link; node; node = node.parentElement) {
        value *= Number(getComputedStyle(node).opacity)
      }
      return value
    })
  expect(await opacity()).toBeGreaterThan(0)
  await menu.evaluate((element) => {
    element.style.opacity = '0'
  })
  expect(await opacity()).toBe(0)
  await menu.evaluate((element) => {
    element.style.removeProperty('opacity')
  })
  const visibility = await download.evaluate((link) => {
    const item = link.getBoundingClientRect()
    const viewport = link.closest('#archnavbarmenu').getBoundingClientRect()
    return item.left >= viewport.left && item.right <= viewport.right
  })
  expect(visibility).toBe(true)
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#download$/)
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#firstHeading')).toHaveCSS(
    'color',
    'rgb(34, 34, 34)'
  )
})
