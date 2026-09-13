import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createReadStream,readFileSync,statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadPublicationInventory,selectPublicationBooks} from '../../books/shared/tools/publication-inventory.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const books=selectPublicationBooks(loadPublicationInventory({root}),'library');
const expectedDetachments=new Map(books.map(book=>{const config=JSON.parse(readFileSync(path.join(root,book.config),'utf8')),count=config.expected?.detachments??config.expected?.matchedDetachments;if(!Number.isInteger(count)||count<1)throw new Error(`${book.id}: no canonical Detachment count`);return[book.id,count];}));
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png'};
const server=createServer((request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.writeHead(204).end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if(statSync(file).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');createReadStream(file).pipe(response);}catch{response.writeHead(404).end('Not found');}});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const origin=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1365,height:850}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  try{
    for(const book of books){
      errors.length=0;
      const expected=expectedDetachments.get(book.id);
      await page.goto(`${origin}/books/${book.id}/reader.html?view=full#detachments`);
      await page.waitForFunction(count=>document.querySelectorAll('main .content-group.detachment[id^="detachment-"]').length===count,expected);
      const state=await page.evaluate(()=>{const visible=node=>Boolean(!node.hidden&&getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden'&&node.getClientRects().length&&node.getBoundingClientRect().width&&node.getBoundingClientRect().height),cards=[...document.querySelectorAll('main .content-group.detachment[id^="detachment-"]')];return{ids:cards.map(node=>node.id),visible:cards.filter(visible).map(node=>node.id),zeroGeometry:cards.filter(node=>!node.getBoundingClientRect().width||!node.getBoundingClientRect().height).map(node=>node.id),sectionVisible:visible(document.getElementById('detachments'))};});
      assert.equal(state.ids.length,expected,`${book.title}: rendered Detachment cardinality diverges from canonical config`);
      assert.equal(state.visible.length,expected,`${book.title}: published Detachment cards are not all visible`);
      assert.deepEqual(state.zeroGeometry,[],`${book.title}: published Detachment cards have no layout geometry`);
      assert.equal(state.sectionVisible,true,`${book.title}: Detachments section is not visible`);
      const direct=state.ids[0];
      await page.goto(`${origin}/books/${book.id}/reader.html?view=full#${direct}`);
      await page.locator(`#${direct}`).waitFor({state:'visible'});
      assert.ok(await page.locator(`#${direct}`).evaluate(node=>node.getBoundingClientRect().height>0),`${book.title}: direct Detachment target has no layout geometry`);
      assert.deepEqual(errors,[],`${book.title}: visible-section browser control emitted runtime errors`);
    }
    console.log(`Published section visibility QA passed: ${books.length} Army Books expose ${[...expectedDetachments.values()].reduce((sum,value)=>sum+value,0)} visible Detachment cards and direct targets.`);
  }finally{await context.close();}
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
