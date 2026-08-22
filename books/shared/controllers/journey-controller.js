(function(){
  'use strict';

  class JourneyController{
    constructor(navigation,popups,glossary=null,overlay=null){
      this.navigation=navigation;
      this.popups=popups;
      this.overlay=overlay;
      this.history=[];
      this.sequence=0;
      this.restoring=false;
      this.backButton=document.getElementById('backButton');
      document.addEventListener('click',event=>{
        const trigger=event.target.closest('[data-journey-target]');
        if(trigger){event.preventDefault();this.start(trigger,trigger.dataset.journeyTarget,trigger.dataset.journeyType||'link');}
      });
      this.backButton.addEventListener('click',()=>this.back());
      window.addEventListener('popstate',event=>this.onPopState(event));
    }

    ensureId(element,prefix){if(!element.id)element.id=prefix+'-'+(++this.sequence);return element.id;}
    start(trigger,targetId,type){
      const target=document.getElementById(targetId);if(!target)return;
      const triggerId=this.ensureId(trigger,'journey-trigger');
      const root=this.popups.rootElement();if(root)this.ensureId(root,'journey-popup-root');
      const overlay=this.overlay?.snapshot?.(root)||null;
      const popupCard=trigger.closest('.term-popup');
      const token='journey-'+(++this.sequence);
      this.history.push({
        token,
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
      });
      const destination=new URL(location.href),state={...history.state,whJourney:token};
      if(type==='datasheet'){destination.hash=targetId;state.whJourneyTarget=targetId;}
      history.pushState(state,'',destination.href);
      this.backButton.hidden=false;
      if(overlay)this.overlay.close();
      this.popups.restore([],{focus:false});
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
    onPopState(event){
      const record=this.history[this.history.length-1];
    if(event.state?.whJourneyTarget){this.navigation.scheduleHashRestore();return;}
    const token=event.state?.whJourney,index=token?this.history.findIndex(item=>item.token===token):-1;
    if(record&&token!==record.token&&(!token||index>=0))this.restoreLast();
    }
    back(){
      const record=this.history[this.history.length-1];if(!record)return;
      if(history.state?.whJourney===record.token){history.back();return;}
      this.restoreLast();
    }
    async restoreLast(){
      if(this.restoring)return;
      const record=this.history.pop();if(!record)return;
      this.restoring=true;
      this.backButton.hidden=this.history.length===0;
      await new Promise(resolve=>this.navigation.restore(record.navId,record.scrollY,resolve));
        const popupRoot=record.overlay?await this.overlay?.restore?.(record.overlay):document.getElementById(record.popupRootId||record.triggerId);
        this.popups.restore(record.popupIds,{root:popupRoot,focus:false});
        this.popups.reposition();
        const trigger=document.getElementById(record.triggerId)||this.findRestoredAction(record.popupAction);
        const restoredPopup=trigger?.closest?.('.term-popup');
        this.highlight(restoredPopup||trigger);
        if(trigger)trigger.focus({preventScroll:true});else if(record.popupIds.length)this.popups.focusTop();
        this.restoring=false;
    }
  }

  window.DGJourney=JourneyController;
}());
