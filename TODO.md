# Violet Void ArchWiki - Improvement TODO

> Auto-maintained by OpenClaw agents. Check off items as completed.

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

## 🟡 Medium Priority

- [x] **Implement `@layer` for cascade control**
  - 4-layer cascade: base, components, utilities, overrides
  - Commit: 816ed6c

- [x] **Add relative color syntax for cleaner theming**
  - Dynamic color variants via rgb(from...)
  - Commit: a3a9f97

- [x] **Implement View Transitions API**
  - Smooth page navigation
  - Commit: ff357a5

- [x] **`overflow: clip` for Performance**
  - Already implemented alongside line-clamp
  - Commit: (previous session)

- [x] **`@counter-style` for Custom List Markers**
  - 3 custom counter styles: archwiki-steps, terminal-prompt, archwiki-check
  - Padded numeric steps, terminal prompts ($, >, #), checkmarks
  - Commit: 6481f49

## ♿ Accessibility

- [x] **`prefers-reduced-transparency` Media Query**
  - Solid backgrounds for transparency-sensitive users
  - Commit: dd881f5

- [x] **`::spelling-error` and `::grammar-error` Pseudo-elements**
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
  - Wait for: Safari stable support
  - File: `src/components/navigation.styl`

- [ ] **Native CSS nesting migration path**
  - Long-term consideration for dropping Stylus
  - Status: Research phase only

- [ ] **Expand `interpolate-size` for auto transitions**
  - Smooth expand/collapse for collapsible sections
  - File: `src/components/navigation.styl`

- [ ] **Enhanced print styles with `@page`**
  - Page margins, page numbers
  - File: `src/components/print-enhanced.styl`

- [ ] **Dynamic Viewport Units (`dvh`, `dvw`, `svh`, `lvh`)**
  - Better mobile viewport handling
  - File: `src/variables/layout.styl`

- [ ] **`::target-text` Pseudo-element**
  - Style text highlighted by URL fragments
  - File: `src/components/modern-css.styl`

---

## ⚠️ Stylus Compatibility Notes

**REQUIRES `@css{}` wrapper:**
- `@layer`, `@starting-style`, `@property`, `@scope`, `@counter-style`
- View transitions, `transition-behavior`, `anchor()` positioning
- Relative color syntax

**DO NOT USE (breaks Stylus parser):**
- `color-mix(in srgb, ...)` — use `@css{}` wrapper
- `@supports selector(:has(*))` — use `@supports (property: value)`

---

## Completion Log

| Date | Item | Commit |
|------|------|--------|
| 2026-02-27 | Expand `:has()` selector usage | 8074cef |
| 2026-02-27 | Add `@property` for animatable CSS vars | 9ec0d2e |
| 2026-02-27 | Expand `scroll-snap` for mobile UX | ff357a5, 737428d |
| 2026-02-27 | Implement `@layer` cascade control | 816ed6c |
| 2026-02-27 | Add relative color syntax | a3a9f97 |
| 2026-02-27 | Implement View Transitions API | ff357a5 |
| 2026-02-27 | Add `@scope` for component isolation | f13afdd |
| 2026-02-27 | Logical properties for RTL support | b20b154 |
| 2026-02-27 | scroll-padding for sticky headers | d32a74a |
| 2026-02-27 | prefers-reduced-transparency support | dd881f5 |
| 2026-02-27 | ::spelling-error and ::grammar-error styling | ae696a1 |
| 2026-02-27 | @counter-style for custom list markers | 6481f49 |

---

*Last updated: 2026-02-27 14:24*
*Maintained by: OpenClaw (violet-void-todo-scout → violet-void-implementer)*
