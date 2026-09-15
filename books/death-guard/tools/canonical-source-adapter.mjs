import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';
import {pointTierContract} from '../../shared/tools/point-tier-contract.mjs';
import {canonicalTargetsFromProse} from '../../shared/tools/canonical-join-contract.mjs';
import {effectiveEffectContracts,validateEffectContractSet} from '../../shared/tools/effect-contract.mjs';
import {createEffectivePointsProjection} from '../../shared/tools/effective-points-projection.mjs';
import {persistCanonicalWeaponProfileIdentities} from '../../shared/tools/build-roster-catalog.mjs';
import {EFFECTIVE_BOOK_MODEL_SCHEMA,createEffectiveBookModel} from '../../shared/tools/effective-book-model.mjs';
import ruleFactsApi from '../../shared/rule-facts.js';

const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const keywordId=value=>`keyword-${slug(value)}`;
const plainKeywordNames=new Set(['CHAOS LORD','CULTISTS','POSSESSED','SORCERER']);
export const coreTermIdByCode=Object.freeze({'15.02':'core-rule-15-02-command-re-roll','15.03':'core-rule-15-03-epic-challenge','15.04':'core-rule-15-04-insane-bravery','15.05':'core-rule-15-05-explosives','15.06':'core-rule-15-06-crushing-impact','15.07':'core-rule-15-07-rapid-ingress','15.08':'core-stratagem-fire-overwatch','15.10':'core-rule-15-10-smokescreen','15.11':'core-rule-15-11-heroic-intervention','15.12':'core-rule-15-12-counteroffensive'});

const normalizeFactText=value=>String(value??'').normalize('NFKC').replace(/[\u2010-\u2015]/g,'-').replace(/\s+/g,' ').trim().toLowerCase();
const uniqueIndex=(items,keyFor,label)=>{
  if(!Array.isArray(items))throw new Error(`Death Guard MFM ownership: ${label} is not an array`);
  const index=new Map();
  for(const item of items){const key=keyFor(item);if(!key)throw new Error(`Death Guard MFM ownership: ${label} has an empty identity`);if(index.has(key))throw new Error(`Death Guard MFM ownership: duplicate ${label} identity ${key}`);index.set(key,item);}
  return index;
};
const assertSameIdentities=(canonical,official,label)=>{
  const missing=[...canonical.keys()].filter(key=>!official.has(key)),extra=[...official.keys()].filter(key=>!canonical.has(key));
  if(missing.length||extra.length)throw new Error(`Death Guard MFM ownership: ${label} identity mismatch; missing [${missing.join(', ')}], extra [${extra.join(', ')}]`);
};
const mfmTierKey=label=>{
  const bounds=pointTierContract.parseTierLabel(label);
  if(bounds.minModels!==undefined||bounds.minCopies===undefined&&normalizeFactText(label).replace(/^your\s+/,'').replace(/\s+costs?$/,'')!=='unit')throw new Error(`Death Guard MFM ownership: unsupported official schedule label ${label}`);
  return pointTierContract.boundsKey(bounds);
};
const canonicalPointKey=label=>{
  const bounds=pointTierContract.parseTierLabel(label);
  if(bounds.minModels===undefined)throw new Error(`Death Guard MFM ownership: unsupported canonical point label ${label}`);
  return pointTierContract.boundsKey(bounds);
};
const officialPointRows=unit=>{
  const rows=[];
  for(const schedule of unit.schedules||[]){const tier=mfmTierKey(schedule.label);if(!Array.isArray(schedule.values)||!schedule.values.length)throw new Error(`Death Guard MFM ownership: ${unit.unitId} has an empty official schedule`);for(const point of schedule.values){const model=pointTierContract.parseTierLabel(point.label);if(model.minModels===undefined||model.minCopies!==undefined)throw new Error(`Death Guard MFM ownership: unsupported official model label ${point.label}`);rows.push({key:pointTierContract.boundsKey({...model,...pointTierContract.parseTierLabel(schedule.label)}),value:point.value});}}
  return rows;
};
const reconcilePointRows=(canonicalRows,officialRows,label)=>{
  const canonical=uniqueIndex(canonicalRows,row=>canonicalPointKey(row.label),`${label} canonical brackets`),official=uniqueIndex(officialRows,row=>row.key,`${label} official brackets`);
  assertSameIdentities(canonical,official,`${label} brackets`);
  for(const [key,row] of canonical)if(row.value!==official.get(key).value)throw new Error(`Death Guard MFM ownership: ${label} value mismatch for ${key}: canonical ${row.value}, official ${official.get(key).value}`);
  return canonicalRows.map(row=>({...row,value:official.get(canonicalPointKey(row.label)).value}));
};
const reconcileNamedRows=(canonicalRows,officialRows,label)=>{
  const canonical=uniqueIndex(canonicalRows||[],row=>normalizeFactText(row.label),`${label} canonical records`),official=uniqueIndex(officialRows||[],row=>normalizeFactText(row.label),`${label} official records`);
  assertSameIdentities(canonical,official,label);
  for(const [key,row] of canonical)if(row.value!==official.get(key).value)throw new Error(`Death Guard MFM ownership: ${label} value mismatch for ${key}: canonical ${row.value}, official ${official.get(key).value}`);
  return (canonicalRows||[]).map(row=>({...row,value:official.get(normalizeFactText(row.label)).value}));
};
const enhancementIdentity=(detachmentId,title)=>`${detachmentId}|enhancement-${slug(String(title).replace(/\s*\(Upgrade\)\s*$/i,''))}`;
const officialEnhancements=points=>{
  const nested=[];
  for(const detachment of points.detachments||[]){const detachmentId=`detachment-${slug(detachment.title)}`;for(const enhancement of detachment.enhancements||[])nested.push({...enhancement,detachmentId,key:enhancementIdentity(detachmentId,enhancement.title),upgrade:/\(Upgrade\)\s*$/i.test(enhancement.title)});}
  const nestedIndex=uniqueIndex(nested,item=>item.key,'official Detachment Enhancements');
  const flatIndex=uniqueIndex((points.enhancements||[]).map(item=>{const detachmentId=`detachment-${slug(item.detachment)}`;return {...item,detachmentId,key:enhancementIdentity(detachmentId,item.title)};}),item=>item.key,'official Enhancement inventory');
  assertSameIdentities(nestedIndex,flatIndex,'official Enhancement inventories');
  for(const [key,item] of nestedIndex)if(item.value!==flatIndex.get(key).value)throw new Error(`Death Guard MFM ownership: official Enhancement inventory value mismatch for ${key}`);
  return nestedIndex;
};

