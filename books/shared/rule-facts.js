(function(root){
  'use strict';
  const normalize=value=>String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  const values=value=>value instanceof Set?[...value]:Array.isArray(value)?value:[];
  const keywords=value=>new Set(values(value).map(normalize).filter(Boolean));
  const candidates=value=>values(value).map(candidate=>({...candidate,keywords:keywords(candidate.keywords)}));

  function profileFromRecord(record={}){
    const unitId=record.unitId||record.id||'';
    const intrinsicKeywords=keywords(record.intrinsicKeywords||record.keywords);
    const related=candidates(record.candidates);
    return {
      ...record,
      unitId,
      id:record.id||unitId,
      slug:record.slug||unitId.replace(/^unit-/,''),
      keywords:keywords(record.keywords),
      intrinsicKeywords,
      candidates:related.length?related:undefined,
      abilities:keywords(record.abilities),
      epic:intrinsicKeywords.has('EPIC HERO')
    };
  }

  function recordFromDataset(dataset={},identity={}){
    let related=[];
    try{related=JSON.parse(dataset.relatedCandidates||'[]');}catch{}
    return {
      ...identity,
      unitId:identity.unitId||identity.id||dataset.unitId||'',
      keywords:String(dataset.keywords||'').split('|'),
      candidates:related
    };
  }

  const profileFromDataset=(dataset,identity,extra)=>profileFromRecord({...recordFromDataset(dataset,identity),...extra});
  const api=Object.freeze({normalize,profileFromRecord,recordFromDataset,profileFromDataset});
  root.WHRuleFacts=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
}(typeof window==='undefined'?globalThis:window));
