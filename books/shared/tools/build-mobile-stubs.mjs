import {readdir,readFile,unlink,writeFile} from 'node:fs/promises';

const clean=value=>String(value||'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').trim();
const attribute=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');

function extract(tag,id,html){
  const opener=new RegExp(`<${tag}\\b[^>]*\\bid="${id}"[^>]*>`,'i').exec(html);
  if(!opener)throw new Error(`Missing ${tag}#${id}`);
  const tags=new RegExp(`<\\/?${tag}\\b[^>]*>`,'gi');tags.lastIndex=opener.index;
  let depth=0;
  for(let match;(match=tags.exec(html));){depth+=match[0][1]==='/'?-1:1;if(depth===0)return html.slice(opener.index,tags.lastIndex);}
  throw new Error(`Unclosed ${tag}#${id}`);
}

function titleFor(tag,id,source){
  const fragment=extract(tag,id,source),heading=/<h3(?:\s[^>]*)?>([\s\S]*?)<\/h3>/i.exec(fragment)?.[1];
  if(!heading)throw new Error(`Missing title for ${id}`);
  return clean(tag==='section'?heading.replace(/<span[\s\S]*$/,''):heading);
}

export function collectMobileStubRoutes(source,spec){
  const detachmentIds=[...source.matchAll(/<section\b[^>]*\bid="(detachment-[^"]+)"/g)].map(match=>match[1]);
  const unitIds=[...source.matchAll(/<article\b[^>]*\bid="(unit-[^"]+)"/g)].map(match=>match[1]);
  if(detachmentIds.length!==spec.expected.detachments||unitIds.length!==spec.expected.units)throw new Error(`Expected ${spec.expected.detachments} Detachments and ${spec.expected.units} Datasheets; found ${detachmentIds.length} and ${unitIds.length}`);
  const routes=[
    {file:'index.html',target:'start',title:'Start'},
    {file:'army-rules.html',target:spec.armyRulesTarget||'army-rules',title:'Army Rules'},
    {file:'updates.html',target:'updates',title:'Updates'},
    ...detachmentIds.map(target=>({file:`${target.slice(11)}.html`,target,title:titleFor('section',target,source)})),
    ...unitIds.map(target=>({file:`${target.slice(5)}.html`,target,title:titleFor('article',target,source)}))
  ];
  const collisions=[...Map.groupBy(routes,route=>route.file)].filter(([,items])=>items.length>1);
  if(collisions.length)throw new Error(`Compatibility route collisions: ${collisions.map(([file,items])=>`${file}: ${items.map(item=>item.target).join(', ')}`).join('; ')}`);
  for(const route of routes)if(!source.includes(`id="${route.target}"`))throw new Error(`Canonical target is absent: ${route.target}`);
  return routes;
}

function renderClassic(route,spec){
  return `<!doctype html>
<html lang="en" data-canonical-reader="../reader.html" data-canonical-target="${attribute(route.target)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${spec.title}</title>
  <script src="../../shared/mobile-route-redirect.js?v=1"></script>
</head>
<body><noscript><a href="../reader.html#${attribute(route.target)}">${spec.template.openLabel}</a></noscript></body>
</html>
`;
}

function renderManifest(route,spec){
  return `<!doctype html><html lang="en" data-theme="dark" data-canonical-reader="../reader.html" data-canonical-target="${attribute(route.target)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="${spec.template.themeColor}"><title>${spec.title} Rules</title><link rel="manifest" href="../../../manifest.webmanifest"></head><body><noscript><a href="../reader.html#${attribute(route.target)}">${spec.template.openLabel}</a></noscript><script src="../../shared/mobile-route-redirect.js?v=1"></script></body></html>
`;
}

function renderOpening(route,spec){
  return `<!doctype html><html lang="en" data-canonical-reader="../reader.html" data-canonical-target="${attribute(route.target)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${attribute(route.title)} — ${spec.title}</title><script src="../../shared/mobile-route-redirect.js?v=1"></script></head><body><p>Opening the canonical ${spec.title} reader${spec.template.ellipsis}</p></body></html>
`;
}

const renderers={classic:renderClassic,manifest:renderManifest,opening:renderOpening};

export async function createMobileStubPlan(builderUrl,spec){
  const mobileRoot=new URL('./',builderUrl),source=await readFile(new URL('../reader.html',builderUrl),'utf8'),routes=collectMobileStubRoutes(source,spec),render=renderers[spec.template.kind];
  if(!render)throw new Error(`Unsupported Mobile stub template: ${spec.template.kind}`);
  const outputs=new Map(routes.map(route=>[route.file,render(route,spec)]));
  for(const [file,html] of outputs){
    if(!html.includes('data-canonical-reader="../reader.html"')||!html.includes('../../shared/mobile-route-redirect.js?v=1')||/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/.test(html)||/mobile\.(?:js|css)|phone-popup-controller/.test(html))throw new Error(`Invalid content-free compatibility stub: ${file}`);
  }
  return {mobileRoot,routes,outputs};
}

export async function runMobileStubBuilder(builderUrl,spec,{check=process.argv.includes('--check')}={}){
  const {mobileRoot,routes,outputs}=await createMobileStubPlan(builderUrl,spec),expectedFiles=new Set(outputs.keys()),existingHtml=(await readdir(mobileRoot)).filter(file=>file.endsWith('.html')),errors=[];
  for(const [file,expected] of outputs){
    const url=new URL(file,mobileRoot);
    if(check){let actual='';try{actual=await readFile(url,'utf8');}catch{}if(actual!==expected)errors.push(`${file}: stale or missing`);}
    else await writeFile(url,expected);
  }
  for(const file of existingHtml)if(!expectedFiles.has(file)){if(check)errors.push(`${file}: orphan route`);else await unlink(new URL(file,mobileRoot));}
  if(errors.length){console.error(errors.join('\n'));process.exitCode=1;return;}
  console.log(`${spec.title} compatibility routes ${check?'verified':'built'}: ${routes.length} content-free stubs.`);
}
