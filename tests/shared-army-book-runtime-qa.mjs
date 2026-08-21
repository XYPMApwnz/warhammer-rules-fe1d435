import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';
import {conditionsFor,createCompatibleRulesSource,loadCompatibleRulesSource,validateCompatibleRulesMatrix} from '../books/shared/compatible-rules-matrix.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const matrix=JSON.parse(read('books/space-marines/generated/compatible-rules.json'));
const source=createCompatibleRulesSource(matrix,{schema:'space-marines-compatible-rules/v1'});
const [unitId,rows]=Object.entries(matrix.units).find(([,items])=>items.some(row=>row.scope==='core')&&items.some(row=>row.detachmentId));
const detachmentRow=rows.find(row=>row.detachmentId),coreRow=rows.find(row=>row.scope==='core');
const filtered=source.rowsForUnit(unitId,{detachmentId:`detachment-${detachmentRow.detachmentId}`});

assert.equal(source.schema,matrix.schema);
assert.equal(source.hasUnit(unitId),true);
assert(filtered.includes(detachmentRow));
assert(filtered.includes(coreRow));
assert(filtered.every(row=>row.scope==='core'||row.detachmentId===detachmentRow.detachmentId));
assert.deepEqual(conditionsFor({condition:'attachment-unknown'}),['attachment-unknown']);
assert.deepEqual(conditionsFor({condition:'a',conditions:['a','b','a']}),['a','b']);

const conditional=Object.values(matrix.units).flat().find(row=>row.state==='conditional'&&conditionsFor(row).includes('attachment-unknown'));
assert(conditional,'Space Marines matrix must prove attachment-unknown row preservation');
assert.equal(source.rowsForUnit(Object.keys(matrix.units).find(id=>matrix.units[id].includes(conditional))).includes(conditional),true);
assert.equal(ruleFacts.staticCompatible(conditional),false);

const loaded=await loadCompatibleRulesSource('matrix.json',{schema:matrix.schema,fetch:async url=>({ok:url==='matrix.json',status:200,json:async()=>matrix})});
assert.equal(loaded.hasUnit(unitId),true);
assert.throws(()=>validateCompatibleRulesMatrix(matrix,{schema:'wrong-schema'}),/Unsupported Compatible Rules schema/);
assert.throws(()=>validateCompatibleRulesMatrix({schema:'test/v1',units:{unit:[{ruleId:'rule',state:'match',conditions:[1]}]}},{schema:'test/v1'}),/conditions must be strings/);

const armyBook=read('books/shared/army-book-app.js'),relatedRules=read('books/shared/army-related-rules.js'),spaceMarines=read('books/space-marines/scripts/app.js'),darkAngels=read('books/dark-angels/scripts/app.js');
assert.match(armyBook,/relatedConfig=config\.relatedRules/);
assert.match(armyBook,/extensions\.forEach/);
assert.match(armyBook,/return app/);
assert.match(relatedRules,/rowsForUnit/);
assert.match(spaceMarines,/shared\/compatible-rules-matrix\.mjs/);
assert.match(spaceMarines,/window\.WHArmyBook\.install/);
assert(!fs.existsSync(path.join(root,'books/space-marines/scripts/compatible-rules-runtime.mjs')));
assert.match(darkAngels,/relatedRules:\{enabled:true\}/);
assert.match(darkAngels,/extensions:/);
assert.doesNotMatch(armyBook,/bookId\s*===/);

console.log('Shared Army Book runtime QA passed.');
