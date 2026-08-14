const STORAGE_KEY='wh40k-rosters-v1';
const CORRUPT_BACKUP_KEY='wh40k-rosters-v1-corrupt-backup';
const KNOWN_FACTIONS=new Set(['death guard','adeptus mechanicus','tyranids','t au empire','emperor s children','chaos space marines','space marines','blood angels','dark angels']);
const FACTION_ALIASES=Object.freeze({'tau empire':'t au empire'});
const FACTION_PARENTS=Object.freeze({'death guard':'chaos','adeptus mechanicus':'imperium','tyranids':'xenos','t au empire':'xenos','emperor s children':'chaos','chaos space marines':'chaos','space marines':'imperium','blood angels':'imperium','dark angels':'imperium'});
const FACTION_LABELS=Object.freeze({'death guard':'Death Guard','adeptus mechanicus':'Adeptus Mechanicus','tyranids':'Tyranids','t au empire':"T'au Empire",'emperor s children':"Emperor's Children",'chaos space marines':'Chaos Space Marines','space marines':'Space Marines','blood angels':'Blood Angels','dark angels':'Dark Angels'});
const FACTION_READERS=Object.freeze({'death guard':'../books/death-guard/index.html','adeptus mechanicus':'../books/adeptus-mechanicus/index.html','tyranids':'../books/tyranids/index.html','t au empire':'../books/tau-empire/index.html','emperor s children':"../books/emperors-children/index.html",'chaos space marines':'../books/chaos-space-marines/index.html','space marines':'../books/space-marines/index.html','blood angels':'../books/blood-angels/index.html','dark angels':'../books/dark-angels/index.html'});
const savedHost=document.querySelector('#saved-roster-list');

function factionParts(value){const match=String(value||'').trim().match(/^(?:(Chaos|Imperium|Xenos)\s*[-–—]\s*)?(.*)$/i),key=match[2].replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase();return{parent:(match[1]||'').toLowerCase(),key:FACTION_ALIASES[key]||key};}
function normalizeFaction(value){return factionParts(value).key;}
function knownFaction(value){const{parent,key}=factionParts(value);return KNOWN_FACTIONS.has(key)&&(!parent||FACTION_PARENTS[key]===parent)?key:'';}
function pointsLabel(value){return ['adeptus mechanicus','tyranids','t au empire','chaos space marines','space marines','blood angels','dark angels'].includes(knownFaction(value))?'Official MFM total':'Army Book total';}
function getSavedRosters(){
  try{const records=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(records)?records:[];}
  catch{return [];}
}
function putSavedRosters(records){
  const raw=localStorage.getItem(STORAGE_KEY);
  if(raw!==null){
    try{if(!Array.isArray(JSON.parse(raw)))throw new Error();}
    catch{if(localStorage.getItem(CORRUPT_BACKUP_KEY)===null)localStorage.setItem(CORRUPT_BACKUP_KEY,raw);}
  }
  localStorage.setItem(STORAGE_KEY,JSON.stringify(records));
}
function isDisplayable(record){return Boolean(record?.id&&record?.name&&Array.isArray(record?.roster?.units));}
function isImportableRecord(record){
  return Boolean(
    typeof record?.id==='string'&&record.id.trim()&&
    typeof record?.name==='string'&&record.name.trim()&&
    typeof record?.sourceText==='string'&&
    knownFaction(record?.roster?.faction)&&
    Array.isArray(record.roster.units)&&record.roster.units.length&&
    record.roster.units.every(unit=>unit&&typeof unit.name==='string'&&Number.isFinite(unit.points)&&
      (unit.models===undefined||Array.isArray(unit.models))&&
      (unit.models||[]).every(model=>model&&typeof model.name==='string'&&(model.loadouts===undefined||Array.isArray(model.loadouts))))&&
    (record.roster.detachments===undefined||Array.isArray(record.roster.detachments))
  );
}
function escapeHtml(value){const node=document.createElement('span');node.textContent=String(value??'');return node.innerHTML;}
function rosterId(text){let hash=2166136261;for(const char of text)hash=Math.imul(hash^char.charCodeAt(0),16777619);return `roster-${(hash>>>0).toString(36)}`;}
function recordDetachments(record){const items=Array.isArray(record.roster.detachments)?record.roster.detachments:[{label:record.roster.detachment}];return items.map(item=>item?.label).filter(Boolean).join(' + ');}
function updatedLabel(value){const date=new Date(value);return Number.isFinite(date.getTime())?new Intl.DateTimeFormat('en-GB').format(date):'date unknown';}
function readerAction(record){const id=escapeHtml(record.id),faction=knownFaction(record?.roster?.faction);return faction&&FACTION_READERS[faction]?`<button class="action primary" type="button" data-open-roster="${id}">Open</button>`:'<button class="action" type="button" disabled>Reader unavailable</button>';}
function freshRoster(record){
  const parsed=record?.sourceText?window.WHRosterParser.parse(record.sourceText):null;
  const roster=parsed?.units?.length?parsed:record?.roster;
  if(!roster)return null;
  const faction=knownFaction(roster.faction);
  roster.faction=FACTION_LABELS[faction]||roster.faction;
  roster.pointsCheck=window.WHRosterPoints.check(roster,faction);
  return roster;
}

