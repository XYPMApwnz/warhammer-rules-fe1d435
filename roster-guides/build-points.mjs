import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

const deathGuard=read('books/death-guard/content/death-guard-rules.en.json');
const dgUnits={};
for(const unit of deathGuard.sections.filter(section=>section.kind==='unit')){
  const pointsBlock=unit.blocks.find(block=>block.type==='points');
  dgUnits[normalize(unit.title)]={title:unit.title,points:unit.points,wargear:pointsBlock?.wargear||[]};
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
      const record={id:enhancement.id,title:match[1],value:Number(match[2]),text:enhancement.text,effect:effects[normalize(match[1])]||'',tags:enhancement.tags||[],owner:enhancement.owner||null,assignment:enhancement.assignment||null,aliases};
      for(const name of [match[1],...aliases])dgEnhancements[normalize(name)]=record;
    }
  }
}

const mechanicus=read('books/adeptus-mechanicus/content/adeptus-mechanicus-points.en.json');
const mechanicusUnits=Object.fromEntries(mechanicus.units.map(unit=>[normalize(unit.title),unit]));
const mechanicusEnhancements=Object.fromEntries(mechanicus.enhancements.flatMap(enhancement=>{
  const entries=[[normalize(enhancement.title),enhancement]],upgrade=(enhancement.tags||[]).includes('UPGRADE');
  if(enhancement.title==='Autoclavic Denunciation')entries.push([normalize('Autoclavic Denounciation'),enhancement]);
  if(enhancement.title==='TL-4Ø9')entries.push([normalize('TL-409'),enhancement]);
  if(enhancement.title==='Stealth-screened Cybercanids Upgrade')entries.push([normalize('Stealth-screened Cybercanids'),enhancement]);
  if(upgrade)entries.push([normalize(`${enhancement.title.replace(/\s+Upgrade$/i,'')} (Upgrade)`),enhancement]);
  return entries;
}));
const tau=read('books/tau-empire/content/tau-empire-points.en.json');
const tauContracts=read('books/tau-empire/content/tau-empire-related-rules.en.json').enhancements;
const tauUnits=Object.fromEntries(tau.units.map(unit=>[normalize(unit.title),unit]));
const tauContractFor=enhancement=>tauContracts[enhancement.id?.replace(/^enhancement-/,'')]||({
  'enhancement-negation-emitters':tauContracts['negation-emitters-upgrade'],
  'enhancement-unmasking-suite':tauContracts['unmasking-suite-upgrade']
}[enhancement.id]);
const tauEnhancements=Object.fromEntries(tau.enhancements.flatMap(enhancement=>{
  const contract=tauContractFor(enhancement),record={...enhancement,tags:contract?.tags||[],owner:contract?.owner||null,assignment:contract?.assignment||null};
  const base=enhancement.title.replace(/\s*\(Upgrade\)\s*$/i,'').replace(/\s+Upgrade$/i,'');
  return [...new Set([enhancement.title,base,`${base} Upgrade`,`${base} (Upgrade)`])].map(name=>[normalize(name),record]);
}));

const catalog={
  'death guard':{units:dgUnits,enhancements:dgEnhancements},
  'adeptus mechanicus':{units:mechanicusUnits,enhancements:mechanicusEnhancements},
  't au empire':{units:tauUnits,enhancements:tauEnhancements}
};
fs.writeFileSync(path.join(root,'roster-guides','points-data.js'),`window.WH_POINTS_CATALOG=Object.freeze(${JSON.stringify(catalog)});\n`);
console.log(`Points catalog: ${Object.keys(dgUnits).length} Death Guard, ${Object.keys(mechanicusUnits).length} Adeptus Mechanicus and ${Object.keys(tauUnits).length} T'au Empire units.`);
