(function(root){
  'use strict';

  const apostrophes=/[\u2018\u2019\u02bc\uff07]/g;
  const dashes=/[\u2010\u2011\u2012\u2013\u2014\u2212\ufe58\ufe63\uff0d]/g;
  const list=value=>value instanceof Set?[...value]:Array.isArray(value)?[...value]:null;
  const relationKeys=['canLead','canSupport','canBeLedBy','canBeSupportedBy'];
  const staticRosterConditions=new Set(['attachment-unknown','second-character-unknown','second-unit-unknown','warlord-unknown','detachment-not-selected']);

  function normalizeKeyword(value){
    if(typeof value!=='string')throw new TypeError(`Keyword must be a string, received ${value===null?'null':typeof value}`);
    return value.normalize('NFKC').replace(/\u00a0/g,' ').replace(apostrophes,"'").replace(dashes,'-').replace(/\s+/g,' ').trim().toUpperCase();
  }

  function textFromDomLike(value){
    if(typeof value==='string')return value;
    if(value&&typeof value.textContent==='string')return value.textContent;
    throw new TypeError(`DOM text boundary expected a string or textContent, received ${value===null?'null':typeof value}`);
  }

  function normalizedSet(value,field){
    const entries=list(value);
    if(!entries)throw new TypeError(`${field} must be an array or Set`);
    return new Set(entries.map(normalizeKeyword).filter(Boolean));
  }

  function stringSet(value,field){
    const entries=list(value);
    if(!entries)throw new TypeError(`${field} must be an array or Set`);
    return new Set(entries.map(item=>{
      if(typeof item!=='string')throw new TypeError(`${field} entries must be strings`);
      return item.trim();
    }).filter(Boolean));
  }

  function candidateProfile(candidate,index){
    if(!candidate||typeof candidate!=='object'||Array.isArray(candidate))throw new TypeError(`candidates[${index}] must be a plain object`);
    const keywords=normalizedSet(candidate.keywords||[],`candidates[${index}].keywords`);
    const intrinsicKeywords=normalizedSet(candidate.intrinsicKeywords||candidate.keywords||[],`candidates[${index}].intrinsicKeywords`);
    const profile={
      ...candidate,
      unitId:candidate.unitId||candidate.id||'',
      slug:candidate.slug||String(candidate.unitId||candidate.id||'').replace(/^unit-/,''),
      keywords,
      intrinsicKeywords
    };
    if(candidate.abilities!=null)profile.abilities=normalizedSet(candidate.abilities,`candidates[${index}].abilities`);
    if(candidate.termIds!=null||candidate.ids!=null)profile.termIds=stringSet(candidate.termIds||candidate.ids,`candidates[${index}].termIds`);
    return profile;
  }

  function relationProfile(relation,key,index){
    if(!relation||typeof relation!=='object'||Array.isArray(relation))throw new TypeError(`relations.${key}[${index}] must be a plain object`);
    if(typeof relation.unitId!=='string'||!relation.unitId)throw new TypeError(`relations.${key}[${index}] requires a string unitId`);
    return {...relation,keywords:normalizedSet(relation.keywords||[],`relations.${key}[${index}].keywords`),removeKeywords:normalizedSet(relation.removeKeywords||[],`relations.${key}[${index}].removeKeywords`)};
  }

  function relationGraph(value={}){
    if(!value||typeof value!=='object'||Array.isArray(value))throw new TypeError('relations must be a plain object');
    for(const key of Object.keys(value))if(!relationKeys.includes(key))throw new TypeError(`Unsupported relation key: ${key}`);
    return Object.fromEntries(relationKeys.map(key=>{
      const entries=list(value[key]||[]);if(!entries)throw new TypeError(`relations.${key} must be an array or Set`);
      return [key,entries.map((relation,index)=>relationProfile(relation,key,index))];
    }));
  }

  function profileFromRecord(record){
    if(!record||typeof record!=='object'||Array.isArray(record))throw new TypeError('Rule facts record must be a plain object');
    const unitId=record.unitId||record.id||'';
    if(typeof unitId!=='string'||!unitId)throw new TypeError('Rule facts record requires a string unitId');
    const keywords=normalizedSet(record.keywords||[],'keywords');
    const intrinsicKeywords=normalizedSet(record.intrinsicKeywords||record.keywords||[],'intrinsicKeywords');
    const termIds=stringSet(record.termIds||record.ids||[],'termIds');
    const candidates=list(record.candidates||[]);
    if(!candidates)throw new TypeError('candidates must be an array or Set');
    const normalizedCandidates=candidates.map(candidateProfile);
    const profile={
      ...record,
      unitId,
      id:record.id||unitId,
      slug:record.slug||unitId.replace(/^unit-/,''),
      keywords,
      intrinsicKeywords,
      abilities:normalizedSet(record.abilities||[],'abilities'),
      termIds,
      ids:new Set(termIds),
      candidates:normalizedCandidates.length?normalizedCandidates:undefined,
      relations:relationGraph(record.relations||{}),
      epic:record.epic==null?intrinsicKeywords.has('EPIC HERO'):Boolean(record.epic),
      deadlyDemise:record.deadlyDemise==null?false:Boolean(record.deadlyDemise),
      attached:record.attached??null,
      attachmentKnown:record.attachmentKnown==null?null:Boolean(record.attachmentKnown),
      formationRequired:Boolean(record.formationRequired),
      characterCount:record.characterCount==null?(intrinsicKeywords.has('CHARACTER')?1:0):Number(record.characterCount),
      twoCharacters:record.twoCharacters??null,
      warlord:record.warlord??null
    };
    profile.has=id=>profile.termIds.has(id);
    return profile;
  }

  function safeFragment(value){return String(value).slice(0,160).replace(/\s+/g,' ');}

  function parseDatasetJson(dataset,field,{required=false,defaultValue,unitId='unknown'}={}){
    if(!dataset||typeof dataset!=='object')throw new TypeError('Dataset must be an object');
    const raw=dataset[field];
    if(raw==null||raw===''){
      if(required)throw new Error(`${unitId}: missing data-${field.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`)}`);
      return defaultValue;
    }
    if(typeof raw!=='string')throw new TypeError(`${unitId}: data-${field} must be a string`);
    try{return JSON.parse(raw);}
    catch(error){throw new Error(`${unitId}: malformed data-${field.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`)} (${safeFragment(raw)}): ${error.message}`);}
  }

  function recordFromDataset(dataset={},identity={}){
    const unitId=identity.unitId||identity.id||dataset.unitId||'unknown';
    const compiled=parseDatasetJson(dataset,'ruleFacts',{required:true,unitId});
    if(!compiled||typeof compiled!=='object'||Array.isArray(compiled))throw new TypeError(`${unitId}: data-rule-facts must contain an object`);
    return {...compiled,...identity,unitId:identity.unitId||identity.id||compiled.unitId||unitId};
  }

  const profileFromDataset=(dataset,identity={},extra={})=>profileFromRecord({...recordFromDataset(dataset,identity),...extra});
  const sorted=value=>[...(value||[])].sort();
  const serializeCandidate=candidate=>({
    unitId:candidate.unitId||'',slug:candidate.slug||'',keywords:sorted(candidate.keywords),intrinsicKeywords:sorted(candidate.intrinsicKeywords),
    abilities:sorted(candidate.abilities),termIds:sorted(candidate.termIds),attached:candidate.attached??null,
    attachmentKnown:candidate.attachmentKnown??null,characterCount:candidate.characterCount??null,warlord:candidate.warlord??null
  });
  const serializeRelation=relation=>({unitId:relation.unitId,keywords:sorted(relation.keywords),removeKeywords:sorted(relation.removeKeywords),characterCount:relation.characterCount??null,maxCharacters:relation.maxCharacters??null,mandatory:Boolean(relation.mandatory)});
  function serializeRuleProfile(profile){
    return {
      id:profile.id||'',unitId:profile.unitId||'',slug:profile.slug||'',keywords:sorted(profile.keywords),intrinsicKeywords:sorted(profile.intrinsicKeywords),
      abilities:sorted(profile.abilities),termIds:sorted(profile.termIds||profile.ids),epic:Boolean(profile.epic),deadlyDemise:Boolean(profile.deadlyDemise),
      attached:profile.attached??null,attachmentKnown:profile.attachmentKnown??null,formationRequired:Boolean(profile.formationRequired),characterCount:profile.characterCount??null,twoCharacters:profile.twoCharacters??null,warlord:profile.warlord??null,
      relations:Object.fromEntries(relationKeys.map(key=>[key,[...(profile.relations?.[key]||[])].map(serializeRelation).sort((a,b)=>a.unitId.localeCompare(b.unitId))])),
      candidates:[...(profile.candidates||[])].map(serializeCandidate).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))
    };
  }

  const compatibilityConditions=result=>[...new Set(result?.conditions?.length?result.conditions:result?.condition?[result.condition]:result?.reasons||[])];
  function staticCompatible(result){
    if(result?.state==='match')return true;
    if(result?.state!=='conditional')return false;
    const conditions=compatibilityConditions(result);
    if(conditions.some(condition=>staticRosterConditions.has(condition)))return false;
    return conditions.length>0||Boolean(result.matchedRoleIds?.length);
  }
  const filterStaticCompatible=rules=>(rules||[]).filter(staticCompatible);

  const api=Object.freeze({normalizeKeyword,textFromDomLike,parseDatasetJson,profileFromRecord,recordFromDataset,profileFromDataset,serializeRuleProfile,staticCompatible,filterStaticCompatible});
  root.WHRuleFacts=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
}(typeof window==='undefined'?globalThis:window));
