const fs = require('node:fs')
const path = require('node:path')
const postcss = require('postcss')
const { CANONICAL_FILENAME, DEFAULT_ROOT_DIR } = require('./userstyle-build')

function extractScopedCss(userCss) {
  const root = postcss.parse(userCss)
  const documentSections = root.nodes.filter(
    (node) => node.type === 'atrule' && node.name === '-moz-document'
  )

  if (documentSections.length !== 1) {
    throw new Error(
      `Expected exactly one top-level @-moz-document, found ${documentSections.length}`
    )
  }

  const documentSection = documentSections[0]
  for (const node of root.nodes) {
    if (node !== documentSection && node.type !== 'comment') {
      throw new Error(`Refusing top-level ${node.type} outside @-moz-document`)
    }
  }

  return documentSection.nodes.map((node) => node.toString()).join('')
}

function readScopedUserStyle({ rootDir = DEFAULT_ROOT_DIR } = {}) {
  const artifactPath = path.join(rootDir, 'dist', CANONICAL_FILENAME)
  return extractScopedCss(fs.readFileSync(artifactPath, 'utf8'))
}

async function injectUserStyle(page, options) {
  await page.addStyleTag({ content: readScopedUserStyle(options) })
}

module.exports = {
  extractScopedCss,
  injectUserStyle,
  readScopedUserStyle,
}
