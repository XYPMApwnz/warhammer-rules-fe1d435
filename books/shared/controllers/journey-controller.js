(function(){
  'use strict';

  class JourneyController{
    constructor(navigation,popups,glossary=null,overlay=null){
      this.navigation=navigation;
      this.popups=popups;
      this.overlay=overlay;
      this.history=[];
      this.records=new Map();
      this.restoreQueue=Promise.resolve();
      this.sequence=0;
      this.backButton=document.getElementById('backButton');
      document.addEventListener('click',event=>{
        const trigger=event.target.closest('[data-journey-target]');
        if(trigger){event.preventDefault();this.start(trigger,trigger.dataset.journeyTarget,trigger.dataset.journeyType||'link');}
      });
      this.backButton.addEventListener('click',()=>this.back());
      window.addEventListener('wh-navigation-popstate',event=>this.onPopState(event.detail));
      window.addEventListener('wh-navigation-commit',()=>{this.history=[];this.backButton.hidden=true;});
    }

    ensureId(element,prefix){if(!element.id)element.id=prefix+'-'+(++this.sequence);return element.id;}
    async start(trigger,targetId,type){
      if(!this.navigation.canResolveTarget(targetId))return;
      const triggerId=this.ensureId(trigger,'journey-trigger');
      const root=this.popups.rootElement();if(root)this.ensureId(root,'journey-popup-root');
      const overlay=this.overlay?.snapshot?.(root)||null;
      const popupCard=trigger.closest('.term-popup');
      const token='journey-'+(++this.sequence),parentToken=history.state?.whJourney||null;
      const record={
        token,
        parentToken,
        triggerId,
        scrollY:window.scrollY,
        navId:this.navigation.active,
        popupIds:this.popups.snapshot(),
        popupRootId:root?.id||'',
        overlay,
        popupAction:popupCard?{
          level:Number(popupCard.dataset.popupIndex),
          key:trigger.dataset.actionKey||'',
          target:targetId,
          type:trigger.dataset.journeyType||''
        }:null,
        type
      };
      this.records.set(token,record);
      this.history=[...(this.chainFor(parentToken)||[]),record];
      const destination=new URL(location.href),state={...history.state,whJourney:token,whJourneyTarget:targetId};
      destination.hash=targetId;
      this.navigation.pushHistoryState(state,destination.href);
      this.backButton.hidden=false;
      if(overlay)this.overlay.close();
      this.popups.restore([],{focus:false});
      await this.navigation.ensureTarget(targetId);
      const target=document.getElementById(targetId);if(!target)return;
      const unit=target.closest('.unit-card');
      this.navigation.navigate(unit?.id||targetId,target);
    }

    findRestoredAction(action){
      if(!action)return null;
      const card=this.popups.layer.querySelector('.term-popup[data-popup-index="'+action.level+'"]');
      if(!card)return null;
      const buttons=[...card.querySelectorAll('[data-journey-target]')];
      return buttons.find(button=>button.dataset.actionKey===action.key)||buttons.find(button=>button.dataset.journeyTarget===action.target&&button.dataset.journeyType===action.type)||null;
    }
    highlight(element){
      if(!element)return;
      element.classList.remove('return-highlight');void element.offsetWidth;element.classList.add('return-highlight');
      window.setTimeout(()=>element.classList.remove('return-highlight'),2300);
    }
    chainFor(token){
      const chain=[],seen=new Set();let current=token;
      while(current){
        if(seen.has(current))return null;seen.add(current);
        const record=this.records.get(current);if(!record)return null;
        chain.unshift(record);current=record.parentToken;
      }
      return chain;
    }
    queueTask(task){
      const run=()=>Promise.resolve().then(task);
      this.restoreQueue=this.restoreQueue.then(run,run);
      return this.restoreQueue;
    }
    clearTransient(){
      this.overlay?.close?.({restoreFocus:false});
      this.popups.restore([],{focus:false});
    }
    onPopState(detail){
      const token=detail.state?.whJourney||null;
      const next=this.chainFor(token)||[];
      let common=0;
      while(common<this.history.length&&common<next.length&&this.history[common].token===next[common].token)common++;
      const popped=this.history.slice(common).reverse(),pushed=next.slice(common);
      this.history=next;
      if(detail.direction==='back'&&popped.length){
        for(const record of popped){
          if(!detail.state?.whJourneyTarget)detail.restore={id:record.navId,scrollY:record.scrollY};
          this.queueRecordRestore(record,{navigate:false});
        }
      }else if(detail.direction==='forward'&&(popped.length||pushed.length)){
        this.queueTask(()=>this.clearTransient());
      }else if(detail.direction==='back'&&pushed.length){
        this.queueTask(()=>this.clearTransient());
      }
      this.backButton.hidden=!token;
    }
    back(){
      const record=this.history[this.history.length-1];if(!record)return;
      if(history.state?.whJourney===record.token){history.back();return;}
      this.restoreLast();
    }
    restoreLast({navigate=true}={}){
      const record=this.history.pop();if(!record)return;
      this.backButton.hidden=this.history.length===0;
      return this.queueRecordRestore(record,{navigate});
    }
    queueRecordRestore(record,{navigate=true}={}){
      return this.queueTask(async()=>{
        if(navigate)await new Promise(resolve=>this.navigation.restore(record.navId,record.scrollY,resolve));
        else await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        const popupRoot=record.overlay?await this.overlay?.restore?.(record.overlay):document.getElementById(record.popupRootId||record.triggerId);
        this.popups.restore(record.popupIds,{root:popupRoot,focus:false});
        this.popups.reposition();
        const trigger=document.getElementById(record.triggerId)||this.findRestoredAction(record.popupAction);
        const restoredPopup=trigger?.closest?.('.term-popup');
        this.highlight(restoredPopup||trigger);
        if(trigger)trigger.focus({preventScroll:true});else if(record.popupIds.length)this.popups.focusTop();
      });
    }
  }

  window.DGJourney=JourneyController;
}());
