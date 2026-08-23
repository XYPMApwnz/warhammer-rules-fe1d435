const SCHEMA='wh40k-army-book-targets/v1';
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

const attribute=(node,name)=>new RegExp(`\\s${name}="([^"]*)"`,'i').exec(node.open)?.[1]||'';
const classes=node=>new Set(attribute(node,'class').split(/\s+/).filter(Boolean));
const hasClass=(node,name)=>classes(node).has(name);
const descendants=node=>node.children.flatMap(child=>[child,...descendants(child)]);
const cleanLabel=value=>String(value||'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();

function parse(source){
  const root={tag:'root',start:0,openEnd:0,endStart:source.length,end:source.length,open:'',children:[],parent:null};
  const stack=[root],tokens=/<!--[\s\S]*?-->|<![^>]*>|<\/?([A-Za-z][\w:-]*)\b[^>]*>/g;
  for(let match;(match=tokens.exec(source));){
    if(!match[1])continue;
    const tag=match[1].toLowerCase(),closing=match[0][1]==='/';
    if(closing){
      const node=stack.at(-1);
      if(node===root||node.tag!==tag)throw new Error(`Unbalanced canonical reader markup near ${match[0]}`);
      node.endStart=match.index;node.end=tokens.lastIndex;stack.pop();continue;
    }
    const parent=stack.at(-1),node={tag,start:match.index,openEnd:tokens.lastIndex,endStart:tokens.lastIndex,end:tokens.lastIndex,open:match[0],children:[],parent};
    parent.children.push(node);
    if(!voidTags.has(tag)&&!match[0].endsWith('/>'))stack.push(node);
  }
  if(stack.length!==1)throw new Error(`Unclosed canonical reader element: ${stack.at(-1).tag}`);
  return root;
}

const findById=(tree,id)=>[tree,...descendants(tree)].find(node=>attribute(node,'id')===id)||null;
const containsCandidate=node=>descendants(node).some(child=>hasClass(child,'unit-card')||hasClass(child,'detachment')||hasClass(child,'content-group'));
const candidate=node=>Boolean(attribute(node,'id'))&&(attribute(node,'id')==='start'||hasClass(node,'unit-card')||hasClass(node,'detachment')||hasClass(node,'content-group')&&!containsCandidate(node));
const nearest=(node,set)=>{for(let current=node;current&&current.tag!=='root';current=current.parent)if(set.has(current))return current;return null;};
const directNavChildren=node=>descendants(node).filter(child=>child.tag==='li'&&nearest(child.parent,new Set([node]))===node);

export function createArmyBookTargetCatalog(readerHtml){
  const readerTree=parse(readerHtml),documentNode=[readerTree,...descendants(readerTree)].find(node=>hasClass(node,'document'));
  if(!documentNode)throw new Error('Canonical reader .document owner is missing');
  const html=readerHtml.slice(documentNode.openEnd,documentNode.endStart),contentTree=parse(html),toc=findById(readerTree,'tocTree');
  if(!toc)throw new Error('Canonical reader #tocTree is missing');

  const navElements=descendants(toc).filter(node=>node.tag==='li'&&attribute(node,'data-nav-id'));
  const navTargets=new Map();
  for(const node of navElements){
    const button=descendants(node).find(child=>child.tag==='button'&&attribute(child,'data-nav-target'));
    if(!button)throw new Error(`Navigation node ${attribute(node,'data-nav-id')} has no target`);
    const id=attribute(button,'data-nav-target');
    if(navTargets.has(id))throw new Error(`Duplicate canonical navigation target: ${id}`);
    navTargets.set(id,{node,button});
  }

  const candidates=[contentTree,...descendants(contentTree)].filter(node=>candidate(node)&&navTargets.has(attribute(node,'id'))),candidateSet=new Set(candidates),targets={},owners={};
  for(const owner of candidates){
    const id=attribute(owner,'id');
    targets[id]={start:owner.start,end:owner.end,tag:owner.tag};
  }
  for(const node of [contentTree,...descendants(contentTree)]){
    const owner=nearest(node,candidateSet);if(!owner)continue;
    const ownerId=attribute(owner,'id');
    for(const id of [attribute(node,'id'),attribute(node,'data-track')].filter(Boolean))owners[id]=ownerId;
  }

  const nodes=[];
  for(const [id,{node,button}] of navTargets){
    const parent=nearest(node.parent,new Set(navElements)),parentButton=parent&&descendants(parent).find(child=>child.tag==='button'&&attribute(child,'data-nav-target')),parentId=parentButton?attribute(parentButton,'data-nav-target'):null,mountOwnerId=owners[id]||null,children=directNavChildren(node),kind=mountOwnerId===id?'target':mountOwnerId?'inner-anchor':'branch';
    if(kind==='branch'&&!children.length)throw new Error(`Terminal navigation target has no canonical content owner: ${id}`);
    nodes.push({id,parentId,label:cleanLabel(readerHtml.slice(button.openEnd,button.endStart)),kind,mountOwnerId});
  }
  if(!targets.start||owners.start!=='start')throw new Error('Canonical Start target is missing');
  return {schema:SCHEMA,defaultTargetId:'start',html,nodes,owners,targets};
}

export function serializeArmyBookTargetCatalog(catalog){
  const json=JSON.stringify(catalog).replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  return `window.WH_ARMY_BOOK_TARGETS=Object.freeze(${json});\n`;
}

export function parseArmyBookTargetCatalog(source){
  const prefix='window.WH_ARMY_BOOK_TARGETS=Object.freeze(',start=source.indexOf(prefix),end=source.lastIndexOf(');');
  if(start<0||end<start)throw new Error('Invalid canonical target catalog script');
  const catalog=JSON.parse(source.slice(start+prefix.length,end));
  if(catalog.schema!==SCHEMA)throw new Error(`Unsupported canonical target catalog schema: ${catalog.schema}`);
  return catalog;
}

export function createArmyBookTargetBuild(readerHtml,{runtimeVersions}){
  const catalog=createArmyBookTargetCatalog(readerHtml),tree=parse(readerHtml),documentNode=[tree,...descendants(tree)].find(node=>hasClass(node,'document'));
  let stripped=readerHtml.slice(0,documentNode.openEnd)+readerHtml.slice(documentNode.endStart);
  const scripts=`<script src="../shared/controllers/view-router.js?v=${runtimeVersions.shared.viewRouter}" data-view-mode-only></script><script src="./scripts/target-data.js?v=${runtimeVersions.shared.targetCatalog}"></script><script src="../shared/target-mount.js?v=${runtimeVersions.shared.targetMount}"></script>`;
  const insertion=stripped.indexOf('<script src=');
  if(insertion<0)throw new Error('Canonical reader runtime insertion point is missing');
  stripped=stripped.slice(0,insertion)+scripts+stripped.slice(insertion);
  return {catalog,readerHtml:stripped,targetDataJs:serializeArmyBookTargetCatalog(catalog)};
}

export {SCHEMA as ARMY_BOOK_TARGET_SCHEMA};
