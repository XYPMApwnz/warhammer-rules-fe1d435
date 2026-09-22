import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {recordText} from './record-content.mjs';
import {applyCoreCurrentOfficial} from './core-current-official.mjs';

const coreRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const defaultRepoRoot=path.resolve(coreRoot,'..','..');
const loadWindow=file=>{const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});return sandbox.window;};
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const slug=value=>String(value).toLowerCase().replace(/[‘’']/g,'').replace(/\[[^\]]+\]/g,match=>match.slice(1,-1)).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const normalTitle=value=>slug(value).replace(/-+/g,'-');
const clean=value=>String(value||'').replace(/\be\.g\./gi,match=>match[0][0]==='E'?'For example':'for example').replace(/\r/g,'').replace(/\n-\n/g,'-').replace(/[ \t]*\n[ \t]*/g,' ').replace(/([A-Za-z])\s+-\s+([A-Za-z])/g,'$1-$2').replace(/\s*▪\s*/g,'\n• ').replace(/[ \t]{2,}/g,' ').trim();
const cleanRuleText=value=>String(value||'').replace(/\be\.g\./gi,match=>match[0][0]==='E'?'For example':'for example').replace(/\r/g,'').split('\n').map(line=>line.replace(/[ \t]{2,}/g,' ').trim()).filter(Boolean).join('\n');
const concise=(value,max=280)=>{const text=clean(value).replace(/\s+/g,' ').trim();if(text.length<=max)return text;const slice=text.slice(0,max-1),sentence=Math.max(slice.lastIndexOf('. '),slice.lastIndexOf('; '),slice.lastIndexOf(': ')),end=sentence>=120?sentence+1:slice.lastIndexOf(' ');return `${slice.slice(0,end>0?end:max-1).trim()}…`;};
const escapeRegExp=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

export const CORE_GLOSSARY_EXCLUDED_CODES=new Set(['03.03.01']);
export const DIGITAL_CANONICAL_CORE_IDS=Object.freeze({'05.04.04':'core-destroyed','09.02.03':'core-reinforcements-step','15.08':'core-stratagem-fire-overwatch'});
export const DIGITAL_CORE_TITLE_OVERRIDES=Object.freeze({'24.37.01':'Torrent Restrictions'});
export const canonicalCoreRuleId=rule=>rule.code.startsWith('24.')?`core-${slug(rule.title)}`:`core-rule-${rule.code.replace('.','-')}-${slug(rule.title)}`;

export function createCoreFactProjection({repoRoot=defaultRepoRoot}={}){
  const contentRoot=path.join(repoRoot,'books','core-rules','content');
  const coreData=loadWindow(path.join(contentRoot,'core-rules.en.js')).CORE_RULES;
  const coreSource=loadWindow(path.join(contentRoot,'core-rules.source.en.js')).CORE_PDF_SOURCE;
  const coreDigital=applyCoreCurrentOfficial(readJson(path.join(contentRoot,'core-rules.digital-11e.json')));
  const coreRules=[];
  for(const [sectionId,rules] of Object.entries(coreSource.rules))for(const rule of rules)coreRules.push({...rule,sectionId});
  const coreByTitle=new Map(coreRules.map(rule=>[normalTitle(rule.title),rule]));
  const coreIdByCode=new Map(coreRules.map(rule=>[rule.code,canonicalCoreRuleId(rule)]));
  const digitalCoreId=rule=>DIGITAL_CANONICAL_CORE_IDS[rule.code]||coreIdByCode.get(rule.code)||`core-rule-${rule.code.replaceAll('.','-')}-${slug(rule.title)}`;
  const digitalTitle=rule=>DIGITAL_CORE_TITLE_OVERRIDES[rule.code]||rule.title.replace(/^\d+\.\s*/, '');
  const coreSections=[coreData.introduction,...coreData.groups.flatMap(group=>group.sections)];
  const coreSectionByNumber=new Map(coreSections.filter(section=>section.number).map(section=>[section.number.padStart(2,'0'),section.id]));
  const terms=new Map(),aliases={};
  for(const rule of coreRules){
    const id=canonicalCoreRuleId(rule);
    terms.set(id,{id,code:rule.code,kind:rule.code.startsWith('24.')?'core-ability':'core-rule',title:rule.title.replace(/^\[|\]$/g,''),summary:concise(recordText(rule)),definition:clean(recordText(rule)),aliases:[],canonicalSource:{documentId:'core-rules',revision:'11e',locator:`${rule.code}; page ${rule.page}`}});
  }
  for(const rule of coreDigital.records){
    if(CORE_GLOSSARY_EXCLUDED_CODES.has(rule.code))continue;
    const id=digitalCoreId(rule);
    if(!terms.has(id))terms.set(id,{id,code:rule.code,kind:rule.kind==='stratagem'?'stratagem':rule.code.startsWith('24.')?'core-ability':'core-rule',title:digitalTitle(rule),summary:concise(recordText(rule)),definition:clean(recordText(rule)),aliases:[],canonicalSource:{documentId:'core-rules',revision:'11e',locator:rule.code}});
  }
  for(const [localId,entry] of Object.entries(coreData.terms)){
    const match=coreByTitle.get(normalTitle(entry.title)),id=match?canonicalCoreRuleId(match):`core-${slug(entry.title)}`;
    if(!terms.has(id))terms.set(id,{id,kind:'core-concept',title:entry.title,summary:concise(entry.summary),definition:clean(entry.summary),aliases:[],canonicalSource:{documentId:'core-rules',revision:'11e',locator:entry.rule}});
    aliases[localId]=id;terms.get(id).summary=concise(entry.summary);
  }
  // Bodyguard is owned by the accepted Forming Attached Units rule. Preserve
  // its established public identity without feeding glossary content back
  // into canonical Army Book construction.
  if(!terms.has('core-bodyguard')){
    const owner=coreDigital.records.find(rule=>rule.code==='19.01');
    if(!owner)throw new Error('Missing accepted Core Bodyguard owner: 19.01');
    terms.set('core-bodyguard',{id:'core-bodyguard',code:owner.code,kind:'core-concept',title:'Bodyguard',summary:concise(recordText(owner)),definition:cleanRuleText(recordText(owner)),aliases:[],canonicalSource:{documentId:'core-rules',revision:'11e',locator:owner.code}});
  }
  for(const rule of coreDigital.records){
    if(CORE_GLOSSARY_EXCLUDED_CODES.has(rule.code))continue;
    const term=terms.get(digitalCoreId(rule));if(!term)throw new Error(`Missing canonical Core fact ${rule.code}`);
    term.code=rule.code;term.title=digitalTitle(rule);term.kind=rule.kind==='stratagem'?'stratagem':rule.code.startsWith('24.')?'core-ability':'core-rule';
    const text=recordText(rule),definition=rule.code==='03.03'?text.split('\nWHAT IS COHERENCY?')[0]:text;
    term.definition=cleanRuleText(definition);term.summary=concise(text);
    term.canonicalSource={documentId:'core-rules',revision:'11e',locator:rule.code};
    const section=coreSectionByNumber.get(rule.code.slice(0,2));if(section)term.fullRulePath=`books/core-rules/reader/${section}.html#rule-${slug(rule.code)}`;
  }
  for(const rule of coreDigital.records){
    if(CORE_GLOSSARY_EXCLUDED_CODES.has(rule.code))continue;
    const target=digitalCoreId(rule);
    for(const alias of rule.compatibilityAliases||[]){
      const key=slug(alias);
      if(key&&key!==target)aliases[key]=target;
    }
  }
  const coreTermsByCode=new Map([...terms.values()].filter(term=>term.code).map(term=>[term.code,term]));
  const coreCodes=[...coreTermsByCode.keys()].sort((left,right)=>right.length-left.length||left.localeCompare(right));
  const sectionReferences=new Map([
    ['16.00',{label:'Actions',term:coreTermsByCode.get('16.01')}],
    ['23.00',{label:'Aircraft',term:terms.get('keyword-aircraft')}],
    ['17.00',{label:'Monsters and Vehicles',term:coreTermsByCode.get('17.01')}],
    ['20.00',{label:'Strategic Reserves',term:terms.get('core-strategic-reserves')}],
    ['18.00',{label:'Transports',term:coreTermsByCode.get('18.01')}]
  ]);
  const humanizeCoreReferences=value=>{
    let text=clean(value);
    for(const code of coreCodes){
      const title=coreTermsByCode.get(code)?.title;if(!title)continue;
      const codePattern=escapeRegExp(code),titlePattern=escapeRegExp(title);
      text=text
        .replace(new RegExp(`\\[?(${titlePattern})\\]?(\\s+rule)?\\s*\\(${codePattern}\\)`,'gi'),'$1$2')
        .replace(new RegExp(`\\[?(${titlePattern})\\]?\\s+${codePattern}(?=$|[^0-9])`,'gi'),'$1')
        .replace(new RegExp(`\\(${codePattern}\\)`,'g'),title)
        .replace(new RegExp(`(^|[^0-9.])${codePattern}(?=$|[^0-9.])`,'g'),(_,prefix)=>`${prefix}${title}`);
    }
    for(const [code,{label}] of sectionReferences){
      const codePattern=escapeRegExp(code),labelPattern=escapeRegExp(label);
      text=text
        .replace(new RegExp(`(${labelPattern})\\s+${codePattern}(?=$|[^0-9])`,'gi'),'$1')
        .replace(new RegExp(`(^|[^0-9.])${codePattern}(?=$|[^0-9.])`,'g'),(_,prefix)=>`${prefix}${label}`);
    }
    return text.replace(/\s*\((?:03|04|05|15|16|24)\)/g,'').replace(/\bRevived Revived and Adding Models to a Unit\b/g,'Revived and Adding Models to a Unit');
  };
  for(const term of terms.values()){
    if(term.summary)term.summary=concise(humanizeCoreReferences(term.summary));
    if(term.definition)term.definition=humanizeCoreReferences(term.definition);
  }
  for(const term of terms.values())term.aliases=Object.entries(aliases).filter(([,target])=>target===term.id).map(([alias])=>alias).filter(alias=>alias!==term.id).sort();
  const coreAbilities=[...terms.values()].filter(term=>term.kind==='core-ability').sort((left,right)=>left.id.localeCompare(right.id));
  const abilityIdentityTerms=[...coreAbilities,...['core-attached-unit','core-bodyguard'].map(id=>terms.get(id)).filter(Boolean)].sort((left,right)=>left.id.localeCompare(right.id));
  return Object.freeze({terms:Object.freeze([...terms.values()].map(term=>Object.freeze(term))),coreAbilities:Object.freeze(coreAbilities),abilityIdentityTerms:Object.freeze(abilityIdentityTerms),aliases:Object.freeze(aliases),coreRules:Object.freeze(coreRules),coreDigital,coreUniversalUpdates:Object.freeze(coreDigital.universalRulesUpdates),coreData,coreSource,coreByTitle,coreIdByCode,digitalCoreId,digitalTitle,coreSectionByNumber});
}
