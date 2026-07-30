(function(root){
  'use strict';
  let templatePromise;
  const normalize=root.WHRuleFacts.normalize;
  const profile=card=>root.WHRuleFacts.profileFromDataset(card.dataset,{id:card.id});
  const withKeywordGrants=(rule,unit)=>{
    let grants=[];
    try{grants=JSON.parse(rule.closest?.('[data-keyword-grants]')?.dataset.keywordGrants||'[]');}catch{}
    if(!grants.length)return unit;
    const gained=grants.filter(grant=>root.WHRelatedRules.matches({v:1,roles:[{id:'grant',side:'friendly',subject:'unit',selector:grant.selector||{}}]},unit)).map(grant=>normalize(grant.keyword));
    if(!gained.length)return unit;
    const candidates=(unit.candidates||[unit]).map(candidate=>({...candidate,keywords:new Set([...(candidate.keywords||unit.keywords),...gained])}));
    return {...unit,keywords:candidates[0].keywords,candidates};
  };
  function targetMatches(target,unit){return root.WHRelatedRules.matches({targets:[target]},unit);}
  function match(card,unitCard){
    const unit=unitCard.slug?{...unitCard,unitId:unitCard.unitId||unitCard.id||`unit-${unitCard.slug}`,intrinsicKeywords:unitCard.intrinsicKeywords||unitCard.keywords}:profile(unitCard);
    try{return root.WHRelatedRules.match(JSON.parse(card.dataset.eligibility||''),withKeywordGrants(card,unit));}
    catch{return {state:'no-match',matchedRoleIds:[],reasons:[]};}
  }
  const matches=(card,unitCard)=>match(card,unitCard).state!=='no-match';
  function getTemplate(){
    if(!templatePromise)templatePromise=fetch('./mobile/related-rules.inc?v=2')
      .then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text();})
      .then(html=>{const template=document.createElement('template');template.innerHTML=html;return template;})
      .catch(error=>{templatePromise=null;throw error;});
    return templatePromise;
  }
  function install(){
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
        card.dataset.matchState=result.state;
        card.querySelector(':scope > .compatibility-status')?.remove();
        if(result.state==='conditional'){
          const status=document.createElement('p');status.className='compatibility-status';
          status.innerHTML='<strong>Conditionally compatible</strong><span>Check the full card conditions</span>';
          card.prepend(status);
        }
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
      const hasVisible=sections.some(section=>!section.hidden);
      empty.hidden=hasVisible;
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
      unit=current;layer.dataset.unitId=current.id;kind=state.kind||'stratagems';title.textContent=`${current.dataset.unitTitle||current.querySelector('.unit-name,h3')?.textContent.trim()||'Datasheet'} · Compatible Stratagems & Enhancements`;
      layer.hidden=false;document.documentElement.classList.add('related-rules-open');modal.activate(current.querySelector('.related-rules-trigger'));
      if(!content){
        try{
          const template=await getTemplate(),fragment=template.content.cloneNode(true);
          fragment.querySelectorAll('[id]').forEach(node=>{if(!node.dataset.ruleId)node.dataset.ruleId=node.id;node.removeAttribute('id');});
          sections=[...fragment.querySelectorAll('.related-detachment')];
          const rosterDetachments=new Set(root.AM_ROSTER_GUIDE?.detachmentIds||[]),rosterMode=rosterDetachments.size>0;
          if(rosterMode){
            sections.forEach(section=>{if(section.dataset.detachment!=='core'&&!rosterDetachments.has(section.dataset.detachment))section.remove();});
            sections=sections.filter(section=>section.dataset.detachment==='core'||rosterDetachments.has(section.dataset.detachment));
          }
          const detachmentSections=sections.filter(section=>section.dataset.detachment!=='core');
          const choices=[...(rosterMode&&detachmentSections.length===1?[]:[['all',rosterMode?'All roster detachments':'All detachments']]),...detachmentSections.map(section=>[section.dataset.detachment,section.querySelector('h2').textContent])];
          detachment=choices.length===1?choices[0][0]:'all';
          if(!rosterMode)try{const saved=localStorage.getItem('adeptus-mechanicus-detachment-filter');if(choices.some(([value])=>value===saved))detachment=saved;}catch{}
          filterMenu=document.createElement('details');filterMenu.className='full-related-filter';filterMenu.classList.toggle('is-static',choices.length===1);
          filterMenu.innerHTML='<summary><span>'+choices.find(([value])=>value===detachment)[1]+'</span></summary><div>'+choices.map(([value,label])=>'<button type="button" data-detachment="'+value+'" aria-pressed="'+(value===detachment)+'">'+label+'</button>').join('')+'</div>';
          tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-kind="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-kind="enhancements" aria-pressed="false">Enhancements</button>';
          const controls=document.createElement('div');controls.className='full-related-controls';controls.append(filterMenu,tabs);
          content=document.createElement('div');content.className='full-related-content';content.append(fragment);
          empty=document.createElement('p');empty.className='full-related-empty';
          body.replaceChildren(controls,content,empty);
          filterMenu.addEventListener('click',event=>{
            if(choices.length===1){event.preventDefault();return;}
            const button=event.target.closest('[data-detachment]');if(!button)return;
            detachment=button.dataset.detachment;filterMenu.querySelector('summary span').textContent=button.textContent;
            filterMenu.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
            filterMenu.open=false;if(!rosterMode)try{localStorage.setItem('adeptus-mechanicus-detachment-filter',detachment);}catch{}filter();
          });
        }catch{
          const message=document.createElement('p');message.textContent='Could not load related rules.';
          const retry=document.createElement('button');retry.type='button';retry.className='related-rules-retry';retry.textContent='Try again';retry.addEventListener('click',()=>open(current));
          body.replaceChildren(message,retry);return null;
        }
      }
      if(state.detachment&&sections.some(section=>section.dataset.detachment===state.detachment))detachment=state.detachment;
      filter();
      if(filterMenu)filterMenu.querySelector('summary span').textContent=filterMenu.querySelector('[data-detachment="'+CSS.escape(detachment)+'"]')?.textContent||filterMenu.querySelector('summary span').textContent;
      layer.querySelector('.related-rules-dialog').scrollTop=state.scrollTop||0;
      modal.focusFirst();
      return layer;
    }
    for(const current of document.querySelectorAll('.unit-card')){
      const keywords=[...current.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-keywords'));
      if(!keywords)continue;
      const button=document.createElement('button');button.type='button';button.className='related-rules-trigger';button.textContent='Stratagems & Enhancements';keywords.after(button);
    }
    document.addEventListener('click',event=>{const button=event.target.closest('.related-rules-trigger');if(button)open(button.closest('.unit-card'));});
    return{
      layer,close,
      snapshot(origin){
        if(layer.hidden||!layer.contains(origin))return null;
        const card=origin.closest('[data-rule-id]'),termId=origin.dataset.term||'',found=card&&termId?[...card.querySelectorAll('[data-term="'+CSS.escape(termId)+'"]')]:[];
        return{type:'related-rules',unitId:unit?.id||'',detachment,kind,scrollTop:layer.querySelector('.related-rules-dialog').scrollTop,ruleId:card?.dataset.ruleId||'',termId,occurrence:Math.max(0,found.indexOf(origin))};
      },
      async restore(state){
        const restoredUnit=document.getElementById(state?.unitId);if(!restoredUnit)return null;
        await open(restoredUnit,state);
        const card=layer.querySelector('[data-rule-id="'+CSS.escape(state.ruleId||'')+'"]'),found=card&&state.termId?[...card.querySelectorAll('[data-term="'+CSS.escape(state.termId)+'"]')]:[];
        return found[state.occurrence]||found[0]||null;
      }
    };
  }
  root.AMRelatedRules=Object.freeze({profile,targetMatches,match,matches,install});
}(window));
