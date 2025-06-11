import { CSVParseParam } from '../node_modules/csvtojson/v2/Parameters';
import { isJunk } from './utils';
const csv = require('csvtojson');

//CSV Config for EAGLE BOM
const csvConfig = {
  delimiter: `;`,
  quote: '"',
  ignoreEmpty: true,
  includeColumns: /(Part|Value)/,
};

export async function getBOM(csvBOM: string) {
  const rawBOM = await csv(csvConfig).fromString(csvBOM);
  const bom = rawBOM.filter((part: part) => !isJunk(part));
  return bom;
}
