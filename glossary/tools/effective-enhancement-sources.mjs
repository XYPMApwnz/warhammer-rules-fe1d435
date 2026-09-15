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
      return {
        id:canonical.id,
        canonicalEnhancementId:canonical.id,
        detachmentId:canonical.detachmentId,
        sourceBookId:canonical.sourceBookId,
        title:canonical.runtimeTitle||canonical.title,
        text:canonical.text||'',
        tags:[...(canonical.tags||[])],
        eligibility:canonical.eligibility?structuredClone(canonical.eligibility):null,
        owner:canonical.owner?structuredClone(canonical.owner):null,
        assignment:canonical.assignment?structuredClone(canonical.assignment):null,
        value:canonical.value
      };
    })
  }));
}
