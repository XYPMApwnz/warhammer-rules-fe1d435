import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=rel=>JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
const source=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const walk=(v,fn)=>{if(!v||typeof v!=='object')return;fn(v);for(const x of Array.isArray(v)?v:Object.values(v))walk(x,fn);};
const norm=v=>String(v||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const exact=(v,label)=>{const out=[];walk(v,o=>{if(norm(o.title??o.name??o.label)===norm(label))out.push(o);});return out;};
const byId=(v,id)=>{const out=[];walk(v,o=>{if(o.id===id||o.ruleId===id||o.unitId===id)out.push(o);});return out;};
const one=(values,label)=>{assert.ok(values.length,label+' missing');return values[0];};
const text=v=>JSON.stringify(v);
const unitValues=(mfm,id)=>{const unit=one(byId(mfm,id),id);const values={};for(const schedule of unit.schedules||[])for(const row of schedule.values||[])values[schedule.label+'|'+row.label]=row.value;return values;};
const enhancementValue=(mfm,title)=>{const rows=exact(mfm,title).filter(o=>Object.hasOwn(o,'value'));assert.ok(rows.length,title+' value missing');return [...new Set(rows.map(o=>o.value))];};

const dgOld=json('books/death-guard/sources/official-mfm-v1.2.json');
const dg=json('books/death-guard/sources/official-mfm-v1.3.json');
assert.equal(dg.version,'v1.3');
assert.equal(dg.sourceUpdatedAt,'2026-08-26');
assert.deepEqual(unitValues(dg,'unit-blightlord-terminators'),{'YOUR UNIT COSTS|3 models':115,'YOUR UNIT COSTS|5 models':180,'YOUR UNIT COSTS|10 models':360});
assert.equal(unitValues(dg,'unit-defiler')['YOUR 2ND + UNIT COSTS|1 model'],350);
assert.equal(unitValues(dg,'unit-foul-blightspawn')['YOUR UNIT COSTS|1 model'],60);
assert.equal(unitValues(dg,'unit-mortarion')['YOUR UNIT COSTS|1 model'],375);
assert.deepEqual(unitValues(dg,'unit-myphitic-blight-hauler'),{'YOUR UNIT COSTS|1 model':95,'YOUR UNIT COSTS|2 models':190});
assert.equal(unitValues(dg,'unit-noxious-blightbringer')['YOUR UNIT COSTS|1 model'],50);
assert.deepEqual(unitValues(dg,'unit-plagueburst-crawler'),{'YOUR 1ST UNIT COSTS|1 model':170,'YOUR 2ND + UNIT COSTS|1 model':200});
assert.equal(unitValues(dgOld,'unit-mortarion')['YOUR UNIT COSTS|1 model'],390);
for(const title of ['Champions of Contagion','Flyblown Host','Contagion Engines',"Mortarion's Hammer"]){
  const det=one(exact(dg,title),title);
  assert.equal((det.tags||[]).some(tag=>/^UNIQUE:/i.test(tag)),false,title+' unique tag');
}
const dgRules=json('books/death-guard/content/death-guard-rules.en.json');
const skull=one(byId(dgRules,'skullsquirm-blight'),'Skullsquirm Blight');
assert.match(text(skull),/Benefit of Cover/i);
assert.match(text(skull),/melee attack.*subtract 1/i);
assert.doesNotMatch(text(dgRules),/cannot be taken with another ENGINES Detachment/i);
const mire=one(byId(dgRules,'stratagem-stinking-mire'),'Stinking Mire');
assert.match(text(mire),/unengaged DEATH GUARD VEHICLE/);
assert.match(text(mire),/within 12/);
assert.match(text(mire),/-1 to charge rolls/);
assert.doesNotMatch(text(mire),/-2/);

const am=json('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-datasheets.en.json');
const datasmith=one(exact(am,'Cybernetica Datasmith'),'Datasmith');
assert.ok(datasmith.keywords.some(k=>norm(k)==='vehicle'));
assert.equal(datasmith.keywords.some(k=>norm(k)==='infantry'),false);
assert.match(text(one(exact(datasmith,'Data-severed'),'Data-severed')),/loses VEHICLE.*INFANTRY/s);
const providerRoot={
  WH_POINTS_CATALOG:{'adeptus mechanicus':{enhancements:{},units:{
    'cybernetica datasmith':{id:'unit-cybernetica-datasmith',keywords:['ADEPTUS MECHANICUS','VEHICLE']},
    'kastelan robots':{id:'unit-kastelan-robots',keywords:['ADEPTUS MECHANICUS','VEHICLE','LEGIO CYBERNETICA']}
  }}},
  WH40K_GLOSSARY:{forBook:()=>({})}
};
vm.runInNewContext(source('books/adeptus-mechanicus/scripts/roster-enhancements.js'),{window:providerRoot});
const robot={id:'robot',name:'Kastelan Robots'},smith={id:'smith',name:'Cybernetica Datasmith'};
const attached=providerRoot.AMRosterEnhancements.projectGameEffects({units:[robot,smith]},smith,{attachments:{robot:['smith']},unitById:new Map([['robot',robot],['smith',smith]])});
assert.equal(attached.some(e=>e.component==='keyword'),false);
const alone=providerRoot.AMRosterEnhancements.projectGameEffects({units:[smith]},smith,{attachments:{},unitById:new Map([['smith',smith]])});
assert.ok(alone.some(e=>e.component==='keyword'&&e.targetId==='VEHICLE'&&e.operation==='remove'));
assert.ok(alone.some(e=>e.component==='keyword'&&e.targetId==='INFANTRY'&&e.operation==='grant'));
assert.equal(alone.some(e=>/destroy|casualt/i.test(JSON.stringify(e))),false);

const ecOld=json('books/emperors-children/sources/official-mfm-v1.2.json');
const ec=json('books/emperors-children/sources/official-mfm-v1.3.json');
assert.deepEqual(enhancementValue(ec,'Possessed Blade'),[35]);
assert.deepEqual(enhancementValue(ec,'Warp Walker'),[35]);
assert.deepEqual(enhancementValue(ecOld,'Possessed Blade'),[25]);
assert.deepEqual(enhancementValue(ecOld,'Warp Walker'),[30]);
const ecOwners=json('books/emperors-children/sources/enhancement-owner-matrix.json');
assert.equal(ecOwners.enhancements['enhancement-possessed-blade'].points,35);
assert.equal(ecOwners.enhancements['enhancement-warp-walker'].points,35);
const ecCodex=json('books/emperors-children/content/emperors-children-codex-datasheets.en.json');
assert.match(text(one(exact(ecCodex,'Heldrake'),'EC Heldrake')),/\"oc\":\"0\"/i);
const ecPack=json('books/emperors-children/content/emperors-children-faction-pack.en.json');
assert.match(text(one(byId(ecPack,'rapid-on-to-the-next'),'On to the Next')),/turn it disembarked from a TRANSPORT/);

const tyr=json('books/tyranids/content/tyranids-codex-datasheets.en.json');
const norn=one(exact(tyr,'Norn Assimilator'),'Norn');
const harpooned=one(norn.abilities.filter(a=>a.id==='62c7-3cb5-45c-cc3b'),'Harpooned id');
assert.match(harpooned.text,/hit by an attack.*this turn/s);
assert.match(harpooned.text,/\+2 to charge rolls/);
const tyrParity=json('books/tyranids/content/tyranids-codex-parity.en.json');
const goading=one(exact(tyrParity,'Synaptic Goading'),'Synaptic Goading');
assert.match(text(goading),/re-roll the D6/);
assert.match(text(goading),/closest objective marker/);

const csm=json('books/chaos-space-marines/content/chaos-space-marines-codex-datasheets.en.json');
const masters=exact(csm,'Masters of the Maelstrom').find(o=>o.relations);
assert.ok(masters);
assert.equal(masters.abilities.some(a=>a.title==='Masters of the Maelstrom'),false);
assert.equal(masters.abilities.some(a=>a.title==='Support'),true);
assert.equal(masters.relations.support.length,3);
assert.match(text(one(exact(csm,'Heldrake'),'CSM Heldrake')),/\"oc\":\"0\"/i);

const sm=json('books/space-marines/content/space-marines-codex-datasheets.en.json');
const wardens=one(exact(sm,'Wardens of Ultramar'),'Wardens');
assert.equal(wardens.abilities.some(a=>a.title==='Heroes of Ultramar'),false);
assert.equal(wardens.abilities.some(a=>a.title==='Support'),true);
assert.deepEqual(wardens.relations.support,['Assault Intercessor Squad','Bladeguard Veteran Squad','Intercessor Squad','Sternguard Veteran Squad']);
const smPack=json('books/space-marines/content/space-marines-faction-pack.en.json');
assert.match(text(one(byId(smPack,'armoured-speartip-rapid-embarkation'),'Rapid Embarkation')),/turn it disembarked from a TRANSPORT/);
const overlay=json('books/space-marines/content/space-marines-current-overlay.en.json');
const stoic=one(exact(overlay,'Stoic Defender'),'Stoic Defender');
assert.match(text(stoic),/within an objective you control/);
assert.match(text(stoic),/halve the Objective Control/);
assert.doesNotMatch(text(stoic),/changing it to 0/);

const da=json('books/dark-angels/content/dark-angels-codex-datasheets.en.json');
const lion=exact(da,"Lion El'Jonson").concat(exact(da,'Lion El’Jonson'))[0];
const mist=one(exact(lion,'Mist-wreathed Shadow Realms'),'Lion ability');
assert.match(text(mist),/In your Command phase/);
assert.doesNotMatch(text(mist),/end of your opponent/);
const daPack=json('books/dark-angels/content/dark-angels-faction-pack.en.json');
assert.match(text(daPack),/Ravenwing Command Squad, Core Abilities Section/);
const daRelated=json('books/dark-angels/content/dark-angels-related-rules.en.json');
assert.equal(Object.keys(daRelated.enhancements||{}).length,26);
assert.equal(Object.values(daRelated.enhancements||{}).filter(item=>item.owner).length,26);
assert.equal(Object.values(daRelated.enhancements||{}).filter(item=>item.assignment).length,26);

const manifestMfmHashes={
  "death-guard": "6AD17A84133D348DC782A39AC73EFBFA223E906F52AD0471EE81C27A40EA1FD6",
  "emperors-children": "BC3AB9AF7DCF6F0F5BC331FA4C1D1B91A572832C744FE9518F6C08E82473CF1B",
  "tyranids": "E4C0637752D07A3CB1023730B6CE40C7E0704721BC91FDE9D844A76614F1C7AC",
  "chaos-space-marines": "FBE45A9D08B1A99E8E1B2C8011BD510180D9BDFF3657442902F88C519A3E54F7",
  "space-marines": "D5E8765D56FCE1445F7718AD7CA4D249D5AC3FFD6D68E8D8ABEA46E539D0546B",
  "dark-angels": "6A90E2D6F9517520D75E532BB8090435B5368240F7A828598158B0ACDCFE6FB0",
  "blood-angels": "57B72C15F5EB38737E2E39BE8DD5364C6C4F1A4F0D7D6657BE3B13C4309F3D7A",
  "tau-empire": "4530DBC81B604766C4182EA4AAF7BF01F5DCE6CD37F208373E73F01724A05589"
};
for(const book of ['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels']){
  const config=source('books/'+book+'/book.config.json');
  const manifestPath=path.join(root,'books',book,'sources','source-manifest.json');
  const manifest=fs.existsSync(manifestPath)?fs.readFileSync(manifestPath,'utf8'):'';
  assert.match(config+manifest,/official-mfm-v1\.3\.json/,book+' MFM wiring');
  if(manifestMfmHashes[book]){
    assert.doesNotMatch(manifest,/MFM v1\.2|mfm-v1\.2/i,book+' stale MFM provenance');
    assert.match(manifest,new RegExp(manifestMfmHashes[book],'i'),book+' MFM capture hash');
    const actualHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'books',book,'sources','official-mfm-v1.3.json'))).digest('hex').toUpperCase();
    assert.equal(actualHash,manifestMfmHashes[book],book+' current MFM file hash');
  }
}

