import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Death Guard',
  expected:{detachments:9,units:36},
  armyRulesTarget:'core-rules',
  template:{kind:'classic',openLabel:'Open Death Guard Rules'}
});