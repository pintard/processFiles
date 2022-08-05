const path = require('path')
const { processDirectory } = require('./utils/processors')

const inputDir = path.resolve(__dirname, '../def-method-code-test-input-files')
processDirectory(inputDir).then(console.log)