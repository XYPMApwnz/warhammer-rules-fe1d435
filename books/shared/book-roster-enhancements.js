(function(root){
  'use strict';
  let provider=null;
  const normalize=value=>String(value||'').trim().toLowerCase();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  function decorateGeneric(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const unitIds=new Set((units||[]).map(unit=>unit.id));
    const owned=(roster?.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&unitIds.has(item.ownerUnitId));
    for(const entry of owned){
      const item=catalog()[normalize(entry.name)];
      if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item.title);
      const title=document.createElement('h5');title.textContent=item.title;
      const cost=document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=item.value==null;
      cost.textContent=Number(entry.exportedCost)&&Number(entry.exportedCost)!==Number(item.value)?`${entry.exportedCost} pts in export · ${item.value} pts current`:`${item.value} pts included`;
      const text=document.createElement('p');text.textContent=item.text;
      article.append(title,cost,text);list.prepend(article);
    }
    return owned;
  }
  const api={
    registerProvider(next){if(!next||typeof next.decorate!=='function')throw new TypeError('Roster Enhancement provider must expose decorate()');provider=next;return api;},
    decorate(...args){return (provider?.decorate||decorateGeneric)(...args);},
    gameEffects(...args){return provider?.gameEffects?.(...args)||[];},
    assignedRuleIds(...args){return provider?.assignedRuleIds?.(...args)||[];},
    assignedRecords(...args){return provider?.assignedRecords?.(...args)||[];}
  };
  root.WHBookRosterEnhancements=Object.freeze(api);
}(typeof window==='undefined'?globalThis:window));
