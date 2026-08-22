import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createCanonicalBuildContext,runCanonicalBuildExtension} from '../../shared/tools/canonical-build-contract.mjs';

const configPath=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','book.config.json');
await runCanonicalBuildExtension(createCanonicalBuildContext({configPath,args:process.argv.slice(2)}));
