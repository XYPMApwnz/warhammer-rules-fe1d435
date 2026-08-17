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

  const semantics=window.DGRosterSemantics;
  const {slug,normalize,splitLabels,unitLoadout,unitRows,unitModelCount}=semantics;
  const rosterById=new Map(roster.units.map(unit=>[unit.id,unit])),usedCharacters=new Set(),attachments={};
  const profile=unit=>{try{return JSON.parse(document.getElementById(`unit-${slug(unit?.name)}`)?.dataset.ruleFacts||'null');}catch{return null;}};
  const attachmentRelation=(bodyguard,character)=>{const body=profile(bodyguard),leader=profile(character);return body&&leader&&([...(leader.relations?.canLead||[]),...(leader.relations?.canSupport||[])].find(item=>item.unitId===body.unitId)||[...(body.relations?.canBeLedBy||[]),...(body.relations?.canBeSupportedBy||[])].find(item=>item.unitId===leader.unitId));};
  for(const [bodyguardId,characterIds] of Object.entries(record?.attachments||{})){const bodyguard=rosterById.get(bodyguardId),legal=[];if(!bodyguard)continue;for(const characterId of characterIds||[]){const character=rosterById.get(characterId),relation=attachmentRelation(bodyguard,character);if(!character||!relation||usedCharacters.has(characterId)||legal.length>=(Number(relation.maxCharacters)||1))continue;legal.push(characterId);usedCharacters.add(characterId);}if(legal.length)attachments[bodyguardId]=legal;}
  const resolveRosterDetachmentIds=(normalizedIds,availableIds)=>{const ids=[...new Set(normalizedIds.filter(Boolean))];return ids.length&&ids.every(id=>availableIds.filter(candidate=>candidate===id).length===1)?ids:null;};
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
  const enhancements = roster.enhancements || (roster.enhancement && roster.enhancement !== "—" ? [roster.enhancement] : []);
  const semantic=semantics.createContext({roster,attachments,terms:canonicalTerms,profileFor:profile});
  const renderGroupLabel = (control, base, group, split) => {
    const primary=document.createElement('span'),name=document.createElement('span');
    primary.style.cssText='display:flex;justify-content:space-between;gap:8px;';
    name.textContent=`${base}${group.copies>1?` ×${group.copies}`:''}`;primary.append(name);
    if(split&&group.copies===1){const marker=document.createElement('small');marker.textContent=`#${group.numbers[0]}`;marker.style.opacity='.72';primary.append(marker);}
    control.replaceChildren(primary);
    if(split){const meta=document.createElement('small'),models=unitModelCount(group.units[0]);meta.textContent=`${models} ${models===1?'model':'models'} · ${group.units[0].points} pts${group.copies>1?' each':''}`;meta.style.cssText='display:block;margin-top:2px;opacity:.72;font-weight:500;';control.append(meta);}
  };
  const unitStateKey = (unit) => semantic.stateKey(unit);
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
    semantic.decorate(card,entry.units,[...detachmentIds]);
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
