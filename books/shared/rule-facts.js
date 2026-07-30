(function(root){
  'use strict';

  const apostrophes=/[\u2018\u2019\u02bc\uff07]/g;
  const dashes=/[\u2010\u2011\u2012\u2013\u2014\u2212\ufe58\ufe63\uff0d]/g;
  const list=value=>value instanceof Set?[...value]:Array.isArray(value)?[...value]:null;

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
    return {
      ...candidate,
      unitId:candidate.unitId||candidate.id||'',
      slug:candidate.slug||String(candidate.unitId||candidate.id||'').replace(/^unit-/,''),
      keywords,
      intrinsicKeywords,
      abilities:normalizedSet(candidate.abilities||[],`candidates[${index}].abilities`),
      termIds:stringSet(candidate.termIds||candidate.ids||[],`candidates[${index}].termIds`)
    };
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
      epic:record.epic==null?intrinsicKeywords.has('EPIC HERO'):Boolean(record.epic),
      deadlyDemise:record.deadlyDemise==null?false:Boolean(record.deadlyDemise),
      attached:record.attached??null,
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
    const compiled=parseDatasetJson(dataset,'ruleFacts',{defaultValue:null,unitId});
    if(compiled!=null){
      if(!compiled||typeof compiled!=='object'||Array.isArray(compiled))throw new TypeError(`${unitId}: data-rule-facts must contain an object`);
      return {...compiled,...identity,unitId:identity.unitId||identity.id||compiled.unitId||unitId};
    }
    if(dataset.keywords==null||dataset.keywords==='')throw new Error(`${unitId}: missing data-keywords`);
    if(typeof dataset.keywords!=='string')throw new TypeError(`${unitId}: data-keywords must be a string`);
    if(!dataset.keywords.trim())throw new Error(`${unitId}: empty data-keywords`);
    const related=parseDatasetJson(dataset,'relatedCandidates',{defaultValue:[],unitId});
    if(!Array.isArray(related))throw new TypeError(`${unitId}: data-related-candidates must contain an array`);
    return {...identity,unitId:identity.unitId||identity.id||dataset.unitId||'',keywords:dataset.keywords.split('|'),candidates:related};
  }

  const profileFromDataset=(dataset,identity={},extra={})=>profileFromRecord({...recordFromDataset(dataset,identity),...extra});
  const sorted=value=>[...(value||[])].sort();
  const serializeCandidate=candidate=>({
    unitId:candidate.unitId||'',slug:candidate.slug||'',keywords:sorted(candidate.keywords),intrinsicKeywords:sorted(candidate.intrinsicKeywords),
    abilities:sorted(candidate.abilities),termIds:sorted(candidate.termIds),attached:candidate.attached??null,
    attachmentKnown:candidate.attachmentKnown??null,characterCount:candidate.characterCount??null,warlord:candidate.warlord??null
  });
  function serializeRuleProfile(profile){
    return {
      id:profile.id||'',unitId:profile.unitId||'',slug:profile.slug||'',keywords:sorted(profile.keywords),intrinsicKeywords:sorted(profile.intrinsicKeywords),
      abilities:sorted(profile.abilities),termIds:sorted(profile.termIds||profile.ids),epic:Boolean(profile.epic),deadlyDemise:Boolean(profile.deadlyDemise),
      attached:profile.attached??null,twoCharacters:profile.twoCharacters??null,warlord:profile.warlord??null,
      candidates:[...(profile.candidates||[])].map(serializeCandidate).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))
    };
  }

  const api=Object.freeze({normalizeKeyword,textFromDomLike,parseDatasetJson,profileFromRecord,recordFromDataset,profileFromDataset,serializeRuleProfile});
  root.WHRuleFacts=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
}(typeof window==='undefined'?globalThis:window));
