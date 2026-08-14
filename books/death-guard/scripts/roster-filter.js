(function () {
  const rosterId = new URLSearchParams(location.search).get("roster");
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
  const canonicalUnitDefinition=unit=>window.WH_POINTS_CATALOG?.['death guard']?.units?.[normalize(unit?.name)]||null;
  const canonicalUnitKeywords=unit=>canonicalUnitDefinition(unit)?.keywords||[];
  const hasCanonicalRule=(unit,ruleId)=>window.WH_POINTS_CATALOG?.['death guard']?.units?.[normalize(unit?.name)]?.termIds?.includes(ruleId);
  const attachmentContract=(bodyguard,character)=>{
    const bodyguardDefinition=canonicalUnitDefinition(bodyguard),characterDefinition=canonicalUnitDefinition(character);
    if(!bodyguardDefinition||!characterDefinition||!characterDefinition.keywords?.includes('CHARACTER'))return null;
    const forward=[...(characterDefinition.relations?.canLead||[]),...(characterDefinition.relations?.canSupport||[])].find(item=>item.unitId===bodyguardDefinition.unitId);
    const reverse=[...(bodyguardDefinition.relations?.canBeLedBy||[]),...(bodyguardDefinition.relations?.canBeSupportedBy||[])].find(item=>item.unitId===characterDefinition.unitId);
    return forward&&reverse?{characterUnitId:characterDefinition.unitId,maxCharacters:Math.max(1,Number(forward.maxCharacters||reverse.maxCharacters||1))}:null;
  };
  const validPersistedAttachments=(units,raw)=>{
    const uses=new Map(),attachments={};
    for(const characterIds of Object.values(raw||{}))if(Array.isArray(characterIds))for(const characterId of characterIds)uses.set(characterId,(uses.get(characterId)||0)+1);
    for(const [bodyguardId,characterIds] of Object.entries(raw||{})){
      const bodyguard=units.get(bodyguardId);if(!bodyguard||!Array.isArray(characterIds)||!characterIds.length)continue;
      const selectedTypes=new Set(),contracts=[];let valid=true;
      for(const characterId of characterIds){
        const contract=attachmentContract(bodyguard,units.get(characterId));
        if(!contract||uses.get(characterId)!==1||selectedTypes.has(contract.characterUnitId)){valid=false;break;}
        selectedTypes.add(contract.characterUnitId);contracts.push(contract);
      }
      const limit=contracts.length?Math.max(...contracts.map(contract=>contract.maxCharacters)):0;
      if(valid&&characterIds.length<=limit)attachments[bodyguardId]=[...characterIds];
    }
    return attachments;
  };
  const rosterUnitsById=new Map(roster.units.map(unit=>[unit.id,unit])),attachments=validPersistedAttachments(rosterUnitsById,record?.attachments);
  const rosterInstanceLabels=(()=>{const totals=new Map(),seen=new Map(),labels=new Map();roster.units.forEach(unit=>{const key=normalize(unit.name);totals.set(key,(totals.get(key)||0)+1);});roster.units.forEach(unit=>{const key=normalize(unit.name),index=(seen.get(key)||0)+1;seen.set(key,index);labels.set(unit.id,totals.get(key)>1?`${unit.name} #${index}`:unit.name);});return labels;})();
  const addLethalHits=row=>{const tags=row.querySelector('.weapon-tags');if(!tags||[...tags.children].some(tag=>normalize(tag.textContent)==='lethal hits'))return;const tag=document.createElement('button');tag.type='button';tag.className='tag';tag.dataset.term='core-lethal-hits';tag.textContent='LETHAL HITS';tags.append(tag);};
  const addEyeOfAffliction=row=>{const tags=row.querySelector('.weapon-tags');if(!tags||tags.querySelector('.roster-eye-of-affliction'))return;const tag=document.createElement('span');tag.className='tag roster-eye-of-affliction';tag.textContent='IGNORES COVER vs AFFLICTED';tags.append(tag);};
  const addWeaponAbility=(row,title,term)=>{const tags=row.querySelector('.weapon-tags');if(!tags||[...tags.children].some(tag=>normalize(tag.textContent)===normalize(title)))return;const tag=document.createElement('button');tag.type='button';tag.className='tag';tag.dataset.term=term;tag.textContent=title;tags.append(tag);};
  const attachmentGroups=Object.entries(attachments).map(([bodyguardId,characterIds])=>{const bodyguard=rosterUnitsById.get(bodyguardId),characters=characterIds.map(id=>rosterUnitsById.get(id)).filter(Boolean),members=[bodyguard,...characters].filter(Boolean),aggregateUnitKeywords=[...new Set(members.flatMap(canonicalUnitKeywords))].sort();return{bodyguard,characters,ids:new Set([bodyguardId,...characterIds]),aggregateUnitKeywords};}).filter(group=>group.bodyguard&&group.characters.length);
  const renderAttachedUnits=(card,units)=>{
    const root=card.querySelector('[id$="-abilities"] .ability-list');if(!root)return;
    const allEnhancements=window.WHRosterEnhancements?.enriched(roster)||[];
    const eyeOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='eye of affliction'),revoltingOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='revolting regeneration'),archOwners=allEnhancements.filter(item=>item.ownerStatus==='resolved'&&normalize(item.name)==='arch contaminator');
    units.forEach(instance=>{
      const group=attachmentGroups.find(item=>item.ids.has(instance.id));
      const biologus=group?.characters.find(unit=>normalize(unit.name)==='biologus putrifier')||null,tallyman=group?.characters.find(unit=>normalize(unit.name)==='tallyman')||null;
      const eyeOfAffliction=eyeOwners.some(item=>item.ownerUnitId===instance.id||group?.ids.has(item.ownerUnitId));
      const revoltingRegeneration=revoltingOwners.some(item=>item.ownerUnitId===instance.id);
      const isBodyguard=group?.bodyguard.id===instance.id,vectorSource=group?.characters.find(unit=>hasCanonicalRule(unit,'ability-vector-of-disease-2498580'))||null,giftSource=group?.characters.find(unit=>hasCanonicalRule(unit,'ability-gift-of-contagion-psychic-4fea300'))||null,blindingSource=group?.characters.find(unit=>hasCanonicalRule(unit,'ability-blinding-spray-7d189f5'))||null;
      const silentBodyguard=Boolean(group&&!isBodyguard&&hasCanonicalRule(group.bodyguard,'ability-silent-bodyguard-03a0a1b')&&canonicalUnitKeywords(instance).includes('CHARACTER')),archContaminator=Boolean(isBodyguard&&archOwners.some(item=>group?.ids.has(item.ownerUnitId)));
      if(!group&&!eyeOfAffliction&&!revoltingRegeneration)return;
      const article=document.createElement('article');article.className='ability roster-attached-unit';article.dataset.rosterInstanceId=instance.id;
      if(group)article.dataset.aggregateUnitKeywords=group.aggregateUnitKeywords.join('|');
      const heading=document.createElement('h5');heading.textContent=`${rosterInstanceLabels.get(instance.id)} · ${group?'Attached Unit':'Enhancement projection'}`;article.append(heading);
      if(group){const members=document.createElement('p');members.textContent=`Attached Unit: ${[group.bodyguard,...group.characters].map(unit=>rosterInstanceLabels.get(unit.id)||unit.name).join(', ')}`;article.append(members);}
      let projection=null;
      const ensureProjection=()=>{if(projection)return projection;projection=document.createElement('div');projection.className='roster-attached-weapons';[...card.querySelectorAll('.weapon-group')].filter(weaponGroup=>!weaponGroup.closest('.roster-attached-unit')).forEach(weaponGroup=>{const clone=weaponGroup.cloneNode(true);clone.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));projection.append(clone);});article.append(projection);return projection;};
      if(biologus){
        const note=document.createElement('p');note.className='roster-derived-note roster-foul-infusion';note.textContent='Foul Infusion: these weapon profiles have LETHAL HITS; unmodified Hit rolls of 5+ score a Critical Hit.';article.append(note);
        ensureProjection().querySelectorAll('.weapon-row:not(.weapon-head)').forEach(addLethalHits);
      }
      if(tallyman){const note=document.createElement('p');note.className='roster-derived-note roster-malicious-calculations';note.textContent='Malicious Calculations: when a model in this Attached Unit attacks, you can ignore modifiers to its BS or WS and/or modifiers to the Hit roll.';article.append(note);}
      if(vectorSource){[...ensureProjection().querySelectorAll('.weapon-group')].filter(weaponGroup=>normalize(weaponGroup.querySelector('h5')?.textContent).includes('melee weapons')).forEach(weaponGroup=>weaponGroup.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(row=>{addWeaponAbility(row,'SUSTAINED HITS 1','core-sustained-hits');addWeaponAbility(row,'LANCE','core-lance');}));}
      if(silentBodyguard){const note=document.createElement('p');note.className='roster-derived-note roster-silent-bodyguard';note.textContent='Silent Bodyguard: this CHARACTER model has Feel No Pain 4+ while leading Deathshroud Terminators.';article.append(note);}
      if(isBodyguard&&giftSource){const note=document.createElement('p');note.className='roster-derived-note roster-gift-of-contagion';note.textContent='Gift of Contagion: while this Attached Unit targets an AFFLICTED unit, those attacks have SUSTAINED HITS 1.';article.append(note);}
      if(archContaminator){const note=document.createElement('p');note.className='roster-derived-note roster-arch-contaminator';note.textContent='Arch Contaminator: while this Attached Unit is within range of an objective marker you control, models in it can re-roll the Wound roll.';article.append(note);}
      if(isBodyguard&&blindingSource){const note=document.createElement('p');note.className='roster-derived-note roster-blinding-spray';note.textContent='Blinding Spray (activation): in the Fight phase, Foul Blightspawn can give this Attached Unit Fights First until the end of the phase; once per battle.';article.append(note);}
      if(eyeOfAffliction){const note=document.createElement('p');note.className='roster-derived-note roster-eye-of-affliction-note';note.textContent='Eye of Affliction: ranged weapons have IGNORES COVER while targeting an AFFLICTED enemy unit.';article.append(note);[...ensureProjection().querySelectorAll('.weapon-group')].filter(weaponGroup=>normalize(weaponGroup.querySelector('h5')?.textContent).includes('ranged weapons')).forEach(weaponGroup=>weaponGroup.querySelectorAll('.weapon-row:not(.weapon-head)').forEach(addEyeOfAffliction));}
      if(revoltingRegeneration){const note=document.createElement('p');note.className='roster-derived-note roster-revolting-regeneration';note.textContent='Revolting Regeneration: this bearer has Feel No Pain 5+.';article.append(note);}
      root.append(article);
    });
  };
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
  const selected = new Map();

  for (const unit of roster.units) {
    const id = `unit-${slug(unit.name)}`;
    const entry = selected.get(id) || { copies:0, points:0, loadout:[], units:[] };
    entry.copies += 1;
    entry.points += unit.points;
    entry.units.push(unit);
    entry.loadout.push(...[unit.wargear, ...(unit.models || []).flatMap((model) => [model.wargear, ...(model.loadouts || []).map((loadout) => loadout.wargear)])].filter(Boolean));
    selected.set(id, entry);
  }
  const enhancementRuleIdsByUnitId={};
  for(const enhancement of roster.enhancements||[]){
    if(enhancement?.ownerStatus!=='resolved'||!enhancement.ownerUnitId)continue;
    const owner=roster.units.find(unit=>unit.id===enhancement.ownerUnitId);
    if(!owner)continue;
    (enhancementRuleIdsByUnitId[`unit-${slug(owner.name)}`]||=[]).push(`enhancement-${slug(enhancement.name)}`);
  }
  window.DG_ROSTER_GUIDE=Object.freeze({detachmentIds:[...detachmentIds].map(id=>id.replace(/^detachment-/,'')),enhancementRuleIdsByUnitId,attachments});

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

  const enhancements = roster.enhancements || (roster.enhancement && roster.enhancement !== "—" ? [roster.enhancement] : []);
  if (!enhancements.length) {
    detachmentIds.forEach((id) => {
      const prefix = id.replace(/^detachment-/, "");
      document.querySelector(`#${CSS.escape(prefix)}-enhancements`)?.remove();
      document.querySelector(`[data-nav-id="${CSS.escape(prefix)}-enhancements"]`)?.remove();
    });
  }

  document.querySelectorAll(".unit-card").forEach((card) => {
    const entry = selected.get(card.id);
    if (!entry) {
      card.remove();
      return;
    }
    const points = card.querySelector(".points");
    if (points) {
      const value=document.createElement('strong');
      value.textContent=`Roster: ${entry.copies > 1 ? `${entry.copies} units · ` : ""}${entry.points} pts`;
      points.replaceChildren(value);
    }
    renderComposition(card,entry.units);
    renderDetachmentKeywords(card);
    window.WHRosterEnhancements?.decorate(card,roster,entry.units);
    card.querySelector('[id$="-wargear-options"]')?.remove();
    if (!entry.loadout.length) return;
    card.querySelectorAll(".weapon-row:not(.weapon-head)").forEach((row) => {
      const weapon = row.querySelector(".weapon-button")?.textContent || row.firstElementChild?.textContent;
      if (weapon && !window.WHRosterEntities.loadoutIncludesProfile(entry.loadout,weapon)) row.remove();
    });
    card.querySelectorAll(".weapon-group").forEach((group) => {
      if (!group.querySelector(".weapon-row:not(.weapon-head)")) group.remove();
    });
    renderAttachedUnits(card,entry.units);
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
    const unitItems = [...unitsRoot.querySelectorAll('[data-nav-id^="unit-"]')];
    unitItems.forEach((item) => {
      item.dataset.navDepth = "2";
      const entry = selected.get(item.dataset.navId);
      const label = item.querySelector(".toc-label");
      if (label && entry?.copies > 1) label.textContent += ` ×${entry.copies}`;
    });
    branch?.replaceChildren(...unitItems);
  }
  const datasheetTitle = document.querySelector("#datasheets > .section-title");
  if (datasheetTitle) datasheetTitle.textContent = "Units";

  document.querySelectorAll("#updates .content-block").forEach((block) => {
    const text = normalize(block.textContent);
    const relevant = text.includes("nurgle s gift") || [...selected.keys()].some((id) => text.includes(normalize(id.replace(/^unit-/, ""))));
    if (!relevant) block.remove();
  });
})();
