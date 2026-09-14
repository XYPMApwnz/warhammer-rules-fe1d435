(function(root){
  'use strict';
  const slug=value=>String(value||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const splitLabels=value=>{const labels=[];let depth=0,start=0,text=String(value||'');for(let index=0;index<text.length;index+=1){if(text[index]==='(')depth+=1;if(text[index]===')')depth=Math.max(0,depth-1);if(text[index]===','&&depth===0){labels.push(text.slice(start,index).trim());start=index+1;}}labels.push(text.slice(start).trim());return labels.filter(Boolean);};
  const unitLoadout=unit=>[unit?.wargear,...(unit?.models||[]).flatMap(model=>[model.wargear,...(model.loadouts||[]).map(loadout=>loadout.wargear)])].filter(Boolean);
  const unitRows=unit=>unit?.models?.length?unit.models.flatMap(model=>model.loadouts?.length?model.loadouts.map(loadout=>[loadout.quantity,model.name,loadout.wargear]):[[model.quantity,model.name,model.wargear]]):[[unit?.quantity,unit?.name,unit?.wargear]];
  const unitModelCount=unit=>unitRows(unit).reduce((total,row)=>total+(Number(row[0])||0),0);
  const hasWargear=(unit,label)=>unitLoadout(unit).flatMap(splitLabels).some(item=>normalize(item).replace(/^\d+\s*x?\s+/,'')===normalize(label));
  const effectRows=effect=>effect.targetId==='all'?'':effect.targetId;
  const createContext=({roster,attachments={},terms={}})=>{
    const stateKey=unit=>JSON.stringify({unit,attachments,enhancements:(roster?.enhancements||[]).filter(item=>item.ownerUnitId===unit?.id)});
    const projectEffects=(unit,cardId,detachmentIds=[],gameUnit=null)=>{
      if(!gameUnit||!root.WHEffectContractRuntime)return[];
      const projection=root.WH_ARMY_ROSTER_GAME_PROJECTION,gameUnits=projection?.units||[gameUnit],byInstance=new Map(gameUnits.map(item=>[item.identity.instanceId,item]));
      return root.WHEffectContractRuntime.project({gameUnit,gameUnits,byInstance,detachments:detachmentIds.map(id=>({id})),enhancements:root.WH_ARMY_ROSTER_PROJECTION?.enhancements||[]});
    };
    const decorate=(card,units,detachmentIds,projectedEffects=[],applyProjectedEffects=false)=>{
      if(!applyProjectedEffects||!Array.isArray(projectedEffects))return;
      const modelStat=(target,value,effect,operation)=>{const item=[...card.querySelectorAll?.('.stat')||[]].find(row=>normalize(row.querySelector('b')?.textContent)===normalize(target)),node=item?.querySelector('span');if(!node)return;const current=Number.parseInt(node.textContent,10);node.dataset.rosterDerivedEffect=effect;node.textContent=operation==='add'&&Number.isFinite(current)?String(current+Number(value)).replace(/(?=\+$)/,''):String(value);};
      const weaponRows=scope=>[...card.querySelectorAll?.('.weapon-row')||[]].filter(row=>!scope||scope==='all'||row.closest('.weapon-block')?.classList.contains(scope));
      for(const effect of projectedEffects){
        if(effect.state==='conditional'||effect.certainty==='unknown')continue;
        if(effect.component==='stat')modelStat(effect.targetId,effect.operation==='add'?effect.delta:effect.to,effect.id,effect.operation);
        if(effect.component==='ability'&&effect.operation==='grant'){const host=card.querySelector?.('[id$="-abilities"] .ability-list');if(host&&!host.querySelector(`[data-roster-derived-effect="${effect.id}"]`)){const article=document.createElement('article'),heading=document.createElement('h5'),line=document.createElement('p');article.className='ability roster-enhanced-ability';article.dataset.rosterDerivedEffect=effect.id;heading.textContent=effect.title||effect.targetId;line.textContent=effect.summary||'';article.append(heading,line);host.append(article);}}
        if(effect.component==='weapon')for(const row of weaponRows(effectRows(effect))){const head=row.parentElement?.querySelector('.weapon-head'),columns=[...(head?.children||[])];if(effect.operation==='grant-tag'){const host=row.querySelector('.weapon-tags');if(host&&![...host.children].some(item=>normalize(item.textContent)===normalize(effect.tag))){const tag=document.createElement('button');tag.type='button';tag.className='tag roster-modified-value';tag.dataset.rosterDerivedEffect=effect.id;tag.textContent=effect.tag;host.append(tag);}}else if(effect.operation==='add-stat'){const index=columns.findIndex(item=>normalize(item.textContent)===normalize(effect.stat)),cell=index>=0?row.children[index]:null,match=cell?.textContent.trim().match(/^(-?\d+)(.*)$/);if(match){cell.dataset.rosterDerivedEffect=effect.id;cell.textContent=`${Number(match[1])+Number(effect.delta)}${match[2]}`;}}}
      }
    };
    return Object.freeze({stateKey,projectEffects,decorate,hasWargear});
  };
  root.DGRosterSemantics=Object.freeze({slug,normalize,splitLabels,unitLoadout,unitRows,unitModelCount,hasWargear,createContext});
}(window));