export function applyDeathGuardMfmOwnership(book,points,expected={}){
  if(points?.schema!==1||!Array.isArray(points.units)||!Array.isArray(points.detachments)||!Array.isArray(points.enhancements))throw new Error('Death Guard MFM ownership: invalid official source schema');
  const canonicalUnits=uniqueIndex(book.sections.filter(section=>section.kind==='unit'),unit=>unit.id,'canonical Datasheets'),officialUnits=uniqueIndex(points.units,unit=>unit.unitId,'official Datasheets');
  assertSameIdentities(canonicalUnits,officialUnits,'Datasheet');
  if(points.counts?.units!==officialUnits.size||expected.datasheets!==undefined&&expected.datasheets!==officialUnits.size)throw new Error('Death Guard MFM ownership: Datasheet count metadata mismatch');
  for(const [unitId,unit] of canonicalUnits){
    const official=officialUnits.get(unitId),pointBlocks=(unit.blocks||[]).filter(block=>block.type==='points');
    if(pointBlocks.length!==1)throw new Error(`Death Guard MFM ownership: ${unitId} must have exactly one canonical points block`);
    const rows=officialPointRows(official),pointBlock=pointBlocks[0];
    unit.points=reconcilePointRows(unit.points||[],rows,`${unitId} section points`);
    pointBlock.values=reconcilePointRows(pointBlock.values||[],rows,`${unitId} point block`);
    pointBlock.wargear=reconcileNamedRows(pointBlock.wargear||[],official.paidWargear||[],`${unitId} paid wargear`);
  }
  const canonicalDetachments=uniqueIndex(book.sections.filter(section=>section.id?.startsWith('detachment-')),section=>section.id,'canonical Detachments'),officialDetachments=uniqueIndex(points.detachments,item=>`detachment-${slug(item.title)}`,'official Detachments');
  assertSameIdentities(canonicalDetachments,officialDetachments,'Detachment');
  if(points.counts?.detachments!==officialDetachments.size||expected.detachments!==undefined&&expected.detachments!==officialDetachments.size)throw new Error('Death Guard MFM ownership: Detachment count metadata mismatch');
  const enhancements=officialEnhancements(points),canonicalEnhancements=new Map();
  for(const [detachmentId,section] of canonicalDetachments){
    const official=officialDetachments.get(detachmentId),factBlocks=(section.blocks||[]).filter(block=>block.type==='p'&&/Force Disposition:/i.test(block.text||''));
    if(normalizeFactText(section.title)!==normalizeFactText(official.title))throw new Error(`Death Guard MFM ownership: ${detachmentId} title mismatch`);
    if(factBlocks.length!==1)throw new Error(`Death Guard MFM ownership: ${detachmentId} must have exactly one factual metadata block`);
    const match=/Force Disposition:\s*([^.]+)\.\s*Detachment Points:\s*([^.]+)\./i.exec(factBlocks[0].text||'');
    if(!match||normalizeFactText(match[1])!==normalizeFactText(official.disposition)||normalizeFactText(match[2])!==normalizeFactText(official.dp))throw new Error(`Death Guard MFM ownership: ${detachmentId} factual metadata mismatch`);
    const parts=(section.subsections||[]).filter(part=>part.title==='Enhancements');
    if(parts.length!==1)throw new Error(`Death Guard MFM ownership: ${detachmentId} must have exactly one Enhancement section`);
    for(const block of parts[0].blocks||[]){
      const titleMatch=/^(.*?)\s+-\s+(\d+)\s+pts$/i.exec(block.title||'');
      if(!titleMatch)throw new Error(`Death Guard MFM ownership: invalid canonical Enhancement title ${block.title}`);
      const key=`${detachmentId}|${block.id}`;
      if(canonicalEnhancements.has(key))throw new Error(`Death Guard MFM ownership: duplicate canonical Enhancement identity ${key}`);
      canonicalEnhancements.set(key,block);
      const source=enhancements.get(key),upgrade=(block.tags||[]).map(normalizeFactText).includes('upgrade');
      if(!source||normalizeFactText(titleMatch[1])!==normalizeFactText(String(source.title).replace(/\s*\(Upgrade\)\s*$/i,''))||Number(titleMatch[2])!==source.value||upgrade!==source.upgrade)throw new Error(`Death Guard MFM ownership: Enhancement mismatch for ${key}`);
      block.title=`${titleMatch[1]} - ${source.value} pts`;
    }
  }
  assertSameIdentities(canonicalEnhancements,enhancements,'Enhancement');
  if(points.counts?.enhancements!==enhancements.size||expected.enhancements!==undefined&&expected.enhancements!==enhancements.size)throw new Error('Death Guard MFM ownership: Enhancement count metadata mismatch');
  const paidWargearCount=points.units.reduce((total,unit)=>total+(unit.paidWargear||[]).length,0);
  if(points.counts?.pricedOptions!==paidWargearCount)throw new Error('Death Guard MFM ownership: paid-wargear count metadata mismatch');
  return book;
}

