import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const factionRules=readJson('content/adeptus-mechanicus-rules.en.json');
const source=readJson('content/adeptus-mechanicus-source.en.json');
const codexSource=readJson('content/adeptus-mechanicus-codex-detachments.en.json');
const codexParity=readJson('content/adeptus-mechanicus-codex-parity.en.json');
const parityByDetachment=new Map(codexParity.detachments.map(item=>[item.title,item]));
const codex={...codexSource,detachments:codexSource.detachments.map(detachment=>{
  const parity=parityByDetachment.get(detachment.title);
  if(!parity)throw new Error(`Missing Codex parity layer for ${detachment.title}`);
  const enhancements=new Map(parity.enhancements.map(item=>[item.title,item.text]));
  return {...detachment,rule:{...detachment.rule,text:parity.rule.text},enhancements:detachment.enhancements.map(item=>({...item,text:enhancements.get(item.title)||item.text}))};
})};
const codexDatasheets=readJson('content/adeptus-mechanicus-codex-datasheets.en.json');
const codexWargear=readJson('content/adeptus-mechanicus-codex-wargear.en.json');
const pointsCatalog=readJson('content/adeptus-mechanicus-points.en.json');
const officialMfm=readJson('sources/official-mfm-v1.1.json');
const globalGlossary=readJson('../../glossary/registry.en.json').terms;
const pointsByUnit=new Map(pointsCatalog.units.map(unit=>[unit.title.toLowerCase(),unit]));
const titleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const slugKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const abilityText=ability=>ability.text||[
  ability.openingText,
  ...(ability.options||[]).map(option=>`${option.title}: ${option.text}`)
].filter(Boolean).join('\n\n');
const enhancementsByTitle=new Map(pointsCatalog.enhancements.map(item=>[titleKey(item.title),item]));
const factionDatasheets=new Map(factionRules.datasheets.filter(unit=>unit.status!=='Warhammer Legends').map(unit=>[unit.id,unit]));
const codexWargearByTitle=new Map(codexWargear.units.map(unit=>[titleKey(unit.title),unit]));
const mergedDatasheets=codexDatasheets.datasheets.map(unit=>{
  const official=factionDatasheets.get(unit.id);
  if(!official){
    const exact=codexWargearByTitle.get(titleKey(unit.title));
    return exact?{...unit,wargear:exact.wargear,composition:exact.composition,wargearSource:{label:'Current 11e reference \u00b7 Wahapedia',url:exact.url}}:unit;
  }
  factionDatasheets.delete(unit.id);
  const extractedWargear=new Map((unit.wargearAbilities||[]).map(item=>[titleKey(item.title),item]));
  const officialWargear=(official.abilities||[]).filter(item=>extractedWargear.has(titleKey(item.title)));
  const abilities=(official.abilities||[]).filter(item=>!extractedWargear.has(titleKey(item.title)));
  if(!abilities.some(item=>item.title==='Doctrina Imperatives'))abilities.unshift({title:'Doctrina Imperatives',text:'This unit has the Doctrina Imperatives Faction ability.'});
  const wargearAbilities=[...extractedWargear.values()].map(item=>officialWargear.find(candidate=>titleKey(candidate.title)===titleKey(item.title))||item);
  return {...unit,...official,abilities,wargearAbilities,category:unit.category,profiles:official.profiles||[{name:official.title,stats:official.stats}]};
}).concat([...factionDatasheets.values()]);
const publishedUnitIds=new Set(mergedDatasheets.map(unit=>unit.id));
const publishedGlossary=factionRules.glossary.filter(term=>term.id!=='warhammer-legends').map(term=>({...term,unitIds:(term.unitIds||[]).filter(unitId=>publishedUnitIds.has(unitId))}));
const rules={...factionRules,datasheets:mergedDatasheets,glossary:publishedGlossary,audit:{...factionRules.audit,datasheets:mergedDatasheets.length,legendsDatasheets:0,glossaryTerms:publishedGlossary.length}};
const unitTitleKey=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const unitByTitle=new Map(rules.datasheets.map(unit=>[unitTitleKey(unit.title),unit]));
const attachments=[];
for(const leader of rules.datasheets){
  for(const ability of (leader.abilities||[]).filter(ability=>/^(leader|support)$/i.test(ability.title))){
    const text=abilityText(ability);if(!text)continue;
    for(const bodyguard of rules.datasheets)if(bodyguard!==leader&&text.toLowerCase().includes(bodyguard.title.toLowerCase()))attachments.push({role:ability.title.toLowerCase(),sourceId:leader.id,targetId:bodyguard.id});
  }
}
for(const bodyguard of rules.datasheets){
  const text=[bodyguard.composition||'',...(bodyguard.abilities||[]).filter(ability=>/^attached unit$/i.test(ability.title)).map(ability=>ability.text||'')].join(' ');
  const proxy=[...unitByTitle.values()].find(unit=>text.toLowerCase().includes(unit.title.toLowerCase()));
  if(proxy)for(const edge of [...attachments])if(edge.targetId===proxy.id)attachments.push({...edge,targetId:bodyguard.id});
}
const unitById=new Map(rules.datasheets.map(unit=>[unit.id,unit]));
for(const edge of attachments)if(edge.sourceId==='unit-cybernetica-datasmith'&&edge.targetId==='unit-kastelan-robots')Object.assign(edge,{mandatory:true,removeKeywords:['INFANTRY']});
const relationGraphs=buildRelationGraphs(rules.datasheets,attachments);
const officialOrder=['detachment-cohort-acquisitus','detachment-lords-of-the-forge','detachment-luminen-auto-choir','detachment-cohort-cybernetica','detachment-data-psalm-conclave','detachment-eradication-cohort','detachment-explorator-maniple','detachment-haloscreed-battle-clade','detachment-rad-zone-corps','detachment-skitarii-hunter-cohort'];
const mfmDetachments=new Map(Object.entries(officialMfm.detachments||{}).map(([title,value])=>[titleKey(title),value]));
const allDetachments=[...rules.detachments,...codex.detachments].map(detachment=>{
  const mfm=mfmDetachments.get(titleKey(detachment.title));
  if(!mfm)throw new Error(`${detachment.title}: official MFM Detachment Points are missing`);
  return {...detachment,dp:mfm.dp,disposition:mfm.disposition};
}).sort((a,b)=>officialOrder.indexOf(a.id)-officialOrder.indexOf(b.id));
const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const cleanText=value=>String(value??'').replace(/[ \t]+\n/g,'\n').trim();
const slugify=value=>String(value).toLowerCase().replaceAll('’','').replaceAll("'",'').replaceAll(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const canonicalCoreTerms=Object.values(globalGlossary).filter(term=>term.kind==='core-ability').map(term=>({
  id:term.id,
  title:term.title.en.replace(/^\[|\]$/g,''),
  group:'Core abilities',
  summary:term.summary.en,
  full:term.definition.en,
  aliases:term.aliases||[],
  fullRulePath:term.fullRulePath,
  unitIds:[]
}));
const glossaryTerms=[
  ...canonicalCoreTerms,
  ...rules.glossary.filter(term=>term.group!=='Core abilities').map(term=>({...term,group:'Faction & publication',unitIds:[...(term.unitIds||[])]})),
  ...allDetachments.flatMap(detachment=>(detachment.stratagems||[]).map(item=>{
    const text=[item.category,item.when&&`WHEN: ${item.when}`,item.target&&`TARGET: ${item.target}`,item.effect&&`EFFECT: ${item.effect}`,item.restrictions&&`RESTRICTIONS: ${item.restrictions}`].filter(Boolean).join(' ');
    return{id:item.id,title:item.title,summary:text,full:text,group:'Stratagems',rule:item.id,unitIds:[]};
  }))
];
const termKeys=new Map(glossaryTerms.map(term=>[term.title.toLowerCase(),term]));
const coreTermKeys=new Map();
for(const term of glossaryTerms.filter(term=>term.group==='Core abilities'))for(const label of [term.title,...(term.aliases||[])])coreTermKeys.set(titleKey(label.replace(/^core-|^datasheet-/i,'').replace(/^\[|\]$/g,'')),term);
const coreBaseKey=value=>{
  const normalized=titleKey(value).replace(/\s+(?:d\d+|\d+|\d+\+|\d+ inches)$/,'').trim();
  return normalized.startsWith('anti ')?'anti':normalized;
};
const knownCoreTitles=new Set([...coreTermKeys.keys(),'deadly demise','deep strike','firing deck','hover','scouts']);
const termIds=new Set(glossaryTerms.map(term=>term.id));
const uniqueTermId=base=>{let id=base,index=2;while(termIds.has(id))id=`${base}-${index++}`;termIds.add(id);return id;};
const attachUnit=(term,unitId)=>{if(!term.unitIds.includes(unitId))term.unitIds.push(unitId);};
for(const unit of rules.datasheets){
  for(const ability of [...unit.abilities,...(unit.wargearAbilities||[])]){
    const key=ability.title.toLowerCase();
    let term=termKeys.get(key)||coreTermKeys.get(coreBaseKey(ability.title));
    if(!term){
    const full=abilityText(ability)||`${ability.title} is listed on the ${unit.title} datasheet.`;
      term={id:uniqueTermId(`datasheet-${slugify(ability.title)}`),title:ability.title,group:'Datasheet abilities',summary:full.split(/(?<=[.!?])\s/)[0],full,sectionId:unit.id,unitIds:[]};
      glossaryTerms.push(term);termKeys.set(key,term);
    }
    attachUnit(term,unit.id);ability.termId=term.id;
  }
  for(const weapon of unit.weapons){
    const profile=`${weapon.mode==='ranged'?'Ranged':'Melee'} · ${weapon.range} · A ${weapon.a} · ${weapon.mode==='ranged'?'BS':'WS'} ${weapon.skill} · S ${weapon.s} · AP ${weapon.ap} · D ${weapon.d}${weapon.abilities?` · ${weapon.abilities}`:''}`;
    const key=`weapon:${weapon.name.toLowerCase()}:${profile}`;
    let term=termKeys.get(key);
    if(!term){
      term={id:uniqueTermId(`weapon-${slugify(weapon.name.replace(/^➤\s*/,''))}`),title:weapon.name.replace(/^➤\s*/,''),group:'Weapon profiles',summary:profile,full:profile,sectionId:unit.id,unitIds:[]};
      glossaryTerms.push(term);termKeys.set(key,term);
    }
    attachUnit(term,unit.id);weapon.termId=term.id;
  }
}
rules.glossary=glossaryTerms;
rules.audit.glossaryTerms=glossaryTerms.length;
const pagesLabel=pages=>pages.length===1?`p. ${pages[0]}`:`pp. ${pages[0]}–${pages.at(-1)}`;
const sourceLink=pages=>`<a class="source-link" href="./${esc(rules.source.file)}#page=${pages[0]}">Faction Pack v${esc(rules.source.version)} · ${pagesLabel(pages)}</a>`;
const transcript=pages=>`<details class="source-transcript"><summary>Official page transcript</summary>${pages.map(page=>`<h5>Page ${page}</h5><pre>${esc(source.pages[String(page)])}</pre>`).join('')}</details>`;
const tracked=(id,title,body,classes='content-group')=>`<section class="${classes}" id="${id}" data-track="${id}"><h3 class="category-title">${esc(title)}</h3>${body}</section>`;
const navLeaf=(id,label,depth)=>`<li data-nav-id="${id}" data-nav-depth="${depth}"><div class="toc-row no-toggle"><button class="toc-label" data-nav-target="${id}">${esc(label)}</button></div></li>`;
const navBranch=(id,label,depth,children)=>`<li data-nav-id="${id}" data-nav-depth="${depth}"><div class="toc-row"><button class="toc-label" data-nav-target="${id}">${esc(label)}</button><button class="toc-toggle" data-nav-toggle aria-label="Toggle ${esc(label)}" aria-expanded="false"></button></div><ul class="toc-branch" hidden>${children}</ul></li>`;
const termMap=new Map(rules.glossary.map(term=>[term.title.toLowerCase(),term]));
const escapeRegExp=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const normalizeDecoratedTerm=value=>String(value)
  .replace(/^\[/,'')
  .replace(/\]$/,'')
  .replace(/\s+\d+\+$/,'')
  .trim()
  .toLowerCase();
const decoratorTermMap=new Map();
for(const term of [...rules.glossary].sort((a,b)=>b.title.length-a.title.length)){
  for(const variant of [term.title,...(term.aliases||[])]){
    const key=normalizeDecoratedTerm(variant);
    if(!key)continue;
    const candidates=decoratorTermMap.get(key)||[];
    if(!candidates.includes(term))candidates.push(term);
    decoratorTermMap.set(key,candidates);
  }
}
const decoratorAlternation=[...decoratorTermMap.keys()].sort((a,b)=>b.length-a.length).map(escapeRegExp).join('|');
const decoratorPattern=decoratorAlternation
  ?new RegExp(`(^|[^A-Za-z0-9])((?:\\[)?(?:${decoratorAlternation})(?:\\])?(?:\\s+\\d+\\+)?)(?=$|[^A-Za-z0-9])`,'gi')
  :null;
const decoratorTerm=(key,unitId='')=>{
  const candidates=decoratorTermMap.get(key)||[];
  return candidates.find(term=>term.group==='Core abilities')
    ||candidates.find(term=>unitId&&(term.unitIds||[]).includes(unitId))
    ||candidates[0];
};
const decorate=(value,unitId='')=>{
  const raw=String(value??'').replace(/[ \t]+\n/g,'\n');
  if(!decoratorPattern)return esc(raw);
  const output=[];
  let cursor=0;
  decoratorPattern.lastIndex=0;
  for(let match=decoratorPattern.exec(raw);match;match=decoratorPattern.exec(raw)){
    const prefix=match[1]||'';
    const token=match[2];
    const tokenStart=match.index+prefix.length;
    const term=decoratorTerm(normalizeDecoratedTerm(token),unitId);
    if(!term)continue;
    output.push(esc(raw.slice(cursor,tokenStart)));
    output.push(`<button class="term-button" data-term="${term.id}">${esc(token)}</button>`);
    cursor=tokenStart+token.length;
  }
  output.push(esc(raw.slice(cursor)));
  return output.join('');
};

function validate(){
  const fail=message=>{throw new Error(message);};
  const navigationRuntime=fs.readFileSync(path.join(root,'../death-guard/scripts/navigation-controller.js'),'utf8');
  if(source.meta.pageCount!==rules.source.pages)fail(`Expected ${rules.source.pages} source pages`);
  if(source.meta.sha256!==rules.source.sha256)fail('Source hashes disagree');
  if(rules.detachments.length!==rules.audit.detachments)fail('Detachment audit mismatch');
  if(allDetachments.length!==10)fail('Expected ten total Adeptus Mechanicus detachments');
  if(rules.datasheets.length!==codexDatasheets.audit.datasheets)fail('Codex datasheet audit mismatch');
  if(rules.datasheets.filter(unit=>unit.status==='Warhammer Legends').length!==rules.audit.legendsDatasheets)fail('Legends audit mismatch');
  if(rules.glossary.length!==rules.audit.glossaryTerms)fail('Glossary audit mismatch');
  const ids=[rules.armyRule.id,...rules.armyRule.options.map(x=>x.id),...rules.updates.map(x=>x.id),...allDetachments.flatMap(x=>[x.id,x.rule.id,`${x.id.replace('detachment-','')}-enhancements`,`${x.id.replace('detachment-','')}-stratagems`]),...rules.datasheets.map(x=>x.id),...rules.glossary.map(x=>`glossary-${x.id}`)];
  if(new Set(ids).size!==ids.length)fail('Canonical IDs are not unique');
  const units=new Set(rules.datasheets.map(x=>x.id));
  const sections=new Set(ids);
  for(const term of rules.glossary){
    if(term.sectionId&&!sections.has(term.sectionId))fail(`Missing term section: ${term.sectionId}`);
    for(const unit of term.unitIds||[])if(!units.has(unit))fail(`Missing term unit: ${unit}`);
  }
  for(const item of [rules.armyRule,...rules.updates,...allDetachments,...rules.datasheets])for(const page of [...(item.sourcePages||[]),...(item.updatedSourcePages||[])])if(!source.pages[String(page)])fail(`Missing source page ${page}`);
  if(!navigationRuntime.includes("this.panel.contains(target)"))fail('Navigation must ignore cancellation gestures inside Contents');
  if(!navigationRuntime.includes("this.pathIsOpen(item.node)"))fail('Navigation must restore the active open path after manual article scrolling');
  if(!navigationRuntime.includes("this.revealPath(item.node,{includeSelf:true})"))fail('Navigation must keep an active parent branch expanded');
  if(!navigationRuntime.includes('lastCrossedDescendant(parent,scrollY)'))fail('Mechanicus must use the Death Guard descendant tracking contract');
  if(!navigationRuntime.includes('reachableDestination(destination)'))fail('Navigation must clamp destinations to the reachable document range');
}

const detNav=allDetachments.map(det=>{
  const slug=det.id.replace('detachment-','');
  return navBranch(det.id,det.title,2,navLeaf(det.rule.id,'Detachment Rule',3)+navLeaf(`${slug}-enhancements`,'Enhancement',3)+navLeaf(`${slug}-stratagems`,'Stratagems',3));
}).join('');
const fixedCategoryOrder=['Epic Heroes','Characters','Battleline','Dedicated Transports'];
const categoryOrder=[...fixedCategoryOrder,...new Set(rules.datasheets.map(unit=>unit.category).filter(category=>!fixedCategoryOrder.includes(category)&&category!=='Other'&&category!=='Warhammer Legends')),'Other','Warhammer Legends'];
const datasheetCategories=categoryOrder.map(title=>({title,id:`datasheets-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g,'-')}`,units:rules.datasheets.filter(unit=>unit.category===title)})).filter(group=>group.units.length);
const glossaryOrder=['Core abilities','Faction & publication','Datasheet abilities','Weapon profiles'];
const glossaryGroups=glossaryOrder.map(title=>({title,id:title==='Core abilities'?'glossary-core':title==='Faction & publication'?'glossary-faction':`glossary-${slugify(title)}`,terms:rules.glossary.filter(term=>term.group===title)})).filter(group=>group.terms.length);
const toc=navLeaf('start','Start',1)
  +navBranch('core-rules','Core Rules',1,navBranch(rules.armyRule.id,rules.armyRule.title,2,rules.armyRule.options.map(x=>navLeaf(x.id,x.label,3)).join('')))
  +navBranch('detachments','Detachments',1,detNav)
  +navBranch('datasheets','Datasheets',1,datasheetCategories.map(group=>navBranch(group.id,group.title,2,group.units.map(x=>navLeaf(x.id,x.title,3)).join(''))).join(''))
  +navBranch('updates','Updates',1,rules.updates.map(x=>navLeaf(x.id,x.title,2)).join(''));

const updates=rules.updates.map(item=>tracked(item.id,item.title,`<article class="rule-card surface"><div class="eyebrow">Official update</div><p>${decorate(item.summary)}</p><div class="source">${sourceLink(item.sourcePages)}</div>${transcript(item.sourcePages)}</article>`)).join('');
const options=rules.armyRule.options.map((option,index)=>`<button class="protocol${option.id===rules.armyRule.options.find(x=>x.id.endsWith(rules.armyRule.default))?.id||(!index?'':' active')}" data-protocol="${option.id.split('-')[0]}"><span>${esc(option.symbol)}</span><b>${esc(option.label)}</b><small>${esc(option.subtitle)}</small></button>`).join('');
const optionPanels=rules.armyRule.options.map(option=>`<section id="${option.id}" data-track="${option.id}" data-source-field="effects"${option.id.endsWith(rules.armyRule.default)?'':' hidden'}><b>${esc(option.label.toUpperCase())} IMPERATIVE</b><ul>${option.effects.map(x=>`<li>${decorate(x)}</li>`).join('')}</ul></section>`).join('');
const armyRule=tracked(rules.armyRule.id,rules.armyRule.title,`<article class="doctrina-console surface"><div class="doctrina-code"><span>DOCTRINA</span><strong>Ω-01</strong></div><div class="doctrina-body"><div class="eyebrow">Battle Protocol</div><p>Select the active imperative. The console shows the complete Faction Pack v${rules.source.version} replacement.</p><div class="protocol-switch" role="group" aria-label="Select Doctrina Imperative">${options}</div><div class="protocol-result">${optionPanels}</div><div class="source">${sourceLink(rules.armyRule.sourcePages)}</div></div></article>`);

const supportedSubjects=new Set(['unit','model','objective']);
const validateEligibility=item=>{
  const roles=item.eligibility?.owner?[{...item.eligibility.owner,side:'friendly'}]:(item.eligibility?.roles||item.eligibility?.targets||[]);
  for(const role of roles){
    const subject=role.subject||'unit';
    if(!supportedSubjects.has(subject))throw new Error(`Adeptus Mechanicus: ${item.id} uses unsupported eligibility subject ${subject}`);
  }
};
const detachments=allDetachments.map(det=>{
  const slug=det.id.replace('detachment-','');
  const isCodex=!det.sourcePages;
  const enhancements=det.enhancements.map(original=>{
    const current=isCodex?enhancementsByTitle.get(titleKey(original.title)):null;
    const item=current?{...original,title:current.title,text:current.text}:original,isUpgrade=(item.tags||[]).includes('UPGRADE');
    validateEligibility(item);
    return `<article class="enhancement surface" data-rule-id="${esc(item.id)}" data-enhancement-tags="${esc((item.tags||[]).join('|'))}" data-owner-subject="${esc(item.eligibility?.owner?.subject||'')}" data-enhancement-title="${esc(item.title)}"><div class="eyebrow">Enhancement${isUpgrade?' · UPGRADE':''}</div><h4>${esc(item.title)}</h4><p data-source-field="text">${decorate(item.text)}</p></article>`;
  }).join('');
  const stratagems=det.stratagems.map(item=>{
    validateEligibility(item);
    const turn=/opponent|enemy/i.test(item.when)?'THEIR TURN':/your\b/i.test(item.when)?'YOUR TURN':'ANY TURN';
    const turnClass=turn==='THEIR TURN'?'turn-their':turn==='YOUR TURN'?'turn-yours':'turn-any';
    const match=String(item.category||'').trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i);
    const type=match?match[1].toLowerCase().replace(/\s+/g,'-'):'unknown';
    const label=type==='unknown'?'Type unverified':item.category;
    return `<article class="stratagem surface ${turnClass}" data-rule-id="${esc(item.id)}" data-turn="${turn}" data-target="${esc(item.target||'')}" data-stratagem-type="${type}"><div class="stratagem-head"><div><h3><button class="term-button" data-term="${esc(item.id)}">${esc(item.title)}</button></h3><span class="stratagem-type">${esc(label)}</span></div><div class="cp">${esc(item.cp)}</div></div><p class="field" data-source-field="when"><b>When</b><br>${decorate(item.when)}</p>${item.target?`<p class="field" data-source-field="target"><b>Target</b><br>${decorate(item.target)}</p>`:''}<p class="field" data-source-field="effect"><b>Effect</b><br>${decorate(item.effect)}</p>${item.restrictions?`<p class="field" data-source-field="restrictions"><b>Restrictions</b><br>${decorate(item.restrictions)}</p>`:''}</article>`;
  }).join('');
  if(!det.dp)throw new Error(`${det.title}: Detachment Points are missing`);
  const publication=`<div class="detachment-meta"><span>${isCodex?'CODEX + 11E UPDATE':'FACTION PACK'}</span>${det.disposition?`<span>${esc(det.disposition)}</span>`:''}</div>`;
  const provenance=isCodex?`<div class="source"><a class="source-link" href="${codex.source.officialIndexUrl}">Official 11e detachment index</a> · <a class="source-link" href="${codex.source.referenceUrl}">Codex rules reference</a>${det.updatedSourcePages?.length?` · ${sourceLink(det.updatedSourcePages)}`:''}</div>${det.updatedSourcePages?.length?transcript(det.updatedSourcePages):''}`:`<div class="source">${sourceLink(det.sourcePages)}</div>${transcript(det.sourcePages)}`;
  const body=`${publication}<p class="lead">${esc(det.tagline)}</p><div class="detachment-content">${tracked(det.rule.id,'Detachment Rule',`<article class="rule-card surface"><h3>${esc(det.rule.title)}</h3><p data-source-field="text">${decorate(det.rule.text)}</p></article>`,'detachment-part')}${tracked(`${slug}-enhancements`,'Enhancements',`<div class="detachment-grid">${enhancements}</div>`,'detachment-part')}${tracked(`${slug}-stratagems`,'Stratagems',`<div class="stratagem-grid">${stratagems}</div>`,'detachment-part')}</div>${provenance}`;
  return `<section class="content-group detachment" id="${det.id}" data-track="${det.id}" data-detachment="${slug}"><h3 class="category-title detachment-title">${esc(det.title)} <span class="detachment-dp">${esc(det.dp)}DP</span></h3>${body}</section>`;
}).join('');

