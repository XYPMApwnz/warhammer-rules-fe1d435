(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  const tauBook=()=>root.document?.documentElement?.dataset.bookId==='tau-empire'||/\/books\/tau-empire\//.test(root.location?.pathname||'');
  const unsafeWeaponTargets=new Set(['thermoneutronic projector','plasma accelerator rifle','supernova launcher']);
  const tauEffects=new Map([
    ['negation emitters upgrade','detection-range-minus-3'],
    ['precision of the patient hunter','hit-plus-1'],
    ['kroothawk flock','ignores-cover'],
    ['root carved weapons','precision-devastating-wounds'],
    ['internal grenade racks','grenades-keyword']
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
  function decorate(card,roster,units){
    if(tauBook())return decorateTau(card,roster,units);
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
