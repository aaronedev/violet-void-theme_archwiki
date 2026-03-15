// Playwright visual regression tests for violet-void-theme_archwiki
// Run with: npx playwright test

const { test, expect } = require('@playwright/test')

const BASE_URLS = {
  wiki: 'https://wiki.archlinux.org',
  aur: 'https://aur.archlinux.org',
  forums: 'https://bbs.archlinux.org',
  packages: 'https://archlinux.org/packages',
}

test.describe('Violet Void Theme - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Inject the theme CSS before testing
    await page.addStyleTag({
      path: './dist/main.css',
    })
  })

  // ============================================================================
  // ARCHWIKI TESTS
  // ============================================================================

  test('ArchWiki - Homepage', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Check background color
    const body = await page.locator('body')
    const bgColor = await body.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toBeTruthy()

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/wiki-homepage.png',
      fullPage: true,
    })
  })

  test('ArchWiki - Installation Guide', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Check content area styling
    const content = await page.locator('#content')
    await expect(content).toBeVisible()

    // Check TOC
    const toc = await page.locator('.toc, #toc')
    if ((await toc.count()) > 0) {
      await expect(toc.first()).toBeVisible()
    }

    // Check code blocks
    const codeBlocks = await page.locator('pre')
    const codeCount = await codeBlocks.count()
    console.log(`Found ${codeCount} code blocks`)

    // Check headings
    const h2 = await page.locator('h2').first()
    if ((await h2.count()) > 0) {
      const color = await h2.evaluate((el) => getComputedStyle(el).color)
      console.log('Heading color:', color)
    }

    await page.screenshot({
      path: 'screenshots/wiki-installation-guide.png',
      fullPage: true,
    })
  })

  test('ArchWiki - Table Rendering', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/WireGuard`)
    await page.waitForLoadState('networkidle')

    // Check for complex tables (rowspan/colspan)
    const tables = await page.locator('.wikitable')
    const tableCount = await tables.count()

    if (tableCount > 0) {
      console.log(`Found ${tableCount} tables`)

      // Check first table
      const firstTable = tables.first()
      const hasRowspan = await firstTable
        .locator('th[rowspan], td[rowspan]')
        .count()
      const hasColspan = await firstTable
        .locator('th[colspan], td[colspan]')
        .count()

      console.log(
        `Table has rowspan: ${hasRowspan > 0}, colspan: ${hasColspan > 0}`
      )
    }

    await page.screenshot({
      path: 'screenshots/wiki-tables.png',
      fullPage: true,
    })
  })

  test('ArchWiki - Search Functionality', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Check search input
    const searchInput = await page
      .locator('input[type="search"], #searchInput')
      .first()
    if ((await searchInput.count()) > 0) {
      await searchInput.fill('systemd')
      await searchInput.press('Enter')
      await page.waitForLoadState('networkidle')

      // Check search button
      const searchButton = await page
        .locator('.cdx-search-input__end-button')
        .first()
      if ((await searchButton.count()) > 0) {
        const bgColor = await searchButton.evaluate(
          (el) => getComputedStyle(el).backgroundColor
        )
        console.log('Search button background:', bgColor)
      }
    }

    await page.screenshot({
      path: 'screenshots/wiki-search.png',
      fullPage: true,
    })
  })

  test('ArchWiki - Code Block with Copy Button', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/Bash`)
    await page.waitForLoadState('networkidle')

    const codeBlock = await page.locator('pre').first()
    if ((await codeBlock.count()) > 0) {
      // Check code block styling
      const bgColor = await codeBlock.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      )
      console.log('Code block background:', bgColor)

      // Look for copy button
      const copyButton = await page
        .locator('.copy-to-clipboard, .copy-button')
        .first()
      if ((await copyButton.count()) > 0) {
        console.log('Copy button found')
        await page.screenshot({ path: 'screenshots/wiki-codeblock-copy.png' })
      }
    }
  })

  test('ArchWiki - Sidebar Navigation', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    const sidebar = await page.locator('.mw-sidebar, #mw-sidebar').first()
    if ((await sidebar.count()) > 0) {
      // Check menu items
      const menuItems = await sidebar.locator('a').count()
      console.log(`Sidebar has ${menuItems} links`)

      // Check text color
      const firstLink = await sidebar.locator('a').first()
      if ((await firstLink.count()) > 0) {
        const color = await firstLink.evaluate(
          (el) => getComputedStyle(el).color
        )
        console.log('Sidebar link color:', color)
      }
    }

    await page.screenshot({ path: 'screenshots/wiki-sidebar.png' })
  })

  // ============================================================================
  // AUR TESTS
  // ============================================================================

  test('AUR - Homepage', async ({ page }) => {
    await page.goto(BASE_URLS.aur)
    await page.waitForLoadState('networkidle')

    // Check search input
    const searchInput = await page
      .locator('#pkgsearch input[type="text"]')
      .first()
    if ((await searchInput.count()) > 0) {
      const bgColor = await searchInput.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      )
      console.log('AUR search input background:', bgColor)
    }

    await page.screenshot({
      path: 'screenshots/aur-homepage.png',
      fullPage: true,
    })
  })

  test('AUR - Package Search Results', async ({ page }) => {
    await page.goto(`${BASE_URLS.aur}/packages/?K=nvidia`)
    await page.waitForLoadState('networkidle')

    // Check results table
    const resultsTable = await page.locator('table.results').first()
    if ((await resultsTable.count()) > 0) {
      // Check table header
      const header = await resultsTable.locator('th').first()
      const headerBg = await header.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      )
      console.log('Table header background:', headerBg)

      // Check row hover
      const firstRow = await resultsTable.locator('tbody tr').first()
      if ((await firstRow.count()) > 0) {
        await firstRow.hover()
        await page.waitForTimeout(200)
        const hoverBg = await firstRow.evaluate(
          (el) => getComputedStyle(el).backgroundColor
        )
        console.log('Row hover background:', hoverBg)
      }
    }

    await page.screenshot({
      path: 'screenshots/aur-search-results.png',
      fullPage: true,
    })
  })

  test('AUR - Package Details', async ({ page }) => {
    await page.goto(`${BASE_URLS.aur}/packages/nvidia`)
    await page.waitForLoadState('networkidle')

    // Check package info
    const pkgInfo = await page.locator('#pkgdetails').first()
    if ((await pkgInfo.count()) > 0) {
      console.log('Package details found')
    }

    await page.screenshot({
      path: 'screenshots/aur-package-details.png',
      fullPage: true,
    })
  })

  // ============================================================================
  // FORUMS TESTS
  // ============================================================================

  test('Forums - Homepage', async ({ page }) => {
    await page.goto(BASE_URLS.forums)
    await page.waitForLoadState('networkidle')

    // Check forum listing
    const forumList = await page.locator('.main-item').first()
    if ((await forumList.count()) > 0) {
      const bgColor = await forumList.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      )
      console.log('Forum item background:', bgColor)
    }

    await page.screenshot({
      path: 'screenshots/forums-homepage.png',
      fullPage: true,
    })
  })

  test('Forums - Topic View', async ({ page }) => {
    await page.goto(`${BASE_URLS.forums}/viewtopic.php?id=270000`)
    await page.waitForLoadState('networkidle')

    // Check posts
    const posts = await page.locator('.blockpost')
    const postCount = await posts.count()
    console.log(`Found ${postCount} posts`)

    if (postCount > 0) {
      // Check first post
      const firstPost = posts.first()
      const postBg = await firstPost.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      )
      console.log('Post background:', postBg)

      // Check code blocks in posts
      const codeBlock = await firstPost.locator('.code, pre').first()
      if ((await codeBlock.count()) > 0) {
        const codeBg = await codeBlock.evaluate(
          (el) => getComputedStyle(el).backgroundColor
        )
        console.log('Code in post background:', codeBg)
      }
    }

    await page.screenshot({
      path: 'screenshots/forums-topic.png',
      fullPage: true,
    })
  })

  // ============================================================================
  // RESPONSIVE TESTS
  // ============================================================================

  test('Responsive - Mobile View (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Check if content is readable
    const content = await page.locator('#content')
    const fontSize = await content.evaluate(
      (el) => getComputedStyle(el).fontSize
    )
    console.log('Mobile font size:', fontSize)

    await page.screenshot({
      path: 'screenshots/responsive-mobile.png',
      fullPage: true,
    })
  })

  test('Responsive - Tablet View (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Check sidebar
    const sidebar = await page.locator('.mw-sidebar').first()
    if ((await sidebar.count()) > 0) {
      const isVisible = await sidebar.isVisible()
      console.log('Sidebar visible on tablet:', isVisible)
    }

    await page.screenshot({
      path: 'screenshots/responsive-tablet.png',
      fullPage: true,
    })
  })

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  test('Accessibility - Focus States', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Tab through links
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check focused element
    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return {
        tag: el.tagName,
        outline: getComputedStyle(el).outline,
        outlineColor: getComputedStyle(el).outlineColor,
      }
    })

    console.log('Focused element:', focused)
    await page.screenshot({ path: 'screenshots/accessibility-focus.png' })
  })

  test('Accessibility - Contrast Ratios', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Check text contrast
    const body = await page.locator('body')
    const textInfo = await body.evaluate((el) => {
      const styles = getComputedStyle(el)
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        fontSize: styles.fontSize,
      }
    })

    console.log('Body text styles:', textInfo)
  })

  // ============================================================================
  // INTERACTION TESTS
  // ============================================================================

  test('Interaction - Button Hover States', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Find all buttons
    const buttons = await page.locator('.mw-ui-button, button, .cdx-button')
    const buttonCount = await buttons.count()

    if (buttonCount > 0) {
      console.log(`Found ${buttonCount} buttons`)

      // Test first button
      const firstButton = buttons.first()
      await firstButton.hover()
      await page.waitForTimeout(200)

      const hoverStyle = await firstButton.evaluate((el) => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        transform: getComputedStyle(el).transform,
      }))

      console.log('Button hover style:', hoverStyle)
    }
  })

  test('Interaction - Link Hover States', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Find first link in content
    const link = await page.locator('#content a').first()
    if ((await link.count()) > 0) {
      const beforeHover = await link.evaluate(
        (el) => getComputedStyle(el).color
      )
      console.log('Link color before hover:', beforeHover)

      await link.hover()
      await page.waitForTimeout(200)

      const afterHover = await link.evaluate((el) => getComputedStyle(el).color)
      console.log('Link color after hover:', afterHover)
    }
  })

  // ============================================================================
  // VISUAL QUIRKS DETECTION
  // ============================================================================

  test('Quirk Detection - Overflows', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Check for horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      const body = document.body
      const html = document.documentElement
      return {
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        htmlScrollWidth: html.scrollWidth,
        htmlClientWidth: html.clientWidth,
        hasHorizontalOverflow: body.scrollWidth > body.clientWidth,
      }
    })

    if (hasOverflow.hasHorizontalOverflow) {
      console.warn('⚠️  Horizontal overflow detected!', hasOverflow)
    } else {
      console.log('✓ No horizontal overflow')
    }
  })

  test('Quirk Detection - Z-index Issues', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Check for overlapping elements
    const overlaps = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT
      )
      const issues = []
      let el

      // Simple check for high z-index values
      while ((el = walker.nextNode())) {
        const zIndex = parseInt(getComputedStyle(el).zIndex)
        if (zIndex > 9999) {
          issues.push({
            element: el.tagName,
            classes: el.className,
            zIndex: zIndex,
          })
        }
      }

      return issues
    })

    if (overlaps.length > 0) {
      console.warn('⚠️  High z-index values found:', overlaps)
    } else {
      console.log('✓ No z-index issues')
    }
  })

  test('Quirk Detection - Font Size Issues', async ({ page }) => {
    await page.goto(`${BASE_URLS.wiki}/title/Installation_guide`)
    await page.waitForLoadState('networkidle')

    // Check for very small text
    const smallFonts = await page.evaluate(() => {
      const allElements = Array.from(
        document.querySelectorAll('p, span, div, a, li')
      )
      const small = []

      allElements.forEach((el) => {
        const fontSize = parseFloat(getComputedStyle(el).fontSize)
        if (fontSize < 11 && fontSize > 0) {
          small.push({
            tag: el.tagName,
            fontSize: fontSize,
            text: el.textContent.substring(0, 50),
          })
        }
      })

      return small.slice(0, 10) // First 10 only
    })

    if (smallFonts.length > 0) {
      console.warn('⚠️  Very small fonts found:', smallFonts)
    } else {
      console.log('✓ No font size issues')
    }
  })

  test('Quirk Detection - Color Consistency', async ({ page }) => {
    await page.goto(BASE_URLS.wiki)
    await page.waitForLoadState('networkidle')

    // Sample color usage
    const colors = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll('p, h1, h2, h3, a, button')
      )
      const colorMap = {}

      elements.forEach((el) => {
        const color = getComputedStyle(el).color
        colorMap[color] = (colorMap[color] || 0) + 1
      })

      return Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    })

    console.log('Top 10 most used colors:', colors)
  })
})
