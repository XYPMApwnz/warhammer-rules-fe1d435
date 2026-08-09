(function(){
  'use strict';
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),popupLayer=document.getElementById('termPopupStack'),viewSwitch=document.querySelector('[data-view-switch]');
  const drawerMedia=matchMedia('(max-width: 800px)'),params=new URLSearchParams(location.search);
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('space-marines'),...(window.DG_TERMS||{})});
  window.WHGlossaryAutolink?.configure('space-marines');
  const popups=new window.SMPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});
  let gesture=null,suppressed=null;
  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=params.toString();if(location.hash)destination.hash=location.hash;viewSwitch.href=destination.href;}
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);
  document.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'){suppressed=null;return;}if(!event.isPrimary)return;suppressed=null;const trigger=event.target.closest('[data-term]');gesture=trigger?{trigger,id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}:null;},{capture:true,passive:true});
  document.addEventListener('pointermove',event=>{if(gesture&&gesture.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>10)gesture.moved=true;},{capture:true,passive:true});
  document.addEventListener('pointerup',event=>{if(!gesture||gesture.id!==event.pointerId)return;const completed=gesture;gesture=null;if(completed.moved)return;suppressed={trigger:completed.trigger,until:performance.now()+700};showTerm(completed.trigger);},{capture:true,passive:true});
  document.addEventListener('pointercancel',()=>{gesture=null;suppressed=null;},{capture:true,passive:true});
  document.addEventListener('click',event=>{if(!suppressed)return;const active=performance.now()<suppressed.until;suppressed=null;if(active){event.preventDefault();event.stopImmediatePropagation();}},{capture:true});
  document.addEventListener('click',event=>{const local=event.target.closest('[data-journey-target]');if(local){event.preventDefault();document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({block:'start'});return;}const trigger=event.target.closest('[data-term]');if(trigger){event.preventDefault();showTerm(trigger);}});
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();
  const documentTriggers=()=>[...document.querySelectorAll('main [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({beforeRestore(){popups.closeAll({focus:false});},snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}});
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean),trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});});
}());
