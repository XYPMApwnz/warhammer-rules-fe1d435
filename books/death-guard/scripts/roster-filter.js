(function () {
  const params = new URLSearchParams(location.search);
  const rosterId = params.get("roster");
  if (!rosterId) return;

  let roster, sourceText = "", record;
  try {
    const records = JSON.parse(localStorage.getItem("wh40k-rosters-v1")) || [];
    record = records.find((record) => record.id === rosterId);
    roster = record?.roster;
    sourceText = record?.sourceText || "";
    if (!roster && rosterId === "1") roster = JSON.parse(sessionStorage.getItem("wh40k-roster-guide"));
  } catch {}
  if (sourceText && window.WHRosterParser) {
    const parsed = window.WHRosterParser.parse(sourceText);
    if (parsed.units.length) roster = parsed;
  }
  if (roster?.faction) roster.faction = roster.faction.replace(/^Chaos\s*[-–—]\s*/i, '').trim();
  if (roster?.faction?.toLowerCase() !== "death guard" || !roster?.units?.length) {
    location.replace("../../roster-guides/index.html");
    return;
  }

  const slug = (value) => String(value || "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const rosterById=new Map(roster.units.map(unit=>[unit.id,unit])),usedCharacters=new Set(),attachments={};
  const profile=unit=>{try{return JSON.parse(document.getElementById(`unit-${slug(unit?.name)}`)?.dataset.ruleFacts||'null');}catch{return null;}};
  const attachmentRelation=(bodyguard,character)=>{const body=profile(bodyguard),leader=profile(character);return body&&leader&&([...(leader.relations?.canLead||[]),...(leader.relations?.canSupport||[])].find(item=>item.unitId===body.unitId)||[...(body.relations?.canBeLedBy||[]),...(body.relations?.canBeSupportedBy||[])].find(item=>item.unitId===leader.unitId));};
  for(const [bodyguardId,characterIds] of Object.entries(record?.attachments||{})){const bodyguard=rosterById.get(bodyguardId),legal=[];if(!bodyguard)continue;for(const characterId of characterIds||[]){const character=rosterById.get(characterId),relation=attachmentRelation(bodyguard,character);if(!character||!relation||usedCharacters.has(characterId)||legal.length>=(Number(relation.maxCharacters)||1))continue;legal.push(characterId);usedCharacters.add(characterId);}if(legal.length)attachments[bodyguardId]=legal;}
  const attachmentStateKey=unit=>[(attachments[unit.id]||[]).map(id=>slug(rosterById.get(id)?.name)).filter(Boolean).sort().join(','),Object.entries(attachments).filter(([,ids])=>ids.includes(unit.id)).map(([id])=>slug(rosterById.get(id)?.name)).sort().join(',')].join('|');
  const resolveRosterDetachmentIds=(normalizedIds,availableIds)=>{const ids=[...new Set(normalizedIds.filter(Boolean))];return ids.length&&ids.every(id=>availableIds.filter(candidate=>candidate===id).length===1)?ids:null;};
  const detachmentKeywordGrants = [
    {detachment:'shamblerot-vectorium',units:['poxwalkers'],id:'keyword-battleline',title:'BATTLELINE'},
    {detachment:'contagion-engines',units:['foetid-bloat-drone','foetid-bloat-drone-with-heavy-blight-launcher','helbrute','myphitic-blight-hauler'],id:'keyword-contagion-engine',title:'CONTAGION ENGINE'}
  ];
  const grantedKeywords = (unitSlug, detachments = []) => detachmentKeywordGrants.filter((grant) => detachments.includes(grant.detachment) && grant.units.includes(unitSlug));
  const restoreLegacyLoadouts = () => {
    let unitIndex = -1, modelIndex = -1;
    sourceText.replace(/\u00a0/g, " ").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
      if (/^(?:Char\d+:\s*)?\d+x\s+.+?\s+\(\d+\s*pts?\)/i.test(line)) { unitIndex += 1; modelIndex = -1; return; }
      if (line.startsWith("•")) { modelIndex += 1; return; }
      const match = line.match(/^(\d+)\s+with\s+(.+)$/i), model = roster.units[unitIndex]?.models?.[modelIndex];
      if (match && model) {
        model.loadouts ||= [];
        if (!model.loadouts.some((item) => item.quantity === Number(match[1]) && item.wargear === match[2])) model.loadouts.push({ quantity:Number(match[1]), wargear:match[2] });
      }
    });
  };
  restoreLegacyLoadouts();
  const canonicalTerms = window.WH40K_GLOSSARY.forBook('death-guard');
  const rosterTerms = {};
  window.DG_ROSTER_TERMS = rosterTerms;
  const renderComposition = (card, units) => {
    const root = card.querySelector('[id$="-composition"] .ability-list');
    if (!root) return;
    const rows = new Map();
    const add = (quantity, name, wargear) => {
      const key = `${name}\0${wargear}`;
      rows.set(key, { quantity:(rows.get(key)?.quantity || 0) + quantity, name, wargear });
    };
    units.forEach((unit) => {
      if (!unit.models?.length) return add(unit.quantity, unit.name, unit.wargear);
      unit.models.forEach((model) => model.loadouts?.length
        ? model.loadouts.forEach((loadout) => add(loadout.quantity, model.name, loadout.wargear))
        : add(model.quantity, model.name, model.wargear));
    });
    const block = document.createElement('div');block.className='content-block roster-composition';
    const title = document.createElement('strong');title.textContent='Roster loadout';block.append(title);
    const list = document.createElement('ul');
    const groups=window.WHRosterEntities.weaponGroups(canonicalTerms,card.id);
    rows.forEach((row) => {
      const item=document.createElement('li');item.append(`${row.quantity}× ${row.name}`);
      if(row.wargear){
        item.append(' — ');
        splitLabels(row.wargear).forEach((label,index)=>{
          if(index)item.append(', ');
          const family=window.WHRosterEntities.weaponFamily(label),profiles=groups.get(family)||[];
          if(!profiles.length){item.append(label);return;}
          const exact=profiles.find(profile=>window.WHRosterEntities.normalize(profile.title)===window.WHRosterEntities.normalize(label));
          const termId=exact?.id||`roster-${card.id}-${family.replace(/\s+/g,'-')}`;
          if(!exact)rosterTerms[termId]={title:label,summary:`${profiles.length} weapon profiles`,datasheet:card.id,profiles};
          const button=document.createElement('button');button.type='button';button.className='term-button';button.dataset.term=termId;button.textContent=label;item.append(button);
        });
      }
      list.append(item);
    });
    block.append(list);root.replaceChildren(block);
  };
  const renderDetachmentKeywords = (card) => {
    const grants=grantedKeywords(card.id.replace(/^unit-/,''),window.DG_ROSTER_GUIDE.detachmentIds);
    if(!grants.length)return;
    const root=card.querySelector('[id$="-keywords"] .ability-list');
    if(!root)return;
    const block=document.createElement('div');block.className='content-block roster-granted-keywords';
    const line=document.createElement('p');line.append('Granted by Detachment: ');
    grants.forEach((grant,index)=>{
      if(index)line.append(', ');
      if(!canonicalTerms[grant.id])rosterTerms[grant.id]={title:grant.title,summary:`This unit has the ${grant.title} keyword while using the ${grant.detachment.replace(/-/g,' ')} Detachment.`};
      const button=document.createElement('button');button.type='button';button.className='term-button';button.dataset.term=grant.id;button.textContent=grant.title;line.append(button);
    });
    block.append(line);root.prepend(block);
  };
  const splitLabels = (value) => {
    const labels = [];
    let depth = 0;
    let start = 0;
    for (let index = 0; index < value.length; index += 1) {
      if (value[index] === "(") depth += 1;
      if (value[index] === ")") depth = Math.max(0, depth - 1);
      if (value[index] === "," && depth === 0) {
        labels.push(value.slice(start, index).trim());
        start = index + 1;
      }
    }
    labels.push(value.slice(start).trim());
    return labels.filter(Boolean);
  };
  const enhancements = roster.enhancements || (roster.enhancement && roster.enhancement !== "—" ? [roster.enhancement] : []);
  const enhancementsByOwnerId = new Map();
  enhancements.forEach((enhancement) => {
    if (enhancement?.ownerStatus !== 'resolved' || !enhancement.ownerUnitId) return;
    const owned = enhancementsByOwnerId.get(enhancement.ownerUnitId) || [];
    owned.push(enhancement);
    enhancementsByOwnerId.set(enhancement.ownerUnitId, owned);
  });
  const enrichedEnhancements=window.WHRosterEnhancements?.enriched?.(roster)||enhancements;
  const enhancementIdentity=item=>item?.id||item?.ruleId||`enhancement-${slug(item?.name)}`;
  const attachmentGroupIds=unit=>{const bodyguardId=attachments[unit.id]?unit.id:Object.entries(attachments).find(([,ids])=>ids.includes(unit.id))?.[0];return bodyguardId?[bodyguardId,...(attachments[bodyguardId]||[])]:[unit.id];};
  const attachmentEnhancementStateKey=unit=>attachmentGroupIds(unit).flatMap(id=>enrichedEnhancements.filter(item=>item?.ownerStatus==='resolved'&&item.ownerUnitId===id).map(item=>`${id}:${enhancementIdentity(item)}`)).sort().join(',');
  const unitLoadout = (unit) => [unit.wargear, ...(unit.models || []).flatMap((model) => [model.wargear, ...(model.loadouts || []).map((loadout) => loadout.wargear)])].filter(Boolean);
  const unitRows = (unit) => unit.models?.length
    ? unit.models.flatMap((model) => model.loadouts?.length ? model.loadouts.map((loadout) => [loadout.quantity, model.name, loadout.wargear]) : [[model.quantity, model.name, model.wargear]])
    : [[unit.quantity, unit.name, unit.wargear]];
  const unitModelCount = (unit) => unitRows(unit).reduce((total, row) => total + (Number(row[0]) || 0), 0);
  const renderGroupLabel = (control, base, group, split) => {
    const primary=document.createElement('span'),name=document.createElement('span');
    primary.style.cssText='display:flex;justify-content:space-between;gap:8px;';
    name.textContent=`${base}${group.copies>1?` ×${group.copies}`:''}`;primary.append(name);
    if(split&&group.copies===1){const marker=document.createElement('small');marker.textContent=`#${group.numbers[0]}`;marker.style.opacity='.72';primary.append(marker);}
    control.replaceChildren(primary);
    if(split){const meta=document.createElement('small'),models=unitModelCount(group.units[0]);meta.textContent=`${models} ${models===1?'model':'models'} · ${group.units[0].points} pts${group.copies>1?' each':''}`;meta.style.cssText='display:block;margin-top:2px;opacity:.72;font-weight:500;';control.append(meta);}
  };
  const unitStateKey = (unit) => [
    unit.points || 0,
    unit.warlord ? 1 : 0,
    unitRows(unit).map((row) => `${row[0] || 0}:${normalize(row[1])}:${normalize(row[2])}`).sort().join('|'),
    unitLoadout(unit).map(normalize).sort().join('|'),
    (enhancementsByOwnerId.get(unit.id) || []).map((item) => `${item.ruleId || item.id || slug(item.name)}:${item.points || 0}:${slug(item.detachment)}`).sort().join('|'),
    attachmentStateKey(unit),
    attachmentEnhancementStateKey(unit)
  ].join('\0');
  const storedDetachments = roster.detachments?.length ? roster.detachments : [{ label:roster.detachment, disposition:roster.disposition }];
  const detachments = storedDetachments.flatMap((item) => splitLabels(item.label || "").map((label) => ({ ...item, label, name:label.replace(/\s*\([^)]*\)\s*$/, "") })));
  const normalizedDetachmentIds = detachments.map((item) => `detachment-${slug(item.name || item.label.split("(")[0])}`).filter((id) => id !== "detachment-");
  const availableDetachmentIds = [...document.querySelectorAll(".content-group.detachment")].map((section) => section.id);
  const resolvedDetachmentIds = resolveRosterDetachmentIds(normalizedDetachmentIds,availableDetachmentIds);
  if (!resolvedDetachmentIds) {
    location.replace("../../roster-guides/index.html");
    return;
  }
  const detachmentIds = new Set(resolvedDetachmentIds);
  const detachmentLabel = detachments.map(item=>item.label).join(' + ');
  const grouped = new Map();
  const ordinals = new Map();

  for (const unit of roster.units) {
    const id = `unit-${slug(unit.name)}`;
    const number = (ordinals.get(id) || 0) + 1;
    ordinals.set(id, number);
    const groups = grouped.get(id) || [];
    const state = unitStateKey(unit);
    let entry = groups.find((candidate) => candidate.state === state);
    if (!entry) {
      entry = { state, copies:0, points:0, loadout:[], units:[], numbers:[] };
      groups.push(entry);
      grouped.set(id, groups);
    }
    entry.copies += 1;
    entry.points += unit.points;
    entry.units.push(unit);
    entry.numbers.push(number);
    entry.loadout.push(...unitLoadout(unit));
  }
  const requestedInstanceId = params.get('instance');
  const selected = new Map([...grouped].map(([id, groups]) => [id, groups.find((group) => group.units.some((unit) => unit.id === requestedInstanceId)) || groups[0]]));
  const requestedUnit=rosterById.get(requestedInstanceId),viewSwitch=document.querySelector('[data-view-switch]');
  const setViewSwitch=unit=>{if(!unit||!viewSwitch)return;const destination=new URL(`./mobile/${slug(unit.name)}.html`,location.href);destination.search=location.search;destination.hash='';viewSwitch.href=destination.href;viewSwitch.dataset.rosterDestination=destination.href;};
  if(viewSwitch){setViewSwitch(requestedUnit);viewSwitch.addEventListener('click',event=>{if(!viewSwitch.dataset.rosterDestination)return;event.preventDefault();location.href=viewSwitch.dataset.rosterDestination;},{capture:true});}
  const VECTOR_RULE='ability-vector-of-disease-2498580',SILENT_RULE='ability-silent-bodyguard-03a0a1b';
  const hasAttached=(bodyguard,characterSlug)=>(attachments[bodyguard.id]||[]).some(id=>slug(rosterById.get(id)?.name)===characterSlug);
  const leads=(character,bodyguardSlug)=>Object.entries(attachments).some(([id,ids])=>ids.includes(character.id)&&slug(rosterById.get(id)?.name)===bodyguardSlug);
  const addWeaponTag=(row,label,term)=>{const host=row.querySelector('.weapon-tags');if(!host||[...host.children].some(item=>normalize(item.textContent)===normalize(label)))return;const tag=document.createElement('button');tag.type='button';tag.className='tag roster-modified-value';tag.dataset.term=term;tag.dataset.rosterDerivedEffect='attached-lord-of-contagion';tag.textContent=label;host.append(tag);};
  const applyAttachmentPilot=(card,entry)=>{
    if(card.id==='unit-deathshroud-terminators'&&canonicalTerms[VECTOR_RULE]&&entry.units.some(unit=>hasAttached(unit,'lord-of-contagion'))){[...card.querySelectorAll('.weapon-group')].filter(group=>normalize(group.querySelector('h5')?.textContent).startsWith('melee weapons')).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]).forEach(row=>{addWeaponTag(row,'SUSTAINED HITS 1','core-sustained-hits');addWeaponTag(row,'LANCE','core-lance');});}
    if(card.id==='unit-lord-of-contagion'&&canonicalTerms[SILENT_RULE]&&entry.units.some(unit=>leads(unit,'deathshroud-terminators'))){const host=card.querySelector('[id$="-abilities"] .ability-list');if(host&&!host.querySelector('[data-roster-derived-effect="silent-bodyguard"]')){const ability=document.createElement('article'),title=document.createElement('h5'),line=document.createElement('p'),tag=document.createElement('button');ability.className='ability roster-enhanced-ability';ability.dataset.rosterDerivedEffect='silent-bodyguard';title.textContent='Silent Bodyguard';tag.type='button';tag.className='term-button roster-modified-value';tag.dataset.term='core-feel-no-pain';tag.textContent='Feel No Pain 4+';line.append(tag);ability.append(title,line);host.append(ability);}}
  };
  const DG_RULE={destroyer:'ability-the-destroyer-hive-70f0cc1',foul:'ability-foul-infusion-490467e',icon:'ability-unclean-icon-5dadb9e',shroud:'ability-shroud-of-disease-90475da',virulent:'ability-virulent-aura-c28aa51',vitality:'ability-sickening-vitality-89bb5ff',malicious:'ability-malicious-calculations-8505f03',froth:'ability-froth-spattered-frenzy-9a139e5',dronesIcon:'plague-drones-ability-daemonic-icon',dronesInstrument:'plague-drones-ability-instrument-of-chaos',bearersIcon:'plaguebearers-ability-daemonic-icon',bearersInstrument:'plaguebearers-ability-instrument-of-chaos',animus:'detachment-rule-warped-and-rusted-animus',strains:'detachment-rule-hypervirulent-strains'};
  const DG_ENH={regeneration:'enhancement-revolting-regeneration',pipes:'enhancement-witherbone-pipes',sorrowsyphon:'enhancement-sorrowsyphon',talisman:'enhancement-talisman-of-burgeoning',vigour:'enhancement-vile-vigour',helm:'enhancement-helm-of-the-fly-king',plagueveil:'enhancement-plagueveil'};
  const profileByRosterId=new Map(roster.units.map(unit=>[unit.id,profile(unit)]));
  const canonicalUnitId=unit=>profileByRosterId.get(unit?.id)?.unitId||`unit-${slug(unit?.name)}`;
  const bodyguardFor=unit=>{const id=attachments[unit.id]?unit.id:Object.entries(attachments).find(([,ids])=>ids.includes(unit.id))?.[0];return id?rosterById.get(id):null;};
  const attachedGroup=unit=>{const bodyguard=bodyguardFor(unit),ids=bodyguard&&attachments[bodyguard.id];return ids?.length?[bodyguard,...ids.map(id=>rosterById.get(id)).filter(Boolean)]:null;};
  const attachedLeader=(unit,sourceId)=>attachedGroup(unit)?.find(member=>member.id!==bodyguardFor(unit)?.id&&canonicalUnitId(member)===sourceId);
  const ownsEnhancement=(unit,id)=>enrichedEnhancements.some(item=>item?.ownerStatus==='resolved'&&item.ownerUnitId===unit.id&&enhancementIdentity(item)===id);
  const attachedEnhancementOwner=(unit,id)=>attachedGroup(unit)?.find(member=>member.id!==bodyguardFor(unit)?.id&&ownsEnhancement(member,id));
  const entryEvery=(entry,test)=>Boolean(entry.units.length)&&entry.units.every(test);
  const weaponRows=(card,type)=>[...card.querySelectorAll('.weapon-group')].filter(group=>!type||normalize(group.querySelector('h5')?.textContent).startsWith(`${type} weapons`)).flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
  const markEffect=(node,effect)=>{const effects=new Set((node.dataset.rosterDerivedEffects||'').split(' ').filter(Boolean));if(effects.has(effect))return false;effects.add(effect);node.dataset.rosterDerivedEffects=[...effects].join(' ');node.classList.add('roster-modified-value');return true;};
  const modifyModelStat=(card,label,delta,effect)=>{const stat=[...card.querySelectorAll('.stat')].find(item=>normalize(item.querySelector('b')?.textContent)===normalize(label)),value=stat?.querySelector('span');if(!value||!markEffect(value,effect))return;const match=value.textContent.trim().match(/^(-?\d+)(.*)$/);if(match)value.textContent=`${Number(match[1])+delta}${match[2]}`;};
  const setModelStat=(card,label,next,effect)=>{const stat=[...card.querySelectorAll('.stat')].find(item=>normalize(item.querySelector('b')?.textContent)===normalize(label)),value=stat?.querySelector('span');if(value&&markEffect(value,effect))value.textContent=next;};
  const modifyWeaponStat=(row,label,delta,effect)=>{const head=row.parentElement?.querySelector('.weapon-head'),columns=[...(head?.children||[])],index=columns.findIndex(item=>normalize(item.textContent)===normalize(label)),cell=index>=0?row.children[index]:null;if(!cell||!markEffect(cell,`${effect}-${label}`))return;const text=cell.textContent.trim(),dice=text.match(/^(\d*D\d+)([+-]\d+)?$/i),match=text.match(/^(-?\d+)(.*)$/);if(dice){const next=Number(dice[2]||0)+delta;cell.textContent=`${dice[1]}${next?`${next>0?'+':''}${next}`:''}`;}else if(match)cell.textContent=`${Number(match[1])+delta}${match[2]}`;};
  const addDerivedAbility=(card,effect,title,summary,term)=>{const host=card.querySelector('[id$="-abilities"] .ability-list');if(!host||host.querySelector(`[data-roster-derived-effect="${effect}"]`))return;const ability=document.createElement('article'),heading=document.createElement('h5'),line=document.createElement('p');ability.className='ability roster-enhanced-ability';ability.dataset.rosterDerivedEffect=effect;heading.textContent=title;line.textContent=summary;if(term&&canonicalTerms[term]){const source=document.createElement('button');source.type='button';source.className='term-button roster-modified-value';source.dataset.term=term;source.textContent='Rule';line.append(' ',source);}ability.append(heading,line);host.append(ability);};
  const hasKeyword=(unit,keyword)=>[...(profileByRosterId.get(unit.id)?.keywords||[]),...(profileByRosterId.get(unit.id)?.factionKeywords||[])].some(item=>normalize(item?.title||item?.name||item?.id||item)===normalize(keyword));
  const hasWargear=(unit,label)=>unitLoadout(unit).flatMap(splitLabels).some(item=>normalize(item).replace(/^\d+\s*x?\s+/,'')===normalize(label));
  const applyRosterDerived=(card,entry)=>{
    const cardId=card.id,first=entry.units[0],from=sourceId=>entryEvery(entry,unit=>Boolean(attachedLeader(unit,sourceId)));
    if(canonicalTerms[DG_RULE.destroyer]&&from('unit-typhus')&&cardId!=='unit-typhus')addDerivedAbility(card,'destroyer-hive','The Destroyer Hive','Melee attacks that target this Attached Unit: -1 to the Hit roll.',DG_RULE.destroyer);
    if(canonicalTerms[DG_RULE.foul]&&from('unit-biologus-putrifier')){weaponRows(card).forEach(row=>addWeaponTag(row,'LETHAL HITS','core-lethal-hits'));if(cardId!=='unit-biologus-putrifier')addDerivedAbility(card,'foul-infusion','Foul Infusion','Critical Hits are scored on unmodified Hit rolls of 5+.',DG_RULE.foul);}
    if(canonicalTerms[DG_RULE.icon]&&from('unit-icon-bearer'))modifyModelStat(card,'OC',1,'unclean-icon');
    if(canonicalTerms[VECTOR_RULE]&&from('unit-lord-of-contagion'))weaponRows(card,'melee').forEach(row=>{addWeaponTag(row,'SUSTAINED HITS 1','core-sustained-hits');addWeaponTag(row,'LANCE','core-lance');});
    if(canonicalTerms[DG_RULE.shroud]&&from('unit-lord-of-poxes')&&cardId!=='unit-lord-of-poxes')addDerivedAbility(card,'shroud-of-disease','Shroud of Disease','This Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',DG_RULE.shroud);
    if(canonicalTerms[DG_RULE.virulent]&&from('unit-lord-of-virulence')&&cardId!=='unit-lord-of-virulence')addDerivedAbility(card,'virulent-aura','Virulent Aura','Models in this Attached Unit can re-roll Wound rolls for ranged attacks.',DG_RULE.virulent);
    if(canonicalTerms[DG_RULE.vitality]&&from('unit-noxious-blightbringer')){modifyModelStat(card,'M',1,'sickening-vitality');if(cardId!=='unit-noxious-blightbringer')addDerivedAbility(card,'sickening-vitality','Sickening Vitality','Models in this Attached Unit can re-roll Advance and Charge rolls.',DG_RULE.vitality);}
    if(canonicalTerms[DG_RULE.malicious]&&from('unit-tallyman')&&cardId!=='unit-tallyman')addDerivedAbility(card,'malicious-calculations','Malicious Calculations','Models in this Attached Unit can ignore modifiers to BS, WS and Hit rolls.',DG_RULE.malicious);
    if(canonicalTerms[SILENT_RULE]&&entryEvery(entry,unit=>canonicalUnitId(unit)!=='unit-deathshroud-terminators'&&canonicalUnitId(bodyguardFor(unit))==='unit-deathshroud-terminators'))addDerivedAbility(card,'silent-bodyguard','Silent Bodyguard','Feel No Pain 4+.',SILENT_RULE);
    if(cardId==='unit-helbrute'&&canonicalTerms[DG_RULE.froth]){const rows=weaponRows(card,'melee').filter(row=>normalize(row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent)!=='close combat weapon'&&window.WHRosterEntities.loadoutIncludesProfile(unitLoadout(first),row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent));if(rows.length===2)rows.forEach(row=>modifyWeaponStat(row,'A',2,'froth-spattered-frenzy'));}
    if((cardId==='unit-plague-drones'||cardId==='unit-plaguebearers')&&entryEvery(entry,unit=>hasWargear(unit,'Daemonic Icon')))setModelStat(card,'Ld','6+','daemonic-icon');
    if((cardId==='unit-plague-drones'||cardId==='unit-plaguebearers')&&entryEvery(entry,unit=>hasWargear(unit,'Instrument of Chaos')))addDerivedAbility(card,'instrument-of-chaos','Instrument of Chaos','Add 1 to Charge rolls made for this unit.',cardId==='unit-plague-drones'?DG_RULE.dronesInstrument:DG_RULE.bearersInstrument);
    if(entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.regeneration)))addDerivedAbility(card,'revolting-regeneration','Revolting Regeneration','Feel No Pain 5+.','core-feel-no-pain');
    if(entryEvery(entry,unit=>canonicalUnitId(bodyguardFor(unit))==='unit-poxwalkers'&&Boolean(attachedEnhancementOwner(unit,DG_ENH.pipes)))){modifyModelStat(card,'OC',1,'witherbone-pipes');if(!entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.pipes)))addDerivedAbility(card,'witherbone-pipes','Witherbone Pipes','Add 1 to Leadership and Battle-shock tests made for this Attached Unit.',DG_ENH.pipes);}
    if(entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.sorrowsyphon)&&canonicalUnitId(bodyguardFor(unit))==='unit-poxwalkers'))weaponRows(card,'ranged').filter(row=>window.WHRosterEntities.weaponFamily(row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent)==='plague wind').forEach(row=>modifyWeaponStat(row,'D',1,'sorrowsyphon'));
    if(cardId==='unit-poxwalkers'&&entryEvery(entry,unit=>Boolean(attachedEnhancementOwner(unit,DG_ENH.talisman))))modifyModelStat(card,'T',1,'talisman-of-burgeoning');
    if(entryEvery(entry,unit=>Boolean(attachedEnhancementOwner(unit,DG_ENH.vigour)))){modifyModelStat(card,'M',1,'vile-vigour');if(!entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.vigour)))addDerivedAbility(card,'vile-vigour','Vile Vigour','Models in this Attached Unit can re-roll Advance rolls.',DG_ENH.vigour);}
    if(entryEvery(entry,unit=>Boolean(attachedEnhancementOwner(unit,DG_ENH.helm)))&&!entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.helm)))addDerivedAbility(card,'helm-of-the-fly-king','Helm of the Fly King','Models in this Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',DG_ENH.helm);
    if(entryEvery(entry,unit=>ownsEnhancement(unit,DG_ENH.plagueveil)))addDerivedAbility(card,'plagueveil','Plagueveil','This unit has -3" Detection Range.',DG_ENH.plagueveil);
    if(detachmentIds.has('detachment-contagion-engines')&&['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(cardId))weaponRows(card,'ranged').forEach(row=>addWeaponTag(row,'ASSAULT','core-assault'));
    if(detachmentIds.has('detachment-paragons-of-putrescence')&&entryEvery(entry,unit=>hasKeyword(unit,'CHARACTER')))addDerivedAbility(card,'hypervirulent-strains','Hypervirulent Strains','Contagion Range +3" (to a maximum of 12").',DG_RULE.strains);
  };
  const enhancementRuleIdsByUnitId={};
  for(const [id,entry] of selected){
    const ruleIds=enhancements.filter(enhancement=>enhancement?.ownerStatus==='resolved'&&entry.units.some(unit=>unit.id===enhancement.ownerUnitId)).map(enhancement=>`enhancement-${slug(enhancement.name)}`);
    if(ruleIds.length)enhancementRuleIdsByUnitId[id]=[...new Set(ruleIds)];
  }
  window.DG_ROSTER_GUIDE=Object.freeze({detachmentIds:[...detachmentIds].map(id=>id.replace(/^detachment-/,'')),enhancementRuleIdsByUnitId});

  document.title = `${roster.faction} Roster Guide`;
  document.querySelector(".app-brand strong").textContent = `${roster.faction} Roster Guide`;
  document.querySelector(".app-brand small").textContent = `${detachmentLabel} · ${roster.declared || roster.calculated} pts`;
  const hero = document.querySelector("#start");
  hero.querySelector(".eyebrow").textContent = "Personal roster guide";
  hero.querySelector("h1").textContent = roster.faction;
  hero.querySelector("h1 + p").textContent = detachmentLabel;
  hero.querySelector(".source").textContent = `${roster.units.length} units · ${roster.declared || roster.calculated} pts · generated from New Recruit`;
  hero.querySelector(".lead").textContent = "This guide is reduced to the selected Death Guard detachments, units and recognised loadout.";
  const rosterWarnings = [...(roster.warnings || [])];
  if (!sourceText) rosterWarnings.push('This legacy roster has no source text, so Enhancement owners and derived effects cannot be rebuilt.');
  if (rosterWarnings.length) {
    const warning = document.createElement('p');
    warning.className = 'roster-warning';
    warning.textContent = rosterWarnings.join(' ');
    hero.append(warning);
  }

  document.querySelectorAll(".content-group.detachment").forEach((section) => {
    if (!detachmentIds.has(section.id)) section.remove();
  });
  const pactUnitIds = new Set(['unit-beasts-of-nurgle','unit-great-unclean-one','unit-nurglings','unit-plague-drones','unit-plaguebearers','unit-rotigus']);
  const usesPactOfDecay = [...selected.keys()].some((id) => pactUnitIds.has(id));
  if (!usesPactOfDecay) {
    document.querySelector('#pact-of-decay')?.remove();
    document.querySelector('[data-nav-id="pact-of-decay"]')?.remove();
  }
  document.querySelectorAll('[data-nav-depth="2"][data-nav-id^="detachment-"]').forEach((item) => {
    if (!detachmentIds.has(item.dataset.navId)) item.remove();
  });

  if (!enhancements.length) {
    detachmentIds.forEach((id) => {
      const prefix = id.replace(/^detachment-/, "");
      document.querySelector(`#${CSS.escape(prefix)}-enhancements`)?.remove();
      document.querySelector(`[data-nav-id="${CSS.escape(prefix)}-enhancements"]`)?.remove();
    });
  }

  const renderRosterCard = (card, entry) => {
    const points = card.querySelector(".points");
    if (points) {
      const value=document.createElement('strong');
      const models=unitModelCount(entry.units[0]),unitPoints=entry.units[0].points;
      value.textContent=entry.copies>1?`Roster · ${entry.copies} units · ${models} models each · ${unitPoints} pts each`:`Roster · ${models} ${models===1?'model':'models'} · ${entry.points} pts`;
      points.replaceChildren(value);
    }
    renderComposition(card,entry.units);
    renderDetachmentKeywords(card);
    window.WHRosterEnhancements?.decorate(card,roster,entry.units);
    applyAttachmentPilot(card,entry);
    applyRosterDerived(card,entry);
    card.querySelectorAll('.roster-modified-value').forEach(node=>{node.style.boxShadow='inset 0 -2px 0 var(--green)';});
    card.querySelector('[id$="-wargear-options"]')?.remove();
    if (!entry.loadout.length) return;
    card.querySelectorAll(".weapon-row:not(.weapon-head)").forEach((row) => {
      const weapon = row.querySelector(".weapon-button")?.textContent || row.firstElementChild?.textContent;
      if (weapon && !window.WHRosterEntities.loadoutIncludesProfile(entry.loadout,weapon)) row.remove();
    });
    card.querySelectorAll(".weapon-group").forEach((group) => {
      if (!group.querySelector(".weapon-row:not(.weapon-head)")) group.remove();
    });
  };
  const uniqueRosterCardIds = (card, canonicalId, entry) => {
    const token=entry.units.map(unit=>unit.id).join('-').replace(/[^a-z0-9_-]/gi,'-');
    const nodes=[card,...card.querySelectorAll('*')],ids=new Map([[canonicalId,`${canonicalId}--roster-${token}`]]);
    card.querySelectorAll('[id]').forEach(node=>ids.set(node.id,`roster-${token}-${node.id}`));
    nodes.forEach(node=>{
      if(node.id&&ids.has(node.id))node.id=ids.get(node.id);
      ['aria-labelledby','aria-controls','aria-describedby','headers'].forEach(name=>{const value=node.getAttribute(name);if(value)node.setAttribute(name,value.split(/\s+/).map(id=>ids.get(id)||id).join(' '));});
      ['for','data-nav-target','data-target'].forEach(name=>{const value=node.getAttribute(name);if(ids.has(value))node.setAttribute(name,ids.get(value));});
      ['href','xlink:href'].forEach(name=>{const value=node.getAttribute(name);if(value?.startsWith('#')&&ids.has(value.slice(1)))node.setAttribute(name,`#${ids.get(value.slice(1))}`);});
    });
    card.dataset.rosterCanonicalId=canonicalId;
    card.dataset.rosterStateGroup=entry.units.map(unit=>unit.id).join(' ');
    card.dataset.track=card.id;
    return card.id;
  };
  const renderedGroups=new Map();
  document.querySelectorAll(".unit-card").forEach((card) => {
    const canonicalId=card.id,groups=grouped.get(canonicalId);
    if (!groups?.length) {
      card.remove();
      return;
    }
    const template=card.cloneNode(true),records=[];
    let tail=card;
    groups.forEach((entry,index)=>{
      const rendered=index===0?card:template.cloneNode(true);
      rendered.dataset.rosterCanonicalId=canonicalId;
      rendered.dataset.rosterStateGroup=entry.units.map(unit=>unit.id).join(' ');
      renderRosterCard(rendered,entry);
      const cardId=index===0?canonicalId:uniqueRosterCardIds(rendered,canonicalId,entry);
      if(index>0){tail.after(rendered);tail=rendered;}
      records.push({entry,cardId});
    });
    renderedGroups.set(canonicalId,records);
  });

  document.querySelectorAll('[data-nav-id^="unit-"]').forEach((item) => {
    if (!selected.has(item.dataset.navId)) item.remove();
  });
  document.querySelectorAll('#datasheets > .content-group[id^="datasheets-"]').forEach((group) => {
    if (group.querySelector(".unit-card")) return;
    document.querySelector(`[data-nav-id="${CSS.escape(group.id)}"]`)?.remove();
    group.remove();
  });

  const detachmentRoot = document.querySelector('[data-nav-id="detachments"]');
  const detachmentItems = [...detachmentIds].map((id) => document.querySelector(`[data-nav-id="${CSS.escape(id)}"]`)).filter(Boolean);
  if (detachmentRoot && detachmentItems.length) {
    detachmentItems.forEach((item) => {
      item.remove();
      item.dataset.navDepth = "1";
      item.querySelectorAll('[data-nav-depth="3"]').forEach((child) => { child.dataset.navDepth = "2"; });
    });
    detachmentRoot.replaceWith(...detachmentItems);
  }

  const unitsRoot = document.querySelector('[data-nav-id="datasheets"]');
  if (unitsRoot) {
    const rootLabel = unitsRoot.querySelector('[data-nav-target="datasheets"]');
    if (rootLabel) rootLabel.textContent = "Units";
    const branch = [...unitsRoot.children].find((child) => child.matches("ul"));
    const unitItems = [...unitsRoot.querySelectorAll('[data-nav-id^="unit-"]')].flatMap((item) => {
      const id=item.dataset.navId,records=renderedGroups.get(id)||[],base=item.querySelector('.toc-label')?.textContent.trim()||'';
      if(records.length<2){const record=records[0];item.dataset.navDepth='2';if(record?.entry.copies>1)item.querySelector('.toc-label').textContent=`${base} ×${record.entry.copies}`;item.querySelector('[data-nav-target]')?.addEventListener('click',()=>{const destination=new URL(location.href);destination.searchParams.set('instance',record.entry.units[0].id);destination.hash=record.cardId;history.replaceState(history.state,'',destination.href);setViewSwitch(record.entry.units[0]);});return [item];}
      return records.map(({entry:group,cardId}) => {
        const clone=item.cloneNode(true),control=clone.querySelector('.toc-label');
        clone.dataset.navDepth='2';
        clone.dataset.navId=cardId;
        renderGroupLabel(control,base,group,true);
        const button=document.createElement('button'),destination=new URL(location.href);
        button.type='button';button.className=control.className;button.replaceChildren(...control.childNodes);
        button.dataset.navTarget=cardId;
        destination.searchParams.set('instance',group.units[0].id);destination.hash=cardId;
        button.addEventListener('click',()=>{history.replaceState(history.state,'',destination.href);setViewSwitch(group.units[0]);});control.replaceWith(button);
        return clone;
      });
    });
    branch?.replaceChildren(...unitItems);
  }
  if(requestedInstanceId){const record=[...renderedGroups.values()].flat().find(item=>item.entry.units.some(unit=>unit.id===requestedInstanceId));if(record){if(location.hash!==`#${record.cardId}`){const destination=new URL(location.href);destination.hash=record.cardId;history.replaceState(history.state,'',destination.href);}const scroll=()=>requestAnimationFrame(()=>document.getElementById(record.cardId)?.scrollIntoView());if(document.readyState==='complete')scroll();else addEventListener('load',scroll,{once:true});}}
  const datasheetTitle = document.querySelector("#datasheets > .section-title");
  if (datasheetTitle) datasheetTitle.textContent = "Units";

  document.querySelectorAll("#updates .content-block").forEach((block) => {
    const text = normalize(block.textContent);
    const relevant = text.includes("nurgle s gift") || [...selected.keys()].some((id) => text.includes(normalize(id.replace(/^unit-/, ""))));
    if (!relevant) block.remove();
  });
})();
