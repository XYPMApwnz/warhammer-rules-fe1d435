import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const inventory={
  'death-guard':['enhancement-vile-vigour','enhancement-witherbone-pipes','enhancement-helm-of-the-fly-king','enhancement-arch-contaminator','enhancement-eye-of-affliction','enhancement-shriekworm-familiar','enhancement-final-ingredient','enhancement-lord-of-the-walking-pox','enhancement-warprot-talisman','enhancement-rejuvenating-swarm','enhancement-host-of-the-hybridised-pox'],
  'adeptus-mechanicus':['enhancement-cognitive-reinforcement','enhancement-omnicogitator','enhancement-sanctified-ordnance'],
  'tau-empire':['enhancement-precision-of-the-patient-hunter'],
  tyranids:['elevated-might','enhancement-adaptive-biology'],
  'dark-angels':['enhancement-champion-of-the-deathwing','enhancement-weapons-of-the-first-legion'],
  'blood-angels':['enhancement-blood-boil','enhancement-carmine-reliquary']
};
const catalogFor=book=>{const scope={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),scope);return scope.window.WH_BOOK_ROSTER_CATALOG;};
for(const [book,ids] of Object.entries(inventory)){const catalog=catalogFor(book);for(const id of ids){const records=(catalog.enhancements||[]).filter(item=>item.id===id);assert.equal(records.length,1,`${book}: exact canonical Enhancement ${id}`);assert.ok(records[0].title&&records[0].text,`${book}: complete canonical Enhancement ${id}`);}}

const dg=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
for(const key of ['pipes','vigour','helm','sorrowsyphon','walkingPox'])assert.match(dg,new RegExp(`canonicalEnhancement\\(DG_ENH\\.${key}`),`DG ${key}: canonical Enhancement reference`);
for(const key of ['archContaminator','eyeOfAffliction','shriekworm','finalIngredient','warprot','rejuvenating','hybridisedPox'])assert.match(dg,new RegExp(`DG_ENH\\.${key}[^\n]+canonicalEnhancement\\(id`),`DG ${key}: canonical Enhancement reference`);
for(const text of ['Models in this Attached Unit can re-roll Advance rolls.','Add 1 to Leadership and Battle-shock tests made for this Attached Unit.','Models in this Attached Unit cannot be targeted by ranged attacks unless the attacker is within 18".'])assert.doesNotMatch(dg,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`DG residual summary: ${text}`);
assert.match(dg,/witherbone-pipes-oc/);assert.match(dg,/vile-vigour-move/);
for(const text of ['Contagion Range +3" (to a maximum of 12").','Add 1 to Charge rolls made for this unit.','Critical Hits are scored on unmodified Hit rolls of 5+.','This unit has -3" Detection Range.'])assert.doesNotMatch(dg,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`DG synthetic gameplay summary: ${text}`);
assert.match(dg,/canonicalDetachmentRule\(DG_RULE\.strains/);
assert.match(dg,/canonicalAbility\(cardId==='unit-plague-drones'\?DG_RULE\.dronesInstrument:DG_RULE\.bearersInstrument/);
assert.match(dg,/core-feel-no-pain/,'Revolting Regeneration must use the shared CORE grant');
assert.match(dg,/weapon\('critical-hit-5','selected-melee','grant-tag'/,'Daemon Weapon must use the shared selected-weapon reducer');

const am=fs.readFileSync(path.join(root,'books/adeptus-mechanicus/scripts/roster-enhancements.js'),'utf8');
assert.match(am,/referenceSource=origin\('explicit-attachment',id,owner\?\.id,'enhancement-owner'\)/,'AM canonical Enhancement references require exact bearer provenance');
assert.match(am,/canonicalEnhancement\(id,referenceSource\)/,'AM canonical Enhancement reference helper');
for(const id of inventory['adeptus-mechanicus'])assert.match(am,new RegExp(id),`AM canonical Enhancement mapping missing for ${id}`);
for(const text of ['While this BATTLELINE unit is targeted by a melee attack, subtract 1 from the Hit roll.','Hazardous tests for this unit can be re-rolled.'])assert.doesNotMatch(am,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`AM residual summary: ${text}`);

const tau=fs.readFileSync(path.join(root,'books/tau-empire/scripts/roster-filter.js'),'utf8');
assert.match(tau,/reference\('enhancement',ENHANCEMENT\.precision/,'T\'au Precision canonical Enhancement reference');
assert.match(tau,/reference\('detachment-rule'/,'T\'au canonical Detachment Rule references');
for(const text of ['Derived effect: this unit has -3" detection range.','Apply the current','No permanent Datasheet mutation was applied'])assert.doesNotMatch(tau,new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`T'au synthetic gameplay summary: ${text}`);

const remaining=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
assert.match(remaining,/canonicalReference:\{kind:'enhancement',id:source\.id\}/);
for(const legacy of ["ability('reroll-wounds'","ability('reroll-damage'","reference('vowed-critical','Critical Hits 5+'","reference('battleshocked-values','Improved values while Battle-shocked'"])assert.doesNotMatch(remaining,new RegExp(legacy.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`remaining provider residual: ${legacy}`);
assert.doesNotMatch(remaining,/explicit-attachment/,'remaining provider target semantics must remain exact-owner, not attachment propagation');

const context=fs.readFileSync(path.join(root,'books/shared/roster-context.js'),'utf8'),presentation=fs.readFileSync(path.join(root,'books/shared/roster-game-presentation.js'),'utf8');
assert.match(context,/kind==='detachment-rule'\?index\?\.detachmentRulesById/);
assert.match(presentation,/effect\.canonicalReference\|\|effect\.canonicalAbility/);
assert.match(presentation,/rosterCanonicalReferenceKind/);
assert.match(presentation,/rosterCanonicalDetachmentRuleId/);
assert.equal(Object.values(inventory).reduce((sum,ids)=>sum+ids.length,0),21);
console.log('Canonical reference inventory QA: PASS (21 Enhancement migrations, T\'au Detachment Rules, one shared presentation family).');
