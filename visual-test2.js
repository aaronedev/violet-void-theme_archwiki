const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-theme/violet-void-theme_archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })

  // Set dark mode cookie before navigating
  const context = await browser.newContext({
    cookies: [
      { name: 'skin', value: 'hydra-dark', url: 'https://wiki.archlinux.org/' },
    ],
  })
  const page = await context.newPage()

  await page.goto('https://wiki.archlinux.org/', { waitUntil: 'networkidle' })

  // Inject CSS as last style tag to override
  await page.evaluate((c) => {
    const style = document.createElement('style')
    style.textContent = c
    style.id = 'vv-theme'
    document.documentElement.appendChild(style)
  }, css)

  await page.screenshot({ path: '/tmp/archwiki-main-vv.png', fullPage: true })
  console.log('Main vv done')

  await page.goto('https://wiki.archlinux.org/title/Systemd', {
    waitUntil: 'networkidle',
  })
  await page.evaluate((c) => {
    let s = document.getElementById('vv-theme')
    if (!s) {
      s = document.createElement('style')
      s.id = 'vv-theme'
      document.documentElement.appendChild(s)
    }
    s.textContent = c
  }, css)
  await page.screenshot({
    path: '/tmp/archwiki-systemd-vv.png',
    fullPage: true,
  })
  console.log('Systemd vv done')

  await page.goto('https://wiki.archlinux.org/title/Pacman', {
    waitUntil: 'networkidle',
  })
  await page.evaluate((c) => {
    let s = document.getElementById('vv-theme')
    if (!s) {
      s = document.createElement('style')
      s.id = 'vv-theme'
      document.documentElement.appendChild(s)
    }
    s.textContent = c
  }, css)
  await page.screenshot({ path: '/tmp/archwiki-pacman-vv.png', fullPage: true })
  console.log('Pacman vv done')

  await browser.close()
})()
