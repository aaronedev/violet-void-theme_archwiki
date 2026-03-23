const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  // Load the theme
  await page.goto('https://wiki.archlinux.org');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({ path: './dist/main.css' });
  await page.waitForTimeout(500);

  const pages = [
    { name: 'main-page', url: 'https://wiki.archlinux.org/title/Main_page' },
    { name: 'systemd', url: 'https://wiki.archlinux.org/title/Systemd' },
    { name: 'pacman', url: 'https://wiki.archlinux.org/title/Pacman' },
    { name: 'installation-guide', url: 'https://wiki.archlinux.org/title/Installation_guide' },
  ];

  const states = [
    { name: 'default', fn: async () => {} },
    { name: 'menu-open', fn: async () => {
      // Click the main menu dropdown
      const menuBtn = await page.locator('#vector-main-menu-dropdown-checkbox').first();
      if (await menuBtn.count() > 0) {
        await menuBtn.check({ force: true });
        await page.waitForTimeout(500);
      }
    }},
    { name: 'toc-open', fn: async () => {
      // Try to find and click TOC toggle
      const tocToggle = await page.locator('#toc-toggle, .toc-toggle, [data-target="toc"]').first();
      if (await tocToggle.count() > 0) {
        await tocToggle.click();
        await page.waitForTimeout(300);
      }
    }},
  ];

  const results = [];
  
  for (const p of pages) {
    for (const s of states) {
      try {
        await page.goto(p.url, { waitUntil: 'networkidle' });
        await page.addStyleTag({ path: './dist/main.css' });
        await page.waitForTimeout(300);
        await s.fn();
        await page.waitForTimeout(300);
        
        const path = `.agent/archwiki/current/${p.name}.desktop.${s.name}.png`;
        await page.screenshot({ path, fullPage: false });
        results.push({ page: p.name, state: s.name, status: 'ok', path });
        
        // Uncheck menu if open
        if (s.name === 'menu-open') {
          await page.locator('#vector-main-menu-dropdown-checkbox').first().uncheck({ force: true }).catch(() => {});
          await page.waitForTimeout(200);
        }
      } catch(e) {
        results.push({ page: p.name, state: s.name, status: 'error', error: e.message.slice(0, 100) });
      }
    }
  }

  // Mobile narrow width
  await context.close();
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.addStyleTag({ path: './dist/main.css' });
  
  for (const p of pages.slice(0, 2)) {
    for (const s of states) {
      try {
        await mobilePage.goto(p.url, { waitUntil: 'networkidle' });
        await mobilePage.addStyleTag({ path: './dist/main.css' });
        await mobilePage.waitForTimeout(300);
        await s.fn();
        await mobilePage.waitForTimeout(300);
        
        const path = `.agent/archwiki/current/${p.name}.mobile.${s.name}.png`;
        await mobilePage.screenshot({ path, fullPage: false });
        results.push({ page: p.name, state: s.name, status: 'ok', path, mobile: true });
        
        if (s.name === 'menu-open') {
          await mobilePage.locator('#vector-main-menu-dropdown-checkbox').first().uncheck({ force: true }).catch(() => {});
          await mobilePage.waitForTimeout(200);
        }
      } catch(e) {
        results.push({ page: p.name, state: s.name, status: 'error', error: e.message.slice(0, 100), mobile: true });
      }
    }
  }

  await browser.close();
  
  console.log('\n=== CAPTURE RESULTS ===');
  for (const r of results) {
    const flag = r.status === 'error' ? '❌' : '✅';
    const mobile = r.mobile ? ' [mobile]' : ' [desktop]';
    if (r.status === 'error') {
      console.log(`${flag} ${r.page}${mobile} - ${r.state}: ${r.error}`);
    } else {
      console.log(`${flag} ${r.page}${mobile} - ${r.state}: ${r.path}`);
    }
  }
})();
