(function(root){
  'use strict';

  function install(config){
    if(!config||typeof config.bookId!=='string'||!config.bookId)throw new TypeError('WHArmyBook requires a bookId.');
    const params=new URLSearchParams(location.search);
    const phoneMode=params.get('view')==='mobile';
    if(phoneMode)document.documentElement.dataset.view='mobile';
    else document.documentElement.removeAttribute('data-view');
    const runtimeContext=Object.freeze({root,config,params,phoneMode});

    const terms={...(root.WH40K_GLOSSARY?.forBook(config.bookId)||{}),...(root.DG_TERMS||{})};
    const documentRoot=document.querySelector('.document');
    root.WHGlossaryAutolink?.apply(documentRoot,config.bookId);
    root.WHGlossaryAutolink?.validate(documentRoot,terms);

    const navigation=new root.DGNavigation({breakpoint:phoneMode?Number.MAX_SAFE_INTEGER:800});
    const fullEntry=new root.DGFullEntry(root.WH40K_GLOSSARY);
    const popups=new root.DGPopups(terms,fullEntry);
    const relatedConfig=config.relatedRules===false?null:config.relatedRules||{};
    const relatedInstaller=relatedConfig&&(relatedConfig.installer||root.WHArmyRelatedRules);
    const rosterGuide=relatedConfig&&(typeof relatedConfig.rosterGuide==='function'?relatedConfig.rosterGuide(runtimeContext):relatedConfig.rosterGuide||root.WH_ARMY_ROSTER_GUIDE);
    const rosterContextSettings=config.rosterContext===false?null:(config.rosterContext||{});
    const rosterContextAdapter=rosterContextSettings&&typeof rosterContextSettings.provider==='function'?rosterContextSettings.provider(Object.freeze({...runtimeContext,rosterGuide})):rosterGuide?.rosterContext;
    const rosterContext=rosterContextSettings&&root.WHArmyRosterContext?.fromRuntime({...runtimeContext,rosterGuide,adapter:rosterContextAdapter})||null;
    root.WH_ARMY_ROSTER_CONTEXT=rosterContext;
    const relatedRules=relatedConfig&&!(relatedConfig.requireRosterGuide&&params.has('roster')&&!rosterGuide)?relatedInstaller?.install({
      storageKey:relatedConfig.storageKey===undefined?`${config.bookId}-detachment-filter`:relatedConfig.storageKey,
      ...relatedConfig,
      rosterGuide,
      rosterRequested:params.has('roster')
    }):null;
    const journey=new root.DGJourney(navigation,popups,null,relatedRules);
    new root.DGTableAccessibility();

    const rosterGuides=document.querySelector('[data-roster-guides]');
    const viewSwitch=document.querySelector('[data-view-switch]');
    if(rosterGuides)rosterGuides.hidden=!params.get('roster');
    if(viewSwitch){
      const label=viewSwitch.querySelector('b');
      if(label)label.textContent=phoneMode?'Desktop / iPad view':'Phone view';
      viewSwitch.setAttribute('aria-label',phoneMode?'Open desktop or iPad view':'Open phone view');
      const updateViewDestination=()=>{
        const active=navigation.active||decodeURIComponent(location.hash.slice(1))||'start';
        if(config.dedicatedMobile&&!phoneMode){
          let file='index',anchor='start';
          for(let node=navigation.byId?.get(active)?.node;node;node=node.parentElement?.closest('[data-nav-id]')){
            const id=node.dataset.navId;
            if(id==='start'){anchor=active;break;}
            if(id==='updates'){file='updates';anchor=active;break;}
            if(id==='army-rules'){file='army-rules';anchor=active;break;}
            if(id.startsWith('detachment-')){file=id.slice(11);anchor=active;break;}
            if(id.startsWith('unit-')){file=id.slice(5);anchor=active;break;}
          }
          const destination=new URL(`./mobile/${file}.html`,location.href);
          destination.search=location.search;
          destination.hash=anchor;
          viewSwitch.href=destination.href;
          return;
        }
        const destination=new URL(config.readerPath||'./reader.html',location.href);
        destination.search=location.search;
        destination.searchParams.set('view',phoneMode?'full':'mobile');
        const hashId=decodeURIComponent(location.hash.slice(1));
        destination.hash=hashId&&!navigation.byId?.has(hashId)?location.hash:navigation.active||location.hash;
        viewSwitch.href=destination.href;
      };
      updateViewDestination();
      viewSwitch.addEventListener('click',updateViewDestination);
    }

    const app=Object.freeze({navigation,popups,fullEntry,journey,relatedRules,rosterContext});
    root.WH_ARMY_BOOK_APP=app;
    root.DG_APP=app;
    root.WHPageState?.installArmyBook(app);
    const record=root.WHGlossaryReturn?.read();
    if(root.WHGlossaryReturn?.shouldRestoreAutomatically(record)&&record.popupIds?.length){
      const scope=document.getElementById(record.unitId)||document;
      const trigger=[...scope.querySelectorAll('[data-term]')].find(node=>node.dataset.term===record.rootTerm)||null;
      requestAnimationFrame(()=>{
        root.scrollTo(record.scrollX||0,record.scrollY||0);
        requestAnimationFrame(()=>{
          popups.restore(record.popupIds,{root:trigger,focus:false});
          root.WHGlossaryReturn.clear();
        });
      });
    }
    if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator){
      root.addEventListener('load',()=>navigator.serviceWorker.register('../../service-worker.js'));
    }
    const extensions=config.extensions==null?[]:Array.isArray(config.extensions)?config.extensions:[config.extensions];
    extensions.forEach(extension=>{
      if(typeof extension!=='function')throw new TypeError('WHArmyBook extensions must be functions.');
      extension(Object.freeze({...runtimeContext,app}));
    });
    return app;
  }

  root.WHArmyBook=Object.freeze({install});
}(window));
