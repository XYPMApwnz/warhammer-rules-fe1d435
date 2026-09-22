(function(){
  'use strict';

  const splitParts=value=>String(value||'')
    .replace(/\u0412(?=\u00b7)/g,'')
    .split(/\s*[\u00b7\u2022]\s*/)
    .map(part=>part.trim())
    .filter(Boolean);

  const normalize=value=>String(value||'')
    .replace(/[\[\]]/g,'')
    .replace(/[\u2018\u2019]/g,"'")
    .replace(/\s+/g,' ')
    .trim()
    .toUpperCase();

  function parseWeapon(summary){
    const parts=splitParts(summary);
    if(parts.length<6)return null;
    const values={};
    let mode='';
    let abilities=[];

    parts.forEach((part,index)=>{
      if(index===0&&/^(Ranged|Melee)$/i.test(part)){mode=part;return;}
      if(index===1&&mode&&!/^(?:Range|A|BS|WS|S|AP|D|Abilities?)\s+/i.test(part)){values.Range=part;return;}
      const match=part.match(/^(Range|A|BS|WS|S|AP|D|Abilities?)\s+(.+)$/i);
      if(!match)return;
      const label=match[1];
      const value=match[2].trim();
      if(/^Abilities?$/i.test(label))abilities=value.split(/\s*,\s*/).filter(Boolean);
      else values[label==='Range'?'Range':label.toUpperCase()]=value;
    });

    const skill=values.BS?'BS':values.WS?'WS':'';
    if(!values.Range||!values.A||!skill||!values.S||!values.AP||!values.D)return null;
    if(!mode)mode=values.Range.toLowerCase()==='melee'||skill==='WS'?'Melee':'Ranged';
    return{mode,abilities,stats:[['Range',values.Range],['A',values.A],[skill,values[skill]],['S',values.S],['AP',values.AP],['D',values.D]]};
  }

  function renderWeapon(profile){
    const wrap=document.createElement('div');wrap.className='popup-weapon-profile';
    const kind=document.createElement('div');kind.className='popup-profile-kind';kind.textContent=profile.mode.toUpperCase()+' WEAPON';
    const table=document.createElement('table');table.className='popup-weapon-table';table.setAttribute('aria-label',profile.mode+' weapon characteristics');
    const head=document.createElement('thead'),headRow=document.createElement('tr'),body=document.createElement('tbody'),bodyRow=document.createElement('tr');
    profile.stats.forEach(([label,value])=>{
      const th=document.createElement('th'),td=document.createElement('td');
      th.scope='col';th.textContent=label;td.textContent=value;headRow.append(th);bodyRow.append(td);
    });
    head.append(headRow);body.append(bodyRow);table.append(head,body);wrap.append(kind,table);

    if(profile.abilities.length){
      const row=document.createElement('div');row.className='popup-weapon-abilities';
      const label=document.createElement('span');label.className='popup-abilities-label';label.textContent='Abilities';
      const list=document.createElement('div');list.className='popup-ability-list';
      profile.abilities.forEach(ability=>{
        const chip=document.createElement('span');
        chip.className='popup-ability-chip';chip.textContent=ability;
        list.append(chip);
      });
      row.append(label,list);wrap.append(row);
    }
    return wrap;
  }

  function renderUnit(parts){
    if(parts.length<5||!parts.every(part=>/^(M|T|Sv|W|Ld|OC|Inv)\s+/i.test(part)))return null;
    const list=document.createElement('dl');list.className='popup-stats';list.setAttribute('aria-label','Unit characteristics');
    parts.forEach(part=>{
      const [label,...value]=part.split(/\s+/),stat=document.createElement('div'),name=document.createElement('dt'),score=document.createElement('dd');
      stat.className='popup-stat';name.textContent=label;score.textContent=value.join(' ');stat.append(name,score);list.append(stat);
    });
    return list;
  }

  function structuredWeapon(weapon){
    if(!weapon||typeof weapon!=='object')return null;
    const skill=weapon.BS!=null?'BS':weapon.WS!=null?'WS':'';
    if(weapon.Range==null||weapon.A==null||!skill||weapon.S==null||weapon.AP==null||weapon.D==null)return null;
    const abilities=Array.isArray(weapon.Abilities)?weapon.Abilities:String(weapon.Abilities||'').split(/\s*,\s*/).filter(Boolean);
    return{mode:String(weapon.Range).toLowerCase()==='melee'||skill==='WS'?'Melee':'Ranged',abilities,stats:[['Range',weapon.Range],['A',weapon.A],[skill,weapon[skill]],['S',weapon.S],['AP',weapon.AP],['D',weapon.D]]};
  }

  function structuredUnit(statline){
    if(!statline||typeof statline!=='object')return null;
    const parts=['M','T','Sv','W','Ld','OC','Inv'].filter(key=>statline[key]!=null).map(key=>`${key} ${statline[key]}`);
    return parts.length>=5?renderUnit(parts):null;
  }

  function render(term,terms){
    const weapon=structuredWeapon(term.structured?.weapon);
    if(weapon)return{node:renderWeapon(weapon),classes:['popup-profile','popup-weapon']};
    const unit=structuredUnit(term.structured?.statline);
    if(unit)return{node:unit,classes:['popup-profile','popup-statline']};
    const paragraph=document.createElement('p');paragraph.textContent=term.definition;
    return{node:paragraph,classes:[]};
  }

  window.WHPopupContent=Object.freeze({parseWeapon,structuredWeapon,render});
}());
