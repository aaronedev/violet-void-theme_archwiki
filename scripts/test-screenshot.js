const { chromium } = require('playwright')
const { injectUserStyle } = require('./lib/userstyle-test-css')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  // Listen for console
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text())
  })

  await page.goto('https://wiki.archlinux.org', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  })
  await page.waitForTimeout(2000)
  await injectUserStyle(page)
  await page.waitForTimeout(1000)

  const title = await page.title()
  console.log('Page title:', title)

  const bodyHtml = await page.evaluate(() =>
    document.body ? document.body.innerHTML.substring(0, 500) : 'no body'
  )
  console.log('Body HTML (first 500):', bodyHtml)

  const allTags = await page.evaluate(() => {
    const tags = {}
    document.querySelectorAll('*').forEach((el) => {
      tags[el.tagName] = (tags[el.tagName] || 0) + 1
    })
    return tags
  })
  console.log(
    'Top tags:',
    Object.entries(allTags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  )

  await page.screenshot({ path: '.agent/archwiki/current/test-page.png' })
  console.log('Screenshot saved')

  await browser.close()
})()
