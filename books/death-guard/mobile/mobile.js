(async function () {
  'use strict';

  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-stratagems-runtime.mjs?v=2',scriptUrl))
    .catch(error=>{console.warn('Compatible Stratagems unavailable.',error);return null;});

  const navButton = document.getElementById('navButton');
  const scrim = document.getElementById('navScrim');
  const dialog = document.getElementById('termDialog');
  const title = document.getElementById('termTitle');
  const summary = document.getElementById('termSummary');
  const full = document.getElementById('termFull');
  const rule = document.getElementById('termRule');
  const nav = document.getElementById('mobileNav');
  const viewSwitch = document.querySelector('[data-view-switch]');
  const rosterGuides = document.querySelector('[data-roster-guides-link]');
  const relatedRules = document.getElementById('relatedRules');
  const relatedContent = document.getElementById('relatedRulesContent');
  const relatedDetachment = document.getElementById('relatedDetachment');
  const drawerMedia = window.matchMedia('(max-width: 800px)');
  let gesture = null;
  let suppressed = null;
  let opener = null;
  let openedByTouch = false;
  let relatedLoaded = false;
  let relatedKind = 'stratagems';
  const unit = document.querySelector('.unit-card');
  const params = new URLSearchParams(location.search);
  const rosterMode = params.has('roster');
  const slug = value => String(value || '').toLowerCase().replace(/['\u2019]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
      const detachmentIds = new Set((parsed.detachments?.length ? parsed.detachments.map(item => item.name || item.label) : [parsed.detachment]).map(slug).filter(Boolean));
      const allowedOptions = [...relatedDetachment.options].filter(option => detachmentIds.has(option.value));
      if (!allowedOptions.length) throw new Error('Roster Detachment unavailable');
      [...relatedDetachment.options].forEach(option => { if (!detachmentIds.has(option.value)) option.remove(); });
      relatedDetachment.value = relatedDetachment.options[0].value;
      relatedDetachment.disabled = relatedDetachment.options.length === 1;
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

  function showTerm(trigger, byTouch) {
    const id = trigger.dataset.term;
    const termTitle = trigger.dataset.termTitle || trigger.textContent.trim();
    const termSummary = trigger.dataset.termSummary;
    if (!id || !termSummary) return;
    opener = trigger;
    openedByTouch = byTouch;
    title.textContent = termTitle;
    summary.textContent = termSummary;
    full.href = `../../../glossary/index.html#${id}`;
    const rulePath = trigger.dataset.mobileRulePath || trigger.dataset.fullRulePath;
    rule.hidden = !rulePath;
    if (rulePath) {
      const destination = new URL(window.WHGlossaryReturn.href(rulePath));
      if (trigger.dataset.mobileRulePath) destination.search = location.search;
      rule.href = destination.href;
    }
    dialog.showModal();
  }

  full.addEventListener('click', () => {
    const triggers=[...document.querySelectorAll('[data-term]')];
    window.WHGlossaryReturn?.save({termId:opener?.dataset.term||'',triggerIndex:opener?triggers.indexOf(opener):-1});
  });

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
      const chosen = section.dataset.detachment === 'core' || section.dataset.detachment === selected;
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
    if (!gesture.moved) showTerm(gesture.trigger, true);
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
    showTerm(trigger, false);
  });

  navButton.addEventListener('click', () => drawer(!document.body.classList.contains('nav-drawer-open')));
  scrim.addEventListener('click', () => drawer(false));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (openedByTouch) requestAnimationFrame(() => opener?.blur());
    openedByTouch = false;
  });
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
  window.WHPageState?.installTermDialog({ dialog, triggers: () => [...document.querySelectorAll('[data-term]')], opener: () => opener, open: trigger => showTerm(trigger, false) });

  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const triggers=[...document.querySelectorAll('[data-term]')];
    const indexed=triggers[returnRecord.triggerIndex];
    const trigger=indexed?.dataset.term===returnRecord.termId?indexed:triggers.find(node=>node.dataset.term===returnRecord.termId);
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
    requestAnimationFrame(()=>{if(trigger)showTerm(trigger,false);window.WHGlossaryReturn.clear();});
  });
}());
