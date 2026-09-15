import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {CONTRACT_ORACLE_SCRIPTS,contractOracleResult,runBehavioralOracleScripts} from './helpers/architecture-behavioral-oracles.mjs';
import {loadPublicationInventory,selectPublicationBooks,validatePublicationInventory} from '../books/shared/tools/publication-inventory.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contracts=[
  'SOURCE_LIFECYCLE','SOURCE_ENROLLMENT','CANONICAL_IDENTITY','FACT_OWNERSHIP','EFFECTIVE_MODEL',
  'DEPENDENCY_PRECEDENCE','POINTS','ENHANCEMENTS','STRATAGEMS','RELATIONS','ROSTER','EFFECTS',
  'GLOSSARY','PUBLICATION_INVENTORY','GENERATED_OWNERSHIP'
];
assert.deepEqual(Object.keys(CONTRACT_ORACLE_SCRIPTS),contracts,'every current architecture contract must have one substantive oracle mapping');

const inventory=loadPublicationInventory({root}),inventoryErrors=validatePublicationInventory({root,inventory});
assert.deepEqual(inventoryErrors,[],'publication inventory must be structurally valid before architecture evaluation');
const books=selectPublicationBooks(inventory,'library');
assert.equal(books.length,9,'architecture scope must contain exactly nine public Army Books');
assert.equal(inventory.books.find(book=>book.id==='orks')?.library,false,'Orks must remain freshness-only/held');

for(const book of books){
  const config=JSON.parse(fs.readFileSync(path.join(root,book.config),'utf8'));
  assert.deepEqual(config.architectureExceptions||[],[],book.id+': architectureExceptions are not allowed in the hardened green baseline');
}

const allScripts=[...new Set(Object.values(CONTRACT_ORACLE_SCRIPTS).flat())];
const oracleRuns=runBehavioralOracleScripts({root,scripts:allScripts});
const oracleByContract=new Map(contracts.map(contract=>[contract,contractOracleResult(oracleRuns,contract)]));
const evidence=(status,oracle)=>({status,evidence:[...oracle.scripts,...oracle.diagnostics]});
const report={schema:'warhammer-architecture-conformance/v1',scope:'ARCHITECTURE_ONLY_BEHAVIORAL',books:{},summary:{}};

for(const book of books){
  const config=JSON.parse(fs.readFileSync(path.join(root,book.config),'utf8')),results={};
  for(const contract of contracts){
    if(contract==='DEPENDENCY_PRECEDENCE'&&!(config.dependencies||[]).length){
      results[contract]={status:'NOT_APPLICABLE',evidence:['no effective-book dependency']};
      continue;
    }
    const oracle=oracleByContract.get(contract);
    results[contract]=evidence(oracle.pass?'PASS':'FAIL',oracle);
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
  ARCHITECTURE_EXCEPTIONS:0,
  BEHAVIORAL_ORACLE_SCRIPTS:allScripts.length,
  SOURCE_COMPLETENESS:'NOT_EVALUATED',
  UPSTREAM_CURRENTNESS:'NOT_EVALUATED',
  RELEASE_READINESS:'NOT_EVALUATED',
  FACTUAL_CERTIFICATION:'NOT_EVALUATED'
};

if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
else{
  console.log(['BOOK',...contracts,'OVERALL'].join('\t'));
  for(const [book,item] of Object.entries(report.books))console.log([book,...contracts.map(contract=>item.contracts[contract].status),item.overall].join('\t'));
  for(const [key,value] of Object.entries(report.summary))console.log(key+'='+value);
  if(report.summary.FAIL)for(const [contract,oracle] of oracleByContract)if(!oracle.pass)console.error(contract+': '+oracle.diagnostics.join('\n'));
}
if(report.summary.FAIL&&!process.argv.includes('--report'))process.exitCode=1;
