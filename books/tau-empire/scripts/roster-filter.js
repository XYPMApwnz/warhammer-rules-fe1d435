(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const list=value=>Array.isArray(value)?value:[];
  const ABILITY=Object.freeze({volley:'tau-empire-ability-volley-fire',coldstar:'tau-empire-ability-coldstar-commander',enforcer:'tau-empire-ability-enforcer-commander',ethereal:'tau-empire-ability-failure-is-not-an-option',feasting:'tau-empire-ability-rites-of-feasting',butchery:'tau-empire-ability-ritual-butchery',shortBlade:'tau-empire-ability-way-of-the-short-blade',puretide:'tau-empire-ability-puretides-teachings',structural:'tau-empire-ability-structural-analyser',ambush:'tau-empire-ability-kroot-ambush',trail:'tau-empire-ability-trail-finding',warLeader:'tau-empire-ability-war-leader'});
  const ENHANCEMENT=Object.freeze({precision:'enhancement-precision-of-the-patient-hunter',exemplarKauyon:'enhancement-exemplar-of-the-kauyon',throughUnity:'enhancement-through-unity-devastation',borthrod:'enhancement-borthrod-gland',kroothawk:'enhancement-kroothawk-flock',nomadic:'enhancement-nomadic-hunter',rootCarved:'enhancement-root-carved-weapons',coordinated:'enhancement-coordinated-exploitation',exemplarMontka:'enhancement-exemplar-of-the-montka',grenades:'enhancement-internal-grenade-racks'});
  const DETACHMENT_RULE=Object.freeze({fieldcraft:'tau-empire-detachment-rule-expert-fieldcraft',integrated:'tau-empire-detachment-rule-integrated-command-structure',craftsmanship:'tau-empire-detachment-rule-superior-craftsmanship',patient:'tau-empire-detachment-rule-patient-hunter',kroot:'tau-empire-detachment-rule-hunters-instincts-skirmish-fighters',killing:'tau-empire-detachment-rule-killing-blow',bonded:'tau-empire-detachment-rule-bonded-heroes'});
  const UNIT=Object.freeze({fireblade:'unit-cadre-fireblade',coldstar:'unit-commander-in-coldstar-battlesuit',enforcer:'unit-commander-in-enforcer-battlesuit',ethereal:'unit-ethereal',flesh:'unit-kroot-flesh-shaper',farsight:'unit-commander-farsight',darkstrider:'unit-darkstrider',trail:'unit-kroot-trail-shaper',war:'unit-kroot-war-shaper'});
  const detachmentId=value=>normalize(value).replace(/^detachment /,'').replace(/ /g,'-');
  const canonicalId=draft=>draft?.identity?.canonicalDatasheetId||draft?.item?.catalogUnit?.id||'';
  const keywordValues=profile=>{const removed=new Set(list(profile?.removed).map(item=>normalize(item?.title||item)));return[...new Set([...list(profile?.effective),...list(profile?.intrinsic),...list(profile?.added)].map(item=>item?.title||item).filter(item=>item&&!removed.has(normalize(item))))];};
  const keyword=(draft,value)=>keywordValues(draft?.rosterState?.keywordProfile).some(item=>normalize(item)===normalize(value));
  const attachedGroup=(draft,byInstance)=>{let bodyguard=draft;if(list(draft?.attachments?.leading).length)bodyguard=byInstance.get(draft.attachments.leading[0].instanceId);if(!bodyguard||!list(bodyguard.attachments?.leaders).length)return null;return[bodyguard,...bodyguard.attachments.leaders.map(item=>byInstance.get(item.instanceId)).filter(Boolean)];};
  const ownerResolution=(enhancements,id)=>list(enhancements).find(item=>item?.input?.ownerStatus==='resolved'&&item?.catalog?.id===id);
  const profileByTitle=(draft,title)=>list(draft?.item?.catalogUnit?.gameSelections?.weaponProfiles).find(profile=>normalize(profile.title)===normalize(title));
  const hasWargear=(draft,title)=>{const ids=new Set(list(draft?.selection?.loadout?.selectedWargearAbilityIds)),abilities=list(draft?.item?.catalogUnit?.gameSelections?.wargearAbilities);return abilities.some(ability=>ids.has(ability.id)&&normalize(ability.title)===normalize(title));};
  const source=(kind,id,ownerInstanceId=null,rosterFact=kind)=>({source:{kind,id,ownerInstanceId},provenance:{rosterFact}});
  const effect=(id,component,targetId,operation,detail={},origin={})=>({id,component,targetId,operation,...detail,...origin});
  const reference=(kind,id,origin)=>effect(`canonical-${id}`,'ability',id,'reference',{canonicalReference:{kind,id},...(kind==='ability'?{canonicalAbilityId:id}:{}),state:'reference'},origin);
  const stat=(id,targetId,operation,value,origin)=>effect(id,'stat',targetId,operation,operation==='add'?{delta:value}:{to:value},origin);
  const weapon=(id,targetId,operation,detail,origin)=>effect(id,'weapon',targetId,operation,detail,origin);
  const ability=(id,targetId,title,origin)=>effect(id,'ability',targetId,'grant',{title},origin);
  const projectEffects=context=>{
    const {gameUnit:draft,byInstance,enhancements}=context,output=[],group=attachedGroup(draft,byInstance),bodyguard=group?.[0]||null,leaders=group?group.slice(1):[],cardId=canonicalId(draft),attachmentOrigin=(id,leader)=>source('explicit-attachment',id,leader.identity.instanceId,'explicit-attachment');
    const leader=id=>leaders.find(item=>canonicalId(item)===id)||null;
    const bodyReference=(ruleId,owner)=>{if(bodyguard&&draft===bodyguard)output.push(reference('ability',ruleId,attachmentOrigin(ruleId,owner)));};
    const fireblade=leader(UNIT.fireblade);if(fireblade)output.push(weapon('volley-fire','ranged','add-stat',{stat:'A',delta:1},attachmentOrigin(ABILITY.volley,fireblade)));
    const coldstar=leader(UNIT.coldstar);if(coldstar){output.push(stat('coldstar-move','M','set','12"',attachmentOrigin(ABILITY.coldstar,coldstar)));output.push(weapon('coldstar-assault','ranged','grant-tag',{tag:'ASSAULT',termId:'core-assault'},attachmentOrigin(ABILITY.coldstar,coldstar)));}
    const enforcer=leader(UNIT.enforcer);if(enforcer)bodyReference(ABILITY.enforcer,enforcer);
    const ethereal=leader(UNIT.ethereal);if(ethereal)output.push(ability('ethereal-fnp','core-feel-no-pain','Feel No Pain 5+',attachmentOrigin(ABILITY.ethereal,ethereal)));
    const flesh=leader(UNIT.flesh);if(flesh){output.push(ability('rites-fnp','core-feel-no-pain','Feel No Pain 6+',attachmentOrigin(ABILITY.feasting,flesh)));output.push(weapon('ritual-butchery','melee','grant-tag',{tag:'SUSTAINED HITS 1',termId:'core-sustained-hits'},attachmentOrigin(ABILITY.butchery,flesh)));if(draft===bodyguard)output.push(reference('ability',ABILITY.feasting,attachmentOrigin(ABILITY.feasting,flesh)));}
    const farsight=leader(UNIT.farsight);if(farsight){bodyReference(ABILITY.shortBlade,farsight);bodyReference(ABILITY.puretide,farsight);}
    const darkstrider=leader(UNIT.darkstrider);if(darkstrider)bodyReference(ABILITY.structural,darkstrider);
    const trail=leader(UNIT.trail);if(trail){bodyReference(ABILITY.ambush,trail);bodyReference(ABILITY.trail,trail);}
    const war=leader(UNIT.war);if(war)bodyReference(ABILITY.warLeader,war);

    const detachments=new Set(list(draft?.rosterState?.detachments).map(detachmentId)),detachmentOrigin=id=>source('detachment',id,null,'selected-detachment');
    if(detachments.has('advanced-acquisition-cadre')&&['unit-pathfinder-team','unit-stealth-battlesuits'].includes(cardId))output.push(reference('detachment-rule',DETACHMENT_RULE.fieldcraft,detachmentOrigin('advanced-acquisition-cadre')));
    if(detachments.has('auxiliary-cadre')&&(keyword(draft,'KROOT')||cardId==='unit-vespid-stingwings'||['unit-ghostkeel-battlesuit','unit-stealth-battlesuits'].includes(cardId)))output.push(reference('detachment-rule',DETACHMENT_RULE.integrated,detachmentOrigin('auxiliary-cadre')));
    if(detachments.has('experimental-prototype-cadre')&&keyword(draft,'BATTLESUIT')&&keyword(draft,'CHARACTER'))output.push(weapon('superior-craftsmanship','ranged','add-stat',{stat:'Range',delta:6},detachmentOrigin('experimental-prototype-cadre')));
    if(detachments.has('kauyon')&&keyword(draft,"T'AU EMPIRE"))output.push(reference('detachment-rule',DETACHMENT_RULE.patient,detachmentOrigin('kauyon')));
    if(detachments.has('kroot-hunting-pack')&&keyword(draft,'KROOT'))output.push(reference('detachment-rule',DETACHMENT_RULE.kroot,detachmentOrigin('kroot-hunting-pack')));
    if(detachments.has('montka')&&keyword(draft,"T'AU EMPIRE"))output.push(reference('detachment-rule',DETACHMENT_RULE.killing,detachmentOrigin('montka')));
    if(detachments.has('retaliation-cadre')&&keyword(draft,'BATTLESUIT'))output.push(reference('detachment-rule',DETACHMENT_RULE.bonded,detachmentOrigin('retaliation-cadre')));

    const enhancement=(id,{attached=false}={})=>{const resolution=ownerResolution(enhancements,id);if(!resolution)return null;const owner=byInstance.get(resolution.input.ownerUnitId);if(!owner)return null;if(attached&&(!group||!group.includes(owner)))return null;if(!attached&&owner!==draft)return null;return owner;};
    const enhancementOrigin=(id,owner,attached=false)=>source(attached?'explicit-attachment':'enhancement',id,owner.identity.instanceId,'enhancement-owner');
    const attachedEnhancementReference=id=>{const owner=enhancement(id,{attached:true});if(owner&&draft===bodyguard)output.push(reference('enhancement',id,enhancementOrigin(id,owner,true)));return owner;};
    const precision=enhancement(ENHANCEMENT.precision);if(precision)output.push(reference('enhancement',ENHANCEMENT.precision,enhancementOrigin(ENHANCEMENT.precision,precision)));
    attachedEnhancementReference(ENHANCEMENT.exemplarKauyon);attachedEnhancementReference(ENHANCEMENT.throughUnity);attachedEnhancementReference(ENHANCEMENT.coordinated);attachedEnhancementReference(ENHANCEMENT.exemplarMontka);
    const borthrod=enhancement(ENHANCEMENT.borthrod,{attached:true});if(borthrod)output.push(weapon('borthrod-critical','melee','grant-tag',{tag:'CRITICAL HITS 5+'},enhancementOrigin(ENHANCEMENT.borthrod,borthrod,true)));
    const kroothawk=enhancement(ENHANCEMENT.kroothawk,{attached:true});if(kroothawk){output.push(weapon('kroothawk-cover','ranged','grant-tag',{tag:'IGNORES COVER',termId:'core-ignores-cover'},enhancementOrigin(ENHANCEMENT.kroothawk,kroothawk,draft!==kroothawk)));if(draft===bodyguard)output.push(reference('enhancement',ENHANCEMENT.kroothawk,enhancementOrigin(ENHANCEMENT.kroothawk,kroothawk,true)));}
    const nomadic=enhancement(ENHANCEMENT.nomadic,{attached:true});if(nomadic){output.push(stat('nomadic-move','M','add',3,enhancementOrigin(ENHANCEMENT.nomadic,nomadic,draft!==nomadic)));output.push(weapon('nomadic-assault','ranged','grant-tag',{tag:'ASSAULT',termId:'core-assault'},enhancementOrigin(ENHANCEMENT.nomadic,nomadic,draft!==nomadic)));}
    const rootCarved=enhancement(ENHANCEMENT.rootCarved);if(rootCarved){output.push(weapon('root-carved-precision','all','grant-tag',{tag:'PRECISION',termId:'core-precision'},enhancementOrigin(ENHANCEMENT.rootCarved,rootCarved)));output.push(weapon('root-carved-devastating','all','grant-tag',{tag:'DEVASTATING WOUNDS',termId:'core-devastating-wounds'},enhancementOrigin(ENHANCEMENT.rootCarved,rootCarved)));}
    const grenades=enhancement(ENHANCEMENT.grenades);if(grenades){output.push(effect('internal-grenade-keyword','keyword','GRENADES','grant',{},enhancementOrigin(ENHANCEMENT.grenades,grenades)));output.push(reference('enhancement',ENHANCEMENT.grenades,enhancementOrigin(ENHANCEMENT.grenades,grenades)));}

    const selectedGroup=group||[draft],marker=selectedGroup.find(item=>hasWargear(item,'Marker Drone'));
    if(marker)output.push(effect('marker-drone-keyword','keyword','MARKERLIGHT','grant',{},source('selected-wargear','marker-drone',marker.identity.instanceId,'selected-wargear')));
    if(hasWargear(draft,'Shield Drone')&&draft.selection?.modelCount?.value===1)output.push(stat('shield-drone-wounds','W','add',1,source('selected-wargear','shield-drone',draft.identity.instanceId,'selected-wargear')));
    if(hasWargear(draft,'Hover Drone')){output.push(stat('hover-drone-move','M','set','10"',source('selected-wargear','hover-drone',draft.identity.instanceId,'selected-wargear')));output.push(effect('hover-drone-fly','keyword','FLY','grant',{},source('selected-wargear','hover-drone',draft.identity.instanceId,'selected-wargear')));}
    if(hasWargear(draft,'Shield Generator'))output.push(ability('shield-generator-invulnerable','core-invulnerable-save','Invulnerable Save 4+',source('selected-wargear','shield-generator',draft.identity.instanceId,'selected-wargear')));
    if(hasWargear(draft,'Pulse Accelerator Drone'))output.push(weapon('pulse-accelerator-range','pulse carbine','add-stat',{stat:'Range',delta:6},source('selected-wargear','pulse-accelerator-drone',draft.identity.instanceId,'selected-wargear')));
    if(hasWargear(draft,'Recon Drone')){output.push(ability('recon-drone-infiltrators','core-infiltrators','Infiltrators',source('selected-wargear','recon-drone',draft.identity.instanceId,'selected-wargear')));const profile=profileByTitle(draft,'Drone burst cannon');if(profile)output.push(weapon('recon-drone-profile','all','grant-profile',{profile},source('selected-wargear','recon-drone',draft.identity.instanceId,'selected-wargear')));}
    if(hasWargear(draft,'MV15 Gun Drone')){const profile=profileByTitle(draft,'Twin pulse blaster');if(profile)output.push(weapon('mv15-gun-drone-profile','all','grant-profile',{profile},source('selected-wargear','mv15-gun-drone',draft.identity.instanceId,'selected-wargear')));}
    if(hasWargear(draft,'Tidewall Defence Platform'))output.push(stat('defence-platform-wounds','W','set','15',source('selected-wargear','tidewall-defence-platform',draft.identity.instanceId,'selected-wargear')));
    return output;
  };
  const provider={keywordProfile(context,base){return{...base,effective:keywordValues(base)};},gameEffects:projectEffects,decorate(card,projection,items){root.WHBookRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw),{projectedEffects:items[0]?.game?.effects||[]});}};
  const run=()=>{if(!root.WHArmyRosterContext)return false;root.WHArmyRosterContext.install({bookId:'tau-empire',guideGlobal:'TAU_ROSTER_GUIDE',provider});return true;};
  root.TAURosterSemantics=Object.freeze({normalize,projectEffects,ABILITY,ENHANCEMENT,DETACHMENT_RULE});
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));
