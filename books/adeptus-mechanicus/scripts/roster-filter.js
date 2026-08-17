(function(){
  'use strict';
  const params=new URLSearchParams(location.search),rosterId=params.get('roster');
  if(!rosterId)return;
  let record;
  try{record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===rosterId);}catch{}
  if(!record){location.replace('../../roster-guides/index.html?missing='+encodeURIComponent(rosterId));return;}
  let roster=record.roster;
  if(record.sourceText&&window.WHRosterParser){const parsed=window.WHRosterParser.parse(record.sourceText);if(parsed.units.length)roster=parsed;}
  const adeptusMechanicusFaction=value=>{const match=String(value||'').trim().match(/^(?:(Chaos|Imperium|Xenos)\s*[-\u2013\u2014]\s*)?(.*)$/i);return match?.[2].trim().replace(/\s+/g,' ').toLowerCase()==='adeptus mechanicus'&&(!match[1]||match[1].toLowerCase()==='imperium');};
  if(!adeptusMechanicusFaction(roster?.faction)||!roster?.units?.length){location.replace('../../roster-guides/index.html');return;}
  const pointsCheck=window.WHRosterPoints?.check(roster,'adeptus mechanicus');
  if(pointsCheck)roster.pointsCheck=pointsCheck;
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim();
  const split=value=>String(value||'').split(/\s*,\s*(?![^()]*\))/).filter(Boolean);
  const enhancementsByOwner=new Map();
  for(const item of roster.enhancements||[])if(item.ownerStatus==='resolved'&&item.ownerUnitId)(enhancementsByOwner.get(item.ownerUnitId)||enhancementsByOwner.set(item.ownerUnitId,[]).get(item.ownerUnitId)).push(item);
  const attachments=record.attachments||{},attachedTo=new Map();
  for(const [bodyguardId,characterIds] of Object.entries(attachments))for(const characterId of characterIds||[])attachedTo.set(characterId,bodyguardId);
  const unitById=new Map(roster.units.map(unit=>[unit.id,unit]));
  const unitRows=unit=>unit.models?.length?unit.models.flatMap(model=>model.loadouts?.length?model.loadouts.map(loadout=>({quantity:Number(loadout.quantity)||1,name:model.name,wargear:loadout.wargear||''})):[{quantity:Number(model.quantity)||1,name:model.name,wargear:model.wargear||''}]):[{quantity:Number(unit.quantity)||1,name:unit.name,wargear:unit.wargear||''}];
  const unitLoadout=unit=>[unit.wargear,...(unit.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(item=>item.wargear)])].filter(Boolean);
  const enhancementKey=unit=>(enhancementsByOwner.get(unit.id)||[]).map(item=>[item.ruleId||item.id||normalize(item.name),item.exportedCost??item.points??'',item.detachmentId||'']).sort().map(item=>item.join(':')).join('|');
  const baseState=unit=>JSON.stringify({points:Number(unit.points)||0,warlord:Boolean(unit.warlord),rows:unitRows(unit).map(row=>[row.quantity,normalize(row.name),normalize(row.wargear)]).sort(),loadout:unitLoadout(unit).map(normalize).sort(),enhancements:enhancementKey(unit)});
  const attachmentState=unit=>{
    const members=(attachments[unit.id]||[]).map(id=>unitById.get(id)).filter(Boolean).map(member=>[normalize(member.name),baseState(member)]).sort();
    const bodyguard=unitById.get(attachedTo.get(unit.id));
    return JSON.stringify({members,bodyguard:bodyguard?[normalize(bodyguard.name),baseState(bodyguard)]:null});
  };
  const stateKey=unit=>`${baseState(unit)}\0${attachmentState(unit)}`;
  const cards=new Map([...document.querySelectorAll('.unit-card[data-unit-title]')].map(card=>[normalize(card.dataset.unitTitle),card]));
  const selected=new Map(),unmatched=[];
  for(const unit of roster.units){
    const card=cards.get(normalize(unit.name));if(!card){unmatched.push(unit.name);continue;}
    const entry=selected.get(card.id)||{card,units:[],groups:[]};entry.units.push(unit);selected.set(card.id,entry);
  }
  for(const entry of selected.values()){
    const byState=new Map();
    for(const unit of entry.units){const key=stateKey(unit),group=byState.get(key)||{key,units:[],ordinal:entry.units.indexOf(unit)+1};group.units.push(unit);byState.set(key,group);}
    entry.groups=[...byState.values()];
  }
  const detachments=(roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).flatMap(split).map(label=>label.replace(/\s*\([^)]*\)\s*$/,'')).filter(Boolean);
  const canonicalDetachmentIds=[...document.querySelectorAll('.content-group.detachment[data-detachment]')].map(section=>section.dataset.detachment);
  const resolvedDetachmentIds=detachments.map(label=>window.AMRosterEnhancements?.resolveDetachment([label],canonicalDetachmentIds));
  if(!resolvedDetachmentIds.length||resolvedDetachmentIds.some(id=>!id)){location.replace('../../roster-guides/index.html');return;}
  const detachmentIds=new Set(resolvedDetachmentIds),detachmentLabel=detachments.join(' + ');
  document.title='Adeptus Mechanicus Roster Guide';
  document.querySelector('.app-brand strong').textContent='Adeptus Mechanicus Roster Guide';
  document.querySelector('.app-brand small').textContent=`${detachmentLabel} · ${roster.declared||roster.calculated||0} pts`;
  document.querySelector('[data-roster-guides]')?.removeAttribute('hidden');
  const hero=document.querySelector('#start');
  hero.querySelector('.eyebrow').textContent='Personal roster guide';hero.querySelector('h1').textContent=record.name||'Adeptus Mechanicus';hero.querySelector('h1 + p').textContent=detachmentLabel;
  const declared=roster.declared||roster.calculated||0,current=pointsCheck?.total;
  const pointSummary=Number.isFinite(current)&&!pointsCheck.unresolved.length?`New Recruit ${declared} pts · Official MFM v1.1 ${current} pts${pointsCheck.difference?` · ${pointsCheck.difference>0?'+':''}${pointsCheck.difference} warning`:' · match'}`:`New Recruit ${declared} pts · MFM validation incomplete`;
  hero.querySelector('.source').textContent=`${roster.units.length} units · ${pointSummary}`;
  const warnings=[...(roster.warnings||[])];
  if(!record.sourceText)warnings.push('This legacy roster has no source text, so its loadout and Enhancement owners cannot be rebuilt.');
  if(unmatched.length)warnings.push(`Unmatched roster units: ${[...new Set(unmatched)].join(', ')}.`);
  if(warnings.length){const warning=document.createElement('p');warning.className='roster-warning';warning.textContent=warnings.join(' ');hero.append(warning);}
  document.querySelectorAll('.content-group.detachment').forEach(section=>{if(!detachmentIds.has(section.dataset.detachment))section.remove();});
  document.querySelectorAll('[data-nav-id^="detachment-"]').forEach(item=>{if(item.dataset.navDepth==='2'&&!detachmentIds.has(item.dataset.navId.replace(/^detachment-/,'')))item.remove();});
  const uniqueCard=(card,canonicalId,physicalId)=>{
    const ids=new Map(),prefix=`roster-${physicalId.split('--roster-')[1]}-`;
    for(const node of [card,...card.querySelectorAll('[id]')]){const old=node.id,next=node===card?physicalId:`${prefix}${old}`;ids.set(old,next);node.id=next;}
    for(const node of card.querySelectorAll('*'))for(const name of ['for','aria-controls','aria-labelledby','aria-describedby','href','data-journey-target']){const value=node.getAttribute(name);if(!value)continue;const hash=value.startsWith('#'),tokens=(hash?value.slice(1):value).split(/\s+/),next=tokens.map(token=>ids.get(token)||token).join(' ');if(next!==(hash?value.slice(1):value))node.setAttribute(name,(hash?'#':'')+next);}
  };
  const renderGroup=(card,canonicalId,group,index)=>{
    const physicalId=index?`${canonicalId}--roster-${group.units[0].id}`:canonicalId;
    if(index)uniqueCard(card,canonicalId,physicalId);
    card.dataset.rosterCanonicalId=canonicalId;card.dataset.rosterStateGroup=group.units[0].id;card.dataset.rosterSelected='true';card.dataset.track=card.id;
    const representative=group.units[0],status=card.querySelector('.unit-status');
    if(status)status.textContent=group.units.length>1?`${group.units.length} UNITS · ${Number(representative.points)||0} PTS EACH`:`${Number(representative.points)||0} PTS`;
    const composition=card.querySelector('[id$="-composition"]');
    if(composition){const block=document.createElement('div');block.className='content-block roster-composition';block.innerHTML='<strong>Roster loadout</strong>';const list=document.createElement('ul');for(const row of unitRows(representative)){const item=document.createElement('li');item.textContent=`${row.quantity}× ${row.name}${row.wargear?` — ${row.wargear}`:''}`;list.append(item);}block.append(list);composition.replaceChildren(composition.querySelector('h4'),block);}
    window.AMRosterEnhancements?.decorate(card,roster,group.units,{attachments,unitById,detachmentIds});
    const loadout=unitLoadout(representative);
    if(loadout.length)card.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const label=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(label&&!window.WHRosterEntities.loadoutIncludesProfile(loadout,label))row.remove();});
    card.querySelectorAll('.weapon-group').forEach(section=>{if(!section.querySelector('.weapon-row:not(.weapon-head)'))section.remove();});
    return card;
  };
  const renderedGroups=new Map();
  document.querySelectorAll('.unit-card').forEach(card=>{
    const entry=selected.get(card.id);if(!entry){card.remove();return;}
    const physicalCards=entry.groups.map((group,index)=>index?card.cloneNode(true):card);let previous=card;
    physicalCards.slice(1).forEach(current=>{previous.after(current);previous=current;});
    const cardsForEntry=entry.groups.map((group,index)=>({card:renderGroup(physicalCards[index],card.id,group,index),group}));
    renderedGroups.set(card.id,cardsForEntry);
  });
  const enhancementIds=new Map([...document.querySelectorAll('.enhancement[data-enhancement-title][data-rule-id]')].map(card=>[normalize(card.dataset.enhancementTitle),card.dataset.ruleId]));
  const enhancementRuleIdsByUnitId={};
  for(const groups of renderedGroups.values())for(const {card,group} of groups){const ownership=window.AMRosterEnhancements.resolveOwnership(roster,group.units);enhancementRuleIdsByUnitId[card.id]=[...new Set(ownership.cardEnhancements.map(item=>enhancementIds.get(normalize(item.name))).filter(Boolean))];}
  window.AM_ROSTER_GUIDE=Object.freeze({detachmentIds:[...detachmentIds],enhancementRuleIdsByUnitId});
  const requested=params.get('instance');
  for(const [canonicalId,groups] of renderedGroups){
    const item=document.querySelector(`[data-nav-id="${CSS.escape(canonicalId)}"]`);if(!item)continue;
    let previous=item;
    groups.forEach(({card,group},index)=>{
      const current=index?item.cloneNode(true):item;if(index)previous.after(current);previous=current;current.dataset.navId=card.id;
      const button=current.querySelector('[data-nav-target]');button.dataset.navTarget=card.id;
      const title=selected.get(canonicalId).card.dataset.unitTitle,label=groups.length>1&&group.units.length===1?`${title} #${group.ordinal}`:group.units.length>1?`${title} ×${group.units.length}`:title;button.textContent=label;
      button.addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('instance',group.units[0].id);url.hash=card.id;history.replaceState(history.state,'',url);});
    });
  }
  document.querySelectorAll('[data-nav-id^="unit-"]').forEach(item=>{const canonical=item.dataset.navId.split('--roster-')[0];if(!renderedGroups.has(canonical))item.remove();});
  document.querySelectorAll('#datasheets > .content-group[id^="datasheets-"]').forEach(group=>{if(!group.querySelector('.unit-card')){document.querySelector(`[data-nav-id="${CSS.escape(group.id)}"]`)?.remove();group.remove();}});
  const requestedGroup=[...renderedGroups.values()].flat().find(({group})=>group.units.some(unit=>unit.id===requested));
  if(requestedGroup){const url=new URL(location.href);url.hash=requestedGroup.card.id;history.replaceState(history.state,'',url);window.addEventListener('load',()=>{let frames=0;const restore=()=>{if(window.DG_APP?.navigation){document.querySelector(`[data-nav-target="${CSS.escape(requestedGroup.card.id)}"]`)?.click();return;}if(frames++<300)requestAnimationFrame(restore);};requestAnimationFrame(restore);},{once:true});}
}());
