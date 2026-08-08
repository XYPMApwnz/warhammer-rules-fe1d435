import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const stable=value=>`${JSON.stringify(value,null,2)}\n`;
const pair=(unitId,ruleId)=>`${unitId}|${ruleId}`;
const conditionNames={attachment:'attachment-unknown'};

export function inputs(){
  const codex=read('content/emperors-children-codex-datasheets.en.json');
  return {datasheets:codex.datasheets||[],pack:read('content/emperors-children-faction-pack.en.json'),parity:read('content/emperors-children-codex-parity.en.json'),snapshot:read('sources/wahapedia-compatible-rules.snapshot.json'),ledger:read('sources/compatible-rules-correction-ledger.json'),owners:read('sources/enhancement-owner-matrix.json')};
}
export function buildCompatibleRules({datasheets,pack,parity,snapshot,ledger,owners}){
  const packRuleIds=new Set(pack.detachments.flatMap(detachment=>detachment.stratagems.map(rule=>rule.id))),allRules=[...pack.detachments,...parity.detachments].flatMap(detachment=>detachment.stratagems.map(rule=>[rule.id,detachment.id])),detachmentByRule=new Map(allRules),rows=new Map(datasheets.map(unit=>[unit.id,new Map()]));
  const add=(unitId,ruleId,data)=>{const unitRows=rows.get(unitId);if(!unitRows)throw new Error(`Unknown unit ${unitId}`);const id=pair(unitId,ruleId);if(unitRows.has(ruleId))throw new Error(`Duplicate matrix row ${id}`);unitRows.set(ruleId,{ruleId,...data});};
  for(const [unitId,ruleIds] of Object.entries(snapshot.units))for(const ruleId of ruleIds)add(unitId,ruleId,{detachmentId:detachmentByRule.get(ruleId),state:'match',authority:packRuleIds.has(ruleId)?'official-faction-pack-v1.0':'secondary-codex-parity'});
  for(const [unitId,ruleIds] of Object.entries(snapshot.coreUnits))for(const ruleId of ruleIds)add(unitId,ruleId,{scope:'core',state:'match',authority:'official-core-rules-local-render'});
  const ledgerPairs=new Set();
  for(const entry of ledger.entries){
    if(entry.decision!=='conditional')continue;
    const condition=conditionNames[entry.conditionKind];if(!condition)throw new Error(`Unknown condition ${entry.conditionKind}`);
    for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){const id=pair(unitId,ruleId);if(ledgerPairs.has(id))throw new Error(`Duplicate ledger pair ${id}`);ledgerPairs.add(id);add(unitId,ruleId,{...(entry.scope==='core'?{scope:'core'}:{detachmentId:detachmentByRule.get(ruleId)}),state:'conditional',condition,conditions:[condition],authority:entry.authority});}
  }
  for(const [ruleId,enhancement] of Object.entries(owners.enhancements)){
    if(enhancement.status==='unresolved-owner')continue;
    const owner=owners.ownerGroups[enhancement.ownerGroup];if(!owner)throw new Error(`Missing owner group ${enhancement.ownerGroup} for ${ruleId}`);
    const isUpgrade=enhancement.tags.includes('UPGRADE'),assignment=isUpgrade?owners.defaults.upgradeAssignment:owners.defaults.standardAssignment;
    if(owner.subject!==(isUpgrade?'unit':'model'))throw new Error(`Incorrect owner subject for ${ruleId}`);
    for(const unitId of owner.unitIds)add(unitId,ruleId,{kind:'enhancement',detachmentId:enhancement.detachmentId,state:'match',authority:enhancement.authority,tags:enhancement.tags,ownerSubject:owner.subject,assignment});
  }
  return {schema:'emperors-children-compatible-rules/v1',scope:{datasheets:datasheets.length,factionPackStratagems:15,codexStratagems:36,coreStratagems:10},units:Object.fromEntries([...rows].sort(([a],[b])=>a.localeCompare(b,'en')).map(([unitId,rules])=>[unitId,[...rules.values()].sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'))]))};
}
function main(){const value=stable(buildCompatibleRules(inputs())),file=path.join(root,'generated','compatible-rules.json');if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==value)throw new Error("Emperor's Children compatible-rules matrix is stale.");console.log("Emperor's Children compatible-rules matrix is current.");return;}fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value);}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
