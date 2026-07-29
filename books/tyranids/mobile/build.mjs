import {readFile,writeFile} from 'node:fs/promises';

const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const glossary=JSON.parse(await readFile(new URL('../../../glossary/registry.en.json',import.meta.url),'utf8')).terms;
const aliases=JSON.parse(await readFile(new URL('../../../glossary/aliases.en.json',import.meta.url),'utf8')).aliases;
const glossaryContext=JSON.parse(await readFile(new URL('../../../glossary/contexts/tyranids.json',import.meta.url),'utf8')).terms;
const existingRelated=await readFile(new URL('related-rules.source.inc',import.meta.url),'utf8');
const mobileRulePaths=new Map();

function extract(tag,id,html=source){
  const opener=new RegExp(`<${tag}\\b[^>]*\\bid="${id}"[^>]*>`,'i').exec(html);
  if(!opener)throw new Error(`Missing ${tag}#${id}`);
  const tags=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tags.lastIndex=opener.index;
  let depth=0;
  for(let match;(match=tags.exec(html));){
    depth+=match[0][1]==='/'?-1:1;
    if(depth===0)return html.slice(opener.index,tags.lastIndex);
  }
  throw new Error(`Unclosed ${tag}#${id}`);
}

const clean=value=>value.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').trim();
const attribute=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const tyranidsRulePath=path=>/^books\/tyranids\/(?:index|reader)\.html#/.test(path);
const portable=html=>html.replaceAll('href="./sources/','href="../sources/').replaceAll('src="./assets/','src="../assets/');
function hydrateTerms(html){
  return html.replace(/(<(?:button|a)\b[^>]*\bdata-term="([^"]+)"[^>]*)(>)/g,(match,start,id,end)=>{
    const context=glossaryContext[id]||glossaryContext[aliases[id]||id];
    const term=glossary[aliases[context?.termId]||context?.termId||aliases[id]||id];
    if(!term)throw new Error(`Missing glossary term ${id}`);
    const title=term.title?.en||id,summary=term.summary?.en||term.definition?.en||'';
    const fullRulePath=context?.navigation?.fullRulePath||term.fullRulePath||'';
    const anchor=fullRulePath.includes('#')?fullRulePath.slice(fullRulePath.indexOf('#')+1):'';
    const mobileRulePath=tyranidsRulePath(fullRulePath)?mobileRulePaths.get(anchor)||'':'';
    return `${start} data-term-title="${attribute(title)}" data-term-summary="${attribute(summary)}"${fullRulePath?` data-full-rule-path="${attribute(fullRulePath)}"`:''}${mobileRulePath?` data-mobile-rule-path="${attribute(mobileRulePath)}"`:''}${end}`;
  });
}

const detachments=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"[^>]*>\s*<h3 class="category-title">([^<]+)<\/h3>/g)]
  .map(([,id,title])=>({id,title:clean(title),file:`${id.slice(11)}.html`,type:'detachment'}));
const categories=[...source.matchAll(/<section class="content-group" id="(datasheets-[^"]+)"[^>]*>\s*<h3 class="category-title">([^<]+)<\/h3>/g)]
  .map(([,id,title])=>{
    const section=extract('section',id);
    const units=[...section.matchAll(/<article\b[^>]*\bclass="[^"]*\bunit-card\b[^"]*"[^>]*\bid="(unit-[^"]+)"[^>]*>/g)].map(([,unitId])=>{
      const article=extract('article',unitId,section);
      const unitTitle=/<h3(?: class="unit-name")?>([\s\S]*?)<\/h3>/.exec(article)?.[1];
      if(!unitTitle)throw new Error(`Missing title for ${unitId}`);
      const keywords=/\bdata-keywords="([^"]*)"/.exec(article)?.[1]||'';
      return{id:unitId,title:clean(unitTitle),file:`${unitId.slice(5)}.html`,type:'unit',category:id,enhancementsAllowed:!keywords.includes('EPIC HERO')};
    });
    return{id,title:clean(title),units};
  });
const units=categories.flatMap(category=>category.units);
if(detachments.length!==10||units.length!==57)throw new Error(`Expected 10 detachments and 57 datasheets, found ${detachments.length} and ${units.length}`);

const armyRulesContent=source.includes('id="army-rules"')?extract('section','army-rules'):
  `<section class="section" id="army-rules"><h2 class="section-title">Army Rules</h2><p class="lead">Current official replacements for the Tyranids army rules.</p>${extract('section','update-army-shadow-in-the-warp')}${extract('section','update-army-synapse')}</section>`;
const staticRoutes=[
  {file:'index.html',id:'start',title:'Start',type:'start'},
  {file:'updates.html',id:'updates',title:'Updates',type:'section'},
  {file:'army-rules.html',id:'army-rules',title:'Army Rules',type:'army-rules'}
];
const routes=[...staticRoutes,...detachments,...units];

function content(route){
  if(route.type==='start')return portable(extract('section','start'));
  if(route.type==='army-rules')return portable(armyRulesContent);
  if(route.type==='section'||route.type==='detachment')return portable(extract('section',route.id));
  return portable(extract('article',route.id));
}
for(const route of routes)for(const[,id]of content(route).matchAll(/\sid="([^"]+)"/g))mobileRulePaths.set(id,`books/tyranids/mobile/${route.file}#${id}`);
for(const context of Object.values(glossaryContext)){
  const path=context.navigation?.fullRulePath||'';
  if(tyranidsRulePath(path)&&!mobileRulePaths.has(path.slice(path.indexOf('#')+1)))throw new Error(`Missing mobile rule route for ${path}`);
}

