import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildRelationGraphs} from './build-relation-graph.mjs';

const args=process.argv.slice(2),check=args.includes('--check'),configArg=args.find(arg=>!arg.startsWith('--'));
if(!configArg)throw new Error('Usage: node build-army-book.mjs <book.config.json> [--check]');
const configPath=path.resolve(configArg),root=path.dirname(configPath),repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const glossaryTerms=JSON.parse(fs.readFileSync(path.join(repo,'glossary','registry.en.json'),'utf8')).terms;
const bookMark=config.mark||config.title.split(/\s+/).map(word=>word[0]).join('').slice(0,4).toUpperCase();
const pack=readJson(config.sources.factionPack),codex=readJson(config.sources.codexDatasheets);
const points=readJson(config.sources.points||'content/'+config.id+'-points.en.json');
const codexWargear=config.sources.codexWargear?readJson(config.sources.codexWargear):null;
const codexParity=config.sources.codexParity?readJson(config.sources.codexParity):null;
const manifest=readJson(config.sources.manifest);
const relatedRules=config.sources.relatedRules?readJson(config.sources.relatedRules):{stratagems:{}};
const enhancementOwners=config.sources.enhancementOwners?readJson(config.sources.enhancementOwners):null;
const esc=value=>String(value??'').replace(/\s+/g,' ').trim().replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const heroMark=config.coverImage?'':`<div class="hero-mark" aria-hidden="true"><span>${esc(config.factionKeyword)}</span></div>`;
const escLines=value=>String(value??'').replace(/\r\n?/g,'\n').split('\n').map(esc).join('\n');
const normalizedEol=value=>String(value).replace(/\r\n?/g,'\n');
const clean=value=>String(value??'').replaceAll('\u00a0',' ').replace(/\s+/g,' ').trim();
const slug=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const unique=(items,keyOf)=>{const seen=new Set();return items.filter(item=>{const key=keyOf(item);if(seen.has(key))return false;seen.add(key);return true;});};
const titleKey=value=>clean(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const coreBaseKey=value=>{const normalized=titleKey(value).replace(/\s+(?:d\d+|\d+)$/,'').trim();return normalized.startsWith('anti ')?'anti':normalized;};
const canonicalCoreAbilityTerms=new Map(Object.entries(glossaryTerms).filter(([id])=>id.startsWith('core-')).map(([id,term])=>[coreBaseKey(String(term.title?.en||'').replace(/^\[|\]$/g,'')),id]));
const unitInventory=layer=>[...(layer.datasheets||[]),...(layer.imperialArmour||[]),...(layer.legends||[])];
const dependencyCodices=(config.dependencies||[]).map(id=>{
  const dependencyRoot=path.join(repo,'books',id),dependencyConfig=JSON.parse(fs.readFileSync(path.join(dependencyRoot,'book.config.json'),'utf8'));
  const dependencyCodex=JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.codexDatasheets),'utf8'));
  const dependencyPack=JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.factionPack),'utf8'));
  const dependencyPoints=JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.points||`content/${id}-points.en.json`),'utf8'));
  const dependencyParity=dependencyConfig.sources.codexParity?JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.codexParity),'utf8')):null;
  const dependencyRelatedRules=dependencyConfig.sources.relatedRules?JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.relatedRules),'utf8')):{stratagems:{},enhancements:{},keywordGrants:{}};
  const dependencyWargear=dependencyConfig.sources.codexWargear?JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.codexWargear),'utf8')):null;
  return {id,config:dependencyConfig,codex:dependencyCodex,pack:dependencyPack,parity:dependencyParity,points:dependencyPoints,relatedRules:dependencyRelatedRules,pointsByTitle:new Map(dependencyPoints.units.map(item=>[titleKey(item.title),item])),wargearByTitle:new Map((dependencyWargear?.units||[]).map(item=>[titleKey(item.title),item])),wargearSource:dependencyWargear?.source,officialByTitle:new Map(Object.values(dependencyPack.datasheets||{}).flat().map(item=>[titleKey(item.title),item]))};
});
const dependencyById=new Map(dependencyCodices.map(item=>[item.id,item]));
const dependencyScope=config.dependencyDatasheets||{};
const excludedDependencyKeywords=new Set((dependencyScope.excludeAnyKeywords||[]).map(value=>clean(value).toUpperCase()));
const dependencyUnits=dependencyCodices.flatMap(dependency=>(dependencyScope.currentOnly?dependency.codex.datasheets||[]:unitInventory(dependency.codex))
  .filter(unit=>!(unit.keywords||[]).some(keyword=>excludedDependencyKeywords.has(clean(keyword).toUpperCase())))
  .map(unit=>{
    const point=dependency.pointsByTitle.get(titleKey(unit.title)),exact=dependency.wargearByTitle.get(titleKey(unit.title)),official=dependency.officialByTitle.get(titleKey(unit.title));
    return {...unit,...(point?{points:point.points,paidWargear:point.paidWargear,pointsSource:point.pointsSource}:{}),...(exact?{wargear:exact.wargear,compositionText:exact.composition,wargearSource:{label:dependency.wargearSource?.label||'Current 11e reference',url:exact.url}}:{}),...(official?{sourcePages:official.sourcePages,provenance:official.provenance}:{}),dependencyBook:dependency.id,dependencyTitle:dependency.config.title,dependencySourceFile:path.basename(dependency.pack.meta.file),dependencySourceVersion:dependency.pack.meta.version,dependencyCompactSharedAbilities:dependency.config.compactSharedAbilities||[],sourceLayer:`${dependency.id}-${official&&unit.sourceLayer==='codex'?'faction-pack':unit.sourceLayer||'source'}`};
  }));
const ownUnits=config.currentDatasheetLayers?config.currentDatasheetLayers.flatMap(layer=>codex[layer]||[]):config.currentDatasheetsOnly?codex.datasheets||[]:unitInventory(codex);
const pointsByTitle=new Map(points.units.map(item=>[titleKey(item.title),item]));
const wargearByTitle=new Map((codexWargear?.units||[]).map(item=>[titleKey(item.title),item]));
const mergedUnits=new Map();
if(dependencyScope.render!==false)for(const unit of dependencyUnits)mergedUnits.set(unit.id,unit);
for(const unit of ownUnits){
  const point=pointsByTitle.get(titleKey(unit.title)),exact=wargearByTitle.get(titleKey(unit.title));
  mergedUnits.set(unit.id,{...unit,...(point?{points:point.points,paidWargear:point.paidWargear,pointsSource:point.pointsSource}:{}),...(exact?{wargear:exact.wargear,compositionText:exact.composition,wargearSource:{label:codexWargear.source?.label||'Current 11e reference',url:exact.url}}:{})});
}
const officialIds=new Map(Object.values(pack.datasheets||{}).flat().map(item=>[titleKey(item.title),item]));
const units=[...mergedUnits.values()].map(unit=>{
  const official=officialIds.get(titleKey(unit.title));
  return official?{...unit,sourcePages:official.sourcePages,provenance:official.provenance,sourceLayer:unit.sourceLayer==='codex'?'faction-pack':unit.sourceLayer}:unit;
});
const relationUnits=unique([...units,...dependencyUnits],unit=>unit.id);
const unitById=new Map(relationUnits.map(unit=>[unit.id,unit])),unitByTitle=new Map(relationUnits.map(unit=>[titleKey(unit.title),unit]));

