import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {collectMobileStubRoutes} from '../../books/shared/tools/build-mobile-stubs.mjs';
import {parseArmyBookTargetCatalog} from '../../books/shared/tools/build-army-book-targets.mjs';

const identity=route=>`${route.file}#${route.target}`;
const duplicates=values=>[...new Set(values.filter((value,index)=>values.indexOf(value)!==index))].sort();

export function compareMobileRouteInventories(expected,actual){
  const expectedIdentities=expected.map(identity),actualIdentities=actual.map(identity);
  const expectedSet=new Set(expectedIdentities),actualSet=new Set(actualIdentities);
  return {
    missing:[...expectedSet].filter(value=>!actualSet.has(value)).sort(),
    unexpected:[...actualSet].filter(value=>!expectedSet.has(value)).sort(),
    duplicates:duplicates(actualIdentities)
  };
}

export function assertMobileRouteInventoriesEqual(expected,actual,label='mobile route inventory'){
  const difference=compareMobileRouteInventories(expected,actual);
  assert.deepEqual(difference.missing,[],`${label}: missing routes: ${difference.missing.join(', ')}`);
  assert.deepEqual(difference.unexpected,[],`${label}: unexpected routes: ${difference.unexpected.join(', ')}`);
  assert.deepEqual(difference.duplicates,[],`${label}: duplicate route identities: ${difference.duplicates.join(', ')}`);
  return difference;
}

export function readOwnedMobileRouteInventory({root,bookId}){
  const bookRoot=path.join(root,'books',bookId),mobileRoot=path.join(bookRoot,'mobile');
  const buildSource=fs.readFileSync(path.join(mobileRoot,'build.mjs'),'utf8');
  const specMatch=/await runMobileStubBuilder\(import\.meta\.url,([\s\S]*)\);/.exec(buildSource);
  if(!specMatch)throw new Error(`${bookId}: mobile route build contract is not discoverable`);
  const spec=vm.runInNewContext('('+specMatch[1]+')');
  const catalog=parseArmyBookTargetCatalog(fs.readFileSync(path.join(bookRoot,'scripts','target-data.js'),'utf8'));
  const expected=collectMobileStubRoutes(catalog,spec).map(route=>({file:route.file,target:route.target}));
  const actual=fs.readdirSync(mobileRoot).filter(file=>file.endsWith('.html')).sort().map(file=>{
    const html=fs.readFileSync(path.join(mobileRoot,file),'utf8');
    return {file,target:/\bdata-canonical-target=["']([^"']+)["']/.exec(html)?.[1]||'<missing>'};
  });
  return {expected,actual,difference:compareMobileRouteInventories(expected,actual)};
}

export function assertOwnedMobileRouteInventory({root,bookId}){
  const inventory=readOwnedMobileRouteInventory({root,bookId});
  assertMobileRouteInventoriesEqual(inventory.expected,inventory.actual,bookId);
  return inventory;
}
