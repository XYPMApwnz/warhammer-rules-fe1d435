import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const shared=fs.readFileSync(path.join(root,'books/shared/roster-entities.js'),'utf8');
const context={};vm.runInNewContext(shared,context,{filename:'roster-entities.js'});
const entities=context.WHRosterEntities;
const glossaryContext={};glossaryContext.window=glossaryContext;
vm.runInNewContext(fs.readFileSync(path.join(root,'glossary/generated/glossary.en.js'),'utf8'),glossaryContext,{filename:'glossary.en.js'});
const failures=[];
const assert=(ok,message)=>{if(!ok)failures.push(message);};
const walk=(value,visit)=>{
  if(Array.isArray(value))return value.forEach(item=>walk(item,visit));
  if(!value||typeof value!=='object')return;
  visit(value);Object.values(value).forEach(item=>walk(item,visit));
};

const supported=fs.readdirSync(path.join(root,'books'),{withFileTypes:true})
  .filter(entry=>{
    if(!entry.isDirectory())return false;
    const bookRoot=path.join(root,'books',entry.name);
    if(fs.existsSync(path.join(bookRoot,'scripts','roster-filter.js')))return true;
    const configPath=path.join(bookRoot,'book.config.json');
    return fs.existsSync(configPath)&&JSON.parse(fs.readFileSync(configPath,'utf8')).rosterSupport===true;
  })
  .map(entry=>entry.name);

