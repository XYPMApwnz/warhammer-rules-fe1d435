import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';

// RA04 frozen payload: retained official SM Faction Pack v1.2, pp. 40-41.
// The established nine-target Titus Leader contract is deliberately unchanged.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const canonicalPath='books/space-marines/content/space-marines-codex-datasheets.en.json';
const wargearPath='books/space-marines/content/space-marines-codex-wargear.en.json';
const titusId='unit-captain-titus';
const books=['space-marines','dark-angels','blood-angels'];
const facts=[
  ['unit-apothecary','unit-bladeguard-veteran-squad','BLADEGUARD VETERAN SQUAD'],
  ['unit-bladeguard-ancient','unit-bladeguard-veteran-squad','BLADEGUARD VETERAN SQUAD'],
  ['unit-lieutenant-in-reiver-armour','unit-reiver-squad','REIVER SQUAD'],
  ['unit-cato-sicarius','unit-victrix-honour-guard','VICTRIX HONOUR GUARD']
];
const expectedStats={M:'6"',T:'4',Sv:'3+',W:'6',Ld:'6+',OC:'1',Invulnerable:'4+'};
const expectedWeapons=[
  {name:'Bolt pistol',mode:'ranged',range:'12"',a:'1',skill:'2+',s:'4',ap:'0',d:'1',abilities:'Pistol'},
  {name:'Master-crafted bolter',mode:'ranged',range:'24"',a:'2',skill:'2+',s:'4',ap:'-1',d:'2',abilities:'Assault, Heavy'},
  {name:'Master-crafted chainsword',mode:'melee',range:'Melee',a:'8',skill:'2+',s:'5',ap:'-1',d:'2',abilities:'Anti-Infantry 2+'}
];
const expectedAbilities=['Feel No Pain 5+','Honour of Ultramar','Leader','Oath of Moment','Press the Attack'];
const press='Weapons equipped by models in this model\u2019s unit have the [SUSTAINED HITS 1] ability.';
const honour='If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 2+, do not remove it from play. This model can fight after the attacking unit has finished making its attacks. If one or more enemy models are destroyed as a result of those attacks, this model regains D3 lost wounds and is not destroyed; otherwise, it is removed from play.';
const equipment='1 Captain Titus \u2013 Epic Hero\nThis model is equipped with: bolt pistol; master-crafted bolter; master-crafted chainsword.';
const expectedLeaders=['Assault Intercessor Squad','Bladeguard Veteran Squad','Company Heroes','Hellblaster Squad','Infernus Squad','Intercessor Squad','Sternguard Veteran Squad','Victrix Honour Guard','Wardens of Ultramar'];
const sources=new Map();
const read=file=>{if(!sources.has(file))sources.set(file,fs.readFileSync(path.join(root,file),'utf8'));return sources.get(file);};
const plain=value=>JSON.parse(JSON.stringify(value));
const normalize=value=>String(value).replace(/\s+/g,' ').trim();
const sameTitle=(a,b)=>normalize(a).toLowerCase()===normalize(b).toLowerCase();
const script=(source,name)=>{const scope={window:{}};vm.runInNewContext(source,scope);return plain(scope.window[name]);};
const weapon=profile=>Object.fromEntries(Object.keys(expectedWeapons[0]).map(key=>[key,key==='name'?(profile.name||profile.title):profile[key]]));

function payload(stats,weapons,abilities,label){
  assert.deepEqual(stats,expectedStats,`${label}: exact Titus stats including W6 and invulnerable 4+`);
  assert.deepEqual(weapons.map(weapon),expectedWeapons,`${label}: exact three current Titus weapons`);
  assert.deepEqual(abilities.map(a=>a.title).sort(),expectedAbilities,`${label}: exact current Titus ability set`);
  assert.equal(normalize(abilities.find(a=>a.title==='Press the Attack').text),press,`${label}: frozen Press the Attack text`);
  assert.equal(normalize(abilities.find(a=>a.title==='Honour of Ultramar').text),honour,`${label}: frozen Honour of Ultramar text`);
}

