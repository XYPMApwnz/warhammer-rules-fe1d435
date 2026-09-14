import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256,stableJson,verifyFrozenSource} from '../../books/shared/tools/source-ingestion-contract.mjs';
import {verifyTrackedInputs} from '../../books/shared/tools/verify-bsdata-source.mjs';

export const defaultGlossaryRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const defaultRepoRoot=path.resolve(defaultGlossaryRoot,'..');
const allowedRecordKeys=['termId','field','summary','semanticSource','editorialRevision','contentHash'];
const allowedSourceKeys=['documentId','revision','locator'];
const assert=(condition,message)=>{if(!condition)throw new Error(`Glossary editorial contract: ${message}`);};
const exactKeys=(value,allowed,label)=>{
  assert(value&&typeof value==='object'&&!Array.isArray(value),`${label} must be an object`);
  const extras=Object.keys(value).filter(key=>!allowed.includes(key));
  assert(!extras.length,`${label} has unsupported fields: ${extras.join(', ')}`);
};

export function editorialReviewHash(contract){
  return sha256(stableJson({revision:contract.revision,summaries:contract.summaries}));
}

export function validateEditorialContract(contract,{knownTermIds}={}){
  exactKeys(contract,['schema','revision','reviewBinding','summaries'],'contract');
  assert(contract.schema==='glossary-editorial-contracts/v1','unsupported schema');
  assert(/^editorial-review-\d{4}-\d{2}-\d{2}$/.test(contract.revision),'invalid editorial revision');
  exactKeys(contract.reviewBinding,['decision','acceptedAt','contentHash'],'review binding');
  assert(contract.reviewBinding.decision==='GLOBAL_GLOSSARY_FINAL_EDITORIAL_DECISION_PACKET','wrong editorial decision binding');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(contract.reviewBinding.acceptedAt),'invalid acceptance date');
  assert(Array.isArray(contract.summaries)&&contract.summaries.length===24,'expected exactly 24 accepted summaries');
  const ids=[];
  for(const record of contract.summaries){
    exactKeys(record,allowedRecordKeys,`summary ${record?.termId||'<unknown>'}`);
    assert(typeof record.termId==='string'&&record.termId.length>0,'summary has no canonical term ID');
    assert(record.field==='summary',`${record.termId} may own only the summary field`);
    assert(typeof record.summary==='string'&&record.summary.trim()===record.summary&&record.summary.length>0,`${record.termId} has invalid editorial text`);
    assert(record.editorialRevision===contract.revision,`${record.termId} has the wrong editorial revision`);
    exactKeys(record.semanticSource,allowedSourceKeys,`${record.termId} semantic source`);
    assert(record.semanticSource.documentId&&record.semanticSource.revision&&record.semanticSource.locator,`${record.termId} has an incomplete semantic source locator`);
    assert(record.contentHash===sha256(record.summary),`${record.termId} content hash mismatch`);
    if(knownTermIds)assert(knownTermIds.has(record.termId),`unknown canonical term ID ${record.termId}`);
    ids.push(record.termId);
  }
  assert(new Set(ids).size===ids.length,'duplicate canonical term contract');
  assert(ids.every((id,index)=>index===0||ids[index-1].localeCompare(id)<0),'summary contracts are not in deterministic ID order');
  assert(contract.reviewBinding.contentHash===editorialReviewHash(contract),'review binding hash mismatch');
  return contract;
}

export function loadEditorialContract({glossaryRoot=defaultGlossaryRoot,authenticateRepository=true,knownTermIds}={}){
  const root=path.resolve(glossaryRoot);
  const artifactPath=path.join(root,'editorial-contracts.v1.json');
  if(authenticateRepository&&root===defaultGlossaryRoot)verifyFrozenSource('global-glossary-editorial-contracts');
  const contract=validateEditorialContract(JSON.parse(fs.readFileSync(artifactPath,'utf8')),{knownTermIds});
  if(authenticateRepository&&root===defaultGlossaryRoot)verifyTrackedInputs({checkout:defaultRepoRoot,inputFiles:[artifactPath]});
  return contract;
}

