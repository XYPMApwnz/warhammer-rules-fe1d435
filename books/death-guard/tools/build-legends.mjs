import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {buildRelationGraphs} from '../../shared/tools/build-relation-graph.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..','..');
const bookRoot=path.join(root,'books','death-guard');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const writeJson=(file,value)=>fs.writeFileSync(file,`${JSON.stringify(value,null,2)}\n`);
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const legends=readJson(path.join(bookRoot,'content','death-guard-legends.en.json'));
const coreStratagems=readJson(path.join(root,'books','core-rules','content','core-rules.digital-11e.json')).records.filter(record=>/^15\.(?:0[2-8]|1[0-2])$/.test(record.code)&&record.code!=='15.09');
const coreTermIdByCode=Object.freeze({'15.02':'core-rule-15-02-command-re-roll','15.03':'core-rule-15-03-epic-challenge','15.04':'core-rule-15-04-insane-bravery','15.05':'core-rule-15-05-explosives','15.06':'core-rule-15-06-crushing-impact','15.07':'core-rule-15-07-rapid-ingress','15.08':'core-stratagem-fire-overwatch','15.10':'core-rule-15-10-smokescreen','15.11':'core-rule-15-11-heroic-intervention','15.12':'core-rule-15-12-counteroffensive'});
const bookFile=path.join(bookRoot,'content','death-guard-rules.en.json');
const readerFile=path.join(bookRoot,'reader.html');
const runtimeFile=path.join(bookRoot,'scripts','data.js');
const legendUnitIds=new Set(legends.units.map(unit=>unit.id));
const runtimeSandbox={window:{}};
vm.runInNewContext(fs.readFileSync(runtimeFile,'utf8'),runtimeSandbox,{filename:runtimeFile});
const existingRuntime=runtimeSandbox.window.DG_TERMS;

function abilityTagId(value){
  const normalized=value.replace(/\s+\d+\+?$/,'').trim().toUpperCase();
  return ({
    'ANTI-INFANTRY':'core-anti','ANTI-VEHICLE':'core-anti','BLAST':'core-blast',
    'DEVASTATING WOUNDS':'core-devastating-wounds','HAZARDOUS':'core-hazardous',
    'IGNORES COVER':'core-ignores-cover','LETHAL HITS':'core-lethal-hits','PISTOL':'core-pistol',
    'PSYCHIC':'core-psychic','RAPID FIRE':'core-rapid-fire','SUSTAINED HITS':'core-sustained-hits',
    'TORRENT':'core-torrent','TWIN-LINKED':'core-twin-linked'
  })[normalized]||'';
}

function keywordId(value){return `keyword-${slug(value)}`;}
function unitTermId(unit){return `term-${unit.id.slice(5)}`;}
function pointsText(points){return points.map(point=>`${point.label}: ${point.value} pts`).join(' · ');}
function weaponObject(weapon){return {
  Range:weapon.range,A:weapon.a,[weapon.mode==='ranged'?'BS':'WS']:weapon.skill,
  S:weapon.s,AP:weapon.ap,D:weapon.d,Abilities:weapon.abilities.join(', ')||'-'
};}

function buildGlossary(){
  const terms=[];
  for(const unit of legends.units){
    terms.push({
      id:unitTermId(unit),title:unit.title,group:'Datasheets',kind:'unit',showGlossary:false,
      short:'Warhammer Legends datasheet.',full:`Complete Warhammer Legends datasheet: ${unit.title}.`,
      sectionId:unit.id,statline:unit.statline,points:unit.points,legends:true
    });
    for(const weapon of unit.weapons)terms.push({
      id:weapon.id,title:weapon.name,group:'Wargear',kind:'weapon',showGlossary:false,
      short:'Weapon profile.',full:'Weapon profile.',unitIds:[unit.id],weapon:weaponObject(weapon),legends:true
    });
    for(const ability of [...unit.abilities,...(unit.wargearAbilities||[])]){
      if(!ability.id)continue;
      const existing=terms.find(term=>term.id===ability.id);
      if(existing){existing.unitIds.push(unit.id);continue;}
      terms.push({
        id:ability.id,title:ability.title,group:'Datasheet Abilities',kind:'ability',showGlossary:false,
        short:ability.text,full:ability.text,sectionId:`${unit.id.slice(5)}-${slug(ability.title)}`,
        unitIds:[unit.id],legends:true
      });
    }
  }
  return terms;
}

