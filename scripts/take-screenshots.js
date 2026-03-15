const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-monorepo/themes/archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })

  // Inject theme CSS
  await page.addStyleTag({ content: css })

  const pages = [
    { name: 'archwiki-main', url: 'https://wiki.archlinux.org/', dark: false },
    {
      name: 'archwiki-systemd',
      url: 'https://wiki.archlinux.org/title/Systemd',
      dark: false,
    },
    {
      name: 'archwiki-pacman',
      url: 'https://wiki.archlinux.org/title/Pacman',
      dark: false,
    },
    {
      name: 'archwiki-install',
      url: 'https://wiki.archlinux.org/title/Installation_guide',
      dark: false,
    },
    {
      name: 'archwiki-kernels',
      url: 'https://wiki.archlinux.org/title/Kernel',
      dark: false,
    },
  ]

  for (const p of pages) {
    console.log(`Screenshot: ${p.name}`)
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.screenshot({
      path: `screenshots/${p.name}-${Date.now()}.png`,
      fullPage: false,
    })
  }

  await browser.close()
  console.log('Done!')
})()
