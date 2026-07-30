import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};
vm.createContext(context);
for(const file of ['books/shared/roster-parser.js','books/shared/rule-facts.js','roster-guides/points-data.js','roster-guides/points-validator.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const {WHRosterParser,WH_POINTS_CATALOG,WHRosterPoints}=context.window;
assert.equal(Object.keys(WH_POINTS_CATALOG['death guard'].units).length,41);
assert.equal(new Set(Object.values(WH_POINTS_CATALOG['death guard'].enhancements).map(item=>item.id)).size,30);
assert.equal(Object.keys(WH_POINTS_CATALOG['adeptus mechanicus'].units).length,38);
assert.equal(new Set(Object.values(WH_POINTS_CATALOG['adeptus mechanicus'].enhancements).map(item=>item.title)).size,34);
assert.equal(Object.keys(WH_POINTS_CATALOG['t au empire'].units).length,63);
assert.equal(new Set(Object.values(WH_POINTS_CATALOG['t au empire'].enhancements).map(item=>item.title)).size,23);
assert.equal(WH_POINTS_CATALOG['death guard'].units['death guard possessed'].points[0].value,155);
assert.equal(WH_POINTS_CATALOG['death guard'].units['death guard chaos lord'].points[0].value,65);
assert.equal(WH_POINTS_CATALOG['death guard'].units['death guard chaos lord in terminator armour'].points[0].value,85);
assert.equal(WH_POINTS_CATALOG['death guard'].units['death guard cultists'].points[1].value,100);
assert.equal(WH_POINTS_CATALOG['death guard'].units['death guard sorcerer in terminator armour'].points[0].value,70);

const common=(declared,header,lordPoints)=>`+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: Chaos - Death Guard
+ DETACHMENT: Virulent Vectorium (Worldblight)
+ FORCE DISPOSITION: Priority Assets
+ TOTAL ARMY POINTS: ${declared}pts
+ ENHANCEMENT: ${header} (on Char2: Lord of Contagion)
+ NUMBER OF UNITS: 9
++++++++++++++++++++++++++++++++++++++++++++++
Char1: 1x Biologus Putrifier (60 pts): Hyper blight grenades, Injector pistol, Plague knives
Char2: 1x Lord of Contagion (${lordPoints} pts): Manreaper
Enhancement: ${header} (+${lordPoints-120} pts)
Char3: 1x Malignant Plaguecaster (60 pts): Bolt pistol, Corrupted staff, Plague Wind
10x Plague Marines (180 pts)
• 9x Plague Marine
    1 with Boltgun, Plague knives
    2 with Plague knives, Plague spewer
    4 with Heavy plague weapon, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Plasma gun, Power fist
1x Chaos Rhino (75 pts): Armoured tracks, Combi-bolter
3x Deathshroud Terminators (160 pts)
• 1x Deathshroud Terminator Champion: Manreaper, Plaguespurt gauntlet
• 2x Deathshroud Terminator: 2 with Manreaper, Plaguespurt gauntlet
1x Foetid Bloat-drone (100 pts): Plague probe, Fleshmower
1x Foetid Bloat-drone with heavy blight launcher (140 pts): Heavy blight launcher, Plague probe
Enhancement: Parasitic Woe-Reaper (+15 pts)
1x Myphitic Blight-hauler (100 pts): Bile spurt, Gnashing maw, Missile launcher, Multi-melta`;

for(const [declared,name,lordPoints,effect,currentTotal] of [
  [1025,'Revolting Regeneration',150,'persistent',1025],
  [1020,'Furnace of Plagues',145,'furnace',1020],
  [1005,'Daemon Weapon of Nurgle',130,'critical-hit-5',1005]
]){
  const roster=WHRosterParser.parse(common(declared,name,lordPoints));
  assert.equal(roster.units.length,9);
  assert.equal(roster.unitLineTotal,declared);
  assert.equal(roster.exportMatches,true);
  assert.equal(roster.enhancements.length,2,'header and inline copies must reconcile while Woe-Reaper remains present');
  const lord=roster.units.find(unit=>unit.sourceRef==='Char2');
  const primary=roster.enhancements.find(item=>item.name===name);
  const woe=roster.enhancements.find(item=>item.name==='Parasitic Woe-Reaper');
  assert.equal(primary.ownerUnitId,lord.id);
  assert.equal(primary.exportedCost,lordPoints-120);
  assert.equal(primary.ownerStatus,'resolved');
  assert.equal(woe.ownerName,'Foetid Bloat-drone with heavy blight launcher');
  assert.equal(woe.exportedCost,15);
  const result=WHRosterPoints.check(roster,'death guard');
  assert.equal(result.total,currentTotal);
  assert.equal(result.difference,currentTotal-declared);
  assert.equal(result.exportMatches,true);
  assert.equal(result.unresolved.length,0);
  assert.equal(result.enhancements.find(item=>item.name===name).effect,effect);
}

assert.ok(Object.values(WH_POINTS_CATALOG['death guard'].enhancements).every(item=>item.effect),'every Death Guard Enhancement must declare a presentation mode');
const deathGuardMfmEnhancements={
  cornucophagus:35,
  'final ingredient':20,
  'needle of nurgle':25,
  'visions of virulence':15,
  'lancet of the worldsore':15,
  'parasitic woe reaper':15,
  'face of death':10,
  'helm of the fly king':20,
  'vile vigour':15,
  'warprot talisman':30,
  'insectile murmuration':15,
  plagueveil:15,
  'bilemaw blight':10,
  'eye of affliction':20,
  'shriekworm familiar':15,
  'tendrilous emissions':30,
  'host of the hybridised pox':40,
  'rejuvenating swarm':20,
  'lord of the walking pox':15,
  sorrowsyphon:10,
  'talisman of burgeoning':25,
  'witherbone pipes':25,
  'beckoning blight':20,
  'entropic knell':15,
  'fell harvester':10,
  'tome of bounteous blessings':20,
  'arch contaminator':25,
  'daemon weapon of nurgle':10,
  'furnace of plagues':25,
  'revolting regeneration':30
};
assert.deepEqual(
  [...new Set(Object.values(WH_POINTS_CATALOG['death guard'].enhancements).map(item=>item.title.toLowerCase().replace(/-/g,' ')))].sort(),
  Object.keys(deathGuardMfmEnhancements).sort(),
  'Death Guard Enhancement catalogue must exactly match MFM v1.1'
);
for(const [name,cost] of Object.entries(deathGuardMfmEnhancements)){
  assert.equal(WH_POINTS_CATALOG['death guard'].enhancements[name].value,cost,`${name} MFM v1.1 cost`);
}

const mechanicus=WHRosterPoints.check({units:[{quantity:10,name:'Skitarii Rangers',models:[]}],declared:85,unitLineTotal:85,enhancements:[]},'adeptus mechanicus');
assert.equal(mechanicus.total,85);
assert.equal(mechanicus.difference,0);
const mechanicusLegends=WHRosterPoints.check({units:[{quantity:5,name:'Secutarii Hoplites [Legends]',models:[]}],declared:65,unitLineTotal:65,enhancements:[]},'adeptus mechanicus');
assert.equal(mechanicusLegends.total,65);
assert.deepEqual([...mechanicusLegends.unresolved],[],'New Recruit Legends suffix must not break current point matching');

const rosterUnit=(id,name,quantity=1)=>({id,name,quantity,models:[]});
const ownedEnhancement=(name,ownerUnitId)=>({name,ownerUnitId,ownerStatus:'resolved'});
const upgradeRoster=count=>{
  const owners=[
    rosterUnit('drone-a','Foetid Bloat-drone'),
    rosterUnit('drone-b','Foetid Bloat-drone'),
    rosterUnit('drone-c','Foetid Bloat-drone'),
    rosterUnit('helbrute','Helbrute')
  ].slice(0,count);
  return {units:owners,detachments:[{name:'Contagion Engines'}],enhancements:owners.map(owner=>ownedEnhancement('Parasitic Woe-Reaper',owner.id)),declared:0,unitLineTotal:0};
};
const threeUpgrades=WHRosterPoints.check(upgradeRoster(3),'death guard');
assert.equal(threeUpgrades.enhancementAssignments,3,'one Upgrade can have three owners');
assert.equal(threeUpgrades.enhancementChoices,1,'three Upgrade owners consume one Enhancement choice');
assert.equal(threeUpgrades.enhancements.filter(item=>item.ownerEligibility==='valid').length,3);
assert.equal(threeUpgrades.enhancements.reduce((sum,item)=>sum+item.currentCost,0),45,'Upgrade points are paid once per owner');
const parsedTripleUpgrade=WHRosterParser.parse(`FACTION KEYWORD: Chaos - Death Guard
DETACHMENT: Contagion Engines
TOTAL ARMY POINTS: 345pts
1x Foetid Bloat-drone (100 pts)
Enhancement: Parasitic Woe-Reaper (+15 pts)
1x Foetid Bloat-drone (100 pts)
Enhancement: Parasitic Woe-Reaper (+15 pts)
1x Foetid Bloat-drone (100 pts)
Enhancement: Parasitic Woe-Reaper (+15 pts)`);
assert.equal(parsedTripleUpgrade.enhancements.length,3,'parser must preserve three legal owners of one Upgrade');
assert.equal(new Set(parsedTripleUpgrade.enhancements.map(item=>item.ownerUnitId)).size,3,'Upgrade assignments must not collapse by name');
assert.equal(WHRosterPoints.check(parsedTripleUpgrade,'death guard').enhancementChoices,1);
const fourUpgrades=WHRosterPoints.check(upgradeRoster(4),'death guard');
assert.equal(fourUpgrades.enhancementAssignments,4);
assert.equal(fourUpgrades.enhancementChoices,1);
assert.match(fourUpgrades.enhancements[3].ownerMessage,/limit exceeded/i,'the fourth Upgrade owner must be invalid');
assert.ok(fourUpgrades.enhancementWarnings.some(message=>/4\/3/.test(message)));

const epicRoster={units:[rosterUnit('mortarion','Mortarion')],detachments:[{name:'Virulent Vectorium'}],enhancements:[ownedEnhancement('Daemon Weapon of Nurgle','mortarion')],declared:0,unitLineTotal:0};
assert.match(WHRosterPoints.check(epicRoster,'death guard').enhancements[0].ownerMessage,/Epic Hero/);
const raiderUpgrade={units:[rosterUnit('raiders','Serberys Raiders',3)],detachments:[{name:'Cohort Acquisitus'}],enhancements:[ownedEnhancement('Stealth-screened Cybercanids Upgrade','raiders')],declared:0,unitLineTotal:0};
assert.equal(WHRosterPoints.check(raiderUpgrade,'adeptus mechanicus').enhancements[0].ownerEligibility,'valid');
const rangersInvalid={units:[rosterUnit('rangers','Skitarii Rangers',10)],detachments:[{name:'Rad-zone Corps'}],enhancements:[ownedEnhancement('Malphonic Susurrus','rangers')],declared:0,unitLineTotal:0};
assert.match(WHRosterPoints.check(rangersInvalid,'adeptus mechanicus').enhancements[0].ownerMessage,/Invalid Enhancement owner/);
const tauUpgrade={units:[rosterUnit('ghostkeel','Ghostkeel Battlesuit')],detachments:[{name:'Advanced Acquisition Cadre'}],enhancements:[ownedEnhancement('Unmasking Suite Upgrade','ghostkeel')],declared:0,unitLineTotal:0};
assert.equal(WHRosterPoints.check(tauUpgrade,'t au empire').enhancements[0].ownerEligibility,'valid');
const tauStandard={units:[rosterUnit('ghostkeel','Ghostkeel Battlesuit')],detachments:[{name:'Experimental Prototype Cadre'}],enhancements:[ownedEnhancement('Thermoneutronic Projector','ghostkeel')],declared:0,unitLineTotal:0};
assert.match(WHRosterPoints.check(tauStandard,'t au empire').enhancements[0].ownerMessage,/Invalid Enhancement owner/);
const fourChoices={units:[rosterUnit('lord','Death Guard Chaos Lord')],detachments:[{name:'Virulent Vectorium'}],enhancements:['Daemon Weapon of Nurgle','Furnace of Plagues','Arch Contaminator','Revolting Regeneration'].map(name=>ownedEnhancement(name,'lord')),declared:0,unitLineTotal:0};
assert.match(WHRosterPoints.check(fourChoices,'death guard').enhancementWarnings.at(-1),/choice limit exceeded/i);

const mechanicusRoster=WHRosterParser.parse(`FACTION KEYWORD: Imperium - Adeptus Mechanicus
DETACHMENT: Haloscreed Battle Clade
TOTAL ARMY POINTS: 840pts
ENHANCEMENT: Sanctified Ordnance (on Char1: Tech-Priest Manipulus)
NUMBER OF UNITS: 4
Char1: 1x Tech-Priest Manipulus (70 pts): Magnarail lance
Enhancement: Sanctified Ordnance (+10 pts)
4x Kastelan Robots (320 pts): Incendine combustor, Kastelan fist
6x Kataphron Breachers (310 pts): Heavy arc rifle, Hydraulic claw
2x Ironstrider Ballistarii (140 pts): Twin cognis lascannon`);
assert.equal(mechanicusRoster.faction,'Imperium - Adeptus Mechanicus');
assert.equal(mechanicusRoster.enhancements[0].ownerStatus,'resolved');
const mechanicusCheck=WHRosterPoints.check(mechanicusRoster,'adeptus mechanicus');
assert.equal(mechanicusCheck.total,880,'current total includes current unit size, Enhancement and paid lascannons');
assert.equal(mechanicusCheck.difference,40);
assert.equal(mechanicusCheck.enhancements[0].effect,'ranged-range-6');

const unresolved=WHRosterParser.parse(`+ FACTION KEYWORD: Chaos — Death Guard\n+ TOTAL ARMY POINTS: 120pts\n+ ENHANCEMENT: Furnace of Plagues (on Char9: Missing Owner)\n1x Lord of Contagion (120 pts): Manreaper`);
assert.equal(unresolved.enhancements[0].ownerStatus,'unresolved');
assert.match(unresolved.warnings[0],/owner could not be resolved/);

const duplicateOwners=WHRosterParser.parse(`FACTION KEYWORD: Chaos - Death Guard
TOTAL ARMY POINTS: 280pts
ENHANCEMENT: Furnace of Plagues (on Char1: Lord of Contagion), Furnace of Plagues (on Char2: Lord of Virulence)
Char1: 1x Lord of Contagion (145 pts): Manreaper
Enhancement: Furnace of Plagues (+25 pts)
Char2: 1x Lord of Virulence (135 pts): Heavy plague fist
Enhancement: Furnace of Plagues (+25 pts)`);
assert.equal(duplicateOwners.faction,'Chaos - Death Guard','metadata must work without a leading plus');
assert.equal(duplicateOwners.declared,280);
assert.equal(duplicateOwners.enhancements.length,2);
assert.ok(duplicateOwners.enhancements.every(item=>item.ownerStatus==='resolved'),'same Enhancement name on distinct resolved owners is not ambiguous');

const conflictingOwner=WHRosterParser.parse(`FACTION KEYWORD: Chaos - Death Guard
TOTAL ARMY POINTS: 280pts
ENHANCEMENT: Furnace of Plagues (on Char1: Lord of Contagion)
Char1: 1x Lord of Contagion (120 pts): Manreaper
Char2: 1x Lord of Virulence (160 pts): Heavy plague fist
Enhancement: Furnace of Plagues (+25 pts)`);
assert.equal(conflictingOwner.enhancements.length,1,'conflicting header and inline copies remain one priced Enhancement');
assert.equal(conflictingOwner.enhancements[0].ownerStatus,'ambiguous');
assert.deepEqual([...conflictingOwner.enhancements[0].ownerCandidates],['Lord of Contagion','Lord of Virulence']);
assert.match(conflictingOwner.warnings[0],/conflicts between header and inline metadata/);
console.log('Roster parser and points QA passed.');
