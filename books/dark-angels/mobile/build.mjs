import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Dark Angels',
  expected:{detachments:24,units:98},
  template:{kind:'opening',ellipsis:'...'}
});