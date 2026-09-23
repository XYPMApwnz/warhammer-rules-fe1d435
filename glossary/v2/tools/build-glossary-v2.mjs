import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildGlossaryV2Index} from '../content/glossary-v2-index.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'generated','index.en.json');
const check=process.argv.includes('--check');
const serialized=`${JSON.stringify(await buildGlossaryV2Index(),null,2)}\n`;
if(check){if(!fs.existsSync(output)||fs.readFileSync(output,'utf8')!==serialized)throw new Error('Glossary V2 generated index is stale');}
else{fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,serialized);}
console.log(`Glossary V2 ${check?'check':'build'}: ${JSON.parse(serialized).counts.total} entries`);
