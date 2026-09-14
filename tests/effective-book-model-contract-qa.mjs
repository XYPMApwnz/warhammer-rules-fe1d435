import assert from 'node:assert/strict';
import {createEffectivePointsProjection} from '../books/shared/tools/effective-points-projection.mjs';
import {
  EFFECTIVE_BOOK_MODEL_SCHEMA,applyPresentationHook,createEffectiveBookModel,validateEffectiveBookModel
} from '../books/shared/tools/effective-book-model.mjs';

const clone=value=>structuredClone(value);
const unit={
  id:'unit-alpha',title:'Alpha',sourceBookId:'death-guard',publicationState:'Current',
  points:[{label:'1 model',value:90}],paidWargear:[{label:'Icon',value:5}],
  ruleProfile:{id:'unit-alpha',unitId:'unit-alpha',abilities:[]},publicationRecord:{id:'unit-alpha'}
};
const detachment={id:'detachment-test',title:'Test Detachment',sourceBookId:'death-guard'};
const enhancement={id:'enhancement-test',title:'Test Enhancement',detachmentId:'detachment-test',sourceBookId:'death-guard',value:15};
const effectivePointsProjection=createEffectivePointsProjection({
  book:{id:'death-guard',title:'Death Guard',parentBookId:null},units:[unit],detachments:[detachment],enhancements:[enhancement]
});
const effect={
  canonicalRecordId:'enhancement-test',sourceKind:'enhancement',sourceBookId:'death-guard',effectiveBookIds:['death-guard'],
  detachmentId:'detachment-test',scope:'bearer',selector:{kind:'unit',unitIds:['unit-alpha']},clauses:[{
    conditions:[],operations:[{id:'enhancement-test-operation',type:'ABILITY_GRANT',canonicalTarget:'unit-alpha',parameters:{abilityId:'ability-test'}}]
  }],timingState:'always',stackingPolicy:'apply-once-per-source',source:{sourceId:'source-test',locator:'fixture#enhancement-test'},confidence:'VERIFIED_FROZEN'
};
const fixture=()=>({
  schema:EFFECTIVE_BOOK_MODEL_SCHEMA,
  book:{id:'death-guard',title:'Death Guard',parentBookId:null},
  dependencies:[],
  sources:[{sourceId:'source-test',ownerBookId:'death-guard',classification:'VERIFIED_FROZEN',locator:'fixture'}],
  units:[clone(unit)],detachments:[clone(detachment)],enhancements:[clone(enhancement)],
  relations:[{role:'leader',sourceId:'unit-alpha',targetId:'unit-alpha'}],effectContracts:[clone(effect)],
  effectivePointsProjection:clone(effectivePointsProjection),presentation:{sectionOrder:['units']},
  glossary:[],customConsumerData:{kept:true}
});

const accepted=createEffectiveBookModel(fixture());
assert.notEqual(accepted,fixture(),'constructor returns an owned model clone');
assert.deepEqual(accepted.customConsumerData,{kept:true},'generic consumer fields pass through');
assert.equal(validateEffectiveBookModel(accepted),accepted,'validator returns the accepted model');

const mutation=(label,change,pattern)=>{const model=fixture();change(model);assert.throws(()=>validateEffectiveBookModel(model),pattern,label);};
mutation('DUPLICATE_UNIT_ID',model=>model.units.push(clone(model.units[0])),/duplicate death-guard unit identity/);
mutation('DUPLICATE_DETACHMENT_ID',model=>model.detachments.push(clone(model.detachments[0])),/duplicate death-guard Detachment identity/);
mutation('DUPLICATE_SCOPED_ENHANCEMENT_ID',model=>model.enhancements.push(clone(model.enhancements[0])),/duplicate death-guard scoped Enhancement identity/);
mutation('UNKNOWN_ENHANCEMENT_OWNER',model=>model.enhancements[0].detachmentId='detachment-missing',/unknown Detachment/);
mutation('UNKNOWN_RELATION_TARGET',model=>model.relations[0].targetId='unit-missing',/unknown relation target/);
mutation('INVALID_PUBLICATION_STATE',model=>model.units[0].publicationState='Draft',/invalid publication state/);
mutation('INVALID_POINT_SCHEDULE',model=>model.units[0].points=[{label:'five-ish models',value:90}],/no supported model bounds/);
mutation('INVALID_EFFECT_CONTRACT',model=>model.effectContracts[0].clauses[0].operations[0].type='EXECUTE_JS',/unsupported effect type/);
mutation('UNKNOWN_SOURCE_PROVENANCE',model=>model.effectContracts[0].source.sourceId='source-missing',/unknown source provenance/);
mutation('WRONG_SOURCE_PROVENANCE_OWNER',model=>model.sources[0].ownerBookId='adeptus-mechanicus',/unknown source owner/);
mutation('CONFLICTING_UNIT_PARTITION',model=>model.effectivePointsProjection.units[0].id='unit-substitute',/conflicting unit partitions/);
mutation('CONFLICTING_POINTS_PARTITION',model=>model.effectivePointsProjection.units[0].points[0].value=91,/conflicting points partitions/);
mutation('CONFLICTING_BOOK_PARTITION',model=>model.effectivePointsProjection.book.title='Other Book',/conflicting book identity partitions/);
mutation('SEMANTIC_PRESENTATION_PARTITION',model=>model.presentation.units=[],/presentation cannot own semantic partition units/);

const graphModel=fixture();delete graphModel.relations;graphModel.relationGraphs=new Map([['unit-alpha',{canLead:[{unitId:'unit-alpha'}],canSupport:[]}]]);
validateEffectiveBookModel(graphModel);
graphModel.relationGraphs.get('unit-alpha').canLead[0].unitId='unit-missing';
assert.throws(()=>validateEffectiveBookModel(graphModel),/unknown relation target/,'relation Map targets are validated');

const original=fixture(),presented=applyPresentationHook(original,readonly=>({
  sectionOrder:[...readonly.presentation.sectionOrder,'sources'],unitImages:{'unit-alpha':'alpha.webp'},provenance:{label:'Accepted source display'}
}));
assert.deepEqual(original.presentation,{sectionOrder:['units']},'presentation hook does not mutate its input');
assert.deepEqual(presented.presentation.sectionOrder,['units','sources'],'presentation hook result is applied');
assert.deepEqual({...presented,presentation:undefined},{...original,presentation:undefined},'presentation hook preserves every semantic partition');
assert.throws(()=>applyPresentationHook(fixture(),readonly=>{readonly.units[0].title='Changed';return {};}),/presentation hook failed without semantic authority/,'plain-object semantic mutation fails');
const mutableMapModel=fixture();delete mutableMapModel.relations;mutableMapModel.relationGraphs=new Map([['unit-alpha',{canLead:[{unitId:'unit-alpha'}]}]]);
assert.throws(()=>applyPresentationHook(mutableMapModel,readonly=>{readonly.relationGraphs.set('unit-extra',{});return {};}),/presentation hook attempted semantic mutation/,'Map semantic mutation fails');
assert.throws(()=>applyPresentationHook(fixture(),()=>({enhancements:[]})),/presentation cannot own semantic partition enhancements/,'hook cannot return a semantic partition');

console.log('Effective book model contract QA: PASS (identity, ownership, publication, points, relations, effects, provenance, partition equality, presentation isolation).');
