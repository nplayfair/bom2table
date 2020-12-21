const csvFilePath = './tweed57_smt.csv'
const csv = require('csvtojson')

// Which components should we remove from the BOM?
const rejectedParts = [
  'TP1',
  'TP2',
  'TP3',
  'G',
  'U$1',
  'J1',
  'J2',
  'INPUT'
]

// Return false if the Part value of the object passed in is in the list to remove
function isJunk (element) {
  return !rejectedParts.includes(element.Part)
}

csv({
  delimiter: ";",
  includeColumns: /(Part|Value)/,
  ignoreEmpty: true
})
  .fromFile(csvFilePath)
  .then(jsonObj => {
    // Create array containing only relevant parts
    let parts = jsonObj.filter(isJunk)
    console.log(parts)
  })