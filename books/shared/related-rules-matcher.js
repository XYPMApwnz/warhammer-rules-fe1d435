(function(root){
  'use strict';

  const supportedSubjects=new Set(['unit','model','objective']);
  const normalize=value=>String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  const set=values=>new Set([...(values||[])].map(normalize).filter(Boolean));
  const selectorOf=target=>({
    unitIds:target.units||[],
    allKeywords:target.all||[],
    anyKeywords:target.any||[],
    noneKeywords:target.none||[],
    alternatives:target.alternatives||[],
    attached:target.attached,
    minCharacters:target.minCharacters,
    warlord:target.warlord,
    allAbilities:target.allAbilities||[]
  });
  function canonical(value){
    if(value?.roles)return value;
    if(value?.owner)return {...value,roles:[{
      id:'owner',side:'friendly',subject:value.owner.subject,count:1,selector:value.owner.selector||{}
    }]};
    return {v:1,roles:(value?.targets||[]).map((target,index)=>({
      id:`target-${index+1}`,side:target.side||'friendly',subject:target.subject||'unit',count:target.count||1,
      selector:selectorOf(target)
    })),conditions:value?.conditions||[]};
  }
  function keywordResult(selector,keywords,context){
    const conditionalKeywords=context.conditionalKeywords||set();
    const ids=selector.unitIds||[];
    if(ids.length&&!ids.includes(context.unitId))return 'no-match';
    if((selector.noneKeywords||[]).some(value=>keywords.has(normalize(value))))return 'no-match';
    let conditional=false;
    for(const value of selector.allKeywords||[]){
      const keyword=normalize(value);
      if(!keywords.has(keyword)){
        if(conditionalKeywords.has(keyword))conditional=true;
        else return 'no-match';
      }
    }
    if((selector.anyKeywords||[]).length&&!(selector.anyKeywords||[]).some(value=>keywords.has(normalize(value)))){
      if((selector.anyKeywords||[]).some(value=>conditionalKeywords.has(normalize(value))))conditional=true;
      else return 'no-match';
    }
    if((selector.allAbilities||[]).some(value=>!context.abilities?.has(normalize(value))))return 'no-match';
    if(selector.attached!=null){
      if(context.attachmentKnown===false)return 'conditional';
      if(Boolean(context.attached)!==selector.attached)return 'no-match';
    }
    if(selector.minCharacters!=null){
      if(context.characterCount==null)return 'conditional';
      if(context.characterCount<selector.minCharacters)return 'no-match';
    }
    if(selector.warlord!=null){
      if(context.warlord==null)return 'conditional';
      if(Boolean(context.warlord)!==selector.warlord)return 'no-match';
    }
    return conditional?'conditional':'match';
  }
  function selectorResult(selector,context,subject){
    const choices=selector.alternatives?.length?selector.alternatives:[selector];
    const candidates=subject==='model'
      ?(context.members||[{keywords:context.intrinsicKeywords||context.keywords}]).map(member=>({...context,...member,unitId:member.unitId||context.unitId,keywords:member.keywords||context.intrinsicKeywords}))
      :(context.candidates||[context]);
    let conditional=false;
    for(const choice of choices)for(const raw of candidates){
      const candidate={...context,...raw};
      const result=keywordResult(choice,candidate.keywords||candidate.effectiveKeywords||set(),candidate);
      if(result==='match')return 'match';
      if(result==='conditional')conditional=true;
    }
    return conditional?'conditional':'no-match';
  }
  function match(eligibility,context){
    const schema=canonical(eligibility),roles=schema.roles.filter(role=>role.side==='friendly'||role.side==='either');
    let conditional=false;
    for(const role of roles){
      const subject=role.subject||'unit';
      if(!supportedSubjects.has(subject))return {state:'no-match',matchedRoleIds:[],reasons:[`Unsupported subject: ${subject}`]};
      if(subject==='objective')continue;
      const result=selectorResult(role.selector||{},context,subject);
      if(result==='match')return {state:schema.conditions?.length?'conditional':'match',matchedRoleIds:[role.id],reasons:schema.conditions||[]};
      if(result==='conditional')conditional=true;
    }
    return {state:conditional?'conditional':'no-match',matchedRoleIds:[],reasons:[]};
  }
  root.WHRelatedRules=Object.freeze({normalize,canonical,match,matches:(eligibility,context)=>match(eligibility,context).state!=='no-match'});
}(typeof window==='undefined'?globalThis:window));
