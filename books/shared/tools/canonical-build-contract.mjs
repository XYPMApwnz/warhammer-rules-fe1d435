import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const sharedRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const normalizeEol=value=>String(value).replace(/\r\n?/g,'\n');

export function createCanonicalBuildContext({args=process.argv.slice(2),configPath:explicitConfigPath,repo=sharedRoot}={}){
  const check=args.includes('--check');
  const configArg=explicitConfigPath||args.find(arg=>!arg.startsWith('--'));
  if(!configArg)throw new Error('Usage: node build-army-book.mjs <book.config.json> [--check]');
  const configPath=path.resolve(configArg),root=path.dirname(configPath);
  const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
  if(config.schema!==1||!config.id||!config.title)throw new Error(`${configPath}: invalid canonical Army Book config`);
  const runtimeVersions=JSON.parse(fs.readFileSync(path.join(repo,'books','shared','runtime-asset-versions.json'),'utf8'));
  for(const [key,version] of Object.entries(runtimeVersions.shared))if(config.assetVersions?.[key]!==undefined&&config.assetVersions[key]!==version)throw new Error(`${config.id} assetVersions.${key} must equal shared runtime version ${version}`);
  const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
  const readRepoJson=file=>JSON.parse(fs.readFileSync(path.join(repo,file),'utf8'));
  return {args,check,configPath,root,repo,config,runtimeVersions,readJson,readRepoJson};
}

export function finishCanonicalBuild(context,outputs,{normalizeLineEndings=false,summary}={}){
  if(!(outputs instanceof Map)||![...outputs].every(([relative,content])=>typeof relative==='string'&&typeof content==='string'))throw new Error(`${context.config.id}: build extension must return a Map of text outputs`);
  const compare=normalizeLineEndings?normalizeEol:String;
  const stale=[];
  for(const [relative,content] of outputs){
    const file=path.join(context.root,relative);
    if(context.check){
      if(!fs.existsSync(file)||compare(fs.readFileSync(file,'utf8'))!==compare(content))stale.push(relative);
    }else{
      fs.mkdirSync(path.dirname(file),{recursive:true});
      fs.writeFileSync(file,content);
    }
  }
  if(stale.length)throw new Error(`Generated artifacts are stale: ${stale.join(', ')}`);
  const message=typeof summary==='function'?summary({check:context.check,outputs}):summary;
  if(message)console.log(message);
  return {outputs:[...outputs.keys()],stale};
}

export async function runCanonicalBuildExtension(context){
  const relative=context.config.buildExtension;
  if(!relative)throw new Error(`${context.config.id}: buildExtension is not configured`);
  const extensionPath=path.resolve(context.root,relative);
  if(!fs.existsSync(extensionPath))throw new Error(`${context.config.id}: build extension is missing: ${relative}`);
  const extension=await import(pathToFileURL(extensionPath).href);
  if(typeof extension.buildCanonicalBook!=='function')throw new Error(`${context.config.id}: build extension must export buildCanonicalBook(context)`);
  const result=await extension.buildCanonicalBook(context);
  return finishCanonicalBuild(context,result.outputs,{normalizeLineEndings:result.normalizeLineEndings===true,summary:result.summary});
}