function deathGuardUnitDefinition(unit){
  return window.WH_POINTS_CATALOG?.['death guard']?.units?.[window.WHRosterPoints.normalize(unit?.name)]||null;
}
function deathGuardAttachmentContract(bodyguard,character){
  const bodyguardDefinition=deathGuardUnitDefinition(bodyguard),characterDefinition=deathGuardUnitDefinition(character);
  if(!bodyguardDefinition||!characterDefinition||!characterDefinition.keywords?.includes('CHARACTER'))return null;
  const forward=[...(characterDefinition.relations?.canLead||[]),...(characterDefinition.relations?.canSupport||[])].find(item=>item.unitId===bodyguardDefinition.unitId);
  const reverse=[...(bodyguardDefinition.relations?.canBeLedBy||[]),...(bodyguardDefinition.relations?.canBeSupportedBy||[])].find(item=>item.unitId===characterDefinition.unitId);
  return forward&&reverse?{bodyguardUnitId:bodyguardDefinition.unitId,characterUnitId:characterDefinition.unitId,maxCharacters:Math.max(1,Number(forward.maxCharacters||reverse.maxCharacters||1))}:null;
}
function sanitizeDeathGuardAttachments(roster,raw){
  if(knownFaction(roster?.faction)!=='death guard'||!raw||typeof raw!=='object'||Array.isArray(raw))return{};
  const units=new Map(roster.units.map(unit=>[unit.id,unit])),usedCharacters=new Set(),result={};
  for(const [bodyguardId,characterIds] of Object.entries(raw)){
    const bodyguard=units.get(bodyguardId);if(!bodyguard||!Array.isArray(characterIds))continue;
    const selectedTypes=new Set(),accepted=[];
    for(const characterId of characterIds){
      const character=units.get(characterId),contract=deathGuardAttachmentContract(bodyguard,character);
      if(!contract||usedCharacters.has(characterId)||selectedTypes.has(contract.characterUnitId)||accepted.length>=contract.maxCharacters)continue;
      accepted.push(characterId);usedCharacters.add(characterId);selectedTypes.add(contract.characterUnitId);
    }
    if(accepted.length)result[bodyguardId]=accepted;
  }
  return result;
}
function deathGuardInstanceLabels(roster){
  const totals=new Map(),seen=new Map(),labels=new Map();
  roster.units.forEach(unit=>{const key=window.WHRosterPoints.normalize(unit.name);totals.set(key,(totals.get(key)||0)+1);});
  roster.units.forEach(unit=>{const key=window.WHRosterPoints.normalize(unit.name),index=(seen.get(key)||0)+1;seen.set(key,index);labels.set(unit.id,totals.get(key)>1?`${unit.name} #${index}`:unit.name);});
  return labels;
}
function persistDeathGuardAttachments(record,roster,attachments){
  const records=getSavedRosters(),stored=records.find(item=>item?.id===record.id);if(!stored)return;
  stored.attachments=sanitizeDeathGuardAttachments(roster,attachments);stored.updatedAt=new Date().toISOString();
  putSavedRosters(records);renderSavedRosters();renderRoster(roster,stored);
}
function mountDeathGuardAttachments(roster,record){
  if(knownFaction(roster.faction)!=='death guard')return;
  const attachments=sanitizeDeathGuardAttachments(roster,record.attachments),labels=deathGuardInstanceLabels(roster),assignedGlobally=new Set(Object.values(attachments).flat());
  for(const bodyguard of roster.units){
    const compatible=roster.units.filter(character=>character.id!==bodyguard.id&&deathGuardAttachmentContract(bodyguard,character));
    if(!compatible.length)continue;
    const row=document.querySelector(`[data-roster-unit-id="${CSS.escape(bodyguard.id)}"]`);if(!row)continue;
    const assigned=attachments[bodyguard.id]||[],assignedTypes=new Set(assigned.map(id=>deathGuardUnitDefinition(roster.units.find(unit=>unit.id===id))?.unitId).filter(Boolean));
    const limit=Math.max(...compatible.map(character=>deathGuardAttachmentContract(bodyguard,character)?.maxCharacters||1));
    const available=compatible.filter(character=>!assignedGlobally.has(character.id)&&!assignedTypes.has(deathGuardUnitDefinition(character)?.unitId));
    const panel=document.createElement('div');panel.className='attachment-editor';panel.dataset.bodyguardUnitId=bodyguard.id;
    const heading=document.createElement('strong');heading.textContent=`Attached Characters · ${labels.get(bodyguard.id)}`;panel.append(heading);
    if(assigned.length){
      const list=document.createElement('ul');list.className='attachment-list';
      assigned.forEach(characterId=>{const item=document.createElement('li'),name=document.createElement('span'),remove=document.createElement('button');name.textContent=labels.get(characterId)||characterId;remove.type='button';remove.className='action';remove.dataset.detachCharacter=characterId;remove.textContent='Remove';item.append(name,remove);list.append(item);});
      panel.append(list);
    }
    if(assigned.length<limit&&available.length){
      const controls=document.createElement('div');controls.className='attachment-controls';
      const select=document.createElement('select');select.setAttribute('aria-label',`Character for ${labels.get(bodyguard.id)}`);select.dataset.attachmentChoice='';
      available.forEach(character=>{const option=document.createElement('option');option.value=character.id;option.textContent=labels.get(character.id);select.append(option);});
      const add=document.createElement('button');add.type='button';add.className='action';add.dataset.attachCharacter='';add.textContent='+ Add Character';controls.append(select,add);panel.append(controls);
    }else if(!available.length&&assigned.length<limit){const empty=document.createElement('small');empty.className='help';empty.textContent='No compatible unassigned Characters available.';panel.append(empty);}
    panel.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button)return;
      const next=structuredClone(attachments);
      if(button.hasAttribute('data-attach-character')){const characterId=panel.querySelector('[data-attachment-choice]')?.value;if(!characterId)return;(next[bodyguard.id]||=[]).push(characterId);}
      if(button.dataset.detachCharacter){next[bodyguard.id]=(next[bodyguard.id]||[]).filter(id=>id!==button.dataset.detachCharacter);if(!next[bodyguard.id].length)delete next[bodyguard.id];}
      persistDeathGuardAttachments(record,roster,next);
    });
    row.append(panel);
  }
}

