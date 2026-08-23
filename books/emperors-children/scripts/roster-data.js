window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "emperors-children",
    "title": "Emperor's Children",
    "factionKeyword": "EMPEROR'S CHILDREN",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-daemonettes",
      "title": "Daemonettes",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Daemonettes",
        "Legions of Excess",
        "Summoned"
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
        "models": [
          {
            "id": "unit-daemonettes-model-daemonette",
            "title": "Daemonette",
            "aliases": [
              "Daemonette"
            ]
          },
          {
            "id": "unit-daemonettes-model-alluress-2",
            "title": "Alluress",
            "aliases": [
              "Alluress"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-daemonettes-selection-slashing-claws",
            "title": "Slashing claws",
            "aliases": [
              "Slashing claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemonettes-profile-slashing-claws-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-daemonettes-selection-daemonic-icon",
            "title": "Daemonic Icon",
            "aliases": [
              "Daemonic Icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-daemonettes-wargear-ability-daemonic-icon"
            ]
          },
          {
            "id": "unit-daemonettes-selection-instrument-of-chaos",
            "title": "Instrument of Chaos",
            "aliases": [
              "Instrument of Chaos"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-daemonettes-wargear-ability-instrument-of-chaos-2"
            ]
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-daemonettes-profile-slashing-claws-melee",
            "title": "Slashing claws",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-daemonettes-selection-slashing-claws"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-daemonettes-wargear-ability-daemonic-icon",
            "title": "Daemonic Icon",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-daemonettes-wargear-ability-instrument-of-chaos-2",
            "title": "Instrument of Chaos",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-infractors",
      "title": "Infractors",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Chaos",
        "Slaanesh",
        "Infractors",
        "Emperor's Children"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lord-exultant"
          },
          {
            "unitId": "unit-sorcerer"
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
              "unitId": "unit-lord-exultant"
            },
            {
              "unitId": "unit-sorcerer"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-infractors-model-obsessionist",
            "title": "Obsessionist",
            "aliases": [
              "Obsessionist"
            ]
          },
          {
            "id": "unit-infractors-model-infractors-2",
            "title": "Infractors",
            "aliases": [
              "Infractors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-infractors-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-plasma-pistol-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-plasma-pistol-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-rapture-lash",
            "title": "Rapture lash",
            "aliases": [
              "Rapture lash"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-rapture-lash-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-power-sword",
            "title": "Power sword",
            "aliases": [
              "Power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-power-sword-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-duelling-sabre",
            "title": "Duelling sabre",
            "aliases": [
              "Duelling sabre"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infractors-profile-duelling-sabre-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infractors-selection-icon-of-excess",
            "title": "Icon of Excess",
            "aliases": [
              "Icon of Excess"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-infractors-wargear-ability-icon-of-excess"
            ]
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-infractors-profile-bolt-pistol-ranged",
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
              "unit-infractors-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-infractors-profile-plasma-pistol-standard-ranged-2",
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
              "unit-infractors-selection-plasma-pistol-standard"
            ]
          },
          {
            "id": "unit-infractors-profile-plasma-pistol-supercharge-ranged-3",
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
              "unit-infractors-selection-plasma-pistol-supercharge"
            ]
          },
          {
            "id": "unit-infractors-profile-rapture-lash-melee-4",
            "title": "Rapture lash",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-infractors-selection-rapture-lash"
            ]
          },
          {
            "id": "unit-infractors-profile-power-sword-melee-5",
            "title": "Power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-infractors-selection-power-sword"
            ]
          },
          {
            "id": "unit-infractors-profile-duelling-sabre-melee-6",
            "title": "Duelling sabre",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-infractors-selection-duelling-sabre"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-infractors-wargear-ability-icon-of-excess",
            "title": "Icon of Excess",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-tormentors",
      "title": "Tormentors",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Chaos",
        "Slaanesh",
        "Tormentors",
        "Emperor's Children"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lord-exultant"
          },
          {
            "unitId": "unit-sorcerer"
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
              "unitId": "unit-lord-exultant"
            },
            {
              "unitId": "unit-sorcerer"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-tormentors-model-obsessionist",
            "title": "Obsessionist",
            "aliases": [
              "Obsessionist"
            ]
          },
          {
            "id": "unit-tormentors-model-tormentors-2",
            "title": "Tormentors",
            "aliases": [
              "Tormentors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tormentors-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-plasma-pistol-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-plasma-pistol-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-rapture-lash",
            "title": "Rapture lash",
            "aliases": [
              "Rapture lash"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-rapture-lash-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-power-sword",
            "title": "Power sword",
            "aliases": [
              "Power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-power-sword-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-boltgun-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-close-combat-weapon-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-plasma-gun-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-plasma-gun-supercharge-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tormentors-profile-meltagun-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tormentors-selection-icon-of-excess",
            "title": "Icon of Excess",
            "aliases": [
              "Icon of Excess"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-tormentors-wargear-ability-icon-of-excess"
            ]
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-tormentors-profile-bolt-pistol-ranged",
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
              "unit-tormentors-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-tormentors-profile-plasma-pistol-standard-ranged-2",
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
              "unit-tormentors-selection-plasma-pistol-standard"
            ]
          },
          {
            "id": "unit-tormentors-profile-plasma-pistol-supercharge-ranged-3",
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
              "unit-tormentors-selection-plasma-pistol-supercharge"
            ]
          },
          {
            "id": "unit-tormentors-profile-rapture-lash-melee-4",
            "title": "Rapture lash",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tormentors-selection-rapture-lash"
            ]
          },
          {
            "id": "unit-tormentors-profile-power-sword-melee-5",
            "title": "Power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tormentors-selection-power-sword"
            ]
          },
          {
            "id": "unit-tormentors-profile-boltgun-ranged-6",
            "title": "Boltgun",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-tormentors-selection-boltgun"
            ]
          },
          {
            "id": "unit-tormentors-profile-close-combat-weapon-melee-7",
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
              "unit-tormentors-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-tormentors-profile-plasma-gun-standard-ranged-8",
            "title": "➤ Plasma gun - standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Precision, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-tormentors-selection-plasma-gun-standard"
            ]
          },
          {
            "id": "unit-tormentors-profile-plasma-gun-supercharge-ranged-9",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous, Precision, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-tormentors-selection-plasma-gun-supercharge"
            ]
          },
          {
            "id": "unit-tormentors-profile-meltagun-ranged-10",
            "title": "Meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Precision",
            "sourceSelectionIds": [
              "unit-tormentors-selection-meltagun"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-tormentors-wargear-ability-icon-of-excess",
            "title": "Icon of Excess",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-daemon-prince-of-slaanesh",
      "title": "Daemon Prince of Slaanesh",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Emperor's Children",
        "Monster",
        "Character",
        "Chaos",
        "Daemon",
        "Slaanesh",
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
        "models": [
          {
            "id": "unit-daemon-prince-of-slaanesh-model-daemon-prince-of-slaanesh",
            "title": "Daemon Prince of Slaanesh",
            "aliases": [
              "Daemon Prince of Slaanesh"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-daemon-prince-of-slaanesh-selection-hellforged-weapons-strike",
            "title": "➤ Hellforged weapons - strike",
            "aliases": [
              "➤ Hellforged weapons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-profile-hellforged-weapons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-selection-hellforged-weapons-sweep",
            "title": "➤ Hellforged weapons - sweep",
            "aliases": [
              "➤ Hellforged weapons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-selection-infernal-cannon",
            "title": "Infernal cannon",
            "aliases": [
              "Infernal cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-profile-infernal-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-daemon-prince-of-slaanesh-profile-hellforged-weapons-strike-melee",
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
              "unit-daemon-prince-of-slaanesh-selection-hellforged-weapons-strike"
            ]
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-profile-hellforged-weapons-sweep-melee-2",
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
              "unit-daemon-prince-of-slaanesh-selection-hellforged-weapons-sweep"
            ]
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-profile-infernal-cannon-ranged-3",
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
              "unit-daemon-prince-of-slaanesh-selection-infernal-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-daemon-prince-of-slaanesh-with-wings",
      "title": "Daemon Prince of Slaanesh with Wings",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Emperor's Children",
        "Monster",
        "Character",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Fly",
        "Daemon Prince with Wings"
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
        "models": [
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-model-daemon-prince-of-slaanesh-with-wings",
            "title": "Daemon Prince of Slaanesh with Wings",
            "aliases": [
              "Daemon Prince of Slaanesh with Wings"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-selection-hellforged-weapons-strike",
            "title": "➤ Hellforged weapons - strike",
            "aliases": [
              "➤ Hellforged weapons - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-with-wings-profile-hellforged-weapons-strike-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-selection-hellforged-weapons-sweep",
            "title": "➤ Hellforged weapons - sweep",
            "aliases": [
              "➤ Hellforged weapons - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-with-wings-profile-hellforged-weapons-sweep-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-selection-infernal-cannon",
            "title": "Infernal cannon",
            "aliases": [
              "Infernal cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-daemon-prince-of-slaanesh-with-wings-profile-infernal-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-profile-hellforged-weapons-strike-melee",
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
              "unit-daemon-prince-of-slaanesh-with-wings-selection-hellforged-weapons-strike"
            ]
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-profile-hellforged-weapons-sweep-melee-2",
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
              "unit-daemon-prince-of-slaanesh-with-wings-selection-hellforged-weapons-sweep"
            ]
          },
          {
            "id": "unit-daemon-prince-of-slaanesh-with-wings-profile-infernal-cannon-ranged-3",
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
              "unit-daemon-prince-of-slaanesh-with-wings-selection-infernal-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-keeper-of-secrets",
      "title": "Keeper of Secrets",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Character",
        "Psyker",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Legions of Excess",
        "Keeper of Secrets"
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
        "models": [
          {
            "id": "unit-keeper-of-secrets-model-keeper-of-secrets",
            "title": "Keeper of Secrets",
            "aliases": [
              "Keeper of Secrets"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-keeper-of-secrets-selection-phantasmagoria-witchfire",
            "title": "➤ Phantasmagoria - witchfire",
            "aliases": [
              "➤ Phantasmagoria - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-phantasmagoria-witchfire-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-phantasmagoria-focused-witchfire",
            "title": "➤ Phantasmagoria - focused witchfire",
            "aliases": [
              "➤ Phantasmagoria - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-phantasmagoria-focused-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-snapping-claws",
            "title": "Snapping claws",
            "aliases": [
              "Snapping claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-snapping-claws-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-witstealer-sword",
            "title": "Witstealer sword",
            "aliases": [
              "Witstealer sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-witstealer-sword-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-living-whip",
            "title": "Living whip",
            "aliases": [
              "Living whip"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-living-whip-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-ritual-knife",
            "title": "Ritual knife",
            "aliases": [
              "Ritual knife"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-keeper-of-secrets-profile-ritual-knife-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-keeper-of-secrets-selection-shining-aegis",
            "title": "Shining aegis",
            "aliases": [
              "Shining aegis"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-keeper-of-secrets-wargear-ability-shining-aegis"
            ]
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-keeper-of-secrets-profile-phantasmagoria-witchfire-ranged",
            "title": "➤ Phantasmagoria - witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Devastating Wounds, Psychic",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-phantasmagoria-witchfire"
            ]
          },
          {
            "id": "unit-keeper-of-secrets-profile-phantasmagoria-focused-witchfire-ranged-2",
            "title": "➤ Phantasmagoria - focused witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "9",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-phantasmagoria-focused-witchfire"
            ]
          },
          {
            "id": "unit-keeper-of-secrets-profile-snapping-claws-melee-3",
            "title": "Snapping claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "3",
            "abilities": "Devastating Wounds, Extra Attacks",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-snapping-claws"
            ]
          },
          {
            "id": "unit-keeper-of-secrets-profile-witstealer-sword-melee-4",
            "title": "Witstealer sword",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-witstealer-sword"
            ]
          },
          {
            "id": "unit-keeper-of-secrets-profile-living-whip-ranged-5",
            "title": "Living whip",
            "mode": "ranged",
            "range": "12\"",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-living-whip"
            ]
          },
          {
            "id": "unit-keeper-of-secrets-profile-ritual-knife-melee-6",
            "title": "Ritual knife",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-keeper-of-secrets-selection-ritual-knife"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-keeper-of-secrets-wargear-ability-shining-aegis",
            "title": "Shining aegis",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-lord-exultant",
      "title": "Lord Exultant",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Emperor's Children",
        "Infantry",
        "Grenades",
        "Chaos",
        "Slaanesh",
        "Lord Exultant"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-infractors"
          },
          {
            "unitId": "unit-tormentors"
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
              "unitId": "unit-infractors"
            },
            {
              "unitId": "unit-tormentors"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-lord-exultant-model-lord-exultant",
            "title": "Lord Exultant",
            "aliases": [
              "Lord Exultant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lord-exultant-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-rapture-lash",
            "title": "Rapture lash",
            "aliases": [
              "Rapture lash"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-rapture-lash-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-plasma-pistol-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-power-fist-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-phoenix-power-spear",
            "title": "Phoenix power spear",
            "aliases": [
              "Phoenix power spear"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-phoenix-power-spear-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-master-crafted-power-sword",
            "title": "Master-crafted power sword",
            "aliases": [
              "Master-crafted power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-master-crafted-power-sword-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-screamer-pistol",
            "title": "Screamer pistol",
            "aliases": [
              "Screamer pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-screamer-pistol-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-exultant-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-exultant-profile-bolt-pistol-ranged-9"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-lord-exultant-profile-close-combat-weapon-melee",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lord-exultant-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-rapture-lash-melee-2",
            "title": "Rapture lash",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-lord-exultant-selection-rapture-lash"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-plasma-pistol-standard-ranged-3",
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
              "unit-lord-exultant-selection-plasma-pistol-standard"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-plasma-pistol-supercharge-ranged-4",
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
              "unit-lord-exultant-selection-plasma-pistol-supercharge"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-power-fist-melee-5",
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
              "unit-lord-exultant-selection-power-fist"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-phoenix-power-spear-melee-6",
            "title": "Phoenix power spear",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Lance",
            "sourceSelectionIds": [
              "unit-lord-exultant-selection-phoenix-power-spear"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-master-crafted-power-sword-melee-7",
            "title": "Master-crafted power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-lord-exultant-selection-master-crafted-power-sword"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-screamer-pistol-ranged-8",
            "title": "Screamer pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-lord-exultant-selection-screamer-pistol"
            ]
          },
          {
            "id": "unit-lord-exultant-profile-bolt-pistol-ranged-9",
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
              "unit-lord-exultant-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lord-kakophonist",
      "title": "Lord Kakophonist",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Grenades",
        "Infantry",
        "Chaos",
        "Slaanesh",
        "Emperor's Children",
        "Lord Kakophonist"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-noise-marines"
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
              "unitId": "unit-noise-marines"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-lord-kakophonist-model-lord-kakophonist",
            "title": "Lord Kakophonist",
            "aliases": [
              "Lord Kakophonist"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lord-kakophonist-selection-power-sword",
            "title": "Power sword",
            "aliases": [
              "Power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-kakophonist-profile-power-sword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-kakophonist-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-kakophonist-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lord-kakophonist-selection-screamer-pistol",
            "title": "Screamer pistol",
            "aliases": [
              "Screamer pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lord-kakophonist-profile-screamer-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-lord-kakophonist-profile-power-sword-melee",
            "title": "Power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lord-kakophonist-selection-power-sword"
            ]
          },
          {
            "id": "unit-lord-kakophonist-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lord-kakophonist-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-lord-kakophonist-profile-screamer-pistol-ranged-3",
            "title": "Screamer pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-lord-kakophonist-selection-screamer-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sorcerer",
      "title": "Sorcerer",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Emperor's Children",
        "Character",
        "Infantry",
        "Psyker",
        "Chaos",
        "Slaanesh",
        "Grenades",
        "Sorcerer"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-infractors"
          },
          {
            "unitId": "unit-noise-marines"
          },
          {
            "unitId": "unit-tormentors"
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
              "unitId": "unit-infractors"
            },
            {
              "unitId": "unit-noise-marines"
            },
            {
              "unitId": "unit-tormentors"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "id": "unit-sorcerer-selection-agonising-energies-witchfire",
            "title": "Agonising Energies - witchfire",
            "aliases": [
              "Agonising Energies - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-agonising-energies-witchfire-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-selection-agonising-energies-focused-witchfire",
            "title": "Agonising Energies - focused witchfire",
            "aliases": [
              "Agonising Energies - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-agonising-energies-focused-witchfire-ranged-2"
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
              "unit-sorcerer-profile-force-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sorcerer-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sorcerer-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-sorcerer-profile-agonising-energies-witchfire-ranged",
            "title": "Agonising Energies - witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-agonising-energies-witchfire"
            ]
          },
          {
            "id": "unit-sorcerer-profile-agonising-energies-focused-witchfire-ranged-2",
            "title": "Agonising Energies - focused witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-agonising-energies-focused-witchfire"
            ]
          },
          {
            "id": "unit-sorcerer-profile-force-weapon-melee-3",
            "title": "Force weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-sorcerer-selection-force-weapon"
            ]
          },
          {
            "id": "unit-sorcerer-profile-bolt-pistol-ranged-4",
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
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-rhino",
      "title": "Chaos Rhino",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Transport",
        "Dedicated Transport",
        "Chaos",
        "Rhino",
        "Smoke",
        "Emperor's Children",
        "Slaanesh",
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
            "id": "unit-chaos-rhino-selection-armoured-tracks",
            "title": "Armoured tracks",
            "aliases": [
              "Armoured tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-armoured-tracks-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-rhino-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-rhino-profile-combi-bolter-ranged-2"
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
              "unit-chaos-rhino-profile-combi-weapon-ranged-3"
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
        "weaponProfiles": [
          {
            "id": "unit-chaos-rhino-profile-armoured-tracks-melee",
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
            "id": "unit-chaos-rhino-profile-combi-bolter-ranged-2",
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
            "id": "unit-chaos-rhino-profile-combi-weapon-ranged-3",
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
      "id": "unit-fulgrim",
      "title": "Fulgrim",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Emperor's Children",
        "Chaos",
        "Slaanesh",
        "Fulgrim",
        "Primarch",
        "Daemon",
        "Monster",
        "Fly",
        "Epic Hero",
        "Character",
        "Mobile"
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
        "models": [
          {
            "id": "unit-fulgrim-model-fulgrim",
            "title": "Fulgrim",
            "aliases": [
              "Fulgrim"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-fulgrim-selection-malefic-lash",
            "title": "Malefic lash",
            "aliases": [
              "Malefic lash"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fulgrim-profile-malefic-lash-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fulgrim-selection-serpentine-tail",
            "title": "Serpentine tail",
            "aliases": [
              "Serpentine tail"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fulgrim-profile-serpentine-tail-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fulgrim-selection-daemonic-blades-strike",
            "title": "➤ Daemonic blades - strike",
            "aliases": [
              "➤ Daemonic blades - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fulgrim-profile-daemonic-blades-strike-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-fulgrim-selection-daemonic-blades-sweep",
            "title": "➤ Daemonic blades - sweep",
            "aliases": [
              "➤ Daemonic blades - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fulgrim-profile-daemonic-blades-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-fulgrim-profile-malefic-lash-ranged",
            "title": "Malefic lash",
            "mode": "ranged",
            "range": "12\"",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-fulgrim-selection-malefic-lash"
            ]
          },
          {
            "id": "unit-fulgrim-profile-serpentine-tail-melee-2",
            "title": "Serpentine tail",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-fulgrim-selection-serpentine-tail"
            ]
          },
          {
            "id": "unit-fulgrim-profile-daemonic-blades-strike-melee-3",
            "title": "➤ Daemonic blades - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-fulgrim-selection-daemonic-blades-strike"
            ]
          },
          {
            "id": "unit-fulgrim-profile-daemonic-blades-sweep-melee-4",
            "title": "➤ Daemonic blades - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-fulgrim-selection-daemonic-blades-sweep"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lucius-the-eternal",
      "title": "Lucius the Eternal",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Epic Hero",
        "Chaos",
        "Slaanesh",
        "Emperor's Children",
        "Lucius the Eternal"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-flawless-blades"
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
              "unitId": "unit-flawless-blades"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-lucius-the-eternal-model-lucius-the-eternal",
            "title": "Lucius the Eternal",
            "aliases": [
              "Lucius the Eternal"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lucius-the-eternal-selection-blade-of-the-laer",
            "title": "Blade of the Laer",
            "aliases": [
              "Blade of the Laer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lucius-the-eternal-profile-blade-of-the-laer-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lucius-the-eternal-selection-lash-of-torment",
            "title": "Lash of Torment",
            "aliases": [
              "Lash of Torment"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lucius-the-eternal-profile-lash-of-torment-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-lucius-the-eternal-profile-blade-of-the-laer-melee",
            "title": "Blade of the Laer",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-lucius-the-eternal-selection-blade-of-the-laer"
            ]
          },
          {
            "id": "unit-lucius-the-eternal-profile-lash-of-torment-melee-2",
            "title": "Lash of Torment",
            "mode": "melee",
            "range": "Melee",
            "a": "10",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-lucius-the-eternal-selection-lash-of-torment"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-shalaxi-helbane",
      "title": "Shalaxi Helbane",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Monster",
        "Character",
        "Epic Hero",
        "Psyker",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Legions of Excess",
        "Shalaxi Helbane"
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
        "models": [
          {
            "id": "unit-shalaxi-helbane-model-shalaxi-helbane",
            "title": "Shalaxi Helbane",
            "aliases": [
              "Shalaxi Helbane"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-shalaxi-helbane-selection-lash-of-slaanesh",
            "title": "Lash of Slaanesh",
            "aliases": [
              "Lash of Slaanesh"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-shalaxi-helbane-profile-lash-of-slaanesh-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-shalaxi-helbane-selection-pavane-of-slaanesh-witchfire",
            "title": "➤ Pavane of Slaanesh - witchfire",
            "aliases": [
              "➤ Pavane of Slaanesh - witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-shalaxi-helbane-profile-pavane-of-slaanesh-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-shalaxi-helbane-selection-pavane-of-slaanesh-focused-witchfire",
            "title": "➤ Pavane of Slaanesh - focused witchfire",
            "aliases": [
              "➤ Pavane of Slaanesh - focused witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-shalaxi-helbane-profile-pavane-of-slaanesh-focused-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-shalaxi-helbane-selection-snapping-claws",
            "title": "Snapping claws",
            "aliases": [
              "Snapping claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-shalaxi-helbane-profile-snapping-claws-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-shalaxi-helbane-selection-soulpiercer",
            "title": "Soulpiercer",
            "aliases": [
              "Soulpiercer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-shalaxi-helbane-profile-soulpiercer-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-shalaxi-helbane-profile-lash-of-slaanesh-ranged",
            "title": "Lash of Slaanesh",
            "mode": "ranged",
            "range": "12\"",
            "a": "6",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-shalaxi-helbane-selection-lash-of-slaanesh"
            ]
          },
          {
            "id": "unit-shalaxi-helbane-profile-pavane-of-slaanesh-witchfire-ranged-2",
            "title": "➤ Pavane of Slaanesh - witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "2+",
            "s": "9",
            "ap": "-1",
            "d": "D3",
            "abilities": "Devastating Wounds, Psychic",
            "sourceSelectionIds": [
              "unit-shalaxi-helbane-selection-pavane-of-slaanesh-witchfire"
            ]
          },
          {
            "id": "unit-shalaxi-helbane-profile-pavane-of-slaanesh-focused-witchfire-ranged-3",
            "title": "➤ Pavane of Slaanesh - focused witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "2+",
            "s": "9",
            "ap": "-2",
            "d": "D3",
            "abilities": "Hazardous, Devastating Wounds, Psychic, Sustained Hits 3",
            "sourceSelectionIds": [
              "unit-shalaxi-helbane-selection-pavane-of-slaanesh-focused-witchfire"
            ]
          },
          {
            "id": "unit-shalaxi-helbane-profile-snapping-claws-melee-4",
            "title": "Snapping claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "3",
            "abilities": "Devastating Wounds, Extra Attacks",
            "sourceSelectionIds": [
              "unit-shalaxi-helbane-selection-snapping-claws"
            ]
          },
          {
            "id": "unit-shalaxi-helbane-profile-soulpiercer-melee-5",
            "title": "Soulpiercer",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6+2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-shalaxi-helbane-selection-soulpiercer"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-terminators",
      "title": "Chaos Terminators",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Chaos",
        "Terminator",
        "Emperor's Children",
        "Slaanesh",
        "Terminator Squad"
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
        "models": [
          {
            "id": "unit-chaos-terminators-model-terminator-champion",
            "title": "Terminator Champion",
            "aliases": [
              "Terminator Champion"
            ]
          },
          {
            "id": "unit-chaos-terminators-model-terminators-2",
            "title": "Terminators",
            "aliases": [
              "Terminators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaos-terminators-selection-combi-bolter",
            "title": "Combi-bolter",
            "aliases": [
              "Combi-bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-combi-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-accursed-weapon",
            "title": "Accursed weapon",
            "aliases": [
              "Accursed weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-accursed-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-combi-weapon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-chainfist",
            "title": "Chainfist",
            "aliases": [
              "Chainfist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-chainfist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-power-fist-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-paired-accursed-weapons",
            "title": "Paired accursed weapons",
            "aliases": [
              "Paired accursed weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-paired-accursed-weapons-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-heavy-flamer",
            "title": "Heavy flamer",
            "aliases": [
              "Heavy flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-heavy-flamer-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaos-terminators-selection-reaper-autocannon",
            "title": "Reaper autocannon",
            "aliases": [
              "Reaper autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaos-terminators-profile-reaper-autocannon-ranged-8"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chaos-terminators-profile-combi-bolter-ranged",
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
              "unit-chaos-terminators-selection-combi-bolter"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-accursed-weapon-melee-2",
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
              "unit-chaos-terminators-selection-accursed-weapon"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-combi-weapon-ranged-3",
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
              "unit-chaos-terminators-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-chainfist-melee-4",
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
              "unit-chaos-terminators-selection-chainfist"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-power-fist-melee-5",
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
              "unit-chaos-terminators-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-paired-accursed-weapons-melee-6",
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
              "unit-chaos-terminators-selection-paired-accursed-weapons"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-heavy-flamer-ranged-7",
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
              "unit-chaos-terminators-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-chaos-terminators-profile-reaper-autocannon-ranged-8",
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
              "unit-chaos-terminators-selection-reaper-autocannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-flawless-blades",
      "title": "Flawless Blades",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Chaos",
        "Slaanesh",
        "Flawless Blades",
        "Emperor's Children"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lucius-the-eternal"
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
              "unitId": "unit-lucius-the-eternal"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-flawless-blades-model-flawless-blade",
            "title": "Flawless Blade",
            "aliases": [
              "Flawless Blade"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-flawless-blades-selection-blissblade",
            "title": "Blissblade",
            "aliases": [
              "Blissblade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-flawless-blades-profile-blissblade-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-flawless-blades-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-flawless-blades-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-flawless-blades-profile-blissblade-melee",
            "title": "Blissblade",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-3",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-flawless-blades-selection-blissblade"
            ]
          },
          {
            "id": "unit-flawless-blades-profile-bolt-pistol-ranged-2",
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
              "unit-flawless-blades-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-noise-marines",
      "title": "Noise Marines",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Chaos",
        "Slaanesh",
        "Emperor's Children",
        "Noise Marines"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-lord-kakophonist"
          },
          {
            "unitId": "unit-sorcerer"
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
              "unitId": "unit-lord-kakophonist"
            },
            {
              "unitId": "unit-sorcerer"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "models": [
          {
            "id": "unit-noise-marines-model-disharmonist",
            "title": "Disharmonist",
            "aliases": [
              "Disharmonist"
            ]
          },
          {
            "id": "unit-noise-marines-model-noise-marines-2",
            "title": "Noise Marines",
            "aliases": [
              "Noise Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-noise-marines-selection-power-sword",
            "title": "Power sword",
            "aliases": [
              "Power sword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-power-sword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-noise-marines-selection-screamer-pistol",
            "title": "Screamer pistol",
            "aliases": [
              "Screamer pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-screamer-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-noise-marines-selection-sonic-blaster",
            "title": "Sonic blaster",
            "aliases": [
              "Sonic blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-sonic-blaster-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-noise-marines-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-noise-marines-selection-blastmaster-varied-frequency",
            "title": "➤ Blastmaster - varied frequency",
            "aliases": [
              "➤ Blastmaster - varied frequency"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-blastmaster-varied-frequency-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-noise-marines-selection-blastmaster-single-frequency",
            "title": "➤ Blastmaster - single frequency",
            "aliases": [
              "➤ Blastmaster - single frequency"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-noise-marines-profile-blastmaster-single-frequency-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-noise-marines-profile-power-sword-melee",
            "title": "Power sword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-noise-marines-selection-power-sword"
            ]
          },
          {
            "id": "unit-noise-marines-profile-screamer-pistol-ranged-2",
            "title": "Screamer pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-noise-marines-selection-screamer-pistol"
            ]
          },
          {
            "id": "unit-noise-marines-profile-sonic-blaster-ranged-3",
            "title": "Sonic blaster",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-noise-marines-selection-sonic-blaster"
            ]
          },
          {
            "id": "unit-noise-marines-profile-close-combat-weapon-melee-4",
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
              "unit-noise-marines-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-noise-marines-profile-blastmaster-varied-frequency-ranged-5",
            "title": "➤ Blastmaster - varied frequency",
            "mode": "ranged",
            "range": "18\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-noise-marines-selection-blastmaster-varied-frequency"
            ]
          },
          {
            "id": "unit-noise-marines-profile-blastmaster-single-frequency-ranged-6",
            "title": "➤ Blastmaster - single frequency",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-noise-marines-selection-blastmaster-single-frequency"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaos-land-raider",
      "title": "Chaos Land Raider",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Transport",
        "Smoke",
        "Chaos",
        "Slaanesh",
        "Emperor's Children",
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
      "id": "unit-chaos-spawn",
      "title": "Chaos Spawn",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Beast",
        "Chaos",
        "Emperor's Children",
        "Slaanesh",
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
      "id": "unit-defiler",
      "title": "Defiler",
      "sourceBookId": "emperors-children",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Emperor's Children",
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
            "id": "unit-defiler-selection-magma-cutters",
            "title": "Magma cutters",
            "aliases": [
              "Magma cutters"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-defiler-profile-magma-cutters-ranged-12"
            ],
            "wargearAbilityIds": []
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
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-defiler-selection-shearing-claws-strike"
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
              "unit-defiler-selection-shearing-claws-sweep"
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
              "unit-defiler-selection-heavy-missile-launcher-frag"
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
              "unit-defiler-selection-heavy-missile-launcher-krak"
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
            "id": "unit-defiler-profile-magma-cutters-ranged-12",
            "title": "Magma cutters",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-defiler-selection-magma-cutters"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-fiends",
      "title": "Fiends",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Beast",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Fiends",
        "Legions of Excess",
        "Summoned"
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
        "models": [
          {
            "id": "unit-fiends-model-fiends",
            "title": "Fiends",
            "aliases": [
              "Fiends"
            ]
          },
          {
            "id": "unit-fiends-model-blissbringer-2",
            "title": "Blissbringer",
            "aliases": [
              "Blissbringer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-fiends-selection-barbed-tail-and-dissecting-claws",
            "title": "Barbed tail and dissecting claws",
            "aliases": [
              "Barbed tail and dissecting claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fiends-profile-barbed-tail-and-dissecting-claws-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-fiends-profile-barbed-tail-and-dissecting-claws-melee",
            "title": "Barbed tail and dissecting claws",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-fiends-selection-barbed-tail-and-dissecting-claws"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-heldrake",
      "title": "Heldrake",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Chaos",
        "Daemon",
        "Heldrake",
        "Emperor's Children",
        "Slaanesh"
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
      "id": "unit-maulerfiend",
      "title": "Maulerfiend",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Chaos",
        "Daemon",
        "Emperor's Children",
        "Slaanesh",
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
      "id": "unit-seekers",
      "title": "Seekers",
      "sourceBookId": "emperors-children",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Mounted",
        "Chaos",
        "Daemon",
        "Slaanesh",
        "Seekers",
        "Summoned",
        "Legions of Excess"
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
        "models": [
          {
            "id": "unit-seekers-model-seeker",
            "title": "Seeker",
            "aliases": [
              "Seeker"
            ]
          },
          {
            "id": "unit-seekers-model-heartseeker-2",
            "title": "Heartseeker",
            "aliases": [
              "Heartseeker"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-seekers-selection-lashing-tongues",
            "title": "Lashing tongues",
            "aliases": [
              "Lashing tongues"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-seekers-profile-lashing-tongues-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-seekers-selection-slashing-claws",
            "title": "Slashing claws",
            "aliases": [
              "Slashing claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-seekers-profile-slashing-claws-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-seekers-selection-daemonic-icon",
            "title": "Daemonic Icon",
            "aliases": [
              "Daemonic Icon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-seekers-wargear-ability-daemonic-icon"
            ]
          },
          {
            "id": "unit-seekers-selection-instrument-of-chaos",
            "title": "Instrument of Chaos",
            "aliases": [
              "Instrument of Chaos"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-seekers-wargear-ability-instrument-of-chaos-2"
            ]
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-seekers-profile-lashing-tongues-melee",
            "title": "Lashing tongues",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Extra Attacks, Lethal Hits",
            "sourceSelectionIds": [
              "unit-seekers-selection-lashing-tongues"
            ]
          },
          {
            "id": "unit-seekers-profile-slashing-claws-melee-2",
            "title": "Slashing claws",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-seekers-selection-slashing-claws"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-seekers-wargear-ability-daemonic-icon",
            "title": "Daemonic Icon",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-seekers-wargear-ability-instrument-of-chaos-2",
            "title": "Instrument of Chaos",
            "requiredSelectionIds": []
          }
        ]
      }
    }
  ],
  "detachments": [
    {
      "id": "carnival-of-excess",
      "title": "Carnival of Excess",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "coterie-of-the-conceited",
      "title": "Coterie of the Conceited",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "court-of-the-phoenician",
      "title": "Court of the Phoenician",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "elegant-brutes",
      "title": "Elegant Brutes",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "frenzied-host",
      "title": "Frenzied Host",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "mercurial-host",
      "title": "Mercurial Host",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "peerless-bladesmen",
      "title": "Peerless Bladesmen",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "rapid-evisceration",
      "title": "Rapid Evisceration",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "slaaneshs-chosen",
      "title": "SLAANESH’S CHOSEN",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "spectacle-of-slaughter",
      "title": "Spectacle of Slaughter",
      "sourceBookId": "emperors-children",
      "chapterRestriction": null,
      "keywordGrants": []
    }
  ],
  "enhancements": [
    {
      "id": "enhancement-empyric-suffusion",
      "title": "Empyric Suffusion",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. When you target this unit with the Heroic Intervention stratagem, that use is -1 CP.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "carnival-of-excess",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-empyric-suffusion"
    },
    {
      "id": "enhancement-dark-blessings",
      "title": "Dark Blessings",
      "value": 10,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, just after an enemy unit has selected its targets, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer has a 3+ invulnerable save.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "carnival-of-excess",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-dark-blessings"
    },
    {
      "id": "enhancement-possessed-blade",
      "title": "Possessed Blade",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. At the start of the battle, select one melee weapon equipped by the bearer; add 1 to the Attacks characteristic of that weapon. In addition, each time the bearer is selected to fight, it can use this Enhancement. If it does, while resolving those attacks, add 1 to the Damage characteristic of that weapon and that weapon has the [devastating wounds] and [hazardous] abilities.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "carnival-of-excess",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-possessed-blade"
    },
    {
      "id": "enhancement-warp-walker",
      "title": "Warp Walker",
      "value": 30,
      "text": "EMPEROR’S CHILDREN or KEEPER OF SECRETS model only. Each time the bearer’s unit Advances, do not make an Advance roll . Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "carnival-of-excess",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-warp-walker"
    },
    {
      "id": "enhancement-pledge-of-eternal-servitude",
      "title": "Pledge of Eternal Servitude",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. The first time the bearer is destroyed, take a Leadership test for the bearer at the end of the phase. If that test is passed, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with D6 wounds remaining (up to its Wounds characteristic).",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "coterie-of-the-conceited",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-pledge-of-eternal-servitude"
    },
    {
      "id": "enhancement-pledge-of-dark-glory",
      "title": "Pledge of Dark Glory",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. While the bearer is leading a unit, improve the Leadership and Objective Control characteristics of models in that unit by 1.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "coterie-of-the-conceited",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-pledge-of-dark-glory"
    },
    {
      "id": "enhancement-pledge-of-mortal-pain",
      "title": "Pledge of Mortal Pain",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. At the start of your Shooting phase , select one enemy unit within 12\" of and visible to the bearer. That unit must take a Leadership test , subtracting 2 from the result if it is Battle-shocked : if failed, that enemy unit suffers 3 mortal wounds .",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "coterie-of-the-conceited",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-pledge-of-mortal-pain"
    },
    {
      "id": "enhancement-pledge-of-unholy-fortune",
      "title": "Pledge of Unholy Fortune",
      "value": 30,
      "text": "EMPEROR’S CHILDREN model only. Once per turn, just after making a Hit roll , a Wound roll or a saving throw for a model in the bearer’s unit, if the bearer is not Battle-shocked , it can use this Enhancement. If it does, treat the result as an unmodified roll of 6 instead.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "coterie-of-the-conceited",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-pledge-of-unholy-fortune"
    },
    {
      "id": "tears-of-the-phoenix",
      "title": "Tears of the Phoenix",
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a melee attack, you can ignore any or all modifiers to that attack’s Weapon Skill characteristic and any or all modifiers to the Hit roll and Wound roll.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "value": 25,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "court-of-the-phoenician",
      "sourceBookId": "emperors-children",
      "legacyKey": "tears-of-the-phoenix"
    },
    {
      "id": "exalted-patron",
      "title": "Exalted Patron",
      "text": "LORD EXULTANT model only. Add 1\" to the Move characteristic of the bearer.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "court-of-the-phoenician",
      "sourceBookId": "emperors-children",
      "legacyKey": "exalted-patron"
    },
    {
      "id": "soulstain-made-manifest",
      "title": "Soulstain Made Manifest",
      "text": "EMPEROR’S CHILDREN model only. At the start of the Fight phase, you can select one enemy unit within Engagement Range of the bearer; that unit must take a Battle-shock test, subtracting 1 from the result.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "court-of-the-phoenician",
      "sourceBookId": "emperors-children",
      "legacyKey": "soulstain-made-manifest"
    },
    {
      "id": "spiritsliver",
      "title": "Spiritsliver",
      "text": "EMPEROR’S CHILDREN DAEMON PRINCE model only. Add 1 to the Strength and Attacks characteristics of the bearer’s melee weapons.",
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "court-of-the-phoenician",
      "sourceBookId": "emperors-children",
      "legacyKey": "spiritsliver"
    },
    {
      "id": "cacophonic-accompaniment",
      "title": "Cacophonic Accompaniment",
      "text": "LORD KAKOPHONIST model only. This model has Deep Strike. This unit’s ranged attacks have [IGNORES COVER].",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "elegant-brutes",
      "sourceBookId": "emperors-children",
      "legacyKey": "cacophonic-accompaniment"
    },
    {
      "id": "frenzied-ferocity",
      "title": "Frenzied Ferocity",
      "kind": "upgrade",
      "text": "EMPEROR’S CHILDREN TERMINATOR SQUAD unit only. This unit’s attacks have [SUSTAINED HITS 1].",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "elegant-brutes",
      "sourceBookId": "emperors-children",
      "legacyKey": "frenzied-ferocity"
    },
    {
      "id": "euphoric-crown",
      "title": "Euphoric Crown",
      "text": "LORD EXULTANT model only. This model’s melee attacks have +1 S.",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "frenzied-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "euphoric-crown"
    },
    {
      "id": "howling-plate",
      "title": "Howling Plate",
      "text": "LORD EXULTANT model only. This unit’s ranged attacks have +1 AP.",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "frenzied-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "howling-plate"
    },
    {
      "id": "enhancement-steeped-in-suffering",
      "title": "Steeped in Suffering",
      "value": 20,
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes an attack that targets an enemy unit below its Starting Strength , add 1 to the Hit roll . If that target is also Below Half-strength , add 1 to the Wound roll as well.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "mercurial-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-steeped-in-suffering"
    },
    {
      "id": "enhancement-intoxicating-musk",
      "title": "Intoxicating Musk",
      "value": 20,
      "text": "EMPEROR’S CHILDREN model only. Each time a melee attack targets the bearer’s unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll .",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "mercurial-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-intoxicating-musk"
    },
    {
      "id": "enhancement-tactical-perfection",
      "title": "Tactical Perfection",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. After both players have deployed their armies, select up to two EMPEROR’S CHILDREN units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "mercurial-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-tactical-perfection"
    },
    {
      "id": "enhancement-loathsome-dexterity",
      "title": "Loathsome Dexterity",
      "value": 10,
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "mercurial-host",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-loathsome-dexterity"
    },
    {
      "id": "enhancement-faultless-opportunist",
      "title": "Faultless Opportunist",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. You can target this unit with the Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do: That use is -1 CP. That use does not prevent any uses of that stratagem on other units this phase.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "peerless-bladesmen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-faultless-opportunist"
    },
    {
      "id": "enhancement-blinding-speed",
      "title": "Blinding Speed",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. Once per battle, at the start of the Fight phase , the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "peerless-bladesmen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-blinding-speed"
    },
    {
      "id": "enhancement-distortion",
      "title": "Distortion",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. Add 1 to the Attacks and Damage characteristics of melee weapons equipped by the bearer.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "peerless-bladesmen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-distortion"
    },
    {
      "id": "enhancement-rise-to-the-challenge",
      "title": "Rise to the Challenge",
      "value": 30,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, at the end of the Fight phase , if the bearer is within Engagement Range of three or more enemy models, it can use this Enhancement. If it does, the bearer can fight one additional time. When doing so, you can select one ability using the Exquisite Swordsmanship Detachment rule to apply to those attacks.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "peerless-bladesmen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-rise-to-the-challenge"
    },
    {
      "id": "enhancement-sublime-prescience",
      "title": "Sublime Prescience",
      "value": 25,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your Movement phase , the bearer can use this Enhancement. If it does, select one friendly EMPEROR’S CHILDREN TRANSPORT that is in Strategic Reserves . Until the end of the phase, for the purposes of setting up that TRANSPORT on the battlefield, treat the current battle round number as being one higher than it actually is.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "rapid-evisceration",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-sublime-prescience"
    },
    {
      "id": "enhancement-spearhead-striker",
      "title": "Spearhead Striker",
      "value": 20,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Each time the bearer disembarks from a TRANSPORT , until the end of the turn, you can re-roll Charge rolls made for the bearer’s unit and enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "rapid-evisceration",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-spearhead-striker"
    },
    {
      "id": "enhancement-accomplished-tactician",
      "title": "Accomplished Tactician",
      "value": 35,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your opponent’s Shooting phase , just after an enemy unit has shot, you can select one friendly EMPEROR’S CHILDREN unit within 9\" of the bearer that was hit by one or more of those attacks, then select one friendly TRANSPORT that unit is wholly within 6\" of and is able to embark within. That EMPEROR’S CHILDREN unit can embark within that Transport.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "rapid-evisceration",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-accomplished-tactician"
    },
    {
      "id": "enhancement-heretek-adept",
      "title": "Heretek Adept",
      "value": 35,
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle round , when a saving throw is failed for a friendly EMPEROR’S CHILDREN VEHICLE model within 6\" of the bearer, you can change the Damage characteristic of that attack to 0.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "rapid-evisceration",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-heretek-adept"
    },
    {
      "id": "enhancement-eager-to-prove",
      "title": "Eager to Prove",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. You can re-roll Charge rolls made for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 2\" to the Move characteristic of models in that unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "slaaneshs-chosen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-eager-to-prove"
    },
    {
      "id": "enhancement-repulsed-by-weakness",
      "title": "Repulsed by Weakness",
      "value": 25,
      "text": "EMPEROR’S CHILDREN model only. Each time an enemy unit (excluding MONSTERS and VEHICLES ) within Engagement Range of the bearer’s unit Falls Back , models in that enemy unit must take Desperate Escape tests . When doing so, if the bearer’s unit is your army’s Favoured Champions , subtract 1 from each of those Desperate Escape tests.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "slaaneshs-chosen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-repulsed-by-weakness"
    },
    {
      "id": "enhancement-proud-and-vainglorious",
      "title": "Proud and Vainglorious",
      "value": 20,
      "text": "EMPEROR’S CHILDREN model only. You can re-roll Battle-shock and Leadership tests taken for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 1 to the Objective Control characteristic of models in that unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "slaaneshs-chosen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-proud-and-vainglorious"
    },
    {
      "id": "enhancement-slayer-of-champions",
      "title": "Slayer of Champions",
      "value": 15,
      "text": "EMPEROR’S CHILDREN model only. The bearer’s melee weapons have the [PRECISION] ability, and each time the bearer makes a melee attack that targets a CHARACTER unit, improve the Strength and Armour Penetration characteristics of that attack by 1.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "slaaneshs-chosen",
      "sourceBookId": "emperors-children",
      "legacyKey": "enhancement-slayer-of-champions"
    },
    {
      "id": "eager-patrons",
      "title": "Eager Patrons",
      "kind": "upgrade",
      "text": "FLAWLESS BLADES unit only. This unit has +2\" M.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "spectacle-of-slaughter",
      "sourceBookId": "emperors-children",
      "legacyKey": "eager-patrons"
    },
    {
      "id": "beguiling-grotesquerie",
      "title": "Beguiling Grotesquerie",
      "kind": "upgrade",
      "text": "FLAWLESS BLADES unit only. Enemy units cannot target this unit with snap shooting attacks.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "emperors-children-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/emperors-children",
        "verifiedAt": "2026-08-09"
      },
      "detachmentId": "spectacle-of-slaughter",
      "sourceBookId": "emperors-children",
      "legacyKey": "beguiling-grotesquerie"
    },
    {
      "title": "Empyric Suffusion",
      "text": "EMPEROR’S CHILDREN model only. When you target this unit with the Heroic Intervention stratagem, that use is -1 CP.",
      "value": 15,
      "detachment": "Carnival of Excess",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "empyric suffusion",
      "legacyKey": "empyric suffusion",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Dark Blessings",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, just after an enemy unit has selected its targets, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer has a 3+ invulnerable save.",
      "value": 10,
      "detachment": "Carnival of Excess",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "dark blessings",
      "legacyKey": "dark blessings",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Possessed Blade",
      "text": "EMPEROR’S CHILDREN model only. At the start of the battle, select one melee weapon equipped by the bearer; add 1 to the Attacks characteristic of that weapon. In addition, each time the bearer is selected to fight, it can use this Enhancement. If it does, while resolving those attacks, add 1 to the Damage characteristic of that weapon and that weapon has the [devastating wounds] and [hazardous] abilities.",
      "value": 25,
      "detachment": "Carnival of Excess",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "possessed blade",
      "legacyKey": "possessed blade",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Warp Walker",
      "text": "EMPEROR’S CHILDREN or KEEPER OF SECRETS model only. Each time the bearer’s unit Advances, do not make an Advance roll . Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      "value": 30,
      "detachment": "Carnival of Excess",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "warp walker",
      "legacyKey": "warp walker",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Pledge of Eternal Servitude",
      "text": "EMPEROR’S CHILDREN model only. The first time the bearer is destroyed, take a Leadership test for the bearer at the end of the phase. If that test is passed, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with D6 wounds remaining (up to its Wounds characteristic).",
      "value": 25,
      "detachment": "Coterie of the Conceited",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "pledge of eternal servitude",
      "legacyKey": "pledge of eternal servitude",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Pledge of Dark Glory",
      "text": "EMPEROR’S CHILDREN model only. While the bearer is leading a unit, improve the Leadership and Objective Control characteristics of models in that unit by 1.",
      "value": 25,
      "detachment": "Coterie of the Conceited",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "pledge of dark glory",
      "legacyKey": "pledge of dark glory",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Pledge of Mortal Pain",
      "text": "EMPEROR’S CHILDREN model only. At the start of your Shooting phase , select one enemy unit within 12\" of and visible to the bearer. That unit must take a Leadership test , subtracting 2 from the result if it is Battle-shocked : if failed, that enemy unit suffers 3 mortal wounds .",
      "value": 15,
      "detachment": "Coterie of the Conceited",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "pledge of mortal pain",
      "legacyKey": "pledge of mortal pain",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Pledge of Unholy Fortune",
      "text": "EMPEROR’S CHILDREN model only. Once per turn, just after making a Hit roll , a Wound roll or a saving throw for a model in the bearer’s unit, if the bearer is not Battle-shocked , it can use this Enhancement. If it does, treat the result as an unmodified roll of 6 instead.",
      "value": 30,
      "detachment": "Coterie of the Conceited",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "pledge of unholy fortune",
      "legacyKey": "pledge of unholy fortune",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Tears of the Phoenix",
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a melee attack, you can ignore any or all modifiers to that attack’s Weapon Skill characteristic and any or all modifiers to the Hit roll and Wound roll.",
      "value": 25,
      "detachment": "Court of the Phoenician",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "tears of the phoenix",
      "legacyKey": "tears of the phoenix",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Exalted Patron",
      "text": "LORD EXULTANT model only. Add 1\" to the Move characteristic of the bearer.",
      "value": 15,
      "detachment": "Court of the Phoenician",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-exultant"
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
      "id": "exalted patron",
      "legacyKey": "exalted patron",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Soulstain Made Manifest",
      "text": "EMPEROR’S CHILDREN model only. At the start of the Fight phase, you can select one enemy unit within Engagement Range of the bearer; that unit must take a Battle-shock test, subtracting 1 from the result.",
      "value": 15,
      "detachment": "Court of the Phoenician",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "soulstain made manifest",
      "legacyKey": "soulstain made manifest",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Cacophonic Accompaniment",
      "text": "LORD KAKOPHONIST model only. This model has Deep Strike. This unit’s ranged attacks have [IGNORES COVER].",
      "value": 20,
      "detachment": "Elegant Brutes",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-kakophonist"
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
      "id": "cacophonic accompaniment",
      "legacyKey": "cacophonic accompaniment",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Frenzied Ferocity",
      "text": "EMPEROR’S CHILDREN TERMINATOR SQUAD unit only. This unit’s attacks have [SUSTAINED HITS 1].",
      "value": null,
      "detachment": "Elegant Brutes",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-chaos-terminators"
          ],
          "noneKeywords": []
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "frenzied ferocity",
      "legacyKey": "frenzied ferocity",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Euphoric Crown",
      "text": "LORD EXULTANT model only. This model’s melee attacks have +1 S.",
      "value": 20,
      "detachment": "Frenzied Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-exultant"
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
      "id": "euphoric crown",
      "legacyKey": "euphoric crown",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Howling Plate",
      "text": "LORD EXULTANT model only. This unit’s ranged attacks have +1 AP.",
      "value": 20,
      "detachment": "Frenzied Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-lord-exultant"
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
      "id": "howling plate",
      "legacyKey": "howling plate",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Steeped in Suffering",
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes an attack that targets an enemy unit below its Starting Strength , add 1 to the Hit roll . If that target is also Below Half-strength , add 1 to the Wound roll as well.",
      "value": 20,
      "detachment": "Mercurial Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "steeped in suffering",
      "legacyKey": "steeped in suffering",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Intoxicating Musk",
      "text": "EMPEROR’S CHILDREN model only. Each time a melee attack targets the bearer’s unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll .",
      "value": 20,
      "detachment": "Mercurial Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "intoxicating musk",
      "legacyKey": "intoxicating musk",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Tactical Perfection",
      "text": "EMPEROR’S CHILDREN model only. After both players have deployed their armies, select up to two EMPEROR’S CHILDREN units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "value": 15,
      "detachment": "Mercurial Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "tactical perfection",
      "legacyKey": "tactical perfection",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Loathsome Dexterity",
      "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      "value": 10,
      "detachment": "Mercurial Host",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "loathsome dexterity",
      "legacyKey": "loathsome dexterity",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Faultless Opportunist",
      "text": "EMPEROR’S CHILDREN model only. You can target this unit with the Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do: That use is -1 CP. That use does not prevent any uses of that stratagem on other units this phase.",
      "value": 15,
      "detachment": "Peerless Bladesmen",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "faultless opportunist",
      "legacyKey": "faultless opportunist",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Blinding Speed",
      "text": "EMPEROR’S CHILDREN model only. Once per battle, at the start of the Fight phase , the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.",
      "value": 25,
      "detachment": "Peerless Bladesmen",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "blinding speed",
      "legacyKey": "blinding speed",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Distortion",
      "text": "EMPEROR’S CHILDREN model only. Add 1 to the Attacks and Damage characteristics of melee weapons equipped by the bearer.",
      "value": 25,
      "detachment": "Peerless Bladesmen",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "distortion",
      "legacyKey": "distortion",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Rise to the Challenge",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, at the end of the Fight phase , if the bearer is within Engagement Range of three or more enemy models, it can use this Enhancement. If it does, the bearer can fight one additional time. When doing so, you can select one ability using the Exquisite Swordsmanship Detachment rule to apply to those attacks.",
      "value": 30,
      "detachment": "Peerless Bladesmen",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "rise to the challenge",
      "legacyKey": "rise to the challenge",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Sublime Prescience",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your Movement phase , the bearer can use this Enhancement. If it does, select one friendly EMPEROR’S CHILDREN TRANSPORT that is in Strategic Reserves . Until the end of the phase, for the purposes of setting up that TRANSPORT on the battlefield, treat the current battle round number as being one higher than it actually is.",
      "value": 25,
      "detachment": "Rapid Evisceration",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "sublime prescience",
      "legacyKey": "sublime prescience",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Spearhead Striker",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Each time the bearer disembarks from a TRANSPORT , until the end of the turn, you can re-roll Charge rolls made for the bearer’s unit and enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit.",
      "value": 20,
      "detachment": "Rapid Evisceration",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "spearhead striker",
      "legacyKey": "spearhead striker",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Accomplished Tactician",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your opponent’s Shooting phase , just after an enemy unit has shot, you can select one friendly EMPEROR’S CHILDREN unit within 9\" of the bearer that was hit by one or more of those attacks, then select one friendly TRANSPORT that unit is wholly within 6\" of and is able to embark within. That EMPEROR’S CHILDREN unit can embark within that Transport.",
      "value": 35,
      "detachment": "Rapid Evisceration",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "accomplished tactician",
      "legacyKey": "accomplished tactician",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Heretek Adept",
      "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle round , when a saving throw is failed for a friendly EMPEROR’S CHILDREN VEHICLE model within 6\" of the bearer, you can change the Damage characteristic of that attack to 0.",
      "value": 35,
      "detachment": "Rapid Evisceration",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "heretek adept",
      "legacyKey": "heretek adept",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Eager to Prove",
      "text": "EMPEROR’S CHILDREN model only. You can re-roll Charge rolls made for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 2\" to the Move characteristic of models in that unit.",
      "value": 15,
      "detachment": "SLAANESH’S CHOSEN",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "eager to prove",
      "legacyKey": "eager to prove",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Repulsed by Weakness",
      "text": "EMPEROR’S CHILDREN model only. Each time an enemy unit (excluding MONSTERS and VEHICLES ) within Engagement Range of the bearer’s unit Falls Back , models in that enemy unit must take Desperate Escape tests . When doing so, if the bearer’s unit is your army’s Favoured Champions , subtract 1 from each of those Desperate Escape tests.",
      "value": 25,
      "detachment": "SLAANESH’S CHOSEN",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "repulsed by weakness",
      "legacyKey": "repulsed by weakness",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Proud and Vainglorious",
      "text": "EMPEROR’S CHILDREN model only. You can re-roll Battle-shock and Leadership tests taken for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 1 to the Objective Control characteristic of models in that unit.",
      "value": 20,
      "detachment": "SLAANESH’S CHOSEN",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "proud and vainglorious",
      "legacyKey": "proud and vainglorious",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Slayer of Champions",
      "text": "EMPEROR’S CHILDREN model only. The bearer’s melee weapons have the [PRECISION] ability, and each time the bearer makes a melee attack that targets a CHARACTER unit, improve the Strength and Armour Penetration characteristics of that attack by 1.",
      "value": 15,
      "detachment": "SLAANESH’S CHOSEN",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-daemon-prince-of-slaanesh",
            "unit-daemon-prince-of-slaanesh-with-wings",
            "unit-lord-exultant",
            "unit-lord-kakophonist",
            "unit-sorcerer"
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
      "id": "slayer of champions",
      "legacyKey": "slayer of champions",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Eager Patrons",
      "text": "FLAWLESS BLADES unit only. This unit has +2\" M.",
      "value": null,
      "detachment": "Spectacle of Slaughter",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-flawless-blades"
          ],
          "noneKeywords": []
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "eager patrons",
      "legacyKey": "eager patrons",
      "sourceBookId": "emperors-children"
    },
    {
      "title": "Beguiling Grotesquerie",
      "text": "FLAWLESS BLADES unit only. Enemy units cannot target this unit with snap shooting attacks.",
      "value": null,
      "detachment": "Spectacle of Slaughter",
      "tags": [
        "UPGRADE"
      ],
      "owner": {
        "subject": "unit",
        "selector": {
          "unitIds": [
            "unit-flawless-blades"
          ],
          "noneKeywords": []
        }
      },
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "id": "beguiling grotesquerie",
      "legacyKey": "beguiling grotesquerie",
      "sourceBookId": "emperors-children"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({
  "empyric suffusion": {
    "title": "Empyric Suffusion",
    "text": "EMPEROR’S CHILDREN model only. When you target this unit with the Heroic Intervention stratagem, that use is -1 CP.",
    "value": 15,
    "detachment": "Carnival of Excess",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "dark blessings": {
    "title": "Dark Blessings",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, just after an enemy unit has selected its targets, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer has a 3+ invulnerable save.",
    "value": 10,
    "detachment": "Carnival of Excess",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "possessed blade": {
    "title": "Possessed Blade",
    "text": "EMPEROR’S CHILDREN model only. At the start of the battle, select one melee weapon equipped by the bearer; add 1 to the Attacks characteristic of that weapon. In addition, each time the bearer is selected to fight, it can use this Enhancement. If it does, while resolving those attacks, add 1 to the Damage characteristic of that weapon and that weapon has the [devastating wounds] and [hazardous] abilities.",
    "value": 25,
    "detachment": "Carnival of Excess",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "warp walker": {
    "title": "Warp Walker",
    "text": "EMPEROR’S CHILDREN or KEEPER OF SECRETS model only. Each time the bearer’s unit Advances, do not make an Advance roll . Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
    "value": 30,
    "detachment": "Carnival of Excess",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "pledge of eternal servitude": {
    "title": "Pledge of Eternal Servitude",
    "text": "EMPEROR’S CHILDREN model only. The first time the bearer is destroyed, take a Leadership test for the bearer at the end of the phase. If that test is passed, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with D6 wounds remaining (up to its Wounds characteristic).",
    "value": 25,
    "detachment": "Coterie of the Conceited",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "pledge of dark glory": {
    "title": "Pledge of Dark Glory",
    "text": "EMPEROR’S CHILDREN model only. While the bearer is leading a unit, improve the Leadership and Objective Control characteristics of models in that unit by 1.",
    "value": 25,
    "detachment": "Coterie of the Conceited",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "pledge of mortal pain": {
    "title": "Pledge of Mortal Pain",
    "text": "EMPEROR’S CHILDREN model only. At the start of your Shooting phase , select one enemy unit within 12\" of and visible to the bearer. That unit must take a Leadership test , subtracting 2 from the result if it is Battle-shocked : if failed, that enemy unit suffers 3 mortal wounds .",
    "value": 15,
    "detachment": "Coterie of the Conceited",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "pledge of unholy fortune": {
    "title": "Pledge of Unholy Fortune",
    "text": "EMPEROR’S CHILDREN model only. Once per turn, just after making a Hit roll , a Wound roll or a saving throw for a model in the bearer’s unit, if the bearer is not Battle-shocked , it can use this Enhancement. If it does, treat the result as an unmodified roll of 6 instead.",
    "value": 30,
    "detachment": "Coterie of the Conceited",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "tears of the phoenix": {
    "title": "Tears of the Phoenix",
    "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a melee attack, you can ignore any or all modifiers to that attack’s Weapon Skill characteristic and any or all modifiers to the Hit roll and Wound roll.",
    "value": 25,
    "detachment": "Court of the Phoenician",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "exalted patron": {
    "title": "Exalted Patron",
    "text": "LORD EXULTANT model only. Add 1\" to the Move characteristic of the bearer.",
    "value": 15,
    "detachment": "Court of the Phoenician",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-lord-exultant"
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
  "soulstain made manifest": {
    "title": "Soulstain Made Manifest",
    "text": "EMPEROR’S CHILDREN model only. At the start of the Fight phase, you can select one enemy unit within Engagement Range of the bearer; that unit must take a Battle-shock test, subtracting 1 from the result.",
    "value": 15,
    "detachment": "Court of the Phoenician",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "spiritsliver": {
    "title": "Spiritsliver",
    "text": "EMPEROR’S CHILDREN DAEMON PRINCE model only. Add 1 to the Strength and Attacks characteristics of the bearer’s melee weapons.",
    "value": 20,
    "detachment": "Court of the Phoenician",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh"
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
  "cacophonic accompaniment": {
    "title": "Cacophonic Accompaniment",
    "text": "LORD KAKOPHONIST model only. This model has Deep Strike. This unit’s ranged attacks have [IGNORES COVER].",
    "value": 20,
    "detachment": "Elegant Brutes",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-lord-kakophonist"
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
  "frenzied ferocity": {
    "title": "Frenzied Ferocity",
    "text": "EMPEROR’S CHILDREN TERMINATOR SQUAD unit only. This unit’s attacks have [SUSTAINED HITS 1].",
    "value": null,
    "detachment": "Elegant Brutes",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-chaos-terminators"
        ],
        "noneKeywords": []
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "euphoric crown": {
    "title": "Euphoric Crown",
    "text": "LORD EXULTANT model only. This model’s melee attacks have +1 S.",
    "value": 20,
    "detachment": "Frenzied Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-lord-exultant"
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
  "howling plate": {
    "title": "Howling Plate",
    "text": "LORD EXULTANT model only. This unit’s ranged attacks have +1 AP.",
    "value": 20,
    "detachment": "Frenzied Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-lord-exultant"
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
  "steeped in suffering": {
    "title": "Steeped in Suffering",
    "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes an attack that targets an enemy unit below its Starting Strength , add 1 to the Hit roll . If that target is also Below Half-strength , add 1 to the Wound roll as well.",
    "value": 20,
    "detachment": "Mercurial Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "intoxicating musk": {
    "title": "Intoxicating Musk",
    "text": "EMPEROR’S CHILDREN model only. Each time a melee attack targets the bearer’s unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll .",
    "value": 20,
    "detachment": "Mercurial Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "tactical perfection": {
    "title": "Tactical Perfection",
    "text": "EMPEROR’S CHILDREN model only. After both players have deployed their armies, select up to two EMPEROR’S CHILDREN units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
    "value": 15,
    "detachment": "Mercurial Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "loathsome dexterity": {
    "title": "Loathsome Dexterity",
    "text": "EMPEROR’S CHILDREN model only. Each time a model in the bearer’s unit makes a Normal , Advance or Fall Back move , it can move through enemy models. When doing so, it can move within Engagement Range of such models but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
    "value": 10,
    "detachment": "Mercurial Host",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "faultless opportunist": {
    "title": "Faultless Opportunist",
    "text": "EMPEROR’S CHILDREN model only. You can target this unit with the Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do: That use is -1 CP. That use does not prevent any uses of that stratagem on other units this phase.",
    "value": 15,
    "detachment": "Peerless Bladesmen",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "blinding speed": {
    "title": "Blinding Speed",
    "text": "EMPEROR’S CHILDREN model only. Once per battle, at the start of the Fight phase , the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.",
    "value": 25,
    "detachment": "Peerless Bladesmen",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "distortion": {
    "title": "Distortion",
    "text": "EMPEROR’S CHILDREN model only. Add 1 to the Attacks and Damage characteristics of melee weapons equipped by the bearer.",
    "value": 25,
    "detachment": "Peerless Bladesmen",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "rise to the challenge": {
    "title": "Rise to the Challenge",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle, at the end of the Fight phase , if the bearer is within Engagement Range of three or more enemy models, it can use this Enhancement. If it does, the bearer can fight one additional time. When doing so, you can select one ability using the Exquisite Swordsmanship Detachment rule to apply to those attacks.",
    "value": 30,
    "detachment": "Peerless Bladesmen",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "sublime prescience": {
    "title": "Sublime Prescience",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your Movement phase , the bearer can use this Enhancement. If it does, select one friendly EMPEROR’S CHILDREN TRANSPORT that is in Strategic Reserves . Until the end of the phase, for the purposes of setting up that TRANSPORT on the battlefield, treat the current battle round number as being one higher than it actually is.",
    "value": 25,
    "detachment": "Rapid Evisceration",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "spearhead striker": {
    "title": "Spearhead Striker",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Each time the bearer disembarks from a TRANSPORT , until the end of the turn, you can re-roll Charge rolls made for the bearer’s unit and enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit.",
    "value": 20,
    "detachment": "Rapid Evisceration",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "accomplished tactician": {
    "title": "Accomplished Tactician",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per turn, in your opponent’s Shooting phase , just after an enemy unit has shot, you can select one friendly EMPEROR’S CHILDREN unit within 9\" of the bearer that was hit by one or more of those attacks, then select one friendly TRANSPORT that unit is wholly within 6\" of and is able to embark within. That EMPEROR’S CHILDREN unit can embark within that Transport.",
    "value": 35,
    "detachment": "Rapid Evisceration",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "heretek adept": {
    "title": "Heretek Adept",
    "text": "EMPEROR’S CHILDREN INFANTRY model only. Once per battle round , when a saving throw is failed for a friendly EMPEROR’S CHILDREN VEHICLE model within 6\" of the bearer, you can change the Damage characteristic of that attack to 0.",
    "value": 35,
    "detachment": "Rapid Evisceration",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "eager to prove": {
    "title": "Eager to Prove",
    "text": "EMPEROR’S CHILDREN model only. You can re-roll Charge rolls made for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 2\" to the Move characteristic of models in that unit.",
    "value": 15,
    "detachment": "SLAANESH’S CHOSEN",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "repulsed by weakness": {
    "title": "Repulsed by Weakness",
    "text": "EMPEROR’S CHILDREN model only. Each time an enemy unit (excluding MONSTERS and VEHICLES ) within Engagement Range of the bearer’s unit Falls Back , models in that enemy unit must take Desperate Escape tests . When doing so, if the bearer’s unit is your army’s Favoured Champions , subtract 1 from each of those Desperate Escape tests.",
    "value": 25,
    "detachment": "SLAANESH’S CHOSEN",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "proud and vainglorious": {
    "title": "Proud and Vainglorious",
    "text": "EMPEROR’S CHILDREN model only. You can re-roll Battle-shock and Leadership tests taken for the bearer’s unit. While the bearer’s unit is your army’s Favoured Champions , add 1 to the Objective Control characteristic of models in that unit.",
    "value": 20,
    "detachment": "SLAANESH’S CHOSEN",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "slayer of champions": {
    "title": "Slayer of Champions",
    "text": "EMPEROR’S CHILDREN model only. The bearer’s melee weapons have the [PRECISION] ability, and each time the bearer makes a melee attack that targets a CHARACTER unit, improve the Strength and Armour Penetration characteristics of that attack by 1.",
    "value": 15,
    "detachment": "SLAANESH’S CHOSEN",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-daemon-prince-of-slaanesh",
          "unit-daemon-prince-of-slaanesh-with-wings",
          "unit-lord-exultant",
          "unit-lord-kakophonist",
          "unit-sorcerer"
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
  "eager patrons": {
    "title": "Eager Patrons",
    "text": "FLAWLESS BLADES unit only. This unit has +2\" M.",
    "value": null,
    "detachment": "Spectacle of Slaughter",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-flawless-blades"
        ],
        "noneKeywords": []
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  },
  "beguiling grotesquerie": {
    "title": "Beguiling Grotesquerie",
    "text": "FLAWLESS BLADES unit only. Enemy units cannot target this unit with snap shooting attacks.",
    "value": null,
    "detachment": "Spectacle of Slaughter",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-flawless-blades"
        ],
        "noneKeywords": []
      }
    },
    "assignment": {
      "maxOwners": 3,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    }
  }
});
