import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ruleId='stratagem-stinking-mire',termId='stinking-mire',canonicalId='death-guard-stratagem-stinking-mire';
// Frozen DG Faction Pack v1.2, effective 2026-08-26, p.7, TARGET/EFFECT only.
// PDF SHA256: 3b446db7d7dc48fc19ee61b263ec672a88c129b61ca8cd0dfa644414a1fef7c6.
// WHEN is the retained underlying/displayed baseline, not a new PDF amendment.
const expected={
  WHEN:"Start of your opponent's Charge phase.",
  TARGET:'One friendly unengaged DEATH GUARD VEHICLE unit.',
  EFFECT:'Select one visible enemy unit within 12" of your unit. When that enemy unit declares a charge, that enemy unit has -1 to charge rolls.'
};
const full=Object.entries(expected).map(([key,value])=>`${key}: ${value}`).join(' ');
const oldTarget='One DEATH GUARD VEHICLE unit from your army.';
const oldEffect='Until the end of the phase, each time an enemy unit selects your unit as the target of a charge, subtract 2 from the Charge roll (this is not cumulative with any other negative modifiers to that Charge roll).';
const oldFull=`WHEN: ${expected.WHEN} TARGET: ${oldTarget} EFFECT: ${oldEffect}`;
const normalize=value=>String(value??'').replace(/[\u2018\u2019]/g,"'").replace(/[\u2011\u2212]/g,'-').replace(/\s+/g,' ').trim();
const decode=value=>String(value).replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const plain=value=>normalize(decode(String(value).replace(/<[^>]*>/g,' ')));
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const loadWindow=source=>{const sandbox={window:{}};vm.runInNewContext(source,sandbox);return sandbox.window;};
const readCache=new Map();
const read=relative=>{if(!readCache.has(relative))readCache.set(relative,fs.readFileSync(path.join(root,relative),'utf8'));return readCache.get(relative);};
function findRule(book){
  const matches=book.sections.flatMap(section=>[...(section.blocks||[]),...(section.subsections||[]).flatMap(part=>part.blocks||[])]).filter(block=>block.id===ruleId);
  assert.equal(matches.length,1,'exactly one canonical Stinking Mire rule');return matches[0];
}
const article=html=>String(html).match(new RegExp('<article\\b[^>]*\\bid="'+ruleId+'"[^>]*>[\\s\\S]*?</article>'))?.[0]||'';
const field=(html,label)=>plain(String(html).match(new RegExp('<p\\b[^>]*class="field"[^>]*>\\s*<b>'+label+'</b>\\s*<br>([\\s\\S]*?)</p>'))?.[1]||'');
function snapshot(){return {
  book:JSON.parse(read('books/death-guard/content/death-guard-rules.en.json')),
  include:read('books/death-guard/mobile/related-rules.inc'),
  targets:read('books/death-guard/scripts/target-data.js'),
  local:read('books/death-guard/scripts/data.js'),
  registry:JSON.parse(read('glossary/registry.en.json')),
  context:JSON.parse(read('glossary/contexts/death-guard.json')),
  runtime:read('glossary/generated/glossary.en.js')
};}
function audit(data){
  const checks=[];
  const equal=(name,actual,wanted)=>checks.push({name,passed:normalize(actual)===normalize(wanted),actual:normalize(actual),expected:normalize(wanted)});
  const rule=findRule(data.book),term=data.book.glossary.find(item=>item.id===termId);
  const lines=Object.fromEntries(rule.lines.map(line=>{const colon=line.indexOf(':');return [line.slice(0,colon),line.slice(colon+1)];}));
  for(const [key,value] of Object.entries(expected)){
    equal('canonical.lines.'+key,lines[key],value);
    equal('canonical.scalar.'+key,rule[key.toLowerCase()],value);
  }
  equal('canonical.glossary.short',term?.short,full);
  equal('canonical.glossary.full',term?.full,full);
  equal('identity.title',rule.title,'STINKING MIRE - 1CP');
  equal('identity.category',rule.category,'Mortarion\u2019s Hammer \u2013 Strategic Ploy Stratagem');
  equal('identity.glossary-rule',term?.sectionId,ruleId);
  const catalog=loadWindow(data.targets).WH_ARMY_BOOK_TARGETS;
  equal('target.owner',catalog.owners[ruleId],'detachment-mortarions-hammer');
  const owner=catalog.targets[catalog.owners[ruleId]];
  const mounted=article(catalog.html.slice(owner.start,owner.end));
  for(const [surface,html] of [['main',article(catalog.html)],['target',mounted],['related',article(data.include)]]){
    for(const [key,value] of Object.entries(expected))equal(surface+'.'+key,field(html,key),value);
    equal(surface+'.cp',plain(html.match(/<div class="cp">([\s\S]*?)<\/div>/)?.[1]||''),'1CP');
    for(const keyword of ['keyword-death-guard','keyword-vehicle'])equal(surface+'.'+keyword,(html.match(new RegExp('data-term="'+keyword+'"','g'))||[]).length,1);
  }
  const related=article(data.include),summary=related.match(/data-term="stinking-mire"[^>]*data-term-summary="([^"]*)"/)?.[1];
  equal('related.inline-summary',decode(summary||''),full);
  equal('related.desktop-navigation',related.match(/data-full-rule-path="([^"]+)"/)?.[1],'books/death-guard/reader.html#'+ruleId);
  equal('related.mobile-navigation',related.match(/data-mobile-rule-path="([^"]+)"/)?.[1],'books/death-guard/mobile/mortarions-hammer.html#'+ruleId);
  equal('local.summary',loadWindow(data.local).DG_TERMS[termId]?.summary,full);
  equal('context.identity',data.context.terms[termId]?.termId,canonicalId);
  equal('context.navigation',data.context.terms[termId]?.navigation.rule,ruleId);
  equal('registry.summary',data.registry.terms[canonicalId]?.summary.en,full);
  equal('registry.definition',data.registry.terms[canonicalId]?.definition.en,full);
  const glossary=loadWindow(data.runtime).WH40K_GLOSSARY,entry=glossary.forBook('death-guard')[termId];
  equal('glossaryRuntime.summary',entry?.summary,full);
  equal('glossaryRuntime.definition',entry?.definition,full);
  equal('glossaryRuntime.identity',entry?.id,canonicalId);
  equal('glossaryRuntime.canonical-definition',glossary.get(canonicalId)?.definition.en,full);
  return {checks,errors:checks.filter(check=>!check.passed)};
}

