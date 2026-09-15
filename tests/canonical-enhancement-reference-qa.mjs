import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const inventory={
  'death-guard':['enhancement-vile-vigour','enhancement-witherbone-pipes','enhancement-helm-of-the-fly-king','enhancement-arch-contaminator','enhancement-eye-of-affliction','enhancement-shriekworm-familiar','enhancement-final-ingredient','enhancement-lord-of-the-walking-pox','enhancement-warprot-talisman','enhancement-rejuvenating-swarm','enhancement-host-of-the-hybridised-pox'],
  'adeptus-mechanicus':['enhancement-cognitive-reinforcement','enhancement-omnicogitator','enhancement-sanctified-ordnance'],
  'tau-empire':['enhancement-precision-of-the-patient-hunter'],
  tyranids:['elevated-might','enhancement-adaptive-biology'],
  'dark-angels':['enhancement-champion-of-the-deathwing','enhancement-weapons-of-the-first-legion'],
  'blood-angels':['enhancement-blood-boil','enhancement-carmine-reliquary']
};
const catalogFor=book=>{const scope={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),scope);return scope.window.WH_BOOK_ROSTER_CATALOG;};
for(const [book,ids] of Object.entries(inventory)){
  const catalog=catalogFor(book);
  for(const id of ids){
    const records=(catalog.enhancements||[]).filter(item=>item.id===id);
    assert.equal(records.length,1,`${book}: exact canonical Enhancement ${id}`);
    assert.ok(records[0].title&&records[0].text,`${book}: complete canonical Enhancement ${id}`);
    const contracts=(catalog.effectContracts||[]).filter(item=>item.canonicalRecordId===id);
    assert.equal(contracts.length,1,`${book}: exact structured effect contract ${id}`);
    assert.equal(contracts[0].sourceKind,'enhancement',`${book}: Enhancement effect source kind ${id}`);
    assert.ok(contracts[0].source?.sourceId&&contracts[0].source?.locator&&contracts[0].confidence,`${book}: accepted effect provenance ${id}`);
  }
}
assert.equal(Object.values(inventory).reduce((sum,ids)=>sum+ids.length,0),21);
console.log('Canonical reference inventory QA: PASS (21 canonical Enhancement records and structured effect contracts).');
