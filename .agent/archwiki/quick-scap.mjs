import { chromium } from 'playwright';
import fs from 'fs';

const CSS = fs.readFileSync('dist/main.css', 'utf8');

async function inject(page) {
  await page.evaluate(c => {
    const s = document.createElement('style');
    s.id = 'vv-theme';
    s.textContent = c;
    document.head.appendChild(s);
  }, CSS);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
try {
  await page.goto('https://wiki.archlinux.org/title/Firefox', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await inject(page);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.agent/archwiki/current/firefox-live.png', fullPage: false });
  const title = await page.title();
  console.log('Title:', title);
} catch(e) {
  console.error('Error:', e.message);
}
await browser.close();
