import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ruleFacts from '../../shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const readSibling=(book,file)=>JSON.parse(fs.readFileSync(path.join(root,'..',book,file),'utf8'));
const stable=value=>`${JSON.stringify(value,null,2)}\n`;
const titleKey=value=>String(value||'').replace(/\s*\(Aura\)$/i,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const keyword=value=>ruleFacts.normalizeKeyword(value);
const coreContracts=[
  ['core-stratagem-command-re-roll',{}],
  ['core-stratagem-epic-challenge',{allKeywords:['CHARACTER']}],
  ['core-stratagem-insane-bravery',{}],
  ['core-stratagem-explosives',{allKeywords:['GRENADES']}],
  ['core-stratagem-crushing-impact',{anyKeywords:['MONSTER','VEHICLE']}],
  ['core-stratagem-rapid-ingress',{}],
  ['core-stratagem-fire-overwatch',{}],
  ['core-stratagem-smokescreen',{allKeywords:['SMOKE']}],
  ['core-stratagem-heroic-intervention',{}],
  ['core-stratagem-counteroffensive',{}]
];

function matches(selector,unit,grants=[]){
  const allowed=new Set(['unitIds','allKeywords','anyKeywords','noneKeywords','alternatives']);
  if(Object.keys(selector||{}).some(key=>!allowed.has(key)))throw new Error(`Unsupported selector for ${unit.id}`);
  const keywords=new Set((unit.keywords||[]).map(keyword));
  for(const grant of grants)if(matches(grant.selector,unit))keywords.add(keyword(grant.keyword));
  const test=value=>{
    if((value.unitIds||[]).length&&!value.unitIds.includes(unit.id))return false;
    if((value.allKeywords||[]).some(item=>!keywords.has(keyword(item))))return false;
    if((value.anyKeywords||[]).length&&!value.anyKeywords.some(item=>keywords.has(keyword(item))))return false;
    if((value.noneKeywords||[]).some(item=>keywords.has(keyword(item))))return false;
    return !(value.alternatives||[]).length||value.alternatives.some(test);
  };
  return test(selector||{});
}

function targets(contract){
  if(contract?.owner?.selector)return[contract.owner.selector];
  const roles=(contract?.roles||contract?.targets||[]).filter(item=>item.side==='friendly'&&item.subject==='unit');
  if(!roles.length)throw new Error('Compatible rule must declare a friendly unit target.');
  return roles.map(role=>role.selector||{});
}
const contractById=(records,id)=>records[id]||Object.entries(records).find(([key])=>key.replace(/[^a-z0-9]/gi,'').toLowerCase()===id.replace(/[^a-z0-9]/gi,'').toLowerCase())?.[1];

export function inputs(){
  return{
    config:read('book.config.json'),
    pack:read('content/blood-angels-faction-pack.en.json'),
    parity:read('content/blood-angels-codex-parity.en.json'),
    codex:read('content/blood-angels-codex-datasheets.en.json'),
    points:read('content/blood-angels-points.en.json'),
    contracts:read('content/blood-angels-related-rules.en.json'),
    spaceMarines:readSibling('space-marines','content/space-marines-codex-datasheets.en.json'),
    spaceMarinesConfig:readSibling('space-marines','book.config.json'),
    spaceMarinesPack:readSibling('space-marines','content/space-marines-faction-pack.en.json'),
    spaceMarinesParity:readSibling('space-marines','content/space-marines-current-overlay.en.json'),
    spaceMarinesPoints:readSibling('space-marines','content/space-marines-points.en.json'),
    spaceMarinesContracts:readSibling('space-marines','content/space-marines-related-rules.en.json')
  };
}

export function buildCompatibleRules({config,pack,parity,codex,points,contracts,spaceMarines,spaceMarinesConfig,spaceMarinesPack,spaceMarinesParity,spaceMarinesPoints,spaceMarinesContracts}){
  const excluded=new Set(config.dependencyDatasheets.excludeAnyKeywords.map(keyword));
  const local=codex.datasheets,shared=spaceMarines.datasheets.filter(unit=>!(unit.keywords||[]).some(item=>excluded.has(keyword(item)))).map(unit=>({...unit,keywords:[...new Set([...(unit.keywords||[]),'ADEPTUS ASTARTES'])]}));
  const localIds=new Set(local.map(unit=>unit.id)),collisions=shared.filter(unit=>localIds.has(unit.id));
  if(local.length!==15||shared.length!==82||collisions.length)throw new Error(`Expected 15 local and 82 shared Datasheets with no collisions; found ${local.length}, ${shared.length} and ${collisions.length}`);
  const units=[...local,...shared],rows=new Map(units.map(unit=>[unit.id,new Map()]));
  const localDetachments=[...(pack.detachments||[]),...(parity.detachments||[])],chapterKey=titleKey(config.dependencyDetachments.chapterKeyword);
  const currentSharedTitles=new Set(spaceMarinesPoints.detachments.map(item=>titleKey(item.title)));
  const sharedDetachments=[...(spaceMarinesPack.detachments||[]),...(spaceMarinesParity.detachments||[])].filter(item=>{const restriction=item.restriction||spaceMarinesConfig.detachmentChapterRestrictions?.[item.title];return currentSharedTitles.has(titleKey(item.title))&&(!restriction||titleKey(restriction)===chapterKey);}).map(item=>({...item,dependencyBook:'space-marines'}));
  const detachments=[...localDetachments,...sharedDetachments];
  if(localDetachments.length!==8||sharedDetachments.length!==16||new Set(detachments.map(item=>item.id)).size!==24)throw new Error(`Expected 8 local and 16 shared unique Detachments, got ${localDetachments.length} and ${sharedDetachments.length}`);
  const localPointEnhancements=new Map(points.enhancements.map(item=>[`${titleKey(item.detachment)}\0${titleKey(item.title)}`,item])),sharedPointEnhancements=new Map(spaceMarinesPoints.enhancements.map(item=>[`${titleKey(item.detachment)}\0${titleKey(item.title)}`,item]));
  const add=(unitId,row)=>rows.get(unitId).set(row.ruleId,row);
  for(const detachment of detachments){
    const source=detachment.dependencyBook?spaceMarinesContracts:contracts,pointEnhancements=detachment.dependencyBook?sharedPointEnhancements:localPointEnhancements,grants=source.keywordGrants?.[detachment.id]||[];
    for(const item of detachment.stratagems||[]){
      const contract=source.stratagems[item.id];if(!contract)throw new Error(`Missing Stratagem contract ${item.id}`);
      for(const unit of units)if(targets(contract).some(selector=>matches(selector,unit,grants))){const conditions=contract.conditions?.length?['battle-state-unknown']:[];add(unit.id,{ruleId:item.id,kind:'stratagem',detachmentId:detachment.id,state:conditions.length?'conditional':'match',...(conditions.length?{condition:conditions[0],conditions}:{})});}
    }
    for(const item of detachment.enhancements||[]){
      const contract=contractById(source.enhancements,item.id);if(!contract)throw new Error(`Missing Enhancement contract ${item.id}`);
      const current=pointEnhancements.get(`${titleKey(detachment.title)}\0${titleKey(item.title)}`);if(!current?.id)throw new Error(`Missing detachment-qualified Enhancement identity ${detachment.title}: ${item.title}`);
      for(const unit of units)if(targets(contract).some(selector=>matches(selector,unit,grants)))add(unit.id,{ruleId:current.id,kind:'enhancement',detachmentId:detachment.id,state:'match'});
    }
  }
  for(const unit of units)for(const [ruleId,selector] of coreContracts)if(matches(selector,unit))add(unit.id,{ruleId,kind:'stratagem',scope:'core',state:'conditional',condition:'battle-state-unknown',conditions:['battle-state-unknown']});
  return{schema:'blood-angels-compatible-rules/v1',units:Object.fromEntries([...rows].sort(([a],[b])=>a.localeCompare(b,'en')).map(([unitId,rules])=>[unitId,[...rules.values()].sort((a,b)=>`${a.scope||a.detachmentId}|${a.kind}|${a.ruleId}`.localeCompare(`${b.scope||b.detachmentId}|${b.kind}|${b.ruleId}`,'en'))]))};
}

function main(){const value=stable(buildCompatibleRules(inputs())),file=path.join(root,'generated','compatible-rules.json');if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8').replace(/\r\n?/g,'\n')!==value)throw new Error('Blood Angels compatible-rules matrix is stale.');console.log('Blood Angels compatible-rules matrix is current.');return;}fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value);console.log('Blood Angels compatible-rules matrix built.');}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
