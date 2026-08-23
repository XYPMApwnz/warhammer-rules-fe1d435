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

  function logicalOwnerAnchor(element){
    const ownerId=element?.id,card=element?.closest?.('.unit-card');
    if(!ownerId||!card)return null;
    return [...card.querySelectorAll('[data-logical-owner]')].find(node=>node.isConnected&&node.dataset.logicalOwner===ownerId)||null;
  }

  function resolve(element){
    if(!element)return{scrollTarget:null,highlightTarget:null,kind:'missing'};
    if(element.matches?.(CARD_SELECTOR))return{scrollTarget:element,highlightTarget:element,kind:'card'};
    const ownerAnchor=logicalOwnerAnchor(element);
    if(ownerAnchor)return{scrollTarget:ownerAnchor,highlightTarget:element,kind:'logical-section'};
    const heading=directHeading(element);
    if(heading)return{scrollTarget:heading,highlightTarget:heading,kind:'section'};
    return{scrollTarget:element,highlightTarget:element,kind:'element'};
  }

  class Highlighter{
    constructor({className='destination-highlight',duration=2300}={}){
      this.className=className;
      this.duration=duration;
      this.current=null;
      this.timer=0;
    }

    clear(){
      if(this.timer)window.clearTimeout(this.timer);
      this.timer=0;
      this.current?.classList.remove(this.className);
      this.current=null;
    }

    show(target){
      this.clear();
      if(!target)return;
      target.classList.remove(this.className);
      void target.offsetWidth;
      target.classList.add(this.className);
      this.current=target;
      this.timer=window.setTimeout(()=>{
        if(this.current!==target)return;
        target.classList.remove(this.className);
        this.current=null;
        this.timer=0;
      },this.duration);
    }
  }

  window.WHNavigationTargets=Object.freeze({resolve,Highlighter});
}());
