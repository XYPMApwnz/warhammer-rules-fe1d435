import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(root,'../..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const loadScript=(file,name)=>{const context={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),context);return context.window[name];};
const targetData=loadScript(path.join(root,'scripts/target-data.js'),'WH_ARMY_BOOK_TARGETS');
const terms=loadScript(path.join(root,'scripts/data.js'),'DG_TERMS');
const target=id=>{const record=targetData.targets[id];assert.ok(record,`Missing target ${id}`);return targetData.html.slice(record.start,record.end);};
const escaped=value=>String(value).replace(/\s+/g,' ').trim().replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

const pack=readJson('content/chaos-space-marines-faction-pack.en.json');
const codex=readJson('content/chaos-space-marines-codex-datasheets.en.json');
const ledger=readJson('sources/codex-secondary-consensus.en.json');
const deceptors=pack.detachments.find(item=>item.id==='deceptors');
const ledgerDeceptors=ledger.imports.detachments.find(item=>item.id==='deceptors');
const abaddon=codex.datasheets.find(item=>item.id==='unit-abaddon-the-despoiler');
const warmaster=abaddon.abilities.find(item=>item.title==='The Warmaster');
const missingRecords=ledger.records.filter(item=>item.status==='SOURCE MISSING');

assert.deepEqual(missingRecords.map(item=>item.id),[
  'detachment-rule-body-deceptors-masters-of-misdirection',
  'datasheet-ability-options-abaddon-the-despoiler-warmaster',
]);
assert.equal(ledger.summary.byStatus['SOURCE MISSING'],2);
assert.equal(ledger.summary.unresolved,2);

assert.equal(deceptors.rule.text,'','Masters of Misdirection must not gain an invented body');
assert.deepEqual(deceptors.rule.sourceAvailability,{status:'unavailable',missing:'verified-rule-body'});
assert.deepEqual(ledgerDeceptors.rule.sourceAvailability,deceptors.rule.sourceAvailability,'source ledger availability drift');
assert.equal(warmaster.text,'In your Command phase, select one Warmaster ability. Until the start of your next Command phase, this model has that ability.');
assert.deepEqual(warmaster.sourceAvailability,{status:'unavailable',missing:'verified-option-definitions'});
assert.equal(Object.hasOwn(warmaster,'choices')||Object.hasOwn(warmaster,'options'),false,'Warmaster options were invented');

const deceptorsHtml=target('detachment-deceptors');
assert.match(deceptorsHtml,/>Masters of Misdirection<\/button>/,'known rule identity is not discoverable');
assert.match(deceptorsHtml,/data-source-availability="verified-rule-body">Known rule identity\. Verified rule body is unavailable in this publication\.<\/p>/);
assert.doesNotMatch(deceptorsHtml,/<p data-source-field="text"><\/p>/,'blank body still renders as broken UI');

const abaddonHtml=target('unit-abaddon-the-despoiler');
assert.match(abaddonHtml,/In your Command phase, select one Warmaster ability\. Until the start of your next Command phase, this model has that ability\./,'Warmaster instruction changed');
assert.match(abaddonHtml,/data-source-availability="verified-option-definitions">Known choice instruction\. Verified option definitions are unavailable in this publication\.<\/p>/);

const completeDetachment=pack.detachments.find(item=>item.id==='chaos-cult');
const ledgerCompleteDetachment=ledger.imports.detachments.find(item=>item.id==='chaos-cult');
const completeRule=completeDetachment?.rule,ledgerCompleteRule=ledgerCompleteDetachment?.rule;
const completeAudit=ledger.records.find(item=>item.id==='detachment-rule-chaos-cult-desperate-devotion');
assert.ok(completeDetachment&&ledgerCompleteDetachment&&completeRule&&ledgerCompleteRule,'Chaos Cult accepted source record is missing');
for(const field of ['id','title','text','provenance'])assert.ok(Object.hasOwn(ledgerCompleteRule,field),`Chaos Cult source rule missing ${field}`);
assert.deepEqual({id:completeAudit?.id,type:completeAudit?.type,scope:completeAudit?.scope,bsdataIdentity:completeAudit?.bsdataIdentity,wahapediaIdentity:completeAudit?.wahapediaIdentity,status:completeAudit?.status,imported:completeAudit?.imported},{id:'detachment-rule-chaos-cult-desperate-devotion',type:'detachment-rule',scope:'Chaos Cult',bsdataIdentity:{id:'bb86-b97c-b67c-a1b9',jsonPath:'$.catalogue.sharedSelectionEntries[0].selectionEntryGroups[0].selectionEntries[6].rules[0]'},wahapediaIdentity:'Chaos Space Marines > Chaos Cult > Detachment Rule > Desperate Devotion',status:'SECONDARY CONSENSUS',imported:true},'Chaos Cult accepted source identity/provenance drift');
assert.equal(completeDetachment.sourceLayer,'codex-secondary-consensus');
assert.equal(completeDetachment.provenance.sourceId,'csm-codex-secondary-consensus');
assert.deepEqual(completeRule,ledgerCompleteRule,'Chaos Cult source record binding drift');
assert.ok(target('detachment-chaos-cult').includes(escaped(completeRule.text)),'ordinary complete rule body changed');
assert.doesNotMatch(target('detachment-chaos-cult'),/data-source-availability=/,'availability warning leaked to a complete rule');
const darkPacts=abaddon.abilities.find(item=>item.title==='Dark Pacts');
assert.match(darkPacts.text,/\[LETHAL HITS\]/);assert.match(darkPacts.text,/\[SUSTAINED HITS 1\]/);assert.equal(darkPacts.sourceAvailability,undefined);

const maelstrom=codex.datasheets.find(item=>item.id==='unit-masters-of-the-maelstrom');
assert.deepEqual(maelstrom.abilities.filter(item=>item.abilityClass==='datasheet').map(item=>item.title),['Choice Samples','Fleet Command','Plunder'],'RA-07 Masters of the Maelstrom abilities changed');
const maelstromHtml=target(maelstrom.id);
for(const title of ['Choice Samples','Fleet Command','Plunder'])assert.match(maelstromHtml,new RegExp(`>${title}<\\/button>`),`RA-07 missing ${title}`);
assert.doesNotMatch(maelstromHtml,/data-source-availability=/,'availability warning leaked to Masters of the Maelstrom');

const ecPack=JSON.parse(fs.readFileSync(path.join(repo,'books/emperors-children/content/emperors-children-faction-pack.en.json'),'utf8'));
const court=ecPack.detachments.find(item=>item.id==='court-of-the-phoenician');
assert.match(court.rule.additionalRules.find(item=>item.title==='Master of the Pageant').text,/Once per battle round, when you target a FULGRIM unit/,'Court/Master of the Pageant changed');

const mastersTerms=Object.values(terms).filter(item=>item.title==='Masters of Misdirection');
assert.equal(mastersTerms.length,1,'Masters of Misdirection glossary identity duplicated');
assert.equal(mastersTerms[0].full,'Known rule identity. Verified rule body is unavailable in this publication.');
const warmasterTerm=Object.values(terms).find(item=>item.title==='The Warmaster'&&item.rule==='unit-abaddon-the-despoiler');
assert.match(warmasterTerm.full,/select one Warmaster ability/);assert.match(warmasterTerm.full,/Verified option definitions are unavailable/);

console.log('W2-22 source availability QA PASS: known identities retained, unavailable verified details disclosed, positive controls unchanged.');
