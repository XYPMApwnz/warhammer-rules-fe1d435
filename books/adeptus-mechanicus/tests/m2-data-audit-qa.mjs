import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const pack=json('content/adeptus-mechanicus-rules.en.json');
const codex=json('content/adeptus-mechanicus-codex-detachments.en.json');
const snapshot=json('sources/wahapedia-compatible-rules.snapshot.json');
const ledger=json('sources/compatible-rules-correction-ledger.json');
const parity=json('reports/official-rules-parity.json');
const unresolved=json('reports/compatible-rules-unresolved.json');

const pairsFromSnapshot=units=>new Set(Object.entries(units).flatMap(([unitId,ruleIds])=>ruleIds.map(ruleId=>`${unitId}|${ruleId}`)));
const wahapediaFaction=pairsFromSnapshot(snapshot.units);
const wahapediaCore=pairsFromSnapshot(snapshot.coreUnits);
assert.equal(wahapediaFaction.size,816);
assert.equal(wahapediaCore.size,225);
assert.deepEqual(ledger.basis.oldMatcher,{factionAssociations:1076,coreAssociations:263});
assert.deepEqual(ledger.basis.comparison,{
  factionShared:898,
  factionWahapediaOnly:4,
  factionMatcherOnly:178,
  coreShared:250,
  coreWahapediaOnly:0,
  coreMatcherOnly:13
});
const ledgerDisputes=[];
for(const entry of ledger.entries){
  assert.equal(entry.pairCount,entry.unitIds.length*entry.ruleIds.length,`${entry.id} pairCount`);
  for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){
    ledgerDisputes.push(`${entry.scope}|${entry.side}|${unitId}|${ruleId}`);
  }
}
assert.equal(new Set(ledgerDisputes).size,ledgerDisputes.length,'ledger pairs must be unique');
assert.equal(ledgerDisputes.length,195);
assert.equal(ledgerDisputes.filter(pair=>pair.startsWith('faction|matcher-only|')).length,178);
assert.equal(ledgerDisputes.filter(pair=>pair.startsWith('faction|wahapedia-only|')).length,4);
assert.equal(ledgerDisputes.filter(pair=>pair.startsWith('core|matcher-only|')).length,13);
const decisionCounts=ledger.entries.reduce((counts,entry)=>{
  counts[entry.decision]=(counts[entry.decision]||0)+entry.pairCount;
  return counts;
},{accept:0,conditional:0,reject:0,unresolved:0});
assert.deepEqual(decisionCounts,ledger.summary.byDecision);

const factionStratagems=[...pack.detachments,...codex.detachments].flatMap(detachment=>detachment.stratagems);
const enhancements=[...pack.detachments,...codex.detachments].flatMap(detachment=>detachment.enhancements);
assert.equal(factionStratagems.length,51);
const coreRuleIds=parity.stratagemEvidence.find(group=>group.id==='core-stratagems').ruleIds;
assert.equal(coreRuleIds.length,10);
assert.equal(enhancements.length,34);
assert.ok(factionStratagems.every(rule=>rule.id&&rule.title&&rule.cp&&rule.when&&rule.target&&rule.effect));
const parityFactionIds=parity.stratagemEvidence.filter(group=>group.id!=='core-stratagems').flatMap(group=>group.ruleIds).sort();
assert.deepEqual(parityFactionIds,factionStratagems.map(rule=>rule.id).sort());
assert.equal(new Set(coreRuleIds).size,10);
assert.deepEqual(parity.enhancementEvidence.flatMap(group=>group.ruleIds).sort(),enhancements.map(rule=>rule.id).sort());
assert.ok(pack.detachments.flatMap(detachment=>detachment.stratagems).every(rule=>rule.cp==='1CP'&&!rule.restrictions));

assert.equal(parity.summary.ownerAssociations.total,142);
assert.equal(parity.enhancementEvidence.reduce((sum,group)=>sum+group.ownerAssociations,0),142);
const upgrades=enhancements.filter(item=>item.tags?.includes('UPGRADE'));
assert.equal(upgrades.length,1);
const upgrade=upgrades[0];
assert.equal(upgrade.id,'enhancement-stealth-screened-cybercanids-upgrade');
assert.equal(upgrade.eligibility.owner.subject,'unit');
assert.deepEqual(upgrade.eligibility.owner.selector.unitIds,['unit-serberys-raiders']);
assert.deepEqual(upgrade.assignment,{maxOwners:3,enhancementChoices:1,payPointsPerOwner:true});
assert.deepEqual(parity.upgrade.ownerUnitIds,['unit-serberys-raiders']);
assert.equal(parity.upgrade.ownerAssociations,1);

assert.equal(unresolved.summary.issues,unresolved.issues.length);
assert.equal(unresolved.summary.disputedPairs,ledger.summary.byDecision.unresolved);
assert.equal(parity.titleFindings[0].status,'unresolved-primary-source-required');
assert.equal(parity.titleFindings[0].local,'Tribute of Empathic Veneration');
assert.equal(parity.titleFindings[0].wahapedia,'Tribute of Emphatic Veneration');

console.log('PASS Mechanicus M2 data audit: 51 faction Stratagems, 10 Core Stratagems, 34 Enhancements, 142 owner associations, 195 classified disputes, 37 unresolved pairs.');
