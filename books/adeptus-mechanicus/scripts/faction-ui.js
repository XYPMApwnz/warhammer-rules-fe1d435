(function(){
  'use strict';

  class DoctrinaController{
    constructor(){
      if(window.AM_DOCTRINA_CONTROLLER){window.AM_DOCTRINA_CONTROLLER.refresh();return window.AM_DOCTRINA_CONTROLLER;}
      window.AM_DOCTRINA_CONTROLLER=this;
      document.addEventListener('click',event=>{
        const destination=event.target.closest?.('[data-protocol],[data-nav-target],[data-journey-target]');
        const target=destination?.dataset.protocol||destination?.dataset.navTarget||destination?.dataset.journeyTarget;
        if(target==='protector'||target==='conqueror')this.set(target);
        if(target==='protector-imperative')this.set('protector');
        if(target==='conqueror-imperative')this.set('conqueror');
      },true);
      this.refresh();
    }
    refresh(){
      this.buttons=[...document.querySelectorAll('[data-protocol]')];
      this.panels={protector:document.getElementById('protector-imperative'),conqueror:document.getElementById('conqueror-imperative')};
      this.set('conqueror');
    }
    set(protocol){
      this.buttons.forEach(button=>{
        const active=button.dataset.protocol===protocol;
        button.classList.toggle('active',active);
        button.setAttribute('aria-pressed',String(active));
      });
      Object.entries(this.panels).forEach(([id,panel])=>{if(panel)panel.hidden=id!==protocol;});
      window.DG_APP?.navigation?.scheduleGeometry?.();
    }
  }

  window.AMDoctrina=DoctrinaController;
}());
