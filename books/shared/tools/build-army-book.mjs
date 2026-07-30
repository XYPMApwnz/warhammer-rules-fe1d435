import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const args=process.argv.slice(2),check=args.includes('--check'),configArg=args.find(arg=>!arg.startsWith('--'));
if(!configArg)throw new Error('Usage: node build-army-book.mjs <book.config.json> [--check]');
const configPath=path.resolve(configArg),root=path.dirname(configPath),repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const bookMark=config.mark||config.title.split(/\s+/).map(word=>word[0]).join('').slice(0,4).toUpperCase();
const pack=readJson(config.sources.factionPack),codex=readJson(config.sources.codexDatasheets);
const points=readJson(config.sources.points||'content/'+config.id+'-points.en.json');
const codexWargear=config.sources.codexWargear?readJson(config.sources.codexWargear):null;
const codexParity=config.sources.codexParity?readJson(config.sources.codexParity):null;
const manifest=readJson(config.sources.manifest);
const relatedRules=config.sources.relatedRules?readJson(config.sources.relatedRules):{stratagems:{}};
const esc=value=>String(value??'').replace(/\s+/g,' ').trim().replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const escLines=value=>String(value??'').replace(/\r\n?/g,'\n').split('\n').map(esc).join('\n');
const clean=value=>String(value??'').replaceAll('\u00a0',' ').replace(/\s+/g,' ').trim();
const slug=value=>clean(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const unique=(items,keyOf)=>{const seen=new Set();return items.filter(item=>{const key=keyOf(item);if(seen.has(key))return false;seen.add(key);return true;});};
const titleKey=value=>clean(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const unitInventory=layer=>[...(layer.datasheets||[]),...(layer.imperialArmour||[]),...(layer.legends||[])];
const dependencyCodices=(config.dependencies||[]).map(id=>{
  const dependencyRoot=path.join(repo,'books',id),dependencyConfig=JSON.parse(fs.readFileSync(path.join(dependencyRoot,'book.config.json'),'utf8'));
  const dependencyCodex=JSON.parse(fs.readFileSync(path.join(dependencyRoot,dependencyConfig.sources.codexDatasheets),'utf8'));
  return {id,codex:dependencyCodex};
});
const ownUnits=unitInventory(codex);
const pointsByTitle=new Map(points.units.map(item=>[titleKey(item.title),item]));
const wargearByTitle=new Map((codexWargear?.units||[]).map(item=>[titleKey(item.title),item]));
const mergedUnits=new Map();
for(const dependency of dependencyCodices)for(const unit of unitInventory(dependency.codex))mergedUnits.set(unit.id,{...unit,dependencyBook:dependency.id,sourceLayer:`${dependency.id}-${unit.sourceLayer||'source'}`});
for(const unit of ownUnits){
  const point=pointsByTitle.get(titleKey(unit.title)),exact=wargearByTitle.get(titleKey(unit.title));
  mergedUnits.set(unit.id,{...unit,...(point?{points:point.points,paidWargear:point.paidWargear,pointsSource:point.pointsSource}:{}),...(exact?{wargear:exact.wargear,compositionText:exact.composition,wargearSource:{label:codexWargear.source?.label||'Current 11e reference',url:exact.url}}:{})});
}
const officialIds=new Map(Object.values(pack.datasheets||{}).flat().map(item=>[titleKey(item.title),item]));
const units=[...mergedUnits.values()].map(unit=>{
  const official=officialIds.get(titleKey(unit.title));
  return official?{...unit,sourcePages:official.sourcePages,provenance:official.provenance,sourceLayer:unit.sourceLayer==='codex'?'faction-pack':unit.sourceLayer}:unit;
});
const unitById=new Map(units.map(unit=>[unit.id,unit])),unitByTitle=new Map(units.map(unit=>[titleKey(unit.title),unit]));

const codexDetachmentNames=unique(points.enhancements.map(item=>item.detachment),titleKey);
const packByTitle=new Map(pack.detachments.map(item=>[titleKey(item.title),item]));
const parityByTitle=new Map((codexParity?.detachments||[]).map(item=>[titleKey(item.title),item]));
const enhancementPointsByTitle=new Map(points.enhancements.map(item=>[titleKey(item.title),item]));
const detachmentMetaByTitle=new Map((points.detachments||[]).map(item=>[titleKey(item.title),item]));
const enrichEnhancement=item=>{const current=enhancementPointsByTitle.get(titleKey(item.title));return current?{...item,value:current.value,pointsSource:current.pointsSource}:item;};
const enrichDetachment=detachment=>({...detachment,...detachmentMetaByTitle.get(titleKey(detachment.title)),enhancements:(detachment.enhancements||[]).map(enrichEnhancement)});
const detachments=codexDetachmentNames.map(title=>enrichDetachment(packByTitle.get(titleKey(title))||parityByTitle.get(titleKey(title))||{
  id:slug(title),title,sourceLayer:'codex-transcription',rule:null,
  enhancements:points.enhancements.filter(item=>titleKey(item.detachment)===titleKey(title)),stratagems:[]
}));
for(const item of pack.detachments)if(!detachments.some(other=>titleKey(other.title)===titleKey(item.title)))detachments.push(enrichDetachment(item));

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
const enhancementEligibility=item=>relatedRules.enhancements?.[item.id]||relatedRules.enhancements?.[String(item.id||'').replace(/^enhancement-/,'')]||null;
const supportedSubjects=new Set(['unit','model','objective']);
const stratagemEligibility=item=>{
  const explicit=relatedRules.stratagems?.[item.id]||relatedRules.stratagems?.[String(item.id||'').replace(/^stratagem-/,'')];
  if(!explicit)throw new Error(`${config.id}: missing audited Stratagem eligibility for ${item.id} (${item.title})`);
  const roles=explicit.roles||explicit.targets||[];
  if(!roles.some(role=>role.side==='friendly'||role.side==='either'))throw new Error(`${config.id}: Stratagem ${item.id} has no friendly target role`);
  const inspect=selector=>{
    for(const unitId of selector?.unitIds||selector?.units||[])if(!unitById.has(unitId))throw new Error(`${config.id}: Stratagem ${item.id} references unknown unit ${unitId}`);
    for(const alternative of selector?.alternatives||[])inspect(alternative);
  };
  for(const role of roles){
    const subject=role.subject||'unit';
    if(!supportedSubjects.has(subject))throw new Error(`${config.id}: Stratagem ${item.id} uses unsupported eligibility subject ${subject}`);
    inspect(role.selector||role);
  }
  return explicit;
};

const candidates=new Map(units.map(unit=>[unit.id,[{unitId:unit.id,keywords:unit.keywords||[],attached:false,attachmentKnown:true,characterCount:(unit.keywords||[]).some(k=>titleKey(k)==='character')?1:0,warlord:null}]]));
for(const leader of units){
  for(const targetName of [...(leader.relations?.leader||[]),...(leader.relations?.support||[])]){
    const body=unitByTitle.get(titleKey(targetName));if(!body)continue;
    const combined=[...new Set([...(leader.keywords||[]),...(body.keywords||[])])];
    const item={unitId:body.id,keywords:combined,attached:true,attachmentKnown:true,characterCount:[leader,body].filter(unit=>(unit.keywords||[]).some(k=>titleKey(k)==='character')).length,warlord:null};
    candidates.get(leader.id).push(item);candidates.get(body.id).push(item);
  }
}

const terms=new Map();
function addTerm(title,summary,sectionId,kind='faction-term',unitId=''){
  const base=`${config.id}-${kind}-${slug(title)}`;let id=base,index=2;while(terms.has(id)&&terms.get(id).summary!==clean(summary))id=`${base}-${index++}`;
  if(!terms.has(id))terms.set(id,{id,title:clean(title),summary:clean(summary)||`${clean(title)} appears in the ${config.title} reference.`,full:clean(summary),rule:sectionId,glossary:`glossary-${id}`,units:unitId?[unitId]:[]});
  else if(unitId&&!terms.get(id).units.includes(unitId))terms.get(id).units.push(unitId);
  return id;
}
for(const det of pack.detachments){
  addTerm(det.rule.title,det.rule.text,`detachment-${det.id}`,'detachment-rule');
  for(const item of det.enhancements)addTerm(item.title,item.text,`detachment-${det.id}`,'enhancement');
  for(const item of det.stratagems)addTerm(item.title,[item.when,item.target,item.effect,item.restrictions].filter(Boolean).join(' '),`detachment-${det.id}`,'stratagem');
}
for(const unit of units){
  for(const ability of unit.abilities||[])ability.termId=addTerm(ability.title,ability.text,unit.id,'ability',unit.id);
  for(const weapon of unit.weapons||[])weapon.termId=addTerm(weapon.name,`${weapon.mode==='ranged'?'Ranged':'Melee'} · ${weapon.range} · A ${weapon.a} · ${weapon.mode==='ranged'?'BS':'WS'} ${weapon.skill} · S ${weapon.s} · AP ${weapon.ap} · D ${weapon.d}${weapon.abilities?` · ${weapon.abilities}`:''}`,unit.id,'weapon',unit.id);
}

const navLeaf=(id,label,depth)=>`<li data-nav-id="${esc(id)}" data-nav-depth="${depth}"><div class="toc-row no-toggle"><button class="toc-label" data-nav-target="${esc(id)}">${esc(label)}</button></div></li>`;
const navBranch=(id,label,depth,children)=>`<li data-nav-id="${esc(id)}" data-nav-depth="${depth}"><div class="toc-row"><button class="toc-label" data-nav-target="${esc(id)}">${esc(label)}</button><button class="toc-toggle" data-nav-toggle aria-label="Toggle ${esc(label)}" aria-expanded="false"></button></div><ul class="toc-branch" hidden>${children}</ul></li>`;
const tracked=(id,title,body,classes='content-group')=>`<section class="${classes}" id="${esc(id)}" data-track="${esc(id)}"><h3 class="category-title">${esc(title)}</h3>${body}</section>`;
const sourceLink=pages=>`<a class="source-link" href="./sources/${esc(path.basename(pack.meta.file))}#page=${pages[0]}">Official Faction Pack v${esc(pack.meta.version)} · p. ${pages.join('–')}</a>`;
const verificationBuild=manifest.gates?.publishAsComplete===false;
const unitSourceState=unit=>verificationBuild&&!config.dedicatedMobile?`<div class="unit-source-state"><span>Datasheet structure · current 11e catalogue</span><span>${unit.pointsSource?`${esc(unit.pointsSource.label)} · checked ${esc(unit.pointsSource.verifiedAt)}`:'Points · catalogue snapshot'}</span>${unit.wargearSource?'<span>Wargear & composition · current 11e reference</span>':''}${unit.sourcePages?`<span>Official Faction Pack overlay · p. ${unit.sourcePages.join('–')}</span>`:''}</div>`:'';
const armyRules=(config.armyRules||['Shadow in the Warp','Synapse']).map(title=>pack.updates.find(item=>titleKey(item.subject||item.title)===titleKey(title))).filter(Boolean).map(item=>({id:`army-rule-${slug(item.subject||item.title)}`,title:item.subject||item.title,text:item.change||item.summary||item.text,sourcePages:item.sourcePages}));
const categoryOrder=['Epic Heroes','Characters','Battleline','Dedicated Transports','Monsters','Infantry','Other','Warhammer Legends'];
const categories=categoryOrder.map(title=>({title,id:`datasheets-${slug(title)}`,units:units.filter(unit=>unit.category===title||title==='Warhammer Legends'&&unit.status==='Warhammer Legends')})).filter(group=>group.units.length);
const detachmentNav=detachments.map(det=>navBranch(`detachment-${det.id}`,det.title,2,
  navLeaf(`${det.id}-rule`,'Detachment Rule',3)
  +((det.enhancements||[]).length?navLeaf(`${det.id}-enhancements`,'Enhancement',3):'')
  +((det.stratagems||[]).length?navLeaf(`${det.id}-stratagems`,'Stratagems',3):'')
)).join('');
const toc=navLeaf('start','Start',1)
  +(armyRules.length?navBranch('army-rules','Army Rules',1,armyRules.map(item=>navLeaf(item.id,item.title,2)).join('')):'')
  +navBranch('detachments','Detachments',1,detachmentNav)
  +navBranch('datasheets','Datasheets',1,categories.map(group=>navBranch(group.id,group.title,2,group.units.map(unit=>navLeaf(unit.id,unit.title,3)).join(''))).join(''))
  +navBranch('updates','Updates',1,[...pack.updates.filter(item=>!armyRules.some(rule=>rule.title===item.subject)),...pack.faqs].map(item=>navLeaf(`update-${item.id}`,item.title||item.subject||item.question,2)).join(''));

const enhancementCard=(item,det,{related=false}={})=>{
  const explicit=enhancementEligibility(item);
  if(related&&!explicit)return'';
  return`<article class="enhancement surface" data-rule-id="${esc(item.id||`enhancement-${slug(item.title)}`)}"${explicit?` data-eligibility="${esc(JSON.stringify(explicit))}"`:''}><div class="eyebrow">Enhancement${item.value?` · ${item.value} pts`:''}</div><h4><button class="term-button" data-term="${addTerm(item.title,item.text,`detachment-${det.id}`,'enhancement')}">${esc(item.title)}</button></h4><p data-source-field="text">${esc(item.text)}</p></article>`;
};
const stratagemCard=(item,det)=>`<article class="stratagem surface" data-rule-id="${esc(item.id)}" data-eligibility="${esc(JSON.stringify(stratagemEligibility(item)))}"><div class="stratagem-head"><div><h3><button class="term-button" data-term="${addTerm(item.title,[item.when,item.target,item.effect,item.restrictions].filter(Boolean).join(' '),`detachment-${det.id}`,'stratagem')}">${esc(item.title)}</button></h3></div><div class="cp">${esc(item.cp)}CP</div></div><p class="field" data-source-field="when"><b>When</b><br>${esc(item.when)}</p><p class="field" data-source-field="target"><b>Target</b><br>${esc(item.target)}</p><p class="field" data-source-field="effect"><b>Effect</b><br>${esc(item.effect)}</p>${item.restrictions?`<p class="field" data-source-field="restrictions"><b>Restrictions</b><br>${esc(item.restrictions)}</p>`:''}</article>`;
const detachmentHtml=detachments.map(det=>{
  const official=Boolean(det.sourcePages),enhancements=(det.enhancements||[]).map(item=>enhancementCard(item,det)).join(''),stratagems=(det.stratagems||[]).map(item=>stratagemCard(item,det)).join('');
  const rule=det.rule?`<article class="rule-card surface"><h4><button class="term-button" data-term="${addTerm(det.rule.title,det.rule.text,`detachment-${det.id}`,'detachment-rule')}">${esc(det.rule.title)}</button></h4><p data-source-field="text">${esc(det.rule.text).replace(/\n/g,'<br>')}</p></article>`:`<article class="rule-card surface source-warning"><h4>Codex source required</h4><p>This Detachment is current, but its complete rule and Stratagem text is not present in Faction Pack v${esc(pack.meta.version)}. It is not reproduced here until the Codex layer is verified.</p></article>`;
  const ruleSection=`<section class="detachment-part" id="${esc(det.id)}-rule" data-track="${esc(det.id)}-rule"><h4 class="subheading">Detachment Rule</h4>${rule}</section>`;
  const enhancementSection=enhancements?`<section class="detachment-part" id="${esc(det.id)}-enhancements" data-track="${esc(det.id)}-enhancements"><h4 class="subheading">Enhancements</h4><div class="detachment-grid">${enhancements}</div></section>`:'';
  const stratagemSection=stratagems?`<section class="detachment-part" id="${esc(det.id)}-stratagems" data-track="${esc(det.id)}-stratagems"><h4 class="subheading">Stratagems</h4><div class="detachment-grid stratagem-grid">${stratagems}</div></section>`:'';
  return tracked(`detachment-${det.id}`,det.title,`<div class="detachment-meta"><span>${official?'OFFICIAL FACTION PACK':'CODEX INDEX'}</span>${det.forceDisposition?`<span>${esc(det.forceDisposition)}</span>`:''}${det.detachmentPoints?`<span>${esc(det.detachmentPoints)}DP</span>`:''}</div>${ruleSection}${enhancementSection}${stratagemSection}${official?`<p class="source">${sourceLink(det.sourcePages)}</p>`:''}`,'content-group detachment');
}).join('');
const statline=unit=>(unit.profiles||[]).map(profile=>`<div class="model-profile" data-profile="${esc(slug(profile.name))}">${unit.profiles.length>1?`<h5>${esc(profile.name)}</h5>`:''}<div class="statline">${Object.entries(profile.stats).filter(([,value])=>value).map(([name,value])=>`<div class="stat" data-source-field="stats.${esc(name)}"><b>${esc(name)}</b><span>${esc(value)}</span></div>`).join('')}</div></div>`).join('');
const weaponTables=unit=>['ranged','melee'].map(mode=>{const rows=(unit.weapons||[]).filter(item=>item.mode===mode);if(!rows.length)return'';const skill=mode==='ranged'?'BS':'WS';return`<div class="weapon-group"><h5>${mode==='ranged'?'Ranged':'Melee'} weapons</h5><div class="weapon-table" role="table"><div class="weapon-row weapon-head"><div>Weapon</div><div>Range</div><div>A</div><div>${skill}</div><div>S</div><div>AP</div><div>D</div></div>${rows.map(item=>`<div class="weapon-row" data-source-field="weapons.${esc(slug(item.name))}" data-mode="${mode}"><div data-source-field="name"><button class="weapon-button" data-term="${item.termId}">${esc(item.name)}</button>${item.abilities?`<small>${esc(item.abilities)}</small>`:''}</div><div data-label="Range" data-source-field="range">${esc(item.range)}</div><div data-label="A" data-source-field="a">${esc(item.a)}</div><div data-label="${skill}" data-source-field="skill">${esc(item.skill)}</div><div data-label="S" data-source-field="s">${esc(item.s)}</div><div data-label="AP" data-source-field="ap">${esc(item.ap)}</div><div data-label="D" data-source-field="d">${esc(item.d)}</div></div>`).join('')}</div></div>`;}).join('');
const unitCard=unit=>{
  const base=unit.id.replace(/^unit-/,''),pointsText=(unit.points||[]).map(item=>{
    const repeated=String(item.label||'').match(/^(\d+)\+ unit:\s*(\d+) models?$/i);
    const label=repeated?`${repeated[1]}+ copy · ${repeated[2]} model${repeated[2]==='1'?'':'s'}`:item.label;
    return `${label}: ${item.value} pts`;
  }).join('\n');
  const parts={profile:`${base}-profile`,abilities:`${base}-abilities`,composition:`${base}-composition`,keywords:`${base}-keywords`};
  const tabs=Object.entries(parts).map(([label,id])=>`<button class="local-tab" data-journey-target="${id}" data-journey-type="datasheet">${label[0].toUpperCase()+label.slice(1)}</button>`).join('');
  const compact=(config.compactSharedAbilities||[]).map(titleKey),isCompact=item=>compact.some(value=>titleKey(item.title)===value||titleKey(item.title).startsWith(`${value} `));
  const shared=unique((unit.abilities||[]).filter(isCompact),item=>titleKey(item.title)),specific=(unit.abilities||[]).filter(item=>!isCompact(item));
  const composition=unit.compositionText?`<p>${esc(unit.compositionText)}</p>`:`<ul>${(unit.composition||[]).map(item=>`<li>${item.min}${item.max!==item.min?`–${item.max}`:''} ${esc(item.name)}</li>`).join('')}</ul>`;
  const wargear=unit.wargear?.length?`<h5>Wargear Options</h5><ul>${unit.wargear.map(item=>`<li class="wargear-option">${escLines(item)}</li>`).join('')}</ul>`:'';
  return`<article class="unit-card surface${unit.status==='Warhammer Legends'?' legends-card':''}" id="${unit.id}" data-track="${unit.id}" data-unit-title="${esc(unit.title)}" data-keywords="${esc((unit.keywords||[]).join('|'))}" data-related-candidates="${esc(JSON.stringify(candidates.get(unit.id)||[]))}"><div class="unit-header"><div><div class="eyebrow">${esc(unit.status)} · ${esc(unit.sourceLayer)}</div><h3>${esc(unit.title)}</h3></div><div class="unit-status">${esc(pointsText||'POINTS PENDING')}</div></div>${unitSourceState(unit)}<div class="local-nav">${tabs}</div><section class="unit-part" id="${parts.profile}"><h4>Profile & Weapons</h4>${statline(unit)}${weaponTables(unit)}</section><section class="unit-part" id="${parts.abilities}"><h4>Abilities</h4>${shared.length?`<div class="keyword-list shared-abilities">${shared.map(item=>`<button class="term-button" data-term="${item.termId}" data-source-field="abilities.${esc(slug(item.title))}" data-source-value="${esc(item.text)}">${esc(item.title)}</button>`).join('')}</div>`:''}<div class="ability-list">${specific.map(item=>`<article class="ability" data-source-field="abilities.${esc(slug(item.title))}"><h5><button class="term-button" data-term="${item.termId}">${esc(item.title)}</button></h5>${item.text?`<p data-source-field="text">${esc(item.text)}</p>`:''}</article>`).join('')}</div></section><section class="unit-part" id="${parts.composition}"><h4>Composition & Wargear</h4>${composition}${wargear}${unit.paidWargear?.length?`<h5>Paid wargear</h5><ul>${unit.paidWargear.map(item=>`<li>${esc(item.name)} · +${item.value} pts</li>`).join('')}</ul>`:''}</section><section class="unit-part" id="${parts.keywords}"><h4>Keywords</h4><div class="keyword-list">${(unit.keywords||[]).map(item=>`<span data-source-field="keywords.${esc(slug(item))}">${esc(item)}</span>`).join('')}</div></section>${unit.sourcePages?`<p class="source">${sourceLink(unit.sourcePages)}</p>`:''}</article>`;
};
const datasheetHtml=categories.map(group=>tracked(group.id,group.title,group.units.map(unitCard).join(''))).join('');
const armyRulesHtml=armyRules.map(item=>tracked(item.id,item.title,`<article class="rule-card surface"><div class="eyebrow">Army rule</div><p data-source-field="text">${esc(item.text)}</p><p class="source">${sourceLink(item.sourcePages)}</p></article>`)).join('');
const updatesHtml=[...pack.updates.filter(item=>!armyRules.some(rule=>rule.title===item.subject)).map(item=>({id:item.id,title:item.title||item.subject,text:item.summary||item.text||item.change,pages:item.sourcePages,type:'Official update'})),...pack.faqs.map(item=>({id:item.id,title:item.question,text:item.answer,pages:item.sourcePages,type:'Official FAQ'}))].map(item=>tracked(`update-${item.id}`,item.title,`<article class="rule-card surface"><div class="eyebrow">${item.type}</div><p>${esc(item.text)}</p><p class="source">${sourceLink(item.pages)}</p></article>`)).join('');

const sharedCoreInc=(()=>{if(!config.includeCoreStratagems)return'';const value=fs.readFileSync(path.join(repo,'books','adeptus-mechanicus','mobile','related-rules.inc'),'utf8'),start=value.indexOf('<section class="related-detachment related-core"'),next=value.indexOf('<section class="related-detachment',start+1);if(start<0)throw new Error('Core Stratagems source is absent');return next>start?value.slice(start,next):value.slice(start);})();
const relatedInc=detachments.map(det=>`<section class="related-detachment" data-detachment="${esc(det.id)}" data-keyword-grants="${esc(JSON.stringify(relatedRules.keywordGrants?.[det.id]||[]))}"><h2>${esc(det.title)}</h2><div data-related-kind="stratagems">${(det.stratagems||[]).map(item=>stratagemCard(item,det)).join('')}</div><div data-related-kind="enhancements">${(det.enhancements||[]).map(item=>enhancementCard(item,det,{related:true})).join('')}</div></section>`).join('')+sharedCoreInc;
const sourceGate=manifest.gates?.publishAsComplete===false?`<article class="rule-card surface source-warning"><div class="eyebrow">Build status</div><h3>Reference in verification</h3><p>${esc(manifest.gates.reason)}</p></article>`:'';
const html=`<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>${esc(config.title)} Rules — WH40K Library</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="stylesheet" href="./styles/tokens.css?v=1"><link rel="stylesheet" href="../death-guard/styles/layout.css?v=9"><link rel="stylesheet" href="../death-guard/styles/navigation.css?v=11"><link rel="stylesheet" href="../death-guard/styles/content.css?v=35"><link rel="stylesheet" href="../death-guard/styles/popups.css?v=17"><link rel="stylesheet" href="../shared/datasheet-system.css?v=6"><link rel="stylesheet" href="./styles/book.css?v=1"></head><body><header class="app-header"><button class="header-button nav-menu" id="navMenu" type="button" aria-label="Open navigation" aria-controls="tocPanel" aria-expanded="false">☰</button><button class="header-button nav-collapse" id="navCollapse" type="button" aria-label="Collapse navigation" aria-controls="tocPanel" aria-expanded="true">◀</button><div class="app-brand"><strong>${esc(config.shortTitle)}</strong><small>${esc(config.edition)} · ${esc(config.title)} reference</small></div><a class="library-link" href="../../index.html"><span aria-hidden="true">←</span><b>Library</b></a><a class="library-link view-switch" href="./mobile/index.html" data-view-switch><span aria-hidden="true">↔</span><b>Phone view</b></a><button class="back-button" id="backButton" type="button" hidden>Back</button><div class="header-spacer"></div><button class="header-button" id="themeButton" type="button" aria-label="Use light theme">☼</button></header><button class="toc-scrim" id="tocScrim" type="button" aria-label="Close navigation" aria-hidden="true"></button><nav class="toc-panel" id="tocPanel" aria-label="Rulebook navigation"><h2 class="toc-heading">Contents</h2><div class="toc-shortcuts"><a class="toc-label" href="../../glossary/index.html">Mega Glossary</a><a class="toc-label" href="../../roster-guides/index.html" data-roster-guides hidden>← Roster Guides</a></div><ul class="toc-tree" id="tocTree">${toc}</ul></nav><main class="main"><div class="document"><section class="hero section surface faction-hero" id="start" data-track="start"><div class="hero-content"><div class="eyebrow">${esc(config.edition)} · ${units.length} indexed datasheets · ${detachments.length} detachments</div><h1>${esc(config.title)}</h1><p>Faction rules, current structured datasheets, Related Rules filtering and source-aware updates.</p></div><div class="hero-mark" aria-hidden="true"><span>${esc(config.factionKeyword)}</span></div></section><section class="section" id="detachments" data-track="detachments"><h2 class="section-title">Detachments</h2>${detachmentHtml}</section><section class="section" id="datasheets" data-track="datasheets"><h2 class="section-title">Datasheets</h2>${datasheetHtml}</section><section class="section" id="updates" data-track="updates"><h2 class="section-title">Updates & Sources</h2>${sourceGate}${updatesHtml}</section><footer class="footer">${esc(config.title)} · source-aware local reference</footer></div></main><div class="popup-layer" id="popupLayer" aria-live="polite"></div><script src="../../glossary/generated/glossary.en.js"></script><script src="../shared/navigation-targets.js"></script><script src="../shared/popup-rule-actions.js"></script><script src="../shared/datasheet-layout.js"></script><script src="../shared/popup-content.js"></script><script src="../shared/glossary-autolink.js"></script><script src="../shared/related-rules-matcher.js"></script><script src="./scripts/data.js"></script><script src="../death-guard/scripts/navigation-controller.js"></script><script src="../death-guard/scripts/full-entry-controller.js"></script><script src="../death-guard/scripts/popup-controller.js"></script><script src="../death-guard/scripts/journey-controller.js"></script><script src="../death-guard/scripts/ui-controllers.js"></script><script src="../shared/army-related-rules.js"></script><script src="../shared/army-book-app.js"></script><script src="./scripts/app.js"></script></body></html>\n`;
const normalizedHtml=html
  .replace('<link rel="stylesheet" href="./styles/tokens.css?v=1">','<link rel="stylesheet" href="../death-guard/styles/tokens.css?v=10"><link rel="stylesheet" href="./styles/tokens.css?v=1">')
  .replace('./styles/book.css?v=1','./styles/book.css?v=2')
  .replace('<header class="app-header">','<header class="app-header" id="appHeader">')
  .replace('<main class="main">','<main class="main" id="main">')
  .replace('<section class="section" id="detachments"',`<section class="section" id="army-rules" data-track="army-rules"><h2 class="section-title">Army Rules</h2>${armyRulesHtml}</section><section class="section" id="detachments"`)
  .replace('<script src="../../glossary/generated/glossary.en.js">','<script src="../../glossary-return.js?v=2"></script><script src="../../glossary/generated/glossary.en.js">')
  .replace('../shared/navigation-targets.js"','../shared/navigation-targets.js?v=1"')
  .replace('../shared/popup-rule-actions.js"','../shared/popup-rule-actions.js?v=1"')
  .replace('../shared/datasheet-layout.js"','../shared/datasheet-layout.js?v=2"')
  .replace('../shared/popup-content.js"','../shared/popup-content.js?v=3"')
  .replace('../shared/glossary-autolink.js"','../shared/glossary-autolink.js?v=8"')
  .replace('../shared/related-rules-matcher.js"','../shared/related-rules-matcher.js?v=2"')
  .replace('<script src="./scripts/data.js">',`${config.rosterSupport?'<script src="../shared/roster-parser.js?v=2"></script><script src="../shared/roster-entities.js?v=1"></script>':''}<script src="./scripts/data.js">`)
  .replace('</script><script src="../death-guard/scripts/navigation-controller.js">',`</script>${config.rosterSupport?'<script src="./scripts/roster-data.js?v=1"></script><script src="../shared/book-roster-enhancements.js?v=1"></script>':''}<script src="../death-guard/scripts/navigation-controller.js">`)
  .replace('../death-guard/scripts/navigation-controller.js"','../death-guard/scripts/navigation-controller.js?v=15"')
  .replace('../death-guard/scripts/full-entry-controller.js"','../death-guard/scripts/full-entry-controller.js?v=8"')
  .replace('../death-guard/scripts/popup-controller.js"','../death-guard/scripts/popup-controller.js?v=25"')
  .replace('../death-guard/scripts/journey-controller.js"','../death-guard/scripts/journey-controller.js?v=12"')
  .replace('../death-guard/scripts/ui-controllers.js"','../death-guard/scripts/ui-controllers.js?v=11"')
  .replace('../../glossary/generated/glossary.en.js','../../glossary/generated/glossary.en.js?v=tyranids-1')
  .replace('./scripts/data.js','./scripts/data.js?v=2')
  .replace('../shared/army-related-rules.js','../shared/army-related-rules.js?v=5')
  .replace('../shared/army-book-app.js',`../shared/army-book-app.js?v=${config.dedicatedMobile?'7':'6'}`)
  .replace('./scripts/app.js',`./scripts/app.js?v=${config.dedicatedMobile?'3':'2'}`);
const finalHtml=config.dedicatedMobile?normalizedHtml
  .replace('./styles/tokens.css?v=1','./styles/tokens.css?v=2')
  .replace('./styles/book.css?v=2','./styles/book.css?v=4')
  .replace('./scripts/app.js?v=3',`./scripts/app.js?v=${config.assetVersions?.app||4}`)
  .replace(/<script src="\.\.\/shared\/army-book-app\.js\?v=7"><\/script>/,''):normalizedHtml;
const dataJs=`window.DG_TERMS=${JSON.stringify(Object.fromEntries([...terms].map(([id,item])=>[id,{id,title:item.title,summary:item.summary,full:item.full,glossary:item.glossary,...(item.rule?{rule:item.rule}:{}),...(item.units.length?{units:item.units,datasheet:item.units[0],statline:item.units[0].replace(/^unit-/,'')+'-profile'}:{})}])),null,2)};\n`;
const rosterEnhancements=Object.fromEntries(detachments.flatMap(det=>(det.enhancements||[]).map(item=>[titleKey(item.title),{title:item.title,text:item.text,value:item.value,detachment:det.title}])));
const rosterDataJs=`window.WH_BOOK_ROSTER_ENHANCEMENTS=${JSON.stringify(rosterEnhancements,null,2)};\n`;
const appJs=`try{window.WHArmyBook.install(${JSON.stringify({bookId:config.id,readerPath:'./reader.html',...(config.dedicatedMobile?{dedicatedMobile:true}:{})})});}catch(error){document.documentElement.dataset.bookError=String(error&&error.stack||error);console.error(error);}\n`;
const bookCss=`.app-brand::before{content:"${esc(bookMark)}"}.toc-heading::before{content:"FACTION REGISTER // ${esc(bookMark)}"}.faction-hero{overflow:hidden;background:radial-gradient(circle at 78% 28%,color-mix(in srgb,var(--faction-primary-bright,var(--green)) 22%,transparent),transparent 26rem),radial-gradient(ellipse at 64% 78%,color-mix(in srgb,var(--faction-secondary,var(--pink)) 15%,transparent),transparent 31rem),linear-gradient(115deg,var(--underhive),var(--panel-2))}.faction-hero::after{content:"${esc(bookMark)}"}.faction-hero .hero-mark{display:grid;place-items:center;min-width:15rem;aspect-ratio:1;border:1px solid var(--line);border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 18px,var(--soft-line) 19px 20px),radial-gradient(circle,var(--panel-2),transparent 68%);color:var(--green);font:800 clamp(1.1rem,2vw,1.8rem)/1 ui-monospace,monospace;letter-spacing:.16em;text-align:center}.source-warning{border-left:3px solid var(--bronze-bright)}.subheading{margin:2rem 0 1rem;color:var(--bronze-bright);text-transform:uppercase;letter-spacing:.12em}.unit-status{max-width:20rem;text-align:right}.unit-source-state{display:flex;flex-wrap:wrap;gap:6px 16px;padding:0 24px 18px;color:var(--muted);font:700 10px/1.5 var(--ds-data,ui-monospace,monospace);letter-spacing:.06em;text-transform:uppercase}.unit-source-state span+span{border-left:1px solid var(--line);padding-left:16px}.wargear-option{white-space:pre-line;overflow-wrap:anywhere}.wargear-verification{margin:.25rem 0 1rem;padding:.7rem .85rem;border-left:3px solid var(--bronze-bright);background:color-mix(in srgb,var(--bronze-bright) 7%,transparent);color:var(--muted)}.related-rules-layer{z-index:140}.related-rules-open .popup-layer{z-index:160}@media(max-width:800px){.faction-hero .hero-mark{display:none}.unit-status{max-width:none;text-align:left}.unit-source-state{padding-inline:20px}.unit-source-state span{width:100%}.unit-source-state span+span{border-left:0;padding-left:0}}\n`;
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
const normalizedBookCss=(bookCss+forcedPhoneCss).replace('.unit-status{','.unit-status{white-space:pre-line;');
const indexHtml='<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>'+esc(config.title)+' Rules</title><link rel="manifest" href="../../manifest.webmanifest"><link rel="stylesheet" href="../death-guard/styles/tokens.css?v=10"><link rel="stylesheet" href="./styles/tokens.css?v='+(config.dedicatedMobile?'2':'1')+'"><link rel="stylesheet" href="../death-guard/styles/entry.css?v=2"><script src="../death-guard/scripts/view-router.js?v=2"><\/script></head><body><main class="entry-card"><div class="entry-mark">'+esc(bookMark)+'</div><p>'+esc(config.title)+' rules</p><h1>Opening the reader&hellip;</h1><div class="entry-actions"><a href="./reader.html?view=full">Desktop / iPad view</a><a href="./mobile/index.html?view=mobile">Phone view</a></div><noscript>Automatic selection needs JavaScript. Choose a reader above.</noscript></main></body></html>\n';
const mobileIndex='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(config.title)+' Phone View</title></head><body><script>const u=new URL("../reader.html",location.href);u.search=location.search;u.searchParams.set("view","mobile");u.hash=location.hash;location.replace(u.href)<\/script><a href="../reader.html?view=mobile">Open phone view</a></body></html>\n';
const outputs=new Map([
  ['reader.html',finalHtml],['index.html',indexHtml],['scripts/data.js',dataJs],...(config.rosterSupport?[['scripts/roster-data.js',rosterDataJs]]:[]),...(config.dedicatedMobile?[]:[['scripts/app.js',appJs],['styles/book.css',normalizedBookCss]]),...(config.dedicatedMobile?[['mobile/related-rules.source.inc',relatedInc+'\n']]:[['mobile/index.html',mobileIndex],['mobile/related-rules.inc',relatedInc+'\n']])
]);
const errors=[];
if(detachments.length!==config.expected.matchedDetachments)errors.push(`expected ${config.expected.matchedDetachments} detachments, got ${detachments.length}`);
if(pack.detachments.length!==config.expected.factionPackDetachments)errors.push('Faction Pack detachment count mismatch');
if(ownUnits.filter(unit=>unit.status==='Warhammer Legends').length!==config.expected.legendsDatasheets)errors.push('Legends count mismatch');
if(new Set(units.map(unit=>unit.id)).size!==units.length)errors.push('duplicate unit IDs');
if([...outputs.values()].some(value=>/\uFFFD|вЂ|вњ|в†|В·/.test(value)))errors.push('mojibake in generated output');
if(errors.length)throw new Error(errors.join('\n'));
for(const [relative,content] of outputs){const file=path.join(root,relative);if(check){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==content)throw new Error(`${relative} is stale`);}else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);}}
console.log(`${check?'Checked':'Built'} ${config.title}: ${units.length} datasheets, ${detachments.length} detachments, ${terms.size} local terms`);
