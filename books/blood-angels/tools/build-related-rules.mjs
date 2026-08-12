import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
function selectorFromText(text,kind){
  const s=String(text||'').toUpperCase(),all=['ADEPTUS ASTARTES'];
  if(s.includes('DEATH COMPANY'))all.push('DEATH COMPANY');
  if(s.includes('JUMP PACK'))all.push('JUMP PACK');
  if(s.includes('SANGUINARY GUARD'))all.push('SANGUINARY GUARD');
  if(s.includes('INFANTRY'))all.push('INFANTRY');
  if(s.includes('CHARACTER')||kind==='enhancement')all.push('CHARACTER');
  return{allKeywords:[...new Set(all)],...(kind==='enhancement'?{noneKeywords:['EPIC HERO']}:{})};
}
const contract=(selector,conditions=[])=>({v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector}],conditions});
const pack=read('content/blood-angels-faction-pack.en.json'),parity=read('content/blood-angels-codex-parity.en.json');
const result={schema:1,stratagems:{},enhancements:{},keywordGrants:{}};
for(const det of [...pack.detachments,...parity.detachments]){
  for(const item of det.stratagems||[]){
    const id=item.id.startsWith('stratagem-')?item.id:'stratagem-'+det.id+'-'+item.id;
    result.stratagems[id]=contract(selectorFromText((item.target||'')+' '+(item.effect||''),'stratagem'),['battle-state-unknown']);
    result.stratagems[item.id]=result.stratagems[id];
  }
  for(const item of det.enhancements||[]){
    const id=item.id.startsWith('enhancement-')?item.id:'enhancement-'+det.id+'-'+item.id;
    result.enhancements[id]=contract(selectorFromText(item.text,'enhancement'));
    result.enhancements[item.id]=result.enhancements[id];
  }
  if(det.id==='the-lost-brethren')result.keywordGrants[det.id]=[
    {keyword:'BATTLELINE',selector:{unitIds:['unit-death-company-marines']}},
    {keyword:'BATTLELINE',selector:{unitIds:['unit-death-company-marines-with-bolt-rifles']}}
  ];
}
const output=JSON.stringify(result,null,2)+'\n',file=path.join(root,'content/blood-angels-related-rules.en.json');
if(process.argv.includes('--check')){
  if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==output)throw new Error('Blood Angels related-rule contracts are stale.');
  console.log('Blood Angels related-rule contracts are current.');
}else{
  fs.writeFileSync(file,output);
  console.log('Blood Angels related-rule contracts built.');
}
