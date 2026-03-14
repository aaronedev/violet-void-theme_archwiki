const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const STYLUS_DOWNLOAD_URL =
  'https://github.com/openstyles/stylus/releases/download/v2.3.17/stylus-chrome-mv3-2.3.17-e722d0b-id.zip'
const TEMP_ZIP = 'stylus-extension.zip'
const EXT_DIR = path.join(__dirname, '../tests/integration/stylus')

async function setup() {
  console.log('Setting up Stylus extension for integration tests...')

  // Create directory
  if (!fs.existsSync(EXT_DIR)) {
    fs.mkdirSync(EXT_DIR, { recursive: true })
  }

  // Download ZIP
  console.log(`Downloading Stylus from ${STYLUS_DOWNLOAD_URL}...`)
  try {
    execSync(`curl -L -o ${TEMP_ZIP} ${STYLUS_DOWNLOAD_URL}`)
  } catch (error) {
    console.error('Failed to download Stylus:', error)
    process.exit(1)
  }

  // Extract ZIP
  console.log(`Extracting to ${EXT_DIR}...`)
  try {
    execSync(`unzip -o ${TEMP_ZIP} -d ${EXT_DIR}`)
  } catch (error) {
    console.error('Failed to extract Stylus:', error)
    process.exit(1)
  }

  // Cleanup ZIP
  fs.unlinkSync(TEMP_ZIP)

  console.log('Stylus extension setup complete!')
}

setup()
