window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "tyranids",
    "title": "Tyranids",
    "factionKeyword": "TYRANIDS",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-gargoyles",
      "title": "Gargoyles",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Battleline",
        "Infantry",
        "Fly",
        "Gargoyles",
        "Great Devourer",
        "Tyranids",
        "Endless Multitude",
        "Vanguard Invader"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-winged-tyranid-prime",
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
              "unitId": "unit-winged-tyranid-prime",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "3",
          "Sv": "6+",
          "W": "1",
          "Ld": "8+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-winged-swarm",
            "sectionId": "tyranids-ability-winged-swarm",
            "title": "Winged Swarm",
            "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge.",
            "sourceUnitId": "unit-gargoyles"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-gargoyles"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-gargoyles"
          }
        ],
        "models": [
          {
            "id": "unit-gargoyles-model-gargoyles",
            "title": "Gargoyles",
            "aliases": [
              "Gargoyles"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-gargoyles-selection-blinding-venom",
            "title": "Blinding venom",
            "aliases": [
              "Blinding venom"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gargoyles-profile-blinding-venom-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gargoyles-selection-fleshborer",
            "title": "Fleshborer",
            "aliases": [
              "Fleshborer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gargoyles-profile-fleshborer-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-gargoyles-profile-blinding-venom-melee",
            "title": "Blinding venom",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-gargoyles-selection-blinding-venom"
            ]
          },
          {
            "id": "unit-gargoyles-profile-fleshborer-ranged-2",
            "title": "Fleshborer",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-gargoyles-selection-fleshborer"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hormagaunts",
      "title": "Hormagaunts",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Great Devourer",
        "Endless Multitude",
        "Hormagaunts",
        "Tyranids"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tyranid-prime-with-lash-whip",
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
              "unitId": "unit-tyranid-prime-with-lash-whip",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "3",
          "Sv": "5+",
          "W": "1",
          "Ld": "8+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-bounding-leap",
            "sectionId": "tyranids-ability-bounding-leap",
            "title": "Bounding Leap",
            "text": "This unit is eligible to declare a charge in a turn in which it Advanced.",
            "sourceUnitId": "unit-hormagaunts"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-hormagaunts"
          }
        ],
        "models": [
          {
            "id": "unit-hormagaunts-model-10-20-hormagaunts",
            "title": "10-20 Hormagaunts",
            "aliases": [
              "10-20 Hormagaunts"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hormagaunts-selection-hormagaunt-talons",
            "title": "Hormagaunt talons",
            "aliases": [
              "Hormagaunt talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hormagaunts-profile-hormagaunt-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hormagaunts-profile-hormagaunt-talons-melee",
            "title": "Hormagaunt talons",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hormagaunts-selection-hormagaunt-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-termagants",
      "title": "Termagants",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Battleline",
        "Infantry",
        "Great Devourer",
        "Tyranids",
        "Endless Multitude",
        "Termagants"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tyranid-prime-with-lash-whip",
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
              "unitId": "unit-tyranid-prime-with-lash-whip",
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
          "Ld": "8+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-skulking-horrors",
            "sectionId": "tyranids-ability-skulking-horrors",
            "title": "Skulking Horrors",
            "text": "In your opponent's Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\".",
            "sourceUnitId": "unit-termagants"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-termagants"
          }
        ],
        "models": [
          {
            "id": "unit-termagants-model-10-20-termagants",
            "title": "10-20 Termagants",
            "aliases": [
              "10-20 Termagants"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-termagants-selection-fleshborer",
            "title": "Fleshborer",
            "aliases": [
              "Fleshborer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-fleshborer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-termagant-spinefists",
            "title": "Termagant spinefists",
            "aliases": [
              "Termagant spinefists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-termagant-spinefists-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-termagant-devourer",
            "title": "Termagant devourer",
            "aliases": [
              "Termagant devourer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-termagant-devourer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-chitinous-claws-and-teeth-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-shardlauncher",
            "title": "Shardlauncher",
            "aliases": [
              "Shardlauncher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-shardlauncher-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-spike-rifle",
            "title": "Spike rifle",
            "aliases": [
              "Spike rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-spike-rifle-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-termagants-selection-strangleweb",
            "title": "Strangleweb",
            "aliases": [
              "Strangleweb"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-termagants-profile-strangleweb-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-termagants-profile-fleshborer-ranged",
            "title": "Fleshborer",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-termagants-selection-fleshborer"
            ]
          },
          {
            "id": "unit-termagants-profile-termagant-spinefists-ranged-2",
            "title": "Termagant spinefists",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Pistol, Twin-linked",
            "sourceSelectionIds": [
              "unit-termagants-selection-termagant-spinefists"
            ]
          },
          {
            "id": "unit-termagants-profile-termagant-devourer-ranged-3",
            "title": "Termagant devourer",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-termagants-selection-termagant-devourer"
            ]
          },
          {
            "id": "unit-termagants-profile-chitinous-claws-and-teeth-melee-4",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-termagants-selection-chitinous-claws-and-teeth"
            ]
          },
          {
            "id": "unit-termagants-profile-shardlauncher-ranged-5",
            "title": "Shardlauncher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-termagants-selection-shardlauncher"
            ]
          },
          {
            "id": "unit-termagants-profile-spike-rifle-ranged-6",
            "title": "Spike rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-termagants-selection-spike-rifle"
            ]
          },
          {
            "id": "unit-termagants-profile-strangleweb-ranged-7",
            "title": "Strangleweb",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "N/A",
            "s": "2",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Devastating Wounds, Torrent",
            "sourceSelectionIds": [
              "unit-termagants-selection-strangleweb"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-broodlord",
      "title": "Broodlord",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Psyker",
        "Broodlord",
        "Tyranids",
        "Great Devourer",
        "Vanguard Invader",
        "Synapse"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-genestealers",
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
              "unitId": "unit-genestealers",
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
          "M": "8\"",
          "T": "5",
          "Sv": "4+",
          "W": "6",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-vicious-insight",
            "sectionId": "tyranids-ability-vicious-insight",
            "title": "Vicious Insight",
            "text": "While this model is leading a unit, weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.",
            "sourceUnitId": "unit-broodlord"
          },
          {
            "id": "tyranids-ability-hypnotic-gaze-psychic",
            "sectionId": "tyranids-ability-hypnotic-gaze-psychic",
            "title": "Hypnotic Gaze (Psychic)",
            "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-broodlord"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-broodlord"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 8\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-broodlord"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-broodlord"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-broodlord"
          }
        ],
        "models": [
          {
            "id": "unit-broodlord-model-broodlord",
            "title": "Broodlord",
            "aliases": [
              "Broodlord"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-broodlord-selection-broodlord-claws-and-talons",
            "title": "Broodlord Claws and Talons",
            "aliases": [
              "Broodlord Claws and Talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broodlord-profile-broodlord-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-broodlord-profile-broodlord-claws-and-talons-melee",
            "title": "Broodlord Claws and Talons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-broodlord-selection-broodlord-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hive-tyrant",
      "title": "Hive Tyrant",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Character",
        "Psyker",
        "Hive Tyrant",
        "Tyranids",
        "Great Devourer",
        "Synapse"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-tyrant-guard",
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
              "unitId": "unit-tyrant-guard",
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
          "M": "8\"",
          "T": "10",
          "Sv": "2+",
          "W": "10",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-onslaught-aura-psychic",
            "sectionId": "tyranids-ability-onslaught-aura-psychic",
            "title": "Onslaught (Aura, Psychic)",
            "text": "While a friendly TYRANIDS unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [ASSAULT] and [LETHAL HITS] abilities.",
            "sourceUnitId": "unit-hive-tyrant"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-hive-tyrant"
          },
          {
            "id": "tyranids-ability-will-of-the-hive-mind",
            "sectionId": "tyranids-ability-will-of-the-hive-mind",
            "title": "Will of the Hive Mind",
            "text": "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-hive-tyrant"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-hive-tyrant"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-hive-tyrant"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-hive-tyrant"
          }
        ],
        "models": [
          {
            "id": "unit-hive-tyrant-model-hive-tyrant",
            "title": "Hive Tyrant",
            "aliases": [
              "Hive Tyrant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hive-tyrant-selection-monstrous-bonesword-and-lash-whip",
            "title": "Monstrous bonesword and lash whip",
            "aliases": [
              "Monstrous bonesword and lash whip"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-tyrant-profile-monstrous-bonesword-and-lash-whip-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-tyrant-selection-heavy-venom-cannon",
            "title": "Heavy venom cannon",
            "aliases": [
              "Heavy venom cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-tyrant-profile-heavy-venom-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-tyrant-selection-stranglethorn-cannon",
            "title": "Stranglethorn cannon",
            "aliases": [
              "Stranglethorn cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-tyrant-profile-stranglethorn-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-tyrant-selection-monstrous-scything-talons",
            "title": "Monstrous scything talons",
            "aliases": [
              "Monstrous scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-tyrant-profile-monstrous-scything-talons-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hive-tyrant-profile-monstrous-bonesword-and-lash-whip-melee",
            "title": "Monstrous bonesword and lash whip",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-hive-tyrant-selection-monstrous-bonesword-and-lash-whip"
            ]
          },
          {
            "id": "unit-hive-tyrant-profile-heavy-venom-cannon-ranged-2",
            "title": "Heavy venom cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-hive-tyrant-selection-heavy-venom-cannon"
            ]
          },
          {
            "id": "unit-hive-tyrant-profile-stranglethorn-cannon-ranged-3",
            "title": "Stranglethorn cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "2+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-hive-tyrant-selection-stranglethorn-cannon"
            ]
          },
          {
            "id": "unit-hive-tyrant-profile-monstrous-scything-talons-melee-4",
            "title": "Monstrous scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-hive-tyrant-selection-monstrous-scything-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hyperadapted-raveners",
      "title": "Hyperadapted Raveners",
      "sourceBookId": "tyranids",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Vanguard Invader",
        "Burrowers",
        "Hyperadapted Raveners",
        "Tyranids",
        "Character",
        "Leader"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-raveners",
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
              "unitId": "unit-raveners",
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
          "M": "10\"",
          "T": "5",
          "Sv": "4+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-alpha-invader",
            "sectionId": "tyranids-ability-alpha-invader",
            "title": "Alpha Invader",
            "text": "Weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "tyranids-ability-hypersensory-array",
            "sectionId": "tyranids-ability-hypersensory-array",
            "title": "Hypersensory Array",
            "text": "Once per battle round, you can target this unit with the Rapid Ingress/Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do:\n- That use is -1 CP.\n- That use does not prevent any uses of that stratagem on other units this phase.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-hyperadapted-raveners"
          },
          {
            "id": "core-sustained-hits",
            "sectionId": "core-sustained-hits",
            "title": "Sustained Hits",
            "text": "This ability always takes the form [SUSTAINED HITS X]. Each time an attack made with a [SUSTAINED HITS] weapon results in a critical hit, that attack results in a number of additional hits on the target as denoted by X.\n *Example: An attack made with a [SUSTAINED HITS 2] weapon results in a critical hit. That attack therefore hits the target three times (once from the critical hit, and twice more from the [SUSTAINED HITS 2] ability).",
            "sourceUnitId": "unit-hyperadapted-raveners"
          }
        ],
        "models": [
          {
            "id": "unit-hyperadapted-raveners-model-ravener-prime",
            "title": "Ravener Prime",
            "aliases": [
              "Ravener Prime"
            ]
          },
          {
            "id": "unit-hyperadapted-raveners-model-raveners-2",
            "title": "Raveners",
            "aliases": [
              "Raveners"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hyperadapted-raveners-selection-prime-claws-and-talons",
            "title": "Prime claws and talons",
            "aliases": [
              "Prime claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hyperadapted-raveners-profile-prime-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hyperadapted-raveners-selection-ravener-heavy-claws-and-talons",
            "title": "Ravener heavy claws and talons",
            "aliases": [
              "Ravener heavy claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hyperadapted-raveners-profile-ravener-heavy-claws-and-talons-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hyperadapted-raveners-selection-venom-bolt",
            "title": "Venom bolt",
            "aliases": [
              "Venom bolt"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hyperadapted-raveners-profile-venom-bolt-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hyperadapted-raveners-profile-prime-claws-and-talons-melee",
            "title": "Prime claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Monster 5+, Anti-Vehicle 5+, Twin-linked",
            "sourceSelectionIds": [
              "unit-hyperadapted-raveners-selection-prime-claws-and-talons"
            ]
          },
          {
            "id": "unit-hyperadapted-raveners-profile-ravener-heavy-claws-and-talons-melee-2",
            "title": "Ravener heavy claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Monster 5+, Anti-Vehicle 5+, Twin-linked",
            "sourceSelectionIds": [
              "unit-hyperadapted-raveners-selection-ravener-heavy-claws-and-talons"
            ]
          },
          {
            "id": "unit-hyperadapted-raveners-profile-venom-bolt-ranged-3",
            "title": "Venom bolt",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-hyperadapted-raveners-selection-venom-bolt"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-neurotyrant",
      "title": "Neurotyrant",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Monster",
        "Fly",
        "Psyker",
        "Great Devourer",
        "Neurotyrant",
        "Tyranids",
        "Synapse"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-neurogaunts",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-tyrant-guard",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-zoanthropes",
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
              "unitId": "unit-neurogaunts",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-tyrant-guard",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-zoanthropes",
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
          "T": "8",
          "Sv": "4+",
          "W": "9",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-node-lash-psychic",
            "sectionId": "tyranids-ability-node-lash-psychic",
            "title": "Node Lash (Psychic)",
            "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll. If the target is Battle-shocked, add 1 to the Wound roll as well.",
            "sourceUnitId": "unit-neurotyrant"
          },
          {
            "id": "tyranids-ability-psychic-terror-psychic",
            "sectionId": "tyranids-ability-psychic-terror-psychic",
            "title": "Psychic Terror (Psychic)",
            "text": "If one or more models from your army with this ability are on the battlefield when you unleash the Shadow in the Warp, subtract 1 from the Battle-shock test each enemy unit on the battlefield must take as a result.",
            "sourceUnitId": "unit-neurotyrant"
          },
          {
            "id": "tyranids-ability-neuroloids",
            "sectionId": "tyranids-ability-neuroloids",
            "title": "Neuroloids",
            "text": "In your Command phase, you can select up to two friendly TYRANIDS units within 18\" of this model’s unit. Until the start of your next Command phase, the selected units are always considered to be within Synapse Range of your army.\n\nDesigner’s Note: Place a Neuroloid token next to each selected unit to remind you.",
            "sourceUnitId": "unit-neurotyrant"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-neurotyrant"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-neurotyrant"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-neurotyrant"
          }
        ],
        "models": [
          {
            "id": "unit-neurotyrant-model-neurotyrant",
            "title": "Neurotyrant",
            "aliases": [
              "Neurotyrant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-neurotyrant-selection-neurotyrant-claws-and-lashes",
            "title": "Neurotyrant claws and lashes",
            "aliases": [
              "Neurotyrant claws and lashes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-neurotyrant-profile-neurotyrant-claws-and-lashes-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-neurotyrant-selection-psychic-scream",
            "title": "Psychic scream",
            "aliases": [
              "Psychic scream"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-neurotyrant-profile-psychic-scream-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-neurotyrant-profile-neurotyrant-claws-and-lashes-melee",
            "title": "Neurotyrant claws and lashes",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-neurotyrant-selection-neurotyrant-claws-and-lashes"
            ]
          },
          {
            "id": "unit-neurotyrant-profile-psychic-scream-ranged-2",
            "title": "Psychic scream",
            "mode": "ranged",
            "range": "18\"",
            "a": "2D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Psychic, Torrent",
            "sourceSelectionIds": [
              "unit-neurotyrant-selection-psychic-scream"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-parasite-of-mortrex",
      "title": "Parasite of Mortrex",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Parasite of Mortrex",
        "Character",
        "Fly",
        "Great Devourer",
        "Infantry",
        "Tyranids",
        "Vanguard Invader",
        "Synapse"
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
          "Sv": "4+",
          "W": "5",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-parasitic-infection",
            "sectionId": "tyranids-ability-parasitic-infection",
            "title": "Parasitic Infection",
            "text": "Each time an Infantry model is destroyed by an attack made with this model’s barbed ovipositor, after this model has finished making its attacks, you can add one new Ripper Swarms unit to your army consisting of D3 models and set it up within 3\" of this model. If you do, that Ripper Swarms unit can be set up within Engagement Range of the destroyed model’s unit (but not within Engagement Range of any other enemy units).",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "tyranids-ability-it-itches",
            "sectionId": "tyranids-ability-it-itches",
            "title": "It Itches!",
            "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. That enemy unit must take a Battle-shock test.",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-parasite-of-mortrex"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-parasite-of-mortrex"
          }
        ],
        "models": [
          {
            "id": "unit-parasite-of-mortrex-model-parasite-of-mortrex",
            "title": "Parasite of Mortrex",
            "aliases": [
              "Parasite of Mortrex"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-parasite-of-mortrex-selection-barbed-ovipositor",
            "title": "Barbed ovipositor",
            "aliases": [
              "Barbed ovipositor"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-parasite-of-mortrex-profile-barbed-ovipositor-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-parasite-of-mortrex-selection-clawed-limbs",
            "title": "Clawed limbs",
            "aliases": [
              "Clawed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-parasite-of-mortrex-profile-clawed-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-parasite-of-mortrex-profile-barbed-ovipositor-melee",
            "title": "Barbed ovipositor",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "2+",
            "s": "3",
            "ap": "-2",
            "d": "3",
            "abilities": "Anti-infantry 3+, Extra Attacks",
            "sourceSelectionIds": [
              "unit-parasite-of-mortrex-selection-barbed-ovipositor"
            ]
          },
          {
            "id": "unit-parasite-of-mortrex-profile-clawed-limbs-melee-2",
            "title": "Clawed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-parasite-of-mortrex-selection-clawed-limbs"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tervigon",
      "title": "Tervigon",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Monster",
        "Psyker",
        "Great Devourer",
        "Tervigon",
        "Tyranids",
        "Synapse"
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
          "T": "11",
          "Sv": "2+",
          "W": "16",
          "Ld": "7+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-spawn-termagants",
            "sectionId": "tyranids-ability-spawn-termagants",
            "title": "Spawn Termagants",
            "text": "In your Command phase, you can select one friendly TERMAGANTS unit within 6\" of this model and return up to D3+3 destroyed models to that unit. A TERMAGANTS unit cannot be selected for this ability more than once per phase.",
            "sourceUnitId": "unit-tervigon"
          },
          {
            "id": "tyranids-ability-brood-progenitor-aura-psychic",
            "sectionId": "tyranids-ability-brood-progenitor-aura-psychic",
            "title": "Brood Progenitor (Aura, Psychic)",
            "text": "While a friendly TERMAGANTS unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability.",
            "sourceUnitId": "unit-tervigon"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-tervigon"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tervigon"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-tervigon"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tervigon"
          }
        ],
        "models": [
          {
            "id": "unit-tervigon-model-tervigon",
            "title": "Tervigon",
            "aliases": [
              "Tervigon"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tervigon-selection-massive-scything-talons-strike",
            "title": "➤ Massive scything talons - strike",
            "aliases": [
              "➤ Massive scything talons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tervigon-profile-massive-scything-talons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tervigon-selection-massive-scything-talons-sweep",
            "title": "➤ Massive scything talons - sweep",
            "aliases": [
              "➤ Massive scything talons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tervigon-profile-massive-scything-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tervigon-selection-massive-crushing-claws",
            "title": "Massive crushing claws",
            "aliases": [
              "Massive crushing claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tervigon-profile-massive-crushing-claws-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tervigon-selection-stinger-salvoes",
            "title": "Stinger salvoes",
            "aliases": [
              "Stinger salvoes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tervigon-profile-stinger-salvoes-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tervigon-weapon-family-massive-scything-talons-selection",
            "title": "➤ Massive scything talons",
            "aliases": [
              "➤ Massive scything talons"
            ],
            "kind": "weapon",
            "familyId": "unit-tervigon-weapon-family-massive-scything-talons",
            "profileIds": [
              "unit-tervigon-profile-massive-scything-talons-strike-melee",
              "unit-tervigon-profile-massive-scything-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-tervigon-weapon-family-massive-scything-talons",
            "title": "➤ Massive scything talons",
            "aliases": [
              "➤ Massive scything talons"
            ],
            "profileIds": [
              "unit-tervigon-profile-massive-scything-talons-strike-melee",
              "unit-tervigon-profile-massive-scything-talons-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-tervigon-profile-massive-scything-talons-strike-melee",
            "title": "➤ Massive scything talons - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tervigon-selection-massive-scything-talons-strike",
              "unit-tervigon-weapon-family-massive-scything-talons-selection"
            ]
          },
          {
            "id": "unit-tervigon-profile-massive-scything-talons-sweep-melee-2",
            "title": "➤ Massive scything talons - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tervigon-selection-massive-scything-talons-sweep",
              "unit-tervigon-weapon-family-massive-scything-talons-selection"
            ]
          },
          {
            "id": "unit-tervigon-profile-massive-crushing-claws-melee-3",
            "title": "Massive crushing claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tervigon-selection-massive-crushing-claws"
            ]
          },
          {
            "id": "unit-tervigon-profile-stinger-salvoes-ranged-4",
            "title": "Stinger salvoes",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tervigon-selection-stinger-salvoes"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyranid-prime-with-lash-whip",
      "title": "Tyranid Prime with Lash Whip",
      "sourceBookId": "tyranids",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Tyranids",
        "Great Devourer",
        "Synapse",
        "Tyranid Prime with Lash Whip"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-hormagaunts",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-termagants",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-tyranid-warriors-with-melee-bio-weapons",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons",
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
              "unitId": "unit-hormagaunts",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-termagants",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-tyranid-warriors-with-melee-bio-weapons",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons",
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
          "M": "10\"",
          "T": "5",
          "Sv": "3+",
          "W": "6",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-alpha-warrior",
            "sectionId": "tyranids-ability-alpha-warrior",
            "title": "Alpha Warrior",
            "text": "Weapons equipped by models in this model’s unit have the [SUSTAINED HITS 1] ability.",
            "sourceUnitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "id": "tyranids-ability-aggressive-leader-beast",
            "sectionId": "tyranids-ability-aggressive-leader-beast",
            "title": "Aggressive Leader-beast",
            "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed by those attacks, this unit can make a surge move of up to D6\".",
            "sourceUnitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-tyranid-prime-with-lash-whip"
          }
        ],
        "models": [
          {
            "id": "unit-tyranid-prime-with-lash-whip-model-tyranid-prime-with-lash-whip",
            "title": "Tyranid Prime with Lash Whip",
            "aliases": [
              "Tyranid Prime with Lash Whip"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyranid-prime-with-lash-whip-selection-rending-claw",
            "title": "Rending claw",
            "aliases": [
              "Rending claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-prime-with-lash-whip-profile-rending-claw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-prime-with-lash-whip-selection-lash-whip",
            "title": "Lash whip",
            "aliases": [
              "Lash whip"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-prime-with-lash-whip-profile-lash-whip-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-prime-with-lash-whip-selection-scything-talons",
            "title": "Scything talons",
            "aliases": [
              "Scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-prime-with-lash-whip-profile-scything-talons-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyranid-prime-with-lash-whip-profile-rending-claw-melee",
            "title": "Rending claw",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyranid-prime-with-lash-whip-selection-rending-claw"
            ]
          },
          {
            "id": "unit-tyranid-prime-with-lash-whip-profile-lash-whip-melee-2",
            "title": "Lash whip",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-tyranid-prime-with-lash-whip-selection-lash-whip"
            ]
          },
          {
            "id": "unit-tyranid-prime-with-lash-whip-profile-scything-talons-melee-3",
            "title": "Scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyranid-prime-with-lash-whip-selection-scything-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-winged-hive-tyrant",
      "title": "Winged Hive Tyrant",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Character",
        "Psyker",
        "Winged Hive Tyrant",
        "Tyranids",
        "Great Devourer",
        "Fly",
        "Synapse",
        "Vanguard Invader",
        "Hive Tyrant"
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
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-paroxysm-psychic",
            "sectionId": "tyranids-ability-paroxysm-psychic",
            "title": "Paroxysm (Psychic)",
            "text": "At the start of the Fight phase, you can select one enemy unit within 12\" of and visible to this model and roll one D6: on a 1, this Psyker suffers D3 mortal wounds; on a 2+, until the end of the phase, subtract 1 from the Attacks characteristic of weapons equipped by models in that unit.",
            "sourceUnitId": "unit-winged-hive-tyrant"
          },
          {
            "id": "tyranids-ability-will-of-the-hive-mind",
            "sectionId": "tyranids-ability-will-of-the-hive-mind",
            "title": "Will of the Hive Mind",
            "text": "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-winged-hive-tyrant"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-winged-hive-tyrant"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-winged-hive-tyrant"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-winged-hive-tyrant"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-winged-hive-tyrant"
          }
        ],
        "models": [
          {
            "id": "unit-winged-hive-tyrant-model-winged-hive-tyrant",
            "title": "Winged Hive Tyrant",
            "aliases": [
              "Winged Hive Tyrant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-winged-hive-tyrant-selection-tyrant-talons",
            "title": "Tyrant talons",
            "aliases": [
              "Tyrant talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-hive-tyrant-profile-tyrant-talons-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-winged-hive-tyrant-selection-monstrous-scything-talons",
            "title": "Monstrous scything talons",
            "aliases": [
              "Monstrous scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-hive-tyrant-profile-monstrous-scything-talons-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-winged-hive-tyrant-selection-stranglethorn-cannon",
            "title": "Stranglethorn cannon",
            "aliases": [
              "Stranglethorn cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-hive-tyrant-profile-stranglethorn-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-winged-hive-tyrant-selection-heavy-venom-cannon",
            "title": "Heavy venom cannon",
            "aliases": [
              "Heavy venom cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-hive-tyrant-profile-heavy-venom-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-winged-hive-tyrant-selection-monstrous-bonesword-and-lash-whip",
            "title": "Monstrous bonesword and lash whip",
            "aliases": [
              "Monstrous bonesword and lash whip"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-hive-tyrant-profile-monstrous-bonesword-and-lash-whip-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-winged-hive-tyrant-profile-tyrant-talons-melee",
            "title": "Tyrant talons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-winged-hive-tyrant-selection-tyrant-talons"
            ]
          },
          {
            "id": "unit-winged-hive-tyrant-profile-monstrous-scything-talons-melee-2",
            "title": "Monstrous scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-winged-hive-tyrant-selection-monstrous-scything-talons"
            ]
          },
          {
            "id": "unit-winged-hive-tyrant-profile-stranglethorn-cannon-ranged-3",
            "title": "Stranglethorn cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "2+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-winged-hive-tyrant-selection-stranglethorn-cannon"
            ]
          },
          {
            "id": "unit-winged-hive-tyrant-profile-heavy-venom-cannon-ranged-4",
            "title": "Heavy venom cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-winged-hive-tyrant-selection-heavy-venom-cannon"
            ]
          },
          {
            "id": "unit-winged-hive-tyrant-profile-monstrous-bonesword-and-lash-whip-melee-5",
            "title": "Monstrous bonesword and lash whip",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-winged-hive-tyrant-selection-monstrous-bonesword-and-lash-whip"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-winged-tyranid-prime",
      "title": "Winged Tyranid Prime",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Winged Tyranid Prime",
        "Character",
        "Infantry",
        "Fly",
        "Great Devourer",
        "Tyranids",
        "Synapse",
        "Vanguard Invader"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-gargoyles",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-tyranid-warriors-with-melee-bio-weapons",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons",
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
              "unitId": "unit-gargoyles",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-tyranid-warriors-with-melee-bio-weapons",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons",
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
          "T": "5",
          "Sv": "4+",
          "W": "6",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-alpha-warrior-2",
            "sectionId": "tyranids-ability-alpha-warrior-2",
            "title": "Alpha Warrior",
            "text": "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          },
          {
            "id": "tyranids-ability-death-blow",
            "sectionId": "tyranids-ability-death-blow",
            "title": "Death Blow",
            "text": "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-winged-tyranid-prime"
          }
        ],
        "models": [
          {
            "id": "unit-winged-tyranid-prime-model-winged-tyranid-prime",
            "title": "Winged Tyranid Prime",
            "aliases": [
              "Winged Tyranid Prime"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-winged-tyranid-prime-selection-prime-talons",
            "title": "Prime talons",
            "aliases": [
              "Prime talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-winged-tyranid-prime-profile-prime-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-winged-tyranid-prime-profile-prime-talons-melee",
            "title": "Prime talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-winged-tyranid-prime-selection-prime-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyrannocyte",
      "title": "Tyrannocyte",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Dedicated Transport",
        "Transport",
        "Monster",
        "Fly",
        "Great Devourer",
        "Tyrannocyte",
        "Tyranids",
        "Vanguard Invader",
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
          "T": "9",
          "Sv": "3+",
          "W": "10",
          "Ld": "8+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-aerial-seeding",
            "sectionId": "tyranids-ability-aerial-seeding",
            "title": "Aerial Seeding",
            "text": "This model must start the battle in Reserves, but neither it nor any units embarked within it are counted towards any limits placed on the maximum number of Reserves units you can start the battle with. This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model must immediately disembark after it has been set up on the battlefield, and they must be set up more than 8\" away from all enemy models. After this model has been set up on the battlefield, no units can embark within it.",
            "sourceUnitId": "unit-tyrannocyte"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tyrannocyte"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-tyrannocyte"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyrannocyte"
          }
        ],
        "models": [
          {
            "id": "unit-tyrannocyte-model-tyrannocyte",
            "title": "Tyrannocyte",
            "aliases": [
              "Tyrannocyte"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyrannocyte-selection-flensing-whips",
            "title": "Flensing Whips",
            "aliases": [
              "Flensing Whips"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannocyte-profile-flensing-whips-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrannocyte-selection-tyrannocyte-bio-weapons",
            "title": "Tyrannocyte Bio-weapons",
            "aliases": [
              "Tyrannocyte Bio-weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannocyte-profile-tyrannocyte-bio-weapons-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyrannocyte-profile-flensing-whips-melee",
            "title": "Flensing Whips",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrannocyte-selection-flensing-whips"
            ]
          },
          {
            "id": "unit-tyrannocyte-profile-tyrannocyte-bio-weapons-ranged-2",
            "title": "Tyrannocyte Bio-weapons",
            "mode": "ranged",
            "range": "24\"",
            "a": "5",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrannocyte-selection-tyrannocyte-bio-weapons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-deathleaper",
      "title": "Deathleaper",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Tyranids",
        "Character",
        "Great Devourer",
        "Deathleaper",
        "Infantry",
        "Vanguard Invader"
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
          "T": "6",
          "Sv": "3+",
          "W": "7",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-fear-of-the-unseen-aura",
            "sectionId": "tyranids-ability-fear-of-the-unseen-aura",
            "title": "Fear of the Unseen (Aura)",
            "text": "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent’s Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test.",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "tyranids-ability-hunter-organism",
            "sectionId": "tyranids-ability-hunter-organism",
            "title": "Hunter Organism",
            "text": "This model cannot be your Warlord",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "tyranids-ability-feeder-tendrils",
            "sectionId": "tyranids-ability-feeder-tendrils",
            "title": "Feeder Tendrils",
            "text": "Each time this model destroys an enemy Character model, you gain 1CP.",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "core-fights-first",
            "sectionId": "core-fights-first",
            "title": "Fights First",
            "text": "While every model in a unit has this ability, that unit is a Fights First unit. \nSee the Resolve Fights First Combats step in the Fight phase (12.04).",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-deathleaper"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-deathleaper"
          }
        ],
        "models": [
          {
            "id": "unit-deathleaper-model-deathleaper",
            "title": "Deathleaper",
            "aliases": [
              "Deathleaper"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-deathleaper-selection-lictor-claws-and-talons",
            "title": "Lictor claws and talons",
            "aliases": [
              "Lictor claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-deathleaper-profile-lictor-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-deathleaper-profile-lictor-claws-and-talons-melee",
            "title": "Lictor claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-deathleaper-selection-lictor-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-old-one-eye",
      "title": "Old One Eye",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Monster",
        "Character",
        "Great Devourer",
        "Old One Eye",
        "Tyranids"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-carnifexes",
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
              "unitId": "unit-carnifexes",
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
          "M": "8\"",
          "T": "9",
          "Sv": "2+",
          "W": "9",
          "Ld": "8+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-alpha-leader",
            "sectionId": "tyranids-ability-alpha-leader",
            "title": "Alpha Leader",
            "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-old-one-eye"
          },
          {
            "id": "tyranids-ability-unstoppable-monster",
            "sectionId": "tyranids-ability-unstoppable-monster",
            "title": "Unstoppable Monster",
            "text": "At the start of each player’s Command phase, this model regains up to D3 lost wounds.",
            "sourceUnitId": "unit-old-one-eye"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-old-one-eye"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-old-one-eye"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-old-one-eye"
          }
        ],
        "models": [
          {
            "id": "unit-old-one-eye-model-old-one-eye",
            "title": "Old One Eye",
            "aliases": [
              "Old One Eye"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-old-one-eye-selection-old-one-eyes-claws-and-talons-strike",
            "title": "➤ Old One Eye’s claws and talons - Strike",
            "aliases": [
              "➤ Old One Eye’s claws and talons - Strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-old-one-eye-selection-old-one-eyes-claws-and-talons-sweep",
            "title": "➤ Old One Eye’s claws and talons - Sweep",
            "aliases": [
              "➤ Old One Eye’s claws and talons - Sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-old-one-eye-weapon-family-old-one-eyes-claws-and-talons-selection",
            "title": "➤ Old One Eye’s claws and talons",
            "aliases": [
              "➤ Old One Eye’s claws and talons"
            ],
            "kind": "weapon",
            "familyId": "unit-old-one-eye-weapon-family-old-one-eyes-claws-and-talons",
            "profileIds": [
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-strike-melee",
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-old-one-eye-weapon-family-old-one-eyes-claws-and-talons",
            "title": "➤ Old One Eye’s claws and talons",
            "aliases": [
              "➤ Old One Eye’s claws and talons"
            ],
            "profileIds": [
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-strike-melee",
              "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-strike-melee",
            "title": "➤ Old One Eye’s claws and talons - Strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-old-one-eye-selection-old-one-eyes-claws-and-talons-strike",
              "unit-old-one-eye-weapon-family-old-one-eyes-claws-and-talons-selection"
            ]
          },
          {
            "id": "unit-old-one-eye-profile-old-one-eyes-claws-and-talons-sweep-melee-2",
            "title": "➤ Old One Eye’s claws and talons - Sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-old-one-eye-selection-old-one-eyes-claws-and-talons-sweep",
              "unit-old-one-eye-weapon-family-old-one-eyes-claws-and-talons-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-the-red-terror",
      "title": "The Red Terror",
      "sourceBookId": "tyranids",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Character",
        "Great Devourer",
        "Tyranids",
        "Vanguard Invader",
        "Epic Hero",
        "Monster",
        "The Red Terror",
        "Mobile",
        "Burrower"
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
          "T": "8",
          "Sv": "3+",
          "W": "9",
          "Ld": "8+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-swallow-whole",
            "sectionId": "tyranids-ability-swallow-whole",
            "title": "Swallow Whole",
            "text": "Each time an attack with this model’s gaping maw targets an Infantry, Mounted or Beasts unit, each successful unmodified Wound roll is a Critical Wound. Each time an Infantry, Mounted or Beasts model is destroyed as a result of an attack made by this model’s gaping maw, this model regains up to D3+2 lost wounds.",
            "sourceUnitId": "unit-the-red-terror"
          },
          {
            "id": "tyranids-ability-subterranean-hunter",
            "sectionId": "tyranids-ability-subterranean-hunter",
            "title": "Subterranean Hunter",
            "text": "At the end of the Fight phase, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
            "sourceUnitId": "unit-the-red-terror"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-the-red-terror"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-the-red-terror"
          }
        ],
        "models": [
          {
            "id": "unit-the-red-terror-model-the-red-terror",
            "title": "The Red Terror",
            "aliases": [
              "The Red Terror"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-the-red-terror-selection-gaping-maw",
            "title": "Gaping maw",
            "aliases": [
              "Gaping maw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-red-terror-profile-gaping-maw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-red-terror-selection-scything-talons",
            "title": "Scything talons",
            "aliases": [
              "Scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-red-terror-profile-scything-talons-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-the-red-terror-profile-gaping-maw-melee",
            "title": "Gaping maw",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "2+",
            "s": "5",
            "ap": "-",
            "d": "D3+2",
            "abilities": "Extra Attacks, Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-the-red-terror-selection-gaping-maw"
            ]
          },
          {
            "id": "unit-the-red-terror-profile-scything-talons-melee-2",
            "title": "Scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-the-red-terror-selection-scything-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-the-swarmlord",
      "title": "The Swarmlord",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Tyranids",
        "Monster",
        "The Swarmlord",
        "Great Devourer",
        "Synapse",
        "Psyker",
        "Hive Tyrant"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-tyrant-guard",
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
              "unitId": "unit-tyrant-guard",
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
          "M": "8\"",
          "T": "10",
          "Sv": "2+",
          "W": "10",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-hive-commander",
            "sectionId": "tyranids-ability-hive-commander",
            "title": "Hive Commander",
            "text": "At the start of your Command phase, if this model is on the battlefield, you gain 1CP",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "tyranids-ability-malign-presence-aura",
            "sectionId": "tyranids-ability-malign-presence-aura",
            "title": "Malign Presence (Aura)",
            "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "tyranids-ability-domination-of-the-hive-mind-aura",
            "sectionId": "tyranids-ability-domination-of-the-hive-mind-aura",
            "title": "Domination of the Hive Mind (Aura)",
            "text": "While a friendly TYRANIDS unit is within 9\" of this model, that unit is within your army’s Synapse Range.",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-the-swarmlord"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-the-swarmlord"
          }
        ],
        "models": [
          {
            "id": "unit-the-swarmlord-model-the-swarmlord",
            "title": "The Swarmlord",
            "aliases": [
              "The Swarmlord"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-the-swarmlord-selection-bone-sabres",
            "title": "Bone Sabres",
            "aliases": [
              "Bone Sabres"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-swarmlord-profile-bone-sabres-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-swarmlord-selection-synaptic-pulse",
            "title": "Synaptic Pulse",
            "aliases": [
              "Synaptic Pulse"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-swarmlord-profile-synaptic-pulse-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-the-swarmlord-profile-bone-sabres-melee",
            "title": "Bone Sabres",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-the-swarmlord-selection-bone-sabres"
            ]
          },
          {
            "id": "unit-the-swarmlord-profile-synaptic-pulse-ranged-2",
            "title": "Synaptic Pulse",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Psychic, Torrent",
            "sourceSelectionIds": [
              "unit-the-swarmlord-selection-synaptic-pulse"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-barbgaunts",
      "title": "Barbgaunts",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Barbgaunts",
        "Infantry",
        "Great Devourer",
        "Tyranids"
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
          "Sv": "4+",
          "W": "2",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-disruption-bombardment",
            "sectionId": "tyranids-ability-disruption-bombardment",
            "title": "Disruption Bombardment",
            "text": "In your Shooting phase, after this unit has shot, select one enemy INFANTRY unit hit by one or more of those attacks. Until the end of your opponent’s next turn, that enemy unit is disrupted. While a unit is disrupted, subtract 2 from its Move characteristic, and subtract 2 from Advance and Charge rolls made for it.",
            "sourceUnitId": "unit-barbgaunts"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-barbgaunts"
          }
        ],
        "models": [
          {
            "id": "unit-barbgaunts-model-barbgaunt",
            "title": "Barbgaunt",
            "aliases": [
              "Barbgaunt"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-barbgaunts-selection-barblauncher",
            "title": "Barblauncher",
            "aliases": [
              "Barblauncher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-barbgaunts-profile-barblauncher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-barbgaunts-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-barbgaunts-profile-chitinous-claws-and-teeth-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-barbgaunts-profile-barblauncher-ranged",
            "title": "Barblauncher",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-barbgaunts-selection-barblauncher"
            ]
          },
          {
            "id": "unit-barbgaunts-profile-chitinous-claws-and-teeth-melee-2",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-barbgaunts-selection-chitinous-claws-and-teeth"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-biovores",
      "title": "Biovores",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Biovore",
        "Tyranids"
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
          "M": "5\"",
          "T": "6",
          "Sv": "3+",
          "W": "5",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-seed-spore-mines",
            "sectionId": "tyranids-ability-seed-spore-mines",
            "title": "Seed Spore Mines",
            "text": "Once per turn, in your Shooting Phase, when selected to shoot, one unit with this ability can use it instead of making any attacks with its ranged weapons. If it does, you can add one new SPORE MINES unit to your army and set it up anywhere on the battlefield that is wholly within 48\" of this unit and more than 8\" horizontally away from all enemy units. That SPORE MINES unit contains 1 model for each model in this unit.",
            "sourceUnitId": "unit-biovores"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-biovores"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-biovores"
          }
        ],
        "models": [
          {
            "id": "unit-biovores-model-biovore",
            "title": "Biovore",
            "aliases": [
              "Biovore"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-biovores-selection-spore-mine-launcher",
            "title": "Spore mine launcher",
            "aliases": [
              "Spore mine launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-biovores-profile-spore-mine-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-biovores-selection-chitin-barbed-limbs",
            "title": "Chitin-barbed limbs",
            "aliases": [
              "Chitin-barbed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-biovores-profile-chitin-barbed-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-biovores-profile-spore-mine-launcher-ranged",
            "title": "Spore mine launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast, Devastating Wounds, Heavy, Indirect Fire",
            "sourceSelectionIds": [
              "unit-biovores-selection-spore-mine-launcher"
            ]
          },
          {
            "id": "unit-biovores-profile-chitin-barbed-limbs-melee-2",
            "title": "Chitin-barbed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-biovores-selection-chitin-barbed-limbs"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-genestealers",
      "title": "Genestealers",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Tyranids",
        "Infantry",
        "Great Devourer",
        "Genestealers",
        "Vanguard Invader"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-broodlord",
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
              "unitId": "unit-broodlord",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "4",
          "Sv": "5+",
          "W": "2",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "5+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-vanguard-predator",
            "sectionId": "tyranids-ability-vanguard-predator",
            "title": "Vanguard Predator",
            "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target is within range of one or more objective markers, re-roll a Wound roll of 1 as well.",
            "sourceUnitId": "unit-genestealers"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 8\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-genestealers"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-genestealers"
          }
        ],
        "models": [
          {
            "id": "unit-genestealers-model-5-10-genestealers",
            "title": "5-10 Genestealers",
            "aliases": [
              "5-10 Genestealers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-genestealers-selection-genestealer-claws-and-talons",
            "title": "Genestealer claws and talons",
            "aliases": [
              "Genestealer claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-genestealers-profile-genestealer-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-genestealers-profile-genestealer-claws-and-talons-melee",
            "title": "Genestealer claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-genestealers-selection-genestealer-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hive-guard",
      "title": "Hive Guard",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Hive Guard",
        "Tyranids"
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
          "T": "7",
          "Sv": "3+",
          "W": "4",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-defensive-stance",
            "sectionId": "tyranids-ability-defensive-stance",
            "title": "Defensive Stance",
            "text": "Each time you target this unit with the Fire Overwatch Stratagem, while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+, or unmodified Hit rolls of 4+ instead if this unit is within range of an objective marker.",
            "sourceUnitId": "unit-hive-guard"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-hive-guard"
          }
        ],
        "models": [
          {
            "id": "unit-hive-guard-model-3-6-hive-guard",
            "title": "3-6 Hive Guard",
            "aliases": [
              "3-6 Hive Guard"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hive-guard-selection-shockcannon",
            "title": "Shockcannon",
            "aliases": [
              "Shockcannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-guard-profile-shockcannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-guard-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-guard-profile-chitinous-claws-and-teeth-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-guard-selection-impaler-cannon",
            "title": "Impaler cannon",
            "aliases": [
              "Impaler cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-guard-profile-impaler-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hive-guard-profile-shockcannon-ranged",
            "title": "Shockcannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "3",
            "abilities": "Anti-Vehicle 2+",
            "sourceSelectionIds": [
              "unit-hive-guard-selection-shockcannon"
            ]
          },
          {
            "id": "unit-hive-guard-profile-chitinous-claws-and-teeth-melee-2",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hive-guard-selection-chitinous-claws-and-teeth"
            ]
          },
          {
            "id": "unit-hive-guard-profile-impaler-cannon-ranged-3",
            "title": "Impaler cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Heavy, Indirect Fire",
            "sourceSelectionIds": [
              "unit-hive-guard-selection-impaler-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lictor",
      "title": "Lictor",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Lictor",
        "Tyranids",
        "Vanguard Invader"
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
          "T": "6",
          "Sv": "4+",
          "W": "6",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-pheromone-trail",
            "sectionId": "tyranids-ability-pheromone-trail",
            "title": "Pheromone Trail",
            "text": "Once per battle round, you can target one model with this ability with the Rapid Ingress Stratagem for 0CP.",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "tyranids-ability-feeder-tendrils",
            "sectionId": "tyranids-ability-feeder-tendrils",
            "title": "Feeder Tendrils",
            "text": "Each time this model destroys an enemy Character model, you gain 1CP.",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "core-fights-first",
            "sectionId": "core-fights-first",
            "title": "Fights First",
            "text": "While every model in a unit has this ability, that unit is a Fights First unit. \nSee the Resolve Fights First Combats step in the Fight phase (12.04).",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-lictor"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-lictor"
          }
        ],
        "models": [
          {
            "id": "unit-lictor-model-lictor",
            "title": "Lictor",
            "aliases": [
              "Lictor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lictor-selection-lictor-claws-and-talons",
            "title": "Lictor claws and talons",
            "aliases": [
              "Lictor claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lictor-profile-lictor-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lictor-profile-lictor-claws-and-talons-melee",
            "title": "Lictor claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-lictor-selection-lictor-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-neurogaunts",
      "title": "Neurogaunts",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Neurogaunts",
        "Endless Multitude",
        "Tyranids"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-neurotyrant",
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
              "unitId": "unit-neurotyrant",
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
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-neurocytes",
            "sectionId": "tyranids-ability-neurocytes",
            "title": "Neurocytes",
            "text": "While this unit is within Synapse Range of a friendly TYRANIDS unit (excluding NEUROGAUNTS units), it has the SYNAPSE keyword.",
            "sourceUnitId": "unit-neurogaunts"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-neurogaunts"
          }
        ],
        "models": [
          {
            "id": "unit-neurogaunts-model-1-2-neurogaunt-nodebeasts",
            "title": "1-2 Neurogaunt Nodebeasts",
            "aliases": [
              "1-2 Neurogaunt Nodebeasts"
            ]
          },
          {
            "id": "unit-neurogaunts-model-10-20-neurogaunts-2",
            "title": "10-20 Neurogaunts",
            "aliases": [
              "10-20 Neurogaunts"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-neurogaunts-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-neurogaunts-profile-chitinous-claws-and-teeth-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-neurogaunts-profile-chitinous-claws-and-teeth-melee",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-neurogaunts-selection-chitinous-claws-and-teeth"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-neurolictor",
      "title": "Neurolictor",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Neurolictor",
        "Vanguard Invader",
        "Tyranids",
        "Synapse"
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
          "W": "7",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-feeder-tendrils-2",
            "sectionId": "tyranids-ability-feeder-tendrils-2",
            "title": "Feeder Tendrils",
            "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "tyranids-ability-neural-disruption",
            "sectionId": "tyranids-ability-neural-disruption",
            "title": "Neural Disruption",
            "text": "In your Command phase, select one enemy unit within 12\" of this model. That unit must take a Battle-shock test",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "tyranids-ability-psychological-saboteur-aura",
            "sectionId": "tyranids-ability-psychological-saboteur-aura",
            "title": "Psychological Saboteur (Aura)",
            "text": "While an enemy unit is within 12\" of this model, if that unit is Battle-shocked:\n\n- Each time a model in that unit makes an attack, subtract 1 from the Hit roll.\n- Each time a friendly TYRANIDS model makes an attack that targets that unit, add 1 to the Wound roll.",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-neurolictor"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-neurolictor"
          }
        ],
        "models": [
          {
            "id": "unit-neurolictor-model-neurolictor",
            "title": "Neurolictor",
            "aliases": [
              "Neurolictor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-neurolictor-selection-piercing-claws-and-talons",
            "title": "Piercing claws and talons",
            "aliases": [
              "Piercing claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-neurolictor-profile-piercing-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-neurolictor-profile-piercing-claws-and-talons-melee",
            "title": "Piercing claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-neurolictor-selection-piercing-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-pyrovores",
      "title": "Pyrovores",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Pyrovores",
        "Infantry",
        "Great Devourer",
        "Tyranids",
        "Harvester"
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
          "M": "5\"",
          "T": "6",
          "Sv": "3+",
          "W": "5",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-burning-spray",
            "sectionId": "tyranids-ability-burning-spray",
            "title": "Burning Spray",
            "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover.",
            "sourceUnitId": "unit-pyrovores"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-pyrovores"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-pyrovores"
          }
        ],
        "models": [
          {
            "id": "unit-pyrovores-model-1-3-pyrovores",
            "title": "1-3 Pyrovores",
            "aliases": [
              "1-3 Pyrovores"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-pyrovores-selection-flamespurt",
            "title": "Flamespurt",
            "aliases": [
              "Flamespurt"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pyrovores-profile-flamespurt-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pyrovores-selection-chitin-barbed-limbs",
            "title": "Chitin-barbed limbs",
            "aliases": [
              "Chitin-barbed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pyrovores-profile-chitin-barbed-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-pyrovores-profile-flamespurt-ranged",
            "title": "Flamespurt",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+1",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-pyrovores-selection-flamespurt"
            ]
          },
          {
            "id": "unit-pyrovores-profile-chitin-barbed-limbs-melee-2",
            "title": "Chitin-barbed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pyrovores-selection-chitin-barbed-limbs"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-raveners",
      "title": "Raveners",
      "sourceBookId": "tyranids",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Tyranids",
        "Infantry",
        "Great Devourer",
        "Raveners",
        "Vanguard Invader",
        "Burrowers"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-hyperadapted-raveners",
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
              "unitId": "unit-hyperadapted-raveners",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "10\"",
          "T": "5",
          "Sv": "4+",
          "W": "3",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-death-from-below",
            "sectionId": "tyranids-ability-death-from-below",
            "title": "Death From Below",
            "text": "At the end of your opponent’s turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
            "sourceUnitId": "unit-raveners"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-raveners"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-raveners"
          }
        ],
        "models": [
          {
            "id": "unit-raveners-model-5-raveners",
            "title": "5 Raveners",
            "aliases": [
              "5 Raveners"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-raveners-selection-ravener-claws-and-talons",
            "title": "Ravener claws and talons",
            "aliases": [
              "Ravener claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-raveners-profile-ravener-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-raveners-profile-ravener-claws-and-talons-melee",
            "title": "Ravener claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-raveners-selection-ravener-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyranid-warriors-with-melee-bio-weapons",
      "title": "Tyranid Warriors with Melee Bio-Weapons",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Tyranids",
        "Tyranid Warriors with Melee Bio-weapons",
        "Great Devourer",
        "Synapse",
        "Tyranid Warriors"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tyranid-prime-with-lash-whip",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-winged-tyranid-prime",
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
              "unitId": "unit-tyranid-prime-with-lash-whip",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-winged-tyranid-prime",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "5",
          "Sv": "4+",
          "W": "3",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-adaptive-instincts-once-per-turn-per-unit",
            "sectionId": "tyranids-ability-adaptive-instincts-once-per-turn-per-unit",
            "title": "Adaptive Instincts (Once per turn, per unit)",
            "text": "In the Fight phase, when this unit is selected to fight or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit’s melee attacks have +1 S.\n▪ Or: This unit has +1 T.",
            "sourceUnitId": "unit-tyranid-warriors-with-melee-bio-weapons"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-tyranid-warriors-with-melee-bio-weapons"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyranid-warriors-with-melee-bio-weapons"
          }
        ],
        "models": [
          {
            "id": "unit-tyranid-warriors-with-melee-bio-weapons-model-tyranid-prime",
            "title": "Tyranid Prime",
            "aliases": [
              "Tyranid Prime"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-melee-bio-weapons-model-2-5-tyranid-warriors-2",
            "title": "2-5 Tyranid Warriors",
            "aliases": [
              "2-5 Tyranid Warriors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyranid-warriors-with-melee-bio-weapons-selection-tyranid-warrior-claws-and-talons",
            "title": "Tyranid Warrior claws and talons",
            "aliases": [
              "Tyranid Warrior claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-melee-bio-weapons-profile-tyranid-warrior-claws-and-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyranid-warriors-with-melee-bio-weapons-profile-tyranid-warrior-claws-and-talons-melee",
            "title": "Tyranid Warrior claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-melee-bio-weapons-selection-tyranid-warrior-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyranid-warriors-with-ranged-bio-weapons",
      "title": "Tyranid Warriors with Ranged Bio-Weapons",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Tyranid Warriors with Ranged Bio-weapons",
        "Tyranids",
        "Synapse",
        "Great Devourer"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tyranid-prime-with-lash-whip",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-winged-tyranid-prime",
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
              "unitId": "unit-tyranid-prime-with-lash-whip",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-winged-tyranid-prime",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "5",
          "Sv": "4+",
          "W": "3",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-adaptable-predators",
            "sectionId": "tyranids-ability-adaptable-predators",
            "title": "Adaptable Predators",
            "text": "This unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
            "sourceUnitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
          }
        ],
        "models": [
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-model-tyranid-prime",
            "title": "Tyranid Prime",
            "aliases": [
              "Tyranid Prime"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-model-2-5-tyranid-warriors-2",
            "title": "2-5 Tyranid Warriors",
            "aliases": [
              "2-5 Tyranid Warriors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-deathspitter",
            "title": "Deathspitter",
            "aliases": [
              "Deathspitter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-deathspitter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-spinefists",
            "title": "Spinefists",
            "aliases": [
              "Spinefists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-spinefists-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-venom-cannon",
            "title": "Venom cannon",
            "aliases": [
              "Venom cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-venom-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-barbed-strangler",
            "title": "Barbed strangler",
            "aliases": [
              "Barbed strangler"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-barbed-strangler-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-devourer",
            "title": "Devourer",
            "aliases": [
              "Devourer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-devourer-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-selection-tyranid-warrior-claws-and-talons",
            "title": "Tyranid Warrior claws and talons",
            "aliases": [
              "Tyranid Warrior claws and talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-profile-tyranid-warrior-claws-and-talons-melee-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-deathspitter-ranged",
            "title": "Deathspitter",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-deathspitter"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-spinefists-ranged-2",
            "title": "Spinefists",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Pistol, Twin-linked",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-spinefists"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-venom-cannon-ranged-3",
            "title": "Venom cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-venom-cannon"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-barbed-strangler-ranged-4",
            "title": "Barbed strangler",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-barbed-strangler"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-devourer-ranged-5",
            "title": "Devourer",
            "mode": "ranged",
            "range": "18\"",
            "a": "5",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-devourer"
            ]
          },
          {
            "id": "unit-tyranid-warriors-with-ranged-bio-weapons-profile-tyranid-warrior-claws-and-talons-melee-6",
            "title": "Tyranid Warrior claws and talons",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyranid-warriors-with-ranged-bio-weapons-selection-tyranid-warrior-claws-and-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyrant-guard",
      "title": "Tyrant Guard",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Tyrant Guard",
        "Tyranids"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-hive-tyrant",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-neurotyrant",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-the-swarmlord",
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
              "unitId": "unit-hive-tyrant",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-neurotyrant",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-the-swarmlord",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "8",
          "Sv": "3+",
          "W": "4",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-guardian-organism",
            "sectionId": "tyranids-ability-guardian-organism",
            "title": "Guardian Organism",
            "text": "While a CHARACTER model is leading this unit, that Character has the Feel No Pain 5+ ability",
            "sourceUnitId": "unit-tyrant-guard"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyrant-guard"
          }
        ],
        "models": [
          {
            "id": "unit-tyrant-guard-model-3-6-tyrant-guard",
            "title": "3-6 Tyrant Guard",
            "aliases": [
              "3-6 Tyrant Guard"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyrant-guard-selection-scything-talons-and-rending-claws",
            "title": "Scything talons and rending claws",
            "aliases": [
              "Scything talons and rending claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrant-guard-profile-scything-talons-and-rending-claws-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrant-guard-selection-bone-cleaver-lash-whip-and-rending-claws",
            "title": "Bone cleaver, lash whip and rending claws",
            "aliases": [
              "Bone cleaver, lash whip and rending claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrant-guard-profile-bone-cleaver-lash-whip-and-rending-claws-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrant-guard-selection-crushing-claws-and-rending-claws",
            "title": "Crushing claws and rending claws",
            "aliases": [
              "Crushing claws and rending claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrant-guard-profile-crushing-claws-and-rending-claws-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyrant-guard-profile-scything-talons-and-rending-claws-melee",
            "title": "Scything talons and rending claws",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrant-guard-selection-scything-talons-and-rending-claws"
            ]
          },
          {
            "id": "unit-tyrant-guard-profile-bone-cleaver-lash-whip-and-rending-claws-melee-2",
            "title": "Bone cleaver, lash whip and rending claws",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrant-guard-selection-bone-cleaver-lash-whip-and-rending-claws"
            ]
          },
          {
            "id": "unit-tyrant-guard-profile-crushing-claws-and-rending-claws-melee-3",
            "title": "Crushing claws and rending claws",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-tyrant-guard-selection-crushing-claws-and-rending-claws"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-venomthropes",
      "title": "Venomthropes",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "Tyranids",
        "Venomthropes",
        "Great Devourer"
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
          "T": "5",
          "Sv": "4+",
          "W": "3",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-foul-spores-aura",
            "sectionId": "tyranids-ability-foul-spores-aura",
            "title": "Foul Spores (Aura)",
            "text": "Friendly TYRANIDS units within 6\" of this unit have Stealth.",
            "sourceUnitId": "unit-venomthropes"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-venomthropes"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-venomthropes"
          }
        ],
        "models": [
          {
            "id": "unit-venomthropes-model-3-6-venomthropes",
            "title": "3-6 Venomthropes",
            "aliases": [
              "3-6 Venomthropes"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-venomthropes-selection-toxic-lashes",
            "title": "Toxic lashes",
            "aliases": [
              "Toxic lashes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-venomthropes-profile-toxic-lashes-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-venomthropes-profile-toxic-lashes-melee",
            "title": "Toxic lashes",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 2+",
            "sourceSelectionIds": [
              "unit-venomthropes-selection-toxic-lashes"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-von-ryans-leapers",
      "title": "Von Ryan's Leapers",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Great Devourer",
        "Von Ryan's Leapers",
        "Tyranids",
        "Vanguard Invader"
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
          "T": "5",
          "Sv": "4+",
          "W": "3",
          "Ld": "8+",
          "OC": "1",
          "Invulnerable": "6+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-pouncing-leap",
            "sectionId": "tyranids-ability-pouncing-leap",
            "title": "Pouncing Leap",
            "text": "You can target this unit with the Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that stratagem on other units this phase.",
            "sourceUnitId": "unit-von-ryans-leapers"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-von-ryans-leapers"
          },
          {
            "id": "core-fights-first",
            "sectionId": "core-fights-first",
            "title": "Fights First",
            "text": "While every model in a unit has this ability, that unit is a Fights First unit. \nSee the Resolve Fights First Combats step in the Fight phase (12.04).",
            "sourceUnitId": "unit-von-ryans-leapers"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-von-ryans-leapers"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-von-ryans-leapers"
          }
        ],
        "models": [
          {
            "id": "unit-von-ryans-leapers-model-3-6-von-ryans-leapers",
            "title": "3-6 Von Ryan's Leapers",
            "aliases": [
              "3-6 Von Ryan's Leapers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-von-ryans-leapers-selection-leapers-talons",
            "title": "Leaper's talons",
            "aliases": [
              "Leaper's talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-von-ryans-leapers-profile-leapers-talons-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-von-ryans-leapers-profile-leapers-talons-melee",
            "title": "Leaper's talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-von-ryans-leapers-selection-leapers-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-zoanthropes",
      "title": "Zoanthropes",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "Psyker",
        "Great Devourer",
        "Zoanthropes",
        "Tyranids",
        "Synapse"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-neurotyrant",
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
              "unitId": "unit-neurotyrant",
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
          "Sv": "5+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-spirit-leech-aura-psychic",
            "sectionId": "tyranids-ability-spirit-leech-aura-psychic",
            "title": "Spirit Leech (Aura, Psychic)",
            "text": "While an enemy unit is within 6\" of this unit, if it contains a Neurothrope, each time that enemy unit fails a Battle-shock test, it suffers D3 mortal wounds and one model in this unit regains up to D3 lost wounds.",
            "sourceUnitId": "unit-zoanthropes"
          },
          {
            "id": "tyranids-ability-warp-field-aura-psychic",
            "sectionId": "tyranids-ability-warp-field-aura-psychic",
            "title": "Warp Field (Aura, Psychic)",
            "text": "While a friendly TYRANIDS unit is within 6\" of this unit, models in that unit have a 6+ invulnerable save.",
            "sourceUnitId": "unit-zoanthropes"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-zoanthropes"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-zoanthropes"
          }
        ],
        "models": [
          {
            "id": "unit-zoanthropes-model-neurothrope",
            "title": "Neurothrope",
            "aliases": [
              "Neurothrope"
            ]
          },
          {
            "id": "unit-zoanthropes-model-2-5-zoanthropes-2",
            "title": "2-5 Zoanthropes",
            "aliases": [
              "2-5 Zoanthropes"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-zoanthropes-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-zoanthropes-profile-chitinous-claws-and-teeth-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-zoanthropes-selection-warp-blast-witchfire",
            "title": "➤ Warp blast - witchfire",
            "aliases": [
              "➤ Warp blast - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-zoanthropes-profile-warp-blast-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-zoanthropes-selection-warp-blast-focused-witchfire",
            "title": "➤ Warp blast - focused witchfire",
            "aliases": [
              "➤ Warp blast - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-zoanthropes-profile-warp-blast-focused-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-zoanthropes-weapon-family-warp-blast-selection",
            "title": "➤ Warp blast",
            "aliases": [
              "➤ Warp blast"
            ],
            "kind": "weapon",
            "familyId": "unit-zoanthropes-weapon-family-warp-blast",
            "profileIds": [
              "unit-zoanthropes-profile-warp-blast-witchfire-ranged-2",
              "unit-zoanthropes-profile-warp-blast-focused-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-zoanthropes-weapon-family-warp-blast",
            "title": "➤ Warp blast",
            "aliases": [
              "➤ Warp blast"
            ],
            "profileIds": [
              "unit-zoanthropes-profile-warp-blast-witchfire-ranged-2",
              "unit-zoanthropes-profile-warp-blast-focused-witchfire-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-zoanthropes-profile-chitinous-claws-and-teeth-melee",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-zoanthropes-selection-chitinous-claws-and-teeth"
            ]
          },
          {
            "id": "unit-zoanthropes-profile-warp-blast-witchfire-ranged-2",
            "title": "➤ Warp blast - witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "D3",
            "abilities": "Blast, Psychic",
            "sourceSelectionIds": [
              "unit-zoanthropes-selection-warp-blast-witchfire",
              "unit-zoanthropes-weapon-family-warp-blast-selection"
            ]
          },
          {
            "id": "unit-zoanthropes-profile-warp-blast-focused-witchfire-ranged-3",
            "title": "➤ Warp blast - focused witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Lethal Hits, Psychic",
            "sourceSelectionIds": [
              "unit-zoanthropes-selection-warp-blast-focused-witchfire",
              "unit-zoanthropes-weapon-family-warp-blast-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-carnifexes",
      "title": "Carnifexes",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Carnifexes",
        "Tyranids"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-old-one-eye",
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
              "unitId": "unit-old-one-eye",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "8\"",
          "T": "9",
          "Sv": "2+",
          "W": "8",
          "Ld": "8+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-blistering-assault",
            "sectionId": "tyranids-ability-blistering-assault",
            "title": "Blistering Assault",
            "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit lost a wound as a result of those attacks, this unit can make a surge move of up to D6+2\".",
            "sourceUnitId": "unit-carnifexes"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-carnifexes"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-carnifexes"
          }
        ],
        "models": [
          {
            "id": "unit-carnifexes-model-carnifex",
            "title": "Carnifex",
            "aliases": [
              "Carnifex"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-carnifexes-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-chitinous-claws-and-teeth-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-bio-plasma",
            "title": "Bio-plasma",
            "aliases": [
              "Bio-plasma"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-bio-plasma-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-spine-banks",
            "title": "Spine banks",
            "aliases": [
              "Spine banks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-spine-banks-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-carnifex-scything-talons",
            "title": "Carnifex scything talons",
            "aliases": [
              "Carnifex scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-carnifex-scything-talons-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-deathspitters-with-slimer-maggots",
            "title": "Deathspitters with slimer maggots",
            "aliases": [
              "Deathspitters with slimer maggots"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-deathspitters-with-slimer-maggots-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-devourers-with-brainleech-worms",
            "title": "Devourers with brainleech worms",
            "aliases": [
              "Devourers with brainleech worms"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-devourers-with-brainleech-worms-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-carnifex-crushing-claws",
            "title": "Carnifex crushing claws",
            "aliases": [
              "Carnifex crushing claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-carnifex-crushing-claws-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-heavy-venom-cannon",
            "title": "Heavy venom cannon",
            "aliases": [
              "Heavy venom cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-heavy-venom-cannon-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-stranglethorn-cannon",
            "title": "Stranglethorn cannon",
            "aliases": [
              "Stranglethorn cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-stranglethorn-cannon-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-carnifexes-selection-carnifex-extra-scything-talons",
            "title": "Carnifex extra scything talons",
            "aliases": [
              "Carnifex extra scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-carnifexes-profile-carnifex-extra-scything-talons-melee-10"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-carnifexes-profile-chitinous-claws-and-teeth-melee",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-chitinous-claws-and-teeth"
            ]
          },
          {
            "id": "unit-carnifexes-profile-bio-plasma-ranged-2",
            "title": "Bio-plasma",
            "mode": "ranged",
            "range": "12\"",
            "a": "D3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Assault, Blast",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-bio-plasma"
            ]
          },
          {
            "id": "unit-carnifexes-profile-spine-banks-ranged-3",
            "title": "Spine banks",
            "mode": "ranged",
            "range": "6\"",
            "a": "5",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-spine-banks"
            ]
          },
          {
            "id": "unit-carnifexes-profile-carnifex-scything-talons-melee-4",
            "title": "Carnifex scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-carnifex-scything-talons"
            ]
          },
          {
            "id": "unit-carnifexes-profile-deathspitters-with-slimer-maggots-ranged-5",
            "title": "Deathspitters with slimer maggots",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-deathspitters-with-slimer-maggots"
            ]
          },
          {
            "id": "unit-carnifexes-profile-devourers-with-brainleech-worms-ranged-6",
            "title": "Devourers with brainleech worms",
            "mode": "ranged",
            "range": "18\"",
            "a": "12",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-devourers-with-brainleech-worms"
            ]
          },
          {
            "id": "unit-carnifexes-profile-carnifex-crushing-claws-melee-7",
            "title": "Carnifex crushing claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-carnifex-crushing-claws"
            ]
          },
          {
            "id": "unit-carnifexes-profile-heavy-venom-cannon-ranged-8",
            "title": "Heavy venom cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-heavy-venom-cannon"
            ]
          },
          {
            "id": "unit-carnifexes-profile-stranglethorn-cannon-ranged-9",
            "title": "Stranglethorn cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-stranglethorn-cannon"
            ]
          },
          {
            "id": "unit-carnifexes-profile-carnifex-extra-scything-talons-melee-10",
            "title": "Carnifex extra scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-carnifexes-selection-carnifex-extra-scything-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-exocrine",
      "title": "Exocrine",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Exocrine",
        "Tyranids"
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
          "W": "14",
          "Ld": "8+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-symbiotic-targeting",
            "sectionId": "tyranids-ability-symbiotic-targeting",
            "title": "Symbiotic Targeting",
            "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly TYRANIDS model makes an attack that targets that unit, re-roll a Hit roll of 1.",
            "sourceUnitId": "unit-exocrine"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-exocrine"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-exocrine"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-exocrine"
          }
        ],
        "models": [
          {
            "id": "unit-exocrine-model-exocrine",
            "title": "Exocrine",
            "aliases": [
              "Exocrine"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-exocrine-selection-bio-plasmic-cannon",
            "title": "Bio-plasmic cannon",
            "aliases": [
              "Bio-plasmic cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-exocrine-profile-bio-plasmic-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-exocrine-selection-powerful-limbs",
            "title": "Powerful limbs",
            "aliases": [
              "Powerful limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-exocrine-profile-powerful-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-exocrine-profile-bio-plasmic-cannon-ranged",
            "title": "Bio-plasmic cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "9",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-exocrine-selection-bio-plasmic-cannon"
            ]
          },
          {
            "id": "unit-exocrine-profile-powerful-limbs-melee-2",
            "title": "Powerful limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "7",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-exocrine-selection-powerful-limbs"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-harpy",
      "title": "Harpy",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Harpy",
        "Monster",
        "Fly",
        "Aircraft",
        "Great Devourer",
        "Tyranids",
        "Vanguard Invader"
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
          "T": "9",
          "Sv": "3+",
          "W": "12",
          "Ld": "8+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-spore-mine-cysts",
            "sectionId": "tyranids-ability-spore-mine-cysts",
            "title": "Spore Mine Cysts",
            "text": "At the end of your opponent’s Fight phase, you can do one of the following:\n- Select one visible enemy unit (excluding Lone Operative units) within 24\" of this unit and roll six D6 for that unit: for each 3+, that unit suffers 1 mortal wound.\n- Add a new SPORE MINES unit containing D3 models to your army and set it up anywhere on the battlefield that is within 6\" of this model and more than 8\" horizontally away from all enemy units. You cannot select this option for more than one model per turn.",
            "sourceUnitId": "unit-harpy"
          },
          {
            "id": "tyranids-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-harpy"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-harpy"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-harpy"
          }
        ],
        "models": [
          {
            "id": "unit-harpy-model-harpy",
            "title": "Harpy",
            "aliases": [
              "Harpy"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-harpy-selection-twin-stranglethorn-cannon",
            "title": "Twin stranglethorn cannon",
            "aliases": [
              "Twin stranglethorn cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-harpy-profile-twin-stranglethorn-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-harpy-selection-twin-heavy-venom-cannon",
            "title": "Twin heavy venom cannon",
            "aliases": [
              "Twin heavy venom cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-harpy-profile-twin-heavy-venom-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-harpy-selection-stinger-salvoes",
            "title": "Stinger salvoes",
            "aliases": [
              "Stinger salvoes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-harpy-profile-stinger-salvoes-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-harpy-selection-scything-wings",
            "title": "Scything wings",
            "aliases": [
              "Scything wings"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-harpy-profile-scything-wings-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-harpy-profile-twin-stranglethorn-cannon-ranged",
            "title": "Twin stranglethorn cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "2+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast, Twin-linked",
            "sourceSelectionIds": [
              "unit-harpy-selection-twin-stranglethorn-cannon"
            ]
          },
          {
            "id": "unit-harpy-profile-twin-heavy-venom-cannon-ranged-2",
            "title": "Twin heavy venom cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast, Twin-linked",
            "sourceSelectionIds": [
              "unit-harpy-selection-twin-heavy-venom-cannon"
            ]
          },
          {
            "id": "unit-harpy-profile-stinger-salvoes-ranged-3",
            "title": "Stinger salvoes",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-harpy-selection-stinger-salvoes"
            ]
          },
          {
            "id": "unit-harpy-profile-scything-wings-melee-4",
            "title": "Scything wings",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-harpy-selection-scything-wings"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-haruspex",
      "title": "Haruspex",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Haruspex",
        "Tyranids",
        "Harvester"
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
          "T": "11",
          "Sv": "3+",
          "W": "14",
          "Ld": "8+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-grisly-spectacle",
            "sectionId": "tyranids-ability-grisly-spectacle",
            "title": "Grisly Spectacle",
            "text": "Each time this model is selected to fight, after resolving its attacks, if one or more enemy units were destroyed by those attacks, each enemy unit within 6\" of this model must take a Battle-shock test.",
            "sourceUnitId": "unit-haruspex"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-haruspex"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-haruspex"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-haruspex"
          }
        ],
        "models": [
          {
            "id": "unit-haruspex-model-haruspex",
            "title": "Haruspex",
            "aliases": [
              "Haruspex"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-haruspex-selection-grasping-tongue",
            "title": "Grasping tongue",
            "aliases": [
              "Grasping tongue"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-haruspex-profile-grasping-tongue-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-haruspex-selection-shovelling-claws",
            "title": "Shovelling claws",
            "aliases": [
              "Shovelling claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-haruspex-profile-shovelling-claws-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-haruspex-selection-ravenous-maw",
            "title": "Ravenous maw",
            "aliases": [
              "Ravenous maw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-haruspex-profile-ravenous-maw-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-haruspex-profile-grasping-tongue-ranged",
            "title": "Grasping tongue",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-haruspex-selection-grasping-tongue"
            ]
          },
          {
            "id": "unit-haruspex-profile-shovelling-claws-melee-2",
            "title": "Shovelling claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "14",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-haruspex-selection-shovelling-claws"
            ]
          },
          {
            "id": "unit-haruspex-profile-ravenous-maw-melee-3",
            "title": "Ravenous maw",
            "mode": "melee",
            "range": "Melee",
            "a": "14",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-haruspex-selection-ravenous-maw"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hive-crone",
      "title": "Hive Crone",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Aircraft",
        "Monster",
        "Fly",
        "Great Devourer",
        "Hive Crone",
        "Tyranids",
        "Vanguard Invader"
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
          "T": "9",
          "Sv": "3+",
          "W": "12",
          "Ld": "8+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-airborne-predator",
            "sectionId": "tyranids-ability-airborne-predator",
            "title": "Airborne Predator",
            "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll.",
            "sourceUnitId": "unit-hive-crone"
          },
          {
            "id": "tyranids-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-hive-crone"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-hive-crone"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-hive-crone"
          }
        ],
        "models": [
          {
            "id": "unit-hive-crone-model-hive-crone",
            "title": "Hive Crone",
            "aliases": [
              "Hive Crone"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hive-crone-selection-drool-cannon",
            "title": "Drool cannon",
            "aliases": [
              "Drool cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-crone-profile-drool-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-crone-selection-tentaclids",
            "title": "Tentaclids",
            "aliases": [
              "Tentaclids"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-crone-profile-tentaclids-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-crone-selection-thorax-spur",
            "title": "Thorax spur",
            "aliases": [
              "Thorax spur"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-crone-profile-thorax-spur-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-crone-selection-scything-wings",
            "title": "Scything wings",
            "aliases": [
              "Scything wings"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-crone-profile-scything-wings-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hive-crone-selection-stinger-salvoes",
            "title": "Stinger salvoes",
            "aliases": [
              "Stinger salvoes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hive-crone-profile-stinger-salvoes-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hive-crone-profile-drool-cannon-ranged",
            "title": "Drool cannon",
            "mode": "ranged",
            "range": "12\"",
            "a": "2D6",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Torrent",
            "sourceSelectionIds": [
              "unit-hive-crone-selection-drool-cannon"
            ]
          },
          {
            "id": "unit-hive-crone-profile-tentaclids-ranged-2",
            "title": "Tentaclids",
            "mode": "ranged",
            "range": "36\"",
            "a": "4",
            "skill": "3+",
            "s": "7",
            "ap": "0",
            "d": "2",
            "abilities": "Anti-vehicle 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-hive-crone-selection-tentaclids"
            ]
          },
          {
            "id": "unit-hive-crone-profile-thorax-spur-melee-3",
            "title": "Thorax spur",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "3+",
            "s": "10",
            "ap": "-3",
            "d": "D6",
            "abilities": "Anti-fly 2+, Extra Attacks",
            "sourceSelectionIds": [
              "unit-hive-crone-selection-thorax-spur"
            ]
          },
          {
            "id": "unit-hive-crone-profile-scything-wings-melee-4",
            "title": "Scything wings",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hive-crone-selection-scything-wings"
            ]
          },
          {
            "id": "unit-hive-crone-profile-stinger-salvoes-ranged-5",
            "title": "Stinger salvoes",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hive-crone-selection-stinger-salvoes"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-maleceptor",
      "title": "Maleceptor",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Psyker",
        "Great Devourer",
        "Maleceptor",
        "Tyranids",
        "Synapse"
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
          "T": "11",
          "Sv": "3+",
          "W": "14",
          "Ld": "7+",
          "OC": "4",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-encephalic-diffusion-aura-psychic",
            "sectionId": "tyranids-ability-encephalic-diffusion-aura-psychic",
            "title": "Encephalic Diffusion (Aura, Psychic)",
            "text": "While an enemy unit is within 6\" of this model, each time a model in that unit makes an attack, subtract 1 from the Hit roll, and, if that enemy unit is Below Half-strength, subtract 1 from the Wound roll as well.",
            "sourceUnitId": "unit-maleceptor"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-maleceptor"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-maleceptor"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-maleceptor"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-maleceptor"
          }
        ],
        "models": [
          {
            "id": "unit-maleceptor-model-maleceptor",
            "title": "Maleceptor",
            "aliases": [
              "Maleceptor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-maleceptor-selection-massive-scything-talons-strike",
            "title": "➤ Massive scything talons - strike",
            "aliases": [
              "➤ Massive scything talons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maleceptor-profile-massive-scything-talons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-maleceptor-selection-massive-scything-talons-sweep",
            "title": "➤ Massive scything talons - sweep",
            "aliases": [
              "➤ Massive scything talons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maleceptor-profile-massive-scything-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-maleceptor-selection-psychic-overload",
            "title": "Psychic overload",
            "aliases": [
              "Psychic overload"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-maleceptor-profile-psychic-overload-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-maleceptor-weapon-family-massive-scything-talons-selection",
            "title": "➤ Massive scything talons",
            "aliases": [
              "➤ Massive scything talons"
            ],
            "kind": "weapon",
            "familyId": "unit-maleceptor-weapon-family-massive-scything-talons",
            "profileIds": [
              "unit-maleceptor-profile-massive-scything-talons-strike-melee",
              "unit-maleceptor-profile-massive-scything-talons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-maleceptor-weapon-family-massive-scything-talons",
            "title": "➤ Massive scything talons",
            "aliases": [
              "➤ Massive scything talons"
            ],
            "profileIds": [
              "unit-maleceptor-profile-massive-scything-talons-strike-melee",
              "unit-maleceptor-profile-massive-scything-talons-sweep-melee-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-maleceptor-profile-massive-scything-talons-strike-melee",
            "title": "➤ Massive scything talons - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-maleceptor-selection-massive-scything-talons-strike",
              "unit-maleceptor-weapon-family-massive-scything-talons-selection"
            ]
          },
          {
            "id": "unit-maleceptor-profile-massive-scything-talons-sweep-melee-2",
            "title": "➤ Massive scything talons - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-maleceptor-selection-massive-scything-talons-sweep",
              "unit-maleceptor-weapon-family-massive-scything-talons-selection"
            ]
          },
          {
            "id": "unit-maleceptor-profile-psychic-overload-ranged-3",
            "title": "Psychic overload",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast, Psychic",
            "sourceSelectionIds": [
              "unit-maleceptor-selection-psychic-overload"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-mawloc",
      "title": "Mawloc",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Mawloc",
        "Monster",
        "Great Devourer",
        "Tyranids",
        "Vanguard Invader"
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
          "W": "14",
          "Ld": "8+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-terror-from-the-deep",
            "sectionId": "tyranids-ability-terror-from-the-deep",
            "title": "Terror from the Deep",
            "text": "Each time this model is set up on the battlefield using the Deep Strike ability, roll one D6 for each enemy unit within 12\" of this model: on a 2-4, that unit suffers D3 mortal wounds; on a 5+, that unit suffers 3 mortal wounds and must take a Battle-shock test.",
            "sourceUnitId": "unit-mawloc"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-mawloc"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-mawloc"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-mawloc"
          }
        ],
        "models": [
          {
            "id": "unit-mawloc-model-mawloc",
            "title": "Mawloc",
            "aliases": [
              "Mawloc"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-mawloc-selection-distensible-jaw",
            "title": "Distensible jaw",
            "aliases": [
              "Distensible jaw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-mawloc-profile-distensible-jaw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-mawloc-selection-mawloc-scything-talons",
            "title": "Mawloc scything talons",
            "aliases": [
              "Mawloc scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-mawloc-profile-mawloc-scything-talons-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-mawloc-profile-distensible-jaw-melee",
            "title": "Distensible jaw",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "3",
            "abilities": "Anti-infantry 4+, Devastating Wounds, Extra Attacks",
            "sourceSelectionIds": [
              "unit-mawloc-selection-distensible-jaw"
            ]
          },
          {
            "id": "unit-mawloc-profile-mawloc-scything-talons-melee-2",
            "title": "Mawloc scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "16",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-mawloc-selection-mawloc-scything-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-norn-assimilator",
      "title": "Norn Assimilator",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Synapse",
        "Norn Assimilator",
        "Tyranids",
        "Harvester"
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
          "T": "11",
          "Sv": "2+",
          "W": "16",
          "Ld": "7+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-harpoon-barbs",
            "sectionId": "tyranids-ability-harpoon-barbs",
            "title": "Harpoon Barbs",
            "text": "Once per turn, when an enemy unit within Engagement Range of this model is selected to Fall Back, roll one D6: on a 2+, that unit suffers D6 mortal wounds.",
            "sourceUnitId": "unit-norn-assimilator"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-norn-assimilator"
          },
          {
            "id": "tyranids-ability-singular-purpose",
            "sectionId": "tyranids-ability-singular-purpose",
            "title": "Singular Purpose",
            "text": "At the start of the first battle round, select one of the following:\n- Select one enemy unit. Until the end of the battle, each time this model makes an attack that targets that unit you can re-roll the Hit roll and you can re-roll the Wound roll\n- Select one objective marker. Until the end of the battle, while this model is within range of that objective marker, it has the Feel No Pain 5+ ability and an Objective Control characteristic of 15.",
            "sourceUnitId": "unit-norn-assimilator"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-norn-assimilator"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-norn-assimilator"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-norn-assimilator"
          }
        ],
        "models": [
          {
            "id": "unit-norn-assimilator-model-norn-assimilator",
            "title": "Norn Assimilator",
            "aliases": [
              "Norn Assimilator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-norn-assimilator-selection-monstrous-scything-talons",
            "title": "Monstrous scything talons",
            "aliases": [
              "Monstrous scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-assimilator-profile-monstrous-scything-talons-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-assimilator-selection-toxinjector-harpoon",
            "title": "Toxinjector harpoon",
            "aliases": [
              "Toxinjector harpoon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-assimilator-profile-toxinjector-harpoon-melee-2",
              "unit-norn-assimilator-profile-toxinjector-harpoon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-norn-assimilator-profile-monstrous-scything-talons-melee",
            "title": "Monstrous scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-norn-assimilator-selection-monstrous-scything-talons"
            ]
          },
          {
            "id": "unit-norn-assimilator-profile-toxinjector-harpoon-melee-2",
            "title": "Toxinjector harpoon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-norn-assimilator-selection-toxinjector-harpoon"
            ]
          },
          {
            "id": "unit-norn-assimilator-profile-toxinjector-harpoon-ranged-3",
            "title": "Toxinjector harpoon",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Harpooned",
            "sourceSelectionIds": [
              "unit-norn-assimilator-selection-toxinjector-harpoon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-norn-emissary",
      "title": "Norn Emissary",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Psyker",
        "Great Devourer",
        "Tyranids",
        "Synapse",
        "Norn Emissary"
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
          "T": "11",
          "Sv": "2+",
          "W": "16",
          "Ld": "7+",
          "OC": "5",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tyranids-ability-singular-purpose",
            "sectionId": "tyranids-ability-singular-purpose",
            "title": "Singular Purpose",
            "text": "At the start of the first battle round, select one of the following:\n- Select one enemy unit. Until the end of the battle, each time this model makes an attack that targets that unit you can re-roll the Hit roll and you can re-roll the Wound roll\n- Select one objective marker. Until the end of the battle, while this model is within range of that objective marker, it has the Feel No Pain 5+ ability and an Objective Control characteristic of 15.",
            "sourceUnitId": "unit-norn-emissary"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-norn-emissary"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-norn-emissary"
          },
          {
            "id": "tyranids-ability-shadow-in-the-warp",
            "sectionId": "tyranids-ability-shadow-in-the-warp",
            "title": "Shadow in the Warp",
            "text": "If your Army Faction is TYRANIDS, once per battle, in either player’s Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6\" of one or more SYNAPSE units from your army, subtract 1 from that test.",
            "sourceUnitId": "unit-norn-emissary"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-norn-emissary"
          },
          {
            "id": "tyranids-ability-unnatural-resilience",
            "sectionId": "tyranids-ability-unnatural-resilience",
            "title": "Unnatural Resilience",
            "text": "This model has the Feel No Pain 4+ ability against mortal wounds.",
            "sourceUnitId": "unit-norn-emissary"
          }
        ],
        "models": [
          {
            "id": "unit-norn-emissary-model-norn-emissary",
            "title": "Norn Emissary",
            "aliases": [
              "Norn Emissary"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-norn-emissary-selection-monstrous-rending-claws",
            "title": "Monstrous rending claws",
            "aliases": [
              "Monstrous rending claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-emissary-profile-monstrous-rending-claws-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-emissary-selection-monstrous-scything-talons",
            "title": "Monstrous scything talons",
            "aliases": [
              "Monstrous scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-emissary-profile-monstrous-scything-talons-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-emissary-selection-psychic-tendril-neuroparasite",
            "title": "➤ Psychic tendril - neuroparasite",
            "aliases": [
              "➤ Psychic tendril - neuroparasite"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-emissary-profile-psychic-tendril-neuroparasite-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-emissary-selection-psychic-tendril-neurolance",
            "title": "➤ Psychic tendril - neurolance",
            "aliases": [
              "➤ Psychic tendril - neurolance"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-emissary-profile-psychic-tendril-neurolance-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-emissary-selection-psychic-tendril-neuroblast",
            "title": "➤ Psychic tendril - neuroblast",
            "aliases": [
              "➤ Psychic tendril - neuroblast"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-norn-emissary-profile-psychic-tendril-neuroblast-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-norn-emissary-weapon-family-psychic-tendril-selection",
            "title": "➤ Psychic tendril",
            "aliases": [
              "➤ Psychic tendril"
            ],
            "kind": "weapon",
            "familyId": "unit-norn-emissary-weapon-family-psychic-tendril",
            "profileIds": [
              "unit-norn-emissary-profile-psychic-tendril-neuroparasite-ranged-3",
              "unit-norn-emissary-profile-psychic-tendril-neurolance-ranged-4",
              "unit-norn-emissary-profile-psychic-tendril-neuroblast-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-norn-emissary-weapon-family-psychic-tendril",
            "title": "➤ Psychic tendril",
            "aliases": [
              "➤ Psychic tendril"
            ],
            "profileIds": [
              "unit-norn-emissary-profile-psychic-tendril-neuroparasite-ranged-3",
              "unit-norn-emissary-profile-psychic-tendril-neurolance-ranged-4",
              "unit-norn-emissary-profile-psychic-tendril-neuroblast-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-norn-emissary-profile-monstrous-rending-claws-melee",
            "title": "Monstrous rending claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-norn-emissary-selection-monstrous-rending-claws"
            ]
          },
          {
            "id": "unit-norn-emissary-profile-monstrous-scything-talons-melee-2",
            "title": "Monstrous scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-norn-emissary-selection-monstrous-scything-talons"
            ]
          },
          {
            "id": "unit-norn-emissary-profile-psychic-tendril-neuroparasite-ranged-3",
            "title": "➤ Psychic tendril - neuroparasite",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "D3",
            "abilities": "Precision, Psychic",
            "sourceSelectionIds": [
              "unit-norn-emissary-selection-psychic-tendril-neuroparasite",
              "unit-norn-emissary-weapon-family-psychic-tendril-selection"
            ]
          },
          {
            "id": "unit-norn-emissary-profile-psychic-tendril-neurolance-ranged-4",
            "title": "➤ Psychic tendril - neurolance",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6",
            "abilities": "Melta 2, Psychic",
            "sourceSelectionIds": [
              "unit-norn-emissary-selection-psychic-tendril-neurolance",
              "unit-norn-emissary-weapon-family-psychic-tendril-selection"
            ]
          },
          {
            "id": "unit-norn-emissary-profile-psychic-tendril-neuroblast-ranged-5",
            "title": "➤ Psychic tendril - neuroblast",
            "mode": "ranged",
            "range": "18\"",
            "a": "2D6",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Blast, Psychic",
            "sourceSelectionIds": [
              "unit-norn-emissary-selection-psychic-tendril-neuroblast",
              "unit-norn-emissary-weapon-family-psychic-tendril-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-psychophage",
      "title": "Psychophage",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Psychophage",
        "Tyranids",
        "Harvester",
        "Smoke"
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
          "Ld": "8+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-bio-stimulus",
            "sectionId": "tyranids-ability-bio-stimulus",
            "title": "Bio-stimulus",
            "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly TYRANIDS unit makes a melee attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn.",
            "sourceUnitId": "unit-psychophage"
          },
          {
            "id": "tyranids-ability-feeding-frenzy",
            "sectionId": "tyranids-ability-feeding-frenzy",
            "title": "Feeding Frenzy",
            "text": "Each time this model makes a melee attack that targets a unit that is below its Starting Strength, add 1 to the Hit roll. If that target is also Below Half strength, add 1 to the Wound roll as well.",
            "sourceUnitId": "unit-psychophage"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-psychophage"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-psychophage"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-psychophage"
          }
        ],
        "models": [
          {
            "id": "unit-psychophage-model-psychophage",
            "title": "Psychophage",
            "aliases": [
              "Psychophage"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-psychophage-selection-talons-and-betentacled-maw",
            "title": "Talons and betentacled maw",
            "aliases": [
              "Talons and betentacled maw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-psychophage-profile-talons-and-betentacled-maw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-psychophage-selection-psychoclastic-torrent",
            "title": "Psychoclastic torrent",
            "aliases": [
              "Psychoclastic torrent"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-psychophage-profile-psychoclastic-torrent-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-psychophage-profile-talons-and-betentacled-maw-melee",
            "title": "Talons and betentacled maw",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Psyker 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-psychophage-selection-talons-and-betentacled-maw"
            ]
          },
          {
            "id": "unit-psychophage-profile-psychoclastic-torrent-ranged-2",
            "title": "Psychoclastic torrent",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-psychophage-selection-psychoclastic-torrent"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-screamer-killer",
      "title": "Screamer-killer",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Screamer-killer",
        "Tyranids"
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
          "T": "9",
          "Sv": "2+",
          "W": "10",
          "Ld": "8+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-death-scream",
            "sectionId": "tyranids-ability-death-scream",
            "title": "Death Scream",
            "text": "In your Shooting phase, after this model has shot, select one unit hit by one or more of those attacks. That unit must take a Battle-shock test, subtracting 1 from that test.",
            "sourceUnitId": "unit-screamer-killer"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-screamer-killer"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-screamer-killer"
          }
        ],
        "models": [
          {
            "id": "unit-screamer-killer-model-screamer-killer",
            "title": "Screamer-killer",
            "aliases": [
              "Screamer-killer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-screamer-killer-selection-bio-plasmic-scream",
            "title": "Bio-plasmic scream",
            "aliases": [
              "Bio-plasmic scream"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-screamer-killer-profile-bio-plasmic-scream-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-screamer-killer-selection-screamer-killer-talons",
            "title": "Screamer-killer talons",
            "aliases": [
              "Screamer-killer talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-screamer-killer-profile-screamer-killer-talons-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-screamer-killer-profile-bio-plasmic-scream-ranged",
            "title": "Bio-plasmic scream",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6+3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "1",
            "abilities": "Assault, Blast",
            "sourceSelectionIds": [
              "unit-screamer-killer-selection-bio-plasmic-scream"
            ]
          },
          {
            "id": "unit-screamer-killer-profile-screamer-killer-talons-melee-2",
            "title": "Screamer-killer talons",
            "mode": "melee",
            "range": "Melee",
            "a": "10",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-screamer-killer-selection-screamer-killer-talons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sporocyst",
      "title": "Sporocyst",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Sporocyst",
        "Great Devourer",
        "Tyranids"
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
          "T": "10",
          "Sv": "3+",
          "W": "10",
          "Ld": "8+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-seed-mucolids",
            "sectionId": "tyranids-ability-seed-mucolids",
            "title": "Seed Mucolids",
            "text": "Once per turn, in your Shooting phase, when selected to shoot, one unit with this ability can use it instead of making any attacks with its ranged weapons. If it does, you can add one new MUCOLID SPORES unit containing 1 model to your army and set it up anywhere on the battlefield that is wholly within 18\" of this model and more than 8\" horizontally away from all enemy units.",
            "sourceUnitId": "unit-sporocyst"
          },
          {
            "id": "tyranids-ability-hive-defences",
            "sectionId": "tyranids-ability-hive-defences",
            "title": "Hive Defences",
            "text": "You can target this model with the Fire Overwatch stratagem for 0CP, and can do so even if you have already targeted a different unit with that stratagem this turn. This model can only be targeted with that Stratagem once per turn",
            "sourceUnitId": "unit-sporocyst"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-sporocyst"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-sporocyst"
          }
        ],
        "models": [
          {
            "id": "unit-sporocyst-model-sporocyst",
            "title": "Sporocyst",
            "aliases": [
              "Sporocyst"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sporocyst-selection-flensing-whips",
            "title": "Flensing whips",
            "aliases": [
              "Flensing whips"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sporocyst-profile-flensing-whips-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sporocyst-selection-sporocyst-bio-weapons",
            "title": "Sporocyst bio-weapons",
            "aliases": [
              "Sporocyst bio-weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sporocyst-profile-sporocyst-bio-weapons-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sporocyst-profile-flensing-whips-melee",
            "title": "Flensing whips",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sporocyst-selection-flensing-whips"
            ]
          },
          {
            "id": "unit-sporocyst-profile-sporocyst-bio-weapons-ranged-2",
            "title": "Sporocyst bio-weapons",
            "mode": "ranged",
            "range": "24\"",
            "a": "10",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sporocyst-selection-sporocyst-bio-weapons"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-toxicrene",
      "title": "Toxicrene",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Toxicrene",
        "Tyranids",
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
          "T": "11",
          "Sv": "3+",
          "W": "14",
          "Ld": "8+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-grasping-tendrils",
            "sectionId": "tyranids-ability-grasping-tendrils",
            "title": "Grasping Tendrils",
            "text": "Each time an enemy unit (excluding Titanic units) within Engagement Range of one or more units from your army with this ability is selected to Fall Back, you can roll one D6: on a 3+, that enemy unit must Remain Stationary instead.",
            "sourceUnitId": "unit-toxicrene"
          },
          {
            "id": "tyranids-ability-hypertoxic-miasma-aura",
            "sectionId": "tyranids-ability-hypertoxic-miasma-aura",
            "title": "Hypertoxic Miasma (Aura)",
            "text": "At the end of your Movement phase, roll one D6 for each enemy unit within 6\" of this model: on a 2-3, that unit suffers 1 mortal wound; on a 4-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D6 mortal wounds.",
            "sourceUnitId": "unit-toxicrene"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-toxicrene"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-toxicrene"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-toxicrene"
          }
        ],
        "models": [
          {
            "id": "unit-toxicrene-model-toxicrene",
            "title": "Toxicrene",
            "aliases": [
              "Toxicrene"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-toxicrene-selection-massive-toxic-lashes",
            "title": "Massive toxic lashes",
            "aliases": [
              "Massive toxic lashes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-toxicrene-profile-massive-toxic-lashes-melee",
              "unit-toxicrene-profile-massive-toxic-lashes-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-toxicrene-profile-massive-toxic-lashes-melee",
            "title": "Massive toxic lashes",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-infantry 2+",
            "sourceSelectionIds": [
              "unit-toxicrene-selection-massive-toxic-lashes"
            ]
          },
          {
            "id": "unit-toxicrene-profile-massive-toxic-lashes-ranged-2",
            "title": "Massive toxic lashes",
            "mode": "ranged",
            "range": "9\"",
            "a": "2D6",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-infantry 2+",
            "sourceSelectionIds": [
              "unit-toxicrene-selection-massive-toxic-lashes"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-trygon",
      "title": "Trygon",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Trygon",
        "Monster",
        "Great Devourer",
        "Tyranids",
        "Vanguard Invader"
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
          "W": "14",
          "Ld": "8+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-subterranean-tunnels",
            "sectionId": "tyranids-ability-subterranean-tunnels",
            "title": "Subterranean Tunnels",
            "text": "In your Movement phase, when this model is set up on the battlefield using the Deep Strike ability, it can use a subterranean tunnel. If it does, this model can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge.",
            "sourceUnitId": "unit-trygon"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-trygon"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-trygon"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-trygon"
          }
        ],
        "models": [
          {
            "id": "unit-trygon-model-trygon",
            "title": "Trygon",
            "aliases": [
              "Trygon"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-trygon-selection-trygon-scything-talons",
            "title": "Trygon scything talons",
            "aliases": [
              "Trygon scything talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-trygon-profile-trygon-scything-talons-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-trygon-selection-bio-electric-pulse",
            "title": "Bio-electric pulse",
            "aliases": [
              "Bio-electric pulse"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-trygon-profile-bio-electric-pulse-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-trygon-profile-trygon-scything-talons-melee",
            "title": "Trygon scything talons",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-trygon-selection-trygon-scything-talons"
            ]
          },
          {
            "id": "unit-trygon-profile-bio-electric-pulse-ranged-2",
            "title": "Bio-electric pulse",
            "mode": "ranged",
            "range": "12\"",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-trygon-selection-bio-electric-pulse"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tyrannofex",
      "title": "Tyrannofex",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Great Devourer",
        "Tyranids",
        "Tyrannofex",
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
          "T": "12",
          "Sv": "2+",
          "W": "16",
          "Ld": "8+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-resilient-organism",
            "sectionId": "tyranids-ability-resilient-organism",
            "title": "Resilient Organism",
            "text": "Once per battle, when an attack is allocated to this model, you can change the Damage characteristic of that attack to 0.",
            "sourceUnitId": "unit-tyrannofex"
          },
          {
            "id": "tyranids-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tyranids-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-tyrannofex"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tyrannofex"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-tyrannofex"
          }
        ],
        "models": [
          {
            "id": "unit-tyrannofex-model-tyrannofex",
            "title": "Tyrannofex",
            "aliases": [
              "Tyrannofex"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tyrannofex-selection-powerful-limbs",
            "title": "Powerful limbs",
            "aliases": [
              "Powerful limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannofex-profile-powerful-limbs-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrannofex-selection-rupture-cannon",
            "title": "Rupture cannon",
            "aliases": [
              "Rupture cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannofex-profile-rupture-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrannofex-selection-fleshborer-hive",
            "title": "Fleshborer hive",
            "aliases": [
              "Fleshborer hive"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannofex-profile-fleshborer-hive-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrannofex-selection-acid-spray",
            "title": "Acid spray",
            "aliases": [
              "Acid spray"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannofex-profile-acid-spray-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tyrannofex-selection-stinger-salvoes",
            "title": "Stinger salvoes",
            "aliases": [
              "Stinger salvoes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tyrannofex-profile-stinger-salvoes-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tyrannofex-profile-powerful-limbs-melee",
            "title": "Powerful limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "8",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrannofex-selection-powerful-limbs"
            ]
          },
          {
            "id": "unit-tyrannofex-profile-rupture-cannon-ranged-2",
            "title": "Rupture cannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "18",
            "ap": "-4",
            "d": "D6+6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-tyrannofex-selection-rupture-cannon"
            ]
          },
          {
            "id": "unit-tyrannofex-profile-fleshborer-hive-ranged-3",
            "title": "Fleshborer hive",
            "mode": "ranged",
            "range": "24\"",
            "a": "20",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Heavy, Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-tyrannofex-selection-fleshborer-hive"
            ]
          },
          {
            "id": "unit-tyrannofex-profile-acid-spray-ranged-4",
            "title": "Acid spray",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6+6",
            "skill": "N/A",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Torrent",
            "sourceSelectionIds": [
              "unit-tyrannofex-selection-acid-spray"
            ]
          },
          {
            "id": "unit-tyrannofex-profile-stinger-salvoes-ranged-5",
            "title": "Stinger salvoes",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tyrannofex-selection-stinger-salvoes"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-mucolid-spores",
      "title": "Mucolid Spores",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Mucolid Spores",
        "Beast",
        "Fly",
        "Great Devourer",
        "Tyranids"
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
          "M": "4\"",
          "T": "4",
          "Sv": "7+",
          "W": "3",
          "Ld": "8+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-bio-minefield",
            "sectionId": "tyranids-ability-bio-minefield",
            "title": "Bio-minefield",
            "text": "Enemy units cannot start or end an Advance move within 6\" of this unit.",
            "sourceUnitId": "unit-mucolid-spores"
          },
          {
            "id": "tyranids-ability-floating-death",
            "sectionId": "tyranids-ability-floating-death",
            "title": "Floating Death",
            "text": "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers D6 mortal wounds.",
            "sourceUnitId": "unit-mucolid-spores"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-mucolid-spores"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-mucolid-spores"
          }
        ],
        "models": [
          {
            "id": "unit-mucolid-spores-model-mucolid-spore",
            "title": "Mucolid Spore",
            "aliases": [
              "Mucolid Spore"
            ]
          }
        ],
        "selections": [],
        "weaponFamilies": [],
        "weaponProfiles": [],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-ripper-swarms",
      "title": "Ripper Swarms",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Ripper Swarm",
        "Swarm",
        "Great Devourer",
        "Tyranids",
        "Harvester"
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
          "T": "2",
          "Sv": "6+",
          "W": "4",
          "Ld": "8+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-chitinous-horrors-aura",
            "sectionId": "tyranids-ability-chitinous-horrors-aura",
            "title": "Chitinous Horrors (Aura)",
            "text": "While an enemy unit is within Engagement Range of this unit, halve the Objective Control characteristic of models in that enemy unit.",
            "sourceUnitId": "unit-ripper-swarms"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-ripper-swarms"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-ripper-swarms"
          }
        ],
        "models": [
          {
            "id": "unit-ripper-swarms-model-ripper-swarm",
            "title": "Ripper Swarm",
            "aliases": [
              "Ripper Swarm"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ripper-swarms-selection-spinemaws",
            "title": "Spinemaws",
            "aliases": [
              "Spinemaws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ripper-swarms-profile-spinemaws-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ripper-swarms-selection-chitinous-claws-and-teeth",
            "title": "Chitinous claws and teeth",
            "aliases": [
              "Chitinous claws and teeth"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ripper-swarms-profile-chitinous-claws-and-teeth-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-ripper-swarms-profile-spinemaws-ranged",
            "title": "Spinemaws",
            "mode": "ranged",
            "range": "6\"",
            "a": "4",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-ripper-swarms-selection-spinemaws"
            ]
          },
          {
            "id": "unit-ripper-swarms-profile-chitinous-claws-and-teeth-melee-2",
            "title": "Chitinous claws and teeth",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "5+",
            "s": "2",
            "ap": "0",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-ripper-swarms-selection-chitinous-claws-and-teeth"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-spore-mines",
      "title": "Spore Mines",
      "sourceBookId": "tyranids",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Spore Mines",
        "Beast",
        "Fly",
        "Great Devourer",
        "Tyranids"
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
          "M": "4\"",
          "T": "1",
          "Sv": "7+",
          "W": "1",
          "Ld": "8+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tyranids-ability-bio-minefield",
            "sectionId": "tyranids-ability-bio-minefield",
            "title": "Bio-minefield",
            "text": "Enemy units cannot start or end an Advance move within 6\" of this unit.",
            "sourceUnitId": "unit-spore-mines"
          },
          {
            "id": "tyranids-ability-floating-death-2",
            "sectionId": "tyranids-ability-floating-death-2",
            "title": "Floating Death",
            "text": "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds.",
            "sourceUnitId": "unit-spore-mines"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-spore-mines"
          },
          {
            "id": "tyranids-ability-synapse",
            "sectionId": "tyranids-ability-synapse",
            "title": "Synapse",
            "text": "If your Army Faction is TYRANIDS, while a TYRANIDS unit from your army is within 6\" of one or more friendly SYNAPSE models, that TYRANIDS unit is said to be within Synapse Range of that model and of your army. While a TYRANIDS unit from your army is within Synapse Range of your army:\n▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.\n▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
            "sourceUnitId": "unit-spore-mines"
          }
        ],
        "models": [
          {
            "id": "unit-spore-mines-model-spore-mine",
            "title": "Spore Mine",
            "aliases": [
              "Spore Mine"
            ]
          }
        ],
        "selections": [],
        "weaponFamilies": [],
        "weaponProfiles": [],
        "wargearAbilities": []
      }
    }
  ],
  "detachments": [
    {
      "id": "ambush-predators",
      "title": "Ambush Predators",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "assimilation-swarm",
      "title": "Assimilation Swarm",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "crusher-stampede",
      "title": "Crusher Stampede",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "invasion-fleet",
      "title": "Invasion Fleet",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "subterranean-assault",
      "title": "Subterranean Assault",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "synaptic-nexus",
      "title": "Synaptic Nexus",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "talons-of-the-norn-queen",
      "title": "Talons of the Norn Queen",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "unending-swarm",
      "title": "Unending Swarm",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "vanguard-onslaught",
      "title": "Vanguard Onslaught",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    },
    {
      "id": "warrior-bioform-onslaught",
      "title": "Warrior Bioform Onslaught",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": []
    }
  ],
  "detachmentRules": [],
  "enhancements": [
    {
      "id": "encircling-horrors",
      "title": "Encircling Horrors",
      "text": "NEUROLICTOR/LICTOR/VON RYAN’S LEAPERS unit only. In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, this unit can make a normal move of up to D3+3\".",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "tags": [
        "UPGRADE"
      ],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "ambush-predators",
      "sourceBookId": "tyranids",
      "legacyKey": "encircling-horrors"
    },
    {
      "id": "cryptophotaic-camouflage",
      "title": "Cryptophotaic Camouflage",
      "text": "VON RYAN’S LEAPERS unit only. This unit has -3\" detection range.",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "tags": [
        "UPGRADE"
      ],
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "ambush-predators",
      "sourceBookId": "tyranids",
      "legacyKey": "cryptophotaic-camouflage"
    },
    {
      "id": "enhancement-biophagic-flow-aura",
      "title": "Biophagic Flow (Aura)",
      "value": 10,
      "text": "TYRANIDS model only. While a friendly HARVESTER model is within 12\" of the bearer, when using the Feed the Swarm ability, that HARVESTER model can Regenerate one friendly TYRANIDS unit that is within 9\" of it, instead of one within 6\".",
      "detachmentId": "assimilation-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-biophagic-flow-aura"
    },
    {
      "id": "enhancement-instinctive-defense",
      "title": "Instinctive Defence",
      "value": 15,
      "text": "TYRANIDS model only. While the bearer is within 6\" of one or more friendly HARVESTER units, when you target this unit with the Heroic Intervention stratagem, that use is -1 CP. In addition, while the bearer is within 6\" of one or more friendly HARVESTER units, models in the bearer’s unit have the Fights First ability.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "assimilation-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-instinctive-defense"
    },
    {
      "id": "enhancement-parasitic-biomorphology",
      "title": "Parasitic Biomorphology",
      "value": 25,
      "text": "TYRANIDS model only. Add 1 to the Strength characteristic of melee weapons equipped by models in the bearer’s unit. The first time the bearer’s unit destroys an enemy unit in the Fight phase while the bearer is within 6\" of one or more friendly HARVESTER units, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer’s unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "assimilation-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-parasitic-biomorphology"
    },
    {
      "id": "enhancement-regenerating-monstrosity",
      "title": "Regenerating Monstrosity",
      "value": 20,
      "text": "TYRANIDS model only (excluding MONSTER models). The bearer’s unit can be regenerated up to twice per phase, instead of once.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "assimilation-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-regenerating-monstrosity"
    },
    {
      "id": "enhancement-enraged-reserves",
      "title": "Enraged Reserves",
      "value": 20,
      "text": "TYRANIDS MONSTER model only. If the bearer is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 3+, do not remove it from play. It can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "crusher-stampede",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-enraged-reserves"
    },
    {
      "id": "enhancement-monstrous-nemesis",
      "title": "Monstrous Nemesis",
      "value": 25,
      "text": "TYRANIDS MONSTER model only. Each time the bearer makes a melee attack that targets a MONSTER or VEHICLE unit, add 1 to the Wound roll.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "crusher-stampede",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-monstrous-nemesis"
    },
    {
      "id": "enhancement-null-nodules",
      "title": "Null Nodules",
      "value": 10,
      "text": "TYRANIDS MONSTER model only. Once per battle, when a Psychic Attack is allocated to the bearer, it can use this ability. If it does, until the end of the phase, the bearer has the Feel No Pain 5+ ability against Psychic Attacks.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "crusher-stampede",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-null-nodules"
    },
    {
      "id": "enhancement-ominous-presence",
      "title": "Ominous Presence",
      "value": 15,
      "text": "TYRANIDS MONSTER model only. Add 3 to the bearer’s Objective Control characteristic.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "crusher-stampede",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-ominous-presence"
    },
    {
      "id": "enhancement-adaptive-biology",
      "title": "Adaptive Biology",
      "value": 25,
      "text": "TYRANIDS model only. The bearer has the Feel No Pain 5+ ability. At the start of any turn, if the bearer has fewer than its starting number of wounds remaining, until the end of the battle, it has the Feel No Pain 4+ ability instead.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "invasion-fleet",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-adaptive-biology"
    },
    {
      "id": "enhancement-alien-cunning",
      "title": "Alien Cunning",
      "value": 30,
      "text": "TYRANIDS model only. After both players have deployed their armies, select up to three TYRANIDS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "invasion-fleet",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-alien-cunning"
    },
    {
      "id": "enhancement-perfectly-adapted",
      "title": "Perfectly Adapted",
      "value": 15,
      "text": "TYRANIDS model only. Once per turn, you can re-roll one Hit roll, one Wound roll, one Damage roll, one Advance roll, one Charge roll or one saving throw made for the bearer.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "invasion-fleet",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-perfectly-adapted"
    },
    {
      "id": "enhancement-synaptic-linchpin",
      "title": "Synaptic Linchpin",
      "value": 20,
      "text": "TYRANIDS model only. While a friendly TYRANIDS unit is within 9\" of the bearer, that unit is within Synapse Range of your army.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "invasion-fleet",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-synaptic-linchpin"
    },
    {
      "id": "synaptic-strategy",
      "title": "Synaptic Strategy",
      "text": "Tyranids model only. Once per battle, you can target the bearer’s unit with the Rapid Ingress stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "tags": [],
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "subterranean-assault",
      "sourceBookId": "tyranids",
      "legacyKey": "synaptic-strategy"
    },
    {
      "id": "tremor-senses",
      "title": "Tremor Senses",
      "text": "Tyranids model only. After both players have deployed their armies, select up to three friendly Tyranids units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "subterranean-assault",
      "sourceBookId": "tyranids",
      "legacyKey": "tremor-senses"
    },
    {
      "id": "vanguard-intellect",
      "title": "Vanguard Intellect",
      "text": "Tyranids model with the Deep Strike ability only. The bearer’s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "tags": [],
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "subterranean-assault",
      "sourceBookId": "tyranids",
      "legacyKey": "vanguard-intellect"
    },
    {
      "id": "trygon-prime",
      "title": "Trygon Prime",
      "text": "Trygon model only. The bearer gains the Synapse keyword. Improve the Strength and Weapon Skill characteristics of melee weapons equipped by the bearer by 1.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "subterranean-assault",
      "sourceBookId": "tyranids",
      "legacyKey": "trygon-prime"
    },
    {
      "id": "enhancement-power-of-the-hive-mind",
      "title": "Power of the Hive Mind",
      "value": 10,
      "text": "TYRANIDS PSYKER model only. Improve the Strength and Armour Penetration characteristics of psychic weapons equipped by the bearer by 1.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "synaptic-nexus",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-power-of-the-hive-mind"
    },
    {
      "id": "enhancement-psychostatic-disruption-aura",
      "title": "Psychostatic Disruption",
      "value": 30,
      "text": "TYRANIDS SYNAPSE model only. Enemy units that arrive on the battlefield from Reserves cannot be set up within 12\" of the bearer. In addition, once per battle, during the first or second battle round, when your opponent declares that a unit will arrive on the battlefield from Strategic Reserves, the bearer can use this Enhancement. If it does, roll one D6: on a 4+, that enemy unit cannot arrive on the battlefield this turn.",
      "detachmentId": "synaptic-nexus",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-psychostatic-disruption-aura"
    },
    {
      "id": "enhancement-synaptic-control",
      "title": "Synaptic Control",
      "value": 20,
      "text": "TYRANIDS SYNAPSE model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "synaptic-nexus",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-synaptic-control"
    },
    {
      "id": "enhancement-the-dirgeheart-of-kharis-aura",
      "title": "The Dirgeheart of Kharis (Aura)",
      "value": 15,
      "text": "TYRANIDS SYNAPSE model only. While an enemy unit is within 9\" of the bearer, worsen that unit’s Leadership characteristic by 1.",
      "detachmentId": "synaptic-nexus",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-the-dirgeheart-of-kharis-aura"
    },
    {
      "id": "destabilising-predation",
      "title": "Destabilising Predation",
      "text": "NORN EMISSARY unit only. This unit’s ranged attacks have [ANTI-CHARACTER 2+].",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "tags": [
        "UPGRADE"
      ],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "talons-of-the-norn-queen",
      "sourceBookId": "tyranids",
      "legacyKey": "destabilising-predation"
    },
    {
      "id": "synaptoprescience",
      "title": "Synaptoprescience",
      "text": "NORN ASSIMILATOR unit only. This unit has 4+ InSv.",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "tags": [
        "UPGRADE"
      ],
      "value": 25,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "talons-of-the-norn-queen",
      "sourceBookId": "tyranids",
      "legacyKey": "synaptoprescience"
    },
    {
      "id": "enhancement-adrenalised-onslaught",
      "title": "Adrenalised Onslaught",
      "value": 15,
      "text": "TYRANIDS model only. Each time the bearer’s unit Piles In or Consolidates, models in this unit can move an additional 3\".",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "unending-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-adrenalised-onslaught"
    },
    {
      "id": "enhancement-naturalised-camoflage",
      "title": "Naturalised Camouflage",
      "value": 30,
      "text": "TYRANIDS model only. At the start of the first battle round, select up to three friendly ENDLESS MULTITUDE units within 9\" of the bearer. Until the end of the battle round, each time a ranged attack targets one of those units, models in that unit have the Benefit of Cover against that attack.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "unending-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-naturalised-camoflage"
    },
    {
      "id": "enhancement-piercing-talons",
      "title": "Piercing Talons",
      "value": 25,
      "text": "TYRANIDS model only. Each time a model in the bearer’s unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "unending-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-piercing-talons"
    },
    {
      "id": "enhancement-relentless-hunger",
      "title": "Relentless Hunger",
      "value": 20,
      "text": "TYRANIDS model only. Add 2\" to the Move characteristic of models in the bearer’s unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "unending-swarm",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-relentless-hunger"
    },
    {
      "id": "enhancement-chameleonic",
      "title": "Chameleonic",
      "value": 15,
      "text": "VANGUARD INVADER model only. This unit has Stealth.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "vanguard-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-chameleonic"
    },
    {
      "id": "enhancement-hunting-grounds",
      "title": "Hunting Grounds",
      "value": 30,
      "text": "TYRANIDS model only. While the bearer is on the battlefield, each time your opponent sets up a Reserves unit on the battlefield, roll one D6: on a 2+, that unit must take a Battle-shock test.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "vanguard-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-hunting-grounds"
    },
    {
      "id": "enhancement-neuronode",
      "title": "Neuronode",
      "value": 20,
      "text": "TYRANIDS model only. After both players have deployed their armies, you can select up to three VANGUARD INVADER units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "vanguard-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-neuronode"
    },
    {
      "id": "enhancement-stalker",
      "title": "Stalker",
      "value": 10,
      "text": "VANGUARD INVADER model only. At the start of the battle, select one enemy unit. Each time the bearer makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "vanguard-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "enhancement-stalker"
    },
    {
      "id": "elevated-might",
      "title": "Elevated Might",
      "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This model’s melee attacks can re-roll wound rolls and have +1 AP.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "tags": [],
      "value": 30,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "warrior-bioform-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "elevated-might"
    },
    {
      "id": "ocular-adaptation",
      "title": "Ocular Adaptation",
      "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This unit’s melee attacks have +1 to hit rolls.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "tyranids-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tyranids",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "warrior-bioform-onslaught",
      "sourceBookId": "tyranids",
      "legacyKey": "ocular-adaptation"
    },
    {
      "title": "Encircling Horrors",
      "text": "NEUROLICTOR/LICTOR/VON RYAN’S LEAPERS unit only. In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, this unit can make a normal move of up to D3+3\".",
      "value": 20,
      "detachment": "Ambush Predators",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-lictor",
            "unit-neurolictor",
            "unit-von-ryans-leapers"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "encircling horrors",
      "legacyKey": "encircling horrors",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Cryptophotaic Camouflage",
      "text": "VON RYAN’S LEAPERS unit only. This unit has -3\" detection range.",
      "value": 15,
      "detachment": "Ambush Predators",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-von-ryans-leapers"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "cryptophotaic camouflage",
      "legacyKey": "cryptophotaic camouflage",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Biophagic Flow (Aura)",
      "text": "TYRANIDS model only. While a friendly HARVESTER model is within 12\" of the bearer, when using the Feed the Swarm ability, that HARVESTER model can Regenerate one friendly TYRANIDS unit that is within 9\" of it, instead of one within 6\".",
      "value": 10,
      "detachment": "Assimilation Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "biophagic flow aura",
      "legacyKey": "biophagic flow aura",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Instinctive Defence",
      "text": "TYRANIDS model only. While the bearer is within 6\" of one or more friendly HARVESTER units, when you target this unit with the Heroic Intervention stratagem, that use is -1 CP. In addition, while the bearer is within 6\" of one or more friendly HARVESTER units, models in the bearer’s unit have the Fights First ability.",
      "value": 15,
      "detachment": "Assimilation Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "instinctive defence",
      "legacyKey": "instinctive defence",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Parasitic Biomorphology",
      "text": "TYRANIDS model only. Add 1 to the Strength characteristic of melee weapons equipped by models in the bearer’s unit. The first time the bearer’s unit destroys an enemy unit in the Fight phase while the bearer is within 6\" of one or more friendly HARVESTER units, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer’s unit.",
      "value": 25,
      "detachment": "Assimilation Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "parasitic biomorphology",
      "legacyKey": "parasitic biomorphology",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Regenerating Monstrosity",
      "text": "TYRANIDS model only (excluding MONSTER models). The bearer’s unit can be regenerated up to twice per phase, instead of once.",
      "value": 20,
      "detachment": "Assimilation Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-parasite-of-mortrex",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "regenerating monstrosity",
      "legacyKey": "regenerating monstrosity",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Enraged Reserves",
      "text": "TYRANIDS MONSTER model only. If the bearer is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 3+, do not remove it from play. It can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.",
      "value": 20,
      "detachment": "Crusher Stampede",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-tervigon",
            "unit-winged-hive-tyrant"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "enraged reserves",
      "legacyKey": "enraged reserves",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Monstrous Nemesis",
      "text": "TYRANIDS MONSTER model only. Each time the bearer makes a melee attack that targets a MONSTER or VEHICLE unit, add 1 to the Wound roll.",
      "value": 25,
      "detachment": "Crusher Stampede",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-tervigon",
            "unit-winged-hive-tyrant"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "monstrous nemesis",
      "legacyKey": "monstrous nemesis",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Null Nodules",
      "text": "TYRANIDS MONSTER model only. Once per battle, when a Psychic Attack is allocated to the bearer, it can use this ability. If it does, until the end of the phase, the bearer has the Feel No Pain 5+ ability against Psychic Attacks.",
      "value": 10,
      "detachment": "Crusher Stampede",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-tervigon",
            "unit-winged-hive-tyrant"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "null nodules",
      "legacyKey": "null nodules",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Ominous Presence",
      "text": "TYRANIDS MONSTER model only. Add 3 to the bearer’s Objective Control characteristic.",
      "value": 15,
      "detachment": "Crusher Stampede",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-tervigon",
            "unit-winged-hive-tyrant"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "ominous presence",
      "legacyKey": "ominous presence",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Adaptive Biology",
      "text": "TYRANIDS model only. The bearer has the Feel No Pain 5+ ability. At the start of any turn, if the bearer has fewer than its starting number of wounds remaining, until the end of the battle, it has the Feel No Pain 4+ ability instead.",
      "value": 25,
      "detachment": "Invasion Fleet",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "adaptive biology",
      "legacyKey": "adaptive biology",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Alien Cunning",
      "text": "TYRANIDS model only. After both players have deployed their armies, select up to three TYRANIDS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "value": 30,
      "detachment": "Invasion Fleet",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "alien cunning",
      "legacyKey": "alien cunning",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Perfectly Adapted",
      "text": "TYRANIDS model only. Once per turn, you can re-roll one Hit roll, one Wound roll, one Damage roll, one Advance roll, one Charge roll or one saving throw made for the bearer.",
      "value": 15,
      "detachment": "Invasion Fleet",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "perfectly adapted",
      "legacyKey": "perfectly adapted",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Synaptic Linchpin",
      "text": "TYRANIDS model only. While a friendly TYRANIDS unit is within 9\" of the bearer, that unit is within Synapse Range of your army.",
      "value": 20,
      "detachment": "Invasion Fleet",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "synaptic linchpin",
      "legacyKey": "synaptic linchpin",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Synaptic Strategy",
      "text": "Tyranids model only. Once per battle, you can target the bearer’s unit with the Rapid Ingress stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
      "value": 15,
      "detachment": "Subterranean Assault",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime",
            "unit-trygon"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ],
          "allKeywords": [
            "CHARACTER"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "synaptic strategy",
      "legacyKey": "synaptic strategy",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Tremor Senses",
      "text": "Tyranids model only. After both players have deployed their armies, select up to three friendly Tyranids units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "value": 20,
      "detachment": "Subterranean Assault",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime",
            "unit-trygon"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ],
          "allKeywords": [
            "CHARACTER"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "tremor senses",
      "legacyKey": "tremor senses",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Vanguard Intellect",
      "text": "Tyranids model with the Deep Strike ability only. The bearer’s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
      "value": 15,
      "detachment": "Subterranean Assault",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-parasite-of-mortrex",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime",
            "unit-trygon"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ],
          "allKeywords": [
            "CHARACTER"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "vanguard intellect",
      "legacyKey": "vanguard intellect",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Trygon Prime",
      "text": "Trygon model only. The bearer gains the Synapse keyword. Improve the Strength and Weapon Skill characteristics of melee weapons equipped by the bearer by 1.",
      "value": 20,
      "detachment": "Subterranean Assault",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-trygon"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ],
          "allKeywords": [
            "CHARACTER"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "trygon prime",
      "legacyKey": "trygon prime",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Power of the Hive Mind",
      "text": "TYRANIDS PSYKER model only. Improve the Strength and Armour Penetration characteristics of psychic weapons equipped by the bearer by 1.",
      "value": 10,
      "detachment": "Synaptic Nexus",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-tervigon",
            "unit-winged-hive-tyrant"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "power of the hive mind",
      "legacyKey": "power of the hive mind",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Psychostatic Disruption",
      "text": "TYRANIDS SYNAPSE model only. Enemy units that arrive on the battlefield from Reserves cannot be set up within 12\" of the bearer. In addition, once per battle, during the first or second battle round, when your opponent declares that a unit will arrive on the battlefield from Strategic Reserves, the bearer can use this Enhancement. If it does, roll one D6: on a 4+, that enemy unit cannot arrive on the battlefield this turn.",
      "value": 30,
      "detachment": "Synaptic Nexus",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "psychostatic disruption",
      "legacyKey": "psychostatic disruption",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Synaptic Control",
      "text": "TYRANIDS SYNAPSE model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack.",
      "value": 20,
      "detachment": "Synaptic Nexus",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "synaptic control",
      "legacyKey": "synaptic control",
      "sourceBookId": "tyranids"
    },
    {
      "title": "The Dirgeheart of Kharis (Aura)",
      "text": "TYRANIDS SYNAPSE model only. While an enemy unit is within 9\" of the bearer, worsen that unit’s Leadership characteristic by 1.",
      "value": 15,
      "detachment": "Synaptic Nexus",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "the dirgeheart of kharis aura",
      "legacyKey": "the dirgeheart of kharis aura",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Destabilising Predation",
      "text": "NORN EMISSARY unit only. This unit’s ranged attacks have [ANTI-CHARACTER 2+].",
      "value": 20,
      "detachment": "Talons of the Norn Queen",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-norn-emissary"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "destabilising predation",
      "legacyKey": "destabilising predation",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Adrenalised Onslaught",
      "text": "TYRANIDS model only. Each time the bearer’s unit Piles In or Consolidates, models in this unit can move an additional 3\".",
      "value": 15,
      "detachment": "Unending Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "adrenalised onslaught",
      "legacyKey": "adrenalised onslaught",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Naturalised Camouflage",
      "text": "TYRANIDS model only. At the start of the first battle round, select up to three friendly ENDLESS MULTITUDE units within 9\" of the bearer. Until the end of the battle round, each time a ranged attack targets one of those units, models in that unit have the Benefit of Cover against that attack.",
      "value": 30,
      "detachment": "Unending Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "naturalised camouflage",
      "legacyKey": "naturalised camouflage",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Piercing Talons",
      "text": "TYRANIDS model only. Each time a model in the bearer’s unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.",
      "value": 25,
      "detachment": "Unending Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "piercing talons",
      "legacyKey": "piercing talons",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Relentless Hunger",
      "text": "TYRANIDS model only. Add 2\" to the Move characteristic of models in the bearer’s unit.",
      "value": 20,
      "detachment": "Unending Swarm",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "relentless hunger",
      "legacyKey": "relentless hunger",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Chameleonic",
      "text": "VANGUARD INVADER model only. This unit has Stealth.",
      "value": 15,
      "detachment": "Vanguard Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-parasite-of-mortrex",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "chameleonic",
      "legacyKey": "chameleonic",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Hunting Grounds",
      "text": "TYRANIDS model only. While the bearer is on the battlefield, each time your opponent sets up a Reserves unit on the battlefield, roll one D6: on a 2+, that unit must take a Battle-shock test.",
      "value": 30,
      "detachment": "Vanguard Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "hunting grounds",
      "legacyKey": "hunting grounds",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Neuronode",
      "text": "TYRANIDS model only. After both players have deployed their armies, you can select up to three VANGUARD INVADER units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "value": 20,
      "detachment": "Vanguard Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-hive-tyrant",
            "unit-neurotyrant",
            "unit-parasite-of-mortrex",
            "unit-tervigon",
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "neuronode",
      "legacyKey": "neuronode",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Stalker",
      "text": "VANGUARD INVADER model only. At the start of the battle, select one enemy unit. Each time the bearer makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll.",
      "value": 10,
      "detachment": "Vanguard Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-broodlord",
            "unit-parasite-of-mortrex",
            "unit-winged-hive-tyrant",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "stalker",
      "legacyKey": "stalker",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Elevated Might",
      "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This model’s melee attacks can re-roll wound rolls and have +1 AP.",
      "value": 30,
      "detachment": "Warrior Bioform Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "elevated might",
      "legacyKey": "elevated might",
      "sourceBookId": "tyranids"
    },
    {
      "title": "Ocular Adaptation",
      "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This unit’s melee attacks have +1 to hit rolls.",
      "value": 20,
      "detachment": "Warrior Bioform Onslaught",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-tyranid-prime-with-lash-whip",
            "unit-winged-tyranid-prime"
          ],
          "noneKeywords": [
            "EPIC HERO"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "ocular adaptation",
      "legacyKey": "ocular adaptation",
      "sourceBookId": "tyranids"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({
  "encircling horrors": {
    "title": "Encircling Horrors",
    "text": "NEUROLICTOR/LICTOR/VON RYAN’S LEAPERS unit only. In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, this unit can make a normal move of up to D3+3\".",
    "value": 20,
    "detachment": "Ambush Predators",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-lictor",
          "unit-neurolictor",
          "unit-von-ryans-leapers"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "cryptophotaic camouflage": {
    "title": "Cryptophotaic Camouflage",
    "text": "VON RYAN’S LEAPERS unit only. This unit has -3\" detection range.",
    "value": 15,
    "detachment": "Ambush Predators",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-von-ryans-leapers"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "biophagic flow aura": {
    "title": "Biophagic Flow (Aura)",
    "text": "TYRANIDS model only. While a friendly HARVESTER model is within 12\" of the bearer, when using the Feed the Swarm ability, that HARVESTER model can Regenerate one friendly TYRANIDS unit that is within 9\" of it, instead of one within 6\".",
    "value": 10,
    "detachment": "Assimilation Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "instinctive defence": {
    "title": "Instinctive Defence",
    "text": "TYRANIDS model only. While the bearer is within 6\" of one or more friendly HARVESTER units, when you target this unit with the Heroic Intervention stratagem, that use is -1 CP. In addition, while the bearer is within 6\" of one or more friendly HARVESTER units, models in the bearer’s unit have the Fights First ability.",
    "value": 15,
    "detachment": "Assimilation Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "parasitic biomorphology": {
    "title": "Parasitic Biomorphology",
    "text": "TYRANIDS model only. Add 1 to the Strength characteristic of melee weapons equipped by models in the bearer’s unit. The first time the bearer’s unit destroys an enemy unit in the Fight phase while the bearer is within 6\" of one or more friendly HARVESTER units, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer’s unit.",
    "value": 25,
    "detachment": "Assimilation Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "regenerating monstrosity": {
    "title": "Regenerating Monstrosity",
    "text": "TYRANIDS model only (excluding MONSTER models). The bearer’s unit can be regenerated up to twice per phase, instead of once.",
    "value": 20,
    "detachment": "Assimilation Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-parasite-of-mortrex",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "enraged reserves": {
    "title": "Enraged Reserves",
    "text": "TYRANIDS MONSTER model only. If the bearer is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 3+, do not remove it from play. It can fight after the attacking model’s unit has finished making its attacks, and is then removed from play.",
    "value": 20,
    "detachment": "Crusher Stampede",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-tervigon",
          "unit-winged-hive-tyrant"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "monstrous nemesis": {
    "title": "Monstrous Nemesis",
    "text": "TYRANIDS MONSTER model only. Each time the bearer makes a melee attack that targets a MONSTER or VEHICLE unit, add 1 to the Wound roll.",
    "value": 25,
    "detachment": "Crusher Stampede",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-tervigon",
          "unit-winged-hive-tyrant"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "null nodules": {
    "title": "Null Nodules",
    "text": "TYRANIDS MONSTER model only. Once per battle, when a Psychic Attack is allocated to the bearer, it can use this ability. If it does, until the end of the phase, the bearer has the Feel No Pain 5+ ability against Psychic Attacks.",
    "value": 10,
    "detachment": "Crusher Stampede",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-tervigon",
          "unit-winged-hive-tyrant"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "ominous presence": {
    "title": "Ominous Presence",
    "text": "TYRANIDS MONSTER model only. Add 3 to the bearer’s Objective Control characteristic.",
    "value": 15,
    "detachment": "Crusher Stampede",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-tervigon",
          "unit-winged-hive-tyrant"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "adaptive biology": {
    "title": "Adaptive Biology",
    "text": "TYRANIDS model only. The bearer has the Feel No Pain 5+ ability. At the start of any turn, if the bearer has fewer than its starting number of wounds remaining, until the end of the battle, it has the Feel No Pain 4+ ability instead.",
    "value": 25,
    "detachment": "Invasion Fleet",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "alien cunning": {
    "title": "Alien Cunning",
    "text": "TYRANIDS model only. After both players have deployed their armies, select up to three TYRANIDS units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
    "value": 30,
    "detachment": "Invasion Fleet",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "perfectly adapted": {
    "title": "Perfectly Adapted",
    "text": "TYRANIDS model only. Once per turn, you can re-roll one Hit roll, one Wound roll, one Damage roll, one Advance roll, one Charge roll or one saving throw made for the bearer.",
    "value": 15,
    "detachment": "Invasion Fleet",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "synaptic linchpin": {
    "title": "Synaptic Linchpin",
    "text": "TYRANIDS model only. While a friendly TYRANIDS unit is within 9\" of the bearer, that unit is within Synapse Range of your army.",
    "value": 20,
    "detachment": "Invasion Fleet",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "synaptic strategy": {
    "title": "Synaptic Strategy",
    "text": "Tyranids model only. Once per battle, you can target the bearer’s unit with the Rapid Ingress stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
    "value": 15,
    "detachment": "Subterranean Assault",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime",
          "unit-trygon"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ],
        "allKeywords": [
          "CHARACTER"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "tremor senses": {
    "title": "Tremor Senses",
    "text": "Tyranids model only. After both players have deployed their armies, select up to three friendly Tyranids units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
    "value": 20,
    "detachment": "Subterranean Assault",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime",
          "unit-trygon"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ],
        "allKeywords": [
          "CHARACTER"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "vanguard intellect": {
    "title": "Vanguard Intellect",
    "text": "Tyranids model with the Deep Strike ability only. The bearer’s unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
    "value": 15,
    "detachment": "Subterranean Assault",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-parasite-of-mortrex",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime",
          "unit-trygon"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ],
        "allKeywords": [
          "CHARACTER"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "trygon prime": {
    "title": "Trygon Prime",
    "text": "Trygon model only. The bearer gains the Synapse keyword. Improve the Strength and Weapon Skill characteristics of melee weapons equipped by the bearer by 1.",
    "value": 20,
    "detachment": "Subterranean Assault",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-trygon"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ],
        "allKeywords": [
          "CHARACTER"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "power of the hive mind": {
    "title": "Power of the Hive Mind",
    "text": "TYRANIDS PSYKER model only. Improve the Strength and Armour Penetration characteristics of psychic weapons equipped by the bearer by 1.",
    "value": 10,
    "detachment": "Synaptic Nexus",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-tervigon",
          "unit-winged-hive-tyrant"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "psychostatic disruption": {
    "title": "Psychostatic Disruption",
    "text": "TYRANIDS SYNAPSE model only. Enemy units that arrive on the battlefield from Reserves cannot be set up within 12\" of the bearer. In addition, once per battle, during the first or second battle round, when your opponent declares that a unit will arrive on the battlefield from Strategic Reserves, the bearer can use this Enhancement. If it does, roll one D6: on a 4+, that enemy unit cannot arrive on the battlefield this turn.",
    "value": 30,
    "detachment": "Synaptic Nexus",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "synaptic control": {
    "title": "Synaptic Control",
    "text": "TYRANIDS SYNAPSE model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack.",
    "value": 20,
    "detachment": "Synaptic Nexus",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "the dirgeheart of kharis aura": {
    "title": "The Dirgeheart of Kharis (Aura)",
    "text": "TYRANIDS SYNAPSE model only. While an enemy unit is within 9\" of the bearer, worsen that unit’s Leadership characteristic by 1.",
    "value": 15,
    "detachment": "Synaptic Nexus",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "destabilising predation": {
    "title": "Destabilising Predation",
    "text": "NORN EMISSARY unit only. This unit’s ranged attacks have [ANTI-CHARACTER 2+].",
    "value": 20,
    "detachment": "Talons of the Norn Queen",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-norn-emissary"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "synaptoprescience": {
    "title": "Synaptoprescience",
    "text": "NORN ASSIMILATOR unit only. This unit has 4+ InSv.",
    "value": 25,
    "detachment": "Talons of the Norn Queen",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-norn-assimilator"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "adrenalised onslaught": {
    "title": "Adrenalised Onslaught",
    "text": "TYRANIDS model only. Each time the bearer’s unit Piles In or Consolidates, models in this unit can move an additional 3\".",
    "value": 15,
    "detachment": "Unending Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "naturalised camouflage": {
    "title": "Naturalised Camouflage",
    "text": "TYRANIDS model only. At the start of the first battle round, select up to three friendly ENDLESS MULTITUDE units within 9\" of the bearer. Until the end of the battle round, each time a ranged attack targets one of those units, models in that unit have the Benefit of Cover against that attack.",
    "value": 30,
    "detachment": "Unending Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "piercing talons": {
    "title": "Piercing Talons",
    "text": "TYRANIDS model only. Each time a model in the bearer’s unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.",
    "value": 25,
    "detachment": "Unending Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "relentless hunger": {
    "title": "Relentless Hunger",
    "text": "TYRANIDS model only. Add 2\" to the Move characteristic of models in the bearer’s unit.",
    "value": 20,
    "detachment": "Unending Swarm",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "chameleonic": {
    "title": "Chameleonic",
    "text": "VANGUARD INVADER model only. This unit has Stealth.",
    "value": 15,
    "detachment": "Vanguard Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-parasite-of-mortrex",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "hunting grounds": {
    "title": "Hunting Grounds",
    "text": "TYRANIDS model only. While the bearer is on the battlefield, each time your opponent sets up a Reserves unit on the battlefield, roll one D6: on a 2+, that unit must take a Battle-shock test.",
    "value": 30,
    "detachment": "Vanguard Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "neuronode": {
    "title": "Neuronode",
    "text": "TYRANIDS model only. After both players have deployed their armies, you can select up to three VANGUARD INVADER units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
    "value": 20,
    "detachment": "Vanguard Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-hive-tyrant",
          "unit-neurotyrant",
          "unit-parasite-of-mortrex",
          "unit-tervigon",
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "stalker": {
    "title": "Stalker",
    "text": "VANGUARD INVADER model only. At the start of the battle, select one enemy unit. Each time the bearer makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll.",
    "value": 10,
    "detachment": "Vanguard Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-broodlord",
          "unit-parasite-of-mortrex",
          "unit-winged-hive-tyrant",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "elevated might": {
    "title": "Elevated Might",
    "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This model’s melee attacks can re-roll wound rolls and have +1 AP.",
    "value": 30,
    "detachment": "Warrior Bioform Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "ocular adaptation": {
    "title": "Ocular Adaptation",
    "text": "WINGED TYRANID PRIME/TYRANID PRIME WITH LASH WHIP model only. This unit’s melee attacks have +1 to hit rolls.",
    "value": 20,
    "detachment": "Warrior Bioform Onslaught",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-tyranid-prime-with-lash-whip",
          "unit-winged-tyranid-prime"
        ],
        "noneKeywords": [
          "EPIC HERO"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  }
});
