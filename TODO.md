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

- [ ] **Add `@scope` CSS for component isolation**
  - Browser support: 88%+ (Chrome 120+, Safari 17.4+)
  - Prevents style leakage, cleaner specificity
  - File: `src/components/modern-css.styl` or new `src/components/scope.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **Logical Properties for RTL Support**
  - Browser support: 95%+
  - Automatic RTL for international users
  - Properties: `margin-inline-start`, `padding-block`, `border-inline-end`
  - File: `src/components/content.styl`, `src/components/navigation.styl`

- [ ] **`scroll-padding` for Sticky Headers**
  - Browser support: 90%+
  - Better anchor scrolling with sticky headers
  - File: `src/components/navigation.styl`

## 🟡 Medium Priority

- [x] **Implement `@layer` for cascade control**
  - Base layer (resets, variables)
  - Components layer (buttons, forms, etc.)
  - Utilities layer (helper classes)
  - Overrides layer (high-specificity fixes)
  - File: `src/components/cascade-layers.styl`
  - Note: Requires `@css{}` wrapper

- [x] **Add relative color syntax for cleaner theming**
  - Replace manual rgba() with `rgb(from color r g b / alpha)`
  - Dynamic color manipulation without hardcoded values
  - File: `src/components/modern-css.styl`
  - Note: Requires `@css{}` wrapper

- [x] **Implement View Transitions API**
  - TOC navigation (content morphing)
  - Tab switching
  - Modal open/close
  - Browser support: ~70% (Chrome 111+, Safari 18+)
  - File: `src/components/view-transitions.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **`line-clamp` for Multi-line Truncation**
  - Browser support: 90%+ (with -webkit prefix)
  - Truncate long descriptions in infoboxes, package listings
  - File: `src/components/utilities.styl`

- [ ] **`overflow: clip` for Performance**
  - Browser support: 90%+
  - Better than `overflow: hidden` for simple clipping
  - File: `src/components/content.styl`, `src/components/boxes.styl`

- [ ] **`@counter-style` for Custom List Markers**
  - Browser support: 90%+
  - Custom numbering for installation steps, troubleshooting guides
  - File: `src/components/content.styl`
  - Note: Requires `@css{}` wrapper

## ♿ Accessibility

- [ ] **`prefers-reduced-transparency` Media Query**
  - Browser support: 92%+
  - Respect transparency preferences
  - File: `src/components/modern-css.styl`

- [ ] **`::spelling-error` and `::grammar-error` Pseudo-elements**
  - Browser support: 85%+
  - Theme-colored spell-check underlines
  - File: `src/components/modern-css.styl`

## ⚡ Performance

- [ ] **`content-visibility: hidden` for Off-screen Content**
  - Browser support: 85%+
  - Better performance for collapsed sections
  - File: `src/components/content.styl`

- [ ] **`will-change` Expansion**
  - Browser support: 95%+
  - Smoother animations on more elements
  - File: `src/components/navigation.styl`

## 🔮 Future (Low Priority)

- [ ] **Add `anchor()` positioning API**
  - Better tooltips positioning
  - Dropdown menus relative to triggers
  - Wait for: Safari stable support
  - File: `src/components/navigation.styl`, `src/components/ooui-enhanced.styl`
  - Note: Requires `@css{}` wrapper

- [ ] **Native CSS nesting migration path**
  - Long-term consideration for dropping Stylus
  - Standards-compliant codebase
  - Status: Research phase only

- [ ] **Expand `interpolate-size` for auto transitions**
  - Smooth expand/collapse for collapsible sections
  - Browser support: ~85%
  - File: `src/components/navigation.styl`

- [ ] **Enhanced print styles with `@page`**
  - Page margins control
  - Page number in footer
  - File: `src/components/print-enhanced.styl`

- [ ] **Dynamic Viewport Units (`dvh`, `dvw`, `svh`, `lvh`)**
  - Browser support: 90%+
  - Better mobile viewport handling
  - File: `src/variables/layout.styl`

- [ ] **`::target-text` Pseudo-element**
  - Browser support: 85%+
  - Style text highlighted by URL fragments
  - File: `src/components/modern-css.styl`

---

## ⚠️ Stylus Compatibility Notes

**REQUIRES `@css{}` wrapper:**
- `@layer`
- `@starting-style`
- `@property`
- `@scope`
- `@counter-style`
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
| 2026-02-27 | Expand `scroll-snap` for better mobile UX | ff357a5, 737428d |
| 2026-02-27 | Implement `@layer` cascade control | 816ed6c |
| 2026-02-27 | Add relative color syntax for dynamic colors | a3a9f97 |
| 2026-02-27 | Implement View Transitions API | ff357a5 |

---

*Last updated: 2026-02-27*
*Maintained by: OpenClaw cron jobs (violet-void-todo-scout → violet-void-implementer)*
