import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const books=[
  ['Death Guard','death-guard'],['Adeptus Mechanicus','adeptus-mechanicus'],["T'au Empire",'tau-empire'],
  ["Emperor's Children",'emperors-children'],['Tyranids','tyranids'],['Chaos Space Marines','chaos-space-marines'],
  ['Space Marines','space-marines'],['Dark Angels','dark-angels'],['Blood Angels','blood-angels']
];

const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.end(await readFile(file));
  }catch{response.statusCode=404;response.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});
const relatedRulesSource=await readFile(path.join(root,'books/shared/army-related-rules.js'),'utf8');
assert.equal((relatedRulesSource.match(/modal\.activate\(/g)||[]).length,1,'Related Rules must activate its modal exactly once per open path');
assert.equal((relatedRulesSource.match(/document\.addEventListener\('click'/g)||[]).length,1,'Related Rules must use one delegated click listener');

const waitForApp=page=>page.waitForFunction(()=>Boolean(window.DG_APP?.navigation&&window.WHArmyBookTargetMount));
const waitForHash=(page,id)=>page.waitForFunction(target=>location.hash===`#${target}`,id);
const installScrollProbe=page=>page.addInitScript(()=>{
  const nativeScrollTo=window.scrollTo.bind(window);
  window.__phone2dScrollCalls=[];
  window.scrollTo=(...args)=>{
    const top=typeof args[0]==='object'?args[0]?.top:args[1];
    window.__phone2dScrollCalls.push({top:Number(top)||0,stack:String(new Error().stack||'')});
    return nativeScrollTo(...args);
  };
});
const observe=page=>{
  const errors=[],failed=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('requestfailed',request=>failed.push(request.url()+': '+request.failure()?.errorText));
  return{errors,failed};
};
const unitIds=page=>page.evaluate(()=>window.WHArmyBookTargetMount.catalog.nodes.filter(node=>node.kind==='target'&&node.id.startsWith('unit-')).slice(0,2).map(node=>node.id));
const navSnapshot=page=>page.evaluate(()=>{
  const unit=document.querySelector('.document .unit-card'),nav=unit?.querySelector(':scope > .local-nav'),buttons=[...(nav?.querySelectorAll('[data-journey-target]')||[])],commands=[...(nav?.querySelectorAll('[data-datasheet-command]')||[])],navStyle=nav?getComputedStyle(nav):null,commandStyle=commands[0]?getComputedStyle(commands[0]):null;
  return{
    unitId:unit?.id||'',units:document.querySelectorAll('.document .unit-card').length,
    terminalOwners:[...document.querySelector('.document')?.children||[]].filter(node=>node.id).map(node=>node.id),
    navs:document.querySelectorAll('.document .unit-card > .local-nav').length,
    role:nav?.getAttribute('role')||'',label:nav?.getAttribute('aria-label')||'',position:nav?getComputedStyle(nav).position:'',
    targets:buttons.map(button=>button.dataset.journeyTarget),
    mapped:buttons.every(button=>{const target=document.getElementById(button.dataset.journeyTarget);return target?.matches('section.unit-part')&&target.closest('.unit-card')===unit;}),
    commands:commands.map(button=>button.dataset.datasheetCommand),commandLast:commands.length===1&&nav.lastElementChild===commands[0],commandJourneyTargets:commands.filter(button=>button.hasAttribute('data-journey-target')).length,
    navBackground:navStyle?.backgroundColor||'',navOpacity:navStyle?.opacity||'',commandMinHeight:commandStyle?parseFloat(commandStyle.minHeight):0,commandWeight:commandStyle?Number(commandStyle.fontWeight):0,commandBorder:commandStyle?.borderTopStyle||'',
    active:buttons.filter(button=>button.matches('.is-current,.is-active,[aria-current]')).length,
    overflow:document.documentElement.scrollWidth>window.innerWidth,
    hiddenTerminalContent:[...document.querySelectorAll('.document [data-track],.document .unit-card')].filter(node=>getComputedStyle(node).display==='none').length
  };
});
const coverageTotals={datasheets:0,stratagemDatasheets:0,stratagemNavDatasheets:0,baseDatasheets:0};
const structureSnapshot=page=>page.evaluate(()=>{
  const unit=document.querySelector('.document .unit-card'),head=[...unit.children].find(node=>node.matches('.unit-head,.unit-header')),nav=[...unit.children].find(node=>node.matches('.local-nav'));
  const profile=[...unit.querySelectorAll('.unit-part[id]')].find(part=>part.id.endsWith('-profile'))||unit.querySelector('.unit-part[id]');
  const statlines=[...unit.querySelectorAll('.statline')],bases=[...unit.querySelectorAll('.profile-base')],weapon=unit.querySelector('.weapon-group,.weapon-table');
  const before=(left,right)=>Boolean(left&&right&&(left.compareDocumentPosition(right)&Node.DOCUMENT_POSITION_FOLLOWING));
  const logicalOwner=node=>node.dataset.logicalOwner||node.closest('[data-logical-owner]')?.dataset.logicalOwner||'';
  return{headBeforeNav:before(head,nav),navBeforeStatline:statlines.every(statline=>before(nav,statline)),statlineBeforeWeapons:!weapon||statlines.every(statline=>before(statline,weapon)),profileOwned:[...statlines,...bases].every(node=>logicalOwner(node)===profile?.id),navOwnsStatline:statlines.some(statline=>nav.contains(statline)),statlines:statlines.length,bases:bases.length};
});
const clickSection=async(page,id)=>{
  await page.locator(`[data-journey-target="${id}"]`).click();
  await waitForHash(page,id);
  await page.waitForFunction(target=>document.getElementById(target)?.classList.contains('destination-highlight'),id);
  const feedback=await page.evaluate(target=>{
    const section=document.getElementById(target),heading=section?.querySelector(':scope > h4');
    return{section:section?.matches('section.unit-part')&&section.classList.contains('destination-highlight'),heading:heading?.classList.contains('destination-highlight')||false,active:document.querySelectorAll('.local-nav .is-current,.local-nav .is-active,.local-nav [aria-current]').length};
  },id);
  assert.deepEqual(feedback,{section:true,heading:false,active:0},`${id}: whole-section feedback contract failed`);
};
const profileAnchorContract=async(page,name)=>{
  const profile=await page.evaluate(()=>{
    const unit=document.querySelector('.document .unit-card'),sections=[...unit.querySelectorAll('.unit-part[id]')];
    const section=sections.find(candidate=>unit.querySelector(`[data-logical-owner="${CSS.escape(candidate.id)}"]`));
    const owner=section&&[...unit.querySelectorAll('[data-logical-owner]')].find(node=>node.dataset.logicalOwner===section.id);
    const resolved=section&&window.WHNavigationTargets.resolve(section).scrollTarget;
    return{id:section?.id||'',ownerIsResolved:Boolean(owner&&owner===resolved),ownerHasStatline:Boolean(owner?.querySelector('.statline')||owner?.matches('.statline')),sectionAfterOwner:Boolean(owner&&section&&(owner.compareDocumentPosition(section)&Node.DOCUMENT_POSITION_FOLLOWING))};
  });
  assert.ok(profile.id,`${name}: logical Profile target missing`);
  assert.equal(profile.ownerIsResolved,true,`${name}: Profile did not resolve to its earliest visual owner`);
  assert.equal(profile.ownerHasStatline,true,`${name}: Profile visual anchor does not contain the unit statline`);
  assert.equal(profile.sectionAfterOwner,true,`${name}: Weapons content does not follow the Profile visual anchor`);
  const last=(await navSnapshot(page)).targets.at(-1);if(last!==profile.id)await clickSection(page,last);
  await clickSection(page,profile.id);
  const aligned=await page.evaluate(id=>{
    const section=document.getElementById(id),resolved=window.WHNavigationTargets.resolve(section),anchor=resolved.scrollTarget,nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect(),unit=section.closest('.unit-card');
    const members=Array.isArray(resolved.highlightTarget)?resolved.highlightTarget:[resolved.highlightTarget],statlines=[...unit.querySelectorAll('.statline')],bases=[...unit.querySelectorAll('.profile-base')],highlighted=[...unit.querySelectorAll('.destination-highlight')];
    const top=anchor.getBoundingClientRect().top,gap=window.DG_APP.navigation.trackingGap;
    return{visibleBelowNav:top>=nav.bottom-1&&top<=nav.bottom+gap+4,anchorBeforeSection:Boolean(anchor.compareDocumentPosition(section)&Node.DOCUMENT_POSITION_FOLLOWING),statlines:statlines.length,members:members.length,membersHighlighted:members.every(member=>member.classList.contains('destination-highlight')),statlinesHighlighted:statlines.every(statline=>Boolean(statline.closest('.destination-highlight'))),basesHighlighted:bases.every(base=>Boolean(base.closest('.destination-highlight'))),sectionHighlighted:section.classList.contains('destination-highlight'),unexpectedHighlighted:highlighted.filter(node=>!members.includes(node)).length,lifecycleTargets:window.DG_APP.navigation.highlighter.current.length,lifecycleTimer:Boolean(window.DG_APP.navigation.highlighter.timer)};
  },profile.id);
  assert.equal(aligned.visibleBelowNav,true,`${name}: Profile command did not expose the unit statline below the Datasheet nav`);
  assert.equal(aligned.anchorBeforeSection,true,`${name}: Profile command still lands at Weapons`);
  assert.ok(aligned.statlines>=1,`${name}: mounted Datasheet lost its statline`);
  assert.ok(aligned.members>=2,`${name}: logical Profile feedback does not span statline and Weapons content`);
  assert.equal(aligned.membersHighlighted,true,`${name}: logical Profile members are not highlighted together`);
  assert.equal(aligned.statlinesHighlighted,true,`${name}: Profile feedback excludes the unit statline`);
  assert.equal(aligned.basesHighlighted,true,`${name}: Profile feedback excludes Base`);
  assert.equal(aligned.sectionHighlighted,true,`${name}: Profile feedback excludes Profile/Weapons content`);
  assert.equal(aligned.unexpectedHighlighted,0,`${name}: stale destination highlight survived Profile selection`);
  assert.equal(aligned.lifecycleTargets,aligned.members,`${name}: Highlighter lost logical Profile members`);
  assert.equal(aligned.lifecycleTimer,true,`${name}: logical Profile feedback has no shared clear lifecycle`);
  return profile.id;
};
const reloadContract=async(page,name,{unitId,sectionId='',expectedScroll=null}={})=>{
  await page.evaluate(()=>{window.__phone2dScrollCalls=[];});
  await page.reload({waitUntil:'load'});await waitForApp(page);await page.waitForFunction(id=>document.querySelector('.document .unit-card')?.id===id,unitId);
  if(sectionId)await waitForHash(page,sectionId);
  await page.waitForFunction(()=>window.DG_APP.navigation.state.owner==='reader');
  await page.waitForTimeout(300);
  const first=await page.evaluate(sectionId=>{
    const section=sectionId?document.getElementById(sectionId):null,anchor=section?window.WHNavigationTargets.resolve(section).scrollTarget:null,nav=document.querySelector('.unit-card > .local-nav')?.getBoundingClientRect();
    const top=anchor?.getBoundingClientRect().top,gap=window.DG_APP.navigation.trackingGap,logical=window.WHNavigationTargets.resolve(section).kind==='logical-section';
    return{scrollY,calls:window.__phone2dScrollCalls||[],unitId:document.querySelector('.document .unit-card')?.id||'',units:document.querySelectorAll('.document .unit-card').length,owners:document.querySelector('.document')?.children.length||0,restoration:history.scrollRestoration,anchorAligned:!anchor||!nav?null:logical?top>=nav.bottom-1&&top<=nav.bottom+gap+4:Math.abs(top-nav.bottom-gap)<=3};
  },sectionId);
  await page.waitForTimeout(350);
  const late=await page.evaluate(()=>scrollY);
  assert.equal(first.unitId,unitId,`${name}: reload mounted the wrong Datasheet`);
  assert.equal(first.units,1,`${name}: reload regressed PHONE-1 single-target mount`);
  assert.equal(first.owners,1,`${name}: reload mounted unrelated terminal content`);
  assert.equal(first.restoration,'manual',`${name}: native scroll restoration contract changed`);
  assert.ok(first.calls.length<=1,`${name}: competing reload scroll owners remain`);
  assert.equal(first.calls.some(call=>call.stack.includes('glossary-return.js')),false,`${name}: PageState still scrolls the Army Book directly`);
  assert.ok(Math.abs(late-first.scrollY)<=2,`${name}: late reload scroll movement detected`);
  if(sectionId)assert.equal(first.anchorAligned,true,`${name}: section reload restored the wrong visual anchor`);
  if(Number.isFinite(expectedScroll))assert.ok(Math.abs(first.scrollY-expectedScroll)<=4,`${name}: saved plain-Datasheet scroll was not restored`);
  return first;
};
const auditCoverage=page=>page.evaluate(async()=>{
  const ids=window.WHArmyBookTargetMount.catalog.nodes.filter(node=>node.kind==='target'&&node.id.startsWith('unit-')).map(node=>node.id);
  const result={datasheets:ids.length,missing:[],orphan:[],duplicates:[],order:[],ownership:[],commands:[],stratagemDatasheets:0,stratagemNavDatasheets:0,baseDatasheets:0};
  for(const id of ids){
    window.WHArmyBookTargetMount.ensure(id);
    const unit=document.getElementById(id),nav=unit?.querySelector(':scope > .local-nav');
    await Promise.all([...unit.querySelectorAll('img')].map(image=>image.complete?Promise.resolve():new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});})));
    const sections=[...unit.querySelectorAll('.unit-part[id]')],sectionIds=sections.map(section=>section.id),targets=[...nav.querySelectorAll('[data-journey-target]')].map(button=>button.dataset.journeyTarget),targetSet=new Set(targets);
    for(const sectionId of sectionIds)if(!targetSet.has(sectionId))result.missing.push(`${id}:${sectionId}`);
    for(const target of targets)if(!sectionIds.includes(target))result.orphan.push(`${id}:${target}`);
    if(targetSet.size!==targets.length)result.duplicates.push(id);
    const commands=[...nav.querySelectorAll('[data-datasheet-command="stratagems"]')];if(commands.length!==1||nav.lastElementChild!==commands[0]||commands[0].hasAttribute('data-journey-target'))result.commands.push(id);
    const statlines=[...unit.querySelectorAll('.statline')],bases=[...unit.querySelectorAll('.profile-base')],profile=sections.find(section=>section.id.endsWith('-profile'))||sections[0],before=(left,right)=>Boolean(left&&right&&(left.compareDocumentPosition(right)&Node.DOCUMENT_POSITION_FOLLOWING));
    if(!statlines.every(statline=>before(nav,statline)))result.order.push(id);
    const logicalOwner=node=>node.dataset.logicalOwner||node.closest('[data-logical-owner]')?.dataset.logicalOwner||'';
    if(![...statlines,...bases].every(node=>logicalOwner(node)===profile?.id))result.ownership.push(id);
    if(bases.length)result.baseDatasheets+=1;
    const stratagems=sections.filter(section=>/\bstratagems?\b/i.test(section.querySelector(':scope > h4,:scope > h3')?.textContent||''));
    if(stratagems.length){result.stratagemDatasheets+=1;if(stratagems.every(section=>targetSet.has(section.id)))result.stratagemNavDatasheets+=1;}
  }
  return result;
});

