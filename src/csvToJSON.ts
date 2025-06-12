import { csvConfig, rejectedParts } from './config';
const csv = require('csvtojson');

export async function getBOM(csvBOM: string) {
  const rawBOM = await csv(csvConfig).fromString(csvBOM);
  const bom = rawBOM.filter((part: Part) => !rejectedParts.includes(part.Part));
  return bom;
}
