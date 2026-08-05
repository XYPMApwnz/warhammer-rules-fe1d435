(async function(){
  'use strict';
  function decorateStratagemTurns(root){
    root.querySelectorAll('.stratagem').forEach(card=>{const when=[...card.querySelectorAll('.field,.label-row')].find(field=>field.querySelector('b')?.textContent.trim().toLowerCase()==='when')?.textContent||'';const turn=/opponent|enemy/i.test(when)?'THEIR TURN':/your\b/i.test(when)?'YOUR TURN':'ANY TURN';card.dataset.turn=turn;card.classList.remove('turn-any','turn-yours','turn-their');card.classList.add(turn==='THEIR TURN'?'turn-their':turn==='YOUR TURN'?'turn-yours':'turn-any');});
  }
  const stratagemTypeLabels={'battle-tactic':'Battle Tactic Stratagem','strategic-ploy':'Strategic Ploy Stratagem',wargear:'Wargear Stratagem','epic-deed':'Epic Deed Stratagem',core:'Core Stratagem',unknown:'Type unverified'};
  function decorateStratagemTypes(root){
    root.querySelectorAll('.stratagem').forEach(card=>{const labels=[...card.querySelectorAll('.stratagem-type')],current=/^(battle-tactic|strategic-ploy|wargear|epic-deed|core|unknown)$/.test(card.dataset.stratagemType||'')?card.dataset.stratagemType:'',id=card.dataset.ruleId||card.id||'',mapped=stratagemTypes.get(id)||stratagemTypes.get(id.replace(/^stratagem-/,'')),match=labels[0]?.textContent.trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i),resolvedType=mapped||current||(match?match[1].toLowerCase().replace(/\s+/g,'-'):'unknown'),expected=stratagemTypeLabels[resolvedType];card.dataset.stratagemType=resolvedType;const label=labels.shift()||document.createElement('span');labels.forEach(node=>node.remove());label.classList.add('stratagem-type');if(resolvedType==='unknown'||!label.textContent.trim().toLowerCase().endsWith(expected.toLowerCase()))label.textContent=expected;const head=card.querySelector('.stratagem-head'),host=head?.querySelector(':scope > div:not(.cp)')||head;host?.append(label);});
  }
  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('./compatible-rules-runtime.mjs?v=2',scriptUrl)).catch(error=>{console.warn('Compatible rules unavailable.',error);return null;});
  const {stratagemTypes}=await import(new URL('./stratagem-types.mjs?v=1',scriptUrl));
  let relatedTemplate,compatibleMatrix;
  const params=new URLSearchParams(location.search),rosterMode=params.has('roster');
  const template=()=>relatedTemplate||(relatedTemplate=fetch('./mobile/related-rules.inc?v=4').then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text();}).then(html=>{const node=document.createElement('template');node.innerHTML=html;return node;}));
  function initRelatedRules(){
    const roster=window.TYRANIDS_ROSTER_GUIDE;if(!compatibleRuntime?.compatibleRulesEnabled||(rosterMode&&!roster))return null;
    const layer=document.createElement('div');layer.className='related-rules-layer';layer.hidden=true;layer.innerHTML='<section class="related-rules-dialog" role="dialog" aria-modal="true" aria-labelledby="relatedRulesTitle"><header><div><span>Datasheet tools</span><h2 id="relatedRulesTitle">Compatible Stratagems</h2></div><button type="button" class="related-rules-close" aria-label="Close">&times;</button></header><div class="related-rules-body"><p>Loading rules&hellip;</p></div></section>';document.body.append(layer);
    const body=layer.querySelector('.related-rules-body'),title=layer.querySelector('h2');let unit,kind='stratagems',detachment='',filterMenu,tabs,content,empty,sections,modal;
    const conditions=(card,result)=>{card.querySelector(':scope > .compatibility-status')?.remove();if(result?.state!=='conditional')return;const status=document.createElement('p');status.className='compatibility-status';status.innerHTML='<strong>Conditionally compatible</strong>';for(const condition of compatibleRuntime.conditionsFor(result)){const line=document.createElement('span');line.textContent=compatibleRuntime.conditionLabels[condition]||'Check the full card conditions';status.append(line);}card.prepend(status);};
    const filter=()=>{if(!content||!unit)return;const compatible=compatibleRuntime.getCompatibleRules(compatibleMatrix,unit.id,{detachmentId:detachment}),assigned=new Set(roster?.enhancementRuleIdsByUnitId?.[unit.id]||[]),rules=rosterMode?compatible.filter(rule=>rule.kind!=='enhancement'||assigned.has(rule.ruleId)):compatible,byId=new Map(rules.map(rule=>[rule.ruleId,rule])),hasEnhancements=rules.some(rule=>rule.kind==='enhancement');if(kind==='enhancements'&&!hasEnhancements)kind='stratagems';tabs.querySelector('[data-kind="enhancements"]').hidden=!hasEnhancements;const label=hasEnhancements?'Compatible Stratagems & Enhancements':'Compatible Stratagems';title.textContent=`${unit.querySelector('h3')?.textContent.trim()||'Datasheet'} · ${label}`;unit.querySelector('.related-rules-trigger').textContent=label;content.querySelectorAll('.stratagem,.enhancement').forEach(card=>{const result=byId.get(card.dataset.ruleId);card.hidden=!result;card.dataset.matchState=result?.state||'no-match';conditions(card,result);});content.querySelectorAll('[data-related-kind]').forEach(group=>group.hidden=group.dataset.relatedKind!==kind||![...group.querySelectorAll('.stratagem,.enhancement')].some(card=>!card.hidden));sections.forEach(section=>section.hidden=!(section.dataset.detachment==='core'||detachment==='all'||section.dataset.detachment===detachment)||![...section.querySelectorAll('[data-related-kind]')].some(group=>!group.hidden));tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.kind===kind)));const visible=sections.some(section=>!section.hidden);empty.hidden=visible;empty.textContent=`No compatible ${kind==='enhancements'?'Enhancements':'Stratagems'} for this datasheet in the selected Detachment.`;};
    const close=()=>{if(layer.hidden)return;layer.hidden=true;document.documentElement.classList.remove('related-rules-open');modal.deactivate();};modal=window.WHModalFocus.create(layer,close);layer.addEventListener('click',event=>{if(event.target===layer||event.target.closest('.related-rules-close'))close();const tab=event.target.closest('[data-kind]');if(tab){kind=tab.dataset.kind;filter();}});
    async function open(current,state={}){if(filterMenu)filterMenu.open=false;unit=current;kind='stratagems';layer.hidden=false;document.documentElement.classList.add('related-rules-open');modal.activate(current.querySelector('.related-rules-trigger'));if(!content)try{const [source,matrix]=await Promise.all([template(),compatibleRuntime.loadCompatibleRules(new URL('../generated/compatible-rules.json',scriptUrl))]);compatibleMatrix=matrix;const fragment=source.content.cloneNode(true);fragment.querySelectorAll('[id]').forEach(node=>{node.dataset.ruleId=node.id;node.removeAttribute('id');});sections=[...fragment.querySelectorAll('.related-detachment')];const allowed=new Set(roster?.detachmentIds||[]);if(rosterMode){sections.forEach(section=>{if(section.dataset.detachment!=='core'&&!allowed.has(section.dataset.detachment))section.remove();});sections=sections.filter(section=>section.dataset.detachment==='core'||allowed.has(section.dataset.detachment));}const choices=[...(!rosterMode?[['all','All Detachments']]:[]),...sections.filter(section=>section.dataset.detachment!=='core').map(section=>[section.dataset.detachment,section.querySelector('h2').textContent])];detachment=choices[0]?.[0]||'';filterMenu=document.createElement('details');filterMenu.className='full-related-filter';filterMenu.innerHTML='<summary><span>'+(choices[0]?.[1]||'No Detachment')+'</span></summary><div>'+choices.map(([value,label])=>`<button type="button" data-detachment="${value}">${label}</button>`).join('')+'</div>';tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-kind="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-kind="enhancements" aria-pressed="false">Enhancements</button>';const controls=document.createElement('div');controls.className='full-related-controls';controls.append(filterMenu,tabs);content=document.createElement('div');content.className='full-related-content';content.append(fragment);decorateStratagemTurns(content);decorateStratagemTypes(content);empty=document.createElement('p');empty.className='full-related-empty';body.replaceChildren(controls,content,empty);filterMenu.addEventListener('click',event=>{const button=event.target.closest('[data-detachment]');if(!button)return;detachment=button.dataset.detachment;filterMenu.querySelector('summary span').textContent=button.textContent;filterMenu.open=false;filter();});}catch(error){console.error(error);body.textContent='Could not load related rules.';return;}if(state.detachment&&choices.some(([value])=>value===state.detachment))detachment=state.detachment;filter();modal.focusFirst();}
    document.querySelectorAll('.unit-card').forEach(current=>{const keywords=[...current.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-keywords'));if(!keywords)return;const button=document.createElement('button');button.type='button';button.className='related-rules-trigger';button.textContent='Compatible Stratagems';button.addEventListener('click',()=>open(current));keywords.after(button);});
    return{layer,close,snapshot(){return layer.hidden?null:{type:'related-rules',unitId:unit?.id||'',detachment,kind};},async restore(state){const restored=document.getElementById(state?.unitId);if(!restored)return null;await open(restored,state);return restored.querySelector('.related-rules-trigger');}};
  }
  for(const button of document.querySelectorAll('button:not([type])'))button.type='button';
  decorateStratagemTurns(document);decorateStratagemTypes(document);

  const terms=window.WH40K_GLOSSARY?.forBook('tyranids')||window.DG_TERMS;
  const documentRoot=document.querySelector('.document');
  window.WHGlossaryAutolink?.apply(documentRoot,'tyranids');
  window.WHGlossaryAutolink?.validate(documentRoot,terms);

  const navigation=new window.DGNavigation();
  const fullEntry=new window.DGFullEntry(window.WH40K_GLOSSARY);
  const popups=new window.DGPopups(terms,fullEntry);
  const relatedRules=initRelatedRules();
  const journey=new window.DGJourney(navigation,popups,null,relatedRules);
  new window.DGTableAccessibility();

  const rosterGuides=document.querySelector('[data-roster-guides]');
  const viewSwitch=document.querySelector('[data-view-switch]');
  if(rosterGuides)rosterGuides.hidden=!params.get('roster');

  viewSwitch?.addEventListener('click',()=>{
    const active=navigation.active;
    let route='index.html';
    let anchor='start';
    for(let node=navigation.byId.get(active)?.node;node;node=node.parentElement?.closest('[data-nav-id]')){
      const id=node.dataset.navId;
      if(id==='start'){anchor=active;break;}
      if(id==='updates'){route='updates.html';anchor=active;break;}
      if(id==='army-rules'){route='army-rules.html';anchor=active;break;}
      if(id.startsWith('detachment-')){route=id.slice(11)+'.html';anchor=active;break;}
      if(id.startsWith('unit-')){route=id.slice(5)+'.html';anchor=active;break;}
    }
    const destination=new URL('./mobile/'+route,location.href);
    destination.search=params.toString();
    destination.hash=anchor;
    viewSwitch.href=destination.href;
  });

  window.DG_APP=Object.freeze({navigation,popups,fullEntry,journey,relatedRules});
  window.WHPageState?.installArmyBook(window.DG_APP);
  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord)&&returnRecord.popupIds?.length){
    const scope=document.getElementById(returnRecord.unitId)||document;
    const root=[...scope.querySelectorAll('[data-term]')].find(node=>node.dataset.term===returnRecord.rootTerm)||null;
    requestAnimationFrame(()=>{
      window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
      requestAnimationFrame(()=>{
        popups.restore(returnRecord.popupIds,{root,focus:false});
        window.WHGlossaryReturn.clear();
      });
    });
  }

  if((location.protocol==='http:'||location.protocol==='https:')&&'serviceWorker'in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('../../service-worker.js'));
  }
}());
