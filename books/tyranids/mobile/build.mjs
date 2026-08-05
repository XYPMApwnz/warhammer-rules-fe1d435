import {readFile,writeFile} from 'node:fs/promises';

const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const glossary=JSON.parse(await readFile(new URL('../../../glossary/registry.en.json',import.meta.url),'utf8')).terms;
const aliases=JSON.parse(await readFile(new URL('../../../glossary/aliases.en.json',import.meta.url),'utf8')).aliases;
const glossaryContext=JSON.parse(await readFile(new URL('../../../glossary/contexts/tyranids.json',import.meta.url),'utf8')).terms;
const pointEnhancements=JSON.parse(await readFile(new URL('../content/tyranids-points.en.json',import.meta.url),'utf8')).enhancements;
const factionPack=JSON.parse(await readFile(new URL('../content/tyranids-faction-pack.en.json',import.meta.url),'utf8'));
const codexParity=JSON.parse(await readFile(new URL('../content/tyranids-codex-parity.en.json',import.meta.url),'utf8'));
const titleKey=value=>value.replace(/\s*\(Aura\)$/i,'').replace(/\s+/g,' ').trim().toLowerCase();
const enhancementTitles=new Map(pointEnhancements.map(item=>[titleKey(item.title),item.title]));
const coreStratagems=await readFile(new URL('../../death-guard/mobile/related-rules.inc',import.meta.url),'utf8').then(html=>html.slice(html.indexOf('<section class="related-detachment related-core"')));
const mobileRulePaths=new Map();
const stratagemTypes=new Map();
const collectStratagemTypes=value=>{if(Array.isArray(value)){value.forEach(collectStratagemTypes);return;}if(!value||typeof value!=='object')return;if(value.id&&value.when&&('cp'in value)){const type=String(value.category||'unknown').toLowerCase().replace(/\s+/g,'-');stratagemTypes.set(value.id.replace(/^stratagem-/,''),/^(battle-tactic|strategic-ploy|wargear|epic-deed|core)$/.test(type)?type:'unknown');}Object.values(value).forEach(collectStratagemTypes);};
collectStratagemTypes(factionPack);collectStratagemTypes(codexParity);

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
    const title=term.title?.en||id,summary=term.kind==='stratagem'?term.definition?.en||term.summary?.en||'':term.summary?.en||term.definition?.en||'';
    const fullRulePath=context?.navigation?.fullRulePath||term.fullRulePath||'';
    const anchor=fullRulePath.includes('#')?fullRulePath.slice(fullRulePath.indexOf('#')+1):'';
    const mobileRulePath=tyranidsRulePath(fullRulePath)?mobileRulePaths.get(anchor)||'':'';
    return `${start} data-term-title="${attribute(title)}" data-term-summary="${attribute(summary)}"${fullRulePath?` data-full-rule-path="${attribute(fullRulePath)}"`:''}${mobileRulePath?` data-mobile-rule-path="${attribute(mobileRulePath)}"`:''}${end}`;
  });
}

function annotateEnhancementTitles(html){
  return html.replace(/<article class="enhancement surface"([^>]*)>([\s\S]*?)<\/article>/g,(card,attributes,body)=>{
    const ruleId=/\bdata-rule-id="([^"]+)"/.exec(attributes)?.[1],cardTitle=/\bdata-term-title="([^"]+)"/.exec(body)?.[1],title=enhancementTitles.get(titleKey(cardTitle||''));
    if(!title)throw new Error(`Missing roster title for Enhancement ${ruleId||'(unknown)'}`);
    return `<article class="enhancement surface"${attributes.replace(/\sdata-enhancement-title="[^"]*"/g,'')} data-enhancement-title="${attribute(title)}">${body}</article>`;
  });
}

const detachments=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"[^>]*>\s*<h3 class="category-title detachment-title">([^<]+)\s*<span class="detachment-dp">([^<]+)<\/span><\/h3>/g)]
  .map(([,id,title,dp])=>({id,title:clean(title),dp:clean(dp),file:`${id.slice(11)}.html`,type:'detachment'}));
