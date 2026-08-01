export const compatibleRulesEnabled=true;

export const conditionLabels=Object.freeze({
  'attachment-unknown':'Requires an Attached Unit',
  'second-character-unknown':'Requires a second Character',
  'warlord-unknown':'Requires Warlord selection',
  'detachment-not-selected':'Requires Detachment selection',
  'second-unit-unknown':'Requires another eligible unit',
  'battle-state-unknown':'Check the full card conditions'
});

export async function loadCompatibleRules(url){
  const response=await fetch(url);
  if(!response.ok)throw new Error(`Could not load compatible rules: HTTP ${response.status}`);
  const matrix=await response.json();
  if(matrix?.schema!=='adeptus-mechanicus-compatible-rules/v1'||!matrix.units)throw new Error('Invalid Adeptus Mechanicus compatible rules matrix.');
  return matrix;
}

export function getCompatibleRules(matrix,unitId,{detachmentId}={}){
  const selected=detachmentId&&detachmentId!=='all'?(detachmentId.startsWith('detachment-')?detachmentId:`detachment-${detachmentId}`):'';
  return (matrix.units?.[unitId]||[]).filter(rule=>rule.scope==='core'||!selected||rule.detachmentId===selected).map(rule=>{
    const conditions=conditionsFor(rule).filter(condition=>condition!=='detachment-not-selected'||!selected);
    const {condition:ignored,conditions:ignoredList,...base}=rule;
    return conditions.length?{...base,state:'conditional',condition:conditions[0],conditions}:{...base,state:rule.state==='conditional'?'match':rule.state};
  });
}

export function conditionsFor(rule){
  return [...new Set(rule?.conditions?.length?rule.conditions:rule?.condition?[rule.condition]:[])];
}
