(function(){
  'use strict';
  const navButton=document.getElementById('navButton'),scrim=document.getElementById('navScrim'),nav=document.getElementById('mobileNav');
  const dialog=document.getElementById('termDialog'),popupLayer=document.getElementById('termPopupStack'),viewSwitch=document.querySelector('[data-view-switch]');
  const relatedRules=document.getElementById('relatedRules'),relatedContent=document.getElementById('relatedRulesContent'),relatedDetachment=document.getElementById('relatedDetachment');
  const drawerMedia=matchMedia('(max-width: 800px)'),unit=document.querySelector('.unit-card'),params=new URLSearchParams(location.search),rosterMode=params.has('roster');
  const normalize=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/\s*\(aura\)\s*$/i,'').replace(/[^a-z0-9]+/g,' ').trim(),faction=value=>normalize(value).replace(/^(?:chaos|imperium|xenos)\s+/,''),slug=value=>normalize(value).replace(/\s+/g,'-');
  const appendAssignedEnhancements=(sections,records)=>{for(const record of records||[]){const section=sections.find(item=>item.dataset.detachment===record.detachmentId),group=section?.querySelector('[data-related-kind="enhancements"]');if(!group||group.querySelector(`[data-rule-id="${CSS.escape(record.ruleId)}"]`))continue;const card=document.createElement('article');card.className='enhancement surface';card.dataset.ruleId=record.ruleId;card.dataset.rosterAssignedOnly='true';const cost=document.createElement('div');cost.className='eyebrow';cost.textContent=`Enhancement · ${record.value} pts`;const title=document.createElement('h4');title.textContent=record.title;const text=document.createElement('p');text.dataset.sourceField='text';text.textContent=record.text;card.append(cost,title,text);group.append(card);}};
  function rosterContext(){
    if(!rosterMode)return null;
    let record;try{record=(JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[]).find(item=>item?.id===params.get('roster'));}catch{}
    const roster=record?.roster;if(!record||faction(roster?.faction)!=='dark angels'||!roster?.units?.length)return null;
    const selected=new Set(roster.units.map(item=>normalize(item.name)));
    const detachments=[...new Set((roster.detachments?.length?roster.detachments.map(item=>item.label):[roster.detachment]).flatMap(value=>String(value||'').split(/\s*,\s*(?![^()]*\))/)).map(value=>slug(value.replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean))];
    if(!detachments.length||unit&&!selected.has(normalize(unit.dataset.unitTitle)))return null;
    return{roster,selected,detachments,units:unit?roster.units.filter(item=>normalize(item.name)===normalize(unit.dataset.unitTitle)):[]};
  }
  const roster=rosterContext();if(rosterMode&&!roster){location.replace('../../../roster-guides/index.html');return;}
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('dark-angels'),...(window.DG_TERMS||{})});
  window.WHGlossaryAutolink?.configure('dark-angels');
  const popups=new window.DAPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});

  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=params.toString();viewSwitch.href=destination.href;}
  if(rosterMode){
    for(const link of nav.querySelectorAll('a[href$=".html"]')){const destination=new URL(link.href);destination.searchParams.set('roster',params.get('roster'));link.href=destination.href;if(link.closest('.mobile-unit-groups')&&!roster.selected.has(normalize(link.textContent)))link.remove();}
    for(const link of nav.querySelectorAll('.phone-tree > details:first-of-type .mobile-nav-branch > a'))if(!roster.detachments.includes(slug(link.textContent.replace(/\s+\d+\s*DP$/i,''))))link.remove();
    for(const group of nav.querySelectorAll('.mobile-unit-groups > details'))if(!group.querySelector('a'))group.remove();
    document.documentElement.dataset.rosterActive='true';if(unit&&window.WHBookRosterEnhancements){window.WHBookRosterEnhancements.decorate(unit,roster.roster,roster.units);roster.assignedEnhancements=new Set(window.WHBookRosterEnhancements.assignedRuleIds(roster.roster,roster.units));roster.assignedEnhancementRecords=window.WHBookRosterEnhancements.assignedRecords(roster.roster,roster.units);}
  }
  if(relatedRules&&unit){
    const loadRelated=async()=>{
      try{
        const response=await fetch('./related-rules.inc?v=4');if(!response.ok)throw new Error(`HTTP ${response.status}`);
        const template=document.createElement('template');template.innerHTML=await response.text();const fragment=template.content;
        fragment.querySelectorAll('[id]').forEach(node=>{if(!node.dataset.ruleId)node.dataset.ruleId=node.id;node.removeAttribute('id');});
        let sections=[...fragment.querySelectorAll('.related-detachment')];if(rosterMode)appendAssignedEnhancements(sections,roster.assignedEnhancementRecords);
        if(rosterMode){const allowed=new Set(roster.detachments);sections.forEach(section=>{if(section.dataset.detachment!=='core'&&!allowed.has(section.dataset.detachment))section.remove();});sections=sections.filter(section=>section.dataset.detachment==='core'||allowed.has(section.dataset.detachment));relatedDetachment.querySelectorAll('option').forEach(option=>{if(option.value!=='all'&&!allowed.has(option.value))option.remove();});}
        const tabs=[...relatedRules.querySelectorAll('[data-related-tab]')],profile=window.WHArmyRelatedRules.profile(unit);let kind='stratagems';
        const filter=()=>{const visibleRules=[];relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card=>{const result=window.WHArmyRelatedRules.match(card,profile),assigned=!rosterMode||!card.classList.contains('enhancement')||roster.assignedEnhancements?.has(card.dataset.ruleId),visible=assigned&&(card.dataset.rosterAssignedOnly==='true'||result.state!=='no-match');card.hidden=!visible;card.dataset.matchState=visible?(card.dataset.rosterAssignedOnly==='true'?'match':result.state):'no-match';if(visible)visibleRules.push(card);});const hasEnhancements=visibleRules.some(card=>card.classList.contains('enhancement'));if(kind==='enhancements'&&!hasEnhancements)kind='stratagems';tabs.find(tab=>tab.dataset.relatedTab==='enhancements').hidden=!hasEnhancements;relatedContent.querySelectorAll('[data-related-kind]').forEach(group=>group.hidden=group.dataset.relatedKind!==kind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden));sections.forEach(section=>section.hidden=!(section.dataset.detachment==='core'||relatedDetachment.value==='all'||section.dataset.detachment===relatedDetachment.value)||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden));tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.relatedTab===kind)));};
        relatedContent.replaceChildren(fragment);relatedDetachment.addEventListener('change',filter);tabs.forEach(tab=>tab.addEventListener('click',()=>{kind=tab.dataset.relatedTab;filter();}));filter();
      }catch(error){console.error(error);relatedContent.textContent='Could not load compatible rules.';}
    };
    loadRelated();
  }
  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);

  document.addEventListener('click',event=>{
    const journey=event.target.closest('[data-journey-target]');
    if(journey&&!journey.matches('a[href]')){const target=document.getElementById(journey.dataset.journeyTarget);if(target){event.preventDefault();target.scrollIntoView({block:'start'});return;}}
    const trigger=event.target.closest('[data-term]');if(!trigger)return;event.preventDefault();showTerm(trigger);
  });
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();

  const documentTriggers=()=>[...document.querySelectorAll('main [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({beforeRestore(){popups.closeAll({focus:false});},snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}});
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean),trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});
  });
  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('../../../service-worker.js'));
}());
