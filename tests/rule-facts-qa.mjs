import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const decode=value=>String(value||'').replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const attr=(tag,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
let profiles=0;

assert.equal(ruleFacts.normalizeKeyword('  death   guard '),'DEATH GUARD');
assert.equal(ruleFacts.normalizeKeyword("T'AU EMPIRE"),ruleFacts.normalizeKeyword('T’AU EMPIRE'));
assert.equal(ruleFacts.normalizeKeyword('FOETID BLOAT‑DRONE'),'FOETID BLOAT-DRONE');
assert.equal(ruleFacts.normalizeKeyword('DEATH\u00a0GUARD'),'DEATH GUARD');
assert.throws(()=>ruleFacts.normalizeKeyword({textContent:'DEATH GUARD'}),TypeError);
assert.throws(()=>ruleFacts.normalizeKeyword(null),TypeError);
assert.equal(ruleFacts.textFromDomLike({textContent:'Death Guard'}),'Death Guard');
assert.equal(ruleFacts.textFromDomLike('Death Guard'),'Death Guard');
assert.throws(()=>ruleFacts.textFromDomLike({value:'Death Guard'}),TypeError);

for(const book of ['death-guard','adeptus-mechanicus','tyranids','tau-empire']){
  const html=fs.readFileSync(path.join(root,'books',book,'reader.html'),'utf8');
  assert.match(html,/shared\/rule-facts\.js\?v=2/,`${book}: shared facts runtime is absent`);
  for(const tag of html.match(/<article class="unit-card\b[^>]*>/g)||[]){
    const unitId=attr(tag,'id'),compiled=JSON.parse(decode(attr(tag,'data-rule-facts')));
    const dataset={ruleFacts:decode(attr(tag,'data-rule-facts')),keywords:decode(attr(tag,'data-keywords')),relatedCandidates:decode(attr(tag,'data-related-candidates'))};
    const fromRecord=ruleFacts.profileFromRecord(compiled),fromDataset=ruleFacts.profileFromDataset(dataset,{id:unitId});
    assert.deepEqual(ruleFacts.serializeRuleProfile(fromDataset),ruleFacts.serializeRuleProfile(fromRecord),`${book}/${unitId}: full production profile parity`);
    const ids=new Set([...fromRecord.termIds,...fromDataset.termIds]);
    for(const id of ids)assert.equal(fromDataset.has(id),fromRecord.has(id),`${book}/${unitId}: has(${id}) parity`);
    assert.ok(fromDataset.unitId&&fromDataset.keywords.size,`${book}/${unitId}: incomplete facts`);
    profiles+=1;
  }
}

const fixtureRecord={unitId:'unit-fixture',keywords:['  Death   Guard ','vehicle'],abilities:['Deadly Demise'],termIds:['keyword-death-guard'],candidates:[{unitId:'unit-attached',keywords:['Death Guard','Character'],abilities:['Leader'],termIds:['core-leader']}]};
const source=structuredClone(fixtureRecord),profileA=ruleFacts.profileFromRecord(fixtureRecord),profileB=ruleFacts.profileFromRecord(fixtureRecord);
assert.deepEqual([...profileA.keywords].sort(),['DEATH GUARD','VEHICLE']);
assert.deepEqual([...profileA.candidates[0].keywords].sort(),['CHARACTER','DEATH GUARD']);
assert.equal(profileA.slug,'fixture');
assert.equal(profileA.has('keyword-death-guard'),true);
profileA.keywords.add('MUTATED');profileA.candidates[0].keywords.add('MUTATED');profileA.termIds.add('mutated');
assert.equal(profileB.keywords.has('MUTATED'),false);
assert.equal(profileB.candidates[0].keywords.has('MUTATED'),false);
assert.equal(profileB.termIds.has('mutated'),false);
assert.deepEqual(fixtureRecord,source,'profile creation must not mutate source records');

assert.deepEqual(ruleFacts.parseDatasetJson({},'relatedCandidates',{defaultValue:[],unitId:'unit-fixture'}),[]);
assert.throws(()=>ruleFacts.parseDatasetJson({relatedCandidates:'{bad'},'relatedCandidates',{defaultValue:[],unitId:'unit-fixture'}),/unit-fixture: malformed data-related-candidates.*\{bad/);
assert.throws(()=>ruleFacts.profileFromDataset({keywords:'DEATH GUARD',relatedCandidates:'{bad'},{id:'unit-bad'}),/unit-bad: malformed data-related-candidates/);
assert.throws(()=>ruleFacts.profileFromDataset({relatedCandidates:'[]'},{id:'unit-no-keywords'}),/unit-no-keywords: missing data-keywords/);
assert.throws(()=>ruleFacts.profileFromDataset({keywords:{value:'DEATH GUARD'},relatedCandidates:'[]'},{id:'unit-object-keywords'}),/unit-object-keywords: data-keywords must be a string/);
assert.throws(()=>ruleFacts.profileFromDataset({ruleFacts:'{bad'},{id:'unit-bad-compiled'}),/unit-bad-compiled: malformed data-rule-facts/);
assert.ok(profiles>100);
assert.match(fs.readFileSync(path.join(root,'roster-guides','build-points.mjs'),'utf8'),/profileFromDataset/,'Roster points builder must use the production facts adapter');
const dgSource=fs.readFileSync(path.join(root,'books','death-guard','scripts','related-rules.js'),'utf8');
assert.doesNotMatch(dgSource,/normalize(?:d|Keyword)?\s*\(\s*\{/,'Death Guard must not pass DOM-like objects into keyword normalization');
const dgSandbox={window:{WHRuleFacts:ruleFacts,WHRelatedRules:{enabled:false}}};
vm.runInNewContext(dgSource,dgSandbox,{filename:'death-guard-related-rules.js'});
const grantLabels=(slug,detachment)=>Array.from(dgSandbox.window.DGRelatedRules.grantedKeywords(slug,[detachment]),grant=>ruleFacts.normalizeKeyword(grant.title));
assert.deepEqual(grantLabels('poxwalkers','shamblerot-vectorium'),['BATTLELINE']);
for(const slug of ['foetid-bloat-drone','helbrute'])assert.deepEqual(grantLabels(slug,'contagion-engines'),['CONTAGION ENGINE']);
assert.deepEqual(grantLabels('foetid-bloat-drone','virulent-vectorium'),[]);
console.log(`PASS deep shared rule facts parity: ${profiles} published datasheets`);
