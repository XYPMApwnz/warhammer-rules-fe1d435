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
      case'enhancement-tl-409':addProfile(card,item);break;
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
    if(active.has('cohort-acquisitus')&&['PTERAXII','INFILTRATORS','RANGERS','SERBERYS RAIDERS','SERBERYS SULPHURHOUNDS'].some(keyword=>own.has(keyword)))addKeyword(card,'RECON AUGURY');
    if(active.has('lords-of-the-forge')&&own.has('TECH-PRIEST')){setInvulnerable(card,4);addFeelNoPain(card,5,'lords-of-the-forge-rule');}
    if(active.has('luminen-auto-choir')&&own.has('CORPUSCARII'))weaponRows(card,'ranged').forEach(row=>addAbility(row,'Lethal Hits','core-lethal-hits'));
    if(active.has('cohort-cybernetica')&&own.has('LEGIO CYBERNETICA')){modelStat(card,'M',2);addAbilityCard(card,'Cyber-psalm Programming','Add 1 to Objective Control unless this unit is Battle-shocked.','cohort-cybernetica-rule');}
    if(active.has('skitarii-hunter-cohort')&&((unit.has('SKITARII')&&(unit.has('INFANTRY')||unit.has('MOUNTED')))||unit.has('IRONSTRIDER BALLISTARII')))addAbilityCard(card,'Stealth','This unit has Stealth.','skitarii-hunter-cohort-rule');
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
  function decorate(card,roster,units,context={}){
    const ownership=resolveOwnership(roster,units);
    if(ownership.instances.length>1&&!ownership.equivalent){renderInstances(card,ownership);return;}
    const list=card.querySelector('[id$="-abilities"] .ability-list'),state=groupState(roster,units,context);if(!list||!state.current)return;
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item)continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';
      const exportCost=entry.exportedCost,current=item.value;
      article.innerHTML=`<h5>${item.title}</h5><p class="roster-enhancement-cost">${exportCost&&exportCost!==current?`${exportCost} pts in export · ${current} pts current`:`${current} pts included`}</p><p>${item.text||'This Enhancement adds the TL-4Ø9 weapon profile shown above.'}</p>`;
      const failure=applyEnhancement(card,item,entry,state,state.current);if(failure){const warning=document.createElement('p');warning.className='roster-effect-warning';warning.textContent=`Effect could not be applied automatically. ${failure}`;article.append(warning);}
      list.prepend(article);
    }
    for(const owner of state.members)if(owner.id!==state.current.id)for(const entry of enriched(roster))if(entry.ownerStatus==='resolved'&&entry.ownerUnitId===owner.id&&unitEnhancements.has(entry.ruleId||entry.id)){const item=catalog()[normalize(entry.name)];if(item)applyEnhancement(card,item,entry,state,owner);}
    projectAttachments(card,state);projectDetachment(card,state);
  }
  root.AMRosterEnhancements=Object.freeze({resolveDetachment,resolveOwnership,filterCompatibleRules,decorate,enriched});
}(window));
