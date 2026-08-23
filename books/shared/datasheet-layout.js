(function(){
  'use strict';

  const direct=(root,selector)=>Array.from(root.children).find(node=>node.matches?.(selector))||null;
  const directParts=card=>Array.from(card.children).filter(node=>node.matches?.('.unit-part'));
  let layouts=[];
  const layoutByCard=new WeakMap();
  let layoutFrame=0;
  let observer=null;

  function buildIdentity(head,keywordPart){
    const primary=head?.firstElementChild;
    const keywordList=keywordPart?.querySelector('.keyword-list');
    const keywords=keywordList?Array.from(keywordList.children):Array.from(keywordPart?.querySelectorAll('.term-button[data-term]')||[]);
    if(!primary||!keywords.length||primary.querySelector('.ds-identity'))return;
    const identity=document.createElement('div');
    identity.className='ds-identity';
    keywords.slice(0,5).forEach(keyword=>{
      const label=document.createElement('span');
      label.textContent=keyword.textContent.trim();
      identity.append(label);
    });
    if(identity.children.length)primary.append(identity);
  }

  function buildCost(head,pointsPanel){
    const cost=head?.querySelector('.points,.unit-status');
    if(!cost||!pointsPanel)return;
    const rows=Array.from(pointsPanel.children).filter(node=>node.classList.contains('points-row'));
    const mainRows=rows.filter(row=>!row.classList.contains('points-option'));
    const optionRows=rows.filter(row=>row.classList.contains('points-option'));
    if(!mainRows.length)return;

    cost.textContent='';
    cost.classList.add('ds-cost');
    const grid=document.createElement('div');
    grid.className='ds-cost-grid';
    mainRows.forEach(row=>{
      const cell=document.createElement('div');
      cell.className='ds-cost-cell';
      const label=document.createElement('small');
      label.textContent=row.querySelector('span')?.textContent.trim()||'Unit';
      const value=document.createElement('strong');
      value.textContent=row.querySelector('strong')?.textContent.trim()||'';
      cell.append(label,value);
      grid.append(cell);
    });
    cost.append(grid);

    if(optionRows.length){
      const extras=document.createElement('div');
      extras.className='ds-surcharges';
      optionRows.forEach(row=>{
        const item=document.createElement('span');
        const value=row.querySelector('strong')?.cloneNode(true);
        const label=row.querySelector('span')?.cloneNode(true);
        if(value)item.append(value);
        if(label)item.append(label);
        extras.append(item);
      });
      cost.append(extras);
    }
    pointsPanel.remove();
  }

  function moveProfiles(card,profile,localNav){
    if(!profile||!localNav)return;
    const profiles=Array.from(profile.children).filter(node=>node.matches('.model-profile,.statline,.profile-base'));
    if(!profiles.length)return;
    const strip=document.createElement('div');
    strip.className='ds-profile-strip';
    strip.dataset.logicalOwner=profile.id;
    profiles.forEach(node=>{
      node.dataset.logicalOwner=profile.id;
      strip.append(node);
    });
    card.insertBefore(strip,localNav);
  }

  function buildColumns(card,profile,abilities){
    if(!profile||!abilities)return;
    const grid=document.createElement('div');
    grid.className='ds-main-grid';
    const arsenal=document.createElement('div');
    arsenal.className='ds-arsenal';
    const support=document.createElement('div');
    support.className='ds-support';
    card.insertBefore(grid,profile);
    grid.append(arsenal,support);
    arsenal.append(profile);
    support.append(abilities);
    const profileHeading=direct(profile,'h4');
    if(profileHeading)profileHeading.textContent='Weapons';

    const list=direct(abilities,'.ability-list');
    if(list){
      const layout={card,grid,arsenal,support,list,cards:Array.from(list.children).filter(node=>node.matches?.('.ability')),continuation:null,lastWidth:0};
      layouts.push(layout);
      layoutByCard.set(card,layout);
    }
  }

  function restoreAbilities(layout){
    layout.cards.forEach(node=>layout.list.append(node));
    layout.continuation?.remove();
  }

  function balanceAbilities(layout){
    restoreAbilities(layout);
    if(layout.cards.length<2)return;

    const arsenalBox=layout.arsenal.getBoundingClientRect();
    const supportBox=layout.support.getBoundingClientRect();
    const parallel=Math.abs(arsenalBox.top-supportBox.top)<=1&&supportBox.left>arsenalBox.left+1;
    if(!parallel||!arsenalBox.width)return;

    let split=layout.cards.length;
    for(let index=0;index<layout.cards.length;index+=1){
      if(layout.cards[index].getBoundingClientRect().bottom>arsenalBox.bottom+1){
        split=Math.max(1,index);
        break;
      }
    }
    if(split>=layout.cards.length)return;

    if(!layout.continuation){
      layout.continuation=document.createElement('div');
      layout.continuation.className='ability-list ds-abilities-continuation';
    }
    layout.arsenal.append(layout.continuation);
    layout.cards.slice(split).forEach(node=>layout.continuation.append(node));
  }

  function scheduleLayout(){
    if(layoutFrame)return;
    layoutFrame=requestAnimationFrame(()=>{
      layoutFrame=0;
      const connected=[];for(const layout of layouts){if(layout.card.isConnected){connected.push(layout);balanceAbilities(layout);}else observer?.unobserve(layout.card);}layouts=connected;
    });
  }

  function enhance(card){
    if(card.classList.contains('ds-layout'))return;
    const head=direct(card,'.unit-head,.unit-header');
    const localNav=direct(card,'.local-nav');
    const parts=directParts(card);
    const profile=parts.find(part=>part.id.endsWith('-profile'))||parts[0];
    const abilities=parts.find(part=>part.id.endsWith('-abilities'))||null;
    const damaged=parts.find(part=>part.id.endsWith('-damaged'))||null;
    const keywords=parts.find(part=>part.id.endsWith('-keywords'))||null;
    const pointsPanel=profile&&direct(profile,'.points-panel');
    buildCost(head,pointsPanel);
    moveProfiles(card,profile,localNav);
    buildColumns(card,profile,abilities);
    card.classList.add('ds-layout');
    observer?.observe(card);
  }

  function install(root=document){
    const cards=[...(root.matches?.('.unit-card')?[root]:[]),...root.querySelectorAll('.unit-card')];
    cards.forEach(enhance);scheduleLayout();return root;
  }

  if('ResizeObserver' in window){
    observer=new ResizeObserver(entries=>{
      let changed=false;
      entries.forEach(entry=>{
        const layout=layoutByCard.get(entry.target);
        if(!layout)return;
        const width=entry.contentRect.width;
        if(Math.abs(width-layout.lastWidth)>.5){
          layout.lastWidth=width;
          changed=true;
        }
      });
      if(changed)scheduleLayout();
    });
  }
  install(document);
  window.addEventListener('resize',scheduleLayout,{passive:true});
  document.fonts?.ready.then(scheduleLayout);
  scheduleLayout();
  window.WHArmyDatasheetLayout=Object.freeze({install});
}());
