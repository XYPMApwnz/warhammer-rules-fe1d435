importScripts("./glossary/generated/cache-revision.js");
const CACHE_PREFIX = "warhammer-rules-fe1d435-";
const CACHE_NAME = `${CACHE_PREFIX}${self.WH40K_CACHE_REVISION || "fallback"}`;
const APP_SHELL_BATCH_SIZE = 4;
const LIBRARY_FALLBACK = "./index.html";
const ROSTER_GUIDES_FALLBACK = "./roster-guides/index.html";
const DEATH_GUARD_FALLBACK = "./books/death-guard/index.html";
const CORE_RULES_FALLBACK = "./books/core-rules/reader/index.html";
const ADEPTUS_MECHANICUS_FALLBACK = "./books/adeptus-mechanicus/index.html";
const TYRANIDS_ENTRY_FALLBACK = "./books/tyranids/index.html";
const TYRANIDS_DESKTOP_FALLBACK = "./books/tyranids/reader.html";
const TYRANIDS_MOBILE_FALLBACK = "./books/tyranids/mobile/index.html";
const TAU_EMPIRE_ENTRY_FALLBACK = "./books/tau-empire/index.html";
const TAU_EMPIRE_DESKTOP_FALLBACK = "./books/tau-empire/reader.html";
const TAU_EMPIRE_MOBILE_FALLBACK = "./books/tau-empire/mobile/index.html";
const CHAOS_SPACE_MARINES_ENTRY_FALLBACK = "./books/chaos-space-marines/index.html";
const CHAOS_SPACE_MARINES_DESKTOP_FALLBACK = "./books/chaos-space-marines/reader.html";
const CHAOS_SPACE_MARINES_MOBILE_FALLBACK = "./books/chaos-space-marines/mobile/index.html";
const BLOOD_ANGELS_ENTRY_FALLBACK = "./books/blood-angels/index.html";
const BLOOD_ANGELS_DESKTOP_FALLBACK = "./books/blood-angels/reader.html";
const BLOOD_ANGELS_MOBILE_FALLBACK = "./books/blood-angels/mobile/index.html";
const ORKS_FALLBACK = LIBRARY_FALLBACK;
const EMPERORS_CHILDREN_FALLBACK = "./books/emperors-children/index.html";
const SPACE_MARINES_FALLBACK = LIBRARY_FALLBACK;
const SPACE_MARINES_DESKTOP_FALLBACK = "./books/space-marines/reader.html";
const DARK_ANGELS_ENTRY_FALLBACK = "./books/dark-angels/index.html";
const DARK_ANGELS_DESKTOP_FALLBACK = "./books/dark-angels/reader.html";
const DARK_ANGELS_MOBILE_FALLBACK = "./books/dark-angels/mobile/index.html";
const APP_SHELL = [
  "./",
  LIBRARY_FALLBACK,
  "./roster-guides/",
  ROSTER_GUIDES_FALLBACK,
  "./roster-guides/points-data.js?v=9",
  "./roster-guides/points-validator.js?v=5",
  "./roster-guides/app.js?v=18",
  "./manifest.webmanifest",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/warhammer-40000-logo-optimized.png",
  "./assets/games-workshop-logo.png",
  "./assets/core-rules-cover-480.webp",
  "./assets/core-rules-cover-800.webp",
  "./assets/core-rules-cover-fallback.jpg",
  "./assets/core-rules-cover-thumb.jpg",
  "./assets/death-guard-cover-480.webp",
  "./assets/death-guard-cover-800.webp",
  "./assets/death-guard-cover-fallback.jpg",
  "./assets/death-guard-cover-thumb.jpg",
  "./assets/death-guard-cover.jpg",
  "./assets/adeptus-mechanicus-cover-480.webp",
  "./assets/adeptus-mechanicus-cover-800.webp",
  "./assets/adeptus-mechanicus-cover-fallback.jpg",
  "./assets/adeptus-mechanicus-cover-thumb.jpg",
  "./assets/tyranids-cover-480.webp",
  "./assets/tyranids-cover-800.webp",
  "./assets/tyranids-cover-fallback.jpg",
  "./assets/tyranids-cover-thumb.jpg",
  "./glossary/generated/cache-revision.js",
  "./glossary-return.js?v=5",
  "./glossary/",
  "./glossary/index.html",
  "./glossary/viewer.css?v=2",
  "./glossary/viewer-profiles.css?v=2",
  "./glossary/viewer-progressive.css?v=3",
  "./glossary/viewer-popup.css?v=1",
  "./glossary/viewer.js?v=13",
  "./books/death-guard/",
  DEATH_GUARD_FALLBACK,
  "./books/death-guard/reader.html",
  "./books/shared/styles/entry.css?v=2",
  "./books/shared/controllers/view-router.js?v=4",
  './books/death-guard/mobile/beasts-of-nurgle.html',
  './books/death-guard/mobile/great-unclean-one.html',
  './books/death-guard/mobile/nurglings.html',
  './books/death-guard/mobile/plague-drones.html',
  './books/death-guard/mobile/plaguebearers.html',
  './books/death-guard/mobile/rotigus.html',
  './books/emperors-children/mobile/shalaxi-helbane.html',
  './books/emperors-children/mobile/keeper-of-secrets.html',
  './books/emperors-children/mobile/daemonettes.html',
  './books/emperors-children/mobile/fiends.html',
  './books/emperors-children/mobile/seekers.html',

  "./books/death-guard/mobile/index.html",
  "./books/death-guard/mobile/related-rules.inc?v=4",
  "./books/shared/mobile-route-redirect.js?v=2",
  "./books/shared/navigation-targets.js?v=4",
  "./books/shared/popup-rule-actions.js?v=1",
  "./books/shared/datasheet-layout.js?v=10",
  "./books/shared/target-mount.js?v=2",
  "./books/shared/datasheet-system.css?v=8",
  "./books/shared/unit-art.css?v=1",
  "./books/shared/popup-content.js?v=3",
  "./books/shared/glossary-autolink.js?v=8",
  "./books/shared/rule-facts.js?v=5",
  "./books/core-rules/assets/diagrams/BattleShockExamples1.webp",
  "./books/core-rules/assets/diagrams/BattleShockExamples2.webp",
  "./books/core-rules/assets/diagrams/BattleShockExamples3.webp",
  "./books/core-rules/assets/diagrams/BattleShockExamples4.webp",
  "./books/core-rules/assets/diagrams/BenefitOfCover.webp",
  "./books/core-rules/assets/diagrams/ControllingATerrainObjective.webp",
  "./books/core-rules/assets/diagrams/DatasheetExample.webp",
  "./books/core-rules/assets/diagrams/EngagedMonstersVehiclesShooting.webp",
  "./books/core-rules/assets/diagrams/ex10.webp",
  "./books/core-rules/assets/diagrams/ex11.webp",
  "./books/core-rules/assets/diagrams/ex12.webp",
  "./books/core-rules/assets/diagrams/ex2.webp",
  "./books/core-rules/assets/diagrams/ex4.webp",
  "./books/core-rules/assets/diagrams/ex5.webp",
  "./books/core-rules/assets/diagrams/ex6.webp",
  "./books/core-rules/assets/diagrams/ex7.webp",
  "./books/core-rules/assets/diagrams/ex8.webp",
  "./books/core-rules/assets/diagrams/ex9.webp",
  "./books/core-rules/assets/diagrams/ExampleAction.webp",
  "./books/core-rules/assets/diagrams/HiddenAndObscuring.webp",
  "./books/core-rules/assets/diagrams/MakingAChargeMove.webp",
  "./books/core-rules/assets/diagrams/MakingASurgeMove.webp",
  "./books/core-rules/assets/diagrams/ModelFullyVisible.webp",
  "./books/core-rules/assets/diagrams/ModelVisible.webp",
  "./books/core-rules/assets/diagrams/NormalFight.webp",
  "./books/core-rules/assets/diagrams/ObjectiveConsolidation.webp",
  "./books/core-rules/assets/diagrams/OngoingConsolidation.webp",
  "./books/core-rules/assets/diagrams/OverrunFight.webp",
  "./books/core-rules/assets/diagrams/PileInMoves.webp",
  "./books/core-rules/assets/diagrams/PlungingFire.webp",
  "./books/core-rules/assets/diagrams/Solid.webp",
  "./books/core-rules/assets/diagrams/StartOfFightPhase.webp",
  "./books/core-rules/assets/diagrams/TakingToTheSkies.webp",
  "./books/core-rules/assets/diagrams/TerrainAndMovement.webp",
  "./books/core-rules/assets/diagrams/TerrainAndMovement2.webp",
  "./books/core-rules/assets/diagrams/TerrainPlacedOnAMat.webp",
  "./books/core-rules/assets/diagrams/TerrainPlacedOnTheBattlefield.webp",
  "./books/core-rules/assets/diagrams/UnitFullyVisible.webp",
  "./books/core-rules/assets/diagrams/UnitVisible.webp",
  "./books/shared/related-rules-matcher.js?v=6",
  "./books/shared/compatible-rules-matrix.mjs?v=2",
  "./books/shared/stratagem-presentation.mjs?v=1",
  "./books/shared/roster-entities.js?v=1",
  "./books/shared/roster-parser.js?v=2",
  "./books/shared/roster-enhancements.js?v=3",
  "./books/death-guard/assets/icon-v4.svg",
  "./books/shared/styles/tokens.css?v=11",
  "./books/shared/styles/layout.css?v=17",
  "./books/shared/styles/navigation.css?v=13",
  "./books/shared/styles/content.css?v=43",
  "./books/shared/styles/popups.css?v=19",
  "./books/shared/controllers/navigation-controller.js?v=24",
  "./books/death-guard/scripts/roster-semantics.js?v=2",
  "./books/death-guard/scripts/roster-data.js?v=3",
  "./books/death-guard/scripts/target-data.js?v=2",
  "./books/death-guard/scripts/roster-filter.js?v=28",
  "./books/shared/controllers/popup-controller.js?v=25",
  "./books/shared/controllers/full-entry-controller.js?v=9",
  "./books/shared/controllers/journey-controller.js?v=16",
  "./books/shared/controllers/ui-controllers.js?v=13",
  "./books/death-guard/scripts/app.js?v=48",
  "./books/death-guard/generated/compatible-rules.json",
  "./books/core-rules/",
  "./books/core-rules/index.html",
  CORE_RULES_FALLBACK,
  "./books/core-rules/reader/styles.css?v=14",
  "./books/core-rules/reader/app.js?v=14",
  "./books/core-rules/reader/search-index.json",
  "./books/core-rules/reader/introduction.html",
  "./books/core-rules/reader/core-concepts.html",
  "./books/core-rules/reader/datasheets.html",
  "./books/core-rules/reader/moving.html",
  "./books/core-rules/reader/making-attacks.html",
  "./books/core-rules/reader/attack-sequence.html",
  "./books/core-rules/reader/other-concepts.html",
  "./books/core-rules/reader/battle-round-overview.html",
  "./books/core-rules/reader/command-phase.html",
  "./books/core-rules/reader/movement-phase.html",
  "./books/core-rules/reader/shooting-phase.html",
  "./books/core-rules/reader/charge-phase.html",
  "./books/core-rules/reader/fight-phase.html",
  "./books/core-rules/reader/terrain.html",
  "./books/core-rules/reader/objectives.html",
  "./books/core-rules/reader/stratagems.html",
  "./books/core-rules/reader/actions.html",
  "./books/core-rules/reader/monsters-vehicles.html",
  "./books/core-rules/reader/transports.html",
  "./books/core-rules/reader/attached-units.html",
  "./books/core-rules/reader/strategic-reserves.html",
  "./books/core-rules/reader/flying-surging.html",
  "./books/core-rules/reader/other-rules-abilities.html",
  "./books/core-rules/reader/aircraft.html",
  "./books/core-rules/reader/core-abilities.html",
  "./books/core-rules/reader/muster-armies.html",
  "./books/adeptus-mechanicus/",
  ADEPTUS_MECHANICUS_FALLBACK,
  "./books/adeptus-mechanicus/reader.html",
  "./books/adeptus-mechanicus/mobile/index.html",
  "./books/adeptus-mechanicus/assets/mechanicus-logo.png",
  "./books/adeptus-mechanicus/assets/mechanicus-cover-800.webp",
  "./books/death-guard/assets/unit-images/beasts-of-nurgle.png",
  "./books/death-guard/assets/unit-images/chaos-land-raider.png",
  "./books/death-guard/assets/unit-images/chaos-predator-annihilator.png",
  "./books/death-guard/assets/unit-images/chaos-rhino.png",
  "./books/death-guard/assets/unit-images/chaos-spawn.png",
  "./books/death-guard/assets/unit-images/defiler.png",
  "./books/death-guard/assets/unit-images/great-unclean-one.png",
  "./books/death-guard/assets/unit-images/helbrute.png",
  "./books/death-guard/assets/unit-images/nurglings.png",
  "./books/death-guard/assets/unit-images/plague-drones.png",
  "./books/death-guard/assets/unit-images/plaguebearers.png",
  "./books/death-guard/assets/unit-images/rotigus.png",
  "./books/death-guard/assets/unit-images/biologus-putrifier.png",
  "./books/death-guard/assets/unit-images/blightlord-terminators.png",
  "./books/death-guard/assets/unit-images/deathshroud-terminators.png",
  "./books/death-guard/assets/unit-images/foetid-bloat-drone.png",
  "./books/death-guard/assets/unit-images/foul-blightspawn.png",
  "./books/death-guard/assets/unit-images/lord-of-virulence.png",
  "./books/death-guard/assets/unit-images/malignant-plaguecaster.png",
  "./books/death-guard/assets/unit-images/miasmic-malignifier.png",
  "./books/death-guard/assets/unit-images/plague-surgeon.png",
  "./books/death-guard/assets/unit-images/noxious-blightbringer.png",
  "./books/death-guard/assets/unit-images/icon-bearer.png",
  "./books/death-guard/assets/unit-images/lord-of-contagion.png",
  "./books/death-guard/assets/unit-images/lord-of-poxes.png",
  "./books/death-guard/assets/unit-images/mortarion.png",
  "./books/death-guard/assets/unit-images/myphitic-blight-hauler.png",
  "./books/death-guard/assets/unit-images/plague-marines.png",
  "./books/death-guard/assets/unit-images/plagueburst-crawler.png",
  "./books/death-guard/assets/unit-images/poxwalkers.png",
  "./books/death-guard/assets/unit-images/tallyman.png",
  "./books/death-guard/assets/unit-images/typhus.png",
  "./books/adeptus-mechanicus/assets/unit-images/thulia-ghuld.webp",
  "./books/adeptus-mechanicus/assets/unit-images/skitarii-rangers.webp",
  "./books/adeptus-mechanicus/assets/unit-images/onager-dunecrawler.webp",
  "./books/adeptus-mechanicus/assets/unit-images/belisarius-cawl-background.webp",
  "./books/adeptus-mechanicus/assets/unit-images/archaeopter-fusilave.webp",
  "./books/adeptus-mechanicus/assets/unit-images/archaeopter-stratoraptor.webp",
  "./books/adeptus-mechanicus/assets/unit-images/archaeopter-transvector.webp",
  "./books/adeptus-mechanicus/assets/unit-images/skitarii-marshal.webp",
  "./books/adeptus-mechanicus/assets/unit-images/skorpius-dunerider.webp",
  "./books/adeptus-mechanicus/assets/unit-images/sydonian-skatros.webp",
  "./books/adeptus-mechanicus/assets/unit-images/tech-priest-manipulus.webp",
  "./books/adeptus-mechanicus/assets/unit-images/technoarcheologist.webp",
  "./books/adeptus-mechanicus/assets/unit-images/serberys-raiders.webp",
  "./books/adeptus-mechanicus/assets/unit-images/serberys-sulphurhounds.webp",
  "./books/adeptus-mechanicus/assets/unit-images/skorpius-disintegrator.webp",
  "./books/adeptus-mechanicus/assets/unit-images/pteraxii-skystalkers.webp",
  "./books/adeptus-mechanicus/assets/unit-images/pteraxii-sterylizors.webp",
  "./books/adeptus-mechanicus/assets/unit-images/servitor-battleclade.webp",
  "./books/adeptus-mechanicus/assets/unit-images/skitarii-vanguard.webp",
  "./books/adeptus-mechanicus/assets/unit-images/sicarian-infiltrators.webp",
  "./books/adeptus-mechanicus/assets/unit-images/sicarian-ruststalkers.webp",
  "./books/adeptus-mechanicus/assets/unit-images/hastarii-fusiliers.webp",
  "./books/adeptus-mechanicus/assets/unit-images/ironstrider-ballistarii.webp",
  "./books/adeptus-mechanicus/assets/unit-images/sydonian-dragoons-with-taser-lances.webp",
  "./books/adeptus-mechanicus/assets/unit-images/tech-priest-dominus.webp",
  "./books/adeptus-mechanicus/assets/unit-images/tech-priest-enginseer.webp",
  "./books/adeptus-mechanicus/assets/unit-images/corpuscarii-electro-priests.webp",
  "./books/adeptus-mechanicus/assets/unit-images/hastarii-exterminators.webp",
  "./books/adeptus-mechanicus/assets/unit-images/kastelan-robots.webp",
  './books/adeptus-mechanicus/assets/unit-images/kataphron-destroyers.webp',
  './books/adeptus-mechanicus/assets/unit-images/kataphron-breachers.webp',
  './books/adeptus-mechanicus/assets/unit-images/fulgurite-electro-priests.webp',
  './books/adeptus-mechanicus/assets/unit-images/cybernetica-datasmith.webp',
  "./books/adeptus-mechanicus/assets/unit-images/sydonian-dragoons-with-radium-jezzails.webp",
  "./books/adeptus-mechanicus/styles/tokens.css?v=15",
  "./books/adeptus-mechanicus/styles/mechanicus.css?v=23",
  "./books/adeptus-mechanicus/scripts/data.js?v=1",
  "./books/adeptus-mechanicus/scripts/faction-ui.js?v=2",
  "./books/adeptus-mechanicus/mobile/related-rules.inc?v=4",
  "./books/adeptus-mechanicus/scripts/roster-enhancements.js?v=4",
  "./books/adeptus-mechanicus/scripts/roster-data.js?v=3",
  "./books/adeptus-mechanicus/scripts/target-data.js?v=2",
  "./books/adeptus-mechanicus/scripts/roster-filter.js?v=9",
  "./books/adeptus-mechanicus/generated/compatible-rules.json",
  "./books/adeptus-mechanicus/scripts/app.js?v=42"
  ,"./books/tyranids/"
  ,TYRANIDS_ENTRY_FALLBACK
  ,TYRANIDS_DESKTOP_FALLBACK
  ,TYRANIDS_MOBILE_FALLBACK
  ,"./books/tyranids/styles/tokens.css?v=3"
  ,"./books/tyranids/styles/book.css?v=4"
  ,"./books/tyranids/scripts/data.js?v=2"
  ,"./books/tyranids/scripts/roster-data.js?v=3"
  ,"./books/tyranids/scripts/target-data.js?v=2"
  ,"./books/tyranids/scripts/roster-filter.js?v=4"
  ,"./books/tyranids/scripts/stratagem-types.mjs?v=1"
  ,"./books/tyranids/generated/compatible-rules.json"
  ,"./books/tyranids/scripts/app.js?v=11"
  ,"./books/tyranids/mobile/related-rules.inc?v=4"
  ,"./glossary/generated/glossary.en.js?v=tyranids-1"
  ,"./books/tau-empire/"
  ,TAU_EMPIRE_ENTRY_FALLBACK
  ,TAU_EMPIRE_DESKTOP_FALLBACK
  ,TAU_EMPIRE_MOBILE_FALLBACK
  ,"./books/tau-empire/styles/tokens.css?v=3"
  ,"./books/tau-empire/styles/book.css?v=5"
  ,"./books/tau-empire/assets/tau-empire-cover-800.webp"
  ,"./books/tau-empire/scripts/data.js?v=2"
  ,"./books/tau-empire/scripts/app.js?v=13"
  ,"./books/tau-empire/scripts/stratagem-types.mjs?v=1"
  ,"./books/tau-empire/scripts/roster-filter.js?v=5"
  ,"./books/tau-empire/generated/compatible-rules.json"
  ,"./books/tau-empire/scripts/roster-data.js?v=3"
  ,"./books/tau-empire/scripts/target-data.js?v=2"
  ,"./books/tau-empire/mobile/related-rules.inc?v=2"
  ,"./books/shared/book-roster-enhancements.js?v=2"
  ,"./books/extensions/book-roster-enhancement-providers.js?v=1"
  ,"./books/chaos-space-marines/"
  ,CHAOS_SPACE_MARINES_ENTRY_FALLBACK
  ,CHAOS_SPACE_MARINES_DESKTOP_FALLBACK
  ,CHAOS_SPACE_MARINES_MOBILE_FALLBACK
  ,"./books/chaos-space-marines/styles/tokens.css?v=2"
  ,"./books/chaos-space-marines/styles/book.css?v=4"
  ,"./books/chaos-space-marines/assets/chaos-space-marines-cover-480.webp"
  ,"./books/chaos-space-marines/assets/chaos-space-marines-cover-800.webp"
  ,"./books/chaos-space-marines/scripts/data.js?v=2"
  ,"./books/chaos-space-marines/scripts/app.js?v=6"
  ,"./books/chaos-space-marines/scripts/roster-filter.js?v=3"
  ,"./books/chaos-space-marines/generated/compatible-rules.json"
  ,"./books/chaos-space-marines/scripts/roster-data.js?v=3"
  ,"./books/chaos-space-marines/scripts/target-data.js?v=2"
  ,"./books/chaos-space-marines/mobile/related-rules.inc?v=2"
  ,"./books/blood-angels/"
  ,BLOOD_ANGELS_ENTRY_FALLBACK
  ,BLOOD_ANGELS_DESKTOP_FALLBACK
  ,BLOOD_ANGELS_MOBILE_FALLBACK
  ,"./books/blood-angels/styles/tokens.css?v=2"
  ,"./books/blood-angels/styles/book.css?v=3"
  ,"./books/blood-angels/assets/blood-angels-cover-480.webp"
  ,"./books/blood-angels/assets/blood-angels-cover-800.webp"
  ,"./books/blood-angels/scripts/data.js?v=2"
  ,"./books/blood-angels/scripts/app.js?v=5"
  ,"./books/blood-angels/scripts/roster-filter.js?v=2"
  ,"./books/blood-angels/generated/compatible-rules.json"
  ,"./books/blood-angels/scripts/roster-data.js?v=3"
  ,"./books/blood-angels/scripts/target-data.js?v=2"
  ,"./books/blood-angels/mobile/related-rules.inc?v=2"
  ,"./books/orks/"
  ,"./books/orks/mobile/index.html"
  ,"./books/orks/styles/tokens.css?v=2"
  ,"./books/orks/styles/book.css?v=2"
  ,"./books/orks/scripts/app.js?v=2"
  ,"./books/emperors-children/"
  ,EMPERORS_CHILDREN_FALLBACK
  ,"./books/emperors-children/reader.html"
  ,"./books/emperors-children/mobile/index.html"
  ,"./books/emperors-children/styles/tokens.css?v=2"
  ,"./books/emperors-children/styles/book.css?v=4"
  ,"./books/emperors-children/assets/emperors-children-cover-480.webp"
  ,"./books/emperors-children/assets/emperors-children-cover-800.webp"
  ,"./books/emperors-children/scripts/data.js?v=2"
  ,"./books/emperors-children/scripts/roster-data.js?v=3"
  ,"./books/emperors-children/scripts/target-data.js?v=2"
  ,"./books/emperors-children/scripts/roster-filter.js?v=2"
  ,"./books/emperors-children/scripts/stratagem-types.mjs?v=2"
  ,"./books/emperors-children/generated/compatible-rules.json"
  ,"./books/emperors-children/mobile/related-rules.inc?v=2"
  ,"./books/emperors-children/scripts/app.js?v=8"
  ,"./books/space-marines/"
  ,SPACE_MARINES_DESKTOP_FALLBACK
  ,"./books/space-marines/mobile/index.html"
  ,"./books/space-marines/styles/tokens.css?v=3"
  ,"./books/space-marines/styles/book.css?v=4"
  ,"./books/space-marines/assets/space-marines-cover-480.webp"
  ,"./books/space-marines/assets/space-marines-cover-800.webp"
  ,"./books/space-marines/scripts/data.js?v=2"
  ,"./books/space-marines/scripts/roster-data.js?v=3"
  ,"./books/space-marines/scripts/target-data.js?v=2"
  ,"./books/space-marines/scripts/roster-filter.js?v=4"
  ,"./books/space-marines/scripts/app.js?v=9"
  ,"./books/space-marines/generated/compatible-rules.json"
  ,"./books/space-marines/mobile/related-rules.inc?v=4"
  ,"./books/dark-angels/"
  ,DARK_ANGELS_ENTRY_FALLBACK
  ,"./books/dark-angels/reader.html"
  ,DARK_ANGELS_MOBILE_FALLBACK
  ,"./books/dark-angels/mobile/related-rules.inc?v=3"
  ,"./books/dark-angels/styles/tokens.css?v=2"
  ,"./books/dark-angels/styles/book.css?v=4"
  ,"./books/dark-angels/assets/dark-angels-cover-480.webp"
  ,"./books/dark-angels/assets/dark-angels-cover-800.webp"
  ,"./books/dark-angels/scripts/data.js?v=2"
  ,"./books/dark-angels/scripts/roster-data.js?v=3"
  ,"./books/dark-angels/scripts/target-data.js?v=2"
  ,"./books/dark-angels/scripts/roster-filter.js?v=2"
  ,"./books/dark-angels/scripts/app.js?v=8"
  ,"./books/shared/modal-focus.js?v=1"
  ,"./books/shared/army-related-rules.js?v=18"
  ,"./books/shared/roster-context.js?v=3"
  ,"./books/shared/army-book-app.js?v=16"
  ,"./books/shared/offline-status.js?v=2"
  ,"./books/shared/styles/offline-status.css?v=1"
];

