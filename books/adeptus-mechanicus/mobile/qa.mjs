import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const ids=['stratagem-defect-scrutiny','stratagem-repolarised-augurs','stratagem-clandestine-reposition','stratagem-scriptural-prognosis','stratagem-overloaded-safeguards','stratagem-holy-avarice','stratagem-echoes-of-the-conduit-wars','stratagem-chant-of-electrotraction','stratagem-momentum-feedback','stratagem-verse-of-vengeance','stratagem-auto-oracular-retrieval','stratagem-incense-exhausts','stratagem-isolate-and-destroy'];
const cards=markup=>[...markup.matchAll(/<article\b([^>]*\bclass="[^"]*\bstratagem\b[^"]*"[^>]*)>([\s\S]*?)<\/article>/g)].map(([,attrs,body])=>({id:attrs.match(/\bdata-rule-id="([^"]+)"/)?.[1],type:attrs.match(/\bdata-stratagem-type="([^"]+)"/)?.[1],labels:[...body.matchAll(/<span\b[^>]*class="stratagem-type"[^>]*>([^<]*)<\/span>/g)].map(match=>match[1].trim())}));
const routes=fs.readdirSync(root).filter(name=>name.endsWith('.html'));
assert.equal(routes.length,51,'Mechanicus Phone route count changed');
const staticCards=routes.flatMap(name=>cards(fs.readFileSync(path.join(root,name),'utf8')));
const relatedCards=cards(fs.readFileSync(path.join(root,'related-rules.inc'),'utf8'));
for(const [label,inventory] of [['routes',staticCards],['Related Rules',relatedCards]])for(const id of ids){const card=inventory.find(item=>item.id===id);assert.ok(card,`${label} missing ${id}`);assert.equal(card.type,'unknown',`${label} reclassified ${id}`);assert.deepEqual(card.labels,['Type unverified'],`${label} misleading or duplicate label for ${id}`);}
assert.ok(routes.every(name=>fs.readFileSync(path.join(root,name),'utf8').includes('./mobile.js?v=15')),'Phone routes do not use mobile.js?v=15');
const runtime=fs.readFileSync(path.join(root,'mobile.js'),'utf8');
assert.ok(runtime.includes("rosterGuideHref=()=>new URL('../../../roster-guides/index.html',location.href).href"),'Invalid roster handoff must use the neutral Roster Guides URL');
assert.ok(!runtime.includes("rosterGuideHref=()=>window.AMPhoneRoster.withRosterQuery"),'Invalid roster handoff must not carry the rejected roster auto-open query');
console.log(`PASS Mechanicus Phone unverified Stratagem labels: ${ids.length}/${ids.length} across ${routes.length} routes and Related Rules.`);
