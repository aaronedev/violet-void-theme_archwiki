# Changelog

All notable changes to violet-void-theme_archwiki will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to date-based versioning (YYYY.MM.DD).

## [2026.03.20] - 2026-03-20

### Documentation
- Updated TODO with 11 new items from scout 54, including:
  - View Transitions Level 2: `@media (view-transition)`, `view-transition-group/inset/clip/size` properties
  - CSS Conditional Level 5: `@supports font-tech/font-format/at-rule/named-feature`
  - CSS Environment Variables Level 1: `env(text-zoom)` for text zoom control (experimental)
- Updated TODO with 64 new items (todo+)

### Testing
- Visual regression tests: 19 pass, 3 hover interaction timeouts

## [2026.03.19] - 2026-03-19

### Added
- **Modern CSS Features**
  - `@property` expansion: length/dimension custom property types
  - `[inert]` attribute styling for disabled/hidden element states
  - Maintenance template styling for ArchWiki

- **Testing**
  - Visual regression screenshots for Stylus integration

### Documentation
- Updated TODO with 50+ newly completed items from scout 52/53, including:
  - CSS features: `scroll-linked-floating`, `field-sizing: form`, `appearance base-select`, `:drop` pseudo-classes
  - Color: `color()` with CSS color space, `color-adjust()`, `oklch()` refinement
  - Text: `text-indent`, `text-underline-offset`, `overflow-clip-margin`, `text-decoration-thickness`, `white-space: break-spaces`, `text-rendering`, `tab-size`, `font-feature-settings`
  - Animation: `animation-playback-rate`, `animation-timeline view()`, `steps()` jump keywords
  - Layout: `spatial-navigation`, `scroll-snap-align`, `scroll-snap-stop`, `content-visibility: auto`
  - Pseudo-classes: `:snapped`, `:current/:past/:future` (WebVTT), `:local-link()`, `:animated-image`, `:target-current`
  - Functions: `@function`, `random-item()`
  - Extensions: FlaggedRevisions, Special:ComparePages, `input-security`

## [2026.03.16] - 2026-03-16

### Added
- **Modern CSS Features**
  - Shadow DOM support: `:host`, `:host-context()`, `:interest-source`, `:interest-target`
  - Scroll-driven animations: `scroll-timeline`, `interpolate-size` for auto-height transitions
  - View transitions: `view-transition-class` for coordinated page transitions
  - Anchor positioning API with `@position-try` fallbacks
  - `@starting-style` for entry/exit animations
  - `transition-behavior: allow-discrete` for display transitions
  - `linear()` timing function for complex easing
  - `calc-size()` for automatic sizing transitions

- **Typography & Text**
  - Text wrap control: `text-wrap: balance/pretty`, `text-wrap-mode`, `text-wrap-style`
  - Font features: `font-variant-position`, `font-optical-sizing`, `font-size-adjust`, `font-variant-alternates`
  - Font features at-rule: `@font-feature-values` for named font features
  - CJK support: `font-variant-east-asian`, `text-spacing-trim`, `text-group-align`, vertical writing mode
  - `initial-letter` drop caps
  - Line grid, line snap, and box snap CSS properties

- **Forms & Inputs**
  - Media state pseudo-classes: `:paused`, `:playing`, `:buffering`, `:muted`
  - Form validation: `:user-valid`, `:user-invalid`, `:in-range`, `:out-of-range`
  - Form states: `:default`, `:read-only`, `:read-write`, `:blank`, `:nth-child(of)`
  - Pseudo-elements: `::checkmark`, `::picker(select)`, `::file-selector-button`
  - Additional: `:autofill`, `:indeterminate`, `:picture-in-picture`

- **Tables & Layout**
  - `border-spacing` utilities for cell gaps
  - `table-layout: fixed` for performance
  - Subgrid support for nested grid alignment
  - Scrollable table wrapper for mobile
  - Sortable table enhancements

- **Performance**
  - Dynamic viewport units (`dvh`, `svh`, `lvh`) with fallbacks
  - Content-visibility patterns including `hidden=until-found`
  - Lazy loading hints with skeleton screens
  - CSS containment utilities
  - Critical CSS patterns
  - `overflow-anchor` for scroll anchoring

