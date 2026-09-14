import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {buildSourceStatus} from '../books/shared/tools/source-freshness.mjs';
import {validateGeneratedOutputContract} from '../books/shared/tools/generated-output-contract.mjs';
import {validateEffectContractsAgainstCatalog} from '../books/shared/tools/effect-contract.mjs';
import {loadPublicationInventory,selectPublicationBooks,validatePublicationInventory} from '../books/shared/tools/publication-inventory.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const exists=relative=>fs.existsSync(path.join(root,relative));
const contracts=[
  'SOURCE_LIFECYCLE','SOURCE_ENROLLMENT','CANONICAL_IDENTITY','FACT_OWNERSHIP','EFFECTIVE_MODEL',
  'DEPENDENCY_PRECEDENCE','POINTS','ENHANCEMENTS','STRATAGEMS','RELATIONS','ROSTER','EFFECTS',
  'GLOSSARY','PUBLICATION_INVENTORY','GENERATED_OWNERSHIP'
];
const allowedStatuses=new Set(['PASS','FAIL','PASS_WITH_DECLARED_EXCEPTION','NOT_APPLICABLE']);
const inventory=loadPublicationInventory({root});
const inventoryErrors=validatePublicationInventory({root,inventory});
const books=selectPublicationBooks(inventory,'library');
const sourceStatus=buildSourceStatus();
const sourceByBook=new Map(sourceStatus.books.map(item=>[item.BOOK,item]));
const genericBuilder=read('books/shared/tools/build-army-book.mjs');
const pointsBuilder=read('roster-guides/build-points.mjs');
const glossaryBuilder=read('glossary/tools/build-glossary.mjs');
const effectProviders=read('books/extensions/book-roster-enhancement-providers.js');

const runNode=relative=>spawnSync(process.execPath,[path.join(root,relative)],{cwd:root,encoding:'utf8'});
const lifecycleProbe=runNode('tests/source-ingestion-contract-qa.mjs');
const lifecyclePass=lifecycleProbe.status===0;
const canonicalJoinProbe=runNode('tests/canonical-join-architecture-qa.mjs');
const canonicalJoinPass=canonicalJoinProbe.status===0;
const evidence=(status,...items)=>({status,evidence:items});
const loadRosterCatalog=id=>{
  const sandbox={window:{}};
  vm.runInNewContext(read(`books/${id}/scripts/roster-data.js`),sandbox,{filename:`${id}/roster-data.js`});
  return sandbox.window.WH_BOOK_ROSTER_CATALOG;
};

const exceptionFields=['contract','exactDeviation','reason','evidence','owner','temporaryOrPermanent','removalCondition','regressionOracle'];
const genericReasons=new Set(['legacy','custom pipeline','special book']);
function validatedExceptions(book,config){
  const records=config.architectureExceptions||[];
  assert(Array.isArray(records),`${book}: architectureExceptions must be an array`);
  const seen=new Set(),result=new Map();
  for(const item of records){
    for(const field of exceptionFields)assert(item?.[field]!=null&&String(item[field]).trim(),`${book}: architecture exception requires ${field}`);
    assert(contracts.includes(item.contract),`${book}: unknown architecture exception contract ${item.contract}`);
    assert(!seen.has(item.contract),`${book}: duplicate architecture exception for ${item.contract}`);seen.add(item.contract);
    assert(!genericReasons.has(String(item.reason).trim().toLowerCase()),`${book}: architecture exception reason is not specific`);
    assert(['TEMPORARY','PERMANENT'].includes(item.temporaryOrPermanent),`${book}: invalid temporaryOrPermanent value`);
    const oracle=String(item.regressionOracle).replaceAll('\\','/');
    assert(!path.isAbsolute(oracle)&&!oracle.split('/').includes('..'),`${book}: regressionOracle must be repository-relative`);
    assert(exists(oracle),`${book}: missing exception regression oracle ${oracle}`);
    const check=runNode(oracle);
    assert.equal(check.status,0,`${book}: exception oracle failed: ${oracle}\n${check.stdout||''}${check.stderr||''}`);
    result.set(item.contract,item);
  }
  return result;
}

const titleJoinSignals=[
  'pointsByTitle','wargearByTitle','officialByTitle','packByTitle','parityByTitle',
  'enhancementPointsByTitle','enhancementPointsByDetachment','detachmentMetaByTitle','unitByTitle'
];
const genericTitleJoins=titleJoinSignals.filter(signal=>genericBuilder.includes(signal));
const pointsRecomposes=pointsBuilder.includes('readerProfiles=')&&pointsBuilder.includes('sharedDetachmentTitles=')&&pointsBuilder.includes('rawCatalog=');
const glossaryFeedbackReads=['existingRegistry','existingAliases','existingContexts'].filter(token=>glossaryBuilder.includes(token));
const glossarySelfSeeds=glossaryFeedbackReads.length>0;
const generatedPointInputs=pointsBuilder.includes('scripts/roster-data.js')&&(pointsBuilder.includes('reader.html')||pointsBuilder.includes('scripts/target-data.js'));
function generatedOutputOwnership(book){
  try{
    const result=validateGeneratedOutputContract({repo:root,configPath:path.join(root,book.config)});
    return {ok:true,count:result.outputs.length};
  }catch(error){return {ok:false,error:error.message};}
}

