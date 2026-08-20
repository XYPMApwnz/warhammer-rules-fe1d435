import {readFile,writeFile} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const check=process.argv.includes('--check');
const detachmentIds=[...source.matchAll(/<section class="content-group detachment" id="(detachment-[^"]+)"/g)].map(([,id])=>id);
const unitIds=[...source.matchAll(/<article class="unit-card[^"]*" id="(unit-[^"]+)"/g)].map(([,id])=>id);

if(detachmentIds.length!==7||unitIds.length!==39)throw new Error(`Expected 7 detachments and 39 datasheets, found ${detachmentIds.length} and ${unitIds.length}`);

const routes=[
  {file:'index.html',target:'start'},
  {file:'army-rules.html',target:'army-rules'},
  {file:'updates.html',target:'updates'},
  ...detachmentIds.map(target=>({file:`${target.slice(11)}.html`,target})),
  ...unitIds.map(target=>({file:`${target.slice(5)}.html`,target}))
];
const page=({target})=>`<!doctype html><html lang="en" data-theme="dark" data-canonical-reader="../reader.html" data-canonical-target="${target}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a0b0d"><title>T'au Empire Rules</title><link rel="manifest" href="../../../manifest.webmanifest"></head><body><noscript><a href="../reader.html#${target}">Open the canonical T'au Empire reader</a></noscript><script src="../../shared/mobile-route-redirect.js?v=1"></script></body></html>\n`;

for(const route of routes){
  const url=new URL(route.file,root),expected=page(route);
  if(check){
    const actual=await readFile(url,'utf8').catch(()=>null);
    if(actual!==expected)throw new Error(`${route.file} is not the current content-free compatibility stub`);
  }else await writeFile(url,expected);
}

console.log(`T'au Empire compatibility routes ${check?'verified':'built'}: ${routes.length} content-free stubs.`);
