import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createRosterFixture} from '../helpers/roster-fixtures.mjs';
import {runTauAuxiliaryBrowser} from '../tau-auxiliary-provenance-qa.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),mime={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const fixtureScope=vm.createContext({window:{}});for(const file of ['books/tau-empire/scripts/roster-data.js','roster-guides/points-data.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),fixtureScope,{filename:file});
const catalog=fixtureScope.window.WH_BOOK_ROSTER_CATALOG,pointsCatalog=fixtureScope.window.WH_POINTS_CATALOG['t au empire'];
const server=http.createServer((request,response)=>{const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname),file=path.resolve(root,`.${pathname==='/'?'/index.html':pathname}`);if(pathname==='/favicon.ico'){response.writeHead(204).end();return;}if(!file.startsWith(root)||!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404).end('Not found');return;}response.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
const fixture=createRosterFixture({catalog,pointsCatalog,id:'tau-final-conformance',detachmentId:'kauyon',attachments:{'parsed-unit-4':['parsed-unit-1']},units:[
  {datasheetId:'unit-cadre-fireblade',instanceId:'parsed-unit-1',selectionIds:['unit-cadre-fireblade-selection-close-combat-weapon','unit-cadre-fireblade-selection-fireblade-pulse-rifle','unit-cadre-fireblade-selection-marker-drone']},
  {datasheetId:'unit-ethereal',instanceId:'parsed-unit-2',selectionIds:['unit-ethereal-selection-honour-stave','unit-ethereal-selection-hover-drone','unit-ethereal-selection-marker-drone','unit-ethereal-selection-shield-drone'],enhancementId:'enhancement-precision-of-the-patient-hunter'},
  {datasheetId:'unit-cadre-fireblade',instanceId:'parsed-unit-3',selectionIds:['unit-cadre-fireblade-selection-close-combat-weapon','unit-cadre-fireblade-selection-fireblade-pulse-rifle']},
  {datasheetId:'unit-breacher-team',instanceId:'parsed-unit-4',quantity:10,selectionIds:['unit-breacher-team-selection-close-combat-weapon','unit-breacher-team-selection-pulse-blaster','unit-breacher-team-selection-pulse-pistol','unit-breacher-team-selection-guardian-drone']},
  {datasheetId:'unit-breacher-team',instanceId:'parsed-unit-5',quantity:10,selectionIds:['unit-breacher-team-selection-close-combat-weapon','unit-breacher-team-selection-pulse-blaster','unit-breacher-team-selection-pulse-pistol']},
]});
// Independent base/effective expectations, never base + the actual effect.delta.
const breacherBase={
  'unit-breacher-team-profile-pulse-pistol-ranged':'1',
  'unit-breacher-team-profile-pulse-blaster-ranged-3':'2',
  'unit-breacher-team-profile-close-combat-weapon-melee-2':'1'
};
const breacherVolley={
  'unit-breacher-team-profile-pulse-pistol-ranged':'2',
  'unit-breacher-team-profile-pulse-blaster-ranged-3':'3',
  'unit-breacher-team-profile-close-combat-weapon-melee-2':'1'
};
const firebladeBase={
  'unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged':'1',
  'unit-cadre-fireblade-profile-close-combat-weapon-melee-2':'3'
};
const firebladeVolley={
  'unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged':'2',
  'unit-cadre-fireblade-profile-close-combat-weapon-melee-2':'3'
};
const assertAttacks=(snapshot,instanceId,canonicalId,base,expected,owner=null)=>{
  const member=snapshot.gameUnit,profileIds=Object.keys(expected).sort();
  assert.equal(member.identity.instanceId,instanceId,'exact physical game unit');
  assert.equal(member.identity.canonicalDatasheetId,canonicalId,`${instanceId}: canonical identity`);
  assert.equal(member.selection.loadout.weaponResolution.state,'resolved',`${instanceId}: fixture equipment resolves`);
  assert.deepEqual([...member.selection.loadout.selectedProfileIds].sort(),profileIds,`${instanceId}: exact selected equipment`);
  assert.deepEqual(snapshot.attackCells.map(cell=>cell.profileId).sort(),profileIds,`${instanceId}: exactly one visible row per selected profile`);
  for(const [profileId,value] of Object.entries(expected)){
    assert.equal(snapshot.baseProfiles.find(profile=>profile.id===profileId)?.A,base[profileId],`${instanceId}/${profileId}: canonical base A`);
    assert.equal(member.effective.weaponProfiles.find(profile=>profile.id===profileId)?.values.A,value,`${instanceId}/${profileId}: semantic A`);
    const cell=snapshot.attackCells.find(item=>item.profileId===profileId);
    assert.equal(cell.instanceId,instanceId,`${profileId}: rendered physical owner`);
    assert.equal(cell.A,value,`${instanceId}/${profileId}: rendered A cell`);
  }
  const volley=member.effects.filter(effect=>effect.id==='volley-fire');
  assert.equal(volley.length,owner?1:0,`${instanceId}: exactly one owned Volley Fire, or none`);
  if(owner){
    const effect=volley[0];
    assert.deepEqual({id:effect.id,component:effect.component,targetId:effect.targetId,operation:effect.operation,stat:effect.stat,delta:effect.delta,targetInstanceId:effect.targetInstanceId,targetState:effect.targetState,source:effect.source},
      {id:'volley-fire',component:'weapon',targetId:'ranged',operation:'add-stat',stat:'A',delta:1,targetInstanceId:instanceId,targetState:'resolved',source:{kind:'explicit-attachment',id:'tau-empire-ability-volley-fire',ownerInstanceId:owner}},`${instanceId}: exact Volley Fire recipe and physical owner`);
    const targets=Object.keys(expected).filter(id=>base[id]!==expected[id]).sort().map(profileId=>({profileId,field:'A',base:base[profileId],effective:expected[profileId]}));
    assert.deepEqual([...effect.targets].sort((a,b)=>a.profileId.localeCompare(b.profileId)),targets,`${instanceId}: exact ranged numeric reduction targets`);
  }
};
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${base}/roster-guides/index.html`);const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').map(record=>record.id));await page.locator('#roster-input').fill(fixture.record.sourceText);await page.locator('#roster-form button[type="submit"]').click();await page.waitForFunction(ids=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').some(record=>!ids.includes(record.id)),before);
  const imported=await page.evaluate(({previous,attachments})=>{const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1')),record=records.find(item=>!previous.includes(item.id));record.attachments=attachments;record.roster.attachments=attachments;localStorage.setItem('wh40k-rosters-v1',JSON.stringify(records));return{roster:record.id,unitIds:record.roster.units.map(unit=>unit.id)};},{previous:before,attachments:fixture.record.attachments});
  assert.deepEqual(imported.unitIds,fixture.units.map(unit=>unit.instanceId),'parser changed canonical T\'au fixture physical order');
  const ids={roster:imported.roster,fireblade:fixture.units[0].instanceId,ethereal:fixture.units[1].instanceId,loneFireblade:fixture.units[2].instanceId,body:fixture.units[3].instanceId,duplicate:fixture.units[4].instanceId};
  assert.equal(new Set([ids.fireblade,ids.loneFireblade,ids.ethereal,ids.body,ids.duplicate]).size,5,'distinct physical fixture identities');
  const inspect=instance=>page.evaluate(id=>{
    const projection=window.WH_ARMY_ROSTER_GAME_PROJECTION,gameUnit=projection.units.find(unit=>unit.identity.instanceId===id),card=document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(id)}"]`),rows=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')];
    const visible=rows.filter(row=>getComputedStyle(row).display!=='none'&&row.getBoundingClientRect().height>0);
    return{gameUnit,cardText:card.innerText,
      baseProfiles:window.WH_BOOK_ROSTER_CATALOG.units.find(unit=>unit.id===gameUnit.identity.canonicalDatasheetId).gameSelections.weaponProfiles.map(profile=>({id:profile.id,A:profile.a})),
      attackCells:visible.map(row=>({instanceId:row.closest('.unit-card').dataset.rosterInstance,profileId:row.dataset.rosterProfileId||row.id,A:row.querySelector('[data-label="A"]')?.innerText.trim()??null})),
      visibleRows:visible.map(row=>row.dataset.rosterProfileId||row.id),hiddenLayout:rows.filter(row=>row.hidden&&(getComputedStyle(row).display!=='none'||row.getBoundingClientRect().height>0)).length,composition:card.querySelector('[id$="-composition"]')?.innerText||'',references:[...card.querySelectorAll('[data-roster-canonical-reference-id]')].map(node=>({id:node.dataset.rosterCanonicalReferenceId,text:node.innerText})),active:card.querySelector('.roster-game-effects')?.innerText||'',phoneCards:document.querySelectorAll('.document .unit-card:not([hidden])').length,overflow:document.documentElement.scrollWidth>innerWidth};
  },instance);
  const open=async(instance,canonical)=>{await page.goto(`${base}/books/tau-empire/reader.html?view=mobile&roster=${encodeURIComponent(ids.roster)}&rosterInstance=${encodeURIComponent(instance)}#${canonical}`);await page.waitForFunction(id=>document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(id)}"]`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instance);return inspect(instance);};
  const body=await open(ids.body,'unit-breacher-team');assert.ok(body.gameUnit.effects.some(effect=>effect.id==='volley-fire'));assert.ok(body.gameUnit.effects.some(effect=>effect.id==='marker-drone-keyword'));assert.ok(body.gameUnit.effective.keywords.includes('MARKERLIGHT'));assert.ok(body.references.some(item=>item.id==='tau-empire-detachment-rule-patient-hunter'),JSON.stringify({detachments:body.gameUnit.rosterState.detachments,references:body.references,effects:body.gameUnit.effects.map(effect=>({id:effect.id,reference:effect.canonicalReference,targetState:effect.targetState}))}));assert.equal(body.gameUnit.effective.weaponProfiles.some(profile=>profile.tags.includes('SUSTAINED HITS 1')),false,'Kauyon live battle-round state auto-applied');assert.equal(body.gameUnit.selection.loadout.weaponResolution.state,'resolved');assert.equal(body.visibleRows.length,body.gameUnit.selection.loadout.selectedProfileIds.length);assert.equal(body.hiddenLayout,0);assert.match(body.composition,/10 models/i);assert.doesNotMatch(body.composition,/Every model is equipped|10[–-]20/i);assert.equal(body.phoneCards,1);assert.equal(body.overflow,false);
  assert.deepEqual(body.gameUnit.attachments.leaders.map(item=>item.instanceId),[ids.fireblade],'exact physical Fireblade attachment');
  assertAttacks(body,ids.body,'unit-breacher-team',breacherBase,breacherVolley,ids.fireblade);
  for(let pass=0;pass<2;pass++){
    // Force the real presentation path on the same DOM, not a title-only check.
    await page.evaluate(id=>{const card=document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(id)}"]`);card.removeAttribute('data-roster-game-instance');window.WHArmyRosterGamePresentation.install(card,window.WH_ARMY_ROSTER_PROJECTION);},ids.body);
    const rerendered=await inspect(ids.body);
    assertAttacks(rerendered,ids.body,'unit-breacher-team',breacherBase,breacherVolley,ids.fireblade);
    assert.deepEqual(rerendered.gameUnit,body.gameUnit,'rerender does not mutate the semantic projection');
  }
  const duplicate=await open(ids.duplicate,'unit-breacher-team');assert.equal(duplicate.gameUnit.effects.some(effect=>effect.id==='volley-fire'),false);assert.equal(duplicate.gameUnit.effects.some(effect=>effect.source?.ownerInstanceId===ids.fireblade),false);
  assert.equal(duplicate.gameUnit.attachments.leaders.length+duplicate.gameUnit.attachments.leading.length,0,'duplicate stays unattached');
  assertAttacks(duplicate,ids.duplicate,'unit-breacher-team',breacherBase,breacherBase);
  const leader=await open(ids.fireblade,'unit-cadre-fireblade');
  assert.deepEqual(leader.gameUnit.attachments.leading.map(item=>item.instanceId),[ids.body],'reciprocal physical bodyguard attachment');
  assertAttacks(leader,ids.fireblade,'unit-cadre-fireblade',firebladeBase,firebladeVolley,ids.fireblade);
  const loneLeader=await open(ids.loneFireblade,'unit-cadre-fireblade');
  assert.equal(loneLeader.gameUnit.attachments.leaders.length+loneLeader.gameUnit.attachments.leading.length,0,'second physical Fireblade is unattached');
  assertAttacks(loneLeader,ids.loneFireblade,'unit-cadre-fireblade',firebladeBase,firebladeBase);
  assertAttacks(await open(ids.body,'unit-breacher-team'),ids.body,'unit-breacher-team',breacherBase,breacherVolley,ids.fireblade);
  const ethereal=await open(ids.ethereal,'unit-ethereal');assert.equal(ethereal.gameUnit.effective.stats.M,'10"');assert.ok(ethereal.gameUnit.effective.keywords.includes('FLY'));assert.ok(ethereal.gameUnit.effective.keywords.includes('MARKERLIGHT'));assert.ok(ethereal.references.some(item=>item.id==='enhancement-precision-of-the-patient-hunter'));assert.doesNotMatch(ethereal.active,/Precision of the Patient Hunter/i);
  await page.goto(`${base}/books/tau-empire/reader.html?view=mobile#unit-breacher-team`);await page.waitForFunction(()=>document.querySelector('#unit-breacher-team')&&window.WHArmyBook);const normal=await page.evaluate(()=>({game:document.querySelector('#unit-breacher-team').classList.contains('roster-game-view'),changes:document.querySelectorAll('#unit-breacher-team .roster-modified,#unit-breacher-team .roster-game-derived-ability').length,composition:document.querySelector('#unit-breacher-team [id$="-composition"]')?.innerText||''}));assert.equal(normal.game,false);assert.equal(normal.changes,0);assert.match(normal.composition,/Every model is equipped/i);assert.deepEqual(errors,[],'browser console errors');
  await runTauAuxiliaryBrowser(page,base);assert.deepEqual(errors,[],'RA06 browser console errors');
  console.log("T'au production-shaped roster DOM conformance: PASS.");await context.close();
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
