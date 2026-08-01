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
    return {...profile,keywords:new Set([...profile.keywords,...gained]),conditionalKeywords};
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
  const mechanicusRelated=fs.readFileSync(path.join(booksRoot,'adeptus-mechanicus','mobile','related-rules.inc'),'utf8');
  assert.equal(mechanicusRelated.indexOf('<section class="related-detachment related-core"'),mechanicusRelated.lastIndexOf('<section class="related-detachment'),'Adeptus Mechanicus Core Stratagems must follow faction Stratagems');
}

assert.ok(audited.length,'No generated army book exposes an explicit eligibility contract');
for(const line of audited)console.log(`PASS  ${line}`);
console.log(`Army-book eligibility contract passed for ${audited.length} generated book(s).`);
