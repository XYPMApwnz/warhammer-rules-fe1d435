import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {createRosterCatalog} from '../books/shared/tools/build-roster-catalog.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const canonical='books/chaos-space-marines/content/chaos-space-marines-codex-datasheets.en.json';
const builder='books/shared/tools/build-army-book.mjs';
const masterId='unit-masters-of-the-maelstrom';
const garlonId=masterId+'-model-garlon-souleater-2';
const masterRuleId='emperors-children-detachment-rule-master-of-the-pageant';
// Frozen CSM Faction Pack v1.2, p.25, SHA-256 f3a8d05e...b989a33a495.
// Scope is model-specific; the two Choice Samples options are mutually exclusive.
const choice='While this unit\u2019s Garreon the Corpsemaster is on the battlefield, in your Command phase, select one of the following: you can return 1 destroyed model (excluding Character models) to this unit, or, if one or more Heretic Astartes Infantry units from your army are below Starting Strength and within 3" of this unit, you gain 1CP.';
const names=['Garreon the Corpsemaster','Garlon Souleater','Katar Garrix','Captain Sargotta','The Enforcer'];
const support=['unit-chosen','unit-legionaries','unit-red-corsairs-raiders'];
const sources=new Map();
const read=p=>{if(!sources.has(p))sources.set(p,fs.readFileSync(path.join(root,p),'utf8'));return sources.get(p);};
const plain=x=>JSON.parse(JSON.stringify(x));
const clean=x=>String(x??'').replace(/\s+/g,' ').trim();
const slug=x=>clean(x).toLowerCase().replace(/[\u2019']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const esc=x=>clean(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const script=(source,key)=>{const scope={window:{}};vm.runInNewContext(source,scope);return plain(scope.window[key]);};
const slice=(catalog,id)=>{const range=catalog.targets[id];assert.ok(range,`target ${id}`);return catalog.html.slice(range.start,range.end);};

function modelOracle(models,label){
  assert.deepEqual(models.map(m=>m.title),names,`${label}: exactly five named models`);
  assert.equal(models.filter(m=>m.id===garlonId).length,1,`${label}: stable Garlon model identity`);
  for(const model of models)assert.deepEqual(model.intrinsicKeywords||[],model.id===garlonId?['PSYKER']:[],`${label}: only Garlon model-scoped PSYKER`);
}

// Exercise actual builder functions on synthetic input without importing its CLI entry point.
function publication(source,det){
  const entry=source.slice(source.indexOf('const detachmentRuleEntries='),source.indexOf('for(const det of detachments){',source.indexOf('const detachmentRuleEntries=')));
  const availability=source.slice(source.indexOf('const sourceAvailabilityMessages='),source.indexOf('function addTerm',source.indexOf('const sourceAvailabilityMessages=')));
  const rule=source.split('\n').find(line=>line.trimStart().startsWith('const rule=det.rule?'));
  assert.ok(entry&&availability&&rule,'actual publication functions exist');
  const terms=[];
  const scope={det,clean,slug,esc,titleKey:x=>clean(x).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),config:{id:'synthetic'},pack:{meta:{version:'fixture'}},addTerm:(title,text,anchor)=>{const id='term-'+slug(title);terms.push({id,title,text,anchor});return id;}};
  vm.runInNewContext(availability+'\n'+entry+'\n'+rule+'\nthis.output={html:rule,entries:detachmentRuleEntries(det)};',scope);
  return {...plain(scope.output),terms};
}

function genericPublication(source){
  const det={id:'synthetic-detachment',rule:{title:'Parent',text:'Full parent text.',additionalRules:[{id:'child-one',title:'First child',text:'First complete body.'},{id:'child-two',title:'Second child',text:'Second complete body.'}]}};
  const result=publication(source,det);
  assert.equal((result.html.match(/class="rule-card surface"/g)||[]).length,3,'generic publication: all three rules exactly once');
  assert.equal(new Set(result.entries.map(x=>x.anchor)).size,3,'generic publication: unique anchors');
  assert.equal(new Set(result.terms.map(x=>x.id)).size,3,'generic publication: unique terms');
  for(const item of [det.rule,...det.rule.additionalRules])assert.equal(result.terms.filter(t=>t.title===item.title&&t.text===item.text).length,1,'generic publication: exact full body once');
  for(const {anchor,additional} of result.entries)if(additional)assert.equal((result.html.match(new RegExp(`id="${anchor}"`,'g'))||[]).length,1,'generic publication: distinct rendered additional anchor');
  const single=publication(source,{id:'ordinary',rule:{title:'Ordinary rule',text:'Unchanged body.'}});
  assert.equal(single.html,'<article class="rule-card surface"><h4><button class="term-button" data-term="term-ordinary-rule">Ordinary rule</button></h4><p data-source-field="text">Unchanged body.</p></article>','ordinary single rule unchanged');
  assert.throws(()=>publication(source,{id:'bad',rule:{title:'Parent',text:'Parent',additionalRules:[{title:'Empty',text:''}]}}),/requires title and full text/,'empty additional rule rejected');
  assert.throws(()=>publication(source,{id:'bad',rule:{title:'Parent',text:'Parent',additionalRules:[{title:'Parent',text:'Different'}]}}),/duplicate Detachment rule identity/,'reused rule identity rejected');
}

function providerFixture(book,unitId,detachments,instanceId='ra07-physical',mutate){
  const scope={console,URL,URLSearchParams,location:{pathname:`/books/${book}/reader.html`},document:{documentElement:{dataset:{bookId:book}}}};
  scope.window=scope;scope.globalThis=scope;
  for(const p of [`books/${book}/scripts/roster-data.js`,'books/shared/book-roster-enhancements.js','books/extensions/book-roster-enhancement-providers.js'])vm.runInNewContext(read(p),scope,{filename:p});
  const unit=scope.WH_BOOK_ROSTER_CATALOG.units.find(x=>x.id===unitId),keywords=unit.intrinsicKeywords,item={instanceId,unitId,raw:{id:instanceId}},gameUnit={identity:{instanceId,canonicalDatasheetId:unitId},rosterState:{detachments,keywordProfile:{intrinsic:keywords,added:[],removed:[],effective:keywords}},selection:{loadout:{selectedWargearAbilityIds:[]}},item:{catalogUnit:unit}};
  const effects=plain(scope.WHBookRosterEnhancements.gameEffects({item,gameUnit,gameUnits:[gameUnit],byInstance:new Map([[instanceId,gameUnit]]),enhancements:[]}));
  return {effects:mutate?mutate(effects):effects};
}

function providerOracle(mutate){
  // Reuse the existing, unmodified exact-output assertions, not a weaker title check.
  const source=read('tests/structured-roster-effects-qa.mjs');
  const assertions=source.slice(source.indexOf("const masterRuleId='"),source.indexOf("assert.equal(masterReferences(detachmentFixture",source.indexOf("const masterRuleId='")));
  assert.ok(assertions.includes('must emit exactly once')&&assertions.includes('must not add automatic mutations'));
  vm.runInNewContext(assertions,{assert,detachmentFixture:(book,id,instance,detachments)=>providerFixture(book,id,detachments,instance,mutate)});
  for(const [unit,det] of [['unit-fulgrim',[]],['unit-fulgrim',['rapid-evisceration']],['unit-seekers',['court-of-the-phoenician']]])assert.equal(providerFixture('emperors-children',unit,det).effects.filter(e=>e.canonicalReference?.id===masterRuleId).length,0,'unchanged negative provider scope');
  assert.equal(providerFixture('chaos-space-marines',masterId,[]).effects.some(e=>/choice-samples|model-keywords|psyker/i.test(JSON.stringify(e))),false,'no automatic Choice Samples or scoped-keyword effects');
}

export function runQa(overrides={}){
  const source=p=>overrides[p]??read(p),json=p=>JSON.parse(source(p));
  const units=json(canonical).datasheets,masters=units.find(x=>x.id===masterId);
  assert.equal(units.filter(x=>x.id===masterId).length,1);
  assert.deepEqual(masters.profiles.map(x=>x.name),names,'five unchanged profile identities');
  assert.deepEqual(masters.keywords,['Epic Hero','Infantry','Grenades','Chaos','Chaos Undivided','Masters of the Maelstrom','Heretic Astartes'],'unit-wide keywords unchanged; PSYKER is not flattened');
  assert.deepEqual(masters.abilities.map(x=>x.title).sort(),['Choice Samples','Dark Pacts','Fleet Command','Plunder','Support'],'Choice Samples exactly once with all old abilities');
  assert.equal(masters.abilities.find(x=>x.title==='Choice Samples').text,choice,'exact Choice Samples alternatives and prerequisites');
  assert.deepEqual(masters.relations,{leader:[],support:['CHOSEN','LEGIONARIES','RED CORSAIRS RAIDERS'],attachedUnit:[],transport:[]},'unchanged Support role and three targets');
  assert.deepEqual(masters.points,[{label:'5 models',value:145,minModels:5,maxModels:5}],'unchanged points');
  const config=json('books/chaos-space-marines/book.config.json');
  modelOracle(createRosterCatalog({config,units:[masters]}).units[0].gameSelections.models,'fresh canonical serializer');
  const catalogs={},targets={};
  for(const book of ['chaos-space-marines','emperors-children']){
    catalogs[book]=script(source(`books/${book}/scripts/roster-data.js`),'WH_BOOK_ROSTER_CATALOG');
    targets[book]=script(source(`books/${book}/scripts/target-data.js`),'WH_ARMY_BOOK_TARGETS');
  }
  const csm=catalogs['chaos-space-marines'],unit=csm.units.find(x=>x.id===masterId),html=slice(targets['chaos-space-marines'],masterId);
  modelOracle(unit.gameSelections.models,'generated roster');
  assert.deepEqual(unit.intrinsicKeywords,masters.keywords,'generated unit keywords not flattened');
  assert.equal(unit.gameSelections.abilities.filter(a=>a.title==='Choice Samples'&&a.text===choice).length,1,'generated complete Choice Samples');
  assert.deepEqual(unit.relations.canSupport.map(x=>x.unitId).sort(),[...support].sort());
  for(const id of support)assert.equal(csm.units.find(x=>x.id===id).relations.canBeSupportedBy.filter(x=>x.unitId===masterId).length,1,'inverse Support preserved');
  assert.equal((html.match(/data-source-field="abilities.choice-samples"/g)||[]).length,1,'published Choice Samples once');
  assert.ok(html.includes(esc(choice)),'published exact Choice Samples body');
  assert.equal((html.match(/data-model-keyword="PSYKER"/g)||[]).length,1,'published scoped keyword once');
  assert.ok(html.includes(`data-roster-model-id="${garlonId}"`),'published stable scoped Garlon identity');
  assert.equal(html.includes('data-source-field="keywords.psyker"'),false,'not unit-wide keyword markup');
  assert.equal(html.includes('data-source-field="relations.leader"'),false,'no obsolete Leader/attachment prose');
  const court=json('books/emperors-children/content/emperors-children-faction-pack.en.json').detachments.find(x=>x.id==='court-of-the-phoenician');
  const ec=targets['emperors-children'],courtHtml=slice(ec,'detachment-'+court.id),anchor=court.id+'-rule-master-of-the-pageant';
  for(const rule of [court.rule,...court.rule.additionalRules]){
    assert.equal((courtHtml.match(new RegExp(`>${rule.title}</button>`,'g'))||[]).length,1,`Court exact publication once: ${rule.title}`);
    assert.ok(courtHtml.includes(esc(rule.text)),`Court full body: ${rule.title}`);
  }
  assert.equal(ec.nodes.filter(n=>n.id===anchor&&n.kind==='inner-anchor').length,1,'additional rule separately navigable');
  assert.equal(ec.owners[anchor],'detachment-'+court.id,'additional anchor correct owner');
  assert.equal(catalogs['emperors-children'].detachmentRules.filter(r=>r.id===masterRuleId).length,1,'canonical provider reference unchanged');
  const generic={id:'unit-synthetic',title:'Synthetic',keywords:['INFANTRY'],composition:[{name:'First model',intrinsicKeywords:['SCOPED TEST']},{name:'Second model'}]};
  const synthetic=createRosterCatalog({config:{id:'synthetic'},units:[generic]}).units[0];
  assert.deepEqual(synthetic.gameSelections.models[0].intrinsicKeywords,['SCOPED TEST'],'generic scoped model');
  assert.equal(Object.hasOwn(synthetic.gameSelections.models[1],'intrinsicKeywords'),false,'ordinary model serialized unchanged');
  assert.deepEqual(synthetic.intrinsicKeywords,['INFANTRY'],'generic scope never flattened');
  genericPublication(source(builder));providerOracle();
  return {masters,catalogs,targets};
}

function mutations(){
  const kill=(id,fn,pattern)=>{let failure;try{fn();}catch(e){failure=e;}assert.ok(failure,`${id}: mutation survived`);assert.match(failure.message,pattern,`${id}: intended contract`);console.log(`${id}: KILLED (${failure.message.split('\n')[0]})`);};
  const roster='books/chaos-space-marines/scripts/roster-data.js',catalog=script(read(roster),'WH_BOOK_ROSTER_CATALOG');
  const m1=plain(catalog);delete m1.units.find(x=>x.id===masterId).gameSelections.models.find(x=>x.id===garlonId).intrinsicKeywords;
  kill('M1',()=>runQa({[roster]:`window.WH_BOOK_ROSTER_CATALOG=${JSON.stringify(m1)};`}),/only Garlon model-scoped PSYKER/);
  const m2=JSON.parse(read(canonical));m2.datasheets.find(x=>x.id===masterId).keywords.push('PSYKER');
  kill('M2',()=>runQa({[canonical]:JSON.stringify(m2)}),/unit-wide keywords unchanged/);
  const m3=JSON.parse(read(canonical));m3.datasheets.find(x=>x.id===masterId).abilities=m3.datasheets.find(x=>x.id===masterId).abilities.filter(a=>a.title!=='Choice Samples');
  kill('M3',()=>runQa({[canonical]:JSON.stringify(m3)}),/Choice Samples exactly once/);
  const m4=read(builder).replace('detachmentRuleEntries(det).map(({rule,anchor,additional})','detachmentRuleEntries(det).slice(0,1).map(({rule,anchor,additional})');
  assert.notEqual(m4,read(builder));kill('M4',()=>genericPublication(m4),/all three rules exactly once/);
  const m5=read(builder).replace('id="${esc(anchor)}" data-track="${esc(anchor)}"','id="${esc(det.id)}-rule" data-track="${esc(det.id)}-rule"');
  assert.notEqual(m5,read(builder));kill('M5',()=>genericPublication(m5),/distinct rendered additional anchor/);
  kill('M6',()=>providerOracle(effects=>[...effects,...effects.filter(e=>e.canonicalReference?.id===masterRuleId)]),/must emit exactly once/);
  console.log('RA07 mutations: 6/6 killed; in-memory isolated source/output copies, no tracked mutations');
}

async function browserChecks(state){
  const {chromium}=await import('playwright');
  const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
  const server=createServer((req,res)=>{try{if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));assert.ok(file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);}catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true}),errors=[];
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1100,height:850}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  async function cardCheck(personal){
    const card=page.locator(personal?'.unit-card.roster-game-view':`#${masterId}`);await card.waitFor();
    assert.equal(await card.locator('[data-source-field="abilities.choice-samples"]').count(),1,'visible Choice Samples exactly once');
    assert.equal(clean(await card.locator('[data-source-field="abilities.choice-samples"] p').innerText()),choice);
    const model=card.locator(`[data-roster-model-id="${garlonId}"]`);
    assert.equal(await model.count(),1,'visible scoped Garlon');
    assert.equal(await model.locator('[data-model-keyword="PSYKER"]').count(),1);
    assert.equal(await card.locator('[data-model-keyword="PSYKER"]').count(),1,'only Garlon scope');
    const intrinsic=await card.locator('[id$="-keywords"] > .keyword-list').innerText();assert.doesNotMatch(intrinsic,/PSYKER/i);
    for(const title of ['Fleet Command','Plunder','Dark Pacts','Support'])assert.ok((await card.innerText()).includes(title));
    if(personal){const game=await page.evaluate(()=>WH_ARMY_ROSTER_GAME_PROJECTION.units.find(u=>u.identity.instanceId==='ra07-masters'));assert.equal(game.identity.canonicalDatasheetId,masterId);assert.equal(game.effective.keywords.some(k=>k.toUpperCase()==='PSYKER'),false,'personal effective scope not flattened');assert.equal(game.effects.some(e=>/choice-samples|model-keywords/.test(JSON.stringify(e))),false,'no simulated CP/resurrection');}
    return card;
  }
  try{
    await page.goto(`${base}/books/chaos-space-marines/reader.html?view=full#${masterId}`);let card=await cardCheck(false);
    await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));
    for(const [selector,text] of [['[data-source-field="abilities.choice-samples"] > h5 > button[data-term="chaos-space-marines-ability-choice-samples"]',choice],[`[data-roster-model-id="${garlonId}"] > button[data-term="chaos-space-marines-model-keywords-garlon-souleater"]`,'Garlon Souleater only: PSYKER.']]){
      const id=await card.locator(selector).getAttribute('data-term');await page.evaluate(id=>DG_APP.fullEntry.open(id),id);await page.locator('.full-entry-layer:not([hidden])').waitFor();assert.equal(clean(await page.locator('.full-entry-definition').innerText()),text,'full-entry exact rule/model scope');await page.evaluate(()=>DG_APP.fullEntry.close());
    }
    const record={id:'ra07-masters-roster',name:'RA07 Masters',createdAt:'2026-09-11T00:00:00.000Z',updatedAt:'2026-09-11T00:00:00.000Z',sourceText:'',attachments:{},roster:{faction:'Chaos Space Marines',units:[{id:'ra07-masters',canonicalUnitId:masterId,name:'Masters of the Maelstrom',points:145,quantity:1,models:names.map(name=>({name,quantity:1,loadouts:[]}))}],detachments:[],enhancements:[],warnings:[]}};
    await page.evaluate(record=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record])),record);
    await page.goto(`${base}/books/chaos-space-marines/reader.html?view=mobile&roster=${record.id}&rosterInstance=ra07-masters#${masterId}`);await cardCheck(true);
    console.log('RA07 BROWSER Masters: normal, personal, full-entry Choice Samples/model scope PASS');
    const court='court-of-the-phoenician',anchor=court+'-rule-master-of-the-pageant';
    await page.goto(`${base}/books/emperors-children/reader.html?view=full#detachment-${court}`);
    const section=page.locator(`#detachment-${court}`);await section.waitFor();
    assert.equal(await section.locator('.rule-card h4').filter({hasText:'Sensational Performance'}).count(),1);
    assert.equal(await section.locator('.rule-card h4').filter({hasText:'Master of the Pageant'}).count(),1);
    await page.locator(`[data-nav-target="${court}-rule"]`).click();
    await page.locator(`[data-nav-target="${anchor}"]`).click();
    await page.locator(`#${anchor}`).waitFor({state:'visible'});
    assert.ok(await page.locator(`#${anchor}`).innerText(),'additional rule navigation lands on full content');
    const term=await page.locator(`#${anchor} > h4 > button[data-term="${masterRuleId}"]`).getAttribute('data-term');assert.equal(term,masterRuleId);
    await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));await page.evaluate(id=>DG_APP.fullEntry.open(id),term);
    assert.match(await page.locator('.full-entry-definition').innerText(),/Once per battle round.*FULGRIM.*1CP/s);
    assert.deepEqual(errors,[],'RA07 browser exceptions');console.log('RA07 BROWSER Court: two distinct rules, anchors and full-entry PASS');
  }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const state=runQa();console.log('RA07 structured publication QA: Masters + Court + generic contracts + reference-only provider PASS');
  if(process.argv.includes('--mutations'))mutations();
  if(process.argv.includes('--browser'))await browserChecks(state);
}
