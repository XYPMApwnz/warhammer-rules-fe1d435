import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const output=file=>path.join(root,file);
const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/emperor-s-children/';
const decode=value=>String(value??'').replace(/&nbsp;/gi,' ').replace(/&(?:apos|#39|rsquo|lsquo);/gi,"'").replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const key=value=>decode(value).normalize('NFKC').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const unique=values=>[...new Set(values)].sort((a,b)=>a.localeCompare(b,'en'));
const ordered=value=>Array.isArray(value)?value.map(ordered):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(name=>[name,ordered(value[name])])):value;
const stable=value=>`${JSON.stringify(ordered(value),null,2)}\n`;
const coreByName=new Map(Object.entries({
  'COMMAND RE-ROLL':'core-stratagem-command-re-roll','EPIC CHALLENGE':'core-stratagem-epic-challenge','INSANE BRAVERY':'core-stratagem-insane-bravery','EXPLOSIVES':'core-stratagem-explosives','CRUSHING IMPACT':'core-stratagem-crushing-impact','RAPID INGRESS':'core-stratagem-rapid-ingress','FIRE OVERWATCH':'core-stratagem-fire-overwatch','SMOKESCREEN':'core-stratagem-smokescreen','HEROIC INTERVENTION':'core-stratagem-heroic-intervention','COUNTEROFFENSIVE':'core-stratagem-counteroffensive','COUNTER-OFFENSIVE':'core-stratagem-counteroffensive'
}).map(([name,id])=>[key(name),id]));

function endOfDiv(html,start){const tags=/<\/?div\b[^>]*>/gi;tags.lastIndex=start;let depth=0;for(let match;(match=tags.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return tags.lastIndex;}return -1;}
export function parseRules(html){
  const start=html.indexOf('>STRATAGEMS</div>'),left=start<0?-1:html.lastIndexOf('<div class="dsLeft',start),end=left<0?-1:endOfDiv(html,left);
  if(start<0||end<0)return null;
  const result={faction:[],core:[],boarding:[]};
  for(const match of html.slice(start,end).matchAll(/<div class="([^"]*\b(?:s10Wrap|str11Wrap)\b[^"]*)"[^>]*>[\s\S]*?<div class="(?:s10Name|str11Name)">([\s\S]*?)<\/div>/gi)){
    const classes=match[1].split(/\s+/),name=decode(match[2]);
    if(classes.includes('sShowBoardingActions'))result.boarding.push(name);else if(classes.includes('sShowCoreStratagemsNonBA'))result.core.push(name);else result.faction.push(name);
  }
  return Object.fromEntries(Object.entries(result).map(([name,values])=>[name,unique(values)]));
}
function inventory(){
  const codex=read('content/emperors-children-codex-datasheets.en.json'),pack=read('content/emperors-children-faction-pack.en.json'),parity=read('content/emperors-children-codex-parity.en.json');
  const units=(codex.datasheets||[]).map(unit=>({unitId:unit.id,name:unit.title}));
  const rules=[pack,parity].flatMap(source=>source.detachments.flatMap(detachment=>detachment.stratagems.map(rule=>({ruleId:rule.id,name:rule.title}))));
  const index=items=>items.reduce((map,item)=>{const name=key(item.name);map.set(name,[...(map.get(name)||[]),item]);return map;},new Map());
  return {units:units.sort((a,b)=>a.unitId.localeCompare(b.unitId)),rules:rules.sort((a,b)=>a.ruleId.localeCompare(b.ruleId)),unitByName:index(units),ruleByName:index(rules)};
}
export function buildImport({pages,retrievedAt}){
  const source=inventory(),unresolved={ambiguous:[],duplicates:[],parse:[],unknownCore:[]},units={},coreUnits={},gapByName=new Map(),seenRules=new Set(),seenCore=new Set(),boarding=new Set();
  for(const [name,items] of source.unitByName)if(items.length>1)unresolved.duplicates.push({kind:'datasheet',name,candidates:items.map(item=>item.unitId)});
  for(const [name,items] of source.ruleByName)if(items.length>1)unresolved.duplicates.push({kind:'official-stratagem',name,candidates:items.map(item=>item.ruleId)});
  for(const unit of source.units){
    const parsed=parseRules(pages.get(unit.unitId)||'');
    if(!parsed){unresolved.parse.push({unitId:unit.unitId,reason:'missing Stratagems block'});units[unit.unitId]=[];coreUnits[unit.unitId]=[];continue;}
    parsed.boarding.forEach(name=>boarding.add(name));
    units[unit.unitId]=unique(parsed.faction.flatMap(name=>{const matches=source.ruleByName.get(key(name))||[];if(matches.length===1){seenRules.add(matches[0].ruleId);return[matches[0].ruleId];}if(matches.length>1){unresolved.ambiguous.push({kind:'faction-stratagem',unitId:unit.unitId,name,candidates:matches.map(item=>item.ruleId)});return[];}const id=key(name);const gap=gapByName.get(id)||{name,unitIds:[]};gap.unitIds.push(unit.unitId);gapByName.set(id,gap);return[];}));
    coreUnits[unit.unitId]=unique(parsed.core.flatMap(name=>{const id=coreByName.get(key(name));if(id){seenCore.add(id);return[id];}unresolved.unknownCore.push({unitId:unit.unitId,name});return[];}));
  }
  const gaps=[...gapByName.values()].map(gap=>({...gap,unitIds:unique(gap.unitIds)})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
  const sourceMeta={edition:'11',faction:"Emperor's Children",kind:'Wahapedia candidate associations',url:sourceUrl,authority:'secondary'};
  const summary={datasheets:{canonical:source.units.length,imported:Object.keys(units).length},factionStratagems:{canonical:source.rules.length,observed:seenRules.size},unexplainedUnknowns:gaps.length,coreStratagems:{canonical:10,observed:seenCore.size},associations:{faction:Object.values(units).flat().length,core:Object.values(coreUnits).flat().length},boardingActionNamesIgnored:boarding.size,unresolved:Object.values(unresolved).flat().length+gaps.length};
  return {snapshot:{schema:'emperors-children-wahapedia-compatible-rules-snapshot/v1',retrievedAt,source:sourceMeta,scope:{datasheets:source.units.length+' current Codex datasheets',factionRules:'15 official Faction Pack and 36 Codex Stratagems',excluded:'Boarding Actions only'},units,coreUnits},report:{schema:'emperors-children-compatible-rules-import-report/v1',retrievedAt,source:sourceMeta,summary,unexplainedUnknowns:gaps,boardingActionsIgnored:unique(boarding),unresolved}};
}
async function fetchText(url){const response=await fetch(url,{headers:{'user-agent':'warhammer-rules-compatible-rules-importer/1.0'}});if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);return response.text();}
async function main(){
  const at=process.argv.indexOf('--retrieved-at'),retrievedAt=process.argv[at+1];if(!/^\d{4}-\d{2}-\d{2}$/.test(retrievedAt||''))throw new Error('Pass --retrieved-at YYYY-MM-DD.');
  const source=inventory(),index=await fetchText(sourceUrl),urls=new Map();
  for(const match of index.matchAll(/href="\/wh40k11ed\/factions\/emperor-s-children\/([^"#?]+)"/gi)){const units=source.unitByName.get(key(decodeURIComponent(match[1]).replaceAll('-',' ')))||[];if(units.length===1&&!urls.has(units[0].unitId))urls.set(units[0].unitId,`${sourceUrl}${match[1]}`);}
  const missing=source.units.filter(unit=>!urls.has(unit.unitId));if(missing.length)throw new Error(`Missing Wahapedia URLs: ${missing.map(unit=>unit.unitId).join(', ')}`);
  const pages=new Map(await Promise.all(source.units.map(async unit=>[unit.unitId,await fetchText(urls.get(unit.unitId))]))),result=buildImport({pages,retrievedAt});
  fs.mkdirSync(output('reports'),{recursive:true});fs.writeFileSync(output('reports/compatible-rules-import-report.json'),stable(result.report));
  if(result.report.summary.unresolved)throw new Error(`Unresolved import rows: ${result.report.summary.unresolved}`);
  fs.writeFileSync(output('sources/wahapedia-compatible-rules.snapshot.json'),stable(result.snapshot));
  console.log(`Imported ${result.report.summary.datasheets.imported} Emperor's Children datasheets: ${result.report.summary.associations.faction} faction + ${result.report.summary.associations.core} Core associations; ${result.report.summary.unexplainedUnknowns} unexplained names.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=1;});
