(function(root){
  'use strict';
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim();
  const copyMatches=(label,index)=>{
    const text=String(label||'').toLowerCase();
    if(!text.includes('unit'))return true;
    const range=text.match(/(\d+)(?:st|nd|rd|th)?\s*[-–—]\s*(\d+)(?:st|nd|rd|th)?\s+unit/);
    if(range)return index>=Number(range[1])&&index<=Number(range[2]);
    const plus=text.match(/(\d+)(?:st|nd|rd|th)?\+\s+unit/);
    if(plus)return index>=Number(plus[1]);
    const exact=text.match(/(\d+)(?:st|nd|rd|th)?\s+unit/);
    return !exact||index===Number(exact[1]);
  };
  const modelMatches=(label,quantity)=>{const match=String(label||'').match(/(\d+)\s+models?/i);return !match||Number(match[1])===quantity;};
  const loadouts=unit=>{
    if(!unit.models?.length)return unit.wargear?[{quantity:unit.quantity||1,text:unit.wargear}]:[];
    return unit.models.flatMap(model=>model.loadouts?.length?model.loadouts.map(item=>({quantity:item.quantity||1,text:item.wargear})):model.wargear?[{quantity:model.quantity||1,text:model.wargear}]:[]);
  };
  const gearCount=(unit,name)=>loadouts(unit).reduce((total,row)=>total+(normalize(row.text).includes(normalize(name))?row.quantity:0),0);
  const enhancementName=value=>typeof value==='object'?value.name:String(value||'').replace(/\s*\([^)]*\)\s*$/,'').replace(/\s+[-–—]\s+\d+\s*pts?\s*$/i,'').trim();
  const keywords=unit=>new Set((unit?.keywords||[]).map(value=>String(value).toUpperCase()));
  const grantedKeywords=(faction,detachment,unit)=>faction==='death guard'&&normalize(detachment)==='contagion engines'&&['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(unit?.unitId)?['CONTAGION ENGINE']:[];
  const ownerMatches=(enhancement,unit,faction)=>{
    if(!enhancement.owner||!unit)return false;
    const selector=enhancement.owner.selector||{},unitKeywords=keywords(unit);
    grantedKeywords(faction,enhancement.detachment,unit).forEach(keyword=>unitKeywords.add(keyword));
    if((selector.unitIds||[]).length&&!(selector.unitIds||[]).includes(unit.unitId))return false;
    if((selector.allKeywords||[]).some(keyword=>!unitKeywords.has(String(keyword).toUpperCase())))return false;
    if((selector.anyKeywords||[]).length&&!(selector.anyKeywords||[]).some(keyword=>unitKeywords.has(String(keyword).toUpperCase())))return false;
    if((selector.noneKeywords||[]).some(keyword=>unitKeywords.has(String(keyword).toUpperCase())))return false;
    return true;
  };

  function check(roster,faction){
    const catalog=root.WH_POINTS_CATALOG?.[faction],unresolved=[],enhancementWarnings=[],occurrences=new Map(),enhancements=[];let total=0;
    if(!catalog)return{total:null,unresolved:['Army Book point data is unavailable.'],enhancementWarnings};
    for(const unit of roster.units){
      const key=normalize(unit.name),definition=catalog.units[key],index=(occurrences.get(key)||0)+1;occurrences.set(key,index);
      if(!definition){unresolved.push(`Unit: ${unit.name}`);continue;}
      const prices=definition.points.filter(row=>copyMatches(row.label,index)&&modelMatches(row.label,unit.quantity));
      if(prices.length!==1){unresolved.push(`Unit size or repeat: ${unit.quantity}x ${unit.name}`);continue;}
      total+=Number(prices[0].value);
      for(const item of definition.wargear||[])total+=gearCount(unit,String(item.label).replace(/^per\s+/i,''))*Number(item.value);
    }
    const selectedDetachments=new Set((roster.detachments||[{name:roster.detachment,label:roster.detachment}]).flatMap(item=>[item.name,item.label]).map(normalize).filter(Boolean));
    for(const raw of roster.enhancements||[]){
      const name=enhancementName(raw);if(!name)continue;
      const enhancement=catalog.enhancements[normalize(name)];
      if(!enhancement){unresolved.push(`Enhancement: ${name}`);continue;}
      total+=Number(enhancement.value);
      const rosterUnit=(roster.units||[]).find(unit=>unit.id===raw.ownerUnitId),owner=catalog.units[normalize(rosterUnit?.name)];
      let ownerEligibility='valid',ownerMessage='';
      if(raw.ownerStatus!=='resolved'||!rosterUnit||!owner){ownerEligibility='invalid';ownerMessage='Invalid Enhancement owner';}
      else if(enhancement.detachment&&!selectedDetachments.has(normalize(enhancement.detachment))){ownerEligibility='invalid';ownerMessage='Enhancement is not available in the selected Detachment';}
      else if(!ownerMatches(enhancement,owner,faction)){ownerEligibility='invalid';ownerMessage=keywords(owner).has('EPIC HERO')?'Epic Hero cannot receive this Enhancement':'Invalid Enhancement owner';}
      const result={...raw,id:enhancement.id,name:enhancement.title,currentCost:Number(enhancement.value),text:enhancement.text||'',effect:enhancement.effect||'',tags:enhancement.tags||[],assignment:enhancement.assignment||null,ownerEligibility,ownerMessage};
      enhancements.push(result);
      if(ownerMessage)enhancementWarnings.push(`${enhancement.title}: ${ownerMessage}.`);
    }
    for(const id of new Set(enhancements.map(item=>item.id))){
      const group=enhancements.filter(item=>item.id===id),limit=Number(group[0].assignment?.maxOwners||1),seen=new Set();
      group.forEach((item,index)=>{
        if(item.ownerUnitId&&seen.has(item.ownerUnitId)){item.ownerEligibility='invalid';item.ownerMessage='Enhancement is assigned more than once to the same unit';enhancementWarnings.push(`${item.name}: ${item.ownerMessage}.`);}
        if(item.ownerUnitId)seen.add(item.ownerUnitId);
        if(index>=limit){item.ownerEligibility='invalid';item.ownerMessage='Upgrade assignment limit exceeded';enhancementWarnings.push(`${item.name}: ${item.ownerMessage} (${group.length}/${limit}).`);}
      });
    }
    const enhancementChoices=[...new Set(enhancements.map(item=>item.id))].reduce((sum,id)=>sum+Number(enhancements.find(item=>item.id===id)?.assignment?.enhancementChoices||1),0);
    if(enhancementChoices>3)enhancementWarnings.push(`Enhancement choice limit exceeded (${enhancementChoices}/3).`);
    return{total,unresolved,enhancements,enhancementWarnings,enhancementChoices,enhancementAssignments:enhancements.length,difference:total-Number(roster.declared||0),unitLineTotal:Number(roster.unitLineTotal??roster.calculated??0),exportMatches:Number(roster.declared||0)===Number(roster.unitLineTotal??roster.calculated??0)};
  }
  root.WHRosterPoints=Object.freeze({check,normalize});
}(typeof window==='undefined'?globalThis:window));
