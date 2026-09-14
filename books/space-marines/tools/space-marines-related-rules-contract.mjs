import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifyTrackedInputs} from '../../shared/tools/verify-bsdata-source.mjs';
import {verifyFrozenSource} from '../../shared/tools/source-ingestion-contract.mjs';

export const defaultBookRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(defaultBookRoot,'../..');
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const assert=(value,message)=>{if(!value)throw new Error(`Space Marines Related Rules contract: ${message}`);};
const within=(file,root)=>{const relative=path.relative(root,file);return relative===''||(!relative.startsWith(`..${path.sep}`)&&relative!=='..'&&!path.isAbsolute(relative));};
const exactKeys=(value,allowed,label)=>{
  assert(value&&typeof value==='object'&&!Array.isArray(value),`${label} must be an object`);
  const extras=Object.keys(value).filter(key=>!allowed.includes(key));
  assert(!extras.length,`${label} has unsupported fields: ${extras.join(', ')}`);
};
const strings=value=>{const result=new Set();const visit=item=>{if(typeof item==='string')result.add(item);else if(Array.isArray(item))item.forEach(visit);else if(item&&typeof item==='object')Object.values(item).forEach(visit);};visit(value);return result;};

export function loadAcceptedRelatedRulesInputs({bookRoot=defaultBookRoot,authenticateRepository=true}={}){
  const root=path.resolve(bookRoot);
  const artifactPath=path.join(root,'sources','space-marines-related-rules-contracts.v1.json');
  if(authenticateRepository&&root===defaultBookRoot){
    verifyFrozenSource('space-marines-related-rules-contracts');
  }
  const artifactBytes=fs.readFileSync(artifactPath);
  const accepted=JSON.parse(artifactBytes.toString('utf8'));
  exactKeys(accepted,['schema','bookId','sourceBindings','enhancements'],'accepted artifact');
  assert(accepted.schema==='space-marines-related-rules-contracts/v1','unsupported schema');
  assert(accepted.bookId==='space-marines','wrong book identity');
  const inputs={accepted};
  const tracked=[artifactPath];
  for(const [sourceId,binding] of Object.entries(accepted.sourceBindings||{})){
    exactKeys(binding,['path','sha256','authority','repositoryCommit'],`source ${sourceId}`);
    assert(binding.path&&binding.sha256&&binding.authority,`${sourceId} has incomplete authentication`);
    const file=path.resolve(root,...binding.path.replaceAll('\\','/').split('/'));
    assert(within(file,root),`${sourceId} path escapes the book root`);
    assert(fs.existsSync(file),`${sourceId} is missing: ${binding.path}`);
    const bytes=fs.readFileSync(file);
    assert(hash(bytes)===binding.sha256.toLowerCase(),`${sourceId} hash mismatch`);
    inputs[sourceId]=binding.path.endsWith('.json')?JSON.parse(bytes.toString('utf8')):bytes;
    tracked.push(file);
  }
  if(authenticateRepository&&root===defaultBookRoot)verifyTrackedInputs({checkout:repoRoot,inputFiles:tracked});
  return inputs;
}