const stats=unit=>(unit.profiles?.length?unit.profiles:[{name:unit.title,stats:unit.stats}]).map(profile=>`<div class="model-profile" data-profile="${esc(slugKey(profile.name))}">${unit.profiles?.length>1?`<h5>${esc(profile.name)}</h5>`:''}<div class="statline">${Object.entries(profile.stats).map(([key,value])=>`<div class="stat" data-source-field="stats.${esc(key)}"><b>${key}</b><span>${esc(value)}</span></div>`).join('')}${unit.invulnerable?`<div class="stat invulnerable" data-source-field="invulnerable"><b>InSv</b><span>${esc(unit.invulnerable)}</span></div>`:''}</div></div>`).join('');
const weapons=unit=>['ranged','melee'].map(mode=>{
  const rows=unit.weapons.filter(x=>x.mode===mode);
  if(!rows.length)return '';
  const skillLabel=mode==='ranged'?'BS':'WS';
  return `<div class="weapon-group"><h5>${mode==='ranged'?'Ranged':'Melee'} weapons</h5><div class="weapon-table" role="table" aria-label="${esc(unit.title)} ${mode} weapons"><div class="weapon-row weapon-head"><div>Weapon</div><div>Range</div><div>A</div><div>${skillLabel}</div><div>S</div><div>AP</div><div>D</div></div>${rows.map(w=>`<div class="weapon-row" data-source-field="weapons.${esc(slugKey(w.name))}" data-mode="${mode}"><div data-source-field="name"><button class="weapon-button" data-term="${w.termId}">${esc(w.name)}</button>${w.abilities?`<div class="weapon-tags">${String(w.abilities).split(',').map(rawLabel=>{const label=rawLabel.trim();const term=coreTermKeys.get(coreBaseKey(label));const text=esc(label.toUpperCase());return term?`<button class="tag" data-term="${term.id}">${text}</button>`:`<span class="tag">${text}</span>`;}).join('')}</div>`:''}</div><div data-label="Range" data-source-field="range">${esc(w.range)}</div><div data-label="A" data-source-field="a">${esc(w.a)}</div><div data-label="${skillLabel}" data-source-field="skill">${esc(w.skill)}</div><div data-label="S" data-source-field="s">${esc(w.s)}</div><div data-label="AP" data-source-field="ap">${esc(w.ap)}</div><div data-label="D" data-source-field="d">${esc(w.d)}</div></div>`).join('')}</div></div>`;
}).join('');
const abilityKind=item=>{
  if(/^doctrina imperatives$/i.test(item.title))return 'faction';
  if(/^(leader|support|attached unit)$/i.test(item.title))return 'relation';
  if(/^damaged:/i.test(item.title))return 'damaged';
  if(/^transport$/i.test(item.title))return 'transport';
  if(/^core$/i.test(item.title)||knownCoreTitles.has(coreBaseKey(item.title)))return 'core';
  return 'datasheet';
};
const abilityCard=(item,unit)=>`<article class="ability" data-source-field="abilities.${esc(slugKey(item.title))}"><h5 data-source-field="title"><button class="term-button" data-term="${item.termId}">${esc(item.title)}</button></h5>${item.openingText?`<p data-source-field="openingText">${decorate(item.openingText,unit.id)}</p>`:''}${(item.options||[]).map(option=>`<div class="ability-option" data-source-field="options.${esc(option.id)}"><h6>${esc(option.title)}</h6><p data-source-field="text">${decorate(option.text,unit.id)}</p></div>`).join('')}${item.text?`<p data-source-field="text">${decorate(item.text,unit.id)}</p>`:''}</article>`;
const compactAbilities=(title,items,unit)=>items.length?`<div class="shared-ability-group"><h5>${title}</h5><div class="keyword-list shared-abilities">${items.map(item=>/^core$/i.test(item.title)?decorate(abilityText(item),unit.id):`<button class="term-button" data-term="${item.termId}" data-source-field="abilities.${esc(slugKey(item.title))}">${esc(item.title)}</button>`).join(' ')}</div></div>`:'';
const unitCard=unit=>{
  const slug=unit.id.replace('unit-','');
  const grouped={core:[],faction:[],datasheet:[],relation:[],damaged:[],transport:[]};
  for(const item of unit.abilities)(grouped[abilityKind(item)]||grouped.datasheet).push(item);
  const wargearAbilities=unit.wargearAbilities||[];
  const wargear=Array.isArray(unit.wargear)?unit.wargear:(unit.wargear?[unit.wargear]:[]);
  const currentPoints=pointsByUnit.get(unit.title.toLowerCase());
  const pointRows=(currentPoints?.points||[]).filter(row=>Number.isFinite(Number(row.value)));

  const points=pointRows.length===1?`${pointRows[0].value}`:pointRows.length>1?'MULTIPLE COSTS':(unit.points?.length?unit.points.join(' / '):'');
  const pointsPanel=pointRows.length?`<div class="points-panel surface"><div class="eyebrow">Points</div>${pointRows.map(row=>`<div class="points-row"><span>${esc(row.label)}</span><strong>${esc(row.value)} pts</strong></div>`).join('')}</div>`:'';
  const parts=[
    ['Profile & Weapons',`${slug}-profile`,`${pointsPanel}${stats(unit)}${weapons(unit)}`],
    ['Abilities',`${slug}-abilities`,`<div class="ability-list">${compactAbilities('CORE',grouped.core,unit)}${compactAbilities('FACTION',grouped.faction,unit)}${grouped.datasheet.map(item=>abilityCard(item,unit)).join('')}</div>`],
    ['Unit Composition',`${slug}-composition`,`<p>${decorate(unit.composition,unit.id)}</p>`],
    ...grouped.relation.map(item=>[item.title,`${slug}-${slugify(item.title)}`,`<div class="ability-list">${abilityCard(item,unit)}</div>`]),
    ...grouped.transport.map(item=>['Transport',`${slug}-transport`,`<div class="ability-list">${abilityCard(item,unit)}</div>`]),
    ...grouped.damaged.map(item=>['Damaged',`${slug}-damaged`,`<div class="ability-list">${abilityCard(item,unit)}</div>`]),
    ...(wargear.length?[['Wargear Options',`${slug}-wargear-options`,`<ul>${wargear.map(x=>`<li>${decorate(x,unit.id)}</li>`).join('')}</ul>`]]:[]),
    ...(wargearAbilities.length?[['Wargear Abilities',`${slug}-wargear-abilities`,`<p class="unit-note">These abilities apply only while the corresponding wargear is equipped.</p><div class="ability-list">${wargearAbilities.map(item=>abilityCard(item,unit)).join('')}</div>`]]:[]),
    ['Keywords',`${slug}-keywords`,`<div class="keyword-list">${unit.keywords.map(x=>`<span data-source-field="keywords.${esc(slugKey(x))}">${esc(x)}</span>`).join('')}</div>`]
  ];
  const tabs=parts.map(([label,id])=>`<button class="local-tab" data-journey-target="${id}" data-journey-type="datasheet">${label}</button>`).join('');
  const sections=parts.map(([label,id,body])=>`<section class="unit-part" id="${id}"><h4>${label}</h4>${body}</section>`).join('');
  const provenance=unit.sourcePages
    ?`<div class="source">${sourceLink(unit.sourcePages)}</div>${transcript(unit.sourcePages)}`
    :unit.source?.url?`<div class="source"><a class="source-link" href="${esc(unit.source.url)}">${esc(unit.source.label||'Pinned Codex transcription')}</a></div>`:'';
  const sourceAbilities=[...unit.abilities,...wargearAbilities];
  const deadlyDemise=sourceAbilities.some(item=>/^deadly demise\b/i.test(item.title)||/\bdeadly demise\b/i.test(abilityText(item)));
  const abilityNames=sourceAbilities.flatMap(item=>{
    if(/^core$/i.test(item.title))return abilityText(item).split(',').map(value=>value.trim().replace(/\.$/,'' )).filter(Boolean).map(value=>/^deadly demise\b/i.test(value)?'DEADLY DEMISE':value);
    return [/^deadly demise\b/i.test(item.title)?'DEADLY DEMISE':item.title];
  });
  const renderedTermIds=[...sections.matchAll(/data-term="([^"]+)"/g)].map(match=>match[1]);
  const relations=relationGraphs.get(unit.id),mandatory=Object.values(relations).flat().some(relation=>relation.mandatory),canAttach=Object.values(relations).some(items=>items.length);
  const ruleFacts={id:unit.id,unitId:unit.id,slug,keywords:unit.keywords,intrinsicKeywords:unit.keywords,abilities:[...new Set(abilityNames)],termIds:[...new Set(renderedTermIds)],epic:unit.keywords.includes('Epic Hero'),deadlyDemise,attached:mandatory?true:canAttach?null:false,attachmentKnown:mandatory||!canAttach,formationRequired:mandatory,characterCount:unit.keywords.includes('Character')?1:0,twoCharacters:null,warlord:null,relations};
  return `<article class="unit-card surface${unit.status==='Warhammer Legends'?' legends-card':''}" id="${unit.id}" data-track="${unit.id}" data-unit-title="${esc(unit.title)}" data-rule-facts="${esc(JSON.stringify(ruleFacts))}"><div class="unit-header"><div><div class="eyebrow">${esc(unit.status)}</div><h3>${esc(unit.title)}</h3></div><div class="unit-status">${unit.status==='Warhammer Legends'?'LEGENDS':points?`${esc(points)}${points==='MULTIPLE COSTS'?'':' PTS'}`:'CODEX'}</div></div><div class="local-nav">${tabs}</div>${sections}${provenance}</article>`;
};
const datasheetGroups=datasheetCategories.map(group=>tracked(group.id,group.title,`<p class="lead">${group.units.length} datasheet${group.units.length===1?'':'s'} in this category.</p>${group.units.map(unitCard).join('')}`)).join('');
const glossaryGroup=(id,title,terms)=>tracked(id,title,`<div class="glossary-grid">${terms.map(term=>`<article class="glossary-card surface" id="glossary-${term.id}" data-glossary-title="${esc(term.title)}"><h4>${esc(term.title)}</h4><p>${esc(cleanText(term.summary))}</p><p class="glossary-full">${esc(cleanText(term.full))}</p>${term.sectionId?`<button class="popup-action" data-journey-target="${term.sectionId}" data-journey-type="rule">Open rule</button>`:''}</article>`).join('')}</div>`);
const glossary=glossaryGroups.map(group=>glossaryGroup(group.id,group.title,group.terms)).join('');

