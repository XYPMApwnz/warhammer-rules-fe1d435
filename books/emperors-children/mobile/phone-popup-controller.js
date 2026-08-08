(function(root){
  'use strict';

  class PhonePopupState{
    constructor(valid=()=>true){this.valid=valid;this.ids=[];}
    open(id,nested){
      if(!id||!this.valid(id))return false;
      if(!nested){
        if(this.ids.length===1&&this.ids[0]===id)return false;
        this.ids=[id];return true;
      }
      if(this.ids[this.ids.length-1]===id)return false;
      const existing=this.ids.lastIndexOf(id);
      if(existing>=0){this.ids=this.ids.slice(0,existing+1);return true;}
      this.ids.push(id);return true;
    }
    closeFrom(index){
      if(index<0||index>=this.ids.length)return false;
      this.ids=this.ids.slice(0,index);return true;
    }
    restore(ids){
      const restored=[];
      for(const id of Array.isArray(ids)?ids:[]){if(!this.valid(id))break;restored.push(id);}
      this.ids=restored;return this.ids.slice();
    }
    reset(){this.ids=[];}
    snapshot(){return this.ids.slice();}
  }

  class PhonePopupController{
    constructor({dialog,layer,terms,safeFallback}){
      this.dialog=dialog;this.layer=layer;this.terms=terms||{};this.safeFallback=safeFallback;
      this.fallbackTerms=new Map();this.origins=[];this.pendingFocus=null;
      this.state=new PhonePopupState(id=>Boolean(this.term(id)));
      this.bind();
    }
    bind(){
      this.layer.addEventListener('click',event=>{
        const close=event.target.closest('[data-popup-close]');
        if(close){event.preventDefault();this.closeFrom(Number(close.dataset.popupClose));}
      });
      this.dialog.addEventListener('cancel',event=>{
        if(!this.state.ids.length)return;
        event.preventDefault();this.closeFrom(this.state.ids.length-1);
      });
      this.dialog.addEventListener('click',event=>{if(event.target===this.dialog)this.closeFrom(0);});
      this.dialog.addEventListener('close',()=>{
        if(this.state.ids.length){this.pendingFocus=this.resolveOrigin(this.origins[0]);this.state.reset();this.origins=[];this.sync();}
        this.lock(false);this.restoreFocus(this.pendingFocus);this.pendingFocus=null;
      });
    }
    term(id){return this.terms[id]||this.fallbackTerms.get(id)||null;}
    registerFallback(trigger){
      const id=trigger?.dataset?.term,summary=trigger?.dataset?.termSummary;
      if(id&&!this.terms[id]&&summary)this.fallbackTerms.set(id,{id,title:trigger.dataset.termTitle||trigger.textContent.trim()||id,summary,definition:summary,related:[],fullRulePath:trigger.dataset.fullRulePath||''});
    }
    captureOrigin(element,id){
      if(!element)return null;
      const parent=element.closest?.('.mobile-popup-card');
      return parent?{kind:'popup',element,parentIndex:Number(parent.dataset.popupIndex),termId:id}:{kind:'document',element,termId:id};
    }
    resolveOrigin(reference){
      if(reference?.element?.isConnected)return reference.element;
      if(reference?.kind==='popup'){
        const parent=this.layer.querySelector(`.mobile-popup-card[data-popup-index="${reference.parentIndex}"]`);
        return [...(parent?.querySelectorAll('[data-term]')||[])].find(node=>node.dataset.term===reference.termId)||parent||null;
      }
      return null;
    }
    rootElement(){return this.resolveOrigin(this.origins[0]);}
    snapshot(){return this.state.snapshot();}
    open(id,trigger){
      this.registerFallback(trigger);
      const nested=Boolean(trigger?.closest?.('.mobile-popup-card')&&this.layer.contains(trigger));
      const before=this.state.snapshot(),changed=this.state.open(id,nested);
      if(!changed){this.focusTop();return false;}
      if(!nested)this.origins=[this.captureOrigin(trigger,id)];
      else if(this.state.ids.length>before.length)this.origins.push(this.captureOrigin(trigger,id));
      else this.origins=this.origins.slice(0,this.state.ids.length);
      this.openModal();this.sync({focus:true});return true;
    }
    restore(ids,{root=null,focus=true}={}){
      this.registerFallback(root);
      const restored=this.state.restore(ids);
      this.origins=restored.map((id,index)=>index===0?this.captureOrigin(root,id):{kind:'popup',element:null,parentIndex:index-1,termId:id});
      if(!restored.length){this.closeAll({focus:false});return [];}
      this.openModal();this.sync({focus});return restored;
    }
    closeFrom(index,{focus=true}={}){
      if(index<0||index>=this.state.ids.length)return false;
      const reference=this.origins[index],target=this.resolveOrigin(reference);
      this.state.closeFrom(index);this.origins=this.origins.slice(0,index);this.sync();
      if(this.state.ids.length){if(focus)this.restoreFocus(target||this.layer.lastElementChild);return true;}
      this.pendingFocus=focus?(target||this.safeFallback?.()):null;
      if(this.dialog.open)this.dialog.close();else{this.lock(false);this.restoreFocus(this.pendingFocus);this.pendingFocus=null;}
      return true;
    }
    closeAll(options){return this.state.ids.length?this.closeFrom(0,options):false;}
    openModal(){
      this.lock(true);
      if(!this.dialog.open)this.dialog.showModal();
    }
    lock(active){document.documentElement.classList.toggle('phone-popup-open',active);}
    restoreFocus(target){
      const fallback=this.safeFallback?.(),node=target?.isConnected?target:fallback?.isConnected?fallback:null;
      if(node)requestAnimationFrame(()=>{node.scrollIntoView?.({block:'nearest',inline:'nearest',behavior:'instant'});node.focus({preventScroll:true});});
    }
    focusTop(){const card=this.layer.lastElementChild;if(card){card.scrollIntoView({block:'start',inline:'nearest',behavior:'instant'});card.focus({preventScroll:true});}}
    explicitRuleAction(origin){
      const path=origin?.dataset?.mobileRulePath||origin?.dataset?.fullRulePath;
      if(!path)return null;
      const destination=new URL(root.WHGlossaryReturn.href(path));
      if(origin.dataset.mobileRulePath)destination.search=location.search;
      return{label:'Open full rule',href:destination.href};
    }
    ruleActions(term,index){
      const explicit=this.explicitRuleAction(this.resolveOrigin(this.origins[index]));
      if(explicit)return[explicit];
      return(root.WHPopupRuleActions?.resolve(term,{resolveHref:path=>root.WHGlossaryReturn.href(path)})||[]).map(action=>{
        if(action.href)return action;
        if(!action.target||!document.getElementById(action.target))return null;
        const destination=new URL(location.href);destination.hash=action.target;
        return{...action,href:destination.href};
      }).filter(Boolean);
    }
    rememberMegaReturn(){
      const rootTrigger=this.rootElement(),triggers=[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')];
      root.WHGlossaryReturn?.save({popupIds:this.snapshot(),rootTerm:this.state.ids[0]||'',triggerIndex:rootTrigger?triggers.indexOf(rootTrigger):-1});
    }
    createCard(id,index){
      const term=this.term(id),card=document.createElement('section'),titleId=`phone-popup-title-${index}`;
      card.className='mobile-popup-card';card.dataset.popupTerm=id;card.dataset.popupIndex=String(index);card.tabIndex=-1;
      card.setAttribute('role','dialog');card.setAttribute('aria-modal','false');card.setAttribute('aria-labelledby',titleId);
      const head=document.createElement('header'),kicker=document.createElement('span'),close=document.createElement('button');
      head.className='mobile-popup-card-head';kicker.textContent=index?'Related term':'Mega Glossary';close.type='button';close.dataset.popupClose=String(index);close.setAttribute('aria-label',`Close ${term.title} popup`);close.textContent='\u00d7';head.append(kicker,close);
      const title=document.createElement('h2');title.id=titleId;title.textContent=term.title||id;
      const rendered=root.WHPopupContent?.render(term,this.terms),content=rendered?.node||document.createElement('p');
      if(!rendered)content.textContent=term.kind==='stratagem'?term.definition:term.summary;
      card.classList.add(...(rendered?.classes||[]));card.append(head,title,content);
      root.WHGlossaryAutolink?.apply(card);
      const related=(term.related||[]).filter(relatedId=>relatedId!==id&&this.term(relatedId));
      if(related.length){
        const paragraph=document.createElement('p');paragraph.className='mobile-popup-related';paragraph.append('Related: ');
        related.forEach((relatedId,relatedIndex)=>{if(relatedIndex)paragraph.append(', ');const button=document.createElement('button');button.type='button';button.className='term-button';button.dataset.term=relatedId;button.dataset.popupRelated='true';button.textContent=this.term(relatedId).title;paragraph.append(button);});
        card.append(paragraph);
      }
      const actions=this.ruleActions(term,index),group=document.createElement('div');group.className='mobile-popup-actions';group.setAttribute('aria-label','Popup destinations');
      for(const action of actions){const link=document.createElement('a');link.className='popup-action';link.href=action.href;link.textContent=action.label;group.append(link);}
      const glossary=document.createElement('a');glossary.className='popup-action';glossary.dataset.megaGlossary='true';glossary.href=`../../../glossary/index.html#${encodeURIComponent(id)}`;glossary.textContent='Glossary entry';glossary.addEventListener('click',()=>this.rememberMegaReturn());group.append(glossary);card.append(group);
      return card;
    }
    sync({focus=false}={}){
      const cards=[...this.layer.children];let prefix=0;
      while(prefix<cards.length&&prefix<this.state.ids.length&&cards[prefix].dataset.popupTerm===this.state.ids[prefix])prefix++;
      for(let index=cards.length-1;index>=prefix;index--)cards[index].remove();
      for(let index=prefix;index<this.state.ids.length;index++)this.layer.append(this.createCard(this.state.ids[index],index));
      if(focus)this.focusTop();
    }
  }

  root.ECPhonePopupState=PhonePopupState;
  root.ECPhonePopups=PhonePopupController;
}(window));
