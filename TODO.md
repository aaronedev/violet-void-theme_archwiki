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

- [x] **`content-visibility: hidden` for Off-screen Content**
  - Browser support: 85%+
  - Better performance for collapsed sections
  - File: `src/components/content.styl`
  - Commit: 98369b5

- [x] **`will-change` Expansion**
  - Browser support: 95%+
  - Smoother animations on more elements
  - File: `src/components/navigation.styl`
  - Commit: 32f2f71

## 📝 Typography

- [x] **`text-decoration-skip-ink` for Better Underlines**
  - Browser support: 95%+
  - Prevents underlines from crossing through descenders (g, y, p)
  - Improves readability of links and underlined text
  - File: `src/components/typography.styl`
  - Stylus: Works directly

- [x] **`hyphens` for Narrow Columns**
  - Browser support: 95%+
  - Better text wrapping in infoboxes, sidebars, and narrow containers
  - Use `hyphens: auto` with `lang` attribute
  - File: `src/components/tables.styl`, `src/components/content.styl`
  - Commit: cf4e9af

- [ ] **`::first-letter` Drop Caps for Article Intros**
  - Browser support: 100%
  - Typographic polish for lead paragraphs
  - Subtle enhancement for article openings
  - File: `src/components/typography.styl`
  - Stylus: Works directly

## 🎨 Visual Effects

- [ ] **`mix-blend-mode` for Emphasis Effects**
  - Browser support: 97%+
  - Subtle blend effects for warning boxes, highlights, overlays
  - Alternative to opacity for layered content
  - File: `src/components/boxes.styl`, `src/components/content.styl`
  - Stylus: Works directly

## 📱 Touch & Interaction

- [ ] **`touch-action` for Better Touch UX**
  - Browser support: 97%+
  - Prevents accidental zooming/panning on interactive elements
  - Improves carousels, sliders, and custom gestures
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Stylus: Works directly

## 🎯 Layout & Stacking

- [ ] **`isolation: isolate` for Better Z-Index Management**
  - Browser support: 97%+
  - Creates new stacking contexts for z-index isolation
  - Prevents z-index conflicts between modals, dropdowns, and overlays
  - File: `src/components/ui-components.styl`, `src/components/navigation.styl`
  - Stylus: Works directly

## 📐 Typography Polish

- [ ] **`hanging-punctuation` for Better Quote Typography**
  - Browser support: 95%+
  - Hangs punctuation marks outside text box for better alignment
  - Improves readability of blockquotes and list items
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly

- [ ] **`box-decoration-break: clone` for Multi-line Inline Styles**
  - Browser support: 97%+
  - Inline backgrounds/padding that span multiple lines properly
  - Fixes highlight, inline code, and marked text with line breaks
  - File: `src/components/typography.styl`, `src/components/code.styl`
  - Stylus: Works directly

## 📏 Text Flow

- [ ] **`overflow-wrap: anywhere` for Long Content**
  - Browser support: 97%+
  - Better line breaking for long URLs, code paths, package names
  - Different from `break-word` - breaks at any character only when needed
  - File: `src/components/code.styl`, `src/components/content.styl`, `src/components/tables.styl`
  - Stylus: Works directly

## 🌈 Color Enhancements

- [ ] **`color-gamut` Media Query for P3 Displays**
  - Browser support: 93%+
  - Detect wide-gamut (P3) displays and provide enhanced colors
  - More vibrant accent colors on capable hardware
  - File: `src/components/modern-css.styl`, `src/variables/colors.styl`
  - Stylus: Works directly

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
| 2026-02-27 | will-change expansion for smoother animations | 32f2f71 |
| 2026-02-27 | content-visibility for off-screen content | 98369b5 |
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
| 2026-02-27 | text-decoration-skip-ink for better underlines | 2e4e47f |
| 2026-02-27 | hyphens for narrow columns | cf4e9af |

---

*Last updated: 2026-02-27 17:45*
*Maintained by: OpenClaw (violet-void-todo-scout → violet-void-implementer)*
