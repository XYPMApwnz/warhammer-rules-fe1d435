import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';

const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const keywordId=value=>`keyword-${slug(value)}`;
const plainKeywordNames=new Set(['CHAOS LORD','CULTISTS','POSSESSED','SORCERER']);
export const coreTermIdByCode=Object.freeze({'15.02':'core-rule-15-02-command-re-roll','15.03':'core-rule-15-03-epic-challenge','15.04':'core-rule-15-04-insane-bravery','15.05':'core-rule-15-05-explosives','15.06':'core-rule-15-06-crushing-impact','15.07':'core-rule-15-07-rapid-ingress','15.08':'core-stratagem-fire-overwatch','15.10':'core-rule-15-10-smokescreen','15.11':'core-rule-15-11-heroic-intervention','15.12':'core-rule-15-12-counteroffensive'});

const normalizeFactText=value=>String(value??'').normalize('NFKC').replace(/[\u2010-\u2015]/g,'-').replace(/\s+/g,' ').trim().toLowerCase();
const ordinalPattern='\\d+(?:st|nd|rd|th)';
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
  const value=normalizeFactText(label).replace(/^your\s+/,'').replace(/\s+costs?$/,'').replace(/\bunits\b/g,'unit').replace(/\s+to\s+/g,'-').replace(/\s*\+\s*/g,'+ ');
  if(value==='unit')return 'any';
  const match=new RegExp(`^(${ordinalPattern})(?:-(${ordinalPattern})|(\\+))?\\s+unit$`).exec(value);
  if(!match)throw new Error(`Death Guard MFM ownership: unsupported official schedule label ${label}`);
  return match[2]?`${match[1]}-${match[2]}`:match[3]?`${match[1]}+`:match[1];
};
const canonicalPointKey=label=>{
  const value=normalizeFactText(label),separator=value.indexOf(':');
  if(separator<0)return `any|${value}`;
  const prefix=value.slice(0,separator).replace(/\s+unit$/,'').replace(/\s*\+\s*/g,'+').replace(/\s*-\s*/g,'-'),model=value.slice(separator+1).trim();
  if(!new RegExp(`^${ordinalPattern}(?:-${ordinalPattern}|\\+)?$`).test(prefix)||!model)throw new Error(`Death Guard MFM ownership: unsupported canonical point label ${label}`);
  return `${prefix}|${model}`;
};
const officialPointRows=unit=>{
  const rows=[];
  for(const schedule of unit.schedules||[]){const tier=mfmTierKey(schedule.label);if(!Array.isArray(schedule.values)||!schedule.values.length)throw new Error(`Death Guard MFM ownership: ${unit.unitId} has an empty official schedule`);for(const point of schedule.values)rows.push({key:`${tier}|${normalizeFactText(point.label)}`,value:point.value});}
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
  const units=book.sections.filter(section=>section.kind==='unit');if(Object.keys(unitImages.units).some(id=>!units.some(unit=>unit.id===id)))throw new Error('Death Guard unit artwork references an unknown canonical Datasheet');const unitKeywords=new Map(units.map(unit=>[unit.id,keywordsOf(unit)])),attachments=[],doubleLeaders=new Set();
  for(const leader of units){const text=(leader.subsections||[]).find(section=>section.title==='Leader')?.blocks?.map(block=>block.text||'').join(' ')||'';if(!text)continue;if(/even if one other Leader/i.test(text))doubleLeaders.add(leader.id);for(const bodyguard of units)if(bodyguard!==leader&&text.toLowerCase().includes(bodyguard.title.toLowerCase()))attachments.push([leader.id,bodyguard.id]);}
  const edges=attachments.flatMap(([sourceId,targetId])=>[{role:'leader',sourceId,targetId},...(doubleLeaders.has(sourceId)?[{role:'support',sourceId,targetId}]:[])]),relationGraphs=buildRelationGraphs(units.map(unit=>({...unit,keywords:unitKeywords.get(unit.id)})),edges),ruleFacts=new Map();
  for(const unit of units){const keywords=unitKeywords.get(unit.id),abilityBlocks=(unit.subsections||[]).filter(section=>section.title==='Abilities').flatMap(section=>section.blocks||[]),abilityText=abilityBlocks.flatMap(block=>[block.title||'',block.text||'']).join(' '),relations=relationGraphs.get(unit.id),canAttach=Object.values(relations).some(items=>items.length);ruleFacts.set(unit.id,{id:unit.id,unitId:unit.id,slug:unit.id.replace(/^unit-/,''),keywords,intrinsicKeywords:keywords,abilities:[...new Set(abilityBlocks.flatMap(block=>/^(?:core|faction)$/i.test(block.title||'')?String(block.text||'').split(',').map(value=>value.trim().replace(/\.$/,'')).filter(Boolean).map(value=>/^deadly demise\b/i.test(value)?'DEADLY DEMISE':value):[block.title].filter(Boolean)))],termIds:[...new Set([...keywords.filter(keyword=>!plainKeywordNames.has(keyword)).map(keywordId),...abilityBlocks.map(block=>block.termId).filter(Boolean),...(unit.blocks||[]).map(block=>block.termId).filter(Boolean)])],epic:keywords.some(keyword=>keyword.toUpperCase()==='EPIC HERO'),deadlyDemise:/\bDeadly Demise\b/i.test(abilityText),attached:canAttach?null:false,attachmentKnown:!canAttach,characterCount:keywords.some(keyword=>keyword.toUpperCase()==='CHARACTER')?1:0,twoCharacters:null,warlord:null,relations});}
  const coreStratagems=core.records.filter(record=>/^15\.(?:0[2-8]|1[0-2])$/.test(record.code)&&record.code!=='15.09'),runtime={},keywordEntries=new Map(book.glossary.filter(entry=>entry.kind==='keyword').map(entry=>[entry.id,entry])),keywordOrder=presentation.runtimeSerialization?.keywordOrder||[];
  if(keywordOrder.length!==keywordEntries.size||new Set(keywordOrder).size!==keywordOrder.length||keywordOrder.some(id=>!keywordEntries.has(id)))throw new Error('Death Guard runtime keyword serialization order is incomplete');
  const orderedKeywords=keywordOrder.map(id=>keywordEntries.get(id));let keywordIndex=0;const runtimeGlossary=book.glossary.map(entry=>entry.kind==='keyword'?orderedKeywords[keywordIndex++]:entry);
  for(const entry of runtimeGlossary){let summary=entry.short;if(entry.statline)summary=Object.entries(entry.statline).map(([key,value])=>`${key} ${value}`).join(' · ');if(entry.weapon)summary=Object.entries(entry.weapon).map(([key,value])=>`${key} ${value}`).join(' · ');summary=presentation.runtimeSummaryOverrides[entry.id]?.summary||summary;const owner=entry.unitIds?.[0];runtime[entry.id]={title:entry.title,summary,glossary:`glossary-${entry.id}`,...(entry.sectionId?{rule:entry.sectionId}:{}),...(owner?{datasheet:owner}:{}),...(owner&&entry.kind==='weapon'?{statline:`${owner}-profile`}:{}),...(runtimeRelated.terms[entry.id]?.length?{related:runtimeRelated.terms[entry.id]}:{})};}
  return {book,legends,updates,manifest,points,presentation,unitImages:unitImages.units,coreStratagems,coreTermIdByCode,ruleFacts,runtime,unitKeywords};
}
