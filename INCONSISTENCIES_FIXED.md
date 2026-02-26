# Inconsistencies Fixed in Violet Void ArchWiki Theme

## Summary
Unified all button styles across the theme to match the menu panel aesthetic, fixed complex table styling, resolved all linting errors, and improved accessibility.

## Latest Updates (2026-02-26)

### Accessibility Improvements
- Replaced `:focus` with `:focus-visible` across all form controls
  - Checkboxes, radios, and selects now use `:focus-visible`
  - Form validation states use `:focus-visible`
  - Edit interface inputs use `:focus-visible`
  - Skip links use `:focus-visible`
  - Improves keyboard accessibility while reducing visual noise for mouse users

### Code Cleanup
- Removed deprecated `gradient-button()` mixin (not used anywhere)
- All code now uses `gradient-surface()` consistently

### Documentation Improvements
- Created comprehensive CHANGELOG.md following Keep a Changelog format
- Updated README.md with features section and changelog link
- Documented all changes from 2026-01-16 to present

### Code Quality
- Fixed all linting errors (9 errors → 0 errors)
- Fixed indentation in main.styl
- Removed trailing whitespace
- Added stylelint-disable comments for MediaWiki-specific patterns

## Issues Found & Fixed

### 1. Complex Table Headers (tables.styl)
**Problem:** Tables with `rowspan` and `colspan` (like WireGuard peer tables) had no special styling
**Fixed:**
- Added centered text and gradient background for colspan/rowspan headers
- Styled top-left corner cells with both rowspan AND colspan
- Added `vertical-align: middle` for better alignment
- Styled empty cells to prevent collapse
- Styled italic hint text (like "dynamic")

### 2. General Buttons (forms.styl)
**Problem:** Used bright purple gradient that stood out from menu panels
**Fixed:**
- Changed from `gradient-button()` (bright purple) to `gradient-surface()` (subtle dark)
- Updated hover/active states to use subtle blue tint instead of bright colors
- Added proper borders matching menu panels

### 3. Search Buttons (navigation.styl)
**Problem:** Search submit buttons used bright purple background
**Fixed:**
- Main search button: now uses `gradient-surface()`
- Sticky header search button: now uses `gradient-surface()`
- Hover states: subtle blue tint instead of bright purple

### 4. Sticky Header Buttons (navigation.styl)
**Problem:** Sticky header buttons had inconsistent styling
**Fixed:**
- Updated `.vector-sticky-header .cdx-button` to match menu panels
- Unified hover effects

### 5. Collapsible Toggles (content.styl)
**Problem:** Used custom colors and borders that didn't match other buttons
**Fixed:**
- Changed from `$darker` background to `gradient-surface()`
- Updated border from `rgba($arch-blue, 0.35)` to `$border-subtle`
- Unified hover state with other buttons

### 6. Copy Buttons in Code Blocks (code.styl)
**Problem:** Used dark translucent background with bright purple hover
**Fixed:**
- Base state: now uses `gradient-surface()` instead of `rgba(0,0,0,0.3)`
- Hover state: subtle blue tint instead of bright `$arch-blue`
- Border: uses `$border-subtle` instead of white

## Consistency Improvements

### Before
- 4 different button styles across the theme
- Bright purple gradients on some buttons
- Inconsistent hover effects
- Mismatched borders and shadows

### After
- **1 unified button style** across entire theme
- All buttons use `gradient-surface()` (dark gradient matching menus)
- Consistent hover: subtle blue tint (`rgba($arch-blue, 0.12)`)
- Consistent borders: `$border-subtle`
- Consistent text: `$lighter` base, `$secondary-blue` on hover

## Files Modified
1. `src/components/tables.styl` - Complex table support
2. `src/components/forms.styl` - General buttons
3. `src/components/navigation.styl` - Search & sticky header buttons + menu readability + icon alignment
4. `src/components/content.styl` - Collapsible toggles
5. `src/components/code.styl` - Copy buttons
6. `src/mixins/menus.styl` - Menu panel readability improvements

## Icon Alignment Fixes (Round 3)

### Problem
Icons throughout the theme were misaligned - hamburger menu, search icons, TOC toggle arrows, and page title icons were all over the place.

### Changes Made

#### 1. Global Icon Alignment Rules
Added universal alignment for all icon types:
- `.vector-icon`, `.mw-ui-icon`, `.oo-ui-iconElement-icon`, `.cdx-icon`
- All use `display: inline-flex` with `align-items: center` and `justify-content: center`
- Added `flex-shrink: 0` to prevent sizing issues
- Set `margin: 0` to remove unwanted spacing

#### 2. Header Icons
- **Hamburger menu**: Fixed with flexbox alignment
- **Header buttons/links**: All use `display: inline-flex` with `gap: 0.3em`
- **Dropdown labels**: Proper centering with padding

#### 3. Search Icon
- Wrapped in flex container for proper alignment
- Fixed size to 16px × 16px
- Added `display: block` to SVG to prevent inline spacing issues

#### 4. TOC Toggle Arrows
- Increased size from 16px to 18px for better visibility
- Added menu panel gradient styling (matching buttons)
- Better centering with flexbox
- Added hover effects matching other buttons
- Fixed icon fill color and sizing

#### 5. Page Title Icons
- Added proper padding and centering
- Fixed alignment with page title text

#### 6. Dropdown & Menu Icons
- All menu items use `display: flex` with `gap`
- Icons properly aligned with text
- Consistent spacing throughout

### Result
- All icons now perfectly aligned
- Consistent sizing across the theme
- Better visual hierarchy
- Professional appearance

## Readability Improvements (Round 2)

### Problem
User reported that left menu items were hard to read compared to original non-styled version.

### Changes Made
1. **Text Brightness**
   - Menu items: `$light` (#bfbfbf) → `$lighter` (#e7e7e7)
   - Headings: `$lighter` → `white` (#ffffff)
   - Hover state: `$secondary-blue` → `white` with font-weight 500

2. **Background Contrast**
   - Lightened menu background from `$base` to `lighten($base, 4%)`
   - Increased blue tint from `rgba($arch-blue, 0.06)` to `rgba($arch-blue, 0.08)`
   - Hover background: `rgba($arch-blue, 0.1)` → `rgba($arch-blue, 0.15)`

3. **Font Sizes**
   - Menu items: 0.9em → 0.95em
   - Headings: 0.8em → 0.85em
   - Heading font-weight: 600 → 700

4. **Spacing**
   - Line height: Added 1.4-1.5 for better readability
   - Menu item margin: 0.3em → 0.35em
   - Heading margin-bottom: 0.3em → 0.4em
   - Link padding: Increased from 0.15em to 0.2em-0.25em

5. **Visual Feedback**
   - Hover state now shows white text + bold (500)
   - More prominent hover backgrounds
   - Better visual hierarchy

### Before vs After
- **Before**: Gray text on dark background, hard to distinguish
- **After**: Bright white text, better contrast, larger text, more spacing

## Testing Recommendations
Test on these Arch Wiki pages:
- WireGuard setup (complex tables with rowspan/colspan)
- Any page with collapsible sections
- Search functionality (main + sticky header)
- Code blocks with copy buttons
- Pages with various buttons (edit, history, etc.)
