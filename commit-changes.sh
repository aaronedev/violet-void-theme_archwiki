#!/bin/bash
cd ~/dev/violet-void-theme/violet-void-theme_archwiki
git add src/components/tables.styl src/components/forms.styl src/components/navigation.styl src/components/content.styl src/components/code.styl src/mixins/menus.styl
git commit -m "Fix table styling, unify buttons, improve menu readability, align all icons

- Add support for complex table headers (rowspan/colspan)
- Style empty cells and italic hints in tables
- Unify ALL buttons to match menu panel gradient style
- Update all hover states to use subtle blue tint
- Remove bright purple gradients in favor of dark gradients
- IMPROVE MENU READABILITY:
  * Increase text brightness from \$light to \$lighter
  * Increase heading brightness to white
  * Lighten menu background for better contrast
  * Increase font sizes for better readability
  * Increase line-height for better spacing
  * Add font-weight 500 on hover for better feedback
- FIX ICON ALIGNMENT:
  * Add global icon alignment rules for all icons
  * Fix hamburger menu icon alignment in header
  * Fix search icon alignment in search bar
  * Fix TOC toggle arrow alignment (larger, better centered)
  * Fix page title icon alignment
  * Ensure all icons use flexbox with proper centering
  * Add consistent spacing with gap property
  * Fix icons in dropdown menus and menu items
  * Ensure all SVG icons display as block elements"
git push
echo "✓ Changes committed and pushed!"

