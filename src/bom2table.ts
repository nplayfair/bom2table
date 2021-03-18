/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable array-callback-return */
// Modules
import { html as beautify } from 'js-beautify';
import csv from 'csvtojson';
import { Converter } from 'csvtojson/v2/Converter';

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
  'JP1',
  'JP2',
  'V',
  'I',
  'O',
  'T1',
  'T2',
  'T3',
  'INPUT',
];

// Return false if the Part value of the object passed in is in the list to remove
function isJunk(element: part) {
  return !rejectedParts.includes(element.Part);
}

function getPartType(component: part) {
  // console.log(partName.Part);
  if (component.Part.match(/^C\d/) != null) {
    return 'C';
    // eslint-disable-next-line no-else-return
  } else if (component.Part.match(/^R\d/) != null) {
    return 'R';
  }
  return 'Q';
}

function getJSONParts(allParts: part[]) {
  const jsonParts: structuredParts = {
    C: {},
    R: {},
    Q: {},
  };

  allParts.map((partEntry: part) => {
    switch (getPartType(partEntry)) {
      case 'C':
        jsonParts.C[partEntry.Part] = partEntry.Value;
        break;
      case 'R':
        jsonParts.R[partEntry.Part] = partEntry.Value;
        break;
      default:
        jsonParts.Q[partEntry.Part] = partEntry.Value;
    }
  });
  return jsonParts;
}

// Format the HTML nicely and output to a pre code block
function displayMarkup() {
  const tableCode = document.querySelector('table')!.outerHTML;
  const markup = document.getElementById('markup') as HTMLElement;
  markup.innerText = beautify(tableCode);
}

// Table functions
function clearTable() {
  document.querySelector('table')!.innerHTML = '';
}

function generateTableHead(table: HTMLTableElement, data: Array<string>) {
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

function generateTableBody(table: HTMLTableElement, data: part[]) {
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

async function makeTable(csvString: string) {

  const converter: Converter = csv({
    delimiter: ';',
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true,
  })

  const jsonArray = await converter.fromString(csvString);
  // Filter out unwanted parts
  const parts = jsonArray.filter(isJunk);
  // Build table
  const table = document.querySelector('table') as HTMLTableElement;
  const headerData = Object.keys(parts[0]);
  generateTableBody(table, parts);
  generateTableHead(table, headerData);
  displayMarkup();
}

// Create a JSON object for Contentful
function makeJSON(csvString: string) {
  csv({
    delimiter: ';',
    includeColumns: /(Part|Value)/,
    ignoreEmpty: true,
  })
    .fromString(csvString)
    .then((res) => {
      const object = res.filter(isJunk);

      const parts = getJSONParts(object);

      document.getElementById('jsonObject')!.innerText = JSON.stringify(
        parts,
        null,
        2,
      );
    });
}

const csvPicker = document.getElementById('csvFile') as HTMLInputElement;
// csvPicker?.addEventListener('change', handleFiles, false);
csvPicker.onchange = function handleFiles(event: Event) {
  // const csvFile = event.target.files[0];
  const target = event.target as HTMLInputElement;
  const csvFile: File = (target.files as FileList)[0];
  const reader = new FileReader();
  reader.readAsText(csvFile);
  reader.onload = () => {
    if (reader.result == null) {
      throw new Error('Something went wrong.');
    }
    const csvString = reader.result.toString();
    clearTable();
    makeTable(csvString);
    makeJSON(csvString);
  };
}
