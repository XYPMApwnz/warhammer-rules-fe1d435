const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const slug=value=>String(value||'').toLowerCase().replace(/[\u2019']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const values=value=>Array.isArray(value)?value:[];
const statRecord=value=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length?value:null;
const normalizedStatsFor=unit=>{
  const explicit=statRecord(unit.stats);
  if(explicit)return {...explicit};
  const sources=[...values(unit.profiles).map(profile=>statRecord(profile.stats)),...values(unit.blocks).filter(block=>block.type==='statline').map(block=>statRecord(block.values))].filter(Boolean);
  if(!sources.length)return {};
  const keys=[...new Set(sources.flatMap(source=>Object.keys(source)))];
  return Object.fromEntries(keys.filter(key=>sources.every(source=>Object.prototype.hasOwnProperty.call(source,key)&&String(source[key])===String(sources[0][key]))).map(key=>[key,sources[0][key]]));
};
const weaponFamilyTitle=value=>{const match=String(value||'').match(/^(.+?)\s+[\u2013\u2014-]\s+(.+)$/);return match?match[1].trim():'';};
export const canonicalWeaponProfileId=(unit,profile,index=0)=>profile.id||`${unit.id}-profile-${slug(profile.name)}-${profile.mode||'weapon'}${index?'-'+(index+1):''}`;
export const canonicalWargearAbilityId=(unit,ability,index=0)=>ability.id||`${unit.id}-wargear-ability-${slug(ability.title)}${index?'-'+(index+1):''}`;
const relationRecord=record=>({unitId:record?.unitId||record?.id||'',...(Number.isFinite(Number(record?.maxCharacters))?{maxCharacters:Number(record.maxCharacters)}:{}),...(record?.mandatory?{mandatory:true}:{}),...(values(record?.removeKeywords).length?{removeKeywords:[...record.removeKeywords]}:{})});
const relationsFor=(relations,id)=>{const source=relations instanceof Map?relations.get(id):relations?.[id];return Object.fromEntries(['canLead','canSupport','canBeLedBy','canBeSupportedBy'].map(key=>[key,values(source?.[key]).map(relationRecord)]));};
const blockEnhancements=detachment=>[...values(detachment?.enhancements),...values(detachment?.blocks).filter(block=>block?.type==='enhancement'),...values(detachment?.subsections).flatMap(section=>values(section?.blocks).filter(block=>block?.type==='enhancement'))];
const dependencyRecords=config=>{const source=config?.dependencies;if(Array.isArray(source))return source;if(source&&typeof source==='object')return Object.entries(source).map(([bookId,value])=>({bookId,...(value||{})}));return [];};
const singularModelTitle=(value,max)=>{const title=String(value||'').replace(/\s+[\u2013\u2014-]\s+EPIC HERO\s*$/i,'').trim();return Number(max)>1&&/s$/i.test(title)&&!/(ss|us)$/i.test(title)?title.slice(0,-1):title;};
const canonicalCompositionModelsFor=unit=>{
  const structured=values(unit.composition);
  if(structured.length)return structured.map(model=>({name:model.name||'',aliases:values(model.aliases)})).filter(model=>model.name);
  const section=values(unit.subsections).find(item=>normalize(item?.title)==='unit composition');
  const text=typeof unit.composition==='string'?unit.composition:values(section?.blocks).filter(block=>block?.type==='p').map(block=>block.text||'').join(' ');
  if(!text.trim())return [];
  const records=[];
  for(const clause of text.split(/\s*[.;]\s*/).map(item=>item.trim()).filter(Boolean)){
    const match=clause.match(/^(\d+)(?:\s*[-\u2013]\s*(\d+))?\s+(.+?)$/);
    if(!match)break;
    const sourceTitle=match[3].trim(),max=Number(match[2]||match[1]);
    if(!sourceTitle||/\b(?:equipped|armed)\b/i.test(sourceTitle))return [];
    const name=singularModelTitle(sourceTitle,max);
    if(!name)return [];
    records.push({name,aliases:[sourceTitle]});
  }
  return records;
};
const gameSelectionsFor=unit=>{
  if(unit.gameSelections)return unit.gameSelections;
  const canonicalWeapons=values(unit.weapons).length?values(unit.weapons):values(unit.blocks).filter(block=>block?.type==='weapon');
  const canonicalWargearAbilities=values(unit.wargearAbilities).length?values(unit.wargearAbilities):values(unit.subsections).filter(section=>normalize(section?.title)==='wargear abilities').flatMap(section=>values(section.blocks).filter(block=>block?.type==='ability'));
  const canonicalAbilities=[...values(unit.abilities),...values(unit.blocks).filter(block=>block?.type==='ability'),...values(unit.subsections).flatMap(section=>values(section?.blocks).filter(block=>block?.type==='ability'))];
  const profileRecords=canonicalWeapons.map((profile,index)=>({
    id:canonicalWeaponProfileId(unit,profile,index),
    title:profile.name||'',mode:profile.mode||'',range:profile.range||'',a:profile.a||'',skill:profile.skill||'',s:profile.s||'',ap:profile.ap||'',d:profile.d||'',abilities:profile.abilities||''
  }));
  const grouped=new Map();
  for(const profile of profileRecords){const key=normalize(profile.title),group=grouped.get(key)||[];group.push(profile);grouped.set(key,group);}
  const selections=[...grouped.values()].map(group=>({id:`${unit.id}-selection-${slug(group[0].title)}`,title:group[0].title,aliases:[group[0].title],kind:'weapon',profileIds:group.map(profile=>profile.id),wargearAbilityIds:[]}));
  const familyGroups=new Map();
  for(const profile of profileRecords){const title=weaponFamilyTitle(profile.title);if(!title)continue;const key=normalize(title),group=familyGroups.get(key)||{title,profiles:[]};group.profiles.push(profile);familyGroups.set(key,group);}
  const weaponFamilies=[...familyGroups.values()].filter(group=>group.profiles.length>1).map(group=>({id:`${unit.id}-weapon-family-${slug(group.title)}`,title:group.title,aliases:[group.title],profileIds:group.profiles.map(profile=>profile.id),ambiguousAlias:grouped.has(normalize(group.title))}));
  for(const family of weaponFamilies)selections.push({id:`${family.id}-selection`,title:family.title,aliases:[...family.aliases],kind:'weapon',familyId:family.id,profileIds:[...family.profileIds],wargearAbilityIds:[]});
  const declaredWargearSelections=[];
  const wargearAbilities=canonicalWargearAbilities.map((ability,index)=>{const abilityId=canonicalWargearAbilityId(unit,ability,index),declared=values(ability.requiredSelections).map(selection=>{const record=typeof selection==='string'?{title:selection}:selection||{},title=record.title||'',id=record.id||`${unit.id}-selection-${slug(title)}`;declaredWargearSelections.push({id,title,aliases:[...new Set([title,...values(record.aliases)].filter(Boolean))],kind:'wargear',profileIds:[],wargearAbilityIds:[abilityId]});return id;});return{id:abilityId,title:ability.title||'',requiredSelectionIds:[...new Set([...values(ability.requiredSelectionIds),...declared])]};});
  for(const declared of declaredWargearSelections){const existing=selections.find(selection=>selection.id===declared.id);if(existing)existing.wargearAbilityIds=[...new Set([...values(existing.wargearAbilityIds),...declared.wargearAbilityIds])];else selections.push(declared);}
  for(const ability of wargearAbilities)if(!ability.requiredSelectionIds.length)selections.push({id:`${unit.id}-selection-${slug(ability.title)}`,title:ability.title,aliases:[ability.title],kind:'wargear',profileIds:[],wargearAbilityIds:[],candidateWargearAbilityIds:[ability.id]});
  for(const ability of wargearAbilities)for(const selectionId of ability.requiredSelectionIds){const selection=selections.find(item=>item.id===selectionId);if(selection)selection.wargearAbilityIds=[...new Set([...values(selection.wargearAbilityIds),ability.id])];}
  const stats=normalizedStatsFor(unit),compositionModels=canonicalCompositionModelsFor(unit);
  const abilities=[...new Map(canonicalAbilities.map((ability,index)=>{const id=ability.termId||ability.id||`${unit.id}-ability-${slug(ability.title)}${index?'-'+(index+1):''}`;return[id,{id,sectionId:ability.id||id,title:ability.title||'',text:ability.text||ability.summary||'',sourceUnitId:unit.id}];})).values()];
  return {stats:{...stats},abilities,models:compositionModels.map((model,index)=>({id:model.id||`${unit.id}-model-${slug(model.name)}${index?'-'+(index+1):''}`,title:model.name||'',aliases:[...new Set([model.name,...values(model.aliases)].filter(Boolean))]})),selections,weaponFamilies,weaponProfiles:profileRecords.map(profile=>({...profile,sourceSelectionIds:selections.filter(selection=>selection.profileIds.includes(profile.id)).map(selection=>selection.id)})),wargearAbilities};
};

const detachmentRulesFor=detachment=>{
  const candidates=[...values(detachment.detachmentRules),...values(detachment.rules)];
  for(const section of values(detachment.subsections))if(section?.kind==='detachment-rule'||/detachment rule/i.test(section?.title||''))for(const block of values(section.blocks))candidates.push({...block,sectionId:block.sectionId||block.id||section.id});
  const records=new Map();for(const item of candidates){const id=item?.termId||item?.ruleId||item?.id;if(!id)continue;records.set(id,{id,title:item.title||'',text:item.text||item.full||item.short||'',sectionId:item.sectionId||item.sourceId||item.id||id,detachmentId:detachment.id,detachmentTitle:detachment.title,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||null});}
  return [...records.values()];
};

export function createRosterCatalog({config,units=[],detachments=[],relationGraphs=new Map(),legacyEnhancements={},keywordGrants=[]}){
  const dependencies=dependencyRecords(config);
  const catalogUnits=units.map(unit=>{const facts=unit.ruleFacts||unit.facts||{};return {id:unit.id,title:unit.title,sourceBookId:unit.dependencyBook||unit.sourceBookId||config.id,sourceLayer:unit.sourceLayer||unit.status||'current',intrinsicKeywords:[...new Set(values(unit.intrinsicKeywords).length?unit.intrinsicKeywords:values(unit.keywords).length?unit.keywords:values(facts.intrinsicKeywords).length?facts.intrinsicKeywords:values(facts.keywords))],relations:relationsFor(relationGraphs,unit.id),ruleFacts:{...facts,relations:relationsFor(relationGraphs,unit.id)},gameSelections:gameSelectionsFor(unit)};});
  const grantByDetachment=new Map(values(keywordGrants).map(record=>[record.detachmentId||record.id,record]));
  const detachmentRules=detachments.flatMap(detachment=>detachmentRulesFor(detachment).map(rule=>({...rule,sourceBookId:rule.sourceBookId||config.id}))),ruleIdsByDetachment=new Map(detachments.map(detachment=>[detachment.id,detachmentRules.filter(rule=>rule.detachmentId===detachment.id).map(rule=>rule.id)]));
  const catalogDetachments=detachments.map(detachment=>({id:detachment.id,title:detachment.title,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,chapterRestriction:detachment.chapterRestriction||detachment.restriction||null,keywordGrants:values(detachment.keywordGrants).length?detachment.keywordGrants:values(grantByDetachment.get(detachment.id)?.grants||grantByDetachment.get(detachment.id)?.keywordGrants),detachmentRuleIds:ruleIdsByDetachment.get(detachment.id)||[]}));
  const legacyEntries=Object.entries(legacyEnhancements||{}),legacyByCompound=new Map(legacyEntries.flatMap(([legacyKey,item])=>[item?.id,item?.ruleId,item?.sourceId,item?.title].filter(Boolean).map(value=>[`${item?.detachmentId||''}\0${normalize(value)}`,{legacyKey,...item}]))),enhancements=[];
  for(const detachment of detachments)for(const item of blockEnhancements(detachment)){const legacy=[item.id,item.ruleId,item.sourceId,item.title].filter(Boolean).map(value=>legacyByCompound.get(`${detachment.id}\0${normalize(value)}`)).find(Boolean)||{};enhancements.push({...legacy,...item,id:legacy.ruleId||legacy.id||item.ruleId||item.id,title:item.title||legacy.title,detachmentId:detachment.id,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,legacyKey:legacy.legacyKey||item.ruleId||item.id});}
  for(const [legacyKey,item] of legacyEntries){if(enhancements.some(record=>record.legacyKey===legacyKey))continue;enhancements.push({...item,id:item.ruleId||item.id||legacyKey,legacyKey,sourceBookId:item.sourceBookId||config.id});}
  return {schema:'wh40k-army-roster-catalog/v1',book:{id:config.id,title:config.title||config.bookTitle||config.id,factionKeyword:config.factionKeyword||null,parentBookId:dependencies[0]?.bookId||dependencies[0]?.id||null,dependencies:dependencies.map(item=>({bookId:item.bookId||item.id,title:item.title||null}))},units:catalogUnits,detachments:catalogDetachments,detachmentRules,enhancements};
}

export function serializeRosterCatalog(catalog,legacyEnhancements={}){
  return `window.WH_BOOK_ROSTER_CATALOG=Object.freeze(${JSON.stringify(catalog,null,2)});\nwindow.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze(${JSON.stringify(legacyEnhancements||{},null,2)});\n`;
}