const weaponObject=weapon=>({Range:weapon.range,A:weapon.a,[weapon.mode==='ranged'?'BS':'WS']:weapon.skill,S:weapon.s,AP:weapon.ap,D:weapon.d,Abilities:Array.isArray(weapon.abilities)?weapon.abilities.join(', ')||'-':weapon.abilities||'-'});
const legendGlossaryFor=legends=>legends.units.flatMap(unit=>[
  {id:`term-${unit.id.slice(5)}`,title:unit.title,group:'Datasheets',kind:'unit',showGlossary:false,short:'Warhammer Legends datasheet.',full:`Complete Warhammer Legends datasheet: ${unit.title}.`,sectionId:unit.id,statline:unit.statline,points:unit.points,legends:true},
  ...unit.weapons.map(weapon=>({id:weapon.id,title:weapon.name,group:'Wargear',kind:'weapon',showGlossary:false,short:'Weapon profile.',full:'Weapon profile.',unitIds:[unit.id],weapon:weaponObject(weapon),legends:true})),
  ...[...unit.abilities,...(unit.wargearAbilities||[])].filter(ability=>ability.id).map(ability=>({id:ability.id,title:ability.title,group:'Datasheet Abilities',kind:'ability',showGlossary:false,short:ability.text,full:ability.text,sectionId:`${unit.id.slice(5)}-${slug(ability.title)}`,unitIds:[unit.id],legends:true}))
]);

