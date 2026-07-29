const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const source=require(path.join(root,'content','adeptus-mechanicus-codex-detachments.en.json'));
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
  const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
  const page=await browser.newPage();
  await page.goto(source.source.referenceUrl,{waitUntil:'domcontentloaded',timeout:60000});
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
  if(process.argv.includes('--check')){
    if(!fs.existsSync(outputPath)||fs.readFileSync(outputPath,'utf8')!==output)throw new Error('Codex rules parity snapshot is stale; run extract-codex-rules.cjs');
    console.log(`Codex rules current: ${detachments.length} detachments, ${detachments.reduce((sum,item)=>sum+item.enhancements.length,0)} Enhancements`);
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    console.log(`Extracted exact rules for ${detachments.length} Codex detachments`);
  }
}

main().catch(error=>{console.error(error);process.exit(1)});
