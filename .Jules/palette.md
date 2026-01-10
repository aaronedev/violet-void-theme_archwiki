## 2026-01-10 - Missing Skip-to-Content Pattern
**Learning:** Even well-designed themes can completely miss standard accessibility features like `.mw-jump-link` if the original container lacks default styling. In dark themes, default browser links (blue on white) can be jarring or unreadable if not explicitly targeted, making the "hidden until focused" skip link a poor experience when it does appear.
**Action:** Always check for standard "skip navigation" links in any web project and ensure they share the theme's button/link styling, rather than just relying on positioning.
