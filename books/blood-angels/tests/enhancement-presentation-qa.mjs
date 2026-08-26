import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};vm.createContext(context);for(const file of ['../scripts/data.js','../scripts/roster-data.js'])vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context);
const catalog=context.window.WH_BOOK_ROSTER_ENHANCEMENTS,terms=Object.values(context.window.DG_TERMS),reader=fs.readFileSync(new URL('../reader.html',import.meta.url),'utf8');
const local=Object.values(catalog).filter(item=>!item.sourceId);assert.equal(local.length,26);
for(const item of local){const matches=terms.filter(term=>term.title===item.title);assert.equal(matches.length,1,`${item.ruleId} canonical term`);const [term]=matches;assert.equal(term.full.replace(/\s+/g,' ').trim(),item.text.replace(/\s+/g,' ').trim());assert.ok(item.owner&&item.assignment,`${item.ruleId} eligibility`);}
assert.doesNotMatch(reader,/Derived permanent ability|Derived profiles:|Apply current .* effect/);
assert.doesNotMatch(reader,/Exact Detachment-qualified Enhancement identity could not be resolved/);
console.log('Blood Angels Enhancement presentation QA passed: 26 canonical texts, exact eligibility and zero synthetic summaries.');
