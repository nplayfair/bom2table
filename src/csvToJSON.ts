import { isJunk } from './utils';

const csvBOM = '/tests/bom.csv';
const csv = require('csvtojson');

export function csvToJSON(csvBOM: string): void {
  csv()
    .fromString(csvBOM)
    .then((jsonObj: object) => {
      console.log(jsonObj);
    });
}
