(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-rules-runtime.mjs?v=2',scriptUrl)).catch(error=>{console.warn('Compatible rules unavailable.',error);return null;});
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),title=document.getElementById('termTitle'),summary=document.getElementById('termSummary');
  const full=document.getElementById('termFull'),rule=document.getElementById('termRule'),returnPopup=document.getElementById('returnPopup');
  const viewSwitch=document.querySelector('[data-view-switch]'),relatedRules=document.getElementById('relatedRules');
  const relatedContent=document.getElementById('relatedRulesContent'),relatedDetachment=document.getElementById('relatedDetachment');
  const drawerMedia=matchMedia('(max-width: 800px)'),unit=document.querySelector('.unit-card'),params=new URLSearchParams(location.search),rosterMode=params.has('roster');
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/\s*\(aura\)\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim(),slug=value=>normalize(value).replace(/\s+/g,'-');
  function rosterContext(){if(!rosterMode)return null;let record;try{record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===params.get('roster'));}catch{}if(!record)return null;let roster=record.roster;if(record.sourceText&&window.WHRosterParser){const parsed=window.WHRosterParser.parse(record.sourceText);if(parsed.units.length)roster=parsed;}if(normalize(roster?.faction)!=='tyranids')return null;const owners=new Set((roster.units||[]).filter(item=>normalize(item.name)===normalize(unit?.dataset.unitTitle)).map(item=>item.id)),enhancements=new Set((roster.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&owners.has(item.ownerUnitId)).map(item=>normalize(item.name))),detachments=[...new Set((roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).filter(Boolean).map(slug))];return detachments.length?{detachments,enhancements}:null;}
  const roster=rosterContext(),relatedRulesEnabled=compatibleRuntime?.compatibleRulesEnabled===true&&(!rosterMode||!!roster);
  let gesture=null,suppressed=null,opener=null,openedByTouch=false,relatedLoaded=false,relatedKind='stratagems';
  let compatibleMatrix,assignedEnhancementRuleIds=new Set();
  if(!relatedRulesEnabled)relatedRules?.remove();

  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=params.toString();if(location.hash)destination.hash=location.hash;viewSwitch.href=destination.href;}
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  const triggers=()=>[...document.querySelectorAll('[data-term]')];
  function showTerm(trigger,byTouch=false){
    const id=trigger?.dataset.term,termSummary=trigger?.dataset.termSummary;
    if(!id||!termSummary)return;
    opener=trigger;openedByTouch=byTouch;title.textContent=trigger.dataset.termTitle||trigger.textContent.trim();summary.textContent=termSummary;
    full.href=`../../../glossary/index.html#${encodeURIComponent(id)}`;
    const rulePath=trigger.dataset.mobileRulePath||trigger.dataset.fullRulePath;rule.hidden=!rulePath;
    if(rulePath){const destination=new URL(window.WHGlossaryReturn.href(rulePath));if(trigger.dataset.mobileRulePath)destination.search=location.search;rule.href=destination.href;}
    if(!dialog.open)dialog.showModal();
  }
  function savePopupReturn(mode){
    if(!opener)return;
    window.WHGlossaryReturn.save({termId:opener.dataset.term,triggerIndex:triggers().indexOf(opener)});
    window.WHGlossaryReturn.setRestoreMode(mode);
  }
  function restorePopup(record){
    const all=triggers(),indexed=all[record.triggerIndex],trigger=indexed?.dataset.term===record.termId?indexed:all.find(node=>node.dataset.term===record.termId);
    history.replaceState(history.state,'',record.path);window.scrollTo(record.scrollX||0,record.scrollY||0);
    requestAnimationFrame(()=>{if(trigger)showTerm(trigger);window.WHGlossaryReturn.clear();returnPopup.hidden=true;});
  }
  function syncReturn(){
    const record=window.WHGlossaryReturn.read();
    returnPopup.hidden=!record||window.WHGlossaryReturn.shouldRestoreAutomatically(record);
    if(record)returnPopup.href=record.path;
    return record;
  }
  full.addEventListener('click',()=>savePopupReturn('automatic'));
  rule.addEventListener('click',()=>{savePopupReturn('manual');dialog.close();setTimeout(syncReturn,0);});
  returnPopup.addEventListener('click',event=>{
    const record=window.WHGlossaryReturn.read();if(!record)return;
    if(window.WHGlossaryReturn.isSameDocument(record)){event.preventDefault();restorePopup(record);return;}
    window.WHGlossaryReturn.setRestoreMode('automatic');
  });

  function filterRelated(){
    if(!relatedRulesEnabled||!relatedContent||!unit||!relatedLoaded)return;
    const selected=relatedDetachment.value,allowed=new Map(compatibleRuntime.getCompatibleRules(compatibleMatrix,unit.id,{detachmentId:selected}).filter(item=>!rosterMode||item.kind!=='enhancement'||assignedEnhancementRuleIds.has(item.ruleId)).map(item=>[item.ruleId,item]));
    relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card=>{
      const result=allowed.get(card.dataset.ruleId||card.id);card.hidden=!result;card.dataset.matchState=result?.state||'no-match';
      card.querySelector(':scope > .compatibility-status')?.remove();
      if(result?.state==='conditional'){
        const status=document.createElement('p');status.className='compatibility-status';
        const heading=document.createElement('strong');heading.textContent='Conditionally compatible';status.append(heading);for(const condition of compatibleRuntime.conditionsFor(result)){const line=document.createElement('span');line.textContent=compatibleRuntime.conditionLabels[condition]||'Check the full card conditions';status.append(line);}
        card.prepend(status);
      }
    });
    const enhancementTab=relatedRules.querySelector('[data-related-tab="enhancements"]');
    const hasEnhancements=[...relatedContent.querySelectorAll('.enhancement')].some(card=>!card.hidden);
    if(enhancementTab)enhancementTab.hidden=!hasEnhancements;
    if(relatedKind==='enhancements'&&!hasEnhancements)relatedKind='stratagems';
    relatedContent.querySelectorAll('[data-related-kind]').forEach(group=>group.hidden=group.dataset.relatedKind!==relatedKind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden));
    relatedContent.querySelectorAll('.related-detachment').forEach(section=>{const selectedDetachment=section.dataset.detachment==='core'||selected==='all'||section.dataset.detachment===selected;section.hidden=!selectedDetachment||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden);});
    relatedRules.querySelectorAll('[data-related-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.relatedTab===relatedKind)));
    const hasVisible=[...relatedContent.querySelectorAll('.related-detachment')].some(section=>!section.hidden);
    let empty=relatedContent.querySelector('.related-empty');
    if(!hasVisible&&!empty){empty=document.createElement('p');empty.className='related-status related-empty';relatedContent.append(empty);}
    if(empty){empty.hidden=hasVisible;empty.textContent=`No matching ${relatedKind} for this datasheet.`;}
  }
  async function loadRelated(){
    if(!relatedRulesEnabled||relatedLoaded)return;
    try{
      const [response,matrix]=await Promise.all([fetch('./related-rules.inc?v=4'),compatibleRuntime.loadCompatibleRules(new URL('../generated/compatible-rules.json',scriptUrl))]);if(!response.ok)throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML=await response.text();compatibleMatrix=matrix;relatedLoaded=true;
      if(rosterMode){assignedEnhancementRuleIds=new Set([...relatedContent.querySelectorAll('.enhancement[data-enhancement-title]')].filter(card=>roster.enhancements.has(normalize(card.dataset.enhancementTitle))).map(card=>card.dataset.ruleId||card.id));[...relatedDetachment.options].forEach(option=>{if(option.value==='all'||!roster.detachments.includes(option.value))option.remove();});if(!relatedDetachment.options.length)throw new Error('Roster data unavailable');relatedDetachment.value=relatedDetachment.options[0].value;relatedDetachment.disabled=relatedDetachment.options.length===1;document.querySelector('[data-roster-guides-link]')?.removeAttribute('hidden');}
      filterRelated();
    }catch{
      const message=document.createElement('p');message.className='related-status';message.textContent='Could not load related rules. Check the connection and try again.';
      const retry=document.createElement('button');retry.type='button';retry.className='related-retry';retry.textContent='Try again';retry.addEventListener('click',loadRelated);relatedContent.replaceChildren(message,retry);
    }
  }

  document.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'||!event.isPrimary)return;const trigger=event.target.closest('[data-term]');gesture=trigger?{trigger,id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}:null;},{capture:true,passive:true});
  document.addEventListener('pointermove',event=>{if(gesture&&gesture.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>10)gesture.moved=true;},{capture:true,passive:true});
  document.addEventListener('pointerup',event=>{if(!gesture||gesture.id!==event.pointerId)return;suppressed={trigger:gesture.trigger,until:performance.now()+700};if(!gesture.moved)showTerm(gesture.trigger,true);gesture=null;},{capture:true,passive:true});
  document.addEventListener('pointercancel',()=>{gesture=null;},{capture:true,passive:true});
  document.addEventListener('click',event=>{
    const local=event.target.closest('[data-journey-target]');if(local){event.preventDefault();document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({block:'start'});return;}
    const trigger=event.target.closest('[data-term]');if(!trigger)return;
    if(suppressed?.trigger===trigger&&performance.now()<suppressed.until){event.preventDefault();return;}event.preventDefault();showTerm(trigger);
  });
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{if(openedByTouch)requestAnimationFrame(()=>opener?.blur());openedByTouch=false;});
  if(relatedRulesEnabled&&relatedRules){if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();loadRelated();}},{rootMargin:'600px 0px'});observer.observe(relatedRules);}else loadRelated();}
  if(relatedRulesEnabled&&relatedDetachment){try{const saved=localStorage.getItem('tyranids-detachment-filter');if(saved&&relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`))relatedDetachment.value=saved;}catch{}relatedDetachment.addEventListener('change',()=>{try{localStorage.setItem('tyranids-detachment-filter',relatedDetachment.value);}catch{}filterRelated();});}
  if(relatedRulesEnabled)relatedRules?.addEventListener('click',event=>{const tab=event.target.closest('[data-related-tab]');if(tab){relatedKind=tab.dataset.relatedTab;filterRelated();}});
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();
  window.WHPageState?.installTermDialog({dialog,triggers,opener:()=>opener,open:trigger=>showTerm(trigger,false)});
  const returnRecord=window.WHGlossaryReturn.read();
  if(window.WHGlossaryReturn.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>restorePopup(returnRecord));else syncReturn();
}());
