import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {normalizedTextSha256} from '../tools/source-hash.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const entry=read('index.html');
const html=read('reader.html');
const deathGuardRoot=path.resolve(root,'..','death-guard');
const deathGuardRead=file=>fs.readFileSync(path.join(deathGuardRoot,file),'utf8');
const sharedTargets=fs.readFileSync(path.resolve(root,'..','shared','navigation-targets.js'),'utf8');
const sharedDatasheetLayout=fs.readFileSync(path.resolve(root,'..','shared','datasheet-layout.js'),'utf8');
const sharedDatasheetCss=fs.readFileSync(path.resolve(root,'..','shared','datasheet-system.css'),'utf8');
const sharedPopupContent=fs.readFileSync(path.resolve(root,'..','shared','popup-content.js'),'utf8');
const sharedGlossaryAutolink=fs.readFileSync(path.resolve(root,'..','shared','glossary-autolink.js'),'utf8');
const glossaryRegistryText=fs.readFileSync(path.resolve(root,'..','..','glossary','registry.en.json'),'utf8');
const glossaryRegistry=JSON.parse(glossaryRegistryText);
const factionRules=json('content/adeptus-mechanicus-rules.en.json');
const source=json('content/adeptus-mechanicus-source.en.json');
const codex=json('content/adeptus-mechanicus-codex-detachments.en.json');
const codexParity=json('content/adeptus-mechanicus-codex-parity.en.json');
const codexDatasheets=json('content/adeptus-mechanicus-codex-datasheets.en.json');
const codexWargear=json('content/adeptus-mechanicus-codex-wargear.en.json');
const currentPoints=json('content/adeptus-mechanicus-points.en.json');
const officialMfm=json('sources/official-mfm-v1.1.json');
const relatedRulesConfig=json('content/adeptus-mechanicus-related-rules.en.json');
const factionDatasheets=new Map(factionRules.datasheets.map(unit=>[unit.id,unit]));
const mergedDatasheets=codexDatasheets.datasheets.map(unit=>factionDatasheets.has(unit.id)?{...unit,...factionDatasheets.get(unit.id),category:unit.category}:unit);
const rules={...factionRules,datasheets:mergedDatasheets};
const allDetachments=[...rules.detachments,...codex.detachments];
const node=process.execPath;
const results=[];
const check=(name,ok,detail='')=>results.push({name,ok,detail});

check('BSData source hash ignores LF/CRLF differences',
  normalizedTextSha256('{\n  "revision": 1\n}\n')===normalizedTextSha256('{\r\n  "revision": 1\r\n}\r\n'));

const scripts=['scripts/data.js','scripts/faction-ui.js','scripts/related-rules.js','scripts/roster-enhancements.js','scripts/roster-filter.js','scripts/app.js'];
for(const file of scripts){try{new vm.Script(read(file),{filename:file});check(`${file} syntax`,true);}catch(error){check(`${file} syntax`,false,error.message);}}
try{new vm.Script(sharedTargets,{filename:'../shared/navigation-targets.js'});check('shared navigation targets syntax',true);}catch(error){check('shared navigation targets syntax',false,error.message);}
try{new vm.Script(sharedDatasheetLayout,{filename:'../shared/datasheet-layout.js'});check('shared datasheet layout syntax',true);}catch(error){check('shared datasheet layout syntax',false,error.message);}
try{new vm.Script(sharedPopupContent,{filename:'../shared/popup-content.js'});check('shared popup content syntax',true);}catch(error){check('shared popup content syntax',false,error.message);}
try{new vm.Script(sharedGlossaryAutolink,{filename:'../shared/glossary-autolink.js'});check('shared glossary autolink syntax',true);}catch(error){check('shared glossary autolink syntax',false,error.message);}

