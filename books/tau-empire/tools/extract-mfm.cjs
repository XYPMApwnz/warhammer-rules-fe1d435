const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'sources','official-mfm-v1.2.json');
const datasheets=require(path.join(root,'content','tau-empire-codex-datasheets.en.json'));
const currentUnits=[...datasheets.datasheets,...datasheets.imperialArmour].filter(unit=>unit.status==='Current');
const sourceUrl='https://mfm.warhammer-community.com/en/tau-empire';
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const key=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const number=value=>{
  const matches=[...clean(value).matchAll(/\d[\d,]*/g)];
  return Number.parseInt(matches.at(-1)?.[0].replaceAll(',','')||'',10);
};

function copyRange(label){
  const value=clean(label).toUpperCase();
  if(value==='YOUR UNIT COSTS')return{};
  let match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) TO (\d+)(?:ST|ND|RD|TH) UNITS? COSTS?$/);
  if(match)return{minCopies:Number(match[1]),maxCopies:Number(match[2])};
  match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) UNIT COSTS$/);
  if(match)return{minCopies:Number(match[1]),maxCopies:Number(match[1])};
  match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) \+ UNIT COSTS$/);
  if(match)return{minCopies:Number(match[1])};
  throw new Error(`Unsupported MFM copy range: ${label}`);
}

function modelRange(label){
  const value=clean(label),range=value.match(/^(\d+)\s*[-–]\s*(\d+) models?$/i),single=value.match(/^(\d+) models?$/i);
  if(range)return{minModels:Number(range[1]),maxModels:Number(range[2])};
  if(single)return{minModels:Number(single[1]),maxModels:Number(single[1])};
  throw new Error(`Unsupported MFM model range: ${label}`);
}

async function main(){
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  await page.goto(sourceUrl,{waitUntil:'networkidle',timeout:90_000});
  const remote=await page.evaluate(()=>{
    const cards=[...document.querySelectorAll('div.flex.flex-col.space-y-1.m-1')];
    const groups=card=>[...card.children].slice(1).map(group=>({
      title:group.firstElementChild?.innerText?.trim()||'',
      rows:[...group.querySelectorAll('ul.leaders li')].map(row=>[...row.querySelectorAll(':scope > span, :scope > div > span')].map(node=>node.innerText.trim()))
    }));
    const units=cards.map(card=>({title:card.firstElementChild?.innerText?.trim()||'',groups:groups(card)}))
      .filter(card=>card.groups.some(group=>/^YOUR .*UNIT.* COSTS?$/.test(group.title)));
    const detachments=cards.map(card=>({
      title:card.firstElementChild?.querySelector('span')?.innerText?.trim()||'',
      dp:card.firstElementChild?.querySelectorAll('span')[1]?.innerText?.trim()||'',
      disposition:[...card.children].slice(1).find(node=>/^(RECONNAISSANCE|DISRUPTION|PRIORITY ASSETS|PURGE THE FOE|TAKE AND HOLD)$/.test(node.innerText.trim()))?.innerText.trim()||'',
      enhancements:groups(card).find(group=>group.title==='ENHANCEMENTS')?.rows||[]
    })).filter(card=>card.title&&card.dp&&card.disposition);
    return{version:[...document.querySelectorAll('*')].find(node=>/^v\d+\.\d+$/.test(node.textContent.trim())&&node.children.length===0)?.textContent.trim()||'',units,detachments};
  });
  await browser.close();

  if(remote.version!=='v1.2')throw new Error(`Expected current MFM v1.2, found ${remote.version||'unknown'}`);
  const byTitle=new Map(remote.units.map(unit=>[key(unit.title),unit]));
  const verifiedUnits=[],unitOverrides=[];
  for(const unit of currentUnits){
    const card=byTitle.get(key(unit.title));
    if(!card)throw new Error(`Official MFM unit missing: ${unit.title}`);
    const points=[];let paidWargear=[];let leader=[];
    for(const group of card.groups){
      if(/^YOUR .*UNIT.* COSTS?$/.test(group.title)){
        const copies=copyRange(group.title);
        for(const row of group.rows){
          if(row.length<2)continue;
          if(/^\+\s*/.test(row[0])){
            paidWargear.push({name:clean(row[0]).replace(/^\+\s*\d*\s*/,'').trim(),value:number(row.at(-1)),modifiers:[]});
            continue;
          }
          const models=modelRange(row[0]);
          const copyLabel=copies.minCopies||copies.maxCopies?group.title.replace(/^YOUR | COSTS$/g,'').toLowerCase().replace('units','unit'):'';
          points.push({label:[copyLabel,row[0]].filter(Boolean).join(' · '),value:number(row.at(-1)),...models,...copies});
        }
      }else if(group.title==='WARGEAR OPTIONS')paidWargear=group.rows.map(row=>({name:clean(row[0]).replace(/^per\s+/i,''),value:number(row.at(-1)),modifiers:[]}));
      else if(group.title==='LEADER')leader=group.rows.flat().flatMap(value=>clean(value).split(',')).map(clean).filter(Boolean);
    }
    if(!points.length)throw new Error(`Official MFM points missing: ${unit.title}`);
    verifiedUnits.push(unit.title);
    unitOverrides.push({title:unit.title,points,...(paidWargear.length?{paidWargear}:{}),...(leader.length?{leader}: {})});
  }
  const detachments=remote.detachments.map(item=>({title:item.title.replace(/’/g,"'"),forceDisposition:item.disposition.replace(/\b\w/g,char=>char.toUpperCase()),detachmentPoints:number(item.dp)}));
  const enhancements=remote.detachments.flatMap(detachment=>detachment.enhancements.map(row=>{
    const title=clean(row[0]).replace(/\s*\(Upgrade\)$/i,' (Upgrade)');
    const sourceTitle=title.endsWith(' (Upgrade)')?title.replace(/ \(Upgrade\)$/,''):title.includes('Mont’ka')?title.replace('Mont’ka',"Mont'ka"):null;
    return{title,detachment:detachment.title.replace(/’/g,"'"),value:number(row.at(-1)),...(sourceTitle?{sourceTitle}: {})};
  }));
  const previous=fs.existsSync(outputPath)?JSON.parse(fs.readFileSync(outputPath,'utf8')):null;
  const verifiedAt=process.argv.includes('--check')&&previous?.verifiedAt?previous.verifiedAt:new Date().toISOString().slice(0,10);
  const result={schema:1,title:'Munitorum Field Manual',version:remote.version,verifiedAt,url:sourceUrl,detachments,verifiedUnits,unitOverrides,enhancements};
  const output=`${JSON.stringify(result,null,2)}\n`;
  if(process.argv.includes('--check')){
    if(!previous||fs.readFileSync(outputPath,'utf8')!==output)throw new Error('Official MFM snapshot is stale; run extract-mfm.cjs');
    console.log(`Official MFM current: ${verifiedUnits.length} units, ${detachments.length} Detachments, ${enhancements.length} Enhancements`);
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    console.log(`Extracted official MFM: ${verifiedUnits.length} units, ${detachments.length} Detachments, ${enhancements.length} Enhancements`);
  }
}

main().catch(error=>{console.error(error);process.exit(1)});