const codexDetachmentNames=unique(points.enhancements.map(item=>item.detachment),titleKey);
const packByTitle=new Map(pack.detachments.map(item=>[titleKey(item.title),item]));
const parityByTitle=new Map((codexParity?.detachments||[]).map(item=>[titleKey(item.title),item]));
const pointTitleKey=value=>titleKey(value).replace(/ upgrade$/,'');
const enhancementPointsByTitle=new Map(points.enhancements.map(item=>[pointTitleKey(item.title),item]));
const enhancementPointsByDetachment=new Map(points.enhancements.map(item=>[`${titleKey(item.detachment)}\0${pointTitleKey(item.title)}`,item]));
const detachmentMetaByTitle=new Map((points.detachments||[]).map(item=>[titleKey(item.title),item]));
const enrichEnhancement=(item,detachment)=>{const qualified=Boolean(config.detachmentQualifiedEnhancementPoints),current=qualified?enhancementPointsByDetachment.get(`${titleKey(detachment)}\0${pointTitleKey(item.title)}`):enhancementPointsByTitle.get(pointTitleKey(item.title));return current?{...item,...(qualified&&current.id?{id:current.id,sourceId:item.id}:{}),value:current.value,pointsSource:current.pointsSource,...(config.id==='space-marines'&&current.profile?{profile:current.profile}:{})}:item;};
const enrichDetachment=detachment=>({...detachment,...detachmentMetaByTitle.get(titleKey(detachment.title)),enhancements:(detachment.enhancements||[]).map(item=>enrichEnhancement(item,detachment.title))});
const localDetachments=codexDetachmentNames.map(title=>enrichDetachment(packByTitle.get(titleKey(title))||parityByTitle.get(titleKey(title))||{
  id:slug(title),title,sourceLayer:'codex-transcription',rule:null,
  enhancements:points.enhancements.filter(item=>titleKey(item.detachment)===titleKey(title)),stratagems:[]
}));
for(const item of pack.detachments)if(!localDetachments.some(other=>titleKey(other.title)===titleKey(item.title)))localDetachments.push(enrichDetachment(item));
const dependencyDetachmentScope=config.dependencyDetachments;
const dependencyDetachments=!dependencyDetachmentScope||dependencyDetachmentScope.render===false?[]:dependencyCodices.flatMap(dependency=>{
  const currentTitles=new Set((dependency.points.detachments||[]).map(item=>titleKey(item.title)));
  const pointMeta=new Map((dependency.points.detachments||[]).map(item=>[titleKey(item.title),item]));
  const pointEnhancements=new Map((dependency.points.enhancements||[]).map(item=>[`${titleKey(item.detachment)}\0${pointTitleKey(item.title)}`,item]));
  const source=unique([...(dependency.pack.detachments||[]),...(dependency.parity?.detachments||[])],item=>titleKey(item.title));
  const chapterKey=titleKey(dependencyDetachmentScope.chapterKeyword||config.factionKeyword);
  const selected=source.filter(item=>{const restriction=item.restriction||dependency.config.detachmentChapterRestrictions?.[item.title];return currentTitles.has(titleKey(item.title))&&(!restriction||titleKey(restriction)===chapterKey);}).map(item=>{
    const meta=pointMeta.get(titleKey(item.title))||{},override=dependencyDetachmentScope.pointOverrides?.[item.title]||{};
    const mark=record=>({...record,dependencyBook:dependency.id});
    return {...item,...meta,...override,rule:item.rule?mark(item.rule):item.rule,enhancements:(item.enhancements||[]).map(enhancement=>{const current=pointEnhancements.get(`${titleKey(item.title)}\0${pointTitleKey(enhancement.title)}`)||{};return mark({...enhancement,...current,text:enhancement.text,...(config.id==='dark-angels'&&enhancement.id?{sourceId:enhancement.id}:{})});}),stratagems:(item.stratagems||[]).map(mark),dependencyBook:dependency.id,dependencyTitle:dependency.config.title,dependencySourceFile:path.basename(dependency.pack.meta.file),dependencySourceVersion:dependency.pack.meta.version,dependencyCodexSourceLabel:dependency.config.codexSourceLabel||'SECONDARY CODEX'};
  });
  if(dependencyDetachmentScope.expected!=null&&selected.length!==dependencyDetachmentScope.expected)throw new Error(`${config.id}: expected ${dependencyDetachmentScope.expected} compatible ${dependency.config.title} Detachments, got ${selected.length}`);
  return selected;
});
const detachments=unique([...localDetachments,...dependencyDetachments],item=>titleKey(item.title));

const allKeywords=new Set(units.flatMap(unit=>unit.keywords||[]).map(value=>clean(value).toUpperCase()));
const namedGroups=[
  ['TYRANID WARRIORS',units.filter(unit=>/^Tyranid Warriors/i.test(unit.title)).map(unit=>unit.id)],
  ['DEATHLEAPER',units.filter(unit=>titleKey(unit.title)==='deathleaper').map(unit=>unit.id)],
  ['NEUROLICTOR',units.filter(unit=>titleKey(unit.title)==='neurolictor').map(unit=>unit.id)],
  ['LICTOR',units.filter(unit=>titleKey(unit.title)==='lictor').map(unit=>unit.id)],
  ["VON RYAN'S LEAPERS",units.filter(unit=>titleKey(unit.title)==='von ryans leapers').map(unit=>unit.id)],
  ['NORN ASSIMILATOR',units.filter(unit=>titleKey(unit.title)==='norn assimilator').map(unit=>unit.id)],
  ['NORN EMISSARY',units.filter(unit=>titleKey(unit.title)==='norn emissary').map(unit=>unit.id)],
  ['MAWLOC',units.filter(unit=>titleKey(unit.title)==='mawloc').map(unit=>unit.id)],
  ['TRYGON',units.filter(unit=>titleKey(unit.title)==='trygon').map(unit=>unit.id)]
];
const relatedRulesFor=item=>item.dependencyBook?dependencyById.get(item.dependencyBook)?.relatedRules||relatedRules:relatedRules;
const contractById=(records,...ids)=>{for(const id of ids){if(records?.[id])return records[id];const compact=String(id||'').replace(/^enhancement-/,'').replace(/[^a-z0-9]/gi,'').toLowerCase(),match=Object.entries(records||{}).find(([key])=>key.replace(/[^a-z0-9]/gi,'').toLowerCase()===compact);if(match)return match[1];}return null;};
const enhancementEligibility=item=>contractById(relatedRulesFor(item).enhancements,item.id,item.sourceId);
const enhancementOwnerRecords=Object.entries(enhancementOwners?.enhancements||{}).map(([id,record])=>({id,...record}));
const enhancementRuleId=item=>config.id==='chaos-space-marines'&&item.id?item.id:['space-marines','dark-angels'].includes(config.id)&&(item.sourceId||item.id)?item.sourceId||item.id:enhancementOwnerRecords.find(record=>titleKey(record.title)===titleKey(item.title))?.id||item.id||`enhancement-${slug(item.title)}`;
const enhancementOwnerRecord=item=>enhancementOwnerRecords.find(record=>record.id===enhancementRuleId(item))||null;
const publishedEnhancementContracts=new Set(['tyranids','tau-empire']);
const publishedRelationContracts=new Set(['tyranids','tau-empire']);
const enhancementContract=item=>{
  const frozen=enhancementOwnerRecord(item);
  if(frozen){
    if(!frozen.ownerGroup)return null;
    const group=enhancementOwners.ownerGroups?.[frozen.ownerGroup];
    if(!group)throw new Error(`${config.id}: missing Enhancement owner group ${frozen.ownerGroup}`);
    const isUpgrade=(frozen.tags||[]).includes('UPGRADE');
    return {tags:frozen.tags||[],owner:{subject:group.subject,selector:{unitIds:group.unitIds||[],noneKeywords:group.noneKeywords||[]}},assignment:isUpgrade?enhancementOwners.defaults.upgradeAssignment:enhancementOwners.defaults.standardAssignment};
  }
  const contract=enhancementEligibility(item);
  if(!contract||!publishedEnhancementContracts.has(config.id))return contract;
  const tags=contract.tags||[],owner=contract.owner,assignment=contract.assignment;
  if(!Array.isArray(tags)||tags.some(tag=>tag!=='UPGRADE'))throw new Error(`${config.id}: invalid Enhancement tags for ${item.id}`);
  if(!owner||!['model','unit'].includes(owner.subject)||!owner.selector)throw new Error(`${config.id}: invalid Enhancement owner for ${item.id}`);
  const isUpgrade=tags.includes('UPGRADE');
  if(isUpgrade!== (owner.subject==='unit'))throw new Error(`${config.id}: ${item.id} must use ${isUpgrade?'unit':'model'} owner subject`);
  if(!assignment||assignment.maxOwners!==(isUpgrade?3:1)||assignment.enhancementChoices!==1||assignment.payPointsPerOwner!==true)throw new Error(`${config.id}: invalid Enhancement assignment for ${item.id}`);
  return contract;
};
const supportedSubjects=new Set(['unit','model','objective']);
const stratagemEligibility=item=>{
  const source=relatedRulesFor(item),explicit=source.stratagems?.[item.id]||source.stratagems?.[String(item.id||'').replace(/^stratagem-/,'')];
  if(!explicit&&config.legacyRelatedRuleAttributes===false)return null;
  if(!explicit)throw new Error(`${config.id}: missing audited Stratagem eligibility for ${item.id} (${item.title})`);
  const roles=explicit.roles||explicit.targets||[];
  if(!roles.some(role=>role.side==='friendly'||role.side==='either'))throw new Error(`${config.id}: Stratagem ${item.id} has no friendly target role`);
  const inspect=selector=>{
    for(const unitId of selector?.unitIds||selector?.units||[])if(!unitById.has(unitId)&&!item.dependencyBook)throw new Error(`${config.id}: Stratagem ${item.id} references unknown unit ${unitId}`);
    for(const alternative of selector?.alternatives||[])inspect(alternative);
  };
  for(const role of roles){
    const subject=role.subject||'unit';
    if(!supportedSubjects.has(subject))throw new Error(`${config.id}: Stratagem ${item.id} uses unsupported eligibility subject ${subject}`);
    inspect(role.selector||role);
  }
  return explicit;
};

const relationEdges=[];
for(const leader of units){
  for(const [role,targets] of [['leader',leader.relations?.leader||[]],['support',leader.relations?.support||[]]])for(const targetName of targets){
    const names=unitByTitle.has(titleKey(targetName))?[targetName]:String(targetName).split(/[;,]/).map(value=>value.trim()).filter(Boolean);
    for(const name of names){
      const body=unitByTitle.get(titleKey(name));
      if(!body){if(publishedRelationContracts.has(config.id))throw new Error(`${config.id}: ${leader.id} references unknown ${role} target ${name}`);continue;}
      relationEdges.push({role,sourceId:leader.id,targetId:body.id});
    }
  }
}
const relationGraphs=buildRelationGraphs(relationUnits,relationEdges);

