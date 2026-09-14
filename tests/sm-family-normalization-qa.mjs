import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=['space-marines','dark-angels','blood-angels'];
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const load=book=>{const context={window:{}};vm.createContext(context);for(const file of ['scripts/roster-data.js','scripts/target-data.js'])vm.runInContext(fs.readFileSync(path.join(root,'books',book,file),'utf8'),context);return context.window;};
const data=Object.fromEntries(books.map(book=>[book,load(book)]));
const catalogs=Object.fromEntries(books.map(book=>[book,data[book].WH_BOOK_ROSTER_CATALOG]));
const enhancements=Object.fromEntries(books.map(book=>[book,Object.values(data[book].WH_BOOK_ROSTER_ENHANCEMENTS)]));
const key=item=>`${item.detachmentId}|${normalize(item.title)}`;
const maps=Object.fromEntries(books.map(book=>[book,new Map(enhancements[book].map(item=>[key(item),item]))]));
const shared=[...maps['space-marines'].keys()].filter(id=>maps['dark-angels'].has(id)&&maps['blood-angels'].has(id));
assert.equal(shared.length,59,'SM-family shared Enhancement set');

assert.deepEqual(books.map(book=>catalogs[book].units.length),[103,100,99],'effective SM/DA/BA Datasheet counts');
const smUnitIds=new Set(catalogs['space-marines'].units.map(unit=>unit.id));
const dependencyUnits=book=>catalogs[book].units.filter(unit=>unit.sourceBookId==='space-marines');
assert.deepEqual(['dark-angels','blood-angels'].map(book=>dependencyUnits(book).length),[84,84],'common inherited unit count');
const excluded=book=>[...smUnitIds].filter(id=>!dependencyUnits(book).some(unit=>unit.id===id)).sort();
assert.equal(excluded('dark-angels').length,19,'DA incompatible SM exclusions');
assert.equal(excluded('blood-angels').length,19,'BA incompatible SM exclusions');
assert.deepEqual(excluded('dark-angels'),excluded('blood-angels'),'DA/BA preserve the same dependency filter');
const edges=(catalog,field)=>new Set(catalog.units.flatMap(unit=>(unit.relations?.[field]||[]).map(target=>`${unit.id}>${target.unitId}`)));
const daDependencySupportAdds=new Set([
  'unit-ancient>unit-inner-circle-companions',
  'unit-apothecary>unit-inner-circle-companions',
  'unit-lieutenant>unit-inner-circle-companions',
  'unit-ancient-in-terminator-armor>unit-deathwing-knights',
  'unit-ancient-in-terminator-armor>unit-deathwing-terminator-squad'
]);
assert.deepEqual([...daDependencySupportAdds].filter(edge=>!edges(catalogs['dark-angels'],'canSupport').has(edge)),[],'DA dependency Support overlays');
for(const book of ['space-marines','blood-angels'])assert.deepEqual([...daDependencySupportAdds].filter(edge=>edges(catalogs[book],'canSupport').has(edge)),[],`${book} rejects DA-local Support overlays`);
for(const [book,baseChapterAdds] of [['dark-angels',50],['blood-angels',27]]){
  const effectiveIds=new Set(catalogs[book].units.map(unit=>unit.id));
  const baseLead=[...edges(catalogs['space-marines'],'canLead')].filter(edge=>edge.split('>').every(id=>effectiveIds.has(id)));
  const effectiveLead=edges(catalogs[book],'canLead');
  assert.equal(baseLead.filter(edge=>!effectiveLead.has(edge)).length,0,`${book} preserves every available base Leader relation`);
  const adds=['canLead','canSupport'].flatMap(field=>[...edges(catalogs[book],field)].filter(edge=>!edges(catalogs['space-marines'],field).has(edge)));
  const dependencySupportCount=book==='dark-angels'?daDependencySupportAdds.size:0;
  assert.equal(adds.length-dependencySupportCount,baseChapterAdds,`${book} base chapter relation ADD composition`);
  assert.equal(catalogs[book].units.flatMap(unit=>Object.values(unit.relations||{}).flat()).filter(target=>!effectiveIds.has(target.unitId)).length,0,`${book} unresolved generated relation targets`);
}
const commonDetachments=catalogs['space-marines'].detachments.filter(item=>catalogs['dark-angels'].detachments.some(other=>other.id===item.id)&&catalogs['blood-angels'].detachments.some(other=>other.id===item.id));
assert.equal(commonDetachments.length,16,'common compatible SM Detachments');
const stormlance=book=>{const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'books',book,'scripts/target-data.js'),'utf8'),context);const html=JSON.stringify(context.window.WH_ARMY_BOOK_TARGETS.html);return Number(html.match(/Stormlance Task Force<span class=\\"detachment-dp\\">(\d+)DP/)?.[1]);};
assert.notEqual(stormlance('space-marines'),2,'SM Stormlance value unchanged');
assert.notEqual(stormlance('dark-angels'),2,'DA Stormlance value unchanged');
assert.equal(stormlance('blood-angels'),2,'BA Stormlance override preserved');