const categories=[...source.matchAll(/<section class="content-group" id="(datasheets-[^"]+)"[^>]*>\s*<h3 class="category-title">([^<]+)<\/h3>/g)]
  .map(([,id,title])=>{
    const section=extract('section',id);
    const units=[...section.matchAll(/<article\b[^>]*\bclass="[^"]*\bunit-card\b[^"]*"[^>]*\bid="(unit-[^"]+)"[^>]*>/g)].map(([,unitId])=>{
      const article=extract('article',unitId,section);
      const unitTitle=/<h3(?: class="unit-name")?>([\s\S]*?)<\/h3>/.exec(article)?.[1];
      if(!unitTitle)throw new Error(`Missing title for ${unitId}`);
      const ruleFacts=JSON.parse((/\bdata-rule-facts="([^"]*)"/.exec(article)?.[1]||'{}').replaceAll('&quot;','"').replaceAll('&amp;','&'));
      return{id:unitId,title:clean(unitTitle),file:`${unitId.slice(5)}.html`,type:'unit',category:id,enhancementsAllowed:!ruleFacts.epic};
    });
    return{id,title:clean(title),units};
  });
const units=categories.flatMap(category=>category.units);
if(detachments.length!==10||units.length!==57)throw new Error(`Expected 10 detachments and 57 datasheets, found ${detachments.length} and ${units.length}`);

const armyRulesContent=source.includes('id="army-rules"')?extract('section','army-rules'):
  `<section class="section" id="army-rules"><h2 class="section-title">Army Rules</h2><p class="lead">Current official replacements for the Tyranids army rules.</p>${extract('section','update-army-shadow-in-the-warp')}${extract('section','update-army-synapse')}</section>`;