const factualProjection=mfm=>({
  units:(Array.isArray(mfm.units)?mfm.units:Object.values(mfm.units||{})).map(u=>({id:u.unitId||u.id,title:u.title,schedules:u.schedules,paidWargear:u.paidWargear,points:u.points,value:u.value})),
  detachments:(Array.isArray(mfm.detachments)?mfm.detachments:Object.values(mfm.detachments||{})).map(d=>({title:d.title,dp:d.dp,disposition:d.disposition,tags:d.tags,enhancements:d.enhancements})),
  enhancements:Array.isArray(mfm.enhancements)?mfm.enhancements:Object.values(mfm.enhancements||{}),
  pricedOptions:mfm.pricedOptions||[],
  legends:mfm.legends||[]
});
const changedPaths=(a,b,prefix='',out=[])=>{
  if(Object.is(a,b))return out;
  if(typeof a!==typeof b||a===null||b===null||typeof a!=='object'){out.push(prefix);return out;}
  const keys=new Set([...Object.keys(a),...Object.keys(b)]);
  for(const key of keys)changedPaths(a[key],b[key],prefix+'/'+key,out);
  return out;
};
const dgDiff=changedPaths(factualProjection(dgOld),factualProjection(dg));
assert.equal(dgDiff.every(p=>/units\/(1|10|13|21|22|23|24)|detachments\/(0|1|3|4)\/tags/.test(p)),true,'unexpected DG factual delta '+dgDiff.join(','));
const package1aLedger=json('tests/fixtures/gw-2026-08-26-owner-points-ledger.json');
const recordByTitle=(records,title)=>{const values=Array.isArray(records)?records:Object.entries(records||{}).map(([name,value])=>({title:name,...value}));return one(values.filter(item=>norm(item.title)===norm(title)),title);};
const canonicalPointRecord=entry=>{const document=json(entry.canonicalPath);if(entry.canonicalKind==='dg-section')return one(byId(document,entry.canonicalUnitId),entry.canonicalUnitId);if(entry.canonicalKind==='dependency-point-override')return document.dependencyDatasheets.pointOverrides[entry.canonicalUnitId];return one((document.units||[]).filter(item=>item.id===entry.canonicalUnitId||norm(item.title)===norm(entry.title)),entry.canonicalUnitId);};
const snapshotPointRecord=entry=>{const document=json(entry.snapshotPath);if(entry.snapshotKind==='dg-schedules')return one(byId(document,entry.canonicalUnitId),entry.canonicalUnitId);if(entry.snapshotKind==='am-map')return recordByTitle(document.units,entry.title);if(entry.snapshotKind==='dependency-point-override')return document.dependencyInventory.pointOverrides[entry.canonicalUnitId];return recordByTitle(document.unitOverrides,entry.title);};
const snapshotPoints=(entry,record)=>{if(entry.snapshotKind==='dg-schedules')return record.schedules.flatMap(schedule=>schedule.values.map(row=>({label:(schedule.label==='YOUR 1ST UNIT COSTS'?'1st unit: ':schedule.label==='YOUR 2ND + UNIT COSTS'?'2nd+ unit: ':'')+row.label,value:row.value})));if(entry.snapshotKind==='am-map')return record.points.map(([label,value])=>({label,value}));return record.points;};
for(const entry of [...package1aLedger.units,...package1aLedger.protectiveOverlays]){
  const canonical=canonicalPointRecord(entry),snapshot=snapshotPointRecord(entry);
  assert.deepEqual(canonical.points,entry.officialPoints,entry.ownerBook+' canonical '+entry.title);
  assert.deepEqual(snapshotPoints(entry,snapshot),entry.officialPoints,entry.ownerBook+' official snapshot '+entry.title);
  assert.equal(json(entry.snapshotPath).version,'v1.3',entry.ownerBook+' snapshot version');
  const sourceArtifactHash=json(entry.snapshotPath).sourceArtifactSha256;
  if(sourceArtifactHash!=null)assert.equal(sourceArtifactHash,entry.officialSource.artifactSha256,entry.ownerBook+' source artifact hash');
  if(entry.canonicalKind==='dg-section')assert.deepEqual(canonical.blocks.find(block=>block.type==='points').values,entry.officialPoints,entry.title+' duplicated DG points block');
}
for(const item of package1aLedger.metadata){
  const canonical=json(item.canonicalPath),snapshot=json(item.snapshotPath);
  if(item.entityType==='enhancement'){
    const current=one(canonical.enhancements.filter(entry=>entry.id===item.id),item.id);
    assert.equal(current.value,item.official,item.title+' canonical value');
    assert.equal(recordByTitle(snapshot.enhancements,item.title).value,item.official,item.title+' snapshot value');
  }else{
    assert.equal(recordByTitle(canonical.detachments,item.title)[item.field],item.official,item.title+' canonical metadata');
    assert.equal(recordByTitle(snapshot.detachments,item.title)[item.field],item.official,item.title+' snapshot metadata');
  }
}
const tauPoints=json('books/tau-empire/content/tau-empire-points.en.json');
assert.equal(recordByTitle(tauPoints.units,'Tidewall Shieldline').paidWargear.find(item=>item.name==='Tidewall Defence Platform')?.value,20);
const smPoints=json('books/space-marines/content/space-marines-points.en.json');
assert.equal(recordByTitle(smPoints.units,'Outrider Squad').paidWargear.find(item=>item.name==='Invader ATV')?.value,60);
assert.equal(json('books/blood-angels/book.config.json').dependencyDetachments.pointOverrides['Stormlance Task Force'].detachmentPoints,2,'BA Stormlance factual override');

console.log('GW 26-Aug-2026 exact official delta QA: PASS');
