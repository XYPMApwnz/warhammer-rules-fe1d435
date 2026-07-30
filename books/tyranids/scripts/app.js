(function(){
  'use strict';
  for(const button of document.querySelectorAll('button:not([type])'))button.type='button';

  const terms=window.WH40K_GLOSSARY?.forBook('tyranids')||window.DG_TERMS;
  const documentRoot=document.querySelector('.document');
  window.WHGlossaryAutolink?.apply(documentRoot,'tyranids');
  window.WHGlossaryAutolink?.validate(documentRoot,terms);

  const navigation=new window.DGNavigation();
  const fullEntry=new window.DGFullEntry(window.WH40K_GLOSSARY);
  const popups=new window.DGPopups(terms,fullEntry);
  const relatedRules=window.WHArmyRelatedRules?.install({storageKey:'tyranids-detachment-filter'});
  const journey=new window.DGJourney(navigation,popups,null,relatedRules);
  new window.DGTableAccessibility();

  const params=new URLSearchParams(location.search);
  const rosterGuides=document.querySelector('[data-roster-guides]');
  const viewSwitch=document.querySelector('[data-view-switch]');
  if(rosterGuides)rosterGuides.hidden=!params.get('roster');

  viewSwitch?.addEventListener('click',()=>{
    const active=navigation.active;
    let route='index.html';
    let anchor='start';
    for(let node=navigation.byId.get(active)?.node;node;node=node.parentElement?.closest('[data-nav-id]')){
      const id=node.dataset.navId;
      if(id==='start'){anchor=active;break;}
      if(id==='updates'){route='updates.html';anchor=active;break;}
      if(id==='army-rules'){route='army-rules.html';anchor=active;break;}
      if(id.startsWith('detachment-')){route=id.slice(11)+'.html';anchor=active;break;}
      if(id.startsWith('unit-')){route=id.slice(5)+'.html';anchor=active;break;}
    }
    const destination=new URL('./mobile/'+route,location.href);
    destination.search=params.toString();
    destination.hash=anchor;
    viewSwitch.href=destination.href;
  });

  window.DG_APP=Object.freeze({navigation,popups,fullEntry,journey,relatedRules});
  window.WHPageState?.installArmyBook(window.DG_APP);
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord)&&returnRecord.popupIds?.length){
    const scope=document.getElementById(returnRecord.unitId)||document;
    const root=[...scope.querySelectorAll('[data-term]')].find(node=>node.dataset.term===returnRecord.rootTerm)||null;
    requestAnimationFrame(()=>{
      window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
      requestAnimationFrame(()=>{
        popups.restore(returnRecord.popupIds,{root,focus:false});
        window.WHGlossaryReturn.clear();
      });
    });
  }

  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('../../service-worker.js'));
  }
}());
