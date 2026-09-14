import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

export const GENERATED_OUTPUT_CLASSES=new Set([
  'CANONICAL_PUBLICATION_BUNDLE',
  'TARGET_CATALOG',
  'ROSTER_CATALOG',
  'GENERATED_BOOK_STYLING',
  'GENERATED_RELATED_RULES_MARKUP',
  'MOBILE_COMPATIBILITY_ROUTES',
  'COMPATIBLE_RULES_MATRIX',
  'DERIVED_SOURCE_PROJECTION',
  'QA_CAPTURE_REPORT'
]);

export const GENERATED_OUTPUT_LIFECYCLES=new Set([
  'NORMAL_BUILD_OUTPUT',
  'EXPLICIT_SOURCE_UPDATE_OUTPUT',
  'QA_CAPTURE_OUTPUT'
]);

const allowedFields=new Set(['class','producer','paths','pattern','inventoryFrom','required','tracked','lifecycle']);
const toPosix=value=>String(value).replaceAll('\\','/');

function normalizeRelative(value,label){
  const raw=toPosix(value);
  if(!raw||path.posix.isAbsolute(raw)||raw.startsWith('/')||raw.split('/').some(part=>!part||part==='.'||part==='..'))throw new Error(`${label} must be a normalized repository-relative path: ${value}`);
  if(path.posix.normalize(raw)!==raw)throw new Error(`${label} must be normalized: ${value}`);
  return raw;
}

function inside(root,file,label){
  const relative=path.relative(root,file);
  if(relative===''||relative.startsWith('..'+path.sep)||path.isAbsolute(relative))throw new Error(`${label} escapes its owner root: ${file}`);
  return file;
}

function matcher(pattern){
  const escaped=pattern.replace(/[.+^${}()|[\]\\]/g,'\\$&').replaceAll('*','[^/]*');
  return new RegExp(`^${escaped}$`);
}

function trackedFiles(repo){
  const output=execFileSync('git',['ls-files','-z'],{cwd:repo,encoding:'utf8'});
  return new Set(output.split('\0').filter(Boolean).map(toPosix));
}

function expandPattern(bookRoot,pattern){
  const star=pattern.indexOf('*');
  if(star<0)return [];
  if(pattern.indexOf('*',star+1)>=0||pattern.includes('**'))throw new Error(`generated output pattern supports exactly one non-recursive wildcard: ${pattern}`);
  const slash=pattern.lastIndexOf('/',star),directory=slash<0?'':pattern.slice(0,slash),root=inside(bookRoot,path.resolve(bookRoot,directory),'generated output pattern');
  if(!fs.existsSync(root))return [];
  const match=matcher(pattern);
  return fs.readdirSync(root,{withFileTypes:true})
    .filter(entry=>entry.isFile())
    .map(entry=>directory?`${directory}/${entry.name}`:entry.name)
    .filter(relative=>match.test(relative))
    .sort();
}

function declarationMatches(record,relative){
  return record.paths?.includes(relative)||record.pattern&&matcher(record.pattern).test(relative);
}

export function validateGeneratedOutputContract({repo,configPath,requireFiles=true}={}){
  const repository=path.resolve(repo),absoluteConfig=path.resolve(configPath),bookRoot=inside(repository,path.dirname(absoluteConfig),'book config');
  const config=JSON.parse(fs.readFileSync(absoluteConfig,'utf8'));
  if(!Array.isArray(config.generatedOutputs)||config.generatedOutputs.length===0)throw new Error(`${config.id||absoluteConfig}: generatedOutputs must be a non-empty array`);
  const tracked=requireFiles?trackedFiles(repository):null,owners=new Map(),expanded=[];
  for(const [index,raw] of config.generatedOutputs.entries()){
    const label=`${config.id}.generatedOutputs[${index}]`;
    if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error(`${label} must be an object`);
    for(const field of Object.keys(raw))if(!allowedFields.has(field))throw new Error(`${label} has unsupported field ${field}`);
    if(!GENERATED_OUTPUT_CLASSES.has(raw.class))throw new Error(`${label}.class is unsupported: ${raw.class}`);
    if(!GENERATED_OUTPUT_LIFECYCLES.has(raw.lifecycle))throw new Error(`${label}.lifecycle is unsupported: ${raw.lifecycle}`);
    if(raw.class==='QA_CAPTURE_REPORT'&&raw.lifecycle!=='QA_CAPTURE_OUTPUT')throw new Error(`${label}: QA capture reports require QA_CAPTURE_OUTPUT lifecycle`);
    if(raw.class==='DERIVED_SOURCE_PROJECTION'&&raw.lifecycle==='QA_CAPTURE_OUTPUT')throw new Error(`${label}: derived source projections cannot use QA_CAPTURE_OUTPUT lifecycle`);
    if(!['QA_CAPTURE_REPORT','DERIVED_SOURCE_PROJECTION'].includes(raw.class)&&raw.lifecycle!=='NORMAL_BUILD_OUTPUT')throw new Error(`${label}: ${raw.class} requires NORMAL_BUILD_OUTPUT lifecycle`);
    if(raw.required!==true)throw new Error(`${label}.required must be true`);
    if(raw.tracked!==true)throw new Error(`${label}.tracked must be true`);
    const producer=normalizeRelative(raw.producer,`${label}.producer`),producerFile=inside(repository,path.resolve(repository,producer),`${label}.producer`);
    if(!fs.existsSync(producerFile)||!fs.statSync(producerFile).isFile())throw new Error(`${label}.producer does not exist: ${producer}`);
    if(requireFiles&&!tracked.has(producer))throw new Error(`${label}.producer is not tracked: ${producer}`);
    const hasPaths=Array.isArray(raw.paths)&&raw.paths.length>0,hasPattern=typeof raw.pattern==='string'&&raw.pattern.length>0;
    if(hasPaths===hasPattern)throw new Error(`${label} must declare exactly one of paths or pattern`);
    if(raw.inventoryFrom!==undefined&&raw.class!=='MOBILE_COMPATIBILITY_ROUTES')throw new Error(`${label}.inventoryFrom is only valid for mobile routes`);
    if(raw.class==='MOBILE_COMPATIBILITY_ROUTES'){
      if(!hasPattern||raw.pattern!=='mobile/*.html')throw new Error(`${label} must use the exact mobile/*.html pattern`);
      if(raw.inventoryFrom!=='scripts/target-data.js')throw new Error(`${label} must bind routes to scripts/target-data.js`);
    }
    const record={...raw,producer,paths:hasPaths?raw.paths.map((value,pathIndex)=>normalizeRelative(value,`${label}.paths[${pathIndex}]`)):undefined,pattern:hasPattern?normalizeRelative(raw.pattern,`${label}.pattern`):undefined};
    if(record.paths&&new Set(record.paths).size!==record.paths.length)throw new Error(`${label} contains duplicate paths`);
    const paths=record.paths||expandPattern(bookRoot,record.pattern);
    if(record.pattern&&requireFiles&&paths.length===0)throw new Error(`${label}.pattern matches no tracked outputs`);
    for(const relative of paths){
      const absolute=inside(bookRoot,path.resolve(bookRoot,relative),`${label} output`),repoRelative=toPosix(path.relative(repository,absolute));
      const ownershipKey=process.platform==='win32'?repoRelative.toLowerCase():repoRelative;
      if(owners.has(ownershipKey))throw new Error(`${config.id}: duplicate generated output ownership for ${repoRelative}`);
      if(requireFiles&&!fs.existsSync(absolute))throw new Error(`${config.id}: required generated output is missing: ${repoRelative}`);
      if(requireFiles&&!tracked.has(repoRelative))throw new Error(`${config.id}: generated output is not tracked: ${repoRelative}`);
      owners.set(ownershipKey,producer);
      expanded.push({...record,bookId:config.id,path:repoRelative,bookRelativePath:relative});
    }
  }
  const accepted=config.relatedRulesOwnership?.mode==='authoritative-runtime-source'?normalizeRelative(config.relatedRulesOwnership.path,`${config.id}.relatedRulesOwnership.path`):null;
  if(accepted&&config.generatedOutputs.some(record=>declarationMatches(record,accepted)))throw new Error(`${config.id}: accepted runtime source is mislabeled as generated: ${accepted}`);
  return {config,outputs:expanded};
}

