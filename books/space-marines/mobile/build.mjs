import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Space Marines',
  expected:{detachments:23,units:101},
  template:{kind:'opening',ellipsis:'...'}
});