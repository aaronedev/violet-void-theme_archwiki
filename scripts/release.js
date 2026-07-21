const fs = require('node:fs/promises')
const path = require('node:path')
const { DEFAULT_ROOT_DIR, writeUserStyle } = require('./lib/userstyle-build')

const VERSION_PATTERN = /^\d+(?:\.\d+)+$/

function validateVersion(version) {
  if (!VERSION_PATTERN.test(version || '')) {
    throw new Error(
      'Expected one dot-separated numeric version, for example 2026.07.21'
    )
  }
}

async function releaseVersion(version, { rootDir = DEFAULT_ROOT_DIR } = {}) {
  validateVersion(version)

  const packageFile = path.join(rootDir, 'package.json')
  const packageSource = await fs.readFile(packageFile, 'utf8')
  const pkg = JSON.parse(packageSource)
  pkg.userStyle.version = version

  await fs.writeFile(packageFile, `${JSON.stringify(pkg, null, 2)}\n`)

  try {
    return await writeUserStyle({ rootDir })
  } catch (error) {
    await fs.writeFile(packageFile, packageSource)
    throw error
  }
}

if (require.main === module) {
  releaseVersion(process.argv[2])
    .then(({ outputFile, bytes, version }) => {
      console.log(`Released ${version}: ${outputFile} (${bytes} bytes)`)
    })
    .catch((error) => {
      console.error(`Release failed: ${error.message}`)
      process.exitCode = 1
    })
}

module.exports = { VERSION_PATTERN, releaseVersion, validateVersion }