function saveRoster(roster,sourceText){
  const records=getSavedRosters(),id=rosterId(sourceText),previous=records.find(record=>record?.id===id);
  const record={id,name:`${roster.faction} · ${roster.declared||roster.calculated} pts`,createdAt:previous?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),sourceText,roster,attachments:sanitizeDeathGuardAttachments(roster,previous?.attachments)};
  putSavedRosters([record,...records.filter(item=>item?.id!==id)]);
  navigator.storage?.persist?.();
  renderSavedRosters();
  return record;
}

function openSavedRoster(id){
  const record=getSavedRosters().find(item=>item?.id===id);
  if(!record){alert('Saved roster not found.');return;}
  const faction=knownFaction(freshRoster(record)?.faction);
  if(!faction){alert('The saved roster faction is not recognised. The record was not changed.');return;}
  const reader=FACTION_READERS[faction];
  if(!reader){alert(`${FACTION_LABELS[faction]} was saved, but a personal reader is not available yet.`);return;}
  location.href=`${reader}?roster=${encodeURIComponent(id)}`;
}

function exportRoster(id){
  const record=getSavedRosters().find(item=>item?.id===id);
  if(!record)return;
  const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=`${record.id}.json`;link.click();URL.revokeObjectURL(url);
}

function renderSavedRosters(){
  const records=getSavedRosters().filter(isDisplayable);
  if(!records.length){savedHost.innerHTML='<div class="empty">No saved rosters yet. Create a guide below or import a backup.</div>';return;}
  savedHost.innerHTML=`<div class="saved-grid">${records.map(record=>{const roster=freshRoster(record)||record.roster;return `<article class="saved-card"><p class="eyebrow">${escapeHtml(recordDetachments({...record,roster}))}</p><h3>${escapeHtml(record.name)}</h3><p>${roster.units.length} units · updated ${updatedLabel(record.updatedAt)}</p><div class="actions">${readerAction({...record,roster})}<button class="action" type="button" data-export-roster="${escapeHtml(record.id)}">Export</button><button class="action" type="button" data-delete-roster="${escapeHtml(record.id)}">Delete</button></div></article>`}).join('')}</div>`;
}

