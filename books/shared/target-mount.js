(function(root){
  'use strict';
  const catalog=root.WH_ARMY_BOOK_TARGETS,host=document.querySelector('.document');
  if(!catalog||catalog.schema!=='wh40k-army-book-targets/v1'||!host)throw new Error('Canonical Army Book target catalog is unavailable.');
  const mode=root.WHArmyBookView?.resolve?.()||'full',phone=mode==='mobile',nodesById=new Map(catalog.nodes.map(node=>[node.id,node]));
  const metrics={mode,fullDocumentConstructed:!phone,parsedTargetCount:0,mountCount:0,maxLiveTargetOwners:0};
  let current='';
  document.documentElement.toggleAttribute('data-phone-single-target',phone);
  if(phone)document.documentElement.dataset.view='mobile';else document.documentElement.removeAttribute('data-view');

  const canonicalId=value=>{const id=decodeURIComponent(String(value||'').replace(/^#/,''));if(catalog.owners[id])return id;const separator=id.indexOf('--');return separator>0&&catalog.owners[id.slice(0,separator)]?id.slice(0,separator):id;};
  const resolve=value=>{const requestedId=canonicalId(value),node=nodesById.get(requestedId)||null,ownerId=catalog.owners[requestedId]||null;return{requestedId,node,ownerId,kind:node?.kind||(ownerId?'target':null)};};
  const liveOwners=()=>Object.keys(catalog.targets).filter(id=>document.getElementById(id)).length;

  function ensure(value,{instanceId=''}={}){
    const resolved=resolve(value);
    if(!resolved.ownerId)return null;
    const owner=document.getElementById(resolved.ownerId);
    if(!phone){
      if(!instanceId)return document.getElementById(resolved.requestedId)||owner||null;
      if(owner?.dataset.rosterInstance===instanceId&&!owner.hidden)return document.getElementById(resolved.requestedId)||owner;
      if(owner?.dataset.rosterInstance===instanceId){root.dispatchEvent(new CustomEvent('wh-army-target-mounted',{detail:{root:host,element:owner,target:resolved.requestedId,mountOwnerId:resolved.ownerId,previous:resolved.ownerId,instanceId,reused:true}}));return document.getElementById(resolved.requestedId)||owner;}
    }else if(current===resolved.ownerId&&(!instanceId||owner?.dataset.rosterInstance===instanceId))return document.getElementById(resolved.requestedId)||owner||null;
    const target=catalog.targets[resolved.ownerId];if(!target)throw new Error(`Canonical mount owner is missing: ${resolved.ownerId}`);
    const previous=current,fragment=catalog.html.slice(target.start,target.end),template=document.createElement('template');
    root.dispatchEvent(new CustomEvent('wh-army-target-before-mount',{detail:{previous,target:resolved.ownerId,instanceId}}));
    template.innerHTML=fragment;
    if(template.content.children.length!==1)throw new Error(`Canonical target fragment must have one root: ${resolved.ownerId}`);
    if(phone){host.replaceChildren(template.content);current=resolved.ownerId;document.documentElement.dataset.mountedTarget=current;}else owner?.replaceWith(template.content);
    metrics.parsedTargetCount+=1;metrics.mountCount+=1;metrics.maxLiveTargetOwners=Math.max(metrics.maxLiveTargetOwners,liveOwners());
    const element=document.getElementById(resolved.requestedId)||document.getElementById(resolved.ownerId);
    root.dispatchEvent(new CustomEvent('wh-army-target-mounted',{detail:{root:host,element,target:resolved.requestedId,mountOwnerId:resolved.ownerId,previous,instanceId}}));
    return element;
  }

  if(phone){
    const requested=(root.WHPageState?.initialHash?.()||location.hash).slice(1)||catalog.defaultTargetId;
    if(!ensure(requested))ensure(catalog.defaultTargetId);
  }else host.innerHTML=catalog.html;

  root.WHArmyBookTargetMount=Object.freeze({catalog,host,mode,phone,metrics,resolve,ensure,isBranch:id=>nodesById.get(canonicalId(id))?.kind==='branch',get current(){return current||catalog.defaultTargetId;}});
}(window));
