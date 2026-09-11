import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync('books/shared/roster-parser.js','utf8'),context,{filename:'books/shared/roster-parser.js'});
const {parse}=context.window.WHRosterParser;

const valid=parse(`+ FACTION KEYWORD: Xenos - Tyranids
+ BATTLE SIZE: 2. Incursion (1,000 Point limit)
+ DETACHMENT: Invasion Fleet (Hyper-aggression)
+ TOTAL ARMY POINTS: 1,000pts
+ WARLORD: Char1: Hive Tyrant
+ ENHANCEMENT: Adaptive Biology (on Char1: Hive Tyrant)
+ NUMBER OF UNITS: 2

Char1: 1x Hive Tyrant (900 pts): Warlord, Heavy venom cannon
Enhancement: Adaptive Biology (+25 pts)
1x Termagants (100 pts)
• 10x Termagant
  10 with Fleshborer, Chitinous claws and teeth`);
assert.equal(valid.faction,'Xenos - Tyranids');
assert.equal(valid.declared,1000,'grouped declared points');
assert.equal(valid.pointsLimit,1000,'grouped battle-size point limit');
assert.equal(valid.unitLineTotal,1000);
assert.equal(valid.exportMatches,true);
assert.equal(valid.units.length,2);
assert.deepEqual(Array.from(valid.units,unit=>unit.id),['parsed-unit-1','parsed-unit-2'],'physical instance identity remains ordinal and unique');
assert.equal(valid.units[0].warlord,true,'header and inline Warlord metadata resolve to one physical unit');
assert.equal(valid.units[1].warlord,false,'resolved Warlord metadata excludes other physical units');
assert.equal(valid.units[0].wargear,'Heavy venom cannon','Warlord marker is metadata, not wargear');
assert.equal(valid.units[1].models[0].quantity,10);
assert.equal(valid.enhancements.length,1);
assert.equal(valid.enhancements[0].ownerUnitId,'parsed-unit-1');
assert.equal(valid.enhancements[0].ownerStatus,'resolved');
assert.deepEqual(Array.from(valid.warnings),[]);

const conflictingOwner=parse(`FACTION KEYWORD: Tyranids
+ ENHANCEMENT: Adaptive Biology (on Char1: Neurotyrant)
Char1: 1x Hive Tyrant (100 pts)`);
assert.equal(conflictingOwner.enhancements[0].ownerStatus,'ambiguous','conflicting source reference and label must fail closed');
assert.equal(conflictingOwner.enhancements[0].ownerUnitId,'');
assert.deepEqual(Array.from(conflictingOwner.enhancements[0].ownerCandidates),['Hive Tyrant','Neurotyrant']);
assert.match(conflictingOwner.warnings.join('\n'),/ambiguous or conflicting/i);

const duplicateSource=parse(`FACTION KEYWORD: Tyranids
+ ENHANCEMENT: Adaptive Biology (on Char1: Hive Tyrant)
Char1: 1x Hive Tyrant (100 pts)
Char1: 1x Neurotyrant (105 pts)`);
assert.equal(duplicateSource.enhancements[0].ownerStatus,'ambiguous','duplicate source references must not select the last unit');
assert.equal(duplicateSource.enhancements[0].ownerUnitId,'');
assert.match(duplicateSource.warnings.join('\n'),/source reference identifies multiple units/i);
assert.deepEqual(Array.from(duplicateSource.units,unit=>unit.id),['parsed-unit-1','parsed-unit-2'],'ambiguous source metadata must not collapse physical instances');

const badTotal=parse(`FACTION KEYWORD: Tyranids
+ BATTLE SIZE: Incursion (1,00 Point limit)
+ TOTAL ARMY POINTS: 1,00pts
1x Hive Tyrant (100 pts)`);
assert.equal(badTotal.declared,0,'malformed grouped totals must not be partially parsed');
assert.equal(badTotal.pointsLimit,null,'malformed grouped point limits must not be partially parsed or inferred');
assert.equal(badTotal.exportMatches,false);
assert.match(badTotal.warnings.join('\n'),/Total army points could not be parsed/i);
assert.match(badTotal.warnings.join('\n'),/Battle size point limit could not be parsed/i);

const conflictingWarlord=parse(`FACTION KEYWORD: Tyranids
+ WARLORD: Char1: Hive Tyrant
Char1: 1x Hive Tyrant (100 pts): Heavy venom cannon
Char2: 1x Neurotyrant (105 pts): Warlord, Psychic scream`);
assert.deepEqual(Array.from(conflictingWarlord.units,unit=>unit.warlord),[null,null],'conflicting Warlord metadata must fail closed');
assert.equal(conflictingWarlord.units[1].wargear,'Psychic scream');
assert.match(conflictingWarlord.warnings.join('\n'),/Warlord metadata is ambiguous or conflicting/i);

const headerWarlord=parse(`FACTION KEYWORD: Tyranids
+ WARLORD: Char1: Hive Tyrant
Char1: 1x Hive Tyrant (100 pts): Heavy venom cannon
1x Termagants (60 pts)`);
assert.deepEqual(Array.from(headerWarlord.units,unit=>unit.warlord),[true,false],'Warlord header alone resolves one physical unit');

const modelWarlord=parse(`FACTION KEYWORD: Tyranids
1x Winged Hive Tyrant (180 pts)
• 1x Winged Hive Tyrant
1 with Tyrant talons, Monstrous bonesword and lash whip, Warlord`);
assert.equal(modelWarlord.units[0].warlord,true,'model-level Warlord marker resolves to its physical unit');
assert.equal(modelWarlord.units[0].models[0].loadouts[0].wargear,'Tyrant talons, Monstrous bonesword and lash whip');

const standaloneWarlord=parse(`FACTION KEYWORD: Tyranids
1x Hive Tyrant (100 pts): Heavy venom cannon
• Warlord`);
assert.equal(standaloneWarlord.units[0].warlord,true,'standalone Warlord marker resolves to the current physical unit');

const parentheticalUnit=parse('1x Captain (Terminator Armour) (95 pts)');
assert.equal(parentheticalUnit.units[0].name,'Captain (Terminator Armour)','parentheses inside valid unit names remain supported');

const whitespaceHeavyNearMatch=parse(`1x ${' '.repeat(8192)}X`);
assert.equal(whitespaceHeavyNearMatch.units.length,0,'whitespace-heavy unit near-match is rejected without ambiguous name/separator work');

console.log('Shared roster parser robustness QA: PASS');
