import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ASTRA_ATTACK_SCRIPTS,assertBehavioralOracleScripts,runBehavioralOracleScripts} from './helpers/architecture-behavioral-oracles.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const results=runBehavioralOracleScripts({root,scripts:Object.values(ASTRA_ATTACK_SCRIPTS)});
for(const [attack,script] of Object.entries(ASTRA_ATTACK_SCRIPTS)){
  assertBehavioralOracleScripts(results,[script],attack);
  console.log(`${attack}=KILLED`);
}
console.log(`ASTRA_REPRODUCED_ATTACKS_KILLED=ALL (${Object.keys(ASTRA_ATTACK_SCRIPTS).length}/7)`);
