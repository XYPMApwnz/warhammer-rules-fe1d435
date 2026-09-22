import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {recordText} from './record-content.mjs';
import {applyCoreCurrentOfficial,loadCoreCurrentOfficial,loadCoreSourceRegistry} from './core-current-official.mjs';

const contentRoot=path.dirname(fileURLToPath(import.meta.url));
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const loadWindow=file=>{const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});return sandbox.window;};
const slug=value=>String(value).toLowerCase().replace(/[‘’']/g,'').replace(/\[[^\]]+\]/g,match=>match.slice(1,-1)).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){for(const child of Object.values(value))freeze(child);Object.freeze(value);}return value;};
const clone=value=>structuredClone(value);

export const EFFECTIVE_CORE_SCHEMA='wh40k-effective-core-catalog/v1';
export const CORE_RECORD_TYPES=Object.freeze(['MAIN_RULE','ERRATA','FAQ_CLARIFICATION','UNIVERSAL_RULE_UPDATE','CORE_CONCEPT']);
export const CORE_RECORD_STATES=Object.freeze(['FULL_CONTENT','IDENTITY_ONLY']);

function baseProvenance(sourceRegistry){
  const source=sourceRegistry.sources.find(item=>item.sourceId==='waha-digital-11e-snapshot');
  if(!source)throw new Error('Missing accepted Core base source registration');
  return {sourceId:source.sourceId,sourceClass:source.sourceClass,sourceArtifact:source.urlOrLocalArtifact,sourceDate:source.date,sourceScope:source.scope,authorityLevel:source.authorityLevel};
}

function pdfProvenance(coreSource,sourceRegistry){
  const source=sourceRegistry.sources.find(item=>item.sourceId==='gw-core-launch-faq-2026-06-01');
  if(!source)throw new Error('Missing accepted Core FAQ source registration');
  return {sourceId:source.sourceId,sourceClass:source.sourceClass,sourceArtifact:source.urlOrLocalArtifact,sourceDate:source.date,sourceScope:source.scope,authorityLevel:source.authorityLevel,sourceLocator:'Rules Appendix; page 88',artifactSha256:coreSource.meta.sha256};
}

function overrideProvenance(update,sourceRegistry){
  const source=sourceRegistry.sources.find(item=>item.sourceId===update.sourceId);
  if(!source)throw new Error(`Missing Core source registration: ${update.sourceId}`);
  return {sourceId:update.sourceId,sourceClass:update.sourceClass,sourceArtifact:update.sourceArtifact,sourceDate:update.sourceDate,sourceScope:source.scope,authorityLevel:source.authorityLevel,sourceLocator:update.sourceLocator,confidence:update.confidence,...(update.officialCorroboration?{officialCorroboration:update.officialCorroboration}:{}),...(update.additionalOfficialCorroboration?{additionalOfficialCorroboration:update.additionalOfficialCorroboration}:{})};
}

export function validateCoreIdentityRegistry(identityRegistry,baseRecords){
  if(identityRegistry.schema!=='wh40k-core-identity-registry/v1')throw new Error('Unknown Core identity registry schema');
  const codes=new Set(baseRecords.map(record=>record.code));
  const identityCodes=new Set(Object.keys(identityRegistry.rules||{}));
  if(codes.size!==baseRecords.length)throw new Error('Duplicate base Core rule code');
  if(codes.size!==identityCodes.size||[...codes].some(code=>!identityCodes.has(code)))throw new Error('Core identity registry does not exactly cover accepted base rule codes');
  const ids=[];
  for(const [code,id] of Object.entries(identityRegistry.rules)){
    if(!/^\d{2}\.\d{2}(?:\.\d{2})?$/.test(code)||!id)throw new Error(`Invalid Core rule identity: ${code}`);
    ids.push(id);
  }
  for(const [key,concept] of Object.entries(identityRegistry.concepts||{})){
    if(!concept.id||(concept.ownerCode&&!codes.has(concept.ownerCode)))throw new Error(`Invalid Core concept identity: ${key}`);
    if(!concept.ownerCode)ids.push(concept.id);
  }
  for(const [key,concept] of Object.entries(identityRegistry.derivedConcepts||{})){
    if(!concept.id||!concept.ownerCode||!codes.has(concept.ownerCode)||!concept.title)throw new Error(`Invalid derived Core concept identity: ${key}`);
    ids.push(concept.id);
  }
  for(const [code,pending] of Object.entries(identityRegistry.pending||{})){
    if(codes.has(code)||!pending.id||!pending.title||pending.state!=='IDENTITY_ONLY')throw new Error(`Invalid pending Core identity: ${code}`);
    ids.push(pending.id);
  }
  if(new Set(ids).size!==ids.length)throw new Error('Duplicate Core factual identity');
  return identityRegistry;
}

export function validateEffectiveCoreCatalog(catalog){
  if(catalog.schema!==EFFECTIVE_CORE_SCHEMA)throw new Error('Unknown effective Core catalog schema');
  const byId=new Map();
  for(const record of catalog.records){
    if(!record.id||byId.has(record.id)||!CORE_RECORD_TYPES.includes(record.recordType)||!CORE_RECORD_STATES.includes(record.state))throw new Error(`Invalid or duplicate effective Core record: ${record.id}`);
    if(record.state==='IDENTITY_ONLY'&&record.semanticContent!==null)throw new Error(`Identity-only Core record contains unaccepted semantics: ${record.id}`);
    if(record.state==='FULL_CONTENT'&&record.semanticContent===null&&record.recordType!=='ERRATA')throw new Error(`Full Core record has no semantics: ${record.id}`);
    byId.set(record.id,record);
  }
  const codes=new Set();
  for(const record of catalog.mainRules){
    if(!record.code||codes.has(record.code)||byId.get(record.id)!==record)throw new Error(`Invalid effective Core main rule: ${record.code}`);
    codes.add(record.code);
  }
  for(const record of catalog.records){
    for(const id of Object.values(record.relationships||{}).flat().filter(Boolean))if(!byId.has(id))throw new Error(`Unresolved Core relationship ${record.id} -> ${id}`);
  }
  return catalog;
}

export function createEffectiveCoreCatalog({root=contentRoot,base,coreSource,coreData,currentOfficial,sourceRegistry,identityRegistry}={}){
  const acceptedBase=clone(base||readJson(path.join(root,'core-rules.digital-11e.json')));
  const acceptedSource=clone(coreSource||loadWindow(path.join(root,'core-rules.source.en.js')).CORE_PDF_SOURCE);
  const acceptedData=clone(coreData||loadWindow(path.join(root,'core-rules.en.js')).CORE_RULES);
  const registry=clone(sourceRegistry||loadCoreSourceRegistry(root));
  const current=clone(currentOfficial||loadCoreCurrentOfficial(root));
  const identities=clone(identityRegistry||readJson(path.join(root,'core-identities.v1.json')));
  validateCoreIdentityRegistry(identities,acceptedBase.records);
  const effective=applyCoreCurrentOfficial(acceptedBase,current,registry);
  const baseOwner=baseProvenance(registry);
  const sections=[acceptedData.introduction,...acceptedData.groups.flatMap(group=>group.sections)];
  const sectionByNumber=new Map(sections.filter(section=>section.number).map(section=>[section.number.padStart(2,'0'),section.id]));
  const mainRules=effective.records.map(sourceRecord=>{
    const record=clone(sourceRecord),id=identities.rules[record.code];
    const parts=record.code.split('.'),parentCode=parts.length===3?parts.slice(0,2).join('.'):null;
    const section=sectionByNumber.get(record.code.slice(0,2));
    return {...record,id,recordType:'MAIN_RULE',semanticContent:recordText(record),provenance:{base:clone(baseOwner),...(record.currentOfficialOverride?{effectiveOverride:clone(record.currentOfficialOverride)}:{})},relationships:{...(parentCode?{parentRuleId:identities.rules[parentCode]}:{}),errataIds:current.ruleOverrides.filter(update=>update.code===record.code).map(update=>update.id)},state:'FULL_CONTENT',...(section?{fullRulePath:`books/core-rules/reader/${section}.html#rule-${record.code.replaceAll('.','-')}`}:{})};
  });
  const mainByCode=new Map(mainRules.map(record=>[record.code,record]));
  const errata=current.ruleOverrides.map(update=>{
    const owner=mainByCode.get(update.code);
    return {id:update.id,code:update.code,recordType:'ERRATA',title:`Update to ${owner.title}`,semanticContent:update.currentLine||null,operation:update.operation,parameters:{previousLine:update.previousLine||null,currentLine:update.currentLine||null,canonicalTitle:update.canonicalTitle||null,aliases:clone(update.aliases||[])},provenance:overrideProvenance(update,registry),relationships:{targetRuleId:owner.id},state:'FULL_CONTENT'};
  });
  const faqOwner=pdfProvenance(acceptedSource,registry);
  const faqs=(acceptedSource.faqs||[]).map(faq=>({id:faq.id,recordType:'FAQ_CLARIFICATION',title:faq.question,semanticContent:faq.answer,provenance:{...clone(faqOwner),sourceLocator:`Rules Appendix; page ${faq.page}`},relationships:{primaryRuleId:identities.rules[faq.primaryRule],relatedRuleIds:faq.relatedRules.map(code=>identities.rules[code])},state:'FULL_CONTENT',question:faq.question,answer:faq.answer,page:faq.page,primaryRule:faq.primaryRule,relatedRules:clone(faq.relatedRules)}));
  const pendingByCode=new Map(Object.entries(identities.pending||{}));
  const universalUpdates=current.universalRulesUpdates.map(update=>({id:update.id,recordType:'UNIVERSAL_RULE_UPDATE',title:update.title,semanticContent:update.text,provenance:overrideProvenance(update,registry),relationships:{canonicalReferenceIds:(update.canonicalReferences||[]).map(code=>identities.rules[code]||pendingByCode.get(code)?.id)},state:'FULL_CONTENT',text:update.text,partition:update.partition,canonicalReferences:clone(update.canonicalReferences||[]),overrides:update.overrides}));
  const identityOnly=[...pendingByCode].map(([code,pending])=>{
    const update=current.universalRulesUpdates.find(item=>(item.canonicalReferences||[]).includes(code));
    if(!update)throw new Error(`Pending Core identity has no accepted relationship owner: ${code}`);
    return {id:pending.id,code,recordType:'MAIN_RULE',title:pending.title,semanticContent:null,provenance:{...overrideProvenance(update,registry),sourceLocator:`${update.sourceLocator}; identity reference ${code}`,confidence:'OFFICIAL_IDENTITY_ONLY'},relationships:{referencedByUpdateIds:[update.id]},state:'IDENTITY_ONLY',evidenceStatus:'EVIDENCE_PENDING'};
  });
  const aliases={};
  const concepts=[];
  for(const [localId,entry] of Object.entries(acceptedData.terms||{})){
    const identity=identities.concepts[localId];
    if(!identity)throw new Error(`Missing explicit Core concept identity: ${localId}`);
    aliases[localId]=identity.id;
    if(identity.ownerCode)continue;
    concepts.push({id:identity.id,recordType:'CORE_CONCEPT',title:entry.title,semanticContent:entry.summary,provenance:{sourceId:'core-reader-curated-concepts',sourceClass:'ACCEPTED_CORE_PRESENTATION',sourceArtifact:'books/core-rules/content/core-rules.en.js',sourceDate:acceptedSource.meta?.file||'11E',sourceScope:'GLOBAL_CORE'},relationships:{},state:'FULL_CONTENT'});
  }
  for(const concept of Object.values(identities.derivedConcepts||{})){
    const owner=mainByCode.get(concept.ownerCode);
    concepts.push({id:concept.id,code:concept.ownerCode,recordType:'CORE_CONCEPT',title:concept.title,semanticContent:owner.semanticContent,provenance:clone(owner.provenance),relationships:{sourceRuleId:owner.id},state:'FULL_CONTENT'});
  }
  for(const record of mainRules)for(const alias of record.compatibilityAliases||[]){const key=slug(alias);if(key&&key!==record.id)aliases[key]=record.id;}
  const records=[...mainRules,...errata,...faqs,...universalUpdates,...identityOnly,...concepts];
  const byId=new Map(records.map(record=>[record.id,record])),byCode=new Map([...mainRules,...identityOnly].map(record=>[record.code,record]));
  const resolveId=value=>byId.has(value)?value:aliases[value]||null;
  const catalog={schema:EFFECTIVE_CORE_SCHEMA,asOf:current.asOf,records,mainRules,errata,faqs,universalUpdates,identityOnly,concepts,aliases,resolveId,getById:value=>byId.get(resolveId(value))||null,getByCode:code=>byCode.get(code)||null,presentation:{reader:acceptedData,sourceSections:acceptedSource.sections,sourceMeta:acceptedSource.meta,images:effective.images||{},baseMeta:effective.meta},identityRegistry:identities};
  validateEffectiveCoreCatalog(catalog);
  return freeze(catalog);
}



