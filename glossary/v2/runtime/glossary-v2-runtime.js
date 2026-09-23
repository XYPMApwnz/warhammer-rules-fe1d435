(function(root){
  'use strict';

  const data=root.WH40K_GLOSSARY_V2_INDEX;
  if(!data||data.schema!=='wh40k-glossary-v2-index/v1')throw new Error('Glossary V2 index is unavailable or unsupported.');

  const entries=data.entries;
  const byId=new Map(entries.map(entry=>[entry.id,entry]));
  const byKey=new Map();
  const normalize=value=>String(value||'').replace(/[\u2018\u2019]/g,"'").replace(/[\u2013\u2014]/g,'-').replace(/\s+/g,' ').trim().toLocaleLowerCase();
  const addKey=(key,entry)=>{if(!key)return;const values=byKey.get(key)||[];if(!values.includes(entry))values.push(entry);byKey.set(key,values);};
  for(const entry of entries){addKey(entry.sourceOwner?.canonicalId,entry);for(const alias of entry.aliases||[])addKey(alias,entry);}

  const text=value=>typeof value==='string'?value.trim():'';
  const collectContent=value=>{
    if(!Array.isArray(value))return'';
    return value.flatMap(item=>{
      if(typeof item==='string')return[item];
      if(!item||typeof item!=='object')return[];
      if(item.text)return[item.text];
      if(Array.isArray(item.rows))return[...(item.columns||[]),...item.rows.flatMap(row=>Array.isArray(row)?row:[row.label,...(row.cells||[])])].filter(Boolean);
      return[];
    }).filter(Boolean).join('\n');
  };
  function definitionOf(entry){
    const facts=entry.facts||{};
    for(const field of ['semanticContent','text','full','definition','ruleText','rulesText','answer','description']){const value=text(facts[field]);if(value)return value;}
    const content=collectContent(facts.content);if(content)return content;
    const blocks=collectContent(facts.blocks);if(blocks)return blocks;
    if(facts.ruleBody){
      if(typeof facts.ruleBody==='string')return facts.ruleBody;
      const body=facts.ruleBody;
      const values=[body.flavorText,body.ruleText,body.text,body.scoring,body.timing,body.cap,body.objectiveAction].flatMap(value=>Array.isArray(value)?value:[value]).filter(value=>typeof value==='string'&&value.trim());
      if(values.length)return values.join('\n');
      return JSON.stringify(body,null,2);
    }
    if(entry.recordType==='STRATAGEM')return [['WHEN',facts.when],['TARGET',facts.target],['EFFECT',facts.effect],['RESTRICTIONS',facts.restrictions]].filter(([,value])=>text(value)).map(([label,value])=>`${label}: ${value}`).join('\n');
    if(entry.recordType==='WEAPON_PROFILE')return `${facts.mode==='ranged'?'Ranged':'Melee'} · ${facts.range||facts.Range||''} · A ${facts.a||facts.A||''} · ${facts.bs||facts.BS||facts.ws||facts.WS||facts.skill||''} · S ${facts.s||facts.S||''} · AP ${facts.ap||facts.AP||''} · D ${facts.d||facts.D||''}${facts.abilities||facts.Abilities?` · ${facts.abilities||facts.Abilities}`:''}`;
    if(entry.recordType==='UNIT')return [facts.composition,(facts.keywords||[]).length?`Keywords: ${facts.keywords.join(', ')}`:''].filter(Boolean).join('\n');
    if(Array.isArray(facts.requirements))return facts.requirements.map(item=>typeof item==='string'?item:item?.type||JSON.stringify(item)).join('\n');
    for(const field of ['effect','summary','label']){const value=text(facts[field]);if(value)return value;}
    return'';
  }
  const summaryOf=(entry,definition)=>text(entry.presentation?.editorialSummary?.text)||definition.split(/\n+/).find(Boolean)||entry.label;
  function structuredOf(entry){
    const facts=entry.facts||{};
    if(entry.recordType==='WEAPON_PROFILE'){
      const ranged=(facts.mode||'').toLowerCase()==='ranged'||String(facts.range||facts.Range||'').toLowerCase()!=='melee';
      return{weapon:{Range:facts.range??facts.Range??'',A:facts.a??facts.A??'',[ranged?'BS':'WS']:facts.skill??facts.bs??facts.BS??facts.ws??facts.WS??'',S:facts.s??facts.S??'',AP:facts.ap??facts.AP??'',D:facts.d??facts.D??'',Abilities:facts.abilities??facts.Abilities??''}};
    }
    if(entry.recordType==='UNIT'){
      const first=Array.isArray(facts.profiles)?facts.profiles[0]:null,stats=first?.stats||facts.stats;
      if(stats)return{statline:stats};
    }
    return{};
  }
  const scopeOf=entry=>entry.domain==='CORE'?'global':entry.domain==='MISSIONS'?'missions':entry.sourceOwner?.bookId||entry.contexts?.[0]?.effectiveBookId||entry.domain.toLocaleLowerCase();
  const kindOf=entry=>entry.recordType.toLocaleLowerCase().replaceAll('_','-');
  const sourceOf=entry=>{const source=entry.provenance?.base||entry.provenance||{};return{documentId:source.sourceId||source.profileId||entry.sourceOwner?.interface||entry.domain,revision:source.sourceVersion||source.sourceDate||entry.currentness?.asOf||entry.currentness?.cutoff||'',locator:source.sourceLocator?.partition||source.contentLocator||entry.sourceOwner?.canonicalId||''};};
  const relatedOf=entry=>[...new Set((entry.canonicalReferences||[]).map(reference=>reference.id).filter(id=>byId.has(id)))];
  const articleCache=new Map();
  function article(entry){
    let result=articleCache.get(entry.id);if(result)return result;
    const definition=definitionOf(entry),summary=summaryOf(entry,definition),kind=kindOf(entry),scope=scopeOf(entry),structured=structuredOf(entry),related=relatedOf(entry);
    result=Object.freeze({...entry,canonicalId:entry.sourceOwner.canonicalId,title:Object.freeze({en:entry.label}),summary:Object.freeze({en:summary}),definition:Object.freeze({en:definition}),kind,scope,edition:'11E',status:entry.currentness?.state||entry.currentness?.publicationState||'CURRENT',structured:Object.freeze(structured),related:Object.freeze(related),references:Object.freeze({}),canonicalSource:Object.freeze(sourceOf(entry)),presentation:entry.recordType==='WEAPON_PROFILE'?'profile':'article',matchLabels:Object.freeze(entry.presentation?.preferredMatchLabels||[])});
    articleCache.set(entry.id,result);return result;
  }
  const bookMatches=(entry,bookId)=>{if(!bookId)return true;if(bookId==='core-rules')return entry.domain==='CORE';if(entry.domain==='CORE')return true;if(entry.domain!=='ARMY')return false;return(entry.contexts||[]).some(context=>context.effectiveBookId===bookId);};
  function candidates(id,{bookId='',parentId='',recordType=''}={}){
    if(byId.has(id))return[byId.get(id)];
    let values=(byKey.get(id)||[]).filter(entry=>bookMatches(entry,bookId));
    if(recordType)values=values.filter(entry=>entry.recordType===recordType);
    if(parentId)values=values.filter(entry=>entry.parent?.canonicalId===parentId||(entry.contexts||[]).some(context=>context.parentUnitId===parentId));
    return values;
  }
  function resolveEntry(id,options={}){const values=candidates(id,options);return values.length===1?values[0]:null;}
  function resolvePreferred(label,{bookId=''}={}){const token=normalize(label),values=entries.filter(entry=>(entry.presentation?.preferredMatchLabels||[]).some(value=>normalize(value)===token)&&bookMatches(entry,bookId));return values.length===1?values[0]:null;}
  function resolveArticle(id,options={}){const entry=resolveEntry(id,options)||resolvePreferred(id,options);return entry?article(entry):null;}
  function flatView(term){return Object.freeze({...term,title:term.title.en,summary:term.summary.en,definition:term.definition.en,glossary:`glossary-${term.id}`});}
  function contextualEntries(bookId){return entries.filter(entry=>bookMatches(entry,bookId));}
  function forBook(bookId){
    const result={},contextual=contextualEntries(bookId);
    for(const entry of contextual)result[entry.id]=flatView(article(entry));
    const keys=new Set(contextual.flatMap(entry=>[entry.sourceOwner?.canonicalId,...(entry.aliases||[])]).filter(Boolean));
    for(const key of keys){const resolved=resolveEntry(key,{bookId});if(resolved)result[key]=result[resolved.id];}
    return Object.freeze(result);
  }
  function linkables(bookId){return Object.freeze(contextualEntries(bookId).map(entry=>Object.freeze({id:entry.id,termId:entry.id,title:entry.label,aliases:Object.freeze(entry.aliases||[]),matchLabels:Object.freeze(entry.presentation?.preferredMatchLabels||[]),owners:Object.freeze([...new Set((entry.contexts||[]).filter(context=>!bookId||context.effectiveBookId===bookId).map(context=>context.parentUnitId).filter(Boolean))])})));}
  function preferredMatches(bookId){const result={};for(const entry of contextualEntries(bookId))for(const label of entry.presentation?.preferredMatchLabels||[]){const resolved=resolvePreferred(label,{bookId});if(resolved?.id===entry.id)result[normalize(label)]=entry.id;}return Object.freeze(result);}
  function bindArmyRoot(container,bookId){
    if(!container)return Object.freeze({bound:0,unresolved:[],ambiguous:[]});
    let bound=0;const unresolved=[],ambiguous=[];
    for(const node of container.querySelectorAll('[data-term]')){
      const original=node.dataset.term;if(byId.has(original))continue;
      const unitId=node.closest('.unit-card')?.id||'',detachmentId=node.closest('.detachment,[data-detachment-id]')?.id||node.closest('[data-detachment-id]')?.dataset.detachmentId||'',profileId=node.closest('[data-roster-profile-id]')?.dataset.rosterProfileId||'',wargearId=node.closest('[data-roster-wargear-ability-id]')?.dataset.rosterWargearAbilityId||'',ruleId=node.closest('[data-rule-id]')?.dataset.ruleId||'';
      const attempts=[profileId&&{id:profileId,options:{bookId,parentId:unitId,recordType:'WEAPON_PROFILE'}},wargearId&&{id:wargearId,options:{bookId,parentId:unitId,recordType:'WARGEAR_ABILITY'}},ruleId&&{id:ruleId,options:{bookId,parentId:detachmentId}},{id:original,options:{bookId,parentId:unitId||detachmentId}},{id:original,options:{bookId}}].filter(Boolean);
      let entry=null;for(const attempt of attempts){entry=resolveEntry(attempt.id,attempt.options);if(entry)break;}
      if(entry){node.dataset.term=entry.id;node.dataset.glossaryV2Source=original;bound++;continue;}
      const possible=candidates(original,{bookId});(possible.length>1?ambiguous:unresolved).push({termId:original,parentId:unitId||detachmentId||null,candidates:possible.map(item=>item.id)});
    }
    return Object.freeze({bound,unresolved:Object.freeze(unresolved),ambiguous:Object.freeze(ambiguous)});
  }

  root.WH40K_GLOSSARY=Object.freeze({schema:data.schema,language:data.language,factualAuthority:false,resolve(id,options){return resolveArticle(id,options)?.id||null;},get(id,options){return resolveArticle(id,options);},resolveView(bookId,id,options={}){const term=resolveArticle(id,{...options,bookId});return term?flatView(term):null;},entries(){return Object.freeze(entries.map(article));},standaloneEntries(){return Object.freeze(entries.filter(entry=>!entry.parent).map(article));},forBook,linkables,preferredMatches,bindArmyRoot,counts:Object.freeze({terms:data.counts.total,standalone:data.counts.standalone,scopedChildren:data.counts.scopedChildren,aliases:[...byKey.keys()].length})});
}(window));
