# CSS Nesting Migration Path

> Documenting the path from Stylus to native CSS nesting

## Overview

This document outlines the migration strategy from Stylus (`.styl`) to native CSS nesting. The Violet Void ArchWiki theme currently uses 66 Stylus component files with extensive nesting patterns.

## Current Stylus Patterns

### 1. Parent Reference (`&`)

**Stylus:**
```stylus
a
  &:hover
    color $arch-blue
  &:focus
    outline 2px solid $arch-blue
```

**Native CSS:**
```css
a:hover {
  color: var(--arch-blue);
}
a:focus {
  outline: 2px solid var(--arch-blue);
}
```

**Note:** In native CSS, `&` is implicit. Each nested rule becomes a separate CSS rule.

### 2. Pseudo-classes and Pseudo-elements

**Stylus:**
```stylus
.element
  &::before
    content "→"
  &:first-child
    margin-top 0
```

**Native CSS:**
```css
.element::before {
  content: "→";
}
.element:first-child {
  margin-top: 0;
}
```

### 3. Attribute Selectors

**Stylus:**
```stylus
.input
  &[type="text"]
    border 1px solid $border
  &[disabled]
    opacity 0.5
```

**Native CSS:**
```css
.input[type="text"] {
  border: 1px solid var(--border);
}
.input[disabled] {
  opacity: 0.5;
}
```

### 4. Class Chains

**Stylus:**
```stylus
.box
  &.warning
    background $orange
  &.error
    background $red
```

**Native CSS:**
```css
.box.warning {
  background: var(--orange);
}
.box.error {
  background: var(--red);
}
```

### 5. Media Queries

**Stylus:**
```stylus
.container
  padding 1rem
  
  @media (min-width: 768px)
    padding 2rem
```

**Native CSS:**
```css
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## Variable Migration

### Stylus Variables (`$var`)

**Stylus:**
```stylus
$arch-blue = #6846c4
$border-radius-md = 6px
```

**CSS Custom Properties:**
```css
:root {
  --arch-blue: #6846c4;
  --border-radius-md: 6px;
}
```

### Migration Strategy

1. Keep variables in a central `:root` block
2. Replace `$variable` references with `var(--variable)`
3. Consider keeping Stylus for variable definitions only (hybrid approach)

## Mixin Migration

### Stylus Mixins

**Stylus:**
```stylus
focus-ring()
  &:focus-visible
    outline 2px solid $arch-blue
    outline-offset 2px
```

**Native CSS:**
```css
:focus-visible {
  outline: 2px solid var(--arch-blue);
  outline-offset: 2px;
}
```

### Alternative: `@property` for Typed Custom Properties

**CSS:**
```css
@property --transition-fast {
  syntax: '<time>';
  initial-value: 0.15s;
  inherits: false;
}
```

## Special Cases

### 1. @supports Wrappers

**Stylus:**
```stylus
@supports (hanging-punctuation: first)
  blockquote
    hanging-punctuation first
```

**Native CSS (unchanged):**
```css
@supports (hanging-punctuation: first) {
  blockquote {
    hanging-punctuation: first;
  }
}
```

### 2. @layer Declarations

**Stylus:**
```stylus
@layer base, components, utilities, overrides
```

**Native CSS (unchanged):**
```css
@layer base, components, utilities, overrides;
```

### 3. @css{} Wrapper (Stylus-specific)

Native CSS features that require `@css{}` in Stylus work natively:
- `@property`
- `@scope`
- View Transitions
- `anchor()` positioning

## File Conversion Strategy

### Phase 1: Inventory
- [x] Count Stylus files: 66 components
- [ ] Catalog mixin usage
- [ ] Catalog variable dependencies
- [ ] Identify complex selectors

### Phase 2: Tooling
- [ ] Set up PostCSS with postcss-nesting
- [ ] Create conversion script (stylus → css-nesting)
- [ ] Test with subset of files

### Phase 3: Incremental Migration
- [ ] Migrate one component at a time
- [ ] Maintain feature parity
- [ ] Update build pipeline

### Phase 4: Deprecation
- [ ] Remove Stylus dependency
- [ ] Rename `.styl` to `.css`
- [ ] Update imports

## Build Pipeline Changes

### Current (Stylus)
```json
{
  "stylus": "^0.63.0",
  "build": "stylus -w src -o dist"
}
```

### Target (Native CSS)
```json
{
  "postcss": "^8.4.0",
  "postcss-nesting": "^12.0.0",
  "build": "postcss src -o dist"
}
```

## Browser Support

Native CSS nesting supported in:
- Chrome 112+ ✅
- Firefox 117+ ✅
- Safari 16.5+ ✅
- Edge 112+ ✅

Global coverage: ~93%

## Hybrid Approach (Recommended)

Keep Stylus for:
1. Variable definitions
2. Mixins (until CSS functions mature)
3. Import organization

Migrate to CSS:
1. All selectors and nesting
2. Media queries
3. Pseudo-classes/elements

### Example: Hybrid File

**variables.styl (keep):**
```stylus
$arch-blue = #6846c4
$transition-fast = 0.15s
```

**component.css (migrate):**
```css
@use './variables.styl' as *;

.button {
  background: var(--arch-blue);
  transition: background var(--transition-fast);
  
  &:hover {
    background: color-mix(in srgb, var(--arch-blue), white 10%);
  }
}
```

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Selector specificity changes | Medium | Test thoroughly, use specificity hints |
| Mixin loss | Medium | Use CSS custom properties, @property |
| Variable scope | Low | Centralize in :root |
| Browser compatibility | Low | 93% global support |

## Timeline Estimate

- **Inventory**: 1 hour
- **Tooling setup**: 2-4 hours
- **Per-file migration**: ~15 min × 66 files = 16.5 hours
- **Testing**: 4-8 hours
- **Total**: ~25-30 hours

## Decision Points

1. **When to start**: When browser support exceeds 95% or Stylus becomes unmaintained
2. **Migration scope**: Full migration vs. hybrid approach
3. **Backward compatibility**: Keep Stylus build as fallback during transition
