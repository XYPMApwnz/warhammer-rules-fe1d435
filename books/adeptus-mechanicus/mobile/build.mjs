import {readFile,writeFile} from 'node:fs/promises';

const checkOnly=process.argv.includes('--check');
const source=await readFile(new URL('../reader.html',import.meta.url),'utf8');
const ids=(pattern)=>[...new Set([...source.matchAll(pattern)].map(match=>match[1]))];
const detachments=ids(/<section\b[^>]*\bid="(detachment-[^"]+)"/g);
const units=ids(/<article\b[^>]*\bclass="[^"]*\bunit-card\b[^"]*"[^>]*\bid="(unit-[^"]+)"/g);
if(detachments.length!==10||units.length!==34)throw new Error(`Expected 10 detachments and 34 datasheets, found ${detachments.length} and ${units.length}`);

const routes=[
  {file:'index.html',id:'start'},
  {file:'army-rules.html',id:'core-rules'},
  {file:'updates.html',id:'updates'},
  ...detachments.map(id=>({file:`${id.slice(11)}.html`,id})),
  ...units.map(id=>({file:`${id.slice(5)}.html`,id}))
];
const page=route=>`<!doctype html>
<html lang="en" data-canonical-reader="../reader.html" data-canonical-target="${route.id}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Adeptus Mechanicus</title>
  <script src="../../shared/mobile-route-redirect.js?v=1"></script>
</head>
<body><noscript><a href="../reader.html#${route.id}">Open Adeptus Mechanicus Rules</a></noscript></body>
</html>
`;
const outputs=new Map(routes.map(route=>[route.file,page(route)]));
for(const [file,html] of outputs){
  if(!html.includes('data-canonical-reader="../reader.html"')||/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/.test(html))throw new Error(`Invalid compatibility stub ${file}`);
}
if(checkOnly){
  const stale=[];
  for(const [file,expected] of outputs){
    try{if(await readFile(new URL(file,import.meta.url),'utf8')!==expected)stale.push(`${file} (stale)`);}
    catch(error){if(error.code==='ENOENT')stale.push(`${file} (missing)`);else throw error;}
  }
  if(stale.length){console.error(`Mechanicus compatibility routes are stale or missing:\n- ${stale.join('\n- ')}`);process.exitCode=1;}
  else console.log(`Mechanicus compatibility routes are current: ${routes.length} stubs.`);
}else{
  for(const [file,expected] of outputs)await writeFile(new URL(file,import.meta.url),expected);
  console.log(`Mechanicus compatibility routes built: ${routes.length} stubs.`);
}