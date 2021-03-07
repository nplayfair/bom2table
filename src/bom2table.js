/* eslint-disable array-callback-return */
// Modules
const beautify = require('js-beautify').html;
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

function getPartType(partName) {
  // console.log(partName.Part);
  if (partName.Part.match(/^C\d/) != null) {
    return 'C';
    // eslint-disable-next-line no-else-return
  } else if (partName.Part.match(/^R\d/) != null) {
    return 'R';
  }
  return 'Q';
}

function getJSONParts(allParts) {
  const jsonParts = {};
  const C = {};
  const R = {};
  const Q = {};

  allParts.map((partEntry) => {
    switch (getPartType(partEntry)) {
      case 'C':
        C[partEntry.Part] = partEntry.Value;
        break;
      case 'R':
        R[partEntry.Part] = partEntry.Value;
        break;
      default:
        Q[partEntry.Part] = partEntry.Value;
    }
  });

  jsonParts.C = C;
  jsonParts.R = R;
  jsonParts.Q = Q;

  return jsonParts;
}

// Format the HTML nicely and output to a pre code block
function displayMarkup() {
  const tableCode = document.querySelector('table').outerHTML;
  const markup = document.getElementById('markup');
  markup.innerText = beautify(tableCode);
}

// Table functions
function clearTable() {
  document.querySelector('table').innerHTML = '';
}

function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  // Populate Header row
  data.map((key) => {
    const th = document.createElement('th');
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function generateTableBody(table, data) {
  data.map((component) => {
    const row = table.insertRow();
    // Insert Part Name
    const partName = row.insertCell();
    const partNameText = document.createTextNode(component.Part);
    partName.appendChild(partNameText);
    // Insert Part Value
    const partVal = row.insertCell();
    const partValText = document.createTextNode(component.Value);
    partVal.appendChild(partValText);
  });
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
      console.log(parts);
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

// Create a JSON object for Contentful
function makeJSON(csvString) {
  csv({
    delimiter: ';',
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true,
  })
    .fromString(csvString)
    .then((res) => {
      const object = res.filter(isJunk);

      const parts = getJSONParts(object);

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
    makeTable(reader.result);
    makeJSON(reader.result);
  };
}

const csvPicker = document.getElementById('csvFile');
csvPicker.addEventListener('change', handleFiles, false);
