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

## 📰 Multi-Column Layouts

- [x] **`column-count` for Multi-Column Content**
  - Browser support: 97%+
  - Multi-column layouts for TOC, related articles, link lists
  - Responsive column count with column-width
  - File: `src/components/content.styl`, `src/components/navigation.styl`
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

---

Last updated: 2026-03-01 06:05
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

- [ ] **Edit Section Link Styling** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/content.styl`
  - Hover-reveal edit links
  - `:hover` on section shows edit button
  - Consistent with theme icons

- [ ] **Table of Contents Enhancements** (CSS)
  - File: `src/components/navigation.styl`, `toc.styl`
  - Collapsible TOC with smooth animations
  - Current section highlighting via scroll-spy
  - Number alignment with tabular-nums

- [ ] **Infobox Layout Improvements** (CSS)
  - File: `src/components/tables.styl`
  - Responsive infobox on mobile
  - Image aspect-ratio enforcement
  - Better data label/value alignment

- [ ] **Related Articles Section** (CSS)
  - File: `src/components/content.styl`
  - Card-style related article links
  - Hover preview effects
  - Consistent with navigation styling

- [ ] **Category Tag Styling** (97%+ browser support)
  - File: `src/components/content.styl`
  - Pill-style category links
  - `border-radius` + `background`
  - Hover state with accent

## ♿ Accessibility Improvements (New)

- [ ] **Skip Link Styling** (100% browser support)
  - Browser support: 100%
  - File: `src/components/accessibility.styl`
  - Visible on focus, hidden otherwise
  - High contrast for keyboard users
  - Smooth scroll to target

- [ ] **Focus Order Indicators** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/accessibility.styl`
  - Sequential focus indicators
  - `:focus-visible` with clear outline
  - Consistent across all interactive elements

