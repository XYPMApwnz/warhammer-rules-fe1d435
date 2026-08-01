import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const bookRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const sort=value=>Array.isArray(value)?value.map(sort):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,sort(value[key])])):value;
export const stableStringify=value=>`${JSON.stringify(sort(value),null,2)}\n`;

export function detachmentByRuleId(book){
  const ids=new Map();
  const walk=(value,detachmentId)=>{
    if(Array.isArray(value))return value.forEach(item=>walk(item,detachmentId));
    if(!value||typeof value!=='object')return;
    const current=String(value.id||'').startsWith('detachment-')?value.id:detachmentId;
    if(value.type==='rule'&&String(value.id).startsWith('stratagem-')){
      if(!current||(ids.has(value.id)&&ids.get(value.id)!==current))throw new Error(`Invalid detachment mapping for ${value.id}`);
      ids.set(value.id,current);
    }
    Object.values(value).forEach(item=>walk(item,current));
  };
  walk(book.sections,null);return ids;
}

const conditionByKind=Object.freeze({attachment:'attachment-unknown','second-character':'second-character-unknown',warlord:'warlord-unknown',detachment:'detachment-not-selected'});
const keyOf=({unitId,ruleId})=>`${unitId}|${ruleId}`;

export function buildCompatibleRules({book,snapshot,ledger}){
  const detachmentIds=detachmentByRuleId(book),entries=new Map(),snapshotPairs=new Set(),corePairs=new Set();
  for(const [unitId,ruleIds] of Object.entries(snapshot.units||{}))for(const ruleId of ruleIds)snapshotPairs.add(`${unitId}|${ruleId}`);
  for(const [unitId,ruleIds] of Object.entries(snapshot.coreUnits||{}))for(const ruleId of ruleIds)corePairs.add(`${unitId}|${ruleId}`);
  if(ledger.correctionPairCount!==ledger.entries?.length)throw new Error('Ledger correction count does not match entries.');
  for(const entry of ledger.entries||[]){
    const key=keyOf(entry);
    if(entries.has(key))throw new Error(`Duplicate ledger entry: ${key}`);
    if(entry.side==='wahapedia-only'&&!snapshotPairs.has(key))throw new Error(`Wahapedia-only ledger pair is absent from snapshot: ${key}`);
    if(entry.side==='manual-only'&&snapshotPairs.has(key))throw new Error(`Manual-only ledger pair is present in snapshot: ${key}`);
    if(!['wahapedia-only','manual-only'].includes(entry.side)||!['accept','conditional','reject','unresolved'].includes(entry.decision))throw new Error(`Invalid ledger entry: ${key}`);
    if(entry.decision==='conditional'&&!conditionByKind[entry.conditionKind])throw new Error(`Invalid conditional kind: ${key}`);
    entries.set(key,entry);
  }
  if([...entries.values()].some(entry=>entry.decision==='unresolved'))throw new Error('Ledger contains unresolved pairs.');
  const manualOnly=[...entries.values()].filter(entry=>entry.side==='manual-only').length;
  if(snapshotPairs.size-entries.size+manualOnly!==ledger.sharedPairCount)throw new Error('Ledger side semantics do not match the declared shared pair count.');
  const rows=new Map(Object.keys(snapshot.units||{}).map(unitId=>[unitId,new Map()]));
  const add=(unitId,ruleId,entry)=>{
    const decision=entry?.decision||ledger.defaultSharedDecision;
    if(decision==='reject')return;
    if(decision==='unresolved')throw new Error(`Unresolved pair: ${unitId}|${ruleId}`);
    if(!detachmentIds.has(ruleId))throw new Error(`Missing detachment for ${ruleId}`);
    const row={ruleId,detachmentId:detachmentIds.get(ruleId),state:decision==='conditional'?'conditional':'match'};
    if(row.state==='conditional')row.condition=conditionByKind[entry.conditionKind];
    rows.get(unitId)?.set(ruleId,row);
  };
  for(const key of snapshotPairs){const [unitId,ruleId]=key.split('|');add(unitId,ruleId,entries.get(key));}
  for(const entry of entries.values())if(entry.side==='manual-only')add(entry.unitId,entry.ruleId,entry);
  if(corePairs.size!==ledger.coreSharedPairCount)throw new Error('Core snapshot count does not match the ledger.');
  if(ledger.coreCorrectionPairCount!==ledger.coreEntries?.length)throw new Error('Core correction count does not match entries.');
  for(const key of corePairs){const [unitId,ruleId]=key.split('|');rows.get(unitId)?.set(ruleId,{ruleId,scope:'core',state:'match'});}
  const seenCoreCorrections=new Set();
  for(const entry of ledger.coreEntries||[]){
    const key=keyOf(entry);
    if(seenCoreCorrections.has(key)||corePairs.has(key)||!rows.has(entry.unitId))throw new Error(`Invalid Core correction: ${key}`);
    if(entry.decision!=='conditional'||conditionByKind[entry.conditionKind]!=='attachment-unknown')throw new Error(`Invalid Core conditional: ${key}`);
    seenCoreCorrections.add(key);rows.get(entry.unitId).set(entry.ruleId,{ruleId:entry.ruleId,scope:'core',state:'conditional',condition:'attachment-unknown'});
  }
  const units=Object.fromEntries([...rows].sort(([a],[b])=>a.localeCompare(b,'en')).map(([unitId,ruleMap])=>[unitId,[...ruleMap.values()].sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'))]));
  return {schema:'death-guard-compatible-rules/v1',units};
}

function main(){
  const book=readJson(path.join(bookRoot,'content','death-guard-rules.en.json'));
  const snapshot=readJson(path.join(bookRoot,'sources','wahapedia-compatible-rules.snapshot.json'));
  const ledger=readJson(path.join(bookRoot,'scripts','related-rules-correction-ledger.json'));
  const output=buildCompatibleRules({book,snapshot,ledger});
  const outputFile=path.join(bookRoot,'generated','compatible-rules.json');
  fs.mkdirSync(path.dirname(outputFile),{recursive:true});fs.writeFileSync(outputFile,stableStringify(output));
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
