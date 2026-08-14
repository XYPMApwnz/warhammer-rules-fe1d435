import {readdir,readFile,unlink,writeFile} from 'node:fs/promises';

const check=process.argv.includes('--check');
const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const glossary=JSON.parse(await readFile(new URL('../../../glossary/registry.en.json',import.meta.url),'utf8')).terms;
const aliases=JSON.parse(await readFile(new URL('../../../glossary/aliases.en.json',import.meta.url),'utf8')).aliases;
const glossaryContext=JSON.parse(await readFile(new URL('../../../glossary/contexts/blood-angels.json',import.meta.url),'utf8')).terms;

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
const attribute=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const portable=html=>html.replaceAll('href="./sources/','href="../sources/').replaceAll('src="./assets/','src="../assets/');
const attr=(html,name)=>new RegExp(`\\s${name}="([^"]*)"`).exec(html)?.[1]||'';

const detachments=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"[^>]*>\s*<h3 class="category-title(?: detachment-title)?">([\s\S]*?)<\/h3>/g)].map(([,id,heading])=>({id,title:clean(heading.replace(/<span[\s\S]*$/,'')),file:`${id.slice(11)}.html`,type:'detachment'}));
const categories=[...source.matchAll(/<section class="content-group" id="(datasheets-[^"]+)"[^>]*>\s*<h3 class="category-title">([^<]+)<\/h3>/g)].map(([,id,title])=>{
  const section=extract('section',id);
  const units=[...section.matchAll(/<article\b[^>]*\bclass="[^"]*\bunit-card\b[^"]*"[^>]*\bid="(unit-[^"]+)"[^>]*>/g)].map(([,unitId])=>{
    const article=extract('article',unitId,section),unitTitle=/<h3(?: class="unit-name")?>([\s\S]*?)<\/h3>/.exec(article)?.[1];
    if(!unitTitle)throw new Error(`Missing title for ${unitId}`);
    const owner=/Space Marines shared datasheet/.test(article)?'space-marines':'blood-angels';
    return{id:unitId,title:clean(unitTitle),file:`${unitId.slice(5)}.html`,type:'unit',category:id,owner};
  });
  return{id,title:clean(title),units};
});
const units=categories.flatMap(category=>category.units);
const localUnits=units.filter(unit=>unit.owner==='blood-angels');
const sharedUnits=units.filter(unit=>unit.owner==='space-marines');
if(detachments.length!==24||localUnits.length!==15||sharedUnits.length!==82)throw new Error(`Expected 24 Detachments, 15 Blood Angels Datasheets and 82 shared Space Marines Datasheets; found ${detachments.length}, ${localUnits.length} and ${sharedUnits.length}`);

const staticRoutes=[
  {file:'index.html',id:'start',title:'Start',type:'start'},
  {file:'army-rules.html',id:'army-rules',title:'Army Rules',type:'army-rules'},
  {file:'updates.html',id:'updates',title:'Updates',type:'section'}
];
const routes=[...staticRoutes,...detachments,...units],routeById=new Map(routes.map(route=>[route.id,route]));
const collisions=[...Map.groupBy(routes,route=>route.file)].filter(([,items])=>items.length>1);
if(collisions.length)throw new Error(`Phone route collisions: ${collisions.map(([file,items])=>`${file}: ${items.map(item=>item.id).join(', ')}`).join('; ')}`);

const routeLinks=html=>html.replace(/<button\b([^>]*\bdata-journey-target="([^"]+)"[^>]*)>([\s\S]*?)<\/button>/g,(match,attributes,target,body)=>{
  const route=routeById.get(target);
  return route?`<a${attributes.replace(/\stype="button"/g,'')} href="./${route.file}">${body}</a>`:match;
});
const rawContent=route=>routeLinks(portable(route.type==='start'?extract('section','start'):route.type==='army-rules'?extract('section','army-rules'):route.type==='section'||route.type==='detachment'?extract('section',route.id):extract('article',route.id)));
const mobileRulePaths=new Map();
for(const route of routes)for(const[,id]of rawContent(route).matchAll(/\sid="([^"]+)"/g))mobileRulePaths.set(id,`books/blood-angels/mobile/${route.file}#${id}`);

