import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'content/chaos-space-marines-codex-datasheets.en.json'),'utf8'));
const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8');
const glossary=JSON.parse(fs.readFileSync(path.resolve(root,'../../glossary/registry.en.json'),'utf8')).terms;
const localContext=JSON.parse(fs.readFileSync(path.resolve(root,'../../glossary/contexts/chaos-space-marines.json'),'utf8')).terms;
const coreBaseKey=value=>String(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+(?:d\d+|\d+)$/,'').trim();
const coreTitles=new Set(Object.entries(glossary).filter(([id])=>id.startsWith('core-')).map(([,term])=>coreBaseKey(String(term.title?.en||'').replace(/^\[|\]$/g,''))));
const resolves=id=>Boolean(glossary[id]||localContext[id]);

function extract(tag,id,html=reader){
  const opener=new RegExp(`<${tag}\\b[^>]*\\bid="${id}"[^>]*>`,'i').exec(html);
  assert.ok(opener,`Missing ${tag}#${id}`);
  const tags=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tags.lastIndex=opener.index;
  let depth=0;
  for(let match;(match=tags.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return html.slice(opener.index,tags.lastIndex);}
  assert.fail(`Unclosed ${tag}#${id}`);
}

const slug=value=>String(value).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const pollution=new Set(['Khorne','Nurgle','Slaanesh','Tzeentch','Warp Stalker','Mutant Form','Massive Fangs','Eightfold Eyes','Daemonic Flesh','Scorpion Tail','Iron-hard Talons','Dark Blessing','Chaos icon','Choice Samples']);
const representatives=new Map([
  ['Accursed Cultists','Howling Horde'],['Cultist Mob','For the Dark Gods'],['Legionaries','Veterans of the Long War'],
  ['Chosen','Chosen Marauders'],['Chaos Terminator Squad','Despoilers'],['Abaddon the Despoiler','The Warmaster'],
  ['Defiler','Scuttling Walker'],['Forgefiend','Daemonic Ordnance'],['Possessed','Unholy Bloodshed']
]);

assert.equal(source.datasheets.length,54);
let wargearCount=0;
for(const unit of source.datasheets){
  const abilitiesId=`${unit.id.replace(/^unit-/,'')}-abilities`;
  const article=extract('article',unit.id),abilities=extract('section',abilitiesId,article);
  const phone=fs.readFileSync(path.join(root,'mobile',`${unit.id.replace(/^unit-/,'')}.html`),'utf8');
  const phoneAbilities=extract('section',abilitiesId,phone);
  assert.equal(unit.abilities.filter(item=>item.abilityClass==='faction'&&item.title==='Dark Pacts').length,1,`${unit.title}: Dark Pacts classification`);
  for(const item of unit.abilities){
    assert.ok(['core','faction','datasheet'].includes(item.abilityClass),`${unit.title}: invalid class for ${item.title}`);
    const field=`data-source-field="abilities.${slug(item.title)}"`;
    const presentationClass=coreTitles.has(coreBaseKey(item.title))?'core':item.abilityClass;
    if(presentationClass==='core'||presentationClass==='faction'){
      assert.match(abilities,new RegExp(`data-ability-class="${presentationClass}"[\\s\\S]*?${field}`),`${unit.title}: ${item.title} is not compact`);
      assert.doesNotMatch(abilities,new RegExp(`<article class="ability" ${field}`),`${unit.title}: ${item.title} leaked as a full card`);
    }else{
      assert.match(abilities,new RegExp(`<article class="ability" ${field}[\\s\\S]*?<p data-source-field="text">`),`${unit.title}: ${item.title} lost full text`);
    }
  }
  assert.match(abilities,/data-ability-class="faction">[\s\S]*?<h5>FACTION<\/h5>[\s\S]*?>Dark Pacts<\/button>/,`${unit.title}: missing FACTION block`);
  const hydratedPhone=phoneAbilities
    .replaceAll('data-source-term=','data-term=')
    .replaceAll(' disabled','')
    .replace(/ data-term-(?:title|summary|full-rule-path)="[^"]*"/g,'')
    .replace(/ data-full-rule-path="[^"]*"/g,'');
  assert.equal(hydratedPhone,abilities,`${unit.title}: Desktop and Phone ability semantics differ`);
  for(const item of unit.wargearAbilities||[]){
    wargearCount++;
    assert.match(article,new RegExp(`data-source-field="wargearAbilities.${slug(item.title)}"`),`${unit.title}: source-backed Wargear Ability missing`);
  }
  for(const id of [...abilities.matchAll(/data-term="([^"]+)"/g)].map(match=>match[1]))assert.ok(resolves(id),`${unit.title}: unresolved term ${id}`);
  for(const id of [...phoneAbilities.matchAll(/data-source-term="([^"]+)"/g)].map(match=>match[1]))assert.ok(resolves(id),`${unit.title}: unresolved Phone term ${id}`);
}

for(const [title,ability] of representatives){
  const unit=source.datasheets.find(item=>item.title===title);
  assert.ok(unit,`Missing representative ${title}`);
  assert.ok(unit.abilities.some(item=>item.title===ability&&item.abilityClass==='datasheet'),`${title}: missing unique ${ability}`);
}
for(const unit of source.datasheets)for(const item of unit.abilities)assert.ok(!pollution.has(item.title),`${unit.title}: upgrade ${item.title} leaked`);
const accursed=extract('section','accursed-cultists-abilities');
assert.match(accursed,/data-ability-class="core">[\s\S]*?>Feel No Pain 6\+<\/button>[\s\S]*?>Scouts 6&quot;<\/button>/);
assert.match(accursed,/data-ability-class="faction">[\s\S]*?>Dark Pacts<\/button>/);
assert.match(accursed,/>Howling Horde<\/button>[\s\S]*?<p data-source-field="text">/);
assert.deepEqual(source.datasheets.filter(unit=>unit.wargearAbilities?.length).map(unit=>unit.title),['Legionaries','Dark Commune','Sorcerer in Terminator Armour','Chosen','Nemesis Claw','Possessed','Chaos Bikers']);
assert.equal(wargearCount,7,'CSM source-backed Wargear Abilities changed');
console.log(`CSM ability QA: 54 current Datasheets; Core/Faction compact; unique text, Wargear handling and glossary targets verified.`);
