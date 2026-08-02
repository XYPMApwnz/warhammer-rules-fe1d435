(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-rules-runtime.mjs?v=3',scriptUrl)).catch(error=>{console.warn('Compatible rules unavailable.',error);return null;});
  const navButton=document.getElementById('navButton');
  const scrim=document.getElementById('navScrim');
  const dialog=document.getElementById('termDialog');
  const title=document.getElementById('termTitle');
  const summary=document.getElementById('termSummary');
  const full=document.getElementById('termFull');
  const rule=document.getElementById('termRule');
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
  let relatedRulesEnabled=compatibleRuntime?.compatibleRulesEnabled===true;
  let gesture=null,suppressed=null,opener=null,openedByTouch=false,relatedLoaded=false,relatedKind='stratagems';
  let rosterDetachments=[],assignedEnhancementNames=new Set(),assignedEnhancementRuleIds=new Set(),compatibleRulesMatrix;

  if(rosterMode&&unit&&window.WHRosterParser&&window.AMRosterEnhancements){
    try{
      const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1'))||[];
      const record=records.find(item=>item?.id===params.get('roster'));
      if(!record)throw new Error('Roster not found');
      const parsed=record?.sourceText?window.WHRosterParser.parse(record.sourceText):record?.roster;
      const faction=String(parsed?.faction||'').replace(/^(?:Chaos|Imperium)\s*[-–—]\s*/i,'').trim().toLowerCase();
      if(faction!=='adeptus mechanicus')throw new Error('Roster faction unavailable');
      const slug=value=>String(value||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      const matching=(parsed?.units||[]).filter(item=>slug(item.name)===unit.id.replace(/^unit-/,''));
      const detachmentLabels=parsed?.detachments?.length?parsed.detachments.map(item=>item.label):[parsed?.detachment];
      const canonicalDetachmentIds=[...relatedDetachment.options].filter(option=>option.value!=='all').map(option=>option.value);
      const detachmentId=window.AMRosterEnhancements.resolveDetachment(detachmentLabels,canonicalDetachmentIds);
      if(!matching.length||!detachmentId)throw new Error('Roster data unavailable');
      rosterDetachments=[detachmentId];
      const ownership=window.AMRosterEnhancements.resolveOwnership(parsed,matching);
      assignedEnhancementNames=new Set(ownership.cardEnhancements.map(item=>slug(item.name)));
      window.AM_ROSTER_GUIDE=Object.freeze({detachmentIds:rosterDetachments});
      if(matching.length)window.AMRosterEnhancements.decorate(unit,parsed,matching);
    }catch(error){console.warn('Roster data unavailable.',error);relatedRulesEnabled=false;}
  }
  if(rosterMode&&(!window.WHRosterParser||!window.AMRosterEnhancements))relatedRulesEnabled=false;
  if(!relatedRulesEnabled)relatedRules?.remove();
  if(rosterGuides)rosterGuides.hidden=!params.get('roster');
  if(viewSwitch){const destination=new URL(viewSwitch.href);destination.search=params.toString();if(location.hash)destination.hash=location.hash;viewSwitch.href=destination.href;}

  function drawer(open){document.body.classList.toggle('nav-drawer-open',open);navButton.setAttribute('aria-expanded',String(open));nav.setAttribute('aria-hidden',String(!open));scrim.hidden=!open;}
  function syncDrawerMode(){const returnFocus=nav.contains(document.activeElement);if(drawerMedia.matches)drawer(false);else{document.body.classList.remove('nav-drawer-open');nav.setAttribute('aria-hidden','false');scrim.hidden=true;}if(returnFocus&&nav.getAttribute('aria-hidden')==='true')navButton.focus({preventScroll:true});}
  function showTerm(trigger,byTouch){
    const id=trigger.dataset.term,termTitle=trigger.dataset.termTitle||trigger.textContent.trim(),termSummary=trigger.dataset.termSummary;
    if(!id||!termSummary)return;
    opener=trigger;openedByTouch=byTouch;title.textContent=termTitle;summary.textContent=termSummary;full.href=`../../../glossary/index.html#${id}`;
    const rulePath=trigger.dataset.mobileRulePath||trigger.dataset.fullRulePath;rule.hidden=!rulePath;
    if(rulePath){const destination=new URL(window.WHGlossaryReturn.href(rulePath));if(trigger.dataset.mobileRulePath)destination.search=location.search;rule.href=destination.href;}
    dialog.showModal();
  }
  full.addEventListener('click',()=>{const triggers=[...document.querySelectorAll('[data-term]')];window.WHGlossaryReturn?.save({termId:opener?.dataset.term||'',triggerIndex:opener?triggers.indexOf(opener):-1});});

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
      const [response,matrix]=await Promise.all([fetch('./related-rules.inc?v=3'),compatibleRuntime.loadCompatibleRules(new URL('../generated/compatible-rules.json',scriptUrl))]);if(!response.ok)throw new Error(`HTTP ${response.status}`);
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

  document.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'||!event.isPrimary)return;const trigger=event.target.closest('[data-term]');gesture=trigger?{trigger,id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}:null;},{capture:true,passive:true});
  document.addEventListener('pointermove',event=>{if(gesture&&gesture.id===event.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>10)gesture.moved=true;},{capture:true,passive:true});
  document.addEventListener('pointerup',event=>{if(!gesture||gesture.id!==event.pointerId)return;suppressed={trigger:gesture.trigger,until:performance.now()+700};if(!gesture.moved)showTerm(gesture.trigger,true);gesture=null;},{capture:true,passive:true});
  document.addEventListener('pointercancel',()=>{gesture=null;},{capture:true,passive:true});
  document.addEventListener('click',event=>{
    const local=event.target.closest('[data-journey-target]');if(local){document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({block:'start'});return;}
    const trigger=event.target.closest('[data-term]');if(!trigger)return;
    if(suppressed?.trigger===trigger&&performance.now()<suppressed.until){event.preventDefault();return;}showTerm(trigger,false);
  });
  navButton.addEventListener('click',()=>drawer(!document.body.classList.contains('nav-drawer-open')));scrim.addEventListener('click',()=>drawer(false));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{if(openedByTouch)requestAnimationFrame(()=>opener?.blur());openedByTouch=false;});
  if(relatedRulesEnabled&&relatedRules){if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();loadRelated();},{rootMargin:'600px 0px'});observer.observe(relatedRules);}else loadRelated();}
  if(relatedRulesEnabled&&relatedDetachment){try{const saved=localStorage.getItem('adeptus-mechanicus-detachment-filter');if(saved&&relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`))relatedDetachment.value=saved;}catch{}relatedDetachment.addEventListener('change',()=>{try{localStorage.setItem('adeptus-mechanicus-detachment-filter',relatedDetachment.value);}catch{}filterRelated();});filterRelated();}
  if(relatedRulesEnabled)relatedRules?.addEventListener('click',event=>{const tab=event.target.closest('[data-related-tab]');if(tab){relatedKind=tab.dataset.relatedTab;filterRelated();}});
  drawerMedia.addEventListener?.('change',syncDrawerMode);syncDrawerMode();
  window.WHPageState?.installTermDialog({dialog,triggers:()=>[...document.querySelectorAll('[data-term]')],opener:()=>opener,open:trigger=>showTerm(trigger,false)});

  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{const triggers=[...document.querySelectorAll('[data-term]')],indexed=triggers[returnRecord.triggerIndex],trigger=indexed?.dataset.term===returnRecord.termId?indexed:triggers.find(node=>node.dataset.term===returnRecord.termId);window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{if(trigger)showTerm(trigger,false);window.WHGlossaryReturn.clear();});});
}());
