import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const semantics=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
assert.match(semantics,/DG_RULE\.silent,bodyguard/,'Silent Bodyguard source must remain the exact Deathshroud instance');
assert.match(semantics,/add\('silent-bodyguard','ability','core-feel-no-pain','grant',\{title:'Feel No Pain 4\+',summary:'This model has Feel No Pain 4\+\.',ruleTitle:'Silent Bodyguard'\},attachmentSource\(DG_RULE\.silent,bodyguard\)\)/,'Silent Bodyguard must emit the structured CORE Feel No Pain grant');

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage();
  await page.setContent(`<!doctype html><body>
    <article class="unit-card" id="loc-1">
      <section class="unit-part" id="lord-of-contagion-abilities"><div class="ability-list">
        <article class="ability" id="lord-of-contagion-ability-core"><h5>CORE</h5><p>Deep Strike, Leader</p></article>
      </div></section>
    </article>
    <article class="unit-card" id="loc-2">
      <section class="unit-part" id="lord-of-contagion-copy-abilities"><div class="ability-list">
        <article class="ability" id="lord-of-contagion-copy-ability-core"><h5>CORE</h5><p>Deep Strike, Leader</p></article>
      </div></section>
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
  console.log('DG Silent Bodyguard CORE ability QA: PASS');
}finally{
  await browser.close();
}
