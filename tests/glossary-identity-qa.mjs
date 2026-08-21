import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const registry=JSON.parse(read('glossary/registry.en.json')).terms;
const aliases=JSON.parse(read('glossary/aliases.en.json')).aliases;
const contexts=Object.fromEntries(['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','space-marines','blood-angels'].map(book=>[
  book,
  JSON.parse(read(`glossary/contexts/${book}.json`)).terms
]));
const sandbox={window:{}};
vm.runInNewContext(read('glossary/generated/glossary.en.js'),sandbox);
const api=sandbox.window.WH40K_GLOSSARY;

const registryIds=Object.keys(registry),aliasIds=Object.keys(aliases);
assert.equal(new Set(registryIds).size,registryIds.length,'canonical glossary IDs must be unique');
for(const id of registryIds)assert.equal(registry[id].id,id,`${id}: registry key and entry identity differ`);
assert.equal(api.counts.terms,registryIds.length,'generated glossary term count differs from the canonical registry');
assert.equal(api.counts.aliases,aliasIds.length,'generated glossary alias count differs from the canonical aliases');
assert.match(api.contentHash,/^[a-f0-9]{64}$/,'generated glossary content hash is not deterministic');
assert.equal(registryIds.length,2588,'current canonical glossary inventory changed unexpectedly');
assert.equal(Object.keys(aliases).length,662,'the three old canonical IDs must remain aliases');
for(const id of ['tyranids-ability-alpha-invader','tyranids-ability-hypersensory-array','tyranids-weapon-prime-claws-and-talons','tyranids-weapon-ravener-heavy-claws-and-talons','tyranids-weapon-venom-bolt']){
  assert.equal(registry[id]?.canonicalSource?.locator,'unit-hyperadapted-raveners',`${id}: current Hyperadapted Raveners glossary identity is missing`);
  assert.equal(api.get(id).id,id,`${id}: generated glossary cannot resolve the canonical identity`);
}
assert.ok(registry['blood-angels-weapon-heavy-bolt-pistol-2'],'canonical Blood Angels Heavy Bolt Pistol identity is missing');
assert.ok(!registry['blood-angels-weapon-heavy-bolt-pistol-3'],'removed duplicate Blood Angels Heavy Bolt Pistol identity reappeared');

const resolutions={
  'saving-throw':'core-rule-05-03-01-saving-throw',
  'leadership-test':'core-rule-01-06-01-leadership-test',
  'battle-shock-test':'core-rule-01-07-02-battle-shock-test',
  'space-marines-weapon-grav-cannon-3':'space-marines-weapon-grav-cannon-2',
  'tau-empire-ability-for-the-greater-good':'tau-empire-army-rule-for-the-greater-good',
  'tyranids-ability-shadow-in-the-warp':'tyranids-army-rule-shadow-in-the-warp'
};
for(const [alias,target] of Object.entries(resolutions)){
  assert.equal(api.resolve(alias),target,`${alias} must resolve to its confirmed canonical concept`);
  if(alias.includes('-ability-')||alias.endsWith('-3'))assert.ok(!registry[alias],`${alias} must not remain canonical`);
}

const rollLabels=[
  ['core-rule-05-03-save-rolls','Saving throw','Saving throws'],
  ['core-rule-01-06-leadership-rolls','Leadership test','Leadership tests'],
  ['core-rule-01-07-battle-shock-rolls','Battle-shock test','Battle-shock tests']
];
for(const [id,singular,plural] of rollLabels){
  assert.ok(!registry[id].matchLabels.includes(singular),`${singular} must not compete with its exact Core clarification`);
  assert.ok(registry[id].matchLabels.includes(plural),`${plural} procedure label must remain unchanged`);
}

const grav=registry['space-marines-weapon-grav-cannon-2'];
assert.ok(grav,'the canonical BS 3+ Grav-cannon must remain in the registry');
assert.deepEqual(grav.structured.weapon,{Range:'24"',A:'3',BS:'3+',S:'6',AP:'-1',D:'3'});
assert.match(grav.definition.en,/Anti-vehicle 2\+$/i);
assert.ok(registry['space-marines-weapon-grav-cannon'],'the distinct BS 4+ Grav-cannon must remain canonical');
assert.equal(contexts['space-marines']['space-marines-weapon-grav-cannon-3'].termId,grav.id);
assert.equal(api.forBook('space-marines')['space-marines-weapon-grav-cannon-3'].fullRulePath,'books/space-marines/reader.html#unit-centurion-devastator-squad');