function sectionUnit(unit){
  const abilities=[...unit.abilities,...(unit.wargearAbilities||[])];
  const subsections=[{
    id:`${unit.id.slice(5)}-abilities`,title:'Abilities',number:'',blocks:abilities.map(ability=>({
      type:'ability',id:`${unit.id.slice(5)}-ability-${slug(ability.title)}`,
      termId:ability.id||null,title:ability.title,text:ability.text
    }))
  }];
  if(unit.designerNote)subsections[0].blocks.push({type:'p',text:`Designer's Note: ${unit.designerNote}`});
  if(unit.wargearOptions?.length)subsections.push({id:`${unit.id.slice(5)}-wargear-options`,title:'Wargear Options',number:'',blocks:unit.wargearOptions.map(text=>({type:'p',text}))});
  subsections.push({id:`${unit.id.slice(5)}-composition`,title:'Unit Composition',number:'',blocks:[{type:'p',text:unit.composition}]});
  if(unit.leader)subsections.push({id:`${unit.id.slice(5)}-leader`,title:'Leader',number:'',blocks:[{type:'p',text:unit.leader}]});
  if(unit.transport)subsections.push({id:`${unit.id.slice(5)}-transport`,title:'Transport',number:'',blocks:[{type:'p',text:unit.transport}]});
  subsections.push({id:`${unit.id.slice(5)}-keywords`,title:'Keywords',number:'',blocks:[
    {type:'p',text:`Keywords: ${unit.keywords.join(', ')}. Faction Keywords: DEATH GUARD.`},
    {type:'p',text:`Source: ${legends.source}.`}
  ]});
  return {
    id:unit.id,title:unit.title,kind:'unit',points:unit.points,number:unit.number,legends:true,
    blocks:[
      {type:'points',values:unit.points,wargear:[]},
      {type:'statline',values:unit.statline},
      ...unit.weapons.map(weapon=>({type:'weapon',id:`${unit.id.slice(5)}-${weapon.id}`,termId:weapon.id,name:weapon.name,
        range:weapon.range,a:weapon.a,skill:weapon.skill,s:weapon.s,ap:weapon.ap,d:weapon.d,
        abilities:weapon.abilities.join(', ')||'-',mode:weapon.mode}))
    ],subsections
  };
}

const book=readJson(bookFile);
const legendGlossary=buildGlossary();
book.sections=book.sections.filter(section=>section.id!==legends.group.id&&!section.legends&&!legendUnitIds.has(section.id));
const pactIndex=book.sections.findIndex(section=>section.id==='pact-of-decay-datasheets');
if(pactIndex<0)throw new Error('Missing Pact of Decay group');
if(legends.units.length)book.sections.splice(pactIndex,0,{...legends.group,kind:'unit-group',blocks:[{type:'p',text:legends.group.description}],subsections:[]},...legends.units.map(sectionUnit));
const dependencyIds=['unit-beasts-of-nurgle','unit-great-unclean-one','unit-nurglings','unit-plague-drones','unit-plaguebearers','unit-rotigus'];
const pactUnits=book.sections.filter(section=>section.id==='pact-of-decay-datasheets'||dependencyIds.includes(section.id));
pactUnits.forEach((section,index)=>{section.number=index?`4.10.${index}`:'4.10';});
book.glossary=book.glossary.filter(term=>!term.legends);
const existingGlossaryIds=new Set(book.glossary.map(term=>term.id));
book.glossary.push(...legendGlossary.filter(term=>!existingGlossaryIds.has(term.id)));
const plainKeywordNames=new Set(['CHAOS LORD','CULTISTS','POSSESSED','SORCERER']);
for(const keyword of new Set(legends.units.flatMap(unit=>unit.keywords).filter(value=>!plainKeywordNames.has(value)))){
  const id=keywordId(keyword);
  if(book.glossary.some(term=>term.id===id))continue;
  const summary=existingRuntime[id]?.summary||`${keyword} keyword.`;
  book.glossary.push({id,title:keyword,group:'Keywords',kind:'keyword',showGlossary:false,short:summary,full:summary});
}
book.audit.datasheets=book.sections.filter(section=>section.kind==='unit').length;
book.audit.glossary=book.glossary.length;
writeJson(bookFile,book);

