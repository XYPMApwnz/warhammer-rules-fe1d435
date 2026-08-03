import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(root,'../..');
const json=relative=>JSON.parse(fs.readFileSync(path.join(root,relative),'utf8'));
const pack=json('content/tau-empire-faction-pack.en.json');
const codex=json('content/tau-empire-codex-datasheets.en.json');
const parity=json('content/tau-empire-codex-parity.en.json');
const wargear=json('content/tau-empire-codex-wargear.en.json');
const points=json('content/tau-empire-points.en.json');
const mfm=json('sources/official-mfm-v1.1.json');
const relatedRules=json('content/tau-empire-related-rules.en.json');
const manifest=json('sources/source-manifest.json');
const config=json('book.config.json');
const context=JSON.parse(fs.readFileSync(path.join(repo,'glossary','contexts','tau-empire.json'),'utf8')).terms;
const glossary=JSON.parse(fs.readFileSync(path.join(repo,'glossary','registry.en.json'),'utf8')).terms;
const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8');
const mobileStart=fs.readFileSync(path.join(root,'mobile','index.html'),'utf8');
const related=fs.readFileSync(path.join(root,'mobile','related-rules.inc'),'utf8');
const allUnits=[...codex.datasheets,...codex.imperialArmour,...codex.legends];
const mobileDatasheetMarkup=allUnits.map(unit=>fs.readFileSync(path.join(root,'mobile',`${unit.id.replace(/^unit-/,'')}.html`),'utf8')).join('\n');
const currentUnits=[...codex.datasheets,...codex.imperialArmour].filter(unit=>unit.status==='Current');
const key=value=>String(value).replace(/\s*\([^)]*\)\s*$/,'').trim().toLowerCase();
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
const lines=value=>decode(value).split(/\r?\n/).map(line=>line.replace(/\s+/g,' ').trim()).filter(Boolean);
const unitMarkup=(html,id)=>{const opener=new RegExp(`<article class="unit-card[^"]*" id="${id}"`).exec(html);assert.ok(opener,`${id}: card missing`);const start=opener.index,next=html.indexOf('<article class="unit-card',start+1);return html.slice(start,next<0?html.length:next);};
const weaponBase=value=>{const normalized=String(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+(?:d\d+|\d+)$/,'').trim();return normalized.startsWith('anti ')?'anti':normalized;};
const coreWeaponTerms=new Map(Object.entries(glossary).filter(([id])=>id.startsWith('core-')).map(([id,term])=>[weaponBase(String(term.title?.en||'').replace(/^\[|\]$/g,'')),id]));
const localWeaponTerms=new Map(Object.entries(context).map(([id,entry])=>[weaponBase(glossary[entry.termId]?.title?.en||''),id]).filter(([base])=>base));
const expectedWeaponTerm=label=>coreWeaponTerms.get(weaponBase(label))||localWeaponTerms.get(weaponBase(label))||'';
const splitWeaponAbilities=value=>String(value||'').split(',').map(label=>label.trim().toUpperCase()).filter(Boolean);
const canonicalWeaponRows=allUnits.flatMap(unit=>unit.weapons.filter(weapon=>weapon.abilities).map(weapon=>splitWeaponAbilities(weapon.abilities)));
const extractWeaponRows=markup=>[...markup.matchAll(/<div class="weapon-tags">([\s\S]*?)<\/div>/g)].map(([,body])=>[...body.matchAll(/<(button|span)\b([^>]*)>([^<]+)<\/\1>/g)].filter(([, ,attrs])=>/\bclass="[^"]*\btag\b/.test(attrs)).map(([,element,attrs,label])=>({element,label:label.trim(),term:attrs.match(/\bdata-term="([^"]+)"/)?.[1]||''})));
const rowInventory=rows=>rows.map(row=>JSON.stringify(row.map(item=>typeof item==='string'?item:item.label))).sort();
const desktopWeaponRows=extractWeaponRows(reader),phoneWeaponRows=extractWeaponRows(mobileDatasheetMarkup),desktopWeaponTokens=desktopWeaponRows.flat(),phoneWeaponTokens=phoneWeaponRows.flat(),canonicalWeaponLabels=canonicalWeaponRows.flat();
const unknownWeaponLabels=[...new Set(canonicalWeaponLabels.filter(label=>!expectedWeaponTerm(label)))].sort();

assert.deepEqual([allUnits.length,canonicalWeaponRows.length,canonicalWeaponLabels.length],[63,192,277]);
assert.deepEqual(rowInventory(desktopWeaponRows),rowInventory(canonicalWeaponRows),'desktop weapon token inventory/order differs');
assert.deepEqual(rowInventory(phoneWeaponRows),rowInventory(canonicalWeaponRows),'Phone weapon token inventory/order differs');
for(const tokens of [desktopWeaponTokens,phoneWeaponTokens])for(const token of tokens){const expected=expectedWeaponTerm(token.label);assert.equal(token.element,expected?'button':'span',`${token.label}: wrong token kind`);assert.equal(token.term,expected,`${token.label}: wrong glossary target`);}
assert.deepEqual(unknownWeaponLabels,['HOOKED']);
assert.doesNotMatch(reader+mobileDatasheetMarkup,/<button class="weapon-button"[^>]*>[^<]*<\/button><small>/i);
assert.doesNotMatch(reader+mobileDatasheetMarkup,/<(?:button|span)[^>]*class="[^"]*\btag\b[^"]*"[^>]*>[^<]*<button/i);
assert.equal(fs.readdirSync(path.join(root,'mobile')).filter(file=>file.endsWith('.html')).length,73);
for(const output of [reader,mobileDatasheetMarkup]){assert.match(output,/death-guard\/styles\/content\.css\?v=40/);assert.match(output,/death-guard\/styles\/popups\.css\?v=18/);assert.match(output,/shared\/datasheet-system\.css\?v=7/);assert.doesNotMatch(output,/(?:content\.css\?v=38|popups\.css\?v=17|datasheet-system\.css\?v=6)/);}

assert.deepEqual([pack.meta.version,pack.meta.pageCount,pack.meta.sha256],['1.1',61,'32B985646BAA02A3B505FF3404E91D374A5F53C1D3B8000D7166CA94D1B52675']);
assert.equal(pack.meta.legalFrom,'2026-07-22');
assert.equal(manifest.layers.find(layer=>layer.id==='faction-pack-v1.1')?.legalFrom,pack.meta.legalFrom);
assert.deepEqual([pack.detachments.length,pack.detachments.flatMap(item=>item.stratagems).length,pack.updates.length,pack.faqs.length],[3,7,25,2]);
assert.deepEqual([codex.datasheets.length,codex.imperialArmour.length,codex.legends.length],[39,4,20]);
assert.deepEqual([parity.detachments.length,parity.detachments.flatMap(item=>item.stratagems).length],[4,24]);
assert.deepEqual([mfm.version,mfm.verifiedUnits.length,mfm.detachments.length,mfm.enhancements.length],['v1.1',43,7,23]);
assert.equal(wargear.units.length,63);
assert.equal(points.units.length,63);
assert.equal(points.units.filter(unit=>unit.pointsSource?.label==='Official MFM v1.1').length,43);
assert.equal(Object.keys(relatedRules.stratagems).length,31);
assert.equal(Object.keys(relatedRules.enhancements).length,23);
assert.equal(new Set([...pack.detachments,...parity.detachments].map(item=>key(item.title))).size,7);
assert.equal(new Set(points.enhancements.map(item=>key(item.title))).size,23);
assert.equal(config.coverImage,'assets/tau-empire-cover-800.webp');
assert.ok(fs.existsSync(path.join(root,config.coverImage)));
assert.ok(reader.includes('class="hero section surface faction-hero faction-hero-cover"'));
assert.ok(!reader.includes(`src="./${config.coverImage}"`));
const bookCss=fs.readFileSync(path.join(root,'styles','book.css'),'utf8');
assert.ok(bookCss.includes(`url("../${config.coverImage}") center 23% / cover no-repeat`));
assert.ok(mobileStart.includes('class="hero section surface faction-hero faction-hero-cover"'));
assert.ok(fs.readFileSync(path.join(repo,'index.html'),'utf8').includes(`src="books/tau-empire/${config.coverImage}"`));
assert.ok(fs.readFileSync(path.join(repo,'service-worker.js'),'utf8').includes(`./books/tau-empire/${config.coverImage}`));

for(const unit of allUnits){
  assert.ok(unit.profiles.length,`${unit.title}: missing profile`);
  assert.ok(unit.keywords.some(keyword=>key(keyword)==="t'au empire"),`${unit.title}: faction keyword missing`);
  assert.match(reader,new RegExp(`id="${unit.id}"`),`${unit.title}: reader anchor missing`);
}
for(const record of wargear.units){
  const unit=allUnits.find(item=>key(item.title)===key(record.title));assert.ok(unit,`${record.title}: Wargear owner missing`);
  const expected=record.wargear.map(lines);
  const desktop=[...unitMarkup(reader,unit.id).matchAll(/<li class="wargear-option">([\s\S]*?)<\/li>/g)].map(match=>lines(match[1]));
  assert.deepEqual(desktop,expected,`${record.title}: desktop Wargear differs`);
  const phone=fs.readFileSync(path.join(root,'mobile',`${unit.id.slice(5)}.html`),'utf8');
  const mobile=[...phone.matchAll(/<li class="wargear-option">([\s\S]*?)<\/li>/g)].map(match=>lines(match[1]));
  assert.deepEqual(mobile,expected,`${record.title}: Phone Wargear differs`);
}

const byTitle=title=>currentUnits.find(unit=>unit.title===title);
const update=id=>{const matches=pack.updates.filter(item=>item.id===id);assert.equal(matches.length,1,`${id}: official update cardinality`);return matches[0];};
const sameText=(a,b)=>String(a||'').replace(/\s+/g,' ').trim()===String(b||'').replace(/\s+/g,' ').trim();
const coveredUpdates=new Set();
const cover=(id,condition)=>{assert.ok(condition,`${id}: official update is not effective`);coveredUpdates.add(id);};
const ability=(unitTitle,abilityTitle)=>byTitle(unitTitle)?.abilities.find(item=>key(item.title)===key(abilityTitle));
const detachment=id=>[...pack.detachments,...parity.detachments].find(item=>item.id===id);
cover('army-for-the-greater-good',sameText(ability('Breacher Team','For The Greater Good')?.text,update('army-for-the-greater-good').change));
for(const [id,detachmentId,kind,title] of [
  ['kauyon-through-unity-devastation','kauyon','enhancements','Through Unity, Devastation'],
  ['montka-coordinated-exploitation','montka','enhancements','Coordinated Exploitation'],
  ['montka-strike-swiftly','montka','enhancements','Strike Swiftly'],
  ['retaliation-puretide-engram-neurochip','retaliation-cadre','enhancements','Puretide Engram Neurochip']
])cover(id,sameText(detachment(detachmentId)[kind].find(item=>key(item.title)===key(title))?.text,update(id).change));
for(const [id,detachmentId] of [['kauyon-patient-hunter','kauyon'],['montka-killing-blow','montka'],['retaliation-bonded-heroes','retaliation-cadre']])cover(id,sameText(detachment(detachmentId).rule.text,update(id).change));
cover('kauyon-photon-grenades',sameText(detachment('kauyon').stratagems.find(item=>item.id==='stratagem-photon-grenades')?.when,update('kauyon-photon-grenades').change));
const shortened=detachment('retaliation-cadre').stratagems.find(item=>item.id==='stratagem-the-shortened-blade')?.effect||'';
cover('retaliation-shortened-blade',shortened.includes('6"')&&!shortened.includes('3"'));
for(const title of ['Devilfish','Hammerhead Gunship','Piranhas','Sky Ray Gunship','Tidewall Droneport','Tidewall Gunrig','Tidewall Shieldline'])cover('datasheets-add-frame',byTitle(title).keywords.includes('Frame'));
for(const [id,unitTitle,abilityTitle] of [
  ['crisis-sunforge-sunforge','Crisis Sunforge Battlesuits','Sunforge'],
  ['firesight-precise-targeting','Firesight Team','Precise Targeting'],
  ['kroot-trail-shaper-ambush','Kroot Trail Shaper','Kroot Ambush'],
  ['kroot-trail-shaper-trail-finding','Kroot Trail Shaper','Trail Finding'],
  ['pathfinder-target-uploaded','Pathfinder Team','Target Uploaded'],
  ['riptide-nova-charge','Riptide Battlesuit','Nova Charge'],
  ['stealth-forward-observers','Stealth Battlesuits','Forward Observers'],
  ['sun-shark-pulse-bombs','Sun Shark Bomber','Pulse Bombs'],
  ['twin-lance-neocapacitor-shields','The Twin Lance','Neocapacitor Shields']
])cover(id,sameText(ability(unitTitle,abilityTitle)?.text,update(id).change));
cover('ethereal-faction-ability',Boolean(ability('Ethereal','For The Greater Good')));
cover('stealth-homing-beacon',/8"/.test(ability('Stealth Battlesuits','Homing Beacon')?.text||'')&&!/9"/.test(ability('Stealth Battlesuits','Homing Beacon')?.text||''));
for(const title of ['Razorshark Strike Fighter','Sun Shark Bomber'])cover('aircraft-add-frame',byTitle(title).keywords.includes('Frame'));
for(const title of ['Razorshark Strike Fighter','Sun Shark Bomber'])cover('aircraft-profile',byTitle(title).profiles.every(profile=>profile.stats.M==='-'&&profile.stats.OC==='-'));
const riptide=byTitle('Riptide Battlesuit'),ion=name=>riptide.weapons.find(item=>key(item.name)===key(name));
cover('riptide-ion-accelerator',JSON.stringify([ion('➤ Ion accelerator - standard'),ion('➤ Ion accelerator - supercharge')].map(item=>[item?.range,item?.a,item?.skill,item?.s,item?.ap,item?.d,item?.abilities]))===JSON.stringify([['72"','6','4+','9','-2','3',''],['72"','6','4+','10','-3','4','Hazardous']]));
assert.deepEqual([...coveredUpdates].sort(),pack.updates.map(item=>item.id).sort(),'every official T’au update must have an effective assertion');
for(const title of ['Cadre Fireblade','Commander in Coldstar Battlesuit','Commander in Enforcer Battlesuit','Ethereal','Kroot Flesh Shaper','Kroot Trail Shaper','Kroot War Shaper','Commander Farsight','Darkstrider']){
  const unit=byTitle(title);assert.ok(unit,`${title}: leader missing`);
  assert.ok(!unit.keywords.includes('Leader'),`${title}: Leader leaked into keywords`);
  assert.ok(unit.abilities.some(ability=>ability.title==='Leader'),`${title}: Leader ability missing`);
}
const crisisRelations=['Crisis Battlesuits','Crisis Fireknife Battlesuits','Crisis Starscythe Battlesuits','Crisis Sunforge Battlesuits'];
for(const title of ['Commander Farsight','Commander in Coldstar Battlesuit','Commander in Enforcer Battlesuit']){
  const unit=byTitle(title);
  assert.deepEqual(unit.relations.leader,crisisRelations,`${title}: Crisis Leader graph differs`);
  assert.equal(unit.abilities.filter(item=>item.title==='Leader').length,1,`${title}: individual Leader list leaked into abilities`);
  const desktop=unitMarkup(reader,unit.id);
  const phone=fs.readFileSync(path.join(root,'mobile',`${unit.id.slice(5)}.html`),'utf8');
  for(const target of crisisRelations){
    assert.ok(desktop.includes(target),`${title}: desktop relation missing ${target}`);
    assert.ok(phone.includes(target),`${title}: Phone relation missing ${target}`);
  }
  const facts=JSON.parse(decode(desktop.match(/data-rule-facts="([^"]+)"/)?.[1]||'{}'));
  assert.deepEqual(facts.relations.canLead.map(item=>item.unitId),crisisRelations.map(target=>allUnits.find(unit=>unit.title===target)?.id).sort(),`${title}: compiled Leader graph differs`);
}
for(const [local,entry] of Object.entries(context).filter(([id])=>id.includes('ability-leader'))){
  assert.equal(entry.termId,'core-leader',`${local}: Leader must resolve to the canonical Core term`);
}
const frameTitles=['Devilfish','Hammerhead Gunship','Manta','Piranhas','Sky Ray Gunship',"Ta'unar Supremacy Armour",'Tidewall Droneport','Tidewall Gunrig','Tidewall Shieldline','Razorshark Strike Fighter','Sun Shark Bomber'];
assert.deepEqual(currentUnits.filter(unit=>unit.keywords.includes('Frame')).map(unit=>unit.title).sort(),frameTitles.sort());
for(const title of ['Tiger Shark','AX-1-0 Tiger Shark'])assert.ok(!byTitle(title).keywords.includes('Frame'),`${title}: obsolete FRAME keyword present`);
assert.doesNotMatch(JSON.stringify({codex,parity}),/bearer is select(?:[,.]|\s+and)|have the select ability|Monsteror|Vehicleunit|warrior s\b|fight ing\b/i);
assert.match(parity.detachments.find(item=>item.id==='montka')?.enhancements.find(item=>item.id==='enhancement-strike-swiftly')?.text||'',/Scouts 6" ability/);
assert.deepEqual(points.units.find(unit=>unit.title==='Pathfinder Team').paidWargear.map(item=>[item.name,item.value]),[['Ion rifle',5]]);
for(const [title,values] of [['Commander Farsight',[70]],['Devilfish',[75,85]],['Pathfinder Team',[85,100]],['Riptide Battlesuit',[190,220]],['Stormsurge',[375,400]]])assert.deepEqual(points.units.find(unit=>unit.title===title).points.map(item=>item.value),values,`${title}: MFM values differ`);

for(const detachment of [...pack.detachments,...parity.detachments]){
  assert.match(reader,new RegExp(`id="detachment-${detachment.id}"`));
  for(const suffix of ['rule','enhancements','stratagems'])assert.match(reader,new RegExp(`data-nav-id="${detachment.id}-${suffix}" data-nav-depth="3"`),`${detachment.title}: ${suffix} third-level route missing`);
}
assert.ok(related.lastIndexOf('data-detachment="core"')>related.indexOf('data-detachment="advanced-acquisition-cadre"'),'Core Stratagems must follow faction Stratagems');
assert.doesNotMatch(reader,/army-book-app\.js/,'T’au must use the same focused runtime architecture as mature books');
assert.doesNotMatch(reader,/related-rules-matcher|army-related-rules/,'T\'au must not load the legacy Compatible Rules matcher');
assert.match(reader,/scripts\/roster-filter\.js\?v=2/);
assert.match(reader,/scripts\/app\.js\?v=8/);
assert.doesNotMatch(related,/data-eligibility|data-keyword-grants/,'matrix template must not retain legacy matcher inputs');
assert.match(reader,/Reference in verification/);
assert.ok(Object.keys(context).length>=350,'T’au Glossary context is incomplete');
assert.ok(context['tau-empire-ability-deep-strike']?.termId==='core-deep-strike','Core Deep Strike must be canonical, not duplicated');

const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(repo,'books','shared','related-rules-matcher.js'),'utf8'),sandbox);
const keywordSet=values=>new Set(values.map(value=>value.toUpperCase()));
const profiles=currentUnits.map(unit=>({unitId:unit.id,keywords:keywordSet(unit.keywords),intrinsicKeywords:keywordSet(unit.keywords),abilities:new Set(unit.abilities.map(item=>item.title.toUpperCase()))}));
for(const stratagem of [...pack.detachments,...parity.detachments].flatMap(detachment=>detachment.stratagems)){
  const contract=relatedRules.stratagems[stratagem.id];assert.ok(contract,`${stratagem.title}: eligibility missing`);
  assert.ok(profiles.some(profile=>sandbox.window.WHRelatedRules.matches(contract,profile)),`${stratagem.title}: no current datasheet satisfies eligibility`);
  assert.match(related,new RegExp(`data-rule-id="${stratagem.id}"`));
}
const coordinate=relatedRules.stratagems['stratagem-coordinate-to-engage'];
assert.equal(sandbox.window.WHRelatedRules.match(coordinate,profiles.find(item=>item.unitId==='unit-breacher-team')).state,'conditional');
for(const id of ['unit-tidewall-droneport','unit-tidewall-gunrig','unit-tidewall-shieldline']){
  assert.equal(sandbox.window.WHRelatedRules.match(coordinate,profiles.find(item=>item.unitId===id)).state,'no-match',`${id}: Fortification cannot be an Observer`);
}
assert.equal(new Set([...related.matchAll(/data-rule-id="([^"]+)"/g)].map(match=>match[1])).size,54,'Related Rules inventory differs from 31 Stratagems + 23 Enhancements');
console.log(`T'au weapon tokens: ${canonicalWeaponLabels.length} labels, ${desktopWeaponTokens.length} desktop, ${phoneWeaponTokens.length} Phone, ${desktopWeaponTokens.filter(token=>token.term).length} interactive, ${desktopWeaponTokens.filter(token=>!token.term).length} unknown (${unknownWeaponLabels.join(', ')}).`);
const {stratagemTypes}=await import(new URL('../scripts/stratagem-types.mjs',import.meta.url));
assert.equal(stratagemTypes.size,31,'T’au Stratagem map must cover all rendered faction Stratagems');
assert.equal([...stratagemTypes.values()].filter(type=>type==='unknown').length,7,'T’au must preserve seven source-untyped Stratagems as unknown');
assert.equal([...stratagemTypes.values()].filter(type=>type!=='unknown').length,24,'T’au must preserve 24 source-typed Stratagems');
assert.match(fs.readFileSync(new URL('../scripts/app.js',import.meta.url),'utf8'),/decorateStratagemTypes\(document\)/);
console.log("T'au Empire QA passed: official v1.1 pack/MFM, 43 current datasheets, 7 detachments, exact Wargear, Glossary and Related Rules contracts.");
