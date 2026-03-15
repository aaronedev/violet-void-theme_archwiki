const { firefox } = require('playwright')
const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.join(__dirname, '../dist/main.css'), 'utf-8')

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
  })
  const page = await context.newPage()

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

  const screenshotDir = path.join(__dirname, '../screenshots')

  for (const p of pages) {
    console.log(`Screenshot: ${p.name}...`)
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.screenshot({
      path: `${screenshotDir}/cron-${p.name}.png`,
      fullPage: false,
    })
  }

  await browser.close()
  console.log('Done!')
})()
