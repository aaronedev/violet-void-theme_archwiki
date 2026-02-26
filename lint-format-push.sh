#!/bin/bash
cd ~/dev/violet-void-theme/violet-void-theme_archwiki

echo "🔍 Running linter..."
npm run lint:fix

echo "✨ Formatting code..."
npm run format

echo "📦 Building..."
npm run build

echo "💾 Committing..."
git add -A
git commit -m "style: lint and format all code

- Run stylelint --fix on all .styl files
- Format with prettier
- Fix linting issues
- Clean up formatting inconsistencies"

echo "🚀 Pushing..."
git push

echo "✅ Done!"
