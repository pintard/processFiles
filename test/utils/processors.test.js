const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const { processDirectory } = require('../../src/utils/processors')

const expectedDir = path.resolve(__dirname, '../../extras')
const actualDir = path.resolve(__dirname, '../../def-method-code-test-input-files')

describe('processDirectory', () => {
    test('test for input files processing to match expected output', async () => {
        try {
            const expectedData = await readFile(path.resolve(expectedDir, 'expected_output.txt'), 'utf-8')
            const actualData = await processDirectory(actualDir)
            expect(actualData).toEqual(expectedData)
        } catch (error) {
            error && console.error(error)
        }
    })
})