const fact=value=>JSON.parse(JSON.stringify(value??null));
const canonicalSourceId=(item,book)=>item.sourceId||(book==='space-marines'?item.ruleId:null);
for(const id of shared){
  const sm=maps['space-marines'].get(id);
  for(const book of ['dark-angels','blood-angels']){
    const inherited=maps[book].get(id);
    assert.equal(canonicalSourceId(inherited,book),canonicalSourceId(sm,'space-marines'),`${book} ${id} canonical source identity`);
    assert.equal(normalize(inherited.title),normalize(sm.title),`${book} ${id} title`);
    assert.equal(normalize(inherited.text),normalize(sm.text),`${book} ${id} canonical text`);
    assert.equal(inherited.detachmentId,sm.detachmentId,`${book} ${id} Detachment scope`);
    assert.equal(inherited.value,sm.value,`${book} ${id} points`);
    assert.deepEqual(fact(inherited.profile),fact(sm.profile),`${book} ${id} profile`);
    assert.deepEqual(fact(inherited.owner),fact(sm.owner),`${book} ${id} owner eligibility`);
    assert.deepEqual(fact(inherited.assignment),fact(sm.assignment),`${book} ${id} assignment eligibility`);
  }
}

const formerlyMissing=['Adept of the Codex','Adept of the Omnissiah','Architect of War','Artificer Armour','Champion of Humanity','Execute and Redeploy','Feinting Withdrawal','Fire Discipline','Fleet Commander','Fury of the Storm','Ghostweave Cloak','Indomitable Fury','Iron Resolve','Master of Machine War','Portents of Wisdom','Rites of War','Shadow War Veteran','Stoic Defender','Target Augury Web','The Blade Driven Deep','The Flesh Is Weak','The Honour Vehement','The Imperium’s Sword'];
for(const title of formerlyMissing){const item=enhancements['blood-angels'].find(value=>normalize(value.title)===normalize(title));assert.ok(item,`BA inherited ${title}`);assert.ok(item.sourceId,`BA ${title} source identity`);assert.ok(item.owner,`BA ${title} owner`);assert.ok(item.assignment,`BA ${title} assignment`);}

const orksbane=book=>enhancements[book].find(item=>normalize(item.title)==='orksbane'&&item.detachmentId==='vengeful-hosts');
for(const book of books){assert.ok(orksbane(book)?.profile,`${book} Orksbane profile`);assert.equal(canonicalSourceId(orksbane(book),book),canonicalSourceId(orksbane('space-marines'),'space-marines'),`${book} Orksbane identity`);}
assert.deepEqual(fact(orksbane('dark-angels').profile),fact(orksbane('space-marines').profile),'DA Orksbane profile parity');
assert.deepEqual(fact(orksbane('blood-angels').profile),fact(orksbane('space-marines').profile),'BA Orksbane profile parity');
for(const book of books){
  assert.equal(orksbane(book).profile.characteristics.D,'3',`${book} Orksbane structured Damage`);
  const html=data[book].WH_ARMY_BOOK_TARGETS.html,start=html.indexOf('data-rule-id="enhancement-orksbane"'),surface=html.slice(start,html.indexOf('</article>',start));
  assert.match(surface,/Melee 4 2\+ 8 -2 3/,`${book} Orksbane visible row must retain Damage 3`);
}

const provider=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
const builder=fs.readFileSync(path.join(root,'books/shared/tools/build-army-book.mjs'),'utf8');
assert.equal((provider.match(/smFamilyEffects|war-tempered-artifice|bellicose-weapon-spirits/g)||[]).length,0,'SM-family provider must not retain factual recipes');
assert.match(provider,/WHEffectContractRuntime\?\.project\?\.\(context\)/,'SM-family provider must delegate to the shared effect interpreter');
assert.equal(/\bsmEffects\.get\(normalize\(item\.title\)\)/.test(provider),false,'no title-based SM-family semantic lookup');
assert.equal(/config\.id==='space-marines'&&[^\n]*profile/.test(builder),false,'no SM-only profile propagation');
assert.equal(/config\.id==='dark-angels'&&[^\n]*sourceId/.test(builder),false,'no DA-only source identity propagation');

