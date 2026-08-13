import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const decode=value=>String(value||'').replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const readerProfiles=book=>{
  const result={};
  for(const [tag] of fs.readFileSync(path.join(root,`books/${book}/reader.html`),'utf8').matchAll(/<article class="unit-card\b[^>]*>/g)){
    const attr=name=>new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]||'';
    const unitId=attr('id'),title=attr('data-unit-title');
    const profile=ruleFacts.serializeRuleProfile(ruleFacts.profileFromDataset({
      ruleFacts:decode(attr('data-rule-facts')),relatedCandidates:decode(attr('data-related-candidates'))
    },{id:unitId}));
    if(unitId)result[unitId]=profile;
    if(title)result[normalize(title)]=profile;
  }
  return result;
};
const dgProfiles=readerProfiles('death-guard'),mechanicusProfiles=readerProfiles('adeptus-mechanicus'),tyranidsProfiles=readerProfiles('tyranids'),tauProfiles=readerProfiles('tau-empire'),csmProfiles=readerProfiles('chaos-space-marines'),bloodAngelsProfiles=readerProfiles('blood-angels'),darkAngelsProfiles=readerProfiles('dark-angels');

const deathGuard=read('books/death-guard/content/death-guard-rules.en.json');
const dgUnits={};
for(const unit of deathGuard.sections.filter(section=>section.kind==='unit')){
  const pointsBlock=unit.blocks.find(block=>block.type==='points');
  dgUnits[normalize(unit.title)]={title:unit.title,points:unit.points,wargear:pointsBlock?.wargear||[],...dgProfiles[unit.id]};
}
const dgEnhancements={};
for(const section of deathGuard.sections){
  for(const subsection of section.subsections||[]){
    for(const enhancement of (subsection.blocks||[]).filter(block=>block.type==='enhancement')){
      const match=enhancement.title.match(/^(.*?)\s+[-–—]\s+(\d+)\s*pts$/i);
      if(!match)throw new Error(`Enhancement points missing: ${enhancement.title}`);
      const effects={
        'daemon weapon of nurgle':'critical-hit-5',
        'furnace of plagues':'furnace',
        'arch contaminator':'conditional',
        'revolting regeneration':'persistent',
        'eye of affliction':'conditional',
        'bilemaw blight':'plague-wind-range-12',
        'shriekworm familiar':'persistent',
        'tendrilous emissions':'conditional',
        'final ingredient':'once',
        'visions of virulence':'conditional',
        'needle of nurgle':'narthecium-d3',
        'cornucophagus':'setup',
        'beckoning blight':'persistent',
        'fell harvester':'melee-a-2',
        'entropic knell':'conditional',
        'tome of bounteous blessings':'conditional',
        'witherbone pipes':'attachment',
        'lord of the walking pox':'attachment',
        'sorrowsyphon':'attachment',
        'talisman of burgeoning':'attachment',
        'face of death':'persistent',
        'vile vigour':'attachment',
        'warprot talisman':'once',
        'helm of the fly king':'attachment',
        'parasitic woe reaper':'persistent',
        'lancet of the worldsore':'mobile',
        'insectile murmuration':'conditional',
        'plagueveil':'persistent',
        'rejuvenating swarm':'conditional',
        'host of the hybridised pox':'once'
      };
      const aliases=(enhancement.tags||[]).includes('UPGRADE')?[`${match[1]} Upgrade`,`${match[1]} (Upgrade)`]:[];
      const record={id:enhancement.id,title:match[1],value:Number(match[2]),text:enhancement.text,effect:effects[normalize(match[1])]||'',detachment:String(section.id).replace(/^detachment-/,''),tags:enhancement.tags||[],owner:enhancement.owner||null,assignment:enhancement.assignment||null,aliases};
      for(const name of [match[1],...aliases])dgEnhancements[normalize(name)]=record;
    }
  }
}

