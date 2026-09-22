import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const sandbox={window:{}};
vm.runInNewContext(read('glossary/generated/glossary.en.js'),sandbox,{filename:'glossary/generated/glossary.en.js'});
const api=sandbox.window.WH40K_GLOSSARY;
const registry=json('glossary/registry.en.json').terms;
const aliases=json('glossary/aliases.en.json').aliases;
assert(api?.resolveView&&api?.entries,'Glossary runtime lacks the unified popup/viewer API');
assert.equal(api.entries().length,Object.keys(registry).length,'Runtime catalogue differs from the effective registry');

const books=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
let popupBindings=0;
for(const bookId of books){
  const context=json(`glossary/contexts/${bookId}.json`).terms;
  const views=api.forBook(bookId);
  for(const [localId,binding] of Object.entries(context)){
    const canonical=aliases[binding.termId]||binding.termId;
    const view=views[localId],owner=registry[canonical];
    assert(view,`${bookId}/${localId}: popup binding is absent`);
    assert.equal(view.id,canonical,`${bookId}/${localId}: popup resolves the wrong canonical identity`);
    assert.equal(view.definition,owner.definition.en,`${bookId}/${localId}: popup definition differs from the effective glossary`);
    assert.equal(JSON.stringify(view.source),JSON.stringify(owner.canonicalSource),`${bookId}/${localId}: popup fact source differs from the effective glossary`);
    popupBindings++;
  }
}

const app=read('books/shared/army-book-app.js');
assert.match(app,/const terms=root\.WH40K_GLOSSARY\?\.forBook\(config\.bookId\)\|\|\{\};/,'Army Book popup does not consume the effective glossary directly');
assert.doesNotMatch(app,/const terms=.*DG_TERMS/,'Army Book popup still permits local factual overrides');
const popup=read('books/shared/popup-content.js');
assert.match(popup,/structuredWeapon\(term\.structured\?\.weapon\)/,'Weapon popup does not consume structured effective facts');
assert.match(popup,/paragraph\.textContent=term\.definition/,'Rule popup does not consume the effective definition');
assert.doesNotMatch(popup,/findAbilityTerm/,'Popup still resolves factual references by display title');

for(const [alias,target] of [['grenade','core-rule-15-05-explosives'],['tank-shock','core-rule-15-06-crushing-impact']]){
  assert.equal(api.resolve(alias),target,`${alias}: runtime alias resolution drift`);
  assert.equal(api.resolveView('core-rules',alias).id,target,`${alias}: popup alias does not resolve the canonical identity`);
}

console.log(`Glossary popup parity QA passed: ${popupBindings} Army Book bindings share the effective registry.`);
