import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const registry=JSON.parse(read('glossary/registry.en.json')).terms;
const aliases=JSON.parse(read('glossary/aliases.en.json')).aliases;
const contexts=Object.fromEntries(['space-marines','tau-empire','tyranids'].map(book=>[
  book,
  JSON.parse(read(`glossary/contexts/${book}.json`)).terms
]));
const sandbox={window:{}};
vm.runInNewContext(read('glossary/generated/glossary.en.js'),sandbox);
const api=sandbox.window.WH40K_GLOSSARY;

assert.equal(Object.keys(registry).length,2432,'confirmed canonicalization must remove exactly three redundant entries');
assert.equal(Object.keys(aliases).length,662,'the three old canonical IDs must remain aliases');

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
assert.deepEqual(grav.structured.weapon,{Range:'24"',A:'3',BS:'3+',S:'6',AP:'-1',D:'3'});
assert.match(grav.definition.en,/Anti-vehicle 2\+$/i);
assert.ok(registry['space-marines-weapon-grav-cannon'],'the distinct BS 4+ Grav-cannon must remain canonical');
assert.equal(contexts['space-marines']['space-marines-weapon-grav-cannon-3'].termId,grav.id);
assert.equal(api.forBook('space-marines')['space-marines-weapon-grav-cannon-3'].fullRulePath,'books/space-marines/reader.html#unit-centurion-devastator-squad');

const localCases=[
  ['tau-empire','tau-empire-ability-for-the-greater-good','tau-empire-army-rule-for-the-greater-good',26,'unit-breacher-team'],
  ['tyranids','tyranids-ability-shadow-in-the-warp','tyranids-army-rule-shadow-in-the-warp',16,'unit-broodlord']
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

console.log('Glossary identity QA passed: 6 targeted resolutions, 3 preserved local contexts, 6 keep-both controls.');
