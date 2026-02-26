# Changelog

All notable changes to violet-void-theme_archwiki will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to date-based versioning (YYYY.MM.DD).

## [Unreleased]

### Added
- GitLab (gitlab.archlinux.org) styling support
  - Navigation sidebar and top bar styling
  - Project/group headers and lists
  - Issues and merge request styling
  - Code views, diffs, and file browser
  - Forms, buttons, dropdowns, and tables
  - Discussion threads and activity feeds
  - User profiles and markdown content
  - Flash messages and pagination
  - This fixes styling for bugs.archlinux.org which now redirects to GitLab
- EditorConfig for consistent code formatting across editors
- Comprehensive CODE_QUALITY.md documentation
- Code quality tools documentation (stylelint, prettier, pre-commit hooks)

### Changed
- Improved accessibility by replacing `:focus` with `:focus-visible` across all form controls
  - Better keyboard navigation experience
  - Reduced visual noise for mouse users
  - Updated in ui-components.styl, forms-enhanced.styl, forums.styl, mediawiki-edit.styl, and optimizations.styl
- Removed deprecated `gradient-button()` mixin (use `gradient-surface()` instead)
- Fixed stylelint configuration to use proper Stylus standard config
- Standardized selector formatting across all component files
- Improved code consistency with automated linting fixes
- Fixed indentation in main.styl and all component files
- Optimized table selector structure for better maintainability

### Fixed
- All linting errors resolved (362 errors → 0 errors)
- Selector comma formatting issues
- Indentation inconsistencies across all files
- Table selector nesting in tables.styl
- Deprecated code removal (gradient-button mixin)

## [Unreleased]

### Added
- $white color variable for consistency (replaces hardcoded 'white' references)
- hover-bg() mixin for consistent hover backgrounds across components
- Print-specific color variables for better maintainability
  - $print-border (#cccccc)
  - $print-border-light (#dddddd)
  - $print-bg (#f5f5f5)
  - $print-text (#666666)
  - $print-black (#000000)
  - $print-button-bg (#333333)
  - $print-white (#ffffff)

### Changed
- Refactored all 'color white' references to use $white variable (13 files)
- Improved code maintainability and consistency
- Replaced hardcoded hex colors in print styles with variables
  - responsive-enhanced.styl
  - responsive.styl
  - optimizations.styl

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
