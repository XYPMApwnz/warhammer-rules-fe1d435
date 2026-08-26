import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),mime={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const server=http.createServer((request,response)=>{const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname),file=path.resolve(root,`.${pathname==='/'?'/index.html':pathname}`);if(pathname==='/favicon.ico'){response.writeHead(204).end();return;}if(!file.startsWith(root)||!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404).end('Not found');return;}response.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true});

const fixtures={
  warrior:`+ FACTION KEYWORD: Tyranids
+ DETACHMENT: Warrior Bioform Onslaught
+ TOTAL ARMY POINTS: 215pts

Char1: 1x Winged Tyranid Prime (65 pts): Prime talons
3x Tyranid Warriors with Melee Bio-Weapons (75 pts): Tyranid Warrior claws and talons
3x Tyranid Warriors with Melee Bio-Weapons (75 pts): Tyranid Warrior claws and talons`,
  parasitic:`+ FACTION KEYWORD: Tyranids
+ DETACHMENT: Assimilation Swarm
+ TOTAL ARMY POINTS: 240pts

Char1: 1x Broodlord (80 pts): Broodlord Claws and Talons
Enhancement: Parasitic Biomorphology (+25 pts)
10x Genestealers (80 pts): Genestealer claws and talons
10x Genestealers (80 pts): Genestealer claws and talons`,
  reverse:`+ FACTION KEYWORD: Tyranids
+ DETACHMENT: Invasion Fleet
+ TOTAL ARMY POINTS: 385pts

Char1: 1x Neurotyrant (105 pts): Neurotyrant claws and lashes, Psychic scream
Enhancement: Adaptive Biology (+25 pts)
3x Zoanthropes (100 pts): Chitinous claws and teeth, Warp blast
Char2: 1x Hive Tyrant (100 pts): Monstrous bonesword and lash whip, Heavy venom cannon
3x Tyrant Guard (80 pts): Scything talons and rending claws`,
  ambush:`+ FACTION KEYWORD: Tyranids
+ DETACHMENT: Ambush Predators
+ TOTAL ARMY POINTS: 165pts

1x Lictor (55 pts): Lictor claws and talons
20x Termagants (110 pts): Fleshborer, Chitinous claws and teeth`,
  live:`+ FACTION KEYWORD: Tyranids
+ DETACHMENT: Synaptic Nexus
+ TOTAL ARMY POINTS: 110pts

20x Termagants (110 pts): Fleshborer, Chitinous claws and teeth`
};

