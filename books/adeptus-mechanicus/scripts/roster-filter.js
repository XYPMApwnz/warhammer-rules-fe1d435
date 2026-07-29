(function(){
  'use strict';
  const rosterId=new URLSearchParams(location.search).get('roster');
  if(!rosterId)return;
  let record;
  try{record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===rosterId);}catch{}
  if(!record){location.replace('../../roster-guides/index.html?missing='+encodeURIComponent(rosterId));return;}
  let roster=record.roster;
  if(record.sourceText&&window.WHRosterParser){const parsed=window.WHRosterParser.parse(record.sourceText);if(parsed.units.length)roster=parsed;}
  const faction=String(roster?.faction||'').replace(/^(?:Chaos|Imperium)\s*[-–—]\s*/i,'').trim().toLowerCase();
  if(faction!=='adeptus mechanicus'||!roster?.units?.length){location.replace('../../roster-guides/index.html');return;}
  const pointsCheck=window.WHRosterPoints?.check(roster,'adeptus mechanicus');
  if(pointsCheck)roster.pointsCheck=pointsCheck;
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim();
  const slug=value=>normalize(value).replace(/\s+/g,'-');
  const split=value=>String(value||'').split(/\s*,\s*(?![^()]*\))/).filter(Boolean);
  const cards=new Map([...document.querySelectorAll('.unit-card[data-unit-title]')].map(card=>[normalize(card.dataset.unitTitle),card]));
  const selected=new Map(),unmatched=[];
  for(const unit of roster.units){
    const card=cards.get(normalize(unit.name));if(!card){unmatched.push(unit.name);continue;}
    const entry=selected.get(card.id)||{card,units:[],points:0,loadout:[]};entry.units.push(unit);entry.points+=Number(unit.points)||0;
    entry.loadout.push(...[unit.wargear,...(unit.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(item=>item.wargear)])].filter(Boolean));selected.set(card.id,entry);
  }
  const detachments=(roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).flatMap(split).map(label=>label.replace(/\s*\([^)]*\)\s*$/,'')).filter(Boolean);
  const detachmentIds=new Set(detachments.map(label=>slug(label)));
  window.AM_ROSTER_GUIDE=Object.freeze({detachmentIds:[...detachmentIds]});
  document.title='Adeptus Mechanicus Roster Guide';
  document.querySelector('.app-brand strong').textContent='Adeptus Mechanicus Roster Guide';
  document.querySelector('.app-brand small').textContent=`${detachments.join(' + ')} · ${roster.declared||roster.calculated||0} pts`;
  document.querySelector('[data-roster-guides]')?.removeAttribute('hidden');
  const hero=document.querySelector('#start');
  hero.querySelector('.eyebrow').textContent='Personal roster guide';hero.querySelector('h1').textContent=record.name||'Adeptus Mechanicus';hero.querySelector('h1 + p').textContent=detachments.join(' + ');
  const declared=roster.declared||roster.calculated||0,current=pointsCheck?.total;
  const pointSummary=Number.isFinite(current)&&!pointsCheck.unresolved.length?`New Recruit ${declared} pts · Official MFM v1.1 ${current} pts${pointsCheck.difference?` · ${pointsCheck.difference>0?'+':''}${pointsCheck.difference} warning`:' · match'}`:`New Recruit ${declared} pts · MFM validation incomplete`;
  hero.querySelector('.source').textContent=`${roster.units.length} units · ${pointSummary}`;
  const warnings=[...(roster.warnings||[])];
  if(!record.sourceText)warnings.push('This legacy roster has no source text, so its loadout and Enhancement owners cannot be rebuilt.');
  if(unmatched.length)warnings.push(`Unmatched roster units: ${[...new Set(unmatched)].join(', ')}.`);
  if(warnings.length){const warning=document.createElement('p');warning.className='roster-warning';warning.textContent=warnings.join(' ');hero.append(warning);}
  document.querySelectorAll('.content-group.detachment').forEach(section=>{if(!detachmentIds.has(section.dataset.detachment))section.remove();});
  document.querySelectorAll('[data-nav-id^="detachment-"]').forEach(item=>{if(item.dataset.navDepth==='2'&&!detachmentIds.has(item.dataset.navId.replace(/^detachment-/,'')))item.remove();});
  document.querySelectorAll('.unit-card').forEach(card=>{
    const entry=selected.get(card.id);if(!entry){card.remove();return;}
    card.dataset.rosterSelected='true';
    const status=card.querySelector('.unit-status');if(status)status.textContent=`${entry.units.length>1?`${entry.units.length} UNITS · `:''}${entry.points} PTS`;
    const composition=card.querySelector('[id$="-composition"]');
    if(composition){
      const rows=new Map(),add=(quantity,name,wargear)=>{const id=`${name}\0${wargear||''}`,current=rows.get(id);rows.set(id,{quantity:(current?.quantity||0)+(Number(quantity)||1),name,wargear});};
      entry.units.forEach(unit=>unit.models?.length?unit.models.forEach(model=>model.loadouts?.length?model.loadouts.forEach(loadout=>add(loadout.quantity,model.name,loadout.wargear)):add(model.quantity,model.name,model.wargear)):add(unit.quantity,unit.name,unit.wargear));
      const block=document.createElement('div');block.className='content-block roster-composition';block.innerHTML='<strong>Roster loadout</strong>';
      const list=document.createElement('ul');for(const row of rows.values()){const item=document.createElement('li');item.textContent=`${row.quantity}× ${row.name}${row.wargear?` — ${row.wargear}`:''}`;list.append(item);}block.append(list);composition.replaceChildren(composition.querySelector('h4'),block);
    }
    window.AMRosterEnhancements?.decorate(card,roster,entry.units);
    if(entry.loadout.length)card.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const label=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(label&&!window.WHRosterEntities.loadoutIncludesProfile(entry.loadout,label))row.remove();});
    card.querySelectorAll('.weapon-group').forEach(group=>{if(!group.querySelector('.weapon-row:not(.weapon-head)'))group.remove();});
  });
  document.querySelectorAll('[data-nav-id^="unit-"]').forEach(item=>{if(!selected.has(item.dataset.navId))item.remove();});
  document.querySelectorAll('#datasheets > .content-group[id^="datasheets-"]').forEach(group=>{if(!group.querySelector('.unit-card')){document.querySelector(`[data-nav-id="${CSS.escape(group.id)}"]`)?.remove();group.remove();}});
}());
