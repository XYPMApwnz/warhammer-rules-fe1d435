import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const prefix='books/core-rules/assets/diagrams/';
const identity=value=>String(value).replace(/^(?:\.\/|\/)/,'');
const duplicates=values=>[...new Set(values.filter((value,index)=>values.indexOf(value)!==index))].sort();

export function readPublishedCoreDiagramInventory({root}){
  const readerRoot=path.join(root,'books','core-rules','reader'),paths=[];
  for(const file of fs.readdirSync(readerRoot).filter(file=>file.endsWith('.html')).sort()){
    const source=fs.readFileSync(path.join(readerRoot,file),'utf8');
    for(const match of source.matchAll(/\.\.\/assets\/diagrams\/([^"'?#]+)/g))paths.push(prefix+match[1]);
  }
  return [...new Set(paths)].sort();
}

export function compareCoreDiagramInventories(expected,actual){
  const expectedIds=expected.map(identity),actualIds=actual.map(identity),expectedSet=new Set(expectedIds),actualSet=new Set(actualIds);
  return{
    missing:[...expectedSet].filter(value=>!actualSet.has(value)).sort(),
    unexpected:[...actualSet].filter(value=>!expectedSet.has(value)).sort(),
    duplicates:duplicates(actualIds)
  };
}

export function assertCoreDiagramInventoriesEqual(expected,actual,label='Core Rules diagram inventory'){
  assert.ok(expected.length,`${label}: published owner has no diagram dependencies`);
  assert.deepEqual(compareCoreDiagramInventories(expected,actual),{missing:[],unexpected:[],duplicates:[]},`${label}: cached identities differ from published reader dependencies`);
}
