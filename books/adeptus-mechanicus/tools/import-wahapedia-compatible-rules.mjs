import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const bookRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const datasheetsFile=path.join(bookRoot,'content','adeptus-mechanicus-codex-datasheets.en.json');
const detachmentFiles=[
  path.join(bookRoot,'content','adeptus-mechanicus-rules.en.json'),
  path.join(bookRoot,'content','adeptus-mechanicus-codex-detachments.en.json')
];
const snapshotFile=path.join(bookRoot,'sources','wahapedia-compatible-rules.snapshot.json');
const reportFile=path.join(bookRoot,'reports','compatible-rules-import-report.json');
const factionUrl='https://wahapedia.ru/wh40k11ed/factions/adeptus-mechanicus/';
const expected={datasheets:38,factionStratagems:51,coreStratagems:10,factionAssociations:902,coreAssociations:250};

const decode=value=>String(value??'')
  .replace(/&nbsp;/gi,' ').replace(/&(?:apos|#39);/gi,"'").replace(/&(?:rsquo|lsquo);/gi,"'")
  .replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/<[^>]*>/g,' ')
  .replace(/\s+/g,' ').trim();
function normalize(value){return decode(value).normalize('NFKC').toLowerCase().replace(/[’‘']/g,'').replace(/[^a-z0-9]+/g,' ').trim();}

const coreRuleByName=new Map(Object.entries({
  'COMMAND RE-ROLL':'core-stratagem-command-re-roll','EPIC CHALLENGE':'core-stratagem-epic-challenge',
  'INSANE BRAVERY':'core-stratagem-insane-bravery','EXPLOSIVES':'core-stratagem-explosives',
  'CRUSHING IMPACT':'core-stratagem-crushing-impact','RAPID INGRESS':'core-stratagem-rapid-ingress',
  'FIRE OVERWATCH':'core-stratagem-fire-overwatch','SMOKESCREEN':'core-stratagem-smokescreen',
  'HEROIC INTERVENTION':'core-stratagem-heroic-intervention','COUNTEROFFENSIVE':'core-stratagem-counteroffensive',
  'COUNTER-OFFENSIVE':'core-stratagem-counteroffensive'
}).map(([name,id])=>[normalize(name),id]));
const sourceAliases=new Map([
  [normalize('TRIBUTE OF EMPHATIC VENERATION'),normalize('Tribute of Empathic Veneration')]
]);

const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const sortStrings=values=>[...new Set(values)].sort((left,right)=>left.localeCompare(right,'en'));
const sortObject=value=>Array.isArray(value)?value.map(sortObject):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,sortObject(value[key])])):value;
export const stableStringify=value=>`${JSON.stringify(sortObject(value),null,2)}\n`;

function matchingDivEnd(html,start){
  const tag=/<\/?div\b[^>]*>/gi;tag.lastIndex=start;let depth=0;
  for(let match;(match=tag.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return tag.lastIndex;}
  return -1;
}

export function parseDatasheetRules(html){
  const start=html.indexOf('<div class="dsHeader dsColorBgAdM">STRATAGEMS</div>');
  const leftColumn=start<0?-1:html.lastIndexOf('<div class="dsLeft',start);
  const end=leftColumn<0?-1:matchingDivEnd(html,leftColumn);
  if(start<0||end<0)return null;
  const faction=[],core=[],boarding=[];
  const block=html.slice(start,end);
  for(const match of block.matchAll(/<div class="([^"]*\bs10Wrap\b[^"]*)"[^>]*>[\s\S]*?<div class="s10Name">([\s\S]*?)<\/div>/gi)){
    const classes=match[1].split(/\s+/),name=decode(match[2]);
    if(classes.includes('sShowBoardingActions'))boarding.push(name);
    else if(classes.includes('sShowCoreStratagemsNonBA'))core.push(name);
    else faction.push(name);
  }
  return {faction:sortStrings(faction),core:sortStrings(core),boarding:sortStrings(boarding)};
}

export function canonicalIndexes({datasheets,detachments}){
  const units=datasheets.map(unit=>({unitId:unit.id,name:unit.title}));
  const rules=detachments.flatMap(detachment=>detachment.stratagems.map(rule=>({ruleId:rule.id,name:rule.title})));
  const indexByName=entries=>entries.reduce((index,entry)=>{const key=normalize(entry.name);index.set(key,[...(index.get(key)||[]),entry]);return index;},new Map());
  return {units:units.sort((a,b)=>a.unitId.localeCompare(b.unitId)),rules:rules.sort((a,b)=>a.ruleId.localeCompare(b.ruleId)),unitByName:indexByName(units),ruleByName:indexByName(rules)};
}

export function buildImport({datasheets,detachments,datasheetHtmlByUnit,retrievedAt}){
  const indexes=canonicalIndexes({datasheets,detachments});
  const unresolved={ambiguous:[],duplicates:[],parse:[],unknown:[]};
  for(const [name,entries] of indexes.unitByName)if(entries.length>1)unresolved.duplicates.push({kind:'canonical-datasheet',name,candidates:entries.map(entry=>entry.unitId)});
  for(const [name,entries] of indexes.ruleByName)if(entries.length>1)unresolved.duplicates.push({kind:'canonical-stratagem',name,candidates:entries.map(entry=>entry.ruleId)});
  const units={},coreUnits={},seenRules=new Set(),seenCore=new Set(),aliasesApplied=new Map(),boardingActions=new Set();
  for(const unit of indexes.units){
    const parsed=parseDatasheetRules(datasheetHtmlByUnit.get(unit.unitId)||'');
    if(!parsed){unresolved.parse.push({kind:'datasheet',unitId:unit.unitId,reason:'missing Stratagems block'});units[unit.unitId]=[];coreUnits[unit.unitId]=[];continue;}
    parsed.boarding.forEach(name=>boardingActions.add(name));
    const ruleIds=[];
    for(const sourceName of parsed.faction){
      const sourceKey=normalize(sourceName),canonicalKey=sourceAliases.get(sourceKey)||sourceKey,entries=indexes.ruleByName.get(canonicalKey)||[];
      if(sourceAliases.has(sourceKey))aliasesApplied.set(sourceName,indexes.ruleByName.get(canonicalKey)?.[0]?.name||'');
      if(entries.length===1)ruleIds.push(entries[0].ruleId);
      else if(entries.length>1)unresolved.ambiguous.push({kind:'datasheet-stratagem',unitId:unit.unitId,name:sourceName,candidates:entries.map(entry=>entry.ruleId)});
      else unresolved.unknown.push({kind:'datasheet-stratagem',unitId:unit.unitId,name:sourceName});
    }
    const coreRuleIds=[];
    for(const sourceName of parsed.core){const ruleId=coreRuleByName.get(normalize(sourceName));if(ruleId)coreRuleIds.push(ruleId);else unresolved.unknown.push({kind:'core-stratagem',unitId:unit.unitId,name:sourceName});}
    units[unit.unitId]=sortStrings(ruleIds);coreUnits[unit.unitId]=sortStrings(coreRuleIds);
    units[unit.unitId].forEach(ruleId=>seenRules.add(ruleId));coreUnits[unit.unitId].forEach(ruleId=>seenCore.add(ruleId));
  }
  for(const rule of indexes.rules)if(!seenRules.has(rule.ruleId))unresolved.unknown.push({kind:'canonical-stratagem',ruleId:rule.ruleId,reason:'not observed on any datasheet page'});
  for(const ruleId of new Set(coreRuleByName.values()))if(!seenCore.has(ruleId))unresolved.unknown.push({kind:'core-stratagem',ruleId,reason:'not observed on any datasheet page'});
  const source={edition:'11',faction:'Adeptus Mechanicus',kind:'Wahapedia',url:factionUrl};
  const snapshot={schema:'wahapedia-compatible-rules-snapshot/v1',retrievedAt,source,units,coreUnits};
  const summary={
    datasheets:{canonical:indexes.units.length,imported:Object.keys(units).length},
    factionStratagems:{canonical:indexes.rules.length,observed:seenRules.size},
    coreStratagems:{canonical:new Set(coreRuleByName.values()).size,observed:seenCore.size},
    associations:{faction:Object.values(units).reduce((n,rules)=>n+rules.length,0),core:Object.values(coreUnits).reduce((n,rules)=>n+rules.length,0)},
    boardingActionNamesIgnored:boardingActions.size,
    unresolved:Object.values(unresolved).flat().length
  };
  const report={schema:'compatible-rules-import-report/v1',retrievedAt,source,summary,aliasesApplied:[...aliasesApplied].map(([from,to])=>({from,to})).sort((a,b)=>a.from.localeCompare(b.from)),boardingActionsIgnored:sortStrings(boardingActions),unresolved};
  const ok=summary.datasheets.canonical===expected.datasheets&&summary.datasheets.imported===expected.datasheets
    &&summary.factionStratagems.canonical===expected.factionStratagems&&summary.factionStratagems.observed===expected.factionStratagems
    &&summary.coreStratagems.canonical===expected.coreStratagems&&summary.coreStratagems.observed===expected.coreStratagems
    &&summary.associations.faction===expected.factionAssociations&&summary.associations.core===expected.coreAssociations&&summary.unresolved===0;
  return {snapshot,report,ok};
}

const writeJson=(file,value)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,stableStringify(value));};
async function fetchText(url){const response=await fetch(url,{headers:{'user-agent':'warhammer-rules-compatible-rules-importer/1.0'}});if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);return response.text();}

