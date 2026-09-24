(function(root){
  'use strict';

  const data=root.WH40K_GLOSSARY_V2_INDEX;
  if(!data||data.schema!=='wh40k-glossary-v2-index/v1')throw new Error('Glossary V2 index is unavailable or unsupported.');

  const entries=data.entries;
  const byId=new Map(entries.map(entry=>[entry.id,entry]));
  const byKey=new Map();
  const normalize=value=>String(value||'').replace(/[\u2018\u2019]/g,"'").replace(/[\u2013\u2014]/g,'-').replace(/\s+/g,' ').trim().toLocaleLowerCase();
  const addKey=(key,entry)=>{if(!key)return;const values=byKey.get(key)||[];if(!values.includes(entry))values.push(entry);byKey.set(key,values);};
  for(const entry of entries){addKey(entry.sourceOwner?.canonicalId,entry);for(const alias of entry.aliases||[])addKey(alias,entry);}
  const standaloneCompatibilityKeys=new Map();
  for(const entry of entries){
    const key=entry.parent?null:entry.facts?.termId;
    if(!key)continue;
    const values=standaloneCompatibilityKeys.get(key)||[];values.push(entry);standaloneCompatibilityKeys.set(key,values);
  }
  for(const [key,values] of standaloneCompatibilityKeys){
    if(values.length!==1)continue;
    const entry=values[0],existing=byKey.get(key)||[];
    if(existing.some(candidate=>candidate!==entry))continue;
    addKey(key,entry);
  }

  const text=value=>typeof value==='string'?value.trim():'';
  const collectContent=value=>{
    if(!Array.isArray(value))return'';
    return value.flatMap(item=>{
      if(typeof item==='string')return[item];
      if(!item||typeof item!=='object')return[];
      if(item.text)return[item.text];
      if(Array.isArray(item.rows))return[...(item.columns||[]),...item.rows.flatMap(row=>Array.isArray(row)?row:[row.label,...(row.cells||[])])].filter(Boolean);
      return[];
    }).filter(Boolean).join('\n');
  };
  const structuredOptionsDefinition=facts=>{
    if(!Array.isArray(facts.options)||!facts.options.length)return'';
    const lines=[];
    if(text(facts.openingText))lines.push(text(facts.openingText));
    for(const option of facts.options){
      if(!option||typeof option!=='object')continue;
      const heading=[text(option.label)||text(option.title),text(option.subtitle)].filter(Boolean).join(' — ');
      const optionLines=[];
      if(text(option.text))optionLines.push(text(option.text));
      if(Array.isArray(option.effects))optionLines.push(...option.effects.map(text).filter(Boolean).map(effect=>`• ${effect}`));
      if(heading&&optionLines.length)lines.push(heading,...optionLines);
    }
    return lines.join('\n');
  };
  const detachmentDefinition=entry=>{
    const facts=entry.facts||{},lines=[];
    const forceDisposition=entry.canonicalReferences?.find(reference=>reference.relationType==='FORCE_DISPOSITION'),forceDispositionLabel=forceDisposition&&byId.get(forceDisposition.id)?.label;
    const detachmentPoints=entry.mfm?.detachment?.detachmentPoints;
    if(forceDispositionLabel||Number.isFinite(detachmentPoints))lines.push([forceDispositionLabel&&`Force Disposition: ${forceDispositionLabel}.`,Number.isFinite(detachmentPoints)&&`Detachment Points: ${detachmentPoints}DP.`].filter(Boolean).join(' '));
    if(text(facts.tagline))lines.push(text(facts.tagline));
    if(text(facts.restrictions))lines.push(`Restrictions: ${text(facts.restrictions)}`);
    const tags=[...(facts.tags||[]),...(entry.mfm?.qualifiers||[]).map(record=>record.label)].filter(Boolean);
    if(tags.length)lines.push(`Tags: ${[...new Set(tags)].join(', ')}.`);
    for(const rule of facts.detachmentRules||[]){
      const ruleLines=[];
      const direct=['semanticContent','text','full','definition','ruleText','rulesText','description'].map(field=>text(rule[field])).find(Boolean);
      if(direct)ruleLines.push(direct);
      for(const block of rule.blocks||[]){
        if(text(block.text))ruleLines.push(text(block.text));
        else if(Array.isArray(block.rows)){
          if(block.columns?.length)ruleLines.push(block.columns.join(' | '));
          for(const row of block.rows)ruleLines.push((Array.isArray(row)?row:[row.label,...(row.cells||[])]).filter(value=>value!==null&&value!==undefined&&String(value).trim()).join(' | '));
        }
      }
      if(ruleLines.length)lines.push([text(rule.title),...ruleLines].filter(Boolean).join('\n'));
    }
    return lines.join('\n');
  };
  const missionSequenceRequirement=requirement=>{
    const renderers={
      MUSTER_ARMIES_AS_DESCRIBED_IN_CORE_RULES:()=>`Muster armies as described in the Core Rules.`,
      SECRET_FORCE_DISPOSITION_SELECTION:()=>`Each player secretly selects one available Force Disposition.`,
      SIMULTANEOUS_REVEAL:()=>`Reveal both players' selections simultaneously.`,
      DIRECTED_PRIMARY_MATRIX_LOOKUP:()=>`For each player, use their Force Disposition and their opponent's Force Disposition to find that player's Primary Mission in the mission matrix.`,
      SHUFFLE_AND_DRAW_ONE_DEPLOYMENT_CARD:()=>`Shuffle the Deployment cards and draw one Deployment card.`,
      MUTUAL_AGREEMENT_REQUIRED:()=>`Use a Twist only if both players agree.`,
      CHOOSE_ONE_TWIST:()=>`If both players agree to use a Twist, select one Twist.`,
      BATTLEFIELD_SIZE:value=>`Use a ${value.widthInches}\" by ${value.heightInches}\" battlefield.`,
      CENTRAL_OBJECTIVE_ROLL:value=>`Roll one D6 for the central objective setup: on ${value.singleOnResults.join(', ')}, use one central objective; on ${value.doubleOnResults.join(', ')}, use two central objectives, each ${value.doubleOffsetInches}\" from the battlefield centre.`,
      ALTERNATING_TERRAIN_PLACEMENT_AFTER_ROLL_OFF:()=>`After a roll-off, players alternate placing terrain features.`,
      TERRAIN_OBJECTIVE_AT_EACH_OBJECTIVE_POINT:()=>`Place a terrain objective at each objective point.`,
      AGREE_BATTLEFIELD_EDGE_MAPPING:()=>`Agree which battlefield edges correspond to the Attacker and Defender.`,
      ROLL_OFF_WINNER_ASSIGN_ATTACKER_DEFENDER:()=>`Roll off; the winner assigns one player as the Attacker and the other as the Defender.`,
      ATTACKER_AND_DEFENDER_DECKS_IDENTICAL:()=>`The Attacker and Defender Secondary Mission decks must contain identical cards.`,
      SECRET_FIXED_OR_TACTICAL_SELECTION:()=>`Each player secretly selects Fixed or Tactical Secondary Missions.`,
      FIXED_MODE_SELECT_EXACTLY_TWO:()=>`A player selecting Fixed Secondary Missions selects exactly two.`,
      DISPLAY_SELECTED_FIXED_MISSIONS_FACE_UP:()=>`Place selected Fixed Secondary Missions face up.`,
      FIXED_MISSIONS_CANNOT_BE_DISCARDED:()=>`Fixed Secondary Missions cannot be discarded.`,
      FIXED_MISSIONS_ACTIVE_THROUGHOUT_BATTLE:()=>`Fixed Secondary Missions remain active throughout the battle.`,
      SHUFFLE_SECONDARY_DECK_FACE_DOWN:()=>`Shuffle the Secondary Mission deck and place it face down.`,
      DRAW_TWO_AT_START_OF_COMMAND_PHASE:()=>`At the start of each Command phase, draw until you have two Secondary Missions.`,
      ONCE_PER_BATTLE_SPEND_ONE_CP_AT_END_OF_COMMAND_PHASE_TO_DISCARD_AND_DRAW:()=>`Once per battle, at the end of your Command phase, you can spend 1CP to discard one Secondary Mission and draw a replacement.`,
      END_OF_EACH_PLAYER_TURN_ACTIVE_PLAYER_RESOLVES_FIRST:()=>`At the end of each player turn, the active player resolves Secondary Missions first.`,
      OPTIONALLY_SCORE_MET_SECONDARY_CONDITIONS:()=>`A player can score a Secondary Mission whose scoring condition has been met.`,
      TACTICAL_ACHIEVED_MISSION_DISCARDED:()=>`After a Tactical Secondary Mission is achieved, discard it.`,
      ACTIVE_PLAYER_MAY_DISCARD_TACTICAL_MISSIONS_FOR_ONE_CP:()=>`The active player can discard Tactical Secondary Missions for 1CP.`,
      SECRETLY_RECORD_TRANSPORT_EMBARKATION:()=>`Each player secretly records which units will start the battle embarked within Transports.`,
      SECRETLY_RECORD_STRATEGIC_RESERVES:()=>`Each player secretly records which units will start the battle in Strategic Reserves.`,
      ALTERNATING_UNIT_DEPLOYMENT_DEFENDER_FIRST:()=>`Starting with the Defender, players alternate setting up one unit at a time.`,
      EXCLUDE_STRATEGIC_RESERVES:()=>`Do not deploy units that are in Strategic Reserves.`,
      WHOLLY_WITHIN_DEPLOYMENT_ZONE:()=>`Each deployed unit must be set up wholly within its player's deployment zone.`,
      TITANIC_SETUP_SKIPS_NEXT_SETUP_TURN:()=>`After a player sets up a TITANIC unit, that player skips their next opportunity to set up a unit.`,
      FINISHED_PLAYER_ALLOWS_OPPONENT_REMAINING_SETUPS:()=>`After one player has finished deploying, their opponent sets up all remaining units.`,
      RESOLVE_REDEPLOY_RULES_AFTER_BOTH_ARMIES_DEPLOYED:()=>`Resolve redeploy rules after both armies have been deployed.`,
      ALTERNATE_REDEPLOYS_ATTACKER_FIRST:()=>`Starting with the Attacker, players alternate resolving redeploy rules.`,
      REDEPLOY_TO_STRATEGIC_RESERVES_IGNORES_POINTS_LIMIT:()=>`Units redeployed into Strategic Reserves do not count towards the Strategic Reserves points limit.`,
      ROLL_OFF_WINNER_TAKES_FIRST_TURN:()=>`Roll off; the winner takes the first turn.`,
      ALTERNATE_PRE_BATTLE_RULES_FIRST_TURN_PLAYER_FIRST:()=>`Starting with the player taking the first turn, players alternate resolving pre-battle rules.`,
      FIRST_BATTLE_ROUND_BEGINS:()=>`The first battle round begins.`,
      BATTLE_ENDS_AFTER_COMPLETED_BATTLE_ROUNDS:value=>`The battle ends after ${value.battleRounds} completed battle rounds.`,
      CONTINUE_TURNS_WHEN_ARMY_HAS_NO_MODELS_AT_TURN_START:()=>`Players continue taking turns even if an army has no models on the battlefield at the start of a turn.`,
      BATTLE_READY_VP:value=>`A Battle Ready army scores ${value.victoryPoints}VP.`,
      WINNER_HAS_MOST_VP:()=>`The player with the most VP is the winner.`,
      EQUAL_VP_IS_DRAW:()=>`If the players have equal VP, the battle is a draw.`,
      IGNORE_VP_ABOVE_APPLICABLE_MAXIMUM:()=>`Ignore VP scored above an applicable maximum.`,
      SCORING_CAPS:value=>`Scoring limits: Primary Missions ${value.primaryTotal}VP total and ${value.primaryPerBattleRound}VP per battle round; Secondary Missions ${value.secondaryTotal}VP total and ${value.secondaryPerBattleRound}VP per battle round; each Fixed Secondary Mission ${value.fixedSecondaryPerCard}VP; Battle Ready ${value.battleReady}VP.`,
      MUSTER_ARMIES_AS_DESCRIBED_IN_WARHAMMER_40000_APP:()=>`Muster armies as described in the Warhammer 40,000 app.`,
      AFTER_MUSTERING_SELECT_ONE_AVAILABLE_FORCE_DISPOSITION:()=>`After mustering, select one available Force Disposition.`,
      RECORD_SELECTED_FORCE_DISPOSITION_ON_ROSTER:()=>`Record the selected Force Disposition on the army roster.`,
      COMPLETE_BEFORE_ATTENDING_EVENT:()=>`Complete this step before attending the event.`,
      USE_PRESELECTED_FORCE_DISPOSITION_CARD:()=>`Use the Force Disposition card selected when the army was mustered.`,
      FIND_OPPONENT_FORCE_DISPOSITION_SYMBOL_ON_OWN_CARD:()=>`On that card, find the symbol for the opponent's Force Disposition.`,
      ASSIGN_LISTED_PRIMARY_MISSION_TO_PLAYER:()=>`Use the listed Primary Mission for that player.`,
      SELECT_LAYOUT_BY_FORCE_DISPOSITION_MATCHUP:value=>`Use the terrain layout for the two players' Force Dispositions; available variants are ${value.variants.join(', ')}.`,
      ORGANIZER_SPECIFIES_OR_RANDOMLY_DETERMINES_VARIANT:()=>`The event organizer specifies the layout variant or determines it randomly.`,
      SET_UP_OFFICIAL_TERRAIN_AREAS_AND_FEATURES:()=>`Set up the official terrain areas and terrain features for the selected layout.`
    };
    return renderers[requirement?.type]?.(requirement)||'';
  };
  const missionSequenceDefinition=entry=>{
    const facts=entry.facts||{},requirements=facts.requirements||[],lines=requirements.map(missionSequenceRequirement);
    if(lines.some(line=>!line))return'';
    for(const clarification of facts.effectiveClarifications||[]){const sourceText=text(clarification?.clarification?.sourceText);if(sourceText)lines.push(`Clarification: ${sourceText}`);}
    return lines.join('\n');
  };
  function definitionOf(entry){
    const facts=entry.facts||{};
    if(entry.recordType==='DETACHMENT'){const definition=detachmentDefinition(entry);if(definition)return definition;}
    if(entry.recordType==='MISSION_SEQUENCE_RULE')return missionSequenceDefinition(entry);
    for(const field of ['semanticContent','text','full','definition','ruleText','rulesText','answer','description']){const value=text(facts[field]);if(value)return value;}
    const structuredOptions=structuredOptionsDefinition(facts);if(structuredOptions)return structuredOptions;
    const content=collectContent(facts.content);if(content)return content;
    const blocks=collectContent(facts.blocks);if(blocks)return blocks;
    if(facts.ruleBody){
      if(typeof facts.ruleBody==='string')return facts.ruleBody;
      const body=facts.ruleBody;
      const values=[body.flavorText,body.ruleText,body.text,body.scoring,body.timing,body.cap,body.objectiveAction].flatMap(value=>Array.isArray(value)?value:[value]).filter(value=>typeof value==='string'&&value.trim());
      if(values.length)return values.join('\n');
      return JSON.stringify(body,null,2);
    }
    if(entry.recordType==='STRATAGEM')return [['WHEN',facts.when],['TARGET',facts.target],['EFFECT',facts.effect],['RESTRICTIONS',facts.restrictions]].filter(([,value])=>text(value)).map(([label,value])=>`${label}: ${value}`).join('\n');
    if(entry.recordType==='WEAPON_PROFILE')return `${facts.mode==='ranged'?'Ranged':'Melee'} · ${facts.range||facts.Range||''} · A ${facts.a||facts.A||''} · ${facts.bs||facts.BS||facts.ws||facts.WS||facts.skill||''} · S ${facts.s||facts.S||''} · AP ${facts.ap||facts.AP||''} · D ${facts.d||facts.D||''}${facts.abilities||facts.Abilities?` · ${facts.abilities||facts.Abilities}`:''}`;
    if(entry.recordType==='UNIT')return [facts.composition,(facts.keywords||[]).length?`Keywords: ${facts.keywords.join(', ')}`:''].filter(Boolean).join('\n');
    if(Array.isArray(facts.requirements))return facts.requirements.map(item=>typeof item==='string'?item:item?.type||JSON.stringify(item)).join('\n');
    for(const field of ['effect','summary','label']){const value=text(facts[field]);if(value)return value;}
    return'';
  }
  const summaryOf=(entry,definition)=>text(entry.presentation?.editorialSummary?.text)||definition.split(/\n+/).find(Boolean)||entry.label;
  function structuredOf(entry){
    const facts=entry.facts||{};
    if(entry.recordType==='WEAPON_PROFILE'){
      const ranged=(facts.mode||'').toLowerCase()==='ranged'||String(facts.range||facts.Range||'').toLowerCase()!=='melee';
      return{weapon:{Range:facts.range??facts.Range??'',A:facts.a??facts.A??'',[ranged?'BS':'WS']:facts.skill??facts.bs??facts.BS??facts.ws??facts.WS??'',S:facts.s??facts.S??'',AP:facts.ap??facts.AP??'',D:facts.d??facts.D??'',Abilities:facts.abilities??facts.Abilities??''}};
    }
    if(entry.recordType==='UNIT'){
      const first=Array.isArray(facts.profiles)?facts.profiles[0]:null,stats=first?.stats||facts.stats;
      if(stats)return{statline:stats};
    }
    return{};
  }
  const scopeOf=entry=>entry.domain==='CORE'?'global':entry.domain==='MISSIONS'?'missions':entry.sourceOwner?.bookId||entry.contexts?.[0]?.effectiveBookId||entry.domain.toLocaleLowerCase();
  const kindOf=entry=>entry.recordType.toLocaleLowerCase().replaceAll('_','-');
  const sourceOf=entry=>{const source=entry.provenance?.base||entry.provenance||{};return{documentId:source.sourceId||source.profileId||entry.sourceOwner?.interface||entry.domain,revision:source.sourceVersion||source.sourceDate||entry.currentness?.asOf||entry.currentness?.cutoff||'',locator:source.sourceLocator?.partition||source.contentLocator||entry.sourceOwner?.canonicalId||''};};
  const relatedOf=entry=>[...new Set((entry.canonicalReferences||[]).map(reference=>reference.id).filter(id=>byId.has(id)))];
  const articleCache=new Map();
  function article(entry){
    let result=articleCache.get(entry.id);if(result)return result;
    const definition=definitionOf(entry),summary=summaryOf(entry,definition),kind=kindOf(entry),scope=scopeOf(entry),structured=structuredOf(entry),related=relatedOf(entry);
    result=Object.freeze({...entry,canonicalId:entry.sourceOwner.canonicalId,title:Object.freeze({en:entry.label}),summary:Object.freeze({en:summary}),definition:Object.freeze({en:definition}),kind,scope,edition:'11E',status:entry.currentness?.state||entry.currentness?.publicationState||'CURRENT',structured:Object.freeze(structured),related:Object.freeze(related),references:Object.freeze({}),canonicalSource:Object.freeze(sourceOf(entry)),presentation:entry.recordType==='WEAPON_PROFILE'?'profile':'article',matchLabels:Object.freeze(entry.presentation?.preferredMatchLabels||[])});
    articleCache.set(entry.id,result);return result;
  }
  const bookMatches=(entry,bookId)=>{if(!bookId)return true;if(bookId==='core-rules')return entry.domain==='CORE';if(entry.domain==='CORE')return true;if(entry.domain!=='ARMY')return false;return(entry.contexts||[]).some(context=>context.effectiveBookId===bookId);};
  function candidates(id,{bookId='',parentId='',recordType=''}={}){
    if(byId.has(id))return[byId.get(id)];
    let values=(byKey.get(id)||[]).filter(entry=>bookMatches(entry,bookId));
    if(recordType)values=values.filter(entry=>entry.recordType===recordType);
    if(parentId)values=values.filter(entry=>entry.parent?.canonicalId===parentId||(entry.contexts||[]).some(context=>context.parentUnitId===parentId));
    return values;
  }
  function resolveEntry(id,options={}){const values=candidates(id,options);return values.length===1?values[0]:null;}
  function resolvePreferred(label,{bookId=''}={}){const token=normalize(label),values=entries.filter(entry=>(entry.presentation?.preferredMatchLabels||[]).some(value=>normalize(value)===token)&&bookMatches(entry,bookId));return values.length===1?values[0]:null;}
  function resolveArticle(id,options={}){const entry=resolveEntry(id,options)||resolvePreferred(id,options);return entry?article(entry):null;}
  function flatView(term){return Object.freeze({...term,title:term.title.en,summary:term.summary.en,definition:term.definition.en,glossary:`glossary-${term.id}`});}
  function contextualEntries(bookId){return entries.filter(entry=>bookMatches(entry,bookId));}
  function forBook(bookId){
    const result={},contextual=contextualEntries(bookId);
    for(const entry of contextual)result[entry.id]=flatView(article(entry));
    const keys=new Set(contextual.flatMap(entry=>[entry.sourceOwner?.canonicalId,...(entry.aliases||[])]).filter(Boolean));
    for(const key of keys){const resolved=resolveEntry(key,{bookId});if(resolved)result[key]=result[resolved.id];}
    return Object.freeze(result);
  }
  function linkables(bookId){return Object.freeze(contextualEntries(bookId).map(entry=>Object.freeze({id:entry.id,termId:entry.id,title:entry.label,aliases:Object.freeze(entry.aliases||[]),matchLabels:Object.freeze(entry.presentation?.preferredMatchLabels||[]),owners:Object.freeze([...new Set((entry.contexts||[]).filter(context=>!bookId||context.effectiveBookId===bookId).map(context=>context.parentUnitId).filter(Boolean))])})));}
  function preferredMatches(bookId){const result={};for(const entry of contextualEntries(bookId))for(const label of entry.presentation?.preferredMatchLabels||[]){const resolved=resolvePreferred(label,{bookId});if(resolved?.id===entry.id)result[normalize(label)]=entry.id;}return Object.freeze(result);}
  function bindArmyRoot(container,bookId){
    if(!container)return Object.freeze({bound:0,unresolved:[],ambiguous:[]});
    let bound=0;const unresolved=[],ambiguous=[];
    for(const node of container.querySelectorAll('[data-term]')){
      const original=node.dataset.term;if(byId.has(original))continue;
      const unitId=node.closest('.unit-card')?.id||'',detachmentId=node.closest('.detachment,[data-detachment-id]')?.id||node.closest('[data-detachment-id]')?.dataset.detachmentId||'',profileId=node.closest('[data-roster-profile-id]')?.dataset.rosterProfileId||'',wargearId=node.closest('[data-roster-wargear-ability-id]')?.dataset.rosterWargearAbilityId||'',ruleId=node.closest('[data-rule-id]')?.dataset.ruleId||'';
      const attempts=[profileId&&{id:profileId,options:{bookId,parentId:unitId,recordType:'WEAPON_PROFILE'}},wargearId&&{id:wargearId,options:{bookId,parentId:unitId,recordType:'WARGEAR_ABILITY'}},ruleId&&{id:ruleId,options:{bookId,parentId:detachmentId}},{id:original,options:{bookId,parentId:unitId||detachmentId}},{id:original,options:{bookId}}].filter(Boolean);
      let entry=null;for(const attempt of attempts){entry=resolveEntry(attempt.id,attempt.options);if(entry)break;}
      if(entry){node.dataset.term=entry.id;node.dataset.glossaryV2Source=original;bound++;continue;}
      const possible=candidates(original,{bookId});(possible.length>1?ambiguous:unresolved).push({termId:original,parentId:unitId||detachmentId||null,candidates:possible.map(item=>item.id)});
    }
    return Object.freeze({bound,unresolved:Object.freeze(unresolved),ambiguous:Object.freeze(ambiguous)});
  }

  root.WH40K_GLOSSARY=Object.freeze({schema:data.schema,language:data.language,factualAuthority:false,resolve(id,options){return resolveArticle(id,options)?.id||null;},get(id,options){return resolveArticle(id,options);},resolveView(bookId,id,options={}){const term=resolveArticle(id,{...options,bookId});return term?flatView(term):null;},entries(){return Object.freeze(entries.map(article));},standaloneEntries(){return Object.freeze(entries.filter(entry=>!entry.parent).map(article));},forBook,linkables,preferredMatches,bindArmyRoot,counts:Object.freeze({terms:data.counts.total,standalone:data.counts.standalone,scopedChildren:data.counts.scopedChildren,aliases:[...byKey.keys()].length})});
}(window));
