import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ruleFacts from '../../shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const stable=value=>`${JSON.stringify(value,null,2)}\n`;
const conditionNames={
  attachment:'attachment-unknown',
  'second-character':'second-character-unknown',
  warlord:'warlord-unknown',
  detachment:'detachment-not-selected',
  'second-unit':'second-unit-unknown',
  'battle-state':'battle-state-unknown'
};
const pairKey=(unitId,ruleId)=>`${unitId}|${ruleId}`;

function ownerMatches(owner,unit){
  if(!['model','unit'].includes(owner?.subject))throw new Error(`Unsupported Enhancement owner subject: ${owner?.subject}`);
  const selector=owner.selector||{},supported=new Set(['unitIds','allKeywords','anyKeywords','noneKeywords','alternatives']);
  if(Object.keys(selector).some(key=>!supported.has(key))||(selector.alternatives||[]).length)throw new Error('Unsupported Enhancement owner selector.');
  const keywords=new Set((unit.keywords||[]).map(ruleFacts.normalizeKeyword));
  if((selector.unitIds||[]).length&&!selector.unitIds.includes(unit.id))return false;
  if((selector.allKeywords||[]).some(keyword=>!keywords.has(ruleFacts.normalizeKeyword(keyword))))return false;
  if((selector.anyKeywords||[]).length&&!(selector.anyKeywords||[]).some(keyword=>keywords.has(ruleFacts.normalizeKeyword(keyword))))return false;
  return !(selector.noneKeywords||[]).some(keyword=>keywords.has(ruleFacts.normalizeKeyword(keyword)));
}

export function buildCompatibleRules({pack,codex,datasheets,snapshot,ledger}){
  const detachments=[...pack.detachments,...codex.detachments];
  const detachmentByRule=new Map(detachments.flatMap(detachment=>[
    ...detachment.stratagems.map(rule=>[rule.id,detachment.id]),
    ...detachment.enhancements.map(rule=>[rule.id,detachment.id])
  ]));
  const unitById=new Map(datasheets.map(unit=>[unit.id,unit]));
  const rows=new Map([...unitById].map(([unitId])=>[unitId,new Map()]));
  const corrections=new Map();
  for(const entry of ledger.entries)for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){
    if(!unitById.has(unitId))continue;
    const key=pairKey(unitId,ruleId);
    if(corrections.has(key))throw new Error(`Duplicate correction: ${key}`);
    corrections.set(key,entry);
  }
  const add=(unitId,ruleId,entry,scope)=>{
    if(!rows.has(unitId))throw new Error(`Unknown matrix unit: ${unitId}`);
    if(entry?.decision==='reject'||entry?.decision==='unresolved')return;
    const row={ruleId};
    if(scope==='core')row.scope='core';
    else row.detachmentId=detachmentByRule.get(ruleId);
    if(!scope&&!row.detachmentId)throw new Error(`Missing Detachment for ${ruleId}`);
    row.state=entry?.decision==='conditional'?'conditional':'match';
    if(row.state==='conditional'){
      const conditions=[entry.conditionKind,...(entry.additionalConditions||[])].map(kind=>conditionNames[kind]);
      if(conditions.some(condition=>!condition))throw new Error(`Unknown condition metadata: ${unitId}|${ruleId}`);
      row.condition=conditions[0];
      if(conditions.length>1)row.conditions=conditions;
    }
    rows.get(unitId).set(ruleId,row);
  };
  const addSnapshot=(units,scope)=>{
    for(const [unitId,ruleIds] of Object.entries(units))for(const ruleId of ruleIds)add(unitId,ruleId,corrections.get(pairKey(unitId,ruleId)),scope);
  };
  addSnapshot(snapshot.units,null);
  addSnapshot(snapshot.coreUnits,'core');
  for(const [key,entry] of corrections){
    if(entry.side!=='matcher-only'||entry.decision==='reject'||entry.decision==='unresolved')continue;
    const [unitId,ruleId]=key.split('|');
    add(unitId,ruleId,entry,entry.scope==='core'?'core':null);
  }
  for(const detachment of detachments)for(const enhancement of detachment.enhancements){
    for(const unit of unitById.values())if(ownerMatches(enhancement.eligibility?.owner,unit)){
      rows.get(unit.id).set(enhancement.id,{ruleId:enhancement.id,kind:'enhancement',detachmentId:detachment.id,state:'match'});
    }
  }
  return {
    schema:'adeptus-mechanicus-compatible-rules/v1',
    units:Object.fromEntries([...rows].sort(([a],[b])=>a.localeCompare(b,'en')).map(([unitId,rules])=>[
      unitId,[...rules.values()].sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'))
    ]))
  };
}

export function inputs(){
  const pack=read('content/adeptus-mechanicus-rules.en.json');
  const codex=read('content/adeptus-mechanicus-codex-detachments.en.json');
  const codexDatasheets=read('content/adeptus-mechanicus-codex-datasheets.en.json').datasheets;
  const packDatasheets=new Map(pack.datasheets.map(unit=>[unit.id,unit]));
  const datasheets=codexDatasheets.map(unit=>packDatasheets.has(unit.id)?{...unit,...packDatasheets.get(unit.id),category:unit.category}:unit);
  return {pack,codex,datasheets,snapshot:read('sources/wahapedia-compatible-rules.snapshot.json'),ledger:read('sources/compatible-rules-correction-ledger.json')};
}

function main(){
  const output=stable(buildCompatibleRules(inputs())),file=path.join(root,'generated','compatible-rules.json');
  if(process.argv.includes('--check')){
    if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==output)throw new Error('Mechanicus compatible-rules matrix is stale.');
    console.log('Mechanicus compatible-rules matrix is current.');
    return;
  }
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.writeFileSync(file,output);
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
