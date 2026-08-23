(function (root) {
  'use strict';

  function resolve(){
    const requested=new URLSearchParams(location.search).get('view');
    const explicit=requested==='mobile'||requested==='full'?requested:'';
    const phoneUserAgent=navigator.userAgentData?.mobile===true||/iPhone|iPod|Android.+Mobile/i.test(navigator.userAgent);
    const smallTouchScreen=matchMedia('(pointer: coarse)').matches&&Math.min(screen.width,screen.height)<=600;
    return explicit||(phoneUserAgent||smallTouchScreen||matchMedia('(max-width: 600px)').matches?'mobile':'full');
  }
  root.WHArmyBookView=Object.freeze({resolve});
  if(document.currentScript?.hasAttribute('data-view-mode-only'))return;
  const view=resolve();
  const destination = new URL('./reader.html', location.href);
  const params = new URLSearchParams(location.search);
  params.set('view', view);
  destination.search = params.toString();
  destination.hash = location.hash;
  location.replace(destination);
}(window));
