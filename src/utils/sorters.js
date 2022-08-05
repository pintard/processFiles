const alphaComparator = (a, b) => (a[0] === b[0]) ? 0 : (a[0] < b[0]) ? -1 : 1

module.exports = {
    /**
     * Sorts the given 2-D array by order of female > male and ascending surname respectively
     *
     * @param {string[][]} records a 2-D array of formatted row/col data
     * @returns {string[][]} a sorted 2-D array of formatted row/col data
     */
    sortByGenderAndSurname: records => {
        const femaleGreaterThanMaleComparator = (a, b) => (a[2] === b[2]) ? 0 : (a[2] === 'Female') ? -1 : 1
        records.sort(alphaComparator)
        records.sort(femaleGreaterThanMaleComparator)
        return records
    },
    /**
     * Sorts the given 2-D array by order of date and ascending surname respectively
     *
     * @param {string[][]} records a 2-D array of formatted row/col data
     * @returns {string[][]} a sorted 2-D array of formatted row/col data
     */
    sortByBirthdayAndSurname: records => {
        const birthdayComparator = (a, b) => new Date(a[3]).getTime() - new Date(b[3]).getTime()
        records.sort(alphaComparator)
        records.sort(birthdayComparator)
        return records
    },
    /**
     * Sorts the given 2-D array by order of descending surname
     *
     * @param {string[][]} records a 2-D array of formatted row/col data
     * @returns {string[][]} a sorted 2-D array of formatted row/col data
     */
    sortBySurnameDesc: records => {
        records.sort((a, b) => (a[0] === b[0]) ? 0 : (a[0] > b[0]) ? -1 : 1)
        return records
    }
}