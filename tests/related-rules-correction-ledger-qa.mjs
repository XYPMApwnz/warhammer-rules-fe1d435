import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ledger=JSON.parse(fs.readFileSync(path.join(root,'books/death-guard/scripts/related-rules-correction-ledger.json'),'utf8'));
const book=JSON.parse(fs.readFileSync(path.join(root,'books/death-guard/content/death-guard-rules.en.json'),'utf8'));
const units=new Set(book.sections.filter(section=>section.kind==='unit').map(section=>section.id)),rules=new Set();
const walk=value=>{if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object'){if(value.type==='rule'&&value.id?.startsWith('stratagem-'))rules.add(value.id);Object.values(value).forEach(walk);}};walk(book.sections);
const entries=ledger.entries,failures=[];const check=(name,ok)=>{if(!ok)failures.push(name);};
check('143 correction pairs',entries.length===143&&new Set(entries.map(entry=>`${entry.unitId}|${entry.ruleId}`)).size===143);
check('IDs are local faction IDs',entries.every(entry=>units.has(entry.unitId)&&rules.has(entry.ruleId)&&!entry.ruleId.startsWith('core-')));
check('every entry is decided',entries.every(entry=>['accept','conditional','reject','unresolved'].includes(entry.decision)&&entry.reason));
check('conditional entries specify a condition',entries.filter(entry=>entry.decision==='conditional').every(entry=>entry.conditionKind));
check('Legends policy is explicit',ledger.legendsPolicy==='included-if-local');
check('10 Core attachment corrections',ledger.coreSharedPairCount===251&&ledger.coreCorrectionPairCount===10&&ledger.coreEntries.length===10&&new Set(ledger.coreEntries.map(entry=>`${entry.unitId}|${entry.ruleId}`)).size===10);
check('Core corrections are attachment-only',ledger.coreEntries.every(entry=>units.has(entry.unitId)&&entry.ruleId.startsWith('core-stratagem-')&&entry.decision==='conditional'&&entry.conditionKind==='attachment'));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Death Guard correction ledger QA passed.');
