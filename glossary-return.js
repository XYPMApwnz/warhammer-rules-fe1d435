(function () {
  'use strict';
  const key = 'wh40k-mega-glossary-return';
  const lifetime = 30 * 60 * 1000;
  const root = new URL('.', document.currentScript.src);
  const targetFor = record => record?.path ? new URL(record.path, location.origin) : null;
  function clear() { try { sessionStorage.removeItem(key); } catch {} }
  function read() {
    try {
      const record = JSON.parse(sessionStorage.getItem(key) || 'null');
      const target = targetFor(record);
      if (record?.v !== 1 || !Number.isFinite(record.createdAt) || Date.now() - record.createdAt > lifetime || target?.origin !== location.origin || !target.pathname.startsWith(root.pathname)) {
        clear();
        return null;
      }
      return record;
    } catch { clear(); return null; }
  }
  function save(extra = {}) {
    if (!location.pathname.startsWith(root.pathname)) return;
    try { sessionStorage.setItem(key, JSON.stringify({v:1,createdAt:Date.now(),path:location.pathname+location.search+location.hash,scrollX:window.scrollX||0,scrollY:window.scrollY||0,restoreMode:'automatic',...extra})); } catch {}
  }
  function setRestoreMode(mode) {
    if (mode !== 'automatic' && mode !== 'manual') return;
    const record = read();
    if (!record) return;
    try { sessionStorage.setItem(key, JSON.stringify({...record,restoreMode:mode})); } catch {}
  }
  function isSameDocument(record = read()) {
    const target = targetFor(record);
    if (!target) return false;
    return target.pathname === location.pathname && target.search === location.search;
  }
  function isExactReturnTarget(record = read()) {
    const target = targetFor(record);
    return isSameDocument(record) && target.hash === location.hash;
  }
  function shouldRestoreAutomatically(record = read()) {
    return !window.WHPageState?.hasCurrent?.() && (record?.restoreMode || 'automatic') === 'automatic' && isExactReturnTarget(record);
  }
  window.WHGlossaryReturn = Object.freeze({href:path=>new URL(path,root).href,save,read,clear,setRestoreMode,isSameDocument,isExactReturnTarget,shouldRestoreAutomatically});

  const pageStateKey = 'wh40kPageState';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  let pageAdapter = null;
  let pageDepartureCaptured = false;
  let restoreRun=null,restoredRecordKey='';
  let viewportWidth=innerWidth,liveAnchor=null,resizeToken=0,anchorFrame=0;
  const pagePath = () => location.pathname + location.search + location.hash;
  function readingAnchor() {
    const main=document.querySelector('main,.main,.viewer'),header=document.querySelector('.app-header,header');if(!main)return null;
    const rect=main.getBoundingClientRect(),headerBottom=header?.getBoundingClientRect().bottom||0,x=Math.max(1,Math.min(innerWidth-2,rect.left+rect.width/2)),y=Math.max(1,Math.min(innerHeight-2,headerBottom+(innerHeight-headerBottom)/2));
    const focused=main.contains(document.activeElement)?document.activeElement.closest('[id],[data-track]'):null,hit=document.elementsFromPoint(x,y).find(node=>main.contains(node)),anchor=focused||hit?.closest('[id],[data-track]');
    if(!anchor||!main.contains(anchor))return null;
    return{id:anchor.id||'',track:anchor.dataset.track||'',top:anchor.getBoundingClientRect().top};
  }
  const findAnchor=record=>record?.anchor&&(record.anchor.id?document.getElementById(record.anchor.id):document.querySelector(`[data-track="${CSS.escape(record.anchor.track||'')}"]`));
  const alignAnchor=anchor=>{const target=findAnchor({anchor});if(!target)return false;target.scrollIntoView({block:'start',behavior:'instant'});scrollBy({top:target.getBoundingClientRect().top-anchor.top,behavior:'instant'});return Math.abs(target.getBoundingClientRect().top-anchor.top)<=2;};
  function pageRecord() {
    const record = history.state?.[pageStateKey];
    return record?.v === 1 && record.path === pagePath() ? record : null;
  }
  function capturePage() {
    try {
      const anchor=readingAnchor();liveAnchor=anchor||liveAnchor;
      history.replaceState({...history.state,[pageStateKey]:{v:1,path:pagePath(),scrollX:scrollX||0,scrollY:scrollY||0,anchor,ui:pageAdapter?.snapshot?.()||null}},'',location.href);
    } catch {}
  }
  async function restorePage() {
    const record = pageRecord();if(!record||!pageAdapter)return false;
    const recordKey=JSON.stringify(record);
    if(recordKey===restoredRecordKey)return true;
    if(restoreRun?.key===recordKey)return restoreRun.promise;
    const adapter=pageAdapter;
    const promise=(async()=>{
      await document.fonts?.ready;
      await adapter.beforeRestore?.();
      if(adapter.restoreScroll)await adapter.restoreScroll(record);
      else{
        const settle=()=>{const target=findAnchor(record);if(target){target.scrollIntoView({block:'start',behavior:'instant'});scrollBy({top:target.getBoundingClientRect().top-record.anchor.top,behavior:'instant'});}else scrollTo({left:record.scrollX||0,top:record.scrollY||0,behavior:'instant'});};
        let stable=0,lastHeight=-1;
        for(let attempt=0;attempt<12&&stable<2;attempt++){
          settle();
          await new Promise(resolve=>setTimeout(resolve,100));
          const target=findAnchor(record),height=document.documentElement.scrollHeight,aligned=!target||Math.abs(target.getBoundingClientRect().top-record.anchor.top)<=2;
          stable=aligned&&Math.abs(height-lastHeight)<=1?stable+1:0;lastHeight=height;
        }
        settle();
      }
      await adapter.restore?.(record.ui);
      restoredRecordKey=recordKey;
      return true;
    })();
    restoreRun={key:recordKey,promise};
    try{return await promise;}finally{if(restoreRun?.promise===promise)restoreRun=null;}
  }
  function install(adapter) { pageAdapter=adapter||null;requestAnimationFrame(restorePage); }
  function installArmyBook(app) {
    install({
      async beforeRestore() {app.fullEntry?.close?.();app.relatedRules?.close?.();app.popups?.restore?.([],{focus:false});await window.WHArmyDatasheetLayout?.ready?.();app.navigation.refreshGeometry();},
      restoreScroll(record) {
        const target=findAnchor(record),destination=target&&record.anchor?scrollY+target.getBoundingClientRect().top-record.anchor.top:record.scrollY||0;
        return new Promise(resolve=>app.navigation.restoreInitial(destination,resolve));
      },
      snapshot() {
        const popupIds=app.popups?.snapshot?.()||[],popupRoot=app.popups?.rootElement?.()||null,relatedLayer=app.relatedRules?.layer;
        const overlay=relatedLayer&&!relatedLayer.hidden?app.relatedRules.snapshot(popupRoot||relatedLayer.querySelector('[data-term]')):null;
        const unitId=popupRoot?.closest?.('.unit-card')?.id||relatedLayer?.dataset.unitId||'';
        const scope=document.getElementById(unitId)||document,rootTerm=popupRoot?.dataset?.term||'';
        const occurrence=rootTerm?Math.max(0,[...scope.querySelectorAll(`[data-term="${CSS.escape(rootTerm)}"]`)].indexOf(popupRoot)):0;
        return{popupIds,rootTerm,unitId,occurrence,overlay,fullEntry:app.fullEntry?.snapshot?.()||null};
      },
      async restore(state) {
        if(!state)return;
        let popupRoot=null;
        if(state.overlay)popupRoot=await app.relatedRules?.restore?.(state.overlay);
        if(!popupRoot&&state.rootTerm){const scope=document.getElementById(state.unitId)||document,found=[...scope.querySelectorAll(`[data-term="${CSS.escape(state.rootTerm)}"]`)];popupRoot=found[state.occurrence]||found[0]||null;}
        if(state.popupIds?.length)app.popups?.restore?.(state.popupIds,{root:popupRoot,focus:true});
        if(state.fullEntry)app.fullEntry?.restore?.(state.fullEntry);
      }
    });
  }
  function installTermDialog({dialog,triggers,opener,open}) {
    install({
      beforeRestore() {if(dialog.open)dialog.close();},
      snapshot() {const trigger=opener?.();return dialog.open&&trigger?{termId:trigger.dataset.term,index:triggers().indexOf(trigger)}:null;},
      restore(state) {if(!state)return;const all=triggers(),trigger=all[state.index]?.dataset.term===state.termId?all[state.index]:all.find(node=>node.dataset.term===state.termId);if(trigger)open(trigger);}
    });
  }
  document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]');if(!link||link.target==='_blank')return;const destination=new URL(link.href,location.href);if(destination.origin===location.origin&&(destination.pathname!==location.pathname||destination.search!==location.search)){capturePage();pageDepartureCaptured=true;}},true);
  const rememberAnchor=()=>{anchorFrame=0;liveAnchor=readingAnchor()||liveAnchor;};
  window.addEventListener('scroll',()=>{if(!anchorFrame)anchorFrame=requestAnimationFrame(rememberAnchor);},{passive:true});
  window.addEventListener('resize',async()=>{
    if(Math.abs(innerWidth-viewportWidth)<=1)return;viewportWidth=innerWidth;
    const anchor=liveAnchor||readingAnchor();if(!anchor)return;
    const token=++resizeToken;let stable=0;
    for(let attempt=0;attempt<10&&token===resizeToken&&stable<2;attempt++){
      stable=alignAnchor(anchor)?stable+1:0;
      await new Promise(resolve=>setTimeout(resolve,80));
    }
    if(token===resizeToken){alignAnchor(anchor);rememberAnchor();}
  },{passive:true});
  window.addEventListener('beforeunload',()=>{if(!pageDepartureCaptured)capturePage();});
  window.addEventListener('pagehide',()=>{if(!pageDepartureCaptured)capturePage();});
  window.addEventListener('pageshow',()=>{pageDepartureCaptured=false;restorePage();});
  requestAnimationFrame(rememberAnchor);
  window.WHPageState=Object.freeze({install,installArmyBook,installTermDialog,capture:capturePage,restore:restorePage,hasCurrent:()=>Boolean(pageRecord())});
}());