export function runQa(overrides={}){
  const source=file=>overrides[file]??read(file),json=file=>JSON.parse(source(file));
  const canonical=json(canonicalPath).datasheets,titus=canonical.find(u=>u.id===titusId);
  assert.equal(canonical.filter(u=>u.id===titusId).length,1,'one Captain Titus owner');
  assert.equal(canonical.some(u=>u.id==='unit-lieutenant-titus'),false,'no resurrected Lieutenant Titus');
  assert.equal(titus.title,'Captain Titus');
  assert.equal(titus.points[0].value,100,'unchanged Titus points');
  assert.deepEqual(titus.relations.leader,expectedLeaders,'unchanged nine Titus Leader facts');
  assert.deepEqual(titus.composition,[{name:'Captain Titus',min:1,max:1,models:['Captain Titus']}]);
  payload(titus.profiles[0].stats,titus.weapons,titus.abilities,'canonical');
  const wargear=json(wargearPath).units.filter(u=>u.title==='Captain Titus');
  assert.equal(wargear.length,1,'one Titus equipment owner');
  assert.equal(wargear[0].composition,equipment,'exact current Titus equipment and composition');
  assert.deepEqual(wargear[0].wargear,[],'no invented Titus wargear options');
  for(const [sourceId,,title] of facts){
    const unit=canonical.find(u=>u.id===sourceId);
    assert.equal(unit.relations.support.filter(t=>sameTitle(t,title)).length,1,`owner Support ${sourceId}>${title}`);
    assert.equal(unit.relations.leader.filter(t=>sameTitle(t,title)).length,0,`Support must not become Leader ${sourceId}`);
    assert.ok(unit.abilities.some(a=>a.title==='Support'&&a.text.includes(title)),`${sourceId}: visible Support prose`);
  }
  const catalogs=Object.fromEntries(books.map(book=>[book,script(source(`books/${book}/scripts/roster-data.js`),'WH_BOOK_ROSTER_CATALOG')]));
  const points=script(source('roster-guides/points-data.js'),'WH_POINTS_CATALOG');
  const catalogTitus=catalogs['space-marines'].units.find(u=>u.id===titusId);
  payload(catalogTitus.gameSelections.stats,catalogTitus.gameSelections.weaponProfiles,catalogTitus.gameSelections.abilities,'generated catalog');
  assert.deepEqual(catalogTitus.gameSelections.selections.map(s=>s.title),expectedWeapons.map(w=>w.name),'exact selectable Titus equipment');
  assert.deepEqual(catalogTitus.gameSelections.models.map(m=>m.title),['Captain Titus']);
  let direct=0,inverse=0;
  for(const book of books){
    const catalog=catalogs[book],pointUnits=Object.values(points[book.replaceAll('-',' ')].units);
    const own=json(`books/${book}/content/${book}-codex-datasheets.en.json`).datasheets;
    const config=json(`books/${book}/book.config.json`);
    for(const [sourceId,targetId] of facts){
      const eligible=sourceId!=='unit-cato-sicarius'||book==='space-marines';
      if(book!=='space-marines'){
        assert.equal(own.some(u=>u.id===sourceId),false,`${book}: no duplicate SM owner ${sourceId}`);
        assert.equal((config.dependencyDatasheets?.relationAdds||[]).some(r=>r.sourceId===sourceId&&r.targetId===targetId),false,`${book}: no local repair overlay`);
      }
      for(const [label,units] of [['book',catalog.units],['points',pointUnits]]){
        const find=id=>units.find(u=>(u.id||u.unitId)===id),a=find(sourceId),b=find(targetId);
        if(!eligible){
          assert.equal(Boolean(a),false,`${book} ${label}: Cato chapter leak`);
          assert.equal(Boolean(b),false,`${book} ${label}: Victrix chapter leak`);
          continue;
        }
        assert.ok(a&&b,`${book} ${label}: both Support endpoints`);
        const d=(a.relations.canSupport||[]).filter(r=>r.unitId===targetId),i=(b.relations.canBeSupportedBy||[]).filter(r=>r.unitId===sourceId);
        assert.equal(d.length,1,`${book} ${label}: direct Support ${sourceId}>${targetId}`);
        assert.equal(i.length,1,`${book} ${label}: inverse Support ${targetId}<${sourceId}`);
        if(label==='book')assert.deepEqual({...d[0],unitId:sourceId},i[0],`${book} ${label}: exact inverse metadata`);
        else{
          // Points relations enrich each direction with its own destination metadata.
          for(const [edge,id] of [[d[0],targetId],[i[0],sourceId]]){
            const keywords=catalog.units.find(u=>u.id===id).intrinsicKeywords.map(k=>k.toUpperCase()).sort();
            assert.deepEqual([...edge.keywords].sort(),keywords,`${book}: points relation endpoint keywords ${id}`);
            assert.equal(edge.characterCount,keywords.includes('CHARACTER')?1:0,`${book}: points relation endpoint Character count ${id}`);
          }
          assert.deepEqual({...d[0],unitId:sourceId,keywords:i[0].keywords,characterCount:i[0].characterCount},i[0],`${book}: exact inverse capacity and rule metadata`);
        }
        assert.equal((a.relations.canLead||[]).some(r=>r.unitId===targetId),false,`${book} ${label}: repaired role is Support`);
        if(label==='book'){direct++;inverse++;}
      }
    }
  }
  assert.deepEqual({direct,inverse},{direct:10,inverse:10},'four owner facts produce exactly 10 direct / 10 inverse manifestations');
  const registry=json('glossary/registry.en.json').terms;
  assert.equal(registry['space-marines-ability-honour-of-the-chapter'],undefined,'obsolete Titus full-entry removed');
  assert.equal(normalize(registry['space-marines-ability-press-the-attack'].definition.en),press,'full-entry Press the Attack');
  assert.equal(normalize(registry['space-marines-ability-honour-of-ultramar'].definition.en),honour,'full-entry Honour of Ultramar');
  return {catalogs,points,direct,inverse};
}