const trackedCount=[...toc.matchAll(/data-nav-target="([^"]+)"/g)].length;
const sourceStatus=`<div class="source-grid"><article class="rule-card surface"><div class="eyebrow">Primary official source</div><h3>Adeptus Mechanicus Faction Pack v1.0</h3><p>26 pages · SHA-256 <code>${rules.source.sha256}</code></p><p>${sourceLink([1])}</p></article><article class="rule-card surface"><div class="eyebrow">Official points verification</div><h3>Munitorum Field Manual ${esc(pointsCatalog.source.officialVersion)}</h3><p>All 34 current Enhancement costs and all non-Legends unit point rows were verified on ${esc(pointsCatalog.source.verifiedAt)}.</p><p><a class="source-link" href="${esc(pointsCatalog.source.officialUrl)}">Open official MFM</a></p></article><article class="rule-card surface"><div class="eyebrow">Codex transcription layer</div><h3>${rules.datasheets.length} indexed datasheets</h3><p>Codex profiles are generated from a pinned 11th-edition community catalogue. Every sheet reprinted by GW is replaced with the official Faction Pack version.</p><p><a class="source-link" href="${codexDatasheets.source.url}">Pinned catalogue · revision ${esc(codexDatasheets.source.revision)}</a></p></article></div>`;
const html=`<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#101313"><meta name="description" content="Adeptus Mechanicus Faction Pack and current Codex rules reference."><title>Adeptus Mechanicus Rules — Faction Pack v1.0</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="icon" href="./assets/mechanicus-logo.png" type="image/png"><link rel="stylesheet" href="./styles/tokens.css?v=15"><link rel="stylesheet" href="../death-guard/styles/layout.css?v=11"><link rel="stylesheet" href="../death-guard/styles/navigation.css?v=12"><link rel="stylesheet" href="../death-guard/styles/content.css?v=40"><link rel="stylesheet" href="../death-guard/styles/popups.css?v=18"><link rel="stylesheet" href="./styles/mechanicus.css?v=19"><link rel="stylesheet" href="../shared/datasheet-system.css?v=8"></head><body>
<header class="app-header" id="appHeader"><button class="header-button nav-menu" id="navMenu" type="button" aria-label="Open navigation" aria-controls="tocPanel" aria-expanded="false">☰</button><button class="header-button nav-collapse" id="navCollapse" type="button" aria-label="Collapse navigation" aria-controls="tocPanel" aria-expanded="true">◀</button><div class="app-brand"><strong>Adeptus Mechanicus Rules</strong><small>11E · Adeptus Mechanicus reference</small></div><a class="library-link" href="../../index.html" aria-label="Back to rulebook library"><span aria-hidden="true">←</span><b>Library</b></a><a class="library-link view-switch" href="./index.html?view=mobile" data-view-switch aria-label="Open phone view"><span aria-hidden="true">↔</span><b>Phone view</b></a><button class="back-button" id="backButton" type="button" hidden>Back</button><div class="header-spacer"></div></header><button class="toc-scrim" id="tocScrim" type="button" aria-label="Close navigation" aria-hidden="true"></button>
<nav class="toc-panel" id="tocPanel" aria-label="Rulebook navigation"><h2 class="toc-heading">Contents</h2><div class="toc-shortcuts"><a class="toc-label" href="../../glossary/index.html">Mega Glossary</a><a class="toc-label" data-roster-guides href="../../roster-guides/index.html" hidden>← Roster Guides</a></div><ul class="toc-tree" id="tocTree">${toc}</ul></nav>
<main class="main" id="main"><div class="document">
<section class="hero section surface am-hero" id="start" data-track="start"><div class="hero-content"><div class="eyebrow">11th Edition Army Book</div><h1>Adeptus Mechanicus</h1><p>Current Faction Pack rules combined with the applicable carried-forward Codex Detachments and datasheets.</p><div class="source">Faction Pack v${esc(rules.source.version)} · Munitorum Field Manual ${esc(pointsCatalog.source.officialVersion)}</div></div><div class="hero-mark"><img src="./assets/mechanicus-logo.png" width="512" height="512" alt="Adeptus Mechanicus emblem"><span>Faction reference</span></div></section>
<section class="section" id="core-rules" data-track="core-rules"><h2 class="section-title">Core Rules</h2><p class="lead">Faction rules replaced by Faction Pack v1.0.</p>${armyRule}</section>
<section class="section" id="detachments" data-track="detachments"><h2 class="section-title">Detachments</h2><p class="lead">All ten Adeptus Mechanicus Detachments currently listed for 11th edition: five carried forward from Codex and five printed in Faction Pack v1.0.</p><div class="detachment-overview surface"><strong>10 TOTAL</strong><span>5 Codex</span><span>5 Faction Pack</span></div>${detachments}</section>
<section class="section" id="datasheets" data-track="datasheets"><h2 class="section-title">Datasheets</h2><p class="lead">${rules.datasheets.length} Codex and Faction Pack datasheets, grouped by battlefield role.</p>${datasheetGroups}</section>
<section class="section" id="updates" data-track="updates"><h2 class="section-title">Updates</h2><p class="lead">Official replacement text and FAQ, with page transcripts for verification.</p>${updates}<div class="source-library"><h3 class="category-title">Sources & Build Status</h3>${sourceStatus}</div></section>
<footer class="footer">Adeptus Mechanicus · Faction Pack v1.0 · data-driven local edition</footer></div></main><div class="popup-layer" id="popupLayer" aria-live="polite"></div><script src="../../glossary/generated/glossary.en.js"></script><script src="../shared/roster-parser.js?v=2"></script><script src="../shared/roster-entities.js?v=1"></script><script src="../../roster-guides/points-data.js?v=6"></script><script src="../../roster-guides/points-validator.js?v=3"></script><script src="../shared/navigation-targets.js?v=1"></script><script src="../shared/popup-rule-actions.js?v=1"></script><script src="../shared/datasheet-layout.js?v=3"></script><script src="../shared/popup-content.js?v=3"></script><script src="../shared/glossary-autolink.js?v=7"></script><script src="./scripts/data.js?v=1"></script><script src="../death-guard/scripts/navigation-controller.js?v=16"></script><script src="../death-guard/scripts/full-entry-controller.js?v=9"></script><script src="../death-guard/scripts/popup-controller.js?v=25"></script><script src="../death-guard/scripts/journey-controller.js?v=13"></script><script src="../death-guard/scripts/ui-controllers.js?v=12"></script><script src="./scripts/faction-ui.js?v=1"></script><script src="./scripts/roster-enhancements.js?v=2"></script><script src="./scripts/roster-filter.js?v=4"></script><script src="./scripts/app.js?v=34"></script></body></html>\n`;

