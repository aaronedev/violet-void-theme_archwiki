# Playwright Visual Regression Tests

Automated testing suite for violet-void-theme_archwiki to detect visual quirks and issues.

## Setup

```bash
# Install Playwright
npm install

# Install browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Debug mode
npm run test:debug

# View report
npm run test:report
```

## Test Coverage

### Sites Tested
- ✅ ArchWiki (wiki.archlinux.org)
- ✅ AUR (aur.archlinux.org)
- ✅ Forums (bbs.archlinux.org)

### What Tests Check

#### Visual Regression
- Homepage rendering
- Article pages
- Tables (complex with rowspan/colspan)
- Code blocks with copy buttons
- Search functionality
- Sidebar navigation
- Package pages
- Forum posts

#### Responsive Design
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)

#### Accessibility
- Focus states
- Contrast ratios
- Keyboard navigation

#### Interactions
- Button hover states
- Link hover states
- Form inputs

#### Quirk Detection
- Horizontal overflow
- Z-index issues
- Font size problems
- Color consistency

## Test Categories

### 1. Visual Regression Tests
Capture screenshots and compare against baseline.

### 2. Accessibility Tests
Check focus states, contrast, keyboard navigation.

### 3. Responsive Tests
Test at different viewport sizes.

### 4. Quirk Detection Tests
Find visual bugs automatically:
- Overflows
- Z-index conflicts
- Tiny fonts
- Inconsistent colors

## Screenshots

Screenshots are saved to `screenshots/` directory:
```
screenshots/
├── wiki-homepage.png
├── wiki-installation-guide.png
├── wiki-tables.png
├── aur-homepage.png
├── forums-topic.png
└── ...
```

## Test Results

Results are saved to:
- `test-results/` - Screenshots, videos, traces
- `playwright-report/` - HTML report
- `test-results.json` - JSON report

## CI/CD Integration

Add to GitHub Actions:

```yaml
name: Visual Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Writing New Tests

```javascript
test('New visual test', async ({ page }) => {
  // Navigate
  await page.goto('https://wiki.archlinux.org/title/Page');

  // Inject theme CSS
  await page.addStyleTag({ path: './dist/main.css' });

  // Check element
  const element = await page.locator('.my-element');
  const style = await element.evaluate(el => getComputedStyle(el));

  console.log('Element style:', style);

  // Take screenshot
  await page.screenshot({ path: 'screenshots/my-test.png' });
});
```

## Debugging Failed Tests

```bash
# Run specific test
npx playwright test test-name

# Debug mode
npm run test:debug

# View trace
npx playwright show-trace trace.zip
```

## Common Issues

### Theme Not Applied
Make sure `dist/main.css` exists and is built:
```bash
npm run build
```

### Browser Not Installed
```bash
npx playwright install
```

### Screenshots Don't Match
Update baseline:
```bash
npx playwright test --update-snapshots
```

## Benefits

✅ **Catch visual bugs early** - Before users notice
✅ **Test all browsers** - Chrome, Firefox, Safari
✅ **Mobile testing** - Real device emulation
✅ **Automated quirk detection** - Find issues automatically
✅ **CI/CD ready** - Integrate with GitHub Actions
✅ **Visual reports** - See exactly what failed

## Integration with Skills

These tests work with:
- **violet-void-review** - Code quality checks
- **violet-void-testing** - Manual testing guide
- **Automated cron** - Continuous improvement

## Tips

1. Run tests locally before committing
2. Check the HTML report for failures
3. Update screenshots when making intentional changes
4. Use debug mode to step through tests
5. Write tests for new components immediately

## Notes

- Tests run in headless mode by default
- Screenshots are only taken on failure
- Traces help debug flaky tests
- Videos saved for failed tests
- Parallel execution for speed