function termButton(id,label,className='term-button'){
  return `<button class="${className}" data-term="${id}">${escapeHtml(label)}</button>`;
}
function coreAbilityText(text){
  return escapeHtml(text)
    .replace('Deep Strike',termButton('core-deep-strike','Deep Strike'))
    .replace('Leader',termButton('core-leader','Leader'))
    .replace("Nurgle's Gift",termButton('nurgles-gift',"Nurgle's Gift"));
}
function renderUpdateSection(){
  const section=book.sections.find(item=>item.id==='rules-updates');
  return `<section class="content-group" id="rules-updates" data-track="rules-updates"><h3 class="category-title">${escapeHtml(section.title)}</h3><article class="rule-card surface">${section.blocks.map(block=>`<div class="content-block"><p${block.text.startsWith('FAQ:')?' id="faq-spore-laced-shock-waves" data-source-field="text"':''}>${escapeHtml(block.text)}</p></div>`).join('')}</article></section>`;
}
function renderPoints(points){return `<div class="points-panel surface"><div class="eyebrow">Points</div>${points.map(point=>`<div class="points-row"><span>${escapeHtml(point.label)}</span><strong>${point.value} pts</strong></div>`).join('')}</div>`;}
function renderStatline(values){return `<div class="statline">${Object.entries(values).map(([label,value])=>`<div class="stat"><b>${label}</b><span>${escapeHtml(value)}</span></div>`).join('')}</div>`;}
function renderWeaponGroup(unit,mode){
  const weapons=unit.weapons.filter(weapon=>weapon.mode===mode);if(!weapons.length)return '';
  const skill=mode==='ranged'?'BS':'WS';
  return `<div class="weapon-group"><h5>${mode==='ranged'?'Ranged':'Melee'} weapons</h5><div class="weapon-table" role="table" aria-label="${unit.id} ${mode} weapons"><div class="weapon-row weapon-head"><div>Weapon</div><div>Range</div><div>A</div><div>${skill}</div><div>S</div><div>AP</div><div>D</div></div>${weapons.map(weapon=>`<div class="weapon-row" id="${unit.id.slice(5)}-${weapon.id}"><div><div>${termButton(weapon.id,weapon.name,'weapon-button')}</div><div class="weapon-tags">${weapon.abilities.length?weapon.abilities.map(tag=>{const id=abilityTagId(tag);return id?termButton(id,tag,'tag'):`<span class="tag">${escapeHtml(tag)}</span>`;}).join(''):'<span class="tag">-</span>'}</div></div><div data-label="Range">${escapeHtml(weapon.range)}</div><div data-label="A">${escapeHtml(weapon.a)}</div><div data-label="${skill}">${escapeHtml(weapon.skill)}</div><div data-label="S">${escapeHtml(weapon.s)}</div><div data-label="AP">${escapeHtml(weapon.ap)}</div><div data-label="D">${escapeHtml(weapon.d)}</div></div>`).join('')}</div></div>`;
}
function renderTextSection(unit,title,text){
  if(!text)return '';
  const id=`${unit.id.slice(5)}-${slug(title)}`;
  return `<section class="unit-part" id="${id}"><h4>${escapeHtml(title)}</h4><div class="ability-list"><div class="content-block"><p>${escapeHtml(text)}</p></div></div></section>`;
}
function renderCoreStratagem(record){
  const lines=record.text.split('\n'),cp=lines.shift(),type=lines.shift();
  while(lines.length&&!/^(?:WHEN|TARGET|EFFECT|RESTRICTIONS):/.test(lines[0]))lines.shift();
  const fields=[];
  for(const line of lines){
    const label=/^(WHEN|TARGET|EFFECT|RESTRICTIONS):\s*(.*)$/.exec(line);
    if(label)fields.push({label:label[1],lines:[label[2]]});else fields.at(-1)?.lines.push(line);
  }
  return `<article class="stratagem surface" id="core-stratagem-${slug(record.title)}"><div class="stratagem-head"><div><h3>${termButton(coreTermIdByCode[record.code],record.title)}</h3><span class="stratagem-type">${escapeHtml(type)}</span></div><div class="cp">${escapeHtml(cp)}</div></div>${fields.map(field=>`<p class="field" data-source-field="${field.label.toLowerCase()}"><b>${field.label}</b><br>${field.lines.map(escapeHtml).join('<br>')}</p>`).join('')}</article>`;
}
function renderCoreStratagemSection(){
  return `<section class="content-group" id="core-stratagems" data-track="core-stratagems"><h3 class="category-title">Core Stratagems</h3><p class="lead">Universal Stratagems available to every army. Datasheet tools only show the cards the selected unit can legally target.</p><div class="detachment-content stratagem-grid core-stratagem-grid">${coreStratagems.map(renderCoreStratagem).join('\n')}</div></section>`;
}
const plainKeywords=new Set(['CHAOS LORD','CULTISTS','POSSESSED','SORCERER']);
function renderUnit(unit){
  const parts=['Profile & Weapons','Abilities'];
  if(unit.wargearOptions?.length)parts.push('Wargear Options');
  parts.push('Unit Composition');if(unit.leader)parts.push('Leader');if(unit.transport)parts.push('Transport');parts.push('Keywords');
  const nav=parts.map((title,index)=>`<button class="local-tab" data-journey-target="${index===0?unit.id+'-profile':unit.id.slice(5)+'-'+slug(title)}" data-journey-type="datasheet">${escapeHtml(title)}</button>`).join('');
  const abilities=[...unit.abilities,...(unit.wargearAbilities||[])];
  return `<article class="unit-card surface legends-card" id="${unit.id}" data-track="${unit.id}"><div class="unit-head"><div><div class="eyebrow">Death Guard · Warhammer Legends</div><h3 class="unit-name">${escapeHtml(unit.title)}</h3></div><div class="points"><strong>${escapeHtml(pointsText(unit.points))}</strong></div></div><div class="local-nav">${nav}</div><section class="unit-part" id="${unit.id}-profile"><h4>Profile &amp; Weapons</h4>${renderPoints(unit.points)}${renderStatline(unit.statline)}${renderWeaponGroup(unit,'ranged')}${renderWeaponGroup(unit,'melee')}</section><section class="unit-part" id="${unit.id.slice(5)}-abilities"><h4>Abilities</h4><div class="ability-list">${abilities.map(ability=>`<article class="ability" id="${unit.id.slice(5)}-ability-${slug(ability.title)}"><h5>${ability.id?termButton(ability.id,ability.title):escapeHtml(ability.title)}</h5><p>${coreAbilityText(ability.text)}</p></article>`).join('')}${unit.designerNote?`<div class="content-block"><p><strong>Designer's Note:</strong> ${escapeHtml(unit.designerNote)}</p></div>`:''}</div></section>${unit.wargearOptions?.length?`<section class="unit-part" id="${unit.id.slice(5)}-wargear-options"><h4>Wargear Options</h4><div class="ability-list">${unit.wargearOptions.map(text=>`<div class="content-block"><p>${escapeHtml(text)}</p></div>`).join('')}</div></section>`:''}${renderTextSection(unit,'Unit Composition',unit.composition)}${renderTextSection(unit,'Leader',unit.leader)}${renderTextSection(unit,'Transport',unit.transport)}<section class="unit-part" id="${unit.id.slice(5)}-keywords"><h4>Keywords</h4><div class="ability-list"><div class="content-block"><p>Keywords: ${unit.keywords.map(keyword=>plainKeywords.has(keyword)?escapeHtml(keyword):termButton(keywordId(keyword),keyword)).join(', ')}. Faction Keywords: ${termButton('keyword-death-guard','DEATH GUARD')}.</p></div><div class="source">Source: ${escapeHtml(legends.source)}.</div></div></section></article>`;
}
function elementRange(html,tag,id){
  const opener=new RegExp(`<${tag}\\b[^>]*\\b(?:id|data-nav-id)="${id}"[^>]*>`,'i').exec(html);if(!opener)return null;
  const tags=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tags.lastIndex=opener.index;let depth=0;
  for(let match;(match=tags.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return [opener.index,tags.lastIndex];}
  throw new Error(`Unclosed ${tag} ${id}`);
}
function replaceOrInsert(html,tag,id,beforeId,replacement){
  const range=elementRange(html,tag,id);if(range)return html.slice(0,range[0])+replacement+html.slice(range[1]);
  const before=elementRange(html,tag,beforeId);if(!before)throw new Error(`Missing insertion target ${beforeId}`);
  return html.slice(0,before[0])+replacement+'\n'+html.slice(before[0]);
}
const nav=legends.units.length?`<li data-nav-id="${legends.group.id}" data-nav-depth="2"><div class="toc-row"><button class="toc-label" data-nav-target="${legends.group.id}">${legends.group.title}</button><button class="toc-toggle" data-nav-toggle aria-label="Toggle ${legends.group.title}" aria-expanded="false"></button></div><ul class="toc-branch" hidden>${legends.units.map(unit=>`<li data-nav-id="${unit.id}" data-nav-depth="3"><div class="toc-row no-toggle"><button class="toc-label" data-nav-target="${unit.id}">${escapeHtml(unit.title)}</button></div></li>`).join('')}</ul></li>`:'';
const content=legends.units.length?`<section class="content-group" id="${legends.group.id}" data-track="${legends.group.id}"><h3 class="category-title">${legends.group.title}</h3><div class="content-block"><p>${escapeHtml(legends.group.description)}</p></div>${legends.units.map(renderUnit).join('\n')}</section>`:'';
const unitSections=book.sections.filter(section=>section.kind==='unit');
const keywordsOf=unit=>{
  const text=(unit.subsections||[]).find(section=>section.title==='Keywords')?.blocks?.map(block=>block.text||'').join(' ')||'';
  const intrinsic=(text.match(/Keywords:\s*(.*?)\.\s*Faction Keywords:/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
  const faction=(text.match(/Faction Keywords:\s*([^.]*)/i)?.[1]||'').split(/[,;]/).map(value=>value.trim()).filter(Boolean);
  return [...new Set([...intrinsic,...faction])];
};
const unitKeywords=new Map(unitSections.map(unit=>[unit.id,keywordsOf(unit)]));
const attachments=[];
const doubleLeaders=new Set();
for(const leader of unitSections){
  const text=(leader.subsections||[]).find(section=>section.title==='Leader')?.blocks?.map(block=>block.text||'').join(' ')||'';
  if(!text)continue;
  if(/even if one other Leader/i.test(text))doubleLeaders.add(leader.id);
  for(const bodyguard of unitSections)if(bodyguard!==leader&&text.toLowerCase().includes(bodyguard.title.toLowerCase()))attachments.push([leader.id,bodyguard.id]);
}
const relationEdges=attachments.flatMap(([sourceId,targetId])=>[
  {role:'leader',sourceId,targetId},
  ...(doubleLeaders.has(sourceId)?[{role:'support',sourceId,targetId}]:[])
]);
const relationGraphs=buildRelationGraphs(unitSections.map(unit=>({...unit,keywords:unitKeywords.get(unit.id)})),relationEdges);
let reader=fs.readFileSync(readerFile,'utf8');
reader=reader.replace(/rule-facts\.js\?v=\d+/,'rule-facts.js?v=4');
reader=reader.replace(/points-validator\.js\?v=\d+/,'points-validator.js?v=4');
reader=reader.replace(/scripts\/app\.js\?v=\d+/,'scripts/app.js?v=44');
reader=reader.replace(/scripts\/roster-filter\.js\?v=\d+/,'scripts/roster-filter.js?v=24');
reader=reader.replace(/\sdata-eligibility="[^"]*"/g,'');
reader=replaceOrInsert(reader,'li',legends.group.id,'pact-of-decay-datasheets',nav);
reader=replaceOrInsert(reader,'section',legends.group.id,'pact-of-decay-datasheets',content);
reader=replaceOrInsert(reader,'section','core-stratagems','detachments',renderCoreStratagemSection());
reader=replaceOrInsert(reader,'section','rules-updates','rules-updates',renderUpdateSection());
reader=reader.replace(/9 detachments · \d+ datasheets · 366 glossary entries/,`9 detachments · ${unitSections.length} datasheets · 366 glossary entries`);
const moveWargearAbility=(unitSlug,abilityId)=>{
  const abilityRange=elementRange(reader,'article',abilityId);if(!abilityRange)throw new Error(`Missing ${abilityId}`);
  const ability=reader.slice(abilityRange[0],abilityRange[1]);
  const sectionId=`${unitSlug}-wargear-abilities`,existing=elementRange(reader,'section',sectionId);
  if(existing)reader=reader.slice(0,existing[0])+reader.slice(existing[1]);
  else reader=reader.slice(0,abilityRange[0])+reader.slice(abilityRange[1]);
  const composition=elementRange(reader,'section',`${unitSlug}-composition`);if(!composition)throw new Error(`Missing ${unitSlug} composition`);
  const section=`<section class="unit-part" id="${sectionId}"><h4>Wargear Abilities</h4><p class="unit-note">These abilities apply only while the corresponding wargear is equipped.</p><div class="ability-list">${ability}</div></section>`;
  reader=reader.slice(0,composition[0])+section+reader.slice(composition[0]);
  const tab=`<button class="local-tab" data-journey-target="${sectionId}" data-journey-type="datasheet">Wargear Abilities</button>`;
  if(!reader.includes(tab)){const marker=`<button class="local-tab" data-journey-target="${unitSlug}-wargear-options"`;reader=reader.replace(marker,tab+marker);}
};
moveWargearAbility('plague-marines','plague-marines-ability-icon-of-despair-aura');
moveWargearAbility('deathshroud-terminators','deathshroud-terminators-ability-icon-of-despair-aura');
reader=reader.replace(/<p class="lead">\d+ current Death Guard[^<]*datasheets\.<\/p>/,`<p class="lead">${book.audit.datasheets} current Death Guard datasheets.</p>`);
reader=reader.replace(/9 detachments [^<]* \d+ datasheets [^<]* \d+ glossary entries/,`9 detachments · ${book.audit.datasheets} datasheets · ${book.glossary.length} glossary entries`);
for(const unit of unitSections){
  const opener=new RegExp(`(<article\\b[^>]*\\bclass="[^"]*\\bunit-card\\b[^"]*"[^>]*\\bid="${unit.id}"[^>]*)(>)`,'i');
  const abilityBlocks=(unit.subsections||[]).filter(section=>section.title==='Abilities').flatMap(section=>section.blocks||[]);
  const abilityText=abilityBlocks.flatMap(block=>[block.title||'',block.text||'']).join(' ');
  const deadlyDemise=/\bDeadly Demise\b/i.test(abilityText);
  const ruleFacts={
    id:unit.id,unitId:unit.id,slug:unit.id.replace(/^unit-/,''),keywords:unitKeywords.get(unit.id),intrinsicKeywords:unitKeywords.get(unit.id),
    abilities:[...new Set(abilityBlocks.flatMap(block=>/^(?:core|faction)$/i.test(block.title||'')?String(block.text||'').split(',').map(value=>value.trim().replace(/\.$/,'')).filter(Boolean).map(value=>/^deadly demise\b/i.test(value)?'DEADLY DEMISE':value):[block.title].filter(Boolean)))],
    termIds:[...new Set([...unitKeywords.get(unit.id).filter(keyword=>!plainKeywordNames.has(keyword)).map(keywordId),...abilityBlocks.map(block=>block.termId).filter(Boolean),...(unit.blocks||[]).map(block=>block.termId).filter(Boolean)])],
    epic:unitKeywords.get(unit.id).some(keyword=>keyword.toUpperCase()==='EPIC HERO'),deadlyDemise,
    attached:Object.values(relationGraphs.get(unit.id)).some(items=>items.length)?null:false,
    attachmentKnown:!Object.values(relationGraphs.get(unit.id)).some(items=>items.length),
    characterCount:unitKeywords.get(unit.id).some(keyword=>keyword.toUpperCase()==='CHARACTER')?1:0,twoCharacters:null,warlord:null,
    relations:relationGraphs.get(unit.id)
  };
  reader=reader.replace(opener,(match,start,end)=>`${start.replace(/\sdata-(?:keywords|related-candidates|rule-facts)="[^"]*"/g,'')} data-rule-facts="${escapeHtml(JSON.stringify(ruleFacts))}"${end}`);
}
fs.writeFileSync(readerFile,reader);

const runtime={...existingRuntime};
for(const id of Object.keys(runtime))if(id.startsWith('term-death-guard-')||id.startsWith('ability-legends-')||id.startsWith('weapon-legends-'))delete runtime[id];
for(const id of ['keyword-chaos-lord','keyword-cultists','keyword-possessed','keyword-sorcerer'])delete runtime[id];
for(const entry of legendGlossary){
  if(entry.kind==='keyword'&&runtime[entry.id])continue;
  let summary=entry.short;
  if(entry.statline)summary=Object.entries(entry.statline).map(([key,value])=>`${key} ${value}`).join(' · ');
  if(entry.weapon)summary=Object.entries(entry.weapon).map(([key,value])=>`${key} ${value}`).join(' · ');
  const owner=entry.unitIds?.[0];
  runtime[entry.id]={title:entry.title,summary,glossary:`glossary-${entry.id}`,
    ...(entry.sectionId?{rule:entry.sectionId}:{}),...(owner?{datasheet:owner,statline:`${owner}-profile`}:{} )};
}
fs.writeFileSync(runtimeFile,`window.DG_TERMS=Object.freeze(${JSON.stringify(runtime)});\n`);
console.log(`Death Guard Legends built: ${legends.units.length} datasheets, ${legendGlossary.length} glossary records, ${book.audit.datasheets} total datasheets.`);
