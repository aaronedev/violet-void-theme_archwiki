const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: '.',
  timeout: 60000,
  use: {
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: 'list',
})
