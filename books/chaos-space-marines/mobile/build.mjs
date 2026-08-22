import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Chaos Space Marines',
  expected:{detachments:17,units:54},
  template:{kind:'opening',ellipsis:'…'}
});