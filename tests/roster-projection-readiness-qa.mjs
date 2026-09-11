import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../books/shared/roster-context.js',import.meta.url),'utf8');
const scope={window:{},URL,URLSearchParams};
vm.runInNewContext(source,scope,{filename:'roster-context.js'});
const api=scope.window.WHArmyRosterContext;

const catalog={
  schema:api.CATALOG_SCHEMA,
  book:{id:'fixture',title:'Fixture Book',factionKeyword:'FIXTURE FACTION',parentBookId:null,dependencies:[]},
  units:[
    {id:'unit-alpha',title:'Shared Name',sourceBookId:'fixture',intrinsicKeywords:['INFANTRY','CHARACTER']},
    {id:'unit-beta',title:'Shared Name',sourceBookId:'fixture',intrinsicKeywords:['VEHICLE']},
    {id:'unit-gamma',title:'Unique Name',sourceBookId:'fixture',intrinsicKeywords:['INFANTRY']}
  ],
  detachments:[],
  enhancements:[
    {id:'enhancement-ambiguous-a',title:'Shared Enhancement',detachmentId:'detachment-alpha'},
    {id:'enhancement-ambiguous-b',title:'Shared Enhancement',detachmentId:'detachment-alpha'},
    {id:'enhancement-unique',title:'Unique Enhancement',detachmentId:'detachment-beta'}
  ]
};
const roster=units=>({faction:'Fixture Faction',units,detachments:[],enhancements:[],warnings:[]});

const explicit=api.project({catalog,roster:roster([
  {id:'physical-alpha-1',canonicalUnitId:'unit-alpha',name:'Shared Name'},
  {id:'physical-alpha-2',canonicalUnitId:'unit-alpha',name:'Shared Name'}
])});
assert.equal(explicit.context.status,'ready','exact canonical projection is not ready');
assert.deepEqual([...explicit.context.units.map(unit=>unit.instanceId)],['physical-alpha-1','physical-alpha-2'],'physical instances collapsed into canonical identity');
assert.equal(explicit.context.units.every(unit=>unit.canonicalDatasheetId==='unit-alpha'),true,'exact canonical Datasheet identity changed');
assert.notEqual(explicit.context.units[0].instanceId,explicit.context.units[0].canonicalDatasheetId,'physical instance ID became the canonical Datasheet ID');
assert.deepEqual([...explicit.context.units[0].keywordProfile.intrinsic],['INFANTRY','CHARACTER'],'canonical intrinsic facts were not preserved');
assert.equal(explicit.context.units[0].keywordProfile.intrinsic.includes('FIXTURE FACTION'),false,'compatibility metadata became an intrinsic keyword');

const unique=api.project({catalog,roster:roster([{id:'physical-gamma',name:'Unique Name'}])});
assert.equal(unique.context.status,'ready','unique title projection is not ready');
assert.equal(unique.context.units[0].canonicalDatasheetId,'unit-gamma','unique title did not resolve canonically');

const ambiguous=api.project({catalog,roster:roster([{id:'physical-ambiguous',name:'Shared Name'}])});
assert.equal(ambiguous.context.status,'unknown','ambiguous title projection was marked ready');
assert.equal(ambiguous.context.units.length,0,'ambiguous title inherited an arbitrary canonical Datasheet');
assert.equal(ambiguous.unitsByCanonical.size,0,'ambiguous physical unit entered the canonical index');

const staleExplicit=api.project({catalog,roster:roster([{id:'physical-stale',canonicalUnitId:'unit-missing',name:'Unique Name'}])});
assert.equal(staleExplicit.context.status,'unknown','unknown explicit canonical ID fell back to a title');
assert.equal(staleExplicit.context.units.length,0,'unknown explicit canonical ID inherited title facts');

const unknownCompatibility=api.project({catalog,roster:{units:[{id:'physical-unknown-faction',canonicalUnitId:'unit-gamma',name:'Unique Name'}],detachments:[],enhancements:[],warnings:[]}});
assert.equal(unknownCompatibility.compatibility.state,'unknown','missing roster faction identity was invented');
assert.equal(unknownCompatibility.context.status,'unknown','unknown compatibility was marked ready');
assert.equal(unknownCompatibility.context.units.length,1,'known canonical unit facts were discarded with unknown compatibility');
assert.deepEqual([...unknownCompatibility.context.units[0].keywordProfile.intrinsic],['INFANTRY'],'intrinsic facts did not survive an unknown readiness state');

const enhancementRoster=(name,detachments=[])=>({faction:'Fixture Faction',units:[{id:'physical-gamma',canonicalUnitId:'unit-gamma',name:'Unique Name'}],detachments,enhancements:[{name,ownerUnitId:'physical-gamma',ownerStatus:'resolved',source:'raw/source-unverified'}],warnings:[]});
const ambiguousEnhancement=api.project({catalog,roster:enhancementRoster('Shared Enhancement',[{id:'detachment-alpha',name:'Alpha'}])});
assert.equal(ambiguousEnhancement.context.status,'unknown','ambiguous Enhancement projection was marked ready');
assert.equal(ambiguousEnhancement.context.enhancements[0].id,'Shared Enhancement','ambiguous Enhancement inherited candidate zero identity');
assert.equal(ambiguousEnhancement.context.enhancements[0].detachmentId,null,'ambiguous Enhancement inherited candidate zero Detachment');
assert.equal(ambiguousEnhancement.context.enhancements[0].owner.state,'unresolved','ambiguous Enhancement ownership was marked resolved');
assert.equal(ambiguousEnhancement.context.enhancements[0].sourceCoverage,'sourceLimited','ambiguous Enhancement source confidence was discarded');
assert.equal(ambiguousEnhancement.context.enhancements[0].ownerEligibility,'unavailable','source confidence became a legality decision');
assert.equal(ambiguousEnhancement.units[0].context.enhancements[0].id,'Shared Enhancement','ambiguous owned Enhancement inherited candidate zero identity');
assert.equal(ambiguousEnhancement.units[0].context.enhancements[0].status,'unresolved','ambiguous owned Enhancement resolution was marked resolved');
assert.equal(ambiguousEnhancement.enhancements.length,0,'ambiguous Enhancement entered the active projection');
assert.equal(ambiguousEnhancement.sourceRoster.enhancements[0].source,'raw/source-unverified','ambiguous Enhancement source confidence was discarded');

const uniqueEnhancement=api.project({catalog,roster:enhancementRoster('Unique Enhancement')});
assert.equal(uniqueEnhancement.context.enhancements[0].id,'enhancement-unique','unique Enhancement did not resolve canonically');
assert.equal(uniqueEnhancement.context.enhancements[0].detachmentId,'detachment-beta','unique Enhancement canonical facts were discarded');
assert.equal(uniqueEnhancement.context.enhancements[0].owner.state,'resolved','unique Enhancement ownership did not remain resolved');

console.log('Roster projection readiness QA: PASS (exact/unique positive, ambiguous/stale/unknown negative, physical isolation)');