- [ ] **Error/Warning Message Styling** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/boxes.styl`
  - Clear visual distinction
  - Icon + color coding
  - `role="alert"` compatible styling

- [ ] **Reduced Motion Alternative Animations** (95%+ browser support)
  - Browser support: 95%+
  - File: `src/components/accessibility.styl`
  - `@media (prefers-reduced-motion: reduce)`
  - Fade-only alternatives to slide animations
  - Instant transitions where appropriate

## 🖨️ Print Enhancements (New)

- [ ] **Print-Only Link URLs** (100% browser support)
  - Browser support: 100%
  - File: `src/components/print.styl`
  - `@media print { a[href]::after { content: " (" attr(href) ")"; } }`
  - Visible link destinations in print

- [ ] **Page Break Control** (97%+ browser support)
  - Browser support: 97%+
  - File: `src/components/print.styl`
  - `break-inside: avoid` for infoboxes, code blocks
  - `break-before: page` for major sections
  - Prevent orphaned headings

- [ ] **Print Header/Footer** (CSS)
  - File: `src/components/print.styl`
  - `@page` with margin adjustments
  - Article title in header
  - Page numbers in footer


## 📋 Special Pages Styling (New)

- [ ] **Search Results Page Enhancements** (CSS)
  - Browser support: 97%+
  - File: `src/components/special-pages.styl` (new file)
  - Search result item styling
  - Match highlighting in snippets
  - Advanced search form styling

- [ ] **Category Page Grid Layout** (CSS)
  - File: `src/components/special-pages.styl`
  - Category member grid/list toggle
  - Subcategory cards
  - Page count badges with tabular-nums

- [ ] **Special:AllPages/Special:PrefixIndex** (CSS)
  - File: `src/components/special-pages.styl`
  - Alphabetical navigation styling
  - Namespace selector
  - Page list with hover states

- [ ] **User Contributions Page** (97%+ browser support)
  - File: `src/components/special-pages.styl`
  - Contribution list styling
  - Date grouping with tabular-nums timestamps
  - Edit summary highlighting

- [ ] **Special:WhatLinksHere** (CSS)
  - File: `src/components/special-pages.styl`
  - Backlinks list styling
  - Redirect badge styling
  - Namespace filtering UI

## 📝 Edit & History Pages (New)

- [ ] **Diff View Styling** (CSS)
  - File: `src/components/diff.styl` (new file)
  - Added/removed line highlighting
  - Inline diff indicators
  - Side-by-side diff layout for wide screens

- [ ] **Edit History List** (97%+ browser support)
  - File: `src/components/history.styl` (new file)
  - Revision row styling
  - User avatar/link styling
  - Timestamp with tabular-nums
  - Rollback/undo button styling

- [ ] **Edit Form Enhancements** (CSS)
  - File: `src/components/forms-enhanced.styl`
  - Summary input styling
  - Minor edit checkbox
  - Preview/show changes tabs
  - Edit toolbar button styling

- [ ] **Page Move Form** (CSS)
  - File: `src/components/forms-enhanced.styl`
  - New title input
  - Reason textarea
  - Talk page move option

## 💬 Discussion Pages (New)

- [ ] **Talk Page Formatting** (CSS)
  - File: `src/components/discussion.styl` (new file)
  - Indentation levels visual distinction
  - User signature styling
  - Timestamp formatting with tabular-nums

- [ ] **Reply Thread Styling** (CSS)
  - File: `src/components/discussion.styl`
  - Thread collapse/expand indicators
  - New messages indicator
  - Archive notice styling

- [ ] **User Talk Notification** (CSS)
  - File: `src/components/discussion.styl`
  - New message banner
  - Orange bar indicator
  - Dismiss button styling

## 📁 File & Media Pages (New)

- [ ] **File Description Page** (CSS)
  - File: `src/components/file-pages.styl` (new file)
  - File history table styling
  - MIME type badge
  - File usage list

- [ ] **Image Gallery Layout** (97%+ browser support)
  - File: `src/components/file-pages.styl`
  - Gallery grid with aspect-ratio
  - Caption truncation with line-clamp
  - Hover zoom effect

- [ ] **Video Player Styling** (CSS)
  - File: `src/components/file-pages.styl`
  - Custom play button overlay
  - Progress bar theming
  - Fullscreen button styling

## 👤 User Pages (New)

- [ ] **User Page Layout** (CSS)
  - File: `src/components/user-pages.styl` (new file)
  - User profile box
  - Babel box styling
  - User contribution stats

- [ ] **User Menu Dropdown** (CSS)
  - File: `src/components/user-pages.styl`
  - User dropdown menu styling
  - Notification count badge
  - Preferences/logout links

## 🔗 Link Types (New)

- [ ] **Interwiki Link Indicators** (CSS)
  - File: `src/components/links.styl` (new file)
  - External link icon (arrow)
  - Interwiki icon styling
  - Secure/insecure indicator

- [ ] **Redirect Pages** (CSS)
  - File: `src/components/links.styl`
  - Redirect notice styling
  - Target page preview on hover
  - Redirect category badge

- [ ] **Disambiguation Links** (CSS)
  - File: `src/components/links.styl`
  - Disambiguation page indicator
  - Hatnote styling refinements
  - "May refer to" formatting

- [ ] **Broken/Red Links** (97%+ browser support)
  - File: `src/components/links.styl`
  - Red link styling with consistent color
  - Hover state indicating "create page"
  - Different shade for nonexistent vs. broken

## 📦 Message Boxes (New)

- [ ] **Ambox (Article Message Box) Refinement** (CSS)
  - File: `src/components/message-boxes.styl` (new file)
  - Ambox type colors (warning, info, etc.)
  - Icon alignment
  - Mobile responsive layout

- [ ] **Ombox/Imbox/Tmbox Styling** (CSS)
  - File: `src/components/message-boxes.styl`
  - Consistent styling across message box types
  - Type-specific color coding
  - Collapsible notice boxes

- [ ] **Citation Needed Template** (CSS)
  - File: `src/components/message-boxes.styl`
  - Inline citation needed styling
  - Hover explanation tooltip
  - Dismiss for logged-in users

## 📖 Article Structure (New)

- [ ] **Lead Section Styling** (CSS)
  - File: `src/components/content.styl`
  - First paragraph emphasis
  - Bold first occurrence styling
  - Disambiguation hatnote

- [ ] **Section Anchors** (97%+ browser support)
  - File: `src/components/content.styl`
  - Section link permalink styling
  - Hover reveal pattern
  - Copy link action

- [ ] **Reference List Styling** (CSS)
  - File: `src/components/content.styl`
  - Reference number styling with tabular-nums
  - Reference tooltip on hover
  - Backlink indicators

- [ ] **Footnote Scroll Animation** (CSS)
  - File: `src/components/content.styl`
  - Smooth scroll to footnote
  - Highlight on arrival
  - Back scroll animation

## 🔧 Template Elements (New)

- [ ] **Navbox Styling** (CSS)
  - File: `src/components/navbox.styl` (new file)
  - Navigation box at bottom of articles
  - Collapsible groups
  - Subgroup styling

- [ ] **Sidebar Template Styling** (CSS)
  - File: `src/components/navbox.styl`
  - Related topics sidebar
  - Collapsible sections
  - Image/icon alignment

- [ ] **Documentation Subpage** (CSS)
  - File: `src/components/template-doc.styl` (new file)
  - Template documentation box
  - Usage example formatting
  - Parameter table styling


## 🌐 Internationalization & Localization (New)

- [ ] **RTL Language Full Support** (97%+ browser support)
  - File: `src/components/i18n.styl` (new file)
  - Complete logical properties conversion
  - `dir="rtl"` specific overrides
  - Bidirectional text handling

- [ ] **Language Variant Styling** (CSS)
  - File: `src/components/i18n.styl`
  - Language-specific font stacks
  - CJK font sizing adjustments
  - Non-Latin script line-height

- [ ] **Translation Extension Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Translation banner styling
  - Language selector dropdown
  - Outdated translation indicator

## 🔧 Extension Compatibility (New)

- [ ] **VisualEditor Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Visual editor toolbar theming
  - Edit surface styling
  - Diff highlight colors

- [ ] **Wikidata Integration** (CSS)
  - File: `src/components/extensions.styl`
  - Wikidata item link styling
  - Data quality badges
  - Identifier formatting

- [ ] **Cite Extension Enhancements** (97%+ browser support)
  - File: `src/components/extensions.styl`
  - Cite backlink styling with tabular-nums
  - Reference list numbering
  - Citation hover tooltips

- [ ] **Math Extension Styling** (CSS)
  - File: `src/components/extensions.styl`
  - MathML theming
  - LaTeX rendering background
  - Equation numbering

## 📊 Advanced Content Elements (New)

- [ ] **Timeline Extension Styling** (CSS)
  - File: `src/components/advanced.styl` (new file)
  - Timeline event cards
  - Date formatting
  - Connection line styling

- [ ] **Map/Geo Extension Styling** (CSS)
  - File: `src/components/advanced.styl`
  - Interactive map container
  - Marker styling
  - Popup card theming

- [ ] **Score/Music Notation** (CSS)
  - File: `src/components/advanced.styl`
  - Sheet music container
  - Score background
  - Audio player integration

- [ ] **Chess/Go Diagram Styling** (CSS)
  - File: `src/components/advanced.styl`
  - Game board theming
  - Piece visibility
  - Move highlighting

## 🔍 Search & Navigation Enhancements (New)

- [ ] **Advanced Search Form** (CSS)
  - File: `src/components/search.styl` (new file)
  - Search field grouping
  - Filter chip styling
  - Boolean operator indicators

- [ ] **Search Suggestions Dropdown** (97%+ browser support)
  - File: `src/components/search.styl`
  - Suggestion item styling
  - Match highlighting
  - Category badges with tabular-nums for counts

- [ ] **Cross-wiki Search Results** (CSS)
  - File: `src/components/search.styl`
  - Sister project icons
  - Project badge styling
  - Result grouping headers

- [ ] **Related Pages Suggestion** (CSS)
  - File: `src/components/search.styl`
  - Related article cards
  - Relevance indicator
  - Read more expansion

## 🎨 Skin Customization (New)

- [ ] **User Preference Overrides** (CSS)
  - File: `src/components/preferences.styl` (new file)
  - Preference toggle styling
  - Saved preferences indicator
  - Reset to default button

- [ ] **Gadget Integration** (CSS)
  - File: `src/components/gadgets.styl` (new file)
  - Gadget activation toggle
  - Gadget configuration panel
  - Conflict warning styling

- [ ] **Custom CSS Snippet Support** (CSS)
  - File: `src/components/preferences.styl`
  - CSS editor textarea styling
  - Syntax highlighting for custom CSS
  - Validation error display

## 📱 Progressive Web App (New)

- [ ] **PWA Manifest Colors** (100% browser support)
  - File: `src/manifest.styl` (new file)
  - `theme-color` meta tag support
  - `apple-mobile-web-app-status-bar-style`
  - Splash screen background

- [ ] **Offline Mode Indicator** (CSS)
  - File: `src/components/pwa.styl` (new file)
  - Offline banner styling
  - Cached content indicator
  - Sync pending status

- [ ] **Install Prompt Styling** (CSS)
  - File: `src/components/pwa.styl`
  - Add to home screen prompt
  - Install button styling
  - Dismiss option


## 👥 Community & Collaboration (New)

- [ ] **User Talk Page Enhancements** (CSS)
  - File: `src/components/community.styl` (new file)
  - Message thread styling
  - Reply button positioning
  - Archive notice display

- [ ] **Edit Conflict Resolution UI** (CSS)
  - File: `src/components/community.styl`
  - Conflict diff display
  - Merge tool styling
  - Resolution options

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

- [ ] **Admin Dashboard Styling** (CSS)
  - File: `src/components/admin.styl` (new file)
  - Admin panel cards
  - Quick action buttons
  - Statistics overview

- [ ] **User Rights Management** (CSS)
  - File: `src/components/admin.styl`
  - User group badges
  - Permission matrix display
  - Change log styling

- [ ] **Block/Protect UI** (CSS)
  - File: `src/components/admin.styl`
  - Block form styling
  - Duration selector
  - Reason dropdown styling

- [ ] **Delete/Undelete Interface** (CSS)
  - File: `src/components/admin.styl`
  - Delete confirmation dialog
  - Revision selection checkboxes
  - Bulk action toolbar

## 📱 Mobile-First Optimizations (New)

- [ ] **Touch-Friendly Edit Controls** (97%+ browser support)
  - File: `src/components/mobile.styl` (new file)
  - Larger touch targets (min 44px)
  - `touch-action: manipulation`
  - Swipe gesture indicators

- [ ] **Mobile Table Responsiveness** (CSS)
  - File: `src/components/mobile.styl`
  - Horizontal scroll wrapper
  - Sticky first column
  - Priority-based column hiding

- [ ] **Mobile Navigation Patterns** (CSS)
  - File: `src/components/mobile.styl`
  - Bottom navigation bar
  - Slide-out menu
  - Quick access shortcuts

- [ ] **Safe Area Support** (CSS)
  - File: `src/components/mobile.styl`
  - `safe-area-inset-*` for notched devices
  - Content scroll adjustment
  - Fixed element positioning

## ⚡ Performance Monitoring (New)

- [ ] **Page Load Indicator** (CSS)
  - File: `src/components/performance.styl` (new file)
  - Progress bar styling
  - Skeleton screen patterns
  - Loading state animations

- [ ] **Lazy Load Image Placeholder** (CSS)
  - File: `src/components/performance.styl`
  - Aspect ratio placeholder
  - Blur-up animation
  - Error fallback styling

- [ ] **Resource Hint Indicators** (CSS)
  - File: `src/components/performance.styl`
  - Prefetch status badge
  - Preload indicator
  - Connection quality display

## 🎯 Personalization (New)

- [ ] **Reading List Styling** (CSS)
  - File: `src/components/personal.styl` (new file)
  - Saved article cards
  - Read/unread indicators
  - Category organization

- [ ] **Watchlist Enhancements** (97%+ browser support)
  - File: `src/components/personal.styl`
  - Change summary styling
  - Diff preview cards
  - Timestamp display with tabular-nums

- [ ] **Notification Preferences Panel** (CSS)
  - File: `src/components/personal.styl`
  - Toggle switches for notification types
  - Email digest options
  - Quiet hours settings

- [ ] **Custom Quick Links** (CSS)
  - File: `src/components/personal.styl`
  - Quick link cards
  - Reorder handles
  - Edit/delete actions

## 🔬 Advanced Wiki Features (New)

- [ ] **Lua Module Documentation** (CSS)
  - File: `src/components/lua.styl` (new file)
  - Function signature display
  - Parameter table styling
  - Example code formatting

- [ ] **Template Data Styling** (CSS)
  - File: `src/components/templates.styl` (new file)
  - Template parameter cards
  - Required/optional indicators
  - Default value display

- [ ] **Scribunto Console** (CSS)
  - File: `src/components/lua.styl`
  - Console output styling
  - Error highlighting
  - Debug log display

- [ ] **Cargo Query Interface** (CSS)
  - File: `src/components/cargo.styl` (new file)
  - Query builder styling
  - Result table formatting
  - Export options

## 🌐 Cross-Wiki Features (New)

- [ ] **Wikidata Item Display** (CSS)
  - File: `src/components/wikidata.styl` (new file)
  - Property/value pairs styling
  - Source indicator badges
  - Language selector

- [ ] **Interwiki Link Preview** (CSS)
  - File: `src/components/interwiki.styl` (new file)
  - Hover preview card
  - Project favicon display
  - Article snippet styling

- [ ] **Translation Dashboard** (CSS)
  - File: `src/components/translation.styl` (new file)
  - Translation progress bars
  - Outdated indicator
  - Language pair display


## 🎨 Modern Color Spaces (New - 2026-02-28 Scout 6)

- [ ] **`oklch()` Color Space** (90%+ browser support)
  - File: `src/variables/colors.styl`
  - Perceptually uniform color adjustments
  - Better lightness/chroma/hue control than HSL
  - Example: `color: oklch(0.7 0.15 280);`
  - Stylus: Works directly

- [ ] **`lab()` / `lch()` Color Spaces** (94%+ browser support)
  - File: `src/variables/colors.styl`
  - Device-independent color definitions
  - Better gradient interpolation
  - Consistent appearance across displays
  - Stylus: Works directly

## 🔄 Scroll-Driven Animations (New)

- [ ] **`animation-timeline: scroll()`** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Progress-linked animations based on scroll position
  - Apply to article reading progress
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`animation-timeline: view()`** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Animate elements as they enter/exit viewport
  - Fade-in for infoboxes, navboxes
  - Pair with `animation-range`

## 🎭 Popover & Dialog Styling (New)

- [ ] **`:popover-open` Pseudo-class** (87%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style open popover states
  - Reference tooltip theming

- [ ] **`::backdrop` for Modal Overlays** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Theme backdrop behind dialogs/modals
  - Example: `dialog::backdrop { background: rgba(0,0,0,0.7); }`

- [ ] **`:modal` Pseudo-class** (90%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style modal dialogs differently from modeless
  - Centering, z-index management

## 🧮 CSS Math Functions (New)

- [ ] **`round()` for Pixel Alignment** (89%+ browser support)
  - File: `src/variables/layout.styl`
  - Round values to nearest unit
  - Example: `font-size: round(1.3vw, 1px);`
  - Stylus: Works directly

- [ ] **`abs()` / `sign()` for Calculations** (89%+ browser support)
  - File: `src/utilities/_math.styl` (new file)
  - Absolute values for spacing
  - Sign-based conditional styling
  - Stylus: Works directly

- [ ] **`rem()` / `mod()` for Remainders** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Alternating table row styles
  - Grid alignment
  - Stylus: Works directly

## 📝 Form State Styling (New)

- [ ] **`:user-valid` / `:user-invalid`** (89%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Validation styling only after user interaction
  - Better UX than `:valid`/`:invalid`
  - Stylus: Works directly

- [ ] **`:placeholder-shown` Detection** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style inputs based on empty state
  - Floating label patterns
  - Stylus: Works directly

- [ ] **`:read-only` / `:read-write` States** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Visual distinction for editable vs static content
  - Stylus: Works directly

## 🔲 Logical Properties Expansion (New)

- [ ] **`inset` Shorthand** (97%+ browser support)
  - File: `src/utilities/_positioning.styl` (new file)
  - Replace `top/right/bottom/left` with `inset`
  - Example: `inset: 0;` for full coverage
  - Stylus: Works directly

- [ ] **`inset-block` / `inset-inline`** (97%+ browser support)
  - File: `src/utilities/_positioning.styl`
  - Logical positioning for RTL support
  - `inset-inline-start` instead of `left`
  - Stylus: Works directly

- [ ] **`margin-block` / `margin-inline`** (97%+ browser support)
  - File: `src/utilities/_spacing.styl` (new file)
  - Flow-relative margins
  - Better for vertical writing modes
  - Stylus: Works directly

## ⚡ Performance Isolation (New)

- [ ] **`contain` Property** (97%+ browser support)
  - File: `src/base/_performance.styl` (new file)
  - Isolate layout/paint/style for performance
  - `contain: layout paint` for content sections
  - `contain: content` for sidebars
  - Stylus: Works directly

- [ ] **`overflow-anchor` for Scroll Anchoring** (97%+ browser support)
  - File: `src/base/_performance.styl`
  - Control scroll anchoring behavior
  - `overflow-anchor: none` to opt out
  - Stylus: Works directly


## 🔄 Discrete Property Transitions (New - 2026-02-28 Scout 7)

- [ ] **`transition-behavior: allow-discrete`** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Enable transitions on discrete properties (display, visibility)
  - Example: `transition: display 0.3s; transition-behavior: allow-discrete;`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **Expand `@starting-style` Usage** (85%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Entry animations for collapsible sections, dropdowns
  - Pair with `transition-behavior: allow-discrete`
  - Note: Wrap in `@css{}` for Stylus

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

- [ ] **`subgrid` for Nested Grid Alignment** (90%+ browser support)
  - File: `src/components/tables.styl`, `src/components/content.styl`
  - Align nested grid items with parent grid
  - Perfect for infobox sub-tables, nested lists
  - Stylus: Works directly

- [ ] **`masonry` Layout for Galleries** (87%+ browser support, Firefox only behind flag)
  - File: `src/components/file-pages.styl`
  - Masonry layout without JavaScript
  - Image gallery, category pages
  - Note: Limited support, use as progressive enhancement

- [ ] **`gap` in Flexbox** (97%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Use gap instead of margins in flex containers
  - Cleaner spacing between flex items
  - Stylus: Works directly

## 🎭 Advanced Pseudo-Classes (New)

- [ ] **`:nth-child(of S)` Selector** (89%+ browser support)
  - File: `src/components/tables.styl`, `src/components/content.styl`
  - nth-child with selector argument
  - Example: `tr:nth-child(of :not(.header))`
  - Stylus: Works directly

- [ ] **`:blank` for Empty Form Fields** (87%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style truly empty inputs (no whitespace)
  - More specific than `:placeholder-shown`
  - Stylus: Works directly

- [ ] **`:dir()` for Direction Styling** (90%+ browser support)
  - File: `src/components/i18n.styl`
  - Style based on text direction (ltr/rtl)
  - Better than [dir] attribute selectors
  - Stylus: Works directly

## 🔤 Text & Typography (New)

- [ ] **`text-spacing-trim` for CJK** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Control spacing around CJK punctuation
  - Better typography for Asian languages
  - Stylus: Works directly

- [ ] **`white-space-collapse` Control** (97%+ browser support)
  - File: `src/components/code.styl`, `src/components/content.styl`
  - Fine-grained whitespace handling
  - Values: collapse, preserve, preserve-breaks
  - Stylus: Works directly

- [ ] **`text-group-align` for Block Alignment** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Align text groups within blocks
  - Better than text-align for complex layouts
  - Stylus: Works directly

## 🖼️ Media Enhancements (New)

- [ ] **`@media (video-dynamic-range)`** (92%+ browser support)
  - File: `src/variables/colors.styl`
  - Detect HDR video capability
  - Provide enhanced colors for HDR displays
  - Stylus: Works directly

- [ ] **`@media (prefers-reduced-data)`** (87%+ browser support)
  - File: `src/components/performance.styl`
  - Detect data saver mode
  - Reduce image quality/animations
  - Stylus: Works directly

- [ ] **`aspect-ratio` with attr()** (97%+ browser support for aspect-ratio)
  - File: `src/components/content.styl`
  - Use width/height attributes for ratio
  - Prevent layout shift on image load
  - Example: `aspect-ratio: attr(width) / attr(height);`

## ⚡ Performance Patterns (New)

- [ ] **`render-subtree` for Visibility** (87%+ browser support)
  - File: `src/components/performance.styl`
  - Control rendering of subtrees
  - `render-subtree: invisible` for hidden content
  - Stylus: Works directly

- [ ] **`content-visibility: hidden` with `hidden=until-found`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Collapsible content that's searchable
  - Pair with `content-visibility: hidden`
  - Stylus: Works directly

## 🎨 Visual Effects (New)

- [ ] **`mask-image` for Image Effects** (97%+ browser support)
  - File: `src/components/content.styl`
  - CSS masking for images, icons
  - Gradient masks for fade effects
  - Stylus: Works directly

- [ ] **`clip-path` Basic Shapes** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Clip elements to shapes
  - Circle, ellipse, polygon
  - Stylus: Works directly

- [ ] **`filter: contrast()` for Readability** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - Increase contrast on demand
  - `@media (prefers-contrast: more)` pair
  - Stylus: Works directly


## 📜 Scroll Enhancements (New - 2026-02-28 Scout 9)

- [ ] **`overscroll-behavior` for Scroll Chaining** (92%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/content.styl`
  - Prevent scroll chaining in nested scrollables
  - `overscroll-behavior: contain` for TOC, modals
  - Stylus: Works directly

