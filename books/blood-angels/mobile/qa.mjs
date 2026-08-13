import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const book=path.resolve(here,'..');
const root=path.resolve(book,'../..');
const read=file=>readFileSync(file,'utf8');
const json=file=>JSON.parse(read(file));
const clean=value=>String(value||'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const escapeRegExp=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const source=read(path.join(book,'reader.html'));
const config=json(path.join(book,'book.config.json'));
const manifest=json(path.join(book,config.sources.manifest));
const runtime=read(path.join(here,'mobile.js'));
const popupRuntime=read(path.join(here,'phone-popup-controller.js'));
const section=id=>source.match(new RegExp(`<section[^>]*id="${escapeRegExp(id)}"[\\s\\S]*?<\\/section>`))?.[0]||'';
const article=id=>source.match(new RegExp(`<article[^>]*id="${escapeRegExp(id)}"[\\s\\S]*?<\\/article>`))?.[0]||'';

const detachments=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"/g)].map(match=>({id:match[1],title:match[1].slice(11)}));
const categoryMatches=[...source.matchAll(/<section[^>]*id="(datasheets-[^"]+)"[^>]*>\s*<h3[^>]*>([\s\S]*?)<\/h3>/g)];
const categories=categoryMatches.map((match,index)=>{
  const body=source.slice(match.index,categoryMatches[index+1]?.index??source.length);
  return {
    id:match[1],
    title:clean(match[2]),
    units:[...body.matchAll(/<article[^>]*id="(unit-[^"]+)"[^>]*>/g)].map(unit=>unit[1])
  };
});
const unitIds=[...source.matchAll(/<article class="unit-card\b[^>]*\bid="(unit-[^"]+)"/g)].map(match=>match[1]);
const localSource=json(path.join(book,config.sources.codexDatasheets));
const localSourceIds=new Set(localSource.datasheets.map(unit=>unit.id));
const localIds=unitIds.filter(id=>localSourceIds.has(id));
const sharedIds=unitIds.filter(id=>!localSourceIds.has(id));
const expectedRouteIds=['start','army-rules',...detachments.map(item=>item.id),...unitIds,'updates'];
const expectedFiles=new Set(['index.html','army-rules.html','updates.html',...detachments.map(item=>`${item.id.slice(11)}.html`),...unitIds.map(id=>`${id.slice(5)}.html`)]);

assert.equal(config.generatedMobile,true,'Blood Angels must opt into generated Phone output');
assert.equal(manifest.gates?.publishAsComplete,false,'Blood Angels source authority gate must remain open');
assert.equal(config.dependencyDatasheets?.groupByBook,false,'shared Space Marines datasheets must remain in unified categories');
assert.equal(detachments.length,24,'expected 24 Detachments');
assert.equal(localIds.length,15,'expected 15 Blood Angels-local datasheets');
assert.equal(sharedIds.length,82,'expected 82 shared Space Marines datasheets');
assert.equal(unitIds.length,97,'expected 97 current datasheets');
assert.equal(new Set(unitIds).size,97,'datasheet route ids must be unique');
assert.equal(new Set(expectedRouteIds).size,124,'semantic route ids must be collision-free');
assert.equal(expectedFiles.size,124,'expected exactly 124 generated Phone routes');
assert.ok(categories.length>0,'unified battlefield categories are required');
assert.equal(categories.reduce((sum,category)=>sum+category.units.length,0),97,'category totals must equal current inventory');

const dependency=config.dependencyDatasheets||{};
const dependencyBook=dependency.book||dependency.books?.[0]||'space-marines';
const dependencyConfig=json(path.join(root,'books',dependencyBook,'book.config.json'));
const dependencyData=json(path.join(root,dependencyBook.startsWith('books/')?dependencyBook:`books/${dependencyBook}`,dependencyConfig.sources.codexDatasheets));
const excludedKeywords=new Set((dependency.excludeAnyKeywords||[]).map(value=>String(value).toUpperCase()));
const foreign=(dependencyData.datasheets||[]).filter(unit=>(unit.keywords||[]).some(keyword=>excludedKeywords.has(String(keyword).toUpperCase())));
for(const unit of foreign){
  assert.ok(!unitIds.includes(unit.id),`foreign-Chapter datasheet leaked into current surface: ${unit.name||unit.id}`);
}
const localData=json(path.join(book,config.sources.codexDatasheets));
for(const unit of [...(localData.legends||[]),...(dependencyData.legends||[])]){
  assert.ok(!unitIds.includes(unit.id),`Legends datasheet leaked into current surface: ${unit.name||unit.id}`);
}

const htmlFiles=readdirSync(here).filter(file=>file.endsWith('.html'));
const missing=[...expectedFiles].filter(file=>!existsSync(path.join(here,file)));
const orphan=htmlFiles.filter(file=>!expectedFiles.has(file));
assert.deepEqual(missing,[],'missing generated Phone routes');
assert.deepEqual(orphan,[],'stale/orphan generated Phone routes');

for(const [index,routeId] of expectedRouteIds.entries()){
  const file=index===0?'index.html':index===1?'army-rules.html':routeId==='updates'?'updates.html':routeId.startsWith('detachment-')?`${routeId.slice(11)}.html`:`${routeId.slice(5)}.html`;
  const html=read(path.join(here,file));
  assert.match(html,/data-book-id="blood-angels"/,'Phone route must preserve Blood Angels reading context');
  assert.match(html,new RegExp(`aria-current="page"[^>]*href="(?:\\.\\/)?${escapeRegExp(file)}"|href="(?:\\.\\/)?${escapeRegExp(file)}"[^>]*aria-current="page"`),'current route must expose aria-current');
  assert.match(html,new RegExp(`href="\.\.\/reader\.html#${escapeRegExp(routeId)}"[^>]*data-view-switch`),'Phone to Desktop must preserve semantic target');
  assert.doesNotMatch(html,/reader\.html\?view=mobile/,'legacy single-reader Phone URL must not be generated');
  assert.match(html,/mobile\.js\?v=2/,'Phone runtime must be loaded');
  assert.match(html,/phone-popup-controller\.js\?v=1/,'Phone popup runtime must be loaded');
  assert.match(html,/data-roster-guides-link/,'roster query handoff must be available');
  assert.match(html,/id="termPopupStack"/,'glossary popup stack must be rendered');
  assert.match(html,/Mega Glossary/,'Mega Glossary route must be available');
  if(routeId.startsWith('unit-')){
    assert.match(html,/id="relatedRules"/,'datasheet route must expose Compatible Rules');
    assert.match(html,/id="relatedDetachment"/,'Compatible Rules must preserve Detachment selection');
    assert.match(html,/id="relatedRulesContent"/,'Compatible Rules content target must exist');
  }
}

const start=read(path.join(here,'index.html'));
for(const category of categories){
  assert.match(start,new RegExp(`<summary>${escapeRegExp(category.title)} <span>${category.units.length}<\\/span>`),'Phone navigation must group datasheets directly by unified category');
}
assert.doesNotMatch(start,/<summary>Blood Angels <span>15<\/span>|<summary>Space Marines <span>82<\/span>/,'Phone navigation must not add ownership branches');
assert.match(runtime,/new URLSearchParams\(location\.search\)/,'Phone runtime must consume roster query state');
assert.match(runtime,/data-roster-guides-link/,'Phone runtime must preserve roster-guide navigation');
assert.match(runtime,/faction\(roster\?\.faction\)!=='blood angels'/,'Phone roster mode must accept prefixed Blood Angels rosters');
assert.match(runtime,/link\.remove\(\)/,'Phone roster mode must remove non-roster navigation routes');
assert.doesNotMatch(runtime,/chaos space marines/i,'Phone roster runtime must not retain a Chaos Space Marines faction guard');
assert.match(runtime,/relatedDetachment/,'Phone runtime must support deterministic Compatible Rules');
assert.match(runtime,/BAPhonePopups/,'Phone runtime must use the book-local popup controller');
assert.match(popupRuntime,/BAPhonePopups/,'popup controller must expose the matching book-local API');
assert.match(popupRuntime,/termPopupStack|PhonePopupController/,'popup controller must support glossary popup stacks');
const dreadnought=read(path.join(here,'death-company-dreadnought.html'));
const boltRifles=read(path.join(here,'death-company-marines-with-bolt-rifles.html'));
const priest=read(path.join(here,'sanguinary-priest.html'));
const lost=read(path.join(here,'the-lost-brethren.html'));
assert.match(dreadnought,/surge move of up to D6\+2&quot;/,'official Driven by Fury update must reach Phone');
assert.match(boltRifles,/re-roll Charge rolls[\s\S]*Heroic Intervention stratagem[\s\S]*‑1 CP/,'official Visions of Heresy update must reach Phone');
assert.match(priest,/id="sanguinary-priest-support"[\s\S]*<h4>Support<\/h4>/,'Sanguinary Priest Support relation must reach Phone');
assert.match(lost,/BATTLELINE[\s\S]*DOOMED[\s\S]*cannot include any ADEPTUS ASTARTES units drawn from any other Chapter/,'Lost Brethren rule-bearing metadata must reach Phone');

console.log(`Blood Angels Phone QA passed: ${expectedFiles.size} routes, ${detachments.length} Detachments, ${localIds.length} local and ${sharedIds.length} shared datasheets.`);
