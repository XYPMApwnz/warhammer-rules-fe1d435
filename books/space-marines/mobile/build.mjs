import {readFile,writeFile} from 'node:fs/promises';

const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const relatedRules=await readFile(new URL('./related-rules.source.inc',import.meta.url),'utf8');
const checking=process.argv.includes('--check'),stale=[];

function extract(tag,id,html=source){
  const opener=new RegExp(`<${tag}\\b[^>]*\\bid="${id}"[^>]*>`,'i').exec(html);if(!opener)throw new Error(`Missing ${tag}#${id}`);
  const tags=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tags.lastIndex=opener.index;let depth=0;
  for(let match;(match=tags.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return html.slice(opener.index,tags.lastIndex);}
  throw new Error(`Unclosed ${tag}#${id}`);
}
const clean=value=>value.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').trim();
const portable=html=>html.replaceAll('href="./sources/','href="../sources/').replaceAll('src="./assets/','src="../assets/');
const detachments=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"[^>]*>\s*<h3 class="category-title(?: detachment-title)?">([\s\S]*?)<\/h3>/g)].map(([,id,heading])=>{const dp=/<span class="detachment-dp">([^<]+)<\/span>/.exec(heading)?.[1]||'';return{id,title:clean(heading.replace(/<span[\s\S]*$/,'')),dp:clean(dp),file:`${id.slice(11)}.html`,type:'detachment'};});
const categories=[...source.matchAll(/<section class="content-group" id="(datasheets-[^"]+)"[^>]*>\s*<h3 class="category-title">([^<]+)<\/h3>/g)].map(([,id,title])=>{
  const section=extract('section',id),units=[...section.matchAll(/<article\b[^>]*\bclass="[^"]*\bunit-card\b[^"]*"[^>]*\bid="(unit-[^"]+)"[^>]*>/g)].map(([,unitId])=>{
    const article=extract('article',unitId,section),unitTitle=/<h3(?: class="unit-name")?>([\s\S]*?)<\/h3>/.exec(article)?.[1];if(!unitTitle)throw new Error(`Missing title for ${unitId}`);
    return{id:unitId,title:clean(unitTitle),file:`${unitId.slice(5)}.html`,type:'unit',category:id};
  });return{id,title:clean(title),units};
});
const units=categories.flatMap(category=>category.units);
if(detachments.length!==23||units.length!==101)throw new Error(`Expected 23 detachments and 101 datasheets, found ${detachments.length} and ${units.length}`);
const staticRoutes=[{file:'index.html',id:'start',title:'Start',type:'start'},{file:'army-rules.html',id:'army-rules',title:'Army Rules',type:'army-rules'},{file:'updates.html',id:'updates',title:'Updates',type:'section'}],routes=[...staticRoutes,...detachments,...units];
const content=route=>portable(route.type==='start'?extract('section','start'):route.type==='army-rules'?extract('section','army-rules'):route.type==='section'||route.type==='detachment'?extract('section',route.id):extract('article',route.id));
function navigation(route){
  const category=categories.find(item=>item.id===route.category),link=item=>`<a href="./${item.file}"${item.id===route.id?' aria-current="page"':''}>${item.title}${item.dp?` <span class="detachment-dp">${item.dp}</span>`:''}</a>`;
  return`${staticRoutes.slice(0,2).map(link).join('')}<details name="mobile-primary"${route.type==='detachment'?' open':''}><summary>Detachments <span>${detachments.length}</span></summary><div class="mobile-nav-branch">${detachments.map(link).join('')}</div></details><details name="mobile-primary"${route.type==='unit'?' open':''}><summary>Datasheets <span>${units.length}</span></summary><div class="mobile-nav-branch mobile-unit-groups">${categories.map(group=>`<details${group===category?' open':''}><summary>${group.title} <span>${group.units.length}</span></summary><div class="mobile-nav-branch">${group.units.map(link).join('')}</div></details>`).join('')}</div></details>${link(staticRoutes[2])}`;
}
function page(route){
  return`<!doctype html><html lang="en" data-theme="dark" data-book-id="space-marines"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${route.title} &mdash; Space Marines</title><link rel="manifest" href="../../../manifest.webmanifest"><link rel="stylesheet" href="../../death-guard/styles/tokens.css?v=11"><link rel="stylesheet" href="../styles/tokens.css?v=3"><link rel="stylesheet" href="../../death-guard/styles/layout.css?v=11"><link rel="stylesheet" href="../../death-guard/styles/navigation.css?v=12"><link rel="stylesheet" href="../../death-guard/styles/content.css?v=40"><link rel="stylesheet" href="../../death-guard/styles/popups.css?v=18"><link rel="stylesheet" href="../../shared/datasheet-system.css?v=7"><link rel="stylesheet" href="../styles/book.css?v=2"><link rel="stylesheet" href="./mobile.css?v=1"></head><body><header class="app-header" id="appHeader"><button class="header-button nav-menu" id="navButton" aria-label="Open navigation" aria-controls="mobileNav" aria-expanded="false">&#9776;</button><div class="app-brand"><strong>Space Marines Rules</strong><small>11E &middot; Mobile reference</small></div><a class="library-link" href="../../../index.html"><span>&larr;</span><b>Library</b></a><div class="header-spacer"></div></header><button class="toc-scrim" id="navScrim" aria-label="Close navigation" hidden></button><nav class="toc-panel" id="mobileNav" aria-label="Space Marines navigation" aria-hidden="true"><h2 class="toc-heading">Contents</h2><div class="phone-shortcuts"><a class="phone-glossary" href="../../../glossary/index.html">Mega Glossary &rarr;</a><a class="phone-glossary" href="../reader.html#${route.id}" data-view-switch>Desktop / iPad view &rarr;</a></div><div class="phone-tree">${navigation(route)}</div></nav><main class="main mobile-main"><article class="document">${content(route)}</article><a class="return-popup" id="returnPopup" hidden>Return to popup</a></main><script src="../../shared/datasheet-layout.js?v=3"></script><script src="../../shared/rule-facts.js?v=4"></script><dialog class="mobile-dialog" id="termDialog" aria-label="Term reference"><div class="mobile-popup-stack" id="termPopupStack"></div></dialog><script src="../../../glossary/generated/glossary.en.js?v=space-marines-1"></script><script src="../scripts/data.js?v=2"></script><script src="../../../glossary-return.js?v=3"></script><script src="../../shared/popup-rule-actions.js?v=1"></script><script src="../../shared/popup-content.js?v=3"></script><script src="../../shared/glossary-autolink.js?v=8"></script><script src="./phone-popup-controller.js?v=1"></script><script src="./mobile.js?v=1"></script></body></html>`;
}
async function emit(file,value){
  const target=new URL(file,import.meta.url);
  if(checking){let current='';try{current=await readFile(target,'utf8');}catch{}if(current!==value)stale.push(file);}
  else await writeFile(target,value);
}
await emit('related-rules.inc',relatedRules);
for(const route of routes)await emit(route.file,page(route));
if(stale.length)throw new Error(`Space Marines Phone output is stale: ${stale.join(', ')}`);
console.log(`Space Marines mobile reference ${checking?'checked':'built'}: ${routes.length} pages, ${detachments.length} detachments, ${units.length} datasheets.`);
