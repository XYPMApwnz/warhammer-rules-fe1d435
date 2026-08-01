import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=file=>readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
const helper=read('books/shared/modal-focus.js');
assert.match(helper,/event\.key!=='Tab'/);
assert.match(helper,/event\.key==='Escape'/);
assert.match(helper,/node\.inert=true/);
assert.match(helper,/target\.focus\(\{preventScroll:true\}\)/);

for(const file of [
  'books/death-guard/reader.html',
  'books/adeptus-mechanicus/reader.html',
  'books/tyranids/reader.html',
  'books/tau-empire/reader.html'
]) assert.match(read(file),/\.\.\/shared\/modal-focus\.js\?v=1/,`${file} must load the shared modal contract`);

for(const file of [
  'books/death-guard/scripts/app.js',
  'books/adeptus-mechanicus/scripts/app.js',
  'books/shared/army-related-rules.js'
]){
  const source=read(file);
  assert.match(source,/WHModalFocus\.create\(layer,close\)/,`${file} must install shared modal focus`);
  assert.match(source,/modal\.activate\(/,`${file} must save the logical trigger`);
  assert.match(source,/modal\.deactivate\(\)/,`${file} must restore focus and background`);
  assert.match(source,/modal\.focusFirst\(\)/,`${file} must move focus into the dialog`);
}

console.log('PASS Related Rules modal contract for Death Guard, Mechanicus, Tyranids and T\'au');
