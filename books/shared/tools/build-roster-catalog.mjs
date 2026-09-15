import {assignCanonicalChildIdentities,requireCanonicalChildIdentity} from './canonical-join-contract.mjs';

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
const legacyWeaponProfileId=(unit,profile,index=0)=>`${unit.id}-profile-${slug(profile.name)}-${profile.mode||'weapon'}${index?'-'+(index+1):''}`;
const legacyWargearAbilityId=(unit,ability,index=0)=>`${unit.id}-wargear-ability-${slug(ability.title)}${index?'-'+(index+1):''}`;
const weaponIdentityFacts=profile=>({sourceName:profile.name||'',mode:profile.mode||'weapon',range:profile.range||'',a:profile.a||'',skill:profile.skill||'',s:profile.s||'',ap:profile.ap||'',d:profile.d||'',abilities:profile.abilities||''});
const abilityIdentityFacts=ability=>({sourceTitle:ability.title||'',text:ability.text||ability.summary||''});
export const canonicalWeaponProfileId=(unit,profile,index=0)=>requireCanonicalChildIdentity(unit,profile,{kind:'profile',title:profile.name,semantic:weaponIdentityFacts(profile),legacyId:legacyWeaponProfileId(unit,profile,index)}).id;
export const canonicalWargearAbilityId=(unit,ability,index=0)=>requireCanonicalChildIdentity(unit,ability,{kind:'wargear-ability',title:ability.title,semantic:abilityIdentityFacts(ability),legacyId:legacyWargearAbilityId(unit,ability,index)}).id;
const relationRecord=record=>({unitId:record?.unitId||record?.id||'',...(Number.isFinite(Number(record?.maxCharacters))?{maxCharacters:Number(record.maxCharacters)}:{}),...(record?.mandatory?{mandatory:true}:{}),...(values(record?.removeKeywords).length?{removeKeywords:[...record.removeKeywords]}:{})});
const relationsFor=(relations,id)=>{const source=relations instanceof Map?relations.get(id):relations?.[id];return Object.fromEntries(['canLead','canSupport','canBeLedBy','canBeSupportedBy'].map(key=>[key,values(source?.[key]).map(relationRecord)]));};
const blockEnhancements=detachment=>[...values(detachment?.enhancements),...values(detachment?.blocks).filter(block=>block?.type==='enhancement'),...values(detachment?.subsections).flatMap(section=>values(section?.blocks).filter(block=>block?.type==='enhancement'))];
const dependencyRecords=config=>{
  const source=config?.dependencies,records=Array.isArray(source)?source.map(item=>typeof item==='string'?{bookId:item}:item):source&&typeof source==='object'?Object.entries(source).map(([bookId,value])=>({bookId,...(value||{})})):[];
  const normalized=records.map(item=>({...(item||{}),bookId:item?.bookId||item?.id||''}));
  if(normalized.some(item=>typeof item.bookId!=='string'||!item.bookId.trim()))throw new Error(`${config?.id||'book'}: dependency requires an exact canonical book ID`);
  if(new Set(normalized.map(item=>item.bookId)).size!==normalized.length)throw new Error(`${config?.id||'book'}: duplicate dependency ID`);
  return normalized;
};
const singularModelTitle=(value,max)=>{const title=String(value||'').replace(/\s+[\u2013\u2014-]\s+EPIC HERO\s*$/i,'').trim();return Number(max)>1&&/s$/i.test(title)&&!/(ss|us)$/i.test(title)?title.slice(0,-1):title;};
const canonicalCompositionModelsFor=unit=>{
  const structured=values(unit.composition);
  if(structured.length)return structured.map(model=>({name:model.name||'',aliases:values(model.aliases),identityFacts:{sourceModels:values(model.models),min:model.min??null,max:model.max??null},...(model.intrinsicKeywords===undefined?{}:{intrinsicKeywords:model.intrinsicKeywords})})).filter(model=>model.name);
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
    records.push({name,aliases:[sourceTitle],identityFacts:{sourceModels:[sourceTitle],min:Number(match[1]),max}});
  }
  return records;
};
const canonicalAbilityRecord=(unit,ability,id)=>({id,sectionId:ability.id||id,title:ability.title||'',text:ability.text||ability.summary||'',sourceUnitId:unit.id});
const assertMatchingAbilityRecords=(unit,abilities,wargearAbilities)=>{
  const ordinaryById=new Map(abilities.map(ability=>[ability.id,ability]));
  for(const wargearAbility of wargearAbilities){
    const ordinary=ordinaryById.get(wargearAbility.id);
    if(!ordinary)continue;
    for(const field of ['sectionId','title','text','sourceUnitId'])if(ordinary[field]&&wargearAbility[field]&&ordinary[field]!==wargearAbility[field])throw new Error(`${unit.id}: conflicting canonical ability ${wargearAbility.id} field ${field}`);
  }
};
export const canonicalRosterModelsFor=unit=>assignCanonicalChildIdentities(unit,canonicalCompositionModelsFor(unit),{kind:'model',titleOf:model=>model.name,semanticOf:model=>({...model.identityFacts,sourceName:model.name}),legacyIdOf:(model,index)=>`${unit.id}-model-${slug(model.name)}${index?'-'+(index+1):''}`}).map(model=>{
  const keywords=model.intrinsicKeywords;
  if(keywords!==undefined&&(!Array.isArray(keywords)||keywords.some(keyword=>typeof keyword!=='string'||!keyword.trim())||new Set(keywords.map(normalize)).size!==keywords.length))throw new Error(`${unit.id}: invalid model-scoped intrinsic keywords for ${model.name}`);
  return {id:model.id,title:model.name||'',aliases:[...new Set([model.name,...values(model.aliases)].filter(Boolean))],...(model.legacyIds?.length?{legacyIds:model.legacyIds}:{}),...(keywords===undefined?{}:{intrinsicKeywords:[...keywords]})};
});
const gameSelectionsFor=(unit,options={})=>{
  if(unit.gameSelections)return unit.gameSelections;
  const canonicalWeapons=values(unit.weapons).length?values(unit.weapons):values(unit.blocks).filter(block=>block?.type==='weapon');
  const canonicalWargearAbilities=values(unit.wargearAbilities).length?values(unit.wargearAbilities):values(unit.subsections).filter(section=>normalize(section?.title)==='wargear abilities').flatMap(section=>values(section.blocks).filter(block=>block?.type==='ability'));
  const canonicalAbilities=[...values(unit.abilities),...values(unit.blocks).filter(block=>block?.type==='ability'),...values(unit.subsections).flatMap(section=>values(section?.blocks).filter(block=>block?.type==='ability'))];
  const profileRecords=assignCanonicalChildIdentities(unit,canonicalWeapons,{kind:'profile',titleOf:profile=>profile.name,semanticOf:weaponIdentityFacts,legacyIdOf:legacyWeaponProfileId.bind(null,unit)}).map(profile=>({
    id:profile.id,...(profile.legacyIds?.length?{legacyIds:profile.legacyIds}:{}),
    title:profile.name||'',mode:profile.mode||'',range:profile.range||'',a:profile.a||'',skill:profile.skill||'',s:profile.s||'',ap:profile.ap||'',d:profile.d||'',abilities:profile.abilities||''
  }));
  const profileIds=new Set(profileRecords.map(profile=>profile.id));
  const memberships=(key,label)=>values(options[key]).filter(record=>record.unitId===unit.id).map(record=>{
    if(!record.id||!Array.isArray(record.profileIds)||!record.profileIds.length)throw new Error(`${unit.id}: ${label} membership requires an ID and profile IDs`);
    if(new Set(record.profileIds).size!==record.profileIds.length)throw new Error(`${unit.id}: duplicate ${label} profile identity for ${record.id}`);
    for(const id of record.profileIds)if(!profileIds.has(id))throw new Error(`${unit.id}: ${label} ${record.id} references unknown profile ${id}`);
    return{...record,profileIds:[...record.profileIds]};
  });
  const grouped=new Map();
  for(const profile of profileRecords){const key=normalize(profile.title),group=grouped.get(key)||[];group.push(profile);grouped.set(key,group);}
  const selections=[...grouped.values()].map(group=>({id:`${unit.id}-selection-${slug(group[0].title)}`,title:group[0].title,aliases:[group[0].title],kind:'weapon',profileIds:group.map(profile=>profile.id),wargearAbilityIds:[]}));
  const familyGroups=new Map();
  for(const profile of profileRecords){const title=weaponFamilyTitle(profile.title);if(!title)continue;const key=normalize(title),group=familyGroups.get(key)||{title,profiles:[]};group.profiles.push(profile);familyGroups.set(key,group);}
  const weaponFamilies=[...familyGroups.values()].filter(group=>group.profiles.length>1).map(group=>({id:`${unit.id}-weapon-family-${slug(group.title)}`,title:group.title,aliases:[group.title],profileIds:group.profiles.map(profile=>profile.id),ambiguousAlias:grouped.has(normalize(group.title))}));
  for(const contract of memberships('weaponFamilyMemberships','weapon family')){
    const {unitId,...membership}=contract,existing=weaponFamilies.find(record=>record.id===membership.id),title=membership.title||existing?.title||membership.id;
    const exact={...existing,...membership,title,aliases:[...new Set([title,...values(membership.aliases),...values(existing?.aliases)].filter(Boolean))],ambiguousAlias:existing?.ambiguousAlias||false};
    if(existing)weaponFamilies.splice(weaponFamilies.indexOf(existing),1,exact);else weaponFamilies.push(exact);
  }
  const weaponClasses=memberships('weaponClassMemberships','weapon class').map(({unitId,...record})=>record);
  for(const family of weaponFamilies)selections.push({id:`${family.id}-selection`,title:family.title,aliases:[...family.aliases],kind:'weapon',familyId:family.id,profileIds:[...family.profileIds],wargearAbilityIds:[]});
  const declaredWargearSelections=[];
  const wargearAbilities=assignCanonicalChildIdentities(unit,canonicalWargearAbilities,{kind:'wargear-ability',titleOf:ability=>ability.title,semanticOf:abilityIdentityFacts,legacyIdOf:legacyWargearAbilityId.bind(null,unit)}).map(ability=>{const abilityId=ability.id,declared=values(ability.requiredSelections).map(selection=>{const record=typeof selection==='string'?{title:selection}:selection||{},title=record.title||'',id=record.id||`${unit.id}-selection-${slug(title)}`;declaredWargearSelections.push({id,title,aliases:[...new Set([title,...values(record.aliases)].filter(Boolean))],kind:'wargear',profileIds:[],wargearAbilityIds:[abilityId]});return id;});return{...canonicalAbilityRecord(unit,ability,abilityId),...(ability.legacyIds?.length?{legacyIds:ability.legacyIds}:{}),requiredSelectionIds:[...new Set([...values(ability.requiredSelectionIds),...declared])]};});
  for(const declared of declaredWargearSelections){const existing=selections.find(selection=>selection.id===declared.id);if(existing)existing.wargearAbilityIds=[...new Set([...values(existing.wargearAbilityIds),...declared.wargearAbilityIds])];else selections.push(declared);}
  for(const ability of wargearAbilities)if(!ability.requiredSelectionIds.length){const id=`${unit.id}-selection-${slug(ability.title)}`;if(options.inferExactWargearAbilitySelections){ability.requiredSelectionIds=[id];selections.push({id,title:ability.title,aliases:[ability.title],kind:'wargear',profileIds:[],wargearAbilityIds:[ability.id]});}else selections.push({id,title:ability.title,aliases:[ability.title],kind:'wargear',profileIds:[],wargearAbilityIds:[],candidateWargearAbilityIds:[ability.id]});}
  for(const ability of wargearAbilities)for(const selectionId of ability.requiredSelectionIds){const selection=selections.find(item=>item.id===selectionId);if(selection)selection.wargearAbilityIds=[...new Set([...values(selection.wargearAbilityIds),ability.id])];}
  for(const contract of values(unit.gameSelectionContracts)){
    const title=String(contract?.title||'').trim(),id=contract?.id||`${unit.id}-selection-${slug(title)}`;
    if(!title)throw new Error(`${unit.id}: game selection contract requires a title`);
    const matches=selections.filter(selection=>selection.id===id||normalize(selection.title)===normalize(title));
    if(matches.length>1)throw new Error(`${unit.id}: game selection contract ${title} is ambiguous`);
    const existing=matches[0],kind=contract.kind||existing?.kind||'wargear';
    if(!['weapon','wargear'].includes(kind))throw new Error(`${unit.id}: game selection contract ${title} has invalid kind ${kind}`);
    if(existing&&contract.kind&&existing.kind!==contract.kind)throw new Error(`${unit.id}: game selection contract ${title} conflicts with canonical kind ${existing.kind}`);
    const profileIds=values(contract.profileTitles).flatMap(profileTitle=>{const profiles=profileRecords.filter(profile=>normalize(profile.title)===normalize(profileTitle));if(profiles.length!==1)throw new Error(`${unit.id}: game selection contract ${title} profile ${profileTitle} must resolve exactly once`);return profiles.map(profile=>profile.id);});
    if(contract.maxTotalQuantity!==undefined&&(!Number.isInteger(contract.maxTotalQuantity)||contract.maxTotalQuantity<1))throw new Error(`${unit.id}: game selection contract ${title} has invalid maxTotalQuantity`);
    const selection=existing||{id,title,aliases:[title],kind,profileIds:[],wargearAbilityIds:[]};
    selection.aliases=[...new Set([selection.title,...values(selection.aliases),...values(contract.aliases)].filter(Boolean))];
    selection.profileIds=[...new Set([...values(selection.profileIds),...profileIds])];
    if(contract.maxTotalQuantity!==undefined)selection.maxTotalQuantity=contract.maxTotalQuantity;
    if(!existing)selections.push(selection);
  }
  const stats=normalizedStatsFor(unit);
  const explicitCounts=new Map();for(const ability of canonicalAbilities){const id=ability.id||ability.termId;if(id)explicitCounts.set(id,(explicitCounts.get(id)||0)+1);}
  const ordinaryAbilityRecords=assignCanonicalChildIdentities(unit,canonicalAbilities.map(ability=>{const id=ability.id||ability.termId;return id&&explicitCounts.get(id)===1?{...ability,id}:ability;}),{kind:'ability',titleOf:ability=>ability.title,semanticOf:abilityIdentityFacts,legacyIdOf:(ability,index)=>ability.termId||`${unit.id}-ability-${slug(ability.title)}${index?'-'+(index+1):''}`}).map(ability=>({...canonicalAbilityRecord(unit,ability,ability.id),...(ability.legacyIds?.length?{legacyIds:ability.legacyIds}:{})}));
  assertMatchingAbilityRecords(unit,ordinaryAbilityRecords,wargearAbilities);
  const wargearAbilityIds=new Set(wargearAbilities.map(ability=>ability.id)),abilities=ordinaryAbilityRecords.filter(ability=>!wargearAbilityIds.has(ability.id));
  return {stats:{...stats},abilities,models:canonicalRosterModelsFor(unit),selections,weaponFamilies,...(weaponClasses.length?{weaponClasses}:{}),weaponProfiles:profileRecords.map(profile=>({...profile,sourceSelectionIds:selections.filter(selection=>selection.profileIds.includes(profile.id)).map(selection=>selection.id)})),wargearAbilities};
};

