import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(process.env.PEDRO_QA_ROOT||defaultRoot);
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const normalized=values=>values.map(value=>String(value).trim().toUpperCase());
const loadWindow=file=>{const scope={window:{}};vm.runInNewContext(read(file),scope,{filename:file});return scope.window;};
const unitId='unit-pedro-kantor';
const crimson='CRIMSON FISTS';
const imperial='IMPERIAL FISTS';

const codex=json('books/space-marines/content/space-marines-codex-datasheets.en.json');
const canonicalMatches=codex.datasheets.filter(unit=>unit.id===unitId);
assert.equal(canonicalMatches.length,1,'Pedro canonical identity must resolve exactly once');
const canonicalPedro=canonicalMatches[0],canonicalKeywords=normalized(canonicalPedro.keywords||[]);
assert.equal(canonicalKeywords.filter(value=>value===crimson).length,1,'Pedro must have exactly one intrinsic CRIMSON FISTS keyword');
assert.equal(canonicalKeywords.includes(imperial),false,'Pedro must not have intrinsic IMPERIAL FISTS');
for(const unit of codex.datasheets.filter(candidate=>candidate.id!==unitId))assert.equal(normalized(unit.keywords||[]).includes(crimson),false,`${unit.id}: CRIMSON FISTS leaked from Pedro`);

const config=json('books/space-marines/book.config.json');
assert.deepEqual(config.unitCompatibleChapterKeywords?.[unitId],[imperial],'Pedro must have one explicit IMPERIAL FISTS compatibility identity');
assert.deepEqual(Object.keys(config.unitCompatibleChapterKeywords||{}),[unitId],'Chapter compatibility must remain explicit and Pedro-scoped');

const catalogs={};
for(const book of ['space-marines','dark-angels','blood-angels'])catalogs[book]=loadWindow(`books/${book}/scripts/roster-data.js`).WH_BOOK_ROSTER_CATALOG;
const smPedroRows=catalogs['space-marines'].units.filter(unit=>unit.id===unitId);
assert.equal(smPedroRows.length,1,'Space Marines must expose exactly one Pedro catalog record');
assert.equal(new Set(catalogs['space-marines'].units.map(unit=>unit.id)).size,catalogs['space-marines'].units.length,'Space Marines catalog IDs must be unique');
const rosterPedro=smPedroRows[0],rosterKeywords=normalized(rosterPedro.intrinsicKeywords||[]);
assert.equal(rosterKeywords.includes(crimson),true,'Roster Pedro intrinsic identity must include CRIMSON FISTS');
assert.equal(rosterKeywords.includes(imperial),false,'Compatibility must not merge into roster intrinsic keywords');
assert.deepEqual([...rosterPedro.compatibleChapterKeywords],[imperial],'Roster Pedro compatibility metadata');
assert.equal(catalogs['dark-angels'].units.filter(unit=>unit.id===unitId).length,0,'Pedro must remain excluded from Dark Angels');
assert.equal(catalogs['blood-angels'].units.filter(unit=>unit.id===unitId).length,0,'Pedro must remain excluded from Blood Angels');
const baCompatible=json('books/blood-angels/generated/compatible-rules.json');
assert.deepEqual(Object.keys(baCompatible.units).sort(),[...catalogs['blood-angels'].units].map(unit=>unit.id).sort(),'Blood Angels compatible-rules inventory must match the complete effective roster inventory');
assert.equal(Object.hasOwn(baCompatible.units,unitId),false,'Pedro must remain excluded from Blood Angels compatible rules');

const targetData=loadWindow('books/space-marines/scripts/target-data.js').WH_ARMY_BOOK_TARGETS;
const target=targetData.targets[unitId];
assert.ok(target&&Number.isInteger(target.start)&&Number.isInteger(target.end),'Pedro target record must resolve by stable ID');
const targetCard=targetData.html.slice(target.start,target.end);
assert.match(targetCard,/CRIMSON FISTS/i,'Pedro reader card must show intrinsic CRIMSON FISTS');
assert.doesNotMatch(targetCard,/IMPERIAL FISTS/i,'Pedro reader card must not render compatibility as an intrinsic keyword');

