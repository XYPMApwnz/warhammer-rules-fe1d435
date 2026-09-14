import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  assertGeneratedOutputPlan,
  collectGeneratedOutputInventory,
  findUpstreamGeneratedFactualReads,
  validateGeneratedOutputContract
} from '../books/shared/tools/generated-output-contract.mjs';
import {assertOwnedMobileRouteInventory,assertOwnedMobileStubOutputs,compareMobileRouteInventories} from './helpers/mobile-route-inventory.mjs';
import {loadPublicationInventory,selectPublicationBooks} from '../books/shared/tools/publication-inventory.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const inventory=loadPublicationInventory({root}),books=selectPublicationBooks(inventory,'library');
const configPaths=books.map(book=>path.join(root,book.config));
const outputs=collectGeneratedOutputInventory({repo:root,configPaths});
const byClass=Map.groupBy(outputs,output=>output.class),byLifecycle=Map.groupBy(outputs,output=>output.lifecycle);
const count=(map,key)=>map.get(key)?.length||0;

assert.equal(books.length,9,'public Army Book inventory');
assert.equal(outputs.length,770,'frozen generated-output inventory');
assert.equal(new Set(outputs.map(output=>output.path)).size,outputs.length,'one owner per generated output');
assert.deepEqual(Object.fromEntries([
  'CANONICAL_PUBLICATION_BUNDLE','TARGET_CATALOG','ROSTER_CATALOG','GENERATED_BOOK_STYLING',
  'GENERATED_RELATED_RULES_MARKUP','MOBILE_COMPATIBILITY_ROUTES','COMPATIBLE_RULES_MATRIX',
  'DERIVED_SOURCE_PROJECTION','QA_CAPTURE_REPORT'
].map(key=>[key,count(byClass,key)])),{
  CANONICAL_PUBLICATION_BUNDLE:27,
  TARGET_CATALOG:9,
  ROSTER_CATALOG:9,
  GENERATED_BOOK_STYLING:3,
  GENERATED_RELATED_RULES_MARKUP:3,
  MOBILE_COMPATIBILITY_ROUTES:701,
  COMPATIBLE_RULES_MATRIX:8,
  DERIVED_SOURCE_PROJECTION:5,
  QA_CAPTURE_REPORT:5
},'generated artifact classes');
assert.equal(outputs.filter(output=>output.lifecycle==='NORMAL_BUILD_OUTPUT'&&output.class!=='DERIVED_SOURCE_PROJECTION').length,760,'publication/runtime outputs');
assert.equal(count(byLifecycle,'EXPLICIT_SOURCE_UPDATE_OUTPUT'),4,'explicit source-update outputs');
assert.equal(count(byLifecycle,'QA_CAPTURE_OUTPUT'),5,'QA capture outputs');

const acceptedRelatedSources=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','space-marines']
  .map(book=>`books/${book}/mobile/related-rules.inc`);
for(const source of acceptedRelatedSources)assert.equal(outputs.some(output=>output.path===source),false,`${source} remains an accepted runtime source`);
for(const book of ['chaos-space-marines','dark-angels','blood-angels'])assert.equal(outputs.some(output=>output.path===`books/${book}/mobile/related-rules.inc`&&output.class==='GENERATED_RELATED_RULES_MARKUP'),true,`${book} generated related-rules markup`);

for(const book of books){
  const routeInventory=assertOwnedMobileRouteInventory({root,bookId:book.id});
  assert.deepEqual(routeInventory.difference,{missing:[],unexpected:[],duplicates:[]},`${book.id}: exact mobile route identity set`);
  await assertOwnedMobileStubOutputs({root,bookId:book.id});
}

