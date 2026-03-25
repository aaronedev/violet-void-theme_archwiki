### Top 3 Most Important Issues
1. **Broken Selectors/Invalid CSS in Navigation Tooltips**
   - **File:** `src/components/navigation.styl`
   - **Lines:** `1911, 1928, 1972, 1973`
   - **Issue:** The CSS uses `rgba(var(--theme-arch-blue), 0.15)` inside an `@supports selector(:interest-source)` block, but `--theme-arch-blue` is defined as a hex code (`#8950c7`). The browser cannot parse a single hex string into the expected R, G, B channels for `rgba()`, rendering the CSS property invalid and breaking interest-source hover states. *(Note: Addressed in recent fix during this session, replaced with hardcoded `#8950c7` and `#c7b8ff`)*

2. **Unresolved Dropdown Width Cascade**
   - **File:** `src/components/navigation.styl`
   - **Lines:** `135-144, 375-385`
   - **Issue:** The mobile hamburger menu dropdown width is locked at `32px` due to a high-specificity `width` property in ArchWiki's upstream CSS (Vector skin). Using `min-width: 200px !important` and `width: 200px !important` on `.vector-dropdown-content` hasn't been visually verified. The `visual-findings.json` artifact still shows width at `32px`. The selectors may not be specific enough to override ArchWiki's inline/upstream styles.

3. **Playwright Injection Fails to Apply Dark Theme for Verification**
   - **File:** `scripts/visual-test.js` (Lines 13, 20, 27) and `tests/visual-regression.spec.js` (Line 16)
   - **Issue:** Playwright scripts use `page.addStyleTag({ content: css })` to inject the built CSS. This creates an inline `<style>` tag which is overridden by ArchWiki's natively loaded `<link rel="stylesheet">` tags in the cascade. This prevents automated screenshots from properly evaluating the dark theme override capabilities. The tool needs to inject the stylesheet using `page.evaluate` to append a `<link>` element dynamically at the end of `document.head`.