const localCases=[
  ['tau-empire','tau-empire-ability-for-the-greater-good','tau-empire-army-rule-for-the-greater-good',26,'unit-breacher-team'],
  ['tyranids','tyranids-ability-shadow-in-the-warp','tyranids-army-rule-shadow-in-the-warp',17,'unit-broodlord']
];
for(const [book,localId,target,ownerCount,rule] of localCases){
  const context=contexts[book][localId],view=api.forBook(book)[localId];
  const linkable=api.linkables(book).find(entry=>entry.id===localId);
  assert.equal(context.termId,target);
  assert.equal(context.navigation.units.length,ownerCount,`${localId} owners must remain intact`);
  assert.equal(view.id,target);
  assert.equal(view.rule,rule);
  assert.equal(view.fullRulePath,`books/${book}/reader.html#${rule}`);
  assert.equal(linkable.termId,target);
  assert.equal(linkable.owners.length,ownerCount);
}

const contextOnlyCases=[
  ['space-marines','space-marines-ability-invulnerable-save'],
  ['space-marines','space-marines-ability-invulnerable-save-2'],
  ['space-marines','space-marines-ability-transport'],
  ['space-marines','space-marines-ability-damaged-1-4-wounds-remaining'],
  ['adeptus-mechanicus','adeptus-mechanicus-datasheet-damaged-1-4-wounds-remaining'],
  ['death-guard','death-guard-unit-plague-marines'],
  ['adeptus-mechanicus','adeptus-mechanicus-unit-onager-dunecrawler']
];
for(const [book,id] of contextOnlyCases){
  const term=registry[id],view=api.forBook(book)[id];
  const context=Object.values(contexts[book]).find(entry=>(aliases[entry.termId]||entry.termId)===id);
  const linkable=api.linkables(book).find(entry=>entry.termId===id);
  assert.ok(term&&view&&context&&linkable,`${id} must retain registry, book context and linkable identity`);
  assert.equal(term.presentation,'metadata',`${id} must be hidden only by presentation`);
  assert.equal(api.get(id).id,id,`${id} must remain directly addressable`);
  assert.equal(view.definition,term.definition.en,`${id} must retain its definition`);
  assert.equal(JSON.stringify(view.source),JSON.stringify(term.canonicalSource),`${id} must retain source provenance`);
  assert.equal(linkable.termId,id,`${id} must not redirect to another canonical entry`);
}
assert.equal(api.forBook('space-marines')['space-marines-ability-invulnerable-save'].definition,'4+');
assert.equal(api.forBook('space-marines')['space-marines-ability-invulnerable-save-2'].definition,'This model has a 4+ invulnerable save against melee attacks.');
assert.equal(api.forBook('space-marines')['space-marines-ability-transport'].fullRulePath,'books/space-marines/reader.html#unit-drop-pod');
assert.equal(api.forBook('space-marines')['space-marines-ability-damaged-1-4-wounds-remaining'].fullRulePath,'books/space-marines/reader.html#unit-hammerfall-bunker');

const keepPairs=[
  ['space-marines-ability-transport-7','space-marines-ability-transport-8'],
  ['space-marines-enhancement-adamantine-mantle','space-marines-enhancement-adamantine-mantle-2'],
  ['space-marines-enhancement-forged-in-battle','space-marines-enhancement-forged-in-battle-2'],
  ['space-marines-enhancement-war-tempered-artifice','space-marines-enhancement-war-tempered-artifice-2'],
  ['space-marines-stratagem-armour-of-contempt','space-marines-stratagem-armour-of-contempt-2'],
  ['space-marines-stratagem-crucible-of-battle','space-marines-stratagem-crucible-of-battle-2']
];
for(const [first,second] of keepPairs){
  assert.ok(registry[first]&&registry[second],`${first} and ${second} must remain separate canonical entries`);
  assert.equal(contexts['space-marines'][first].termId,first);
  assert.equal(contexts['space-marines'][second].termId,second);
  assert.notEqual(contexts['space-marines'][first].navigation.rule,contexts['space-marines'][second].navigation.rule);
}

console.log('Glossary identity QA passed: 6 targeted resolutions, 7 context-only identities, 3 preserved local contexts, 6 keep-both controls.');
