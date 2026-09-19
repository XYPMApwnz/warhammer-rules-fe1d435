import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const contentRoot=path.dirname(fileURLToPath(import.meta.url));
const requiredProvenance=['sourceClass','sourceArtifact','sourceDate','overrides','confidence'];

function validateCoreCurrentOfficial(source){
  if(source.schema!=='wh40k-core-current-official/v1')throw new Error('Unknown current Core source schema');
  const ids=new Set();
  for(const update of [...source.ruleOverrides,...source.universalRulesUpdates]){
    const id=update.code||update.id;
    if(!id||ids.has(id))throw new Error(`Duplicate or missing current Core identity: ${id}`);
    ids.add(id);
    if(update.sourceClass!=='GW_CURRENT_OFFICIAL'||requiredProvenance.some(key=>!update[key]))throw new Error(`Incomplete official provenance: ${id}`);
    const url=new URL(update.sourceArtifact);
    if(url.protocol!=='https:'||!['www.warhammer-community.com','assets.warhammer-community.com'].includes(url.hostname))throw new Error(`Unaccepted current Core source: ${id}`);
    if(update.partition!=='ERRATA'&&update.partition!=='UNIVERSAL_RULE_UPDATE')throw new Error(`Unknown Core source partition: ${id}`);
  }
  return source;
}

export function loadCoreCurrentOfficial(root=contentRoot){
  return validateCoreCurrentOfficial(JSON.parse(fs.readFileSync(path.join(root,'core-rules.current-official.en.json'),'utf8')));
}

export function applyCoreCurrentOfficial(base,source=loadCoreCurrentOfficial()){
  validateCoreCurrentOfficial(source);
  const digital=structuredClone(base);
  const byCode=new Map(digital.records.map(record=>[record.code,record]));
  if(byCode.size!==digital.records.length)throw new Error('Duplicate base Core rule code');
  for(const update of source.ruleOverrides){
    const record=byCode.get(update.code);
    if(!record)throw new Error(`Official override has no Core rule: ${update.code}`);
    if(update.operation==='replace-line-by-prefix'||update.operation==='ensure-line-by-prefix'){
      if(typeof record.text!=='string'||!update.linePrefix||!update.currentLine)throw new Error(`Invalid text override: ${update.code}`);
      const lines=record.text.split('\n');
      const matches=lines.flatMap((line,index)=>line.startsWith(update.linePrefix)?[index]:[]);
      if(matches.length>1||(!matches.length&&update.operation==='replace-line-by-prefix'))throw new Error(`Ambiguous or missing official override anchor: ${update.code}`);
      if(matches.length)lines[matches[0]]=update.currentLine;
      else lines.push(update.currentLine);
      record.text=lines.join('\n');
    }else if(update.operation==='compatibility-alias'){
      if(record.title!==update.canonicalTitle||!Array.isArray(update.aliases)||!update.aliases.length)throw new Error(`Incorrect official Core compatibility identity: ${update.code}`);
      record.compatibilityAliases=[...new Set([...(record.compatibilityAliases||[]),...update.aliases])];
    }else throw new Error(`Unknown official Core override operation: ${update.code}`);
    record.currentOfficialOverride={partition:update.partition,sourceClass:update.sourceClass,sourceArtifact:update.sourceArtifact,sourceDate:update.sourceDate,overrides:update.overrides,confidence:update.confidence};
  }
  digital.universalRulesUpdates=structuredClone(source.universalRulesUpdates);
  return digital;
}