async function drawerStackContract(page,name){
  const menu=page.locator('#navMenu'),scrim=page.locator('#tocScrim');
  const horizontal=await page.evaluate(()=>{const nav=document.querySelector('.unit-card > .local-nav');nav.scrollLeft=Math.min(48,Math.max(0,nav.scrollWidth-nav.clientWidth));window.__phone2cNavClicks=0;if(!nav.dataset.phone2cProbe){nav.dataset.phone2cProbe='true';nav.addEventListener('click',()=>window.__phone2cNavClicks+=1,true);}return nav.scrollLeft;});
  for(let cycle=0;cycle<3;cycle+=1){
    await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-drawer-open'));
    const open=await page.evaluate(()=>{
      const nav=document.querySelector('.unit-card > .local-nav'),panel=document.getElementById('tocPanel'),scrim=document.getElementById('tocScrim'),header=document.getElementById('appHeader'),navBox=nav.getBoundingClientRect(),panelBox=panel.getBoundingClientRect();
      const y=Math.min(navBox.bottom-3,Math.max(navBox.top+3,panelBox.top+5)),panelX=Math.min(panelBox.right-5,Math.max(panelBox.left+5,navBox.left+5)),scrimX=Math.min(navBox.right-3,Math.max(panelBox.right+5,navBox.left+5)),panelHit=document.elementFromPoint(panelX,y),scrimHit=document.elementFromPoint(scrimX,y);
      return{navZ:Number(getComputedStyle(nav).zIndex),scrimZ:Number(getComputedStyle(scrim).zIndex),drawerZ:Number(getComputedStyle(panel).zIndex),headerZ:Number(getComputedStyle(header).zIndex),mainInert:document.getElementById('main').inert,panelCovered:panel===panelHit||panel.contains(panelHit),scrimCovered:scrim===scrimHit,scrollLeft:nav.scrollLeft,panelX,scrimX,y};
    });
    assert.ok(open.navZ<open.scrimZ&&open.scrimZ<open.drawerZ&&open.drawerZ<open.headerZ,`${name}: shared sticky/drawer stack is invalid`);
    assert.equal(open.mainInert,true,`${name}: drawer did not make the Datasheet inert`);
    assert.equal(open.panelCovered,true,`${name}: sticky nav is visible above the drawer`);
    assert.equal(open.scrimCovered,true,`${name}: sticky nav is visible above the scrim`);
    assert.ok(Math.abs(open.scrollLeft-horizontal)<=1,`${name}: opening drawer reset local-nav horizontal position`);
    if(cycle===2){await page.mouse.click(open.scrimX,open.y);}else await menu.click();
    await page.waitForFunction(()=>!document.body.classList.contains('nav-drawer-open'));
    const closed=await page.evaluate(()=>{const nav=document.querySelector('.unit-card > .local-nav'),header=document.getElementById('appHeader');return{mainInert:document.getElementById('main').inert,clicks:window.__phone2cNavClicks,scrollLeft:nav.scrollLeft,stickyDelta:Math.abs(nav.getBoundingClientRect().top-header.getBoundingClientRect().bottom)};});
    assert.equal(closed.mainInert,false,`${name}: closing drawer left the Datasheet inert`);
    assert.equal(closed.clicks,0,`${name}: pointer event reached the sticky nav through drawer/scrim`);
    assert.ok(Math.abs(closed.scrollLeft-horizontal)<=1,`${name}: closing drawer reset local-nav horizontal position`);
    assert.ok(closed.stickyDelta<=2,`${name}: closing drawer did not restore sticky nav geometry`);
  }
  if(name==='Adeptus Mechanicus'){
    await page.locator('[data-datasheet-command="stratagems"]').click();await page.waitForFunction(()=>{const layer=document.querySelector('.related-rules-layer');return !layer?.hidden&&layer.querySelector('[data-kind="stratagems"][aria-pressed="true"]');});
    await page.locator('.related-rules-close').click();await page.waitForFunction(()=>document.querySelector('.related-rules-layer')?.hidden===true);
  }
}

