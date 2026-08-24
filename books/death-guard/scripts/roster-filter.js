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
          keywordProfile({unit},base){
            if(projection.detachmentIds.has('detachment-shamblerot-vectorium')&&unit.id==='unit-poxwalkers')return {...base,added:[...base.added,'BATTLELINE']};
            return base;
          },
          gameEffects({item,gameUnit,detachments}){return semantics.projectEffects?.(item.raw,item.catalogUnit.id,detachments.map(detachment=>detachment.id),gameUnit)||[];},
          decorate(card,current,items){semantics.decorate?.(card,items.map(item=>item.raw),[...current.detachmentIds],items[0]?.game?.effects||[],false);}
        };
      }
    });
    return true;
  };
  if(!run())root.addEventListener('wh-roster-context-ready',run,{once:true});
}(window));
