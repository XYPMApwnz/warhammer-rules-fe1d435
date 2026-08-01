import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ruleFacts from '../../shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const stable=value=>`${JSON.stringify(value,null,2)}\n`;
const pair=(unitId,ruleId)=>`${unitId}|${ruleId}`;
const conditionNames={attachment:'attachment-unknown',detachment:'detachment-not-selected'};
function ownerMatches(owner,unit,extra=[]){
  const selector=owner?.selector||{},keywords=new Set([...(unit.keywords||[]),...extra].map(ruleFacts.normalizeKeyword));
  if((selector.unitIds||[]).length&&!selector.unitIds.includes(unit.id))return false;
  if((selector.allKeywords||[]).some(keyword=>!keywords.has(ruleFacts.normalizeKeyword(keyword))))return false;
  if((selector.anyKeywords||[]).length&&!selector.anyKeywords.some(keyword=>keywords.has(ruleFacts.normalizeKeyword(keyword))))return false;
  return !(selector.noneKeywords||[]).some(keyword=>keywords.has(ruleFacts.normalizeKeyword(keyword)));
}
export function inputs(){
  const pack=read('content/tyranids-faction-pack.en.json'),parity=read('content/tyranids-codex-parity.en.json'),codex=read('content/tyranids-codex-datasheets.en.json');
  return {pack,parity,datasheets:[...(codex.datasheets||[]),...(codex.imperialArmour||[]),...(codex.legends||[])],contracts:read('content/tyranids-related-rules.en.json'),snapshot:read('sources/wahapedia-compatible-rules.snapshot.json'),ledger:read('sources/compatible-rules-correction-ledger.json')};
}
export function buildCompatibleRules({pack,parity,datasheets,contracts,snapshot,ledger}){
  const detachments=[...parity.detachments,...pack.detachments],detachmentByRule=new Map(detachments.flatMap(detachment=>[...detachment.stratagems,...detachment.enhancements].map(rule=>[rule.id,detachment.id]))),rows=new Map(datasheets.map(unit=>[unit.id,new Map()]));
  const corrections=new Map();for(const entry of ledger.entries)for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){const id=pair(unitId,ruleId);if(corrections.has(id))throw new Error(`Duplicate correction ${id}`);corrections.set(id,entry);}
  const add=(unitId,ruleId,data={})=>{if(!rows.has(unitId))throw new Error(`Unknown unit ${unitId}`);rows.get(unitId).set(ruleId,{ruleId,...data});};
  for(const [unitId,ruleIds] of Object.entries(snapshot.units))for(const ruleId of ruleIds)add(unitId,ruleId,{detachmentId:detachmentByRule.get(ruleId),state:'match'});
  for(const [unitId,ruleIds] of Object.entries(snapshot.coreUnits))for(const ruleId of ruleIds)add(unitId,ruleId,{scope:'core',state:'match'});
  for(const [id,entry] of corrections){if(entry.side!=='matcher-only'||entry.decision!=='conditional')continue;const [unitId,ruleId]=id.split('|'),condition=conditionNames[entry.conditionKind];if(!condition)throw new Error(`Unknown condition ${entry.conditionKind}`);add(unitId,ruleId,{detachmentId:detachmentByRule.get(ruleId),state:'conditional',condition,conditions:[condition]});}
  for(const detachment of detachments)for(const enhancement of detachment.enhancements){
    const contract=contracts.enhancements[enhancement.id]||contracts.enhancements[enhancement.id.replace(/^enhancement-/,'')];if(!contract?.owner)throw new Error(`Missing owner contract ${enhancement.id}`);
    for(const unit of datasheets){
      if(ownerMatches(contract.owner,unit)){add(unit.id,enhancement.id,{kind:'enhancement',detachmentId:detachment.id,state:'match'});continue;}
      for(const grant of contracts.keywordGrants?.[detachment.id]||[])if(grant.selectionRequired&&(grant.selector?.unitIds||[]).includes(unit.id)&&ownerMatches(contract.owner,unit,[grant.keyword]))add(unit.id,enhancement.id,{kind:'enhancement',detachmentId:detachment.id,state:'conditional',condition:'detachment-not-selected',conditions:['detachment-not-selected']});
    }
  }
  return {schema:'tyranids-compatible-rules/v1',units:Object.fromEntries([...rows].sort(([a],[b])=>a.localeCompare(b,'en')).map(([unitId,rules])=>[unitId,[...rules.values()].sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'))]))};
}
function main(){const value=stable(buildCompatibleRules(inputs())),file=path.join(root,'generated','compatible-rules.json');if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==value)throw new Error('Tyranids compatible-rules matrix is stale.');console.log('Tyranids compatible-rules matrix is current.');return;}fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value);}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
