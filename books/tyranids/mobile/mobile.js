(function(){
  'use strict';
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),title=document.getElementById('termTitle'),summary=document.getElementById('termSummary');
  const full=document.getElementById('termFull'),rule=document.getElementById('termRule'),returnPopup=document.getElementById('returnPopup');
  const viewSwitch=document.querySelector('[data-view-switch]'),relatedRules=document.getElementById('relatedRules');
  const relatedContent=document.getElementById('relatedRulesContent'),relatedDetachment=document.getElementById('relatedDetachment');
  const drawerMedia=matchMedia('(max-width: 800px)'),unit=document.querySelector('.unit-card'),params=new URLSearchParams(location.search);
  let gesture=null,suppressed=null,opener=null,openedByTouch=false,relatedLoaded=false,relatedKind='stratagems';

  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=params.toString();if(location.hash)destination.hash=location.hash;viewSwitch.href=destination.href;}
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}}
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
  function restorePopup(record,{push=false}={}){
    const all=triggers(),indexed=all[record.triggerIndex],trigger=indexed?.dataset.term===record.termId?indexed:all.find(node=>node.dataset.term===record.termId);
    history[push?'pushState':'replaceState'](history.state,'',record.path);window.scrollTo(record.scrollX||0,record.scrollY||0);
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
    if(window.WHGlossaryReturn.isSameDocument(record)){event.preventDefault();restorePopup(record,{push:true});return;}
    window.WHGlossaryReturn.setRestoreMode('automatic');
  });

  function filterRelated(){
    if(!relatedContent||!unit||!relatedLoaded)return;
    const selected=relatedDetachment.value,profile=window.WHArmyRelatedRules.profile(unit);
    relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card=>card.hidden=!window.WHArmyRelatedRules.matches(card,profile));
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
    if(relatedLoaded)return;
    try{
      const response=await fetch('./related-rules.inc?v=3');if(!response.ok)throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML=await response.text();relatedLoaded=true;filterRelated();
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
  if(relatedRules){if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();loadRelated();}},{rootMargin:'600px 0px'});observer.observe(relatedRules);}else loadRelated();}
  if(relatedDetachment){try{const saved=localStorage.getItem('tyranids-detachment-filter');if(saved&&relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`))relatedDetachment.value=saved;}catch{}relatedDetachment.addEventListener('change',()=>{try{localStorage.setItem('tyranids-detachment-filter',relatedDetachment.value);}catch{}filterRelated();});}
  relatedRules?.addEventListener('click',event=>{const tab=event.target.closest('[data-related-tab]');if(tab){relatedKind=tab.dataset.relatedTab;filterRelated();}});
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();
  const returnRecord=window.WHGlossaryReturn.read();
  if(window.WHGlossaryReturn.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>restorePopup(returnRecord));else syncReturn();
}());
