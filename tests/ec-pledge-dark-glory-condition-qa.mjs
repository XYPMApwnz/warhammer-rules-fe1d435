import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const enhancementId='enhancement-pledge-of-dark-glory';
const detachmentId='coterie-of-the-conceited';

const accepted=json('books/emperors-children/content/emperors-children-codex-parity.en.json');
const sourceRecord=accepted.detachments.flatMap(item=>item.enhancements||[]).find(item=>item.id===enhancementId);
assert.ok(sourceRecord,'Pledge of Dark Glory accepted source record is missing');
assert.match(sourceRecord.text,/While the bearer is leading a unit/i,'Pledge of Dark Glory source condition changed');
assert.match(sourceRecord.text,/Leadership and Objective Control characteristics of models in that unit by 1/i,'Pledge of Dark Glory source scope changed');

const ownerMatrix=json('books/emperors-children/sources/enhancement-owner-matrix.json');
const ownerContract=ownerMatrix.enhancements[enhancementId];
assert.equal(ownerContract.detachmentId,detachmentId,'Pledge of Dark Glory Detachment ownership changed');
assert.equal(ownerContract.ownerGroup,'emperors-children-character','Pledge of Dark Glory bearer selector changed');

const scope={window:{addEventListener(){}}};
vm.runInNewContext(read('books/emperors-children/scripts/roster-filter.js'),scope,{filename:'emperors-children/roster-filter.js'});
const api=scope.window.ECRosterSemantics;

const makeUnit=(instanceId,canonicalDatasheetId,keywords=["EMPEROR'S CHILDREN",'CHARACTER'])=>({
  identity:{instanceId,canonicalDatasheetId},
  attachments:{leading:[],leaders:[]},
  rosterState:{keywordProfile:{effective:keywords,intrinsic:keywords},detachments:[detachmentId]},
  item:{catalogUnit:{id:canonicalDatasheetId,gameSelections:{}}},
  selection:{loadout:{selectedWargearAbilityIds:[]}},
});
const resolvedEnhancement=(id=enhancementId,ownerUnitId='ec-owner')=>({catalog:{id},input:{ownerStatus:'resolved',ownerUnitId}});
const pledgeEffects=(draft,byInstance,enhancements=[resolvedEnhancement()])=>api.projectEffects({gameUnit:draft,byInstance,enhancements}).filter(effect=>effect.source?.id===enhancementId);
const assertPledgePair=(effects,label)=>{
  assert.deepEqual(Array.from(effects,effect=>[effect.targetId,effect.operation,effect.delta]),[['Ld','add',-1],['OC','add',1]],label);
};
const assertNoPledge=(effects,label)=>assert.deepEqual(Array.from(effects),[],label);

// Case A: ownership alone is insufficient; the bearer must be leading an attached unit.
const owner=makeUnit('ec-owner','unit-lord-exultant');
assertNoPledge(pledgeEffects(owner,new Map([[owner.identity.instanceId,owner]])),'unattached bearer received Pledge of Dark Glory modifiers');

// Case B: every physical record representing models in the led unit receives the modifiers.
const body=makeUnit('ec-body','unit-legionaries',["EMPEROR'S CHILDREN",'INFANTRY']);
owner.attachments.leading=[{instanceId:body.identity.instanceId}];
body.attachments.leaders=[{instanceId:owner.identity.instanceId}];
const attached=new Map([[owner.identity.instanceId,owner],[body.identity.instanceId,body]]);
assertPledgePair(pledgeEffects(owner,attached),'attached bearer modifiers changed');
assertPledgePair(pledgeEffects(body,attached),'attached body modifiers changed');

// Case C: an otherwise eligible attached Character without the Enhancement has no modifiers.
assertNoPledge(pledgeEffects(owner,attached,[]),'eligible Character without Pledge of Dark Glory received modifiers');

// Case D: unrelated Enhancement behavior remains independent.
const unrelatedId='enhancement-exalted-patron';
const unrelatedOwner=makeUnit('ec-unrelated','unit-lord-exultant');
const unrelatedEffects=api.projectEffects({gameUnit:unrelatedOwner,byInstance:new Map([[unrelatedOwner.identity.instanceId,unrelatedOwner]]),enhancements:[resolvedEnhancement(unrelatedId,unrelatedOwner.identity.instanceId)]});
assert.deepEqual(Array.from(unrelatedEffects.filter(effect=>effect.source?.id===unrelatedId),effect=>[effect.targetId,effect.operation,effect.delta]),[['M','add',1]],'unrelated EC Enhancement behavior changed');

// Wrong attachment role, canonical identity, and Detachment scope must all fail closed.
const bodyguardBearer=makeUnit('ec-owner','unit-lord-exultant'),otherLeader=makeUnit('ec-other-leader','unit-lord-kakophonist');
bodyguardBearer.attachments.leaders=[{instanceId:otherLeader.identity.instanceId}];
otherLeader.attachments.leading=[{instanceId:bodyguardBearer.identity.instanceId}];
const wrongRole=new Map([[bodyguardBearer.identity.instanceId,bodyguardBearer],[otherLeader.identity.instanceId,otherLeader]]);
assertNoPledge(pledgeEffects(bodyguardBearer,wrongRole),'Pledge activated while its bearer was being led');
assertNoPledge(pledgeEffects(otherLeader,wrongRole),'Pledge leaked from a bodyguard bearer into its leader');
assertNoPledge(pledgeEffects(owner,attached,[resolvedEnhancement('enhancement-pledge-of-unholy-fortune')]),'wrong Enhancement identity activated Pledge');
owner.rosterState.detachments=['carnival-of-excess'];
body.rosterState.detachments=['carnival-of-excess'];
assertNoPledge(pledgeEffects(owner,attached),'wrong Detachment activated Pledge');
assertNoPledge(pledgeEffects(body,attached),'wrong Detachment leaked Pledge into the attached body');

console.log('EC Pledge of Dark Glory leading-unit condition QA: PASS');
