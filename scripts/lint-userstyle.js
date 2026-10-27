const fs = require('node:fs')
const path = require('node:path')
const { extractScopedCss } = require('./lib/userstyle-test-css')

const source = path.join(process.cwd(), 'src', 'main.css')
const css = extractScopedCss(fs.readFileSync(source, 'utf8'))

import('stylelint')
  .then(({ default: stylelint }) =>
    stylelint.lint({
      code: css,
      codeFilename: source,
      configFile: path.join(process.cwd(), '.stylelintrc.css.json'),
      formatter: 'string',
    })
  )
  .then((result) => {
    if (result.report) process.stderr.write(result.report)
    if (result.errored) process.exitCode = 1
  })
  .catch((error) => {
    console.error('CSS lint failed:', error.message)
    process.exitCode = 1
  })
