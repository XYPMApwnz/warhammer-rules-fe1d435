import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import vm from 'node:vm';

const json=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const plain=value=>JSON.parse(JSON.stringify(value));
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const loadWindow=(file,key)=>{const context={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),context,{filename:file});return context.window[key];};
const catalog=loadWindow('roster-guides/points-data.js','WH_POINTS_CATALOG');
const targetHtml=book=>loadWindow(`books/${book}/scripts/target-data.js`,'WH_ARMY_BOOK_TARGETS').html;
const unitCard=(html,id)=>{const start=html.indexOf(`<article class="unit-card surface" id="${id}"`);assert.notEqual(start,-1,`${id} effective Army Book card`);const end=html.indexOf('<article class="unit-card surface"',start+1);return html.slice(start,end<0?html.length:end);};
const visibleText=html=>normalize(html.replace(/<[^>]+>/g,' '));
const pointsSource=(book,config)=>json(`books/${book}/${config.sources.points||`content/${book}-points.en.json`}`);

const verifyChapter=(book,catalogKey,expectedOverrides)=>{
  const config=json(`books/${book}/book.config.json`),overrides=config.dependencyDatasheets?.pointOverrides||{},localIds=new Set(pointsSource(book,config).units.map(unit=>unit.id)),html=targetHtml(book);
  assert.equal(Object.keys(overrides).length,expectedOverrides,`${book} dependency point override inventory`);
  for(const [unitId,override] of Object.entries(overrides)){
    assert.equal(localIds.has(unitId),false,`${book} must not duplicate ${unitId} in its local factual point source`);
    const current=catalog[catalogKey].units[normalize(override.title)];
    assert.ok(current,`${book} Roster Guides record for ${override.title}`);
    assert.deepEqual(plain(current.points),override.points,`${book} Roster Guides must consume ${unitId} dependency override`);
    const text=visibleText(unitCard(html,unitId));
    for(const row of override.points)assert.ok(text.includes(normalize(`${row.label} ${row.value} pts`)),`${book} Army Book must render ${override.title}: ${row.label} = ${row.value}`);
  }
};

verifyChapter('dark-angels','dark angels',2);
verifyChapter('blood-angels','blood angels',9);