function mutations(){
  const canonical=JSON.parse(read(canonicalPath));
  const cases=[
    ['W6 to W5',d=>{d.datasheets.find(u=>u.id===titusId).profiles[0].stats.W='5';},/exact Titus stats/],
    ['remove invulnerable',d=>{delete d.datasheets.find(u=>u.id===titusId).profiles[0].stats.Invulnerable;},/exact Titus stats/],
    ['restore obsolete weapon',d=>{d.datasheets.find(u=>u.id===titusId).weapons.push({name:'Astartes chainsword',mode:'melee',range:'Melee',a:'8',skill:'2+',s:'4',ap:'-1',d:'1',abilities:'Anti-Infantry 2+'});},/exact three current Titus weapons/],
    ...facts.map(([id,,title])=>[`delete Support ${id}`,d=>{const u=d.datasheets.find(u=>u.id===id);u.relations.support=u.relations.support.filter(t=>!sameTitle(t,title));},/owner Support/]),
    ...facts.map(([id,,title])=>[`convert Support to Leader ${id}`,d=>{const u=d.datasheets.find(u=>u.id===id);u.relations.support=u.relations.support.filter(t=>!sameTitle(t,title));u.relations.leader.push(title);},/owner Support/])
  ];
  const killed=(label,overrides,pattern)=>{
    let failure;try{runQa(overrides);}catch(error){failure=error;}
    assert.ok(failure instanceof assert.AssertionError,`${label}: intended assertion must fail, not crash or survive`);
    assert.match(failure.message,pattern,`${label}: intended oracle`);
    console.log(`MUTATION KILLED: ${label} (${failure.message.split('\n')[0]})`);
  };
  for(const [label,mutate,pattern] of cases){const copy=plain(canonical);mutate(copy);killed(label,{[canonicalPath]:JSON.stringify(copy)},pattern);}
  const baseline=runQa();
  for(const book of ['dark-angels','blood-angels']){
    const catalog=plain(baseline.catalogs[book]);
    catalog.units.push(...plain(baseline.catalogs['space-marines'].units.filter(u=>['unit-cato-sicarius','unit-victrix-honour-guard'].includes(u.id))));
    killed(`Cato/Victrix leak into ${book}`,{[`books/${book}/scripts/roster-data.js`]:`window.WH_BOOK_ROSTER_CATALOG=${JSON.stringify(catalog)};`},/Cato chapter leak/);
  }
  runQa();console.log('RA04 mutations: PASS (13 mutants, six classes; isolated in-memory TEMP copies; unchanged positive controls PASS)');
}

