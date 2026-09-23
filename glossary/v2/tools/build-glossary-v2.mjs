import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildGlossaryV2Index} from '../content/glossary-v2-index.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'generated','index.en.json');
const browserOutput=path.join(root,'generated','index.en.js');
const check=process.argv.includes('--check');
const serialized=`${JSON.stringify(await buildGlossaryV2Index(),null,2)}\n`;
const browserSerialized=`window.WH40K_GLOSSARY_V2_INDEX=${JSON.stringify(JSON.parse(serialized))};\n`;
if(check){
  if(!fs.existsSync(output)||fs.readFileSync(output,'utf8')!==serialized)throw new Error('Glossary V2 generated index is stale');
  if(!fs.existsSync(browserOutput)||fs.readFileSync(browserOutput,'utf8')!==browserSerialized)throw new Error('Glossary V2 browser index is stale');
}else{fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,serialized);fs.writeFileSync(browserOutput,browserSerialized);}
console.log(`Glossary V2 ${check?'check':'build'}: ${JSON.parse(serialized).counts.total} entries`);