- **Print Enhancements**
  - Dedicated Print Theme with enhanced styles
  - Print typography improvements
  - Page break controls
  - Print TOC, header, footer styling
  - Print Infobox compact styling
  - Page orientation and print color adjust
  - Named pages and size descriptors
  - Marks and bleed for professional printing
  - Collapsible sections print styles

- **Accessibility**
  - `outline-style: auto` for platform-native focus rings
  - Screen reader optimizations and `sr-only` utilities
  - Enhanced `focus-visible` styling
  - `@media (hover: none)` for touch-only devices
  - `@media (grid)` for braille display support
  - Filter `contrast()` for improved readability
  - `:modal` pseudo-class for dialogs

- **Extensions & Special Pages**
  - Package Templates styling (Pkg, AUR, Grp)
  - TemplateData styling for parameter cards
  - Wikidata item display styling
  - Math Extension (MathML/LaTeX) styling
  - Cite extension enhancements
  - Timeline Extension styling
  - Translation Extension and Dashboard styling
  - PageForms extension styling
  - Scribunto Console styling
  - CodeMirror syntax highlighting
  - Cargo Query Interface styling
  - Map/Geo Extension styling

- **Media & Video**
  - HDR video support: `@media (video-dynamic-range)`
  - `::cue` pseudo-element for video captions

- **Search & Navigation**
  - Cross-wiki search results styling
  - Advanced search form styling
  - Search suggestions dropdown
  - CategoryTree extension styling

- **Community Features**
  - Collaborative editing indicators
  - User Talk Page Enhancements

- **UI Components**
  - Interactive hints for code blocks
  - Glassmorphism effects
  - `backdrop-filter` brightness and saturate utilities
  - `::scroll-marker` pseudo-element
  - `::highlight` for CSS Custom Highlight API
  - Empty, error, and success state styling

- **Miscellaneous**
  - `image-set()` for responsive images
  - `background-blend-mode` utilities
  - Gradient borders component
  - Masonry layout for image galleries
  - Command Line Blocks styling
  - Interwiki Link Preview styling
  - Chess/Go diagram styling
  - Related pages suggestion styling
  - Mobile navigation patterns
  - Touch-friendly edit controls
  - Definition lists and checklist styling
  - Reading List and Custom Quick Links styling
  - Notification preferences panel styling
  - Admin Dashboard and Moderation UI styling
  - User preference overrides styling
  - Lua module documentation styling
  - Systemd unit styling (service/timer/socket/path/device/mount/slice/scope)
  - PWA styling for offline indicators and install prompts
  - Notification badge and panel styling
  - Custom CSS Snippet Support in preferences
  - Template documentation subpage styling

- **Color & Effects**
  - Color spaces: `lab()`, `lch()`, `oklch()`, `color-mix()`
  - `font-palette` for color fonts
  - SVG utilities: `paint-order`, `stroke-*`, `vector-effect`, `shape-rendering`

- **CSS Utilities**
  - `aspect-ratio` for CLS optimization
  - Logical properties: `inset`, `inset-block`, `inset-inline`, `margin-block`, `margin-inline`, logical overflow
  - Grid shorthand: `place-items`, `place-content`, `place-self`
  - `scrollbar-gutter: stable` for layout stability
  - `conic-gradient` and `cross-fade()` utilities
  - CSS Math Functions utilities

### Changed
- Improved code consistency with automated linting fixes

### Fixed
- CSS paths to use correct theme location
- Replaced invalid `scroll-start/scroll-end` with `scroll-padding-block`
- Chromium-only Stylus integration flow
- High-specificity CSS overrides for tables, notice boxes, search, and content area
- Reverted `:open` pseudo-class (caused page rendering issues)
- Firefox compatibility with `@supports` wrappers for unsupported CSS
- PostCSS vulnerability via npm overrides

### Maintenance
- Removed outdated files
- Added console-fixer for headless browser CSS validation
- CSS nesting migration path documentation

## [2026.03.10] - 2026-03-10

