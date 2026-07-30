const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'content','tau-empire-codex-parity.en.json');
const points=require(path.join(root,'content','tau-empire-points.en.json'));
const factionPack=require(path.join(root,'content','tau-empire-faction-pack.en.json'));
const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/t-au-empire/';
const detachments=[
  {id:'kauyon',title:'Kauyon',rules:[['Patient Hunter','Patient-Hunter']]},
  {id:'montka',title:"Mont'ka",sourceTitle:'Mont’ka',rules:[['Killing Blow','Killing-Blow']]},
  {id:'retaliation-cadre',title:'Retaliation Cadre',rules:[['Bonded Heroes','Bonded-Heroes']]},
  {id:'kroot-hunting-pack',title:'Kroot Hunting Pack',rules:[["Hunter's Instincts",'Hunter-s-Instincts'],['Skirmish Fighters','Skirmish-Fighters']]}
];
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
const key=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/\(aura\)/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const slug=value=>key(value).replace(/[^a-z0-9]+/g,'-');
function fields(text){
  const value=String(text||'').replace(/\r/g,'');
  const read=(name,next)=>value.match(new RegExp(`${name}:\\s*([\\s\\S]*?)${next?`(?=\\n\\n${next}:|$)`:'$'}`,'i'))?.[1]?.trim()||'';
  return{when:read('WHEN','TARGET'),target:read('TARGET','EFFECT'),effect:read('EFFECT','RESTRICTIONS'),restrictions:read('RESTRICTIONS','')};
}
const officialUpdate=id=>{
  const update=factionPack.updates.find(item=>item.id===id);
  if(!update)throw new Error(`Official update missing: ${id}`);
  return clean(update.change);
};

