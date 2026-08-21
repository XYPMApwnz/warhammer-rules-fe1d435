(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const matrixRuntime=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const {createStratagemPresentation}=await import(new URL('../../shared/stratagem-presentation.mjs?v=1',scriptUrl));
  const {stratagemTypes}=await import(new URL('./stratagem-types.mjs?v=1',scriptUrl));
  const conditionLabels={
    'attachment-unknown':'Requires an Attached Unit',
    'detachment-not-selected':'Requires Detachment selection'
  };
  const presentation=createStratagemPresentation({types:stratagemTypes});
  const source=matrixRuntime.createCompatibleRulesLoader(new URL('../generated/compatible-rules.json',scriptUrl),{schema:'tyranids-compatible-rules/v1',conditionLabels,resolveDetachmentSelection:true});
  window.WHArmyBook.install({
    bookId:'tyranids',
    readerPath:'./reader.html',
    dedicatedMobile:true,
    relatedRules:{
      source,
      templateUrl:'./mobile/related-rules.inc?v=4',
      triggerLabel:'Compatible Stratagems',
      updateTriggerLabel:true,
      conditionLabels,
      rosterGuide:()=>window.TYRANIDS_ROSTER_GUIDE,
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
