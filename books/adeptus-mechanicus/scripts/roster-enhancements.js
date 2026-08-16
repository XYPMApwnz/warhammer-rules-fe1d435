(function(root){
  'use strict';
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_POINTS_CATALOG?.['adeptus mechanicus']?.enhancements||{};
  const detachmentSlug=value=>String(value||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const resolveDetachment=(labels,inventoryIds)=>{
    const requested=[...new Set((labels||[]).map(value=>detachmentSlug(String(value||'').replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean))];
    const matches=(inventoryIds||[]).filter(id=>id===requested[0]);
    return requested.length===1&&matches.length===1?requested[0]:'';
  };
  const resolveOwnership=(roster,units)=>{
    const enhancements=roster?.enhancements||[];
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
  const numberCell=(row,label,delta)=>{
    const cell=[...row.children].find(node=>node.dataset.label===label);
    if(!cell)return false;
    const raw=cell.textContent.trim(),match=raw.match(/^-?\d+/),value=Number(match?.[0]);
    if(!Number.isFinite(value))return false;
    const suffix=raw.slice(match[0].length);cell.textContent=`${value+delta}${suffix} (${delta>0?'+':''}${delta})`;cell.classList.add('roster-modified');return true;
  };
  const addAbility=(row,text)=>{
    const rootCell=row.firstElementChild;if(!rootCell)return false;
    const small=rootCell.querySelector('small')||rootCell.appendChild(document.createElement('small'));
    if(small.textContent.trim())small.append(', ');
    const tag=document.createElement('span');tag.className='roster-added-rule';tag.textContent=text;small.append(tag);return true;
  };
  const addKeyword=(card,text)=>{
    const list=card.querySelector('[id$="-keywords"] .keyword-list');if(!list)return false;
    if([...list.children].some(node=>normalize(node.textContent)===normalize(text)))return true;
    const tag=document.createElement('span');tag.textContent=text;tag.className='roster-added-keyword';list.append(tag);return true;
  };
  const addAbilityCard=(card,title,text)=>{
    const list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return false;
    const article=document.createElement('article');article.className='ability roster-derived-ability';article.innerHTML=`<h5>${title}</h5><p>${text}</p>`;list.prepend(article);return true;
  };
  const weaponRows=(card,mode)=>[...card.querySelectorAll('.weapon-group')].filter(group=>group.querySelector('h5')?.textContent.toLowerCase().startsWith(mode)).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
  function apply(card,item){
    const effect=item.effect||'',ranged=weaponRows(card,'ranged'),melee=weaponRows(card,'melee');
    if(/while the bearer is leading a unit/i.test(item.text||''))return 'The roster export does not prove that the bearer is leading a unit.';
    if(effect==='leadership-6'){
      const cell=[...card.querySelectorAll('.stat')].find(stat=>stat.querySelector('b')?.textContent==='Ld')?.querySelector('span');if(!cell)return 'Leadership profile not found.';cell.textContent='6+';cell.classList.add('roster-modified');return '';
    }
    if(effect==='fights-first')return addAbilityCard(card,item.title,'This unit has Fights First.')?'':'Abilities block not found.';
    if(effect==='stealth')return addAbilityCard(card,item.title,'This unit has Stealth.')?'':'Abilities block not found.';
    if(effect==='infiltrators')return addAbilityCard(card,item.title,'This unit has Infiltrators.')?'':'Abilities block not found.';
    if(effect==='infiltrators-scouts-6')return addAbilityCard(card,item.title,'This unit has Infiltrators and Scouts 6".')?'':'Abilities block not found.';
    if(effect==='mobile')return 'The New Recruit text does not prove that this unit is attached, so MOBILE was not added.';
    if(effect==='halo-override')return 'The New Recruit text does not prove that the Datasmith is attached to Kastelan Robots, so HALO OVERRIDE was not added.';
    if(effect==='skitarii')return addKeyword(card,'SKITARII')?'':'Keywords block not found.';
    if(effect==='lone-operative-15')return addAbilityCard(card,item.title,'This unit has Lone Operative 15".')?'':'Abilities block not found.';
    if(effect==='sustained-hits-1'||effect==='anti-vehicle-4'||effect==='anti-infantry-monster'){
      if(!ranged.length)return 'No ranged weapon profiles were found.';
      const label=effect==='sustained-hits-1'?'Sustained Hits 1':effect==='anti-vehicle-4'?'Anti-Vehicle 4+':'Anti-Infantry 2+, Anti-Monster 4+';ranged.forEach(row=>addAbility(row,label));return '';
    }
    if(effect.startsWith('ranged-')){
      if(!ranged.length)return 'No ranged weapon profiles were found.';
      ranged.forEach(row=>{if(effect.includes('range-6'))numberCell(row,'Range',6);if(effect.includes('strength-1'))numberCell(row,'S',1);});return '';
    }
    if(effect.startsWith('melee-')){
      if(!melee.length)return 'No melee weapon profiles were found.';
      melee.forEach(row=>{if(effect.includes('attacks-2'))numberCell(row,'A',2);if(effect.includes('attacks-3'))numberCell(row,'A',3);if(effect.includes('ap-1'))numberCell(row,'AP',-1);if(effect.includes('damage-1'))numberCell(row,'D',1);});return '';
    }
    if(effect==='tl-409-profile'){
      const table=card.querySelector('.weapon-group .weapon-table');if(!table)return 'Ranged weapon table not found.';
      const p=item.profile||{name:'TL-4Ø9',range:'24"',a:'3',skill:'2+',s:'11',ap:'-2',d:'D3+2',abilities:'Devastating Wounds, Hazardous'};
      const row=document.createElement('div');row.className='weapon-row roster-added-profile';row.innerHTML=`<div><b>${p.name}</b><small>${p.abilities}</small></div><div data-label="Range">${p.range}</div><div data-label="A">${p.a}</div><div data-label="BS">${p.skill}</div><div data-label="S">${p.s}</div><div data-label="AP">${p.ap}</div><div data-label="D">${p.d}</div>`;table.append(row);return '';
    }
    return '';
  }
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
  function decorate(card,roster,units){
    const ownership=resolveOwnership(roster,units);
    if(ownership.instances.length>1&&!ownership.equivalent){renderInstances(card,ownership);return;}
    const list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return;
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item)continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';
      const exportCost=entry.exportedCost,current=item.value;
      article.innerHTML=`<h5>${item.title}</h5><p class="roster-enhancement-cost">${exportCost&&exportCost!==current?`${exportCost} pts in export · ${current} pts current`:`${current} pts included`}</p><p>${item.text||'This Enhancement adds the TL-4Ø9 weapon profile shown above.'}</p>`;
      const failure=apply(card,item);if(failure){const warning=document.createElement('p');warning.className='roster-effect-warning';warning.textContent=`Effect could not be applied automatically. ${failure}`;article.append(warning);}
      list.prepend(article);
    }
  }
  root.AMRosterEnhancements=Object.freeze({resolveDetachment,resolveOwnership,filterCompatibleRules,decorate});
}(window));