async function main(){
  const dateIndex=process.argv.indexOf('--retrieved-at'),retrievedAt=dateIndex<0?'':process.argv[dateIndex+1];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(retrievedAt))throw new Error('Pass an explicit --retrieved-at YYYY-MM-DD for deterministic output.');
  const datasheets=readJson(datasheetsFile).datasheets;
  const detachments=detachmentFiles.flatMap(file=>readJson(file).detachments||[]);
  const indexes=canonicalIndexes({datasheets,detachments});
  const factionHtml=await fetchText(factionUrl),sourceUrlByUnit=new Map();
  for(const match of factionHtml.matchAll(/href="\/wh40k11ed\/factions\/adeptus-mechanicus\/([^"#?]+)"/gi)){
    const candidates=indexes.unitByName.get(normalize(decodeURIComponent(match[1]).replaceAll('-',' ')))||[];
    if(candidates.length===1&&!sourceUrlByUnit.has(candidates[0].unitId))sourceUrlByUnit.set(candidates[0].unitId,`${factionUrl}${match[1]}`);
  }
  const missing=indexes.units.filter(unit=>!sourceUrlByUnit.has(unit.unitId));if(missing.length)throw new Error(`Missing Wahapedia datasheet URLs: ${missing.map(unit=>unit.unitId).join(', ')}`);
  const pages=await Promise.all(indexes.units.map(async unit=>[unit.unitId,await fetchText(sourceUrlByUnit.get(unit.unitId))]));
  const result=buildImport({datasheets,detachments,datasheetHtmlByUnit:new Map(pages),retrievedAt});
  writeJson(reportFile,result.report);
  if(!result.ok)throw new Error(`Import failed expected inventory: ${JSON.stringify(result.report.summary)}`);
  writeJson(snapshotFile,result.snapshot);
  process.stdout.write(`Imported 38 datasheets, 51 faction and 10 Core Stratagems; 902 faction and 250 Core associations.\n`);
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{process.stderr.write(`${error.message}\n`);process.exitCode=1;});
