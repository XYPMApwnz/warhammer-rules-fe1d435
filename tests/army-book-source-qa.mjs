import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const books={
  'tau-empire':{pages:61,detachments:3,updates:25,faqs:2,datasheets:39,imperialArmour:0,legends:0,units:39,enhancements:23,flagship:'Commander Farsight'},
  'chaos-space-marines':{pages:102,detachments:9,updates:4,faqs:15,datasheets:58,imperialArmour:0,legends:53,units:111,enhancements:0,flagship:'Abaddon the Despoiler'},
  orks:{pages:85,detachments:6,updates:36,faqs:5,datasheets:57,imperialArmour:1,legends:30,units:88,enhancements:42,flagship:'Ghazghkull Thraka'},
  'emperors-children':{pages:10,detachments:4,updates:17,faqs:3,datasheets:23,imperialArmour:0,legends:0,units:23,enhancements:34,flagship:'Fulgrim'},
  'space-marines':{pages:217,detachments:15,updates:5,faqs:14,datasheets:101,imperialArmour:0,legends:0,units:101,enhancements:87,flagship:'Intercessor Squad'},
  'dark-angels':{pages:16,detachments:5,updates:3,faqs:1,datasheets:16,imperialArmour:0,legends:3,units:19,enhancements:26,flagship:"Lion El'Jonson"}
};

const errors=[];
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const expect=(condition,message)=>{if(!condition)errors.push(message);};
const inventory=data=>[...(data.datasheets||[]),...(data.imperialArmour||[]),...(data.legends||[])];

for(const [id,expected] of Object.entries(books)){
  const base=`books/${id}`;
  const config=read(`${base}/book.config.json`);
  const pack=read(`${base}/${config.sources.factionPack}`);
  const codex=read(`${base}/${config.sources.codexDatasheets}`);
  const points=read(`${base}/${config.sources.points||`content/${id}-points.en.json`}`);
  const manifest=read(`${base}/${config.sources.manifest}`);
  const label=`${id}:`;
  expect(pack.meta?.pageCount===expected.pages,`${label} expected ${expected.pages} Faction Pack pages`);
  for(const field of ['detachments','updates','faqs'])expect((pack[field]||[]).length===expected[field],`${label} expected ${expected[field]} ${field}`);
  for(const field of ['datasheets','imperialArmour','legends'])expect((codex[field]||[]).length===expected[field],`${label} expected ${expected[field]} ${field}`);
  expect((points.units||[]).length===expected.units,`${label} expected ${expected.units} points units`);
  expect((points.enhancements||[]).length===expected.enhancements,`${label} expected ${expected.enhancements} Enhancements`);
  expect(inventory(codex).some(unit=>unit.title===expected.flagship),`${label} missing flagship datasheet ${expected.flagship}`);
  const ids=inventory(codex).map(unit=>unit.id);
  expect(new Set(ids).size===ids.length,`${label} duplicate datasheet IDs`);
  expect(manifest.gates?.publishAsComplete===false,`${label} verification source gate must remain active`);
  const codexLayer=manifest.layers?.find(layer=>layer.role==='codex-structure');
  expect(Boolean(codexLayer?.commit),`${label} missing pinned Codex snapshot commit`);
  expect(codexLayer?.commit===points.source?.commit,`${label} points and Codex snapshot commits differ`);
}

