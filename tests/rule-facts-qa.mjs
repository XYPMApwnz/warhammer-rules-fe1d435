import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const decode=value=>String(value||'').replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const attr=(tag,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
const inventory=layer=>[...(layer.datasheets||[]),...(layer.imperialArmour||[]),...(layer.legends||[])];
const titleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const deadly=value=>/\bdeadly demise\b/i.test(String(value||''));
const abilityText=ability=>ability.text||[ability.openingText,...(ability.options||[]).map(option=>`${option.title}: ${option.text}`)].filter(Boolean).join('\n\n');
const coreNames=text=>String(text||'').split(',').map(value=>value.trim().replace(/\.$/,'')).filter(Boolean).map(value=>deadly(value)?'DEADLY DEMISE':value);
const normalized=value=>[...new Set(value.map(ruleFacts.normalizeKeyword))].sort();

function genericSource(book){
  const config=read(`books/${book}/book.config.json`),codex=read(`books/${book}/${config.sources.codexDatasheets}`);
  const units=new Map();
  for(const dependency of config.dependencies||[]){
    const dependencyConfig=read(`books/${dependency}/book.config.json`);
    for(const unit of inventory(read(`books/${dependency}/${dependencyConfig.sources.codexDatasheets}`)))units.set(unit.id,unit);
  }
  for(const unit of inventory(codex))units.set(unit.id,unit);
  return new Map([...units].map(([id,unit])=>{
    const abilities=[...(unit.abilities||[]),...(unit.wargearAbilities||[])];
    const names=abilities.map(item=>deadly(item.title)?'DEADLY DEMISE':item.title);
    return [id,{id,slug:id.replace(/^unit-/,''),title:unit.title,keywords:unit.keywords||[],abilities:names,relations:unit.relations||{},epic:(unit.keywords||[]).some(value=>titleKey(value)==='epic hero'),deadlyDemise:abilities.some(item=>deadly(item.title)||deadly(item.text))}];
  }));
}

function mechanicusSource(){
  const official=read('books/adeptus-mechanicus/content/adeptus-mechanicus-rules.en.json');
  const extracted=read('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-datasheets.en.json');
  const wargear=new Map(read('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-wargear.en.json').units.map(unit=>[titleKey(unit.title),unit]));
  const officialById=new Map(official.datasheets.filter(unit=>unit.status!=='Warhammer Legends').map(unit=>[unit.id,unit])),units=[];
  for(const unit of extracted.datasheets){
    const exact=officialById.get(unit.id);
    if(!exact){units.push(wargear.has(titleKey(unit.title))?{...unit,...wargear.get(titleKey(unit.title))}:unit);continue;}
    officialById.delete(unit.id);
    const extractedWargear=new Map((unit.wargearAbilities||[]).map(item=>[titleKey(item.title),item]));
    const officialWargear=(exact.abilities||[]).filter(item=>extractedWargear.has(titleKey(item.title)));
    const abilities=(exact.abilities||[]).filter(item=>!extractedWargear.has(titleKey(item.title)));
    if(!abilities.some(item=>item.title==='Doctrina Imperatives'))abilities.unshift({title:'Doctrina Imperatives',text:'This unit has the Doctrina Imperatives Faction ability.'});
    const wargearAbilities=[...extractedWargear.values()].map(item=>officialWargear.find(candidate=>titleKey(candidate.title)===titleKey(item.title))||item);
    units.push({...unit,...exact,abilities,wargearAbilities,category:unit.category});
  }
  units.push(...officialById.values());
  return new Map(units.map(unit=>{
    const abilities=[...(unit.abilities||[]),...(unit.wargearAbilities||[])];
    const names=abilities.flatMap(item=>/^core$/i.test(item.title)?coreNames(abilityText(item)):[deadly(item.title)?'DEADLY DEMISE':item.title]);
    return [unit.id,{id:unit.id,slug:unit.id.replace(/^unit-/,''),keywords:unit.keywords,abilities:names,epic:unit.keywords.includes('Epic Hero'),deadlyDemise:abilities.some(item=>deadly(item.title)||deadly(abilityText(item)))}];
  }));
}

function deathGuardSource(){
  const book=read('books/death-guard/content/death-guard-rules.en.json'),result=new Map();
  for(const unit of book.sections.filter(section=>section.kind==='unit'&&section.local!==false)){
    const keywordText=(unit.subsections||[]).find(section=>section.title==='Keywords')?.blocks?.map(block=>block.text||'').join(' ')||'';
    const intrinsic=(keywordText.match(/Keywords:\s*(.*?)\.\s*Faction Keywords:/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
    const faction=(keywordText.match(/Faction Keywords:\s*([^.]*)/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
    const blocks=(unit.subsections||[]).filter(section=>section.title==='Abilities').flatMap(section=>section.blocks||[]);
    const names=blocks.flatMap(block=>/^(?:core|faction)$/i.test(block.title||'')?coreNames(block.text):[block.title].filter(Boolean));
    result.set(unit.id,{id:unit.id,slug:unit.id.replace(/^unit-/,''),keywords:[...new Set([...intrinsic,...faction])],abilities:names,epic:[...intrinsic,...faction].some(value=>titleKey(value)==='epic hero'),deadlyDemise:blocks.some(block=>deadly(block.title)||deadly(block.text))});
  }
  return result;
}

const sources={
  'death-guard':deathGuardSource(),
  'adeptus-mechanicus':mechanicusSource(),
  tyranids:genericSource('tyranids'),
  'tau-empire':genericSource('tau-empire')
};

assert.equal(ruleFacts.normalizeKeyword('  death   guard '),'DEATH GUARD');
assert.equal(ruleFacts.normalizeKeyword("T'AU EMPIRE"),ruleFacts.normalizeKeyword('T’AU EMPIRE'));
assert.equal(ruleFacts.normalizeKeyword('FOETID BLOAT‑DRONE'),'FOETID BLOAT-DRONE');
assert.equal(ruleFacts.normalizeKeyword('DEATH\u00a0GUARD'),'DEATH GUARD');
assert.throws(()=>ruleFacts.normalizeKeyword({textContent:'DEATH GUARD'}),TypeError);
assert.throws(()=>ruleFacts.normalizeKeyword(null),TypeError);
assert.equal(ruleFacts.textFromDomLike({textContent:'Death Guard'}),'Death Guard');
assert.throws(()=>ruleFacts.textFromDomLike({value:'Death Guard'}),TypeError);

const desktopProfiles=new Map();let profiles=0,compatibilityRoutes=0;
for(const book of Object.keys(sources)){
  const html=fs.readFileSync(path.join(root,'books',book,'reader.html'),'utf8');
  assert.match(html,/shared\/rule-facts\.js\?v=\d+/,`${book}: shared facts runtime is absent`);
  const expected=sources[book],seen=new Set();
  for(const tag of html.match(/<article class="unit-card\b[^>]*>/g)||[]){
    const unitId=attr(tag,'id'),compiled=JSON.parse(decode(attr(tag,'data-rule-facts'))),source=expected.get(unitId);
    assert.ok(source,`${book}/${unitId}: source record is absent`);
    const profile=ruleFacts.profileFromDataset({ruleFacts:decode(attr(tag,'data-rule-facts'))},{id:unitId});
    const serialized=ruleFacts.serializeRuleProfile(profile);
    assert.equal(serialized.id,source.id,`${book}/${unitId}: source id parity`);
    assert.equal(serialized.slug,source.slug,`${book}/${unitId}: source slug parity`);
    assert.deepEqual(serialized.keywords,normalized(source.keywords),`${book}/${unitId}: source keyword parity`);
    assert.deepEqual(serialized.intrinsicKeywords,normalized(source.keywords),`${book}/${unitId}: source intrinsic keyword parity`);
    assert.deepEqual(serialized.abilities,normalized(source.abilities),`${book}/${unitId}: source ability parity`);
    assert.equal(serialized.epic,source.epic,`${book}/${unitId}: source Epic Hero parity`);
    assert.equal(serialized.deadlyDemise,source.deadlyDemise,`${book}/${unitId}: source Deadly Demise parity`);
    assert.equal(compiled.candidates,undefined,`${book}/${unitId}: compiled candidates must be absent`);
    assert.equal(attr(tag,'data-related-candidates'),'',`${book}/${unitId}: legacy candidate attribute must be absent`);
    if(serialized.abilities.length)assert.ok(serialized.termIds.length,`${book}/${unitId}: source abilities require rendered term IDs`);
    desktopProfiles.set(`${book}/${unitId}`,serialized);seen.add(unitId);profiles+=1;
  }
  assert.deepEqual([...seen].sort(),[...expected.keys()].sort(),`${book}: complete desktop source inventory`);

  const mobileDir=path.join(root,'books',book,'mobile');
  for(const [unitId,source] of expected){
    const file=path.join(mobileDir,`${source.slug}.html`),mobile=fs.readFileSync(file,'utf8');
    assert.match(mobile,/data-canonical-reader="\.\.\/reader\.html"/,`${book}/${unitId}: compatibility route lacks canonical reader handoff`);
    assert.match(mobile,new RegExp(`data-canonical-target="${unitId}"`),`${book}/${unitId}: compatibility route lacks exact canonical target`);
    assert.match(mobile,/mobile-route-redirect\.js\?v=1/,`${book}/${unitId}: compatibility route lacks redirect runtime`);
    assert.doesNotMatch(mobile,/<(?:article|section)\b|\bunit-card\b|\bdata-rule-facts\b/i,`${book}/${unitId}: compatibility route contains copied book content`);
    compatibilityRoutes+=1;
  }
}

const inverseRelation={canLead:'canBeLedBy',canSupport:'canBeSupportedBy',canBeLedBy:'canLead',canBeSupportedBy:'canSupport'};
for(const [address,profile] of desktopProfiles)for(const [key,relations] of Object.entries(profile.relations))for(const relation of relations){
  const book=address.split('/')[0],target=desktopProfiles.get(`${book}/${relation.unitId}`);
  assert.ok(target,`${address}: ${key} target ${relation.unitId} is absent`);
  assert.deepEqual(relation.keywords,target.intrinsicKeywords,`${address}: ${key} target facts differ`);
  assert.ok(target.relations[inverseRelation[key]].some(item=>item.unitId===profile.unitId),`${address}: ${key} is not reciprocal`);
}
for(const book of ['tyranids','tau-empire']){
  const byTitle=new Map([...sources[book].values()].map(unit=>[titleKey(unit.title),unit.id]));
  for(const sourceUnit of sources[book].values())for(const [sourceKey,compiledKey] of [['leader','canLead'],['support','canSupport']]){
    const expected=(sourceUnit.relations?.[sourceKey]||[]).map(title=>byTitle.get(titleKey(title))).filter(Boolean).sort();
    const actual=desktopProfiles.get(`${book}/${sourceUnit.id}`).relations[compiledKey].map(item=>item.unitId).sort();
    assert.deepEqual(actual,expected,`${book}/${sourceUnit.id}: source ${sourceKey} relation parity`);
  }
}
const lockedRelations=read('tests/fixtures/relation-inventory.json');
for(const book of ['death-guard','adeptus-mechanicus']){
  const actual={};
  for(const [address,profile] of desktopProfiles)if(address.startsWith(`${book}/`)&&(profile.relations.canLead.length||profile.relations.canSupport.length))actual[profile.unitId]={
    leader:profile.relations.canLead.map(item=>item.unitId),
    support:profile.relations.canSupport.map(item=>item.unitId)
  };
  const expected=Object.fromEntries(Object.entries(lockedRelations[book]).filter(([unitId])=>sources[book].has(unitId)).map(([unitId,relations])=>[unitId,{
    leader:relations.leader.filter(target=>sources[book].has(target)),
    support:relations.support.filter(target=>sources[book].has(target))
  }]));
  assert.deepEqual(actual,expected,`${book}: complete outgoing relation inventory`);
}
assert.deepEqual(desktopProfiles.get('tau-empire/unit-commander-in-coldstar-battlesuit').relations.canLead.map(item=>item.unitId),['unit-crisis-fireknife-battlesuits','unit-crisis-starscythe-battlesuits','unit-crisis-sunforge-battlesuits']);
assert.ok(desktopProfiles.get('death-guard/unit-biologus-putrifier').relations.canSupport.some(item=>item.unitId==='unit-plague-marines'));
const datasmithRelation=desktopProfiles.get('adeptus-mechanicus/unit-cybernetica-datasmith').relations.canSupport.find(item=>item.unitId==='unit-kastelan-robots');
assert.equal(datasmithRelation?.mandatory,true);assert.deepEqual(datasmithRelation?.removeKeywords,['INFANTRY']);

const fixtureRecord={unitId:'unit-fixture',keywords:['  Death   Guard ','vehicle'],abilities:['Deadly Demise'],termIds:['keyword-death-guard'],relations:{canLead:[{unitId:'unit-attached',keywords:['Death Guard','Character'],characterCount:1,maxCharacters:1}],canSupport:[],canBeLedBy:[],canBeSupportedBy:[]}};
const source=structuredClone(fixtureRecord),profileA=ruleFacts.profileFromRecord(fixtureRecord),profileB=ruleFacts.profileFromRecord(fixtureRecord);
profileA.keywords.add('MUTATED');profileA.relations.canLead[0].keywords.add('MUTATED');profileA.termIds.add('mutated');
assert.equal(profileB.keywords.has('MUTATED'),false);assert.equal(profileB.relations.canLead[0].keywords.has('MUTATED'),false);assert.equal(profileB.termIds.has('mutated'),false);assert.deepEqual(fixtureRecord,source);

assert.throws(()=>ruleFacts.profileFromDataset({keywords:'DEATH GUARD',relatedCandidates:'[]'},{id:'unit-legacy'}),/missing data-rule-facts/);
assert.throws(()=>ruleFacts.profileFromDataset({ruleFacts:'{bad'},{id:'unit-bad'}),/unit-bad: malformed data-rule-facts/);
assert.throws(()=>ruleFacts.profileFromDataset({ruleFacts:'[]'},{id:'unit-array'}),/data-rule-facts must contain an object/);

const validatorSource=fs.readFileSync(path.join(root,'roster-guides','points-validator.js'),'utf8');
assert.match(validatorSource,/WHRuleFacts\.normalizeKeyword/,'Roster runtime must use shared keyword canonicalization');
const rosterSandbox={window:{WHRuleFacts:ruleFacts,WH_POINTS_CATALOG:{'t au empire':{units:{fixture:{unitId:'unit-fixture',keywords:['T’AU EMPIRE'],points:[{label:'1 model',value:10}],wargear:[]}},enhancements:{test:{id:'test',title:'Test',value:0,detachment:'Test',owner:{selector:{allKeywords:["T'AU EMPIRE"]}},assignment:{maxOwners:1,enhancementChoices:1}}}}}}};
vm.runInNewContext(validatorSource,rosterSandbox,{filename:'points-validator.js'});
const rosterResult=rosterSandbox.window.WHRosterPoints.check({declared:10,units:[{id:'instance-1',name:'Fixture',quantity:1}],detachments:[{name:'Test'}],enhancements:[{name:'Test',ownerUnitId:'instance-1',ownerStatus:'resolved'}]},'t au empire');
assert.equal(rosterResult.enhancements[0].ownerEligibility,'valid','Roster runtime must treat typographic and ASCII apostrophes equally');

const matcherSource=fs.readFileSync(path.join(root,'books','shared','related-rules-matcher.js'),'utf8'),matcherSandbox={window:{}};
vm.runInNewContext(matcherSource,matcherSandbox,{filename:'related-rules-matcher.js'});
const matcher=matcherSandbox.window.WHRelatedRules,unitRole=selector=>({v:1,roles:[{id:'unit',side:'friendly',subject:'unit',selector}]});
const possible=ruleFacts.profileFromRecord({...fixtureRecord,attached:null,attachmentKnown:false,characterCount:0});
assert.equal(matcher.match(unitRole({allKeywords:['CHARACTER']}),possible).state,'conditional');
assert.equal(matcher.match(unitRole({allKeywords:['CHARACTER'],attached:true}),possible).state,'conditional');
assert.equal(matcher.match(unitRole({attached:false}),possible).state,'conditional');
assert.equal(matcher.match(unitRole({noneKeywords:['CHARACTER']}),possible).state,'conditional','A possible Leader must make a negative keyword selector conditional');
const removable=ruleFacts.profileFromRecord({unitId:'unit-infantry',keywords:['INFANTRY'],relations:{canLead:[{unitId:'unit-partner',keywords:['CHARACTER'],removeKeywords:['INFANTRY']} ]}});
assert.equal(matcher.match(unitRole({allKeywords:['INFANTRY']}),removable).state,'conditional','A possible formation that removes a required keyword must remain conditional');
assert.equal(matcher.match({v:1,roles:[{id:'model',side:'friendly',subject:'model',selector:{allKeywords:['CHARACTER']}}]},possible).state,'no-match');
const upgrade={v:1,tags:['UPGRADE'],owner:{subject:'unit',selector:{unitIds:['unit-attached']}}};
assert.equal(matcher.match(upgrade,possible).state,'no-match','Enhancement owners must ignore relation expansion');
assert.equal(matcher.match(unitRole({unitIds:['unit-attached']}),possible).state,'conditional','Stratagem unit targets may use a possible Attached Unit');
const confirmed=ruleFacts.profileFromRecord({unitId:'unit-fixture',keywords:['DEATH GUARD'],candidates:[{unitId:'unit-attached',keywords:['DEATH GUARD','CHARACTER'],attached:true,attachmentKnown:true,characterCount:1}]});
assert.equal(matcher.match(unitRole({allKeywords:['CHARACTER'],attached:true}),confirmed).state,'match');
const mandatory=ruleFacts.profileFromRecord({unitId:'unit-datasmith',keywords:['ADEPTUS MECHANICUS','INFANTRY','CHARACTER'],attached:true,attachmentKnown:true,formationRequired:true,characterCount:1,relations:{canSupport:[{unitId:'unit-kastelan',keywords:['ADEPTUS MECHANICUS','VEHICLE'],removeKeywords:['INFANTRY'],mandatory:true,characterCount:0,maxCharacters:1}]}});
assert.equal(matcher.match(unitRole({allKeywords:['ADEPTUS MECHANICUS','VEHICLE']}),mandatory).state,'match');
assert.equal(matcher.match(unitRole({allKeywords:['ADEPTUS MECHANICUS','INFANTRY']}),mandatory).state,'no-match');
const mandatoryReverse=ruleFacts.profileFromRecord({unitId:'unit-kastelan',keywords:['ADEPTUS MECHANICUS','VEHICLE','WALKER'],formationRequired:true,relations:{canBeSupportedBy:[{unitId:'unit-datasmith',keywords:['ADEPTUS MECHANICUS','INFANTRY','CHARACTER','TECH-PRIEST'],removeKeywords:['INFANTRY'],mandatory:true,characterCount:1,maxCharacters:1}]}});
for(const keyword of ['VEHICLE','WALKER','TECH-PRIEST'])assert.equal(matcher.match(unitRole({allKeywords:[keyword]}),mandatoryReverse).state,'match',`Kastelan perspective loses ${keyword}`);
assert.equal(matcher.match(unitRole({allKeywords:['INFANTRY']}),mandatoryReverse).state,'no-match','Kastelan perspective restores removed INFANTRY');
console.log(`PASS source facts parity: ${profiles} canonical datasheets + ${compatibilityRoutes} content-free compatibility routes`);