function legendSection(unit,legends){
  const abilities=[...unit.abilities,...(unit.wargearAbilities||[])];
  const subsections=[{id:`${unit.id.slice(5)}-abilities`,title:'Abilities',number:'',blocks:abilities.map(ability=>({type:'ability',id:`${unit.id.slice(5)}-ability-${slug(ability.title)}`,termId:ability.id||null,title:ability.title,text:ability.text}))}];
  if(unit.designerNote)subsections[0].blocks.push({type:'p',text:`Designer's Note: ${unit.designerNote}`});
  if(unit.wargearOptions?.length)subsections.push({id:`${unit.id.slice(5)}-wargear-options`,title:'Wargear Options',number:'',blocks:unit.wargearOptions.map(text=>({type:'p',text}))});
  subsections.push({id:`${unit.id.slice(5)}-composition`,title:'Unit Composition',number:'',blocks:[{type:'p',text:unit.composition}]});
  if(unit.leader)subsections.push({id:`${unit.id.slice(5)}-leader`,title:'Leader',number:'',blocks:[{type:'p',text:unit.leader}]});
  if(unit.transport)subsections.push({id:`${unit.id.slice(5)}-transport`,title:'Transport',number:'',blocks:[{type:'p',text:unit.transport}]});
  subsections.push({id:`${unit.id.slice(5)}-keywords`,title:'Keywords',number:'',blocks:[{type:'p',text:`Keywords: ${unit.keywords.join(', ')}. Faction Keywords: DEATH GUARD.`},{type:'p',text:`Source: ${legends.source}.`} ]});
  return {id:unit.id,title:unit.title,kind:'unit',points:unit.points,number:unit.number,legends:true,blocks:[{type:'points',values:unit.points,wargear:[]},{type:'statline',values:unit.statline},...unit.weapons.map(weapon=>({type:'weapon',id:`${unit.id.slice(5)}-${weapon.id}`,termId:weapon.id,name:weapon.name,range:weapon.range,a:weapon.a,skill:weapon.skill,s:weapon.s,ap:weapon.ap,d:weapon.d,abilities:Array.isArray(weapon.abilities)?weapon.abilities.join(', ')||'-':weapon.abilities||'-',mode:weapon.mode}))],subsections};
}

