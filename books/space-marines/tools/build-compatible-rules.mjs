import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ruleFacts from '../../shared/rule-facts.js';
import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8')),stable=value=>`${JSON.stringify(value,null,2)}\n`;
const titleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),keyword=value=>ruleFacts.normalizeKeyword(value);
function relationGraphs(units){
  const byTitle=new Map(units.map(unit=>[titleKey(unit.title),unit])),edges=[];
  for(const source of units)for(const [role,targets] of [['leader',source.relations?.leader||[]],['support',source.relations?.support||[]]])for(const targetName of targets){
    const names=byTitle.has(titleKey(targetName))?[targetName]:String(targetName).split(/[;,]/).map(value=>value.trim()).filter(Boolean);
    for(const name of names){const target=byTitle.get(titleKey(name));if(target)edges.push({role,sourceId:source.id,targetId:target.id});}
  }
  return buildRelationGraphs(units,edges);
}
function selectors(contract){return(contract?.roles||contract?.targets||[]).filter(role=>(role.side==='friendly'||role.side==='either')&&(role.subject||'unit')==='unit').map(role=>role.selector||role);}
function selectorMatches(selector,unitIds,keywords){
  const choices=selector.alternatives?.length?selector.alternatives:[selector];
  return choices.some(choice=>{
    if((choice.unitIds||choice.units||[]).length&&!(choice.unitIds||choice.units).some(id=>unitIds.has(id)))return false;
    if((choice.allKeywords||choice.all||[]).some(value=>!keywords.has(keyword(value))))return false;
    if((choice.anyKeywords||choice.any||[]).length&&!(choice.anyKeywords||choice.any).some(value=>keywords.has(keyword(value))))return false;
    return !(choice.noneKeywords||choice.none||[]).some(value=>keywords.has(keyword(value)));
  });
}
function potentialAttachmentOnly(contract,unit,relations){
  const targets=selectors(contract);if(!targets.length)return false;
  const intrinsic=new Set((unit.keywords||[]).map(keyword)),directIds=new Set([unit.id]);
  if(targets.some(selector=>selectorMatches(selector,directIds,intrinsic)))return false;
  for(const relation of Object.values(relations||{}).flat()){
    const combined=new Set([...intrinsic,...(relation.keywords||[]).map(keyword)]),unitIds=new Set([unit.id,relation.unitId]);
    if(targets.some(selector=>selectorMatches(selector,unitIds,combined)))return true;
  }
  return false;
}
export function build(){
  const codex=read('content/space-marines-codex-datasheets.en.json'),snapshot=read('sources/wahapedia-compatible-rules.snapshot.json'),related=read('content/space-marines-related-rules.en.json'),known=new Set(codex.datasheets.map(item=>item.id));
  if(known.size!==101||Object.keys(snapshot.units).length!==101)throw new Error('Space Marines Compatible Rules must cover exactly 101 Datasheets.');
  const unitById=new Map(codex.datasheets.map(unit=>[unit.id,unit])),relations=relationGraphs(codex.datasheets);
  const units={};
  for(const [unitId,rows] of Object.entries(snapshot.units)){
    if(!known.has(unitId))throw new Error(`Unknown Space Marines Datasheet ${unitId}`);
    const seen=new Set();units[unitId]=rows.map(row=>{if(seen.has(row.ruleId))throw new Error(`Duplicate ${unitId}|${row.ruleId}`);seen.add(row.ruleId);const contract=related.stratagems?.[row.ruleId],conditions=[...new Set([...(potentialAttachmentOnly(contract,unitById.get(unitId),relations.get(unitId))?['attachment-unknown']:[]),...(contract?.conditions||[])])];return conditions.length?{...row,state:'conditional',condition:conditions[0],conditions}:{...row,state:'match'};}).sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'));
  }
  return{schema:'space-marines-compatible-rules/v1',units:Object.fromEntries(Object.entries(units).sort(([a],[b])=>a.localeCompare(b,'en')))};
}
function main(){const file=path.join(root,'generated','compatible-rules.json'),output=stable(build());if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==output)throw new Error('Space Marines Compatible Rules matrix is stale.');console.log('Space Marines Compatible Rules matrix is current.');return;}fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,output);}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
