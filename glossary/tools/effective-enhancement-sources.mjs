import {resolveScopedEnhancement} from '../../books/shared/tools/canonical-join-contract.mjs';

export function projectEffectiveEnhancementSources(model,{label='glossary Enhancement'}={}){
  return (model.detachments||[]).map(detachment=>({
    ...detachment,
    enhancements:(detachment.enhancements||[]).map(reference=>{
      const canonical=resolveScopedEnhancement(
        {enhancementId:reference.id,detachmentId:detachment.id},
        model.enhancements,
        {label}
      );
      return {...reference,text:canonical.text,canonicalEnhancementId:canonical.id};
    })
  }));
}
