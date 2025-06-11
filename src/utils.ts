import { rejectedParts } from './config';

export function isJunk(element: part): boolean {
  // Returns true if element is in the rejected list
  return rejectedParts.includes(element.Part);
}

//Table functions
export function clearTable() {
  document.querySelector('table')!.innerHTML = '';
}

export const htmlTable = document.getElementById(
  'partsTable',
) as HTMLTableElement;
const headers: string[] = ['Part', 'Value'];

export function createTableHeader(): void {
  const tHead = htmlTable.createTHead();
  const hRow = tHead.insertRow();
  //Populate headers with text
  for (const header of headers) {
    const th = document.createElement('th');
    const headerText = document.createTextNode(header);
    th.appendChild(headerText);
    hRow.appendChild(th);
  }
}

export function createTableBody(table: HTMLTableElement, parts: part[]) {
  parts.map((component) => {
    //Create a row
    const tRow = table.insertRow();
    //Insert part name
    const partName = tRow.insertCell();
    const partNameText = document.createTextNode(component.Part);
    partName.appendChild(partNameText);
    //Insert part value
    const partValue = tRow.insertCell();
    const partValText = document.createTextNode(component.Value);
    partValue.appendChild(partValText);
  });
}

// TODO
/*

export function getPartType(component: part) {
  if (component.Part.match(/^C\d/) != null) {
    return 'C';
  } else if (component.Part.match(/^R\d/) != null) {
    return 'R';
  } else if (component.Part.match(/^Q\d/) != null) {
    return 'Q';
  } else if (component.Part.match(/^IC\d/) != null) {
    return 'IC';
  }
  return 'COMPONENT';
}


function getJSONParts(allParts: part[]) {
  const jsonParts: structuredParts = {
    C: {},
    R: {},
  };

  allParts.map((partEntry: part) => {
    // Sort parts into capacitors, resistors and others
    switch (getPartType(partEntry)) {
      case 'C':
        jsonParts.C[partEntry.Part] = partEntry.Value;
        break;
      case 'R':
        jsonParts.R[partEntry.Part] = partEntry.Value;
        break;
      case 'Q':
        jsonParts.Q?[partEntry.Part] = partEntry.Value;
        break;
      case 'IC':
        jsonParts.IC?[partEntry.Part] = partEntry.Value;
        break;
      default:
        jsonParts.COMPONENT?[partEntry.Part] = partEntry.Value;
    }
  });
  return jsonParts;
}
*/
