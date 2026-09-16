(() => {
  const frame=document.querySelector('#production-sheet');
  const toggle=document.querySelector('[data-mode-toggle]');
  const css=`@media (max-width:480px){.unit-card > .unit-part{padding-top:16px!important;padding-bottom:18px!important}.unit-card > .unit-part > h4{font-size:20px!important;margin-bottom:10px!important}}`; 
  let style;
  function apply(){const doc=frame.contentWindow?.document;if(!doc)return;const mode=document.documentElement.dataset.mode;doc.documentElement.setAttribute('data-lab-mode',mode);if(style)style.remove();style=doc.createElement('style');style.textContent=css;doc.head.appendChild(style);toggle.textContent=mode==='experimental'?'Current spacing':'Experimental spacing'}
  frame.addEventListener('load',apply);setTimeout(apply,0);toggle.disabled=false;toggle.addEventListener('click',()=>{document.documentElement.dataset.mode=document.documentElement.dataset.mode==='experimental'?'current':'experimental';apply()});
})();



