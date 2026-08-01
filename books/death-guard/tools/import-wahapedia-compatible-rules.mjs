import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..','..');
const bookRoot=path.join(root,'books','death-guard');
const sourceFile=path.join(bookRoot,'content','death-guard-rules.en.json');
const snapshotFile=path.join(bookRoot,'sources','wahapedia-compatible-rules.snapshot.json');
const reportFile=path.join(bookRoot,'reports','compatible-rules-import-report.json');
const factionUrl='https://wahapedia.ru/wh40k11ed/factions/death-guard/';
const coreRuleByName=new Map(Object.entries({
  'COMMAND RE-ROLL':'core-stratagem-command-re-roll','EPIC CHALLENGE':'core-stratagem-epic-challenge',
  'INSANE BRAVERY':'core-stratagem-insane-bravery','EXPLOSIVES':'core-stratagem-explosives',
  'CRUSHING IMPACT':'core-stratagem-crushing-impact','RAPID INGRESS':'core-stratagem-rapid-ingress',
  'FIRE OVERWATCH':'core-stratagem-fire-overwatch','SMOKESCREEN':'core-stratagem-smokescreen',
  'HEROIC INTERVENTION':'core-stratagem-heroic-intervention','COUNTEROFFENSIVE':'core-stratagem-counteroffensive',
  'COUNTER-OFFENSIVE':'core-stratagem-counteroffensive'
}).map(([name,id])=>[name.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),id]));

const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const text=value=>String(value??'').replace(/&nbsp;/gi,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const normalized=value=>text(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const sortStrings=values=>[...new Set(values)].sort((left,right)=>left.localeCompare(right,'en'));
const sortValue=value=>Array.isArray(value)?value.map(sortValue).sort((left,right)=>JSON.stringify(left).localeCompare(JSON.stringify(right))):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,sortValue(value[key])])):value;
export const stableStringify=value=>`${JSON.stringify(sortValue(value),null,2)}\n`;
const writeJson=(file,value)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,stableStringify(value));};
const replaceSnapshot=(file,value)=>{const temporary=`${file}.tmp`;fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(temporary,stableStringify(value));fs.renameSync(temporary,file);};