function navigationFallback(url) {
  const path = url.pathname;
  if (path.includes("/roster-guides/")) return ROSTER_GUIDES_FALLBACK;
  if (path.includes("/books/death-guard/")) return DEATH_GUARD_FALLBACK;
  if (path.includes("/books/core-rules/")) return CORE_RULES_FALLBACK;
  if (path.includes("/books/adeptus-mechanicus/")) return ADEPTUS_MECHANICUS_FALLBACK;
  if (path.includes("/books/tyranids/mobile/")) return TYRANIDS_MOBILE_FALLBACK;
  if (path.endsWith("/books/tyranids/reader.html")) return TYRANIDS_DESKTOP_FALLBACK;
  if (path.endsWith("/books/tyranids/") || path.endsWith("/books/tyranids/index.html")) return TYRANIDS_ENTRY_FALLBACK;
  if (path.includes("/books/tau-empire/mobile/")) return TAU_EMPIRE_MOBILE_FALLBACK;
  if (path.endsWith("/books/tau-empire/reader.html")) return TAU_EMPIRE_DESKTOP_FALLBACK;
  if (path.endsWith("/books/tau-empire/") || path.endsWith("/books/tau-empire/index.html")) return TAU_EMPIRE_ENTRY_FALLBACK;
  if (path.includes("/books/chaos-space-marines/mobile/")) return CHAOS_SPACE_MARINES_MOBILE_FALLBACK;
  if (path.endsWith("/books/chaos-space-marines/reader.html")) return CHAOS_SPACE_MARINES_DESKTOP_FALLBACK;
  if (path.endsWith("/books/chaos-space-marines/") || path.endsWith("/books/chaos-space-marines/index.html")) return CHAOS_SPACE_MARINES_ENTRY_FALLBACK;
  if (path.includes("/books/blood-angels/mobile/")) return BLOOD_ANGELS_MOBILE_FALLBACK;
  if (path.endsWith("/books/blood-angels/reader.html")) return BLOOD_ANGELS_DESKTOP_FALLBACK;
  if (path.endsWith("/books/blood-angels/") || path.endsWith("/books/blood-angels/index.html")) return BLOOD_ANGELS_ENTRY_FALLBACK;
  if (path.includes("/books/orks/")) return ORKS_FALLBACK;
  if (path.includes("/books/emperors-children/")) return EMPERORS_CHILDREN_FALLBACK;
  if (path.endsWith("/books/space-marines/reader.html")) return SPACE_MARINES_DESKTOP_FALLBACK;
  if (path.includes("/books/space-marines/")) return SPACE_MARINES_FALLBACK;
  if (path.includes("/books/dark-angels/mobile/")) return DARK_ANGELS_MOBILE_FALLBACK;
  if (path.endsWith("/books/dark-angels/reader.html")) return DARK_ANGELS_DESKTOP_FALLBACK;
  if (path.includes("/books/dark-angels/")) return DARK_ANGELS_ENTRY_FALLBACK;
  return LIBRARY_FALLBACK;
}

