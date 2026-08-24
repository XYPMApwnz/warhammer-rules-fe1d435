(function(){
  'use strict';

  const GAME_SCHEMA='wh40k-physical-unit-game-projection/v1';
  const list=value=>Array.isArray(value)?value:[];
  const directChild=(node,className)=>[...node.children].find(child=>child.classList.contains(className))||null;
  const currentRelation=relation=>relation?.certainty==='current'&&relation?.provenance?.kind==='explicit-roster-attachment';
  const keywordsFor=unit=>new Set(list(unit?.intrinsicKeywords).map(value=>String(value).trim().toUpperCase()));

  function physicalRosterOrder(game,catalog){
    const catalogOrder=new Map(list(catalog.units).map((unit,index)=>[unit.id,index])),catalogById=new Map(list(catalog.units).map(unit=>[unit.id,unit]));
    const units=list(game.units).map((unit,physicalOrder)=>{const canonical=catalogById.get(unit.identity?.canonicalDatasheetId);if(!canonical)return null;const keywords=keywordsFor(canonical);return{unit,canonical,instanceId:unit.identity.instanceId,targetId:canonical.id,title:unit.identity.canonicalTitle||canonical.title,canonicalOrder:catalogOrder.get(canonical.id),physicalOrder,isEpic:keywords.has('EPIC HERO'),isCharacter:keywords.has('CHARACTER')};}).filter(Boolean);
    const compare=(a,b)=>a.canonicalOrder-b.canonicalOrder||a.physicalOrder-b.physicalOrder;
    const byInstance=new Map(units.map(unit=>[unit.instanceId,unit])),edges=new Map(),leaderIds=new Set(),bodyguardIds=new Set();
    const connect=(left,right)=>{if(!byInstance.has(left)||!byInstance.has(right)||left===right)return;if(!edges.has(left))edges.set(left,new Set());if(!edges.has(right))edges.set(right,new Set());edges.get(left).add(right);edges.get(right).add(left);};
    for(const bodyguard of units)for(const relation of list(bodyguard.unit.attachments?.leaders).filter(currentRelation)){leaderIds.add(relation.instanceId);bodyguardIds.add(bodyguard.instanceId);connect(bodyguard.instanceId,relation.instanceId);}
    const visited=new Set(),components=[];
    for(const seed of units.filter(unit=>edges.has(unit.instanceId)).sort(compare)){if(visited.has(seed.instanceId))continue;const pending=[seed.instanceId],members=[];while(pending.length){const id=pending.shift();if(visited.has(id))continue;visited.add(id);const unit=byInstance.get(id);if(unit)members.push(unit);for(const next of edges.get(id)||[])if(!visited.has(next))pending.push(next);}members.sort((a,b)=>(a.isEpic?0:leaderIds.has(a.instanceId)?1:bodyguardIds.has(a.instanceId)?2:3)-(b.isEpic?0:leaderIds.has(b.instanceId)?1:bodyguardIds.has(b.instanceId)?2:3)||compare(a,b));components.push({members,epic:members.some(unit=>unit.isEpic)});}
    const componentOrder=component=>{const primary=component.members.filter(unit=>component.epic?unit.isEpic:leaderIds.has(unit.instanceId));return Math.min(...(primary.length?primary:component.members).map(unit=>unit.canonicalOrder));};
    const unattached=unit=>!edges.has(unit.instanceId),result=[],emitted=new Set(),emit=unit=>{if(!unit||emitted.has(unit.instanceId))return;emitted.add(unit.instanceId);result.push(unit);},emitComponent=component=>component.members.forEach(emit);
    units.filter(unit=>unit.isEpic&&unattached(unit)).sort(compare).forEach(emit);
    components.filter(component=>component.epic).sort((a,b)=>componentOrder(a)-componentOrder(b)).forEach(emitComponent);
    units.filter(unit=>unit.isCharacter&&!unit.isEpic&&unattached(unit)).sort(compare).forEach(emit);
    components.filter(component=>!component.epic).sort((a,b)=>componentOrder(a)-componentOrder(b)).forEach(emitComponent);
    units.sort(compare).forEach(emit);
    const copies=new Map();for(const unit of units.sort((a,b)=>a.physicalOrder-b.physicalOrder)){if(!copies.has(unit.targetId))copies.set(unit.targetId,[]);copies.get(unit.targetId).push(unit.instanceId);}
    return result.map(unit=>{const peers=copies.get(unit.targetId)||[],ordinal=peers.indexOf(unit.instanceId)+1;return{...unit,label:peers.length>1?`${unit.title} #${ordinal}`:unit.title};});
  }

  function physicalNavigationInput(){
    const params=new URLSearchParams(location.search),rosterId=params.get('roster'),projection=window.WH_ARMY_ROSTER_PROJECTION,catalog=window.WH_BOOK_ROSTER_CATALOG,game=projection?.game,rawUnits=list(projection?.roster?.units),gameUnits=list(game?.units),catalogUnits=list(catalog?.units);
    if(!rosterId||projection?.context?.rosterId!==rosterId||game?.schema!==GAME_SCHEMA||!rawUnits.length||rawUnits.length!==gameUnits.length||!catalogUnits.length)return null;
    const rawIds=rawUnits.map(unit=>String(unit?.id||'').trim()),gameIds=gameUnits.map(unit=>String(unit?.identity?.instanceId||'').trim()),rawSet=new Set(rawIds),gameSet=new Set(gameIds),catalogCounts=new Map();
    for(const unit of catalogUnits)catalogCounts.set(unit.id,(catalogCounts.get(unit.id)||0)+1);
    if(rawIds.some(id=>!id)||gameIds.some(id=>!id)||rawSet.size!==rawIds.length||gameSet.size!==gameIds.length||rawIds.some(id=>!gameSet.has(id))||gameIds.some(id=>!rawSet.has(id)))return null;
    if(gameUnits.some(unit=>{const targetId=String(unit?.identity?.canonicalDatasheetId||'').trim();return!targetId||catalogCounts.get(targetId)!==1;}))return null;
    return{game,catalog};
  }

  function projectPhysicalRosterNavigation(tree){
    const input=physicalNavigationInput();
    if(!input)return Object.freeze({active:false,items:[]});
    const {game,catalog}=input;
    const ordered=physicalRosterOrder(game,catalog),projected=[];
    for(const [index,item] of ordered.entries()){
      const sourceButtons=[...tree.querySelectorAll('[data-nav-target]')].filter(button=>button.dataset.navTarget===item.targetId);if(sourceButtons.length!==1)return Object.freeze({active:false,items:[]});const sourceButton=sourceButtons[0],sourceNode=sourceButton.closest('[data-nav-id]'),sourceRow=sourceNode&&directChild(sourceNode,'toc-row');
      if(!sourceNode||!sourceRow)return Object.freeze({active:false,items:[]});
      const node=sourceNode.cloneNode(false),row=sourceRow.cloneNode(true);row.querySelector('[data-nav-toggle]')?.remove();const button=row.querySelector('[data-nav-target]');if(!button)return Object.freeze({active:false,items:[]});
      node.dataset.navId=`roster-unit-${index+1}`;node.dataset.navDepth='0';button.dataset.navTarget=item.targetId;button.dataset.rosterInstance=item.instanceId;button.replaceChildren(document.createTextNode(item.label));button.removeAttribute('aria-current');button.classList.remove('is-current','is-ancestor');node.append(row);projected.push({node,...item});
    }
    if(ordered.length!==list(game.units).length||projected.length!==ordered.length)return Object.freeze({active:false,items:[]});
    tree.replaceChildren(...projected.map(item=>item.node));tree.dataset.rosterNavigation='physical';document.documentElement.dataset.rosterNavigation='physical';
    return Object.freeze({active:true,items:projected.map(({node,...item})=>item)});
  }

  class NavigationController{
    constructor({breakpoint=800,resizeCleanupBreakpoint=800,trackingGap=18,epsilon=1}={}){
      this.breakpoint=breakpoint;
      this.resizeCleanupBreakpoint=resizeCleanupBreakpoint;
      this.trackingGap=trackingGap;
      this.epsilon=epsilon;

      this.header=document.getElementById('appHeader');
      this.panel=document.getElementById('tocPanel');
      this.tree=document.getElementById('tocTree');
      this.main=document.getElementById('main');
      this.menuButton=document.getElementById('navMenu');
      this.collapseButton=document.getElementById('navCollapse');
      this.scrim=document.getElementById('tocScrim');
      this.rosterNavigation=projectPhysicalRosterNavigation(this.tree);

      this.mobile=window.innerWidth<=this.breakpoint;
      this.viewportWidth=window.innerWidth;
      this.state={owner:'reader',active:'',instance:'',drawer:false,collapsed:false,transition:0};
      this.frames={reader:0,geometry:0,hash:0};
      this.geometry={headerBottom:0,ranges:[]};
      this.activeButtons=new Set();
      this.supportsInert='inert'in HTMLElement.prototype;
      this.highlighter=new window.WHNavigationTargets.Highlighter();
      window.addEventListener('wh-army-target-before-mount',()=>this.highlighter.clear());
      this.historyIndex=Number.isInteger(history.state?.whNavigationIndex)?history.state.whNavigationIndex:0;
      this.locationTarget=this.hashTarget();
      this.locationInstance=this.rosterInstance();
      history.replaceState({...history.state,whNavigationIndex:this.historyIndex},'',location.href);

      this.indexNavigationItems();

      this.bind();
      this.handleRosterProjectionReady=()=>this.reconcileRosterNavigation();
      window.addEventListener('wh-roster-projection-ready',this.handleRosterProjectionReady);
      this.closeEveryBranch();
      this.applyViewportState();
      this.refreshGeometry();

      if('ResizeObserver'in window){
        this.layoutObserver=new ResizeObserver(()=>this.scheduleGeometry());
        this.layoutObserver.observe(this.header);
        this.layoutObserver.observe(this.main);
      }
      const loaded=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
      Promise.all([loaded,document.fonts?.ready||Promise.resolve()]).then(async()=>{
        await window.WHArmyDatasheetLayout?.ready?.();
        this.refreshGeometry();
        if(!window.WHPageState?.hasCurrent?.())this.scheduleHashRestore();
      });
    }

    get active(){return this.state.active||'start';}
    get activeInstance(){return this.state.instance||'';}

    indexNavigationItems(){
      this.items=[...this.tree.querySelectorAll('[data-nav-id]')].map(node=>{
        const row=this.direct(node,'toc-row');
        const button=row?.querySelector('[data-nav-target]');
        const id=button?.dataset.navTarget||'';
        const instanceId=button?.dataset.rosterInstance||'';
        return{id,instanceId,key:instanceId||id,node,row,button,depth:Number(node.dataset.navDepth)};
      }).filter(item=>item.id&&item.button);
      this.byId=new Map();this.byInstance=new Map();for(const item of this.items){if(!this.byId.has(item.id))this.byId.set(item.id,item);if(item.instanceId)this.byInstance.set(item.instanceId,item);}
    }
    reconcileRosterNavigation(){
      if(this.rosterNavigation.active)return false;
      const activeElement=document.activeElement,focusedButton=this.tree.contains(activeElement)?activeElement.closest?.('[data-nav-target]'):null,focusedTarget=focusedButton?.dataset.navTarget||'',focusedInstance=focusedButton?.dataset.rosterInstance||this.rosterInstance(),currentTarget=this.state.active||this.hashTarget(),currentInstance=this.rosterInstance()||this.state.instance,next=projectPhysicalRosterNavigation(this.tree);
      if(!next.active)return false;
      this.rosterNavigation=next;this.indexNavigationItems();this.activeButtons=new Set();
      const current=this.byInstance.get(currentInstance)||this.itemFor(currentTarget,currentInstance)||this.rosterDestination(currentTarget),section=this.sectionFor(current,currentTarget);
      if(section)this.navigate(current.id,section,null,current.instanceId);else if(current)this.activate(current.id,{instanceId:current.instanceId,keepVisible:false});
      this.closeEveryBranch();this.applyViewportState();this.refreshGeometry();
      if(focusedButton){const focused=this.byInstance.get(focusedInstance)||this.itemFor(focusedTarget,focusedInstance);focused?.button.focus({preventScroll:true});}
      return true;
    }

    direct(node,className){return[...node.children].find(child=>child.classList.contains(className))||null;}
    targetKind(id){return window.WHArmyBookTargetMount?.resolve(id)?.node?.kind||'';}
    canResolveTarget(id){return Boolean(document.getElementById(id)||window.WHArmyBookTargetMount?.resolve(id)?.ownerId);}
    ensureTarget(id){return Promise.resolve(window.WHArmyBookTargetMount?.ensure(id)||document.getElementById(id)||null);}
    canonicalTarget(id){return window.WHArmyBookTargetMount?.resolve(id)?.ownerId||id;}
    itemFor(id,instanceId=''){const exact=instanceId&&this.byInstance.get(instanceId);if(exact&&exact.id===this.canonicalTarget(id))return exact;return this.byId.get(this.canonicalTarget(id))||null;}
    rosterInstance(){return new URLSearchParams(location.search).get('rosterInstance')||history.state?.whRosterInstance||'';}
    rosterDestination(id){if(!this.rosterNavigation.active)return this.itemFor(id);const requested=this.rosterInstance(),exact=requested&&this.byInstance.get(requested),owner=this.canonicalTarget(id);if(exact&&exact.id===owner)return exact;if(!requested){const matching=this.byId.get(owner);if(matching)return matching;}return this.items[0]||null;}
    sectionFor(item,requestedId=item?.id){if(!item)return null;if(!item.instanceId)return document.getElementById(requestedId)||document.getElementById(item.id);const card=document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(item.instanceId)}"]`);if(!card)return null;if(requestedId===item.id)return card;return[...card.querySelectorAll('[id]')].find(node=>node.id===requestedId||node.id.startsWith(`${requestedId}--`))||card;}
    branch(node){return this.direct(node,'toc-branch');}
    parentNode(node){const list=node.parentElement;return list?.classList.contains('toc-branch')?list.parentElement:null;}
    toggle(node){return this.direct(node,'toc-row')?.querySelector('[data-nav-toggle]')||null;}

    bind(){
      this.tree.addEventListener('click',event=>{
        const toggle=event.target.closest('[data-nav-toggle]');
        if(toggle&&this.tree.contains(toggle)){
          event.preventDefault();this.toggleBranch(toggle.closest('[data-nav-id]'));return;
        }
        const label=event.target.closest('[data-nav-target]');
        if(!label||!this.tree.contains(label))return;
        event.preventDefault();
        const node=label.closest('[data-nav-id]');
        if(this.mobile&&this.targetKind(label.dataset.navTarget)==='branch'){this.toggleBranch(node);return;}
        if(label.dataset.navTarget==='start')this.closeEveryBranch();
        else this.revealPath(node,{includeSelf:true});
        this.go(label.dataset.navTarget,{historyMode:'push',instanceId:label.dataset.rosterInstance||''});
      });

      this.menuButton.addEventListener('touchstart',event=>{event.preventDefault();this.menuButton.click();},{passive:false});
      this.menuButton.addEventListener('click',()=>this.setDrawer(!this.state.drawer));
      this.collapseButton.addEventListener('click',()=>this.setCollapsed(!this.state.collapsed));
      this.scrim.addEventListener('click',()=>this.setDrawer(false));
      window.addEventListener('scroll',()=>this.scheduleRead(),{passive:true});
      window.addEventListener('resize',()=>this.handleResize(),{passive:true});
      window.addEventListener('wheel',event=>this.cancelTransition(event),{passive:true});
      window.addEventListener('touchstart',event=>this.cancelTransition(event),{passive:true});
      window.addEventListener('pointerdown',event=>this.cancelTransition(event),{passive:true});
      window.addEventListener('popstate',event=>this.onPopState(event));
      window.addEventListener('hashchange',()=>{
        const target=this.hashTarget();
        if(target===this.locationTarget)return;
        this.locationTarget=target;
        this.scheduleHashRestore();
      });
      document.addEventListener('keydown',event=>{
        if(['PageUp','PageDown','Home','End','ArrowUp','ArrowDown',' '].includes(event.key))this.cancelTransition();
        if(event.key==='Tab'&&this.state.drawer)this.trapDrawerFocus(event);
        if(event.key==='Escape'&&this.state.drawer&&!document.querySelector('#popupLayer .term-popup'))this.setDrawer(false);
      });
    }

    closeEveryBranch(){for(const item of this.items)this.closeBranch(item.node,{deep:true});}
    closeBranch(node,{deep=true}={}){
      const branch=this.branch(node),toggle=this.toggle(node);if(!branch)return;
      branch.hidden=true;if(toggle)toggle.setAttribute('aria-expanded','false');
      if(deep)for(const child of branch.children)if(child.matches('[data-nav-id]'))this.closeBranch(child,{deep:true});
    }
    openBranch(node){
      const branch=this.branch(node),toggle=this.toggle(node);if(!branch)return;
      if(branch.hidden){
        for(const peer of node.parentElement.children)if(peer!==node&&peer.matches('[data-nav-id]'))this.closeBranch(peer,{deep:true});
        branch.hidden=false;
      }
      if(toggle)toggle.setAttribute('aria-expanded','true');
    }
    toggleBranch(node){
      const branch=this.branch(node);if(!branch)return;
      if(branch.hidden)this.openBranch(node);else this.closeBranch(node,{deep:true});
    }
    pathIsOpen(node){
      for(let current=node;current;current=this.parentNode(current))if(this.branch(current)?.hidden)return false;
      return true;
    }
    revealPath(node,{includeSelf=false}={}){
      const path=[];for(let parent=this.parentNode(node);parent;parent=this.parentNode(parent))path.unshift(parent);
      for(const parent of path)this.openBranch(parent);
      if(includeSelf)this.openBranch(node);
    }

    setInteractive(root,interactive){
      if(!root)return;
      if(this.supportsInert){root.inert=!interactive;return;}
      const key='data-nav-saved-tabindex';
      const selector='a,button,input,select,textarea,[tabindex]';
      const controls=[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
      for(const control of controls){
        if(!interactive&&!control.hasAttribute(key)){
          control.setAttribute(key,control.getAttribute('tabindex')??'');control.setAttribute('tabindex','-1');
        }else if(interactive&&control.hasAttribute(key)){
          const saved=control.getAttribute(key);control.removeAttribute(key);
          if(saved==='')control.removeAttribute('tabindex');else control.setAttribute('tabindex',saved);
        }
      }
    }
    applyViewportState(){
      const panelHidden=this.mobile?!this.state.drawer:this.state.collapsed;
      this.setInteractive(this.panel,!panelHidden);
      this.panel.setAttribute('aria-hidden',String(panelHidden));
      const documentBlocked=this.mobile&&this.state.drawer;
      this.setInteractive(this.main,!documentBlocked);
      for(const child of this.header?.children||[])if(child!==this.menuButton)this.setInteractive(child,!documentBlocked);
      if(documentBlocked)this.main.setAttribute('aria-hidden','true');else this.main.removeAttribute('aria-hidden');
      this.scrim.setAttribute('aria-hidden',String(!this.state.drawer));
      document.body.classList.toggle('nav-drawer-open',this.state.drawer);
      document.body.classList.toggle('nav-collapsed',this.state.collapsed);
      this.menuButton.setAttribute('aria-expanded',String(this.state.drawer));
      this.menuButton.setAttribute('aria-label',this.state.drawer?'Close navigation':'Open navigation');
      this.collapseButton.setAttribute('aria-expanded',String(!this.state.collapsed));
      this.collapseButton.setAttribute('aria-label',this.state.collapsed?'Expand navigation':'Collapse navigation');
      this.collapseButton.textContent=this.state.collapsed?'▶':'◀';
    }
    setDrawer(open){
      const next=this.mobile&&Boolean(open);if(next===this.state.drawer)return;
      const returnFocus=this.state.drawer;
      this.state.drawer=next;this.applyViewportState();
      if(next)requestAnimationFrame(()=>this.panel.querySelector('[data-nav-target]')?.focus({preventScroll:true}));
      else if(returnFocus)this.menuButton.focus({preventScroll:true});
    }
    setCollapsed(collapsed){
      const next=this.mobile?false:Boolean(collapsed);if(next===this.state.collapsed)return;
      const returnFocus=!this.state.collapsed&&this.panel.contains(document.activeElement);
      this.state.collapsed=next;this.applyViewportState();
      if(returnFocus&&next)this.collapseButton.focus({preventScroll:true});
    }
    trapDrawerFocus(event){
      const controls=[this.menuButton,...this.panel.querySelectorAll('a,button,input,select,textarea,[tabindex]')].filter(control=>control&&control.tabIndex>=0&&!control.closest('[hidden]'));
      if(controls.length<2)return;
      const menu=controls[0],first=controls[1],last=controls[controls.length-1],active=document.activeElement;
      if(event.shiftKey&&active===first){event.preventDefault();menu.focus();}
      else if(!event.shiftKey&&active===menu){event.preventDefault();first.focus();}
      else if(!event.shiftKey&&active===last){event.preventDefault();menu.focus();}
      else if(event.shiftKey&&active===menu){event.preventDefault();last.focus();}
    }
    handleResize(){
      const crossedCleanupBreakpoint=(this.viewportWidth<=this.resizeCleanupBreakpoint)!==(window.innerWidth<=this.resizeCleanupBreakpoint);
      const widthChanged=Math.abs(window.innerWidth-this.viewportWidth)>1;
      this.viewportWidth=window.innerWidth;
      if(widthChanged&&this.state.owner==='controller')this.cancelTransition();
      const focusWasInPanel=this.panel.contains(document.activeElement);
      const mobile=window.innerWidth<=this.breakpoint;
      if(mobile!==this.mobile||(crossedCleanupBreakpoint&&this.state.drawer)){
        this.mobile=mobile;this.state.drawer=false;if(mobile)this.state.collapsed=false;this.applyViewportState();
      }
      if(focusWasInPanel&&this.panel.getAttribute('aria-hidden')==='true')this.menuButton.focus({preventScroll:true});
      requestAnimationFrame(()=>this.scheduleGeometry());
    }

    buttonSet(item){
      const buttons=new Set([item.button]);
      for(let parent=this.parentNode(item.node);parent;parent=this.parentNode(parent)){
        const button=this.direct(parent,'toc-row')?.querySelector('[data-nav-target]');if(button)buttons.add(button);
      }
      return buttons;
    }
    activate(id,{instanceId='',keepVisible=true,behavior='auto'}={}){
      const item=this.itemFor(id,instanceId);if(!item)return;
      const next=this.buttonSet(item);
      for(const button of this.activeButtons)if(!next.has(button)){
        button.classList.remove('is-current','is-ancestor');button.removeAttribute('aria-current');
      }
      item.button.classList.remove('is-ancestor');item.button.classList.add('is-current');item.button.setAttribute('aria-current','location');
      for(const button of next)if(button!==item.button){button.classList.remove('is-current');button.classList.add('is-ancestor');button.removeAttribute('aria-current');}
      this.activeButtons=next;this.state.active=item.id;this.state.instance=item.instanceId;
      this.revealPath(item.node,{includeSelf:true});
      if(keepVisible)this.keepRowVisible(item.row,behavior);
    }
    keepRowVisible(row,behavior='auto'){
      if(!row||this.panel.inert||this.panel.getAttribute('aria-hidden')==='true')return;
      const panel=this.panel.getBoundingClientRect(),item=row.getBoundingClientRect(),gap=12;
      if(item.top<panel.top+gap)this.panel.scrollTo({top:this.panel.scrollTop-(panel.top+gap-item.top),behavior});
      else if(item.bottom>panel.bottom-gap)this.panel.scrollTo({top:this.panel.scrollTop+(item.bottom-panel.bottom+gap),behavior});
    }

    destination(element,inset=this.geometry.headerBottom+this.trackingGap){
      return Math.max(0,window.scrollY+element.getBoundingClientRect().top-inset);
    }
    scheduleGeometry(){
      if(this.frames.geometry)return;
      this.frames.geometry=requestAnimationFrame(()=>{this.frames.geometry=0;this.refreshGeometry();});
    }
    refreshGeometry(){
      const scrollY=window.scrollY;
      this.geometry.headerBottom=this.header.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty('--app-header-bottom',`${Math.max(0,this.geometry.headerBottom)}px`);
      this.geometry.ranges=this.items.map(item=>{
        const section=this.sectionFor(item);if(!section)return null;
        const rect=section.getBoundingClientRect(),leadingMargin=parseFloat(getComputedStyle(section).marginTop)||0;
        return{item,top:scrollY+rect.top-leadingMargin,bottom:scrollY+rect.bottom,measurable:rect.width>0||rect.height>0};
      }).filter(Boolean);
      this.readViewport();
    }
    descendsFrom(item,ancestor){
      for(let node=this.parentNode(item.node);node;node=this.parentNode(node))if(node===ancestor.node)return true;
      return false;
    }
    lastCrossedDescendant(parent,scrollY){
      let descendant=null;
      for(const range of this.geometry.ranges){
        if(range.measurable===false)continue;
        if(!this.descendsFrom(range.item,parent.item))continue;
        const line=scrollY+this.geometry.headerBottom+this.trackingGap;
        if(range.top<=line+this.epsilon&&(!descendant||range.top>descendant.top||range.top===descendant.top&&range.item.depth>descendant.item.depth))descendant=range;
      }
      return descendant;
    }
    pickActive(){
      const scrollY=window.scrollY;let winner=null;
      for(const range of this.geometry.ranges){
        if(range.measurable===false)continue;
        const line=scrollY+this.geometry.headerBottom+this.trackingGap;
        if(range.top<=line+this.epsilon&&range.bottom>line&&(!winner||range.item.depth>winner.item.depth||range.item.depth===winner.item.depth&&range.top>winner.top))winner=range;
      }
      if(winner)return this.lastCrossedDescendant(winner,scrollY)?.item||winner.item;
      for(const range of this.geometry.ranges){
        if(range.measurable===false)continue;
        const line=scrollY+this.geometry.headerBottom+this.trackingGap;
        if(range.top<=line+this.epsilon&&(!winner||range.top>winner.top||range.top===winner.top&&range.item.depth>winner.item.depth))winner=range;
      }
      return winner?.item||this.items[0]||null;
    }
    scheduleRead(){
      if(this.state.owner!=='reader'||this.frames.reader)return;
      this.frames.reader=requestAnimationFrame(()=>{this.frames.reader=0;this.readViewport();});
    }
    readViewport(){
      if(this.state.owner!=='reader')return;
      const item=this.pickActive();
      if(item&&(item.id!==this.state.active||item.instanceId!==this.state.instance))this.activate(item.id,{instanceId:item.instanceId});
      else if(item&&!this.pathIsOpen(item.node))this.revealPath(item.node,{includeSelf:true});
    }

    scheduleHashRestore(){
      if(this.frames.hash)return;
      this.frames.hash=requestAnimationFrame(()=>{this.frames.hash=0;this.navigateHash();});
    }
    async restoreInitial(scrollY=null,settled){
      let id=this.hashTarget()||'start',item=this.rosterDestination(id);
      if(this.rosterNavigation.active){if(!item){settled?.();return false;}if(this.canonicalTarget(id)!==item.id)id=item.id;this.replaceRosterLocation(id,item.instanceId);}else item=this.itemFor(id);
      if(this.mobile&&this.targetKind(id)==='branch'){const item=this.byId.get(id);if(item)this.revealPath(item.node,{includeSelf:true});settled?.();return false;}
      await this.ensureTarget(id);
      await window.WHArmyDatasheetLayout?.ready?.();
      const target=this.sectionFor(item,id);if(!target){settled?.();return false;}
      this.refreshGeometry();const unit=target.closest('.unit-card');
      if(Number.isFinite(scrollY))this.beginTransition(item?.id||unit?.id||target.id,Math.max(0,scrollY),settled,item?.instanceId||'');
      else if(unit&&target.matches('.unit-part'))this.navigateSection(item?.id||unit.id,target,{nav:unit.querySelector(':scope > .local-nav'),settled,instanceId:item?.instanceId||''});
      else this.navigate(item?.id||unit?.id||target.id,target,settled,item?.instanceId||'');
      return true;
    }
    navigateHash(){return this.restoreInitial();}
    hashTarget(){return decodeURIComponent((window.WHPageState?.initialHash?.()||location.hash).slice(1));}
    pushHistoryState(state,url){
      this.historyIndex+=1;
      const next={...state,whNavigationIndex:this.historyIndex};
      history.pushState(next,'',url);
      this.locationTarget=decodeURIComponent(new URL(url,location.href).hash.slice(1));
      this.locationInstance=new URL(url,location.href).searchParams.get('rosterInstance')||'';
      return next;
    }
    replaceRosterLocation(id,instanceId){const url=new URL(location.href);url.hash=id;url.searchParams.set('rosterInstance',instanceId);const state={...history.state,whNavigationTarget:id,whRosterInstance:instanceId};history.replaceState(state,'',url);this.locationTarget=id;this.locationInstance=instanceId;}
    commitTarget(id,instanceId=''){
      if(this.hashTarget()===id&&this.rosterInstance()===instanceId)return;
      const url=new URL(location.href);url.hash=id;
      const state={...history.state,whNavigationTarget:id};
      if(instanceId){url.searchParams.set('rosterInstance',instanceId);state.whRosterInstance=instanceId;}else delete state.whRosterInstance;
      for(const key of ['whJourney','whJourneyTarget','dgFullEntry','wh40kPageState'])delete state[key];
      this.pushHistoryState(state,url);
      window.dispatchEvent(new CustomEvent('wh-navigation-commit',{detail:{target:id,instanceId}}));
    }
    onPopState(event){
      const next=Number.isInteger(event.state?.whNavigationIndex)?event.state.whNavigationIndex:this.historyIndex;
      const direction=next<this.historyIndex?'back':next>this.historyIndex?'forward':'none';
      this.historyIndex=next;
      const target=this.hashTarget(),instanceId=this.rosterInstance(),changed=target!==this.locationTarget||instanceId!==this.locationInstance;
      this.locationTarget=target;this.locationInstance=instanceId;
      const detail={direction,state:event.state||{},target,instanceId,restore:null};
      window.dispatchEvent(new CustomEvent('wh-navigation-popstate',{detail}));
      if(detail.restore)this.restore(detail.restore.id,detail.restore.scrollY,null,instanceId);
      else if(changed)this.scheduleHashRestore();
    }
    async go(id,{historyMode='none',instanceId=''}={}){const item=this.itemFor(id,instanceId);if(!item)return;if(this.mobile&&this.targetKind(id)==='branch'){this.toggleBranch(item.node);return;}await this.ensureTarget(id);const section=this.sectionFor(item);if(!section)return;this.setDrawer(false);if(historyMode==='push')this.commitTarget(item.id,item.instanceId);this.navigate(item.id,section,null,item.instanceId);}
    navigate(id,element,settled,instanceId=''){
      const targets=window.WHNavigationTargets.resolve(element);
      if(!targets.scrollTarget)return;
      this.beginTransition(id,this.destination(targets.scrollTarget),()=>{this.highlighter.show(targets.highlightTarget);settled?.();},instanceId);
    }
    navigateSection(id,section,{nav=null,settled,instanceId=''}={}){
      const targets=window.WHNavigationTargets.resolve(section);if(!targets.scrollTarget)return;
      const navHeight=nav?.getBoundingClientRect().height||0;
      const inset=this.geometry.headerBottom+navHeight+this.trackingGap;
      const highlightTarget=targets.kind==='logical-section'?targets.highlightTarget:section;
      const complete=()=>{this.highlighter.show(highlightTarget);settled?.();};
      this.beginTransition(id,this.destination(targets.scrollTarget,inset),complete,instanceId);
    }
    async restore(id,scrollY,settled,instanceId=this.rosterInstance()){const item=this.itemFor(id,instanceId)||this.rosterDestination(id);if(!item)return;await this.ensureTarget(item.id);this.refreshGeometry();this.beginTransition(item.id,Math.max(0,scrollY),settled,item.instanceId);}
    beginTransition(id,destination,settled,instanceId=''){
      if(this.state.owner==='controller')this.stopControlledScroll();
      const token=++this.state.transition;this.state.owner='controller';this.activate(id,{instanceId,behavior:'auto'});
      const reachable=this.reachableDestination(destination);
      if(this.mobile||matchMedia('(prefers-reduced-motion:reduce)').matches)this.scrollImmediately(reachable);
      else window.scrollTo({top:reachable,behavior:'smooth'});
      this.waitForSettle(reachable,token,settled);
    }
    reachableDestination(destination){return Math.min(Math.max(0,destination),Math.max(0,document.documentElement.scrollHeight-window.innerHeight));}
    scrollImmediately(top){
      const root=document.documentElement,previous=root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      window.scrollTo({left:window.scrollX,top,behavior:'auto'});
      root.style.scrollBehavior=previous;
    }
    stopControlledScroll(){
      this.scrollImmediately(window.scrollY);
    }
    waitForSettle(destination,token,settled){
      const started=Date.now();let previous=window.scrollY,stable=0;
      const inspect=()=>{
        if(token!==this.state.transition)return;
        const current=window.scrollY,reachable=this.reachableDestination(destination),atDestination=Math.abs(current-reachable)<2;
        stable=atDestination&&Math.abs(current-previous)<1?stable+1:0;previous=current;
        if(stable>=6){
          this.state.owner='reader';settled?.();this.readViewport();return;
        }
        if(Date.now()-started>2200){
          this.stopControlledScroll();
          this.scrollImmediately(this.reachableDestination(destination));
          requestAnimationFrame(()=>{if(token!==this.state.transition)return;this.state.owner='reader';settled?.();this.refreshGeometry();});
          return;
        }
        requestAnimationFrame(inspect);
      };
      requestAnimationFrame(inspect);
    }
    cancelTransition(event){
      const target=event?.target;
      if(target&&(this.panel.contains(target)||this.menuButton.contains(target)||this.collapseButton.contains(target)))return;
      if(this.state.owner!=='controller')return;
      this.stopControlledScroll();this.state.transition++;this.state.owner='reader';this.scheduleRead();
    }
  }

  window.DGNavigation=NavigationController;
  window.WHArmyRosterNavigation=Object.freeze({schema:'wh40k-physical-roster-navigation/v1',order:physicalRosterOrder,project:projectPhysicalRosterNavigation});
}());
