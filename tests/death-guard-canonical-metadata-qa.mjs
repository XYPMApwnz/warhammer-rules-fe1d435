import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const at=file=>path.join(root,file);
const read=file=>fs.readFileSync(at(file),'utf8');
const json=file=>JSON.parse(read(file));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(at(file))).digest('hex');
const metadata=json('books/death-guard/sources/canonical-presentation-contract.json');
const canonical=json('books/death-guard/content/death-guard-rules.en.json');
const legends=json('books/death-guard/content/death-guard-legends.en.json');
const points=json('books/death-guard/sources/official-mfm-v1.3.json');
const core=json('books/core-rules/content/core-rules.digital-11e.json');
const reader=read('books/death-guard/reader.html');
const runtimeSource=read('books/death-guard/scripts/data.js');
const runtime=JSON.parse(runtimeSource.slice(runtimeSource.indexOf('Object.freeze(')+14,runtimeSource.lastIndexOf(');')));
const results=[];
const check=(condition,label)=>{if(!condition)throw new Error(label);results.push(label);};
const equal=(actual,expected,label)=>check(JSON.stringify(actual)===JSON.stringify(expected),`${label}: ${JSON.stringify(actual)} != ${JSON.stringify(expected)}`);
const decode=value=>String(value).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&(amp|lt|gt|quot|apos|nbsp);/g,(_,name)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[name]));
const attr=(source,name)=>decode(new RegExp(`(?:^|\\s)${name}="([^"]*)"`).exec(source)?.[1]||'');
const strip=value=>decode(String(value).replace(/<[^>]+>/g,''));
const buttons=[];
for(const match of reader.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g))buttons.push({attrs:match[1],label:strip(match[2])});
const currentTermLinks=buttons.filter(button=>attr(button.attrs,'data-term')).map((button,order)=>({order,termId:attr(button.attrs,'data-term'),className:attr(button.attrs,'class'),label:button.label}));
const metadataTermLinks=metadata.termLinks.placements.map(({order,termId,className,label})=>({order,termId,className,label}));
const currentNavigation=buttons.filter(button=>attr(button.attrs,'data-nav-target')&&attr(button.attrs,'class').split(/\s+/).includes('toc-label')).map((button,order)=>({order,targetId:attr(button.attrs,'data-nav-target'),label:button.label.trim()}));
const metadataNavigation=metadata.navigation.nodes.map(({order,targetId,label})=>({order,targetId,label}));

check(metadata.schema===1&&metadata.bookId==='death-guard','metadata identity');
check(metadata.provenance.captureOnly===true&&metadata.provenance.generatedOutputsAreBuildInputs===false,'generated outputs are parity oracles only');
check(hash('books/death-guard/reader.html')===metadata.provenance.oracleHashes.reader,'reader oracle hash');
check(hash('books/death-guard/scripts/data.js')===metadata.provenance.oracleHashes.runtime,'runtime oracle hash');
check(hash('books/death-guard/mobile/related-rules.inc')===metadata.provenance.oracleHashes.relatedRules,'related-rules oracle hash');
const frozenFiles={canonical:'books/death-guard/content/death-guard-rules.en.json',legends:'books/death-guard/content/death-guard-legends.en.json',officialUpdates:'books/death-guard/content/official-update-ledger.en.json',points:'books/death-guard/sources/official-mfm-v1.3.json',compatibleRules:'books/death-guard/generated/compatible-rules.json',runtimeRelatedTerms:'books/death-guard/sources/runtime-related-terms.json',rosterSemantics:'books/death-guard/scripts/roster-semantics.js',rosterFilter:'books/death-guard/scripts/roster-filter.js'};
for(const [key,file] of Object.entries(frozenFiles))check(hash(file)===metadata.provenance.frozenSourceHashes[key],`${key} frozen hash`);