const terms=new Map();
function addTerm(title,summary,sectionId,kind='faction-term',unitId='',termScope=config.id){
  const base=`${termScope}-${kind}-${slug(title)}`;let id=base,index=2;while(terms.has(id)&&terms.get(id).summary!==clean(summary))id=`${base}-${index++}`;
  if(!terms.has(id))terms.set(id,{id,title:clean(title),summary:clean(summary)||`${clean(title)} appears in the ${config.title} reference.`,full:clean(summary),rule:sectionId,glossary:`glossary-${id}`,units:unitId?[unitId]:[]});
  else if(unitId&&!terms.get(id).units.includes(unitId))terms.get(id).units.push(unitId);
  return id;
}
for(const det of detachments){
  const scope=det.dependencyBook||config.id;
  if(det.rule)addTerm(det.rule.title,det.rule.text,`detachment-${det.id}`,'detachment-rule','',scope);
  for(const item of det.enhancements)addTerm(item.title,item.text,`detachment-${det.id}`,'enhancement','',scope);
  for(const item of det.stratagems)addTerm(item.title,[item.when,item.target,item.effect,item.restrictions].filter(Boolean).join(' '),`detachment-${det.id}`,'stratagem','',scope);
}
const scopedAbilityTerms=new Map();
for(const unit of units){
  const termScope=unit.dependencyBook||config.id;
  for(const ability of unit.abilities||[]){const key=coreBaseKey(ability.title),canonical=canonicalCoreAbilityTerms.get(key);ability.termId=canonical||addTerm(ability.title,ability.text,unit.id,'ability',unit.id,termScope);if(!canonical)scopedAbilityTerms.set(`${termScope}\0${key}`,ability.termId);}
  for(const ability of unit.wargearAbilities||[]){const key=coreBaseKey(ability.title),canonical=canonicalCoreAbilityTerms.get(key);ability.termId=canonical||addTerm(ability.title,ability.text,unit.id,'ability',unit.id,termScope);if(!canonical)scopedAbilityTerms.set(`${termScope}\0${key}`,ability.termId);}
  for(const weapon of unit.weapons||[])weapon.termId=addTerm(weapon.name,`${weapon.mode==='ranged'?'Ranged':'Melee'} · ${weapon.range} · A ${weapon.a} · ${weapon.mode==='ranged'?'BS':'WS'} ${weapon.skill} · S ${weapon.s} · AP ${weapon.ap} · D ${weapon.d}${weapon.abilities?` · ${weapon.abilities}`:''}`,unit.id,'weapon',unit.id,termScope);
}
const weaponAbilityTokens=(value,termScope=config.id)=>`<div class="weapon-tags">${String(value).split(',').map(rawLabel=>{const label=rawLabel.trim(),key=coreBaseKey(label),termId=canonicalCoreAbilityTerms.get(key)||scopedAbilityTerms.get(`${termScope}\0${key}`);return termId?`<button class="tag" data-term="${termId}">${esc(label.toUpperCase())}</button>`:`<span class="tag">${esc(label.toUpperCase())}</span>`;}).join('')}</div>`;

const navLeaf=(id,label,depth)=>`<li data-nav-id="${esc(id)}" data-nav-depth="${depth}"><div class="toc-row no-toggle"><button class="toc-label" data-nav-target="${esc(id)}">${esc(label)}</button></div></li>`;
const navBranch=(id,label,depth,children)=>`<li data-nav-id="${esc(id)}" data-nav-depth="${depth}"><div class="toc-row"><button class="toc-label" data-nav-target="${esc(id)}">${esc(label)}</button><button class="toc-toggle" data-nav-toggle aria-label="Toggle ${esc(label)}" aria-expanded="false"></button></div><ul class="toc-branch" hidden>${children}</ul></li>`;
const tracked=(id,title,body,classes='content-group',titleSuffix='')=>`<section class="${classes}" id="${esc(id)}" data-track="${esc(id)}"><h3 class="category-title${titleSuffix?' detachment-title':''}">${esc(title)}${titleSuffix}</h3>${body}</section>`;
const sourceLink=pages=>`<a class="source-link" href="./sources/${esc(path.basename(pack.meta.file))}#page=${pages[0]}">Official Faction Pack v${esc(pack.meta.version)} · p. ${pages.join('–')}</a>`;
const codexSourceLink=()=>`<a class="source-link" href="${esc(codexParity.source.url)}">${esc(codexParity.source.title)}</a>`;
const verificationBuild=manifest.gates?.publishAsComplete===false;
const reviewLabel=config.reviewEntry?manifest.gates?.reviewLabel:'';
const heroReview=reviewLabel?`<div class="eyebrow">${esc(reviewLabel)}</div>`:'';
const entryReview=reviewLabel?`<p><strong>${esc(reviewLabel)}</strong></p><p>${esc(manifest.gates.reason)}</p>`:'';
const unitSourceState=unit=>verificationBuild&&!config.dedicatedMobile?`<div class="unit-source-state">${unit.dependencyBook?`<span>${esc(unit.dependencyTitle)} shared datasheet</span>`:''}<span>Datasheet structure · current 11e catalogue</span><span>${unit.pointsSource?`${esc(unit.pointsSource.label)} · checked ${esc(unit.pointsSource.verifiedAt)}`:'Points · catalogue snapshot'}</span>${unit.wargearSource?'<span>Wargear & composition · current 11e reference</span>':''}${unit.sourcePages?`<span>${unit.dependencyBook?`${esc(unit.dependencyTitle)} `:''}Official Faction Pack overlay · p. ${unit.sourcePages.join('–')}</span>`:''}</div>`:'';
const dependencyArmyRuleSources=dependencyCodices.flatMap(dependency=>(dependency.pack.updates||[]).map(item=>({...item,sourceBook:dependency.id,sourceFile:dependency.pack.meta.file,sourceVersion:dependency.pack.meta.version})));
const datasheetArmyRuleSources=units.flatMap(unit=>(unit.abilities||[]).map(item=>({...item,subject:item.title,change:item.text,datasheetSource:true})));
const armyRuleSources=[...(pack.updates||[]),...(codexParity?.armyRules||[]),...dependencyArmyRuleSources,...datasheetArmyRuleSources];
const armyRules=(config.armyRules||['Shadow in the Warp','Synapse']).map(title=>armyRuleSources.find(item=>titleKey(item.subject||item.title)===titleKey(title))).filter(Boolean).map(item=>({id:`army-rule-${slug(item.subject||item.title)}`,termId:config.armyRuleTermIds?.[item.subject||item.title],title:item.subject||item.title,text:item.change||item.summary||item.text,sourcePages:item.sourcePages,source:item.sourceBook?'dependency':item.sourcePages?'faction-pack':item.datasheetSource?'datasheet':'codex-parity',sourceBook:item.sourceBook,sourceFile:item.sourceFile,sourceVersion:item.sourceVersion}));
const fixedCategoryOrder=['Epic Heroes','Characters','Battleline','Dedicated Transports','Monsters','Infantry'];
const categoryLabel=category=>config.datasheetCategoryLabels?.[category]||category;
const categoriesFor=(sourceUnits,prefix='')=>[...fixedCategoryOrder,...new Set(sourceUnits.map(unit=>categoryLabel(unit.category)).filter(category=>!fixedCategoryOrder.includes(category)&&category!=='Other'&&category!=='Warhammer Legends')),'Other','Warhammer Legends'].map(title=>({title,id:`datasheets-${prefix?`${prefix}-`:''}${slug(title)}`,units:sourceUnits.filter(unit=>categoryLabel(unit.category)===title)})).filter(group=>group.units.length);
const groupedDependencyDatasheets=dependencyScope.render!==false&&dependencyScope.groupByBook===true;
const datasheetLayers=groupedDependencyDatasheets?[{id:`datasheets-${config.id}`,title:config.title,kind:'publication-owned',units:units.filter(unit=>!unit.dependencyBook)},...dependencyCodices.map(dependency=>({id:`datasheets-${dependency.id}`,title:dependency.config.title,kind:'shared',units:units.filter(unit=>unit.dependencyBook===dependency.id)}))].map(layer=>({...layer,categories:categoriesFor(layer.units,layer.kind==='shared'?slug(layer.title):'')})):[];
const categories=groupedDependencyDatasheets?datasheetLayers.flatMap(layer=>layer.categories):categoriesFor(units);
const categoryNav=(group,depth)=>navBranch(group.id,group.title,depth,group.units.map(unit=>navLeaf(unit.id,unit.title,depth+1)).join(''));
const datasheetNav=groupedDependencyDatasheets?datasheetLayers.map(layer=>navBranch(layer.id,layer.title,2,layer.categories.map(group=>categoryNav(group,3)).join(''))).join(''):categories.map(group=>categoryNav(group,2)).join('');
const detachmentNav=detachments.map(det=>navBranch(`detachment-${det.id}`,det.title,2,
  navLeaf(`${det.id}-rule`,'Detachment Rule',3)
  +((det.enhancements||[]).length?navLeaf(`${det.id}-enhancements`,'Enhancement',3):'')
  +((det.stratagems||[]).length?navLeaf(`${det.id}-stratagems`,'Stratagems',3):'')
)).join('');
const toc=navLeaf('start','Start',1)
  +(armyRules.length?navBranch('army-rules','Army Rules',1,armyRules.map(item=>navLeaf(item.id,item.title,2)).join('')):'')
  +navBranch('detachments','Detachments',1,detachmentNav)
  +navBranch('datasheets','Datasheets',1,datasheetNav)
  +navBranch('updates','Updates',1,[...pack.updates.filter(item=>!armyRules.some(rule=>rule.title===item.subject)),...pack.faqs].map(item=>navLeaf(`update-${item.id}`,item.title||item.subject||item.question,2)).join(''));