const keywordsOf=unit=>{
  const text=(unit.subsections||[]).find(section=>section.title==='Keywords')?.blocks?.map(block=>block.text||'').join(' ')||'';
  const intrinsic=(text.match(/Keywords:\s*(.*?)\.\s*Faction Keywords:/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
  const faction=(text.match(/Faction Keywords:\s*([^.]*)/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
  return [...new Set([...intrinsic,...faction])];
};

export function buildDeathGuardCanonicalModel(context){
  const {config}=context,book=structuredClone(context.readJson(config.sources.canonical)),legends=context.readJson(config.sources.legends),updates=context.readJson(config.sources.officialUpdates),manifest=context.readJson(config.sources.manifest),points=context.readJson(config.sources.points),presentation=context.readJson(config.sources.presentation),runtimeRelated=context.readJson(config.sources.runtimeRelatedTerms),unitImages=context.readJson(config.sources.unitImages),core=context.readRepoJson(config.sources.coreRules);
  if(updates.updates?.length!==config.expected.officialUpdates)throw new Error(`Death Guard official update ledger: expected ${config.expected.officialUpdates}, got ${updates.updates?.length||0}`);
  applyDeathGuardMfmOwnership(book,points,config.expected);
  if(!Array.isArray(manifest.sources)||!manifest.sources.length)throw new Error('Death Guard source manifest is empty');
  if(legends.units.length!==config.expected.legends)throw new Error(`Death Guard Legends: expected ${config.expected.legends}, got ${legends.units.length}`);
  if(presentation.schema!==1||presentation.bookId!==config.id||presentation.provenance.generatedOutputsAreBuildInputs!==false)throw new Error('Death Guard presentation metadata contract is invalid');
  if(unitImages.schema!==1||unitImages.bookId!==config.id||!unitImages.units)throw new Error('Death Guard unit artwork contract is invalid');
  const relatedRecords=Object.values(runtimeRelated.terms),relatedEdges=relatedRecords.reduce((total,records)=>total+records.length,0);
  if(relatedRecords.length!==config.expected.runtimeRelatedTerms||relatedEdges!==config.expected.runtimeRelatedEdges)throw new Error('Death Guard runtime related-term inventory mismatch');
  const legendIds=new Set(legends.units.map(unit=>unit.id));
  book.sections=book.sections.filter(section=>section.id!==legends.group.id&&!section.legends&&!legendIds.has(section.id));
  const pactIndex=book.sections.findIndex(section=>section.id==='pact-of-decay-datasheets');
  if(pactIndex<0)throw new Error('Missing Pact of Decay group');
  if(legends.units.length)book.sections.splice(pactIndex,0,{...legends.group,kind:'unit-group',blocks:[{type:'p',text:legends.group.description}],subsections:[]},...legends.units.map(unit=>legendSection(unit,legends)));
  const legendGlossary=legendGlossaryFor(legends),existingIds=new Set(book.glossary.filter(term=>!term.legends).map(term=>term.id));
  book.glossary=book.glossary.filter(term=>!term.legends);book.glossary.push(...legendGlossary.filter(term=>!existingIds.has(term.id)));
  book.audit.datasheets=book.sections.filter(section=>section.kind==='unit').length;book.audit.glossary=book.glossary.length;
  const units=book.sections.filter(section=>section.kind==='unit');if(Object.keys(unitImages.units).some(id=>!units.some(unit=>unit.id===id)))throw new Error('Death Guard unit artwork references an unknown canonical Datasheet');const unitKeywords=new Map(units.map(unit=>[unit.id,keywordsOf(unit)])),edges=[];
  for(const leader of units){const text=(leader.subsections||[]).find(section=>section.title==='Leader')?.blocks?.map(block=>block.text||'').join(' ')||'';if(!text)continue;const roles=/even if one other Leader/i.test(text)?['leader','support']:['leader'];for(const targetId of canonicalTargetsFromProse(text,units,{sourceId:leader.id,role:'attachment',excludeId:leader.id}))for(const role of roles)edges.push({role,sourceId:leader.id,targetId});}
  const relationGraphs=buildRelationGraphs(units.map(unit=>({...unit,keywords:unitKeywords.get(unit.id)})),edges),ruleFacts=new Map();
  for(const unit of units){const keywords=unitKeywords.get(unit.id),abilityBlocks=(unit.subsections||[]).filter(section=>section.title==='Abilities').flatMap(section=>section.blocks||[]),abilityText=abilityBlocks.flatMap(block=>[block.title||'',block.text||'']).join(' '),relations=relationGraphs.get(unit.id),canAttach=Object.values(relations).some(items=>items.length);ruleFacts.set(unit.id,{id:unit.id,unitId:unit.id,slug:unit.id.replace(/^unit-/,''),keywords,intrinsicKeywords:keywords,abilities:[...new Set(abilityBlocks.flatMap(block=>/^(?:core|faction)$/i.test(block.title||'')?String(block.text||'').split(',').map(value=>value.trim().replace(/\.$/,'')).filter(Boolean).map(value=>/^deadly demise\b/i.test(value)?'DEADLY DEMISE':value):[block.title].filter(Boolean)))],termIds:[...new Set([...keywords.filter(keyword=>!plainKeywordNames.has(keyword)).map(keywordId),...abilityBlocks.map(block=>block.termId).filter(Boolean),...(unit.blocks||[]).map(block=>block.termId).filter(Boolean)])],epic:keywords.some(keyword=>keyword.toUpperCase()==='EPIC HERO'),deadlyDemise:/\bDeadly Demise\b/i.test(abilityText),attached:canAttach?null:false,attachmentKnown:!canAttach,characterCount:keywords.some(keyword=>keyword.toUpperCase()==='CHARACTER')?1:0,twoCharacters:null,warlord:null,relations});}
  const coreStratagems=core.records.filter(record=>/^15\.(?:0[2-8]|1[0-2])$/.test(record.code)&&record.code!=='15.09'),runtime={},keywordEntries=new Map(book.glossary.filter(entry=>entry.kind==='keyword').map(entry=>[entry.id,entry])),keywordOrder=presentation.runtimeSerialization?.keywordOrder||[];
  if(keywordOrder.length!==keywordEntries.size||new Set(keywordOrder).size!==keywordOrder.length||keywordOrder.some(id=>!keywordEntries.has(id)))throw new Error('Death Guard runtime keyword serialization order is incomplete');
  const orderedKeywords=keywordOrder.map(id=>keywordEntries.get(id));let keywordIndex=0;const runtimeGlossary=book.glossary.map(entry=>entry.kind==='keyword'?orderedKeywords[keywordIndex++]:entry);
  for(const entry of runtimeGlossary){let summary=entry.short;if(entry.statline)summary=Object.entries(entry.statline).map(([key,value])=>`${key} ${value}`).join(' · ');if(entry.weapon)summary=Object.entries(entry.weapon).map(([key,value])=>`${key} ${value}`).join(' · ');summary=presentation.runtimeSummaryOverrides[entry.id]?.summary||summary;const owner=entry.unitIds?.[0];runtime[entry.id]={title:entry.title,summary,glossary:`glossary-${entry.id}`,...(entry.sectionId?{rule:entry.sectionId}:{}),...(owner?{datasheet:owner}:{}),...(owner&&entry.kind==='weapon'?{statline:`${owner}-profile`}:{}),...(runtimeRelated.terms[entry.id]?.length?{related:runtimeRelated.terms[entry.id]}:{})};}
  return {book,legends,updates,manifest,points,presentation,unitImages:unitImages.units,coreStratagems,coreTermIdByCode,relationGraphs,ruleFacts,runtime,unitKeywords,canonicalJoinContract:'v1'};
}

const legacyEnhancementEffects=Object.freeze({
  'daemon weapon of nurgle':'critical-hit-5','furnace of plagues':'furnace','arch contaminator':'conditional','revolting regeneration':'persistent','eye of affliction':'conditional','bilemaw blight':'plague-wind-range-12','shriekworm familiar':'persistent','tendrilous emissions':'conditional','final ingredient':'once','visions of virulence':'conditional','needle of nurgle':'narthecium-d3','cornucophagus':'setup','beckoning blight':'persistent','fell harvester':'melee-a-2','entropic knell':'conditional','tome of bounteous blessings':'conditional','witherbone pipes':'attachment','lord of the walking pox':'attachment','sorrowsyphon':'attachment','talisman of burgeoning':'attachment','face of death':'persistent','vile vigour':'attachment','warprot talisman':'once','helm of the fly king':'attachment','parasitic woe reaper':'persistent','lancet of the worldsore':'mobile','insectile murmuration':'conditional','plagueveil':'persistent','rejuvenating swarm':'conditional','host of the hybridised pox':'once'
});

const titleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

const dgStatFields=['M','T','Sv','W','Ld','OC','Inv'];
const dgWeaponFields=['Range','A','WS','BS','S','AP','D','Abilities'];
const dgWeaponValue=(weapon,key)=>key==='Range'?weapon.range:key==='A'?weapon.a:key==='WS'||key==='BS'?(String(weapon.range).toLowerCase()==='melee'?(key==='WS'?weapon.skill:undefined):(key==='BS'?weapon.skill:undefined)):key==='S'?weapon.s:key==='AP'?weapon.ap:key==='D'?weapon.d:key==='Abilities'?weapon.abilities:undefined;
const dgSummary=facts=>Object.entries(facts).map(([key,value])=>`${key} ${value}`).join(' · ');

export function projectDeathGuardGlossaryFacts(model,{label='Death Guard glossary projection'}={}){
  const units=new Map((model.units||[]).map(unit=>[unit.id,unit]));
  if(units.size!==(model.units||[]).length)throw new Error(`${label}: duplicate canonical unit identity`);
  const weaponsByTerm=new Map();
  for(const unit of model.units||[])for(const weapon of (unit.blocks||[]).filter(block=>block.type==='weapon')){
    if(!weapon.termId)continue;
    const facts=Object.fromEntries(dgWeaponFields.map(key=>[key,dgWeaponValue(weapon,key)]).filter(([,value])=>value!==undefined)),existing=weaponsByTerm.get(weapon.termId);
    if(existing&&JSON.stringify(existing.facts)!==JSON.stringify(facts))throw new Error(`${label}: conflicting canonical weapon facts for ${weapon.termId}`);
    if(!existing)weaponsByTerm.set(weapon.termId,{title:weapon.name,facts});
  }
  const glossary=(model.glossary||[]).map(entry=>{
    if(entry.statline){const unit=units.get(entry.sectionId);if(!unit)throw new Error(`${label}: unknown statline owner ${entry.sectionId||'<missing>'}`);const block=(unit.blocks||[]).find(item=>item.type==='statline');if(!block)throw new Error(`${label}: ${unit.id} has no canonical statline`);const statline=Object.fromEntries(dgStatFields.filter(key=>Object.hasOwn(entry.statline,key)).map(key=>[key,block.values?.[key]]));return{...entry,title:unit.title,statline,points:structuredClone(unit.points||[])};}
    if(entry.weapon){const weapon=weaponsByTerm.get(entry.id);if(!weapon)throw new Error(`${label}: unknown canonical weapon ${entry.id}`);const facts=Object.fromEntries(Object.keys(entry.weapon).map(key=>{if(!dgWeaponFields.includes(key))throw new Error(`${label}: unsupported weapon field ${key}`);return[key,weapon.facts[key]];}));return{...entry,title:weapon.title,weapon:facts};}
    return structuredClone(entry);
  });
  const glossaryById=new Map(glossary.map(entry=>[entry.id,entry])),runtime={};
  for(const [id,current] of Object.entries(model.runtime||{})){const entry=glossaryById.get(id);if(!entry)throw new Error(`${label}: unknown runtime reference ${id}`);const summary=entry.statline?dgSummary(entry.statline):entry.weapon?dgSummary(entry.weapon):current.summary;runtime[id]={...current,title:entry.title,summary};}
  if(Object.keys(runtime).length!==glossary.length)throw new Error(`${label}: missing runtime reference`);
  return{glossary,runtime};
}

function effectiveEnhancementsFor(context,model,detachments){
  const publicationByEnhancementId=new Map((model.points.enhancements||[]).filter(item=>item.id&&item.sourceTitle).map(item=>[item.id,item])),enhancements=[];
  for(const detachment of detachments)for(const subsection of detachment.subsections||[])for(const item of (subsection.blocks||[]).filter(block=>block.type==='enhancement')){
    const match=item.title.match(/^(.*?)\s+[-–—]\s+(\d+)\s*pts$/i);
    if(!match)throw new Error(`Enhancement points missing: ${item.title}`);
    const publication=publicationByEnhancementId.get(item.id),title=match[1],value=Number(match[2]),aliases=(item.tags||[]).includes('UPGRADE')?[`${title} Upgrade`,`${title} (Upgrade)`]:[];
    if(publication&&(String(publication.sourceTitle).toLowerCase()!==title.toLowerCase()||Number(publication.value)!==value))throw new Error(`Death Guard point identity mismatch: ${item.id}`);
    const legacyEffect=legacyEnhancementEffects[titleKey(title)]||'',detachmentTitle=publication?.detachment||detachment.title;
    enhancements.push({...structuredClone(item),id:item.id,sourceId:item.sourceId||null,ruleId:item.id,legacyKey:null,detachmentId:detachment.id,detachmentTitle,sourceBookId:context.config.id,title,value,runtimeTitle:item.title,owner:structuredClone(item.owner||null),assignment:structuredClone(item.assignment||null),tags:[...(item.tags||[])],text:item.text||'',legacyEffect,aliases,publicationRecord:{id:item.id,title,value,text:item.text,effect:legacyEffect,detachment:publication?.detachment||String(detachment.id).replace(/^detachment-/,''),...(publication?{canonicalEnhancementId:item.id,canonicalDetachmentId:detachment.id}:{}),tags:[...(item.tags||[])],owner:structuredClone(item.owner||null),assignment:structuredClone(item.assignment||null),aliases}});
  }
  return enhancements;
}

function effectiveDetachmentsFor(context,model,sections){
  return sections.map(detachment=>{
    const publication=(model.points.detachments||[]).find(item=>titleKey(item.title)===titleKey(detachment.title)),disposition=(detachment.blocks||[]).find(block=>block.type==='p'&&/Force Disposition:/.test(block.text))?.text||'';
    return {...structuredClone(detachment),sourceBookId:context.config.id,detachmentPoints:Number(String(publication?.detachmentPoints??publication?.dp??0).match(/\d+/)?.[0]||0),forceDisposition:publication?.forceDisposition||publication?.disposition||disposition.match(/Force Disposition:\s*([^.]*)/)?.[1]||'',publicationRecord:structuredClone(publication||{title:detachment.title})};
  });
}

export function buildDeathGuardEffectiveModelInput(context,canonicalModel=buildDeathGuardCanonicalModel(context)){
  const {config}=context,sourceUnits=canonicalModel.book.sections.filter(section=>section.kind==='unit'),sourceDetachments=canonicalModel.book.sections.filter(section=>section.id?.startsWith('detachment-'));
  const relationGraphs=canonicalModel.relationGraphs||new Map(sourceUnits.map(unit=>[unit.id,canonicalModel.ruleFacts.get(unit.id)?.relations||{}]));
  const ruleProfiles=new Map(sourceUnits.map(unit=>[unit.id,ruleFactsApi.serializeRuleProfile(ruleFactsApi.profileFromRecord(canonicalModel.ruleFacts.get(unit.id)))]));
  const baseUnits=sourceUnits.map(unit=>{const pointsBlock=unit.blocks.find(block=>block.type==='points'),canonical=structuredClone(unit);return persistCanonicalWeaponProfileIdentities({...canonical,sourceBookId:config.id,publicationState:unit.legends?'Legends':'Current',paidWargear:structuredClone(pointsBlock?.wargear||[]),intrinsicKeywords:[...canonicalModel.unitKeywords.get(unit.id)],ruleFacts:structuredClone(canonicalModel.ruleFacts.get(unit.id)),ruleProfile:structuredClone(ruleProfiles.get(unit.id))});});
  const detachments=effectiveDetachmentsFor(context,canonicalModel,sourceDetachments),enhancements=effectiveEnhancementsFor(context,canonicalModel,detachments);
  const effectContractSet=config.sources.effectContracts?validateEffectContractSet(context.readJson(config.sources.effectContracts),{expectedBookId:config.id}):{schema:'wh40k-effect-contracts/v1',bookId:config.id,contracts:[]},effectContracts=effectiveEffectContracts([effectContractSet],config.id);
  const units=baseUnits;
  const detachmentOrder=new Map((canonicalModel.points.detachments||[]).map((item,index)=>[titleKey(item.title),index]));
  const pointsProjectionInput={book:{id:config.id,title:config.title,parentBookId:null},units:units.map(unit=>{const pointsBlock=unit.blocks.find(block=>block.type==='points');return{id:unit.id,title:unit.title,sourceBookId:config.id,publicationState:unit.publicationState,points:unit.points||[],paidWargear:pointsBlock?.wargear||[],ruleProfile:unit.ruleProfile,publicationRecord:{title:unit.title,points:unit.points,wargear:pointsBlock?.wargear||[]}};}),detachments:[...detachments].sort((left,right)=>(detachmentOrder.get(titleKey(left.title))??Infinity)-(detachmentOrder.get(titleKey(right.title))??Infinity)).map(detachment=>({id:detachment.id,title:detachment.title,sourceBookId:config.id,detachmentPoints:detachment.detachmentPoints,forceDisposition:detachment.forceDisposition,publicationRecord:detachment.publicationRecord})),enhancements};
  const effectivePointsProjection=createEffectivePointsProjection(pointsProjectionInput),acceptedSourceConflicts=structuredClone(canonicalModel.book.acceptedSourceConflicts||[]),book={...canonicalModel.book,id:config.id,title:config.title,publicationTitle:canonicalModel.book.title,parentBookId:null};
  delete book.acceptedSourceConflicts;
  for(const conflict of acceptedSourceConflicts){
    if(!conflict?.id||!conflict.field||!conflict.canonicalValue||!conflict.productionValue||conflict.status!=='unresolved'||conflict.renderingPolicy!=='preserve-production-until-resolved')throw new Error('Death Guard accepted source conflict contract is invalid');
  }
  const unitGroups=[];
  for(let index=0;index<canonicalModel.book.sections.length;index++){
    const section=canonicalModel.book.sections[index];if(section.kind!=='unit-group')continue;
    const unitIds=[];for(let next=index+1;next<canonicalModel.book.sections.length&&canonicalModel.book.sections[next].kind==='unit';next++)unitIds.push(canonicalModel.book.sections[next].id);
    unitGroups.push({id:section.id,title:section.title,blocks:structuredClone(section.blocks||[]),unitIds});
  }
  const rules={armyRule:structuredClone(canonicalModel.book.sections.find(section=>section.id==='army-rule-nurgles-gift')),updates:structuredClone(canonicalModel.book.sections.find(section=>section.id==='rules-updates')),unitGroups,acceptedSourceConflicts};
  return createEffectiveBookModel({schema:EFFECTIVE_BOOK_MODEL_SCHEMA,book,units,detachments,enhancements,rules,relationGraphs,effectContractSet,effectContracts,pointsProjectionInput,effectivePointsProjection,ruleFacts:structuredClone(canonicalModel.ruleFacts),ruleProfiles,compiledRuleProfiles:ruleProfiles,glossary:structuredClone(book.glossary),runtime:canonicalModel.runtime,presentation:{metadata:canonicalModel.presentation},unitImages:canonicalModel.unitImages,coreStratagems:canonicalModel.coreStratagems,coreTermIdByCode:canonicalModel.coreTermIdByCode,sourceMetadata:{manifest:canonicalModel.manifest,officialUpdates:canonicalModel.updates,legends:canonicalModel.legends,officialPoints:canonicalModel.points,canonicalJoinContract:canonicalModel.canonicalJoinContract}});
}
