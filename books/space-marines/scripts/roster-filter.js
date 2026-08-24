(function(root){
  'use strict';
  const run=()=>{
    if(!root.WHArmyRosterContext)return false;
    const provider={
      gameEffects(context){return root.WHBookRosterEnhancements?.gameEffects?.(context)||[];},
      decorate(card,projection,items){root.WHBookRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw),{projectedEffects:items[0]?.game?.effects||[]});}
    };
    root.WHArmyRosterContext.install({bookId:'space-marines',guideGlobal:'SM_ROSTER_GUIDE',provider});
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));
