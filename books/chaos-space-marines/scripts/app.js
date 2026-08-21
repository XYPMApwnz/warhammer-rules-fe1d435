(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const {createCompatibleRulesLoader}=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const {createStratagemPresentation}=await import(new URL('../../shared/stratagem-presentation.mjs?v=1',scriptUrl));
  const conditionLabels={'battle-state-unknown':'Check the full card conditions'};
  const presentation=createStratagemPresentation({labelMode:'exact'});
  const source=createCompatibleRulesLoader(new URL('../generated/compatible-rules.json',scriptUrl),{schema:'chaos-space-marines-compatible-rules/v1',conditionLabels});
  window.WHArmyBook.install({
    bookId:'chaos-space-marines',readerPath:'./reader.html',dedicatedMobile:true,
    relatedRules:{
      source,
      templateUrl:'./mobile/related-rules.inc?v=2',
      triggerLabel:'Compatible Stratagems',
      updateTriggerLabel:true,
      conditionLabels,
      rosterGuide:()=>window.CSM_ROSTER_GUIDE,
      requireRosterGuide:true,
      restrictToRosterDetachments:true,
      rosterEnhancements:'assigned-only',
      rosterDetachment:'all',
      persistDetachment:false,
      restoreKind:false,
      closeFilterOnOpen:true,
      decorateContent:presentation.decorate,
      emptyMessage:({kind})=>`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`
    },
    extensions:()=>{
      for(const button of document.querySelectorAll('button:not([type])'))button.type='button';
      presentation.decorate(document);
    }
  });
}()).catch(error=>{document.documentElement.dataset.bookError='true';console.error(error);});