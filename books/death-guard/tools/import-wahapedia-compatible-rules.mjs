import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..','..');
const bookRoot=path.join(root,'books','death-guard');
const sourceFile=path.join(bookRoot,'content','death-guard-rules.en.json');
const snapshotFile=path.join(bookRoot,'sources','wahapedia-compatible-rules.snapshot.json');
const reportFile=path.join(bookRoot,'reports','compatible-rules-import-report.json');
const factionUrl='https://wahapedia.ru/wh40k11ed/factions/death-guard/';
const scope={stratagems:'faction-only',included:45,excludedCore:10};

const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const text=value=>String(value??'').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const normalized=value=>text(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const sortStrings=values=>[...new Set(values)].sort((left,right)=>left.localeCompare(right,'en'));
const sortValue=value=>Array.isArray(value)?value.map(sortValue).sort((left,right)=>JSON.stringify(left).localeCompare(JSON.stringify(right))):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,sortValue(value[key])])):value;
export const stableStringify=value=>`${JSON.stringify(sortValue(value),null,2)}\n`;
const writeJson=(file,value)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,stableStringify(value));};

function matchingDivEnd(html,start){
  const tag=/<\/?div\b[^>]*>/gi;
  tag.lastIndex=start;
  let depth=0;
  for(let match;(match=tag.exec(html));){
    depth+=match[0][1]==='/'?-1:1;
    if(depth===0)return tag.lastIndex;
  }
  return -1;
}

function divAfter(html,marker){
  const index=html.indexOf(marker);
  if(index<0)return null;
  const start=html.lastIndexOf('<div',index);
  const end=matchingDivEnd(html,start);
  return end<0?null:html.slice(start,end);
}

