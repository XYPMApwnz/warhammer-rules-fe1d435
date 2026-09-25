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
const pointSemantics=rows=>rows.map(({label,value,minModels,maxModels})=>({label,value,minModels,maxModels}));
assert.deepEqual(pointSemantics([...pointPedro.points]),pointSemantics(canonicalPedro.points),'Pedro point values and model schedules must remain canonical and unchanged by compatibility metadata');
assert.deepEqual([...pointPedro.points].map(row=>row.sourceLabel),canonicalPedro.points.map(row=>row.sourceLabel||row.label),'Pedro point source labels must preserve accepted source metadata');
for(const book of ['dark angels','blood angels'])assert.equal(Object.values(points[book].units).filter(unit=>unit.id===unitId).length,0,`${book}: Pedro compatibility must not leak into dependency inventory`);

const runtime={console,URL,URLSearchParams,CustomEvent:class{constructor(type,init={}){this.type=type;this.detail=init.detail;}},dispatchEvent(){},location:{pathname:'/books/space-marines/reader.html',search:''},document:{documentElement:{dataset:{bookId:'space-marines'}}}};
runtime.window=runtime;runtime.globalThis=runtime;runtime.WHBookRosterEnhancements={registerProvider(provider){runtime.provider=provider;}};
for(const file of ['books/space-marines/scripts/roster-data.js','books/shared/roster-context.js','books/shared/effect-contract-runtime.js','books/extensions/book-roster-enhancement-providers.js'])vm.runInNewContext(read(file),runtime,{filename:file});
const catalog=runtime.WH_BOOK_ROSTER_CATALOG,rawUnit=(instanceId,canonicalUnitId,quantity=1)=>{const unit=catalog.units.find(item=>item.id===canonicalUnitId);assert.ok(unit,`Unknown fixture unit ${canonicalUnitId}`);return{id:instanceId,canonicalUnitId,name:unit.title,quantity,wargear:''};};
const project=(id,units,attachments={})=>runtime.WHArmyRosterContext.project({catalog,provider:runtime.provider,roster:{faction:'Space Marines',units,detachments:[],enhancements:[]},record:{id,attachments}}).game;
const pedro=rawUnit('pedro-physical-1',unitId),sternguardInput=rawUnit('sternguard-physical-1','unit-sternguard-veteran-squad',5),game=project('pedro-qa',[pedro,sternguardInput],{'sternguard-physical-1':['pedro-physical-1']});
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
assert.notEqual(inspiring[0].source.ownerInstanceId,inspiring[0].targetInstanceId,'Sternguard Bodyguard must not become the Inspiring Commander source');
const inspiringAbility=rosterPedro.gameSelections.abilities.find(item=>item.id==='space-marines-ability-inspiring-commander-5');
assert.equal(inspiring[0].canonicalReference.text,inspiringAbility.text,'Inspiring Commander runtime text must resolve from Pedro canonical ability');
assert.match(inspiring[0].canonicalReference.text,/Objective Control characteristic of 2 while they are not Battle-shocked/i,'Inspiring Commander accepted gameplay result');
const withoutPedro=project('pedro-absent',[rawUnit('sternguard-alone','unit-sternguard-veteran-squad',5)]).units[0];
assert.equal(withoutPedro.effects.some(effect=>effect.canonicalReference?.id==='space-marines-ability-inspiring-commander-5'),false,'Inspiring Commander must remain inactive when Pedro is absent');
const unrelated=project('pedro-unrelated',[rawUnit('pedro-unrelated-source',unitId),rawUnit('intercessor-unrelated','unit-intercessor-squad',5)]).units.find(unit=>unit.identity.instanceId==='intercessor-unrelated');
assert.equal(unrelated.effects.some(effect=>effect.source?.id==='space-marines-ability-inspiring-commander-5'),false,'Unrelated unit must not satisfy the Pedro target binding');

const explicitSourceContracts=catalog.effectContracts.filter(contract=>contract.sourceUnitId||contract.sourceUnitIds?.length||contract.selector?.sourceUnitId||contract.selector?.sourceUnitIds?.length);
const collisionProne=explicitSourceContracts.filter(contract=>{const declared=new Set([contract.sourceUnitId,...(contract.sourceUnitIds||[]),contract.selector?.sourceUnitId,...(contract.selector?.sourceUnitIds||[])].filter(Boolean));return (contract.selector?.unitIds||[]).some(id=>!declared.has(id));});
assert.equal(collisionProne.length,7,'Explicit source/target collision-family inventory drift');
for(const [index,contract] of collisionProne.entries()){
  const sourceId=contract.sourceUnitId||(contract.sourceUnitIds||[])[0]||contract.selector?.sourceUnitId||(contract.selector?.sourceUnitIds||[])[0],targetId=contract.selector.unitIds[0],sourceInstance=`owner-${index}`,targetInstance=`target-${index}`,projected=project(`explicit-source-${index}`,[rawUnit(sourceInstance,sourceId),rawUnit(targetInstance,targetId)]),target=projected.units.find(unit=>unit.identity.instanceId===targetInstance),operationIds=new Set(contract.clauses.flatMap(clause=>clause.operations.map(operation=>operation.id))),effects=target.effects.filter(effect=>operationIds.has(effect.id));
  assert.ok(effects.length,`${contract.canonicalRecordId}: explicit source fixture emitted no effects`);
  assert.ok(effects.every(effect=>effect.source.ownerInstanceId===sourceInstance),`${contract.canonicalRecordId}: target displaced explicit source owner`);
  assert.ok(effects.every(effect=>effect.source.ownerInstanceId!==targetInstance),`${contract.canonicalRecordId}: target became its own factual source`);
  const absent=project(`explicit-source-absent-${index}`,[rawUnit(`target-only-${index}`,targetId)]).units[0];
  assert.equal(absent.effects.some(effect=>operationIds.has(effect.id)),false,`${contract.canonicalRecordId}: effect remained active without explicit source`);
}

console.log(`Pedro Kantor identity/compatibility QA: PASS (${explicitSourceContracts.length} explicit source paths examined; ${collisionProne.length} collision-prone paths behaviorally controlled)`);
