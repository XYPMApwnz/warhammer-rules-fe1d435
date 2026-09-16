(() => {
  const frame=document.querySelector('#production-sheet');
  const toggle=document.querySelector('[data-mode-toggle]');
  const css=`@media (max-width:480px){.section-title{font-size:34px!important}.unit-part{padding-top:20px!important}}`; 
  let style;
  function apply(){if(!frame.contentDocument)return;if(style)style.remove();if(document.documentElement.dataset.mode==='experimental'){style=frame.contentDocument.createElement('style');style.textContent=css;frame.contentDocument.head.appendChild(style);toggle.textContent='Experimental spacing'}else toggle.textContent='Experimental spacing'}
  frame.addEventListener('load',apply);toggle.disabled=false;toggle.addEventListener('click',()=>{document.documentElement.dataset.mode=document.documentElement.dataset.mode==='experimental'?'current':'experimental';apply()});
})();


