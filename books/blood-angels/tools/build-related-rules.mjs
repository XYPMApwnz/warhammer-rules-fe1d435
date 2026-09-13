import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
function selectorFromText(text,kind){
  const raw=String(text||''),scope=kind==='enhancement'?(raw.match(/(?:^|[.!?]\s)([^.!?]*?MODEL ONLY)\b/i)?.[1]||raw):raw;
  const s=scope.toUpperCase(),all=['ADEPTUS ASTARTES'];
  if(s.includes('DEATH COMPANY'))all.push('DEATH COMPANY');
  if(s.includes('JUMP PACK'))all.push('JUMP PACK');
  if(s.includes('SANGUINARY GUARD'))all.push('SANGUINARY GUARD');
  if(s.includes('PSYKER'))all.push('PSYKER');
  if(s.includes('CHAPLAIN'))all.push('CHAPLAIN');
  if(s.includes('INFANTRY'))all.push('INFANTRY');
  if(s.includes('CHARACTER')||kind==='enhancement')all.push('CHARACTER');
  return{allKeywords:[...new Set(all)],...(kind==='enhancement'?{noneKeywords:['EPIC HERO']}:{})};
}
const contract=(selector,conditions=[])=>({v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector}],conditions});
const enhancementContract=selector=>({tags:[],owner:{subject:'model',selector},assignment:{maxOwners:1,enhancementChoices:1,payPointsPerOwner:true}});
const pack=read('content/blood-angels-faction-pack.en.json'),parity=read('content/blood-angels-codex-parity.en.json'),points=read('content/blood-angels-points.en.json');
const pointEnhancementIds=new Set(points.enhancements.map(item=>item.id));
const exceptionalEnhancementIds=new Map([
  ['on-the-archtraitor-s-bridge',{ruleId:'enhancement-on-the-archtraitors-bridge',pointId:'enhancement-on-the-archtraitors-bridge'}],
  ['sanguinary-tear-aura',{ruleId:'sanguinary-tear-aura',pointId:'enhancement-sanguinary-tear-aura'}],
  ['angel-s-fang',{ruleId:'enhancement-angels-fang',pointId:'enhancement-angels-fang'}]
]);
const enhancementContracts=new Map();
const result={schema:1,stratagems:{},enhancements:{},keywordGrants:{}};
for(const det of [...pack.detachments,...parity.detachments]){
  for(const item of det.stratagems||[]){
    const id=item.id.startsWith('stratagem-')?item.id:'stratagem-'+det.id+'-'+item.id;
    result.stratagems[id]=contract(selectorFromText(item.target,'stratagem'),['battle-state-unknown']);
    result.stratagems[item.id]=result.stratagems[id];
  }
  for(const item of det.enhancements||[]){
    const mapped=exceptionalEnhancementIds.get(item.id),id=mapped?.ruleId||(item.id.startsWith('enhancement-')?item.id:'enhancement-'+item.id),pointId=mapped?.pointId||id;
    if(!pointEnhancementIds.has(pointId))throw new Error(`Missing canonical Blood Angels Enhancement points identity: ${pointId}`);
    enhancementContracts.set(pointId,{id,contract:enhancementContract(selectorFromText(item.text,'enhancement'))});
  }
  if(det.id==='the-lost-brethren')result.keywordGrants[det.id]=[
    {keyword:'BATTLELINE',selector:{unitIds:['unit-death-company-marines']}},
    {keyword:'BATTLELINE',selector:{unitIds:['unit-death-company-marines-with-bolt-rifles']}}
  ];
}
for(const det of [...pack.detachments,...parity.detachments].sort((a,b)=>a.title.localeCompare(b.title,'en'))){
  for(const item of det.enhancements||[]){
    const mapped=exceptionalEnhancementIds.get(item.id),pointId=mapped?.pointId||(item.id.startsWith('enhancement-')?item.id:'enhancement-'+item.id);
    const entry=enhancementContracts.get(pointId);
    if(!entry)throw new Error(`Missing Blood Angels Enhancement rule identity for points entry: ${pointId}`);
    result.enhancements[entry.id]=entry.contract;
  }
}
if(enhancementContracts.size!==points.enhancements.length)throw new Error('Blood Angels Enhancement rule and points identities do not match one-to-one.');
const output=JSON.stringify(result,null,2)+'\n',file=path.join(root,'content/blood-angels-related-rules.en.json');
if(process.argv.includes('--check')){
  if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==output)throw new Error('Blood Angels related-rule contracts are stale.');
  console.log('Blood Angels related-rule contracts are current.');
}else{
  fs.writeFileSync(file,output);
  console.log('Blood Angels related-rule contracts built.');
}
