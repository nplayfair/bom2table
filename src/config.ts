//Array of part names to omit from the BOM
export const rejectedParts = [
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

//Header titles for the table
export const headers: string[] = ['Part', 'Value'];

//Config object for csv library
export const csvConfig = {
  delimiter: `;`,
  quote: '"',
  ignoreEmpty: true,
  includeColumns: /(Part|Value)/,
};
