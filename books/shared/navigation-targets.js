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
    const candidates=[...owned,element],members=candidates.filter(node=>!candidates.some(parent=>parent!==node&&parent.contains(node)));
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
      this.current.forEach(target=>target.classList.remove(this.className));
      this.current=[];
    }

    show(target){
      this.clear();
      const targets=(Array.isArray(target)?target:[target]).filter(item=>item?.classList);
      if(!targets.length)return;
      targets.forEach(item=>item.classList.remove(this.className));
      void targets[0].offsetWidth;
      targets.forEach(item=>item.classList.add(this.className));
      this.current=targets;
      this.timer=window.setTimeout(()=>{
        if(this.current!==targets)return;
        targets.forEach(item=>item.classList.remove(this.className));
        this.current=[];
        this.timer=0;
      },this.duration);
    }
  }

  window.WHNavigationTargets=Object.freeze({resolve,Highlighter});
}());