async function browserChecks(state){
  const {chromium}=await import('playwright');
  const types={'.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.html':'text/html','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
  const server=createServer((req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));assert.ok(file.startsWith(root+path.sep));if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);}catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true}),errors=[];
  const raw=(unit,id,weapons=[])=>({id,canonicalUnitId:unit.id,name:unit.title,points:100,quantity:1,models:[{quantity:1,name:unit.gameSelections.models[0]?.title||unit.title,loadouts:weapons.map(wargear=>({quantity:1,wargear}))}]});
  const record=(book,id,units)=>({id,name:id,createdAt:'2026-09-11T00:00:00.000Z',updatedAt:'2026-09-11T00:00:00.000Z',sourceText:'',attachments:{},roster:{faction:state.catalogs[book].book.title,units,detachments:[],enhancements:[],warnings:[]}});
  const contextFor=async record=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});if(record)await context.addInitScript(r=>{if(!localStorage.getItem('wh40k-rosters-v1'))localStorage.setItem('wh40k-rosters-v1',JSON.stringify([r]));},record);const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));return {context,page};};
  const saved=(page,id)=>page.evaluate(id=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).find(r=>r.id===id),id);
  async function checkCard(page,personal){
    const card=page.locator(personal?'.unit-card.roster-game-view':'#unit-captain-titus');await card.waitFor();
    const actual=await card.evaluate(card=>({
      text:card.innerText,
      stats:Object.fromEntries([...card.querySelectorAll('.stat[data-source-field^="stats."]')].map(n=>[n.dataset.sourceField.slice(6),n.querySelector('span').textContent.trim()])),
      weapons:[...card.querySelectorAll('.weapon-row:not(.weapon-head)')].filter(n=>!n.hidden&&getComputedStyle(n).display!=='none').map(n=>({name:n.querySelector('.weapon-button').textContent.trim(),mode:n.dataset.mode,...Object.fromEntries(['range','a','skill','s','ap','d'].map(k=>[k,n.querySelector(`[data-source-field="${k}"]`).textContent.trim()])),abilities:[...n.querySelectorAll('.weapon-tags .tag')].map(x=>x.textContent.trim()).join(', ')})),
      composition:card.querySelector('[id$="-composition"]').innerText
    }));
    for(const [key,value] of Object.entries(expectedStats).filter(([key])=>key!=='Invulnerable'))assert.equal(actual.stats[key],value,`${personal?'personal':'normal'} visible Titus ${key}`);
    assert.match(actual.text,/(?:invulnerable(?: save)?\s*4\+|4\+\s*invulnerable)/i,'visible invulnerable 4+');
    const visibleWeapons=expectedWeapons.map(w=>({...w,abilities:(w.abilities+(personal?', Sustained Hits 1':'')).toLowerCase()}));
    assert.deepEqual(actual.weapons.map(w=>({...w,abilities:w.abilities.toLowerCase()})),visibleWeapons,personal?'exact personal weapons with preserved Press the Attack effect':'exact printed current Titus weapons');
    for(const title of expectedAbilities)assert.ok(actual.text.includes(title),`visible Titus ${title}`);
    assert.ok(normalize(actual.text).includes(press),'visible exact Press the Attack');
    assert.ok(normalize(actual.text).includes(honour),'visible exact Honour of Ultramar');
    assert.doesNotMatch(actual.text,/Honour of the Chapter|Heavy bolt pistol|Astartes chainsword|Lieutenant Titus/i);
    if(!personal)assert.ok(normalize(actual.composition).includes(normalize(equipment)),'normal exact equipment');
    else{assert.match(actual.composition,/1 model/);assert.match(actual.composition,/Captain Titus/);const game=await page.evaluate(()=>WH_ARMY_ROSTER_GAME_PROJECTION.units.find(u=>u.identity.instanceId==='titus-1'));assert.deepEqual(game.effective.stats,expectedStats,'personal effective Titus stats');assert.equal(game.effective.weaponProfiles.length,3,'three selected personal profiles');}
    return card;
  }
  try{
    if(!process.argv.includes('--browser-support')){
    const titus=state.catalogs['space-marines'].units.find(u=>u.id===titusId),titusRecord=record('space-marines','ra04-titus',[raw(titus,'titus-1',expectedWeapons.map(w=>w.name))]);
    const {context,page}=await contextFor(titusRecord);
    try{
      for(const view of process.argv.includes('--browser-full-entry')?[]:['mobile','full']){
        await page.goto(`${origin}/books/space-marines/reader.html?view=${view}#${titusId}`);await checkCard(page,false);
        await page.goto(`${origin}/books/space-marines/reader.html?view=${view}&roster=${titusRecord.id}&rosterInstance=titus-1#${titusId}`);await checkCard(page,true);
        console.log(`BROWSER Titus ${view}: normal + personal exact payload PASS`);
      }
      await page.goto(`${origin}/books/space-marines/reader.html?view=mobile#${titusId}`);const card=await checkCard(page,false);
      await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));
      const termIds=await card.locator('.weapon-row:not(.weapon-head) .weapon-button').evaluateAll(ns=>ns.map(n=>n.dataset.term));
      for(const [index,id] of termIds.entries()){
        await page.evaluate(id=>DG_APP.fullEntry.open(id),id);await page.locator('.full-entry-layer:not([hidden])').waitFor();
        const term=await page.evaluate(id=>WH40K_GLOSSARY.get(id),id);
        assert.equal(term.title.en,expectedWeapons[index].name,'full-entry current weapon identity');
        const w=expectedWeapons[index],skill=w.mode==='melee'?'WS':'BS',expectedProfile={Range:w.range,A:w.a,[skill]:w.skill,S:w.s,AP:w.ap,D:w.d};
        const profile=await page.locator('.full-entry-profile > div').evaluateAll(ns=>Object.fromEntries(ns.map(n=>[n.querySelector('small').textContent,n.querySelector('strong').textContent])));
        assert.deepEqual(profile,expectedProfile,'full-entry exact labelled weapon profile');
        assert.deepEqual(term.structured.weapon,expectedProfile,'full-entry structured source agrees with rendered profile');
        // Existing profile modals render numeric fields; keywords remain in the full canonical definition.
        assert.equal(term.definition.en,[w.mode==='melee'?'Melee':'Ranged',w.range,`A ${w.a}`,`${skill} ${w.skill}`,`S ${w.s}`,`AP ${w.ap}`,`D ${w.d}`,w.abilities].join(' \u00b7 '),'full-entry exact weapon definition including keywords');
        await page.evaluate(()=>DG_APP.fullEntry.close());
      }
      for(const [id,text] of [['space-marines-ability-press-the-attack',press],['space-marines-ability-honour-of-ultramar',honour]]){
        await page.evaluate(id=>DG_APP.fullEntry.open(id),id);assert.equal(normalize(await page.locator('.full-entry-definition').innerText()),text,'full-entry exact current Titus ability');await page.evaluate(()=>DG_APP.fullEntry.close());
      }
      console.log('BROWSER Titus full-entry: three current weapon profiles + two exact ability texts PASS');
    }finally{await context.close();}
    }
    if(process.argv.includes('--browser-full-entry')){assert.deepEqual(errors,[],'full-entry browser exceptions');return;}
    let count=0;
    for(const book of books)for(const [sourceId,targetId] of facts){
      if(book!=='space-marines'&&sourceId==='unit-cato-sicarius')continue;
      const catalog=state.catalogs[book],body=catalog.units.find(u=>u.id===targetId),support=catalog.units.find(u=>u.id===sourceId),r=record(book,`ra04-support-${count++}`,[raw(body,'body-1'),raw(support,'support-1')]);
      const {context,page}=await contextFor(r);
      try{
        await page.goto(`${origin}/roster-guides/index.html`);await page.locator(`[data-edit-attachments="${r.id}"]`).click();
        const select=page.locator('select[data-attachment-bodyguard="body-1"]').filter({has:page.locator('option[value="support-1"]')});
        assert.equal(await select.count(),1,`${book}: repaired editor candidate ${sourceId}`);await select.selectOption('support-1');
        assert.deepEqual((await saved(page,r.id)).attachments,{'body-1':['support-1']},'explicit repaired Support assignment');
        await page.reload();assert.deepEqual((await saved(page,r.id)).attachments,{'body-1':['support-1']},'repaired Support reload');
        for(const [unit,instance,key,other] of [[body,'body-1','leaders','support-1'],[support,'support-1','leading','body-1']]){
          await page.goto(`${origin}/books/${book}/reader.html?view=mobile&roster=${r.id}&rosterInstance=${instance}#${unit.id}`);
          await page.locator(`.unit-card.roster-game-view[data-roster-instance="${instance}"]`).waitFor();
          const relations=await page.evaluate(({instance,key})=>WH_ARMY_ROSTER_GAME_PROJECTION.units.find(u=>u.identity.instanceId===instance).attachments[key],{instance,key});
          assert.equal(relations.length,1,'one current attachment manifestation');assert.equal(relations[0].instanceId,other,'exact physical counterpart');assert.equal(relations[0].certainty,'current');
        }
        console.log(`BROWSER Support candidate / attach / reload / direct+inverse projection PASS ${book}: ${sourceId}>${targetId}`);
      }finally{await context.close();}
    }
    assert.equal(count,10);assert.deepEqual(errors,[],'RA04 browser application exceptions');
    console.log(process.argv.includes('--browser-support')?'RA04 browser Support: PASS (all 10 workflows)':'RA04 browser: PASS (Titus normal/personal mobile+full, full-entry, all 10 Support workflows)');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const state=runQa();console.log('RA04 canonical/catalog/points/glossary QA: PASS (4 SM owner facts, 10 direct / 10 exact inverse, chapter exclusions)');
  if(process.argv.includes('--mutations'))mutations();
  if(['--browser','--browser-full-entry','--browser-support'].some(flag=>process.argv.includes(flag)))await browserChecks(state);
}
