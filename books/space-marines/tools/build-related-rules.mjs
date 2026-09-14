import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifyTrackedInputs} from '../../shared/tools/verify-bsdata-source.mjs';
import {loadAcceptedRelatedRulesInputs,validateAcceptedRelatedRulesContracts} from './space-marines-related-rules-contract.mjs';

const defaultBookRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const defaultRepoRoot=path.resolve(defaultBookRoot,'../..');
const assert=(value,message)=>{if(!value)throw new Error(`Space Marines Related Rules builder: ${message}`);};
const exactKeys=(value,allowed,label)=>{
  assert(value&&typeof value==='object'&&!Array.isArray(value),`${label} must be an object`);
  const extras=Object.keys(value).filter(key=>!allowed.includes(key));
  assert(!extras.length,`${label} has unsupported fields: ${extras.join(', ')}`);
};
const orderedObject=entries=>Object.fromEntries([...entries].sort(([a],[b])=>a.localeCompare(b,'en')));

export function loadRelatedRulesBuildInputs({bookRoot=defaultBookRoot,authenticateRepository=true}={}){
  const root=path.resolve(bookRoot);
  const acceptedInputs=loadAcceptedRelatedRulesInputs({bookRoot:root,authenticateRepository});
  validateAcceptedRelatedRulesContracts(acceptedInputs);
  const componentPath=path.join(root,'content','space-marines-faction-pack-related-rules.component.json');
  if(authenticateRepository&&root===defaultBookRoot)verifyTrackedInputs({checkout:defaultRepoRoot,inputFiles:[componentPath]});
  return{...acceptedInputs,packComponent:JSON.parse(fs.readFileSync(componentPath,'utf8'))};
}

export function buildRelatedRulesFromInputs(inputs){
  const pack=inputs['faction-pack-canonical'];
  const overlay=inputs['codex-overlay'];
  const snapshot=inputs['codex-compatibility-snapshot'];
  const packComponent=inputs.packComponent;
  const supplements=new Map(inputs.accepted.enhancements.map(item=>[item.id,item]));
  assert(packComponent.schema===1&&packComponent.faction==='Space Marines'&&packComponent.sourceId==='space-marines-faction-pack-v1.2','invalid Faction Pack component identity');
  exactKeys(packComponent,['schema','faction','sourceId','stratagems'],'Faction Pack component');

  const packStratagemIds=pack.detachments.flatMap(detachment=>(detachment.stratagems||[]).map(item=>item.id));
  assert(new Set(packStratagemIds).size===packStratagemIds.length,'duplicate Faction Pack Stratagem identity');
  assert(packStratagemIds.length===81,'expected 81 Faction Pack Stratagems');
  assert(Object.keys(packComponent.stratagems).length===packStratagemIds.length&&packStratagemIds.every(id=>packComponent.stratagems[id]),'Faction Pack component does not exactly cover accepted Stratagem identities');

  const unitsForRule=new Map();
  for(const [unitId,rows] of Object.entries(snapshot.units||{}))for(const row of rows){
    const ids=unitsForRule.get(row.ruleId)||[];
    ids.push(unitId);
    unitsForRule.set(row.ruleId,ids);
  }
  for(const ids of unitsForRule.values())ids.sort((a,b)=>a.localeCompare(b,'en'));

  const codexStratagemEntries=[];
  for(const detachment of overlay.detachments||[])for(const item of detachment.stratagems||[]){
    const unitIds=unitsForRule.get(item.id)||[];
    assert(unitIds.length,`no compatible Datasheet for Codex Stratagem ${item.id}`);
    codexStratagemEntries.push([item.id,{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{unitIds}}],conditions:[]}]);
  }
  assert(new Set(codexStratagemEntries.map(([id])=>id)).size===codexStratagemEntries.length,'duplicate Codex Stratagem identity');
  assert(codexStratagemEntries.length===42,'expected 42 Codex Stratagems');
  const packStratagemSet=new Set(packStratagemIds);
  assert(codexStratagemEntries.every(([id])=>!packStratagemSet.has(id)),'Pack and Codex Stratagem identities conflict');

  const sourceEnhancements=[...pack.detachments,...overlay.detachments].flatMap(detachment=>(detachment.enhancements||[]).map(item=>({id:item.id,detachmentId:detachment.id})));
  assert(sourceEnhancements.length===87&&new Set(sourceEnhancements.map(item=>item.id)).size===87,'expected 87 unique source Enhancement identities');
  const enhancementEntries=sourceEnhancements.map(source=>{
    const supplemental=supplements.get(source.id);
    if(supplemental){
      assert(supplemental.detachmentId===source.detachmentId,`${source.id} supplemental Detachment conflict`);
      return[source.id,{tags:supplemental.tags,owner:supplemental.owner,assignment:supplemental.assignment}];
    }
    const unitIds=unitsForRule.get(source.id)||[];
    assert(unitIds.length,`missing accepted owner contract for Enhancement ${source.id}`);
    return[source.id,{tags:[],owner:{subject:'model',selector:{unitIds}},assignment:{maxOwners:1,enhancementChoices:1,payPointsPerOwner:true}}];
  });
  assert(enhancementEntries.length===87&&new Set(enhancementEntries.map(([id])=>id)).size===87,'duplicate final Enhancement identity');
  assert([...supplements.keys()].every(id=>enhancementEntries.some(([candidate])=>candidate===id)),'unknown supplemental Enhancement contract');
  assert(enhancementEntries.some(([id])=>id==='spy-skull-data-link')&&!enhancementEntries.some(([id])=>id==='spy-skull-datalink'),'Spy-skull canonical identity conflict');

  const stratagemEntries=[...Object.entries(packComponent.stratagems),...codexStratagemEntries];
  assert(stratagemEntries.length===123&&new Set(stratagemEntries.map(([id])=>id)).size===123,'final Stratagem identity conflict');
  return{
    schema:1,
    faction:'Space Marines',
    sourceId:'space-marines-related-rules-mixed-v1',
    sources:[
      {sourceId:'space-marines-faction-pack-v1.2',scope:'faction-pack-stratagems-and-enhancements',confidence:'VERIFIED_FROZEN'},
      {sourceId:'space-marines-codex-details',scope:'codex-stratagems-and-compatible-owner-projection',confidence:'SOURCE_LIMITED'},
      {sourceId:'space-marines-related-rules-contracts',scope:'supplemental-enhancement-contracts',confidence:'SOURCE_LIMITED'}
    ],
    stratagems:orderedObject(stratagemEntries),
    enhancements:orderedObject(enhancementEntries)
  };
}

export function buildRelatedRules(options={}){
  return buildRelatedRulesFromInputs(loadRelatedRulesBuildInputs(options));
}

export const serializeRelatedRules=value=>`${JSON.stringify(value,null,2)}\n`;

if(path.resolve(process.argv[1]||'')===fileURLToPath(import.meta.url)){
  const outputPath=path.join(defaultBookRoot,'content','space-marines-related-rules.en.json');
  const output=serializeRelatedRules(buildRelatedRules());
  if(process.argv.includes('--check')){
    assert(fs.existsSync(outputPath)&&fs.readFileSync(outputPath,'utf8')===output,'generated aggregate is stale');
    console.log('Space Marines Related Rules current: 81 Pack + 42 Codex Stratagems, 87 Enhancements');
  }else{
    fs.writeFileSync(outputPath,output,'utf8');
    console.log('Built Space Marines Related Rules: 81 Pack + 42 Codex Stratagems, 87 Enhancements');
  }
}
