const assert=require('node:assert/strict');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const datasheetLayer=require(path.join(root,'content','tyranids-codex-datasheets.en.json'));
const datasheets=[...datasheetLayer.datasheets,...(datasheetLayer.imperialArmour||[]),...(datasheetLayer.legends||[])];
const pack=require(path.join(root,'content','tyranids-faction-pack.en.json'));
const points=require(path.join(root,'content','tyranids-points.en.json'));
const wargear=require(path.join(root,'content','tyranids-codex-wargear.en.json'));
const parity=require(path.join(root,'content','tyranids-codex-parity.en.json'));
const key=value=>String(value||'').toLowerCase().replace(/\(aura\)/g,'').replace(/\bdefense\b/g,'defence').replace(/\bcamoflage\b/g,'camouflage').replace(/[^a-z0-9]+/g,' ').trim();

assert.deepEqual(wargear.units.map(item=>item.title).sort(),datasheets.map(item=>item.title).sort());
for(const unit of wargear.units){
  assert.ok(unit.url.startsWith(wargear.source.url),`${unit.title}: invalid source URL`);
  assert.ok(unit.composition,`${unit.title}: missing exact Unit Composition`);
  assert.ok(Array.isArray(unit.wargear),`${unit.title}: invalid Wargear Options`);
}

const packDetachments=new Set(pack.detachments.map(item=>item.title));
const codexEnhancements=points.enhancements.filter(item=>!packDetachments.has(item.detachment));
assert.equal(parity.detachments.length,6);
assert.equal(parity.detachments.flatMap(item=>item.enhancements).length,24);
assert.equal(parity.detachments.flatMap(item=>item.stratagems).length,36);
assert.doesNotMatch(JSON.stringify(parity),/closest enemy unit\]|вЂ/);
assert.match(parity.detachments.find(item=>item.title==='Invasion Fleet').rule.text,/\n\nSwarming Instincts\n/);
assert.deepEqual(parity.detachments.map(item=>item.title).sort(),[...new Set(codexEnhancements.map(item=>item.detachment))].sort());
for(const detachment of parity.detachments){
  assert.ok(detachment.rule.title&&detachment.rule.text,`${detachment.title}: missing Detachment rule`);
  assert.equal(detachment.enhancements.length,4,`${detachment.title}: expected four Enhancements`);
  assert.equal(detachment.stratagems.length,6,`${detachment.title}: expected six Stratagems`);
  const pointsByTitle=new Map(codexEnhancements.filter(item=>item.detachment===detachment.title).map(item=>[key(item.title),item]));
  for(const enhancement of detachment.enhancements){
    const priced=pointsByTitle.get(key(enhancement.title));
    assert.ok(priced,`${detachment.title}: unknown Enhancement ${enhancement.title}`);
    assert.equal(enhancement.id,priced.id);
    assert.equal(enhancement.value,priced.value);
    assert.ok(enhancement.text);
  }
  for(const stratagem of detachment.stratagems){
    assert.ok(stratagem.id&&stratagem.title&&stratagem.cp&&stratagem.category);
    assert.ok(stratagem.when&&stratagem.target&&stratagem.effect,`${stratagem.title}: incomplete card`);
  }
}

console.log('Tyranids source parity passed: 50 wargear/composition records, 6 Codex rules, 24 Enhancements, 36 Stratagems.');
