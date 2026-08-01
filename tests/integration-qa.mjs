import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const exists=name=>fs.existsSync(path.join(root,name));
const results=[];
const check=(name,ok,detail='')=>results.push({name,ok,detail});

const library=read('index.html');
const rosterGuides=read('roster-guides/index.html');
const rosterGuidesApp=read('roster-guides/app.js');
const sw=read('service-worker.js');
let appShell=[],navigationFallback;
const coreReaderFiles=fs.readdirSync(path.join(root,'books','core-rules','reader')).filter(name=>name.endsWith('.html'));
const books={
  'death-guard':{version:'9',reader:'reader.html',versions:{'styles/tokens.css':'11','styles/layout.css':'11','styles/navigation.css':'12','styles/content.css':'38','styles/popups.css':'17','scripts/roster-filter.js':'16','scripts/navigation-controller.js':'16','scripts/popup-controller.js':'25','scripts/full-entry-controller.js':'9','scripts/journey-controller.js':'13','scripts/ui-controllers.js':'12','scripts/app.js':'39'},app:'scripts/app.js',usesPopupGlossary:true,files:['assets/icon-v4.svg','styles/tokens.css','styles/layout.css','styles/navigation.css','styles/content.css','styles/popups.css','scripts/roster-filter.js','scripts/navigation-controller.js','scripts/popup-controller.js','scripts/full-entry-controller.js','scripts/journey-controller.js','scripts/ui-controllers.js','scripts/app.js']},
  'core-rules':{version:null,reader:'reader/index.html',rootPrefix:'../../../',libraryEntry:'reader/index.html',versions:{'reader/styles.css':'14','reader/app.js':'14'},app:'reader/app.js',usesPopupGlossary:false,files:['reader/index.html','reader/search-index.json','reader/styles.css','reader/app.js']},
  'adeptus-mechanicus':{version:null,reader:'reader.html',versions:{'styles/tokens.css':'15','styles/mechanicus.css':'19','scripts/data.js':'1','scripts/faction-ui.js':'1','scripts/roster-enhancements.js':'2','scripts/roster-filter.js':'3','scripts/app.js':'30','mobile/mobile.css':'1','mobile/mobile.js':'6'},app:'scripts/app.js',usesPopupGlossary:true,files:['reader.html','mobile/index.html','mobile/mobile.css','mobile/mobile.js','assets/mechanicus-logo.png','assets/mechanicus-cover-800.webp','styles/tokens.css','styles/mechanicus.css','scripts/data.js','scripts/faction-ui.js','scripts/roster-enhancements.js','scripts/roster-filter.js','scripts/app.js']}
};

for(const file of ['service-worker.js','glossary-return.js','books/shared/navigation-targets.js','books/shared/popup-rule-actions.js','books/shared/datasheet-layout.js','books/shared/popup-content.js','books/shared/rule-facts.js','books/shared/related-rules-matcher.js','books/shared/roster-entities.js','books/shared/roster-parser.js','books/shared/roster-enhancements.js',...Object.entries(books).map(([slug,book])=>`books/${slug}/${book.app}`)]){
  try{new vm.Script(read(file),{filename:file});check(file+' syntax',true);}
  catch(error){check(file+' syntax',false,error.message);}
}

try{
  let installHandler,installPromise,inFlight=0,peakInFlight=0,cachedFiles=0;
  const context={
    importScripts(){},
    caches:{open:async()=>({add:async()=>{inFlight+=1;peakInFlight=Math.max(peakInFlight,inFlight);await new Promise(resolve=>setImmediate(resolve));inFlight-=1;cachedFiles+=1;}})},
    self:{WH40K_CACHE_REVISION:'qa',addEventListener(type,handler){if(type==='install')installHandler=handler;},skipWaiting(){}},
    fetch(){},URL
  };
  vm.runInNewContext(sw,context);
  installHandler({waitUntil(promise){installPromise=promise;}});
  await installPromise;
  check('service worker limits app-shell download concurrency',cachedFiles>100&&peakInFlight===4,`${cachedFiles} files, peak ${peakInFlight}`);
}catch(error){check('service worker limits app-shell download concurrency',false,error.message);}

