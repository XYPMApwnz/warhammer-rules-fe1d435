(async function () {
  'use strict';

  const scriptUrl=document.currentScript.src;
  const compatibleRuntime=await import(new URL('../scripts/compatible-stratagems-runtime.mjs?v=3',scriptUrl))
    .catch(error=>{console.warn('Compatible Stratagems unavailable.',error);return null;});

  const navButton = document.getElementById('navButton');
  const scrim = document.getElementById('navScrim');
  const dialog = document.getElementById('termDialog');
  const popupLayer = document.getElementById('termPopupStack');
  const nav = document.getElementById('mobileNav');
  const viewSwitch = document.querySelector('[data-view-switch]');
  const rosterGuides = document.querySelector('[data-roster-guides-link]');
  const relatedRules = document.getElementById('relatedRules');
  const relatedContent = document.getElementById('relatedRulesContent');
  const relatedDetachment = document.getElementById('relatedDetachment');
  const drawerMedia = window.matchMedia('(max-width: 800px)');
  let gesture = null;
  let suppressed = null;
  let relatedLoaded = false;
  let relatedKind = 'stratagems';
  const unit = document.querySelector('.unit-card');
  const params = new URLSearchParams(location.search);
  const rosterMode = params.has('roster');
  const terms=Object.freeze({...window.WH40K_GLOSSARY.forBook('death-guard')});
  window.WHGlossaryAutolink?.configure('death-guard');
  const popups=new window.DGPhonePopups({dialog,layer:popupLayer,terms,safeFallback:()=>navButton});
  const slug = value => String(value || '').toLowerCase().replace(/['\u2019]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const weaponFamily=value=>normalize(String(value||'').replace(/^[^A-Za-z0-9]+/,'').replace(/\s+(?:[-\u2013\u2014])\s+[^-\u2013\u2014]+$/,'').replace(/\s+(?:strike|sweep|standard|supercharge|witchfire|focused witchfire)$/i,''));
  const loadoutIncludesProfile=(loadout,profile)=>{const family=weaponFamily(profile);return Boolean(family)&&[].concat(loadout||[]).some(label=>normalize(label).includes(family));};
  const unitLoadout=unit=>[unit.wargear,...(unit.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(loadout=>loadout.wargear)])].filter(Boolean);
  const unitRows=unit=>unit.models?.length?unit.models.flatMap(model=>model.loadouts?.length?model.loadouts.map(loadout=>[loadout.quantity,model.name,loadout.wargear]):[[model.quantity,model.name,model.wargear]]):[[unit.quantity,unit.name,unit.wargear]];
  const unitModelCount=unit=>unitRows(unit).reduce((total,row)=>total+(Number(row[0])||0),0);
  const renderGroupLabel=(control,base,group,split)=>{const primary=document.createElement('span'),name=document.createElement('span');primary.style.cssText='display:flex;justify-content:space-between;gap:8px;';name.textContent=`${base}${group.units.length>1?` ×${group.units.length}`:''}`;primary.append(name);if(split&&group.units.length===1){const marker=document.createElement('small');marker.textContent=`#${group.numbers[0]}`;marker.style.opacity='.72';primary.append(marker);}control.replaceChildren(primary);if(split){const meta=document.createElement('small'),models=unitModelCount(group.units[0]);meta.textContent=`${models} ${models===1?'model':'models'} · ${group.units[0].points} pts${group.units.length>1?' each':''}`;meta.style.cssText='display:block;margin-top:2px;opacity:.72;font-weight:500;';control.append(meta);}};
  const resolveRosterDetachmentIds=(normalizedIds,availableIds)=>{const ids=[...new Set(normalizedIds.filter(Boolean))];return ids.length&&ids.every(id=>availableIds.filter(candidate=>candidate===id).length===1)?ids:null;};
  let relatedRulesEnabled = Boolean(compatibleRuntime?.compatibleStratagemsReviewEnabled);
  let compatibleRulesMatrix = null;
  let assignedEnhancementIds = rosterMode ? new Set() : null;
  let rosterDetachmentIds = [];
  if (!relatedRulesEnabled) relatedRules?.remove();

  if (rosterMode) {
    try {
      if (!window.WHRosterParser) throw new Error('Roster runtime unavailable');
      const records = JSON.parse(localStorage.getItem('wh40k-rosters-v1')) || [];
      const record = records.find(item => item?.id === params.get('roster'));
      if (!record) throw new Error('Roster not found');
      const parsed = record?.sourceText ? window.WHRosterParser.parse(record.sourceText) : record?.roster;
      if (!parsed || !Array.isArray(parsed.units)) throw new Error('Roster data unavailable');
      const faction=String(parsed.faction||'').replace(/^Chaos\s*[-–—]\s*/i,'').trim().toLowerCase();
      if(faction!=='death guard')throw new Error('Roster faction unavailable');
      const rosterById=new Map(parsed.units.map(unit=>[unit.id,unit])),attachments={},usedCharacters=new Set();
      for(const [bodyguardId,characterIds] of Object.entries(record.attachments||{})){if(!rosterById.has(bodyguardId))continue;const valid=(characterIds||[]).filter(id=>rosterById.has(id)&&!usedCharacters.has(id));valid.forEach(id=>usedCharacters.add(id));if(valid.length)attachments[bodyguardId]=valid;}
      const attachmentStateKey=unit=>[(attachments[unit.id]||[]).map(id=>slug(rosterById.get(id)?.name)).filter(Boolean).sort().join(','),Object.entries(attachments).filter(([,ids])=>ids.includes(unit.id)).map(([id])=>slug(rosterById.get(id)?.name)).sort().join(',')].join('|');
      const enhancements=parsed.enhancements||[],enhancementsByOwnerId=new Map();
      for(const enhancement of enhancements){if(enhancement?.ownerStatus!=='resolved'||!enhancement.ownerUnitId)continue;const owned=enhancementsByOwnerId.get(enhancement.ownerUnitId)||[];owned.push(enhancement);enhancementsByOwnerId.set(enhancement.ownerUnitId,owned);}
      const enrichedEnhancements=window.WHRosterEnhancements?.enriched?.(parsed)||enhancements,enhancementIdentity=item=>item?.id||item?.ruleId||`enhancement-${slug(item?.name)}`;
      const attachmentGroupIds=unit=>{const bodyguardId=attachments[unit.id]?unit.id:Object.entries(attachments).find(([,ids])=>ids.includes(unit.id))?.[0];return bodyguardId?[bodyguardId,...(attachments[bodyguardId]||[])]:[unit.id];};
      const attachmentEnhancementStateKey=unit=>attachmentGroupIds(unit).flatMap(id=>enrichedEnhancements.filter(item=>item?.ownerStatus==='resolved'&&item.ownerUnitId===id).map(item=>`${id}:${enhancementIdentity(item)}`)).sort().join(',');
      const stateKey=unit=>[unit.points||0,unit.warlord?1:0,unitRows(unit).map(row=>`${row[0]||0}:${normalize(row[1])}:${normalize(row[2])}`).sort().join('|'),unitLoadout(unit).map(normalize).sort().join('|'),(enhancementsByOwnerId.get(unit.id)||[]).map(item=>`${item.ruleId||item.id||slug(item.name)}:${item.points||0}:${slug(item.detachment)}`).sort().join('|'),attachmentStateKey(unit),attachmentEnhancementStateKey(unit)].join('\0');
      const grouped=new Map(),ordinals=new Map();
      for(const rosterUnit of parsed.units){const id=slug(rosterUnit.name),number=(ordinals.get(id)||0)+1,groups=grouped.get(id)||[],state=stateKey(rosterUnit);ordinals.set(id,number);let group=groups.find(candidate=>candidate.state===state);if(!group){group={state,units:[],numbers:[],points:0,loadout:[]};groups.push(group);grouped.set(id,groups);}group.units.push(rosterUnit);group.numbers.push(number);group.points+=rosterUnit.points;group.loadout.push(...unitLoadout(rosterUnit));}
      const selected=new Set(grouped.keys());
      const normalizedDetachmentIds = (parsed.detachments?.length ? parsed.detachments.map(item => item.name || item.label) : [parsed.detachment]).map(slug).filter(Boolean);
      const detachmentLinks=[...nav.querySelectorAll('.phone-tree > details:first-of-type .mobile-nav-branch > a')];
      rosterDetachmentIds = resolveRosterDetachmentIds(normalizedDetachmentIds,detachmentLinks.map(link=>slug(link.textContent.replace(/\s+\d+\s*DP$/i,''))));
      if (!rosterDetachmentIds) throw new Error('Roster Detachment unavailable');
      if(relatedDetachment){relatedDetachment.value = 'all';relatedDetachment.closest('label')?.remove();}
      window.DG_ROSTER_GUIDE=Object.freeze({detachmentIds:rosterDetachmentIds});
      const unitSlug = unit?.id.replace(/^unit-/, '');
      const groups=grouped.get(unitSlug)||[],active=groups.find(group=>group.units.some(item=>item.id===params.get('instance')))||groups[0],matching=active?.units||[];
      if(unit&&!matching.length)throw new Error('Roster unit unavailable');
      const ownerIds=new Set(matching.map(item=>item.id));
      assignedEnhancementIds=new Set(enhancements.filter(item=>item.ownerStatus==='resolved'&&ownerIds.has(item.ownerUnitId)).map(item=>`enhancement-${slug(item.name)}`));
      if(matching.length){
        const points=unit.querySelector('.points'),models=unitModelCount(active.units[0]),unitPoints=active.units[0].points;
        if(points){const value=document.createElement('strong');value.textContent=matching.length>1?`Roster · ${matching.length} units · ${models} models each · ${unitPoints} pts each`:`Roster · ${models} ${models===1?'model':'models'} · ${active.points} pts`;points.replaceChildren(value);}
        const composition=unit.querySelector('[id$="-composition"] .ability-list');
        if(composition){const rows=new Map();for(const item of matching)for(const row of unitRows(item)){const key=`${row[1]}\0${row[2]||''}`,prior=rows.get(key);rows.set(key,{quantity:(prior?.quantity||0)+(row[0]||0),name:row[1],wargear:row[2]});}const block=document.createElement('div'),title=document.createElement('strong'),list=document.createElement('ul');block.className='content-block roster-composition';title.textContent='Roster loadout';block.append(title);for(const row of rows.values()){const item=document.createElement('li');item.textContent=`${row.quantity}× ${row.name}${row.wargear?` — ${row.wargear}`:''}`;list.append(item);}block.append(list);composition.replaceChildren(block);}
        window.WHRosterEnhancements?.decorate(unit,parsed,matching);
        if(active.loadout.length){unit.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{const weapon=row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent;if(weapon&&!loadoutIncludesProfile(active.loadout,weapon))row.remove();});unit.querySelectorAll('.weapon-group').forEach(group=>{if(!group.querySelector('.weapon-row:not(.weapon-head)'))group.remove();});}
        const facts=JSON.parse(unit.dataset.ruleFacts||'{}'),hasRelation=(key,target)=>(facts.relations?.[key]||[]).some(item=>item.unitId===target),addTag=(row,label,term)=>{const host=row.querySelector('.weapon-tags');if(!host||[...host.children].some(item=>normalize(item.textContent)===normalize(label)))return;const tag=document.createElement('button');tag.type='button';tag.className='tag roster-modified-value';tag.dataset.term=term;tag.dataset.rosterDerivedEffect='attached-lord-of-contagion';tag.textContent=label;host.append(tag);};
        if(unitSlug==='deathshroud-terminators'&&terms['ability-vector-of-disease-2498580']&&hasRelation('canBeLedBy','unit-lord-of-contagion')&&active.units.some(bodyguard=>(attachments[bodyguard.id]||[]).some(id=>slug(rosterById.get(id)?.name)==='lord-of-contagion'))){[...unit.querySelectorAll('.weapon-group')].filter(group=>normalize(group.querySelector('h5')?.textContent).startsWith('melee weapons')).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]).forEach(row=>{addTag(row,'SUSTAINED HITS 1','core-sustained-hits');addTag(row,'LANCE','core-lance');});}
        if(unitSlug==='lord-of-contagion'&&terms['ability-silent-bodyguard-03a0a1b']&&hasRelation('canLead','unit-deathshroud-terminators')&&active.units.some(character=>Object.entries(attachments).some(([id,ids])=>ids.includes(character.id)&&slug(rosterById.get(id)?.name)==='deathshroud-terminators'))){const host=unit.querySelector('[id$="-abilities"] .ability-list');if(host&&!host.querySelector('[data-roster-derived-effect="silent-bodyguard"]')){const ability=document.createElement('article'),title=document.createElement('h5'),line=document.createElement('p'),tag=document.createElement('button');ability.className='ability roster-enhanced-ability';ability.dataset.rosterDerivedEffect='silent-bodyguard';title.textContent='Silent Bodyguard';tag.type='button';tag.className='term-button roster-modified-value';tag.dataset.term='core-feel-no-pain';tag.textContent='Feel No Pain 4+';line.append(tag);ability.append(title,line);host.append(ability);}}
        const DG_RULE={destroyer:'ability-the-destroyer-hive-70f0cc1',foul:'ability-foul-infusion-490467e',icon:'ability-unclean-icon-5dadb9e',shroud:'ability-shroud-of-disease-90475da',virulent:'ability-virulent-aura-c28aa51',vitality:'ability-sickening-vitality-89bb5ff',malicious:'ability-malicious-calculations-8505f03',froth:'ability-froth-spattered-frenzy-9a139e5',dronesInstrument:'plague-drones-ability-instrument-of-chaos',bearersInstrument:'plaguebearers-ability-instrument-of-chaos',strains:'detachment-rule-hypervirulent-strains'},DG_ENH={regeneration:'enhancement-revolting-regeneration',pipes:'enhancement-witherbone-pipes',sorrowsyphon:'enhancement-sorrowsyphon',talisman:'enhancement-talisman-of-burgeoning',vigour:'enhancement-vile-vigour',helm:'enhancement-helm-of-the-fly-king',plagueveil:'enhancement-plagueveil'};
        const canonicalUnitId=item=>`unit-${slug(item?.name)}`,bodyguardFor=item=>{const id=attachments[item.id]?item.id:Object.entries(attachments).find(([,ids])=>ids.includes(item.id))?.[0];return id?rosterById.get(id):null;},attachedGroup=item=>{const bodyguard=bodyguardFor(item),ids=bodyguard&&attachments[bodyguard.id];return ids?.length?[bodyguard,...ids.map(id=>rosterById.get(id)).filter(Boolean)]:null;},attachedLeader=(item,sourceId)=>attachedGroup(item)?.find(member=>member.id!==bodyguardFor(item)?.id&&canonicalUnitId(member)===sourceId),ownsEnhancement=(item,id)=>enrichedEnhancements.some(enhancement=>enhancement?.ownerStatus==='resolved'&&enhancement.ownerUnitId===item.id&&enhancementIdentity(enhancement)===id),attachedEnhancementOwner=(item,id)=>attachedGroup(item)?.find(member=>member.id!==bodyguardFor(item)?.id&&ownsEnhancement(member,id)),entryEvery=test=>Boolean(active.units.length)&&active.units.every(test),from=sourceId=>entryEvery(item=>Boolean(attachedLeader(item,sourceId)));
        const weaponRows=type=>[...unit.querySelectorAll('.weapon-group')].filter(group=>!type||normalize(group.querySelector('h5')?.textContent).startsWith(`${type} weapons`)).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]),markEffect=(node,effect)=>{const effects=new Set((node.dataset.rosterDerivedEffects||'').split(' ').filter(Boolean));if(effects.has(effect))return false;effects.add(effect);node.dataset.rosterDerivedEffects=[...effects].join(' ');node.classList.add('roster-modified-value');return true;};
        const modifyModelStat=(label,delta,effect)=>{const stat=[...unit.querySelectorAll('.stat')].find(item=>normalize(item.querySelector('b')?.textContent)===normalize(label)),value=stat?.querySelector('span');if(!value||!markEffect(value,effect))return;const match=value.textContent.trim().match(/^(-?\d+)(.*)$/);if(match)value.textContent=`${Number(match[1])+delta}${match[2]}`;},setModelStat=(label,next,effect)=>{const stat=[...unit.querySelectorAll('.stat')].find(item=>normalize(item.querySelector('b')?.textContent)===normalize(label)),value=stat?.querySelector('span');if(value&&markEffect(value,effect))value.textContent=next;},modifyWeaponStat=(row,label,delta,effect)=>{const head=row.parentElement?.querySelector('.weapon-head'),columns=[...(head?.children||[])],index=columns.findIndex(item=>normalize(item.textContent)===normalize(label)),cell=index>=0?row.children[index]:null;if(!cell||!markEffect(cell,`${effect}-${label}`))return;const text=cell.textContent.trim(),dice=text.match(/^(\d*D\d+)([+-]\d+)?$/i),match=text.match(/^(-?\d+)(.*)$/);if(dice){const next=Number(dice[2]||0)+delta;cell.textContent=`${dice[1]}${next?`${next>0?'+':''}${next}`:''}`;}else if(match)cell.textContent=`${Number(match[1])+delta}${match[2]}`;};
        const addDerivedAbility=(effect,title,summary,term)=>{const host=unit.querySelector('[id$="-abilities"] .ability-list');if(!host||host.querySelector(`[data-roster-derived-effect="${effect}"]`))return;const ability=document.createElement('article'),heading=document.createElement('h5'),line=document.createElement('p');ability.className='ability roster-enhanced-ability';ability.dataset.rosterDerivedEffect=effect;heading.textContent=title;line.textContent=summary;if(term&&terms[term]){const source=document.createElement('button');source.type='button';source.className='term-button roster-modified-value';source.dataset.term=term;source.textContent='Rule';line.append(' ',source);}ability.append(heading,line);host.append(ability);};
        const hasKeyword=keyword=>[...(facts.keywords||[]),...(facts.factionKeywords||[])].some(item=>normalize(item?.title||item?.name||item?.id||item)===normalize(keyword)),hasWargear=(item,label)=>unitLoadout(item).some(value=>normalize(value).split(',').some(part=>part.trim().replace(/^\d+\s*x?\s+/,'')===normalize(label)));
        const currentId=`unit-${unitSlug}`;
        if(terms[DG_RULE.destroyer]&&from('unit-typhus')&&currentId!=='unit-typhus')addDerivedAbility('destroyer-hive','The Destroyer Hive','Melee attacks that target this Attached Unit: -1 to the Hit roll.',DG_RULE.destroyer);
        if(terms[DG_RULE.foul]&&from('unit-biologus-putrifier')){weaponRows().forEach(row=>addTag(row,'LETHAL HITS','core-lethal-hits'));if(currentId!=='unit-biologus-putrifier')addDerivedAbility('foul-infusion','Foul Infusion','Critical Hits are scored on unmodified Hit rolls of 5+.',DG_RULE.foul);}
        if(terms[DG_RULE.icon]&&from('unit-icon-bearer'))modifyModelStat('OC',1,'unclean-icon');
        if(terms['ability-vector-of-disease-2498580']&&from('unit-lord-of-contagion'))weaponRows('melee').forEach(row=>{addTag(row,'SUSTAINED HITS 1','core-sustained-hits');addTag(row,'LANCE','core-lance');});
        if(terms[DG_RULE.shroud]&&from('unit-lord-of-poxes')&&currentId!=='unit-lord-of-poxes')addDerivedAbility('shroud-of-disease','Shroud of Disease','This Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',DG_RULE.shroud);
        if(terms[DG_RULE.virulent]&&from('unit-lord-of-virulence')&&currentId!=='unit-lord-of-virulence')addDerivedAbility('virulent-aura','Virulent Aura','Models in this Attached Unit can re-roll Wound rolls for ranged attacks.',DG_RULE.virulent);
        if(terms[DG_RULE.vitality]&&from('unit-noxious-blightbringer')){modifyModelStat('M',1,'sickening-vitality');if(currentId!=='unit-noxious-blightbringer')addDerivedAbility('sickening-vitality','Sickening Vitality','Models in this Attached Unit can re-roll Advance and Charge rolls.',DG_RULE.vitality);}
        if(terms[DG_RULE.malicious]&&from('unit-tallyman')&&currentId!=='unit-tallyman')addDerivedAbility('malicious-calculations','Malicious Calculations','Models in this Attached Unit can ignore modifiers to BS, WS and Hit rolls.',DG_RULE.malicious);
        if(terms['ability-silent-bodyguard-03a0a1b']&&entryEvery(item=>canonicalUnitId(item)!=='unit-deathshroud-terminators'&&canonicalUnitId(bodyguardFor(item))==='unit-deathshroud-terminators'))addDerivedAbility('silent-bodyguard','Silent Bodyguard','Feel No Pain 4+.','ability-silent-bodyguard-03a0a1b');
        if(currentId==='unit-helbrute'&&terms[DG_RULE.froth]){const rows=weaponRows('melee').filter(row=>normalize(row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent)!=='close combat weapon'&&loadoutIncludesProfile(unitLoadout(active.units[0]),row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent));if(rows.length===2)rows.forEach(row=>modifyWeaponStat(row,'A',2,'froth-spattered-frenzy'));}
        if((currentId==='unit-plague-drones'||currentId==='unit-plaguebearers')&&entryEvery(item=>hasWargear(item,'Daemonic Icon')))setModelStat('Ld','6+','daemonic-icon');
        if((currentId==='unit-plague-drones'||currentId==='unit-plaguebearers')&&entryEvery(item=>hasWargear(item,'Instrument of Chaos')))addDerivedAbility('instrument-of-chaos','Instrument of Chaos','Add 1 to Charge rolls made for this unit.',currentId==='unit-plague-drones'?DG_RULE.dronesInstrument:DG_RULE.bearersInstrument);
        if(entryEvery(item=>ownsEnhancement(item,DG_ENH.regeneration)))addDerivedAbility('revolting-regeneration','Revolting Regeneration','Feel No Pain 5+.','core-feel-no-pain');
        if(entryEvery(item=>canonicalUnitId(bodyguardFor(item))==='unit-poxwalkers'&&Boolean(attachedEnhancementOwner(item,DG_ENH.pipes)))){modifyModelStat('OC',1,'witherbone-pipes');if(!entryEvery(item=>ownsEnhancement(item,DG_ENH.pipes)))addDerivedAbility('witherbone-pipes','Witherbone Pipes','Add 1 to Leadership and Battle-shock tests made for this Attached Unit.',DG_ENH.pipes);}
        if(entryEvery(item=>ownsEnhancement(item,DG_ENH.sorrowsyphon)&&canonicalUnitId(bodyguardFor(item))==='unit-poxwalkers'))weaponRows('ranged').filter(row=>weaponFamily(row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent)==='plague wind').forEach(row=>modifyWeaponStat(row,'D',1,'sorrowsyphon'));
        if(currentId==='unit-poxwalkers'&&entryEvery(item=>Boolean(attachedEnhancementOwner(item,DG_ENH.talisman))))modifyModelStat('T',1,'talisman-of-burgeoning');
        if(entryEvery(item=>Boolean(attachedEnhancementOwner(item,DG_ENH.vigour)))){modifyModelStat('M',1,'vile-vigour');if(!entryEvery(item=>ownsEnhancement(item,DG_ENH.vigour)))addDerivedAbility('vile-vigour','Vile Vigour','Models in this Attached Unit can re-roll Advance rolls.',DG_ENH.vigour);}
        if(entryEvery(item=>Boolean(attachedEnhancementOwner(item,DG_ENH.helm)))&&!entryEvery(item=>ownsEnhancement(item,DG_ENH.helm)))addDerivedAbility('helm-of-the-fly-king','Helm of the Fly King','Models in this Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',DG_ENH.helm);
        if(entryEvery(item=>ownsEnhancement(item,DG_ENH.plagueveil)))addDerivedAbility('plagueveil','Plagueveil','This unit has -3" Detection Range.',DG_ENH.plagueveil);
        if(rosterDetachmentIds.includes('contagion-engines')&&['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(currentId))weaponRows('ranged').forEach(row=>addTag(row,'ASSAULT','core-assault'));
        if(rosterDetachmentIds.includes('paragons-of-putrescence')&&hasKeyword('CHARACTER'))addDerivedAbility('hypervirulent-strains','Hypervirulent Strains','Contagion Range +3" (to a maximum of 12").',DG_RULE.strains);
        unit.querySelectorAll('.roster-modified-value').forEach(node=>{node.style.boxShadow='inset 0 -2px 0 var(--green)';});
      }
      for(const link of [...nav.querySelectorAll('.mobile-unit-groups a[href$=".html"]')]){const id=slug(link.textContent),unitGroups=grouped.get(id)||[];if(!selected.has(id)){link.remove();continue;}const base=link.textContent.trim();if(unitGroups.length<2){if(unitGroups[0]?.units.length>1)link.textContent=`${base} ×${unitGroups[0].units.length}`;continue;}const replacements=unitGroups.map(group=>{const clone=link.cloneNode(true),destination=new URL(clone.href);renderGroupLabel(clone,base,group,true);destination.searchParams.set('instance',group.units[0].id);clone.href=destination.href;if(id===unitSlug&&group===active)clone.setAttribute('aria-current','page');else clone.removeAttribute('aria-current');return clone;});link.replaceWith(...replacements);}
      for(const link of nav.querySelectorAll('a')){const destination=new URL(link.href);if(!destination.pathname.endsWith('.html'))continue;destination.searchParams.set('roster',params.get('roster'));link.href=destination.href;}
      for(const link of detachmentLinks)if(!rosterDetachmentIds.includes(slug(link.textContent.replace(/\s+\d+\s*DP$/i,''))))link.remove();
      for(const group of nav.querySelectorAll('.mobile-unit-groups > details'))if(!group.querySelector('a'))group.remove();
      document.documentElement.dataset.rosterActive='true';
  } catch {
    location.replace('../../../roster-guides/index.html');
    return;
  }
}

  if (rosterGuides) rosterGuides.hidden = !params.get('roster');
  if (viewSwitch) {
    const destination = new URL(viewSwitch.href);
    destination.search = params.toString();
    viewSwitch.href = destination.href;
  }

  function drawer(open) {
    document.body.classList.toggle('nav-drawer-open', open);
    navButton.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
    scrim.hidden = !open;
  }

  function syncDrawerMode() {
    const returnFocus = nav.contains(document.activeElement);
    if (drawerMedia.matches) drawer(false);
    else {
      document.body.classList.remove('nav-drawer-open');
      nav.setAttribute('aria-hidden', 'false');
      scrim.hidden = true;
    }
    if (returnFocus && nav.getAttribute('aria-hidden') === 'true') navButton.focus({ preventScroll: true });
  }

  const showTerm=trigger=>popups.open(trigger.dataset.term,trigger);

  function decorateStratagemTurns(root) {
    root.querySelectorAll('.stratagem').forEach(card => {
      const when = [...card.querySelectorAll('.field')].find(field => field.querySelector('b')?.textContent.trim().toLowerCase() === 'when')?.textContent || '';
      const turn = /opponent|enemy/i.test(when) ? 'THEIR TURN' : /your\b/i.test(when) ? 'YOUR TURN' : 'ANY TURN';
      card.dataset.turn = turn;
      card.classList.remove('turn-any', 'turn-yours', 'turn-their');
      card.classList.add(turn === 'THEIR TURN' ? 'turn-their' : turn === 'YOUR TURN' ? 'turn-yours' : 'turn-any');
    });
  }
  function decorateStratagemTypes(root) {
    root.querySelectorAll('.stratagem').forEach(card => {
      if (/^(battle-tactic|strategic-ploy|wargear|epic-deed|core|unknown)$/.test(card.dataset.stratagemType || '')) return;
      const match = card.querySelector('.stratagem-type')?.textContent.trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i);
      card.dataset.stratagemType = match ? match[1].toLowerCase().replace(/\s+/g, '-') : 'unknown';
    });
  }
  decorateStratagemTurns(document);decorateStratagemTypes(document);

  function filterRelated() {
    if (!relatedContent || !unit || !compatibleRulesMatrix) return;
    const selected = rosterMode ? 'all' : relatedDetachment.value;
    const compatible=compatibleRuntime.getCompatibleStratagems(compatibleRulesMatrix,unit.id,{detachmentId:selected,warlord:unit.dataset.rosterWarlord==='true'}),rules=assignedEnhancementIds?compatible.filter(rule=>rule.kind!=='enhancement'||assignedEnhancementIds.has(rule.ruleId)):compatible,byId=new Map(rules.map(rule=>[rule.ruleId,rule]));
    const hasEnhancements=rules.some(rule=>rule.kind==='enhancement');
    if(relatedKind==='enhancements'&&!hasEnhancements)relatedKind='stratagems';
    relatedRules.querySelector('[data-related-tab="enhancements"]').hidden=!hasEnhancements;
    relatedRules.querySelector('h2').textContent=hasEnhancements?'Compatible Stratagems & Enhancements':'Compatible Stratagems';
    relatedContent.querySelectorAll('.stratagem,.enhancement').forEach(card => {
      const result=byId.get(card.id);
      card.hidden=!result;
      card.dataset.matchState=result?.state||'no-match';
      card.querySelector(':scope > .compatibility-status')?.remove();
      if(result?.state==='conditional'){
        const status=document.createElement('p');status.className='compatibility-status';
        status.innerHTML='<strong>Conditionally compatible</strong><span></span>';
        status.querySelector('span').textContent=compatibleRuntime.conditionLabels[result.condition];
        card.prepend(status);
      }
    });
    relatedContent.querySelectorAll('[data-related-kind]').forEach(group => {
      group.hidden = group.dataset.relatedKind !== relatedKind || ![...group.querySelectorAll('.stratagem,.enhancement')].some(card => !card.hidden);
    });
    relatedContent.querySelectorAll('.related-detachment').forEach(section => {
      const chosen = section.dataset.detachment === 'core' || selected === 'all' || section.dataset.detachment === selected;
      section.hidden = !chosen || ![...section.querySelectorAll('[data-related-kind]')].some(group => !group.hidden);
    });
    relatedRules.querySelectorAll('[data-related-tab]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.relatedTab === relatedKind));
    });
    const hasVisible=[...relatedContent.querySelectorAll('.related-detachment')].some(section=>!section.hidden);
    let empty=relatedContent.querySelector('.related-empty');
    if(!hasVisible&&!empty){empty=document.createElement('p');empty.className='related-status related-empty';relatedContent.append(empty);}
    if(empty){empty.hidden=hasVisible;empty.textContent=`No matching ${relatedKind} for this datasheet.`;}
  }

  async function loadRelated() {
    if (relatedLoaded) return;
    try {
      const [response,matrix] = await Promise.all([fetch('./related-rules.inc?v=4'),compatibleRuntime.loadCompatibleStratagems(new URL('../generated/compatible-rules.json',scriptUrl))]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      relatedContent.innerHTML = await response.text();
      if(rosterMode)relatedContent.querySelectorAll('.related-detachment:not(.related-core)').forEach(section=>{if(!rosterDetachmentIds.includes(section.dataset.detachment))section.remove();});decorateStratagemTurns(relatedContent);decorateStratagemTypes(relatedContent);compatibleRulesMatrix=matrix;
      const tabs=document.createElement('div');tabs.className='full-related-tabs';tabs.innerHTML='<button type="button" data-related-tab="stratagems" aria-pressed="true">Stratagems</button><button type="button" data-related-tab="enhancements" aria-pressed="false">Enhancements</button>';
      relatedRules.querySelector('.related-controls')?.append(tabs);
      relatedLoaded = true;
      filterRelated();
    } catch {
      relatedLoaded = false;
      const retry=document.createElement('button');retry.type='button';retry.className='related-retry';retry.textContent='Try again';retry.addEventListener('click',loadRelated);
      const message=document.createElement('p');message.className='related-status';message.textContent='Could not load related rules. Check the connection and try again.';
      relatedContent.replaceChildren(message,retry);
    }
  }

  document.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') { suppressed = null; return; }
    if (!event.isPrimary) return;
    suppressed = null;
    const trigger = event.target.closest('[data-term]');
    gesture = trigger ? { trigger, id: event.pointerId, x: event.clientX, y: event.clientY, moved: false } : null;
  }, { capture: true, passive: true });

  document.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 10) gesture.moved = true;
  }, { capture: true, passive: true });

  document.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const completed = gesture;
    gesture = null;
    if (completed.moved) return;
    suppressed = { trigger: completed.trigger, until: performance.now() + 700 };
    showTerm(completed.trigger);
  }, { capture: true, passive: true });

  document.addEventListener('pointercancel', () => { gesture = null; suppressed = null; }, { capture: true, passive: true });

  document.addEventListener('click', event => {
    if (!suppressed) return;
    const active = performance.now() < suppressed.until;
    suppressed = null;
    if (active) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, { capture: true });

  document.addEventListener('click', event => {
    const local = event.target.closest('[data-journey-target]');
    if (local) {
      document.getElementById(local.dataset.journeyTarget)?.scrollIntoView({ block: 'start' });
      return;
    }

    const trigger = event.target.closest('[data-term]');
    if (!trigger) return;
    showTerm(trigger);
  });

  navButton.addEventListener('click', () => drawer(!document.body.classList.contains('nav-drawer-open')));
  scrim.addEventListener('click', () => drawer(false));
  if (relatedRulesEnabled && relatedRules) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        loadRelated();
      }, { rootMargin: '600px 0px' });
      observer.observe(relatedRules);
    } else loadRelated();
  }
  if (relatedRulesEnabled && relatedDetachment && !rosterMode) {
    try {
      const saved = localStorage.getItem('death-guard-detachment-filter');
      if (saved && relatedDetachment.querySelector(`option[value="${CSS.escape(saved)}"]`)) relatedDetachment.value = saved;
    } catch {}
    relatedDetachment.addEventListener('change', () => {
      try { localStorage.setItem('death-guard-detachment-filter', relatedDetachment.value); } catch {}
      filterRelated();
    });
    filterRelated();
  }
  if (relatedRulesEnabled) relatedRules?.addEventListener('click', event => {
    const tab = event.target.closest('[data-related-tab]');
    if (tab) {
      relatedKind = tab.dataset.relatedTab;
      filterRelated();
    }
  });
  drawerMedia.addEventListener?.('change', syncDrawerMode);
  syncDrawerMode();
  const documentTriggers=()=>[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')];
  const findRoot=(state,all=documentTriggers())=>all[state?.triggerIndex]?.dataset.term===state?.rootTerm?all[state.triggerIndex]:all.find(node=>node.dataset.term===state?.rootTerm)||null;
  window.WHPageState?.install({
    beforeRestore(){popups.closeAll({focus:false});},
    snapshot(){const popupIds=popups.snapshot(),root=popups.rootElement(),all=documentTriggers();return popupIds.length?{popupIds,rootTerm:popupIds[0],triggerIndex:root?all.indexOf(root):-1}:null;},
    restore(state){if(state?.popupIds?.length)popups.restore(state.popupIds,{root:findRoot(state),focus:true});}
  });

  const returnRecord=window.WHGlossaryReturn?.read();
  if(window.WHGlossaryReturn?.shouldRestoreAutomatically(returnRecord))requestAnimationFrame(()=>{
    const popupIds=returnRecord.popupIds?.length?returnRecord.popupIds:[returnRecord.rootTerm||returnRecord.termId].filter(Boolean);
    const trigger=findRoot({rootTerm:returnRecord.rootTerm||returnRecord.termId,triggerIndex:returnRecord.triggerIndex});
    window.scrollTo(returnRecord.scrollX||0,returnRecord.scrollY||0);
    requestAnimationFrame(()=>{if(trigger&&popupIds.length)popups.restore(popupIds,{root:trigger,focus:false});window.WHGlossaryReturn.clear();});
  });
}());
