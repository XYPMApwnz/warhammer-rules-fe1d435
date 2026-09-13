const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'content','tau-empire-codex-wargear.en.json');
const datasheetLayer=require(path.join(root,'content','tau-empire-codex-datasheets.en.json'));
const units=[...datasheetLayer.datasheets,...datasheetLayer.imperialArmour,...datasheetLayer.legends];
const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/t-au-empire/';
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').trim();
const key=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();

async function main(){
  const contract=await import('../../shared/tools/source-ingestion-contract.mjs');
  const mode=contract.requireSourceToolMode(process.argv.slice(2),{toolName:'extract-wargear.cjs'});
  if(mode.kind==='verify'){
    const verified=contract.verifyFrozenSource('tau-codex-wargear');
    console.log(`Codex Wargear frozen source verified: ${verified.artifacts.length} artifact, ${verified.status}`);
    return;
  }
  const session=contract.createCaptureSession({sourceId:'tau-codex-wargear',authority:'secondary',sourceType:'wahapedia-html',candidateDir:mode.candidateDir,extractorPath:'books/tau-empire/tools/extract-wargear.cjs',notes:'Candidate only; acceptance requires semantic review.'});
  const {chromium}=require('playwright');
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const indexPage=await browser.newPage();
  await indexPage.goto(sourceUrl,{waitUntil:'domcontentloaded',timeout:90_000});
  await session.capturePage(indexPage,sourceUrl,'tau-empire-index');
  const links=await indexPage.locator('a').evaluateAll(nodes=>Object.fromEntries(nodes
    .filter(node=>node.href.includes('/wh40k11ed/factions/t-au-empire/'))
    .map(node=>[node.textContent.trim().toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim(),node.href])));
  await indexPage.close();

  const extracted=[];let cursor=0;
  async function worker(){
    const page=await browser.newPage();
    while(cursor<units.length){
      const unit=units[cursor++],url=links[key(unit.title)];
      if(!url)throw new Error(`Current 11E page not found for ${unit.title}`);
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:90_000});
      await session.capturePage(page,url,unit.id||unit.title);
      const record=await page.evaluate(()=>{
        const header=label=>[...document.querySelectorAll('.dsHeader')].find(node=>node.textContent.trim()===label);
        const wargearHeader=header('WARGEAR OPTIONS');
        const list=wargearHeader?.nextElementSibling?.tagName==='UL'?wargearHeader.nextElementSibling:null;
        const wargear=list?[...list.children].map(item=>item.innerText.trim()).filter(Boolean):[];
        for(let sibling=list?.nextElementSibling;sibling;sibling=sibling.nextElementSibling){
          if(sibling.classList?.contains('dsOptionsComment'))wargear.push(sibling.innerText.trim());
        }
        const compositionHeader=header('UNIT COMPOSITION');
        return{wargear,composition:compositionHeader?.nextElementSibling?.innerText.trim()||''};
      });
      extracted.push({title:unit.title,url,wargear:record.wargear.map(clean),composition:clean(record.composition)});
    }
    await page.close();
  }
  await Promise.all(Array.from({length:6},worker));
  await browser.close();

  extracted.sort((a,b)=>a.title.localeCompare(b.title));
  const checkedAt=new Date().toISOString().slice(0,10);
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition · T’au Empire',url:sourceUrl,checkedAt},units:extracted},null,2)}\n`;
  session.writeCandidate('content/tau-empire-codex-wargear.en.json',output);
  session.finalize();
  console.log(`Captured exact Wargear candidate for ${extracted.length} T’au Empire datasheets`);
}

main().catch(error=>{console.error(error);process.exit(1)});
