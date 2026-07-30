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
    return [id,{id,slug:id.replace(/^unit-/,''),keywords:unit.keywords||[],abilities:names,epic:(unit.keywords||[]).some(value=>titleKey(value)==='epic hero'),deadlyDemise:abilities.some(item=>deadly(item.title)||deadly(item.text))}];
  }));
}

function mechanicusSource(){
  const official=read('books/adeptus-mechanicus/content/adeptus-mechanicus-rules.en.json');
  const extracted=read('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-datasheets.en.json');
  const wargear=new Map(read('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-wargear.en.json').units.map(unit=>[titleKey(unit.title),unit]));
  const officialById=new Map(official.datasheets.map(unit=>[unit.id,unit])),units=[];
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
  for(const unit of book.sections.filter(section=>section.kind==='unit')){
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

const desktopProfiles=new Map();let profiles=0,mobileProfiles=0;
for(const book of Object.keys(sources)){
  const html=fs.readFileSync(path.join(root,'books',book,'reader.html'),'utf8');
  assert.match(html,/shared\/rule-facts\.js\?v=3/,`${book}: shared facts runtime is absent`);
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
    assert.deepEqual(compiled.candidates,JSON.parse(decode(attr(tag,'data-related-candidates'))),`${book}/${unitId}: current candidate serialization parity`);
    if(serialized.abilities.length)assert.ok(serialized.termIds.length,`${book}/${unitId}: source abilities require rendered term IDs`);
    desktopProfiles.set(`${book}/${unitId}`,serialized);seen.add(unitId);profiles+=1;
  }
  assert.deepEqual([...seen].sort(),[...expected.keys()].sort(),`${book}: complete desktop source inventory`);

  const mobileDir=path.join(root,'books',book,'mobile');
  for(const [unitId,source] of expected){
    const file=path.join(mobileDir,`${source.slug}.html`),mobile=fs.readFileSync(file,'utf8');
    const tag=(mobile.match(/<article class="unit-card\b[^>]*>/)||[])[0];
    assert.ok(tag,`${book}/${unitId}: Phone Mode unit card is absent`);
    const actual=ruleFacts.serializeRuleProfile(ruleFacts.profileFromDataset({ruleFacts:decode(attr(tag,'data-rule-facts'))},{id:unitId}));
    assert.deepEqual(actual,desktopProfiles.get(`${book}/${unitId}`),`${book}/${unitId}: Phone Mode profile parity`);
    mobileProfiles+=1;
  }
}

const fixtureRecord={unitId:'unit-fixture',keywords:['  Death   Guard ','vehicle'],abilities:['Deadly Demise'],termIds:['keyword-death-guard'],candidates:[{unitId:'unit-attached',keywords:['Death Guard','Character'],abilities:['Leader'],termIds:['core-leader']}]};
const source=structuredClone(fixtureRecord),profileA=ruleFacts.profileFromRecord(fixtureRecord),profileB=ruleFacts.profileFromRecord(fixtureRecord);
profileA.keywords.add('MUTATED');profileA.candidates[0].keywords.add('MUTATED');profileA.termIds.add('mutated');
assert.equal(profileB.keywords.has('MUTATED'),false);assert.equal(profileB.candidates[0].keywords.has('MUTATED'),false);assert.equal(profileB.termIds.has('mutated'),false);assert.deepEqual(fixtureRecord,source);

assert.throws(()=>ruleFacts.profileFromDataset({keywords:'DEATH GUARD',relatedCandidates:'[]'},{id:'unit-legacy'}),/missing data-rule-facts/);
assert.deepEqual([...ruleFacts.profileFromLegacyDataset({keywords:'DEATH GUARD',relatedCandidates:'[]'},{id:'unit-legacy'}).keywords],['DEATH GUARD']);
assert.throws(()=>ruleFacts.profileFromDataset({ruleFacts:'{bad'},{id:'unit-bad'}),/unit-bad: malformed data-rule-facts/);
assert.throws(()=>ruleFacts.profileFromDataset({ruleFacts:'[]'},{id:'unit-array'}),/data-rule-facts must contain an object/);

const validatorSource=fs.readFileSync(path.join(root,'roster-guides','points-validator.js'),'utf8');
assert.match(validatorSource,/WHRuleFacts\.normalizeKeyword/,'Roster runtime must use shared keyword canonicalization');
const rosterSandbox={window:{WHRuleFacts:ruleFacts,WH_POINTS_CATALOG:{'t au empire':{units:{fixture:{unitId:'unit-fixture',keywords:['T’AU EMPIRE'],points:[{label:'1 model',value:10}],wargear:[]}},enhancements:{test:{id:'test',title:'Test',value:0,detachment:'Test',owner:{selector:{allKeywords:["T'AU EMPIRE"]}},assignment:{maxOwners:1,enhancementChoices:1}}}}}}};
vm.runInNewContext(validatorSource,rosterSandbox,{filename:'points-validator.js'});
const rosterResult=rosterSandbox.window.WHRosterPoints.check({declared:10,units:[{id:'instance-1',name:'Fixture',quantity:1}],detachments:[{name:'Test'}],enhancements:[{name:'Test',ownerUnitId:'instance-1',ownerStatus:'resolved'}]},'t au empire');
assert.equal(rosterResult.enhancements[0].ownerEligibility,'valid','Roster runtime must treat typographic and ASCII apostrophes equally');

const dgSource=fs.readFileSync(path.join(root,'books','death-guard','scripts','related-rules.js'),'utf8');
assert.doesNotMatch(dgSource,/normalize(?:d|Keyword)?\s*\(\s*\{/);
const dgSandbox={window:{WHRuleFacts:ruleFacts,WHRelatedRules:{enabled:false}}};
vm.runInNewContext(dgSource,dgSandbox,{filename:'death-guard-related-rules.js'});
const grantLabels=(slug,detachment)=>Array.from(dgSandbox.window.DGRelatedRules.grantedKeywords(slug,[detachment]),grant=>ruleFacts.normalizeKeyword(grant.title));
assert.deepEqual(grantLabels('poxwalkers','shamblerot-vectorium'),['BATTLELINE']);
for(const slug of ['foetid-bloat-drone','helbrute'])assert.deepEqual(grantLabels(slug,'contagion-engines'),['CONTAGION ENGINE']);
assert.deepEqual(grantLabels('foetid-bloat-drone','virulent-vectorium'),[]);
console.log(`PASS source facts parity: ${profiles} desktop + ${mobileProfiles} Phone Mode datasheets`);
