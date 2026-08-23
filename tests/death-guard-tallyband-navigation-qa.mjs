import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const presentation=JSON.parse(readFileSync(path.join(root,'books/death-guard/sources/canonical-presentation-contract.json'),'utf8'));
const book=JSON.parse(readFileSync(path.join(root,'books/death-guard/content/death-guard-rules.en.json'),'utf8'));
const art=JSON.parse(readFileSync(path.join(root,'books/death-guard/presentation/unit-images.json'),'utf8'));
const expected=[
  ['unit-beasts-of-nurgle','Beast of Nurgle'],
  ['unit-great-unclean-one','Great Unclean One'],
  ['unit-nurglings','Nurglings'],
  ['unit-plague-drones','Plague Drones'],
  ['unit-plaguebearers','Plaguebearers'],
  ['unit-rotigus','Rotigus']
];
const nodes=presentation.navigation.nodes,group=nodes.find(node=>node.nodeId==='pact-of-decay-datasheets');
assert.deepEqual(group,{order:84,nodeId:'pact-of-decay-datasheets',parentId:'datasheets',depth:2,targetId:'pact-of-decay-datasheets',label:'Tallyband'});
const children=nodes.filter(node=>node.parentId===group.nodeId).sort((a,b)=>a.order-b.order);
assert.deepEqual(children.map(node=>[node.targetId,node.label]),expected,'Tallyband inventory/order drift');
assert.equal(new Set(nodes.map(node=>node.nodeId)).size,nodes.length,'duplicate navigation nodes');
for(const [id] of expected){assert.equal(nodes.filter(node=>node.targetId===id).length,1,`${id}: duplicate or missing navigation target`);assert.equal(book.sections.filter(section=>section.id===id&&section.kind==='unit').length,1,`${id}: canonical Datasheet was copied or lost`);assert.ok(art.units[id],`${id}: artwork mapping missing`);}
const datasheetGroups=nodes.filter(node=>node.parentId==='datasheets').sort((a,b)=>a.order-b.order);
assert.equal(datasheetGroups.at(-1).nodeId,group.nodeId,'Tallyband is not the final Datasheets group');
assert.deepEqual(nodes.filter(node=>node.parentId==='datasheets-epic-heroes').map(node=>node.targetId),['unit-mortarion','unit-typhus'],'Epic Heroes inventory changed');
assert.equal(book.sections.filter(section=>section.kind==='unit').length,36,'canonical DG Datasheet count changed');
assert.equal(Object.keys(art.units).length,32,'DG artwork coverage changed');
assert.equal(presentation.sectionOwnership.records.find(record=>record.id===group.nodeId)?.parentId,'datasheets','Tallyband content ownership is not Datasheets');
console.log('Death Guard Tallyband navigation QA: PASS (6 existing targets; 36 Datasheets; art 32/36).');
