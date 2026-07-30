const keys=['canLead','canSupport','canBeLedBy','canBeSupportedBy'];
const inverse={leader:['canLead','canBeLedBy'],support:['canSupport','canBeSupportedBy']};

export function buildRelationGraphs(units,edges){
  const byId=new Map(units.map(unit=>[unit.id,unit]));
  const graphs=new Map(units.map(unit=>[unit.id,Object.fromEntries(keys.map(key=>[key,[]]))]));
  const seen=new Set();
  for(const edge of edges){
    const pair=inverse[edge.role];
    if(!pair)throw new Error(`Unsupported relation role: ${edge.role}`);
    const source=byId.get(edge.sourceId),target=byId.get(edge.targetId);
    if(!source||!target)throw new Error(`Unknown relation: ${edge.sourceId} -> ${edge.targetId}`);
    const id=`${edge.role}\0${source.id}\0${target.id}`;
    if(seen.has(id))continue;seen.add(id);
    const fact=(unit,mandatory)=>({unitId:unit.id,keywords:unit.keywords||[],characterCount:(unit.keywords||[]).some(value=>String(value).toUpperCase()==='CHARACTER')?1:0,...(edge.removeKeywords?.length?{removeKeywords:edge.removeKeywords}: {}),...(mandatory?{mandatory:true}: {})});
    graphs.get(source.id)[pair[0]].push(fact(target,edge.mandatory===true));
    graphs.get(target.id)[pair[1]].push(fact(source,false));
  }
  const maxCharacters=unitId=>{
    const graph=graphs.get(unitId),unit=byId.get(unitId);
    return ((unit.keywords||[]).some(value=>String(value).toUpperCase()==='CHARACTER')?1:0)
      +(graph.canBeLedBy.length?1:0)+(graph.canBeSupportedBy.length?1:0);
  };
  for(const [unitId,graph] of graphs){
    for(const key of keys)for(const relation of graph[key]){
      const bodyguardId=key==='canLead'||key==='canSupport'?relation.unitId:unitId;
      relation.maxCharacters=maxCharacters(bodyguardId);
    }
    for(const key of keys)graph[key].sort((a,b)=>a.unitId.localeCompare(b.unitId));
  }
  return graphs;
}
