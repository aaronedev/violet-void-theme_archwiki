const { firefox } = require('playwright')
const fs = require('fs')
const path = require('path')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-monorepo/themes/archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Force dark mode first
  await page.goto('https://wiki.archlinux.org/', { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    localStorage.setItem('userStyle', 'dark')
    document.cookie = 'skin=hydra-dark; path=/'
  })
  await page.reload({ waitUntil: 'networkidle' })

  // Inject CSS
  await page.evaluate((c) => {
    const style = document.createElement('style')
    style.id = 'violet-void-theme'
    style.textContent = c
    document.head.appendChild(style)
  }, css)

  await page.screenshot({ path: '/tmp/archwiki-main-dark.png', fullPage: true })
  console.log('Main dark page done')

  await page.goto('https://wiki.archlinux.org/title/Systemd', {
    waitUntil: 'networkidle',
  })
  await page.evaluate((c) => {
    let style = document.getElementById('violet-void-theme')
    if (!style) {
      style = document.createElement('style')
      style.id = 'violet-void-theme'
      document.head.appendChild(style)
    }
    style.textContent = c
  }, css)
  await page.screenshot({
    path: '/tmp/archwiki-systemd-dark.png',
    fullPage: true,
  })
  console.log('Systemd dark page done')

  await page.goto('https://wiki.archlinux.org/title/Pacman', {
    waitUntil: 'networkidle',
  })
  await page.evaluate((c) => {
    let style = document.getElementById('violet-void-theme')
    if (!style) {
      style = document.createElement('style')
      style.id = 'violet-void-theme'
      document.head.appendChild(style)
    }
    style.textContent = c
  }, css)
  await page.screenshot({
    path: '/tmp/archwiki-pacman-dark.png',
    fullPage: true,
  })
  console.log('Pacman dark page done')

  await browser.close()
  console.log('All dark mode screenshots captured')
})()
