## 2026-01-05 - Missing Skip to Content Link
**Learning:** The theme lacked a styled '.mw-jump-link', which is critical for keyboard accessibility on MediaWiki sites.
**Action:** Implemented a 'visually hidden by default, visible on focus' pattern in 'src/components/accessibility.styl' and imported it into the main stylesheet.
