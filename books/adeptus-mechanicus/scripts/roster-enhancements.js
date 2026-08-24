(function(root){
  'use strict';
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_POINTS_CATALOG?.['adeptus mechanicus']?.enhancements||{};
  const unitCatalog=()=>root.WH_POINTS_CATALOG?.['adeptus mechanicus']?.units||{};
  const canonicalEnhancements=()=>new Map(Object.values(root.WH40K_GLOSSARY?.forBook?.('adeptus-mechanicus')||{}).filter(item=>item.kind==='enhancement').map(item=>[normalize(item.title),{...item,ruleId:item.id.replace(/^adeptus-mechanicus-/,'')}]));
  const enriched=roster=>(roster?.enhancements||[]).map(raw=>{const entry=typeof raw==='string'?{name:raw,ownerStatus:'unresolved'}:raw,item=catalog()[normalize(entry.name)],canonical=canonicalEnhancements().get(normalize(item?.title||entry.name));return item?{...entry,...item,name:item.title,id:canonical?.ruleId||entry.id,ruleId:canonical?.ruleId||entry.ruleId||entry.id}:entry;});
  const detachmentSlug=value=>String(value||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const resolveDetachment=(labels,inventoryIds)=>{
    const requested=[...new Set((labels||[]).map(value=>detachmentSlug(String(value||'').replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean))];
    const matches=(inventoryIds||[]).filter(id=>id===requested[0]);
    return requested.length===1&&matches.length===1?requested[0]:'';
  };
  const resolveOwnership=(roster,units)=>{
    const enhancements=enriched(roster);
    const instances=(units||[]).map((unit,index)=>({
      unit,
      label:`${unit.name||'Roster unit'}${units.length>1?` #${index+1}`:''}`,
      points:Number(unit.points)||0,
      enhancements:enhancements.filter(entry=>entry.ownerStatus==='resolved'&&entry.ownerUnitId===unit.id)
    }));
    const signature=instance=>instance.enhancements.map(entry=>`${entry.ruleId||entry.id||normalize(entry.name)}:${entry.exportedCost??entry.points??''}`).sort().join('|');
    const equivalent=instances.every(instance=>signature(instance)===signature(instances[0]||{enhancements:[]}));
    return{instances,equivalent,cardEnhancements:equivalent?(instances[0]?.enhancements||[]):[],unresolved:enhancements.filter(entry=>entry.ownerStatus!=='resolved')};
  };
  const filterCompatibleRules=(rules,rosterMode,assignedRuleIds)=>rosterMode?(rules||[]).filter(rule=>rule.kind!=='enhancement'||assignedRuleIds?.has(rule.ruleId)):(rules||[]);
  const changeCell=(cell,delta)=>{
    if(!cell)return false;
    const raw=cell.dataset.rosterBase||cell.textContent.trim(),match=raw.match(/^-?\d+/),value=Number(match?.[0]);
    if(!Number.isFinite(value))return false;
    const total=(Number(cell.dataset.rosterDelta)||0)+delta,suffix=raw.slice(match[0].length);
    cell.dataset.rosterBase=raw;cell.dataset.rosterDelta=String(total);cell.textContent=`${value+total}${suffix} (${total>0?'+':''}${total})`;cell.classList.add('roster-modified');return true;
  };
  const numberCell=(row,label,delta)=>changeCell([...row.children].find(node=>node.dataset.label===label),delta);
  const modelStat=(card,label,delta)=>{let changed=false;for(const stat of card.querySelectorAll('.stat'))if(stat.querySelector('b')?.textContent.trim()===label)changed=changeCell(stat.querySelector('span'),delta)||changed;return changed;};
  const setModelStat=(card,label,value)=>{let changed=false;for(const stat of card.querySelectorAll('.stat'))if(stat.querySelector('b')?.textContent.trim()===label){const cell=stat.querySelector('span');if(cell){cell.textContent=value;cell.classList.add('roster-modified');changed=true;}}return changed;};
  const addAbility=(row,text,term)=>{
    const rootCell=row.firstElementChild;if(!rootCell)return false;
    const small=rootCell.querySelector('small')||rootCell.appendChild(document.createElement('small'));
    if([...small.querySelectorAll('.tag,.roster-added-rule')].some(node=>normalize(node.textContent)===normalize(text)))return true;
    if(small.textContent.trim())small.append(', ');
    const tag=document.createElement(term?'button':'span');if(term){tag.type='button';tag.dataset.term=term;tag.className='tag roster-added-rule';}else tag.className='roster-added-rule';tag.textContent=text;small.append(tag);return true;
  };
  const addKeyword=(card,text)=>{
    const list=card.querySelector('[id$="-keywords"] .keyword-list');if(!list)return false;
    const existing=[...list.children].find(node=>normalize(node.textContent)===normalize(text));if(existing){existing.classList.add('roster-added-keyword');return true;}
    const tag=document.createElement('span');tag.textContent=text;tag.className='roster-added-keyword';list.append(tag);return true;
  };
  const removeKeyword=(card,text)=>{const list=card.querySelector('[id$="-keywords"] .keyword-list');if(!list)return false;const tag=[...list.children].find(node=>normalize(node.textContent)===normalize(text));if(tag)tag.remove();return Boolean(tag);};
  const addAbilityCard=(card,title,text,ruleId)=>{
    const list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return false;
    const existing=[...list.querySelectorAll(':scope > .ability')].find(article=>normalize(article.querySelector('h5')?.textContent)===normalize(title));
    if(existing){existing.classList.add('roster-derived-ability');if(ruleId)existing.dataset.rosterRuleId=ruleId;return true;}
    const article=document.createElement('article');article.className='ability roster-derived-ability';if(ruleId)article.dataset.rosterRuleId=ruleId;
    const heading=document.createElement('h5'),body=document.createElement('p');heading.textContent=title;body.textContent=text;article.append(heading,body);list.prepend(article);return true;
  };
  const weaponRows=(card,mode)=>[...card.querySelectorAll('.weapon-group')].filter(group=>group.querySelector('h5')?.textContent.toLowerCase().startsWith(mode)).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
  const allWeaponRows=card=>[...card.querySelectorAll('.weapon-row:not(.weapon-head)')];
  const unitMeta=unit=>unitCatalog()[normalize(unit?.name)]||{};
  const unitId=unit=>unitMeta(unit).id||'';
  const once=(card,key)=>{card._amRosterEffects??=new Set();if(card._amRosterEffects.has(key))return false;card._amRosterEffects.add(key);return true;};
  const groupState=(roster,units,context={})=>{
    const current=units?.[0],attachments=context.attachments||{},unitById=context.unitById instanceof Map?context.unitById:new Map((roster?.units||[]).map(unit=>[unit.id,unit]));
    let bodyguardId=attachments[current?.id]?current.id:'';
    if(!bodyguardId)for(const [id,members] of Object.entries(attachments))if((members||[]).includes(current?.id)){bodyguardId=id;break;}
    const memberIds=bodyguardId?[bodyguardId,...(attachments[bodyguardId]||[])]:[current?.id],members=[...new Set(memberIds)].map(id=>unitById.get(id)).filter(Boolean);
    const ownKeywords=new Set(unitMeta(current).keywords||[]),unitKeywords=new Set(members.flatMap(unit=>unitMeta(unit).keywords||[]));
    return{current,members,bodyguard:unitById.get(bodyguardId),attached:Boolean(bodyguardId&&(attachments[bodyguardId]||[]).length),ownKeywords,unitKeywords,detachmentIds:new Set(context.detachmentIds||[])};
  };
  const addFeelNoPain=(card,value,ruleId)=>{
    const existing=[...card.querySelectorAll('[id$="-abilities"] .ability h5')].map(node=>Number(node.textContent.match(/Feel No Pain\s+(\d+)\+/i)?.[1])).filter(Number.isFinite);
    if(existing.some(current=>current<=value))return true;
    return addAbilityCard(card,`Feel No Pain ${value}+`,`Models represented by this roster card have Feel No Pain ${value}+.`,ruleId);
  };
  const setInvulnerable=(card,value)=>{
    let changed=false;
    for(const stat of card.querySelectorAll('.stat'))if(/^(Inv|Invulnerable Save)$/i.test(stat.querySelector('b')?.textContent.trim()||'')){const cell=stat.querySelector('span'),current=Number(cell?.textContent.match(/\d+/)?.[0]);if(cell&&(!Number.isFinite(current)||current>value)){cell.textContent=`${value}+`;cell.classList.add('roster-modified');changed=true;}}
    return changed;
  };
  const addProfile=(card,item)=>{
    const table=card.querySelector('.weapon-group .weapon-table');if(!table)return false;
    const p=item.profile||{name:'TL-409',range:'24"',a:'3',skill:'2+',s:'11',ap:'-2',d:'D3+2',abilities:'Devastating Wounds, Hazardous'};
    if([...table.querySelectorAll('.weapon-row:not(.weapon-head)')].some(row=>normalize(row.firstElementChild?.textContent).startsWith(normalize(p.name))))return true;
    const row=document.createElement('div');row.className='weapon-row roster-added-profile';row.innerHTML=`<div><b>${p.name}</b><small>${p.abilities}</small></div><div data-label="Range">${p.range}</div><div data-label="A">${p.a}</div><div data-label="BS">${p.skill}</div><div data-label="S">${p.s}</div><div data-label="AP">${p.ap}</div><div data-label="D">${p.d}</div>`;table.append(row);return true;
  };
  const applyImperatives=(card,state,ruleId)=>{
    if(!once(card,'both-doctrina-imperatives'))return;
    const ranged=weaponRows(card,'ranged'),melee=weaponRows(card,'melee');
    ranged.forEach(row=>{addAbility(row,'Heavy','core-heavy');addAbility(row,'Assault','core-assault');numberCell(row,'BS',-1);});
    melee.forEach(row=>numberCell(row,'WS',-1));
    if(state.unitKeywords.has('BATTLELINE')){
      [...ranged,...melee].forEach(row=>numberCell(row,'AP',-1));
      addAbilityCard(card,'Protector Imperative','While this BATTLELINE unit is targeted by a melee attack, subtract 1 from the Hit roll.',ruleId);
    }
  };
  const unitEnhancements=new Set([
    'enhancement-clandestine-infiltrator','enhancement-malphonic-susurrus','enhancement-peerless-eradicator','enhancement-temporcopia','enhancement-transoracular-dyad-wafers','enhancement-cognitive-reinforcement','enhancement-sanctified-ordnance','enhancement-explorator-dispensation','enhancement-vinghs-wafers-of-dynamism','enhancement-electromiasmic-brazier','enhancement-voltagheist-reliquary','enhancement-omnicogitator','enhancement-martial-signatum-amplificator','enhancement-belicosa-class-capacitor-vanes'
  ]);
  const leadingEnhancements=new Set(['enhancement-malphonic-susurrus','enhancement-peerless-eradicator']);
  function applyEnhancement(card,item,entry,state,owner){
    const id=entry.ruleId||entry.id||item.id||'';if(!id||!once(card,`${id}:${owner.id}`))return '';
    const ranged=weaponRows(card,'ranged'),melee=weaponRows(card,'melee');
    if(leadingEnhancements.has(id)&&!state.attached)return owner.id===state.current.id?'The bearer is not attached to a unit.':'';
    if(id==='enhancement-transoracular-dyad-wafers'&&(!state.attached||unitId(owner)!=='unit-cybernetica-datasmith'||!state.members.some(unit=>unitId(unit)==='unit-kastelan-robots')))return owner.id===state.current.id?'The Datasmith is not attached to Kastelan Robots.':'';
    if(id==='enhancement-vinghs-wafers-of-dynamism'&&!state.attached)return owner.id===state.current.id?'This roster unit is not Attached.':'';
    switch(id){
      case'enhancement-clandestine-infiltrator':addAbilityCard(card,'Infiltrators and Scouts 6"','Models represented by this roster card have Infiltrators and Scouts 6".',id);break;
      case'enhancement-malphonic-susurrus':case'enhancement-electromiasmic-brazier':addAbilityCard(card,'Stealth','This unit has Stealth.',id);break;
      case'enhancement-peerless-eradicator':ranged.forEach(row=>addAbility(row,'Sustained Hits 1','core-sustained-hits'));break;
      case'enhancement-autoclavic-denunciation':ranged.forEach(row=>{addAbility(row,'Anti-Infantry 2+','core-anti');addAbility(row,'Anti-Monster 4+','core-anti');});break;
      case'enhancement-mechanicus-locum':setModelStat(card,'Ld','6+');break;
      case'enhancement-mantle-of-the-gnosticarch':addAbilityCard(card,'Mantle of the Gnosticarch','Change the Damage characteristic of attacks allocated to the bearer to 1.',id);break;
      case'enhancement-temporcopia':addAbilityCard(card,'Fights First','This unit has Fights First.',id);break;
      case'enhancement-arch-negator':ranged.forEach(row=>addAbility(row,'Anti-Vehicle 4+','core-anti'));break;
      case'enhancement-transoracular-dyad-wafers':addKeyword(card,'HALO OVERRIDE');break;
      case'enhancement-cognitive-reinforcement':case'enhancement-omnicogitator':applyImperatives(card,state,id);break;
      case'enhancement-sanctified-ordnance':ranged.forEach(row=>numberCell(row,'Range',6));addAbilityCard(card,'Sanctified Ordnance','Hazardous tests for this unit can be re-rolled.',id);break;
      case'enhancement-inloaded-lethality':melee.forEach(row=>{numberCell(row,'A',3);numberCell(row,'D',1);});break;
      case'enhancement-explorator-dispensation':addAbilityCard(card,'Infiltrators','This unit has Infiltrators.',id);break;
      case'enhancement-vinghs-wafers-of-dynamism':addKeyword(card,'MOBILE');break;
      case'enhancement-tl-4-9':addProfile(card,item);break;
      case'enhancement-voltagheist-reliquary':addAbilityCard(card,'Voltagheist Reliquary','Enemy units cannot target this unit with Snap Shooting attacks.',id);break;
      case'enhancement-martial-signatum-amplificator':addKeyword(card,'SKITARII');break;
      case'enhancement-belicosa-class-capacitor-vanes':ranged.forEach(row=>{numberCell(row,'Range',6);numberCell(row,'S',1);});break;
      case'enhancement-omnissiahs-fury':melee.forEach(row=>{numberCell(row,'A',2);numberCell(row,'AP',-1);numberCell(row,'D',1);});break;
      case'enhancement-stealth-screened-cybercanids-upgrade':addAbilityCard(card,'Lone Operative 15"','This unit has Lone Operative while enemy models are more than 15" away.',id);break;
    }
    return '';
  }
  const projectAttachments=(card,state)=>{
    if(!state.attached)return;
    const ids=new Set(state.members.map(unitId));
    for(const source of state.members)switch(unitId(source)){
      case'unit-skitarii-marshal':addAbilityCard(card,'Control Edict','Models in this Attached Unit can re-roll Hit rolls.','datasheet-control-edict');break;
      case'unit-tech-priest-dominus':addFeelNoPain(card,state.unitKeywords.has('ELECTRO-PRIESTS')?4:5,'datasheet-lord-of-the-machine-cult');break;
      case'unit-tech-priest-manipulus':allWeaponRows(card).forEach(row=>addAbility(row,'Lethal Hits','core-lethal-hits'));break;
      case'unit-technoarcheologist':modelStat(card,'OC',1);break;
    }
    if(unitId(state.current)==='unit-cybernetica-datasmith'&&ids.has('unit-kastelan-robots')){removeKeyword(card,'INFANTRY');addFeelNoPain(card,4,'datasheet-robotic-bodyguard');}
    if(unitId(state.current)==='unit-kastelan-robots'&&ids.has('unit-cybernetica-datasmith')){modelStat(card,'T',1);addAbilityCard(card,'Aegis Protocol','This unit starts the battle in Aegis Protocol. A later Command phase selection can replace it.','datasheet-battle-protocols');}
    if(ids.has('unit-fulgurite-electro-priests')&&state.members.some(unit=>unitMeta(unit).keywords?.includes('CHARACTER')))addAbilityCard(card,'Electro-Infusion','While led, subtract 1 from Wound rolls for attacks that target this unit.','datasheet-electro-infusion');
  };
  const projectDetachment=(card,state)=>{
    const own=state.ownKeywords,unit=state.unitKeywords,active=state.detachmentIds;
    if(active.has('detachment-cohort-acquisitus')&&['PTERAXII','INFILTRATORS','RANGERS','SERBERYS RAIDERS','SERBERYS SULPHURHOUNDS'].some(keyword=>own.has(keyword)))addKeyword(card,'RECON AUGURY');
    if(active.has('detachment-lords-of-the-forge')&&own.has('TECH-PRIEST')){setInvulnerable(card,4);addFeelNoPain(card,5,'lords-of-the-forge-rule');}
    if(active.has('detachment-luminen-auto-choir')&&own.has('CORPUSCARII'))weaponRows(card,'ranged').forEach(row=>addAbility(row,'Lethal Hits','core-lethal-hits'));
    if(active.has('detachment-cohort-cybernetica')&&own.has('LEGIO CYBERNETICA')){modelStat(card,'M',2);addAbilityCard(card,'Cyber-psalm Programming','Add 1 to Objective Control unless this unit is Battle-shocked.','cohort-cybernetica-rule');}
    if(active.has('detachment-skitarii-hunter-cohort')&&((unit.has('SKITARII')&&(unit.has('INFANTRY')||unit.has('MOUNTED')))||unit.has('IRONSTRIDER BALLISTARII')))addAbilityCard(card,'Stealth','This unit has Stealth.','skitarii-hunter-cohort-rule');
  };
  const projectGameEffects=(roster,unit,context={})=>{
    const state=groupState(roster,[unit],context),output=[];
    const origin=(kind,id,ownerInstanceId=null,rosterFact=kind)=>({source:{kind,id,ownerInstanceId},provenance:{rosterFact}});
    const add=(id,component,targetId,operation,detail={},source={})=>output.push({id,component,targetId,operation,...detail,...source});
    const ability=(id,title,summary,source)=>add(id,'ability',id,'grant',{title,summary},source),stat=(id,targetId,operation,value,source)=>add(id,'stat',targetId,operation,operation==='add'?{delta:value}:{to:value},source),weapon=(id,scope,operation,detail,source)=>add(id,'weapon',scope,operation,detail,source);
    if(!state.current)return output;
    const ids=new Set(state.members.map(unitId));
    if(state.attached)for(const sourceUnit of state.members){const sourceId=unitId(sourceUnit),source=origin('explicit-attachment',`datasheet-${sourceId.replace(/^unit-/,'')}`,sourceUnit.id,'explicit-attachment');if(sourceId==='unit-skitarii-marshal')ability('control-edict','Control Edict','Models in this Attached Unit can re-roll Hit rolls.',source);if(sourceId==='unit-tech-priest-dominus')ability('lord-of-the-machine-cult',`Feel No Pain ${state.unitKeywords.has('ELECTRO-PRIESTS')?4:5}+`,`Models represented by this roster unit have Feel No Pain ${state.unitKeywords.has('ELECTRO-PRIESTS')?4:5}+.`,source);if(sourceId==='unit-tech-priest-manipulus')weapon('galvanic-field','all','grant-tag',{tag:'LETHAL HITS',termId:'core-lethal-hits'},source);if(sourceId==='unit-technoarcheologist')stat('technoarcheologist-oc','OC','add',1,source);}
    if(unitId(state.current)==='unit-cybernetica-datasmith'&&ids.has('unit-kastelan-robots')){add('robotic-bodyguard-remove-infantry','keyword','INFANTRY','remove',{},origin('explicit-attachment','datasheet-robotic-bodyguard',state.current.id,'explicit-attachment'));ability('robotic-bodyguard','Feel No Pain 4+','Models represented by this roster unit have Feel No Pain 4+.',origin('explicit-attachment','datasheet-robotic-bodyguard',state.current.id,'explicit-attachment'));}
    if(unitId(state.current)==='unit-kastelan-robots'&&ids.has('unit-cybernetica-datasmith')){const datasmith=state.members.find(member=>unitId(member)==='unit-cybernetica-datasmith'),source=origin('explicit-attachment','datasheet-battle-protocols',datasmith?.id,'explicit-attachment'),condition={kind:'battle-protocol',state:'unknown',requiredValue:'aegis'};add('aegis-protocol-toughness','stat','T','add',{delta:1,state:'conditional',certainty:'unknown',condition},source);add('aegis-protocol','ability','aegis-protocol','reference',{title:'Aegis Protocol',summary:'If Aegis Protocol is active, add 1 to this unit\'s Toughness characteristic.',state:'conditional',certainty:'unknown',condition},source);}
    if(ids.has('unit-fulgurite-electro-priests')){const character=state.members.find(member=>member.id!==state.current.id&&unitMeta(member).keywords?.includes('CHARACTER'));if(character)ability('electro-infusion','Electro-Infusion','While led, subtract 1 from Wound rolls for attacks that target this unit.',origin('explicit-attachment','datasheet-electro-infusion',character.id,'explicit-attachment'));}
    const own=state.ownKeywords,all=state.unitKeywords,detachment=id=>origin('detachment',id,null,'selected-detachment');
    if(state.detachmentIds.has('detachment-cohort-acquisitus')&&['PTERAXII','INFILTRATORS','RANGERS','SERBERYS RAIDERS','SERBERYS SULPHURHOUNDS'].some(keyword=>own.has(keyword)))add('recon-augury','keyword','RECON AUGURY','grant',{},detachment('detachment-cohort-acquisitus'));
    if(state.detachmentIds.has('detachment-lords-of-the-forge')&&own.has('TECH-PRIEST')){stat('lords-invulnerable','Invulnerable','set','4+',detachment('detachment-lords-of-the-forge'));ability('lords-feel-no-pain','Feel No Pain 5+','Models represented by this roster unit have Feel No Pain 5+.',detachment('detachment-lords-of-the-forge'));}
    if(state.detachmentIds.has('detachment-luminen-auto-choir')&&own.has('CORPUSCARII'))weapon('luminen-lethal-hits','ranged','grant-tag',{tag:'LETHAL HITS',termId:'core-lethal-hits'},detachment('detachment-luminen-auto-choir'));
    if(state.detachmentIds.has('detachment-cohort-cybernetica')&&own.has('LEGIO CYBERNETICA')){stat('cybernetica-move','M','add',2,detachment('detachment-cohort-cybernetica'));ability('cyber-psalm-programming','Cyber-psalm Programming','Add 1 to Objective Control unless this unit is Battle-shocked.',detachment('detachment-cohort-cybernetica'));}
    if(state.detachmentIds.has('detachment-skitarii-hunter-cohort')&&((all.has('SKITARII')&&(all.has('INFANTRY')||all.has('MOUNTED')))||all.has('IRONSTRIDER BALLISTARII')))ability('skitarii-hunter-stealth','Stealth','This unit has Stealth.',detachment('detachment-skitarii-hunter-cohort'));
    for(const entry of enriched(roster).filter(item=>item.ownerStatus==='resolved')){const id=entry.ruleId||entry.id||'',owner=state.members.find(member=>member.id===entry.ownerUnitId),targetsBearer=entry.ownerUnitId===state.current.id,targetsAttached=Boolean(owner&&state.attached&&unitEnhancements.has(id));if(!id||(!targetsBearer&&!targetsAttached))continue;const source=origin('enhancement',id,owner?.id,'enhancement-owner');if(leadingEnhancements.has(id)&&!state.attached)continue;switch(id){case'enhancement-clandestine-infiltrator':ability(id,'Infiltrators and Scouts 6"','Models represented by this roster unit have Infiltrators and Scouts 6".',source);break;case'enhancement-malphonic-susurrus':case'enhancement-electromiasmic-brazier':ability(id,'Stealth','This unit has Stealth.',source);break;case'enhancement-peerless-eradicator':weapon(id,'ranged','grant-tag',{tag:'SUSTAINED HITS 1',termId:'core-sustained-hits'},source);break;case'enhancement-autoclavic-denunciation':weapon(`${id}-infantry`,'ranged','grant-tag',{tag:'ANTI-INFANTRY 2+',termId:'core-anti'},source);weapon(`${id}-monster`,'ranged','grant-tag',{tag:'ANTI-MONSTER 4+',termId:'core-anti'},source);break;case'enhancement-mechanicus-locum':stat(id,'Ld','set','6+',source);break;case'enhancement-mantle-of-the-gnosticarch':ability(id,'Mantle of the Gnosticarch','Change the Damage characteristic of attacks allocated to the bearer to 1.',source);break;case'enhancement-temporcopia':ability(id,'Fights First','This unit has Fights First.',source);break;case'enhancement-arch-negator':weapon(id,'ranged','grant-tag',{tag:'ANTI-VEHICLE 4+',termId:'core-anti'},source);break;case'enhancement-transoracular-dyad-wafers':if(state.attached&&unitId(owner)==='unit-cybernetica-datasmith'&&state.members.some(member=>unitId(member)==='unit-kastelan-robots'))add(id,'keyword','HALO OVERRIDE','grant',{},source);break;case'enhancement-cognitive-reinforcement':case'enhancement-omnicogitator':weapon(`${id}-heavy`,'ranged','grant-tag',{tag:'HEAVY',termId:'core-heavy'},source);weapon(`${id}-assault`,'ranged','grant-tag',{tag:'ASSAULT',termId:'core-assault'},source);weapon(`${id}-bs`,'ranged','add-stat',{stat:'BS',delta:-1},source);weapon(`${id}-ws`,'melee','add-stat',{stat:'WS',delta:-1},source);if(state.unitKeywords.has('BATTLELINE')){weapon(`${id}-ap-ranged`,'ranged','add-stat',{stat:'AP',delta:-1},source);weapon(`${id}-ap-melee`,'melee','add-stat',{stat:'AP',delta:-1},source);ability(`${id}-protector`,'Protector Imperative','While this BATTLELINE unit is targeted by a melee attack, subtract 1 from the Hit roll.',source);}break;case'enhancement-sanctified-ordnance':weapon(`${id}-range`,'ranged','add-stat',{stat:'Range',delta:6},source);ability(`${id}-hazardous`,'Sanctified Ordnance','Hazardous tests for this unit can be re-rolled.',source);break;case'enhancement-inloaded-lethality':weapon(`${id}-attacks`,'melee','add-stat',{stat:'A',delta:3},source);weapon(`${id}-damage`,'melee','add-stat',{stat:'D',delta:1},source);break;case'enhancement-explorator-dispensation':ability(id,'Infiltrators','This unit has Infiltrators.',source);break;case'enhancement-vinghs-wafers-of-dynamism':if(state.attached)add(id,'keyword','MOBILE','grant',{},source);break;case'enhancement-tl-4-9':add(id,'weapon','added-profile','grant-profile',{profile:(catalog()[normalize(entry.name)]||{}).profile||null},source);break;case'enhancement-voltagheist-reliquary':ability(id,'Voltagheist Reliquary','Enemy units cannot target this unit with Snap Shooting attacks.',source);break;case'enhancement-martial-signatum-amplificator':add(id,'keyword','SKITARII','grant',{},source);break;case'enhancement-belicosa-class-capacitor-vanes':weapon(`${id}-range`,'ranged','add-stat',{stat:'Range',delta:6},source);weapon(`${id}-strength`,'ranged','add-stat',{stat:'S',delta:1},source);break;case'enhancement-omnissiahs-fury':weapon(`${id}-attacks`,'melee','add-stat',{stat:'A',delta:2},source);weapon(`${id}-ap`,'melee','add-stat',{stat:'AP',delta:-1},source);weapon(`${id}-damage`,'melee','add-stat',{stat:'D',delta:1},source);break;case'enhancement-stealth-screened-cybercanids-upgrade':ability(id,'Lone Operative 15"','This unit has Lone Operative while enemy models are more than 15" away.',source);break;}}
    return output;
  };
  function renderInstances(card,ownership){
    const host=card.querySelector('[id$="-abilities"]')||card;
    const block=document.createElement('section');block.className='content-block roster-instances';
    const heading=document.createElement('h4');heading.textContent='Roster instances';block.append(heading);
    const list=document.createElement('ul');
    for(const instance of ownership.instances){
      const row=document.createElement('li');
      const label=document.createElement('strong');label.textContent=instance.label;row.append(label,document.createTextNode(` · ${instance.points} pts`));
      const assignment=document.createElement('span');assignment.textContent=instance.enhancements.length?` · ${instance.enhancements.map(entry=>catalog()[normalize(entry.name)]?.title||entry.name).join(', ')}`:' · No Enhancement assigned';row.append(assignment);list.append(row);
    }
    block.append(list);
    if(ownership.unresolved.length){const warning=document.createElement('p');warning.className='roster-effect-warning';warning.textContent='One or more roster Enhancements have an unresolved owner and were not assigned to an instance.';block.append(warning);}
    host.append(block);
  }
  function applyProjectedEffects(card,effects){for(const effect of effects||[]){if(effect.state&&effect.state!=='active')continue;if(effect.component==='ability')addAbilityCard(card,effect.title,effect.summary,effect.source?.id);else if(effect.component==='keyword'){if(effect.operation==='remove')removeKeyword(card,effect.targetId);else addKeyword(card,effect.targetId);}else if(effect.component==='stat'){if(effect.targetId==='Invulnerable'&&effect.operation==='set')setInvulnerable(card,Number(String(effect.to).match(/\d+/)?.[0]));else if(effect.operation==='set')setModelStat(card,effect.targetId,effect.to);else modelStat(card,effect.targetId,effect.delta);}else if(effect.component==='weapon'&&effect.operation==='grant-profile')addProfile(card,{profile:effect.profile});else if(effect.component==='weapon'){const rows=effect.targetId==='ranged'?weaponRows(card,'ranged'):effect.targetId==='melee'?weaponRows(card,'melee'):allWeaponRows(card);for(const row of rows){if(effect.operation==='grant-tag')addAbility(row,effect.tag,effect.termId);else if(effect.operation==='add-stat')numberCell(row,effect.stat,effect.delta);}}}}
  function decorate(card,roster,units,context={}){
    const ownership=resolveOwnership(roster,units);
    if(ownership.instances.length>1&&!ownership.equivalent){renderInstances(card,ownership);return;}
    const list=card.querySelector('[id$="-abilities"] .ability-list'),state=groupState(roster,units,context);if(!list||!state.current)return;
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item)continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';
      const exportCost=entry.exportedCost,current=item.value;
      article.innerHTML=`<h5>${item.title}</h5><p class="roster-enhancement-cost">${exportCost&&exportCost!==current?`${exportCost} pts in export · ${current} pts current`:`${current} pts included`}</p><p>${item.text||'This Enhancement adds the TL-4Ø9 weapon profile shown above.'}</p>`;
      const failure=Array.isArray(context.projectedEffects)?'':applyEnhancement(card,item,entry,state,state.current);if(failure){const warning=document.createElement('p');warning.className='roster-effect-warning';warning.textContent=`Effect could not be applied automatically. ${failure}`;article.append(warning);}
      list.prepend(article);
    }
    if(Array.isArray(context.projectedEffects)){if(context.applyEffects!==false)applyProjectedEffects(card,context.projectedEffects);return;}
    for(const owner of state.members)if(owner.id!==state.current.id)for(const entry of enriched(roster))if(entry.ownerStatus==='resolved'&&entry.ownerUnitId===owner.id&&unitEnhancements.has(entry.ruleId||entry.id)){const item=catalog()[normalize(entry.name)];if(item)applyEnhancement(card,item,entry,state,owner);}
    projectAttachments(card,state);projectDetachment(card,state);
  }
  root.AMRosterEnhancements=Object.freeze({resolveDetachment,resolveOwnership,filterCompatibleRules,projectGameEffects,decorate,enriched});
}(window));
