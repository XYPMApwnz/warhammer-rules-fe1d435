(function(root){
  'use strict';
  let templatePromise;
  const normalize=value=>String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
  const profile=card=>{
    const keywords=new Set((card.dataset.keywords||'').split('|').map(normalize).filter(Boolean));
    let candidates=[];
    try{candidates=JSON.parse(card.dataset.relatedCandidates||'').map(candidate=>({...candidate,keywords:new Set(candidate.keywords.map(normalize))}));}catch{}
    return {unitId:card.id,id:card.id,slug:card.id.replace(/^unit-/,''),keywords,intrinsicKeywords:keywords,candidates:candidates.length?candidates:undefined,epic:keywords.has('EPIC HERO')};
  };
  const withKeywordGrants=(rule,unit)=>{
    let grants=[];
    try{grants=JSON.parse(rule.closest('[data-keyword-grants]')?.dataset.keywordGrants||'[]');}catch{}
    if(!grants.length)return unit;
    const applicable=grants.filter(grant=>root.WHRelatedRules.matches({v:1,roles:[{id:'grant',side:'friendly',subject:grant.subject||'unit',selector:grant.selector||{}}]},unit));
    const gained=applicable.filter(grant=>!grant.selectionRequired).map(grant=>normalize(grant.keyword));
    const conditional=new Set(applicable.filter(grant=>grant.selectionRequired).map(grant=>normalize(grant.keyword)));
    if(!gained.length&&!conditional.size)return unit;
    const candidates=(unit.candidates||[unit]).map(candidate=>({...candidate,keywords:new Set([...(candidate.keywords||unit.keywords),...gained])}));
    return {...unit,keywords:candidates[0].keywords,candidates,conditionalKeywords:conditional};
  };
  const match=(rule,unit)=>{
    try{return root.WHRelatedRules.match(JSON.parse(rule.dataset.eligibility||''),withKeywordGrants(rule,unit));}
    catch{return {state:'no-match',matchedRoleIds:[],reasons:[]};}
  };
  const matches=(rule,unit)=>match(rule,unit).state!=='no-match';
  const renderMatchState=(card,result)=>{
    card.dataset.matchState=result.state;
    card.querySelector(':scope > .compatibility-status')?.remove();
    if(result.state!=='conditional')return;
    const status=document.createElement('p');
    status.className='compatibility-status';
    status.innerHTML='<strong>Conditionally compatible</strong><span>Check the full card conditions</span>';
    card.prepend(status);
  };
  const getTemplate=()=>{
    if(!templatePromise)templatePromise=fetch('./mobile/related-rules.inc?v=3')
      .then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text();})
      .then(html=>{const template=document.createElement('template');template.innerHTML=html;return template;})
      .catch(error=>{templatePromise=null;throw error;});
    return templatePromise;
  };
  function install(options={}){
    const layer=document.createElement('div');
    layer.className='related-rules-layer';layer.hidden=true;
    layer.innerHTML='<section class="related-rules-dialog" role="dialog" aria-modal="true" aria-labelledby="relatedRulesTitle"><header><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">Compatible Stratagems &amp; Enhancements</h2></div><button type="button" class="related-rules-close" aria-label="Close">&times;</button></header><div class="related-rules-body"><p>Loading rules&hellip;</p></div></section>';
    document.body.append(layer);
    const body=layer.querySelector('.related-rules-body'),title=layer.querySelector('h2');
    let unit=null,kind='stratagems',detachment='all',filterMenu,tabs,content,empty,sections=[];
    let modal;
    const filter=()=>{
      if(!content||!unit)return;
      const unitProfile=profile(unit);
      content.querySelectorAll('.stratagem,.enhancement').forEach(card=>{
        const result=match(card,unitProfile);
        card.hidden=result.state==='no-match';
        renderMatchState(card,result);
      });
      const hasEnhancements=[...content.querySelectorAll('.enhancement')].some(card=>!card.hidden);
      const enhancementTab=tabs.querySelector('[data-kind="enhancements"]');
      enhancementTab.hidden=!hasEnhancements;
      if(kind==='enhancements'&&!hasEnhancements)kind='stratagems';
      content.querySelectorAll('[data-related-kind]').forEach(group=>{
        group.hidden=group.dataset.relatedKind!==kind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden);
      });
      sections.forEach(section=>{
        const selected=section.dataset.detachment==='core'||detachment==='all'||section.dataset.detachment===detachment;
        section.hidden=!selected||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden);
      });
      tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.kind===kind)));
      empty.hidden=sections.some(section=>!section.hidden);
      empty.textContent=`No matching ${kind} for this datasheet in the selected Detachments.`;
    };
    const close=()=>{if(layer.hidden)return;layer.hidden=true;document.documentElement.classList.remove('related-rules-open');modal.deactivate();};
    modal=root.WHModalFocus.create(layer,close);
    layer.addEventListener('click',event=>{
      if(event.target===layer||event.target.closest('.related-rules-close'))close();
      const tab=event.target.closest('[data-kind]');if(tab){kind=tab.dataset.kind;filter();}
    });
    async function open(current,state={}){
      if(!current)return null;
      unit=current;layer.dataset.unitId=current.id;kind=state.kind||'stratagems';title.textContent=`${current.dataset.unitTitle||'Datasheet'} · Compatible Stratagems & Enhancements`;
      layer.hidden=false;document.documentElement.classList.add('related-rules-open');modal.activate(current.querySelector('.related-rules-trigger'));
      if(!content){
        try{
          const fragment=(await getTemplate()).content.cloneNode(true);
          fragment.querySelectorAll('[id]').forEach(node=>{if(!node.dataset.ruleId)node.dataset.ruleId=node.id;node.removeAttribute('id');});
          sections=[...fragment.querySelectorAll('.related-detachment')];
          const rosterDetachments=new Set(options.rosterGuide?.detachmentIds||[]),rosterMode=rosterDetachments.size>0;
          if(rosterMode){sections.forEach(section=>{if(section.dataset.detachment!=='core'&&!rosterDetachments.has(section.dataset.detachment))section.remove();});sections=sections.filter(section=>section.dataset.detachment==='core'||rosterDetachments.has(section.dataset.detachment));}
          const detachmentSections=sections.filter(section=>section.dataset.detachment!=='core');
          const choices=[...(rosterMode&&detachmentSections.length===1?[]:[['all',rosterMode?'All roster detachments':'All detachments']]),...detachmentSections.map(section=>[section.dataset.detachment,section.querySelector('h2').textContent])];
          detachment=choices.length===1?choices[0][0]:'all';
          if(!rosterMode)try{const saved=localStorage.getItem(options.storageKey);if(choices.some(([value])=>value===saved))detachment=saved;}catch{}
          filterMenu=document.createElement('details');filterMenu.className='full-related-filter';filterMenu.classList.toggle('is-static',choices.length===1);
          filterMenu.innerHTML='<summary><span>'+choices.find(([value])=>value===detachment)[1]+'</span></summary><div>'+choices.map(([value,label])=>'<button type="button" data-detachment="'+value+'" aria-pressed="'+(value===detachment)+'">'+label+'</button>').join('')+'</div>';
          tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-kind="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-kind="enhancements" aria-pressed="false">Enhancements</button>';
          const controls=document.createElement('div');controls.className='full-related-controls';controls.append(filterMenu,tabs);
          content=document.createElement('div');content.className='full-related-content';content.append(fragment);
          empty=document.createElement('p');empty.className='full-related-empty';body.replaceChildren(controls,content,empty);
          filterMenu.addEventListener('click',event=>{
            if(choices.length===1){event.preventDefault();return;}
            const button=event.target.closest('[data-detachment]');if(!button)return;
            detachment=button.dataset.detachment;filterMenu.querySelector('summary span').textContent=button.textContent;
            filterMenu.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
            filterMenu.open=false;if(!rosterMode)try{localStorage.setItem(options.storageKey,detachment);}catch{}filter();
          });
        }catch{
          const message=document.createElement('p');message.textContent='Could not load related rules.';
          const retry=document.createElement('button');retry.type='button';retry.className='related-rules-retry';retry.textContent='Try again';retry.addEventListener('click',()=>open(current));
          body.replaceChildren(message,retry);return null;
        }
      }
      if(state.detachment&&sections.some(section=>section.dataset.detachment===state.detachment))detachment=state.detachment;
      filter();
      if(filterMenu){
        const selected=filterMenu.querySelector(`[data-detachment="${CSS.escape(detachment)}"]`);
        if(selected)filterMenu.querySelector('summary span').textContent=selected.textContent;
        filterMenu.querySelectorAll('[data-detachment]').forEach(button=>button.setAttribute('aria-pressed',String(button===selected)));
      }
      body.scrollTop=state.scrollTop||0;
      modal.focusFirst();
      return layer;
    }
    for(const card of document.querySelectorAll('.unit-card')){
      const keywords=[...card.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-keywords'));
      if(!keywords)continue;
      const button=document.createElement('button');button.type='button';button.className='related-rules-trigger';button.textContent='Stratagems & Enhancements';keywords.after(button);
    }
    document.addEventListener('click',event=>{const button=event.target.closest('.related-rules-trigger');if(button)open(button.closest('.unit-card'));});
    return{layer,close,open,snapshot(origin){if(layer.hidden||!layer.contains(origin))return null;const card=origin.closest('[data-rule-id]'),termId=origin.dataset.term||'',found=card&&termId?[...card.querySelectorAll(`[data-term="${CSS.escape(termId)}"]`)]:[];return{type:'related-rules',unitId:unit?.id||'',detachment,kind,scrollTop:body.scrollTop,ruleId:card?.dataset.ruleId||'',termId,occurrence:Math.max(0,found.indexOf(origin))};},async restore(state){const restoredUnit=document.getElementById(state?.unitId);if(!restoredUnit)return null;await open(restoredUnit,state);const card=layer.querySelector(`[data-rule-id="${CSS.escape(state.ruleId||'')}"]`),found=card&&state.termId?[...card.querySelectorAll(`[data-term="${CSS.escape(state.termId)}"]`)]:[];return found[state.occurrence]||found[0]||null;}};
  }
  root.WHArmyRelatedRules=Object.freeze({install,profile,match,matches});
}(window));
