(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const {createCompatibleRulesLoader}=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const {createStratagemPresentation}=await import(new URL('../../shared/stratagem-presentation.mjs?v=1',scriptUrl));
  const conditionLabels={
    'attachment-unknown':'Requires an Attached Unit',
    'second-character-unknown':'Requires a second Character',
    'warlord-unknown':'Requires Warlord selection',
    'detachment-not-selected':'Requires Detachment selection',
    'second-unit-unknown':'Requires another eligible unit',
    'battle-state-unknown':'Check the full card conditions'
  };
  const presentation=createStratagemPresentation({labelMode:'exact'});
  const loadCompatibleRulesMatrix=async url=>{
    const response=await fetch(url);
    if(!response.ok)return response;
    const matrix=await response.json(),units=Object.fromEntries(Object.entries(matrix.units||{}).map(([unitId,rows])=>[
      unitId,
      rows.map(row=>row.detachmentId?.startsWith('detachment-')?{...row,detachmentId:row.detachmentId.replace(/^detachment-/,'')}:row)
    ]));
    return{ok:true,status:response.status,json:async()=>({...matrix,units})};
  };
  const source=createCompatibleRulesLoader(new URL('../generated/compatible-rules.json',scriptUrl),{
    schema:'adeptus-mechanicus-compatible-rules/v1',
    conditionLabels,
    fetch:loadCompatibleRulesMatrix
  });
  window.WHArmyBook.install({
    bookId:'adeptus-mechanicus',
    readerPath:'./reader.html',
    dedicatedMobile:true,
    relatedRules:{
      source,
      templateUrl:'./mobile/related-rules.inc?v=4',
      triggerLabel:'Compatible Stratagems',
      updateTriggerLabel:true,
      conditionLabels,
      rosterGuide:()=>window.AM_ROSTER_GUIDE,
      requireRosterGuide:true,
      restrictToRosterDetachments:true,
      rosterEnhancements:'assigned-only',
      rosterDetachment:'all',
      persistDetachment:true,
      storageKey:'adeptus-mechanicus-detachment-filter',
      closeFilterOnOpen:true,
      decorateContent:presentation.decorate,
      emptyMessage:({kind})=>`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`
    },
    extensions:()=>{
      for(const button of document.querySelectorAll('button:not([type])'))button.type='button';
      presentation.decorate(document);
      new window.AMDoctrina();
    }
  });
}()).catch(error=>{document.documentElement.dataset.bookError='true';console.error(error);});
