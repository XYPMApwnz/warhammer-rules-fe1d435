import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=file=>fs.readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
const viewer=read('glossary/viewer.js');
const fullEntry=read('books/shared/controllers/full-entry-controller.js');
const runtime=read('glossary/v2/runtime/glossary-v2-runtime.js');

for(const [name,source] of [['Glossary viewer',viewer],['Army full entry',fullEntry]]){
  assert.match(source,/readableSource=sourceDocument&&/u,`${name}: player-facing source gate`);
  assert.match(source,/buildCanonicalBook/u,`${name}: internal builder expression rejection`);
  assert.doesNotMatch(source,/\['Status',term\.status\]/u,`${name}: raw implementation status must not render`);
  assert.doesNotMatch(source,/source\.documentId\|\|'unknown'/u,`${name}: internal or missing sources must not render as player provenance`);
}
assert.match(viewer,/if\(source\.revision\)registryRows\.push\(\['Source revision'/u,'accepted source revision remains presentable');
assert.match(viewer,/if\(source\.locator\)registryRows\.push\(\['Source locator'/u,'accepted source locator remains presentable');
assert.match(viewer,/if\(term\.sourceRefs\?\.length\)registryRows\.push\(\['Contributing sources'/u,'accepted contributing sources remain presentable');
assert.match(runtime,/let entry=explicitCore\?\.domain==='CORE'\?explicitCore:null/u,'explicit Core identity must precede weapon-profile context fallback');

console.log('Glossary source presentation QA passed: raw builder/status metadata is gated while accepted source revision, locator and contributing sources remain available.');