function hydrateTerms(html){
  return html.replace(/(<(?:button|a)\b[^>]*\bdata-term="([^"]+)"[^>]*)(>)/g,(match,start,id,end)=>{
    const context=glossaryContext[id]||glossaryContext[aliases[id]||id],term=glossary[aliases[context?.termId]||context?.termId||aliases[id]||id];
    const title=term?.title?.en||attr(start,'data-term-title')||id,summary=term?(term.kind==='stratagem'?term.definition?.en||term.summary?.en||'':term.summary?.en||term.definition?.en||''):attr(start,'data-term-summary');
    if(!term&&!summary){const inert=start.replace(new RegExp(`\\sdata-term="${id.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')}"`),` data-source-term="${attribute(id)}"`);return `${inert}${start.startsWith('<button')?' disabled':''}${end}`;}
    const fullRulePath=attr(start,'data-full-rule-path')||context?.navigation?.fullRulePath||term?.fullRulePath||'',anchor=fullRulePath.includes('#')?fullRulePath.slice(fullRulePath.indexOf('#')+1):'';
    const mobileRulePath=mobileRulePaths.get(anchor)||'';
    const base=start.replace(/\sdata-(?:term-title|term-summary|full-rule-path|mobile-rule-path)="[^"]*"/g,'');
    return `${base} data-term-title="${attribute(title)}" data-term-summary="${attribute(summary)}"${fullRulePath?` data-full-rule-path="${attribute(fullRulePath)}"`:''}${mobileRulePath?` data-mobile-rule-path="${attribute(mobileRulePath)}"`:''}${end}`;
  });
}