try{
  const context={importScripts(){},caches:{},self:{WH40K_CACHE_REVISION:'qa',addEventListener(){}},fetch(){},URL};
  vm.runInNewContext(`${sw}\n;globalThis.__APP_SHELL=APP_SHELL;globalThis.__NAVIGATION_FALLBACK=navigationFallback;`,context);
  appShell=[...context.__APP_SHELL];navigationFallback=context.__NAVIGATION_FALLBACK;
  check('Tyranids offline routes preserve entry, desktop and Phone mode',
    navigationFallback(new URL('https://example.test/books/tyranids/?build=qa')).endsWith('/books/tyranids/index.html')&&
    navigationFallback(new URL('https://example.test/books/tyranids/reader.html?roster=qa')).endsWith('/books/tyranids/reader.html')&&
    navigationFallback(new URL('https://example.test/books/tyranids/mobile/hive-tyrant.html?build=qa')).endsWith('/books/tyranids/mobile/index.html'));
  check("T'au Empire offline routes preserve entry, desktop and Phone mode",
    navigationFallback(new URL('https://example.test/books/tau-empire/?build=qa')).endsWith('/books/tau-empire/index.html')&&
    navigationFallback(new URL('https://example.test/books/tau-empire/reader.html?roster=qa')).endsWith('/books/tau-empire/reader.html')&&
    navigationFallback(new URL('https://example.test/books/tau-empire/mobile/commander-farsight.html?build=qa')).endsWith('/books/tau-empire/mobile/index.html'));
  check('navigation cache ignores technical query without weakening asset versions',sw.includes('caches.match(request, {ignoreSearch: true})')&&sw.indexOf('caches.match(request, {ignoreSearch: true})')<sw.indexOf('caches.match(fallback)')&&!/if \(request\.mode === "navigate"\)[\s\S]*?return;\s*}\s*event\.respondWith\(\s*caches\.match\(request, \{ignoreSearch: true}/.test(sw));
}catch(error){check('Tyranids offline route contract is executable',false,error.message);}

for(const [slug,book] of Object.entries(books)){
  const html=read(`books/${slug}/${book.reader||'index.html'}`);
  const app=read(`books/${slug}/${book.app}`);
  check(`${slug} card opens the real reader`,library.includes(`href="books/${slug}/${book.libraryEntry||'index.html'}"`));
  check(`${slug} reader and shell files exist`,exists(`books/${slug}/index.html`)&&book.files.every(file=>exists(`books/${slug}/${file}`)),book.files.filter(file=>!exists(`books/${slug}/${file}`)).join(', '));
  const rootPrefix=book.rootPrefix||'../../';
  check(`${slug} links to the root manifest`,html.includes(`href="${rootPrefix}manifest.webmanifest"`));
  check(`${slug} exposes the shared library link`,html.includes(`href="${rootPrefix}index.html"`));
  check(`${slug} delegates to the root service worker`,app.includes(`register('${rootPrefix}service-worker.js')`));
  check(`${slug} has a dedicated offline fallback`,sw.includes(`${slug.replaceAll('-','_').toUpperCase()}_FALLBACK`)&&sw.includes(`/books/${slug}/`));
  check(`${slug} has no nested PWA ownership`,!app.includes("register('./service-worker.js')"));
  const missing=book.files.filter(file=>{
    const version=book.versions?.[file]||book.version;
    const suffix=version&&/\.(css|js)$/.test(file)?`?v=${version}`:'';
    return !sw.includes(`"./books/${slug}/${file}${suffix}"`);
  });
  check(`${slug} shell is precached`,missing.length===0,missing.join(', '));
}
const generatedArmyBooks=fs.readdirSync(path.join(root,'books'),{withFileTypes:true}).filter(entry=>entry.isDirectory()).map(entry=>entry.name).filter(slug=>exists(`books/${slug}/book.config.json`)&&exists(`books/${slug}/reader.html`)&&exists(`books/${slug}/scripts/data.js`));
const visibleGeneratedArmyBooks=new Set(['tyranids','tau-empire']);
for(const slug of generatedArmyBooks){
  const html=read(`books/${slug}/reader.html`),app=read(`books/${slug}/scripts/app.js`),mobile=read(`books/${slug}/mobile/index.html`),bookCss=read(`books/${slug}/styles/book.css`),context=JSON.parse(read(`glossary/contexts/${slug}.json`)),config=JSON.parse(read(`books/${slug}/book.config.json`));
  const fallbackName=slug.replaceAll('-','_').toUpperCase()+'_FALLBACK';
  check(`${slug} Library visibility matches the current release`,library.includes(`href="books/${slug}/index.html"`)===visibleGeneratedArmyBooks.has(slug));
  check(`${slug} uses the shared DG interaction architecture`,html.includes('../death-guard/scripts/navigation-controller.js')&&html.includes('../death-guard/scripts/popup-controller.js')&&html.includes('../death-guard/scripts/journey-controller.js')&&(config.dedicatedMobile?app.includes('new window.DGNavigation()')&&!html.includes('army-book-app.js'):app.includes('WHArmyBook.install')));
  const factionTokens=config.dedicatedMobile?'./styles/tokens.css?v=3':'./styles/tokens.css?v=2';
  check(`${slug} loads base tokens before faction overrides`,html.indexOf('../death-guard/styles/tokens.css?v=11')>=0&&html.indexOf('../death-guard/styles/tokens.css?v=11')<html.indexOf(factionTokens));
  const relatedRuntimeVersion=9;
  check(`${slug} exposes Library, Glossary and Related Rules`,html.includes('href="../../index.html"')&&html.includes('href="../../glossary/index.html"')&&html.includes(`../shared/army-related-rules.js?v=${relatedRuntimeVersion}`));
  check(`${slug} exposes the forced Phone view contract`,config.dedicatedMobile?app.includes("new URL('./mobile/'+route")&&mobile.includes('Desktop / iPad view')&&mobile.includes('data-view-switch')&&!bookCss.includes('html[data-view="mobile"]'):app.includes('readerPath')&&mobile.includes('searchParams.set("view","mobile")')&&bookCss.includes('html[data-view="mobile"] .nav-menu')&&bookCss.includes('html[data-view="mobile"] .unit-card.ds-layout .ds-main-grid'));
  check(`${slug} has a generated glossary context`,Object.keys(context.terms||{}).length>0);
  check(`${slug} has a dedicated offline fallback`,config.dedicatedMobile?['ENTRY','DESKTOP','MOBILE'].every(kind=>sw.includes(`const ${slug.replaceAll('-','_').toUpperCase()}_${kind}_FALLBACK`)):sw.includes(`const ${fallbackName}`)&&sw.includes(`/books/${slug}/`));
}
for(const slug of new Set(['death-guard','adeptus-mechanicus',...generatedArmyBooks])){
  const html=read(`books/${slug}/reader.html`);
  const toc=html.slice(html.indexOf('id="tocTree"'),html.indexOf('</nav>'));
  const document=html.slice(html.indexOf('<main'));
  const detachmentToc=toc.slice(toc.indexOf('data-nav-id="detachments"'),toc.indexOf('data-nav-id="datasheets"'));
  const detachmentIds=[...detachmentToc.matchAll(/data-nav-id="detachment-([^"]+)" data-nav-depth="2"/g)].map(match=>match[1]);
  check(`${slug} gives every Detachment a tracked third-level navigation contract`,detachmentIds.length>0&&detachmentIds.every(id=>{
    const required=[`${id}-rule`,...(document.includes(`id="${id}-enhancements"`)?[`${id}-enhancements`]:[]),...(document.includes(`id="${id}-stratagems"`)?[`${id}-stratagems`]:[])];
    return required.every(target=>detachmentToc.includes(`data-nav-id="${target}" data-nav-depth="3"`)&&document.includes(`id="${target}" data-track="${target}"`));
  }));
  const entry=read(`books/${slug}/index.html`);
  check(`${slug} entry shares the automatic phone/full routing contract`,entry.includes('view-router.js?v=2')&&entry.includes('./reader.html?view=full')&&entry.includes('./mobile/index.html?view=mobile'));
  check(`${slug} keeps Updates below Datasheets`,toc.indexOf('data-nav-id="datasheets"')<toc.indexOf('data-nav-id="updates"')&&document.indexOf('id="datasheets" data-track="datasheets"')<document.indexOf('id="updates" data-track="updates"'));
}
for(const slug of ['death-guard','adeptus-mechanicus','tyranids','tau-empire']){
  const mobile=read(`books/${slug}/mobile/index.html`);
  check(`${slug} Phone view keeps Updates below Datasheets`,mobile.indexOf('<summary>Datasheets')<mobile.indexOf('href="./updates.html"'));
}
const generatedArmyRuntime=read('books/shared/army-book-app.js');
const generatedArmyBuilder=read('books/shared/tools/build-army-book.mjs');
check('generated books force Phone view independently of viewport width',generatedArmyRuntime.includes("params.get('view')==='mobile'")&&generatedArmyRuntime.includes('Number.MAX_SAFE_INTEGER')&&generatedArmyRuntime.includes("phoneMode?'Desktop / iPad view':'Phone view'"));
check('generated view switching preserves URL context',generatedArmyRuntime.includes('destination.search=location.search')&&generatedArmyRuntime.includes("searchParams.set('view',phoneMode?'full':'mobile')")&&generatedArmyRuntime.includes("hashId&&!navigation.byId?.has(hashId)?location.hash:navigation.active||location.hash"));
check('generated builder validates before writing outputs',generatedArmyBuilder.indexOf("if(errors.length)throw")<generatedArmyBuilder.indexOf('for(const [relative,content] of outputs)'));

check('release cache namespace is isolated',sw.includes('warhammer-rules-fe1d435-'));
check('preview cache revision is content-derived',exists('glossary/generated/cache-revision.js')&&sw.includes('importScripts("./glossary/generated/cache-revision.js")')&&sw.includes('self.WH40K_CACHE_REVISION'));
check('library header opens the Mega Glossary',library.includes('glossary-link')&&library.includes('href="glossary/index.html"'));
check('library has no dead book-preview modal',!library.includes('id="overlay"')&&!library.includes('function openBook')&&!library.includes('function closeBook'));
check('Roster Guides have a dedicated public route',exists('roster-guides/index.html')&&exists('roster-guides/app.js'));
check('Roster Guides preserve the storage contract',rosterGuidesApp.includes("const STORAGE_KEY='wh40k-rosters-v1'")&&rosterGuidesApp.includes('function rosterId(text)')&&rosterGuidesApp.includes("'death guard':'../books/death-guard/reader.html'")&&rosterGuides.includes('app.js?v=8')&&sw.includes('./roster-guides/app.js?v=8'));
check('Roster Guides preserve corrupt raw storage before overwrite',rosterGuidesApp.includes("const CORRUPT_BACKUP_KEY='wh40k-rosters-v1-corrupt-backup'")&&rosterGuidesApp.includes('localStorage.getItem(CORRUPT_BACKUP_KEY)===null')&&rosterGuidesApp.includes('localStorage.setItem(CORRUPT_BACKUP_KEY,raw)'));
check('Roster Guides tolerate malformed saved collections',rosterGuidesApp.includes('Array.isArray(records)?records:[]')&&rosterGuidesApp.includes('.filter(isDisplayable)')&&rosterGuidesApp.includes("'date unknown'")&&rosterGuidesApp.includes('Array.isArray(record.roster.detachments)'));
check('Roster Guides keep saved records ahead of creation',rosterGuides.indexOf('id="saved-title"')<rosterGuides.indexOf('id="create-title"'));
check('Roster Guides have a dedicated offline fallback',sw.includes('ROSTER_GUIDES_FALLBACK')&&sw.includes('/roster-guides/'));
check('Library explains the product and separates primary spaces',library.includes('A unified reference for Core Rules')&&library.includes('Army Books')&&library.includes('href="roster-guides/index.html"'));
check('Library describes multi-faction Roster Guides honestly',library.includes('Save supported New Recruit rosters and open personal guides where available.'));
check('Library no longer owns roster storage or import controls',!library.includes('localStorage')&&!library.includes('id="roster-input"'));
check('legacy root roster links keep query and hash',library.includes("new URLSearchParams(location.search).get('roster')")&&library.includes("new URL('roster-guides/index.html',location.href)")&&library.includes('target.search=location.search')&&library.includes('target.hash=location.hash'));
check('empty legacy roster query stays in Library',library.includes("if(new URLSearchParams(location.search).get('roster'))"));
check('Roster Guides recognise the three supported factions and expose only real readers',rosterGuidesApp.includes("new Set(['death guard','adeptus mechanicus','t au empire'])")&&rosterGuidesApp.includes("'death guard':'../books/death-guard/reader.html'")&&rosterGuidesApp.includes("'adeptus mechanicus':'../books/adeptus-mechanicus/index.html'")&&rosterGuidesApp.includes("'t au empire':'../books/tau-empire/index.html'"));
check('Roster Guides use one dash-tolerant faction normaliser',rosterGuidesApp.includes('function normalizeFaction(value)')&&rosterGuidesApp.includes('[-–—]')&&rosterGuidesApp.includes('knownFaction(record.roster.faction)'));
check('unknown roster factions are blocked before save',rosterGuidesApp.indexOf("if(!faction){document.querySelector('#roster-result')")<rosterGuidesApp.indexOf('const record=saveRoster(roster,input.value)'));
check('missing roster and faction states are explicit',rosterGuidesApp.includes("alert('Saved roster not found.')")&&rosterGuidesApp.includes('<h2>Faction not found</h2>')&&read('books/shared/roster-parser.js').includes("value('FACTION KEYWORD')"));
check('backup import validates the v1 record and known faction',rosterGuidesApp.includes('function isImportableRecord(record)')&&rosterGuidesApp.includes('knownFaction(record?.roster?.faction)')&&rosterGuidesApp.includes('if(!isImportableRecord(record))throw new Error()'));
check('Mechanicus records open the real responsive reader',rosterGuidesApp.includes("'adeptus mechanicus':'../books/adeptus-mechanicus/index.html'")&&read('books/adeptus-mechanicus/reader.html').includes('scripts/roster-filter.js?v=3'));
check("T'au records open the dedicated responsive reader",rosterGuidesApp.includes("'t au empire':'../books/tau-empire/index.html'")&&read('books/tau-empire/reader.html').includes('roster-parser.js?v=2')&&read('books/tau-empire/scripts/app.js').includes("localStorage.getItem('wh40k-rosters-v1')"));
check('roster storage key remains compatible',rosterGuidesApp.includes("const STORAGE_KEY='wh40k-rosters-v1'"));
check('Roster Guides compare current Army Book points without blocking save',rosterGuides.includes('points-data.js?v=6')&&rosterGuides.includes('points-validator.js?v=4')&&rosterGuidesApp.includes('window.WHRosterPoints.check')&&rosterGuidesApp.includes('Points warning:')&&rosterGuidesApp.includes('The roster was still saved.')&&!rosterGuidesApp.includes('Roster is ready to build.'));
check('Roster Guides and Death Guard share one source parser',rosterGuides.includes('roster-parser.js?v=2')&&read('books/death-guard/reader.html').includes('roster-parser.js?v=2')&&read('books/death-guard/scripts/roster-filter.js').includes('WHRosterParser.parse'));
check('owned Enhancements are derived without mutating Army Book data',read('books/death-guard/reader.html').includes('roster-enhancements.js?v=3')&&['furnace','critical-hit-5','melee-a-2','plague-wind-range-12','narthecium-d3','mobile'].every(effect=>read('books/shared/roster-enhancements.js').includes(`item.effect === '${effect}'`)));
check('Enhancement UI reports only failed automatic effects',!read('books/shared/roster-enhancements.js').match(/Profile applied|Melee rule applied|Ability upgraded|Keyword applied/)&&read('books/shared/roster-enhancements.js').includes('Effect could not be applied automatically.')&&read('books/shared/roster-enhancements.js').includes('No matching melee weapon profiles were found.'));
check('Core Rules source pages are cached only on demand',!sw.includes('Array.from({length:88}')&&sw.includes('cached || fetchAndCache(request)'));
check('Core Rules routed chapters and search are available offline',coreReaderFiles.length===27&&coreReaderFiles.every(file=>sw.includes(`./books/core-rules/reader/${file}`))&&sw.includes('./books/core-rules/reader/search-index.json'));
check('service worker installs the complete app shell atomically',sw.includes('event.waitUntil(cacheAppShell().then(() => self.skipWaiting()))')&&!sw.includes('Promise.allSettled(APP_SHELL'));
const shellSource=sw.match(/const APP_SHELL = \[([\s\S]*?)\n\];/)?.[1]||'';
const missingShellFiles=[...shellSource.matchAll(/"\.\/([^"?]*)(?:\?[^\"]*)?"/g)].map(match=>match[1]).map(file=>file.endsWith('/')?file+'index.html':file).filter(file=>!exists(file));
check('every literal app-shell asset exists',missingShellFiles.length===0,missingShellFiles.join(', '));
const shellVersions=new Map();
for(const item of appShell){
  const url=new URL(item,'https://example.test/');
  if(!shellVersions.has(url.pathname))shellVersions.set(url.pathname,new Set());
  shellVersions.get(url.pathname).add(url.search);
}
const duplicateVersions=[...shellVersions].filter(([,versions])=>versions.size>1).map(([pathname,versions])=>`${pathname}: ${[...versions].join(', ')}`);
check('app shell never caches two versions of one asset',duplicateVersions.length===0,duplicateVersions.join('; '));
check('Death Guard Compatible Stratagems offline chain is versioned and precached',[
  './books/death-guard/scripts/app.js?v=39',
  './books/death-guard/mobile/mobile.js?v=21',
  './books/death-guard/scripts/compatible-stratagems-runtime.mjs?v=2',
  './books/death-guard/generated/compatible-rules.json',
  './books/death-guard/mobile/related-rules.inc?v=3',
  './glossary/generated/glossary.en.js?v=tyranids-1',
  './assets/death-guard-cover.jpg'
].every(item=>appShell.includes(item)));
const criticalRefs=file=>{
  const html=read(file),refs=[];
  for(const match of html.matchAll(/<(link|script|img)\b[^>]*(?:href|src)="([^"]+)"[^>]*>/gi)){
    const [tag,kind,ref]=match;
    if(kind.toLowerCase()==='link'&&!/rel="(?:stylesheet|manifest)"/i.test(tag))continue;
    const url=new URL(ref,`https://example.test/${file}`);
    if(url.origin==='https://example.test')refs.push(`.${url.pathname}${url.search}`);
  }
  return refs;
};
const deathGuardFallbackPages=['books/death-guard/reader.html','books/death-guard/mobile/index.html'];
const missingDeathGuardFallbackAssets=deathGuardFallbackPages.flatMap(file=>criticalRefs(file).filter(ref=>!appShell.includes(ref)).map(ref=>`${file} -> ${ref}`));
check('Death Guard fallback pages have exact render-critical dependencies in the app shell',missingDeathGuardFallbackAssets.length===0,missingDeathGuardFallbackAssets.join('; '));
const tyranidsFallbackPages=['books/tyranids/index.html','books/tyranids/reader.html','books/tyranids/mobile/index.html'];
const missingFallbackAssets=tyranidsFallbackPages.flatMap(file=>criticalRefs(file).filter(ref=>!appShell.includes(ref)).map(ref=>`${file} -> ${ref}`));
check('Tyranids fallback pages have exact render-critical dependencies in the app shell',missingFallbackAssets.length===0,missingFallbackAssets.join('; '));
const tauFallbackPages=['books/tau-empire/index.html','books/tau-empire/reader.html','books/tau-empire/mobile/index.html'];
const missingTauFallbackAssets=tauFallbackPages.flatMap(file=>criticalRefs(file).filter(ref=>!appShell.includes(ref)).map(ref=>`${file} -> ${ref}`));
check("T'au Empire fallback pages have exact render-critical dependencies in the app shell",missingTauFallbackAssets.length===0,missingTauFallbackAssets.join('; '));
check('Core Rules search shares loading and recovers from failure',read('books/core-rules/reader/app.js').includes('let searchIndexPromise')&&read('books/core-rules/reader/app.js').includes('if (!response.ok)')&&read('books/core-rules/reader/app.js').includes('searchIndexPromise = null')&&read('books/core-rules/reader/app.js').includes('Search unavailable. Close and try again.'));
check('Every result search prioritises title matches',read('books/core-rules/reader/app.js').includes('normalizeSearch(a.title).includes(query)')&&read('glossary/viewer.js').includes('if(title===query)return 0'));
check('Core Rules heavy source images remain cached on demand',!sw.includes('Array.from({length:88}')&&!sw.includes('./books/core-rules/assets/diagrams/BenefitOfCover.png'));
check('legacy Core Rules URL redirects to Reference',read('books/core-rules/index.html').includes("location.replace(new URL('reader/index.html',location.href))"));
check('Core Rules promotes official GW source and labels Wahapedia secondary',read('books/core-rules/reader/index.html').includes('Official GW PDF ↗')&&!read('books/core-rules/reader/index.html').includes('Wahapedia 11E ↗')&&read('books/core-rules/reader/movement-phase.html').includes('Secondary reference: Wahapedia 11E ↗'));
check('global glossary runtime exists and DG precaches its exact version',exists('glossary/generated/glossary.en.js')&&appShell.includes('./glossary/generated/glossary.en.js?v=tyranids-1'));
check('Mega Glossary return UI is shared, versioned and precached',read('glossary/index.html').includes('id="libraryBack"')&&read('glossary/index.html').includes('../glossary-return.js?v=3')&&read('glossary/index.html').includes('viewer.js?v=12')&&sw.includes('"./glossary-return.js?v=3"')&&sw.includes('"./glossary/viewer.js?v=12"')&&sw.includes('"./glossary/viewer-progressive.css?v=3"'));
check('Mega Glossary uses one article-first progressive view',read('glossary/viewer.js').includes("history.pushState(null,'',url)")&&!read('glossary/viewer.js').includes('history.replaceState')&&read('glossary/viewer.js').includes("detailsBlock('Registry details'")&&read('glossary/viewer.js').includes('Explore connections ·')&&read('glossary/viewer.js').includes('Search another term'));
check('Every reader can restore its originating term popup',read('glossary-return.js').includes('isExactReturnTarget')&&read('glossary-return.js').includes("'automatic'")&&read('books/core-rules/reader/core-concepts.html').includes('../../../glossary-return.js?v=3')&&read('books/core-rules/reader/app.js').includes('triggerIndex')&&read('books/death-guard/mobile/mortarion.html').includes('../../../glossary-return.js?v=3')&&read('books/death-guard/mobile/mobile.js').includes('triggerIndex'));
const pageState=read('glossary-return.js'),journey=read('books/death-guard/scripts/journey-controller.js'),navigation=read('books/death-guard/scripts/navigation-controller.js');
check('Browser Back owns exact page, reading anchor and popup state',pageState.includes("history.scrollRestoration = 'manual'")&&pageState.includes("window.addEventListener('pagehide'")&&pageState.includes("window.addEventListener('pageshow'")&&pageState.includes('readingAnchor()')&&pageState.includes('pageAdapter?.snapshot?.()')&&pageState.includes('pageAdapter?.restore?.(record.ui)'));
check('Browser Back restores reading position before reopening modal UI',pageState.indexOf('await pageAdapter?.beforeRestore?.()')<pageState.indexOf('await pageAdapter?.restore?.(record.ui)')&&pageState.includes("behavior:'instant'")&&pageState.includes('app.popups?.restore?.([]'));
check('Journey navigation is represented in browser history',journey.includes('history.pushState')&&journey.includes("window.addEventListener('popstate'")&&journey.includes('history.back()'));
check('Viewport changes preserve a semantic reading anchor and valid navigation focus',pageState.includes("window.addEventListener('resize'")&&pageState.includes('alignAnchor(anchor)')&&navigation.includes('this.layoutObserver.observe(this.main)')&&navigation.includes("this.menuButton.focus({preventScroll:true})")&&!read('books/death-guard/styles/layout.css').includes('transition: padding-left'));
check('Every published Army Book installs the shared page-state contract',['death-guard','adeptus-mechanicus','tyranids','tau-empire'].every(slug=>read(`books/${slug}/scripts/app.js`).includes('WHPageState?.installArmyBook')));
check('Open popups lock background scrolling',read('books/core-rules/reader/styles.css').includes('html:has(dialog[open])')&&read('books/death-guard/styles/popups.css').includes('body:has(.popup-layer .term-popup)')&&read('books/adeptus-mechanicus/reader.html').includes('../death-guard/styles/popups.css?v=17')&&read('glossary/viewer-progressive.css').includes('body:has(dialog[open])'));
check('book popups stay inside the viewport after glossary return',read('books/death-guard/styles/popups.css').includes('.popup-layer { position: fixed')&&!read('books/death-guard/scripts/popup-controller.js').includes('window.scrollX||0')&&read('books/adeptus-mechanicus/reader.html').includes('../death-guard/scripts/popup-controller.js?v=25'));
check('glossary return restores scroll before reopening popups',[read('books/core-rules/reader/app.js'),read('books/death-guard/mobile/mobile.js'),read('books/death-guard/scripts/app.js'),read('books/adeptus-mechanicus/scripts/app.js')].every(source=>source.includes('window.scrollTo')&&source.match(/requestAnimationFrame\(\(\)=>\{(?:if\(trigger\)|if\(returnRecord\.popupIds|popups\.restore)/)));
check('Core Rules popup does not impersonate a term trigger',read('books/core-rules/reader/app.js').includes('dialog.dataset.openTerm')&&!read('books/core-rules/reader/app.js').includes('dialog.dataset.term ='));
check('glossary runtime exposes curated matching labels',read('glossary/generated/glossary.en.js').includes('matchLabels'));
const bookHtml=slug=>read(`books/${slug}/${books[slug].reader||'index.html'}`);
check('shared navigation target resolver is loaded and precached',['death-guard','adeptus-mechanicus'].every(slug=>bookHtml(slug).includes('src="../shared/navigation-targets.js?v=1"'))&&sw.includes('"./books/shared/navigation-targets.js?v=1"'));
check('shared datasheet design is loaded and precached',['death-guard','adeptus-mechanicus'].every(slug=>bookHtml(slug).includes('href="../shared/datasheet-system.css?v=6"'))&&sw.includes('"./books/shared/datasheet-system.css?v=6"'));
check('shared datasheets collapse by available card width',read('books/shared/datasheet-system.css').includes('container-type: inline-size')&&read('books/shared/datasheet-system.css').includes('@container (max-width: 760px)'));
check('shared datasheet layout is loaded and precached',['death-guard','adeptus-mechanicus'].every(slug=>bookHtml(slug).includes('src="../shared/datasheet-layout.js?v=2"'))&&sw.includes('"./books/shared/datasheet-layout.js?v=2"'));
check('shared popup profiles are loaded and precached',['death-guard','adeptus-mechanicus'].every(slug=>bookHtml(slug).includes('src="../shared/popup-content.js?v=3"'))&&sw.includes('"./books/shared/popup-content.js?v=3"'));
check('shared glossary autolinker is loaded and precached',['death-guard','adeptus-mechanicus'].every(slug=>bookHtml(slug).includes('src="../shared/glossary-autolink.js?v=8"'))&&sw.includes('"./books/shared/glossary-autolink.js?v=8"'));
check('Roster Guides use the shared entity contract',bookHtml('death-guard').includes('src="../shared/roster-entities.js?v=1"')&&sw.includes('"./books/shared/roster-entities.js?v=1"')&&read('books/death-guard/scripts/roster-filter.js').includes('WHRosterEntities.loadoutIncludesProfile'));
check('multi-profile roster weapons open one grouped popup',read('books/death-guard/scripts/roster-filter.js').includes('DG_ROSTER_TERMS')&&read('books/death-guard/scripts/roster-filter.js').includes('weaponGroups(canonicalTerms,card.id)')&&read('books/shared/popup-content.js').includes('term.profiles?.length'));
check('book navigation measures after glossary autolinking',['death-guard','adeptus-mechanicus'].every(slug=>{const app=read(`books/${slug}/scripts/app.js`);return app.indexOf('WHGlossaryAutolink?.apply')<app.indexOf('new window.DGNavigation');}));
check('Mechanicus heavy source data and PDF are cached on demand',!sw.includes('adeptus-mechanicus-faction-pack-v1.0.pdf')&&!sw.includes('adeptus-mechanicus-codex-datasheets.en.json'));
check('nested Mechanicus service worker was removed',!exists('books/adeptus-mechanicus/service-worker.js'));
const glossaryRegistry=JSON.parse(read('glossary/registry.en.json')).terms;
for(const id of ['core-characteristic-toughness','core-stratagem-fire-overwatch','death-guard-plague','death-guard-army-rules-pact-of-decay','adeptus-mechanicus-detachment-cohort-acquisitus','adeptus-mechanicus-unit-skitarii-rangers'])check(`Mega Glossary contains ${id}`,Boolean(glossaryRegistry[id]));
for(const [slug,book] of Object.entries(books)){
  const html=read(`books/${slug}/${book.reader||'index.html'}`);
  const app=read(`books/${slug}/${book.app}`);
  check(`${slug} glossary loading matches its runtime`,book.usesPopupGlossary===/\.\.\/\.\.\/glossary\/generated\/glossary\.en\.js\?v=[^"']+/.test(html));
  if(book.usesPopupGlossary)check(`${slug} popup uses the global glossary`,
    app.includes("WH40K_GLOSSARY?.forBook('"+slug+"')")||
    app.includes("WH40K_GLOSSARY.forBook('"+slug+"')")
  );
}
check('navigation responses keep their own cache URL',sw.includes('fetchAndCache(request);')&&!sw.includes('fetchAndCache(request, LIBRARY_FALLBACK)'));
check('Death Guard entry routes phone and full readers',read('books/death-guard/index.html').includes('scripts/view-router.js?v=2')&&read('books/death-guard/scripts/view-router.js').includes('phoneUserAgent')&&read('books/death-guard/scripts/view-router.js').includes('smallTouchScreen'));
check('Mechanicus entry uses the same phone and full reader contract',read('books/adeptus-mechanicus/index.html').includes('../death-guard/scripts/view-router.js?v=2')&&read('books/adeptus-mechanicus/index.html').includes('./reader.html?view=full')&&read('books/adeptus-mechanicus/index.html').includes('./mobile/index.html?view=mobile'));
const viewRouter=read('books/death-guard/scripts/view-router.js');
check('Death Guard view router preserves public query parameters and anchors',viewRouter.includes("params.delete('view')")&&viewRouter.includes('destination.search = params.toString()')&&viewRouter.includes('destination.hash = location.hash'));
const runViewRouter=({href,userAgent='',mobile=false,width=1024,coarse=false})=>{
  const current=new URL(href);let replaced='';
  vm.runInNewContext(viewRouter,{URL,URLSearchParams,location:{href:current.href,search:current.search,hash:current.hash,replace:value=>{replaced=String(value);}},navigator:{userAgent,userAgentData:{mobile}},screen:{width,height:width},matchMedia:query=>({matches:query.includes('pointer')?coarse:width<=600})});
  return new URL(replaced);
};
const iphoneRoute=runViewRouter({href:'https://example.test/books/tyranids/index.html?roster=alpha#unit-hive-tyrant',userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',width:390,coarse:true});
const ipadRoute=runViewRouter({href:'https://example.test/books/tyranids/index.html?roster=alpha#unit-hive-tyrant',userAgent:'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)',width:834,coarse:true});
const androidPhoneRoute=runViewRouter({href:'https://example.test/books/tyranids/index.html?roster=alpha#unit-hive-tyrant',userAgent:'Mozilla/5.0 (Linux; Android 15; Pixel 9 Pro) AppleWebKit/537.36 Chrome/131 Mobile Safari/537.36',width:412,coarse:true});
const androidTabletRoute=runViewRouter({href:'https://example.test/books/tyranids/index.html?roster=alpha#unit-hive-tyrant',userAgent:'Mozilla/5.0 (Linux; Android 15; Pixel Tablet) AppleWebKit/537.36 Chrome/131 Safari/537.36',width:800,coarse:true});
const forcedFullRoute=runViewRouter({href:'https://example.test/books/tyranids/index.html?view=full&roster=alpha#unit-hive-tyrant',userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',width:390,coarse:true});
check('shared entry router sends iPhone to Phone view with query and hash',iphoneRoute.pathname.endsWith('/mobile/index.html')&&iphoneRoute.search==='?roster=alpha'&&iphoneRoute.hash==='#unit-hive-tyrant');
check('shared entry router keeps iPad in full reader',ipadRoute.pathname.endsWith('/reader.html')&&ipadRoute.search==='?roster=alpha'&&ipadRoute.hash==='#unit-hive-tyrant');
check('shared entry router sends Android phones to Phone view with query and hash',androidPhoneRoute.pathname.endsWith('/mobile/index.html')&&androidPhoneRoute.search==='?roster=alpha'&&androidPhoneRoute.hash==='#unit-hive-tyrant');
check('shared entry router keeps Android tablets in full reader',androidTabletRoute.pathname.endsWith('/reader.html')&&androidTabletRoute.search==='?roster=alpha'&&androidTabletRoute.hash==='#unit-hive-tyrant');
check('explicit full view overrides phone detection',forcedFullRoute.pathname.endsWith('/reader.html')&&forcedFullRoute.search==='?roster=alpha'&&forcedFullRoute.hash==='#unit-hive-tyrant');
check('Library exposes only Core Rules Reference',library.includes('href="books/core-rules/reader/index.html"')&&!library.includes('Learn Core Rules')&&!library.includes('href="books/core-rules/index.html"'));
check('Death Guard preserves roster and rule context across views',read('books/death-guard/scripts/app.js').includes("destination.search=params.toString()")&&read('books/death-guard/scripts/app.js').includes("route=id.slice(5)+'.html'")&&read('books/death-guard/mobile/mobile.js').includes('destination.search = params.toString()')&&read('books/death-guard/mobile/index.html').includes('data-view-switch'));
check('Personal Death Guard readers return to Roster Guides',read('books/death-guard/reader.html').includes('data-roster-guides-link hidden')&&read('books/death-guard/scripts/app.js').includes("rosterGuides.hidden=!params.get('roster')")&&read('books/death-guard/mobile/index.html').includes('data-roster-guides-link hidden'));
check('existing public entry routes remain available',[
  'index.html','glossary/index.html','books/death-guard/index.html','books/death-guard/reader.html','books/death-guard/mobile/index.html',
  'books/core-rules/index.html','books/core-rules/reader/index.html','books/adeptus-mechanicus/index.html','books/adeptus-mechanicus/reader.html','books/adeptus-mechanicus/mobile/index.html'
].every(exists));
check('existing public anchors remain available',read('books/death-guard/reader.html').includes('id="unit-mortarion"')&&read('books/core-rules/reader/movement-phase.html').includes('id="rule-09-07"')&&Boolean(glossaryRegistry['core-lethal-hits']));
check('product UI hides internal implementation names',!read('books/core-rules/reader/index.html').match(/Quick Reader|Classic reader|Complete Reader/)&&!read('books/death-guard/index.html').match(/Phone Mode|Full Reader/)&&!read('books/death-guard/mobile/index.html').match(/Phone Mode|Full Reader/)&&!read('books/death-guard/reader.html').match(/clean room|unified visual/i));
check('Death Guard Phone Mode contains every canonical route',exists('books/death-guard/mobile/index.html')&&fs.readdirSync(path.join(root,'books','death-guard','mobile')).filter(name=>name.endsWith('.html')).length===53);
check('Mechanicus Phone Mode contains every canonical route',exists('books/adeptus-mechanicus/mobile/index.html')&&fs.readdirSync(path.join(root,'books','adeptus-mechanicus','mobile')).filter(name=>name.endsWith('.html')).length===51);
check('Mechanicus preserves roster and rule context across views',read('books/adeptus-mechanicus/scripts/app.js').includes('destination.search=params.toString()')&&read('books/adeptus-mechanicus/mobile/mobile.js').includes('destination.search=params.toString()')&&read('books/adeptus-mechanicus/mobile/index.html').includes('data-view-switch'));
check('Mechanicus Related Rules use the generated lookup matrix in both views',read('books/adeptus-mechanicus/scripts/app.js').includes('generated/compatible-rules.json')&&read('books/adeptus-mechanicus/mobile/mobile.js').includes('generated/compatible-rules.json')&&!read('books/adeptus-mechanicus/scripts/app.js').includes('AMRelatedRules')&&!read('books/adeptus-mechanicus/mobile/mobile.js').includes('AMRelatedRules'));
check('Mechanicus Related Rules include eligible Core Stratagems',read('books/adeptus-mechanicus/mobile/related-rules.inc').includes('data-detachment="core"')&&read('books/adeptus-mechanicus/mobile/related-rules.inc').includes('core-stratagem-command-re-roll'));
check('Death Guard Phone Mode embeds only page-local glossary summaries',read('books/death-guard/mobile/mortarion.html').includes('data-term-summary=')&&!read('books/death-guard/mobile/mortarion.html').includes('glossary.en.js')&&read('books/death-guard/mobile/mortarion.html').includes('mobile.js?v='));
check('Death Guard datasheets load one shared related rule panel on demand',read('books/death-guard/mobile/mobile.js').includes("fetch('./related-rules.inc?v=3')")&&exists('books/death-guard/mobile/related-rules.inc'));
check('Death Guard Phone Mode never offers Enhancements to Epic Heroes',!read('books/death-guard/mobile/mortarion.html').includes('data-related-tab="enhancements"')&&!read('books/death-guard/mobile/typhus.html').includes('data-related-tab="enhancements"'));
check('Death Guard related rules render inline instead of opening a modal',read('books/death-guard/mobile/mortarion.html').includes('<section class="related-rules"')&&!read('books/death-guard/mobile/mortarion.html').includes('id="relatedRulesDialog"'));
check('Death Guard Full Reader opens related rules in one fixed modal',read('books/death-guard/scripts/app.js').includes("className='related-rules-layer'")&&read('books/death-guard/styles/content.css').includes('.related-rules-layer{position:fixed'));
check('Legacy shared eligibility matcher remains available only to books that still use it',!read('books/adeptus-mechanicus/reader.html').includes('shared/related-rules-matcher.js')&&read('books/tyranids/reader.html').includes('shared/related-rules-matcher.js?v=6')&&read('books/tau-empire/reader.html').includes('shared/related-rules-matcher.js?v=6'));
check('Compatible Rules safety flag stays central for books still on the legacy matcher',read('books/shared/related-rules-matcher.js').includes('enabled:false')&&read('books/shared/army-related-rules.js').includes('WHRelatedRules?.enabled!==true')&&read('books/death-guard/scripts/compatible-stratagems-runtime.mjs').includes('compatibleStratagemsReviewEnabled=true')&&read('books/adeptus-mechanicus/scripts/compatible-rules-runtime.mjs').includes('compatibleRulesEnabled=true'));
check('filtered related rules cannot be redisplayed by card CSS',read('books/death-guard/styles/content.css').includes('.related-rules-layer [hidden],#relatedRulesContent [hidden]{display:none!important}'));
check('Death Guard keeps roster-only Detachment keyword grants local',read('books/death-guard/scripts/roster-filter.js').includes('const grantedKeywords =')&&read('books/death-guard/scripts/roster-filter.js').includes('const grants=grantedKeywords(')&&!exists('books/death-guard/scripts/related-rules.js'));
check('Legacy saved rosters recover nested New Recruit loadouts',read('books/death-guard/scripts/roster-filter.js').includes('restoreLegacyLoadouts();')&&read('books/death-guard/scripts/roster-filter.js').includes('model.loadouts.push'));

for(const result of results)console.log(`${result.ok?'PASS':'FAIL'}  ${result.name}${result.detail?' — '+result.detail:''}`);
const failed=results.filter(result=>!result.ok);
console.log(`\n${results.length-failed.length}/${results.length} integration checks passed.`);
if(failed.length)process.exitCode=1;
