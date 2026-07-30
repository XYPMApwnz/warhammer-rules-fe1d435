(function(root){
  'use strict';
  const focusable='button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function create(layer,onEscape){
    let origin=null,inerted=[];
    const visible=()=>[...layer.querySelectorAll(focusable)].filter(node=>!node.hidden&&node.getClientRects().length);
    const keydown=event=>{
      if(layer.hidden)return;
      if(event.key==='Escape'){event.preventDefault();onEscape();return;}
      if(event.key!=='Tab')return;
      const items=visible();if(!items.length){event.preventDefault();return;}
      const first=items[0],last=items.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',keydown);
    return{
      activate(trigger){
        origin=trigger?.isConnected?trigger:document.activeElement;
        inerted=[...document.body.children].filter(node=>node!==layer&&!node.matches('.popup-layer,.full-entry-layer')&&!node.inert);
        inerted.forEach(node=>{node.inert=true;});
      },
      deactivate({restore=true}={}){
        inerted.forEach(node=>{node.inert=false;});inerted=[];
        const target=origin;origin=null;
        if(restore&&target?.isConnected)target.focus({preventScroll:true});
      },
      focusFirst(){(visible()[0]||layer.querySelector('[role="dialog"]'))?.focus?.();}
    };
  }
  root.WHModalFocus=Object.freeze({create});
}(window));