for(const bookId of supported){
  const bookRoot=path.join(root,'books',bookId);
  if(bookId==='adeptus-mechanicus'){
    const readerPath=path.join(bookRoot,'reader.html');
    const reader=fs.readFileSync(readerPath,'utf8');
    const points=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','adeptus-mechanicus-points.en.json'),'utf8'));
    const codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','adeptus-mechanicus-codex-datasheets.en.json'),'utf8'));
    assert(points.units.length===34,'adeptus-mechanicus: points catalog is incomplete');
    assert(points.enhancements.length===34,'adeptus-mechanicus: Enhancement catalog is incomplete');
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    const enhancementTitles=new Set([...reader.matchAll(/data-enhancement-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    codex.datasheets.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`adeptus-mechanicus: unit ${unit.title} is absent from Roster Guide`));
    points.enhancements.forEach(item=>assert(enhancementTitles.has(entities.normalize(item.title)),`adeptus-mechanicus: Enhancement ${item.title} is absent from related rules`));
    const compatibleRuntimePath=path.join(bookRoot,'scripts','compatible-rules-runtime.mjs');
    const desktopApp=fs.readFileSync(path.join(bookRoot,'scripts','app.js'),'utf8');
    const phoneApp=fs.readFileSync(path.join(bookRoot,'mobile','mobile.js'),'utf8');
    assert(
      /\.\/scripts\/app\.js\?v=\d+/.test(reader)
      &&fs.existsSync(compatibleRuntimePath)
      &&/\.\/compatible-rules-runtime\.mjs\?v=\d+/.test(desktopApp)
      &&/\.\.\/scripts\/compatible-rules-runtime\.mjs\?v=\d+/.test(phoneApp)
      &&desktopApp.includes('related-rules-trigger')
      &&desktopApp.includes('related-rules-layer')
      &&phoneApp.includes('relatedRulesContent')
      &&!/(WHRelatedRules|AMRelatedRules)/.test(`${desktopApp}\n${phoneApp}`),
      'adeptus-mechanicus: canonical matrix-backed Compatible Rules runtime or UI is absent'
    );
    assert(fs.existsSync(path.join(bookRoot,'mobile','related-rules.inc')),'adeptus-mechanicus: Phone Mode related rules are absent');
    console.log(`PASS  adeptus-mechanicus: ${points.units.length} units, ${points.enhancements.length} Enhancements, desktop/iPad + Phone Mode`);
    continue;
  }
  if(bookId==='tyranids'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8'),points=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tyranids-points.en.json'),'utf8')),codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tyranids-codex-datasheets.en.json'),'utf8'));
    const units=[...codex.datasheets,...codex.imperialArmour,...codex.legends],unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1]))),enhancementTitles=new Set([...related.matchAll(/data-enhancement-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    assert(points.units.length===50,'tyranids: points catalog is incomplete');assert(points.enhancements.length===34,'tyranids: Enhancement catalog is incomplete');units.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`tyranids: unit ${unit.title} is absent from Roster Guide`));points.enhancements.forEach(item=>assert(enhancementTitles.has(entities.normalize(item.title)),`tyranids: Enhancement ${item.title} is absent from related rules`));
    const desktopRoster=fs.readFileSync(path.join(bookRoot,'scripts','roster-filter.js'),'utf8'),phoneRoster=fs.readFileSync(path.join(bookRoot,'mobile','mobile.js'),'utf8');
    assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader)&&/\.\/scripts\/app\.js\?v=\d+/.test(reader),'tyranids: roster or matrix controller is absent');assert(fs.existsSync(path.join(bookRoot,'scripts','compatible-rules-runtime.mjs')),'tyranids: matrix runtime is absent');
    assert(desktopRoster.includes("match[1].toLowerCase()==='xenos'")&&phoneRoster.includes("match[1].toLowerCase()==='xenos'"),'tyranids: desktop and Phone faction normalization do not share the correct Xenos parent contract');
    console.log(`PASS  tyranids: ${points.units.length} units, ${points.enhancements.length} Enhancements, desktop/iPad + Phone Mode`);continue;
  }
  if(bookId==='tau-empire'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8');
    const related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8');
    const points=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tau-empire-points.en.json'),'utf8'));
    const codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tau-empire-codex-datasheets.en.json'),'utf8'));
    const factionPack=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tau-empire-faction-pack.en.json'),'utf8'));
    const parity=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','tau-empire-codex-parity.en.json'),'utf8'));
    const enhancementRules=[...factionPack.detachments,...parity.detachments].flatMap(detachment=>detachment.enhancements||[]);
    const rosterDataContext={window:{}};rosterDataContext.window=rosterDataContext;
    vm.runInNewContext(fs.readFileSync(path.join(bookRoot,'scripts','roster-data.js'),'utf8'),rosterDataContext,{filename:'tau-roster-data.js'});
    const rosterCatalog=rosterDataContext.WH_BOOK_ROSTER_ENHANCEMENTS;
    const units=[...codex.datasheets,...codex.imperialArmour,...codex.legends];
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    assert(points.units.length===39,'tau-empire: points catalog is incomplete');
    assert(points.enhancements.length===23,'tau-empire: Enhancement catalog is incomplete');
    units.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`tau-empire: unit ${unit.title} is absent from Roster Guide`));
    points.enhancements.forEach(item=>{
      const rule=enhancementRules.find(rule=>entities.normalize(rule.title)===entities.normalize(item.title));
      assert(rule&&related.includes(`data-rule-id="${rule.id}"`),`tau-empire: Enhancement ${item.title} is absent from related rules`);
      const rosterRule=rosterCatalog[entities.normalize(item.title)];
      assert(rosterRule?.text===rule?.text&&rosterRule?.value===item.value,`tau-empire: roster Enhancement ${item.title} does not preserve its full rule and current cost`);
    });
    assert(/\.\.\/shared\/roster-parser\.js\?v=\d+/.test(reader),'tau-empire: shared roster parser is absent');
    assert(/\.\.\/shared\/book-roster-enhancements\.js\?v=\d+/.test(reader)&&/\.\/scripts\/roster-data\.js\?v=\d+/.test(reader),'tau-empire: desktop Enhancement owner runtime is absent');
    const tauApp=fs.readFileSync(path.join(bookRoot,'scripts','app.js'),'utf8')+fs.readFileSync(path.join(bookRoot,'scripts','roster-filter.js'),'utf8');
    assert(tauApp.includes("params.has('roster')")&&tauApp.includes('WHBookRosterEnhancements?.decorate')&&tauApp.includes('WHRosterEntities.loadoutIncludesProfile')&&tauApp.includes(".content-group.detachment"),'tau-empire: desktop roster filtering, loadout or owned Enhancement decoration is incomplete');
    const tauMobile=fs.readFileSync(path.join(bookRoot,'mobile','mobile.js'),'utf8');
    assert(tauMobile.includes('WHRosterParser.parse')&&tauMobile.includes('WHBookRosterEnhancements?.decorate'),'tau-empire: Phone Mode does not parse current roster source and decorate the Enhancement owner');
    assert(fs.existsSync(path.join(bookRoot,'mobile','related-rules.inc')),'tau-empire: Phone Mode related rules are absent');
    console.log(`PASS  tau-empire: ${points.units.length} units, ${points.enhancements.length} Enhancements, desktop/iPad + Phone Mode`);
    continue;
  }
  if(bookId==='emperors-children'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8'),codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','emperors-children-codex-datasheets.en.json'),'utf8')),owners=JSON.parse(fs.readFileSync(path.join(bookRoot,'sources','enhancement-owner-matrix.json'),'utf8'));
    const units=[...(codex.datasheets||[])],unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1]))),publishedOwners=Object.values(owners.enhancements).filter(item=>item.ownerGroup),enhancementIds=new Set([...related.matchAll(/data-rule-id="([^"]+)"/g)].map(match=>match[1]));
    assert(units.length===23,"emperors-children: datasheet catalog is incomplete");
    units.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`emperors-children: unit ${unit.title} is absent from Roster Guide`));
    publishedOwners.forEach(item=>assert(enhancementIds.has(Object.entries(owners.enhancements).find(([,value])=>value===item)[0]),`emperors-children: Enhancement ${item.title} is absent from related rules`));
    assert(related.includes('Faultless Opportunist'),"emperors-children: resolved Faultless Opportunist must remain available");
    assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader)&&/\.\/scripts\/app\.js\?v=\d+/.test(reader),"emperors-children: roster or matrix controller is absent");
    assert(fs.existsSync(path.join(bookRoot,'scripts','compatible-rules-runtime.mjs'))&&fs.existsSync(path.join(bookRoot,'scripts','roster-data.js')),"emperors-children: matrix or roster data is absent");
    console.log(`PASS  emperors-children: ${units.length} units, ${publishedOwners.length} resolved Enhancements/UPGRADE, desktop/iPad + Phone Mode`);
    continue;
  }
  if(bookId==='chaos-space-marines'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8'),codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','chaos-space-marines-codex-datasheets.en.json'),'utf8'));
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    assert(codex.datasheets.length===54,'chaos-space-marines: current Datasheet catalog is incomplete');
    assert(codex.legends.length===53,'chaos-space-marines: Legends inventory changed');
    codex.datasheets.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`chaos-space-marines: unit ${unit.title} is absent from Roster Guide`));
    for(const title of ['Khorne Berzerkers','Noise Marines','Plague Marines','Rubric Marines'])assert(!unitTitles.has(entities.normalize(title)),`chaos-space-marines: borrowed unit ${title} entered the current surface`);
    assert((related.match(/class="stratagem surface"/g)||[]).length===103,'chaos-space-marines: 93 faction and 10 Core Stratagems are required');
    assert((related.match(/class="enhancement\b/g)||[]).length===62,'chaos-space-marines: all 30 FP and 32 secondary-consensus Enhancements are required');
    assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader)&&/\.\/scripts\/app\.js\?v=\d+/.test(reader),'chaos-space-marines: roster or matrix controller is absent');
    assert(fs.existsSync(path.join(bookRoot,'scripts','compatible-rules-runtime.mjs'))&&fs.existsSync(path.join(bookRoot,'scripts','roster-data.js')),'chaos-space-marines: matrix or roster data is absent');
    console.log('PASS  chaos-space-marines: 54 current units, 17 Detachments, desktop/iPad + Phone routes');
    continue;
  }
  if(bookId==='space-marines'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),mobile=fs.readFileSync(path.join(bookRoot,'mobile','index.html'),'utf8'),points=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','space-marines-points.en.json'),'utf8'));
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1])));
    assert(points.units.filter(unit=>unit.status==='Current').length===101,'space-marines: current Datasheet catalog is incomplete');
    assert(unitTitles.size===101,'space-marines: roster must expose the existing 101 current Datasheets');
    assert((reader.match(/<section class="content-group detachment"/g)||[]).length===23,'space-marines: roster must expose the existing 23 Detachments');
    assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader),'space-marines: Desktop roster filter is absent');
    assert(mobile.includes('./roster-filter.js?v=2'),'space-marines: Phone roster filter is absent');
    console.log('PASS  space-marines: 101 current units, 23 Detachments, desktop/iPad + Phone routes');continue;
  }
  if(bookId==='blood-angels'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8');
    const codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','blood-angels-codex-datasheets.en.json'),'utf8'));
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1]))),localTitles=new Set(codex.datasheets.map(unit=>entities.normalize(unit.title)));
    assert(codex.datasheets.length===15,'blood-angels: local Datasheet catalog is incomplete');
    assert(unitTitles.size===97,'blood-angels: expected 15 local + 82 shared Datasheets');
    codex.datasheets.forEach(unit=>assert(unitTitles.has(entities.normalize(unit.title)),`blood-angels: local unit ${unit.title} is absent from Roster Guide`));
    assert([...unitTitles].filter(title=>!localTitles.has(title)).length===82,'blood-angels: shared Space Marines roster inventory changed');
    assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader)&&/\.\/scripts\/app\.js\?v=\d+/.test(reader),'blood-angels: roster or matrix controller is absent');
    assert(fs.existsSync(path.join(bookRoot,'scripts','compatible-rules-runtime.mjs'))&&related.includes('core-stratagem-'),'blood-angels: Compatible Rules or Core Stratagems are absent');
    console.log('PASS  blood-angels: 15 local + 82 shared units, desktop/iPad + Phone routes');
    continue;
  }
  if(bookId==='dark-angels'){
    const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),related=fs.readFileSync(path.join(bookRoot,'mobile','related-rules.inc'),'utf8'),codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','dark-angels-codex-datasheets.en.json'),'utf8'));
    const unitTitles=new Set([...reader.matchAll(/data-unit-title="([^"]+)"/g)].map(match=>entities.normalize(match[1]))),localTitles=new Set(codex.datasheets.map(unit=>entities.normalize(unit.title)));
    assert(codex.datasheets.length===16,'dark-angels: local Datasheet catalog is incomplete');assert(unitTitles.size===98,'dark-angels: expected 16 local + 82 shared Datasheets');assert([...unitTitles].filter(title=>!localTitles.has(title)).length===82,'dark-angels: shared Space Marines roster inventory changed');assert((reader.match(/<section class="content-group detachment"/g)||[]).length===24,'dark-angels: roster must expose 8 local + 16 shared Detachments');assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader)&&related.includes('1st-company-task-force-armour-of-contempt'),'dark-angels: roster or shared Compatible Rules inventory is absent');
    console.log('PASS  dark-angels: 16 local + 82 shared units, 8 local + 16 shared Detachments');continue;
  }
  const dataPath=path.join(bookRoot,'content',`${bookId}-rules.en.json`);
  const readerPath=path.join(bookRoot,'reader.html');
  const relatedPath=path.join(bookRoot,'mobile','related-rules.inc');
  assert(fs.existsSync(dataPath),`${bookId}: missing canonical roster data`);
  assert(fs.existsSync(readerPath),`${bookId}: missing roster reader`);
  assert(fs.existsSync(relatedPath),`${bookId}: missing related rules inventory`);
  if(!fs.existsSync(dataPath)||!fs.existsSync(readerPath)||!fs.existsSync(relatedPath))continue;

  const data=JSON.parse(fs.readFileSync(dataPath,'utf8'));
  const reader=fs.readFileSync(readerPath,'utf8');
  const related=fs.readFileSync(relatedPath,'utf8');
  const inventory={units:[],weapons:[],abilities:[],detachments:[],enhancements:[],stratagems:[],coreStratagems:[]};
  for(const section of data.sections||[]){
    if(section.kind==='unit')inventory.units.push(section);
    if(section.id?.startsWith('detachment-')){
      inventory.detachments.push(section);
      (section.subsections||[]).filter(part=>part.title==='Stratagems').forEach(part=>inventory.stratagems.push(...(part.blocks||[])));
    }
  }
  walk(data.sections,node=>{
    if(node.type==='weapon')inventory.weapons.push(node);
    if(node.type==='ability')inventory.abilities.push(node);
    if(node.type==='enhancement')inventory.enhancements.push(node);
  });
  inventory.coreStratagems=[...related.matchAll(/id="core-stratagem-[^"]+"/g)];

  inventory.units.forEach(unit=>assert(reader.includes(`id="${unit.id}"`),`${bookId}: unit ${unit.id} is absent from Roster Guide`));
  inventory.weapons.forEach(weapon=>{
    assert(reader.includes(`data-term="${weapon.termId}"`),`${bookId}: weapon ${weapon.name} is absent from Roster Guide`);
    const family=entities.weaponFamily(weapon.name);
    assert(entities.loadoutIncludesProfile([family],weapon.name),`${bookId}: loadout ${family} drops profile ${weapon.name}`);
  });
  inventory.abilities.filter(ability=>ability.id).forEach(ability=>assert(reader.includes(`id="${ability.id}"`),`${bookId}: ability ${ability.id} is absent from Roster Guide`));
  inventory.detachments.forEach(detachment=>assert(reader.includes(`id="${detachment.id}"`),`${bookId}: detachment ${detachment.id} is absent from Roster Guide`));
  [...inventory.enhancements,...inventory.stratagems].filter(entity=>entity.id).forEach(entity=>assert(related.includes(`id="${entity.id}"`),`${bookId}: ${entity.type} ${entity.id} is absent from related rules`));
  assert(inventory.coreStratagems.length>0,`${bookId}: Core Stratagems are absent from related rules`);
  console.log(`PASS  ${bookId}: ${inventory.units.length} units, ${inventory.weapons.length} weapon profiles, ${inventory.abilities.length} abilities, ${inventory.detachments.length} detachments, ${inventory.enhancements.length} enhancements, ${inventory.stratagems.length} faction + ${inventory.coreStratagems.length} core stratagems`);
}

