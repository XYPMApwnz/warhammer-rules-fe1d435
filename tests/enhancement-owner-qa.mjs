import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'books/shared/related-rules-matcher.js'),'utf8'),sandbox);
const matcher=sandbox.window.WHRelatedRules;
const normalize=ruleFacts.normalizeKeyword;
const decode=value=>String(value||'').replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'");
const profiles=book=>{
  const html=fs.readFileSync(path.join(root,`books/${book}/reader.html`),'utf8');
  return [...html.matchAll(/<article class="unit-card\b[^>]*id="([^"]+)"[^>]*data-rule-facts="([^"]+)"/g)].map(match=>ruleFacts.profileFromDataset({ruleFacts:decode(match[2])},{id:match[1]}));
};
const genericContracts=book=>{
  const data=read(`books/${book}/content/${book}-related-rules.en.json`);
  const config=read(`books/${book}/book.config.json`),pack=read(`books/${book}/${config.sources.factionPack}`);
  const parity=config.sources.codexParity?read(`books/${book}/${config.sources.codexParity}`):{detachments:[]};
  const detachmentById=new Map([...pack.detachments,...(parity.detachments||[])].flatMap(detachment=>(detachment.enhancements||[]).map(item=>[String(item.id).replace(/^enhancement-/,''),String(detachment.id).replace(/^detachment-/,'')])));
  return Object.fromEntries(Object.entries(data.enhancements).map(([id,contract])=>[id,{contract,detachment:detachmentById.get(id)||''}]));
};
const mechanicusContracts=()=>{
  const sources=[read('books/adeptus-mechanicus/content/adeptus-mechanicus-rules.en.json'),read('books/adeptus-mechanicus/content/adeptus-mechanicus-codex-detachments.en.json')];
  return Object.fromEntries(sources.flatMap(source=>source.detachments.flatMap(detachment=>(detachment.enhancements||[]).map(item=>[item.id,{contract:item.eligibility,detachment:String(detachment.id).replace(/^detachment-/,'')}]))));
};
const deathGuardContracts=()=>{
  const source=read('books/death-guard/content/death-guard-rules.en.json');
  return Object.fromEntries(source.sections.flatMap(section=>(section.subsections||[]).flatMap(subsection=>(subsection.blocks||[]).filter(item=>item.type==='enhancement').map(item=>[item.id,{contract:{v:1,tags:item.tags,owner:item.owner,assignment:item.assignment},detachment:String(section.id).replace(/^detachment-/,'')}]))));
};
const inventories={
  'death-guard':deathGuardContracts(),
  'adeptus-mechanicus':mechanicusContracts(),
  tyranids:genericContracts('tyranids'),
  'tau-empire':genericContracts('tau-empire')
};
const grantsFor=(book,entry,profile)=>{
  if(book==='death-guard'&&entry.detachment==='contagion-engines'&&['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].includes(profile.unitId))return {...profile,keywords:new Set([...profile.keywords,'CONTAGION ENGINE'])};
  if(book==='tyranids'&&entry.detachment==='subterranean-assault'&&profile.unitId==='unit-trygon')return {...profile,conditionalKeywords:new Set(['CHARACTER'])};
  return profile;
};
const matrix={};
for(const [book,entries] of Object.entries(inventories)){
  const units=profiles(book);matrix[book]={};
  for(const [id,entry] of Object.entries(entries)){
    const states={match:[],conditional:[]};
    for(const unit of units){const state=matcher.match(entry.contract,grantsFor(book,entry,unit)).state;if(state!=='no-match')states[state].push(unit.unitId);}
    matrix[book][id]={match:states.match.sort(),conditional:states.conditional.sort()};
    const isUpgrade=(entry.contract.tags||[]).includes('UPGRADE');
    for(const unit of units){
      const state=matcher.match(entry.contract,grantsFor(book,entry,unit)).state;
      if(!isUpgrade&&!unit.keywords.has('CHARACTER')&&!(book==='tyranids'&&unit.unitId==='unit-trygon'&&state==='conditional'))assert.equal(state,'no-match',`${book}/${id}: standard Enhancement offered to non-Character ${unit.unitId}`);
      if(!isUpgrade&&unit.keywords.has('EPIC HERO'))assert.equal(state,'no-match',`${book}/${id}: standard Enhancement offered to Epic Hero ${unit.unitId}`);
    }
  }
}

const fixturePath=path.join(root,'tests/fixtures/enhancement-owner-matrix.json');
if(process.argv.includes('--write'))fs.writeFileSync(fixturePath,JSON.stringify({schema:1,books:Object.fromEntries(Object.entries(matrix).filter(([book])=>book!=='death-guard'))},null,2)+'\n');
const expected={...read('tests/fixtures/enhancement-owner-matrix.json').books,'death-guard':read('books/death-guard/sources/enhancement-owner-matrix.json').enhancements};
assert.deepEqual(matrix,expected,'Enhancement owner matrix changed; review every changed match before updating the locked fixture');

assert.deepEqual(matrix['death-guard']['enhancement-parasitic-woe-reaper'].match.sort(),['unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler'].sort());
for(const entries of Object.values(matrix['death-guard']))assert.ok(!entries.match.includes('unit-mortarion')&&!entries.match.includes('unit-typhus'),'Death Guard Epic Heroes must receive no standard Enhancement');
assert.deepEqual(matrix['adeptus-mechanicus']['enhancement-stealth-screened-cybercanids-upgrade'].match,['unit-serberys-raiders']);
for(const entries of Object.values(matrix['adeptus-mechanicus']))assert.ok(!entries.match.includes('unit-skitarii-rangers')&&!entries.match.includes('unit-kastelan-robots'),'Mechanicus Bodyguards must not inherit their Leader model\'s Enhancement eligibility');
assert.deepEqual(matrix['adeptus-mechanicus']['enhancement-vinghs-wafers-of-dynamism'].match,['unit-cybernetica-datasmith']);
assert.deepEqual(matrix['adeptus-mechanicus']['enhancement-transoracular-dyad-wafers'].match,['unit-cybernetica-datasmith']);
assert.deepEqual(matrix.tyranids['trygon-prime'].conditional,['unit-trygon']);
assert.ok(matrix.tyranids['enhancement-adrenalised-onslaught'].match.includes('unit-hyperadapted-raveners'));
assert.deepEqual(matrix['tau-empire']['thermoneutronic-projector'].match.sort(),['unit-commander-in-coldstar-battlesuit','unit-commander-in-enforcer-battlesuit'].sort());
console.log(`PASS  Exhaustive Enhancement owner matrix: ${Object.values(inventories).reduce((sum,items)=>sum+Object.keys(items).length,0)} Enhancements across four published books.`);
