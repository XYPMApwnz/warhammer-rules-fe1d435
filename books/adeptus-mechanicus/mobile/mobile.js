(function(root){
  'use strict';
  const slug=value=>String(value||'').toLowerCase().replace(/\s*\[legends\]\s*$/i,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const resolveContext=(parsed,detachmentIds,unitIds,resolveDetachment)=>{
    const faction=String(parsed?.faction||'').replace(/^(?:Chaos|Imperium)\s*[-–—]\s*/i,'').trim().toLowerCase();
    if(faction!=='adeptus mechanicus'||!parsed?.units?.length)throw new Error('Roster faction or units unavailable');
    const labels=parsed.detachments?.length?parsed.detachments.map(item=>item.label):[parsed.detachment];
    const detachmentId=resolveDetachment(labels,detachmentIds);
    if(!detachmentId)throw new Error('Roster Detachment unavailable');
    const knownUnits=new Set(unitIds),instancesByUnitId={};
    for(const instance of parsed.units){const unitId=`unit-${slug(instance.name)}`;if(knownUnits.has(unitId))(instancesByUnitId[unitId]||=[]).push(instance);}
    const resolvedUnitIds=Object.keys(instancesByUnitId);
    if(!resolvedUnitIds.length)throw new Error('Roster units unavailable');
    return{parsed,detachmentId,unitIds:resolvedUnitIds,instancesByUnitId};
  };
  const filterNavigation=(navigation,context)=>{
    if(!context)return{detachmentIds:[...navigation.detachmentIds],categories:navigation.categories.map(category=>({...category,unitIds:[...category.unitIds]}))};
    const units=new Set(context.unitIds);
    return{detachmentIds:navigation.detachmentIds.filter(id=>id===context.detachmentId),categories:navigation.categories.map(category=>({...category,unitIds:category.unitIds.filter(id=>units.has(id))})).filter(category=>category.unitIds.length)};
  };
  const routeAllowed=(type,id,context)=>!context||type==='unit'?context?.unitIds.includes(id)!==false:type==='detachment'?id===context.detachmentId:true;
  const cardContext=(context,unitId)=>{const instances=context?.instancesByUnitId?.[unitId]||[];return{instances,points:instances.reduce((sum,item)=>sum+(Number(item.points)||0),0),loadout:instances.flatMap(item=>[item.wargear,...(item.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(loadout=>loadout.wargear)])].filter(Boolean))};};
  const withRosterQuery=(href,rosterId,hash='')=>{const destination=new URL(href);destination.search='';destination.searchParams.set('roster',rosterId);if(hash)destination.hash=hash;return destination.href;};
  const viewSwitchHref=(href,search,hash='')=>{const destination=new URL(href);destination.search=search;if(hash)destination.hash=hash;return destination.href;};
  root.AMPhoneRoster=Object.freeze({slug,resolveContext,filterNavigation,routeAllowed,cardContext,withRosterQuery,viewSwitchHref});
}(window));

