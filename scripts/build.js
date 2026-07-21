const { writeUserStyle } = require('./lib/userstyle-build')

writeUserStyle()
  .then(({ outputFile, bytes }) => {
    console.log(`Build complete: ${outputFile} (${bytes} bytes)`)
  })
  .catch((error) => {
    console.error('Build failed:', error.message)
    process.exitCode = 1
  })
