const { firefox } = require('@playwright/test')
const fs = require('fs')
const path = require('path')
const css = fs.readFileSync(path.join(__dirname, '../dist/main.css'), 'utf-8')

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage()

  // Take screenshots
  console.log('Capturing main page...')
  await page.goto('https://wiki.archlinux.org/', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.screenshot({ path: '/tmp/archwiki-main.png', fullPage: true })

  console.log('Capturing systemd page...')
  await page.goto('https://wiki.archlinux.org/title/Systemd', {
    waitUntil: 'networkidle',
  })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.screenshot({ path: '/tmp/archwiki-systemd.png', fullPage: true })

  console.log('Capturing pacman page...')
  await page.goto('https://wiki.archlinux.org/title/Pacman', {
    waitUntil: 'networkidle',
  })
  await page.addStyleTag({ content: css }) // Inject after page load
  await page.screenshot({ path: '/tmp/archwiki-pacman.png', fullPage: true })

  await browser.close()
  console.log('Screenshots saved to /tmp/archwiki-*.png')
})()