const enhancementCard=(item,det,{related=false}={})=>{
  const explicit=enhancementContract(item),tags=explicit?.tags||item.tags||[],isUpgrade=tags.includes('UPGRADE');
  if(enhancementOwnerRecord(item)&&!explicit)return'';
  if(related&&!explicit)return'';
  const termText=isUpgrade?`UPGRADE. ${item.text}`:item.text;
  return`<article class="enhancement surface" data-rule-id="${esc(enhancementRuleId(item))}" data-enhancement-tags="${esc(tags.join('|'))}" data-owner-subject="${esc(explicit?.owner?.subject||'')}"${config.compatibleRulesMatrix?` data-enhancement-title="${esc(item.title.replace(/\s*\(Aura\)$/i,''))}"`:''}${explicit&&config.legacyRelatedRuleAttributes!==false?` data-eligibility="${esc(JSON.stringify(explicit))}"`:''}><div class="eyebrow">Enhancement${isUpgrade?' · UPGRADE':''}${item.value?` · ${item.value} pts`:''}</div><h4><button class="term-button" data-term="${addTerm(item.title,termText,`detachment-${det.id}`,'enhancement','',det.dependencyBook||config.id)}">${esc(item.title)}</button></h4><p data-source-field="text">${esc(item.text)}</p></article>`;
};
const stratagemCard=(item,det)=>{const eligibility=config.legacyRelatedRuleAttributes!==false?stratagemEligibility(item):null,type=item.canonicalType||item.typeStatus||'',typeAttrs=item.typeStatus?` data-stratagem-type="${esc(type)}" data-source-label="${esc(item.sourceLabel||'')}"`:'',typeLabel=item.typeStatus&&item.sourceLabel?`<span class="stratagem-type">${esc(item.sourceLabel)}</span>`:'';return`<article class="stratagem surface" data-rule-id="${esc(item.id)}"${typeAttrs}${config.legacyRelatedRuleAttributes!==false?` data-eligibility="${esc(JSON.stringify(eligibility))}"`:''}><div class="stratagem-head"><div><h3><button class="term-button" data-term="${addTerm(item.title,[item.when,item.target,item.effect,item.restrictions].filter(Boolean).join(' '),`detachment-${det.id}`,'stratagem','',det.dependencyBook||config.id)}">${esc(item.title)}</button></h3>${typeLabel}</div><div class="cp">${esc(item.cp)}CP</div></div><p class="field" data-source-field="when"><b>When</b><br>${esc(item.when)}</p><p class="field" data-source-field="target"><b>Target</b><br>${esc(item.target)}</p><p class="field" data-source-field="effect"><b>Effect</b><br>${esc(item.effect)}</p>${item.restrictions?`<p class="field" data-source-field="restrictions"><b>Restrictions</b><br>${esc(item.restrictions)}</p>`:''}</article>`;};
const dependencyDetachmentSourceLink=det=>`<a class="source-link" href="../${esc(det.dependencyBook)}/sources/${esc(det.dependencySourceFile)}#page=${det.sourcePages[0]}">${esc(det.dependencyTitle)} Faction Pack v${esc(det.dependencySourceVersion)} · p. ${det.sourcePages.join('–')}</a>`;
const detachmentHtml=detachments.map(det=>{
  const official=Boolean(det.sourcePages),enhancements=(det.enhancements||[]).map(item=>enhancementCard(item,det)).join(''),stratagems=(det.stratagems||[]).map(item=>stratagemCard(item,det)).join('');
  const rule=det.rule?`<article class="rule-card surface"><h4><button class="term-button" data-term="${addTerm(det.rule.title,det.rule.text,`detachment-${det.id}`,'detachment-rule','',det.dependencyBook||config.id)}">${esc(det.rule.title)}</button></h4><p data-source-field="text">${esc(det.rule.text).replace(/\n/g,'<br>')}</p></article>`:`<article class="rule-card surface source-warning"><h4>Codex source required</h4><p>This Detachment is current, but its complete rule and Stratagem text is not present in Faction Pack v${esc(pack.meta.version)}. It is not reproduced here until the Codex layer is verified.</p></article>`;
  const ruleSection=`<section class="detachment-part" id="${esc(det.id)}-rule" data-track="${esc(det.id)}-rule"><h4 class="subheading">Detachment Rule</h4>${rule}</section>`;
  const enhancementSection=enhancements?`<section class="detachment-part" id="${esc(det.id)}-enhancements" data-track="${esc(det.id)}-enhancements"><h4 class="subheading">Enhancements</h4><div class="detachment-grid">${enhancements}</div></section>`:'';
  const stratagemSection=stratagems?`<section class="detachment-part" id="${esc(det.id)}-stratagems" data-track="${esc(det.id)}-stratagems"><h4 class="subheading">Stratagems</h4><div class="detachment-grid stratagem-grid">${stratagems}</div></section>`:'';
  const dp=det.detachmentPoints==null?'':`<span class="detachment-dp">${esc(det.detachmentPoints)}DP</span>`;
  const sourceLabel=det.dependencyBook?`${det.dependencyTitle.toUpperCase()} SHARED · ${official?'OFFICIAL FACTION PACK':esc(det.dependencyCodexSourceLabel)}`:official?'OFFICIAL FACTION PACK':esc(config.codexSourceLabel||'CODEX INDEX');
  const sourceFooter=official?`<p class="source">${det.dependencyBook?dependencyDetachmentSourceLink(det):sourceLink(det.sourcePages)}</p>`:'';
  return tracked(`detachment-${det.id}`,det.title,`<div class="detachment-meta"><span>${sourceLabel}</span>${det.forceDisposition?`<span>${esc(det.forceDisposition)}</span>`:''}</div>${ruleSection}${enhancementSection}${stratagemSection}${sourceFooter}`,'content-group detachment',dp);
}).join('');
const statline=unit=>(unit.profiles||[]).map(profile=>`<div class="model-profile" data-profile="${esc(slug(profile.name))}">${unit.profiles.length>1?`<h5>${esc(profile.name)}</h5>`:''}<div class="statline">${Object.entries(profile.stats).filter(([,value])=>value).map(([name,value])=>`<div class="stat" data-source-field="stats.${esc(name)}"><b>${esc(name)}</b><span>${esc(value)}</span></div>`).join('')}</div></div>`).join('');
const weaponTables=unit=>['ranged','melee'].map(mode=>{const rows=(unit.weapons||[]).filter(item=>item.mode===mode);if(!rows.length)return'';const skill=mode==='ranged'?'BS':'WS';return`<div class="weapon-group"><h5>${mode==='ranged'?'Ranged':'Melee'} weapons</h5><div class="weapon-table" role="table"><div class="weapon-row weapon-head"><div>Weapon</div><div>Range</div><div>A</div><div>${skill}</div><div>S</div><div>AP</div><div>D</div></div>${rows.map(item=>`<div class="weapon-row" data-source-field="weapons.${esc(slug(item.name))}" data-mode="${mode}"><div data-source-field="name"><button class="weapon-button" data-term="${item.termId}">${esc(item.name)}</button>${item.abilities?weaponAbilityTokens(item.abilities,unit.dependencyBook||config.id):''}</div><div data-label="Range" data-source-field="range">${esc(item.range)}</div><div data-label="A" data-source-field="a">${esc(item.a)}</div><div data-label="${skill}" data-source-field="skill">${esc(item.skill)}</div><div data-label="S" data-source-field="s">${esc(item.s)}</div><div data-label="AP" data-source-field="ap">${esc(item.ap)}</div><div data-label="D" data-source-field="d">${esc(item.d)}</div></div>`).join('')}</div></div>`;}).join('');
const renderedUnitIds=new Set(units.map(unit=>unit.id));
const relationLabel=name=>{const target=unitByTitle.get(titleKey(name));return target&&renderedUnitIds.has(target.id)?`<button class="term-button" data-journey-target="${esc(target.id)}" data-journey-type="datasheet">${esc(name)}</button>`:esc(name);};
const unitSourceLink=unit=>unit.dependencyBook?`<a class="source-link" href="../${esc(unit.dependencyBook)}/sources/${esc(unit.dependencySourceFile)}#page=${unit.sourcePages[0]}">${esc(unit.dependencyTitle)} Faction Pack v${esc(unit.dependencySourceVersion)} · p. ${unit.sourcePages.join('–')}</a>`:sourceLink(unit.sourcePages);
const unitCard=unit=>{
  const base=unit.id.replace(/^unit-/,''),pointsText=(unit.points||[]).map(item=>{
    const repeated=String(item.label||'').match(/^(\d+)\+ unit:\s*(\d+) models?$/i);
    const label=repeated?`${repeated[1]}+ copy · ${repeated[2]} model${repeated[2]==='1'?'':'s'}`:item.label;
    return `${label}: ${item.value} pts`;
  }).join('\n');
  const pointRows=(unit.points||[]).map(item=>({label:item.label,value:item.value}));
  const pointsSummary=pointRows.length===1?pointsText:pointRows.length>1?'MULTIPLE COSTS':pointsText;
  const pointsPanel=pointRows.length?`<div class="points-panel surface"><div class="eyebrow">Points</div>${pointRows.map(item=>`<div class="points-row"><span>${esc(item.label)}</span><strong>${esc(item.value)} pts</strong></div>`).join('')}</div>`:'';
  const wargearAbilitiesId=`${base}-wargear-abilities`;
  const parts={profile:`${base}-profile`,abilities:`${base}-abilities`,...((unit.wargearAbilities||[]).length?{'wargear abilities':wargearAbilitiesId}:{}),composition:`${base}-composition`,...((unit.relations?.leader||[]).length?{leader:`${base}-leader`}:{}),...(config.renderSupportRelations&&unit.relations?.support?.length?{support:`${base}-support`}:{}),...(config.renderTransportRelations&&unit.relations?.transport?.length?{transport:`${base}-transport`}:{}),keywords:`${base}-keywords`};
  const tabs=Object.entries(parts).map(([label,id])=>`<button class="local-tab" data-journey-target="${id}" data-journey-type="datasheet">${label[0].toUpperCase()+label.slice(1)}</button>`).join('');
  const classified=config.classifiedAbilityPresentation===true;
  const compact=(unit.dependencyCompactSharedAbilities||config.compactSharedAbilities||[]).map(titleKey),presentationClass=item=>item.termId?.startsWith('core-')?'core':item.abilityClass,isCompact=item=>classified?['core','faction'].includes(presentationClass(item)):compact.some(value=>titleKey(item.title)===value||titleKey(item.title).startsWith(`${value} `));
  const shared=unique((unit.abilities||[]).filter(isCompact),item=>titleKey(item.title)),specific=(unit.abilities||[]).filter(item=>!isCompact(item));
  const compactButtons=items=>`<div class="keyword-list shared-abilities">${items.map(item=>`<button class="term-button" data-term="${item.termId}" data-source-field="abilities.${esc(slug(item.title))}" data-source-value="${esc(item.text)}">${esc(item.title)}</button>`).join('')}</div>`;
  const compactAbilities=classified?['core','faction'].map(group=>{const items=shared.filter(item=>presentationClass(item)===group);return items.length?`<div class="ability-compact-group" data-ability-class="${group}"><h5>${group.toUpperCase()}</h5>${compactButtons(items)}</div>`:'';}).join(''):(shared.length?compactButtons(shared):'');
  const wargearAbilitySection=(unit.wargearAbilities||[]).length?`<section class="unit-part" id="${wargearAbilitiesId}"><h4>Wargear Abilities</h4><p class="unit-note">These abilities apply only while the corresponding wargear is equipped.</p><div class="ability-list">${unit.wargearAbilities.map(item=>`<article class="ability" data-source-field="wargearAbilities.${esc(slug(item.title))}"><h5><button class="term-button" data-term="${item.termId}">${esc(item.title)}</button></h5>${item.text?`<p data-source-field="text">${esc(item.text)}</p>`:''}</article>`).join('')}</div></section>`:'';
  const composition=unit.compositionText?`<p>${esc(unit.compositionText)}</p>`:`<ul>${(unit.composition||[]).map(item=>`<li>${item.min}${item.max!==item.min?`–${item.max}`:''} ${esc(item.name)}</li>`).join('')}</ul>`;
  const wargear=unit.wargear?.length?`<h5>Wargear Options</h5><ul>${unit.wargear.map(item=>`<li class="wargear-option">${escLines(item)}</li>`).join('')}</ul>`:'';
  const leader=(unit.relations?.leader||[]).length?`<section class="unit-part" id="${parts.leader}" data-source-field="relations.leader"><h4>Leader</h4><p>This model can be attached to: ${unit.relations.leader.map(relationLabel).join('; ')}.</p></section>`:'';
  const support=parts.support?`<section class="unit-part" id="${parts.support}" data-source-field="relations.support"><h4>Support</h4><p>This unit can join: ${unit.relations.support.map(relationLabel).join('; ')}.</p></section>`:'';
  const transport=parts.transport?`<section class="unit-part" id="${parts.transport}" data-source-field="relations.transport"><h4>Transport</h4>${unit.relations.transport.map(item=>`<p>${esc(item)}</p>`).join('')}</section>`:'';
  const sourceAbilities=[...(unit.abilities||[]),...(unit.wargearAbilities||[])];
  const deadlyDemise=sourceAbilities.some(item=>/^deadly demise\b/i.test(item.title)||/\bdeadly demise\b/i.test(item.text||''));
  const abilityNames=sourceAbilities.map(item=>/^deadly demise\b/i.test(item.title)?'DEADLY DEMISE':item.title);
  const relations=relationGraphs.get(unit.id),canAttach=Object.values(relations).some(items=>items.length);
  const ruleFacts={id:unit.id,unitId:unit.id,slug:base,keywords:unit.keywords||[],intrinsicKeywords:unit.keywords||[],abilities:[...new Set(abilityNames)],termIds:[...new Set([...sourceAbilities,...(unit.weapons||[])].map(item=>item.termId).filter(Boolean))],epic:(unit.keywords||[]).some(item=>titleKey(item)==='epic hero'),deadlyDemise,attached:canAttach?null:false,attachmentKnown:!canAttach,characterCount:(unit.keywords||[]).some(item=>titleKey(item)==='character')?1:0,twoCharacters:null,warlord:null,relations};
  return`<article class="unit-card surface${unit.status==='Warhammer Legends'?' legends-card':''}" id="${unit.id}" data-track="${unit.id}" data-unit-title="${esc(unit.title)}" data-rule-facts="${esc(JSON.stringify(ruleFacts))}"><div class="unit-header"><div><div class="eyebrow">${esc(unit.status)} · ${esc(unit.sourceLayer)}</div><h3>${esc(unit.title)}</h3></div><div class="unit-status">${esc(pointsSummary||'POINTS PENDING')}</div></div>${unitSourceState(unit)}<div class="local-nav">${tabs}</div><section class="unit-part" id="${parts.profile}"><h4>Profile & Weapons</h4>${pointsPanel}${statline(unit)}${weaponTables(unit)}</section><section class="unit-part" id="${parts.abilities}"><h4>Abilities</h4>${compactAbilities}<div class="ability-list">${specific.map(item=>`<article class="ability" data-source-field="abilities.${esc(slug(item.title))}"><h5><button class="term-button" data-term="${item.termId}">${esc(item.title)}</button></h5>${item.text?`<p data-source-field="text">${esc(item.text)}</p>`:''}</article>`).join('')}</div></section>${wargearAbilitySection}<section class="unit-part" id="${parts.composition}"><h4>Composition & Wargear</h4>${composition}${wargear}${unit.paidWargear?.length?`<h5>Paid wargear</h5><ul>${unit.paidWargear.map(item=>`<li>${esc(item.name)} · +${item.value} pts</li>`).join('')}</ul>`:''}</section>${leader}${support}${transport}<section class="unit-part" id="${parts.keywords}"><h4>Keywords</h4><div class="keyword-list">${(unit.keywords||[]).map(item=>`<span data-source-field="keywords.${esc(slug(item))}">${esc(item)}</span>`).join('')}</div></section>${unit.sourcePages?`<p class="source">${unitSourceLink(unit)}</p>`:''}</article>`;
};
const datasheetHtml=groupedDependencyDatasheets?datasheetLayers.map(layer=>tracked(layer.id,layer.title,`<p class="eyebrow">${layer.kind==='shared'?'Shared Space Marines':'Dark Angels publication-owned'} · ${layer.units.length} datasheets</p>${layer.categories.map(group=>tracked(group.id,group.title,group.units.map(unitCard).join(''))).join('')}`,'datasheet-source-group')).join(''):categories.map(group=>tracked(group.id,group.title,group.units.map(unitCard).join(''))).join('');
const armyRuleSourceLink=item=>item.source==='dependency'?`<a class="source-link" href="../${esc(item.sourceBook)}/${esc(item.sourceFile)}#page=${item.sourcePages[0]}">${esc(item.sourceBook)} Faction Pack v${esc(item.sourceVersion)} · p. ${item.sourcePages.join('–')}</a>`:item.source==='faction-pack'?sourceLink(item.sourcePages):item.source==='datasheet'?'<span class="source-link">Current structured Datasheet evidence</span>':codexSourceLink();
const armyRulesHtml=armyRules.map(item=>tracked(item.id,item.title,`<article class="rule-card surface"><div class="eyebrow">Army rule</div><h4><button class="term-button" data-term="${item.termId||addTerm(item.title,item.text,item.id,'army-rule')}">${esc(item.title)}</button></h4><p data-source-field="text">${esc(item.text)}</p><p class="source">${armyRuleSourceLink(item)}</p></article>`)).join('');
const updatesHtml=[...pack.updates.filter(item=>!armyRules.some(rule=>rule.title===item.subject)).map(item=>({id:item.id,title:item.title||item.subject,text:item.summary||item.text||item.change,pages:item.sourcePages,type:'Official update'})),...pack.faqs.map(item=>({id:item.id,title:item.question,text:item.answer,pages:item.sourcePages,type:'Official FAQ'}))].map(item=>tracked(`update-${item.id}`,item.title,`<article class="rule-card surface"><div class="eyebrow">${item.type}</div><p>${esc(item.text)}</p><p class="source">${sourceLink(item.pages)}</p></article>`)).join('');

