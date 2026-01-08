## 2026-01-08 - Accessible Skip Link Pattern in Stylus
**Learning:** When implementing accessibility patterns like "sr-only" or "skip-link" in Stylus with strict Stylelint rules, deprecated properties like `clip` (required for older browser support) trigger errors.
**Action:** Always use `// stylelint-disable-next-line property-no-deprecated` directly above the deprecated property. Additionally, when importing new components in `main.styl` within a `@-moz-document` block, ensure manual indentation matches existing imports, as auto-fixers may struggle with multi-line selector blocks.