assert(supported.length===9,`Expected 9 Roster Guide books, found ${supported.length}`);
assert(entities.weaponFamily('Plasma gun – supercharge')==='plasma gun','Plasma gun profile family is not canonical');
assert(entities.loadoutIncludesProfile(['Plasma gun'],'Plasma gun – standard'),'Plasma gun standard profile is lost');
assert(entities.loadoutIncludesProfile(['Plasma gun'],'Plasma gun – supercharge'),'Plasma gun supercharge profile is lost');
const plasmaProfiles=entities.weaponGroups(glossaryContext.WH40K_GLOSSARY.forBook('death-guard'),'unit-plague-marines').get('plasma gun')||[];
assert(plasmaProfiles.length===2,'Plasma gun does not expose both standard and supercharge profiles');

const dgRosterFilter=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-filter.js'),'utf8');
const dgRosterSemantics=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
const rosterGuideApp=fs.readFileSync(path.join(root,'roster-guides/app.js'),'utf8');
const dgPhone=fs.readFileSync(path.join(root,'books/death-guard/mobile/mobile.js'),'utf8');
assert(rosterGuideApp.includes("'death guard':'../books/death-guard/index.html'"),'Death Guard personal guides bypass the responsive book entry');
assert(dgPhone.includes("destination.searchParams.set('roster'")&&dgPhone.includes('link.remove()'),'Death Guard Phone roster navigation is not filtered or query-preserving');
assert(dgRosterSemantics.includes("{detachment:'shamblerot-vectorium', units:['poxwalkers'], id:'keyword-battleline', title:'BATTLELINE'}"),'Shamblerot Vectorium grant is absent from the Death Guard semantic runtime');
assert(dgRosterSemantics.includes("'foetid-bloat-drone-with-heavy-blight-launcher','helbrute','myphitic-blight-hauler'"),'Contagion Engines grant owners are incomplete');
assert(dgRosterSemantics.includes('addKeywords(KEYWORD_GRANTS.filter')&&dgRosterFilter.includes('semantic.decorate(')&&dgPhone.includes('semantic.decorate('),'Roster keyword rendering does not use the shared Death Guard semantic resolver');

