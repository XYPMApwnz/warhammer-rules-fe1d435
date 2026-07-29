const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'content','adeptus-mechanicus-codex-wargear.en.json');
const codex=require(path.join(root,'content','adeptus-mechanicus-codex-datasheets.en.json')).datasheets;
const packIds=new Set(require(path.join(root,'content','adeptus-mechanicus-rules.en.json')).datasheets.map(unit=>unit.id));
const units=codex.filter(unit=>unit.status==='Codex transcription'&&!packIds.has(unit.id));
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').trim();

async function main(){
  const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
  const indexPage=await browser.newPage();
  await indexPage.goto('https://wahapedia.ru/wh40k11ed/factions/adeptus-mechanicus/',{waitUntil:'domcontentloaded',timeout:60000});
  const links=await indexPage.locator('a[href*="/factions/adeptus-mechanicus/"]').evaluateAll(nodes=>Object.fromEntries(nodes.map(node=>[node.textContent.trim().toLowerCase(),node.href])));
  await indexPage.close();
  const extracted=[];
  let cursor=0;
  async function worker(){
    const page=await browser.newPage();
    while(cursor<units.length){
      const unit=units[cursor++],url=links[unit.title.toLowerCase()];
      if(!url)throw new Error(`Current 11E page not found for ${unit.title}`);
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
      const record=await page.evaluate(()=>{
        const header=label=>[...document.querySelectorAll('.dsHeader')].find(node=>node.textContent.trim()===label);
        const wargearHeader=header('WARGEAR OPTIONS');
        const wargear=warGearRows(wargearHeader);
        const compositionHeader=header('UNIT COMPOSITION');
        const composition=compositionHeader?.nextElementSibling?.innerText.trim()||'';
        return {wargear,composition};

        function warGearRows(node){
          if(!node)return[];
          const list=node.nextElementSibling?.tagName==='UL'?node.nextElementSibling:null;
          const rows=list?[...list.children].map(item=>item.innerText.trim()).filter(Boolean):[];
          let sibling=list?.nextElementSibling;
          while(sibling){
            if(sibling.classList?.contains('dsOptionsComment'))rows.push(sibling.innerText.trim());
            sibling=sibling.nextElementSibling;
          }
          return rows;
        }
      });
      extracted.push({title:unit.title,url,wargear:record.wargear.map(clean),composition:clean(record.composition)});
    }
    await page.close();
  }
  await Promise.all(Array.from({length:6},worker));
  await browser.close();
  extracted.sort((a,b)=>a.title.localeCompare(b.title));
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition \u00b7 Adeptus Mechanicus',url:'https://wahapedia.ru/wh40k11ed/factions/adeptus-mechanicus/',checkedAt:new Date().toISOString().slice(0,10)},units:extracted},null,2)}\n`;
  if(process.argv.includes('--check')){
    if(!fs.existsSync(outputPath)||fs.readFileSync(outputPath,'utf8')!==output)throw new Error('Codex wargear snapshot is stale; run extract-wargear.cjs');
    console.log(`Codex wargear current: ${extracted.length}`);
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    console.log(`Extracted exact wargear for ${extracted.length} Codex datasheets`);
  }
}

main().catch(error=>{console.error(error);process.exit(1)});