const markup=html.replace(/<script[\s\S]*?<\/script>/gi,'');
const ids=[...markup.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
const idSet=new Set(ids);
const navTargets=[...markup.matchAll(/data-nav-target="([^"]+)"/g)].map(x=>x[1]);
const trackTargets=[...markup.matchAll(/data-track="([^"]+)"/g)].map(x=>x[1]);
const journeyTargets=[...markup.matchAll(/data-journey-target="([^"]+)"/g)].map(x=>x[1]);
const localTargets=[...markup.matchAll(/class="local-tab" data-journey-target="([^"]+)"/g)].map(x=>x[1]);
const depths=[...markup.matchAll(/data-nav-depth="(\d+)"/g)].map(x=>Number(x[1]));
const topLevelTargets=[...markup.matchAll(/<li data-nav-id="[^"]+" data-nav-depth="1">[\s\S]*?<button class="toc-label" data-nav-target="([^"]+)"/g)].map(x=>x[1]);
const required=['appHeader','navMenu','navCollapse','backButton','tocScrim','tocPanel','tocTree','main','popupLayer'];

check('source snapshot has all 27 pages',source.meta.pageCount===27&&Object.keys(source.pages).length===27);
check('source hash is locked',source.meta.sha256==='FC8D366B0615CDE750E01924277D4A42B680639B1BF96E3823E7FCCE11241345'&&source.meta.sha256===rules.source.sha256);
check('Faction Pack v1.1 metadata is current',rules.source.version==='1.1'&&rules.source.pages===27&&rules.source.legalFrom==='2026-07-22'&&rules.source.file==='sources/adeptus-mechanicus-faction-pack-v1.1.pdf');
check('canonical content has five detachments',rules.detachments.length===5);
check('army has ten total detachments',allDetachments.length===10);
check('official MFM has DP and disposition for every detachment',Object.keys(officialMfm.detachments||{}).length===10&&allDetachments.every(detachment=>{
  const record=officialMfm.detachments[detachment.title];
  return Number.isInteger(record?.dp)&&record.dp>0&&Boolean(record.disposition);
}));
check('five Codex detachments are restored',codex.detachments.length===5);
check('Codex parity layer contains full Detachment rules and Enhancements',codexParity.detachments.length===5&&codexParity.detachments.every(detachment=>detachment.rule.text.length>80&&detachment.enhancements.length===4&&detachment.enhancements.every(item=>item.text.length>60)));
check('every Codex detachment has four enhancements and six stratagems',codex.detachments.every(x=>x.enhancements.length===4&&x.stratagems.length===6));
check('detachment card counts are complete',JSON.stringify(rules.detachments.map(x=>[x.enhancements.length,x.stratagems.length]))===JSON.stringify([[2,3],[2,3],[2,3],[4,6],[4,6]]));
check('codex layer has 38 current 11e datasheets',rules.datasheets.length===38&&rules.datasheets.length===codexDatasheets.audit.datasheets);
check('four datasheets are current 11e Legends',rules.datasheets.filter(x=>x.status==='Warhammer Legends').length===4);
check('obsolete 10e Servitors datasheet is absent',!rules.datasheets.some(unit=>unit.title==='Servitors'));
const attachmentTargets={
  'Skitarii Marshal':['Hastarii Exterminators','Hastarii Fusiliers','Skitarii Rangers','Skitarii Vanguard'],
  'Technoarcheologist':['Corpuscarii Electro-Priests','Fulgurite Electro-Priests','Hastarii Exterminators','Hastarii Fusiliers','Kataphron Breachers','Kataphron Destroyers','Servitor Battleclade','Skitarii Rangers','Skitarii Vanguard'],
  'Tech-Priest Dominus':['Corpuscarii Electro-Priests','Fulgurite Electro-Priests','Hastarii Exterminators','Hastarii Fusiliers','Kataphron Breachers','Kataphron Destroyers','Servitor Battleclade','Skitarii Rangers','Skitarii Vanguard'],
  'Tech-Priest Manipulus':['Corpuscarii Electro-Priests','Fulgurite Electro-Priests','Hastarii Exterminators','Hastarii Fusiliers','Kataphron Breachers','Kataphron Destroyers','Servitor Battleclade','Skitarii Rangers','Skitarii Vanguard'],
  'Tech-Priest Enginseer':['Corpuscarii Electro-Priests','Fulgurite Electro-Priests','Kataphron Breachers','Kataphron Destroyers','Skitarii Rangers','Skitarii Vanguard']
};
for(const [title,expected] of Object.entries(attachmentTargets)){
  const unit=codexDatasheets.datasheets.find(unit=>unit.title===title);
  const relation=unit?.abilities.find(ability=>/^(?:Leader|Support)$/.test(ability.title));
  const actual=(relation?.text.match(/^■ (.+)$/gm)||[]).map(line=>line.slice(2));
  check(`${title} has the current official attachment targets`,JSON.stringify(actual)===JSON.stringify(expected),actual.join(', '));
}
check('every datasheet has stats, weapons, abilities and provenance',rules.datasheets.every(x=>Object.keys(x.stats).length>=6&&x.weapons.length&&x.abilities.length&&(x.sourcePages?.length||x.source?.url)));
check('official multi-profile datasheet is preserved',factionRules.datasheets.find(unit=>unit.title==='Servitor Battleclade')?.profiles?.length===2);
check('official Legends and Faction Pack clarifications are complete',[
  'for a final result of 2+',
  "Starting Strength is increased accordingly",
  'neither it nor any units embarked within it count towards limits',
  'Enhanced data-tether',
  'Designer\'s Note: a unit that already has HALO OVERRIDE'
].every(text=>JSON.stringify(factionRules).includes(text)));
check('placeholder compositions are gone',codexDatasheets.datasheets.every(unit=>!/^See the model selections/i.test(unit.composition||'')));
const ranger=codexDatasheets.datasheets.find(unit=>unit.title==='Skitarii Rangers');
check('unit composition preserves complete model groups',ranger?.composition==='9 Skitarii Rangers. 1 Skitarii Ranger Alpha.');
check('optional wargear abilities stay out of unit abilities',
  ['Enhanced data-tether','Omnispex'].every(title=>ranger?.wargearAbilities?.some(item=>item.title===title))
  &&['Enhanced data-tether','Omnispex'].every(title=>!ranger?.abilities?.some(item=>item.title===title)));
const skatros=codexDatasheets.datasheets.find(unit=>unit.title==='Sydonian Skatros');
check('Sydonian Skatros keeps Achillan Eye as a permanent datasheet ability',skatros?.abilities.some(ability=>ability.title==='Achillan Eye')&&!skatros?.wargearAbilities?.some(ability=>ability.title==='Achillan Eye'));
check('Codex selection tree produces wargear contracts',codexDatasheets.datasheets.filter(unit=>unit.wargear?.length).length===35&&ranger.wargear.some(text=>text.includes('up to 1 Skitarii Ranger w/ transuranic arquebus'))&&codexDatasheets.datasheets.find(unit=>unit.title==='Kastelan Robots')?.wargear.some(text=>text.includes('Twin Kastelan fist')));
const thulia=factionRules.datasheets.find(unit=>unit.title==='Thulia Ghuld');
const onager=codexDatasheets.datasheets.find(unit=>unit.title==='Onager Dunecrawler');
check('July v1.1 Thulia replacement is exact',thulia?.keywords.includes('MOBILE')&&!thulia?.abilities.some(item=>item.title==='Cybernetic Augmentation'));
check('July v1.1 Onager dissipated profile is S9',onager?.weapons.find(item=>/eradication beamer - dissipated/i.test(item.name))?.s==='9');
check('July v1.1 Hunter rule has no obsolete cover clause',codex.detachments.find(item=>item.title==='Skitarii Hunter Cohort')?.rule.text==='Friendly SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units have Stealth.');
check('July v1.1 FAQ explains the final BS2 result',factionRules.updates.find(item=>item.id==='faction-faq')?.summary.includes('for a final result of 2+'));
check('Legends page ranges follow the 27-page pack',JSON.stringify(factionRules.datasheets.filter(unit=>unit.status==='Warhammer Legends').map(unit=>unit.sourcePages))===JSON.stringify([[20,21],[22,23],[24,25],[26,27]]));
check('known catalogue text corruption is removed',!JSON.stringify(codexDatasheets).match(/havealready|Conflagaration|Pteraxii Sterylizors[\s\S]{0,1200}Pteraxii Skystalker Alpha/));
check('detachment-only categories never become permanent datasheet keywords',codexDatasheets.datasheets.every(unit=>!unit.keywords.includes('Recon Augury')));
check('current FRAME keywords are present',['Skorpius Disintegrator','Skorpius Dunerider','Terrax-pattern Termite'].every(title=>rules.datasheets.find(unit=>unit.title===title)?.keywords.some(keyword=>keyword.toUpperCase()==='FRAME')));
check('conditional shared weapon modifiers are resolved for their bearer',codexDatasheets.datasheets.find(unit=>unit.title==='Skitarii Marshal')?.weapons.find(weapon=>weapon.name==='Mechanicus pistol')?.skill==='3+'&&codexDatasheets.datasheets.find(unit=>unit.title==='Skitarii Rangers')?.weapons.find(weapon=>weapon.name==='Mechanicus pistol')?.skill==='4+');
check('all source pages are represented in the UI',Array.from({length:27},(_,i)=>i+1).every(page=>html.includes(`#page=${page}`)||html.includes(`Page ${page}`)));
check('required interaction IDs are present',required.every(id=>idSet.has(id)),required.filter(id=>!idSet.has(id)).join(', '));
check('HTML IDs are unique',ids.length===idSet.size,`${ids.length}/${idSet.size}`);
check('all navigation targets exist',navTargets.every(id=>idSet.has(id)),navTargets.filter(id=>!idSet.has(id)).join(', '));
check('all navigation targets are tracked',navTargets.every(id=>trackTargets.includes(id)),navTargets.filter(id=>!trackTargets.includes(id)).join(', '));
check('navigation depth stays at three',Math.max(...depths)===3);
check('top-level navigation matches the DG contract',JSON.stringify(topLevelTargets)===JSON.stringify(['start','core-rules','detachments','datasheets','updates']),topLevelTargets.join(', '));
check('datasheets use category then unit hierarchy',['datasheets-epic-heroes','datasheets-characters','datasheets-battleline','datasheets-dedicated-transports','datasheets-other','datasheets-warhammer-legends'].every(id=>navTargets.includes(id))&&rules.datasheets.every(unit=>markup.includes(`data-nav-id="${unit.id}" data-nav-depth="3"`)));
check('detachment navigation uses singular Enhancement label',(markup.match(/data-nav-depth="3"[^>]*>[\s\S]*?data-nav-target="[^"]+-enhancements">Enhancement<\/button>/g)||[]).length===allDetachments.length);
check('all Journey targets resolve',journeyTargets.every(id=>idSet.has(id)));
check('local datasheet tabs are not global navigation',localTargets.length>=rules.datasheets.length*4&&localTargets.every(id=>!navTargets.includes(id)));
check('all ten detachments render all tracked parts',(markup.match(/class="detachment-part"/g)||[]).length===30);
check('all 38 unit cards render',(markup.match(/class="unit-card surface/g)||[]).length===rules.datasheets.length);
check('datasheets use typed DG sections',
  markup.includes('id="skitarii-rangers-wargear-abilities"')
  &&markup.includes('id="tech-priest-dominus-leader"')
  &&markup.includes('id="onager-dunecrawler-damaged"')
  &&markup.includes('id="terrax-pattern-termite-transport"'));
check('conditional wargear is labelled honestly',markup.includes('These abilities apply only while the corresponding wargear is equipped.'));
check('Legends is a datasheet category, not a global section',!topLevelTargets.includes('legends')&&navTargets.includes('datasheets-warhammer-legends')&&legendsCount(markup)===4);
check('favorite Doctrina console is preserved',markup.includes('class="doctrina-console surface"')&&markup.includes('data-protocol="protector"')&&markup.includes('data-protocol="conqueror"'));
check('local official transcripts are embedded',(markup.match(/class="source-transcript"/g)||[]).length===rules.updates.length+rules.detachments.length+factionRules.datasheets.length+2);
check('Codex transcription status is explicit',markup.includes('Codex transcription layer')&&markup.includes('38 indexed datasheets'));
check('official MFM verification is visible',markup.includes('Munitorum Field Manual v1.1')&&markup.includes('All 34 current Enhancement costs'));
check('generated reader identifies the current 27-page Faction Pack',markup.includes('Faction Pack v1.1')&&markup.includes('27 pages')&&!markup.includes('Faction Pack v1.0'));
check('Stratagem restrictions render as a separate field',markup.includes('<b>Restrictions</b>')&&markup.includes('Programmed Withdrawal'));
check('datasheet wargear text uses the unit name, not extractor UI labels',!markup.includes('Wargear is equipped with:')&&!markup.includes('Wargear can be equipped with:'));
check('all carried-forward Codex datasheets have exact wargear and composition snapshots',codexWargear.units.length===30&&codexWargear.units.every(unit=>unit.title&&Array.isArray(unit.wargear)&&unit.composition));
const rangerWargear=codexWargear.units.find(unit=>unit.title==='Skitarii Rangers')?.wargear||[];
check('conditional Skitarii wargear limits remain visible',rangerWargear.includes('* That model’s galvanic rifle cannot be replaced.')&&rangerWargear.some(row=>row.startsWith('1 Skitarii Ranger equipped with a galvanic rifle'))&&markup.includes('That model’s')&&markup.includes('cannot be replaced.'));
check('removed army points section stays removed',!markup.includes('My Army · 995')&&!markup.includes('army-roster-995'));
check('no replacement characters in generated/runtime files',!['index.html','reader.html',...scripts,'styles/mechanicus.css'].map(read).join('').includes('\uFFFD'));
check('known BSData spelling errors stay normalised',!html.includes(' mdel ')&&!glossaryRegistryText.includes(' mdel '));
check('Mechanicus glossary definitions preserve full rules text',glossaryRegistry.terms?.['adeptus-mechanicus-datasheet-data-spike']?.definition?.en?.length>300);
check('no inline script or style',!/<style|<script(?![^>]*src=)/i.test(html));
check('all stylesheet and script assets resolve',[...markup.matchAll(/(?:href|src)="([^"?#]+)"/g)].map(x=>x[1]).filter(file=>!file.endsWith('.pdf')&&!/^(?:https?:|data:)/.test(file)).every(file=>fs.existsSync(path.resolve(root,file))));

const context={window:{},Object};vm.runInNewContext(read('scripts/data.js'),context);
const terms=context.window.DG_TERMS||{};
check('term registry expands the canonical glossary',Object.keys(terms).length>=rules.glossary.length+150,`${Object.keys(terms).length} terms`);
check('term rule and unit destinations resolve',Object.values(terms).every(term=>(!term.rule||idSet.has(term.rule))&&(!term.units||term.units.every(id=>idSet.has(id)))));
check('datasheet abilities and weapons are interactive',(markup.match(/class="ability"/g)||[]).length>100&&(markup.match(/class="weapon-button" data-term=/g)||[]).length>150);
check('Core abilities use canonical destinations',!markup.includes('data-term="datasheet-deep-strike"')&&!markup.includes('data-term="datasheet-deadly-demise')&&markup.includes('data-term="core-deep-strike"')&&markup.includes('data-term="core-deadly-demise"')&&terms['core-deep-strike']?.fullRulePath==='books/core-rules/reader/core-abilities.html#rule-24-09');
check('official and Codex datasheets show provenance',(markup.match(/class="unit-card surface/g)||[]).length===(markup.match(/<div class="source"><a class="source-link"/g)||[]).length-rules.updates.length-allDetachments.length-1);

const navSource=deathGuardRead('scripts/navigation-controller.js');
const popupSource=deathGuardRead('scripts/popup-controller.js');
check('single passive scroll owner remains',(navSource.match(/addEventListener\('scroll'/g)||[]).length===1&&navSource.includes("state={owner:'reader'")&&navSource.includes('{passive:true}'));
check('scroll spy uses cached geometry',!navSource.slice(navSource.indexOf('pickActive(){'),navSource.indexOf('scheduleRead(){')).includes('getBoundingClientRect'));
check('manual scroll keeps the last crossed descendant active',navSource.includes('lastCrossedDescendant(parent,scrollY)'));
check('navigation uses the shared explicit target resolver',navSource.includes('WHNavigationTargets.resolve')&&!navSource.includes("querySelector(':scope > .stratagem')")&&!navSource.includes("querySelector('.stratagem')"));
check('outside click closes the complete popup chain',popupSource.includes("this.ids.length&&!event.target.closest('.term-popup,.full-entry-layer')")&&popupSource.includes('this.closeFrom(0)'));
check('datasheet actions appear only inside Related Rules',!popupSource.includes('Datasheet & Wargear')&&!popupSource.includes("label:'Statline'")&&popupSource.includes("label:'Open datasheet'")&&popupSource.includes("closest?.('.related-rules-layer')"));
check('Mega Glossary transitions use the shared return helper',html.includes('../../glossary-return.js?v=3')&&popupSource.includes('WHGlossaryReturn')&&read('scripts/app.js').includes('WHGlossaryReturn'));
check('book loads the shared navigation target resolver',html.includes('src="../shared/navigation-targets.js?v=1"'));
check('book loads the shared datasheet design',html.includes('href="../shared/datasheet-system.css?v=6"'));
check('book loads the shared datasheet layout',html.includes('src="../shared/datasheet-layout.js?v=2"'));
check('glossary autolinking precedes navigation geometry',read('scripts/app.js').indexOf('WHGlossaryAutolink?.apply')<read('scripts/app.js').indexOf('new window.DGNavigation'));
check('shared datasheet statlines keep every characteristic on one row',/\.unit-card \.statline\s*\{[^}]*display:\s*flex/.test(sharedDatasheetCss));
check('mobile weapon characteristics use one six-column row',sharedDatasheetCss.includes('grid-template-columns: repeat(6, minmax(0, 1fr))')&&(html.match(/data-label="(?:Range|A|BS|WS|S|AP|D)"/g)||[]).length===rules.datasheets.reduce((sum,unit)=>sum+unit.weapons.length,0)*6);
check('mobile layout avoids content-visibility geometry jumps',!deathGuardRead('styles/content.css').includes('content-visibility: auto'));
check('desktop stratagem cards use the shared responsive grid',deathGuardRead('styles/content.css').includes('.stratagem-grid')&&html.includes('class="stratagem-grid"'));
check('navigation cancellation remains wired',navSource.includes("root.style.scrollBehavior='auto'")&&navSource.includes("behavior:'auto'"));
check('navigation is loaded from the Death Guard runtime contract',html.includes('../death-guard/scripts/navigation-controller.js'));
check('entry router preserves the DG desktop/phone contract',entry.includes('../death-guard/scripts/view-router.js')&&entry.includes('./reader.html?view=full')&&entry.includes('./mobile/index.html?view=mobile'));
check('header exposes the shared Mega Glossary',markup.includes('href="../../glossary/index.html"')&&markup.includes('Mega Glossary'));
check('mobile weapon labels stay dynamic',html.includes('data-label="Range"')&&/content:\s*attr\(data-label\)/.test(sharedDatasheetCss));
check('desktop to Phone mode preserves the active route',read('scripts/app.js').includes("destination=new URL('./mobile/'+route")&&read('scripts/app.js').includes('destination.search=params.toString()'));
check('nested Full Entry stays above Related Rules',read('styles/mechanicus.css').includes('.related-rules-open .full-entry-layer{z-index:170}'));
check('Related Rules uses an opaque book background',/\.related-rules-dialog\{[^}]*background:var\(--panel\)/.test(read('styles/mechanicus.css'))&&!/\.related-rules-dialog\{[^}]*background:var\(--void\)/.test(read('styles/mechanicus.css')));
check('conditional attached-unit Enhancements are never guessed',read('scripts/roster-enhancements.js').includes('The roster export does not prove that the bearer is leading a unit.')&&read('scripts/roster-enhancements.js').includes('does not identify its Bodyguard unit'));
check('personal roster reports unmatched units and renders loadout',read('scripts/roster-filter.js').includes('Unmatched roster units:')&&read('scripts/roster-filter.js').includes('Roster loadout')&&read('scripts/roster-filter.js').includes('\\[legends\\]'));
check('shared points validation recognises New Recruit Legends suffixes',fs.readFileSync(path.resolve(root,'..','..','roster-guides','points-validator.js'),'utf8').includes('\\[legends\\]'));

const relatedContext={window:{}};
vm.createContext(relatedContext);
new vm.Script(read('../shared/rule-facts.js'),{filename:'../shared/rule-facts.js'}).runInContext(relatedContext);
new vm.Script(read('../shared/related-rules-matcher.js'),{filename:'../shared/related-rules-matcher.js'}).runInContext(relatedContext);
new vm.Script(read('scripts/related-rules.js'),{filename:'scripts/related-rules.js'}).runInContext(relatedContext);
const relatedMatcher=relatedContext.window.AMRelatedRules;
const allStratagems=allDetachments.flatMap(detachment=>detachment.stratagems);
const allEnhancements=allDetachments.flatMap(detachment=>detachment.enhancements);
const allEligibleItems=[...allStratagems,...allEnhancements];
const unitIds=new Set(rules.datasheets.map(unit=>unit.id));
const knownKeywords=new Set(rules.datasheets.flatMap(unit=>unit.keywords).map(keyword=>keyword.toUpperCase()));
for(const grants of Object.values(relatedRulesConfig.keywordGrants||{}))for(const grant of grants)knownKeywords.add(grant.keyword.toUpperCase());
const eligibilityTargets=allEligibleItems.flatMap(item=>item.eligibility?.targets||[]);
check('all 51 Stratagems and 34 Enhancements have explicit eligibility',allStratagems.length===51&&allEnhancements.length===34&&allEligibleItems.every(item=>item.id&&(item.eligibility?.owner||item.eligibility?.targets?.some(target=>target.side==='friendly'))));
check('eligibility IDs are stable and unique',new Set(allEligibleItems.map(item=>item.id)).size===allEligibleItems.length&&allStratagems.every(item=>item.id.startsWith('stratagem-'))&&allEnhancements.every(item=>item.id.startsWith('enhancement-')));
check('eligibility references known datasheets and keywords',eligibilityTargets.every(target=>(target.units||[]).every(id=>unitIds.has(id))&&[...(target.all||[]),...(target.any||[]),...(target.none||[])].every(keyword=>knownKeywords.has(keyword.toUpperCase()))));
check('Related Rules uses structured eligibility only',read('scripts/related-rules.js').includes("JSON.parse(card.dataset.eligibility||'')")&&!read('scripts/related-rules.js').includes("text.includes("));
check('detachment-granted keywords are applied only inside their Related Rules section',read('scripts/related-rules.js').includes('withKeywordGrants(card,unit)')&&read('mobile/related-rules.inc').includes('data-keyword-grants=')&&read('mobile/related-rules.inc').includes('RECON AUGURY'));
check('Related Rules preserves stable rule IDs when cloning',read('scripts/related-rules.js').includes('if(!node.dataset.ruleId)node.dataset.ruleId=node.id'));

const itemByTitle=title=>allEligibleItems.find(item=>item.title===title);
const profileById=id=>{
  const unit=rules.datasheets.find(item=>item.id===id);
  return{id:unit.id,slug:unit.id.replace(/^unit-/,''),keywords:new Set(unit.keywords.map(keyword=>keyword.toUpperCase())),epic:unit.keywords.some(keyword=>keyword.toUpperCase()==='EPIC HERO')};
};
const eligible=(title,unitId)=>relatedMatcher.matches({dataset:{eligibility:JSON.stringify(itemByTitle(title).eligibility)}},profileById(unitId));
check('exact-unit eligibility distinguishes Dunerider from other Vehicles',eligible('Aggressive Impulse','unit-skorpius-dunerider')&&!eligible('Aggressive Impulse','unit-onager-dunecrawler'));
check('AND eligibility requires both Skitarii and Vehicle',eligible('Threat-cogitation Targeters','unit-onager-dunecrawler')&&!eligible('Threat-cogitation Targeters','unit-skitarii-vanguard')&&!eligible('Threat-cogitation Targeters','unit-kastelan-robots'));
check('OR eligibility accepts Legio Cybernetica or Vehicle',eligible('Auto-divinatory Targeting','unit-kastelan-robots')&&eligible('Auto-divinatory Targeting','unit-onager-dunecrawler')&&!eligible('Auto-divinatory Targeting','unit-skitarii-vanguard'));
check('exclusion eligibility rejects Kataphron Infantry',eligible('Analytical Divination','unit-skitarii-vanguard')&&!eligible('Analytical Divination','unit-kataphron-breachers'));
check('friendly plus enemy multi-target rules keep the friendly unit eligible',eligible('Tribute of Empathic Veneration','unit-corpuscarii-electro-priests')&&!eligible('Tribute of Empathic Veneration','unit-skitarii-vanguard')&&eligible('Binharic Offence','unit-skitarii-vanguard')&&!eligible('Binharic Offence','unit-corpuscarii-electro-priests'));
check('different friendly target roles are matched independently',eligible('Incense Exhausts','unit-skitarii-vanguard')&&eligible('Incense Exhausts','unit-skorpius-dunerider')&&!eligible('Incense Exhausts','unit-kastelan-robots'));
check('named Enhancement eligibility remains exact',eligible('Stealth-screened Cybercanids Upgrade','unit-serberys-raiders')&&!eligible('Stealth-screened Cybercanids Upgrade','unit-serberys-sulphurhounds'));
check('Tech-Priest Enhancements reject Epic Heroes and non-Characters',eligible('Necromechanic','unit-tech-priest-dominus')&&!eligible('Necromechanic','unit-belisarius-cawl')&&!eligible('Necromechanic','unit-skitarii-vanguard'));
check('generic Adeptus Mechanicus Enhancements require a non-Epic Character',eligible('Autoclavic Denunciation','unit-tech-priest-dominus')&&!eligible('Autoclavic Denunciation','unit-belisarius-cawl')&&!eligible('Autoclavic Denunciation','unit-skitarii-vanguard'));
check('Skitarii Enhancements require a non-Epic Character',eligible('Clandestine Infiltrator','unit-skitarii-marshal')&&!eligible('Clandestine Infiltrator','unit-skitarii-vanguard')&&!eligible('Clandestine Infiltrator','unit-onager-dunecrawler'));
const reconRule=itemByTitle('Repolarised Augurs'),reconGrants=relatedRulesConfig.keywordGrants['cohort-acquisitus'];
const reconCard={dataset:{eligibility:JSON.stringify(reconRule.eligibility)},closest:()=>({dataset:{keywordGrants:JSON.stringify(reconGrants)}})};
check('Cohort Acquisitus grants RECON AUGURY only to its named datasheets',relatedMatcher.matches(reconCard,profileById('unit-skitarii-rangers'))&&!relatedMatcher.matches(reconCard,profileById('unit-onager-dunecrawler')));

const extractor=spawnSync('C:\\Users\\denis\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe',[path.join(root,'tools','extract-faction-pack.py'),'--check'],{encoding:'utf8'});
check('PDF extraction snapshot is current',extractor.status===0,(extractor.stderr||extractor.stdout).trim());
const codexExtractor=spawnSync(node,[path.join(root,'tools','extract-datasheets.mjs'),'--check'],{encoding:'utf8'});
check('Codex datasheet snapshot is current',codexExtractor.status===0,(codexExtractor.stderr||codexExtractor.stdout).trim());
const pointsExtractor=spawnSync(node,[path.join(root,'tools','extract-points.mjs'),'--check'],{encoding:'utf8'});
check('current points and Enhancements snapshot is current',pointsExtractor.status===0,(pointsExtractor.stderr||pointsExtractor.stdout).trim());
const compatibleRulesSnapshot=spawnSync(node,[path.join(root,'tests','compatible-rules-import-qa.mjs')],{encoding:'utf8'});
check('Wahapedia compatible-rules snapshot is current',compatibleRulesSnapshot.status===0,(compatibleRulesSnapshot.stderr||compatibleRulesSnapshot.stdout).trim());
const m2DataAudit=spawnSync(node,[path.join(root,'tests','m2-data-audit-qa.mjs')],{encoding:'utf8'});
check('M2 official parity and correction ledger are complete',m2DataAudit.status===0,(m2DataAudit.stderr||m2DataAudit.stdout).trim());
const compatibleRulesMatrix=spawnSync(node,[path.join(root,'tests','compatible-rules-matrix-qa.mjs')],{encoding:'utf8'});
check('Mechanicus compatible-rules matrix is current',compatibleRulesMatrix.status===0,(compatibleRulesMatrix.stderr||compatibleRulesMatrix.stdout).trim());
check('official MFM unit sizes are locked',[
  ['Ironstrider Ballistarii','3rd+ unit: 3 models'],
  ['Sydonian Dragoons with radium jezzails','3 models'],
  ['Sydonian Dragoons with taser lances','3 models'],
  ['Servitor Battleclade','9 models'],
  ['Skitarii Rangers','10 models'],
  ['Sydonian Skatros','1 model']
].every(([title,label])=>currentPoints.units.find(unit=>unit.title===title)?.points.some(row=>row.label===label)));
check('official MFM provenance is locked',currentPoints.source.officialVersion==='v1.1'&&currentPoints.source.officialUrl==='https://mfm.warhammer-community.com/en/adeptus-mechanicus');
check('carried-forward rules no longer use placeholder wording',!JSON.stringify(codex).match(/rule's listed roll|following the rule's unit restrictions|under the listed Acquisition conditions|according to the Stratagem's conditions/));
check('personal roster integration is loaded',html.includes('../shared/roster-parser.js?v=2')&&html.includes('../../roster-guides/points-validator.js?v=4')&&html.includes('./scripts/roster-filter.js?v=3')&&html.includes('data-roster-guides'));
check('Compatible Rules runtime uses only the generated matrix',read('scripts/app.js').includes('generated/compatible-rules.json')&&read('mobile/mobile.js').includes('generated/compatible-rules.json')&&!read('scripts/app.js').includes('AMRelatedRules')&&!read('mobile/mobile.js').includes('AMRelatedRules'));
check('Compatible Rules renders every matrix condition',read('scripts/app.js').includes('conditionsFor(result)')&&read('mobile/mobile.js').includes('conditionsFor(result)')&&read('scripts/compatible-rules-runtime.mjs').includes("'second-unit-unknown'")&&read('scripts/compatible-rules-runtime.mjs').includes("'battle-state-unknown'"));
check('roster Compatible Rules fail closed and filter assigned owners',read('scripts/app.js').includes("rosterMode&&!rosterGuide")&&read('scripts/roster-filter.js').includes("ownerStatus==='resolved'")&&read('mobile/mobile.js').includes("relatedRulesEnabled=false")&&read('mobile/mobile.js').includes('assignedEnhancementRuleIds'));
check('every Enhancement has a detachment and current cost',json('content/adeptus-mechanicus-points.en.json').enhancements.length===34&&json('content/adeptus-mechanicus-points.en.json').enhancements.every(item=>item.detachment&&item.value>0));
const build=spawnSync(node,[path.join(root,'tools','build-full-content.mjs'),'--check'],{encoding:'utf8'});
check('generated project artifacts are current',build.status===0,(build.stderr||build.stdout).trim());

function legendsCount(markup){return (markup.match(/class="unit-card surface legends-card"/g)||[]).length;}
for(const result of results)console.log(`${result.ok?'PASS':'FAIL'}  ${result.name}${result.detail?' — '+result.detail:''}`);
const failed=results.filter(x=>!x.ok);
console.log(`\n${results.length-failed.length}/${results.length} checks passed.`);
if(failed.length)process.exitCode=1;