const amPhone=fs.readFileSync(path.join(root,'books/adeptus-mechanicus/mobile/mobile.js'),'utf8');
assert(amPhone.includes("rosterGuideHref=()=>new URL('../../../roster-guides/index.html',location.href).href")&&!amPhone.includes("rosterGuideHref=()=>window.AMPhoneRoster.withRosterQuery"),'Mechanicus invalid roster handoff still carries an auto-open roster parameter');

const sharedMatcherContext={window:{WHRuleFacts:ruleFacts}};
vm.runInNewContext(fs.readFileSync(path.join(root,'books/shared/related-rules-matcher.js'),'utf8'),sharedMatcherContext,{filename:'related-rules-matcher.js'});
const sharedMatcher=sharedMatcherContext.window.WHRelatedRules;
const matcherContext=(keywords,extra={})=>({unitId:extra.unitId||'unit-fixture',keywords:new Set(keywords),intrinsicKeywords:new Set(keywords),...extra});
assert(sharedMatcher.matches({targets:[{side:'friendly',all:['DEATH GUARD'],any:['MONSTER','VEHICLE']}]},matcherContext(['DEATH GUARD','MONSTER'])),'shared matcher drops a valid MONSTER OR VEHICLE target');
assert(!sharedMatcher.matches({targets:[{side:'friendly',all:['DEATH GUARD','INFANTRY']}]},matcherContext(['PLAGUE LEGIONS','INFANTRY'])),'shared matcher leaks a Death Guard rule to Pact of Decay');
assert(!sharedMatcher.matches({targets:[{side:'friendly',alternatives:[{anyKeywords:['SICARIAN','PTERAXII']},{allKeywords:['SKITARII','MOUNTED']}]}]},matcherContext(['MOUNTED'])),'shared matcher flattens a compound OR target');
assert(sharedMatcher.matches({targets:[{side:'friendly',alternatives:[{anyKeywords:['SICARIAN','PTERAXII']},{allKeywords:['SKITARII','MOUNTED']}]}]},matcherContext(['SKITARII','MOUNTED'])),'shared matcher rejects SKITARII MOUNTED');
const attached=matcherContext(['SKITARII','INFANTRY'],{candidates:[{unitId:'unit-rangers',keywords:new Set(['SKITARII','INFANTRY','TECH-PRIEST','CHARACTER']),attached:true,attachmentKnown:true,characterCount:1}]});
assert(sharedMatcher.matches({targets:[{side:'friendly',all:['TECH-PRIEST']}]},attached),'Attached Unit does not inherit its Leader keyword');
const datasmith=matcherContext(['INFANTRY','CHARACTER','TECH-PRIEST'],{candidates:[{unitId:'unit-cybernetica-datasmith',keywords:new Set(['ADEPTUS MECHANICUS','VEHICLE','LEGIO CYBERNETICA','CHARACTER','TECH-PRIEST']),attached:true,attachmentKnown:true,characterCount:1}]});
assert(sharedMatcher.matches({targets:[{side:'friendly',all:['ADEPTUS MECHANICUS','VEHICLE']}]},datasmith),'Datasmith and Kastelan Attached Unit loses VEHICLE relevance');
assert(!sharedMatcher.matches({targets:[{side:'friendly',all:['ADEPTUS MECHANICUS','INFANTRY']}]},datasmith),'Datasmith and Kastelan Attached Unit incorrectly keeps INFANTRY');