export function assertGeneratedOutputPlan({repo,configPath,producer,lifecycle,outputs}={}){
  const repository=path.resolve(repo),absoluteConfig=path.resolve(configPath),bookRoot=path.dirname(absoluteConfig);
  const {config}=validateGeneratedOutputContract({repo:repository,configPath:absoluteConfig,requireFiles:false});
  const producerId=normalizeRelative(path.isAbsolute(producer)?path.relative(repository,producer):producer,'producer');
  const actual=[...outputs].map((value,index)=>normalizeRelative(value,`producer output[${index}]`));
  if(new Set(actual).size!==actual.length)throw new Error(`${config.id}: producer ${producerId} emitted a duplicate output`);
  const declarations=config.generatedOutputs.map(record=>({...record,paths:record.paths?.map(toPosix),pattern:record.pattern&&toPosix(record.pattern)}));
  for(const relative of actual){
    inside(bookRoot,path.resolve(bookRoot,relative),'producer output');
    const matches=declarations.filter(record=>declarationMatches(record,relative));
    if(matches.length!==1)throw new Error(`${config.id}: ${relative} must have exactly one generated output owner; found ${matches.length}`);
    const [owner]=matches;
    if(owner.producer!==producerId)throw new Error(`${config.id}: ${relative} is owned by ${owner.producer}, not ${producerId}`);
    if(owner.lifecycle!==lifecycle)throw new Error(`${config.id}: ${relative} has lifecycle ${owner.lifecycle}, not ${lifecycle}`);
  }
  for(const record of declarations.filter(item=>item.producer===producerId&&item.lifecycle===lifecycle)){
    for(const relative of record.paths||[])if(!actual.includes(relative))throw new Error(`${config.id}: producer ${producerId} omitted declared output ${relative}`);
    if(record.pattern&&!actual.some(relative=>matcher(record.pattern).test(relative)))throw new Error(`${config.id}: producer ${producerId} emitted no output matching ${record.pattern}`);
  }
  return actual;
}

export function collectGeneratedOutputInventory({repo,configPaths}={}){
  const outputs=[],owners=new Map();
  for(const configPath of configPaths){
    const result=validateGeneratedOutputContract({repo,configPath});
    for(const output of result.outputs){
      const ownershipKey=process.platform==='win32'?output.path.toLowerCase():output.path;
      if(owners.has(ownershipKey))throw new Error(`generated output ${output.path} is declared by both ${owners.get(ownershipKey)} and ${output.bookId}`);
      owners.set(ownershipKey,output.bookId);outputs.push(output);
    }
  }
  return outputs.sort((a,b)=>a.path.localeCompare(b.path));
}

export function findUpstreamGeneratedFactualReads(sources){
  const generatedPath=String.raw`(?:reader\.html|scripts[\\/](?:target-data|roster-data)\.js|mobile[\\/][^'"\s]+\.html|generated[\\/]compatible-rules\.json)`;
  const readCall=new RegExp(String.raw`(?:readFileSync|readFile|readJson|loadJson|loadWindow)\s*\([^\n;]{0,240}${generatedPath}`,'i');
  return sources.flatMap(({id,source})=>readCall.test(source)?[id]:[]);
}
