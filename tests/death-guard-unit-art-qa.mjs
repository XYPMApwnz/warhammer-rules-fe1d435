import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative));
const text=relative=>read(relative).toString('utf8');
const manifest=JSON.parse(text('books/death-guard/presentation/unit-images.json'));
const scope={};scope.window=scope;scope.globalThis=scope;vm.runInNewContext(text('books/death-guard/scripts/roster-data.js'),scope);
const catalog=scope.WH_BOOK_ROSTER_CATALOG;
const reader=text('books/death-guard/reader.html'),targets=text('books/death-guard/scripts/target-data.js'),sw=text('service-worker.js');
const amBuild=text('books/adeptus-mechanicus/tools/canonical-build-extension.mjs'),dgBuild=text('books/death-guard/tools/canonical-build-extension.mjs');
const entries=Object.entries(manifest.units),ids=new Set(catalog.units.map(unit=>unit.id));
const expectedWithoutArt=['unit-chaos-predator-destructor','unit-daemon-prince-of-nurgle','unit-daemon-prince-of-nurgle-with-wings','unit-foetid-bloat-drone-with-heavy-blight-launcher'];
const expectedPresentation={mode:'background',desktop:{scale:1.28,x:'-5%',y:'1%',opacity:.22},phone:{scale:1.14,x:'-4%',y:'1%',opacity:.18}};

assert.equal(manifest.schema,1);
assert.equal(manifest.bookId,'death-guard');
assert.equal(catalog.schema,'wh40k-army-roster-catalog/v1');
assert.equal(catalog.units.length,36);
assert.equal(entries.length,32);
assert.equal(new Set(entries.map(([id])=>id)).size,32);
assert.deepEqual([...catalog.units.map(unit=>unit.id).filter(id=>!manifest.units[id]).sort()],expectedWithoutArt);

for(const [id,art] of entries){
  assert(ids.has(id),`${id}: canonical Datasheet missing`);
  assert.equal(art.processing.pixelContentChanged,false,`${id}: pixel freeze lost`);
  assert.deepEqual(art.presentation,expectedPresentation,`${id}: shared background presentation contract`);
  const file=read(`books/death-guard/${art.asset}`);
  assert.equal(crypto.createHash('sha256').update(file).digest('hex'),art.sha256,`${id}: byte hash mismatch`);
  assert.equal(file.subarray(0,8).toString('hex'),'89504e470d0a1a0a',`${id}: not PNG`);
  assert.equal(file.readUInt32BE(16),art.width,`${id}: width mismatch`);
  assert.equal(file.readUInt32BE(20),art.height,`${id}: height mismatch`);
  assert([4,6].includes(file[25]),`${id}: PNG has no alpha channel`);
  assert(targets.includes(String.raw`src=\"./${art.asset}`),`${id}: Phone target payload wiring missing`);
  assert(sw.includes(`"./books/death-guard/${art.asset}"`),`${id}: APP_SHELL wiring missing`);
}

assert.equal((reader.match(/class="unit-art"/g)||[]).length,0,'PHONE-1 shell contains rendered Datasheets');
assert.equal((targets.match(/class=\\"unit-art-background\\"/g)||[]).length,32,'canonical target payload background art count');
assert.equal((targets.match(/class=\\"unit-art\\"/g)||[]).length,0,'foreground art returned');
assert(reader.includes('../shared/unit-art.css?v=1'),'DG shared art CSS missing');
assert(amBuild.includes("renderUnitArt({unit,unitImages,escape:esc})")&&dgBuild.includes("renderUnitArt({unit,unitImages,escape:esc})"),'shared renderer is not used by both books');
assert(!amBuild.includes('const unitArt=')&&!dgBuild.includes('const unitArt='),'book-local art renderer returned');
assert(!fs.existsSync(path.join(root,'books/death-guard/mobile/unit-art.js')),'Mobile art runtime exists');
assert.equal([...fs.readdirSync(path.join(root,'books/death-guard/mobile'))].filter(file=>file.endsWith('.png')).length,0,'Mobile art copies exist');
assert.equal(new Set(entries.map(([,art])=>art.asset)).size,32,'duplicate destination assets');

console.log('Death Guard unit art QA: PASS (32 wired / 36 canonical Datasheets; 4 intentionally without supplied art).');
