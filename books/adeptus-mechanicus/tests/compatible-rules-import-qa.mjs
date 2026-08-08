import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseDatasheetRules,stableStringify} from '../tools/import-wahapedia-compatible-rules.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const snapshot=readJson('sources/wahapedia-compatible-rules.snapshot.json');
const report=readJson('reports/compatible-rules-import-report.json');
const summary=report.summary;

assert.equal(Object.keys(snapshot.units).length,34);
assert.equal(Object.keys(snapshot.coreUnits).length,34);
assert.deepEqual(summary.datasheets,{canonical:34,imported:34});
assert.deepEqual(summary.factionStratagems,{canonical:51,observed:51});
assert.deepEqual(summary.coreStratagems,{canonical:10,observed:10});
assert.deepEqual(summary.associations,{faction:816,core:225});
assert.equal(summary.unresolved,0);
assert.equal(report.aliasesApplied.length,1);
assert.deepEqual(report.aliasesApplied[0],{from:'TRIBUTE OF EMPHATIC VENERATION',to:'Tribute of Empathic Veneration'});
assert(Object.values(snapshot.units).every(ids=>ids.length===new Set(ids).size&&stableStringify(ids)===stableStringify([...ids].sort())));
assert(Object.values(snapshot.coreUnits).every(ids=>ids.length===new Set(ids).size&&stableStringify(ids)===stableStringify([...ids].sort())));

const fixture='<div class="dsLeft\u0421ol"><div class="dsHeader dsColorBgAdM">STRATAGEMS</div><div>'
  +'<div class="s10Wrap AMAM"><div class="s10Name">FACTION RULE</div></div>'
  +'<div class="s10Wrap sShowCoreStratagemsNonBA"><div class="s10Name">COMMAND RE-ROLL</div></div>'
  +'<div class="s10Wrap sShowBoardingActions"><div class="s10Name">BOARDING RULE</div></div>'
  +'</div></div>';
assert.deepEqual(parseDatasheetRules(fixture),{faction:['FACTION RULE'],core:['COMMAND RE-ROLL'],boarding:['BOARDING RULE']});

console.log('PASS Mechanicus Wahapedia compatible-rules snapshot: 34 datasheets, 816 faction and 225 Core associations');
