import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const clone=value=>structuredClone(value);
const evidence=json('missions/sources/chapter-approved-2026-27-evidence.json');
const bookletEvidence=json('missions/sources/chapter-approved-2026-27-booklet-pages-08-09-evidence.json');
const manifest=json('missions/sources/source-manifest.json');
const gdm=json('missions/sources/game-data-missions-terrain-reference-2026-09-22.json');
const acquisition=read('docs/rules-universe/STANDARD_MISSIONS_SOURCE_ACQUISITION_2026-09-22.md');
const universe=read('docs/rules-universe/RULES_UNIVERSE_2026-09-22.md');
const expectedDeployments=['deployment-crucible-of-battle','deployment-dawn-of-war','deployment-hammer-and-anvil','deployment-search-and-destroy','deployment-sweeping-engagement','deployment-tipping-point'];
const expectedTwists=['twist-martial-pride','twist-mirrored-world','twist-night-fighting','twist-nowhere-to-hide','twist-ruinscape','twist-scrambled-communications'];
const acceptedClasses=new Set(['OFFICIAL_AUTHENTICATED','PHYSICAL_SOURCE_CORROBORATED','HIGH_CONFIDENCE_CORROBORATED','SECONDARY_CONTENT_SOURCE']);
const sha256=bytes=>crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();
const sum=(rows,key)=>rows.reduce((total,row)=>total+row[key],0);
const bookletArtifactPath='missions/sources/chapter-approved-2026-27-booklet-pages-08-09-evidence.json';
const requiredBookletClaims={
  'reference-page-08-battle-victor-scoring':['page08-step12-begin-battle','page08-step13-end-battle','page08-step14-determine-victor','page08-battle-ready-vp','page08-primary-total-cap','page08-primary-per-round-cap','page08-secondary-total-cap','page08-secondary-per-round-cap','page08-fixed-secondary-per-card-cap','page08-excess-vp-ignored'],
  'reference-page-09-appendix':['page09-cumulative-condition','page09-or-condition','page09-leaves-the-battlefield','page09-underlined-one','page09-vp-up-to-a-limit','page09-when-drawn']
};

function validateBookletEvidence(booklet){
  assert.equal(booklet.schema,'warhammer-physical-booklet-evidence/v1');
  assert.equal(booklet.id,'chapter-approved-2026-27-booklet-pages-08-09');
  assert.equal(booklet.edition,'Warhammer 40,000 11th Edition');
  assert.equal(booklet.cutoff,'2026-09-22');
  assert.equal(booklet.currentness,'CURRENT_AT_2026_09_22');
  assert.equal(booklet.authority,'secondary');
  assert.equal(booklet.evidenceClass,'PHYSICAL_SOURCE_CORROBORATED');
  assert.equal(booklet.source.sourceId,'physical-review-2026-07-17');
  assert.equal(booklet.source.videoId,'sp6n_Bl6MJ0');
  assert.equal(booklet.source.publicationDate,'2026-07-17');
  assert.equal(booklet.sourceIdentity.productReleaseDate,'2026-06-13');
  assert.equal(booklet.sourceIdentity.reviewPublishedAfterProductRelease,true);
  assert.equal(booklet.currentnessAssessment.baselineBookletCurrentAtCutoff,true);
  assert.equal(booklet.currentnessAssessment.laterBaselineReplacementKnownAtCutoff,false);
  assert.equal(booklet.currentnessAssessment.laterOfficialFaqAndEventCompanionRemainSeparateOverlays,true);
  assert.equal(booklet.captureEvidence.video.bytesStored,false);
  assert.equal(booklet.captureEvidence.video.frameBytesStored,false);
  assert.equal(booklet.captureEvidence.transcriptPage.byteSize,1399626);
  assert.equal(booklet.captureEvidence.transcriptPage.sha256,'8B1064289CAE912561F384E696A705AA12638730E9667926BE19BA70654AFA54');
  const claimIds=new Set(booklet.claims.map(claim=>claim.id));
  assert.equal(claimIds.size,booklet.claims.length,'booklet claim IDs must be unique');
  for(const [pageRecordId,required] of Object.entries(requiredBookletClaims)){
    const page=booklet.pageCoverage.find(entry=>entry.pageRecordId===pageRecordId);
    assert(page,`missing booklet page coverage ${pageRecordId}`);
    assert.equal(page.status,'COMPLETE',`${pageRecordId}: page is not complete`);
    assert.deepEqual(page.requiredClaimIds,required);
    assert.deepEqual(page.resolvedClaimIds,required);
    assert.deepEqual(page.unresolvedClaimIds,[]);
    for(const id of required){
      assert(claimIds.has(id),`missing required evidence claim ${id}`);
      const claim=booklet.claims.find(entry=>entry.id===id);
      assert.equal(claim.pageRecordId,pageRecordId,`${id}: wrong page`);
      assert.equal(claim.status,'AUTHENTICATED',`${id}: not authenticated`);
      assert(claim.fact&&Object.keys(claim.fact).length>0,`${id}: missing structured fact`);
      assert(claim.locators?.length>0&&claim.locators.every(locator=>locator.sourceId==='physical-review-2026-07-17'),`${id}: invalid source locator`);
    }
  }
}

