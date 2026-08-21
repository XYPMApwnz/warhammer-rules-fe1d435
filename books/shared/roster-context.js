(function(root){
  'use strict';

  const SCHEMA='wh40k-army-roster-context/v1';
  const STORAGE_KEY='wh40k-rosters-v1';
  const UNKNOWN='unknown';

  const text=value=>{
    if(value==null)return null;
    const normalized=String(value).trim();
    return normalized||null;
  };
  const values=value=>value==null?[]:Array.isArray(value)?value:[value];
  const unique=(items,key=item=>String(item).toLowerCase())=>{
    const result=[],seen=new Set();
    for(const item of items){
      const normalized=text(item);
      if(!normalized)continue;
      const identity=key(normalized);
      if(seen.has(identity))continue;
      seen.add(identity);
      result.push(normalized);
    }
    return result;
  };
  const deepFreeze=(value,seen=new WeakSet())=>{
    if(!value||typeof value!=='object'||seen.has(value))return value;
    seen.add(value);
    Object.values(value).forEach(item=>deepFreeze(item,seen));
    return Object.freeze(value);
  };
  const keywordKey=value=>String(value).trim().toUpperCase();
  const keywordList=value=>unique(values(value),keywordKey);
  const difference=(left,right)=>{
    const excluded=new Set(right.map(keywordKey));
    return left.filter(item=>!excluded.has(keywordKey(item)));
  };
  const mergeKeywords=(...lists)=>unique(lists.flat(),keywordKey);
  const slug=value=>String(value||'').normalize('NFKD').replace(/[’']/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase();

  function normalizeKeywordProfile(input={}){
    const intrinsic=keywordList(input.intrinsic);
    const added=keywordList(input.added);
    const removed=keywordList(input.removed);
    const hasEffective=Object.prototype.hasOwnProperty.call(input,'effective');
    const effective=hasEffective?keywordList(input.effective):input.state&&input.state!==UNKNOWN?mergeKeywords(difference(intrinsic,removed),added):[];
    return {
      state:text(input.state)||(hasEffective||intrinsic.length||added.length||removed.length?'known':UNKNOWN),
      intrinsic,
      added,
      removed,
      effective
    };
  }

  function normalizeUnit(input={}){
    const instanceId=text(input.instanceId);
    const datasheetId=text(input.datasheetId);
    const sourceBookId=text(input.sourceBookId);
    return {
      instanceId,
      instanceState:text(input.instanceState)||(instanceId?'exact':UNKNOWN),
      datasheetId,
      datasheetState:text(input.datasheetState)||(datasheetId?'exact':UNKNOWN),
      title:text(input.title),
      source:{
        bookId:sourceBookId,
        state:text(input.sourceState)||(sourceBookId?'known':UNKNOWN),
        provenance:text(input.sourceProvenance)
      },
      keywords:normalizeKeywordProfile(input.keywords)
    };
  }

  function normalizeEnhancement(input={}){
    const ownerInstanceId=text(input.ownerInstanceId??input.owner?.instanceId);
    return {
      id:text(input.id),
      ruleId:text(input.ruleId),
      title:text(input.title||input.name),
      detachmentId:text(input.detachmentId),
      owner:{
        instanceId:ownerInstanceId,
        state:text(input.ownerState??input.ownerStatus??input.owner?.state)||(ownerInstanceId?'resolved':UNKNOWN)
      }
    };
  }

  function normalizeRelationSet(input){
    if(!input)return {state:UNKNOWN,entries:[]};
    const source=Array.isArray(input)?{entries:input}:input;
    const entries=values(source.entries).map(entry=>({
      id:text(entry.id),
      anchorInstanceId:text(entry.anchorInstanceId??entry.bodyguardInstanceId),
      memberInstanceIds:unique(values(entry.memberInstanceIds??entry.characterInstanceIds),value=>value),
      instanceIds:unique(values(entry.instanceIds),value=>value),
      state:text(entry.state)||text(source.state)||UNKNOWN,
      certainty:text(entry.certainty)||UNKNOWN,
      provenance:text(entry.provenance)||text(source.provenance)
    }));
    return {state:text(source.state)||(entries.length?'known':UNKNOWN),entries};
  }

  function create(input={}){
    const book=input.book||{};
    const detachment=input.detachment||{};
    const relations=input.relations||{};
    return deepFreeze({
      schema:SCHEMA,
      status:text(input.status)||UNKNOWN,
      rosterId:text(input.rosterId),
      book:{
        id:text(book.id),
        factionId:text(book.factionId),
        parentBookId:text(book.parentBookId),
        state:text(book.state)||(book.id?'known':UNKNOWN)
      },
      detachment:{
        ids:unique(values(detachment.ids),value=>value),
        state:text(detachment.state)||(values(detachment.ids).length?'selected':UNKNOWN)
      },
      units:values(input.units).map(normalizeUnit),
      enhancements:values(input.enhancements).map(normalizeEnhancement),
      relations:{
        attachments:normalizeRelationSet(relations.attachments),
        groups:normalizeRelationSet(relations.groups),
        formations:normalizeRelationSet(relations.formations)
      },
      provenance:{
        kind:'runtime-projection',
        persistenceKey:STORAGE_KEY,
        persistedSchemaChanged:false
      }
    });
  }

  function readRoster(environment,rosterId){
    let record=null,roster=null;
    try{
      const records=JSON.parse(environment.localStorage?.getItem(STORAGE_KEY)||'[]');
      record=Array.isArray(records)?records.find(item=>String(item?.id)===String(rosterId))||null:null;
      roster=record?.roster||null;
      if(!roster&&String(rosterId)==='1')roster=JSON.parse(environment.sessionStorage?.getItem('wh40k-roster-guide')||'null');
    }catch{}
    if(record?.sourceText&&environment.WHRosterParser){
      const parsed=environment.WHRosterParser.parse(record.sourceText);
      if(parsed?.units?.length)roster=parsed;
    }
    return {record,roster};
  }

  function factKeywords(card){
    let facts=null;
    try{facts=JSON.parse(card?.dataset?.ruleFacts||'null');}catch{}
    if(!facts)return [];
    const result=[];
    for(const candidate of [facts.intrinsicKeywords,facts.unitKeywords,facts.modelKeywords])if(Array.isArray(candidate))result.push(...candidate);
    if(Array.isArray(facts.keywords))result.push(...facts.keywords);
    else if(facts.keywords&&typeof facts.keywords==='object')for(const key of ['unit','model','faction','intrinsic'])if(Array.isArray(facts.keywords[key]))result.push(...facts.keywords[key]);
    return keywordList(result);
  }

  function renderedKeywords(card){
    const section=card?.querySelector?.('[id$="-keywords"]');
    if(!section)return {known:false,effective:[],markedAdded:[]};
    let nodes=[...section.querySelectorAll('.keyword-list > *, .content-block > p > .term-button, .roster-added-keyword, .roster-derived-keyword, [data-roster-keyword]')];
    if(!nodes.length){const list=section.querySelector('.keyword-list');if(list)nodes=[...list.children];}
    const effective=keywordList(nodes.map(node=>node.textContent));
    const markedAdded=keywordList(nodes.filter(node=>node.matches?.('.roster-added-keyword,.roster-derived-keyword,[data-roster-keyword]')).map(node=>node.textContent));
    return {known:Boolean(nodes.length),effective,markedAdded};
  }

  function keywordProfile(card,provided){
    if(provided)return normalizeKeywordProfile(provided);
    const intrinsic=factKeywords(card),rendered=renderedKeywords(card);
    if(!rendered.known)return normalizeKeywordProfile({intrinsic,state:intrinsic.length?'intrinsic-only':UNKNOWN});
    return normalizeKeywordProfile({
      intrinsic,
      added:mergeKeywords(rendered.markedAdded,difference(rendered.effective,intrinsic)),
      removed:difference(intrinsic,rendered.effective),
      effective:rendered.effective,
      state:intrinsic.length?'known':'effective-only'
    });
  }

  function cardIndex(documentRoot){
    const cards=[...(documentRoot?.querySelectorAll?.('.unit-card')||[])],byInstance=new Map(),byCanonical=new Map(),byTitle=new Map();
    for(const card of cards){
      const canonicalId=text(card.dataset?.rosterCanonicalId)||text(card.id)?.replace(/--roster-.*$/,'')||null;
      if(canonicalId&&!byCanonical.has(canonicalId))byCanonical.set(canonicalId,card);
      const title=text(card.dataset?.unitTitle);
      if(title&&!byTitle.has(slug(title)))byTitle.set(slug(title),card);
      for(const instanceId of String(card.dataset?.rosterStateGroup||'').split(/\s+/).filter(Boolean))byInstance.set(instanceId,card);
    }
    return {cards,byInstance,byCanonical,byTitle};
  }

  function resolveCard(unit,index){
    const instanceId=text(unit?.id);
    if(instanceId&&index.byInstance.has(instanceId))return index.byInstance.get(instanceId);
    const expected=`unit-${slug(unit?.name)}`;
    return index.byCanonical.get(expected)||index.byTitle.get(slug(unit?.name))||null;
  }

  function projectedGroups(index){
    const entries=[];
    for(const card of index.cards){
      const instanceIds=unique(String(card.dataset?.rosterStateGroup||'').split(/\s+/).filter(Boolean),value=>value);
      if(!instanceIds.length)continue;
      entries.push({id:text(card.id),instanceIds,state:'known',certainty:'current',provenance:'rendered-roster-state'});
    }
    return {state:entries.length?'known':UNKNOWN,entries};
  }

  function fromRuntime(options={}){
    const environment=options.root||root;
    const config=options.config||{};
    const settings=config.rosterContext===false?null:(config.rosterContext||{});
    const params=options.params||new URLSearchParams(environment.location?.search||'');
    const rosterId=params.get('roster');
    const book={id:config.bookId,factionId:config.factionId||config.bookId,parentBookId:settings?.parentBookId,state:'known'};
    if(!settings)return null;
    if(!rosterId)return create({status:'not-requested',book});
    const {record,roster}=readRoster(environment,rosterId);
    if(!roster)return create({status:'unavailable',rosterId,book});
    const adapter=options.adapter||options.rosterGuide?.rosterContext||{};
    const index=cardIndex(environment.document);
    const keywordProfiles=adapter.keywordProfiles||{};
    const unitSources=adapter.unitSources||{};
    const parentBookId=text(settings.parentBookId);
    const units=values(roster.units).map(unit=>{
      const instanceId=text(unit?.id),card=resolveCard(unit,index);
      const datasheetId=text(card?.dataset?.rosterCanonicalId)||text(card?.id)?.replace(/--roster-.*$/,'')||null;
      const source=instanceId?unitSources[instanceId]:null;
      return {
        instanceId,
        datasheetId,
        title:unit?.name,
        sourceBookId:text(source?.bookId)||(!parentBookId?config.bookId:null),
        sourceState:text(source?.state)||(!parentBookId?'known':UNKNOWN),
        sourceProvenance:text(source?.provenance)||(!parentBookId?'book-runtime':null),
        keywords:keywordProfile(card,instanceId?keywordProfiles[instanceId]:null)
      };
    });
    const enhancements=values(roster.enhancements||(roster.enhancement&&roster.enhancement!=='—'?[{name:roster.enhancement}]:[])).map(item=>({
      id:item.id,
      ruleId:item.ruleId,
      title:item.name||item.title,
      detachmentId:item.detachmentId,
      ownerInstanceId:item.ownerUnitId,
      ownerState:item.ownerStatus
    }));
    const detachmentIds=values(options.rosterGuide?.detachmentIds);
    return create({
      status:'ready',
      rosterId,
      book:{...book,factionId:text(roster.faction)||book.factionId},
      detachment:{ids:detachmentIds,state:detachmentIds.length?'selected':UNKNOWN},
      units,
      enhancements,
      relations:{
        attachments:adapter.attachments,
        groups:adapter.groups||projectedGroups(index),
        formations:adapter.formations
      }
    });
  }

  root.WHArmyRosterContext=Object.freeze({SCHEMA,create,fromRuntime});
}(window));