const mechanicus=read('books/adeptus-mechanicus/content/adeptus-mechanicus-points.en.json');
const mechanicusUnits=Object.fromEntries(mechanicus.units.map(unit=>[normalize(unit.title),{...unit,...mechanicusProfiles[normalize(unit.title)]}]));
const mechanicusEnhancements=Object.fromEntries(mechanicus.enhancements.flatMap(enhancement=>{
  const entries=[[normalize(enhancement.title),enhancement]],upgrade=(enhancement.tags||[]).includes('UPGRADE');
  if(enhancement.title==='Autoclavic Denunciation')entries.push([normalize('Autoclavic Denounciation'),enhancement]);
  if(enhancement.title==='TL-4Ø9')entries.push([normalize('TL-409'),enhancement]);
  if(enhancement.title==='Stealth-screened Cybercanids Upgrade')entries.push([normalize('Stealth-screened Cybercanids'),enhancement]);
  if(upgrade)entries.push([normalize(`${enhancement.title.replace(/\s+Upgrade$/i,'')} (Upgrade)`),enhancement]);
  return entries;
}));
const tyranids=read('books/tyranids/content/tyranids-points.en.json');
const tyranidsContracts=read('books/tyranids/content/tyranids-related-rules.en.json').enhancements;
const tyranidsUnits=Object.fromEntries(tyranids.units.map(unit=>[normalize(unit.title),{...unit,...tyranidsProfiles[normalize(unit.title)]}]));
const tyranidsEnhancements=Object.fromEntries(tyranids.enhancements.flatMap(enhancement=>{
  const contract=tyranidsContracts[enhancement.id]||tyranidsContracts[enhancement.id?.replace(/^enhancement-/,'')],record={...enhancement,tags:contract?.tags||[],owner:contract?.owner||null,assignment:contract?.assignment||null};
  const base=enhancement.title.replace(/\s*\(Upgrade\)\s*$/i,'').replace(/\s+Upgrade$/i,'');
  return[...new Set([enhancement.title,base,`${base} Upgrade`,`${base} (Upgrade)`])].map(name=>[normalize(name),record]);
}));
const tau=read('books/tau-empire/content/tau-empire-points.en.json');
const tauContracts=read('books/tau-empire/content/tau-empire-related-rules.en.json').enhancements;
const tauUnits=Object.fromEntries(tau.units.map(unit=>[normalize(unit.title),{...unit,...tauProfiles[normalize(unit.title)]}]));
const tauContractFor=enhancement=>tauContracts[enhancement.id]||tauContracts[enhancement.id?.replace(/^enhancement-/,'')]||({
  'enhancement-negation-emitters':tauContracts['negation-emitters-upgrade'],
  'enhancement-unmasking-suite':tauContracts['unmasking-suite-upgrade']
}[enhancement.id]);
const tauEnhancements=Object.fromEntries(tau.enhancements.flatMap(enhancement=>{
  const contract=tauContractFor(enhancement),record={...enhancement,tags:contract?.tags||[],owner:contract?.owner||null,assignment:contract?.assignment||null};
  const base=enhancement.title.replace(/\s*\(Upgrade\)\s*$/i,'').replace(/\s+Upgrade$/i,'');
  return [...new Set([enhancement.title,base,`${base} Upgrade`,`${base} (Upgrade)`])].map(name=>[normalize(name),record]);
}));
const csm=read('books/chaos-space-marines/content/chaos-space-marines-points.en.json');
const csmPack=read('books/chaos-space-marines/content/chaos-space-marines-faction-pack.en.json');
const csmContracts=read('books/chaos-space-marines/content/chaos-space-marines-related-rules.en.json').enhancements;
const csmUnits=Object.fromEntries(csm.units.filter(unit=>unit.status==='Current').map(unit=>[normalize(unit.title),{...unit,wargear:unit.paidWargear||[],...csmProfiles[normalize(unit.title)]}]));
const csmPackDetachments=new Map(csmPack.detachments.map(detachment=>[normalize(detachment.title),detachment]));
const csmEnhancementGroups=new Map();
for(const enhancement of csm.enhancements){
  const detachment=csmPackDetachments.get(normalize(enhancement.detachment));
  const source=detachment?.enhancements.find(item=>normalize(item.title)===normalize(enhancement.title));
  const contract=source&&csmContracts[source.id];
  const role=contract?.roles?.find(item=>item.side==='friendly'&&item.subject==='unit');
  const record={...enhancement,...(role?{owner:{subject:'unit',selector:role.selector}}:{sourceLimited:true})};
  const key=normalize(enhancement.title),group=csmEnhancementGroups.get(key)||[];group.push(record);csmEnhancementGroups.set(key,group);
}
const csmEnhancements=Object.fromEntries([...csmEnhancementGroups].map(([key,items])=>[key,items.length===1?items[0]:items]));

