(function(){
  const rosterId=new URLSearchParams(location.search).get('roster');
  if(!rosterId)return;
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const slug=value=>normalize(value).replace(/ /g,'-');
  const records=(()=>{try{const value=JSON.parse(localStorage.getItem('wh40k-rosters-v1'));return Array.isArray(value)?value:[];}catch{return[];}})();
  const record=records.find(item=>item?.id===rosterId);
  const roster=record?.sourceText&&window.WHRosterParser?window.WHRosterParser.parse(record.sourceText):record?.roster;
  const faction=normalize(roster?.faction).replace(/^imperium /,'');
  if(!roster?.units?.length||faction!=='space marines')return;
  const unitTitles=new Set(roster.units.map(unit=>normalize(unit.name)));
  const detachmentTitles=new Set((roster.detachments||[{label:roster.detachment}]).map(item=>normalize(item?.label||item?.name)).filter(Boolean));
  const detachmentSlugs=new Set([...detachmentTitles].map(slug));
  document.querySelectorAll('#mobileNav a[href]').forEach(link=>{const target=new URL(link.href,location.href),file=target.pathname.split('/').pop()?.replace(/\.html$/,''),title=normalize(link.childNodes[0]?.textContent);if(target.pathname.includes('/books/space-marines/mobile/')&&!['index','army-rules','updates'].includes(file)&&!unitTitles.has(title)&&!detachmentTitles.has(title))link.remove();});
  [...document.querySelectorAll('#mobileNav details')].reverse().forEach(group=>{if(!group.querySelector('a[href]'))group.remove();});
  document.querySelectorAll('a[href]').forEach(link=>{const target=new URL(link.href,location.href);if(target.pathname.includes('/books/space-marines/')&&target.pathname.endsWith('.html')){target.search=location.search;link.href=target.href;}});
  window.SM_ROSTER_GUIDE=window.WH_ARMY_ROSTER_GUIDE={rosterId,unitTitles,detachmentIds:[...detachmentSlugs]};
  document.documentElement.dataset.rosterGuide='space-marines';
})();
