import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=file=>JSON.parse(fs.readFileSync(new URL(file,import.meta.url),'utf8'));
const text=file=>fs.readFileSync(new URL(file,import.meta.url),'utf8');
const config=read('../book.config.json'),codex=read('../content/blood-angels-codex-datasheets.en.json'),pack=read('../content/blood-angels-faction-pack.en.json'),parity=read('../content/blood-angels-codex-parity.en.json'),manifest=read('../sources/source-manifest.json'),spaceMarines=read('../../space-marines/content/space-marines-codex-datasheets.en.json');
const excluded=new Set(config.dependencyDatasheets.excludeAnyKeywords.map(value=>value.toUpperCase()));
const shared=spaceMarines.datasheets.filter(unit=>!(unit.keywords||[]).some(item=>excluded.has(String(item).toUpperCase()))),localIds=new Set(codex.datasheets.map(unit=>unit.id));

assert.equal(config.id,'blood-angels');
assert.deepEqual(config.dependencies,['space-marines']);
assert.equal(config.dependencyDatasheets.groupByBook,false);
assert.equal(config.rosterSupport,true);
assert.equal(config.compatibleRulesMatrix,true);
assert.equal(config.expected.matchedDetachments,8);
assert.equal(config.expected.codexDatasheets,15);
assert.equal(codex.datasheets.length,15);
assert.equal(shared.length,82);
assert.equal(shared.filter(unit=>localIds.has(unit.id)).length,0);
assert.equal((pack.detachments||[]).length+(parity.detachments||[]).length,8);
assert.equal(manifest.gates?.publishAsComplete,false);
assert.equal('coverImage'in config,false,'Blood Angels must not introduce images in this pass');

const reader=text('../reader.html');
assert.equal((reader.match(/<article class="unit-card/g)||[]).length,97);
assert.equal((reader.match(/Space Marines shared datasheet/g)||[]).length,82);
assert.doesNotMatch(reader,/data-nav-id="datasheets-(?:blood-angels|space-marines)"/);
assert.match(reader,/scripts\/roster-filter\.js\?v=1/);
const app=text('../scripts/app.js');
assert.match(app,/generated\/compatible-rules\.json/);
assert.match(app,/location\.hash\.slice\(1\)/,'Desktop to Phone switching must prefer the current semantic hash');
for(const unit of spaceMarines.datasheets.filter(item=>!shared.includes(item)))assert.ok(!reader.includes(`id="${unit.id}"`),`${unit.title} leaked into Blood Angels`);
assert.doesNotMatch(text('../styles/book.css'),/url\([^)]*assets\/|<img/i);
console.log('Blood Angels QA passed: 15 local + 82 shared Datasheets, 8 Detachments, unified navigation, roster and Compatible Rules enabled.');
