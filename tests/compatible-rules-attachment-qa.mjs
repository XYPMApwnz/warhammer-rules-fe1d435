import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';
await import('../books/shared/related-rules-matcher.js');

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),books=['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const decode=value=>value.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#x([0-9a-f]+);/gi,(_,number)=>String.fromCodePoint(parseInt(number,16))).replace(/&#(\d+);/g,(_,number)=>String.fromCodePoint(Number(number)));
const normalize=value=>ruleFacts.normalizeKeyword(value);
function unitFacts(book){
  const html=fs.readFileSync(path.join(root,'books',book,'reader.html'),'utf8'),facts=new Map();
  for(const match of html.matchAll(/data-rule-facts="([^"]+)"/g)){const value=JSON.parse(decode(match[1]));facts.set(value.id||value.unitId,value);}
  return facts;
}
function contracts(book){
  const records=new Map(),files=book==='adeptus-mechanicus'?['adeptus-mechanicus-rules.en.json']:book==='death-guard'?[]:[`${book}-related-rules.en.json`];
  for(const file of files){const data=read(`books/${book}/content/${file}`);if(data.stratagems&&!Array.isArray(data.stratagems))for(const [id,value] of Object.entries(data.stratagems))records.set(id,value);const visit=value=>{if(!value||typeof value!=='object')return;if(value.id&&value.eligibility)records.set(value.id,value.eligibility);for(const child of Object.values(value))visit(child);};visit(data);}
  return records;
}
function selectors(contract){
  if(!contract||contract.owner?.selector)return[];
  if(contract.roles)return contract.roles.filter(role=>(role.side==='friendly'||role.side==='either')&&(role.subject||'unit')==='unit').map(role=>role.selector||{});
  if(contract.targets)return contract.targets.filter(role=>(role.side||'friendly')==='friendly'&&(role.subject||'unit')==='unit').map(role=>({unitIds:role.units||role.unitIds||[],allKeywords:role.all||role.allKeywords||[],anyKeywords:role.any||role.anyKeywords||[],noneKeywords:role.none||role.noneKeywords||[],alternatives:role.alternatives||[]}));
  return[];
}
function matches(selector,unitIds,keywords){
  const choices=selector.alternatives?.length?selector.alternatives:[selector];
  return choices.some(choice=>{
    const ids=choice.unitIds||choice.units||[];
    if(ids.length&&!ids.some(id=>unitIds.has(id)))return false;
    if((choice.allKeywords||choice.all||[]).some(value=>!keywords.has(normalize(value))))return false;
    if((choice.anyKeywords||choice.any||[]).length&&!(choice.anyKeywords||choice.any).some(value=>keywords.has(normalize(value))))return false;
    return !(choice.noneKeywords||choice.none||[]).some(value=>keywords.has(normalize(value)));
  });
}
function attachmentOnly(contract,unit){
  const targets=selectors(contract),intrinsic=new Set((unit.intrinsicKeywords||unit.keywords||[]).map(normalize));
  if(!targets.length||targets.some(selector=>matches(selector,new Set([unit.id||unit.unitId]),intrinsic)))return false;
  for(const relation of Object.values(unit.relations||{}).flat()){
    const combined=new Set([...intrinsic,...(relation.keywords||[]).map(normalize)]),ids=new Set([unit.id||unit.unitId,relation.unitId]);
    if(targets.some(selector=>matches(selector,ids,combined)))return true;
  }
  return false;
}
const conditions=row=>new Set(row.conditions?.length?row.conditions:row.condition?[row.condition]:[]);
const coverage={};
for(const book of books){
  const facts=unitFacts(book);
  if(book==='death-guard'){
    const ledger=read('books/death-guard/scripts/related-rules-correction-ledger.json'),matrix=read('books/death-guard/generated/compatible-rules.json');let count=0;
    for(const entry of ledger.entries.filter(item=>item.decision==='conditional'&&item.conditionKind==='attachment')){const row=matrix.units[entry.unitId]?.find(item=>item.ruleId===entry.ruleId);assert(row&&row.state==='conditional'&&conditions(row).has('attachment-unknown'),`death-guard: ${entry.unitId}|${entry.ruleId} lost attachment-unknown`);count++;}
    coverage[book]=count;continue;
  }
  const ruleContracts=contracts(book);
  if(book==='dark-angels'){
    let count=0;
    for(const unit of facts.values())for(const contract of ruleContracts.values())if(attachmentOnly(contract,unit)){
      const profile=ruleFacts.profileFromRecord({...unit,candidates:[]}),result=globalThis.WHRelatedRules.match(contract,profile);
      assert.notEqual(result.state,'match',`dark-angels: ${unit.id} gained an unconditional relation-only match`);
      assert.equal(ruleFacts.staticCompatible(result),false,`dark-angels: ${unit.id} exposes a relation-only static rule`);count++;
    }
    coverage[book]=count;continue;
  }
  const matrix=read(`books/${book}/generated/compatible-rules.json`);let count=0;
  for(const [unitId,rows] of Object.entries(matrix.units)){const unit=facts.get(unitId);for(const row of rows){const contract=ruleContracts.get(row.ruleId);if(!contract||!attachmentOnly(contract,unit))continue;count++;assert.equal(row.state,'conditional',`${book}: ${unitId}|${row.ruleId} is an unconditional potential-attachment match`);assert(conditions(row).has('attachment-unknown'),`${book}: ${unitId}|${row.ruleId} lost attachment-unknown`);assert.equal(ruleFacts.staticCompatible(row),false,`${book}: ${unitId}|${row.ruleId} leaks into static Compatible Rules`);}}
  coverage[book]=count;
}
for(const relationKey of ['canLead','canSupport','canBeLedBy','canBeSupportedBy']){
  const relations={canLead:[],canSupport:[],canBeLedBy:[],canBeSupportedBy:[]};relations[relationKey]=[{unitId:'unit-partner',keywords:['SKITARII'],removeKeywords:[]}];
  const profile=ruleFacts.profileFromRecord({unitId:'unit-subject',keywords:['CHARACTER'],intrinsicKeywords:['CHARACTER'],relations,candidates:[],attachmentKnown:false}),result=globalThis.WHRelatedRules.match({roles:[{id:'target',side:'friendly',subject:'unit',selector:{allKeywords:['SKITARII']}}]},profile);
  assert.equal(result.state,'conditional',`${relationKey} produced ${result.state}`);assert.equal(ruleFacts.staticCompatible(result),false,`${relationKey} leaked into static Compatible Rules`);
}
const mechanicum=read('books/adeptus-mechanicus/generated/compatible-rules.json'),manipulus=mechanicum.units['unit-tech-priest-manipulus'],vanguard=mechanicum.units['unit-skitarii-vanguard'],aggressor=row=>row.ruleId==='stratagem-aggressor-imperative';
const manipulusAggressor=manipulus.find(aggressor),vanguardAggressor=vanguard.find(aggressor),manipulusFacts=unitFacts('adeptus-mechanicus').get('unit-tech-priest-manipulus');
assert(!manipulusFacts.intrinsicKeywords.map(normalize).includes('SKITARII'),'Manipulus gained intrinsic SKITARII');
assert.equal(manipulusAggressor.state,'conditional');assert(conditions(manipulusAggressor).has('attachment-unknown'));assert.equal(ruleFacts.filterStaticCompatible(manipulus).some(aggressor),false);
const rosterPresenceOnly=['unit-tech-priest-manipulus','unit-skitarii-vanguard'];assert(rosterPresenceOnly.includes('unit-skitarii-vanguard'));assert.equal(ruleFacts.filterStaticCompatible(manipulus).some(aggressor),false,'Roster co-presence changed Manipulus compatibility without attachment context');
assert.equal(vanguardAggressor.state,'match');assert.equal(ruleFacts.filterStaticCompatible(vanguard).some(aggressor),true);
console.log(`Compatible Rules attachment QA passed for 9 books: ${Object.entries(coverage).map(([book,count])=>`${book}=${count}`).join(', ')}.`);
