(function(root){
  'use strict';

  const list=value=>Array.isArray(value)?value:[];
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const current=relation=>relation?.certainty==='current'&&relation?.provenance?.kind==='explicit-roster-attachment';
  const ids={
    cruelHunter:'chaos-space-marines-ability-cruel-hunter',
    fieryFaith:'chaos-space-marines-ability-fiery-faith',
    darkZealotry:'chaos-space-marines-ability-dark-zealotry',
    faithfulFlock:'chaos-space-marines-ability-faithful-flock',
    darkRitual:'chaos-space-marines-ability-dark-ritual',
    warpSightedButcher:'chaos-space-marines-ability-warp-sighted-butcher',
    daemonkin:'chaos-space-marines-ability-daemonkin-psychic',
    prescience:'chaos-space-marines-ability-prescience-psychic',
    warptime:'chaos-space-marines-ability-warptime-psychic',
    brutalExample:'chaos-space-marines-ability-brutal-example',
    enhancedWarriors:'chaos-space-marines-ability-enhanced-warriors',
    headTaker:'chaos-space-marines-ability-head-taker',
    headlongDestruction:'chaos-space-marines-ability-headlong-destruction',
    raidersDue:'chaos-space-marines-ability-raiders-due',
    fleetCommand:'chaos-space-marines-ability-fleet-command',
    plunder:'chaos-space-marines-ability-plunder',
    darkPacts:'chaos-space-marines-ability-dark-pacts'
  };
  const detachmentRuleIds={
    'cabal-of-chaos':'chaos-space-marines-detachment-rule-empyric-wellspring',
    'devotees-of-destruction':'chaos-space-marines-detachment-rule-rain-of-ruin',
    'murdertalon-raiders':'chaos-space-marines-detachment-rule-prey-on-the-weak',
    'warpstrike-champions':'chaos-space-marines-detachment-rule-warp-portals',
    'cult-of-the-arkifane':'chaos-space-marines-detachment-rule-soul-forge-boons',
    'creations-of-bile':'chaos-space-marines-detachment-rule-experimental-augmentations',
    'nightmare-hunt':'chaos-space-marines-detachment-rule-terror-made-manifest',
    'huron-s-marauders':'chaos-space-marines-detachment-rule-tyrannical-motivation',
    'renegade-warband':'chaos-space-marines-detachment-rule-slaves-to-none',
    'chaos-cult':'detachment-rule-chaos-cult-desperate-devotion',
    'dread-talons':'chaos-space-marines-detachment-rule-terror-descends-aura',
    'fellhammer-siege-host':'chaos-space-marines-detachment-rule-iron-fortitude',
    'pactbound-zealots':'chaos-space-marines-detachment-rule-marks-of-chaos',
    'renegade-raiders':'chaos-space-marines-detachment-rule-raiders-and-reavers',
    'soulforged-warpack':'detachment-rule-soulforged-warpack-debt-to-the-soul-forge',
    'veterans-of-the-long-war':'chaos-space-marines-detachment-rule-focus-of-hatred'
  };
  const groupReferenceEnhancements=new Set([
    'enhancement-amulet-of-tainted-vigour','enhancement-cultists-brand','enhancement-incendiary-goad','enhancement-warped-foresight',
    'enhancement-cybinfernal-font','enhancement-pact-of-destruction','enhancement-eye-of-oblivion','enhancement-nights-shroud',
    'enhancement-dread-talons-warp-fuelled-thrusters','enhancement-bastion-plate','enhancement-voice-of-the-tyrant','enhancement-raid-leader',
    'enhancement-dread-reputation','enhancement-shadowcowl-talisman','enhancement-greyveil-hex','enhancement-nightmare-hunt-warp-fuelled-thrusters',
    'enhancement-sorrowscent-vulture','enhancement-eye-of-tzeentch','enhancement-mark-of-the-hound','enhancement-tyrants-lash',
    'enhancement-eyes-of-the-hunter','enhancement-fratricidal-trophies','enhancement-empyric-symbiote','enhancement-eager-for-vengeance',
    'enhancement-infernal-fulgurite','enhancement-eye-of-the-warp','enhancement-akshurs-binding-runes'
  ]);
  const groupMutationEnhancements=new Set([
    'enhancement-warped-foresight','enhancement-cybinfernal-font','enhancement-nights-shroud','enhancement-shadowcowl-talisman',
    'enhancement-greyveil-hex','enhancement-sorrowscent-vulture','enhancement-mark-of-the-hound','enhancement-eyes-of-the-hunter'
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
  const source=(kind,id,ownerInstanceId)=>({kind,id,...(ownerInstanceId?{ownerInstanceId}:{})});

  function groupAnchor(gameUnit,byInstance){
    const relation=list(gameUnit.attachments?.leading).find(current);
    return relation?byInstance.get(relation.instanceId)||gameUnit:gameUnit;
  }
  function groupIds(gameUnit,byInstance){
    const anchor=groupAnchor(gameUnit,byInstance),output=new Set([anchor.identity.instanceId]);
    for(const relation of list(anchor.attachments?.leaders).filter(current))output.add(relation.instanceId);
    return output;
  }
  function sourceInGroup(context,canonicalUnitId,requiresLeading=true){
    const group=groupIds(context.gameUnit,context.byInstance),provider=[...group].map(id=>context.byInstance.get(id)).find(draft=>draft?.identity?.canonicalDatasheetId===canonicalUnitId);
    if(!provider||requiresLeading&&!list(provider.attachments?.leading).some(current))return null;
    return provider;
  }
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
  function addAbility(output,gameUnit,effectId,targetId,title,effectSource,operation='grant'){
    if(operation==='grant'&&(hasAbility(gameUnit,targetId)||hasAbility(gameUnit,title)))return;
    add(output,gameUnit,effectId,'ability',targetId,operation,{title},effectSource);
  }
  function addKeyword(output,gameUnit,id,title,effectSource,operation='grant'){
    if(operation==='grant'&&hasKeyword(gameUnit,title))return;
    add(output,gameUnit,id,'keyword',title,operation,{},effectSource);
  }
  function addStat(output,gameUnit,id,targetId,operation,value,effectSource){
    const stats=gameUnit?.item?.catalogUnit?.gameSelections?.stats||{},base=Object.entries(stats).find(([key])=>normalize(key)===normalize(targetId))?.[1];
    if(base==null)return;
    add(output,gameUnit,id,'stat',targetId,operation,operation==='set'?{to:value}:{delta:value},effectSource);
  }
  function addBestInvulnerable(output,gameUnit,id,value,effectSource){
    const base=String(gameUnit?.item?.catalogUnit?.gameSelections?.stats?.Invulnerable||''),currentValue=Number.parseInt(base,10),next=Number.parseInt(value,10);
    if(Number.isFinite(currentValue)&&currentValue<=next)return;
    addStat(output,gameUnit,id,'Invulnerable','set',value,effectSource);
  }

  function datasheetEffects(context,output){
    const references=[
      ['unit-chaos-lord-with-jump-pack',ids.cruelHunter],['unit-cultist-firebrand',ids.fieryFaith],['unit-dark-apostle',ids.darkZealotry],
      ['unit-dark-commune',ids.darkRitual],['unit-master-of-executions',ids.warpSightedButcher],['unit-master-of-possession',ids.daemonkin],
      ['unit-sorcerer',ids.prescience],['unit-sorcerer-in-terminator-armour',ids.warptime],['unit-traitor-enforcer',ids.brutalExample],
      ['unit-haarken-worldclaimer',ids.headTaker],['unit-kravek-morne',ids.headlongDestruction],['unit-red-corsairs-reave-captain',ids.raidersDue],
      ['unit-masters-of-the-maelstrom',ids.fleetCommand],['unit-masters-of-the-maelstrom',ids.plunder]
    ];
    for(const [unitId,ruleId] of references){
      const provider=sourceInGroup(context,unitId,true);if(!provider||provider.identity.instanceId===context.gameUnit.identity.instanceId)continue;
      addReference(output,context.gameUnit,ruleId,'ability',source('explicit-attachment',ruleId,provider.identity.instanceId));
    }
    const commune=sourceInGroup(context,'unit-dark-commune',true);
    if(commune){
      const effectSource=source(commune.identity.instanceId===context.gameUnit.identity.instanceId?'datasheet':'explicit-attachment',ids.faithfulFlock,commune.identity.instanceId);
      if(commune.identity.instanceId!==context.gameUnit.identity.instanceId)addReference(output,context.gameUnit,ids.faithfulFlock,'ability',effectSource);
      addBestInvulnerable(output,context.gameUnit,`${ids.faithfulFlock}:${context.gameUnit.identity.instanceId}`,'5+',effectSource);
    }
    const fabius=sourceInGroup(context,'unit-fabius-bile',true),anchor=groupAnchor(context.gameUnit,context.byInstance);
    if(fabius&&anchor.identity.instanceId===context.gameUnit.identity.instanceId){
      const effectSource=source('explicit-attachment',ids.enhancedWarriors,fabius.identity.instanceId);
      addStat(output,context.gameUnit,`${ids.enhancedWarriors}:toughness`,'T','add',1,effectSource);
      addWeapon(output,context.gameUnit,`${ids.enhancedWarriors}:strength`,'melee','add-stat',{stat:'S',delta:1},effectSource);
    }
  }

  function enhancementEligible(id,owner){
    if(!hasKeyword(owner,'HERETIC ASTARTES')||hasKeyword(owner,'EPIC HERO'))return false;
    switch(id){
      case'enhancement-touched-by-the-warp':return !hasKeyword(owner,'KHORNE');
      case'enhancement-conduit-of-chaos':return hasKeyword(owner,'DAEMON')&&!hasKeyword(owner,'KHORNE');
      case'enhancement-amulet-of-tainted-vigour':return hasKeyword(owner,'DARK APOSTLE');
      case'enhancement-pact-of-destruction':case'enhancement-eye-of-oblivion':case'enhancement-crown-of-worms':case'enhancement-invigorated-mechatendrils':return hasKeyword(owner,'WARPSMITH');
      case'enhancement-cultists-brand':case'enhancement-incendiary-goad':case'enhancement-warped-foresight':return hasKeyword(owner,'DARK APOSTLE')||hasKeyword(owner,'DAMNED');
      case'enhancement-surgical-precision':return !hasKeyword(owner,'DAMNED');
      case'enhancement-living-carapace':case'enhancement-greyveil-hex':case'enhancement-warmasters-gift':return hasKeyword(owner,'CHAOS LORD');
      case'enhancement-helm-of-all-seeing':case'enhancement-prime-test-subject':return hasKeyword(owner,'INFANTRY')&&!hasKeyword(owner,'DAMNED');
      case'enhancement-wyredjinn':case'enhancement-cybinfernal-font':case'enhancement-mark-of-the-soul-forges':return !hasKeyword(owner,'DAMNED');
      case'enhancement-cursed-fang':case'enhancement-shroud-of-obfuscation':case'enhancement-soul-link':case'enhancement-iron-artifice':return hasKeyword(owner,'INFANTRY');
      case'enhancement-falsehood':return hasKeyword(owner,'CHAOS LORD')&&!hasKeyword(owner,'TERMINATOR')&&!hasKeyword(owner,'JUMP PACK');
      case'enhancement-nights-shroud':return hasKeyword(owner,'CHAOS LORD')&&!hasKeyword(owner,'TERMINATOR');
      case'enhancement-dread-talons-warp-fuelled-thrusters':case'enhancement-nightmare-hunt-warp-fuelled-thrusters':case'enhancement-sorrowscent-vulture':case'enhancement-shadowcowl-talisman':case'enhancement-pact-of-cursed-pinions':return owner.identity.canonicalDatasheetId==='unit-chaos-lord-with-jump-pack';
      case'enhancement-bastion-plate':return hasKeyword(owner,'CHAOS LORD')&&!hasKeyword(owner,'JUMP PACK');
      case'enhancement-fratricidal-trophies':return hasKeyword(owner,'TERMINATOR');
      case'enhancement-eye-of-tzeentch':return hasKeyword(owner,'TZEENTCH');
      case'enhancement-intoxicating-elixir':return hasKeyword(owner,'SLAANESH');
      case'enhancement-orbs-of-unlife':return hasKeyword(owner,'NURGLE');
      case'enhancement-talisman-of-burning-blood':return hasKeyword(owner,'KHORNE');
      case'enhancement-infernal-fulgurite':case'enhancement-eye-of-the-warp':case'enhancement-akshurs-binding-runes':case'enhancement-tzagulla':return hasAbility(owner,'Deep Strike');
      default:return true;
    }
  }
  function enhancementMutations(id,context,output,effectSource){
    const unit=context.gameUnit;
    switch(id){
      case'enhancement-touched-by-the-warp':addKeyword(output,unit,`${id}:psyker`,'PSYKER',effectSource);addWeapon(output,unit,`${id}:psychic`,'all','grant-tag',{tag:'PSYCHIC'},effectSource);break;
      case'enhancement-conduit-of-chaos':addWeapon(output,unit,`${id}:lance`,'melee','grant-tag',{tag:'LANCE'},effectSource);break;
      case'enhancement-surgical-precision':addWeapon(output,unit,`${id}:precision`,'melee','grant-tag',{tag:'PRECISION'},effectSource);break;
      case'enhancement-living-carapace':addStat(output,unit,`${id}:wounds`,'W','add',1,effectSource);addAbility(output,unit,`${id}:feel-no-pain`,'core-feel-no-pain','Feel No Pain 5+',effectSource);break;
      case'enhancement-prime-test-subject':addWeapon(output,unit,`${id}:damage`,'melee','add-stat',{stat:'D',delta:1},effectSource);break;
      case'enhancement-cybinfernal-font':addKeyword(output,unit,`${id}:soul-forge`,'SOUL FORGE',effectSource);break;
      case'enhancement-cursed-fang':addWeapon(output,unit,`${id}:ap`,'melee','add-stat',{stat:'AP',delta:-1},effectSource);addWeapon(output,unit,`${id}:precision`,'melee','grant-tag',{tag:'PRECISION'},effectSource);break;
      case'enhancement-shroud-of-obfuscation':addAbility(output,unit,`${id}:stealth`,'core-stealth','Stealth',effectSource);addAbility(output,unit,`${id}:lone-operative`,'core-lone-operative','Lone Operative',effectSource);break;
      case'enhancement-nights-shroud':case'enhancement-greyveil-hex':addAbility(output,unit,`${id}:stealth`,'core-stealth','Stealth',effectSource);break;
      case'enhancement-iron-artifice':addWeapon(output,unit,`${id}:anti-vehicle`,'all','grant-tag',{tag:'ANTI-VEHICLE 4+'},effectSource);addWeapon(output,unit,`${id}:anti-fortification`,'all','grant-tag',{tag:'ANTI-FORTIFICATION 4+'},effectSource);break;
      case'enhancement-eager-for-bloodshed':addAbility(output,unit,`${id}:infiltrators`,'core-infiltrators','Infiltrators',effectSource);break;
      case'enhancement-shadowcowl-talisman':addBestInvulnerable(output,unit,`${id}:invulnerable`,'5+',effectSource);break;
      case'enhancement-pact-of-cursed-pinions':addKeyword(output,unit,`${id}:daemon`,'DAEMON',effectSource);addWeapon(output,unit,`${id}:attacks`,'melee','add-stat',{stat:'A',delta:1},effectSource);break;
      case'enhancement-sorrowscent-vulture':case'enhancement-mark-of-the-hound':addAbility(output,unit,`${id}:scouts`,'core-scouts','Scouts 6"',effectSource);break;
      case'enhancement-intoxicating-elixir':addAbility(output,unit,`${id}:feel-no-pain`,'core-feel-no-pain','Feel No Pain 5+',effectSource);break;
      case'enhancement-talisman-of-burning-blood':addWeapon(output,unit,`${id}:attacks`,'melee','add-stat',{stat:'A',delta:1},effectSource);addWeapon(output,unit,`${id}:strength`,'melee','add-stat',{stat:'S',delta:1},effectSource);break;
      case'enhancement-eyes-of-the-hunter':addWeapon(output,unit,`${id}:ignores-cover`,'ranged','grant-tag',{tag:'IGNORES COVER'},effectSource);break;
      case'enhancement-invigorated-mechatendrils':addStat(output,unit,`${id}:move`,'M','add',4,effectSource);break;
      case'enhancement-tzagulla':addWeapon(output,unit,`${id}:attacks`,'all','add-stat',{stat:'A',delta:1},effectSource);addWeapon(output,unit,`${id}:strength`,'all','add-stat',{stat:'S',delta:1},effectSource);addWeapon(output,unit,`${id}:ap`,'all','add-stat',{stat:'AP',delta:-1},effectSource);break;
      case'enhancement-warped-foresight':{
        const anchor=groupAnchor(unit,context.byInstance);if(hasAbility(anchor,'Scouts 6"'))addAbility(output,unit,`${id}:scouts`,'core-scouts','Scouts 6"',effectSource);break;
      }
    }
  }
  function enhancementEffects(context,output){
    const group=groupIds(context.gameUnit,context.byInstance);
    for(const resolution of list(context.enhancements)){
      const id=canonicalId(resolution),owner=context.byInstance.get(ownerId(resolution));
      if(!id||!owner||!resolution.catalog||!enhancementEligible(id,owner))continue;
      const isOwner=owner.identity.instanceId===context.gameUnit.identity.instanceId,inGroup=group.has(owner.identity.instanceId);
      if(!isOwner&&(!inGroup||!groupReferenceEnhancements.has(id)))continue;
      const effectSource=source(isOwner?'enhancement':'explicit-attachment',id,owner.identity.instanceId);
      addReference(output,context.gameUnit,id,'enhancement',effectSource);
      if(isOwner||groupMutationEnhancements.has(id))enhancementMutations(id,context,output,effectSource);
    }
  }

  function groupHasEnhancement(context,id){
    const group=groupIds(context.gameUnit,context.byInstance);
    return list(context.enhancements).some(resolution=>canonicalId(resolution)===id&&group.has(ownerId(resolution))&&resolution.catalog);
  }
  function detachmentEffects(context,output){
    for(const detachment of list(context.detachments)){
      const id=detachment.id,ruleId=detachmentRuleIds[id],unit=context.gameUnit,effectSource=source('detachment',id);
      if(!ruleId)continue;
      if(id==='cabal-of-chaos'){
        const psychic=hasKeyword(unit,'PSYKER')&&!hasKeyword(unit,'DAEMON'),prince=(hasKeyword(unit,'DAEMON PRINCE')||hasKeyword(unit,'DAEMON PRINCE WITH WINGS'))&&!hasKeyword(unit,'KHORNE');
        if(psychic||prince)addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='devotees-of-destruction'){
        if(['unit-havocs','unit-obliterators'].includes(unit.identity.canonicalDatasheetId))addWeapon(output,unit,`${ruleId}:heavy`,'ranged','grant-tag',{tag:'HEAVY'},effectSource);continue;
      }
      if(id==='murdertalon-raiders'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&hasKeyword(unit,'INFANTRY')&&hasKeyword(unit,'FLY'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='warpstrike-champions'){
        if(['unit-chaos-terminator-squad','unit-obliterators','unit-mutilators'].includes(unit.identity.canonicalDatasheetId)||hasKeyword(unit,'TERMINATOR'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='cult-of-the-arkifane'){
        const vehicle=hasKeyword(unit,'VEHICLE'),nativeSoulForge=vehicle||['unit-lord-discordant-on-helstalker','unit-vashtorr-the-arkifane'].includes(unit.identity.canonicalDatasheetId),font=groupHasEnhancement(context,'enhancement-cybinfernal-font');
        if(vehicle)addKeyword(output,unit,`${ruleId}:daemon`,'DAEMON',effectSource);
        if(nativeSoulForge)addKeyword(output,unit,`${ruleId}:soul-forge`,'SOUL FORGE',effectSource);
        if(nativeSoulForge||font)addBestInvulnerable(output,unit,`${ruleId}:invulnerable`,'5+',effectSource);
        continue;
      }
      if(id==='creations-of-bile'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&hasKeyword(unit,'INFANTRY')&&!hasKeyword(unit,'DAMNED'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='nightmare-hunt'){
        if(hasKeyword(unit,'HERETIC ASTARTES'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='huron-s-marauders'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&hasKeyword(unit,'INFANTRY'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='renegade-warband'){
        if(hasKeyword(unit,'HERETIC ASTARTES')){
          addAbility(output,unit,`${ruleId}:dark-pacts`,ids.darkPacts,'Dark Pacts',effectSource,'remove');
          addWeapon(output,unit,`${ruleId}:assault`,'ranged','grant-tag',{tag:'ASSAULT'},effectSource);
          addReference(output,unit,ruleId,'detachment-rule',effectSource);
        }
        continue;
      }
      if(id==='chaos-cult'){
        if(hasKeyword(unit,'DAMNED'))addReference(output,unit,ruleId,'detachment-rule',effectSource);
        if(unit.identity.canonicalDatasheetId==='unit-traitor-guardsmen-squad')addKeyword(output,unit,`${ruleId}:battleline`,'BATTLELINE',effectSource);
        continue;
      }
      if(id==='dread-talons'){
        if(hasKeyword(unit,'HERETIC ASTARTES'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='fellhammer-siege-host'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&!hasKeyword(unit,'DAMNED'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='pactbound-zealots'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&['KHORNE','TZEENTCH','NURGLE','SLAANESH','CHAOS UNDIVIDED'].some(mark=>hasKeyword(unit,mark)))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='renegade-raiders'){
        if(hasKeyword(unit,'HERETIC ASTARTES')){addWeapon(output,unit,`${ruleId}:assault`,'ranged','grant-tag',{tag:'ASSAULT'},effectSource);addReference(output,unit,ruleId,'detachment-rule',effectSource);}continue;
      }
      if(id==='soulforged-warpack'){
        if(hasKeyword(unit,'HERETIC ASTARTES')&&hasKeyword(unit,'DAEMON')&&hasKeyword(unit,'VEHICLE'))addReference(output,unit,ruleId,'detachment-rule',effectSource);continue;
      }
      if(id==='veterans-of-the-long-war'&&hasKeyword(unit,'HERETIC ASTARTES')&&!hasKeyword(unit,'DAMNED'))addReference(output,unit,ruleId,'detachment-rule',effectSource);
    }
  }

  function gameEffects(context){
    const output=[];
    datasheetEffects(context,output);
    enhancementEffects(context,output);
    detachmentEffects(context,output);
    return output;
  }
  const api=Object.freeze({schema:'chaos-space-marines-roster-semantics/v1',gameEffects,ids:Object.freeze({...ids}),detachmentRuleIds:Object.freeze({...detachmentRuleIds})});
  root.CSM_ROSTER_SEMANTICS=api;
  const install=()=>{
    if(!root.WHArmyRosterContext)return false;
    root.WHArmyRosterContext.install({bookId:'chaos-space-marines',guideGlobal:'CSM_ROSTER_GUIDE',provider:{gameEffects}});
    return true;
  };
  if(!install())root.addEventListener('wh-roster-context-ready',install,{once:true});
}(window));
