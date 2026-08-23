(function(root){
  'use strict';
  const run=()=>{
    if(!root.WHArmyRosterContext)return false;
    const provider={
      decorate(card,projection,items){
        const context={attachments:projection.record.attachments||{},unitById:new Map(projection.units.map(item=>[item.raw.id,item.raw])),detachmentIds:projection.detachmentIds};
        root.AMRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw),context);
      }
    };
    root.WHArmyRosterContext.install({bookId:'adeptus-mechanicus',guideGlobal:'AM_ROSTER_GUIDE',provider});
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));