const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-monorepo/themes/archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage()

  // Inject theme CSS
  await page.addStyleTag({ content: css })

  // Take screenshots
  console.log('Taking screenshot: main page...')
  await page.goto('https://wiki.archlinux.org/', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.screenshot({ path: '/tmp/archwiki-main.png', fullPage: true })

  console.log('Taking screenshot: systemd page...')
  await page.goto('https://wiki.archlinux.org/title/Systemd', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.screenshot({ path: '/tmp/archwiki-systemd.png', fullPage: true })

  console.log('Taking screenshot: pacman page...')
  await page.goto('https://wiki.archlinux.org/title/Pacman', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.screenshot({ path: '/tmp/archwiki-pacman.png', fullPage: true })

  await browser.close()
  console.log('Done!')
})()
