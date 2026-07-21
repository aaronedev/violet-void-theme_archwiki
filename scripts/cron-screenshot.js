const { firefox } = require('playwright')
const path = require('path')
const { readScopedUserStyle } = require('./lib/userstyle-test-css')

const css = readScopedUserStyle()

;(async () => {
  const browser = await firefox.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
  })
  const page = await context.newPage()

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
    await page.addStyleTag({ content: css })
    await page.screenshot({
      path: `${screenshotDir}/cron-${p.name}.png`,
      fullPage: false,
    })
  }

  await browser.close()
  console.log('Done!')
})()
