(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const matrixRuntime=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const {createStratagemPresentation}=await import(new URL('../../shared/stratagem-presentation.mjs?v=1',scriptUrl));
  const {stratagemTypes}=await import(new URL('./stratagem-types.mjs?v=2',scriptUrl));
  const conditionLabels={
    'attachment-unknown':'Requires an Attached Unit',
    'second-unit-unknown':'Requires another eligible unit',
    'second-character-unknown':'Requires a second Character',
    'warlord-unknown':'Requires Warlord selection',
    'detachment-not-selected':'Requires Detachment selection',
    'battle-state-unknown':'Check the full card conditions'
  };
  const presentation=createStratagemPresentation({types:stratagemTypes,labelMode:'exact'});
  let source=null;
  try{source=await matrixRuntime.loadCompatibleRulesSource(new URL('../generated/compatible-rules.json',scriptUrl),{schema:'emperors-children-compatible-rules/v1',conditionLabels,resolveDetachmentSelection:true});}
  catch(error){console.warn('Compatible rules unavailable.',error);}
  window.WHArmyBook.install({
    bookId:'emperors-children',
    readerPath:'./reader.html',
    dedicatedMobile:true,
    relatedRules:source?{
      source,
      templateUrl:'./mobile/related-rules.inc?v=2',
      triggerLabel:'Compatible Stratagems',
      updateTriggerLabel:true,
      conditionLabels,
      rosterGuide:()=>window.EC_ROSTER_GUIDE,
      requireRosterGuide:true,
      restrictToRosterDetachments:true,
      rosterEnhancements:'assigned-only',
      rosterDetachment:'all',
      persistDetachment:false,
      restoreKind:false,
      closeFilterOnOpen:true,
      decorateContent:presentation.decorate,
      emptyMessage:({kind})=>`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`
    }:false,
    extensions:()=>{
      for(const button of document.querySelectorAll('button:not([type])'))button.type='button';
      presentation.decorate(document);
    }
  });
}()).catch(error=>{document.documentElement.dataset.bookError='true';console.error(error);});
