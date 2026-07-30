import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const decode=value=>String(value||'').replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const attr=(tag,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
const values=set=>[...(set||[])].sort();
let profiles=0;

for(const book of ['death-guard','adeptus-mechanicus','tyranids','tau-empire']){
  const html=fs.readFileSync(path.join(root,'books',book,'reader.html'),'utf8');
  assert.match(html,/shared\/rule-facts\.js\?v=1/,`${book}: shared facts runtime is absent`);
  for(const tag of html.match(/<article class="unit-card\b[^>]*>/g)||[]){
    const dataset={keywords:decode(attr(tag,'data-keywords')),relatedCandidates:decode(attr(tag,'data-related-candidates'))};
    const identity={id:attr(tag,'id')};
    const record=ruleFacts.recordFromDataset(dataset,identity);
    const fromRecord=ruleFacts.profileFromRecord(record),fromDataset=ruleFacts.profileFromDataset(dataset,identity);
    assert.deepEqual(values(fromDataset.keywords),values(fromRecord.keywords),`${book}/${identity.id}: keyword parity`);
    assert.deepEqual((fromDataset.candidates||[]).map(item=>values(item.keywords)),(fromRecord.candidates||[]).map(item=>values(item.keywords)),`${book}/${identity.id}: candidate parity`);
    assert.ok(fromDataset.unitId&&fromDataset.keywords.size,`${book}/${identity.id}: incomplete facts`);
    profiles+=1;
  }
}

const fixture=ruleFacts.profileFromRecord({unitId:'unit-fixture',keywords:['  Death   Guard ','vehicle'],candidates:[{unitId:'unit-attached',keywords:['Death Guard','Character']}]});
assert.deepEqual(values(fixture.keywords),['DEATH GUARD','VEHICLE']);
assert.deepEqual(values(fixture.candidates[0].keywords),['CHARACTER','DEATH GUARD']);
assert.equal(fixture.slug,'fixture');
assert.ok(profiles>100);
console.log(`PASS shared rule facts parity: ${profiles} published datasheets`);
