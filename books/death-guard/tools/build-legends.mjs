import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createCanonicalBuildContext} from '../../shared/tools/canonical-build-contract.mjs';
import {buildCanonicalBook} from '../../shared/tools/build-army-book.mjs';

const configPath=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../book.config.json');
await buildCanonicalBook(createCanonicalBuildContext({configPath}));
