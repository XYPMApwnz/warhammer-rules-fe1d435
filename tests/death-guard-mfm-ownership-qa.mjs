import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {applyDeathGuardMfmOwnership} from '../books/death-guard/tools/canonical-source-adapter.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const canonical=json('books/death-guard/content/death-guard-rules.en.json');
const points=json('books/death-guard/sources/official-mfm-v1.3.json');
const expected={datasheets:36,detachments:9,enhancements:30};
const apply=(book=canonical,mfm=points)=>applyDeathGuardMfmOwnership(structuredClone(book),structuredClone(mfm),expected);
const rejects=(label,mutateBook=()=>{},mutateMfm=()=>{})=>{
  const book=structuredClone(canonical),mfm=structuredClone(points);
  mutateBook(book);mutateMfm(mfm);
  assert.throws(()=>applyDeathGuardMfmOwnership(book,mfm,expected),/Death Guard MFM ownership:/,label);
};

assert.equal(points.version,'v1.3','current official MFM source');
assert.deepEqual(apply(),canonical,'MFM ownership must be output-neutral at the canonical model boundary');
rejects('correct-count wrong Datasheet identity',()=>{},mfm=>{mfm.units[0].unitId='unit-not-death-guard';});
rejects('duplicate Datasheet identity',()=>{},mfm=>{mfm.units[1].unitId=mfm.units[0].unitId;});
rejects('official point mutation',()=>{},mfm=>{mfm.units.find(unit=>unit.unitId==='unit-mortarion').schedules[0].values[0].value++;});
rejects('canonical point mutation',book=>{book.sections.find(section=>section.id==='unit-mortarion').points[0].value++;});
rejects('missing bracket',()=>{},mfm=>{mfm.units.find(unit=>unit.unitId==='unit-blightlord-terminators').schedules[0].values.pop();});
rejects('extra bracket',()=>{},mfm=>{mfm.units.find(unit=>unit.unitId==='unit-blightlord-terminators').schedules[0].values.push({label:'99 models',value:999});});
rejects('swapped copy-tier values',()=>{},mfm=>{const unit=mfm.units.find(item=>item.unitId==='unit-defiler'),first=unit.schedules[0].values[0].value;unit.schedules[0].values[0].value=unit.schedules[1].values[0].value;unit.schedules[1].values[0].value=first;});
rejects('paid-wargear drift',()=>{},mfm=>{mfm.units.find(unit=>unit.unitId==='unit-defiler').paidWargear[0].value++;});
rejects('Enhancement point drift',()=>{},mfm=>{const record=mfm.detachments[0].enhancements[0];record.value++;mfm.enhancements.find(item=>item.detachment===mfm.detachments[0].title&&item.title===record.title).value++;});
rejects('Detachment metadata drift',()=>{},mfm=>{mfm.detachments[0].dp='99DP';});

console.log('Death Guard MFM ownership QA: 12/12 PASS');
