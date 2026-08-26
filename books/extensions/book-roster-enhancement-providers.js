(function(root){
  'use strict';
  const normalize=value=>root.WHRosterParser?.normalize(value)||String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const catalog=()=>root.WH_BOOK_ROSTER_ENHANCEMENTS||{};
  const tauBook=()=>root.document?.documentElement?.dataset.bookId==='tau-empire'||/\/books\/tau-empire\//.test(root.location?.pathname||'');
  const ecBook=()=>root.document?.documentElement?.dataset.bookId==='emperors-children'||/\/books\/emperors-children\//.test(root.location?.pathname||'');
  const tyranidsBook=()=>root.document?.documentElement?.dataset.bookId==='tyranids'||/\/books\/tyranids\//.test(root.location?.pathname||'');
  const csmBook=()=>root.document?.documentElement?.dataset.bookId==='chaos-space-marines'||/\/books\/chaos-space-marines\//.test(root.location?.pathname||'');
  const smBook=()=>root.document?.documentElement?.dataset.bookId==='space-marines'||/\/books\/space-marines\//.test(root.location?.pathname||'');
  const daBook=()=>root.document?.documentElement?.dataset.bookId==='dark-angels'||/\/books\/dark-angels\//.test(root.location?.pathname||'');
  const baBook=()=>root.document?.documentElement?.dataset.bookId==='blood-angels'||/\/books\/blood-angels\//.test(root.location?.pathname||'');
  const ecEffects=new Map([
    ['tears of the phoenix','modifier-immunity'],
    ['exalted patron','move-plus-1'],
    ['spiritsliver','melee-strength-attacks-plus-1'],
    ['cacophonic accompaniment','deep-strike-ignores-cover'],
    ['frenzied ferocity','sustained-hits-1'],
    ['euphoric crown','melee-strength-plus-1'],
    ['howling plate','ranged-ap-plus-1'],
    ['distortion','melee-attacks-damage-plus-1'],
    ['slayer of champions','precision-vs-character'],
    ['eager patrons','move-plus-2'],
    ['beguiling grotesquerie','snap-shooting-protection']
  ]);
  const tyranidsEffects=new Map([
    ['cryptophotaic camouflage','detection-range-minus-3'],
    ['destabilising predation','ranged-anti-character-2'],
    ['synaptoprescience','invulnerable-save-4'],
    ['elevated might','melee-reroll-wounds-ap-plus-1'],
    ['ocular adaptation','melee-hit-plus-1'],
    ['trygon prime','synapse-melee-strength-ws-plus-1'],
    ['adaptive biology','feel-no-pain'],
    ['ominous presence','oc-plus-3'],
    ['relentless hunger','move-plus-2-unit'],
    ['parasitic biomorphology','melee-strength-plus-1-conditional-attacks'],
    ['chameleonic','stealth'],
    ['power of the hive mind','psychic-strength-ap-plus-1']
  ]);
  const csmEffects=new Map([
    ['touched by the warp','psyker-psychic-weapons'],
    ['conduit of chaos','melee-lance'],
    ['crown of worms','ability-range-plus-3'],
    ['surgical precision','melee-precision'],
    ['living carapace','wounds-plus-1-feel-no-pain-5'],
    ['cursed fang','melee-ap-plus-1-precision'],
    ['shroud of obfuscation','stealth-lone-operative'],
    ['iron artifice','anti-vehicle-fortification-4'],
    ['invigorated mechatendrils','move-plus-4'],
    ['shadowcowl talisman','unit-invulnerable-save-5'],
    ['pact of cursed pinions','daemon-melee-attacks-plus-1'],
    ['tzagulla','weapons-attacks-strength-ap-plus-1']
  ]);
  const smFamilyEffects=new Map([
    ['headhunter-task-force|firestorm-coordinators','ranged-sustained-hits-1'],
    ['firestorm-assault-force|firestorm-assault-force-war-tempered-artifice','melee-strength-plus-3'],
    ['gladius-task-force|gladius-task-force-artificer-armour','save-2-feel-no-pain-5'],
    ['ironstorm-spearhead|ironstorm-spearhead-the-flesh-is-weak','feel-no-pain-4'],
    ['vanguard-spearhead|vanguard-spearhead-ghostweave-cloak','stealth-lone-operative'],
    ['fulguris-task-force|bellicose-weapon-spirits','reroll-damage-attacks'],
    ['fulguris-task-force|raptorial-cogitator-core','ranged-ignores-cover'],
    ['subversion-assets|shroud-field','stealth-lone-operative'],
    ['vengeful-hosts|enhancement-orksbane','new-weapon-profile']
  ]),smLocalEffects=new Map([
    ['blade-of-ultramar|armour-of-antoninus','save-2-feel-no-pain-5'],
    ['forgefather-s-seekers|war-tempered-artifice','melee-strength-plus-3'],
    ['shadowmark-talon|umbral-raptor','stealth-lone-operative']
  ]);
  const smOps=Object.freeze({
    meleeA1:[{component:'weapon',targetId:'melee',operation:'add-stat',stat:'A',delta:1}],oc1:[{component:'stat',targetId:'OC',operation:'add',delta:1}],
    fnp5:[{component:'ability',targetId:'core-feel-no-pain',operation:'grant',title:'Feel No Pain 5+',summary:''}],fnp6:[{component:'ability',targetId:'core-feel-no-pain',operation:'grant',title:'Feel No Pain 6+',summary:''}],
    invulnerable4:[{component:'ability',targetId:'effective-invulnerable-save-4',operation:'grant',title:'Invulnerable Save 4+',summary:''}],invulnerable5:[{component:'ability',targetId:'effective-invulnerable-save-5',operation:'grant',title:'Invulnerable Save 5+',summary:''}],
    stealth:[{component:'ability',targetId:'core-stealth',operation:'grant',title:'Stealth',summary:''}],infiltrators:[{component:'ability',targetId:'core-infiltrators',operation:'grant',title:'Infiltrators',summary:''}],scouts6:[{component:'ability',targetId:'core-scouts',operation:'grant',title:'Scouts 6\"',summary:''}],fightsFirst:[{component:'ability',targetId:'core-fights-first',operation:'grant',title:'Fights First',summary:''}],
    lethal:[{component:'weapon',targetId:'all',operation:'grant-tag',tag:'LETHAL HITS'}],sustained:[{component:'weapon',targetId:'all',operation:'grant-tag',tag:'SUSTAINED HITS 1'}],rangedSustained:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'SUSTAINED HITS 1'}],rangedIgnores:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'IGNORES COVER'}],
    rangedSustainedIgnores:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'SUSTAINED HITS 1'},{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'IGNORES COVER'}],assaultLance:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'ASSAULT'},{component:'weapon',targetId:'melee',operation:'grant-tag',tag:'LANCE'}],
    meleeAS1:[{component:'weapon',targetId:'melee',operation:'add-stat',stat:'A',delta:1},{component:'weapon',targetId:'melee',operation:'add-stat',stat:'S',delta:1}],meleeSap1:[{component:'weapon',targetId:'melee',operation:'add-stat',stat:'S',delta:1},{component:'weapon',targetId:'melee',operation:'add-stat',stat:'AP',delta:-1}],meleeAp1:[{component:'weapon',targetId:'melee',operation:'add-stat',stat:'AP',delta:-1}],
    rangedPrecision:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'PRECISION'}],torrentA1:[{component:'weapon',targetId:'tag:TORRENT',operation:'add-stat',stat:'A',delta:1}],battleline:[{component:'keyword',targetId:'BATTLELINE',operation:'grant'}]
  });
  const smEnhancement=(mutationScope,operations=[],referenceScope=null)=>Object.freeze({mutationScope,operations,referenceScope});
  const smFamilyConformanceEnhancements=new Map([
    ['1st-company-task-force|1st-company-task-force-the-imperiums-sword',smEnhancement('owner',smOps.meleeA1,'unit')],['1st-company-task-force|1st-company-task-force-rites-of-war',smEnhancement('owner',smOps.oc1,'unit')],['1st-company-task-force|1st-company-task-force-iron-resolve',smEnhancement('owner',smOps.fnp5,'unit')],
    ['anvil-siege-force|anvil-siege-force-stoic-defender',smEnhancement(null,[],'leading')],['anvil-siege-force|anvil-siege-force-architect-of-war',smEnhancement('leading',smOps.rangedIgnores,'leading')],['armoured-speartip|shock-deployment',smEnhancement(null,[],'unit')],
    ['bastion-task-force|blades-of-valour',smEnhancement('owner-or-battleline',smOps.meleeAp1,'owner-or-battleline')],['bastion-task-force|bombast-omnivox',smEnhancement(null,[],'unit')],['bastion-task-force|eye-of-the-primarch',smEnhancement('owner-or-battleline',smOps.rangedPrecision,'owner-or-battleline')],['bastion-task-force|hero-of-the-chapter',smEnhancement('owner-if-leading',smOps.battleline)],
    ['ceramite-sentinels|castellum-omnivox',smEnhancement(null,[],'unit')],['ceramite-sentinels|spy-skull-data-link',smEnhancement('unit',smOps.rangedIgnores,'unit')],
    ['firestorm-assault-force|firestorm-assault-force-champion-of-humanity',smEnhancement(null,[],'leading')],['firestorm-assault-force|firestorm-assault-force-forged-in-battle',smEnhancement(null,[],'leading')],
    ['gladius-task-force|gladius-task-force-the-honour-vehement',smEnhancement('owner',smOps.meleeAS1)],['gladius-task-force|gladius-task-force-fire-discipline',smEnhancement('leading',smOps.rangedSustained,'leading')],
    ['librarius-conclave|celerity',smEnhancement(null,[],'unit')],['librarius-conclave|fusillade',smEnhancement('unit',smOps.lethal,'unit')],['librarius-conclave|obfuscation',smEnhancement(null,[],'unit')],['librarius-conclave|prescience',smEnhancement(null,[],'unit')],['librarius-conclave|temporal-corridor',smEnhancement(null,[],'unit')],
    ['orbital-assault-force|dedicated-gunship',smEnhancement(null,[],'unit')],['orbital-assault-force|laurels-of-thunder',smEnhancement(null,[],'unit')],['orbital-assault-force|veteran-of-the-vanguard',smEnhancement('unit',smOps.scouts6,'unit')],
    ['stormlance-task-force|stormlance-task-force-fury-of-the-storm',smEnhancement('owner',smOps.meleeSap1)],['stormlance-task-force|stormlance-task-force-portents-of-wisdom',smEnhancement(null,[],'leading')],['stormlance-task-force|stormlance-task-force-feinting-withdrawal',smEnhancement(null,[],'leading')],['stormlance-task-force|stormlance-task-force-hunters-instincts',smEnhancement(null,[],'unit')],
    ['vanguard-spearhead|vanguard-spearhead-the-blade-driven-deep',smEnhancement('leading',smOps.infiltrators,'leading')],['vanguard-spearhead|vanguard-spearhead-execute-and-redeploy',smEnhancement(null,[],'unit')],['vengeful-hosts|enhancement-avenging-angel',smEnhancement(null,[],'unit')]
  ]);
  const smLocalConformanceEnhancements=new Map([
    ['blade-of-ultramar|oath-of-macragge',smEnhancement('owner',smOps.meleeAS1)],['blade-of-ultramar|veteran-of-behemoth',smEnhancement('leading',smOps.rangedSustained,'leading')],
    ['emperor-s-shield|champion-of-the-feast',smEnhancement('owner',smOps.meleeA1,'unit')],['emperor-s-shield|disciple-of-rhetoricus',smEnhancement('owner',smOps.oc1,'unit')],['emperor-s-shield|malodraxian-standard',smEnhancement(null,[],'unit')],
    ['forgefather-s-seekers|forged-in-battle',smEnhancement(null,[],'leading')],['forgefather-s-seekers|immolator',smEnhancement('unit',smOps.torrentA1,'unit')],
    ['hammer-of-avernii|iron-laurel',smEnhancement('owner',smOps.oc1,'unit')],['hammer-of-avernii|spiritus-ferrum',smEnhancement('owner',smOps.meleeA1,'unit')],['hammer-of-avernii|steel-font',smEnhancement(null,[],'bodyguard')],
    ['reclamation-force|seals-of-reconquest',smEnhancement('unit',smOps.invulnerable5,'unit')],['spearpoint-task-force|hunter-s-eye',smEnhancement('unit',smOps.rangedSustainedIgnores,'unit')],['spearpoint-task-force|spearpoint-paragon',smEnhancement('owner',smOps.meleeSap1)],['spearpoint-task-force|stormseers-wisdom',smEnhancement(null,[],'leading')],
    ['shadowmark-talon|blackwing-shroud',smEnhancement('leading',smOps.infiltrators,'leading')],['shadowmark-talon|hunter-s-instincts',smEnhancement(null,[],'unit')]
  ]);
  const smAbility=(scope,operations=[])=>Object.freeze({scope,operations});
  const smAttachedAbilitySemantics=new Map([
    ['unit-ancient|space-marines-ability-astartes-banner',smAbility('leading',smOps.oc1)],['unit-ancient-in-terminator-armor|space-marines-ability-keep-the-banner-high',smAbility('leading')],['unit-ancient-in-terminator-armor|space-marines-ability-astartes-banner',smAbility('leading',smOps.oc1)],['unit-apothecary|space-marines-ability-narthecium',smAbility('leading')],['unit-apothecary-biologis|space-marines-ability-surgical-precision',smAbility('leading',smOps.lethal)],['unit-bladeguard-ancient|space-marines-ability-astartes-banner',smAbility('leading',smOps.oc1)],
    ['unit-captain-with-jump-pack|space-marines-ability-angels-wrath',smAbility('leading')],['unit-chaplain|space-marines-ability-litany-of-hate',smAbility('leading')],['unit-chaplain-in-terminator-armour|space-marines-ability-recitation-of-faith',smAbility('leading')],['unit-chaplain-in-terminator-armour|space-marines-ability-litany-of-hate',smAbility('leading')],['unit-chaplain-on-bike|space-marines-ability-catechism-of-fire',smAbility('unit')],['unit-chaplain-on-bike|space-marines-ability-litany-of-hate',smAbility('leading')],['unit-chaplain-with-jump-pack|space-marines-ability-exhortation-of-rage',smAbility('unit')],['unit-chaplain-with-jump-pack|space-marines-ability-litany-of-hate',smAbility('leading')],
    ['unit-judiciar|space-marines-ability-tempormortis',smAbility('leading',smOps.fightsFirst)],['unit-librarian|space-marines-ability-mental-fortress-psychic',smAbility('leading',smOps.invulnerable4)],['unit-librarian|space-marines-ability-psychic-hood',smAbility('leading')],['unit-librarian-in-phobos-armour|space-marines-ability-shrouding-psychic',smAbility('leading',smOps.stealth)],['unit-librarian-in-phobos-armour|space-marines-ability-psychic-hood',smAbility('leading')],['unit-librarian-in-terminator-armour|space-marines-ability-veil-of-time-psychic',smAbility('leading',smOps.rangedSustained)],['unit-librarian-in-terminator-armour|space-marines-ability-psychic-hood',smAbility('leading')],
    ['unit-lieutenant|space-marines-ability-target-priority',smAbility('unit')],['unit-lieutenant|space-marines-ability-tactical-precision',smAbility('leading',smOps.lethal)],['unit-lieutenant-in-phobos-armour|space-marines-ability-strategic-dispersal',smAbility('unit')],['unit-lieutenant-in-phobos-armour|space-marines-ability-tactical-precision',smAbility('leading',smOps.lethal)],['unit-lieutenant-in-reiver-armour|space-marines-ability-deadly-terror',smAbility('leading')],['unit-lieutenant-in-reiver-armour|space-marines-ability-tactical-precision',smAbility('leading',smOps.lethal)],
    ['unit-adrax-agatone|space-marines-ability-unto-the-anvil',smAbility('leading')],['unit-caanok-var|space-marines-ability-cold-and-calculating',smAbility('unit')],['unit-cato-sicarius|space-marines-ability-knight-champion-of-macragge',smAbility('unit')],['unit-cato-sicarius|space-marines-ability-honour-or-death',smAbility('unit')],['unit-chief-librarian-tigurius|space-marines-ability-hood-of-hellfire',smAbility('leading')],['unit-chief-librarian-tigurius|space-marines-ability-master-of-prescience-psychic',smAbility('unit',smOps.stealth)],['unit-darnath-lysander|space-marines-ability-icon-of-obstinacy',smAbility('unit')],['unit-iron-father-feirros|space-marines-ability-rites-of-tempering',smAbility('leading',smOps.fnp5)],['unit-kayvaan-shrike|space-marines-ability-trifold-path-of-shadow',smAbility('leading')],['unit-kayvaan-shrike|space-marines-ability-echo-of-the-ravenspire',smAbility('unit')],['unit-korsarro-khan|space-marines-ability-for-the-khan',smAbility('leading',smOps.assaultLance)],['unit-lieutenant-titus|space-marines-ability-press-the-attack',smAbility('unit',smOps.sustained)],['unit-marneus-calgar-in-armour-of-antilochus|space-marines-ability-inspiring-leader',smAbility('unit')],['unit-pedro-kantor|space-marines-ability-oath-of-rynn',smAbility('unit')],['unit-pedro-kantor|space-marines-ability-to-the-last',smAbility('leading')],['unit-suboden-khan|space-marines-ability-spear-of-chogoris',smAbility('unit')],['unit-suboden-khan|space-marines-ability-skilled-riders',smAbility('unit')],['unit-tor-garadon|space-marines-ability-signum-array',smAbility('leading',smOps.rangedIgnores)]
  ]);
  const smBodyguardAbilitySemantics=new Map([
    ['unit-company-heroes|space-marines-ability-ancient-banner',smAbility('unit',smOps.oc1)],['unit-company-heroes|space-marines-ability-command-squad',smAbility('unit')],['unit-victrix-honour-guard|space-marines-ability-ultramarines-honour-guard',smAbility('unit')],['unit-wardens-of-ultramar|space-marines-ability-second-company-banner',smAbility('unit',[...smOps.oc1,{component:'stat',targetId:'Ld',operation:'add',delta:-1,requiresUnitId:'unit-lieutenant-titus'}])]
  ]);
  const smRosterAbilityReferences=Object.freeze([
    {sourceUnitId:'unit-darnath-lysander',abilityId:'space-marines-ability-inspiring-commander',targetUnitIds:['unit-terminator-assault-squad','unit-terminator-squad']},{sourceUnitId:'unit-iron-father-feirros',abilityId:'space-marines-ability-inspiring-commander-2',targetUnitIds:['unit-heavy-intercessor-squad']},{sourceUnitId:'unit-kayvaan-shrike',abilityId:'space-marines-ability-inspiring-commander-3',targetUnitIds:['unit-assault-intercessors-with-jump-packs']},{sourceUnitId:'unit-korsarro-khan',abilityId:'space-marines-ability-inspiring-commander-4',targetUnitIds:['unit-outrider-squad']},{sourceUnitId:'unit-pedro-kantor',abilityId:'space-marines-ability-inspiring-commander-5',targetUnitIds:['unit-sternguard-veteran-squad']},{sourceUnitId:'unit-vulkan-hestan',abilityId:'space-marines-ability-inspiring-commander-6',targetUnitIds:['unit-infernus-squad']}
  ]);
  const smDetachmentSemantics=new Map([
    ['anvil-siege-force',{ruleId:'anvil-siege-force-shield-of-the-imperium',operations:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'HEAVY'}],predicate:()=>true}],
    ['armoured-speartip',{ruleId:'armoured-speartip-rapid-deployment',operations:[{component:'keyword',targetId:'HEAVY TRANSPORT',operation:'grant'}],predicate:gameUnit=>{const keywords=new Set((gameUnit.rosterState?.keywordProfile?.effective||[]).map(normalize)),wounds=Number.parseInt(gameUnit.item?.catalogUnit?.gameSelections?.stats?.W,10);return keywords.has('transport')&&!keywords.has('fly')&&wounds>=14;}}],
    ['bastion-task-force',{ruleId:'bastion-task-force-interlocking-tactics',operations:[],predicate:gameUnit=>smHasKeyword(gameUnit,'BATTLELINE')}],['firestorm-assault-force',{ruleId:'firestorm-assault-force-close-range-eradication',operations:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'ASSAULT'}],predicate:()=>true}],['forgefather-s-seekers',{ruleId:'forgefather-s-seekers-vulkan-s-quest',operations:[{component:'weapon',targetId:'ranged',operation:'grant-tag',tag:'ASSAULT'}],predicate:()=>true}],
    ['fulguris-task-force',{ruleId:'fulguris-task-force-skystrike',operations:[{component:'keyword',targetId:'SPEEDER',operation:'grant'}],predicate:gameUnit=>['unit-land-speeder','unit-storm-speeder-hailstrike','unit-storm-speeder-hammerstrike','unit-storm-speeder-thunderstrike'].includes(gameUnit.identity.canonicalDatasheetId)}],['headhunter-task-force',{ruleId:'headhunter-task-force-target-sighted',operations:[{component:'keyword',targetId:'TANK ACE',operation:'grant'}],predicate:gameUnit=>{const id=gameUnit.identity.canonicalDatasheetId,keywords=new Set((gameUnit.rosterState?.keywordProfile?.effective||[]).map(normalize));return keywords.has('vehicle')&&!keywords.has('fortification')&&!keywords.has('walker')&&!keywords.has('fly')&&!id.includes('drop-pod');}}],
    ['spearpoint-task-force',{ruleId:'spearpoint-task-force-storm-swift-onslaught',operations:[],predicate:()=>true}],['stormlance-task-force',{ruleId:'stormlance-task-force-lightning-assault',operations:[],predicate:()=>true}],['subversion-assets',{ruleId:'subversion-assets-new-rule',operations:[],predicate:gameUnit=>smHasKeyword(gameUnit,'PHOBOS')||gameUnit.identity.canonicalDatasheetId==='unit-scout-squad'}]
  ]);
  const smWargearSemantics=new Map([
    ['unit-ancient-in-terminator-armor-wargear-ability-terminator-storm-shield',[{component:'stat',targetId:'W',operation:'set',to:'6'}]],['unit-captain-wargear-ability-relic-shield',[{component:'stat',targetId:'W',operation:'add',delta:1}]],['unit-captain-with-jump-pack-wargear-ability-relic-shield',[{component:'stat',targetId:'W',operation:'add',delta:1}]],['unit-chaplain-in-terminator-armour-wargear-ability-relic-shield',[{component:'stat',targetId:'W',operation:'add',delta:1}]],['unit-centurion-assault-squad-wargear-ability-centurion-assault-launchers',[{component:'keyword',targetId:'GRENADES',operation:'grant'}]],['unit-infiltrator-squad-wargear-ability-helix-gauntlet',smOps.fnp6],['unit-reiver-squad-wargear-ability-reiver-grav-chute',[{component:'ability',targetId:'core-deep-strike',operation:'grant',title:'Deep Strike',summary:''}]],['unit-terminator-assault-squad-wargear-ability-storm-shield',[{component:'stat',targetId:'W',operation:'set',to:'4'}]]
  ]);
  const baEffects=new Map([
    ['legacy-of-grace|enhancement-blood-boil','psychic-anti-reroll-damage'],
    ['legacy-of-grace|enhancement-aureole-of-the-angel','detection-range-minus-3'],
    ['wrath-of-the-doomed|enhancement-on-the-archtraitors-bridge','melee-attacks-plus-2'],
    ['the-angelic-host|enhancement-archangels-shard','melee-anti-chaos-lance'],
    ['the-angelic-host|enhancement-artisan-of-war','save-2-weapons-ap-plus-1'],
    ['angelic-inheritors|enhancement-prescient-flash','unit-scouts-6'],
    ['rage-cursed-onslaught|enhancement-carmine-reliquary','unit-scouts-6-battleshock-aura']
  ]);
  const smFamilyOverlayEligibility=Object.freeze({
    'space-marines':new Set(smFamilyEffects.keys()),
    'dark-angels':new Set(smFamilyEffects.keys()),
    'blood-angels':new Set(smFamilyEffects.keys())
  });
  const smFamilyBookId=()=>smBook()?'space-marines':daBook()?'dark-angels':baBook()?'blood-angels':null;
  const smFamilySourceId=(item,bookId)=>item?.sourceId||(bookId==='space-marines'?item?.ruleId:null);
  const smFamilyIdentity=(item,bookId)=>`${item?.detachmentId||''}|${smFamilySourceId(item,bookId)||''}`;
  const smFamilyEffect=item=>{const bookId=smFamilyBookId(),sourceId=smFamilySourceId(item,bookId),identity=smFamilyIdentity(item,bookId);if(!bookId||!sourceId||!item?.owner||!item?.assignment||!smFamilyOverlayEligibility[bookId]?.has(identity))return null;return smFamilyEffects.get(identity)||null;};
  const smLocalEffect=item=>smBook()&&item?.owner&&item?.assignment?smLocalEffects.get(smFamilyIdentity(item,'space-marines'))||null:null;
  const daEffects=new Map([
    ['company-of-hunters|enhancement-master-of-manoeuvre','strategic-reserves-setup'],
    ['company-of-hunters|enhancement-master-crafted-weapon','melee-precision'],
    ['company-of-hunters|enhancement-mounted-strategist','unit-advance-charge-rerolls'],
    ['company-of-hunters|enhancement-recon-hunter','unit-scouts-9'],
    ['dark-age-arsenal|petition-of-stability','plasma-range-plus-6'],
    ['dark-age-arsenal|entreaty-of-perpetual-ardour','snap-shooting-hit-5'],
    ['darkflight-pursuit|thundercowl-turbines','first-turn-ingress'],
    ['darkflight-pursuit|nightforged-battery','reroll-attacks-hazard'],
    ['inner-circle-task-force|enhancement-champion-of-the-deathwing','melee-lethal-hits-vowed-critical'],
    ['inner-circle-task-force|enhancement-inner-circle-task-force-deathwing-assault','early-deep-strike'],
    ['inner-circle-task-force|enhancement-eye-of-the-unseen','conditional-cp-roll'],
    ['inner-circle-task-force|enhancement-singular-will','unit-pile-in-consolidate-plus-3'],
    ['interrogation-conclave|limitless-zeal','unit-charge-plus-1'],
    ['interrogation-conclave|inescapable-interrogation','ranged-ignores-cover'],
    ['lion-s-blade-task-force|calibanite-armaments','melee-damage-plus-1'],
    ['lion-s-blade-task-force|lord-of-the-hunt','unit-fall-back-actions'],
    ['lion-s-blade-task-force|stalwart-champion','conditional-unit-oc-plus-1'],
    ['lion-s-blade-task-force|fulgus-magna','once-per-battle-reserves'],
    ['unforgiven-task-force|enhancement-pennant-of-remembrance','attached-unit-feel-no-pain'],
    ['unforgiven-task-force|enhancement-shroud-of-heroes','once-per-battle-return'],
    ['unforgiven-task-force|enhancement-stubborn-tenacity','attached-unit-conditional-rolls'],
    ['unforgiven-task-force|enhancement-weapons-of-the-first-legion','melee-attacks-strength-damage-plus-1'],
    ['wrath-of-the-rock|tempered-in-battle-aura','leadership-reroll-aura'],
    ['wrath-of-the-rock|ancient-weapons','melee-strength-ap-damage'],
    ['wrath-of-the-rock|deathwing-assault','early-deep-strike'],
    ['wrath-of-the-rock|lord-of-the-ravenwing','unit-advance-charge-rerolls']
  ]);
  const daNotes=new Map([
    ['strategic-reserves-setup','Setup rule: if the bearer\'s unit starts the battle in Strategic Reserves, it does not count towards the army\'s Strategic Reserves points limit and treats the current battle round as one higher when it is set up.'],
    ['unit-advance-charge-rerolls','Attachment-dependent rule: the bearer\'s unit can re-roll Advance and Charge rolls. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-scouts-9','Attachment-dependent setup rule: models in the bearer\'s unit have Scouts 9". No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['snap-shooting-hit-5','Derived rule: this unit\'s snap shooting attacks hit on unmodified Hit rolls of 5+.'],
    ['first-turn-ingress','Setup rule: in your first Movement phase, this unit can make an ingress move.'],
    ['reroll-attacks-hazard','Derived rule: this unit can re-roll rolls to determine a weapon\'s Attacks characteristic and Hazard rolls.'],
    ['early-deep-strike','Setup rule: the bearer\'s unit can use Deep Strike in the Reinforcements step of your first, second or third Movement phase, regardless of mission rules.'],
    ['conditional-cp-roll','Conditional rule: when the bearer\'s unit is targeted with a Stratagem, roll one D6, adding 1 while the bearer is within range of the Vowed objective marker; on a 5+ you gain 1CP.'],
    ['unit-pile-in-consolidate-plus-3','Attachment-dependent rule: when the bearer\'s unit Piles In or Consolidates, models in it can move an additional 3". No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-charge-plus-1','Attachment-dependent rule: this unit has +1 to Charge rolls. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['unit-fall-back-actions','Attachment-dependent rule: the bearer\'s unit can shoot and declare a charge after Falling Back and can re-roll Desperate Escape tests. No Bodyguard Datasheet is mutated without attachment evidence.'],
    ['conditional-unit-oc-plus-1','Attachment-dependent conditional rule: while the bearer\'s unit is not Battle-shocked, models in it have +1 Objective Control. No permanent profile or Bodyguard Datasheet mutation was applied.'],
    ['once-per-battle-reserves','Once-per-battle rule: at the end of your opponent\'s turn, if the bearer\'s unit is not within Engagement Range, it can be placed into Strategic Reserves.'],
    ['attached-unit-feel-no-pain','Attachment-dependent conditional rule: while the bearer is leading a unit, models in it have Feel No Pain 6+, or Feel No Pain 4+ while that unit is Battle-shocked. No Datasheet mutation was applied.'],
    ['once-per-battle-return','Once-per-battle rule: when this model is destroyed, its source-backed return roll and setup instructions apply at the end of the phase.'],
    ['attached-unit-conditional-rolls','Attachment-dependent conditional rule: while the bearer is leading a unit, its below-Starting-Strength and Battle-shocked attack-roll modifiers apply. No weapon profile or Bodyguard Datasheet mutation was applied.'],
    ['leadership-reroll-aura','Derived aura: friendly Adeptus Astartes units within 6" can re-roll Battle-shock and Leadership tests. No other Datasheet card is mutated.']
  ]);

  function enhancementArticle(entry,item){
    const article=root.document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item.title);
    const title=root.document.createElement('h5');title.textContent=item.title;
    const cost=root.document.createElement('small');cost.className='roster-enhancement-cost';
    const exported=Number(entry.exportedCost),current=Number(item.value),hasExported=Number.isFinite(exported)&&exported>0,hasCurrent=item.value!=null&&Number.isFinite(current);
    cost.textContent=hasCurrent?(hasExported&&exported!==current?`${entry.exportedCost} pts in export · ${item.value} pts current`:`${item.value} pts included`):(hasExported?`${entry.exportedCost} pts in export`:``);
    cost.hidden=!cost.textContent;
    const text=root.document.createElement('p');text.textContent=item.text;
    article.append(title,cost,text);return article;
  }
  function warning(article,text){
    const note=root.document.createElement('p');note.className='roster-warning';note.textContent=text;article.append(note);
  }
  function derivedNote(article,effect,text){
    article.dataset.rosterDerivedEffect=effect;
    const note=root.document.createElement('p');note.className='roster-derived-note';note.dataset.rosterDerivedNote=effect;note.textContent=text;article.append(note);
  }
  function weaponRows(card,mode=''){
    return[...card.querySelectorAll('.weapon-group')]
      .filter(group=>!mode||group.querySelector('h5')?.textContent.trim().toLowerCase().startsWith(mode))
      .flatMap(group=>[...group.querySelectorAll('.weapon-row:not(.weapon-head)')]);
  }
  function addWeaponTag(row,label,effect){
    const cell=row.firstElementChild;if(!cell)return false;
    let tags=cell.querySelector('.weapon-tags');
    if(!tags){tags=root.document.createElement('div');tags.className='weapon-tags';cell.append(tags);}
    const existing=[...tags.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-modified');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('span');tag.className='tag roster-modified';tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;tags.append(tag);return true;
  }
  function addKeyword(card,label,effect){
    const list=card.querySelector('[id$="-keywords"] .keyword-list');if(!list)return false;
    const existing=[...list.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-derived-keyword');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('span');tag.className='roster-derived-keyword';tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;list.append(tag);return true;
  }
  function addSharedAbility(card,label,term,effect){
    const list=card.querySelector('[id$="-abilities"] .shared-abilities');if(!list)return false;
    const existing=[...list.children].find(node=>normalize(node.textContent)===normalize(label));
    if(existing){existing.classList.add('roster-derived-ability');existing.dataset.rosterDerivedEffect=effect;return true;}
    const tag=root.document.createElement('button');tag.type='button';tag.className='term-button roster-derived-ability';tag.dataset.term=term;tag.dataset.rosterDerivedEffect=effect;tag.textContent=label;list.append(tag);return true;
  }
  function increased(value,amount){
    const text=String(value||'').trim(),inches=text.endsWith('"'),raw=inches?text.slice(0,-1):text;
    if(/^-?\d+$/.test(raw))return`${Number(raw)+amount}${inches?'"':''}`;
    const dice=raw.match(/^(\d*D\d+)([+-]\d+)?$/i);if(!dice)return'';
    const bonus=Number(dice[2]||0)+amount;return`${dice[1]}${bonus>0?`+${bonus}`:bonus<0?bonus:''}${inches?'"':''}`;
  }
  function adjustStat(card,field,amount,effect){
    const value=card.querySelector(`.stat[data-source-field="stats.${field}"] span`);if(!value)return false;
    const base=value.dataset.rosterBaseValue||value.textContent.trim(),next=increased(base,amount);if(!next)return false;
    value.dataset.rosterBaseValue=base;value.dataset.rosterDerivedEffect=effect;value.classList.add('roster-modified');value.textContent=next;return true;
  }
  function adjustWeapons(card,mode,changes,effect){
    const rows=weaponRows(card,mode),updates=[];if(!rows.length)return false;
    for(const row of rows)for(const [field,amount] of Object.entries(changes)){
      const cell=row.querySelector(`[data-label="${field}"]`);if(!cell)return false;
      const base=cell.dataset.rosterBaseValue||cell.textContent.trim(),next=increased(base,amount);if(!next)return false;
      updates.push({cell,base,next});
    }
    for(const {cell,base,next} of updates){cell.dataset.rosterBaseValue=base;cell.dataset.rosterDerivedEffect=effect;cell.classList.add('roster-modified');cell.textContent=next;}
    return true;
  }
  function tagWeapons(card,mode,label,effect){const rows=weaponRows(card,mode);return rows.length>0&&rows.every(row=>addWeaponTag(row,label,effect));}
  function setSmStat(card,field,value,effect){
    const target=card.querySelector(`.stat[data-source-field="stats.${field}"] span`);if(!target)return false;
    target.dataset.rosterBaseValue=target.dataset.rosterBaseValue||target.textContent.trim();target.dataset.rosterDerivedEffect=effect;target.classList.add('roster-modified');target.textContent=value;return true;
  }
  function addSmWeaponProfile(card,profile,effect){
    const mode=String(profile?.type||'').toLowerCase().startsWith('melee')?'melee':'ranged',group=[...card.querySelectorAll('.weapon-group')].find(node=>node.querySelector('h5')?.textContent.trim().toLowerCase().startsWith(mode));if(!group)return false;
    const table=group.querySelector('.weapon-table'),values=profile.characteristics||{};if(!table||!profile.name)return false;
    const row=root.document.createElement('div');row.className='weapon-row roster-derived-weapon';row.dataset.rosterDerivedEffect=effect;row.dataset.mode=mode;
    const name=root.document.createElement('div');name.textContent=profile.name;row.append(name);
    for(const field of mode==='melee'?['Range','A','WS','S','AP','D']:['Range','A','BS','S','AP','D']){const cell=root.document.createElement('div');cell.dataset.label=field;cell.textContent=values[field]??'';row.append(cell);}
    for(const keyword of String(values.Keywords||'').split(',').map(value=>value.trim()).filter(Boolean))addWeaponTag(row,keyword,effect);
    table.append(row);return true;
  }
  function resolveTauOwnership(roster,units){
    const enhancements=roster?.enhancements||[],names=new Set((units||[]).map(unit=>normalize(unit.name)));
    const instances=(units||[]).map((unit,index)=>({
      unit,
      label:`${unit.name||'Roster unit'}${units.length>1?` #${index+1}`:''}`,
      points:Number(unit.points)||0,
      enhancements:enhancements.filter(entry=>entry.ownerStatus==='resolved'&&entry.ownerUnitId===unit.id)
    }));
    const unresolved=enhancements.filter(entry=>entry.ownerStatus!=='resolved'&&names.has(normalize(entry.ownerName||entry.ownerLabel)));
    return{instances,cardEnhancements:instances.length===1?instances[0].enhancements:[],unresolved};
  }
  function renderTauInstances(card,ownership){
    const host=card.querySelector('[id$="-abilities"]')||card,list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return;
    const block=root.document.createElement('section');block.className='content-block roster-instances';
    const heading=root.document.createElement('h4');heading.textContent='Roster instances';
    const rows=root.document.createElement('ul');block.append(heading,rows);
    for(const instance of ownership.instances){
      const row=root.document.createElement('li');row.textContent=`${instance.label} / ${instance.points} pts / ${instance.enhancements.length?instance.enhancements.map(entry=>catalog()[normalize(entry.name)]?.title||entry.name).join(', '):'No Enhancement assigned'}`;rows.append(row);
      for(const entry of instance.enhancements){
        const item=catalog()[normalize(entry.name)];if(!item)continue;
        const article=enhancementArticle(entry,item);article.classList.add('roster-enhancement-instance');article.dataset.rosterInstance=instance.unit.id;
        warning(article,`Assigned to ${instance.label}. This shared Datasheet card represents multiple roster units, so no derived mutation was applied.`);list.append(article);
      }
    }
    if(ownership.unresolved.length)warning(block,'One or more roster Enhancements have an unresolved owner and were not applied.');
    host.append(block);
  }
  function renderTauUnresolved(list,entries){
    for(const entry of entries){
      const item=catalog()[normalize(entry.name)];if(!item)continue;
      const article=enhancementArticle(entry,item);article.classList.add('roster-enhancement-unresolved');
      warning(article,'Effect was not applied because the Enhancement owner could not be resolved to an exact roster unit.');list.prepend(article);
    }
  }
  function decorateTau(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length!==1)return[];
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      list.prepend(enhancementArticle(entry,item));
    }
    return ownership.cardEnhancements;
  }
  function applyEcEffect(card,article,item,applyEffects=true){
    if(!applyEffects)return;
    const effect=ecEffects.get(normalize(item.title));
    if(effect==='modifier-immunity'){
      derivedNote(article,effect,'Derived rule: models in the bearer\'s unit can ignore modifiers to melee Weapon Skill and to Hit and Wound rolls.');return;
    }
    if(effect==='move-plus-1'||effect==='move-plus-2'){
      if(adjustStat(card,'M',effect.endsWith('2')?2:1,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,`Derived profile: ${effect.endsWith('2')?'+2"':'+1"'} Move applied.`);}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='melee-strength-attacks-plus-1'){
      if(adjustWeapons(card,'melee',{S:1,A:1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +1 Strength and +1 Attacks applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='deep-strike-ignores-cover'){
      const ability=addSharedAbility(card,'Deep Strike','core-deep-strike',effect),weapons=tagWeapons(card,'ranged','IGNORES COVER',effect);
      if(ability&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: Deep Strike and Ignores Cover applied. If the bearer leads a unit, the ranged-attack effect also applies to that Attached Unit; no Bodyguard card is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block or ranged weapon profiles were not found.');return;
    }
    if(effect==='sustained-hits-1'){
      if(tagWeapons(card,'','SUSTAINED HITS 1',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Sustained Hits 1 applied to this unit\'s attacks.');}
      else warning(article,'Effect could not be applied automatically because no weapon profiles were found.');return;
    }
    if(effect==='melee-strength-plus-1'||effect==='ranged-ap-plus-1'||effect==='melee-attacks-damage-plus-1'){
      const applied=effect==='melee-strength-plus-1'?adjustWeapons(card,'melee',{S:1},effect):effect==='ranged-ap-plus-1'?adjustWeapons(card,'ranged',{AP:-1},effect):adjustWeapons(card,'melee',{A:1,D:1},effect);
      if(applied){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,effect==='melee-strength-plus-1'?'Derived profiles: +1 Strength applied to the bearer\'s melee attacks.':effect==='ranged-ap-plus-1'?'Derived profiles: ranged Armour Penetration improved by 1. If the bearer leads a unit, this also applies to that Attached Unit; no Bodyguard card is mutated without attachment evidence.':'Derived profiles: +1 Attacks and +1 Damage applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more matching weapon characteristics were not found.');return;
    }
    if(effect==='precision-vs-character'){
      if(tagWeapons(card,'melee','PRECISION',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Precision applied to the bearer\'s melee weapons. The +1 Strength and improved AP remain conditional on targeting a Character unit and are not applied permanently.');}
      else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='snap-shooting-protection'){
      derivedNote(article,effect,'Derived rule: enemy units cannot target this unit with snap shooting attacks.');return;
    }
    const mode=/while the bearer is leading a unit|bearer(?:'|\u2019)s unit/i.test(item.text||'')?'attachment-dependent':/once per battle|declare battle formations|before the first turn|after both players have deployed/i.test(item.text||'')?'setup-dependent':'conditional';
    warning(article,`No permanent Datasheet mutation was applied because this Enhancement is ${mode}.`);
  }
  function decorateEc(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderTauInstances(card,ownership);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=enhancementArticle(entry,item);applyEcEffect(card,article,item,!Array.isArray(context.projectedEffects));list.prepend(article);
    }
    renderTauUnresolved(list,ownership.unresolved);return ownership.cardEnhancements;
  }
  function adjustTyranidsRows(rows,changes,effect){
    const updates=[];if(!rows.length)return false;
    for(const row of rows)for(const [field,amount] of Object.entries(changes)){
      const cell=row.querySelector(`[data-label="${field}"]`);if(!cell)return false;
      const base=cell.dataset.rosterBaseValue||cell.textContent.trim();let next='';
      if(field==='WS'){
        const match=base.match(/^(\d+)\+$/);if(match)next=`${Math.max(2,Number(match[1])-amount)}+`;
      }else next=increased(base,amount);
      if(!next)return false;updates.push({cell,base,next});
    }
    for(const {cell,base,next} of updates){cell.dataset.rosterBaseValue=base;cell.dataset.rosterDerivedEffect=effect;cell.classList.add('roster-modified');cell.textContent=next;}
    return true;
  }
  function applyTyranidsEffect(card,article,item,applyEffects=true){
    if(!applyEffects)return;
    const effect=tyranidsEffects.get(normalize(item.title));
    if(effect==='detection-range-minus-3'){derivedNote(article,effect,'Derived rule: this unit has -3" detection range.');return;}
    if(effect==='ranged-anti-character-2'){
      if(tagWeapons(card,'ranged','ANTI-CHARACTER 2+',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Anti-Character 2+ applied to this unit\'s ranged attacks.');}
      else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');return;
    }
    if(effect==='invulnerable-save-4'){
      if(addSharedAbility(card,'Invulnerable Save 4+','core-characteristic-invulnerable-save',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Invulnerable Save 4+ applied.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='melee-reroll-wounds-ap-plus-1'){
      if(adjustTyranidsRows(weaponRows(card,'melee'),{AP:-1},effect))article.dataset.rosterDerivedEffect=effect;
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='melee-hit-plus-1'){derivedNote(article,effect,'Derived rule: add 1 to Hit rolls for this unit\'s melee attacks. Weapon Skill is not rewritten because this is a roll modifier.');return;}
    if(effect==='synapse-melee-strength-ws-plus-1'){
      const keyword=addKeyword(card,'SYNAPSE',effect),weapons=adjustTyranidsRows(weaponRows(card,'melee'),{S:1,WS:1},effect);
      if(keyword&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Synapse keyword applied; melee Strength and Weapon Skill improved by 1.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or melee weapon characteristics were not found.');return;
    }
    if(effect==='feel-no-pain'){
      if(addSharedAbility(card,'Feel No Pain 5+','core-feel-no-pain',effect))article.dataset.rosterDerivedEffect=effect;
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='oc-plus-3'){
      if(adjustStat(card,'OC',3,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: +3 Objective Control applied.');}
      else warning(article,'Effect could not be applied automatically because Objective Control was not found.');return;
    }
    if(effect==='move-plus-2-unit'){
      if(adjustStat(card,'M',2,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profile: +2" Move applied to this bearer Datasheet. If the bearer leads a unit, no Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='melee-strength-plus-1-conditional-attacks'){
      if(adjustTyranidsRows(weaponRows(card,'melee'),{S:1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +1 Strength applied to this bearer Datasheet\'s melee weapons. The +1 Attacks effect remains conditional on destroying an enemy unit near a friendly Harvester; no Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='stealth'){
      if(addSharedAbility(card,'Stealth','core-stealth',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Stealth applied.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='psychic-strength-ap-plus-1'){
      const rows=weaponRows(card).filter(row=>normalize(row.querySelector('.weapon-tags')?.textContent).includes('psychic'));
      if(adjustTyranidsRows(rows,{S:1,AP:-1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Strength and Armour Penetration improved by 1 for the bearer\'s psychic weapons.');}
      else warning(article,'Effect could not be applied automatically because one or more psychic weapon characteristics were not found.');return;
    }
    warning(article,'No permanent Datasheet mutation was applied because this Enhancement does not have a safe deterministic projection.');
  }
  function decorateTyranids(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderTauInstances(card,ownership);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){
      const item=catalog()[normalize(entry.name)];if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=enhancementArticle(entry,item);applyTyranidsEffect(card,article,item,!Array.isArray(context.projectedEffects));list.prepend(article);
    }
    renderTauUnresolved(list,ownership.unresolved);return ownership.cardEnhancements;
  }
  function csmDetachmentIds(roster){
    const labels=roster?.detachments?.length?roster.detachments.map(item=>item.label):[roster?.detachment];
    return new Set(labels.flatMap(value=>String(value||'').split(/\s*,\s*(?![^()]*\))/)).map(value=>normalize(value.replace(/\s*\([^)]*\)\s*$/,''))).filter(Boolean).map(value=>value.replace(/\s+/g,'-')));
  }
  function resolveCsmItem(entry,roster){
    const detachments=csmDetachmentIds(roster),candidates=Object.values(catalog()).filter(item=>normalize(item.title)===normalize(entry.name)&&detachments.has(item.detachmentId));
    return{status:candidates.length===1?'resolved':candidates.length?'ambiguous':'missing',item:candidates.length===1?candidates[0]:null,candidates};
  }
  function csmArticle(entry,resolution,message=''){
    const item=resolution.item,article=item?enhancementArticle(entry,item):root.document.createElement('article');
    if(!item){article.className='ability roster-enhancement roster-enhancement-unresolved';article.dataset.rosterEnhancement=normalize(entry.name);const title=root.document.createElement('h5');title.textContent=entry.name;const cost=root.document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=entry.exportedCost==null;cost.textContent=entry.exportedCost==null?'':`${entry.exportedCost} pts in export`;const text=root.document.createElement('p');text.textContent=resolution.status==='ambiguous'?`This title exists in multiple selected Detachments: ${resolution.candidates.map(candidate=>candidate.detachment).join(' / ')}.`:'No matching Enhancement record was found in the selected Detachment.';article.append(title,cost,text);}
    if(item)article.dataset.rosterEnhancementRuleId=item.ruleId;if(message)warning(article,message);return article;
  }
  function applyCsmEffect(card,article,item,applyEffects=true){
    if(!applyEffects)return;
    const effect=csmEffects.get(normalize(item.title));
    if(effect==='psyker-psychic-weapons'){
      const keyword=addKeyword(card,'PSYKER',effect),weapons=tagWeapons(card,'','PSYCHIC',effect);
      if(keyword&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: Psyker keyword and Psychic applied to the bearer\'s weapons.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or weapon profiles were not found.');return;
    }
    if(effect==='melee-lance'||effect==='melee-precision'){
      const label=effect==='melee-lance'?'LANCE':'PRECISION';
      if(tagWeapons(card,'melee',label,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,`Derived profiles: ${label} applied to the bearer's melee weapons.`);}
      else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='ability-range-plus-3'){
      derivedNote(article,effect,'Derived ability ranges: +3" to Warpsmith, Master of Mechanisms and Enrage Machine Spirits.');return;
    }
    if(effect==='wounds-plus-1-feel-no-pain-5'){
      const wounds=adjustStat(card,'W',1,effect),ability=addSharedAbility(card,'Feel No Pain 5+','core-feel-no-pain',effect);
      if(wounds&&ability){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: +1 Wound and Feel No Pain 5+ applied to the bearer.');}
      else warning(article,'Effect could not be applied automatically because the Wounds characteristic or Abilities block was not found.');return;
    }
    if(effect==='melee-ap-plus-1-precision'){
      const profiles=adjustWeapons(card,'melee',{AP:-1},effect),precision=tagWeapons(card,'melee','PRECISION',effect);
      if(profiles&&precision){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: melee Armour Penetration improved by 1 and Precision applied.');}
      else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
    if(effect==='stealth-lone-operative'){
      const stealth=addSharedAbility(card,'Stealth','core-stealth',effect),lone=addSharedAbility(card,'Lone Operative','core-lone-operative',effect);
      if(stealth&&lone){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived abilities: Stealth and Lone Operative applied to the bearer. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='anti-vehicle-fortification-4'){
      const rows=weaponRows(card),applied=rows.length&&rows.every(row=>addWeaponTag(row,'ANTI-VEHICLE 4+',effect)&&addWeaponTag(row,'ANTI-FORTIFICATION 4+',effect));
      if(applied){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Anti-Vehicle 4+ and Anti-Fortification 4+ applied to the bearer\'s weapons.');}
      else warning(article,'Effect could not be applied automatically because no weapon profiles were found.');return;
    }
    if(effect==='move-plus-4'){
      if(adjustStat(card,'M',4,effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: +4" Move applied to the bearer.');}
      else warning(article,'Effect could not be applied automatically because the Move characteristic was not found.');return;
    }
    if(effect==='unit-invulnerable-save-5'){
      if(addSharedAbility(card,'Invulnerable Save 5+','core-characteristic-invulnerable-save',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Invulnerable Save 5+ applied to the bearer Datasheet only. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(effect==='daemon-melee-attacks-plus-1'){
      const keyword=addKeyword(card,'DAEMON',effect),profiles=adjustWeapons(card,'melee',{A:1},effect);
      if(keyword&&profiles){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived Datasheet: Daemon keyword and +1 Attacks applied to the bearer\'s melee weapons.');}
      else warning(article,'Effect could not be applied automatically because the Keywords block or melee weapon characteristics were not found.');return;
    }
    if(effect==='weapons-attacks-strength-ap-plus-1'){
      if(adjustWeapons(card,'',{A:1,S:1,AP:-1},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: Attacks, Strength and Armour Penetration improved by 1. The Damage improvement remains conditional on the bearer\'s unit being set up from Reserves and is not applied permanently.');}
      else warning(article,'Effect could not be applied automatically because one or more weapon characteristics were not found.');return;
    }
    warning(article,'No permanent Datasheet mutation was applied because this Enhancement does not have a safe deterministic projection.');
  }
  function renderCsmInstances(card,ownership,roster){
    const host=card.querySelector('[id$="-abilities"]')||card,list=card.querySelector('[id$="-abilities"] .ability-list');if(!list)return;
    const block=root.document.createElement('section');block.className='content-block roster-instances';const heading=root.document.createElement('h4');heading.textContent='Roster instances';const rows=root.document.createElement('ul');block.append(heading,rows);
    for(const instance of ownership.instances){const assignments=instance.enhancements.map(entry=>({entry,resolution:resolveCsmItem(entry,roster)})),row=root.document.createElement('li');row.textContent=`${instance.label} / ${instance.points} pts / ${assignments.length?assignments.map(({entry,resolution})=>resolution.item?`${resolution.item.title} (${resolution.item.detachment})`:entry.name).join(', '):'No Enhancement assigned'}`;rows.append(row);for(const {entry,resolution} of assignments){const article=csmArticle(entry,resolution,`Assigned to ${instance.label}. This shared Datasheet card represents multiple roster units; presentation is instance-specific and no Datasheet mutation was applied.`);article.classList.add('roster-enhancement-instance');article.dataset.rosterInstance=instance.unit.id;list.append(article);}}
    if(ownership.unresolved.length)warning(block,'One or more roster Enhancements have an unresolved owner and were not assigned to an instance.');host.append(block);
  }
  function csmAssignments(roster,units){const unitIds=new Set((units||[]).map(unit=>unit.id));return(roster?.enhancements||[]).filter(entry=>entry.ownerStatus==='resolved'&&unitIds.has(entry.ownerUnitId)).map(entry=>({entry,...resolveCsmItem(entry,roster)}));}
  function decorateCsm(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item)applyCsmEffect(card,article,resolution.item,!Array.isArray(context.projectedEffects));list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function decorateSm(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item)applySmEffect(card,article,resolution.item,!Array.isArray(context.projectedEffects));list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function decorateDa(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item){const identity=`${resolution.item.detachmentId}|${resolution.item.ruleId}`,apply=!Array.isArray(context.projectedEffects);if(smFamilyEffect(resolution.item))applySmEffect(card,article,resolution.item,apply);else if(daEffects.has(identity))applyDaEffect(card,article,resolution.item,apply);}list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function applyBaEffect(card,article,item,applyEffects=true){
    if(!applyEffects)return;
    const effect=baEffects.get(`${item.detachmentId}|${item.ruleId}`);if(!effect)return;
    if(effect==='psychic-anti-reroll-damage'){
      const rows=weaponRows(card).filter(row=>[...row.querySelectorAll('.weapon-tags > *')].some(tag=>normalize(tag.textContent)==='psychic'));
      if(rows.length&&rows.every(row=>addWeaponTag(row,'ANTI-NON-MONSTER/VEHICLE 5+',effect)))article.dataset.rosterDerivedEffect=effect;else warning(article,'Effect could not be applied automatically because no structured Psychic weapon profiles were found.');return;
    }
    if(effect==='detection-range-minus-3'){derivedNote(article,effect,'Derived permanent ability: this unit has -3" detection range.');return;}
    if(effect==='melee-attacks-plus-2'){
      if(adjustWeapons(card,'melee',{A:2},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: +2 Attacks applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='melee-anti-chaos-lance'){
      if(tagWeapons(card,'melee','ANTI-CHAOS 5+',effect)&&tagWeapons(card,'melee','LANCE',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Anti-Chaos 5+ and Lance applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='save-2-weapons-ap-plus-1'){
      const save=setSmStat(card,'Sv','2+',effect),weapons=adjustWeapons(card,'',{AP:-1},effect);if(save&&weapons){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived Datasheet: Save 2+ and improved Armour Penetration applied to the bearer's weapons.");}else warning(article,'Effect could not be applied automatically because the Save characteristic or weapon profiles were not found.');return;
    }
    if(effect==='unit-scouts-6'||effect==='unit-scouts-6-battleshock-aura'){
      if(addSharedAbility(card,'Scouts 6"','core-scouts',effect))article.dataset.rosterDerivedEffect=effect;else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');
    }
  }
  function decorateBa(card,roster,units,context={}){
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];const ownership=resolveTauOwnership(roster,units);
    if(ownership.instances.length>1){renderCsmInstances(card,ownership,roster);return ownership.instances.flatMap(instance=>instance.enhancements);}
    for(const entry of ownership.cardEnhancements){const resolution=resolveCsmItem(entry,roster);if(list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))continue;const article=csmArticle(entry,resolution,resolution.item?'':'Exact Detachment-qualified Enhancement identity could not be resolved, so no rule was assigned.');if(resolution.item){const apply=!Array.isArray(context.projectedEffects);if(smFamilyEffect(resolution.item))applySmEffect(card,article,resolution.item,apply);else applyBaEffect(card,article,resolution.item,apply);}list.prepend(article);}
    for(const entry of ownership.unresolved){const article=csmArticle(entry,resolveCsmItem(entry,roster),'This Enhancement was not assigned because its owner could not be resolved to an exact roster unit.');if(!list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(entry.name))}"]`))list.prepend(article);}
    return ownership.cardEnhancements;
  }
  function applySmEffect(){return;}
  function applyDaEffect(card,article,item,applyEffects=true){
    if(!applyEffects)return;
    const effect=daEffects.get(`${item.detachmentId}|${item.ruleId}`),note=daNotes.get(effect);
    if(effect==='unit-scouts-9'){
      if(addSharedAbility(card,'Scouts 9"','core-scouts',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived ability: Scouts 9" applied to the bearer Datasheet only. No Bodyguard Datasheet is mutated without attachment evidence.');}
      else warning(article,'Effect could not be applied automatically because the Abilities block was not found.');return;
    }
    if(note){derivedNote(article,effect,note);return;}
    if(effect==='melee-precision'){
      if(tagWeapons(card,'melee','PRECISION',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Precision applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='plasma-range-plus-6'){
      const rows=weaponRows(card,'ranged').filter(row=>normalize(row.dataset.sourceField).includes('plasma'));
      if(adjustTyranidsRows(rows,{Range:6},effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,'Derived profiles: +6" Range applied only to plasma ranged weapons on this roster instance.');}else warning(article,'Effect could not be applied automatically because no structured plasma ranged weapon profiles were found.');return;
    }
    if(effect==='melee-lethal-hits-vowed-critical'){
      if(tagWeapons(card,'melee','LETHAL HITS',effect))article.dataset.rosterDerivedEffect=effect;else warning(article,'Effect could not be applied automatically because no melee weapon profiles were found.');return;
    }
    if(effect==='ranged-ignores-cover'){
      if(tagWeapons(card,'ranged','IGNORES COVER',effect)){article.dataset.rosterDerivedEffect=effect;derivedNote(article,effect,"Derived profiles: Ignores Cover applied to this exact owner's ranged weapons. No Bodyguard Datasheet is mutated without attachment evidence.");}else warning(article,'Effect could not be applied automatically because no ranged weapon profiles were found.');return;
    }
    if(effect==='melee-damage-plus-1'||effect==='melee-attacks-strength-damage-plus-1'||effect==='melee-strength-ap-damage'){
      const changes=effect==='melee-damage-plus-1'?{D:1}:effect==='melee-attacks-strength-damage-plus-1'?{A:1,S:1,D:1}:{S:2,AP:-1,D:1};
      if(adjustWeapons(card,'melee',changes,effect)){article.dataset.rosterDerivedEffect=effect;if(effect!=='melee-attacks-strength-damage-plus-1')derivedNote(article,effect,effect==='melee-damage-plus-1'?"Derived profiles: +1 Damage applied to the bearer's melee weapons.":"Derived profiles: +2 Strength, improved Armour Penetration and +1 Damage applied to the bearer's melee weapons.");}else warning(article,'Effect could not be applied automatically because one or more melee weapon characteristics were not found.');return;
    }
  }
  const conditional=kind=>({state:'conditional',certainty:'unknown',condition:{kind,state:'unknown'}});
  function structuredRecords(code,item,source){const output=[],add=(suffix,component,targetId,operation,detail={},state={})=>output.push({id:`${source.id}:${suffix}`,component,targetId,operation,...detail,...state,source,provenance:{rosterFact:'enhancement-owner'}}),ability=(suffix,title,summary=item.text||'',state={})=>add(suffix,'ability',suffix,'grant',{title,summary},state),weapon=(suffix,targetId,operation,detail,state={})=>add(suffix,'weapon',targetId,operation,detail,state),stat=(suffix,targetId,operation,value,state={})=>add(suffix,'stat',targetId,operation,operation==='set'?{to:value}:{delta:value},state),keyword=(suffix,title,operation='grant',state={})=>add(suffix,'keyword',title,operation,{},state),reference=(suffix,state={})=>add(suffix,'ability',source.id,'reference',{canonicalReference:{kind:'enhancement',id:source.id},state:'reference'},state);
    switch(code){
      case'detection-range-minus-3':ability(code,'Detection Range -3"');break;
      case'hit-plus-1':ability('ranged-hit-plus-1','Ranged Hit rolls +1');reference('conditional-wound-plus-1',conditional('battle-round'));break;
      case'ignores-cover':weapon(code,'ranged','grant-tag',{tag:'IGNORES COVER'});break;
      case'precision-devastating-wounds':weapon('precision','all','grant-tag',{tag:'PRECISION'});weapon('devastating-wounds','all','grant-tag',{tag:'DEVASTATING WOUNDS'});break;
      case'grenades-keyword':keyword(code,'GRENADES');break;
      case'modifier-immunity':ability(code,'Modifier immunity');break;
      case'move-plus-1':stat(code,'M','add',1);break;case'move-plus-2':case'move-plus-2-unit':stat(code,'M','add',2);break;case'move-plus-4':stat(code,'M','add',4);break;
      case'melee-strength-attacks-plus-1':weapon('strength','melee','add-stat',{stat:'S',delta:1});weapon('attacks','melee','add-stat',{stat:'A',delta:1});break;
      case'deep-strike-ignores-cover':ability('deep-strike','Deep Strike');weapon('ignores-cover','ranged','grant-tag',{tag:'IGNORES COVER'});break;
      case'sustained-hits-1':weapon(code,'all','grant-tag',{tag:'SUSTAINED HITS 1'});break;
      case'melee-strength-plus-1':weapon(code,'melee','add-stat',{stat:'S',delta:1});break;
      case'ranged-ap-plus-1':weapon(code,'ranged','add-stat',{stat:'AP',delta:-1});break;
      case'melee-attacks-damage-plus-1':weapon('attacks','melee','add-stat',{stat:'A',delta:1});weapon('damage','melee','add-stat',{stat:'D',delta:1});break;
      case'precision-vs-character':weapon('precision','melee','grant-tag',{tag:'PRECISION'});weapon('conditional-strength','melee','add-stat',{stat:'S',delta:1},conditional('target-keyword'));weapon('conditional-ap','melee','add-stat',{stat:'AP',delta:-1},conditional('target-keyword'));break;
      case'snap-shooting-protection':ability(code,'Snap-shooting protection');break;
      case'ranged-anti-character-2':weapon(code,'ranged','grant-tag',{tag:'ANTI-CHARACTER 2+'});break;
      case'invulnerable-save-4':ability(code,'Invulnerable Save 4+');break;
      case'melee-reroll-wounds-ap-plus-1':weapon('ap','melee','add-stat',{stat:'AP',delta:-1});reference('reroll-wounds');break;
      case'melee-hit-plus-1':ability(code,'Melee Hit rolls +1');break;
      case'synapse-melee-strength-ws-plus-1':keyword('synapse','SYNAPSE');weapon('strength','melee','add-stat',{stat:'S',delta:1});weapon('weapon-skill','melee','add-stat',{stat:'WS',delta:-1});break;
      case'feel-no-pain':ability('feel-no-pain-5','Feel No Pain 5+');reference('conditional-feel-no-pain-4',conditional('wounds-remaining'));break;
      case'oc-plus-3':stat(code,'OC','add',3);break;
      case'melee-strength-plus-1-conditional-attacks':weapon('strength','melee','add-stat',{stat:'S',delta:1});weapon('conditional-attacks','melee','add-stat',{stat:'A',delta:1},conditional('enemy-unit-destroyed'));break;
      case'stealth':ability(code,'Stealth');break;
      case'psychic-strength-ap-plus-1':weapon('strength','psychic','add-stat',{stat:'S',delta:1});weapon('ap','psychic','add-stat',{stat:'AP',delta:-1});break;
      case'psyker-psychic-weapons':keyword('psyker','PSYKER');weapon('psychic','all','grant-tag',{tag:'PSYCHIC'});break;
      case'melee-lance':weapon(code,'melee','grant-tag',{tag:'LANCE'});break;case'melee-precision':weapon(code,'melee','grant-tag',{tag:'PRECISION'});break;
      case'ability-range-plus-3':ability(code,'Ability ranges +3"');break;
      case'wounds-plus-1-feel-no-pain-5':stat('wounds','W','add',1);ability('feel-no-pain','Feel No Pain 5+');break;
      case'melee-ap-plus-1-precision':weapon('ap','melee','add-stat',{stat:'AP',delta:-1});weapon('precision','melee','grant-tag',{tag:'PRECISION'});break;
      case'stealth-lone-operative':ability('stealth','Stealth');ability('lone-operative','Lone Operative');break;
      case'anti-vehicle-fortification-4':weapon('anti-vehicle','all','grant-tag',{tag:'ANTI-VEHICLE 4+'});weapon('anti-fortification','all','grant-tag',{tag:'ANTI-FORTIFICATION 4+'});break;
      case'unit-invulnerable-save-5':ability(code,'Invulnerable Save 5+');break;
      case'daemon-melee-attacks-plus-1':keyword('daemon','DAEMON');weapon('attacks','melee','add-stat',{stat:'A',delta:1});break;
      case'weapons-attacks-strength-ap-plus-1':weapon('attacks','all','add-stat',{stat:'A',delta:1});weapon('strength','all','add-stat',{stat:'S',delta:1});weapon('ap','all','add-stat',{stat:'AP',delta:-1});weapon('conditional-damage','all','add-stat',{stat:'D',delta:1},conditional('set-up-from-reserves'));break;
      case'ranged-sustained-hits-1':weapon(code,'ranged','grant-tag',{tag:'SUSTAINED HITS 1'});break;case'ranged-ignores-cover':weapon(code,'ranged','grant-tag',{tag:'IGNORES COVER'});break;
      case'save-2-feel-no-pain-5':stat('save','Sv','set','2+');ability('feel-no-pain','Feel No Pain 5+');break;
      case'melee-strength-plus-3':weapon(code,'melee','add-stat',{stat:'S',delta:3});break;
      case'feel-no-pain-4':ability(code,'Feel No Pain 4+');break;
      case'reroll-damage-attacks':break;
      case'new-weapon-profile':add(code,'weapon','added-profile','grant-profile',{profile:item.profile||null});break;
      case'psychic-anti-reroll-damage':weapon('anti','psychic','grant-tag',{tag:'ANTI-NON-MONSTER/VEHICLE 5+'});reference('reroll-damage');break;
      case'melee-attacks-plus-2':weapon(code,'melee','add-stat',{stat:'A',delta:2});break;
      case'melee-anti-chaos-lance':weapon('anti-chaos','melee','grant-tag',{tag:'ANTI-CHAOS 5+'});weapon('lance','melee','grant-tag',{tag:'LANCE'});break;
      case'save-2-weapons-ap-plus-1':stat('save','Sv','set','2+');weapon('ap','all','add-stat',{stat:'AP',delta:-1});break;
      case'unit-scouts-6':ability(code,'Scouts 6"');break;case'unit-scouts-6-battleshock-aura':ability('scouts','Scouts 6"');reference('battleshock-aura',conditional('nearby-unit'));break;
      case'unit-scouts-9':ability(code,'Scouts 9"');break;
      case'plasma-range-plus-6':weapon(code,'plasma','add-stat',{stat:'Range',delta:6});break;
      case'melee-lethal-hits-vowed-critical':weapon('lethal-hits','melee','grant-tag',{tag:'LETHAL HITS'});reference('vowed-critical',conditional('vowed-objective-range'));break;
      case'melee-damage-plus-1':weapon(code,'melee','add-stat',{stat:'D',delta:1});break;
      case'melee-attacks-strength-damage-plus-1':weapon('attacks','melee','add-stat',{stat:'A',delta:1});weapon('strength','melee','add-stat',{stat:'S',delta:1});weapon('damage','melee','add-stat',{stat:'D',delta:1});reference('battleshocked-values',conditional('battle-shocked'));break;
      case'melee-strength-ap-damage':weapon('strength','melee','add-stat',{stat:'S',delta:2});weapon('ap','melee','add-stat',{stat:'AP',delta:-1});weapon('damage','melee','add-stat',{stat:'D',delta:1});break;
      default:{const unknown=/conditional|once|first-turn|early|strategic-reserves|setup/.test(code),state=unknown?conditional(code):{};ability(code,item.title,item.text||'Curated roster effect reference.',state);break;}
    }
    return output;
  }
  function structuredCode(item){const identity=`${item.detachmentId}|${item.ruleId||item.id}`,family=smFamilyEffect(item);if(family)return family;if(tauBook())return null;if(ecBook())return ecEffects.get(normalize(item.title));if(tyranidsBook())return tyranidsEffects.get(normalize(item.title));if(csmBook())return csmEffects.get(normalize(item.title));if(smBook())return smLocalEffect(item);if(daBook())return daEffects.get(identity);if(baBook())return baEffects.get(identity);return null;}
  function smAttachmentGroup(gameUnit,byInstance){let anchor=gameUnit;const leading=gameUnit?.attachments?.leading?.[0];if(!gameUnit?.attachments?.leaders?.length&&leading)anchor=byInstance?.get(leading.instanceId)||gameUnit;const members=anchor?.attachments?.leaders?.length?[anchor,...anchor.attachments.leaders.map(entry=>byInstance?.get(entry.instanceId)).filter(Boolean)]:[gameUnit];return{anchor,members:[...new Map(members.map(member=>[member.identity.instanceId,member])).values()]};}
  function smHasKeyword(gameUnit,keyword){return(gameUnit?.rosterState?.keywordProfile?.effective||[]).some(value=>normalize(value)===normalize(keyword));}
  function smScopeApplies(scope,current,owner,group){if(!scope)return false;if(scope==='owner')return current.identity.instanceId===owner.identity.instanceId;if(scope==='unit')return group.members.some(member=>member.identity.instanceId===owner.identity.instanceId);if(scope==='leading')return group.members.length>1&&group.members.some(member=>member.identity.instanceId===owner.identity.instanceId);if(scope==='bodyguard')return group.members.length>1&&current.identity.instanceId===group.anchor.identity.instanceId;if(scope==='owner-if-leading')return group.members.length>1&&current.identity.instanceId===owner.identity.instanceId;if(scope==='owner-or-battleline')return current.identity.instanceId===owner.identity.instanceId||(group.members.length>1&&smHasKeyword(current,'BATTLELINE'));return false;}
  function smOperationRecords(operations,source,prefix,group){const records=[];for(const [index,operation] of (operations||[]).entries()){if(operation.requiresUnitId&&!group.members.some(member=>member.identity.canonicalDatasheetId===operation.requiresUnitId))continue;const record={...operation};delete record.requiresUnitId;records.push({id:`${source.id}:${prefix}-${index+1}`,...record,source,provenance:{rosterFact:prefix}});}return records;}
  const smReferenceRecord=(kind,id,source,prefix)=>({id:`${source.id}:${prefix}`,component:'ability',targetId:id,operation:'reference',canonicalReference:{kind,id},state:'reference',source,provenance:{rosterFact:prefix}});
  function smConformanceEffects({gameUnit,byInstance,gameUnits,enhancements}){const output=[],bookId=smFamilyBookId();if(!bookId||!gameUnit)return output;const group=smAttachmentGroup(gameUnit,byInstance),current=gameUnit,selectedDetachments=[...new Set(current.rosterState?.detachments||[])];
    for(const resolution of enhancements||[]){const entry=resolution.input||{},canonical=resolution.catalog;if(selectedDetachments.length!==1||canonical?.detachmentId!==selectedDetachments[0]||entry.ownerStatus!=='resolved'||!entry.ownerUnitId||!canonical?.owner||!canonical?.assignment)continue;const owner=group.members.find(member=>member.identity.instanceId===entry.ownerUnitId);if(!owner)continue;const familySource=smFamilySourceId(canonical,bookId),familyIdentity=`${canonical.detachmentId||''}|${familySource||''}`,localIdentity=`${canonical.detachmentId||''}|${canonical.ruleId||canonical.id||''}`,family=familySource?smFamilyConformanceEnhancements.get(familyIdentity):null,local=smBook()?smLocalConformanceEnhancements.get(localIdentity):null,semantic=family||local;if(!semantic)continue;const sourceId=family?familySource:(canonical.ruleId||canonical.id),source={kind:'enhancement',id:sourceId,ownerInstanceId:owner.identity.instanceId};if(smScopeApplies(semantic.mutationScope,current,owner,group))output.push(...smOperationRecords(semantic.operations,source,'enhancement-owner',group));if(current.identity.instanceId!==owner.identity.instanceId&&smScopeApplies(semantic.referenceScope,current,owner,group))output.push(smReferenceRecord('enhancement',sourceId,source,'enhancement-reference'));
    }
    for(const [identity,semantic] of smAttachedAbilitySemantics){const separator=identity.indexOf('|'),sourceUnitId=identity.slice(0,separator),abilityId=identity.slice(separator+1),owner=group.members.find(member=>member.identity.canonicalDatasheetId===sourceUnitId);if(!owner||!owner.item?.catalogUnit?.gameSelections?.abilities?.some(ability=>ability.id===abilityId))continue;if(semantic.scope==='leading'&&group.members.length<2)continue;const source={kind:'explicit-attachment',id:abilityId,ownerInstanceId:owner.identity.instanceId};output.push(...smOperationRecords(semantic.operations,source,'explicit-attachment',group));if(current.identity.instanceId!==owner.identity.instanceId)output.push(smReferenceRecord('ability',abilityId,source,'ability-reference'));
    }
    for(const [identity,semantic] of smBodyguardAbilitySemantics){const separator=identity.indexOf('|'),sourceUnitId=identity.slice(0,separator),abilityId=identity.slice(separator+1);if(group.anchor.identity.canonicalDatasheetId!==sourceUnitId||!group.anchor.item?.catalogUnit?.gameSelections?.abilities?.some(ability=>ability.id===abilityId))continue;const source={kind:'explicit-attachment',id:abilityId,ownerInstanceId:group.anchor.identity.instanceId};output.push(...smOperationRecords(semantic.operations,source,'bodyguard-rule',group));if(current.identity.instanceId!==group.anchor.identity.instanceId)output.push(smReferenceRecord('ability',abilityId,source,'bodyguard-reference'));
    }
    for(const semantic of smRosterAbilityReferences){if(!semantic.targetUnitIds.includes(current.identity.canonicalDatasheetId))continue;const owner=(gameUnits||[]).find(member=>member.identity.canonicalDatasheetId===semantic.sourceUnitId);if(!owner)continue;const source={kind:'datasheet',id:semantic.abilityId,ownerInstanceId:owner.identity.instanceId};output.push(smReferenceRecord('ability',semantic.abilityId,source,'roster-ability-reference'));
    }
    if(smBook()&&current.identity.canonicalDatasheetId==='unit-kayvaan-shrike'){const aethon=(gameUnits||[]).find(member=>member.identity.canonicalDatasheetId==='unit-aethon-shaan');if(aethon){const source={kind:'datasheet',id:'space-marines-ability-chapter-master-of-the-raven-guard',ownerInstanceId:aethon.identity.instanceId};output.push(...smOperationRecords([{component:'ability',targetId:'core-lone-operative',title:'Lone Operative',operation:'remove'},{component:'keyword',targetId:'CHAPTER MASTER',operation:'remove'},{component:'keyword',targetId:'CAPTAIN',operation:'grant'}],source,'roster-unit-pair',group),smReferenceRecord('ability',source.id,source,'roster-unit-pair-reference'));}}
    if(selectedDetachments.length===1){for(const detachmentId of selectedDetachments){const id=String(detachmentId).replace(/^detachment-/,''),semantic=smDetachmentSemantics.get(id);if(!semantic||!semantic.predicate(current))continue;const source={kind:'detachment',id,ownerInstanceId:null};output.push(...smOperationRecords(semantic.operations,source,'selected-detachment',group),smReferenceRecord('detachment-rule',semantic.ruleId,source,'detachment-rule-reference'));}}
    for(const abilityId of current.selection?.loadout?.selectedWargearAbilityIds||[]){const operations=smWargearSemantics.get(abilityId);if(!operations)continue;const source={kind:'selected-wargear',id:abilityId,ownerInstanceId:current.identity.instanceId};output.push(...smOperationRecords(operations,source,'selected-wargear',group));}
    return output;
  }
  function gameEffects(context){const {item,gameUnit,enhancements}=context,output=smConformanceEffects(context),selectedDetachments=[...new Set(gameUnit?.rosterState?.detachments||[])];for(const resolution of enhancements||[]){const entry=resolution.input||{},canonical=resolution.catalog;if((smBook()||daBook()||baBook())&&(selectedDetachments.length!==1||canonical?.detachmentId!==selectedDetachments[0]))continue;if(entry.ownerStatus!=='resolved'||entry.ownerUnitId!==item.raw.id||!canonical)continue;const code=structuredCode(canonical);if(!code)continue;const source={kind:'enhancement',id:canonical.ruleId||canonical.id,ownerInstanceId:item.raw.id};output.push(...structuredRecords(code,canonical,source));}return output;}
  function decorate(card,roster,units,context={}){
    if(tauBook())return decorateTau(card,roster,units,context);
    if(ecBook())return decorateEc(card,roster,units,context);
    if(tyranidsBook())return decorateTyranids(card,roster,units,context);
    if(csmBook())return decorateCsm(card,roster,units,context);
    if(smBook())return decorateSm(card,roster,units,context);
    if(daBook())return decorateDa(card,roster,units,context);
    if(baBook())return decorateBa(card,roster,units,context);
    const list=card?.querySelector('[id$="-abilities"] .ability-list');if(!list)return[];
    const unitIds=new Set((units||[]).map(unit=>unit.id));
    const owned=(roster?.enhancements||[]).filter(item=>item.ownerStatus==='resolved'&&unitIds.has(item.ownerUnitId));
    for(const entry of owned){
      const item=catalog()[normalize(entry.name)];
      if(!item||list.querySelector(`[data-roster-enhancement="${CSS.escape(normalize(item.title))}"]`))continue;
      const article=document.createElement('article');article.className='ability roster-enhancement';article.dataset.rosterEnhancement=normalize(item.title);
      const title=document.createElement('h5');title.textContent=item.title;
      const cost=document.createElement('small');cost.className='roster-enhancement-cost';cost.hidden=item.value==null;
      cost.textContent=Number(entry.exportedCost)&&Number(entry.exportedCost)!==Number(item.value)?`${entry.exportedCost} pts in export · ${item.value} pts current`:`${item.value} pts included`;
      const text=document.createElement('p');text.textContent=item.text;
      article.append(title,cost,text);list.prepend(article);
    }
    return owned;
  }
  if(!root.WHBookRosterEnhancements?.registerProvider)throw new Error('Shared Roster Enhancement contract is unavailable');
  root.WHBookRosterEnhancements.registerProvider(Object.freeze({decorate,gameEffects,assignedRuleIds(roster,units){return csmBook()||smBook()||daBook()||baBook()?[...new Set(csmAssignments(roster,units).filter(item=>item.status==='resolved').map(item=>item.item.ruleId))]:[];},assignedRecords(roster,units){return daBook()?csmAssignments(roster,units).filter(item=>item.status==='resolved').map(item=>item.item):[];}}));
}(typeof window==='undefined'?globalThis:window));