### Added
- **Article Content Enhancements**
  - Reference list styling with tooltips and backlinks
  - Lead section styling for article intros
  - Section anchors with hover reveal pattern
  - Related articles section styling
  - Broken/red links styling for nonexistent pages
  - Drop caps (::first-letter) for article intros

- **Discussion & Talk Pages**
  - Talk page formatting enhancements
  - Reply thread styling
  - User talk notification styling

- **Special Pages**
  - Special:WhatLinksHere styling
  - User Contributions page styling
  - Special:AllPages/Special:PrefixIndex styling
  - Category page grid layout
  - Search results page enhancements

- **Edit & History**
  - Edit form enhancements
  - Page move form styling
  - Edit history list styling
  - Diff view styling enhancements

- **User & File Pages**
  - User page layout styling
  - User menu dropdown styling
  - File description page styling
  - Image gallery styling
  - Video player styling

- **Message Boxes**
  - Comprehensive message boxes styling (warning, info, note, etc.)

- **Navigation & Templates**
  - CategoryTree extension styling
  - Navbox styling for article navigation boxes
  - Sidebar template styling (archwiki-templates component)
  - Template documentation subpage styling

- **Search Enhancements**
  - Search suggestions dropdown styling

- **Code & Typography**
  - Enhanced command prompt styling for ArchWiki
  - `white-space-collapse` for fine-grained whitespace control
  - Comprehensive widows/orphans control for print

- **Modern CSS Features**
  - `::target-text` pseudo-element styling
  - `::spelling-error` and `::grammar-error` pseudo-elements
  - `::file-selector-button` styling for themed file inputs
  - `:open` pseudo-class for unified open state styling
  - `@property` for animatable CSS custom properties
  - `@scope` for component isolation
  - `@layer` cascade control
  - `@counter-style` for custom list markers
  - `attr()` with `type()` function for dynamic component styling
  - `color-mix()` function for dynamic color mixing
  - `transition-behavior: allow-discrete` for display transitions
  - Comprehensive `:has()` selector usage for parent-child styling
  - `:is()` and `:where()` selectors
  - `interpolate-size` for auto transitions
  - `content-visibility` for off-screen content performance
  - `will-change` for smoother navigation animations
  - `scroll-snap` for TOC and code blocks (mobile UX)
  - `scroll-padding` for sticky header offsets
  - `scrollbar-gutter: stable` for layout stability
  - Logical properties for RTL support
  - Logical overflow properties for RTL/writing-mode support
  - `prefers-reduced-transparency` support

- **Typography Enhancements**
  - `text-align-last` for justified text control
  - `font-variant-numeric` for number formatting
  - `hyphens: auto` for narrow columns
  - `text-decoration-skip-ink` for better underlines
  - Multi-column layout support

- **Additional Features**
  - Capability detection (MathML, Ruby, masks, containers)
  - Display, visibility, interaction, sizing utilities
  - Animation, outline, counter utilities
  - Image-rendering, object-position, caret-color
  - Fluid typography with clamp()
  - Advisory boxes, infoboxes, navigation enhancements
  - Playwright visual regression testing

- **Print Enhancements**
  - Enhanced `@page` styles with margins and page numbers

### Changed
- Downgraded stylelint to v16 for stylus plugin compatibility
- Improved code consistency with automated linting fixes
- Refactored print styles to use color variables
- Replaced hardcoded print colors with variables
- Improved accessibility with focus-visible across components

### Fixed
- Indentation and stylelint config for view-transitions
- @starting-style CSS syntax and stylelint warnings
- Stylelint warnings in modern-css.styl
- All linting errors resolved
- Build process issues
- Global `:defined` selector removed to restore inline element flow
- `:open` pseudo-class reverted (caused page rendering issues)
- PostCSS vulnerability via npm overrides
- Firefox compatibility with `@supports` wrappers for unsupported CSS
- Invalid `:contains()` pseudo-class removed from stylelint config