async function phoneBook(page,name,id){
  const observed=observe(page);
  await installScrollProbe(page);
  await page.goto(`${origin}/books/${id}/reader.html?view=mobile#start`);await waitForApp(page);
  const [first,second]=await unitIds(page);assert.ok(first&&second,`${name}: representative Datasheets missing`);
  await page.goto(`${origin}/books/${id}/reader.html?view=mobile#${first}`);await waitForApp(page);await waitForHash(page,first);
  await page.waitForFunction(target=>document.querySelector('.document .unit-card')?.id===target,first);
  let snapshot=await navSnapshot(page);
  assert.equal(snapshot.unitId,first,`${name}: deep link mounted wrong Datasheet`);
  assert.equal(snapshot.units,1,`${name}: PHONE-1 unit count regressed`);
  assert.equal(snapshot.terminalOwners.length,1,`${name}: multiple terminal targets are live`);
  assert.equal(snapshot.navs,1,`${name}: duplicate or missing Datasheet nav`);
  assert.equal(snapshot.role,'navigation',`${name}: nav semantics missing`);
  assert.equal(snapshot.label,'Datasheet sections',`${name}: nav accessible label missing`);
  assert.equal(snapshot.position,'sticky',`${name}: nav is not sticky`);
  assert.equal(snapshot.mapped,true,`${name}: orphan local-nav target`);
  assert.deepEqual(snapshot.commands,['stratagems'],`${name}: Stratagems command missing or duplicated`);
  assert.equal(snapshot.commandLast,true,`${name}: Stratagems command is not final`);
  assert.equal(snapshot.commandJourneyTargets,0,`${name}: Stratagems command became a fake scroll target`);
  assert.notEqual(snapshot.navBackground,'rgba(0, 0, 0, 0)',`${name}: sticky nav surface is transparent`);
  assert.notEqual(snapshot.navBackground,'transparent',`${name}: sticky nav surface is transparent`);
  assert.equal(snapshot.navOpacity,'1',`${name}: sticky nav surface is translucent`);
  assert.ok(snapshot.commandMinHeight>=38,`${name}: Stratagems command tap affordance is too small`);
  assert.ok(snapshot.commandWeight>=700,`${name}: sticky nav labels are too weak`);
  assert.notEqual(snapshot.commandBorder,'none',`${name}: Stratagems command has no visible affordance`);
  assert.equal(snapshot.active,0,`${name}: persistent active state exists`);
  assert.equal(snapshot.overflow,false,`${name}: page horizontal overflow`);
  assert.equal(snapshot.hiddenTerminalContent,0,`${name}: unrelated terminal content is hidden instead of absent`);
  assert.ok(snapshot.targets.length>=2,`${name}: no useful section navigation`);
  await reloadContract(page,name,{unitId:first});
  const command=page.locator('[data-datasheet-command="stratagems"]');await command.scrollIntoViewIfNeeded();
  const commandBefore=await page.evaluate(()=>({scrollY,hash:location.hash,history:history.length,unitId:document.querySelector('.document .unit-card')?.id||''}));
  await command.click();await page.waitForFunction(()=>{const layer=document.querySelector('.related-rules-layer');return !layer?.hidden&&layer.querySelector('[data-kind="stratagems"][aria-pressed="true"]');});
  const commandOpen=await page.evaluate(()=>{const layer=document.querySelector('.related-rules-layer'),tab=layer?.querySelector('[data-kind="stratagems"]');return{scrollY,hash:location.hash,history:history.length,unitId:document.querySelector('.document .unit-card')?.id||'',dialogUnit:layer?.dataset.unitId||'',stratagemsPressed:tab?.getAttribute('aria-pressed')||'',fakeSection:document.querySelectorAll('.unit-part[data-datasheet-command],.unit-part[id$="-stratagems"]').length};});
  assert.equal(commandOpen.hash,commandBefore.hash,`${name}: Stratagems command changed the hash`);assert.equal(commandOpen.history,commandBefore.history,`${name}: Stratagems command created history`);assert.ok(Math.abs(commandOpen.scrollY-commandBefore.scrollY)<=1,`${name}: Stratagems command scrolled the Datasheet`);assert.equal(commandOpen.unitId,first,`${name}: Stratagems command replaced the mounted Datasheet`);assert.equal(commandOpen.dialogUnit,first,`${name}: Related Rules lost the current Datasheet context`);assert.equal(commandOpen.stratagemsPressed,'true',`${name}: existing Stratagems tab was not activated`);assert.equal(commandOpen.fakeSection,0,`${name}: fake Datasheet-owned Stratagems section was created`);
  await page.locator('.related-rules-close').click();await page.waitForFunction(()=>document.querySelector('.related-rules-layer')?.hidden===true);
  const commandAfter=await page.evaluate(()=>({scrollY,hash:location.hash,unitId:document.querySelector('.document .unit-card')?.id||'',focusCommand:document.activeElement?.matches('[data-datasheet-command="stratagems"]')||false}));assert.equal(commandAfter.hash,commandBefore.hash,`${name}: closing Stratagems changed the hash`);assert.ok(Math.abs(commandAfter.scrollY-commandBefore.scrollY)<=1,`${name}: closing Stratagems changed Datasheet scroll`);assert.equal(commandAfter.unitId,first,`${name}: closing Stratagems changed the mounted Datasheet`);assert.equal(commandAfter.focusCommand,true,`${name}: Related Rules did not restore focus to the Stratagems command`);
  const structure=await structureSnapshot(page);
  assert.equal(structure.headBeforeNav,true,`${name}: Datasheet nav is not below the unit hero`);
  assert.equal(structure.navBeforeStatline,true,`${name}: Datasheet nav is not above the unit statline`);
  assert.equal(structure.statlineBeforeWeapons,true,`${name}: unit statline no longer precedes weapon content`);
  assert.equal(structure.profileOwned,true,`${name}: Profile lost statline/Base semantic ownership`);
  assert.equal(structure.navOwnsStatline,false,`${name}: navigation incorrectly owns the statline`);
  const profileId=await profileAnchorContract(page,name);
  await reloadContract(page,name,{unitId:first,sectionId:profileId});

  const middle=snapshot.targets[Math.floor(snapshot.targets.length/2)],last=snapshot.targets.at(-1);
  await clickSection(page,middle);
  const sticky=await page.evaluate(()=>{const header=document.getElementById('appHeader').getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return{delta:Math.abs(nav.top-header.bottom),overflow:document.documentElement.scrollWidth>window.innerWidth};});
  assert.ok(sticky.delta<=2,`${name}: sticky nav is not aligned to measured header`);assert.equal(sticky.overflow,false,`${name}: sticky nav caused overflow`);
  await drawerStackContract(page,name);
  await page.waitForTimeout(2350);
  assert.equal(await page.locator(`#${middle}.destination-highlight`).count(),0,`${name}: highlight did not clear`);

  await clickSection(page,last);
  assert.equal(await page.evaluate(()=>document.querySelectorAll('[data-datasheet-nav-spacer],.datasheet-nav-spacer,.phone-section-spacer').length),0,`${name}: artificial bottom spacer exists`);
  await page.evaluate(target=>window.DG_APP.navigation.go(target,{historyMode:'push'}),second);await waitForHash(page,second);
  await page.waitForFunction(target=>document.querySelector('.document .unit-card')?.id===target,second);
  snapshot=await navSnapshot(page);
  assert.equal(snapshot.unitId,second,`${name}: replacement mounted wrong Datasheet`);
  assert.equal(snapshot.units,1,`${name}: previous Datasheet remained mounted`);
  assert.equal(snapshot.navs,1,`${name}: old nav survived replacement`);
  assert.equal(await page.locator(`#${first}`).count(),0,`${name}: previous Datasheet remains in live DOM`);
  assert.equal(await page.locator('.destination-highlight').count(),0,`${name}: stale target highlight survived replacement`);
  const coverage=await auditCoverage(page);
  assert.deepEqual(coverage.missing,[],`${name}: real Datasheet sections missing from Phone nav`);
  assert.deepEqual(coverage.orphan,[],`${name}: Phone nav items without real section targets`);
  assert.deepEqual(coverage.duplicates,[],`${name}: duplicate Phone nav targets`);
  assert.deepEqual(coverage.order,[],`${name}: Phone nav/statline order regression`);
  assert.deepEqual(coverage.ownership,[],`${name}: Profile ownership regression`);
  assert.deepEqual(coverage.commands,[],`${name}: Stratagems command contract failed across canonical Datasheets`);
  assert.equal(coverage.stratagemNavDatasheets,coverage.stratagemDatasheets,`${name}: real Stratagems sections missing from Phone nav`);
  coverageTotals.datasheets+=coverage.datasheets;coverageTotals.stratagemDatasheets+=coverage.stratagemDatasheets;coverageTotals.stratagemNavDatasheets+=coverage.stratagemNavDatasheets;coverageTotals.baseDatasheets+=coverage.baseDatasheets;
  assert.deepEqual(observed.errors,[],`${name}: console errors`);assert.deepEqual(observed.failed,[],`${name}: failed requests`);
  return{first,second};
}

