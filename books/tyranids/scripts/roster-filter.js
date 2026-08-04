(function(){
  'use strict';
  const params=new URLSearchParams(location.search),rosterMode=params.has('roster'),rosterId=params.get('roster');if(!rosterMode)return;if(!rosterId){location.replace('../../roster-guides/index.html');return;}
  let record;try{record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===rosterId);}catch{}
  if(!record){location.replace('../../roster-guides/index.html?missing='+encodeURIComponent(rosterId));return;}
  let roster=record.roster;if(record.sourceText&&window.WHRosterParser){try{const parsed=window.WHRosterParser.parse(record.sourceText);if(parsed?.units?.length)roster=parsed;}catch{}}
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/\s*\(aura\)\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim(),slug=value=>normalize(value).replace(/\s+/g,'-');
  if(normalize(roster?.faction)!=='tyranids'||!roster?.units?.length){location.replace('../../roster-guides/index.html');return;}
  const cards=new Map([...document.querySelectorAll('.unit-card[data-unit-title]')].map(card=>[normalize(card.dataset.unitTitle),card])),selected=new Map();
  for(const unit of roster.units){const card=cards.get(normalize(unit.name));if(!card)continue;const entry=selected.get(card.id)||{card,units:[],points:0};entry.units.push(unit);entry.points+=Number(unit.points)||0;selected.set(card.id,entry);}
  if(!selected.size){location.replace('../../roster-guides/index.html');return;}
  const detachments=(roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).filter(Boolean),detachmentIds=[...new Set(detachments.map(slug))],canonicalDetachmentIds=new Set([...document.querySelectorAll('.content-group.detachment')].map(section=>section.dataset.detachment||section.id.replace(/^detachment-/,'')));
  if(detachmentIds.length!==1||!canonicalDetachmentIds.has(detachmentIds[0])){location.replace('../../roster-guides/index.html');return;}
  const enhancementIds=new Map([...document.querySelectorAll('.enhancement[data-enhancement-title][data-rule-id]')].map(card=>[normalize(card.dataset.enhancementTitle),card.dataset.ruleId])),enhancementRuleIdsByUnitId={};
  for(const [cardId,entry] of selected){const owners=new Set(entry.units.map(unit=>unit.id));enhancementRuleIdsByUnitId[cardId]=[...new Set((roster.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&owners.has(item.ownerUnitId)).map(item=>enhancementIds.get(normalize(item.name))).filter(Boolean))];}
  window.TYRANIDS_ROSTER_GUIDE=Object.freeze({detachmentIds,enhancementRuleIdsByUnitId:Object.freeze(enhancementRuleIdsByUnitId)});
  document.title='Tyranids Roster Guide';document.querySelector('.app-brand strong').textContent='Tyranids Roster Guide';document.querySelector('[data-roster-guides]')?.removeAttribute('hidden');
  document.querySelectorAll('.content-group.detachment').forEach(section=>{if(!detachmentIds.includes(section.dataset.detachment))section.remove();});
  document.querySelectorAll('[data-nav-id^="detachment-"]').forEach(item=>{if(item.dataset.navDepth==='2'&&!detachmentIds.includes(item.dataset.navId.replace(/^detachment-/,'')))item.remove();});
  document.querySelectorAll('.unit-card').forEach(card=>{const entry=selected.get(card.id);if(!entry){card.remove();return;}card.dataset.rosterSelected='true';const status=card.querySelector('.unit-status');if(status)status.textContent=`${entry.units.length>1?`${entry.units.length} UNITS · `:''}${entry.points} PTS`;window.WHBookRosterEnhancements?.decorate(card,roster,entry.units);});
  document.querySelectorAll('[data-nav-id^="unit-"]').forEach(item=>{if(!selected.has(item.dataset.navId))item.remove();});
  document.querySelectorAll('#datasheets > .content-group[id^="datasheets-"]').forEach(group=>{if(!group.querySelector('.unit-card')){document.querySelector(`[data-nav-id="${CSS.escape(group.id)}"]`)?.remove();group.remove();}});
}());