function matchingDivEnd(html,start){
  const tag=/<\/?div\b[^>]*>/gi;tag.lastIndex=start;let depth=0;
  for(let match;(match=tag.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return tag.lastIndex;}
  return -1;
}

export function buildCanonicalIndexes(book){
  const units=book.sections.filter(section=>section.kind==='unit').map(section=>({unitId:section.id,name:section.title,urlSlug:section.title.replace(/\s+/g,'-')}));
  const rules=[];
  const walk=value=>{if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object'){if(value.type==='rule'&&String(value.id).startsWith('stratagem-'))rules.push({ruleId:value.id,name:value.title.replace(/\s+-\s+\d+CP$/i,'')});Object.values(value).forEach(walk);}};
  walk(book.sections);
  const indexByName=entries=>entries.reduce((index,entry)=>{const key=normalized(entry.name);index.set(key,[...(index.get(key)||[]),entry]);return index;},new Map());
  return {units:units.sort((left,right)=>left.unitId.localeCompare(right.unitId)),rules:rules.sort((left,right)=>left.ruleId.localeCompare(right.ruleId)),unitByName:indexByName(units),ruleByName:indexByName(rules)};
}

export function parseDatasheetStratagems(html){
  const start=html.indexOf('<div class="dsHeader dsColorBgDG">STRATAGEMS</div>');
  const leftColumn=start<0?-1:html.lastIndexOf('<div class="dsLeft',start);
  const end=leftColumn<0?-1:matchingDivEnd(html,leftColumn);
  if(start<0||end<0)return null;
  return [...html.slice(start,end).matchAll(/<div class="s10Name">([\s\S]*?)<\/div>/gi)].map(match=>text(match[1]));
}

export function buildImport({book,datasheetHtmlByUnit,retrievedAt}){
  const indexes=buildCanonicalIndexes(book);
  const unresolved={ambiguous:[],duplicates:[],parse:[],renamed:[],unknown:[]};
  for(const [name,entries] of indexes.unitByName)if(entries.length>1)unresolved.duplicates.push({kind:'canonical-datasheet',name,candidates:entries.map(entry=>entry.unitId).sort()});
  for(const [name,entries] of indexes.ruleByName)if(entries.length>1)unresolved.duplicates.push({kind:'canonical-stratagem',name,candidates:entries.map(entry=>entry.ruleId).sort()});
  const extraByName=new Map(),units={},coreUnits={},seenRuleIds=new Set(),seenCoreRuleIds=new Set();
  for(const unit of indexes.units){
    const cards=parseDatasheetStratagems(datasheetHtmlByUnit.get(unit.unitId)||'');
    if(cards===null)unresolved.parse.push({kind:'datasheet',unitId:unit.unitId,reason:'missing Stratagems block'});
    const ruleIds=[],coreRuleIds=[];
    for(const name of cards||[]){
      const entries=indexes.ruleByName.get(normalized(name))||[];
      if(entries.length===1)ruleIds.push(entries[0].ruleId);
      else if(entries.length>1)unresolved.ambiguous.push({kind:'datasheet-stratagem',unitId:unit.unitId,name,candidates:entries.map(entry=>entry.ruleId).sort()});
      else if(coreRuleByName.has(normalized(name)))coreRuleIds.push(coreRuleByName.get(normalized(name)));
      else extraByName.set(name,new Set([...(extraByName.get(name)||[]),unit.unitId]));
    }
    if(new Set(ruleIds).size!==ruleIds.length)unresolved.duplicates.push({kind:'datasheet-stratagem',unitId:unit.unitId,reason:'same canonical rule repeated on one datasheet page'});
    units[unit.unitId]=sortStrings(ruleIds);coreUnits[unit.unitId]=sortStrings(coreRuleIds);
    ruleIds.forEach(ruleId=>seenRuleIds.add(ruleId));coreRuleIds.forEach(ruleId=>seenCoreRuleIds.add(ruleId));
  }
  for(const rule of indexes.rules)if(!seenRuleIds.has(rule.ruleId))unresolved.unknown.push({kind:'stratagem',ruleId:rule.ruleId,reason:'not observed on any datasheet page'});
  const source={edition:'11',faction:'Death Guard',kind:'Wahapedia',url:factionUrl};
  const snapshot={schema:'wahapedia-compatible-rules-snapshot/v3',retrievedAt,source,units,coreUnits};
  const extraWahapediaNames=[...extraByName].map(([name,unitIds])=>({name,unitIds:[...unitIds].sort()})).sort((left,right)=>left.name.localeCompare(right.name));
  const unresolvedEntries=Object.values(unresolved).flat();
  const report={schema:'compatible-rules-import-report/v3',retrievedAt,source,summary:{datasheets:{canonical:indexes.units.length,imported:Object.keys(units).length},stratagems:{canonical:indexes.rules.length,observed:seenRuleIds.size},coreStratagems:{canonical:10,observed:seenCoreRuleIds.size},associations:{faction:Object.values(units).reduce((total,rules)=>total+rules.length,0),core:Object.values(coreUnits).reduce((total,rules)=>total+rules.length,0)},extraWahapediaNames:extraWahapediaNames.length,unresolved:unresolvedEntries.length},extraWahapediaNames,unresolved};
  return {snapshot,report,ok:unresolvedEntries.length===0&&Object.keys(units).length===41&&seenRuleIds.size===45&&seenCoreRuleIds.size===10};
}

export function applyImportResult({result,snapshotPath=snapshotFile,reportPath=reportFile}){writeJson(reportPath,result.report);if(!result.ok)return false;replaceSnapshot(snapshotPath,result.snapshot);return true;}

async function fetchText(url){const response=await fetch(url,{headers:{'user-agent':'warhammer-rules-compatible-rules-importer/2.0'}});if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);return response.text();}

async function main(){
  const dateIndex=process.argv.indexOf('--retrieved-at'),retrievedAt=dateIndex<0?'':process.argv[dateIndex+1];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(retrievedAt))throw new Error('Pass an explicit --retrieved-at YYYY-MM-DD for deterministic output.');
  const book=readJson(sourceFile),indexes=buildCanonicalIndexes(book);
  if(indexes.units.length!==41||indexes.rules.length!==45)throw new Error(`Canonical scope changed: ${indexes.units.length} datasheets, ${indexes.rules.length} faction Stratagems.`);
  const factionHtml=await fetchText(factionUrl),sourceUrlByUnit=new Map();
  for(const match of factionHtml.matchAll(/href="\/wh40k11ed\/factions\/death-guard\/([^"#?]+)"/gi)){const units=indexes.unitByName.get(normalized(decodeURIComponent(match[1]).replaceAll('-',' ')))||[];if(units.length===1&&!sourceUrlByUnit.has(units[0].unitId))sourceUrlByUnit.set(units[0].unitId,`${factionUrl}${match[1]}`);}
  const missing=indexes.units.filter(unit=>!sourceUrlByUnit.has(unit.unitId));if(missing.length)throw new Error(`Missing Wahapedia datasheet URLs: ${missing.map(unit=>unit.unitId).join(', ')}`);
  const pages=await Promise.all(indexes.units.map(async unit=>[unit.unitId,await fetchText(sourceUrlByUnit.get(unit.unitId))]));
  const result=buildImport({book,datasheetHtmlByUnit:new Map(pages),retrievedAt});
  if(!applyImportResult({result}))throw new Error(`Import has ${result.report.summary.unresolved} unresolved entries; snapshot was not written.`);
  process.stdout.write(`Imported ${Object.keys(result.snapshot.units).length} datasheets, ${result.report.summary.stratagems.observed} faction and ${result.report.summary.coreStratagems.observed} Core Stratagems.\n`);
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{process.stderr.write(`${error.message}\n`);process.exitCode=1;});