const root=process.cwd(),builder=path.join(root,'books/shared/tools/build-army-book.mjs'),tempRoot=fs.mkdtempSync(path.join(os.tmpdir(),'p2-dependency-points-'));
const build=configPath=>spawnSync(process.execPath,[builder,configPath,'--check'],{cwd:root,encoding:'utf8'});
const buildOutput=result=>`${result.stdout||''}\n${result.stderr||''}`;
let probeIndex=0;
const mutationConfig=(book,mutate)=>{
  const bookRoot=path.join(root,'books',book),config=json(path.join(bookRoot,'book.config.json')),probeRoot=path.join(tempRoot,`${book}-${++probeIndex}`);
  fs.mkdirSync(probeRoot,{recursive:true});
  config.sources.points||='content/'+book+'-points.en.json';
  config.sources=Object.fromEntries(Object.entries(config.sources).map(([key,value])=>{
    const source=typeof value==='string'?path.resolve(bookRoot,value):null;
    if(!source||!fs.existsSync(source)||!fs.statSync(source).isFile())return [key,value];
    const target=path.join(probeRoot,'sources',`${key}${path.extname(source)}`);
    fs.mkdirSync(path.dirname(target),{recursive:true});
    fs.copyFileSync(source,target);
    return [key,path.relative(probeRoot,target)];
  }));
  mutate(config);
  const file=path.join(probeRoot,'book.config.json');
  fs.writeFileSync(file,JSON.stringify(config,null,2));
  return file;
};
const rejectMutation=(name,mutate,pattern)=>{
  const result=build(mutationConfig('dark-angels',mutate)),output=buildOutput(result);
  assert.notEqual(result.status,0,`${name} must fail closed`);
  assert.match(output,pattern,`${name} must fail for the expected dependency override contract`);
};
const darkConfig=json('books/dark-angels/book.config.json'),[sampleUnitId,sampleOverride]=Object.entries(darkConfig.dependencyDatasheets.pointOverrides)[0];
try{
  rejectMutation('missing dependency override value',config=>{config.dependencyDatasheets.pointOverrides[sampleUnitId].points=[{label:'3 models'}];},/requires a finite numeric value/);
  rejectMutation('empty dependency override label',config=>{config.dependencyDatasheets.pointOverrides[sampleUnitId].points=[{label:'',value:100}];},/requires a non-empty label/);
  rejectMutation('non-numeric dependency override value',config=>{config.dependencyDatasheets.pointOverrides[sampleUnitId].points=[{label:'3 models',value:'not-a-number'}];},/requires a finite numeric value/);
  rejectMutation('unknown dependency override identity',config=>{config.dependencyDatasheets.pointOverrides['unit-red-team-unknown']=plain(sampleOverride);},/does not resolve to an effective dependency Datasheet/);
  rejectMutation('dependency override title mismatch',config=>{config.dependencyDatasheets.pointOverrides[sampleUnitId].title=`${sampleOverride.title} mismatch`;},/title mismatch/);
  const dependencyId=darkConfig.dependencies[0],dependencyRoot=path.join(root,'books',dependencyId),dependencyConfig=json(path.join(dependencyRoot,'book.config.json')),dependencyCodex=json(path.join(dependencyRoot,dependencyConfig.sources.codexDatasheets)),dependencyPoints=json(path.join(dependencyRoot,dependencyConfig.sources.points||`content/${dependencyId}-points.en.json`)),excluded=new Set((darkConfig.dependencyDatasheets.excludeAnyKeywords||[]).map(value=>String(value).toUpperCase())),pointByTitle=new Map(dependencyPoints.units.map(unit=>[normalize(unit.title),unit])),filteredUnit=(dependencyCodex.datasheets||[]).find(unit=>(unit.keywords||[]).some(keyword=>excluded.has(String(keyword).toUpperCase()))&&pointByTitle.has(normalize(unit.title)));
  assert.ok(filteredUnit,'Dark Angels test fixture must contain a filtered dependency unit with points');
  rejectMutation('filtered dependency override identity',config=>{const source=pointByTitle.get(normalize(filteredUnit.title));config.dependencyDatasheets.pointOverrides[filteredUnit.id]={title:filteredUnit.title,points:plain(source.points)};},/does not resolve to an effective dependency Datasheet/);
  for(const book of ['dark-angels','blood-angels']){const result=build(path.join(root,'books',book,'book.config.json'));assert.equal(result.status,0,`${book} valid dependency point overrides must build: ${buildOutput(result)}`);}
}finally{
  fs.rmSync(tempRoot,{recursive:true,force:true});
}

const bloodAngelsConfig=json('books/blood-angels/book.config.json'),stormlance=bloodAngelsConfig.dependencyDetachments.pointOverrides['Stormlance Task Force'];
assert.equal(stormlance.detachmentPoints,2,'Blood Angels factual Stormlance override remains 2DP');
assert.equal(catalog['blood angels'].detachments['stormlance task force'].detachmentPoints,2,'Blood Angels Roster Guides must consume the Stormlance override');
assert.ok(visibleText(targetHtml('blood-angels')).includes(normalize('Stormlance Task Force 2DP')),'Blood Angels Army Book must retain Stormlance at 2DP');

for(const [book,catalogKey] of [['tau-empire','t au empire'],['tyranids','tyranids']]){
  const config=json(`books/${book}/book.config.json`),source=pointsSource(book,config),paid=source.units.filter(unit=>unit.paidWargear?.length);
  assert.ok(paid.length,`${book} paid-wargear source inventory`);
  for(const unit of paid)assert.deepEqual(plain(catalog[catalogKey].units[normalize(unit.title)].wargear),unit.paidWargear,`${book} ${unit.title} paidWargear must normalize to catalog wargear`);
}

assert.deepEqual(plain(catalog['t au empire'].units['crisis starscythe battlesuits'].points.map(row=>row.value)),[100,110],'Starscythe factual catalog schedule remains 100/110; model-count resolution stays in Package 3');
const producer=fs.readFileSync('roster-guides/build-points.mjs','utf8');
assert.doesNotMatch(producer,/books\/(?:death-guard|adeptus-mechanicus)\/sources\/official-mfm-v1\.2\.json/,'current Roster Guides producer must not hardcode stale MFM paths');
assert.match(producer,/readBookSource\('death-guard','points'\)/,'Death Guard current MFM must follow book config');
assert.match(producer,/readBookSource\('adeptus-mechanicus','officialMfm'\)/,'Adeptus Mechanicus current MFM must follow book config');

console.log('Package 2 points consumer convergence QA: PASS');
