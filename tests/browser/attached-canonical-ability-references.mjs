import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const inventory=Object.freeze({
  'death-guard':Object.freeze({migrated:['ability-the-destroyer-hive-70f0cc1','ability-shroud-of-disease-90475da','ability-virulent-aura-c28aa51','ability-sickening-vitality-89bb5ff','ability-malicious-calculations-8505f03','ability-foul-infusion-490467e'],deterministic:['ability-silent-bodyguard-03a0a1b'],ambiguous:['enhancement-witherbone-pipes','enhancement-vile-vigour','enhancement-helm-of-the-fly-king']}),
  'adeptus-mechanicus':Object.freeze({migrated:['datasheet-control-edict','datasheet-battle-protocols','datasheet-electro-infusion'],deterministic:['datasheet-lord-of-the-machine-cult','datasheet-galvanic-field','datasheet-seekers-of-divine-arcana','datasheet-robotic-bodyguard','enhancement-clandestine-infiltrator','enhancement-malphonic-susurrus','enhancement-peerless-eradicator','enhancement-temporcopia','enhancement-transoracular-dyad-wafers','enhancement-explorator-dispensation','enhancement-vinghs-wafers-of-dynamism','enhancement-electromiasmic-brazier','enhancement-martial-signatum-amplificator','enhancement-belicosa-class-capacitor-vanes'],ambiguous:['enhancement-cognitive-reinforcement','enhancement-omnicogitator','enhancement-sanctified-ordnance','enhancement-voltagheist-reliquary']}),
  'tau-empire':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'emperors-children':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'tyranids':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'chaos-space-marines':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'space-marines':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'dark-angels':Object.freeze({migrated:[],deterministic:[],ambiguous:[]}),
  'blood-angels':Object.freeze({migrated:[],deterministic:[],ambiguous:[]})
});
assert.equal(Object.keys(inventory).length,9);
assert.equal(Object.values(inventory).reduce((count,book)=>count+book.migrated.length,0),9);

const loadCatalog=book=>{const scope={};scope.window=scope;scope.globalThis=scope;vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),scope,{filename:`${book}/roster-data.js`});return scope.WH_BOOK_ROSTER_CATALOG;};
const ability=(catalog,id)=>catalog.units.flatMap(unit=>unit.gameSelections.abilities||[]).find(item=>item.id===id);
for(const [book,records] of Object.entries(inventory)){const catalog=loadCatalog(book);for(const id of records.migrated){const canonical=ability(catalog,id);assert(canonical,`${book}: missing canonical Ability ${id}`);assert(canonical.title&&canonical.text,`${book}: incomplete canonical Ability ${id}`);}}

