import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

// WBA-017 / RA-06: frozen official T'au Faction Pack v1.2 (26 August 2026).
// Complete Stealth card pp.7-8: four native abilities; Homing Beacon is wargear.
// Auxiliary Cadre p.3 owns the conditional grant, not the native datasheet.
// PDF SHA256: 143cf421a68cd067b376cd8b8d04c92301af9f4eb5a1d6717aba6d22940f5b9c.
// Ghostkeel and nine Kroot native baselines are not certified by that card.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),sources=new Map();
const read=file=>{if(!sources.has(file))sources.set(file,fs.readFileSync(path.join(root,file),'utf8'));return sources.get(file);};
const canonicalPath='books/tau-empire/content/tau-empire-codex-datasheets.en.json';
const catalogPath='books/tau-empire/scripts/roster-data.js',providerPath='books/tau-empire/scripts/roster-filter.js';
const stealthId='unit-stealth-battlesuits',auraId='tau-empire-ability-localised-stealth-projectors-aura';
const integratedId='tau-empire-detachment-rule-integrated-command-structure';
const beaconId='unit-stealth-battlesuits-wargear-ability-homing-beacon';
const nativeIds=['tau-empire-ability-forward-observers','core-infiltrators','core-stealth','tau-empire-ability-for-the-greater-good'];
const nativeTitles=['Forward Observers','Infiltrators','Stealth','For The Greater Good'];
const local=value=>JSON.parse(JSON.stringify(value));
const references=member=>member.effects.filter(effect=>effect.canonicalReference?.id===integratedId);

function assertNative(abilities,label){
  assert.equal(abilities.some(ability=>ability.id===auraId||ability.title==='Localised Stealth Projectors (Aura)'),false,`${label}: no native Localised Stealth Projectors`);
  assert.deepEqual(Array.from(abilities,ability=>ability.title),nativeTitles,`${label}: preserve all four native abilities`);
}
function assertReference(member,expected,rule,label){
  const found=references(member);
  assert.equal(found.length,expected?1:0,`${label}: Auxiliary reference requires selected detachment and eligible recipient`);
  if(!expected)return;
  const effect=found[0];
  assert.deepEqual(local(effect.source),{kind:'detachment',id:'auxiliary-cadre',ownerInstanceId:null},`${label}: unchanged detachment source`);
  assert.deepEqual(local(effect.provenance),{kind:'curated-provider',rosterFact:'selected-detachment'},`${label}: unchanged provider provenance`);
  assert.equal(effect.operation,'reference',`${label}: conditional rule is not a permanent grant`);
  assert.equal(effect.state,'reference',`${label}: unknown live conditions remain reference-only`);
  assert.equal(effect.targetState,'resolved',`${label}: canonical reference resolves`);
  assert.equal(effect.targetInstanceId,member.identity.instanceId,`${label}: exact physical recipient`);
  assert.deepEqual(local(effect.targets),[],`${label}: no live-condition numeric mutation`);
  assert.equal(effect.canonicalReference.text,rule.text,`${label}: complete existing conditional rule`);
  assert.equal(effect.canonicalReference.sectionId,'auxiliary-cadre-rule',`${label}: existing detachment section`);
}

