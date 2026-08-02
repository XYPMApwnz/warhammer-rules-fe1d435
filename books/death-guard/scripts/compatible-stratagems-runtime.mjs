export const compatibleStratagemsReviewEnabled=true;

export const conditionLabels=Object.freeze({
  'attachment-unknown':'Requires an Attached Unit',
  'second-character-unknown':'Requires a second Character',
  'warlord-unknown':'Requires Warlord selection',
  'detachment-not-selected':'Requires Detachment selection'
});

export async function loadCompatibleStratagems(url){
  const response=await fetch(url);
  if(!response.ok)throw new Error(`Could not load compatible Stratagems: HTTP ${response.status}`);
  const matrix=await response.json();
  if(matrix?.schema!=='death-guard-compatible-rules/v1'||!matrix.units)throw new Error('Invalid Death Guard compatible Stratagem matrix.');
  return matrix;
}

export function getCompatibleStratagems(matrix,unitId,{detachmentId,warlord}={}){
  const selected=detachmentId&&detachmentId!=='all'?(detachmentId.startsWith('detachment-')?detachmentId:`detachment-${detachmentId}`):'';
  return (matrix.units?.[unitId]||[]).filter(rule=>rule.scope==='core'||!selected||rule.detachmentId===selected).map(rule=>{
    if(rule.condition==='warlord-unknown'&&warlord===true)return {...rule,state:'match',condition:undefined};
    if(rule.condition==='detachment-not-selected'&&selected)return {...rule,state:'match',condition:undefined};
    return {...rule};
  });
}
