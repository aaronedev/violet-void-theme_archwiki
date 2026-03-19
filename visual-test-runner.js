const { firefox } = require('playwright')
const fs = require('fs')
const css = fs.readFileSync('./dist/main.css', 'utf-8')

const pages = [
  { name: 'homepage', url: 'https://wiki.archlinux.org/?useskin=vector-dark' },
  { name: 'installation', url: 'https://wiki.archlinux.org/title/Installation_guide?useskin=vector-dark' },
  { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman?useskin=vector-dark' }
]

const consoleMessages = []

;(async () => {
  const browser = await firefox.launch({ headless: true })
  
  for (const p of pages) {
    console.log(`Testing: ${p.name}`)
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(`[${p.name}] ${msg.text()}`)
      }
    })
    
    page.on('pageerror', err => {
      consoleMessages.push(`[${p.name}] PAGE ERROR: ${err.message}`)
    })
    
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.addStyleTag({ content: css })
      await page.screenshot({ path: `screenshot-${p.name}.png`, fullPage: false })
      console.log(`  ✓ Screenshot saved`)
    } catch (e) {
      console.log(`  ✗ Error: ${e.message}`)
    }
    
    await page.close()
  }
  
  await browser.close()
  
  console.log('\n--- Console Errors ---')
  if (consoleMessages.length === 0) {
    console.log('No console errors detected!')
  } else {
    consoleMessages.forEach(m => console.log(m))
  }
})()