export function runTauAuxiliaryQa(overrides={}){
  const source=file=>overrides[file]??read(file),canonical=JSON.parse(source(canonicalPath));
  const native=canonical.datasheets.find(unit=>unit.id===stealthId);
  assert.ok(native,'exact canonical Stealth identity');
  assertNative(native.abilities,'canonical Stealth');
  assert.ok(native.wargearAbilities.some(ability=>ability.title==='Homing Beacon'),'canonical Homing Beacon preserved as wargear');
  const scope={console,WHRosterParser:{normalize:value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()},addEventListener(){}};
  scope.window=scope;scope.globalThis=scope;
  for(const file of [catalogPath,providerPath,'books/shared/roster-context.js'])vm.runInNewContext(source(file),scope,{filename:file});
  const catalog=scope.WH_BOOK_ROSTER_CATALOG,stealth=catalog.units.find(unit=>unit.id===stealthId);
  assertNative(stealth.gameSelections.abilities,'catalog Stealth');
  assert.deepEqual(Array.from(stealth.gameSelections.abilities,ability=>ability.id),nativeIds,'identity-specific native inventory');
  assert.deepEqual(Array.from(stealth.gameSelections.abilities,ability=>({title:ability.title,text:ability.text})),native.abilities,'preserved native text flows unchanged into catalog');
  const beacon=stealth.gameSelections.wargearAbilities.find(ability=>ability.id===beaconId);
  assert.deepEqual(Array.from(beacon.requiredSelectionIds),['unit-stealth-battlesuits-selection-homing-beacon'],'Homing Beacon exact selection gate');
  const rule=catalog.detachmentRules.find(item=>item.id===integratedId);
  assert.equal(rule.detachmentId,'auxiliary-cadre','Auxiliary remains canonical owner');
  assert.match(rule.text,/Friendly GHOSTKEEL BATTLESUIT\/STEALTH BATTLESUITS units have the following ability: Localised Stealth Projectors \(Aura\)/,'preserved eligible aura sources');
  assert.match(rule.text,/friendly KROOT\/VESPID STINGWINGS unit within 6" of this unit has shot, those attacks do not prevent that unit from being hidden/,'preserved aura range, recipients and timing');
  assert.match(rule.text,/Harnessed Alien Instincts: In your Shooting phase, this unit can select one visible enemy unit within 12"/,'preserved other Auxiliary grant');

  // These are preservation controls, not authorization to repair their baselines.
  const retained=[['unit-ghostkeel-battlesuit','Localised Stealth Projectors (Aura)'],
    ...['flesh-shaper','lone-spear','trail-shaper','war-shaper','carnivores','farstalkers','hounds','krootox-rampagers','krootox-riders']
      .map(name=>[name.startsWith('krootox-')?'unit-'+name:'unit-kroot-'+name,'Harnessed Alien Instincts'])];
  for(const [id,title] of retained){
    assert.equal(canonical.datasheets.find(unit=>unit.id===id).abilities.filter(ability=>ability.title===title).length,1,`${id}: out-of-scope canonical occurrence preserved`);
    assert.equal(catalog.units.find(unit=>unit.id===id).gameSelections.abilities.filter(ability=>ability.title===title).length,1,`${id}: out-of-scope catalog occurrence preserved`);
  }
  for(const [label,detachment] of [['no-detachment',null],['Montka',"Mont'ka"],['Auxiliary','Auxiliary Cadre']]){
    const roster={faction:"T'au Empire",detachments:detachment?[{name:detachment}]:[],units:[
      {id:'stealth-beacon',canonicalUnitId:stealthId,name:'Stealth Battlesuits',quantity:5,points:100,wargear:'Burst cannon, Battlesuit fists, Homing Beacon'},
      {id:'stealth-plain',canonicalUnitId:stealthId,name:'Stealth Battlesuits',quantity:5,points:100,wargear:'Burst cannon, Battlesuit fists'},
      {id:'ineligible-fireblade',canonicalUnitId:'unit-cadre-fireblade',name:'Cadre Fireblade',quantity:1,points:50,wargear:'Close combat weapon, Fireblade pulse rifle'}
    ]};
    const project=()=>scope.WHArmyRosterContext.project({catalog,roster,record:{id:'ra06-'+label,roster},provider:{gameEffects:scope.TAURosterSemantics.projectEffects}}).game;
    const projection=project();
    assert.equal(projection.status,'ready',`${label}: fixture fully resolved`);
    assert.equal(projection.units.length,3,`${label}: physical fixture inventory`);
    for(const member of projection.units){
      const isStealth=member.identity.canonicalDatasheetId===stealthId;
      if(isStealth){
        assertNative(member.effective.abilities,`${label}/${member.identity.instanceId}`);
        assert.deepEqual(Array.from(member.effective.abilities,ability=>ability.id),nativeIds,`${label}: exact effective native identities`);
        assert.ok(member.effective.abilities.every(ability=>ability.canonical&&ability.sourceUnitId===stealthId),`${label}: preserved native ownership`);
        assert.equal(member.selection.loadout.selectedWargearAbilityIds.includes(beaconId),member.identity.instanceId==='stealth-beacon',`${label}: Homing Beacon selected-only and physical-instance isolation`);
      }
      assertReference(member,label==='Auxiliary'&&isStealth,rule,`${label}/${member.identity.instanceId}`);
    }
    assert.equal(JSON.stringify(project()),JSON.stringify(projection),`${label}: stable reprojection`);
  }
  return 'Stealth native ownership, four preserved abilities, ten excluded occurrences, three detachments, ineligible control and Homing Beacon';
}

function runMutations(){
  const canonical=JSON.parse(read(canonicalPath)),provider=read(providerPath);
  const restore=local(canonical),removed=local(canonical);
  const aura=restore.datasheets.find(unit=>unit.id==='unit-ghostkeel-battlesuit').abilities.find(ability=>ability.title==='Localised Stealth Projectors (Aura)');
  restore.datasheets.find(unit=>unit.id===stealthId).abilities.splice(1,0,local(aura));
  removed.datasheets.find(unit=>unit.id===stealthId).abilities.shift();
  const gate="detachments.has('auxiliary-cadre')&&",recipient="cardId==='unit-vespid-stingwings'";
  assert.equal(provider.split(gate).length,2,'exact Auxiliary gate mutation anchor');
  assert.equal(provider.split(recipient).length,2,'exact Auxiliary recipient mutation anchor');
  const scenarios=[
    ['RESTORE_NATIVE_AURA',{[canonicalPath]:JSON.stringify(restore)},/canonical Stealth: no native Localised Stealth Projectors/],
    ['REMOVE_AUXILIARY_GATE',{[providerPath]:provider.replace(gate,'')},/no-detachment\/stealth-beacon: Auxiliary reference requires/],
    ['BROADEN_AUXILIARY_RECIPIENT',{[providerPath]:provider.replace(recipient,"(cardId==='unit-vespid-stingwings'||cardId==='unit-cadre-fireblade')")},/Auxiliary\/ineligible-fireblade: Auxiliary reference requires/],
    ['REMOVE_FORWARD_OBSERVERS',{[canonicalPath]:JSON.stringify(removed)},/canonical Stealth: preserve all four native abilities/]
  ];
  // Disposable in-memory source copies only: never change tracked production data.
  for(const [name,overrides,intended] of scenarios){
    assert.throws(()=>runTauAuxiliaryQa(overrides),{code:'ERR_ASSERTION',message:intended},`${name}: intended identity-specific assertion must kill TEMP VM mutation`);
    console.log(`RA06 TEMP VM ${name}: KILLED`);
  }
  console.log('RA06 restored oracle: PASS ('+runTauAuxiliaryQa()+')');
}

export async function runTauAuxiliaryBrowser(page,base){
  await page.goto(`${base}/books/tau-empire/reader.html?view=mobile#${stealthId}`);
  await page.waitForFunction(()=>document.querySelector('#unit-stealth-battlesuits')&&window.WHArmyBook);
  const standalone=await page.locator('#unit-stealth-battlesuits').innerText();
  assert.doesNotMatch(standalone,/Localised Stealth Projectors/,'standalone Stealth has no native aura');
  for(const title of nativeTitles)assert.match(standalone,new RegExp(title,'i'),`standalone preserves ${title}`);
  assert.match(standalone,/Homing Beacon/,'standalone preserves optional Homing Beacon');
  for(const detachment of [null,"Mont'ka",'Auxiliary Cadre']){
    const label=detachment||'no-detachment';
    await page.goto(`${base}/roster-guides/index.html`);
    const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').map(record=>record.id));
    const source=`+ FACTION KEYWORD: T'au Empire\n${detachment?'+ DETACHMENT: '+detachment+'\n':''}+ TOTAL ARMY POINTS: 250pts\n\nChar1: 1x Cadre Fireblade (50 pts): Close combat weapon, Fireblade pulse rifle\n5x Stealth Battlesuits (100 pts)\n\u2022 1x Stealth Shas'ui: Burst cannon, Battlesuit fists, Homing Beacon\n\u2022 3x Stealth Shas'ui: Burst cannon, Battlesuit fists\n\u2022 1x Stealth Shas'vre: Burst cannon, Battlesuit fists\n5x Stealth Battlesuits (100 pts): Burst cannon, Battlesuit fists`;
    await page.locator('#roster-input').fill(source);
    await page.locator('#roster-form button[type="submit"]').click();
    await page.waitForFunction(ids=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').some(record=>!ids.includes(record.id)),before);
    const ids=await page.evaluate(previous=>{const record=JSON.parse(localStorage.getItem('wh40k-rosters-v1')).find(item=>!previous.includes(item.id));return{roster:record.id,stealth:record.roster.units.filter(unit=>unit.name==='Stealth Battlesuits').map(unit=>unit.id),control:record.roster.units.find(unit=>unit.name==='Cadre Fireblade').id};},before);
    assert.equal(ids.stealth.length,2,`${label}: two distinct physical Stealth units`);
    assert.equal(new Set([...ids.stealth,ids.control]).size,3,`${label}: physical identities remain distinct`);
    for(const [instance,canonical,beacon] of [[ids.stealth[0],stealthId,true],[ids.stealth[1],stealthId,false],[ids.control,'unit-cadre-fireblade',false]]){
      await page.goto(`${base}/books/tau-empire/reader.html?view=mobile&roster=${encodeURIComponent(ids.roster)}&rosterInstance=${encodeURIComponent(instance)}#${canonical}`);
      await page.waitForFunction(id=>document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(id)}"]`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instance);
      const snapshot=await page.evaluate(id=>{const card=document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(id)}"]`);return{member:window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===id),text:card.innerText,references:[...card.querySelectorAll('[data-roster-canonical-reference-id]')].map(node=>({id:node.dataset.rosterCanonicalReferenceId,text:node.innerText})),rule:window.WH_BOOK_ROSTER_CATALOG.detachmentRules.find(rule=>rule.id==='tau-empire-detachment-rule-integrated-command-structure')};},instance);
      assert.equal(snapshot.member.identity.canonicalDatasheetId,canonical,`${label}: canonical browser identity`);
      const expected=detachment==='Auxiliary Cadre'&&canonical===stealthId;
      assertReference(snapshot.member,expected,snapshot.rule,`${label}/${instance}`);
      const rendered=snapshot.references.filter(reference=>reference.id===integratedId);
      assert.equal(rendered.length,expected?1:0,`${label}: exactly one eligible rendered Auxiliary reference, or none`);
      if(expected){assert.match(rendered[0].text,/Auxiliary Cadre/,'rendered detachment attribution');assert.match(rendered[0].text,/Localised Stealth Projectors/,'rendered conditional aura');}
      else assert.doesNotMatch(snapshot.text,/Localised Stealth Projectors/,`${label}: no ungated or ineligible aura`);
      if(canonical===stealthId){
        assertNative(snapshot.member.effective.abilities,`${label}: browser native Stealth`);
        for(const title of nativeTitles)assert.match(snapshot.text,new RegExp(title,'i'),`${label}: rendered ${title}`);
        assert.equal(snapshot.member.selection.loadout.selectedWargearAbilityIds.includes(beaconId),beacon,`${label}: browser Homing Beacon selection`);
        assert.equal(/Once per battle, you can use the Rapid Ingress Stratagem for 0CP/.test(snapshot.text),beacon,`${label}: Homing Beacon rule rendered only when equipped`);
      }
    }
    console.log(`RA06 browser ${label}: PASS (Stealth +/- Homing Beacon, ineligible Fireblade)`);
  }
  console.log('RA06 browser standalone Stealth: PASS');
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  console.log('RA06 Auxiliary provenance: PASS ('+runTauAuxiliaryQa()+')');
  if(process.argv.includes('--mutations'))runMutations();
}
