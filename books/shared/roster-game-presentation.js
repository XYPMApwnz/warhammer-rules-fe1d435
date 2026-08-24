(function(root){
  'use strict';
  const SCHEMA='wh40k-physical-unit-game-projection/v1';
  const list=value=>Array.isArray(value)?value:[];
  const unique=value=>[...new Set(list(value).filter(Boolean))];
  const directParts=card=>[...card.children].filter(node=>node.matches?.('.unit-part'));
  const cardsIn=node=>[...(node?.matches?.('.unit-card')?[node]:[]),...node?.querySelectorAll?.('.unit-card')||[]];
  const currentRelation=relation=>relation?.certainty==='current'&&relation?.provenance?.kind==='explicit-roster-attachment';
  const exactGameUnit=(card,projection)=>projection?.game?.units?.find(unit=>unit.identity.instanceId===card.dataset.rosterInstance)||null;
  const partEnding=(card,suffix)=>directParts(card).find(part=>part.id.endsWith(suffix))||null;
  const element=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!=null)node.textContent=text;return node;};
  const signed=value=>Number(value)>0?`+${value}`:String(value);

  function instanceTitle(instanceId,projection){
    const units=list(projection.game?.units),unit=units.find(item=>item.identity.instanceId===instanceId);if(!unit)return 'Roster unit';
    const copies=units.filter(item=>item.identity.canonicalDatasheetId===unit.identity.canonicalDatasheetId),index=copies.findIndex(item=>item.identity.instanceId===instanceId);
    return copies.length>1?`${unit.identity.canonicalTitle} · roster unit ${index+1}`:unit.identity.canonicalTitle;
  }
  function sourceTitle(effect,projection){
    const source=effect.source||{},catalog=projection.catalog||{};
    if(source.kind==='detachment')return list(catalog.detachments).find(item=>item.id===source.id)?.title||'Detachment';
    if(source.kind==='enhancement')return list(catalog.enhancements).find(item=>[item.id,item.ruleId,item.legacyKey].includes(source.id))?.title||'Enhancement';
    if(source.kind==='explicit-attachment')return source.ownerInstanceId?instanceTitle(source.ownerInstanceId,projection):'Explicit attachment';
    if(source.kind==='selected-wargear')return 'Selected wargear';
    if(source.kind==='datasheet')return 'Datasheet';
    if(source.kind==='faction-rule')return 'Faction rule';
    return '';
  }
  function effectLabel(effect){
    if(effect.component==='ability')return effect.title||'Granted ability';
    if(effect.component==='keyword')return `${effect.targetId} ${effect.operation==='remove'?'removed':'added'}`;
    if(effect.component==='stat')return effect.base!=null&&effect.effective!=null&&effect.base!==effect.effective?`${effect.targetId} ${effect.base} → ${effect.effective}`:`${effect.targetId} ${effect.operation==='set'?`set to ${effect.to}`:signed(effect.delta)}`;
    if(effect.component==='weapon'&&effect.operation==='grant-tag')return `${effect.tag} · ${effect.targetId==='all'?'all weapons':`${effect.targetId} weapons`}`;
    if(effect.component==='weapon'&&effect.operation==='add-stat')return `${effect.stat} ${signed(effect.delta)} · ${effect.targetId} weapons`;
    if(effect.component==='weapon'&&effect.operation==='grant-profile')return 'Additional weapon profile';
    return '';
  }
  const activeEffect=effect=>(effect.state||'active')==='active'&&(effect.certainty||'current')==='current'&&effect.condition?.state!=='unknown';
  const effectSources=(effects,projection)=>unique(effects.map(effect=>sourceTitle(effect,projection)).filter(Boolean));
  function markChange(host,base,effective,effects,projection){if(!host||base==null||effective==null||String(base)===String(effective))return;host.querySelector(':scope > .roster-game-change')?.remove();const source=effectSources(effects,projection),note=element('small','roster-game-change',`${base} → ${effective}${source.length?` · ${source.join(' + ')}`:''}`);host.append(note);}
  function applyEffectiveStats(card,gameUnit,projection){const stats=gameUnit.effective?.stats||{};for(const stat of card.querySelectorAll('.stat[data-source-field]')){const field=stat.dataset.sourceField.split('.').pop(),entry=Object.entries(stats).find(([key])=>String(key).toLowerCase()===String(field).toLowerCase());if(!entry)continue;const effects=list(gameUnit.effects).filter(effect=>activeEffect(effect)&&effect.component==='stat'&&String(effect.targetId).toLowerCase()===String(field).toLowerCase()),value=stat.querySelector('span');if(!effects.length||!value)continue;const base=effects[0].base??value.textContent.trim(),effective=entry[1];value.dataset.rosterBaseValue=base;value.textContent=effective;value.classList.add('roster-modified');markChange(stat,base,effective,effects,projection);}}
  const rowId=row=>row.dataset.rosterProfileId||row.id||'';
  function ensureWeaponRow(card,profile){let row=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')].find(item=>rowId(item)===profile.id);if(row)return{row,created:false};const group=[...card.querySelectorAll('.weapon-group')].find(node=>node.querySelector('h5')?.textContent.trim().toLowerCase().startsWith(profile.mode));const table=group?.querySelector('.weapon-table');if(!table)return null;row=element('div','weapon-row roster-derived-weapon');row.dataset.rosterProfileId=profile.id;const name=element('div','',profile.title);name.append(element('div','weapon-tags'));row.append(name);for(const field of profile.mode==='melee'?['Range','A','WS','S','AP','D']:['Range','A','BS','S','AP','D']){const cell=element('div','',profile.values?.[field]??'');cell.dataset.label=field;row.append(cell);}table.append(row);return{row,created:true};}
  function applyEffectiveWeapons(card,gameUnit,projection){for(const profile of list(gameUnit.effective?.weaponProfiles)){const effects=list(gameUnit.effects).filter(effect=>activeEffect(effect)&&effect.component==='weapon'&&list(effect.targets).some(target=>target.profileId===profile.id));if(!effects.length)continue;const resolved=ensureWeaponRow(card,profile);if(!resolved)continue;const{row,created}=resolved;if(created)row.hidden=false;for(const [field,effective] of Object.entries(profile.values||{})){const cell=row.querySelector(`[data-label="${field}"]`),target=effects.flatMap(effect=>list(effect.targets).map(item=>({effect,...item}))).find(item=>item.profileId===profile.id&&item.field===field);if(!cell||!target||String(target.base)===String(effective))continue;cell.dataset.rosterBaseValue=target.base;cell.textContent=effective;cell.classList.add('roster-modified');}let tags=row.firstElementChild?.querySelector('.weapon-tags');if(!tags&&row.firstElementChild){tags=element('div','weapon-tags');row.firstElementChild.append(tags);}const existing=new Set([...tags?.children||[]].map(node=>node.textContent.trim().toLowerCase()));for(const tag of list(profile.tags))if(!existing.has(String(tag).toLowerCase()))tags?.append(element('span','tag roster-modified',tag));const changed=effects.flatMap(effect=>list(effect.targets).map(target=>({...target,effect}))).filter(target=>target.profileId===profile.id&&JSON.stringify(target.base)!==JSON.stringify(target.effective));if(changed.length){let notes=row.firstElementChild?.querySelector('.roster-game-weapon-effects');if(!notes&&row.firstElementChild){notes=element('small','roster-game-weapon-effects');row.firstElementChild.append(notes);}for(const source of effectSources(changed.map(item=>item.effect),projection))if(![...notes?.children||[]].some(node=>node.textContent===source))notes?.append(element('span','',source));}}}
  function applyEffectiveAbilities(card,gameUnit,projection){const section=partEnding(card,'-abilities'),listNode=section?.querySelector('.ability-list');if(!listNode)return;for(const effect of list(gameUnit.effects).filter(effect=>effect.component==='ability')){const title=effect.title||effect.targetId,existing=[...listNode.querySelectorAll(':scope > .ability')].find(node=>[node.dataset.rosterRuleId,node.id,node.querySelector('h5')?.textContent].some(value=>String(value||'').trim().toLowerCase()===String(effect.targetId||title).toLowerCase()));if(effect.operation==='remove'&&activeEffect(effect)){if(existing)existing.hidden=true;continue;}if(!title||existing)continue;const article=element('article',`ability roster-game-derived-ability${activeEffect(effect)?'':' roster-game-conditional'}`),heading=element('h5','',title),body=element('p','',effect.summary||'Roster effect reference.'),source=sourceTitle(effect,projection);article.dataset.rosterEffectId=effect.id;article.append(heading,body);if(source)article.append(element('small','roster-game-change',`${activeEffect(effect)?'Added by':'Conditional ·'} ${source}`));listNode.prepend(article);}}
  function applyEffectiveKeywords(card,gameUnit){const section=partEnding(card,'-keywords'),host=section?.querySelector('.keyword-list');if(!host)return;const effective=unique(gameUnit.effective?.keywords),keys=new Set(effective.map(value=>String(value).toLowerCase()));for(const tag of host.children)tag.hidden=!keys.has(tag.textContent.trim().toLowerCase());for(const keyword of effective)if(![...host.children].some(tag=>tag.textContent.trim().toLowerCase()===String(keyword).toLowerCase()))host.append(element('span','roster-derived-keyword',keyword));}
  function applyEffectiveState(card,gameUnit,projection){applyEffectiveStats(card,gameUnit,projection);applyEffectiveWeapons(card,gameUnit,projection);applyEffectiveAbilities(card,gameUnit,projection);applyEffectiveKeywords(card,gameUnit);}
  function replaceCost(card,gameUnit){
    const points=gameUnit.selection.points,models=gameUnit.selection.modelCount;
    if(points?.state!=='resolved')return;
    const cost=card.querySelector(':scope > :is(.unit-head,.unit-header) :is(.points,.unit-status)');if(!cost)return;
    cost.replaceChildren();cost.classList.add('roster-game-cost');
    cost.append(element('strong','',`${points.value} pts`));
    if(models?.state==='resolved')cost.append(element('small','',`${models.value} ${models.value===1?'model':'models'}`));
  }
  function buildSummary(card,gameUnit,projection){
    const summary=element('section','roster-game-summary');summary.setAttribute('aria-label','Roster unit summary');
    const peers=list(projection.game.units).filter(item=>item.identity.canonicalDatasheetId===gameUnit.identity.canonicalDatasheetId),ordinal=peers.findIndex(item=>item.identity.instanceId===gameUnit.identity.instanceId)+1;
    summary.append(element('div','roster-game-kicker',peers.length>1?`Physical roster unit ${ordinal} of ${peers.length}`:'Physical roster unit'));
    const facts=element('div','roster-game-facts'),models=gameUnit.selection.modelCount,points=gameUnit.selection.points;
    if(models?.state==='resolved')facts.append(element('span','',`${models.value} ${models.value===1?'model':'models'}`));
    if(points?.state==='resolved')facts.append(element('span','',`${points.value} pts`));
    for(const id of unique(gameUnit.rosterState.detachments)){const title=list(projection.catalog?.detachments).find(item=>item.id===id)?.title;if(title)facts.append(element('span','',title));}
    for(const enhancement of list(gameUnit.rosterState.enhancements))if(enhancement.title)facts.append(element('span','roster-game-enhancement',`Enhancement: ${enhancement.title}`));
    if(facts.children.length)summary.append(facts);
    const leaders=list(gameUnit.attachments.leaders).filter(currentRelation),leading=list(gameUnit.attachments.leading).filter(currentRelation);
    const relations=element('div','roster-game-relations');
    const addRelations=(label,items)=>{if(!items.length)return;const row=element('p','');row.append(element('strong','',`${label}: `),document.createTextNode(items.map(item=>instanceTitle(item.instanceId,projection)).join(', ')));relations.append(row);};
    addRelations(leaders.length>1?'Leaders':'Leader',leaders);addRelations('Leading',leading);
    if(relations.children.length)summary.append(relations);
    const head=[...card.children].find(node=>node.matches?.('.unit-head,.unit-header'));(head||card.firstElementChild)?.after(summary);
  }
  function filterWeapons(card,gameUnit){
    const loadout=gameUnit.selection.loadout,resolution=loadout.weaponResolution||{},selected=unique(loadout.selectedProfileIds),rows=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')];
    const idFor=row=>row.dataset.rosterProfileId||row.id||'',complete=resolution.state==='resolved'&&selected.length>0&&selected.every(id=>rows.filter(row=>idFor(row)===id).length===1);
    if(!complete){card.dataset.rosterGameWeapons='fallback';if(['partial','unresolved'].includes(resolution.state)){const profile=partEnding(card,'-profile');profile?.append(element('p','roster-game-fallback','Selected loadout is unresolved; all canonical weapon profiles remain visible.'));}return;}
    const visible=new Set(selected);for(const row of rows)row.hidden=!visible.has(idFor(row));
    for(const group of card.querySelectorAll('.weapon-group'))group.hidden=![...group.querySelectorAll('.weapon-row:not(.weapon-head)')].some(row=>!row.hidden);
    card.dataset.rosterGameWeapons='filtered';
  }
  function filterWargearAbilities(card,gameUnit){
    const section=partEnding(card,'-wargear-abilities');if(!section)return;
    const loadout=gameUnit.selection.loadout,resolution=loadout.wargearResolution||{},selected=unique(loadout.selectedWargearAbilityIds),articles=[...section.querySelectorAll('.ability')],idFor=article=>article.dataset.rosterWargearAbilityId||article.id||'';
    const complete=resolution.state==='resolved'&&selected.every(id=>articles.filter(article=>idFor(article)===id).length===1)&&articles.every(article=>Boolean(idFor(article)));
    if(!complete){section.dataset.rosterGameAbilities='fallback';if(['partial','unresolved'].includes(resolution.state))section.append(element('p','roster-game-fallback','Wargear Ability linkage is unresolved; canonical abilities remain visible.'));return;}
    const visible=new Set(selected);for(const article of articles)article.hidden=!visible.has(idFor(article));section.hidden=!articles.some(article=>!article.hidden);section.dataset.rosterGameAbilities='filtered';
  }
  function transformComposition(card,gameUnit){
    const composition=gameUnit.selection.composition,models=gameUnit.selection.modelCount,section=partEnding(card,'-composition');if(!section||composition?.state!=='resolved'||models?.state!=='resolved')return;
    for(const child of [...section.children]){child.hidden=true;child.dataset.rosterGameCanonical='true';}
    const block=element('div','roster-game-composition');block.dataset.rosterGameGenerated='composition';block.append(element('h4','', 'Roster Composition'),element('p','roster-game-composition-total',`${models.value} ${models.value===1?'model':'models'}`));
    const grouped=new Map();for(const model of list(composition.models)){const name=model.sourceText||'Model';grouped.set(name,(grouped.get(name)||0)+Number(model.quantity||0));}
    if(grouped.size){const rows=element('ul','');for(const [name,quantity] of grouped)rows.append(element('li','',`${quantity} × ${name}`));block.append(rows);}
    section.append(block);section.dataset.rosterGameComposition='actual';
  }
  function omitBuildGuidance(card,gameUnit){
    if(gameUnit.selection.loadout.state==='resolved'){const options=partEnding(card,'-wargear-options');if(options){options.hidden=true;options.dataset.rosterGameOmitted='wargear-options';}}
    const factual=[...list(gameUnit.attachments.leaders),...list(gameUnit.attachments.leading)].some(currentRelation);if(!factual)return;
    for(const part of directParts(card))if(part.id.endsWith('-leader')||part.id.endsWith('-support')){part.hidden=true;part.dataset.rosterGameOmitted='generic-attachment-eligibility';}
  }
  function presentEffects(card,gameUnit,projection){
    const effects=list(gameUnit.effects);if(!effects.length)return;
    const abilities=partEnding(card,'-abilities')||card,block=element('aside','roster-game-effects');block.setAttribute('aria-label','Active roster effects');block.append(element('h5','', 'Active roster effects'));
    const rows=element('ul','');for(const effect of effects){const label=effectLabel(effect);if(!label)continue;const item=element('li','');item.dataset.effectState=activeEffect(effect)?'active':'conditional';item.append(element('span','',label));const source=sourceTitle(effect,projection);if(source)item.append(element('small','',`${activeEffect(effect)?'':'Conditional · '}${source}`));rows.append(item);}
    if(rows.children.length){block.append(rows);abilities.append(block);}
  }
  function emphasizeKeywords(card,gameUnit){
    const section=partEnding(card,'-keywords');if(!section)return;section.dataset.rosterGameEffective='true';const heading=section.querySelector(':scope > h4');if(heading)heading.textContent='Effective Keywords';
    const profile=gameUnit.rosterState.keywordProfile||{},added=unique([...list(profile.added),...list(gameUnit.effects).filter(effect=>effect.component==='keyword'&&effect.operation!=='remove').map(effect=>effect.targetId)]),removed=unique([...list(profile.removed),...list(gameUnit.effects).filter(effect=>effect.component==='keyword'&&effect.operation==='remove').map(effect=>effect.targetId)]);
    if(!added.length&&!removed.length)return;const changes=element('div','roster-game-keyword-changes');for(const value of added)changes.append(element('span','roster-game-added',`+ ${value}`));for(const value of removed)changes.append(element('span','roster-game-removed',`− ${value}`));section.append(changes);
  }
  function syncNavigation(card){
    const nav=[...card.children].find(node=>node.matches?.('.local-nav'));if(!nav)return;
    for(const button of nav.querySelectorAll('[data-journey-target]')){const target=[...card.querySelectorAll('[id]')].find(node=>node.id===button.dataset.journeyTarget);button.hidden=!target||target.hidden;}
  }
  function present(card,gameUnit,projection){
    if(card.dataset.rosterGameInstance===gameUnit.identity.instanceId)return card;
    card.dataset.rosterGameInstance=gameUnit.identity.instanceId;card.classList.add('roster-game-view');
    replaceCost(card,gameUnit);buildSummary(card,gameUnit,projection);filterWeapons(card,gameUnit);filterWargearAbilities(card,gameUnit);transformComposition(card,gameUnit);omitBuildGuidance(card,gameUnit);applyEffectiveState(card,gameUnit,projection);presentEffects(card,gameUnit,projection);emphasizeKeywords(card,gameUnit);syncNavigation(card);return card;
  }
  function install(node=document,projection=root.WH_ARMY_ROSTER_PROJECTION){
    if(projection?.game?.schema!==SCHEMA)return node;
    for(const card of cardsIn(node)){if(card.dataset.rosterSelected!=='true'||!card.dataset.rosterInstance)continue;const gameUnit=exactGameUnit(card,projection);if(gameUnit)present(card,gameUnit,projection);}
    return node;
  }
  root.addEventListener?.('wh-roster-projection-ready',event=>install(document,event.detail?.projection));
  root.WHArmyRosterGamePresentation=Object.freeze({SCHEMA,install,present});
  install(document,root.WH_ARMY_ROSTER_PROJECTION);
}(window));