function linksFrom(html){
  return [...html.matchAll(/href="\/wh40k11ed\/factions\/death-guard\/([^"#?]+)"/gi)].map(match=>decodeURIComponent(match[1]));
}

export function buildCanonicalIndexes(book){
  const units=book.sections.filter(section=>section.kind==='unit').map(section=>({unitId:section.id,name:section.title,urlSlug:section.title.replace(/\s+/g,'-')}));
  const rules=[];
  const walk=value=>{
    if(Array.isArray(value))value.forEach(walk);
    else if(value&&typeof value==='object'){
      if(value.type==='rule'&&String(value.id).startsWith('stratagem-'))rules.push({ruleId:value.id,name:value.title.replace(/\s+-\s+\d+CP$/i,'')});
      Object.values(value).forEach(walk);
    }
  };
  walk(book.sections);
  const indexByName=entries=>new Map(entries.map(entry=>[normalized(entry.name),entry]));
  return {units:units.sort((left,right)=>left.unitId.localeCompare(right.unitId)),rules:rules.sort((left,right)=>left.ruleId.localeCompare(right.ruleId)),unitByName:indexByName(units),ruleByName:indexByName(rules)};
}

export function parseDatasheetHtml(html){
  const title=text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
  const keywordBlock=divAfter(html,'KEYWORDS:');
  const keywords=keywordBlock?sortStrings((text(keywordBlock.match(/KEYWORDS:([\s\S]*?)(?:FACTION KEYWORDS:|$)/i)?.[1])||'').split(';').map(value=>value.trim()).filter(Boolean)):null;
  const abilities=[];
  for(const match of html.matchAll(/<div class="dsAbility(?:_noLine)?">([\s\S]*?)<\/div>/gi)){
    const value=text(match[1]);
    if(!value||/^FACTION:/i.test(value)||/^This unit can be led by/i.test(value))continue;
    const name=value.match(/^([^:]{1,100}):\s+(.+)$/);
    if(name)abilities.push({name:name[1],text:name[2]});
  }
  const ledByMarker='<div class="dsHeader dsColorBgDG">LED BY</div>';
  const ledByIndex=html.indexOf(ledByMarker);
  const ledByStart=ledByIndex<0?-1:html.indexOf('<div',ledByIndex+ledByMarker.length);
  const ledByEnd=ledByStart<0?-1:matchingDivEnd(html,ledByStart);
  const ledByBlock=ledByEnd<0?null:html.slice(ledByStart,ledByEnd);
  const ledBy=ledByBlock===null?{status:'not-reported'}:{status:'reported',sourceNames:sortStrings(linksFrom(ledByBlock).map(value=>value.replaceAll('-',' ')))};
  return {title,keywords,abilities:abilities.sort((left,right)=>left.name.localeCompare(right.name,'en')),relations:{ledBy}};
}

export function parseFactionStratagems(html){
  const start=html.indexOf('<a name="Stratagems-1"');
  const end=html.indexOf('<a name="Crusade-Rules"');
  const visibleHtml=start>=0&&end>start?html.slice(start,end):html;
  const matches=[...visibleHtml.matchAll(/<div class="str11HeadBlock str11Name">([\s\S]*?)<\/div>/gi)];
  return matches.map((match,index)=>{
    const block=visibleHtml.slice(match.index,matches[index+1]?.index??visibleHtml.length);
    const type=text(block.match(/<div class="str11Type[^\"]*">([\s\S]*?)<\/div>/i)?.[1]);
    const target=text(block.match(/<b>TARGET:<\/b>([\s\S]*?)(?:<br\s*\/?>\s*<br\s*\/?>)?<b>EFFECT:<\/b>/i)?.[1]);
    if(!type||/\bCore\b/i.test(type))return null;
    const [detachment,category]=type.split(/\s+–\s+/);
    return {name:text(match[1]),detachment:(detachment||'').replace(/\s+Stratagem$/i,'').trim(),category:category?.trim()||'',target:target||null};
  }).filter(Boolean).sort((left,right)=>left.name.localeCompare(right.name,'en'));
}

function mapNames(names,index,kind,unresolved){
  const mapped=[];
  for(const name of names){
    const entry=index.get(normalized(name));
    if(!entry)unresolved.unknown.push({kind,name});
    else mapped.push(entry.unitId);
  }
  return sortStrings(mapped);
}

export function buildImport({book,factionHtml,datasheetHtmlByUnit,sourceUrlByUnit=new Map(),retrievedAt}){
  const indexes=buildCanonicalIndexes(book);
  const unresolved={ambiguous:[],duplicates:[],parse:[],renamed:[],unknown:[]};
  const datasheets=[];
  for(const unit of indexes.units){
    const parsed=parseDatasheetHtml(datasheetHtmlByUnit.get(unit.unitId)||'');
    if(!parsed.title)unresolved.parse.push({kind:'datasheet',unitId:unit.unitId,reason:'missing title'});
    if(!parsed.keywords)unresolved.parse.push({kind:'datasheet',unitId:unit.unitId,reason:'missing keywords'});
    if(parsed.title&&normalized(parsed.title)!==normalized(unit.name))unresolved.renamed.push({kind:'datasheet',unitId:unit.unitId,canonicalName:unit.name,wahapediaName:parsed.title});
    const ledBy=parsed.relations.ledBy;
    if(ledBy.status==='reported'){
      if(ledBy.sourceNames.length===0)unresolved.parse.push({kind:'datasheet',unitId:unit.unitId,reason:'Led By header without unit links'});
      ledBy.unitIds=mapNames(ledBy.sourceNames,indexes.unitByName,'ledBy',unresolved);
    }
    delete ledBy.sourceNames;
    datasheets.push({unitId:unit.unitId,name:unit.name,source:{url:sourceUrlByUnit.get(unit.unitId)||`${factionUrl}${unit.urlSlug}`},keywords:parsed.keywords||[],abilities:parsed.abilities,relations:parsed.relations});
  }
  const detachmentNames=new Set(book.sections.filter(section=>section.id.startsWith('detachment-')).map(section=>normalized(section.title)));
  const parsedRules=parseFactionStratagems(factionHtml).filter(rule=>detachmentNames.has(normalized(rule.detachment)));
  const byRuleName=new Map();
  for(const rule of parsedRules){
    const key=normalized(rule.name);
    if(byRuleName.has(key))unresolved.duplicates.push({kind:'stratagem',name:rule.name});
    else byRuleName.set(key,rule);
  }
  const stratagems=[];
  for(const rule of indexes.rules){
    const wahapedia=byRuleName.get(normalized(rule.name));
    if(!wahapedia){unresolved.unknown.push({kind:'stratagem',name:rule.name,ruleId:rule.ruleId});continue;}
    stratagems.push({ruleId:rule.ruleId,name:rule.name,source:{url:factionUrl},detachment:wahapedia.detachment,category:wahapedia.category,target:wahapedia.target});
  }
  for(const rule of parsedRules)if(!indexes.ruleByName.has(normalized(rule.name)))unresolved.unknown.push({kind:'stratagem',name:rule.name});
  const unresolvedEntries=Object.values(unresolved).flat();
  const snapshot={schema:'wahapedia-compatible-rules-snapshot/v1',scope,retrievedAt,source:{edition:'11',faction:'Death Guard',kind:'Wahapedia',url:factionUrl},datasheets:datasheets.sort((left,right)=>left.unitId.localeCompare(right.unitId)),stratagems:stratagems.sort((left,right)=>left.ruleId.localeCompare(right.ruleId))};
  const report={schema:'compatible-rules-import-report/v1',scope,retrievedAt,source:snapshot.source,summary:{datasheets:{canonical:indexes.units.length,imported:datasheets.length},stratagems:{canonical:indexes.rules.length,imported:stratagems.length},unresolved:unresolvedEntries.length},unresolved};
  return {snapshot,report,ok:unresolvedEntries.length===0&&datasheets.length===41&&stratagems.length===45};
}

async function fetchText(url){
  const response=await fetch(url,{headers:{'user-agent':'warhammer-rules-compatible-rules-importer/1.0'}});
  if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
}

async function main(){
  const args=process.argv.slice(2);
  const dateIndex=args.indexOf('--retrieved-at');
  const retrievedAt=dateIndex<0?'':args[dateIndex+1];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(retrievedAt))throw new Error('Pass an explicit --retrieved-at YYYY-MM-DD for deterministic output.');
  const book=readJson(sourceFile);
  const indexes=buildCanonicalIndexes(book);
  if(indexes.units.length!==41||indexes.rules.length!==45)throw new Error(`Canonical scope changed: ${indexes.units.length} datasheets, ${indexes.rules.length} faction Stratagems.`);
  const factionHtml=await fetchText(factionUrl);
  const sourceUrlByUnit=new Map();
  for(const slug of linksFrom(factionHtml)){
    const unit=indexes.unitByName.get(normalized(slug.replaceAll('-',' ')));
    if(unit&&!sourceUrlByUnit.has(unit.unitId))sourceUrlByUnit.set(unit.unitId,`${factionUrl}${slug}`);
  }
  const missingUrls=indexes.units.filter(unit=>!sourceUrlByUnit.has(unit.unitId));
  if(missingUrls.length)throw new Error(`Missing Wahapedia datasheet URLs: ${missingUrls.map(unit=>unit.unitId).join(', ')}`);
  const pages=await Promise.all(indexes.units.map(async unit=>[unit.unitId,await fetchText(sourceUrlByUnit.get(unit.unitId))]));
  const result=buildImport({book,factionHtml,datasheetHtmlByUnit:new Map(pages),sourceUrlByUnit,retrievedAt});
  writeJson(reportFile,result.report);
  if(!result.ok)throw new Error(`Import has ${result.report.summary.unresolved} unresolved entries; snapshot was not written.`);
  writeJson(snapshotFile,result.snapshot);
  process.stdout.write(`Imported ${result.snapshot.datasheets.length} datasheets and ${result.snapshot.stratagems.length} faction Stratagems.\n`);
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{process.stderr.write(`${error.message}\n`);process.exitCode=1;});
