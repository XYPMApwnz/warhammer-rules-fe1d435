import {runMobileStubBuilder} from '../../shared/tools/build-mobile-stubs.mjs';

await runMobileStubBuilder(import.meta.url,{
  title:'Blood Angels',
  expected:{detachments:24,units:99},
  template:{kind:'opening',ellipsis:'...'}
});