async function cacheAppShell() {
  const mode = self.registration.active ? "updating" : "preparing";
  let completed = 0;
  await setOfflinePackageStatus(mode, completed);
  const cache = await caches.open(CACHE_NAME);
  try {
    for (let index = 0; index < APP_SHELL.length; index += APP_SHELL_BATCH_SIZE) {
      const batch = APP_SHELL.slice(index, index + APP_SHELL_BATCH_SIZE);
      await Promise.all(batch.map((url) => cache.add(url)));
      completed += batch.length;
      if (completed < APP_SHELL.length) await setOfflinePackageStatus(mode, completed);
    }
  } catch (error) {
    await setOfflinePackageStatus("error", completed, error);
    throw error;
  }
  await setOfflinePackageStatus("ready", APP_SHELL.length);
}

const OFFLINE_PACKAGE_STATUS = "WH_OFFLINE_PACKAGE_STATUS";
const OFFLINE_PACKAGE_QUERY = "WH_OFFLINE_PACKAGE_STATUS_QUERY";
let offlinePackageStatus = {status: "idle", completed: 0, total: APP_SHELL.length, error: null};
function offlinePackagePayload() {return {type: OFFLINE_PACKAGE_STATUS, revision: self.WH40K_CACHE_REVISION, ...offlinePackageStatus};}
async function broadcastOfflinePackageStatus() {const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true}),payload=offlinePackagePayload();for(const client of clients)client.postMessage(payload);}
async function setOfflinePackageStatus(status,completed,error=null){offlinePackageStatus={status,completed,total:APP_SHELL.length,error:error?String(error.message||error):null};await broadcastOfflinePackageStatus();return offlinePackagePayload();}
async function currentOfflinePackageStatus(){
  if(offlinePackageStatus.status!=="idle")return offlinePackagePayload();
  const cache=await caches.open(CACHE_NAME),cached=new Set((await cache.keys()).map(request=>request.url));
  const completed=APP_SHELL.reduce((count,url)=>count+cached.has(new URL(url,self.location.href).href),0);
  offlinePackageStatus={status:completed===APP_SHELL.length?"ready":"error",completed,total:APP_SHELL.length,error:null};
  return offlinePackagePayload();
}
self.addEventListener("message",event=>{
  if(event.data?.type!==OFFLINE_PACKAGE_QUERY)return;
  event.waitUntil(currentOfflinePackageStatus().then(payload=>{if(event.ports[0])event.ports[0].postMessage(payload);else if(event.source)event.source.postMessage(payload);}));
});

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function fetchAndCache(request, cacheKey = request) {
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(cacheKey, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    const fallback = navigationFallback(url);
    const networkUpdate = fetchAndCache(request);
    event.respondWith(
      networkUpdate.catch(async () =>
        (await caches.match(request)) ||
        (await caches.match(request, {ignoreSearch: true})) ||
        caches.match(fallback)
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetchAndCache(request))
  );
});
