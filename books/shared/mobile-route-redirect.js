(function(){
  'use strict';
  const root=document.documentElement;
  const reader=root.dataset.canonicalReader;
  if(!reader)return;
  const destination=new URL(reader,location.href);
  destination.search=location.search;
  destination.searchParams.delete('view');
  destination.hash=location.hash||root.dataset.canonicalTarget||'';
  if(destination.href!==location.href)location.replace(destination.href);
}());