- [ ] **`scrollbar-gutter: stable` for Layout** (92%+ browser support)
  - File: `src/components/base.styl`, `src/components/content.styl`
  - Prevent layout shift from scrollbars
  - Reserve scrollbar space even when hidden
  - Stylus: Works directly

- [ ] **`scroll-timeline` for Custom Animations** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define named scroll timelines
  - More control than `animation-timeline: scroll()`
  - Note: Wrap in `@css{}` for Stylus

## 🔤 Text Enhancements (New)

- [ ] **`text-wrap: balance/pretty`** (92%+ browser support)
  - File: `src/components/typography.styl`
  - Better headline wrapping: `text-wrap: balance;`
  - Prevent orphans in paragraphs: `text-wrap: pretty;`
  - Stylus: Works directly

## 🎨 Color Font Support (New)

- [ ] **`font-palette` for Color Fonts** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Select color font palettes
  - `font-palette: normal`, `font-palette: light`
  - Stylus: Works directly

- [ ] **`@font-palette-values` Custom Palettes** (87%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define custom color font palettes
  - Override emoji/icon font colors
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`font-variant-alternates` for OpenType** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Access alternate glyphs
  - `font-variant-alternates: historical-forms`
  - Stylus: Works directly

## 🖼️ Image Enhancements (New)

- [ ] **`image-set()` for Responsive Images** (97%+ browser support)
  - File: `src/components/content.styl`
  - Serve different images for different DPR
  - `background-image: image-set("img.png" 1x, "img@2x.png" 2x);`
  - Stylus: Works directly

- [ ] **`cross-fade()` for Transitions** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Blend two images together
  - Smooth image transitions
  - Stylus: Works directly

- [ ] **`conic-gradient` for Patterns** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Conic gradient backgrounds
  - Pie charts, color wheels
  - Stylus: Works directly

## 📐 Grid Shorthands (New)

- [ ] **`place-items` Shorthand** (97%+ browser support)
  - File: `src/utilities/_grid.styl` (new file)
  - `place-items: center` = `align-items` + `justify-items`
  - Cleaner grid alignment code
  - Stylus: Works directly

- [ ] **`place-content` Shorthand** (97%+ browser support)
  - File: `src/utilities/_grid.styl`
  - `place-content: center` = `align-content` + `justify-content`
  - Cleaner grid content alignment
  - Stylus: Works directly

- [ ] **`place-self` Shorthand** (97%+ browser support)
  - File: `src/utilities/_grid.styl`
  - `place-self: center` = `align-self` + `justify-self`
  - Cleaner grid item alignment
  - Stylus: Works directly

## 🖨️ Print Enhancements (New)

- [ ] **`page-orientation` Descriptor** (87%+ browser support)
  - File: `src/components/print.styl`
  - Control page orientation in `@page`
  - `@page { page-orientation: landscape; }`
  - Stylus: Works directly

- [ ] **`print-color-adjust: exact`** (97%+ browser support)
  - File: `src/components/print.styl`
  - Preserve theme colors in print
  - Force exact color reproduction
  - Stylus: Works directly

- [ ] **`widows` / `orphans` Control** (97%+ browser support)
  - File: `src/components/print.styl`
  - Prevent lonely lines at page breaks
  - `orphans: 3; widows: 3;`
  - Stylus: Works directly


## 🎬 Media & Video Enhancements (New - 2026-02-28 Scout 10)

- [ ] **`::cue` for Video Captions** (97%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style WebVTT captions/subtitles
  - `::cue { color: var(--text-color); background: rgba(0,0,0,0.8); }`
  - Stylus: Works directly

- [ ] **`:fullscreen` Pseudo-class** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Style fullscreen mode elements
  - Hide UI chrome in fullscreen
  - Stylus: Works directly

- [ ] **`:picture-in-picture` Pseudo-class** (92%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style PiP video container
  - PiP indicator styling
  - Stylus: Works directly

- [ ] **`:paused` / `:playing` Pseudo-classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video based on playback state
  - Play/pause button indicators
  - Stylus: Works directly

- [ ] **`:buffering` / `:muted` Pseudo-classes** (87%+ browser support)
  - File: `src/components/file-pages.styl`
  - Style video based on buffer/mute state
  - Loading indicators, mute icons
  - Stylus: Works directly

## 📝 Form Enhancements (New)

- [ ] **`::file-selector-button` Styling** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style file input button
  - `input[type="file"]::file-selector-button { ... }`
  - Stylus: Works directly

- [ ] **`:autofill` Pseudo-class** (85%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style autofilled inputs
  - Different background for autofilled fields
  - Stylus: Works directly

- [ ] **`:indeterminate` Pseudo-class** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style indeterminate checkboxes/radios
  - Progress bars without value
  - Stylus: Works directly

- [ ] **`:in-range` / `:out-of-range`** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style inputs based on min/max range
  - Visual feedback for valid/invalid range
  - Stylus: Works directly

- [ ] **`:default` Pseudo-class** (97%+ browser support)
  - File: `src/components/forms-enhanced.styl`
  - Style default form elements
  - Default submit button, checked radio
  - Stylus: Works directly

## 🔤 Typography Deep Cuts (New)

- [ ] **`font-optical-sizing` for Variable Fonts** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Enable optical sizing for variable fonts
  - `font-optical-sizing: auto;`
  - Stylus: Works directly

- [ ] **`@font-face` Descriptors** (97%+ browser support)
  - File: `src/variables/_fonts.styl` (new file)
  - `font-display: swap` for FOUT prevention
  - `size-adjust` for metric matching
  - `ascent-override`, `descent-override`, `line-gap-override`
  - Stylus: Works directly

- [ ] **`text-emphasis` for Ruby/Emphasis** (90%+ browser support)
  - File: `src/components/typography.styl`
  - Add emphasis marks to text
  - `text-emphasis: filled circle;`
  - Stylus: Works directly

- [ ] **`text-justify` for Asian Languages** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control justification algorithm
  - `text-justify: inter-word;` or `inter-ideograph;`
  - Stylus: Works directly

- [ ] **`word-break: break-all` for URLs** (97%+ browser support)
  - File: `src/components/code.styl`
  - Break long URLs at any character
  - Different from `overflow-wrap`
  - Stylus: Works directly

## 🎨 Blend & Composite (New)

- [ ] **`background-blend-mode`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Blend background layers
  - `background-blend-mode: multiply;`
  - Stylus: Works directly

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

- [ ] **`writing-mode` for Vertical Text** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Support vertical writing modes
  - `writing-mode: vertical-rl;` for CJK
  - Stylus: Works directly

- [ ] **`text-orientation` for Mixed Scripts** (97%+ browser support)
  - File: `src/components/i18n.styl`
  - Control text orientation in vertical mode
  - `text-orientation: mixed;` or `upright;`
  - Stylus: Works directly

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

- [ ] **`@container style()` Queries** (87%+ browser support)
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

- [ ] **`paint-order` for SVG Text** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Control paint order for SVG text elements
  - `paint-order: stroke fill;` for outlined text
  - Stylus: Works directly

- [ ] **`stroke-*` Properties for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`
  - Style SVG icons consistently
  - Stylus: Works directly

- [ ] **`vector-effect: non-scaling-stroke`** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Prevent stroke scaling on SVG resize
  - Consistent icon borders at any size
  - Stylus: Works directly

- [ ] **`shape-rendering` for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Control SVG rendering quality
  - `shape-rendering: crispEdges;` for pixel-perfect icons
  - Stylus: Works directly

## 🎯 Custom Highlight API (New)

- [ ] **`::highlight()` Pseudo-element** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style custom text highlights
  - `::highlight(search-results) { background: yellow; }`
  - Note: Requires JS API pairing, wrap in `@css{}` for Stylus

- [ ] **`highlight()` CSSOM Integration** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Document JS usage for custom highlights
  - Search highlighting, annotation styling
  - Note: CSS + JS feature

## 📐 Advanced Interpolation (New)

- [ ] **`interpolate-size: allow-keywords`** (85%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/ui-components.styl`
  - Enable smooth transitions to/from `auto`
  - `interpolate-size: allow-keywords;`
  - Example: `height: 0; height: auto;` now animates
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`calc-size()` for Auto Transitions** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Alternative to interpolate-size
  - `height: calc-size(auto);`
  - Note: Wrap in `@css{}` for Stylus

## 🔤 Advanced Text (New)

- [ ] **`text-wrap-mode` Property** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control text wrapping behavior
  - `text-wrap-mode: nowrap;`
  - Stylus: Works directly

- [ ] **`text-wrap-style` Property** (92%+ browser support)
  - File: `src/components/typography.styl`
  - Control wrapping style
  - `text-wrap-style: balance;` or `pretty;`
  - Stylus: Works directly

- [ ] **`hanging-punctuation` Expansion** (95%+ browser support)
  - File: `src/components/typography.styl`
  - Already implemented - verify coverage
  - `hanging-punctuation: first last;`
  - Stylus: Works directly

## 🖼️ Object & Box (New)

- [ ] **`object-view-box` for Image Clipping** (87%+ browser support)
  - File: `src/components/content.styl`
  - Clip images with CSS
  - `object-view-box: inset(10px);`
  - Stylus: Works directly

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

- [ ] **`@position-try` Fallbacks** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - Define fallback positions
  - `@position-try --fallback { top: anchor(top); }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`position-try-fallbacks` Property** (85%+ browser support)
  - File: `src/components/ui-components.styl`
  - List fallback positions
  - `position-try-fallbacks: --flip, --slide;`
  - Note: Wrap in `@css{}` for Stylus

## 📜 Scroll State Containers (New)

- [ ] **`@scroll-state` Container Queries** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Query scroll state in CSS
  - `@scroll-state (snapped: x) { ... }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`:snapped` Pseudo-class** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style snapped scroll items
  - `:snapped { background: var(--accent); }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`:snapped-x` / `:snapped-y` Pseudo-classes** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style axis-specific snapped items
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`scroll-start` / `scroll-end` Properties** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Define scroll snap boundaries
  - Note: Wrap in `@css{}` for Stylus

## 🔖 Scroll Markers (New)

- [ ] **`::scroll-marker` Pseudo-element** (85%+ browser support)
  - File: `src/components/navigation.styl`
  - Style scroll position markers
  - Carousel pagination dots
  - Note: Wrap in `@css{}` for Stylus

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

- [ ] **`trunc()` for Truncation** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Truncate to integer
  - `font-size: trunc(1.9vw);`
  - Stylus: Works directly

- [ ] **`sqrt()` Square Root** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Calculate square root
  - `width: sqrt(100px);`
  - Stylus: Works directly

- [ ] **`hypot()` Hypotenuse** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Calculate hypotenuse
  - `transform: rotate(atan2(y, x));`
  - Stylus: Works directly

- [ ] **`pow()` Power Function** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Calculate power
  - `font-size: pow(1.2, var(--level));`
  - Stylus: Works directly

- [ ] **`log()` / `exp()` Logarithm/Exponential** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Logarithmic scaling
  - Stylus: Works directly

- [ ] **`sin()` / `cos()` / `tan()` Trig** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Trigonometric functions
  - `transform: rotate(sin(var(--angle)));`
  - Stylus: Works directly

- [ ] **`asin()` / `acos()` / `atan()` Inverse Trig** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Inverse trigonometric functions
  - Stylus: Works directly

- [ ] **`atan2()` Two-Argument Arctangent** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Angle from coordinates
  - Stylus: Works directly

- [ ] **`pi()` / `e()` Constants** (89%+ browser support)
  - File: `src/utilities/_math.styl`
  - Math constants
  - `transform: rotate(calc(pi() * 2rad));`
  - Stylus: Works directly

## 🔤 Initial Letter (New)

- [ ] **`initial-letter` Drop Caps** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Enhanced drop caps control
  - `initial-letter: 3 2;` (3 lines, sink 2)
  - Stylus: Works directly

- [ ] **`initial-letter-align` Alignment** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Align initial letters
  - Stylus: Works directly

- [ ] **`initial-letter-wrap` Wrapping** (87%+ browser support)
  - File: `src/components/typography.styl`
  - Control initial letter wrapping
  - Stylus: Works directly

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

- [ ] **`hyphenate-limit-chars`** (85%+ browser support)
  - File: `src/components/typography.styl`
  - Minimum chars before/after hyphen
  - `hyphenate-limit-chars: 6 3;`
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

- [ ] **`field-sizing` for Auto-Expanding Textareas** (85%+ browser support)
  - File: `src/components/editing.styl`
  - Auto-size textareas based on content
  - `field-sizing: content;`
  - Stylus: Works directly

- [ ] **`accent-color` for Form Controls** (97%+ browser support)
  - File: `src/components/forms.styl`
  - Style checkboxes, radios, range inputs
  - `accent-color: var(--accent);`
  - Stylus: Works directly

- [ ] **`appearance: none` for Custom Controls** (97%+ browser support)
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

- [ ] **`backdrop-filter` for Glassmorphism** (97%+ browser support)
  - File: `src/components/navigation.styl`, `src/components/modals.styl`
  - Blur behind elements
  - `backdrop-filter: blur(10px);`
  - Stylus: Works directly

- [ ] **`backdrop-filter: brightness()`** (97%+ browser support)
  - File: `src/components/navigation.styl`
  - Adjust backdrop brightness
  - Stylus: Works directly

- [ ] **`backdrop-filter: saturate()`** (97%+ browser support)
  - File: `src/components/navigation.styl`
  - Adjust backdrop saturation
  - Stylus: Works directly

## 📜 Scrollbar Styling (New)

- [ ] **`scrollbar-color` for Custom Scrollbars** (97%+ browser support)
  - File: `src/components/scrollbars.styl` (new file)
  - Color scrollbar thumb/track
  - `scrollbar-color: var(--accent) var(--bg-secondary);`
  - Stylus: Works directly

- [ ] **`scrollbar-width` for Scrollbar Size** (97%+ browser support)
  - File: `src/components/scrollbars.styl`
  - Thin/auto/none scrollbars
  - `scrollbar-width: thin;`
  - Stylus: Works directly

- [ ] **`scrollbar-gutter` Expansion** (92%+ browser support)
  - File: `src/components/scrollbars.styl`
  - Reserve space for scrollbar
  - `scrollbar-gutter: stable both-edges;`
  - Stylus: Works directly


## 🎭 Individual Transform Properties (New - 2026-03-01 Scout 2)

- [ ] **`translate` Property** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Individual translate without transform
  - `translate: 50% 0;`
  - Stylus: Works directly

- [ ] **`rotate` Property** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Individual rotate without transform
  - `rotate: 45deg;`
  - Stylus: Works directly

- [ ] **`scale` Property** (97%+ browser support)
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

- [ ] **`filter: blur()` for Focus Effects** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Blur unfocused elements
  - `filter: blur(2px);`
  - Stylus: Works directly

- [ ] **`filter: brightness()` for Themes** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Adjust element brightness
  - Stylus: Works directly

- [ ] **`filter: saturate()` for Color Control** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Adjust color saturation
  - Stylus: Works directly

- [ ] **`filter: hue-rotate()` for Color Shifts** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Rotate hue of elements
  - Stylus: Works directly

- [ ] **`filter: invert()` for Dark Mode** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Invert element colors
  - Stylus: Works directly

- [ ] **`filter: grayscale()` for Disabled States** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Grayscale disabled elements
  - Stylus: Works directly

- [ ] **`filter: sepia()` for Vintage Effects** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Sepia tone for images
  - Stylus: Works directly

- [ ] **`filter: drop-shadow()` for Irregular Shapes** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Shadow for PNG/SVG shapes
  - `filter: drop-shadow(2px 4px 6px black);`
  - Stylus: Works directly

## 🖨️ Print Enhancements (New)

- [ ] **`break-before` / `break-after` / `break-inside`** (97%+ browser support)
  - File: `src/components/print.styl`
  - Control page/column breaks
  - `break-inside: avoid;`
  - Stylus: Works directly

- [ ] **`page` Property for Named Pages** (97%+ browser support)
  - File: `src/components/print.styl`
  - Named page styles
  - `page: wide;`
  - Stylus: Works directly

- [ ] **`size` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print.styl`
  - Define page size
  - `@page { size: A4; }`
  - Stylus: Works directly

- [ ] **`marks` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print.styl`
  - Print crop/registration marks
  - Stylus: Works directly

- [ ] **`bleed` Descriptor in @page** (97%+ browser support)
  - File: `src/components/print.styl`
  - Print bleed area
  - Stylus: Works directly


## 📐 Sizing Keywords (New - 2026-03-01 Scout 3)

- [ ] **`fit-content()` Function** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Size to fit content with max
  - `width: fit-content(300px);`
  - Stylus: Works directly

- [ ] **`min-content` / `max-content` Keywords** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Content-based sizing
  - `width: min-content;`
  - Stylus: Works directly

- [ ] **`stretch` Sizing Keyword** (85%+ browser support)
  - File: `src/components/layout.styl`
  - Fill available space
  - `width: stretch;`
  - Stylus: Works directly

## 🎯 Interaction Enhancements (New)

- [ ] **`user-select: contain`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Selection containment
  - Stylus: Works directly

- [ ] **`pointer-events: painted` for SVG** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - SVG pointer events on fill only
  - Stylus: Works directly

- [ ] **`resize: block` / `inline`** (97%+ browser support)
  - File: `src/components/editing.styl`
  - Logical axis resizing
  - Stylus: Works directly

- [ ] **`cursor: zoom-in` / `zoom-out`** (97%+ browser support)
  - File: `src/components/ui-components.styl`
  - Zoom cursor hints
  - Stylus: Works directly

- [ ] **`caret-shape` Property** (85%+ browser support)
  - File: `src/components/editing.styl`
  - Style text cursor shape
  - `caret-shape: block;`
  - Stylus: Works directly

## 📋 Multi-Column Layout (New)

- [ ] **`column-rule` Shorthand** (97%+ browser support)
  - File: `src/components/content.styl`
  - Column divider style
  - `column-rule: 1px solid var(--border);`
  - Stylus: Works directly

- [ ] **`column-span: all`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Span all columns
  - Stylus: Works directly

- [ ] **`column-fill: balance`** (97%+ browser support)
  - File: `src/components/content.styl`
  - Balance column content
  - Stylus: Works directly

- [ ] **`columns` Shorthand** (97%+ browser support)
  - File: `src/components/content.styl`
  - Column count + width
  - `columns: 3 20ch;`
  - Stylus: Works directly

## 🔲 Visibility & Opacity (New)

- [ ] **`visibility: collapse` for Table Rows** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Hide table rows properly
  - Stylus: Works directly

- [ ] **`opacity: percentages` in Animations** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Smooth fade transitions
  - Stylus: Works directly

## 📦 Display Enhancements (New)

- [ ] **`display: flow-root`** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Clearfix replacement
  - Stylus: Works directly

- [ ] **`display: contents` for Semantic HTML** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Remove element from box tree
  - Accessibility: use with caution
  - Stylus: Works directly

- [ ] **`display: inline flow` Multi-Keyword** (97%+ browser support)
  - File: `src/components/layout.styl`
  - Explicit display keywords
  - Stylus: Works directly


## 🎬 Animation Properties (New - 2026-03-01 Scout 4)

- [ ] **`animation-delay: negative` for Pre-delayed Start** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Start animation mid-cycle
  - `animation-delay: -1s;`
  - Stylus: Works directly

- [ ] **`animation-direction: alternate-reverse`** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Reverse alternate direction
  - Stylus: Works directly

- [ ] **`animation-fill-mode: both`** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Apply before and after
  - Stylus: Works directly

- [ ] **`animation-play-state: paused` Toggle** (97%+ browser support)
  - File: `src/components/animations.styl`
  - Pause/resume animations
  - Stylus: Works directly

## 🔲 Outline Enhancements (New)

- [ ] **`outline-offset` for Spaced Outlines** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Space outline from element
  - `outline-offset: 2px;`
  - Stylus: Works directly

- [ ] **`outline-style: auto` for Platform Focus** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Platform-native focus ring
  - Stylus: Works directly

- [ ] **`outline` Shorthand** (97%+ browser support)
  - File: `src/components/focus.styl`
  - Compact outline syntax
  - `outline: 2px solid var(--accent);`
  - Stylus: Works directly

## 🖼️ Border Image (New)

- [ ] **`border-image` for Decorative Borders** (97%+ browser support)
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

- [ ] **`table-layout: fixed` for Performance** (97%+ browser support)
  - File: `src/components/tables.styl`
  - Fixed table layout
  - Stylus: Works directly

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

- [ ] **`counter-set` for Resetting** (97%+ browser support)
  - File: `src/components/lists.styl`
  - Set counter without increment
  - Stylus: Works directly

- [ ] **`counters()` for Nested Lists** (97%+ browser support)
  - File: `src/components/lists.styl`
  - Nested counter display
  - `content: counters(item, ".") " ";`
  - Stylus: Works directly



## 🖱️ Input Capability Detection (New - 2026-03-01 Scout 14)

- [ ] **`@media (hover: hover)` for Hover Capable Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Only show hover effects on devices that support true hover
  - Hide tooltip delays, hover previews on touch devices
  - Example: `@media (hover: hover) { .mw-ui-button:hover { ... } }`
  - Stylus: Works directly

- [ ] **`@media (hover: none)` for Touch-Only Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Touch-specific UI enhancements
  - Larger touch targets, no hover-dependent UI
  - Stylus: Works directly

- [ ] **`@media (pointer: fine)` for Precise Input** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Mouse/trackpad - can use smaller targets
  - Stylus: Works directly

- [ ] **`@media (pointer: coarse)` for Touch Input** (97%+ browser support)
  - File: `src/components/mobile.styl`
  - Finger input - increase touch target sizes
  - Minimum 44px touch targets
  - Stylus: Works directly

- [ ] **`@media (any-hover)` for Hybrid Devices** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect if ANY input device supports hover
  - Tablets with mice, touch laptops
  - Stylus: Works directly

- [ ] **`@media (any-pointer)` for Multi-Input** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect best available pointer precision
  - Stylus: Works directly

## 📱 Mobile Environment Variables (New)

- [ ] **`env(keyboard-inset-*)` for Mobile Keyboards** (87%+ browser support)
  - File: `src/components/mobile.styl`
  - `keyboard-inset-top`, `keyboard-inset-right`, `keyboard-inset-bottom`, `keyboard-inset-left`
  - Adjust edit form layout when virtual keyboard appears
  - Example: `padding-bottom: env(keyboard-inset-bottom, 0);`
  - Stylus: Works directly

## 🖥️ Display Capability Queries (New)

- [ ] **`@media (resolution)` and `min-resolution` / `max-resolution`** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect screen DPI/Pixel density
  - Serve higher-res assets for retina displays
  - Example: `@media (min-resolution: 2dppx) { ... }`
  - Stylus: Works directly

- [ ] **`@media (color-index)` for Color Depth** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect indexed color displays
  - Simplify gradients for limited color devices
  - Stylus: Works directly

- [ ] **`@media (monochrome)` for B&W Displays** (97%+ browser support)
  - File: `src/components/print.styl`
  - Detect e-ink, monochrome screens
  - High contrast, no gradients for e-readers
  - Stylus: Works directly

- [ ] **`@media (grid)` for Grid Displays** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - Detect braille, grid-based displays
  - Simplified layout for assistive tech
  - Stylus: Works directly

## 🎨 Color Preference Queries (New)

- [ ] **`@media (forced-colors: active)` for High Contrast Mode** (95%+ browser support)
  - File: `src/components/accessibility.styl`
  - Windows High Contrast Mode support
  - Use system colors: `CanvasText`, `Canvas`, `Highlight`
  - Ensure visibility when colors are forced
  - Stylus: Works directly

- [ ] **`@media (inverted-colors: inverted)` for Color Inversion** (87%+ browser support)
  - File: `src/components/accessibility.styl`
  - Detect if user has inverted colors (macOS, iOS)
  - Adjust images, shadows for better appearance
  - Stylus: Works directly

## 📐 Viewport & Aspect Queries (New)

- [ ] **`@media (aspect-ratio)` for Aspect Ratio Detection** (97%+ browser support)
  - File: `src/components/responsive-enhanced.styl`
  - Detect viewport aspect ratio
  - Adjust infobox, sidebar layout for ultra-wide or portrait
  - Example: `@media (aspect-ratio: 21/9) { ... }`
  - Stylus: Works directly

- [ ] **`@media (orientation: portrait/landscape)`** (100% browser support)
  - File: `src/components/responsive-enhanced.styl`
  - Explicit orientation detection
  - Adjust table, infobox layout
  - Stylus: Works directly

## 🔧 Scripting & Capabilities (New)

- [ ] **`@media (scripting: enabled/none/initial-only)`** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect JavaScript availability
  - Provide fallback styles for no-JS
  - Show/hide JS-dependent UI (collapsibles, etc.)
  - Stylus: Works directly

- [ ] **`@media (update: slow/none/fast)`** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Detect display refresh capability
  - Simplify animations for e-ink (slow update)
  - Stylus: Works directly

## 🔤 Advanced Font Variants (New)

- [ ] **`font-variant-caps` for Capital Styles** (97%+ browser support)
  - File: `src/components/typography.styl`
  - `small-caps`, `all-small-caps`, `petite-caps`, `all-petite-caps`
  - Stylistic option for headings, labels
  - Stylus: Works directly

- [ ] **`font-variant-ligatures` for Ligatures** (97%+ browser support)
  - File: `src/variables/colors.styl`, `src/components/code.styl`
  - `common-ligatures`, `discretionary-ligatures`, `historical-ligatures`
  - Control code font ligatures
  - Stylus: Works directly

- [ ] **`font-variant-east-asian` for CJK Typography** (97%+ browser support)
  - File: `src/components/typography.styl`
  - `jis78`, `jis83`, `jis90`, `jis04`, `simplified`, `traditional`
  - Better CJK font rendering
  - Stylus: Works directly

- [ ] **`font-variant-position` for Super/Subscript** (97%+ browser support)
  - File: `src/components/content.styl`
  - `super`, `sub` for proper super/subscript glyphs
  - Better than `<sup>`/`<sub>` for typography
  - Stylus: Works directly

- [ ] **`font-variant-emoji` for Emoji Presentation** (87%+ browser support)
  - File: `src/components/typography.styl`
  - `text`, `emoji`, `unicode` to control emoji rendering
  - Ensure consistent emoji appearance
  - Stylus: Works directly

- [ ] **`font-language-override` for Language-Specific Glyphs** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Override language for font feature selection
  - Access language-specific alternates
  - Stylus: Works directly

- [ ] **`@font-feature-values` for Named Features** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Define named font feature values
  - `@font-feature-values Font Name { @styleset { nice-style: 1; } }`
  - Note: Wrap in `@css{}` for Stylus

## 📖 Ruby Text Support (New)

- [ ] **`ruby-align` for Ruby Text Alignment** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control alignment of ruby annotations (East Asian)
  - `start`, `center`, `space-between`, `space-around`
  - Stylus: Works directly

- [ ] **`ruby-position` for Ruby Placement** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Control ruby annotation position
  - `over`, `under`, `inter-character`
  - Stylus: Works directly

## 🌐 Web Components / Shadow DOM (New)

- [ ] **`:defined` Pseudo-class for Custom Elements** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style only defined custom elements
  - Prevent FOUC for web components
  - Stylus: Works directly

- [ ] **`:host` Pseudo-class for Shadow Host** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style shadow host from inside shadow DOM
  - Stylus: Works directly

- [ ] **`:host-context()` for Contextual Styling** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style based on shadow host ancestors
  - Stylus: Works directly

- [ ] **`::slotted()` for Slotted Content** (97%+ browser support)
  - File: `src/components/modern-css.styl`
  - Style light DOM content in slots
  - Stylus: Works directly

- [ ] **`::part()` for Shadow Parts** (95%+ browser support)
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

- [ ] **`linear()` Timing Function** (92%+ browser support)
  - File: `src/components/modern-css.styl`
  - Custom linear timing with control points
  - Example: `animation-timing-function: linear(0, 0.25 50%, 1);`
  - Stylus: Works directly

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

- [ ] **`@stylistic` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Define stylistic alternate names
  - `@font-feature-values Font { @stylistic { alternate: 1; } }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@historical-forms` Feature** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Historical glyph variants
  - `@font-feature-values Font { @historical-forms { hist: 1; } }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@styleset` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Define style set names
  - `@font-feature-values Font { @styleset { set1: 1; } }`
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@character-variant` Feature** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Character variant definitions
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@swash` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Swash character variants
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@ornaments` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Ornamental characters
  - Note: Wrap in `@css{}` for Stylus

- [ ] **`@annotation` Feature Definitions** (97%+ browser support)
  - File: `src/components/typography.styl`
  - Annotation characters (circles, squares)
  - Note: Wrap in `@css{}` for Stylus

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

- [ ] **`view-transition-class` Property** (85%+ browser support)
  - File: `src/components/modern-css.styl`
  - Add classes to view transitions for styling
  - Stylus: Works directly

## 🌈 System Color Keywords (New)

- [ ] **`light-dark()` Function** (92%+ browser support)
  - File: `src/variables/colors.styl`
  - Automatic light/dark color selection
  - Example: `color: light-dark(#333, #ccc);`
  - Stylus: Works directly

- [ ] **Extended System Colors** (97%+ browser support)
  - File: `src/components/accessibility.styl`
  - `AccentColorText`, `SelectedItem`, `SelectedItemText`
  - `Mark`, `MarkText` for mark element
  - Use in `forced-colors` media query
  - Stylus: Works directly

## 📊 MathML Styling (New)

- [ ] **MathML Element Styling** (97%+ browser support)
  - File: `src/components/content.styl`
  - Style mathematical equations in articles
  - `math`, `mrow`, `mi`, `mo`, `mn` elements
  - Consistent with code block styling
  - Stylus: Works directly

- [ ] **`math-style` Property** (87%+ browser support)
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

- [ ] **Extension:CodeMirror Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Syntax highlighting in edit mode
  - Line number styling
  - Active line highlight
  - Bracket matching indicator

- [ ] **Extension:VisualEditor Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Visual editor toolbar
  - Floating toolbar styling
  - Context item styling
  - Diff highlighting

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

- [ ] **Extension:PageForms Styling** (CSS)
  - File: `src/components/extensions.styl`
  - Form input styling
  - Date picker
  - Combo box
  - Multi-select

## 📋 Advanced Table Features (New)

- [ ] **Sortable Table Enhancement** (CSS)
  - File: `src/components/tables.styl`
  - Sort indicator arrows
  - Sorted column highlight
  - Sort animation
  - Header hover state

- [ ] **Scrollable Table Wrapper** (CSS)
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

- [ ] **Package Templates** (CSS)
  - File: `src/components/archwiki.styl`
  - {{Pkg}} template styling
  - {{AUR}} template styling
  - {{Grp}} template styling
  - Package status indicators

- [ ] **Command Line Blocks** (CSS)
  - File: `src/components/archwiki.styl`
  - Terminal prompt styling
  - Command/output separation
  - Copy button positioning
  - Root vs user prompt distinction

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

- [ ] **Systemd Unit Styling** (CSS)
  - File: `src/components/archwiki.styl`
  - Service box styling
  - Timer styling
  - Socket styling
  - Enable/disable states

## 🎨 ArchWiki Navigation (New)

- [ ] **Category Tree Styling** (CSS)
  - File: `src/components/navigation.styl`
  - Expandable category tree
  - Subcategory indicators
  - Page count badges
  - Active category highlight

- [ ] **Related Pages Sidebar** (CSS)
  - File: `src/components/navigation.styl`
  - Related articles panel
  - Sibling pages list
  - Parent category link
  - Quick navigation

- [ ] **Table of Contents Enhancements** (CSS)
  - File: `src/components/navigation.styl`
  - Sticky TOC on scroll
  - Active section highlight
  - Expand/collapse all toggle
  - Section count indicator

- [ ] **Breadcrumb Trail** (CSS)
  - File: `src/components/navigation.styl`
  - Category path display
  - Separator styling
  - Current page indicator
  - Overflow handling for deep paths

## 📊 ArchWiki Infoboxes (New)

- [ ] **Software Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Software name/version info
  - License indicator
  - Platform support grid
  - Website link styling

- [ ] **Hardware Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Device compatibility status
  - Driver status indicators
  - Firmware requirements
  - Workaround badges

- [ ] **Developer Infobox** (CSS)
  - File: `src/components/infobox.styl`
  - Maintainer info
  - Contact methods
  - Contribution stats
  - Activity indicators

## ⚠️ ArchWiki Advisory Boxes (New)

- [ ] **Warning Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Data loss warning
  - System instability warning
  - Security warning
  - Critical action warning

- [ ] **Tip Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Performance tip
  - Alternative method
  - Shortcut tip
  - Best practice tip

- [ ] **Note Boxes Enhanced** (CSS)
  - File: `src/components/advisory.styl`
  - Version-specific note
  - Distribution-specific note
  - Architecture-specific note
  - Prerequisite note

- [ ] **Deprecated Content** (CSS)
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

- [ ] **Diff View Styling** (CSS)
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

- [ ] **Print Header** (CSS)
  - File: `src/components/print.styl`
  - Article title in print
  - URL display
  - Date printed
  - ArchWiki logo

- [ ] **Print TOC** (CSS)
  - File: `src/components/print.styl`
  - Simple list format
  - Page numbers
  - Section links
  - Optional inclusion

- [ ] **Print Infobox** (CSS)
  - File: `src/components/print.styl`
  - Compact format
  - Key facts only
  - Grayscale option
  - Border styling

- [ ] **Print Footer** (CSS)
  - File: `src/components/print.styl`
  - Source URL
  - License info
  - Category list
  - Page numbers

## 🔔 Notification Styling (New)

- [ ] **Notification Badge** (CSS)
  - File: `src/components/notifications.styl`
  - Badge positioning
  - Count display
  - Alert color
  - Animation

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

- [ ] **Command Prompt Styling** (CSS)
  - File: `src/components/code.styl`
  - Prompt character styling ($, #)
  - User/host display
  - Current directory
  - Copy prompt button

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

- [ ] **Interactive Hints** (CSS)
  - File: `src/components/code.styl`
  - Editable command indicator
  - Run in terminal hint
  - Copy command button
  - Command explanation toggle

## 📋 Lists & Outlines (New)

- [ ] **Nested List Styling** (CSS)
  - File: `src/components/lists.styl`
  - Indentation levels
  - List marker variants
  - Collapsible lists
  - List continuation

- [ ] **Definition Lists** (CSS)
  - File: `src/components/lists.styl`
  - Term styling
  - Definition styling
  - Multiple definitions
  - Definition icons

- [ ] **Checklist Styling** (CSS)
  - File: `src/components/lists.styl`
  - Checkbox indicators
  - Checked state styling
  - Partial completion
  - Progress indicator

- [ ] **Step-by-Step Lists** (CSS)
  - File: `src/components/lists.styl`
  - Step number styling
  - Current step highlight
  - Completed step indicator
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

- [ ] **Focus Visible Enhancement** (CSS, 97%+ browser support)
  - File: `src/accessibility.styl`
  - :focus-visible styling
  - Custom focus rings
  - Focus outline offset
  - Keyboard navigation hints

- [ ] **Screen Reader Optimizations** (CSS, 100% browser support)
  - File: `src/accessibility.styl`
  - sr-only utility class
  - aria-label support
  - Skip to content links
  - Landmark regions

| 2026-03-01 | Twenty-first scout | Added language & localization (language selector, RTL support, translation indicators, multilingual content), maintenance tools (maintenance templates, quality assessment, protection indicators, revision management), analytics & metrics (page statistics, traffic analytics, editor activity, content metrics), modern CSS features (@property, @layer, :has(), :is()/:where()), accessibility deep cuts (reduced motion, high contrast, focus-visible, screen reader optimizations) |
