(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  const tauBook=()=>root.document?.documentElement?.dataset.bookId==='tau-empire'||/\/books\/tau-empire\//.test(root.location?.pathname||'');
  const ecBook=()=>root.document?.documentElement?.dataset.bookId==='emperors-children'||/\/books\/emperors-children\//.test(root.location?.pathname||'');
  const tyranidsBook=()=>root.document?.documentElement?.dataset.bookId==='tyranids'||/\/books\/tyranids\//.test(root.location?.pathname||'');
  const unsafeWeaponTargets=new Set(['thermoneutronic projector','plasma accelerator rifle','supernova launcher']);
  const tauEffects=new Map([
    ['negation emitters upgrade','detection-range-minus-3'],
    ['precision of the patient hunter','hit-plus-1'],
    ['kroothawk flock','ignores-cover'],
    ['root carved weapons','precision-devastating-wounds'],
    ['internal grenade racks','grenades-keyword']
  ]);
  const ecEffects=new Map([
    ['tears of the phoenix','modifier-immunity'],
    ['exalted patron','move-plus-1'],
    ['spiritsliver','melee-strength-attacks-plus-1'],
    ['cacophonic accompaniment','deep-strike-ignores-cover'],
    ['frenzied ferocity','sustained-hits-1'],
    ['euphoric crown','melee-strength-plus-1'],
    ['howling plate','ranged-ap-plus-1'],
    ['distortion','melee-attacks-damage-plus-1'],
    ['slayer of champions','precision-vs-character'],
    ['eager patrons','move-plus-2'],
    ['beguiling grotesquerie','snap-shooting-protection']
  ]);
  const tyranidsEffects=new Map([
    ['cryptophotaic camouflage','detection-range-minus-3'],
    ['destabilising predation','ranged-anti-character-2'],
    ['synaptoprescience','invulnerable-save-4'],
    ['elevated might','melee-reroll-wounds-ap-plus-1'],
    ['ocular adaptation','melee-hit-plus-1'],
    ['trygon prime','synapse-melee-strength-ws-plus-1'],
    ['adaptive biology','feel-no-pain'],
    ['ominous presence','oc-plus-3'],
    ['relentless hunger','move-plus-2-unit'],
    ['parasitic biomorphology','melee-strength-plus-1-conditional-attacks'],
    ['chameleonic','stealth'],
    ['power of the hive mind','psychic-strength-ap-plus-1']
  ]);

  function enhancementArticle(entry,item){
    const article=root.document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item.title);
    const title=root.document.createElement('h5');title.textContent=item.title;
    const cost=root.document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=item.value==null;
    cost.textContent=Number(entry.exportedCost)&&Number(entry.exportedCost)!==Number(item.value)?`${entry.exportedCost} pts in export · ${item.value} pts current`:`${item.value} pts included`;
    const text=root.document.createElement('p');text.textContent=item.text;
    article.append(title,cost,text);return article;
  }
  function warning(article,text){
    const note=root.document.createElement('p');note.className='roster-warning';note.textContent=text;article.append(note);
  }
  function derivedNote(article,effect,text){
    article.dataset.rosterDerivedEffect=effect;
    const note=root.document.createElement('p');note.className='roster-derived-note';note.dataset.rosterDerivedNote=effect;note.textContent=text;article.append(note);
  }
  function weaponRows(card,mode=''){
    return[...card.querySelectorAll('.weapon-group')]
      .filter(group=>!mode||group.querySelector('h5')?.textContent.trim().toLowerCase().startsWith(mode))
      .flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
  }
  function addWeaponTag(row,label,effect){
    const cell=row.firstElementChild;if(!cell)return false;
    let tags=cell.querySelector('.weapon-tags');
    if(!tags){tags=root.document.createElement('div');tags.className='weapon-tags';cell.append(tags);}
    const existing=[...tags.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-modified');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('span');tag.className='tag roster-modified';tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;tags.append(tag);return true;
  }
  function addKeyword(card,label,effect){
    const list=card.querySelector('[id$="-keywords"] .keyword-list');if(!list)return false;
    const existing=[...list.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-derived-keyword');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('span');tag.className='roster-derived-keyword';tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;list.append(tag);return true;
  }
  function addSharedAbility(card,label,term,effect){
    const list=card.querySelector('[id$="-abilities"] .shared-abilities');if(!list)return false;
    const existing=[...list.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-derived-ability');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('button');tag.type='button';tag.className='term-button roster-derived-ability';tag.dataset.term=term;tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;list.append(tag);return true;
  }
  function increased(value,amount){
    const text=String(value||'').trim(),inches=text.endsWith('"'),raw=inches?text.slice(0,-1):text;
    if(/^-?\d+$/.test(raw))return`${Number(raw)+amount}${inches?'"':''}`;
    const dice=raw.match(/^(\d*D\d+)([+-]\d+)?$/i);if(!dice)return'';
    const bonus=Number(dice[2]||0)+amount;return`${dice[1]}${bonus>0?`+${bonus}`:bonus<0?bonus:''}${inches?'"':''}`;
  }
  function adjustStat(card,field,amount,effect){
    const value=card.querySelector(`.stat[data-source-field="stats.${field}"] span`);if(!value)return false;
    const base=value.dataset.rosterBaseValue||value.textContent.trim(),next=increased(base,amount);if(!next)return false;
    value.dataset.rosterBaseValue=base;value.dataset.rosterDerivedEffect=effect;value.classList.add('roster-modified');value.textContent=next;return true;
  }
  function adjustWeapons(card,mode,changes,effect){
    const rows=weaponRows(card,mode),updates=[];if(!rows.length)return false;
    for(const row of rows)for(const [field,amount] of Object.entries(changes)){
      const cell=row.querySelector(`[data-label="${field}"]`);if(!cell)return false;
      const base=cell.dataset.rosterBaseValue||cell.textContent.trim(),next=increased(base,amount);if(!next)return false;
      updates.push({cell,base,next});
    }
    for(const {cell,base,next} of updates){cell.dataset.rosterBaseValue=base;cell.dataset.rosterDerivedEffect=effect;cell.classList.add('roster-modified');cell.textContent=next;}
    return true;
  }
  function tagWeapons(card,mode,label,effect){const rows=weaponRows(card,mode);return rows.length>0&&rows.every(row=>addWeaponTag(row,label,effect));}
  function applyTauEffect(card,article,item){
    const key=normalize(item.title),effect=tauEffects.get(key);
    if(effect==='detection-range-minus-3'){
      derivedNote(article,effect,'Derived effect: this unit has -3" detection range.');return;
    }
    if(effect==='hit-plus-1'){
      derivedNote(article,effect,'Derived effect: add 1 to Hit rolls for the bearer\'s ranged attacks. From battle round 3 onwards, the +1 to Wound roll remains conditional on the current battle round.');return;
    }
    if(effect==='ignores-cover'){
      const rows=weaponRows(card,'ranged');
      if(rows.length&&rows.every(row=>addWeaponTag(row,'IGNORES COVER',effect)))article.dataset.rosterDerivedEffect=effect;
      else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');
      return;
    }
    if(effect==='precision-devastating-wounds'){
      const rows=weaponRows(card);
      if(rows.length&&rows.every(row=>addWeaponTag(row,'PRECISION',effect)&&addWeaponTag(row,'DEVASTATING WOUNDS',effect)))article.dataset.rosterDerivedEffect=effect;
      else warning(article,'Effect could not be applied automatically because no weapon profiles were found.');
      return;
    }
    if(effect==='grenades-keyword'){
      if(addKeyword(card,'GRENADES',effect))article.dataset.rosterDerivedEffect=effect;
      else warning(article,'Effect could not be applied automatically because the Keywords block was not found.');
      return;
    }
    if(unsafeWeaponTargets.has(key)){
      warning(article,'Effect could not be applied automatically. The roster export does not identify the weapon selected in the Declare Battle Formations step.');return;
    }
    const mode=/while the bearer is leading a unit|bearer(?:'|\u2019)s unit/i.test(item.text||'')?'attachment-dependent':/declare battle formations|before the first turn|resolve pre-battle|after both players have deployed/i.test(item.text||'')?'setup-dependent':'conditional';
    warning(article,`No permanent Datasheet mutation was applied because this Enhancement is ${mode}.`);
  }
  function resolveTauOwnership(roster,units){
    const enhancements=roster?.enhancements||[],names=new Set((units||[]).map(unit=>normalize(unit.name)));
    const instances=(units||[]).map((unit,index)=>({
      unit,
      label:`${unit.name||'Roster unit'}${units.length>1?` #${index+1}`:''}`,
      points:Number(unit.points)||0,
      enhancements:enhancements.filter(entry=>entry.ownerStatus==='resolved'&&entry.ownerUnitId===unit.id)
    }));
    const unresolved=enhancements.filter(entry=>entry.ownerStatus!=='resolved'&&names.has(normalize(entry.ownerName||entry.ownerLabel)));
    return{instances,cardEnhancements:instances.length===1?instances[0].enhancements:[],unresolved};
  }
  function renderTauInstances(card,ownership){
    const host=card.querySelector('[id$="-abilities"]')||card,list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return;
    const block=root.document.createElement('section');block.className='content-block roster-instances';
    const heading=root.document.createElement('h4');heading.textContent='Roster instances';
    const rows=root.document.createElement('ul');block.append(heading,rows);
    for(const instance of ownership.instances){
      const row=root.document.createElement('li');row.textContent=`${instance.label} / ${instance.points} pts / ${instance.enhancements.length?instance.enhancements.map(entry=>catalog()[normalize(entry.name)]?.title||entry.name).join(', '):'No Enhancement assigned'}`;rows.append(row);
      for(const entry of instance.enhancements){
        const item=catalog()[normalize(entry.name)];if(!item)continue;
        const article=enhancementArticle(entry,item);article.classList.add('roster-enhancement-instance');article.dataset.rosterInstance=instance.unit.id;
        warning(article,`Assigned to ${instance.label}. This shared Datasheet card represents multiple roster units, so no derived mutation was applied.`);list.append(article);
      }
    }
    if(ownership.unresolved.length)warning(block,'One or more roster Enhancements have an unresolved owner and were not applied.');
    host.append(block);
  }
  function renderTauUnresolved(list,entries){
    for(const entry of entries){
      const item=catalog()[normalize(entry.name)];if(!item)continue;
      const article=enhancementArticle(entry,item);article.classList.add('roster-enhancement-unresolved');
      warning(article,'Effect was not applied because the Enhancement owner could not be resolved to an exact roster unit.');list.prepend(article);
    }
  }
  function decorateTau(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderTauInstances(card,ownership);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=enhancementArticle(entry,item);applyTauEffect(card,article,item);list.prepend(article);
    }
    renderTauUnresolved(list,ownership.unresolved);return ownership.cardEnhancements;
  }
  function applyEcEffect(card,article,item){
    const effect=ecEffects.get(normalize(item.title));
    if(effect==='modifier-immunity'){
      derivedNote(article,effect,'Derived rule: models in the bearer\'s unit can ignore modifiers to melee Weapon Skill and to Hit and Wound rolls.');return;
    }
    if(effect==='move-plus-1'||effect==='move-plus-2'){
      if(adjustStat(card,'M',effect.endsWith('2')?2:1,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,`Derived profile: ${effect.endsWith('2')?'+2"':'+1"'} Move applied.`);}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='melee-strength-attacks-plus-1'){
      if(adjustWeapons(card,'melee',{S:1,A:1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +1 Strength and +1 Attacks applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='deep-strike-ignores-cover'){
      const ability=addSharedAbility(card,'Deep Strike','core-deep-strike',effect),weapons=tagWeapons(card,'ranged','IGNORES COVER',effect);
      if(ability&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: Deep Strike and Ignores Cover applied. If the bearer leads a unit, the ranged-attack effect also applies to that Attached Unit; no Bodyguard card is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block or ranged weapon profiles were not found.');return;
    }
    if(effect==='sustained-hits-1'){
      if(tagWeapons(card,'','SUSTAINED HITS 1',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Sustained Hits 1 applied to this unit\'s attacks.');}
      else warning(article,'Effect could not be applied automatically because no weapon profiles were found.');return;
    }
    if(effect==='melee-strength-plus-1'||effect==='ranged-ap-plus-1'||effect==='melee-attacks-damage-plus-1'){
      const applied=effect==='melee-strength-plus-1'?adjustWeapons(card,'melee',{S:1},effect):effect==='ranged-ap-plus-1'?adjustWeapons(card,'ranged',{AP:-1},effect):adjustWeapons(card,'melee',{A:1,D:1},effect);
      if(applied){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,effect==='melee-strength-plus-1'?'Derived profiles: +1 Strength applied to the bearer\'s melee attacks.':effect==='ranged-ap-plus-1'?'Derived profiles: ranged Armour Penetration improved by 1. If the bearer leads a unit, this also applies to that Attached Unit; no Bodyguard card is mutated without attachment evidence.':'Derived profiles: +1 Attacks and +1 Damage applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more matching weapon characteristics were not found.');return;
    }
    if(effect==='precision-vs-character'){
      if(tagWeapons(card,'melee','PRECISION',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Precision applied to the bearer\'s melee weapons. The +1 Strength and improved AP remain conditional on targeting a Character unit and are not applied permanently.');}
      else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='snap-shooting-protection'){
      derivedNote(article,effect,'Derived rule: enemy units cannot target this unit with snap shooting attacks.');return;
    }
    const mode=/while the bearer is leading a unit|bearer(?:'|\u2019)s unit/i.test(item.text||'')?'attachment-dependent':/once per battle|declare battle formations|before the first turn|after both players have deployed/i.test(item.text||'')?'setup-dependent':'conditional';
    warning(article,`No permanent Datasheet mutation was applied because this Enhancement is ${mode}.`);
  }
  function decorateEc(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderTauInstances(card,ownership);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=enhancementArticle(entry,item);applyEcEffect(card,article,item);list.prepend(article);
    }
    renderTauUnresolved(list,ownership.unresolved);return ownership.cardEnhancements;
  }
  function adjustTyranidsRows(rows,changes,effect){
    const updates=[];if(!rows.length)return false;
    for(const row of rows)for(const [field,amount] of Object.entries(changes)){
      const cell=row.querySelector(`[data-label="${field}"]`);if(!cell)return false;
      const base=cell.dataset.rosterBaseValue||cell.textContent.trim();let next='';
      if(field==='WS'){
        const match=base.match(/^(\d+)\+$/);if(match)next=`${Math.max(2,Number(match[1])-amount)}+`;
      }else next=increased(base,amount);
      if(!next)return false;updates.push({cell,base,next});
    }
    for(const {cell,base,next} of updates){cell.dataset.rosterBaseValue=base;cell.dataset.rosterDerivedEffect=effect;cell.classList.add('roster-modified');cell.textContent=next;}
    return true;
  }
  function applyTyranidsEffect(card,article,item){
    const effect=tyranidsEffects.get(normalize(item.title));
    if(effect==='detection-range-minus-3'){derivedNote(article,effect,'Derived rule: this unit has -3" detection range.');return;}
    if(effect==='ranged-anti-character-2'){
      if(tagWeapons(card,'ranged','ANTI-CHARACTER 2+',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Anti-Character 2+ applied to this unit\'s ranged attacks.');}
      else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');return;
    }
    if(effect==='invulnerable-save-4'){
      if(addSharedAbility(card,'Invulnerable Save 4+','core-characteristic-invulnerable-save',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Invulnerable Save 4+ applied.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='melee-reroll-wounds-ap-plus-1'){
      if(adjustTyranidsRows(weaponRows(card,'melee'),{AP:-1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: melee Armour Penetration improved by 1. The bearer\'s melee attacks can also re-roll Wound rolls.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='melee-hit-plus-1'){derivedNote(article,effect,'Derived rule: add 1 to Hit rolls for this unit\'s melee attacks. Weapon Skill is not rewritten because this is a roll modifier.');return;}
    if(effect==='synapse-melee-strength-ws-plus-1'){
      const keyword=addKeyword(card,'SYNAPSE',effect),weapons=adjustTyranidsRows(weaponRows(card,'melee'),{S:1,WS:1},effect);
      if(keyword&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Synapse keyword applied; melee Strength and Weapon Skill improved by 1.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or melee weapon characteristics were not found.');return;
    }
    if(effect==='feel-no-pain'){
      if(addSharedAbility(card,'Feel No Pain 5+','core-feel-no-pain',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Feel No Pain 5+ applied. Feel No Pain 4+ remains conditional on the bearer having fewer than its starting wounds at the start of a turn.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='oc-plus-3'){
      if(adjustStat(card,'OC',3,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: +3 Objective Control applied.');}
      else warning(article,'Effect could not be applied automatically because Objective Control was not found.');return;
    }
    if(effect==='move-plus-2-unit'){
      if(adjustStat(card,'M',2,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: +2" Move applied to this bearer Datasheet. If the bearer leads a unit, no Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='melee-strength-plus-1-conditional-attacks'){
      if(adjustTyranidsRows(weaponRows(card,'melee'),{S:1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +1 Strength applied to this bearer Datasheet\'s melee weapons. The +1 Attacks effect remains conditional on destroying an enemy unit near a friendly Harvester; no Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='stealth'){
      if(addSharedAbility(card,'Stealth','core-stealth',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Stealth applied.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='psychic-strength-ap-plus-1'){
      const rows=weaponRows(card).filter(row=>normalize(row.querySelector('.weapon-tags')?.textContent).includes('psychic'));
      if(adjustTyranidsRows(rows,{S:1,AP:-1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Strength and Armour Penetration improved by 1 for the bearer\'s psychic weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more psychic weapon characteristics were not found.');return;
    }
    warning(article,'No permanent Datasheet mutation was applied because this Enhancement does not have a safe deterministic projection.');
  }
  function decorateTyranids(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderTauInstances(card,ownership);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=enhancementArticle(entry,item);applyTyranidsEffect(card,article,item);list.prepend(article);
    }
    renderTauUnresolved(list,ownership.unresolved);return ownership.cardEnhancements;
  }
  function decorate(card,roster,units){
    if(tauBook())return decorateTau(card,roster,units);
    if(ecBook())return decorateEc(card,roster,units);
    if(tyranidsBook())return decorateTyranids(card,roster,units);
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const unitIds=new Set((units||[]).map(unit=>unit.id));
    const owned=(roster?.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&unitIds.has(item.ownerUnitId));
    for(const entry of owned){
      const item=catalog()[normalize(entry.name)];
      if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item.title);
      const title=document.createElement('h5');title.textContent=item.title;
      const cost=document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=item.value==null;
      cost.textContent=Number(entry.exportedCost)&&Number(entry.exportedCost)!==Number(item.value)?`${entry.exportedCost} pts in export · ${item.value} pts current`:`${item.value} pts included`;
      const text=document.createElement('p');text.textContent=item.text;
      article.append(title,cost,text);list.prepend(article);
    }
    return owned;
  }
  root.WHBookRosterEnhancements=Object.freeze({decorate});
}(typeof window==='undefined'?globalThis:window));
