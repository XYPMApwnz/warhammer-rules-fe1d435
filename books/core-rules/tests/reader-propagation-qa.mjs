import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const coreRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(coreRoot,'..','..');
const windowValue=(file,key)=>{const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});return sandbox.window[key];};

function fixture(){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'core-reader-propagation-'));
  const stagedCore=path.join(root,'books','core-rules');
  fs.mkdirSync(path.join(stagedCore,'reader'),{recursive:true});
  fs.mkdirSync(path.join(root,'books','shared'),{recursive:true});
  fs.cpSync(path.join(coreRoot,'content'),path.join(stagedCore,'content'),{recursive:true});
  fs.cpSync(path.join(coreRoot,'tools'),path.join(stagedCore,'tools'),{recursive:true});
  fs.copyFileSync(path.join(coreRoot,'reader','build.mjs'),path.join(stagedCore,'reader','build.mjs'));
  fs.copyFileSync(path.join(repoRoot,'books','shared','runtime-asset-versions.json'),path.join(root,'books','shared','runtime-asset-versions.json'));
  return {root,core:stagedCore,reader:path.join(stagedCore,'reader')};
}

function buildAndRead(mutate){
  const staged=fixture();
  try{
    mutate(staged);
    execFileSync(process.execPath,[path.join(staged.reader,'build.mjs')],{cwd:staged.root,stdio:'pipe'});
    const html=fs.readdirSync(staged.reader).filter(file=>file.endsWith('.html')).map(file=>fs.readFileSync(path.join(staged.reader,file),'utf8')).join('\n');
    const search=fs.readFileSync(path.join(staged.reader,'search-index.json'),'utf8');
    return {html,search};
  }finally{fs.rmSync(staged.root,{recursive:true,force:true});}
}

const mainMarker='SYNTHETIC_READER_MAIN_PROPAGATION';
const main=buildAndRead(({core})=>{
  const file=path.join(core,'content','core-rules.digital-11e.json');
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  data.records.find(record=>record.code==='02.01').text+=`\n${mainMarker}`;
  fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
});
assert(main.html.includes(mainMarker)&&main.search.includes(mainMarker),'ordinary MAIN_RULE mutation did not reach Reader card/search/popup projection');

const overrideMarker='SYNTHETIC_READER_OVERRIDE_PROPAGATION';
const override=buildAndRead(({core})=>{
  const file=path.join(core,'content','core-rules.current-official.en.json');
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  data.ruleOverrides.find(record=>record.code==='01.02.03').currentLine+=` ${overrideMarker}`;
  fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
});
assert(override.html.includes(overrideMarker)&&override.search.includes(overrideMarker),'official override mutation did not reach Reader card/search/popup projection');

const faqMarker='SYNTHETIC_READER_FAQ_PROPAGATION';
const faq=buildAndRead(({core})=>{
  const file=path.join(core,'content','core-rules.source.en.js');
  const source=windowValue(file,'CORE_PDF_SOURCE');
  const answer=source.faqs[0].answer;
  const script=fs.readFileSync(file,'utf8');
  assert(script.includes(answer),'FAQ mutation fixture could not locate accepted answer');
  fs.writeFileSync(file,script.replace(answer,`${answer} ${faqMarker}`));
});
assert(faq.html.includes(faqMarker)&&faq.search.includes(faqMarker),'FAQ mutation did not reach Reader card/search');

const uruMarker='SYNTHETIC_READER_URU_PROPAGATION';
const uru=buildAndRead(({core})=>{
  const file=path.join(core,'content','core-rules.current-official.en.json');
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  data.universalRulesUpdates[0].text+=` ${uruMarker}`;
  fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
});
assert(uru.html.includes(uruMarker)&&uru.search.includes(uruMarker),'Universal Rules Update mutation did not reach Reader card/search');

console.log('Core Reader propagation QA passed: MAIN_RULE, official override, FAQ and URU mutations reach generated Reader facts without a Glossary tree.');
