import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const ids=[...fs.readFileSync(path.join(root,'docs/ARMY_BOOK_BLUEPRINT.md'),'utf8').matchAll(/^## (AB-[A-Z0-9]+-[0-9]{3})\s/gm)].map(match=>match[1]);
const report=JSON.parse(fs.readFileSync(path.join(root,'books/tyranids/reports/army-book-blueprint-conformance.json'),'utf8'));
const allowed=new Set(['pass','partial','missing','not-verified','book-specific-exception','not-applicable']);
assert.deepEqual(report.requirementCount,{total:83,unique:83});
assert.deepEqual(report.requirements.map(item=>item.id),ids);
assert.equal(new Set(report.requirements.map(item=>item.id)).size,83);
for(const item of report.requirements){
  assert.ok(allowed.has(item.status),`${item.id}: invalid status`);
  assert.ok(item.evidence?.length,`${item.id}: evidence missing`);
  for(const evidence of item.evidence)assert.ok(evidence.type&&evidence.path&&evidence.detail,`${item.id}: incomplete evidence`);
  if(item.status!=='pass')assert.ok(item.rationale,`${item.id}: rationale missing`);
  assert.equal(item.blocker,Boolean(item.blockerKind),`${item.id}: blocker mismatch`);
}
const counts={pass:0,partial:0,missing:0,notVerified:0,bookSpecificException:0,notApplicable:0};
const key={pass:'pass',partial:'partial',missing:'missing','not-verified':'notVerified','book-specific-exception':'bookSpecificException','not-applicable':'notApplicable'};
for(const item of report.requirements)counts[key[item.status]]++;
for(const [name,count] of Object.entries(counts))assert.equal(report.summary[name],count,`summary.${name}`);
assert.deepEqual(report.summary.implementationBlockers,report.requirements.filter(item=>item.blockerKind==='implementation').map(item=>item.id));
assert.deepEqual(report.summary.publicationBlockers,report.requirements.filter(item=>['source-authority','publication','external'].includes(item.blockerKind)).map(item=>item.id));

const source=fs.readFileSync(path.join(root,'books/tyranids/mobile/phone-popup-controller.js'),'utf8');
const {stratagemTypes}=await import(new URL('../scripts/stratagem-types.mjs',import.meta.url));
assert.equal(stratagemTypes.size,51);
assert.equal([...stratagemTypes.values()].filter(type=>type==='unknown').length,15);
assert.equal([...stratagemTypes.values()].filter(type=>type!=='unknown').length,36);
const context={window:{},console,setTimeout,clearTimeout,performance:{now:()=>0}};
vm.runInNewContext(source,context,{filename:'phone-popup-controller.js'});
const State=context.window.TYRPhonePopupState;
assert.equal(typeof State,'function');
const state=new State(id=>['root','nested','other'].includes(id));
assert.equal(state.open('root',false),true);
assert.equal(state.open('root',false),false);
assert.equal(state.open('nested',true),true);
assert.deepEqual([...state.ids],['root','nested']);
assert.equal(state.open('root',true),true);
assert.deepEqual([...state.ids],['root']);
state.open('nested',true);
state.closeFrom(1);
assert.deepEqual([...state.ids],['root']);
assert.deepEqual([...state.restore(['root','missing','other'])],['root']);
assert.doesNotMatch(source,/\bhistory\.(?:pushState|replaceState|back|go)\b/);
console.log(`PASS Tyranids Blueprint report ${report.requirementCount.total}/${report.requirementCount.unique}; popup state semantics`);
