const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync(
  '/home/d2/dev/violet-void-theme/violet-void-theme_archwiki/dist/main.css',
  'utf-8'
)

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const page = await browser.newPage()

  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[${msg.type()}] ${msg.text()}`)
    }
  })
  page.on('pageerror', (err) => {
    errors.push(`[pageerror] ${err.message}`)
  })

  // Inject theme CSS
  await page.addStyleTag({ content: css })

  const pages = [
    { name: 'main', url: 'https://wiki.archlinux.org/' },
    { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
    { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
    {
      name: 'install',
      url: 'https://wiki.archlinux.org/title/Installation_guide',
    },
    { name: 'kernels', url: 'https://wiki.archlinux.org/title/Kernel' },
  ]

  for (const p of pages) {
    console.log(`Loading: ${p.name}...`)
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 })
  }

  await browser.close()

  if (errors.length > 0) {
    console.log('\n--- Console Errors ---')
    errors.forEach((e) => console.log(e))
  } else {
    console.log('\nNo console errors detected.')
  }
})()
