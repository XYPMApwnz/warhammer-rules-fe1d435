import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const viewer=read('glossary/viewer.js');
const css=read('glossary/viewer-progressive.css');
const index=read('glossary/index.html');
const sw=read('service-worker.js');
const registry=JSON.parse(read('glossary/registry.en.json')).terms;
const aliases=JSON.parse(read('glossary/aliases.en.json')).aliases;
const values=Object.values(registry);
const normalize=value=>String(value||'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
const placeholder=/^(?:See full rule|Open full rule|Reference entry)\.?$/i;
const meaningful=value=>Boolean(normalize(value))&&!placeholder.test(String(value).trim());
const repeatsDefinition=(summary,definition)=>{const quick=normalize(summary),full=normalize(definition);return quick&&full.startsWith(quick);};
const visibleTextBlocks=term=>{
  const summary=term.summary?.en||'',definition=term.definition?.en||'';
  return Number(meaningful(summary)&&!repeatsDefinition(summary,definition))+
    Number(meaningful(definition)&&term.presentation!=='profile');
};

assert.equal(values.length,2588,'canonical entry count must remain stable');
assert.equal(Object.keys(aliases).length,662,'alias count must remain stable');

assert.match(viewer,/const titleCounts=new Map\(\)/,'duplicate titles must be detected');
assert.match(viewer,/className='term-qualifier'/,'duplicate titles must display a source qualifier');
assert.match(viewer,/const titleMatches=ranked\.filter\(item=>item\.score<5\)/,'title and alias matches must remain ahead of body matches');
assert.match(viewer,/query&&titleMatches\.length\?titleMatches:ranked/,'body matches must remain fallback results');
assert.match(viewer,/presentationPriority=term=>term\.presentation==='profile'\?1:0/,'weapon profiles must lose only same-quality search ties');
assert.match(viewer,/a\.score-b\.score\|\|presentationPriority\(a\.term\)-presentationPriority\(b\.term\)/,'search ranking must preserve match quality before presentation priority');
assert.match(viewer,/technicalAlias=.*unit\|weapon\|ability/,'technical IDs must be recognised');
assert.match(viewer,/searchAliases=aliases\.filter/,'technical IDs must not flood prefix search results');

assert.match(viewer,/!repeatsDefinition\(summaryText,definitionText\)/,'repeated Quick Rule prefixes must remain suppressed');
assert.match(viewer,/term\.presentation!=='profile'\)detail\.append\(sectionLabel\(normalize\(definitionText\)===normalize\(summaryText\)\?'Rule':'Full rule'\)/,'a meaningful non-profile definition must always render once');
assert.doesNotMatch(viewer,/term\.presentation!=='profile'&&normalize\(definitionText\)!==normalize\(summaryText\)/,'equal summary and definition must not suppress both text blocks');
assert.match(viewer,/popupSummary\.textContent=term\.summary\?\.en\|\|term\.definition\?\.en/,'popups must retain summaries');

const searchable=values.filter(term=>term.presentation!=='metadata');
const contextOnlyTermIds=new Set([
  'space-marines-ability-invulnerable-save','space-marines-ability-invulnerable-save-2',
  'space-marines-ability-transport','space-marines-ability-transport-2','space-marines-ability-transport-3','space-marines-ability-transport-4','space-marines-ability-transport-5',
  'space-marines-ability-transport-6','space-marines-ability-transport-7','space-marines-ability-transport-8','space-marines-ability-transport-9','space-marines-ability-transport-10',
  'adeptus-mechanicus-datasheet-damaged-1-4-wounds-remaining',
  'emperors-children-ability-damaged-1-5-wounds-remaining','emperors-children-ability-damaged-1-6-wounds-remaining','emperors-children-ability-damaged-1-7-wounds-remaining',
  'space-marines-ability-damaged-1-4-wounds-remaining','space-marines-ability-damaged-1-5-wounds-remaining',
  'tau-empire-ability-damaged-1-4-wounds-remaining','tau-empire-ability-damaged-1-5-wounds-remaining','tau-empire-ability-damaged-1-5-wounds-remaining-2',
  'tyranids-ability-damaged-1-4-wounds-remaining','tyranids-ability-damaged-1-5-wounds-remaining'
]);
const existingMetadataIds=new Set([
  'keyword-daemon-prince','keyword-daemon-prince-with-wings','keyword-hastarii','keyword-jump-pack','keyword-land-raider','keyword-predator-annihilator',
  'keyword-predator-destructor','keyword-primarch','keyword-rhino','keyword-secutarii','keyword-summoned'
]);
const technicalUnits=values.filter(term=>term.kind==='unit');
const contextOnly=values.filter(term=>term.kind==='unit'||contextOnlyTermIds.has(term.id));
const metadata=values.filter(term=>term.presentation==='metadata');
assert.equal(technicalUnits.filter(term=>term.scope==='death-guard').length,36,'all 36 Death Guard technical units must be classified structurally');
assert.equal(technicalUnits.filter(term=>term.scope==='adeptus-mechanicus').length,34,'all 34 Mechanicus technical units must be classified structurally');
assert.equal(contextOnly.length,93,'exactly 93 confirmed context-only entries must be classified');
assert.ok(contextOnly.every(term=>term.presentation==='metadata'),'all confirmed context-only entries must be hidden from ordinary search');
assert.equal(searchable.length,2484,'only the 93 confirmed context-only entries may leave the catalogue');
assert.equal(metadata.length,104,'existing metadata plus 93 context-only entries must remain hidden');
assert.deepEqual(metadata.map(term=>term.id).sort(),[...existingMetadataIds,...contextOnly.map(term=>term.id)].sort(),'no additional entries may be hidden');

const transports=contextOnly.filter(term=>/^space-marines-ability-transport(?:-\d+)?$/.test(term.id));
const damaged=contextOnly.filter(term=>/^Damaged:/i.test(term.title.en));
assert.equal(transports.length,10,'all 10 Transport capacity records must be hidden');
assert.equal(damaged.length,11,'all 11 Damaged profile records must be hidden');
assert.equal(registry['space-marines-ability-invulnerable-save'].definition.en,'4+','the local Invulnerable Save value must remain unchanged');
assert.equal(registry['space-marines-ability-invulnerable-save-2'].definition.en,'This model has a 4+ invulnerable save against melee attacks.','the Judiciar footnote must remain unchanged');
assert.match(registry['tau-empire-ability-damaged-1-5-wounds-remaining-2'].definition.en,/Objective Control characteristic/,'the Stormsurge-specific modifier must remain intact');

for(const id of [
  'core-characteristic-invulnerable-save','space-marines-ability-tempormortis','space-marines-ability-rampart','tau-empire-ability-shield-generator',
  'tyranids-ability-warp-field-aura-psychic','adeptus-mechanicus-datasheet-defend-the-divine-work'
])assert.ok(searchable.includes(registry[id]),`${id} must remain searchable`);
const weaponProfiles=values.filter(term=>term.kind==='weapon');
assert.equal(weaponProfiles.length,857,'weapon profile inventory must remain stable');
assert.ok(weaponProfiles.every(term=>term.presentation==='profile'&&searchable.includes(term)),'all weapon profiles must remain searchable profiles');

const hiddenExistingPrimary=searchable.filter(term=>(meaningful(term.summary?.en)||meaningful(term.definition?.en))&&visibleTextBlocks(term)===0&&term.presentation!=='profile');
assert.deepEqual(hiddenExistingPrimary.map(term=>term.id),[],'searchable entries must not hide existing primary text');
assert.equal(hiddenExistingPrimary.filter(term=>term.presentation==='atomic').length,0,'atomic entries must show their explanation');
assert.equal(hiddenExistingPrimary.filter(term=>term.presentation==='reference').length,0,'reference entries must show their explanation');

const characteristics=searchable.filter(term=>term.kind==='characteristic');
assert.equal(characteristics.length,13,'all current characteristics must remain covered');
assert.ok(characteristics.every(term=>visibleTextBlocks(term)>0),'all characteristics must show their definition');
const invulnerable=registry['core-characteristic-invulnerable-save'];
assert.ok(invulnerable&&searchable.includes(invulnerable),'Invulnerable Save characteristic must remain searchable');
assert.equal(invulnerable.definition.en,'An alternative saving throw that is not modified by Armour Penetration.','the source definition must remain unchanged');
assert.equal(visibleTextBlocks(invulnerable),1,'Invulnerable Save characteristic must show its definition exactly once');

for(const label of ['Source revision','Source locator','Contributing sources'])assert.ok(viewer.includes(`'${label}'`),`${label} must be available in Registry details`);
assert.doesNotMatch(index,/<b>\s*3\s*<\/b>\s*connected books/i,'connected-book copy must not contain a stale hardcoded count');
assert.match(index,/Connected Army Books \+ Core Rules/,'connected-book copy must remain informative');
assert.match(css,/\.filters\{[^}]*flex-wrap:wrap[^}]*overflow:visible/,'filter chips must wrap instead of clipping');

const viewerAsset=index.match(/<script src="\.\/(viewer\.js\?v=\d+)"/i)?.[1];
assert.ok(viewerAsset,'Glossary viewer must use a versioned asset URL');
assert.ok(sw.includes(`"./glossary/${viewerAsset}"`),'service worker and Glossary must use the same viewer asset URL');

console.log(`Glossary viewer QA passed: ${values.length} canonical entries, ${Object.keys(aliases).length} aliases, ${hiddenExistingPrimary.length} hidden-primary violations, ${characteristics.length} visible characteristics.`);
