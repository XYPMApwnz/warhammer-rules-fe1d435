import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const booksRoot=path.join(root,'books');
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(booksRoot,'shared','related-rules-matcher.js'),'utf8'),sandbox);
const matcher=sandbox.window.WHRelatedRules;
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const attr=(tag,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
const keywordSet=values=>new Set(values.map(value=>ruleFacts.normalizeKeyword(value)).filter(Boolean));

function profilesFrom(reader){
  const starts=[...reader.matchAll(/<article class="unit-card\b[^>]*>/g)];
  return starts.map((match,index)=>{
    const tag=match[0];
    return ruleFacts.profileFromDataset({
      ruleFacts:decode(attr(tag,'data-rule-facts')),
      keywords:decode(attr(tag,'data-keywords')),
      relatedCandidates:decode(attr(tag,'data-related-candidates'))
    },{id:attr(tag,'id')});
  });
}

const sorted=values=>[...values].sort();
const supportedSubjects=new Set(['unit','model','objective']);
const friendlyRoles=rule=>(rule.roles||rule.targets||[]).filter(role=>role.side==='friendly'||role.side==='either');
const selectorOf=role=>role.selector||role;
const restrictive=rule=>friendlyRoles(rule).some(role=>{
  const selector=selectorOf(role);
  return ['unitIds','units','anyKeywords','any','noneKeywords','none','alternatives','allAbilities'].some(key=>selector[key]?.length)||
    selector.attached!=null||selector.minCharacters!=null||selector.warlord!=null||
    (selector.allKeywords||selector.all||[]).some(keyword=>keyword!=='DEATH GUARD');
});

const audited=[];
for(const entry of fs.readdirSync(booksRoot,{withFileTypes:true})){
  if(!entry.isDirectory())continue;
  const bookRoot=path.join(booksRoot,entry.name),configPath=path.join(bookRoot,'book.config.json'),readerPath=path.join(bookRoot,'reader.html');
  if(!fs.existsSync(configPath)||!fs.existsSync(readerPath))continue;
  const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
  if(!config.sources?.relatedRules)continue;
  const pack=JSON.parse(fs.readFileSync(path.join(bookRoot,config.sources.factionPack),'utf8'));
  const codexParity=config.sources.codexParity?JSON.parse(fs.readFileSync(path.join(bookRoot,config.sources.codexParity),'utf8')):{detachments:[]};
  const relatedContract=JSON.parse(fs.readFileSync(path.join(bookRoot,config.sources.relatedRules),'utf8')),eligibility=relatedContract.stratagems||{},enhancementEligibility=relatedContract.enhancements||{};
  const reader=fs.readFileSync(readerPath,'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8');
  if(config.includeCoreStratagems)assert.equal(related.indexOf('<section class="related-detachment related-core"'),related.lastIndexOf('<section class="related-detachment'),'Core Stratagems must follow faction Stratagems');
  const normalizeRuleId=id=>String(id||'').replace(/^stratagem-/,'');
  const normalizeEnhancementId=id=>String(id||'').replace(/^enhancement-/,'');
  const allDetachments=[...(pack.detachments||[]),...(codexParity.detachments||[])];
  const profiles=profilesFrom(reader),stratagems=allDetachments.flatMap(detachment=>detachment.stratagems||[]);
  const officialIds=stratagems.map(rule=>normalizeRuleId(rule.id)),generatedIds=[...related.matchAll(/<article class="stratagem surface"[^>]*data-rule-id="([^"]+)"/g)].map(match=>normalizeRuleId(match[1])).filter(id=>!id.startsWith('core-stratagem-'));
  const detachmentByRule=new Map(allDetachments.flatMap(detachment=>(detachment.stratagems||[]).map(rule=>[normalizeRuleId(rule.id),detachment.id])));
  const detachmentByEnhancement=new Map(allDetachments.flatMap(detachment=>(detachment.enhancements||[]).map(rule=>[normalizeEnhancementId(rule.id),detachment.id])));
  const applyGrants=(profile,ruleId,detachmentMap=detachmentByRule)=>{
    const grants=relatedContract.keywordGrants?.[String(detachmentMap.get(ruleId)||'').replace(/^detachment-/,'')]||[];
    const applicable=grants.filter(grant=>matcher.matches({v:1,roles:[{id:'grant',side:'friendly',subject:grant.subject||'unit',selector:grant.selector||{}}]},profile));
    const gained=applicable.filter(grant=>!grant.selectionRequired).map(grant=>String(grant.keyword).toUpperCase());
    const conditionalKeywords=new Set(applicable.filter(grant=>grant.selectionRequired).map(grant=>String(grant.keyword).toUpperCase()));
    if(!gained.length&&!conditionalKeywords.size)return profile;
    const candidates=(profile.candidates||[profile]).map(candidate=>({...candidate,keywords:new Set([...(candidate.keywords||profile.keywords),...gained])}));
    return {...profile,keywords:candidates[0].keywords,candidates,conditionalKeywords};
  };
  assert.ok(profiles.length,`${config.id}: no datasheet profiles in generated reader`);
  assert.equal(new Set(officialIds).size,officialIds.length,`${config.id}: duplicate official Stratagem id`);
  assert.deepEqual(sorted(Object.keys(eligibility).map(normalizeRuleId)),sorted(officialIds),`${config.id}: explicit eligibility IDs do not exactly match official Stratagem IDs`);
  assert.deepEqual(sorted(generatedIds),sorted(officialIds),`${config.id}: generated Related Rules cards do not exactly match official Stratagem IDs`);
  let negatives=0;
  for(const stratagem of stratagems){
    const ruleId=normalizeRuleId(stratagem.id),rule=eligibility[stratagem.id]||eligibility[ruleId];
    assert.ok(rule,`${config.id}/${stratagem.title}: missing explicit eligibility`);
    assert.ok(friendlyRoles(rule).length,`${config.id}/${stratagem.title}: no friendly target role`);
    for(const role of rule.roles||rule.targets||[])assert.ok(supportedSubjects.has(role.subject||'unit'),`${config.id}/${stratagem.title}: unsupported subject ${role.subject}`);
    assert.ok(profiles.some(profile=>matcher.matches(rule,applyGrants(profile,ruleId))),`${config.id}/${stratagem.title}: no real datasheet, granted-keyword or Attached-unit candidate satisfies its target`);
    if(restrictive(rule)&&profiles.some(profile=>!matcher.matches(rule,applyGrants(profile,ruleId))))negatives++;
    if(stratagem.restrictions){
      const card=[...related.matchAll(new RegExp(`<article class="stratagem surface"[^>]*data-rule-id="${stratagem.id}"[\\s\\S]*?<\\/article>`,'g'))][0]?.[0]||'';
      assert.equal((card.match(/data-source-field="restrictions"/g)||[]).length,1,`${config.id}/${stratagem.title}: RESTRICTIONS must be rendered exactly once`);
      const renderedText=card.replace(/<[^>]+>/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/\s+/g,' ');
      assert.ok(renderedText.includes(stratagem.restrictions.replace(/\s+/g,' ')),`${config.id}/${stratagem.title}: rendered RESTRICTIONS differ from source`);
    }
  }
  const relatedEnhancementIds=[...related.matchAll(/<article class="enhancement surface"[^>]*data-rule-id="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(new Set(Object.keys(enhancementEligibility).map(normalizeEnhancementId)),new Set(relatedEnhancementIds.map(normalizeEnhancementId)),`${config.id}: explicit Enhancement eligibility does not match generated Related Rules inventory`);
  for(const [id,rule] of Object.entries(enhancementEligibility)){
    const isOwnerContract=Boolean(rule.owner),isUpgrade=(rule.tags||[]).includes('UPGRADE');
    const roles=isOwnerContract?[{...rule.owner,side:'friendly'}]:(rule.roles||rule.targets||[]);
    assert.ok(roles.some(role=>(role.side==='friendly'||role.side==='either')&&supportedSubjects.has(role.subject||'unit')),`${config.id}/${id}: no supported Enhancement owner contract`);
    const selectors=roles.map(role=>role.selector||role);
    if(isOwnerContract){
      assert.equal(rule.owner.subject,isUpgrade?'unit':'model',`${config.id}/${id}: incorrect owner subject`);
      if(!isUpgrade)assert.ok(selectors.every(selector=>(selector.noneKeywords||[]).includes('EPIC HERO')),`${config.id}/${id}: standard Enhancement does not explicitly exclude Epic Heroes`);
    }
    assert.ok(selectors.flatMap(selector=>selector.unitIds||[]).every(unitId=>profiles.some(profile=>profile.unitId===unitId)),`${config.id}/${id}: Enhancement references an unknown datasheet`);
    const enhancementId=normalizeEnhancementId(id);
    assert.ok(profiles.some(profile=>matcher.matches(rule,applyGrants(profile,enhancementId,detachmentByEnhancement))),`${config.id}/${id}: no real datasheet satisfies its Enhancement owner contract`);
    if(isOwnerContract&&!isUpgrade)assert.ok(profiles.filter(profile=>profile.keywords.has('EPIC HERO')).every(profile=>!matcher.matches(rule,applyGrants(profile,enhancementId,detachmentByEnhancement))),`${config.id}/${id}: standard Enhancement is offered to an Epic Hero`);
  }
  audited.push(`${config.title}: ${stratagems.length} Stratagems × ${profiles.length} datasheets; ${negatives} restrictive contracts have real negatives`);
}

const exactContext=(unitId,keywords)=>({unitId,keywords:keywordSet(keywords),intrinsicKeywords:keywordSet(keywords),abilities:new Set()});
assert.equal(matcher.matches({v:1,roles:[{side:'friendly',subject:'unit',selector:{allKeywords:['MONSTER']}}]},exactContext('unit-test',['MONSTROUS'])),false,'keyword substrings must not satisfy exact keyword selectors');
assert.equal(matcher.matches({v:1,roles:[{side:'friendly',subject:'unit',selector:{unitIds:['unit-ork-boy']}}]},exactContext('unit-ork-boyz',['INFANTRY'])),false,'unit-id substrings must not satisfy exact unit selectors');
assert.equal(matcher.match({v:1,roles:[{side:'friendly',subject:'bearer',selector:{allKeywords:['CHARACTER']}}]},exactContext('unit-test',['CHARACTER'])).state,'no-match','unknown subjects must fail closed');
const attachedModel=exactContext('unit-leader',['CHARACTER']);
attachedModel.candidates=[{unitId:'unit-bodyguard',keywords:keywordSet(['CHARACTER','MONSTER']),attached:true}];
assert.equal(matcher.matches({v:1,roles:[{side:'friendly',subject:'model',selector:{allKeywords:['MONSTER']}}]},attachedModel),false,'subject:model must not inherit Attached Unit union keywords');

{
  const dgRoot=path.join(booksRoot,'death-guard'),dgReader=fs.readFileSync(path.join(dgRoot,'reader.html'),'utf8');
  const dgRelated=fs.readFileSync(path.join(dgRoot,'mobile','related-rules.inc'),'utf8');
  const dgData=JSON.parse(fs.readFileSync(path.join(dgRoot,'content','death-guard-rules.en.json'),'utf8'));
  const dgSandbox={window:{WHRelatedRules:matcher,WHRuleFacts:ruleFacts}};
  vm.runInNewContext(fs.readFileSync(path.join(dgRoot,'scripts','related-rules.js'),'utf8'),dgSandbox);
  const api=dgSandbox.window.DGRelatedRules,eligibility=api.eligibilityByRule,profiles=profilesFrom(dgReader);
  const cardIds=[...dgRelated.matchAll(/<article class="stratagem[^>]*" id="([^"]+)"/g)].map(match=>match[1]);
  const coreIds=cardIds.filter(id=>id.startsWith('core-stratagem-'));
  const factionIds=dgData.sections.flatMap(section=>(section.subsections||[]).flatMap(subsection=>(subsection.blocks||[]).filter(block=>block.type==='rule').map(block=>block.id)));
  const detachmentByRule=new Map(dgData.sections.flatMap(section=>(section.subsections||[]).flatMap(subsection=>(subsection.blocks||[]).filter(block=>block.type==='rule').map(block=>[block.id,section.id.replace(/^detachment-/,'')]))));
  assert.equal(coreIds.length,10,'Death Guard must expose all 10 Core Stratagem cards');
  assert.equal(dgRelated.indexOf('<section class="related-detachment related-core"'),dgRelated.lastIndexOf('<section class="related-detachment'),'Death Guard Core Stratagems must follow faction Stratagems');
  assert.equal(factionIds.length,45,'Death Guard must expose all 45 faction Stratagems');
  assert.equal(new Set(cardIds).size,55,'Death Guard Stratagem card IDs must be unique');
  assert.deepEqual(sorted(Object.keys(eligibility)),sorted(cardIds),'Death Guard contracts must map every rendered Core and faction Stratagem exactly once');
  assert.deepEqual(sorted(cardIds.filter(id=>!id.startsWith('core-stratagem-'))),sorted(factionIds),'Death Guard rendered faction Stratagem IDs must match the structured book source');
  const expanded=profiles.map(profile=>{
    const candidates=(profile.candidates||[profile]).flatMap(candidate=>candidate.keywords?.has('CHARACTER')?[candidate,{...candidate,warlord:true}]:[candidate]);
    return {...profile,candidates};
  });
  const withGrants=(profile,ruleId)=>{
    const grants=api.grantedKeywords(profile.unitId.replace(/^unit-/,''),[detachmentByRule.get(ruleId)]),gained=grants.map(grant=>grant.title.toUpperCase());
    if(!gained.length)return profile;
    const candidates=(profile.candidates||[profile]).map(candidate=>({...candidate,keywords:new Set([...(candidate.keywords||profile.keywords),...gained])}));
    return {...profile,keywords:candidates[0].keywords,candidates};
  };
  let negativeCount=0;
  for(const id of cardIds){
    const rule=eligibility[id];
    for(const role of rule.roles||rule.targets||[])assert.ok(supportedSubjects.has(role.subject||'unit'),`Death Guard/${id}: unsupported subject ${role.subject}`);
    assert.ok(expanded.some(profile=>matcher.matches(rule,withGrants(profile,id))),`Death Guard/${id}: no real datasheet or Attached-unit candidate satisfies its contract`);
    if(restrictive(rule)&&expanded.some(profile=>!matcher.matches(rule,withGrants(profile,id))))negativeCount++;
  }
  const profile=id=>expanded.find(item=>item.unitId===id),single=(item,predicate)=>({...item,...(item.candidates||[item]).find(predicate),candidates:undefined});
  assert.equal(matcher.matches(eligibility['core-stratagem-crushing-impact'],profile('unit-biologus-putrifier')),false,'Biologus Putrifier must not receive a Monster/Vehicle Stratagem');
  assert.equal(matcher.matches(eligibility['stratagem-putrid-detonation'],profile('unit-biologus-putrifier')),false,'Biologus Putrifier must not receive Putrid Detonation');
  assert.equal(matcher.matches(eligibility['core-stratagem-crushing-impact'],profile('unit-mortarion')),true,'Mortarion must receive Monster/Vehicle Stratagems');
  assert.equal(matcher.matches(eligibility['core-stratagem-heroic-intervention'],profile('unit-chaos-rhino')),false,'a non-Walker Vehicle must not receive Heroic Intervention');
  assert.equal(matcher.matches(eligibility['core-stratagem-heroic-intervention'],profile('unit-helbrute')),true,'a Walker Vehicle must receive Heroic Intervention');
  const biologus=profile('unit-biologus-putrifier');
  const unattached=single(biologus,candidate=>candidate.attached===false&&candidate.warlord!==true);
  const oneCharacter=single(biologus,candidate=>candidate.attached===true&&candidate.characterCount===1&&candidate.warlord!==true);
  const twoCharacters=single(biologus,candidate=>candidate.attached===true&&candidate.characterCount===2&&candidate.warlord!==true);
  assert.equal(matcher.matches(eligibility['stratagem-blessings-of-filth'],unattached),false,'an unattached Character must not receive an Attached-unit Stratagem');
  assert.equal(matcher.matches(eligibility['stratagem-blessings-of-filth'],oneCharacter),true,'an Attached unit must receive an Attached-unit Stratagem');
  assert.equal(matcher.matches(eligibility['stratagem-rabid-infusion'],oneCharacter),false,'a single-Character Attached unit must not receive a two-Character Stratagem');
  assert.equal(matcher.matches(eligibility['stratagem-rabid-infusion'],twoCharacters),true,'a real two-Character Attached unit must receive its Stratagem');
  console.log(`PASS  Death Guard: 45 faction + 10 Core Stratagems × ${profiles.length} datasheets; ${negativeCount} restrictive contracts have real negatives`);
}

{
  const mechanicusRelated=fs.readFileSync(path.join(booksRoot,'adeptus-mechanicus','mobile','related-rules.inc'),'utf8');
  assert.equal(mechanicusRelated.indexOf('<section class="related-detachment related-core"'),mechanicusRelated.lastIndexOf('<section class="related-detachment'),'Adeptus Mechanicus Core Stratagems must follow faction Stratagems');
}

assert.ok(audited.length,'No generated army book exposes an explicit eligibility contract');
for(const line of audited)console.log(`PASS  ${line}`);
console.log(`Army-book eligibility contract passed for ${audited.length} generated book(s).`);