function parseRoster(text){
  return window.WHRosterParser.parse(text);
}

function renderRoster(roster,record){
  const check=roster.pointsCheck;
  const currentPointsLabel=pointsLabel(roster.faction);
  const complete=check&&check.total!==null&&!check.unresolved.length;
  const matches=complete&&check.difference===0;
  const exportStatus=roster.exportMatches
    ?'<div class="status">✓ Export unit lines match the declared total.</div>'
    :`<div class="status warn">! Export arithmetic warning: unit lines total ${roster.unitLineTotal} pts, but the export declares ${roster.declared} pts.</div>`;
  const pointsStatus=!check||check.total===null
    ?`<div class="status warn">! ${currentPointsLabel} data is unavailable. The roster was still saved.</div>`
    :check.unresolved.length
      ?`<div class="status warn">! ${currentPointsLabel} validation is incomplete. The roster was still saved.<br>${check.unresolved.map(escapeHtml).join('<br>')}</div>`
      :matches
        ?`<div class="status">✓ The ${currentPointsLabel} matches the exported total.</div>`
        :`<div class="status warn">! Points warning: the export declares ${roster.declared} pts, but the ${currentPointsLabel} is ${check.total} pts (${check.difference>0?'+':''}${check.difference}). The roster was still saved.</div>`;
  let enhancementStatus=check?.enhancementWarnings?.length
    ?`<div class="status warn">! Enhancement legality warnings. The roster was still saved.<br>${check.enhancementWarnings.map(escapeHtml).join('<br>')}</div>`
    :check?`<div class="status">✓ Enhancement owners checked · ${check.enhancementChoices} choices · ${check.enhancementAssignments} assignments.</div>`:'';
  const detachmentStatus=check?.detachmentWarnings?.length
    ?`<div class="status warn">! Detachment Points legality warning. The roster was still saved.<br>${check.detachmentWarnings.map(escapeHtml).join('<br>')}</div>`
    :Number.isFinite(check?.detachmentPointLimit)
      ?`<div class="status">✓ Detachment Points checked · ${check.detachmentPoints}/${check.detachmentPointLimit} DP.</div>`
      :check?'<div class="status warn">! Detachment Points were not checked because Battle Size is unavailable.</div>':'';
  enhancementStatus=detachmentStatus+enhancementStatus;
  const hasReader=Boolean(FACTION_READERS[knownFaction(roster.faction)]);
  document.querySelector('#roster-result').innerHTML=`<p class="eyebrow">Preview // ${roster.units.length} units</p><h2>${escapeHtml(roster.faction)}</h2><p class="help">${escapeHtml((roster.detachments||[{label:roster.detachment}]).map(item=>item.label).join(' + '))} · ${escapeHtml(roster.disposition)}</p><div class="summary"><div class="stat"><small>Declared in export</small><strong>${roster.declared||'—'} pts</strong></div><div class="stat"><small>${currentPointsLabel}</small><strong>${check?.total??'—'} pts</strong></div></div>${exportStatus}${pointsStatus}${enhancementStatus}<p class="help">Unit limits and wargear legality are not checked.</p><ul class="units">${roster.units.map(unit=>{const owned=(check?.enhancements||[]).filter(item=>item.ownerUnitId===unit.id);return `<li data-roster-unit-id="${escapeHtml(unit.id)}"><strong>${escapeHtml(unit.name)}${owned.map(item=>{const exported=Number(item.exportedCost),current=Number(item.currentCost),price=Number.isFinite(exported)&&Number.isFinite(current)&&exported!==current?`${exported} pts in export · ${current} pts current`:`included +${item.exportedCost??item.currentCost} pts`;return `<small class="unit-enhancement">${escapeHtml(item.name)} · ${price}${item.ownerEligibility!=='valid'?` · ${escapeHtml(item.ownerMessage)}`:''}</small>`;}).join('')}</strong><span>${unit.points} pts in export</span></li>`}).join('')}</ul><div class="actions">${hasReader?'<button class="action primary" id="open-guide" type="button">Open personal guide</button>':'<p class="help">Saved. A personal reader is not available for this faction yet.</p>'}</div>`;
  mountDeathGuardAttachments(roster,record);
  if(!hasReader)return;
  document.querySelector('#open-guide').addEventListener('click',()=>openSavedRoster(record.id));
}