async function amBehavior(page){
  await installScrollProbe(page);
  await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(page);
  const nav=await navSnapshot(page);assert.equal(nav.unitId,'unit-onager-dunecrawler','AM: Onager was not mounted');
  assert.equal(await page.locator('#unit-onager-dunecrawler .unit-art-background img, #unit-onager-dunecrawler .unit-art img').count(),1,'AM: translucent unit artwork missing');
  const onagerStructure=await structureSnapshot(page);assert.equal(onagerStructure.statlines,1,'AM: Onager must have exactly one unit statline');assert.equal(onagerStructure.navBeforeStatline,true,'AM: Onager nav is below its statline');assert.equal(onagerStructure.statlineBeforeWeapons,true,'AM: Onager nav appears to belong to weapon statistics');assert.equal(onagerStructure.profileOwned,true,'AM: Onager Profile ownership changed');
  const target=nav.targets[Math.floor(nav.targets.length/2)];
  await page.evaluate(id=>{const section=document.getElementById(id),scrollTarget=window.WHNavigationTargets.resolve(section).scrollTarget,top=scrollY+scrollTarget.getBoundingClientRect().top;window.scrollTo({top:Math.max(0,top-innerHeight*.68),behavior:'instant'});},target);
  const before=await page.evaluate(id=>{const section=document.getElementById(id),scrollTarget=window.WHNavigationTargets.resolve(section).scrollTarget,rect=scrollTarget.getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect(),gap=window.DG_APP.navigation.trackingGap,max=document.documentElement.scrollHeight-innerHeight;return{scrollY,top:rect.top,navBottom:nav.bottom,gap,max,viewportHeight:innerHeight,destination:scrollY+rect.top-nav.bottom-gap};},target);
  assert.ok(before.top>before.navBottom+before.gap+10&&before.top<before.viewportHeight,'AM: no real already-visible middle-section fixture');
  assert.ok(before.destination<before.max-2,'AM: already-visible fixture cannot physically align upward');
  await clickSection(page,target);
  const after=await page.evaluate(id=>{const section=document.getElementById(id),scrollTarget=window.WHNavigationTargets.resolve(section).scrollTarget,nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return{scrollY,top:scrollTarget.getBoundingClientRect().top,navBottom:nav.bottom,gap:window.DG_APP.navigation.trackingGap};},target);
  assert.ok(after.scrollY>before.scrollY+1,'AM: already-visible target did not move upward');
  assert.ok(Math.abs(after.top-after.navBottom-after.gap)<=3,'AM: already-visible target did not align to the usable viewport top');
  await page.evaluate(()=>{const header=document.getElementById('appHeader');header.dataset.phone2aHeight=header.style.height;header.style.height=`${header.getBoundingClientRect().height+18}px`;});
  await page.waitForFunction(()=>{const header=document.getElementById('appHeader').getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return Math.abs(nav.top-header.bottom)<=2;});
  await page.evaluate(()=>{const header=document.getElementById('appHeader');header.style.height=header.dataset.phone2aHeight||'';delete header.dataset.phone2aHeight;});
  await page.waitForFunction(()=>{const header=document.getElementById('appHeader').getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return Math.abs(nav.top-header.bottom)<=2;});
  const last=nav.targets.at(-1);await page.locator(`[data-journey-target="${last}"]`).click();await waitForHash(page,last);await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('destination-highlight'),last);
  const bottom=await page.evaluate(()=>({scrollY,max:document.documentElement.scrollHeight-innerHeight}));assert.ok(Math.abs(bottom.scrollY-bottom.max)<=2,'AM: final section did not use natural bottom clamp');

  const firstSection=nav.targets[0];await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#${firstSection}`);await waitForApp(page);await waitForHash(page,firstSection);
  assert.equal((await navSnapshot(page)).unitId,'unit-onager-dunecrawler','AM: section deep link did not mount owning Datasheet');
  const abilities=nav.targets.find(id=>id.endsWith('-abilities'));assert.ok(abilities,'AM: Abilities section missing');await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#${abilities}`);await waitForApp(page);await reloadContract(page,'AM Abilities',{unitId:'unit-onager-dunecrawler',sectionId:abilities});
  await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(page);const manualY=await page.evaluate(()=>{const max=document.documentElement.scrollHeight-innerHeight,top=Math.round(max*.46);window.scrollTo({top,behavior:'instant'});return scrollY;});await reloadContract(page,'AM manual scroll',{unitId:'unit-onager-dunecrawler',expectedScroll:manualY});
  const middle=nav.targets[Math.floor(nav.targets.length/2)];await clickSection(page,middle);await clickSection(page,last);await page.goBack();await waitForHash(page,middle);await page.goForward();await waitForHash(page,last);

  await page.setViewportSize({width:1280,height:720});await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(page);
  assert.equal((await navSnapshot(page)).units,1,'AM: forced Phone lost single-target mount');assert.equal((await navSnapshot(page)).position,'sticky','AM: forced Phone nav is not sticky');
}

