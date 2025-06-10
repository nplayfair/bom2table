export function isJunk(element: part): boolean {
  // Returns true if element is in the rejected list
  return rejectedParts.includes(element.Part);
}

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

// TODO
/*
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
  'IN',
  'OUT',
];
