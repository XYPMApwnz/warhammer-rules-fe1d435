(async function(){
  'use strict';
  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('./compatible-stratagems-runtime.mjs?v=3',scriptUrl))
    .catch(error=>{console.warn('Compatible Stratagems unavailable.',error);return null;});
  let relatedRulesTemplate,compatibleRulesMatrix;

  async function getRelatedRulesTemplate(){
    if(!relatedRulesTemplate)relatedRulesTemplate=fetch('./mobile/related-rules.inc?v=4')
      .then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.text();})
      .then(html=>{const template=document.createElement('template');template.innerHTML=html;return template;})
      .catch(error=>{relatedRulesTemplate=null;throw error;});
    return relatedRulesTemplate;
  }
  function decorateStratagemTypes(root){
    root.querySelectorAll('.stratagem').forEach(card=>{
      if(/^(battle-tactic|strategic-ploy|wargear|epic-deed|core|unknown)$/.test(card.dataset.stratagemType||''))return;
      const match=card.querySelector('.stratagem-type')?.textContent.trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i);
      card.dataset.stratagemType=match?match[1].toLowerCase().replace(/\s+/g,'-'):'unknown';
    });
  }

  function initRelatedRules(){
    if(!compatibleRuntime?.compatibleStratagemsReviewEnabled)return null;
    const rosterGuide=window.DG_ROSTER_GUIDE,rosterMode=Boolean(rosterGuide);
    const layer=document.createElement('div');
    layer.className='related-rules-layer';layer.hidden=true;
    layer.innerHTML='<section class="related-rules-dialog" role="dialog" aria-modal="true" aria-labelledby="relatedRulesTitle"><header><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">Compatible Stratagems</h2></div><button type="button" class="related-rules-close" aria-label="Close">&times;</button></header><div class="related-rules-body"><p>Loading rules&hellip;</p></div></section>';
    document.body.append(layer);
    const body=layer.querySelector('.related-rules-body'),title=layer.querySelector('h2');
    let unit=null,kind='stratagems',detachment='',filterMenu,tabs,content,empty,sections;
    let modal;
    const filter=()=>{
      if(!content||!unit)return;
      const compatible=compatibleRuntime.getCompatibleStratagems(compatibleRulesMatrix,unit.id,{detachmentId:detachment,warlord:unit.dataset.rosterWarlord==='true'}),assigned=new Set(rosterGuide?.enhancementRuleIdsByUnitId?.[unit.id]||[]),rules=rosterMode?compatible.filter(rule=>rule.kind!=='enhancement'||assigned.has(rule.ruleId)):compatible,byId=new Map(rules.map(rule=>[rule.ruleId,rule]));
      const hasEnhancements=rules.some(rule=>rule.kind==='enhancement');
      if(kind==='enhancements'&&!hasEnhancements)kind='stratagems';
      tabs.querySelector('[data-kind="enhancements"]').hidden=!hasEnhancements;
      const label=hasEnhancements?'Compatible Stratagems & Enhancements':'Compatible Stratagems';
      title.textContent=`${unit.querySelector('.unit-name')?.textContent.trim()||'Datasheet'} · ${label}`;
      unit.querySelector('.related-rules-trigger').textContent=label;
      content.querySelectorAll('.stratagem,.enhancement').forEach(card=>{
        const result=byId.get(card.dataset.ruleId);
        card.hidden=!result;
        card.dataset.matchState=result?.state||'no-match';
        card.querySelector(':scope > .compatibility-status')?.remove();
        if(result?.state==='conditional'){
          const status=document.createElement('p');status.className='compatibility-status';
          status.innerHTML='<strong>Conditionally compatible</strong><span></span>';
          status.querySelector('span').textContent=compatibleRuntime.conditionLabels[result.condition];
          card.prepend(status);
        }
      });
      content.querySelectorAll('[data-related-kind]').forEach(group=>{
        group.hidden=group.dataset.relatedKind!==kind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden);
      });
      sections.forEach(section=>{
        const selected=section.dataset.detachment==='core'||detachment==='all'||section.dataset.detachment===detachment;
        section.hidden=!selected||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden);
      });
      tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.kind===kind)));
      const hasVisibleRules=sections.some(section=>!section.hidden);
      empty.hidden=hasVisibleRules;empty.textContent=`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`;
    };
    const close=()=>{if(layer.hidden)return;layer.hidden=true;document.documentElement.classList.remove('related-rules-open');modal.deactivate();};
    modal=window.WHModalFocus.create(layer,close);
    layer.addEventListener('click',event=>{
      if(event.target===layer||event.target.closest('.related-rules-close'))close();
      const button=event.target.closest('[data-kind]');if(button){kind=button.dataset.kind;filter();}
    });
    async function open(current,state={}){
      if(filterMenu)filterMenu.open=false;
      unit=current;layer.dataset.unitId=current.id;kind='stratagems';title.textContent=`${current.querySelector('.unit-name')?.textContent.trim()||'Datasheet'} · Compatible Stratagems`;
      layer.hidden=false;document.documentElement.classList.add('related-rules-open');modal.activate(current.querySelector('.related-rules-trigger'));
      if(!content){
        try{
          const [template,matrix]=await Promise.all([getRelatedRulesTemplate(),compatibleRuntime.loadCompatibleStratagems(new URL('../generated/compatible-rules.json',scriptUrl))]);compatibleRulesMatrix=matrix;
          const fragment=template.content.cloneNode(true);
          fragment.querySelectorAll('[id]').forEach(node=>{node.dataset.ruleId=node.id;node.removeAttribute('id');});
          sections=[...fragment.querySelectorAll('.related-detachment')];
          const rosterDetachments=new Set(rosterGuide?.detachmentIds||[]);
          if(rosterMode){sections.forEach(section=>{if(section.dataset.detachment!=='core'&&!rosterDetachments.has(section.dataset.detachment))section.remove();});sections=sections.filter(section=>section.dataset.detachment==='core'||rosterDetachments.has(section.dataset.detachment));}
          const detachmentSections=sections.filter(section=>section.dataset.detachment!=='core');
          const choices=[...(!rosterMode?[['all','All Detachments']]:[]),...detachmentSections.map(section=>[section.dataset.detachment,section.querySelector('h2').textContent])];
          detachment=rosterMode?'all':(choices[0]?.[0]||'all');
          if(!rosterMode)try{const saved=localStorage.getItem('death-guard-detachment-filter');if(choices.some(([value])=>value===saved))detachment=saved;}catch{}
          filterMenu=document.createElement('details');filterMenu.className='full-related-filter';
          filterMenu.classList.toggle('is-static',choices.length===1);
          filterMenu.innerHTML='<summary><span>'+choices.find(([value])=>value===detachment)[1]+'</span></summary><div>'+choices.map(([value,label])=>'<button type="button" data-detachment="'+value+'" aria-pressed="'+(value===detachment)+'">'+label+'</button>').join('')+'</div>';
          tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-kind="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-kind="enhancements" aria-pressed="false">Enhancements</button>';
          const controls=document.createElement('div');controls.className='full-related-controls';if(!rosterMode)controls.append(filterMenu);controls.append(tabs);
          content=document.createElement('div');content.className='full-related-content';content.append(fragment);
          empty=document.createElement('p');empty.className='full-related-empty';
          body.replaceChildren(controls,content,empty);
          filterMenu.addEventListener('click',event=>{if(choices.length===1){event.preventDefault();return;}const button=event.target.closest('[data-detachment]');if(!button)return;detachment=button.dataset.detachment;filterMenu.querySelector('summary span').textContent=button.textContent;filterMenu.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));filterMenu.open=false;if(!rosterMode)try{localStorage.setItem('death-guard-detachment-filter',detachment);}catch{}filter();});
          content.querySelectorAll('.stratagem').forEach(card=>{const when=[...card.querySelectorAll('.field')].find(field=>field.querySelector('b')?.textContent.trim().toLowerCase()==='when')?.textContent||'';const turn=/opponent|enemy/i.test(when)?'THEIR TURN':/your\b/i.test(when)?'YOUR TURN':'ANY TURN';card.dataset.turn=turn;card.classList.add(turn==='THEIR TURN'?'turn-their':turn==='YOUR TURN'?'turn-yours':'turn-any');});
          decorateStratagemTypes(content);
        }catch{
          const retry=document.createElement('button');retry.type='button';retry.className='related-rules-retry';retry.textContent='Try again';
          retry.addEventListener('click',()=>open(current));
          const message=document.createElement('p');message.textContent='Could not load related rules.';
          body.replaceChildren(message,retry);return;
        }
      }
      if(!rosterMode&&state.detachment&&sections.some(section=>section.dataset.detachment===state.detachment))detachment=state.detachment;
      filter();
      if(filterMenu)filterMenu.querySelector('summary span').textContent=filterMenu.querySelector('[data-detachment="'+CSS.escape(detachment)+'"]')?.textContent||filterMenu.querySelector('summary span').textContent;
      layer.querySelector('.related-rules-dialog').scrollTop=state.scrollTop||0;
      modal.focusFirst();
    }
    for(const current of document.querySelectorAll('.unit-card')){
      const keywords=[...current.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-keywords'));
      if(!keywords)continue;
      const button=document.createElement('button');button.type='button';button.className='related-rules-trigger';button.textContent='Compatible Stratagems';
      button.addEventListener('click',()=>open(current));keywords.after(button);
    }
    return{
      layer,close,
      snapshot(origin){
        if(layer.hidden||!layer.contains(origin))return null;
        const card=origin.closest('[data-rule-id]'),termId=origin.dataset.term||'';
        const matches=card&&termId?[...card.querySelectorAll('[data-term="'+CSS.escape(termId)+'"]')]:[];
        return{type:'related-rules',unitId:unit?.id||'',detachment,kind,scrollTop:layer.querySelector('.related-rules-dialog').scrollTop,ruleId:card?.dataset.ruleId||'',termId,occurrence:Math.max(0,matches.indexOf(origin))};
      },
      async restore(state){
        const restoredUnit=document.getElementById(state?.unitId);if(!restoredUnit)return null;
        await open(restoredUnit,state);
        const card=layer.querySelector('[data-rule-id="'+CSS.escape(state.ruleId||'')+'"]');
        const matches=card&&state.termId?[...card.querySelectorAll('[data-term="'+CSS.escape(state.termId)+'"]')]:[];
        return matches[state.occurrence]||matches[0]||null;
      }
    };
  }

  for(const card of document.querySelectorAll('.stratagem')){
    const when=[...card.querySelectorAll('.field')].find(field=>field.querySelector('b')?.textContent.trim().toLowerCase()==='when')?.textContent||'';
    const turn=/opponent|enemy/i.test(when)?'THEIR TURN':/your\b/i.test(when)?'YOUR TURN':'ANY TURN';
    card.dataset.turn=turn;
    card.classList.add(turn==='THEIR TURN'?'turn-their':turn==='YOUR TURN'?'turn-yours':'turn-any');
  }
  decorateStratagemTypes(document);
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('death-guard'),...(window.DG_ROSTER_TERMS||{})});
  const documentRoot=document.querySelector('.document');
  window.WHGlossaryAutolink?.apply(documentRoot,'death-guard');
  window.WHGlossaryAutolink?.validate(documentRoot,terms);
  const navigation=new window.DGNavigation();
  const rosterGuides=document.querySelector('[data-roster-guides-link]');
  const viewSwitch=document.querySelector('[data-view-switch]');
  const params=new URLSearchParams(location.search);
  if(rosterGuides)rosterGuides.hidden=!params.get('roster');
  viewSwitch?.addEventListener('click',()=>{
    const active=navigation.active;
    let route='index.html',anchor='start';
    for(let node=navigation.byId.get(active)?.node;node;node=node.parentElement?.closest('[data-nav-id]')){
      const id=node.dataset.navId;
      if(id==='start'){anchor=active;break;}
      if(id==='updates'){route='updates.html';anchor=active;break;}
      if(id==='core-rules'){route='army-rules.html';anchor=active;break;}
      if(id.startsWith('detachment-')){route=id.slice(11)+'.html';anchor=active;break;}
      if(id.startsWith('unit-')){route=id.slice(5)+'.html';anchor=active;break;}
    }
    const destination=new URL('./mobile/'+route,location.href);
    destination.search=params.toString();
    destination.hash=anchor;
    viewSwitch.href=destination.href;
  });
  const fullEntry=new window.DGFullEntry(window.WH40K_GLOSSARY);
  const popups=new window.DGPopups(terms,fullEntry);
  const relatedRules=initRelatedRules();
  const journey=new window.DGJourney(navigation,popups,null,relatedRules);
  new window.DGTableAccessibility();
  window.DG_APP=Object.freeze({navigation,popups,fullEntry,journey,relatedRules});
  window.WHPageState?.installArmyBook(window.DG_APP);
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord)){
    const scope=document.getElementById(returnRecord.unitId)||document;
    const root=[...scope.querySelectorAll('[data-term]')].find(node=>node.dataset.term===returnRecord.rootTerm)||null;
    requestAnimationFrame(()=>{window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);requestAnimationFrame(()=>{if(returnRecord.popupIds?.length)popups.restore(returnRecord.popupIds,{root,focus:false});window.WHGlossaryReturn.clear();});});
  }
  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('../../service-worker.js'));
}());