const sharedCoreInc=(()=>{if(!config.includeCoreStratagems)return'';const value=fs.readFileSync(path.join(repo,'books','adeptus-mechanicus','mobile','related-rules.inc'),'utf8'),start=value.indexOf('<section class="related-detachment related-core"'),next=value.indexOf('<section class="related-detachment',start+1);if(start<0)throw new Error('Core Stratagems source is absent');return next>start?value.slice(start,next):value.slice(start);})();
const relatedInc=detachments.map(det=>`<section class="related-detachment" data-detachment="${esc(det.id)}"${config.legacyRelatedRuleAttributes!==false?` data-keyword-grants="${esc(JSON.stringify(relatedRules.keywordGrants?.[det.id]||[]))}"`:''}><h2>${esc(det.title)} <span class="detachment-dp">${esc(det.detachmentPoints)}DP</span></h2><div data-related-kind="stratagems">${(det.stratagems||[]).map(item=>stratagemCard(item,det)).join('')}</div><div data-related-kind="enhancements">${(det.enhancements||[]).map(item=>enhancementCard(item,det,{related:true})).join('')}</div></section>`).join('')+sharedCoreInc;
const sourceGate=manifest.gates?.publishAsComplete===false?`<article class="rule-card surface source-warning"><div class="eyebrow">Build status</div><h3>Reference in verification</h3><p>${esc(manifest.gates.reason)}</p></article>`:'';
const html=`<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${esc(config.title)} Rules — WH40K Library</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="stylesheet" href="./styles/tokens.css?v=1"><link rel="stylesheet" href="../death-guard/styles/layout.css?v=11"><link rel="stylesheet" href="../death-guard/styles/navigation.css?v=12"><link rel="stylesheet" href="../death-guard/styles/content.css?v=41"><link rel="stylesheet" href="../death-guard/styles/popups.css?v=18"><link rel="stylesheet" href="../shared/datasheet-system.css?v=8"><link rel="stylesheet" href="./styles/book.css?v=1"></head><body><header class="app-header"><button class="header-button nav-menu" id="navMenu" type="button" aria-label="Open navigation" aria-controls="tocPanel" aria-expanded="false">☰</button><button class="header-button nav-collapse" id="navCollapse" type="button" aria-label="Collapse navigation" aria-controls="tocPanel" aria-expanded="true">◀</button><div class="app-brand"><strong>${esc(config.shortTitle)}</strong><small>${esc(config.edition)} · ${esc(config.title)} reference</small></div><a class="library-link" href="../../index.html"><span aria-hidden="true">←</span><b>Library</b></a><a class="library-link view-switch" href="./mobile/index.html" data-view-switch><span aria-hidden="true">↔</span><b>Phone view</b></a><button class="back-button" id="backButton" type="button" hidden>Back</button><div class="header-spacer"></div></header><button class="toc-scrim" id="tocScrim" type="button" aria-label="Close navigation" aria-hidden="true"></button><nav class="toc-panel" id="tocPanel" aria-label="Rulebook navigation"><h2 class="toc-heading">Contents</h2><div class="toc-shortcuts"><a class="toc-label" href="../../glossary/index.html">Mega Glossary</a><a class="toc-label" href="../../roster-guides/index.html" data-roster-guides hidden>← Roster Guides</a></div><ul class="toc-tree" id="tocTree">${toc}</ul></nav><main class="main"><div class="document"><section class="hero section surface faction-hero" id="start" data-track="start"><div class="hero-content"><div class="eyebrow">${esc(config.edition)} · ${units.length} indexed datasheets · ${detachments.length} detachments</div>${heroReview}<h1>${esc(config.title)}</h1><p>Faction rules, current structured datasheets, Related Rules filtering and source-aware updates.</p></div>${heroMark}</section><section class="section" id="detachments" data-track="detachments"><h2 class="section-title">Detachments</h2>${detachmentHtml}</section><section class="section" id="datasheets" data-track="datasheets"><h2 class="section-title">Datasheets</h2>${datasheetHtml}</section><section class="section" id="updates" data-track="updates"><h2 class="section-title">Updates & Sources</h2>${sourceGate}${updatesHtml}</section><footer class="footer">${esc(config.title)} · source-aware local reference</footer></div></main><div class="popup-layer" id="popupLayer" aria-live="polite"></div><script src="../../glossary/generated/glossary.en.js"></script><script src="../shared/navigation-targets.js"></script><script src="../shared/popup-rule-actions.js"></script><script src="../shared/datasheet-layout.js"></script><script src="../shared/popup-content.js"></script><script src="../shared/glossary-autolink.js"></script><script src="../shared/related-rules-matcher.js"></script><script src="./scripts/data.js"></script><script src="../death-guard/scripts/navigation-controller.js"></script><script src="../death-guard/scripts/full-entry-controller.js"></script><script src="../death-guard/scripts/popup-controller.js"></script><script src="../death-guard/scripts/journey-controller.js"></script><script src="../death-guard/scripts/ui-controllers.js"></script><script src="../shared/army-related-rules.js"></script><script src="../shared/army-book-app.js"></script><script src="./scripts/app.js"></script></body></html>\n`;
const normalizedHtml=html
  .replace('<link rel="stylesheet" href="./styles/tokens.css?v=1">','<link rel="stylesheet" href="../death-guard/styles/tokens.css?v=11"><link rel="stylesheet" href="./styles/tokens.css?v=2">')
  .replace('./styles/book.css?v=1',`./styles/book.css?v=${config.dedicatedMobile?(config.assetVersions?.book||4):(config.assetVersions?.book||2)}`)
  .replace('<header class="app-header">','<header class="app-header" id="appHeader">')
  .replace('<main class="main">','<main class="main" id="main">')
  .replace('<section class="section" id="detachments"',`<section class="section" id="army-rules" data-track="army-rules"><h2 class="section-title">Army Rules</h2>${armyRulesHtml}</section><section class="section" id="detachments"`)
  .replace('<script src="../../glossary/generated/glossary.en.js">','<script src="../../glossary-return.js?v=3"></script><script src="../../glossary/generated/glossary.en.js">')
  .replace('../shared/navigation-targets.js"','../shared/navigation-targets.js?v=1"')
  .replace('../shared/popup-rule-actions.js"','../shared/popup-rule-actions.js?v=1"')
  .replace('../shared/datasheet-layout.js"','../shared/datasheet-layout.js?v=6"')
  .replace('../shared/popup-content.js"','../shared/popup-content.js?v=3"')
  .replace('../shared/glossary-autolink.js"','../shared/glossary-autolink.js?v=8"')
  .replace('<script src="../shared/related-rules-matcher.js">','<script src="../shared/rule-facts.js?v=4"></script><script src="../shared/related-rules-matcher.js">')
  .replace('../shared/related-rules-matcher.js"','../shared/related-rules-matcher.js?v=6"')
  .replace('<script src="./scripts/data.js">',`${config.rosterSupport?'<script src="../shared/roster-parser.js?v=2"></script><script src="../shared/roster-entities.js?v=1"></script>':''}<script src="./scripts/data.js">`)
  .replace('</script><script src="../death-guard/scripts/navigation-controller.js">',`</script>${config.rosterSupport?'<script src="./scripts/roster-data.js?v=1"></script><script src="../shared/book-roster-enhancements.js?v=1"></script>':''}<script src="../death-guard/scripts/navigation-controller.js">`)
  .replace('../death-guard/scripts/navigation-controller.js"','../death-guard/scripts/navigation-controller.js?v=16"')
  .replace('../death-guard/scripts/full-entry-controller.js"','../death-guard/scripts/full-entry-controller.js?v=9"')
  .replace('../death-guard/scripts/popup-controller.js"','../death-guard/scripts/popup-controller.js?v=25"')
  .replace('../death-guard/scripts/journey-controller.js"','../death-guard/scripts/journey-controller.js?v=13"')
  .replace('../death-guard/scripts/ui-controllers.js"','../death-guard/scripts/ui-controllers.js?v=12"')
  .replace('../../glossary/generated/glossary.en.js','../../glossary/generated/glossary.en.js?v=tyranids-1')
  .replace('./scripts/data.js','./scripts/data.js?v=2')
  .replace('<script src="../shared/army-related-rules.js"></script>','<script src="../shared/modal-focus.js?v=1"></script><script src="../shared/army-related-rules.js"></script>')
  .replace('../shared/rule-facts.js?v=4',`../shared/rule-facts.js?v=${config.assetVersions?.ruleFacts||4}`)
  .replace('../shared/army-related-rules.js',`../shared/army-related-rules.js?v=${config.assetVersions?.relatedRules||10}`)
  .replace('../shared/army-book-app.js',`../shared/army-book-app.js?v=${config.assetVersions?.armyBook||9}`)
  .replace('./scripts/app.js',`./scripts/app.js?v=${config.assetVersions?.app||(config.dedicatedMobile?'3':'2')}`);
