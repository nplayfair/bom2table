import { CSVParseParam } from '../node_modules/csvtojson/v2/Parameters';
import { isJunk } from './utils';
const csv = require('csvtojson');

//CSV Config for EAGLE BOM
const csvConfig = {
  delimiter: `;`,
  // quote: 'off',
  ignoreEmpty: true,
  includeColumns: /(Part|Value)/,
};

export async function csvToJSON(csvBOM: string) {
  // csv()
  //   .fromString(csvBOM)
  //   .then((jsonObj: object) => {
  //     console.log(jsonObj);
  //   });
  const obj: object = await csv({ csvConfig })
    .preRawData((csvRawData: string) => {
      return new Promise((resolve, reject) => {
        var newData = csvRawData.replace('"', '');
        resolve(newData);
      });
    })
    .fromString(csvBOM)
    .then((jsonObj: object) => {
      return jsonObj;
    });
}
export function simpleCsvToJSON(csvBOM: string) {
  csv({ csvConfig })
    .fromString(csvBOM)
    .then((jsonObj: object) => {
      console.log(jsonObj);
    });
}
