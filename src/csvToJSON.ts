import { isJunk } from './utils';
import { csvConfig } from './config';
const csv = require('csvtojson');

export async function getBOM(csvBOM: string) {
  const rawBOM = await csv(csvConfig).fromString(csvBOM);
  const bom = rawBOM.filter((part: part) => !isJunk(part));
  return bom;
}
