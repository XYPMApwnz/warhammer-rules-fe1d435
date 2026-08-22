import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:"T'au Empire",
  expected:{detachments:7,units:39},
  template:{kind:'manifest',themeColor:'#0a0b0d',openLabel:"Open the canonical T'au Empire reader"}
});