const fs = require('node:fs/promises')
const path = require('node:path')
const autoprefixer = require('autoprefixer-stylus')
const postcss = require('postcss')
const stylus = require('stylus')

const CANONICAL_FILENAME = 'violet-void-theme-archwiki.user.css'
const MAX_ARTIFACT_BYTES = 1_000_000
const DEFAULT_ROOT_DIR = path.resolve(__dirname, '../..')

function renderStylus(source, inputFile) {
  return new Promise((resolve, reject) => {
    stylus(source)
      .set('filename', inputFile)
      .set('compress', true)
      .use(autoprefixer())
      .render((error, css) => {
        if (error) {
          reject(error)
          return
        }

        resolve(css)
      })
  })
}

function metadataHeader(pkg) {
  const metadata = [
    ['name', pkg.name],
    ['namespace', pkg.userStyle.namespace],
    ['version', pkg.userStyle.version],
    ['description', pkg.description],
    ['author', pkg.author],
    ['homepageURL', pkg.userStyle.homepageURL],
    ['supportURL', pkg.userStyle.supportURL],
    ['updateURL', pkg.userStyle.updateURL],
    ['license', pkg.license],
  ]

  for (const [field, value] of metadata) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error(`Missing UserCSS metadata: ${field}`)
    }
  }

  const lines = metadata.map(
    ([field, value]) => `@${field.padEnd(12)} ${value}`
  )
  return `/* ==UserStyle==\n${lines.join('\n')}\n==/UserStyle== */\n\n`
}

function scopeBubbledAtRules(css) {
  const root = postcss.parse(css)
  const documentSections = root.nodes.filter(
    (node) => node.type === 'atrule' && node.name === '-moz-document'
  )

  if (documentSections.length !== 1) {
    throw new Error(
      `Expected one @-moz-document section, found ${documentSections.length}`
    )
  }

  const documentSection = documentSections[0]
  for (const node of [...root.nodes]) {
    if (node === documentSection || node.type === 'comment') {
      continue
    }

    if (node.type !== 'atrule') {
      throw new Error(
        `Refusing to relocate top-level ${node.type} outside @-moz-document`
      )
    }

    documentSection.append(node)
  }

  return root.toString()
}

async function buildUserStyle({ rootDir = DEFAULT_ROOT_DIR } = {}) {
  const packageFile = path.join(rootDir, 'package.json')
  const inputFile = path.join(rootDir, 'src', 'main.styl')
  const [packageSource, stylusSource] = await Promise.all([
    fs.readFile(packageFile, 'utf8'),
    fs.readFile(inputFile, 'utf8'),
  ])
  const pkg = JSON.parse(packageSource)
  const css = scopeBubbledAtRules(await renderStylus(stylusSource, inputFile))
  const output = metadataHeader(pkg) + css
  const bytes = Buffer.byteLength(output)

  if (bytes > MAX_ARTIFACT_BYTES) {
    throw new Error(
      `Generated artifact is ${bytes} bytes; maximum is ${MAX_ARTIFACT_BYTES}`
    )
  }

  return { bytes, css: output, version: pkg.userStyle.version }
}

async function writeUserStyle({
  rootDir = DEFAULT_ROOT_DIR,
  outputFile = path.join(rootDir, 'dist', CANONICAL_FILENAME),
} = {}) {
  const result = await buildUserStyle({ rootDir })

  await fs.mkdir(path.dirname(outputFile), { recursive: true })
  await fs.writeFile(outputFile, result.css)

  return { ...result, outputFile }
}

module.exports = {
  CANONICAL_FILENAME,
  DEFAULT_ROOT_DIR,
  MAX_ARTIFACT_BYTES,
  buildUserStyle,
  metadataHeader,
  scopeBubbledAtRules,
  writeUserStyle,
}
