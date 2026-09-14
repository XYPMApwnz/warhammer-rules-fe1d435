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

const bundledPython=path.join(os.homedir(),'.cache','codex-runtimes','codex-primary-runtime','dependencies','python','python.exe');
const python=process.env.PYTHON||(fs.existsSync(bundledPython)?bundledPython:'python');
const script=path.join(toolRoot,'tools','extract-faction-pack.py');
const helpArguments=new Set(['--help','-h']);
const authenticatedInputArguments=['--bsdata-faction','--bsdata-library'];

export const authenticatedInputPaths=Object.freeze({checkout,faction,library});

export const classifyForwardedArgument=argument=>{
  if(argument==='--check')return 'OUTPUT_OR_CHECK_BEHAVIOR';
  if(helpArguments.has(argument))return 'MODE_OR_OPERATION';
  if(typeof argument!=='string'||argument.length===0)return 'UNKNOWN';
  const option=argument.split('=',1)[0];
  if(authenticatedInputArguments.some(selector=>option===selector||selector.startsWith(option)))return 'AUTHENTICATED_INPUT_SELECTOR';
  return 'UNKNOWN';
};

export const validateForwardedArguments=argumentsToForward=>{
  for(const argument of argumentsToForward){
    const classification=classifyForwardedArgument(argument);
    if(classification==='AUTHENTICATED_INPUT_SELECTOR'){
      throw new Error(`Authenticated BSData input selector cannot be overridden: ${argument}`);
    }
    if(classification==='UNKNOWN'){
      throw new Error(`Unsupported Space Marines Faction Pack wrapper argument: ${argument}`);
    }
  }
  return [...argumentsToForward];
};

const normalizedPath=value=>{
  const real=fs.realpathSync.native(path.resolve(value));
  return process.platform==='win32'?real.toLowerCase():real;
};

export const assertAuthenticatedInputs=(authenticated,expectedPaths=[faction,library])=>{
  const actual=(authenticated.inputFiles||[]).map(input=>normalizedPath(path.resolve(authenticated.checkout,input)));
  const expected=expectedPaths.map(normalizedPath);
  if(actual.length!==expected.length||expected.some(input=>!actual.includes(input))){
    throw new Error('BSData verifier did not authenticate the exact configured child input set');
  }
};

export const buildAuthenticatedChildArguments=({
  scriptPath=script,
  factionPath=faction,
  libraryPath=library,
  forwardedArguments=[]
}={})=>[
  scriptPath,
  '--bsdata-faction',
  factionPath,
  '--bsdata-library',
  libraryPath,
  ...validateForwardedArguments(forwardedArguments)
];

export const runExtractor=(forwardedArguments=process.argv.slice(2),{
  verify=verifyBsdataSource,
  spawn=spawnSync
}={})=>{
  validateForwardedArguments(forwardedArguments);
  const authenticated=verify({checkout,expectedCommit:config.source.commit,inputFiles:[faction,library]});
  assertAuthenticatedInputs(authenticated);
  const childArguments=buildAuthenticatedChildArguments({forwardedArguments});
  const result=spawn(python,childArguments,{cwd:repoRoot,encoding:'utf8'});
  if(result.error)throw result.error;
  return {authenticated,childArguments,result};
};

const invokedDirectly=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(invokedDirectly){
  const {authenticated,result}=runExtractor();
  if(result.stdout)process.stdout.write(result.stdout);
  if(result.stderr)process.stderr.write(result.stderr);
  if(result.status!==0)process.exitCode=result.status;
  else console.log(`Space Marines Faction Pack authenticated BSData ${authenticated.commit}: ${authenticated.inputFiles.length} inputs`);
}