async function main(){
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  await page.goto(sourceUrl,{waitUntil:'domcontentloaded',timeout:90_000});
  const remote=await page.evaluate(detachments=>{
    const rules={};
    for(const detachment of detachments){
      rules[detachment.title]=detachment.rules.map(([title,anchor])=>{
        const marker=[...document.querySelectorAll('a[name]')].find(node=>node.name===anchor);
        const clone=marker?.parentElement?.cloneNode(true);
        if(!clone)return{title,text:''};
        clone.querySelectorAll('.ShowFluff,h3,a[name],div[style*="height"]').forEach(node=>node.remove());
        return{title,text:clone.innerText.trim()};
      });
    }
    const enhancements=[...document.querySelectorAll('ul.EnhancementsPts')].map(list=>{
      const box=list.closest('.BreakInsideAvoid'),heading=list.querySelector('li>span')?.cloneNode(true);
      heading?.querySelectorAll('.EnhUpgrade').forEach(node=>node.remove());
      return{title:heading?.textContent.trim()||'',text:[...box.querySelectorAll('p:not(.ShowFluff)')].map(node=>node.innerText.trim()).filter(Boolean).join('\n\n')};
    }).filter(item=>item.title&&item.text);
    const stratagems=[...document.querySelectorAll('.str11Wrap')].map(node=>({title:node.querySelector('.str11Name')?.textContent.trim()||'',type:node.querySelector('.str11Type')?.textContent.trim()||'',cp:node.querySelector('.str11CP')?.textContent.trim()||'',text:node.querySelector('.str11Text')?.innerText.trim()||''}));
    return{rules,enhancements,stratagems};
  },detachments);
  await browser.close();

  const enhancementByTitle=new Map();
  for(const item of remote.enhancements){
    const normalized=key(item.title),previous=enhancementByTitle.get(normalized);
    if(!previous||item.text.length>previous.text.length)enhancementByTitle.set(normalized,item);
  }
  const result=detachments.map(detachment=>{
    const sourceTitle=detachment.sourceTitle||detachment.title;
    const enhancements=points.enhancements.filter(item=>key(item.detachment)===key(detachment.title)).map(item=>{
      const actual=enhancementByTitle.get(key(item.title));
      if(!actual)throw new Error(`Current 11E Enhancement not found: ${item.title}`);
      return{id:item.id,title:clean(actual.title),value:item.value,text:clean(actual.text)};
    });
    const stratagemByTitle=new Map();
    for(const item of remote.stratagems.filter(item=>item.type.startsWith(`${sourceTitle} –`))){
      const previous=stratagemByTitle.get(key(item.title));
      if(!previous||item.text.includes('\n\n')&&!previous.text.includes('\n\n'))stratagemByTitle.set(key(item.title),item);
    }
    const stratagems=[...stratagemByTitle.values()].map(item=>{
      const parsed=fields(item.text),category=item.type.replace(`${sourceTitle} – `,'').replace(/ Stratagem$/,'');
      return{id:`stratagem-${slug(item.title)}`,title:clean(item.title),cp:Number.parseInt(item.cp,10),category:clean(category),...Object.fromEntries(Object.entries(parsed).map(([name,value])=>[name,clean(value)]))};
    }).sort((a,b)=>a.title.localeCompare(b.title));
    const rules=remote.rules[detachment.title];
    if(rules.some(rule=>!rule.text))throw new Error(`${detachment.title}: Detachment rule missing`);
    return{id:detachment.id,title:detachment.title,rule:{title:rules.map(rule=>rule.title).join(' & '),text:rules.map(rule=>clean(rule.text).replace(new RegExp(`^${rule.title}\\s*`,'i'),'')).join('\n\n')},enhancements,stratagems};
  });
  const byId=new Map(result.map(item=>[item.id,item]));
  byId.get('kauyon').rule.text=officialUpdate('kauyon-patient-hunter');
  byId.get('montka').rule.text=officialUpdate('montka-killing-blow');
  byId.get('retaliation-cadre').rule.text=officialUpdate('retaliation-bonded-heroes');
  byId.get('kauyon').enhancements.find(item=>item.id==='enhancement-through-unity-devastation').text=officialUpdate('kauyon-through-unity-devastation');
  byId.get('montka').enhancements.find(item=>item.id==='enhancement-coordinated-exploitation').text=officialUpdate('montka-coordinated-exploitation');
  byId.get('montka').enhancements.find(item=>item.id==='enhancement-strike-swiftly').text=officialUpdate('montka-strike-swiftly');
  byId.get('retaliation-cadre').enhancements.find(item=>item.id==='enhancement-puretide-engram-neurochip').text=officialUpdate('retaliation-puretide-engram-neurochip');
  const photon=byId.get('kauyon').stratagems.find(item=>item.id==='stratagem-photon-grenades');
  photon.when=officialUpdate('kauyon-photon-grenades');
  const embeddedRestriction=photon.effect.match(/\n\nRESTRICTION:\s*([\s\S]+)$/i);
  if(embeddedRestriction){photon.effect=photon.effect.slice(0,embeddedRestriction.index).trim();photon.restrictions=embeddedRestriction[1].trim();}
  const shortened=byId.get('retaliation-cadre').stratagems.find(item=>item.id==='stratagem-the-shortened-blade');
  shortened.effect=shortened.effect.replace('3"','6"');
  if(result.some(item=>item.enhancements.length!==4||item.stratagems.length!==6))throw new Error(`Expected four complete Codex Detachments with four Enhancements and six Stratagems each; found ${result.map(item=>`${item.title}:${item.enhancements.length}/${item.stratagems.length}`).join(', ')}`);
  const previous=fs.existsSync(outputPath)?JSON.parse(fs.readFileSync(outputPath,'utf8')):null;
  const checkedAt=process.argv.includes('--check')&&previous?.source?.checkedAt?previous.source.checkedAt:new Date().toISOString().slice(0,10);
  const output=`${JSON.stringify({schema:1,source:{title:'Wahapedia Warhammer 40,000 11th Edition · T’au Empire',url:sourceUrl,checkedAt},detachments:result},null,2)}\n`;
  if(process.argv.includes('--check')){
    if(!previous||fs.readFileSync(outputPath,'utf8')!==output)throw new Error('Codex parity snapshot is stale; run extract-codex-parity.cjs');
    console.log(`Codex parity current: ${result.length} Detachments, 16 Enhancements, 24 Stratagems`);
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    console.log(`Extracted exact Codex parity for ${result.length} T’au Empire Detachments`);
  }
}

main().catch(error=>{console.error(error);process.exit(1)});
