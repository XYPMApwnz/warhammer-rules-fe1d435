import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(root,'../..');
const readJson=relative=>JSON.parse(fs.readFileSync(path.join(root,relative),'utf8'));
const titleKey=value=>String(value).replace(/\s*\([^)]*\)\s*$/,'').trim().toLowerCase();
const pack=readJson('content/tyranids-faction-pack.en.json');
const codex=readJson('content/tyranids-codex-datasheets.en.json');
const points=readJson('content/tyranids-points.en.json');
const relatedRules=readJson('content/tyranids-related-rules.en.json');
const codexParity=readJson('content/tyranids-codex-parity.en.json');
const codexWargear=readJson('content/tyranids-codex-wargear.en.json');
const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8');
const app=fs.readFileSync(path.join(root,'scripts','app.js'),'utf8');
const bookCss=fs.readFileSync(path.join(root,'styles','book.css'),'utf8');
const related=fs.readFileSync(path.join(root,'mobile','related-rules.inc'),'utf8');
const context=JSON.parse(fs.readFileSync(path.join(repo,'glossary','contexts','tyranids.json'),'utf8'));

assert.equal(pack.meta.pageCount,31);
assert.equal(pack.detachments.length,4);
assert.equal(pack.detachments.flatMap(item=>item.stratagems).length,15);
assert.equal(pack.updates.length,32);
assert.equal(pack.meta.version,'1.1');
assert.equal(pack.meta.sha256,'BBB2B1F9167C8421D13CFB87FC46DF778D59B7E9803D5D8F812060424FA9C79A');
assert.equal(pack.faqs.length,12);
assert.equal(codex.audit.datasheets,50);
assert.equal(codex.audit.imperialArmour,7);
assert.equal(points.audit.enhancements,34);
assert.equal(points.units.length,57);
assert.equal(codexParity.detachments.length,6);
assert.equal(codexParity.detachments.flatMap(item=>item.stratagems).length,36);
assert.equal(codexWargear.units.length,57);
assert.equal(Object.keys(relatedRules.stratagems).length,51);
assert.equal(new Set(points.units.map(item=>item.id)).size,57);
for(const unit of [...codex.datasheets,...codex.imperialArmour,...codex.legends]){
  assert.ok(unit.profiles.length,`${unit.title}: missing profile`);
  assert.ok(unit.keywords.includes('Tyranids'),`${unit.title}: missing faction keyword`);
  assert.match(reader,new RegExp(`id="${unit.id}"`),`${unit.title}: missing reader anchor`);
}
const termagants=codex.datasheets.find(unit=>unit.title==='Termagants');
assert.deepEqual(termagants.abilities.map(item=>item.title),['Skulking Horrors','Synapse']);
assert.ok(termagants.wargearAbilities.some(item=>item.title==='Torrent'));
const currentUnits=[...codex.datasheets,...codex.imperialArmour].filter(unit=>unit.status==='Current');
const unit=title=>currentUnits.find(item=>item.title===title);
assert.deepEqual(points.detachments.map(item=>[item.title,item.forceDisposition,item.detachmentPoints]),[
  ['Ambush Predators','Disruption',1],['Assimilation Swarm','Priority Assets',2],['Crusher Stampede','Purge the Foe',2],['Invasion Fleet','Take and Hold',3],['Subterranean Assault','Disruption',3],['Synaptic Nexus','Disruption',2],['Talons of the Norn Queen','Take and Hold',1],['Unending Swarm','Take and Hold',2],['Vanguard Onslaught','Reconnaissance',2],['Warrior Bioform Onslaught','Take and Hold',1]
]);
for(const detachment of points.detachments){
  assert.match(reader,new RegExp(`<span>${detachment.forceDisposition}</span><span>${detachment.detachmentPoints}DP</span>`),`${detachment.title}: MFM metadata is not rendered`);
}
const renderedEnhancements=[...pack.detachments,...codexParity.detachments].flatMap(item=>item.enhancements||[]);
for(const enhancement of points.enhancements){
  const rendered=renderedEnhancements.find(item=>titleKey(item.title)===titleKey(enhancement.title));
  assert.ok(rendered,`${enhancement.title}: no rendered Enhancement card`);
  assert.match(reader,new RegExp(`data-rule-id="${rendered.id}"[\\s\\S]*?<div class="eyebrow">Enhancement \\u00b7 ${enhancement.value} pts</div>`),`${enhancement.title}: current points are not rendered`);
}
assert.deepEqual(unit('Neurotyrant').abilities.filter(item=>/Psychic Terror|Neuroloids|Synaptic Relays/.test(item.title)).map(item=>item.title),['Psychic Terror (Psychic)','Neuroloids']);
assert.match(unit('Neurotyrant').abilities.find(item=>item.title==='Psychic Terror (Psychic)').text,/models from your army with this ability/);
assert.ok(!unit('Norn Assimilator').abilities.some(item=>item.title==='Protean Purpose'));
assert.ok(!unit('Norn Emissary').abilities.some(item=>item.title==='Protean Purpose'));
assert.equal(unit('Norn Emissary').abilities.find(item=>item.title==='Unnatural Resilience').text,'This model has the Feel No Pain 4+ ability against mortal wounds.');
for(const title of ['Tyrannocyte','Toxicrene','Tyrannofex'])assert.ok(unit(title).keywords.includes('Frame'),`${title}: FRAME keyword missing`);
for(const title of ['Hyperadapted Raveners','Tyranid Prime with Lash Whip'])assert.ok(!unit(title).abilities.some(item=>item.title==='Sustained Hits'),`${title}: referenced weapon definition leaked into Abilities`);
for(const title of ['Termagant spinefists','Genestealer claws and talons','Distensible jaw','Toxinjector harpoon','Sporocyst bio-weapons','Spinemaws'])assert.ok(currentUnits.some(item=>item.weapons.some(weapon=>weapon.name===title)),`${title}: canonical weapon name missing`);
assert.doesNotMatch(JSON.stringify({codex,codexParity}),/<ins>|Wound roll 1 as well|excluding MONSTERS models|that units Leadership|, and If your unit|Stealth \)\./);
for(const id of ['vanguard-chameleonic','tyranid-warriors-melee-adaptive-instincts','tyrannocyte-aerial-seeding','venomthropes-foul-spores'])assert.ok(pack.updates.some(item=>item.id===id),`${id}: v1.1 update missing`);
assert.equal(pack.updates.find(item=>item.id==='biovores-seed-spore-mine').sourcePages[0],20);
assert.match(pack.updates.find(item=>item.id==='venomthropes-foul-spores').change,/within 6"/);
for(const title of ['The Red Terror','Raveners','Hyperadapted Raveners'])assert.ok([...codex.datasheets,...codex.imperialArmour].find(unit=>unit.title===title).keywords.includes('Burrower'),`${title}: official BURROWER keyword missing`);
assert.ok(codex.datasheets.find(unit=>unit.title==='Hyperadapted Raveners').keywords.includes('Synapse'));
assert.equal(codex.imperialArmour.find(unit=>unit.title==='Malanthrope').weapons.find(weapon=>weapon.name==='Grasping tail').skill,'4+');
assert.match(codex.datasheets.find(unit=>unit.title==='Neurolictor').abilities.find(item=>item.title==='Psychological Saboteur (Aura)').text,/within 12"/);
assert.match(codex.datasheets.find(unit=>unit.title==='The Swarmlord').abilities.find(item=>item.title==='Malign Presence (Aura)').text,/If you do, increase/);
assert.doesNotMatch(JSON.stringify(codex),/with 12"|it's ranged weapons|"Burrowers"/);
const tyrannofexPoints=points.units.find(unit=>unit.title==='Tyrannofex');
assert.deepEqual(tyrannofexPoints.paidWargear.map(item=>[item.name,item.value]),[['Acid spray',10],['Rupture cannon',20]]);
assert.deepEqual(points.units.find(unit=>unit.title==='Neurogaunts').points.map(item=>item.label),['11 models','22 models']);
assert.ok(points.enhancements.some(item=>item.title==='Naturalised Camouflage'));
assert.ok(points.enhancements.some(item=>item.title==='Instinctive Defence'));
assert.ok(reader.includes('Composition & Wargear'));
assert.ok(reader.includes('Wargear Options'));
assert.doesNotMatch(reader,/Wargear options and replacement limits are not yet verified/);
for(const detachment of pack.detachments){
  assert.match(reader,new RegExp(`id="detachment-${detachment.id}"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-rule" data-nav-depth="3"`));
  assert.match(reader,new RegExp(`id="${detachment.id}-rule" data-track="${detachment.id}-rule"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-enhancements" data-nav-depth="3"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-stratagems" data-nav-depth="3"`));
  for(const stratagem of detachment.stratagems){
    assert.ok(stratagem.when&&stratagem.target&&stratagem.effect,`${stratagem.title}: incomplete card`);
    assert.match(related,new RegExp(`data-rule-id="${stratagem.id}"`));
  }
}
assert.doesNotMatch(reader,/death-guard-cover|CODEX REGISTER \/\/ XIV|Technical placeholder/);
assert.match(reader,/Reference in verification/);
assert.match(reader,/army-related-rules\.js/);
assert.doesNotMatch(reader,/army-book-app\.js/,'Tyranids must not load the generic monolithic Army Book runtime');
assert.doesNotMatch(reader,/unit-source-state/,'per-datasheet source telemetry must not clutter the playable reader');
assert.match(app,/new window\.DGNavigation\(\)/);
assert.match(app,/new window\.DGPopups\(terms,fullEntry\)/);
assert.match(app,/WHArmyRelatedRules\?\.install/);
assert.match(app,/new URL\('\.\/mobile\/'\+route/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/death-guard\/scripts\/view-router\.js\?v=2/);
assert.doesNotMatch(app,/WHArmyBook\.install/);
assert.match(bookCss,/tyranids-cover-800\.webp/,'the supplied Tyranids artwork must be used by the desktop hero');
assert.doesNotMatch(bookCss,/html\[data-view="mobile"\]/,'Phone Mode must use focused pages, not the desktop monolith');
assert.ok(Object.keys(context.terms).length>=300);
assert.equal(context.terms['tyranids-detachment-rule-mindhunger'].navigation.rule,'detachment-ambush-predators');

const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(repo,'books','shared','related-rules-matcher.js'),'utf8'),sandbox);
const keywords=values=>new Set(values.map(value=>value.toUpperCase()));
const decodeAttribute=value=>value.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const attribute=(tag,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
const profiles=[...(reader.match(/<article class="unit-card\b[^>]*>/g)||[])].map(tag=>{
  const intrinsic=keywords(attribute(tag,'data-keywords').split('|').filter(Boolean));
  let candidates=[];
  try{candidates=JSON.parse(decodeAttribute(attribute(tag,'data-related-candidates'))).map(candidate=>({...candidate,keywords:keywords(candidate.keywords||[])}));}catch{}
  return {unitId:attribute(tag,'id'),keywords:intrinsic,intrinsicKeywords:intrinsic,candidates:candidates.length?candidates:undefined,abilities:new Set()};
});
const allStratagems=[...pack.detachments,...codexParity.detachments].flatMap(detachment=>detachment.stratagems);
for(const stratagem of allStratagems){
  const rule=relatedRules.stratagems[stratagem.id];
  assert.ok(rule,`${stratagem.title}: missing explicit eligibility`);
  assert.ok(profiles.some(profile=>sandbox.window.WHRelatedRules.matches(rule,profile)),`${stratagem.title}: no real Tyranids datasheet can satisfy its target`);
  const card=new RegExp(`<article class="stratagem surface" data-rule-id="${stratagem.id}" data-eligibility="([^"]+)"`).exec(related);
  assert.ok(card,`${stratagem.title}: generated card does not use audited eligibility`);
  assert.deepEqual(JSON.parse(decodeAttribute(card[1])),rule,`${stratagem.title}: generated eligibility differs from audited contract`);
}
const lictor={unitId:'unit-lictor',keywords:keywords(['Tyranids','Infantry','Lictor'])};
const monster={unitId:'unit-norn-emissary',keywords:keywords(['Tyranids','Monster','Norn Emissary'])};
assert.equal(sandbox.window.WHRelatedRules.matches({v:1,roles:[{side:'friendly',subject:'unit',selector:{unitIds:['unit-lictor']}}]},lictor),true);
assert.equal(sandbox.window.WHRelatedRules.matches({v:1,roles:[{side:'friendly',subject:'unit',selector:{allKeywords:['TYRANIDS','MONSTER']}}]},lictor),false);
assert.equal(sandbox.window.WHRelatedRules.matches({v:1,roles:[{side:'friendly',subject:'unit',selector:{allKeywords:['TYRANIDS','MONSTER']}}]},monster),true);
assert.equal(sandbox.window.WHRelatedRules.matches(relatedRules.stratagems['retreat-below'],lictor),true,'Retreat Below must remain available to a non-Burrower Tyranids unit');
assert.equal(sandbox.window.WHRelatedRules.matches(relatedRules.stratagems['swarming-assault'],lictor),false,'Infantry must not receive the Monster-only Swarming Assault');
assert.equal(sandbox.window.WHRelatedRules.matches(relatedRules.stratagems['swarming-assault'],monster),true,'Tyranids Monster misses Swarming Assault');
const prime=profiles.find(profile=>profile.unitId==='unit-tyranid-prime-with-lash-whip');
assert.ok(prime,'Tyranid Prime fixture is absent');
assert.equal(sandbox.window.WHRelatedRules.matches(relatedRules.stratagems['alien-physiology'],{...prime,candidates:undefined}),false,'Unattached Tyranid Prime receives a Warriors-only Stratagem');
assert.equal(sandbox.window.WHRelatedRules.matches(relatedRules.stratagems['alien-physiology'],prime),true,'Tyranid Prime attached to Warriors loses their relevant Stratagem');

console.log('Tyranids QA passed: 57 datasheets, 10 detachments, 51 Stratagems, exact wargear, glossary and Related Rules contracts.');
