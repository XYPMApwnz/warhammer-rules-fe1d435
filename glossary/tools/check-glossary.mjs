import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(root,'..');
const registry=JSON.parse(fs.readFileSync(path.join(root,'registry.en.json'),'utf8'));
const aliases=JSON.parse(fs.readFileSync(path.join(root,'aliases.en.json'),'utf8')).aliases;
const report=JSON.parse(fs.readFileSync(path.join(root,'generated','conflict-report.json'),'utf8'));
const deathGuardSource=JSON.parse(fs.readFileSync(path.join(repoRoot,'books','death-guard','content','death-guard-rules.en.json'),'utf8'));
const errors=[];
const ids=new Set(Object.keys(registry.terms));
const presentations=new Set(['atomic','article','profile','reference','metadata']);
const publicScopes=new Set(['global','death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children']);
const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
function semanticAnomalies(value){
  const text=String(value||''),issues=[];
  const known=[
    ['joined keyword and unit',/\b(?:Monsteror|Vehicleunit)\b/i],
    ['split word',/\b(?:warrior s|fight ing|target s|r eactions|unt il)\b/i],
    ['broken numeric modifier',/\b(?:bearer|wearer) of 1\b/i],
    ['page header or footer fragment',/(?:\bCORE ABILITIES\s*\+\+|\+\+[^+\n]{3,}\+\+\s*\d{1,3}\s*$)/i],
    ['mojibake or replacement character',/\uFFFD|\u00C3|\u00C2|\u00E2\u20AC/],
    ['duplicated word',/\b([A-Za-z]{3,})\s+\1\b/]
  ];
  for(const [issue,pattern] of known)if(pattern.test(text))issues.push(issue);
  for(const match of text.matchAll(/\b([A-Z]{2,})\s+([a-z]{2,})\b/g))if(match[1].toLowerCase()===match[2])issues.push('duplicated keyword noun');
  if(!text.trimEnd().endsWith('…'))for(const [open,close] of [['(',')'],['[',']'],['{','}']]){
    if([...text].filter(char=>char===open).length!==[...text].filter(char=>char===close).length)issues.push(`unbalanced ${open}${close}`);
  }
  return issues;
}
function checkFullRulePath(owner,value){
  if(!value)return;
  if(value.startsWith('/')||/^[a-z]+:/i.test(value)||value.includes('..')){errors.push(`${owner}: unsafe fullRulePath ${value}`);return;}
  const [file,anchor='']=value.split('#',2),target=path.join(repoRoot,...file.split('/'));
  if(!fs.existsSync(target)){errors.push(`${owner}: missing fullRulePath file ${value}`);return;}
  if(anchor&&!fs.readFileSync(target,'utf8').includes(`id="${anchor}"`))errors.push(`${owner}: missing fullRulePath anchor ${value}`);
}
for(const [id,term] of Object.entries(registry.terms)){
  if(!publicScopes.has(term.scope))errors.push(`${id}: unpublished scope ${term.scope} leaked into the public registry`);
  for(const field of ['id','kind','scope','edition','language','title','summary','definition','canonicalSource','status'])if(term[field]==null)errors.push(`${id}: missing ${field}`);
  const summary=String(term.summary?.en||'').replace(/\s+/g,' ').trim();
  const definition=String(term.definition?.en||'').replace(/\s+/g,' ').trim();
  if(!summary)errors.push(`${id}: empty popup summary`);
  if(!definition)errors.push(`${id}: empty full definition`);
  for(const [field,value] of [['summary',term.summary?.en],['definition',term.definition?.en]])for(const issue of semanticAnomalies(value))errors.push(`${id}.${field}: ${issue}`);
  if(/\be\.g\./i.test(`${summary} ${definition}`))errors.push(`${id}: use “for example” instead of “e.g.”`);
  if(summary.length>280)errors.push(`${id}: popup summary is longer than 280 characters`);
  if(definition.length>320&&summary===definition)errors.push(`${id}: long definition is duplicated as popup summary`);
  if(!presentations.has(term.presentation))errors.push(`${id}: invalid presentation ${term.presentation}`);
  if(term.presentation==='article'&&summary===definition)errors.push(`${id}: article duplicates its popup summary as the full rule`);
  if(term.presentation==='profile'&&!term.structured?.weapon&&!term.structured?.statline)errors.push(`${id}: profile has no structured weapon or statline`);
  if(/^(weapon|datasheet) profile\.?$/i.test(summary))errors.push(`${id}: technical popup placeholder`);
  if(/^(weapon|datasheet) profile\.?$/i.test(definition))errors.push(`${id}: technical full-definition placeholder`);
  if(/no standalone Core Rules effect/i.test(`${summary} ${definition}`))errors.push(`${id}: obsolete keyword boilerplate`);
  if(!term.canonicalSource?.documentId||!term.canonicalSource?.revision||!term.canonicalSource?.locator)errors.push(`${id}: incomplete canonicalSource`);
  if(!['verified','provisional','deprecated'].includes(term.status))errors.push(`${id}: invalid status ${term.status}`);
  for(const target of [...(term.related||[]),...(term.mentions||[])])if(!ids.has(target))errors.push(`${id}: unresolved relation ${target}`);
  const keywordReferences=[...(term.references?.intrinsicRules||[]),...(term.references?.referencedByRules||[]),...(term.references?.commonRules||[]),...(term.references?.factionTerms||[]),...(term.references?.relatedKeywords||[])];
  for(const target of keywordReferences)if(!ids.has(target))errors.push(`${id}: unresolved keyword reference ${target}`);
  if(new Set(keywordReferences).size!==keywordReferences.length)errors.push(`${id}: duplicated keyword reference`);
  for(const target of term.references?.relatedKeywords||[])if(registry.terms[target]?.kind!=='keyword')errors.push(`${id}: related keyword ${target} is not a keyword`);
  if((term.kind==='keyword'||id.startsWith('keyword-'))&&term.references==null)errors.push(`${id}: keyword references were not generated`);
  checkFullRulePath(id,term.fullRulePath);
}
if(ids.has('keyword-flying'))errors.push('keyword-flying: FLYING must resolve to the canonical FLY keyword');
if(aliases['keyword-flying']!=='keyword-fly')errors.push('keyword-flying: missing legacy alias to keyword-fly');
for(const [alias,target] of Object.entries(aliases)){
  if(alias===target)errors.push(`${alias}: alias points to itself`);
  if(!ids.has(target))errors.push(`${alias}: unknown alias target ${target}`);
  if(aliases[target])errors.push(`${alias}: alias chain through ${target}`);
}
const deathGuardUnits=new Map(deathGuardSource.sections.filter(section=>section.kind==='unit').map(section=>[section.id,section]));
for(const entry of deathGuardSource.glossary.filter(entry=>entry.kind==='unit'&&entry.sectionId)){
  const target=aliases[entry.id],unit=deathGuardUnits.get(entry.sectionId);
  if(!target||!unit)errors.push(`${entry.id}: missing Death Guard unit mapping`);
  else if(JSON.stringify(registry.terms[target]?.structured?.points||[])!==JSON.stringify(unit.points||[]))errors.push(`${entry.id}: glossary points differ from the effective datasheet`);
}
for(const bookId of ['core-rules','death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children']){
  const context=JSON.parse(fs.readFileSync(path.join(root,'contexts',`${bookId}.json`),'utf8'));
  for(const [localId,entry] of Object.entries(context.terms)){
    if(!ids.has(aliases[entry.termId]||entry.termId))errors.push(`${bookId}/${localId}: unknown term ${entry.termId}`);
    for(const field of ['title','summary','definition'])if(field in entry)errors.push(`${bookId}/${localId}: context contains canonical field ${field}`);
    checkFullRulePath(`${bookId}/${localId}`,entry.navigation?.fullRulePath);
  }
}
const tyranidsCoreAbilities=['deep-strike','fights-first','hover','infiltrators','lance','lone-operative','stealth'];
const tyranidsContext=JSON.parse(fs.readFileSync(path.join(root,'contexts','tyranids.json'),'utf8')).terms;
for(const slug of tyranidsCoreAbilities){
  const localId=`tyranids-ability-${slug}`,coreId=`core-${slug}`;
  if(ids.has(localId))errors.push(`${localId}: duplicated canonical Core ability`);
  if(aliases[localId]!==coreId)errors.push(`${localId}: must alias ${coreId}`);
  if(tyranidsContext[localId]?.termId!==coreId)errors.push(`${localId}: Tyranids context must use ${coreId}`);
}
if(report.schema!==2)errors.push(`conflict report: expected schema 2, got ${report.schema}`);
for(const candidate of report.definitionCandidates||[]){
  const final=registry.terms[candidate.termId]?.definition?.en;
  if(final==null)errors.push(`${candidate.termId}: conflict report points to a missing term`);
  else if(clean(candidate.finalDefinition)!==clean(final))errors.push(`${candidate.termId}: conflict report finalDefinition differs from registry`);
  if(!['selected','normalized','rejected'].includes(candidate.resolution))errors.push(`${candidate.termId}: invalid conflict resolution ${candidate.resolution}`);
}
for(const candidate of report.summaryCandidates||[]){
  const final=registry.terms[candidate.termId]?.summary?.en;
  if(final==null)errors.push(`${candidate.termId}: summary report points to a missing term`);
  else if(clean(candidate.finalSummary)!==clean(final))errors.push(`${candidate.termId}: conflict report finalSummary differs from registry`);
  if(!['selected','normalized','rejected'].includes(candidate.resolution))errors.push(`${candidate.termId}: invalid summary resolution ${candidate.resolution}`);
}
for(const duplicate of report.duplicateCandidates||[]){
  if(duplicate.termIds.length<2)errors.push('conflict report: duplicate candidate has fewer than two terms');
  for(const id of duplicate.termIds)if(!ids.has(id))errors.push(`conflict report: duplicate candidate points to missing ${id}`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Mega Glossary QA passed: ${ids.size} canonical terms, ${Object.keys(aliases).length} aliases.`);
