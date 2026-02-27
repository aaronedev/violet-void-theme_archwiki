# Violet Void ArchWiki - Improvement TODO

> Auto-maintained by OpenClaw agents. Check off items as completed.

## 🔥 High Priority

- [x] **Expand `:has()` selector usage**
  - Form validation states (`:has(:invalid)`, `:has(:valid)`)
  - Empty content detection (`:has(:empty)`)
  - Parent styling based on children state
  - Table row highlighting based on cell content
  - Card/list hover states affecting siblings
  - File: `src/components/modern-css.styl` (use `@css{}` wrapper)

- [x] **Add `@property` for animatable CSS custom properties**
  - Define typed custom properties for colors
  - Enable CSS transitions on custom properties
  - Type safety for theme variables
  - File: `src/components/modern-css.styl` (use `@css{}` wrapper)

- [x] **Expand `scroll-snap` for better mobile UX**
  - TOC snap scrolling
  - Code block horizontal scroll with snap
  - Card deck navigation
  - Image gallery carousels (if applicable)
  - File: `src/components/navigation.styl`, `src/components/code.styl`

## 🟡 Medium Priority

- [ ] **Implement `@layer` for cascade control**
  - Base layer (resets, variables)
  - Components layer (buttons, forms, etc.)
  - Utilities layer (helper classes)
  - Overrides layer (high-specificity fixes)
  - File: `src/main.styl` or new `src/components/cascade-layers.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **Add relative color syntax for cleaner theming**
  - Replace manual rgba() with `rgb(from color r g b / alpha)`
  - Dynamic color manipulation without hardcoded values
  - File: `src/variables/colors.styl`, `src/components/modern-css.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **Implement View Transitions API**
  - TOC navigation (content morphing)
  - Tab switching
  - Modal open/close
  - Browser support: ~70% (Chrome 111+, Safari 18+)
  - File: New `src/components/view-transitions.styl`
  - Note: Requires `@css{}` wrapper

## 🔮 Future (Low Priority)

- [ ] **Add `anchor()` positioning API**
  - Better tooltips positioning
  - Dropdown menus relative to triggers
  - Popovers positioned relative to anchors
  - Wait for: Safari stable support
  - File: `src/components/navigation.styl`, `src/components/ooui-enhanced.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **Native CSS nesting migration path**
  - Long-term consideration for dropping Stylus
  - Standards-compliant codebase
  - Better tooling support
  - Status: Research phase only

- [ ] **Expand `interpolate-size` for auto transitions**
  - Smooth expand/collapse for collapsible sections
  - Dropdown menu height animations
  - Browser support: ~85% (Chrome 129+, Safari 17.2+)
  - File: `src/components/navigation.styl`

- [ ] **Enhanced print styles with `@page`**
  - Page margins control
  - Page number in footer
  - Better printed documentation output
  - File: `src/components/print-enhanced.styl`

---

## ⚠️ Stylus Compatibility Notes

**REQUIRES `@css{}` wrapper:**
- `@layer`
- `@starting-style`
- `@property`
- View transitions (`@view-transition`)
- `transition-behavior`
- `anchor()` positioning
- Relative color syntax

**DO NOT USE (breaks Stylus parser):**
- `color-mix(in srgb, ...)` — use `@css{}` wrapper with full CSS
- `@supports selector(:has(*))` — use `@supports (property: value)` instead

---

## Completion Log

| Date | Item | Commit |
|------|------|--------|
| 2026-02-27 | Expand `:has()` selector usage | 8074cef |
| 2026-02-27 | Add `@property` for animatable CSS custom properties | 9ec0d2e |
| 2026-02-27 | Expand `scroll-snap` for better mobile UX | ff357a5 |

---

*Last updated: 2026-02-27*
*Maintained by: OpenClaw cron jobs (violet-void-improvement-scout)*
