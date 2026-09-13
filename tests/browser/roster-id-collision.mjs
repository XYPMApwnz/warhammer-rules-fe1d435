import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'),override=process.env.P2_35_APP_OVERRIDE?await readFile(process.env.P2_35_APP_OVERRIDE):null;
const a=`+ FACTION KEYWORD: Imperium - Space Marines\n+ DETACHMENT: Gladius Task Force\n+ BATTLE SIZE: 2. Incursion (1,000 Point limit)\n+ TOTAL ARMY POINTS: 100pts\n\n5x Intercessor Squad (100 pts)\n+ ROSTER NOTE: K5eXajujyhEf`;
const b=`+ FACTION KEYWORD: Xenos - Tyranids\n+ DETACHMENT: Invasion Fleet\n+ BATTLE SIZE: 2. Incursion (1,000 Point limit)\n+ TOTAL ARMY POINTS: 60pts\n\n10x Termagants (60 pts)\n+ ROSTER NOTE: MNGfKbs5U3sb`;
const oldId=text=>{let hash=2166136261;for(const char of text)hash=Math.imul(hash^char.charCodeAt(0),16777619);return`roster-${(hash>>>0).toString(36)}`;};
assert.equal(oldId(a),'roster-1at0i0e');assert.equal(oldId(b),oldId(a),'frozen demonstrated 32-bit collision pair');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'},server=createServer(async(request,response)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://localhost').pathname));assert.ok(file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(override&&file===path.join(root,'roster-guides/app.js')?override:await readFile(file));}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await launchChromium(),context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),errors=[];page.setDefaultTimeout(10000);page.on('pageerror',error=>errors.push(error.message));
const records=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]'));
const submit=async text=>{await page.locator('#roster-input').fill(text);await page.locator('#roster-form button[type="submit"]').click();await page.waitForFunction(source=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').some(record=>record.sourceText===source),text);};
try{
  await page.goto(`http://127.0.0.1:${server.address().port}/roster-guides/index.html`);
  await submit(a);let state=await records(),legacy=state.find(record=>record.sourceText===a);legacy.id=oldId(a);await page.evaluate(items=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify(items)),[legacy]);await page.reload();
  await submit(b);state=await records();assert.equal(state.length,2,'different source with the same legacy hash must not overwrite');const created=state.find(record=>record.sourceText===b);assert.ok(created&&created.id!==legacy.id&&/^roster-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(created.id),'new roster uses collision-resistant local identity');assert.equal(state.find(record=>record.id===legacy.id).sourceText,a,'legacy colliding record remains readable');
  await submit(b);let repeated=await records();assert.equal(repeated.length,2,'same exact source import must update predictably');assert.equal(repeated.find(record=>record.sourceText===b).id,created.id,'same exact source keeps its identity');
  await submit(a);repeated=await records();assert.equal(repeated.length,2,'same legacy source re-import must not duplicate');assert.equal(repeated.find(record=>record.sourceText===a).id,legacy.id,'same legacy source keeps the readable legacy identity');
  const collidingBackup={...created,id:legacy.id,name:'Imported collision backup',sourceText:b+'\n'};await page.locator('#import-roster-file').setInputFiles({name:'collision.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(collidingBackup))});await page.waitForFunction(()=>document.querySelector('#import-roster-file').value==='');state=await records();assert.equal(state.length,3,'backup ID collision must preserve both records');assert.equal(state.filter(record=>record.id===legacy.id).length,1,'incoming backup must not replace occupied legacy ID');assert.ok(state.some(record=>record.sourceText===collidingBackup.sourceText&&record.id!==legacy.id),'colliding backup receives a new identity');
  assert.deepEqual(errors,[],'collision handling must not raise runtime errors');
  console.log('Roster collision QA: frozen collision pair, legacy/new/exact-repeat/backup collision PASS');
}finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
