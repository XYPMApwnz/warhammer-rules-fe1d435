(function(root){
  'use strict';
  const script=document.currentScript,swUrl=script?.dataset.serviceWorker;
  if(!swUrl||!('serviceWorker' in navigator)||!location.protocol.startsWith('http'))return;
  const MESSAGE='WH_OFFLINE_PACKAGE_STATUS',QUERY='WH_OFFLINE_PACKAGE_STATUS_QUERY';
  let node,label,meter,bar,announcement,activeSeen=false,readyTimer=0,lastAnnouncement='';
  function mount(){
    if(node)return node;
    const header=document.querySelector('header.app-header, header.topbar');if(!header)return null;
    header.classList.add('offline-package-host');
    node=document.createElement('div');node.className='offline-package-status';node.dataset.offlinePackageStatus='';node.hidden=true;
    label=document.createElement('span');label.className='offline-package-label';label.setAttribute('aria-hidden','true');
    meter=document.createElement('span');meter.className='offline-package-meter';meter.setAttribute('role','progressbar');meter.setAttribute('aria-label','Offline package download progress');meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');
    bar=document.createElement('i');meter.append(bar);
    announcement=document.createElement('span');announcement.className='offline-package-announcement';announcement.setAttribute('role','status');announcement.setAttribute('aria-live','polite');announcement.setAttribute('aria-atomic','true');
    node.append(label,meter,announcement);header.append(node);return node;
  }
  function announce(text,force=false){if(!announcement||(!force&&text===lastAnnouncement))return;lastAnnouncement=text;announcement.textContent=text;}
  function hide(){if(!node)return;node.classList.remove('is-visible');node.hidden=true;}
  function apply(payload){
    if(!payload||payload.type!==MESSAGE)return;
    const target=mount();if(!target)return;clearTimeout(readyTimer);
    const total=Math.max(0,Number(payload.total)||0),completed=Math.max(0,Math.min(total,Number(payload.completed)||0)),percent=total?Math.round(completed/total*100):0,state=payload.status;
    target.dataset.state=state;target.dataset.revision=payload.revision||'';target.dataset.completed=String(completed);target.dataset.total=String(total);meter.setAttribute('aria-valuenow',String(percent));bar.style.setProperty('--offline-progress',`${percent}%`);
    if(state==='preparing'||state==='updating'){
      activeSeen=true;const prefix=state==='updating'?'Обновление офлайн':'Подготовка офлайн';label.textContent=`${prefix} · ${percent}%`;target.hidden=false;requestAnimationFrame(()=>target.classList.add('is-visible'));if(percent===0||percent===100||percent%10===0)announce(`${prefix}, ${percent} процентов`);return;
    }
    if(state==='ready'){
      if(!activeSeen){hide();return;}
      label.textContent='Готово офлайн ✓';meter.setAttribute('aria-valuenow','100');bar.style.setProperty('--offline-progress','100%');target.hidden=false;requestAnimationFrame(()=>target.classList.add('is-visible'));announce('Готово офлайн',true);readyTimer=setTimeout(hide,1400);return;
    }
    if(state==='error'){activeSeen=true;label.textContent='Офлайн-пакет не готов';target.hidden=false;requestAnimationFrame(()=>target.classList.add('is-visible'));announce('Офлайн-пакет не готов',true);return;}
    hide();
  }
  function query(worker){if(!worker)return;const channel=new MessageChannel();channel.port1.onmessage=event=>apply(event.data);try{worker.postMessage({type:QUERY},[channel.port2]);}catch{}}
  const registrationWorker=registration=>registration?.installing||registration?.waiting||registration?.active||navigator.serviceWorker.controller;
  function observe(registration){const watch=worker=>{if(!worker)return;query(worker);worker.addEventListener('statechange',()=>query(worker));};watch(registrationWorker(registration));registration.addEventListener('updatefound',()=>watch(registration.installing));}
  async function resync(){const registration=await navigator.serviceWorker.getRegistration(),worker=registrationWorker(registration);if(!worker)return false;if(registration)observe(registration);else query(worker);return true;}
  navigator.serviceWorker.addEventListener('message',event=>apply(event.data));
  navigator.serviceWorker.addEventListener('controllerchange',()=>query(navigator.serviceWorker.controller));
  const start=()=>navigator.serviceWorker.register(swUrl).then(observe).catch(async()=>{try{if(await resync())return;}catch{}apply({type:MESSAGE,status:'error',completed:0,total:0,revision:''});});
  if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});
  root.WHOfflineStatus=Object.freeze({query:()=>navigator.serviceWorker.getRegistration().then(registration=>registration&&query(registration.installing||registration.waiting||registration.active))});
})(window);
