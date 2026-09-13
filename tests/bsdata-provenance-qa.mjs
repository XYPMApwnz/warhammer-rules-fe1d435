import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const extractor=path.join(repo,'books','shared','tools','extract-bsdata-11e.mjs');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'bsdata-provenance-'));
const run=(command,args,cwd=root)=>spawnSync(command,args,{cwd,encoding:'utf8'});
const output=result=>`${result.stdout||''}\n${result.stderr||''}`;
try{
  assert.equal(run('git',['init','-q']).status,0);
  assert.equal(run('git',['config','user.email','qa@example.invalid']).status,0);
  assert.equal(run('git',['config','user.name','QA']).status,0);
  fs.writeFileSync(path.join(root,'Faction.json'),JSON.stringify({catalogue:{id:'fixture',name:'Fixture',selectionEntries:[],sharedSelectionEntries:[],sharedSelectionEntryGroups:[],sharedProfiles:[],sharedRules:[],categoryEntries:[],costTypes:[]}},null,2));
  assert.equal(run('git',['add','Faction.json']).status,0);
  assert.equal(run('git',['commit','-qm','fixture']).status,0);
  const head=run('git',['rev-parse','HEAD']).stdout.trim();
  const config={schema:1,faction:{id:'fixture',title:'Fixture'},source:{repository:'fixture',commit:head},inputs:[{role:'faction',path:'Faction.json'}],outputs:{snapshot:'snapshot.json',datasheets:'datasheets.json',points:'points.json'},filters:{blockedBranches:[],excludeNamePatterns:[],excludeNames:[],excludePrimaryCategories:[],imperialArmourNames:[]},enhancements:{detachments:[]}};
  const configPath=path.join(root,'config.json');
  fs.writeFileSync(configPath,JSON.stringify(config,null,2));

  const good=run(process.execPath,[extractor,configPath]);
  assert.equal(good.status,0,output(good));
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,'snapshot.json'),'utf8')).source.commit,head);

  config.source.commit='0'.repeat(40);fs.writeFileSync(configPath,JSON.stringify(config,null,2));
  const mismatch=run(process.execPath,[extractor,configPath]);
  assert.notEqual(mismatch.status,0,output(mismatch));
  assert.match(output(mismatch),/configured commit .* does not match checkout HEAD/);

  config.source.commit=head;fs.writeFileSync(configPath,JSON.stringify(config,null,2));
  fs.appendFileSync(path.join(root,'Faction.json'),'\n');
  const dirty=run(process.execPath,[extractor,configPath]);
  assert.notEqual(dirty.status,0,output(dirty));
  assert.match(output(dirty),/configured inputs differ from HEAD/);

  const nongit=fs.mkdtempSync(path.join(os.tmpdir(),'bsdata-nongit-'));
  try{
    fs.writeFileSync(path.join(nongit,'Faction.json'),'{}');
    config.source.checkout=nongit;config.inputs[0].path=path.join(nongit,'Faction.json');fs.writeFileSync(configPath,JSON.stringify(config,null,2));
    const invalid=run(process.execPath,[extractor,configPath]);
    assert.notEqual(invalid.status,0,output(invalid));
    assert.match(output(invalid),/BSData source verification failed/);
  }finally{fs.rmSync(nongit,{recursive:true,force:true});}
}finally{fs.rmSync(root,{recursive:true,force:true});}

console.log('BSData checkout provenance QA passed: exact HEAD, tracked clean inputs, mismatch and non-Git rejection.');
