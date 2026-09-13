import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {verifyBsdataSource} from '../../shared/tools/verify-bsdata-source.mjs';

const toolRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repoRoot=path.resolve(toolRoot,'../..');
const configPath=path.join(toolRoot,'sources','bsdata-extract.config.json');

const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const checkout=path.resolve(path.dirname(configPath),config.source.checkout);
const configuredInput=name=>{
  const input=config.inputs.find(item=>path.basename(item.path)===name);
  if(!input)throw new Error(`Space Marines Faction Pack BSData input is not configured: ${name}`);
  return path.resolve(path.dirname(configPath),input.path);
};
const faction=configuredInput('Imperium - Space Marines.json');
const library=configuredInput('Library - Astartes Heresy Legends.json');

const authenticated=verifyBsdataSource({checkout,expectedCommit:config.source.commit,inputFiles:[faction,library]});
const bundledPython=path.join(os.homedir(),'.cache','codex-runtimes','codex-primary-runtime','dependencies','python','python.exe');
const python=process.env.PYTHON||(fs.existsSync(bundledPython)?bundledPython:'python');
const script=path.join(toolRoot,'tools','extract-faction-pack.py');
const result=spawnSync(python,[script,'--bsdata-faction',faction,'--bsdata-library',library,...process.argv.slice(2)],{cwd:repoRoot,encoding:'utf8'});
if(result.stdout)process.stdout.write(result.stdout);
if(result.stderr)process.stderr.write(result.stderr);
if(result.error)throw result.error;
if(result.status!==0)process.exitCode=result.status;
else console.log(`Space Marines Faction Pack authenticated BSData ${authenticated.commit}: ${authenticated.inputFiles.length} inputs`);
