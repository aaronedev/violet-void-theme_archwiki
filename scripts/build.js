const fs = require('fs');
const path = require('path');
const stylus = require('stylus');
const autoprefixer = require('autoprefixer-stylus');
const pkg = require('../package.json');

const inputFile = path.join(__dirname, '../src/main.styl');
const outputFile = path.join(__dirname, '../dist/main.css');
const distDir = path.dirname(outputFile);

// Create dist dir if not exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate UserStyle header
const header = `/* ==UserStyle==
@name         ${pkg.name}
@version      ${pkg.userStyle.version}
@namespace    ${pkg.userStyle.namespace}
@description  ${pkg.description}
@author       ${pkg.author}
@github       ${pkg.repository.url}
@homepageURL  ${pkg.homepage}
@license      ${pkg.license}
==/UserStyle== */

`;

const stylContent = fs.readFileSync(inputFile, 'utf8');

console.log('Building CSS...');

stylus(stylContent)
  .set('filename', inputFile)
  .use(autoprefixer())
  .render((err, css) => {
    if (err) {
      console.error('Error building CSS:', err);
      process.exit(1);
    }
    
    // Check if the original @document block was preserved (Stylus usually handles it)
    // If we want to move the @document block *after* the UserStyle header (which we do),
    // we just prepend the header.
    
    const finalCss = header + css;
    fs.writeFileSync(outputFile, finalCss);
    console.log(`Build complete: ${outputFile}`);
  });
