import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {readSourceRegistry,verifyFrozenSource} from './source-ingestion-contract.mjs';
import {buildSourceEnrollment} from './source-enrollment-contract.mjs';

const moduleDir=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleDir,'../../..');

export function buildSourceStatus(){
  const registry=readSourceRegistry();
  const enrollment=buildSourceEnrollment({repo:repoRoot,includeFreshnessOnly:true});
  const sources=registry.sources.map(source=>{
    const verified=verifyFrozenSource(source.sourceId);
    return{
      BOOK:source.book,SOURCE_ID:source.sourceId,STATUS:source.status,
      ACCEPTED_IDENTITY:{revision:source.acceptedRevision,hash:source.acceptedHash||verified.aggregateArtifactHash,verified:true},
      REPRODUCIBILITY:{status:source.reproducible},
      PROVENANCE:{authority:source.authority,rawOrigin:source.rawOrigin||'UNKNOWN'},
      UPSTREAM_OBSERVATION:{status:source.upstreamCurrentness,lastObservationDate:source.lastChecked||null,legacyUpdateFlag:Boolean(source.upstreamUpdateKnown)},
      NOTES:source.notes
    };
  });
  const books=enrollment.books.map(book=>({BOOK:book.book,PUBLIC:book.public,DECLARED_SOURCE_COUNT:book.active,REGISTERED_SOURCE_COUNT:book.registered,CLASSIFIED_DECLARED_SOURCE_COUNT:book.classified,HISTORICAL_SOURCE_COUNT:book.historical,DEPENDENCY_SOURCE_REFERENCES:book.dependencies,ENROLLMENT:'COMPLETE'}));
  const unclassifiedSources=[],registeredWithoutManifest=[];
  const summary={
    REGISTERED_SOURCE_COUNT:sources.length,
    DECLARED_SOURCE_COUNT:enrollment.rows.length,
    CLASSIFIED_DECLARED_SOURCE_COUNT:enrollment.rows.length,
    PUBLIC_ACTIVE_SOURCE_COUNT:enrollment.publicBooks.reduce((sum,book)=>sum+book.active,0),
    FRESHNESS_ONLY_ACTIVE_SOURCE_COUNT:enrollment.freshnessOnlyBooks.reduce((sum,book)=>sum+book.active,0),
    UNCLASSIFIED_SOURCE_COUNT:unclassifiedSources.length,
    REGISTERED_WITHOUT_MANIFEST_DECLARATION_COUNT:registeredWithoutManifest.length,
    BOOKS_WITH_COMPLETE_SOURCE_ENROLLMENT:books.filter(book=>book.ENROLLMENT==='COMPLETE').map(book=>book.BOOK),
    BOOKS_WITH_PARTIAL_SOURCE_ENROLLMENT:books.filter(book=>book.ENROLLMENT==='PARTIAL').map(book=>book.BOOK),
    BOOKS_WITH_NO_SOURCE_ENROLLMENT:books.filter(book=>book.ENROLLMENT==='NONE').map(book=>book.BOOK)
  };
  return{summary,sources,books,unclassifiedSources,registeredWithoutManifest};
}

function main(){
  const report=buildSourceStatus();
  if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
  else{
    for(const [key,value] of Object.entries(report.summary))console.log(`${key}=${Array.isArray(value)?value.join(','):value}`);
    for(const row of report.sources)console.log(`${row.BOOK}\t${row.SOURCE_ID}\t${row.STATUS}\t${row.ACCEPTED_IDENTITY.revision}\t${row.REPRODUCIBILITY.status}\tUPSTREAM=${row.UPSTREAM_OBSERVATION.status}`);
  }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
