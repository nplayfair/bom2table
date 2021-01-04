const csv = require('csvtojson')
const csvPicker = document.getElementById('csvFile')
csvPicker.addEventListener("change", handleFiles, false);

function handleFiles() {
  const csvFilePath = this.files[0]
  let reader = new FileReader()
  reader.readAsText(csvFilePath)
  reader.onload = () => makeTable(reader.result)
}

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

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  // Populate Header row
  for (let key of data) {
    let th = document.createElement("th");
    let text = document. createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTableBody (table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// Return false if the Part value of the object passed in is in the list to remove
function isJunk (element) {
  return !rejectedParts.includes(element.Part);
}

function makeTable(csvString) {
  csv({
    delimiter: ";",
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true
  })
    .fromString(csvString)
    .then(jsonObj => {
      // Create array containing only relevant parts
      let parts = jsonObj.filter(isJunk)
      // console.log(parts)
      let table = document.querySelector("table")
      let headerData = Object.keys(parts[0])
      generateTableBody(table, parts)
      generateTableHead(table, headerData)
    });
}


