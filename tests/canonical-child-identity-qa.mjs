import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import {assignCanonicalChildIdentities} from '../books/shared/tools/canonical-join-contract.mjs';

const root=path.resolve(import.meta.dirname,'..');
const parent={id:'unit-canonical-parent'};
const records=[
  {title:'Repeated title',text:'first semantic contract'},
  {title:'Repeated title',text:'second semantic contract'}
];
const options={kind:'ability',titleOf:item=>item.title,semanticOf:item=>({sourceTitle:item.title,text:item.text}),legacyIdOf:(item,index)=>`legacy-${index+1}`};
const byText=items=>Object.fromEntries(items.map(item=>[item.text,item.id]));

const initial=assignCanonicalChildIdentities(parent,records,options);
const reordered=assignCanonicalChildIdentities(parent,[...records].reverse(),options);
const inserted=assignCanonicalChildIdentities(parent,[{title:'Inserted',text:'unrelated'},...records],options);
assert.deepEqual(byText(reordered),byText(initial),'source reordering must not change canonical child identity');
assert.deepEqual(Object.fromEntries(Object.entries(byText(inserted)).filter(([text])=>text!=='unrelated')),byText(initial),'source insertion must not change existing canonical child identity');
assert.notEqual(initial[0].id,initial[1].id,'same display title with different semantics must receive distinct identities');
assert.deepEqual(initial.map(item=>item.legacyIds),[['legacy-1'],['legacy-2']],'legacy positional identities remain explicit compatibility aliases');

const renamed=initial.map(item=>({...item,title:`Display ${item.title}`}));
assert.deepEqual(renamed.map(item=>item.id),initial.map(item=>item.id),'display-title changes after canonicalization must not change identity');
assert.throws(()=>assignCanonicalChildIdentities(parent,[{id:'duplicate',title:'A'},{id:'duplicate',title:'B'}],options),/duplicate ability canonical child identity/,'duplicate explicit child identities fail closed');
assert.throws(()=>assignCanonicalChildIdentities(parent,[records[0],{...records[0]}],options),/duplicate ability canonical child identity/,'duplicate derived child identities fail closed');

const books=['tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
for(const book of books){
  const sandbox={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),sandbox);
  const catalog=sandbox.window.WH_BOOK_ROSTER_CATALOG;
  for(const unit of catalog.units){
    const game=unit.gameSelections||{},profiles=new Set((game.weaponProfiles||[]).map(item=>item.id)),abilities=new Set([...(game.abilities||[]),...(game.wargearAbilities||[])].map(item=>item.id)),models=new Set((game.models||[]).map(item=>item.id));
    assert.equal(profiles.size,(game.weaponProfiles||[]).length,`${book}/${unit.id}: weapon profile identities must be unique`);
    assert.equal(abilities.size,(game.abilities||[]).length+(game.wargearAbilities||[]).length,`${book}/${unit.id}: ability identities must be unique`);
    assert.equal(models.size,(game.models||[]).length,`${book}/${unit.id}: model identities must be unique`);
    for(const selection of game.selections||[]){
      for(const id of selection.profileIds||[])assert.ok(profiles.has(id),`${book}/${unit.id}: selection references unknown profile ${id}`);
      for(const id of selection.wargearAbilityIds||[])assert.ok(abilities.has(id),`${book}/${unit.id}: selection references unknown wargear ability ${id}`);
    }
    for(const record of [...(game.weaponProfiles||[]),...(game.abilities||[]),...(game.wargearAbilities||[]),...(game.models||[])]){
      assert.ok(typeof record.id==='string'&&record.id.length>0&&!/\s/.test(record.id),`${book}/${unit.id}: child identity must be a non-empty exact token`);
      if(record.legacyIds)assert.equal(new Set(record.legacyIds).size,record.legacyIds.length,`${book}/${unit.id}: legacy aliases must be unique`);
    }
  }
}

console.log('Canonical child identity QA passed: reorder, insertion, rename, collision, distinct semantics and catalog references.');