for(const book of books){
  const configPath=path.join(root,book.config),config=JSON.parse(fs.readFileSync(configPath,'utf8'));
  const canonicalProducer=['death-guard','adeptus-mechanicus'].includes(book.id)?`books/${book.id}/tools/canonical-build-extension.mjs`:'books/shared/tools/build-army-book.mjs';
  assertGeneratedOutputPlan({repo:root,configPath,producer:canonicalProducer,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:[
    'reader.html','index.html','scripts/data.js','scripts/target-data.js','scripts/roster-data.js',
    ...(['chaos-space-marines','dark-angels','blood-angels'].includes(book.id)?['styles/book.css','mobile/related-rules.inc']:[])
  ]});
  assertGeneratedOutputPlan({repo:root,configPath,producer:`books/${book.id}/mobile/build.mjs`,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:outputs.filter(output=>output.bookId===book.id&&output.class==='MOBILE_COMPATIBILITY_ROUTES').map(output=>output.bookRelativePath)});
  if(book.id!=='dark-angels')assertGeneratedOutputPlan({repo:root,configPath,producer:`books/${book.id}/tools/build-compatible-rules.mjs`,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:['generated/compatible-rules.json']});
}

const staticDerivedPlans=[
  ['tau-empire','books/tau-empire/tools/build-related-rules.mjs','EXPLICIT_SOURCE_UPDATE_OUTPUT','content/tau-empire-related-rules.en.json'],
  ['emperors-children','books/emperors-children/tools/build-bsdata-enhancement-index.mjs','EXPLICIT_SOURCE_UPDATE_OUTPUT','sources/bsdata-enhancement-index.json'],
  ['space-marines','books/space-marines/tools/extract-faction-pack.py','EXPLICIT_SOURCE_UPDATE_OUTPUT','content/space-marines-faction-pack-related-rules.component.json'],
  ['space-marines','books/space-marines/tools/build-related-rules.mjs','NORMAL_BUILD_OUTPUT','content/space-marines-related-rules.en.json'],
  ['blood-angels','books/blood-angels/tools/build-related-rules.mjs','EXPLICIT_SOURCE_UPDATE_OUTPUT','content/blood-angels-related-rules.en.json']
];
for(const [book,producer,lifecycle,output] of staticDerivedPlans)assertGeneratedOutputPlan({repo:root,configPath:path.join(root,'books',book,'book.config.json'),producer,lifecycle,outputs:[output]});
for(const book of ['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children'])assertGeneratedOutputPlan({repo:root,configPath:path.join(root,'books',book,'book.config.json'),producer:`books/${book}/tools/import-wahapedia-compatible-rules.mjs`,lifecycle:'QA_CAPTURE_OUTPUT',outputs:['reports/compatible-rules-import-report.json']});

const run=(command,args,label)=>{
  const result=spawnSync(command,args,{cwd:root,encoding:'utf8'});
  assert.equal(result.status,0,`${label}\n${result.stdout||''}${result.stderr||''}`);
};
for(const book of books)run(process.execPath,['books/shared/tools/build-army-book.mjs',book.config,'--check'],`${book.id}: canonical output plan`);
for(const book of books)run(process.execPath,[`books/${book.id}/mobile/build.mjs`,'--check'],`${book.id}: mobile output plan`);
for(const book of books.filter(book=>book.id!=='dark-angels'))run(process.execPath,[`books/${book.id}/tools/build-compatible-rules.mjs`,'--check'],`${book.id}: compatible-rules output plan`);

const upstreamFiles=[
  'roster-guides/build-points.mjs',
  'glossary/tools/build-glossary.mjs',
  'books/shared/tools/build-army-book.mjs',
  'books/death-guard/tools/canonical-source-adapter.mjs',
  'books/adeptus-mechanicus/tools/canonical-source-adapter.mjs'
];
const upstreamSources=upstreamFiles.map(id=>({id,source:read(id)}));
assert.deepEqual(findUpstreamGeneratedFactualReads(upstreamSources),[],'generated publication artifacts do not feed upstream factual producers');
assert.deepEqual(findUpstreamGeneratedFactualReads([...upstreamSources,{id:'mutated',source:"readFileSync('books/example/scripts/roster-data.js','utf8')"}]),['mutated'],'upstream generated factual read mutation');

