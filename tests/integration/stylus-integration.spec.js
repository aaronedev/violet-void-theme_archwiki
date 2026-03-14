const { test: base, chromium, expect } = require('@playwright/test')
const path = require('path')
const fs = require('fs')
const http = require('http')

const test = base.extend({
  context: async ({}, use, testInfo) => {
    const pathToExtension = path.join(__dirname, 'stylus')
    const userDataDir = path.join(
      __dirname,
      `../../test-user-data-integration-${testInfo.workerIndex}`
    )

    if (fs.existsSync(userDataDir)) {
      try {
        fs.rmSync(userDataDir, { recursive: true, force: true })
      } catch {}
    }

    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    })

    await use({ context })
    await context.close()
  },
})

function getInstallSourceUrl(urlString) {
  const url = new URL(urlString)

  if (!url.pathname.endsWith('/install-usercss.html')) {
    return null
  }

  const updateUrl = url.searchParams.get('updateUrl')
  if (updateUrl) {
    return updateUrl
  }

  if (url.hash.length > 1) {
    return decodeURIComponent(url.hash.slice(1))
  }

  return null
}

function brightnessFromRgb(backgroundColor) {
  const rgb = backgroundColor.match(/\d+/g)
  if (!rgb || rgb.length < 3) {
    return Number.POSITIVE_INFINITY
  }

  return rgb
    .slice(0, 3)
    .map(Number)
    .reduce((sum, value) => sum + value, 0)
}

async function expectStylusInstallPage(page, themeUrl) {
  await expect
    .poll(() => page.url(), {
      timeout: 15000,
      message:
        'Expected Stylus to redirect the .user.css request into install-usercss.html',
    })
    .toMatch(/install-usercss\.html/)

  const installPageUrl = page.url()

  expect(
    installPageUrl,
    `Stylus stayed on manage.html instead of opening an install page: ${installPageUrl}`
  ).not.toContain('/manage.html')

  const sourceUrl = getInstallSourceUrl(installPageUrl)
  expect(
    sourceUrl,
    `Malformed Stylus install URL, expected updateUrl query or hash source: ${installPageUrl}`
  ).toBeTruthy()
  expect(sourceUrl).toBe(themeUrl)

  await expect(page.locator('.CodeMirror')).toContainText('==/UserStyle==', {
    timeout: 15000,
  })
  await expect(page.locator('button.install')).toHaveCount(1)
}

async function expectActionableInstallState(page) {
  const installButton = page.locator('button.install')

  await expect(installButton).toBeEnabled({ timeout: 15000 })
  await expect(page.locator('.CodeMirror')).toContainText('==/UserStyle==', {
    timeout: 15000,
  })
  await expect
    .poll(
      () =>
        installButton.evaluate(
          (button) => typeof button.onclick === 'function'
        ),
      {
        timeout: 15000,
        message:
          'Expected Stylus to attach the install handler before clicking',
      }
    )
    .toBe(true)
}

async function openInstallPageFromManage(page, extensionId, themeUrl) {
  const installUrl = `chrome-extension://${extensionId}/install-usercss.html?updateUrl=${encodeURIComponent(themeUrl)}`

  expect(
    getInstallSourceUrl(installUrl),
    `Malformed Stylus install URL before navigation: ${installUrl}`
  ).toBe(themeUrl)

  await page.goto(installUrl, { waitUntil: 'domcontentloaded' })

  await expectStylusInstallPage(page, themeUrl)
}

async function clickInstallUntilInstalled(page, installButton) {
  let bodyClass = ''
  let buttonClass = ''

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await installButton.evaluate((button) => button.click())

    try {
      await expect
        .poll(
          async () => {
            bodyClass = (await page.locator('body').getAttribute('class')) || ''
            buttonClass = (await installButton.getAttribute('class')) || ''
            return /installed/.test(bodyClass) || /installed/.test(buttonClass)
          },
          {
            timeout: 5000,
            message: `Expected Stylus install to complete after click attempt ${attempt}`,
          }
        )
        .toBe(true)

      return { bodyClass, buttonClass, attempts: attempt }
    } catch (error) {
      if (attempt === 3) {
        throw error
      }

      await page.waitForTimeout(1000)
    }
  }

  return { bodyClass, buttonClass, attempts: 3 }
}

