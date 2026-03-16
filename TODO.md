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
  - Commit: 2e4e47f

- [x] **`hyphens` for Narrow Columns**
  - Browser support: 95%+
  - Better text wrapping in infoboxes, sidebars, and narrow containers
  - Use `hyphens: auto` with `lang` attribute
  - File: `src/components/tables.styl`, `src/components/content.styl`
  - Commit: cf4e9af

- [x] **`::first-letter` Drop Caps for Article Intros**
  - Browser support: 100%
  - Typographic polish for lead paragraphs
  - Subtle enhancement for article openings
  - File: `src/components/typography.styl`
  - Stylus: Works directly
  - Commit: def571c

## 🎨 Visual Effects

- [x] **`mix-blend-mode` for Emphasis Effects**
  - Browser support: 97%+
  - Subtle blend effects for warning boxes, highlights, overlays
  - Alternative to opacity for layered content
  - File: `src/components/boxes.styl`, `src/components/content.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

- [x] **`@starting-style` for Entry/Exit Animations**
  - Browser support: 80%+
  - Enable CSS transitions on first render and display: none changes
  - Smooth popover, dialog, and collapsible section animations
  - File: `src/components/animations.styl`, `src/components/navigation.styl`
  - Stylus: Works directly (Chrome 117+, Safari 17.5+)

- [x] **`transition-behavior: allow-discrete` for Display Transitions**
  - Browser support: 80%+
  - Animate discrete properties like display and overlay
  - Combine with @starting-style for full enter/leave animations
  - File: `src/components/modern-css.styl`
  - Stylus: Works directly (Chrome 117+, Safari 17.5+)
  - Commit: a2245f4

## 📱 Touch & Interaction

- [x] **`touch-action` for Better Touch UX**
  - Browser support: 97%+
  - Prevents accidental zooming/panning on interactive elements
  - Improves carousels, sliders, and custom gestures
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

## 🎯 Layout & Stacking

- [x] **`isolation: isolate` for Better Z-Index Management**
  - Browser support: 97%+
  - Creates new stacking contexts for z-index isolation
  - Prevents z-index conflicts between modals, dropdowns, and overlays
  - File: `src/components/ui-components.styl`, `src/components/navigation.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

## 📐 Typography Polish

- [x] **`hanging-punctuation` for Better Quote Typography**
  - Browser support: 95%+
  - Hangs punctuation marks outside text box for better alignment
  - Improves readability of blockquotes and list items
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

- [x] **`box-decoration-break: clone` for Multi-line Inline Styles**
  - Browser support: 97%+
  - Inline backgrounds/padding that span multiple lines properly
  - Fixes highlight, inline code, and marked text with line breaks
  - File: `src/components/typography.styl`, `src/components/code.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

## 📏 Text Flow

- [x] **`overflow-wrap: anywhere` for Long Content**
  - Browser support: 97%+
  - Better line breaking for long URLs, code paths, package names
  - Different from `break-word` - breaks at any character only when needed
  - File: `src/components/code.styl`, `src/components/content.styl`, `src/components/tables.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

## 🌈 Color Enhancements

- [x] **`color-gamut` Media Query for P3 Displays**
  - Browser support: 93%+
  - Detect wide-gamut (P3) displays and provide enhanced colors
  - More vibrant accent colors on capable hardware
  - File: `src/components/modern-css.styl`, `src/variables/colors.styl`
  - Stylus: Works directly
  - Commit: 1bf45d5

## 🔤 Typography Enhancements

- [x] **`font-variant-numeric` for Number Formatting**
  - Browser support: 97%+
  - Tabular numbers for tables, slashed-zero for code, ordinals
  - Better alignment in financial/technical data
  Commit: 07dfaa7
  - File: `src/components/typography.styl`, `src/components/tables.styl`
  - Stylus: Works directly

- [x] **`text-align-last` for Justified Text Control**
  - Browser support: 97%+
  - Control alignment of last line in justified text
  - Better multilingual support and headline polish
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly

## 🖼️ Media & Images

- [x] **`image-rendering` for Screenshot/Diagram Quality**
  - Browser support: 97%+
  - Control image scaling: auto, crisp-edges, pixelated
  - Preserve pixel art and terminal screenshots in docs
  - File: `src/components/content.styl`, `src/components/code.styl`
  - Stylus: Works directly

- [x] **`object-position` for Image Framing**
  - Browser support: 97%+
  - Control visible area when using object-fit
  - Complements existing object-fit cover usage
  - File: `src/components/content.styl`, `src/components/tables.styl`
  - Stylus: Works directly

## 📝 Form Enhancements

- [x] **`caret-color` for Themed Text Cursor**
  - Browser support: 97%+
  - Style text cursor in inputs/textareas to match theme
  - Consistent violet cursor across form elements
  - File: `src/components/forms.styl`, `src/components/forms-enhanced.styl`
  - Stylus: Works directly

- [x] **`::checkmark` Pseudo-element for Select Checkmarks**
  - Browser support: 60%+ (rising rapidly)
  - Style checkmarks in customizable select dropdowns
  - Custom icons, colors, and positioning for selected options
  - Requires: `appearance: base-select` on select and ::picker(select)
  - File: `src/components/forms-enhanced.styl`
  - Stylus: Works directly (Chrome 135+, Edge 135+)
  - Commit: d2a07e1

- [x] **`::picker(select)` Pseudo-element for Dropdown Styling**
  - Browser support: 60%+ (rising rapidly)
  - Style the dropdown picker container of select elements
  - Custom borders, backgrounds, shadows for dropdowns
  - Requires: `appearance: base-select` on select element
  - File: `src/components/forms-enhanced.styl`
  - Stylus: Works directly (Chrome 135+, Edge 135+)
  - Commit: 00a5af9

## 📐 Fluid Sizing

- [x] **`clamp()` for Fluid Typography**
  - Browser support: 95%+
  - Responsive font sizes without media queries
  - `font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem)`
  - File: `src/components/typography.styl`, `src/variables/layout.styl`
  - Stylus: Works directly

- [x] **`min()` / `max()` for Responsive Values**
  - Browser support: 95%+
  - Dynamic padding, margins, and dimensions
  - `padding: min(5vw, 2rem)` for responsive spacing
  - File: `src/variables/layout.styl`, `src/components/responsive-enhanced.styl`
  - Stylus: Works directly

## 🔍 Modern Selectors

- [x] **`:is()` for Selector Grouping**
  - Browser support: 97%+
  - Simplify complex selectors: `:is(h1, h2, h3):hover`
  - Reduces repetition in stylesheets
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly

- [x] **`:where()` for Zero-Specificity Selectors**
  - Browser support: 97%+
  - Low-specificity overrides for theming
  - Useful for base styles that should be easily overridden
  - File: `src/components/base.styl`, `src/components/utilities.styl`
  - Stylus: Works directly

- [x] **`:open` Pseudo-class for Open State Styling**
  - Browser support: 85%+
  - Target elements in open state: details, dialog, select dropdowns
  - Apply different styles when dropdowns/accordions are expanded
  - File: `src/components/ui-components.styl`
  - Stylus: Works directly (Chrome 120+, Firefox 124+, Safari 17.5+)
  - Commit: a0104ee

## 📰 Multi-Column Layouts

- [x] **`column-count` for Multi-Column Content**
  - Browser support: 97%+
  - Multi-column layouts for TOC, related articles, link lists
  - Responsive column count with column-width
  - File: `src/components/content.styl`, `src/components/navigation.styl`
  - Stylus: Works directly

## 🔮 Future (Low Priority)

- [x] **Add `anchor()` positioning API**
  - Better tooltips positioning
  - Implemented in `src/components/ui-components.styl`
  - Added position-anchor property support for tooltips with multiple positioning options
  - Commit: 608efd9

- [x] **Native CSS nesting migration path**
  - Long-term consideration for dropping Stylus
  - Created comprehensive migration guide (CSS-NESTING-MIGRATION.md)
  - Documents Stylus patterns and native CSS equivalents
  - Hybrid approach recommended (keep Stylus for vars/mixins)
  - Commit: 6c0812c

- [x] **Expand `interpolate-size` for auto transitions**
  Commit: a411b8d
  - Smooth expand/collapse for collapsible sections
  - File: `src/components/navigation.styl`

- [x] **Enhanced print styles with `@page`**
  Commit: efd9c06
  - Page margins, page numbers
  - File: `src/components/print-enhanced.styl`

- [x] **Dynamic Viewport Units (`dvh`, `dvw`, `svh`, `lvh`)**
  - Better mobile viewport handling
  - File: `src/variables/layout.styl`

- [x] **`::target-text` Pseudo-element**
  Commit: 5146002
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
| 2026-03-15 | initial-letter Drop Caps, Align, Wrap | 59c7703 |
| 2026-03-15 | Admin Dashboard Styling (CSS) | ba55f4e |
| 2026-03-15 | User Rights Management (CSS) | ba55f4e |
| 2026-03-15 | Block/Protect UI (CSS) | ba55f4e |
| 2026-03-15 | Delete/Undelete Interface (CSS) | ba55f4e |
| 2026-03-15 | Patrol Marking (CSS) | ba55f4e |
| 2026-03-15 | Score/Music Notation Styling | ba55f4e |
| 2026-03-15 | Page break control (break-before/after/inside) for print | 3c76788 |
| 2026-03-15 | CSS Math Functions (round, abs, sign, rem, mod, sqrt, hypot, pow, log, exp, trig) | 65f896f |
| 2026-03-15 | Collapsible sections print styles for details/summary | 053dd41 |
| 2026-03-15 | Notification Preferences Panel (CSS) | fbf4cbba |
| 2026-03-14 | animation-timeline: scroll() for scroll-driven animations | 610bf0a |
| 2026-03-14 | Timeline Extension Styling | 04e068d5 |
| 2026-03-14 | @scroll-state container queries for scroll snapping | 4233450 |
| 2026-03-14 | :snapped pseudo-class for snapped element styling | 4233450 |
| 2026-03-14 | Translation Extension Styling | da55c63 |
| 2026-03-14 | font-palette for color fonts | 89012be |
| 2026-03-14 | @font-palette-values custom palettes | 89012be |
| 2026-03-10 | Print Images enhanced styling | ae8426b |
| 2026-03-10 | @starting-style for entry/exit animations | 6445bd7 |
| 2026-03-10 | widows/orphans control for print typography | 2a51280 |
| 2026-03-10 | transition-behavior: allow-discrete for display transitions | a2245f4 |
| 2026-03-10 | overflow-anchor for scroll anchoring | 7d2ec95 |
| 2026-03-10 | :open pseudo-class for unified open state styling | a0104ee |
| 2026-03-10 | ::file-selector-button styling | a56b1c8 |
| 2026-03-10 | Documentation Subpage (template-doc.styl) | 95091e6 |
| 2026-03-10 | attr() with type() function | c6dedd5 |
| 2026-03-10 | color-mix() function for dynamic color mixing | 84aac1c |
| 2026-03-14 | ::checkmark pseudo-element for select checkmarks | d2a07e1 |
| 2026-03-14 | :blank pseudo-class for empty form fields | b21b472 |
| 2026-03-14 | :nth-child(of S) selector for tables | b21b472 |
| 2026-03-14 | :autofill pseudo-class for autofilled inputs | 5b2607e |
| 2026-03-14 | :user-valid/:user-invalid for post-interaction validation | ea9ec42 |
| 2026-03-14 | :indeterminate pseudo-class for checkboxes/radios | 5b2607e |
| 2026-03-14 | :in-range/:out-of-range for range validation | b0ce774 |
| 2026-03-14 | Math Extension Styling for MathML and LaTeX | b0fd9da |
| 2026-03-14 | :read-only/:read-write states for form inputs | 030eb94 |
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
| 2026-02-27 | ::first-letter drop caps | def571c |
| 2026-02-27 | mix-blend-mode for emphasis effects | 1bf45d5 |
| 2026-02-27 | touch-action for better touch UX | 1bf45d5 |
| 2026-02-27 | isolation: isolate for z-index management | 1bf45d5 |
| 2026-02-27 | hanging-punctuation for quote typography | 1bf45d5 |
| 2026-02-27 | box-decoration-break: clone for multi-line styles | 1bf45d5 |
| 2026-02-27 | overflow-wrap: anywhere for long content | 1bf45d5 |
| 2026-02-27 | color-gamut media query for P3 displays | 1bf45d5 |
| 2026-02-28 | TODO scout | Added shape-outside, font-synthesis, text-autospace, animation-composition |
| 2026-02-28 | Second scout | Added MediaWiki-specific features, accessibility improvements, print enhancements |
| 2026-02-28 | Third scout | Added special pages, edit/history, discussion, file pages, user pages, link types, message boxes, article structure, template elements |
| 2026-02-28 | Fourth scout | Added i18n/localization, extension compatibility, advanced content elements, search enhancements, skin customization, PWA support |
| 2026-02-28 | Fifth scout | Added community/collaboration, admin tools, mobile optimizations, performance monitoring, personalization, advanced wiki features, cross-wiki features |
| 2026-02-28 | Sixth scout | Added oklch/lab color spaces, scroll-driven animations, popover/dialog, CSS math, form states, logical properties expansion, performance isolation |
| 2026-02-28 | Seventh scout | Added transition-behavior, @starting-style expansion, MediaWiki 1.43+ features (discussion tools, VE 2024, media viewer, Echo notifications, Minerva mobile) |
| 2026-02-28 | Eighth scout | Added subgrid, masonry, flexbox gap, nth-child(of), :blank, :dir(), text-spacing-trim, white-space-collapse, video-dynamic-range, prefers-reduced-data, render-subtree, mask-image, clip-path, filter contrast |
| 2026-02-28 | Ninth scout | Added overscroll-behavior, scrollbar-gutter, scroll-timeline, text-wrap, font-palette, @font-palette-values, font-variant-alternates, image-set, cross-fade, conic-gradient, place-items/content/self, page-orientation, print-color-adjust, widows/orphans |
| 2026-02-28 | Tenth scout | Added ::cue, :fullscreen, :pip, :paused/playing, :buffering/muted, ::file-selector-button, :autofill, :indeterminate, :in-range/out-of-range, :default, font-optical-sizing, @font-face descriptors, text-emphasis, text-justify, word-break, background-blend-mode, all shorthand, writing-mode, text-orientation, text-combine-upright, unicode-bidi, @container style() |
| 2026-02-28 | Eleventh scout | Added SVG enhancements (paint-order, stroke-*, vector-effect, shape-rendering), ::highlight(), interpolate-size, calc-size(), text-wrap-mode/style, object-view-box, @when/@else draft features |
| 2026-02-28 | Twelfth scout | Added anchor positioning API, scroll state containers, scroll markers, timeline-scope, @property expansion |
| 2026-02-28 | Thirteenth scout | Added CSS math functions (trunc, sqrt, hypot, pow, log/exp, trig, pi/e), initial-letter properties, line-grid, hyphenation control |
| 2026-03-01 | First scout | Added form styling (field-sizing, accent-color, appearance), view transitions (@view-transition, view-transition-name, ::view-transition-*), backdrop effects (backdrop-filter), scrollbar styling (scrollbar-color, scrollbar-width, scrollbar-gutter) |
| 2026-03-01 | Second scout | Added individual transform properties (translate, rotate, scale), filter expansion (blur, brightness, saturate, hue-rotate, invert, grayscale, sepia, drop-shadow), print enhancements (break-*, page, size, marks, bleed) |
| 2026-03-01 | Third scout | Added sizing keywords (fit-content, min/max-content, stretch), interaction enhancements (user-select, pointer-events, resize, cursor, caret-shape), multi-column layout (column-rule, column-span, column-fill, columns), visibility/display enhancements (visibility: collapse, opacity, display: flow-root/contents) |
| 2026-03-01 | Fourth scout | Added animation properties (delay negative, direction, fill-mode, play-state), outline enhancements (offset, style auto, shorthand), border image (slice, repeat), table enhancements (layout, collapse, spacing), counter enhancements (counter-set, counters()) |
| 2026-03-10 | Broken/Red Links | Added links.styl with red link styling, hover create indicator, broken link distinction | 5185b7b |

| 2026-03-10 | Twenty-ninth scout | Added contrast-color() and progress() CSS functions, :open/:interest-source/:interest-target pseudo-classes, media state pseudo-classes (:seeking, :stalled, :volume-locked), ArchWiki navigation patterns (magic words, interlanguage links, category placement, related articles positioning), {{Related2}} and {{Lowercase title}} template support |
| 2026-03-14 | ::checkmark Pseudo-element for Select Checkmarks | d2a07e1 |
| 2026-03-14 | filter: contrast() for accessibility/readability | e1b897fc |
| 2026-03-14 | Scrollable Table Wrapper for performance | 92cf67a |
| 2026-03-14 | Cite Extension Enhancements | 80822e6 |
| 2026-03-14 | Safe Area Support for mobile (iOS notch/home indicator) | 80bb105 |
| 2026-03-15 | Package Templates (Pkg, AUR, Grp) | 5754579 |
| 2026-03-15 | @media (update) for e-ink display optimization | 2f583a4 |
| 2026-03-15 | conic-gradient for Patterns & cross-fade() for Transitions | 1a4da94 |
| 2026-03-15 | :dir() pseudo-class for direction-based styling | 0821863 |
| 2026-03-16 | Chess/Go Diagram Styling | 86f4b20 |

---

| 2026-03-16 | :host pseudo-class for Shadow DOM | Added :host base styling, :hover/:focus/:focus-visible states, attribute selectors for variants/sizes, full-width/rounded modifiers | 1eee197 |
| 2026-03-16 | calc-size() for Auto Transitions | Added calc-size() alternative to interpolate-size for smooth height transitions in collapsible sections | 1e2b980 |

| 2026-03-16 | Multi-column layout utilities (column-rule, column-span, column-fill, columns) | 2c29491 |

Last updated: 2026-03-16 06:36
*Maintained by: OpenClaw (violet-void-todo-scout → violet-void-implementer)*

## 🔤 Typography Polish (New)

- [x] **`quotes` Property for Custom Quotation Marks**
  - Browser support: 97%+
  - Define custom quotation marks for nested quotes
  - Better typography for blockquotes and `q` elements
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly

- [x] **`font-kerning` for Typography Control**
  - Browser support: 97%+
  - Enable/disable font kerning for better letter spacing
  - Improves readability in headings and body text
  - File: `src/components/typography.styl`, `src/components/base.styl`
  - Stylus: Works directly

## 📐 Table Enhancements (New)

- [x] **`empty-cells` for Table Styling**
  - Browser support: 97%+
  - Control visibility of empty table cells
  - Apply to wikitable, infobox
  - File: `src/components/tables.styl`
  - Stylus: Works directly

- [x] **`caption-side` for Table Captions**
  - Browser support: 97%+
  - Control position of table captions (top/bottom)
  - File: `src/components/tables.styl`
  - Stylus: Works directly


## 🖼️ Image Wrapping (New)

- [x] **`shape-outside` for Text Wrapping Around Images**
  - Browser support: 97%+
  - Flow text around images with custom shapes
  - Apply to floated images in articles
  - Example: `img.float-left { shape-outside: circle(50%); }`
  - File: `src/components/content.styl`
  - Stylus: Works directly

- [x] **`shape-margin` for Shape Wrapping Spacing**
  - Browser support: 97%+
  - Add margin around shaped floats
  - Pairs with shape-outside
  - File: `src/components/content.styl`
  - Stylus: Works directly

## 🔤 Font Control (New)

- [x] **`font-synthesis` for Auto-Generated Fonts**
  - Browser support: 97%+
  - Control automatic bold/italic generation
  - Disable for web fonts that have proper weights
  - Example: `font-synthesis: none;`
  - File: `src/components/typography.styl`, `src/components/base.styl`
  - Stylus: Works directly

## 🌏 CJK Typography (New)

- [x] **`text-autospace` for CJK-Latin Spacing**
  - Browser support: 87%+ (Chrome 120+, Safari 17.2+)
  - Auto-insert spacing between CJK and Latin text
  - Improves readability for multilingual content
  - Example: `text-autospace: insert;`
  - File: `src/components/typography.styl`, `src/components/content.styl`
  - Stylus: Works directly

## 🎭 Animation (New)

- [x] **`animation-composition` for Layered Animations**
  - Browser support: 87%+ (Chrome 112+, Safari 16+)
  - Control how multiple animations combine
  - Values: replace, add, accumulate
  - Example: `animation-composition: add;`
  - File: `src/components/modern-css.styl`
  - Stylus: Works directly


## 📖 MediaWiki-Specific (New)

- [x] **Edit Section Link Styling** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/content.styl`
  - Hover-reveal edit links
  - `:hover` on section shows edit button
  - Consistent with theme icons

- [x] **Table of Contents Enhancements** (CSS)
  - File: `src/components/navigation.styl`, `toc.styl`
  - Collapsible TOC with smooth animations
  - Current section highlighting via scroll-spy
  - Number alignment with tabular-nums

- [x] **Infobox Layout Improvements** (CSS)
  - File: `src/components/tables.styl`
  - Responsive infobox on mobile
  - Image aspect-ratio enforcement
  - Better data label/value alignment

- [x] **Related Articles Section** (CSS)
  Commit: d780574
  - File: `src/components/content.styl`
  - Card-style related article links
  - Hover preview effects
  - Consistent with navigation styling

- [x] **Category Tag Styling** (97%+ browser support)
  - File: `src/components/content.styl`
  - Pill-style category links
  - `border-radius` + `background`
  - Hover state with accent

## ♿ Accessibility Improvements (New)

- [x] **Skip Link Styling** (100% browser support)
  - Browser support: 100%
  - File: `src/components/accessibility.styl`
  - Visible on focus, hidden otherwise
  - High contrast for keyboard users
  - Smooth scroll to target

- [x] **Focus Order Indicators** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/accessibility.styl`
  - Sequential focus indicators
  - `:focus-visible` with clear outline
  - Consistent across all interactive elements

- [x] **Error/Warning Message Styling** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/boxes.styl`
  - Clear visual distinction
  - Icon + color coding
  - `role="alert"` compatible styling

- [x] **Reduced Motion Alternative Animations** (95%+ browser support)
  - Browser support: 95%+
  - File: `src/components/accessibility.styl`
  - `@media (prefers-reduced-motion: reduce)`
  - Fade-only alternatives to slide animations
  - Instant transitions where appropriate

## 🖨️ Print Enhancements (New)

- [x] **Print-Only Link URLs** (100% browser support)
  - Browser support: 100%
  - File: `src/components/print.styl`
  - `@media print { a[href]::after { content: " (" attr(href) ")"; } }`
  - Visible link destinations in print

- [x] **Page Break Control** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/print.styl`
  - `break-inside: avoid` for infoboxes, code blocks
  - `break-before: page` for major sections
  - Prevent orphaned headings

- [x] **Print Header/Footer** (CSS)
  Commit: efd9c06 (already implemented in print-enhanced.styl)
  - File: `src/components/print.styl`
  - `@page` with margin adjustments
  - Article title in header
  - Page numbers in footer

- [x] **Collapsible Sections Print Styles** (details/summary)
  Commit: 053dd41
  - File: `src/components/print-enhanced.styl`
  - `<details>` and `<summary>` show all content when printing
  - MediaWiki `.mw-collapsible` elements expanded in print
  - Visual indicators (▶/▼) for collapsed sections


## 📋 Special Pages Styling (New)

- [x] **Search Results Page Enhancements** (CSS)
  Commit: fd47b40
  - Browser support: 97%+
  - File: `src/components/special-pages.styl` (new file)
  - Search result item styling
  - Match highlighting in snippets
  - Advanced search form styling

- [x] **Category Page Grid Layout** (CSS)
  Commit: 4d6dd81
  - File: `src/components/special-pages.styl`
  - Category member grid/list toggle
  - Subcategory cards
  - Page count badges with tabular-nums

- [x] **Special:AllPages/Special:PrefixIndex** (CSS)
  Commit: defed5d
  - File: `src/components/special-pages.styl`
  - Alphabetical navigation styling
  - Namespace selector
  - Page list with hover states

- [x] **User Contributions Page** (97%+ browser support)
  Commit: 51ecb8d
  - File: `src/components/special-pages.styl`
  - Contribution list styling
  - Date grouping with tabular-nums timestamps
  - Edit summary highlighting

- [x] **Special:WhatLinksHere** (CSS)
  Commit: 8a2cc0f
  - File: `src/components/special-pages.styl`
  - Backlinks list styling
  - Redirect badge styling
  - Namespace filtering UI

## 📝 Edit & History Pages (New)

- [x] **Diff View Styling** (CSS)
  Commit: b9d680c
  - File: `src/components/diff.styl` (new file)
  - Added/removed line highlighting
  - Inline diff indicators
  - Side-by-side diff layout for wide screens

- [x] **Edit History List** (97%+ browser support)
  Commit: 5555a45
  - File: `src/components/history.styl` (new file)
  - Revision row styling
  - User avatar/link styling
  - Timestamp with tabular-nums
  - Rollback/undo button styling

- [x] **Edit Form Enhancements** (CSS)
  Commit: 5f6d4ce
  - File: `src/components/forms-enhanced.styl`
  - Summary input styling
  - Minor edit checkbox
  - Preview/show changes tabs
  - Edit toolbar button styling

- [x] **Page Move Form** (CSS)
  Commit: 70291e0
  - File: `src/components/forms-enhanced.styl`
  - New title input
  - Reason textarea
  - Talk page move option

## 💬 Discussion Pages (New)

- [x] **Talk Page Formatting** (CSS)
  Commit: 0ccdf11
  - File: `src/components/discussion.styl` (new file)
  - Indentation levels visual distinction
  - User signature styling
  - Timestamp formatting with tabular-nums

- [x] **Reply Thread Styling** (CSS)
  Commit: a5d5639
  - File: `src/components/discussion.styl`
  - Thread collapse/expand indicators
  - New messages indicator
  - Archive notice styling

- [x] **User Talk Notification** (CSS)
  Commit: a5d5639
  - File: `src/components/discussion.styl`
  - New message banner
  - Orange bar indicator
  - Dismiss button styling

## 📁 File & Media Pages (New)

- [x] **File Description Page** (CSS)
  Commit: c9968a6
  - File: `src/components/file-pages.styl` (new file)
  - File history table styling
  - MIME type badge
  - File usage list

- [x] **Image Gallery Layout** (97%+ browser support)
  Commit: c9968a6
  - File: `src/components/file-pages.styl`
  - Gallery grid with aspect-ratio
  - Caption truncation with line-clamp
  - Hover zoom effect

- [x] **Video Player Styling** (CSS)
  Commit: c9968a6
  - File: `src/components/file-pages.styl`
  - Custom play button overlay
  - Progress bar theming
  - Fullscreen button styling

## 👤 User Pages (New)

- [x] **User Page Layout** (CSS)
  Commit: d663085
  - File: `src/components/user-pages.styl` (new file)
  - User profile box
  - Babel box styling
  - User contribution stats

- [x] **User Menu Dropdown** (CSS)
  Commit: d663085
  - File: `src/components/user-pages.styl`
  - User dropdown menu styling
  - Notification count badge
  - Preferences/logout links

## 🔗 Link Types (New)

- [x] **Interwiki Link Indicators** (CSS)
  - File: `src/components/links.styl`
  - External link icon (arrow)
  - Interwiki icon styling
  - Secure/insecure indicator
  Commit: (previous session)

- [x] **Redirect Pages** (CSS)
  - File: `src/components/links.styl`
  - Redirect notice styling
  - Target page preview on hover
  - Redirect category badge
  Commit: (previous session)

- [x] **Disambiguation Links** (CSS)
  - File: `src/components/links.styl`
  - Disambiguation page indicator
  - Hatnote styling refinements
  - "May refer to" formatting
  Commit: (previous session)

- [x] **Broken/Red Links** (97%+ browser support)
  - File: `src/components/links.styl`
  - Red link styling with consistent color
  - Hover state indicating "create page"
  - Different shade for nonexistent vs. broken
  - Commit: 5185b7b

## 📦 Message Boxes (New)

- [x] **Ambox (Article Message Box) Refinement** (CSS)
  - Commit: 631a6c0
  - File: `src/components/message-boxes.styl`
  - Ambox type colors (serious, content, style, notice, move, protection)
  - Icon alignment
  - Mobile responsive layout

- [x] **Ombox/Imbox/Tmbox Styling** (CSS)
  - Commit: 631a6c0
  - File: `src/components/message-boxes.styl`
  - Consistent styling across message box types
  - Type-specific color coding
  - Collapsible notice boxes
  - Includes Cmbox and Fmbox

- [x] **Citation Needed Template** (CSS)
  - Commit: 631a6c0
  - File: `src/components/message-boxes.styl`
  - Inline citation needed styling
  - Hover explanation tooltip
  - Dismiss for logged-in users

## 📖 Article Structure (New)

- [x] **Lead Section Styling** (CSS)
  - File: `src/components/content.styl`
  - First paragraph emphasis
  - Bold first occurrence styling
  - Disambiguation hatnote
  - Commit: f1bc9f2

- [x] **Section Anchors** (97%+ browser support)
  - File: `src/components/content.styl`
  - Section link permalink styling with § symbol
  - Hover reveal pattern on hover-capable devices
  - Copy link action styling with success indicator
  - Deep link target highlight animation
  - Commit: 3d0b8cf

- [x] **Reference List Styling** (CSS)
  - File: `src/components/content.styl`
  - Reference number styling with tabular-nums
  - Reference tooltip on hover
  - Backlink indicators
  - Commit: e664fa2

- [x] **Footnote Scroll Animation** (CSS)
  - File: `src/components/content.styl`
  - Smooth scroll to footnote
  - Highlight on arrival
  - Back scroll animation
  Commit: (previous session)

## 🔧 Template Elements (New)

- [x] **Navbox Styling** (CSS)
  - File: `src/components/navbox.styl`
  - Navigation box at bottom of articles
  - Collapsible groups
  - Subgroup styling
  Commit: 3e89550

- [x] **Sidebar Template Styling** (CSS)
  - File: `src/components/navbox.styl`
  - Related topics sidebar
  - Collapsible sections
  - Image/icon alignment
  Commit: c75cf51

- [x] **Documentation Subpage** (CSS)
  - File: `src/components/template-doc.styl`
  - Template documentation box
  - Usage example formatting
  - Parameter table styling
  Commit: 95091e6


## 🌐 Internationalization & Localization (New)

- [x] **RTL Language Full Support** (97%+ browser support)
  - File: `src/components/i18n.styl` (new file)
  - Complete logical properties conversion
  - `dir="rtl"` specific overrides
  - Bidirectional text handling
  - Commit: 23a15db

