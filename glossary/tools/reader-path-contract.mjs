import fs from 'node:fs';
import path from 'node:path';
import {createArmyBookTargetCatalog,parseArmyBookTargetCatalog} from '../../books/shared/tools/build-army-book-targets.mjs';

// Only actual element attributes count, never navigation metadata or body text.
function elements(html){
  const result=[],tokens=/<!--[\s\S]*?-->|<(script|style|textarea|title)\b((?:"[^"]*"|'[^']*'|[^'">])*)>[\s\S]*?<\/\1\s*>|<([A-Za-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi;
  for(const match of html.matchAll(tokens)){
    if(!match[1]&&!match[3])continue;
    const attrs={};
    for(const attr of (match[2]??match[4]).matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g))attrs[attr[1].toLowerCase()]=attr[2]??attr[3]??attr[4]??'';
    result.push({tag:(match[1]||match[3]).toLowerCase(),attrs,start:match.index,end:match.index+match[0].length});
  }
  return result;
}

// A build-time validator, not an alternate reader/navigation implementation.
export function createReaderAnchorValidator(root,io=fs){
  const documents=new Map();
  return function hasAnchor(relativePath){
    if(typeof relativePath!=='string'||relativePath.startsWith('/')||/[\\:?]/.test(relativePath)||relativePath.split('/').includes('..'))return false;
    const parts=relativePath.split('#');if(parts.length>2)return false;
    const [file,anchor='']=parts,absolute=path.resolve(root,...file.split('/'));
    if(!absolute.startsWith(path.resolve(root)+path.sep)||!io.existsSync(absolute))return false;
    if(!anchor)return true;
    if(!documents.has(absolute)){
      const shell=io.readFileSync(absolute,'utf8'),tags=elements(shell);
      const record={ids:new Set(tags.map(tag=>tag.attrs.id).filter(Boolean)),catalog:null,derived:null};
      documents.set(absolute,record);
      // Generated targets are accepted only through this reader's real wiring.
      const scripts=tags.filter(tag=>tag.tag==='script').map(tag=>tag.attrs.src?.split('?')[0]).filter(Boolean);
      const catalogs=scripts.filter(src=>src==='./scripts/target-data.js'||src==='scripts/target-data.js');
      const mounts=scripts.filter(src=>src==='../shared/target-mount.js');
      const hosts=tags.filter(tag=>(tag.attrs.class||'').split(/\s+/).includes('document'));
      if(path.basename(file)!=='reader.html'||catalogs.length!==1||mounts.length!==1||hosts.length!==1)return record.ids.has(anchor);
      const catalogFile=path.resolve(path.dirname(absolute),catalogs[0]),host=hosts[0];
      if(!io.existsSync(catalogFile)||!new RegExp('^\\s*</'+host.tag+'\\s*>').test(shell.slice(host.end)))return record.ids.has(anchor);
      try{
        const catalog=parseArmyBookTargetCatalog(io.readFileSync(catalogFile,'utf8'));
        if(typeof catalog.html!=='string'||!catalog.owners||!catalog.targets)return record.ids.has(anchor);
        const derived=createArmyBookTargetCatalog(shell.slice(0,host.end)+catalog.html+shell.slice(host.end));
        // Reconstruct owners/ranges from actual HTML + the same reader TOC.
        if(JSON.stringify(catalog.owners)!==JSON.stringify(derived.owners)||JSON.stringify(catalog.targets)!==JSON.stringify(derived.targets))return record.ids.has(anchor);
        record.catalog=catalog;record.derived=derived;record.generatedIds=new Set(elements(catalog.html).map(tag=>tag.attrs.id).filter(Boolean));
      }catch{return record.ids.has(anchor);}
    }
    const record=documents.get(absolute);if(record.ids.has(anchor))return true;
    const owner=record.catalog?.owners[anchor],target=owner&&record.catalog.targets[owner];
    if(!target||!record.generatedIds.has(anchor))return false;
    const fragment=record.catalog.html.slice(target.start,target.end),tags=elements(fragment);
    return tags[0]?.attrs.id===owner&&tags.some(tag=>tag.attrs.id===anchor);
  };
}

// Preserve the historical shell-marker publication boundary. This is eligibility,
// not proof that an anchor exists: data-nav-id markers qualified here as well.
export function isAutoPublishedRulePath(root,relativePath,io=fs){
  const [file,anchor='']=relativePath.split('#'),absolute=path.join(root,...file.split('/'));
  return io.existsSync(absolute)&&(!anchor||io.readFileSync(absolute,'utf8').includes('id="'+anchor+'"'));
}
