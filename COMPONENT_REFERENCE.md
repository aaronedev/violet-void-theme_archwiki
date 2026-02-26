# Violet Void ArchWiki Theme - Component Reference

Complete reference of all styled components and their locations.

## Component Files

### Core Components
- **base.styl** - Root styles, CSS variables, scrollbar theming
- **content.styl** - Links, headings, collapsible sections
- **navigation.styl** - Sidebar, TOC, search, header, icon alignment
- **code.styl** - Code blocks, syntax highlighting, copy buttons

### Forms & Input
- **forms.styl** - Basic buttons, inputs, dropdowns
- **forms-enhanced.styl** - Validation, toggle switches, tags input, autocomplete
- **ooui-enhanced.styl** - Comprehensive MediaWiki OOUI component library
  - Buttons (primary, destructive, disabled)
  - Checkboxes & radios
  - Toggle switches
  - Dropdowns
  - Text inputs
  - Dialogs & modals
  - Popup menus
  - Toolbars
  - Progress bars
  - Tabs
  - Field layouts

### Tables & Data
- **tables.styl** - Wiki tables, infoboxes, rowspan/colspan support

### Messaging & Boxes
- **boxes.styl** - Warning/tip/note boxes, message boxes

### Site-Specific
- **forums.styl** - bbs.archlinux.org (FluxBB) styling
- **gitlab.styl** - gitlab.archlinux.org (GitLab) styling
- **aur-enhanced.styl** - aur.archlinux.org (AUR) comprehensive styling
  - Package listings and search
  - Package details and metadata
  - Package actions (vote, flag)
  - Dependencies and files
  - Comments
  - User accounts

### UI Components
- **ui-components.styl** - Checkboxes, radios, badges, alerts, modals, etc.
- **typography.styl** - Lists, blockquotes, keyboard shortcuts, status indicators

### Wiki Features
- **wiki-templates.styl** - Related articles, categories, references, navigation boxes
- **mediawiki-edit.styl** - Edit interface, login, preferences, admin tools

### Utilities
- **utilities.styl** - Animations, utility classes, state indicators
- **responsive-enhanced.styl** - Accessibility, responsive design, print styles
- **print-enhanced.styl** - Enhanced print styles for all Arch Linux sites
  - Print-optimized layouts
  - Typography for print
  - URL display for links
  - Page breaks and margins
  - Site-specific optimizations
- **optimizations.styl** - Performance, RTL support, browser compatibility

## Recent Improvements (2026-02-26)

### Accessibility
- Added `:focus-visible` support for buttons and inputs
- Improved keyboard navigation across all interactive elements

### New Components
- **mediawiki-edit.styl**: Complete edit interface styling
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

- **optimizations.styl**: Performance and compatibility
  - Print optimizations
  - High contrast mode support
  - Dark mode system preference handling
  - Monochrome display support
  - Reduced data mode
  - Animation performance
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

## Coverage

### Arch Linux Sites (100%)
- ✅ wiki.archlinux.org - Full support
- ✅ bbs.archlinux.org - Full support
- ✅ aur.archlinux.org - Full support
- ✅ archlinux.org/packages - Full support
- ✅ bugs.archlinux.org - Full support
- ✅ gitlab.archlinux.org - Full support
- ✅ man.archlinux.org - Full support

### Page Types
- ✅ Article pages
- ✅ Category pages
- ✅ Special pages
- ✅ Edit pages
- ✅ History pages
- ✅ User pages
- ✅ Talk pages
- ✅ File pages
- ✅ Search results

### Elements
- ✅ All text elements (paragraphs, headings, lists)
- ✅ All interactive elements (links, buttons, inputs)
- ✅ All structural elements (tables, infoboxes, templates)
- ✅ All media (images, videos, code blocks)
- ✅ All wiki-specific elements (templates, categories, references)
- ✅ All edit interface elements
- ✅ All admin interface elements

## Color Palette

### Background Colors
- `$darker` (#0f0f0f) - Darkest background
- `$dark` (#202020) - Secondary background
- `$base` (#181818) - Primary background

### Text Colors
- `$lighter` (#e7e7e7) - Primary text
- `$light` (#bfbfbf) - Secondary text

### Accent Colors
- `$arch-blue` (#8950c7) - Primary accent
- `$secondary-blue` (#c7b8ff) - Secondary accent
- `$secondary-red` (#ff1a67) - Errors
- `$green` (#4bfe9b) - Success
- `$orange` (#fd7cff) - Warnings

## Accessibility

- ✅ WCAG AA compliant contrast ratios
- ✅ Focus states for keyboard navigation
- ✅ Screen reader support
- ✅ Reduced motion support
- ✅ High contrast mode support
- ✅ RTL language support

## Performance

- ✅ GPU-accelerated animations
- ✅ CSS containment for better rendering
- ✅ Optimized scroll performance
- ✅ Lazy loading support
- ✅ Print-optimized styles
- ✅ Minimal CSS selector specificity

## Browser Support

- ✅ Firefox (latest)
- ✅ Chrome/Chromium (latest)
- ✅ Edge (latest)
- ✅ Safari (with minor prefixes)
- ✅ Opera (latest)
- ✅ Brave (latest)

## File Sizes

- **Total source**: ~95KB (Stylus)
- **Compiled CSS**: ~95KB (unminified)
- **Minified + Gzipped**: ~12-15KB (estimated)

## Features

### Interactive
- Hover effects on all interactive elements
- Smooth transitions (150-250ms)
- Loading states
- Error states
- Success states

### Responsive
- 5 breakpoints (320px - 1920px)
- Touch-optimized (44px targets)
- Mobile-first approach
- Landscape support

### Accessibility
- Skip links
- ARIA support
- Keyboard navigation
- Focus indicators
- Screen reader text

### Print
- Optimized for black & white
- Hidden non-essential elements
- Page break handling
- Link URLs visible

## Customization

### Variables
All colors, spacing, and typography defined in:
- `src/variables/colors.styl`
- `src/variables/layout.styl`

### Mixins
Reusable patterns in:
- `src/mixins/effects.styl`
- `src/mixins/gradients.styl`
- `src/mixins/menus.styl`

### Utilities
Helper classes in:
- `src/components/utilities.styl`

## Testing

Run tests with:
```bash
npm run lint          # Lint all Stylus files
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format with Prettier
npm run build         # Build CSS
```

## Troubleshooting

### Styles not applying
1. Clear browser cache
2. Rebuild CSS: `npm run build`
3. Check Stylus extension is enabled

### Contrast issues
- All text meets WCAG AA standards
- Use `$lighter` for primary text
- Use `$light` for secondary text only

### Mobile issues
- Check viewport meta tag
- Test with real devices
- Verify touch targets (44px minimum)

## Contributing

1. Edit Stylus files in `src/`
2. Run `npm run lint:fix`
3. Run `npm run build`
4. Test on multiple pages
5. Submit pull request

## License

MIT License - See LICENSE file