const detachmentRulesFor=(detachment,options={})=>{
  const candidates=[...values(detachment.detachmentRules),...values(detachment.rules)];
  if(detachment.rule)candidates.push(detachment.rule,...values(detachment.rule.additionalRules));
  for(const section of values(detachment.subsections))if(section?.kind==='detachment-rule'||/detachment rule/i.test(section?.title||''))for(const block of values(section.blocks))candidates.push({...block,sectionId:block.sectionId||block.id||section.id});
  const records=new Map();for(const item of candidates){const id=item?.termId||item?.ruleId||item?.id||(options.inferCanonicalDetachmentRuleIds&&item?.title?`${options.bookId||'book'}-detachment-rule-${slug(item.title)}`:null);if(!id)continue;records.set(id,{id,title:item.title||'',text:item.text||item.full||item.short||'',sectionId:item.sectionId||item.sourceId||item.id||`${detachment.id}-rule`,detachmentId:detachment.id,detachmentTitle:detachment.title,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||null});}
  return [...records.values()];
};

export function createRosterCatalog({config,units=[],detachments=[],relationGraphs=new Map(),legacyEnhancements={},enhancementContracts=null,keywordGrants=[],effectContracts=[]}){
  const dependencies=dependencyRecords(config);
  const rosterCatalog={bookId:config.id,...config.rosterCatalog};
  const effectiveUnitIds=new Set(units.map(unit=>unit.id));
  for(const [key,label] of [['weaponClassMemberships','weapon class'],['weaponFamilyMemberships','weapon family']]){
    const seen=new Set();
    for(const record of values(rosterCatalog[key])){
      if(!effectiveUnitIds.has(record?.unitId))throw new Error(`${config.id}: ${label} ${record?.id||'<missing>'} references unknown unit ${record?.unitId||'<missing>'}`);
      const identity=`${record.unitId}\0${record.id}`;
      if(seen.has(identity))throw new Error(`${config.id}: duplicate ${label} membership ${record.unitId}/${record.id}`);
      seen.add(identity);
    }
  }
  const compatibilityByUnit=config.unitCompatibleChapterKeywords||{};
  for(const [unitId,keywords] of Object.entries(compatibilityByUnit)){
    if(units.filter(unit=>unit.id===unitId).length!==1)throw new Error(`${config.id}: unit compatibility ${unitId} must resolve exactly once`);
    if(!Array.isArray(keywords)||!keywords.length||keywords.some(value=>typeof value!=='string'||!value.trim()))throw new Error(`${config.id}: unit compatibility ${unitId} requires non-empty chapter keywords`);
    if(new Set(keywords.map(normalize)).size!==keywords.length)throw new Error(`${config.id}: unit compatibility ${unitId} contains duplicate chapter keywords`);
  }
  const catalogUnits=units.map(unit=>{const facts=rosterCatalog.includeRuleFacts===false?{}:unit.ruleFacts||unit.facts||{},compatibleChapterKeywords=compatibilityByUnit[unit.id]||[];return {id:unit.id,title:unit.title,sourceBookId:unit.dependencyBook||unit.sourceBookId||config.id,sourceLayer:unit.sourceLayer||unit.status||'current',intrinsicKeywords:[...new Set(values(unit.intrinsicKeywords).length?unit.intrinsicKeywords:values(unit.keywords).length?unit.keywords:values(facts.intrinsicKeywords).length?facts.intrinsicKeywords:values(facts.keywords))],...(compatibleChapterKeywords.length?{compatibleChapterKeywords:[...compatibleChapterKeywords]}:{}),relations:relationsFor(relationGraphs,unit.id),ruleFacts:{...facts,relations:relationsFor(relationGraphs,unit.id)},gameSelections:gameSelectionsFor(unit,rosterCatalog)};});
  const grantByDetachment=new Map(values(keywordGrants).map(record=>[record.detachmentId||record.id,record]));
  const detachmentRules=detachments.flatMap(detachment=>detachmentRulesFor(detachment,rosterCatalog).map(rule=>({...rule,sourceBookId:rule.sourceBookId||config.id}))),ruleIdsByDetachment=new Map(detachments.map(detachment=>[detachment.id,detachmentRules.filter(rule=>rule.detachmentId===detachment.id).map(rule=>rule.id)]));
  const catalogDetachments=detachments.map(detachment=>({id:detachment.id,title:detachment.title,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,chapterRestriction:detachment.chapterRestriction||detachment.restriction||null,keywordGrants:values(detachment.keywordGrants).length?detachment.keywordGrants:values(grantByDetachment.get(detachment.id)?.grants||grantByDetachment.get(detachment.id)?.keywordGrants),detachmentRuleIds:ruleIdsByDetachment.get(detachment.id)||[]}));
  const legacyEntries=Object.entries(legacyEnhancements||{}),enhancements=[];
  if(Array.isArray(enhancementContracts)){
    const scoped=new Set();for(const item of enhancementContracts){if(!item.id||!item.detachmentId)throw new Error(`${config.id}: canonical Enhancement requires exact identity and Detachment ID`);const key=`${item.detachmentId}\0${item.id}`;if(scoped.has(key))throw new Error(`${config.id}: duplicate scoped Enhancement identity ${key}`);scoped.add(key);enhancements.push({...item});}
  }else{
    const legacyByCompound=new Map(legacyEntries.flatMap(([legacyKey,item])=>[item?.id,item?.ruleId,item?.sourceId,item?.title].filter(Boolean).map(value=>[`${item?.detachmentId||''}\0${normalize(value)}`,{legacyKey,...item}])));
    for(const detachment of detachments)for(const item of blockEnhancements(detachment)){const legacy=[item.id,item.ruleId,item.sourceId,item.title].filter(Boolean).map(value=>legacyByCompound.get(`${detachment.id}\0${normalize(value)}`)).find(Boolean)||{};enhancements.push({...legacy,...item,id:legacy.ruleId||legacy.id||item.ruleId||item.id,title:item.title||legacy.title,detachmentId:detachment.id,sourceBookId:detachment.dependencyBook||detachment.sourceBookId||config.id,legacyKey:legacy.legacyKey||item.ruleId||item.id});}
    for(const [legacyKey,item] of legacyEntries){if(enhancements.some(record=>record.legacyKey===legacyKey)||rosterCatalog.dedupeLegacyEnhancementsByTitle&&enhancements.some(record=>normalize(record.title)===normalize(item.title)))continue;enhancements.push({...item,id:item.ruleId||item.id||legacyKey,legacyKey,sourceBookId:item.sourceBookId||config.id});}
  }
  return {schema:'wh40k-army-roster-catalog/v1',book:{id:config.id,title:config.title||config.bookTitle||config.id,factionKeyword:config.factionKeyword||null,parentBookId:dependencies[0]?.bookId||dependencies[0]?.id||null,dependencies:dependencies.map(item=>({bookId:item.bookId||item.id,title:item.title||null}))},units:catalogUnits,detachments:catalogDetachments,detachmentRules,enhancements,effectContracts};
}

export function serializeRosterCatalog(catalog,legacyEnhancements={}){
  return `window.WH_BOOK_ROSTER_CATALOG=Object.freeze(${JSON.stringify(catalog,null,2)});\nwindow.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze(${JSON.stringify(legacyEnhancements||{},null,2)});\n`;
}
