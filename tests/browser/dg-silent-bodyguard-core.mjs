import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const semantics=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
assert.match(semantics,/DG_RULE\.silent,bodyguard/,'Silent Bodyguard source must remain the exact Deathshroud instance');
assert.match(semantics,/add\('silent-bodyguard','ability','core-feel-no-pain','grant',\{title:'Feel No Pain 4\+',summary:'This model has Feel No Pain 4\+\.',ruleTitle:'Silent Bodyguard'\},attachmentSource\(DG_RULE\.silent,bodyguard\)\)/,'Silent Bodyguard must emit the structured CORE Feel No Pain grant');

const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);
  const relative=pathname.replace(/^\/+/, '')||'index.html';
  const file=path.resolve(root,relative);
  if(file!==root&&!file.startsWith(`${root}${path.sep}`)){
    response.writeHead(403).end();
    return;
  }
  try{
    const stat=fs.statSync(file);
    const target=stat.isDirectory()?path.join(file,'index.html'):file;
    response.writeHead(200,{'content-type':contentTypes[path.extname(target)]||'application/octet-stream'});
    fs.createReadStream(target).pipe(response);
  }catch{
    response.writeHead(404).end();
  }
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage();
  await page.setContent(`<!doctype html><body>
    <article class="unit-card" id="loc-1">
      <div class="ds-main-grid"><div class="ds-support">
        <section class="unit-part" id="lord-of-contagion-abilities"><div class="ability-list">
          <article class="ability" id="lord-of-contagion-ability-core"><h5>CORE</h5><p>Deep Strike, Leader</p></article>
        </div></section>
      </div></div>
    </article>
    <article class="unit-card" id="loc-2">
      <div class="ds-main-grid"><div class="ds-support">
        <section class="unit-part" id="lord-of-contagion-copy-abilities"><div class="ability-list">
          <article class="ability" id="lord-of-contagion-copy-ability-core"><h5>CORE</h5><p>Deep Strike, Leader</p></article>
        </div></section>
      </div></div>
    </article>
  </body>`);
  await page.addScriptTag({path:path.join(root,'books/shared/roster-game-presentation.js')});
  const result=await page.evaluate(()=>{
    const source={identity:{instanceId:'deathshroud-1',canonicalUnitId:'unit-deathshroud-terminators',canonicalTitle:'Deathshroud Terminators'}};
    const unrelated={identity:{instanceId:'deathshroud-2',canonicalUnitId:'unit-deathshroud-terminators',canonicalTitle:'Deathshroud Terminators'}};
    const effect={
      id:'loc-1:silent-bodyguard',component:'ability',targetId:'core-feel-no-pain',targetInstanceId:'loc-1',operation:'grant',
      title:'Feel No Pain 4+',summary:'This model has Feel No Pain 4+.',ruleTitle:'Silent Bodyguard',state:'active',certainty:'current',
      source:{kind:'explicit-attachment',id:'ability-silent-bodyguard-03a0a1b',ownerInstanceId:'deathshroud-1'},
      provenance:{rosterFact:'explicit-attachment'},base:false,effective:true
    };
    const projection={game:{units:[source,unrelated,{identity:{instanceId:'loc-1',canonicalUnitId:'unit-lord-of-contagion',canonicalTitle:'Lord of Contagion'}},{identity:{instanceId:'loc-2',canonicalUnitId:'unit-lord-of-contagion',canonicalTitle:'Lord of Contagion'}}]}};
    const baseUnit=instanceId=>({
      identity:{instanceId,canonicalUnitId:'unit-lord-of-contagion',canonicalTitle:'Lord of Contagion'},
      selection:{modelCount:1,points:145,loadout:{weaponResolution:{state:'unresolved'},wargearAbilityResolution:{state:'unresolved'},selectedProfileIds:[],selectedWargear:[]}},
      attachments:{leaders:[],leading:[]},
      rosterState:{attachments:{leaders:[],leading:[]},keywordProfile:{intrinsic:[],added:[],removed:[],effective:[]}},
      effective:{stats:{},weaponProfiles:[],abilities:[],keywords:[]},effects:[]
    });
    const attached=baseUnit('loc-1');attached.effects=[effect];attached.effective.abilities=[{id:'core-feel-no-pain',title:'Feel No Pain 4+',canonical:false,sourceEffectId:effect.id}];
    attached.attachments.leading=[{instanceId:'deathshroud-1',canonicalUnitId:'unit-deathshroud-terminators',title:'Deathshroud Terminators',certainty:'current',provenance:'explicit-roster-attachment'}];
    attached.rosterState.attachments.leading=[{instanceId:'deathshroud-1',canonicalUnitId:'unit-deathshroud-terminators',title:'Deathshroud Terminators',certainty:'current',provenance:'explicit-roster-attachment'}];
    const detached=baseUnit('loc-2');
    const presenter=window.WHArmyRosterGamePresentation;
    presenter.present(document.querySelector('#loc-1'),attached,projection);
    presenter.present(document.querySelector('#loc-1'),attached,projection);
    presenter.present(document.querySelector('#loc-2'),detached,projection);
    const attachedCard=document.querySelector('#loc-1'),detachedCard=document.querySelector('#loc-2');
    return {
      effect,
      attachedCore:attachedCard.querySelector('[id$="-ability-core"] p')?.textContent||'',
      detachedCore:detachedCard.querySelector('[id$="-ability-core"] p')?.textContent||'',
      grantCount:attachedCard.querySelectorAll('[data-roster-effect-id="loc-1:silent-bodyguard"]').length,
      derivedCount:attachedCard.querySelectorAll('.roster-game-derived-ability').length,
      effectsText:attachedCard.querySelector('.roster-game-effects')?.textContent||'',
      detachedEffects:detachedCard.querySelectorAll('.roster-game-effects').length
    };
  });
  assert.equal(result.effect.source.ownerInstanceId,'deathshroud-1');
  assert.equal(result.effect.targetInstanceId,'loc-1');
  assert.equal(result.effect.certainty,'current');
  assert.equal(result.effect.provenance.rosterFact,'explicit-attachment');
  assert.match(result.attachedCore,/Deep Strike, Leader, Feel No Pain 4\+/);
  assert.doesNotMatch(result.detachedCore,/Feel No Pain/);
  assert.equal(result.grantCount,1,'Repeated presentation must not duplicate the granted CORE ability');
  assert.equal(result.derivedCount,0,'Structured CORE grants must not create a duplicate derived ability article');
  assert.match(result.effectsText,/Deathshroud Terminators/);
  assert.match(result.effectsText,/Silent Bodyguard/);
  assert.match(result.effectsText,/Feel No Pain 4\+/);
  assert.equal(result.detachedEffects,0,'Potential or absent attachment must not create factual effects');

  const productionContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  const record={
    id:'silent-bodyguard-real-parser',
    sourceText:`Death Guard
3x Deathshroud Terminators (160 pts)
\u2022 1x Deathshroud Terminator Champion: Manreaper, Plaguespurt gauntlet
\u2022 2x Deathshroud Terminator: 2 with Manreaper, Plaguespurt gauntlet
3x Deathshroud Terminators (160 pts)
\u2022 1x Deathshroud Terminator Champion: Manreaper, 2x Plaguespurt gauntlet
\u2022 2x Deathshroud Terminator: 2 with Manreaper, Plaguespurt gauntlet
3x Deathshroud Terminators (160 pts)
\u2022 1x Deathshroud Terminator Champion: Manreaper, Plaguespurt gauntlet, Icon of Despair
\u2022 2x Deathshroud Terminator: 2 with Manreaper, Plaguespurt gauntlet
1x Lord of Contagion (100 pts): Manreaper`,
    attachments:{'parsed-unit-1':['parsed-unit-4']}
  };
  await productionContext.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),record);
  const productionPage=await productionContext.newPage();
  await productionPage.goto(`${origin}/books/death-guard/reader.html?view=mobile&roster=${record.id}&rosterInstance=parsed-unit-4#unit-lord-of-contagion`,{waitUntil:'networkidle'});
  await productionPage.waitForFunction(()=>{
    const projection=window.WH_ARMY_ROSTER_GAME_PROJECTION;
    const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-4"]');
    return projection?.schema==='wh40k-physical-unit-game-projection/v1'&&projection.units.some(unit=>unit.identity.instanceId==='parsed-unit-4')&&card;
  });
  const production=await productionPage.evaluate(()=>{
    const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-4');
    const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-4"]');
    const abilities=card.querySelector('[id$="-abilities"].unit-part');
    const core=[...abilities.querySelectorAll('.ability')].find(article=>article.querySelector('h5')?.textContent.trim()==='CORE');
    const coreText=core?.querySelector('p')?.textContent||'';
    const abilityEffect=gameUnit.effects.find(effect=>effect.component==='ability'&&effect.targetId==='core-feel-no-pain');
    return {
      abilityEffect,
      effectiveAbility:gameUnit.effective.abilities.find(ability=>ability.id==='core-feel-no-pain'),
      coreText,
      coreFnpCount:(coreText.match(/Feel No Pain 4\+/g)||[]).length,
      abilitiesDirectChild:abilities.parentElement===card,
      nestedInSupport:Boolean(abilities.closest('.ds-support')&&abilities.closest('.ds-main-grid')),
      derivedArticles:card.querySelectorAll('.roster-game-derived-ability').length,
      activeEffects:card.querySelector('.roster-game-effects')?.textContent||'',
      rosterCards:document.querySelectorAll('.unit-card[data-roster-game-instance]').length
    };
  });
  assert.equal(production.abilityEffect?.source?.ownerInstanceId,'parsed-unit-1','real parser effect source must be exact attached Deathshroud');
  assert.equal(production.abilityEffect?.targetInstanceId,'parsed-unit-4','real parser effect target must be exact attached Lord');
  assert.equal(production.abilityEffect?.targetId,'core-feel-no-pain','real parser effect must target shared CORE identity');
  assert.equal(production.abilityEffect?.certainty,'current','real parser effect must be current');
  assert.equal(production.effectiveAbility?.title,'Feel No Pain 4+','real parser projection must contain effective CORE grant');
  assert.equal(production.abilitiesDirectChild,false,'fixture must preserve nested generated-reader part structure');
  assert.equal(production.nestedInSupport,true,'fixture must exercise .ds-main-grid > .ds-support production structure');
  assert.match(production.coreText,/Deep Strike/,'production CORE must preserve Deep Strike');
  assert.match(production.coreText,/Leader/,'production CORE must preserve Leader');
  assert.match(production.coreText,/Feel No Pain 4\+/,'production CORE must render granted Feel No Pain');
  assert.equal(production.coreFnpCount,1,'production CORE grant must remain idempotent');
  assert.equal(production.derivedArticles,0,'structured CORE grant must not create a duplicate derived article');
  assert.match(production.activeEffects,/Deathshroud Terminators/,'production active effects must identify the source unit');
  assert.match(production.activeEffects,/Silent Bodyguard/,'production active effects must identify the source rule');
  assert.match(production.activeEffects,/Feel No Pain 4\+/,'production active effects must explain the grant');
  assert.equal(production.rosterCards,1,'production mobile route must mount one exact physical Datasheet');
  await productionContext.close();
  console.log('DG Silent Bodyguard CORE ability QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