function rawResults(book){
  const id=book.id,config=json(book.config),source=sourceByBook.get(id),catalog=loadRosterCatalog(id),outputOwnership=generatedOutputOwnership(book);
  const custom=Boolean(config.buildExtension);
  const customAdapter=custom?read(`books/${id}/tools/canonical-source-adapter.mjs`):'';
  const customCanonicalJoin=customAdapter.includes("canonicalJoinContract:'v1'");
  const dependencies=config.dependencies||[];
  const projectedDependencies=(catalog.book?.dependencies||[]).map(item=>item.bookId);
  const dependencyOk=dependencies.length===0||(
    catalog.book?.parentBookId===dependencies[0]
    &&projectedDependencies.length===dependencies.length
    &&dependencies.every(value=>projectedDependencies.includes(value))
  );
  const rosterOk=catalog?.schema==='wh40k-army-roster-catalog/v1'&&catalog.book?.id===id
    &&(catalog.units||[]).every(item=>/^unit-/.test(item.id))
    &&new Set((catalog.units||[]).map(item=>item.id)).size===(catalog.units||[]).length;
  const stratagemOk=(catalog.detachments||[]).every(detachment=>(detachment.stratagems||[]).every(item=>typeof item.id==='string'&&item.id.length>0));
  const selfInput=id==='adeptus-mechanicus'
    ?read('books/adeptus-mechanicus/tools/extract-datasheets.mjs').includes('previousByTitle')
    :id==='tau-empire'
      ?read('books/tau-empire/tools/build-related-rules.mjs').includes("fs.readFileSync(outputPath")
      :id==='space-marines'
        ?[
          read('books/space-marines/tools/extract-codex-details.cjs'),
          read('books/space-marines/tools/extract-faction-pack.py')
        ].some(source=>source.includes('space-marines-related-rules.en.json'))
      :false;
  let effectContractError=null,effectContractCount=0;
  try{const set=json(path.join('books',id,config.sources.effectContracts));validateEffectContractsAgainstCatalog(set,catalog);effectContractCount=set.contracts.length;}catch(error){effectContractError=error.message;}
  const runtimeEffectFiles=['books/extensions/book-roster-enhancement-providers.js',`books/${id}/scripts/roster-filter.js`,...(id==='death-guard'?[`books/${id}/scripts/roster-semantics.js`]:id==='adeptus-mechanicus'?[`books/${id}/scripts/roster-enhancements.js`]:[])].filter(exists);
  const providerOwnedEffects=Boolean(effectContractError)||runtimeEffectFiles.some(file=>/(?:smFamilyEffects|detachmentEffects|enhancementEffects|datasheetEffects|structuredRecords|effectCodeMap|legacyEffects)\s*=/.test(read(file)));
  const localRelationJoin=custom
    ?read(`books/${id}/tools/canonical-source-adapter.mjs`).match(/(?:ByTitle|titleKey|\.title\)|includes\([^\n]*\.title)/)
    :genericBuilder.includes('unitByTitle');
  const localEnhancementJoin=custom
    ?read(`books/${id}/tools/canonical-source-adapter.mjs`).match(/(?:enhancementByTitle|enhancementPoints|\.enhancements[^\n]*\.title|pointsByTitle)/i)
    :genericBuilder.includes('enhancementPointsByTitle');
  const results={
    SOURCE_LIFECYCLE:evidence(lifecyclePass?'PASS':'FAIL','tests/source-ingestion-contract-qa.mjs'),
    SOURCE_ENROLLMENT:evidence(source?.ENROLLMENT==='COMPLETE'?'PASS':'FAIL',`enrollment=${source?.ENROLLMENT||'UNKNOWN'}`,`declared=${source?.DECLARED_SOURCE_COUNT??0}`,`registered=${source?.REGISTERED_SOURCE_COUNT??0}`),
    CANONICAL_IDENTITY:evidence(canonicalJoinPass&&(custom?customCanonicalJoin:genericTitleJoins.length===0)?'PASS':'FAIL',custom?`${id} canonical adapter contract=${customCanonicalJoin?'v1':'missing'}`:`generic builder title joins: ${genericTitleJoins.join(',')}`,'tests/canonical-join-architecture-qa.mjs'),
    FACT_OWNERSHIP:evidence(selfInput||glossarySelfSeeds?'FAIL':'PASS',...(selfInput?[`${id} producer reads its previous output`]:[]),...(glossarySelfSeeds?[`glossary feedback reads remain: ${glossaryFeedbackReads.join(', ')}`]:[])),
    EFFECTIVE_MODEL:evidence(custom?'FAIL':'PASS',custom?`buildExtension=${config.buildExtension}`:'shared effective assembly and renderer'),
    DEPENDENCY_PRECEDENCE:dependencies.length?evidence(dependencyOk?'PASS':'FAIL',`dependencies=${dependencies.join(',')}`):evidence('NOT_APPLICABLE','no book dependency'),
    POINTS:evidence(pointsRecomposes?'FAIL':'PASS',pointsRecomposes?'Roster Guides recomposes book/dependency points independently':'one effective points input'),
    ENHANCEMENTS:evidence(canonicalJoinPass&&(custom?customCanonicalJoin:!localEnhancementJoin)?'PASS':'FAIL',custom?'custom adapter uses the shared scoped identity contract':localEnhancementJoin?'Enhancement ownership/points still uses title joins':'exact canonical Enhancement identities'),
    STRATAGEMS:evidence(stratagemOk?'PASS':'FAIL',`canonical roster Detachments=${(catalog.detachments||[]).length}`),
    RELATIONS:evidence(canonicalJoinPass&&(custom?customCanonicalJoin:!localRelationJoin)?'PASS':'FAIL',custom?'custom adapter canonicalizes source prose before graph construction':localRelationJoin?'relation ownership still resolves titles/prose below ingestion':'ID-keyed relation graph'),
    ROSTER:evidence(rosterOk?'PASS':'FAIL',catalog?.schema||'missing roster catalog'),
    EFFECTS:evidence(providerOwnedEffects?'FAIL':'PASS',effectContractError||`source effect contracts=${effectContractCount}`,'canonical effect facts with shared interpreter'),
    GLOSSARY:evidence(glossarySelfSeeds?'FAIL':'PASS',glossarySelfSeeds?'previous generated glossary remains a factual/editorial input':'clean source-owned rebuild'),
    PUBLICATION_INVENTORY:evidence(inventoryErrors.length?'FAIL':'PASS',...(inventoryErrors.length?inventoryErrors:['publication inventory valid and book selected for library'])),
    GENERATED_OWNERSHIP:evidence(outputOwnership.ok&&!generatedPointInputs?'PASS':'FAIL',...(outputOwnership.ok?[`generated outputs declared and validated: ${outputOwnership.count}`]:[outputOwnership.error]),...(generatedPointInputs?['points consumer reads generated roster/reader target artifacts']:[]))
  };
  return{config,results};
}

