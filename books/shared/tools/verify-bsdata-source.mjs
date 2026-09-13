import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const runGit=(checkout,args)=>{
  const result=spawnSync('git',['-C',checkout,...args],{encoding:'utf8'});
  if(result.status!==0)throw new Error(`BSData source verification failed: ${(result.stderr||result.stdout||'git command failed').trim()}`);
  return result.stdout.trim();
};

const samePath=(left,right)=>process.platform==='win32'
  ?path.resolve(left).toLowerCase()===path.resolve(right).toLowerCase()
  :path.resolve(left)===path.resolve(right);

const within=(file,root)=>{
  const relative=path.relative(root,file);
  return relative===''||(!relative.startsWith(`..${path.sep}`)&&relative!=='..'&&!path.isAbsolute(relative));
};

export function verifyBsdataSource({checkout,expectedCommit,inputFiles}){
  if(!/^[0-9a-f]{40}$/i.test(String(expectedCommit||'')))throw new Error('BSData source verification failed: configured commit must be a full 40-character Git SHA');
  const sourceRoot=fs.realpathSync.native(checkout);
  const gitRoot=fs.realpathSync.native(runGit(sourceRoot,['rev-parse','--show-toplevel']));
  if(!samePath(sourceRoot,gitRoot))throw new Error(`BSData source verification failed: configured checkout is not the Git worktree root (${sourceRoot} != ${gitRoot})`);
  const actualCommit=runGit(sourceRoot,['rev-parse','--verify','HEAD']);
  if(actualCommit.toLowerCase()!==expectedCommit.toLowerCase())throw new Error(`BSData source verification failed: configured commit ${expectedCommit} does not match checkout HEAD ${actualCommit}`);
  const relatives=inputFiles.map(file=>{
    const resolved=fs.realpathSync.native(file);
    if(!within(resolved,sourceRoot))throw new Error(`BSData source verification failed: input is outside configured checkout: ${resolved}`);
    return path.relative(sourceRoot,resolved).replaceAll(path.sep,'/');
  });
  const tracked=spawnSync('git',['-C',sourceRoot,'ls-files','--error-unmatch','--',...relatives],{encoding:'utf8'});
  if(tracked.status!==0)throw new Error(`BSData source verification failed: every input must be tracked at HEAD: ${(tracked.stderr||tracked.stdout).trim()}`);
  const dirty=spawnSync('git',['-C',sourceRoot,'status','--porcelain=v1','--untracked-files=no','--',...relatives],{encoding:'utf8'});
  if(dirty.status!==0||dirty.stdout.trim())throw new Error(`BSData source verification failed: configured inputs differ from HEAD${dirty.stdout.trim()?`: ${dirty.stdout.trim()}`:''}`);
  return {checkout:sourceRoot,commit:actualCommit,inputFiles:relatives};
}

export function verifyTrackedInputs({checkout,inputFiles}){
  const sourceRoot=fs.realpathSync.native(checkout);
  const gitRoot=fs.realpathSync.native(runGit(sourceRoot,['rev-parse','--show-toplevel']));
  const relatives=inputFiles.map(file=>{
    const resolved=fs.realpathSync.native(file);
    if(!within(resolved,gitRoot))throw new Error(`BSData source verification failed: repository input is outside its checkout: ${resolved}`);
    return path.relative(gitRoot,resolved).replaceAll(path.sep,'/');
  });
  const tracked=spawnSync('git',['-C',gitRoot,'ls-files','--error-unmatch','--',...relatives],{encoding:'utf8'});
  if(tracked.status!==0)throw new Error(`BSData source verification failed: every repository input must be tracked: ${(tracked.stderr||tracked.stdout).trim()}`);
  const dirty=spawnSync('git',['-C',gitRoot,'status','--porcelain=v1','--untracked-files=no','--',...relatives],{encoding:'utf8'});
  if(dirty.status!==0||dirty.stdout.trim())throw new Error(`BSData source verification failed: repository inputs differ from HEAD${dirty.stdout.trim()?`: ${dirty.stdout.trim()}`:''}`);
  return {checkout:gitRoot,inputFiles:relatives};
}
