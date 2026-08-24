(function (root) {
  'use strict';

  const slug = (value) => String(value || '').toLowerCase().replace(/[\u2019']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const splitLabels = (value) => {
    const labels = [];
    let depth = 0;
    let start = 0;
    const text = String(value || '');
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === '(') depth += 1;
      if (text[index] === ')') depth = Math.max(0, depth - 1);
      if (text[index] === ',' && depth === 0) {
        labels.push(text.slice(start, index).trim());
        start = index + 1;
      }
    }
    labels.push(text.slice(start).trim());
    return labels.filter(Boolean);
  };
  const unitLoadout = (unit) => [unit?.wargear, ...(unit?.models || []).flatMap((model) => [model.wargear, ...(model.loadouts || []).map((loadout) => loadout.wargear)])].filter(Boolean);
  const unitRows = (unit) => unit?.models?.length
    ? unit.models.flatMap((model) => model.loadouts?.length ? model.loadouts.map((loadout) => [loadout.quantity, model.name, loadout.wargear]) : [[model.quantity, model.name, model.wargear]])
    : [[unit?.quantity, unit?.name, unit?.wargear]];
  const unitModelCount = (unit) => unitRows(unit).reduce((total, row) => total + (Number(row[0]) || 0), 0);
  const hasWargear = (unit, label) => unitLoadout(unit).flatMap(splitLabels).some((item) => normalize(item).replace(/^\d+\s*x?\s+/, '') === normalize(label));

  const DG_RULE = {
    vector:'ability-vector-of-disease-2498580', silent:'ability-silent-bodyguard-03a0a1b', destroyer:'ability-the-destroyer-hive-70f0cc1',
    foul:'ability-foul-infusion-490467e', icon:'ability-unclean-icon-5dadb9e', shroud:'ability-shroud-of-disease-90475da',
    virulent:'ability-virulent-aura-c28aa51', vitality:'ability-sickening-vitality-89bb5ff', malicious:'ability-malicious-calculations-8505f03',
    froth:'ability-froth-spattered-frenzy-9a139e5', dronesInstrument:'plague-drones-ability-instrument-of-chaos',
    bearersInstrument:'plaguebearers-ability-instrument-of-chaos', strains:'detachment-rule-hypervirulent-strains'
  };
  const DG_ENH = {
    regeneration:'enhancement-revolting-regeneration', pipes:'enhancement-witherbone-pipes', sorrowsyphon:'enhancement-sorrowsyphon',
    talisman:'enhancement-talisman-of-burgeoning', vigour:'enhancement-vile-vigour', helm:'enhancement-helm-of-the-fly-king', plagueveil:'enhancement-plagueveil',
    bilemaw:'enhancement-bilemaw-blight'
  };
  const KEYWORD_GRANTS = [
    {detachment:'shamblerot-vectorium', units:['poxwalkers'], id:'keyword-battleline', title:'BATTLELINE'},
    {detachment:'contagion-engines', units:['foetid-bloat-drone','foetid-bloat-drone-with-heavy-blight-launcher','helbrute','myphitic-blight-hauler'], id:'keyword-contagion-engine', title:'CONTAGION ENGINE'}
  ];

  const createContext = ({roster, attachments = {}, terms = {}, profileFor = () => null}) => {
    const rosterById = new Map(roster.units.map((unit) => [unit.id, unit]));
    const enhancements = roster.enhancements || (roster.enhancement && roster.enhancement !== '-' ? [roster.enhancement] : []);
    const enrichedEnhancements = root.WHRosterEnhancements?.enriched?.(roster) || enhancements;
    const enhancementIdentity = (item) => item?.id || item?.ruleId || `enhancement-${slug(item?.name)}`;
    const enhancementsByOwnerId = new Map();
    enhancements.forEach((enhancement) => {
      if (enhancement?.ownerStatus !== 'resolved' || !enhancement.ownerUnitId) return;
      const owned = enhancementsByOwnerId.get(enhancement.ownerUnitId) || [];
      owned.push(enhancement);
      enhancementsByOwnerId.set(enhancement.ownerUnitId, owned);
    });
    const profileByRosterId = new Map(roster.units.map((unit) => [unit.id, profileFor(unit)]));
    const canonicalUnitId = (unit) => profileByRosterId.get(unit?.id)?.unitId || `unit-${slug(unit?.name)}`;
    const bodyguardFor = (unit) => {
      const id = attachments[unit.id] ? unit.id : Object.entries(attachments).find(([, ids]) => ids.includes(unit.id))?.[0];
      return id ? rosterById.get(id) : null;
    };
    const attachedGroup = (unit) => {
      const bodyguard = bodyguardFor(unit), ids = bodyguard && attachments[bodyguard.id];
      return ids?.length ? [bodyguard, ...ids.map((id) => rosterById.get(id)).filter(Boolean)] : null;
    };
    const attachedLeader = (unit, sourceId) => attachedGroup(unit)?.find((member) => member.id !== bodyguardFor(unit)?.id && canonicalUnitId(member) === sourceId);
    const ownsEnhancement = (unit, id) => enrichedEnhancements.some((item) => item?.ownerStatus === 'resolved' && item.ownerUnitId === unit.id && enhancementIdentity(item) === id);
    const attachedEnhancementOwner = (unit, id) => attachedGroup(unit)?.find((member) => member.id !== bodyguardFor(unit)?.id && ownsEnhancement(member, id));
    const attachmentStateKey = (unit) => [
      (attachments[unit.id] || []).map((id) => slug(rosterById.get(id)?.name)).filter(Boolean).sort().join(','),
      Object.entries(attachments).filter(([, ids]) => ids.includes(unit.id)).map(([id]) => slug(rosterById.get(id)?.name)).sort().join(',')
    ].join('|');
    const attachmentGroupIds = (unit) => {
      const bodyguardId = attachments[unit.id] ? unit.id : Object.entries(attachments).find(([, ids]) => ids.includes(unit.id))?.[0];
      return bodyguardId ? [bodyguardId, ...(attachments[bodyguardId] || [])] : [unit.id];
    };
    const attachmentEnhancementStateKey = (unit) => attachmentGroupIds(unit).flatMap((id) => enrichedEnhancements
      .filter((item) => item?.ownerStatus === 'resolved' && item.ownerUnitId === id)
      .map((item) => `${id}:${enhancementIdentity(item)}`)).sort().join(',');
    const stateKey = (unit) => [
      unit.points || 0,
      unit.warlord ? 1 : 0,
      unitRows(unit).map((row) => `${row[0] || 0}:${normalize(row[1])}:${normalize(row[2])}`).sort().join('|'),
      unitLoadout(unit).map(normalize).sort().join('|'),
      (enhancementsByOwnerId.get(unit.id) || []).map((item) => `${item.ruleId || item.id || slug(item.name)}:${item.points || 0}:${slug(item.detachment)}`).sort().join('|'),
      attachmentStateKey(unit),
      attachmentEnhancementStateKey(unit)
    ].join('\0');

    const projectEffects = (unit, cardId, detachmentIds = [], gameUnit = null) => {
      const output = [], detachments = new Set(detachmentIds), bodyguard = bodyguardFor(unit), group = attachedGroup(unit) || [unit];
      const source = (kind, id, ownerInstanceId = null, rosterFact = kind) => ({source:{kind,id,ownerInstanceId},provenance:{rosterFact}});
      const add = (id, component, targetId, operation, detail = {}, origin = {}) => output.push({id,component,targetId,operation,...detail,...origin});
      const ability = (id, title, summary, origin) => add(id,'ability',id,'grant',{title,summary},origin);
      const stat = (id, targetId, operation, value, origin) => add(id,'stat',targetId,operation,operation==='add'?{delta:value}:{to:value},origin);
      const weapon = (id, scope, operation, detail, origin) => add(id,'weapon',scope,operation,detail,origin);
      const leader = id => group.find(member => member.id !== bodyguard?.id && canonicalUnitId(member) === id);
      const attachedOwner = id => attachedEnhancementOwner(unit,id);
      const ownEnhancements = enrichedEnhancements.filter(item => item?.ownerStatus === 'resolved' && item.ownerUnitId === unit.id);
      const detachmentSource = id => source('detachment',`detachment-${id}`,null,'selected-detachment');
      const attachmentSource = (ruleId, owner) => source('explicit-attachment',ruleId,owner?.id,'explicit-attachment');
      if (detachments.has('detachment-shamblerot-vectorium') && cardId === 'unit-poxwalkers') add('shamblerot-battleline','keyword','BATTLELINE','grant',{},detachmentSource('shamblerot-vectorium'));
      if (detachments.has('detachment-contagion-engines') && ['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(cardId)) { add('contagion-engine-keyword','keyword','CONTAGION ENGINE','grant',{},detachmentSource('contagion-engines')); weapon('warped-and-rusted-animus','ranged','grant-tag',{tag:'ASSAULT',termId:'core-assault'},detachmentSource('contagion-engines')); }
      if (detachments.has('detachment-paragons-of-putrescence') && (profileByRosterId.get(unit.id)?.keywords||[]).some(item=>normalize(item?.title||item) === 'character')) ability('hypervirulent-strains','Hypervirulent Strains','Contagion Range +3" (to a maximum of 12").',detachmentSource('paragons-of-putrescence'));
      const typhus=leader('unit-typhus');if(typhus&&cardId!=='unit-typhus')ability('destroyer-hive','The Destroyer Hive','Melee attacks that target this Attached Unit: -1 to the Hit roll.',attachmentSource(DG_RULE.destroyer,typhus));
      const biologus=leader('unit-biologus-putrifier');if(biologus){weapon('foul-infusion-weapons','all','grant-tag',{tag:'LETHAL HITS',termId:'core-lethal-hits'},attachmentSource(DG_RULE.foul,biologus));if(cardId!=='unit-biologus-putrifier')ability('foul-infusion','Foul Infusion','Critical Hits are scored on unmodified Hit rolls of 5+.',attachmentSource(DG_RULE.foul,biologus));}
      const icon=leader('unit-icon-bearer');if(icon)stat('unclean-icon','OC','add',1,attachmentSource(DG_RULE.icon,icon));
      const contagion=leader('unit-lord-of-contagion');if(contagion){weapon('vector-sustained','melee','grant-tag',{tag:'SUSTAINED HITS 1',termId:'core-sustained-hits'},attachmentSource(DG_RULE.vector,contagion));weapon('vector-lance','melee','grant-tag',{tag:'LANCE',termId:'core-lance'},attachmentSource(DG_RULE.vector,contagion));}
      const poxes=leader('unit-lord-of-poxes');if(poxes&&cardId!=='unit-lord-of-poxes')ability('shroud-of-disease','Shroud of Disease','This Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',attachmentSource(DG_RULE.shroud,poxes));
      const virulence=leader('unit-lord-of-virulence');if(virulence&&cardId!=='unit-lord-of-virulence')ability('virulent-aura','Virulent Aura','Models in this Attached Unit can re-roll Wound rolls for ranged attacks.',attachmentSource(DG_RULE.virulent,virulence));
      const blightbringer=leader('unit-noxious-blightbringer');if(blightbringer){stat('sickening-vitality-move','M','add',1,attachmentSource(DG_RULE.vitality,blightbringer));if(cardId!=='unit-noxious-blightbringer')ability('sickening-vitality','Sickening Vitality','Models in this Attached Unit can re-roll Advance and Charge rolls.',attachmentSource(DG_RULE.vitality,blightbringer));}
      const tallyman=leader('unit-tallyman');if(tallyman&&cardId!=='unit-tallyman')ability('malicious-calculations','Malicious Calculations','Models in this Attached Unit can ignore modifiers to BS, WS and Hit rolls.',attachmentSource(DG_RULE.malicious,tallyman));
      if(cardId!=='unit-deathshroud-terminators'&&canonicalUnitId(bodyguard)==='unit-deathshroud-terminators')ability('silent-bodyguard','Silent Bodyguard','Feel No Pain 4+.',attachmentSource(DG_RULE.silent,bodyguard));
      if(cardId==='unit-helbrute'&&unitLoadout(unit).flatMap(splitLabels).filter(label=>normalize(label)!=='close combat weapon').length===2)weapon('froth-spattered-frenzy','selected-melee','add-stat',{stat:'A',delta:2,profileIds:gameUnit?.selection?.loadout?.selectedProfileIds||[]},source('datasheet',DG_RULE.froth,unit.id,'selected-wargear'));
      if(['unit-plague-drones','unit-plaguebearers'].includes(cardId)&&hasWargear(unit,'Daemonic Icon'))stat('daemonic-icon','Ld','set','6+',source('selected-wargear','daemonic-icon',unit.id,'selected-wargear'));
      if(['unit-plague-drones','unit-plaguebearers'].includes(cardId)&&hasWargear(unit,'Instrument of Chaos'))ability('instrument-of-chaos','Instrument of Chaos','Add 1 to Charge rolls made for this unit.',source('selected-wargear','instrument-of-chaos',unit.id,'selected-wargear'));
      for(const enhancement of ownEnhancements){const id=enhancementIdentity(enhancement),origin=source('enhancement',id,unit.id,'enhancement-owner');if(id===DG_ENH.regeneration)ability('revolting-regeneration','Revolting Regeneration','Feel No Pain 5+.',origin);if(id===DG_ENH.sorrowsyphon&&canonicalUnitId(bodyguard)==='unit-poxwalkers')weapon('sorrowsyphon','family:plague-wind','add-stat',{stat:'D',delta:1},origin);if(id===DG_ENH.plagueveil)ability('plagueveil','Plagueveil','This unit has -3" Detection Range.',origin);if(id===DG_ENH.bilemaw)continue;switch(enhancement.effect){case'furnace':weapon('furnace-attacks','melee','add-stat',{stat:'A',delta:1},origin);weapon('furnace-strength','melee','add-stat',{stat:'S',delta:1},origin);weapon('furnace-devastating','melee','grant-tag',{tag:'DEVASTATING WOUNDS',termId:'core-devastating-wounds'},origin);break;case'critical-hit-5':ability('critical-hit-5','Critical Hits 5+','Critical Hits are scored on unmodified Hit rolls of 5+.',origin);break;case'melee-a-2':weapon('melee-a-2','melee','add-stat',{stat:'A',delta:2},origin);break;case'plague-wind-range-12':weapon('plague-wind-range','family:plague-wind','add-stat',{stat:'Range',delta:12},origin);break;case'narthecium-d3':ability('narthecium-d3','Narthecium','Apply the current Narthecium D3 effect.',origin);break;case'mobile':add('mobile-keyword','keyword','MOBILE','grant',{},origin);break;}}
      const pipes=attachedOwner(DG_ENH.pipes);if(canonicalUnitId(bodyguard)==='unit-poxwalkers'&&pipes){stat('witherbone-pipes-oc','OC','add',1,attachmentSource(DG_ENH.pipes,pipes));if(pipes.id!==unit.id)ability('witherbone-pipes','Witherbone Pipes','Add 1 to Leadership and Battle-shock tests made for this Attached Unit.',attachmentSource(DG_ENH.pipes,pipes));}
      const talisman=attachedOwner(DG_ENH.talisman);if(cardId==='unit-poxwalkers'&&talisman)stat('talisman-of-burgeoning','T','add',1,attachmentSource(DG_ENH.talisman,talisman));
      const vigour=attachedOwner(DG_ENH.vigour);if(vigour){stat('vile-vigour-move','M','add',1,attachmentSource(DG_ENH.vigour,vigour));if(vigour.id!==unit.id)ability('vile-vigour','Vile Vigour','Models in this Attached Unit can re-roll Advance rolls.',attachmentSource(DG_ENH.vigour,vigour));}
      const helm=attachedOwner(DG_ENH.helm);if(helm&&helm.id!==unit.id)ability('helm-of-the-fly-king','Helm of the Fly King','Models in this Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".',attachmentSource(DG_ENH.helm,helm));
      return output;
    };

    const decorate = (card, units, detachmentIds = [], projectedEffects = null, applyProjectedEffects = true) => {
      const cardId = (card.dataset.rosterCanonicalId || card.id).replace(/--roster-.+$/, '');
      const normalizedDetachments = detachmentIds.map((id) => String(id).replace(/^detachment-/, ''));
      let facts = {};
      try { facts = JSON.parse(card.dataset.ruleFacts || '{}'); } catch {}
      const entryEvery = (test) => Boolean(units.length) && units.every(test);
      const from = (sourceId) => entryEvery((unit) => Boolean(attachedLeader(unit, sourceId)));
      const first = units[0];
      const weaponRows = (type) => [...card.querySelectorAll('.weapon-group')]
        .filter((group) => !type || normalize(group.querySelector('h5')?.textContent).startsWith(`${type} weapons`))
        .flatMap((group) => [...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
      root.WHRosterEnhancements?.decorate(card, roster, units, Array.isArray(projectedEffects)?{effects:projectedEffects,applyEffects:applyProjectedEffects}:{});
      if (units.some((unit) => ownsEnhancement(unit, DG_ENH.bilemaw))) {
        for (const row of weaponRows('ranged').filter((item) => root.WHRosterEntities.weaponFamily(item.querySelector('.weapon-button')?.textContent) === 'plague wind')) {
          const cell = row.querySelector('[data-label="Range"]');
          if (!cell?.dataset.rosterBase) continue;
          cell.textContent = cell.dataset.rosterBase;
          delete cell.dataset.rosterBase;
          cell.classList.remove('roster-modified-value');
        }
        card.querySelector('.roster-plague-wind-range')?.remove();
      }
      const markEffect = (node, effect) => {
        const effects = new Set((node.dataset.rosterDerivedEffects || '').split(' ').filter(Boolean));
        if (effects.has(effect)) return false;
        effects.add(effect);
        node.dataset.rosterDerivedEffects = [...effects].join(' ');
        node.classList.add('roster-modified-value');
        return true;
      };
      const modifyModelStat = (label, delta, effect) => {
        const stat = [...card.querySelectorAll('.stat')].find((item) => normalize(item.querySelector('b')?.textContent) === normalize(label));
        const value = stat?.querySelector('span');
        if (!value || !markEffect(value, effect)) return;
        const match = value.textContent.trim().match(/^(-?\d+)(.*)$/);
        if (match) value.textContent = `${Number(match[1]) + delta}${match[2]}`;
      };
      const setModelStat = (label, next, effect) => {
        const stat = [...card.querySelectorAll('.stat')].find((item) => normalize(item.querySelector('b')?.textContent) === normalize(label));
        const value = stat?.querySelector('span');
        if (value && markEffect(value, effect)) value.textContent = next;
      };
      const modifyWeaponStat = (row, label, delta, effect) => {
        const head = row.parentElement?.querySelector('.weapon-head'), columns = [...(head?.children || [])];
        const index = columns.findIndex((item) => normalize(item.textContent) === normalize(label)), cell = index >= 0 ? row.children[index] : null;
        if (!cell || !markEffect(cell, `${effect}-${label}`)) return;
        const text = cell.textContent.trim(), dice = text.match(/^(\d*D\d+)([+-]\d+)?$/i), match = text.match(/^(-?\d+)(.*)$/);
        if (dice) {
          const next = Number(dice[2] || 0) + delta;
          cell.textContent = `${dice[1]}${next ? `${next > 0 ? '+' : ''}${next}` : ''}`;
        } else if (match) cell.textContent = `${Number(match[1]) + delta}${match[2]}`;
      };
      const setWeaponStat = (row, label, next, effect) => {
        const head = row.parentElement?.querySelector('.weapon-head'), columns = [...(head?.children || [])], index = columns.findIndex(item => normalize(item.textContent) === normalize(label)), cell = index >= 0 ? row.children[index] : null;
        if (cell && markEffect(cell, `${effect}-${label}`)) cell.textContent = next;
      };
      const addWeaponTag = (row, label, term, effect) => {
        const host = row.querySelector('.weapon-tags');
        if (!host || [...host.children].some((item) => normalize(item.textContent) === normalize(label))) return;
        const tag = document.createElement('button');
        tag.type = 'button'; tag.className = 'tag roster-modified-value'; tag.dataset.term = term;
        tag.dataset.rosterDerivedEffect = effect; tag.textContent = label; host.append(tag);
      };
      const addDerivedAbility = (effect, title, summary, term) => {
        const host = card.querySelector('[id$="-abilities"] .ability-list');
        if (!host || host.querySelector(`[data-roster-derived-effect="${effect}"]`)) return;
        const ability = document.createElement('article'), heading = document.createElement('h5'), line = document.createElement('p');
        ability.className = 'ability roster-enhanced-ability'; ability.dataset.rosterDerivedEffect = effect;
        heading.textContent = title; line.textContent = summary;
        if (term && terms[term]) {
          const source = document.createElement('button');
          source.type = 'button'; source.className = 'term-button roster-modified-value'; source.dataset.term = term; source.textContent = 'Rule';
          line.append(' ', source);
        }
        ability.append(heading, line); host.append(ability);
      };
      const addKeywords = (grants) => {
        if (!grants.length) return;
        const host = card.querySelector('[id$="-keywords"] .ability-list');
        if (!host || host.querySelector('[data-roster-derived-effect="detachment-keywords"]')) return;
        const block = document.createElement('div'), line = document.createElement('p');
        block.className = 'content-block roster-granted-keywords'; block.dataset.rosterDerivedEffect = 'detachment-keywords';
        line.append('Granted by Detachment: ');
        grants.forEach((grant, index) => {
          if (index) line.append(', ');
          if (!terms[grant.id] && root.DG_ROSTER_TERMS) root.DG_ROSTER_TERMS[grant.id] = {title:grant.title, summary:`This unit has the ${grant.title} keyword while using the ${grant.detachment.replace(/-/g, ' ')} Detachment.`};
          const button = document.createElement('button');
          button.type = 'button'; button.className = 'term-button'; button.dataset.term = grant.id; button.textContent = grant.title; line.append(button);
        });
        block.append(line); host.prepend(block);
      };
      const hasKeyword = (unit, keyword) => {
        const profile = profileByRosterId.get(unit.id) || facts;
        return [...(profile?.keywords || []), ...(profile?.factionKeywords || [])].some((item) => normalize(item?.title || item?.name || item?.id || item) === normalize(keyword));
      };

      if (Array.isArray(projectedEffects)) {
        if (!applyProjectedEffects) return;
        const sharedEnhancementEffects=new Set(['furnace-attacks','furnace-strength','furnace-devastating','critical-hit-5','melee-a-2','plague-wind-range','narthecium-d3','mobile-keyword']);
        const rowsFor=effect=>effect.targetId==='all'?weaponRows():effect.targetId==='ranged'?weaponRows('ranged'):effect.targetId==='melee'?weaponRows('melee'):effect.targetId==='selected-melee'?weaponRows('melee').filter(row=>effect.profileIds?.includes(row.id)):String(effect.targetId).startsWith('family:')?weaponRows().filter(row=>root.WHRosterEntities.weaponFamily(row.querySelector('.weapon-button')?.textContent||row.firstElementChild?.textContent)===String(effect.targetId).slice(7)):[];
        for(const effect of projectedEffects){if(sharedEnhancementEffects.has(effect.id))continue;if(effect.component==='ability')addDerivedAbility(effect.id,effect.title,effect.summary,effect.source?.id);else if(effect.component==='stat'&&effect.operation==='add')modifyModelStat(effect.targetId,effect.delta,effect.id);else if(effect.component==='stat'&&effect.operation==='set')setModelStat(effect.targetId,effect.to,effect.id);else if(effect.component==='keyword'&&effect.operation==='grant')addKeywords([{id:`keyword-${slug(effect.targetId)}`,title:effect.targetId,detachment:String(effect.source?.id||'roster').replace(/^detachment-/,'')}]);else if(effect.component==='weapon')for(const row of rowsFor(effect)){if(effect.operation==='grant-tag')addWeaponTag(row,effect.tag,effect.termId,effect.id);else if(effect.operation==='add-stat')modifyWeaponStat(row,effect.stat,effect.delta,effect.id);else if(effect.operation==='set-stat')setWeaponStat(row,effect.stat,effect.to,effect.id);}}
        return;
      }

      const unitSlug = cardId.replace(/^unit-/, '');
      addKeywords(KEYWORD_GRANTS.filter((grant) => normalizedDetachments.includes(grant.detachment) && grant.units.includes(unitSlug)));
      if (terms[DG_RULE.destroyer] && from('unit-typhus') && cardId !== 'unit-typhus') addDerivedAbility('destroyer-hive', 'The Destroyer Hive', 'Melee attacks that target this Attached Unit: -1 to the Hit roll.', DG_RULE.destroyer);
      if (terms[DG_RULE.foul] && from('unit-biologus-putrifier')) { weaponRows().forEach((row) => addWeaponTag(row, 'LETHAL HITS', 'core-lethal-hits', 'foul-infusion')); if (cardId !== 'unit-biologus-putrifier') addDerivedAbility('foul-infusion', 'Foul Infusion', 'Critical Hits are scored on unmodified Hit rolls of 5+.', DG_RULE.foul); }
      if (terms[DG_RULE.icon] && from('unit-icon-bearer')) modifyModelStat('OC', 1, 'unclean-icon');
      if (terms[DG_RULE.vector] && from('unit-lord-of-contagion')) weaponRows('melee').forEach((row) => { addWeaponTag(row, 'SUSTAINED HITS 1', 'core-sustained-hits', 'vector-of-disease'); addWeaponTag(row, 'LANCE', 'core-lance', 'vector-of-disease'); });
      if (terms[DG_RULE.shroud] && from('unit-lord-of-poxes') && cardId !== 'unit-lord-of-poxes') addDerivedAbility('shroud-of-disease', 'Shroud of Disease', 'This Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".', DG_RULE.shroud);
      if (terms[DG_RULE.virulent] && from('unit-lord-of-virulence') && cardId !== 'unit-lord-of-virulence') addDerivedAbility('virulent-aura', 'Virulent Aura', 'Models in this Attached Unit can re-roll Wound rolls for ranged attacks.', DG_RULE.virulent);
      if (terms[DG_RULE.vitality] && from('unit-noxious-blightbringer')) { modifyModelStat('M', 1, 'sickening-vitality'); if (cardId !== 'unit-noxious-blightbringer') addDerivedAbility('sickening-vitality', 'Sickening Vitality', 'Models in this Attached Unit can re-roll Advance and Charge rolls.', DG_RULE.vitality); }
      if (terms[DG_RULE.malicious] && from('unit-tallyman') && cardId !== 'unit-tallyman') addDerivedAbility('malicious-calculations', 'Malicious Calculations', 'Models in this Attached Unit can ignore modifiers to BS, WS and Hit rolls.', DG_RULE.malicious);
      if (terms[DG_RULE.silent] && entryEvery((unit) => canonicalUnitId(unit) !== 'unit-deathshroud-terminators' && canonicalUnitId(bodyguardFor(unit)) === 'unit-deathshroud-terminators')) addDerivedAbility('silent-bodyguard', 'Silent Bodyguard', 'Feel No Pain 4+.', DG_RULE.silent);
      if (cardId === 'unit-helbrute' && terms[DG_RULE.froth]) { const rows = weaponRows('melee').filter((row) => normalize(row.querySelector('.weapon-button')?.textContent || row.firstElementChild?.textContent) !== 'close combat weapon' && root.WHRosterEntities.loadoutIncludesProfile(unitLoadout(first), row.querySelector('.weapon-button')?.textContent || row.firstElementChild?.textContent)); if (rows.length === 2) rows.forEach((row) => modifyWeaponStat(row, 'A', 2, 'froth-spattered-frenzy')); }
      if ((cardId === 'unit-plague-drones' || cardId === 'unit-plaguebearers') && entryEvery((unit) => hasWargear(unit, 'Daemonic Icon'))) setModelStat('Ld', '6+', 'daemonic-icon');
      if ((cardId === 'unit-plague-drones' || cardId === 'unit-plaguebearers') && entryEvery((unit) => hasWargear(unit, 'Instrument of Chaos'))) addDerivedAbility('instrument-of-chaos', 'Instrument of Chaos', 'Add 1 to Charge rolls made for this unit.', cardId === 'unit-plague-drones' ? DG_RULE.dronesInstrument : DG_RULE.bearersInstrument);
      if (entryEvery((unit) => ownsEnhancement(unit, DG_ENH.regeneration))) addDerivedAbility('revolting-regeneration', 'Revolting Regeneration', 'Feel No Pain 5+.', 'core-feel-no-pain');
      if (entryEvery((unit) => canonicalUnitId(bodyguardFor(unit)) === 'unit-poxwalkers' && Boolean(attachedEnhancementOwner(unit, DG_ENH.pipes)))) { modifyModelStat('OC', 1, 'witherbone-pipes'); if (!entryEvery((unit) => ownsEnhancement(unit, DG_ENH.pipes))) addDerivedAbility('witherbone-pipes', 'Witherbone Pipes', 'Add 1 to Leadership and Battle-shock tests made for this Attached Unit.', DG_ENH.pipes); }
      if (entryEvery((unit) => ownsEnhancement(unit, DG_ENH.sorrowsyphon) && canonicalUnitId(bodyguardFor(unit)) === 'unit-poxwalkers')) weaponRows('ranged').filter((row) => root.WHRosterEntities.weaponFamily(row.querySelector('.weapon-button')?.textContent || row.firstElementChild?.textContent) === 'plague wind').forEach((row) => modifyWeaponStat(row, 'D', 1, 'sorrowsyphon'));
      if (cardId === 'unit-poxwalkers' && entryEvery((unit) => Boolean(attachedEnhancementOwner(unit, DG_ENH.talisman)))) modifyModelStat('T', 1, 'talisman-of-burgeoning');
      if (entryEvery((unit) => Boolean(attachedEnhancementOwner(unit, DG_ENH.vigour)))) { modifyModelStat('M', 1, 'vile-vigour'); if (!entryEvery((unit) => ownsEnhancement(unit, DG_ENH.vigour))) addDerivedAbility('vile-vigour', 'Vile Vigour', 'Models in this Attached Unit can re-roll Advance rolls.', DG_ENH.vigour); }
      if (entryEvery((unit) => Boolean(attachedEnhancementOwner(unit, DG_ENH.helm))) && !entryEvery((unit) => ownsEnhancement(unit, DG_ENH.helm))) addDerivedAbility('helm-of-the-fly-king', 'Helm of the Fly King', 'Models in this Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".', DG_ENH.helm);
      if (entryEvery((unit) => ownsEnhancement(unit, DG_ENH.plagueveil))) addDerivedAbility('plagueveil', 'Plagueveil', 'This unit has -3" Detection Range.', DG_ENH.plagueveil);
      if (normalizedDetachments.includes('contagion-engines') && ['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(cardId)) weaponRows('ranged').forEach((row) => addWeaponTag(row, 'ASSAULT', 'core-assault', 'warped-and-rusted-animus'));
      if (normalizedDetachments.includes('paragons-of-putrescence') && entryEvery((unit) => hasKeyword(unit, 'CHARACTER'))) addDerivedAbility('hypervirulent-strains', 'Hypervirulent Strains', 'Contagion Range +3" (to a maximum of 12").', DG_RULE.strains);
    };

    return Object.freeze({stateKey, projectEffects, decorate, hasWargear});
  };

  root.DGRosterSemantics = Object.freeze({slug, normalize, splitLabels, unitLoadout, unitRows, unitModelCount, hasWargear, createContext});
})(window);
