import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.webp':'image/webp'};
const server=http.createServer((request,response)=>{const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),file=path.resolve(root,pathname.replace(/^\/+/, '')||'index.html');if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}),record=(id,sourceText,attachments={})=>({id,sourceText,attachments});
const attachedText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Court of the Phoenician
Char1: 1x Lord Exultant (80 pts): Bolt pistol, Phoenix power spear
Enhancement: Tears of the Phoenix (+25 pts)
10x Tormentors (110 pts): Bolt pistol, Boltgun, Close combat weapon, Icon of Excess
10x Tormentors (110 pts): Bolt pistol, Boltgun, Close combat weapon`;
const cacophonicText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Elegant Brutes
Char1: 1x Lord Kakophonist (70 pts): Screamer pistol, Power sword
Enhancement: Cacophonic Accompaniment (+20 pts)
10x Noise Marines (155 pts): Sonic blaster, Bolt pistol, Close combat weapon`;
const distortionText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Peerless Bladesmen
Char1: 1x Lord Exultant (80 pts): Bolt pistol, Phoenix power spear
Enhancement: Distortion (+25 pts)
Char2: 1x Lord Exultant (80 pts): Bolt pistol, Phoenix power spear`;
const wargearText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Mercurial Host
10x Daemonettes (100 pts)
• 1x Daemonette: Daemonic Icon, Instrument of Chaos, Slashing claws
• 9x Daemonette: Slashing claws
10x Daemonettes (100 pts)
• 10x Daemonette: Slashing claws
1x Keeper of Secrets (290 pts): Shining aegis, Witstealer sword`;
const darkText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Coterie of the Conceited
Char1: 1x Lord Exultant (80 pts): Bolt pistol, Phoenix power spear
Enhancement: Pledge of Dark Glory (+25 pts)
10x Infractors (120 pts): Bolt pistol, Power sword, Duelling sabre`;
const spectacleText=`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: Spectacle of Slaughter
5x Flawless Blades (110 pts): Blissblade, Bolt pistol
Enhancement: Eager Patrons (+20 pts)`;
const open=async(saved,instanceId,canonicalId)=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),saved);const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile&roster=${saved.id}&rosterInstance=${instanceId}#${canonicalId}`,{waitUntil:'networkidle'});await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===id)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${id}"]`),instanceId);return{context,page,errors};};
const state=(page,id)=>page.evaluate(instanceId=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${instanceId}"]`),visible=node=>Boolean(node&&!node.hidden&&getComputedStyle(node).display!=='none'&&node.getBoundingClientRect().height),rows=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')],ids=[...document.querySelectorAll('[id]')].map(node=>node.id);return{unit,text:card.innerText,refs:[...card.querySelectorAll('[data-roster-canonical-reference-id]')].map(node=>({id:node.dataset.rosterCanonicalReferenceId,title:node.querySelector('h5')?.textContent.trim()||'',text:node.querySelector('p')?.textContent.trim()||'',source:node.querySelector('.roster-game-ability-source')?.textContent.trim()||''})),active:card.querySelector('.roster-game-effects')?.innerText||'',hiddenLayout:rows.filter(row=>row.hidden&&visible(row)).length,composition:[...card.querySelectorAll('.unit-part')].find(part=>part.textContent.includes('Unit Composition'))?.innerText||'',mounted:document.querySelectorAll('.unit-card.roster-game-view').length,synthetic:card.querySelectorAll('[data-roster-derived-note]').length,duplicateIds:[...new Set(ids.filter((value,index)=>ids.indexOf(value)!==index))]};},id);
try{
  const attachedRecord=record('ec-attached',attachedText,{'parsed-unit-2':['parsed-unit-1']}),attached=await open(attachedRecord,'parsed-unit-2','unit-tormentors'),body=await state(attached.page,'parsed-unit-2'),tears=body.refs.find(item=>item.id==='tears of the phoenix'),court=body.refs.find(item=>item.id==='emperors-children-detachment-rule-sensational-performance');
  assert.ok(body.unit.effects.some(effect=>effect.id==='perfectionists-weapons'));assert.ok(body.unit.effects.some(effect=>effect.id==='canonical-tears-of-the-phoenix'));assert.equal(tears?.title,'Tears of the Phoenix');assert.equal(tears?.source,'Lord Exultant');assert.match(tears?.text||'',/ignore any or all modifiers/);assert.equal(court?.title,'Sensational Performance');assert.doesNotMatch(body.active,/Tears of the Phoenix|Sensational Performance/);assert.equal(body.synthetic,0);assert.equal(body.mounted,1);assert.equal(body.hiddenLayout,0);assert.match(body.text,/10 models/i);assert.doesNotMatch(body.text,/Every model is equipped|1 Obsessionist|4[–-]9 Tormentors/i);assert.deepEqual(body.duplicateIds,[]);assert.deepEqual(attached.errors,[]);await attached.context.close();
  const duplicate=await open(attachedRecord,'parsed-unit-3','unit-tormentors'),duplicateState=await state(duplicate.page,'parsed-unit-3');assert.equal(duplicateState.unit.effects.some(effect=>effect.source?.ownerInstanceId==='parsed-unit-1'),false);assert.equal(duplicateState.refs.some(item=>item.id==='tears of the phoenix'),false);await duplicate.context.close();
  const detached=await open(record('ec-detached',attachedText),'parsed-unit-2','unit-tormentors'),detachedState=await state(detached.page,'parsed-unit-2');assert.equal(detachedState.unit.effects.some(effect=>effect.id==='perfectionists-weapons'),false);assert.equal(detachedState.refs.some(item=>item.id==='tears of the phoenix'),false);await detached.context.close();
  const source=await open(attachedRecord,'parsed-unit-1','unit-lord-exultant'),sourceState=await state(source.page,'parsed-unit-1');assert.equal(await source.page.locator('[data-roster-enhancement="tears of the phoenix"]').count(),1);assert.ok(sourceState.unit.effective.abilities.some(item=>item.title==='Infiltrators'));assert.ok(sourceState.unit.effective.abilities.some(item=>item.title==='Scouts 6"'));assert.equal(sourceState.synthetic,0);await source.context.close();

  const cacophonicRecord=record('ec-cacophonic',cacophonicText,{'parsed-unit-2':['parsed-unit-1']}),noise=await open(cacophonicRecord,'parsed-unit-2','unit-noise-marines'),noiseState=await state(noise.page,'parsed-unit-2'),cacophonic=noiseState.refs.find(item=>item.id==='cacophonic accompaniment');assert.ok(noiseState.unit.effects.some(effect=>effect.id==='cacophonic-ignores-cover'));assert.equal(cacophonic?.source,'Lord Kakophonist');assert.match(cacophonic?.text||'',/Deep Strike.*IGNORES COVER/);assert.doesNotMatch(noiseState.active,/Cacophonic Accompaniment/);await noise.context.close();
  const kakophonist=await open(cacophonicRecord,'parsed-unit-1','unit-lord-kakophonist'),kakophonistState=await state(kakophonist.page,'parsed-unit-1');assert.ok(kakophonistState.unit.effective.abilities.some(item=>item.title==='Deep Strike'));assert.ok(kakophonistState.unit.effects.some(effect=>effect.id==='obsessive-annunciation'));await kakophonist.context.close();

  const distortionRecord=record('ec-distortion',distortionText),distorted=await open(distortionRecord,'parsed-unit-1','unit-lord-exultant'),distortedState=await state(distorted.page,'parsed-unit-1');assert.equal(distortedState.unit.effects.filter(effect=>effect.source?.id==='enhancement-distortion'&&effect.targetState==='resolved').length,2);assert.match(distortedState.active,/Distortion/);await distorted.context.close();const plain=await open(distortionRecord,'parsed-unit-2','unit-lord-exultant'),plainState=await state(plain.page,'parsed-unit-2');assert.equal(plainState.unit.effects.some(effect=>effect.source?.id==='enhancement-distortion'),false);await plain.context.close();

  const wargearRecord=record('ec-wargear',wargearText),icon=await open(wargearRecord,'parsed-unit-1','unit-daemonettes'),iconState=await state(icon.page,'parsed-unit-1');assert.equal(iconState.unit.effective.stats.Ld,'6+');assert.ok(iconState.unit.selection.loadout.selectedWargearAbilityIds.includes('unit-daemonettes-wargear-ability-daemonic-icon'));assert.equal(iconState.unit.effects.find(effect=>effect.id==='daemonic-icon-leadership')?.source?.id,'unit-daemonettes-wargear-ability-daemonic-icon');assert.match(iconState.text,/Daemonic Icon/);assert.match(iconState.text,/Instrument of Chaos/);await icon.context.close();const noIcon=await open(wargearRecord,'parsed-unit-2','unit-daemonettes'),noIconState=await state(noIcon.page,'parsed-unit-2');assert.equal(noIconState.unit.effects.some(effect=>effect.id==='daemonic-icon-leadership'),false);assert.doesNotMatch(noIconState.text,/Models in the bearer's unit have a Leadership characteristic of 6\+/);await noIcon.context.close();const keeper=await open(wargearRecord,'parsed-unit-3','unit-keeper-of-secrets'),keeperState=await state(keeper.page,'parsed-unit-3');assert.equal(keeperState.unit.effective.stats.Sv,'3+');assert.match(keeperState.text,/Shining aegis/);await keeper.context.close();

  const dark=await open(record('ec-dark',darkText,{'parsed-unit-2':['parsed-unit-1']}),'parsed-unit-2','unit-infractors'),darkState=await state(dark.page,'parsed-unit-2');assert.equal(darkState.unit.effective.stats.Ld,'5+');assert.equal(darkState.unit.effective.stats.OC,'3');assert.match(darkState.active,/Leadership|Objective Control|Ld|OC/);await dark.context.close();
  const spectacle=await open(record('ec-spectacle',spectacleText),'parsed-unit-1','unit-flawless-blades'),spectacleState=await state(spectacle.page,'parsed-unit-1');assert.equal(spectacleState.unit.effective.stats.M,'10"');assert.ok(spectacleState.unit.effective.abilities.some(item=>item.title==='Fights First'));assert.ok(spectacleState.refs.some(item=>item.id==='emperors-children-detachment-rule-entitled-to-victory'));assert.equal(spectacleState.unit.effects.some(item=>item.operation==='grant'&&item.targetId==='core-fights-first'),false);assert.doesNotMatch(spectacleState.active,/Entitled to Victory|Fights First/);await spectacle.context.close();
  const live=await open(record('ec-live',`+ FACTION KEYWORD: Chaos - Emperor's Children\n+ DETACHMENT: Peerless Bladesmen\n10x Tormentors (110 pts): Bolt pistol, Boltgun, Close combat weapon`),'parsed-unit-1','unit-tormentors'),liveState=await state(live.page,'parsed-unit-1');assert.ok(liveState.refs.some(item=>item.id==='emperors-children-detachment-rule-exquisite-swordsmanship'));assert.equal(liveState.unit.effects.some(effect=>effect.operation==='grant-tag'&&(effect.tag==='LETHAL HITS'||effect.tag==='SUSTAINED HITS 1')),false);assert.doesNotMatch(liveState.active,/Exquisite Swordsmanship/);await live.context.close();
  const normal=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),normalPage=await normal.newPage();await normalPage.goto(`${origin}/books/emperors-children/reader.html?view=mobile#unit-tormentors`);await normalPage.waitForSelector('#unit-tormentors');const normalState=await normalPage.evaluate(()=>({game:document.querySelector('#unit-tormentors').classList.contains('roster-game-view'),derived:document.querySelectorAll('#unit-tormentors .roster-modified,#unit-tormentors [data-roster-canonical-reference-id]').length,composition:document.querySelector('#tormentors-composition')?.innerText||''}));assert.equal(normalState.game,false);assert.equal(normalState.derived,0);assert.match(normalState.composition,/1 Obsessionist/);assert.match(normalState.composition,/4[–-]9 Tormentors/);await normal.close();
  console.log("Emperor's Children production-shaped full roster conformance QA: PASS");
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
