(async function () {
  'use strict';

  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-stratagems-runtime.mjs?v=3',scriptUrl))
    .catch(error=>{console.warn('Compatible Stratagems unavailable.',error);return null;});

  const navButton = document.getElementById('navButton');
  const scrim = document.getElementById('navScrim');
  const dialog = document.getElementById('termDialog');
  const popupLayer = document.getElementById('termPopupStack');
  const nav = document.getElementById('mobileNav');
  const viewSwitch = document.querySelector('[data-view-switch]');
  const rosterGuides = document.querySelector('[data-roster-guides-link]');
  const relatedRules = document.getElementById('relatedRules');
  const relatedContent = document.getElementById('relatedRulesContent');
  const relatedDetachment = document.getElementById('relatedDetachment');
  const drawerMedia = window.matchMedia('(max-width: 800px)');
  let gesture = null;
  let suppressed = null;
  let relatedLoaded = false;
  let relatedKind = 'stratagems';
  const unit = document.querySelector('.unit-card');
  const params = new URLSearchParams(location.search);
  const rosterMode = params.has('roster');
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('death-guard')});
  window.WHGlossaryAutolink?.configure('death-guard');
  const popups=new window.DGPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});
  const slug = value => String(value || '').toLowerCase().replace(/['\u2019]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const canonicalUnitDefinition=unit=>window.WH_POINTS_CATALOG?.['death guard']?.units?.[normalize(unit?.name)]||null;
  const canonicalUnitKeywords=unit=>canonicalUnitDefinition(unit)?.keywords||[];
  const hasCanonicalRule=(unit,ruleId)=>window.WH_POINTS_CATALOG?.['death guard']?.units?.[normalize(unit?.name)]?.termIds?.includes(ruleId);
  const attachmentContract=(bodyguard,character)=>{
    const bodyguardDefinition=canonicalUnitDefinition(bodyguard),characterDefinition=canonicalUnitDefinition(character);
    if(!bodyguardDefinition||!characterDefinition||!characterDefinition.keywords?.includes('CHARACTER'))return null;
    const forward=[...(characterDefinition.relations?.canLead||[]),...(characterDefinition.relations?.canSupport||[])].find(item=>item.unitId===bodyguardDefinition.unitId);
    const reverse=[...(bodyguardDefinition.relations?.canBeLedBy||[]),...(bodyguardDefinition.relations?.canBeSupportedBy||[])].find(item=>item.unitId===characterDefinition.unitId);
    return forward&&reverse?{characterUnitId:characterDefinition.unitId,maxCharacters:Math.max(1,Number(forward.maxCharacters||reverse.maxCharacters||1))}:null;
  };
  const validPersistedAttachments=(roster,raw)=>{
    const units=new Map(roster.units.map(unit=>[unit.id,unit])),uses=new Map(),attachments={};
    for(const characterIds of Object.values(raw||{}))if(Array.isArray(characterIds))for(const characterId of characterIds)uses.set(characterId,(uses.get(characterId)||0)+1);
    for(const [bodyguardId,characterIds] of Object.entries(raw||{})){
      const bodyguard=units.get(bodyguardId);if(!bodyguard||!Array.isArray(characterIds)||!characterIds.length)continue;
      const selectedTypes=new Set(),contracts=[];let valid=true;
      for(const characterId of characterIds){
        const contract=attachmentContract(bodyguard,units.get(characterId));
        if(!contract||uses.get(characterId)!==1||selectedTypes.has(contract.characterUnitId)){valid=false;break;}
        selectedTypes.add(contract.characterUnitId);contracts.push(contract);
      }
      const limit=contracts.length?Math.max(...contracts.map(contract=>contract.maxCharacters)):0;
      if(valid&&characterIds.length<=limit)attachments[bodyguardId]=[...characterIds];
    }
    return attachments;
  };
  const addLethalHits=row=>{const tags=row.querySelector('.weapon-tags');if(!tags||[...tags.children].some(tag=>normalize(tag.textContent)==='lethal hits'))return;const tag=document.createElement('button');tag.type='button';tag.className='tag';tag.dataset.term='core-lethal-hits';tag.textContent='LETHAL HITS';tags.append(tag);};
  const addEyeOfAffliction=row=>{const tags=row.querySelector('.weapon-tags');if(!tags||tags.querySelector('.roster-eye-of-affliction'))return;const tag=document.createElement('span');tag.className='tag roster-eye-of-affliction';tag.textContent='IGNORES COVER vs AFFLICTED';tags.append(tag);};
  const addWeaponAbility=(row,title,term)=>{const tags=row.querySelector('.weapon-tags');if(!tags||[...tags.children].some(tag=>normalize(tag.textContent)===normalize(title)))return;const tag=document.createElement('button');tag.type='button';tag.className='tag';tag.dataset.term=term;tag.textContent=title;tags.append(tag);};
  const renderAttachedUnits=(card,units,roster,attachments)=>{
    const byId=new Map(roster.units.map(item=>[item.id,item])),totals=new Map(),seen=new Map(),labels=new Map();roster.units.forEach(item=>{const key=normalize(item.name);totals.set(key,(totals.get(key)||0)+1);});roster.units.forEach(item=>{const key=normalize(item.name),index=(seen.get(key)||0)+1;seen.set(key,index);labels.set(item.id,totals.get(key)>1?`${item.name} #${index}`:item.name);});
    const groups=Object.entries(attachments).map(([bodyguardId,characterIds])=>{const bodyguard=byId.get(bodyguardId),characters=characterIds.map(id=>byId.get(id)).filter(Boolean),members=[bodyguard,...characters].filter(Boolean),aggregateUnitKeywords=[...new Set(members.flatMap(canonicalUnitKeywords))].sort();return{bodyguard,characters,ids:new Set([bodyguardId,...characterIds]),aggregateUnitKeywords};}).filter(group=>group.bodyguard&&group.characters.length);
    const root=card.querySelector('[id$="-abilities"] .ability-list');if(!root)return;const allEnhancements=window.WHRosterEnhancements?.enriched(roster)||[],eyeOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='eye of affliction'),revoltingOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='revolting regeneration'),archOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='arch contaminator');
    units.forEach(instance=>{const group=groups.find(item=>item.ids.has(instance.id)),biologus=group?.characters.find(item=>normalize(item.name)==='biologus putrifier')||null,tallyman=group?.characters.find(item=>normalize(item.name)==='tallyman')||null,eyeOfAffliction=eyeOwners.some(item=>item.ownerUnitId===instance.id||group?.ids.has(item.ownerUnitId)),revoltingRegeneration=revoltingOwners.some(item=>item.ownerUnitId===instance.id),isBodyguard=group?.bodyguard.id===instance.id,vectorSource=group?.characters.find(item=>hasCanonicalRule(item,'ability-vector-of-disease-2498580'))||null,giftSource=group?.characters.find(item=>hasCanonicalRule(item,'ability-gift-of-contagion-psychic-4fea300'))||null,blindingSource=group?.characters.find(item=>hasCanonicalRule(item,'ability-blinding-spray-7d189f5'))||null,silentBodyguard=Boolean(group&&!isBodyguard&&hasCanonicalRule(group.bodyguard,'ability-silent-bodyguard-03a0a1b')&&canonicalUnitKeywords(instance).includes('CHARACTER')),archContaminator=Boolean(isBodyguard&&archOwners.some(item=>group?.ids.has(item.ownerUnitId)));if(!group&&!eyeOfAffliction&&!revoltingRegeneration)return;const article=document.createElement('article');article.className='ability roster-attached-unit';article.dataset.rosterInstanceId=instance.id;if(group)article.dataset.aggregateUnitKeywords=group.aggregateUnitKeywords.join('|');const heading=document.createElement('h5');heading.textContent=`${labels.get(instance.id)} · ${group?'Attached Unit':'Enhancement projection'}`;article.append(heading);if(group){const members=document.createElement('p');members.textContent=`Attached Unit: ${[group.bodyguard,...group.characters].map(item=>labels.get(item.id)||item.name).join(', ')}`;article.append(members);}let projection=null;const ensureProjection=()=>{if(projection)return projection;projection=document.createElement('div');projection.className='roster-attached-weapons';[...card.querySelectorAll('.weapon-group')].filter(weaponGroup=>!weaponGroup.closest('.roster-attached-unit')).forEach(weaponGroup=>{const clone=weaponGroup.cloneNode(true);clone.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));projection.append(clone);});article.append(projection);return projection;};if(biologus){const note=document.createElement('p');note.className='roster-derived-note roster-foul-infusion';note.textContent='Foul Infusion: these weapon profiles have LETHAL HITS; unmodified Hit rolls of 5+ score a Critical Hit.';article.append(note);ensureProjection().querySelectorAll('.weapon-row:not(.weapon-head)').forEach(addLethalHits);}if(tallyman){const note=document.createElement('p');note.className='roster-derived-note roster-malicious-calculations';note.textContent='Malicious Calculations: when a model in this Attached Unit attacks, you can ignore modifiers to its BS or WS and/or modifiers to the Hit roll.';article.append(note);}if(vectorSource){[...ensureProjection().querySelectorAll('.weapon-group')].filter(weaponGroup=>normalize(weaponGroup.querySelector('h5')?.textContent).includes('melee weapons')).forEach(weaponGroup=>weaponGroup.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{addWeaponAbility(row,'SUSTAINED HITS 1','core-sustained-hits');addWeaponAbility(row,'LANCE','core-lance');}));}if(silentBodyguard){const note=document.createElement('p');note.className='roster-derived-note roster-silent-bodyguard';note.textContent='Silent Bodyguard: this CHARACTER model has Feel No Pain 4+ while leading Deathshroud Terminators.';article.append(note);}if(isBodyguard&&giftSource){const note=document.createElement('p');note.className='roster-derived-note roster-gift-of-contagion';note.textContent='Gift of Contagion: while this Attached Unit targets an AFFLICTED unit, those attacks have SUSTAINED HITS 1.';article.append(note);}if(archContaminator){const note=document.createElement('p');note.className='roster-derived-note roster-arch-contaminator';note.textContent='Arch Contaminator: while this Attached Unit is within range of an objective marker you control, models in it can re-roll the Wound roll.';article.append(note);}if(isBodyguard&&blindingSource){const note=document.createElement('p');note.className='roster-derived-note roster-blinding-spray';note.textContent='Blinding Spray (activation): in the Fight phase, Foul Blightspawn can give this Attached Unit Fights First until the end of the phase; once per battle.';article.append(note);}if(eyeOfAffliction){const note=document.createElement('p');note.className='roster-derived-note roster-eye-of-affliction-note';note.textContent='Eye of Affliction: ranged weapons have IGNORES COVER while targeting an AFFLICTED enemy unit.';article.append(note);[...ensureProjection().querySelectorAll('.weapon-group')].filter(weaponGroup=>normalize(weaponGroup.querySelector('h5')?.textContent).includes('ranged weapons')).forEach(weaponGroup=>weaponGroup.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(addEyeOfAffliction));}if(revoltingRegeneration){const note=document.createElement('p');note.className='roster-derived-note roster-revolting-regeneration';note.textContent='Revolting Regeneration: this bearer has Feel No Pain 5+.';article.append(note);}root.append(article);});
  };
  const resolveRosterDetachmentIds=(normalizedIds,availableIds)=>{const ids=[...new Set(normalizedIds.filter(Boolean))];return ids.length&&ids.every(id=>availableIds.filter(candidate=>candidate===id).length===1)?ids:null;};
  let relatedRulesEnabled = Boolean(compatibleRuntime?.compatibleStratagemsReviewEnabled);
  let compatibleRulesMatrix = null;
  let assignedEnhancementIds = rosterMode ? new Set() : null;
  let rosterDetachmentIds = [];
  if (!relatedRulesEnabled) relatedRules?.remove();

  if (rosterMode) {
    try {
      if (!window.WHRosterParser) throw new Error('Roster runtime unavailable');
      const records = JSON.parse(localStorage.getItem('wh40k-rosters-v1')) || [];
      const record = records.find(item => item?.id === params.get('roster'));
      if (!record) throw new Error('Roster not found');
      const parsed = record?.sourceText ? window.WHRosterParser.parse(record.sourceText) : record?.roster;
      if (!parsed || !Array.isArray(parsed.units)) throw new Error('Roster data unavailable');
      const faction=String(parsed.faction||'').replace(/^Chaos\s*[-–—]\s*/i,'').trim().toLowerCase();
      if(faction!=='death guard')throw new Error('Roster faction unavailable');
      const selected=new Set(parsed.units.map(item=>slug(item.name)));
      const normalizedDetachmentIds = (parsed.detachments?.length ? parsed.detachments.map(item => item.name || item.label) : [parsed.detachment]).map(slug).filter(Boolean);
      const detachmentLinks=[...nav.querySelectorAll('.phone-tree > details:first-of-type .mobile-nav-branch > a')];
      rosterDetachmentIds = resolveRosterDetachmentIds(normalizedDetachmentIds,detachmentLinks.map(link=>slug(link.textContent.replace(/\s+\d+\s*DP$/i,''))));
      if (!rosterDetachmentIds) throw new Error('Roster Detachment unavailable');
      if(relatedDetachment){relatedDetachment.value = 'all';relatedDetachment.closest('label')?.remove();}
      const attachments=validPersistedAttachments(parsed,record.attachments);
      window.DG_ROSTER_GUIDE=Object.freeze({detachmentIds:rosterDetachmentIds,attachments});
      const unitSlug = unit?.id.replace(/^unit-/, '');
      const matching = unit ? parsed.units.filter(item => slug(item.name) === unitSlug) : [];
      if(unit&&!matching.length)throw new Error('Roster unit unavailable');
      const ownerIds=new Set(matching.map(item=>item.id));
      assignedEnhancementIds=new Set((parsed.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&ownerIds.has(item.ownerUnitId)).map(item=>`enhancement-${slug(item.name)}`));
      if (matching.length){window.WHRosterEnhancements?.decorate(unit, parsed, matching);renderAttachedUnits(unit,matching,parsed,attachments);}
      for(const link of nav.querySelectorAll('a[href$=".html"]')){const destination=new URL(link.href);destination.searchParams.set('roster',params.get('roster'));link.href=destination.href;if(link.closest('.mobile-unit-groups')&&!selected.has(slug(link.textContent)))link.remove();}
      for(const link of detachmentLinks)if(!rosterDetachmentIds.includes(slug(link.textContent.replace(/\s+\d+\s*DP$/i,''))))link.remove();
      for(const group of nav.querySelectorAll('.mobile-unit-groups > details'))if(!group.querySelector('a'))group.remove();
      document.documentElement.dataset.rosterActive='true';
  } catch {
    location.replace('../../../roster-guides/index.html');
    return;
  }
}

  if (rosterGuides) rosterGuides.hidden = !params.get('roster');
  if (viewSwitch) {
    const destination = new URL(viewSwitch.href);
    destination.search = params.toString();
    viewSwitch.href = destination.href;
  }

  function drawer(open) {
    document.body.classList.toggle('nav-drawer-open', open);
    navButton.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
    scrim.hidden = !open;
  }

  function syncDrawerMode() {
    const returnFocus = nav.contains(document.activeElement);
    if (drawerMedia.matches) drawer(false);
    else {
      document.body.classList.remove('nav-drawer-open');
      nav.setAttribute('aria-hidden', 'false');
      scrim.hidden = true;
    }
    if (returnFocus && nav.getAttribute('aria-hidden') === 'true') navButton.focus({ preventScroll: true });
  }

  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);

  function decorateStratagemTurns(root) {
    root.querySelectorAll('.stratagem').forEach(card => {
      const when = [...card.querySelectorAll('.field')].find(field => field.querySelector('b')?.textContent.trim().toLowerCase() === 'when')?.textContent || '';
      const turn = /opponent|enemy/i.test(when) ? 'THEIR TURN' : /your\b/i.test(when) ? 'YOUR TURN' : 'ANY TURN';
      card.dataset.turn = turn;
      card.classList.remove('turn-any', 'turn-yours', 'turn-their');
      card.classList.add(turn === 'THEIR TURN' ? 'turn-their' : turn === 'YOUR TURN' ? 'turn-yours' : 'turn-any');
    });
  }
  function decorateStratagemTypes(root) {
    root.querySelectorAll('.stratagem').forEach(card => {
      if (/^(battle-tactic|strategic-ploy|wargear|epic-deed|core|unknown)$/.test(card.dataset.stratagemType || '')) return;
      const match = card.querySelector('.stratagem-type')?.textContent.trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i);
      card.dataset.stratagemType = match ? match[1].toLowerCase().replace(/\s+/g, '-') : 'unknown';
    });
  }
  decorateStratagemTurns(document);decorateStratagemTypes(document);

  function filterRelated() {
    if (!relatedContent || !unit || !compatibleRulesMatrix) return;
    const selected = rosterMode ? 'all' : relatedDetachment.value;
    const compatible=compatibleRuntime.getCompatibleStratagems(compatibleRulesMatrix,unit.id,{detachmentId:selected,warlord:unit.dataset.rosterWarlord==='true'}),rules=assignedEnhancementIds?compatible.filter(rule=>rule.kind!=='enhancement'||assignedEnhancementIds.has(rule.ruleId)):compatible,byId=new Map(rules.map(rule=>[rule.ruleId,rule]));
    const hasEnhancements=rules.some(rule=>rule.kind==='enhancement');
    if(relatedKind==='enhancements'&&!hasEnhancements)relatedKind='stratagems';
    relatedRules.querySelector('[data-related-tab="enhancements"]').hidden=!hasEnhancements;
    relatedRules.querySelector('h2').textContent=hasEnhancements?'Compatible Stratagems & Enhancements':'Compatible Stratagems';
    relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card => {
      const result=byId.get(card.id);
      card.hidden=!result;
      card.dataset.matchState=result?.state||'no-match';
      card.querySelector(':scope > .compatibility-status')?.remove();
      if(result?.state==='conditional'){
        const status=document.createElement('p');status.className='compatibility-status';
        status.innerHTML='<strong>Conditionally compatible</strong><span></span>';
        status.querySelector('span').textContent=compatibleRuntime.conditionLabels[result.condition];
        card.prepend(status);
      }
    });
    relatedContent.querySelectorAll('[data-related-kind]').forEach(group => {
      group.hidden = group.dataset.relatedKind !== relatedKind || ![...group.querySelectorAll('.stratagem,.enhancement')].some(card => !card.hidden);
    });
    relatedContent.querySelectorAll('.related-detachment').forEach(section => {
      const chosen = section.dataset.detachment === 'core' || selected === 'all' || section.dataset.detachment === selected;
      section.hidden = !chosen || ![...section.querySelectorAll('[data-related-kind]')].some(group => !group.hidden);
    });
    relatedRules.querySelectorAll('[data-related-tab]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.relatedTab === relatedKind));
    });
    const hasVisible=[...relatedContent.querySelectorAll('.related-detachment')].some(section=>!section.hidden);
    let empty=relatedContent.querySelector('.related-empty');
    if(!hasVisible&&!empty){empty=document.createElement('p');empty.className='related-status related-empty';relatedContent.append(empty);}
    if(empty){empty.hidden=hasVisible;empty.textContent=`No matching ${relatedKind} for this datasheet.`;}
  }

  async function loadRelated() {
    if (relatedLoaded) return;
    try {
      const [response,matrix] = await Promise.all([fetch('./related-rules.inc?v=4'),compatibleRuntime.loadCompatibleStratagems(new URL('../generated/compatible-rules.json',scriptUrl))]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML = await response.text();
      if(rosterMode)relatedContent.querySelectorAll('.related-detachment:not(.related-core)').forEach(section=>{if(!rosterDetachmentIds.includes(section.dataset.detachment))section.remove();});decorateStratagemTurns(relatedContent);decorateStratagemTypes(relatedContent);compatibleRulesMatrix=matrix;
      const tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-related-tab="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-related-tab="enhancements" aria-pressed="false">Enhancements</button>';
      relatedRules.querySelector('.related-controls')?.append(tabs);
      relatedLoaded = true;
      filterRelated();
    } catch {
      relatedLoaded = false;
      const retry=document.createElement('button');retry.type='button';retry.className='related-retry';retry.textContent='Try again';retry.addEventListener('click',loadRelated);
      const message=document.createElement('p');message.className='related-status';message.textContent='Could not load related rules. Check the connection and try again.';
      relatedContent.replaceChildren(message,retry);
    }
  }

  document.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') { suppressed = null; return; }
    if (!event.isPrimary) return;
    suppressed = null;
    const trigger = event.target.closest('[data-term]');
    gesture = trigger ? { trigger, id: event.pointerId, x: event.clientX, y: event.clientY, moved: false } : null;
  }, { capture: true, passive: true });

  document.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 10) gesture.moved = true;
  }, { capture: true, passive: true });

  document.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const completed = gesture;
    gesture = null;
    if (completed.moved) return;
    suppressed = { trigger: completed.trigger, until: performance.now() + 700 };
    showTerm(completed.trigger);
  }, { capture: true, passive: true });

  document.addEventListener('pointercancel', () => { gesture = null; suppressed = null; }, { capture: true, passive: true });

  document.addEventListener('click', event => {
    if (!suppressed) return;
    const active = performance.now() < suppressed.until;
    suppressed = null;
    if (active) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, { capture: true });

  document.addEventListener('click', event => {
    const local = event.target.closest('[data-journey-target]');
    if (local) {
      document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({ block: 'start' });
      return;
    }

    const trigger = event.target.closest('[data-term]');
    if (!trigger) return;
    showTerm(trigger);
  });

  navButton.addEventListener('click', () => drawer(!document.body.classList.contains('nav-drawer-open')));
  scrim.addEventListener('click', () => drawer(false));
  if (relatedRulesEnabled && relatedRules) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        loadRelated();
      }, { rootMargin: '600px 0px' });
      observer.observe(relatedRules);
    } else loadRelated();
  }
  if (relatedRulesEnabled && relatedDetachment && !rosterMode) {
    try {
      const saved = localStorage.getItem('death-guard-detachment-filter');
      if (saved && relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`)) relatedDetachment.value = saved;
    } catch {}
    relatedDetachment.addEventListener('change', () => {
      try { localStorage.setItem('death-guard-detachment-filter', relatedDetachment.value); } catch {}
      filterRelated();
    });
    filterRelated();
  }
  if (relatedRulesEnabled) relatedRules?.addEventListener('click', event => {
    const tab = event.target.closest('[data-related-tab]');
    if (tab) {
      relatedKind = tab.dataset.relatedTab;
      filterRelated();
    }
  });
  drawerMedia.addEventListener?.('change', syncDrawerMode);
  syncDrawerMode();
  const documentTriggers=()=>[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({
    beforeRestore(){popups.closeAll({focus:false});},
    snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},
    restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}
  });

  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean);
    const trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
    requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});
  });
}());