const ownershipFixture=read('tests/fixtures/army-book-owned-datasheets.json');
const ownershipSources=[
  ['death-guard',read('books/death-guard/content/death-guard-rules.en.json').sections.filter(item=>item.kind==='unit').map(item=>item.id)],
  ...['adeptus-mechanicus','tyranids','tau-empire','emperors-children','space-marines'].map(id=>[id,read(`books/${id}/content/${id}-codex-datasheets.en.json`).datasheets.map(item=>item.id)])
];
const sortedIds=items=>[...new Set(items)].sort();
const compareOwnershipLayer=(bookId,layer,expectedIds,actualIds)=>{
  const expected=sortedIds(expectedIds);
  const actual=sortedIds(actualIds);
  for(const id of expected.filter(id=>!actual.includes(id)))errors.push(`${bookId}: expected Datasheet ID ${id} is absent from ${layer}`);
  for(const id of actual.filter(id=>!expected.includes(id)))errors.push(`${bookId}: actual ${layer} contains unexpected Datasheet ID ${id}`);
};
for(const [id,sourceIds] of ownershipSources){
  const fixture=ownershipFixture.books[id];
  expect(!!fixture,`${id}: audited ownership fixture is absent`);
  if(!fixture)continue;
  expect(Array.isArray(fixture.datasheetIds),`${id}: audited ownership fixture datasheetIds is not an array`);
  expect(fixture.provenance?.inventoryPath,`${id}: audited ownership fixture provenance is absent`);
  expect(fixture.datasheetIds.length===new Set(fixture.datasheetIds).size,`${id}: audited ownership fixture contains duplicate Datasheet IDs`);
  const readerHtml=fs.readFileSync(path.join(root,'books',id,'reader.html'),'utf8');
  const desktopIds=sortedIds([...readerHtml.matchAll(/<article class="unit-card[^"]*" id="(unit-[^"]+)"/g)].map(match=>match[1]));
  const phoneDir=path.join(root,'books',id,'mobile');
  const phoneIds=sortedIds(fs.readdirSync(phoneDir).filter(file=>file.endsWith('.html')).flatMap(file=>[...fs.readFileSync(path.join(phoneDir,file),'utf8').matchAll(/<article class="unit-card[^"]*" id="(unit-[^"]+)"/g)].map(match=>match[1])));
  compareOwnershipLayer(id,'extracted local inventory',fixture.datasheetIds,sourceIds);
  compareOwnershipLayer(id,'Desktop output',fixture.datasheetIds,desktopIds);
  compareOwnershipLayer(id,'Phone output',fixture.datasheetIds,phoneIds);
}
expect(Object.keys(ownershipFixture.books).length===ownershipSources.length,'audited ownership fixture book count does not match working Army Books');
const dgOwned=read('books/death-guard/content/death-guard-rules.en.json').sections;
for(const id of ["unit-beasts-of-nurgle","unit-great-unclean-one","unit-nurglings","unit-plague-drones","unit-plaguebearers","unit-rotigus"])expect(dgOwned.some(item=>item.id===id&&item.kind==='unit'&&item.local!==false),`death-guard: source-owned ${id} was pruned as a dependency`);
const ecRaw=read('books/emperors-children/sources/bsdata-emperors-children-11e.json');
const ecFaction=ecRaw.documents?.find(item=>item.role==='faction')?.data?.catalogue;
const ecRootLinks=Array.isArray(ecFaction?.entryLinks)?ecFaction.entryLinks:(ecFaction?.entryLinks?.entryLink||[]);
for(const title of ["Shalaxi Helbane","Keeper of Secrets","Daemonettes","Fiends","Seekers"])expect(ecRootLinks.some(item=>item.name===title),`emperors-children: faction catalogue root is missing ${title}`);
const tyrPackOwnership=read('books/tyranids/content/tyranids-faction-pack.en.json').datasheets;
expect(tyrPackOwnership.imperialArmour.some(item=>item.id==='hyperadapted-raveners'),'tyranids: Hyperadapted Raveners must retain Imperial Armour source evidence');
expect(!ownershipSources.find(([id])=>id==='tyranids')[1].includes('unit-hyperadapted-raveners'),'tyranids: Imperial Armour Hyperadapted Raveners leaked into local Datasheets');
expect(ownershipFixture.books.tyranids.datasheetIds.includes('unit-raveners'),'tyranids: ordinary Raveners are absent from audited local ownership');
expect(!ownershipFixture.books.tyranids.datasheetIds.includes('unit-hyperadapted-raveners'),'tyranids: Hyperadapted Raveners leaked into audited local ownership');
for(const id of ['unit-kroot-carnivores','unit-vespid-stingwings'])expect(ownershipFixture.books['tau-empire'].datasheetIds.includes(id),`tau-empire: source-owned ${id} is absent from audited local ownership`);
for(const id of ['unit-shalaxi-helbane','unit-keeper-of-secrets','unit-daemonettes','unit-fiends','unit-seekers'])expect(ownershipFixture.books['emperors-children'].datasheetIds.includes(id),`emperors-children: source-owned ${id} is absent from audited local ownership`);
for(const id of ['unit-marneus-calgar-in-armour-of-antilochus','unit-intercessor-squad'])expect(ownershipFixture.books['space-marines'].datasheetIds.includes(id),`space-marines: source-owned ${id} is absent from audited local ownership`);
expect(ownershipFixture.books['adeptus-mechanicus'].datasheetIds.includes('unit-thulia-ghuld'),'adeptus-mechanicus: source-owned unit-thulia-ghuld is absent from audited local ownership');

const badPatterns=[
  /\b(?:TYRANIDS|ASTARTES|INFANTRY|VEHICLE|MONSTER|CHARACTER|PSYKER|BATTLELINE|MOUNTED|TRANSPORT)(?:unit|units|model|models|or|and|when)\b/i,
  /\b[A-Za-z]+[a-z](?:Ability|Section)\b/,
  /\b(?:wearer|bearer) of 1\b/i,
  /\*\*|\^\^/,
  /\bAdpetus\b|\bMonsters models\b|\btht\b/
];
const scan=(value,file,trail=[])=>{
  if(trail.at(-1)==='pages')return;
  if(typeof value==='string')for(const pattern of badPatterns)if(pattern.test(value))errors.push(`${file}:${trail.join('.')}: suspicious text ${JSON.stringify(value.slice(0,180))}`);
  else if(Array.isArray(value))value.forEach((item,index)=>scan(item,file,[...trail,index]));
  else if(value&&typeof value==='object')for(const [key,item] of Object.entries(value))scan(item,file,[...trail,key]);
};
for(const id of ['tyranids',...Object.keys(books)]){
  for(const suffix of ['faction-pack.en.json','codex-datasheets.en.json','points.en.json']){
    const file=`books/${id}/content/${id}-${suffix}`;
    if(fs.existsSync(path.join(root,file)))scan(read(file),file);
  }
}
scan(read('glossary/registry.en.json'),'glossary/registry.en.json');

const tyranids=read('books/tyranids/content/tyranids-points.en.json');
for(const [title,labels] of [['Termagants',['10 models','11-20 models']],['Hormagaunts',['10 models','11-20 models']]]){
  const unit=tyranids.units.find(item=>item.title===title);
  expect(JSON.stringify(unit?.points.map(item=>item.label))===JSON.stringify(labels),`tyranids: ${title} model ranges are not explicit`);
  expect(unit?.points.every(item=>Number.isInteger(item.minModels)&&Number.isInteger(item.maxModels)),`tyranids: ${title} points lack structural model ranges`);
}

if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Army Book source QA passed');