check(metadata.termLinks.expectedOccurrences===1317&&metadata.termLinks.expectedUniqueTermIds===373,'curated term counts');
check(new Set(metadata.termLinks.placements.map(record=>record.key)).size===metadata.termLinks.placements.length,'unique term placement keys');
check(metadata.termLinks.placements.every(record=>record.anchorId&&Array.isArray(record.path)),'term placement anchors');
equal(currentTermLinks,metadataTermLinks,'curated term sequence parity');
const glossaryIds=new Set(canonical.glossary.map(term=>term.id));
const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const coreIds=new Set(core.records.filter(record=>/^15\.(?:0[2-8]|1[0-2])$/.test(record.code)&&record.code!=='15.09').map(record=>record.code==='15.08'?'core-stratagem-fire-overwatch':`core-rule-${record.code.replace('.','-')}-${slug(record.title)}`));
check(metadata.termLinks.placements.every(record=>glossaryIds.has(record.termId)||coreIds.has(record.termId)),'no unknown term ids');
const readerIds=new Set([...reader.matchAll(/\sid="([^"]+)"/g)].map(match=>decode(match[1])));
check(metadata.termLinks.placements.every(record=>readerIds.has(record.anchorId)),'all term anchors exist');

check(metadata.navigation.expectedNodes===93,'navigation count');
check(new Set(metadata.navigation.nodes.map(node=>node.nodeId)).size===metadata.navigation.nodes.length,'unique navigation node ids');
equal(currentNavigation,metadataNavigation,'navigation target and label parity');
check(metadata.navigation.nodes.filter(node=>node.targetId.endsWith('-rule')&&node.parentId?.startsWith('detachment-')).every(node=>node.label==='Detachment Rule'),'detachment rule labels');
check(metadata.navigation.nodes.find(node=>node.targetId==='pact-of-decay-datasheets')?.parentId==='updates','Pact of Decay navigation ownership');

const owners=Object.fromEntries(metadata.sectionOwnership.records.map(record=>[record.id,record.parentId]));
equal(owners,{'mortarion-ability-supreme-commander':'unit-mortarion','miasmic-malignifier-ability-fortification-setup':'unit-miasmic-malignifier','great-unclean-one-ability-reverberating-summons':'unit-great-unclean-one','plague-drones-ability-daemonic-icon':'unit-plague-drones','plague-drones-ability-instrument-of-chaos':'unit-plague-drones','plaguebearers-ability-daemonic-icon':'unit-plaguebearers','plaguebearers-ability-instrument-of-chaos':'unit-plaguebearers','pact-of-decay-datasheets':'updates'},'section ownership contract');
check(Object.keys(metadata.sectionOwnership.unitSections).length===36,'unit section contracts');
equal(metadata.sectionOwnership.unitSections['unit-defiler'].tabs,['unit-defiler-profile','defiler-abilities','defiler-composition','defiler-wargear','defiler-damaged','defiler-keywords'],'Defiler tab order');
check(metadata.sectionOwnership.persistentSourceField?.ruleId==='stratagem-persistent-pests'&&metadata.sectionOwnership.persistentSourceField?.field==='restrictions','Persistent Pests source field');

check(metadata.provenanceBlocks.expectedOccurrences===46&&metadata.provenanceBlocks.records.length===46,'provenance occurrences');
check(metadata.provenanceBlocks.policy==='preserve-per-section; do not aggregate','provenance policy');
const currentSources=[...reader.matchAll(/<div class="source(?:-library)?">([\s\S]*?)<\/div>/g)].map(match=>strip(match[1]).replace(/\s+/g,' ').trim());
equal(currentSources,metadata.provenanceBlocks.records.map(record=>record.text),'provenance text parity');

const overrideIds=['detachment-rule-worldblight','leechspore-eruption','contagion-engines','ability-lord-of-the-death-guard-90db1c4'];
equal(Object.keys(metadata.runtimeSummaryOverrides),overrideIds,'runtime override ids');
check(overrideIds.every(id=>metadata.runtimeSummaryOverrides[id].summary===runtime[id].summary),'runtime summary parity');
check(overrideIds.every(id=>metadata.runtimeSummaryOverrides[id].status==='production-override'),'runtime summary conflict status');

const choice=metadata.structuredChoices['mortarion-ability-lord-of-the-death-guard'];
equal(choice.choices.map(item=>item.title),['Diseased Influence','Boon of Death','Inflamed Reprisal'],'structured choice titles');
check(choice.choices[1].id===null&&choice.choices[1].text.length>0,'Boon of Death explicit without invented id');
check(new Set(choice.choices.map(item=>item.id).filter(Boolean)).size===2,'unique structured choice ids');

const enhancementBlocks=[];
const walk=value=>{if(Array.isArray(value)){value.forEach(walk);return;}if(!value||typeof value!=='object')return;if(value.type==='enhancement'&&value.tags?.length)enhancementBlocks.push(value);for(const child of Object.values(value))walk(child);};
walk(canonical.sections);
equal(metadata.presentationTags.enhancements,Object.fromEntries(enhancementBlocks.map(block=>[block.id,block.tags])),'enhancement tag source parity');
equal(metadata.presentationTags.detachments,{'detachment-mortarions-hammer':'ENGINES','detachment-champions-of-contagion':'FLYBLOWN','detachment-contagion-engines':'ENGINES','detachment-flyblown-host':'FLYBLOWN'},'detachment tag metadata');

const defiler=canonical.sections.find(section=>section.id==='unit-defiler'),defilerPointBlock=defiler.blocks.find(block=>block.type==='points'),defilerMfm=points.units.find(unit=>unit.unitId==='unit-defiler');
equal(defilerPointBlock.wargear,defilerMfm.paidWargear,'Defiler authoritative paid wargear');
check(!Object.hasOwn(metadata,'defilerSurcharges'),'Defiler surcharges are not duplicated in metadata');
check(canonical.audit.datasheets===36&&canonical.sections.filter(section=>section.kind==='unit').length===36&&legends.units.length===0,'Current and Legends inventory');
check(metadata.sourceConflicts.length===1&&metadata.sourceConflicts[0].id==='stratagem-leechspore-eruption'&&metadata.sourceConflicts[0].status==='unresolved','explicit unresolved source conflict');

console.log(`Death Guard canonical metadata QA: ${results.length}/${results.length} PASS`);