async function mutations(base){
  const {createCanonicalBuildContext}=await import('../books/shared/tools/canonical-build-contract.mjs');
  const {buildCanonicalBook}=await import('../books/death-guard/tools/canonical-build-extension.mjs');
  const context=createCanonicalBuildContext({args:[],configPath:path.join(root,'books/death-guard/book.config.json'),repo:root});
  const cache=new Map(),originalRead=context.readJson,originalRepoRead=context.readRepoJson;
  const memo=(key,reader)=>{if(!cache.has(key))cache.set(key,reader());return cache.get(key);};
  const render=async data=>{
    const result=await buildCanonicalBook({...context,
      readJson:relative=>relative===context.config.sources.canonical?data.book:memo('book:'+relative,()=>originalRead(relative)),
      readRepoJson:relative=>memo('repo:'+relative,()=>originalRepoRead(relative))
    });
    // Existing pure DG builder output, retained only in memory. No generated file edits.
    data.targets=result.outputs.get('scripts/target-data.js');
  };
  const before=JSON.stringify(base),results=[];
  const mutationDirectory=fs.mkdtempSync(path.join(process.env.WH_STINKING_MIRE_QA_REPORT_DIR||os.tmpdir(),'stinking-mire-mutants-'));
  const run=async(name,change,requiredFailures)=>{
    const mutant=structuredClone(base);await change(mutant);
    const result=audit(mutant),failures=result.errors.map(error=>error.name);
    assert.ok(result.errors.length,name+' must fail the independent oracle');
    for(const required of requiredFailures)assert.ok(failures.includes(required),name+' must fail '+required);
    const inputPath=path.join(mutationDirectory,name+'.json');
    fs.writeFileSync(inputPath,JSON.stringify(mutant));
    const child=spawnSync(process.execPath,[fileURLToPath(import.meta.url),'--mutation-snapshot='+inputPath],{encoding:'utf8',maxBuffer:1024*1024});
    fs.writeFileSync(path.join(mutationDirectory,name+'.log'),child.stdout+child.stderr);
    assert.equal(child.status,1,name+' must exit 1, not pass or fail to launch');
    const childResult=JSON.parse(child.stderr);
    for(const required of requiredFailures)assert.ok(childResult.errors.some(error=>error.name===required),name+' child must fail '+required);
    results.push({name,killed:true,exitCode:child.status,failureContract:requiredFailures,failures,inputPath});
  };
  await run('old-rendered-lines-correct-scalars',async data=>{
    const rule=findRule(data.book);rule.lines=[rule.lines[0],'TARGET: '+oldTarget,'EFFECT: '+oldEffect];
    assert.equal(normalize(rule.target),expected.TARGET);assert.equal(normalize(rule.effect),expected.EFFECT);
    await render(data);
  },['canonical.lines.TARGET','canonical.lines.EFFECT','target.TARGET','target.EFFECT']);
  await run('stale-authoritative-include',data=>{
    let stale=article(data.include);
    for(const [label,value] of [['TARGET',oldTarget],['EFFECT',oldEffect]])stale=stale.replace(new RegExp('(<b>'+label+'</b>\\s*<br>)[\\s\\S]*?(</p>)'),(_,start,end)=>start+escape(value)+end);
    stale=stale.replace(/(data-term="stinking-mire"[^>]*data-term-summary=")[^"]*(")/,(_,start,end)=>start+escape(oldFull)+end);
    data.include=data.include.replace(article(data.include),stale);
  },['related.TARGET','related.EFFECT','related.inline-summary']);
  await run('unsupported-End-WHEN',async data=>{
    const rule=findRule(data.book);rule.when="End of your opponent's Charge phase.";rule.lines[0]='WHEN: '+rule.when;
    await render(data);
  },['canonical.lines.WHEN','canonical.scalar.WHEN','target.WHEN']);
  await run('stale-glossary-only',data=>{
    const current=data.registry.terms[canonicalId].definition.en;
    data.registry.terms[canonicalId].definition.en=oldFull;
    const needle='"definition":'+JSON.stringify({en:current});
    assert.equal(data.runtime.split(needle).length,2,'exactly one effective glossary definition to mutate');
    data.runtime=data.runtime.replace(needle,'"definition":'+JSON.stringify({en:oldFull}));
  },['registry.definition','glossaryRuntime.definition','glossaryRuntime.canonical-definition']);
  assert.equal(JSON.stringify(base),before,'all mutation inputs restored/discarded; baseline unchanged');
  assert.equal(audit(base).errors.length,0,'positive baseline after all mutations');
  return {killed:results.length,total:4,storage:'isolated TEMP snapshots; no worktree mutation writes',results};
}

async function browserChecks(){
  const {chromium}=await import('playwright');
  const assets=new Map(),mime={'.html':'text/html','.inc':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
  const server=http.createServer((req,res)=>{
    try{
      let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname.endsWith('/'))pathname+='index.html';
      const absolute=path.resolve(root,'.'+pathname);
      if(!absolute.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
      if(!assets.has(absolute))assets.set(absolute,fs.readFileSync(absolute));
      res.writeHead(200,{'Content-Type':mime[path.extname(absolute)]||'application/octet-stream','Cache-Control':'no-store'});res.end(assets.get(absolute));
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  const origin='http://127.0.0.1:'+server.address().port,results=[];let browser;
  const assertCard=(record,label)=>{
    assert.ok(record.visible,label+' is visible');
    for(const [key,value] of Object.entries(expected))assert.equal(normalize(record.fields[key]),value,label+'.'+key);
    assert.equal(record.cp,'1CP',label+'.cp');
  };
  const inspectCard=element=>({visible:!element.hidden&&!!element.getClientRects().length,
    fields:Object.fromEntries([...element.querySelectorAll('p.field')].map(p=>{const label=p.querySelector('b').textContent.trim();const clone=p.cloneNode(true);clone.querySelector('b').remove();return [label,clone.textContent.trim()];})),cp:element.querySelector('.cp').textContent.trim()});
  try{
    browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'msedge'}:{})});
    for(const mode of ['full','mobile']){
      const context=await browser.newContext({viewport:mode==='mobile'?{width:390,height:844}:{width:1365,height:900},serviceWorkers:'block'});
      try{
        const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
        await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
        await page.goto(origin+'/books/death-guard/reader.html?view='+mode+'#'+ruleId,{waitUntil:'networkidle'});
        const card=page.locator('#'+ruleId);await card.waitFor({state:'visible',timeout:15000});
        const rendered=await card.evaluate(inspectCard);assertCard(rendered,mode+'.mounted');
        await card.locator('[data-term="stinking-mire"]').click();
        const popup=page.locator('#popupLayer');
        await page.waitForFunction(()=>document.getElementById('popupLayer').textContent.includes('Select one visible enemy unit'),{},{timeout:10000});
        const popupText=normalize(await popup.innerText());
        for(const value of Object.values(expected))assert.ok(popupText.includes(value),mode+'.popup includes '+value);
        if(mode==='full'){
          await page.keyboard.press('Escape');
          await page.evaluate(async()=>{
            const unit=document.getElementById('unit-plagueburst-crawler');
            if(!unit)throw new Error('Personal content fixture requires canonical Plagueburst Crawler');
            unit.dataset.rosterInstance='stinking-mire-vehicle-1';unit.dataset.canonicalUnitId='unit-plagueburst-crawler';
            const {createStratagemPresentation}=await import('/books/shared/stratagem-presentation.mjs');
            // Isolate content presentation from out-of-scope compatibility/provider semantics.
            // The real popup module receives a known eligible Vehicle row and physical roster identity.
            const personal=window.WHArmyRelatedRules.install({
              source:{load:async()=>{},hasUnit:id=>id==='unit-plagueburst-crawler',rowsForUnit:()=>[{ruleId:'stratagem-stinking-mire',kind:'stratagem',state:'match'}]},
              templateUrl:'/books/death-guard/mobile/related-rules.inc',
              rosterGuide:{detachmentIds:['mortarions-hammer'],units:[{instanceId:'stinking-mire-vehicle-1',datasheetId:'unit-plagueburst-crawler'}],enhancements:[]},
              restrictToRosterDetachments:true,rosterEnhancements:'assigned-only',rosterDetachment:'all',decorateContent:createStratagemPresentation().decorate
            });
            const layer=await personal.open(unit);if(!layer)throw new Error('Personal related popup failed to open');
            layer.dataset.stinkingMireQa='personal';
          });
          const personal=page.locator('[data-stinking-mire-qa="personal"] [data-rule-id="stratagem-stinking-mire"]');
          await personal.waitFor({state:'visible',timeout:10000});const record=await personal.evaluate(inspectCard);assertCard(record,'personal.related');
          const inline=await personal.locator('[data-term="stinking-mire"]').getAttribute('data-term-summary');assert.equal(normalize(inline),full,'personal.inline-popup');
          results.push({surface:'personal-roster-aware-related-popup',...record,inlineSummary:inline,fixture:'known eligible Vehicle; real popup and decorator, isolated compatibility row'});
        }
        assert.deepEqual(errors,[],mode+' browser errors');results.push({surface:mode,rendered,popupText,pageErrors:errors});
      }finally{await context.close();}
    }
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
  return results;
}

const mutationInput=process.argv.find(argument=>argument.startsWith('--mutation-snapshot='));
const data=mutationInput?JSON.parse(fs.readFileSync(mutationInput.slice('--mutation-snapshot='.length),'utf8')):snapshot(),semantic=audit(data);
if(semantic.errors.length){console.error(JSON.stringify({status:'FAIL',...semantic},null,2));process.exitCode=1;}
else{
  const result={status:'PASS',semanticChecks:semantic.checks.length};
  if(process.argv.includes('--mutations'))result.mutations=await mutations(data);
  if(process.argv.includes('--browser'))result.browser=await browserChecks();
  console.log(JSON.stringify(result,null,2));
}