const staticRoutes=[
  {file:'index.html',id:'start',title:'Start',type:'start'},
  {file:'army-rules.html',id:'army-rules',title:'Army Rules',type:'army-rules'},
  {file:'updates.html',id:'updates',title:'Updates',type:'section'}
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
  const html=hydrateTerms(portable(detachments.map(detachment=>{const slug=detachment.id.slice(11);return `<section class="related-detachment" data-detachment="${slug}"><h2>${detachment.title} <span class="detachment-dp">${detachment.dp}</span></h2><div data-related-kind="stratagems">${extract('section',`${slug}-stratagems`)}</div><div data-related-kind="enhancements" hidden>${extract('section',`${slug}-enhancements`)}</div></section>`;}).join('\n')+coreStratagems).replace(/\sdata-(?:eligibility|term-title|term-summary|full-rule-path|mobile-rule-path)="[^"]*"/g,''));
  return annotateEnhancementTitles(html);
}

const link=(route,active)=>`<a href="./${route.file}"${route.id===active?' aria-current="page"':''}>${route.title}${route.dp?` <span class="detachment-dp">${route.dp}</span>`:''}</a>`;
function navigation(route){
  const unitCategory=categories.find(category=>category.id===route.category);
  return `${staticRoutes.slice(0,2).map(item=>link(item,route.id)).join('')}<details name="mobile-primary"${route.type==='detachment'?' open':''}><summary>Detachments <span>${detachments.length}</span></summary><div class="mobile-nav-branch">${detachments.map(item=>link(item,route.id)).join('')}</div></details><details name="mobile-primary"${route.type==='unit'?' open':''}><summary>Datasheets <span>${units.length}</span></summary><div class="mobile-nav-branch mobile-unit-groups">${categories.map(category=>`<details${category===unitCategory?' open':''}><summary>${category.title} <span>${category.units.length}</span></summary><div class="mobile-nav-branch">${category.units.map(item=>link(item,route.id)).join('')}</div></details>`).join('')}</div></details>${link(staticRoutes[2],route.id)}`;
}

function page(route){
  const relatedSection=route.type==='unit'?`<section class="related-rules" id="relatedRules" aria-labelledby="relatedRulesTitle"><header class="related-rules-head"><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">${route.enhancementsAllowed?'Compatible Stratagems &amp; Enhancements':'Compatible Stratagems'}</h2></div></header><div class="related-controls"><label>Detachment<select id="relatedDetachment"><option value="all">All detachments</option>${detachments.map(item=>`<option value="${item.id.slice(11)}">${item.title}</option>`).join('')}</select></label>${route.enhancementsAllowed?'<div class="related-tabs" role="group" aria-label="Rule type"><button type="button" data-related-tab="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-related-tab="enhancements" aria-pressed="false">Enhancements</button></div>':''}</div><div class="related-content" id="relatedRulesContent"><p class="related-status">Loading rules&hellip;</p></div></section>`:'';
  const desktopId=route.type==='army-rules'&&!source.includes('id="army-rules"')?'update-army-shadow-in-the-warp':route.id;
  return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${route.title} &mdash; Tyranids</title><link rel="manifest" href="../../../manifest.webmanifest"><link rel="stylesheet" href="../../death-guard/styles/tokens.css?v=11"><link rel="stylesheet" href="../styles/tokens.css?v=3"><link rel="stylesheet" href="../../death-guard/styles/layout.css?v=11"><link rel="stylesheet" href="../../death-guard/styles/navigation.css?v=12"><link rel="stylesheet" href="../../death-guard/styles/content.css?v=40"><link rel="stylesheet" href="../../death-guard/styles/popups.css?v=18"><link rel="stylesheet" href="../../shared/datasheet-system.css?v=7"><link rel="stylesheet" href="../styles/book.css?v=4"><link rel="stylesheet" href="./mobile.css?v=2"></head><body><header class="app-header" id="appHeader"><button class="header-button nav-menu" id="navButton" aria-label="Open navigation" aria-controls="mobileNav" aria-expanded="false">&#9776;</button><div class="app-brand"><strong>Tyranids Rules</strong><small>11E &middot; Mobile reference</small></div><a class="library-link" href="../../../index.html" aria-label="Back to rulebook library"><span aria-hidden="true">&larr;</span><b>Library</b></a><div class="header-spacer"></div></header><button class="toc-scrim" id="navScrim" aria-label="Close navigation" hidden></button><nav class="toc-panel" id="mobileNav" aria-label="Tyranids navigation" aria-hidden="true"><h2 class="toc-heading">Contents</h2><div class="phone-shortcuts"><a class="phone-glossary" href="../../../glossary/index.html">Mega Glossary &rarr;</a><a class="phone-glossary phone-mode-switch" href="../reader.html#${desktopId}" data-view-switch>Desktop / iPad view &rarr;</a></div><div class="phone-tree">${navigation(route)}</div></nav><main class="main mobile-main"><article class="document">${hydrateTerms(content(route))}${relatedSection}</article><a class="return-popup" id="returnPopup" hidden>Return to popup</a></main><script src="../../shared/datasheet-layout.js?v=3"></script><script src="../../shared/rule-facts.js?v=1"></script><script src="../../shared/related-rules-matcher.js?v=4"></script><script src="../../shared/army-related-rules.js?v=6"></script><dialog class="mobile-dialog" id="termDialog" aria-label="Term reference"><div class="mobile-popup-stack" id="termPopupStack"></div></dialog><script src="../../../glossary/generated/glossary.en.js?v=tyranids-1"></script><script src="../../../glossary-return.js?v=3"></script><script src="../../shared/popup-rule-actions.js?v=1"></script><script src="../../shared/popup-content.js?v=3"></script><script src="../../shared/glossary-autolink.js?v=8"></script><script src="../../shared/roster-parser.js?v=2"></script><script src="../../shared/roster-entities.js?v=1"></script><script src="../../../roster-guides/points-data.js?v=6"></script><script src="./phone-popup-controller.js?v=1"></script><script src="./mobile.js?v=10"></script></body></html>`;
}

await writeFile(new URL('../scripts/stratagem-types.mjs',import.meta.url),`export const stratagemTypes=new Map(${JSON.stringify([...stratagemTypes].sort(([a],[b])=>a.localeCompare(b)))});\n`);
for(const route of routes)await writeFile(new URL(route.file,import.meta.url),page(route)
  .replace('<a class="phone-glossary" href="../../../glossary/index.html">','<a class="phone-glossary" href="../../../roster-guides/index.html" data-roster-guides-link hidden>&larr; Roster Guides</a><a class="phone-glossary" href="../../../glossary/index.html">')
  .replace('<script src="../../shared/related-rules-matcher.js?v=4"></script><script src="../../shared/army-related-rules.js?v=6"></script>','')
  .replace('rule-facts.js?v=1','rule-facts.js?v=4'));
await writeFile(new URL('related-rules.inc',import.meta.url),relatedRules());
for(const route of routes.filter(route=>route.type!=='start')){
  const html=await readFile(new URL(route.file,import.meta.url),'utf8');
  if(!html.includes(`id="${route.id}"`))throw new Error(`Incomplete route ${route.file}`);
}
console.log(`Tyranids mobile reference built: ${routes.length} pages, ${detachments.length} detachments, ${units.length} datasheets.`);
