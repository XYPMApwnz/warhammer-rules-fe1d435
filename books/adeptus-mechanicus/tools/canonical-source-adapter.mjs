import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';

export function createAdeptusMechanicusCanonicalModel(context){
  const {config,readJson}=context,sourcePaths=config.sources||{};
  const required=['factionRules','sourceTranscript','codexDetachments','codexParity','codexDatasheets','codexWargear','points','officialMfm','unitImages','globalGlossary'];
  for(const key of required)if(!sourcePaths[key])throw new Error(`adeptus-mechanicus: sources.${key} is required`);
  const factionRules=readJson(sourcePaths.factionRules);
  const source=readJson(sourcePaths.sourceTranscript);
  const codexSource=readJson(sourcePaths.codexDetachments);
  const codexParity=readJson(sourcePaths.codexParity);
  const codexDatasheets=readJson(sourcePaths.codexDatasheets);
  const codexWargear=readJson(sourcePaths.codexWargear);
  const pointsCatalog=readJson(sourcePaths.points);
  const officialMfm=readJson(sourcePaths.officialMfm);
  const unitImages=readJson(sourcePaths.unitImages).units;
  const globalGlossary=readJson(sourcePaths.globalGlossary).terms;
const parityByDetachment=new Map(codexParity.detachments.map(item=>[item.title,item]));
const codex={...codexSource,detachments:codexSource.detachments.map(detachment=>{
  const parity=parityByDetachment.get(detachment.title);
  if(!parity)throw new Error(`Missing Codex parity layer for ${detachment.title}`);
  const enhancements=new Map(parity.enhancements.map(item=>[item.title,item.text]));
  return {...detachment,rule:{...detachment.rule,text:parity.rule.text},enhancements:detachment.enhancements.map(item=>({...item,text:enhancements.get(item.title)||item.text}))};
})};
const pointsByUnit=new Map(pointsCatalog.units.map(unit=>[unit.title.toLowerCase(),unit]));
const titleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const slugKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const abilityText=ability=>ability.text||[
  ability.openingText,
  ...(ability.options||[]).map(option=>`${option.title}: ${option.text}`)
].filter(Boolean).join('\n\n');
const enhancementsByTitle=new Map(pointsCatalog.enhancements.map(item=>[titleKey(item.title),item]));
const factionDatasheets=new Map(factionRules.datasheets.filter(unit=>unit.status!=='Warhammer Legends').map(unit=>[unit.id,unit]));
const codexWargearByTitle=new Map(codexWargear.units.map(unit=>[titleKey(unit.title),unit]));
const mergedDatasheets=codexDatasheets.datasheets.map(unit=>{
  const official=factionDatasheets.get(unit.id);
  if(!official){
    const exact=codexWargearByTitle.get(titleKey(unit.title));
    return exact?{...unit,wargear:exact.wargear,composition:exact.composition,wargearSource:{label:'Current 11e reference \u00b7 Wahapedia',url:exact.url}}:unit;
  }
  factionDatasheets.delete(unit.id);
  const extractedWargear=new Map((unit.wargearAbilities||[]).map(item=>[titleKey(item.title),item]));
  const officialWargear=(official.abilities||[]).filter(item=>extractedWargear.has(titleKey(item.title)));
  const abilities=(official.abilities||[]).filter(item=>!extractedWargear.has(titleKey(item.title)));
  if(!abilities.some(item=>item.title==='Doctrina Imperatives'))abilities.unshift({title:'Doctrina Imperatives',text:'This unit has the Doctrina Imperatives Faction ability.'});
  const wargearAbilities=[...extractedWargear.values()].map(item=>officialWargear.find(candidate=>titleKey(candidate.title)===titleKey(item.title))||item);
  return {...unit,...official,abilities,wargearAbilities,category:unit.category,profiles:official.profiles||[{name:official.title,stats:official.stats}]};
}).concat([...factionDatasheets.values()]);
const publishedUnitIds=new Set(mergedDatasheets.map(unit=>unit.id));
const publishedGlossary=factionRules.glossary.filter(term=>term.id!=='warhammer-legends').map(term=>({...term,unitIds:(term.unitIds||[]).filter(unitId=>publishedUnitIds.has(unitId))}));
const rules={...factionRules,datasheets:mergedDatasheets,glossary:publishedGlossary,audit:{...factionRules.audit,datasheets:mergedDatasheets.length,legendsDatasheets:0,glossaryTerms:publishedGlossary.length}};
const unitTitleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const unitByTitle=new Map(rules.datasheets.map(unit=>[unitTitleKey(unit.title),unit]));
const attachments=[];
for(const leader of rules.datasheets){
  for(const ability of (leader.abilities||[]).filter(ability=>/^(leader|support)$/i.test(ability.title))){
    const text=abilityText(ability);if(!text)continue;
    for(const bodyguard of rules.datasheets)if(bodyguard!==leader&&text.toLowerCase().includes(bodyguard.title.toLowerCase()))attachments.push({role:ability.title.toLowerCase(),sourceId:leader.id,targetId:bodyguard.id});
  }
}
for(const bodyguard of rules.datasheets){
  const text=[bodyguard.composition||'',...(bodyguard.abilities||[]).filter(ability=>/^attached unit$/i.test(ability.title)).map(ability=>ability.text||'')].join(' ');
  const proxy=[...unitByTitle.values()].find(unit=>text.toLowerCase().includes(unit.title.toLowerCase()));
  if(proxy)for(const edge of [...attachments])if(edge.targetId===proxy.id)attachments.push({...edge,targetId:bodyguard.id});
}
const unitById=new Map(rules.datasheets.map(unit=>[unit.id,unit]));
for(const id of Object.keys(unitImages))if(!unitById.has(id))throw new Error(`Unknown presentation unit image target: ${id}`);
for(const edge of attachments)if(edge.sourceId==='unit-cybernetica-datasmith'&&edge.targetId==='unit-kastelan-robots')Object.assign(edge,{mandatory:true,removeKeywords:['INFANTRY']});
const relationGraphs=buildRelationGraphs(rules.datasheets,attachments);
const officialOrder=config.detachmentOrder;
const mfmDetachments=new Map(Object.entries(officialMfm.detachments||{}).map(([title,value])=>[titleKey(title),value]));
const allDetachments=[...rules.detachments,...codex.detachments].map(detachment=>{
  const mfm=mfmDetachments.get(titleKey(detachment.title));
  if(!mfm)throw new Error(`${detachment.title}: official MFM Detachment Points are missing`);
  return {...detachment,dp:mfm.dp,disposition:mfm.disposition};
}).sort((a,b)=>officialOrder.indexOf(a.id)-officialOrder.indexOf(b.id));
const slugify=value=>String(value).toLowerCase().replaceAll('’','').replaceAll("'",'').replaceAll(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const canonicalCoreTerms=Object.values(globalGlossary).filter(term=>term.kind==='core-ability').map(term=>({
  id:term.id,
  title:term.title.en.replace(/^\[|\]$/g,''),
  group:'Core abilities',
  summary:term.summary.en,
  full:term.definition.en,
  aliases:term.aliases||[],
  fullRulePath:term.fullRulePath,
  unitIds:[]
}));
const glossaryTerms=[
  ...canonicalCoreTerms,
  ...rules.glossary.filter(term=>term.group!=='Core abilities').map(term=>({...term,group:'Faction & publication',unitIds:[...(term.unitIds||[])]})),
  ...allDetachments.flatMap(detachment=>(detachment.stratagems||[]).map(item=>{
    const text=[item.category,item.when&&`WHEN: ${item.when}`,item.target&&`TARGET: ${item.target}`,item.effect&&`EFFECT: ${item.effect}`,item.restrictions&&`RESTRICTIONS: ${item.restrictions}`].filter(Boolean).join(' ');
    return{id:item.id,title:item.title,summary:text,full:text,group:'Stratagems',rule:item.id,unitIds:[]};
  }))
];
const termKeys=new Map(glossaryTerms.map(term=>[term.title.toLowerCase(),term]));
const coreTermKeys=new Map();
for(const term of glossaryTerms.filter(term=>term.group==='Core abilities'))for(const label of [term.title,...(term.aliases||[])])coreTermKeys.set(titleKey(label.replace(/^core-|^datasheet-/i,'').replace(/^\[|\]$/g,'')),term);
const coreBaseKey=value=>{
  const normalized=titleKey(value).replace(/\s+(?:d\d+|\d+|\d+\+|\d+ inches)$/,'').trim();
  return normalized.startsWith('anti ')?'anti':normalized;
};
const knownCoreTitles=new Set([...coreTermKeys.keys(),'deadly demise','deep strike','firing deck','hover','scouts']);
const termIds=new Set(glossaryTerms.map(term=>term.id));
const uniqueTermId=base=>{let id=base,index=2;while(termIds.has(id))id=`${base}-${index++}`;termIds.add(id);return id;};
const attachUnit=(term,unitId)=>{if(!term.unitIds.includes(unitId))term.unitIds.push(unitId);};
for(const unit of rules.datasheets){
  for(const ability of [...unit.abilities,...(unit.wargearAbilities||[])]){
    const key=ability.title.toLowerCase();
    let term=termKeys.get(key)||coreTermKeys.get(coreBaseKey(ability.title));
    if(!term){
    const full=abilityText(ability)||`${ability.title} is listed on the ${unit.title} datasheet.`;
      term={id:uniqueTermId(`datasheet-${slugify(ability.title)}`),title:ability.title,group:'Datasheet abilities',summary:full.split(/(?<=[.!?])\s/)[0],full,sectionId:unit.id,unitIds:[]};
      glossaryTerms.push(term);termKeys.set(key,term);
    }
    attachUnit(term,unit.id);ability.termId=term.id;
  }
  for(const weapon of unit.weapons){
    const profile=`${weapon.mode==='ranged'?'Ranged':'Melee'} · ${weapon.range} · A ${weapon.a} · ${weapon.mode==='ranged'?'BS':'WS'} ${weapon.skill} · S ${weapon.s} · AP ${weapon.ap} · D ${weapon.d}${weapon.abilities?` · ${weapon.abilities}`:''}`;
    const key=`weapon:${weapon.name.toLowerCase()}:${profile}`;
    let term=termKeys.get(key);
    if(!term){
      term={id:uniqueTermId(`weapon-${slugify(weapon.name.replace(/^➤\s*/,''))}`),title:weapon.name.replace(/^➤\s*/,''),group:'Weapon profiles',summary:profile,full:profile,sectionId:unit.id,unitIds:[]};
      glossaryTerms.push(term);termKeys.set(key,term);
    }
    attachUnit(term,unit.id);weapon.termId=term.id;
  }
}
rules.glossary=glossaryTerms;
rules.audit.glossaryTerms=glossaryTerms.length;

  return {factionRules,source,codex,codexDatasheets,pointsCatalog,unitImages,pointsByUnit,titleKey,slugKey,abilityText,enhancementsByTitle,rules,relationGraphs,allDetachments,slugify,coreTermKeys,coreBaseKey,knownCoreTitles,termIds};
}
