export const compatibleStratagemsReviewEnabled=false;

export function getCompatibleStratagems(matrix,unitId,{detachmentId,warlord}={}){
  return (matrix.units?.[unitId]||[]).filter(rule=>!detachmentId||rule.detachmentId===detachmentId).map(rule=>{
    if(rule.condition==='warlord-unknown'&&warlord===true)return {...rule,state:'match',condition:undefined};
    if(rule.condition==='detachment-not-selected'&&detachmentId)return {...rule,state:'match',condition:undefined};
    return {...rule};
  });
}