function relatedRules(){
  return hydrateTerms(portable(existingRelated.replace(/\sdata-(?:term-title|term-summary|full-rule-path|mobile-rule-path)="[^"]*"/g,'')));
}

const link=(route,active)=>`<a href="./${route.file}"${route.id===active?' aria-current="page"':''}>${route.title}</a>`;
function navigation(route){
  const unitCategory=categories.find(category=>category.id===route.category);
  return `${staticRoutes.map(item=>link(item,route.id)).join('')}<details name="mobile-primary"${route.type==='detachment'?' open':''}><summary>Detachments <span>${detachments.length}</span></summary><div class="mobile-nav-branch">${detachments.map(item=>link(item,route.id)).join('')}</div></details><details name="mobile-primary"${route.type==='unit'?' open':''}><summary>Datasheets <span>${units.length}</span></summary><div class="mobile-nav-branch mobile-unit-groups">${categories.map(category=>`<details${category===unitCategory?' open':''}><summary>${category.title} <span>${category.units.length}</span></summary><div class="mobile-nav-branch">${category.units.map(item=>link(item,route.id)).join('')}</div></details>`).join('')}</div></details>`;
}

function page(route){
  const relatedSection=route.type==='unit'?`<section class="related-rules" id="relatedRules" aria-labelledby="relatedRulesTitle"><header class="related-rules-head"><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">${route.enhancementsAllowed?'Stratagems &amp; Enhancements':'Stratagems'}</h2></div></header><div class="related-controls"><label>Detachment<select id="relatedDetachment"><option value="all">All detachments</option>${detachments.map(item=>`<option value="${item.id.slice(11)}">${item.title}</option>`).join('')}</select></label>${route.enhancementsAllowed?'<div class="related-tabs" role="group" aria-label="Rule type"><button type="button" data-related-tab="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-related-tab="enhancements" aria-pressed="false">Enhancements</button></div>':''}</div><div class="related-content" id="relatedRulesContent"><p class="related-status">Loading rules&hellip;</p></div></section>`:'';
  const desktopId=route.type==='army-rules'&&!source.includes('id="army-rules"')?'update-army-shadow-in-the-warp':route.id;
  return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${route.title} &mdash; Tyranids</title><link rel="manifest" href="../../../manifest.webmanifest"><link rel="stylesheet" href="../../death-guard/styles/tokens.css?v=10"><link rel="stylesheet" href="../styles/tokens.css?v=1"><link rel="stylesheet" href="../../death-guard/styles/layout.css?v=9"><link rel="stylesheet" href="../../death-guard/styles/navigation.css?v=11"><link rel="stylesheet" href="../../death-guard/styles/content.css?v=29"><link rel="stylesheet" href="../../death-guard/styles/popups.css?v=17"><link rel="stylesheet" href="../../shared/datasheet-system.css?v=6"><link rel="stylesheet" href="../styles/book.css?v=2"><link rel="stylesheet" href="./mobile.css?v=1"></head><body><header class="app-header" id="appHeader"><button class="header-button nav-menu" id="navButton" aria-label="Open navigation" aria-controls="mobileNav" aria-expanded="false">&#9776;</button><div class="app-brand"><strong>Tyranids Rules</strong><small>11E &middot; Mobile reference</small></div><a class="library-link" href="../../../index.html" aria-label="Back to rulebook library"><span aria-hidden="true">&larr;</span><b>Library</b></a><div class="header-spacer"></div></header><button class="toc-scrim" id="navScrim" aria-label="Close navigation" hidden></button><nav class="toc-panel" id="mobileNav" aria-label="Tyranids navigation" aria-hidden="true"><h2 class="toc-heading">Contents</h2><div class="phone-shortcuts"><a class="phone-glossary" href="../../../glossary/index.html">Mega Glossary &rarr;</a><a class="phone-glossary phone-mode-switch" href="../reader.html#${desktopId}" data-view-switch>Desktop / iPad view &rarr;</a></div><div class="phone-tree">${navigation(route)}</div></nav><main class="main mobile-main"><article class="document">${hydrateTerms(content(route))}${relatedSection}</article><a class="return-popup" id="returnPopup" hidden>Return to popup</a></main><script src="../../shared/datasheet-layout.js?v=2"></script><script src="../../shared/related-rules-matcher.js?v=1"></script><script src="../../shared/army-related-rules.js?v=3"></script><dialog class="mobile-dialog" id="termDialog" aria-labelledby="termTitle"><form method="dialog" class="mobile-dialog-head"><span>Mega Glossary</span><button aria-label="Close popup">&times;</button></form><h2 id="termTitle"></h2><p id="termSummary"></p><a id="termRule" hidden>Open full rule &rarr;</a><a id="termFull" href="../../../glossary/index.html">Glossary entry &rarr;</a></dialog><script src="../../../glossary-return.js?v=2"></script><script src="./mobile.js?v=1"></script></body></html>`;
}

for(const route of routes)await writeFile(new URL(route.file,import.meta.url),page(route));
await writeFile(new URL('related-rules.inc',import.meta.url),relatedRules());
for(const route of routes.filter(route=>route.type!=='start')){
  const html=await readFile(new URL(route.file,import.meta.url),'utf8');
  if(!html.includes(`id="${route.id}"`))throw new Error(`Incomplete route ${route.file}`);
}
console.log(`Tyranids mobile reference built: ${routes.length} pages, ${detachments.length} detachments, ${units.length} datasheets.`);
