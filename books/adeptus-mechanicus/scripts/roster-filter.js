(function(root){
  'use strict';
  const run=()=>{
    if(!root.WHArmyRosterContext)return false;
    const provider={
      gameEffects({item,record,roster,units,detachments}){
        const context={attachments:record.attachments||{},unitById:new Map(units.map(entry=>[entry.raw.id,entry.raw])),detachmentIds:new Set(detachments.map(detachment=>detachment.id))};
        return root.AMRosterEnhancements?.projectGameEffects?.(roster,item.raw,context)||[];
      },
      decorate(card,projection,items){
        const context={attachments:projection.record.attachments||{},unitById:new Map(projection.units.map(item=>[item.raw.id,item.raw])),detachmentIds:projection.detachmentIds,projectedEffects:items[0]?.game?.effects||[]};
        root.AMRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw),{...context,applyEffects:false});
      }
    };
    root.WHArmyRosterContext.install({bookId:'adeptus-mechanicus',guideGlobal:'AM_ROSTER_GUIDE',provider});
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));