const bloodAngels=read('books/blood-angels/content/blood-angels-points.en.json');
const bloodAngelsConfig=read('books/blood-angels/book.config.json');
const darkAngels=read('books/dark-angels/content/dark-angels-points.en.json');
const darkAngelsConfig=read('books/dark-angels/book.config.json');
const spaceMarines=read('books/space-marines/content/space-marines-points.en.json');
const spaceMarinesConfig=read('books/space-marines/book.config.json');
const spaceMarinesPack=read('books/space-marines/content/space-marines-faction-pack.en.json');
const spaceMarinesParity=read('books/space-marines/content/space-marines-current-overlay.en.json');
const spaceMarinesContracts=read('books/space-marines/content/space-marines-related-rules.en.json').enhancements;
const bloodAngelsContracts=read('books/blood-angels/content/blood-angels-related-rules.en.json').enhancements;
const darkAngelsContracts=read('books/dark-angels/content/dark-angels-related-rules.en.json').enhancements||{};
const sharedDetachmentTitles=config=>{const chapter=normalize(config.dependencyDetachments.chapterKeyword),current=new Set(spaceMarines.detachments.map(item=>normalize(item.title)));return new Set([...spaceMarinesPack.detachments,...spaceMarinesParity.detachments].filter(item=>{const restriction=item.restriction||spaceMarinesConfig.detachmentChapterRestrictions?.[item.title];return current.has(normalize(item.title))&&(!restriction||normalize(restriction)===chapter);}).map(item=>normalize(item.title)));};
const bloodAngelsSharedDetachmentTitles=sharedDetachmentTitles(bloodAngelsConfig),darkAngelsSharedDetachmentTitles=sharedDetachmentTitles(darkAngelsConfig);
const bloodAngelsProfile=unit=>bloodAngelsProfiles[unit.id]||bloodAngelsProfiles[normalize(unit.title)];
const bloodAngelsRecord=unit=>({...unit,wargear:unit.paidWargear||[],...bloodAngelsProfile(unit)});
const bloodAngelsLocal=bloodAngels.units.filter(unit=>unit.status==='Current'&&bloodAngelsProfile(unit));
const bloodAngelsLocalTitles=new Set(bloodAngelsLocal.map(unit=>normalize(unit.title)));
const bloodAngelsShared=spaceMarines.units.filter(unit=>unit.status==='Current'&&!bloodAngelsLocalTitles.has(normalize(unit.title))&&bloodAngelsProfile(unit));
if(bloodAngelsLocal.length!==15||bloodAngelsShared.length!==82)throw new Error(`Blood Angels roster inventory: expected 15 local + 82 shared, got ${bloodAngelsLocal.length} + ${bloodAngelsShared.length}`);
const bloodAngelsUnits=Object.fromEntries([...bloodAngelsLocal,...bloodAngelsShared].map(unit=>[normalize(unit.title),bloodAngelsRecord(unit)]));
const bloodAngelsEnhancementGroups=new Map();
for(const enhancement of [...bloodAngels.enhancements,...spaceMarines.enhancements.filter(item=>bloodAngelsSharedDetachmentTitles.has(normalize(item.detachment)))]){
  const contract=(bloodAngelsSharedDetachmentTitles.has(normalize(enhancement.detachment))?spaceMarinesContracts:bloodAngelsContracts)[enhancement.id],role=contract?.roles?.find(item=>item.side==='friendly'&&item.subject==='unit');
  const record={...enhancement,...(role?{owner:{subject:'unit',selector:role.selector}}:{sourceLimited:true})};
  const key=normalize(enhancement.title),group=bloodAngelsEnhancementGroups.get(key)||[];group.push(record);bloodAngelsEnhancementGroups.set(key,group);
}
const bloodAngelsEnhancements=Object.fromEntries([...bloodAngelsEnhancementGroups].map(([key,items])=>[key,items.length===1?items[0]:items]));
const darkAngelsProfile=unit=>darkAngelsProfiles[unit.id]||darkAngelsProfiles[normalize(unit.title)],darkAngelsRecord=unit=>({...unit,wargear:unit.paidWargear||[],...darkAngelsProfile(unit)});
const darkAngelsLocal=darkAngels.units.filter(unit=>unit.status==='Current'&&darkAngelsProfile(unit)),darkAngelsLocalTitles=new Set(darkAngelsLocal.map(unit=>normalize(unit.title))),darkAngelsShared=spaceMarines.units.filter(unit=>unit.status==='Current'&&!darkAngelsLocalTitles.has(normalize(unit.title))&&darkAngelsProfile(unit));
if(darkAngelsLocal.length!==16||darkAngelsShared.length!==82)throw new Error(`Dark Angels roster inventory: expected 16 local + 82 shared, got ${darkAngelsLocal.length} + ${darkAngelsShared.length}`);
const darkAngelsUnits=Object.fromEntries([...darkAngelsLocal,...darkAngelsShared].map(unit=>[normalize(unit.title),darkAngelsRecord(unit)])),darkAngelsEnhancementGroups=new Map();
for(const enhancement of [...darkAngels.enhancements,...spaceMarines.enhancements.filter(item=>darkAngelsSharedDetachmentTitles.has(normalize(item.detachment)))]){const contract=(darkAngelsSharedDetachmentTitles.has(normalize(enhancement.detachment))?spaceMarinesContracts:darkAngelsContracts)[enhancement.id],role=contract?.roles?.find(item=>item.side==='friendly'&&item.subject==='unit'),record={...enhancement,...(role?{owner:{subject:'unit',selector:role.selector}}:{sourceLimited:true})},key=normalize(enhancement.title),group=darkAngelsEnhancementGroups.get(key)||[];group.push(record);darkAngelsEnhancementGroups.set(key,group);}
const darkAngelsEnhancements=Object.fromEntries([...darkAngelsEnhancementGroups].map(([key,items])=>[key,items.length===1?items[0]:items]));

