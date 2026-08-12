const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');

const root=path.resolve(__dirname,'..');
const outputPath=path.join(root,'sources','official-mfm-v1.2.json');
const manifestPath=path.join(root,'sources','source-manifest.json');
const datasheets=require(path.join(root,'content','chaos-space-marines-codex-datasheets.en.json'));
const currentUnits=datasheets.datasheets;
const sourceUrl='https://mfm.warhammer-community.com/en/chaos-space-marines';
const sourceUpdatedAt='2026-07-22';
const replaceDatasheetPoints=new Set(['Accursed Cultists','Chosen','Obliterators','Possessed','Raptors','Red Corsairs Raiders','Warp Talons']);
const clean=value=>String(value||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const key=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const number=value=>Number.parseInt(clean(value).replaceAll(',','').match(/\d+/)?.[0]||'',10);
const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(name=>[name,stable(value[name])])):value;
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(stable(value)),'utf8').digest('hex').toUpperCase();

function ordinal(value){
  const number=Number(value),remainder=number%100;
  if(remainder>=11&&remainder<=13)return'th';
  return number%10===1?'st':number%10===2?'nd':number%10===3?'rd':'th';
}

function copyRange(label){
  const value=clean(label).toUpperCase();
  if(value==='YOUR UNIT COSTS')return{label:''};
  let match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) TO (\d+)(?:ST|ND|RD|TH) UNITS? COSTS?$/);
  if(match)return{label:`${match[1]}${ordinal(match[1])}-${match[2]}${ordinal(match[2])} unit`,minCopies:Number(match[1]),maxCopies:Number(match[2])};
  match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) UNIT COSTS$/);
  if(match)return{label:`${match[1]}${ordinal(match[1])} unit`,minCopies:Number(match[1]),maxCopies:Number(match[1])};
  match=value.match(/^YOUR (\d+)(?:ST|ND|RD|TH) \+ UNIT COSTS$/);
  if(match)return{label:`${match[1]}${ordinal(match[1])} + unit`,minCopies:Number(match[1])};
  throw new Error(`Unsupported MFM copy range: ${label}`);
}

function modelRange(label){
  const value=clean(label),range=value.match(/^(\d+)\s*[-–]\s*(\d+) models?$/i),single=value.match(/^(\d+) models?$/i);
  if(range)return{minModels:Number(range[1]),maxModels:Number(range[2])};
  if(single)return{minModels:Number(single[1]),maxModels:Number(single[1])};
  throw new Error(`Unsupported MFM model range: ${label}`);
}

async function readLive(){
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  await page.goto(sourceUrl,{waitUntil:'networkidle',timeout:90_000});
  const remote=await page.evaluate(()=>{
    const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
    const headings=[...document.querySelectorAll('main h3')];
    const unitsHeading=headings.find(node=>clean(node.textContent)==='UNITS');
    const detachmentsHeading=headings.find(node=>clean(node.textContent)==='DETACHMENTS');
    if(!unitsHeading||!detachmentsHeading)throw new Error('MFM sections are missing.');
    const groups=card=>[...card.children].slice(1).map(group=>({
      title:clean(group.firstElementChild?.textContent),
      rows:[...group.querySelectorAll('ul li')].map(row=>[...row.querySelectorAll(':scope > span, :scope > div > span')].map(node=>clean(node.textContent))),
      text:clean([...group.children].slice(1).filter(node=>node.tagName!=='UL'&&!node.querySelector('ul')).map(node=>node.textContent).join(' '))
    }));
    const units=[...unitsHeading.nextElementSibling.firstElementChild.children].map(card=>({title:clean(card.firstElementChild?.textContent),groups:groups(card)}));
    const detachments=[...detachmentsHeading.nextElementSibling.children].map(card=>{
      const header=[...card.firstElementChild.querySelectorAll(':scope > span')].map(node=>clean(node.textContent));
      const disposition=[...card.children].map(node=>clean(node.textContent)).find(value=>/^(RECONNAISSANCE|DISRUPTION|PRIORITY ASSETS|PURGE THE FOE|TAKE AND HOLD)$/.test(value));
      return{title:header[0],dp:header[1],disposition,enhancements:groups(card).find(group=>group.title==='ENHANCEMENTS')?.rows||[]};
    });
    const version=[...document.querySelectorAll('main *')].find(node=>/^v\d+\.\d+$/.test(clean(node.textContent))&&node.children.length===0)?.textContent.trim()||'';
    return{version,units,detachments};
  });
  await browser.close();
  return remote;
}

