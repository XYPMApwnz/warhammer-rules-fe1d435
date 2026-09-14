(function(root){
  'use strict';
  const list=value=>Array.isArray(value)?value:[],normalize=value=>String(value||'').trim().toLowerCase();
  const catalogItems=()=>list(root.WH_BOOK_ROSTER_CATALOG?.enhancements);
  const canonicalFor=entry=>{
    const explicit=[entry?.ruleId,entry?.id,entry?.sourceId].filter(Boolean),byId=catalogItems().find(item=>explicit.some(id=>[item.id,item.ruleId,item.sourceId,item.legacyKey].includes(id)));
    if(byId)return byId;
    const title=normalize(String(entry?.name||entry?.title||'').replace(/\s+[-–—]\s+\d+\s*pts?\s*$/i,''));
    const candidates=catalogItems().filter(item=>normalize(item.title)===title);
    return candidates.length===1?candidates[0]:null;
  };
  const assignments=(roster,units)=>{
    const unitIds=new Set(list(units).map(unit=>unit.id));
    return list(roster?.enhancements).filter(entry=>entry.ownerStatus==='resolved'&&unitIds.has(entry.ownerUnitId)).map(entry=>({entry,item:canonicalFor(entry),status:canonicalFor(entry)?'resolved':'unresolved'}));
  };
  const articleFor=(entry,item)=>{
    const article=root.document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item?.title||entry.name);
    const canonicalRuleId=item?.ruleId||item?.id;if(canonicalRuleId)article.dataset.rosterEnhancementRuleId=canonicalRuleId;
    const title=root.document.createElement('h5');title.textContent=item?.title||entry.name;
    const cost=root.document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=item?.value==null;
    cost.textContent=Number(entry.exportedCost)&&Number(entry.exportedCost)!==Number(item?.value)?`${entry.exportedCost} pts in export · ${item?.value} pts current`:`${item?.value} pts included`;
    const text=root.document.createElement('p');text.textContent=item?.text||'Exact canonical Enhancement identity could not be resolved.';
    article.append(title,cost,text);return article;
  };
  function decorate(card,roster,units){
    const host=card?.querySelector('[id$="-abilities"] .ability-list');if(!host)return[];
    const rows=assignments(roster,units);for(const {entry,item} of rows){const key=normalize(item?.title||entry.name);if(host.querySelector(`[data-roster-enhancement="${CSS.escape(key)}"]`))continue;host.prepend(articleFor(entry,item));}
    return rows.map(row=>row.entry);
  }
  const gameEffects=context=>root.WHEffectContractRuntime?.project?.(context)||[];
  if(!root.WHBookRosterEnhancements?.registerProvider)throw new Error('Shared Roster Enhancement contract is unavailable');
  root.WHBookRosterEnhancements.registerProvider(Object.freeze({
    decorate,gameEffects,
    assignedRuleIds(roster,units){return [...new Set(assignments(roster,units).filter(row=>row.item).map(row=>row.item.ruleId||row.item.id))];},
    assignedRecords(roster,units){return assignments(roster,units).filter(row=>row.item).map(row=>row.item);}
  }));
}(typeof window==='undefined'?globalThis:window));