const catalog={
  'death guard':{units:dgUnits,enhancements:dgEnhancements},
  'adeptus mechanicus':{units:mechanicusUnits,enhancements:mechanicusEnhancements},
  'tyranids':{units:tyranidsUnits,enhancements:tyranidsEnhancements},
  't au empire':{units:tauUnits,enhancements:tauEnhancements},
  'chaos space marines':{units:csmUnits,enhancements:csmEnhancements},
  'blood angels':{units:bloodAngelsUnits,enhancements:bloodAngelsEnhancements},
  'dark angels':{units:darkAngelsUnits,enhancements:darkAngelsEnhancements}
};
fs.writeFileSync(path.join(root,'roster-guides','points-data.js'),`window.WH_POINTS_CATALOG=Object.freeze(${JSON.stringify(catalog)});\n`);
console.log(`Points catalog: ${Object.keys(dgUnits).length} Death Guard, ${Object.keys(mechanicusUnits).length} Adeptus Mechanicus, ${Object.keys(tyranidsUnits).length} Tyranids, ${Object.keys(tauUnits).length} T'au Empire, ${Object.keys(csmUnits).length} Chaos Space Marines, ${Object.keys(bloodAngelsUnits).length} Blood Angels and ${Object.keys(darkAngelsUnits).length} Dark Angels units.`);
