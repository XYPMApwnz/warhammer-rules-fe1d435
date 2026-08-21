const defaultLabels={
  'battle-tactic':'Battle Tactic Stratagem',
  'strategic-ploy':'Strategic Ploy Stratagem',
  wargear:'Wargear Stratagem',
  'epic-deed':'Epic Deed Stratagem',
  core:'Core Stratagem',
  'source-untyped':'Source type unverified',
  unknown:'Type unverified'
};

export function createStratagemPresentation({types=new Map(),labels={},labelMode='suffix'}={}){
  const typeLabels={...defaultLabels,...labels};
  const decorateTurns=root=>root.querySelectorAll('.stratagem').forEach(card=>{
    const when=[...card.querySelectorAll('.field,.label-row')].find(field=>field.querySelector('b')?.textContent.trim().toLowerCase()==='when')?.textContent||'';
    const turn=/opponent|enemy/i.test(when)?'THEIR TURN':/your\b/i.test(when)?'YOUR TURN':'ANY TURN';
    card.dataset.turn=turn;
    card.classList.remove('turn-any','turn-yours','turn-their');
    card.classList.add(turn==='THEIR TURN'?'turn-their':turn==='YOUR TURN'?'turn-yours':'turn-any');
  });
  const decorateTypes=root=>root.querySelectorAll('.stratagem').forEach(card=>{
    const typeNodes=[...card.querySelectorAll('.stratagem-type')],current=card.dataset.stratagemType||'',id=card.dataset.ruleId||card.id||'',raw=types.get(id)||types.get(id.replace(/^stratagem-/,'')),mapped=typeof raw==='string'?{canonicalType:raw}:raw||{},match=typeNodes[0]?.textContent.trim().match(/(Battle Tactic|Strategic Ploy|Wargear|Epic Deed|Core) Stratagem\s*$/i),resolved=mapped.canonicalType||mapped.typeStatus||(typeLabels[current]?current:'')||(match?match[1].toLowerCase().replace(/\s+/g,'-'):'unknown'),expected=mapped.sourceLabel||card.dataset.sourceLabel||typeLabels[resolved]||typeLabels.unknown;
    card.dataset.stratagemType=resolved;
    const label=typeNodes.shift()||document.createElement('span');
    typeNodes.forEach(node=>node.remove());
    label.classList.add('stratagem-type');
    if(labelMode==='exact'?label.textContent.trim()!==expected:resolved==='unknown'||!label.textContent.trim().toLowerCase().endsWith(expected.toLowerCase()))label.textContent=expected;
    const head=card.querySelector('.stratagem-head'),host=head?.querySelector(':scope > div:not(.cp)')||head;
    host?.append(label);
  });
  const decorate=root=>{decorateTurns(root);decorateTypes(root);};
  return Object.freeze({decorate,decorateTurns,decorateTypes});
}
