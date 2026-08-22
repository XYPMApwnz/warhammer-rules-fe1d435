(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  const tauBook=()=>root.document?.documentElement?.dataset.bookId==='tau-empire'||/\/books\/tau-empire\//.test(root.location?.pathname||'');
  const ecBook=()=>root.document?.documentElement?.dataset.bookId==='emperors-children'||/\/books\/emperors-children\//.test(root.location?.pathname||'');
  const tyranidsBook=()=>root.document?.documentElement?.dataset.bookId==='tyranids'||/\/books\/tyranids\//.test(root.location?.pathname||'');
  const csmBook=()=>root.document?.documentElement?.dataset.bookId==='chaos-space-marines'||/\/books\/chaos-space-marines\//.test(root.location?.pathname||'');
  const smBook=()=>root.document?.documentElement?.dataset.bookId==='space-marines'||/\/books\/space-marines\//.test(root.location?.pathname||'');
  const daBook=()=>root.document?.documentElement?.dataset.bookId==='dark-angels'||/\/books\/dark-angels\//.test(root.location?.pathname||'');
  const baBook=()=>root.document?.documentElement?.dataset.bookId==='blood-angels'||/\/books\/blood-angels\//.test(root.location?.pathname||'');
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
  const csmEffects=new Map([
    ['touched by the warp','psyker-psychic-weapons'],
    ['conduit of chaos','melee-lance'],
    ['crown of worms','ability-range-plus-3'],
    ['surgical precision','melee-precision'],
    ['living carapace','wounds-plus-1-feel-no-pain-5'],
    ['cursed fang','melee-ap-plus-1-precision'],
    ['shroud of obfuscation','stealth-lone-operative'],
    ['iron artifice','anti-vehicle-fortification-4'],
    ['invigorated mechatendrils','move-plus-4'],
    ['shadowcowl talisman','unit-invulnerable-save-5'],
    ['pact of cursed pinions','daemon-melee-attacks-plus-1'],
    ['tzagulla','weapons-attacks-strength-ap-plus-1']
  ]);
  const smEffects=new Map([
    ['firestorm coordinators','ranged-sustained-hits-1'],
    ['armour of antoninus','save-2-feel-no-pain-5'],
    ['war tempered artifice','melee-strength-plus-3'],
    ['umbral raptor','stealth-lone-operative'],
    ['artificer armour','save-2-feel-no-pain-5'],
    ['the flesh is weak','feel-no-pain-4'],
    ['ghostweave cloak','stealth-lone-operative'],
    ['bellicose weapon spirits upgrade','reroll-damage-attacks'],
    ['raptorial cogitator core upgrade','ranged-ignores-cover'],
    ['shroud field','stealth-lone-operative'],
    ['orksbane','new-weapon-profile']
  ]);
  const baEffects=new Map([
    ['legacy-of-grace|enhancement-blood-boil','psychic-anti-reroll-damage'],
    ['legacy-of-grace|enhancement-aureole-of-the-angel','detection-range-minus-3'],
    ['wrath-of-the-doomed|enhancement-on-the-archtraitors-bridge','melee-attacks-plus-2'],
    ['the-angelic-host|enhancement-archangels-shard','melee-anti-chaos-lance'],
    ['the-angelic-host|enhancement-artisan-of-war','save-2-weapons-ap-plus-1'],
    ['angelic-inheritors|enhancement-prescient-flash','unit-scouts-6'],
    ['rage-cursed-onslaught|enhancement-carmine-reliquary','unit-scouts-6-battleshock-aura']
  ]);
  const inheritedBaSmEffects=new Set([
    'vengeful-hosts|enhancement-orksbane',
    'subversion-assets|enhancement-shroud-field',
    'headhunter-task-force|enhancement-firestorm-coordinators',
    'firestorm-assault-force|enhancement-war-tempered-artifice'
  ]);
  const inheritedDaSmEffects=new Set([
    'vengeful-hosts|enhancement-orksbane',
    'fulguris-task-force|bellicose-weapon-spirits',
    'fulguris-task-force|raptorial-cogitator-core',
    'subversion-assets|shroud-field',
    'headhunter-task-force|firestorm-coordinators',
    'firestorm-assault-force|firestorm-assault-force-war-tempered-artifice',
    'gladius-task-force|gladius-task-force-artificer-armour',
    'ironstorm-spearhead|ironstorm-spearhead-the-flesh-is-weak',
    'vanguard-spearhead|vanguard-spearhead-ghostweave-cloak'
  ]);
  const daEffects=new Map([
    ['company-of-hunters|enhancement-master-of-manoeuvre','strategic-reserves-setup'],
    ['company-of-hunters|enhancement-master-crafted-weapon','melee-precision'],
    ['company-of-hunters|enhancement-mounted-strategist','unit-advance-charge-rerolls'],
    ['company-of-hunters|enhancement-recon-hunter','unit-scouts-9'],
    ['dark-age-arsenal|petition-of-stability','plasma-range-plus-6'],
    ['dark-age-arsenal|entreaty-of-perpetual-ardour','snap-shooting-hit-5'],
    ['darkflight-pursuit|thundercowl-turbines','first-turn-ingress'],
    ['darkflight-pursuit|nightforged-battery','reroll-attacks-hazard'],
    ['inner-circle-task-force|enhancement-champion-of-the-deathwing','melee-lethal-hits-vowed-critical'],
    ['inner-circle-task-force|enhancement-inner-circle-task-force-deathwing-assault','early-deep-strike'],
    ['inner-circle-task-force|enhancement-eye-of-the-unseen','conditional-cp-roll'],
    ['inner-circle-task-force|enhancement-singular-will','unit-pile-in-consolidate-plus-3'],
    ['interrogation-conclave|limitless-zeal','unit-charge-plus-1'],
    ['interrogation-conclave|inescapable-interrogation','ranged-ignores-cover'],
    ['lion-s-blade-task-force|calibanite-armaments','melee-damage-plus-1'],
    ['lion-s-blade-task-force|lord-of-the-hunt','unit-fall-back-actions'],
    ['lion-s-blade-task-force|stalwart-champion','conditional-unit-oc-plus-1'],
    ['lion-s-blade-task-force|fulgus-magna','once-per-battle-reserves'],
    ['unforgiven-task-force|enhancement-pennant-of-remembrance','attached-unit-feel-no-pain'],
    ['unforgiven-task-force|enhancement-shroud-of-heroes','once-per-battle-return'],
    ['unforgiven-task-force|enhancement-stubborn-tenacity','attached-unit-conditional-rolls'],
    ['unforgiven-task-force|enhancement-weapons-of-the-first-legion','melee-attacks-strength-damage-plus-1'],
    ['wrath-of-the-rock|tempered-in-battle-aura','leadership-reroll-aura'],
    ['wrath-of-the-rock|ancient-weapons','melee-strength-ap-damage'],
    ['wrath-of-the-rock|deathwing-assault','early-deep-strike'],
    ['wrath-of-the-rock|lord-of-the-ravenwing','unit-advance-charge-rerolls']
  ]);
  const daNotes=new Map([
    ['strategic-reserves-setup','Setup rule: if the bearer\'s unit starts the battle in Strategic Reserves, it does not count towards the army\'s Strategic Reserves points limit and treats the current battle round as one higher when it is set up.'],
    ['unit-advance-charge-rerolls','Attachment-dependent rule: the bearer\'s unit can re-roll Advance and Charge rolls. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-scouts-9','Attachment-dependent setup rule: models in the bearer\'s unit have Scouts 9". No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['snap-shooting-hit-5','Derived rule: this unit\'s snap shooting attacks hit on unmodified Hit rolls of 5+.'],
    ['first-turn-ingress','Setup rule: in your first Movement phase, this unit can make an ingress move.'],
    ['reroll-attacks-hazard','Derived rule: this unit can re-roll rolls to determine a weapon\'s Attacks characteristic and Hazard rolls.'],
    ['early-deep-strike','Setup rule: the bearer\'s unit can use Deep Strike in the Reinforcements step of your first, second or third Movement phase, regardless of mission rules.'],
    ['conditional-cp-roll','Conditional rule: when the bearer\'s unit is targeted with a Stratagem, roll one D6, adding 1 while the bearer is within range of the Vowed objective marker; on a 5+ you gain 1CP.'],
    ['unit-pile-in-consolidate-plus-3','Attachment-dependent rule: when the bearer\'s unit Piles In or Consolidates, models in it can move an additional 3". No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-charge-plus-1','Attachment-dependent rule: this unit has +1 to Charge rolls. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-fall-back-actions','Attachment-dependent rule: the bearer\'s unit can shoot and declare a charge after Falling Back and can re-roll Desperate Escape tests. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['conditional-unit-oc-plus-1','Attachment-dependent conditional rule: while the bearer\'s unit is not Battle-shocked, models in it have +1 Objective Control. No permanent profile or Bodyguard Datasheet mutation was applied.'],
    ['once-per-battle-reserves','Once-per-battle rule: at the end of your opponent\'s turn, if the bearer\'s unit is not within Engagement Range, it can be placed into Strategic Reserves.'],
    ['attached-unit-feel-no-pain','Attachment-dependent conditional rule: while the bearer is leading a unit, models in it have Feel No Pain 6+, or Feel No Pain 4+ while that unit is Battle-shocked. No Datasheet mutation was applied.'],
    ['once-per-battle-return','Once-per-battle rule: when this model is destroyed, its source-backed return roll and setup instructions apply at the end of the phase.'],
    ['attached-unit-conditional-rolls','Attachment-dependent conditional rule: while the bearer is leading a unit, its below-Starting-Strength and Battle-shocked attack-roll modifiers apply. No weapon profile or Bodyguard Datasheet mutation was applied.'],
    ['leadership-reroll-aura','Derived aura: friendly Adeptus Astartes units within 6" can re-roll Battle-shock and Leadership tests. No other Datasheet card is mutated.']
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
  function setSmStat(card,field,value,effect){
    const target=card.querySelector(`.stat[data-source-field="stats.${field}"] span`);if(!target)return false;
    target.dataset.rosterBaseValue=target.dataset.rosterBaseValue||target.textContent.trim();target.dataset.rosterDerivedEffect=effect;target.classList.add('roster-modified');target.textContent=value;return true;
  }
  function addSmWeaponProfile(card,profile,effect){
    const mode=String(profile?.type||'').toLowerCase().startsWith('melee')?'melee':'ranged',group=[...card.querySelectorAll('.weapon-group')].find(node=>node.querySelector('h5')?.textContent.trim().toLowerCase().startsWith(mode));if(!group)return false;
    const table=group.querySelector('.weapon-table'),values=profile.characteristics||{};if(!table||!profile.name)return false;
    const row=root.document.createElement('div');row.className='weapon-row roster-derived-weapon';row.dataset.rosterDerivedEffect=effect;row.dataset.mode=mode;
    const name=root.document.createElement('div');name.textContent=profile.name;row.append(name);
    for(const field of mode==='melee'?['Range','A','WS','S','AP','D']:['Range','A','BS','S','AP','D']){const cell=root.document.createElement('div');cell.dataset.label=field;cell.textContent=values[field]??'';row.append(cell);}
    for(const keyword of String(values.Keywords||'').split(',').map(value=>value.trim()).filter(Boolean))addWeaponTag(row,keyword,effect);
    table.append(row);return true;
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
  function csmDetachmentIds(roster){
    const labels=roster?.detachments?.length?roster.detachments.map(item=>item.label):[roster?.detachment];
    return new Set(labels.flatMap(value=>String(value||'').split(/\s*,\s*(?![^()]*\))/)).map(value=>normalize(value.replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean).map(value=>value.replace(/\s+/g,'-')));
  }
  function resolveCsmItem(entry,roster){
    const detachments=csmDetachmentIds(roster),candidates=Object.values(catalog()).filter(item=>normalize(item.title)===normalize(entry.name)&&detachments.has(item.detachmentId));
    return{status:candidates.length===1?'resolved':candidates.length?'ambiguous':'missing',item:candidates.length===1?candidates[0]:null,candidates};
  }
  function csmArticle(entry,resolution,message=''){
    const item=resolution.item,article=item?enhancementArticle(entry,item):root.document.createElement('article');
    if(!item){article.className='ability roster-enhancement roster-enhancement-unresolved';article.dataset.rosterEnhancement=normalize(entry.name);const title=root.document.createElement('h5');title.textContent=entry.name;const cost=root.document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=entry.exportedCost==null;cost.textContent=entry.exportedCost==null?'':`${entry.exportedCost} pts in export`;const text=root.document.createElement('p');text.textContent=resolution.status==='ambiguous'?`This title exists in multiple selected Detachments: ${resolution.candidates.map(candidate=>candidate.detachment).join(' / ')}.`:'No matching Enhancement record was found in the selected Detachment.';article.append(title,cost,text);}
    if(item)article.dataset.rosterEnhancementRuleId=item.ruleId;if(message)warning(article,message);return article;
  }
  function applyCsmEffect(card,article,item){
    const effect=csmEffects.get(normalize(item.title));
    if(effect==='psyker-psychic-weapons'){
      const keyword=addKeyword(card,'PSYKER',effect),weapons=tagWeapons(card,'','PSYCHIC',effect);
      if(keyword&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: Psyker keyword and Psychic applied to the bearer\'s weapons.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or weapon profiles were not found.');return;
    }
    if(effect==='melee-lance'||effect==='melee-precision'){
      const label=effect==='melee-lance'?'LANCE':'PRECISION';
      if(tagWeapons(card,'melee',label,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,`Derived profiles: ${label} applied to the bearer's melee weapons.`);}
      else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='ability-range-plus-3'){
      derivedNote(article,effect,'Derived ability ranges: +3" to Warpsmith, Master of Mechanisms and Enrage Machine Spirits.');return;
    }
    if(effect==='wounds-plus-1-feel-no-pain-5'){
      const wounds=adjustStat(card,'W',1,effect),ability=addSharedAbility(card,'Feel No Pain 5+','core-feel-no-pain',effect);
      if(wounds&&ability){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: +1 Wound and Feel No Pain 5+ applied to the bearer.');}
      else warning(article,'Effect could not be applied automatically because the Wounds characteristic or Abilities block was not found.');return;
    }
    if(effect==='melee-ap-plus-1-precision'){
      const profiles=adjustWeapons(card,'melee',{AP:-1},effect),precision=tagWeapons(card,'melee','PRECISION',effect);
      if(profiles&&precision){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: melee Armour Penetration improved by 1 and Precision applied.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='stealth-lone-operative'){
      const stealth=addSharedAbility(card,'Stealth','core-stealth',effect),lone=addSharedAbility(card,'Lone Operative','core-lone-operative',effect);
      if(stealth&&lone){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived abilities: Stealth and Lone Operative applied to the bearer. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='anti-vehicle-fortification-4'){
      const rows=weaponRows(card),applied=rows.length&&rows.every(row=>addWeaponTag(row,'ANTI-VEHICLE 4+',effect)&&addWeaponTag(row,'ANTI-FORTIFICATION 4+',effect));
      if(applied){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Anti-Vehicle 4+ and Anti-Fortification 4+ applied to the bearer\'s weapons.');}
      else warning(article,'Effect could not be applied automatically because no weapon profiles were found.');return;
    }
    if(effect==='move-plus-4'){
      if(adjustStat(card,'M',4,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: +4" Move applied to the bearer.');}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='unit-invulnerable-save-5'){
      if(addSharedAbility(card,'Invulnerable Save 5+','core-characteristic-invulnerable-save',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Invulnerable Save 5+ applied to the bearer Datasheet only. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='daemon-melee-attacks-plus-1'){
      const keyword=addKeyword(card,'DAEMON',effect),profiles=adjustWeapons(card,'melee',{A:1},effect);
      if(keyword&&profiles){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: Daemon keyword and +1 Attacks applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or melee weapon characteristics were not found.');return;
    }
    if(effect==='weapons-attacks-strength-ap-plus-1'){
      if(adjustWeapons(card,'',{A:1,S:1,AP:-1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Attacks, Strength and Armour Penetration improved by 1. The Damage improvement remains conditional on the bearer\'s unit being set up from Reserves and is not applied permanently.');}
      else warning(article,'Effect could not be applied automatically because one or more weapon characteristics were not found.');return;
    }
    warning(article,'No permanent Datasheet mutation was applied because this Enhancement does not have a safe deterministic projection.');
  }
  function renderCsmInstances(card,ownership,roster){
    const host=card.querySelector('[id$="-abilities"]')||card,list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return;
    const block=root.document.createElement('section');block.className='content-block roster-instances';const heading=root.document.createElement('h4');heading.textContent='Roster instances';const rows=root.document.createElement('ul');block.append(heading,rows);
    for(const instance of ownership.instances){const assignments=instance.enhancements.map(entry=>({entry,resolution:resolveCsmItem(entry,roster)})),row=root.document.createElement('li');row.textContent=`${instance.label} / ${instance.points} pts / ${assignments.length?assignments.map(({entry,resolution})=>resolution.item?`${resolution.item.title} (${resolution.item.detachment})`:entry.name).join(', '):'No Enhancement assigned'}`;rows.append(row);for(const {entry,resolution} of assignments){const article=csmArticle(entry,resolution,`Assigned to ${instance.label}. This shared Datasheet card represents multiple roster units; presentation is instance-specific and no Datasheet mutation was applied.`);article.classList.add('roster-enhancement-instance');article.dataset.rosterInstance=instance.unit.id;list.append(article);}}
    if(ownership.unresolved.length)warning(block,'One or more roster Enhancements have an unresolved owner and were not assigned to an instance.');host.append(block);
  }
  function csmAssignments(roster,units){const unitIds=new Set((units||[]).map(unit=>unit.id));return(roster?.enhancements||[]).filter(entry=>entry.ownerStatus==='resolved'&&unitIds.has(entry.ownerUnitId)).map(entry=>({entry,...resolveCsmItem(entry,roster)}));}
  function decorateCsm(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item)applyCsmEffect(card,article,resolution.item);list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function decorateSm(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item)applySmEffect(card,article,resolution.item);list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function decorateDa(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item){const identity=`${resolution.item.detachmentId}|${resolution.item.ruleId}`;if(inheritedDaSmEffects.has(identity))applySmEffect(card,article,resolution.item);else if(daEffects.has(identity))applyDaEffect(card,article,resolution.item);}list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function applyBaEffect(card,article,item){
    const effect=baEffects.get(`${item.detachmentId}|${item.ruleId}`);if(!effect)return;
    if(effect==='psychic-anti-reroll-damage'){
      const rows=weaponRows(card).filter(row=>[...row.querySelectorAll('.weapon-tags > *')].some(tag=>normalize(tag.textContent)==='psychic'));
      if(rows.length&&rows.every(row=>addWeaponTag(row,'ANTI-NON-MONSTER/VEHICLE 5+',effect)))derivedNote(article,effect,"Derived profiles: Anti-Non-Monster/Vehicle 5+ applied to the bearer's Psychic attacks; those attacks can also re-roll Damage rolls.");else warning(article,'Effect could not be applied automatically because no structured Psychic weapon profiles were found.');return;
    }
    if(effect==='detection-range-minus-3'){derivedNote(article,effect,'Derived permanent ability: this unit has -3" detection range.');return;}
    if(effect==='melee-attacks-plus-2'){
      if(adjustWeapons(card,'melee',{A:2},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: +2 Attacks applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='melee-anti-chaos-lance'){
      if(tagWeapons(card,'melee','ANTI-CHAOS 5+',effect)&&tagWeapons(card,'melee','LANCE',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Anti-Chaos 5+ and Lance applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='save-2-weapons-ap-plus-1'){
      const save=setSmStat(card,'Sv','2+',effect),weapons=adjustWeapons(card,'',{AP:-1},effect);if(save&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived Datasheet: Save 2+ and improved Armour Penetration applied to the bearer's weapons.");}else warning(article,'Effect could not be applied automatically because the Save characteristic or weapon profiles were not found.');return;
    }
    if(effect==='unit-scouts-6'||effect==='unit-scouts-6-battleshock-aura'){
      if(addSharedAbility(card,'Scouts 6"','core-scouts',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,effect==='unit-scouts-6'?'Derived ability: Scouts 6" applied to the bearer Datasheet only. No Bodyguard Datasheet is mutated without attachment evidence.':'Derived ability: Scouts 6" applied to the bearer Datasheet only. The Battle-shock re-roll aura remains conditional and no Bodyguard Datasheet is mutated without attachment evidence.');}else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');
    }
  }
  function decorateBa(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item){const identity=`${resolution.item.detachmentId}|${resolution.item.ruleId}`;if(inheritedBaSmEffects.has(identity))applySmEffect(card,article,resolution.item);else applyBaEffect(card,article,resolution.item);}list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function applySmEffect(card,article,item){
    const effect=smEffects.get(normalize(item.title));
    if(effect==='ranged-sustained-hits-1'||effect==='ranged-ignores-cover'){
      const label=effect==='ranged-sustained-hits-1'?'SUSTAINED HITS 1':'IGNORES COVER';if(tagWeapons(card,'ranged',label,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,`Derived profiles: ${label} applied to the bearer's ranged weapons.`);}else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');return;
    }
    if(effect==='save-2-feel-no-pain-5'){
      const save=setSmStat(card,'Sv','2+',effect),ability=addSharedAbility(card,'Feel No Pain 5+','core-feel-no-pain',effect);if(save&&ability){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: Save 2+ and Feel No Pain 5+ applied to the bearer.');}else warning(article,'Effect could not be applied automatically because the Save characteristic or Abilities block was not found.');return;
    }
    if(effect==='melee-strength-plus-3'){
      if(adjustWeapons(card,'melee',{S:3},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: +3 Strength applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='stealth-lone-operative'){
      const stealth=addSharedAbility(card,'Stealth','core-stealth',effect),lone=addSharedAbility(card,'Lone Operative','core-lone-operative',effect);if(stealth&&lone){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived abilities: Stealth and Lone Operative applied to the bearer.');}else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='feel-no-pain-4'){
      if(addSharedAbility(card,'Feel No Pain 4+','core-feel-no-pain',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Feel No Pain 4+ applied to the bearer.');}else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='reroll-damage-attacks'){
      article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived permanent ability: this unit can re-roll Damage rolls and rolls to determine a weapon’s Attacks characteristic.');return;
    }
    if(effect==='new-weapon-profile'){
      if(addSmWeaponProfile(card,item.profile,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: the complete source-backed Orksbane melee weapon was added to this roster instance.');}else warning(article,'The Orksbane weapon profile could not be added because its complete structured profile or melee weapon table was unavailable.');return;
    }
    warning(article,'No permanent Datasheet mutation was applied because this Enhancement does not have a safe deterministic projection.');
  }
  function applyDaEffect(card,article,item){
    const effect=daEffects.get(`${item.detachmentId}|${item.ruleId}`),note=daNotes.get(effect);
    if(effect==='unit-scouts-9'){
      if(addSharedAbility(card,'Scouts 9"','core-scouts',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Scouts 9" applied to the bearer Datasheet only. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(note){derivedNote(article,effect,note);return;}
    if(effect==='melee-precision'){
      if(tagWeapons(card,'melee','PRECISION',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Precision applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='plasma-range-plus-6'){
      const rows=weaponRows(card,'ranged').filter(row=>normalize(row.dataset.sourceField).includes('plasma'));
      if(adjustTyranidsRows(rows,{Range:6},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +6" Range applied only to plasma ranged weapons on this roster instance.');}else warning(article,'Effect could not be applied automatically because no structured plasma ranged weapon profiles were found.');return;
    }
    if(effect==='melee-lethal-hits-vowed-critical'){
      if(tagWeapons(card,'melee','LETHAL HITS',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Lethal Hits applied to the bearer's melee weapons. Critical Hits on unmodified Hit rolls of 5+ remain conditional on the bearer being within range of the Vowed objective marker.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='ranged-ignores-cover'){
      if(tagWeapons(card,'ranged','IGNORES COVER',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Ignores Cover applied to this exact owner's ranged weapons. No Bodyguard Datasheet is mutated without attachment evidence.");}else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');return;
    }
    if(effect==='melee-damage-plus-1'||effect==='melee-attacks-strength-damage-plus-1'||effect==='melee-strength-ap-damage'){
      const changes=effect==='melee-damage-plus-1'?{D:1}:effect==='melee-attacks-strength-damage-plus-1'?{A:1,S:1,D:1}:{S:2,AP:-1,D:1};
      if(adjustWeapons(card,'melee',changes,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,effect==='melee-damage-plus-1'?"Derived profiles: +1 Damage applied to the bearer's melee weapons.":effect==='melee-strength-ap-damage'?"Derived profiles: +2 Strength, improved Armour Penetration and +1 Damage applied to the bearer's melee weapons.":"Derived profiles: +1 Attacks, Strength and Damage applied to the bearer's melee weapons. The +2 values remain conditional on the bearer being Battle-shocked and are not applied permanently.");}else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
  }
  function decorate(card,roster,units){
    if(tauBook())return decorateTau(card,roster,units);
    if(ecBook())return decorateEc(card,roster,units);
    if(tyranidsBook())return decorateTyranids(card,roster,units);
    if(csmBook())return decorateCsm(card,roster,units);
    if(smBook())return decorateSm(card,roster,units);
    if(daBook())return decorateDa(card,roster,units);
    if(baBook())return decorateBa(card,roster,units);
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
  if(!root.WHBookRosterEnhancements?.registerProvider)throw new Error('Shared Roster Enhancement contract is unavailable');
  root.WHBookRosterEnhancements.registerProvider(Object.freeze({decorate,assignedRuleIds(roster,units){return csmBook()||smBook()||daBook()||baBook()?[...new Set(csmAssignments(roster,units).filter(item=>item.status==='resolved').map(item=>item.item.ruleId))]:[];},assignedRecords(roster,units){return daBook()?csmAssignments(roster,units).filter(item=>item.status==='resolved').map(item=>item.item):[];}}));
}(typeof window==='undefined'?globalThis:window));
