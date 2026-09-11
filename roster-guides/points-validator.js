(function(root){
  'use strict';
  const keyword=value=>{
    if(!root.WHRuleFacts)throw new Error('WHRuleFacts is required by roster validation');
    return root.WHRuleFacts.normalizeKeyword(value);
  };
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim();
  const record=value=>Boolean(value&&typeof value==='object'&&!Array.isArray(value));
  const own=(value,key)=>record(value)&&Object.prototype.hasOwnProperty.call(value,key)?value[key]:undefined;
  const safeInteger=(value,minimum=0)=>typeof value==='number'&&Number.isSafeInteger(value)&&value>=minimum;
  const safeAdd=(left,right)=>{if(!safeInteger(left)||!safeInteger(right))return null;const value=left+right;return Number.isSafeInteger(value)?value:null;};
  const catalogFor=faction=>own(root.WH_POINTS_CATALOG,faction);
  const validAssignment=value=>value==null||record(value)&&(own(value,'maxOwners')===undefined||safeInteger(own(value,'maxOwners'),1))&&(own(value,'enhancementChoices')===undefined||safeInteger(own(value,'enhancementChoices'),1));
  const copyMatches=(label,index)=>{
    const text=String(label||'').toLowerCase();
    if(!text.includes('unit'))return true;
    const range=text.match(/(\d+)(?:st|nd|rd|th)?\s*(?:-|–|—|to)\s*(\d+)(?:st|nd|rd|th)?\s+unit/);
    if(range)return index>=Number(range[1])&&index<=Number(range[2]);
    const plus=text.match(/(\d+)(?:st|nd|rd|th)?\s*\+\s+unit/);
    if(plus)return index>=Number(plus[1]);
    const exact=text.match(/(\d+)(?:st|nd|rd|th)?\s+unit/);
    return !exact||index===Number(exact[1]);
  };
  const physicalModelCount=unit=>{
    const models=unit?.models;
    if(models==null||(Array.isArray(models)&&models.length===0)){
      const quantity=unit?.quantity;
      return safeInteger(quantity,1)?quantity:null;
    }
    if(!Array.isArray(models))return null;
    let total=0;
    for(const model of models){
      const quantity=model?.quantity;
      if(!safeInteger(quantity,1))return null;
      total=safeAdd(total,quantity);
      if(total===null)return null;
    }
    return total||null;
  };
  const modelMatches=(label,quantity)=>{const match=String(label||'').match(/(\d+)\s+models?/i);return !match||(Number.isInteger(quantity)&&Number(match[1])===quantity);};
  const loadouts=unit=>{
    if(unit.models!=null&&!Array.isArray(unit.models))return null;
    if(!unit.models?.length){
      if(unit.wargear!=null&&typeof unit.wargear!=='string')return null;
      return unit.wargear?[{quantity:unit.quantity,text:unit.wargear}]:[];
    }
    const rows=[];
    for(const model of unit.models){
      if(!record(model)||!safeInteger(model.quantity,1)||model.loadouts!=null&&!Array.isArray(model.loadouts)||model.wargear!=null&&typeof model.wargear!=='string')return null;
      if(model.loadouts?.length){
        for(const item of model.loadouts){
          if(!record(item)||!safeInteger(item.quantity,1)||typeof item.wargear!=='string')return null;
          rows.push({quantity:item.quantity,text:item.wargear});
        }
      }else if(model.wargear)rows.push({quantity:model.quantity,text:model.wargear});
    }
    return rows;
  };
  const gearCount=(rows,name)=>rows.reduce((total,row)=>normalize(row.text).includes(normalize(name))?safeAdd(total,row.quantity):total,0);
  const enhancementName=value=>{
    const name=record(value)?own(value,'name'):value;
    return typeof name==='string'?name.replace(/\s+[-–—]\s+\d+\s*pts?\s*$/i,'').trim():'';
  };
  const keywords=unit=>new Set((unit?.keywords||[]).map(keyword));
  const grantedKeywords=(faction,detachment,unit)=>faction==='death guard'&&normalize(detachment)==='contagion engines'&&['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(unit?.unitId)?['CONTAGION ENGINE']:[];
  const ownerMatches=(enhancement,unit,faction)=>{
    if(!enhancement.owner||!unit)return false;
    const selector=enhancement.owner.selector||{},unitKeywords=keywords(unit),abilities=new Set([...(unit.abilities||[]),...(unit.termIds||[])].map(normalize));
    grantedKeywords(faction,enhancement.detachment,unit).forEach(keyword=>unitKeywords.add(keyword));
    const matches=selector=>{
      if(selector.alternatives?.length)return selector.alternatives.some(matches);
      if((selector.unitIds||[]).length&&!selector.unitIds.includes(unit.unitId))return false;
      if((selector.allKeywords||[]).some(value=>!unitKeywords.has(keyword(value))))return false;
      if((selector.anyKeywords||[]).length&&!selector.anyKeywords.some(value=>unitKeywords.has(keyword(value))))return false;
      if((selector.noneKeywords||[]).some(value=>unitKeywords.has(keyword(value))))return false;
      if((selector.allAbilities||[]).some(value=>!abilities.has(normalize(value))))return false;
      return true;
    };
    return matches(selector);
  };

function assessEnhancements(roster, faction, catalog=catalogFor(faction)) {
  const enhancements = [], enhancementWarnings = [], unresolved = [];
  const assignments = (roster.enhancements || []).map((input, inputIndex) => ({
    inputIndex, input, catalog: null, assessment: null,
    status: catalog ? 'unresolved' : 'unavailable'
  }));
  if (!catalog) return {
    available: false, assignments, enhancements, enhancementWarnings,
    unresolved: ['Army Book point data is unavailable.'],
    enhancementChoices: 0, enhancementAssignments: 0
  };
  const selectedDetachments = new Set((roster.detachments || [{name: roster.detachment, label: roster.detachment}]).map(item => normalize(item.name || item.label)).filter(Boolean));
  for (const assignment of assignments) {
    const raw = assignment.input, name = enhancementName(raw);
    if (!name) { assignment.status = 'empty'; continue; }
    const entry = own(own(catalog,'enhancements'),normalize(name)), candidates = (Array.isArray(entry) ? entry : [entry]).filter(record), selected = candidates.filter(item => !item.detachment || selectedDetachments.has(normalize(item.detachment)));
    const enhancement = selected.length === 1 ? selected[0] : candidates.length === 1 ? candidates[0] : null;
    if (!record(enhancement)||!safeInteger(own(enhancement,'value'))||typeof own(enhancement,'title')!=='string'||own(enhancement,'id')!=null&&typeof own(enhancement,'id')!=='string'||!validAssignment(own(enhancement,'assignment'))) { unresolved.push(`Enhancement Detachment: ${name}`); continue; }
    const rosterUnit = (roster.units || []).find(unit => unit.id === raw.ownerUnitId), owner = own(own(catalog,'units'),normalize(rosterUnit?.name));
    const sourceCoverage=enhancement.sourceLimited||!enhancement.owner?.selector?'sourceLimited':'verified';
    const sourceMessage=sourceCoverage==='sourceLimited'?'Enhancement source/contract coverage is limited':'';
    let ownerEligibility = 'valid', ownerMessage = '';
    if (raw.ownerStatus !== 'resolved' || !rosterUnit || !owner) { ownerEligibility = 'invalid'; ownerMessage = 'Invalid Enhancement owner'; }
    else if (enhancement.detachment && !selectedDetachments.has(normalize(enhancement.detachment))) { ownerEligibility = 'invalid'; ownerMessage = 'Enhancement is not available in the selected Detachment'; }
    else if (!enhancement.owner?.selector) { ownerEligibility = 'unresolved'; ownerMessage = 'Enhancement owner contract is unavailable'; }
    else if (!ownerMatches(enhancement, owner, faction)) { ownerEligibility = 'invalid'; ownerMessage = keywords(owner).has('EPIC HERO') ? 'Epic Hero cannot receive this Enhancement' : 'Invalid Enhancement owner'; }
    const result = {...raw, id: enhancement.id, name: enhancement.title, currentCost: Number(enhancement.value), text: enhancement.text || '', effect: enhancement.effect || '', tags: enhancement.tags || [], assignment: enhancement.assignment || null, ownerEligibility, ownerMessage, sourceCoverage, sourceMessage};
    assignment.catalog = enhancement;
    assignment.assessment = result;
    assignment.status = 'assessed';
    enhancements.push(result);
    if (ownerMessage) enhancementWarnings.push(`${enhancement.title}: ${ownerMessage}.`);
    if (sourceMessage) enhancementWarnings.push(`${enhancement.title}: ${sourceMessage}.`);
  }
  for (const id of new Set(enhancements.map(item => item.id))) {
    const group = enhancements.filter(item => item.id === id), configuredLimit = group[0].assignment?.maxOwners, limit = configuredLimit===undefined?1:configuredLimit, seen = new Set();
    if(!safeInteger(limit,1)){
      group.forEach(item=>{item.ownerEligibility='invalid';item.ownerMessage='Invalid Enhancement assignment limit';});
      enhancementWarnings.push(`${group[0].name}: Invalid Enhancement assignment limit.`);
      continue;
    }
    group.forEach((item, index) => {
      if (item.ownerUnitId && seen.has(item.ownerUnitId)) {
        item.ownerEligibility = 'invalid'; item.ownerMessage = 'Enhancement is assigned more than once to the same unit';
        enhancementWarnings.push(`${item.name}: ${item.ownerMessage}.`);
      }
      if (item.ownerUnitId) seen.add(item.ownerUnitId);
      if (index >= limit) {
        item.ownerEligibility = 'invalid'; item.ownerMessage = 'Upgrade assignment limit exceeded';
        enhancementWarnings.push(`${item.name}: ${item.ownerMessage} (${group.length}/${limit}).`);
      }
    });
  }
  let enhancementChoices=0;
  for(const id of new Set(enhancements.map(item=>item.id))){
    const configured=enhancements.find(item=>item.id===id)?.assignment?.enhancementChoices,choices=configured===undefined?1:configured,next=safeInteger(choices,1)?safeAdd(enhancementChoices,choices):null;
    if(next===null){enhancementWarnings.push('Invalid Enhancement choice count.');continue;}
    enhancementChoices=next;
  }
  if (enhancementChoices > 3) enhancementWarnings.push(`Enhancement choice limit exceeded (${enhancementChoices}/3).`);
  return {available: true, assignments, enhancements, enhancementWarnings, unresolved, enhancementChoices, enhancementAssignments: enhancements.length};
}

  function check(roster,faction){
    const catalog=catalogFor(faction),unresolved=[],enhancementWarnings=[],detachmentWarnings=[],occurrences=new Map(),enhancements=[];let total=0;
    if(!record(catalog)||!record(own(catalog,'units'))||own(catalog,'enhancements')!==undefined&&!record(own(catalog,'enhancements'))||own(catalog,'detachments')!==undefined&&!record(own(catalog,'detachments')))return{total:null,unresolved:['Army Book point data is unavailable.'],enhancementWarnings,detachmentWarnings};
    if(!record(roster)||!Array.isArray(roster.units)||roster.enhancements!=null&&!Array.isArray(roster.enhancements)||roster.detachments!=null&&!Array.isArray(roster.detachments))return{total:null,unresolved:['Roster point structure is invalid.'],enhancementWarnings,detachmentWarnings};
    for(const unit of roster.units){
      const key=normalize(unit?.name),definition=own(catalog.units,key),index=(occurrences.get(key)||0)+1;occurrences.set(key,index);
      if(!record(unit)||typeof unit.name!=='string'||!safeInteger(unit.quantity,1)||!record(definition)||!Array.isArray(own(definition,'points'))){unresolved.push(`Unit: ${unit?.name||'unknown'}`);continue;}
      const modelCount=physicalModelCount(unit);
      const selectedLoadouts=loadouts(unit),pointRows=definition.points;
      if(modelCount===null||selectedLoadouts===null||pointRows.some(row=>!record(row)||typeof own(row,'label')!=='string'||!safeInteger(own(row,'value')))){unresolved.push(`Unit size or repeat: ${unit.quantity}x ${unit.name}`);continue;}
      const prices=pointRows.filter(row=>copyMatches(row.label,index)&&modelMatches(row.label,modelCount));
      if(prices.length!==1){unresolved.push(`Unit size or repeat: ${unit.quantity}x ${unit.name}`);continue;}
      const wargear=own(definition,'wargear')===undefined?[]:definition.wargear;
      if(!Array.isArray(wargear)||wargear.some(item=>!record(item)||typeof (own(item,'label')??own(item,'name'))!=='string'||!safeInteger(own(item,'value')))){unresolved.push(`Unit points: ${unit.name}`);continue;}
      let unitTotal=prices[0].value;
      for(const item of wargear){
        const count=gearCount(selectedLoadouts,String(item.label||item.name).replace(/^per\s+/i,'')),cost=safeInteger(count)?count*item.value:NaN;
        unitTotal=Number.isSafeInteger(cost)?safeAdd(unitTotal,cost):null;
        if(unitTotal===null)break;
      }
      if(unitTotal===null){unresolved.push(`Unit points: ${unit.name}`);continue;}
      const nextTotal=safeAdd(total,unitTotal);
      if(nextTotal===null){unresolved.push(`Unit points: ${unit.name}`);continue;}
      total=nextTotal;
    }
    const selectedDetachmentNames=[...new Set((roster.detachments||[{name:roster.detachment,label:roster.detachment}]).map(item=>normalize(item?.name||item?.label)).filter(Boolean))];
    const selectedDetachments=new Set(selectedDetachmentNames);
    const detachmentPointLimit=roster.pointsLimit===1000?2:roster.pointsLimit===2000?3:null;
    let detachmentPoints=0;
    for(const name of selectedDetachmentNames){
      const detachment=own(catalog.detachments,name),value=own(detachment,'detachmentPoints');
      if(!record(detachment)||!safeInteger(value)){detachmentWarnings.push(`Detachment Points unavailable: ${name}.`);continue;}
      detachmentPoints=safeAdd(detachmentPoints,value);
      if(detachmentPoints===null){detachmentPoints=0;detachmentWarnings.push(`Detachment Points unavailable: ${name}.`);break;}
    }
    if(detachmentPointLimit!==null&&detachmentPoints>detachmentPointLimit)detachmentWarnings.push(`Detachment Points limit exceeded (${detachmentPoints}/${detachmentPointLimit} DP).`);
    const assessment=assessEnhancements(roster,faction,catalog);
    unresolved.push(...assessment.unresolved);enhancementWarnings.push(...assessment.enhancementWarnings);enhancements.push(...assessment.enhancements);
    for(const row of assessment.assignments)if(row.catalog){const nextTotal=safeAdd(total,row.catalog.value);if(nextTotal===null){unresolved.push(`Enhancement points: ${row.catalog.title}`);break;}total=nextTotal;}
    const enhancementChoices=assessment.enhancementChoices;
    const declared=safeInteger(roster.declared)?roster.declared:0,unitLineTotal=safeInteger(roster.unitLineTotal??roster.calculated)?roster.unitLineTotal??roster.calculated:0;
    return{total,unresolved,enhancements,enhancementWarnings,enhancementChoices,enhancementAssignments:enhancements.length,detachmentPoints,detachmentPointLimit,detachmentWarnings,difference:total-declared,unitLineTotal,exportMatches:declared===unitLineTotal};
  }
  root.WHRosterPoints=Object.freeze({check,normalize,assessEnhancements});
}(typeof window==='undefined'?globalThis:window));
