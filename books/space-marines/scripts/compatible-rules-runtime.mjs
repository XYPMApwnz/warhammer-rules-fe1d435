export const compatibleRulesEnabled=true;
export const conditionLabels=Object.freeze({});
export async function loadCompatibleRules(url){const response=await fetch(url);if(!response.ok)throw new Error(`Could not load compatible rules: HTTP ${response.status}`);const matrix=await response.json();if(matrix?.schema!=='space-marines-compatible-rules/v1'||!matrix.units)throw new Error('Invalid Space Marines Compatible Rules matrix.');return matrix;}
export function conditionsFor(rule){return [...new Set(rule?.conditions?.length?rule.conditions:rule?.condition?[rule.condition]:[])];}
export function getCompatibleRules(matrix,unitId,{detachmentId}={}){const selected=detachmentId&&detachmentId!=='all'?detachmentId.replace(/^detachment-/,''):'';return(matrix.units?.[unitId]||[]).filter(rule=>rule.scope==='core'||!selected||rule.detachmentId===selected);}