const coveredHtml=config.coverImage?normalizedHtml.replace('class="hero section surface faction-hero"','class="hero section surface faction-hero faction-hero-cover"'):normalizedHtml;
let finalHtml=config.dedicatedMobile?coveredHtml
  .replace('./styles/tokens.css?v=2','./styles/tokens.css?v=3')
  .replace('./styles/book.css?v=2',`./styles/book.css?v=${config.assetVersions?.book||4}`)
  .replace('./scripts/app.js?v=3',`./scripts/app.js?v=${config.assetVersions?.app||4}`):coveredHtml;
if(config.dedicatedMobile&&!config.sharedArmyBookApp)finalHtml=finalHtml.replace(/<script src="\.\.\/shared\/army-book-app\.js\?v=\d+"><\/script>/,'');
if(config.compatibleRulesMatrix){
  finalHtml=finalHtml
    .replace(/<script src="\.\.\/shared\/related-rules-matcher\.js\?v=6"><\/script>/,'');
  if(!config.sharedArmyBookApp){
    finalHtml=finalHtml.replace(/<script src="\.\.\/shared\/army-related-rules\.js(?:\?v=\d+)?"><\/script>/,'');
    finalHtml=finalHtml.replace(/<script src="\.\.\/shared\/army-book-app\.js\?v=\d+"><\/script>/,'');
  }
}
if(config.rosterSupport)finalHtml=finalHtml.replace('<script src="./scripts/app.js',`<script src="./scripts/roster-filter.js?v=${config.assetVersions?.rosterFilter||1}"></script><script src="./scripts/app.js`);
const dataJs=`window.DG_TERMS=${JSON.stringify(Object.fromEntries([...terms].map(([id,item])=>[id,{id,title:item.title,summary:item.summary,full:item.full,glossary:item.glossary,...(item.rule?{rule:item.rule}:{}),...(item.units.length?{units:item.units,datasheet:item.units[0],statline:item.units[0].replace(/^unit-/,'')+'-profile'}:{})}])),null,2)};\n`;
const rosterEnhancements=Object.fromEntries(detachments.flatMap(det=>(det.enhancements||[]).filter(item=>!enhancementOwnerRecord(item)||enhancementContract(item)).map(item=>{const contract=enhancementContract(item),ownerRecord=enhancementOwnerRecord(item),record={title:item.title,text:item.text,value:ownerRecord?ownerRecord.points:item.value,detachment:det.title,tags:contract?.tags||item.tags||[],owner:contract?.owner||null,assignment:contract?.assignment||null,...(config.id==='space-marines'&&item.profile?{profile:item.profile}:{})};return ['chaos-space-marines','space-marines','dark-angels','blood-angels'].includes(config.id)?[enhancementRuleId(item),{...record,ruleId:enhancementRuleId(item),detachmentId:det.id}]:[titleKey(item.title),record]})));
const rosterDataJs=`window.WH_BOOK_ROSTER_ENHANCEMENTS=${JSON.stringify(rosterEnhancements,null,2)};\n`;
const generatedMobileSwitchJs=config.generatedMobile?`const semanticViewSwitch=document.querySelector('[data-view-switch]');if(semanticViewSwitch){const updateSemanticViewDestination=()=>{const hashId=decodeURIComponent(location.hash.slice(1));const hasSemanticHash=hashId==='start'||hashId==='army-rules'||hashId==='updates'||hashId.startsWith('unit-')||hashId.startsWith('detachment-')||hashId.startsWith('update-');const active=hasSemanticHash?hashId:app.navigation.active||hashId||'start';const file=active.startsWith('unit-')?active.slice(5):active.startsWith('detachment-')?active.slice(11):active.startsWith('update-')||active==='updates'?'updates':active==='army-rules'?'army-rules':'index';const destination=new URL('./mobile/'+file+'.html',location.href);destination.search=location.search;destination.hash='';semanticViewSwitch.href=destination.href;};updateSemanticViewDestination();semanticViewSwitch.addEventListener('click',updateSemanticViewDestination);window.addEventListener('hashchange',updateSemanticViewDestination);}`:'';
const appJs=`try{const app=window.WHArmyBook.install(${JSON.stringify({bookId:config.id,readerPath:'./reader.html',...(config.dedicatedMobile||config.generatedMobile?{dedicatedMobile:true}:{})})});${generatedMobileSwitchJs}}catch(error){document.documentElement.dataset.bookError=String(error&&error.stack||error);console.error(error);}\n`;
const bookCss=`.app-brand::before{content:"${esc(bookMark)}"}.toc-heading::before{content:"FACTION REGISTER // ${esc(bookMark)}"}.faction-hero{overflow:hidden;background:radial-gradient(circle at 78% 28%,color-mix(in srgb,var(--faction-primary-bright,var(--green)) 22%,transparent),transparent 26rem),radial-gradient(ellipse at 64% 78%,color-mix(in srgb,var(--faction-secondary,var(--pink)) 15%,transparent),transparent 31rem),linear-gradient(115deg,var(--underhive),var(--panel-2))}.faction-hero::after{content:"${esc(bookMark)}"}.faction-hero .hero-mark{display:grid;place-items:center;min-width:15rem;aspect-ratio:1;border:1px solid var(--line);border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 18px,var(--soft-line) 19px 20px),radial-gradient(circle,var(--panel-2),transparent 68%);color:var(--green);font:800 clamp(1.1rem,2vw,1.8rem)/1 ui-monospace,monospace;letter-spacing:.16em;text-align:center}.faction-hero .hero-cover{display:block;aspect-ratio:4/5;border-radius:0;overflow:hidden;background:#090b0a}.hero-cover img{display:block;width:100%;height:100%;object-fit:cover}.source-warning{border-left:3px solid var(--bronze-bright)}.subheading{margin:2rem 0 1rem;color:var(--bronze-bright);text-transform:uppercase;letter-spacing:.12em}.unit-status{max-width:20rem;text-align:right}.unit-source-state{display:flex;flex-wrap:wrap;gap:6px 16px;padding:0 24px 18px;color:var(--muted);font:700 10px/1.5 var(--ds-data,ui-monospace,monospace);letter-spacing:.06em;text-transform:uppercase}.unit-source-state span+span{border-left:1px solid var(--line);padding-left:16px}.wargear-option{white-space:pre-line;overflow-wrap:anywhere}.wargear-verification{margin:.25rem 0 1rem;padding:.7rem .85rem;border-left:3px solid var(--bronze-bright);background:color-mix(in srgb,var(--bronze-bright) 7%,transparent);color:var(--muted)}.related-rules-layer{z-index:140}.related-rules-open .popup-layer{z-index:160}@media(max-width:800px){.faction-hero .hero-mark{display:none}.faction-hero .hero-cover{display:block;width:100%;min-width:0;aspect-ratio:16/9}.unit-status{max-width:none;text-align:left}.unit-source-state{padding-inline:20px}.unit-source-state span{width:100%}.unit-source-state span+span{border-left:0;padding-left:0}}\n`;
const coverCss=config.coverImage?`.faction-hero-cover{background:linear-gradient(90deg,rgba(12,15,12,.98) 0%,rgba(12,15,12,.91) 43%,rgba(12,15,12,.42) 70%,rgba(12,15,12,.28) 100%),linear-gradient(0deg,rgba(13,15,13,.92),transparent 38%),url("../${esc(config.coverImage)}") center 23% / cover no-repeat}\n`:'';
const forcedPhoneCss=`
html[data-view="mobile"]{--header:64px;--body-size:16.5px}
html[data-view="mobile"] .app-header{backdrop-filter:none}
html[data-view="mobile"] .nav-menu{display:inline-grid;place-items:center}
html[data-view="mobile"] .nav-collapse{display:none}
html[data-view="mobile"] .main,
html[data-view="mobile"] body.nav-collapsed .main{padding:calc(var(--header) + env(safe-area-inset-top) + 20px) 14px 82px}
html[data-view="mobile"] .app-brand{font-size:16px}
html[data-view="mobile"] .back-button{position:fixed;z-index:75;right:14px;bottom:calc(16px + env(safe-area-inset-bottom));box-shadow:0 14px 32px rgba(0,0,0,.38)}
html[data-view="mobile"] .toc-panel{inset:calc(var(--header) + env(safe-area-inset-top) + 10px) auto 10px 10px;width:min(calc(88vw - 10px),360px);transform:translateX(calc(-105% - 10px));box-shadow:24px 12px 52px rgba(0,0,0,.5);transition:none}
html[data-view="mobile"] .toc-toggle::after{transition:none}
html[data-view="mobile"] body.nav-drawer-open .toc-panel{transform:translateX(0)}
html[data-view="mobile"] .toc-scrim{position:fixed;z-index:55;inset:calc(var(--header) + env(safe-area-inset-top)) 0 0;background:rgba(0,0,0,.62)}
html[data-view="mobile"] body.nav-drawer-open .toc-scrim{display:block}
html[data-view="mobile"] .faction-hero .hero-mark{display:none}
html[data-view="mobile"] .unit-status{max-width:none;text-align:left}
html[data-view="mobile"] .unit-card>:is(.unit-head,.unit-header){grid-template-columns:1fr;gap:17px;padding:24px 20px 21px}
html[data-view="mobile"] .unit-card :is(.unit-name,.unit-header h3){font-size:clamp(38px,12vw,54px)}
html[data-view="mobile"] .unit-card :is(.points,.unit-status){justify-self:start;min-width:0;padding:10px 12px;font-size:17px}
html[data-view="mobile"] .unit-card>.local-nav{position:sticky;z-index:7;top:calc(var(--header) + 6px);display:flex;flex-wrap:nowrap;gap:6px;margin:14px -8px 4px;padding:7px 8px;overflow-x:auto;overscroll-behavior-inline:contain;background:color-mix(in srgb,var(--panel) 94%,transparent);border-block:1px solid var(--soft-line);box-shadow:0 8px 18px rgba(0,0,0,.24);scrollbar-width:none;-webkit-overflow-scrolling:touch}
html[data-view="mobile"] .unit-card>.local-nav::-webkit-scrollbar{display:none}
html[data-view="mobile"] .unit-card>.local-nav .local-tab{flex:0 0 auto;min-height:36px;padding:7px 10px;white-space:nowrap;font-size:12px}
html[data-view="mobile"] .unit-card>.unit-part{padding:24px 15px 27px}
html[data-view="mobile"] .unit-card>.unit-part>h4{font-size:22px}
html[data-view="mobile"] .unit-card .weapon-head{display:none}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head){grid-template-columns:repeat(6,minmax(0,1fr));border-top:0}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head)>div{display:grid;place-items:center;min-height:54px;padding:8px 2px;border-top:0;font-size:clamp(12px,3.7vw,14px)}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head)>div::before{content:attr(data-label);display:block;margin-bottom:3px;color:var(--muted);font:700 9px var(--ds-data);letter-spacing:.03em;text-transform:uppercase}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head)>div:first-child{grid-column:1/-1;display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-height:0;padding:11px 12px;border-bottom:1px solid var(--line)}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head)>div:first-child::before{display:none}
html[data-view="mobile"] .unit-card .weapon-row:not(.weapon-head)>div:nth-child(2){border-left:0}
html[data-view="mobile"] .unit-card.ds-layout .points.ds-cost{width:min(100%,520px);min-width:0}
html[data-view="mobile"] .unit-card.ds-layout .ds-main-grid{grid-template-columns:1fr}
html[data-view="mobile"] .unit-card.ds-layout .ds-arsenal{border-right:0;border-bottom:1px solid var(--line)}
html[data-view="mobile"] .detachment-part[id$="-stratagems"]>.detachment-content,
html[data-view="mobile"] .core-stratagem-grid{grid-template-columns:1fr}
`;
const heroCoverBase='.faction-hero .hero-cover{display:block;aspect-ratio:4/5;border-radius:0;overflow:hidden;background:#090b0a}.hero-cover img{display:block;width:100%;height:100%;object-fit:cover}';
const heroCoverWide='.faction-hero .hero-cover{display:block;width:100%;min-width:0;aspect-ratio:16/9;border-radius:0;overflow:hidden;background:#090b0a}.hero-cover img{display:block;width:100%;height:100%;object-fit:cover}';
const heroCoverMobile='.faction-hero .hero-cover{display:block;width:100%;min-width:0;aspect-ratio:16/9}';
let normalizedBookCss=(bookCss+coverCss+forcedPhoneCss).replace('.unit-status{','.unit-status{white-space:pre-line;');
normalizedBookCss=config.coverImage?normalizedBookCss.replace(heroCoverBase,heroCoverWide):normalizedBookCss.replace(heroCoverBase,'').replace(heroCoverMobile,'');
const generatedBookCss=config.dedicatedMobile?(config.coverImage?(bookCss+coverCss).replace(heroCoverBase,heroCoverWide):bookCss.replace(heroCoverBase,'').replace(heroCoverMobile,'')):normalizedBookCss;
const entryArtwork=config.entryCoverImage?'<picture class="entry-art"><source type="image/webp" srcset="./'+esc(config.entryCoverImage)+' 480w, ./'+esc(config.coverImage||config.entryCoverImage)+' 800w" sizes="240px"><img src="./'+esc(config.entryCoverImage)+'" width="480" height="600" alt="'+esc(config.title)+' cover"></picture>':'<div class="entry-mark">'+esc(bookMark)+'</div>';
const indexHtml='<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>'+esc(config.title)+' Rules</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="stylesheet" href="../death-guard/styles/tokens.css?v=11"><link rel="stylesheet" href="./styles/tokens.css?v='+(config.assetVersions?.tokens||(config.dedicatedMobile?'3':'2'))+'"><link rel="stylesheet" href="../death-guard/styles/entry.css?v=2">'+(config.entryCoverImage?'<style>.entry-art{display:block;width:min(240px,60vw);aspect-ratio:4/5;overflow:hidden;border:1px solid var(--bronze);background:var(--panel-2)}.entry-art img{display:block;width:100%;height:100%;object-fit:cover}</style>':'')+'<script src="../death-guard/scripts/view-router.js?v=2"><\/script></head><body><main class="entry-card">'+entryArtwork+'<p>'+esc(config.title)+' rules</p>'+entryReview+'<h1>Opening the reader&hellip;</h1><div class="entry-actions"><a href="./reader.html?view=full">Desktop / iPad view</a><a href="./mobile/index.html?view=mobile">Phone view</a>'+(config.reviewEntry?'<a href="../../index.html">Return to Library</a>':'')+'</div><noscript>Automatic selection needs JavaScript. Choose a reader above.</noscript></main></body></html>\n';
const mobileIndex='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(config.title)+' Phone View</title></head><body><script>const u=new URL("../reader.html",location.href);u.search=location.search;u.searchParams.set("view","mobile");u.hash=location.hash;location.replace(u.href)<\/script><a href="../reader.html?view=mobile">Open phone view</a></body></html>\n';
const outputs=new Map([
  ['reader.html',finalHtml],...(config.customIndex?[]:[['index.html',indexHtml]]),['scripts/data.js',dataJs],...(config.dedicatedMobile?[]:[['styles/book.css',generatedBookCss]]),...(config.rosterSupport?[['scripts/roster-data.js',rosterDataJs]]:[]),...(config.dedicatedMobile||config.customApp?[]:[['scripts/app.js',appJs]]),...(config.dedicatedMobile?(config.mobileRelatedRulesSource===false?[]:[['mobile/related-rules.source.inc',relatedInc+'\n']]):config.generatedMobile?(config.mobileRelatedRulesSource===true?[['mobile/related-rules.inc',relatedInc+'\n']]:[]):[['mobile/index.html',mobileIndex],['mobile/related-rules.inc',relatedInc+'\n']])
]);
const errors=[];
if(detachments.length!==config.expected.matchedDetachments)errors.push(`expected ${config.expected.matchedDetachments} detachments, got ${detachments.length}`);
if(pack.detachments.filter(item=>item.sourceLayer!=='codex-secondary-consensus').length!==config.expected.factionPackDetachments)errors.push('Faction Pack detachment count mismatch');
if((codex.legends||[]).length!==config.expected.legendsDatasheets)errors.push('Legends count mismatch');
if(new Set(units.map(unit=>unit.id)).size!==units.length)errors.push('duplicate unit IDs');
if([...outputs.values()].some(value=>/\uFFFD|вЂ|вњ|в†|В·/.test(value)))errors.push('mojibake in generated output');
if(errors.length)throw new Error(errors.join('\n'));
for(const [relative,content] of outputs){const file=path.join(root,relative);if(check){if(!fs.existsSync(file)||normalizedEol(fs.readFileSync(file,'utf8'))!==normalizedEol(content))throw new Error(`${relative} is stale`);}else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);}}
console.log(`${check?'Checked':'Built'} ${config.title}: ${units.length} datasheets, ${detachments.length} detachments, ${terms.size} local terms`);
