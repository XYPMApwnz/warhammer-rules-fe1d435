(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const {createCompatibleRulesLoader}=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const source=createCompatibleRulesLoader(new URL('../generated/compatible-rules.json',scriptUrl),{schema:'space-marines-compatible-rules/v1'});
  window.WHArmyBook.install({
    bookId:'space-marines',readerPath:'./reader.html',dedicatedMobile:true,
    relatedRules:{
      source,
      rosterGuide:()=>window.SM_ROSTER_GUIDE,
      rosterEnhancements:'assigned-only',
      templateUrl:'./mobile/related-rules.inc?v=4',
      triggerLabel:'Compatible Stratagems & Enhancements',
      persistDetachment:false
    }
  });
}()).catch(error=>{document.documentElement.dataset.bookError=String(error?.stack||error);console.error(error);});
