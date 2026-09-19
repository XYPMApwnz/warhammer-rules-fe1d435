import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {applyCoreCurrentOfficial,loadCoreCurrentOfficial} from '../content/core-current-official.mjs';
import {recordText} from '../content/record-content.mjs';
import {createCoreFactProjection} from '../content/core-fact-projection.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=JSON.parse(fs.readFileSync(path.join(root,'content','core-rules.digital-11e.json'),'utf8'));
const source=loadCoreCurrentOfficial();
const effective=applyCoreCurrentOfficial(base,source);
const byCode=new Map(effective.records.map(record=>[record.code,record]));
assert.equal(byCode.size,effective.records.length,'effective Core IDs must be unique');
assert.deepEqual(new Set(effective.records.map(record=>record.code)),new Set(base.records.map(record=>record.code)),'official overrides must not silently add or drop base rule identities');
assert.deepEqual(new Set(source.ruleOverrides.map(update=>update.code)),new Set(['01.02.03','08.02.01','15.06']),'only independently verified official rule overrides are accepted');
assert.deepEqual(new Set(effective.universalRulesUpdates.map(update=>update.id)),new Set([
  'uru-2026-07-22-stratagem-cp-cost',
  'uru-2026-07-22-stratagem-reuse',
  'uru-2026-07-22-defensive-stratagem-range',
  'uru-2026-07-22-identical-destroyed-unit'
]),'each official universal update needs a stable identity');

const revival=recordText(byCode.get('01.02.03'));
assert(revival.includes('returns on its own as a unit of one')&&!revival.includes('still part of that attached unit'),'current official revival semantics must win');
assert(recordText(byCode.get('08.02.01')).includes('single extra CP per battle round'),'the official additional CP cap must be retained');
assert(byCode.get('15.06').compatibilityAliases.includes('Tank Shock'),'the explicitly confirmed former name must resolve to Crushing Impact');
assert(!byCode.get('15.05').compatibilityAliases?.includes('Grenade'),'unconfirmed Explosives alias must not be accepted');

const older=structuredClone(base);
const oldRevival=older.records.find(record=>record.code==='01.02.03');
oldRevival.text=oldRevival.text.replace(/If a leader or support model in an attached unit is destroyed and subsequently revived,[^\n]*/, 'If a leader or support model in an attached unit is destroyed and subsequently revived, it is still part of that attached unit.');
const oldCp=older.records.find(record=>record.code==='08.02.01');
oldCp.text=oldCp.text.replace(/\nYou can only generate a single extra CP per battle round\./,'');
const repaired=applyCoreCurrentOfficial(older,source);
assert(recordText(repaired.records.find(record=>record.code==='01.02.03')).includes('returns on its own as a unit of one'),'later GW override must defeat older secondary revival text');
assert(!recordText(repaired.records.find(record=>record.code==='01.02.03')).includes('still part of that attached unit'),'superseded revival semantics must disappear');
assert(recordText(repaired.records.find(record=>record.code==='08.02.01')).includes('single extra CP per battle round'),'later GW cap must defeat an older secondary omission');
assert(!recordText(oldRevival).includes('returns on its own as a unit of one'),'negative control must actually poison the older snapshot');
assert(!recordText(oldCp).includes('single extra CP per battle round'),'negative control must actually remove the cap');
const unanchored=structuredClone(older);
unanchored.records.find(record=>record.code==='01.02.03').text=unanchored.records.find(record=>record.code==='01.02.03').text.replace(/If a leader or support model in an attached unit is destroyed and subsequently revived,[^\n]*/, 'Unidentified older wording.');
assert.throws(()=>applyCoreCurrentOfficial(unanchored,source),/missing official override anchor/,'unknown older wording must fail closed rather than silently retain it');
const secondaryOverride=structuredClone(source);
secondaryOverride.ruleOverrides[0].sourceClass='WAHA_SECONDARY';
assert.throws(()=>applyCoreCurrentOfficial(base,secondaryOverride),/Incomplete official provenance/,'secondary material cannot be promoted into the official override layer');

const projection=createCoreFactProjection();
assert.equal(recordText(projection.coreDigital.records.find(record=>record.code==='01.02.03')),revival,'Core projection must consume the effective record');
assert.deepEqual(new Set(projection.coreUniversalUpdates.map(update=>update.id)),new Set(effective.universalRulesUpdates.map(update=>update.id)),'Core projection must expose official universal updates');

const reader=fs.readFileSync(path.join(root,'reader','stratagems.html'),'utf8');
const search=JSON.parse(fs.readFileSync(path.join(root,'reader','search-index.json'),'utf8'));
const htmlText=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
for(const update of effective.universalRulesUpdates){
  assert(reader.includes(`data-update-id="${update.id}"`)&&reader.includes(htmlText(update.text)),'official universal update must be published with its exact canonical identity and semantics');
  assert(search.some(item=>item.code===update.id&&item.text===update.text),'official universal update must be searchable');
}
for(const code of ['01.02.03','08.02.01','15.06']){
  const record=byCode.get(code);
  assert(record.currentOfficialOverride?.sourceArtifact&&record.currentOfficialOverride.sourceDate,'each override must carry official provenance');
}
assert(search.find(item=>item.code==='15.06')?.text.includes('Tank Shock'),'former Tank Shock name must find current Crushing Impact record');
console.log('Current official Core precedence, universal updates and Reader QA passed.');
