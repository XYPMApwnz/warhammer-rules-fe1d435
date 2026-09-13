const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'content','tyranids-codex-parity.en.json');
const pointsPath=path.join(root,'content','tyranids-points.en.json');
const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/tyranids/';
const detachments=[
  {id:'invasion-fleet',title:'Invasion Fleet',ruleTitle:'Hyper-adaptations',anchor:'Hyper-adaptations'},
  {id:'crusher-stampede',title:'Crusher Stampede',ruleTitle:'Enraged Behemoths',anchor:'Enraged-Behemoths'},
  {id:'unending-swarm',title:'Unending Swarm',ruleTitle:'Insurmountable Odds',anchor:'Insurmountable-Odds'},
  {id:'assimilation-swarm',title:'Assimilation Swarm',ruleTitle:'Feed the Swarm',anchor:'Feed-the-Swarm'},
  {id:'vanguard-onslaught',title:'Vanguard Onslaught',ruleTitle:'Questing Tendrils',anchor:'Questing-Tendrils'},
  {id:'synaptic-nexus',title:'Synaptic Nexus',ruleTitle:'Synaptic Imperatives',anchor:'Synaptic-Imperatives'}
];
const clean=value=>String(value||'')
  .replace(/\u00a0/g,' ')
  .replaceAll('вЂ™','’').replaceAll('вЂњ','“').replaceAll('вЂќ','”').replaceAll('вЂ“','–').replaceAll('вЂ‘','-')
  .replace('closest enemy unit]','closest enemy unit)')
  .replace('excluding MONSTERS models','excluding MONSTER models')
  .replace('that units Leadership','that unit’s Leadership')
  .replace(', and If your unit',', and if your unit')
  .replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
const key=value=>clean(value).toLowerCase().replace(/\(aura\)/g,'').replace(/\bdefense\b/g,'defence').replace(/\bcamoflage\b/g,'camouflage').replace(/[^a-z0-9]+/g,' ').trim();
const slug=value=>key(value).replace(/[^a-z0-9]+/g,'-');
const formatRule=value=>clean(value)
  .replace(/:(Swarming Instincts)/,':\n\n$1\n')
  .replace(/\.(Hyper-aggression|Hive Predators)/g,'.\n\n$1\n')
  .replace(/:(One model in that unit|One destroyed INFANTRY model)/g,':\n\n$1')
  .replace(/\.(One destroyed INFANTRY model)/g,'.\n\n$1')
  .replace(/\.(Synaptic Augmentation|Surging Vitality|Goaded to Slaughter):/g,'.\n\n$1:\n');

function fields(text){
  const value=String(text||'').replace(/\r/g,'');
  const read=(name,next)=>value.match(new RegExp(`${name}:\\s*([\\s\\S]*?)${next?`(?=\\n\\n${next}:|$)`:'$'}`,'i'))?.[1]?.trim()||'';
  return {when:read('WHEN','TARGET'),target:read('TARGET','EFFECT'),effect:read('EFFECT','RESTRICTIONS'),restrictions:read('RESTRICTIONS','')};
}

