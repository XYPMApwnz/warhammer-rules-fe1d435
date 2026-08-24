const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const slug=value=>String(value||'').toLowerCase().replace(/[\u2019']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const values=value=>Array.isArray(value)?value:[];
export const canonicalWeaponProfileId=(unit,profile,index=0)=>profile.id||`${unit.id}-profile-${slug(profile.name)}-${profile.mode||'weapon'}${index?'-'+(index+1):''}`;
export const canonicalWargearAbilityId=(unit,ability,index=0)=>ability.id||`${unit.id}-wargear-ability-${slug(ability.title)}${index?'-'+(index+1):''}`;
const relationRecord=record=>({unitId:record?.unitId||record?.id||'',...(record?.mandatory?{mandatory:true}:{}),...(values(record?.removeKeywords).length?{removeKeywords:[...record.removeKeywords]}:{})});
const relationsFor=(relations,id)=>{const source=relations instanceof Map?relations.get(id):relations?.[id];return Object.fromEntries(['canLead','canSupport','canBeLedBy','canBeSupportedBy'].map(key=>[key,values(source?.[key]).map(relationRecord)]));};
const blockEnhancements=detachment=>[...values(detachment?.enhancements),...values(detachment?.blocks).filter(block=>block?.type==='enhancement'),...values(detachment?.subsections).flatMap(section=>values(section?.blocks).filter(block=>block?.type==='enhancement'))];
const dependencyRecords=config=>{const source=config?.dependencies;if(Array.isArray(source))return source;if(source&&typeof source==='object')return Object.entries(source).map(([bookId,value])=>({bookId,...(value||{})}));return [];};
const gameSelectionsFor=unit=>{
  if(unit.gameSelections)return unit.gameSelections;
  const canonicalWeapons=values(unit.weapons).length?values(unit.weapons):values(unit.blocks).filter(block=>block?.type==='weapon');
  const canonicalWargearAbilities=values(unit.wargearAbilities).length?values(unit.wargearAbilities):values(unit.subsections).filter(section=>normalize(section?.title)==='wargear abilities').flatMap(section=>values(section.blocks).filter(block=>block?.type==='ability'));
  const profileRecords=canonicalWeapons.map((profile,index)=>({
    id:canonicalWeaponProfileId(unit,profile,index),
    title:profile.name||'',mode:profile.mode||'',range:profile.range||'',a:profile.a||'',skill:profile.skill||'',s:profile.s||'',ap:profile.ap||'',d:profile.d||'',abilities:profile.abilities||''
  }));
  const grouped=new Map();
  for(const profile of profileRecords){const key=normalize(profile.title),group=grouped.get(key)||[];group.push(profile);grouped.set(key,group);}
  const selections=[...grouped.values()].map(group=>({id:`${unit.id}-selection-${slug(group[0].title)}`,title:group[0].title,aliases:[group[0].title],kind:'weapon',profileIds:group.map(profile=>profile.id),wargearAbilityIds:[]}));
  const wargearAbilities=canonicalWargearAbilities.map((ability,index)=>({id:canonicalWargearAbilityId(unit,ability,index),title:ability.title||'',requiredSelectionIds:values(ability.requiredSelectionIds)}));
  for(const ability of wargearAbilities)if(!ability.requiredSelectionIds.length)selections.push({id:`${unit.id}-selection-${slug(ability.title)}`,title:ability.title,aliases:[ability.title],kind:'wargear',profileIds:[],wargearAbilityIds:[],candidateWargearAbilityIds:[ability.id]});
  const explicitAbilityLinks=new Map(wargearAbilities.flatMap(ability=>ability.requiredSelectionIds.map(id=>[id,ability.id])));
  for(const selection of selections)if(explicitAbilityLinks.has(selection.id))selection.wargearAbilityIds=[explicitAbilityLinks.get(selection.id)];
  return {models:values(unit.composition).map((model,index)=>({id:model.id||`${unit.id}-model-${slug(model.name)}${index?'-'+(index+1):''}`,title:model.name||'',aliases:[model.name||''].filter(Boolean)})),selections,weaponProfiles:profileRecords.map(profile=>({...profile,sourceSelectionIds:selections.filter(selection=>selection.profileIds.includes(profile.id)).map(selection=>selection.id)})),wargearAbilities};
};

export function createRosterCatalog({config,units=[],detachments=[],relationGraphs=new Map(),legacyEnhancements={},keywordGrants=[]}){
  const dependencies=dependencyRecords(config);
  const catalogUnits=units.map(unit=>{const facts=unit.ruleFacts||unit.facts||{};return {id:unit.id,title:unit.title,sourceBookId:unit.dependencyBook||unit.sourceBookId||config.id,sourceLayer:unit.sourceLayer||unit.status||'current',intrinsicKeywords:[...new Set(values(unit.intrinsicKeywords).length?unit.intrinsicKeywords:values(unit.keywords).length?unit.keywords:values(facts.intrinsicKeywords).length?facts.intrinsicKeywords:values(facts.keywords))],relations:relationsFor(relationGraphs,unit.id),ruleFacts:{...facts,relations:relationsFor(relationGraphs,unit.id)},gameSelections:gameSelectionsFor(unit)};});
  const grantByDetachment=new Map(values(keywordGrants).map(record=>[record.detachmentId||record.id,record]));
  const catalogDetachments=detachments.map(detachment=>({id:detachment.id,title:detachment.title,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,chapterRestriction:detachment.chapterRestriction||detachment.restriction||null,keywordGrants:values(detachment.keywordGrants).length?detachment.keywordGrants:values(grantByDetachment.get(detachment.id)?.grants||grantByDetachment.get(detachment.id)?.keywordGrants)}));
  const legacyEntries=Object.entries(legacyEnhancements||{}),legacyByCompound=new Map(legacyEntries.flatMap(([legacyKey,item])=>[item?.id,item?.ruleId,item?.sourceId,item?.title].filter(Boolean).map(value=>[`${item?.detachmentId||''}\0${normalize(value)}`,{legacyKey,...item}]))),enhancements=[];
  for(const detachment of detachments)for(const item of blockEnhancements(detachment)){const legacy=[item.id,item.ruleId,item.sourceId,item.title].filter(Boolean).map(value=>legacyByCompound.get(`${detachment.id}\0${normalize(value)}`)).find(Boolean)||{};enhancements.push({...legacy,...item,id:legacy.ruleId||legacy.id||item.ruleId||item.id,title:item.title||legacy.title,detachmentId:detachment.id,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,legacyKey:legacy.legacyKey||item.ruleId||item.id});}
  for(const [legacyKey,item] of legacyEntries){if(enhancements.some(record=>record.legacyKey===legacyKey))continue;enhancements.push({...item,id:item.ruleId||item.id||legacyKey,legacyKey,sourceBookId:item.sourceBookId||config.id});}
  return {schema:'wh40k-army-roster-catalog/v1',book:{id:config.id,title:config.title||config.bookTitle||config.id,factionKeyword:config.factionKeyword||null,parentBookId:dependencies[0]?.bookId||dependencies[0]?.id||null,dependencies:dependencies.map(item=>({bookId:item.bookId||item.id,title:item.title||null}))},units:catalogUnits,detachments:catalogDetachments,enhancements};
}

export function serializeRosterCatalog(catalog,legacyEnhancements={}){
  return `window.WH_BOOK_ROSTER_CATALOG=Object.freeze(${JSON.stringify(catalog,null,2)});\nwindow.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze(${JSON.stringify(legacyEnhancements||{},null,2)});\n`;
}
