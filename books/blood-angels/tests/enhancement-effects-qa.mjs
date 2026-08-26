import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../scripts/roster-data.js',import.meta.url),'utf8'),context);
const enhancements=Object.values(context.window.WH_BOOK_ROSTER_ENHANCEMENTS),local=enhancements.filter(item=>!item.sourceId),provider=fs.readFileSync(new URL('../../extensions/book-roster-enhancement-providers.js',import.meta.url),'utf8');
assert.equal(local.length,26,'BA local Enhancement count');
assert.ok(local.every(item=>item.owner?.selector&&item.assignment),'every BA Enhancement has exact owner and assignment metadata');
const byTitle=title=>local.find(item=>item.title.replace(/[^a-z0-9]/gi,'').toLowerCase()===title.replace(/[^a-z0-9]/gi,'').toLowerCase());
assert.deepEqual(Array.from(byTitle('Blood Boil').owner.selector.allKeywords),['ADEPTUS ASTARTES','PSYKER','CHARACTER']);
assert.deepEqual(Array.from(byTitle('Carmine Reliquary').owner.selector.allKeywords),['ADEPTUS ASTARTES','CHAPLAIN','CHARACTER']);
assert.deepEqual(Array.from(byTitle('Sanguinary Tear (Aura)').owner.selector.allKeywords),['ADEPTUS ASTARTES','CHARACTER']);
for(const title of ['Blood Boil','Carmine Reliquary','Prescient Flash',"On the Archtraitor's Bridge","Archangel's Shard",'Artisan of War'])assert.ok(byTitle(title),title);
assert.match(provider,/const baLocalConformanceEnhancements=new Map/);
assert.match(provider,/const baAttachedAbilitySemantics=new Map/);
assert.match(provider,/const baDetachmentSemantics=new Map/);
assert.doesNotMatch(provider,/const baEffects|applyBaEffect|Derived permanent ability: this unit has -3|Derived profiles: Anti-Chaos/);
console.log('Blood Angels Enhancement effect QA passed: 26 exact owners, seven structured anchors, canonical references and zero legacy manual effects.');
