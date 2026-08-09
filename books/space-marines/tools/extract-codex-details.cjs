const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const detailsPath=path.join(root,'content','space-marines-codex-wargear.en.json');
const overlayPath=path.join(root,'content','space-marines-current-overlay.en.json');
const relatedPath=path.join(root,'content','space-marines-related-rules.en.json');
const snapshotPath=path.join(root,'sources','wahapedia-compatible-rules.snapshot.json');
const datasheets=require(path.join(root,'content','space-marines-codex-datasheets.en.json')).datasheets;
const pack=require(path.join(root,'content','space-marines-faction-pack.en.json'));
const previousOverlay=require(overlayPath);
const previousRelated=require(relatedPath);
const sourceUrl='https://wahapedia.ru/wh40k11ed/factions/space-marines/';
const codexDetachmentTitles=['1st Company Task Force','Anvil Siege Force','Firestorm Assault Force','Gladius Task Force','Ironstorm Spearhead','Stormlance Task Force','Vanguard Spearhead'];
const routeAliases=new Map([
  ['Ancient in Terminator Armor','Ancient-In-Terminator-Armour'],
  ["Kor'sarro Khan",'Kor-sarro-Khan'],
  ['Lieutenant Titus','Captain-Titus'],
  ["Vulkan He'stan",'Vulkan-He-stan'],
  ['Wardens of Ultramar','Wardens-of-Ultramar-1']
]);
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').trim();
const key=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const stable=value=>`${JSON.stringify(value,null,2)}\n`;
const checkedAt=file=>process.argv.includes('--check')&&fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')).source?.checkedAt||'2026-08-09':'2026-08-09';
const officialDetails=new Map([
  ['Caanok Var',{pages:[14,15],composition:'1 Caanok Var – Epic Hero\nThis model is equipped with: 1 storm bolter; 1 Axiom.'}],
  ['Suboden Khan',{pages:[16,17],composition:'1 Suboden Khan – Epic Hero\nThis model is equipped with: 1 heavy bolt pistol; 1 onslaught gatling cannon; Stormtooth; power sword.'}],
  ["Vulkan He'stan",{pages:[18,19],composition:'1 Vulkan He’stan – Epic Hero\nThis model is equipped with: 1 bolt pistol; 1 Gauntlet of the Forge; 1 Spear of Vulkan.'}],
  ['Lieutenant Titus',{pages:[20,21],composition:'1 Lieutenant Titus – Epic Hero\nThis model is equipped with: heavy bolt pistol; Astartes chainsword.'}],
  ['Aethon Shaan',{pages:[22,23],composition:'1 Aethon Shaan – Epic Hero\nThis model is equipped with: 1 heavy bolt pistol; 1 Claws of Severax.'}],
  ['Darnath Lysander',{pages:[24,25],composition:'1 Darnath Lysander – Epic Hero\nThis model is equipped with: 1 Fist of Dorn.'}],
  ['Drop Pod',{pages:[26,27],composition:'1 Drop Pod'}]
]);

