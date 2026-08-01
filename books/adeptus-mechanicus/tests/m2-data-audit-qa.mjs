import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const decode=value=>value.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const pack=json('content/adeptus-mechanicus-rules.en.json');
const codex=json('content/adeptus-mechanicus-codex-detachments.en.json');
const grants=json('content/adeptus-mechanicus-related-rules.en.json').keywordGrants;
const snapshot=json('sources/wahapedia-compatible-rules.snapshot.json');
const ledger=json('sources/compatible-rules-correction-ledger.json');
const parity=json('reports/official-rules-parity.json');
const unresolved=json('reports/compatible-rules-unresolved.json');

const context={window:{}};
vm.createContext(context);
for(const file of ['../shared/rule-facts.js','../shared/related-rules-matcher.js','scripts/related-rules.js']){
  new vm.Script(read(file),{filename:file}).runInContext(context);
}

const html=read('reader.html');
const profiles=[...html.matchAll(/<article class="unit-card surface[^"]*"[^>]*data-rule-facts="([^"]+)"/g)]
  .map(match=>context.window.WHRuleFacts.profileFromDataset({ruleFacts:decode(match[1])}));
assert.equal(profiles.length,38,'published datasheet inventory');

const oldFaction=new Set();
for(const detachment of [...pack.detachments,...codex.detachments]){
  const detachmentGrants=grants[detachment.id.replace(/^detachment-/,'')]||[];
  for(const rule of detachment.stratagems)for(const profile of profiles){
    const card={
      dataset:{eligibility:JSON.stringify(rule.eligibility)},
      closest:()=>({dataset:{keywordGrants:JSON.stringify(detachmentGrants)}})
    };
    if(context.window.AMRelatedRules.match(card,profile).state!=='no-match')oldFaction.add(`${profile.unitId}|${rule.id}`);
  }
}

const coreCards=[...read('mobile/related-rules.inc').matchAll(/<article class="stratagem surface" id="(core-stratagem-[^"]+)" data-eligibility="([^"]+)"/g)]
  .map(match=>({id:match[1],eligibility:JSON.parse(decode(match[2]))}));
const oldCore=new Set();
for(const rule of coreCards)for(const profile of profiles){
  const card={dataset:{eligibility:JSON.stringify(rule.eligibility)}};
  if(context.window.AMRelatedRules.match(card,profile).state!=='no-match')oldCore.add(`${profile.unitId}|${rule.id}`);
}

const pairsFromSnapshot=units=>new Set(Object.entries(units).flatMap(([unitId,ruleIds])=>ruleIds.map(ruleId=>`${unitId}|${ruleId}`)));
const wahapediaFaction=pairsFromSnapshot(snapshot.units);
const wahapediaCore=pairsFromSnapshot(snapshot.coreUnits);
const difference=(left,right)=>new Set([...left].filter(value=>!right.has(value)));
assert.deepEqual(
  [oldFaction.size,wahapediaFaction.size,difference(oldFaction,wahapediaFaction).size,difference(wahapediaFaction,oldFaction).size],
  [1076,902,178,4]
);
assert.deepEqual(
  [oldCore.size,wahapediaCore.size,difference(oldCore,wahapediaCore).size,difference(wahapediaCore,oldCore).size],
  [263,250,13,0]
);

const expectedDisputes=new Set([
  ...[...difference(oldFaction,wahapediaFaction)].map(pair=>`faction|matcher-only|${pair}`),
  ...[...difference(wahapediaFaction,oldFaction)].map(pair=>`faction|wahapedia-only|${pair}`),
  ...[...difference(oldCore,wahapediaCore)].map(pair=>`core|matcher-only|${pair}`)
]);
const ledgerDisputes=[];
for(const entry of ledger.entries){
  assert.equal(entry.pairCount,entry.unitIds.length*entry.ruleIds.length,`${entry.id} pairCount`);
  for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){
    ledgerDisputes.push(`${entry.scope}|${entry.side}|${unitId}|${ruleId}`);
  }
}
assert.equal(new Set(ledgerDisputes).size,ledgerDisputes.length,'ledger pairs must be unique');
assert.deepEqual([...new Set(ledgerDisputes)].sort(),[...expectedDisputes].sort(),'ledger must classify every disputed pair exactly once');
assert.equal(ledgerDisputes.length,195);
const decisionCounts=ledger.entries.reduce((counts,entry)=>{
  counts[entry.decision]=(counts[entry.decision]||0)+entry.pairCount;
  return counts;
},{accept:0,conditional:0,reject:0,unresolved:0});
assert.deepEqual(decisionCounts,ledger.summary.byDecision);

const factionStratagems=[...pack.detachments,...codex.detachments].flatMap(detachment=>detachment.stratagems);
const enhancements=[...pack.detachments,...codex.detachments].flatMap(detachment=>detachment.enhancements);
assert.equal(factionStratagems.length,51);
assert.equal(coreCards.length,10);
assert.equal(enhancements.length,34);
assert.ok(factionStratagems.every(rule=>rule.id&&rule.title&&rule.cp&&rule.when&&rule.target&&rule.effect));
const parityFactionIds=parity.stratagemEvidence.filter(group=>group.id!=='core-stratagems').flatMap(group=>group.ruleIds).sort();
assert.deepEqual(parityFactionIds,factionStratagems.map(rule=>rule.id).sort());
assert.deepEqual(parity.stratagemEvidence.find(group=>group.id==='core-stratagems').ruleIds.sort(),coreCards.map(rule=>rule.id).sort());
assert.deepEqual(parity.enhancementEvidence.flatMap(group=>group.ruleIds).sort(),enhancements.map(rule=>rule.id).sort());
assert.ok(pack.detachments.flatMap(detachment=>detachment.stratagems).every(rule=>rule.cp==='1CP'&&!rule.restrictions));

const ownerPairs=[];
for(const enhancement of enhancements)for(const profile of profiles){
  if(context.window.WHRelatedRules.match(enhancement.eligibility,profile).state!=='no-match')ownerPairs.push(`${profile.unitId}|${enhancement.id}`);
}
assert.equal(ownerPairs.length,142);
const upgrades=enhancements.filter(item=>item.tags?.includes('UPGRADE'));
assert.equal(upgrades.length,1);
const upgrade=upgrades[0];
assert.equal(upgrade.id,'enhancement-stealth-screened-cybercanids-upgrade');
assert.equal(upgrade.eligibility.owner.subject,'unit');
assert.deepEqual(upgrade.eligibility.owner.selector.unitIds,['unit-serberys-raiders']);
assert.deepEqual(upgrade.assignment,{maxOwners:3,enhancementChoices:1,payPointsPerOwner:true});
assert.deepEqual(ownerPairs.filter(pair=>pair.endsWith(`|${upgrade.id}`)),[`unit-serberys-raiders|${upgrade.id}`]);

assert.equal(unresolved.summary.issues,unresolved.issues.length);
assert.equal(unresolved.summary.disputedPairs,ledger.summary.byDecision.unresolved);
assert.equal(parity.titleFindings[0].status,'unresolved-primary-source-required');
assert.equal(parity.titleFindings[0].local,'Tribute of Empathic Veneration');
assert.equal(parity.titleFindings[0].wahapedia,'Tribute of Emphatic Veneration');

console.log('PASS Mechanicus M2 data audit: 51 faction Stratagems, 10 Core Stratagems, 34 Enhancements, 142 owner associations, 195 classified disputes, 37 unresolved pairs.');
