import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const manifest=readJson('death-guard/sources/source-manifest.json');
const capture=readJson('death-guard/sources/official-mfm-v1.2.json');
const content=readJson('death-guard/content/death-guard-rules.en.json');
const ledger=readJson('death-guard/content/official-update-ledger.en.json');
const compatible=readJson('death-guard/generated/compatible-rules.json');
const pdf=fs.readFileSync(path.join(root,'death-guard/sources/death-guard-faction-pack-v1.1.pdf'));
const desktop=fs.readFileSync(path.join(root,'death-guard/reader.html'),'utf8');
const phoneUpdates=fs.readFileSync(path.join(root,'death-guard/mobile/updates.html'),'utf8');
const phoneMortarion=fs.readFileSync(path.join(root,'death-guard/mobile/mortarion.html'),'utf8');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex').toUpperCase();
const norm=value=>value.normalize('NFKD').replace(/[’‘]/g,"'").replace(/[‐‑‒–—]/g,'-').replace(/[^a-z0-9]+/gi,' ').trim().toUpperCase();

const factionPack=manifest.sources.find(source=>source.id==='death-guard-faction-pack-v1.1');
const mfm=manifest.sources.find(source=>source.id==='death-guard-mfm-v1.2-capture-2026-08-11');
assert.equal(factionPack.version,'v1.1');
assert.equal(factionPack.pages,17);
assert.equal(sha(pdf),factionPack.sha256);
assert.equal((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length,17);
assert.equal(factionPack.previousFrozenOfficialBinary,'absent');

const {captureSha256,...captureBody}=capture;
assert.equal(sha(JSON.stringify(captureBody)),captureSha256);
assert.equal(mfm.captureSha256,captureSha256);
assert.deepEqual(capture.counts,{units:36,detachments:9,enhancements:30,pricedOptions:2,legends:5});
assert.equal(manifest.currentScope.unresolved,0);

const units=content.sections.filter(section=>section.kind==='unit');
assert.equal(units.length,36);
assert.equal(new Set(capture.units.map(unit=>unit.unitId)).size,36);
assert.equal(Object.keys(compatible.units).length,36);
for(const title of capture.legends)assert.ok(!Object.values(compatible.units).some(unit=>norm(unit.title||'')===norm(title)),`Legend leaked into Compatible Rules: ${title}`);
for(const captured of capture.units){
  const unit=units.find(candidate=>candidate.id===captured.unitId);
  assert.ok(unit,`Missing current unit ${captured.unitId}`);
  const actual=unit.points.map(point=>point.value);
  const expected=captured.schedules.flatMap(schedule=>schedule.values.map(point=>point.value));
  assert.deepEqual(actual,expected,`${unit.title}: MFM points drift`);
}
const paid=capture.units.flatMap(unit=>unit.paidWargear.map(option=>({...option,unitId:unit.unitId})));
assert.deepEqual(paid,[
  {label:'per Heavy reaper autocannon',value:15,unitId:'unit-defiler'},
  {label:'per Hades lascannon',value:15,unitId:'unit-defiler'}
]);
const defiler=JSON.stringify(units.find(unit=>unit.id==='unit-defiler'));
for(const option of paid)assert.ok(defiler.includes(option.label)&&defiler.includes(String(option.value)),`Missing ${option.label}`);

const detachments=content.sections.filter(section=>section.id.startsWith('detachment-'));
assert.equal(detachments.length,9);
for(const captured of capture.detachments){
  const detachment=detachments.find(candidate=>norm(candidate.title)===norm(captured.title));
  assert.ok(detachment,`Missing detachment ${captured.title}`);
  const text=JSON.stringify(detachment);
  assert.ok(text.includes(captured.dp),`${captured.title}: detachment points drift`);
  assert.ok(norm(text).includes(norm(captured.disposition)),`${captured.title}: force disposition drift`);
  for(const enhancement of captured.enhancements){
    const title=enhancement.title.replace(/ \(Upgrade\)$/,'');
    assert.ok(norm(text).includes(norm(title))&&text.includes(String(enhancement.value)),`${captured.title}/${enhancement.title}: enhancement points drift`);
  }
}
assert.equal(capture.enhancements.length,30);

const worldblight='At the end of your Command phase, if a friendly DEATH GUARD unit is controlling an objective, that objective is secured. Until you lose control of that objective, while an enemy unit is within range of that objective, that enemy unit is Afflicted (pg 71).';
const mortarion=content.sections.find(section=>section.id==='unit-mortarion');
assert.equal(content.sections.find(section=>section.id==='detachment-virulent-vectorium').subsections[0].blocks[0].text,worldblight);
assert.ok(JSON.stringify(mortarion).includes('If it does, after the attacking unit has finished making its attacks'));
for(const surface of [desktop,phoneUpdates])assert.ok(surface.includes('Virulent Vectorium - Worldblight:')&&surface.includes('objective is secured'));
for(const surface of [desktop,phoneUpdates,phoneMortarion])assert.ok(surface.includes('If it does, after the attacking unit has finished making its attacks'));
assert.ok(desktop.includes('Official Faction Pack v1.1 and Munitorum Field Manual v1.2 verified 11 August 2026'));
assert.equal(ledger.updates.length,10);
assert.ok(ledger.updates.every(update=>update.id.startsWith('dg-fp-1.1-')&&update.source.documentId==='death-guard-faction-pack-v1.1'));
assert.equal(content.audit.currentFactionPack,'v1.1');
assert.equal(content.audit.currentMFM,'v1.2');

console.log(`Death Guard official source QA passed: ${capture.counts.units} units, ${capture.counts.detachments} detachments, ${capture.counts.enhancements} enhancements, ${capture.counts.pricedOptions} priced options.`);
