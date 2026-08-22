import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:"Emperor's Children",
  expected:{detachments:10,units:23},
  template:{kind:'manifest',themeColor:'#0a0b0d',openLabel:"Open the canonical Emperor's Children reader"}
});