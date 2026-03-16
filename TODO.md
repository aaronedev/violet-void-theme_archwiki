# Violet Void ArchWiki - Improvement TODO

> Auto-maintained by OpenClaw agents. Check off items as completed.

## ⚠️ CSS Rules (READ FIRST)

**NEVER use these - they cause browser/postcss errors:**
- `:contains()` pseudo-class - jQuery only, NOT valid CSS
- `::spelling-error`, `::grammar-error` - Firefox doesn't support, breaks PostCSS
- Hardcoded hex colors - use variables (`$arch-blue`, `$base`, etc.)
- Deprecated `gradient-button()` - use `gradient-surface()`
- Wrong gradient angle - must be `135deg`

**These need @supports wrapper (Firefox doesn't support):**
- `hanging-punctuation` → wrap in `@supports (hanging-punctuation: first)`
- `field-sizing` → wrap in `@supports (field-sizing: content)`
- `caret-shape` → wrap in `@supports (caret-shape: block)`
- `-webkit-text-size-adjust` → wrap in `@supports (-webkit-text-size-adjust: 100%)`

**These are OK (modern CSS):**
- `interpolate-size` - Chrome 129+
- `@view-transition`, `navigation: auto` - Chrome 111+
- `//` double-slash comments - valid in Stylus
- `:has()`, `:is()`, `:where()` - modern pseudo-classes

## 🔥 High Priority

- [x] **Expand `:has()` selector usage**
  - Form validation states, empty detection, parent styling
  - Commit: 8074cef

- [x] **Add `@property` for animatable CSS custom properties**
  - 22 typed custom properties for colors
  - Commit: 9ec0d2e

- [x] **Expand `scroll-snap` for better mobile UX**
  - TOC, dropdowns, code blocks
  - Commit: ff357a5, 737428d

- [x] **Add `@scope` CSS for component isolation**
  - Infobox, wikitable, navigation scoped styles
  - Commit: f13afdd

- [x] **Logical Properties for RTL Support**
  - 21 physical → logical property swaps
  - Commit: b20b154

- [x] **`scroll-padding` for Sticky Headers**
  - 5em offset for anchor scrolling
  - Commit: d32a74a

- [x] **`line-clamp` for Multi-line Truncation**
  - Already implemented in utilities.styl
  - Commit: (previous session)

## ⏱️ Timeline Scope (New - 2026-03-16)

- [x] **`timeline-scope` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define named scroll timelines
  - `timeline-scope: --my-timeline;`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: (2026-03-16 session - git repo corrupted)

