(() => {
  const frame=document.querySelector('#production-sheet');
  const toggle=document.querySelector('[data-mode-toggle]');
  const css=`@media (max-width:480px){html[data-lab-mode="experimental"] .section-title{font-size:34px!important}html[data-lab-mode="experimental"] .unit-part{padding-top:20px!important}}`;
  let style;
  function apply(){const doc=frame.contentDocument;if(!doc)return;doc.documentElement.dataset.labMode=document.documentElement.dataset.mode;if(style)style.remove();style=doc.createElement('style');style.textContent=css;doc.head.appendChild(style);toggle.textContent=document.documentElement.dataset.mode==='experimental'?'Current spacing':'Experimental spacing'}
  frame.addEventListener('load',apply);setTimeout(apply,0);toggle.disabled=false;toggle.addEventListener('click',()=>{document.documentElement.dataset.mode=document.documentElement.dataset.mode==='experimental'?'current':'experimental';apply()});
})();

