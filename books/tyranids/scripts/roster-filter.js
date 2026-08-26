(function(root){
  'use strict';

  const list=value=>Array.isArray(value)?value:[];
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const current=relation=>relation?.certainty==='current'&&relation?.provenance?.kind==='explicit-roster-attachment';
  const ids={
    viciousInsight:'tyranids-ability-vicious-insight',
    nodeLash:'tyranids-ability-node-lash-psychic',
    alphaWarrior:'tyranids-ability-alpha-warrior',
    alphaWarriorWinged:'tyranids-ability-alpha-warrior-2',
    aggressiveLeader:'tyranids-ability-aggressive-leader-beast',
    alphaInvader:'tyranids-ability-alpha-invader',
    hypersensory:'tyranids-ability-hypersensory-array',
    alphaLeader:'tyranids-ability-alpha-leader',
    onslaught:'tyranids-ability-onslaught-aura-psychic',
    hiveMind:'tyranids-ability-will-of-the-hive-mind',
    domination:'tyranids-ability-domination-of-the-hive-mind-aura',
    guardian:'tyranids-ability-guardian-organism'
  };
  const detachmentRuleIds={
    'ambush-predators':'tyranids-detachment-rule-mindhunger',
    'talons-of-the-norn-queen':'tyranids-detachment-rule-higher-imperatives',
    'warrior-bioform-onslaught':'tyranids-detachment-rule-leader-beasts',
    'subterranean-assault':'tyranids-detachment-rule-surprise-assault',
    'invasion-fleet':'tyranids-detachment-rule-hyper-adaptations',
    'crusher-stampede':'tyranids-detachment-rule-enraged-behemoths',
    'unending-swarm':'tyranids-detachment-rule-insurmountable-odds',
    'assimilation-swarm':'tyranids-detachment-rule-feed-the-swarm',
    'vanguard-onslaught':'tyranids-detachment-rule-questing-tendrils',
    'synaptic-nexus':'tyranids-detachment-rule-synaptic-imperatives'
  };
  const exactEnhancementOwners={
    'encircling-horrors':new Set(['unit-lictor','unit-neurolictor','unit-von-ryans-leapers']),
    'cryptophotaic-camouflage':new Set(['unit-von-ryans-leapers']),
    'destabilising-predation':new Set(['unit-norn-emissary']),
    'synaptoprescience':new Set(['unit-norn-assimilator']),
    'elevated-might':new Set(['unit-winged-tyranid-prime','unit-tyranid-prime-with-lash-whip']),
    'ocular-adaptation':new Set(['unit-winged-tyranid-prime','unit-tyranid-prime-with-lash-whip']),
    'trygon-prime':new Set(['unit-trygon'])
  };
  const unitScopeEnhancements=new Set([
    'synaptic-strategy','vanguard-intellect','enhancement-synaptic-linchpin',
    'enhancement-adrenalised-onslaught','enhancement-piercing-talons','enhancement-relentless-hunger',
    'enhancement-instinctive-defense','enhancement-parasitic-biomorphology',
    'enhancement-regenerating-monstrosity','enhancement-chameleonic','ocular-adaptation'
  ]);
  const groupMutationEnhancements=new Set([
    'enhancement-relentless-hunger','enhancement-parasitic-biomorphology','enhancement-chameleonic'
  ]);

  const keywords=draft=>new Set([
    ...list(draft?.rosterState?.keywordProfile?.effective),
    ...list(draft?.rosterState?.keywordProfile?.intrinsic),
    ...list(draft?.item?.catalogUnit?.intrinsicKeywords)
  ].map(normalize));
  const hasKeyword=(draft,value)=>keywords(draft).has(normalize(value));
  const abilities=draft=>list(draft?.item?.catalogUnit?.gameSelections?.abilities);
  const hasAbility=(draft,value)=>abilities(draft).some(ability=>normalize(ability.id)===normalize(value)||normalize(ability.title)===normalize(value));
  const weaponReady=draft=>draft?.selection?.loadout?.weaponResolution?.state==='resolved'&&list(draft.selection.loadout.selectedProfileIds).length>0;
  const ownerId=resolution=>resolution?.input?.ownerUnitId||resolution?.input?.owner?.instanceId||'';
  const canonicalId=resolution=>resolution?.catalog?.ruleId||resolution?.catalog?.id||'';

  function groupIds(gameUnit,byInstance){
    const output=new Set([gameUnit.identity.instanceId]);
    let anchor=gameUnit;
    const bodyguard=list(gameUnit.attachments?.leading).find(current);
    if(bodyguard)anchor=byInstance.get(bodyguard.instanceId)||gameUnit;
    output.add(anchor.identity.instanceId);
    for(const relation of list(anchor.attachments?.leaders).filter(current))output.add(relation.instanceId);
    return output;
  }
  function sourceInGroup(context,canonicalUnitId,requiresLeading=false){
    const group=groupIds(context.gameUnit,context.byInstance);
    const provider=[...group].map(id=>context.byInstance.get(id)).find(draft=>draft?.identity?.canonicalDatasheetId===canonicalUnitId);
    if(!provider)return null;
    if(requiresLeading&&!list(provider.attachments?.leading).some(current))return null;
    return provider;
  }
  function source(kind,id,ownerInstanceId){return {kind,id,ownerInstanceId};}
  function add(output,gameUnit,id,component,targetId,operation,detail={},effectSource,rosterFact='curated-canonical-applicability'){
    if(output.some(effect=>effect.id===id))return;
    output.push({id,component,targetId,operation,targetInstanceId:gameUnit.identity.instanceId,...detail,source:effectSource,provenance:{rosterFact}});
  }
  function addReference(output,gameUnit,id,kind,effectSource){
    add(output,gameUnit,`reference:${kind}:${id}:${gameUnit.identity.instanceId}`,'ability',id,'reference',{canonicalReference:{kind,id}},effectSource);
  }
  function addWeapon(output,gameUnit,id,targetId,operation,detail,effectSource){
    if(!weaponReady(gameUnit))return;
    add(output,gameUnit,id,'weapon',targetId,operation,detail,effectSource);
  }
  function addAbility(output,gameUnit,effectId,targetId,title,effectSource){
    if(hasAbility(gameUnit,targetId)||hasAbility(gameUnit,title))return;
    add(output,gameUnit,effectId,'ability',targetId,'grant',{title},effectSource);
  }
  function addKeyword(output,gameUnit,id,title,effectSource){
    if(hasKeyword(gameUnit,title))return;
    add(output,gameUnit,id,'keyword',title,'grant',{},effectSource);
  }
  function addStat(output,gameUnit,id,targetId,operation,value,effectSource){
    const stats=gameUnit?.item?.catalogUnit?.gameSelections?.stats||{},base=Object.entries(stats).find(([key])=>normalize(key)===normalize(targetId))?.[1];
    if(base==null)return;
    add(output,gameUnit,id,'stat',targetId,operation,operation==='set'?{to:value}:{delta:value},effectSource);
  }

  function datasheetEffects(context,output){
    const mutationRules=[
      {unit:'unit-broodlord',rule:ids.viciousInsight,leading:true,tag:'DEVASTATING WOUNDS'},
      {unit:'unit-winged-tyranid-prime',rule:ids.alphaWarriorWinged,leading:true,tag:'SUSTAINED HITS 1'},
      {unit:'unit-tyranid-prime-with-lash-whip',rule:ids.alphaWarrior,leading:false,tag:'SUSTAINED HITS 1'},
      {unit:'unit-hyperadapted-raveners',rule:ids.alphaInvader,leading:false,tag:'SUSTAINED HITS 1'}
    ];
    for(const rule of mutationRules){
      const provider=sourceInGroup(context,rule.unit,rule.leading);if(!provider)continue;
      const effectSource=provider.identity.instanceId===context.gameUnit.identity.instanceId?source('datasheet',rule.rule,provider.identity.instanceId):source('explicit-attachment',rule.rule,provider.identity.instanceId);
      addWeapon(output,context.gameUnit,`${rule.rule}:${context.gameUnit.identity.instanceId}`,'all','grant-tag',{tag:rule.tag},effectSource);
    }
    const referenceRules=[
      {unit:'unit-neurotyrant',rule:ids.nodeLash,leading:true},
      {unit:'unit-old-one-eye',rule:ids.alphaLeader,leading:true},
      {unit:'unit-tyranid-prime-with-lash-whip',rule:ids.aggressiveLeader,leading:false},
      {unit:'unit-hyperadapted-raveners',rule:ids.hypersensory,leading:false},
      {unit:'unit-hive-tyrant',rule:ids.onslaught,leading:true},
      {unit:'unit-hive-tyrant',rule:ids.hiveMind,leading:true},
      {unit:'unit-the-swarmlord',rule:ids.domination,leading:true}
    ];
    for(const rule of referenceRules){
      const provider=sourceInGroup(context,rule.unit,rule.leading);if(!provider||provider.identity.instanceId===context.gameUnit.identity.instanceId)continue;
      addReference(output,context.gameUnit,rule.rule,'ability',source('explicit-attachment',rule.rule,provider.identity.instanceId));
    }
    if(context.gameUnit.identity.canonicalDatasheetId!=='unit-tyrant-guard'){
      const relation=list(context.gameUnit.attachments?.leading).filter(current).find(item=>item.canonicalUnitId==='unit-tyrant-guard');
      const provider=relation&&context.byInstance.get(relation.instanceId);
      if(provider)addAbility(output,context.gameUnit,`${ids.guardian}:${context.gameUnit.identity.instanceId}`,'core-feel-no-pain','Feel No Pain 5+',source('explicit-attachment',ids.guardian,provider.identity.instanceId));
    }
  }

  function enhancementEligible(id,owner){
    const exact=exactEnhancementOwners[id];if(exact)return exact.has(owner.identity.canonicalDatasheetId);
    if(['enhancement-enraged-reserves','enhancement-monstrous-nemesis','enhancement-null-nodules','enhancement-ominous-presence'].includes(id))return hasKeyword(owner,'MONSTER');
    if(id==='enhancement-regenerating-monstrosity')return !hasKeyword(owner,'MONSTER');
    if(['enhancement-chameleonic','enhancement-stalker'].includes(id))return hasKeyword(owner,'VANGUARD INVADER');
    if(id==='vanguard-intellect')return hasAbility(owner,'Deep Strike');
    if(['enhancement-psychostatic-disruption-aura','enhancement-synaptic-control','enhancement-the-dirgeheart-of-kharis-aura'].includes(id))return hasKeyword(owner,'SYNAPSE');
    if(id==='enhancement-power-of-the-hive-mind')return hasKeyword(owner,'PSYKER');
    return hasKeyword(owner,'TYRANIDS');
  }
  function enhancementMutations(id,context,output,effectSource){
    const unit=context.gameUnit;
    switch(id){
      case'destabilising-predation':addWeapon(output,unit,`${id}:anti-character`,'ranged','grant-tag',{tag:'ANTI-CHARACTER 2+'},effectSource);break;
      case'synaptoprescience':addStat(output,unit,`${id}:invulnerable`,'Invulnerable','set','4+',effectSource);break;
      case'elevated-might':addWeapon(output,unit,`${id}:ap`,'melee','add-stat',{stat:'AP',delta:-1},effectSource);break;
      case'trygon-prime':addKeyword(output,unit,`${id}:synapse`,'SYNAPSE',effectSource);addWeapon(output,unit,`${id}:strength`,'melee','add-stat',{stat:'S',delta:1},effectSource);addWeapon(output,unit,`${id}:weapon-skill`,'melee','add-stat',{stat:'WS',delta:-1},effectSource);break;
      case'enhancement-adaptive-biology':addAbility(output,unit,`${id}:feel-no-pain`,'core-feel-no-pain','Feel No Pain 5+',effectSource);break;
      case'enhancement-ominous-presence':addStat(output,unit,`${id}:oc`,'OC','add',3,effectSource);break;
      case'enhancement-relentless-hunger':addStat(output,unit,`${id}:move`,'M','add',2,effectSource);break;
      case'enhancement-parasitic-biomorphology':addWeapon(output,unit,`${id}:strength`,'melee','add-stat',{stat:'S',delta:1},effectSource);break;
      case'enhancement-chameleonic':addAbility(output,unit,`${id}:stealth`,'core-stealth','Stealth',effectSource);break;
      case'enhancement-power-of-the-hive-mind':addWeapon(output,unit,`${id}:strength`,'psychic','add-stat',{stat:'S',delta:1},effectSource);addWeapon(output,unit,`${id}:ap`,'psychic','add-stat',{stat:'AP',delta:-1},effectSource);break;
    }
  }
  function enhancementEffects(context,output){
    const group=groupIds(context.gameUnit,context.byInstance);
    for(const resolution of list(context.enhancements)){
      const id=canonicalId(resolution),owner=context.byInstance.get(ownerId(resolution));
      if(!id||!owner||!resolution.catalog||!enhancementEligible(id,owner))continue;
      const isOwner=owner.identity.instanceId===context.gameUnit.identity.instanceId,inGroup=group.has(owner.identity.instanceId);
      if(!isOwner&&(!inGroup||!unitScopeEnhancements.has(id)))continue;
      const effectSource=isOwner?source('enhancement',id,owner.identity.instanceId):source('explicit-attachment',id,owner.identity.instanceId);
      addReference(output,context.gameUnit,id,'enhancement',effectSource);
      if(isOwner||groupMutationEnhancements.has(id))enhancementMutations(id,context,output,effectSource);
    }
  }

  function detachmentApplies(id,gameUnit){
    const unitId=gameUnit.identity.canonicalDatasheetId;
    if(id==='ambush-predators')return ['unit-deathleaper','unit-lictor','unit-neurolictor'].includes(unitId);
    if(id==='talons-of-the-norn-queen')return ['unit-norn-emissary','unit-norn-assimilator'].includes(unitId);
    if(id==='crusher-stampede')return hasKeyword(gameUnit,'MONSTER');
    if(id==='unending-swarm')return hasKeyword(gameUnit,'ENDLESS MULTITUDE');
    if(id==='assimilation-swarm')return hasKeyword(gameUnit,'HARVESTER');
    return id!=='warrior-bioform-onslaught';
  }
  function detachmentEffects(context,output){
    for(const detachment of list(context.detachments)){
      const id=detachment.id,ruleId=detachmentRuleIds[id],effectSource=source('detachment',id);
      if(!ruleId)continue;
      if(id==='warrior-bioform-onslaught'){
        const unitId=context.gameUnit.identity.canonicalDatasheetId,warriors=['unit-tyranid-warriors-with-ranged-bio-weapons','unit-tyranid-warriors-with-melee-bio-weapons'],protectedUnits=[...warriors,'unit-tyranid-prime-with-lash-whip','unit-winged-tyranid-prime'];
        if(warriors.includes(unitId))addKeyword(output,context.gameUnit,`${ruleId}:battleline`,'BATTLELINE',effectSource);
        if(protectedUnits.includes(unitId))addStat(output,context.gameUnit,`${ruleId}:invulnerable`,'Invulnerable','set','5+',effectSource);
        continue;
      }
      if(!detachmentApplies(id,context.gameUnit))continue;
      addReference(output,context.gameUnit,ruleId,'detachment-rule',effectSource);
      if(id==='ambush-predators')addAbility(output,context.gameUnit,`${ruleId}:deep-strike`,'core-deep-strike','Deep Strike',effectSource);
    }
  }

  function gameEffects(context){
    const output=[];
    datasheetEffects(context,output);
    enhancementEffects(context,output);
    detachmentEffects(context,output);
    return output;
  }
  const api=Object.freeze({schema:'tyranids-roster-semantics/v1',gameEffects,ids:Object.freeze({...ids}),detachmentRuleIds:Object.freeze({...detachmentRuleIds})});
  root.TYRANIDS_ROSTER_SEMANTICS=api;
  const install=()=>{
    if(!root.WHArmyRosterContext)return false;
    root.WHArmyRosterContext.install({bookId:'tyranids',guideGlobal:'TYRANIDS_ROSTER_GUIDE',provider:{gameEffects}});
    return true;
  };
  if(!install())root.addEventListener('wh-roster-context-ready',install,{once:true});
}(window));