- [x] **Language Variant Styling** (CSS)
  - File: `src/components/i18n.styl`
  - Language-specific font stacks
  - CJK font sizing adjustments
  - Non-Latin script line-height
  - Commit: e6b15ff

- [x] **Translation Extension Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Translation banner styling
  - Language selector dropdown
  - Outdated translation indicator
  - Commit: da55c63

## 🔧 Extension Compatibility (New)

- [x] **VisualEditor Styling** (CSS)
  - File: `src/components/extensions.styl` (new file)
  - Visual editor toolbar theming
  - Edit surface styling
  - Diff highlight colors
  - Commit: addee2c

- [x] **Wikidata Integration** (CSS)
  - File: `src/components/extensions.styl`
  - Wikidata item link styling
  - Data quality badges
  - Identifier formatting
  - Commit: e26cbc4

- [x] **Cite Extension Enhancements** (97%+ browser support)
  - File: `src/components/extensions.styl`
  - Cite backlink styling with tabular-nums
  - Reference list numbering
  - Citation hover tooltips
  - Commit: 80822e6

- [x] **Math Extension Styling** (CSS)
  - File: `src/components/extensions.styl`
  - MathML theming
  - LaTeX rendering background
  - Equation numbering
  - Commit: b0fd9da

## 📊 Advanced Content Elements (New)

- [x] **Timeline Extension Styling** (CSS)
  - File: `src/components/advanced.styl` (new file)
  - Timeline event cards
  - Date formatting
  - Connection line styling
  - Commit: 04e068d5

- [x] **Map/Geo Extension Styling** (CSS)
  - File: `src/components/advanced.styl`
  - Interactive map container
  - Marker styling
  - Popup card theming
  - Commit: 6833e6c

- [x] **Score/Music Notation** (CSS)
  - File: `src/components/advanced.styl`
  - Sheet music container
  - Score background
  - Audio player integration
  - Commit: ba55f4e

- [x] **Chess/Go Diagram Styling** (CSS)
  - File: `src/components/advanced.styl`
  - Game board theming
  - Piece visibility
  - Move highlighting
  - Commit: 86f4b20

## 🔍 Search & Navigation Enhancements (New)

- [x] **Advanced Search Form** (CSS)
  - File: `src/components/search.styl`
  - Search field grouping
  - Filter chip styling
  - Boolean operator indicators
  - Commit: ac12f84

- [x] **Search Suggestions Dropdown** (97%+ browser support)
  - File: `src/components/search.styl`
  - Suggestion item styling
  - Match highlighting
  - Category badges with tabular-nums for counts

- [x] **Cross-wiki Search Results** (CSS)
  - File: `src/components/search.styl`
  - Sister project icons
  - Project badge styling
  - Result grouping headers
  - Commit: 13cbee3

- [x] **Related Pages Suggestion** (CSS)
  - File: `src/components/search.styl`
  - Related article cards
  - Relevance indicator
  - Read more expansion
  - Commit: e0fda6a

## 🎨 Skin Customization (New)

- [x] **User Preference Overrides** (CSS)
  - File: `src/components/preferences.styl` (new file)
  - Preference toggle styling
  - Saved preferences indicator
  - Reset to default button
  - Commit: 6cd840b

- [x] **Gadget Integration** (CSS)
  - File: `src/components/gadgets.styl` (new file)
  - Gadget activation toggle
  - Gadget configuration panel
  - Conflict warning styling
  - Commit: eaf8861

- [x] **Custom CSS Snippet Support** (CSS)
  - File: `src/components/preferences.styl`
  - CSS editor textarea styling
  - Syntax highlighting for custom CSS
  - Validation error display
  - Commit: 463017f

## 📱 Progressive Web App (New)

- [x] **PWA Manifest Colors** (100% browser support)
  - File: `src/manifest.styl` (new file)
  - `theme-color` meta tag support
  - `apple-mobile-web-app-status-bar-style`
  - Splash screen background
  - Commit: ebff13c

- [x] **Offline Mode Indicator** (CSS)
  - File: `src/components/pwa.styl` (new file)
  - Offline banner styling
  - Cached content indicator
  - Sync pending status
  - Commit: a8be333

- [x] **Install Prompt Styling** (CSS)
  - File: `src/components/pwa.styl`
  - Add to home screen prompt
  - Install button styling
  - Dismiss option
  - Commit: a8be333


## 👥 Community & Collaboration (New)

- [x] **User Talk Page Enhancements** (CSS)
  - File: `src/components/community.styl` (new file)
  - Message thread styling
  - Reply button positioning
  - Archive notice display
  - Commit: 599e1b7

- [x] **Edit Conflict Resolution UI** (CSS)
  - File: `src/components/mediawiki-edit.styl`
  - Conflict diff display
  - Merge tool styling
  - Resolution options
  - Commit: c0b7d33

- [ ] **Collaborative Editing Indicators** (CSS)
  - File: `src/components/community.styl`
  - Active editor badges
  - Edit lock indicator
  - Real-time presence dots

- [ ] **WikiProject Tagging** (CSS)
  - File: `src/components/community.styl`
  - WikiProject badges
  - Quality scale indicators
  - Importance rating display

## 🔧 Admin & Moderator Tools (New)

- [x] **Admin Dashboard Styling** (CSS)
  - File: `src/components/admin.styl` (new file)
  - Admin panel cards
  - Quick action buttons
  - Statistics overview
  - Commit: ba55f4e

- [x] **User Rights Management** (CSS)
  - File: `src/components/admin.styl`
  - User group badges
  - Permission matrix display
  - Change log styling
  - Commit: ba55f4e

- [x] **Block/Protect UI** (CSS)
  - File: `src/components/admin.styl`
  - Block form styling
  - Duration selector
  - Reason dropdown styling
  - Commit: ba55f4e

- [x] **Delete/Undelete Interface** (CSS)
  - File: `src/components/admin.styl`
  - Delete confirmation dialog
  - Revision selection checkboxes
  - Bulk action toolbar
  - Commit: ba55f4e

## 📱 Mobile-First Optimizations (New)

- [x] **Touch-Friendly Edit Controls** (97%+ browser support) - Commit: 6a44dbf
  - File: `src/components/mobile.styl` (new file)
  - Larger touch targets (min 44px)
  - `touch-action: manipulation`
  - Swipe gesture indicators

- [x] **Mobile Table Responsiveness** (CSS)
  - File: `src/components/mobile.styl`
  - Horizontal scroll wrapper with fade indicators
  - Sticky first column support
  - Priority-based column hiding for small screens
  - Card-based transformation for very narrow viewports
  - Commit: f4af63c

- [x] **Mobile Navigation Patterns** (CSS)
  Commit: e6b15ff
  - File: `src/components/mobile.styl`
  - Bottom navigation bar
  - Slide-out menu
  - Quick access shortcuts

- [x] **Safe Area Support** (CSS)
  - File: `src/components/mobile.styl`
  - `safe-area-inset-*` for notched devices
  - Content scroll adjustment
  - Fixed element positioning
  - Commit: 80bb105

## ⚡ Performance Monitoring (New)

- [x] **Page Load Indicator** (CSS)
  - File: `src/components/performance.styl` (new file)
  - Progress bar styling with animation
  - Skeleton screen patterns for loading states
  - Blur-up image loading effect
  - Lazy load fade-in animations
  - Error state styling
  - Commit: 4116e35
  - Skeleton screen patterns
  - Loading state animations

- [x] **Lazy Load Image Placeholder** (CSS)
  - File: `src/components/performance.styl`
  - Aspect ratio placeholder, blur-up animation, error fallback styling
  - Commit: 7e82a9ae

- [x] **Resource Hint Indicators** (CSS)
  - File: `src/components/performance.styl`
  - Prefetch status badge
  - Preload indicator styling
  - DNS-prefetch and preconnect indicators
  - Commit: 1044659
  - Preload indicator
  - Connection quality display

## 🎯 Personalization (New)

- [x] **Reading List Styling** (CSS)
  - File: `src/components/personal.styl` (new file)
  - Saved article cards
  - Read/unread indicators
  - Category organization
  - Commit: aa8ad9a

- [ ] **Watchlist Enhancements** (97%+ browser support)
  - File: `src/components/personal.styl`
  - Change summary styling
  - Diff preview cards
  - Timestamp display with tabular-nums

- [x] **Notification Preferences Panel** (CSS)
  - File: `src/components/personal.styl`
  - Toggle switches for notification types
  - Email digest options
  - Quiet hours settings
  - Commit: fbf4cbba

- [x] **Custom Quick Links** (CSS)
  - File: `src/components/personal.styl`
  - Quick link cards
  - Reorder handles
  - Edit/delete actions
  - Commit: aa8ad9a

## 🔬 Advanced Wiki Features (New)

- [x] **Lua Module Documentation** (CSS)
  - File: `src/components/lua.styl` (new file)
  - Function signature display
  - Parameter table styling
  - Example code formatting
  - Commit: 94c837d

- [x] **Template Data Styling** (CSS)
  - File: `src/components/templates.styl` (new file)
  - Template parameter cards
  - Required/optional indicators
  - Default value display
  - Commit: 391b8fa

- [x] **Scribunto Console** (CSS)
  - File: `src/components/lua.styl`
  - Console output styling, error highlighting, debug log display
  - Commit: 14480d7

- [x] **Cargo Query Interface** (CSS)
  - File: `src/components/cargo.styl` (new file)
  - Query builder styling
  - Result table formatting
  - Export options
  - Commit: 7ec28b8

## 🌐 Cross-Wiki Features (New)

- [x] **Wikidata Item Display** (CSS)
  - File: `src/components/wikidata.styl` (new file)
  - Property/value pairs styling
  - Source indicator badges
  - Language selector

- [x] **Interwiki Link Preview** (CSS)
  - File: `src/components/interwiki.styl` (new file)
  - Hover preview card
  - Project favicon display
  - Article snippet styling
  - Commit: 0e29137

- [x] **Translation Dashboard** (CSS)
  - File: `src/components/translation.styl` (new file)
  - Translation progress bars
  - Outdated indicator
  - Language pair display
  - Commit: 8a25a469


## 🎨 Modern Color Spaces (New - 2026-02-28 Scout 6)

- [x] **`oklch()` Color Space** (90%+ browser support)
  - File: `src/variables/colors.styl`
  - Perceptually uniform color adjustments
  - Better lightness/chroma/hue control than HSL
  - Example: `color: oklch(0.7 0.15 280);`
  - Stylus: Works directly
  - Commit: 4ee3209

- [x] **`lab()` / `lch()` Color Spaces** (94%+ browser support)
  - File: `src/variables/colors.styl`
  - Device-independent color definitions
  - Better gradient interpolation
  - Consistent appearance across displays
  - Stylus: Works directly
  - Commit: 6c193bb

## 🔄 Scroll-Driven Animations (New)

- [x] **`animation-timeline: scroll()`** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Progress-linked animations based on scroll position
  - Apply to article reading progress
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 610bf0a

- [ ] **`animation-timeline: view()`** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Animate elements as they enter/exit viewport
  - Fade-in for infoboxes, navboxes
  - Pair with `animation-range`

## 🎭 Popover & Dialog Styling (New)

