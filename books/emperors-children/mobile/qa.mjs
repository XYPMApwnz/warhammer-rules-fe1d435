import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const reader=fs.readFileSync(path.join(root,'../reader.html'),'utf8');
const routeIds=[...reader.matchAll(/<(?:section|article)[^>]+id="((?:detachment|unit)-[^"]+)"/g)].map(match=>match[1]);
const routes=['index.html','army-rules.html','updates.html',...routeIds.map(id=>id.replace(/^(?:detachment|unit)-/,'')+'.html')];

assert.equal(new Set(routeIds).size,33,'Expected 10 Detachments and 23 Datasheets');
for(const route of routes){
  const html=fs.readFileSync(path.join(root,route),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=1/);
  assert.match(html,/\.\/phone-popup-controller\.js\?v=1/);
  assert.match(html,/data-view-switch/);
}
assert.equal(routes.length,36);
assert.ok(fs.readFileSync(path.join(root,'related-rules.inc'),'utf8').includes('related-detachment'));
console.log(`Emperor's Children Phone QA: ${routes.length} routes, 10 detachments, 23 datasheets.`);
