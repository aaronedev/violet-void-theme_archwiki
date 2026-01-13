# Palette's Journal

## 2026-01-13 - Modern Accessible Hiding
**Learning:** The deprecated `clip` property triggers lint errors in this project. The modern replacement `clip-path: inset(50%)` works effectively for visually hiding elements while keeping them accessible, and avoids lint issues.
**Action:** Use `clip-path: inset(50%)` for `.visually-hidden` or similar patterns instead of `clip: rect(1px, 1px, 1px, 1px)`.
