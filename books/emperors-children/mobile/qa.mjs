import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {stratagemTypes} from '../scripts/stratagem-types.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const reader=fs.readFileSync(path.join(root,'../reader.html'),'utf8');
const routeIds=[...reader.matchAll(/<(?:section|article)[^>]+id="((?:detachment|unit)-[^"]+)"/g)].map(match=>match[1]);
const routes=['index.html','army-rules.html','updates.html',...routeIds.map(id=>id.replace(/^(?:detachment|unit)-/,'')+'.html')];

assert.equal(new Set(routeIds).size,28,'Expected 10 Detachments and 18 Datasheets');
for(const route of routes){
  const html=fs.readFileSync(path.join(root,route),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=2/);
  assert.match(html,/\.\/phone-popup-controller\.js\?v=1/);
  assert.match(html,/data-view-switch/);
}
assert.equal(routes.length,31);
assert.equal(stratagemTypes.size,51);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='confirmed'&&item.canonicalType).length,36);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='source-untyped'&&item.canonicalType===null&&item.sourceLabel.endsWith(' Stratagem')).length,15);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='unexplained-unknown').length,0);
assert.ok(fs.readFileSync(path.join(root,'related-rules.inc'),'utf8').includes('related-detachment'));
console.log(`Emperor's Children Phone QA: ${routes.length} routes, 10 detachments, 18 datasheets.`);
