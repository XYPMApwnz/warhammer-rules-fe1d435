const normalizeKeyword=value=>String(value||'').normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,' ').trim().toUpperCase();
const slug=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const uniqueSorted=values=>[...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b));

export function buildKeywordIdentity({registry,keywordLinks}){
  const byForm=new Map();
  for(const id of registry.keys())if(id.startsWith('keyword-')){
    const canonical=normalizeKeyword(id.slice('keyword-'.length).replaceAll('-',' '));
    byForm.set(canonical,id);
    byForm.set(`${canonical}S`,id);
  }
  for(const [id,profile] of Object.entries(keywordLinks.keywords||{}))for(const form of profile.forms||[])byForm.set(normalizeKeyword(form),id);
  return byForm;
}

export function deriveKeywordCompatibilityAliases({registry,keywordLinks}){
  const aliases={};
  for(const [id,profile] of Object.entries(keywordLinks.keywords||{})){
    if(!registry.has(id))continue;
    const forms=(profile.forms||[]).map(normalizeKeyword).filter(Boolean);
    if(!forms.length)throw new Error(`Keyword alias owner has no declared forms: ${id}`);
    const canonical=forms[0];
    for(const form of forms.slice(1)){
      if(form===`${canonical}S`||form===`${canonical}ES`)continue;
      const alias=`keyword-${slug(form)}`;
      if(alias!==id)aliases[alias]=id;
    }
  }
  return aliases;
}

function selectorKeywords(selector,unitKeywordsById,keywordByForm){
  const result=[];
  if(!selector||typeof selector!=='object')return result;
  for(const key of ['all','any','allKeywords','anyKeywords','keywords'])for(const value of selector[key]||[]){
    const id=keywordByForm.get(normalizeKeyword(value));
    if(id)result.push(id);
  }
  for(const alternative of selector.alternatives||[])result.push(...selectorKeywords(alternative,unitKeywordsById,keywordByForm));
  const unitIds=selector.unitIds||[];
  if(unitIds.length){
    const keywordSets=unitIds.map(id=>{
      const keywords=unitKeywordsById.get(id);
      if(!keywords)throw new Error(`Structured relation selector references unknown unit ${id}`);
      return new Set(keywords.map(value=>keywordByForm.get(normalizeKeyword(value))).filter(Boolean));
    });
    for(const id of keywordSets[0])if(keywordSets.every(set=>set.has(id)))result.push(id);
  }
  return result;
}

export function keywordRelationsFromEligibility({eligibility,unitKeywordsById=new Map(),keywordByForm}){
  const result=[];
  if(!eligibility||typeof eligibility!=='object')return result;
  if(eligibility.owner?.selector)result.push(...selectorKeywords(eligibility.owner.selector,unitKeywordsById,keywordByForm));
  for(const target of eligibility.targets||[])result.push(...selectorKeywords(target,unitKeywordsById,keywordByForm));
  return uniqueSorted(result);
}

export function applyDeterministicRelatedPolicies({registry,keywordLinks,relationClaims=[]}){
  const claimedByKeyword=new Map();
  for(const claim of relationClaims){
    if(!registry.has(claim.termId))throw new Error(`Structured relation claim references unknown term ${claim.termId}`);
    for(const keywordId of claim.keywordIds){
      if(!registry.has(keywordId))throw new Error(`Structured relation claim references unknown keyword ${keywordId}`);
      const ids=claimedByKeyword.get(keywordId)||[];
      ids.push(claim.termId);
      claimedByKeyword.set(keywordId,ids);
    }
  }
  const reverseMentions=new Map();
  for(const term of registry.values())for(const mentioned of term.mentions||[]){
    if(!String(mentioned).startsWith('keyword-'))continue;
    const ids=reverseMentions.get(mentioned)||[];
    ids.push(term.id);
    reverseMentions.set(mentioned,ids);
  }
  for(const term of registry.values()){
    if(term.kind!=='keyword'&&!term.id.startsWith('keyword-'))continue;
    const profile=keywordLinks.keywords?.[term.id]||{};
    term.related=uniqueSorted([
      ...(profile.intrinsicRules||[]),
      ...(profile.referencedByRules||[]),
      ...(profile.relatedKeywords||[]),
      ...(reverseMentions.get(term.id)||[]),
      ...(claimedByKeyword.get(term.id)||[])
    ].filter(id=>id!==term.id&&registry.has(id)));
  }
}

export function derivePresentation(term,{contextOnly=false}={}){
  if(term.kind==='unit'||contextOnly)return'metadata';
  if(term.kind==='weapon'||term.structured?.weapon||term.structured?.statline)return'profile';
  if(term.kind==='keyword'||term.id.startsWith('keyword-'))return'reference';
  const summary=String(term.summary?.en||'').replace(/\s+/g,' ').trim();
  const definition=String(term.definition?.en||'').replace(/\s+/g,' ').trim();
  return summary===definition?'atomic':'article';
}

export function validateGlossaryGraph({registry,aliases,contexts,bookDependencies={}}){
  const ids=new Set(registry.keys());
  for(const [alias,target] of Object.entries(aliases)){
    if(!ids.has(target))throw new Error(`Glossary alias ${alias} references unknown target ${target}`);
    if(alias===target)throw new Error(`Glossary alias ${alias} points to itself`);
    if(aliases[target])throw new Error(`Glossary alias ${alias} chains through ${target}`);
  }
  for(const [bookId,records] of Object.entries(contexts))for(const [localId,record] of Object.entries(records)){
    const target=aliases[record.termId]||record.termId;
    if(!ids.has(target))throw new Error(`Glossary context ${bookId}/${localId} references unknown term ${record.termId}`);
    const scope=registry.get(target).scope,dependencies=new Set(bookDependencies[bookId]||[]);
    if(scope!=='global'&&scope!==bookId&&!dependencies.has(scope))throw new Error(`Glossary context ${bookId}/${localId} has wrong book ownership ${scope}`);
  }
  for(const term of registry.values())for(const id of [...(term.related||[]),...(term.mentions||[])])if(!ids.has(id))throw new Error(`Glossary term ${term.id} references unknown relation ${id}`);
}
