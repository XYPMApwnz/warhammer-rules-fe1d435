(function(){
  'use strict';

  const CARD_SELECTOR='.glossary-card,.rule-card,.enhancement,.unit-card,.ability,.stratagem,.roster-card';
  const HEADING_SELECTOR='.section-title,.category-title,.detachment-part-title,h1,h2,h3,h4,h5,h6';

  function directHeading(element){
    if(!element?.children)return null;
    for(const child of element.children){
      if(child.matches?.(HEADING_SELECTOR))return child;
    }
    return null;
  }

  function logicalOwnerTarget(element){
    const ownerId=element?.id,card=element?.closest?.('.unit-card');
    if(!ownerId||!card)return null;
    const owned=[...card.querySelectorAll('[data-logical-owner]')].filter(node=>node.isConnected&&node.dataset.logicalOwner===ownerId);
    if(!owned.length)return null;
    const members=[...owned.filter(node=>!owned.some(child=>child!==node&&node.contains(child))),element];
    return{anchor:owned[0],members};
  }

  function resolve(element){
    if(!element)return{scrollTarget:null,highlightTarget:null,kind:'missing'};
    if(element.matches?.(CARD_SELECTOR))return{scrollTarget:element,highlightTarget:element,kind:'card'};
    const logicalTarget=logicalOwnerTarget(element);
    if(logicalTarget)return{scrollTarget:logicalTarget.anchor,highlightTarget:logicalTarget.members,kind:'logical-section'};
    const heading=directHeading(element);
    if(heading)return{scrollTarget:heading,highlightTarget:heading,kind:'section'};
    return{scrollTarget:element,highlightTarget:element,kind:'element'};
  }

  class Highlighter{
    constructor({className='destination-highlight',duration=2300}={}){
      this.className=className;
      this.duration=duration;
      this.current=[];
      this.timer=0;
    }

    clear(){
      if(this.timer)window.clearTimeout(this.timer);
      this.timer=0;
      this.current.forEach(target=>{
        target.classList.remove(this.className);
        if(target.dataset.navigationHighlightRange==='true')target.remove();
      });
      this.current=[];
    }

    range(targets){
      const rects=targets.filter(target=>target.isConnected).map(target=>target.getBoundingClientRect()).filter(rect=>rect.width&&rect.height);
      if(!rects.length)return null;
      const left=Math.min(...rects.map(rect=>rect.left))+window.scrollX,top=Math.min(...rects.map(rect=>rect.top))+window.scrollY;
      const right=Math.max(...rects.map(rect=>rect.right))+window.scrollX,bottom=Math.max(...rects.map(rect=>rect.bottom))+window.scrollY;
      const range=document.createElement('div');
      range.className='logical-destination-highlight';
      range.dataset.navigationHighlightRange='true';
      range.setAttribute('aria-hidden','true');
      Object.assign(range.style,{position:'absolute',pointerEvents:'none',boxSizing:'border-box',zIndex:'7',left:`${left}px`,top:`${top}px`,width:`${Math.max(1,right-left)}px`,height:`${Math.max(1,bottom-top)}px`});
      document.body.append(range);
      return range;
    }

    show(target){
      this.clear();
      const targets=(Array.isArray(target)?target:[target]).filter(item=>item?.classList);
      if(!targets.length)return;
      const visual=targets.length>1?this.range(targets):targets[0];
      if(!visual)return;
      visual.classList.remove(this.className);
      void visual.offsetWidth;
      visual.classList.add(this.className);
      const current=[visual];
      this.current=current;
      this.timer=window.setTimeout(()=>{
        if(this.current!==current)return;
        this.clear();
      },this.duration);
    }
  }

  window.WHNavigationTargets=Object.freeze({resolve,Highlighter});
}());
