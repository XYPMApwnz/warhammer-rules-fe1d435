(function(){
  'use strict';
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),popupLayer=document.getElementById('termPopupStack'),viewSwitch=document.querySelector('[data-view-switch]');
  const drawerMedia=matchMedia('(max-width: 800px)'),terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('chaos-space-marines')});
  window.WHGlossaryAutolink?.configure('chaos-space-marines');
  const popups=new window.CSMPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});

  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=location.search;viewSwitch.href=destination.href;}
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);

  document.addEventListener('click',event=>{
    const journey=event.target.closest('[data-journey-target]');
    if(journey&&!journey.matches('a[href]')){const target=document.getElementById(journey.dataset.journeyTarget);if(target){event.preventDefault();target.scrollIntoView({block:'start'});return;}}
    const trigger=event.target.closest('[data-term]');if(!trigger)return;event.preventDefault();showTerm(trigger);
  });
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();

  const documentTriggers=()=>[...document.querySelectorAll('main [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({beforeRestore(){popups.closeAll({focus:false});},snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}});
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean),trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});
  });
  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('../../../service-worker.js'));
}());
