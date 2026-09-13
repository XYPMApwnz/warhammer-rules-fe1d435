import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {collectOfflineMobileRoutes} from '../tools/build-offline-mobile-routes.mjs';
import {readAppShell} from '../tools/cache-revision.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const routes=collectOfflineMobileRoutes({root}),shell=readAppShell(root),shellUrls=new Set(shell.urls);
const books=[...new Set(routes.map(route=>route.book))];
assert.deepEqual(books,['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels']);
assert.equal(routes.length,701,'physical mobile route inventory changed unexpectedly');
assert.equal(routes.some(route=>route.book==='orks'),false,'Orks entered supported offline route coverage');
for(const route of routes)assert.ok(shellUrls.has(route.url),`APP_SHELL omits physical mobile route ${route.url}`);
assert.equal(shell.urls.filter(url=>routes.some(route=>route.url===url)).length,routes.length,'APP_SHELL physical mobile membership is incomplete or duplicated');
console.log(`Offline mobile routes QA passed: ${routes.length} physical routes across ${books.length} supported Army Books; Orks excluded.`);
