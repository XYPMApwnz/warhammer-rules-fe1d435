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
  const resolveRosterDetachmentId=(normalizedIds,availableIds)=>{const ids=new Set(normalizedIds.filter(Boolean));if(ids.size!==1)return null;const[id]=ids;return availableIds.filter(candidate=>candidate===id).length===1?id:null;};
  let relatedRulesEnabled = Boolean(compatibleRuntime?.compatibleStratagemsReviewEnabled);
  let compatibleRulesMatrix = null;
  let assignedEnhancementIds = rosterMode ? new Set() : null;
  if (!relatedRulesEnabled) relatedRules?.remove();

  if (rosterMode) {
    try {
      if (!unit || !relatedDetachment || !window.WHRosterParser || !window.WHRosterEnhancements) throw new Error('Roster runtime unavailable');
      const records = JSON.parse(localStorage.getItem('wh40k-rosters-v1')) || [];
      const record = records.find(item => item?.id === params.get('roster'));
      if (!record) throw new Error('Roster not found');
      const parsed = record?.sourceText ? window.WHRosterParser.parse(record.sourceText) : record?.roster;
      if (!parsed || !Array.isArray(parsed.units)) throw new Error('Roster data unavailable');
      const faction=String(parsed.faction||'').replace(/^Chaos\s*[-–—]\s*/i,'').trim().toLowerCase();
      if(faction!=='death guard')throw new Error('Roster faction unavailable');
      const normalizedDetachmentIds = (parsed.detachments?.length ? parsed.detachments.map(item => item.name || item.label) : [parsed.detachment]).map(slug).filter(Boolean);
      const resolvedDetachmentId = resolveRosterDetachmentId(normalizedDetachmentIds,[...relatedDetachment.options].map(option=>option.value));
      if (!resolvedDetachmentId) throw new Error('Roster Detachment unavailable');
      const matchingOptions = [...relatedDetachment.options].filter(option => option.value === resolvedDetachmentId);
      if (matchingOptions.length !== 1) throw new Error('Roster Detachment ambiguous');
      const [matchingOption] = matchingOptions;
      [...relatedDetachment.options].forEach(option => { if (option !== matchingOption) option.remove(); });
      relatedDetachment.value = resolvedDetachmentId;
      relatedDetachment.disabled = true;
      const unitSlug = unit.id.replace(/^unit-/, '');
      const matching = parsed.units.filter(item => slug(item.name) === unitSlug);
      const ownerIds=new Set(matching.map(item=>item.id));
      assignedEnhancementIds=new Set((parsed.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&ownerIds.has(item.ownerUnitId)).map(item=>`enhancement-${slug(item.name)}`));
      if (matching.length) window.WHRosterEnhancements.decorate(unit, parsed, matching);
    } catch {
      relatedRulesEnabled = false;
      relatedRules?.remove();
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

  function filterRelated() {
    if (!relatedContent || !unit || !compatibleRulesMatrix) return;
    const selected = relatedDetachment.value;
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
      const [response,matrix] = await Promise.all([fetch('./related-rules.inc?v=3'),compatibleRuntime.loadCompatibleStratagems(new URL('../generated/compatible-rules.json',scriptUrl))]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML = await response.text();compatibleRulesMatrix=matrix;
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
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    const trigger = event.target.closest('[data-term]');
    gesture = trigger ? { trigger, id: event.pointerId, x: event.clientX, y: event.clientY, moved: false } : null;
  }, { capture: true, passive: true });

  document.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 10) gesture.moved = true;
  }, { capture: true, passive: true });

  document.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    suppressed = { trigger: gesture.trigger, until: performance.now() + 700 };
    if (!gesture.moved) showTerm(gesture.trigger);
    gesture = null;
  }, { capture: true, passive: true });

  document.addEventListener('pointercancel', () => { gesture = null; }, { capture: true, passive: true });

  document.addEventListener('click', event => {
    const local = event.target.closest('[data-journey-target]');
    if (local) {
      document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({ block: 'start' });
      return;
    }

    const trigger = event.target.closest('[data-term]');
    if (!trigger) return;
    if (suppressed?.trigger === trigger && performance.now() < suppressed.until) {
      event.preventDefault();
      return;
    }
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
  if (relatedRulesEnabled && relatedDetachment) {
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