export function validateAcceptedRelatedRulesContracts(inputs){
  const {accepted}=inputs;
  const pack=inputs['faction-pack-canonical'];
  const snapshot=inputs['codex-compatibility-snapshot'];
  const sourceEnhancements=pack.detachments.flatMap(detachment=>(detachment.enhancements||[]).map(item=>({id:item.id,detachmentId:detachment.id,title:item.title,sourcePages:item.sourcePages||[]})));
  const sourceById=new Map(sourceEnhancements.map(item=>[item.id,item]));
  assert(sourceById.size===sourceEnhancements.length,'Faction Pack contains duplicate Enhancement IDs');
  assert(accepted.enhancements.length===28,'expected exactly 28 supplemental Enhancement contracts');
  const contractIds=accepted.enhancements.map(item=>item.id);
  assert(new Set(contractIds).size===contractIds.length,'duplicate supplemental Enhancement contract');
  const unitsForRule=new Map();
  for(const [unitId,rows] of Object.entries(snapshot.units||{}))for(const row of rows){
    const ids=unitsForRule.get(row.ruleId)||[];ids.push(unitId);unitsForRule.set(row.ruleId,ids);
  }
  const sourceLimitedIds=strings(inputs['pinned-bsdata']);
  const knownUnits=new Set((inputs['codex-datasheets'].datasheets||[]).map(item=>item.id));
  const expectedSupplemental=new Set(sourceEnhancements.filter(item=>!(unitsForRule.get(item.id)||[]).length||/\(Upgrade\)$/i.test(item.title)).map(item=>item.id));
  assert(expectedSupplemental.size===28,'accepted source boundary no longer identifies 28 supplemental contracts');
  assert(contractIds.every(id=>expectedSupplemental.has(id))&&[...expectedSupplemental].every(id=>contractIds.includes(id)),'missing or unknown supplemental Enhancement contract');
  for(const record of accepted.enhancements){
    exactKeys(record,['id','detachmentId','tags','owner','assignment','sourceRefs','confidence'],`Enhancement ${record.id}`);
    const source=sourceById.get(record.id);
    assert(source&&source.detachmentId===record.detachmentId,`${record.id} has the wrong Detachment or identity`);
    exactKeys(record.owner,['subject','selector'],`${record.id} owner`);
    exactKeys(record.owner.selector,['unitIds','allKeywords','noneKeywords'],`${record.id} selector`);
    assert(['model','unit'].includes(record.owner.subject),`${record.id} has an invalid owner subject`);
    const selector=record.owner.selector;
    assert((selector.unitIds?.length||selector.allKeywords?.length)&&!(selector.unitIds?.length&&selector.allKeywords?.length),`${record.id} must have one exact selector form`);
    if(selector.unitIds)assert(selector.unitIds.every(id=>knownUnits.has(id)),`${record.id} has an unknown owner ID`);
    if(selector.allKeywords)assert(selector.allKeywords.every(keyword=>typeof keyword==='string'&&keyword.length),`${record.id} has an invalid keyword selector`);
    exactKeys(record.assignment,['maxOwners','enhancementChoices','payPointsPerOwner'],`${record.id} assignment`);
    assert(record.assignment.enhancementChoices===1&&record.assignment.payPointsPerOwner===true,`${record.id} has invalid Enhancement choice accounting`);
    const upgrade=record.tags.length===1&&record.tags[0]==='UPGRADE';
    assert(upgrade?(record.owner.subject==='unit'&&record.assignment.maxOwners===3):(record.tags.length===0&&record.owner.subject==='model'&&record.assignment.maxOwners===1),`${record.id} has a conflicting owner/assignment contract`);
    exactKeys(record.confidence,['identity','detachment','owner','assignment'],`${record.id} confidence`);
    assert(record.confidence.identity==='VERIFIED_FROZEN'&&record.confidence.detachment==='VERIFIED_FROZEN'&&record.confidence.owner==='VERIFIED_FROZEN',`${record.id} must retain frozen official identity and owner confidence`);
    assert(record.confidence.assignment==='SOURCE_LIMITED',`${record.id} assignment confidence must remain SOURCE_LIMITED`);
    assert(Array.isArray(record.sourceRefs)&&record.sourceRefs.length===3,`${record.id} must bind all accepted evidence classes`);
    for(const ref of record.sourceRefs){
      exactKeys(ref,['sourceId','locator'],`${record.id} source reference`);
      assert(accepted.sourceBindings[ref.sourceId],`${record.id} references unknown source ${ref.sourceId}`);
      assert(ref.locator&&Object.keys(ref.locator).length,`${record.id} has an empty source locator`);
    }
    const packRef=record.sourceRefs.find(item=>item.sourceId==='faction-pack-v1.2');
    assert(source.sourcePages.includes(packRef?.locator?.page),`${record.id} Faction Pack locator does not match its source record`);
    const bsRef=record.sourceRefs.find(item=>item.sourceId==='pinned-bsdata');
    assert(bsRef?.locator?.selectionId&&sourceLimitedIds.has(bsRef.locator.selectionId),`${record.id} BSData locator does not resolve`);
  }
  const spy=accepted.enhancements.find(item=>item.id==='spy-skull-data-link');
  assert(spy&&sourceById.has(spy.id)&&!contractIds.includes('spy-skull-datalink'),'Spy-skull canonical identity is not normalized');
  return{supplementalContracts:accepted.enhancements,sourceEnhancements};
}