const rosterCompatibleBooks=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','blood-angels'];
for(const bookId of rosterCompatibleBooks){
  const desktop=fs.readFileSync(path.join(root,`books/${bookId}/scripts/app.js`),'utf8');
  const phone=fs.readFileSync(path.join(root,`books/${bookId}/mobile/mobile.js`),'utf8');
  assert(/detachment\s*=\s*rosterMode\s*\?\s*['"]all['"]/.test(desktop),`${bookId}: Desktop roster mode does not use the all-detachment union`);
  assert(/if\s*\(!rosterMode\)\s*controls\.append\(filterMenu\)/.test(desktop),`${bookId}: Desktop roster mode still mounts the Detachment selector`);
  assert(/selected\s*=\s*rosterMode\s*\?\s*['"]all['"]/.test(phone),`${bookId}: Phone roster mode does not use the all-detachment union`);
  assert(phone.includes("relatedDetachment.closest('label')?.remove()"),`${bookId}: Phone roster mode still mounts the Detachment selector`);
  assert(/if\s*\(relatedRulesEnabled\s*&&\s*relatedDetachment\s*&&\s*!rosterMode\)/.test(phone),`${bookId}: Phone roster mode can still restore a stale manual filter`);
}

if(failures.length){failures.forEach(message=>console.error(`FAIL  ${message}`));process.exitCode=1;}
else console.log(`Roster Guide contract passed for ${supported.length} book(s).`);
