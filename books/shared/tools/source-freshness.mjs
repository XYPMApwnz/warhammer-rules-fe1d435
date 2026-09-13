import {readSourceRegistry,verifyFrozenSource} from './source-ingestion-contract.mjs';

const registry=readSourceRegistry();
const rows=[];
for(const source of registry.sources){
  const verified=verifyFrozenSource(source.sourceId);
  rows.push({
    BOOK:source.book,SOURCE_ID:source.sourceId,AUTHORITY:source.authority,
    CURRENT_ACCEPTED_REVISION:source.acceptedRevision,CURRENT_ACCEPTED_HASH:source.acceptedHash||verified.aggregateArtifactHash,
    REPRODUCIBLE:source.reproducible,LAST_CHECKED:source.lastChecked,
    UPSTREAM_UPDATE_KNOWN:Boolean(source.upstreamUpdateKnown),STATUS:source.status,NOTES:source.notes
  });
}
if(process.argv.includes('--json'))console.log(JSON.stringify(rows,null,2));
else for(const row of rows)console.log(`${row.BOOK}\t${row.SOURCE_ID}\t${row.STATUS}\t${row.CURRENT_ACCEPTED_REVISION}\t${row.REPRODUCIBLE}`);
