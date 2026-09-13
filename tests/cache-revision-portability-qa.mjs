import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {calculateCacheRevision} from '../tools/cache-revision.mjs';

const temp=fs.mkdtempSync(path.join(os.tmpdir(),'wh-cache-portability-'));
const asset=path.join(temp,'asset.js');
const binary=path.join(temp,'image.bin');
const worker=path.join(temp,'service-worker.js');
const workerSource=(version=1,eol='\n')=>[
  'const LIBRARY_FALLBACK = "./index.html";',
  'const APP_SHELL = [',
  `  "./asset.js?v=${version}",`,
  '  "./image.bin"',
  '];',
  '',
].join(eol);

try{
  fs.writeFileSync(asset,'const value = 1;\n');
  fs.writeFileSync(binary,Buffer.from([0,13,10,255]));
  fs.writeFileSync(worker,workerSource());
  const lf=calculateCacheRevision({root:temp}).revision;

  fs.writeFileSync(asset,'const value = 1;\r\n');
  fs.writeFileSync(worker,workerSource(1,'\r\n'));
  assert.equal(calculateCacheRevision({root:temp}).revision,lf,'equivalent LF/CRLF text changed cache identity');

  fs.writeFileSync(asset,'const value = 2;\r\n');
  const contentChanged=calculateCacheRevision({root:temp}).revision;
  assert.notEqual(contentChanged,lf,'text content mutation did not change cache identity');

  fs.writeFileSync(asset,'const value = 1;\r\n');
  fs.writeFileSync(worker,workerSource(2,'\r\n'));
  assert.notEqual(calculateCacheRevision({root:temp}).revision,lf,'APP_SHELL query mutation did not change cache identity');

  fs.writeFileSync(worker,workerSource(1,'\r\n'));
  fs.writeFileSync(binary,Buffer.from([0,10,255]));
  assert.notEqual(calculateCacheRevision({root:temp}).revision,lf,'binary byte mutation did not change cache identity');
}finally{
  fs.rmSync(temp,{recursive:true,force:true});
}

console.log('Cache revision portability QA passed: text EOLs normalize, semantic text/query and binary byte changes remain significant.');
