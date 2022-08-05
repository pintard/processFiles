const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const {
    sortByGenderAndSurname,
    sortByBirthdayAndSurname,
    sortBySurnameDesc
} = require('./sorters')
const { csv, psv, ssv } = require('../constants/tableTemplates')

/**
 * Processes a given directory to execute sorting and formatting on the contents of each file asynchronously
 *
 * @param {string} inputDir the directory to process
 */
const processDirectory = async inputDir => {
    const fileNames = fs.readdirSync(inputDir)

    return Promise.all(fileNames.map(fileName =>
        readFile(path.resolve(inputDir, fileName), 'utf-8')))
        .then(fileBodies => {
            const data = fileBodies.join('\n')
            const records = processData(data)
            return processOutput(records)
        })
}

/**
 * Takes the concatenated data from multiple files, tabularizes it, filters the columns matching the target schema,
 * formats the tabularized data and returns a 2-D array of the data
 *
 * @param {string} data the concatenated data from multiple files
 * @returns {string[][]} a 2-D array of formatted row/col data
 */
const processData = data => data.split('\n').map(record => {
    const schema = new Map([
        ['lastName', undefined],
        ['firstName', undefined],
        ['gender', undefined],
        ['dateOfBirth', undefined],
        ['favoriteColor', undefined]
    ])
    const assignSchema = (pattern, vals) =>
        Array.from(pattern.entries()).forEach(([i, key]) =>
            schema.has(key) && schema.set(key, vals[i].trim()))

    if (record.indexOf(',') >= 0)
        assignSchema(csv, record.split(','))
    else if (record.indexOf('|') >= 0)
        assignSchema(psv, record.split('|'))
    else assignSchema(ssv, record.split(' '))

    if (schema.get('gender').length === 1)
        schema.set('gender', schema.get('gender') === 'M' ? 'Male' : 'Female')
    schema.set('dateOfBirth', schema.get('dateOfBirth').replace(/-/g, '/'))
    return Array.from(schema.values())
})

/**
 * Generates a well formatted output given various sorting schemes
 *
 * @param {string[][]} records a 2-D array of formatted row/col data
 */
const processOutput = records => {
    const sortingFuncs = [
        sortByGenderAndSurname,
        sortByBirthdayAndSurname,
        sortBySurnameDesc
    ]
    let output = ''
    for (const [i, func] of sortingFuncs.entries()) {
        const sortedRecords = func(records)
        const stringifiedRecords = sortedRecords.map(record => record.join(' ')).join('\n')
        output += `Output ${i + 1}:\n${stringifiedRecords}\n\n`
    }
    return output
}

module.exports = {
    processData,
    processOutput,
    processDirectory
}