async function main(){
  const contract=await import('../../shared/tools/source-ingestion-contract.mjs');
  const {mode,session}=contract.beginLegacyCaptureTool({argv:process.argv.slice(2),toolName:'extract-codex-parity.cjs',sourceId:'tyranids-codex-parity-live',authority:'secondary',sourceType:'wahapedia-html',extractorPath:'books/tyranids/tools/extract-codex-parity.cjs',localInputs:[{path:'books/tyranids/content/tyranids-points.en.json',kind:'canonical-source-input',owner:'Tyranids points'}]});
  if(mode.kind==='verify')throw new Error('extract-codex-parity.cjs: no retained raw capture is registered for offline --check');
  const points=JSON.parse(fs.readFileSync(pointsPath,'utf8'));
  const {chromium}=require('playwright');
  const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true});
  const page=await browser.newPage();
  await page.goto(sourceUrl,{waitUntil:'domcontentloaded',timeout:60000});
  await session.capturePage(page,sourceUrl,'tyranids-codex-parity');
  const remote=await page.evaluate(detachments=>{
    const rules={};
    for(const detachment of detachments){
      const marker=[...document.querySelectorAll('a[name]')].find(node=>node.name===detachment.anchor);
      const clone=marker?.parentElement?.cloneNode(true);
      if(!clone)continue;
      clone.querySelectorAll('.ShowFluff,h3,a[name],div[style*="height"]').forEach(node=>node.remove());
      rules[detachment.title]=clone.innerText.trim();
    }
    const enhancements=[...document.querySelectorAll('ul.EnhancementsPts')].map(list=>{
      const box=list.closest('.BreakInsideAvoid'),heading=list.querySelector('li>span')?.cloneNode(true);
      heading?.querySelectorAll('.EnhUpgrade').forEach(node=>node.remove());
      return {title:heading?.textContent.trim()||'',text:[...box.querySelectorAll('p:not(.ShowFluff)')].map(node=>node.innerText.trim()).filter(Boolean).join('\n\n')};
    }).filter(item=>item.title&&item.text);
    const stratagems=[...document.querySelectorAll('.str11Wrap')].map(node=>({
      title:node.querySelector('.str11Name')?.textContent.trim()||'',
      type:node.querySelector('.str11Type')?.textContent.trim()||'',
      cp:node.querySelector('.str11CP')?.textContent.trim()||'',
      text:node.querySelector('.str11Text')?.innerText.trim()||''
    })).filter(item=>detachments.some(detachment=>item.type.startsWith(`${detachment.title} –`)));
    return {rules,enhancements,stratagems};
  },detachments);
  await browser.close();

  const enhancementByTitle=new Map();
  for(const item of remote.enhancements){
    const normalized=key(item.title);
    if(!enhancementByTitle.has(normalized)||item.text.length>enhancementByTitle.get(normalized).text.length)enhancementByTitle.set(normalized,item);
  }
  const stratagemByDetachment=new Map(detachments.map(item=>[item.title,new Map()]));
  for(const item of remote.stratagems){
    const detachment=detachments.find(candidate=>item.type.startsWith(`${candidate.title} –`));
    const records=stratagemByDetachment.get(detachment.title),normalized=key(item.title),previous=records.get(normalized);
    if(!previous||item.text.includes('\n\n')&&!previous.text.includes('\n\n'))records.set(normalized,item);
  }

  const result=detachments.map(detachment=>{
    const localEnhancements=points.enhancements.filter(item=>item.detachment===detachment.title);
    const enhancements=localEnhancements.map(item=>{
      const actual=enhancementByTitle.get(key(item.title));
      if(!actual)throw new Error(`Current 11E Enhancement not found: ${item.title}`);
      return {id:item.id,title:clean(actual.title),value:item.value,text:clean(actual.text)};
    });
    const stratagems=[...stratagemByDetachment.get(detachment.title).values()].map(item=>{
      const parsed=fields(item.text),category=item.type.replace(`${detachment.title} – `,'').replace(/ Stratagem$/,'');
      return {id:`stratagem-${slug(item.title)}`,title:clean(item.title),cp:Number.parseInt(item.cp,10),category:clean(category),...Object.fromEntries(Object.entries(parsed).map(([name,value])=>[name,clean(value)]))};
    }).sort((a,b)=>a.title.localeCompare(b.title));
    return {id:detachment.id,title:detachment.title,rule:{title:detachment.ruleTitle,text:formatRule(remote.rules[detachment.title])},enhancements,stratagems};
  });
  if(result.some(item=>!item.rule.text||item.enhancements.length!==4||item.stratagems.length!==6))throw new Error('Expected six complete Codex Detachments with four Enhancements and six Stratagems each');

  const checkedAt=new Date().toISOString().slice(0,10);
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition · Tyranids',url:sourceUrl,checkedAt},detachments:result},null,2)}\n`;
  session.writeCandidate(path.relative(path.resolve(root,'../..'),outputPath),output);
  session.finalize();
  console.log(`Captured exact Codex parity candidate for ${result.length} Detachments`);
}

main().catch(error=>{console.error(error);process.exit(1)});