function buildCapture(remote,capturedAt){
  if(remote.version!=='v1.2')throw new Error(`Expected current MFM v1.2, found ${remote.version||'unknown'}`);
  const liveUnits=remote.units.filter(unit=>unit.groups.some(group=>/^YOUR .*UNIT.* COSTS?$/.test(group.title)));
  const byTitle=new Map(liveUnits.map(unit=>[key(unit.title),unit]));
  if(liveUnits.length!==currentUnits.length)throw new Error(`Expected ${currentUnits.length} current MFM units, found ${liveUnits.length}`);
  const verifiedUnits=[],unitOverrides=[];
  for(const unit of currentUnits){
    const card=byTitle.get(key(unit.title));
    if(!card)throw new Error(`Official MFM unit missing: ${unit.title}`);
    const points=[],paidWargear=[],relations={};
    for(const group of card.groups){
      if(/^YOUR .*UNIT.* COSTS?$/.test(group.title)){
        const copies=copyRange(group.title);
        for(const row of group.rows){
          if(row.length<2)continue;
          const models=modelRange(row[0]);
          points.push({label:[copies.label,row[0]].filter(Boolean).join(' · '),value:number(row.at(-1)),...models,...Object.fromEntries(Object.entries(copies).filter(([name])=>name!=='label'))});
        }
      }else if(group.title==='WARGEAR OPTIONS'){
        for(const row of group.rows)paidWargear.push({name:clean(row[0]).replace(/^per\s+/i,''),value:number(row.at(-1)),modifiers:[]});
      }else if(group.title==='LEADER'||group.title==='SUPPORT'){
        relations[group.title.toLowerCase()]=group.text.split(',').map(clean).filter(Boolean);
      }
    }
    if(!points.length)throw new Error(`Official MFM points missing: ${unit.title}`);
    verifiedUnits.push(unit.title.toUpperCase());
    unitOverrides.push({title:unit.title.toUpperCase(),points,...(paidWargear.length?{paidWargear}:{}),...relations,...(replaceDatasheetPoints.has(unit.title)?{replaceDatasheetPoints:true}:{})});
  }
  const detachments=remote.detachments.map(item=>({title:item.title,forceDisposition:item.disposition,detachmentPoints:number(item.dp)}));
  const enhancements=remote.detachments.flatMap(detachment=>detachment.enhancements.map(row=>({title:clean(row[0]),detachment:detachment.title,value:number(row.at(-1))})));
  const payload={version:remote.version,url:sourceUrl,sourceUpdatedAt,verifiedUnits,unitOverrides,detachments,enhancements};
  const captureSha256=hash(payload);
  return{
    schema:2,
    title:'Chaos Space Marines Munitorum Field Manual dated capture',
    version:remote.version,
    sourceUpdatedAt,
    capturedAt,
    verifiedAt:capturedAt,
    url:sourceUrl,
    captureSha256,
    hashModel:{algorithm:'SHA-256',scope:'normalizedPayload',serialization:'UTF-8 JSON with recursively sorted object keys and preserved array order',fields:Object.keys(payload)},
    counts:{units:unitOverrides.length,unitPointSchedules:unitOverrides.reduce((sum,item)=>sum+item.points.length,0),pricedOptions:unitOverrides.reduce((sum,item)=>sum+(item.paidWargear?.length||0),0),detachments:detachments.length,enhancements:enhancements.length},
    verifiedUnits,
    unitOverrides,
    detachments,
    enhancements
  };
}

function manifestFor(capture,existing){
  const next=structuredClone(existing),layer=next.layers.find(item=>item.id==='mfm');
  if(!layer)throw new Error('CSM MFM manifest layer is missing.');
  next.verifiedAt=capture.capturedAt;
  Object.assign(layer,{title:'Munitorum Field Manual v1.2 dated capture',version:capture.version,updated:capture.sourceUpdatedAt,retrievedAt:capture.capturedAt,frozenAt:capture.capturedAt,captureSha256:capture.captureSha256,captureHashScope:'normalizedPayload',url:capture.url,localFile:'official-mfm-v1.2.json',status:'dated-live-capture'});
  next.gates.reason=`Official Faction Pack v1.1 is frozen; official live MFM v1.2 is preserved as a dated repository capture verified ${new Date(`${capture.capturedAt}T00:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}. Codex text must still be verified before this book can be labelled complete.`;
  return next;
}

async function main(){
  const previous=fs.existsSync(outputPath)?JSON.parse(fs.readFileSync(outputPath,'utf8')):null;
  const capturedAt=process.argv.includes('--check')&&previous?.capturedAt?previous.capturedAt:new Date().toISOString().slice(0,10);
  const capture=buildCapture(await readLive(),capturedAt);
  const manifest=manifestFor(capture,JSON.parse(fs.readFileSync(manifestPath,'utf8')));
  const output=`${JSON.stringify(capture,null,2)}\n`,manifestOutput=`${JSON.stringify(manifest,null,2)}\n`;
  if(process.argv.includes('--check')){
    const errors=[];
    if(!previous||fs.readFileSync(outputPath,'utf8')!==output)errors.push('Official CSM MFM dated capture is stale.');
    if(fs.readFileSync(manifestPath,'utf8')!==manifestOutput)errors.push('CSM MFM manifest metadata is stale.');
    if(errors.length)throw new Error(errors.join('\n'));
    console.log(`Official CSM MFM parity passed: ${capture.counts.units} units, ${capture.counts.unitPointSchedules} schedules, ${capture.counts.pricedOptions} priced options, ${capture.counts.detachments} Detachments and ${capture.counts.enhancements} Enhancements.`);
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    fs.writeFileSync(manifestPath,manifestOutput,'utf8');
    console.log(`Captured official CSM MFM: ${capture.counts.units} units, ${capture.counts.unitPointSchedules} schedules, ${capture.counts.pricedOptions} priced options, ${capture.counts.detachments} Detachments and ${capture.counts.enhancements} Enhancements.`);
  }
}

main().catch(error=>{console.error(error);process.exit(1)});
