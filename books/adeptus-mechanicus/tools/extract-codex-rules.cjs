const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const sourcePath=path.join(root,'content','adeptus-mechanicus-codex-detachments.en.json');
const outputPath=path.join(root,'content','adeptus-mechanicus-codex-parity.en.json');
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
const anchors={
  'Cohort Cybernetica':'Cyber-Psalm-Programming',
  'Data-psalm Conclave':'Benedictions-Of-The-Omnissiah',
  'Explorator Maniple':'Acquisition-At-Any-Cost',
  'Rad-zone Corps':'Rad-bombardment',
  'Skitarii Hunter Cohort':'Stealth-Optimisation'
};

async function main(){
  const contract=await import('../../shared/tools/source-ingestion-contract.mjs');
  const {mode,session}=contract.beginLegacyCaptureTool({argv:process.argv.slice(2),toolName:'extract-codex-rules.cjs',sourceId:'adeptus-mechanicus-codex-rules',authority:'secondary',sourceType:'wahapedia-html',extractorPath:'books/adeptus-mechanicus/tools/extract-codex-rules.cjs',localInputs:[{path:'books/adeptus-mechanicus/content/adeptus-mechanicus-codex-detachments.en.json',kind:'canonical-source-input',owner:'Adeptus Mechanicus codex Detachments'}]});
  if(mode.kind==='verify')throw new Error('extract-codex-rules.cjs: no retained raw capture is registered for offline --check');
  const source=JSON.parse(fs.readFileSync(sourcePath,'utf8'));
  const {chromium}=require('playwright');
  const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
  const page=await browser.newPage();
  await page.goto(source.source.referenceUrl,{waitUntil:'domcontentloaded',timeout:60000});
  await session.capturePage(page,source.source.referenceUrl,'adeptus-mechanicus-codex-rules');
  const remote=await page.evaluate(anchors=>{
    const rules={};
    for(const [detachment,anchor] of Object.entries(anchors)){
      const marker=[...document.querySelectorAll('a[name]')].find(node=>node.name===anchor);
      if(!marker)continue;
      const clone=marker.parentElement.cloneNode(true);
      clone.querySelectorAll('.ShowFluff,h3,a[name],div[style*="height"]').forEach(node=>node.remove());
      rules[detachment]=clone.innerText.trim();
    }
    const enhancements=[...document.querySelectorAll('ul.EnhancementsPts')].map(list=>{
      const box=list.closest('.BreakInsideAvoid'),heading=list.querySelector('li>span')?.cloneNode(true);
      heading?.querySelectorAll('.EnhUpgrade').forEach(node=>node.remove());
      return {title:heading?.textContent.trim()||'',text:[...box.querySelectorAll('p:not(.ShowFluff)')].map(node=>node.innerText.trim()).filter(Boolean).join('\n\n')};
    }).filter(item=>item.title&&item.text);
    return {rules,enhancements};
  },anchors);
  await browser.close();
  const enhancementsByTitle=new Map(remote.enhancements.map(item=>[item.title.toLowerCase(),item]));
  const detachments=source.detachments.map(detachment=>({
    title:detachment.title,
    rule:{title:detachment.rule.title,text:clean(remote.rules[detachment.title])},
    enhancements:detachment.enhancements.map(item=>{
      const remoteItem=enhancementsByTitle.get(item.title.toLowerCase());
      if(!remoteItem)throw new Error(`Current 11E Enhancement not found: ${item.title}`);
      return {title:item.title,text:clean(remoteItem.text)};
    })
  }));
  if(detachments.some(item=>!item.rule.text))throw new Error('One or more current 11E Detachment rules were not found');
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition \u00b7 Adeptus Mechanicus',url:source.source.referenceUrl,checkedAt:new Date().toISOString().slice(0,10)},detachments},null,2)}\n`;
  session.writeCandidate(path.relative(path.resolve(root,'../..'),outputPath),output);
  session.finalize();
  console.log(`Captured exact rules candidate for ${detachments.length} Codex detachments`);
}

main().catch(error=>{console.error(error);process.exit(1)});
