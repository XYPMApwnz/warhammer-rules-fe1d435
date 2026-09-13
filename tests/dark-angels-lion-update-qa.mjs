import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=file=>fs.readFileSync(file,'utf8');
const load=(file,key)=>{const scope={window:{}};vm.runInNewContext(read(file),scope,{filename:file});return JSON.parse(JSON.stringify(scope.window[key]));};

const pack=JSON.parse(read('books/dark-angels/content/dark-angels-faction-pack.en.json'));
const update=pack.updates.find(item=>item.id==='rules-updates-10-left');
assert.ok(update,'Dark Angels page 10 update must be published');
assert.equal(update.provenance.sourceId,'dark-angels-faction-pack-v1.2');
assert.deepEqual(update.sourcePages,[10]);
assert.match(update.change,/Mist-wreathed Shadow Realms: In your Command phase/);
assert.doesNotMatch(update.change,/Mist-wreathed Shadow Realms: At the end of your opponent/);

const canonical=JSON.parse(read('books/dark-angels/content/dark-angels-codex-datasheets.en.json'));
const lion=canonical.datasheets.find(unit=>unit.id==='unit-lion-eljonson');
const ability=lion?.abilities.find(item=>item.title==='Mist-wreathed Shadow Realms');
assert.match(ability?.text||'',/^In your Command phase/);

const roster=load('books/dark-angels/scripts/roster-data.js','WH_BOOK_ROSTER_CATALOG');
const generatedLion=roster.units.find(unit=>unit.id==='unit-lion-eljonson');
const generatedAbility=generatedLion?.gameSelections?.abilities.find(item=>item.title==='Mist-wreathed Shadow Realms');
assert.match(generatedAbility?.text||'',/^In your Command phase/);

const targets=load('books/dark-angels/scripts/target-data.js','WH_ARMY_BOOK_TARGETS');
const updateHtml=targets.html.slice(targets.targets['update-rules-updates-10-left'].start,targets.targets['update-rules-updates-10-left'].end);
assert.match(updateHtml,/Mist-wreathed Shadow Realms: In your Command phase/);
assert.doesNotMatch(updateHtml,/Mist-wreathed Shadow Realms: At the end of your opponent/);

console.log('Dark Angels Lion update QA passed: official update, canonical datasheet, roster catalog, and rendered target use Command-phase timing.');