const terms={};
for(const term of rules.glossary)terms[term.id]={title:term.title,summary:term.summary,full:term.full,glossary:`glossary-${term.id}`,...(term.sectionId?{rule:term.sectionId}:{}),...(term.fullRulePath?{fullRulePath:term.fullRulePath}:{}),...(term.unitIds?.length?{units:term.unitIds,datasheet:term.unitIds[0],statline:`${term.unitIds[0].replace('unit-','')}-profile`}:{})};
const dataJs=`window.DG_TERMS=${JSON.stringify(terms,null,2)};\n`;
const releaseHtml=html
  .replaceAll('Faction Pack v1.0',`Faction Pack v${rules.source.version}`)
  .replace(/26 pages([^S]+)SHA-256/,`${rules.source.pages} pages$1SHA-256`)
  .replace('../../glossary/generated/glossary.en.js"','../../glossary/generated/glossary.en.js?v=tyranids-1"')
  .replace('<script src="../shared/navigation-targets.js', '<script src="../../glossary-return.js?v=3"></script><script src="../shared/navigation-targets.js')
  .replace('../shared/glossary-autolink.js?v=7','../shared/glossary-autolink.js?v=8')
  .replace('points-validator.js?v=3','points-validator.js?v=4')
  .replace('<script src="./scripts/faction-ui.js?v=1"></script>','<script src="./scripts/faction-ui.js?v=1"></script><script src="../shared/rule-facts.js?v=4"></script><script src="../shared/modal-focus.js?v=1"></script>')
  .replace('popup-controller.js?v=18','popup-controller.js?v=21')
  .replace('ui-controllers.js?v=13','ui-controllers.js?v=14')
  .replace('app.js?v=20','app.js?v=22');
