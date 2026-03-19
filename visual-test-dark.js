const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-theme/violet-void-theme_archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage()

  // Inject theme CSS
  await page.addStyleTag({ content: css })

  // Take screenshots with dark mode
  console.log('Taking screenshot: main page (dark)...')
  await page.goto('https://wiki.archlinux.org/?useskin=vector-dark', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.screenshot({ path: '/tmp/archwiki-main-dark.png', fullPage: true })

  console.log('Taking screenshot: systemd page (dark)...')
  await page.goto(
    'https://wiki.archlinux.org/title/Systemd?useskin=vector-dark',
    {
      waitUntil: 'networkidle',
      timeout: 30000,
    }
  )
  await page.screenshot({
    path: '/tmp/archwiki-systemd-dark.png',
    fullPage: true,
  })

  console.log('Taking screenshot: pacman page (dark)...')
  await page.goto(
    'https://wiki.archlinux.org/title/Pacman?useskin=vector-dark',
    {
      waitUntil: 'networkidle',
      timeout: 30000,
    }
  )
  await page.screenshot({
    path: '/tmp/archwiki-pacman-dark.png',
    fullPage: true,
  })

  await browser.close()
  console.log('Done!')
})()