async function desktopBook(page,name,id){
  await page.goto(`${origin}/books/${id}/reader.html?view=full#datasheets`);await waitForApp(page);
  const state=await page.evaluate(()=>({units:document.querySelectorAll('.document .unit-card').length,position:getComputedStyle(document.querySelector('.unit-card > .local-nav')).position,phone:document.documentElement.hasAttribute('data-phone-single-target')}));
  assert.ok(state.units>1,`${name}: Desktop no longer mounts full book`);assert.notEqual(state.position,'sticky',`${name}: Phone sticky styling leaked to Desktop`);assert.equal(state.phone,false,`${name}: Desktop entered Phone mode`);
}

try{
  const phone=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{for(const [name,id] of books){const page=await phone.newPage();try{await phoneBook(page,name,id);}finally{await page.close();}}const page=await phone.newPage();try{await amBehavior(page);}finally{await page.close();}}finally{await phone.close();}
  const desktop=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}});
  try{const page=await desktop.newPage();for(const [name,id] of books)await desktopBook(page,name,id);}finally{await desktop.close();}
  console.log(`Datasheet nav coverage: ${coverageTotals.datasheets} Datasheets; missing sections 0; orphan targets 0; real Stratagems sections ${coverageTotals.stratagemDatasheets}; Stratagems represented ${coverageTotals.stratagemNavDatasheets}; Datasheets with Base ${coverageTotals.baseDatasheets}.`);
  console.log('PHONE-2D Profile anchor and reload restoration QA: PASS (9/9).');
  console.log('PHONE-2C sticky Datasheet nav/drawer stacking QA: PASS (9/9).');
  console.log('Shared Army Book PHONE-2 Datasheet section navigation QA: PASS (9/9).');
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