if(typeof document!=='undefined')(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-rules-runtime.mjs?v=3',scriptUrl)).catch(error=>{console.warn('Compatible rules unavailable.',error);return null;});
  const navButton=document.getElementById('navButton');
  const scrim=document.getElementById('navScrim');
  const dialog=document.getElementById('termDialog');
  const popupLayer=document.getElementById('termPopupStack');
  const nav=document.getElementById('mobileNav');
  const viewSwitch=document.querySelector('[data-view-switch]');
  const rosterGuides=document.querySelector('[data-roster-guides-link]');
  const relatedRules=document.getElementById('relatedRules');
  const relatedContent=document.getElementById('relatedRulesContent');
  const relatedDetachment=document.getElementById('relatedDetachment');
  const drawerMedia=window.matchMedia('(max-width: 800px)');
  const unit=document.querySelector('.unit-card');
  const params=new URLSearchParams(location.search);
  const rosterMode=params.has('roster');
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('adeptus-mechanicus')});
  window.WHGlossaryAutolink?.configure('adeptus-mechanicus');
  const popups=new window.AMPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});
  let relatedRulesEnabled=compatibleRuntime?.compatibleRulesEnabled===true;
  let gesture=null,suppressed=null,relatedLoaded=false,relatedKind='stratagems';
  let rosterDetachments=[],assignedEnhancementNames=new Set(),assignedEnhancementRuleIds=new Set(),compatibleRulesMatrix,rosterContext;

  if(rosterMode){
    const rosterId=params.get('roster'),rosterGuideHref=()=>window.AMPhoneRoster.withRosterQuery(new URL('../../../roster-guides/index.html',location.href).href,rosterId);
    if(!window.WHRosterParser||!window.AMRosterEnhancements){location.replace(rosterGuideHref());return;}
    try{
      const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[];
      const record=records.find(item=>item?.id===params.get('roster'));
      if(!record)throw new Error('Roster not found');
      const parsed=record?.sourceText?window.WHRosterParser.parse(record.sourceText):record?.roster;
      const detachmentLinks=[...nav.querySelectorAll('[data-route-type="detachment"][data-detachment-id]')];
      const categoryGroups=[...nav.querySelectorAll('[data-unit-category]')];
      const unitLinks=[...nav.querySelectorAll('[data-route-type="unit"][data-unit-id]')];
      const navigation={detachmentIds:detachmentLinks.map(link=>link.dataset.detachmentId),categories:categoryGroups.map(group=>({id:group.dataset.unitCategory,unitIds:[...group.querySelectorAll('[data-unit-id]')].map(link=>link.dataset.unitId)}))};
      rosterContext=window.AMPhoneRoster.resolveContext(parsed,navigation.detachmentIds,unitLinks.map(link=>link.dataset.unitId),window.AMRosterEnhancements.resolveDetachment);
      const current=nav.querySelector('[data-route-type][aria-current="page"]');
      if(current&&!window.AMPhoneRoster.routeAllowed(current.dataset.routeType,current.dataset.unitId||current.dataset.detachmentId||'',rosterContext))throw new Error('Current route is outside roster');
      const filtered=window.AMPhoneRoster.filterNavigation(navigation,rosterContext),allowedDetachments=new Set(filtered.detachmentIds),allowedUnits=new Set(filtered.categories.flatMap(category=>category.unitIds)),allowedCategories=new Set(filtered.categories.map(category=>category.id));
      detachmentLinks.forEach(link=>{if(!allowedDetachments.has(link.dataset.detachmentId))link.remove();});
      unitLinks.forEach(link=>{if(!allowedUnits.has(link.dataset.unitId))link.remove();});
      categoryGroups.forEach(group=>{if(!allowedCategories.has(group.dataset.unitCategory))group.remove();});
      nav.querySelectorAll('[data-route-type]').forEach(link=>{link.href=window.AMPhoneRoster.withRosterQuery(link.href,rosterId,link.hash);});
      if(rosterGuides)rosterGuides.href=window.AMPhoneRoster.withRosterQuery(rosterGuides.href,rosterId,rosterGuides.hash);
      rosterDetachments=[rosterContext.detachmentId];
      window.AM_ROSTER_GUIDE=Object.freeze({detachmentIds:rosterDetachments});
      if(unit){
        const currentCard=window.AMPhoneRoster.cardContext(rosterContext,unit.id);
        if(!currentCard.instances.length)throw new Error('Current datasheet is outside roster');
        const ownership=window.AMRosterEnhancements.resolveOwnership(parsed,currentCard.instances);
        assignedEnhancementNames=new Set(ownership.cardEnhancements.map(item=>window.AMPhoneRoster.slug(item.name)));
        const status=unit.querySelector('.unit-status');if(status)status.textContent=`${currentCard.instances.length>1?`${currentCard.instances.length} UNITS · `:''}${currentCard.points} PTS`;
        const composition=unit.querySelector('[id$="-composition"]');
        if(composition){const rows=new Map(),add=(quantity,name,wargear)=>{const id=`${name}\0${wargear||''}`,current=rows.get(id);rows.set(id,{quantity:(current?.quantity||0)+(Number(quantity)||1),name,wargear});};currentCard.instances.forEach(item=>item.models?.length?item.models.forEach(model=>model.loadouts?.length?model.loadouts.forEach(loadout=>add(loadout.quantity,model.name,loadout.wargear)):add(model.quantity,model.name,model.wargear)):add(item.quantity,item.name,item.wargear));const block=document.createElement('div');block.className='content-block roster-composition';block.innerHTML='<strong>Roster loadout</strong>';const list=document.createElement('ul');for(const row of rows.values()){const item=document.createElement('li');item.textContent=`${row.quantity}× ${row.name}${row.wargear?` — ${row.wargear}`:''}`;list.append(item);}block.append(list);composition.replaceChildren(composition.querySelector('h4'),block);}
        window.AMRosterEnhancements.decorate(unit,parsed,currentCard.instances);
        if(currentCard.loadout.length&&window.WHRosterEntities)unit.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const label=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(label&&!window.WHRosterEntities.loadoutIncludesProfile(currentCard.loadout,label))row.remove();});
        unit.querySelectorAll('.weapon-group').forEach(group=>{if(!group.querySelector('.weapon-row:not(.weapon-head)'))group.remove();});
      }
    }catch(error){console.warn('Roster data unavailable.',error);relatedRulesEnabled=false;location.replace(rosterGuideHref());return;}
  }
  if(!relatedRulesEnabled)relatedRules?.remove();
  if(rosterGuides)rosterGuides.hidden=!params.get('roster');
  if(viewSwitch)viewSwitch.href=window.AMPhoneRoster.viewSwitchHref(viewSwitch.href,params.toString(),location.hash);

  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);

  function filterRelated(){
    if(!relatedRulesEnabled||!relatedContent||!unit||!compatibleRulesMatrix)return;
    const selected=relatedDetachment.value;
    const compatible=compatibleRuntime.getCompatibleRules(compatibleRulesMatrix,unit.id,{detachmentId:selected});
    const allowed=new Map(window.AMRosterEnhancements.filterCompatibleRules(compatible,rosterMode,assignedEnhancementRuleIds).map(item=>[item.ruleId,item]));
    relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card=>{
      const result=allowed.get(card.dataset.ruleId||card.id);
      card.hidden=!result;
      card.dataset.matchState=result?.state||'no-match';
      card.querySelector(':scope > .compatibility-status')?.remove();
      if(result?.state==='conditional'){
        const status=document.createElement('p');status.className='compatibility-status';
        const heading=document.createElement('strong');heading.textContent='Conditionally compatible';status.append(heading);
        for(const condition of compatibleRuntime.conditionsFor(result)){const line=document.createElement('span');line.textContent=compatibleRuntime.conditionLabels[condition]||'Check the full card conditions';status.append(line);}
        card.prepend(status);
      }
    });
    const enhancementTab=relatedRules.querySelector('[data-related-tab="enhancements"]');
    const hasEnhancements=[...relatedContent.querySelectorAll('.enhancement')].some(card=>!card.hidden);
    if(enhancementTab)enhancementTab.hidden=!hasEnhancements;
    if(relatedKind==='enhancements'&&!hasEnhancements)relatedKind='stratagems';
    relatedContent.querySelectorAll('[data-related-kind]').forEach(group=>{group.hidden=group.dataset.relatedKind!==relatedKind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden);});
    relatedContent.querySelectorAll('.related-detachment').forEach(section=>{const chosen=section.dataset.detachment==='core'||selected==='all'||section.dataset.detachment===selected;section.hidden=!chosen||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden);});
    relatedRules.querySelectorAll('[data-related-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.relatedTab===relatedKind)));
    const hasVisible=[...relatedContent.querySelectorAll('.related-detachment')].some(section=>!section.hidden);
    let empty=relatedContent.querySelector('.related-empty');
    if(!hasVisible&&!empty){empty=document.createElement('p');empty.className='related-status related-empty';relatedContent.append(empty);}
    if(empty){empty.hidden=hasVisible;empty.textContent=`No matching ${relatedKind} for this datasheet.`;}
  }
  async function loadRelated(){
    if(!relatedRulesEnabled||relatedLoaded)return;
    try{
      const [response,matrix]=await Promise.all([fetch('./related-rules.inc?v=4'),compatibleRuntime.loadCompatibleRules(new URL('../generated/compatible-rules.json',scriptUrl))]);if(!response.ok)throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML=await response.text();compatibleRulesMatrix=matrix;relatedLoaded=true;
      if(rosterMode){const normalizeTitle=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');assignedEnhancementRuleIds=new Set([...relatedContent.querySelectorAll('.enhancement[data-enhancement-title]')].filter(card=>assignedEnhancementNames.has(normalizeTitle(card.dataset.enhancementTitle))).map(card=>card.dataset.ruleId||card.id));}
      if(rosterMode){[...relatedDetachment.options].forEach(option=>{if(option.value==='all'||option.value!==rosterDetachments[0])option.remove();});if(relatedDetachment.options.length!==1||relatedDetachment.options[0].value!==rosterDetachments[0])throw new Error('Roster data unavailable');relatedDetachment.value=rosterDetachments[0];relatedDetachment.disabled=true;}
      filterRelated();
    }catch(error){
      if(rosterMode&&error?.message==='Roster data unavailable'){relatedRulesEnabled=false;relatedRules?.remove();return;}
      relatedLoaded=false;
      const retry=document.createElement('button');retry.type='button';retry.className='related-retry';retry.textContent='Try again';retry.addEventListener('click',loadRelated);
      const message=document.createElement('p');message.className='related-status';message.textContent='Could not load related rules. Check the connection and try again.';relatedContent.replaceChildren(message,retry);
    }
  }

  document.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'){suppressed=null;return;}if(!event.isPrimary)return;suppressed=null;const trigger=event.target.closest('[data-term]');gesture=trigger?{trigger,id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}:null;},{capture:true,passive:true});
  document.addEventListener('pointermove',event=>{if(gesture&&gesture.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>10)gesture.moved=true;},{capture:true,passive:true});
  document.addEventListener('pointerup',event=>{if(!gesture||gesture.id!==event.pointerId)return;const completed=gesture;gesture=null;if(completed.moved)return;suppressed={trigger:completed.trigger,until:performance.now()+700};showTerm(completed.trigger);},{capture:true,passive:true});
  document.addEventListener('pointercancel',()=>{gesture=null;suppressed=null;},{capture:true,passive:true});
  document.addEventListener('click',event=>{if(!suppressed)return;const active=performance.now()<suppressed.until;suppressed=null;if(active){event.preventDefault();event.stopImmediatePropagation();}},{capture:true});
  document.addEventListener('click',event=>{
    const local=event.target.closest('[data-journey-target]');if(local){document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({block:'start'});return;}
    const trigger=event.target.closest('[data-term]');if(!trigger)return;
    showTerm(trigger);
  });
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  if(relatedRulesEnabled&&relatedRules){if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();loadRelated();},{rootMargin:'600px 0px'});observer.observe(relatedRules);}else loadRelated();}
  if(relatedRulesEnabled&&relatedDetachment){try{const saved=localStorage.getItem('adeptus-mechanicus-detachment-filter');if(saved&&relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`))relatedDetachment.value=saved;}catch{}relatedDetachment.addEventListener('change',()=>{try{localStorage.setItem('adeptus-mechanicus-detachment-filter',relatedDetachment.value);}catch{}filterRelated();});filterRelated();}
  if(relatedRulesEnabled)relatedRules?.addEventListener('click',event=>{const tab=event.target.closest('[data-related-tab]');if(tab){relatedKind=tab.dataset.relatedTab;filterRelated();}});
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();
  const documentTriggers=()=>[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({
    beforeRestore(){popups.closeAll({focus:false});},
    snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},
    restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}
  });

  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean);
    const trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
    requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});
  });
}());