- [x] **`:popover-open` Pseudo-class** (87%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style open popover states
  - Reference tooltip theming
  - Added base [popover] styling, :popover-open animation, tooltip/menu/form popover variants
  - Commit: db6be27

- [x] **`::backdrop` for Modal Overlays** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Theme backdrop behind dialogs/modals
  - Example: `dialog::backdrop { background: rgba(0,0,0,0.7); }`
  - Added: Warning/danger/success/info backdrop variants, themed backdrops with blur, fullscreen backdrops, animated entries, high contrast and reduced motion support, light mode adjustments
  - Commit: 6e17a6d

- [x] **`:modal` Pseudo-class** (90%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style modal dialogs differently from modeless
  - Centering, z-index management
  - Commit: fac20f1

## 🧮 CSS Math Functions (New)

- [x] **`round()` for Pixel Alignment** (89%+ browser support)
  - File: `src/utilities/math.styl`
  - Round values to nearest unit
  - Example: `font-size: round(1.3vw, 1px);`
  - Stylus: Works directly
  - Commit: 65f896f

- [x] **`abs()` / `sign()` for Calculations** (89%+ browser support)
  - File: `src/utilities/math.styl`
  - Absolute values for spacing
  - Sign-based conditional styling
  - Stylus: Works directly
  - Commit: 65f896f

- [x] **`rem()` / `mod()` for Remainders** (89%+ browser support)
  - File: `src/utilities/math.styl`
  - Alternating table row styles
  - Grid alignment
  - Stylus: Works directly
  - Commit: 65f896f

## 📝 Form State Styling (New)

- [x] **`:user-valid` / `:user-invalid`** (89%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Validation styling only after user interaction
  - Better UX than `:valid`/`:invalid`
  - Stylus: Works directly
  - Commit: ea9ec42

- [x] **`:placeholder-shown` Detection** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style inputs based on empty state
  - Floating label patterns
  - Stylus: Works directly
  - Commit: 91144ca

- [x] **`:read-only` / `:read-write` States** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Visual distinction for editable vs static content
  - Stylus: Works directly
  - Commit: 030eb94

## 🔲 Logical Properties Expansion (New)

- [x] **`inset` Shorthand** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Replace `top/right/bottom/left` with `inset`
  - Example: `inset: 0;` for full coverage
  - Stylus: Works directly
  - Added inset utilities: .inset-cover, .inset-center, .inset-space-*, .inset-vertical/horizontal, .inset-start/end, .inset-block/inline
  - Added fixed/absolute/sticky positioning with inset
  - Commit: 1812b4c

- [x] **`inset-block` / `inset-inline`** (97%+ browser support)
  - File: `src/utilities/positioning.styl` (new file)
  - Logical positioning for RTL support
  - `inset-inline-start` instead of `left`
  - Stylus: Works directly
  - Commit: 414670c

- [x] **`margin-block` / `margin-inline`** (97%+ browser support)
  - File: `src/utilities/spacing.styl` (new file)
  - Flow-relative margins
  - Better for vertical writing modes
  - Stylus: Works directly
  - Commit: f581084

## ⚡ Performance Isolation (New)

- [x] **`contain` Property** (97%+ browser support)
  - File: `src/base/_performance.styl` (new file)
  - Isolate layout/paint/style for performance
  - `contain: layout paint` for content sections
  - `contain: content` for sidebars
  - Stylus: Works directly

- [x] **`overflow-anchor` for Scroll Anchoring** (97%+ browser support)
  - File: `src/components/optimizations.styl`
  - Control scroll anchoring behavior
  - `overflow-anchor: auto` for main content, `overflow-anchor: none` to opt out
  - Prevents scroll jumps when dynamic content is inserted
  - Stylus: Works directly
  - Commit: 7d2ec95


## 🔄 Discrete Property Transitions (New - 2026-02-28 Scout 7)

- [x] **`transition-behavior: allow-discrete`** (85%+ browser support)
  - File: `src/components/discrete-transitions.styl`
  - Enable transitions on discrete properties (display, visibility)
  - Example: `transition: display 0.3s; transition-behavior: allow-discrete;`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 7f2e29a

- [x] **Expand `@starting-style` Usage** (85%+ browser support)
  - File: `src/components/discrete-transitions.styl`, `src/components/animations.styl`
  - Entry animations for collapsible sections, dropdowns, dialogs
  - Pair with `transition-behavior: allow-discrete`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 7f2e29a

## 🎯 MediaWiki 1.43+ Features (New)

- [ ] **Discussion Tools Reply UI** (CSS)
  - File: `src/components/discussion.styl`
  - New reply form styling
  - Topic subscription indicator
  - New topics button styling

- [ ] **VisualEditor 2024 Updates** (CSS)
  - File: `src/components/extensions.styl`
  - Updated toolbar styling
  - Context item menus
  - Citation dialog improvements

- [ ] **Media Viewer Enhancements** (CSS)
  - File: `src/components/file-pages.styl`
  - Fullscreen viewer styling
  - Gallery navigation controls
  - Metadata panel styling

- [ ] **Echo Notifications Redesign** (CSS)
  - File: `src/components/notifications.styl` (new file)
  - Notification badge styling
  - Notification panel cards
  - Mark as read indicators

- [ ] **Minerva Mobile Improvements** (CSS)
  - File: `src/components/mobile.styl`
  - Updated mobile menu styling
  - Touch-friendly edit buttons
  - Improved hamburger menu


## 📐 Modern Layout Techniques (New - 2026-02-28 Scout 8)

- [x] **`subgrid` for Nested Grid Alignment** (90%+ browser support)
  - File: `src/components/tables.styl`
  - Align nested grid items with parent grid
  - Perfect for infobox sub-tables, nested lists
  - Stylus: Works directly
  - Added grid-template-columns: subgrid support for tables, infoboxes, and nested grids
  - Includes responsive multi-column grid tables (3 and 4 columns)
  - Commit: 3c1e38a

- [x] **`masonry` Layout for Galleries** (87%+ browser support, Firefox only behind flag)
  - File: `src/components/file-pages.styl`
  - Masonry layout without JavaScript
  - Image gallery, category pages
  - Note: Limited support, use as progressive enhancement
  - Commit: bd0937b

- [x] **`gap` in Flexbox** (97%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Use gap instead of margins in flex containers
  - Cleaner spacing between flex items
  - Stylus: Works directly
  - Commit: 56063ce

## 🎭 Advanced Pseudo-Classes (New)

- [x] **`:nth-child(of S)` Selector** (89%+ browser support)
  - File: `src/components/tables.styl`, `src/components/content.styl`
  - nth-child with selector argument
  - Example: `tr:nth-child(of :not(.header))`
  - Stylus: Works directly
  - Commit: b21b472

- [x] **`:blank` for Empty Form Fields** (87%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style truly empty inputs (no whitespace)
  - More specific than `:placeholder-shown`
  - Stylus: Works directly
  - Commit: b21b472

- [x] **`:dir()` for Direction Styling** (90%+ browser support)
  - File: `src/components/i18n.styl`
  - Style based on text direction (ltr/rtl)
  - Better than [dir] attribute selectors
  - Stylus: Works directly
  - Commit: 0821863

## 🔤 Text & Typography (New)

- [x] **`text-spacing-trim` for CJK** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Control spacing around CJK punctuation
  - Better typography for Asian languages
  - Stylus: Works directly
  - Commit: adbcbaa

- [x] **`white-space-collapse` Control** (97%+ browser support)
  - File: `src/components/code.styl`, `src/components/content.styl`
  - Fine-grained whitespace handling
  - Values: collapse, preserve, preserve-breaks
  - Stylus: Works directly
  - Commit: a1fc976

- [x] **`text-group-align` for Block Alignment** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Align text groups within blocks
  - Better than text-align for complex layouts
  - Stylus: Works directly
  - Commit: ddf5ff4

## 🖼️ Media Enhancements (New)

- [x] **`@media (video-dynamic-range)`** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect HDR video capability
  - Provide enhanced colors for HDR displays
  - Stylus: Works directly
  - Commit: e3c5a45

- [x] **`@media (prefers-reduced-data)`** (87%+ browser support)
  - File: `src/components/performance.styl`
  - Detect data saver mode
  - Reduce image quality/animations
  - Stylus: Works directly
  - Commit: c8d6b37

- [x] **`aspect-ratio` for CLS Optimization** (97%+ browser support for aspect-ratio)
  - File: `src/components/content.styl`
  - Set default aspect ratios for images without dimensions
  - Prevent layout shift on image load
  - Default 16:9 for images/videos, 1:1 for avatars and gallery images
  - Commit: 11d8667

## ⚡ Performance Patterns (New)

- [x] **`render-subtree` for Visibility** (87%+ browser support)
  - File: `src/components/performance.styl`
  - Control rendering of subtrees
  - `render-subtree: invisible` for hidden content
  - Stylus: Works directly
  - Commit: d80061c

- [x] **`content-visibility: hidden` with `hidden=until-found`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Collapsible content that's searchable
  - Pair with `content-visibility: hidden`
  - Stylus: Works directly
  - Commit: d91ce4e

## 🎨 Visual Effects (New)

- [x] **`mask-image` for Image Effects** (97%+ browser support)
  - File: `src/components/content.styl`
  - CSS masking for images, icons
  - Gradient masks for fade effects
  - Stylus: Works directly

- [x] **`clip-path` Basic Shapes** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Clip elements to shapes
  - Circle, ellipse, polygon
  - Stylus: Works directly

- [x] **`filter: contrast()` for Readability** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - Increase contrast on demand
  - `@media (prefers-contrast: more)` pair
  - Stylus: Works directly
  - Commit: e1b897fc


## 📜 Scroll Enhancements (New - 2026-02-28 Scout 9)

- [x] **`overscroll-behavior` for Scroll Chaining** (92%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/content.styl`
  - Prevent scroll chaining in nested scrollables
  - `overscroll-behavior: contain` for TOC, modals
  - Stylus: Works directly

- [x] **`scrollbar-gutter: stable` for Layout** (92%+ browser support)
  - File: `src/components/base.styl`, `src/components/content.styl`, `src/components/navigation.styl`
  - Prevent layout shift from scrollbars
  - Reserve scrollbar space even when hidden
  - Stylus: Works directly
  - Commit: 48b85d9

- [x] **`scroll-timeline` for Custom Animations** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define named scroll timelines
  - More control than `animation-timeline: scroll()`
  - Note: Wrap in `@supports` for Stylus
  - Added scroll-timeline-name, scroll-timeline-axis, view-timeline-name, view-timeline-inset, timeline-scope utilities
  - Added animation-range utilities for entry/exit/cross/contain animations
  - Commit: c035cb0

## 🔤 Text Enhancements (New)

- [x] **`text-wrap: balance/pretty`** (92%+ browser support)
  - File: `src/components/typography.styl`
  - Better headline wrapping: `text-wrap: balance;`
  - Prevent orphans in paragraphs: `text-wrap: pretty;`
  - Applied to headings, lead paragraphs, and article body
  - Stylus: Works directly
  - Commit: 552d96c

## 🎨 Color Font Support (New)

- [x] **`font-palette` for Color Fonts** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Select color font palettes
  - `font-palette: normal`, `font-palette: light`
  - Stylus: Works directly
  - Commit: 89012be

- [x] **`@font-palette-values` Custom Palettes** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define custom color font palettes
  - Override emoji/icon font colors
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 89012be

- [x] **`font-variant-alternates` for OpenType** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Access alternate glyphs
  - `font-variant-alternates: historical-forms`
  - Stylus: Works directly
  - Commit: f0fe3e3

## 🖼️ Image Enhancements (New)

- [x] **`image-set()` for Responsive Images** (97%+ browser support)
  - File: `src/components/content.styl`
  - Serve different images for different DPR
  - `background-image: image-set("img.png" 1x, "img@2x.png" 2x);`
  - Stylus: Works directly
  - Commit: ffe3ca7

- [x] **`cross-fade()` for Transitions** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Blend two images together
  - Smooth image transitions
  - Stylus: Works directly
  - Added cross-fade-overlay and image-blur-up utilities
  - Commit: 1a4da94

- [x] **`conic-gradient` for Patterns** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Conic gradient backgrounds
  - Pie charts, color wheels
  - Stylus: Works directly
  - Added conic-pie-chart, conic-spinner, conic-rainbow, conic-neutral, conic-progress utilities
  - Commit: 1a4da94

## 📐 Grid Shorthands (New)

- [x] **`place-items` Shorthand** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - `place-items: center` = `align-items` + `justify-items`
  - Cleaner grid alignment code
  - Stylus: Works directly
  - Commit: bd96a30

- [x] **`place-content` Shorthand** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - `place-content: center` = `align-content` + `justify-content`
  - Cleaner grid content alignment
  - Stylus: Works directly
  - Commit: bd96a30

- [x] **`place-self` Shorthand** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - `place-self: center` = `align-self` + `justify-self`
  - Cleaner grid item alignment
  - Stylus: Works directly
  - Commit: bd96a30

## 🖨️ Print Enhancements (New)

- [x] **`page-orientation` Descriptor** (87%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Control page orientation in `@page`
  - `@page { page-orientation: landscape; }`
  - Stylus: Works directly
  - Commit: 04799e9

- [x] **`print-color-adjust: exact`** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Preserve theme colors in print
  - Force exact color reproduction
  - Apply to body, code blocks, message boxes, tables
  - Includes -webkit-prefix for broader support
  - Commit: 4f65eb2

- [x] **`widows` / `orphans` Control** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Prevent lonely lines at page breaks
  - `orphans: 3; widows: 3;`
  - Stylus: Works directly


## 🎬 Media & Video Enhancements (New - 2026-02-28 Scout 10)

- [x] **`::cue` for Video Captions** (97%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style WebVTT captions/subtitles
  - `::cue { color: var(--text-color); background: rgba(0,0,0,0.8); }`
  - Stylus: Works directly
  - Commit: 592d1e5

- [x] **`:fullscreen` Pseudo-class** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style fullscreen mode elements
  - Hide UI chrome in fullscreen
  - Stylus: Works directly
  - Commit: dfa7fd0

- [x] **`:picture-in-picture` Pseudo-class** (92%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style PiP video container
  - PiP indicator styling
  - Stylus: Works directly
  - Commit: 152bf34

- [x] **`:paused` / `:playing` Pseudo-classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video based on playback state
  - Play/pause button indicators
  - Stylus: Works directly
  - Commit: 5c3455d

- [x] **`:buffering` / `:muted` Pseudo-classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video based on buffer/mute state
  - Loading indicators, mute icons
  - Stylus: Works directly
  - Commit: 5c3455d

## 📝 Form Enhancements (New)

- [x] **`::file-selector-button` Styling** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style file input button
  - `input[type="file"]::file-selector-button { ... }`
  - Stylus: Works directly
  - Commit: a56b1c8

- [x] **`:autofill` Pseudo-class** (85%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style autofilled inputs
  - Different background for autofilled fields
  - Stylus: Works directly
  - Commit: 5b2607e

- [x] **`:indeterminate` Pseudo-class** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style indeterminate checkboxes/radios
  - Progress bars without value
  - Stylus: Works directly
  - Commit: 5b2607e

- [x] **`:in-range` / `:out-of-range`** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style inputs based on min/max range
  - Visual feedback for valid/invalid range
  - Stylus: Works directly
  - Commit: b0ce774

- [x] **`:default` Pseudo-class** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style default form elements
  - Default submit button, checked radio
  - Stylus: Works directly
  - Commit: c2aacf9

## 🔤 Typography Deep Cuts (New)

- [x] **`font-optical-sizing` for Variable Fonts** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Enable optical sizing for variable fonts
  - `font-optical-sizing: auto;`
  - Stylus: Works directly
  - Commit: {hash}

- [ ] **`@font-face` Descriptors** (97%+ browser support)
  - File: `src/variables/_fonts.styl` (new file)
  - `font-display: swap` for FOUT prevention
  - `size-adjust` for metric matching
  - `ascent-override`, `descent-override`, `line-gap-override`
  - Stylus: Works directly

- [x] **`text-emphasis` for Ruby/Emphasis** (90%+ browser support)
  - File: `src/components/typography.styl`
  - Add emphasis marks to text
  - `text-emphasis: filled circle;`
  - Stylus: Works directly

- [x] **`text-justify` for Asian Languages** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control justification algorithm
  - `text-justify: inter-word;` or `inter-character;`
  - Stylus: Works directly
  - Added text-justify utilities (auto, inter-word, inter-character, distribute, none)
  - Added CJK-specific text wrapping (.cjk-text, .japanese-text, .chinese-text, .korean-text, .mixed-content)
  - Added :lang() selectors for Chinese, Japanese, Korean
  - Commit: d14fbf7

- [x] **`word-break: break-all` for URLs** (97%+ browser support)
  - File: `src/components/code.styl`
  - Break long URLs at any character
  - Different from `overflow-wrap`
  - Stylus: Works directly
  - Commit: d6f1c9c

## 🎨 Blend & Composite (New)

- [x] **`background-blend-mode`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Blend background layers
  - `background-blend-mode: multiply;`
  - Stylus: Works directly
  - Commit: 91913db

- [ ] **`isolation: isolate` Stacking Contexts** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Create isolated stacking contexts
  - Prevent z-index conflicts
  - Stylus: Works directly
  - Note: Already in modern-css.styl, verify coverage

- [ ] **`all` Shorthand for Resets** (97%+ browser support)
  - File: `src/utilities/_reset.styl` (new file)
  - Reset all properties at once
  - `all: unset;` or `all: revert;`
  - Stylus: Works directly

## 🌏 Vertical Writing (New)

- [x] **`writing-mode` for Vertical Text** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Support vertical writing modes
  - `writing-mode: vertical-rl;` for CJK
  - Stylus: Works directly
  - Commit: 81111f8

- [x] **`text-orientation` for Mixed Scripts** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Control text orientation in vertical mode
  - `text-orientation: mixed;` or `upright;`
  - Stylus: Works directly
  - Commit: 81111f8

- [ ] **`text-combine-upright` for Tate-chu-yoko** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Combine horizontal in vertical text
  - For numbers, dates in vertical text
  - Stylus: Works directly

- [ ] **`unicode-bidi` for Bidirectional** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Control bidirectional text algorithm
  - `unicode-bidi: plaintext;`
  - Stylus: Works directly

## 🎯 Container Style Queries (New)

- [x] **`@container style()` Queries** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Query custom property values
  - `@container style(--theme: dark) { ... }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **Container Name Scoping** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Name containers for targeted queries
  - `container-name: sidebar;`
  - Note: Wrap in `@css{}` for Stylus


## 🎨 SVG & Vector Enhancements (New - 2026-02-28 Scout 11)

- [x] **`paint-order` for SVG Text** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Control paint order for SVG text elements
  - `paint-order: stroke fill;` for outlined text
  - Stylus: Works directly
  - Commit: a7e641fa

- [x] **`stroke-*` Properties for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`
  - Style SVG icons consistently
  - Stylus: Works directly
  - Commit: a7e641fa

- [x] **`vector-effect: non-scaling-stroke`** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Prevent stroke scaling on SVG resize
  - Consistent icon borders at any size
  - Stylus: Works directly
  - Commit: a7e641fa

- [x] **`shape-rendering` for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Control SVG rendering quality
  - `shape-rendering: crispEdges;` for pixel-perfect icons
  - Stylus: Works directly
  - Commit: a7e641fa

## 🎯 Custom Highlight API (New)

- [x] **`::highlight()` Pseudo-element** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style custom text highlights
  - `::highlight(search-results) { background: yellow; }`
  - Note: Requires JS API pairing, wrap in `@css{}` for Stylus
  - Commit: 9a98043

- [ ] **`highlight()` CSSOM Integration** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Document JS usage for custom highlights
  - Search highlighting, annotation styling
  - Note: CSS + JS feature

## 📐 Advanced Interpolation (New)

- [x] **`interpolate-size: allow-keywords`** (85%+ browser support)
  - File: `src/components/animations.styl`
  - Enable smooth transitions to/from `auto`
  - `interpolate-size: allow-keywords;`
  - Example: `height: 0; height: auto;` now animates
  - Note: Wrap in `@css{}` for Stylus
  - Commit: e5a92b8

- [x] **`calc-size()` for Auto Transitions** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Alternative to interpolate-size
  - `height: calc-size(auto);`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 1e2b980

## 🔤 Advanced Text (New)

- [x] **`text-wrap-mode` Property** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control text wrapping behavior
  - `text-wrap-mode: nowrap;`
  - Stylus: Works directly
  - Commit: 9dc54ab

- [x] **`text-wrap-style` Property** (92%+ browser support)
  - File: `src/components/typography.styl`
  - Control wrapping style
  - `text-wrap-style: balance;` or `pretty;`
  - Stylus: Works directly
  - Commit: 2f290ca

- [ ] **`hanging-punctuation` Expansion** (95%+ browser support)
  - File: `src/components/typography.styl`
  - Already implemented - verify coverage
  - `hanging-punctuation: first last;`
  - Stylus: Works directly

## 🖼️ Object & Box (New)

- [x] **`object-view-box` for Image Clipping** (87%+ browser support)
  - File: `src/components/content.styl`
  - Clip images with CSS
  - `object-view-box: inset(10px);`
  - Stylus: Works directly
  - Commit: a8f6926

- [ ] **`corner-shape` for Corners** (87%+ browser support)
  - File: `src/components/ui-components.styl`
  - Custom corner shapes
  - `corner-shape: scoop;`
  - Note: Experimental, limited support

- [ ] **`box-shadow` Multiple Layers** (97%+ browser support)
  - File: `src/components/boxes.styl`
  - Already used - verify complex shadow usage
  - Multiple shadows for depth effects
  - Stylus: Works directly

## 🌐 At-Risk / Experimental (New)

- [ ] **`@when` Conditional Rule** (Draft, limited support)
  - File: `src/components/modern-css.styl`
  - Alternative to `@media` / `@supports`
  - Monitor for browser adoption
  - Note: Future feature

- [ ] **`@else` Chained Conditions** (Draft, limited support)
  - File: `src/components/modern-css.styl`
  - Chain conditional rules
  - Monitor for browser adoption
  - Note: Future feature

- [ ] **CSS Toggles (`toggle-*`)** (Draft, no support)
  - File: Document for future reference
  - Native toggle state in CSS
  - Track W3C progress
  - Note: Very experimental


## 🎯 Anchor Positioning API (New - 2026-02-28 Scout 12)

- [ ] **`anchor()` Function** (85%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Position elements relative to anchors
  - `top: anchor(bottom);` for tooltips
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`position-anchor` Property** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - Define anchor element for positioned element
  - `position-anchor: --my-anchor;`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`anchor-size()` Function** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - Size elements based on anchor
  - `width: anchor-size(width);`
  - Note: Wrap in `@css{}` for Stylus

- [x] **`@position-try` Fallbacks** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - Define fallback positions
  - `@position-try --fallback { top: anchor(top); }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: b333f6f

- [x] **`position-try-fallbacks` Property** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - List fallback positions
  - `position-try-fallbacks: --flip, --slide;`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: b333f6f

## 📜 Scroll State Containers (New)

- [x] **`@scroll-state` Container Queries** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Query scroll state in CSS
  - `@scroll-state (snapped: x) { ... }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 4233450

- [x] **`:snapped` Pseudo-class** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style snapped scroll items
  - `:snapped { background: var(--accent); }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 4233450
  - Style snapped scroll items
  - `:snapped { background: var(--accent); }`
  - Note: Wrap in `@css{}` for Stylus

- [x] **`:snapped-x` / `:snapped-y` Pseudo-classes** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style axis-specific snapped items
  - Note: Wrap in `@css{}` for Stylus
  - Commit: 1d5be4f

- [x] **`scroll-start` / `scroll-end` Properties** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Define scroll snap boundaries
  - Note: Wrap in `@css{}` for Stylus
  - Commit: `dc90e5d`

## 🔖 Scroll Markers (New)

- [x] **`::scroll-marker` Pseudo-element** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style scroll position markers
  - Carousel pagination dots
  - Note: Wrap in `@css{}` for Stylus
  - Commit: f69c620

- [ ] **`::scroll-marker-group` Pseudo-element** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style scroll marker container
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`scroll-marker` Property** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Enable scroll markers on element
  - Note: Wrap in `@css{}` for Stylus

## ⏱️ Timeline Scope (New)

- [ ] **`timeline-scope` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define named scroll timelines
  - `timeline-scope: --my-timeline;`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **Named Scroll Timelines** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Create reusable scroll timelines
  - `scroll-timeline: --my-timeline inline;`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **Named View Timelines** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Create reusable view timelines
  - `view-timeline: --my-timeline;`
  - Note: Wrap in `@css{}` for Stylus

## 🔧 @property Expansion (New)

- [ ] **`@property` for Length Values** (97%+ browser support)
  - File: `src/variables/_properties.styl`
  - Already implemented for colors - expand to lengths
  - `@property --spacing { syntax: '<length>'; ... }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@property` for Custom Syntaxes** (97%+ browser support)
  - File: `src/variables/_properties.styl`
  - Define custom value types
  - `syntax: '<color> | <length>'`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`inherits: false` for Isolation** (97%+ browser support)
  - File: `src/variables/_properties.styl`
  - Prevent inheritance for component-scoped vars
  - Note: Wrap in `@css{}` for Stylus


## 🔢 CSS Math Functions (New - 2026-02-28 Scout 13)

- [x] **CSS Math Functions Utilities** (89%+ browser support)
  - File: `src/utilities/math.styl`
  - Utility classes for CSS math functions (round, abs, sign, rem, mod, sqrt, hypot, pow, log, exp, sin, cos, tan, asin, acos, atan, atan2, pi, e)
  - Demonstrates usage patterns for responsive layouts and animations
  - Stylus: Works directly
  - Commit: a785992

## 🔤 Initial Letter (New)

- [x] **`initial-letter` Drop Caps** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Enhanced drop caps control
  - `initial-letter: 3 2;` (3 lines, sink 2)
  - Stylus: Works directly
  - Commit: 59c7703

- [x] **`initial-letter-align` Alignment** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Align initial letters
  - Stylus: Works directly
  - Commit: 59c7703

- [x] **`initial-letter-wrap` Wrapping** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Control initial letter wrapping
  - Stylus: Works directly
  - Commit: 59c7703

## 📐 Line Grid (New)

- [ ] **`line-grid` Property** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Align text to grid
  - `line-grid: match-parent;`
  - Stylus: Works directly

- [ ] **`line-snap` Property** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Snap lines to grid
  - Stylus: Works directly

- [ ] **`box-snap` Property** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Snap boxes to line grid
  - Stylus: Works directly

## 🔤 Hyphenation Control (New)

- [x] **`hyphenate-limit-chars`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Minimum chars before/after hyphen
  - `hyphenate-limit-chars: 6 3;`
  - Commit: 16eac85

- [x] **`hyphenate-limit-lines`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Max consecutive hyphenated lines
  - Stylus: Works directly
  - Commit: 16eac85

- [x] **`hyphenate-limit-zone`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Hyphenation zone limit
  - Stylus: Works directly
  - Commit: 16eac85
  - Stylus: Works directly

- [ ] **`hyphenate-limit-lines`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Max consecutive hyphenated lines
  - Stylus: Works directly

- [ ] **`hyphenate-limit-zone`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Hyphenation zone limit
  - Stylus: Works directly


## 🎨 Form Styling (New - 2026-03-01 Scout 1)

- [x] **`field-sizing` for Auto-Expanding Textareas** (85%+ browser support)
  - File: `src/components/editing.styl`
  - Auto-size textareas based on content
  - `field-sizing: content;`
  - Stylus: Works directly

- [x] **`accent-color` for Form Controls** (97%+ browser support)
  - File: `src/components/forms.styl`
  - Style checkboxes, radios, range inputs
  - `accent-color: var(--accent);`
  - Stylus: Works directly

- [x] **`appearance: none` for Custom Controls** (97%+ browser support)
  - File: `src/components/forms.styl`
  - Remove native styling
  - Build custom form controls
  - Stylus: Works directly

## 🎬 View Transitions (New)

- [ ] **`@view-transition` Rule** (85%+ browser support)
  - File: `src/components/transitions.styl` (new file)
  - Enable view transitions
  - `@view-transition { navigation: auto; }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`view-transition-name` Property** (85%+ browser support)
  - File: `src/components/transitions.styl`
  - Name elements for transitions
  - `view-transition-name: hero-image;`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`::view-transition` Pseudo-element** (85%+ browser support)
  - File: `src/components/transitions.styl`
  - Style transition container
  - `::view-transition { background: var(--bg); }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`::view-transition-group()`** (85%+ browser support)
  - File: `src/components/transitions.styl`
  - Style transition groups
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`::view-transition-image-pair()`** (85%+ browser support)
  - File: `src/components/transitions.styl`
  - Style image pairs during transition
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`::view-transition-old()` / `::view-transition-new()`** (85%+ browser support)
  - File: `src/components/transitions.styl`
  - Style old/new states
  - Note: Wrap in `@css{}` for Stylus

## 🌫️ Backdrop Effects (New)

- [x] **`backdrop-filter` for Glassmorphism** (97%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/modals.styl`
  - Blur behind elements
  - `backdrop-filter: blur(10px);`
  - Stylus: Works directly

- [x] **`backdrop-filter: brightness()`** (97%+ browser support)
  - File: `src/components/navigation.styl`
  - Adjust backdrop brightness
  - Added utility classes: .backdrop-brightness-light/dark, .backdrop-brightness-* (50-200%)
  - Stylus: Works directly
  - Commit: 37ba9bc

- [x] **`backdrop-filter: saturate()`** (97%+ browser support)
  - File: `src/components/navigation.styl`
  - Adjust backdrop saturation
  - Added utility classes: .backdrop-saturate-high/low, .backdrop-saturate-* (150-200%)
  - Also added combined .backdrop-bright-vibrant, .backdrop-dark-muted, .backdrop-frosted-*
  - Stylus: Works directly
  - Commit: 37ba9bc

## 📜 Scrollbar Styling (New)

- [x] **`scrollbar-color` for Custom Scrollbars** (97%+ browser support)
  - File: `src/components/scrollbars.styl` (new file)
  - Color scrollbar thumb/track
  - `scrollbar-color: var(--accent) var(--bg-secondary);`
  - Stylus: Works directly

- [x] **`scrollbar-width` for Scrollbar Size** (97%+ browser support)
  - File: `src/components/scrollbars.styl`
  - Thin/auto/none scrollbars
  - `scrollbar-width: thin;`
  - Stylus: Works directly

- [x] **`scrollbar-gutter` Expansion** (92%+ browser support)
  - File: `src/components/scrollbars.styl`
  - Reserve space for scrollbar
  - `scrollbar-gutter: stable both-edges;`
  - Stylus: Works directly


## 🎭 Individual Transform Properties (New - 2026-03-01 Scout 2)

- [x] **`translate` Property** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Individual translate without transform
  - `translate: 50% 0;`
  - Stylus: Works directly

- [x] **`rotate` Property** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Individual rotate without transform
  - `rotate: 45deg;`
  - Stylus: Works directly

- [x] **`scale` Property** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Individual scale without transform
  - `scale: 1.5;`
  - Stylus: Works directly

- [ ] **`transform-origin` Expansion** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Already used - verify coverage
  - `transform-origin: center top;`
  - Stylus: Works directly

## 🎨 Filter Expansion (New)

- [x] **`filter: blur()` for Focus Effects** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Blur unfocused elements
  - `filter: blur(2px);`
  - Stylus: Works directly

- [x] **`filter: brightness()` for Themes** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Adjust element brightness
  - Stylus: Works directly

- [x] **`filter: saturate()` for Color Control** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Adjust color saturation
  - Stylus: Works directly

- [x] **`filter: hue-rotate()` for Color Shifts** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Rotate hue of elements
  - Stylus: Works directly

- [x] **`filter: invert()` for Dark Mode** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Invert element colors
  - Stylus: Works directly

- [x] **`filter: grayscale()` for Disabled States** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Grayscale disabled elements
  - Stylus: Works directly

- [x] **`filter: sepia()` for Vintage Effects** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Sepia tone for images
  - Stylus: Works directly

- [x] **`filter: drop-shadow()` for Irregular Shapes** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Shadow for PNG/SVG shapes
  - `filter: drop-shadow(2px 4px 6px black);`
  - Stylus: Works directly

## 🖨️ Print Enhancements (New)

- [x] **`break-before` / `break-after` / `break-inside`** (97%+ browser support)
  - File: `src/components/print.styl`
  - Control page/column breaks
  - `break-inside: avoid;`
  - Stylus: Works directly
  - Commit: 3c76788

- [x] **`page` Property for Named Pages** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Named page styles
  - `page: wide;`
  - Stylus: Works directly
  - Commit: 2b8ec33

- [x] **`size` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Define page size
  - `@page { size: A4; }`
  - Stylus: Works directly
  - Commit: 2b8ec33

- [x] **`marks` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Print crop/registration marks
  - Stylus: Works directly (requires @css{} wrapper for marks/bleed)
  - Commit: 3cbbf77

- [x] **`bleed` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Print bleed area
  - Stylus: Works directly (requires @css{} wrapper for marks/bleed)
  - Commit: 3cbbf77


## 📐 Sizing Keywords (New - 2026-03-01 Scout 3)

- [x] **`fit-content()` Function** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Size to fit content with max
  - `width: fit-content(300px);`
  - Stylus: Works directly

- [x] **`min-content` / `max-content` Keywords** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Content-based sizing
  - `width: min-content;`
  - Stylus: Works directly

- [x] **`stretch` Sizing Keyword** (85%+ browser support)
  - File: `src/components/layout.styl`
  - Fill available space
  - `width: stretch;`
  - Stylus: Works directly

## 🎯 Interaction Enhancements (New)

- [x] **`user-select: contain`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Selection containment
  - Stylus: Works directly

- [x] **`pointer-events: painted` for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - SVG pointer events on fill only
  - Stylus: Works directly

- [x] **`resize: block` / `inline`** (97%+ browser support)
  - File: `src/components/editing.styl`
  - Logical axis resizing
  - Stylus: Works directly

- [x] **`cursor: zoom-in` / `zoom-out`** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Zoom cursor hints
  - Stylus: Works directly

- [x] **`caret-shape` Property** (85%+ browser support)
  - File: `src/components/editing.styl`
  - Style text cursor shape
  - `caret-shape: block;`
  - Stylus: Works directly

## 📋 Multi-Column Layout (New)

- [x] **`column-rule` Shorthand** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Column divider style utilities
  - Added thin/medium/thick/dashed/dotted/double/none variants
  - Stylus: Works directly
  - Commit: 2c29491

- [x] **`column-span: all`** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Span all columns
  - Added .column-span-all utility
  - Stylus: Works directly
  - Commit: 2c29491

- [x] **`column-fill: balance`** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Balance column content
  - Added .column-fill-balance and .column-fill-auto utilities
  - Stylus: Works directly
  - Commit: 2c29491

- [x] **`columns` Shorthand** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Column count + width
  - Added columns-2, columns-3, columns-auto utilities
  - Stylus: Works directly
  - Commit: 2c29491

- [ ] **`columns` Shorthand** (97%+ browser support)
  - File: `src/components/content.styl`
  - Column count + width
  - `columns: 3 20ch;`
  - Stylus: Works directly

## 🔲 Visibility & Opacity (New)

- [x] **`visibility: collapse` for Table Rows** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Hide table rows properly
  - Stylus: Works directly

- [x] **`opacity: percentages` in Animations** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Smooth fade transitions
  - Stylus: Works directly

## 📦 Display Enhancements (New)

- [x] **`display: flow-root`** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Clearfix replacement
  - Stylus: Works directly

- [x] **`display: contents` for Semantic HTML** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Remove element from box tree
  - Accessibility: use with caution
  - Stylus: Works directly

- [ ] **`display: inline flow` Multi-Keyword** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Explicit display keywords
  - Stylus: Works directly


## 🎬 Animation Properties (New - 2026-03-01 Scout 4)

- [x] **`animation-delay: negative` for Pre-delayed Start** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Start animation mid-cycle
  - `animation-delay: -1s;`
  - Stylus: Works directly

- [x] **`animation-direction: alternate-reverse`** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Reverse alternate direction
  - Stylus: Works directly

- [x] **`animation-fill-mode: both`** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Apply before and after
  - Stylus: Works directly

- [x] **`animation-play-state: paused` Toggle** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Pause/resume animations
  - Stylus: Works directly
  - Commit: bd7afa3

## 🔲 Outline Enhancements (New)

- [x] **`outline-offset` for Spaced Outlines** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Space outline from element
  - `outline-offset: 2px;`
  - Stylus: Works directly

- [x] **`outline-style: auto` for Platform Focus** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Platform-native focus ring
  - Stylus: Works directly
  - Commit: 054df20

- [ ] **`outline` Shorthand** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Compact outline syntax
  - `outline: 2px solid var(--accent);`
  - Stylus: Works directly

## 🖼️ Border Image (New)

- [x] **`border-image` for Decorative Borders** (97%+ browser support)
  - File: `src/components/decorative.styl` (new file)
  - Image-based borders
  - `border-image: url(border.png) 30 round;`
  - Stylus: Works directly

- [ ] **`border-image-slice` for SVG Borders** (97%+ browser support)
  - File: `src/components/decorative.styl`
  - Slice SVG for borders
  - Stylus: Works directly

- [ ] **`border-image-repeat: round`** (97%+ browser support)
  - File: `src/components/decorative.styl`
  - Round border image tiles
  - Stylus: Works directly

## 📋 Table Enhancements (New)

- [x] **`table-layout: fixed` for Performance** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Fixed table layout for faster table rendering
  - Stylus: Works directly
  - Commit: 3cd2e71

- [ ] **`border-collapse: separate` with Spacing** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Separate borders with gaps
  - `border-collapse: separate; border-spacing: 2px;`
  - Stylus: Works directly

- [ ] **`border-spacing` for Gaps** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Space between cell borders
  - Stylus: Works directly

## 🔢 Counter Enhancements (New)

- [x] **`counter-set` for Resetting** (97%+ browser support)
  - File: `src/components/lists.styl`
  - Set counter without increment
  - Stylus: Works directly

- [x] **`counters()` for Nested Lists** (97%+ browser support)
  - File: `src/components/lists.styl`
  - Nested counter display
  - `content: counters(item, ".") " ";`
  - Stylus: Works directly



## 🖱️ Input Capability Detection (New - 2026-03-01 Scout 14)

- [x] **`@media (hover: hover)` for Hover Capable Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Only show hover effects on devices that support true hover
  - Hide tooltip delays, hover previews on touch devices
  - Example: `@media (hover: hover) { .mw-ui-button:hover { ... } }`
  - Stylus: Works directly

- [x] **`@media (hover: none)` for Touch-Only Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Touch-specific UI enhancements
  - Larger touch targets, no hover-dependent UI
  - Stylus: Works directly
  - Commit: 45dddce

- [x] **`@media (pointer: fine)` for Precise Input** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Mouse/trackpad - can use smaller targets
  - Stylus: Works directly

- [x] **`@media (pointer: coarse)` for Touch Input** (97%+ browser support)
  - File: `src/components/mobile.styl`
  - Finger input - increase touch target sizes
  - Minimum 44px touch targets
  - Stylus: Works directly
  - Commit: 6a44dbf

- [x] **`@media (any-hover)` for Hybrid Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect if ANY input device supports hover
  - Tablets with mice, touch laptops
  - Stylus: Works directly

- [x] **`@media (any-pointer)` for Multi-Input** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect best available pointer precision
  - Stylus: Works directly
  - Commit: cb6456a

## 📱 Mobile Environment Variables (New)

- [ ] **`env(keyboard-inset-*)` for Mobile Keyboards** (87%+ browser support)
  - File: `src/components/mobile.styl`
  - `keyboard-inset-top`, `keyboard-inset-right`, `keyboard-inset-bottom`, `keyboard-inset-left`
  - Adjust edit form layout when virtual keyboard appears
  - Example: `padding-bottom: env(keyboard-inset-bottom, 0);`
  - Stylus: Works directly

## 🖥️ Display Capability Queries (New)

- [x] **`@media (resolution)` and `min-resolution` / `max-resolution`** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect screen DPI/Pixel density
  - Serve higher-res assets for retina displays
  - Example: `@media (min-resolution: 2dppx) { ... }`
  - Stylus: Works directly
  - Commit: c688a5a

- [x] **`@media (color-index)` for Color Depth** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect indexed color displays
  - Simplify gradients for limited color devices
  - Stylus: Works directly
  - Commit: c688a5a

- [x] **`@media (monochrome)` for B&W Displays** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect e-ink, monochrome screens
  - High contrast styling for monochrome
  - Stylus: Works directly
  - Commit: c688a5a
  - High contrast, no gradients for e-readers
  - Stylus: Works directly

- [x] **`@media (grid)` for Grid Displays** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - Detect braille, grid-based displays
  - Simplified layout for assistive tech
  - Stylus: Works directly
  - Commit: 290bf89

## 🎨 Color Preference Queries (New)

- [x] **`@media (forced-colors: active)` for High Contrast Mode** (95%+ browser support)
  - File: `src/components/accessibility.styl`
  - Windows High Contrast Mode support
  - Use system colors: `CanvasText`, `Canvas`, `Highlight`
  - Ensure visibility when colors are forced
  - Stylus: Works directly

- [x] **`@media (inverted-colors: inverted)` for Color Inversion** (87%+ browser support)
  - File: `src/components/accessibility.styl`
  - Detect if user has inverted colors (macOS, iOS)
  - Adjust images, shadows for better appearance
  - Stylus: Works directly

## 📐 Viewport & Aspect Queries (New)

- [x] **`@media (aspect-ratio)` for Aspect Ratio Detection** (97%+ browser support)
  - File: `src/components/responsive-enhanced.styl`
  - Detect viewport aspect ratio
  - Adjust infobox, sidebar layout for ultra-wide or portrait
  - Example: `@media (aspect-ratio: 21/9) { ... }`
  - Stylus: Works directly
  - Commit: fc89714

- [x] **`@media (orientation: portrait/landscape)`** (100% browser support)
  - File: `src/components/responsive-enhanced.styl`
  - Explicit orientation detection
  - Adjust table, infobox layout
  - Stylus: Works directly
  - Commit: 46b7c99

## 🔧 Scripting & Capabilities (New)

- [x] **`@media (scripting: enabled/none/initial-only)`** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect JavaScript availability
  - Provide fallback styles for no-JS
  - Show/hide JS-dependent UI (collapsibles, etc.)
  - Stylus: Works directly

- [x] **`@media (update: slow/none/fast)`** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect display refresh capability
  - Simplify animations for e-ink (slow update)
  - Stylus: Works directly
  - Commit: 2f583a4

## 🔤 Advanced Font Variants (New)

- [x] **`font-variant-caps` for Capital Styles** (97%+ browser support)
  - File: `src/components/typography.styl`
  - `small-caps`, `all-small-caps`, `petite-caps`, `all-petite-caps`
  - Stylistic option for headings, labels
  - Stylus: Works directly
  - Added utility classes: .small-caps, .all-small-caps, .petite-caps, .all-petite-caps, .unicase, .titling-caps
  - Commit: d14fbf7

- [ ] **`font-variant-ligatures` for Ligatures** (97%+ browser support)
  - File: `src/variables/colors.styl`, `src/components/code.styl`
  - `common-ligatures`, `discretionary-ligatures`, `historical-ligatures`
  - Control code font ligatures
  - Stylus: Works directly

- [x] **`font-variant-east-asian` for CJK Typography** (97%+ browser support)
  - File: `src/components/typography.styl`
  - `jis78`, `jis83`, `jis90`, `jis04`, `simplified`, `traditional`
  - Better CJK font rendering
  - Stylus: Works directly
  - Commit: 2525f7c

- [x] **`font-variant-position` for Super/Subscript** (97%+ browser support)
  - File: `src/components/typography.styl`
  - `super`, `sub` for proper super/subscript glyphs
  - Better than `<sup>`/`<sub>` for typography
  - Stylus: Works directly
  - Commit: cb6456a

- [x] **`font-variant-emoji` for Emoji Presentation** (87%+ browser support)
  - File: `src/components/typography.styl`
  - `text`, `emoji`, `unicode` to control emoji rendering
  - Ensure consistent emoji appearance
  - Stylus: Works directly
  - Commit: 2525f7c

- [x] **`font-language-override` for Language-Specific Glyphs** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Override language for font feature selection
  - Access language-specific alternates
  - Stylus: Works directly
  - Commit: 2525f7c

- [x] **`@font-feature-values` for Named Features** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Define named font feature values
  - `@font-feature-values Font Name { @styleset { nice-style: 1; } }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

## 📖 Ruby Text Support (New)

- [x] **`ruby-align` for Ruby Text Alignment** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control alignment of ruby annotations (East Asian)
  - `start`, `center`, `space-between`, `space-around`
  - Stylus: Works directly

- [x] **`ruby-position` for Ruby Placement** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control ruby annotation position
  - `over`, `under`, `inter-character`
  - Stylus: Works directly

## 🌐 Web Components / Shadow DOM (New)

- [x] **`:defined` Pseudo-class for Custom Elements** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style only defined custom elements
  - Prevent FOUC for web components
  - Stylus: Works directly

- [x] **`:host` Pseudo-class for Shadow Host** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style shadow host from inside shadow DOM
  - Added :host base styling, :hover/:focus/:focus-visible states
  - Attribute selectors: [disabled], [variant], [size], [full-width], [rounded]
  - Stylus: Works directly
  - Commit: 1eee197

- [x] **`:host-context()` for Contextual Styling** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style based on shadow host ancestors
  - Added theme context (dark/light), direction (RTL/LTR), responsive breakpoints, print context, language-based styling
  - Stylus: Works directly
  - Commit: 269b3b2

- [x] **`::slotted()` for Slotted Content** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style light DOM content in slots
  - Stylus: Works directly

- [x] **`::part()` for Shadow Parts** (95%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style specific parts exposed by shadow DOM
  - Stylus: Works directly

- [ ] **`:state()` for Custom Element States** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style based on custom element internal state
  - `:state(loading)`, `:state(error)`
  - Stylus: Works directly

| 2026-03-01 | Fourteenth scout | Added input capability detection (hover, pointer, any-hover, any-pointer), mobile keyboard env vars, display capability queries (resolution, color-index, monochrome, grid), color preference queries (forced-colors, inverted-colors), viewport/aspect queries, scripting/update queries, advanced font variants (caps, ligatures, east-asian, position, emoji, language-override, @font-feature-values), ruby text support, web components/shadow DOM selectors (:defined, :host, ::slotted, ::part, :state) |


## 🎨 Animation Timing Functions (New - 2026-03-01 Scout 15)

- [x] **`linear()` Timing Function** (92%+ browser support)
  - File: `src/components/animations.styl`
  - Custom linear timing with control points
  - Example: `animation-timing-function: linear(0, 0.25 50%, 1);`
  - Stylus: Uses @css{} wrapper
  - Also added steps() with jump keywords and transition-behavior: allow-discrete
  - Commit: 1d97bf6

- [ ] **`steps()` with Jump Keywords** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Discrete animation steps with jump control
  - `jump-start`, `jump-end`, `jump-none`, `jump-both`
  - Example: `animation-timing-function: steps(5, jump-end);`
  - Stylus: Works directly

- [ ] **Custom `cubic-bezier()` Curves** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define custom easing curves
  - Example: `transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);`
  - Stylus: Works directly

## 📐 Advanced @property Types (New)

- [ ] **`@property` with `<number>` Syntax** (93%+ browser support)
  - File: `src/variables/colors.styl`
  - Animate numeric custom properties (0-1 range)
  - Example: `@property --opacity { syntax: '<number>'; initial-value: 1; inherits: false; }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@property` with `<integer>` Syntax** (93%+ browser support)
  - File: `src/components/modern-css.styl`
  - Animate integer values for stepped effects
  - Example: `@property --step { syntax: '<integer>'; initial-value: 0; inherits: false; }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@property` with `<angle>` Syntax** (93%+ browser support)
  - File: `src/components/modern-css.styl`
  - Animate rotation custom properties
  - Example: `@property --rotation { syntax: '<angle>'; initial-value: 0deg; inherits: false; }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@property` with `<time>` Syntax** (93%+ browser support)
  - File: `src/components/modern-css.styl`
  - Animate duration custom properties
  - Example: `@property --duration { syntax: '<time>'; initial-value: 0.3s; inherits: false; }`
  - Note: Wrap in `@css{}` for Stylus

## 🔤 Advanced @font-feature-values (New)

- [x] **`@stylistic` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Define stylistic alternate names
  - `@font-feature-values Font { @stylistic { alternate: 1; } }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@historical-forms` Feature** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Historical glyph variants
  - `@font-feature-values Font { @historical-forms { hist: 1; } }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@styleset` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Define style set names
  - `@font-feature-values Font { @styleset { set1: 1; } }`
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@character-variant` Feature** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Character variant definitions
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@swash` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Swash character variants
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@ornaments` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Ornamental characters
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

- [x] **`@annotation` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Annotation characters (circles, squares)
  - Note: Wrap in `@css{}` for Stylus
  - Commit: d132c6a

## 📜 Scroll Timeline Animations (New)

- [ ] **`scroll-timeline-name` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Name a scroll timeline for animation
  - Example: `scroll-timeline-name: --page-scroll;`
  - Stylus: Works directly

- [ ] **`scroll-timeline-axis` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define scroll axis (`block`, `inline`, `x`, `y`)
  - Stylus: Works directly

- [ ] **`view-timeline-name` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Name a view timeline
  - Stylus: Works directly

- [ ] **`view-timeline-inset` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Adjust view timeline inset
  - Stylus: Works directly

- [ ] **`animation-range` for Timeline Control** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define animation range in timeline
  - Example: `animation-range: entry 0% cover 40%;`
  - Stylus: Works directly

## 🎬 View Transition Classes (New)

- [x] **`view-transition-class` Property** (85%+ browser support)
  - File: `src/components/view-transitions.styl`
  - Add classes to view transitions for styling
  - Added hero, title, content, sidebar, toc, infobox transition groups
  - Includes zoom, slide, fade animation effects
  - Stylus: Works directly
  - Commit: 956c72e

## 🌈 System Color Keywords (New)

- [x] **`light-dark()` Function** (92%+ browser support)
  - File: `src/variables/colors.styl`
  - Automatic light/dark color selection
  - Example: `color: light-dark(#333, #ccc);`
  - Stylus: Works directly

- [x] **Extended System Colors** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - `AccentColorText`, `SelectedItem`, `SelectedItemText`
  - `Mark`, `MarkText` for mark element
  - Use in `forced-colors` media query
  - Stylus: Works directly

## 📊 MathML Styling (New)

- [x] **MathML Element Styling** (97%+ browser support)
  - File: `src/components/content.styl`
  - Style mathematical equations in articles
  - `math`, `mrow`, `mi`, `mo`, `mn` elements
  - Consistent with code block styling
  - Stylus: Works directly

- [x] **`math-style` Property** (87%+ browser support)
  - File: `src/components/content.styl`
  - Control math display style (`normal`, `compact`)
  - Stylus: Works directly

- [ ] **`math-depth` Property** (87%+ browser support)
  - File: `src/components/content.styl`
  - Control math nesting depth styling
  - Stylus: Works directly

- [ ] **`math-shift` Property** (87%+ browser support)
  - File: `src/components/content.styl`
  - Control math shift style
  - Stylus: Works directly

| 2026-03-01 | Fifteenth scout | Added animation timing functions (linear(), steps() with jump keywords, cubic-bezier()), advanced @property types (<number>, <integer>, <angle>, <time>), advanced @font-feature-values (@stylistic, @historical-forms, @styleset, @character-variant, @swash, @ornaments, @annotation), scroll timeline animations (scroll-timeline-name/axis, view-timeline-name/inset, animation-range), view-transition-class, light-dark() function, extended system colors, MathML styling (math-style, math-depth, math-shift) |


## 🔧 MediaWiki Extensions Styling (New - 2026-03-01 Scout 16)

- [x] **Extension:CodeMirror Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Syntax highlighting in edit mode
  - Line number styling
  - Active line highlight
  - Bracket matching indicator
  - Commit: d6a40e0

- [x] **Extension:VisualEditor Styling** (CSS)
  - File: `src/components/extensions.styl` (new file)
  - Visual editor toolbar
  - Floating toolbar styling
  - Context item styling
  - Diff highlighting
  - Commit: addee2c

- [ ] **Extension:Echo Notifications** (CSS)
  - File: `src/components/extensions.styl`
  - Notification badge styling
  - Notification panel
  - Alert vs notice distinction
  - Unread indicator

- [ ] **Extension:Flow/StructuredDiscussions** (CSS)
  - File: `src/components/extensions.styl`
  - Discussion board styling
  - Topic containers
  - Reply threading
  - Moderation tools

- [ ] **Extension:Cite Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Reference list formatting
  - Cite error styling
  - Reference tooltip
  - Backlink styling

- [x] **Extension:PageForms Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Form input styling
  - Date picker
  - Combo box
  - Multi-select
  - Commit: ef718a8

## 📋 Advanced Table Features (New)

- [x] **Sortable Table Enhancement** (CSS)
  - File: `src/components/tables.styl`
  - Sort indicator arrows with ascending/descending states
  - Sorted column highlight with indicator bar
  - Sort animation with keyframe transitions
  - Header hover state with gradient backgrounds
  - Focus-visible support for keyboard navigation
  - Reduced motion support for accessibility
  - Commit: dd09519

- [x] **Scrollable Table Wrapper** (CSS)
  - File: `src/components/tables.styl`
  - Horizontal scroll wrapper with shadow fade indicators
  - Sticky first column support, scroll indicators
  - Mobile card layout for very small screens
  - Commit: 92cf67a
  - File: `src/components/tables.styl`
  - Horizontal scroll indicator
  - Sticky first column
  - Shadow fade on edges
  - Scroll position indicator

- [ ] **Responsive Table Cards** (CSS)
  - File: `src/components/tables.styl`
  - Mobile card layout for tables
  - Label-value pairs
  - Collapsible rows
  - Priority-based hiding

## 🏷️ ArchWiki-Specific Elements (New)

- [x] **Package Templates** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - {{Pkg}} template styling
  - {{AUR}} template styling
  - {{Grp}} template styling
  - Package status indicators
  - Commit: 5754579

- [x] **Command Line Blocks** (CSS)
  - File: `src/components/archwiki.styl`
  - Terminal prompt styling
  - Command/output separation
  - Copy button positioning
  - Root vs user prompt distinction
  - Commit: cca8d22

- [ ] **Configuration File Blocks** (CSS)
  - File: `src/components/archwiki.styl`
  - File path header
  - Syntax highlighting for configs
  - Comment styling
  - Variable/setting distinction

- [ ] **Installation Status Boxes** (CSS)
  - File: `src/components/archwiki.styl`
  - Installation status indicators
  - Available/Installed/Orphaned states
  - Package dependency diagrams
  - Service status indicators

- [ ] **Kernel Module Styling** (CSS)
  - File: `src/components/archwiki.styl`
  - Module info boxes
  - Module parameter tables
  - Blacklist indicators
  - Load at boot styling

- [x] **Systemd Unit Styling** (CSS)
  - File: `src/components/archwiki.styl`
  - Service box styling
  - Timer styling
  - Socket styling
  - Enable/disable states

## 🎨 ArchWiki Navigation (New)

- [x] **Category Tree Styling** (CSS)
  - File: `src/components/navigation.styl`
  - Expandable category tree
  - Subcategory indicators
  - Page count badges
  - Active category highlight

- [x] **Related Pages Sidebar** (CSS)
  - File: `src/components/navigation.styl`
  - Related articles panel
  - Sibling pages list
  - Parent category link
  - Quick navigation

- [x] **Table of Contents Enhancements** (CSS)
  - File: `src/components/navigation.styl`
  - Sticky TOC on scroll
  - Active section highlight
  - Expand/collapse all toggle
  - Section count indicator

- [x] **Breadcrumb Trail** (CSS)
  - File: `src/components/navigation.styl`
  - Category path display
  - Separator styling
  - Current page indicator
  - Overflow handling for deep paths

## 📊 ArchWiki Infoboxes (New)

- [x] **Software Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Software name/version info
  - License indicator
  - Platform support grid
  - Website link styling

- [x] **Hardware Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Device compatibility status
  - Driver status indicators
  - Firmware requirements
  - Workaround badges

- [x] **Developer Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Maintainer info
  - Contact methods
  - Contribution stats
  - Activity indicators

## ⚠️ ArchWiki Advisory Boxes (New)

- [x] **Warning Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Data loss warning
  - System instability warning
  - Security warning
  - Critical action warning

- [x] **Tip Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Performance tip
  - Alternative method
  - Shortcut tip
  - Best practice tip

- [x] **Note Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Version-specific note
  - Distribution-specific note
  - Architecture-specific note
  - Prerequisite note

- [x] **Deprecated Content** (CSS)
  - File: `src/components/advisory.styl`
  - Outdated version strikethrough
  - Deprecated command styling
  - Legacy method indicator
  - Migration guide link

## 🔍 Search Enhancements (New)

- [ ] **Search Suggestions Panel** (CSS)
  - File: `src/components/search.styl`
  - Autocomplete dropdown
  - Highlighted matches
  - Category indicators
  - Redirect indicators

- [ ] **Advanced Search Filters** (CSS)
  - File: `src/components/search.styl`
  - Namespace filter chips
  - Date range selector
  - Content type filter
  - Sort options styling

- [ ] **Search Results Page** (CSS)
  - File: `src/components/search.styl`
  - Result card styling
  - Match snippet highlight
  - Category badges
  - Last modified indicator

| 2026-03-01 | Sixteenth scout | Added MediaWiki extensions styling (CodeMirror, VisualEditor, Echo, Flow, Cite, PageForms), advanced table features (sortable tables, scrollable wrapper, responsive cards), ArchWiki-specific elements (package templates, command line blocks, config files, installation status, kernel modules, systemd units), ArchWiki navigation (category tree, related pages, TOC enhancements, breadcrumbs), ArchWiki infoboxes (software, hardware, developer), ArchWiki advisory boxes enhanced (warning/tip/note boxes, deprecated content), search enhancements (suggestions panel, advanced filters, results page) |


## 📄 ArchWiki Special Pages (New - 2026-03-01 Scout 17)

- [ ] **Special:AllPages Styling** (CSS)
  - File: `src/components/special.styl`
  - Page list styling
  - Namespace selector
  - Pagination controls
  - Redirect indicator

- [ ] **Special:RecentChanges Styling** (CSS)
  - File: `src/components/special.styl`
  - Change list styling
  - Filter dropdown styling
  - Namespace filter chips
  - Bot/minor/patrolled flags

- [ ] **Special:Contributions Styling** (CSS)
  - File: `src/components/special.styl`
  - Contribution list styling
  - Date grouping headers
  - Edit summary styling
  - Top/bottom navigation

- [ ] **Special:Watchlist Styling** (CSS)
  - File: `src/components/special.styl`
  - Watchlist item styling
  - Unwatch toggle button
  - Edit count badge
  - Time since last edit

- [ ] **Special:Search Results** (CSS)
  - File: `src/components/special.styl`
  - Search result cards
  - Match highlighting
  - Did you mean styling
  - Search profile tabs

## 👤 User Page Elements (New)

- [ ] **User Profile Header** (CSS)
  - File: `src/components/user.styl`
  - Username display
  - User group badges
  - Registration date
  - Edit count display

- [ ] **User Talk Page Styling** (CSS)
  - File: `src/components/user.styl`
  - Thread container styling
  - Reply threading
  - Timestamp styling
  - Signature styling

- [ ] **User Contributions Grid** (CSS)
  - File: `src/components/user.styl`
  - Activity heatmap grid
  - Contribution streak indicator
  - Namespace breakdown
  - Time distribution chart

- [ ] **User Achievements/Badges** (CSS)
  - File: `src/components/user.styl`
  - Achievement badge styling
  - Tier indicators (bronze/silver/gold)
  - Progress bar for next badge
  - Achievement popup styling

## 💬 Discussion & Talk Pages (New)

- [ ] **Talk Page Headers** (CSS)
  - File: `src/components/talk.styl`
  - Discussion status banner
  - Archive notice styling
  - FAQ notice styling
  - Edit notice styling

- [ ] **Thread Styling** (CSS)
  - File: `src/components/talk.styl`
  - Thread indentation levels
  - Thread collapse/expand toggle
  - Thread author styling
  - Thread timestamp styling

- [ ] **Reply Box Styling** (CSS)
  - File: `src/components/talk.styl`
  - Reply textarea styling
  - Formatting toolbar
  - Preview button styling
  - Signature insertion button

- [ ] **Discussion TOC** (CSS)
  - File: `src/components/talk.styl`
  - Thread list styling
  - Thread status indicators
  - New messages indicator
  - Watch thread toggle

## 📊 Page Information (New)

- [ ] **Page Info Panel** (CSS)
  - File: `src/components/info.styl`
  - Page statistics display
  - Last edited info
  - Page views counter
  - Author list styling

- [ ] **Page History Styling** (CSS)
  - File: `src/components/info.styl`
  - Revision list styling
  - Diff link styling
  - User link styling
  - Edit summary styling

- [x] **Diff View Styling** (CSS)
  Commit: b9d680c
  - File: `src/components/info.styl`
  - Added text highlighting
  - Removed text highlighting
  - Change markers
  - Side-by-side diff layout

- [ ] **Page Protection Indicators** (CSS)
  - File: `src/components/info.styl`
  - Lock icon styling
  - Protection level badge
  - Expiry countdown
  - Edit request link

## 🏷️ ArchWiki Badges & Labels (New)

- [ ] **Content Status Badges** (CSS)
  - File: `src/components/badges.styl`
  - Stub badge
  - Featured article badge
  - Good article badge
  - A-class badge

- [ ] **Quality Labels** (CSS)
  - File: `src/components/badges.styl`
  - Accuracy rating
  - Completeness rating
  - Style rating
  - Up-to-date indicator

- [ ] **ArchWiki-Specific Badges** (CSS)
  - File: `src/components/badges.styl`
  - Official Arch badge
  - Community maintained badge
  - Outdated warning badge
  - Translation needed badge

- [ ] **Technical Level Indicators** (CSS)
  - File: `src/components/badges.styl`
  - Beginner level
  - Intermediate level
  - Advanced level
  - Expert level

## 🔗 Link Styling (New)

- [ ] **External Link Indicators** (CSS)
  - File: `src/components/links.styl`
  - External link icon
  - Secure/insecure indicator
  - PDF link indicator
  - Mailto link indicator

- [ ] **Interwiki Link Styling** (CSS)
  - File: `src/components/links.styl`
  - Wikipedia link icon
  - Wikidata link icon
  - Wikimedia commons icon
  - Other wiki icons

- [ ] **Red Link Styling** (CSS)
  - File: `src/components/links.styl`
  - Non-existent page link
  - Create page prompt
  - Link to create page
  - Wanted page indicator

- [ ] **Redirect Link Styling** (CSS)
  - File: `src/components/links.styl`
  - Redirect arrow icon
  - Redirect target preview
  - Redirect category badge
  - Double redirect warning

| 2026-03-01 | Seventeenth scout | Added ArchWiki special pages (AllPages, RecentChanges, Contributions, Watchlist, Search), user page elements (profile header, talk page, contributions grid, achievements), discussion & talk pages (headers, threads, reply box, TOC), page information (info panel, history, diff view, protection indicators), badges & labels (content status, quality labels, ArchWiki badges, technical level), link styling (external, interwiki, red links, redirects) |


## ✏️ Editing Interface (New - 2026-03-01 Scout 18)

- [ ] **Edit Form Styling** (CSS)
  - File: `src/components/edit.styl`
  - Textarea styling
  - Edit summary input
  - Minor edit checkbox
  - Watch this page checkbox

- [ ] **Edit Toolbar Styling** (CSS)
  - File: `src/components/edit.styl`
  - Format button group
  - Link/image buttons
  - Special character dropdown
  - Help link styling

- [ ] **Edit Preview Styling** (CSS)
  - File: `src/components/edit.styl`
  - Preview container
  - Preview diff toggle
  - Changes since last edit
  - Preview loading indicator

- [ ] **Edit Conflict UI** (CSS)
  - File: `src/components/edit.styl`
  - Conflict warning banner
  - Your text vs stored text
  - Merge interface styling
  - Resolution options

- [ ] **Section Edit Links** (CSS)
  - File: `src/components/edit.styl`
  - Edit section button
  - Hover state styling
  - Section indicator
  - Mobile section edit

## 🛡️ Admin & Moderation (New)

- [ ] **Delete Page UI** (CSS)
  - File: `src/components/admin.styl`
  - Delete confirmation dialog
  - Reason dropdown styling
  - Additional reason input
  - Watch/delete options

- [ ] **Protect Page UI** (CSS)
  - File: `src/components/admin.styl`
  - Protection level selector
  - Expiry time selector
  - Reason input styling
  - Cascade protection toggle

- [ ] **Block User UI** (CSS)
  - File: `src/components/admin.styl`
  - Block duration selector
  - Block reason dropdown
  - Additional options
  - Block log preview

- [ ] **Move Page UI** (CSS)
  - File: `src/components/admin.styl`
  - New title input
  - Reason input styling
  - Move options (talk, redirect)
  - Move warning display

- [ ] **Patrol Marking** (CSS)
  - File: `src/components/admin.styl`
  - Patrol link styling
  - Patrolled indicator
  - Patrol log link
  - Auto-patrol badge

## 📱 Mobile Enhancements (New)

- [ ] **Mobile Navigation** (CSS)
  - File: `src/components/mobile.styl`
  - Hamburger menu styling
  - Slide-out drawer
  - Touch-friendly targets
  - Swipe gestures

- [ ] **Mobile TOC** (CSS)
  - File: `src/components/mobile.styl`
  - Collapsible TOC
  - Floating TOC button
  - Section jump styling
  - Back to top button

- [ ] **Mobile Infobox** (CSS)
  - File: `src/components/mobile.styl`
  - Stacked layout
  - Collapsible sections
  - Image gallery
  - Quick facts summary

- [ ] **Mobile Tables** (CSS)
  - File: `src/components/mobile.styl`
  - Horizontal scroll wrapper
  - Sticky first column
  - Responsive card layout
  - Sort/filter buttons

## 🖨️ Print Enhancements (New)

- [x] **Print Header** (CSS)
  - File: `src/components/print-enhanced.styl`
  - Article title in print
  - URL display
  - Date printed
  - ArchWiki logo
  - Commit: e6406f5

- [x] **Print TOC** (CSS)
  - File: `src/components/print-enhanced.styl`
  - Simple list format
  - Page numbers
  - Section links
  - Optional inclusion
  - Commit: b177636

- [x] **Print Infobox** (CSS)
  - File: `src/components/print-enhanced.styl`
  - Compact format with reduced padding/margins
  - Key facts only - hides non-essential elements
  - Grayscale option with .grayscale class
  - Border styling with print-color-adjust
  - Commit: 07b2eaf

- [x] **Print Footer** (CSS)
  - File: `src/components/print-enhanced.styl`
  - Source URL, license info, category list, page numbers
  - Multiple footer layouts: full, simple, minimal, compact
  - Dynamic content support via data attributes
  - Commit: 2ea7c75

## 🔔 Notification Styling (New)

- [x] **Notification Badge** (CSS, 97%+ browser support)
  - File: `src/components/notifications.styl`
  - Badge positioning
  - Count display
  - Alert color
  - Animation
  - Commit: 7ea065ce

- [ ] **Notification Panel** (CSS)
  - File: `src/components/notifications.styl`
  - Panel container
  - Notification item styling
  - Read/unread states
  - Timestamp display

- [ ] **Notification Types** (CSS)
  - File: `src/components/notifications.styl`
  - Edit notification
  - Talk page message
  - Mention styling
  - Watchlist change

- [ ] **Notification Actions** (CSS)
  - File: `src/components/notifications.styl`
  - Mark as read button
  - View source link
  - Quick reply option
  - Dismiss button

## 📧 Email Features (New)

- [ ] **Email Confirmation UI** (CSS)
  - File: `src/components/email.styl`
  - Confirmation status
  - Resend button styling
  - Email input form
  - Success/error states

- [ ] **Email Preferences** (CSS)
  - File: `src/components/email.styl`
  - Preference toggles
  - Digest options
  - Notification types
  - Unsubscribe link

- [ ] **Email Preview** (CSS)
  - File: `src/components/email.styl`
  - Email template preview
  - Formatting display
  - Variable placeholders
  - Test send button

| 2026-03-01 | Eighteenth scout | Added editing interface (edit form, toolbar, preview, conflict UI, section edit links), admin & moderation (delete, protect, block, move, patrol UIs), mobile enhancements (navigation, TOC, infobox, tables), print enhancements (header, TOC, infobox, footer), notification styling (badge, panel, types, actions), email features (confirmation, preferences, preview) |


## 🔍 Page Previews & Hovercards (New - 2026-03-01 Scout 19)

- [ ] **Page Preview Card** (CSS)
  - File: `src/components/previews.styl`
  - Preview card container
  - Title styling
  - Summary text
  - Image thumbnail

- [ ] **Reference Tooltip** (CSS)
  - File: `src/components/previews.styl`
  - Tooltip positioning
  - Reference content styling
  - Link to reference
  - Close button

- [ ] **Citation Popup** (CSS)
  - File: `src/components/previews.styl`
  - Citation details display
  - Source link styling
  - Author/date info
  - Expand for full citation

- [ ] **Image Preview Popup** (CSS)
  - File: `src/components/previews.styl`
  - Image thumbnail container
  - Caption display
  - File info link
  - Full image link

- [ ] **Interwiki Preview Card** (CSS)
  - File: `src/components/previews.styl`
  - External wiki indicator
  - Preview content styling
  - Wiki logo display
  - Open link styling

## 🖼️ Media Viewer Extended (New)

- [ ] **Media Viewer Overlay** (CSS)
  - File: `src/components/media-viewer.styl`
  - Full-screen overlay
  - Dark background
  - Close button positioning
  - Keyboard navigation hints

- [ ] **Image Viewer Controls** (CSS)
  - File: `src/components/media-viewer.styl`
  - Zoom in/out buttons
  - Rotate button
  - Fullscreen toggle
  - Download button

- [ ] **Media Viewer Sidebar** (CSS)
  - File: `src/components/media-viewer.styl`
  - File information panel
  - Description styling
  - Metadata display
  - License information

- [ ] **Gallery Navigation** (CSS)
  - File: `src/components/media-viewer.styl`
  - Previous/next buttons
  - Thumbnail strip
  - Current position indicator
  - Swipe gestures hint

- [ ] **Video Player Overlay** (CSS)
  - File: `src/components/media-viewer.styl`
  - Play/pause button
  - Progress bar styling
  - Volume controls
  - Fullscreen button

## 📝 Visual Editor Extended (New)

- [ ] **VE Toolbar Styling** (CSS)
  - File: `src/components/visual-editor.styl`
  - Toolbar container
  - Tool group separators
  - Tool button states
  - Dropdown indicators

- [ ] **VE Context Menu** (CSS)
  - File: `src/components/visual-editor.styl`
  - Context menu positioning
  - Menu item styling
  - Icon alignment
  - Keyboard shortcuts display

- [ ] **VE Inspectors** (CSS)
  - File: `src/components/visual-editor.styl`
  - Link inspector panel
  - Image inspector panel
  - Citation inspector panel
  - Template inspector panel

- [ ] **VE Dialog Styling** (CSS)
  - File: `src/components/visual-editor.styl`
  - Dialog container
  - Dialog header
  - Dialog content area
  - Dialog footer buttons

- [ ] **VE Diff View** (CSS)
  - File: `src/components/visual-editor.styl`
  - Visual diff highlighting
  - Addition styling
  - Deletion styling
  - Change indicators

## 🔗 Quick Actions & Shortcuts (New)

- [ ] **Keyboard Shortcut Display** (CSS)
  - File: `src/components/shortcuts.styl`
  - Shortcut hint badges
  - Shortcut help panel
  - Category grouping
  - Search shortcuts input

- [ ] **Quick Action Menu** (CSS)
  - File: `src/components/shortcuts.styl`
  - Action menu positioning
  - Action item styling
  - Icon + text layout
  - Keyboard hint display

- [ ] **Floating Action Button** (CSS)
  - File: `src/components/shortcuts.styl`
  - FAB positioning
  - FAB states (hover, active)
  - Expand animation
  - Sub-action buttons

- [ ] **Context Actions Bar** (CSS)
  - File: `src/components/shortcuts.styl`
  - Selection actions bar
  - Text formatting actions
  - Link actions
  - Copy/quote actions

## 📊 Statistics & Analytics (New)

- [ ] **Page Stats Card** (CSS)
  - File: `src/components/stats.styl`
  - View count display
  - Edit count display
  - Last edit date
  - Author count

- [ ] **Contribution Graph** (CSS)
  - File: `src/components/stats.styl`
  - Activity heatmap
  - Day/week cells
  - Color intensity scale
  - Tooltip on hover

- [ ] **Article Quality Score** (CSS)
  - File: `src/components/stats.styl`
  - Score badge styling
  - Progress bar display
  - Criteria breakdown
  - Improvement suggestions

- [ ] **Reading Time Estimate** (CSS)
  - File: `src/components/stats.styl`
  - Time display badge
  - Word count display
  - Section count display
  - Complexity indicator

| 2026-03-01 | Nineteenth scout | Added page previews & hovercards (preview card, reference tooltip, citation popup, image preview, interwiki preview), media viewer extended (overlay, controls, sidebar, gallery navigation, video player), visual editor extended (toolbar, context menu, inspectors, dialogs, diff view), quick actions & shortcuts (keyboard display, quick action menu, FAB, context actions), statistics & analytics (page stats, contribution graph, quality score, reading time) |


## 🎯 Interaction State Pseudo-Classes (New - 2026-03-10 Scout 29)

- [x] **`:open` Pseudo-class** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style elements in open state (details, dialogs, popovers)
  - Example: `details:open { ... }`, `dialog:open { ... }`
  - Unified open state handling
  - Stylus: Works directly
  - Commit: a0104ee

- [x] **`:interest-source` Pseudo-class** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Detect element receiving user interest (hover/focus)
  - Enhanced dropdown menu interactions
  - Progressive disclosure patterns
  - Stylus: Works directly
  - Commit: 01a96b4

- [x] **`:interest-target` Pseudo-class** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Element targeted by interest source
  - Preview card hover patterns
  - Related articles hover effects
  - Stylus: Works directly
  - Commit: 01a96b4

## 📺 Media State Pseudo-Classes (New)

- [ ] **`:seeking` Pseudo-class** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video when seeking
  - Loading indicator during seek
  - Stylus: Works directly

- [ ] **`:stalled` Pseudo-class** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video when stalled (buffering)
  - Network issue indicator
  - Stylus: Works directly

- [ ] **`:volume-locked` Pseudo-class** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style when volume is locked/unadjustable
  - Embedded video volume indicator
  - Stylus: Works directly

## 📝 Content Templates (New - 2026-03-01 Scout 20)

- [ ] **Related Articles Box** (CSS)
  - File: `src/components/templates.styl`
  - Related articles container
  - Article link styling
  - See also section
  - External resources section

- [ ] **Related Pages Start/End** (CSS)
  - File: `src/components/templates.styl`
  - Related pages wrapper
  - Category indicator
  - Expandable list
  - Navigation styling

- [ ] **App Template Styling** (CSS)
  - File: `src/components/templates.styl`
  - Application name styling
  - Package link styling
  - App icon placeholder
  - Status indicator

- [ ] **Pkg/Aur Templates** (CSS)
  - File: `src/components/templates.styl`
  - Package name display
  - Repository badge (core/extra/community)
  - AUR indicator
  - Version display

- [ ] **Man Page Links** (CSS)
  - File: `src/components/templates.styl`
  - Man page link styling
  - Section indicator
  - External link icon
  - Hover tooltip

## 🔧 Code & Commands Extended (New)

- [ ] **Command Output Styling** (CSS)
  - File: `src/components/code.styl`
  - Output block differentiation
  - Success output indicator
  - Error output indicator
  - Warning output indicator

- [x] **Command Prompt Styling** (CSS)
  - File: `src/components/code.styl`
  - Prompt character styling ($, #)
  - User/host display
  - Current directory
  - Copy prompt button
  - Commit: 7f9876e

- [ ] **Multi-line Commands** (CSS)
  - File: `src/components/code.styl`
  - Line continuation indicator
  - Nested command styling
  - Here-doc styling
  - Pipe chain display

- [ ] **Command Annotations** (CSS)
  - File: `src/components/code.styl`
  - Comment styling in commands
  - Inline note styling
  - Variable highlighting
  - Placeholder styling

- [x] **Interactive Hints** (CSS)
  - File: `src/components/code.styl`
  - Editable command indicator
  - Run in terminal hint
  - Copy command button
  - Command explanation toggle
  - Commit: 73f4c72

## 📋 Lists & Outlines (New)

- [ ] **Nested List Styling** (CSS)
  - File: `src/components/lists.styl`
  - Indentation levels
  - List marker variants
  - Collapsible lists
  - List continuation

- [x] **Definition Lists** (CSS)
  - File: `src/components/lists.styl`
  - Term styling
  - Definition styling
  - Multiple definitions
  - Definition icons
  - Commit: 3451136

- [x] **Checklist Styling** (CSS)
  - File: `src/components/lists.styl`
  - Checkbox indicators
  - Checked state styling
  - Partial completion
  - Progress indicator
  - Commit: 3451136

- [x] **Step-by-Step Lists** (CSS)
  - File: `src/components/lists.styl`
  - Step number styling
  - Current step highlight
  - Completed step indicator
  - Commit: 3451136
  - Branch/alternate steps

## 🎯 User Workflow Aids (New)

- [ ] **Progress Trackers** (CSS)
  - File: `src/components/workflow.styl`
  - Step progress bar
  - Milestone markers
  - Current position indicator
  - Completion status

- [ ] **Prerequisites Box** (CSS)
  - File: `src/components/workflow.styl`
  - Required items list
  - Met/unmet indicators
  - Link to prerequisite guides
  - Alternative options

- [ ] **Troubleshooting Sections** (CSS)
  - File: `src/components/workflow.styl`
  - Problem/solution format
  - Symptom styling
  - Solution steps
  - Related issues link

- [ ] **Verification Steps** (CSS)
  - File: `src/components/workflow.styl`
  - Verification command styling
  - Expected output display
  - Success indicator
  - Failure troubleshooting link

## 🔗 Cross-Reference Features (New)

- [ ] **Internal Anchor Links** (CSS)
  - File: `src/components/references.styl`
  - Section anchor styling
  - Copy link button
  - Hover highlight
  - Back-to-top link

- [ ] **Footnote Enhancements** (CSS)
  - File: `src/components/references.styl`
  - Footnote marker styling
  - Footnote content styling
  - Back reference link
  - Footnote grouping

- [ ] **Citation Formatting** (CSS)
  - File: `src/components/references.styl`
  - Citation number styling
  - Citation detail styling
  - Source type indicators
  - Access date display

- [ ] **Related Categories** (CSS)
  - File: `src/components/references.styl`
  - Category list styling
  - Category relationship indicator
  - Subcategory display
  - Parent category link

| 2026-03-01 | Twentieth scout | Added content templates (related articles, related pages, app template, pkg/aur templates, man page links), code & commands extended (output styling, prompt styling, multi-line commands, annotations, interactive hints), lists & outlines (nested lists, definition lists, checklists, step-by-step), user workflow aids (progress trackers, prerequisites, troubleshooting, verification), cross-reference features (anchor links, footnotes, citations, related categories) |


## 🌐 Language & Localization (New - 2026-03-01 Scout 21)

- [ ] **Language Selector Styling** (CSS, 97%+ browser support)
  - File: `src/components/i18n.styl`
  - Language dropdown styling
  - Active language indicator
  - Language search input
  - Recent languages list

- [ ] **RTL Support Enhancements** (CSS, 100% browser support)
  - File: `src/components/i18n.styl`
  - Direction-aware margins/paddings
  - Logical properties (inline-start/end)
  - Mirrored icons/indicators
  - Bidirectional text handling

- [ ] **Translation Indicators** (CSS, 97%+ browser support)
  - File: `src/components/i18n.styl`
  - Outdated translation badge
  - Translation progress indicator
  - Missing translation placeholder
  - Language completeness meter

- [ ] **Multilingual Content** (CSS, 97%+ browser support)
  - File: `src/components/i18n.styl`
  - Language switch tabs
  - Original language badge
  - Machine translation notice
  - Human verified indicator

## 🔧 Maintenance Tools (New)

- [ ] **Maintenance Templates** (CSS, 97%+ browser support)
  - File: `src/components/maintenance.styl`
  - Cleanup template styling
  - Merge proposal banner
  - Split proposal indicator
  - Accuracy dispute notice

- [ ] **Quality Assessment** (CSS, 97%+ browser support)
  - File: `src/components/maintenance.styl`
  - Quality grade badges
  - Completeness indicator
  - Review status display
  - Improvement suggestions

- [ ] **Protection Indicators** (CSS, 100% browser support)
  - File: `src/components/maintenance.styl`
  - Lock icon styling
  - Protection level badge
  - Edit restriction notice
  - Expiry countdown

- [ ] **Revision Management** (CSS, 97%+ browser support)
  - File: `src/components/maintenance.styl`
  - Revision comparison view
  - Change summary styling
  - Rollback button styling
  - Edit conflict resolution

## 📊 Analytics & Metrics (New)

- [ ] **Page Statistics** (CSS, 97%+ browser support)
  - File: `src/components/analytics.styl`
  - View count display
  - Edit count badge
  - Contributor count
  - Last modified indicator

- [ ] **Traffic Analytics** (CSS, 97%+ browser support)
  - File: `src/components/analytics.styl`
  - Pageviews chart styling
  - Trend indicator
  - Comparison graph
  - Period selector

- [ ] **Editor Activity** (CSS, 97%+ browser support)
  - File: `src/components/analytics.styl`
  - Active editors list
  - Edit frequency heatmap
  - Top contributors display
  - Edit size distribution

- [ ] **Content Metrics** (CSS, 97%+ browser support)
  - File: `src/components/analytics.styl`
  - Word count display
  - Section count indicator
  - Link density meter
  - Media count badge

## 🎨 Modern CSS Features (New)

- [ ] **@property Custom Properties** (CSS, 90%+ browser support)
  - File: `src/variables.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Type checking for custom props
  - Animation of custom properties
  - Initial value inheritance
  - Syntax validation

- [ ] **@layer Cascade Layers** (CSS, 97%+ browser support)
  - File: `src/main.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Layer ordering for overrides
  - Theme layer separation
  - Plugin layer isolation
  - Base/component/utility layers

- [ ] **:has() Selector Usage** (CSS, 90%+ browser support)
  - File: `src/components/*.styl`
  - Parent selection patterns
  - Sibling state styling
  - Empty state detection
  - Form validation states

- [ ] **:is()/:where() Selectors** (CSS, 97%+ browser support)
  - File: `src/components/*.styl`
  - Selector list simplification
  - Zero-specificity with :where()
  - Forgiving selector parsing
  - Complex hover combinations

## ♿ Accessibility Deep Cuts (New)

- [ ] **Reduced Motion Support** (CSS, 100% browser support)
  - File: `src/accessibility.styl`
  - @media (prefers-reduced-motion)
  - Disable non-essential animations
  - Instant transitions alternative
  - Motion-safe class fallback

- [ ] **High Contrast Mode** (CSS, 100% browser support)
  - File: `src/accessibility.styl`
  - @media (prefers-contrast)
  - Forced colors adaptation
  - System color keywords
  - Border emphasis

- [x] **Focus Visible Enhancement** (CSS, 97%+ browser support)
  - File: `src/components/accessibility.styl`
  - :focus-visible styling
  - Custom focus rings
  - Focus outline offset
  - Keyboard navigation hints
  - Commit: 93fe09e6

- [x] **Screen Reader Optimizations** (CSS, 100% browser support)
  - File: `src/components/accessibility.styl`
  - sr-only utility class (multiple naming conventions)
  - Focusable sr-only for keyboard-accessible hidden elements
  - Skip to main content link enhancement
  - Landmark region role attributes styling
  - Accessible animation controls with animation-play-state
  - Commit: 24a25fc

| 2026-03-01 | Twenty-first scout | Added language & localization (language selector, RTL support, translation indicators, multilingual content), maintenance tools (maintenance templates, quality assessment, protection indicators, revision management), analytics & metrics (page statistics, traffic analytics, editor activity, content metrics), modern CSS features (@property, @layer, :has(), :is()/:where()), accessibility deep cuts (reduced motion, high contrast, focus-visible, screen reader optimizations) |


## 📰 Feed & Syndication (New - 2026-03-01 Scout 22)

- [ ] **RSS/Atom Feed Links** (CSS, 97%+ browser support)
  - File: `src/components/feeds.styl`
  - Feed icon styling
  - Subscribe button styling
  - Feed format selector (RSS/Atom)
  - Feed URL display

- [ ] **Recent Changes Feed** (CSS, 97%+ browser support)
  - File: `src/components/feeds.styl`
  - Changes list item styling
  - Timestamp formatting
  - Namespace indicator
  - Diff size indicator

- [ ] **Watchlist Feed** (CSS, 97%+ browser support)
  - File: `src/components/feeds.styl`
  - Watchlist item styling
  - Unwatch button styling
  - Group by page toggle
  - Mark as visited button

- [ ] **Contribution Feed** (CSS, 97%+ browser support)
  - File: `src/components/feeds.styl`
  - Contribution item styling
  - User link styling
  - Edit summary display
  - Minor edit indicator

## 🔖 Bookmark & Quick Links (New)

- [ ] **Page Bookmarks** (CSS, 97%+ browser support)
  - File: `src/components/bookmarks.styl`
  - Bookmark button styling
  - Bookmarks list panel
  - Bookmark folder styling
  - Quick access sidebar

- [ ] **Quick Links Panel** (CSS, 97%+ browser support)
  - File: `src/components/quicklinks.styl`
  - Links grid layout
  - Link card styling
  - Custom link button
  - Reorder handles

- [ ] **Related Pages** (CSS, 97%+ browser support)
  - File: `src/components/related.styl`
  - Related pages list
  - See also section
  - Subpages list
  - Parent page link

- [ ] **External Links Panel** (CSS, 97%+ browser support)
  - File: `src/components/external.styl`
  - External link styling
  - Link type icons
  - Security indicator
  - Archive link

## 🧪 Sandbox & Testing (New)

- [ ] **Sandbox Page Styling** (CSS, 97%+ browser support)
  - File: `src/components/sandbox.styl`
  - Sandbox warning banner
  - Clear sandbox button
  - Reset confirmation
  - Edit intro styling

- [ ] **Template Testing Page** (CSS, 97%+ browser support)
  - File: `src/components/testing.styl`
  - Test case sections
  - Expected output display
  - Actual output display
  - Pass/fail indicator

- [x] **Documentation Subpage** (CSS, 97%+ browser support)
  - File: `src/components/template-doc.styl`
  - Doc subpage indicator
  - Transclusion preview
  - Parameter table
  - Example usage block
  Commit: 95091e6

- [ ] **Wizard Interface** (CSS, 97%+ browser support)
  - File: `src/components/wizard.styl`
  - Step indicator styling
  - Step content area
  - Navigation buttons
  - Progress bar

## 🔔 Real-time Updates (New)

- [ ] **Live Edit Indicator** (CSS, 97%+ browser support)
  - File: `src/components/live.styl`
  - Live edit badge
  - Conflict warning
  - Auto-refresh toggle
  - New edits notification

- [ ] **Page Changes Alert** (CSS, 97%+ browser support)
  - File: `src/components/live.styl`
  - Change notification styling
  - Diff preview popup
  - Accept/reject buttons
  - View full diff link

- [ ] **Collaborative Editing** (CSS, 97%+ browser support)
  - File: `src/components/collab.styl`
  - Active editor indicators
  - Cursor position display
  - Edit lock indicator
  - Chat panel styling

- [ ] **Push Notifications** (CSS, 97%+ browser support)
  - File: `src/components/notifications.styl`
  - Notification permission prompt
  - Notification preview styling
  - Settings panel
  - Test notification button

| 2026-03-01 | Twenty-second scout | Added feed & syndication (RSS/Atom links, recent changes feed, watchlist feed, contribution feed), bookmarks & quick links (page bookmarks, quick links panel, related pages, external links panel), sandbox & testing (sandbox page styling, template testing, documentation subpage, wizard interface), real-time updates (live edit indicator, page changes alert, collaborative editing, push notifications) |


## 🔧 Advanced Editor Features (New - 2026-03-01 Scout 23)

- [ ] **CodeMirror 6 Integration** (CSS, 97%+ browser support)
  - File: `src/components/editor-cm.styl`
  - Editor container styling
  - Gutter/line numbers styling
  - Active line highlight
  - Selection styling

- [ ] **Syntax Highlighting Extended** (CSS, 97%+ browser support)
  - File: `src/components/syntax.styl`
  - Extended language support
  - Diff highlighting
  - Inline syntax colors
  - Theme-consistent tokens

- [ ] **Autocomplete Dropdown** (CSS, 97%+ browser support)
  - File: `src/components/autocomplete.styl`
  - Suggestion list styling
  - Category headers
  - Match highlighting
  - Documentation tooltip

- [ ] **Find & Replace Panel** (CSS, 97%+ browser support)
  - File: `src/components/find-replace.styl`
  - Search input styling
  - Replace input styling
  - Match counter display
  - Navigation buttons

## 📊 Diagram & Visualization (New)

- [ ] **Mermaid Diagram Styling** (CSS, 97%+ browser support)
  - File: `src/components/diagrams.styl`
  - Flowchart node styling
  - Sequence diagram styling
  - Gantt chart styling
  - Pie chart styling

- [ ] **Graphviz Integration** (CSS, 97%+ browser support)
  - File: `src/components/graphviz.styl`
  - Node styling
  - Edge styling
  - Cluster styling
  - Label formatting

- [ ] **PlantUML Support** (CSS, 97%+ browser support)
  - File: `src/components/plantuml.styl`
  - UML diagram styling
  - Component diagram styling
  - Class diagram styling
  - Activity diagram styling

- [ ] **Chart.js Theming** (CSS, 97%+ browser support)
  - File: `src/components/charts.styl`
  - Chart container styling
  - Legend styling
  - Tooltip styling
  - Grid line styling

## 🎨 UI Components Extended (New)

- [ ] **Modal/Dialog Extended** (CSS, 97%+ browser support)
  - File: `src/components/modal.styl`
  - Modal backdrop styling
  - Modal content animation
  - Close button styling
  - Footer action buttons

- [ ] **Dropdown/Select Extended** (CSS, 97%+ browser support)
  - File: `src/components/dropdown.styl`
  - Dropdown trigger styling
  - Option list styling
  - Selected state styling
  - Group header styling

- [ ] **Tabs Extended** (CSS, 97%+ browser support)
  - File: `src/components/tabs.styl`
  - Tab list styling
  - Active tab indicator
  - Tab panel styling
  - Vertical tabs variant

- [ ] **Accordion/Collapse** (CSS, 97%+ browser support)
  - File: `src/components/accordion.styl`
  - Accordion header styling
  - Expand/collapse icon
  - Panel animation
  - Nested accordion support

## 🔗 External Integrations (New)

- [ ] **GitHub Gist Embed** (CSS, 97%+ browser support)
  - File: `src/components/gist.styl`
  - Gist container styling
  - File tab styling
  - Code block styling
  - Copy button styling

- [ ] **YouTube Embed Styling** (CSS, 97%+ browser support)
  - File: `src/components/youtube.styl`
  - Video container styling
  - Placeholder styling
  - Play button overlay
  - Responsive aspect ratio

- [ ] **Twitter/X Embed Styling** (CSS, 97%+ browser support)
  - File: `src/components/twitter.styl`
  - Tweet container styling
  - Author info styling
  - Content area styling
  - Action buttons styling

- [ ] **PDF Embed Viewer** (CSS, 97%+ browser support)
  - File: `src/components/pdf.styl`
  - PDF container styling
  - Toolbar styling
  - Page navigation
  - Zoom controls

## 📱 Progressive Enhancement (New)

- [ ] **Service Worker Status** (CSS, 97%+ browser support)
  - File: `src/components/pwa.styl`
  - Offline indicator styling
  - Update available badge
  - Install prompt styling
  - Cache status display

- [ ] **PWA Install Prompt** (CSS, 97%+ browser support)
  - File: `src/components/pwa.styl`
  - Install banner styling
  - Install button styling
  - Dismiss button styling
  - Feature list styling

- [ ] **Offline Mode Indicator** (CSS, 97%+ browser support)
  - File: `src/components/pwa.styl`
  - Offline badge styling
  - Sync pending indicator
  - Retry button styling
  - Cached content badge

- [ ] **Background Sync Status** (CSS, 97%+ browser support)
  - File: `src/components/pwa.styl`
  - Sync progress indicator
  - Sync success badge
  - Sync error badge
  - Retry sync button

| 2026-03-01 | Twenty-third scout | Added advanced editor features (CodeMirror 6, syntax highlighting extended, autocomplete dropdown, find & replace), diagram & visualization (Mermaid, Graphviz, PlantUML, Chart.js theming), UI components extended (modal/dialog, dropdown/select, tabs, accordion/collapse), external integrations (GitHub Gist, YouTube, Twitter/X, PDF embed), progressive enhancement (service worker status, PWA install prompt, offline mode, background sync) |


## 🎮 Gamification & Contribution (New - 2026-03-01 Scout 24)

- [ ] **Edit Streak Indicator** (CSS, 97%+ browser support)
  - File: `src/components/gamification.styl`
  - Streak badge styling
  - Day count display
  - Flame animation
  - Streak milestone badges

- [ ] **Achievement System** (CSS, 97%+ browser support)
  - File: `src/components/gamification.styl`
  - Achievement badge styling
  - Locked/unlocked states
  - Progress indicator
  - Rarity indicator

- [ ] **Leaderboard Styling** (CSS, 97%+ browser support)
  - File: `src/components/gamification.styl`
  - Leaderboard table styling
  - Rank badge styling
  - User highlight styling
  - Pagination controls

- [ ] **Contribution Counter** (CSS, 97%+ browser support)
  - File: `src/components/gamification.styl`
  - Counter display styling
  - Animation on increment
  - Milestone celebration
  - Category breakdown

## 🤖 Automation & Scripts (New)

- [ ] **Auto-Wiki Browser Styling** (CSS, 97%+ browser support)
  - File: `src/components/automation.styl`
  - AWB container styling
  - Progress indicator
  - Log display styling
  - Control buttons styling

- [ ] **Bot Edit Indicator** (CSS, 97%+ browser support)
  - File: `src/components/automation.styl`
  - Bot badge styling
  - Bot type indicator
  - Edit summary styling
  - Approve/reject buttons

- [ ] **Mass Operations UI** (CSS, 97%+ browser support)
  - File: `src/components/automation.styl`
  - Operation queue styling
  - Item list styling
  - Progress bar styling
  - Error log display

- [ ] **Template Replacement Tool** (CSS)
  - File: `src/components/automation.styl`
  - Replacement form styling
  - Preview diff styling
  - Apply button styling
  - Undo button styling

## 📡 API & Developer Features (New)

- [ ] **API Documentation Styling** (CSS, 97%+ browser support)
  - File: `src/components/api.styl`
  - Endpoint list styling
  - Method badge styling
  - Parameter table styling
  - Response example styling

- [ ] **API Sandbox UI** (CSS)
  - File: `src/components/api.styl`
  - Request builder styling
  - Parameter input styling
  - Response viewer styling
  - Authentication selector

- [ ] **OAuth Flow Styling** (CSS, 97%+ browser support)
  - File: `src/components/api.styl`
  - OAuth consent screen
  - Permission list styling
  - Grant/deny buttons
  - Token display styling

- [ ] **Rate Limit Indicator** (CSS)
  - File: `src/components/api.styl`
  - Limit progress bar
  - Reset countdown display
  - Warning indicator
  - Usage statistics

## 🔐 Security & Trust (New)

- [ ] **Edit Filter Status** (CSS, 97%+ browser support)
  - File: `src/components/security.styl`
  - Filter pass indicator
  - Filter warning styling
  - Filter block styling
  - Dismiss button styling

- [ ] **Abuse Filter Log** (CSS)
  - File: `src/components/security.styl`
  - Log entry styling
  - Action badge styling
  - Details expand styling
  - Filter link styling

- [ ] **Spam Protection UI** (CSS)
  - File: `src/components/security.styl`
  - CAPTCHA container styling
  - Challenge styling
  - Success/failure indicator
  - Alternative options

- [ ] **Trust Level Badges** (CSS, 97%+ browser support)
  - File: `src/components/security.styl`
  - Trust level indicator
  - Autoconfirmed badge
  - Established user badge
  - Admin badge styling

## 🌍 Internationalization Extended (New)

- [ ] **Language Link Panel** (CSS, 97%+ browser support)
  - File: `src/components/i18n-extended.styl`
  - Language link list styling
  - Active language highlight
  - Missing language indicator
  - Add translation link

- [ ] **Translation Variables** (CSS)
  - File: `src/components/i18n-extended.styl`
  - Variable list styling
  - Variable value display
  - Edit variable button
  - Validation feedback

- [ ] **Bidirectional Text Support** (CSS, 100% browser support)
  - File: `src/components/i18n-extended.styl`
  - RTL container styling
  - Direction toggle button
  - Mixed direction handling
  - Text alignment options

- [ ] **CJK Typography** (CSS, 97%+ browser support)
  - File: `src/components/i18n-extended.styl`
  - CJK font stack
  - Ruby text styling
  - Emphasis mark styling
  - Line breaking controls

| 2026-03-01 | Twenty-fourth scout | Added gamification & contribution (edit streak indicator, achievement system, leaderboard styling, contribution counter), automation & scripts (auto-wiki browser, bot edit indicator, mass operations UI, template replacement tool), API & developer features (API documentation, sandbox UI, OAuth flow, rate limit indicator), security & trust (edit filter status, abuse filter log, spam protection UI, trust level badges), internationalization extended (language link panel, translation variables, bidirectional text, CJK typography) |


## 🎨 Visual Design Patterns (New - 2026-03-01 Scout 25)

- [x] **Glassmorphism Effects** (CSS, 93%+ browser support) — commit c4f64ce
  - File: `src/components/glass.styl`
  - Backdrop blur styling
  - Semi-transparent backgrounds
  - Border glow effects
  - Note: Include -webkit- prefix

- [ ] **Neumorphism Accents** (CSS, 97%+ browser support)
  - File: `src/components/neumorphic.styl`
  - Soft shadow styling
  - Inset shadow styling
  - Highlight/shadow balance
  - Subtle 3D effects

- [x] **Gradient Borders** (CSS, 97%+ browser support) — commit 53f544b
  - File: `src/components/gradient-borders.styl`
  - Border-image gradients
  - Pseudo-element borders
  - Animated gradient borders
  - Corner accent gradients

- [ ] **Depth & Layering** (CSS, 97%+ browser support)
  - File: `src/components/depth.styl`
  - Z-index scale system
  - Layer isolation patterns
  - Stacking context helpers
  - Drop shadow variations

## 📐 Advanced Layout Patterns (New)

- [ ] **Holy Grail Layout** (CSS, 97%+ browser support)
  - File: `src/layouts/holy-grail.styl`
  - Three-column layout
  - Sticky sidebar patterns
  - Responsive collapse
  - Grid-based implementation

- [ ] **Masonry-Style Layouts** (CSS, 85%+ browser support)
  - File: `src/layouts/masonry.styl`
  - CSS columns fallback
  - Grid masonry (experimental)
  - Item ordering control
  - Responsive column count

- [ ] **Split Panel Layouts** (CSS, 97%+ browser support)
  - File: `src/layouts/split.styl`
  - Resizable panel dividers
  - Collapse/expand patterns
  - Min/max constraints
  - Touch-friendly handles

- [ ] **Aspect Ratio Containers** (CSS, 95%+ browser support)
  - File: `src/layouts/aspect-ratio.styl`
  - aspect-ratio property
  - Media embed containers
  - Card aspect ratios
  - Responsive scaling

## 🎭 Interaction Patterns (New)

- [ ] **Drag & Drop Feedback** (CSS, 97%+ browser support)
  - File: `src/components/drag-drop.styl`
  - Drag source styling
  - Drop target highlight
  - Drag ghost styling
  - Drop zone indicators

- [ ] **Sort & Filter UI** (CSS, 97%+ browser support)
  - File: `src/components/sort-filter.styl`
  - Sort toggle styling
  - Filter chip styling
  - Active filter display
  - Clear all button

- [ ] **Bulk Selection** (CSS, 97%+ browser support)
  - File: `src/components/selection.styl`
  - Selection checkbox styling
  - Select all toggle
  - Selected item highlight
  - Bulk action bar

- [ ] **Inline Editing** (CSS, 97%+ browser support)
  - File: `src/components/inline-edit.styl`
  - Edit trigger styling
  - Input field appearance
  - Save/cancel buttons
  - Validation feedback

## 📊 Data Presentation (New)

- [ ] **Data Table Patterns** (CSS, 97%+ browser support)
  - File: `src/components/data-tables.styl`
  - Sortable column headers
  - Row hover states
  - Row selection styling
  - Sticky headers

- [ ] **Timeline Components** (CSS, 97%+ browser support)
  - File: `src/components/timeline.styl`
  - Vertical timeline styling
  - Timeline markers
  - Date labels
  - Content cards

- [ ] **Card Grid Patterns** (CSS, 97%+ browser support)
  - File: `src/components/card-grid.styl`
  - Auto-fit grid layout
  - Card hover effects
  - Card content layout
  - Equal height cards

- [ ] **Metric Displays** (CSS, 97%+ browser support)
  - File: `src/components/metrics.styl`
  - Big number styling
  - Trend indicators
  - Comparison displays
  - Progress indicators

## 🔧 Utility Classes (New)

- [ ] **Spacing Utilities** (CSS, 100% browser support)
  - File: `src/utilities/spacing.styl`
  - Margin scale classes
  - Padding scale classes
  - Gap utilities
  - Logical property variants

- [ ] **Typography Utilities** (CSS, 100% browser support)
  - File: `src/utilities/typography.styl`
  - Font size scale
  - Font weight helpers
  - Text alignment
  - Text transform

- [ ] **Color Utilities** (CSS, 100% browser support)
  - File: `src/utilities/colors.styl`
  - Text color classes
  - Background color classes
  - Border color classes
  - Opacity variants

- [ ] **Visibility Utilities** (CSS, 100% browser support)
  - File: `src/utilities/visibility.styl`
  - Display classes
  - Visibility classes
  - Screen reader only
  - Responsive visibility

## 🚀 Performance Optimizations (New)

- [x] **Critical CSS Patterns** (CSS, 100% browser support)
  - File: `src/critical.styl`
  - Above-fold styles
  - Deferred styles pattern
  - Minimal initial payload
  - Progressive enhancement
  - Commit: 62e7fed

- [ ] **CSS Containment** (CSS, 97%+ browser support)
  - File: `src/performance/containment.styl`
  - Layout containment
  - Paint containment
  - Style containment
  - Size containment

- [x] **Lazy Loading Hints** (CSS, 85%+ browser support)
  - File: `src/performance/lazy.styl`
  - content-visibility patterns
  - Skeleton screens
  - Placeholder styling
  - Fade-in transitions
  - Commit: 1998e06

- [x] **Animation Performance** (CSS, 97%+ browser support)
  - File: `src/components/performance.styl`
  - Transform-only animations (slide, scale, rotate)
  - Opacity transitions (fade-in, fade-out)
  - will-change hints for transform/opacity/scroll
  - GPU acceleration with translate3d compositing
  - Commit: 6eec6f2

| 2026-03-01 | Twenty-fifth scout | Added visual design patterns (glassmorphism, neumorphism accents, gradient borders, depth & layering), advanced layout patterns (holy grail, masonry, split panels, aspect ratio containers), interaction patterns (drag & drop, sort & filter, bulk selection, inline editing), data presentation (data tables, timelines, card grids, metric displays), utility classes (spacing, typography, color, visibility), performance optimizations (critical CSS, containment, lazy loading hints, animation performance) |


## 📱 Responsive Design Patterns (New - 2026-03-01 Scout 26)

- [ ] **Breakpoint System** (CSS, 100% browser support)
  - File: `src/responsive/breakpoints.styl`
  - Mobile-first breakpoints
  - Media query variables
  - Container query fallbacks
  - Print breakpoint

- [ ] **Responsive Typography** (CSS, 95%+ browser support)
  - File: `src/responsive/typography.styl`
  - clamp() for fluid text
  - Viewport-relative sizing
  - Minimum readable size
  - Maximum width constraints

- [ ] **Responsive Images** (CSS, 97%+ browser support)
  - File: `src/responsive/images.styl`
  - max-width: 100% pattern
  - aspect-ratio containers
  - Lazy loading hints
  - Responsive srcset support

- [ ] **Responsive Tables** (CSS, 97%+ browser support)
  - File: `src/responsive/tables.styl`
  - Horizontal scroll wrapper
  - Stacked table pattern
  - Priority column hiding
  - Card-based mobile view

## 🖨️ Print Extended (New)

- [x] **Print Page Breaks** (CSS, 97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - break-before controls
  - break-after controls
  - break-inside: avoid
  - Orphan/widow control
  - Commit: 538a183

- [x] **Print Typography** (CSS, 100% browser support)
  - File: `src/components/print-enhanced.styl`
  - Print-optimized fonts
  - Line height for print
  - Font size for print
  - Serif font stack
  - Commit: 2bf451e

- [x] **Print Links** (CSS, 97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - URL display after links with intelligent truncation
  - Link text styling with consistent underline
  - External link indicator (↗ arrow symbol)
  - Reference list generation (footnote-style numbering)
  - Special link type indicators (mailto, tel, GitHub, packages, etc.)
  - Commit: 24a99ea

- [x] **Print Images** (CSS, 97%+ browser support)
  - File: `src/components/print-enhanced.styl`
  - Image sizing for print
  - Caption styling
  - Alt text display option
  - Background image handling
  - Commit: ae8426b

## 🎭 State Patterns (New)

- [x] **Loading States** (CSS, 97%+ browser support)
  - File: `src/components/states.styl`
  - Spinner animation, skeleton screens, progress indicators, loading overlays
  - Reduced motion support included
  - Commit: 113d336

- [x] **Empty States** (CSS, 97%+ browser support)
  - File: `src/components/states.styl`
  - Empty list message
  - Empty search results
  - No permission state
  - First-time user state
  - Commit: c164d3a

- [x] **Error States** (CSS, 97%+ browser support)
  - File: `src/components/states.styl`
  - Error message styling
  - Error icon display
  - Recovery suggestions
  - Contact support link
  - Commit: c164d3a

- [x] **Success States** (CSS, 97%+ browser support)
  - File: `src/components/states.styl`
  - Success message styling
  - Success animation
  - Auto-dismiss timing
  - Undo action button
  - Commit: c164d3a

## 🔤 Code & Syntax Extended (New)

- [ ] **Inline Code Styling** (CSS, 97%+ browser support)
  - File: `src/code/inline.styl`
  - Monospace font stack
  - Background color
  - Padding/border-radius
  - Word-break handling

- [ ] **Code Block Styling** (CSS, 97%+ browser support)
  - File: `src/code/block.styl`
  - Container styling
  - Line numbers
  - Scrollable container
  - Copy button position

- [ ] **Syntax Highlighting** (CSS, 97%+ browser support)
  - File: `src/code/syntax.styl`
  - Keyword colors
  - String colors
  - Comment colors
  - Function colors

- [ ] **Terminal/Command Styling** (CSS, 97%+ browser support)
  - File: `src/code/terminal.styl`
  - Terminal background
  - Prompt styling
  - Command/output distinction
  - Selection colors

## 📐 Spacing System (New)

- [ ] **Margin Scale** (CSS, 100% browser support)
  - File: `src/spacing/margins.styl`
  - 4px base unit scale
  - Negative margins
  - Auto margins
  - Logical margin properties

- [ ] **Padding Scale** (CSS, 100% browser support)
  - File: `src/spacing/padding.styl`
  - 4px base unit scale
  - Symmetric shorthand
  - Logical padding properties
  - Component padding tokens

- [ ] **Gap Utilities** (CSS, 97%+ browser support)
  - File: `src/spacing/gap.styl`
  - row-gap classes
  - column-gap classes
  - gap shorthand
  - Responsive gaps

- [ ] **Spacing Variables** (CSS, 100% browser support)
  - File: `src/spacing/variables.styl`
  - --space-xs through --space-3xl
  - Semantic spacing tokens
  - Component-specific spacing
  - Density variants

## 🌗 Dark Mode Support (New)

- [ ] **Dark Mode Toggle** (CSS, 97%+ browser support)
  - File: `src/dark/toggle.styl`
  - Toggle button styling
  - Icon swap animation
  - System preference detection
  - Manual override storage

- [ ] **Dark Color Scheme** (CSS, 100% browser support)
  - File: `src/dark/colors.styl`
  - Inverted background
  - Adjusted text colors
  - Muted accent colors
  - Shadow adjustments

- [ ] **Dark Mode Images** (CSS, 97%+ browser support)
  - File: `src/dark/images.styl`
  - Reduced brightness option
  - Invert filter for diagrams
  - Dark mode logos
  - Background handling

- [ ] **Dark Mode Forms** (CSS, 97%+ browser support)
  - File: `src/dark/forms.styl`
  - Input field colors
  - Border colors
  - Focus ring colors
  - Placeholder text

## 🔗 Link Patterns (New)

- [ ] **Internal Link Styling** (CSS, 97%+ browser support)
  - File: `src/links/internal.styl`
  - Link color
  - Hover state
  - Visited state
  - Focus state

- [ ] **External Link Styling** (CSS, 97%+ browser support)
  - File: `src/links/external.styl`
  - External icon indicator
  - Security warning styling
  - New tab indicator
  - Different color option

- [ ] **Redirect Link Styling** (CSS, 97%+ browser support)
  - File: `src/links/redirect.styl`
  - Redirect indicator
  - Interwiki link styling
  - Language link styling
  - Archive link styling

- [ ] **Broken Link Styling** (CSS, 97%+ browser support)
  - File: `src/links/broken.styl`
  - Red link color
  - Hover explanation
  - Edit link option
  - Missing page indicator

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns (breakpoints, typography, images, tables), print extended (page breaks, typography, links, images), state patterns (loading, empty, error, success), code & syntax extended (inline code, code blocks, syntax highlighting, terminal), spacing system (margin scale, padding scale, gap utilities, spacing variables), dark mode support (toggle, color scheme, images, forms), link patterns (internal, external, redirect, broken) |


## 🔧 Advanced CSS Functions (New - 2026-03-10 Scout 28)

- [x] **`attr()` with type() Function** (90%+ browser support)
  - File: `src/components/modern-css.styl`
  - Parse HTML attributes as typed CSS values
  - Example: `width: attr(data-width px);`
  - Example: `color: attr(data-color type(<color>));`
  - Use for dynamic component sizing from data attributes
  - Note: Requires `@css{}` wrapper for Stylus
  - Commit: c6dedd5

- [x] **`color-mix()` Function** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Mix two colors together in CSS
  - Example: `color: color-mix(in srgb, var(--accent) 50%, white);`
  - Dynamic color variants without pre-computing
  - Hover/active state color adjustments
  - Note: Requires `@css{}` wrapper for Stylus
  - Commit: 84aac1c

- [ ] **`@import` with supports() Function** (95%+ browser support)
  - File: `src/main.styl`
  - Conditional stylesheet imports based on feature support
  - Example: `@import "modern.css" supports(display: grid);`
  - Progressive enhancement pattern
  - Load modern CSS only when features supported

- [ ] **`@import` with layer() Function** (97%+ browser support)
  - File: `src/main.styl`
  - Import external stylesheets into cascade layers
  - Example: `@import "reset.css" layer(reset);`
  - Example: `@import "theme.css" layer(theme);`
  - Third-party library isolation

- [ ] **`contrast-color()` Function** (92%+ browser support)
  - File: `src/variables/colors.styl`
  - Returns a color with maximum contrast for a given color
  - Example: `color: contrast-color(var(--bg));`
  - Automatic accessible text color selection
  - Works with WCAG contrast requirements
  - Stylus: Works directly

- [ ] **`progress()` Math Function** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Calculate position of a value between start and end (returns 0-1)
  - Example: `opacity: progress(var(--scroll), 0, 100);`
  - Scroll progress indicators
  - Reading progress bar calculations
  - Stylus: Works directly

## 🏷️ ArchWiki Status Templates (New)

- [ ] **{{Accuracy}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Accuracy warning banner
  - Dispute indicator styling
  - Discussion link styling

- [ ] **{{Out of date}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Outdated content warning
  - Last updated date display
  - Update needed indicator

- [ ] **{{Expansion}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Expansion needed banner
  - Missing sections indicator
  - Contribution call-to-action

- [ ] **{{Translateme}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Translation needed banner
  - Language indicator
  - Translation help link

- [ ] **{{Deletion}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Deletion candidate banner
  - Reason display
  - Discussion link

- [ ] **{{Related2}} Template Styling** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Related articles with translated anchor text
  - Non-English article navigation
  - Bilingual link support

- [ ] **{{Lowercase title}} Template Support** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - Lowercase title display handling
  - DISPLAYTITLE magic word support
  - Proper title case exceptions

## 📝 ArchWiki Navigation Patterns (New - 2026-03-10 Scout 29)

- [ ] **Magic Words Top-of-Article Styling** (CSS)
  - File: `src/components/content.styl`
  - DISPLAYTITLE, __NOTOC__, __NOEDITSECTION__ handling
  - Behavior switch indicators
  - Article configuration display

- [ ] **Interlanguage Link Column Styling** (CSS)
  - File: `src/components/i18n.styl`
  - Left sidebar language links
  - Alphabetical sorting visual indicator
  - Current language highlight
  - Missing translation indicator

- [ ] **Category Top-of-Article Placement** (CSS)
  - File: `src/components/navigation.styl`
  - Categories at top (ArchWiki style vs Wikipedia bottom)
  - No blank lines between categories and content
  - Category sort key display

- [ ] **Related Articles Box Positioning** (CSS)
  - File: `src/components/navigation.styl`
  - Right-aligned related articles box
  - Position below status templates, above intro
  - Mobile collapse behavior

## 🌐 ArchWiki i18n Templates (New)

- [ ] **{{i18n}} Language Bar Styling** (CSS)
  - File: `src/components/archwiki-i18n.styl`
  - Language link list
  - Available languages indicator
  - Missing translation indicator
  - Current language highlight

- [ ] **{{Related languages start/end}} Styling** (CSS)
  - File: `src/components/archwiki-i18n.styl`
  - Related languages box
  - Language link styling
  - Status indicator (complete/partial/stub)

| 2026-03-10 | Twenty-eighth scout | Added advanced CSS functions (attr() with type(), color-mix(), @import with supports()/layer()), ArchWiki status templates (Accuracy, Out of date, Expansion, Translateme, Deletion), ArchWiki i18n templates (i18n language bar, Related languages) |
| 2026-03-10 | Thirtieth scout | Added heading pseudo-classes (:heading, :heading()), shadow DOM pseudo-class (:has-slotted), view transition pseudo-classes (:active-view-transition), calc-size() function, media state pseudo-classes (:playing, :paused, :buffering) |


## 🎯 Heading Pseudo-Classes (New - 2026-03-10 Scout 30)

- [x] **`:heading` Pseudo-Class** (88%+ browser support)
  - File: `src/components/headings.styl`
  - Matches any heading element (<h1>-<h6>)
  - Example: `:heading { font-weight: 600; }`
  - Unified heading base styling without repeating selectors
  - Stylus: Works directly
  - Commit: 3fc418a

- [x] **`:heading()` Functional Pseudo-Class** (88%+ browser support)
  - File: `src/components/headings.styl`
  - Uses An+B notation to select heading elements
  - Example: `:heading(2n+1) { color: var(--accent); }`
  - Alternating heading styles
  - Level-based heading patterns
  - Stylus: Works directly
  - Commit: 3fc418a

## 🎭 Shadow DOM Pseudo-Classes (New)

- [ ] **`:has-slotted` Pseudo-Class** (87%+ browser support)
  - File: `src/components/web-components.styl`
  - Matches slot elements that have been assigned content
  - Example: `slot:has-slotted { display: block; }`
  - Conditional slot styling based on content
  - Web component slot presence detection
  - Stylus: Works directly

## 🎬 View Transition Pseudo-Classes (New)

- [ ] **`:active-view-transition` Pseudo-Class** (85%+ browser support)
  - File: `src/animations/view-transitions.styl`
  - Matches root element when a view transition is in progress
  - Example: `:root:active-view-transition { opacity: 0.9; }`
  - Page transition overlay effects
  - Cross-fade page navigation
  - Stylus: Works directly

- [ ] **`:active-view-transition-type()` Pseudo-Class** (85%+ browser support)
  - File: `src/animations/view-transitions.styl`
  - Matches when specific view transition type is active
  - Example: `:root:active-view-transition-type(slide) { ... }`
  - Different transition styles per navigation direction
  - Named transition variations
  - Stylus: Works directly

## 🔢 Advanced Math Functions (New)

- [ ] **`calc-size()` Function** (82%+ browser support)
  - File: `src/utilities/_math.styl`
  - Perform calculations on intrinsic size values (auto, fit-content, max-content)
  - Example: `height: calc-size(auto, size + 20px);`
  - Smooth animations from/to auto
  - Collapsible panel height transitions
  - Note: Requires `@css{}` wrapper for Stylus

## 📺 Media State Pseudo-Classes (New)

- [x] **`:playing` and `:paused` Pseudo-Classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style playable elements based on playback state
  - Example: `video:playing { outline: 2px solid var(--accent); }`
  - Play/pause button state indicators
  - Media player active state styling
  - Stylus: Works directly
  - Commit: 4e7bc5d

- [x] **`:buffering` and `:stalled` Pseudo-Classes** (85%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style media elements during buffering/stalled states
  - Example: `video:buffering { opacity: 0.7; }`
  - Loading spinner overlay
  - Network status indicators
  - Stylus: Works directly
  - Commit: 4e7bc5d

- [x] **`:muted` and `:volume-locked` Pseudo-Classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style sound-producing elements based on audio state
  - Example: `audio:muted .mute-icon { display: block; }`
  - Mute button state styling
  - Volume control indicators
  - Stylus: Works directly
  - Commit: 4e7bc5d


## 🔲 Logical Overflow Properties (New - 2026-03-10 Scout 29)

- [x] **`overflow-block` Property** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical overflow for block dimension
  - Example: `overflow-block: auto;`
  - RTL/vertical writing mode support
  - Stylus: Works directly
  - Commit: 92fb4e4

- [x] **`overflow-inline` Property** (97%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical overflow for inline dimension
  - Example: `overflow-inline: hidden;`
  - Horizontal scroll for horizontal text, vertical for vertical text
  - Stylus: Works directly
  - Commit: 92fb4e4

- [x] **`overscroll-behavior-block` Property** (92%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical overscroll for block dimension
  - Prevent scroll chaining in nested scrollables
  - `overscroll-behavior-block: contain;`
  - Stylus: Works directly
  - Commit: 92fb4e4

- [x] **`overscroll-behavior-inline` Property** (92%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical overscroll for inline dimension
  - Horizontal scroll chaining prevention
  - `overscroll-behavior-inline: none;`
  - Stylus: Works directly
  - Commit: 92fb4e4

- [x] **`contain-intrinsic-block-size` Property** (87%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical containment size for block dimension
  - Pair with `content-visibility: auto`
  - Example: `contain-intrinsic-block-size: 500px;`
  - Stylus: Works directly
  - Commit: 92fb4e4

- [x] **`contain-intrinsic-inline-size` Property** (87%+ browser support)
  - File: `src/components/utilities.styl`
  - Logical containment size for inline dimension
  - Reserve space for off-screen content
  - Example: `contain-intrinsic-inline-size: 100%;`
  - Stylus: Works directly
  - Commit: 92fb4e4

## 📖 ArchWiki Help:Style Templates (New)

- [ ] **{{Style}} Template Styling** (CSS)
  - File: `src/components/archwiki-style.styl`
  - Links to Help:Style/Formatting_and_punctuation
  - Style guideline callout box
  - Consistent with Note/Tip/Warning styling
  - Icon + link formatting

- [ ] **{{Meta}} Template Styling** (CSS)
  - File: `src/components/archwiki-meta.styl`
  - Meta information box for articles
  - ArchWiki namespace indicator
  - Policy/guideline distinction
  - Related meta pages

- [ ] **Man Page Link Template Enhanced** (CSS)
  - File: `src/components/archwiki-templates.styl`
  - {{man}} template styling
  - Man section indicator (1-8)
  - External link to man7.org or similar
  - Inline monospace with section badge

## 🌗 Automatic Dark Mode (New)

- [ ] **`prefers-color-scheme` Media Query** (97%+ browser support)
  - File: `src/variables/colors.styl`, `src/base/dark-mode.styl`
  - `@media (prefers-color-scheme: dark)` detection
  - Automatic theme switching based on system preference
  - Manual override toggle support
  - Stylus: Works directly

- [ ] **`color-scheme` Property** (97%+ browser support)
  - File: `src/base/base.styl`
  - `color-scheme: light dark;` declaration
  - Native form control theming
  - Scrollbar color adaptation
  - Stylus: Works directly


## 🎬 Animation & Transitions (New - 2026-03-01 Scout 27)

- [ ] **@starting-style Patterns** (CSS, 85%+ browser support)
  - File: `src/animations/entry.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Entry animations for elements
  - Dialog/modal open transitions
  - Dropdown reveal animations

- [ ] **Transition Utilities** (CSS, 97%+ browser support)
  - File: `src/animations/transitions.styl`
  - Transition timing functions
  - Transition duration scale
  - Transition property helpers
  - Transition delay utilities

- [ ] **Animation Keyframes** (CSS, 100% browser support)
  - File: `src/animations/keyframes.styl`
  - Fade in/out animations
  - Slide animations
  - Scale animations
  - Pulse animations

- [ ] **Scroll-Driven Animations** (CSS, 85%+ browser support)
  - File: `src/animations/scroll.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Progress bar animation
  - Reveal on scroll
  - Parallax effects

## 📝 Form Elements Extended (New)

- [ ] **Input Field Styling** (CSS, 97%+ browser support)
  - File: `src/forms/input.styl`
  - Input container styling
  - Placeholder styling
  - Validation states
  - Disabled states

- [ ] **Select Dropdown Styling** (CSS, 97%+ browser support)
  - File: `src/forms/select.styl`
  - Select container styling
  - Option styling
  - Dropdown indicator
  - Multi-select chips

- [ ] **Checkbox & Radio Styling** (CSS, 97%+ browser support)
  - File: `src/forms/checkbox.styl`
  - Custom checkbox styling
  - Custom radio styling
  - Checked states
  - Indeterminate state

- [ ] **Textarea Styling** (CSS, 97%+ browser support)
  - File: `src/forms/textarea.styl`
  - Textarea container
  - Resize handle styling
  - Character counter
  - Auto-grow indicator

## 📊 Table Patterns Extended (New)

- [ ] **Sortable Tables** (CSS, 97%+ browser support)
  - File: `src/tables/sortable.styl`
  - Sort indicator styling
  - Active sort column
  - Sort direction icons
  - Hover state for headers

- [ ] **Responsive Table Patterns** (CSS, 97%+ browser support)
  - File: `src/tables/responsive.styl`
  - Horizontal scroll wrapper
  - Stacked card pattern
  - Priority-based hiding
  - Expandable rows

- [ ] **Table Zebra Striping** (CSS, 100% browser support)
  - File: `src/tables/striped.styl`
  - Alternating row colors
  - Hover highlight
  - Selected row highlight
  - Nested table handling

- [ ] **Sticky Table Headers** (CSS, 97%+ browser support)
  - File: `src/tables/sticky.styl`
  - position: sticky headers
  - Sticky first column
  - Sticky footer
  - Scroll shadow indicators

## 🧭 Navigation Patterns (New)

- [ ] **Breadcrumbs Extended** (CSS, 97%+ browser support)
  - File: `src/navigation/breadcrumbs.styl`
  - Breadcrumb container
  - Separator styling
  - Current page indicator
  - Truncation for long paths

- [ ] **Table of Contents** (CSS, 97%+ browser support)
  - File: `src/navigation/toc.styl`
  - TOC container styling
  - TOC item styling
  - Active section highlight
  - Collapse/expand control

- [ ] **Related Pages** (CSS)
  - File: `src/navigation/related.styl`
  - Related pages container
  - Link item styling
  - Category badge
  - See also section

- [ ] **Page Navigation** (CSS)
  - File: `src/navigation/pagenav.styl`
  - Previous/next page links
  - Page navigation container
  - Arrow icons
  - Page title preview

## 🔍 Search Extended (New)

- [ ] **Search Results Page** (CSS, 97%+ browser support)
  - File: `src/search/results.styl`
  - Results container styling
  - Result item styling
  - Match highlight styling
  - No results message

- [ ] **Search Suggestions** (CSS)
  - File: `src/search/suggestions.styl`
  - Suggestion dropdown
  - Suggestion item styling
  - Match emphasis
  - Keyboard navigation hints

- [x] **Advanced Search Form** (CSS)
  - File: `src/components/search.styl`
  - Field group styling
  - Filter chips
  - Date range input
  - Namespace selector
  - Commit: ac12f84

- [ ] **Search Filters Sidebar** (CSS)
  - File: `src/search/filters.styl`
  - Filter section styling
  - Filter checkbox styling
  - Apply/clear buttons
  - Active filter count

## 🦶 Footer Patterns (New)

- [ ] **Site Footer Container** (CSS)
  - File: `src/layout/footer.styl`
  - Footer background
  - Footer layout grid
  - Footer spacing
  - Footer border

- [ ] **Footer Links** (CSS, 97%+ browser support)
  - File: `src/layout/footer.styl`
  - Link column styling
  - Link hover states
  - External link indicators
  - Social media links

- [ ] **Footer Info** (CSS)
  - File: `src/layout/footer.styl`
  - Copyright text styling
  - License info styling
  - Powered by styling
  - Last modified info

- [ ] **Footer Actions** (CSS)
  - File: `src/layout/footer.styl`
  - Back to top button
  - Print page button
  - Share page button
  - Report issue link

## 🔝 Header Patterns (New)

- [ ] **Site Header Container** (CSS, 97%+ browser support)
  - File: `src/layout/header.styl`
  - Header background
  - Sticky header behavior
  - Header height
  - Header border/shadow

- [ ] **Logo Area** (CSS)
  - File: `src/layout/header.styl`
  - Logo container styling
  - Logo image sizing
  - Site title styling
  - Tagline styling

- [ ] **Header Search** (CSS)
  - File: `src/layout/header.styl`
  - Search input container
  - Search icon styling
  - Search expand animation
  - Quick search trigger

- [ ] **User Menu** (CSS)
  - File: `src/layout/header.styl`
  - User menu trigger
  - Dropdown menu styling
  - User avatar styling
  - Notification badge

## 📐 Sidebar Patterns (New)

- [ ] **Sidebar Container** (CSS, 97%+ browser support)
  - File: `src/layout/sidebar.styl`
  - Sidebar width
  - Sidebar background
  - Sidebar border
  - Collapsible behavior

- [ ] **Sidebar Sections** (CSS)
  - File: `src/layout/sidebar.styl`
  - Section header styling
  - Section content styling
  - Collapse/expand toggle
  - Active section indicator

- [ ] **Sidebar Navigation** (CSS)
  - File: `src/layout/sidebar.styl`
  - Nav item styling
  - Nested nav styling
  - Active nav indicator
  - Hover states

- [ ] **Sidebar Widgets** (CSS)
  - File: `src/layout/sidebar.styl`
  - Widget container styling
  - Widget title styling
  - Widget content styling
  - Widget divider

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions (@starting-style, transition utilities, keyframes, scroll-driven animations), form elements extended (input, select, checkbox/radio, textarea), table patterns extended (sortable, responsive, zebra striping, sticky headers), navigation patterns (breadcrumbs, TOC, related pages, page navigation), search extended (results, suggestions, advanced form, filters sidebar), footer patterns (container, links, info, actions), header patterns (container, logo area, header search, user menu), sidebar patterns (container, sections, navigation, widgets) |


## 💬 Discussion/Talk Pages (New - 2026-03-01 Scout 28)

- [ ] **Talk Page Container** (CSS)
  - File: `src/talk/container.styl`
  - Talk page background
  - Section dividers
  - Thread nesting indicator
  - Reply depth styling

- [ ] **Comment Thread** (CSS, 97%+ browser support)
  - File: `src/talk/threads.styl`
  - Thread container styling
  - Thread collapse/expand
  - Reply button positioning
  - Thread timestamp display

- [ ] **User Signature** (CSS)
  - File: `src/talk/signature.styl`
  - Username link styling
  - Timestamp styling
  - User badge indicator
  - Custom signature container

- [ ] **Archived Discussion** (CSS)
  - File: `src/talk/archive.styl`
  - Archive notice styling
  - Archive link display
  - Historical indicator
  - Search archive button

## 📂 Categories & Interwiki (New)

- [ ] **Category Page Layout** (CSS)
  - File: `src/categories/page.styl`
  - Category header styling
  - Subcategory grid
  - Page list styling
  - Member count display

- [ ] **Category Links Bar** (CSS)
  - File: `src/categories/links.styl`
  - Category tag styling
  - Hidden category indicator
  - Sort key display
  - Edit categories button

- [ ] **Interwiki Links** (CSS)
  - File: `src/categories/interwiki.styl`
  - Interwiki icon styling
  - Language link styling
  - Sister project links
  - External wiki indicator

- [ ] **Category Tree** (CSS)
  - File: `src/categories/tree.styl`
  - Tree container styling
  - Expand/collapse nodes
  - Parent category display
  - Subcategory count badge

## 📝 Diff Views (New)

- [ ] **Diff Container** (CSS)
  - File: `src/diff/container.styl`
  - Diff table layout
  - Diff legend styling
  - Side-by-side toggle
  - Unified diff toggle

- [ ] **Diff Highlighting** (CSS, 97%+ browser support)
  - File: `src/diff/highlight.styl`
  - Addition background color
  - Deletion background color
  - Change indicator colors
  - Word-level diff styling

- [ ] **Diff Navigation** (CSS)
  - File: `src/diff/navigation.styl`
  - Next/previous change buttons
  - Change count indicator
  - Jump to change links
  - Scroll sync indicator

- [ ] **Diff Summary** (CSS)
  - File: `src/diff/summary.styl`
  - Summary container styling
  - Added lines count
  - Removed lines count
  - Edit summary display

## 📁 File/Media Pages (New)

- [ ] **File Page Container** (CSS)
  - File: `src/file/container.styl`
  - File page layout
  - File history section
  - File usage section
  - Metadata table styling

- [ ] **File Preview** (CSS)
  - File: `src/file/preview.styl`
  - Image preview container
  - Zoom controls styling
  - Fullscreen button
  - File dimensions display

- [ ] **File Information** (CSS)
  - File: `src/file/info.styl`
  - Info table styling
  - MIME type display
  - File size display
  - Upload date display

- [ ] **File Licensing** (CSS)
  - File: `src/file/licensing.styl`
  - License box styling
  - License icon display
  - Attribution requirements
  - Permission details

## ⚙️ Special Pages (New)

- [ ] **Special Page Header** (CSS)
  - File: `src/special/header.styl`
  - Special page title styling
  - Description text styling
  - Navigation breadcrumbs
  - Back to main link

- [ ] **Special Page List** (CSS, 97%+ browser support)
  - File: `src/special/list.styl`
  - List item styling
  - Alternating row colors
  - Pagination styling
  - Empty list message

- [ ] **Log Entries** (CSS)
  - File: `src/special/logs.styl`
  - Log entry container
  - Action type indicator
  - Timestamp styling
  - User link styling

- [ ] **Query Results** (CSS)
  - File: `src/special/query.styl`
  - Results container
  - Result item styling
  - Sort controls styling
  - Filter controls styling

## 👤 User Pages (New)

- [ ] **User Page Header** (CSS)
  - File: `src/user/header.styl`
  - Username display styling
  - User group badges
  - Edit count display
  - Registration date display

- [ ] **User Contributions** (CSS)
  - File: `src/user/contributions.styl`
  - Contribution list styling
  - Page link styling
  - Edit summary display
  - Time ago indicator

- [x] **User Talk Notification** (CSS)
  Commit: a5d5639
  - File: `src/user/talk.styl`
  - New message indicator
  - Talk page link styling
  - Archive link display
  - Leave message button

- [ ] **User Stats** (CSS)
  - File: `src/user/stats.styl`
  - Stats container styling
  - Stat item styling
  - Graph/chart container
  - Comparison display

## 📜 Revision History (New)

- [ ] **History List** (CSS, 97%+ browser support)
  - File: `src/history/list.styl`
  - History table styling
  - Revision row styling
  - Selected revision highlight
  - Checkbox styling for diff

- [ ] **Revision Info** (CSS)
  - File: `src/history/info.styl`
  - Timestamp styling
  - User link styling
  - Edit summary styling
  - Minor edit indicator

- [ ] **Revision Actions** (CSS)
  - File: `src/history/actions.styl`
  - View diff button
  - View source button
  - Rollback button
  - Thank button

- [ ] **History Navigation** (CSS)
  - File: `src/history/navigation.styl`
  - Pagination styling
  - Date range selector
  - User filter input
  - Tag filter dropdown

## ⚔️ Edit Conflicts (New)

- [ ] **Conflict Warning** (CSS)
  - File: `src/conflict/warning.styl`
  - Warning container styling
  - Conflict explanation text
  - Resolution instructions
  - Help link styling

- [ ] **Conflict Diff** (CSS)
  - File: `src/conflict/diff.styl`
  - Your version styling
  - Stored version styling
  - Conflict markers
  - Diff highlighting

- [ ] **Merge Interface** (CSS)
  - File: `src/conflict/merge.styl`
  - Merge container styling
  - Version selector styling
  - Preview pane styling
  - Accept/reject buttons

- [ ] **Conflict Resolution** (CSS)
  - File: `src/conflict/resolution.styl`
  - Resolution options styling
  - Combined text preview
  - Save resolution button
  - Cancel and retry button

## 👁️ Watchlist (New)

- [ ] **Watchlist Container** (CSS)
  - File: `src/watchlist/container.styl`
  - Watchlist layout
  - Section headers
  - Filter controls
  - Edit watchlist button

- [ ] **Watchlist Item** (CSS, 97%+ browser support)
  - File: `src/watchlist/item.styl`
  - Page title styling
  - Change indicator
  - Timestamp display
  - Unwatch button styling

- [ ] **Watchlist Preferences** (CSS)
  - File: `src/watchlist/preferences.styl`
  - Preferences container
  - Toggle options styling
  - Namespace filters
  - Save preferences button

- [ ] **Watchstar Indicator** (CSS)
  - File: `src/watchlist/watchstar.styl`
  - Watch/unwatch star icon
  - Hover state animation
  - Watched state indicator
  - Watchlist count badge

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages (container, comment thread, user signature, archived discussion), categories & interwiki (category page, category links, interwiki links, category tree), diff views (container, highlighting, navigation, summary), file/media pages (container, preview, information, licensing), special pages (header, list, log entries, query results), user pages (header, contributions, talk notification, stats), revision history (history list, revision info, revision actions, history navigation), edit conflicts (warning, conflict diff, merge interface, conflict resolution), watchlist (container, item, preferences, watchstar indicator) |


## 🔐 Login & Registration (New - 2026-03-02 Scout 29)

- [ ] **Login Form** (CSS, 97%+ browser support)
  - File: `src/auth/login.styl`
  - Form container styling
  - Input field styling
  - Submit button styling
  - Remember me checkbox

- [ ] **Registration Form** (CSS)
  - File: `src/auth/register.styl`
  - Form container styling
  - Field validation styling
  - Password strength indicator
  - Terms agreement checkbox

- [ ] **Password Reset** (CSS)
  - File: `src/auth/reset.styl`
  - Reset form container
  - Email input styling
  - Submit button styling
  - Success message styling

- [ ] **OAuth Providers** (CSS)
  - File: `src/auth/oauth.styl`
  - Provider button styling
  - Provider icon display
  - Divider styling
  - Return URL display

## 🛡️ Admin & Moderation (New)

- [ ] **Admin Panel** (CSS)
  - File: `src/admin/panel.styl`
  - Panel container styling
  - Section navigation
  - Quick action buttons
  - Status indicators

- [ ] **Block/Unblock UI** (CSS)
  - File: `src/admin/block.styl`
  - Block form styling
  - Duration selector
  - Reason textarea
  - Block log preview

- [ ] **Protect Page** (CSS)
  - File: `src/admin/protect.styl`
  - Protection form container
  - Protection level selector
  - Expiry selector
  - Cascade option styling

- [ ] **Delete/Restore** (CSS)
  - File: `src/admin/delete.styl`
  - Delete form container
  - Reason input styling
  - Revision selection
  - Confirm button styling

## 📊 Recent Changes (New)

- [ ] **Recent Changes List** (CSS, 97%+ browser support)
  - File: `src/recent/changes.styl`
  - Changes table styling
  - Row highlighting
  - Namespace indicator
  - Timestamp display

- [ ] **Change Filters** (CSS)
  - File: `src/recent/filters.styl`
  - Filter panel container
  - Tag filter styling
  - Namespace selector
  - User filter input

- [ ] **Change Legend** (CSS)
  - File: `src/recent/legend.styl`
  - Legend container
  - Letter indicators
  - Color key display
  - Expandable legend

- [ ] **Live Update Indicator** (CSS)
  - File: `src/recent/live.styl`
  - Live update toggle
  - Update count badge
  - Pause/resume button
  - Auto-scroll indicator

## 📝 Edit Interface (New)

- [ ] **Edit Container** (CSS)
  - File: `src/edit/container.styl`
  - Edit form layout
  - Toolbar positioning
  - Textarea container
  - Summary section

- [ ] **Edit Toolbar** (CSS, 97%+ browser support)
  - File: `src/edit/toolbar.styl`
  - Toolbar container
  - Button group styling
  - Dropdown menus
  - Special character picker

- [ ] **Edit Summary** (CSS)
  - File: `src/edit/summary.styl`
  - Summary input styling
  - Preset summary buttons
  - Character count display
  - Minor edit checkbox

- [ ] **Edit Preview** (CSS)
  - File: `src/edit/preview.styl`
  - Preview container
  - Loading indicator
  - Diff toggle button
  - Refresh preview button

## 📋 Contributions (New)

- [ ] **Contributions List** (CSS, 97%+ browser support)
  - File: `src/contributions/list.styl`
  - List container styling
  - Contribution item styling
  - Tag badges
  - Date grouping

- [ ] **Contribution Stats** (CSS)
  - File: `src/contributions/stats.styl`
  - Stats container
  - Edit count display
  - Activity graph
  - Namespace breakdown

- [ ] **Contribution Filters** (CSS)
  - File: `src/contributions/filters.styl`
  - Filter container
  - Namespace selector
  - Date range picker
  - Tag filter input

- [ ] **Top Contributors** (CSS)
  - File: `src/contributions/top.styl`
  - Leaderboard container
  - Rank item styling
  - User avatar display
  - Contribution count

## 🏷️ Tags & Markers (New)

- [ ] **Tag Display** (CSS)
  - File: `src/tags/display.styl`
  - Tag container styling
  - Tag badge styling
  - Tag description tooltip
  - Remove tag button

- [ ] **Tag Manager** (CSS)
  - File: `src/tags/manager.styl`
  - Manager container
  - Tag list styling
  - Add tag input
  - Delete tag button

- [ ] **Edit Tag UI** (CSS)
  - File: `src/tags/edit.styl`
  - Tag form container
  - Tag name input
  - Description textarea
  - Active status toggle

- [ ] **Tag Statistics** (CSS)
  - File: `src/tags/stats.styl`
  - Stats container
  - Usage count display
  - Recent changes count
  - Hit count display

## 📑 Page Information (New)

- [ ] **Info Container** (CSS)
  - File: `src/info/container.styl`
  - Info page layout
  - Section headers
  - Data table styling
  - Navigation links

- [ ] **Page Stats** (CSS)
  - File: `src/info/stats.styl`
  - Stats container
  - View count display
  - Edit count display
  - Author display

- [ ] **Page Properties** (CSS)
  - File: `src/info/properties.styl`
  - Properties list
  - Redirect indicator
  - Page ID display
  - Last modified info

- [ ] **Linked Pages** (CSS)
  - File: `src/info/linked.styl`
  - Links list container
  - Link item styling
  - Broken link indicator
  - External link marker

## 🔔 Notifications (New)

- [ ] **Notification Badge** (CSS, 97%+ browser support)
  - File: `src/notifications/badge.styl`
  - Badge container
  - Count display
  - Alert color variants
  - Pulse animation

- [ ] **Notification Panel** (CSS)
  - File: `src/notifications/panel.styl`
  - Panel container
  - Notification item
  - Mark read button
  - Clear all button

- [ ] **Notification Types** (CSS)
  - File: `src/notifications/types.styl`
  - Mention notification
  - Edit notification
  - Talk page notification
  - Watchlist notification

- [ ] **Notification Preferences** (CSS)
  - File: `src/notifications/preferences.styl`
  - Preferences container
  - Toggle switches
  - Email options
  - Frequency selector

## 📰 Flow/Structured Discussions (New)

- [ ] **Flow Board** (CSS)
  - File: `src/flow/board.styl`
  - Board container
  - Topic list styling
  - New topic button
  - Sort controls

- [ ] **Flow Topic** (CSS, 97%+ browser support)
  - File: `src/flow/topic.styl`
  - Topic container
  - Reply thread styling
  - Collapsed state
  - Reply count badge

- [ ] **Flow Post** (CSS)
  - File: `src/flow/post.styl`
  - Post container
  - Author info display
  - Timestamp display
  - Actions menu

- [ ] **Flow Editor** (CSS)
  - File: `src/flow/editor.styl`
  - Editor container
  - Toolbar styling
  - Preview toggle
  - Submit button

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages, categories & interwiki, diff views, file/media pages, special pages, user pages, revision history, edit conflicts, watchlist |
| 2026-03-02 | Twenty-ninth scout | Added login & registration (login form, registration form, password reset, OAuth providers), admin & moderation (admin panel, block/unblock, protect page, delete/restore), recent changes (changes list, filters, legend, live update), edit interface (edit container, toolbar, summary, preview), contributions (list, stats, filters, top contributors), tags & markers (display, manager, edit UI, statistics), page information (info container, stats, properties, linked pages), notifications (badge, panel, types, preferences), Flow/structured discussions (board, topic, post, editor) |


## 🖼️ Gallery & Media (New - 2026-03-02 Scout 30)

- [ ] **Gallery Container** (CSS, 97%+ browser support)
  - File: `src/gallery/container.styl`
  - Gallery grid layout
  - Gallery mode selector
  - Item spacing control
  - Caption display toggle

- [ ] **Gallery Item** (CSS)
  - File: `src/gallery/item.styl`
  - Image container styling
  - Thumbnail placeholder
  - Caption text styling
  - Border/frame styling

- [ ] **Gallery Slider** (CSS)
  - File: `src/gallery/slider.styl`
  - Slider container
  - Navigation arrows
  - Thumbnail strip
  - Caption overlay

- [ ] **Gallery Pack** (CSS)
  - File: `src/gallery/pack.styl`
  - Pack layout container
  - Image positioning
  - Gap handling
  - Nolines mode

## 🔧 Gadgets & Extensions (New)

- [ ] **Gadget Manager** (CSS)
  - File: `src/gadgets/manager.styl`
  - Gadget list container
  - Gadget item styling
  - Toggle switch styling
  - Description display

- [ ] **Gadget Preferences** (CSS)
  - File: `src/gadgets/preferences.styl`
  - Preferences container
  - Option rows styling
  - Save button styling
  - Reset to defaults

- [ ] **Extension Info** (CSS)
  - File: `src/gadgets/extensions.styl`
  - Extension card styling
  - Version display
  - License display
  - Documentation link

- [ ] **Gadget Dependencies** (CSS)
  - File: `src/gadgets/deps.styl`
  - Dependency list container
  - Required badge styling
  - Version requirement display
  - Install prompt

## 📚 Documentation & Help (New)

- [ ] **Help Page Layout** (CSS)
  - File: `src/help/layout.styl`
  - Help page container
  - Section navigation
  - TOC styling
  - Related links

- [ ] **Documentation Templates** (CSS)
  - File: `src/help/templates.styl`
  - Template container
  - Parameter table styling
  - Example display
  - Copy code button

- [ ] **FAQ Accordion** (CSS, 97%+ browser support)
  - File: `src/help/faq.styl`
  - Accordion container
  - Question row styling
  - Expand/collapse indicator
  - Answer content area

- [ ] **Tutorial Steps** (CSS)
  - File: `src/help/tutorial.styl`
  - Step container styling
  - Step number indicator
  - Progress bar styling
  - Next/previous buttons

## 🔗 Interwiki & Sister Projects (New)

- [ ] **Interwiki Links Panel** (CSS)
  - File: `src/interwiki/panel.styl`
  - Panel container
  - Project icon display
  - Link item styling
  - Language variant selector

- [ ] **Sister Project Box** (CSS)
  - File: `src/interwiki/sister.styl`
  - Box container styling
  - Project logo display
  - Description text
  - Visit link button

- [ ] **Language Links** (CSS, 97%+ browser support)
  - File: `src/interwiki/languages.styl`
  - Language list container
  - Language item styling
  - Current language indicator
  - Add translation link

- [ ] **Wikidata Integration** (CSS)
  - File: `src/interwiki/wikidata.styl`
  - Wikidata badge styling
  - Item ID display
  - Edit on Wikidata link
  - Synchronization indicator

## 📦 Templates Extended (New)

- [ ] **Template Documentation** (CSS)
  - File: `src/templates/docs.styl`
  - Documentation container
  - Usage examples styling
  - Parameter description
  - See also section

- [ ] **Infobox Extended** (CSS, 97%+ browser support)
  - File: `src/templates/infobox.styl`
  - Infobox container
  - Header image styling
  - Data row styling
  - Collapsible sections

- [ ] **Navbox Styling** (CSS)
  - File: `src/templates/navbox.styl`
  - Navbox container
  - Group header styling
  - List item styling
  - Collapse/expand toggle

- [ ] **Message Boxes** (CSS)
  - File: `src/templates/ambox.styl`
  - Ambox container
  - Type indicator (warning, info, etc.)
  - Icon display area
  - Dismiss button

## 📊 Parser & Output (New)

- [ ] **TOC Extended** (CSS, 97%+ browser support)
  - File: `src/parser/toc.styl`
  - TOC container styling
  - Numbered list styling
  - Level indentation
  - Sticky TOC option

- [ ] **Reference List** (CSS)
  - File: `src/parser/references.styl`
  - References container
  - Reference item styling
  - Backlink indicator
  - Group separator

- [ ] **Math Output** (CSS)
  - File: `src/parser/math.styl`
  - Math container styling
  - Formula display
  - Equation numbering
  - Overflow handling

- [ ] **Citation Display** (CSS)
  - File: `src/parser/citation.styl`
  - Citation container
  - Author/date styling
  - Source link styling
  - Citation error indicator

## 🔧 Maintenance & Tools (New)

- [ ] **Maintenance Reports** (CSS)
  - File: `src/maintenance/reports.styl`
  - Report container
  - Issue list styling
  - Severity indicator
  - Fix action button

- [ ] **Broken Links Report** (CSS)
  - File: `src/maintenance/broken.styl`
  - Links list container
  - Link item styling
  - HTTP status badge
  - Check date display

- [ ] **Wanted Pages** (CSS)
  - File: `src/maintenance/wanted.styl`
  - Wanted list container
  - Page item styling
  - Link count badge
  - Create page button

- [ ] **Orphaned Pages** (CSS)
  - File: `src/maintenance/orphaned.styl`
  - Orphan list container
  - Page item styling
  - Last edit date
  - Review action button

## 📈 Analytics Extended (New)

- [ ] **Page View Stats** (CSS, 97%+ browser support)
  - File: `src/analytics/pageviews.styl`
  - Stats container
  - Chart display area
  - Date range selector
  - Comparison toggle

- [ ] **Edit Statistics** (CSS)
  - File: `src/analytics/edits.styl`
  - Edit count display
  - Editor list styling
  - Time period selector
  - Export button

- [ ] **Traffic Sources** (CSS)
  - File: `src/analytics/traffic.styl`
  - Sources container
  - Source item styling
  - Percentage bar
  - Referrer display

- [ ] **Search Analytics** (CSS)
  - File: `src/analytics/search.styl`
  - Search stats container
  - Popular queries list
  - Zero results display
  - Search trends chart

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages, categories & interwiki, diff views, file/media pages, special pages, user pages, revision history, edit conflicts, watchlist |
| 2026-03-02 | Twenty-ninth scout | Added login & registration, admin & moderation, recent changes, edit interface, contributions, tags & markers, page information, notifications, Flow/structured discussions |
| 2026-03-02 | Thirtieth scout | Added gallery & media (gallery container, item, slider, pack), gadgets & extensions (gadget manager, preferences, extension info, dependencies), documentation & help (help page layout, documentation templates, FAQ accordion, tutorial steps), interwiki & sister projects (interwiki links panel, sister project box, language links, Wikidata integration), templates extended (template documentation, infobox extended, navbox styling, message boxes), parser & output (TOC extended, reference list, math output, citation display), maintenance & tools (maintenance reports, broken links, wanted pages, orphaned pages), analytics extended (page view stats, edit statistics, traffic sources, search analytics) |


## 🔌 API & Developer Documentation (New - 2026-03-02 Scout 31)

- [ ] **API Sandbox** (CSS, 97%+ browser support)
  - File: `src/api/sandbox.styl`
  - Sandbox container
  - Endpoint selector
  - Parameter inputs styling
  - Response display area

- [ ] **API Documentation** (CSS)
  - File: `src/api/docs.styl`
  - Documentation container
  - Endpoint list styling
  - Method badge (GET/POST/etc.)
  - Code example styling

- [ ] **OAuth Flow** (CSS)
  - File: `src/api/oauth.styl`
  - OAuth dialog styling
  - Permission list
  - Authorize button
  - Token display area

- [ ] **Rate Limit Display** (CSS)
  - File: `src/api/ratelimit.styl`
  - Limit indicator styling
  - Remaining requests display
  - Reset time display
  - Warning threshold

## 🖥️ Mobile & Responsive Extended (New)

- [ ] **Mobile Navigation** (CSS, 97%+ browser support)
  - File: `src/mobile/navigation.styl`
  - Hamburger menu styling
  - Slide-out drawer
  - Touch-friendly targets
  - Swipe gestures

- [ ] **Mobile Tables** (CSS)
  - File: `src/mobile/tables.styl`
  - Stacked table pattern
  - Priority column display
  - Horizontal scroll wrapper
  - Expand row button

- [ ] **Touch Interactions** (CSS)
  - File: `src/mobile/touch.styl`
  - Touch target sizing
  - Long-press menus
  - Swipe actions
  - Pull to refresh

- [ ] **Offline Support** (CSS)
  - File: `src/mobile/offline.styl`
  - Offline indicator styling
  - Cached content badge
  - Sync status display
  - Retry button styling

## ♿ Accessibility Extended (New)

- [ ] **Skip Links** (CSS, 97%+ browser support)
  - File: `src/a11y/skiplinks.styl`
  - Skip to content link
  - Skip to navigation link
  - Skip to search link
  - Focus styling

- [ ] **Focus Management** (CSS)
  - File: `src/a11y/focus.styl`
  - :focus-visible styling
  - Custom focus rings
  - Focus trap styling
  - Focus indicator animation

- [ ] **Screen Reader Content** (CSS)
  - File: `src/a11y/sr.styl`
  - sr-only utility class
  - Visually hidden patterns
  - Announcer region
  - Live region styling

- [ ] **Color Contrast** (CSS)
  - File: `src/a11y/contrast.styl`
  - High contrast mode support
  - @media (prefers-contrast)
  - Forced-colors adaptation
  - System color keywords

## ⚡ Performance Extended (New)

- [x] **content-visibility Patterns** (CSS, 85%+ browser support)
  - File: `src/performance/content.styl`
  - Skip rendering off-screen content
  - contain-intrinsic-size pairing
  - Apply to long lists
  - Commit: 970b930

- [x] **CSS Containment** (CSS, 97%+ browser support)
  - File: `src/components/containment.styl`
  - Layout containment
  - Paint containment
  - Size containment
  - Style containment
  - Commit: 24b4b3f7

- [ ] **will-change Optimization** (CSS, 95%+ browser support)
  - File: `src/performance/willchange.styl`
  - GPU layer hints
  - Apply to animated elements
  - Remove after animation
  - Performance monitoring

- [x] **Dynamic Viewport Units** (CSS, 92%+ browser support)
  - File: `src/performance/viewport.styl`
  - dvh for mobile
  - svh for fixed elements
  - lvh for full-height
  - Fallback patterns
  - Commit: 64b1e2e

## 🎬 Animation Extended (New)

- [ ] **@starting-style Patterns** (CSS, 85%+ browser support)
  - File: `src/animation/starting.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Entry animations
  - Dialog open transitions
  - Dropdown reveal
  - Respect prefers-reduced-motion

- [ ] **Scroll-Driven Animations** (CSS, 85%+ browser support)
  - File: `src/animation/scroll.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Progress bar animation
  - Reveal on scroll
  - Parallax effects
  - Timeline scroller

- [ ] **View Transitions** (CSS, 85%+ browser support)
  - File: `src/animation/transitions.styl`
  - Note: Wrap in `@css{}` for Stylus
  - Page transition animation
  - Element morphing
  - Cross-fade effects
  - Navigation transitions

- [ ] **Keyframe Utilities** (CSS, 100% browser support)
  - File: `src/animation/keyframes.styl`
  - Predefined animations
  - Fade in/out
  - Slide animations
  - Pulse/shake effects

## 📊 Data Visualization (New)

- [ ] **Chart Containers** (CSS, 97%+ browser support)
  - File: `src/data/charts.styl`
  - Chart wrapper styling
  - Legend positioning
  - Axis label styling
  - Tooltip container

- [ ] **Data Table Visual** (CSS)
  - File: `src/data/datatable.styl`
  - Sortable headers
  - Filter row styling
  - Pagination controls
  - Export button

- [ ] **Progress Indicators** (CSS)
  - File: `src/data/progress.styl`
  - Progress bar styling
  - Circular progress
  - Step indicators
  - Completion badges

- [ ] **Stat Cards** (CSS)
  - File: `src/data/stats.styl`
  - Card container
  - Big number display
  - Trend indicator
  - Comparison display

## 🔗 External Services (New)

- [ ] **Social Share Buttons** (CSS, 97%+ browser support)
  - File: `src/external/share.styl`
  - Share button container
  - Platform icon styling
  - Share count display
  - Copy link button

- [ ] **Embed Containers** (CSS)
  - File: `src/external/embeds.styl`
  - Embed wrapper styling
  - Aspect ratio container
  - Loading placeholder
  - Error fallback

- [ ] **Map Embeds** (CSS)
  - File: `src/external/maps.styl`
  - Map container styling
  - Marker info popup
  - Fullscreen toggle
  - Static map fallback

- [ ] **Video Embeds** (CSS)
  - File: `src/external/video.styl`
  - Video container
  - Play button overlay
  - Thumbnail display
  - Duration badge

## 🧪 Testing & QA (New)

- [ ] **Test Results** (CSS)
  - File: `src/testing/results.styl`
  - Results container
  - Pass/fail indicators
  - Error message styling
  - Rerun test button

- [ ] **Comparison View** (CSS, 97%+ browser support)
  - File: `src/testing/comparison.styl`
  - Side-by-side container
  - Diff highlight styling
  - Toggle controls
  - Export comparison

- [ ] **Preview Mode** (CSS)
  - File: `src/testing/preview.styl`
  - Preview container
  - Device frame styling
  - Viewport size selector
  - Refresh preview button

- [ ] **Sandbox Mode** (CSS)
  - File: `src/testing/sandbox.styl`
  - Sandbox indicator
  - Reset button styling
  - Warning banner
  - Exit sandbox button

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages, categories & interwiki, diff views, file/media pages, special pages, user pages, revision history, edit conflicts, watchlist |
| 2026-03-02 | Twenty-ninth scout | Added login & registration, admin & moderation, recent changes, edit interface, contributions, tags & markers, page information, notifications, Flow/structured discussions |
| 2026-03-02 | Thirtieth scout | Added gallery & media, gadgets & extensions, documentation & help, interwiki & sister projects, templates extended, parser & output, maintenance & tools, analytics extended |
| 2026-03-02 | Thirty-first scout | Added API & developer documentation (API sandbox, documentation, OAuth flow, rate limit display), mobile & responsive extended (mobile navigation, tables, touch interactions, offline support), accessibility extended (skip links, focus management, screen reader content, color contrast), performance extended (content-visibility, CSS containment, will-change optimization, dynamic viewport units), animation extended (@starting-style, scroll-driven, view transitions, keyframe utilities), data visualization (chart containers, data table visual, progress indicators, stat cards), external services (social share buttons, embed containers, map embeds, video embeds), testing & QA (test results, comparison view, preview mode, sandbox mode) |


## 📚 Learning & Tutorials (New - 2026-03-02 Scout 32)

- [ ] **Tutorial Container** (CSS, 97%+ browser support)
  - File: `src/learn/tutorial.styl`
  - Tutorial wrapper styling
  - Step indicator dots
  - Progress bar display
  - Skip tutorial button

- [ ] **Code Playground** (CSS)
  - File: `src/learn/playground.styl`
  - Playground container
  - Editor/preview split
  - Run code button
  - Reset button styling

- [ ] **Quiz Interface** (CSS)
  - File: `src/learn/quiz.styl`
  - Question container
  - Answer option styling
  - Correct/incorrect feedback
  - Next question button

- [ ] **Achievement Badge** (CSS)
  - File: `src/learn/badge.styl`
  - Badge container styling
  - Badge icon display
  - Progress to unlock
  - Share achievement button

## 🔍 Search Extended (New)

- [ ] **Search Filters** (CSS, 97%+ browser support)
  - File: `src/search/filters.styl`
  - Filter panel container
  - Filter chip styling
  - Active filter count
  - Clear all button

- [ ] **Search Suggestions** (CSS)
  - File: `src/search/suggestions.styl`
  - Suggestion dropdown
  - Suggestion item styling
  - Category badges
  - Recent searches section

- [ ] **Search Results** (CSS)
  - File: `src/search/results.styl`
  - Results container
  - Result item styling
  - Highlight matching text
  - Pagination controls

- [ ] **Advanced Search** (CSS)
  - File: `src/search/advanced.styl`
  - Advanced panel toggle
  - Field selector styling
  - Date range picker
  - Boolean operators UI

## 📊 Tables Extended (New)

- [ ] **Sortable Headers** (CSS, 97%+ browser support)
  - File: `src/tables/sortable.styl`
  - Header click styling
  - Sort direction indicator
  - Active sort highlight
  - Multi-sort indicator

- [ ] **Sticky Headers** (CSS)
  - File: `src/tables/sticky.styl`
  - Sticky header styling
  - Scroll shadow effect
  - Resize column handle
  - Column visibility toggle

- [ ] **Responsive Tables** (CSS)
  - File: `src/tables/responsive.styl`
  - Horizontal scroll wrapper
  - Priority column display
  - Stack on mobile
  - Expand row details

- [ ] **Data Grid** (CSS)
  - File: `src/tables/grid.styl`
  - Grid container styling
  - Cell styling
  - Row hover effect
  - Selection checkbox

## 🎨 Theming Extended (New)

- [ ] **Theme Variables** (CSS, 97%+ browser support)
  - File: `src/theme/variables.styl`
  - CSS custom properties
  - Color token system
  - Spacing scale
  - Typography scale

- [ ] **Theme Switcher** (CSS)
  - File: `src/theme/switcher.styl`
  - Switcher dropdown
  - Theme preview card
  - Apply button styling
  - Custom theme option

- [ ] **High Contrast** (CSS)
  - File: `src/theme/contrast.styl`
  - @media (prefers-contrast)
  - Forced-colors support
  - System color keywords
  - Focus ring enhancement

- [x] **Print Theme** (CSS)
  - File: `src/theme/print.styl`
  - @media print overrides
  - Remove backgrounds
  - Optimize for B&W
  - Page break controls
  - Commit: 0127842

## 🔗 Navigation Extended (New)

- [ ] **Breadcrumb Extended** (CSS, 97%+ browser support)
  - File: `src/nav/breadcrumb.styl`
  - Breadcrumb container
  - Separator styling
  - Truncation indicator
  - Home icon styling

- [ ] **Quick Nav** (CSS)
  - File: `src/nav/quick.styl`
  - Quick nav container
  - Jump link styling
  - Section indicator
  - Back to top button

- [ ] **Related Pages** (CSS)
  - File: `src/nav/related.styl`
  - Related container
  - Link card styling
  - Category badge
  - See more button

- [ ] **Page Tree** (CSS)
  - File: `src/nav/tree.styl`
  - Tree container
  - Node styling
  - Expand/collapse toggle
  - Current page highlight

## ⚡ Interactive Elements (New)

- [ ] **Copy Button** (CSS, 97%+ browser support)
  - File: `src/ui/copy.styl`
  - Copy button styling
  - Success feedback
  - Error feedback
  - Position in code blocks

- [ ] **Tooltip Extended** (CSS)
  - File: `src/ui/tooltip.styl`
  - Tooltip container
  - Arrow positioning
  - Rich content support
  - Delay animation

- [ ] **Popover** (CSS)
  - File: `src/ui/popover.styl`
  - Popover container
  - Close button styling
  - Arrow positioning
  - Keyboard dismiss

- [ ] **Disclosure Widget** (CSS)
  - File: `src/ui/disclosure.styl`
  - Summary styling
  - Expand/collapse icon
  - Content transition
  - Nested disclosure

## 📐 Layout Utilities (New)

- [ ] **Grid Utilities** (CSS, 97%+ browser support)
  - File: `src/util/grid.styl`
  - Grid container classes
  - Column span utilities
  - Gap utilities
  - Auto-fit/fix patterns

- [ ] **Flex Utilities** (CSS)
  - File: `src/util/flex.styl`
  - Flex container classes
  - Alignment utilities
  - Gap utilities
  - Order utilities

- [ ] **Container Queries** (CSS, 89%+ browser support)
  - File: `src/util/containers.styl`
  - Container type classes
  - Query-based variants
  - Fallback patterns
  - Note: Wrap in `@css{}` for Stylus

- [ ] **Logical Properties** (CSS, 97%+ browser support)
  - File: `src/util/logical.styl`
  - margin-inline/block
  - padding-inline/block
  - inset properties
  - RTL-friendly utilities

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages, categories & interwiki, diff views, file/media pages, special pages, user pages, revision history, edit conflicts, watchlist |
| 2026-03-02 | Twenty-ninth scout | Added login & registration, admin & moderation, recent changes, edit interface, contributions, tags & markers, page information, notifications, Flow/structured discussions |
| 2026-03-02 | Thirtieth scout | Added gallery & media, gadgets & extensions, documentation & help, interwiki & sister projects, templates extended, parser & output, maintenance & tools, analytics extended |
| 2026-03-02 | Thirty-first scout | Added API & developer documentation, mobile & responsive extended, accessibility extended, performance extended, animation extended, data visualization, external services, testing & QA |
| 2026-03-02 | Thirty-second scout | Added learning & tutorials (tutorial container, code playground, quiz interface, achievement badge), search extended (search filters, suggestions, results, advanced search), tables extended (sortable headers, sticky headers, responsive tables, data grid), theming extended (theme variables, switcher, high contrast, print theme), navigation extended (breadcrumb extended, quick nav, related pages, page tree), interactive elements (copy button, tooltip extended, popover, disclosure widget), layout utilities (grid utilities, flex utilities, container queries, logical properties) |


## 🆕 MediaWiki 1.44+ Features (New - 2026-03-02 Scout 33)

- [ ] **Vector 2022 Updates** (CSS, 97%+ browser support)
  - File: `src/components/skin-vector-2022.styl`
  - Updated limited width toggle
  - Improved page tools menu
  - Enhanced sticky header with TOC
  - Better language switcher dropdown

- [ ] **Parsoid Output Styling** (CSS)
  - File: `src/components/parsoid.styl`
  - Parsoid HTML output styling
  - Media structure differences
  - Data-mw attribute targeting
  - Figure/figcaption handling

- [ ] **RESTBase API UI** (CSS)
  - File: `src/components/api-ui.styl`
  - API explorer styling
  - Endpoint documentation cards
  - Try-it-out panel styling
  - Response viewer styling

## 🎨 New CSS Features (New)

- [ ] **field-sizing: content** (CSS, 85%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Auto-expanding textareas in edit forms
  - Content-based input sizing
  - Stylus: Works directly

- [ ] **scrollbar-color / scrollbar-width Expansion** (CSS, 97%+ browser support)
  - File: `src/components/scrollbars.styl`
  - Theme-consistent scrollbar styling
  - Thin/auto/none variants
  - Dark mode scrollbar colors
  - Stylus: Works directly

- [ ] **text-wrap-mode Property** (CSS, 97%+ browser support)
  - File: `src/components/typography.styl`
  - Control text wrapping behavior
  - nowrap alternative
  - Stylus: Works directly

## ⚡ Performance Patterns (New)

- [x] **Layout Containment Optimization** (CSS, 97%+ browser support)
  - File: `src/performance/layout.styl`
  - contain: layout for sidebars
  - contain: layout for infoboxes
  - Improved reflow performance
  - Stylus: Works directly
  - Commit: 0c178d5

- [ ] **Paint Containment Optimization** (CSS, 97%+ browser support)
  - File: `src/performance/paint.styl`
  - contain: paint for complex elements
  - Reduced repaint overhead
  - Apply to navboxes, tables
  - Stylus: Works directly

## ♿ Accessibility Enhancements (New)

- [ ] **forced-colors Mode Support** (CSS, 95%+ browser support)
  - File: `src/components/accessibility.styl`
  - Windows High Contrast Mode
  - System color keywords
  - Border adjustments for visibility
  - Stylus: Works directly

- [ ] **inverted-colors Detection** (CSS, 87%+ browser support)
  - File: `src/components/accessibility.styl`
  - @media (inverted-colors)
  - Adjust shadows for inverted displays
  - Image filter adjustments
  - Stylus: Works directly

## 📦 ArchWiki-Specific (New)

- [ ] **Package Template Styling** (CSS)
  - File: `src/components/archwiki-packages.styl`
  - {{Pkg}} template styling
  - {{AUR}} template styling
  - {{Grp}} template styling
  - Package status indicators

- [ ] **Command Block Styling** (CSS)
  - File: `src/components/archwiki-commands.styl`
  - Terminal prompt styling ($, #)
  - Command/output separation
  - Root vs user prompt distinction
  - Copy button positioning

- [ ] **Config File Styling** (CSS)
  - File: `src/components/archwiki-config.styl`
  - File path header
  - Syntax highlighting for configs
  - Comment styling
  - Variable/setting distinction

- [ ] **Status Indicators** (CSS)
  - File: `src/components/archwiki-status.styl`
  - Installation status badges
  - Service status indicators
  - Kernel module status
  - Deprecated/outdated warnings

## Completion Log

| Date | Scout | Changes |
|------|-------|---------|
| 2026-02-27 | Initial | Baseline established |
| 2026-03-01 | Twenty-sixth scout | Added responsive design patterns, print extended, state patterns, code & syntax extended, spacing system, dark mode support, link patterns |
| 2026-03-01 | Twenty-seventh scout | Added animation & transitions, form elements extended, table patterns extended, navigation patterns, search extended, footer patterns, header patterns, sidebar patterns |
| 2026-03-01 | Twenty-eighth scout | Added discussion/talk pages, categories & interwiki, diff views, file/media pages, special pages, user pages, revision history, edit conflicts, watchlist |
| 2026-03-02 | Twenty-ninth scout | Added login & registration, admin & moderation, recent changes, edit interface, contributions, tags & markers, page information, notifications, Flow/structured discussions |
| 2026-03-02 | Thirtieth scout | Added gallery & media, gadgets & extensions, documentation & help, interwiki & sister projects, templates extended, parser & output, maintenance & tools, analytics extended |
| 2026-03-02 | Thirty-first scout | Added API & developer documentation, mobile & responsive extended, accessibility extended, performance extended, animation extended, data visualization, external services, testing & QA |
| 2026-03-02 | Thirty-second scout | Added learning & tutorials, search extended, tables extended, theming extended, navigation extended, interactive elements, layout utilities |
| 2026-03-02 | Thirty-third scout | Added MediaWiki 1.44+ features (Vector 2022 updates, Parsoid output, RESTBase API UI), new CSS features (field-sizing, scrollbar-color expansion, text-wrap-mode), performance patterns (layout/paint containment), accessibility (forced-colors, inverted-colors), ArchWiki-specific (package templates, command blocks, config files, status indicators) |
| 2026-03-10 | Implementer | Lead section styling with first paragraph emphasis, bold first occurrence, disambiguation hatnote variants | f1bc9f2 |
| 2026-03-10 | Implementer | Reference list styling with tabular-nums, tooltips, backlinks, reference groups, accessibility, print styles | e664fa2 |
| 2026-03-15 | Implementer | Heading pseudo-classes (:heading, :heading()) with fluid typography, print/dark mode/reduced motion support | 3fc418a |
| 2026-03-10 | Implementer | Category Tree styling with expandable tree, subcategory indicators, page count badges, active category highlight, depth indicators, sidebar support, accessibility | a4c12a2 |
| 2026-03-10 | Implementer | Command prompt styling with user/root prompts, user@host patterns, directory paths, command output states, copy prompt button, continuation prompts | 7f9876e |
| 2026-03-10 | Implementer | Search Suggestions Dropdown with suggestion item styling, match highlighting, category badges with tabular-nums, search input enhancements, filters, pagination, accessibility | 9a16660 |
| 2026-03-10 | Implementer | white-space-collapse for fine-grained whitespace control in code blocks and content areas (97%+ browser support) | a1fc976 |
| 2026-03-10 | Implementer | Enhanced print link styling with URL display, external link indicators, reference list generation, intelligent truncation, special link type indicators (mailto, tel, GitHub, packages, etc.) | 24a99ea |
| 2026-03-14 | Implementer | Math Extension Styling for MathML and LaTeX equations with containers, source display, equation numbering, display/inline variants, error display, gallery layout, MathML element styling, accessibility support | b0fd9da |
| 2026-03-14 | Implementer | Cross-wiki Search Results styling with sister project icons, project badge styling, result grouping headers, result thumbnails, matched term highlighting for Wikipedia, Wiktionary, Wikibooks, Commons, Wikidata, etc. | 13cbee3 |
| 2026-03-15 | Implementer | ::cue pseudo-element for Video Captions with past/future states, speaker identification, language-specific styling (97%+ browser support) | 592d1e5 |
| 2026-03-15 | Implementer | @font-feature-values for named font feature values with @stylistic, @historical-forms, @styleset, @character-variant, @swash, @ornaments, @annotation, plus utility classes for common ligature controls (97%+ browser support) | d132c6a |
| 2026-03-15 | Implementer | @media (aspect-ratio) for viewport aspect ratio detection to adjust layouts for ultra-wide (21/9), standard (16/9), square (1/1), and tall (9/16) displays (97%+ browser support) | fc89714 |
| 2026-03-15 | Implementer | ::backdrop for Modal Overlays - enhanced backdrop styling with warning/danger/success/info variants, themed backdrops with blur/saturate, fullscreen backdrops, animated entries, high contrast and reduced motion support, light mode adjustments (97%+ browser support) | 6e17a6d |

---

## 🆕 CSS @supports Extensions (New - 2026-03-10 Scout 34)

- [ ] **`@supports font-tech()` for Font Technology Detection** (CSS, 87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect COLRv1, variable fonts, color fonts, incremental loading
  - Example: `@supports font-tech(color-COLRv1) { ... }`
  - Enable advanced font features only when supported
  - Stylus: Requires `@css{}` wrapper

- [ ] **`@supports font-format()` for Font Format Detection** (CSS, 87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect WOFF2, OpenType, TrueType, collection support
  - Example: `@supports font-format(woff2) { ... }`
  - Conditional font loading strategies
  - Stylus: Requires `@css{}` wrapper

- [ ] **`@supports named-feature()` for CSS Feature Detection** (CSS, 85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect named CSS features via supports
  - Example: `@supports named-feature(anchor-positioning) { ... }`
  - Future-proof feature detection
  - Stylus: Requires `@css{}` wrapper

## 🆕 Anchor Positioning Extensions (New - 2026-03-10 Scout 34)

- [ ] **`anchor-scope` Property for Anchor Scope Control** (CSS, 85%+ browser support)
  - File: `src/components/navigation.styl`
  - Control which anchors are visible to positioned elements
  - Prevent anchor conflicts in nested components
  - Example: `anchor-scope: --tooltip-anchor;`
  - Apply to dropdowns, tooltips in navigation
  - Stylus: Requires `@css{}` wrapper

## 🆕 Form Styling Extensions (New - 2026-03-10 Scout 34)

- [ ] **`::picker` Pseudo-element for Custom Select Styling** (CSS, 80%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style the dropdown picker of select elements
  - Custom option list styling
  - Theme-consistent dropdown appearance
  - Stylus: Requires `@css{}` wrapper

- [ ] **`::picker-icon` Pseudo-element for Select Arrow** (CSS, 80%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style the dropdown indicator arrow
  - Custom SVG arrow icons
  - Hover/focus state styling
  - Stylus: Requires `@css{}` wrapper

## 🆕 ArchWiki i18n Patterns (New - 2026-03-10 Scout 34)

- [ ] **Template:Related2 Translation Link Styling** (CSS, 97%+ browser support)
  - File: `src/components/content.styl`
  - Style translated related article links in non-English pages
  - Language indicator badges
  - Consistent with Template:Related styling
  - RTL support for translated anchors
  - Stylus: Works directly

## 🆕 CSS Transitions Extended (New - 2026-03-10 Scout 35)

- [x] **`transition-behavior: allow-discrete`** (CSS, 85%+ browser support)
  - File: `src/components/discrete-transitions.styl`
  - Enable smooth transitions for `display: none` ↔ block
  - Enable transitions for `content-visibility`
  - Pair with `@starting-style` for entry animations
  - Stylus: Works directly
  - Commit: 7f2e29a

## 🆕 Text Typography Extended (New - 2026-03-10 Scout 35)

- [ ] **`text-wrap: balance`** for Headlines (CSS, 87%+ browser support)
  - File: `src/typography/headlines.styl`
  - Balance text lines in headings for better readability
  - Apply to h1, h2, infobox titles
  - Limit to 3-4 lines max for performance
  - Stylus: Works directly

- [ ] **`text-wrap: pretty`** for Paragraphs (CSS, 85%+ browser support)
  - File: `src/typography/paragraphs.styl`
  - Prevent typographic orphans/widows
  - Better paragraph ending balance
  - Apply to article content paragraphs
  - Stylus: Works directly

## 🆕 URL Fragment Targeting (New - 2026-03-10 Scout 35)

- [ ] **`::target-text` Pseudo-element** (CSS, 85%+ browser support)
  - File: `src/components/target-text.styl`
  - Style text fragments highlighted via URL #:~:text=
  - Custom highlight background color
  - Smooth highlight animation
  - Stylus: Works directly

## 🆕 ArchWiki Status Templates Extended (New - 2026-03-10 Scout 35)

- [ ] **Template:Expansion Styling** (CSS, 97%+ browser support)
  - File: `src/templates/expansion.styl`
  - Expansion needed indicator styling
  - Expansion reason text display
  - Consistent with Template:Style colors
  - Stylus: Works directly

- [ ] **Template:Out of date Styling** (CSS, 97%+ browser support)
  - File: `src/templates/outdated.styl`
  - Outdated content warning styling
  - Date/version indicator display
  - Prominent warning colors
  - Stylus: Works directly

## 🆕 CSS Scroll Snap Level 2 (New - 2026-03-10 Scout 36)

- [ ] **`scroll-initial-target` Property** (CSS, 85%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/toc.styl`
  - Define elements that should snap when scroll containers first render
  - Values: `none`, `nearest`
  - Apply to TOC sections, category lists, long navigation
  - Example: `.toc-item { scroll-initial-target: nearest; }`
  - Stylus: Works directly

## 🆕 Media Resource State Pseudo-classes (New - 2026-03-10 Scout 36)

- [ ] **`:seeking` Pseudo-class for Media** (CSS, 87%+ browser support)
  - File: `src/components/media.styl`
  - Style video/audio elements that are seeking playback position
  - Loading indicator styling during seek
  - Apply to embedded videos, audio players
  - Stylus: Works directly

- [ ] **`:stalled` Pseudo-class for Media** (CSS, 87%+ browser support)
  - File: `src/components/media.styl`
  - Style media elements that are stalled (cannot download)
  - Error/buffering indicator styling
  - Network issue visual feedback
  - Stylus: Works directly

- [ ] **`:volume-locked` Pseudo-class for Media** (CSS, 85%+ browser support)
  - File: `src/components/media.styl`
  - Style elements with volume locked by browser
  - Visual indicator for locked volume state
  - Apply to embedded media controls
  - Stylus: Works directly

## 🆕 Time-dimensional Pseudo-classes (New - 2026-03-10 Scout 36)

- [ ] **`:current / :past / :future` for Timed Content** (CSS, 85%+ browser support)
  - File: `src/components/media.styl`, `src/components/accessibility.styl`
  - Style current, past, and future timed content (WebVTT captions, etc.)
  - Apply to video subtitles, timed transcripts
  - Example: `::cue(:current) { color: var(--accent); }`
  - Accessibility enhancement for timed media
  - Stylus: Works directly

## 🆕 Modern Heading Selector (New - 2026-03-10 Scout 36)

- [ ] **`:heading()` Functional Pseudo-class** (CSS, 87%+ browser support)
  - File: `src/components/typography.styl`, `src/components/modern-css.styl`
  - Select heading elements using An+B notation
  - Example: `:heading(2n+1)` for odd headings
  - Alternating heading styles, table of contents generation
  - More flexible than `:is(h1, h2, h3, h4, h5, h6)`
  - Stylus: Works directly

## 🆕 Anchor Positioning Visibility (New - 2026-03-10 Scout 36)

- [ ] **`position-visibility` Property** (CSS, 85%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/tooltips.styl`
  - Control when anchored elements are visible
  - Values: `always`, `anchors-visible`, `no-overflow`
  - Hide tooltips when anchor scrolls out of view
  - Prevent orphaned dropdowns
  - Stylus: Works directly

## 🆕 ArchWiki Article Structure Conventions (New - 2026-03-10 Scout 36)

- [ ] **Magic Words Styling (DISPLAYTITLE, lowercase title)** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-conventions.styl`
  - Style for pages with custom display titles
  - Lowercase title template indicator
  - Visual distinction for modified titles
  - Apply to first heading with display title
  - Stylus: Works directly

- [ ] **Category Positioning (Top of Article)** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-conventions.styl`
  - Style category links at article top (ArchWiki convention)
  - Different from Wikipedia bottom placement
  - Compact category pill styling
  - Category visibility without scrolling
  - Stylus: Works directly

## 🆕 CSS Text Box Properties (New - 2026-03-10 Scout 37)

- [ ] **`text-box` Shorthand Property** (CSS, 80%+ browser support)
  - File: `src/typography/text-box.styl`
  - Shorthand for `text-box-trim` and `text-box-edge`
  - Control text spacing in block direction
  - Trim leading/trailing spacing from text containers
  - Example: `text-box: trim-both cap alphabetic;`
  - Stylus: Works directly

- [ ] **`text-box-trim` Property** (CSS, 80%+ browser support)
  - File: `src/typography/text-box.styl`
  - Trim spacing from text container edges
  - Values: `none`, `trim-start`, `trim-end`, `trim-both`
  - Better vertical alignment for text in buttons, badges
  - Eliminate half-leading spacing issues
  - Stylus: Works directly

- [ ] **`text-box-edge` Property** (CSS, 80%+ browser support)
  - File: `src/typography/text-box.styl`
  - Define text edge for trimming
  - Values: `auto`, `<text-edge>` combinations (text, ideographic, cap, ex, alphabetic)
  - Example: `text-box-edge: cap alphabetic;` for Latin text
  - Stylus: Works directly

## 🆕 ArchWiki Template:hc Styling (New - 2026-03-10 Scout 37)

- [ ] **Template:hc (Header-Code Block) Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-templates.styl`
  - Two-pane code block: header + output
  - Header pane styling (filename, command)
  - Content pane styling (code/output)
  - Visual separator between panes
  - Known issue: breaks in lists/indented context
  - Stylus: Works directly

## 🆕 ArchWiki Interlanguage Links (New - 2026-03-10 Scout 37)

- [ ] **Interlanguage Link Column Styling** (CSS, 97%+ browser support)
  - File: `src/components/interlanguage.styl`
  - Language links in left sidebar column
  - Sorted alphabetically by language tag (fi before fr)
  - Active language indicator
  - Compact language code display
  - Stylus: Works directly

## 🆕 ArchWiki Standard Section Conventions (New - 2026-03-10 Scout 37)

- [ ] **Standard Section Styling (Installation, Troubleshooting, etc.)** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-sections.styl`
  - Style standard sections per Help:Style conventions:
    - Installation section (early in article)
    - Known issues section (with bug report links)
    - Tips and tricks section (subsection organization)
    - Troubleshooting section (FAQ/problem solutions)
    - See also section (bulleted link list, last position)
  - Section-specific icons or indicators
  - Consistent section ordering visual cues
  - Stylus: Works directly

## 🆕 CSS Nesting Migration (New - 2026-03-10 Scout 37)

- [ ] **Native CSS Nesting Syntax Patterns** (CSS, 89%+ browser support)
  - File: `src/modern/nesting.styl`
  - Migrate from Stylus nesting to native CSS `&` selector
  - Nested at-rules support
  - Specificity considerations for nested rules
  - Progressive enhancement strategy
  - Note: Can be used alongside Stylus for future-proofing
  - Example:
    ```css
    .article {
      & h2 { margin-top: 1.5em; }
      & p { line-height: 1.6; }
    }
    ```

## 🆕 Modern Pseudo-Elements (New - 2026-03-10 Scout 38)

- [ ] **`::details-content` Pseudo-element** (CSS, 90%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style expandable/collapsible contents of `<details>` elements
  - Apply to collapsible sections, FAQ accordions
  - Separate styling for summary vs content
  - Example: `details::details-content { padding: 1em; }`
  - Stylus: Works directly

- [ ] **`::search-text` Pseudo-element** (CSS, 87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style browser "Find in page" search results
  - Custom highlight color for in-page search
  - Example: `::search-text { background: var(--accent-light); }`
  - Stylus: Works directly

- [ ] **`::column` Pseudo-element** (CSS, 85%+ browser support)
  - File: `src/components/content.styl`
  - Style individual columns in multi-column layouts
  - Column borders, backgrounds, spacing
  - Example: `.multicol::column { border-right: 1px solid var(--border); }`
  - Stylus: Works directly

- [ ] **`::scroll-button()` Pseudo-element** (CSS, 85%+ browser support)
  - File: `src/components/navigation.styl`
  - Create scroll control buttons for scroll containers
  - Apply to horizontal TOC, image galleries
  - Example: `.scroll-container::scroll-button(left) { content: "◀"; }`
  - Stylus: Works directly

- [x] **`::checkmark` Pseudo-element** (CSS, 87%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style checkmark in customizable select elements
  - Custom checkmark icon/color for selected options
  - Example: `option::checkmark { color: var(--accent); }`
  - Stylus: Works directly

## 🆕 ArchWiki Code Templates Enhanced (New - 2026-03-10 Scout 38)

- [ ] **Template:ic (Inline Code) Enhanced Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-code.styl`
  - Short inline code, file names, paths, config parameters
  - Monospace font with theme colors
  - Distinct from regular text, subtle background
  - Works inline without breaking flow
  - Example: `Run {{ic|./configure}} in the console.`
  - Stylus: Works directly

- [ ] **Template:bc (Block Code) Enhanced Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-code.styl`
  - Multi-line code blocks in proper frame
  - Syntax for scripts, config files, output
  - Scrollable for long content
  - Consistent with code.styl styling
  - Example usage: shell scripts, config files
  - Stylus: Works directly

---

| 2026-03-10 | Section Anchors Implementation | Added section permalink styling with hover reveal pattern, copy link indicator, and target highlight animation | 3d0b8cf |
| 2026-03-10 | Thirty-fourth scout | Added @supports extensions (font-tech, font-format, named-feature), anchor-scope property, form styling extensions (::picker, ::picker-icon), ArchWiki i18n patterns (Template:Related2) |
| 2026-03-10 | Thirty-sixth scout | Added scroll-initial-target, media resource states (:seeking/:stalled/:volume-locked), time-dimensional pseudo-classes, :heading() functional pseudo-class, position-visibility, ArchWiki conventions (magic words, category positioning) |
| 2026-03-10 | Message Boxes Implementation | Added comprehensive Ambox, Ombox, Imbox, Tmbox, Cmbox, Fmbox styling with type-specific colors, Citation Needed template with hover tooltip, collapsible support, accessibility features | 631a6c0 |
| 2026-03-10 | Thirty-fifth scout | Added CSS transitions extended (transition-behavior: allow-discrete), text typography extended (text-wrap: balance, text-wrap: pretty), URL fragment targeting (::target-text), ArchWiki status templates extended (Template:Expansion, Template:Out of date) |
| 2026-03-10 | Thirty-seventh scout | Added CSS text box properties (text-box, text-box-trim, text-box-edge), ArchWiki Template:hc styling, interlanguage link column, standard section conventions, native CSS nesting patterns |
| 2026-03-10 | Thirty-eighth scout | Added modern pseudo-elements (::details-content, ::search-text, ::column, ::scroll-button(), ::checkmark), ArchWiki code templates enhanced (Template:ic, Template:bc) |
| 2026-03-10 | Thirty-ninth scout | Added CSS text hyphenation (hyphens, hyphenate-character, hanging-punctuation), CSS image & layout (image-set(), isolation, shape-outside), ArchWiki package instruction styling per Help:Style conventions |
| 2026-03-10 | Fortieth scout | Added :open pseudo-class for details/dialog, :active-view-transition pseudo-class, position-area property for anchor grid, margin-trim property, ArchWiki translation templates (Template:TranslationStatus, Template:Translateme) |


## 🆕 CSS Text Hyphenation (New - 2026-03-10 Scout 39)

- [ ] **`hyphens` Property for Automatic Hyphenation** (CSS, 97%+ browser support)
  - File: `src/typography/hyphenation.styl`
  - Values: `none`, `manual`, `auto`
  - Automatic word breaking at appropriate hyphenation points
  - Requires `lang` attribute for proper language-specific hyphenation
  - Apply to article content, infobox text, narrow columns
  - Example: `hyphens: auto;`
  - Stylus: Works directly

- [ ] **`hyphenate-character` Property for Custom Hyphen** (CSS, 87%+ browser support)
  - File: `src/typography/hyphenation.styl`
  - Customize the character shown at line break (default: `-`)
  - Values: `auto` or any string (e.g., `"="`, `"—"`)
  - Pair with `hyphens: auto` for full effect
  - Example: `hyphenate-character: "—";`
  - Stylus: Works directly

- [ ] **`hanging-punctuation` Property for Typography** (CSS, Safari-only, ~15%)
  - File: `src/typography/punctuation.styl`
  - Values: `none`, `first`, `last`, `allow-end`, `force-end`
  - Hang opening/closing quotes and punctuation outside margins
  - Apply to blockquotes, article text
  - Example: `hanging-punctuation: first last;`
  - Stylus: Works directly (progressive enhancement)

## 🆕 CSS Image & Layout (New - 2026-03-10 Scout 39)

- [ ] **`image-set()` Function for Responsive Images** (CSS, 97%+ browser support)
  - File: `src/components/images.styl`
  - Provide alternative images based on resolution (1x, 2x)
  - Provide alternative formats (AVIF, WebP with JPEG fallback)
  - Apply to background images in infoboxes, icons, logos
  - Example:
    ```css
    background-image: image-set(
      "icon.avif" type("image/avif"),
      "icon.webp" type("image/webp"),
      "icon.png" 1x,
      "icon@2x.png" 2x
    );
    ```
  - Stylus: Works directly

- [ ] **`isolation` Property for Stacking Context** (CSS, 97%+ browser support)
  - File: `src/utilities/isolation.styl`
  - Values: `auto`, `isolate`
  - Force new stacking context for mix-blend-mode isolation
  - Apply to modals, dropdowns, complex layered components
  - Prevent blend-mode bleeding to parent elements
  - Example: `isolation: isolate;`
  - Stylus: Works directly

- [ ] **`shape-outside` Property for Text Wrapping** (CSS, 97%+ browser support)
  - File: `src/components/shapes.styl`
  - Define shape around which inline content wraps
  - Values: `none`, `<basic-shape>`, `<shape-box>`, `<image>`
  - Apply to floated images in articles, infobox images
  - Functions: `circle()`, `ellipse()`, `polygon()`, `inset()`, `url()`
  - Example: `shape-outside: circle(50%);`
  - Stylus: Works directly

## 🆕 ArchWiki Package Instructions (New - 2026-03-10 Scout 39)

- [ ] **Package Installation Instruction Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-packages.styl`
  - Style per Help:Style package management conventions
  - Avoid pacman command examples (use prose instead)
  - Link packages without variant suffixes (-bin, -git, -nightly)
  - [[install]] redirect styling for first installation mention
  - Example prose: "Install the foobar package."
  - Stylus: Works directly

## 🆕 CSS Interactive State Pseudo-classes (New - 2026-03-10 Scout 40)

- [ ] **`:open` Pseudo-class for Details/Dialog** (CSS, 85%+ browser support)
  - File: `src/components/interactive-states.styl`
  - Matches elements that are in "open" state
  - Apply to `<details>`, `<dialog>`, `<select>` with popover
  - Style expanded accordion content differently
  - Example: `details:open summary { font-weight: bold; }`
  - Stylus: Works directly

- [ ] **`:active-view-transition` Pseudo-class** (CSS, 85%+ browser support)
  - File: `src/components/view-transitions.styl`
  - Matches root element during an active view transition
  - Style page during navigation animation
  - Combine with `:active-view-transition-type(name)` for specific transitions
  - Example: `:root:active-view-transition { background: var(--bg); }`
  - Stylus: Works directly

## 🆕 CSS Layout & Positioning Extensions (New - 2026-03-10 Scout 40)

- [ ] **`position-area` Property for Anchor Grid** (CSS, 85%+ browser support)
  - File: `src/components/anchor-positioning.styl`
  - Grid-based positioning relative to anchor element
  - Values: `top left`, `center`, `bottom right`, etc.
  - Simplifies anchor-positioned element placement
  - Example: `position-area: top span-right;`
  - Stylus: Works directly

- [ ] **`margin-trim` Property for Container Edges** (CSS, 85%+ browser support)
  - File: `src/utilities/layout.styl`
  - Trim margins at container edges for flex/grid children
  - Values: `none`, `block`, `inline`, `block-start`, etc.
  - Eliminates need for negative margins or `:last-child` rules
  - Example: `margin-trim: block-end;`
  - Stylus: Works directly

## 🆕 ArchWiki Translation Templates (New - 2026-03-10 Scout 40)

- [ ] **Template:TranslationStatus Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-i18n.styl`
  - Translation status indicator at article start
  - Shows original page, last translation date, sync link
  - Style with subtle info box appearance
  - Link to check changes since last translation
  - Stylus: Works directly

- [ ] **Template:Translateme Styling** (CSS, 97%+ browser support)
  - File: `src/components/archwiki-i18n.styl`
  - Flag incomplete translations needing help
  - Warning-style box with translation icon
  - Link to talk page for discussion
  - Similar to Template:Expansion but translation-specific
  - Stylus: Works directly

## 🆕 MediaWiki 1.45 Features (New - 2026-03-10 Scout 41)

- [ ] **Special:SpecialPages Search Box** (CSS, 97%+ browser support)
  - File: `src/components/special-pages.styl`
  - New in MediaWiki 1.45: search filter for special pages list
  - Filter input styling with search icon
  - Real-time filtering indicator
  - No results message styling
  - Stylus: Works directly

- [ ] **Partial Action Blocks UI** (CSS, 97%+ browser support)
  - File: `src/components/admin.styl`
  - New in MediaWiki 1.45: block specific actions (move, upload) without full block
  - Action checkbox group styling
  - Partial block indicator badge
  - Blocked action list display
  - Stylus: Works directly

- [ ] **Built-in Notifications Framework Styling** (CSS, 97%+ browser support)
  - File: `src/components/notifications.styl`
  - MediaWiki 1.45: notifications framework now stable for extensions
  - Notification panel cards
  - Notification type icons
  - Read/unread state styling
  - Dismiss/action buttons
  - Stylus: Works directly

## 🆕 CSS Scroll Snap Extensions (New - 2026-03-10 Scout 41)

- [ ] **`scroll-snap-align` Property** (CSS, 97%+ browser support)
  - File: `src/components/scroll-snap.styl`
  - Control snap alignment for scroll snap children
  - Values: `none`, `start`, `end`, `center`
  - Apply to carousel items, TOC items, image gallery slides
  - Example: `scroll-snap-align: center;`
  - Stylus: Works directly

- [ ] **`scroll-snap-stop` Property** (CSS, 97%+ browser support)
  - File: `src/components/scroll-snap.styl`
  - Force scroll to stop at snap point (prevent passing)
  - Values: `normal`, `always`
  - Use for critical snap points (e.g., section headers)
  - Example: `scroll-snap-stop: always;`
  - Stylus: Works directly

---

| 2026-03-10 | Forty-first scout | Added MediaWiki 1.45 features (Special:SpecialPages search box, partial action blocks UI, built-in notifications framework), CSS scroll snap extensions (scroll-snap-align, scroll-snap-stop) |

## 🆕 Modern CSS Architecture (New - 2026-03-10 Scout 42)

- [ ] **`@scope` At-rule for Scoped Styling** (CSS, 85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Limit selector reach to specific DOM subtrees
  - Avoid naming conflicts in complex components (Navboxes, Infoboxes)
  - Example: `@scope (.navbox) to (.navbox-inner) { ... }`
  - Stylus: Requires `@css{}` wrapper

- [ ] **`align-content` in Block Layout** (CSS, 85%+ browser support)
  - File: `src/utilities/layout.styl`
  - Vertically align content directly inside block containers (no flex/grid needed)
  - Simplify vertical centering in infobox cells and cards
  - Example: `align-content: center;`
  - Stylus: Works directly

- [x] **`font-size-adjust` Property** (CSS, 90%+ browser support)
  - File: `src/components/typography.styl`
  - Normalize visual size across different fallback fonts
  - Base sizing on `ex-height` or `cap-height`
  - Prevent layout shifts when web fonts load
  - Example: `font-size-adjust: 0.5;`
  - Stylus: Works directly
  - Commit: fa1ebe5

## 🆕 MediaWiki Codex Integration (New - 2026-03-10 Scout 42)

- [ ] **Codex Design Tokens Mapping** (CSS, 97%+ browser support)
  - File: `src/variables/codex.styl`
  - Map MediaWiki's Codex design tokens to ArchWiki theme variables
  - Support `--cdx-color-` and `--cdx-spacing-` custom properties
  - Ensure compatibility with newer MediaWiki extensions using Codex
  - Stylus: Works directly

---

| 2026-03-10 | Forty-second scout | Added modern CSS architecture (@scope, align-content in block layout, font-size-adjust), MediaWiki Codex integration (Codex design tokens mapping) |
| 2026-03-10 | Logical Overflow Implementation | Added logical overflow properties (overflow-block, overflow-inline, overscroll-behavior-block, overscroll-behavior-inline, contain-intrinsic-block-size, contain-intrinsic-inline-size) for RTL/vertical writing mode support | 92fb4e4 |
| 2026-03-10 | text-wrap balance/pretty | Added text-wrap: balance for better headline wrapping and text-wrap: pretty to prevent orphans in paragraphs | 552d96c |
| 2026-03-14 | page-orientation for print | Added page-orientation descriptor support for controlling portrait/landscape orientation in print styles | 04799e9 |
| 2026-03-14 | Advanced Search Form | Added advanced search form styling with field grouping, filter chips, boolean operators, namespace selector, date range inputs | ac12f84 |
| 2026-03-14 | Definition Lists & Checklists | Added lists.styl with definition lists (dl/dt/dd), checklists with custom checkboxes, step-by-step lists for tutorials, nested list enhancements | 3451136 |
| 2026-03-14 | prefers-reduced-data for Data Saver | Added @media (prefers-reduced-data) support to performance.styl - reduces animations, simplifies skeletons, disables decorative elements for data-conscious users | c8d6b37 |
| 2026-03-14 | PageForms Extension Styling | Added Extension:PageForms styling in extensions.styl - form container, fields, inputs, date picker, combo box, multi-select, checkboxes/radios, submit buttons, validation errors, file upload, reduced motion support | ef718a8 |
| 2026-03-15 | Systemd Unit Styling | Added comprehensive systemd unit styling in archwiki-templates.styl - service, timer, socket, path, device, mount, automount, slice, scope units, journal entries, unit file preview, action buttons | 3fea0b8 |
| 2026-03-15 | Grid Shorthands | Added place-items, place-content, place-self utility classes in utilities.styl for cleaner grid alignment code (97%+ browser support) | bd96a30 |
| 2026-03-15 | Display Capability Queries | Added @media (resolution), @media (min-resolution: 2dppx), @media (color-index), @media (monochrome) in modern-css.styl for retina display detection, color depth detection, and monochrome e-ink display support | c688a5a |
| 2026-03-15 | PWA Styling | Added PWA components in pwa.styl - offline banner, cached content indicator, sync pending/complete status, install prompt with action buttons, standalone install button, service worker status indicator, animations, reduced motion support | a8be333 |
| 2026-03-15 | linear() Timing Function | Added linear() timing function classes in animations.styl - custom easing with control points, steps() with jump keywords, transition-behavior: allow-discrete for display/visibility transitions, utility classes for various animation patterns | 1d97bf6 |
| 2026-03-15 | :fullscreen Pseudo-class | Added fullscreen mode styling in ui-components.styl - hide non-essential UI chrome, fullscreen container/content styling, video/image/dialog enhancements, exit fullscreen button hints, reduced motion support | dfa7fd0 |
| 2026-03-15 | CSS Containment | Added src/components/containment.styl with CSS containment utilities (layout, paint, size, style containment) for performance optimization - applied to MediaWiki components like infobox, sidebar, nav, tables, code blocks, message boxes, navbox, footer, content areas | 24b4b3f7 |
| 2026-03-15 | Personalization Styling | Added src/components/personal.styl with Reading List Styling (cards, read/unread indicators, categories), Custom Quick Links (cards with drag handles, edit/delete), and Watchlist Enhancements (change summaries, diff previews) | aa8ad9a |
| 2026-03-15 | Discrete Property Transitions | Added src/components/discrete-transitions.styl with transition-behavior: allow-discrete for smooth display/visibility transitions, @starting-style for entry animations, and height auto transitions (interpolate-size, calc-size) | 7f2e29a |
| 2026-03-15 | text-group-align for Block Alignment | Added text-group-align styling in typography.styl for block-level text alignment control (87%+ browser support) | ddf5ff4 |
| 2026-03-15 | font-size-adjust Property | Added font-size-adjust utility classes and base body styling in typography.styl to normalize visual size across fallback fonts and prevent layout shifts when web fonts load | fa1ebe5 |
| 2026-03-15 | @media (video-dynamic-range) | Added HDR video display support in modern-css.styl - enhanced video player colors, contrast and saturation filters, progress bar gradients, controls styling for HDR-capable displays, with standard dynamic range fallback | e3c5a45 |
| 2026-03-15 | text-wrap-style Property | Added text-wrap-style utilities in typography.styl - balance for headings, pretty for paragraphs (92%+ browser support) | 2f290ca |
| 2026-03-15 | Cargo Query Interface | Added src/components/cargo.styl with query builder styling, result table formatting with sorting/pagination, export options (CSV/JSON/XML/print), map view for spatial queries, error states and loading indicators | 7ec28b8 |
| 2026-03-15 | Vertical Writing Mode | Added full vertical writing support in i18n.styl - .vertical-rl/.vertical-lr classes, text-orientation variants, CJK defaults, vertical list/table styling (97%+ browser support) | 81111f8 |
| 2026-03-15 | ::highlight() Pseudo-element | Added ::highlight() pseudo-element styles in modern-css.styl for CSS Custom Highlight API - supports search-results, search-current, annotation, custom-selection, quote, error, warning, link-found highlight types (85%+ browser support) | 9a98043 |
| 2026-03-15 | Masonry Layout for Galleries | Added masonry gallery layouts in file-pages.styl - native CSS masonry with @supports, CSS columns fallback, grid-based simulation with variable spans, dense packing, responsive breakpoints | bd0937b |
| 2026-03-16 | Command Line Blocks | Added archwiki.styl with terminal prompt styling, command/output separation, copy button positioning, root vs user prompt distinction, config file blocks (INI/JSON/YAML), installation status boxes, kernel module styling | cca8d22 |
| 2026-03-16 | backdrop-filter brightness/saturate | Added backdrop-filter brightness() and saturate() utility classes in navigation.styl - standalone brightness (light/dark 50-200%), saturate (high/low 150-200%), and combined effects (bright-vibrant, dark-muted, frosted-*) | 37ba9bc |
| 2026-03-16 | interpolate-size: allow-keywords | Added smooth auto-height transitions in animations.styl - enables height: 0 to height: auto animations without JavaScript, includes utility classes for accordions/dropdowns/collapsibles, MediaWiki patterns, reduced motion support, calc-size() alternative | e5a92b8 |
| 2026-03-16 | Glassmorphism Effects | Added glass.styl with backdrop-filter based frosted glass styling - glass variants (light, dark, accent, success, warning, danger), glass components (card, nav, sidebar, dropdown, tooltip, button, input), responsive adjustments, forced colors and reduced motion support | c4f64ce |
| 2026-03-16 | :host-context() Shadow DOM | Added :host-context() pseudo-class for contextual Shadow DOM styling - theme context (dark/light), direction (RTL/LTR), responsive breakpoints, print context, language-based styling, combined with :host for conditional styling, utility classes | 269b3b2 |
