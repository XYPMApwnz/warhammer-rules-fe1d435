import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=process.env.R2_QA_ROOT?path.resolve(process.env.R2_QA_ROOT):path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const oldId='unit-lieutenant-titus',newId='unit-captain-titus',oldTitle='Lieutenant Titus',newTitle='Captain Titus';
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const objects=(value,predicate,result=[])=>{if(Array.isArray(value))for(const item of value)objects(item,predicate,result);else if(value&&typeof value==='object'){if(predicate(value))result.push(value);for(const item of Object.values(value))objects(item,predicate,result);}return result;};
const mapStrings=(value,mapper)=>Array.isArray(value)?value.map(item=>mapStrings(item,mapper)):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,mapStrings(item,mapper)])):typeof value==='string'?mapper(value):value;
const countExactString=(value,needle)=>{let count=0;mapStrings(value,text=>{if(text===needle)count++;return text;});return count;};
const neutral=value=>mapStrings(value,text=>text.replaceAll(oldId,'unit-titus').replaceAll(newId,'unit-titus').replaceAll(oldTitle,'Titus').replaceAll(newTitle,'Titus'));
const fingerprint=value=>crypto.createHash('sha256').update(JSON.stringify(neutral(value))).digest('hex');
const canonical=json('books/space-marines/content/space-marines-codex-datasheets.en.json').datasheets;
const newUnits=canonical.filter(unit=>unit.id===newId),oldUnits=canonical.filter(unit=>unit.id===oldId);
assert.equal(newUnits.length,1,'Captain Titus canonical identity must exist exactly once');
assert.equal(oldUnits.length,0,'Lieutenant Titus canonical identity must not remain active');
const titus=newUnits[0];
assert.equal(titus.title,newTitle,'Captain Titus display title');
assert.equal(JSON.stringify(titus).includes(oldTitle),false,'Old Titus display title must not remain in canonical Datasheet');
assert.ok(titus.keywords?.includes('Captain'),'Captain Titus classification');
assert.equal(titus.keywords?.includes('Lieutenant'),false,'Lieutenant classification must not remain on Titus');
assert.match(JSON.stringify(titus.composition),/Captain Titus/,'Captain Titus composition');

const expectedRelations=[
  ['unit-assault-intercessor-squad','Assault Intercessor Squad'],
  ['unit-bladeguard-veteran-squad','Bladeguard Veteran Squad'],
  ['unit-company-heroes','Company Heroes'],
  ['unit-hellblaster-squad','Hellblaster Squad'],
  ['unit-infernus-squad','Infernus Squad'],
  ['unit-intercessor-squad','Intercessor Squad'],
  ['unit-sternguard-veteran-squad','Sternguard Veteran Squad'],
  ['unit-victrix-honour-guard','Victrix Honour Guard'],
  ['unit-wardens-of-ultramar','Wardens of Ultramar']
];
assert.deepEqual(titus.relations?.leader,expectedRelations.map(([,title])=>title),'Exact Captain Titus canonical Leader set');
const canonicalById=new Map(canonical.map(unit=>[unit.id,unit]));
for(const [id,title] of expectedRelations)assert.equal(canonicalById.get(id)?.title,title,`Stable relation target ${id}`);

const pointRecords=objects(json('books/space-marines/content/space-marines-points.en.json'),item=>item.id===newId);
assert.equal(pointRecords.length,1,'Captain Titus point owner identity');
assert.equal(objects(json('books/space-marines/content/space-marines-points.en.json'),item=>item.id===oldId).length,0,'Old Titus point identity');
assert.equal(pointRecords[0].title,newTitle,'Captain Titus point owner title');
assert.equal(fingerprint(pointRecords[0]),'9dee6d7e4e5a4e32acc88271fcb90882868f08d594ea923b020fc8fd9d369693','Titus point factual fingerprint');

const wargearRoot=json('books/space-marines/content/space-marines-codex-wargear.en.json');
const wargearRecords=objects(wargearRoot,item=>item.title===newTitle);
assert.equal(wargearRecords.length,1,'Captain Titus wargear owner identity');
assert.equal(objects(wargearRoot,item=>item.title===oldTitle).length,0,'Old Titus wargear title');
assert.equal(fingerprint(wargearRecords[0]),'c2111b7940a5e0f60f90551e41f2f3d9107424f4def3ed5427d263a189b2593a','Titus wargear factual fingerprint');

