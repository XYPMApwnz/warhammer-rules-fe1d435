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

assert.deepEqual(books.map(book=>catalogs[book].units.length),[101,98,97],'effective SM/DA/BA Datasheet counts');
const smUnitIds=new Set(catalogs['space-marines'].units.map(unit=>unit.id));
const dependencyUnits=book=>catalogs[book].units.filter(unit=>unit.sourceBookId==='space-marines');
assert.deepEqual(['dark-angels','blood-angels'].map(book=>dependencyUnits(book).length),[82,82],'common inherited unit count');
const excluded=book=>[...smUnitIds].filter(id=>!dependencyUnits(book).some(unit=>unit.id===id)).sort();
assert.equal(excluded('dark-angels').length,19,'DA incompatible SM exclusions');
assert.equal(excluded('blood-angels').length,19,'BA incompatible SM exclusions');
assert.deepEqual(excluded('dark-angels'),excluded('blood-angels'),'DA/BA preserve the same dependency filter');
const edges=(catalog,field)=>new Set(catalog.units.flatMap(unit=>(unit.relations?.[field]||[]).map(target=>`${unit.id}>${target.unitId}`)));
for(const [book,expectedAdd] of [['dark-angels',49],['blood-angels',27]]){
  const effectiveIds=new Set(catalogs[book].units.map(unit=>unit.id));
  const baseLead=[...edges(catalogs['space-marines'],'canLead')].filter(edge=>edge.split('>').every(id=>effectiveIds.has(id)));
  const effectiveLead=edges(catalogs[book],'canLead');
  assert.equal(baseLead.filter(edge=>!effectiveLead.has(edge)).length,0,`${book} preserves every available base Leader relation`);
  const adds=['canLead','canSupport'].flatMap(field=>[...edges(catalogs[book],field)].filter(edge=>!edges(catalogs['space-marines'],field).has(edge)));
  assert.equal(adds.length,expectedAdd,`${book} chapter relation ADD count`);
  assert.equal(catalogs[book].units.flatMap(unit=>Object.values(unit.relations||{}).flat()).filter(target=>!effectiveIds.has(target.unitId)).length,0,`${book} unresolved generated relation targets`);
}
const commonDetachments=catalogs['space-marines'].detachments.filter(item=>catalogs['dark-angels'].detachments.some(other=>other.id===item.id)&&catalogs['blood-angels'].detachments.some(other=>other.id===item.id));
assert.equal(commonDetachments.length,16,'common compatible SM Detachments');

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

const provider=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
const builder=fs.readFileSync(path.join(root,'books/shared/tools/build-army-book.mjs'),'utf8');
assert.equal((provider.match(/const smFamilyEffects=new Map/g)||[]).length,1,'one SM-family semantic implementation');
assert.equal((provider.match(/new Set\(smFamilyEffects\.keys\(\)\)/g)||[]).length,3,'all three family books qualify the same nine stable identities');
assert.equal(/\bsmEffects\.get\(normalize\(item\.title\)\)/.test(provider),false,'no title-based SM-family semantic lookup');
assert.equal(/config\.id==='space-marines'&&[^\n]*profile/.test(builder),false,'no SM-only profile propagation');
assert.equal(/config\.id==='dark-angels'&&[^\n]*sourceId/.test(builder),false,'no DA-only source identity propagation');

const familyIdentities=['headhunter-task-force|firestorm-coordinators','firestorm-assault-force|firestorm-assault-force-war-tempered-artifice','gladius-task-force|gladius-task-force-artificer-armour','ironstorm-spearhead|ironstorm-spearhead-the-flesh-is-weak','vanguard-spearhead|vanguard-spearhead-ghostweave-cloak','fulguris-task-force|bellicose-weapon-spirits','fulguris-task-force|raptorial-cogitator-core','subversion-assets|shroud-field','vengeful-hosts|enhancement-orksbane'];
const providerFor=book=>{let registered;const window={document:{documentElement:{dataset:{bookId:book}}},location:{pathname:`/books/${book}/reader.html`},WHBookRosterEnhancements:{registerProvider(value){registered=value;}}},context={window};vm.createContext(context);vm.runInContext(provider,context);assert.ok(registered,`${book} provider registration`);return registered;};
const providers=Object.fromEntries(books.map(book=>[book,providerFor(book)]));
const projected=(book,item,input={ownerStatus:'resolved',ownerUnitId:'owner'})=>{const gameUnit={identity:{instanceId:'owner',canonicalDatasheetId:'unit-captain'},rosterState:{detachments:[item.detachmentId]},selection:{loadout:{selectedWargearAbilityIds:[]}},item:{catalogUnit:{gameSelections:{abilities:[]}}}};return Array.from(providers[book].gameEffects({item:{raw:{id:'owner'}},gameUnit,gameUnits:[gameUnit],enhancements:[{input,catalog:item}]}),effect=>fact(effect));};
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
assert.equal(projected('blood-angels',{...guarded,sourceId:null}).length,0,'missing source identity fails closed');
assert.equal(projected('blood-angels',{...guarded,owner:null}).length,0,'missing owner eligibility fails closed');
assert.equal(projected('blood-angels',{...guarded,assignment:null}).length,0,'missing assignment eligibility fails closed');
assert.equal(projected('blood-angels',guarded,{ownerStatus:'resolved',ownerUnitId:'other'}).length,0,'wrong physical owner fails closed');
assert.equal(projected('blood-angels',{...guarded,detachmentId:'wrong-detachment'}).length,0,'wrong Detachment fails closed');

console.log('SM family normalization QA passed: 59 shared Enhancement records, 23 BA eligibility repairs, stable source identity, Orksbane profile parity and one nine-recipe family implementation.');
