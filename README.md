# Violet-Void Theme for ArchWiki

A dark theme with handcrafted violet color palette for the ArchWiki.

## Development

Start the dev server to test your theme locally:

```bash
npm run dev
```

## Build

Compile the Stylus source to CSS:

```bash
npm run build:stylus
# or directly:
stylus src/main.styl -o stylus.css
```

## Install

Add `stylus.css` to your browser's user style extension (Stylus, UserCSS, etc.)

## Structure

- `src/variables/` - Color and layout variables
- `src/mixins/` - Reusable Stylus mixins
- `src/components/` - Component-specific styles