### Maintenance
- Added test artifacts to .gitignore (screenshots/, test-results/, playwright-report/)
- Refined .gitignore for IDE directories
- Untracked build artifacts
- Removed outdated files (applied patch, old scripts)
- Updated dependencies
- Added console-fixer for headless browser CSS validation
- Code formatting and linting improvements

### Performance
- `overflow-anchor` for scroll anchoring control

## [2026.02.26] - 2026-02-26

### Added
- MediaWiki edit interface styling (complete coverage)
  - Edit forms and toolbars
  - Preview and diff views
  - Login/create account forms
  - User preferences
  - Upload interface
  - Page history
  - Protection/delete interfaces
  - Move/rename page
  - Contributions and watchlist
  - Recent changes
  - Admin tools (userrights, block)
  - Notifications and success messages
- Performance optimizations component
  - Print optimizations
  - High contrast mode support
  - Dark mode system preference handling
  - Monochrome display support
  - Reduced data mode
  - Animation performance improvements
  - CSS containment
  - Scrolling performance
  - Text rendering optimization
  - Grid/flexbox fallbacks
  - Legacy browser support
  - Screen reader improvements
  - RTL support
  - Loading states
  - Error states
  - Custom scrollbar styling
- Comprehensive UI components library
  - Checkboxes, radios, selects
  - File inputs
  - Color inputs
  - Range sliders
  - Progress bars
  - Badges and tags
  - Alerts
  - Modals and dialogs
  - Tooltips
  - Tabs
  - Pagination
  - Breadcrumbs
  - Spinners and loading states
- Forum styling for bbs.archlinux.org (FluxBB)
  - Posts and threads
  - Code blocks and quotes
  - User profiles
  - Navigation
- Enhanced accessibility features
  - `:focus-visible` support for all buttons and inputs
  - Improved keyboard navigation
  - Screen reader optimizations
  - Reduced motion support

### Changed
- Refactored code for improved quality and consistency
- Unified all button styles with menu panel aesthetic
  - Changed from bright purple gradient to subtle dark gradient
  - Updated hover states to use consistent blue tint
  - Matched border styling across all button types
- Improved menu readability
  - Increased text brightness (#bfbfbf → #e7e7e7)
  - Lightened background colors
  - Increased font sizes (0.9em → 0.95em)
  - Better spacing and line height
  - Enhanced hover feedback
- Fixed icon alignment throughout theme
  - Global icon alignment rules using flexbox
  - Header icons (hamburger menu, search)
  - TOC toggle arrows
  - Page title icons
  - Dropdown and menu icons
- Code formatting and linting improvements

### Fixed
- Complex table header styling (rowspan/colspan support)
- Button consistency issues across components
- Menu text contrast problems
- Icon alignment bugs
- Search button styling
- Collapsible toggle styling
- Copy button styling in code blocks
- Build process issues

## [2026.02.25] - 2026-02-25

### Added
- Responsive enhancements
  - Accessibility improvements
  - Better mobile support
  - Print styles
- Additional UI components

### Changed
- Code formatting improvements
- Linting fixes

### Fixed
- Table styling issues
- Navigation alignment
- Button styling inconsistencies

## [2026.02.24] - 2026-02-24

### Added
- Complex table support
  - Rowspan and colspan header styling
  - Empty cell styling
  - Italic hint text styling
  - Vertical alignment improvements

### Changed
- Unified button styles to match menu panels
- Improved menu readability
- Enhanced icon alignment

### Fixed
- Table header styling
- Menu contrast issues
- Icon positioning

## [2026.02.22] - 2026-02-22

### Added
- Accessibility features
  - Reduced motion support
  - High contrast mode
  - Screen reader optimizations
- Print styles
- Responsive design improvements

### Changed
- Code cleanup and refactoring
- Improved color consistency
- Better component organization

### Fixed
- Alignment issues across components
- Density improvements
- Navigation spacing

## [2026.01.16] - 2026-01-16

### Fixed
- Navigation alignment issues

## Initial Release

### Added
- Base violet-void color palette
- Core component styles
- ArchWiki-specific styling
- AUR support
- Basic responsive design
- Syntax highlighting for code blocks
- Table styling
- Form elements
- Navigation components
- Message boxes and alerts
