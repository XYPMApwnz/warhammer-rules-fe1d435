import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {readSourceRegistry,verifyFrozenSource} from './source-ingestion-contract.mjs';

const moduleDir=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(moduleDir,'../../..');
const publicationPath=path.join(repoRoot,'books','publication-inventory.json');

const sourceFiles=source=>[source.localFile,source.localPath,...(source.localFiles||[])]
  .filter(Boolean).map(file=>path.basename(String(file).replaceAll('\\','/')));
const declaredSources=manifest=>[...(manifest.layers||[]),...(manifest.sources||[])];
const sameDeclaredSource=(registered,declared)=>{
  if(registered.sourceId===declared.id||registered.sourceId.endsWith(`-${declared.id}`))return true;
  const registeredFiles=new Set(registered.artifacts.map(artifact=>path.basename(artifact.path)));
  return sourceFiles(declared).some(file=>registeredFiles.has(file));
};

export function buildSourceStatus(){
  const registry=readSourceRegistry();
  const publication=JSON.parse(fs.readFileSync(publicationPath,'utf8'));
  const sources=registry.sources.map(source=>{
    const verified=verifyFrozenSource(source.sourceId);
    return{
      BOOK:source.book,SOURCE_ID:source.sourceId,STATUS:source.status,
      ACCEPTED_IDENTITY:{revision:source.acceptedRevision,hash:source.acceptedHash||verified.aggregateArtifactHash,verified:true},
      REPRODUCIBILITY:{status:source.reproducible},
      PROVENANCE:{authority:source.authority,rawOrigin:source.rawOrigin||'UNKNOWN'},
      UPSTREAM_OBSERVATION:{status:'UNKNOWN',lastObservationDate:source.lastChecked||null,legacyUpdateFlag:Boolean(source.upstreamUpdateKnown)},
      NOTES:source.notes
    };
  });
  const books=[];const unclassifiedSources=[];const registeredWithoutManifest=[];
  for(const book of publication.books){
    const manifestPath=path.join(repoRoot,'books',book.id,'sources','source-manifest.json');
    const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):null;
    const declared=manifest?declaredSources(manifest):[];
    const registered=registry.sources.filter(source=>source.book===book.id);
    const matchedDeclared=declared.filter(source=>registered.some(item=>sameDeclaredSource(item,source)));
    for(const source of declared)if(!matchedDeclared.includes(source))unclassifiedSources.push({BOOK:book.id,SOURCE_ID:source.id||null,MANIFEST:path.relative(repoRoot,manifestPath).replaceAll(path.sep,'/'),STATUS:'UNCLASSIFIED'});
    for(const source of registered)if(!declared.some(item=>sameDeclaredSource(source,item)))registeredWithoutManifest.push({BOOK:book.id,SOURCE_ID:source.sourceId,STATUS:'REGISTERED_WITHOUT_MANIFEST_DECLARATION'});
    const enrollment=registered.length===0?'NONE':(declared.length>0&&matchedDeclared.length===declared.length&&registeredWithoutManifest.every(item=>item.BOOK!==book.id)?'COMPLETE':'PARTIAL');
    books.push({BOOK:book.id,DECLARED_SOURCE_COUNT:declared.length,REGISTERED_SOURCE_COUNT:registered.length,CLASSIFIED_DECLARED_SOURCE_COUNT:matchedDeclared.length,ENROLLMENT:enrollment});
  }
  const summary={
    REGISTERED_SOURCE_COUNT:sources.length,
    DECLARED_SOURCE_COUNT:books.reduce((sum,book)=>sum+book.DECLARED_SOURCE_COUNT,0),
    CLASSIFIED_DECLARED_SOURCE_COUNT:books.reduce((sum,book)=>sum+book.CLASSIFIED_DECLARED_SOURCE_COUNT,0),
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
