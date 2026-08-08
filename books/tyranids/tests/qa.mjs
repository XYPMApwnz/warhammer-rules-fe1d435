import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(root,'../..');
const readJson=relative=>JSON.parse(fs.readFileSync(path.join(root,relative),'utf8'));
const titleKey=value=>String(value).replace(/\s*\([^)]*\)\s*$/,'').trim().toLowerCase();
const pack=readJson('content/tyranids-faction-pack.en.json');
const codex=readJson('content/tyranids-codex-datasheets.en.json');
const points=readJson('content/tyranids-points.en.json');
const relatedRules=readJson('content/tyranids-related-rules.en.json');
const codexParity=readJson('content/tyranids-codex-parity.en.json');
const codexWargear=readJson('content/tyranids-codex-wargear.en.json');
const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8');
const app=fs.readFileSync(path.join(root,'scripts','app.js'),'utf8');
const bookCss=fs.readFileSync(path.join(root,'styles','book.css'),'utf8');
const sharedContentCss=fs.readFileSync(path.join(repo,'books','death-guard','styles','content.css'),'utf8');
const related=fs.readFileSync(path.join(root,'mobile','related-rules.inc'),'utf8');
const context=JSON.parse(fs.readFileSync(path.join(repo,'glossary','contexts','tyranids.json'),'utf8'));
const glossary=JSON.parse(fs.readFileSync(path.join(repo,'glossary','registry.en.json'),'utf8')).terms;
const allUnits=[...codex.datasheets,...codex.imperialArmour,...codex.legends];
const mobileDatasheetMarkup=allUnits.map(unit=>fs.readFileSync(path.join(root,'mobile',`${unit.id.replace(/^unit-/,'')}.html`),'utf8')).join('\n');
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
const significantLines=value=>decode(value).split(/\r?\n/).map(line=>line.replace(/\s+/g,' ').trim()).filter(Boolean);
const unitMarkup=(html,id)=>{const opener=new RegExp(`<article class="unit-card[^"]*" id="${id}"`).exec(html);assert.ok(opener,`${id}: rendered unit card missing`);const start=opener.index,next=html.indexOf('<article class="unit-card',start+1);return html.slice(start,next<0?html.length:next);};
const weaponBase=value=>{const normalized=String(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+(?:d\d+|\d+)$/,'').trim();return normalized.startsWith('anti ')?'anti':normalized;};
const coreWeaponTerms=new Map(Object.entries(glossary).filter(([id])=>id.startsWith('core-')).map(([id,term])=>[weaponBase(String(term.title?.en||'').replace(/^\[|\]$/g,'')),id]));
const localWeaponTerms=new Map(Object.entries(context.terms).map(([id,entry])=>[weaponBase(glossary[entry.termId]?.title?.en||''),id]).filter(([base])=>base));
const expectedWeaponTerm=label=>coreWeaponTerms.get(weaponBase(label))||localWeaponTerms.get(weaponBase(label))||'';
const splitWeaponAbilities=value=>String(value||'').split(',').map(label=>label.trim().toUpperCase()).filter(Boolean);
const canonicalWeaponRows=allUnits.flatMap(unit=>unit.weapons.filter(weapon=>weapon.abilities).map(weapon=>splitWeaponAbilities(weapon.abilities)));
const extractWeaponRows=markup=>[...markup.matchAll(/<div class="weapon-tags">([\s\S]*?)<\/div>/g)].map(([,body])=>[...body.matchAll(/<(button|span)\b([^>]*)>([^<]+)<\/\1>/g)].filter(([, ,attrs])=>/\bclass="[^"]*\btag\b/.test(attrs)).map(([,element,attrs,label])=>({element,label:label.trim(),term:attrs.match(/\bdata-term="([^"]+)"/)?.[1]||''})));
const rowInventory=rows=>rows.map(row=>JSON.stringify(row.map(item=>typeof item==='string'?item:item.label))).sort();
const desktopWeaponRows=extractWeaponRows(reader),phoneWeaponRows=extractWeaponRows(mobileDatasheetMarkup),desktopWeaponTokens=desktopWeaponRows.flat(),phoneWeaponTokens=phoneWeaponRows.flat(),canonicalWeaponLabels=canonicalWeaponRows.flat();
const unknownWeaponLabels=[...new Set(canonicalWeaponLabels.filter(label=>!expectedWeaponTerm(label)))].sort();

assert.deepEqual([allUnits.length,canonicalWeaponRows.length,canonicalWeaponLabels.length],[57,82,129]);
assert.deepEqual(rowInventory(desktopWeaponRows),rowInventory(canonicalWeaponRows),'desktop weapon token inventory/order differs');
assert.deepEqual(rowInventory(phoneWeaponRows),rowInventory(canonicalWeaponRows),'Phone weapon token inventory/order differs');
for(const tokens of [desktopWeaponTokens,phoneWeaponTokens])for(const token of tokens){const expected=expectedWeaponTerm(token.label);assert.equal(token.element,expected?'button':'span',`${token.label}: wrong token kind`);assert.equal(token.term,expected,`${token.label}: wrong glossary target`);}
assert.deepEqual(unknownWeaponLabels,['HARPOONED']);
assert.doesNotMatch(reader+mobileDatasheetMarkup,/<button class="weapon-button"[^>]*>[^<]*<\/button><small>/i);
assert.doesNotMatch(reader+mobileDatasheetMarkup,/<(?:button|span)[^>]*class="[^"]*\btag\b[^"]*"[^>]*>[^<]*<button/i);
assert.equal(fs.readdirSync(path.join(root,'mobile')).filter(file=>file.endsWith('.html')).length,70);
for(const output of [reader,mobileDatasheetMarkup]){assert.match(output,/death-guard\/styles\/content\.css\?v=\d+/);assert.match(output,/death-guard\/styles\/popups\.css\?v=\d+/);assert.match(output,/shared\/datasheet-system\.css\?v=\d+/);}

assert.equal(pack.meta.pageCount,31);
assert.equal(pack.detachments.length,4);
assert.equal(pack.detachments.flatMap(item=>item.stratagems).length,15);
assert.equal(pack.updates.length,32);
assert.equal(pack.meta.version,'1.1');
assert.equal(pack.meta.sha256,'BBB2B1F9167C8421D13CFB87FC46DF778D59B7E9803D5D8F812060424FA9C79A');
assert.equal(pack.faqs.length,12);
assert.equal(codex.audit.datasheets,50);
assert.equal(codex.audit.imperialArmour,7);
assert.equal(points.audit.enhancements,34);
assert.equal(points.units.length,57);
assert.equal(codexParity.detachments.length,6);
assert.equal(codexParity.detachments.flatMap(item=>item.stratagems).length,36);
assert.equal(codexWargear.units.length,57);
assert.equal(Object.keys(relatedRules.stratagems).length,51);
assert.equal(new Set(points.units.map(item=>item.id)).size,57);
for(const unit of [...codex.datasheets,...codex.imperialArmour,...codex.legends]){
  assert.ok(unit.profiles.length,`${unit.title}: missing profile`);
  assert.ok(unit.keywords.includes('Tyranids'),`${unit.title}: missing faction keyword`);
  assert.match(reader,new RegExp(`id="${unit.id}"`),`${unit.title}: missing reader anchor`);
}
const termagants=codex.datasheets.find(unit=>unit.title==='Termagants');
assert.deepEqual(termagants.abilities.map(item=>item.title),['Skulking Horrors','Synapse']);
assert.ok(termagants.wargearAbilities.some(item=>item.title==='Torrent'));
const currentUnits=[...codex.datasheets,...codex.imperialArmour].filter(unit=>unit.status==='Current');
const unit=title=>currentUnits.find(item=>item.title===title);
assert.deepEqual(points.detachments.map(item=>[item.title,item.forceDisposition,item.detachmentPoints]),[
  ['Ambush Predators','Disruption',1],['Assimilation Swarm','Priority Assets',2],['Crusher Stampede','Purge the Foe',2],['Invasion Fleet','Take and Hold',3],['Subterranean Assault','Disruption',3],['Synaptic Nexus','Disruption',2],['Talons of the Norn Queen','Take and Hold',1],['Unending Swarm','Take and Hold',2],['Vanguard Onslaught','Reconnaissance',2],['Warrior Bioform Onslaught','Take and Hold',1]
]);
for(const detachment of points.detachments){
  assert.match(reader,new RegExp(`<h3 class="category-title detachment-title">${detachment.title}<span class="detachment-dp">${detachment.detachmentPoints}DP</span></h3>`),`${detachment.title}: DP is not rendered beside the title`);
  assert.match(reader,new RegExp(`<span>${detachment.forceDisposition}</span>`),`${detachment.title}: Force Disposition is not rendered`);
}
const renderedEnhancements=[...pack.detachments,...codexParity.detachments].flatMap(item=>item.enhancements||[]);
for(const enhancement of points.enhancements){
  const rendered=renderedEnhancements.find(item=>titleKey(item.title)===titleKey(enhancement.title));
  assert.ok(rendered,`${enhancement.title}: no rendered Enhancement card`);
  assert.match(reader,new RegExp(`data-rule-id="${rendered.id}"[\\s\\S]*?<div class="eyebrow">Enhancement \\u00b7 ${enhancement.value} pts</div>`),`${enhancement.title}: current points are not rendered`);
}
assert.deepEqual(unit('Neurotyrant').abilities.filter(item=>/Psychic Terror|Neuroloids|Synaptic Relays/.test(item.title)).map(item=>item.title),['Psychic Terror (Psychic)','Neuroloids']);
assert.match(unit('Neurotyrant').abilities.find(item=>item.title==='Psychic Terror (Psychic)').text,/models from your army with this ability/);
assert.ok(!unit('Norn Assimilator').abilities.some(item=>item.title==='Protean Purpose'));
assert.ok(!unit('Norn Emissary').abilities.some(item=>item.title==='Protean Purpose'));
assert.equal(unit('Norn Emissary').abilities.find(item=>item.title==='Unnatural Resilience').text,'This model has the Feel No Pain 4+ ability against mortal wounds.');
for(const title of ['Tyrannocyte','Toxicrene','Tyrannofex'])assert.ok(unit(title).keywords.includes('Frame'),`${title}: FRAME keyword missing`);
for(const title of ['Hyperadapted Raveners','Tyranid Prime with Lash Whip'])assert.ok(!unit(title).abilities.some(item=>item.title==='Sustained Hits'),`${title}: referenced weapon definition leaked into Abilities`);
assert.ok(unit('Maleceptor').keywords.includes('Maleceptor')&&!unit('Maleceptor').keywords.includes('Malceptor'),'Maleceptor keyword spelling regressed');
for(const title of ['Broodlord','Hive Tyrant','Hyperadapted Raveners','Neurotyrant','Tyranid Prime with Lash Whip','Winged Tyranid Prime','Old One Eye','The Swarmlord']){
  assert.ok(!unit(title).keywords.includes('Leader'),`${title}: Core Leader ability leaked into Keywords`);
  assert.ok(unit(title).abilities.some(item=>item.title==='Leader'),`${title}: Core Leader ability is missing`);
}
for(const title of ['Deathleaper','Lictor','Neurolictor'])assert.ok(!unit(title).abilities.some(item=>item.title==='Deep Strike'),`${title}: Ambush Predators Deep Strike leaked into the base datasheet`);
assert.match(pack.detachments.find(item=>item.title==='Ambush Predators')?.rule.text||'',/DEATHLEAPER\/LICTOR\/NEUROLICTOR units have Deep Strike/,'Ambush Predators must remain the owner of the conditional Deep Strike grant');
const sporocyst=unit('Sporocyst');
assert.equal(sporocyst.weapons.find(weapon=>weapon.name==='Sporocyst bio-weapons')?.abilities,'','Sporocyst Hive Defences leaked into its weapon profile');
assert.equal(sporocyst.abilities.filter(ability=>ability.title==='Hive Defences').length,1,'Sporocyst must retain exactly one Hive Defences unit ability');
for(const title of ['Termagant spinefists','Genestealer claws and talons','Distensible jaw','Toxinjector harpoon','Sporocyst bio-weapons','Spinemaws'])assert.ok(currentUnits.some(item=>item.weapons.some(weapon=>weapon.name===title)),`${title}: canonical weapon name missing`);
assert.doesNotMatch(JSON.stringify({codex,codexParity}),/<ins>|Wound roll 1 as well|excluding MONSTERS models|that units Leadership|, and If your unit|Stealth \)\./);
for(const id of ['vanguard-chameleonic','tyranid-warriors-melee-adaptive-instincts','tyrannocyte-aerial-seeding','venomthropes-foul-spores'])assert.ok(pack.updates.some(item=>item.id===id),`${id}: v1.1 update missing`);
assert.equal(pack.updates.find(item=>item.id==='biovores-seed-spore-mine').sourcePages[0],20);
assert.match(pack.updates.find(item=>item.id==='venomthropes-foul-spores').change,/within 6"/);
for(const title of ['The Red Terror','Raveners','Hyperadapted Raveners'])assert.ok([...codex.datasheets,...codex.imperialArmour].find(unit=>unit.title===title).keywords.includes('Burrower'),`${title}: official BURROWER keyword missing`);
assert.ok(codex.datasheets.find(unit=>unit.title==='Hyperadapted Raveners').keywords.includes('Synapse'));
assert.equal(codex.imperialArmour.find(unit=>unit.title==='Malanthrope').weapons.find(weapon=>weapon.name==='Grasping tail').skill,'4+');
assert.match(codex.datasheets.find(unit=>unit.title==='Neurolictor').abilities.find(item=>item.title==='Psychological Saboteur (Aura)').text,/within 12"/);
assert.match(codex.datasheets.find(unit=>unit.title==='The Swarmlord').abilities.find(item=>item.title==='Malign Presence (Aura)').text,/If you do, increase/);
assert.doesNotMatch(JSON.stringify(codex),/with 12"|it's ranged weapons|"Burrowers"/);
const tyrannofexPoints=points.units.find(unit=>unit.title==='Tyrannofex');
assert.deepEqual(tyrannofexPoints.paidWargear.map(item=>[item.name,item.value]),[['Acid spray',10],['Rupture cannon',20]]);
assert.deepEqual(points.units.find(unit=>unit.title==='Neurogaunts').points.map(item=>item.label),['11 models','22 models']);
assert.ok(points.enhancements.some(item=>item.title==='Naturalised Camouflage'));
assert.ok(points.enhancements.some(item=>item.title==='Instinctive Defence'));
assert.ok(reader.includes('Composition & Wargear'));
assert.ok(reader.includes('Wargear Options'));
assert.doesNotMatch(reader,/Wargear options and replacement limits are not yet verified/);
for(const record of codexWargear.units){
  const datasheet=allUnits.find(item=>titleKey(item.title)===titleKey(record.title));
  assert.ok(datasheet,`${record.title}: missing datasheet for Wargear parity`);
  const expected=record.wargear.map(significantLines);
  const desktop=[...unitMarkup(reader,datasheet.id).matchAll(/<li class="wargear-option">([\s\S]*?)<\/li>/g)].map(match=>significantLines(match[1]));
  assert.deepEqual(desktop,expected,`${record.title}: desktop Wargear lines differ from source`);
  const mobile=fs.readFileSync(path.join(root,'mobile',`${datasheet.id.replace(/^unit-/,'')}.html`),'utf8');
  const phone=[...mobile.matchAll(/<li class="wargear-option">([\s\S]*?)<\/li>/g)].map(match=>significantLines(match[1]));
  assert.deepEqual(phone,expected,`${record.title}: Phone Mode Wargear lines differ from source`);
}
for(const title of ['Carnifexes','Termagants','Tyrannofex']){
  assert.ok(codexWargear.units.some(item=>item.title===title),`${title}: required Wargear fixture missing`);
}
assert.ok(codexWargear.units.some(item=>item.wargear.length===0),'empty Wargear fixture missing');
assert.ok(codexWargear.units.some(item=>item.wargear.some(option=>option.trim()==='None')),'"None" Wargear fixture missing');
assert.match(sharedContentCss,/\.wargear-option\s*\{[^}]*white-space:\s*pre-line[^}]*overflow-wrap:\s*anywhere/);
for(const detachment of pack.detachments){
  assert.match(reader,new RegExp(`id="detachment-${detachment.id}"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-rule" data-nav-depth="3"`));
  assert.match(reader,new RegExp(`id="${detachment.id}-rule" data-track="${detachment.id}-rule"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-enhancements" data-nav-depth="3"`));
  assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-stratagems" data-nav-depth="3"`));
  for(const stratagem of detachment.stratagems){
    assert.ok(stratagem.when&&stratagem.target&&stratagem.effect,`${stratagem.title}: incomplete card`);
    assert.match(related,new RegExp(`data-rule-id="${stratagem.id}"`));
  }
}
assert.doesNotMatch(reader,/death-guard-cover|CODEX REGISTER \/\/ XIV|Technical placeholder/);
assert.match(reader,/Reference in verification/);
assert.doesNotMatch(reader,/army-related-rules\.js|related-rules-matcher\.js/);
assert.match(reader,/roster-filter\.js\?v=\d+/);
assert.match(fs.readFileSync(path.join(root,'scripts','roster-filter.js'),'utf8'),/match\[1\]\.toLowerCase\(\)==='xenos'/);
assert.doesNotMatch(reader,/army-book-app\.js/,'Tyranids must not load the generic monolithic Army Book runtime');
assert.doesNotMatch(reader,/unit-source-state/,'per-datasheet source telemetry must not clutter the playable reader');
assert.match(app,/new window\.DGNavigation\(\)/);
assert.match(app,/new window\.DGPopups\(terms,fullEntry\)/);
assert.match(app,/compatible-rules-runtime\.mjs\?v=\d+/);
assert.match(app,/function initRelatedRules\(\)/);
assert.doesNotMatch(app,/WHArmyRelatedRules|WHRelatedRules/);
assert.match(app,/new URL\('\.\/mobile\/'\+route/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/death-guard\/scripts\/view-router\.js\?v=\d+/);
assert.doesNotMatch(app,/WHArmyBook\.install/);
assert.match(bookCss,/tyranids-cover-800\.webp/,'the supplied Tyranids artwork must be used by the desktop hero');
assert.match(bookCss,/\.related-rules-dialog[^}]*background:var\(--panel\)/,'Related Rules must have an opaque book background');
assert.doesNotMatch(bookCss,/\.related-rules-dialog[^}]*background:var\(--void\)/,'Related Rules must not use the undefined transparent --void token');
assert.doesNotMatch(bookCss,/html\[data-view="mobile"\]/,'Phone Mode must use focused pages, not the desktop monolith');
assert.ok(Object.keys(context.terms).length>=300);
assert.equal(context.terms['tyranids-detachment-rule-mindhunger'].navigation.rule,'detachment-ambush-predators');

const allStratagems=[...pack.detachments,...codexParity.detachments].flatMap(detachment=>detachment.stratagems);
for(const stratagem of allStratagems){
  const rule=relatedRules.stratagems[stratagem.id];
  assert.ok(rule,`${stratagem.title}: missing explicit eligibility`);
  assert.match(related,new RegExp(`data-rule-id="${stratagem.id}"`),`${stratagem.title}: generated card missing`);
}

console.log(`Tyranids weapon tokens: ${canonicalWeaponLabels.length} labels, ${desktopWeaponTokens.length} desktop, ${phoneWeaponTokens.length} Phone, ${desktopWeaponTokens.filter(token=>token.term).length} interactive, ${desktopWeaponTokens.filter(token=>!token.term).length} unknown (${unknownWeaponLabels.join(', ')}).`);
console.log('Tyranids QA passed: 57 datasheets, 10 detachments, 51 Stratagems, exact wargear, glossary and Related Rules contracts.');
