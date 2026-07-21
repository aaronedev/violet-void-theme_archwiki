const { firefox } = require('@playwright/test')
const { readScopedUserStyle } = require('./lib/userstyle-test-css')

const css = readScopedUserStyle()

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage()

  // Take screenshots with proper timing
  console.log('Capturing main page...')
  await page.goto('https://wiki.archlinux.org/', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.waitForTimeout(2000) // Wait 2 seconds for styles to apply
  await page.screenshot({
    path: '/tmp/archwiki-main-rerun.png',
    fullPage: true,
  })

  console.log('Capturing systemd page...')
  await page.goto('https://wiki.archlinux.org/title/Systemd', {
    waitUntil: 'networkidle',
  })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.waitForTimeout(2000)
  await page.screenshot({
    path: '/tmp/archwiki-systemd-rerun.png',
    fullPage: true,
  })

  console.log('Capturing pacman page...')
  await page.goto('https://wiki.archlinux.org/title/Pacman', {
    waitUntil: 'networkidle',
  })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.waitForTimeout(2000)
  await page.screenshot({
    path: '/tmp/archwiki-pacman-rerun.png',
    fullPage: true,
  })

  await browser.close()
  console.log('Screenshots saved to /tmp/archwiki-*-rerun.png')
})()