const tyranids=JSON.parse(read('books/tyranids/book.config.json'));
const canonicalProducer='books/shared/tools/build-army-book.mjs';
const canonicalPlan=['reader.html','index.html','scripts/data.js','scripts/target-data.js','scripts/roster-data.js'];
function withTemporaryConfig(mutator,callback){
  const directory=fs.mkdtempSync(path.join(root,'.generated-output-contract-'));
  try{
    const config=structuredClone(tyranids);mutator(config);
    const configPath=path.join(directory,'book.config.json');fs.writeFileSync(configPath,JSON.stringify(config));
    return callback(configPath);
  }finally{
    const resolved=path.resolve(directory);
    assert.ok(resolved.startsWith(root+path.sep),'temporary contract path containment');
    fs.rmSync(resolved,{recursive:true,force:true});
  }
}
const plan=configPath=>assertGeneratedOutputPlan({repo:root,configPath,producer:canonicalProducer,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:canonicalPlan});

withTemporaryConfig(()=>{},configPath=>assert.deepEqual(plan(configPath),canonicalPlan,'explicit canonical producer plan'));
withTemporaryConfig(()=>{},configPath=>assert.throws(()=>assertGeneratedOutputPlan({repo:root,configPath,producer:canonicalProducer,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:[...canonicalPlan,'scripts/undeclared.js']}),/exactly one generated output owner/,'undeclared output mutation'));
withTemporaryConfig(()=>{},configPath=>assert.throws(()=>assertGeneratedOutputPlan({repo:root,configPath,producer:canonicalProducer,lifecycle:'NORMAL_BUILD_OUTPUT',outputs:canonicalPlan.filter(value=>value!=='scripts/roster-data.js')}),/omitted declared output/,'missing required output mutation'));
withTemporaryConfig(config=>{config.generatedOutputs.find(item=>item.class==='TARGET_CATALOG').producer='books/tyranids/mobile/build.mjs';},configPath=>assert.throws(()=>plan(configPath),/is owned by .* not/,'wrong producer mutation'));
withTemporaryConfig(config=>{config.generatedOutputs.push(structuredClone(config.generatedOutputs.find(item=>item.class==='TARGET_CATALOG')));},configPath=>assert.throws(()=>validateGeneratedOutputContract({repo:root,configPath,requireFiles:false}),/duplicate generated output ownership/,'duplicate ownership mutation'));
withTemporaryConfig(config=>{config.generatedOutputs.find(item=>item.class==='CANONICAL_PUBLICATION_BUNDLE').paths.push('mobile/related-rules.inc');},configPath=>assert.throws(()=>validateGeneratedOutputContract({repo:root,configPath,requireFiles:false}),/accepted runtime source is mislabeled as generated/,'accepted input mislabel mutation'));
withTemporaryConfig(config=>{const record=config.generatedOutputs.find(item=>item.class==='CANONICAL_PUBLICATION_BUNDLE');record.paths[2]='scripts/substituted-data.js';},configPath=>assert.throws(()=>plan(configPath),/exactly one generated output owner|omitted declared output/,'count-preserving output path substitution'));

const tyranidRoutes=assertOwnedMobileRouteInventory({root,bookId:'tyranids'}).expected;
const substituted=structuredClone(tyranidRoutes);substituted[0]={...substituted[0],target:'unit-count-preserving-substitution'};
assert.equal(substituted.length,tyranidRoutes.length,'mobile mutation preserves route count');
assert.notDeepEqual(compareMobileRouteInventories(tyranidRoutes,substituted),{missing:[],unexpected:[],duplicates:[]},'mobile route identity substitution mutation');

console.log(`Generated output ownership QA passed: ${outputs.length} outputs, ${count(byClass,'MOBILE_COMPATIBILITY_ROUTES')} exact mobile routes, ${acceptedRelatedSources.length} accepted runtime sources excluded.`);
