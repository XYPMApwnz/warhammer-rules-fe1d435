import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createCoreFactProjection} from '../books/core-rules/content/core-fact-projection.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const registry=read('glossary/registry.en.json');
const aliasDocument=read('glossary/aliases.en.json');
const terms=registry.terms,aliases=aliasDocument.aliases;
const normalized=value=>String(value||'').replace(/\s+/g,' ').trim();
const classes=new Set(['UPSTREAM_PROJECTED','GLOSSARY_NATIVE','PRESENTATION_ONLY']);

for(const [id,term] of Object.entries(terms)){
  assert.equal(term.id,id,`${id}: registry key and stable term ID differ`);
  assert(classes.has(term.entryClass),`${id}: invalid entry class`);
  assert(term.ownerType&&term.ownerId,`${id}: missing factual owner`);
  assert(term.sourceRef?.documentId&&term.sourceRef?.revision&&term.sourceRef?.locator,`${id}: missing source reference`);
  if(term.entryClass==='GLOSSARY_NATIVE')assert.equal(term.sourceRef.documentId,'glossary-native',`${id}: native entry lacks native provenance`);
}
assert.equal(aliasDocument.schema,2,'Alias projection schema must expose alias-only records');
assert.equal(aliasDocument.entries.length,Object.keys(aliases).length,'Every alias must have one alias-only record');
for(const record of aliasDocument.entries){
  assert.equal(record.entryClass,'ALIAS_ONLY');
  assert.equal(aliases[record.id],record.targetTermId,`${record.id}: alias record differs from lookup map`);
  assert(terms[record.targetTermId],`${record.id}: orphan alias target`);
  assert(!terms[record.id],`${record.id}: alias shadows a canonical term`);
}

const core=createCoreFactProjection({repoRoot:root});
for(const projected of core.terms){
  const term=terms[projected.id];
  if(!term)continue;
  assert.equal(normalized(term.definition.en),normalized(projected.definition),`${projected.id}: Core semantic projection drift`);
  assert.equal(term.ownerType,'CORE_FACT',`${projected.id}: Core owner type drift`);
}
for(const update of core.coreUniversalUpdates){
  const term=terms[update.id];
  assert(term,`${update.id}: Universal Rules Update is absent`);
  assert.equal(normalized(term.definition.en),normalized(update.text),`${update.id}: Universal Rules Update semantic drift`);
  assert.equal(term.ownerType,'CORE_FACT');
}

const engaged=terms['core-rule-17-03-shooting-at-engaged-monsters-and-vehicles'];
assert.match(engaged.definition.en,/excluding attacks made with \[BLAST\] weapons/i,'17.03 lost the accepted Blast exception');
const commandPoints=terms['core-rule-08-02-01-command-points'];
assert.match(commandPoints.definition.en,/single extra CP per battle round/i,'Command Points lost the accepted additional-CP cap');
assert.equal(aliases.grenade,'core-rule-15-05-explosives','Grenade must resolve to Explosives');
assert.equal(aliases['grenade-stratagem'],'core-rule-15-05-explosives');
assert.equal(aliases['tank-shock'],'core-rule-15-06-crushing-impact','Tank Shock must resolve to Crushing Impact');

const books=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
for(const bookId of books){
  const context=read(`glossary/contexts/${bookId}.json`);
  for(const [localId,record] of Object.entries(context.terms)){
    const canonical=aliases[record.termId]||record.termId;
    const term=terms[canonical];
    assert(term,`${bookId}/${localId}: unresolved effective glossary owner`);
    assert(['global',bookId,...(bookId==='dark-angels'||bookId==='blood-angels'?['space-marines']:[])].includes(term.scope),`${bookId}/${localId}: wrong effective owner scope ${term.scope}`);
    for(const field of ['title','summary','definition','structured'])assert(!(field in record),`${bookId}/${localId}: context independently owns ${field}`);
  }
}

console.log(`Glossary projection contract QA passed: stable owners, ${core.coreUniversalUpdates.length} Universal Rules Updates, ${books.length} Army Book contexts.`);
