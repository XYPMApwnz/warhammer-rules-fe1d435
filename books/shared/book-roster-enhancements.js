(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  function decorate(card,roster,units){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');
    if(!list)return[];
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
  root.WHBookRosterEnhancements=Object.freeze({decorate});
}(typeof window==='undefined'?globalThis:window));
