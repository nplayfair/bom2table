const csvFilePath = './mkII.csv'
const csv = require('csvtojson')

csv({
  delimiter: ";",
  includeColumns: /(Part|Value)/,
  ignoreEmpty: true
})
  .fromFile(csvFilePath)
  .then(parts => {
    console.log(parts)
  })