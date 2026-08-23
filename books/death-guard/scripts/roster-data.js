window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "death-guard",
    "title": "Death Guard",
    "factionKeyword": "DEATH GUARD",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-mortarion",
      "title": "Mortarion",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "PSYKER",
        "FLY",
        "EPIC HERO",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "PRIMARCH",
        "MORTARION",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-mortarion",
        "unitId": "unit-mortarion",
        "slug": "mortarion",
        "keywords": [
          "MONSTER",
          "CHARACTER",
          "PSYKER",
          "FLY",
          "EPIC HERO",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "PRIMARCH",
          "MORTARION",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "MONSTER",
          "CHARACTER",
          "PSYKER",
          "FLY",
          "EPIC HERO",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "PRIMARCH",
          "MORTARION",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Deep Strike",
          "Feel No Pain 5+",
          "Nurgle’s Gift (Aura)",
          "Lord of the Death Guard",
          "Host of Plagues",
          "Supreme Commander"
        ],
        "termIds": [
          "keyword-monster",
          "keyword-character",
          "keyword-psyker",
          "keyword-fly",
          "keyword-epic-hero",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-primarch",
          "keyword-mortarion",
          "keyword-death-guard",
          "ability-lord-of-the-death-guard-90db1c4",
          "ability-host-of-plagues-2f9d0aa",
          "weapon-lantern-c3a2ca6",
          "weapon-rotwind-6399c60",
          "weapon-silence-strike-11078ae",
          "weapon-silence-sweep-280acf3"
        ],
        "epic": true,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-typhus",
      "title": "Typhus",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "PSYKER",
        "EPIC HERO",
        "CHAOS",
        "NURGLE",
        "TERMINATOR",
        "TYPHUS",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-blightlord-terminators"
          },
          {
            "unitId": "unit-deathshroud-terminators"
          },
          {
            "unitId": "unit-poxwalkers"
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-typhus",
        "unitId": "unit-typhus",
        "slug": "typhus",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "PSYKER",
          "EPIC HERO",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "TYPHUS",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "PSYKER",
          "EPIC HERO",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "TYPHUS",
          "DEATH GUARD"
        ],
        "abilities": [
          "Deep Strike",
          "Leader",
          "Nurgle’s Gift (Aura)",
          "The Destroyer Hive",
          "Eater Plague (Psychic)"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-psyker",
          "keyword-epic-hero",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-terminator",
          "keyword-typhus",
          "keyword-death-guard",
          "ability-the-destroyer-hive-70f0cc1",
          "ability-eater-plague-psychic-2c7cc41",
          "weapon-lakrimae-strike-99d1d4f",
          "weapon-lakrimae-sweep-b7827b0"
        ],
        "epic": true,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-blightlord-terminators"
            },
            {
              "unitId": "unit-deathshroud-terminators"
            },
            {
              "unitId": "unit-poxwalkers"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-biologus-putrifier",
      "title": "Biologus Putrifier",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "BIOLOGUS PUTRIFIER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-biologus-putrifier",
        "unitId": "unit-biologus-putrifier",
        "slug": "biologus-putrifier",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "BIOLOGUS PUTRIFIER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "BIOLOGUS PUTRIFIER",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Foul Infusion",
          "Extraction of Fresh Disease"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-biologus-putrifier",
          "keyword-death-guard",
          "ability-foul-infusion-490467e",
          "ability-extraction-of-fresh-disease-b14e246",
          "weapon-hyper-blight-grenades-0322c28",
          "weapon-injector-pistol-25d0119",
          "weapon-plague-knives-1a37c6a"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-daemon-prince-of-nurgle",
      "title": "Daemon Prince of Nurgle",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "DAEMON PRINCE",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-daemon-prince-of-nurgle",
        "unitId": "unit-daemon-prince-of-nurgle",
        "slug": "daemon-prince-of-nurgle",
        "keywords": [
          "MONSTER",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DAEMON PRINCE",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "MONSTER",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DAEMON PRINCE",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Death Guard Defenders",
          "Fevered Strategist",
          "Miasma of Pestilence (Aura)"
        ],
        "termIds": [
          "keyword-monster",
          "keyword-character",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-daemon-prince",
          "keyword-death-guard",
          "ability-death-guard-defenders-c306937",
          "ability-fevered-strategist-9a8ed87",
          "ability-miasma-of-pestilence-aura-92fd75f",
          "weapon-infernal-cannon-1e13e5b",
          "weapon-hellforged-weapons-strike-edc19f1",
          "weapon-hellforged-weapons-sweep-5c45030"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-daemon-prince-of-nurgle-with-wings",
      "title": "Daemon Prince of Nurgle with Wings",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "FLY",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "DAEMON PRINCE WITH WINGS",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-daemon-prince-of-nurgle-with-wings",
        "unitId": "unit-daemon-prince-of-nurgle-with-wings",
        "slug": "daemon-prince-of-nurgle-with-wings",
        "keywords": [
          "MONSTER",
          "CHARACTER",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DAEMON PRINCE WITH WINGS",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "MONSTER",
          "CHARACTER",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DAEMON PRINCE WITH WINGS",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Deep Strike",
          "Nurgle’s Gift (Aura)",
          "Horrifying Visage",
          "Enfeebling Miasma (Aura)"
        ],
        "termIds": [
          "keyword-monster",
          "keyword-character",
          "keyword-fly",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-daemon-prince-with-wings",
          "keyword-death-guard",
          "ability-horrifying-visage-bfdb06a",
          "ability-enfeebling-miasma-aura-dba0eef",
          "weapon-infernal-cannon-09a5d9c",
          "weapon-hellforged-weapons-strike-edc19f1",
          "weapon-hellforged-weapons-sweep-5c45030"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-foul-blightspawn",
      "title": "Foul Blightspawn",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "FOUL BLIGHTSPAWN",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-foul-blightspawn",
        "unitId": "unit-foul-blightspawn",
        "slug": "foul-blightspawn",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "FOUL BLIGHTSPAWN",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "FOUL BLIGHTSPAWN",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Blinding Spray",
          "Putrefying Stink"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-foul-blightspawn",
          "keyword-death-guard",
          "ability-blinding-spray-7d189f5",
          "ability-putrefying-stink-4f5145b",
          "weapon-plague-sprayer-01c1e61",
          "weapon-close-combat-weapon-bc414e3"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-icon-bearer",
      "title": "Icon Bearer",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "ICON BEARER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-icon-bearer",
        "unitId": "unit-icon-bearer",
        "slug": "icon-bearer",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "ICON BEARER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "ICON BEARER",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Unclean Icon",
          "Blessed Icon of Disease"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-icon-bearer",
          "keyword-death-guard",
          "ability-unclean-icon-5dadb9e",
          "ability-blessed-icon-of-disease-e331a6c",
          "weapon-boltgun-ac624b6",
          "weapon-plague-knife-e275d62"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-lord-of-contagion",
      "title": "Lord of Contagion",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "TERMINATOR",
        "LORD OF CONTAGION",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-blightlord-terminators"
          },
          {
            "unitId": "unit-deathshroud-terminators"
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-lord-of-contagion",
        "unitId": "unit-lord-of-contagion",
        "slug": "lord-of-contagion",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "LORD OF CONTAGION",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "LORD OF CONTAGION",
          "DEATH GUARD"
        ],
        "abilities": [
          "Deep Strike",
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Vector of Disease",
          "Unholy Resilience"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-terminator",
          "keyword-lord-of-contagion",
          "keyword-death-guard",
          "ability-vector-of-disease-2498580",
          "ability-unholy-resilience-745069e",
          "weapon-manreaper-strike-cbe183b",
          "weapon-manreaper-sweep-b4c76ef"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-blightlord-terminators"
            },
            {
              "unitId": "unit-deathshroud-terminators"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-lord-of-poxes",
      "title": "Lord of Poxes",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "LORD OF POXES",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-lord-of-poxes",
        "unitId": "unit-lord-of-poxes",
        "slug": "lord-of-poxes",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "LORD OF POXES",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "LORD OF POXES",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Gift of Poxes",
          "Shroud of Disease"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-lord-of-poxes",
          "keyword-death-guard",
          "ability-gift-of-poxes-29d6059",
          "ability-shroud-of-disease-90475da",
          "weapon-plasma-pistol-standard-95a88d7",
          "weapon-plasma-pistol-supercharge-f0893d1",
          "weapon-great-plague-blade-7db21af"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-lord-of-virulence",
      "title": "Lord of Virulence",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "CHAOS",
        "NURGLE",
        "TERMINATOR",
        "LORD OF VIRULENCE",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-blightlord-terminators"
          },
          {
            "unitId": "unit-deathshroud-terminators"
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-lord-of-virulence",
        "unitId": "unit-lord-of-virulence",
        "slug": "lord-of-virulence",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "LORD OF VIRULENCE",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "LORD OF VIRULENCE",
          "DEATH GUARD"
        ],
        "abilities": [
          "Deep Strike",
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Virulent Aura",
          "Blight Bombardment"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-terminator",
          "keyword-lord-of-virulence",
          "keyword-death-guard",
          "ability-virulent-aura-c28aa51",
          "ability-blight-bombardment-74bfb5b",
          "weapon-twin-plague-spewer-4c289ca",
          "weapon-power-fist-5e121c4"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-blightlord-terminators"
            },
            {
              "unitId": "unit-deathshroud-terminators"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-malignant-plaguecaster",
      "title": "Malignant Plaguecaster",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "PSYKER",
        "CHAOS",
        "NURGLE",
        "MALIGNANT PLAGUECASTER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          },
          {
            "unitId": "unit-poxwalkers"
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-malignant-plaguecaster",
        "unitId": "unit-malignant-plaguecaster",
        "slug": "malignant-plaguecaster",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "MALIGNANT PLAGUECASTER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "MALIGNANT PLAGUECASTER",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Gift of Contagion (Psychic)",
          "Pestilent Fallout (Psychic)"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-psyker",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-malignant-plaguecaster",
          "keyword-death-guard",
          "ability-gift-of-contagion-psychic-4fea300",
          "ability-pestilent-fallout-psychic-399986c",
          "weapon-bolt-pistol-4457cbc",
          "weapon-plague-wind-witchfire-9c986c4",
          "weapon-plague-wind-focused-witchfire-6ca78d4",
          "weapon-corrupted-staff-4829d29"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            },
            {
              "unitId": "unit-poxwalkers"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-noxious-blightbringer",
      "title": "Noxious Blightbringer",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "CHAOS",
        "NURGLE",
        "NOXIOUS BLIGHTBRINGER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          },
          {
            "unitId": "unit-poxwalkers"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          },
          {
            "unitId": "unit-poxwalkers"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-noxious-blightbringer",
        "unitId": "unit-noxious-blightbringer",
        "slug": "noxious-blightbringer",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "NOXIOUS BLIGHTBRINGER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "NOXIOUS BLIGHTBRINGER",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Sickening Vitality",
          "Tocsin of Misery (Aura)"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-noxious-blightbringer",
          "keyword-death-guard",
          "ability-sickening-vitality-89bb5ff",
          "ability-tocsin-of-misery-aura-7f2edfb",
          "weapon-plasma-pistol-standard-4eac6a8",
          "weapon-plasma-pistol-supercharge-16a6bac",
          "weapon-cursed-plague-bell-f7341e3"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            },
            {
              "unitId": "unit-poxwalkers"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            },
            {
              "unitId": "unit-poxwalkers"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-plague-surgeon",
      "title": "Plague Surgeon",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "CHAOS",
        "NURGLE",
        "PLAGUE SURGEON",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-plague-surgeon",
        "unitId": "unit-plague-surgeon",
        "slug": "plague-surgeon",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "PLAGUE SURGEON",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "PLAGUE SURGEON",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Tainted Narthecium",
          "Inflamed Infections"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-plague-surgeon",
          "keyword-death-guard",
          "ability-tainted-narthecium-01ba1bd",
          "ability-inflamed-infections-ca01e1a",
          "weapon-bolt-pistol-4457cbc",
          "weapon-balesword-682b3cf"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-tallyman",
      "title": "Tallyman",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHARACTER",
        "CHAOS",
        "NURGLE",
        "TALLYMAN",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canSupport": [
          {
            "unitId": "unit-plague-marines"
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-tallyman",
        "unitId": "unit-tallyman",
        "slug": "tallyman",
        "keywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "TALLYMAN",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHARACTER",
          "CHAOS",
          "NURGLE",
          "TALLYMAN",
          "DEATH GUARD"
        ],
        "abilities": [
          "Leader",
          "Nurgle’s Gift (Aura)",
          "Malicious Calculations",
          "Sevenfold Chant"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-character",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-tallyman",
          "keyword-death-guard",
          "ability-malicious-calculations-8505f03",
          "ability-sevenfold-chant-15ec601",
          "weapon-plasma-pistol-standard-4eac6a8",
          "weapon-plasma-pistol-supercharge-950c822",
          "weapon-close-combat-weapon-bc414e3"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canSupport": [
            {
              "unitId": "unit-plague-marines"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-plague-marines",
      "title": "Plague Marines",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "BATTLELINE",
        "GRENADES",
        "CHAOS",
        "NURGLE",
        "PLAGUE MARINES",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-biologus-putrifier"
          },
          {
            "unitId": "unit-foul-blightspawn"
          },
          {
            "unitId": "unit-icon-bearer"
          },
          {
            "unitId": "unit-lord-of-poxes"
          },
          {
            "unitId": "unit-malignant-plaguecaster"
          },
          {
            "unitId": "unit-noxious-blightbringer"
          },
          {
            "unitId": "unit-plague-surgeon"
          },
          {
            "unitId": "unit-tallyman"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-biologus-putrifier"
          },
          {
            "unitId": "unit-foul-blightspawn"
          },
          {
            "unitId": "unit-icon-bearer"
          },
          {
            "unitId": "unit-noxious-blightbringer"
          },
          {
            "unitId": "unit-plague-surgeon"
          },
          {
            "unitId": "unit-tallyman"
          }
        ]
      },
      "ruleFacts": {
        "id": "unit-plague-marines",
        "unitId": "unit-plague-marines",
        "slug": "plague-marines",
        "keywords": [
          "INFANTRY",
          "BATTLELINE",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "PLAGUE MARINES",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "BATTLELINE",
          "GRENADES",
          "CHAOS",
          "NURGLE",
          "PLAGUE MARINES",
          "DEATH GUARD"
        ],
        "abilities": [
          "Nurgle’s Gift (Aura)",
          "Infused with the Blessings of Nurgle"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-battleline",
          "keyword-grenades",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-plague-marines",
          "keyword-death-guard",
          "ability-infused-with-the-blessings-of-nurgle-577c42e",
          "weapon-blight-launcher-6d713e8",
          "weapon-boltgun-ac624b6",
          "weapon-bolt-pistol-4457cbc",
          "weapon-meltagun-e6c3ed9",
          "weapon-plague-belcher-2667b3d",
          "weapon-plague-spewer-3ffad7c",
          "weapon-plasma-gun-standard-991cca1",
          "weapon-plasma-gun-supercharge-e705c11",
          "weapon-plasma-pistol-standard-4eac6a8",
          "weapon-plasma-pistol-supercharge-950c822",
          "weapon-bubotic-weapons-479658b",
          "weapon-heavy-plague-weapon-b16b375",
          "weapon-plague-knives-d66e964",
          "weapon-power-fist-d333c11"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-biologus-putrifier"
            },
            {
              "unitId": "unit-foul-blightspawn"
            },
            {
              "unitId": "unit-icon-bearer"
            },
            {
              "unitId": "unit-lord-of-poxes"
            },
            {
              "unitId": "unit-malignant-plaguecaster"
            },
            {
              "unitId": "unit-noxious-blightbringer"
            },
            {
              "unitId": "unit-plague-surgeon"
            },
            {
              "unitId": "unit-tallyman"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-biologus-putrifier"
            },
            {
              "unitId": "unit-foul-blightspawn"
            },
            {
              "unitId": "unit-icon-bearer"
            },
            {
              "unitId": "unit-noxious-blightbringer"
            },
            {
              "unitId": "unit-plague-surgeon"
            },
            {
              "unitId": "unit-tallyman"
            }
          ]
        }
      }
    },
    {
      "id": "unit-blightlord-terminators",
      "title": "Blightlord Terminators",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHAOS",
        "NURGLE",
        "TERMINATOR",
        "BLIGHTLORD TERMINATORS",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lord-of-contagion"
          },
          {
            "unitId": "unit-lord-of-virulence"
          },
          {
            "unitId": "unit-typhus"
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-blightlord-terminators",
        "unitId": "unit-blightlord-terminators",
        "slug": "blightlord-terminators",
        "keywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "BLIGHTLORD TERMINATORS",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "BLIGHTLORD TERMINATORS",
          "DEATH GUARD"
        ],
        "abilities": [
          "Deep Strike",
          "Nurgle’s Gift (Aura)",
          "Blistering Fusillade"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-terminator",
          "keyword-blightlord-terminators",
          "keyword-death-guard",
          "ability-blistering-fusillade-01dcc5c",
          "weapon-blight-launcher-6d713e8",
          "weapon-combi-bolter-5d7d99e",
          "weapon-combi-weapon-b2eeb14",
          "weapon-plague-spewer-3ffad7c",
          "weapon-reaper-autocannon-1a3732e",
          "weapon-bubotic-blade-4f09d5f",
          "weapon-close-combat-weapon-55bc2e9",
          "weapon-flail-of-corruption-f6b2430"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-lord-of-contagion"
            },
            {
              "unitId": "unit-lord-of-virulence"
            },
            {
              "unitId": "unit-typhus"
            }
          ],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-deathshroud-terminators",
      "title": "Deathshroud Terminators",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHAOS",
        "NURGLE",
        "TERMINATOR",
        "DEATHSHROUD TERMINATORS",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lord-of-contagion"
          },
          {
            "unitId": "unit-lord-of-virulence"
          },
          {
            "unitId": "unit-typhus"
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-deathshroud-terminators",
        "unitId": "unit-deathshroud-terminators",
        "slug": "deathshroud-terminators",
        "keywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "DEATHSHROUD TERMINATORS",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "TERMINATOR",
          "DEATHSHROUD TERMINATORS",
          "DEATH GUARD"
        ],
        "abilities": [
          "Deep Strike",
          "Nurgle’s Gift (Aura)",
          "Silent Bodyguard",
          "Death Approaches"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-terminator",
          "keyword-deathshroud-terminators",
          "keyword-death-guard",
          "ability-silent-bodyguard-03a0a1b",
          "ability-death-approaches-3347016",
          "weapon-plaguespurt-gauntlet-5d2f8e8",
          "weapon-manreaper-strike-6cc8ecd",
          "weapon-manreaper-sweep-22f036f"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-lord-of-contagion"
            },
            {
              "unitId": "unit-lord-of-virulence"
            },
            {
              "unitId": "unit-typhus"
            }
          ],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-poxwalkers",
      "title": "Poxwalkers",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "CHAOS",
        "NURGLE",
        "POXWALKERS",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-malignant-plaguecaster"
          },
          {
            "unitId": "unit-noxious-blightbringer"
          },
          {
            "unitId": "unit-typhus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-noxious-blightbringer"
          }
        ]
      },
      "ruleFacts": {
        "id": "unit-poxwalkers",
        "unitId": "unit-poxwalkers",
        "slug": "poxwalkers",
        "keywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "POXWALKERS",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "CHAOS",
          "NURGLE",
          "POXWALKERS",
          "DEATH GUARD"
        ],
        "abilities": [
          "Infiltrators",
          "Feel No Pain 5+",
          "Nurgle’s Gift (Aura)",
          "Curse of the Walking Pox"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-poxwalkers",
          "keyword-death-guard",
          "ability-curse-of-the-walking-pox-6a9093e",
          "weapon-improvised-weapon-46cfc5f"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": null,
        "attachmentKnown": false,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-malignant-plaguecaster"
            },
            {
              "unitId": "unit-noxious-blightbringer"
            },
            {
              "unitId": "unit-typhus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-noxious-blightbringer"
            }
          ]
        }
      }
    },
    {
      "id": "unit-chaos-spawn",
      "title": "Chaos Spawn",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "BEAST",
        "CHAOS",
        "NURGLE",
        "CHAOS SPAWN",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-chaos-spawn",
        "unitId": "unit-chaos-spawn",
        "slug": "chaos-spawn",
        "keywords": [
          "BEAST",
          "CHAOS",
          "NURGLE",
          "CHAOS SPAWN",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "BEAST",
          "CHAOS",
          "NURGLE",
          "CHAOS SPAWN",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Feel No Pain 5+",
          "Scouts 6\"",
          "Nurgle’s Gift (Aura)",
          "Lethal Ichor"
        ],
        "termIds": [
          "keyword-beast",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-chaos-spawn",
          "keyword-death-guard",
          "ability-lethal-ichor-6824af1",
          "weapon-hideous-mutations-5a8e226"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-chaos-land-raider",
      "title": "Chaos Land Raider",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "TRANSPORT",
        "SMOKE",
        "CHAOS",
        "NURGLE",
        "LAND RAIDER",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-chaos-land-raider",
        "unitId": "unit-chaos-land-raider",
        "slug": "chaos-land-raider",
        "keywords": [
          "VEHICLE",
          "TRANSPORT",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "LAND RAIDER",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "TRANSPORT",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "LAND RAIDER",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Assault Ramp"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-transport",
          "keyword-smoke",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-land-raider",
          "keyword-frame",
          "keyword-death-guard",
          "ability-assault-ramp-e5223e4",
          "weapon-combi-bolter-5d7d99e",
          "weapon-combi-weapon-b2eeb14",
          "weapon-havoc-launcher-cf26557",
          "weapon-soulshatter-lascannon-e64b490",
          "weapon-twin-heavy-bolter-b1e2633",
          "weapon-armoured-tracks-ddf575f"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-chaos-predator-annihilator",
      "title": "Chaos Predator Annihilator",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "SMOKE",
        "CHAOS",
        "NURGLE",
        "PREDATOR ANNIHILATOR",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-chaos-predator-annihilator",
        "unitId": "unit-chaos-predator-annihilator",
        "slug": "chaos-predator-annihilator",
        "keywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "PREDATOR ANNIHILATOR",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "PREDATOR ANNIHILATOR",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Metalophagic Infection"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-smoke",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-predator-annihilator",
          "keyword-frame",
          "keyword-death-guard",
          "ability-metalophagic-infection-7a47e75",
          "weapon-combi-bolter-5d7d99e",
          "weapon-combi-weapon-b2eeb14",
          "weapon-heavy-bolter-f39583a",
          "weapon-havoc-launcher-cf26557",
          "weapon-lascannon-bfd40c1",
          "weapon-predator-twin-lascannon-92dd066",
          "weapon-armoured-tracks-a6a4ba9"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-chaos-predator-destructor",
      "title": "Chaos Predator Destructor",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "SMOKE",
        "CHAOS",
        "NURGLE",
        "PREDATOR DESTRUCTOR",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-chaos-predator-destructor",
        "unitId": "unit-chaos-predator-destructor",
        "slug": "chaos-predator-destructor",
        "keywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "PREDATOR DESTRUCTOR",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "PREDATOR DESTRUCTOR",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Hail of Corrosive Disease"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-smoke",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-predator-destructor",
          "keyword-frame",
          "keyword-death-guard",
          "ability-hail-of-corrosive-disease-0f6451f",
          "weapon-combi-bolter-5d7d99e",
          "weapon-combi-weapon-b2eeb14",
          "weapon-havoc-launcher-cf26557",
          "weapon-heavy-bolter-f39583a",
          "weapon-lascannon-bfd40c1",
          "weapon-predator-autocannon-c571572",
          "weapon-armoured-tracks-a6a4ba9"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-defiler",
      "title": "Defiler",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "WALKER",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "DEFILER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-defiler",
        "unitId": "unit-defiler",
        "slug": "defiler",
        "keywords": [
          "VEHICLE",
          "WALKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DEFILER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "WALKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "DEFILER",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Scuttling Walker",
          "Barrage of Filth"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-walker",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-defiler",
          "keyword-death-guard",
          "ability-scuttling-walker-cb4a0c4",
          "ability-barrage-of-filth-f33e996",
          "weapon-ectoplasma-destructor-e0da30e",
          "weapon-excruciator-cannon-f11eadc",
          "weapon-hades-battle-cannon-1f93c08",
          "weapon-hades-lascannon-19b7d63",
          "weapon-heavy-baleflamer-2c0f38e",
          "weapon-heavy-missile-launcher-krak-d745166",
          "weapon-heavy-missile-launcher-frag-2d0854e",
          "weapon-heavy-reaper-autocannon-ca7d571",
          "weapon-magma-cutters-4ae88f3",
          "weapon-electroscourge-e76631b",
          "weapon-shearing-claws-strike-f6ebe2b",
          "weapon-shearing-claws-sweep-8074872"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-foetid-bloat-drone",
      "title": "Foetid Bloat-drone",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "FLY",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "FOETID BLOAT-DRONE",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-foetid-bloat-drone",
        "unitId": "unit-foetid-bloat-drone",
        "slug": "foetid-bloat-drone",
        "keywords": [
          "VEHICLE",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "FOETID BLOAT-DRONE",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "FOETID BLOAT-DRONE",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Hovering Death"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-fly",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-foetid-bloat-drone",
          "keyword-death-guard",
          "ability-hovering-death-805d057",
          "weapon-plaguespitter-e03b003",
          "weapon-fleshmower-0333b70",
          "weapon-plague-probe-994d32e"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-foetid-bloat-drone-with-heavy-blight-launcher",
      "title": "Foetid Bloat-drone with Heavy Blight Launcher",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "FLY",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "FOETID BLOAT-DRONE WITH HEAVY BLIGHT LAUNCHER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-foetid-bloat-drone-with-heavy-blight-launcher",
        "unitId": "unit-foetid-bloat-drone-with-heavy-blight-launcher",
        "slug": "foetid-bloat-drone-with-heavy-blight-launcher",
        "keywords": [
          "VEHICLE",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "FOETID BLOAT-DRONE WITH HEAVY BLIGHT LAUNCHER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "FOETID BLOAT-DRONE WITH HEAVY BLIGHT LAUNCHER",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Explosive Blight"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-fly",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-foetid-bloat-drone-with-heavy-blight-launcher",
          "keyword-death-guard",
          "ability-explosive-blight-4fe2f2d",
          "weapon-heavy-blight-launcher-989ddb7",
          "weapon-plague-probe-994d32e"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-helbrute",
      "title": "Helbrute",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "WALKER",
        "CHAOS",
        "NURGLE",
        "HELBRUTE",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-helbrute",
        "unitId": "unit-helbrute",
        "slug": "helbrute",
        "keywords": [
          "VEHICLE",
          "WALKER",
          "CHAOS",
          "NURGLE",
          "HELBRUTE",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "WALKER",
          "CHAOS",
          "NURGLE",
          "HELBRUTE",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Diseased Malice",
          "Froth-spattered Frenzy"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-walker",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-helbrute",
          "keyword-death-guard",
          "ability-diseased-malice-caa33aa",
          "ability-froth-spattered-frenzy-9a139e5",
          "weapon-combi-bolter-5d7d99e",
          "weapon-heavy-flamer-8e6845a",
          "weapon-missile-launcher-frag-929c5f9",
          "weapon-missile-launcher-krak-3cfbee3",
          "weapon-multi-melta-6f250da",
          "weapon-plasma-cannon-c68bff5",
          "weapon-twin-autocannon-76385f7",
          "weapon-twin-heavy-bolter-b1e2633",
          "weapon-twin-lascannon-8f8b5f4",
          "weapon-close-combat-weapon-f69dc30",
          "weapon-helbrute-fist-02e7ba7",
          "weapon-helbrute-hammer-97d2de3",
          "weapon-power-scourge-92cea25"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-myphitic-blight-hauler",
      "title": "Myphitic Blight-hauler",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "SMOKE",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "MYPHITIC BLIGHT-HAULER",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-myphitic-blight-hauler",
        "unitId": "unit-myphitic-blight-hauler",
        "slug": "myphitic-blight-hauler",
        "keywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "MYPHITIC BLIGHT-HAULER",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "MYPHITIC BLIGHT-HAULER",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Tank Hunters"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-smoke",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-myphitic-blight-hauler",
          "keyword-death-guard",
          "ability-tank-hunters-8831aae",
          "weapon-bile-spurt-507565f",
          "weapon-missile-launcher-frag-929c5f9",
          "weapon-missile-launcher-krak-3cfbee3",
          "weapon-multi-melta-6f250da",
          "weapon-gnashing-maw-f34ed82"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-plagueburst-crawler",
      "title": "Plagueburst Crawler",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "PLAGUEBURST CRAWLER",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-plagueburst-crawler",
        "unitId": "unit-plagueburst-crawler",
        "slug": "plagueburst-crawler",
        "keywords": [
          "VEHICLE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "PLAGUEBURST CRAWLER",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "PLAGUEBURST CRAWLER",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Spore-laced Shock Waves"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-plagueburst-crawler",
          "keyword-frame",
          "keyword-death-guard",
          "ability-spore-laced-shock-waves-bc0251b",
          "weapon-entropy-cannon-2ed707e",
          "weapon-heavy-slugger-f2c1c85",
          "weapon-plagueburst-mortar-fef92be",
          "weapon-plaguespitter-e03b003",
          "weapon-rothail-volley-gun-e8d55b7",
          "weapon-armoured-tracks-a6a4ba9"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-chaos-rhino",
      "title": "Chaos Rhino",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "VEHICLE",
        "SMOKE",
        "CHAOS",
        "NURGLE",
        "TRANSPORT",
        "DEDICATED TRANSPORT",
        "RHINO",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-chaos-rhino",
        "unitId": "unit-chaos-rhino",
        "slug": "chaos-rhino",
        "keywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "TRANSPORT",
          "DEDICATED TRANSPORT",
          "RHINO",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "VEHICLE",
          "SMOKE",
          "CHAOS",
          "NURGLE",
          "TRANSPORT",
          "DEDICATED TRANSPORT",
          "RHINO",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Firing Deck 2",
          "Nurgle’s Gift (Aura)",
          "Fire Support"
        ],
        "termIds": [
          "keyword-vehicle",
          "keyword-smoke",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-transport",
          "keyword-dedicated-transport",
          "keyword-rhino",
          "keyword-frame",
          "keyword-death-guard",
          "ability-fire-support-b0918db",
          "weapon-combi-bolter-5d7d99e",
          "weapon-combi-weapon-b2eeb14",
          "weapon-havoc-launcher-cf26557",
          "weapon-armoured-tracks-a6a4ba9"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-miasmic-malignifier",
      "title": "Miasmic Malignifier",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "FORTIFICATION",
        "CHAOS",
        "NURGLE",
        "MIASMIC MALIGNIFIER",
        "FRAME",
        "DEATH GUARD"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-miasmic-malignifier",
        "unitId": "unit-miasmic-malignifier",
        "slug": "miasmic-malignifier",
        "keywords": [
          "FORTIFICATION",
          "CHAOS",
          "NURGLE",
          "MIASMIC MALIGNIFIER",
          "FRAME",
          "DEATH GUARD"
        ],
        "intrinsicKeywords": [
          "FORTIFICATION",
          "CHAOS",
          "NURGLE",
          "MIASMIC MALIGNIFIER",
          "FRAME",
          "DEATH GUARD"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Nurgle’s Gift (Aura)",
          "Putrescent Fog (Aura)",
          "Diseased Cover",
          "Fortification",
          "Deployment"
        ],
        "termIds": [
          "keyword-fortification",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-miasmic-malignifier",
          "keyword-frame",
          "keyword-death-guard",
          "ability-putrescent-fog-aura-afeaa21",
          "ability-diseased-cover-8d71e30",
          "ability-fortification-e581151",
          "weapon-miasmic-gouts-7cba9ce"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-beasts-of-nurgle",
      "title": "Beasts of Nurgle",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "BEAST",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "BEASTS OF NURGLE",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-beasts-of-nurgle",
        "unitId": "unit-beasts-of-nurgle",
        "slug": "beasts-of-nurgle",
        "keywords": [
          "BEAST",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "BEASTS OF NURGLE",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "BEAST",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "BEASTS OF NURGLE",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Deep Strike",
          "Scouts 6\"",
          "Pact of Decay",
          "Grotesque Regeneration"
        ],
        "termIds": [
          "keyword-beast",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-beasts-of-nurgle",
          "keyword-plague-legions",
          "ability-grotesque-regeneration-60c7e2a",
          "weapon-putrid-appendages-7640acd"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-great-unclean-one",
      "title": "Great Unclean One",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "PSYKER",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "GREAT UNCLEAN ONE",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-great-unclean-one",
        "unitId": "unit-great-unclean-one",
        "slug": "great-unclean-one",
        "keywords": [
          "MONSTER",
          "CHARACTER",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "GREAT UNCLEAN ONE",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "MONSTER",
          "CHARACTER",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "GREAT UNCLEAN ONE",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Deep Strike",
          "Feel No Pain 6+",
          "Pact of Decay",
          "Daemon Lord of Nurgle (Aura)",
          "Nurgle’s Rot (Psychic)",
          "Reverberating Summons"
        ],
        "termIds": [
          "keyword-monster",
          "keyword-character",
          "keyword-psyker",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-great-unclean-one",
          "keyword-plague-legions",
          "ability-daemon-lord-of-nurgle-aura-d613df7",
          "ability-nurgles-rot-psychic-80d4e3f",
          "weapon-plague-flail-719d81e",
          "weapon-putrid-vomit-e5055fe",
          "weapon-bileblade-3708417",
          "weapon-bilesword-strike-de60c8c",
          "weapon-bilesword-sweep-d4bee74",
          "weapon-doomsday-bell-bf3de2c"
        ],
        "epic": false,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-nurglings",
      "title": "Nurglings",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "SWARM",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "NURGLINGS",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-nurglings",
        "unitId": "unit-nurglings",
        "slug": "nurglings",
        "keywords": [
          "SWARM",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "NURGLINGS",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "SWARM",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "NURGLINGS",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "Deep Strike",
          "Infiltrators",
          "Pact of Decay",
          "Mischief Makers"
        ],
        "termIds": [
          "keyword-swarm",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-nurglings",
          "keyword-plague-legions",
          "ability-mischief-makers-6a686e9",
          "weapon-diseased-claws-and-teeth-0b6d472"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-plague-drones",
      "title": "Plague Drones",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MOUNTED",
        "FLY",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "PLAGUE DRONES",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-plague-drones",
        "unitId": "unit-plague-drones",
        "slug": "plague-drones",
        "keywords": [
          "MOUNTED",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "PLAGUE DRONES",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "MOUNTED",
          "FLY",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "PLAGUE DRONES",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "Deep Strike",
          "Pact of Decay",
          "Death’s Heads",
          "Daemonic Icon",
          "Instrument of Chaos"
        ],
        "termIds": [
          "keyword-mounted",
          "keyword-fly",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-plague-drones",
          "keyword-plague-legions",
          "ability-deaths-heads-546f077",
          "weapon-deaths-heads-3415dda",
          "weapon-foul-mouthparts-8025b79",
          "weapon-plaguesword-ff1305d"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-plaguebearers",
      "title": "Plaguebearers",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "INFANTRY",
        "BATTLELINE",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "PLAGUEBEARERS",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-plaguebearers",
        "unitId": "unit-plaguebearers",
        "slug": "plaguebearers",
        "keywords": [
          "INFANTRY",
          "BATTLELINE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "PLAGUEBEARERS",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "INFANTRY",
          "BATTLELINE",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "PLAGUEBEARERS",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "Deep Strike",
          "Pact of Decay",
          "Infected Outbreak",
          "Daemonic Icon",
          "Instrument of Chaos"
        ],
        "termIds": [
          "keyword-infantry",
          "keyword-battleline",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-plaguebearers",
          "keyword-plague-legions",
          "ability-infected-outbreak-faaf2d1",
          "weapon-plaguesword-ff1305d"
        ],
        "epic": false,
        "deadlyDemise": false,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 0,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    },
    {
      "id": "unit-rotigus",
      "title": "Rotigus",
      "sourceBookId": "death-guard",
      "sourceLayer": "current",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "EPIC HERO",
        "PSYKER",
        "CHAOS",
        "NURGLE",
        "DAEMON",
        "SUMMONED",
        "ROTIGUS",
        "PLAGUE LEGIONS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "id": "unit-rotigus",
        "unitId": "unit-rotigus",
        "slug": "rotigus",
        "keywords": [
          "MONSTER",
          "CHARACTER",
          "EPIC HERO",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "ROTIGUS",
          "PLAGUE LEGIONS"
        ],
        "intrinsicKeywords": [
          "MONSTER",
          "CHARACTER",
          "EPIC HERO",
          "PSYKER",
          "CHAOS",
          "NURGLE",
          "DAEMON",
          "SUMMONED",
          "ROTIGUS",
          "PLAGUE LEGIONS"
        ],
        "abilities": [
          "DEADLY DEMISE",
          "Deep Strike",
          "Feel No Pain 6+",
          "Pact of Decay",
          "Virulent Blessing (Psychic)",
          "Deluge of Nurgle (Aura)"
        ],
        "termIds": [
          "keyword-monster",
          "keyword-character",
          "keyword-epic-hero",
          "keyword-psyker",
          "keyword-chaos",
          "keyword-nurgle",
          "keyword-daemon",
          "keyword-summoned",
          "keyword-rotigus",
          "keyword-plague-legions",
          "ability-virulent-blessing-psychic-62e7cae",
          "ability-deluge-of-nurgle-aura-49f7690",
          "weapon-streams-of-brackish-filth-de31740",
          "weapon-gnarlrod-strike-1acf103",
          "weapon-gnarlrod-sweep-e6644f6"
        ],
        "epic": true,
        "deadlyDemise": true,
        "attached": false,
        "attachmentKnown": true,
        "characterCount": 1,
        "twoCharacters": null,
        "warlord": null,
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      }
    }
  ],
  "detachments": [
    {
      "id": "detachment-virulent-vectorium",
      "title": "Virulent Vectorium",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-mortarions-hammer",
      "title": "Mortarion’s Hammer",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-champions-of-contagion",
      "title": "Champions of Contagion",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-tallyband-summoners",
      "title": "Tallyband Summoners",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-shamblerot-vectorium",
      "title": "Shamblerot Vectorium",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-death-lords-chosen",
      "title": "Death Lord’s Chosen",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-contagion-engines",
      "title": "Contagion Engines",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-flyblown-host",
      "title": "Flyblown Host",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-paragons-of-putrescence",
      "title": "Paragons of Putrescence",
      "sourceBookId": "death-guard",
      "chapterRestriction": null,
      "keywordGrants": []
    }
  ],
  "enhancements": [
    {
      "type": "enhancement",
      "id": "enhancement-daemon-weapon-of-nurgle",
      "title": "Daemon Weapon of Nurgle - 10 pts",
      "text": "DEATH GUARD model only. Each time the bearer makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-virulent-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-daemon-weapon-of-nurgle"
    },
    {
      "type": "enhancement",
      "id": "enhancement-furnace-of-plagues",
      "title": "Furnace of Plagues - 25 pts",
      "text": "DEATH GUARD model only. Add 1 to the Strength and Attacks characteristics of the bearers melee weapons, and the bearer’s melee weapons have the [DEVASTATING WOUNDS] ability.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-virulent-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-furnace-of-plagues"
    },
    {
      "type": "enhancement",
      "id": "enhancement-arch-contaminator",
      "title": "Arch Contaminator - 25 pts",
      "text": "DEATH GUARD model only. While the bearer’s unit is within range of an objective marker you control, each time a model in the bearer’s unit makes an attack, you can re-roll the Wound roll.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-virulent-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-arch-contaminator"
    },
    {
      "type": "enhancement",
      "id": "enhancement-revolting-regeneration",
      "title": "Revolting Regeneration - 30 pts",
      "text": "DEATH GUARD model only. The bearer has the Feel No Pain 5+ ability.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-virulent-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-revolting-regeneration"
    },
    {
      "type": "enhancement",
      "id": "enhancement-eye-of-affliction",
      "title": "Eye of Affliction - 20 pts",
      "text": "DEATH GUARD model only. Ranged weapons equipped by models in the bearer’s unit have the [ignores cover] ability while targeting an Afflicted enemy unit.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-mortarions-hammer",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-eye-of-affliction"
    },
    {
      "type": "enhancement",
      "id": "enhancement-bilemaw-blight",
      "title": "Bilemaw Blight - 10 pts",
      "text": "MALIGNANT PLAGUECASTER only. At the start of your Shooting phase, until the end of the phase, add 12\" to the Range characteristics of the bearer’s Plague Wind weapon.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-malignant-plaguecaster"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-mortarions-hammer",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-bilemaw-blight"
    },
    {
      "type": "enhancement",
      "id": "enhancement-shriekworm-familiar",
      "title": "Shriekworm Familiar - 15 pts",
      "text": "DEATH GUARD model only. Once per battle round, you can target the bearer’s unit with the Fire Overwatch Stratagem for 0CP.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-mortarions-hammer",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-shriekworm-familiar"
    },
    {
      "type": "enhancement",
      "id": "enhancement-tendrilous-emissions",
      "title": "Tendrilous Emissions - 30 pts",
      "text": "LORD OF VIRULENCE only. While the bearer is within 3\" of one or more friendly DEATH GUARD VEHICLE units, the bearer has the Lone Operative ability, and each time one of those VEHICLE units makes a ranged attack that targets an enemy unit visible to the bearer, re-roll a Wound roll of 1.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-of-virulence"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-mortarions-hammer",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-tendrilous-emissions"
    },
    {
      "type": "enhancement",
      "id": "enhancement-final-ingredient",
      "title": "Final Ingredient - 20 pts",
      "text": "BIOLOGUS PUTRIFIER only. Once per battle, after the bearers unit has fought, if one or more CHARACTER models were destroyed as a result of those attacks, select one Plague. Until the end of the battle, while an enemy unit is Afflicted, that unit has the effect of the selected Plague in addition to any other.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-biologus-putrifier"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-champions-of-contagion",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-final-ingredient"
    },
    {
      "type": "enhancement",
      "id": "enhancement-visions-of-virulence",
      "title": "Visions of Virulence - 15 pts",
      "text": "MALIGNANT PLAGUECASTER only. While an enemy unit is enfeebled by the bearer’s Pestilent Fallout ability, that unit is also Afflicted.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-malignant-plaguecaster"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-champions-of-contagion",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-visions-of-virulence"
    },
    {
      "type": "enhancement",
      "id": "enhancement-needle-of-nurgle",
      "title": "Needle of Nurgle - 25 pts",
      "text": "PLAGUE SURGEON only. Each time the bearer uses its Tainted Narthecium ability, you can return up to D3 destroyed models to the bearer’s unit (instead of 1).",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-plague-surgeon"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-champions-of-contagion",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-needle-of-nurgle"
    },
    {
      "type": "enhancement",
      "id": "enhancement-cornucophagus",
      "title": "Cornucophagus - 35 pts",
      "text": "LORD OF POXES only. In the Declare Battle Formations step select one Plague. Until the end of the battle, while an enemy unit is within Contagion Range of the bearer, that enemy unit has the effect of that Plague in addition to any other.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-of-poxes"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-champions-of-contagion",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-cornucophagus"
    },
    {
      "type": "enhancement",
      "id": "enhancement-beckoning-blight",
      "title": "Beckoning Blight - 20 pts",
      "text": "DEATH GUARD model only. Each time a PLAGUE LEGIONS unit from your army is set up on the battlefield using the Deep Strike ability, if it is set up wholly within 12\" of the bearer, it can be set up anywhere that is more than 6\" horizontally away from all enemy models, instead of more than 8\".",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-tallyband-summoners",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-beckoning-blight"
    },
    {
      "type": "enhancement",
      "id": "enhancement-fell-harvester",
      "title": "Fell Harvester - 10 pts",
      "text": "DEATH GUARD model only. Add 2 to the Attacks characteristic of the bearer’s melee weapons.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-tallyband-summoners",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-fell-harvester"
    },
    {
      "type": "enhancement",
      "id": "enhancement-entropic-knell",
      "title": "Entropic Knell - 15 pts",
      "text": "GREAT UNCLEAN ONE only. In the Battle-shock step of your opponent’s Command phase, each enemy unit within 6\" of the bearer that is below its Starting Strength must take a Battle-shock test, subtracting 1 from that test.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-great-unclean-one"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-tallyband-summoners",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-entropic-knell"
    },
    {
      "type": "enhancement",
      "id": "enhancement-tome-of-bounteous-blessings",
      "title": "Tome of Bounteous Blessings - 20 pts",
      "text": "MALIGNANT PLAGUECASTER only. Each time a PLAGUE LEGIONS unit within 12\" of the bearer takes a Battle-shock test, add 1 to that test and, if that test is passed, one model in that unit regains up to D3 lost wounds (if that unit is a BATTLELINE unit and that test is passed, up to D3 destroyed models can be returned to that unit instead).",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-malignant-plaguecaster"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-tallyband-summoners",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-tome-of-bounteous-blessings"
    },
    {
      "type": "enhancement",
      "id": "enhancement-witherbone-pipes",
      "title": "Witherbone Pipes - 25 pts",
      "text": "NOXIOUS BLIGHTBRINGER only. While the bearer is leading a POXWALKERS unit, add 1 to the Objective Control characteristic of models in that unit, and each time that unit takes a Battle-shock or Leadership test, add 1 to that test.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-noxious-blightbringer"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-shamblerot-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-witherbone-pipes"
    },
    {
      "type": "enhancement",
      "id": "enhancement-lord-of-the-walking-pox",
      "title": "Lord of the Walking Pox - 15 pts",
      "text": "DEATH GUARD model only. If the bearer is leading a POXWALKER unit, and is in Strategic Reserves, for the purposes of setting up that unit on the battlefield, treat the current battle round as the third battle round.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-shamblerot-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-lord-of-the-walking-pox"
    },
    {
      "type": "enhancement",
      "id": "enhancement-sorrowsyphon",
      "title": "Sorrowsyphon - 10 pts",
      "text": "MALIGNANT PLAGUECASTER only. While the bearer is leading a POXWALKERS unit, add 1 to the Damage characteristic of the bearer’s Plague Wind weapon. Each time the bearer makes one or more attacks with a Plague Wind weapon, after the bearer’s unit has resolved its attacks, D3 Bodyguard models from the bearer’s unit are destroyed.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-malignant-plaguecaster"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-shamblerot-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-sorrowsyphon"
    },
    {
      "type": "enhancement",
      "id": "enhancement-talisman-of-burgeoning",
      "title": "Talisman of Burgeoning - 25 pts",
      "text": "DEATH GUARD model only. While the bearer is leading a unit, add 1 to the Toughness characteristic of POXWALKERS models in that unit.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-shamblerot-vectorium",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-talisman-of-burgeoning"
    },
    {
      "type": "enhancement",
      "id": "enhancement-face-of-death",
      "title": "Face of Death - 10 pts",
      "text": "TERMINATOR model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer’s unit must take a Battle-shock test.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "TERMINATOR"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-death-lords-chosen",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-face-of-death"
    },
    {
      "type": "enhancement",
      "id": "enhancement-vile-vigour",
      "title": "Vile Vigour - 15 pts",
      "text": "TERMINATOR model only. While the bearer is leading a unit, add 1\" to the Movement characteristic of models in that unit and you can re-roll Advance rolls made for that unit.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "TERMINATOR"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-death-lords-chosen",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-vile-vigour"
    },
    {
      "type": "enhancement",
      "id": "enhancement-warprot-talisman",
      "title": "Warprot Talisman - 30 pts",
      "text": "TERMINATOR model only. Once per battle, at the end of your opponent’s turn, if the bearer’s unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "TERMINATOR"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-death-lords-chosen",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-warprot-talisman"
    },
    {
      "type": "enhancement",
      "id": "enhancement-helm-of-the-fly-king",
      "title": "Helm of the Fly King - 20 pts",
      "text": "TERMINATOR model only. While the bearer is leading a unit, models in that unit cannot be targeted by ranged attacks unless the attacking model is within 18\".",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "TERMINATOR"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-death-lords-chosen",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-helm-of-the-fly-king"
    },
    {
      "type": "enhancement",
      "id": "enhancement-parasitic-woe-reaper",
      "title": "Parasitic Woe-Reaper - 15 pts",
      "text": "CONTAGION ENGINE unit only. When this unit has fought, one model in this unit heals D3 wounds.",
      "tags": [
        "UPGRADE"
      ],
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "unit",
        "selector": {
          "allKeywords": [
            "CONTAGION ENGINE"
          ]
        }
      },
      "detachmentId": "detachment-contagion-engines",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-parasitic-woe-reaper"
    },
    {
      "type": "enhancement",
      "id": "enhancement-lancet-of-the-worldsore",
      "title": "Lancet of the Worldsore - 15 pts",
      "text": "Friendly HELBRUTE/MYPHITIC BLIGHT-HAULER unit only. This unit has MOBILE.",
      "tags": [
        "UPGRADE"
      ],
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-helbrute",
            "unit-myphitic-blight-hauler"
          ]
        }
      },
      "detachmentId": "detachment-contagion-engines",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-lancet-of-the-worldsore"
    },
    {
      "type": "enhancement",
      "id": "enhancement-insectile-murmuration",
      "title": "Insectile Murmuration - 15 pts",
      "text": "PLAGUE MARINES unit only. When this unit’s attacks target a unit within Contagion Range of a friendly unit, those attacks can re-roll wound rolls of 1.",
      "tags": [
        "UPGRADE"
      ],
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-plague-marines"
          ]
        }
      },
      "detachmentId": "detachment-flyblown-host",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-insectile-murmuration"
    },
    {
      "type": "enhancement",
      "id": "enhancement-plagueveil",
      "title": "Plagueveil - 15 pts",
      "text": "PLAGUE MARINES unit only. This unit has -3\" detection range.",
      "tags": [
        "UPGRADE"
      ],
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-plague-marines"
          ]
        }
      },
      "detachmentId": "detachment-flyblown-host",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-plagueveil"
    },
    {
      "type": "enhancement",
      "id": "enhancement-rejuvenating-swarm",
      "title": "Rejuvenating Swarm - 20 pts",
      "text": "DEATH GUARD INFANTRY model only (excluding TERMINATOR models). Attacks that target this unit with a S greater than this unit’s T have -1 to wound rolls.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD",
            "INFANTRY"
          ],
          "noneKeywords": [
            "EPIC HERO",
            "TERMINATOR"
          ]
        }
      },
      "detachmentId": "detachment-paragons-of-putrescence",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-rejuvenating-swarm"
    },
    {
      "type": "enhancement",
      "id": "enhancement-host-of-the-hybridised-pox",
      "title": "Host of the Hybridised Pox - 40 pts",
      "text": "DEATH GUARD INFANTRY model only. (Once per battle, per army) In your Command phase, you can use this ability. If you do, select one of the Plagues listed in Nurgle’s Gift. Enemy units within Contagion Range of this unit also have the effect of that Plague in addition to your army’s chosen Plague until the end of the battle.",
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "owner": {
        "subject": "model",
        "selector": {
          "allKeywords": [
            "CHARACTER",
            "DEATH GUARD",
            "INFANTRY"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "detachmentId": "detachment-paragons-of-putrescence",
      "sourceBookId": "death-guard",
      "legacyKey": "enhancement-host-of-the-hybridised-pox"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({});