const dgSource=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
for(const key of ['destroyer','shroud','virulent','vitality','malicious','foul'])assert.match(dgSource,new RegExp(`canonicalAbility\\(DG_RULE\\.${key}`),`DG ${key} must use canonical reference`);
for(const text of ['Melee attacks that target this Attached Unit: -1 to the Hit roll.','This Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".','Models in this Attached Unit can re-roll Wound rolls for ranged attacks.','Models in this Attached Unit can re-roll Advance and Charge rolls.','Models in this Attached Unit can ignore modifiers to BS, WS and Hit rolls.'])assert.doesNotMatch(dgSource,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),'DG migratable manual summary remains');
assert.match(dgSource,/weapon\('foul-infusion-weapons'.*LETHAL HITS/,'Foul Infusion deterministic LETHAL HITS result must remain');
assert.doesNotMatch(dgSource,/ability\('foul-infusion'/,'Foul Infusion shortened residual must be removed');
assert.match(dgSource,/add\('silent-bodyguard','ability','core-feel-no-pain','grant'/,'Silent Bodyguard deterministic CORE grant must remain');

const amSource=fs.readFileSync(path.join(root,'books/adeptus-mechanicus/scripts/roster-enhancements.js'),'utf8');
for(const id of inventory['adeptus-mechanicus'].migrated)assert.match(amSource,new RegExp(`canonicalAbility\\('${id}'`),`AM ${id} must use canonical reference`);
for(const text of ["Models in this Attached Unit can re-roll Hit rolls.","If Aegis Protocol is active, add 1 to this unit's Toughness characteristic.","While led, subtract 1 from Wound rolls for attacks that target this unit."])assert.doesNotMatch(amSource,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),'AM migratable manual summary remains');
assert.match(amSource,/aegis-protocol-toughness/,'Aegis conditional stat record must remain');
assert.match(amSource,/lord-of-the-machine-cult.*Feel No Pain/,'Dominus deterministic FNP must remain');
assert.match(amSource,/galvanic-field.*LETHAL HITS/,'Manipulus deterministic weapon mutation must remain');

const remainingProvider=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
assert.doesNotMatch(remainingProvider,/explicit-attachment/,'Remaining-seven Enhancement provider must not be misclassified as explicit attachment routing');

const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),relative=pathname.replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':contentTypes[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const open=async(book,record,instanceId,canonicalId)=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),record);const page=await context.newPage();await page.goto(`${origin}/books/${book}/reader.html?view=mobile&roster=${record.id}&rosterInstance=${instanceId}#${canonicalId}`,{waitUntil:'networkidle'});await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===id)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${id}"]`),instanceId);return{context,page};};
  const inspectReference=async(page,instanceId,id)=>page.evaluate(({instanceId,id})=>{const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${instanceId}"]`),effect=gameUnit.effects.find(item=>item.canonicalAbilityId===id),articles=[...card.querySelectorAll(`[data-roster-canonical-ability-id="${id}"]`)];return{effect,articleCount:articles.length,title:articles[0]?.querySelector('h5')?.textContent.trim()||'',source:articles[0]?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',text:articles[0]?.querySelector('p')?.textContent.trim()||'',activeText:card.querySelector('.roster-game-effects')?.textContent||'',cardCount:document.querySelectorAll('.unit-card[data-roster-game-instance]').length};},{instanceId,id});

  const dgCatalog=loadCatalog('death-guard'),malicious=ability(dgCatalog,'ability-malicious-calculations-8505f03');
  const dgText=`Death Guard
1x Tallyman (45 pts): Close combat weapon, Infected plasma pistol
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives`;
  const dgRecord={id:'canonical-tallyman',sourceText:dgText,attachments:{'parsed-unit-2':['parsed-unit-1']}};
  const tallyTarget=await open('death-guard',dgRecord,'parsed-unit-2','unit-plague-marines'),tallyResult=await inspectReference(tallyTarget.page,'parsed-unit-2',malicious.id);
  assert.equal(tallyResult.effect?.source?.ownerInstanceId,'parsed-unit-1');assert.equal(tallyResult.effect?.targetInstanceId,'parsed-unit-2');assert.equal(tallyResult.effect?.operation,'reference');assert.equal(tallyResult.articleCount,1);assert.equal(tallyResult.title,malicious.title);assert.equal(tallyResult.text,malicious.text);assert.equal(tallyResult.source,'Tallyman');assert.doesNotMatch(tallyResult.activeText,/Malicious Calculations/);assert.equal(tallyResult.cardCount,1);await tallyTarget.context.close();
  const tallyOther=await open('death-guard',dgRecord,'parsed-unit-3','unit-plague-marines'),tallyOtherResult=await inspectReference(tallyOther.page,'parsed-unit-3',malicious.id);assert.equal(tallyOtherResult.effect,undefined);assert.equal(tallyOtherResult.articleCount,0);await tallyOther.context.close();
  const tallySource=await open('death-guard',dgRecord,'parsed-unit-1','unit-tallyman');const tallySourceResult=await tallySource.page.evaluate(()=>{const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-1"]'),articles=[...card.querySelectorAll('.ability')].filter(article=>article.querySelector('h5')?.textContent.trim()==='Malicious Calculations');return{count:articles.length,derived:articles.filter(article=>article.classList.contains('roster-game-canonical-reference')).length};});assert.deepEqual(tallySourceResult,{count:1,derived:0});await tallySource.context.close();
  const tallyDetached=await open('death-guard',{...dgRecord,id:'canonical-tallyman-detached',attachments:{}},'parsed-unit-2','unit-plague-marines'),tallyDetachedResult=await inspectReference(tallyDetached.page,'parsed-unit-2',malicious.id);assert.equal(tallyDetachedResult.effect,undefined);assert.equal(tallyDetachedResult.articleCount,0);await tallyDetached.context.close();

  const foul=ability(dgCatalog,'ability-foul-infusion-490467e');
  const foulRecord={id:'canonical-foul-class-c',sourceText:`Death Guard
1x Biologus Putrifier (60 pts): Hyper blight grenades, Injector pistol, Plague knives
1x Tallyman (45 pts): Close combat weapon, Infected plasma pistol
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives`,attachments:{'parsed-unit-3':['parsed-unit-1','parsed-unit-2']}};
  const inspectFoul=async(instanceId,canonicalId)=>{const opened=await open('death-guard',foulRecord,instanceId,canonicalId);try{const reference=await inspectReference(opened.page,instanceId,foul.id),state=await opened.page.evaluate(({instanceId,foulId})=>{const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${instanceId}"]`),mutation=gameUnit.effects.find(effect=>effect.id==='foul-infusion-weapons'),selected=new Set(gameUnit.selection.loadout.selectedProfileIds),shortened=[...card.querySelectorAll('.ability p')].filter(node=>node.textContent.trim()==='Critical Hits are scored on unmodified Hit rolls of 5+.').length;return{mutation:mutation?{operation:mutation.operation,tag:mutation.tag,owner:mutation.source?.ownerInstanceId,target:mutation.targetInstanceId,falseTargets:(mutation.targets||[]).filter(target=>!selected.has(target.profileId)).length}:null,shortened,activeText:card.querySelector('.roster-game-effects')?.textContent||'',canonicalCount:card.querySelectorAll(`[data-roster-canonical-ability-id="${foulId}"]`).length};},{instanceId,foulId:foul.id});return{...reference,...state};}finally{await opened.context.close();}};
  const foulTallyman=await inspectFoul('parsed-unit-2','unit-tallyman');assert.equal(foulTallyman.effect?.source?.ownerInstanceId,'parsed-unit-1');assert.equal(foulTallyman.effect?.targetInstanceId,'parsed-unit-2');assert.equal(foulTallyman.effect?.operation,'reference');assert.equal(foulTallyman.articleCount,1);assert.equal(foulTallyman.canonicalCount,1);assert.equal(foulTallyman.title,foul.title);assert.equal(foulTallyman.text,foul.text);assert.equal(foulTallyman.source,'Biologus Putrifier');assert.deepEqual(foulTallyman.mutation,{operation:'grant-tag',tag:'LETHAL HITS',owner:'parsed-unit-1',target:'parsed-unit-2',falseTargets:0});assert.equal(foulTallyman.shortened,0);assert.match(foulTallyman.activeText,/LETHAL HITS/);assert.doesNotMatch(foulTallyman.activeText,/Foul Infusion/);
  const foulMarines=await inspectFoul('parsed-unit-3','unit-plague-marines');assert.equal(foulMarines.effect?.source?.ownerInstanceId,'parsed-unit-1');assert.equal(foulMarines.effect?.targetInstanceId,'parsed-unit-3');assert.equal(foulMarines.effect?.operation,'reference');assert.equal(foulMarines.articleCount,1);assert.equal(foulMarines.canonicalCount,1);assert.equal(foulMarines.title,foul.title);assert.equal(foulMarines.text,foul.text);assert.equal(foulMarines.source,'Biologus Putrifier');assert.deepEqual(foulMarines.mutation,{operation:'grant-tag',tag:'LETHAL HITS',owner:'parsed-unit-1',target:'parsed-unit-3',falseTargets:0});assert.equal(foulMarines.shortened,0);assert.match(foulMarines.activeText,/LETHAL HITS/);assert.doesNotMatch(foulMarines.activeText,/Foul Infusion/);
  const foulSource=await open('death-guard',foulRecord,'parsed-unit-1','unit-biologus-putrifier');const foulSourceResult=await foulSource.page.evaluate(()=>{const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-1"]'),articles=[...card.querySelectorAll('.ability')].filter(article=>article.querySelector('h5')?.textContent.trim()==='Foul Infusion'),mutation=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-1')?.effects.find(effect=>effect.id==='foul-infusion-weapons');return{count:articles.length,derived:articles.filter(article=>article.classList.contains('roster-game-canonical-reference')).length,text:articles[0]?.querySelector('p')?.textContent.trim()||'',mutationOwner:mutation?.source?.ownerInstanceId,mutationTarget:mutation?.targetInstanceId};});assert.deepEqual(foulSourceResult,{count:1,derived:0,text:foul.text,mutationOwner:'parsed-unit-1',mutationTarget:'parsed-unit-1'});await foulSource.context.close();
  const foulOther=await inspectFoul('parsed-unit-4','unit-plague-marines');assert.equal(foulOther.effect,undefined);assert.equal(foulOther.articleCount,0);assert.equal(foulOther.canonicalCount,0);assert.equal(foulOther.mutation,null);assert.equal(foulOther.shortened,0);
  for(const [instanceId,canonicalId] of [['parsed-unit-2','unit-tallyman'],['parsed-unit-3','unit-plague-marines']]){const detached={...foulRecord,id:`canonical-foul-detached-${instanceId}`,attachments:{}},opened=await open('death-guard',detached,instanceId,canonicalId),result=await inspectReference(opened.page,instanceId,foul.id),effects=await opened.page.evaluate(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===id)?.effects.filter(effect=>effect.id==='foul-infusion-weapons'||effect.canonicalAbilityId==='ability-foul-infusion-490467e').length||0,instanceId);assert.equal(result.effect,undefined);assert.equal(result.articleCount,0);assert.equal(effects,0);await opened.context.close();}

  const amCatalog=loadCatalog('adeptus-mechanicus'),control=ability(amCatalog,'datasheet-control-edict'),electro=ability(amCatalog,'datasheet-electro-infusion');
  const amRecord={id:'canonical-am-attachments',sourceText:`Adeptus Mechanicus
1x Skitarii Marshal (35 pts): Control stave, Mechanicus pistol
10x Skitarii Rangers (85 pts)
10x Skitarii Vanguard (95 pts)
1x Tech-Priest Dominus (70 pts): Omnissian axe, Macrostubber, Volkite blaster
10x Fulgurite Electro-Priests (140 pts)`,attachments:{'parsed-unit-2':['parsed-unit-1'],'parsed-unit-5':['parsed-unit-4']}};
  const controlTarget=await open('adeptus-mechanicus',amRecord,'parsed-unit-2','unit-skitarii-rangers'),controlResult=await inspectReference(controlTarget.page,'parsed-unit-2',control.id);assert.equal(controlResult.effect?.source?.ownerInstanceId,'parsed-unit-1');assert.equal(controlResult.articleCount,1);assert.equal(controlResult.title,control.title);assert.equal(controlResult.text,control.text);assert.equal(controlResult.source,'Skitarii Marshal');assert.doesNotMatch(controlResult.activeText,/Control Edict/);await controlTarget.context.close();
  const controlOther=await open('adeptus-mechanicus',amRecord,'parsed-unit-3','unit-skitarii-vanguard'),controlOtherResult=await inspectReference(controlOther.page,'parsed-unit-3',control.id);assert.equal(controlOtherResult.effect,undefined);assert.equal(controlOtherResult.articleCount,0);await controlOther.context.close();
  const electroTarget=await open('adeptus-mechanicus',amRecord,'parsed-unit-5','unit-fulgurite-electro-priests'),electroResult=await inspectReference(electroTarget.page,'parsed-unit-5',electro.id);assert.equal(electroResult.effect?.source?.ownerInstanceId,'parsed-unit-4');assert.equal(electroResult.articleCount,1);assert.equal(electroResult.title,electro.title);assert.equal(electroResult.text,electro.text);assert.equal(electroResult.source,'Tech-Priest Dominus');assert.doesNotMatch(electroResult.activeText,/Electro-Infusion/);await electroTarget.context.close();
  console.log('Attached canonical Ability reference inventory/browser QA: PASS (9 books; 9 migrated; Class C residuals 0).');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
