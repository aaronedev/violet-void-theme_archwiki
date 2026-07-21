const fs = require('node:fs')
const path = require('node:path')
const { DEFAULT_ROOT_DIR, writeUserStyle } = require('./lib/userstyle-build')

async function startWatch({
  rootDir = DEFAULT_ROOT_DIR,
  log = console.log,
} = {}) {
  const build = async () => {
    const { outputFile, bytes } = await writeUserStyle({ rootDir })
    log(`Build complete: ${outputFile} (${bytes} bytes)`)
  }

  await build()

  let timer
  let building = false
  let queued = false
  const rebuild = async () => {
    if (building) {
      queued = true
      return
    }

    building = true
    try {
      await build()
    } catch (error) {
      console.error('Watch build failed:', error.message)
    } finally {
      building = false
      if (queued) {
        queued = false
        await rebuild()
      }
    }
  }

  const watcher = fs.watch(
    path.join(rootDir, 'src'),
    { recursive: true },
    () => {
      clearTimeout(timer)
      timer = setTimeout(rebuild, 100)
    }
  )
  watcher.on('close', () => clearTimeout(timer))
  log(`Watching ${path.join(rootDir, 'src')}`)

  return watcher
}

if (require.main === module) {
  startWatch().catch((error) => {
    console.error('Watch failed:', error.message)
    process.exitCode = 1
  })
}

module.exports = { startWatch }