test.describe('Stylus Extension Integration', () => {
  let server
  let port
  const host = '127.0.0.1'

  test.beforeAll(async ({}, testInfo) => {
    const cssPath = path.join(__dirname, '../../dist/main.css')

    server = http.createServer((req, res) => {
      console.log(`[SERVER] Request: ${req.url}`)

      if (req.url === '/main.user.css') {
        const css = fs.readFileSync(cssPath, 'utf8')
        res.writeHead(200, {
          'Content-Type': 'text/css; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        })
        res.end(css)
        console.log('[SERVER] Served main.user.css')
        return
      }

      res.writeHead(404)
      res.end()
    })

    await new Promise((resolve) => server.listen(0, host, resolve))
    port = server.address().port
    console.log(`[SERVER] Running at http://${host}:${port}/main.user.css`)
  })

  test.afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve))
    }
  })

  test('Install theme into Stylus and verify ArchWiki', async ({
    context: { context },
  }) => {
    const themeUrl = `http://${host}:${port}/main.user.css`

    console.log('[TEST] Finding Stylus Extension ID...')
    let [background] = context.serviceWorkers()
    if (!background) {
      background = await context
        .waitForEvent('serviceworker', { timeout: 15000 })
        .catch(() => null)
    }

    const extensionId = background
      ? background.url().split('/')[2]
      : 'clngdbkpkpeebahjckkjfobafhncgmne'
    console.log(`[TEST] Using Extension ID: ${extensionId}`)

    const page = await context.newPage()
    page.on('console', (msg) => console.log(`[BROWSER] ${msg.text()}`))
    page.on('pageerror', (err) => console.log(`[BROWSER ERROR] ${err.message}`))

    console.log(
      '[TEST] Opening Stylus via the supported in-extension installer path...'
    )
    await openInstallPageFromManage(page, extensionId, themeUrl)
    console.log(`[TEST] Install page URL confirmed: ${page.url()}`)

    const installButton = page.locator('button.install')
    await expectActionableInstallState(page)
    await page.waitForTimeout(3000)
    const installState = await clickInstallUntilInstalled(page, installButton)
    expect(/installed/.test(installState.bodyClass)).toBe(true)
    expect(/installed/.test(installState.buttonClass)).toBe(true)
    await expect(page.locator('body')).toContainText('Style is installed', {
      timeout: 15000,
    })
    await page.waitForTimeout(3000)

    let persistedStyle = null
    await expect
      .poll(
        async () => {
          const currentBackground = context.serviceWorkers()[0] || background
          persistedStyle = await currentBackground.evaluate(
            async (updateUrl) => {
              const styles = await API.styles.getAll()
              const match = styles.find(
                (style) => style.updateUrl === updateUrl
              )

              if (!match) {
                return null
              }

              return {
                id: match.id,
                name: match.name,
                enabled: match.enabled,
                hasUsercss: !!match.usercssData,
                updateUrl: match.updateUrl,
              }
            },
            themeUrl
          )

          return persistedStyle ? 1 : 0
        },
        {
          timeout: 15000,
          message:
            'Expected Stylus background state to contain the installed style record',
        }
      )
      .toBe(1)

    expect(persistedStyle.name).toBe('violet-void-theme_archwiki')
    expect(persistedStyle.enabled).toBe(true)
    expect(persistedStyle.hasUsercss).toBe(true)
    console.log('[TEST] Theme installed in Stylus')

    const manageLink = page.locator('a[href="manage.html"]')
    await manageLink.evaluate((link) => link.click())
    await page.waitForURL(
      new RegExp(`chrome-extension://${extensionId}/manage\\.html`),
      {
        timeout: 15000,
      }
    )
    console.log(`[TEST] Manage page URL confirmed: ${page.url()}`)

    const wikiPage = await context.newPage()
    await wikiPage.goto('https://wiki.archlinux.org/title/Main_page', {
      waitUntil: 'domcontentloaded',
    })

    let lastBackground = ''
    await expect
      .poll(
        async () => {
          lastBackground = await wikiPage.evaluate(
            () => getComputedStyle(document.body).backgroundColor
          )
          return brightnessFromRgb(lastBackground)
        },
        {
          timeout: 20000,
          message: 'Expected Stylus to apply the theme on ArchWiki',
        }
      )
      .toBeLessThan(450)

    console.log(`[TEST] ArchWiki Background: ${lastBackground}`)
    await wikiPage.screenshot({
      path: 'screenshots/integration-archwiki.png',
      fullPage: true,
    })
  })
})
