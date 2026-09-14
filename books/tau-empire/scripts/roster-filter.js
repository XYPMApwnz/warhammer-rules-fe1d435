(function(root){
  'use strict';
  const list=value=>Array.isArray(value)?value:[];
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const keywordProfile=(context,base)=>{
    const source=base||{},removed=new Set(list(source.removed).map(item=>normalize(item?.title||item)));
    return {...source,effective:[...new Set([...list(source.effective),...list(source.intrinsic),...list(source.added)].map(item=>item?.title||item).filter(item=>item&&!removed.has(normalize(item))))]};
  };
  const gameEffects=context=>root.WHEffectContractRuntime?.project?.(context)||[];
  const decorate=(card,projection,items)=>root.WHBookRosterEnhancements?.decorate?.(card,projection.roster,items.map(item=>item.raw),{projectedEffects:items[0]?.game?.effects||[]});
  const provider=Object.freeze({keywordProfile,gameEffects,decorate});
  root.TAURosterSemantics=Object.freeze({schema:'wh40k-structured-effect-provider/v1',gameEffects,projectEffects:gameEffects});
  const install=()=>{if(!root.WHArmyRosterContext||!root.WHEffectContractRuntime)return false;root.WHArmyRosterContext.install({bookId:'tau-empire',guideGlobal:'TAU_ROSTER_GUIDE',provider});return true;};
  if(!install())root.addEventListener('wh-roster-context-ready',install,{once:true});
}(window));