const familyIdentities=['headhunter-task-force|firestorm-coordinators','firestorm-assault-force|firestorm-assault-force-war-tempered-artifice','gladius-task-force|gladius-task-force-artificer-armour','ironstorm-spearhead|ironstorm-spearhead-the-flesh-is-weak','vanguard-spearhead|vanguard-spearhead-ghostweave-cloak','fulguris-task-force|bellicose-weapon-spirits','fulguris-task-force|raptorial-cogitator-core','subversion-assets|shroud-field','vengeful-hosts|enhancement-orksbane'];
const providerFor=book=>{let registered;const window={document:{documentElement:{dataset:{bookId:book}}},location:{pathname:`/books/${book}/reader.html`},WH_BOOK_ROSTER_CATALOG:catalogs[book],WHBookRosterEnhancements:{registerProvider(value){registered=value;}}},context={window};context.globalThis=window;vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'books/shared/effect-contract-runtime.js'),'utf8'),context);vm.runInContext(provider,context);assert.ok(registered,`${book} provider registration`);return registered;};
const providers=Object.fromEntries(books.map(book=>[book,providerFor(book)]));
const projected=(book,item,input={ownerStatus:'resolved',ownerUnitId:'owner'})=>{const canonicalId=canonicalSourceId(item,book),contract=catalogs[book].effectContracts.find(value=>value.canonicalRecordId===canonicalId),unitId=contract?.selector?.unitIds?.[0]||'unit-captain',catalogUnit=catalogs[book].units.find(unit=>unit.id===unitId),keywords=catalogUnit.intrinsicKeywords||[],gameUnit={identity:{instanceId:'owner',canonicalDatasheetId:unitId},attachments:{leading:[],leaders:[]},rosterState:{detachments:[item.detachmentId],keywordProfile:{intrinsic:keywords,effective:keywords}},selection:{loadout:{selectedWargearAbilityIds:[],selectedProfileIds:[]}},item:{catalogUnit}};return Array.from(providers[book].gameEffects({item:{raw:{id:'owner'}},gameUnit,gameUnits:[gameUnit],byInstance:new Map([['owner',gameUnit]]),enhancements:[{input,catalog:item}]})).filter(effect=>effect.source?.id===canonicalId).map(effect=>fact(effect));};
const signature=effects=>effects.map(effect=>({component:effect.component,targetId:effect.targetId,operation:effect.operation,delta:effect.delta??null,to:effect.to??null,tag:effect.tag??null,title:effect.title??null,profile:effect.profile??null,state:effect.state??null,certainty:effect.certainty??null}));
for(const identity of familyIdentities){
  const records=Object.fromEntries(books.map(book=>[book,enhancements[book].find(item=>`${item.detachmentId}|${canonicalSourceId(item,book)}`===identity)]));
  for(const book of books)assert.ok(records[book],`${book} ${identity} stable record`);
  const outputs=Object.fromEntries(books.map(book=>[book,projected(book,records[book])]));
  for(const book of books)assert.equal(Boolean(outputs[book].length),identity!=='fulguris-task-force|bellicose-weapon-spirits',`${book} ${identity} qualified emission`);
  assert.deepEqual(signature(outputs['dark-angels']),signature(outputs['space-marines']),`DA ${identity} algorithm parity`);
  assert.deepEqual(signature(outputs['blood-angels']),signature(outputs['space-marines']),`BA ${identity} algorithm parity`);
}
const guarded=enhancements['blood-angels'].find(item=>`${item.detachmentId}|${item.sourceId}`===familyIdentities[0]);
assert.equal(projected('blood-angels',guarded,{ownerStatus:'resolved',ownerUnitId:'other'}).length,0,'wrong physical owner fails closed');
assert.equal(projected('blood-angels',{...guarded,detachmentId:'wrong-detachment'}).length,0,'wrong Detachment fails closed');

console.log('SM family normalization QA passed: 59 shared Enhancement records, 23 BA eligibility repairs, stable source identity, Orksbane profile parity and one shared canonical effect interpreter.');