document.querySelector('#roster-form').addEventListener('submit',event=>{
  event.preventDefault();setTimeout(()=>document.querySelector('#roster-result').scrollIntoView({behavior:'smooth',block:'start'}),0);const input=document.querySelector('#roster-input'),roster=parseRoster(input.value);
  if(!roster.units.length){document.querySelector('#roster-result').innerHTML='<p class="eyebrow">Import error</p><h2>No units found</h2><p class="help">Paste a New Recruit export containing entries such as “1x Unit (100 pts)”.</p>';return;}
  const faction=knownFaction(roster.faction);
  if(!faction){document.querySelector('#roster-result').innerHTML=roster.faction?`<p class="eyebrow">Unknown faction</p><h2>${escapeHtml(roster.faction)}</h2><p class="help">This faction is not recognised. The roster was not saved.</p>`:'<p class="eyebrow">Import error</p><h2>Faction not found</h2><p class="help">The export has no FACTION KEYWORD line. The roster was not saved.</p>';return;}
  roster.faction=FACTION_LABELS[faction];
  roster.pointsCheck=window.WHRosterPoints.check(roster,faction);
  const record=saveRoster(roster,input.value);renderRoster(roster,record);
});
document.querySelector('#roster-clear').addEventListener('click',()=>{document.querySelector('#roster-form').reset();document.querySelector('#roster-result').innerHTML='<p class="eyebrow">Preview</p><h2>No roster loaded</h2><p class="help">The faction, Detachment, export total check and recognised units will appear here.</p>';document.querySelector('#roster-input').focus();});
savedHost.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.openRoster)openSavedRoster(button.dataset.openRoster);if(button.dataset.exportRoster)exportRoster(button.dataset.exportRoster);if(button.dataset.deleteRoster&&confirm('Delete this roster from this device?')){putSavedRosters(getSavedRosters().filter(record=>record?.id!==button.dataset.deleteRoster));renderSavedRosters();}});
document.querySelector('#import-roster').addEventListener('click',()=>document.querySelector('#import-roster-file').click());
document.querySelector('#import-roster-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{const record=JSON.parse(await file.text());if(!isImportableRecord(record))throw new Error();const parsed=window.WHRosterParser.parse(record.sourceText);if(parsed.units.length)record.roster=parsed;const faction=knownFaction(record.roster.faction),records=getSavedRosters();if(!faction)throw new Error();record.roster.faction=FACTION_LABELS[faction];record.roster.pointsCheck=window.WHRosterPoints.check(record.roster,faction);record.attachments=sanitizeDeathGuardAttachments(record.roster,record.attachments);putSavedRosters([{...record,updatedAt:new Date().toISOString()},...records.filter(item=>item?.id!==record.id)]);renderSavedRosters();if(!FACTION_READERS[faction])alert(`${FACTION_LABELS[faction]} was imported, but a personal reader is not available yet.`);}catch{alert('Could not import the roster backup.');}event.target.value='';});

renderSavedRosters();
const requestedRoster=new URLSearchParams(location.search).get('roster');
if(requestedRoster)openSavedRoster(requestedRoster);
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('../service-worker.js'));
