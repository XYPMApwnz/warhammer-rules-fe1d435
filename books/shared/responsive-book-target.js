(function(){
  'use strict';

  class ResponsiveBookTarget{
    constructor(){
      this.root=document.querySelector('#main .document');
      if(!this.root)return;
      this.frame=0;
      this.pendingTarget='';
      this.bind();
      this.observer=new MutationObserver(()=>this.schedule());
      this.observer.observe(this.root,{childList:true,subtree:true});
      this.apply();
    }

    get mobile(){return window.innerWidth<=(window.DG_APP?.navigation?.breakpoint??800);}

    bind(){
      document.addEventListener('click',event=>{
        const control=event.target.closest('[data-nav-target],[data-journey-target]');
        if(!control||!this.mobile)return;
        const id=control.dataset.navTarget||control.dataset.journeyTarget||'';
        if(!document.getElementById(id))return;
        if(control.hasAttribute('data-nav-target'))this.pushTarget(id);
        this.apply(id);
      },true);
      window.addEventListener('hashchange',()=>this.schedule());
      window.addEventListener('popstate',()=>{
        this.apply();
        requestAnimationFrame(()=>window.DG_APP?.navigation?.scheduleHashRestore?.());
      });
      window.addEventListener('resize',()=>this.schedule(),{passive:true});
      window.addEventListener('pageshow',()=>this.schedule());
      window.addEventListener('load',()=>this.schedule(),{once:true});
    }

    pushTarget(id){
      if(location.hash==='#'+id)return;
      const destination=new URL(location.href);
      destination.hash=id;
      history.pushState({...history.state,whResponsiveTarget:id},'',destination.href);
    }

    schedule(id=''){
      if(id)this.pendingTarget=id;
      if(this.frame)return;
      this.frame=requestAnimationFrame(()=>{
        this.frame=0;
        const target=this.pendingTarget;
        this.pendingTarget='';
        this.apply(target);
      });
    }

    restore(){
      for(const element of this.root.querySelectorAll('[data-responsive-book-hidden]')){
        element.hidden=false;
        element.removeAttribute('data-responsive-book-hidden');
      }
      this.root.removeAttribute('data-responsive-active-target');
      document.documentElement.classList.remove('responsive-book-card-mode');
    }

    target(id=''){
      const hash=id||decodeURIComponent(location.hash.slice(1));
      const target=document.getElementById(hash);
      if(target&&this.root.contains(target))return target;
      const active=document.getElementById(window.DG_APP?.navigation?.active||'');
      if(active&&this.root.contains(active))return active;
      return document.getElementById('start')||this.root.querySelector('[data-track]')||this.root.firstElementChild;
    }

    card(target){
      return target.closest('.unit-card,.roster-card,.enhancement,.stratagem,.rule-card,.glossary-card')||target;
    }

    hide(element){
      if(element.hidden)return;
      element.hidden=true;
      element.setAttribute('data-responsive-book-hidden','');
    }

    apply(id=''){
      this.restore();
      if(!this.mobile)return;
      const target=this.target(id);
      if(!target)return;
      const card=this.card(target);
      for(let current=card;current&&current!==this.root;current=current.parentElement){
        const parent=current.parentElement;
        if(!parent)break;
        for(const sibling of parent.children)if(sibling!==current)this.hide(sibling);
      }
      document.documentElement.classList.add('responsive-book-card-mode');
      this.root.dataset.responsiveActiveTarget=card.id||target.id;
      window.DG_APP?.navigation?.scheduleGeometry?.();
    }
  }

  const start=()=>{if(!window.WHResponsiveBookTarget)window.WHResponsiveBookTarget=new ResponsiveBookTarget();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}());
