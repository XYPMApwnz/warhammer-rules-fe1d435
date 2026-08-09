import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8')),stable=value=>`${JSON.stringify(value,null,2)}\n`;
export function build(){
  const codex=read('content/space-marines-codex-datasheets.en.json'),snapshot=read('sources/wahapedia-compatible-rules.snapshot.json'),related=read('content/space-marines-related-rules.en.json'),known=new Set(codex.datasheets.map(item=>item.id));
  if(known.size!==101||Object.keys(snapshot.units).length!==101)throw new Error('Space Marines Compatible Rules must cover exactly 101 Datasheets.');
  const units={};
  for(const [unitId,rows] of Object.entries(snapshot.units)){
    if(!known.has(unitId))throw new Error(`Unknown Space Marines Datasheet ${unitId}`);
    const seen=new Set();units[unitId]=rows.map(row=>{if(seen.has(row.ruleId))throw new Error(`Duplicate ${unitId}|${row.ruleId}`);seen.add(row.ruleId);const conditions=related.stratagems?.[row.ruleId]?.conditions||[];return conditions.length?{...row,state:'conditional',condition:conditions[0],conditions}:{...row,state:'match'};}).sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'));
  }
  return{schema:'space-marines-compatible-rules/v1',units:Object.fromEntries(Object.entries(units).sort(([a],[b])=>a.localeCompare(b,'en')))};
}
function main(){const file=path.join(root,'generated','compatible-rules.json'),output=stable(build());if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==output)throw new Error('Space Marines Compatible Rules matrix is stale.');console.log('Space Marines Compatible Rules matrix is current.');return;}fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,output);}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
