import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');

function workerRuntime(){
  const listeners={},warnings=[],cacheMatches=[],puts=[];
  const behavior={fetch:async()=>new Response('network',{status:200}),put:async()=>{},match:async()=>undefined};
  const self={
    location:new URL('https://example.test/service-worker.js'),
    registration:{active:{}},
    clients:{claim:async()=>{},matchAll:async()=>[]},
    skipWaiting:async()=>{},
    addEventListener(type,listener){listeners[type]=listener;}
  };
  const context=vm.createContext({
    URL,URLSearchParams,Request,Response,Promise,Set,
    self,
    importScripts(){},
    console:{warn(...args){warnings.push(args);}},
    fetch(request){return behavior.fetch(request);},
    caches:{
      keys:async()=>[],
      delete:async()=>true,
      open:async()=>({
        add:async()=>{},
        keys:async()=>[],
        async put(key,response){puts.push({key,response});return behavior.put(key,response);}
      }),
      async match(key,options){cacheMatches.push({key,options});return behavior.match(key,options);}
    }
  });
  vm.runInContext(source,context,{filename:'service-worker.js'});
  return {context,listeners,warnings,cacheMatches,puts,behavior};
}

function fallback(runtime,url){
  runtime.context.testUrl=new URL(url);
  return vm.runInContext('navigationFallback(testUrl)',runtime.context);
}

async function fetchAndCache(runtime,request){
  runtime.context.testRequest=request;
  return vm.runInContext('fetchAndCache(testRequest)',runtime.context);
}

async function dispatchFetch(runtime,request){
  let responsePromise;
  runtime.listeners.fetch({request,respondWith(value){responsePromise=value;}});
  assert.ok(responsePromise,'Service Worker did not handle the same-origin GET');
  return responsePromise;
}

const routing=workerRuntime();
assert.equal(fallback(routing,'https://example.test/books/space-marines/index.html'),'./books/space-marines/','Space Marines index must use its cached book entry');
assert.equal(fallback(routing,'https://example.test/books/space-marines/'),'./books/space-marines/','Space Marines directory must use its cached book entry without changing route ownership');
assert.equal(fallback(routing,'https://example.test/books/space-marines/reader.html'),'./books/space-marines/reader.html','Space Marines reader must retain its reader fallback');
assert.equal(fallback(routing,'https://example.test/books/chaos-space-marines/index.html'),'./books/chaos-space-marines/index.html','another supported book must retain its entry fallback');
assert.equal(fallback(routing,'https://example.test/'),'./index.html','root navigation must retain the Library fallback');
assert.equal(fallback(routing,'https://example.test/index.html'),'./index.html','Library navigation must retain the Library fallback');
assert.equal(vm.runInContext("APP_SHELL.filter(url=>url==='./books/space-marines/').length",routing.context),1,'Space Marines cached entry membership changed');

const successfulWrite=workerRuntime();
const written=await fetchAndCache(successfulWrite,{url:'https://example.test/assets/example.js'});
assert.equal(await written.text(),'network','successful network response changed when the cache write succeeded');
assert.equal(successfulWrite.puts.length,1,'successful response was not written to the runtime cache');
assert.equal(successfulWrite.warnings.length,0,'successful cache write was reported as a failure');

const rejectedWrite=workerRuntime();
const writeFailure=new Error('injected cache.put rejection');
rejectedWrite.behavior.put=async()=>{throw writeFailure;};
const unhandled=[];
const recordUnhandled=reason=>unhandled.push(reason);
process.on('unhandledRejection',recordUnhandled);
try{
  const response=await dispatchFetch(rejectedWrite,{method:'GET',mode:'navigate',url:'https://example.test/books/space-marines/index.html'});
  assert.equal(response.status,200,'cache.put rejection replaced the successful network status');
  assert.equal(await response.text(),'network','cache.put rejection replaced the successful network body');
  await new Promise(resolve=>setImmediate(resolve));
}finally{
  process.off('unhandledRejection',recordUnhandled);
}
assert.equal(rejectedWrite.puts.length,1,'cache.put rejection was not injected');
assert.equal(rejectedWrite.warnings.length,1,'cache.put rejection was not reported once');
assert.match(String(rejectedWrite.warnings[0][0]),/cache write failed/i,'cache.put rejection report lacks cache-write context');
assert.equal(rejectedWrite.warnings[0][1],writeFailure,'cache.put rejection report lost the original error');
assert.deepEqual(rejectedWrite.cacheMatches,[],'cache.put rejection incorrectly activated the offline fallback chain');
assert.deepEqual(unhandled,[],'cache.put rejection escaped as an unhandled rejection');

const failedFetch=workerRuntime();
failedFetch.behavior.fetch=async()=>{throw new TypeError('injected network failure');};
failedFetch.behavior.match=async key=>key==='./books/chaos-space-marines/index.html'?new Response('cached book entry',{status:200}):undefined;
const fallbackResponse=await dispatchFetch(failedFetch,{method:'GET',mode:'navigate',url:'https://example.test/books/chaos-space-marines/index.html'});
assert.equal(await fallbackResponse.text(),'cached book entry','true network failure did not retain navigation fallback behavior');
assert.equal(failedFetch.puts.length,0,'failed network request attempted a cache write');

console.log('Service Worker resilience QA passed: offline routes, cache-write isolation, and network fallback.');