try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  const importFixture=async(sourceText,attach=()=>({}))=>{await page.goto(`${base}/roster-guides/index.html`);const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length);await page.locator('#roster-input').fill(sourceText);await page.locator('#roster-form button[type="submit"]').click();await page.waitForFunction(count=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length>count,before);return page.evaluate(fn=>{const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1')),record=records[0];record.attachments=(0,eval)(`(${fn})`)(record.roster.units);record.roster.attachments=record.attachments;localStorage.setItem('wh40k-rosters-v1',JSON.stringify(records));return{id:record.id,units:record.roster.units.map(unit=>({id:unit.id,name:unit.name}))};},attach.toString());};
  const open=async(roster,instance,canonical)=>{await page.goto(`${base}/books/tyranids/reader.html?view=mobile&roster=${encodeURIComponent(roster)}&rosterInstance=${encodeURIComponent(instance)}#${canonical}`);await page.waitForFunction(id=>document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(id)}"]`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instance);return page.evaluate(id=>{const projection=window.WH_ARMY_ROSTER_GAME_PROJECTION,gameUnit=projection.units.find(unit=>unit.identity.instanceId===id),card=document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(id)}"]`),rows=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')];return{gameUnit,enhancements:window.WH_ARMY_ROSTER_PROJECTION.enhancements,text:card.innerText,references:[...card.querySelectorAll('[data-roster-canonical-reference-id]')].map(node=>({id:node.dataset.rosterCanonicalReferenceId,text:node.innerText})),visibleRows:rows.filter(row=>getComputedStyle(row).display!=='none'&&row.getBoundingClientRect().height>0).map(row=>row.dataset.rosterProfileId||row.id),badHidden:rows.filter(row=>row.hidden&&(getComputedStyle(row).display!=='none'||row.getBoundingClientRect().height>0)).length,active:card.querySelector('.roster-game-effects')?.innerText||'',composition:card.querySelector('[id$="-composition"]')?.innerText||'',mounted:document.querySelectorAll('.document .unit-card:not([hidden])').length,duplicateIds:[...document.querySelectorAll('[id]')].map(node=>node.id).filter((value,index,all)=>all.indexOf(value)!==index)};},instance);};
  const byName=(record,name,index=0)=>record.units.filter(unit=>unit.name===name)[index];

  const warrior=await importFixture(fixtures.warrior,units=>{const leader=units.find(unit=>unit.name==='Winged Tyranid Prime'),body=units.filter(unit=>unit.name==='Tyranid Warriors with Melee Bio-Weapons')[0];return{[body.id]:[leader.id]};}),warriorLeader=byName(warrior,'Winged Tyranid Prime'),warriorBody=byName(warrior,'Tyranid Warriors with Melee Bio-Weapons'),warriorDuplicate=byName(warrior,'Tyranid Warriors with Melee Bio-Weapons',1);
  const leadingPrime=await open(warrior.id,warriorLeader.id,'unit-winged-tyranid-prime');assert.match(leadingPrime.active,/Winged Tyranid Prime → SUSTAINED HITS 1/);assert.doesNotMatch(leadingPrime.active,/Datasheet →/);
  const attachedWarrior=await open(warrior.id,warriorBody.id,'unit-tyranid-warriors-with-melee-bio-weapons');assert.ok(attachedWarrior.gameUnit.effective.weaponProfiles.some(profile=>profile.tags.includes('SUSTAINED HITS 1')));assert.equal(attachedWarrior.gameUnit.effective.stats.Invulnerable,'5+');assert.ok(attachedWarrior.gameUnit.effective.keywords.includes('BATTLELINE'));assert.equal(attachedWarrior.mounted,1);assert.deepEqual(attachedWarrior.duplicateIds,[]);
  const duplicateWarrior=await open(warrior.id,warriorDuplicate.id,'unit-tyranid-warriors-with-melee-bio-weapons');assert.equal(duplicateWarrior.gameUnit.effective.weaponProfiles.some(profile=>profile.tags.includes('SUSTAINED HITS 1')),false);assert.equal(duplicateWarrior.gameUnit.effects.some(effect=>effect.source?.ownerInstanceId===warriorLeader.id),false);

  const parasitic=await importFixture(fixtures.parasitic,units=>{const leader=units.find(unit=>unit.name==='Broodlord'),body=units.filter(unit=>unit.name==='Genestealers')[0];return{[body.id]:[leader.id]};}),broodlord=byName(parasitic,'Broodlord'),genestealers=byName(parasitic,'Genestealers'),genestealerDuplicate=byName(parasitic,'Genestealers',1);
  const attachedGenestealers=await open(parasitic.id,genestealers.id,'unit-genestealers'),parasiticRef=attachedGenestealers.references.find(item=>item.id==='enhancement-parasitic-biomorphology');assert.equal(attachedGenestealers.gameUnit.effective.weaponProfiles.find(profile=>profile.mode==='melee').values.S,'5',JSON.stringify({effects:attachedGenestealers.gameUnit.effects,attachments:attachedGenestealers.gameUnit.attachments,loadout:attachedGenestealers.gameUnit.selection.loadout,enhancements:attachedGenestealers.enhancements}));assert.ok(attachedGenestealers.gameUnit.effective.weaponProfiles.find(profile=>profile.mode==='melee').tags.includes('DEVASTATING WOUNDS'));assert.ok(parasiticRef&&/first time the bearer.s unit destroys an enemy unit/i.test(parasiticRef.text));assert.match(parasiticRef.text,/Broodlord/);assert.doesNotMatch(attachedGenestealers.active,/Parasitic Biomorphology/);assert.equal(attachedGenestealers.gameUnit.effective.weaponProfiles.find(profile=>profile.mode==='melee').values.A,'4');
  const plainGenestealers=await open(parasitic.id,genestealerDuplicate.id,'unit-genestealers');assert.equal(plainGenestealers.gameUnit.effective.weaponProfiles.find(profile=>profile.mode==='melee').values.S,'4');assert.equal(plainGenestealers.references.some(item=>item.id==='enhancement-parasitic-biomorphology'),false);assert.equal(plainGenestealers.gameUnit.effects.some(effect=>effect.source?.ownerInstanceId===broodlord.id),false);

  const reverse=await importFixture(fixtures.reverse,units=>{const neuro=units.find(unit=>unit.name==='Neurotyrant'),zoan=units.find(unit=>unit.name==='Zoanthropes'),hive=units.find(unit=>unit.name==='Hive Tyrant'),guard=units.find(unit=>unit.name==='Tyrant Guard');return{[zoan.id]:[neuro.id],[guard.id]:[hive.id]};}),neuro=byName(reverse,'Neurotyrant'),zoan=byName(reverse,'Zoanthropes'),hive=byName(reverse,'Hive Tyrant');
  const zoanthropes=await open(reverse.id,zoan.id,'unit-zoanthropes'),nodeLash=zoanthropes.references.find(item=>item.id==='tyranids-ability-node-lash-psychic');assert.ok(nodeLash&&/target is Battle-shocked/i.test(nodeLash.text));assert.match(nodeLash.text,/Neurotyrant/);assert.doesNotMatch(zoanthropes.active,/Node Lash/);
  const neurotyrant=await open(reverse.id,neuro.id,'unit-neurotyrant');assert.ok(neurotyrant.references.some(item=>item.id==='enhancement-adaptive-biology'));assert.ok(neurotyrant.gameUnit.effective.abilities.some(ability=>ability.title==='Feel No Pain 5+'));assert.equal(neurotyrant.gameUnit.effective.abilities.some(ability=>ability.title==='Feel No Pain 4+'),false);
  const hiveTyrant=await open(reverse.id,hive.id,'unit-hive-tyrant');assert.ok(hiveTyrant.gameUnit.effective.abilities.some(ability=>ability.title==='Feel No Pain 5+'));assert.match(hiveTyrant.active,/Tyrant Guard/);

  const ambush=await importFixture(fixtures.ambush),lictorUnit=byName(ambush,'Lictor'),termagants=byName(ambush,'Termagants');
  const lictor=await open(ambush.id,lictorUnit.id,'unit-lictor');assert.ok(lictor.references.some(item=>item.id==='tyranids-detachment-rule-mindhunger'&&/re-roll hit rolls of 1/i.test(item.text)));assert.ok(lictor.gameUnit.effective.abilities.some(ability=>ability.title==='Deep Strike'));
  const termagant=await open(ambush.id,termagants.id,'unit-termagants');assert.equal(termagant.references.some(item=>item.id==='tyranids-detachment-rule-mindhunger'),false);assert.equal(termagant.visibleRows.length,2);assert.equal(termagant.badHidden,0);assert.match(termagant.composition,/20 models/i);assert.doesNotMatch(termagant.composition,/10-20 Termagants|Every model is equipped/i);

  const live=await importFixture(fixtures.live),liveTermagants=byName(live,'Termagants'),liveCard=await open(live.id,liveTermagants.id,'unit-termagants');assert.ok(liveCard.references.some(item=>item.id==='tyranids-detachment-rule-synaptic-imperatives'));assert.equal(liveCard.gameUnit.effective.stats.Invulnerable,'');assert.equal(liveCard.gameUnit.effective.weaponProfiles.find(profile=>profile.mode==='melee').values.S,'3');assert.doesNotMatch(liveCard.active,/Synaptic Imperatives|Invulnerable|Synapse/i);

  await page.goto(`${base}/books/tyranids/reader.html?view=mobile#unit-genestealers`);await page.waitForFunction(()=>document.querySelector('#unit-genestealers')&&window.DG_APP);const normal=await page.evaluate(()=>({game:document.querySelector('#unit-genestealers').classList.contains('roster-game-view'),changes:document.querySelectorAll('#unit-genestealers .roster-modified,#unit-genestealers .roster-game-derived-ability').length,composition:document.querySelector('#unit-genestealers [id$="-composition"]')?.innerText||''}));assert.equal(normal.game,false);assert.equal(normal.changes,0);assert.match(normal.composition,/Every model is equipped/i);assert.deepEqual(errors,[],'browser console errors');
  console.log('Tyranids production-shaped roster DOM conformance: PASS.');await context.close();
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