const report={schema:'warhammer-architecture-conformance/v1',scope:'ARCHITECTURE_ONLY',books:{},summary:{}};
for(const book of books){
  const {config,results}=rawResults(book),exceptions=validatedExceptions(book.id,config);
  for(const [contract,item] of Object.entries(results)){
    assert(allowedStatuses.has(item.status),`${book.id}/${contract}: invalid status ${item.status}`);
    if(item.status==='FAIL'&&exceptions.has(contract)){
      item.status='PASS_WITH_DECLARED_EXCEPTION';
      item.exception=exceptions.get(contract);
    }
  }
  const failed=Object.values(results).filter(item=>item.status==='FAIL').length;
  report.books[book.id]={overall:failed?'FAIL':'PASS',contracts:results};
}
report.summary={
  BOOKS:books.length,
  CONTRACTS:contracts.length,
  PASS:Object.values(report.books).filter(book=>book.overall==='PASS').length,
  FAIL:Object.values(report.books).filter(book=>book.overall==='FAIL').length,
  UNDECLARED_ARCHITECTURE_DEVIATIONS:Object.values(report.books).reduce((sum,book)=>sum+Object.values(book.contracts).filter(item=>item.status==='FAIL').length,0),
  SOURCE_COMPLETENESS:'NOT_EVALUATED',UPSTREAM_CURRENTNESS:'NOT_EVALUATED',RELEASE_READINESS:'NOT_EVALUATED',FACTUAL_CERTIFICATION:'NOT_EVALUATED'
};

if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
else{
  console.log(['BOOK',...contracts,'OVERALL'].join('\t'));
  for(const [book,item] of Object.entries(report.books))console.log([book,...contracts.map(contract=>item.contracts[contract].status),item.overall].join('\t'));
  for(const [key,value] of Object.entries(report.summary))console.log(`${key}=${value}`);
}
if(report.summary.FAIL&&!process.argv.includes('--report'))process.exitCode=1;
