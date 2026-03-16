# Code Quality Tools

This document describes the automated code quality tools for violet-void-theme_archwiki.

## Tools Installed

### 1. **Stylelint** - CSS/Stylus Linting
Enforces consistent code style and catches errors.

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### 2. **Prettier** - Code Formatting
Automatically formats code to consistent style.

```bash
# Format all files
npm run format

# Check formatting without changes
npx prettier --check "src/**/*.styl"
```

### 3. **Pre-commit Hook** - Git Hook
Automatically runs checks before every commit.

Located at: `.git/hooks/pre-commit`

Checks:
- ✅ Linting passes
- ✅ Formatting correct
- ✅ No hardcoded colors
- ✅ No deprecated patterns
- ✅ Minimal !important usage

### 4. **EditorConfig** - Editor Settings
Ensures consistent formatting across different editors.

Located at: `.editorconfig`

Settings:
- 2-space indentation
- UTF-8 encoding
- LF line endings
- No trailing whitespace

### 5. **Stylelint Configuration** - Custom Rules
Project-specific linting rules.

Located at: `.stylelintrc.json`

Key rules:
- Max nesting depth: 3 levels
- No IDs in selectors
- Max 3 compound selectors
- Hex colors must use variables
- No vendor prefixes (use autoprefixer)

## Workflow

### Before Committing
```bash
# 1. Run linting
npm run lint:fix

# 2. Format code
npm run format

# 3. Build to verify
npm run build

# 4. Commit (hook runs automatically)
git commit -m "your message"
```

### If Pre-commit Hook Fails
The hook will show what failed and how to fix it:

```bash
# Fix linting issues
npm run lint:fix

# Fix formatting
npm run format

# Commit again
git add .
git commit -m "your message"
```

## Best Practices

### 1. Use Color Variables
```stylus
// ✅ Good
color $lighter
background-color $base

// ❌ Bad
color #e7e7e7
background-color #181818
```

### 2. Use Project Mixins
```stylus
// ✅ Good
gradient-surface()

// ❌ Bad
background linear-gradient(135deg, $base, rgba($arch-blue, 0.06))
```

### 3. Limit Nesting
```stylus
// ✅ Good (2 levels)
.parent
  .child
    color $light

// ❌ Bad (4 levels)
.level1
  .level2
    .level3
      .level4
        color $light
```

### 4. Avoid !important
```stylus
// ✅ Good - use specificity
.parent .element
  color $light

// ❌ Bad - overuse !important
.element
  color $light !important
```

### 5. Organize Properties
```stylus
.element
  // 1. Positioning
  position absolute
  top 0

  // 2. Box model
  display flex
  width 100px

  // 3. Colors
  background $base
  color $lighter

  // 4. Text
  font-size 0.9em

  // 5. Other
  border-radius $border-radius-md
```

## Common Issues & Fixes

### Issue: Hardcoded Colors
```
⚠️ Found hardcoded colors
```

**Fix:** Use color variables from `src/variables/colors.styl`

### Issue: Deprecated Patterns
```
⚠️ Found deprecated gradient-button() usage
```

**Fix:** Replace with `gradient-surface()`

### Issue: Linting Failed
```
❌ Linting failed
```

**Fix:** Run `npm run lint:fix`

### Issue: Formatting Issues
```
❌ Formatting issues found
```

**Fix:** Run `npm run format`

### Issue: Deep Nesting
```
Expected nesting depth to be no more than 3
```

**Fix:** Flatten your selectors or use `&` parent reference

## IDE Integration

### VS Code
Install extensions:
- `stylus` - Stylus language support
- `stylelint` - Linting integration
- `prettier` - Formatting integration

Settings:
```json
{
  "editor.formatOnSave": true,
  "stylelint.validate": ["stylus"],
  "stylus.validate": false
}
```

### Other Editors
Enable EditorConfig plugin for automatic formatting.

## CI/CD Integration

Add to GitHub Actions workflow:

```yaml
- name: Lint Stylus files
  run: npm run lint

- name: Check formatting
  run: npx prettier --check "src/**/*.styl"

- name: Build
  run: npm run build
```

## Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit hook (NOT RECOMMENDED)
git commit --no-verify -m "emergency fix"
```

⚠️ Only use in emergencies. Always run checks manually if bypassing.

## Getting Help

### Check Documentation
- `COMPONENT_REFERENCE.md` - Component structure
- `stylus-quality` skill - Best practices
- `INCONSISTENCIES_FIXED.md` - Common issues

### Run Diagnostics
```bash
# Full diagnostic
npm run lint
npm run format
npm run build

# Check specific file
npx stylelint src/components/button.styl
```

### Ask for Help
If stuck, the automated improvement cron job will catch and fix most issues within 15 minutes.

## Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update dev dependencies
npm update --dev
```

### Fix Vulnerabilities
```bash
# Check vulnerabilities
npm audit

# Auto-fix (be careful with breaking changes)
npm audit fix
```

## Summary

✅ **Pre-commit hook** catches issues before they're committed
✅ **Stylelint** enforces code standards
✅ **Prettier** formats code automatically
✅ **EditorConfig** ensures consistency across editors
✅ **Automated cron** fixes issues continuously

Your code is protected at multiple levels! 🐸
