# Palette's Journal

## 2026-01-11 - Invisible but Essential: The Case of the Missing Skip Link
**Learning:** Stylus themes often focus heavily on aesthetics (colors, gradients) but can inadvertently break or ignore invisible accessibility features. The "Skip to content" link (`.mw-jump-link` in MediaWiki) is a prime example—it's crucial for keyboard navigation but invisible to mouse users. If a dark theme doesn't account for it, it might pop up with default white-on-black colors (or worse, unreadable text) when focused, or remain completely invisible if the theme overrides global backgrounds without handling the specific component.

**Action:** Always search for accessibility-specific classes (like `.mw-jump-link`, `.sr-only`, `.visually-hidden`) when theming a complex application. If they are missing, explicitly style them to be accessibly hidden by default and clearly visible (with high contrast and z-index) on focus.
