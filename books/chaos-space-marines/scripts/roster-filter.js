(function(root){
  'use strict';
  const run=()=>{
    if(!root.WHArmyRosterContext)return false;
    const provider={
      decorate(card,projection,items){root.WHBookRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw));}
    };
    root.WHArmyRosterContext.install({bookId:'chaos-space-marines',guideGlobal:'CSM_ROSTER_GUIDE',provider});
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));