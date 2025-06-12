//Modules
import { getBOM } from './csvToJSON';
import { PartsTable } from './table';
import { headers } from './config';

//DOM elements
const input = document.getElementById('csvInput') as HTMLInputElement;
const csvTextOutput = document.getElementById('csvText') as HTMLPreElement;
const jsonTextOutput = document.getElementById('partsJSON') as HTMLPreElement;
const partsHTML = document.getElementById('partsHTML') as HTMLPreElement;
const htmlTable = document.getElementById('partsTable') as HTMLTableElement;

let csvBOM: string;

//Functions
function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files![0];
  if (file) {
    //Read in from the file
    const reader = new FileReader();
    reader.onload = function (e) {
      processCSV(e);
    };
    reader.readAsText(file);
  }
}

function processCSV(fileReader: Event) {
  const content = (fileReader.target as FileReader).result;
  if (content === null) throw new Error('CSV Cannot be null.');
  const csvString = content.toString();
  csvBOM = csvString;
  //Display the CSV contents
  csvTextOutput.innerText = csvString;
  //JSON Object
  printJSONbom(csvString);
  //Table
  createTable();
  //TODO Table HTML code
}

//Print JSON
async function printJSONbom(csvString: string) {
  const bomJSON = await getBOM(csvString);
  jsonTextOutput.innerText = JSON.stringify(bomJSON, null, 2);
}

//Construct table
async function createTable() {
  const bomJSON = await getBOM(csvBOM);
  const partsTable = new PartsTable(htmlTable, headers, bomJSON);
  const tableMarkup = await partsTable.createTable();
  printHTMLtable(tableMarkup as HTMLTableElement, partsHTML);
}

//Print HTML code
async function printHTMLtable(
  table: HTMLTableElement,
  codeBlock: HTMLPreElement,
) {
  codeBlock.innerText = table.outerHTML;
}

//Add event listener
input.addEventListener('change', handleUpload);

/* TODO
// Format the HTML nicely and output to a pre code block
function displayMarkup() {
  const tableCode = document.querySelector('table')!.outerHTML;
  const markup = document.getElementById('markup') as HTMLElement;
  markup.innerText = beautify(tableCode);
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
*/
