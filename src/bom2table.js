/* eslint-disable array-callback-return */
// Modules
const pretty = require('pretty');
const csv = require('csvtojson');

// Configuration
// Which components should we remove from the BOM?
const rejectedParts = [
  'TP1',
  'TP2',
  'TP3',
  'G',
  'U$1',
  'S1',
  'J1',
  'J2',
  'INPUT',
];

// Return false if the Part value of the object passed in is in the list to remove
function isJunk(element) {
  return !rejectedParts.includes(element.Part);
}

function partFilter(parts, category) {
  const regex = {
    C: /^C\d/,
    R: /^R\d/,
    Q: /^((?!(R\d|C\d)).)*$/,
  };
  // const allCaps = {};
  // Get only Capactiors from array
  // console.log(`regex: ${regex[category]}`);
  const caps = parts.filter((part) => part.Part.match(regex[category]));
  return caps;
}

function clearTable() {
  document.querySelector('table').innerHTML = '';
}

function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  // Populate Header row
  for (const key of data) {
    const th = document.createElement('th');
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTableBody(table, data) {
  for (const element of data) {
    const row = table.insertRow();
    for (const key in element) {
      const cell = row.insertCell();
      const text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// Format the HTML nicely and output to a pre code block
function displayMarkup() {
  const tableCode = document.querySelector('table').outerHTML;
  const markup = document.getElementById('markup');
  markup.innerText = pretty(tableCode);
}

function makeTable(csvString) {
  csv({
    delimiter: ';',
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true,
  })
    .fromString(csvString)
    .then((jsonObj) => {
      // Create array containing only relevant parts
      const parts = jsonObj.filter(isJunk);
      // console.log(parts)
      const table = document.querySelector('table');
      const headerData = Object.keys(parts[0]);
      generateTableBody(table, parts);
      generateTableHead(table, headerData);
      displayMarkup();
    })
    .catch((e) => {
      console.error(e);
    });
}

function makeJSON(csvString) {
  csv({
    delimiter: ';',
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true,
  })
    .fromString(csvString)
    .then((res) => {
      const object = res.filter(isJunk);

      // Components
      const C = {};
      const R = {};
      const Q = {};

      // caps
      let tempParts = partFilter(object, 'C');
      tempParts.map((part) => {
        C[part.Part] = part.Value;
      });
      // resistors
      tempParts = partFilter(object, 'R');
      tempParts.map((part) => {
        R[part.Part] = part.Value;
      });
      // others
      tempParts = partFilter(object, 'Q');
      tempParts.map((part) => {
        Q[part.Part] = part.Value;
      });

      const parts = {
        C,
        R,
        Q,
      };

      document.getElementById('jsonObject').innerText = JSON.stringify(
        parts,
        null,
        2,
      );
    })
    .catch((e) => {
      console.error(e);
    });
}

function handleFiles() {
  const csvFilePath = this.files[0];
  const reader = new FileReader();
  reader.readAsText(csvFilePath);
  reader.onload = () => {
    clearTable();
    // makeTable(reader.result);
    makeJSON(reader.result);
  };
}

const csvPicker = document.getElementById('csvFile');
csvPicker.addEventListener('change', handleFiles, false);