for(const context of Object.values(glossaryContext)){
  const path=context.navigation?.fullRulePath||'',anchor=path.includes('#')?path.slice(path.indexOf('#')+1):'';
  if(/^books\/blood-angels\/(?:index|reader)\.html#/.test(path)&&!mobileRulePaths.has(anchor))throw new Error(`Missing mobile rule route for ${path}`);
}

const link=(route,active)=>`<a href="./${route.file}"${route.id===active?' aria-current="page"':''}>${route.title}</a>`;
function navigation(route){
  const activeCategory=categories.find(category=>category.id===route.category);
  const datasheets=categories.map(category=>`<details data-category-id="${category.id}"${category===activeCategory?' open':''}><summary>${category.title} <span>${category.units.length}</span></summary><div class="mobile-nav-branch">${category.units.map(item=>link(item,route.id)).join('')}</div></details>`).join('');
  return `${staticRoutes.slice(0,2).map(item=>link(item,route.id)).join('')}<details name="mobile-primary"${route.type==='detachment'?' open':''}><summary>Detachments <span>${detachments.length}</span></summary><div class="mobile-nav-branch">${detachments.map(item=>link(item,route.id)).join('')}</div></details><details name="mobile-primary"${route.type==='unit'?' open':''}><summary>Datasheets <span>${units.length}</span></summary><div class="mobile-nav-branch mobile-unit-groups">${datasheets}</div></details>${link(staticRoutes[2],route.id)}`;
}

function page(route){
  const related=route.type==='unit'?`<section class="related-rules" id="relatedRules" aria-labelledby="relatedRulesTitle"><header class="related-rules-head"><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">Compatible Stratagems &amp; Enhancements</h2></div></header><div class="related-controls"><label>Detachment<select id="relatedDetachment"><option value="all">All detachments</option>${detachments.map(item=>`<option value="${item.id.slice(11)}">${item.title}</option>`).join('')}</select></label><div class="related-tabs" role="group" aria-label="Rule type"><button type="button" data-related-tab="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-related-tab="enhancements" aria-pressed="false">Enhancements</button></div></div><div class="related-content" id="relatedRulesContent"><p class="related-status">Loading rules&hellip;</p></div></section>`:'';
  return `<!doctype html><html lang="en" data-theme="dark" data-book-id="blood-angels"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${route.title} &mdash; Blood Angels</title><link rel="manifest" href="../../../manifest.webmanifest"><link rel="stylesheet" href="../../death-guard/styles/tokens.css?v=11"><link rel="stylesheet" href="../styles/tokens.css?v=2"><link rel="stylesheet" href="../../death-guard/styles/layout.css?v=11"><link rel="stylesheet" href="../../death-guard/styles/navigation.css?v=12"><link rel="stylesheet" href="../../death-guard/styles/content.css?v=41"><link rel="stylesheet" href="../../death-guard/styles/popups.css?v=18"><link rel="stylesheet" href="../../shared/datasheet-system.css?v=8"><link rel="stylesheet" href="../styles/book.css?v=2"><link rel="stylesheet" href="./mobile.css?v=1"></head><body><header class="app-header" id="appHeader"><button class="header-button nav-menu" id="navButton" aria-label="Open navigation" aria-controls="mobileNav" aria-expanded="false">&#9776;</button><div class="app-brand"><strong>Blood Angels Rules</strong><small>11E &middot; Phone reference</small></div><a class="library-link" href="../../../index.html" aria-label="Back to rulebook library"><span aria-hidden="true">&larr;</span><b>Library</b></a><div class="header-spacer"></div></header><button class="toc-scrim" id="navScrim" aria-label="Close navigation" hidden></button><nav class="toc-panel" id="mobileNav" aria-label="Blood Angels navigation" aria-hidden="true"><h2 class="toc-heading">Contents</h2><div class="phone-shortcuts"><a class="phone-glossary" href="../../../roster-guides/index.html" data-roster-guides-link hidden>&larr; Roster Guides</a><a class="phone-glossary" href="../../../glossary/index.html">Mega Glossary &rarr;</a><a class="phone-glossary phone-mode-switch" href="../reader.html#${route.id}" data-view-switch>Desktop / iPad view &rarr;</a></div><div class="phone-tree">${navigation(route)}</div></nav><main class="main mobile-main"><article class="document">${hydrateTerms(rawContent(route))}${related}</article><a class="return-popup" id="returnPopup" hidden>Return to popup</a></main><script src="../../shared/datasheet-layout.js?v=5"></script><script src="../../shared/rule-facts.js?v=4"></script><dialog class="mobile-dialog" id="termDialog" aria-label="Term reference"><div class="mobile-popup-stack" id="termPopupStack"></div></dialog><script src="../../../glossary/generated/glossary.en.js?v=blood-angels-1"></script><script src="../scripts/roster-data.js?v=1"></script><script src="../../shared/book-roster-enhancements.js?v=1"></script><script src="../../../glossary-return.js?v=3"></script><script src="../../shared/popup-rule-actions.js?v=1"></script><script src="../../shared/popup-content.js?v=3"></script><script src="../../shared/glossary-autolink.js?v=8"></script><script src="../../shared/roster-parser.js?v=2"></script><script src="../../shared/roster-entities.js?v=1"></script><script src="./phone-popup-controller.js?v=1"></script><script src="./mobile.js?v=2"></script></body></html>\n`;
}

const outputs=new Map(routes.map(route=>[route.file,page(route)])),expectedFiles=new Set(outputs.keys()),existingHtml=(await readdir(new URL('./',import.meta.url))).filter(file=>file.endsWith('.html'));
if(check){
  const errors=[];
  for(const [file,expected] of outputs){let actual='';try{actual=await readFile(new URL(file,import.meta.url),'utf8');}catch{}if(actual!==expected)errors.push(`${file}: stale or missing`);}
  for(const file of existingHtml)if(!expectedFiles.has(file))errors.push(`${file}: orphan route`);
  if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Blood Angels Phone build check: ${routes.length} routes are fresh.`);
}else{
  for(const [file,html] of outputs)await writeFile(new URL(file,import.meta.url),html);
  for(const file of existingHtml)if(!expectedFiles.has(file))await unlink(new URL(file,import.meta.url));
  console.log(`Blood Angels mobile reference built: ${routes.length} pages, ${detachments.length} detachments, ${localUnits.length} local datasheets and ${sharedUnits.length} shared datasheets.`);
}