function validate(data,{sourceManifest=manifest,gdmEvidence=gdm,booklet=bookletEvidence}={}){
  validateBookletEvidence(booklet);
  assert.equal(data.schema,'warhammer-chapter-approved-source-evidence/v1');
  assert.equal(data.edition,'Warhammer 40,000 11th Edition');
  assert.equal(data.cutoff,'2026-09-22');
  assert.equal(data.currentness,'CURRENT_AT_2026_09_22');
  assert.equal(data.lifecycle,'ACCEPTED_SOURCE_EVIDENCE');
  assert.deepEqual(data.contentStatus,{chapterApprovedRulesContent:'COMPLETE_FOR_MODELING',contentGap:false,userSourceNeeded:false,physicalPrimaryAuthorityComplete:false,pageFaithfulBookletReconstructionRequired:false});

  const {forceDispositions,primaryMissions,secondaryObjectives,deployments,twists,referenceSections}=data.records;
  assert.equal(primaryMissions.length,25);assert.equal(sum(primaryMissions,'physicalMultiplicity'),30);
  assert.equal(primaryMissions.filter(record=>record.physicalMultiplicity===2).length,5);
  assert.equal(primaryMissions.filter(record=>record.objectiveAction).length,11);
  assert.equal(sum(primaryMissions.filter(record=>record.objectiveAction),'physicalMultiplicity'),13);
  assert(primaryMissions.every(record=>record.scoringContentAvailable&&record.timingContentAvailable&&record.capsContentAvailable));
  assert.equal(secondaryObjectives.length,18);assert.equal(sum(secondaryObjectives,'physicalMultiplicity'),36);
  assert(secondaryObjectives.every(record=>record.physicalMultiplicity===2&&record.presentationCopies.join('|')==='ATTACKER|DEFENDER'&&!record.presentationCopiesAreSeparateSemantics));
  assert.equal(secondaryObjectives.filter(record=>record.fixedEligible).length,4);
  assert.equal(secondaryObjectives.filter(record=>record.objectiveAction).length,2);
  assert(secondaryObjectives.every(record=>record.scoringContentAvailable&&record.timingContentAvailable&&record.capsContentAvailable));
  assert.equal(forceDispositions.length,5);assert.equal(sum(forceDispositions,'physicalMultiplicity'),10);
  assert.equal(deployments.length,6);assert.equal(sum(deployments,'physicalMultiplicity'),6);
  assert.deepEqual(deployments.map(record=>record.id).sort(),expectedDeployments);
  assert(deployments.every(record=>record.geometryAvailable&&record.measurementsAvailable&&record.orientationAvailable&&record.objectiveAndTerritoryMarkersAvailable&&record.geometryEvidence?.sha256?.length===64));
  assert.equal(twists.length,6);assert.equal(sum(twists,'physicalMultiplicity'),6);
  assert.deepEqual(twists.map(record=>record.id).sort(),expectedTwists);
  assert.equal(referenceSections.length,10);
  assert.deepEqual(referenceSections.map(record=>record.physicalPage),[1,2,3,4,5,6,7,8,9,10]);
  assert(referenceSections.every(record=>record.pageFaithfulOfficialSourceAvailable===false));
  for(const [pageRecordId,required] of Object.entries(requiredBookletClaims)){
    const page=referenceSections.find(record=>record.id===pageRecordId);
    assert.equal(page.evidenceArtifactPath,bookletArtifactPath);
    assert.equal(page.evidenceStatus,'COMPLETE');
    assert.equal(page.fullRulesContentAvailable,page.evidenceStatus==='COMPLETE');
    assert.deepEqual(page.requiredEvidenceItemIds,required);
    assert.deepEqual(page.provenanceSourceIds,['physical-review-2026-07-17']);
    assert.deepEqual(page.secondarySourceIds,[]);
    assert(!page.sourceUrls.some(url=>url.includes('wahapedia.ru')),`${pageRecordId}: Wahapedia must not prove missing booklet content`);
  }
  assert.equal(sum([primaryMissions,secondaryObjectives,forceDispositions,deployments,twists].flat(),'physicalMultiplicity'),88);

  const records=[forceDispositions,primaryMissions,secondaryObjectives,deployments,twists,referenceSections].flat();
  assert.equal(new Set(records.map(record=>record.id)).size,records.length,'source record IDs must be globally unique');
  const sourceIds=new Set(data.sources.map(source=>source.id));
  assert.equal(sourceIds.size,data.sources.length);
  for(const record of records){
    assert.equal(record.edition,data.edition,`${record.id}: wrong edition`);
    assert.equal(record.cutoff,data.cutoff,`${record.id}: wrong cutoff`);
    assert.equal(record.currentness,'CURRENT_AT_2026_09_22',`${record.id}: wrong currentness`);
    assert.equal(record.sourceAcceptedForContent,true,`${record.id}: content not accepted`);
    assert.equal(record.fullRulesContentAvailable,true,`${record.id}: rules content unavailable`);
    assert(acceptedClasses.has(record.evidenceClass),`${record.id}: invalid evidence class`);
    assert(record.provenanceSourceIds.length>0,`${record.id}: missing provenance`);
    assert(record.sourceUrls.length>0&&record.sourceUrls.every(url=>url.startsWith('https://')),`${record.id}: missing source URLs`);
    for(const sourceId of [...record.provenanceSourceIds,...record.officialCorroborationSourceIds,...record.secondarySourceIds])assert(sourceIds.has(sourceId),`${record.id}: unknown source ${sourceId}`);
    if(record.evidenceClass==='SECONDARY_CONTENT_SOURCE'||record.authority==='secondary')assert.notEqual(record.authority,'official',`${record.id}: secondary evidence promoted to official`);
  }
  const wahapediaSource=data.sources.find(source=>source.id==='wahapedia-mission-deck-2026-27');
  assert.equal(wahapediaSource.capture.byteSize,477202);
  assert.equal(wahapediaSource.capture.sha256,'501D4C541D1880EB7B4C42D5B3AD3553FA98B54313537AECA6E230947EFE5377');
  assert.match(wahapediaSource.authorityBoundary,/does not contain Steps 12-14 or the Appendix/);
  const physicalReview=data.sources.find(source=>source.id==='physical-review-2026-07-17');
  assert.equal(physicalReview.evidenceArtifactPath,bookletArtifactPath);
  assert.equal(physicalReview.transcriptCapture.sha256,bookletEvidence.captureEvidence.transcriptPage.sha256);
  for(const source of data.sources){
    assert(source.url?.startsWith('https://'),source.id+': missing source URL');
    if(source.evidenceClass==='SECONDARY_CONTENT_SOURCE'||source.evidenceClass==='PHYSICAL_SOURCE_CORROBORATED')assert.notEqual(source.authority,'official',`${source.id}: secondary source promoted to official`);
  }

  const dispositionIds=new Set(forceDispositions.map(record=>record.id));
  const primaryIds=new Set(primaryMissions.map(record=>record.id));
  assert.equal(data.directedPrimaryMatrix.length,25);
  const directedKeys=data.directedPrimaryMatrix.map(entry=>`${entry.playerForceDispositionId}|${entry.opponentForceDispositionId}`);
  assert.equal(new Set(directedKeys).size,25,'directed Force Disposition pairs must be unique');
  for(const entry of data.directedPrimaryMatrix){assert(dispositionIds.has(entry.playerForceDispositionId));assert(dispositionIds.has(entry.opponentForceDispositionId));assert(primaryIds.has(entry.primaryMissionId));}
  assert.equal(new Set(data.directedPrimaryMatrix.map(entry=>[entry.playerForceDispositionId,entry.opponentForceDispositionId].sort().join('|'))).size,15);
  assert.equal(data.eventLayoutReference.unorderedForceDispositionPairings,15);
  assert.equal(data.eventLayoutReference.layoutsPerPairing,3);
  assert.equal(data.eventLayoutReference.eventLayouts,45);

  const eventSource=data.sources.find(source=>source.id==='event-companion-v1.2-2026-08-26');
  assert(eventSource);assert.equal(eventSource.version,'1.2');assert.equal(eventSource.date,'2026-08-26');
  assert.equal(eventSource.currentness,'CURRENT_AT_2026_09_22');
  assert.equal(eventSource.sha256,'1F44D9FA0297F60BE6C4367041A65D1A98710C68B221D8C8E22ECD1674E7525E');
  assert.equal(eventSource.byteSize,10665731);
  const pdf=fs.readFileSync(path.join(root,eventSource.localPath));
  assert.equal(pdf.length,eventSource.byteSize);assert.equal(sha256(pdf),eventSource.sha256);
  assert.equal(data.faqOverlays.length,8);
  assert.deepEqual(data.faqOverlays.map(({id})=>id).sort(),[
    'faq-beacon-reselection','faq-death-trap-terrain-area-timing','faq-end-of-battle-scoring-timing',
    'faq-operation-marker-status-removal','faq-plunder-terrain-area-requirement',
    'faq-primary-operation-marker-removal','faq-surveil-the-foe-marker-removal',
    'faq-vital-link-central-objectives'
  ]);
  assert.equal(data.eventMissionSemantics.length,5);
  for(const item of data.eventMissionSemantics){assert.equal(item.sourceId,eventSource.id);assert.equal(item.authority,'official');assert.equal(item.evidenceClass,'OFFICIAL_AUTHENTICATED');assert.equal(item.currentness,'CURRENT_AT_2026_09_22');assert([1,4].includes(item.page));assert(item.canonicalRecordId);}

  const chapterLayer=sourceManifest.layers.find(layer=>layer.id==='chapter-approved-2026-27');
  const corpusLayer=sourceManifest.layers.find(layer=>layer.id==='chapter-approved-2026-27-public-evidence-corpus');
  const gdmLayer=sourceManifest.layers.find(layer=>layer.id==='gdm-11e-event-terrain-layout-reference');
  assert.equal(chapterLayer.lifecycle,'ACCEPTED_SOURCE');assert(chapterLayer.paths.includes('missions/sources/chapter-approved-2026-27-evidence.json'));
  assert.equal(corpusLayer.lifecycle,'ACCEPTED_SOURCE_EVIDENCE');assert.equal(corpusLayer.authority,'mixed-per-record');assert.deepEqual(corpusLayer.factsOwned,[]);
  assert(corpusLayer.paths.includes(bookletArtifactPath));assert.equal(corpusLayer.coverage.referencePage08,'COMPLETE_PHYSICAL_SOURCE_CORROBORATED');assert.equal(corpusLayer.coverage.referencePage09,'COMPLETE_PHYSICAL_SOURCE_CORROBORATED');
  assert.equal(gdmLayer.classification,'SECONDARY_VISUAL_REFERENCE');assert.deepEqual(gdmLayer.factsOwned,[]);
  assert.equal(gdmEvidence.classification,'SECONDARY_VISUAL_REFERENCE');assert.equal(gdmEvidence.source.authority,'secondary');
  assert.equal(gdmEvidence.counts.forceDispositions,5);assert.equal(gdmEvidence.counts.unorderedMatchups,15);assert.equal(gdmEvidence.counts.layouts,45);assert.equal(gdmEvidence.counts.conflicts,0);
  assert.equal(data.eventLayoutReference.gdmOwnsFacts,false);

  const recordIds=new Set(records.map(record=>record.id));
  for(const overlay of data.faqOverlays){assert.equal(overlay.sourceId,eventSource.id);assert.equal(overlay.authority,'official');if(overlay.targetRecordId)assert(recordIds.has(overlay.targetRecordId),`${overlay.id}: unknown target`);}
  assert.deepEqual(data.unresolvedContentClaims,[]);assert.equal(data.boundaries.productionMissionModelCreated,false);
}

