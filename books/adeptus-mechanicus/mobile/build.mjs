import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Adeptus Mechanicus',
  expected:{detachments:10,units:34},
  armyRulesTarget:'core-rules',
  template:{kind:'classic',openLabel:'Open Adeptus Mechanicus Rules'}
});