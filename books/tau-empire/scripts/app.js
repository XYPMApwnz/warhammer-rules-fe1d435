(function(){
  'use strict';
  for(const button of document.querySelectorAll('button:not([type])'))button.type='button';
  const normalize=value=>String(value||'').toLowerCase().replace(/\[legends\]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const params=new URLSearchParams(location.search),rosterId=params.get('roster');
  let roster=null,record=null,rosterGuide=null;
  if(rosterId)try{
    const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[];record=records.find(item=>item?.id===rosterId);
    roster=record?.sourceText&&window.WHRosterParser?window.WHRosterParser.parse(record.sourceText):record?.roster;
    const labels=(roster?.detachments?.length?roster.detachments.map(item=>item.label):[roster?.detachment]).flatMap(value=>String(value||'').split(/\s*,\s*(?![^()]*\))/)).map(value=>normalize(value.replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean);
    const ids=[...document.querySelectorAll('.content-group.detachment')].filter(section=>labels.includes(normalize(section.id.replace(/^detachment-/,'')))).map(section=>section.id.replace(/^detachment-/,''));
    rosterGuide=ids.length?{detachmentIds:ids}:null;
  }catch(error){console.warn('T’au roster unavailable',error);}

  const terms=window.WH40K_GLOSSARY?.forBook('tau-empire')||window.DG_TERMS,documentRoot=document.querySelector('.document');
  window.WHGlossaryAutolink?.apply(documentRoot,'tau-empire');window.WHGlossaryAutolink?.validate(documentRoot,terms);
  const navigation=new window.DGNavigation(),fullEntry=new window.DGFullEntry(window.WH40K_GLOSSARY),popups=new window.DGPopups(terms,fullEntry);
  const relatedRules=window.WHArmyRelatedRules?.install({storageKey:'tau-empire-detachment-filter',rosterGuide});
  const journey=new window.DGJourney(navigation,popups,null,relatedRules);new window.DGTableAccessibility();
  const rosterGuides=document.querySelector('[data-roster-guides]'),viewSwitch=document.querySelector('[data-view-switch]');if(rosterGuides)rosterGuides.hidden=!rosterId;

  if(rosterId&&roster?.units?.length){
    const selected=new Map();
    for(const unit of roster.units){const key=normalize(unit.name),entry=selected.get(key)||{units:[],points:0,loadout:[]};entry.units.push(unit);entry.points+=Number(unit.points)||0;entry.loadout.push(...[unit.wargear,...(unit.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(item=>item.wargear)])].filter(Boolean));selected.set(key,entry);}
    document.title="T'au Empire Roster Guide";document.querySelector('.app-brand strong').textContent="T'au Empire Roster Guide";
    const detachmentNames=(roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).filter(Boolean);document.querySelector('.app-brand small').textContent=`${detachmentNames.join(' + ')} · ${roster.declared||roster.calculated||0} pts`;
    const hero=document.querySelector('#start');hero.querySelector('.eyebrow').textContent='Personal roster guide';hero.querySelector('h1').textContent=record?.name||"T'au Empire";hero.querySelector('h1 + p').textContent=`${roster.units.length} units · ${detachmentNames.join(' + ')}`;
    if(rosterGuide){const allowed=new Set(rosterGuide.detachmentIds.map(id=>`detachment-${id}`));document.querySelectorAll('.content-group.detachment').forEach(section=>{if(!allowed.has(section.id))section.remove();});document.querySelectorAll('[data-nav-depth="2"][data-nav-id^="detachment-"]').forEach(item=>{if(!allowed.has(item.dataset.navId))item.remove();});}
    for(const card of document.querySelectorAll('.unit-card')){
      const entry=selected.get(normalize(card.dataset.unitTitle));if(!entry){card.remove();continue;}
      card.dataset.rosterSelected='true';const status=card.querySelector('.unit-status');if(status)status.textContent=`${entry.units.length>1?`${entry.units.length} units · `:''}${entry.points} pts`;
      const composition=card.querySelector('[id$="-composition"]');if(composition){const rows=new Map(),add=(quantity,name,wargear)=>{const key=`${name}\0${wargear||''}`,current=rows.get(key);rows.set(key,{quantity:(current?.quantity||0)+(Number(quantity)||1),name,wargear});};entry.units.forEach(unit=>unit.models?.length?unit.models.forEach(model=>model.loadouts?.length?model.loadouts.forEach(loadout=>add(loadout.quantity,model.name,loadout.wargear)):add(model.quantity,model.name,model.wargear)):add(unit.quantity,unit.name,unit.wargear));const block=document.createElement('div');block.className='content-block roster-composition';const heading=document.createElement('strong');heading.textContent='Roster loadout';const list=document.createElement('ul');for(const row of rows.values()){const item=document.createElement('li');item.textContent=`${row.quantity}× ${row.name}${row.wargear?` — ${row.wargear}`:''}`;list.append(item);}block.append(heading,list);composition.replaceChildren(composition.querySelector('h4'),block);}
      window.WHBookRosterEnhancements?.decorate(card,roster,entry.units);
      if(entry.loadout.length&&window.WHRosterEntities)card.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const label=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(label&&!window.WHRosterEntities.loadoutIncludesProfile(entry.loadout,label))row.remove();});
      card.querySelectorAll('.weapon-group').forEach(group=>{if(!group.querySelector('.weapon-row:not(.weapon-head)'))group.remove();});
    }
    document.querySelectorAll('[data-nav-id^="unit-"]').forEach(item=>{if(!document.getElementById(item.dataset.navId))item.remove();});document.querySelectorAll('#datasheets > .content-group').forEach(group=>{if(!group.querySelector('.unit-card')){document.querySelector(`[data-nav-id="${CSS.escape(group.id)}"]`)?.remove();group.remove();}});document.documentElement.dataset.rosterActive='true';
  }

  viewSwitch?.addEventListener('click',()=>{const active=navigation.active;let route='index.html',anchor='start';for(let node=navigation.byId.get(active)?.node;node;node=node.parentElement?.closest('[data-nav-id]')){const id=node.dataset.navId;if(id==='start'){anchor=active;break;}if(id==='updates'){route='updates.html';anchor=active;break;}if(id==='army-rules'){route='army-rules.html';anchor=active;break;}if(id.startsWith('detachment-')){route=id.slice(11)+'.html';anchor=active;break;}if(id.startsWith('unit-')){route=id.slice(5)+'.html';anchor=active;break;}}const destination=new URL('./mobile/'+route,location.href);destination.search=params.toString();destination.hash=anchor;viewSwitch.href=destination.href;});
  window.DG_APP=Object.freeze({navigation,popups,fullEntry,journey,relatedRules});window.WHPageState?.installArmyBook(window.DG_APP);const returnRecord=window.WHGlossaryReturn?.read();if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord)&&returnRecord.popupIds?.length){const scope=document.getElementById(returnRecord.unitId)||document,root=[...scope.querySelectorAll('[data-term]')].find(node=>node.dataset.term===returnRecord.rootTerm)||null;requestAnimationFrame(()=>{window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{popups.restore(returnRecord.popupIds,{root,focus:false});window.WHGlossaryReturn.clear();});});}
  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('../../service-worker.js'));
}());
