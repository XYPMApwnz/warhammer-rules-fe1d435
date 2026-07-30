import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const outputPath=path.join(root,'content','tau-empire-related-rules.en.json');
const pack=JSON.parse(fs.readFileSync(path.join(root,'content','tau-empire-faction-pack.en.json'),'utf8'));
const current=JSON.parse(fs.readFileSync(outputPath,'utf8'));
const role=(selector,id='friendly-target',count=1)=>({id,side:'friendly',subject:'unit',count,selector});
const rule=(roles,conditions=[])=>({v:1,roles,conditions});
const tau={allKeywords:["T'AU EMPIRE"]},infantry={allKeywords:["T'AU EMPIRE",'INFANTRY']},battlesuit={allKeywords:["T'AU EMPIRE",'BATTLESUIT']},kroot={allKeywords:['KROOT']};
const codex={
  'stratagem-a-tempting-trap':rule([role(tau)],['not-selected-to-shoot','trap-objective','battle-round-3-plus']),
  'stratagem-combat-embarkation':rule([role(infantry),role({allKeywords:['TRANSPORT']},'friendly-transport')],['charge-target','within-3-of-transport','transport-capacity']),
  'stratagem-coordinate-to-engage':rule([role(tau)],['selected-as-observer']),
  'stratagem-photon-grenades':rule([role({allKeywords:["T'AU EMPIRE",'GRENADES']})],['charge-target']),
  'stratagem-point-blank-ambush':rule([role(tau)],['not-selected-to-shoot','battle-round-3-plus']),
  'stratagem-wall-of-mirrors':rule([role({unitIds:['unit-stealth-battlesuits','unit-ghostkeel-battlesuit','unit-commander-shadowsun']})],['not-engaged']),
  'stratagem-aggressive-mobility':rule([role(tau)],['not-selected-to-move']),
  'stratagem-combat-debarkation':rule([role(infantry)],['disembarked-this-turn']),
  'stratagem-counterfire-defence-systems':rule([role(tau)],['targeted-by-enemy-attack']),
  'stratagem-focused-fire':rule([role(tau,'friendly-targets',2)],['not-selected-to-shoot','battle-round-1-to-3']),
  'stratagem-pinpoint-counter-offensive':rule([role({allKeywords:["T'AU EMPIRE"],noneKeywords:['KROOT']})],['unit-destroyed']),
  'stratagem-pulse-onslaught':rule([role({allKeywords:["T'AU EMPIRE",'INFANTRY'],noneKeywords:['KROOT']})],['unit-shot','enemy-hit']),
  'stratagem-fail-safe-detonator':rule([role(battlesuit)],['battlesuit-model-destroyed']),
  'stratagem-grav-inhibitor-field':rule([role(battlesuit)],['charge-target']),
  'stratagem-stimm-injectors':rule([role(battlesuit)],['targeted-by-enemy-attack']),
  'stratagem-the-arrokon-protocol':rule([role(battlesuit)],['not-selected-to-shoot']),
  'stratagem-the-shortened-blade':rule([role(battlesuit)],['arriving-by-deep-strike','cannot-charge']),
  'stratagem-the-torchstar-gambit':rule([role({allKeywords:["T'AU EMPIRE",'BATTLESUIT','FLY']})],['attacks-resolved']),
  'stratagem-a-trap-well-laid':rule([role(kroot)],['not-selected-to-shoot-or-fight']),
  'stratagem-emp-grenades':rule([role({allKeywords:['KROOT','GRENADES']})],['within-8-of-enemy-vehicle']),
  'stratagem-guerrilla-warriors':rule([role(kroot)],['fell-back']),
  'stratagem-hidden-hunters':rule([role(kroot)],['targeted-by-enemy-attack']),
  'stratagem-join-the-hunt':rule([role({alternatives:[{allKeywords:['KROOT','INFANTRY']},{unitIds:['unit-kroot-hounds']}]})],['unit-destroyed','once-per-battle']),
  'stratagem-the-grisly-feast':rule([role(kroot)],['destroyed-enemy-this-phase'])
};
const packIds=new Set(pack.detachments.flatMap(detachment=>detachment.stratagems.map(item=>item.id)));
const packRules=Object.fromEntries([...packIds].map(id=>[id,current.stratagems[id]]));
for(const [id,value] of Object.entries(packRules))if(!value)throw new Error(`Missing Faction Pack eligibility: ${id}`);
const result={schema:1,faction:"T'au Empire",stratagems:{...packRules,...codex},enhancements:current.enhancements};
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes('--check')){
  if(fs.readFileSync(outputPath,'utf8')!==output)throw new Error('T’au Related Rules are stale; run build-related-rules.mjs');
  console.log(`T’au Related Rules current: ${Object.keys(result.stratagems).length} Stratagems, ${Object.keys(result.enhancements).length} Enhancements`);
}else{
  fs.writeFileSync(outputPath,output,'utf8');
  console.log(`Built T’au Related Rules: ${Object.keys(result.stratagems).length} Stratagems, ${Object.keys(result.enhancements).length} Enhancements`);
}