function coreRuleMap(){
  const html=fs.readFileSync(path.join(root,'..','adeptus-mechanicus','mobile','related-rules.inc'),'utf8');
  const section=html.slice(html.indexOf('<section class="related-detachment related-core"'));
  return new Map([...section.matchAll(/<article[^>]+(?:data-rule-id|id)="([^"]+)"[\s\S]*?<h3[^>]*>[\s\S]*?>([^<]+)<\/button>/g)].map(([,id,title])=>[key(title.replace(/\d+\.\d+$/,'')),id]));
}

async function main(){
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const indexPage=await browser.newPage();
  await indexPage.goto(sourceUrl,{waitUntil:'domcontentloaded',timeout:90_000});
  const links=await indexPage.locator('a').evaluateAll(nodes=>Object.fromEntries(nodes.filter(node=>node.href.includes('/wh40k11ed/factions/space-marines/')).map(node=>[node.textContent.trim().toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim(),node.href])));
  const codexDetachments=await indexPage.evaluate(titles=>{
    const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim(),slug=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const typeId={'battle tactic':'battle-tactic','strategic ploy':'strategic-ploy','wargear':'wargear','epic deed':'epic-deed'};
    const field=(text,label,next)=>clean((new RegExp(next.length?`${label}:\\s*([\\s\\S]*?)(?=${next.map(item=>`${item}:`).join('|')}|$)`:`${label}:\\s*([\\s\\S]*)$`,'i').exec(text)||[])[1]);
    return titles.map(title=>{
      const heading=[...document.querySelectorAll('h2.outline_header')].find(node=>clean(node.innerText).toLowerCase().startsWith(title.toLowerCase()));if(!heading)throw new Error(`Missing Detachment ${title}`);
      const host=heading.parentElement,column=host.querySelector('.Columns2'),ruleNode=[...column.children].find(node=>node.classList.contains('BreakInsideAvoid')&&!/^DETACHMENT RULE|^ENHANCEMENTS/i.test(clean(node.innerText)));
      const ruleClone=ruleNode.cloneNode(true);ruleClone.querySelectorAll('a[name],h3,.ShowFluff,div').forEach(node=>node.remove());
      const enhancementSection=[...column.children].find(node=>/^ENHANCEMENTS/i.test(clean(node.innerText))),detachmentId=slug(title);
      const enhancements=[...enhancementSection.querySelectorAll(':scope > .BreakInsideAvoid')].map(node=>{const spans=[...node.querySelectorAll('.EnhancementsPts span')],titleText=clean(spans[0]?.innerText),value=parseInt(clean(spans[1]?.innerText),10),text=clean([...node.querySelectorAll('p:not(.ShowFluff)')].map(item=>item.innerText).join(' '));return{id:`${detachmentId}-${slug(titleText)}`,title:titleText,value,text,sourceAuthority:'secondary'};});
      const stratagems=[...host.querySelectorAll('.str11Wrap')].filter(node=>clean(node.querySelector('.str11Type')?.innerText).toLowerCase().startsWith(title.toLowerCase())).map(node=>{const titleText=clean(node.querySelector('.str11Name')?.innerText),typeText=clean(node.querySelector('.str11Type')?.innerText),body=clean(node.querySelector('.str11Text')?.innerText),typeName=(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed) Stratagem/i.exec(typeText)||[])[1];if(!typeName)throw new Error(`Missing canonical type for ${title}/${titleText}`);const item={id:`${detachmentId}-${slug(titleText)}`,title:titleText,cp:parseInt(clean(node.querySelector('.str11CP')?.innerText),10),canonicalType:typeId[typeName.toLowerCase()],typeStatus:'confirmed',sourceLabel:`${typeName} Stratagem`,when:field(body,'WHEN',['TARGET','EFFECT','RESTRICTIONS']),target:field(body,'TARGET',['EFFECT','RESTRICTIONS']),effect:field(body,'EFFECT',['RESTRICTIONS'])};const restrictions=field(body,'RESTRICTIONS',[]);if(restrictions)item.restrictions=restrictions;return item;});
      if(enhancements.length!==4||stratagems.length!==6)throw new Error(`${title}: expected 4 Enhancements and 6 Stratagems, found ${enhancements.length}/${stratagems.length}`);
      return{id:detachmentId,title,sourceAuthority:'secondary',rule:{id:`${detachmentId}-${slug(ruleNode.querySelector('h3')?.innerText)}`,title:clean(ruleNode.querySelector('h3')?.innerText),text:clean(ruleClone.innerText)},enhancements,stratagems};
    });
  },codexDetachmentTitles);
  await indexPage.close();

  const vengeful=previousOverlay.detachments.find(item=>item.id==='vengeful-hosts'),allDetachments=[...pack.detachments,...codexDetachments,vengeful];
  const detachmentByTitle=new Map(allDetachments.map(item=>[key(item.title),item])),stratagemByDetachment=new Map(allDetachments.flatMap(detachment=>(detachment.stratagems||[]).map(item=>[`${key(detachment.title)}|${key(item.title)}`,{id:item.id,detachmentId:detachment.id}]))),enhancementByTitle=new Map();
  for(const detachment of allDetachments)for(const item of detachment.enhancements||[]){const list=enhancementByTitle.get(key(item.title))||[];list.push({id:item.id,detachmentId:detachment.id});enhancementByTitle.set(key(item.title),list);}
  const coreByTitle=coreRuleMap(),details=[],snapshotUnits={};let cursor=0;
  async function worker(){
    const page=await browser.newPage();
    while(cursor<datasheets.length){
      const unit=datasheets[cursor++],routeTitle=routeAliases.get(unit.title)||unit.title.replace(/\bArmor\b/g,'Armour').replace(/[’']/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,''),url=links[key(unit.title)]||`${sourceUrl}${routeTitle}`;await page.goto(url,{waitUntil:'domcontentloaded',timeout:90_000});
      const record=await page.evaluate(()=>{const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').trim(),header=label=>[...document.querySelectorAll('.dsHeader')].find(node=>node.textContent.trim()===label),wargearHeader=header('WARGEAR OPTIONS'),list=wargearHeader?.nextElementSibling?.tagName==='UL'?wargearHeader.nextElementSibling:null,wargear=list?[...list.children].map(item=>clean(item.innerText)).filter(Boolean):[];for(let sibling=list?.nextElementSibling;sibling;sibling=sibling.nextElementSibling)if(sibling.classList?.contains('dsOptionsComment'))wargear.push(clean(sibling.innerText));const composition=clean(header('UNIT COMPOSITION')?.nextElementSibling?.innerText),stratagems=[...document.querySelectorAll('.str11Wrap')].map(node=>({title:clean(node.querySelector('.str11Name')?.innerText).replace(/\d+\.\d+$/,''),type:clean(node.querySelector('.str11Type')?.innerText)})).filter(item=>/Stratagem/i.test(item.type)),enhancements=[...document.querySelectorAll('.s10EnhWrap')].filter(node=>getComputedStyle(node).display!=='none').map(node=>clean(node.firstElementChild?.innerText));return{wargear,composition,stratagems,enhancements};});
      if(!record.composition)throw new Error(`Current 11E Datasheet detail not found for ${unit.title}: ${url}`);const official=officialDetails.get(unit.title),source=official?{authority:'official',sourceId:'space-marines-faction-pack-v1.1',localFile:'../sources/space-marines-faction-pack-v1.1.pdf',pages:official.pages}:{authority:'secondary',sourceId:'wahapedia-space-marines-11e',url};
      details.push({title:unit.title,url,source,wargear:record.wargear.map(clean),composition:official?.composition||clean(record.composition)});
      const rows=new Map();for(const item of record.stratagems){if(/^Core Stratagem$/i.test(item.type)){const id=coreByTitle.get(key(item.title));if(id)rows.set(id,{ruleId:id,scope:'core'});continue;}const match=/^(.*?)\s+[–-]\s+(?:Battle Tactic|Strategic Ploy|Wargear|Epic Deed) Stratagem$/i.exec(item.type);if(!match)continue;const detachment=detachmentByTitle.get(key(match[1])),rule=stratagemByDetachment.get(`${key(match[1])}|${key(item.title)}`);if(detachment&&rule)rows.set(rule.id,{ruleId:rule.id,detachmentId:rule.detachmentId});}for(const title of record.enhancements)for(const item of enhancementByTitle.get(key(title))||[])rows.set(item.id,{ruleId:item.id,kind:'enhancement',detachmentId:item.detachmentId});snapshotUnits[unit.id]=[...rows.values()].sort((a,b)=>a.ruleId.localeCompare(b.ruleId,'en'));
    }
    await page.close();
  }
  await Promise.all(Array.from({length:6},worker));await browser.close();details.sort((a,b)=>a.title.localeCompare(b.title,'en'));
  const source={title:'Wahapedia Warhammer 40,000 11th Edition · Space Marines',url:sourceUrl,authority:'secondary',checkedAt:checkedAt(detailsPath)},overlay={schema:1,source:{id:'space-marines-current-parity-2026',authority:'mixed',title:source.title,url:sourceUrl,checkedAt:checkedAt(overlayPath),knownGaps:['Codex rule-bearing text is secondary parity evidence.','Vengeful Hosts exact detail retains its existing mixed provenance.']},detachments:[...codexDetachments,vengeful]},detailsOutput={schema:1,source,units:details},snapshot={schema:1,source:{...source,checkedAt:checkedAt(snapshotPath)},units:Object.fromEntries(Object.entries(snapshotUnits).sort(([a],[b])=>a.localeCompare(b,'en')))};
  const related=structuredClone(previousRelated);related.sourceId='space-marines-current-sources';related.enhancements={};const unitsForRule=new Map();for(const [unitId,rows] of Object.entries(snapshot.units))for(const row of rows){const list=unitsForRule.get(row.ruleId)||[];list.push(unitId);unitsForRule.set(row.ruleId,list);}for(const detachment of codexDetachments)for(const item of detachment.stratagems){const unitIds=unitsForRule.get(item.id)||[];if(!unitIds.length)throw new Error(`No compatible Datasheet for ${item.id}`);related.stratagems[item.id]={v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{unitIds}}],conditions:[]};}for(const detachment of allDetachments)for(const item of detachment.enhancements||[]){const unitIds=unitsForRule.get(item.id)||[];related.enhancements[item.id]={tags:[],owner:{subject:'model',selector:{unitIds}},assignment:{maxOwners:1,enhancementChoices:1,payPointsPerOwner:true}};}
  const outputs=[[detailsPath,detailsOutput],[overlayPath,overlay],[snapshotPath,snapshot],[relatedPath,related]];if(process.argv.includes('--check')){for(const [file,value] of outputs)if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==stable(value))throw new Error(`${path.basename(file)} is stale; run extract-codex-details.cjs`);console.log(`Space Marines source details current: ${details.length} Datasheets, ${codexDetachments.length} Codex Detachments`);}else{for(const [file,value] of outputs){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,stable(value),'utf8');}console.log(`Extracted Space Marines details: ${details.length} Datasheets, ${codexDetachments.length} Codex Detachments`);}
}

main().catch(error=>{console.error(error);process.exit(1)});
