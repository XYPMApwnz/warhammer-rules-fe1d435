import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Tyranids',
  expected:{detachments:10,units:50},
  template:{kind:'manifest',themeColor:'#0a0d12',openLabel:'Open the canonical Tyranids reader'}
});