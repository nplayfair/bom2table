// Modules
import { csvToJSON } from './csvToJSON';

const input = document.getElementById('csvInput') as HTMLInputElement;
const csvText = document.getElementById('csvText') as HTMLPreElement;

//Functions
function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files![0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = (e.target as FileReader).result;
      if (content === null) throw new Error('CSV Cannot be null.');
      csvText.innerText = content.toString();
    };
    reader.readAsText(file);
  }
}

//Add event listener
input.addEventListener('change', handleUpload);

// csvToJSON();

/* TODO
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

csvPicker.onchange = function handleFiles(event: Event) {
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
*/
