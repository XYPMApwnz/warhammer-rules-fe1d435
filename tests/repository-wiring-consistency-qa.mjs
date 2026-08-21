import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {calculateCacheRevision,readAppShell,resolveAppShellUrl,verifyCacheRevision} from '../tools/cache-revision.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const versions=JSON.parse(fs.readFileSync(path.join(root,'books/shared/runtime-asset-versions.json'),'utf8')),failures=[];
const assert=(ok,message)=>{if(!ok)failures.push(message);},read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const assets=(book,html)=>[...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/gi)].map(match=>match[1]).filter(x=>!x.match(/^(?:https?:|data:|#)/)).map(source=>{const u=new URL(source,'https://local/books/'+book+'/reader.html');return {source,relative:decodeURIComponent(u.pathname.slice(1)),exact:'./'+decodeURIComponent(u.pathname.slice(1))+u.search,version:u.searchParams.get('v')};}).filter(x=>/\.(?:js|css)$/.test(x.relative));
const proveRevisionSensitivity=()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'wh-cache-revision-')),asset=path.join(temp,'asset.js'),other=path.join(temp,'other.txt'),worker=path.join(temp,'service-worker.js');
  const workerSource=version=>`const LIBRARY_FALLBACK = "./index.html";\nconst APP_SHELL = [\n  "./asset.js?v=${version}"\n];\n`;
  try{
    fs.writeFileSync(asset,'one\n');fs.writeFileSync(other,'outside\n');fs.writeFileSync(worker,workerSource(1));
    const initial=calculateCacheRevision({root:temp}).revision;
    fs.writeFileSync(other,'changed outside\n');assert(calculateCacheRevision({root:temp}).revision===initial,'Non-APP_SHELL file changed cache revision');
    fs.writeFileSync(asset,'two\n');const assetChanged=calculateCacheRevision({root:temp}).revision;assert(assetChanged!==initial,'APP_SHELL content change did not change revision');
    fs.writeFileSync(worker,workerSource(2));assert(calculateCacheRevision({root:temp}).revision!==assetChanged,'APP_SHELL query change did not change revision');
  }finally{for(const file of [asset,other,worker])if(fs.existsSync(file))fs.unlinkSync(file);fs.rmdirSync(temp);}
};
proveRevisionSensitivity();const status=()=>spawnSync('git',['status','--short'],{cwd:root,encoding:'utf8'}).stdout,before=status(),shell=readAppShell(root),urls=new Set(shell.urls);
assert(urls.size===shell.urls.length,'APP_SHELL contains duplicate exact URLs');
const shared={ruleFacts:['books/shared/rule-facts.js',versions.shared.ruleFacts],relatedRules:['books/shared/army-related-rules.js',versions.shared.relatedRules],armyBook:['books/shared/army-book-app.js',versions.shared.armyBook],rosterContext:['books/shared/roster-context.js',versions.shared.rosterContext]},local={tokens:'styles/tokens.css',book:'styles/book.css',app:'scripts/app.js',rosterFilter:'scripts/roster-filter.js'};
for(const book of books){
  const html=read('books/'+book+'/reader.html'),list=assets(book,html);
  for(const item of list){assert(fs.existsSync(path.join(root,item.relative)),book+' missing '+item.source);assert(urls.has(item.exact),book+' not cached exactly: '+item.exact);}
  for(const [key,[relative,expected]] of Object.entries(shared)){const item=list.find(x=>x.relative===relative);assert(item,book+' misses '+key);if(item)assert(Number(item.version)===expected,book+' '+key+' version mismatch');}
  assert(html.indexOf('../shared/roster-context.js')>=0&&html.indexOf('../shared/roster-context.js')<html.indexOf('../shared/army-book-app.js'),book+' shared runtime order invalid');
  const file=path.join(root,'books',book,'book.config.json');
  if(fs.existsSync(file)){const config=JSON.parse(fs.readFileSync(file,'utf8'));for(const [key,[,expected]] of Object.entries(shared))if(config.assetVersions?.[key]!==undefined)assert(config.assetVersions[key]===expected,book+' config '+key+' mismatch');for(const [key,suffix] of Object.entries(local)){if(config.assetVersions?.[key]===undefined)continue;const item=list.find(x=>x.relative==='books/'+book+'/'+suffix);if(item)assert(Number(item.version)===config.assetVersions[key],book+' '+key+' reader/config mismatch');}}
  for(const item of list.filter(x=>x.relative==='roster-guides/points-data.js'))assert(Number(item.version)===versions.points.data,book+' points-data mismatch');
  for(const item of list.filter(x=>x.relative==='roster-guides/points-validator.js'))assert(Number(item.version)===versions.points.validator,book+' points-validator mismatch');
}
for(const url of shell.urls)resolveAppShellUrl(root,url);
const revision=verifyCacheRevision({root});assert(revision.assets.length===shell.urls.length,'cache coverage mismatch');
const checks=[...['tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'].map(id=>['books/shared/tools/build-army-book.mjs',['books/'+id+'/book.config.json','--check']]),['books/adeptus-mechanicus/tools/build-full-content.mjs',['--check']],['books/death-guard/tools/build-legends.mjs',['--check']],...books.map(id=>['books/'+id+'/mobile/build.mjs',['--check']])];
for(const [script,args] of checks){const result=spawnSync(process.execPath,[script,...args],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024});assert(result.status===0,'Generated check failed: '+script+' '+args.join(' ')+'\n'+(result.stderr||result.stdout));}
assert(status()===before,'Wiring checks changed working tree');
if(failures.length){console.error('Repository wiring consistency: FAIL');for(const failure of failures)console.error('- '+failure);process.exit(1);}
console.log('Repository wiring consistency: PASS');console.log('Books: '+books.length+'; APP_SHELL URLs: '+shell.urls.length+'; cache revision: '+revision.revision+'; generated checks: '+checks.length+'.');