const points=loadWindow('roster-guides/points-data.js').WH_POINTS_CATALOG;
const pointPedroRows=Object.values(points['space marines'].units).filter(unit=>unit.id===unitId);
assert.equal(pointPedroRows.length,1,'Roster Guides must expose one Pedro identity');
const pointPedro=pointPedroRows[0],pointKeywords=normalized(pointPedro.intrinsicKeywords||pointPedro.keywords||[]);
assert.equal(pointKeywords.includes(crimson),true,'Roster Guides Pedro intrinsic identity');
assert.equal(pointKeywords.includes(imperial),false,'Roster Guides compatibility must not become intrinsic');
assert.deepEqual([...pointPedro.compatibleChapterKeywords],[imperial],'Roster Guides Pedro compatibility metadata');
assert.deepEqual([...pointPedro.points].map(row=>({...row})),canonicalPedro.points,'Pedro points must remain canonical and unchanged by compatibility metadata');
for(const book of ['dark angels','blood angels'])assert.equal(Object.values(points[book].units).filter(unit=>unit.id===unitId).length,0,`${book}: Pedro compatibility must not leak into dependency inventory`);

const runtime={console,URL,URLSearchParams,CustomEvent:class{constructor(type,init={}){this.type=type;this.detail=init.detail;}},dispatchEvent(){},location:{pathname:'/books/space-marines/reader.html',search:''},document:{documentElement:{dataset:{bookId:'space-marines'}}}};
runtime.window=runtime;runtime.globalThis=runtime;runtime.WHBookRosterEnhancements={registerProvider(provider){runtime.provider=provider;}};
for(const file of ['books/space-marines/scripts/roster-data.js','books/shared/roster-context.js','books/extensions/book-roster-enhancement-providers.js'])vm.runInNewContext(read(file),runtime,{filename:file});
const roster={faction:'Space Marines',units:[{id:'pedro-physical-1',canonicalUnitId:unitId,name:'Pedro Kantor',quantity:1,wargear:''},{id:'sternguard-physical-1',canonicalUnitId:'unit-sternguard-veteran-squad',name:'Sternguard Veteran Squad',quantity:5,wargear:''}],detachments:[],enhancements:[]};
const game=runtime.WHArmyRosterContext.project({catalog:runtime.WH_BOOK_ROSTER_CATALOG,provider:runtime.provider,roster,record:{id:'pedro-qa',attachments:{}}}).game;
assert.deepEqual([...game.units].map(unit=>unit.identity.instanceId),['pedro-physical-1','sternguard-physical-1'],'Physical instance identities must remain distinct');
const projectedPedro=game.units.find(unit=>unit.identity.canonicalDatasheetId===unitId),projectedKeywords=normalized(projectedPedro.rosterState.keywordProfile.intrinsic||[]);
assert.equal(projectedKeywords.includes(crimson),true,'Runtime Pedro intrinsic CRIMSON FISTS');
assert.equal(projectedKeywords.includes(imperial),false,'Generic intrinsic selector must not match merely because of compatibility metadata');
assert.equal(normalized(projectedPedro.rosterState.keywordProfile.added||[]).includes(imperial),false,'Compatibility must not be granted as a runtime keyword');
const sternguard=game.units.find(unit=>unit.identity.canonicalDatasheetId==='unit-sternguard-veteran-squad');
const inspiring=sternguard.effects.filter(effect=>effect.canonicalReference?.id==='space-marines-ability-inspiring-commander-5');
assert.equal(inspiring.length,1,'Inspiring Commander must emit exactly once');
assert.equal(inspiring[0].operation,'reference','Inspiring Commander must remain reference-only');
assert.equal(inspiring[0].canonicalReference.kind,'ability','Inspiring Commander canonical reference kind');
assert.equal(inspiring[0].source.ownerInstanceId,'pedro-physical-1','Inspiring Commander must remain instance-scoped to Pedro');
assert.equal(inspiring[0].targetInstanceId,'sternguard-physical-1','Inspiring Commander target instance');

console.log('Pedro Kantor identity/compatibility QA: PASS');
