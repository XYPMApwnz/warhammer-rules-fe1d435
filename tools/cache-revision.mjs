import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const moduleFile=fileURLToPath(import.meta.url);
export const CACHE_REVISION_RELATIVE_PATH='glossary/generated/cache-revision.js';
const sha=value=>createHash('sha256').update(value).digest('hex');
const defaultRoot=()=>path.resolve(path.dirname(moduleFile),'..');

export function readAppShell(root=defaultRoot()){
  const serviceWorkerFile=path.join(root,'service-worker.js'),source=fs.readFileSync(serviceWorkerFile,'utf8');
  const constantsStart=source.indexOf('const LIBRARY_FALLBACK'),arrayStart=source.indexOf('const APP_SHELL = [',constantsStart),arrayEnd=source.indexOf('\n];',arrayStart);
  if(constantsStart<0||arrayStart<0||arrayEnd<0)throw new Error('Unable to locate service-worker APP_SHELL contract');
  const sandbox={};
  vm.runInNewContext(source.slice(constantsStart,arrayEnd+3)+'\nglobalThis.__APP_SHELL=APP_SHELL;',sandbox,{filename:serviceWorkerFile});
  const urls=Array.from(sandbox.__APP_SHELL||[]);
  if(!urls.length)throw new Error('APP_SHELL is empty');
  const duplicates=[...new Set(urls.filter((url,index)=>urls.indexOf(url)!==index))];
  if(duplicates.length)throw new Error('Duplicate APP_SHELL URLs: '+duplicates.join(', '));
  return {source,urls};
}

export function resolveAppShellUrl(root,url){
  if(typeof url!=='string'||!url.startsWith('./'))throw new Error('Unsupported APP_SHELL URL: '+String(url));
  const raw=url.split(/[?#]/,1)[0].slice(2);
  let relative=decodeURIComponent(raw);
  if(!relative||relative.endsWith('/'))relative+='index.html';
  const absolute=path.resolve(root,...relative.split('/')),rootPrefix=path.resolve(root)+path.sep;
  if(absolute!==path.resolve(root)&&!absolute.startsWith(rootPrefix))throw new Error('APP_SHELL URL escapes repository: '+url);
  if(!fs.existsSync(absolute)||!fs.statSync(absolute).isFile())throw new Error('Missing APP_SHELL asset: '+url+' -> '+relative);
  return {absolute,relative:relative.replaceAll('\\','/')};
}

export function calculateCacheRevision({root=defaultRoot()}={}){
  const {source,urls}=readAppShell(root);
  const assets=urls.slice().sort().map(url=>{const item=resolveAppShellUrl(root,url);return [url,item.relative,item.relative===CACHE_REVISION_RELATIVE_PATH?'self-reference':sha(fs.readFileSync(item.absolute))];});
  return {revision:sha(JSON.stringify({schema:1,serviceWorker:sha(source),assets})).slice(0,16),assets,urls};
}
export function readCacheRevision({root=defaultRoot()}={}){
  const match=/self\.WH40K_CACHE_REVISION='([a-f0-9]{16})';/.exec(fs.readFileSync(path.join(root,CACHE_REVISION_RELATIVE_PATH),'utf8'));
  if(!match)throw new Error('Invalid cache revision artifact: '+CACHE_REVISION_RELATIVE_PATH);
  return match[1];
}
export function verifyCacheRevision({root=defaultRoot()}={}){
  const result=calculateCacheRevision({root}),current=readCacheRevision({root});
  if(current!==result.revision)throw new Error('Stale cache revision: '+current+'; expected '+result.revision);
  return result;
}
export function writeCacheRevision({root=defaultRoot()}={}){
  const {revision}=calculateCacheRevision({root}),file=path.join(root,CACHE_REVISION_RELATIVE_PATH);
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.writeFileSync(file,"self.WH40K_CACHE_REVISION='"+revision+"';\n",'utf8');
  return revision;
}
if(process.argv[1]&&path.resolve(process.argv[1])===moduleFile){
  const args=new Set(process.argv.slice(2));
  try{const result=args.has('--write')?{...calculateCacheRevision(),revision:writeCacheRevision()}:args.has('--check')?verifyCacheRevision():calculateCacheRevision();console.log('Cache revision '+result.revision+' covers '+result.assets.length+' exact APP_SHELL URLs.');}
  catch(error){console.error(error.stack||error);process.exitCode=1;}
}
