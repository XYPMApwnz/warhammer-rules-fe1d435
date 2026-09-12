import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';

const file=fileURLToPath(import.meta.url),root=path.resolve(path.dirname(file),'../..');
export async function profileBrowserChecks(localProfile){
  const registry=JSON.parse(fs.readFileSync(path.join(root,'glossary/registry.en.json'),'utf8')).terms;
  const ids=['heavy-bolt-pistol','hand-flamer','heavy-bolt-rifle','storm-bolter','hand-of-dominion-2','heavy-bolter','thunder-hammer','twin-lightning-claws','meltagun','instigator-bolt-carbine','castellan-launcher','plasma-pistol-standard','plasma-pistol-supercharge'].map(id=>'space-marines-weapon-'+id);
  ids.push('death-guard-weapon-balesword-plague-surgeon','space-marines-army-rule-oath-of-moment');
  const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'};
  const server=createServer((req,res)=>{try{
    if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}
    const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    assert.ok(target.startsWith(root+path.sep));res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(fs.readFileSync(target));
  }catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;
  const observations=[],failures=[];
  try{
    browser=await launchChromium();
    for(const [view,width] of [['full',1280],['mobile',390]]){
      const context=await browser.newContext({serviceWorkers:'block',viewport:{width,height:844}});
      try{
        const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
        page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
        await page.goto(`http://127.0.0.1:${server.address().port}/books/space-marines/reader.html?view=${view}#unit-assault-intercessor-squad`);
        await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));
        await page.locator('#unit-assault-intercessor-squad [data-term="space-marines-weapon-heavy-bolt-pistol"]').first().click();
        await page.locator('.term-popup[data-popup-term="space-marines-weapon-heavy-bolt-pistol"]').waitFor({state:'visible'});
        for(const id of ids){
          const term=registry[id];assert.ok(term,id);
          await page.evaluate(id=>DG_APP.fullEntry.open(id),id);
          await page.locator('.full-entry-layer').waitFor({state:'visible'});
          const rendered=await page.locator('.full-entry-profile > div').evaluateAll(cells=>Object.fromEntries(cells.map(cell=>[cell.querySelector('small').textContent,cell.querySelector('strong').textContent])));
          const body=await page.locator('[data-full-entry-content]').innerText();
          const definitions=await page.locator('.full-entry-definition').count();
          const expected=term.scope==='space-marines'&&term.kind==='weapon'?term.definition.en.split(' · ').at(-1):term.structured?.weapon?.Abilities;
          observations.push({view,id,definition:term.definition.en,rendered,body,definitions});
          try{
            assert.equal(await page.locator('#fullEntryTitle').innerText(),term.title.en);
            if(term.kind==='weapon'){
              assert.equal(rendered.Abilities,expected,`${id}: WEAPON_ABILITIES_VISIBLE`);
              const {Abilities:ignored,...stats}=rendered,{Abilities:existing,...expectedStats}=term.structured.weapon;
              assert.deepEqual(stats,expectedStats,`${id}: stats preserved`);
              assert.equal(definitions,0,'NO_DUPLICATE_PROFILE_DEFINITION');
              assert.equal(await page.locator('.full-entry-summary').count(),0,'NO_DUPLICATE_PROFILE_SUMMARY');
              const labels=await page.locator('.full-entry-profile small').allTextContents();
              assert.equal(labels.filter(label=>label==='Abilities').length,1,'one ability field per profile');
            }else assert.equal(await page.locator('.full-entry-definition').innerText(),term.definition.en,'non-profile complete definition unchanged');
          }catch(error){failures.push(`${view}: ${error.message}`);}
        }
        assert.deepEqual(errors,[],`${view}: no application exceptions`);
        if(localProfile){
          await page.goto(`http://127.0.0.1:${server.address().port}/books/dark-angels/reader.html?view=${view}#unit-asmodai`);
          await page.waitForFunction(()=>Boolean(window.DGFullEntry));
          // Exercise a local source-backed record at the real API boundary,
          // independently of the separate DA global-publication contract.
          const localResult=await page.evaluate(term=>{
            const controller=new DGFullEntry({get:id=>id===term.id?term:null});controller.open(term.id);
            return{globallyPublished:Boolean(WH40K_GLOSSARY.get(term.id)),opened:!controller.layer.hidden,profile:Object.fromEntries([...controller.content.querySelectorAll('.full-entry-profile > div')].map(cell=>[cell.querySelector('small').textContent,cell.querySelector('strong').textContent])),definitions:controller.content.querySelectorAll('.full-entry-definition').length};
          },localProfile);
          assert.equal(localResult.opened,true,'DA local production-equivalent full-entry');
          assert.deepEqual(localResult.profile,localProfile.structured.weapon,'DA parsed profile rendered by production controller');
          assert.equal(localResult.profile.Abilities,'Pistol');assert.equal(localResult.definitions,0);
          assert.deepEqual(errors,[],`${view}: DA local control has no exceptions`);
          observations.push({view,id:localProfile.id,localProductionEquivalent:true,...localResult});
        }
      }finally{await context.close();}
    }
  }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
  if(process.env.PROFILE_QA_EVIDENCE)fs.writeFileSync(process.env.PROFILE_QA_EVIDENCE,JSON.stringify({observations,failures},null,2)+'\n');
  assert.deepEqual(failures,[],'real profile controller acceptance');
  console.log('Glossary profile browser PASS: Desktop + Phone, abilities, stats, modes, existing DG profile and non-profile rule; no duplicate body'+(localProfile?'; DA local production-equivalent control':''));
}
if(process.argv[1]&&path.resolve(process.argv[1])===file)await profileBrowserChecks();
