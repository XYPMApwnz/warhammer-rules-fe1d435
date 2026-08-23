(function(){
  'use strict';

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

      this.mobile=window.innerWidth<=this.breakpoint;
      this.viewportWidth=window.innerWidth;
      this.state={owner:'reader',active:'',drawer:false,collapsed:false,transition:0};
      this.frames={reader:0,geometry:0,hash:0};
      this.geometry={headerBottom:0,ranges:[]};
      this.activeButtons=new Set();
      this.supportsInert='inert'in HTMLElement.prototype;
      this.highlighter=new window.WHNavigationTargets.Highlighter();
      this.historyIndex=Number.isInteger(history.state?.whNavigationIndex)?history.state.whNavigationIndex:0;
      this.locationTarget=this.hashTarget();
      history.replaceState({...history.state,whNavigationIndex:this.historyIndex},'',location.href);

      this.items=[...this.tree.querySelectorAll('[data-nav-id]')].map(node=>{
        const row=this.direct(node,'toc-row');
        const button=row?.querySelector('[data-nav-target]');
        const id=button?.dataset.navTarget||'';
        return{
          id,node,row,button,
          depth:Number(node.dataset.navDepth)
        };
      }).filter(item=>item.id&&item.button);
      this.byId=new Map(this.items.map(item=>[item.id,item]));

      this.bind();
      this.closeEveryBranch();
      this.applyViewportState();
      this.refreshGeometry();

      if('ResizeObserver'in window){
        this.layoutObserver=new ResizeObserver(()=>this.scheduleGeometry());
        this.layoutObserver.observe(this.header);
        this.layoutObserver.observe(this.main);
      }
      const loaded=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
      Promise.all([loaded,document.fonts?.ready||Promise.resolve()]).then(()=>this.scheduleHashRestore());
    }

    get active(){return this.state.active||'start';}

    direct(node,className){return[...node.children].find(child=>child.classList.contains(className))||null;}
    targetKind(id){return window.WHArmyBookTargetMount?.resolve(id)?.node?.kind||'';}
    canResolveTarget(id){return Boolean(document.getElementById(id)||window.WHArmyBookTargetMount?.resolve(id)?.ownerId);}
    ensureTarget(id){return Promise.resolve(window.WHArmyBookTargetMount?.ensure(id)||document.getElementById(id)||null);}
    sectionFor(item){return item?document.getElementById(item.id):null;}
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
        this.go(label.dataset.navTarget,{historyMode:'push'});
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
    activate(id,{keepVisible=true,behavior='auto'}={}){
      const item=this.byId.get(id);if(!item)return;
      const next=this.buttonSet(item);
      for(const button of this.activeButtons)if(!next.has(button)){
        button.classList.remove('is-current','is-ancestor');button.removeAttribute('aria-current');
      }
      item.button.classList.remove('is-ancestor');item.button.classList.add('is-current');item.button.setAttribute('aria-current','location');
      for(const button of next)if(button!==item.button){button.classList.remove('is-current');button.classList.add('is-ancestor');button.removeAttribute('aria-current');}
      this.activeButtons=next;this.state.active=id;
      this.revealPath(item.node,{includeSelf:true});
      if(keepVisible)this.keepRowVisible(item.row,behavior);
    }
    keepRowVisible(row,behavior='auto'){
      if(!row||this.panel.inert||this.panel.getAttribute('aria-hidden')==='true')return;
      const panel=this.panel.getBoundingClientRect(),item=row.getBoundingClientRect(),gap=12;
      if(item.top<panel.top+gap)this.panel.scrollTo({top:this.panel.scrollTop-(panel.top+gap-item.top),behavior});
      else if(item.bottom>panel.bottom-gap)this.panel.scrollTo({top:this.panel.scrollTop+(item.bottom-panel.bottom+gap),behavior});
    }

    destination(element){
      return Math.max(0,window.scrollY+element.getBoundingClientRect().top-this.geometry.headerBottom-this.trackingGap);
    }
    scheduleGeometry(){
      if(this.frames.geometry)return;
      this.frames.geometry=requestAnimationFrame(()=>{this.frames.geometry=0;this.refreshGeometry();});
    }
    refreshGeometry(){
      const scrollY=window.scrollY;
      this.geometry.headerBottom=this.header.getBoundingClientRect().bottom;
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
      if(item&&item.id!==this.state.active)this.activate(item.id);
      else if(item&&!this.pathIsOpen(item.node))this.revealPath(item.node,{includeSelf:true});
    }

    scheduleHashRestore(){
      if(this.frames.hash)return;
      this.frames.hash=requestAnimationFrame(()=>{this.frames.hash=0;this.navigateHash();});
    }
    async navigateHash(){
      const id=this.hashTarget()||'start';
      if(this.mobile&&this.targetKind(id)==='branch'){const item=this.byId.get(id);if(item)this.revealPath(item.node,{includeSelf:true});return false;}
      await this.ensureTarget(id);
      const target=document.getElementById(id);if(!target)return false;
      this.refreshGeometry();const unit=target.closest('.unit-card');this.navigate(unit?.id||target.id,target);return true;
    }
    hashTarget(){return decodeURIComponent(location.hash.slice(1));}
    pushHistoryState(state,url){
      this.historyIndex+=1;
      const next={...state,whNavigationIndex:this.historyIndex};
      history.pushState(next,'',url);
      this.locationTarget=decodeURIComponent(new URL(url,location.href).hash.slice(1));
      return next;
    }
    commitTarget(id){
      if(this.hashTarget()===id)return;
      const url=new URL(location.href);url.hash=id;
      const state={...history.state,whNavigationTarget:id};
      for(const key of ['whJourney','whJourneyTarget','dgFullEntry','wh40kPageState'])delete state[key];
      this.pushHistoryState(state,url);
      window.dispatchEvent(new CustomEvent('wh-navigation-commit',{detail:{target:id}}));
    }
    onPopState(event){
      const next=Number.isInteger(event.state?.whNavigationIndex)?event.state.whNavigationIndex:this.historyIndex;
      const direction=next<this.historyIndex?'back':next>this.historyIndex?'forward':'none';
      this.historyIndex=next;
      const target=this.hashTarget(),changed=target!==this.locationTarget;
      this.locationTarget=target;
      const detail={direction,state:event.state||{},target,restore:null};
      window.dispatchEvent(new CustomEvent('wh-navigation-popstate',{detail}));
      if(detail.restore)this.restore(detail.restore.id,detail.restore.scrollY);
      else if(changed)this.scheduleHashRestore();
    }
    async go(id,{historyMode='none'}={}){const item=this.byId.get(id);if(!item)return;if(this.mobile&&this.targetKind(id)==='branch'){this.toggleBranch(item.node);return;}await this.ensureTarget(id);const section=this.sectionFor(item);if(!section)return;this.setDrawer(false);if(historyMode==='push')this.commitTarget(id);this.navigate(id,section);}
    navigate(id,element,settled){
      const targets=window.WHNavigationTargets.resolve(element);
      if(!targets.scrollTarget)return;
      this.beginTransition(id,this.destination(targets.scrollTarget),()=>{this.highlighter.show(targets.highlightTarget);settled?.();});
    }
    async restore(id,scrollY,settled){await this.ensureTarget(id);this.refreshGeometry();this.beginTransition(id,Math.max(0,scrollY),settled);}
    beginTransition(id,destination,settled){
      if(this.state.owner==='controller')this.stopControlledScroll();
      const token=++this.state.transition;this.state.owner='controller';this.activate(id,{behavior:'auto'});
      const reachable=this.reachableDestination(destination);
      const behavior=this.mobile||matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth';
      window.scrollTo({top:reachable,behavior});
      this.waitForSettle(reachable,token,settled);
    }
    reachableDestination(destination){return Math.min(Math.max(0,destination),Math.max(0,document.documentElement.scrollHeight-window.innerHeight));}
    stopControlledScroll(){
      const root=document.documentElement,previous=root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      window.scrollTo({left:window.scrollX,top:window.scrollY,behavior:'auto'});
      root.style.scrollBehavior=previous;
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
          window.scrollTo({left:window.scrollX,top:this.reachableDestination(destination),behavior:'auto'});
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
}());