const compatibleSnapshot=json('books/space-marines/sources/wahapedia-compatible-rules.snapshot.json');
assert.ok(compatibleSnapshot.units?.[newId],'Captain Titus compatible-rules canonical reference');
assert.equal(compatibleSnapshot.units?.[oldId],undefined,'Old Titus compatible-rules canonical reference');
const related=json('books/space-marines/content/space-marines-related-rules.en.json');
assert.equal(countExactString(related,oldId),0,'Old Titus related-rule identity');
assert.equal(countExactString(related,newId),31,'Captain Titus related-rule identity count');
const provider=read('books/extensions/book-roster-enhancement-providers.js');
assert.equal(provider.split(oldId).length-1,0,'Old Titus provider identity');
assert.equal(provider.split(newId).length-1,2,'Captain Titus provider identity count');
const owned=json('tests/fixtures/army-book-owned-datasheets.json');
assert.equal(countExactString(owned,oldId),0,'Old Titus ownership fixture identity');
assert.equal(countExactString(owned,newId),1,'Captain Titus ownership fixture identity');

const context={window:{}};vm.createContext(context);
vm.runInContext(read('books/space-marines/scripts/roster-data.js'),context,{filename:'space-marines/roster-data.js'});
const catalog=context.window.WH_BOOK_ROSTER_CATALOG;
const catalogUnits=catalog.units.filter(unit=>unit.id===newId),oldCatalogUnits=catalog.units.filter(unit=>unit.id===oldId);
assert.equal(catalogUnits.length,1,'Captain Titus catalog identity');
assert.equal(oldCatalogUnits.length,0,'Old Titus catalog identity');
const catalogTitus=catalogUnits[0];
assert.equal(catalogTitus.title,newTitle,'Captain Titus catalog title');
assert.equal(JSON.stringify(catalog).includes(oldId),false,'Old Titus identity must not be exposed in the roster catalog');
const direct=catalogTitus.relations?.canLead||[];
assert.deepEqual(Array.from(direct,item=>String(item.unitId)),expectedRelations.map(([id])=>id),'Exact generated Captain Titus direct relation IDs');
for(const [targetId] of expectedRelations){
  const target=catalog.units.find(unit=>unit.id===targetId);
  assert.ok(target,`Generated Titus target ${targetId}`);
  assert.equal((target.relations?.canBeLedBy||[]).filter(item=>item.unitId===newId).length,1,`Generated inverse ${targetId}<${newId}`);
}
const canonicalIdentityValues=[];
const collectIdentityFields=value=>{if(Array.isArray(value))value.forEach(collectIdentityFields);else if(value&&typeof value==='object'){for(const [key,item] of Object.entries(value)){if(key==='canonicalDatasheetId')canonicalIdentityValues.push(item);collectIdentityFields(item);}}};
collectIdentityFields(catalogTitus);
for(const value of canonicalIdentityValues)assert.equal(value,newId,'Existing runtime canonicalDatasheetId contract');

const activeProductionFiles=[
  'books/space-marines/content/space-marines-codex-datasheets.en.json',
  'books/space-marines/content/space-marines-codex-wargear.en.json',
  'books/space-marines/content/space-marines-points.en.json',
  'books/space-marines/content/space-marines-related-rules.en.json',
  'books/space-marines/sources/wahapedia-compatible-rules.snapshot.json',
  'books/extensions/book-roster-enhancement-providers.js',
  'books/space-marines/reader.html',
  'books/space-marines/scripts/data.js',
  'books/space-marines/scripts/target-data.js',
  'books/space-marines/scripts/roster-data.js',
  'books/dark-angels/scripts/target-data.js',
  'books/dark-angels/mobile/related-rules.inc',
  'glossary/contexts/space-marines.json',
  'glossary/generated/glossary.en.js',
  'glossary/registry.en.json',
  'roster-guides/points-data.js'
];
for(const relative of activeProductionFiles){const source=read(relative);assert.equal(source.includes(oldId),false,`${relative}: old Titus ID`);assert.equal(source.includes(oldTitle),false,`${relative}: old Titus title`);}
assert.equal(fs.existsSync(path.join(root,'books/space-marines/mobile/captain-titus.html')),true,'Captain Titus mobile route');
assert.equal(fs.existsSync(path.join(root,'books/space-marines/mobile/lieutenant-titus.html')),false,'Old Lieutenant Titus mobile route');

console.log('R2 Captain Titus identity QA passed: one canonical/catalog identity, exact 9-edge relation graph, factual fingerprints preserved and no old production identity.');