validate(evidence);
assert.match(acquisition,/CHAPTER_APPROVED_RULES_CONTENT=COMPLETE_FOR_MODELING/);assert.match(acquisition,/USER_SOURCE_NEEDED=NO/);
for(const domain of ['PRIMARY_MISSIONS','SECONDARIES','DEPLOYMENT','FORCE_DISPOSITION_CARD_CORPUS','TWISTS','MISSION_SEQUENCE_AND_SCORING','REFERENCE_BOOKLET'])assert.match(acquisition,new RegExp(`${domain}=READY_FOR_FACTUAL_MODELING`));
assert.doesNotMatch(acquisition,/source-acquisition result remains `BLOCKED_PHYSICAL_SOURCE_GAP`/);
assert.match(universe,/SOURCE EVIDENCE COMPLETE FOR MODELING; production model MISSING/);

const mutated=(change,pattern,options)=>{const value=clone(evidence);change(value);assert.throws(()=>validate(value,options),pattern);};
mutated(value=>value.records.twists[1].id=value.records.twists[0].id,/deep-equal|globally unique/);
mutated(value=>value.records.primaryMissions[0].physicalMultiplicity=1,/30/);
mutated(value=>value.records.secondaryObjectives[0].authority='official',/promoted to official/);
mutated(value=>value.records.deployments[0].provenanceSourceIds=[],/missing provenance/);
mutated(value=>value.records.twists[0].cutoff='2026-09-21',/wrong cutoff/);
mutated(value=>value.directedPrimaryMatrix[0].playerForceDispositionId='force-disposition-unknown',/falsy/);
mutated(value=>value.directedPrimaryMatrix[1]={...value.directedPrimaryMatrix[0]},/must be unique/);
mutated(value=>value.sources.find(source=>source.id==='event-companion-v1.2-2026-08-26').sha256='0'.repeat(64),/Expected values to be strictly equal/);
const poisonedManifest=clone(manifest);poisonedManifest.layers.find(layer=>layer.id==='gdm-11e-event-terrain-layout-reference').factsOwned=['event-layout-geometry'];
assert.throws(()=>validate(evidence,{sourceManifest:poisonedManifest,gdmEvidence:gdm}),/Expected values to be strictly deep-equal/);
const poisonedPage08Booklet=clone(bookletEvidence);poisonedPage08Booklet.claims=poisonedPage08Booklet.claims.filter(claim=>claim.id!=='page08-step12-begin-battle');
assert.throws(()=>validate(evidence,{booklet:poisonedPage08Booklet}),/missing required evidence claim page08-step12-begin-battle/);
const poisonedBooklet=clone(bookletEvidence);poisonedBooklet.claims=poisonedBooklet.claims.filter(claim=>claim.id!=='page09-or-condition');
assert.throws(()=>validate(evidence,{booklet:poisonedBooklet}),/missing required evidence claim page09-or-condition/);

const classCounts=[...evidence.records.forceDispositions,...evidence.records.primaryMissions,...evidence.records.secondaryObjectives,...evidence.records.deployments,...evidence.records.twists,...evidence.records.referenceSections].reduce((counts,record)=>{counts[record.evidenceClass]=(counts[record.evidenceClass]??0)+1;return counts;},{});
console.log(`Chapter Approved source evidence QA passed: 88 physical cards, 70 semantic evidence records, 25 directed/15 unordered Primary relationships, 45 referenced Event layouts, evidence classes ${JSON.stringify(classCounts)}, and 11 adversarial controls.`);
