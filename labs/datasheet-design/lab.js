(() => {
  const frame=document.querySelector('#production-sheet');
  const toggle=document.querySelector('[data-mode-toggle]');
  const css=`.section-title{font-size:clamp(28px,8vw,34px)!important}body{font-size:16.5px!important;line-height:1.45!important}.unit-part{padding-top:20px!important}.ability-list{gap:6px!important}.app-header{height:calc(58px + env(safe-area-inset-top))!important}.local-tab{font-size:12px!important;padding:5px 8px!important;min-height:32px!important}.points{padding:8px 12px!important}`;
  let style;
  function apply(){if(!frame.contentDocument)return;if(style)style.remove();if(document.documentElement.dataset.mode==='experimental'){style=frame.contentDocument.createElement('style');style.textContent=css;frame.contentDocument.head.appendChild(style);toggle.textContent='Experimental spacing'}else toggle.textContent='Experimental spacing'}
  frame.addEventListener('load',apply);toggle.disabled=false;toggle.addEventListener('click',()=>{document.documentElement.dataset.mode=document.documentElement.dataset.mode==='experimental'?'current':'experimental';apply()});
})();
