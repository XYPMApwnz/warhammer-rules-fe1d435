const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'content','adeptus-mechanicus-codex-wargear.en.json');
const datasheetsPath=path.join(root,'content','adeptus-mechanicus-codex-datasheets.en.json');
const rulesPath=path.join(root,'content','adeptus-mechanicus-rules.en.json');
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').trim();

async function main(){
  const contract=await import('../../shared/tools/source-ingestion-contract.mjs');
  const {mode,session}=contract.beginLegacyCaptureTool({argv:process.argv.slice(2),toolName:'extract-wargear.cjs',sourceId:'adeptus-mechanicus-codex-wargear',authority:'secondary',sourceType:'wahapedia-html',extractorPath:'books/adeptus-mechanicus/tools/extract-wargear.cjs',localInputs:[
    {path:'books/adeptus-mechanicus/content/adeptus-mechanicus-codex-datasheets.en.json',kind:'canonical-source-input',owner:'Adeptus Mechanicus codex datasheets'},
    {path:'books/adeptus-mechanicus/content/adeptus-mechanicus-rules.en.json',kind:'canonical-source-input',owner:'Adeptus Mechanicus Faction Pack'}
  ]});
  if(mode.kind==='verify')throw new Error('extract-wargear.cjs: no retained raw capture is registered for offline --check');
  const codex=JSON.parse(fs.readFileSync(datasheetsPath,'utf8')).datasheets;
  const packIds=new Set(JSON.parse(fs.readFileSync(rulesPath,'utf8')).datasheets.map(unit=>unit.id));
  const units=codex.filter(unit=>unit.status==='Codex transcription'&&!packIds.has(unit.id));
  const {chromium}=require('playwright');
  const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
  const indexPage=await browser.newPage();
  const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/adeptus-mechanicus/';
  await indexPage.goto(sourceUrl,{waitUntil:'domcontentloaded',timeout:60000});
  await session.capturePage(indexPage,sourceUrl,'adeptus-mechanicus-index');
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
      await session.capturePage(page,url,unit.id);
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
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition \u00b7 Adeptus Mechanicus',url:sourceUrl,checkedAt:new Date().toISOString().slice(0,10)},units:extracted},null,2)}\n`;
  session.writeCandidate(path.relative(path.resolve(root,'../..'),outputPath),output);
  session.finalize();
  console.log(`Captured exact wargear candidate for ${extracted.length} Codex datasheets`);
}

main().catch(error=>{console.error(error);process.exit(1)});
