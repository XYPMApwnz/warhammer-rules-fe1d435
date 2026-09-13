import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Space Marines',
  expected:{detachments:23,units:103},
  template:{kind:'opening',ellipsis:'...'}
});
