import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCanonicalIndexes,buildImport,parseDatasheetHtml,parseDatasheetStratagems,parseFactionStratagems,stableStringify} from '../books/death-guard/tools/import-wahapedia-compatible-rules.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const book=JSON.parse(fs.readFileSync(path.join(root,'books/death-guard/content/death-guard-rules.en.json'),'utf8'));
const snapshot=JSON.parse(fs.readFileSync(path.join(root,'books/death-guard/sources/wahapedia-compatible-rules.snapshot.json'),'utf8'));
const report=JSON.parse(fs.readFileSync(path.join(root,'books/death-guard/reports/compatible-rules-import-report.json'),'utf8'));
const failures=[];
const check=(name,ok)=>{if(!ok)failures.push(name);};

const datasheetFixture='<title>Plague Marines</title><div class="dsHeader dsColorBgDG">ABILITIES</div><div class="dsAbility"><b>Contagion:</b> Afflict the enemy.</div><div class="dsHeader dsColorBgDG">WARGEAR ABILITIES</div><div class="ds2colKW"><div>KEYWORDS: INFANTRY; BATTLELINE; PLAGUE MARINES</div><div class="dsRight">FACTION KEYWORDS: DEATH GUARD</div></div><div class="dsLeft"><div class="dsHeader dsColorBgDG">STRATAGEMS</div><div class="s10Wrap"><div class="s10Name">CREEPING BLIGHT</div><div class="s10Type">Virulent Vectorium – Battle Tactic</div></div></div><div class="dsHeader dsColorBgDG">LED BY</div><div class="dsAbility">This unit can be led by <a href="/wh40k11ed/factions/death-guard/Biologus-Putrifier">BIOLOGUS PUTRIFIER</a>.</div>';
const parsedDatasheet=parseDatasheetHtml(datasheetFixture);
check('parser reads normalized keywords',JSON.stringify(parsedDatasheet.keywords)===JSON.stringify(['BATTLELINE','INFANTRY','PLAGUE MARINES']));
check('parser keeps Led By evidence separate from absence',parsedDatasheet.relations.ledBy.status==='reported');
check('parser extracts ability text',parsedDatasheet.abilities[0]?.name==='Contagion');
check('parser reads the datasheet association cards',parseDatasheetStratagems(datasheetFixture)?.[0]?.name==='CREEPING BLIGHT');
check('missing Led By is not an empty relation',parseDatasheetHtml('<title>Mortarion</title><div>KEYWORDS: MONSTER</div>').relations.ledBy.status==='not-reported');

const factionFixture='<div class="str11HeadBlock str11Name">PUTRID DETONATION</div><div class="str11Type">Virulent Vectorium – Strategic Ploy Stratagem</div><b>TARGET:</b> One DEATH GUARD VEHICLE.<br><br><b>EFFECT:</b> Boom.';
const parsedRules=parseFactionStratagems(factionFixture);
check('parser reads faction Stratagem fields',parsedRules.length===1&&parsedRules[0].detachment==='Virulent Vectorium'&&parsedRules[0].target==='One DEATH GUARD VEHICLE.');

const indexes=buildCanonicalIndexes(book);
check('canonical indexes come from structured content',indexes.units.length===41&&indexes.rules.length===45&&indexes.units.every(unit=>unit.unitId.startsWith('unit-')));
check('snapshot is the compact v2 unit association map',snapshot.schema==='wahapedia-compatible-rules-snapshot/v2'&&Object.keys(snapshot.units).length===41);
check('report observes all canonical faction Stratagems',report.summary.stratagems.canonical===45&&report.summary.stratagems.observed===45);
check('different datasheets retain different Wahapedia rule associations',snapshot.units['unit-plague-marines'].includes('stratagem-creeping-blight')&&!snapshot.units['unit-mortarion'].includes('stratagem-creeping-blight'));
check('report exposes only blocking unresolved categories',Object.keys(report.unresolved).sort().join(',')==='ambiguous,duplicates,parse,renamed,unknown');
check('snapshot order and serialization are deterministic',stableStringify(snapshot)===fs.readFileSync(path.join(root,'books/death-guard/sources/wahapedia-compatible-rules.snapshot.json'),'utf8'));
const broken=buildImport({book,factionHtml:'',datasheetHtmlByUnit:new Map(),retrievedAt:'2026-08-01'});
check('buildImport fail-closes malformed sources',broken.ok===false&&broken.report.summary.unresolved>0);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Wahapedia compatible-rules importer QA passed.');
