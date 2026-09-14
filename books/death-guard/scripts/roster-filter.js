(function(root){
  'use strict';
  const run=()=>{
    if(!root.WHArmyRosterContext)return false;
    root.WHArmyRosterContext.install({
      bookId:'death-guard',
      guideGlobal:'DG_ROSTER_GUIDE',
      providerFactory(projection){
        const byTitle=new Map(projection.units.map(item=>[item.raw,item.catalogUnit]));
        const semantics=root.DGRosterSemantics?.createContext?.({
          roster:projection.roster,
          attachments:projection.record.attachments||{},
          terms:root.DG_TERMS||{},
          profileFor:raw=>byTitle.get(raw)?.ruleFacts||null
        })||{};
        return {
          stateKey(raw){return semantics.stateKey?.(raw)||JSON.stringify(raw);},
          gameEffects(context){return root.WHEffectContractRuntime?.project?.(context)||[];},
          decorate(card,current,items){semantics.decorate?.(card,items.map(item=>item.raw),[...current.detachmentIds],items[0]?.game?.effects||[],false);}
        };
      }
    });
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));
