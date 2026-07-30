(function(){
  'use strict';
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),title=document.getElementById('termTitle'),summary=document.getElementById('termSummary'),full=document.getElementById('termFull'),rule=document.getElementById('termRule'),returnPopup=document.getElementById('returnPopup');
  const related=document.getElementById('relatedRules'),content=document.getElementById('relatedRulesContent'),select=document.getElementById('relatedDetachment'),unit=document.querySelector('.unit-card');
  const relatedRulesEnabled=window.WHRelatedRules?.enabled===true;
  let opener=null,loaded=false,kind='stratagems';
  if(!relatedRulesEnabled)related?.remove();
  const viewSwitch=document.querySelector('[data-view-switch]');if(viewSwitch){const url=new URL(viewSwitch.href);url.search=location.search;if(location.hash)url.hash=location.hash;viewSwitch.href=url.href;}
  const rosterId=new URLSearchParams(location.search).get('roster');
  let roster=null,selected=new Map(),rosterDetachments=new Set();
  if(rosterId){
    const normalize=value=>String(value||'').toLowerCase().replace(/\[legends\]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
    try{
      const record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===rosterId);roster=record?.sourceText&&window.WHRosterParser?window.WHRosterParser.parse(record.sourceText):record?.roster;
      for(const item of roster?.units||[]){const key=normalize(item.name),entry=selected.get(key)||{units:[],loadout:[]};entry.units.push(item);entry.loadout.push(...[item.wargear,...(item.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(loadout=>loadout.wargear)])].filter(Boolean));selected.set(key,entry);}
      rosterDetachments=new Set((roster?.detachments?.length?roster.detachments.map(item=>item.label):[roster?.detachment]).flatMap(value=>String(value||'').split(/\s*,\s*(?![^()]*\))/)).map(value=>normalize(value.replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean));
      for(const link of nav.querySelectorAll('a[href$=".html"]')){
        const url=new URL(link.href);url.searchParams.set('roster',rosterId);link.href=url.href;
        if(/\/(?:mobile\/)?[^/]+\.html$/.test(url.pathname)&&selected.size&&link.closest('.mobile-unit-groups'))link.hidden=!selected.has(normalize(link.textContent));
      }
      for(const details of nav.querySelectorAll('.phone-tree > details:first-of-type .mobile-nav-branch > a'))details.hidden=rosterDetachments.size&&!rosterDetachments.has(normalize(details.textContent));
      for(const group of nav.querySelectorAll('.mobile-unit-groups > details'))group.hidden=![...group.querySelectorAll('a')].some(link=>!link.hidden);
      if(unit){const entry=selected.get(normalize(unit.dataset.unitTitle));if(entry){window.WHBookRosterEnhancements?.decorate(unit,roster,entry.units);const composition=unit.querySelector('[id$="-composition"]');if(composition){const block=document.createElement('div');block.className='content-block roster-composition';const heading=document.createElement('strong');heading.textContent='Roster loadout';const list=document.createElement('ul');for(const item of entry.units){const row=document.createElement('li');row.textContent=`${item.quantity||1}× ${item.name}${item.wargear?` — ${item.wargear}`:''}`;list.append(row);}block.append(heading,list);composition.replaceChildren(composition.querySelector('h4'),block);}if(entry.loadout.length&&window.WHRosterEntities)unit.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const label=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(label&&!window.WHRosterEntities.loadoutIncludesProfile(entry.loadout,label))row.remove();});}}
      document.documentElement.dataset.rosterActive=selected.size?'true':'false';
    }catch(error){console.warn('T’au roster filter unavailable',error);}
  }
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function triggers(){return[...document.querySelectorAll('[data-term]')];}
  function showTerm(trigger){
    const id=trigger?.dataset.term;if(!id||!trigger.dataset.termSummary)return;opener=trigger;title.textContent=trigger.dataset.termTitle||trigger.textContent.trim();summary.textContent=trigger.dataset.termSummary;
    full.href=`../../../glossary/index.html#${encodeURIComponent(id)}`;const path=trigger.dataset.mobileRulePath||trigger.dataset.fullRulePath;rule.hidden=!path;if(path){const destination=new URL(window.WHGlossaryReturn.href(path));if(trigger.dataset.mobileRulePath)destination.search=location.search;rule.href=destination.href;}if(!dialog.open)dialog.showModal();
  }
  function save(mode){if(!opener)return;window.WHGlossaryReturn.save({termId:opener.dataset.term,triggerIndex:triggers().indexOf(opener)});window.WHGlossaryReturn.setRestoreMode(mode);}
  function restore(record){const all=triggers(),trigger=all[record.triggerIndex]?.dataset.term===record.termId?all[record.triggerIndex]:all.find(node=>node.dataset.term===record.termId);history.replaceState(history.state,'',record.path);scrollTo(record.scrollX||0,record.scrollY||0);requestAnimationFrame(()=>{if(trigger)showTerm(trigger);window.WHGlossaryReturn.clear();returnPopup.hidden=true;});}
  function syncReturn(){const record=window.WHGlossaryReturn.read();returnPopup.hidden=!record||window.WHGlossaryReturn.shouldRestoreAutomatically(record);if(record)returnPopup.href=record.path;return record;}
  function filter(){
    if(!relatedRulesEnabled||!loaded||!unit)return;const profile=window.WHArmyRelatedRules.profile(unit);
    content.querySelectorAll('.stratagem,.enhancement').forEach(card=>{const result=window.WHArmyRelatedRules.match(card,profile);card.hidden=result.state==='no-match';card.dataset.matchState=result.state;card.querySelector(':scope > .compatibility-status')?.remove();if(result.state==='conditional'){const status=document.createElement('p');status.className='compatibility-status';status.innerHTML='<strong>Conditionally compatible</strong><span>Check the full card conditions</span>';card.prepend(status);}});
    const enhancementTab=related.querySelector('[data-related-tab="enhancements"]'),hasEnhancements=[...content.querySelectorAll('.enhancement')].some(card=>!card.hidden);if(enhancementTab)enhancementTab.hidden=!hasEnhancements;if(kind==='enhancements'&&!hasEnhancements)kind='stratagems';
    content.querySelectorAll('[data-related-kind]').forEach(group=>group.hidden=group.dataset.relatedKind!==kind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden));
    content.querySelectorAll('.related-detachment').forEach(section=>section.hidden=!(section.dataset.detachment==='core'||select.value==='all'||section.dataset.detachment===select.value)||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden));
    related.querySelectorAll('[data-related-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.relatedTab===kind)));
  }
  async function load(){if(!relatedRulesEnabled||loaded)return;try{const response=await fetch('./related-rules.inc?v=1');if(!response.ok)throw new Error();content.innerHTML=await response.text();if(rosterDetachments.size){content.querySelectorAll('.related-detachment:not(.related-core)').forEach(section=>{if(!rosterDetachments.has(String(section.querySelector('h2')?.textContent||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()))section.remove();});select.querySelectorAll('option:not([value="all"])').forEach(option=>{if(!rosterDetachments.has(String(option.textContent||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()))option.remove();});}loaded=true;filter();}catch{content.innerHTML='<p class="related-status">Could not load related rules.</p>';}}
  document.addEventListener('click',event=>{const trigger=event.target.closest('[data-term]');if(trigger){event.preventDefault();showTerm(trigger);}});
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  full.addEventListener('click',()=>save('automatic'));rule.addEventListener('click',()=>{save('manual');dialog.close();setTimeout(syncReturn,0);});returnPopup.addEventListener('click',event=>{const record=window.WHGlossaryReturn.read();if(!record)return;if(window.WHGlossaryReturn.isSameDocument(record)){event.preventDefault();restore(record);}else window.WHGlossaryReturn.setRestoreMode('automatic');});
  if(relatedRulesEnabled){select?.addEventListener('change',()=>{try{localStorage.setItem('tau-empire-detachment-filter',select.value);}catch{}filter();});try{const saved=localStorage.getItem('tau-empire-detachment-filter');if(saved&&select?.querySelector(`option[value="${CSS.escape(saved)}"]`))select.value=saved;}catch{}
  related?.addEventListener('click',event=>{const tab=event.target.closest('[data-related-tab]');if(tab){kind=tab.dataset.relatedTab;filter();}});if(related){if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();load();}},{rootMargin:'600px'});observer.observe(related);}else load();}}
  window.WHPageState?.installTermDialog({dialog,triggers,opener:()=>opener,open:showTerm});
  const record=window.WHGlossaryReturn.read();if(window.WHGlossaryReturn.shouldRestoreAutomatically(record))requestAnimationFrame(()=>restore(record));else syncReturn();
}());