const entryHtml=`<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#101313"><title>Adeptus Mechanicus Rules</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="icon" href="./assets/mechanicus-logo.png" type="image/png"><link rel="stylesheet" href="./styles/tokens.css?v=15"><link rel="stylesheet" href="../death-guard/styles/entry.css?v=2"><script src="../death-guard/scripts/view-router.js?v=2"></script></head><body><main class="entry-card"><div class="entry-mark">Ω</div><p>Adeptus Mechanicus rules</p><h1>Opening the reader&hellip;</h1><div class="entry-actions"><a href="./reader.html?view=full">Desktop / iPad view</a><a href="./mobile/index.html?view=mobile">Phone view</a></div><noscript>Automatic selection needs JavaScript. Choose a reader above.</noscript></main></body></html>\n`;
const outputs=new Map([['index.html',entryHtml],['reader.html',releaseHtml],['scripts/data.js',dataJs]]);

if(/data-term="[^"]*</i.test(html))throw new Error('Generated data-term attributes must never contain markup');
for(const match of html.matchAll(/data-term="([^"]+)"/g))if(!termIds.has(match[1]))throw new Error(`Generated page references unknown term: ${match[1]}`);

validate();
if(process.argv.includes('--check')){
  const stale=[];
  for(const [file,content] of outputs)if(!fs.existsSync(path.join(root,file))||fs.readFileSync(path.join(root,file),'utf8')!==content)stale.push(file);
  if(stale.length){console.error(`Generated artifacts are stale: ${stale.join(', ')}`);process.exit(1);}
  console.log(`Full build is current: ${allDetachments.length} detachments, ${rules.datasheets.length} datasheets, root PWA cache`);
}else{
  for(const [file,content] of outputs)fs.writeFileSync(path.join(root,file),content,'utf8');
  console.log(`Built full Mechanicus project: ${allDetachments.length} detachments, ${rules.datasheets.length} datasheets, root PWA cache`);
}
