window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "chaos-space-marines",
    "title": "Chaos Space Marines",
    "factionKeyword": "HERETIC ASTARTES",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-cultist-mob",
      "title": "Cultist Mob",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Battleline",
        "Grenades",
        "Chaos",
        "Cultist Mob",
        "Damned"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-cultist-firebrand",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-dark-commune",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-fabius-bile",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-cultist-firebrand",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-dark-commune",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-fabius-bile",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "6+",
          "W": "1",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "25mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-for-the-dark-gods",
            "sectionId": "chaos-space-marines-ability-for-the-dark-gods",
            "title": "For the Dark Gods",
            "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
            "sourceUnitId": "unit-cultist-mob"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-cultist-mob"
          }
        ],
        "models": [
          {
            "id": "unit-cultist-mob-model-cultist-champion",
            "title": "Cultist Champion",
            "aliases": [
              "Cultist Champion"
            ]
          },
          {
            "id": "unit-cultist-mob-model-cultist-w-autopistol-and-brutal-assault-weapon-2",
            "title": "Cultist w/ autopistol and brutal assault weapon",
            "aliases": [
              "Cultist w/ autopistol and brutal assault weapon"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-cultist-mob-selection-brutal-assault-weapon",
            "title": "Brutal assault weapon",
            "aliases": [
              "Brutal assault weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cultist-mob-profile-brutal-assault-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cultist-mob-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cultist-mob-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cultist-mob-selection-autopistol",
            "title": "Autopistol",
            "aliases": [
              "Autopistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cultist-mob-profile-autopistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-cultist-mob-profile-brutal-assault-weapon-melee",
            "title": "Brutal assault weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-cultist-mob-selection-brutal-assault-weapon"
            ]
          },
          {
            "id": "unit-cultist-mob-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-cultist-mob-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-cultist-mob-profile-autopistol-ranged-3",
            "title": "Autopistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-cultist-mob-selection-autopistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-legionaries",
      "title": "Legionaries",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Battleline",
        "Chaos",
        "Grenades",
        "Legionaries"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaos-lord",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fabius-bile",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-huron-blackheart",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-master-of-possession",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-reave-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sorcerer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-warpsmith",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-masters-of-the-maelstrom",
            "maxCharacters": 2
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fabius-bile",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-huron-blackheart",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-master-of-possession",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-reave-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sorcerer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-warpsmith",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-masters-of-the-maelstrom",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-veterans-of-the-long-war",
            "sectionId": "chaos-space-marines-ability-veterans-of-the-long-war",
            "title": "Veterans of the Long War",
            "text": "Each time a model in this unit targets an enemy unit with a melee attack, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead.",
            "sourceUnitId": "unit-legionaries"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-legionaries"
          }
        ],
        "models": [
          {
            "id": "unit-legionaries-model-aspiring-champion",
            "title": "Aspiring Champion",
            "aliases": [
              "Aspiring Champion"
            ]
          },
          {
            "id": "unit-legionaries-model-4-9-legionaries-2",
            "title": "4 - 9 Legionaries",
            "aliases": [
              "4 - 9 Legionaries"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-legionaries-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-accursed-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-astartes-chainsword",
            "title": "Astartes chainsword",
            "aliases": [
              "Astartes chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-astartes-chainsword-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-heavy-melee-weapon",
            "title": "Heavy melee weapon",
            "aliases": [
              "Heavy melee weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-heavy-melee-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-boltgun-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-close-combat-weapon-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-balefire-tome",
            "title": "Balefire tome",
            "aliases": [
              "Balefire tome"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-balefire-tome-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-flamer-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-havoc-autocannon",
            "title": "Havoc autocannon",
            "aliases": [
              "Havoc autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-havoc-autocannon-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-heavy-bolter",
            "title": "Heavy bolter",
            "aliases": [
              "Heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-heavy-bolter-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-lascannon-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-missile-launcher-frag",
            "title": "➤ Missile launcher - frag",
            "aliases": [
              "➤ Missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-missile-launcher-frag-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-missile-launcher-krak",
            "title": "➤ Missile launcher - krak",
            "aliases": [
              "➤ Missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-missile-launcher-krak-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-plasma-gun-standard-ranged-16"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-plasma-gun-supercharge-ranged-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-reaper-chaincannon",
            "title": "Reaper chaincannon",
            "aliases": [
              "Reaper chaincannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-reaper-chaincannon-ranged-18"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-legionaries-profile-meltagun-ranged-19"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-legionaries-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-legionaries-profile-plasma-pistol-standard-ranged-5",
              "unit-legionaries-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-weapon-family-missile-launcher-selection",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-legionaries-weapon-family-missile-launcher",
            "profileIds": [
              "unit-legionaries-profile-missile-launcher-frag-ranged-14",
              "unit-legionaries-profile-missile-launcher-krak-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-legionaries-weapon-family-plasma-gun",
            "profileIds": [
              "unit-legionaries-profile-plasma-gun-standard-ranged-16",
              "unit-legionaries-profile-plasma-gun-supercharge-ranged-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-legionaries-selection-chaos-icon",
            "title": "Chaos icon",
            "aliases": [
              "Chaos icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-legionaries-wargear-ability-chaos-icon"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-legionaries-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-legionaries-profile-plasma-pistol-standard-ranged-5",
              "unit-legionaries-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-legionaries-weapon-family-missile-launcher",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "profileIds": [
              "unit-legionaries-profile-missile-launcher-frag-ranged-14",
              "unit-legionaries-profile-missile-launcher-krak-ranged-15"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-legionaries-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-legionaries-profile-plasma-gun-standard-ranged-16",
              "unit-legionaries-profile-plasma-gun-supercharge-ranged-17"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-legionaries-profile-accursed-weapon-melee",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-legionaries-profile-astartes-chainsword-melee-2",
            "title": "Astartes chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-legionaries-profile-heavy-melee-weapon-melee-3",
            "title": "Heavy melee weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-heavy-melee-weapon"
            ]
          },
          {
            "id": "unit-legionaries-profile-bolt-pistol-ranged-4",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-legionaries-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-legionaries-profile-plasma-pistol-standard-ranged-5",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-legionaries-selection-plasma-pistol-standard",
              "unit-legionaries-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-plasma-pistol-supercharge-ranged-6",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-legionaries-selection-plasma-pistol-supercharge",
              "unit-legionaries-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-boltgun-ranged-7",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-boltgun"
            ]
          },
          {
            "id": "unit-legionaries-profile-close-combat-weapon-melee-8",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-legionaries-profile-balefire-tome-ranged-9",
            "title": "Balefire tome",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-legionaries-selection-balefire-tome"
            ]
          },
          {
            "id": "unit-legionaries-profile-flamer-ranged-10",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-legionaries-selection-flamer"
            ]
          },
          {
            "id": "unit-legionaries-profile-havoc-autocannon-ranged-11",
            "title": "Havoc autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "4+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-legionaries-selection-havoc-autocannon"
            ]
          },
          {
            "id": "unit-legionaries-profile-heavy-bolter-ranged-12",
            "title": "Heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-legionaries-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-legionaries-profile-lascannon-ranged-13",
            "title": "Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-legionaries-selection-lascannon"
            ]
          },
          {
            "id": "unit-legionaries-profile-missile-launcher-frag-ranged-14",
            "title": "➤ Missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-legionaries-selection-missile-launcher-frag",
              "unit-legionaries-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-missile-launcher-krak-ranged-15",
            "title": "➤ Missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-legionaries-selection-missile-launcher-krak",
              "unit-legionaries-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-plasma-gun-standard-ranged-16",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-legionaries-selection-plasma-gun-standard",
              "unit-legionaries-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-plasma-gun-supercharge-ranged-17",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-legionaries-selection-plasma-gun-supercharge",
              "unit-legionaries-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-legionaries-profile-reaper-chaincannon-ranged-18",
            "title": "Reaper chaincannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-legionaries-selection-reaper-chaincannon"
            ]
          },
          {
            "id": "unit-legionaries-profile-meltagun-ranged-19",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-legionaries-selection-meltagun"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-legionaries-wargear-ability-chaos-icon",
            "title": "Chaos icon",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-chaos-lord",
      "title": "Chaos Lord",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Grenades",
        "Chaos",
        "Chaos Lord"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-chance-for-glory",
            "sectionId": "chaos-space-marines-ability-chance-for-glory",
            "title": "Chance for Glory",
            "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, improve the Strength, Attacks, Armour\nPenetration and Damage characteristics of melee weapons equipped by this model by 1.",
            "sourceUnitId": "unit-chaos-lord"
          },
          {
            "id": "chaos-space-marines-ability-lord-of-chaos",
            "sectionId": "chaos-space-marines-ability-lord-of-chaos",
            "title": "Lord of Chaos",
            "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-chaos-lord"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-lord"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-lord-model-chaos-lord",
            "title": "Chaos Lord",
            "aliases": [
              "Chaos Lord"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-lord-selection-daemon-hammer",
            "title": "Daemon hammer",
            "aliases": [
              "Daemon hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-daemon-hammer-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-accursed-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-selection-astartes-chainblade",
            "title": "Astartes chainblade",
            "aliases": [
              "Astartes chainblade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-astartes-chainblade-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-power-fist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chaos-lord-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chaos-lord-profile-plasma-pistol-standard-ranged-5",
              "unit-chaos-lord-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chaos-lord-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chaos-lord-profile-plasma-pistol-standard-ranged-5",
              "unit-chaos-lord-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chaos-lord-profile-daemon-hammer-melee",
            "title": "Daemon hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-daemon-hammer"
            ]
          },
          {
            "id": "unit-chaos-lord-profile-accursed-weapon-melee-2",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chaos-lord-profile-astartes-chainblade-melee-3",
            "title": "Astartes chainblade",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-astartes-chainblade"
            ]
          },
          {
            "id": "unit-chaos-lord-profile-power-fist-melee-4",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaos-lord-profile-plasma-pistol-standard-ranged-5",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-plasma-pistol-standard",
              "unit-chaos-lord-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaos-lord-profile-plasma-pistol-supercharge-ranged-6",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-chaos-lord-selection-plasma-pistol-supercharge",
              "unit-chaos-lord-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-lord-in-terminator-armour",
      "title": "Chaos Lord in Terminator Armour",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Chaos",
        "Terminator",
        "Chaos Lord in Terminator Armour",
        "Chaos Lord"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chaos-terminator-squad",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chaos-terminator-squad",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-formidably-resilient",
            "sectionId": "chaos-space-marines-ability-formidably-resilient",
            "title": "Formidably Resilient",
            "text": "Each time an attack is allocated to this model, halve the Damage characteristic of that attack.",
            "sourceUnitId": "unit-chaos-lord-in-terminator-armour"
          },
          {
            "id": "chaos-space-marines-ability-lord-of-chaos",
            "sectionId": "chaos-space-marines-ability-lord-of-chaos",
            "title": "Lord of Chaos",
            "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-chaos-lord-in-terminator-armour"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-lord-in-terminator-armour"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-chaos-lord-in-terminator-armour"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-lord-in-terminator-armour-model-chaos-lord-in-terminator-armour",
            "title": "Chaos Lord in Terminator Armour",
            "aliases": [
              "Chaos Lord in Terminator Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-combi-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-exalted-weapon",
            "title": "Exalted weapon",
            "aliases": [
              "Exalted weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-exalted-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-chainfist",
            "title": "Chainfist",
            "aliases": [
              "Chainfist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-chainfist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-paired-accursed-weapons",
            "title": "Paired accursed weapons",
            "aliases": [
              "Paired accursed weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-paired-accursed-weapons-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-in-terminator-armour-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-combi-bolter-ranged",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-exalted-weapon-melee-3",
            "title": "Exalted weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-exalted-weapon"
            ]
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-chainfist-melee-4",
            "title": "Chainfist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-VEHICLE 3+",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-chainfist"
            ]
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-paired-accursed-weapons-melee-5",
            "title": "Paired accursed weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-paired-accursed-weapons"
            ]
          },
          {
            "id": "unit-chaos-lord-in-terminator-armour-profile-power-fist-melee-6",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-in-terminator-armour-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-lord-with-jump-pack",
      "title": "Chaos Lord with Jump Pack",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Chaos Lord",
        "Jump Pack",
        "Character",
        "Infantry",
        "Fly",
        "Grenades",
        "Chaos"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-raptors",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-raptors",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "4",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-cruel-hunter",
            "sectionId": "chaos-space-marines-ability-cruel-hunter",
            "title": "Cruel Hunter",
            "text": "While this model is leading a unit, each time that unit Piles In or Consolidates, each model in that unit can move up to 6\" instead of up to 3\".",
            "sourceUnitId": "unit-chaos-lord-with-jump-pack"
          },
          {
            "id": "chaos-space-marines-ability-lord-of-chaos",
            "sectionId": "chaos-space-marines-ability-lord-of-chaos",
            "title": "Lord of Chaos",
            "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-chaos-lord-with-jump-pack"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-chaos-lord-with-jump-pack"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-lord-with-jump-pack"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-lord-with-jump-pack-model-chaos-lord-with-jump-pack",
            "title": "Chaos Lord with Jump Pack",
            "aliases": [
              "Chaos Lord with Jump Pack"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-accursed-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-twin-lightning-claws",
            "title": "Twin lightning claws",
            "aliases": [
              "Twin lightning claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-twin-lightning-claws-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-bolt-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chaos-lord-with-jump-pack-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-standard-ranged-4",
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chaos-lord-with-jump-pack-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-standard-ranged-4",
              "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-accursed-weapon-melee",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-power-fist-melee-2",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-twin-lightning-claws-melee-3",
            "title": "Twin lightning claws",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-twin-lightning-claws"
            ]
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-standard-ranged-4",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-plasma-pistol-standard",
              "unit-chaos-lord-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-plasma-pistol-supercharge-ranged-5",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-plasma-pistol-supercharge",
              "unit-chaos-lord-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaos-lord-with-jump-pack-profile-bolt-pistol-ranged-6",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaos-lord-with-jump-pack-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-cultist-firebrand",
      "title": "Cultist Firebrand",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Chaos",
        "Damned",
        "Cultist Firebrand"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-accursed-cultists",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-cultist-mob",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-accursed-cultists",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-cultist-mob",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "4+",
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-fiery-faith",
            "sectionId": "chaos-space-marines-ability-fiery-faith",
            "title": "Fiery Faith",
            "text": "While this model is leading a unit, you can re-roll Leadership tests taken for that unit.",
            "sourceUnitId": "unit-cultist-firebrand"
          },
          {
            "id": "chaos-space-marines-ability-cursed-flames",
            "sectionId": "chaos-space-marines-ability-cursed-flames",
            "title": "Cursed Flames",
            "text": "In your Shooting phase, after this model has shot, select one enemy INFANTRY unit hit by one or more of those attacks. That unit must make a Battle-shock test.",
            "sourceUnitId": "unit-cultist-firebrand"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-cultist-firebrand"
          }
        ],
        "models": [
          {
            "id": "unit-cultist-firebrand-model-cultist-firebrand",
            "title": "Cultist Firebrand",
            "aliases": [
              "Cultist Firebrand"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-cultist-firebrand-selection-balefire-pike",
            "title": "Balefire pike",
            "aliases": [
              "Balefire pike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cultist-firebrand-profile-balefire-pike-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cultist-firebrand-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cultist-firebrand-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-cultist-firebrand-profile-balefire-pike-ranged",
            "title": "Balefire pike",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-cultist-firebrand-selection-balefire-pike"
            ]
          },
          {
            "id": "unit-cultist-firebrand-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-cultist-firebrand-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-dark-apostle",
      "title": "Dark Apostle",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Chaos"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-accursed-cultists",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-cultist-mob",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-accursed-cultists",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-cultist-mob",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-dark-zealotry",
            "sectionId": "chaos-space-marines-ability-dark-zealotry",
            "title": "Dark Zealotry",
            "text": "While this unit is leading a unit and contains a DARK APOSTLE model, each time a model in that unit makes a melee attack, add 1 to the Wound roll.",
            "sourceUnitId": "unit-dark-apostle"
          },
          {
            "id": "chaos-space-marines-ability-demagogue",
            "sectionId": "chaos-space-marines-ability-demagogue",
            "title": "Demagogue",
            "text": "Once per battle, at the start of any phase, you can select one friendly HERETIC ASTARTES unit that is Battle-shocked and within 12\" of this unit’s DARK APOSTLE model. That unit is no longer Battle-shocked.",
            "sourceUnitId": "unit-dark-apostle"
          },
          {
            "id": "chaos-space-marines-ability-malign-sacrifice",
            "sectionId": "chaos-space-marines-ability-malign-sacrifice",
            "title": "Malign Sacrifice",
            "text": "At the start of the Fight phase, if this unit contains one or more Dark Disciple models, you can select one of those models and one enemy unit within Engagement Range of this unit, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds. That Dark Disciple model is then destroyed.",
            "sourceUnitId": "unit-dark-apostle"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-dark-apostle"
          }
        ],
        "models": [
          {
            "id": "unit-dark-apostle-model-dark-apostle",
            "title": "Dark Apostle",
            "aliases": [
              "Dark Apostle"
            ]
          },
          {
            "id": "unit-dark-apostle-model-dark-disciple-2",
            "title": "Dark Disciple",
            "aliases": [
              "Dark Disciple"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-dark-apostle-selection-accursed-crozius",
            "title": "Accursed crozius",
            "aliases": [
              "Accursed crozius"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-apostle-profile-accursed-crozius-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-apostle-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-apostle-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-apostle-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-apostle-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-dark-apostle-profile-accursed-crozius-melee",
            "title": "Accursed crozius",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dark-apostle-selection-accursed-crozius"
            ]
          },
          {
            "id": "unit-dark-apostle-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-dark-apostle-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-dark-apostle-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dark-apostle-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-dark-commune",
      "title": "Dark Commune",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Damned",
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Dark Commune",
        "Chaos"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-accursed-cultists",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-cultist-mob",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-accursed-cultists",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-cultist-mob",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-faithful-flock",
            "sectionId": "chaos-space-marines-ability-faithful-flock",
            "title": "Faithful Flock",
            "text": "While this unit is leading a unit and contains a CULT DEMAGOGUE model, models in that unit have a 5+ invulnerable save.",
            "sourceUnitId": "unit-dark-commune"
          },
          {
            "id": "chaos-space-marines-ability-dark-ritual",
            "sectionId": "chaos-space-marines-ability-dark-ritual",
            "title": "Dark Ritual",
            "text": "Once per battle, in your Command phase, if this unit contains a CULT DEMAGOGUE model, it can use this ability. If it does, until the end of the turn, this unit can declare a charge in a turn in which it Advanced and each time a model in this unit makes an attack, add 1 to the Hit roll and add 1 to the Wound roll.",
            "sourceUnitId": "unit-dark-commune"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-dark-commune"
          }
        ],
        "models": [
          {
            "id": "unit-dark-commune-model-dark-commune",
            "title": "Dark Commune",
            "aliases": [
              "Dark Commune"
            ]
          },
          {
            "id": "unit-dark-commune-model-cult-demagogue-2",
            "title": "Cult Demagogue",
            "aliases": [
              "Cult Demagogue"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-dark-commune-selection-commune-blade",
            "title": "Commune blade",
            "aliases": [
              "Commune blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-commune-blade-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-autopistol",
            "title": "Autopistol",
            "aliases": [
              "Autopistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-autopistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-warp-curse-witchfire",
            "title": "➤ Warp Curse - witchfire",
            "aliases": [
              "➤ Warp Curse - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-warp-curse-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-warp-curse-focused-witchfire",
            "title": "➤ Warp Curse - focused witchfire",
            "aliases": [
              "➤ Warp Curse - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-warp-curse-focused-witchfire-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-commune-stave",
            "title": "Commune stave",
            "aliases": [
              "Commune stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dark-commune-profile-commune-stave-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-weapon-family-warp-curse-selection",
            "title": "➤ Warp Curse",
            "aliases": [
              "➤ Warp Curse"
            ],
            "kind": "weapon",
            "familyId": "unit-dark-commune-weapon-family-warp-curse",
            "profileIds": [
              "unit-dark-commune-profile-warp-curse-witchfire-ranged-4",
              "unit-dark-commune-profile-warp-curse-focused-witchfire-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dark-commune-selection-chaos-icon",
            "title": "Chaos icon",
            "aliases": [
              "Chaos icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-dark-commune-wargear-ability-chaos-icon"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-dark-commune-weapon-family-warp-curse",
            "title": "➤ Warp Curse",
            "aliases": [
              "➤ Warp Curse"
            ],
            "profileIds": [
              "unit-dark-commune-profile-warp-curse-witchfire-ranged-4",
              "unit-dark-commune-profile-warp-curse-focused-witchfire-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-dark-commune-profile-commune-blade-melee",
            "title": "Commune blade",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-commune-blade"
            ]
          },
          {
            "id": "unit-dark-commune-profile-autopistol-ranged-2",
            "title": "Autopistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-autopistol"
            ]
          },
          {
            "id": "unit-dark-commune-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-dark-commune-profile-warp-curse-witchfire-ranged-4",
            "title": "➤ Warp Curse - witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-warp-curse-witchfire",
              "unit-dark-commune-weapon-family-warp-curse-selection"
            ]
          },
          {
            "id": "unit-dark-commune-profile-warp-curse-focused-witchfire-ranged-5",
            "title": "➤ Warp Curse - focused witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Hazardous, Psychic, Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-warp-curse-focused-witchfire",
              "unit-dark-commune-weapon-family-warp-curse-selection"
            ]
          },
          {
            "id": "unit-dark-commune-profile-commune-stave-melee-6",
            "title": "Commune stave",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "D3",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-dark-commune-selection-commune-stave"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-dark-commune-wargear-ability-chaos-icon",
            "title": "Chaos icon",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-heretic-astartes-daemon-prince",
      "title": "Heretic Astartes Daemon Prince",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Monster",
        "Character",
        "Chaos",
        "Daemon",
        "Daemon Prince"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "10",
          "Sv": "2+",
          "W": "10",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "4+",
          "Base": "60mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-dark-blessing-aura",
            "sectionId": "chaos-space-marines-ability-dark-blessing-aura",
            "title": "Dark Blessing (Aura)",
            "text": "While a friendly HERETIC ASTARTES INFANTRY unit is within 6\" of this model, each time a ranged attack is allocated to a model in that unit, that model has the Benefit of Cover against that attack.",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince"
          },
          {
            "id": "chaos-space-marines-ability-ascended-daemon",
            "sectionId": "chaos-space-marines-ability-ascended-daemon",
            "title": "Ascended Daemon",
            "text": "Each time this model shoot or fights, while resolving those attacks, you can re-roll one Hit roll and you can re-roll one Wound roll.",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince"
          },
          {
            "id": "chaos-space-marines-ability-lord-of-chaos-2",
            "sectionId": "chaos-space-marines-ability-lord-of-chaos-2",
            "title": "Lord of Chaos",
            "text": "While this model is within 3\" of a friendly Heretic Astartes Infantry unit, this model has Lone Operative.",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince"
          }
        ],
        "models": [
          {
            "id": "unit-heretic-astartes-daemon-prince-model-heretic-astartes-daemon-prince",
            "title": "Heretic Astartes Daemon Prince",
            "aliases": [
              "Heretic Astartes Daemon Prince"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-heretic-astartes-daemon-prince-selection-hellforged-weapons-strike",
            "title": "➤ Hellforged weapons - strike",
            "aliases": [
              "➤ Hellforged weapons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-selection-hellforged-weapons-sweep",
            "title": "➤ Hellforged weapons - sweep",
            "aliases": [
              "➤ Hellforged weapons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-selection-infernal-cannon",
            "title": "Infernal cannon",
            "aliases": [
              "Infernal cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-profile-infernal-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-weapon-family-hellforged-weapons-selection",
            "title": "➤ Hellforged weapons",
            "aliases": [
              "➤ Hellforged weapons"
            ],
            "kind": "weapon",
            "familyId": "unit-heretic-astartes-daemon-prince-weapon-family-hellforged-weapons",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-strike-melee",
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-heretic-astartes-daemon-prince-weapon-family-hellforged-weapons",
            "title": "➤ Hellforged weapons",
            "aliases": [
              "➤ Hellforged weapons"
            ],
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-strike-melee",
              "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-strike-melee",
            "title": "➤ Hellforged weapons - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-selection-hellforged-weapons-strike",
              "unit-heretic-astartes-daemon-prince-weapon-family-hellforged-weapons-selection"
            ]
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-profile-hellforged-weapons-sweep-melee-2",
            "title": "➤ Hellforged weapons - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "14",
            "skill": "2+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-selection-hellforged-weapons-sweep",
              "unit-heretic-astartes-daemon-prince-weapon-family-hellforged-weapons-selection"
            ]
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-profile-infernal-cannon-ranged-3",
            "title": "Infernal cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-selection-infernal-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-heretic-astartes-daemon-prince-with-wings",
      "title": "Heretic Astartes Daemon Prince with wings",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Monster",
        "Character",
        "Chaos",
        "Daemon",
        "Fly",
        "Daemon Prince with Wings",
        "Daemon Prince"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "9",
          "Sv": "2+",
          "W": "10",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "4+",
          "Base": "60mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-flying-horror",
            "sectionId": "chaos-space-marines-ability-flying-horror",
            "title": "Flying Horror",
            "text": "Each time this model ends a Normal or Advance move, select one enemy unit it moved over during that move. That unit must take a Battle-shock test.",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince-with-wings"
          },
          {
            "id": "chaos-space-marines-ability-daemonic-destruction",
            "sectionId": "chaos-space-marines-ability-daemonic-destruction",
            "title": "Daemonic Destruction",
            "text": "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each of this model’s remaining wounds: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince-with-wings"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince-with-wings"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince-with-wings"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-heretic-astartes-daemon-prince-with-wings"
          }
        ],
        "models": [
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-model-heretic-astartes-daemon-prince-with-wings",
            "title": "Heretic Astartes Daemon Prince with wings",
            "aliases": [
              "Heretic Astartes Daemon Prince with wings"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-selection-hellforged-weapons-strike",
            "title": "➤ Hellforged weapons - strike",
            "aliases": [
              "➤ Hellforged weapons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-selection-hellforged-weapons-sweep",
            "title": "➤ Hellforged weapons - sweep",
            "aliases": [
              "➤ Hellforged weapons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-selection-infernal-cannon",
            "title": "Infernal cannon",
            "aliases": [
              "Infernal cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-profile-infernal-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-weapon-family-hellforged-weapons-selection",
            "title": "➤ Hellforged weapons",
            "aliases": [
              "➤ Hellforged weapons"
            ],
            "kind": "weapon",
            "familyId": "unit-heretic-astartes-daemon-prince-with-wings-weapon-family-hellforged-weapons",
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-strike-melee",
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-weapon-family-hellforged-weapons",
            "title": "➤ Hellforged weapons",
            "aliases": [
              "➤ Hellforged weapons"
            ],
            "profileIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-strike-melee",
              "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-strike-melee",
            "title": "➤ Hellforged weapons - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-selection-hellforged-weapons-strike",
              "unit-heretic-astartes-daemon-prince-with-wings-weapon-family-hellforged-weapons-selection"
            ]
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-profile-hellforged-weapons-sweep-melee-2",
            "title": "➤ Hellforged weapons - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "14",
            "skill": "2+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-selection-hellforged-weapons-sweep",
              "unit-heretic-astartes-daemon-prince-with-wings-weapon-family-hellforged-weapons-selection"
            ]
          },
          {
            "id": "unit-heretic-astartes-daemon-prince-with-wings-profile-infernal-cannon-ranged-3",
            "title": "Infernal cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heretic-astartes-daemon-prince-with-wings-selection-infernal-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lord-discordant-on-helstalker",
      "title": "Lord Discordant on Helstalker",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Mounted",
        "Character",
        "Chaos",
        "Daemon",
        "Lord Discordant"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "14\"",
          "T": "9",
          "Sv": "2+",
          "W": "10",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": "4+",
          "Base": "120x92mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-corrupt-machine-spirits",
            "sectionId": "chaos-space-marines-ability-corrupt-machine-spirits",
            "title": "Corrupt Machine Spirits",
            "text": "At the start of your Shooting phase, select one visible enemy Vehicle unit within 12\" of this model and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.’",
            "sourceUnitId": "unit-lord-discordant-on-helstalker"
          },
          {
            "id": "chaos-space-marines-ability-spirit-thief",
            "sectionId": "chaos-space-marines-ability-spirit-thief",
            "title": "Spirit Thief",
            "text": "At the start of your Shooting phase, select one visible enemy Vehicle unit. Until the end of the phase, each time a friendly Heretic Astartes model makes an attack that targets that unit, re-roll a Wound roll of 1.",
            "sourceUnitId": "unit-lord-discordant-on-helstalker"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-lord-discordant-on-helstalker"
          }
        ],
        "models": [
          {
            "id": "unit-lord-discordant-on-helstalker-model-lord-discordant-on-helstalker",
            "title": "Lord Discordant on Helstalker",
            "aliases": [
              "Lord Discordant on Helstalker"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lord-discordant-on-helstalker-selection-bladed-limbs",
            "title": "Bladed limbs",
            "aliases": [
              "Bladed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-bladed-limbs-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-impaler-chainglaive",
            "title": "Impaler chainglaive",
            "aliases": [
              "Impaler chainglaive"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-impaler-chainglaive-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-helstalker-autocannon",
            "title": "Helstalker autocannon",
            "aliases": [
              "Helstalker autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-helstalker-autocannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-baleflamer",
            "title": "Baleflamer",
            "aliases": [
              "Baleflamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-baleflamer-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-techno-virus-injector",
            "title": "Techno-virus injector",
            "aliases": [
              "Techno-virus injector"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-techno-virus-injector-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-magma-cutter",
            "title": "Magma cutter",
            "aliases": [
              "Magma cutter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-magma-cutter-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-discordant-on-helstalker-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-discordant-on-helstalker-profile-bolt-pistol-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lord-discordant-on-helstalker-profile-bladed-limbs-melee",
            "title": "Bladed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-bladed-limbs"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-impaler-chainglaive-melee-2",
            "title": "Impaler chainglaive",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Lance",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-impaler-chainglaive"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-helstalker-autocannon-ranged-3",
            "title": "Helstalker autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "2+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-helstalker-autocannon"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-baleflamer-ranged-4",
            "title": "Baleflamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-baleflamer"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-techno-virus-injector-melee-5",
            "title": "Techno-virus injector",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "3+",
            "s": "3",
            "ap": "-3",
            "d": "2",
            "abilities": "Anti-VEHICLE 2+, Extra Attacks",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-techno-virus-injector"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-magma-cutter-ranged-6",
            "title": "Magma cutter",
            "mode": "ranged",
            "range": "6\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-magma-cutter"
            ]
          },
          {
            "id": "unit-lord-discordant-on-helstalker-profile-bolt-pistol-ranged-7",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-lord-discordant-on-helstalker-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-master-of-executions",
      "title": "Master of Executions",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Grenades",
        "Chaos",
        "Master of Executions"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-warp-sighted-butcher",
            "sectionId": "chaos-space-marines-ability-warp-sighted-butcher",
            "title": "Warp-sighted Butcher",
            "text": "While this model is leading a unit, each time a model in that unit makes a melee attack that targets a unit that is below its Starting Strength, you can re-roll the Hit roll. If that unit is Below Half-strength, you can re-roll the Wound roll as well.",
            "sourceUnitId": "unit-master-of-executions"
          },
          {
            "id": "chaos-space-marines-ability-trophy-taker",
            "sectionId": "chaos-space-marines-ability-trophy-taker",
            "title": "Trophy Taker",
            "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP.",
            "sourceUnitId": "unit-master-of-executions"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-master-of-executions"
          }
        ],
        "models": [
          {
            "id": "unit-master-of-executions-model-master-of-executions",
            "title": "Master of Executions",
            "aliases": [
              "Master of Executions"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-master-of-executions-selection-axe-of-dismemberment",
            "title": "Axe of dismemberment",
            "aliases": [
              "Axe of dismemberment"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-executions-profile-axe-of-dismemberment-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-master-of-executions-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-executions-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-master-of-executions-profile-axe-of-dismemberment-melee",
            "title": "Axe of dismemberment",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-master-of-executions-selection-axe-of-dismemberment"
            ]
          },
          {
            "id": "unit-master-of-executions-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-master-of-executions-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-master-of-possession",
      "title": "Master of Possession",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Psyker",
        "Chaos",
        "Master of Possession"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-possessed",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-possessed",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "4",
          "Sv": "3+",
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-daemonkin-psychic",
            "sectionId": "chaos-space-marines-ability-daemonkin-psychic",
            "title": "Daemonkin (Psychic)",
            "text": "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit.",
            "sourceUnitId": "unit-master-of-possession"
          },
          {
            "id": "chaos-space-marines-ability-sacrificial-dagger",
            "sectionId": "chaos-space-marines-ability-sacrificial-dagger",
            "title": "Sacrificial Dagger",
            "text": "Once per phase, when this model is selected to shoot or fight, it can use this ability. If it does, this model’s unit suffers 1 mortal wound and, until the end of the phase, each time this model makes a Psychic Attack, add 1 to the Hit roll and add 1 to the Wound roll.",
            "sourceUnitId": "unit-master-of-possession"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-master-of-possession"
          }
        ],
        "models": [
          {
            "id": "unit-master-of-possession-model-master-of-possession",
            "title": "Master of Possession",
            "aliases": [
              "Master of Possession"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-master-of-possession-selection-rite-of-possession-witchfire",
            "title": "➤ Rite of Possession - witchfire",
            "aliases": [
              "➤ Rite of Possession - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-possession-profile-rite-of-possession-witchfire-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-master-of-possession-selection-rite-of-possession-focused-witchfire",
            "title": "➤ Rite of Possession - focused witchfire",
            "aliases": [
              "➤ Rite of Possession - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-possession-profile-rite-of-possession-focused-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-master-of-possession-selection-staff-of-possession",
            "title": "Staff of possession",
            "aliases": [
              "Staff of possession"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-possession-profile-staff-of-possession-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-master-of-possession-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-master-of-possession-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-master-of-possession-weapon-family-rite-of-possession-selection",
            "title": "➤ Rite of Possession",
            "aliases": [
              "➤ Rite of Possession"
            ],
            "kind": "weapon",
            "familyId": "unit-master-of-possession-weapon-family-rite-of-possession",
            "profileIds": [
              "unit-master-of-possession-profile-rite-of-possession-witchfire-ranged",
              "unit-master-of-possession-profile-rite-of-possession-focused-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-master-of-possession-weapon-family-rite-of-possession",
            "title": "➤ Rite of Possession",
            "aliases": [
              "➤ Rite of Possession"
            ],
            "profileIds": [
              "unit-master-of-possession-profile-rite-of-possession-witchfire-ranged",
              "unit-master-of-possession-profile-rite-of-possession-focused-witchfire-ranged-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-master-of-possession-profile-rite-of-possession-witchfire-ranged",
            "title": "➤ Rite of Possession - witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-3",
            "d": "2",
            "abilities": "Anti-PSYKER 2+, Pistol, Precision, Psychic",
            "sourceSelectionIds": [
              "unit-master-of-possession-selection-rite-of-possession-witchfire",
              "unit-master-of-possession-weapon-family-rite-of-possession-selection"
            ]
          },
          {
            "id": "unit-master-of-possession-profile-rite-of-possession-focused-witchfire-ranged-2",
            "title": "➤ Rite of Possession - focused witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "6",
            "ap": "-3",
            "d": "3",
            "abilities": "Anti-PSYKER 2+, Hazardous, Pistol, Precision, Psychic",
            "sourceSelectionIds": [
              "unit-master-of-possession-selection-rite-of-possession-focused-witchfire",
              "unit-master-of-possession-weapon-family-rite-of-possession-selection"
            ]
          },
          {
            "id": "unit-master-of-possession-profile-staff-of-possession-melee-3",
            "title": "Staff of possession",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "D3",
            "abilities": "Anti-PSYKER 2+, Psychic",
            "sourceSelectionIds": [
              "unit-master-of-possession-selection-staff-of-possession"
            ]
          },
          {
            "id": "unit-master-of-possession-profile-bolt-pistol-ranged-4",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-master-of-possession-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-red-corsairs-reave-captain",
      "title": "Red Corsairs Reave-captain",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Character",
        "Infantry",
        "Chaos",
        "Red Corsairs Reave-captain"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-brutal-raider",
            "sectionId": "chaos-space-marines-ability-brutal-raider",
            "title": "Brutal Raider",
            "text": "Each time this model's unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by this model and improve the Armour Penetration characteristic of those weapons by 1.",
            "sourceUnitId": "unit-red-corsairs-reave-captain"
          },
          {
            "id": "chaos-space-marines-ability-raiders-due",
            "sectionId": "chaos-space-marines-ability-raiders-due",
            "title": "Raider's Due",
            "text": "Each time this unit declares a Charge that targets one or more units that are within range of one or more objective markers, you can re-roll the Charge roll.",
            "sourceUnitId": "unit-red-corsairs-reave-captain"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-red-corsairs-reave-captain"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-red-corsairs-reave-captain"
          }
        ],
        "models": [
          {
            "id": "unit-red-corsairs-reave-captain-model-red-corsairs-reave-captain",
            "title": "Red Corsairs Reave-captain",
            "aliases": [
              "Red Corsairs Reave-captain"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-red-corsairs-reave-captain-selection-power-sword",
            "title": "Power sword",
            "aliases": [
              "Power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-power-sword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-reave-captain-selection-power-maul",
            "title": "Power maul",
            "aliases": [
              "Power maul"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-power-maul-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-reave-captain-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-reave-captain-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-reave-captain-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-reave-captain-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-red-corsairs-reave-captain-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-standard-ranged-4",
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-red-corsairs-reave-captain-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-standard-ranged-4",
              "unit-red-corsairs-reave-captain-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-red-corsairs-reave-captain-profile-power-sword-melee",
            "title": "Power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-red-corsairs-reave-captain-selection-power-sword"
            ]
          },
          {
            "id": "unit-red-corsairs-reave-captain-profile-power-maul-melee-2",
            "title": "Power maul",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-red-corsairs-reave-captain-selection-power-maul"
            ]
          },
          {
            "id": "unit-red-corsairs-reave-captain-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-red-corsairs-reave-captain-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-red-corsairs-reave-captain-profile-plasma-pistol-standard-ranged-4",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-red-corsairs-reave-captain-selection-plasma-pistol-standard",
              "unit-red-corsairs-reave-captain-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-red-corsairs-reave-captain-profile-plasma-pistol-supercharge-ranged-5",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-red-corsairs-reave-captain-selection-plasma-pistol-supercharge",
              "unit-red-corsairs-reave-captain-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sorcerer",
      "title": "Sorcerer",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Psyker",
        "Grenades",
        "Chaos",
        "Sorcerer"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-prescience-psychic",
            "sectionId": "chaos-space-marines-ability-prescience-psychic",
            "title": "Prescience (Psychic)",
            "text": "While this model is leading a unit, each time an attack targets that unit, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-sorcerer"
          },
          {
            "id": "chaos-space-marines-ability-gift-of-chaos-psychic",
            "sectionId": "chaos-space-marines-ability-gift-of-chaos-psychic",
            "title": "Gift of Chaos (Psychic)",
            "text": "Each time this model is selected to shoot or fight, after resolving its attacks, select one enemy unit hit by one or more of those attacks that had the [PSYCHIC] ability. That unit must take a Leadership test: if that test is failed, that unit suffers D3 mortal wounds.",
            "sourceUnitId": "unit-sorcerer"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-sorcerer"
          }
        ],
        "models": [
          {
            "id": "unit-sorcerer-model-sorcerer",
            "title": "Sorcerer",
            "aliases": [
              "Sorcerer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sorcerer-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-selection-infernal-gaze-witchfire",
            "title": "➤ Infernal Gaze - witchfire",
            "aliases": [
              "➤ Infernal Gaze - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-infernal-gaze-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-selection-infernal-gaze-focused-witchfire",
            "title": "➤ Infernal Gaze - focused witchfire",
            "aliases": [
              "➤ Infernal Gaze - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-infernal-gaze-focused-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-selection-force-weapon",
            "title": "Force weapon",
            "aliases": [
              "Force weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-force-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-weapon-family-infernal-gaze-selection",
            "title": "➤ Infernal Gaze",
            "aliases": [
              "➤ Infernal Gaze"
            ],
            "kind": "weapon",
            "familyId": "unit-sorcerer-weapon-family-infernal-gaze",
            "profileIds": [
              "unit-sorcerer-profile-infernal-gaze-witchfire-ranged-2",
              "unit-sorcerer-profile-infernal-gaze-focused-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-sorcerer-weapon-family-infernal-gaze",
            "title": "➤ Infernal Gaze",
            "aliases": [
              "➤ Infernal Gaze"
            ],
            "profileIds": [
              "unit-sorcerer-profile-infernal-gaze-witchfire-ranged-2",
              "unit-sorcerer-profile-infernal-gaze-focused-witchfire-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-sorcerer-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-sorcerer-profile-infernal-gaze-witchfire-ranged-2",
            "title": "➤ Infernal Gaze - witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-infernal-gaze-witchfire",
              "unit-sorcerer-weapon-family-infernal-gaze-selection"
            ]
          },
          {
            "id": "unit-sorcerer-profile-infernal-gaze-focused-witchfire-ranged-3",
            "title": "➤ Infernal Gaze - focused witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-infernal-gaze-focused-witchfire",
              "unit-sorcerer-weapon-family-infernal-gaze-selection"
            ]
          },
          {
            "id": "unit-sorcerer-profile-force-weapon-melee-4",
            "title": "Force weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-force-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sorcerer-in-terminator-armour",
      "title": "Sorcerer in Terminator Armour",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Psyker",
        "Chaos",
        "Terminator",
        "Sorcerer in Terminator Armour"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chaos-terminator-squad",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chaos-terminator-squad",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-warptime-psychic",
            "sectionId": "chaos-space-marines-ability-warptime-psychic",
            "title": "Warptime (Psychic)",
            "text": "While this model is leading a unit, you can re-roll Advance and Charge rolls made for that unit.",
            "sourceUnitId": "unit-sorcerer-in-terminator-armour"
          },
          {
            "id": "chaos-space-marines-ability-death-hex-psychic",
            "sectionId": "chaos-space-marines-ability-death-hex-psychic",
            "title": "Death Hex (Psychic)",
            "text": "At the start of your Shooting phase, one PSYKER with this ability can use it. If it does, select one enemy unit within 12\" of and visible to that PSYKER and roll one D6: on a 1, that PSYKER's unit suffers D3 mortal wounds; on a 2+, until the start of your next Movement phase, each time an attack targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sorcerer-in-terminator-armour"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-sorcerer-in-terminator-armour"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-sorcerer-in-terminator-armour"
          }
        ],
        "models": [
          {
            "id": "unit-sorcerer-in-terminator-armour-model-sorcerer-in-terminator-armour",
            "title": "Sorcerer in Terminator Armour",
            "aliases": [
              "Sorcerer in Terminator Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-combi-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-infernal-gaze-witchfire",
            "title": "➤ Infernal Gaze - witchfire",
            "aliases": [
              "➤ Infernal Gaze - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-infernal-gaze-focused-witchfire",
            "title": "➤ Infernal Gaze - focused witchfire",
            "aliases": [
              "➤ Infernal Gaze - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-force-weapon",
            "title": "Force weapon",
            "aliases": [
              "Force weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-force-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-weapon-family-infernal-gaze-selection",
            "title": "➤ Infernal Gaze",
            "aliases": [
              "➤ Infernal Gaze"
            ],
            "kind": "weapon",
            "familyId": "unit-sorcerer-in-terminator-armour-weapon-family-infernal-gaze",
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-witchfire-ranged-3",
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-selection-chaos-familiar",
            "title": "Chaos Familiar",
            "aliases": [
              "Chaos Familiar"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-sorcerer-in-terminator-armour-wargear-ability-chaos-familiar"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-sorcerer-in-terminator-armour-weapon-family-infernal-gaze",
            "title": "➤ Infernal Gaze",
            "aliases": [
              "➤ Infernal Gaze"
            ],
            "profileIds": [
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-witchfire-ranged-3",
              "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-focused-witchfire-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-sorcerer-in-terminator-armour-profile-combi-bolter-ranged",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-sorcerer-in-terminator-armour-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-sorcerer-in-terminator-armour-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-witchfire-ranged-3",
            "title": "➤ Infernal Gaze - witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-in-terminator-armour-selection-infernal-gaze-witchfire",
              "unit-sorcerer-in-terminator-armour-weapon-family-infernal-gaze-selection"
            ]
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-profile-infernal-gaze-focused-witchfire-ranged-4",
            "title": "➤ Infernal Gaze - focused witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-in-terminator-armour-selection-infernal-gaze-focused-witchfire",
              "unit-sorcerer-in-terminator-armour-weapon-family-infernal-gaze-selection"
            ]
          },
          {
            "id": "unit-sorcerer-in-terminator-armour-profile-force-weapon-melee-5",
            "title": "Force weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-in-terminator-armour-selection-force-weapon"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-sorcerer-in-terminator-armour-wargear-ability-chaos-familiar",
            "title": "Chaos Familiar",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-traitor-enforcer",
      "title": "Traitor Enforcer",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Damned"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-traitor-guardsmen-squad",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-traitor-guardsmen-squad",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "Sv": "5+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-brutal-example",
            "sectionId": "chaos-space-marines-ability-brutal-example",
            "title": "Brutal Example",
            "text": "Once per turn, while this unit is leading a unit and contains a TRAITOR ENFORCER model, you can target that unit with the Fire Overwatch Stratagem for 0CP, and can do so even if you have already targeted a different unit from your army with that Stratagem this phase. Each time you use this ability, one Bodyguard model in that unit is destroyed.",
            "sourceUnitId": "unit-traitor-enforcer"
          },
          {
            "id": "chaos-space-marines-ability-mutated-bodyguard",
            "sectionId": "chaos-space-marines-ability-mutated-bodyguard",
            "title": "Mutated Bodyguard",
            "text": "While this unit contains a Traitor Ogryn model, CHARACTER models in this unit have the Feel No Pain 4+ ability.",
            "sourceUnitId": "unit-traitor-enforcer"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-traitor-enforcer"
          }
        ],
        "models": [
          {
            "id": "unit-traitor-enforcer-model-traitor-enforcer",
            "title": "Traitor Enforcer",
            "aliases": [
              "Traitor Enforcer"
            ]
          },
          {
            "id": "unit-traitor-enforcer-model-traitor-ogryn-2",
            "title": "Traitor Ogryn",
            "aliases": [
              "Traitor Ogryn"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-traitor-enforcer-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-enforcer-profile-power-fist-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-enforcer-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-enforcer-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-enforcer-selection-ogryn-weapons",
            "title": "Ogryn weapons",
            "aliases": [
              "Ogryn weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-enforcer-profile-ogryn-weapons-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-traitor-enforcer-profile-power-fist-melee",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-enforcer-selection-power-fist"
            ]
          },
          {
            "id": "unit-traitor-enforcer-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-traitor-enforcer-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-traitor-enforcer-profile-ogryn-weapons-melee-3",
            "title": "Ogryn weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-enforcer-selection-ogryn-weapons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-warpsmith",
      "title": "Warpsmith",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Chaos",
        "Warpsmith"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-havocs",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-nemesis-claw",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-havocs",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-nemesis-claw",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "2+",
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "60x35.5mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-warpsmith",
            "sectionId": "chaos-space-marines-ability-warpsmith",
            "title": "Warpsmith",
            "text": "While this model is within 3\" of one or more friendly Heretic Astartes Vehicle units, this model has the Lone Operative ability.",
            "sourceUnitId": "unit-warpsmith"
          },
          {
            "id": "chaos-space-marines-ability-master-of-mechanisms",
            "sectionId": "chaos-space-marines-ability-master-of-mechanisms",
            "title": "Master of Mechanisms",
            "text": "In your Command phase, select one friendly Heretic Astartes Vehicle model within 3\" of this model. That Vehicle model regains up to D3 lost wounds and, until the start of your next Command phase, each time that Vehicle makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per Command phase.",
            "sourceUnitId": "unit-warpsmith"
          },
          {
            "id": "chaos-space-marines-ability-enrage-machine-spirits",
            "sectionId": "chaos-space-marines-ability-enrage-machine-spirits",
            "title": "Enrage Machine Spirits",
            "text": "At the end of your Movement phase, select one enemy Vehicle unit within 12\" of this model. That unit must take a Battle-shock test.",
            "sourceUnitId": "unit-warpsmith"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-warpsmith"
          }
        ],
        "models": [
          {
            "id": "unit-warpsmith-model-warpsmith",
            "title": "Warpsmith",
            "aliases": [
              "Warpsmith"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-warpsmith-selection-flamer-tendril",
            "title": "Flamer tendril",
            "aliases": [
              "Flamer tendril"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warpsmith-profile-flamer-tendril-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-warpsmith-selection-forge-weapon",
            "title": "Forge weapon",
            "aliases": [
              "Forge weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warpsmith-profile-forge-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-warpsmith-selection-melta-tendril",
            "title": "Melta tendril",
            "aliases": [
              "Melta tendril"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warpsmith-profile-melta-tendril-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-warpsmith-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warpsmith-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-warpsmith-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warpsmith-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-warpsmith-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-warpsmith-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-warpsmith-profile-plasma-pistol-standard-ranged-4",
              "unit-warpsmith-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-warpsmith-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-warpsmith-profile-plasma-pistol-standard-ranged-4",
              "unit-warpsmith-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-warpsmith-profile-flamer-tendril-ranged",
            "title": "Flamer tendril",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Pistol, Torrent",
            "sourceSelectionIds": [
              "unit-warpsmith-selection-flamer-tendril"
            ]
          },
          {
            "id": "unit-warpsmith-profile-forge-weapon-melee-2",
            "title": "Forge weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-VEHICLE 4+",
            "sourceSelectionIds": [
              "unit-warpsmith-selection-forge-weapon"
            ]
          },
          {
            "id": "unit-warpsmith-profile-melta-tendril-ranged-3",
            "title": "Melta tendril",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 1, Pistol",
            "sourceSelectionIds": [
              "unit-warpsmith-selection-melta-tendril"
            ]
          },
          {
            "id": "unit-warpsmith-profile-plasma-pistol-standard-ranged-4",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-warpsmith-selection-plasma-pistol-standard",
              "unit-warpsmith-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-warpsmith-profile-plasma-pistol-supercharge-ranged-5",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-warpsmith-selection-plasma-pistol-supercharge",
              "unit-warpsmith-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-rhino",
      "title": "Chaos Rhino",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Transport",
        "Dedicated Transport",
        "Chaos",
        "Rhino",
        "Smoke",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "9",
          "Sv": "3+",
          "W": "10",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-self-repair",
            "sectionId": "chaos-space-marines-ability-self-repair",
            "title": "Self-repair",
            "text": "At the start of your Command phase, this model regains 1 lost wound.",
            "sourceUnitId": "unit-chaos-rhino"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-chaos-rhino"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-rhino"
          },
          {
            "id": "core-firing-deck",
            "sectionId": "core-firing-deck",
            "title": "Firing Deck 2",
            "text": "This ability always takes the form Firing Deck X. In your Shooting phase, each time this TRANSPORT is selected to shoot, if one or more units are embarked within it, resolve the following sequence: \n1. Select up to X models embarked within this TRANSPORT (excluding models whose units have already been selected to shoot this phase). \n2. For each selected model, select one of its ranged weapons (excluding [ONE SHOT] weapons). \n3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons. \n4. Until the end of the turn, units embarked within this TRANSPORT are not eligible to shoot.",
            "sourceUnitId": "unit-chaos-rhino"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-rhino-model-chaos-rhino",
            "title": "Chaos Rhino",
            "aliases": [
              "Chaos Rhino"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-rhino-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-combi-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-rhino-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-rhino-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-armoured-tracks-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-rhino-selection-havoc-launcher",
            "title": "Havoc launcher",
            "aliases": [
              "Havoc launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-havoc-launcher-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-rhino-profile-combi-bolter-ranged",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-rhino-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-rhino-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-rhino-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-rhino-profile-armoured-tracks-melee-3",
            "title": "Armoured tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-rhino-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-chaos-rhino-profile-havoc-launcher-ranged-4",
            "title": "Havoc launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-rhino-selection-havoc-launcher"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-abaddon-the-despoiler",
      "title": "Abaddon the Despoiler",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Epic Hero",
        "Terminator",
        "Chaos Undivided",
        "Chaos",
        "Abaddon the Despoiler"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chaos-terminator-squad",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chaos-terminator-squad",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "W": "9",
          "Ld": "5+",
          "OC": "4",
          "Invulnerable": "4+",
          "Base": "60mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-the-warmaster",
            "sectionId": "chaos-space-marines-ability-the-warmaster",
            "title": "The Warmaster",
            "text": "In your Command phase, select one Warmaster ability. Until the start of your next Command phase, this model has that ability.",
            "sourceUnitId": "unit-abaddon-the-despoiler"
          },
          {
            "id": "chaos-space-marines-ability-dark-destiny",
            "sectionId": "chaos-space-marines-ability-dark-destiny",
            "title": "Dark Destiny",
            "text": "Each time this model makes a Dark Pact and does not fail the resulting leadership roll, if the result of that roll was 7+, you gain 1CP.",
            "sourceUnitId": "unit-abaddon-the-despoiler"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-abaddon-the-despoiler"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-abaddon-the-despoiler"
          }
        ],
        "models": [
          {
            "id": "unit-abaddon-the-despoiler-model-abaddon-the-despoiler",
            "title": "Abaddon the Despoiler",
            "aliases": [
              "Abaddon the Despoiler"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-abaddon-the-despoiler-selection-talon-of-horus",
            "title": "Talon of Horus",
            "aliases": [
              "Talon of Horus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-abaddon-the-despoiler-profile-talon-of-horus-ranged",
              "unit-abaddon-the-despoiler-profile-talon-of-horus-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-abaddon-the-despoiler-selection-drachnyen",
            "title": "Drach'nyen",
            "aliases": [
              "Drach'nyen"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-abaddon-the-despoiler-profile-drachnyen-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-abaddon-the-despoiler-profile-talon-of-horus-ranged",
            "title": "Talon of Horus",
            "mode": "ranged",
            "range": "24\"",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-abaddon-the-despoiler-selection-talon-of-horus"
            ]
          },
          {
            "id": "unit-abaddon-the-despoiler-profile-talon-of-horus-melee-2",
            "title": "Talon of Horus",
            "mode": "melee",
            "range": "Melee",
            "a": "14",
            "skill": "2+",
            "s": "7",
            "ap": "-3",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-abaddon-the-despoiler-selection-talon-of-horus"
            ]
          },
          {
            "id": "unit-abaddon-the-despoiler-profile-drachnyen-melee-3",
            "title": "Drach'nyen",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "14",
            "ap": "-4",
            "d": "3",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-abaddon-the-despoiler-selection-drachnyen"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-cypher",
      "title": "Cypher",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Epic Hero",
        "Chaos",
        "Cypher",
        "Fallen"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-agent-of-discord-aura",
            "sectionId": "chaos-space-marines-ability-agent-of-discord-aura",
            "title": "Agent of Discord (Aura)",
            "text": "Once per turn, when your opponent targets a unit from their army within 12” of this model with a stratagem, you can use this ability. If you do increase the CP cost of that use of that stratagem by 1CP.",
            "sourceUnitId": "unit-cypher"
          },
          {
            "id": "chaos-space-marines-ability-guns-blazing",
            "sectionId": "chaos-space-marines-ability-guns-blazing",
            "title": "Guns Blazing",
            "text": "Once per turn, in your opponent's Shooting phase, when an enemy unit makes a ranged attacks that targets a friendly HERETIC ASTARTES unit within 3\" of this model, after that enemy unit has shot, this model can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so and can only do so if that enemy unit is an eligible target.",
            "sourceUnitId": "unit-cypher"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-cypher"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-cypher"
          }
        ],
        "models": [
          {
            "id": "unit-cypher-model-cypher",
            "title": "Cypher",
            "aliases": [
              "Cypher"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-cypher-selection-cyphers-bolt-pistol",
            "title": "Cypher's bolt pistol",
            "aliases": [
              "Cypher's bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cypher-profile-cyphers-bolt-pistol-ranged",
              "unit-cypher-profile-cyphers-bolt-pistol-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cypher-selection-cyphers-plasma-pistol",
            "title": "Cypher's plasma pistol",
            "aliases": [
              "Cypher's plasma pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cypher-profile-cyphers-plasma-pistol-ranged-3",
              "unit-cypher-profile-cyphers-plasma-pistol-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-cypher-profile-cyphers-bolt-pistol-ranged",
            "title": "Cypher's bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Pistol, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-cypher-selection-cyphers-bolt-pistol"
            ]
          },
          {
            "id": "unit-cypher-profile-cyphers-bolt-pistol-melee-2",
            "title": "Cypher's bolt pistol",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-cypher-selection-cyphers-bolt-pistol"
            ]
          },
          {
            "id": "unit-cypher-profile-cyphers-plasma-pistol-ranged-3",
            "title": "Cypher's plasma pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Assault, Pistol, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-cypher-selection-cyphers-plasma-pistol"
            ]
          },
          {
            "id": "unit-cypher-profile-cyphers-plasma-pistol-melee-4",
            "title": "Cypher's plasma pistol",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-cypher-selection-cyphers-plasma-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-fabius-bile",
      "title": "Fabius Bile",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-accursed-cultists",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-cultist-mob",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-accursed-cultists",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-cultist-mob",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-enhanced-warriors",
            "sectionId": "chaos-space-marines-ability-enhanced-warriors",
            "title": "Enhanced Warriors",
            "text": "If this unit is attached to a unit at the start of the battle, until the end of the battle, add 1 to the Strength characteristic of melee weapons equipped by Bodyguard models in that unit and add 1 to the Toughness characteristic of Bodyguard models in that unit.",
            "sourceUnitId": "unit-fabius-bile"
          },
          {
            "id": "chaos-space-marines-ability-surgeon-acolyte",
            "sectionId": "chaos-space-marines-ability-surgeon-acolyte",
            "title": "Surgeon Acolyte",
            "text": "Once per turn, when an attack is allocated to a model in this unit, if this unit contains Fabius Bile, you can change the Damage characteristic of that attack to 0.",
            "sourceUnitId": "unit-fabius-bile"
          },
          {
            "id": "chaos-space-marines-ability-chirurgeon",
            "sectionId": "chaos-space-marines-ability-chirurgeon",
            "title": "Chirurgeon",
            "text": "The first time this unit’s Fabius Bile model is destroyed, at the end of the phase, roll one D6: on a 2+, set it back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy models, with its full wounds remaining.",
            "sourceUnitId": "unit-fabius-bile"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-fabius-bile"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-fabius-bile"
          }
        ],
        "models": [
          {
            "id": "unit-fabius-bile-model-fabius-bile",
            "title": "Fabius Bile",
            "aliases": [
              "Fabius Bile"
            ]
          },
          {
            "id": "unit-fabius-bile-model-surgeon-acolyte-2",
            "title": "Surgeon Acolyte",
            "aliases": [
              "Surgeon Acolyte"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-fabius-bile-selection-xyclos-needler",
            "title": "Xyclos needler",
            "aliases": [
              "Xyclos needler"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fabius-bile-profile-xyclos-needler-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fabius-bile-selection-the-chirurgeon",
            "title": "The Chirurgeon",
            "aliases": [
              "The Chirurgeon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fabius-bile-profile-the-chirurgeon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fabius-bile-selection-rod-of-torment",
            "title": "Rod of Torment",
            "aliases": [
              "Rod of Torment"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fabius-bile-profile-rod-of-torment-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fabius-bile-selection-surgeon-acolytes-tools",
            "title": "Surgeon Acolyte's tools",
            "aliases": [
              "Surgeon Acolyte's tools"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fabius-bile-profile-surgeon-acolytes-tools-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-fabius-bile-profile-xyclos-needler-ranged",
            "title": "Xyclos needler",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "2+",
            "s": "2",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-INFANTRY 2+, Pistol",
            "sourceSelectionIds": [
              "unit-fabius-bile-selection-xyclos-needler"
            ]
          },
          {
            "id": "unit-fabius-bile-profile-the-chirurgeon-melee-2",
            "title": "The Chirurgeon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-fabius-bile-selection-the-chirurgeon"
            ]
          },
          {
            "id": "unit-fabius-bile-profile-rod-of-torment-melee-3",
            "title": "Rod of Torment",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-fabius-bile-selection-rod-of-torment"
            ]
          },
          {
            "id": "unit-fabius-bile-profile-surgeon-acolytes-tools-melee-4",
            "title": "Surgeon Acolyte's tools",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-fabius-bile-selection-surgeon-acolytes-tools"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-haarken-worldclaimer",
      "title": "Haarken Worldclaimer",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Epic Hero",
        "Fly",
        "Jump Pack",
        "Chaos",
        "Chaos Undivided",
        "Haarken Worldclaimer"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-raptors",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-raptors",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "4",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-head-taker",
            "sectionId": "chaos-space-marines-ability-head-taker",
            "title": "Head Taker",
            "text": "While this model is leading a unit, each time this model’s unit ends a Charge move, select one enemy unit within Engagement Range of this model’s unit and roll one D6 for each model in this model’s unit which is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound.",
            "sourceUnitId": "unit-haarken-worldclaimer"
          },
          {
            "id": "chaos-space-marines-ability-herald-of-the-apocalypse-aura",
            "sectionId": "chaos-space-marines-ability-herald-of-the-apocalypse-aura",
            "title": "Herald of the Apocalypse (Aura)",
            "text": "While an enemy unit is within 6\" of this model, in the Battle-shock step of your opponent’s Command phase, if that enemy unit is below its Starting Strength, it must take a Battle-shock test. This ability cannot cause a unit to take two Battle-shock tests in the same phase.",
            "sourceUnitId": "unit-haarken-worldclaimer"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-haarken-worldclaimer"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-haarken-worldclaimer"
          }
        ],
        "models": [
          {
            "id": "unit-haarken-worldclaimer-model-haarken-worldclaimer",
            "title": "Haarken Worldclaimer",
            "aliases": [
              "Haarken Worldclaimer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-haarken-worldclaimer-selection-hellspear",
            "title": "Hellspear",
            "aliases": [
              "Hellspear"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-haarken-worldclaimer-profile-hellspear-ranged",
              "unit-haarken-worldclaimer-profile-hellspear-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-haarken-worldclaimer-selection-heralds-talon",
            "title": "Herald's Talon",
            "aliases": [
              "Herald's Talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-haarken-worldclaimer-profile-heralds-talon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-haarken-worldclaimer-profile-hellspear-ranged",
            "title": "Hellspear",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Assault, Sustained Hits D3",
            "sourceSelectionIds": [
              "unit-haarken-worldclaimer-selection-hellspear"
            ]
          },
          {
            "id": "unit-haarken-worldclaimer-profile-hellspear-melee-2",
            "title": "Hellspear",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Extra Attacks, Lance, Sustained Hits D3",
            "sourceSelectionIds": [
              "unit-haarken-worldclaimer-selection-hellspear"
            ]
          },
          {
            "id": "unit-haarken-worldclaimer-profile-heralds-talon-melee-3",
            "title": "Herald's Talon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-haarken-worldclaimer-selection-heralds-talon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-huron-blackheart",
      "title": "Huron Blackheart",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Epic Hero",
        "Chaos",
        "Chaos Undivided",
        "Huron Blackheart"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chaos-terminator-squad",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-masters-of-the-maelstrom",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chaos-terminator-squad",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-masters-of-the-maelstrom",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "5",
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-lord-of-badab-aura",
            "sectionId": "chaos-space-marines-ability-lord-of-badab-aura",
            "title": "Lord of Badab (Aura)",
            "text": "While a friendly Heretic Astartes Infantry unit (excluding Battle-shocked units and Damned units) is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit.",
            "sourceUnitId": "unit-huron-blackheart"
          },
          {
            "id": "chaos-space-marines-ability-hamadryas-knowledge-psychic",
            "sectionId": "chaos-space-marines-ability-hamadryas-knowledge-psychic",
            "title": "Hamadrya’s Knowledge (Psychic)",
            "text": "Once per battle round, when an enemy unit ends a Normal, Advance or Fall Back move within 8\" of this model’s unit, if this model’s unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to D3+3\".",
            "sourceUnitId": "unit-huron-blackheart"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-huron-blackheart"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-huron-blackheart"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-huron-blackheart"
          }
        ],
        "models": [
          {
            "id": "unit-huron-blackheart-model-huron-blackheart",
            "title": "Huron Blackheart",
            "aliases": [
              "Huron Blackheart"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-huron-blackheart-selection-tyrants-claw-heavy-flamer",
            "title": "Tyrant's Claw heavy flamer",
            "aliases": [
              "Tyrant's Claw heavy flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-huron-blackheart-profile-tyrants-claw-heavy-flamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-huron-blackheart-selection-tyrants-claw-and-exalted-power-weapon",
            "title": "Tyrant's Claw and exalted power weapon",
            "aliases": [
              "Tyrant's Claw and exalted power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-huron-blackheart-profile-tyrants-claw-and-exalted-power-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-huron-blackheart-profile-tyrants-claw-heavy-flamer-ranged",
            "title": "Tyrant's Claw heavy flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+2",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Pistol, Torrent",
            "sourceSelectionIds": [
              "unit-huron-blackheart-selection-tyrants-claw-heavy-flamer"
            ]
          },
          {
            "id": "unit-huron-blackheart-profile-tyrants-claw-and-exalted-power-weapon-melee-2",
            "title": "Tyrant's Claw and exalted power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-huron-blackheart-selection-tyrants-claw-and-exalted-power-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kravek-morne",
      "title": "Kravek Morne",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Character",
        "Epic Hero",
        "Chaos",
        "Chaos Undivided",
        "Terminator",
        "Kravek Morne"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-chaos-terminator-squad",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-mutilators",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-obliterators",
            "maxCharacters": 1
          }
        ],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [
            {
              "unitId": "unit-chaos-terminator-squad",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-mutilators",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-obliterators",
              "maxCharacters": 1
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-headlong-destruction",
            "sectionId": "chaos-space-marines-ability-headlong-destruction",
            "title": "Headlong Destruction",
            "text": "Each time a model in this unit makes an attack that targets the closest eligible enemy unit, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-kravek-morne"
          },
          {
            "id": "chaos-space-marines-ability-architect-of-ruin",
            "sectionId": "chaos-space-marines-ability-architect-of-ruin",
            "title": "Architect of Ruin",
            "text": "At the start of the battle, select one unit in your opponent’s army to be this model’s hated foe. Each time this model makes an attack that targets its hated foe, you can re-roll the Wound roll. Each time this model’s hated foe is destroyed, you can select a new unit from your opponent’s army to be its hated foe.",
            "sourceUnitId": "unit-kravek-morne"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-kravek-morne"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-kravek-morne"
          }
        ],
        "models": [
          {
            "id": "unit-kravek-morne-model-kravek-morne",
            "title": "Kravek Morne",
            "aliases": [
              "Kravek Morne"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kravek-morne-selection-baleflamer",
            "title": "Baleflamer",
            "aliases": [
              "Baleflamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kravek-morne-profile-baleflamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kravek-morne-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kravek-morne-profile-combi-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kravek-morne-selection-last-argument-and-power-fist",
            "title": "Last Argument and power fist",
            "aliases": [
              "Last Argument and power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kravek-morne-profile-last-argument-and-power-fist-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kravek-morne-selection-servo-harness",
            "title": "Servo-harness",
            "aliases": [
              "Servo-harness"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kravek-morne-profile-servo-harness-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kravek-morne-profile-baleflamer-ranged",
            "title": "Baleflamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-kravek-morne-selection-baleflamer"
            ]
          },
          {
            "id": "unit-kravek-morne-profile-combi-bolter-ranged-2",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-kravek-morne-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-kravek-morne-profile-last-argument-and-power-fist-melee-3",
            "title": "Last Argument and power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "10",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-kravek-morne-selection-last-argument-and-power-fist"
            ]
          },
          {
            "id": "unit-kravek-morne-profile-servo-harness-melee-4",
            "title": "Servo-harness",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Vehicle 2+, Extra Attacks",
            "sourceSelectionIds": [
              "unit-kravek-morne-selection-servo-harness"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-masters-of-the-maelstrom",
      "title": "Masters of the Maelstrom",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Epic Hero",
        "Infantry",
        "Grenades",
        "Chaos",
        "Chaos Undivided",
        "Masters of the Maelstrom",
        "Heretic Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-chosen",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-legionaries",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-raiders",
            "maxCharacters": 2
          }
        ],
        "canBeLedBy": [
          {
            "unitId": "unit-huron-blackheart",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [
            {
              "unitId": "unit-chosen",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-legionaries",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-raiders",
              "maxCharacters": 2
            }
          ],
          "canBeLedBy": [
            {
              "unitId": "unit-huron-blackheart",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-fleet-command",
            "sectionId": "chaos-space-marines-ability-fleet-command",
            "title": "Fleet Command",
            "text": "After both players have deployed their armies, if this unit is on the battlefield (or any Transport it is embarked within is on the battlefield) select up to three Heretic Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
            "sourceUnitId": "unit-masters-of-the-maelstrom"
          },
          {
            "id": "chaos-space-marines-ability-plunder",
            "sectionId": "chaos-space-marines-ability-plunder",
            "title": "Plunder",
            "text": "Once per battle, after this unit ends a Normal move, you can select one visible enemy unit within 12\" of it and roll one D6: on a 2+, that enemy unit suffers D3+1 mortal wounds.",
            "sourceUnitId": "unit-masters-of-the-maelstrom"
          },
          {
            "id": "chaos-space-marines-ability-masters-of-the-maelstrom",
            "sectionId": "chaos-space-marines-ability-masters-of-the-maelstrom",
            "title": "Masters of the Maelstrom",
            "text": "At the start of the Declare Battle Formations step, this unit can join one of the following units. This unit then counts as part of that unit for the rest of the battle, and that unit’s Starting Strength is increased accordingly.\n- Chosen, Legionaries, Red Corsairs Raiders \n\n\nThis unit cannot join an Attached unit, and only Huron Blackheart can join a unit this unit has joined.",
            "sourceUnitId": "unit-masters-of-the-maelstrom"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-masters-of-the-maelstrom"
          }
        ],
        "models": [
          {
            "id": "unit-masters-of-the-maelstrom-model-garreon-the-corpsemaster",
            "title": "Garreon the Corpsemaster",
            "aliases": [
              "Garreon the Corpsemaster"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-model-garlon-souleater-2",
            "title": "Garlon Souleater",
            "aliases": [
              "Garlon Souleater"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-model-katar-garrix-3",
            "title": "Katar Garrix",
            "aliases": [
              "Katar Garrix"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-model-captain-sargotta-4",
            "title": "Captain Sargotta",
            "aliases": [
              "Captain Sargotta"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-model-the-enforcer-5",
            "title": "The Enforcer",
            "aliases": [
              "The Enforcer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-masters-of-the-maelstrom-selection-absolver-bolt-pistol",
            "title": "Absolver bolt pistol",
            "aliases": [
              "Absolver bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-absolver-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-reductor-array",
            "title": "Reductor array",
            "aliases": [
              "Reductor array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-reductor-array-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-mind-wrench",
            "title": "Mind Wrench",
            "aliases": [
              "Mind Wrench"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-mind-wrench-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-force-stave",
            "title": "Force stave",
            "aliases": [
              "Force stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-force-stave-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-axe-of-ending",
            "title": "Axe of Ending",
            "aliases": [
              "Axe of Ending"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-axe-of-ending-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-bolt-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-power-sabre",
            "title": "Power sabre",
            "aliases": [
              "Power sabre"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-power-sabre-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-laspistol",
            "title": "Laspistol",
            "aliases": [
              "Laspistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-laspistol-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-londaxi-maimer",
            "title": "Londaxi maimer",
            "aliases": [
              "Londaxi maimer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-londaxi-maimer-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-masters-of-the-maelstrom-selection-bionic-gauntlet",
            "title": "Bionic gauntlet",
            "aliases": [
              "Bionic gauntlet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-masters-of-the-maelstrom-profile-bionic-gauntlet-melee-10"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-masters-of-the-maelstrom-profile-absolver-bolt-pistol-ranged",
            "title": "Absolver bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-absolver-bolt-pistol"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-reductor-array-melee-2",
            "title": "Reductor array",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-reductor-array"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-mind-wrench-ranged-3",
            "title": "Mind Wrench",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "Precision, Psychic",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-mind-wrench"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-force-stave-melee-4",
            "title": "Force stave",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-force-stave"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-axe-of-ending-melee-5",
            "title": "Axe of Ending",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-CHARACTER 2+, Precision",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-axe-of-ending"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-bolt-pistol-ranged-6",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-power-sabre-melee-7",
            "title": "Power sabre",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-power-sabre"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-laspistol-ranged-8",
            "title": "Laspistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-laspistol"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-londaxi-maimer-ranged-9",
            "title": "Londaxi maimer",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-londaxi-maimer"
            ]
          },
          {
            "id": "unit-masters-of-the-maelstrom-profile-bionic-gauntlet-melee-10",
            "title": "Bionic gauntlet",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-masters-of-the-maelstrom-selection-bionic-gauntlet"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-vashtorr-the-arkifane",
      "title": "Vashtorr the Arkifane",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Monster",
        "Character",
        "Epic Hero",
        "Fly",
        "Chaos",
        "Daemon",
        "Vashtorr the Arkifane"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "10",
          "Sv": "2+",
          "W": "14",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "4+",
          "Base": "80mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-unholy-mechanisms-aura",
            "sectionId": "chaos-space-marines-ability-unholy-mechanisms-aura",
            "title": "Unholy Mechanisms (Aura)",
            "text": "While a friendly Daemon Vehicle unit is within 6\" of this model, add 2 to the Strength characteristic of weapons equipped by models in that unit.",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "chaos-space-marines-ability-reorder-reality",
            "sectionId": "chaos-space-marines-ability-reorder-reality",
            "title": "Reorder Reality",
            "text": "Each time an enemy unit within 18\" of this model targets this model, subtract 1 from the Hit roll and, until the end of the phase, that enemy unit’s ranged weapons have the [HAZARDOUS] ability.",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "chaos-space-marines-ability-indentured-daemon-engines",
            "sectionId": "chaos-space-marines-ability-indentured-daemon-engines",
            "title": "Indentured Daemon Engines",
            "text": "While this model is within 3\" of one or more friendly Daemon Vehicle units, this model has the Lone Operative ability.",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-vashtorr-the-arkifane"
          }
        ],
        "models": [
          {
            "id": "unit-vashtorr-the-arkifane-model-vashtorr-the-arkifane",
            "title": "Vashtorr the Arkifane",
            "aliases": [
              "Vashtorr the Arkifane"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-vashtorr-the-arkifane-selection-vashtorrs-claw",
            "title": "Vashtorr's claw",
            "aliases": [
              "Vashtorr's claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vashtorr-the-arkifane-profile-vashtorrs-claw-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vashtorr-the-arkifane-selection-vashtorrs-hammer-strike",
            "title": "➤ Vashtorr's hammer - strike",
            "aliases": [
              "➤ Vashtorr's hammer - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-strike-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vashtorr-the-arkifane-selection-vashtorrs-hammer-sweep",
            "title": "➤ Vashtorr's hammer - sweep",
            "aliases": [
              "➤ Vashtorr's hammer - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-sweep-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vashtorr-the-arkifane-weapon-family-vashtorrs-hammer-selection",
            "title": "➤ Vashtorr's hammer",
            "aliases": [
              "➤ Vashtorr's hammer"
            ],
            "kind": "weapon",
            "familyId": "unit-vashtorr-the-arkifane-weapon-family-vashtorrs-hammer",
            "profileIds": [
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-strike-melee-2",
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-sweep-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-vashtorr-the-arkifane-weapon-family-vashtorrs-hammer",
            "title": "➤ Vashtorr's hammer",
            "aliases": [
              "➤ Vashtorr's hammer"
            ],
            "profileIds": [
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-strike-melee-2",
              "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-sweep-melee-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-vashtorr-the-arkifane-profile-vashtorrs-claw-ranged",
            "title": "Vashtorr's claw",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Anti-VEHICLE 4+, Torrent",
            "sourceSelectionIds": [
              "unit-vashtorr-the-arkifane-selection-vashtorrs-claw"
            ]
          },
          {
            "id": "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-strike-melee-2",
            "title": "➤ Vashtorr's hammer - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "3",
            "abilities": "Anti-VEHICLE 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-vashtorr-the-arkifane-selection-vashtorrs-hammer-strike",
              "unit-vashtorr-the-arkifane-weapon-family-vashtorrs-hammer-selection"
            ]
          },
          {
            "id": "unit-vashtorr-the-arkifane-profile-vashtorrs-hammer-sweep-melee-3",
            "title": "➤ Vashtorr's hammer - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "2+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-VEHICLE 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-vashtorr-the-arkifane-selection-vashtorrs-hammer-sweep",
              "unit-vashtorr-the-arkifane-weapon-family-vashtorrs-hammer-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-accursed-cultists",
      "title": "Accursed Cultists",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Accursed Cultists",
        "Damned"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-cultist-firebrand",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-dark-commune",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-fabius-bile",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-cultist-firebrand",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-dark-commune",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-fabius-bile",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "6+",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-howling-horde",
            "sectionId": "chaos-space-marines-ability-howling-horde",
            "title": "Howling Horde",
            "text": "In your opponent's Shooting phase, when an enemy unit has shot, if a model from this unit was destroyed as a result of those attacks, this unit can make a surge move of up to D6\".",
            "sourceUnitId": "unit-accursed-cultists"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-accursed-cultists"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 6+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-accursed-cultists"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 6\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-accursed-cultists"
          }
        ],
        "models": [
          {
            "id": "unit-accursed-cultists-model-torment",
            "title": "Torment",
            "aliases": [
              "Torment"
            ]
          },
          {
            "id": "unit-accursed-cultists-model-mutant-2",
            "title": "Mutant",
            "aliases": [
              "Mutant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-accursed-cultists-selection-hideous-mutations",
            "title": "Hideous mutations",
            "aliases": [
              "Hideous mutations"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-accursed-cultists-profile-hideous-mutations-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-accursed-cultists-selection-blasphemous-appendages",
            "title": "Blasphemous appendages",
            "aliases": [
              "Blasphemous appendages"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-accursed-cultists-profile-blasphemous-appendages-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-accursed-cultists-profile-hideous-mutations-melee",
            "title": "Hideous mutations",
            "mode": "melee",
            "range": "Melee",
            "a": "D6+2",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-accursed-cultists-selection-hideous-mutations"
            ]
          },
          {
            "id": "unit-accursed-cultists-profile-blasphemous-appendages-melee-2",
            "title": "Blasphemous appendages",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-accursed-cultists-selection-blasphemous-appendages"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-terminator-squad",
      "title": "Chaos Terminator Squad",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Terminator",
        "Chaos Terminator Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-abaddon-the-despoiler",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chaos-lord-in-terminator-armour",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-huron-blackheart",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kravek-morne",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-sorcerer-in-terminator-armour",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-abaddon-the-despoiler",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chaos-lord-in-terminator-armour",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-huron-blackheart",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kravek-morne",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-sorcerer-in-terminator-armour",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-despoilers",
            "sectionId": "chaos-space-marines-ability-despoilers",
            "title": "Despoilers",
            "text": "Each time this unit makes a Dark Pact, until the end of the phase, each time a model in this unit makes an attack, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-chaos-terminator-squad"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-terminator-squad"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-chaos-terminator-squad"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-terminator-squad-model-4-9-chaos-terminators",
            "title": "4-9 Chaos Terminators",
            "aliases": [
              "4-9 Chaos Terminators"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-model-terminator-champion-2",
            "title": "Terminator Champion",
            "aliases": [
              "Terminator Champion"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-terminator-squad-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-combi-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-accursed-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-combi-weapon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-power-fist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-chainfist",
            "title": "Chainfist",
            "aliases": [
              "Chainfist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-chainfist-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-heavy-flamer",
            "title": "Heavy flamer",
            "aliases": [
              "Heavy flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-heavy-flamer-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-reaper-autocannon",
            "title": "Reaper autocannon",
            "aliases": [
              "Reaper autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-reaper-autocannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminator-squad-selection-paired-accursed-weapons",
            "title": "Paired accursed weapons",
            "aliases": [
              "Paired accursed weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminator-squad-profile-paired-accursed-weapons-melee-8"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-terminator-squad-profile-combi-bolter-ranged",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-accursed-weapon-melee-2",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-combi-weapon-ranged-3",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-power-fist-melee-4",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-chainfist-melee-5",
            "title": "Chainfist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-VEHICLE 3+",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-chainfist"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-heavy-flamer-ranged-6",
            "title": "Heavy flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-reaper-autocannon-ranged-7",
            "title": "Reaper autocannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "4",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-reaper-autocannon"
            ]
          },
          {
            "id": "unit-chaos-terminator-squad-profile-paired-accursed-weapons-melee-8",
            "title": "Paired accursed weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chaos-terminator-squad-selection-paired-accursed-weapons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chosen",
      "title": "Chosen",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Chaos",
        "Chosen"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-abaddon-the-despoiler",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaos-lord",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fabius-bile",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-huron-blackheart",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-master-of-possession",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-reave-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sorcerer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-warpsmith",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-masters-of-the-maelstrom",
            "maxCharacters": 2
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-abaddon-the-despoiler",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaos-lord",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fabius-bile",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-huron-blackheart",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-master-of-possession",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-reave-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sorcerer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-warpsmith",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-masters-of-the-maelstrom",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-chosen-marauders",
            "sectionId": "chaos-space-marines-ability-chosen-marauders",
            "title": "Chosen Marauders",
            "text": "This unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.",
            "sourceUnitId": "unit-chosen"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chosen"
          }
        ],
        "models": [
          {
            "id": "unit-chosen-model-4-9-chosen",
            "title": "4-9 Chosen",
            "aliases": [
              "4-9 Chosen"
            ]
          },
          {
            "id": "unit-chosen-model-chosen-champion-2",
            "title": "Chosen Champion",
            "aliases": [
              "Chosen Champion"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chosen-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-boltgun-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-accursed-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-combi-weapon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-paired-accursed-weapons",
            "title": "Paired accursed weapons",
            "aliases": [
              "Paired accursed weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-paired-accursed-weapons-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chosen-profile-power-fist-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chosen-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chosen-profile-plasma-pistol-standard-ranged-4",
              "unit-chosen-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chosen-selection-chaos-icon",
            "title": "Chaos icon",
            "aliases": [
              "Chaos icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-chosen-wargear-ability-chaos-icon"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chosen-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chosen-profile-plasma-pistol-standard-ranged-4",
              "unit-chosen-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chosen-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chosen-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-chosen-profile-boltgun-ranged-2",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chosen-selection-boltgun"
            ]
          },
          {
            "id": "unit-chosen-profile-accursed-weapon-melee-3",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chosen-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chosen-profile-plasma-pistol-standard-ranged-4",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chosen-selection-plasma-pistol-standard",
              "unit-chosen-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chosen-profile-plasma-pistol-supercharge-ranged-5",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-chosen-selection-plasma-pistol-supercharge",
              "unit-chosen-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chosen-profile-combi-weapon-ranged-6",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chosen-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chosen-profile-paired-accursed-weapons-melee-7",
            "title": "Paired accursed weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chosen-selection-paired-accursed-weapons"
            ]
          },
          {
            "id": "unit-chosen-profile-power-fist-melee-8",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chosen-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-chosen-wargear-ability-chaos-icon",
            "title": "Chaos icon",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-fellgor-beastmen",
      "title": "Fellgor Beastmen",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Chaos",
        "Fellgor Beastmen",
        "Damned"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "5+",
          "W": "1",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-bestial-raiders",
            "sectionId": "chaos-space-marines-ability-bestial-raiders",
            "title": "Bestial Raiders",
            "text": "If this unit begins the game in Strategic Reserves, it can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. If this unit is in Strategic Reserves, for the purposes of setting it up on the battlefield, treat the current battle round number as being one higher than it actually is.",
            "sourceUnitId": "unit-fellgor-beastmen"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-fellgor-beastmen"
          }
        ],
        "models": [
          {
            "id": "unit-fellgor-beastmen-model-fellgor-champion",
            "title": "Fellgor Champion",
            "aliases": [
              "Fellgor Champion"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-model-9-beastmen-2",
            "title": "9 Beastmen",
            "aliases": [
              "9 Beastmen"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-fellgor-beastmen-selection-chainsword",
            "title": "Chainsword",
            "aliases": [
              "Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol- supercharge",
            "aliases": [
              "➤ Plasma pistol- supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-plasma-pistol-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-autopistol",
            "title": "Autopistol",
            "aliases": [
              "Autopistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-autopistol-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-close-combat-weapon-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-great-weapon",
            "title": "Great weapon",
            "aliases": [
              "Great weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-great-weapon-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fellgor-beastmen-selection-corrupted-stave",
            "title": "Corrupted stave",
            "aliases": [
              "Corrupted stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fellgor-beastmen-profile-corrupted-stave-melee-8",
              "unit-fellgor-beastmen-profile-corrupted-stave-ranged-9"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-fellgor-beastmen-profile-chainsword-melee",
            "title": "Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-chainsword"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-plasma-pistol-standard-ranged-3",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-plasma-pistol-standard"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-plasma-pistol-supercharge-ranged-4",
            "title": "➤ Plasma pistol- supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-plasma-pistol-supercharge"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-autopistol-ranged-5",
            "title": "Autopistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-autopistol"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-close-combat-weapon-melee-6",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-great-weapon-melee-7",
            "title": "Great weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "5+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-great-weapon"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-corrupted-stave-melee-8",
            "title": "Corrupted stave",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "D3",
            "abilities": "Devastating Wounds, Psychic",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-corrupted-stave"
            ]
          },
          {
            "id": "unit-fellgor-beastmen-profile-corrupted-stave-ranged-9",
            "title": "Corrupted stave",
            "mode": "ranged",
            "range": "18\"",
            "a": "D3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Psychic",
            "sourceSelectionIds": [
              "unit-fellgor-beastmen-selection-corrupted-stave"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-havocs",
      "title": "Havocs",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Havocs"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-warpsmith",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-warpsmith",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-stabilisation-talons",
            "sectionId": "chaos-space-marines-ability-stabilisation-talons",
            "title": "Stabilisation Talons",
            "text": "Each time a model in this unit makes an attack with a ranged weapon, you can ignore any or all modifiers to the Hit roll and any or all modifiers to the Ballistic Skill characteristic of that weapon.",
            "sourceUnitId": "unit-havocs"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-havocs"
          }
        ],
        "models": [
          {
            "id": "unit-havocs-model-havoc-champion",
            "title": "Havoc Champion",
            "aliases": [
              "Havoc Champion"
            ]
          },
          {
            "id": "unit-havocs-model-4-havocs-2",
            "title": "4 Havocs",
            "aliases": [
              "4 Havocs"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-havocs-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-accursed-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-astartes-chainsword",
            "title": "Astartes chainsword",
            "aliases": [
              "Astartes chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-astartes-chainsword-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-flamer-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-plasma-gun-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-plasma-gun-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-plasma-pistol-supercharge-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-boltgun-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-meltagun-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-autocannon",
            "title": "Havoc autocannon",
            "aliases": [
              "Havoc autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-autocannon-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-close-combat-weapon-melee-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-lascannon",
            "title": "Havoc lascannon",
            "aliases": [
              "Havoc lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-lascannon-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-missile-launcher-frag",
            "title": "➤ Havoc missile launcher - frag",
            "aliases": [
              "➤ Havoc missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-missile-launcher-frag-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-missile-launcher-krak",
            "title": "➤ Havoc missile launcher - krak",
            "aliases": [
              "➤ Havoc missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-missile-launcher-krak-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-reaper-chaincannon",
            "title": "Havoc reaper chaincannon",
            "aliases": [
              "Havoc reaper chaincannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-reaper-chaincannon-ranged-16"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-selection-havoc-heavy-bolter",
            "title": "Havoc heavy bolter",
            "aliases": [
              "Havoc heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-havocs-profile-havoc-heavy-bolter-ranged-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-havocs-weapon-family-plasma-gun",
            "profileIds": [
              "unit-havocs-profile-plasma-gun-standard-ranged-5",
              "unit-havocs-profile-plasma-gun-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-havocs-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-havocs-profile-plasma-pistol-standard-ranged-7",
              "unit-havocs-profile-plasma-pistol-supercharge-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-havocs-weapon-family-havoc-missile-launcher-selection",
            "title": "➤ Havoc missile launcher",
            "aliases": [
              "➤ Havoc missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-havocs-weapon-family-havoc-missile-launcher",
            "profileIds": [
              "unit-havocs-profile-havoc-missile-launcher-frag-ranged-14",
              "unit-havocs-profile-havoc-missile-launcher-krak-ranged-15"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-havocs-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-havocs-profile-plasma-gun-standard-ranged-5",
              "unit-havocs-profile-plasma-gun-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-havocs-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-havocs-profile-plasma-pistol-standard-ranged-7",
              "unit-havocs-profile-plasma-pistol-supercharge-ranged-8"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-havocs-weapon-family-havoc-missile-launcher",
            "title": "➤ Havoc missile launcher",
            "aliases": [
              "➤ Havoc missile launcher"
            ],
            "profileIds": [
              "unit-havocs-profile-havoc-missile-launcher-frag-ranged-14",
              "unit-havocs-profile-havoc-missile-launcher-krak-ranged-15"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-havocs-profile-accursed-weapon-melee",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-havocs-profile-power-fist-melee-2",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-power-fist"
            ]
          },
          {
            "id": "unit-havocs-profile-astartes-chainsword-melee-3",
            "title": "Astartes chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-havocs-profile-flamer-ranged-4",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-havocs-selection-flamer"
            ]
          },
          {
            "id": "unit-havocs-profile-plasma-gun-standard-ranged-5",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-havocs-selection-plasma-gun-standard",
              "unit-havocs-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-plasma-gun-supercharge-ranged-6",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-havocs-selection-plasma-gun-supercharge",
              "unit-havocs-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-plasma-pistol-standard-ranged-7",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-havocs-selection-plasma-pistol-standard",
              "unit-havocs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-plasma-pistol-supercharge-ranged-8",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-havocs-selection-plasma-pistol-supercharge",
              "unit-havocs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-boltgun-ranged-9",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-boltgun"
            ]
          },
          {
            "id": "unit-havocs-profile-meltagun-ranged-10",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-havocs-selection-meltagun"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-autocannon-ranged-11",
            "title": "Havoc autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-autocannon"
            ]
          },
          {
            "id": "unit-havocs-profile-close-combat-weapon-melee-12",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-lascannon-ranged-13",
            "title": "Havoc lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-lascannon"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-missile-launcher-frag-ranged-14",
            "title": "➤ Havoc missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-missile-launcher-frag",
              "unit-havocs-weapon-family-havoc-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-missile-launcher-krak-ranged-15",
            "title": "➤ Havoc missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-missile-launcher-krak",
              "unit-havocs-weapon-family-havoc-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-reaper-chaincannon-ranged-16",
            "title": "Havoc reaper chaincannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-reaper-chaincannon"
            ]
          },
          {
            "id": "unit-havocs-profile-havoc-heavy-bolter-ranged-17",
            "title": "Havoc heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-havocs-selection-havoc-heavy-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-mutilators",
      "title": "Mutilators",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Daemon",
        "Mutilators"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-kravek-morne",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-kravek-morne",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "7",
          "Sv": "2+",
          "W": "5",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "5+",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-crushing-charge",
            "sectionId": "chaos-space-marines-ability-crushing-charge",
            "title": "Crushing Charge",
            "text": "You can re-roll charge rolls made for this unit, and each time this unit makes a Charge move, select one enemy unit and roll one D6 for each model in this unit that is within Engagement Range of that unit: for each 4+, that enemy unit suffers D3 mortal wounds.",
            "sourceUnitId": "unit-mutilators"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-mutilators"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-mutilators"
          }
        ],
        "models": [
          {
            "id": "unit-mutilators-model-mutilator",
            "title": "Mutilator",
            "aliases": [
              "Mutilator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-mutilators-selection-fleshmetal-weapons-rending-strikes",
            "title": "➤ Fleshmetal weapons - rending strikes",
            "aliases": [
              "➤ Fleshmetal weapons - rending strikes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-mutilators-profile-fleshmetal-weapons-rending-strikes-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-mutilators-selection-fleshmetal-weapons-clawed-sweeps",
            "title": "➤ Fleshmetal weapons - clawed sweeps",
            "aliases": [
              "➤ Fleshmetal weapons - clawed sweeps"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-mutilators-profile-fleshmetal-weapons-clawed-sweeps-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-mutilators-selection-fleshmetal-weapons-thunderous-blows",
            "title": "➤ Fleshmetal weapons - thunderous blows",
            "aliases": [
              "➤ Fleshmetal weapons - thunderous blows"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-mutilators-profile-fleshmetal-weapons-thunderous-blows-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-mutilators-weapon-family-fleshmetal-weapons-selection",
            "title": "➤ Fleshmetal weapons",
            "aliases": [
              "➤ Fleshmetal weapons"
            ],
            "kind": "weapon",
            "familyId": "unit-mutilators-weapon-family-fleshmetal-weapons",
            "profileIds": [
              "unit-mutilators-profile-fleshmetal-weapons-rending-strikes-melee",
              "unit-mutilators-profile-fleshmetal-weapons-clawed-sweeps-melee-2",
              "unit-mutilators-profile-fleshmetal-weapons-thunderous-blows-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-mutilators-weapon-family-fleshmetal-weapons",
            "title": "➤ Fleshmetal weapons",
            "aliases": [
              "➤ Fleshmetal weapons"
            ],
            "profileIds": [
              "unit-mutilators-profile-fleshmetal-weapons-rending-strikes-melee",
              "unit-mutilators-profile-fleshmetal-weapons-clawed-sweeps-melee-2",
              "unit-mutilators-profile-fleshmetal-weapons-thunderous-blows-melee-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-mutilators-profile-fleshmetal-weapons-rending-strikes-melee",
            "title": "➤ Fleshmetal weapons - rending strikes",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-mutilators-selection-fleshmetal-weapons-rending-strikes",
              "unit-mutilators-weapon-family-fleshmetal-weapons-selection"
            ]
          },
          {
            "id": "unit-mutilators-profile-fleshmetal-weapons-clawed-sweeps-melee-2",
            "title": "➤ Fleshmetal weapons - clawed sweeps",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-mutilators-selection-fleshmetal-weapons-clawed-sweeps",
              "unit-mutilators-weapon-family-fleshmetal-weapons-selection"
            ]
          },
          {
            "id": "unit-mutilators-profile-fleshmetal-weapons-thunderous-blows-melee-3",
            "title": "➤ Fleshmetal weapons - thunderous blows",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "12",
            "ap": "-4",
            "d": "D6+2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-mutilators-selection-fleshmetal-weapons-thunderous-blows",
              "unit-mutilators-weapon-family-fleshmetal-weapons-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-nemesis-claw",
      "title": "Nemesis Claw",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Psyker",
        "Grenades",
        "Nemesis Claw",
        "Heretic Astartes",
        "Chaos"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaos-lord",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-master-of-possession",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-reave-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sorcerer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-warpsmith",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions",
            "maxCharacters": 2
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-master-of-possession",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-reave-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sorcerer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-warpsmith",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-visions-of-suffering-psychic",
            "sectionId": "chaos-space-marines-ability-visions-of-suffering-psychic",
            "title": "Visions of Suffering (Psychic)",
            "text": "Each time a model in this unit makes an attack that targets an enemy unit that is below its Starting Strength, add 1 to the Hit roll. If that enemy unit is Below Half-strength, add 1 to the Wound roll as well.",
            "sourceUnitId": "unit-nemesis-claw"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-nemesis-claw"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-nemesis-claw"
          }
        ],
        "models": [
          {
            "id": "unit-nemesis-claw-model-visionary",
            "title": "Visionary",
            "aliases": [
              "Visionary"
            ]
          },
          {
            "id": "unit-nemesis-claw-model-4-9-legionaries-2",
            "title": "4 - 9 Legionaries",
            "aliases": [
              "4 - 9 Legionaries"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-nemesis-claw-selection-nostraman-chainblade",
            "title": "Nostraman chainblade",
            "aliases": [
              "Nostraman chainblade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-nostraman-chainblade-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-accursed-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-power-fist-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-boltgun-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-close-combat-weapon-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-astartes-chainsword",
            "title": "Astartes chainsword",
            "aliases": [
              "Astartes chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-astartes-chainsword-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-heavy-bolter",
            "title": "Heavy bolter",
            "aliases": [
              "Heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-heavy-bolter-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-missile-launcher-frag",
            "title": "➤ Missile launcher - frag",
            "aliases": [
              "➤ Missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-missile-launcher-frag-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-missile-launcher-krak",
            "title": "➤ Missile launcher - krak",
            "aliases": [
              "➤ Missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-missile-launcher-krak-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-flamer-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-gun-standard-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-gun-supercharge-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-meltagun-ranged-16"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-nostraman-chainglaive",
            "title": "Nostraman chainglaive",
            "aliases": [
              "Nostraman chainglaive"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-nostraman-chainglaive-melee-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-paired-accursed-weapons",
            "title": "Paired accursed weapons",
            "aliases": [
              "Paired accursed weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-nemesis-claw-profile-paired-accursed-weapons-melee-18"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-nemesis-claw-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-pistol-standard-ranged-5",
              "unit-nemesis-claw-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-weapon-family-missile-launcher-selection",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-nemesis-claw-weapon-family-missile-launcher",
            "profileIds": [
              "unit-nemesis-claw-profile-missile-launcher-frag-ranged-11",
              "unit-nemesis-claw-profile-missile-launcher-krak-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-nemesis-claw-weapon-family-plasma-gun",
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-gun-standard-ranged-14",
              "unit-nemesis-claw-profile-plasma-gun-supercharge-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-nemesis-claw-selection-voice-eater",
            "title": "Voice eater",
            "aliases": [
              "Voice eater"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-nemesis-claw-wargear-ability-voice-eater"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-nemesis-claw-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-pistol-standard-ranged-5",
              "unit-nemesis-claw-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-nemesis-claw-weapon-family-missile-launcher",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "profileIds": [
              "unit-nemesis-claw-profile-missile-launcher-frag-ranged-11",
              "unit-nemesis-claw-profile-missile-launcher-krak-ranged-12"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-nemesis-claw-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-nemesis-claw-profile-plasma-gun-standard-ranged-14",
              "unit-nemesis-claw-profile-plasma-gun-supercharge-ranged-15"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-nemesis-claw-profile-nostraman-chainblade-melee",
            "title": "Nostraman chainblade",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-nostraman-chainblade"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-accursed-weapon-melee-2",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-power-fist-melee-3",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-power-fist"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-bolt-pistol-ranged-4",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-plasma-pistol-standard-ranged-5",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-plasma-pistol-standard",
              "unit-nemesis-claw-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-plasma-pistol-supercharge-ranged-6",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-plasma-pistol-supercharge",
              "unit-nemesis-claw-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-boltgun-ranged-7",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-boltgun"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-close-combat-weapon-melee-8",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-astartes-chainsword-melee-9",
            "title": "Astartes chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-heavy-bolter-ranged-10",
            "title": "Heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-missile-launcher-frag-ranged-11",
            "title": "➤ Missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-missile-launcher-frag",
              "unit-nemesis-claw-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-missile-launcher-krak-ranged-12",
            "title": "➤ Missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-missile-launcher-krak",
              "unit-nemesis-claw-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-flamer-ranged-13",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-flamer"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-plasma-gun-standard-ranged-14",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-plasma-gun-standard",
              "unit-nemesis-claw-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-plasma-gun-supercharge-ranged-15",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-plasma-gun-supercharge",
              "unit-nemesis-claw-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-meltagun-ranged-16",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-meltagun"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-nostraman-chainglaive-melee-17",
            "title": "Nostraman chainglaive",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-nostraman-chainglaive"
            ]
          },
          {
            "id": "unit-nemesis-claw-profile-paired-accursed-weapons-melee-18",
            "title": "Paired accursed weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-nemesis-claw-selection-paired-accursed-weapons"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-nemesis-claw-wargear-ability-voice-eater",
            "title": "Voice eater",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-obliterators",
      "title": "Obliterators",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Daemon",
        "Obliterators"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-kravek-morne",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-kravek-morne",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "4\"",
          "T": "7",
          "Sv": "2+",
          "W": "5",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "5+",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-warp-rift-firepower",
            "sectionId": "chaos-space-marines-ability-warp-rift-firepower",
            "title": "Warp Rift Firepower",
            "text": "(Once per battle, per unit): In your Shooting phase, when this unit is selected to shoot, you can use this ability. If you do, this unit's ranged attacks have [INDIRECT FIRE].",
            "sourceUnitId": "unit-obliterators"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-obliterators"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-obliterators"
          }
        ],
        "models": [
          {
            "id": "unit-obliterators-model-obliterator",
            "title": "Obliterator",
            "aliases": [
              "Obliterator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-obliterators-selection-crushing-fists",
            "title": "Crushing fists",
            "aliases": [
              "Crushing fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-obliterators-profile-crushing-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-obliterators-selection-fleshmetal-guns-focused-malice",
            "title": "➤ Fleshmetal guns - focused malice",
            "aliases": [
              "➤ Fleshmetal guns - focused malice"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-obliterators-profile-fleshmetal-guns-focused-malice-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-obliterators-selection-fleshmetal-guns-ruinous-salvo",
            "title": "➤ Fleshmetal guns - ruinous salvo",
            "aliases": [
              "➤ Fleshmetal guns - ruinous salvo"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-obliterators-profile-fleshmetal-guns-ruinous-salvo-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-obliterators-selection-fleshmetal-guns-warp-hail",
            "title": "➤ Fleshmetal guns - warp hail",
            "aliases": [
              "➤ Fleshmetal guns - warp hail"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-obliterators-profile-fleshmetal-guns-warp-hail-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-obliterators-weapon-family-fleshmetal-guns-selection",
            "title": "➤ Fleshmetal guns",
            "aliases": [
              "➤ Fleshmetal guns"
            ],
            "kind": "weapon",
            "familyId": "unit-obliterators-weapon-family-fleshmetal-guns",
            "profileIds": [
              "unit-obliterators-profile-fleshmetal-guns-focused-malice-ranged-2",
              "unit-obliterators-profile-fleshmetal-guns-ruinous-salvo-ranged-3",
              "unit-obliterators-profile-fleshmetal-guns-warp-hail-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-obliterators-weapon-family-fleshmetal-guns",
            "title": "➤ Fleshmetal guns",
            "aliases": [
              "➤ Fleshmetal guns"
            ],
            "profileIds": [
              "unit-obliterators-profile-fleshmetal-guns-focused-malice-ranged-2",
              "unit-obliterators-profile-fleshmetal-guns-ruinous-salvo-ranged-3",
              "unit-obliterators-profile-fleshmetal-guns-warp-hail-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-obliterators-profile-crushing-fists-melee",
            "title": "Crushing fists",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-obliterators-selection-crushing-fists"
            ]
          },
          {
            "id": "unit-obliterators-profile-fleshmetal-guns-focused-malice-ranged-2",
            "title": "➤ Fleshmetal guns - focused malice",
            "mode": "ranged",
            "range": "18\"",
            "a": "D3",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "4",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-obliterators-selection-fleshmetal-guns-focused-malice",
              "unit-obliterators-weapon-family-fleshmetal-guns-selection"
            ]
          },
          {
            "id": "unit-obliterators-profile-fleshmetal-guns-ruinous-salvo-ranged-3",
            "title": "➤ Fleshmetal guns - ruinous salvo",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-obliterators-selection-fleshmetal-guns-ruinous-salvo",
              "unit-obliterators-weapon-family-fleshmetal-guns-selection"
            ]
          },
          {
            "id": "unit-obliterators-profile-fleshmetal-guns-warp-hail-ranged-4",
            "title": "➤ Fleshmetal guns - warp hail",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-obliterators-selection-fleshmetal-guns-warp-hail",
              "unit-obliterators-weapon-family-fleshmetal-guns-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-possessed",
      "title": "Possessed",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Chaos",
        "Daemon",
        "Possessed"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-master-of-possession",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-master-of-possession",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "9\"",
          "T": "6",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-unholy-bloodshed",
            "sectionId": "chaos-space-marines-ability-unholy-bloodshed",
            "title": "Unholy Bloodshed",
            "text": "Once per battle, when this unit makes a Dark Pact, until the end of the phase, weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.",
            "sourceUnitId": "unit-possessed"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-possessed"
          }
        ],
        "models": [
          {
            "id": "unit-possessed-model-5-10-possessed",
            "title": "5 - 10 Possessed",
            "aliases": [
              "5 - 10 Possessed"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-possessed-selection-hideous-mutations",
            "title": "Hideous mutations",
            "aliases": [
              "Hideous mutations"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-possessed-profile-hideous-mutations-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-possessed-selection-chaos-icon",
            "title": "Chaos icon",
            "aliases": [
              "Chaos icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-possessed-wargear-ability-chaos-icon"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-possessed-profile-hideous-mutations-melee",
            "title": "Hideous mutations",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-possessed-selection-hideous-mutations"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-possessed-wargear-ability-chaos-icon",
            "title": "Chaos icon",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-raptors",
      "title": "Raptors",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Fly",
        "Jump Pack",
        "Chaos",
        "Raptors",
        "Grenades"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaos-lord-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-haarken-worldclaimer",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-haarken-worldclaimer",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "4",
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-fearsome-aura",
            "sectionId": "chaos-space-marines-ability-fearsome-aura",
            "title": "Fearsome (Aura)",
            "text": "While an enemy unit is within 6\" of this unit, each time that enemy unit takes a Battle-shock or Leadership test, subtract 1 from the result.",
            "sourceUnitId": "unit-raptors"
          },
          {
            "id": "chaos-space-marines-ability-terrifying-assault",
            "sectionId": "chaos-space-marines-ability-terrifying-assault",
            "title": "Terrifying Assault",
            "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test.",
            "sourceUnitId": "unit-raptors"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-raptors"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-raptors"
          }
        ],
        "models": [
          {
            "id": "unit-raptors-model-raptor-champion",
            "title": "Raptor Champion",
            "aliases": [
              "Raptor Champion"
            ]
          },
          {
            "id": "unit-raptors-model-4-9-raptors-2",
            "title": "4-9 Raptors",
            "aliases": [
              "4-9 Raptors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-raptors-selection-astartes-chainsword",
            "title": "Astartes chainsword",
            "aliases": [
              "Astartes chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-astartes-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-accursed-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-heavy-melee-weapon",
            "title": "Heavy melee weapon",
            "aliases": [
              "Heavy melee weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-heavy-melee-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-mutations",
            "title": "Mutations",
            "aliases": [
              "Mutations"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-mutations-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-close-combat-weapon-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-meltagun-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-plasma-gun-standard-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-plasma-gun-supercharge-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raptors-profile-flamer-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-raptors-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-raptors-profile-plasma-pistol-standard-ranged-5",
              "unit-raptors-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-raptors-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-raptors-weapon-family-plasma-gun",
            "profileIds": [
              "unit-raptors-profile-plasma-gun-standard-ranged-10",
              "unit-raptors-profile-plasma-gun-supercharge-ranged-11"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-raptors-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-raptors-profile-plasma-pistol-standard-ranged-5",
              "unit-raptors-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-raptors-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-raptors-profile-plasma-gun-standard-ranged-10",
              "unit-raptors-profile-plasma-gun-supercharge-ranged-11"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-raptors-profile-astartes-chainsword-melee",
            "title": "Astartes chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-raptors-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-raptors-profile-accursed-weapon-melee-2",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-raptors-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-raptors-profile-heavy-melee-weapon-melee-3",
            "title": "Heavy melee weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-raptors-selection-heavy-melee-weapon"
            ]
          },
          {
            "id": "unit-raptors-profile-bolt-pistol-ranged-4",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-raptors-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-raptors-profile-plasma-pistol-standard-ranged-5",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-raptors-selection-plasma-pistol-standard",
              "unit-raptors-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-raptors-profile-plasma-pistol-supercharge-ranged-6",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-raptors-selection-plasma-pistol-supercharge",
              "unit-raptors-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-raptors-profile-mutations-melee-7",
            "title": "Mutations",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-raptors-selection-mutations"
            ]
          },
          {
            "id": "unit-raptors-profile-close-combat-weapon-melee-8",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-raptors-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-raptors-profile-meltagun-ranged-9",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-raptors-selection-meltagun"
            ]
          },
          {
            "id": "unit-raptors-profile-plasma-gun-standard-ranged-10",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-raptors-selection-plasma-gun-standard",
              "unit-raptors-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-raptors-profile-plasma-gun-supercharge-ranged-11",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-raptors-selection-plasma-gun-supercharge",
              "unit-raptors-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-raptors-profile-flamer-ranged-12",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-raptors-selection-flamer"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-red-corsairs-raiders",
      "title": "Red Corsairs Raiders",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Red Corsairs Raiders",
        "Chaos"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaos-lord",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-dark-apostle",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fabius-bile",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-huron-blackheart",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-master-of-possession",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-red-corsairs-reave-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sorcerer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-warpsmith",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-masters-of-the-maelstrom",
            "maxCharacters": 2
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-dark-apostle",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fabius-bile",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-huron-blackheart",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-master-of-possession",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-red-corsairs-reave-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sorcerer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-warpsmith",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-masters-of-the-maelstrom",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-trophy-takers",
            "sectionId": "chaos-space-marines-ability-trophy-takers",
            "title": "Trophy Takers",
            "text": "The first time this unit destroys an enemy unit, until the end of the battle, while this unit is not Battle-shocked, add 1 to the Objective Control characteristic of models in this unit.",
            "sourceUnitId": "unit-red-corsairs-raiders"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-red-corsairs-raiders"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-red-corsairs-raiders"
          }
        ],
        "models": [
          {
            "id": "unit-red-corsairs-raiders-model-red-corsairs-raider-champion",
            "title": "Red Corsairs Raider Champion",
            "aliases": [
              "Red Corsairs Raider Champion"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-model-4-9-raiders-2",
            "title": "4 - 9 Raiders",
            "aliases": [
              "4 - 9 Raiders"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-red-corsairs-raiders-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-hand-flamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-raiders-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-raiders-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-boltgun-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-raiders-selection-reavers-blade",
            "title": "Reaver's blade",
            "aliases": [
              "Reaver's blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-reavers-blade-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-raiders-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-meltagun-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-red-corsairs-raiders-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-red-corsairs-raiders-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-red-corsairs-raiders-profile-hand-flamer-ranged",
            "title": "Hand flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Pistol, Torrent",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-profile-boltgun-ranged-3",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-boltgun"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-profile-reavers-blade-melee-4",
            "title": "Reaver's blade",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-reavers-blade"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-profile-meltagun-ranged-5",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-meltagun"
            ]
          },
          {
            "id": "unit-red-corsairs-raiders-profile-power-fist-melee-6",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-red-corsairs-raiders-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-traitor-guardsmen-squad",
      "title": "Traitor Guardsmen Squad",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Grenades",
        "Chaos",
        "Traitor Guardsmen Squad",
        "Damned"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-traitor-enforcer",
            "maxCharacters": 1
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-traitor-enforcer",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "5+",
          "W": "1",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": "",
          "Base": "25mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-twisted-defence-force",
            "sectionId": "chaos-space-marines-ability-twisted-defence-force",
            "title": "Twisted Defence Force",
            "text": "While this unit is within range of an objective, this unit has +1 Sv against ranged attacks.",
            "sourceUnitId": "unit-traitor-guardsmen-squad"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-traitor-guardsmen-squad"
          }
        ],
        "models": [
          {
            "id": "unit-traitor-guardsmen-squad-model-traitor-sergeant",
            "title": "Traitor Sergeant",
            "aliases": [
              "Traitor Sergeant"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-model-9-traitor-guardsmen-2",
            "title": "9 Traitor Guardsmen",
            "aliases": [
              "9 Traitor Guardsmen"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-traitor-guardsmen-squad-selection-chainsword",
            "title": "Chainsword",
            "aliases": [
              "Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-power-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-corrupted-pistol",
            "title": "Corrupted pistol",
            "aliases": [
              "Corrupted pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-corrupted-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-boltgun-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-lasgun",
            "title": "Lasgun",
            "aliases": [
              "Lasgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-lasgun-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-flamer-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-plasma-gun-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-plasma-gun-supercharge-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-meltagun-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-cultist-sniper-rifle",
            "title": "Cultist sniper rifle",
            "aliases": [
              "Cultist sniper rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-cultist-sniper-rifle-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-cultist-grenade-launcher-frag",
            "title": "➤ Cultist grenade launcher - frag",
            "aliases": [
              "➤ Cultist grenade launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-frag-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-selection-cultist-grenade-launcher-krak",
            "title": "➤ Cultist grenade launcher - krak",
            "aliases": [
              "➤ Cultist grenade launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-krak-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-traitor-guardsmen-squad-weapon-family-plasma-gun",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-plasma-gun-standard-ranged-8",
              "unit-traitor-guardsmen-squad-profile-plasma-gun-supercharge-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-traitor-guardsmen-squad-weapon-family-cultist-grenade-launcher-selection",
            "title": "➤ Cultist grenade launcher",
            "aliases": [
              "➤ Cultist grenade launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-traitor-guardsmen-squad-weapon-family-cultist-grenade-launcher",
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-frag-ranged-12",
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-krak-ranged-13"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-traitor-guardsmen-squad-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-plasma-gun-standard-ranged-8",
              "unit-traitor-guardsmen-squad-profile-plasma-gun-supercharge-ranged-9"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-traitor-guardsmen-squad-weapon-family-cultist-grenade-launcher",
            "title": "➤ Cultist grenade launcher",
            "aliases": [
              "➤ Cultist grenade launcher"
            ],
            "profileIds": [
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-frag-ranged-12",
              "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-krak-ranged-13"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-traitor-guardsmen-squad-profile-chainsword-melee",
            "title": "Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-chainsword"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-power-weapon-melee-2",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-corrupted-pistol-ranged-4",
            "title": "Corrupted pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-corrupted-pistol"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-boltgun-ranged-5",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-boltgun"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-lasgun-ranged-6",
            "title": "Lasgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-lasgun"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-flamer-ranged-7",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-flamer"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-plasma-gun-standard-ranged-8",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-plasma-gun-standard",
              "unit-traitor-guardsmen-squad-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-plasma-gun-supercharge-ranged-9",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-plasma-gun-supercharge",
              "unit-traitor-guardsmen-squad-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-meltagun-ranged-10",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-meltagun"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-cultist-sniper-rifle-ranged-11",
            "title": "Cultist sniper rifle",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "-2",
            "d": "2",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-cultist-sniper-rifle"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-frag-ranged-12",
            "title": "➤ Cultist grenade launcher - frag",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-cultist-grenade-launcher-frag",
              "unit-traitor-guardsmen-squad-weapon-family-cultist-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-traitor-guardsmen-squad-profile-cultist-grenade-launcher-krak-ranged-13",
            "title": "➤ Cultist grenade launcher - krak",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-traitor-guardsmen-squad-selection-cultist-grenade-launcher-krak",
              "unit-traitor-guardsmen-squad-weapon-family-cultist-grenade-launcher-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-warp-talons",
      "title": "Warp Talons",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Infantry",
        "Fly",
        "Jump Pack",
        "Chaos",
        "Daemon",
        "Warp Talons",
        "Grenades"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "4",
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-warp-strike",
            "sectionId": "chaos-space-marines-ability-warp-strike",
            "title": "Warp Strike",
            "text": "At the end of the Fight phase, if this unit destroyed one or more enemy units this phase and is not within Engagement Range of one or more enemy units, you can remove this unit from the battlefield and place it into Strategic Reserves.",
            "sourceUnitId": "unit-warp-talons"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-warp-talons"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-warp-talons"
          }
        ],
        "models": [
          {
            "id": "unit-warp-talons-model-5-10-warp-talons",
            "title": "5-10 Warp Talons",
            "aliases": [
              "5-10 Warp Talons"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-warp-talons-selection-warp-claws",
            "title": "Warp claws",
            "aliases": [
              "Warp claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-warp-talons-profile-warp-claws-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-warp-talons-profile-warp-claws-melee",
            "title": "Warp claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-warp-talons-selection-warp-claws"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-bikers",
      "title": "Chaos Bikers",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Mounted",
        "Grenades",
        "Chaos",
        "Chaos Bikers"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "5",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "",
          "Base": "75x42mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-rapid-assault",
            "sectionId": "chaos-space-marines-ability-rapid-assault",
            "title": "Rapid Assault",
            "text": "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength characteristic of that attack by 1.",
            "sourceUnitId": "unit-chaos-bikers"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-bikers"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-bikers-model-biker-champion",
            "title": "Biker Champion",
            "aliases": [
              "Biker Champion"
            ]
          },
          {
            "id": "unit-chaos-bikers-model-2-5-bikers-2",
            "title": "2-5 Bikers",
            "aliases": [
              "2-5 Bikers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-bikers-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-accursed-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-astartes-chainsword",
            "title": "Astartes chainsword",
            "aliases": [
              "Astartes chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-astartes-chainsword-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-combi-bolter-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-close-combat-weapon-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-flamer-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-meltagun-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-gun-standard-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-gun-supercharge-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-bikers-profile-combi-weapon-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chaos-bikers-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-pistol-standard-ranged-4",
              "unit-chaos-bikers-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-chaos-bikers-weapon-family-plasma-gun",
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-gun-standard-ranged-11",
              "unit-chaos-bikers-profile-plasma-gun-supercharge-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-bikers-selection-chaos-icon",
            "title": "Chaos icon",
            "aliases": [
              "Chaos icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-chaos-bikers-wargear-ability-chaos-icon"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chaos-bikers-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-pistol-standard-ranged-4",
              "unit-chaos-bikers-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-chaos-bikers-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-chaos-bikers-profile-plasma-gun-standard-ranged-11",
              "unit-chaos-bikers-profile-plasma-gun-supercharge-ranged-12"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chaos-bikers-profile-accursed-weapon-melee",
            "title": "Accursed weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-astartes-chainsword-melee-2",
            "title": "Astartes chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-plasma-pistol-standard-ranged-4",
            "title": "➤ Plasma pistol - standard",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-plasma-pistol-standard",
              "unit-chaos-bikers-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-plasma-pistol-supercharge-ranged-5",
            "title": "➤ Plasma pistol - supercharge",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Pistol",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-plasma-pistol-supercharge",
              "unit-chaos-bikers-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-power-fist-melee-6",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-combi-bolter-ranged-7",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-close-combat-weapon-melee-8",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-flamer-ranged-9",
            "title": "Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-flamer"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-meltagun-ranged-10",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-meltagun"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-plasma-gun-standard-ranged-11",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-plasma-gun-standard",
              "unit-chaos-bikers-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-plasma-gun-supercharge-ranged-12",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-plasma-gun-supercharge",
              "unit-chaos-bikers-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-chaos-bikers-profile-combi-weapon-ranged-13",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-bikers-selection-combi-weapon"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-chaos-bikers-wargear-ability-chaos-icon",
            "title": "Chaos icon",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-chaos-land-raider",
      "title": "Chaos Land Raider",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Transport",
        "Smoke",
        "Chaos",
        "Land Raider",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "12",
          "Sv": "2+",
          "W": "16",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-assault-ramp",
            "sectionId": "chaos-space-marines-ability-assault-ramp",
            "title": "Assault Ramp",
            "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn.",
            "sourceUnitId": "unit-chaos-land-raider"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-5-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 wounds remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-chaos-land-raider"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-chaos-land-raider"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-land-raider"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-land-raider-model-chaos-land-raider",
            "title": "Chaos Land Raider",
            "aliases": [
              "Chaos Land Raider"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-land-raider-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-armoured-tracks-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-land-raider-selection-soulshatter-lascannon",
            "title": "Soulshatter lascannon",
            "aliases": [
              "Soulshatter lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-soulshatter-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-land-raider-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-combi-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-land-raider-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-combi-weapon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-land-raider-selection-havoc-launcher",
            "title": "Havoc launcher",
            "aliases": [
              "Havoc launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-havoc-launcher-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-land-raider-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-land-raider-profile-twin-heavy-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-land-raider-profile-armoured-tracks-melee",
            "title": "Armoured tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-chaos-land-raider-profile-soulshatter-lascannon-ranged-2",
            "title": "Soulshatter lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-soulshatter-lascannon"
            ]
          },
          {
            "id": "unit-chaos-land-raider-profile-combi-bolter-ranged-3",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-land-raider-profile-combi-weapon-ranged-4",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-land-raider-profile-havoc-launcher-ranged-5",
            "title": "Havoc launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-havoc-launcher"
            ]
          },
          {
            "id": "unit-chaos-land-raider-profile-twin-heavy-bolter-ranged-6",
            "title": "Twin heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-chaos-land-raider-selection-twin-heavy-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-predator-annihilator",
      "title": "Chaos Predator Annihilator",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Smoke",
        "Chaos",
        "Predator Annihilator",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "10",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-annihilator",
            "sectionId": "chaos-space-marines-ability-annihilator",
            "title": "Annihilator",
            "text": "Each time a ranged attack made by this model is allocated to a Monster or Vehicle model, you can re-roll the Damage roll.",
            "sourceUnitId": "unit-chaos-predator-annihilator"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-chaos-predator-annihilator"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-chaos-predator-annihilator"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-predator-annihilator"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-predator-annihilator-model-chaos-predator-annihilator",
            "title": "Chaos Predator Annihilator",
            "aliases": [
              "Chaos Predator Annihilator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-predator-annihilator-selection-predator-twin-lascannon",
            "title": "Predator twin lascannon",
            "aliases": [
              "Predator twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-predator-twin-lascannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-combi-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-combi-weapon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-heavy-bolter",
            "title": "Heavy bolter",
            "aliases": [
              "Heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-lascannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-armoured-tracks-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-annihilator-selection-havoc-launcher",
            "title": "Havoc launcher",
            "aliases": [
              "Havoc launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-annihilator-profile-havoc-launcher-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-predator-annihilator-profile-predator-twin-lascannon-ranged",
            "title": "Predator twin lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-predator-twin-lascannon"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-combi-bolter-ranged-2",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-combi-weapon-ranged-3",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-heavy-bolter-ranged-4",
            "title": "Heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-lascannon-ranged-5",
            "title": "Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-lascannon"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-armoured-tracks-melee-6",
            "title": "Armoured tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-chaos-predator-annihilator-profile-havoc-launcher-ranged-7",
            "title": "Havoc launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-predator-annihilator-selection-havoc-launcher"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-predator-destructor",
      "title": "Chaos Predator Destructor",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Smoke",
        "Chaos",
        "Predator Destructor",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "10",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-destructor",
            "sectionId": "chaos-space-marines-ability-destructor",
            "title": "Destructor",
            "text": "Each time a ranged attack made by this model targets an enemy INFANTRY unit, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-chaos-predator-destructor"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-chaos-predator-destructor"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-chaos-predator-destructor"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-predator-destructor"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-predator-destructor-model-chaos-predator-destructor",
            "title": "Chaos Predator Destructor",
            "aliases": [
              "Chaos Predator Destructor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-predator-destructor-selection-predator-autocannon",
            "title": "Predator autocannon",
            "aliases": [
              "Predator autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-predator-autocannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-combi-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-combi-weapon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-heavy-bolter",
            "title": "Heavy bolter",
            "aliases": [
              "Heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-lascannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-armoured-tracks-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-predator-destructor-selection-havoc-launcher",
            "title": "Havoc launcher",
            "aliases": [
              "Havoc launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-predator-destructor-profile-havoc-launcher-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-predator-destructor-profile-predator-autocannon-ranged",
            "title": "Predator autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-predator-autocannon"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-combi-bolter-ranged-2",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-combi-weapon-ranged-3",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-heavy-bolter-ranged-4",
            "title": "Heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-lascannon-ranged-5",
            "title": "Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-lascannon"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-armoured-tracks-melee-6",
            "title": "Armoured tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-chaos-predator-destructor-profile-havoc-launcher-ranged-7",
            "title": "Havoc launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-predator-destructor-selection-havoc-launcher"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-spawn",
      "title": "Chaos Spawn",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Beast",
        "Chaos",
        "Chaos Spawn"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "5",
          "Sv": "4+",
          "W": "4",
          "Ld": "7+",
          "OC": "0",
          "Invulnerable": "",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-mind-breaking-mutations-aura",
            "sectionId": "chaos-space-marines-ability-mind-breaking-mutations-aura",
            "title": "Mind-breaking Mutations (Aura)",
            "text": "While an enemy unit (excluding VEHICLES) is within 3\" of this unit, subtract 1 from the Objective Control characteristic of models in that enemy unit.",
            "sourceUnitId": "unit-chaos-spawn"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-chaos-spawn"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-spawn"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-spawn-model-chaos-spawn",
            "title": "Chaos Spawn",
            "aliases": [
              "Chaos Spawn"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-spawn-selection-hideous-mutations",
            "title": "Hideous Mutations",
            "aliases": [
              "Hideous Mutations"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-spawn-profile-hideous-mutations-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-spawn-profile-hideous-mutations-melee",
            "title": "Hideous Mutations",
            "mode": "melee",
            "range": "Melee",
            "a": "D6+2",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-spawn-selection-hideous-mutations"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-vindicator",
      "title": "Chaos Vindicator",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Smoke",
        "Chaos",
        "Vindicator",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "9\"",
          "T": "11",
          "Sv": "2+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-siege-shield",
            "sectionId": "chaos-space-marines-ability-siege-shield",
            "title": "Siege Shield",
            "text": "When making ranged attacks with its demolisher cannon, this model can target enemy units within Engagement Range of it (provided no other friendly units are also within Engagement Range of that enemy unit). In addition, when making ranged attacks, this model does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units.",
            "sourceUnitId": "unit-chaos-vindicator"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-chaos-vindicator"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-chaos-vindicator"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-chaos-vindicator"
          }
        ],
        "models": [
          {
            "id": "unit-chaos-vindicator-model-chaos-vindicator",
            "title": "Chaos Vindicator",
            "aliases": [
              "Chaos Vindicator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-vindicator-selection-demolisher-cannon",
            "title": "Demolisher cannon",
            "aliases": [
              "Demolisher cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-vindicator-profile-demolisher-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-vindicator-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-vindicator-profile-combi-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-vindicator-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-vindicator-profile-combi-weapon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-vindicator-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-vindicator-profile-armoured-tracks-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-vindicator-selection-havoc-launcher",
            "title": "Havoc launcher",
            "aliases": [
              "Havoc launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-vindicator-profile-havoc-launcher-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaos-vindicator-profile-demolisher-cannon-ranged",
            "title": "Demolisher cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-vindicator-selection-demolisher-cannon"
            ]
          },
          {
            "id": "unit-chaos-vindicator-profile-combi-bolter-ranged-2",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaos-vindicator-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-vindicator-profile-combi-weapon-ranged-3",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-INFANTRY 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaos-vindicator-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-vindicator-profile-armoured-tracks-melee-4",
            "title": "Armoured tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaos-vindicator-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-chaos-vindicator-profile-havoc-launcher-ranged-5",
            "title": "Havoc launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-chaos-vindicator-selection-havoc-launcher"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-defiler",
      "title": "Defiler",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Heretic Astartes",
        "Defiler"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "11",
          "Sv": "3+",
          "W": "18",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": "5+",
          "Base": "160mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-scuttling-walker",
            "sectionId": "chaos-space-marines-ability-scuttling-walker",
            "title": "Scuttling Walker",
            "text": "Each time this unit makes a Normal, Advance or Fall Back move, it can move through models (excluding Titanic models) and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
            "sourceUnitId": "unit-defiler"
          },
          {
            "id": "chaos-space-marines-ability-daemonforge",
            "sectionId": "chaos-space-marines-ability-daemonforge",
            "title": "Daemonforge",
            "text": "Each time this unit makes a Dark Pact, until the end of the phase, each time this model makes an attack, re-roll a Wound roll of 1.",
            "sourceUnitId": "unit-defiler"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-6-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-6-wounds-remaining",
            "title": "Damaged: 1-6 wounds remaining",
            "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-defiler"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-defiler"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-defiler"
          }
        ],
        "models": [
          {
            "id": "unit-defiler-model-defiler",
            "title": "Defiler",
            "aliases": [
              "Defiler"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-defiler-selection-shearing-claws-strike",
            "title": "Shearing claws - strike",
            "aliases": [
              "Shearing claws - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-shearing-claws-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-shearing-claws-sweep",
            "title": "Shearing claws - sweep",
            "aliases": [
              "Shearing claws - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-shearing-claws-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-heavy-missile-launcher-frag",
            "title": "➤ Heavy missile launcher - frag",
            "aliases": [
              "➤ Heavy missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-heavy-missile-launcher-frag-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-heavy-missile-launcher-krak",
            "title": "➤ Heavy missile launcher - krak",
            "aliases": [
              "➤ Heavy missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-heavy-missile-launcher-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-electroscourge",
            "title": "Electroscourge",
            "aliases": [
              "Electroscourge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-electroscourge-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-hades-lascannon",
            "title": "Hades lascannon",
            "aliases": [
              "Hades lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-hades-lascannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-heavy-reaper-autocannon",
            "title": "Heavy reaper autocannon",
            "aliases": [
              "Heavy reaper autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-heavy-reaper-autocannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-hades-battle-cannon",
            "title": "Hades battle cannon",
            "aliases": [
              "Hades battle cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-hades-battle-cannon-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-ectoplasma-destructor",
            "title": "Ectoplasma destructor",
            "aliases": [
              "Ectoplasma destructor"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-ectoplasma-destructor-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-heavy-baleflamer",
            "title": "Heavy baleflamer",
            "aliases": [
              "Heavy baleflamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-heavy-baleflamer-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-excruciator-cannon",
            "title": "Excruciator cannon",
            "aliases": [
              "Excruciator cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-excruciator-cannon-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-selection-magma-cutter",
            "title": "Magma cutter",
            "aliases": [
              "Magma cutter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-magma-cutter-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-weapon-family-shearing-claws-selection",
            "title": "Shearing claws",
            "aliases": [
              "Shearing claws"
            ],
            "kind": "weapon",
            "familyId": "unit-defiler-weapon-family-shearing-claws",
            "profileIds": [
              "unit-defiler-profile-shearing-claws-strike-melee",
              "unit-defiler-profile-shearing-claws-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-defiler-weapon-family-heavy-missile-launcher-selection",
            "title": "➤ Heavy missile launcher",
            "aliases": [
              "➤ Heavy missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-defiler-weapon-family-heavy-missile-launcher",
            "profileIds": [
              "unit-defiler-profile-heavy-missile-launcher-frag-ranged-3",
              "unit-defiler-profile-heavy-missile-launcher-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-defiler-weapon-family-shearing-claws",
            "title": "Shearing claws",
            "aliases": [
              "Shearing claws"
            ],
            "profileIds": [
              "unit-defiler-profile-shearing-claws-strike-melee",
              "unit-defiler-profile-shearing-claws-sweep-melee-2"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-defiler-weapon-family-heavy-missile-launcher",
            "title": "➤ Heavy missile launcher",
            "aliases": [
              "➤ Heavy missile launcher"
            ],
            "profileIds": [
              "unit-defiler-profile-heavy-missile-launcher-frag-ranged-3",
              "unit-defiler-profile-heavy-missile-launcher-krak-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-defiler-profile-shearing-claws-strike-melee",
            "title": "Shearing claws - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "16",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-defiler-selection-shearing-claws-strike",
              "unit-defiler-weapon-family-shearing-claws-selection"
            ]
          },
          {
            "id": "unit-defiler-profile-shearing-claws-sweep-melee-2",
            "title": "Shearing claws - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "10",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-defiler-selection-shearing-claws-sweep",
              "unit-defiler-weapon-family-shearing-claws-selection"
            ]
          },
          {
            "id": "unit-defiler-profile-heavy-missile-launcher-frag-ranged-3",
            "title": "➤ Heavy missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-defiler-selection-heavy-missile-launcher-frag",
              "unit-defiler-weapon-family-heavy-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-defiler-profile-heavy-missile-launcher-krak-ranged-4",
            "title": "➤ Heavy missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-defiler-selection-heavy-missile-launcher-krak",
              "unit-defiler-weapon-family-heavy-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-defiler-profile-electroscourge-melee-5",
            "title": "Electroscourge",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks, Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-defiler-selection-electroscourge"
            ]
          },
          {
            "id": "unit-defiler-profile-hades-lascannon-ranged-6",
            "title": "Hades lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-defiler-selection-hades-lascannon"
            ]
          },
          {
            "id": "unit-defiler-profile-heavy-reaper-autocannon-ranged-7",
            "title": "Heavy reaper autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Devastating Wounds, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-defiler-selection-heavy-reaper-autocannon"
            ]
          },
          {
            "id": "unit-defiler-profile-hades-battle-cannon-ranged-8",
            "title": "Hades battle cannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "10",
            "ap": "-1",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-defiler-selection-hades-battle-cannon"
            ]
          },
          {
            "id": "unit-defiler-profile-ectoplasma-destructor-ranged-9",
            "title": "Ectoplasma destructor",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-defiler-selection-ectoplasma-destructor"
            ]
          },
          {
            "id": "unit-defiler-profile-heavy-baleflamer-ranged-10",
            "title": "Heavy baleflamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-defiler-selection-heavy-baleflamer"
            ]
          },
          {
            "id": "unit-defiler-profile-excruciator-cannon-ranged-11",
            "title": "Excruciator cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-defiler-selection-excruciator-cannon"
            ]
          },
          {
            "id": "unit-defiler-profile-magma-cutter-ranged-12",
            "title": "Magma cutter",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-defiler-selection-magma-cutter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-forgefiend",
      "title": "Forgefiend",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Forgefiend"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "10",
          "Sv": "3+",
          "W": "12",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "5+",
          "Base": "120x92mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-daemonic-ordnance",
            "sectionId": "chaos-space-marines-ability-daemonic-ordnance",
            "title": "Daemonic Ordnance",
            "text": "Each time this model is selected to shoot, it can use this ability. If it does, until the end of the phase, its ranged weapons have the [DEVASTATING WOUNDS] and [HAZARDOUS] abilities.",
            "sourceUnitId": "unit-forgefiend"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-forgefiend"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-forgefiend"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-forgefiend"
          }
        ],
        "models": [
          {
            "id": "unit-forgefiend-model-forgefiend",
            "title": "Forgefiend",
            "aliases": [
              "Forgefiend"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-forgefiend-selection-ectoplasma-cannon",
            "title": "Ectoplasma cannon",
            "aliases": [
              "Ectoplasma cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-forgefiend-profile-ectoplasma-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-forgefiend-selection-hades-autocannon",
            "title": "Hades autocannon",
            "aliases": [
              "Hades autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-forgefiend-profile-hades-autocannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-forgefiend-selection-armoured-limbs",
            "title": "Armoured limbs",
            "aliases": [
              "Armoured limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-forgefiend-profile-armoured-limbs-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-forgefiend-selection-forgefiend-jaws",
            "title": "Forgefiend jaws",
            "aliases": [
              "Forgefiend jaws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-forgefiend-profile-forgefiend-jaws-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-forgefiend-profile-ectoplasma-cannon-ranged",
            "title": "Ectoplasma cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "10",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-forgefiend-selection-ectoplasma-cannon"
            ]
          },
          {
            "id": "unit-forgefiend-profile-hades-autocannon-ranged-2",
            "title": "Hades autocannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-forgefiend-selection-hades-autocannon"
            ]
          },
          {
            "id": "unit-forgefiend-profile-armoured-limbs-melee-3",
            "title": "Armoured limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-forgefiend-selection-armoured-limbs"
            ]
          },
          {
            "id": "unit-forgefiend-profile-forgefiend-jaws-melee-4",
            "title": "Forgefiend jaws",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "7",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-forgefiend-selection-forgefiend-jaws"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-helbrute",
      "title": "Helbrute",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Walker",
        "Chaos",
        "Helbrute"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "9",
          "Sv": "2+",
          "W": "8",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "",
          "Base": "60mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-dark-ascension-aura",
            "sectionId": "chaos-space-marines-ability-dark-ascension-aura",
            "title": "Dark Ascension (Aura)",
            "text": "While a friendly HERETIC ASTARTES unit is within 6\" of this model, each time that unit makes a Dark Pact, until the end of the phase, its weapons gain both abilities conferred by that pact (instead of only one).",
            "sourceUnitId": "unit-helbrute"
          },
          {
            "id": "chaos-space-marines-ability-devoted-to-destruction",
            "sectionId": "chaos-space-marines-ability-devoted-to-destruction",
            "title": "Devoted to Destruction",
            "text": "If this model is equipped with 2 melee weapons in addition to its close combat weapon, add 2 to the Attacks characteristics of those 2 weapons.",
            "sourceUnitId": "unit-helbrute"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-helbrute"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-helbrute"
          }
        ],
        "models": [
          {
            "id": "unit-helbrute-model-helbrute",
            "title": "Helbrute",
            "aliases": [
              "Helbrute"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-helbrute-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-helbrute-fist",
            "title": "Helbrute fist",
            "aliases": [
              "Helbrute fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-helbrute-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-combi-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-heavy-flamer",
            "title": "Heavy flamer",
            "aliases": [
              "Heavy flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-heavy-flamer-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-missile-launcher-frag",
            "title": "➤ Missile launcher - frag",
            "aliases": [
              "➤ Missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-missile-launcher-frag-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-missile-launcher-krak",
            "title": "➤ Missile launcher - krak",
            "aliases": [
              "➤ Missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-missile-launcher-krak-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-helbrute-hammer",
            "title": "Helbrute hammer",
            "aliases": [
              "Helbrute hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-helbrute-hammer-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-power-scourge",
            "title": "Power scourge",
            "aliases": [
              "Power scourge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-power-scourge-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-multi-melta-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-twin-autocannon",
            "title": "Twin autocannon",
            "aliases": [
              "Twin autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-twin-autocannon-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-helbrute-plasma-cannon",
            "title": "Helbrute plasma cannon",
            "aliases": [
              "Helbrute plasma cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-helbrute-plasma-cannon-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-twin-heavy-bolter-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-helbrute-profile-twin-lascannon-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-helbrute-weapon-family-missile-launcher-selection",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-helbrute-weapon-family-missile-launcher",
            "profileIds": [
              "unit-helbrute-profile-missile-launcher-frag-ranged-5",
              "unit-helbrute-profile-missile-launcher-krak-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-helbrute-weapon-family-missile-launcher",
            "title": "➤ Missile launcher",
            "aliases": [
              "➤ Missile launcher"
            ],
            "profileIds": [
              "unit-helbrute-profile-missile-launcher-frag-ranged-5",
              "unit-helbrute-profile-missile-launcher-krak-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-helbrute-profile-close-combat-weapon-melee",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-helbrute-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-helbrute-profile-helbrute-fist-melee-2",
            "title": "Helbrute fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-helbrute-selection-helbrute-fist"
            ]
          },
          {
            "id": "unit-helbrute-profile-combi-bolter-ranged-3",
            "title": "Combi-bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-helbrute-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-helbrute-profile-heavy-flamer-ranged-4",
            "title": "Heavy flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-helbrute-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-helbrute-profile-missile-launcher-frag-ranged-5",
            "title": "➤ Missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-helbrute-selection-missile-launcher-frag",
              "unit-helbrute-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-helbrute-profile-missile-launcher-krak-ranged-6",
            "title": "➤ Missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-helbrute-selection-missile-launcher-krak",
              "unit-helbrute-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-helbrute-profile-helbrute-hammer-melee-7",
            "title": "Helbrute hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-helbrute-selection-helbrute-hammer"
            ]
          },
          {
            "id": "unit-helbrute-profile-power-scourge-melee-8",
            "title": "Power scourge",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-helbrute-selection-power-scourge"
            ]
          },
          {
            "id": "unit-helbrute-profile-multi-melta-ranged-9",
            "title": "Multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-helbrute-selection-multi-melta"
            ]
          },
          {
            "id": "unit-helbrute-profile-twin-autocannon-ranged-10",
            "title": "Twin autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-helbrute-selection-twin-autocannon"
            ]
          },
          {
            "id": "unit-helbrute-profile-helbrute-plasma-cannon-ranged-11",
            "title": "Helbrute plasma cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Hazardous",
            "sourceSelectionIds": [
              "unit-helbrute-selection-helbrute-plasma-cannon"
            ]
          },
          {
            "id": "unit-helbrute-profile-twin-heavy-bolter-ranged-12",
            "title": "Twin heavy bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-helbrute-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-helbrute-profile-twin-lascannon-ranged-13",
            "title": "Twin lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-helbrute-selection-twin-lascannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-heldrake",
      "title": "Heldrake",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Fly",
        "Chaos",
        "Daemon",
        "Heldrake"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "9",
          "Sv": "3+",
          "W": "12",
          "Ld": "6+",
          "OC": "-",
          "Invulnerable": "5+",
          "Base": "120x92mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-airborne-predator",
            "sectionId": "chaos-space-marines-ability-airborne-predator",
            "title": "Airborne Predator",
            "text": "Each time this model makes an attack that targets a unit that can FLY, add 1 to the Hit roll.",
            "sourceUnitId": "unit-heldrake"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-heldrake"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-heldrake"
          },
          {
            "id": "core-hover",
            "sectionId": "core-hover",
            "title": "Hover",
            "text": "Each time this unit takes to the skies (21.03), do not subtract 2\" from the maximum distance.",
            "sourceUnitId": "unit-heldrake"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-heldrake"
          }
        ],
        "models": [
          {
            "id": "unit-heldrake-model-heldrake",
            "title": "Heldrake",
            "aliases": [
              "Heldrake"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-heldrake-selection-heldrake-claws",
            "title": "Heldrake claws",
            "aliases": [
              "Heldrake claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heldrake-profile-heldrake-claws-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heldrake-selection-baleflamer",
            "title": "Baleflamer",
            "aliases": [
              "Baleflamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heldrake-profile-baleflamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heldrake-selection-hades-autocannon",
            "title": "Hades autocannon",
            "aliases": [
              "Hades autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heldrake-profile-hades-autocannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-heldrake-profile-heldrake-claws-melee",
            "title": "Heldrake claws",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-FLY 2+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-heldrake-selection-heldrake-claws"
            ]
          },
          {
            "id": "unit-heldrake-profile-baleflamer-ranged-2",
            "title": "Baleflamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-heldrake-selection-baleflamer"
            ]
          },
          {
            "id": "unit-heldrake-profile-hades-autocannon-ranged-3",
            "title": "Hades autocannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-heldrake-selection-hades-autocannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-khorne-lord-of-skulls",
      "title": "Khorne Lord of Skulls",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Titanic",
        "Towering",
        "Chaos",
        "Khorne",
        "Daemon",
        "Lord of Skulls",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "13",
          "Sv": "3+",
          "W": "24",
          "Ld": "6+",
          "OC": "8",
          "Invulnerable": "5+",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-plough-through-the-enemy",
            "sectionId": "chaos-space-marines-ability-plough-through-the-enemy",
            "title": "Plough Through the Enemy",
            "text": "In the Fight phase, after this model has finished making its attacks, if this model destroyed one or more enemy units this phase, each enemy unit within 6\" of this model must take a Battle-shock test.",
            "sourceUnitId": "unit-khorne-lord-of-skulls"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-8-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-8-wounds-remaining",
            "title": "Damaged: 1-8 wounds remaining",
            "text": "While this model has 1-8 wounds remaining, subtract 4 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-khorne-lord-of-skulls"
          },
          {
            "id": "chaos-space-marines-ability-deadly-demise-d6-2",
            "sectionId": "chaos-space-marines-ability-deadly-demise-d6-2",
            "title": "Deadly Demise D6+2",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-khorne-lord-of-skulls"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-khorne-lord-of-skulls"
          }
        ],
        "models": [
          {
            "id": "unit-khorne-lord-of-skulls-model-khorne-lord-of-skulls",
            "title": "Khorne Lord of Skulls",
            "aliases": [
              "Khorne Lord of Skulls"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-khorne-lord-of-skulls-selection-great-cleaver-of-khorne-strike",
            "title": "➤ Great cleaver of Khorne - strike",
            "aliases": [
              "➤ Great cleaver of Khorne - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-great-cleaver-of-khorne-sweep",
            "title": "➤ Great cleaver of Khorne - sweep",
            "aliases": [
              "➤ Great cleaver of Khorne - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-hades-gatling-cannon",
            "title": "Hades gatling cannon",
            "aliases": [
              "Hades gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-hades-gatling-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-skullhurler",
            "title": "Skullhurler",
            "aliases": [
              "Skullhurler"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-skullhurler-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-gorestorm-cannon",
            "title": "Gorestorm cannon",
            "aliases": [
              "Gorestorm cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-gorestorm-cannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-daemongore-cannon",
            "title": "Daemongore cannon",
            "aliases": [
              "Daemongore cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-daemongore-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-selection-ichor-cannon",
            "title": "Ichor cannon",
            "aliases": [
              "Ichor cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-ichor-cannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-khorne-lord-of-skulls-weapon-family-great-cleaver-of-khorne-selection",
            "title": "➤ Great cleaver of Khorne",
            "aliases": [
              "➤ Great cleaver of Khorne"
            ],
            "kind": "weapon",
            "familyId": "unit-khorne-lord-of-skulls-weapon-family-great-cleaver-of-khorne",
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-strike-melee",
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-khorne-lord-of-skulls-weapon-family-great-cleaver-of-khorne",
            "title": "➤ Great cleaver of Khorne",
            "aliases": [
              "➤ Great cleaver of Khorne"
            ],
            "profileIds": [
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-strike-melee",
              "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-strike-melee",
            "title": "➤ Great cleaver of Khorne - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "16",
            "ap": "-4",
            "d": "8",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-great-cleaver-of-khorne-strike",
              "unit-khorne-lord-of-skulls-weapon-family-great-cleaver-of-khorne-selection"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-great-cleaver-of-khorne-sweep-melee-2",
            "title": "➤ Great cleaver of Khorne - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "15",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-great-cleaver-of-khorne-sweep",
              "unit-khorne-lord-of-skulls-weapon-family-great-cleaver-of-khorne-selection"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-hades-gatling-cannon-ranged-3",
            "title": "Hades gatling cannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "12",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-hades-gatling-cannon"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-skullhurler-ranged-4",
            "title": "Skullhurler",
            "mode": "ranged",
            "range": "60\"",
            "a": "2D6",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-skullhurler"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-gorestorm-cannon-ranged-5",
            "title": "Gorestorm cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-gorestorm-cannon"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-daemongore-cannon-ranged-6",
            "title": "Daemongore cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "14",
            "ap": "-4",
            "d": "D6+2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-daemongore-cannon"
            ]
          },
          {
            "id": "unit-khorne-lord-of-skulls-profile-ichor-cannon-ranged-7",
            "title": "Ichor cannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-khorne-lord-of-skulls-selection-ichor-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-maulerfiend",
      "title": "Maulerfiend",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Maulerfiend"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "10",
          "Sv": "3+",
          "W": "12",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "5+",
          "Base": "120x92mm Oval Base"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-siege-crawler",
            "sectionId": "chaos-space-marines-ability-siege-crawler",
            "title": "Siege Crawler",
            "text": "You can ignore any or all modifiers to this model's Move characteristic and to Advance and Charge rolls made for it.",
            "sourceUnitId": "unit-maulerfiend"
          },
          {
            "id": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "sectionId": "chaos-space-marines-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-maulerfiend"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-maulerfiend"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-maulerfiend"
          }
        ],
        "models": [
          {
            "id": "unit-maulerfiend-model-maulerfiend",
            "title": "Maulerfiend",
            "aliases": [
              "Maulerfiend"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-maulerfiend-selection-maulerfiend-fists",
            "title": "Maulerfiend fists",
            "aliases": [
              "Maulerfiend fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maulerfiend-profile-maulerfiend-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-maulerfiend-selection-magma-cutter",
            "title": "Magma cutter",
            "aliases": [
              "Magma cutter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maulerfiend-profile-magma-cutter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-maulerfiend-selection-lasher-tendrils",
            "title": "Lasher tendrils",
            "aliases": [
              "Lasher tendrils"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maulerfiend-profile-lasher-tendrils-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-maulerfiend-profile-maulerfiend-fists-melee",
            "title": "Maulerfiend fists",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "14",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-maulerfiend-selection-maulerfiend-fists"
            ]
          },
          {
            "id": "unit-maulerfiend-profile-magma-cutter-ranged-2",
            "title": "Magma cutter",
            "mode": "ranged",
            "range": "6\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-maulerfiend-selection-magma-cutter"
            ]
          },
          {
            "id": "unit-maulerfiend-profile-lasher-tendrils-melee-3",
            "title": "Lasher tendrils",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-maulerfiend-selection-lasher-tendrils"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-noctilith-crown",
      "title": "Noctilith Crown",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Fortification",
        "Chaos",
        "Noctilith Crown",
        "Frame"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "-",
          "T": "11",
          "Sv": "3+",
          "W": "14",
          "Ld": "6+",
          "OC": "0",
          "Invulnerable": "",
          "Base": "Use model"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-malevolent-locus-aura",
            "sectionId": "chaos-space-marines-ability-malevolent-locus-aura",
            "title": "Malevolent Locus (Aura)",
            "text": "While a friendly HERETIC ASTARTES unit is within 9\" of this Fortification, improve that unit's Leadership characteristic by 1.",
            "sourceUnitId": "unit-noctilith-crown"
          },
          {
            "id": "chaos-space-marines-ability-malign-cover",
            "sectionId": "chaos-space-marines-ability-malign-cover",
            "title": "Malign Cover",
            "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this Fortification, that model has the Benefit of Cover against that attack.",
            "sourceUnitId": "unit-noctilith-crown"
          },
          {
            "id": "chaos-space-marines-ability-fortification",
            "sectionId": "chaos-space-marines-ability-fortification",
            "title": "Fortification",
            "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n- That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n- Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so.",
            "sourceUnitId": "unit-noctilith-crown"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-noctilith-crown"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-noctilith-crown"
          }
        ],
        "models": [
          {
            "id": "unit-noctilith-crown-model-noctilith-crown",
            "title": "Noctilith Crown",
            "aliases": [
              "Noctilith Crown"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-noctilith-crown-selection-lashing-warp-energies",
            "title": "Lashing warp energies",
            "aliases": [
              "Lashing warp energies"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noctilith-crown-profile-lashing-warp-energies-ranged"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-noctilith-crown-profile-lashing-warp-energies-ranged",
            "title": "Lashing warp energies",
            "mode": "ranged",
            "range": "6\"",
            "a": "8",
            "skill": "4+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-noctilith-crown-selection-lashing-warp-energies"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-venomcrawler",
      "title": "Venomcrawler",
      "sourceBookId": "chaos-space-marines",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Heretic Astartes",
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Venomcrawler"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "9",
          "Sv": "3+",
          "W": "9",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "5+",
          "Base": "100mm"
        },
        "abilities": [
          {
            "id": "chaos-space-marines-ability-soul-eater",
            "sectionId": "chaos-space-marines-ability-soul-eater",
            "title": "Soul Eater",
            "text": "At the end of the Fight phase, if one or more attacks made by this model that phase destroyed one or more enemy units, until the end of the battle, add 1 to the Attacks characteristic of this model’s weapons.",
            "sourceUnitId": "unit-venomcrawler"
          },
          {
            "id": "chaos-space-marines-ability-dark-pacts",
            "sectionId": "chaos-space-marines-ability-dark-pacts",
            "title": "Dark Pacts",
            "text": "If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of the Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit’s weapons to gain until the end of the phase:\n■ [LETHAL HITS]\n■ [SUSTAINED HITS 1]",
            "sourceUnitId": "unit-venomcrawler"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-venomcrawler"
          }
        ],
        "models": [
          {
            "id": "unit-venomcrawler-model-venomcrawler",
            "title": "Venomcrawler",
            "aliases": [
              "Venomcrawler"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-venomcrawler-selection-excruciator-cannon",
            "title": "Excruciator cannon",
            "aliases": [
              "Excruciator cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-venomcrawler-profile-excruciator-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-venomcrawler-selection-soulflayer-tendrils-and-claws",
            "title": "Soulflayer tendrils and claws",
            "aliases": [
              "Soulflayer tendrils and claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-venomcrawler-profile-soulflayer-tendrils-and-claws-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-venomcrawler-profile-excruciator-cannon-ranged",
            "title": "Excruciator cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-venomcrawler-selection-excruciator-cannon"
            ]
          },
          {
            "id": "unit-venomcrawler-profile-soulflayer-tendrils-and-claws-melee-2",
            "title": "Soulflayer tendrils and claws",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-venomcrawler-selection-soulflayer-tendrils-and-claws"
            ]
          }
        ],
        "wargearAbilities": []
      }
    }
  ],
  "detachments": [
    {
      "id": "cabal-of-chaos",
      "title": "Cabal of Chaos",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "chaos-cult",
      "title": "Chaos Cult",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "creations-of-bile",
      "title": "Creations of Bile",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "cult-of-the-arkifane",
      "title": "Cult of the Arkifane",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "deceptors",
      "title": "Deceptors",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "devotees-of-destruction",
      "title": "Devotees of Destruction",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "dread-talons",
      "title": "Dread Talons",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "fellhammer-siege-host",
      "title": "Fellhammer Siege-host",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "huron-s-marauders",
      "title": "HURON’S MARAUDERS",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "murdertalon-raiders",
      "title": "Murdertalon Raiders",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "nightmare-hunt",
      "title": "Nightmare Hunt",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "pactbound-zealots",
      "title": "Pactbound Zealots",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "renegade-raiders",
      "title": "Renegade Raiders",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "renegade-warband",
      "title": "Renegade Warband",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "soulforged-warpack",
      "title": "Soulforged Warpack",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "veterans-of-the-long-war",
      "title": "Veterans of the Long War",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "warpstrike-champions",
      "title": "Warpstrike Champions",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    }
  ],
  "detachmentRules": [],
  "enhancements": [
    {
      "legacyKey": "enhancement-touched-by-the-warp",
      "title": "Touched by the Warp",
      "text": "Saturated with empyric energies, this dark champion has spontaneously manifested the mutant powers of a true psyker. HERETIC ASTARTES model only (excluding KHORNE models). ▪ This model has PSYKER. ▪ This model’s weapons have [PSYCHIC].",
      "value": 10,
      "detachment": "Cabal of Chaos",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-touched-by-the-warp",
      "detachmentId": "cabal-of-chaos",
      "id": "enhancement-touched-by-the-warp",
      "points": 10,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "sourceId": "touched-by-the-warp",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-conduit-of-chaos",
      "title": "Conduit of Chaos",
      "text": "Like a lightning rod, this blessed fiend attracts the arcane energies of the Warp, unleashing them in a crackling storm of mutating horror as it plunges into the foe. HERETIC ASTARTES DAEMON model only (excluding KHORNE models). This model’s melee attacks have [LANCE].",
      "value": 20,
      "detachment": "Cabal of Chaos",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-conduit-of-chaos",
      "detachmentId": "cabal-of-chaos",
      "id": "enhancement-conduit-of-chaos",
      "points": 20,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "sourceId": "conduit-of-chaos",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-amulet-of-tainted-vigour",
      "title": "Amulet of Tainted Vigour",
      "text": "DARK APOSTLE model only. In your Command phase, you can return up to D3 destroyed DAMNED models (excluding CHARACTER models) to the bearer's unit.",
      "value": 20,
      "detachment": "Chaos Cult",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-amulet-of-tainted-vigour",
      "detachmentId": "chaos-cult",
      "id": "enhancement-amulet-of-tainted-vigour",
      "restrictions": [
        "DARK APOSTLE model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "2c8-9d0d-72d7-7375",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[24]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Chaos Cult > Enhancement > Amulet of Tainted Vigour",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-chaos-cult-amulet-of-tainted-vigour",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-cultists-brand",
      "title": "Cultist's Brand",
      "text": "DARK APOSTLE or DAMNED model only. If every other model in the bearer's unit (excluding Dark Disciples) is DAMNED, you can re-roll Advance and Charge rolls made for the bearer's unit.",
      "value": 30,
      "detachment": "Chaos Cult",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-cultists-brand",
      "detachmentId": "chaos-cult",
      "id": "enhancement-cultists-brand",
      "restrictions": [
        "DARK APOSTLE or DAMNED model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "42ab-1d5e-7a31-2de7",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[26]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Chaos Cult > Enhancement > Cultist's Brand",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-chaos-cult-cultists-brand",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-incendiary-goad",
      "title": "Incendiary Goad",
      "text": "DARK APOSTLE or DAMNED model only. While the bearer's unit is below its Starting Strength, add 1 to the Strength characteristic of melee weapons equipped by DAMNED models in that unit, and while that unit is Below Half-strength, add 1 to the Attacks characteristic of those weapons as well.",
      "value": 25,
      "detachment": "Chaos Cult",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-incendiary-goad",
      "detachmentId": "chaos-cult",
      "id": "enhancement-incendiary-goad",
      "restrictions": [
        "DARK APOSTLE or DAMNED model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "c791-aaac-2c1f-1d9a",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[25]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Chaos Cult > Enhancement > Incendiary Goad",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-chaos-cult-incendiary-goad",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-warped-foresight",
      "title": "Warped Foresight",
      "text": "DARK APOSTLE or DAMNED model only. While the bearer is leading a unit with the Scouts 6\" ability, every model in the bearer's unit has the Scouts 6\" ability.",
      "value": 10,
      "detachment": "Chaos Cult",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-warped-foresight",
      "detachmentId": "chaos-cult",
      "id": "enhancement-warped-foresight",
      "restrictions": [
        "DARK APOSTLE or DAMNED model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "a660-3c2c-2f05-a6a1",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[27]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Chaos Cult > Enhancement > Warped Foresight",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-chaos-cult-warped-foresight",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-surgical-precision",
      "title": "Surgical Precision",
      "text": "A student of Fabius Bile’s dread craft, this champion of Chaos wields their weapons with the same precision a master chirurgeon would wield a scalpel. Heretic Astartes model (excluding Damned models) only. The bearer’s melee weapons have the [PRECISION] ability.",
      "value": 10,
      "detachment": "Creations of Bile",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-surgical-precision",
      "detachmentId": "creations-of-bile",
      "id": "enhancement-surgical-precision",
      "points": 10,
      "sourcePages": [
        9
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          9
        ]
      },
      "sourceId": "surgical-precision",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-living-carapace",
      "title": "Living Carapace",
      "text": "With a thought, the wearer can compel this bioarmour to thicken, further increasing their formidable resistance. Chaos Lord model only. Add 1 to the bearer’s Wounds characteristic and the bearer has the Feel No Pain 5+ ability.",
      "value": 15,
      "detachment": "Creations of Bile",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-living-carapace",
      "detachmentId": "creations-of-bile",
      "id": "enhancement-living-carapace",
      "points": 15,
      "sourcePages": [
        9
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          9
        ]
      },
      "sourceId": "living-carapace",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-helm-of-all-seeing",
      "title": "Helm of All-seeing",
      "text": "This baroque helm sports numerous additional sensors, requiring various disfiguring organ augmentations to process the information. Heretic Astartes Infantry model (excluding Damned models) only. Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of the bearer.",
      "value": 25,
      "detachment": "Creations of Bile",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-helm-of-all-seeing",
      "detachmentId": "creations-of-bile",
      "id": "enhancement-helm-of-all-seeing",
      "points": 25,
      "sourcePages": [
        9
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          9
        ]
      },
      "sourceId": "helm-of-all-seeing",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-prime-test-subject",
      "title": "Prime Test Subject",
      "text": "Only the strongest will survive the rampant cell transformations associated with Bile’s mysterious bioalchemy. Heretic Astartes Infantry model (excluding Damned models) only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer. Each time the bearer makes a melee attack, you can re‑roll the Hit roll.",
      "value": 35,
      "detachment": "Creations of Bile",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-prime-test-subject",
      "detachmentId": "creations-of-bile",
      "id": "enhancement-prime-test-subject",
      "points": 35,
      "sourcePages": [
        9
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          9
        ]
      },
      "sourceId": "prime-test-subject",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-wyredjinn",
      "title": "Wyredjinn",
      "text": "A repulsive daemon imp of Vashtorr, this incorporeal data‑familiar flits through vox‑channels and sensor suites, stealing data for its master. Heretic Astartes model only (excluding Damned models). At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result if the bearer is within range of an objective marker you control: on a 4+, you gain 1CP.",
      "value": 25,
      "detachment": "Cult of the Arkifane",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-wyredjinn",
      "detachmentId": "cult-of-the-arkifane",
      "id": "enhancement-wyredjinn",
      "points": 25,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "wyredjinn",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-cybinfernal-font",
      "title": "Cybinfernal Font",
      "text": "This warp‑forged augmetic channels daemonic energies through its bearer and into those they lead, spawning biomechanoid mutation and supernatural resilience. Heretic Astartes model only (excluding Damned models). Models in the bearer’s unit have the Soul Forge keyword.",
      "value": 20,
      "detachment": "Cult of the Arkifane",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-cybinfernal-font",
      "detachmentId": "cult-of-the-arkifane",
      "id": "enhancement-cybinfernal-font",
      "points": 20,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "cybinfernal-font",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-mark-of-the-soul-forges",
      "title": "Mark of the Soul Forges",
      "text": "This burning rune attests to the – perhaps unwise – pact its bearer has struck with the Arkifane in return for enhanced martial might and lethality. Heretic Astartes model only (excluding Damned models). Each time the bearer makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
      "value": 20,
      "detachment": "Cult of the Arkifane",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-mark-of-the-soul-forges",
      "detachmentId": "cult-of-the-arkifane",
      "id": "enhancement-mark-of-the-soul-forges",
      "points": 20,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "mark-of-the-soul-forges",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-crown-of-worms",
      "title": "Crown of Worms",
      "text": "This parasitic helm bestows the ability to conjure daemonic nematodes akin to those manifested by the Arkifane himself. These burrowing entities can reknit faltering war machines or gnaw upon such vehicles’ sanity at the wearer’s command. Warpsmith model only. Add 3” to the range of the bearer’s Warpsmith, Master of Mechanisms and Enrage Machine Spirits abilities.",
      "value": 15,
      "detachment": "Cult of the Arkifane",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-crown-of-worms",
      "detachmentId": "cult-of-the-arkifane",
      "id": "enhancement-crown-of-worms",
      "points": 15,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "crown-of-worms",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-cursed-fang",
      "title": "Cursed Fang",
      "text": "HERETIC ASTARTES INFANTRY model only. Improve the Armour Penetration characteristic of the bearer's melee weapons by 1, and the bearer's melee weapons have the [PRECISION] ability.",
      "value": 10,
      "detachment": "Deceptors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-cursed-fang",
      "detachmentId": "deceptors",
      "id": "enhancement-cursed-fang",
      "restrictions": [
        "HERETIC ASTARTES INFANTRY model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "6ee9-ec28-2608-c8c6",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[9]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Deceptors > Enhancement > Cursed Fang",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-deceptors-cursed-fang",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-falsehood",
      "title": "Falsehood",
      "text": "CHAOS LORD model only (excluding TERMINATOR and JUMP PACK models). In the Declare Battle Formations step, you can set the bearer up in Reserves instead of setting it up on the battlefield. If you do, in one of your Movement phases, you can select one model in a friendly LEGIONARIES or CHOSEN unit that has two or more models remaining and is on the battlefield (excluding Attached units). The selected model is destroyed (ignoring any rules that are triggered when a model is destroyed) and the bearer is set up as close as possible to where that model was destroyed and only within Engagement Range of any enemy units if the destroyed model was within Engagement Range of those units. The bearer now attaches to that unit as its Leader.",
      "value": 10,
      "detachment": "Deceptors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-falsehood",
      "detachmentId": "deceptors",
      "id": "enhancement-falsehood",
      "restrictions": [
        "CHAOS LORD model only (excluding TERMINATOR and JUMP PACK models)."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "361e-2839-f32e-1873",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[8]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Deceptors > Enhancement > Falsehood",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-deceptors-falsehood",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-shroud-of-obfuscation",
      "title": "Shroud of Obfuscation",
      "text": "HERETIC ASTARTES INFANTRY model only. The bearer has the Stealth and Lone Operative abilities.",
      "value": 15,
      "detachment": "Deceptors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-shroud-of-obfuscation",
      "detachmentId": "deceptors",
      "id": "enhancement-shroud-of-obfuscation",
      "restrictions": [
        "HERETIC ASTARTES INFANTRY model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "a469-ca0-3e09-ae0a",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[10]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Deceptors > Enhancement > Shroud of Obfuscation",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-deceptors-shroud-of-obfuscation",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-soul-link",
      "title": "Soul Link",
      "text": "HERETIC ASTARTES INFANTRY model only. At the start of your Command phase, you can select one other HERETIC ASTARTES INFANTRY CHARACTER model from your army (excluding EPIC HEROES). Until the start of your next Command phase, the bearer gains the PSYKER keyword, and replace the bearer's datasheet abilities with the datasheet abilities of the CHARACTER you selected.",
      "value": 5,
      "detachment": "Deceptors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-soul-link",
      "detachmentId": "deceptors",
      "id": "enhancement-soul-link",
      "restrictions": [
        "HERETIC ASTARTES INFANTRY model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "56cd-b0f6-199-92c7",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[11]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Deceptors > Enhancement > Soul Link",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-deceptors-soul-link",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-pact-of-destruction",
      "title": "Pact of Destruction",
      "text": "There are those daemonic entities within the Warp that are willing to offer their boons to any who will wreak wholesale devastation in their name, at least for as long as the carnage holds their capricious attention. WARPSMITH model only. ▪ When this unit uses its Dark Pacts ability, this unit can re-roll Leadership rolls. ▪ In your Shooting phase, when this unit has shot, if this unit used its Dark Pacts ability and if those attacks destroyed an enemy model, this unit heals 3 wounds.",
      "value": 15,
      "detachment": "Devotees of Destruction",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-pact-of-destruction",
      "detachmentId": "devotees-of-destruction",
      "id": "enhancement-pact-of-destruction",
      "points": 15,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "sourceId": "pact-of-destruction",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eye-of-oblivion",
      "title": "Eye of Oblivion",
      "text": "This vile technodaemonic parasite nests within the emptied eye socket of its host, driving filament tendrils deep into their brain and feeding on their animus in exchange for revealing the secrets of its supernatural vision. WARPSMITH model only. When this unit is selected to shoot, select one enemy unit within 24\" of this unit. That enemy unit has +6\" detection range until this unit has shot.",
      "value": 20,
      "detachment": "Devotees of Destruction",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eye-of-oblivion",
      "detachmentId": "devotees-of-destruction",
      "id": "enhancement-eye-of-oblivion",
      "points": 20,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "sourceId": "eye-of-oblivion",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eater-of-dread",
      "title": "Eater of Dread",
      "text": "HERETIC ASTARTES model only. At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result for each Battle-shocked enemy unit that is on the battlefield: on a 5+, you gain 1CP.",
      "value": 15,
      "detachment": "Dread Talons",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eater-of-dread",
      "detachmentId": "dread-talons",
      "id": "enhancement-eater-of-dread",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "f208-950f-f62d-943a",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[19]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Dread Talons > Enhancement > Eater of Dread",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-dread-talons-eater-of-dread",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-nights-shroud",
      "title": "Night's Shroud",
      "text": "CHAOS LORD model only. TERMINATOR models are excluded. Models in the bearer's unit have the Stealth ability.",
      "value": 10,
      "detachment": "Dread Talons",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-nights-shroud",
      "detachmentId": "dread-talons",
      "id": "enhancement-nights-shroud",
      "restrictions": [
        "CHAOS LORD model only.",
        "TERMINATOR models are excluded."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "8a4b-3777-e4ec-fb5e",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[17]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Dread Talons > Enhancement > Night's Shroud",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-dread-talons-nights-shroud",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-dread-talons-warp-fuelled-thrusters",
      "title": "Warp-fuelled Thrusters",
      "text": "JUMP PACK CHAOS LORD model only. At the end of your opponent's turn, if the bearer's unit is not within Engagement Range of one or more enemy units, you can remove the bearer's unit from the battlefield and place it into Strategic Reserves.",
      "value": 20,
      "detachment": "Dread Talons",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-dread-talons-warp-fuelled-thrusters",
      "detachmentId": "dread-talons",
      "id": "enhancement-dread-talons-warp-fuelled-thrusters",
      "restrictions": [
        "JUMP PACK CHAOS LORD model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "1b4d-d584-df1c-c158",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[28]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Dread Talons > Enhancement > Warp-fuelled Thrusters",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-dread-talons-warp-fuelled-thrusters",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-willbreaker",
      "title": "Willbreaker",
      "text": "HERETIC ASTARTES model only. In the Fight phase, after the bearer has made its attacks, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test.",
      "value": 10,
      "detachment": "Dread Talons",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-willbreaker",
      "detachmentId": "dread-talons",
      "id": "enhancement-willbreaker",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "d3d-1a0c-87b8-3401",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[16]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Dread Talons > Enhancement > Willbreaker",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-dread-talons-willbreaker",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-bastion-plate",
      "title": "Bastion Plate",
      "text": "CHAOS LORD model only. JUMP PACK models are excluded. Once per battle round, when a saving throw is failed for the bearer's unit, you can change the Damage characteristic of that attack to 0.",
      "value": 10,
      "detachment": "Fellhammer Siege-host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-bastion-plate",
      "detachmentId": "fellhammer-siege-host",
      "id": "enhancement-bastion-plate",
      "restrictions": [
        "CHAOS LORD model only.",
        "JUMP PACK models are excluded."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "5a26-9010-9370-8043",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[20]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Fellhammer Siege-host > Enhancement > Bastion Plate",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-fellhammer-siege-host-bastion-plate",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-iron-artifice",
      "title": "Iron Artifice",
      "text": "HERETIC ASTARTES INFANTRY model only. The bearer's weapons have the [ANTI-VEHICLE 4+] and [ANTI-FORTIFICATION 4+] abilities.",
      "value": 10,
      "detachment": "Fellhammer Siege-host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-iron-artifice",
      "detachmentId": "fellhammer-siege-host",
      "id": "enhancement-iron-artifice",
      "restrictions": [
        "HERETIC ASTARTES INFANTRY model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "5723-e257-6177-ac5",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[23]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Fellhammer Siege-host > Enhancement > Iron Artifice",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-fellhammer-siege-host-iron-artifice",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-ironbound-enmity",
      "title": "Ironbound Enmity",
      "text": "HERETIC ASTARTES model only. Each time the bearer makes an attack while within range of an objective marker, add 1 to the Wound roll.",
      "value": 15,
      "detachment": "Fellhammer Siege-host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-ironbound-enmity",
      "detachmentId": "fellhammer-siege-host",
      "id": "enhancement-ironbound-enmity",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "281c-52a2-198-1047",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[21]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Fellhammer Siege-host > Enhancement > Ironbound Enmity",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-fellhammer-siege-host-ironbound-enmity",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-warp-tracer",
      "title": "Warp Tracer",
      "text": "HERETIC ASTARTES model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover.",
      "value": 20,
      "detachment": "Fellhammer Siege-host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-warp-tracer",
      "detachmentId": "fellhammer-siege-host",
      "id": "enhancement-warp-tracer",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "786c-288a-5ed6-676e",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[22]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Fellhammer Siege-host > Enhancement > Warp Tracer",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-fellhammer-siege-host-warp-tracer",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-voice-of-the-tyrant",
      "title": "Voice of the Tyrant",
      "text": "This champion is a valued commander, and speaks with the authority of Huron himself. Heretic Astartes model only (excluding Damned models). The bearer’s unit has both abilities from the Tyrannical Motivation Detachment rule.",
      "value": 25,
      "detachment": "HURON’S MARAUDERS",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-voice-of-the-tyrant",
      "detachmentId": "huron-s-marauders",
      "id": "enhancement-voice-of-the-tyrant",
      "points": 25,
      "sourcePages": [
        13
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          13
        ]
      },
      "sourceId": "voice-of-the-tyrant",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-raid-leader",
      "title": "Raid Leader",
      "text": "Rapid mechanised assaults are a preferred tactic of the Red Corsairs, and this champion excels at them. Heretic Astartes model only (excluding Damned models). Each time the bearer’s unit is set up after disembarking from a Transport that has made a Normal move this turn, the bearer’s unit is still eligible to declare a charge.",
      "value": 20,
      "detachment": "HURON’S MARAUDERS",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-raid-leader",
      "detachmentId": "huron-s-marauders",
      "id": "enhancement-raid-leader",
      "points": 20,
      "sourcePages": [
        13
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          13
        ]
      },
      "sourceId": "raid-leader",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-dread-reputation",
      "title": "Dread Reputation",
      "text": "Such is this warrior’s infamy that their mere presence on the field of battle can overwhelm the foe with tyrannical intimidation. Heretic Astartes model only (excluding Damned models). Each time the bearer’s unit is set up on the battlefield, each enemy unit within 6” of the bearer’s unit (or within 12” if the bearer’s unit was set up using the Deep Strike ability) takes a Battle‑shock test.",
      "value": 25,
      "detachment": "HURON’S MARAUDERS",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-dread-reputation",
      "detachmentId": "huron-s-marauders",
      "id": "enhancement-dread-reputation",
      "points": 25,
      "sourcePages": [
        13
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          13
        ]
      },
      "sourceId": "dread-reputation",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eager-for-bloodshed",
      "title": "Eager for Bloodshed",
      "text": "Desperate to lock weapons with the foe, this warrior is always at the fore, fighting in the vanguard of Huron Blackheart’s forces. Heretic Astartes model only. The bearer has the Infiltrators ability.",
      "value": 30,
      "detachment": "HURON’S MARAUDERS",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eager-for-bloodshed",
      "detachmentId": "huron-s-marauders",
      "id": "enhancement-eager-for-bloodshed",
      "points": 30,
      "sourcePages": [
        13
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          13
        ]
      },
      "sourceId": "eager-for-bloodshed",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-shadowcowl-talisman",
      "title": "Shadowcowl Talisman",
      "text": "Worked with diabolical incantations of occlusion, wound about with subtle enchantments, this onyx disc draws a penumbral aura about the bearer that hides him from the eyes of his prey. CHAOS LORD WITH JUMP PACK model only. This unit has 5+ InSv.",
      "value": 20,
      "detachment": "Murdertalon Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-shadowcowl-talisman",
      "detachmentId": "murdertalon-raiders",
      "id": "enhancement-shadowcowl-talisman",
      "points": 20,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "sourceId": "shadowcowl-talisman",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-pact-of-cursed-pinions",
      "title": "Pact of Cursed Pinions",
      "text": "Sharing their mortal frame with a predatory possessor daemon lends this dark champion additional might and swiftness, though it may yet damn them for eternity. CHAOS LORD WITH JUMP PACK model only. ▪ This model has DAEMON. ▪ This model’s melee attacks have +1 A.",
      "value": 20,
      "detachment": "Murdertalon Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-pact-of-cursed-pinions",
      "detachmentId": "murdertalon-raiders",
      "id": "enhancement-pact-of-cursed-pinions",
      "points": 20,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "sourceId": "pact-of-cursed-pinions",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-greyveil-hex",
      "title": "Greyveil Hex",
      "text": "Incised into this warrior’s battleplate is a runic curse which dims his form in the minds of his prey, until all they perceive is a mass of talons and shadow. Chaos Lord model only. Models in the bearer’s unit have the Stealth ability. While the bearer’s unit is within range of one or more objective markers you control, that unit can only be selected as the target of a ranged attack if the attacking model is within 18\".",
      "value": 25,
      "detachment": "Nightmare Hunt",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-greyveil-hex",
      "detachmentId": "nightmare-hunt",
      "id": "enhancement-greyveil-hex",
      "points": 25,
      "sourcePages": [
        11
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          11
        ]
      },
      "sourceId": "greyveil-hex",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-nightmare-hunt-warp-fuelled-thrusters",
      "title": "Warp-fuelled Thrusters",
      "text": "Bathed in warp energies, this Lord’s jump pack tears rifts in reality, allowing them to withdraw at a moment’s notice. Chaos Lord Jump Pack model only. At the end of your opponent’s Fight phase, if the bearer’s unit is not within Engagement Range of one or more enemy units, you can remove the bearer’s unit from the battlefield and place it into Strategic Reserves.",
      "value": 20,
      "detachment": "Nightmare Hunt",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-nightmare-hunt-warp-fuelled-thrusters",
      "detachmentId": "nightmare-hunt",
      "id": "enhancement-nightmare-hunt-warp-fuelled-thrusters",
      "points": 20,
      "sourcePages": [
        11
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          11
        ]
      },
      "sourceId": "warp-fuelled-thrusters",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-terrorglut-parasite",
      "title": "Terrorglut Parasite",
      "text": "A daemonic pact sealed in fear and dread allowed this entity to squirm into reality. Coiled tightly and invisibly about a warrior’s soul, the being wears away at the sanity of those he faces and feasts on their terror. Heretic Astartes model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle‑shock test, subtracting 1 from the result.",
      "value": 20,
      "detachment": "Nightmare Hunt",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-terrorglut-parasite",
      "detachmentId": "nightmare-hunt",
      "id": "enhancement-terrorglut-parasite",
      "points": 20,
      "sourcePages": [
        11
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          11
        ]
      },
      "sourceId": "terrorglut-parasite",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-sorrowscent-vulture",
      "title": "Sorrowscent Vulture",
      "text": "This champion demands to be in the vanguard of the hunt, their eagerness to inflict suffering manifesting in a daring lunge towards enemy lines. Chaos Lord Jump Pack model only. Models in the bearer’s unit have the Scouts 6\" ability.",
      "value": 35,
      "detachment": "Nightmare Hunt",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-sorrowscent-vulture",
      "detachmentId": "nightmare-hunt",
      "id": "enhancement-sorrowscent-vulture",
      "points": 35,
      "sourcePages": [
        11
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          11
        ]
      },
      "sourceId": "sorrowscent-vulture",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eye-of-tzeentch",
      "title": "Eye of Tzeentch",
      "text": "HERETIC ASTARTES TZEENTCH model only. Each time the bearer's unit makes a Dark Pact and does not fail the resulting Leadership test, if the result of that test was 8 or more, you gain 1CP.",
      "value": 15,
      "detachment": "Pactbound Zealots",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eye-of-tzeentch",
      "detachmentId": "pactbound-zealots",
      "id": "enhancement-eye-of-tzeentch",
      "restrictions": [
        "HERETIC ASTARTES TZEENTCH model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "6ba0-8b1e-9e0d-20fd",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[1]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Pactbound Zealots > Enhancement > Eye of Tzeentch",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-pactbound-zealots-eye-of-tzeentch",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-intoxicating-elixir",
      "title": "Intoxicating Elixir",
      "text": "HERETIC ASTARTES SLAANESH model only. The bearer has the Feel No Pain 5+ ability. Each time the bearer shoots or fights, if the bearer's unit made a Dark Pact this phase and did not fail the resulting Leadership test, after the bearer has resolved those attacks, select one enemy unit that was hit by one or more of those attacks; that enemy unit must take a Battle-shock test.",
      "value": 15,
      "detachment": "Pactbound Zealots",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-intoxicating-elixir",
      "detachmentId": "pactbound-zealots",
      "id": "enhancement-intoxicating-elixir",
      "restrictions": [
        "HERETIC ASTARTES SLAANESH model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "8d30-bc8b-6d57-ef08",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[3]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Pactbound Zealots > Enhancement > Intoxicating Elixir",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-pactbound-zealots-intoxicating-elixir",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-orbs-of-unlife",
      "title": "Orbs of Unlife",
      "text": "HERETIC ASTARTES NURGLE model only. At the end of the Fight phase, roll one D6 for every enemy unit within 3\" of the bearer, adding 1 to the result if the bearer's unit made a Dark Pact that phase and did not fail the resulting Leadership test: on a 4+, that enemy unit suffers D3 mortal wounds.",
      "value": 15,
      "detachment": "Pactbound Zealots",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-orbs-of-unlife",
      "detachmentId": "pactbound-zealots",
      "id": "enhancement-orbs-of-unlife",
      "restrictions": [
        "HERETIC ASTARTES NURGLE model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "f2ce-c4b6-6976-e1d5",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[2]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Pactbound Zealots > Enhancement > Orbs of Unlife",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-pactbound-zealots-orbs-of-unlife",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-talisman-of-burning-blood",
      "title": "Talisman of Burning Blood",
      "text": "HERETIC ASTARTES KHORNE model only. Add 1 to the Attacks and Strength characteristics of the bearer's melee weapons. Each time the bearer's unit makes a Dark Pact and does not fail the resulting Leadership test, roll one D3: until the end of the phase, add the result to the Attacks and Strength characteristics of the bearer's melee weapons instead.",
      "value": 15,
      "detachment": "Pactbound Zealots",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-talisman-of-burning-blood",
      "detachmentId": "pactbound-zealots",
      "id": "enhancement-talisman-of-burning-blood",
      "restrictions": [
        "HERETIC ASTARTES KHORNE model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "e357-6558-923e-61e2",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[0]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Pactbound Zealots > Enhancement > Talisman of Burning Blood",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-pactbound-zealots-talisman-of-burning-blood",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-despots-claim",
      "title": "Despot's Claim",
      "text": "HERETIC ASTARTES model only. At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result if the bearer is wholly within 12\" of your opponent's deployment zone: on a 5+, you gain 1CP.",
      "value": 15,
      "detachment": "Renegade Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-despots-claim",
      "detachmentId": "renegade-raiders",
      "id": "enhancement-despots-claim",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "18c9-6770-6371-582b",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[12]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Renegade Raiders > Enhancement > Despot's Claim",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-renegade-raiders-despots-claim",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-dread-reaver",
      "title": "Dread Reaver",
      "text": "HERETIC ASTARTES model only. Each time the bearer makes a melee attack, if the bearer is wholly within 12\" of your opponent's deployment zone, you can re-roll the Hit roll and you can re-roll the Wound roll.",
      "value": 15,
      "detachment": "Renegade Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-dread-reaver",
      "detachmentId": "renegade-raiders",
      "id": "enhancement-dread-reaver",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "a3f6-e18b-d9e6-b841",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[13]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Renegade Raiders > Enhancement > Dread Reaver",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-renegade-raiders-dread-reaver",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-mark-of-the-hound",
      "title": "Mark of the Hound",
      "text": "HERETIC ASTARTES model only. Models in the bearer's unit have the Scouts 6\" ability.",
      "value": 25,
      "detachment": "Renegade Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-mark-of-the-hound",
      "detachmentId": "renegade-raiders",
      "id": "enhancement-mark-of-the-hound",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "b5e6-8586-a9a9-b6b",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[14]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Renegade Raiders > Enhancement > Mark of the Hound",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-renegade-raiders-mark-of-the-hound",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-tyrants-lash",
      "title": "Tyrant's Lash",
      "text": "HERETIC ASTARTES model only. You can re-roll Advance rolls made for the bearer's unit, and the bearer's unit is eligible to shoot in a turn in which it Fell Back.",
      "value": 20,
      "detachment": "Renegade Raiders",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-tyrants-lash",
      "detachmentId": "renegade-raiders",
      "id": "enhancement-tyrants-lash",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "8ee0-de8d-3895-b1ac",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[15]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Renegade Raiders > Enhancement > Tyrant's Lash",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-renegade-raiders-tyrants-lash",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-weaponised-hatred",
      "title": "Weaponised Hatred",
      "text": "This champion’s bitterness has been tempered like a blade, and is wielded with the brutal efficacy to match. Heretic Astartes model only. Once per battle round, after your Vendetta target is destroyed, if the bearer is on the battlefield, you can select one enemy unit visible to the bearer. That enemy unit becomes your Vendetta target until you select a new one.",
      "value": 35,
      "detachment": "Renegade Warband",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-weaponised-hatred",
      "detachmentId": "renegade-warband",
      "id": "enhancement-weaponised-hatred",
      "points": 35,
      "sourcePages": [
        15
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          15
        ]
      },
      "sourceId": "weaponised-hatred",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eyes-of-the-hunter",
      "title": "Eyes of the Hunter",
      "text": "Immersion within the mutagenic energies of the Warp has wrought changes upon this warrior’s eyes. Slit pupils and warp sight enable them to pick out their targets with unerring accuracy. Heretic Astartes model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability.",
      "value": 15,
      "detachment": "Renegade Warband",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eyes-of-the-hunter",
      "detachmentId": "renegade-warband",
      "id": "enhancement-eyes-of-the-hunter",
      "points": 15,
      "sourcePages": [
        15
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          15
        ]
      },
      "sourceId": "eyes-of-the-hunter",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-fratricidal-trophies",
      "title": "Fratricidal Trophies",
      "text": "The trophy racks of this warrior’s Terminator armour bear the skulls of former battle‑brothers slain by his own hand. The warriors that fight at his side strive their hardest to avoid sharing the fate of their former comrades. Heretic Astartes Terminator model only. In a turn in which the bearer’s unit chose to Default to Doctrine, until the end of the turn, each time a model in this unit makes an attack, you can re‑roll the Hit roll.",
      "value": 5,
      "detachment": "Renegade Warband",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-fratricidal-trophies",
      "detachmentId": "renegade-warband",
      "id": "enhancement-fratricidal-trophies",
      "points": 5,
      "sourcePages": [
        15
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          15
        ]
      },
      "sourceId": "fratricidal-trophies",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-empyric-symbiote",
      "title": "Empyric Symbiote",
      "text": "This champion of ruin has been bonded with a warp‑spawned symbiote. This malefic companion’s predatory senses sense the quickest route to the enemy. Heretic Astartes model only. Add 1 to Advance and Charge rolls made for the bearer’s unit.",
      "value": 15,
      "detachment": "Renegade Warband",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-empyric-symbiote",
      "detachmentId": "renegade-warband",
      "id": "enhancement-empyric-symbiote",
      "points": 15,
      "sourcePages": [
        15
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          15
        ]
      },
      "sourceId": "empyric-symbiote",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-forges-blessing",
      "title": "Forge's Blessing",
      "text": "HERETIC ASTARTES model only. In your Command phase, select one friendly HERETIC ASTARTES VEHICLE unit within 12\" of the bearer. Until the start of your next Command phase, that unit has the Feel No Pain 6+ ability.",
      "value": 20,
      "detachment": "Soulforged Warpack",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-forges-blessing",
      "detachmentId": "soulforged-warpack",
      "id": "enhancement-forges-blessing",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "5bd4-e482-a053-1184",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[18]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Soulforged Warpack > Enhancement > Forge's Blessing",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-soulforged-warpack-forges-blessing",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-invigorated-mechatendrils",
      "title": "Invigorated Mechatendrils",
      "text": "WARPSMITH model only. Add 4\" to the bearer's Move characteristic.",
      "value": 15,
      "detachment": "Soulforged Warpack",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-invigorated-mechatendrils",
      "detachmentId": "soulforged-warpack",
      "id": "enhancement-invigorated-mechatendrils",
      "restrictions": [
        "WARPSMITH model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "3bc1-957b-473-faa0",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[29]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Soulforged Warpack > Enhancement > Invigorated Mechatendrils",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-soulforged-warpack-invigorated-mechatendrils",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-tempting-addendum",
      "title": "Tempting Addendum",
      "text": "HERETIC ASTARTES model only. Each time a HERETIC ASTARTES DAEMON VEHICLE unit from your army invokes its contract while within 3\" of the bearer: if it suffers one or more mortal wounds as a result of that Dark Pact, add 1 to the number of mortal wounds it suffers; until the end of the phase, each time a model in that unit makes an attack, you can re-roll the Hit roll.",
      "value": 40,
      "detachment": "Soulforged Warpack",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-tempting-addendum",
      "detachmentId": "soulforged-warpack",
      "id": "enhancement-tempting-addendum",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "a82c-bf6-f3dd-81ac",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[31]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Soulforged Warpack > Enhancement > Tempting Addendum",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-soulforged-warpack-tempting-addendum",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-soul-harvester",
      "title": "Soul Harvester",
      "text": "HERETIC ASTARTES model only. While the bearer is on the battlefield, each time an enemy unit within 12\" of the bearer is destroyed, roll one D6: on a 5+, you gain 1CP.",
      "value": 15,
      "detachment": "Soulforged Warpack",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-soul-harvester",
      "detachmentId": "soulforged-warpack",
      "id": "enhancement-soul-harvester",
      "restrictions": [
        "HERETIC ASTARTES model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "da72-b2d6-58a6-b821",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[30]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Soulforged Warpack > Enhancement > Soul Harvester",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-soulforged-warpack-soul-harvester",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eager-for-vengeance",
      "title": "Eager for Vengeance",
      "text": "HERETIC ASTARTES model only. Excludes DAMNED models. The bearer's unit is eligible to shoot and declare a charge in a turn in which it Fell Back. Each time a model in the bearer's unit makes an attack that targets your focus of hatred, if the bearer's unit Fell Back this turn, add 1 to the Hit roll, and each time you select your focus of hatred as a target of that unit's charge, add 1 to the Charge roll.",
      "value": 20,
      "detachment": "Veterans of the Long War",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eager-for-vengeance",
      "detachmentId": "veterans-of-the-long-war",
      "id": "enhancement-eager-for-vengeance",
      "restrictions": [
        "HERETIC ASTARTES model only.",
        "Excludes DAMNED models."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "bb91-cc38-e79d-7ce0",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[5]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Veterans of the Long War > Enhancement > Eager for Vengeance",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-veterans-of-the-long-war-eager-for-vengeance",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eye-of-abaddon",
      "title": "Eye of Abaddon",
      "text": "HERETIC ASTARTES model only. Excludes DAMNED models. While the bearer is on the battlefield, each time your focus of hatred is destroyed, roll one D6: on a 4+, you gain 1CP.",
      "value": 15,
      "detachment": "Veterans of the Long War",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eye-of-abaddon",
      "detachmentId": "veterans-of-the-long-war",
      "id": "enhancement-eye-of-abaddon",
      "restrictions": [
        "HERETIC ASTARTES model only.",
        "Excludes DAMNED models."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "b06a-cbc9-6820-6a93",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[6]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Veterans of the Long War > Enhancement > Eye of Abaddon",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-veterans-of-the-long-war-eye-of-abaddon",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-mark-of-legend",
      "title": "Mark of Legend",
      "text": "HERETIC ASTARTES model only. Excludes DAMNED models. Once per turn, you can re-roll one Hit roll, one Wound roll or one saving throw made for the bearer.",
      "value": 10,
      "detachment": "Veterans of the Long War",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-mark-of-legend",
      "detachmentId": "veterans-of-the-long-war",
      "id": "enhancement-mark-of-legend",
      "restrictions": [
        "HERETIC ASTARTES model only.",
        "Excludes DAMNED models."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "aaa6-f20e-362a-f55d",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[7]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Veterans of the Long War > Enhancement > Mark of Legend",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-veterans-of-the-long-war-mark-of-legend",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-warmasters-gift",
      "title": "Warmaster's Gift",
      "text": "CHAOS LORD model only. Each time the bearer makes an attack that targets your focus of hatred, an unmodified successful Wound roll of 5+ scores a Critical Wound.",
      "value": 15,
      "detachment": "Veterans of the Long War",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-warmasters-gift",
      "detachmentId": "veterans-of-the-long-war",
      "id": "enhancement-warmasters-gift",
      "restrictions": [
        "CHAOS LORD model only."
      ],
      "provenance": {
        "authority": "secondary",
        "status": "SECONDARY CONSENSUS",
        "sources": [
          {
            "name": "New Recruit / BSData",
            "identity": {
              "id": "9a33-6b21-25e3-b5ac",
              "jsonPath": "$.catalogue.sharedSelectionEntryGroups[0].selectionEntries[4]"
            },
            "commit": "b6d17952f74814528b4c70ef5016c86b922d5257",
            "catalogueRevision": 6
          },
          {
            "name": "Wahapedia",
            "identity": "Chaos Space Marines > Veterans of the Long War > Enhancement > Warmaster's Gift",
            "checkedAt": "2026-08-12"
          }
        ],
        "checkedAt": "2026-08-12"
      },
      "sourceId": "enhancement-veterans-of-the-long-war-warmasters-gift",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-infernal-fulgurite",
      "title": "Infernal Fulgurite",
      "text": "This strange artefact was recovered from the storm‑lashed daemon world of Utrexismia. A shard of warp lightning frozen forever in reality, it serves as a potent focus for teleportation. Heretic Astartes model only (excluding Damned models). Once per battle, you can target the bearer’s unit with the Rapid Ingress Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
      "value": 20,
      "detachment": "Warpstrike Champions",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-infernal-fulgurite",
      "detachmentId": "warpstrike-champions",
      "id": "enhancement-infernal-fulgurite",
      "points": 20,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "infernal-fulgurite",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-eye-of-the-warp",
      "title": "Eye of the Warp",
      "text": "This burning gem allows its bearer to see through the veil between realspace and the Warp, and so to react instantly upon piercing that veil. Heretic Astartes model with the Deep Strike ability only. Each time the bearer’s unit is set up on the battlefield, until the end of the turn, you can re‑roll Charge rolls made for that unit.",
      "value": 15,
      "detachment": "Warpstrike Champions",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-eye-of-the-warp",
      "detachmentId": "warpstrike-champions",
      "id": "enhancement-eye-of-the-warp",
      "points": 15,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "eye-of-the-warp",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-akshurs-binding-runes",
      "title": "Akshur’s Binding Runes",
      "text": "Living runes that crawl from an ancient tome onto living skin, these sigils anchor their host to realspace even when they are immersed in the Empyrean. Heretic Astartes model with the Deep Strike ability only. The bearer’s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
      "value": 20,
      "detachment": "Warpstrike Champions",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-akshurs-binding-runes",
      "detachmentId": "warpstrike-champions",
      "id": "enhancement-akshurs-binding-runes",
      "points": 20,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "akshur-s-binding-runes",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    },
    {
      "legacyKey": "enhancement-tzagulla",
      "title": "Tzagulla",
      "text": "This shape‑shifting daemon weapon feeds upon the presence of warp energy to empower both itself and its wielder. Heretic Astartes model with the Deep Strike ability only. Improve the Attacks, Strength and Armour Penetration characteristics of the bearer’s weapons by 1. In addition, each time the bearer’s unit is set up on the battlefield from Reserves, until the end of the turn, improve the Damage characteristic of the bearer’s weapons by 1.",
      "value": 25,
      "detachment": "Warpstrike Champions",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-tzagulla",
      "detachmentId": "warpstrike-champions",
      "id": "enhancement-tzagulla",
      "points": 25,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "chaos-space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "tzagulla",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/chaos-space-marines",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "chaos-space-marines"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({
  "enhancement-touched-by-the-warp": {
    "title": "Touched by the Warp",
    "text": "Saturated with empyric energies, this dark champion has spontaneously manifested the mutant powers of a true psyker. HERETIC ASTARTES model only (excluding KHORNE models). ▪ This model has PSYKER. ▪ This model’s weapons have [PSYCHIC].",
    "value": 10,
    "detachment": "Cabal of Chaos",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-touched-by-the-warp",
    "detachmentId": "cabal-of-chaos"
  },
  "enhancement-conduit-of-chaos": {
    "title": "Conduit of Chaos",
    "text": "Like a lightning rod, this blessed fiend attracts the arcane energies of the Warp, unleashing them in a crackling storm of mutating horror as it plunges into the foe. HERETIC ASTARTES DAEMON model only (excluding KHORNE models). This model’s melee attacks have [LANCE].",
    "value": 20,
    "detachment": "Cabal of Chaos",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-conduit-of-chaos",
    "detachmentId": "cabal-of-chaos"
  },
  "enhancement-amulet-of-tainted-vigour": {
    "title": "Amulet of Tainted Vigour",
    "text": "DARK APOSTLE model only. In your Command phase, you can return up to D3 destroyed DAMNED models (excluding CHARACTER models) to the bearer's unit.",
    "value": 20,
    "detachment": "Chaos Cult",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-amulet-of-tainted-vigour",
    "detachmentId": "chaos-cult"
  },
  "enhancement-cultists-brand": {
    "title": "Cultist's Brand",
    "text": "DARK APOSTLE or DAMNED model only. If every other model in the bearer's unit (excluding Dark Disciples) is DAMNED, you can re-roll Advance and Charge rolls made for the bearer's unit.",
    "value": 30,
    "detachment": "Chaos Cult",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-cultists-brand",
    "detachmentId": "chaos-cult"
  },
  "enhancement-incendiary-goad": {
    "title": "Incendiary Goad",
    "text": "DARK APOSTLE or DAMNED model only. While the bearer's unit is below its Starting Strength, add 1 to the Strength characteristic of melee weapons equipped by DAMNED models in that unit, and while that unit is Below Half-strength, add 1 to the Attacks characteristic of those weapons as well.",
    "value": 25,
    "detachment": "Chaos Cult",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-incendiary-goad",
    "detachmentId": "chaos-cult"
  },
  "enhancement-warped-foresight": {
    "title": "Warped Foresight",
    "text": "DARK APOSTLE or DAMNED model only. While the bearer is leading a unit with the Scouts 6\" ability, every model in the bearer's unit has the Scouts 6\" ability.",
    "value": 10,
    "detachment": "Chaos Cult",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-warped-foresight",
    "detachmentId": "chaos-cult"
  },
  "enhancement-surgical-precision": {
    "title": "Surgical Precision",
    "text": "A student of Fabius Bile’s dread craft, this champion of Chaos wields their weapons with the same precision a master chirurgeon would wield a scalpel. Heretic Astartes model (excluding Damned models) only. The bearer’s melee weapons have the [PRECISION] ability.",
    "value": 10,
    "detachment": "Creations of Bile",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-surgical-precision",
    "detachmentId": "creations-of-bile"
  },
  "enhancement-living-carapace": {
    "title": "Living Carapace",
    "text": "With a thought, the wearer can compel this bioarmour to thicken, further increasing their formidable resistance. Chaos Lord model only. Add 1 to the bearer’s Wounds characteristic and the bearer has the Feel No Pain 5+ ability.",
    "value": 15,
    "detachment": "Creations of Bile",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-living-carapace",
    "detachmentId": "creations-of-bile"
  },
  "enhancement-helm-of-all-seeing": {
    "title": "Helm of All-seeing",
    "text": "This baroque helm sports numerous additional sensors, requiring various disfiguring organ augmentations to process the information. Heretic Astartes Infantry model (excluding Damned models) only. Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of the bearer.",
    "value": 25,
    "detachment": "Creations of Bile",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-helm-of-all-seeing",
    "detachmentId": "creations-of-bile"
  },
  "enhancement-prime-test-subject": {
    "title": "Prime Test Subject",
    "text": "Only the strongest will survive the rampant cell transformations associated with Bile’s mysterious bioalchemy. Heretic Astartes Infantry model (excluding Damned models) only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer. Each time the bearer makes a melee attack, you can re‑roll the Hit roll.",
    "value": 35,
    "detachment": "Creations of Bile",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-prime-test-subject",
    "detachmentId": "creations-of-bile"
  },
  "enhancement-wyredjinn": {
    "title": "Wyredjinn",
    "text": "A repulsive daemon imp of Vashtorr, this incorporeal data‑familiar flits through vox‑channels and sensor suites, stealing data for its master. Heretic Astartes model only (excluding Damned models). At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result if the bearer is within range of an objective marker you control: on a 4+, you gain 1CP.",
    "value": 25,
    "detachment": "Cult of the Arkifane",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-wyredjinn",
    "detachmentId": "cult-of-the-arkifane"
  },
  "enhancement-cybinfernal-font": {
    "title": "Cybinfernal Font",
    "text": "This warp‑forged augmetic channels daemonic energies through its bearer and into those they lead, spawning biomechanoid mutation and supernatural resilience. Heretic Astartes model only (excluding Damned models). Models in the bearer’s unit have the Soul Forge keyword.",
    "value": 20,
    "detachment": "Cult of the Arkifane",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-cybinfernal-font",
    "detachmentId": "cult-of-the-arkifane"
  },
  "enhancement-mark-of-the-soul-forges": {
    "title": "Mark of the Soul Forges",
    "text": "This burning rune attests to the – perhaps unwise – pact its bearer has struck with the Arkifane in return for enhanced martial might and lethality. Heretic Astartes model only (excluding Damned models). Each time the bearer makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
    "value": 20,
    "detachment": "Cult of the Arkifane",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-mark-of-the-soul-forges",
    "detachmentId": "cult-of-the-arkifane"
  },
  "enhancement-crown-of-worms": {
    "title": "Crown of Worms",
    "text": "This parasitic helm bestows the ability to conjure daemonic nematodes akin to those manifested by the Arkifane himself. These burrowing entities can reknit faltering war machines or gnaw upon such vehicles’ sanity at the wearer’s command. Warpsmith model only. Add 3” to the range of the bearer’s Warpsmith, Master of Mechanisms and Enrage Machine Spirits abilities.",
    "value": 15,
    "detachment": "Cult of the Arkifane",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-crown-of-worms",
    "detachmentId": "cult-of-the-arkifane"
  },
  "enhancement-cursed-fang": {
    "title": "Cursed Fang",
    "text": "HERETIC ASTARTES INFANTRY model only. Improve the Armour Penetration characteristic of the bearer's melee weapons by 1, and the bearer's melee weapons have the [PRECISION] ability.",
    "value": 10,
    "detachment": "Deceptors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-cursed-fang",
    "detachmentId": "deceptors"
  },
  "enhancement-falsehood": {
    "title": "Falsehood",
    "text": "CHAOS LORD model only (excluding TERMINATOR and JUMP PACK models). In the Declare Battle Formations step, you can set the bearer up in Reserves instead of setting it up on the battlefield. If you do, in one of your Movement phases, you can select one model in a friendly LEGIONARIES or CHOSEN unit that has two or more models remaining and is on the battlefield (excluding Attached units). The selected model is destroyed (ignoring any rules that are triggered when a model is destroyed) and the bearer is set up as close as possible to where that model was destroyed and only within Engagement Range of any enemy units if the destroyed model was within Engagement Range of those units. The bearer now attaches to that unit as its Leader.",
    "value": 10,
    "detachment": "Deceptors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-falsehood",
    "detachmentId": "deceptors"
  },
  "enhancement-shroud-of-obfuscation": {
    "title": "Shroud of Obfuscation",
    "text": "HERETIC ASTARTES INFANTRY model only. The bearer has the Stealth and Lone Operative abilities.",
    "value": 15,
    "detachment": "Deceptors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-shroud-of-obfuscation",
    "detachmentId": "deceptors"
  },
  "enhancement-soul-link": {
    "title": "Soul Link",
    "text": "HERETIC ASTARTES INFANTRY model only. At the start of your Command phase, you can select one other HERETIC ASTARTES INFANTRY CHARACTER model from your army (excluding EPIC HEROES). Until the start of your next Command phase, the bearer gains the PSYKER keyword, and replace the bearer's datasheet abilities with the datasheet abilities of the CHARACTER you selected.",
    "value": 5,
    "detachment": "Deceptors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-soul-link",
    "detachmentId": "deceptors"
  },
  "enhancement-pact-of-destruction": {
    "title": "Pact of Destruction",
    "text": "There are those daemonic entities within the Warp that are willing to offer their boons to any who will wreak wholesale devastation in their name, at least for as long as the carnage holds their capricious attention. WARPSMITH model only. ▪ When this unit uses its Dark Pacts ability, this unit can re-roll Leadership rolls. ▪ In your Shooting phase, when this unit has shot, if this unit used its Dark Pacts ability and if those attacks destroyed an enemy model, this unit heals 3 wounds.",
    "value": 15,
    "detachment": "Devotees of Destruction",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-pact-of-destruction",
    "detachmentId": "devotees-of-destruction"
  },
  "enhancement-eye-of-oblivion": {
    "title": "Eye of Oblivion",
    "text": "This vile technodaemonic parasite nests within the emptied eye socket of its host, driving filament tendrils deep into their brain and feeding on their animus in exchange for revealing the secrets of its supernatural vision. WARPSMITH model only. When this unit is selected to shoot, select one enemy unit within 24\" of this unit. That enemy unit has +6\" detection range until this unit has shot.",
    "value": 20,
    "detachment": "Devotees of Destruction",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eye-of-oblivion",
    "detachmentId": "devotees-of-destruction"
  },
  "enhancement-eater-of-dread": {
    "title": "Eater of Dread",
    "text": "HERETIC ASTARTES model only. At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result for each Battle-shocked enemy unit that is on the battlefield: on a 5+, you gain 1CP.",
    "value": 15,
    "detachment": "Dread Talons",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eater-of-dread",
    "detachmentId": "dread-talons"
  },
  "enhancement-nights-shroud": {
    "title": "Night's Shroud",
    "text": "CHAOS LORD model only. TERMINATOR models are excluded. Models in the bearer's unit have the Stealth ability.",
    "value": 10,
    "detachment": "Dread Talons",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-nights-shroud",
    "detachmentId": "dread-talons"
  },
  "enhancement-dread-talons-warp-fuelled-thrusters": {
    "title": "Warp-fuelled Thrusters",
    "text": "JUMP PACK CHAOS LORD model only. At the end of your opponent's turn, if the bearer's unit is not within Engagement Range of one or more enemy units, you can remove the bearer's unit from the battlefield and place it into Strategic Reserves.",
    "value": 20,
    "detachment": "Dread Talons",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-dread-talons-warp-fuelled-thrusters",
    "detachmentId": "dread-talons"
  },
  "enhancement-willbreaker": {
    "title": "Willbreaker",
    "text": "HERETIC ASTARTES model only. In the Fight phase, after the bearer has made its attacks, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test.",
    "value": 10,
    "detachment": "Dread Talons",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-willbreaker",
    "detachmentId": "dread-talons"
  },
  "enhancement-bastion-plate": {
    "title": "Bastion Plate",
    "text": "CHAOS LORD model only. JUMP PACK models are excluded. Once per battle round, when a saving throw is failed for the bearer's unit, you can change the Damage characteristic of that attack to 0.",
    "value": 10,
    "detachment": "Fellhammer Siege-host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-bastion-plate",
    "detachmentId": "fellhammer-siege-host"
  },
  "enhancement-iron-artifice": {
    "title": "Iron Artifice",
    "text": "HERETIC ASTARTES INFANTRY model only. The bearer's weapons have the [ANTI-VEHICLE 4+] and [ANTI-FORTIFICATION 4+] abilities.",
    "value": 10,
    "detachment": "Fellhammer Siege-host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-iron-artifice",
    "detachmentId": "fellhammer-siege-host"
  },
  "enhancement-ironbound-enmity": {
    "title": "Ironbound Enmity",
    "text": "HERETIC ASTARTES model only. Each time the bearer makes an attack while within range of an objective marker, add 1 to the Wound roll.",
    "value": 15,
    "detachment": "Fellhammer Siege-host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-ironbound-enmity",
    "detachmentId": "fellhammer-siege-host"
  },
  "enhancement-warp-tracer": {
    "title": "Warp Tracer",
    "text": "HERETIC ASTARTES model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover.",
    "value": 20,
    "detachment": "Fellhammer Siege-host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-warp-tracer",
    "detachmentId": "fellhammer-siege-host"
  },
  "enhancement-voice-of-the-tyrant": {
    "title": "Voice of the Tyrant",
    "text": "This champion is a valued commander, and speaks with the authority of Huron himself. Heretic Astartes model only (excluding Damned models). The bearer’s unit has both abilities from the Tyrannical Motivation Detachment rule.",
    "value": 25,
    "detachment": "HURON’S MARAUDERS",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-voice-of-the-tyrant",
    "detachmentId": "huron-s-marauders"
  },
  "enhancement-raid-leader": {
    "title": "Raid Leader",
    "text": "Rapid mechanised assaults are a preferred tactic of the Red Corsairs, and this champion excels at them. Heretic Astartes model only (excluding Damned models). Each time the bearer’s unit is set up after disembarking from a Transport that has made a Normal move this turn, the bearer’s unit is still eligible to declare a charge.",
    "value": 20,
    "detachment": "HURON’S MARAUDERS",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-raid-leader",
    "detachmentId": "huron-s-marauders"
  },
  "enhancement-dread-reputation": {
    "title": "Dread Reputation",
    "text": "Such is this warrior’s infamy that their mere presence on the field of battle can overwhelm the foe with tyrannical intimidation. Heretic Astartes model only (excluding Damned models). Each time the bearer’s unit is set up on the battlefield, each enemy unit within 6” of the bearer’s unit (or within 12” if the bearer’s unit was set up using the Deep Strike ability) takes a Battle‑shock test.",
    "value": 25,
    "detachment": "HURON’S MARAUDERS",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-dread-reputation",
    "detachmentId": "huron-s-marauders"
  },
  "enhancement-eager-for-bloodshed": {
    "title": "Eager for Bloodshed",
    "text": "Desperate to lock weapons with the foe, this warrior is always at the fore, fighting in the vanguard of Huron Blackheart’s forces. Heretic Astartes model only. The bearer has the Infiltrators ability.",
    "value": 30,
    "detachment": "HURON’S MARAUDERS",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eager-for-bloodshed",
    "detachmentId": "huron-s-marauders"
  },
  "enhancement-shadowcowl-talisman": {
    "title": "Shadowcowl Talisman",
    "text": "Worked with diabolical incantations of occlusion, wound about with subtle enchantments, this onyx disc draws a penumbral aura about the bearer that hides him from the eyes of his prey. CHAOS LORD WITH JUMP PACK model only. This unit has 5+ InSv.",
    "value": 20,
    "detachment": "Murdertalon Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-shadowcowl-talisman",
    "detachmentId": "murdertalon-raiders"
  },
  "enhancement-pact-of-cursed-pinions": {
    "title": "Pact of Cursed Pinions",
    "text": "Sharing their mortal frame with a predatory possessor daemon lends this dark champion additional might and swiftness, though it may yet damn them for eternity. CHAOS LORD WITH JUMP PACK model only. ▪ This model has DAEMON. ▪ This model’s melee attacks have +1 A.",
    "value": 20,
    "detachment": "Murdertalon Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-pact-of-cursed-pinions",
    "detachmentId": "murdertalon-raiders"
  },
  "enhancement-greyveil-hex": {
    "title": "Greyveil Hex",
    "text": "Incised into this warrior’s battleplate is a runic curse which dims his form in the minds of his prey, until all they perceive is a mass of talons and shadow. Chaos Lord model only. Models in the bearer’s unit have the Stealth ability. While the bearer’s unit is within range of one or more objective markers you control, that unit can only be selected as the target of a ranged attack if the attacking model is within 18\".",
    "value": 25,
    "detachment": "Nightmare Hunt",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-greyveil-hex",
    "detachmentId": "nightmare-hunt"
  },
  "enhancement-nightmare-hunt-warp-fuelled-thrusters": {
    "title": "Warp-fuelled Thrusters",
    "text": "Bathed in warp energies, this Lord’s jump pack tears rifts in reality, allowing them to withdraw at a moment’s notice. Chaos Lord Jump Pack model only. At the end of your opponent’s Fight phase, if the bearer’s unit is not within Engagement Range of one or more enemy units, you can remove the bearer’s unit from the battlefield and place it into Strategic Reserves.",
    "value": 20,
    "detachment": "Nightmare Hunt",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-nightmare-hunt-warp-fuelled-thrusters",
    "detachmentId": "nightmare-hunt"
  },
  "enhancement-terrorglut-parasite": {
    "title": "Terrorglut Parasite",
    "text": "A daemonic pact sealed in fear and dread allowed this entity to squirm into reality. Coiled tightly and invisibly about a warrior’s soul, the being wears away at the sanity of those he faces and feasts on their terror. Heretic Astartes model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle‑shock test, subtracting 1 from the result.",
    "value": 20,
    "detachment": "Nightmare Hunt",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-terrorglut-parasite",
    "detachmentId": "nightmare-hunt"
  },
  "enhancement-sorrowscent-vulture": {
    "title": "Sorrowscent Vulture",
    "text": "This champion demands to be in the vanguard of the hunt, their eagerness to inflict suffering manifesting in a daring lunge towards enemy lines. Chaos Lord Jump Pack model only. Models in the bearer’s unit have the Scouts 6\" ability.",
    "value": 35,
    "detachment": "Nightmare Hunt",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-sorrowscent-vulture",
    "detachmentId": "nightmare-hunt"
  },
  "enhancement-eye-of-tzeentch": {
    "title": "Eye of Tzeentch",
    "text": "HERETIC ASTARTES TZEENTCH model only. Each time the bearer's unit makes a Dark Pact and does not fail the resulting Leadership test, if the result of that test was 8 or more, you gain 1CP.",
    "value": 15,
    "detachment": "Pactbound Zealots",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eye-of-tzeentch",
    "detachmentId": "pactbound-zealots"
  },
  "enhancement-intoxicating-elixir": {
    "title": "Intoxicating Elixir",
    "text": "HERETIC ASTARTES SLAANESH model only. The bearer has the Feel No Pain 5+ ability. Each time the bearer shoots or fights, if the bearer's unit made a Dark Pact this phase and did not fail the resulting Leadership test, after the bearer has resolved those attacks, select one enemy unit that was hit by one or more of those attacks; that enemy unit must take a Battle-shock test.",
    "value": 15,
    "detachment": "Pactbound Zealots",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-intoxicating-elixir",
    "detachmentId": "pactbound-zealots"
  },
  "enhancement-orbs-of-unlife": {
    "title": "Orbs of Unlife",
    "text": "HERETIC ASTARTES NURGLE model only. At the end of the Fight phase, roll one D6 for every enemy unit within 3\" of the bearer, adding 1 to the result if the bearer's unit made a Dark Pact that phase and did not fail the resulting Leadership test: on a 4+, that enemy unit suffers D3 mortal wounds.",
    "value": 15,
    "detachment": "Pactbound Zealots",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-orbs-of-unlife",
    "detachmentId": "pactbound-zealots"
  },
  "enhancement-talisman-of-burning-blood": {
    "title": "Talisman of Burning Blood",
    "text": "HERETIC ASTARTES KHORNE model only. Add 1 to the Attacks and Strength characteristics of the bearer's melee weapons. Each time the bearer's unit makes a Dark Pact and does not fail the resulting Leadership test, roll one D3: until the end of the phase, add the result to the Attacks and Strength characteristics of the bearer's melee weapons instead.",
    "value": 15,
    "detachment": "Pactbound Zealots",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-talisman-of-burning-blood",
    "detachmentId": "pactbound-zealots"
  },
  "enhancement-despots-claim": {
    "title": "Despot's Claim",
    "text": "HERETIC ASTARTES model only. At the start of your Command phase, if the bearer is on the battlefield, roll one D6, adding 1 to the result if the bearer is wholly within 12\" of your opponent's deployment zone: on a 5+, you gain 1CP.",
    "value": 15,
    "detachment": "Renegade Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-despots-claim",
    "detachmentId": "renegade-raiders"
  },
  "enhancement-dread-reaver": {
    "title": "Dread Reaver",
    "text": "HERETIC ASTARTES model only. Each time the bearer makes a melee attack, if the bearer is wholly within 12\" of your opponent's deployment zone, you can re-roll the Hit roll and you can re-roll the Wound roll.",
    "value": 15,
    "detachment": "Renegade Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-dread-reaver",
    "detachmentId": "renegade-raiders"
  },
  "enhancement-mark-of-the-hound": {
    "title": "Mark of the Hound",
    "text": "HERETIC ASTARTES model only. Models in the bearer's unit have the Scouts 6\" ability.",
    "value": 25,
    "detachment": "Renegade Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-mark-of-the-hound",
    "detachmentId": "renegade-raiders"
  },
  "enhancement-tyrants-lash": {
    "title": "Tyrant's Lash",
    "text": "HERETIC ASTARTES model only. You can re-roll Advance rolls made for the bearer's unit, and the bearer's unit is eligible to shoot in a turn in which it Fell Back.",
    "value": 20,
    "detachment": "Renegade Raiders",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-tyrants-lash",
    "detachmentId": "renegade-raiders"
  },
  "enhancement-weaponised-hatred": {
    "title": "Weaponised Hatred",
    "text": "This champion’s bitterness has been tempered like a blade, and is wielded with the brutal efficacy to match. Heretic Astartes model only. Once per battle round, after your Vendetta target is destroyed, if the bearer is on the battlefield, you can select one enemy unit visible to the bearer. That enemy unit becomes your Vendetta target until you select a new one.",
    "value": 35,
    "detachment": "Renegade Warband",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-weaponised-hatred",
    "detachmentId": "renegade-warband"
  },
  "enhancement-eyes-of-the-hunter": {
    "title": "Eyes of the Hunter",
    "text": "Immersion within the mutagenic energies of the Warp has wrought changes upon this warrior’s eyes. Slit pupils and warp sight enable them to pick out their targets with unerring accuracy. Heretic Astartes model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability.",
    "value": 15,
    "detachment": "Renegade Warband",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eyes-of-the-hunter",
    "detachmentId": "renegade-warband"
  },
  "enhancement-fratricidal-trophies": {
    "title": "Fratricidal Trophies",
    "text": "The trophy racks of this warrior’s Terminator armour bear the skulls of former battle‑brothers slain by his own hand. The warriors that fight at his side strive their hardest to avoid sharing the fate of their former comrades. Heretic Astartes Terminator model only. In a turn in which the bearer’s unit chose to Default to Doctrine, until the end of the turn, each time a model in this unit makes an attack, you can re‑roll the Hit roll.",
    "value": 5,
    "detachment": "Renegade Warband",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-fratricidal-trophies",
    "detachmentId": "renegade-warband"
  },
  "enhancement-empyric-symbiote": {
    "title": "Empyric Symbiote",
    "text": "This champion of ruin has been bonded with a warp‑spawned symbiote. This malefic companion’s predatory senses sense the quickest route to the enemy. Heretic Astartes model only. Add 1 to Advance and Charge rolls made for the bearer’s unit.",
    "value": 15,
    "detachment": "Renegade Warband",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-empyric-symbiote",
    "detachmentId": "renegade-warband"
  },
  "enhancement-forges-blessing": {
    "title": "Forge's Blessing",
    "text": "HERETIC ASTARTES model only. In your Command phase, select one friendly HERETIC ASTARTES VEHICLE unit within 12\" of the bearer. Until the start of your next Command phase, that unit has the Feel No Pain 6+ ability.",
    "value": 20,
    "detachment": "Soulforged Warpack",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-forges-blessing",
    "detachmentId": "soulforged-warpack"
  },
  "enhancement-invigorated-mechatendrils": {
    "title": "Invigorated Mechatendrils",
    "text": "WARPSMITH model only. Add 4\" to the bearer's Move characteristic.",
    "value": 15,
    "detachment": "Soulforged Warpack",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-invigorated-mechatendrils",
    "detachmentId": "soulforged-warpack"
  },
  "enhancement-tempting-addendum": {
    "title": "Tempting Addendum",
    "text": "HERETIC ASTARTES model only. Each time a HERETIC ASTARTES DAEMON VEHICLE unit from your army invokes its contract while within 3\" of the bearer: if it suffers one or more mortal wounds as a result of that Dark Pact, add 1 to the number of mortal wounds it suffers; until the end of the phase, each time a model in that unit makes an attack, you can re-roll the Hit roll.",
    "value": 40,
    "detachment": "Soulforged Warpack",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-tempting-addendum",
    "detachmentId": "soulforged-warpack"
  },
  "enhancement-soul-harvester": {
    "title": "Soul Harvester",
    "text": "HERETIC ASTARTES model only. While the bearer is on the battlefield, each time an enemy unit within 12\" of the bearer is destroyed, roll one D6: on a 5+, you gain 1CP.",
    "value": 15,
    "detachment": "Soulforged Warpack",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-soul-harvester",
    "detachmentId": "soulforged-warpack"
  },
  "enhancement-eager-for-vengeance": {
    "title": "Eager for Vengeance",
    "text": "HERETIC ASTARTES model only. Excludes DAMNED models. The bearer's unit is eligible to shoot and declare a charge in a turn in which it Fell Back. Each time a model in the bearer's unit makes an attack that targets your focus of hatred, if the bearer's unit Fell Back this turn, add 1 to the Hit roll, and each time you select your focus of hatred as a target of that unit's charge, add 1 to the Charge roll.",
    "value": 20,
    "detachment": "Veterans of the Long War",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eager-for-vengeance",
    "detachmentId": "veterans-of-the-long-war"
  },
  "enhancement-eye-of-abaddon": {
    "title": "Eye of Abaddon",
    "text": "HERETIC ASTARTES model only. Excludes DAMNED models. While the bearer is on the battlefield, each time your focus of hatred is destroyed, roll one D6: on a 4+, you gain 1CP.",
    "value": 15,
    "detachment": "Veterans of the Long War",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eye-of-abaddon",
    "detachmentId": "veterans-of-the-long-war"
  },
  "enhancement-mark-of-legend": {
    "title": "Mark of Legend",
    "text": "HERETIC ASTARTES model only. Excludes DAMNED models. Once per turn, you can re-roll one Hit roll, one Wound roll or one saving throw made for the bearer.",
    "value": 10,
    "detachment": "Veterans of the Long War",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-mark-of-legend",
    "detachmentId": "veterans-of-the-long-war"
  },
  "enhancement-warmasters-gift": {
    "title": "Warmaster's Gift",
    "text": "CHAOS LORD model only. Each time the bearer makes an attack that targets your focus of hatred, an unmodified successful Wound roll of 5+ scores a Critical Wound.",
    "value": 15,
    "detachment": "Veterans of the Long War",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-warmasters-gift",
    "detachmentId": "veterans-of-the-long-war"
  },
  "enhancement-infernal-fulgurite": {
    "title": "Infernal Fulgurite",
    "text": "This strange artefact was recovered from the storm‑lashed daemon world of Utrexismia. A shard of warp lightning frozen forever in reality, it serves as a potent focus for teleportation. Heretic Astartes model only (excluding Damned models). Once per battle, you can target the bearer’s unit with the Rapid Ingress Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
    "value": 20,
    "detachment": "Warpstrike Champions",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-infernal-fulgurite",
    "detachmentId": "warpstrike-champions"
  },
  "enhancement-eye-of-the-warp": {
    "title": "Eye of the Warp",
    "text": "This burning gem allows its bearer to see through the veil between realspace and the Warp, and so to react instantly upon piercing that veil. Heretic Astartes model with the Deep Strike ability only. Each time the bearer’s unit is set up on the battlefield, until the end of the turn, you can re‑roll Charge rolls made for that unit.",
    "value": 15,
    "detachment": "Warpstrike Champions",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-eye-of-the-warp",
    "detachmentId": "warpstrike-champions"
  },
  "enhancement-akshurs-binding-runes": {
    "title": "Akshur’s Binding Runes",
    "text": "Living runes that crawl from an ancient tome onto living skin, these sigils anchor their host to realspace even when they are immersed in the Empyrean. Heretic Astartes model with the Deep Strike ability only. The bearer’s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
    "value": 20,
    "detachment": "Warpstrike Champions",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-akshurs-binding-runes",
    "detachmentId": "warpstrike-champions"
  },
  "enhancement-tzagulla": {
    "title": "Tzagulla",
    "text": "This shape‑shifting daemon weapon feeds upon the presence of warp energy to empower both itself and its wielder. Heretic Astartes model with the Deep Strike ability only. Improve the Attacks, Strength and Armour Penetration characteristics of the bearer’s weapons by 1. In addition, each time the bearer’s unit is set up on the battlefield from Reserves, until the end of the turn, improve the Damage characteristic of the bearer’s weapons by 1.",
    "value": 25,
    "detachment": "Warpstrike Champions",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-tzagulla",
    "detachmentId": "warpstrike-champions"
  }
});
