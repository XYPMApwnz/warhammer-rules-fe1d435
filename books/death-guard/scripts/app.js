(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const {createCompatibleRulesLoader}=await import(new URL('../../shared/compatible-rules-matrix.mjs?v=2',scriptUrl));
  const {createStratagemPresentation}=await import(new URL('../../shared/stratagem-presentation.mjs?v=1',scriptUrl));
  const conditionLabels={
    'attachment-unknown':'Requires an Attached Unit',
    'second-character-unknown':'Requires a second Character',
    'warlord-unknown':'Requires Warlord selection',
    'detachment-not-selected':'Requires Detachment selection'
  };
  const presentation=createStratagemPresentation();
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
    schema:'death-guard-compatible-rules/v1',
    conditionLabels,
    resolveDetachmentSelection:true,
    fetch:loadCompatibleRulesMatrix
  });
  window.DG_TERMS=Object.freeze({...window.DG_TERMS,...window.DG_ROSTER_TERMS});
  window.WHArmyBook.install({
    bookId:'death-guard',
    readerPath:'./reader.html',
    dedicatedMobile:true,
    relatedRules:{
      source,
      templateUrl:'./mobile/related-rules.inc?v=4',
      triggerLabel:'Compatible Stratagems',
      updateTriggerLabel:true,
      conditionLabels,
      rosterGuide:()=>window.DG_ROSTER_GUIDE,
      requireRosterGuide:true,
      restrictToRosterDetachments:true,
      rosterEnhancements:'assigned-only',
      rosterDetachment:'all',
      persistDetachment:true,
      storageKey:'death-guard-detachment-filter',
      closeFilterOnOpen:true,
      decorateContent:presentation.decorate,
      emptyMessage:({kind})=>`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`
    },
    extensions:()=>presentation.decorate(document)
  });
}()).catch(error=>{document.documentElement.dataset.bookError='true';console.error(error);});
