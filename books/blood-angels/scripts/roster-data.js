window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "blood-angels",
    "title": "Blood Angels",
    "factionKeyword": "BLOOD ANGELS",
    "parentBookId": null,
    "dependencies": [
      {
        "title": null
      }
    ]
  },
  "units": [
    {
      "id": "unit-assault-intercessor-squad",
      "title": "Assault Intercessor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Adeptus Astartes",
        "Imperium",
        "Assault Intercessor Squad",
        "Tacticus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-techmarine",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-techmarine",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-assault-intercessor-squad-ability-shock-assault",
            "title": "Shock Assault"
          },
          {
            "id": "unit-assault-intercessor-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-assault-intercessor-squad-model-assault-intercessors",
            "title": "Assault Intercessors",
            "aliases": [
              "Assault Intercessors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-assault-intercessor-squad-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-hand-flamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-plasma-pistol-supercharge-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-astartes-chainsword-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-power-weapon-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-power-fist-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-thunder-hammer-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessor-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-assault-intercessor-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-assault-intercessor-squad-profile-plasma-pistol-supercharge-ranged-2",
              "unit-assault-intercessor-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-assault-intercessor-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-assault-intercessor-squad-profile-plasma-pistol-supercharge-ranged-2",
              "unit-assault-intercessor-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-assault-intercessor-squad-profile-hand-flamer-ranged",
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
              "unit-assault-intercessor-squad-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-plasma-pistol-supercharge-ranged-2",
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
              "unit-assault-intercessor-squad-selection-plasma-pistol-supercharge",
              "unit-assault-intercessor-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-plasma-pistol-standard-ranged-3",
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
              "unit-assault-intercessor-squad-selection-plasma-pistol-standard",
              "unit-assault-intercessor-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-assault-intercessor-squad-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-astartes-chainsword-melee-5",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-assault-intercessor-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-power-weapon-melee-6",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-assault-intercessor-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-power-fist-melee-7",
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
              "unit-assault-intercessor-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-assault-intercessor-squad-profile-thunder-hammer-melee-8",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-assault-intercessor-squad-selection-thunder-hammer"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-heavy-intercessor-squad",
      "title": "Heavy Intercessor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Imperium",
        "Gravis",
        "Adeptus Astartes",
        "Heavy Intercessor Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-gravis-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-apothecary-biologis",
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
              "unitId": "unit-captain-in-gravis-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-apothecary-biologis",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "6",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-heavy-intercessor-squad-ability-unyielding-in-the-face-of-the-foe",
            "title": "Unyielding in the Face of the Foe"
          },
          {
            "id": "unit-heavy-intercessor-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-heavy-intercessor-squad-model-heavy-intercessors",
            "title": "Heavy Intercessors",
            "aliases": [
              "Heavy Intercessors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-heavy-intercessor-squad-selection-heavy-bolt-rifle",
            "title": "Heavy Bolt Rifle",
            "aliases": [
              "Heavy Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heavy-intercessor-squad-profile-heavy-bolt-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heavy-intercessor-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heavy-intercessor-squad-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heavy-intercessor-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heavy-intercessor-squad-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-heavy-intercessor-squad-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-heavy-intercessor-squad-profile-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-heavy-intercessor-squad-profile-heavy-bolt-rifle-ranged",
            "title": "Heavy Bolt Rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-heavy-intercessor-squad-selection-heavy-bolt-rifle"
            ]
          },
          {
            "id": "unit-heavy-intercessor-squad-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-heavy-intercessor-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-heavy-intercessor-squad-profile-close-combat-weapon-melee-3",
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
              "unit-heavy-intercessor-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-heavy-intercessor-squad-profile-heavy-bolter-ranged-4",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault, Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-heavy-intercessor-squad-selection-heavy-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-intercessor-squad",
      "title": "Intercessor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Intercessor Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-techmarine",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-techmarine",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-intercessor-squad-ability-objective-secured",
            "title": "Objective Secured"
          },
          {
            "id": "unit-intercessor-squad-ability-hail-of-bolts-2",
            "title": "Hail of Bolts"
          },
          {
            "id": "unit-intercessor-squad-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-intercessor-squad-model-intercessors",
            "title": "Intercessors",
            "aliases": [
              "Intercessors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-intercessor-squad-selection-bolt-rifle",
            "title": "Bolt Rifle",
            "aliases": [
              "Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-bolt-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-astartes-grenade-launcher-krak",
            "title": "➤ Astartes grenade launcher - krak",
            "aliases": [
              "➤ Astartes grenade launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-astartes-grenade-launcher-krak-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-astartes-grenade-launcher-frag",
            "title": "➤ Astartes grenade launcher - frag",
            "aliases": [
              "➤ Astartes grenade launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-astartes-grenade-launcher-frag-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-hand-flamer-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-power-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-astartes-chainsword-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-power-fist-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-thunder-hammer-melee-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-close-combat-weapon-melee-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-intercessor-squad-profile-bolt-pistol-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-weapon-family-astartes-grenade-launcher-selection",
            "title": "➤ Astartes grenade launcher",
            "aliases": [
              "➤ Astartes grenade launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-intercessor-squad-weapon-family-astartes-grenade-launcher",
            "profileIds": [
              "unit-intercessor-squad-profile-astartes-grenade-launcher-krak-ranged-2",
              "unit-intercessor-squad-profile-astartes-grenade-launcher-frag-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-intercessor-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-intercessor-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-intercessor-squad-profile-plasma-pistol-supercharge-ranged-6",
              "unit-intercessor-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-intercessor-squad-weapon-family-astartes-grenade-launcher",
            "title": "➤ Astartes grenade launcher",
            "aliases": [
              "➤ Astartes grenade launcher"
            ],
            "profileIds": [
              "unit-intercessor-squad-profile-astartes-grenade-launcher-krak-ranged-2",
              "unit-intercessor-squad-profile-astartes-grenade-launcher-frag-ranged-3"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-intercessor-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-intercessor-squad-profile-plasma-pistol-supercharge-ranged-6",
              "unit-intercessor-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-intercessor-squad-profile-bolt-rifle-ranged",
            "title": "Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-bolt-rifle"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-astartes-grenade-launcher-krak-ranged-2",
            "title": "➤ Astartes grenade launcher - krak",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-astartes-grenade-launcher-krak",
              "unit-intercessor-squad-weapon-family-astartes-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-astartes-grenade-launcher-frag-ranged-3",
            "title": "➤ Astartes grenade launcher - frag",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-astartes-grenade-launcher-frag",
              "unit-intercessor-squad-weapon-family-astartes-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-hand-flamer-ranged-4",
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
              "unit-intercessor-squad-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-power-weapon-melee-5",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-plasma-pistol-supercharge-ranged-6",
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
              "unit-intercessor-squad-selection-plasma-pistol-supercharge",
              "unit-intercessor-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-plasma-pistol-standard-ranged-7",
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
              "unit-intercessor-squad-selection-plasma-pistol-standard",
              "unit-intercessor-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-astartes-chainsword-melee-8",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-power-fist-melee-9",
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
              "unit-intercessor-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-thunder-hammer-melee-10",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-close-combat-weapon-melee-11",
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
              "unit-intercessor-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-intercessor-squad-profile-bolt-pistol-ranged-12",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-intercessor-squad-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tactical-squad",
      "title": "Tactical Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Tactical Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-techmarine",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-techmarine",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-tactical-squad-ability-combat-squads",
            "title": "Combat Squads"
          },
          {
            "id": "unit-tactical-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-tactical-squad-model-tactical-marines",
            "title": "Tactical Marines",
            "aliases": [
              "Tactical Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tactical-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-boltgun-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-astartes-chainsword-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-grav-pistol",
            "title": "Grav-pistol",
            "aliases": [
              "Grav-pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-grav-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-power-fist-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-thunder-hammer-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-power-weapon-melee-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-storm-bolter-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-combi-weapon-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-twin-lightning-claws",
            "title": "Twin lightning claws",
            "aliases": [
              "Twin lightning claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-twin-lightning-claws-melee-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-flamer",
            "title": "Flamer",
            "aliases": [
              "Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-flamer-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-meltagun-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-gun-standard",
            "title": "➤ Plasma gun - standard",
            "aliases": [
              "➤ Plasma gun - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-gun-standard-ranged-16"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-gun-supercharge",
            "title": "➤ Plasma gun - supercharge",
            "aliases": [
              "➤ Plasma gun - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-gun-supercharge-ranged-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-grav-gun",
            "title": "Grav-gun",
            "aliases": [
              "Grav-gun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-grav-gun-ranged-18"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-heavy-bolter-ranged-19"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-multi-melta-ranged-20"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-lascannon-ranged-21"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-missile-launcher-frag",
            "title": "➤ Missile Launcher - Frag",
            "aliases": [
              "➤ Missile Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-missile-launcher-frag-ranged-22"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-missile-launcher-krak",
            "title": "➤ Missile Launcher - Krak",
            "aliases": [
              "➤ Missile Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-missile-launcher-krak-ranged-23"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-cannon-standard",
            "title": "➤ Plasma cannon - standard",
            "aliases": [
              "➤ Plasma cannon - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-cannon-standard-ranged-24"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-plasma-cannon-supercharge",
            "title": "➤ Plasma cannon - supercharge",
            "aliases": [
              "➤ Plasma cannon - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-cannon-supercharge-ranged-25"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-selection-grav-cannon",
            "title": "Grav-cannon",
            "aliases": [
              "Grav-cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tactical-squad-profile-grav-cannon-ranged-26"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-tactical-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-pistol-supercharge-ranged-6",
              "unit-tactical-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-weapon-family-plasma-gun-selection",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "kind": "weapon",
            "familyId": "unit-tactical-squad-weapon-family-plasma-gun",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-gun-standard-ranged-16",
              "unit-tactical-squad-profile-plasma-gun-supercharge-ranged-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-weapon-family-missile-launcher-selection",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-tactical-squad-weapon-family-missile-launcher",
            "profileIds": [
              "unit-tactical-squad-profile-missile-launcher-frag-ranged-22",
              "unit-tactical-squad-profile-missile-launcher-krak-ranged-23"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tactical-squad-weapon-family-plasma-cannon-selection",
            "title": "➤ Plasma cannon",
            "aliases": [
              "➤ Plasma cannon"
            ],
            "kind": "weapon",
            "familyId": "unit-tactical-squad-weapon-family-plasma-cannon",
            "profileIds": [
              "unit-tactical-squad-profile-plasma-cannon-standard-ranged-24",
              "unit-tactical-squad-profile-plasma-cannon-supercharge-ranged-25"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-tactical-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-tactical-squad-profile-plasma-pistol-supercharge-ranged-6",
              "unit-tactical-squad-profile-plasma-pistol-standard-ranged-7"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-tactical-squad-weapon-family-plasma-gun",
            "title": "➤ Plasma gun",
            "aliases": [
              "➤ Plasma gun"
            ],
            "profileIds": [
              "unit-tactical-squad-profile-plasma-gun-standard-ranged-16",
              "unit-tactical-squad-profile-plasma-gun-supercharge-ranged-17"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-tactical-squad-weapon-family-missile-launcher",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "profileIds": [
              "unit-tactical-squad-profile-missile-launcher-frag-ranged-22",
              "unit-tactical-squad-profile-missile-launcher-krak-ranged-23"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-tactical-squad-weapon-family-plasma-cannon",
            "title": "➤ Plasma cannon",
            "aliases": [
              "➤ Plasma cannon"
            ],
            "profileIds": [
              "unit-tactical-squad-profile-plasma-cannon-standard-ranged-24",
              "unit-tactical-squad-profile-plasma-cannon-supercharge-ranged-25"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-tactical-squad-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-boltgun-ranged-3",
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
              "unit-tactical-squad-selection-boltgun"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-astartes-chainsword-melee-4",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-grav-pistol-ranged-5",
            "title": "Grav-pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+, Pistol",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-grav-pistol"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-pistol-supercharge-ranged-6",
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
              "unit-tactical-squad-selection-plasma-pistol-supercharge",
              "unit-tactical-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-pistol-standard-ranged-7",
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
              "unit-tactical-squad-selection-plasma-pistol-standard",
              "unit-tactical-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-power-fist-melee-8",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-thunder-hammer-melee-9",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-power-weapon-melee-10",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-storm-bolter-ranged-11",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-combi-weapon-ranged-12",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-twin-lightning-claws-melee-13",
            "title": "Twin lightning claws",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-twin-lightning-claws"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-flamer-ranged-14",
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
              "unit-tactical-squad-selection-flamer"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-meltagun-ranged-15",
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
              "unit-tactical-squad-selection-meltagun"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-gun-standard-ranged-16",
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
              "unit-tactical-squad-selection-plasma-gun-standard",
              "unit-tactical-squad-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-gun-supercharge-ranged-17",
            "title": "➤ Plasma gun - supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Rapid Fire 1, Hazardous",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-plasma-gun-supercharge",
              "unit-tactical-squad-weapon-family-plasma-gun-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-grav-gun-ranged-18",
            "title": "Grav-gun",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-grav-gun"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-heavy-bolter-ranged-19",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-multi-melta-ranged-20",
            "title": "Multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Heavy, Melta 2",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-multi-melta"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-lascannon-ranged-21",
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
              "unit-tactical-squad-selection-lascannon"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-missile-launcher-frag-ranged-22",
            "title": "➤ Missile Launcher - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-missile-launcher-frag",
              "unit-tactical-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-missile-launcher-krak-ranged-23",
            "title": "➤ Missile Launcher - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-missile-launcher-krak",
              "unit-tactical-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-cannon-standard-ranged-24",
            "title": "➤ Plasma cannon - standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-plasma-cannon-standard",
              "unit-tactical-squad-weapon-family-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-plasma-cannon-supercharge-ranged-25",
            "title": "➤ Plasma cannon - supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Blast, Heavy, Hazardous",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-plasma-cannon-supercharge",
              "unit-tactical-squad-weapon-family-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-tactical-squad-profile-grav-cannon-ranged-26",
            "title": "Grav-cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "3",
            "abilities": "Anti-vehicle 2+, Heavy",
            "sourceSelectionIds": [
              "unit-tactical-squad-selection-grav-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-ancient",
      "title": "Ancient",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Adeptus Astartes",
        "Ancient"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-desolation-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-devastator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-desolation-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-devastator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-ancient-ability-unbreakable-duty",
            "title": "Unbreakable Duty"
          },
          {
            "id": "unit-ancient-ability-support-2",
            "title": "Support"
          },
          {
            "id": "unit-ancient-ability-astartes-banner-3",
            "title": "Astartes Banner"
          },
          {
            "id": "unit-ancient-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-ancient-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-ancient-model-ancient",
            "title": "Ancient",
            "aliases": [
              "Ancient"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ancient-selection-bolt-rifle",
            "title": "Bolt Rifle",
            "aliases": [
              "Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-profile-bolt-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-profile-power-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-ancient-profile-bolt-rifle-ranged",
            "title": "Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-ancient-selection-bolt-rifle"
            ]
          },
          {
            "id": "unit-ancient-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ancient-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-ancient-profile-power-weapon-melee-3",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ancient-selection-power-weapon"
            ]
          },
          {
            "id": "unit-ancient-profile-bolt-pistol-ranged-4",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-ancient-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-ancient-in-terminator-armor",
      "title": "Ancient in Terminator Armor",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Imperium",
        "Terminator",
        "Ancient",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-terminator-assault-squad",
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
              "unitId": "unit-terminator-assault-squad",
              "maxCharacters": 2
            }
          ],
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-ancient-in-terminator-armor-ability-keep-the-banner-high",
            "title": "Keep the Banner High"
          },
          {
            "id": "unit-ancient-in-terminator-armor-ability-support-2",
            "title": "Support"
          },
          {
            "id": "unit-ancient-in-terminator-armor-ability-astartes-banner-3",
            "title": "Astartes Banner"
          },
          {
            "id": "unit-ancient-in-terminator-armor-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-ancient-in-terminator-armor-ability-deep-strike-5",
            "title": "Deep Strike"
          },
          {
            "id": "unit-ancient-in-terminator-armor-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-ancient-in-terminator-armor-model-ancient-in-terminator-armor",
            "title": "Ancient in Terminator Armor",
            "aliases": [
              "Ancient in Terminator Armor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ancient-in-terminator-armor-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-power-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-thunder-hammer-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-chainfist",
            "title": "Chainfist",
            "aliases": [
              "Chainfist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-chainfist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-storm-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-twin-lightning-claws",
            "title": "Twin lightning claws",
            "aliases": [
              "Twin lightning claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ancient-in-terminator-armor-profile-twin-lightning-claws-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ancient-in-terminator-armor-selection-terminator-storm-shield",
            "title": "Terminator Storm Shield",
            "aliases": [
              "Terminator Storm Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-ancient-in-terminator-armor-wargear-ability-terminator-storm-shield"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-ancient-in-terminator-armor-profile-power-weapon-melee",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-power-weapon"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-power-fist-melee-2",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-power-fist"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-thunder-hammer-melee-3",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-chainfist-melee-4",
            "title": "Chainfist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti Vehicle 3+",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-chainfist"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-close-combat-weapon-melee-5",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-storm-bolter-ranged-6",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-ancient-in-terminator-armor-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-ancient-in-terminator-armor-profile-twin-lightning-claws-melee-7",
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
              "unit-ancient-in-terminator-armor-selection-twin-lightning-claws"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-ancient-in-terminator-armor-wargear-ability-terminator-storm-shield",
            "title": "Terminator Storm Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-apothecary",
      "title": "Apothecary",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Tacticus",
        "Infantry",
        "Apothecary"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-desolation-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-devastator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-desolation-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-devastator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-apothecary-ability-narthecium",
            "title": "Narthecium"
          },
          {
            "id": "unit-apothecary-ability-gene-seed-recovery-2",
            "title": "Gene Seed Recovery"
          },
          {
            "id": "unit-apothecary-ability-support-3",
            "title": "Support"
          },
          {
            "id": "unit-apothecary-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-apothecary-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-apothecary-model-apothecary",
            "title": "Apothecary",
            "aliases": [
              "Apothecary"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-apothecary-selection-reductor-pistol",
            "title": "Reductor Pistol",
            "aliases": [
              "Reductor Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-apothecary-profile-reductor-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-apothecary-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-apothecary-profile-absolvor-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-apothecary-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-apothecary-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-apothecary-profile-reductor-pistol-ranged",
            "title": "Reductor Pistol",
            "mode": "ranged",
            "range": "3\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-4",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-apothecary-selection-reductor-pistol"
            ]
          },
          {
            "id": "unit-apothecary-profile-absolvor-bolt-pistol-ranged-2",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-apothecary-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-apothecary-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-apothecary-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-apothecary-biologis",
      "title": "Apothecary Biologis",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Imperium",
        "Gravis",
        "Adeptus Astartes",
        "Apothecary",
        "Biologis"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-aggressor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-eradicator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-heavy-intercessor-squad",
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
              "unitId": "unit-aggressor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-eradicator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-heavy-intercessor-squad",
              "maxCharacters": 2
            }
          ],
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
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-apothecary-biologis-ability-surgical-precision",
            "title": "Surgical Precision"
          },
          {
            "id": "unit-apothecary-biologis-ability-vivispectrum-2",
            "title": "Vivispectrum"
          },
          {
            "id": "unit-apothecary-biologis-ability-support-3",
            "title": "Support"
          },
          {
            "id": "unit-apothecary-biologis-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-apothecary-biologis-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-apothecary-biologis-model-apothecary-biologis",
            "title": "Apothecary Biologis",
            "aliases": [
              "Apothecary Biologis"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-apothecary-biologis-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-apothecary-biologis-profile-absolvor-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-apothecary-biologis-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-apothecary-biologis-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-apothecary-biologis-profile-absolvor-bolt-pistol-ranged",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-apothecary-biologis-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-apothecary-biologis-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-apothecary-biologis-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-bladeguard-ancient",
      "title": "Bladeguard Ancient",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Grenades",
        "Imperium",
        "Bladeguard Ancient",
        "Adeptus Astartes",
        "Tacticus",
        "Ancient"
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
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-bladeguard-ancient-ability-deeds-of-heroism",
            "title": "Deeds of Heroism"
          },
          {
            "id": "unit-bladeguard-ancient-ability-support-2",
            "title": "Support"
          },
          {
            "id": "unit-bladeguard-ancient-ability-astartes-banner-3",
            "title": "Astartes Banner"
          },
          {
            "id": "unit-bladeguard-ancient-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-bladeguard-ancient-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-bladeguard-ancient-model-bladeguard-ancient",
            "title": "Bladeguard Ancient",
            "aliases": [
              "Bladeguard Ancient"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-bladeguard-ancient-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-ancient-profile-heavy-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-ancient-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-ancient-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-bladeguard-ancient-profile-heavy-bolt-pistol-ranged",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-bladeguard-ancient-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-bladeguard-ancient-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-bladeguard-ancient-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-captain",
      "title": "Captain",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Captain",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-bladeguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-company-heroes",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-bladeguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-company-heroes",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-captain-ability-finest-hour",
            "title": "Finest Hour"
          },
          {
            "id": "unit-captain-ability-rites-of-battle-2",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-captain-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-captain-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-captain-model-captain",
            "title": "Captain",
            "aliases": [
              "Captain"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-captain-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-master-crafted-power-weapon",
            "title": "Master-crafted power weapon",
            "aliases": [
              "Master-crafted power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-master-crafted-power-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-master-crafted-bolter",
            "title": "Master-crafted bolter",
            "aliases": [
              "Master-crafted bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-master-crafted-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-heavy-bolt-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-neo-volkite-pistol",
            "title": "Neo-volkite Pistol",
            "aliases": [
              "Neo-volkite Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-neo-volkite-pistol-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-plasma-pistol-supercharge-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-profile-plasma-pistol-standard-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-captain-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-captain-profile-plasma-pistol-supercharge-ranged-8",
              "unit-captain-profile-plasma-pistol-standard-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-selection-relic-shield",
            "title": "Relic Shield",
            "aliases": [
              "Relic Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-captain-wargear-ability-relic-shield"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-captain-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-captain-profile-plasma-pistol-supercharge-ranged-8",
              "unit-captain-profile-plasma-pistol-standard-ranged-9"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-captain-profile-close-combat-weapon-melee",
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
              "unit-captain-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-captain-profile-power-fist-melee-2",
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
              "unit-captain-selection-power-fist"
            ]
          },
          {
            "id": "unit-captain-profile-master-crafted-power-weapon-melee-3",
            "title": "Master-crafted power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-selection-master-crafted-power-weapon"
            ]
          },
          {
            "id": "unit-captain-profile-bolt-pistol-ranged-4",
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
              "unit-captain-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-captain-profile-master-crafted-bolter-ranged-5",
            "title": "Master-crafted bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-selection-master-crafted-bolter"
            ]
          },
          {
            "id": "unit-captain-profile-heavy-bolt-pistol-ranged-6",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-captain-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-captain-profile-neo-volkite-pistol-ranged-7",
            "title": "Neo-volkite Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-captain-selection-neo-volkite-pistol"
            ]
          },
          {
            "id": "unit-captain-profile-plasma-pistol-supercharge-ranged-8",
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
              "unit-captain-selection-plasma-pistol-supercharge",
              "unit-captain-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-captain-profile-plasma-pistol-standard-ranged-9",
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
              "unit-captain-selection-plasma-pistol-standard",
              "unit-captain-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-captain-wargear-ability-relic-shield",
            "title": "Relic Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-captain-in-gravis-armour",
      "title": "Captain in Gravis Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Captain",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Gravis"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-aggressor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-eradicator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-heavy-intercessor-squad",
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
              "unitId": "unit-aggressor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-eradicator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-heavy-intercessor-squad",
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
          "T": "6",
          "Sv": "3+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-captain-in-gravis-armour-ability-refuse-to-yield",
            "title": "Refuse to Yield"
          },
          {
            "id": "unit-captain-in-gravis-armour-ability-rites-of-battle-2",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-captain-in-gravis-armour-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-captain-in-gravis-armour-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-captain-in-gravis-armour-model-captain-in-gravis-armour",
            "title": "Captain in Gravis Armour",
            "aliases": [
              "Captain in Gravis Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-captain-in-gravis-armour-selection-master-crafted-heavy-bolt-rifle",
            "title": "Master-crafted Heavy Bolt Rifle",
            "aliases": [
              "Master-crafted Heavy Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-master-crafted-heavy-bolt-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-master-crafted-power-weapon",
            "title": "Master-crafted power weapon",
            "aliases": [
              "Master-crafted power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-master-crafted-power-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-relic-chainsword",
            "title": "Relic Chainsword",
            "aliases": [
              "Relic Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-relic-chainsword-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-relic-blade",
            "title": "Relic Blade",
            "aliases": [
              "Relic Blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-relic-blade-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-relic-fist",
            "title": "Relic Fist",
            "aliases": [
              "Relic Fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-relic-fist-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-boltstorm-gauntlet",
            "title": "Boltstorm gauntlet",
            "aliases": [
              "Boltstorm gauntlet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-boltstorm-gauntlet-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-gravis-armour-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-gravis-armour-profile-power-fist-melee-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-captain-in-gravis-armour-profile-master-crafted-heavy-bolt-rifle-ranged",
            "title": "Master-crafted Heavy Bolt Rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "3",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-master-crafted-heavy-bolt-rifle"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-master-crafted-power-weapon-melee-2",
            "title": "Master-crafted power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-master-crafted-power-weapon"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-relic-chainsword-melee-3",
            "title": "Relic Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-relic-chainsword"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-relic-blade-melee-4",
            "title": "Relic Blade",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-relic-blade"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-relic-fist-melee-5",
            "title": "Relic Fist",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-relic-fist"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-boltstorm-gauntlet-ranged-6",
            "title": "Boltstorm gauntlet",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-captain-in-gravis-armour-selection-boltstorm-gauntlet"
            ]
          },
          {
            "id": "unit-captain-in-gravis-armour-profile-power-fist-melee-7",
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
              "unit-captain-in-gravis-armour-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-captain-in-phobos-armour",
      "title": "Captain in Phobos Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Captain",
        "Phobos",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-eliminator-squad",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-incursor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infiltrator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-reiver-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-scout-squad",
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
              "unitId": "unit-eliminator-squad",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-incursor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infiltrator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-reiver-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-scout-squad",
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
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-captain-in-phobos-armour-ability-master-of-deceit",
            "title": "Master of Deceit"
          },
          {
            "id": "unit-captain-in-phobos-armour-ability-rites-of-battle-2",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-captain-in-phobos-armour-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-captain-in-phobos-armour-ability-infiltrators-4",
            "title": "Infiltrators"
          },
          {
            "id": "unit-captain-in-phobos-armour-ability-stealth-5",
            "title": "Stealth"
          },
          {
            "id": "unit-captain-in-phobos-armour-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-captain-in-phobos-armour-model-captain-in-phobos-armour",
            "title": "Captain in Phobos Armour",
            "aliases": [
              "Captain in Phobos Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-captain-in-phobos-armour-selection-instigator-bolt-carbine",
            "title": "Instigator Bolt Carbine",
            "aliases": [
              "Instigator Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-phobos-armour-profile-instigator-bolt-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-phobos-armour-selection-combat-knife",
            "title": "Combat Knife",
            "aliases": [
              "Combat Knife"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-phobos-armour-profile-combat-knife-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-phobos-armour-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-phobos-armour-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-captain-in-phobos-armour-profile-instigator-bolt-carbine-ranged",
            "title": "Instigator Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-captain-in-phobos-armour-selection-instigator-bolt-carbine"
            ]
          },
          {
            "id": "unit-captain-in-phobos-armour-profile-combat-knife-melee-2",
            "title": "Combat Knife",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-in-phobos-armour-selection-combat-knife"
            ]
          },
          {
            "id": "unit-captain-in-phobos-armour-profile-bolt-pistol-ranged-3",
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
              "unit-captain-in-phobos-armour-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-captain-in-terminator-armour",
      "title": "Captain in Terminator Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Captain",
        "Adeptus Astartes",
        "Imperium",
        "Terminator"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-terminator-assault-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-terminator-squad",
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
              "unitId": "unit-terminator-assault-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-terminator-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-captain-in-terminator-armour-ability-unstoppable-valour",
            "title": "Unstoppable Valour"
          },
          {
            "id": "unit-captain-in-terminator-armour-ability-rites-of-battle-2",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-captain-in-terminator-armour-ability-invulnerable-save-3",
            "title": "Invulnerable Save"
          },
          {
            "id": "unit-captain-in-terminator-armour-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-captain-in-terminator-armour-ability-deep-strike-5",
            "title": "Deep Strike"
          },
          {
            "id": "unit-captain-in-terminator-armour-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-captain-in-terminator-armour-model-captain-in-terminator-armour",
            "title": "Captain in Terminator Armour",
            "aliases": [
              "Captain in Terminator Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-captain-in-terminator-armour-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-terminator-armour-profile-storm-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-terminator-armour-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-terminator-armour-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-terminator-armour-selection-relic-fist",
            "title": "Relic Fist",
            "aliases": [
              "Relic Fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-terminator-armour-profile-relic-fist-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-in-terminator-armour-selection-relic-weapon",
            "title": "Relic Weapon",
            "aliases": [
              "Relic Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-in-terminator-armour-profile-relic-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-captain-in-terminator-armour-profile-storm-bolter-ranged",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-captain-in-terminator-armour-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-captain-in-terminator-armour-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-captain-in-terminator-armour-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-captain-in-terminator-armour-profile-relic-fist-melee-3",
            "title": "Relic Fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-in-terminator-armour-selection-relic-fist"
            ]
          },
          {
            "id": "unit-captain-in-terminator-armour-profile-relic-weapon-melee-4",
            "title": "Relic Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-in-terminator-armour-selection-relic-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-captain-with-jump-pack",
      "title": "Captain with Jump Pack",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Captain",
        "Imperium",
        "Adeptus Astartes",
        "Fly",
        "Jump Pack",
        "Tacticus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessors-with-jump-packs",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-sanguinary-guard",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
              "unitId": "unit-assault-intercessors-with-jump-packs",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-sanguinary-guard",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-captain-with-jump-pack-ability-angels-wrath",
            "title": "Angel's Wrath"
          },
          {
            "id": "unit-captain-with-jump-pack-ability-rites-of-battle-2",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-captain-with-jump-pack-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-captain-with-jump-pack-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-captain-with-jump-pack-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-captain-with-jump-pack-model-captain-with-jump-pack",
            "title": "Captain with Jump Pack",
            "aliases": [
              "Captain with Jump Pack"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-captain-with-jump-pack-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-heavy-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-hand-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-astartes-chainsword-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-relic-weapon",
            "title": "Relic Weapon",
            "aliases": [
              "Relic Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-relic-weapon-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-thunder-hammer-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-captain-with-jump-pack-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-3",
              "unit-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-captain-with-jump-pack-selection-relic-shield",
            "title": "Relic Shield",
            "aliases": [
              "Relic Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-captain-with-jump-pack-wargear-ability-relic-shield"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-captain-with-jump-pack-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-3",
              "unit-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-captain-with-jump-pack-profile-heavy-bolt-pistol-ranged",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-captain-with-jump-pack-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-hand-flamer-ranged-2",
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
              "unit-captain-with-jump-pack-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-3",
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
              "unit-captain-with-jump-pack-selection-plasma-pistol-supercharge",
              "unit-captain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-4",
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
              "unit-captain-with-jump-pack-selection-plasma-pistol-standard",
              "unit-captain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-astartes-chainsword-melee-5",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-with-jump-pack-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-power-fist-melee-6",
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
              "unit-captain-with-jump-pack-selection-power-fist"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-relic-weapon-melee-7",
            "title": "Relic Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-captain-with-jump-pack-selection-relic-weapon"
            ]
          },
          {
            "id": "unit-captain-with-jump-pack-profile-thunder-hammer-melee-8",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-captain-with-jump-pack-selection-thunder-hammer"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-captain-with-jump-pack-wargear-ability-relic-shield",
            "title": "Relic Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-chaplain",
      "title": "Chaplain",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Tacticus",
        "Imperium",
        "Adeptus Astartes",
        "Chaplain"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-bladeguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-death-company-marines",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-marines-with-bolt-rifles",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-bladeguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-death-company-marines",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-marines-with-bolt-rifles",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-chaplain-ability-litany-of-hate",
            "title": "Litany of Hate"
          },
          {
            "id": "unit-chaplain-ability-spiritual-leader-2",
            "title": "Spiritual Leader"
          },
          {
            "id": "unit-chaplain-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-chaplain-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-chaplain-model-chaplain",
            "title": "Chaplain",
            "aliases": [
              "Chaplain"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaplain-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-profile-absolvor-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-selection-crozius-arcanum",
            "title": "Crozius arcanum",
            "aliases": [
              "Crozius arcanum"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-profile-crozius-arcanum-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaplain-profile-absolvor-bolt-pistol-ranged",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaplain-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-chaplain-profile-crozius-arcanum-melee-2",
            "title": "Crozius arcanum",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaplain-selection-crozius-arcanum"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaplain-in-terminator-armour",
      "title": "Chaplain in Terminator Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Terminator",
        "Chaplain",
        "Imperium",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-terminator-assault-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-terminator-squad",
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
              "unitId": "unit-terminator-assault-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-terminator-squad",
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
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-chaplain-in-terminator-armour-ability-recitation-of-faith",
            "title": "Recitation of Faith"
          },
          {
            "id": "unit-chaplain-in-terminator-armour-ability-litany-of-hate-2",
            "title": "Litany of Hate"
          },
          {
            "id": "unit-chaplain-in-terminator-armour-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-chaplain-in-terminator-armour-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-chaplain-in-terminator-armour-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-chaplain-in-terminator-armour-model-chaplain-in-terminator-armour",
            "title": "Chaplain in Terminator Armour",
            "aliases": [
              "Chaplain in Terminator Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaplain-in-terminator-armour-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-in-terminator-armour-profile-storm-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-in-terminator-armour-selection-crozius-arcanum",
            "title": "Crozius arcanum",
            "aliases": [
              "Crozius arcanum"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-in-terminator-armour-profile-crozius-arcanum-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-in-terminator-armour-selection-relic-shield",
            "title": "Relic Shield",
            "aliases": [
              "Relic Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-chaplain-in-terminator-armour-wargear-ability-relic-shield"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaplain-in-terminator-armour-profile-storm-bolter-ranged",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaplain-in-terminator-armour-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-chaplain-in-terminator-armour-profile-crozius-arcanum-melee-2",
            "title": "Crozius arcanum",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaplain-in-terminator-armour-selection-crozius-arcanum"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-chaplain-in-terminator-armour-wargear-ability-relic-shield",
            "title": "Relic Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-chaplain-on-bike",
      "title": "Chaplain on Bike",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Mounted",
        "Imperium",
        "Grenades",
        "Chaplain",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-outrider-squad",
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
              "unitId": "unit-outrider-squad",
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
          "Sv": "3+",
          "W": "5",
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-chaplain-on-bike-ability-catechism-of-fire",
            "title": "Catechism of Fire"
          },
          {
            "id": "unit-chaplain-on-bike-ability-litany-of-hate-2",
            "title": "Litany of Hate"
          },
          {
            "id": "unit-chaplain-on-bike-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-chaplain-on-bike-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-chaplain-on-bike-model-chaplain-on-bike",
            "title": "Chaplain on Bike",
            "aliases": [
              "Chaplain on Bike"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaplain-on-bike-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-on-bike-profile-absolvor-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-on-bike-selection-crozius-arcanum",
            "title": "Crozius arcanum",
            "aliases": [
              "Crozius arcanum"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-on-bike-profile-crozius-arcanum-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-on-bike-selection-twin-bolt-rifle",
            "title": "Twin bolt rifle",
            "aliases": [
              "Twin bolt rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-on-bike-profile-twin-bolt-rifle-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-chaplain-on-bike-profile-absolvor-bolt-pistol-ranged",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaplain-on-bike-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-chaplain-on-bike-profile-crozius-arcanum-melee-2",
            "title": "Crozius arcanum",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaplain-on-bike-selection-crozius-arcanum"
            ]
          },
          {
            "id": "unit-chaplain-on-bike-profile-twin-bolt-rifle-ranged-3",
            "title": "Twin bolt rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-chaplain-on-bike-selection-twin-bolt-rifle"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chaplain-with-jump-pack",
      "title": "Chaplain with Jump Pack",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Imperium",
        "Chaplain",
        "Adeptus Astartes",
        "Fly",
        "Jump Pack"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessors-with-jump-packs",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-marines-with-jump-packs",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
              "unitId": "unit-assault-intercessors-with-jump-packs",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-marines-with-jump-packs",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
          "W": "4",
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-chaplain-with-jump-pack-ability-exhortation-of-rage",
            "title": "Exhortation of Rage"
          },
          {
            "id": "unit-chaplain-with-jump-pack-ability-litany-of-hate-2",
            "title": "Litany of Hate"
          },
          {
            "id": "unit-chaplain-with-jump-pack-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-chaplain-with-jump-pack-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-chaplain-with-jump-pack-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-chaplain-with-jump-pack-model-chaplain-with-jump-pack",
            "title": "Chaplain with Jump Pack",
            "aliases": [
              "Chaplain with Jump Pack"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chaplain-with-jump-pack-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-inferno-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-hand-flamer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-grav-pistol",
            "title": "Grav-pistol",
            "aliases": [
              "Grav-pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-grav-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-boltgun-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-power-fist-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-bolt-pistol-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-absolvor-bolt-pistol-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-selection-crozius-arcanum",
            "title": "Crozius arcanum",
            "aliases": [
              "Crozius arcanum"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-crozius-arcanum-melee-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chaplain-with-jump-pack-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chaplain-with-jump-pack-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chaplain-with-jump-pack-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
              "unit-chaplain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chaplain-with-jump-pack-profile-inferno-pistol-ranged",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-inferno-pistol"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-hand-flamer-ranged-3",
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
              "unit-chaplain-with-jump-pack-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-grav-pistol-ranged-4",
            "title": "Grav-pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+, Pistol",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-grav-pistol"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
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
              "unit-chaplain-with-jump-pack-selection-plasma-pistol-supercharge",
              "unit-chaplain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-plasma-pistol-standard-ranged-7",
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
              "unit-chaplain-with-jump-pack-selection-plasma-pistol-standard",
              "unit-chaplain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-boltgun-ranged-8",
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
              "unit-chaplain-with-jump-pack-selection-boltgun"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-power-fist-melee-9",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-power-fist"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-bolt-pistol-ranged-10",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-absolvor-bolt-pistol-ranged-11",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-chaplain-with-jump-pack-profile-crozius-arcanum-melee-12",
            "title": "Crozius arcanum",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-chaplain-with-jump-pack-selection-crozius-arcanum"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-judiciar",
      "title": "Judiciar",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Imperium",
        "Tacticus",
        "Judiciar",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-bladeguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-bladeguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+*"
        },
        "abilities": [
          {
            "id": "unit-judiciar-ability-tempormortis",
            "title": "Tempormortis"
          },
          {
            "id": "unit-judiciar-ability-silent-fury-2",
            "title": "Silent Fury"
          },
          {
            "id": "unit-judiciar-ability-invulnerable-save-3",
            "title": "*Invulnerable Save"
          },
          {
            "id": "unit-judiciar-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-judiciar-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-judiciar-model-judiciar",
            "title": "Judiciar",
            "aliases": [
              "Judiciar"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-judiciar-selection-executioner-relic-blade",
            "title": "Executioner Relic Blade",
            "aliases": [
              "Executioner Relic Blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-judiciar-profile-executioner-relic-blade-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-judiciar-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-judiciar-profile-absolvor-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-judiciar-profile-executioner-relic-blade-melee",
            "title": "Executioner Relic Blade",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-judiciar-selection-executioner-relic-blade"
            ]
          },
          {
            "id": "unit-judiciar-profile-absolvor-bolt-pistol-ranged-2",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-judiciar-selection-absolvor-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-librarian",
      "title": "Librarian",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Psyker",
        "Adeptus Astartes",
        "Tacticus",
        "Librarian"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-desolation-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-devastator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-desolation-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-devastator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-librarian-ability-mental-fortress-psychic",
            "title": "Mental Fortress [Psychic]"
          },
          {
            "id": "unit-librarian-ability-psychic-hood-2",
            "title": "Psychic Hood"
          },
          {
            "id": "unit-librarian-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-librarian-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-librarian-model-librarian",
            "title": "Librarian",
            "aliases": [
              "Librarian"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-librarian-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-selection-force-weapon",
            "title": "Force weapon",
            "aliases": [
              "Force weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-profile-force-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-selection-smite-witchfire",
            "title": "➤ Smite - Witchfire",
            "aliases": [
              "➤ Smite - Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-profile-smite-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-selection-smite-focused-witchfire",
            "title": "➤ Smite - Focused Witchfire",
            "aliases": [
              "➤ Smite - Focused Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-profile-smite-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-weapon-family-smite-selection",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "kind": "weapon",
            "familyId": "unit-librarian-weapon-family-smite",
            "profileIds": [
              "unit-librarian-profile-smite-witchfire-ranged-3",
              "unit-librarian-profile-smite-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-librarian-weapon-family-smite",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "profileIds": [
              "unit-librarian-profile-smite-witchfire-ranged-3",
              "unit-librarian-profile-smite-focused-witchfire-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-librarian-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-librarian-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-librarian-profile-force-weapon-melee-2",
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
              "unit-librarian-selection-force-weapon"
            ]
          },
          {
            "id": "unit-librarian-profile-smite-witchfire-ranged-3",
            "title": "➤ Smite - Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-librarian-selection-smite-witchfire",
              "unit-librarian-weapon-family-smite-selection"
            ]
          },
          {
            "id": "unit-librarian-profile-smite-focused-witchfire-ranged-4",
            "title": "➤ Smite - Focused Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-librarian-selection-smite-focused-witchfire",
              "unit-librarian-weapon-family-smite-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-librarian-in-phobos-armour",
      "title": "Librarian in Phobos Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Grenades",
        "Imperium",
        "Psyker",
        "Adeptus Astartes",
        "Phobos",
        "Librarian",
        "Infantry"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-eliminator-squad",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-incursor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infiltrator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-reiver-squad",
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
              "unitId": "unit-eliminator-squad",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-incursor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infiltrator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-reiver-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-librarian-in-phobos-armour-ability-shrouding-psychic",
            "title": "Shrouding [Psychic]"
          },
          {
            "id": "unit-librarian-in-phobos-armour-ability-psychic-hood-2",
            "title": "Psychic Hood"
          },
          {
            "id": "unit-librarian-in-phobos-armour-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-librarian-in-phobos-armour-ability-infiltrators-4",
            "title": "Infiltrators"
          },
          {
            "id": "unit-librarian-in-phobos-armour-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-librarian-in-phobos-armour-model-librarian-in-phobos-armour",
            "title": "Librarian in Phobos Armour",
            "aliases": [
              "Librarian in Phobos Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-librarian-in-phobos-armour-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-phobos-armour-selection-force-weapon",
            "title": "Force weapon",
            "aliases": [
              "Force weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-force-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-phobos-armour-selection-smite-witchfire",
            "title": "➤ Smite - Witchfire",
            "aliases": [
              "➤ Smite - Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-smite-witchfire-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-phobos-armour-selection-smite-focused-witchfire",
            "title": "➤ Smite - Focused Witchfire",
            "aliases": [
              "➤ Smite - Focused Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-smite-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-phobos-armour-weapon-family-smite-selection",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "kind": "weapon",
            "familyId": "unit-librarian-in-phobos-armour-weapon-family-smite",
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-smite-witchfire-ranged-3",
              "unit-librarian-in-phobos-armour-profile-smite-focused-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-librarian-in-phobos-armour-weapon-family-smite",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "profileIds": [
              "unit-librarian-in-phobos-armour-profile-smite-witchfire-ranged-3",
              "unit-librarian-in-phobos-armour-profile-smite-focused-witchfire-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-librarian-in-phobos-armour-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-librarian-in-phobos-armour-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-librarian-in-phobos-armour-profile-force-weapon-melee-2",
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
              "unit-librarian-in-phobos-armour-selection-force-weapon"
            ]
          },
          {
            "id": "unit-librarian-in-phobos-armour-profile-smite-witchfire-ranged-3",
            "title": "➤ Smite - Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-librarian-in-phobos-armour-selection-smite-witchfire",
              "unit-librarian-in-phobos-armour-weapon-family-smite-selection"
            ]
          },
          {
            "id": "unit-librarian-in-phobos-armour-profile-smite-focused-witchfire-ranged-4",
            "title": "➤ Smite - Focused Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-librarian-in-phobos-armour-selection-smite-focused-witchfire",
              "unit-librarian-in-phobos-armour-weapon-family-smite-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-librarian-in-terminator-armour",
      "title": "Librarian in Terminator Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Imperium",
        "Psyker",
        "Terminator",
        "Librarian",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-terminator-assault-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-terminator-squad",
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
              "unitId": "unit-terminator-assault-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-terminator-squad",
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-librarian-in-terminator-armour-ability-veil-of-time-psychic",
            "title": "Veil of Time [Psychic]"
          },
          {
            "id": "unit-librarian-in-terminator-armour-ability-psychic-hood-2",
            "title": "Psychic Hood"
          },
          {
            "id": "unit-librarian-in-terminator-armour-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-librarian-in-terminator-armour-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          },
          {
            "id": "unit-librarian-in-terminator-armour-ability-deep-strike-5",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-librarian-in-terminator-armour-model-librarian-in-terminator-armour",
            "title": "Librarian in Terminator Armour",
            "aliases": [
              "Librarian in Terminator Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-librarian-in-terminator-armour-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-combi-weapon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-terminator-armour-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-storm-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-terminator-armour-selection-force-weapon",
            "title": "Force weapon",
            "aliases": [
              "Force weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-force-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-terminator-armour-selection-smite-witchfire",
            "title": "➤ Smite - Witchfire",
            "aliases": [
              "➤ Smite - Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-smite-witchfire-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-terminator-armour-selection-smite-focused-witchfire",
            "title": "➤ Smite - Focused Witchfire",
            "aliases": [
              "➤ Smite - Focused Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-smite-focused-witchfire-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-librarian-in-terminator-armour-weapon-family-smite-selection",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "kind": "weapon",
            "familyId": "unit-librarian-in-terminator-armour-weapon-family-smite",
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-smite-witchfire-ranged-4",
              "unit-librarian-in-terminator-armour-profile-smite-focused-witchfire-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-librarian-in-terminator-armour-weapon-family-smite",
            "title": "➤ Smite",
            "aliases": [
              "➤ Smite"
            ],
            "profileIds": [
              "unit-librarian-in-terminator-armour-profile-smite-witchfire-ranged-4",
              "unit-librarian-in-terminator-armour-profile-smite-focused-witchfire-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-librarian-in-terminator-armour-profile-combi-weapon-ranged",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-librarian-in-terminator-armour-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-librarian-in-terminator-armour-profile-storm-bolter-ranged-2",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-librarian-in-terminator-armour-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-librarian-in-terminator-armour-profile-force-weapon-melee-3",
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
              "unit-librarian-in-terminator-armour-selection-force-weapon"
            ]
          },
          {
            "id": "unit-librarian-in-terminator-armour-profile-smite-witchfire-ranged-4",
            "title": "➤ Smite - Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "D3",
            "abilities": "Psychic",
            "sourceSelectionIds": [
              "unit-librarian-in-terminator-armour-selection-smite-witchfire",
              "unit-librarian-in-terminator-armour-weapon-family-smite-selection"
            ]
          },
          {
            "id": "unit-librarian-in-terminator-armour-profile-smite-focused-witchfire-ranged-5",
            "title": "➤ Smite - Focused Witchfire",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "D3",
            "abilities": "Devastating Wounds, Hazardous, Psychic",
            "sourceSelectionIds": [
              "unit-librarian-in-terminator-armour-selection-smite-focused-witchfire",
              "unit-librarian-in-terminator-armour-weapon-family-smite-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lieutenant",
      "title": "Lieutenant",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Adeptus Astartes",
        "Lieutenant"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-bladeguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-company-heroes",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-bladeguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-company-heroes",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-lieutenant-ability-support",
            "title": "Support"
          },
          {
            "id": "unit-lieutenant-ability-target-priority-2",
            "title": "Target Priority"
          },
          {
            "id": "unit-lieutenant-ability-tactical-precision-3",
            "title": "Tactical Precision"
          },
          {
            "id": "unit-lieutenant-ability-support-4",
            "title": "Support"
          },
          {
            "id": "unit-lieutenant-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-lieutenant-model-lieutenant",
            "title": "Lieutenant",
            "aliases": [
              "Lieutenant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lieutenant-selection-neo-volkite-pistol",
            "title": "Neo-volkite Pistol",
            "aliases": [
              "Neo-volkite Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-neo-volkite-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-master-crafted-power-weapon",
            "title": "Master-crafted power weapon",
            "aliases": [
              "Master-crafted power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-master-crafted-power-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-plasma-pistol-supercharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-plasma-pistol-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-master-crafted-bolter",
            "title": "Master-crafted bolter",
            "aliases": [
              "Master-crafted bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-profile-master-crafted-bolter-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-lieutenant-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-lieutenant-profile-plasma-pistol-supercharge-ranged-7",
              "unit-lieutenant-profile-plasma-pistol-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-selection-storm-shield",
            "title": "Storm Shield",
            "aliases": [
              "Storm Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-lieutenant-wargear-ability-storm-shield"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-lieutenant-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-lieutenant-profile-plasma-pistol-supercharge-ranged-7",
              "unit-lieutenant-profile-plasma-pistol-standard-ranged-8"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-lieutenant-profile-neo-volkite-pistol-ranged",
            "title": "Neo-volkite Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-neo-volkite-pistol"
            ]
          },
          {
            "id": "unit-lieutenant-profile-master-crafted-power-weapon-melee-2",
            "title": "Master-crafted power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-master-crafted-power-weapon"
            ]
          },
          {
            "id": "unit-lieutenant-profile-bolt-pistol-ranged-3",
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
              "unit-lieutenant-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-lieutenant-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-lieutenant-profile-close-combat-weapon-melee-5",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-lieutenant-profile-power-fist-melee-6",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-power-fist"
            ]
          },
          {
            "id": "unit-lieutenant-profile-plasma-pistol-supercharge-ranged-7",
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
              "unit-lieutenant-selection-plasma-pistol-supercharge",
              "unit-lieutenant-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-lieutenant-profile-plasma-pistol-standard-ranged-8",
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
              "unit-lieutenant-selection-plasma-pistol-standard",
              "unit-lieutenant-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-lieutenant-profile-master-crafted-bolter-ranged-9",
            "title": "Master-crafted bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lieutenant-selection-master-crafted-bolter"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-lieutenant-wargear-ability-storm-shield",
            "title": "Storm Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-lieutenant-in-phobos-armour",
      "title": "Lieutenant in Phobos Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Phobos",
        "Adeptus Astartes",
        "Lieutenant"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-incursor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infiltrator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-reiver-squad",
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
              "unitId": "unit-incursor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infiltrator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-reiver-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-strategic-dispersal",
            "title": "Strategic Dispersal"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-support-2",
            "title": "Support"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-tactical-precision-3",
            "title": "Tactical Precision"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-infiltrators-4",
            "title": "Infiltrators"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-scouts-6-5",
            "title": "Scouts 6\""
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-deep-strike-6",
            "title": "Deep Strike"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-leader-7",
            "title": "Leader"
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-ability-oath-of-moment-8",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-lieutenant-in-phobos-armour-model-lieutenant-in-phobos-armour",
            "title": "Lieutenant in Phobos Armour",
            "aliases": [
              "Lieutenant in Phobos Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lieutenant-in-phobos-armour-selection-master-crafted-scoped-bolt-carbine",
            "title": "Master-crafted Scoped Bolt Carbine",
            "aliases": [
              "Master-crafted Scoped Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-in-phobos-armour-profile-master-crafted-scoped-bolt-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-selection-paired-combat-blades",
            "title": "Paired Combat Blades",
            "aliases": [
              "Paired Combat Blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-in-phobos-armour-profile-paired-combat-blades-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-in-phobos-armour-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lieutenant-in-phobos-armour-profile-master-crafted-scoped-bolt-carbine-ranged",
            "title": "Master-crafted Scoped Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-lieutenant-in-phobos-armour-selection-master-crafted-scoped-bolt-carbine"
            ]
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-profile-paired-combat-blades-melee-2",
            "title": "Paired Combat Blades",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-lieutenant-in-phobos-armour-selection-paired-combat-blades"
            ]
          },
          {
            "id": "unit-lieutenant-in-phobos-armour-profile-bolt-pistol-ranged-3",
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
              "unit-lieutenant-in-phobos-armour-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lieutenant-in-reiver-armour",
      "title": "Lieutenant in Reiver Armour",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Smoke",
        "Imperium",
        "Phobos",
        "Adeptus Astartes",
        "Lieutenant",
        "Lieutenant in Reiver Armour"
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
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-deadly-terror",
            "title": "Deadly Terror"
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-support-2",
            "title": "Support"
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-tactical-precision-3",
            "title": "Tactical Precision"
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-scouts-6-4",
            "title": "Scouts 6\""
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-support-5",
            "title": "Support"
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-lieutenant-in-reiver-armour-model-lieutenant-in-reiver-armour",
            "title": "Lieutenant in Reiver Armour",
            "aliases": [
              "Lieutenant in Reiver Armour"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lieutenant-in-reiver-armour-selection-combat-knife",
            "title": "Combat Knife",
            "aliases": [
              "Combat Knife"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-in-reiver-armour-profile-combat-knife-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-selection-master-crafted-special-issue-bolt-pistol",
            "title": "Master-crafted Special Issue Bolt Pistol",
            "aliases": [
              "Master-crafted Special Issue Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-in-reiver-armour-profile-master-crafted-special-issue-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lieutenant-in-reiver-armour-profile-combat-knife-melee",
            "title": "Combat Knife",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-lieutenant-in-reiver-armour-selection-combat-knife"
            ]
          },
          {
            "id": "unit-lieutenant-in-reiver-armour-profile-master-crafted-special-issue-bolt-pistol-ranged-2",
            "title": "Master-crafted Special Issue Bolt Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol, Precision",
            "sourceSelectionIds": [
              "unit-lieutenant-in-reiver-armour-selection-master-crafted-special-issue-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lieutenant-with-combi-weapon",
      "title": "Lieutenant with Combi-weapon",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Lieutenant with Combi-weapon",
        "Adeptus Astartes",
        "Phobos",
        "Lieutenant"
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
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-priority-objective-identified",
            "title": "Priority Objective Identified"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-evade-and-survive-2",
            "title": "Evade and Survive"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-lone-survivor-3",
            "title": "Lone Survivor"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-feel-no-pain-5-4",
            "title": "Feel No Pain 5+"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-infiltrators-5",
            "title": "Infiltrators"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-lone-operative-6",
            "title": "Lone Operative"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-stealth-7",
            "title": "Stealth"
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-ability-oath-of-moment-8",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-lieutenant-with-combi-weapon-model-lieutenant-with-combi-weapon",
            "title": "Lieutenant with Combi-weapon",
            "aliases": [
              "Lieutenant with Combi-weapon"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lieutenant-with-combi-weapon-selection-paired-combat-blades",
            "title": "Paired Combat Blades",
            "aliases": [
              "Paired Combat Blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-with-combi-weapon-profile-paired-combat-blades-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lieutenant-with-combi-weapon-profile-combi-weapon-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lieutenant-with-combi-weapon-profile-paired-combat-blades-melee",
            "title": "Paired Combat Blades",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-lieutenant-with-combi-weapon-selection-paired-combat-blades"
            ]
          },
          {
            "id": "unit-lieutenant-with-combi-weapon-profile-combi-weapon-ranged-2",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-lieutenant-with-combi-weapon-selection-combi-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-techmarine",
      "title": "Techmarine",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Adeptus Astartes",
        "Techmarine"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-desolation-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-devastator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-desolation-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-devastator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-techmarine-ability-techmarine",
            "title": "Techmarine"
          },
          {
            "id": "unit-techmarine-ability-blessing-of-the-omnissiah-2",
            "title": "Blessing of the Omnissiah"
          },
          {
            "id": "unit-techmarine-ability-vengeance-of-the-omnissiah-3",
            "title": "Vengeance of the Omnissiah"
          },
          {
            "id": "unit-techmarine-ability-leader-4",
            "title": "Leader"
          },
          {
            "id": "unit-techmarine-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-techmarine-model-techmarine",
            "title": "Techmarine",
            "aliases": [
              "Techmarine"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-techmarine-selection-forge-bolter",
            "title": "Forge Bolter",
            "aliases": [
              "Forge Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-techmarine-profile-forge-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-techmarine-selection-grav-pistol",
            "title": "Grav-pistol",
            "aliases": [
              "Grav-pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-techmarine-profile-grav-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-techmarine-selection-omnissian-power-axe",
            "title": "Omnissian power axe",
            "aliases": [
              "Omnissian power axe"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-techmarine-profile-omnissian-power-axe-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-techmarine-selection-servo-arm",
            "title": "Servo-arm",
            "aliases": [
              "Servo-arm"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-techmarine-profile-servo-arm-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-techmarine-profile-forge-bolter-ranged",
            "title": "Forge Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-techmarine-selection-forge-bolter"
            ]
          },
          {
            "id": "unit-techmarine-profile-grav-pistol-ranged-2",
            "title": "Grav-pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+, Pistol",
            "sourceSelectionIds": [
              "unit-techmarine-selection-grav-pistol"
            ]
          },
          {
            "id": "unit-techmarine-profile-omnissian-power-axe-melee-3",
            "title": "Omnissian power axe",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-techmarine-selection-omnissian-power-axe"
            ]
          },
          {
            "id": "unit-techmarine-profile-servo-arm-melee-4",
            "title": "Servo-arm",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-techmarine-selection-servo-arm"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-drop-pod",
      "title": "Drop Pod",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-faction-pack",
      "intrinsicKeywords": [
        "Vehicle",
        "Imperium",
        "Drop Pod",
        "Transport",
        "Dedicated Transport",
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
          "T": "7",
          "Sv": "3+",
          "W": "8",
          "Ld": "6+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-drop-pod-ability-drop-pod-assault",
            "title": "Drop Pod Assault"
          },
          {
            "id": "unit-drop-pod-ability-transport-2",
            "title": "Transport"
          },
          {
            "id": "unit-drop-pod-ability-combat-disembarkation-3",
            "title": "Combat Disembarkation"
          },
          {
            "id": "unit-drop-pod-ability-deployment-complete-4",
            "title": "Deployment Complete"
          },
          {
            "id": "unit-drop-pod-ability-deadly-demise-1-5",
            "title": "Deadly Demise 1"
          },
          {
            "id": "unit-drop-pod-ability-deep-strike-6",
            "title": "Deep Strike"
          },
          {
            "id": "unit-drop-pod-ability-oath-of-moment-7",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-drop-pod-model-drop-pod",
            "title": "Drop Pod",
            "aliases": [
              "Drop Pod"
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
      "id": "unit-impulsor",
      "title": "Impulsor",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Transport",
        "Dedicated Transport",
        "Imperium",
        "Adeptus Astartes",
        "Impulsor"
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
          "W": "11",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-impulsor-ability-transport",
            "title": "Transport"
          },
          {
            "id": "unit-impulsor-ability-assault-vehicle-2",
            "title": "Assault Vehicle"
          },
          {
            "id": "unit-impulsor-ability-orbital-comms-array-aura-3",
            "title": "Orbital Comms Array [Aura]"
          },
          {
            "id": "unit-impulsor-ability-deadly-demise-d3-4",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-impulsor-ability-firing-deck-6-5",
            "title": "Firing Deck 6"
          },
          {
            "id": "unit-impulsor-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-impulsor-model-impulsor",
            "title": "Impulsor",
            "aliases": [
              "Impulsor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-impulsor-selection-ironhail-skytalon-array",
            "title": "Ironhail Skytalon Array",
            "aliases": [
              "Ironhail Skytalon Array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-ironhail-skytalon-array-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-bellicatus-missile-array-frag",
            "title": "➤ Bellicatus Missile Array - Frag",
            "aliases": [
              "➤ Bellicatus Missile Array - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-bellicatus-missile-array-frag-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-bellicatus-missile-array-icarus",
            "title": "➤ Bellicatus Missile Array - Icarus",
            "aliases": [
              "➤ Bellicatus Missile Array - Icarus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-bellicatus-missile-array-icarus-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-bellicatus-missile-array-krak",
            "title": "➤ Bellicatus Missile Array - Krak",
            "aliases": [
              "➤ Bellicatus Missile Array - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-bellicatus-missile-array-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-fragstorm-grenade-launcher",
            "title": "Fragstorm grenade launcher",
            "aliases": [
              "Fragstorm grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-fragstorm-grenade-launcher-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-armoured-hull-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-ironhail-heavy-stubber",
            "title": "Ironhail Heavy Stubber",
            "aliases": [
              "Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-impulsor-profile-ironhail-heavy-stubber-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-weapon-family-bellicatus-missile-array-selection",
            "title": "➤ Bellicatus Missile Array",
            "aliases": [
              "➤ Bellicatus Missile Array"
            ],
            "kind": "weapon",
            "familyId": "unit-impulsor-weapon-family-bellicatus-missile-array",
            "profileIds": [
              "unit-impulsor-profile-bellicatus-missile-array-frag-ranged-2",
              "unit-impulsor-profile-bellicatus-missile-array-icarus-ranged-3",
              "unit-impulsor-profile-bellicatus-missile-array-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-impulsor-selection-shield-dome",
            "title": "Shield Dome",
            "aliases": [
              "Shield Dome"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-impulsor-wargear-ability-shield-dome"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-impulsor-weapon-family-bellicatus-missile-array",
            "title": "➤ Bellicatus Missile Array",
            "aliases": [
              "➤ Bellicatus Missile Array"
            ],
            "profileIds": [
              "unit-impulsor-profile-bellicatus-missile-array-frag-ranged-2",
              "unit-impulsor-profile-bellicatus-missile-array-icarus-ranged-3",
              "unit-impulsor-profile-bellicatus-missile-array-krak-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-impulsor-profile-ironhail-skytalon-array-ranged",
            "title": "Ironhail Skytalon Array",
            "mode": "ranged",
            "range": "36\"",
            "a": "8",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Fly 4+, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-impulsor-selection-ironhail-skytalon-array"
            ]
          },
          {
            "id": "unit-impulsor-profile-bellicatus-missile-array-frag-ranged-2",
            "title": "➤ Bellicatus Missile Array - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-impulsor-selection-bellicatus-missile-array-frag",
              "unit-impulsor-weapon-family-bellicatus-missile-array-selection"
            ]
          },
          {
            "id": "unit-impulsor-profile-bellicatus-missile-array-icarus-ranged-3",
            "title": "➤ Bellicatus Missile Array - Icarus",
            "mode": "ranged",
            "range": "48\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Fly 2+",
            "sourceSelectionIds": [
              "unit-impulsor-selection-bellicatus-missile-array-icarus",
              "unit-impulsor-weapon-family-bellicatus-missile-array-selection"
            ]
          },
          {
            "id": "unit-impulsor-profile-bellicatus-missile-array-krak-ranged-4",
            "title": "➤ Bellicatus Missile Array - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-impulsor-selection-bellicatus-missile-array-krak",
              "unit-impulsor-weapon-family-bellicatus-missile-array-selection"
            ]
          },
          {
            "id": "unit-impulsor-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-impulsor-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-impulsor-profile-fragstorm-grenade-launcher-ranged-6",
            "title": "Fragstorm grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-impulsor-selection-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-impulsor-profile-armoured-hull-melee-7",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-impulsor-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-impulsor-profile-ironhail-heavy-stubber-ranged-8",
            "title": "Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3",
            "sourceSelectionIds": [
              "unit-impulsor-selection-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-impulsor-wargear-ability-shield-dome",
            "title": "Shield Dome",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-razorback",
      "title": "Razorback",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Dedicated Transport",
        "Transport",
        "Razorback",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-razorback-ability-fire-support",
            "title": "Fire Support"
          },
          {
            "id": "unit-razorback-ability-transport-2",
            "title": "Transport"
          },
          {
            "id": "unit-razorback-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-razorback-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-razorback-model-razorback",
            "title": "Razorback",
            "aliases": [
              "Razorback"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-razorback-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorback-profile-twin-heavy-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorback-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorback-profile-twin-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorback-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorback-profile-armoured-tracks-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorback-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorback-profile-hunter-killer-missile-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorback-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorback-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-razorback-profile-twin-heavy-bolter-ranged",
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
              "unit-razorback-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-razorback-profile-twin-lascannon-ranged-2",
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
              "unit-razorback-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-razorback-profile-armoured-tracks-melee-3",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-razorback-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-razorback-profile-hunter-killer-missile-ranged-4",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-razorback-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-razorback-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-razorback-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-rhino",
      "title": "Rhino",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Imperium",
        "Smoke",
        "Dedicated Transport",
        "Transport",
        "Vehicle",
        "Adeptus Astartes",
        "Rhino",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-rhino-ability-self-repair",
            "title": "Self Repair"
          },
          {
            "id": "unit-rhino-ability-transport-2",
            "title": "Transport"
          },
          {
            "id": "unit-rhino-ability-firing-deck-2-3",
            "title": "Firing Deck 2"
          },
          {
            "id": "unit-rhino-ability-deadly-demise-d3-4",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-rhino-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-rhino-model-rhino",
            "title": "Rhino",
            "aliases": [
              "Rhino"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-rhino-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-rhino-profile-armoured-tracks-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-rhino-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-rhino-profile-hunter-killer-missile-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-rhino-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-rhino-profile-storm-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-rhino-profile-armoured-tracks-melee",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-rhino-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-rhino-profile-hunter-killer-missile-ranged-2",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-rhino-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-rhino-profile-storm-bolter-ranged-3",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-rhino-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hammerfall-bunker",
      "title": "Hammerfall Bunker",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Fortification",
        "Imperium",
        "Hammerfall Bunker",
        "Adeptus Astartes",
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
          "T": "12",
          "Sv": "2+",
          "W": "14",
          "Ld": "6+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-hammerfall-bunker-ability-fortification",
            "title": "Fortification"
          },
          {
            "id": "unit-hammerfall-bunker-ability-ceramite-cover-2",
            "title": "Ceramite Cover"
          },
          {
            "id": "unit-hammerfall-bunker-ability-defensive-array-3",
            "title": "Defensive Array"
          },
          {
            "id": "unit-hammerfall-bunker-ability-damaged-1-4-wounds-remaining-4",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-hammerfall-bunker-ability-deadly-demise-d6-5",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-hammerfall-bunker-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-hammerfall-bunker-model-hammerfall-bunker",
            "title": "Hammerfall Bunker",
            "aliases": [
              "Hammerfall Bunker"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hammerfall-bunker-selection-hammerfall-missile-launcher-superfrag",
            "title": "➤ Hammerfall Missile Launcher - Superfrag",
            "aliases": [
              "➤ Hammerfall Missile Launcher - Superfrag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superfrag-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerfall-bunker-selection-hammerfall-missile-launcher-superkrak",
            "title": "➤ Hammerfall Missile Launcher - Superkrak",
            "aliases": [
              "➤ Hammerfall Missile Launcher - Superkrak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superkrak-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerfall-bunker-selection-hammerfall-heavy-bolter-array",
            "title": "Hammerfall Heavy Bolter Array",
            "aliases": [
              "Hammerfall Heavy Bolter Array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-heavy-bolter-array-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerfall-bunker-selection-hammerfall-heavy-flamer-array",
            "title": "Hammerfall Heavy Flamer Array",
            "aliases": [
              "Hammerfall Heavy Flamer Array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-heavy-flamer-array-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerfall-bunker-weapon-family-hammerfall-missile-launcher-selection",
            "title": "➤ Hammerfall Missile Launcher",
            "aliases": [
              "➤ Hammerfall Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-hammerfall-bunker-weapon-family-hammerfall-missile-launcher",
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superfrag-ranged",
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superkrak-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-hammerfall-bunker-weapon-family-hammerfall-missile-launcher",
            "title": "➤ Hammerfall Missile Launcher",
            "aliases": [
              "➤ Hammerfall Missile Launcher"
            ],
            "profileIds": [
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superfrag-ranged",
              "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superkrak-ranged-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superfrag-ranged",
            "title": "➤ Hammerfall Missile Launcher - Superfrag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2d6+2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-hammerfall-bunker-selection-hammerfall-missile-launcher-superfrag",
              "unit-hammerfall-bunker-weapon-family-hammerfall-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-hammerfall-bunker-profile-hammerfall-missile-launcher-superkrak-ranged-2",
            "title": "➤ Hammerfall Missile Launcher - Superkrak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "4+",
            "s": "10",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hammerfall-bunker-selection-hammerfall-missile-launcher-superkrak",
              "unit-hammerfall-bunker-weapon-family-hammerfall-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-hammerfall-bunker-profile-hammerfall-heavy-bolter-array-ranged-3",
            "title": "Hammerfall Heavy Bolter Array",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Defensive Array, Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-hammerfall-bunker-selection-hammerfall-heavy-bolter-array"
            ]
          },
          {
            "id": "unit-hammerfall-bunker-profile-hammerfall-heavy-flamer-array-ranged-4",
            "title": "Hammerfall Heavy Flamer Array",
            "mode": "ranged",
            "range": "12\"",
            "a": "2D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Defensive Array, Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-hammerfall-bunker-selection-hammerfall-heavy-flamer-array"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-aggressor-squad",
      "title": "Aggressor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Gravis",
        "Aggressor Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-gravis-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-apothecary-biologis",
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
              "unitId": "unit-captain-in-gravis-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-apothecary-biologis",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "6",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-aggressor-squad-ability-close-quarters-firepower",
            "title": "Close-quarters Firepower"
          },
          {
            "id": "unit-aggressor-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-aggressor-squad-model-aggressors",
            "title": "Aggressors",
            "aliases": [
              "Aggressors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-aggressor-squad-selection-auto-boltstorm-gauntlets",
            "title": "Auto Boltstorm Gauntlets",
            "aliases": [
              "Auto Boltstorm Gauntlets"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-aggressor-squad-profile-auto-boltstorm-gauntlets-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-aggressor-squad-selection-fragstorm-grenade-launcher",
            "title": "Fragstorm grenade launcher",
            "aliases": [
              "Fragstorm grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-aggressor-squad-profile-fragstorm-grenade-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-aggressor-squad-selection-flamestorm-gauntlets",
            "title": "Flamestorm Gauntlets",
            "aliases": [
              "Flamestorm Gauntlets"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-aggressor-squad-profile-flamestorm-gauntlets-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-aggressor-squad-selection-twin-power-fist",
            "title": "Twin power fist",
            "aliases": [
              "Twin power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-aggressor-squad-profile-twin-power-fist-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-aggressor-squad-profile-auto-boltstorm-gauntlets-ranged",
            "title": "Auto Boltstorm Gauntlets",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-aggressor-squad-selection-auto-boltstorm-gauntlets"
            ]
          },
          {
            "id": "unit-aggressor-squad-profile-fragstorm-grenade-launcher-ranged-2",
            "title": "Fragstorm grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-aggressor-squad-selection-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-aggressor-squad-profile-flamestorm-gauntlets-ranged-3",
            "title": "Flamestorm Gauntlets",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+1",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-aggressor-squad-selection-flamestorm-gauntlets"
            ]
          },
          {
            "id": "unit-aggressor-squad-profile-twin-power-fist-melee-4",
            "title": "Twin power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-aggressor-squad-selection-twin-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-assault-intercessors-with-jump-packs",
      "title": "Assault Intercessors with Jump Packs",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Fly",
        "Tacticus",
        "Jump Pack",
        "Adeptus Astartes",
        "Assault Intercessors with Jump Packs"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chaplain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-dante",
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
              "unitId": "unit-captain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chaplain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-dante",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-assault-intercessors-with-jump-packs-ability-hammer-of-wrath",
            "title": "Hammer of Wrath"
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-ability-deep-strike-3",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-assault-intercessors-with-jump-packs-model-assault-intercessors-with-jump-packs",
            "title": "Assault Intercessors with Jump Packs",
            "aliases": [
              "Assault Intercessors with Jump Packs"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-hand-flamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-supercharge-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-astartes-chainsword-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-power-weapon-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-power-fist-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-assault-intercessors-with-jump-packs-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-supercharge-ranged-2",
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-assault-intercessors-with-jump-packs-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-supercharge-ranged-2",
              "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-standard-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-hand-flamer-ranged",
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
              "unit-assault-intercessors-with-jump-packs-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-supercharge-ranged-2",
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
              "unit-assault-intercessors-with-jump-packs-selection-plasma-pistol-supercharge",
              "unit-assault-intercessors-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-plasma-pistol-standard-ranged-3",
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
              "unit-assault-intercessors-with-jump-packs-selection-plasma-pistol-standard",
              "unit-assault-intercessors-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-assault-intercessors-with-jump-packs-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-astartes-chainsword-melee-5",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-assault-intercessors-with-jump-packs-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-power-weapon-melee-6",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-assault-intercessors-with-jump-packs-selection-power-weapon"
            ]
          },
          {
            "id": "unit-assault-intercessors-with-jump-packs-profile-power-fist-melee-7",
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
              "unit-assault-intercessors-with-jump-packs-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-bladeguard-veteran-squad",
      "title": "Bladeguard Veteran Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Bladeguard Veteran Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-bladeguard-veteran-squad-ability-bladeguard",
            "title": "Bladeguard"
          },
          {
            "id": "unit-bladeguard-veteran-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-bladeguard-veteran-squad-model-bladeguard-veterans",
            "title": "Bladeguard Veterans",
            "aliases": [
              "Bladeguard Veterans"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-bladeguard-veteran-squad-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-heavy-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-veteran-squad-selection-master-crafted-power-weapon",
            "title": "Master-crafted power weapon",
            "aliases": [
              "Master-crafted power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-master-crafted-power-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-veteran-squad-selection-neo-volkite-pistol",
            "title": "Neo-volkite Pistol",
            "aliases": [
              "Neo-volkite Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-neo-volkite-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-veteran-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-veteran-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-bladeguard-veteran-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-bladeguard-veteran-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-supercharge-ranged-4",
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-bladeguard-veteran-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-supercharge-ranged-4",
              "unit-bladeguard-veteran-squad-profile-plasma-pistol-standard-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-bladeguard-veteran-squad-profile-heavy-bolt-pistol-ranged",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-bladeguard-veteran-squad-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-bladeguard-veteran-squad-profile-master-crafted-power-weapon-melee-2",
            "title": "Master-crafted power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-bladeguard-veteran-squad-selection-master-crafted-power-weapon"
            ]
          },
          {
            "id": "unit-bladeguard-veteran-squad-profile-neo-volkite-pistol-ranged-3",
            "title": "Neo-volkite Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-bladeguard-veteran-squad-selection-neo-volkite-pistol"
            ]
          },
          {
            "id": "unit-bladeguard-veteran-squad-profile-plasma-pistol-supercharge-ranged-4",
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
              "unit-bladeguard-veteran-squad-selection-plasma-pistol-supercharge",
              "unit-bladeguard-veteran-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-bladeguard-veteran-squad-profile-plasma-pistol-standard-ranged-5",
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
              "unit-bladeguard-veteran-squad-selection-plasma-pistol-standard",
              "unit-bladeguard-veteran-squad-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-centurion-assault-squad",
      "title": "Centurion Assault Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Centurion Assault Squad",
        "Adeptus Astartes",
        "Centurion"
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
          "T": "7",
          "Sv": "2+",
          "W": "4",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-centurion-assault-squad-ability-annihilator-protocols",
            "title": "Annihilator Protocols"
          },
          {
            "id": "unit-centurion-assault-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-centurion-assault-squad-model-assault-centurions",
            "title": "Assault Centurions",
            "aliases": [
              "Assault Centurions"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-centurion-assault-squad-selection-centurion-bolters",
            "title": "Centurion Bolters",
            "aliases": [
              "Centurion Bolters"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-assault-squad-profile-centurion-bolters-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-assault-squad-selection-twin-flamer",
            "title": "Twin flamer",
            "aliases": [
              "Twin flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-assault-squad-profile-twin-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-assault-squad-selection-twin-meltagun",
            "title": "Twin meltagun",
            "aliases": [
              "Twin meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-assault-squad-profile-twin-meltagun-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-assault-squad-selection-siege-drills",
            "title": "Siege Drills",
            "aliases": [
              "Siege Drills"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-assault-squad-profile-siege-drills-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-assault-squad-selection-centurion-assault-launchers",
            "title": "Centurion Assault Launchers",
            "aliases": [
              "Centurion Assault Launchers"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-centurion-assault-squad-wargear-ability-centurion-assault-launchers"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-centurion-assault-squad-profile-centurion-bolters-ranged",
            "title": "Centurion Bolters",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-centurion-assault-squad-selection-centurion-bolters"
            ]
          },
          {
            "id": "unit-centurion-assault-squad-profile-twin-flamer-ranged-2",
            "title": "Twin flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-centurion-assault-squad-selection-twin-flamer"
            ]
          },
          {
            "id": "unit-centurion-assault-squad-profile-twin-meltagun-ranged-3",
            "title": "Twin meltagun",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-centurion-assault-squad-selection-twin-meltagun"
            ]
          },
          {
            "id": "unit-centurion-assault-squad-profile-siege-drills-melee-4",
            "title": "Siege Drills",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-centurion-assault-squad-selection-siege-drills"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-centurion-assault-squad-wargear-ability-centurion-assault-launchers",
            "title": "Centurion Assault Launchers",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-centurion-devastator-squad",
      "title": "Centurion Devastator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Centurion Devastator Squad",
        "Centurion",
        "Adeptus Astartes"
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
          "T": "7",
          "Sv": "2+",
          "W": "4",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-centurion-devastator-squad-ability-decimator-protocols",
            "title": "Decimator Protocols"
          },
          {
            "id": "unit-centurion-devastator-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-centurion-devastator-squad-model-devastator-centurions",
            "title": "Devastator Centurions",
            "aliases": [
              "Devastator Centurions"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-centurion-devastator-squad-selection-centurion-bolters",
            "title": "Centurion Bolters",
            "aliases": [
              "Centurion Bolters"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-centurion-bolters-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-devastator-squad-selection-centurion-missile-launcher",
            "title": "Centurion missile launcher",
            "aliases": [
              "Centurion missile launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-centurion-missile-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-devastator-squad-selection-grav-cannon",
            "title": "Grav-cannon",
            "aliases": [
              "Grav-cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-grav-cannon-ranged-3",
              "unit-centurion-devastator-squad-profile-grav-cannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-devastator-squad-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-twin-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-devastator-squad-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-twin-lascannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-centurion-devastator-squad-selection-centurion-fists",
            "title": "Centurion Fists",
            "aliases": [
              "Centurion Fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-centurion-devastator-squad-profile-centurion-fists-melee-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-centurion-devastator-squad-profile-centurion-bolters-ranged",
            "title": "Centurion Bolters",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-centurion-devastator-squad-selection-centurion-bolters"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-centurion-missile-launcher-ranged-2",
            "title": "Centurion missile launcher",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D3",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-centurion-devastator-squad-selection-centurion-missile-launcher"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-grav-cannon-ranged-3",
            "title": "Grav-cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "3",
            "abilities": "Anti-vehicle 2+",
            "sourceSelectionIds": [
              "unit-centurion-devastator-squad-selection-grav-cannon"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-twin-heavy-bolter-ranged-4",
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
              "unit-centurion-devastator-squad-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-twin-lascannon-ranged-5",
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
              "unit-centurion-devastator-squad-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-centurion-fists-melee-6",
            "title": "Centurion Fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-centurion-devastator-squad-selection-centurion-fists"
            ]
          },
          {
            "id": "unit-centurion-devastator-squad-profile-grav-cannon-ranged-7",
            "title": "Grav-cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "3",
            "abilities": "Anti-Vehicle 2+",
            "sourceSelectionIds": [
              "unit-centurion-devastator-squad-selection-grav-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-company-heroes",
      "title": "Company Heroes",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Company Heroes",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-lieutenant",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-lieutenant",
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
          "W": "4",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-company-heroes-ability-ancient-banner",
            "title": "Ancient Banner"
          },
          {
            "id": "unit-company-heroes-ability-command-squad-2",
            "title": "Command Squad"
          },
          {
            "id": "unit-company-heroes-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-company-heroes-model-unit-composition",
            "title": "Unit Composition",
            "aliases": [
              "Unit Composition"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-company-heroes-selection-bolt-rifle",
            "title": "Bolt Rifle",
            "aliases": [
              "Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-bolt-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-company-heroes-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-company-heroes-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-company-heroes-selection-master-crafted-power-weapon",
            "title": "Master-crafted Power Weapon",
            "aliases": [
              "Master-crafted Power Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-master-crafted-power-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-company-heroes-selection-master-crafted-bolt-rifle",
            "title": "Master-crafted Bolt Rifle",
            "aliases": [
              "Master-crafted Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-master-crafted-bolt-rifle-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-company-heroes-selection-master-crafted-heavy-bolter",
            "title": "Master-crafted Heavy Bolter",
            "aliases": [
              "Master-crafted Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-company-heroes-profile-master-crafted-heavy-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-company-heroes-profile-bolt-rifle-ranged",
            "title": "Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-bolt-rifle"
            ]
          },
          {
            "id": "unit-company-heroes-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-company-heroes-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-company-heroes-profile-master-crafted-power-weapon-melee-4",
            "title": "Master-crafted Power Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-master-crafted-power-weapon"
            ]
          },
          {
            "id": "unit-company-heroes-profile-master-crafted-bolt-rifle-ranged-5",
            "title": "Master-crafted Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-master-crafted-bolt-rifle"
            ]
          },
          {
            "id": "unit-company-heroes-profile-master-crafted-heavy-bolter-ranged-6",
            "title": "Master-crafted Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "3",
            "abilities": "Heavy, Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-company-heroes-selection-master-crafted-heavy-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-desolation-squad",
      "title": "Desolation Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Desolation Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-techmarine",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-librarian",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-techmarine",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-desolation-squad-ability-targeter-optics",
            "title": "Targeter Optics"
          },
          {
            "id": "unit-desolation-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-desolation-squad-model-desolation-marines",
            "title": "Desolation Marines",
            "aliases": [
              "Desolation Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-desolation-squad-selection-superfrag-rocket-launcher",
            "title": "Superfrag Rocket Launcher",
            "aliases": [
              "Superfrag Rocket Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-superfrag-rocket-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-desolation-squad-selection-superkrak-rocket-launcher",
            "title": "Superkrak Rocket Launcher",
            "aliases": [
              "Superkrak Rocket Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-superkrak-rocket-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-desolation-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-desolation-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-desolation-squad-selection-castellan-launcher",
            "title": "Castellan Launcher",
            "aliases": [
              "Castellan Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-castellan-launcher-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-desolation-squad-selection-vengor-launcher",
            "title": "Vengor launcher",
            "aliases": [
              "Vengor launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-desolation-squad-profile-vengor-launcher-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-desolation-squad-profile-superfrag-rocket-launcher-ranged",
            "title": "Superfrag Rocket Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6+1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-desolation-squad-selection-superfrag-rocket-launcher"
            ]
          },
          {
            "id": "unit-desolation-squad-profile-superkrak-rocket-launcher-ranged-2",
            "title": "Superkrak Rocket Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "10",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-desolation-squad-selection-superkrak-rocket-launcher"
            ]
          },
          {
            "id": "unit-desolation-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-desolation-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-desolation-squad-profile-close-combat-weapon-melee-4",
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
              "unit-desolation-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-desolation-squad-profile-castellan-launcher-ranged-5",
            "title": "Castellan Launcher",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-desolation-squad-selection-castellan-launcher"
            ]
          },
          {
            "id": "unit-desolation-squad-profile-vengor-launcher-ranged-6",
            "title": "Vengor launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "2+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-desolation-squad-selection-vengor-launcher"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-devastator-squad",
      "title": "Devastator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Devastator Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-techmarine",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-librarian",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-techmarine",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-devastator-squad-ability-signum",
            "title": "Signum"
          },
          {
            "id": "unit-devastator-squad-ability-armorium-cherub-2",
            "title": "Armorium Cherub"
          },
          {
            "id": "unit-devastator-squad-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-devastator-squad-model-devastators",
            "title": "Devastators",
            "aliases": [
              "Devastators"
            ]
          },
          {
            "id": "unit-devastator-squad-model-devastator-sergeant-2",
            "title": "Devastator Sergeant",
            "aliases": [
              "Devastator Sergeant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-devastator-squad-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-boltgun-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-lascannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-grav-cannon",
            "title": "Grav-cannon",
            "aliases": [
              "Grav-cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-grav-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-multi-melta-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-plasma-cannon-standard",
            "title": "➤ Plasma cannon - standard",
            "aliases": [
              "➤ Plasma cannon - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-cannon-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-plasma-cannon-supercharge",
            "title": "➤ Plasma cannon - supercharge",
            "aliases": [
              "➤ Plasma cannon - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-cannon-supercharge-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-missile-launcher-frag",
            "title": "➤ Missile Launcher - Frag",
            "aliases": [
              "➤ Missile Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-missile-launcher-frag-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-missile-launcher-krak",
            "title": "➤ Missile Launcher - Krak",
            "aliases": [
              "➤ Missile Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-missile-launcher-krak-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-astartes-chainsword-melee-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-grav-pistol",
            "title": "Grav-pistol",
            "aliases": [
              "Grav-pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-grav-pistol-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-pistol-supercharge-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-pistol-standard-ranged-15"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-power-fist-melee-16"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-thunder-hammer-melee-17"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-power-weapon-melee-18"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devastator-squad-profile-combi-weapon-ranged-19"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-weapon-family-plasma-cannon-selection",
            "title": "➤ Plasma cannon",
            "aliases": [
              "➤ Plasma cannon"
            ],
            "kind": "weapon",
            "familyId": "unit-devastator-squad-weapon-family-plasma-cannon",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-cannon-standard-ranged-8",
              "unit-devastator-squad-profile-plasma-cannon-supercharge-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-weapon-family-missile-launcher-selection",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-devastator-squad-weapon-family-missile-launcher",
            "profileIds": [
              "unit-devastator-squad-profile-missile-launcher-frag-ranged-10",
              "unit-devastator-squad-profile-missile-launcher-krak-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devastator-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-devastator-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-devastator-squad-profile-plasma-pistol-supercharge-ranged-14",
              "unit-devastator-squad-profile-plasma-pistol-standard-ranged-15"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-devastator-squad-weapon-family-plasma-cannon",
            "title": "➤ Plasma cannon",
            "aliases": [
              "➤ Plasma cannon"
            ],
            "profileIds": [
              "unit-devastator-squad-profile-plasma-cannon-standard-ranged-8",
              "unit-devastator-squad-profile-plasma-cannon-supercharge-ranged-9"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-devastator-squad-weapon-family-missile-launcher",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "profileIds": [
              "unit-devastator-squad-profile-missile-launcher-frag-ranged-10",
              "unit-devastator-squad-profile-missile-launcher-krak-ranged-11"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-devastator-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-devastator-squad-profile-plasma-pistol-supercharge-ranged-14",
              "unit-devastator-squad-profile-plasma-pistol-standard-ranged-15"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-devastator-squad-profile-boltgun-ranged",
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
              "unit-devastator-squad-selection-boltgun"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-heavy-bolter-ranged-4",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-lascannon-ranged-5",
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
              "unit-devastator-squad-selection-lascannon"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-grav-cannon-ranged-6",
            "title": "Grav-cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "3",
            "abilities": "Anti-vehicle 2+, Heavy",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-grav-cannon"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-multi-melta-ranged-7",
            "title": "Multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Heavy, Melta 2",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-multi-melta"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-plasma-cannon-standard-ranged-8",
            "title": "➤ Plasma cannon - standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-plasma-cannon-standard",
              "unit-devastator-squad-weapon-family-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-plasma-cannon-supercharge-ranged-9",
            "title": "➤ Plasma cannon - supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Blast, Heavy, Hazardous",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-plasma-cannon-supercharge",
              "unit-devastator-squad-weapon-family-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-missile-launcher-frag-ranged-10",
            "title": "➤ Missile Launcher - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-missile-launcher-frag",
              "unit-devastator-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-missile-launcher-krak-ranged-11",
            "title": "➤ Missile Launcher - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-missile-launcher-krak",
              "unit-devastator-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-astartes-chainsword-melee-12",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-grav-pistol-ranged-13",
            "title": "Grav-pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+, Pistol",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-grav-pistol"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-plasma-pistol-supercharge-ranged-14",
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
              "unit-devastator-squad-selection-plasma-pistol-supercharge",
              "unit-devastator-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-plasma-pistol-standard-ranged-15",
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
              "unit-devastator-squad-selection-plasma-pistol-standard",
              "unit-devastator-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-power-fist-melee-16",
            "title": "Power fist",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-thunder-hammer-melee-17",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-power-weapon-melee-18",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-devastator-squad-profile-combi-weapon-ranged-19",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-devastator-squad-selection-combi-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-eliminator-squad",
      "title": "Eliminator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Grenades",
        "Phobos",
        "Adeptus Astartes",
        "Eliminator Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-phobos-armour",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-librarian-in-phobos-armour",
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
              "unitId": "unit-captain-in-phobos-armour",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-librarian-in-phobos-armour",
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
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-eliminator-squad-ability-reposition-under-covering-fire",
            "title": "Reposition Under Covering Fire"
          },
          {
            "id": "unit-eliminator-squad-ability-mark-the-target-2",
            "title": "Mark the Target"
          },
          {
            "id": "unit-eliminator-squad-ability-infiltrators-3",
            "title": "Infiltrators"
          },
          {
            "id": "unit-eliminator-squad-ability-stealth-4",
            "title": "Stealth"
          },
          {
            "id": "unit-eliminator-squad-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-eliminator-squad-model-eliminators",
            "title": "Eliminators",
            "aliases": [
              "Eliminators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-eliminator-squad-selection-instigator-bolt-carbine",
            "title": "Instigator Bolt Carbine",
            "aliases": [
              "Instigator Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eliminator-squad-profile-instigator-bolt-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eliminator-squad-selection-bolt-sniper-rifle",
            "title": "Bolt Sniper Rifle",
            "aliases": [
              "Bolt Sniper Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eliminator-squad-profile-bolt-sniper-rifle-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eliminator-squad-selection-las-fusil",
            "title": "Las fusil",
            "aliases": [
              "Las fusil"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eliminator-squad-profile-las-fusil-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eliminator-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eliminator-squad-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eliminator-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eliminator-squad-profile-bolt-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-eliminator-squad-profile-instigator-bolt-carbine-ranged",
            "title": "Instigator Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-2",
            "d": "2",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-eliminator-squad-selection-instigator-bolt-carbine"
            ]
          },
          {
            "id": "unit-eliminator-squad-profile-bolt-sniper-rifle-ranged-2",
            "title": "Bolt Sniper Rifle",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "3",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-eliminator-squad-selection-bolt-sniper-rifle"
            ]
          },
          {
            "id": "unit-eliminator-squad-profile-las-fusil-ranged-3",
            "title": "Las fusil",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-3",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-eliminator-squad-selection-las-fusil"
            ]
          },
          {
            "id": "unit-eliminator-squad-profile-close-combat-weapon-melee-4",
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
              "unit-eliminator-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-eliminator-squad-profile-bolt-pistol-ranged-5",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-eliminator-squad-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-eradicator-squad",
      "title": "Eradicator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Gravis",
        "Eradicator Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-gravis-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-apothecary-biologis",
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
              "unitId": "unit-captain-in-gravis-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-apothecary-biologis",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "6",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-eradicator-squad-ability-total-obliteration",
            "title": "Total Obliteration"
          },
          {
            "id": "unit-eradicator-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-eradicator-squad-model-eradicators",
            "title": "Eradicators",
            "aliases": [
              "Eradicators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-eradicator-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eradicator-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eradicator-squad-selection-melta-rifle",
            "title": "Melta rifle",
            "aliases": [
              "Melta rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-profile-melta-rifle-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eradicator-squad-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-profile-multi-melta-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-eradicator-squad-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-eradicator-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-eradicator-squad-profile-close-combat-weapon-melee-2",
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
              "unit-eradicator-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-eradicator-squad-profile-melta-rifle-ranged-3",
            "title": "Melta rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Heavy, Melta 2",
            "sourceSelectionIds": [
              "unit-eradicator-squad-selection-melta-rifle"
            ]
          },
          {
            "id": "unit-eradicator-squad-profile-multi-melta-ranged-4",
            "title": "Multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Heavy, Melta 2",
            "sourceSelectionIds": [
              "unit-eradicator-squad-selection-multi-melta"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-eradicator-squad-with-heavy-bolters",
      "title": "Eradicator Squad with Heavy Bolters",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Gravis",
        "Eradicator Squad",
        "Adeptus Astartes",
        "Eradicator Squad with Heavy Bolters"
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
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-ability-overlapping-detonations",
            "title": "Overlapping Detonations"
          }
        ],
        "models": [
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-model-eradicators",
            "title": "Eradicators",
            "aliases": [
              "Eradicators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-with-heavy-bolters-profile-heavy-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-with-heavy-bolters-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-eradicator-squad-with-heavy-bolters-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-profile-heavy-bolter-ranged",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-eradicator-squad-with-heavy-bolters-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-eradicator-squad-with-heavy-bolters-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-eradicator-squad-with-heavy-bolters-profile-close-combat-weapon-melee-3",
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
              "unit-eradicator-squad-with-heavy-bolters-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hellblaster-squad",
      "title": "Hellblaster Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Hellblaster Squad",
        "Tacticus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-hellblaster-squad-ability-for-the-chapter",
            "title": "For the Chapter!"
          },
          {
            "id": "unit-hellblaster-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-hellblaster-squad-model-hellblasters",
            "title": "Hellblasters",
            "aliases": [
              "Hellblasters"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hellblaster-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-pistol-supercharge-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-selection-plasma-incinerator-standard",
            "title": "➤ Plasma Incinerator - Standard",
            "aliases": [
              "➤ Plasma Incinerator - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-incinerator-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-selection-plasma-incinerator-supercharge",
            "title": "➤ Plasma Incinerator - Supercharge",
            "aliases": [
              "➤ Plasma Incinerator - Supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-incinerator-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-hellblaster-squad-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-pistol-supercharge-ranged-2",
              "unit-hellblaster-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hellblaster-squad-weapon-family-plasma-incinerator-selection",
            "title": "➤ Plasma Incinerator",
            "aliases": [
              "➤ Plasma Incinerator"
            ],
            "kind": "weapon",
            "familyId": "unit-hellblaster-squad-weapon-family-plasma-incinerator",
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-incinerator-standard-ranged-5",
              "unit-hellblaster-squad-profile-plasma-incinerator-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-hellblaster-squad-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-pistol-supercharge-ranged-2",
              "unit-hellblaster-squad-profile-plasma-pistol-standard-ranged-3"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-hellblaster-squad-weapon-family-plasma-incinerator",
            "title": "➤ Plasma Incinerator",
            "aliases": [
              "➤ Plasma Incinerator"
            ],
            "profileIds": [
              "unit-hellblaster-squad-profile-plasma-incinerator-standard-ranged-5",
              "unit-hellblaster-squad-profile-plasma-incinerator-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-hellblaster-squad-profile-bolt-pistol-ranged",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-hellblaster-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-hellblaster-squad-profile-plasma-pistol-supercharge-ranged-2",
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
              "unit-hellblaster-squad-selection-plasma-pistol-supercharge",
              "unit-hellblaster-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-hellblaster-squad-profile-plasma-pistol-standard-ranged-3",
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
              "unit-hellblaster-squad-selection-plasma-pistol-standard",
              "unit-hellblaster-squad-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-hellblaster-squad-profile-close-combat-weapon-melee-4",
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
              "unit-hellblaster-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-hellblaster-squad-profile-plasma-incinerator-standard-ranged-5",
            "title": "➤ Plasma Incinerator - Standard",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-hellblaster-squad-selection-plasma-incinerator-standard",
              "unit-hellblaster-squad-weapon-family-plasma-incinerator-selection"
            ]
          },
          {
            "id": "unit-hellblaster-squad-profile-plasma-incinerator-supercharge-ranged-6",
            "title": "➤ Plasma Incinerator - Supercharge",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Assault, Heavy, Hazardous",
            "sourceSelectionIds": [
              "unit-hellblaster-squad-selection-plasma-incinerator-supercharge",
              "unit-hellblaster-squad-weapon-family-plasma-incinerator-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-inceptor-squad",
      "title": "Inceptor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "Jump Pack",
        "Imperium",
        "Gravis",
        "Adeptus Astartes",
        "Inceptor Squad"
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
          "T": "6",
          "Sv": "3+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-inceptor-squad-ability-meteoric-descent",
            "title": "Meteoric Descent"
          },
          {
            "id": "unit-inceptor-squad-ability-deep-strike-2",
            "title": "Deep Strike"
          },
          {
            "id": "unit-inceptor-squad-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-inceptor-squad-model-inceptors",
            "title": "Inceptors",
            "aliases": [
              "Inceptors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-inceptor-squad-selection-assault-bolters",
            "title": "Assault Bolters",
            "aliases": [
              "Assault Bolters"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-inceptor-squad-profile-assault-bolters-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-inceptor-squad-selection-plasma-exterminators-standard",
            "title": "➤ Plasma Exterminators - Standard",
            "aliases": [
              "➤ Plasma Exterminators - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-inceptor-squad-profile-plasma-exterminators-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-inceptor-squad-selection-plasma-exterminators-supercharge",
            "title": "➤ Plasma Exterminators - Supercharge",
            "aliases": [
              "➤ Plasma Exterminators - Supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-inceptor-squad-profile-plasma-exterminators-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-inceptor-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-inceptor-squad-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-inceptor-squad-weapon-family-plasma-exterminators-selection",
            "title": "➤ Plasma Exterminators",
            "aliases": [
              "➤ Plasma Exterminators"
            ],
            "kind": "weapon",
            "familyId": "unit-inceptor-squad-weapon-family-plasma-exterminators",
            "profileIds": [
              "unit-inceptor-squad-profile-plasma-exterminators-standard-ranged-2",
              "unit-inceptor-squad-profile-plasma-exterminators-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-inceptor-squad-weapon-family-plasma-exterminators",
            "title": "➤ Plasma Exterminators",
            "aliases": [
              "➤ Plasma Exterminators"
            ],
            "profileIds": [
              "unit-inceptor-squad-profile-plasma-exterminators-standard-ranged-2",
              "unit-inceptor-squad-profile-plasma-exterminators-supercharge-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-inceptor-squad-profile-assault-bolters-ranged",
            "title": "Assault Bolters",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault, Pistol, Sustained Hits 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-inceptor-squad-selection-assault-bolters"
            ]
          },
          {
            "id": "unit-inceptor-squad-profile-plasma-exterminators-standard-ranged-2",
            "title": "➤ Plasma Exterminators - Standard",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Assault, Pistol, Twin-linked",
            "sourceSelectionIds": [
              "unit-inceptor-squad-selection-plasma-exterminators-standard",
              "unit-inceptor-squad-weapon-family-plasma-exterminators-selection"
            ]
          },
          {
            "id": "unit-inceptor-squad-profile-plasma-exterminators-supercharge-ranged-3",
            "title": "➤ Plasma Exterminators - Supercharge",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Assault, Pistol, Hazardous, Twin-linked",
            "sourceSelectionIds": [
              "unit-inceptor-squad-selection-plasma-exterminators-supercharge",
              "unit-inceptor-squad-weapon-family-plasma-exterminators-selection"
            ]
          },
          {
            "id": "unit-inceptor-squad-profile-close-combat-weapon-melee-4",
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
              "unit-inceptor-squad-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-incursor-squad",
      "title": "Incursor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Smoke",
        "Phobos",
        "Incursor Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-phobos-armour",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian-in-phobos-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-lieutenant-in-phobos-armour",
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
              "unitId": "unit-captain-in-phobos-armour",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian-in-phobos-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-lieutenant-in-phobos-armour",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-incursor-squad-ability-multi-spectrum-array",
            "title": "Multi-spectrum Array"
          },
          {
            "id": "unit-incursor-squad-ability-scouts-6-2",
            "title": "Scouts 6\""
          },
          {
            "id": "unit-incursor-squad-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-incursor-squad-model-incursors",
            "title": "Incursors",
            "aliases": [
              "Incursors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-incursor-squad-selection-occulus-bolt-carbine",
            "title": "Occulus Bolt Carbine",
            "aliases": [
              "Occulus Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-incursor-squad-profile-occulus-bolt-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-incursor-squad-selection-paired-combat-blades",
            "title": "Paired Combat Blades",
            "aliases": [
              "Paired Combat Blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-incursor-squad-profile-paired-combat-blades-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-incursor-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-incursor-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-incursor-squad-selection-haywire-mine",
            "title": "Haywire Mine",
            "aliases": [
              "Haywire Mine"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-incursor-squad-wargear-ability-haywire-mine"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-incursor-squad-profile-occulus-bolt-carbine-ranged",
            "title": "Occulus Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Ignores Cover",
            "sourceSelectionIds": [
              "unit-incursor-squad-selection-occulus-bolt-carbine"
            ]
          },
          {
            "id": "unit-incursor-squad-profile-paired-combat-blades-melee-2",
            "title": "Paired Combat Blades",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-incursor-squad-selection-paired-combat-blades"
            ]
          },
          {
            "id": "unit-incursor-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-incursor-squad-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-incursor-squad-wargear-ability-haywire-mine",
            "title": "Haywire Mine",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-infernus-squad",
      "title": "Infernus Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Tacticus",
        "Infernus Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-infernus-squad-ability-purge-the-foe",
            "title": "Purge the Foe"
          },
          {
            "id": "unit-infernus-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-infernus-squad-model-infernus-marines",
            "title": "Infernus Marines",
            "aliases": [
              "Infernus Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-infernus-squad-selection-pyreblaster",
            "title": "Pyreblaster",
            "aliases": [
              "Pyreblaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infernus-squad-profile-pyreblaster-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infernus-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infernus-squad-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infernus-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infernus-squad-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-infernus-squad-profile-pyreblaster-ranged",
            "title": "Pyreblaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-infernus-squad-selection-pyreblaster"
            ]
          },
          {
            "id": "unit-infernus-squad-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-infernus-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-infernus-squad-profile-close-combat-weapon-melee-3",
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
              "unit-infernus-squad-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-infiltrator-squad",
      "title": "Infiltrator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Smoke",
        "Phobos",
        "Adeptus Astartes",
        "Infiltrator Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-phobos-armour",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian-in-phobos-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-lieutenant-in-phobos-armour",
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
              "unitId": "unit-captain-in-phobos-armour",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian-in-phobos-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-lieutenant-in-phobos-armour",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-infiltrator-squad-ability-omni-scramblers",
            "title": "Omni-scramblers"
          },
          {
            "id": "unit-infiltrator-squad-ability-feel-no-pain-2",
            "title": "Feel No Pain"
          },
          {
            "id": "unit-infiltrator-squad-ability-infiltrators-3",
            "title": "Infiltrators"
          },
          {
            "id": "unit-infiltrator-squad-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-infiltrator-squad-model-infiltrators",
            "title": "Infiltrators",
            "aliases": [
              "Infiltrators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-infiltrator-squad-selection-marksman-bolt-carbine",
            "title": "Marksman Bolt Carbine",
            "aliases": [
              "Marksman Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infiltrator-squad-profile-marksman-bolt-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infiltrator-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infiltrator-squad-profile-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infiltrator-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-infiltrator-squad-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-infiltrator-squad-selection-helix-gauntlet",
            "title": "Helix Gauntlet",
            "aliases": [
              "Helix Gauntlet"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-infiltrator-squad-wargear-ability-helix-gauntlet"
            ]
          },
          {
            "id": "unit-infiltrator-squad-selection-infiltrator-comms-array",
            "title": "Infiltrator Comms Array",
            "aliases": [
              "Infiltrator Comms Array"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-infiltrator-squad-wargear-ability-infiltrator-comms-array-2"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-infiltrator-squad-profile-marksman-bolt-carbine-ranged",
            "title": "Marksman Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-infiltrator-squad-selection-marksman-bolt-carbine"
            ]
          },
          {
            "id": "unit-infiltrator-squad-profile-bolt-pistol-ranged-2",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-infiltrator-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-infiltrator-squad-profile-close-combat-weapon-melee-3",
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
              "unit-infiltrator-squad-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-infiltrator-squad-wargear-ability-helix-gauntlet",
            "title": "Helix Gauntlet",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-infiltrator-squad-wargear-ability-infiltrator-comms-array-2",
            "title": "Infiltrator Comms Array",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-reiver-squad",
      "title": "Reiver Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Smoke",
        "Phobos",
        "Reiver Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-phobos-armour",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian-in-phobos-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-lieutenant-in-phobos-armour",
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
              "unitId": "unit-captain-in-phobos-armour",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian-in-phobos-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-lieutenant-in-phobos-armour",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-reiver-squad-ability-fearsome-assault",
            "title": "Fearsome Assault"
          },
          {
            "id": "unit-reiver-squad-ability-terror-troops-2",
            "title": "Terror Troops"
          },
          {
            "id": "unit-reiver-squad-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-reiver-squad-ability-scouts-6-4",
            "title": "Scouts 6\""
          },
          {
            "id": "unit-reiver-squad-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-reiver-squad-model-reivers",
            "title": "Reivers",
            "aliases": [
              "Reivers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-reiver-squad-selection-special-issue-bolt-pistol",
            "title": "Special Issue Bolt Pistol",
            "aliases": [
              "Special Issue Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-reiver-squad-profile-special-issue-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-reiver-squad-selection-combat-knife",
            "title": "Combat Knife",
            "aliases": [
              "Combat Knife"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-reiver-squad-profile-combat-knife-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-reiver-squad-selection-bolt-carbine",
            "title": "Bolt Carbine",
            "aliases": [
              "Bolt Carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-reiver-squad-profile-bolt-carbine-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-reiver-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-reiver-squad-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-reiver-squad-selection-grapnel-launchers",
            "title": "Grapnel Launchers",
            "aliases": [
              "Grapnel Launchers"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-reiver-squad-wargear-ability-grapnel-launchers"
            ]
          },
          {
            "id": "unit-reiver-squad-selection-reiver-grav-chute",
            "title": "Reiver Grav-chute",
            "aliases": [
              "Reiver Grav-chute"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-reiver-squad-wargear-ability-reiver-grav-chute-2"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-reiver-squad-profile-special-issue-bolt-pistol-ranged",
            "title": "Special Issue Bolt Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol, Precision",
            "sourceSelectionIds": [
              "unit-reiver-squad-selection-special-issue-bolt-pistol"
            ]
          },
          {
            "id": "unit-reiver-squad-profile-combat-knife-melee-2",
            "title": "Combat Knife",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-reiver-squad-selection-combat-knife"
            ]
          },
          {
            "id": "unit-reiver-squad-profile-bolt-carbine-ranged-3",
            "title": "Bolt Carbine",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Precision",
            "sourceSelectionIds": [
              "unit-reiver-squad-selection-bolt-carbine"
            ]
          },
          {
            "id": "unit-reiver-squad-profile-close-combat-weapon-melee-4",
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
              "unit-reiver-squad-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-reiver-squad-wargear-ability-grapnel-launchers",
            "title": "Grapnel Launchers",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-reiver-squad-wargear-ability-reiver-grav-chute-2",
            "title": "Reiver Grav-chute",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-scout-squad",
      "title": "Scout Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Smoke",
        "Scout Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-phobos-armour",
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
              "unitId": "unit-captain-in-phobos-armour",
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
          "Sv": "4+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-scout-squad-ability-guerrilla-tactics",
            "title": "Guerrilla Tactics"
          },
          {
            "id": "unit-scout-squad-ability-scouts-6-2",
            "title": "Scouts 6\""
          },
          {
            "id": "unit-scout-squad-ability-infiltrators-3",
            "title": "Infiltrators"
          },
          {
            "id": "unit-scout-squad-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-scout-squad-model-scouts",
            "title": "Scouts",
            "aliases": [
              "Scouts"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-scout-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-boltgun",
            "title": "Boltgun",
            "aliases": [
              "Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-boltgun-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-combat-knife",
            "title": "Combat Knife",
            "aliases": [
              "Combat Knife"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-combat-knife-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-astartes-shotgun",
            "title": "Astartes Shotgun",
            "aliases": [
              "Astartes Shotgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-astartes-shotgun-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-astartes-chainsword-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-heavy-bolter-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-missile-launcher-frag",
            "title": "➤ Missile Launcher - Frag",
            "aliases": [
              "➤ Missile Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-missile-launcher-frag-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-missile-launcher-krak",
            "title": "➤ Missile Launcher - Krak",
            "aliases": [
              "➤ Missile Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-missile-launcher-krak-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-selection-scout-sniper-rifle",
            "title": "Scout Sniper Rifle",
            "aliases": [
              "Scout Sniper Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-scout-squad-profile-scout-sniper-rifle-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-scout-squad-weapon-family-missile-launcher-selection",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-scout-squad-weapon-family-missile-launcher",
            "profileIds": [
              "unit-scout-squad-profile-missile-launcher-frag-ranged-8",
              "unit-scout-squad-profile-missile-launcher-krak-ranged-9"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-scout-squad-weapon-family-missile-launcher",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "profileIds": [
              "unit-scout-squad-profile-missile-launcher-frag-ranged-8",
              "unit-scout-squad-profile-missile-launcher-krak-ranged-9"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-scout-squad-profile-close-combat-weapon-melee",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-scout-squad-profile-boltgun-ranged-2",
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
              "unit-scout-squad-selection-boltgun"
            ]
          },
          {
            "id": "unit-scout-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-scout-squad-profile-combat-knife-melee-4",
            "title": "Combat Knife",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-combat-knife"
            ]
          },
          {
            "id": "unit-scout-squad-profile-astartes-shotgun-ranged-5",
            "title": "Astartes Shotgun",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-astartes-shotgun"
            ]
          },
          {
            "id": "unit-scout-squad-profile-astartes-chainsword-melee-6",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-scout-squad-profile-heavy-bolter-ranged-7",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-scout-squad-profile-missile-launcher-frag-ranged-8",
            "title": "➤ Missile Launcher - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-missile-launcher-frag",
              "unit-scout-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-scout-squad-profile-missile-launcher-krak-ranged-9",
            "title": "➤ Missile Launcher - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-missile-launcher-krak",
              "unit-scout-squad-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-scout-squad-profile-scout-sniper-rifle-ranged-10",
            "title": "Scout Sniper Rifle",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-2",
            "d": "2",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-scout-squad-selection-scout-sniper-rifle"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sternguard-veteran-squad",
      "title": "Sternguard Veteran Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Tacticus",
        "Sternguard Veteran Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-blood-angels-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-captain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-judiciar",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-apothecary",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-lieutenant",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sanguinary-priest",
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
              "unitId": "unit-blood-angels-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-captain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-judiciar",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-apothecary",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-lieutenant",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sanguinary-priest",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-sternguard-veteran-squad-ability-sternguard-focus",
            "title": "Sternguard Focus"
          },
          {
            "id": "unit-sternguard-veteran-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-sternguard-veteran-squad-model-sternguard-veterans",
            "title": "Sternguard Veterans",
            "aliases": [
              "Sternguard Veterans"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sternguard-veteran-squad-selection-sternguard-bolt-pistol",
            "title": "Sternguard Bolt Pistol",
            "aliases": [
              "Sternguard Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-sternguard-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-sternguard-bolt-rifle",
            "title": "Sternguard Bolt Rifle",
            "aliases": [
              "Sternguard Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-sternguard-bolt-rifle-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-combi-weapon",
            "title": "Combi-weapon",
            "aliases": [
              "Combi-weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-combi-weapon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-power-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-power-fist-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-astartes-chainsword-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-sternguard-heavy-bolter",
            "title": "Sternguard Heavy Bolter",
            "aliases": [
              "Sternguard Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-sternguard-heavy-bolter-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sternguard-veteran-squad-selection-pyrecannon",
            "title": "Pyrecannon",
            "aliases": [
              "Pyrecannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sternguard-veteran-squad-profile-pyrecannon-ranged-9"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sternguard-veteran-squad-profile-sternguard-bolt-pistol-ranged",
            "title": "Sternguard Bolt Pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-sternguard-bolt-pistol"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-sternguard-bolt-rifle-ranged-2",
            "title": "Sternguard Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Devastating Wounds, Heavy, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-sternguard-bolt-rifle"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-combi-weapon-ranged-4",
            "title": "Combi-weapon",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-combi-weapon"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-power-weapon-melee-5",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-power-fist-melee-6",
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
              "unit-sternguard-veteran-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-astartes-chainsword-melee-7",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-sternguard-heavy-bolter-ranged-8",
            "title": "Sternguard Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Devastating Wounds, Heavy, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-sternguard-heavy-bolter"
            ]
          },
          {
            "id": "unit-sternguard-veteran-squad-profile-pyrecannon-ranged-9",
            "title": "Pyrecannon",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+1",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-sternguard-veteran-squad-selection-pyrecannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-suppressor-squad",
      "title": "Suppressor Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Smoke",
        "Fly",
        "Jump Pack",
        "Suppressor Squad",
        "Adeptus Astartes"
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-suppressor-squad-ability-suppression-fire",
            "title": "Suppression Fire"
          },
          {
            "id": "unit-suppressor-squad-ability-deep-strike-2",
            "title": "Deep Strike"
          },
          {
            "id": "unit-suppressor-squad-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-suppressor-squad-model-suppressors",
            "title": "Suppressors",
            "aliases": [
              "Suppressors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-suppressor-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-suppressor-squad-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-suppressor-squad-selection-accelerator-autocannon",
            "title": "Accelerator Autocannon",
            "aliases": [
              "Accelerator Autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-suppressor-squad-profile-accelerator-autocannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-suppressor-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-suppressor-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-suppressor-squad-profile-close-combat-weapon-melee",
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
              "unit-suppressor-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-suppressor-squad-profile-accelerator-autocannon-ranged-2",
            "title": "Accelerator Autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-suppressor-squad-selection-accelerator-autocannon"
            ]
          },
          {
            "id": "unit-suppressor-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-suppressor-squad-selection-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-terminator-assault-squad",
      "title": "Terminator Assault Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Terminator Assault Squad",
        "Terminator",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-terminator-armour",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-chaplain-in-terminator-armour",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-librarian-in-terminator-armour",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-ancient-in-terminator-armor",
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
              "unitId": "unit-captain-in-terminator-armour",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-chaplain-in-terminator-armour",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-librarian-in-terminator-armour",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-ancient-in-terminator-armor",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "5",
          "Sv": "2+",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-terminator-assault-squad-ability-teleport-homer",
            "title": "Teleport Homer"
          },
          {
            "id": "unit-terminator-assault-squad-ability-terminatus-assault-2",
            "title": "Terminatus Assault"
          },
          {
            "id": "unit-terminator-assault-squad-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-terminator-assault-squad-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-terminator-assault-squad-model-assault-terminators",
            "title": "Assault Terminators",
            "aliases": [
              "Assault Terminators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-terminator-assault-squad-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-assault-squad-profile-thunder-hammer-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-assault-squad-selection-twin-lightning-claws",
            "title": "Twin Lightning Claws",
            "aliases": [
              "Twin Lightning Claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-assault-squad-profile-twin-lightning-claws-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-assault-squad-selection-storm-shield",
            "title": "Storm Shield",
            "aliases": [
              "Storm Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-terminator-assault-squad-wargear-ability-storm-shield"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-terminator-assault-squad-profile-thunder-hammer-melee",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-terminator-assault-squad-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-terminator-assault-squad-profile-twin-lightning-claws-melee-2",
            "title": "Twin Lightning Claws",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-terminator-assault-squad-selection-twin-lightning-claws"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-terminator-assault-squad-wargear-ability-storm-shield",
            "title": "Storm Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-terminator-squad",
      "title": "Terminator Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Terminator",
        "Terminator Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-in-terminator-armour",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chaplain-in-terminator-armour",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-librarian-in-terminator-armour",
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
              "unitId": "unit-captain-in-terminator-armour",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chaplain-in-terminator-armour",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-librarian-in-terminator-armour",
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
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "unit-terminator-squad-ability-teleport-homer",
            "title": "Teleport Homer"
          },
          {
            "id": "unit-terminator-squad-ability-fury-of-the-first-2",
            "title": "Fury of the First"
          },
          {
            "id": "unit-terminator-squad-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-terminator-squad-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-terminator-squad-model-terminators",
            "title": "Terminators",
            "aliases": [
              "Terminators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-terminator-squad-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-power-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-chainfist",
            "title": "Chainfist",
            "aliases": [
              "Chainfist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-chainfist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-power-fist-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-storm-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-cyclone-missile-launcher-frag",
            "title": "➤ Cyclone missile launcher - frag",
            "aliases": [
              "➤ Cyclone missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-cyclone-missile-launcher-frag-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-cyclone-missile-launcher-krak",
            "title": "➤ Cyclone missile launcher - krak",
            "aliases": [
              "➤ Cyclone missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-cyclone-missile-launcher-krak-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-heavy-flamer",
            "title": "Heavy Flamer",
            "aliases": [
              "Heavy Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-heavy-flamer-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-selection-assault-cannon",
            "title": "Assault Cannon",
            "aliases": [
              "Assault Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-terminator-squad-profile-assault-cannon-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-terminator-squad-weapon-family-cyclone-missile-launcher-selection",
            "title": "➤ Cyclone missile launcher",
            "aliases": [
              "➤ Cyclone missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-terminator-squad-weapon-family-cyclone-missile-launcher",
            "profileIds": [
              "unit-terminator-squad-profile-cyclone-missile-launcher-frag-ranged-5",
              "unit-terminator-squad-profile-cyclone-missile-launcher-krak-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-terminator-squad-weapon-family-cyclone-missile-launcher",
            "title": "➤ Cyclone missile launcher",
            "aliases": [
              "➤ Cyclone missile launcher"
            ],
            "profileIds": [
              "unit-terminator-squad-profile-cyclone-missile-launcher-frag-ranged-5",
              "unit-terminator-squad-profile-cyclone-missile-launcher-krak-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-terminator-squad-profile-power-weapon-melee",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-power-weapon"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-chainfist-melee-2",
            "title": "Chainfist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Vehicle 3+",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-chainfist"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-power-fist-melee-3",
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
              "unit-terminator-squad-selection-power-fist"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-storm-bolter-ranged-4",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-cyclone-missile-launcher-frag-ranged-5",
            "title": "➤ Cyclone missile launcher - frag",
            "mode": "ranged",
            "range": "36\"",
            "a": "2D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-cyclone-missile-launcher-frag",
              "unit-terminator-squad-weapon-family-cyclone-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-cyclone-missile-launcher-krak-ranged-6",
            "title": "➤ Cyclone missile launcher - krak",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-cyclone-missile-launcher-krak",
              "unit-terminator-squad-weapon-family-cyclone-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-heavy-flamer-ranged-7",
            "title": "Heavy Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-terminator-squad-profile-assault-cannon-ranged-8",
            "title": "Assault Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-terminator-squad-selection-assault-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-vanguard-veteran-squad-with-jump-packs",
      "title": "Vanguard Veteran Squad with Jump Packs",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Vanguard Veteran Squad with Jump Packs",
        "Jump Pack",
        "Fly",
        "Vanguard Veteran Squad"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chaplain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-dante",
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
              "unitId": "unit-captain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chaplain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-dante",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-ability-vanguard-assault",
            "title": "Vanguard Assault"
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-ability-deep-strike-3",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-model-vanguard-veterans-with-jump-packs",
            "title": "Vanguard Veterans with Jump Packs",
            "aliases": [
              "Vanguard Veterans with Jump Packs"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-supercharge-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-inferno-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-hand-flamer-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-bolt-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-grav-pistol",
            "title": "Grav-pistol",
            "aliases": [
              "Grav-pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-grav-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-vanguard-veteran-weapon",
            "title": "Vanguard Veteran Weapon",
            "aliases": [
              "Vanguard Veteran Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-vanguard-veteran-weapon-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-heavy-bolt-pistol-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-master-crafted-power-weapon",
            "title": "Master-crafted Power Weapon",
            "aliases": [
              "Master-crafted Power Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-master-crafted-power-weapon-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-vanguard-veteran-squad-with-jump-packs-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-supercharge-ranged",
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-selection-storm-shield",
            "title": "Storm Shield",
            "aliases": [
              "Storm Shield"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-wargear-ability-storm-shield"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-supercharge-ranged",
              "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-standard-ranged-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-supercharge-ranged",
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
              "unit-vanguard-veteran-squad-with-jump-packs-selection-plasma-pistol-supercharge",
              "unit-vanguard-veteran-squad-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-plasma-pistol-standard-ranged-2",
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
              "unit-vanguard-veteran-squad-with-jump-packs-selection-plasma-pistol-standard",
              "unit-vanguard-veteran-squad-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-inferno-pistol-ranged-3",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-inferno-pistol"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-hand-flamer-ranged-4",
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
              "unit-vanguard-veteran-squad-with-jump-packs-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-bolt-pistol-ranged-5",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-grav-pistol-ranged-6",
            "title": "Grav-pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-vehicle 2+, Pistol",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-grav-pistol"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-vanguard-veteran-weapon-melee-7",
            "title": "Vanguard Veteran Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-vanguard-veteran-weapon"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-heavy-bolt-pistol-ranged-8",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-profile-master-crafted-power-weapon-melee-9",
            "title": "Master-crafted Power Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-vanguard-veteran-squad-with-jump-packs-selection-master-crafted-power-weapon"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-vanguard-veteran-squad-with-jump-packs-wargear-ability-storm-shield",
            "title": "Storm Shield",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-invader-atv",
      "title": "Invader ATV",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Mounted",
        "Grenades",
        "Imperium",
        "Invader ATV",
        "Adeptus Astartes",
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
          "T": "5",
          "Sv": "3+",
          "W": "8",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-invader-atv-ability-outrider-escort",
            "title": "Outrider Escort"
          },
          {
            "id": "unit-invader-atv-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-invader-atv-model-invader-atv",
            "title": "Invader ATV",
            "aliases": [
              "Invader ATV"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-invader-atv-selection-onslaught-gatling-cannon",
            "title": "Onslaught gatling cannon",
            "aliases": [
              "Onslaught gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invader-atv-profile-onslaught-gatling-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invader-atv-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invader-atv-profile-multi-melta-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invader-atv-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invader-atv-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invader-atv-selection-twin-bolt-rifle",
            "title": "Twin bolt rifle",
            "aliases": [
              "Twin bolt rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invader-atv-profile-twin-bolt-rifle-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invader-atv-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invader-atv-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-invader-atv-profile-onslaught-gatling-cannon-ranged",
            "title": "Onslaught gatling cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-invader-atv-selection-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-invader-atv-profile-multi-melta-ranged-2",
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
              "unit-invader-atv-selection-multi-melta"
            ]
          },
          {
            "id": "unit-invader-atv-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-invader-atv-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-invader-atv-profile-twin-bolt-rifle-ranged-4",
            "title": "Twin bolt rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-invader-atv-selection-twin-bolt-rifle"
            ]
          },
          {
            "id": "unit-invader-atv-profile-close-combat-weapon-melee-5",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-invader-atv-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-outrider-squad",
      "title": "Outrider Squad",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Mounted",
        "Grenades",
        "Imperium",
        "Outrider Squad",
        "Adeptus Astartes"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaplain-on-bike",
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
              "unitId": "unit-chaplain-on-bike",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "12\"",
          "T": "5",
          "Sv": "3+",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-outrider-squad-ability-thunderous-impact",
            "title": "Thunderous Impact"
          },
          {
            "id": "unit-outrider-squad-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-outrider-squad-model-invader-atv",
            "title": "Invader ATV",
            "aliases": [
              "Invader ATV"
            ]
          },
          {
            "id": "unit-outrider-squad-model-outriders-2",
            "title": "Outriders",
            "aliases": [
              "Outriders"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-outrider-squad-selection-onslaught-gatling-cannon",
            "title": "Onslaught gatling cannon",
            "aliases": [
              "Onslaught gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-onslaught-gatling-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-multi-melta-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-bolt-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-twin-bolt-rifle",
            "title": "Twin bolt rifle",
            "aliases": [
              "Twin bolt rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-twin-bolt-rifle-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-astartes-chainsword-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-outrider-squad-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-outrider-squad-profile-heavy-bolt-pistol-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-outrider-squad-profile-onslaught-gatling-cannon-ranged",
            "title": "Onslaught gatling cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-multi-melta-ranged-2",
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
              "unit-outrider-squad-selection-multi-melta"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-bolt-pistol-ranged-3",
            "title": "Bolt pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Close-Quarters",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-twin-bolt-rifle-ranged-4",
            "title": "Twin bolt rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-twin-bolt-rifle"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-close-combat-weapon-melee-5",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-astartes-chainsword-melee-6",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-outrider-squad-profile-heavy-bolt-pistol-ranged-7",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-outrider-squad-selection-heavy-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-ballistus-dreadnought",
      "title": "Ballistus Dreadnought",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Imperium",
        "Ballistus Dreadnought",
        "Adeptus Astartes",
        "Dreadnought"
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
          "W": "12",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-ballistus-dreadnought-ability-ballistus-strike",
            "title": "Ballistus Strike"
          },
          {
            "id": "unit-ballistus-dreadnought-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-ballistus-dreadnought-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-ballistus-dreadnought-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-ballistus-dreadnought-model-ballistus-dreadnought",
            "title": "Ballistus Dreadnought",
            "aliases": [
              "Ballistus Dreadnought"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ballistus-dreadnought-selection-armoured-feet",
            "title": "Armoured Feet",
            "aliases": [
              "Armoured Feet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-armoured-feet-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ballistus-dreadnought-selection-ballistus-lascannon",
            "title": "Ballistus Lascannon",
            "aliases": [
              "Ballistus Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-ballistus-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ballistus-dreadnought-selection-ballistus-missile-launcher-frag",
            "title": "➤ Ballistus Missile Launcher - Frag",
            "aliases": [
              "➤ Ballistus Missile Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-frag-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ballistus-dreadnought-selection-ballistus-missile-launcher-krak",
            "title": "➤ Ballistus Missile Launcher - Krak",
            "aliases": [
              "➤ Ballistus Missile Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ballistus-dreadnought-selection-twin-storm-bolter",
            "title": "Twin Storm Bolter",
            "aliases": [
              "Twin Storm Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-twin-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ballistus-dreadnought-weapon-family-ballistus-missile-launcher-selection",
            "title": "➤ Ballistus Missile Launcher",
            "aliases": [
              "➤ Ballistus Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-ballistus-dreadnought-weapon-family-ballistus-missile-launcher",
            "profileIds": [
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-frag-ranged-3",
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-krak-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-ballistus-dreadnought-weapon-family-ballistus-missile-launcher",
            "title": "➤ Ballistus Missile Launcher",
            "aliases": [
              "➤ Ballistus Missile Launcher"
            ],
            "profileIds": [
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-frag-ranged-3",
              "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-krak-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-ballistus-dreadnought-profile-armoured-feet-melee",
            "title": "Armoured Feet",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "7",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ballistus-dreadnought-selection-armoured-feet"
            ]
          },
          {
            "id": "unit-ballistus-dreadnought-profile-ballistus-lascannon-ranged-2",
            "title": "Ballistus Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ballistus-dreadnought-selection-ballistus-lascannon"
            ]
          },
          {
            "id": "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-frag-ranged-3",
            "title": "➤ Ballistus Missile Launcher - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-ballistus-dreadnought-selection-ballistus-missile-launcher-frag",
              "unit-ballistus-dreadnought-weapon-family-ballistus-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-ballistus-dreadnought-profile-ballistus-missile-launcher-krak-ranged-4",
            "title": "➤ Ballistus Missile Launcher - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ballistus-dreadnought-selection-ballistus-missile-launcher-krak",
              "unit-ballistus-dreadnought-weapon-family-ballistus-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-ballistus-dreadnought-profile-twin-storm-bolter-ranged-5",
            "title": "Twin Storm Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-ballistus-dreadnought-selection-twin-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-brutalis-dreadnought",
      "title": "Brutalis Dreadnought",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Brutalis Dreadnought",
        "Imperium",
        "Adeptus Astartes",
        "Dreadnought"
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
          "W": "12",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-brutalis-dreadnought-ability-brutalis-charge",
            "title": "Brutalis Charge"
          },
          {
            "id": "unit-brutalis-dreadnought-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-brutalis-dreadnought-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-brutalis-dreadnought-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-brutalis-dreadnought-model-brutalis-dreadnought",
            "title": "Brutalis Dreadnought",
            "aliases": [
              "Brutalis Dreadnought"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-brutalis-dreadnought-selection-brutalis-fists",
            "title": "Brutalis Fists",
            "aliases": [
              "Brutalis Fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-brutalis-bolt-rifles",
            "title": "Brutalis Bolt Rifles",
            "aliases": [
              "Brutalis Bolt Rifles"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-bolt-rifles-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-brutalis-talons-strike",
            "title": "➤ Brutalis Talons - Strike",
            "aliases": [
              "➤ Brutalis Talons - Strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-talons-strike-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-brutalis-talons-sweep",
            "title": "➤ Brutalis Talons - Sweep",
            "aliases": [
              "➤ Brutalis Talons - Sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-talons-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-twin-heavy-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-twin-multi-melta",
            "title": "Twin multi-melta",
            "aliases": [
              "Twin multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-twin-multi-melta-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-selection-twin-icarus-ironhail-heavy-stubber",
            "title": "Twin Icarus ironhail heavy stubber",
            "aliases": [
              "Twin Icarus ironhail heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-twin-icarus-ironhail-heavy-stubber-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-brutalis-dreadnought-weapon-family-brutalis-talons-selection",
            "title": "➤ Brutalis Talons",
            "aliases": [
              "➤ Brutalis Talons"
            ],
            "kind": "weapon",
            "familyId": "unit-brutalis-dreadnought-weapon-family-brutalis-talons",
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-talons-strike-melee-3",
              "unit-brutalis-dreadnought-profile-brutalis-talons-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-brutalis-dreadnought-weapon-family-brutalis-talons",
            "title": "➤ Brutalis Talons",
            "aliases": [
              "➤ Brutalis Talons"
            ],
            "profileIds": [
              "unit-brutalis-dreadnought-profile-brutalis-talons-strike-melee-3",
              "unit-brutalis-dreadnought-profile-brutalis-talons-sweep-melee-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-brutalis-dreadnought-profile-brutalis-fists-melee",
            "title": "Brutalis Fists",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-brutalis-fists"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-brutalis-bolt-rifles-ranged-2",
            "title": "Brutalis Bolt Rifles",
            "mode": "ranged",
            "range": "24\"",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-brutalis-bolt-rifles"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-brutalis-talons-strike-melee-3",
            "title": "➤ Brutalis Talons - Strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-brutalis-talons-strike",
              "unit-brutalis-dreadnought-weapon-family-brutalis-talons-selection"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-brutalis-talons-sweep-melee-4",
            "title": "➤ Brutalis Talons - Sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "10",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-brutalis-talons-sweep",
              "unit-brutalis-dreadnought-weapon-family-brutalis-talons-selection"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-twin-heavy-bolter-ranged-5",
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
              "unit-brutalis-dreadnought-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-twin-multi-melta-ranged-6",
            "title": "Twin multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-twin-multi-melta"
            ]
          },
          {
            "id": "unit-brutalis-dreadnought-profile-twin-icarus-ironhail-heavy-stubber-ranged-7",
            "title": "Twin Icarus ironhail heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-FLY 4+, Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-brutalis-dreadnought-selection-twin-icarus-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-dreadnought",
      "title": "Dreadnought",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Walker",
        "Dreadnought"
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-dreadnought-ability-wisdom-of-the-ancients-aura",
            "title": "Wisdom of the Ancients [Aura]"
          },
          {
            "id": "unit-dreadnought-ability-deadly-demise-1-2",
            "title": "Deadly Demise 1"
          },
          {
            "id": "unit-dreadnought-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-dreadnought-model-dreadnought",
            "title": "Dreadnought",
            "aliases": [
              "Dreadnought"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-dreadnought-selection-dreadnought-combat-weapon",
            "title": "Dreadnought Combat Weapon",
            "aliases": [
              "Dreadnought Combat Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-dreadnought-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-heavy-flamer",
            "title": "Heavy Flamer",
            "aliases": [
              "Heavy Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-heavy-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-storm-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-missile-launcher-frag",
            "title": "➤ Missile Launcher - Frag",
            "aliases": [
              "➤ Missile Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-missile-launcher-frag-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-missile-launcher-krak",
            "title": "➤ Missile Launcher - Krak",
            "aliases": [
              "➤ Missile Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-missile-launcher-krak-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-close-combat-weapon-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-assault-cannon",
            "title": "Assault Cannon",
            "aliases": [
              "Assault Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-assault-cannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-multi-melta-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-twin-lascannon-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-heavy-plasma-cannon-standard",
            "title": "➤ Heavy Plasma Cannon - Standard",
            "aliases": [
              "➤ Heavy Plasma Cannon - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-heavy-plasma-cannon-standard-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-selection-heavy-plasma-cannon",
            "title": "➤ Heavy Plasma Cannon",
            "aliases": [
              "➤ Heavy Plasma Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-dreadnought-profile-heavy-plasma-cannon-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-dreadnought-weapon-family-missile-launcher-selection",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-dreadnought-weapon-family-missile-launcher",
            "profileIds": [
              "unit-dreadnought-profile-missile-launcher-frag-ranged-4",
              "unit-dreadnought-profile-missile-launcher-krak-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-dreadnought-weapon-family-missile-launcher",
            "title": "➤ Missile Launcher",
            "aliases": [
              "➤ Missile Launcher"
            ],
            "profileIds": [
              "unit-dreadnought-profile-missile-launcher-frag-ranged-4",
              "unit-dreadnought-profile-missile-launcher-krak-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-dreadnought-profile-dreadnought-combat-weapon-melee",
            "title": "Dreadnought Combat Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-dreadnought-combat-weapon"
            ]
          },
          {
            "id": "unit-dreadnought-profile-heavy-flamer-ranged-2",
            "title": "Heavy Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-dreadnought-profile-storm-bolter-ranged-3",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-dreadnought-profile-missile-launcher-frag-ranged-4",
            "title": "➤ Missile Launcher - Frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-missile-launcher-frag",
              "unit-dreadnought-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-dreadnought-profile-missile-launcher-krak-ranged-5",
            "title": "➤ Missile Launcher - Krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-missile-launcher-krak",
              "unit-dreadnought-weapon-family-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-dreadnought-profile-close-combat-weapon-melee-6",
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
              "unit-dreadnought-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-dreadnought-profile-assault-cannon-ranged-7",
            "title": "Assault Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-assault-cannon"
            ]
          },
          {
            "id": "unit-dreadnought-profile-multi-melta-ranged-8",
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
              "unit-dreadnought-selection-multi-melta"
            ]
          },
          {
            "id": "unit-dreadnought-profile-twin-lascannon-ranged-9",
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
              "unit-dreadnought-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-dreadnought-profile-heavy-plasma-cannon-standard-ranged-10",
            "title": "➤ Heavy Plasma Cannon - Standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-heavy-plasma-cannon-standard"
            ]
          },
          {
            "id": "unit-dreadnought-profile-heavy-plasma-cannon-ranged-11",
            "title": "➤ Heavy Plasma Cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Hazardous",
            "sourceSelectionIds": [
              "unit-dreadnought-selection-heavy-plasma-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-firestrike-servo-turrets",
      "title": "Firestrike Servo-Turrets",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Artillery",
        "Vehicle",
        "Imperium",
        "Adeptus Astartes",
        "Firestrike Servo-turrets"
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
          "M": "3\"",
          "T": "6",
          "Sv": "2+",
          "W": "6",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-firestrike-servo-turrets-ability-sentinel-protocols",
            "title": "Sentinel Protocols"
          },
          {
            "id": "unit-firestrike-servo-turrets-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-firestrike-servo-turrets-model-firestrike-servo-turrets",
            "title": "Firestrike Servo-Turrets",
            "aliases": [
              "Firestrike Servo-Turrets"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-firestrike-servo-turrets-selection-twin-firestrike-las-talon",
            "title": "Twin Firestrike Las-talon",
            "aliases": [
              "Twin Firestrike Las-talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firestrike-servo-turrets-profile-twin-firestrike-las-talon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-firestrike-servo-turrets-selection-twin-firestrike-autocannon",
            "title": "Twin Firestrike Autocannon",
            "aliases": [
              "Twin Firestrike Autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firestrike-servo-turrets-profile-twin-firestrike-autocannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-firestrike-servo-turrets-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firestrike-servo-turrets-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-firestrike-servo-turrets-profile-twin-firestrike-las-talon-ranged",
            "title": "Twin Firestrike Las-talon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "2+",
            "s": "10",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-firestrike-servo-turrets-selection-twin-firestrike-las-talon"
            ]
          },
          {
            "id": "unit-firestrike-servo-turrets-profile-twin-firestrike-autocannon-ranged-2",
            "title": "Twin Firestrike Autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "2+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-firestrike-servo-turrets-selection-twin-firestrike-autocannon"
            ]
          },
          {
            "id": "unit-firestrike-servo-turrets-profile-close-combat-weapon-melee-3",
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
              "unit-firestrike-servo-turrets-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-gladiator-lancer",
      "title": "Gladiator Lancer",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Imperium",
        "Smoke",
        "Gladiator Lancer",
        "Adeptus Astartes",
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
          "W": "12",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-gladiator-lancer-ability-aqullon-optics",
            "title": "Aqullon Optics"
          },
          {
            "id": "unit-gladiator-lancer-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-gladiator-lancer-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-gladiator-lancer-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-gladiator-lancer-model-gladiator-lancer",
            "title": "Gladiator Lancer",
            "aliases": [
              "Gladiator Lancer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-gladiator-lancer-selection-lancer-laser-destroyer",
            "title": "Lancer Laser Destroyer",
            "aliases": [
              "Lancer Laser Destroyer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-lancer-laser-destroyer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-lancer-selection-fragstorm-grenade-launcher",
            "title": "Fragstorm grenade launcher",
            "aliases": [
              "Fragstorm grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-fragstorm-grenade-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-lancer-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-storm-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-lancer-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-armoured-hull-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-lancer-selection-icarus-rocket-pod",
            "title": "Icarus Rocket Pod",
            "aliases": [
              "Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-icarus-rocket-pod-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-lancer-selection-ironhail-heavy-stubber",
            "title": "Ironhail Heavy Stubber",
            "aliases": [
              "Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-lancer-profile-ironhail-heavy-stubber-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-gladiator-lancer-profile-lancer-laser-destroyer-ranged",
            "title": "Lancer Laser Destroyer",
            "mode": "ranged",
            "range": "72\"",
            "a": "2",
            "skill": "3+",
            "s": "14",
            "ap": "-4",
            "d": "D6+3",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-lancer-laser-destroyer"
            ]
          },
          {
            "id": "unit-gladiator-lancer-profile-fragstorm-grenade-launcher-ranged-2",
            "title": "Fragstorm grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-gladiator-lancer-profile-storm-bolter-ranged-3",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-gladiator-lancer-profile-armoured-hull-melee-4",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-gladiator-lancer-profile-icarus-rocket-pod-ranged-5",
            "title": "Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-fly 2+",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-icarus-rocket-pod"
            ]
          },
          {
            "id": "unit-gladiator-lancer-profile-ironhail-heavy-stubber-ranged-6",
            "title": "Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3",
            "sourceSelectionIds": [
              "unit-gladiator-lancer-selection-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-gladiator-reaper",
      "title": "Gladiator Reaper",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Smoke",
        "Imperium",
        "Vehicle",
        "Adeptus Astartes",
        "Gladiator Reaper",
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
          "W": "12",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-gladiator-reaper-ability-rotating-death",
            "title": "Rotating Death"
          },
          {
            "id": "unit-gladiator-reaper-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-gladiator-reaper-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-gladiator-reaper-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-gladiator-reaper-model-gladiator-reaper",
            "title": "Gladiator Reaper",
            "aliases": [
              "Gladiator Reaper"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-gladiator-reaper-selection-tempest-bolter",
            "title": "Tempest Bolter",
            "aliases": [
              "Tempest Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-reaper-profile-tempest-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-reaper-selection-twin-heavy-onslaught-gatling-cannon",
            "title": "Twin Heavy Onslaught Gatling Cannon",
            "aliases": [
              "Twin Heavy Onslaught Gatling Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-reaper-profile-twin-heavy-onslaught-gatling-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-reaper-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-reaper-profile-armoured-hull-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-reaper-selection-icarus-rocket-pod",
            "title": "Icarus Rocket Pod",
            "aliases": [
              "Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-reaper-profile-icarus-rocket-pod-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-reaper-selection-ironhail-heavy-stubber",
            "title": "Ironhail Heavy Stubber",
            "aliases": [
              "Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-reaper-profile-ironhail-heavy-stubber-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-gladiator-reaper-profile-tempest-bolter-ranged",
            "title": "Tempest Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Rapid Fire 4",
            "sourceSelectionIds": [
              "unit-gladiator-reaper-selection-tempest-bolter"
            ]
          },
          {
            "id": "unit-gladiator-reaper-profile-twin-heavy-onslaught-gatling-cannon-ranged-2",
            "title": "Twin Heavy Onslaught Gatling Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-gladiator-reaper-selection-twin-heavy-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-gladiator-reaper-profile-armoured-hull-melee-3",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-gladiator-reaper-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-gladiator-reaper-profile-icarus-rocket-pod-ranged-4",
            "title": "Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-fly 2+",
            "sourceSelectionIds": [
              "unit-gladiator-reaper-selection-icarus-rocket-pod"
            ]
          },
          {
            "id": "unit-gladiator-reaper-profile-ironhail-heavy-stubber-ranged-5",
            "title": "Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3",
            "sourceSelectionIds": [
              "unit-gladiator-reaper-selection-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-gladiator-valiant",
      "title": "Gladiator Valiant",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Gladiator Valiant",
        "Adeptus Astartes",
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
          "W": "12",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-gladiator-valiant-ability-ferocious-assault",
            "title": "Ferocious Assault"
          },
          {
            "id": "unit-gladiator-valiant-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-gladiator-valiant-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-gladiator-valiant-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-gladiator-valiant-model-gladiator-valiant",
            "title": "Gladiator Valiant",
            "aliases": [
              "Gladiator Valiant"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-gladiator-valiant-selection-twin-las-talon",
            "title": "Twin Las-talon",
            "aliases": [
              "Twin Las-talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-valiant-profile-twin-las-talon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-valiant-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-valiant-profile-armoured-hull-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-valiant-selection-icarus-rocket-pod",
            "title": "Icarus Rocket Pod",
            "aliases": [
              "Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-valiant-profile-icarus-rocket-pod-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-valiant-selection-ironhail-heavy-stubber",
            "title": "Ironhail Heavy Stubber",
            "aliases": [
              "Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-valiant-profile-ironhail-heavy-stubber-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-gladiator-valiant-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-gladiator-valiant-profile-multi-melta-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-gladiator-valiant-profile-twin-las-talon-ranged",
            "title": "Twin Las-talon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "3+",
            "s": "10",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-gladiator-valiant-selection-twin-las-talon"
            ]
          },
          {
            "id": "unit-gladiator-valiant-profile-armoured-hull-melee-2",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-gladiator-valiant-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-gladiator-valiant-profile-icarus-rocket-pod-ranged-3",
            "title": "Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-fly 2+",
            "sourceSelectionIds": [
              "unit-gladiator-valiant-selection-icarus-rocket-pod"
            ]
          },
          {
            "id": "unit-gladiator-valiant-profile-ironhail-heavy-stubber-ranged-4",
            "title": "Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3",
            "sourceSelectionIds": [
              "unit-gladiator-valiant-selection-ironhail-heavy-stubber"
            ]
          },
          {
            "id": "unit-gladiator-valiant-profile-multi-melta-ranged-5",
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
              "unit-gladiator-valiant-selection-multi-melta"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-invictor-tactical-warsuit",
      "title": "Invictor Tactical Warsuit",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Invictor Tactical Warsuit",
        "Adeptus Astartes",
        "Imperium",
        "Phobos"
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
          "T": "8",
          "Sv": "3+",
          "W": "12",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-invictor-tactical-warsuit-ability-combat-support",
            "title": "Combat Support"
          },
          {
            "id": "unit-invictor-tactical-warsuit-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-invictor-tactical-warsuit-ability-scouts-8-3",
            "title": "Scouts 8\""
          },
          {
            "id": "unit-invictor-tactical-warsuit-ability-deadly-demise-d3-4",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-invictor-tactical-warsuit-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-invictor-tactical-warsuit-model-invictor-tactical-warsuit",
            "title": "Invictor Tactical Warsuit",
            "aliases": [
              "Invictor Tactical Warsuit"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-invictor-tactical-warsuit-selection-invictor-fist",
            "title": "Invictor Fist",
            "aliases": [
              "Invictor Fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-invictor-fist-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invictor-tactical-warsuit-selection-incendium-cannon",
            "title": "Incendium Cannon",
            "aliases": [
              "Incendium Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-incendium-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invictor-tactical-warsuit-selection-twin-ironhail-autocannon",
            "title": "Twin Ironhail Autocannon",
            "aliases": [
              "Twin Ironhail Autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-twin-ironhail-autocannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invictor-tactical-warsuit-selection-fragstorm-grenade-launcher",
            "title": "Fragstorm grenade launcher",
            "aliases": [
              "Fragstorm grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-fragstorm-grenade-launcher-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invictor-tactical-warsuit-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-heavy-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-invictor-tactical-warsuit-selection-twin-ironhail-heavy-stubber",
            "title": "Twin Ironhail Heavy Stubber",
            "aliases": [
              "Twin Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-invictor-tactical-warsuit-profile-twin-ironhail-heavy-stubber-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-invictor-tactical-warsuit-profile-invictor-fist-melee",
            "title": "Invictor Fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "14",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-invictor-fist"
            ]
          },
          {
            "id": "unit-invictor-tactical-warsuit-profile-incendium-cannon-ranged-2",
            "title": "Incendium Cannon",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-incendium-cannon"
            ]
          },
          {
            "id": "unit-invictor-tactical-warsuit-profile-twin-ironhail-autocannon-ranged-3",
            "title": "Twin Ironhail Autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-twin-ironhail-autocannon"
            ]
          },
          {
            "id": "unit-invictor-tactical-warsuit-profile-fragstorm-grenade-launcher-ranged-4",
            "title": "Fragstorm grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-invictor-tactical-warsuit-profile-heavy-bolter-ranged-5",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-invictor-tactical-warsuit-profile-twin-ironhail-heavy-stubber-ranged-6",
            "title": "Twin Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-invictor-tactical-warsuit-selection-twin-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-land-raider",
      "title": "Land Raider",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Land Raider",
        "Transport",
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-land-raider-ability-assault-ramp",
            "title": "Assault Ramp"
          },
          {
            "id": "unit-land-raider-ability-transport-2",
            "title": "Transport"
          },
          {
            "id": "unit-land-raider-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-land-raider-ability-deadly-demise-d6-4",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-land-raider-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-land-raider-model-land-raider",
            "title": "Land Raider",
            "aliases": [
              "Land Raider"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-land-raider-selection-godhammer-lascannon",
            "title": "Godhammer Lascannon",
            "aliases": [
              "Godhammer Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-godhammer-lascannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-armoured-tracks-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-hunter-killer-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-multi-melta-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-profile-twin-heavy-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-land-raider-profile-godhammer-lascannon-ranged",
            "title": "Godhammer Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-raider-selection-godhammer-lascannon"
            ]
          },
          {
            "id": "unit-land-raider-profile-armoured-tracks-melee-2",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-raider-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-land-raider-profile-hunter-killer-missile-ranged-3",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-land-raider-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-land-raider-profile-multi-melta-ranged-4",
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
              "unit-land-raider-selection-multi-melta"
            ]
          },
          {
            "id": "unit-land-raider-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-land-raider-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-land-raider-profile-twin-heavy-bolter-ranged-6",
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
              "unit-land-raider-selection-twin-heavy-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-land-raider-crusader",
      "title": "Land Raider Crusader",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Land Raider Crusader",
        "Smoke",
        "Adeptus Astartes",
        "Imperium",
        "Transport",
        "Grenades",
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
          "M": "12\"",
          "T": "12",
          "Sv": "2+",
          "W": "16",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-land-raider-crusader-ability-transport",
            "title": "Transport"
          },
          {
            "id": "unit-land-raider-crusader-ability-assault-ramp-2",
            "title": "Assault Ramp"
          },
          {
            "id": "unit-land-raider-crusader-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-land-raider-crusader-ability-deadly-demise-d6-4",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-land-raider-crusader-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-land-raider-crusader-model-land-raider-crusader",
            "title": "Land Raider Crusader",
            "aliases": [
              "Land Raider Crusader"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-land-raider-crusader-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-armoured-tracks-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-crusader-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-hunter-killer-missile-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-crusader-selection-hurricane-bolter",
            "title": "Hurricane Bolter",
            "aliases": [
              "Hurricane Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-hurricane-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-crusader-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-multi-melta-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-crusader-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-crusader-selection-twin-assault-cannon",
            "title": "Twin assault cannon",
            "aliases": [
              "Twin assault cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-crusader-profile-twin-assault-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-land-raider-crusader-profile-armoured-tracks-melee",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-raider-crusader-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-land-raider-crusader-profile-hunter-killer-missile-ranged-2",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-land-raider-crusader-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-land-raider-crusader-profile-hurricane-bolter-ranged-3",
            "title": "Hurricane Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 6, Twin-linked",
            "sourceSelectionIds": [
              "unit-land-raider-crusader-selection-hurricane-bolter"
            ]
          },
          {
            "id": "unit-land-raider-crusader-profile-multi-melta-ranged-4",
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
              "unit-land-raider-crusader-selection-multi-melta"
            ]
          },
          {
            "id": "unit-land-raider-crusader-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-land-raider-crusader-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-land-raider-crusader-profile-twin-assault-cannon-ranged-6",
            "title": "Twin assault cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-land-raider-crusader-selection-twin-assault-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-land-raider-redeemer",
      "title": "Land Raider Redeemer",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Grenades",
        "Imperium",
        "Smoke",
        "Land Raider Redeemer",
        "Adeptus Astartes",
        "Transport",
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
          "M": "12\"",
          "T": "12",
          "Sv": "2+",
          "W": "16",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-land-raider-redeemer-ability-transport",
            "title": "Transport"
          },
          {
            "id": "unit-land-raider-redeemer-ability-assault-ramp-2",
            "title": "Assault Ramp"
          },
          {
            "id": "unit-land-raider-redeemer-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-land-raider-redeemer-ability-deadly-demise-d6-4",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-land-raider-redeemer-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-land-raider-redeemer-model-land-raider-redeemer",
            "title": "Land Raider Redeemer",
            "aliases": [
              "Land Raider Redeemer"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-land-raider-redeemer-selection-flamestorm-cannon",
            "title": "Flamestorm Cannon",
            "aliases": [
              "Flamestorm Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-flamestorm-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-redeemer-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-armoured-tracks-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-redeemer-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-hunter-killer-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-redeemer-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-multi-melta-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-redeemer-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-storm-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-raider-redeemer-selection-twin-assault-cannon",
            "title": "Twin assault cannon",
            "aliases": [
              "Twin assault cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-raider-redeemer-profile-twin-assault-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-land-raider-redeemer-profile-flamestorm-cannon-ranged",
            "title": "Flamestorm Cannon",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-land-raider-redeemer-selection-flamestorm-cannon"
            ]
          },
          {
            "id": "unit-land-raider-redeemer-profile-armoured-tracks-melee-2",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-raider-redeemer-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-land-raider-redeemer-profile-hunter-killer-missile-ranged-3",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-land-raider-redeemer-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-land-raider-redeemer-profile-multi-melta-ranged-4",
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
              "unit-land-raider-redeemer-selection-multi-melta"
            ]
          },
          {
            "id": "unit-land-raider-redeemer-profile-storm-bolter-ranged-5",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-land-raider-redeemer-selection-storm-bolter"
            ]
          },
          {
            "id": "unit-land-raider-redeemer-profile-twin-assault-cannon-ranged-6",
            "title": "Twin assault cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-land-raider-redeemer-selection-twin-assault-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-land-speeder",
      "title": "Land Speeder",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-faction-pack",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Imperium",
        "Land Speeder",
        "Adeptus Astartes"
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
          "T": "8",
          "Sv": "3+",
          "W": "9",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-land-speeder-ability-purgation-run",
            "title": "Purgation Run"
          },
          {
            "id": "unit-land-speeder-ability-oath-of-moment-2",
            "title": "Oath of Moment"
          },
          {
            "id": "unit-land-speeder-ability-deep-strike-3",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-land-speeder-model-land-speeder",
            "title": "Land Speeder",
            "aliases": [
              "Land Speeder"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-land-speeder-selection-stormfury-missile-launcher",
            "title": "Stormfury Missile Launcher",
            "aliases": [
              "Stormfury Missile Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-speeder-profile-stormfury-missile-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-speeder-selection-heavy-flamer",
            "title": "Heavy Flamer",
            "aliases": [
              "Heavy Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-speeder-profile-heavy-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-speeder-selection-onslaught-gatling-cannon",
            "title": "Onslaught gatling cannon",
            "aliases": [
              "Onslaught gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-speeder-profile-onslaught-gatling-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-speeder-selection-multi-melta",
            "title": "Multi-melta",
            "aliases": [
              "Multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-speeder-profile-multi-melta-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-land-speeder-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-land-speeder-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-land-speeder-profile-stormfury-missile-launcher-ranged",
            "title": "Stormfury Missile Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-speeder-selection-stormfury-missile-launcher"
            ]
          },
          {
            "id": "unit-land-speeder-profile-heavy-flamer-ranged-2",
            "title": "Heavy Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-land-speeder-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-land-speeder-profile-onslaught-gatling-cannon-ranged-3",
            "title": "Onslaught gatling cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-land-speeder-selection-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-land-speeder-profile-multi-melta-ranged-4",
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
              "unit-land-speeder-selection-multi-melta"
            ]
          },
          {
            "id": "unit-land-speeder-profile-close-combat-weapon-melee-5",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-land-speeder-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-predator-annihilator",
      "title": "Predator Annihilator",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Predator Annihilator"
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
          "M": "10",
          "T": "10",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-predator-annihilator-ability-annihilator",
            "title": "Annihilator"
          },
          {
            "id": "unit-predator-annihilator-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-predator-annihilator-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-predator-annihilator-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-predator-annihilator-model-predator-annihilator",
            "title": "Predator Annihilator",
            "aliases": [
              "Predator Annihilator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-predator-annihilator-selection-predator-twin-lascannon",
            "title": "Predator Twin Lascannon",
            "aliases": [
              "Predator Twin Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-predator-twin-lascannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-annihilator-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-annihilator-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-heavy-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-annihilator-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-armoured-tracks-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-annihilator-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-hunter-killer-missile-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-annihilator-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-annihilator-profile-storm-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-predator-annihilator-profile-predator-twin-lascannon-ranged",
            "title": "Predator Twin Lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-predator-annihilator-selection-predator-twin-lascannon"
            ]
          },
          {
            "id": "unit-predator-annihilator-profile-lascannon-ranged-2",
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
              "unit-predator-annihilator-selection-lascannon"
            ]
          },
          {
            "id": "unit-predator-annihilator-profile-heavy-bolter-ranged-3",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-predator-annihilator-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-predator-annihilator-profile-armoured-tracks-melee-4",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-predator-annihilator-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-predator-annihilator-profile-hunter-killer-missile-ranged-5",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-predator-annihilator-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-predator-annihilator-profile-storm-bolter-ranged-6",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-predator-annihilator-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-predator-destructor",
      "title": "Predator Destructor",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Predator Destructor"
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
          "M": "10",
          "T": "10",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-predator-destructor-ability-destructor",
            "title": "Destructor"
          },
          {
            "id": "unit-predator-destructor-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-predator-destructor-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-predator-destructor-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-predator-destructor-model-predator-destructor",
            "title": "Predator Destructor",
            "aliases": [
              "Predator Destructor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-predator-destructor-selection-predator-autocannon",
            "title": "Predator Autocannon",
            "aliases": [
              "Predator Autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-predator-autocannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-destructor-selection-lascannon",
            "title": "Lascannon",
            "aliases": [
              "Lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-destructor-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-heavy-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-destructor-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-armoured-tracks-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-destructor-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-hunter-killer-missile-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-predator-destructor-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-predator-destructor-profile-storm-bolter-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-predator-destructor-profile-predator-autocannon-ranged",
            "title": "Predator Autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "4",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-predator-destructor-selection-predator-autocannon"
            ]
          },
          {
            "id": "unit-predator-destructor-profile-lascannon-ranged-2",
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
              "unit-predator-destructor-selection-lascannon"
            ]
          },
          {
            "id": "unit-predator-destructor-profile-heavy-bolter-ranged-3",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-predator-destructor-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-predator-destructor-profile-armoured-tracks-melee-4",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-predator-destructor-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-predator-destructor-profile-hunter-killer-missile-ranged-5",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-predator-destructor-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-predator-destructor-profile-storm-bolter-ranged-6",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-predator-destructor-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-redemptor-dreadnought",
      "title": "Redemptor Dreadnought",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Imperium",
        "Redemptor Dreadnought",
        "Adeptus Astartes",
        "Dreadnought"
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
          "W": "12",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-redemptor-dreadnought-ability-duty-eternal",
            "title": "Duty Eternal"
          },
          {
            "id": "unit-redemptor-dreadnought-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-redemptor-dreadnought-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-redemptor-dreadnought-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-redemptor-dreadnought-model-redemptor-dreadnought",
            "title": "Redemptor Dreadnought",
            "aliases": [
              "Redemptor Dreadnought"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-redemptor-dreadnought-selection-redemptor-fist",
            "title": "Redemptor Fist",
            "aliases": [
              "Redemptor Fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-redemptor-fist-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-macro-plasma-incinerator-standard",
            "title": "➤ Macro Plasma Incinerator - Standard",
            "aliases": [
              "➤ Macro Plasma Incinerator - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-macro-plasma-incinerator-supercharge",
            "title": "➤ Macro Plasma Incinerator - Supercharge",
            "aliases": [
              "➤ Macro Plasma Incinerator - Supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-heavy-onslaught-gatling-cannon",
            "title": "Heavy Onslaught Gatling Cannon",
            "aliases": [
              "Heavy Onslaught Gatling Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-heavy-onslaught-gatling-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-heavy-flamer",
            "title": "Heavy Flamer",
            "aliases": [
              "Heavy Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-heavy-flamer-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-onslaught-gatling-cannon",
            "title": "Onslaught gatling cannon",
            "aliases": [
              "Onslaught gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-onslaught-gatling-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-twin-fragstorm-grenade-launcher",
            "title": "Twin Fragstorm Grenade Launcher",
            "aliases": [
              "Twin Fragstorm Grenade Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-twin-fragstorm-grenade-launcher-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-twin-storm-bolter",
            "title": "Twin Storm Bolter",
            "aliases": [
              "Twin Storm Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-twin-storm-bolter-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-selection-icarus-rocket-pod",
            "title": "Icarus Rocket Pod",
            "aliases": [
              "Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-icarus-rocket-pod-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-redemptor-dreadnought-weapon-family-macro-plasma-incinerator-selection",
            "title": "➤ Macro Plasma Incinerator",
            "aliases": [
              "➤ Macro Plasma Incinerator"
            ],
            "kind": "weapon",
            "familyId": "unit-redemptor-dreadnought-weapon-family-macro-plasma-incinerator",
            "profileIds": [
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-standard-ranged-2",
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-redemptor-dreadnought-weapon-family-macro-plasma-incinerator",
            "title": "➤ Macro Plasma Incinerator",
            "aliases": [
              "➤ Macro Plasma Incinerator"
            ],
            "profileIds": [
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-standard-ranged-2",
              "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-supercharge-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-redemptor-dreadnought-profile-redemptor-fist-melee",
            "title": "Redemptor Fist",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-redemptor-fist"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-standard-ranged-2",
            "title": "➤ Macro Plasma Incinerator - Standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-macro-plasma-incinerator-standard",
              "unit-redemptor-dreadnought-weapon-family-macro-plasma-incinerator-selection"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-macro-plasma-incinerator-supercharge-ranged-3",
            "title": "➤ Macro Plasma Incinerator - Supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "3",
            "abilities": "Blast, Hazardous",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-macro-plasma-incinerator-supercharge",
              "unit-redemptor-dreadnought-weapon-family-macro-plasma-incinerator-selection"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-heavy-onslaught-gatling-cannon-ranged-4",
            "title": "Heavy Onslaught Gatling Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-heavy-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-heavy-flamer-ranged-5",
            "title": "Heavy Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-onslaught-gatling-cannon-ranged-6",
            "title": "Onslaught gatling cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-twin-fragstorm-grenade-launcher-ranged-7",
            "title": "Twin Fragstorm Grenade Launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Twin-linked",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-twin-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-twin-storm-bolter-ranged-8",
            "title": "Twin Storm Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-twin-storm-bolter"
            ]
          },
          {
            "id": "unit-redemptor-dreadnought-profile-icarus-rocket-pod-ranged-9",
            "title": "Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-fly 2+",
            "sourceSelectionIds": [
              "unit-redemptor-dreadnought-selection-icarus-rocket-pod"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-repulsor",
      "title": "Repulsor",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Imperium",
        "Smoke",
        "Repulsor",
        "Adeptus Astartes",
        "Transport",
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
          "Sv": "3+",
          "W": "16",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-repulsor-ability-transport",
            "title": "Transport"
          },
          {
            "id": "unit-repulsor-ability-emergency-combat-embarkation-2",
            "title": "Emergency Combat Embarkation"
          },
          {
            "id": "unit-repulsor-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-repulsor-ability-deadly-demise-d6-4",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-repulsor-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-repulsor-model-repulsor",
            "title": "Repulsor",
            "aliases": [
              "Repulsor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-repulsor-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-twin-heavy-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-twin-lascannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-heavy-onslaught-gatling-cannon",
            "title": "Heavy Onslaught Gatling Cannon",
            "aliases": [
              "Heavy Onslaught Gatling Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-heavy-onslaught-gatling-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-las-talon",
            "title": "Las-talon",
            "aliases": [
              "Las-talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-las-talon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-armoured-hull-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-hunter-slayer-missile",
            "title": "Hunter-slayer missile",
            "aliases": [
              "Hunter-slayer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-hunter-slayer-missile-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-selection-repulsor-defensive-array",
            "title": "Repulsor Defensive Array",
            "aliases": [
              "Repulsor Defensive Array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-profile-repulsor-defensive-array-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-repulsor-profile-twin-heavy-bolter-ranged",
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
              "unit-repulsor-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-repulsor-profile-twin-lascannon-ranged-2",
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
              "unit-repulsor-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-repulsor-profile-heavy-onslaught-gatling-cannon-ranged-3",
            "title": "Heavy Onslaught Gatling Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-repulsor-selection-heavy-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-repulsor-profile-las-talon-ranged-4",
            "title": "Las-talon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "3+",
            "s": "10",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-repulsor-selection-las-talon"
            ]
          },
          {
            "id": "unit-repulsor-profile-armoured-hull-melee-5",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-repulsor-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-repulsor-profile-hunter-slayer-missile-ranged-6",
            "title": "Hunter-slayer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "Indirect Fire, One Shot",
            "sourceSelectionIds": [
              "unit-repulsor-selection-hunter-slayer-missile"
            ]
          },
          {
            "id": "unit-repulsor-profile-repulsor-defensive-array-ranged-7",
            "title": "Repulsor Defensive Array",
            "mode": "ranged",
            "range": "24\"",
            "a": "18",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-repulsor-selection-repulsor-defensive-array"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-repulsor-executioner",
      "title": "Repulsor Executioner",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Transport",
        "Repulsor Executioner",
        "Adeptus Astartes",
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
          "Sv": "3+",
          "W": "16",
          "Ld": "6+",
          "OC": "5",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-repulsor-executioner-ability-transport",
            "title": "Transport"
          },
          {
            "id": "unit-repulsor-executioner-ability-executioner-2",
            "title": "Executioner"
          },
          {
            "id": "unit-repulsor-executioner-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-repulsor-executioner-ability-deadly-demise-d6-4",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-repulsor-executioner-ability-oath-of-moment-5",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-repulsor-executioner-model-repulsor-executioner",
            "title": "Repulsor Executioner",
            "aliases": [
              "Repulsor Executioner"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-repulsor-executioner-selection-repulsor-executioner-defensive-array",
            "title": "Repulsor Executioner Defensive Array",
            "aliases": [
              "Repulsor Executioner Defensive Array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-repulsor-executioner-defensive-array-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-heavy-laser-destroyer",
            "title": "Heavy Laser Destroyer",
            "aliases": [
              "Heavy Laser Destroyer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-heavy-laser-destroyer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-macro-plasma-incinerator-standard",
            "title": "➤ Macro Plasma Incinerator - Standard",
            "aliases": [
              "➤ Macro Plasma Incinerator - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-macro-plasma-incinerator-supercharge",
            "title": "➤ Macro Plasma Incinerator - Supercharge",
            "aliases": [
              "➤ Macro Plasma Incinerator - Supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-armoured-hull-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-heavy-onslaught-gatling-cannon",
            "title": "Heavy Onslaught Gatling Cannon",
            "aliases": [
              "Heavy Onslaught Gatling Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-heavy-onslaught-gatling-cannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-icarus-rocket-pod",
            "title": "Icarus Rocket Pod",
            "aliases": [
              "Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-icarus-rocket-pod-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-ironhail-heavy-stubber",
            "title": "Ironhail Heavy Stubber",
            "aliases": [
              "Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-ironhail-heavy-stubber-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-twin-heavy-bolter-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-selection-twin-icarus-ironhail-heavy-stubber",
            "title": "Twin Icarus ironhail heavy stubber",
            "aliases": [
              "Twin Icarus ironhail heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-repulsor-executioner-profile-twin-icarus-ironhail-heavy-stubber-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-repulsor-executioner-weapon-family-macro-plasma-incinerator-selection",
            "title": "➤ Macro Plasma Incinerator",
            "aliases": [
              "➤ Macro Plasma Incinerator"
            ],
            "kind": "weapon",
            "familyId": "unit-repulsor-executioner-weapon-family-macro-plasma-incinerator",
            "profileIds": [
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-standard-ranged-3",
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-repulsor-executioner-weapon-family-macro-plasma-incinerator",
            "title": "➤ Macro Plasma Incinerator",
            "aliases": [
              "➤ Macro Plasma Incinerator"
            ],
            "profileIds": [
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-standard-ranged-3",
              "unit-repulsor-executioner-profile-macro-plasma-incinerator-supercharge-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-repulsor-executioner-profile-repulsor-executioner-defensive-array-ranged",
            "title": "Repulsor Executioner Defensive Array",
            "mode": "ranged",
            "range": "24\"",
            "a": "10",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-repulsor-executioner-defensive-array"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-heavy-laser-destroyer-ranged-2",
            "title": "Heavy Laser Destroyer",
            "mode": "ranged",
            "range": "72\"",
            "a": "2",
            "skill": "3+",
            "s": "16",
            "ap": "-4",
            "d": "D6+4",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-heavy-laser-destroyer"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-macro-plasma-incinerator-standard-ranged-3",
            "title": "➤ Macro Plasma Incinerator - Standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-macro-plasma-incinerator-standard",
              "unit-repulsor-executioner-weapon-family-macro-plasma-incinerator-selection"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-macro-plasma-incinerator-supercharge-ranged-4",
            "title": "➤ Macro Plasma Incinerator - Supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "3",
            "abilities": "Blast, Hazardous",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-macro-plasma-incinerator-supercharge",
              "unit-repulsor-executioner-weapon-family-macro-plasma-incinerator-selection"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-armoured-hull-melee-5",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-heavy-onslaught-gatling-cannon-ranged-6",
            "title": "Heavy Onslaught Gatling Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "12",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-heavy-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-icarus-rocket-pod-ranged-7",
            "title": "Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-fly 2+",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-icarus-rocket-pod"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-ironhail-heavy-stubber-ranged-8",
            "title": "Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-ironhail-heavy-stubber"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-twin-heavy-bolter-ranged-9",
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
              "unit-repulsor-executioner-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-repulsor-executioner-profile-twin-icarus-ironhail-heavy-stubber-ranged-10",
            "title": "Twin Icarus ironhail heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-FLY 4+, Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-repulsor-executioner-selection-twin-icarus-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-storm-speeder-hailstrike",
      "title": "Storm Speeder Hailstrike",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Imperium",
        "Adeptus Astartes",
        "Storm Speeder Hailstrike",
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
          "M": "14\"",
          "T": "9",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-storm-speeder-hailstrike-ability-hailstrike",
            "title": "Hailstrike"
          },
          {
            "id": "unit-storm-speeder-hailstrike-ability-deep-strike-2",
            "title": "Deep Strike"
          },
          {
            "id": "unit-storm-speeder-hailstrike-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-storm-speeder-hailstrike-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-storm-speeder-hailstrike-model-storm-speeder-hailstrike",
            "title": "Storm Speeder Hailstrike",
            "aliases": [
              "Storm Speeder Hailstrike"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-storm-speeder-hailstrike-selection-fragstorm-grenade-launcher",
            "title": "Fragstorm grenade launcher",
            "aliases": [
              "Fragstorm grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hailstrike-profile-fragstorm-grenade-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hailstrike-selection-onslaught-gatling-cannon",
            "title": "Onslaught gatling cannon",
            "aliases": [
              "Onslaught gatling cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hailstrike-profile-onslaught-gatling-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hailstrike-selection-twin-ironhail-heavy-stubber",
            "title": "Twin Ironhail Heavy Stubber",
            "aliases": [
              "Twin Ironhail Heavy Stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hailstrike-profile-twin-ironhail-heavy-stubber-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hailstrike-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hailstrike-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-storm-speeder-hailstrike-profile-fragstorm-grenade-launcher-ranged",
            "title": "Fragstorm grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-storm-speeder-hailstrike-selection-fragstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-storm-speeder-hailstrike-profile-onslaught-gatling-cannon-ranged-2",
            "title": "Onslaught gatling cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-storm-speeder-hailstrike-selection-onslaught-gatling-cannon"
            ]
          },
          {
            "id": "unit-storm-speeder-hailstrike-profile-twin-ironhail-heavy-stubber-ranged-3",
            "title": "Twin Ironhail Heavy Stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-storm-speeder-hailstrike-selection-twin-ironhail-heavy-stubber"
            ]
          },
          {
            "id": "unit-storm-speeder-hailstrike-profile-close-combat-weapon-melee-4",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-hailstrike-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-storm-speeder-hammerstrike",
      "title": "Storm Speeder Hammerstrike",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Imperium",
        "Fly",
        "Vehicle",
        "Storm Speeder Hammerstrike",
        "Adeptus Astartes",
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
          "M": "14\"",
          "T": "9",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-storm-speeder-hammerstrike-ability-hammerstrike",
            "title": "Hammerstrike"
          },
          {
            "id": "unit-storm-speeder-hammerstrike-ability-deep-strike-2",
            "title": "Deep Strike"
          },
          {
            "id": "unit-storm-speeder-hammerstrike-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-storm-speeder-hammerstrike-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-storm-speeder-hammerstrike-model-storm-speeder-hammerstrike",
            "title": "Storm Speeder Hammerstrike",
            "aliases": [
              "Storm Speeder Hammerstrike"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-storm-speeder-hammerstrike-selection-hammerstrike-missile-launcher",
            "title": "Hammerstrike Missile Launcher",
            "aliases": [
              "Hammerstrike Missile Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hammerstrike-profile-hammerstrike-missile-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hammerstrike-selection-krakstorm-grenade-launcher",
            "title": "Krakstorm Grenade Launcher",
            "aliases": [
              "Krakstorm Grenade Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hammerstrike-profile-krakstorm-grenade-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hammerstrike-selection-melta-destroyer",
            "title": "Melta Destroyer",
            "aliases": [
              "Melta Destroyer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hammerstrike-profile-melta-destroyer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-hammerstrike-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-hammerstrike-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-storm-speeder-hammerstrike-profile-hammerstrike-missile-launcher-ranged",
            "title": "Hammerstrike Missile Launcher",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-3",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-hammerstrike-selection-hammerstrike-missile-launcher"
            ]
          },
          {
            "id": "unit-storm-speeder-hammerstrike-profile-krakstorm-grenade-launcher-ranged-2",
            "title": "Krakstorm Grenade Launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-1",
            "d": "D3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-hammerstrike-selection-krakstorm-grenade-launcher"
            ]
          },
          {
            "id": "unit-storm-speeder-hammerstrike-profile-melta-destroyer-ranged-3",
            "title": "Melta Destroyer",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-storm-speeder-hammerstrike-selection-melta-destroyer"
            ]
          },
          {
            "id": "unit-storm-speeder-hammerstrike-profile-close-combat-weapon-melee-4",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-hammerstrike-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-storm-speeder-thunderstrike",
      "title": "Storm Speeder Thunderstrike",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Imperium",
        "Storm Speeder Thunderstrike",
        "Adeptus Astartes",
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
          "M": "14\"",
          "T": "9",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-storm-speeder-thunderstrike-ability-thunderstrike",
            "title": "Thunderstrike"
          },
          {
            "id": "unit-storm-speeder-thunderstrike-ability-deadly-demise-d3-2",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-storm-speeder-thunderstrike-ability-deep-strike-3",
            "title": "Deep Strike"
          },
          {
            "id": "unit-storm-speeder-thunderstrike-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-storm-speeder-thunderstrike-model-storm-speeder-thunderstrike",
            "title": "Storm Speeder Thunderstrike",
            "aliases": [
              "Storm Speeder Thunderstrike"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-storm-speeder-thunderstrike-selection-stormfury-missiles",
            "title": "Stormfury Missiles",
            "aliases": [
              "Stormfury Missiles"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-thunderstrike-profile-stormfury-missiles-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-thunderstrike-selection-thunderstrike-las-talon",
            "title": "Thunderstrike Las-talon",
            "aliases": [
              "Thunderstrike Las-talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-thunderstrike-profile-thunderstrike-las-talon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-thunderstrike-selection-twin-icarus-rocket-pod",
            "title": "Twin Icarus Rocket Pod",
            "aliases": [
              "Twin Icarus Rocket Pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-thunderstrike-profile-twin-icarus-rocket-pod-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-storm-speeder-thunderstrike-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-storm-speeder-thunderstrike-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-storm-speeder-thunderstrike-profile-stormfury-missiles-ranged",
            "title": "Stormfury Missiles",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-thunderstrike-selection-stormfury-missiles"
            ]
          },
          {
            "id": "unit-storm-speeder-thunderstrike-profile-thunderstrike-las-talon-ranged-2",
            "title": "Thunderstrike Las-talon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "2+",
            "s": "9",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-thunderstrike-selection-thunderstrike-las-talon"
            ]
          },
          {
            "id": "unit-storm-speeder-thunderstrike-profile-twin-icarus-rocket-pod-ranged-3",
            "title": "Twin Icarus Rocket Pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Fly 2+, Twin-linked",
            "sourceSelectionIds": [
              "unit-storm-speeder-thunderstrike-selection-twin-icarus-rocket-pod"
            ]
          },
          {
            "id": "unit-storm-speeder-thunderstrike-profile-close-combat-weapon-melee-4",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-storm-speeder-thunderstrike-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-stormhawk-interceptor",
      "title": "Stormhawk Interceptor",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Aircraft",
        "Vehicle",
        "Imperium",
        "Fly",
        "Smoke",
        "Adeptus Astartes",
        "Stormhawk Interceptor"
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
          "W": "10",
          "Ld": "6+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-stormhawk-interceptor-ability-interceptor",
            "title": "Interceptor"
          },
          {
            "id": "unit-stormhawk-interceptor-ability-deadly-demise-d3-2",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-stormhawk-interceptor-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-stormhawk-interceptor-model-stormhawk-interceptor",
            "title": "Stormhawk Interceptor",
            "aliases": [
              "Stormhawk Interceptor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-stormhawk-interceptor-selection-icarus-stormcannon",
            "title": "Icarus Stormcannon",
            "aliases": [
              "Icarus Stormcannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-icarus-stormcannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-las-talon",
            "title": "Las-talon",
            "aliases": [
              "Las-talon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-las-talon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-twin-heavy-bolter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-typhoon-missile-launcher-frag",
            "title": "➤ Typhoon missile launcher - frag",
            "aliases": [
              "➤ Typhoon missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-frag-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-typhoon-missile-launcher-krak",
            "title": "➤ Typhoon missile launcher - krak",
            "aliases": [
              "➤ Typhoon missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-krak-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-skyhammer-missile-launcher",
            "title": "Skyhammer Missile Launcher",
            "aliases": [
              "Skyhammer Missile Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-skyhammer-missile-launcher-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-armoured-hull-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-selection-twin-assault-cannon",
            "title": "Twin assault cannon",
            "aliases": [
              "Twin assault cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-twin-assault-cannon-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormhawk-interceptor-weapon-family-typhoon-missile-launcher-selection",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-stormhawk-interceptor-weapon-family-typhoon-missile-launcher",
            "profileIds": [
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-frag-ranged-4",
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-krak-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-stormhawk-interceptor-weapon-family-typhoon-missile-launcher",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "profileIds": [
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-frag-ranged-4",
              "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-krak-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-stormhawk-interceptor-profile-icarus-stormcannon-ranged",
            "title": "Icarus Stormcannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "6",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Fly 2+",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-icarus-stormcannon"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-las-talon-ranged-2",
            "title": "Las-talon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "3+",
            "s": "10",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-las-talon"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-twin-heavy-bolter-ranged-3",
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
              "unit-stormhawk-interceptor-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-frag-ranged-4",
            "title": "➤ Typhoon missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-typhoon-missile-launcher-frag",
              "unit-stormhawk-interceptor-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-typhoon-missile-launcher-krak-ranged-5",
            "title": "➤ Typhoon missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-typhoon-missile-launcher-krak",
              "unit-stormhawk-interceptor-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-skyhammer-missile-launcher-ranged-6",
            "title": "Skyhammer Missile Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "D3",
            "abilities": "Anti-Fly 2+",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-skyhammer-missile-launcher"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-armoured-hull-melee-7",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-stormhawk-interceptor-profile-twin-assault-cannon-ranged-8",
            "title": "Twin assault cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormhawk-interceptor-selection-twin-assault-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-stormraven-gunship",
      "title": "Stormraven Gunship",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Imperium",
        "Fly",
        "Transport",
        "Stormraven Gunship",
        "Adeptus Astartes"
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
          "T": "10",
          "Sv": "3+",
          "W": "14",
          "Ld": "6+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-stormraven-gunship-ability-armoured-resilience",
            "title": "Armoured Resilience"
          },
          {
            "id": "unit-stormraven-gunship-ability-transport-2",
            "title": "Transport"
          },
          {
            "id": "unit-stormraven-gunship-ability-damaged-1-5-wounds-remaining-3",
            "title": "Damaged: 1-5 Wounds Remaining"
          },
          {
            "id": "unit-stormraven-gunship-ability-hover-4",
            "title": "Hover"
          },
          {
            "id": "unit-stormraven-gunship-ability-deadly-demise-d6-5",
            "title": "Deadly Demise D6"
          },
          {
            "id": "unit-stormraven-gunship-ability-oath-of-moment-6",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-stormraven-gunship-model-stormraven-gunship",
            "title": "Stormraven Gunship",
            "aliases": [
              "Stormraven Gunship"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-stormraven-gunship-selection-hurricane-bolter",
            "title": "Hurricane Bolter",
            "aliases": [
              "Hurricane Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-hurricane-bolter-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-stormstrike-missile-launcher",
            "title": "Stormstrike Missile Launcher",
            "aliases": [
              "Stormstrike Missile Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-stormstrike-missile-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-heavy-plasma-cannon-standard",
            "title": "➤ Twin Heavy Plasma Cannon - Standard",
            "aliases": [
              "➤ Twin Heavy Plasma Cannon - Standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-heavy-plasma-cannon-supercharge",
            "title": "➤ Twin Heavy Plasma Cannon - Supercharge",
            "aliases": [
              "➤ Twin Heavy Plasma Cannon - Supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-assault-cannon",
            "title": "Twin assault cannon",
            "aliases": [
              "Twin assault cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-assault-cannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-lascannon-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-typhoon-missile-launcher-frag",
            "title": "➤ Typhoon missile launcher - frag",
            "aliases": [
              "➤ Typhoon missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-frag-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-typhoon-missile-launcher-krak",
            "title": "➤ Typhoon missile launcher - krak",
            "aliases": [
              "➤ Typhoon missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-krak-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-heavy-bolter-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-twin-multi-melta",
            "title": "Twin multi-melta",
            "aliases": [
              "Twin multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-multi-melta-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormraven-gunship-profile-armoured-hull-melee-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-weapon-family-twin-heavy-plasma-cannon-selection",
            "title": "➤ Twin Heavy Plasma Cannon",
            "aliases": [
              "➤ Twin Heavy Plasma Cannon"
            ],
            "kind": "weapon",
            "familyId": "unit-stormraven-gunship-weapon-family-twin-heavy-plasma-cannon",
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-standard-ranged-3",
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormraven-gunship-weapon-family-typhoon-missile-launcher-selection",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-stormraven-gunship-weapon-family-typhoon-missile-launcher",
            "profileIds": [
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-frag-ranged-7",
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-krak-ranged-8"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-stormraven-gunship-weapon-family-twin-heavy-plasma-cannon",
            "title": "➤ Twin Heavy Plasma Cannon",
            "aliases": [
              "➤ Twin Heavy Plasma Cannon"
            ],
            "profileIds": [
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-standard-ranged-3",
              "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-supercharge-ranged-4"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-stormraven-gunship-weapon-family-typhoon-missile-launcher",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "profileIds": [
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-frag-ranged-7",
              "unit-stormraven-gunship-profile-typhoon-missile-launcher-krak-ranged-8"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-stormraven-gunship-profile-hurricane-bolter-ranged",
            "title": "Hurricane Bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 6, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-hurricane-bolter"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-stormstrike-missile-launcher-ranged-2",
            "title": "Stormstrike Missile Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "3+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-stormstrike-missile-launcher"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-standard-ranged-3",
            "title": "➤ Twin Heavy Plasma Cannon - Standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-twin-heavy-plasma-cannon-standard",
              "unit-stormraven-gunship-weapon-family-twin-heavy-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-heavy-plasma-cannon-supercharge-ranged-4",
            "title": "➤ Twin Heavy Plasma Cannon - Supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Hazardous, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-twin-heavy-plasma-cannon-supercharge",
              "unit-stormraven-gunship-weapon-family-twin-heavy-plasma-cannon-selection"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-assault-cannon-ranged-5",
            "title": "Twin assault cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-twin-assault-cannon"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-lascannon-ranged-6",
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
              "unit-stormraven-gunship-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-typhoon-missile-launcher-frag-ranged-7",
            "title": "➤ Typhoon missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-typhoon-missile-launcher-frag",
              "unit-stormraven-gunship-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-typhoon-missile-launcher-krak-ranged-8",
            "title": "➤ Typhoon missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-typhoon-missile-launcher-krak",
              "unit-stormraven-gunship-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-heavy-bolter-ranged-9",
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
              "unit-stormraven-gunship-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-twin-multi-melta-ranged-10",
            "title": "Twin multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-twin-multi-melta"
            ]
          },
          {
            "id": "unit-stormraven-gunship-profile-armoured-hull-melee-11",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormraven-gunship-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-stormtalon-gunship",
      "title": "Stormtalon Gunship",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Aircraft",
        "Vehicle",
        "Imperium",
        "Fly",
        "Stormtalon Gunship",
        "Adeptus Astartes"
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
          "T": "8",
          "Sv": "3+",
          "W": "10",
          "Ld": "6+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-stormtalon-gunship-ability-strafing-run",
            "title": "Strafing Run"
          },
          {
            "id": "unit-stormtalon-gunship-ability-deadly-demise-d3-2",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-stormtalon-gunship-ability-oath-of-moment-3",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-stormtalon-gunship-model-stormtalon-gunship",
            "title": "Stormtalon Gunship",
            "aliases": [
              "Stormtalon Gunship"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-stormtalon-gunship-selection-skyhammer-missile-launcher",
            "title": "Skyhammer Missile Launcher",
            "aliases": [
              "Skyhammer Missile Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-skyhammer-missile-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-typhoon-missile-launcher-frag",
            "title": "➤ Typhoon missile launcher - frag",
            "aliases": [
              "➤ Typhoon missile launcher - frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-frag-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-typhoon-missile-launcher-krak",
            "title": "➤ Typhoon missile launcher - krak",
            "aliases": [
              "➤ Typhoon missile launcher - krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-krak-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-twin-heavy-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-twin-lascannon",
            "title": "Twin lascannon",
            "aliases": [
              "Twin lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-twin-lascannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-armoured-hull",
            "title": "Armoured Hull",
            "aliases": [
              "Armoured Hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-armoured-hull-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-selection-twin-assault-cannon",
            "title": "Twin assault cannon",
            "aliases": [
              "Twin assault cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormtalon-gunship-profile-twin-assault-cannon-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormtalon-gunship-weapon-family-typhoon-missile-launcher-selection",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-stormtalon-gunship-weapon-family-typhoon-missile-launcher",
            "profileIds": [
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-frag-ranged-2",
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-krak-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-stormtalon-gunship-weapon-family-typhoon-missile-launcher",
            "title": "➤ Typhoon missile launcher",
            "aliases": [
              "➤ Typhoon missile launcher"
            ],
            "profileIds": [
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-frag-ranged-2",
              "unit-stormtalon-gunship-profile-typhoon-missile-launcher-krak-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-stormtalon-gunship-profile-skyhammer-missile-launcher-ranged",
            "title": "Skyhammer Missile Launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-1",
            "d": "D3",
            "abilities": "Anti-Fly 2+, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormtalon-gunship-selection-skyhammer-missile-launcher"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-typhoon-missile-launcher-frag-ranged-2",
            "title": "➤ Typhoon missile launcher - frag",
            "mode": "ranged",
            "range": "48\"",
            "a": "2D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-stormtalon-gunship-selection-typhoon-missile-launcher-frag",
              "unit-stormtalon-gunship-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-typhoon-missile-launcher-krak-ranged-3",
            "title": "➤ Typhoon missile launcher - krak",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormtalon-gunship-selection-typhoon-missile-launcher-krak",
              "unit-stormtalon-gunship-weapon-family-typhoon-missile-launcher-selection"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-twin-heavy-bolter-ranged-4",
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
              "unit-stormtalon-gunship-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-twin-lascannon-ranged-5",
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
              "unit-stormtalon-gunship-selection-twin-lascannon"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-armoured-hull-melee-6",
            "title": "Armoured Hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormtalon-gunship-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-stormtalon-gunship-profile-twin-assault-cannon-ranged-7",
            "title": "Twin assault cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormtalon-gunship-selection-twin-assault-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-vindicator",
      "title": "Vindicator",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Smoke",
        "Imperium",
        "Adeptus Astartes",
        "Vindicator"
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-vindicator-ability-siege-shield",
            "title": "Siege Shield"
          },
          {
            "id": "unit-vindicator-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-vindicator-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-vindicator-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-vindicator-model-vindicator",
            "title": "Vindicator",
            "aliases": [
              "Vindicator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-vindicator-selection-demolisher-cannon",
            "title": "Demolisher Cannon",
            "aliases": [
              "Demolisher Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vindicator-profile-demolisher-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vindicator-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vindicator-profile-armoured-tracks-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vindicator-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vindicator-profile-hunter-killer-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vindicator-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vindicator-profile-storm-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-vindicator-profile-demolisher-cannon-ranged",
            "title": "Demolisher Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-vindicator-selection-demolisher-cannon"
            ]
          },
          {
            "id": "unit-vindicator-profile-armoured-tracks-melee-2",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-vindicator-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-vindicator-profile-hunter-killer-missile-ranged-3",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-vindicator-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-vindicator-profile-storm-bolter-ranged-4",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-vindicator-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-whirlwind",
      "title": "Whirlwind",
      "sourceBookId": "space-marines",
      "sourceLayer": "space-marines-codex",
      "intrinsicKeywords": [
        "Imperium",
        "Vehicle",
        "Smoke",
        "Adeptus Astartes",
        "Whirlwind"
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
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "unit-whirlwind-ability-pinning-bombardment",
            "title": "Pinning Bombardment"
          },
          {
            "id": "unit-whirlwind-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-whirlwind-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-whirlwind-ability-oath-of-moment-4",
            "title": "Oath of Moment"
          }
        ],
        "models": [
          {
            "id": "unit-whirlwind-model-whirlwind",
            "title": "Whirlwind",
            "aliases": [
              "Whirlwind"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-whirlwind-selection-whirlwind-vengeance-launcher",
            "title": "Whirlwind Vengeance Launcher",
            "aliases": [
              "Whirlwind Vengeance Launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-whirlwind-profile-whirlwind-vengeance-launcher-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-whirlwind-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-whirlwind-profile-armoured-tracks-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-whirlwind-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-whirlwind-profile-hunter-killer-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-whirlwind-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-whirlwind-profile-storm-bolter-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-whirlwind-profile-whirlwind-vengeance-launcher-ranged",
            "title": "Whirlwind Vengeance Launcher",
            "mode": "ranged",
            "range": "72\"",
            "a": "D6+3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-whirlwind-selection-whirlwind-vengeance-launcher"
            ]
          },
          {
            "id": "unit-whirlwind-profile-armoured-tracks-melee-2",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-whirlwind-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-whirlwind-profile-hunter-killer-missile-ranged-3",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-whirlwind-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-whirlwind-profile-storm-bolter-ranged-4",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-whirlwind-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-blood-angels-captain",
      "title": "Blood Angels Captain",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Grenades",
        "Imperium",
        "Captain",
        "Adeptus Astartes",
        "Blood Angels",
        "Tacticus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-company-heroes",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-company-heroes",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
            "id": "unit-blood-angels-captain-ability-rites-of-battle",
            "title": "Rites of Battle"
          },
          {
            "id": "unit-blood-angels-captain-ability-finest-hour-2",
            "title": "Finest Hour"
          },
          {
            "id": "unit-blood-angels-captain-ability-leader-3",
            "title": "Leader"
          }
        ],
        "models": [
          {
            "id": "unit-blood-angels-captain-model-blood-angels-captain",
            "title": "Blood Angels Captain",
            "aliases": [
              "Blood Angels Captain"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-blood-angels-captain-selection-master-crafted-chainsword",
            "title": "Master-crafted Chainsword",
            "aliases": [
              "Master-crafted Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-blood-angels-captain-profile-master-crafted-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-blood-angels-captain-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-blood-angels-captain-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-blood-angels-captain-selection-relic-weapon",
            "title": "Relic Weapon",
            "aliases": [
              "Relic Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-blood-angels-captain-profile-relic-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-blood-angels-captain-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-blood-angels-captain-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-blood-angels-captain-selection-inferno-pistol",
            "title": "Inferno pistol",
            "aliases": [
              "Inferno pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-blood-angels-captain-profile-inferno-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-blood-angels-captain-profile-master-crafted-chainsword-melee",
            "title": "Master-crafted Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-blood-angels-captain-selection-master-crafted-chainsword"
            ]
          },
          {
            "id": "unit-blood-angels-captain-profile-power-fist-melee-2",
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
              "unit-blood-angels-captain-selection-power-fist"
            ]
          },
          {
            "id": "unit-blood-angels-captain-profile-relic-weapon-melee-3",
            "title": "Relic Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-blood-angels-captain-selection-relic-weapon"
            ]
          },
          {
            "id": "unit-blood-angels-captain-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-blood-angels-captain-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-blood-angels-captain-profile-inferno-pistol-ranged-5",
            "title": "Inferno pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-blood-angels-captain-selection-inferno-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-captain",
      "title": "Death Company Captain",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Grenades",
        "Imperium",
        "Captain",
        "Adeptus Astartes",
        "Blood Angels",
        "Tacticus",
        "Death Company"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-death-company-marines",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-marines-with-bolt-rifles",
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
              "unitId": "unit-death-company-marines",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-marines-with-bolt-rifles",
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
          "Sv": "3+",
          "W": "5",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-death-company-captain-ability-forlorn-hero",
            "title": "Forlorn Hero"
          },
          {
            "id": "unit-death-company-captain-ability-death-vision-of-sanguinius-2",
            "title": "Death Vision of Sanguinius"
          },
          {
            "id": "unit-death-company-captain-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-captain-ability-feel-no-pain-6-4",
            "title": "Feel No Pain 6+"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-captain-model-death-company-captain",
            "title": "Death Company Captain",
            "aliases": [
              "Death Company Captain"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-captain-selection-master-crafted-chainsword",
            "title": "Master-crafted Chainsword",
            "aliases": [
              "Master-crafted Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-profile-master-crafted-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-profile-power-fist-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-selection-relic-weapon",
            "title": "Relic Weapon",
            "aliases": [
              "Relic Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-profile-relic-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-selection-inferno-pistol",
            "title": "Inferno pistol",
            "aliases": [
              "Inferno pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-profile-inferno-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-death-company-captain-profile-master-crafted-chainsword-melee",
            "title": "Master-crafted Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-captain-selection-master-crafted-chainsword"
            ]
          },
          {
            "id": "unit-death-company-captain-profile-power-fist-melee-2",
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
              "unit-death-company-captain-selection-power-fist"
            ]
          },
          {
            "id": "unit-death-company-captain-profile-relic-weapon-melee-3",
            "title": "Relic Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-captain-selection-relic-weapon"
            ]
          },
          {
            "id": "unit-death-company-captain-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-death-company-captain-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-death-company-captain-profile-inferno-pistol-ranged-5",
            "title": "Inferno pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "2+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-death-company-captain-selection-inferno-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-captain-with-jump-pack",
      "title": "Death Company Captain with Jump Pack",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Captain",
        "Grenades",
        "Fly",
        "Blood Angels",
        "Adeptus Astartes",
        "Imperium",
        "Jump Pack",
        "Tacticus",
        "Death Company"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-death-company-marines-with-jump-packs",
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
              "unitId": "unit-death-company-marines-with-jump-packs",
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
            "id": "unit-death-company-captain-with-jump-pack-ability-death-vision-of-sanguinius",
            "title": "Death Vision of Sanguinius"
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-ability-lost-to-fury-2",
            "title": "Lost to Fury"
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-ability-feel-no-pain-6-4",
            "title": "Feel No Pain 6+"
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-ability-deep-strike-5",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-captain-with-jump-pack-model-death-company-captain-with-jump-pack",
            "title": "Death Company Captain with Jump Pack",
            "aliases": [
              "Death Company Captain with Jump Pack"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-power-fist-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-relic-weapon",
            "title": "Relic Weapon",
            "aliases": [
              "Relic Weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-relic-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-astartes-chainsword-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-heavy-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-hand-flamer-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-captain-with-jump-pack-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-death-company-captain-with-jump-pack-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
              "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-power-fist-melee",
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
              "unit-death-company-captain-with-jump-pack-selection-power-fist"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-relic-weapon-melee-2",
            "title": "Relic Weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-captain-with-jump-pack-selection-relic-weapon"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-astartes-chainsword-melee-3",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "7",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-captain-with-jump-pack-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-heavy-bolt-pistol-ranged-4",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-death-company-captain-with-jump-pack-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-hand-flamer-ranged-5",
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
              "unit-death-company-captain-with-jump-pack-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-supercharge-ranged-6",
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
              "unit-death-company-captain-with-jump-pack-selection-plasma-pistol-supercharge",
              "unit-death-company-captain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-captain-with-jump-pack-profile-plasma-pistol-standard-ranged-7",
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
              "unit-death-company-captain-with-jump-pack-selection-plasma-pistol-standard",
              "unit-death-company-captain-with-jump-pack-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sanguinary-priest",
      "title": "Sanguinary Priest",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Sanguinary Priest",
        "Adeptus Astartes",
        "Blood Angels",
        "Tacticus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-assault-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-bladeguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-desolation-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-devastator-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hellblaster-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-infernus-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-intercessor-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-sternguard-veteran-squad",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tactical-squad",
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
              "unitId": "unit-assault-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-bladeguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-desolation-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-devastator-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hellblaster-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-infernus-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-intercessor-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-sternguard-veteran-squad",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tactical-squad",
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
            "id": "unit-sanguinary-priest-ability-sanguinary-priest",
            "title": "Sanguinary Priest"
          },
          {
            "id": "unit-sanguinary-priest-ability-blood-chalice-2",
            "title": "Blood Chalice"
          },
          {
            "id": "unit-sanguinary-priest-ability-support-3",
            "title": "Support"
          }
        ],
        "models": [
          {
            "id": "unit-sanguinary-priest-model-sanguinary-priest",
            "title": "Sanguinary Priest",
            "aliases": [
              "Sanguinary Priest"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sanguinary-priest-selection-absolvor-bolt-pistol",
            "title": "Absolvor bolt pistol",
            "aliases": [
              "Absolvor bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-priest-profile-absolvor-bolt-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sanguinary-priest-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-priest-profile-astartes-chainsword-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sanguinary-priest-profile-absolvor-bolt-pistol-ranged",
            "title": "Absolvor bolt pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-sanguinary-priest-selection-absolvor-bolt-pistol"
            ]
          },
          {
            "id": "unit-sanguinary-priest-profile-astartes-chainsword-melee-2",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sanguinary-priest-selection-astartes-chainsword"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-astorath",
      "title": "Astorath",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Grenades",
        "Fly",
        "Jump Pack",
        "Imperium",
        "Chaplain",
        "Adeptus Astartes",
        "Blood Angels",
        "Astorath",
        "Tacticus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-death-company-marines-with-jump-packs",
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
              "unitId": "unit-death-company-marines-with-jump-packs",
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
          "Sv": "2+",
          "W": "5",
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-astorath-ability-redeemer-of-the-lost",
            "title": "Redeemer of the Lost"
          },
          {
            "id": "unit-astorath-ability-mass-of-doom-2",
            "title": "Mass of Doom"
          },
          {
            "id": "unit-astorath-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-astorath-ability-deep-strike-4",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-astorath-model-astorath",
            "title": "Astorath",
            "aliases": [
              "Astorath"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-astorath-selection-the-executioners-axe",
            "title": "The Executioner's Axe",
            "aliases": [
              "The Executioner's Axe"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-astorath-profile-the-executioners-axe-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-astorath-profile-the-executioners-axe-melee",
            "title": "The Executioner's Axe",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "7",
            "ap": "-3",
            "d": "2",
            "abilities": "Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-astorath-selection-the-executioners-axe"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-chief-librarian-mephiston",
      "title": "Chief Librarian Mephiston",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Grenades",
        "Tacticus",
        "Psyker",
        "Adeptus Astartes",
        "Blood Angels",
        "Chief Librarian Mephiston",
        "Imperium"
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
          "M": "7\"",
          "T": "5",
          "Sv": "2+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-chief-librarian-mephiston-ability-the-quickening-psychic",
            "title": "The Quickening [Psychic]"
          },
          {
            "id": "unit-chief-librarian-mephiston-ability-transfixing-gaze-aura-psychic-2",
            "title": "Transfixing Gaze [Aura, Psychic]"
          },
          {
            "id": "unit-chief-librarian-mephiston-ability-lone-operative-3",
            "title": "Lone Operative"
          },
          {
            "id": "unit-chief-librarian-mephiston-ability-fights-first-4",
            "title": "Fights First"
          },
          {
            "id": "unit-chief-librarian-mephiston-ability-feel-no-pain-4-5",
            "title": "Feel No Pain 4+"
          }
        ],
        "models": [
          {
            "id": "unit-chief-librarian-mephiston-model-chief-librarian-mephiston",
            "title": "Chief Librarian Mephiston",
            "aliases": [
              "Chief Librarian Mephiston"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-chief-librarian-mephiston-selection-fury-of-the-ancients-witchfire",
            "title": "➤ Fury of the Ancients - Witchfire",
            "aliases": [
              "➤ Fury of the Ancients - Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-witchfire-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-selection-fury-of-the-ancients-focused-witchfire",
            "title": "➤ Fury of the Ancients - Focused Witchfire",
            "aliases": [
              "➤ Fury of the Ancients - Focused Witchfire"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-focused-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-selection-vitarus",
            "title": "Vitarus",
            "aliases": [
              "Vitarus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-vitarus-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-plasma-pistol-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-weapon-family-fury-of-the-ancients-selection",
            "title": "➤ Fury of the Ancients",
            "aliases": [
              "➤ Fury of the Ancients"
            ],
            "kind": "weapon",
            "familyId": "unit-chief-librarian-mephiston-weapon-family-fury-of-the-ancients",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-witchfire-ranged",
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-focused-witchfire-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-chief-librarian-mephiston-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-chief-librarian-mephiston-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-plasma-pistol-supercharge-ranged-4",
              "unit-chief-librarian-mephiston-profile-plasma-pistol-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-chief-librarian-mephiston-weapon-family-fury-of-the-ancients",
            "title": "➤ Fury of the Ancients",
            "aliases": [
              "➤ Fury of the Ancients"
            ],
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-witchfire-ranged",
              "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-focused-witchfire-ranged-2"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-chief-librarian-mephiston-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-chief-librarian-mephiston-profile-plasma-pistol-supercharge-ranged-4",
              "unit-chief-librarian-mephiston-profile-plasma-pistol-standard-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-witchfire-ranged",
            "title": "➤ Fury of the Ancients - Witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "2+",
            "s": "4",
            "ap": "-1",
            "d": "D3",
            "abilities": "Pistol, Psychic, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-chief-librarian-mephiston-selection-fury-of-the-ancients-witchfire",
              "unit-chief-librarian-mephiston-weapon-family-fury-of-the-ancients-selection"
            ]
          },
          {
            "id": "unit-chief-librarian-mephiston-profile-fury-of-the-ancients-focused-witchfire-ranged-2",
            "title": "➤ Fury of the Ancients - Focused Witchfire",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "2+",
            "s": "5",
            "ap": "-2",
            "d": "D3",
            "abilities": "Hazardous, Pistol, Psychic, Sustained Hits 3",
            "sourceSelectionIds": [
              "unit-chief-librarian-mephiston-selection-fury-of-the-ancients-focused-witchfire",
              "unit-chief-librarian-mephiston-weapon-family-fury-of-the-ancients-selection"
            ]
          },
          {
            "id": "unit-chief-librarian-mephiston-profile-vitarus-melee-3",
            "title": "Vitarus",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "9",
            "ap": "-3",
            "d": "D3",
            "abilities": "Lethal Hits, Psychic",
            "sourceSelectionIds": [
              "unit-chief-librarian-mephiston-selection-vitarus"
            ]
          },
          {
            "id": "unit-chief-librarian-mephiston-profile-plasma-pistol-supercharge-ranged-4",
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
              "unit-chief-librarian-mephiston-selection-plasma-pistol-supercharge",
              "unit-chief-librarian-mephiston-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-chief-librarian-mephiston-profile-plasma-pistol-standard-ranged-5",
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
              "unit-chief-librarian-mephiston-selection-plasma-pistol-standard",
              "unit-chief-librarian-mephiston-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-commander-dante",
      "title": "Commander Dante",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Fly",
        "Adeptus Astartes",
        "Blood Angels",
        "Jump Pack",
        "Tacticus",
        "Chapter Master",
        "Commander Dante"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-assault-intercessors-with-jump-packs",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-sanguinary-guard",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
              "unitId": "unit-assault-intercessors-with-jump-packs",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-sanguinary-guard",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-vanguard-veteran-squad-with-jump-packs",
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
          "Sv": "2+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "50mm"
        },
        "abilities": [
          {
            "id": "unit-commander-dante-ability-death-mask-of-sanguinius",
            "title": "Death Mask of Sanguinius"
          },
          {
            "id": "unit-commander-dante-ability-lord-regent-of-the-imperium-nihilus-2",
            "title": "Lord Regent of the Imperium Nihilus"
          },
          {
            "id": "unit-commander-dante-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-commander-dante-ability-deep-strike-4",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-commander-dante-model-commander-dante",
            "title": "Commander Dante",
            "aliases": [
              "Commander Dante"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-commander-dante-selection-perdition",
            "title": "Perdition",
            "aliases": [
              "Perdition"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-dante-profile-perdition-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-dante-selection-the-axe-mortalis",
            "title": "The Axe Mortalis",
            "aliases": [
              "The Axe Mortalis"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-dante-profile-the-axe-mortalis-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-commander-dante-profile-perdition-ranged",
            "title": "Perdition",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "2+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Pistol, Sustained Hits D3",
            "sourceSelectionIds": [
              "unit-commander-dante-selection-perdition"
            ]
          },
          {
            "id": "unit-commander-dante-profile-the-axe-mortalis-melee-2",
            "title": "The Axe Mortalis",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Lethal Hits",
            "sourceSelectionIds": [
              "unit-commander-dante-selection-the-axe-mortalis"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-lemartes",
      "title": "Lemartes",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Grenades",
        "Imperium",
        "Fly",
        "Chaplain",
        "Lemartes",
        "Adeptus Astartes",
        "Blood Angels",
        "Jump Pack",
        "Tacticus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-death-company-marines-with-jump-packs",
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
              "unitId": "unit-death-company-marines-with-jump-packs",
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
          "W": "4",
          "Ld": "5+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-lemartes-ability-guardian-of-the-lost",
            "title": "Guardian of the Lost"
          },
          {
            "id": "unit-lemartes-ability-fury-unbound-2",
            "title": "Fury Unbound"
          },
          {
            "id": "unit-lemartes-ability-leader-3",
            "title": "Leader"
          },
          {
            "id": "unit-lemartes-ability-deep-strike-4",
            "title": "Deep Strike"
          },
          {
            "id": "unit-lemartes-ability-feel-no-pain-6-5",
            "title": "Feel No Pain 6+"
          }
        ],
        "models": [
          {
            "id": "unit-lemartes-model-lemartes",
            "title": "Lemartes",
            "aliases": [
              "Lemartes"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-lemartes-selection-the-blood-crozius",
            "title": "The Blood Crozius",
            "aliases": [
              "The Blood Crozius"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lemartes-profile-the-blood-crozius-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-lemartes-selection-absolvor-bolt-pistol",
            "title": "Absolvor Bolt Pistol",
            "aliases": [
              "Absolvor Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-lemartes-profile-absolvor-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-lemartes-profile-the-blood-crozius-melee",
            "title": "The Blood Crozius",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Lethal Hits",
            "sourceSelectionIds": [
              "unit-lemartes-selection-the-blood-crozius"
            ]
          },
          {
            "id": "unit-lemartes-profile-absolvor-bolt-pistol-ranged-2",
            "title": "Absolvor Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-lemartes-selection-absolvor-bolt-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-the-sanguinor",
      "title": "The Sanguinor",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Character",
        "Infantry",
        "Fly",
        "Imperium",
        "Jump Pack",
        "The Sanguinor",
        "Adeptus Astartes",
        "Blood Angels",
        "Tacticus"
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
          "Sv": "2+",
          "W": "7",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-the-sanguinor-ability-aura-of-fervour-aura",
            "title": "Aura of Fervour (Aura)"
          },
          {
            "id": "unit-the-sanguinor-ability-miraculous-saviour-2",
            "title": "Miraculous Saviour"
          },
          {
            "id": "unit-the-sanguinor-ability-lone-operative-3",
            "title": "Lone Operative"
          },
          {
            "id": "unit-the-sanguinor-ability-deep-strike-4",
            "title": "Deep Strike"
          },
          {
            "id": "unit-the-sanguinor-ability-fights-first-5",
            "title": "Fights First"
          }
        ],
        "models": [
          {
            "id": "unit-the-sanguinor-model-the-sanguinor",
            "title": "The Sanguinor",
            "aliases": [
              "The Sanguinor"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-the-sanguinor-selection-encarmine-broadsword",
            "title": "Encarmine Broadsword",
            "aliases": [
              "Encarmine Broadsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-sanguinor-profile-encarmine-broadsword-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-the-sanguinor-profile-encarmine-broadsword-melee",
            "title": "Encarmine Broadsword",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "6",
            "ap": "-3",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-the-sanguinor-selection-encarmine-broadsword"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-marines",
      "title": "Death Company Marines",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Blood Angels",
        "Death Company Marines",
        "Tacticus",
        "Death Company"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-captain",
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
              "unitId": "unit-chaplain",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-captain",
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
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "unit-death-company-marines-ability-an-honourable-death-in-combat",
            "title": "An Honourable Death in Combat"
          },
          {
            "id": "unit-death-company-marines-ability-attached-unit-2",
            "title": "Attached Unit"
          },
          {
            "id": "unit-death-company-marines-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-marines-ability-feel-no-pain-6-4",
            "title": "Feel No Pain 6+"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-marines-model-death-company-marines",
            "title": "Death Company Marines",
            "aliases": [
              "Death Company Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-marines-selection-eviscerator",
            "title": "Eviscerator",
            "aliases": [
              "Eviscerator"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-eviscerator-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-heavy-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-hand-flamer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-inferno-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-plasma-pistol-supercharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-plasma-pistol-standard-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-astartes-chainsword-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-thunder-hammer-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-power-weapon-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-profile-power-fist-melee-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-marines-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-death-company-marines-profile-plasma-pistol-supercharge-ranged-5",
              "unit-death-company-marines-profile-plasma-pistol-standard-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-death-company-marines-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-death-company-marines-profile-plasma-pistol-supercharge-ranged-5",
              "unit-death-company-marines-profile-plasma-pistol-standard-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-death-company-marines-profile-eviscerator-melee",
            "title": "Eviscerator",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-eviscerator"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-heavy-bolt-pistol-ranged-2",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-hand-flamer-ranged-3",
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
              "unit-death-company-marines-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-inferno-pistol-ranged-4",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-inferno-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-plasma-pistol-supercharge-ranged-5",
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
              "unit-death-company-marines-selection-plasma-pistol-supercharge",
              "unit-death-company-marines-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-plasma-pistol-standard-ranged-6",
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
              "unit-death-company-marines-selection-plasma-pistol-standard",
              "unit-death-company-marines-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-astartes-chainsword-melee-7",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-thunder-hammer-melee-8",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-power-weapon-melee-9",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-selection-power-weapon"
            ]
          },
          {
            "id": "unit-death-company-marines-profile-power-fist-melee-10",
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
              "unit-death-company-marines-selection-power-fist"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-marines-with-bolt-rifles",
      "title": "Death Company Marines with Bolt Rifles",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Blood Angels",
        "Death Company Marines with Bolt Rifles",
        "Tacticus",
        "Death Company"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-chaplain",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-captain",
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
              "unitId": "unit-chaplain",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-captain",
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
          "Sv": "3+",
          "W": "2",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "",
          "Base": "32mm"
        },
        "abilities": [
          {
            "id": "unit-death-company-marines-with-bolt-rifles-ability-attached-unit",
            "title": "Attached Unit"
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-ability-visions-of-heresy-2",
            "title": "Visions of Heresy"
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-ability-feel-no-pain-6-4",
            "title": "Feel No Pain 6+"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-marines-with-bolt-rifles-model-death-company-marines",
            "title": "Death Company Marines",
            "aliases": [
              "Death Company Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-astartes-grenade-launcher-frag",
            "title": "➤ Astartes Grenade Launcher - Frag",
            "aliases": [
              "➤ Astartes Grenade Launcher - Frag"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-frag-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-astartes-grenade-launcher-krak",
            "title": "➤ Astartes Grenade Launcher - Krak",
            "aliases": [
              "➤ Astartes Grenade Launcher - Krak"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-krak-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-bolt-rifle",
            "title": "Bolt Rifle",
            "aliases": [
              "Bolt Rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-bolt-rifle-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-bolt-pistol",
            "title": "Bolt pistol",
            "aliases": [
              "Bolt pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-bolt-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-close-combat-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-eviscerator",
            "title": "Eviscerator",
            "aliases": [
              "Eviscerator"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-eviscerator-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-power-fist",
            "title": "Power Fist",
            "aliases": [
              "Power Fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-power-fist-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-thunder-hammer",
            "title": "Thunder Hammer",
            "aliases": [
              "Thunder Hammer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-thunder-hammer-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-power-weapon-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-chainsword-melee-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-hand-flamer-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-inferno-pistol-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-supercharge-ranged-13"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-standard-ranged-14"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-weapon-family-astartes-grenade-launcher-selection",
            "title": "➤ Astartes Grenade Launcher",
            "aliases": [
              "➤ Astartes Grenade Launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-marines-with-bolt-rifles-weapon-family-astartes-grenade-launcher",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-frag-ranged",
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-krak-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-marines-with-bolt-rifles-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-supercharge-ranged-13",
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-standard-ranged-14"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-death-company-marines-with-bolt-rifles-weapon-family-astartes-grenade-launcher",
            "title": "➤ Astartes Grenade Launcher",
            "aliases": [
              "➤ Astartes Grenade Launcher"
            ],
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-frag-ranged",
              "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-krak-ranged-2"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-supercharge-ranged-13",
              "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-standard-ranged-14"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-frag-ranged",
            "title": "➤ Astartes Grenade Launcher - Frag",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-astartes-grenade-launcher-frag",
              "unit-death-company-marines-with-bolt-rifles-weapon-family-astartes-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-astartes-grenade-launcher-krak-ranged-2",
            "title": "➤ Astartes Grenade Launcher - Krak",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-2",
            "d": "D3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-astartes-grenade-launcher-krak",
              "unit-death-company-marines-with-bolt-rifles-weapon-family-astartes-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-bolt-rifle-ranged-3",
            "title": "Bolt Rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Heavy",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-bolt-rifle"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-bolt-pistol-ranged-4",
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
              "unit-death-company-marines-with-bolt-rifles-selection-bolt-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-close-combat-weapon-melee-5",
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
              "unit-death-company-marines-with-bolt-rifles-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-eviscerator-melee-6",
            "title": "Eviscerator",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-eviscerator"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-power-fist-melee-7",
            "title": "Power Fist",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-power-fist"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-thunder-hammer-melee-8",
            "title": "Thunder Hammer",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-thunder-hammer"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-power-weapon-melee-9",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-power-weapon"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-astartes-chainsword-melee-10",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-hand-flamer-ranged-11",
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
              "unit-death-company-marines-with-bolt-rifles-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-inferno-pistol-ranged-12",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-bolt-rifles-selection-inferno-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-supercharge-ranged-13",
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
              "unit-death-company-marines-with-bolt-rifles-selection-plasma-pistol-supercharge",
              "unit-death-company-marines-with-bolt-rifles-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-with-bolt-rifles-profile-plasma-pistol-standard-ranged-14",
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
              "unit-death-company-marines-with-bolt-rifles-selection-plasma-pistol-standard",
              "unit-death-company-marines-with-bolt-rifles-weapon-family-plasma-pistol-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-marines-with-jump-packs",
      "title": "Death Company Marines with Jump Packs",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Blood Angels",
        "Death Company Marines with Jump Packs",
        "Tacticus",
        "Fly",
        "Jump Pack",
        "Death Company"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-astorath",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-chaplain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-death-company-captain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-lemartes",
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
              "unitId": "unit-astorath",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-chaplain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-death-company-captain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-lemartes",
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
            "id": "unit-death-company-marines-with-jump-packs-ability-savage-fury",
            "title": "Savage Fury"
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-ability-attached-unit-2",
            "title": "Attached Unit"
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-ability-feel-no-pain-6-4",
            "title": "Feel No Pain 6+"
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-ability-deep-strike-5",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-marines-with-jump-packs-model-death-company-marines",
            "title": "Death Company Marines",
            "aliases": [
              "Death Company Marines"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-astartes-chainsword",
            "title": "Astartes Chainsword",
            "aliases": [
              "Astartes Chainsword"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-astartes-chainsword-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-heavy-bolt-pistol",
            "title": "Heavy Bolt Pistol",
            "aliases": [
              "Heavy Bolt Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-heavy-bolt-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-plasma-pistol-supercharge",
            "title": "➤ Plasma pistol - supercharge",
            "aliases": [
              "➤ Plasma pistol - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-supercharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-plasma-pistol-standard",
            "title": "➤ Plasma pistol - standard",
            "aliases": [
              "➤ Plasma pistol - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-hand-flamer",
            "title": "Hand flamer",
            "aliases": [
              "Hand flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-hand-flamer-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-inferno-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-power-weapon-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-power-fist-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-selection-eviscerator",
            "title": "Eviscerator",
            "aliases": [
              "Eviscerator"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-eviscerator-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-weapon-family-plasma-pistol-selection",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-marines-with-jump-packs-weapon-family-plasma-pistol",
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-supercharge-ranged-3",
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-death-company-marines-with-jump-packs-weapon-family-plasma-pistol",
            "title": "➤ Plasma pistol",
            "aliases": [
              "➤ Plasma pistol"
            ],
            "profileIds": [
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-supercharge-ranged-3",
              "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-standard-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-astartes-chainsword-melee",
            "title": "Astartes Chainsword",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-jump-packs-selection-astartes-chainsword"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-heavy-bolt-pistol-ranged-2",
            "title": "Heavy Bolt Pistol",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-jump-packs-selection-heavy-bolt-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-supercharge-ranged-3",
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
              "unit-death-company-marines-with-jump-packs-selection-plasma-pistol-supercharge",
              "unit-death-company-marines-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-plasma-pistol-standard-ranged-4",
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
              "unit-death-company-marines-with-jump-packs-selection-plasma-pistol-standard",
              "unit-death-company-marines-with-jump-packs-weapon-family-plasma-pistol-selection"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-hand-flamer-ranged-5",
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
              "unit-death-company-marines-with-jump-packs-selection-hand-flamer"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-inferno-pistol-ranged-6",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-jump-packs-selection-inferno-pistol"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-power-weapon-melee-7",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-jump-packs-selection-power-weapon"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-power-fist-melee-8",
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
              "unit-death-company-marines-with-jump-packs-selection-power-fist"
            ]
          },
          {
            "id": "unit-death-company-marines-with-jump-packs-profile-eviscerator-melee-9",
            "title": "Eviscerator",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-death-company-marines-with-jump-packs-selection-eviscerator"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sanguinary-guard",
      "title": "Sanguinary Guard",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "Grenades",
        "Imperium",
        "Adeptus Astartes",
        "Blood Angels",
        "Sanguinary Guard",
        "Jump Pack",
        "Tacticus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-captain-with-jump-pack",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-dante",
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
              "unitId": "unit-captain-with-jump-pack",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-dante",
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
          "Sv": "2+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "4+",
          "Base": "40mm"
        },
        "abilities": [
          {
            "id": "unit-sanguinary-guard-ability-angelic-visage",
            "title": "Angelic Visage"
          },
          {
            "id": "unit-sanguinary-guard-ability-heirs-of-azkaellon-2",
            "title": "Heirs of Azkaellon"
          },
          {
            "id": "unit-sanguinary-guard-ability-attached-unit-3",
            "title": "Attached Unit"
          },
          {
            "id": "unit-sanguinary-guard-ability-deep-strike-4",
            "title": "Deep Strike"
          }
        ],
        "models": [
          {
            "id": "unit-sanguinary-guard-model-sanguinary-guard",
            "title": "Sanguinary Guard",
            "aliases": [
              "Sanguinary Guard"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sanguinary-guard-selection-encarmine-blade",
            "title": "Encarmine Blade",
            "aliases": [
              "Encarmine Blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-guard-profile-encarmine-blade-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sanguinary-guard-selection-encarmine-spear",
            "title": "Encarmine Spear",
            "aliases": [
              "Encarmine Spear"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-guard-profile-encarmine-spear-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sanguinary-guard-selection-angelus-boltgun",
            "title": "Angelus Boltgun",
            "aliases": [
              "Angelus Boltgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-guard-profile-angelus-boltgun-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sanguinary-guard-selection-inferno-pistol",
            "title": "Inferno Pistol",
            "aliases": [
              "Inferno Pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sanguinary-guard-profile-inferno-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sanguinary-guard-selection-sanguinary-banner",
            "title": "Sanguinary Banner",
            "aliases": [
              "Sanguinary Banner"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-sanguinary-guard-wargear-ability-sanguinary-banner"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sanguinary-guard-profile-encarmine-blade-melee",
            "title": "Encarmine Blade",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-3",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sanguinary-guard-selection-encarmine-blade"
            ]
          },
          {
            "id": "unit-sanguinary-guard-profile-encarmine-spear-melee-2",
            "title": "Encarmine Spear",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Lance",
            "sourceSelectionIds": [
              "unit-sanguinary-guard-selection-encarmine-spear"
            ]
          },
          {
            "id": "unit-sanguinary-guard-profile-angelus-boltgun-ranged-3",
            "title": "Angelus Boltgun",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-sanguinary-guard-selection-angelus-boltgun"
            ]
          },
          {
            "id": "unit-sanguinary-guard-profile-inferno-pistol-ranged-4",
            "title": "Inferno Pistol",
            "mode": "ranged",
            "range": "6\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-4",
            "d": "D3",
            "abilities": "Melta 2, Pistol",
            "sourceSelectionIds": [
              "unit-sanguinary-guard-selection-inferno-pistol"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-sanguinary-guard-wargear-ability-sanguinary-banner",
            "title": "Sanguinary Banner",
            "requiredSelectionIds": []
          }
        ]
      }
    },
    {
      "id": "unit-baal-predator",
      "title": "Baal Predator",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Imperium",
        "Smoke",
        "Vehicle",
        "Adeptus Astartes",
        "Baal Predator",
        "Blood Angels",
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
          "T": "10",
          "Sv": "3+",
          "W": "11",
          "Ld": "6+",
          "OC": "3",
          "Invulnerable": "",
          "Base": "Hull"
        },
        "abilities": [
          {
            "id": "unit-baal-predator-ability-overcharged-engines",
            "title": "Overcharged Engines"
          },
          {
            "id": "unit-baal-predator-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-baal-predator-ability-deadly-demise-d3-3",
            "title": "Deadly Demise D3"
          }
        ],
        "models": [
          {
            "id": "unit-baal-predator-model-baal-predator",
            "title": "Baal Predator",
            "aliases": [
              "Baal Predator"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-baal-predator-selection-heavy-flamer",
            "title": "Heavy Flamer",
            "aliases": [
              "Heavy Flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-heavy-flamer-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-heavy-bolter",
            "title": "Heavy Bolter",
            "aliases": [
              "Heavy Bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-heavy-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-baal-flamestorm-cannon",
            "title": "Baal Flamestorm Cannon",
            "aliases": [
              "Baal Flamestorm Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-baal-flamestorm-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-twin-assault-cannon",
            "title": "Twin Assault Cannon",
            "aliases": [
              "Twin Assault Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-twin-assault-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-armoured-tracks",
            "title": "Armoured Tracks",
            "aliases": [
              "Armoured Tracks"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-armoured-tracks-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-hunter-killer-missile",
            "title": "Hunter-killer missile",
            "aliases": [
              "Hunter-killer missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-hunter-killer-missile-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-baal-predator-selection-storm-bolter",
            "title": "Storm bolter",
            "aliases": [
              "Storm bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-baal-predator-profile-storm-bolter-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-baal-predator-profile-heavy-flamer-ranged",
            "title": "Heavy Flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-heavy-flamer"
            ]
          },
          {
            "id": "unit-baal-predator-profile-heavy-bolter-ranged-2",
            "title": "Heavy Bolter",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Assault, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-baal-predator-profile-baal-flamestorm-cannon-ranged-3",
            "title": "Baal Flamestorm Cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6+3",
            "skill": "N/A",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Assault, Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-baal-flamestorm-cannon"
            ]
          },
          {
            "id": "unit-baal-predator-profile-twin-assault-cannon-ranged-4",
            "title": "Twin Assault Cannon",
            "mode": "ranged",
            "range": "24\"",
            "a": "6",
            "skill": "3+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Devastating wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-twin-assault-cannon"
            ]
          },
          {
            "id": "unit-baal-predator-profile-armoured-tracks-melee-5",
            "title": "Armoured Tracks",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-armoured-tracks"
            ]
          },
          {
            "id": "unit-baal-predator-profile-hunter-killer-missile-ranged-6",
            "title": "Hunter-killer missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "2+",
            "s": "14",
            "ap": "-3",
            "d": "D6",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-hunter-killer-missile"
            ]
          },
          {
            "id": "unit-baal-predator-profile-storm-bolter-ranged-7",
            "title": "Storm bolter",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-baal-predator-selection-storm-bolter"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-death-company-dreadnought",
      "title": "Death Company Dreadnought",
      "sourceBookId": "blood-angels",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Imperium",
        "Dreadnought",
        "Death Company Dreadnought",
        "Adeptus Astartes",
        "Blood Angels",
        "Death Company"
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
          "W": "12",
          "Ld": "6+",
          "OC": "4",
          "Invulnerable": "",
          "Base": "90mm"
        },
        "abilities": [
          {
            "id": "unit-death-company-dreadnought-ability-driven-by-fury",
            "title": "Driven by Fury"
          },
          {
            "id": "unit-death-company-dreadnought-ability-damaged-1-4-wounds-remaining-2",
            "title": "Damaged: 1-4 Wounds Remaining"
          },
          {
            "id": "unit-death-company-dreadnought-ability-black-rage-3",
            "title": "Black Rage"
          },
          {
            "id": "unit-death-company-dreadnought-ability-deadly-demise-d3-4",
            "title": "Deadly Demise D3"
          },
          {
            "id": "unit-death-company-dreadnought-ability-feel-no-pain-6-5",
            "title": "Feel No Pain 6+"
          }
        ],
        "models": [
          {
            "id": "unit-death-company-dreadnought-model-death-company-dreadnought",
            "title": "Death Company Dreadnought",
            "aliases": [
              "Death Company Dreadnought"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-death-company-dreadnought-selection-blood-fists",
            "title": "Blood Fists",
            "aliases": [
              "Blood Fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-blood-fist-bolt-rifles",
            "title": "Blood Fist Bolt Rifles",
            "aliases": [
              "Blood Fist Bolt Rifles"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-fist-bolt-rifles-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-blood-talons-strike",
            "title": "➤ Blood Talons - Strike",
            "aliases": [
              "➤ Blood Talons - Strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-talons-strike-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-blood-talons-sweep",
            "title": "➤ Blood Talons - Sweep",
            "aliases": [
              "➤ Blood Talons - Sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-talons-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-twin-heavy-bolter",
            "title": "Twin heavy bolter",
            "aliases": [
              "Twin heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-twin-heavy-bolter-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-twin-multi-melta",
            "title": "Twin multi-melta",
            "aliases": [
              "Twin multi-melta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-twin-multi-melta-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-selection-twin-icarus-ironhail-heavy-stubber",
            "title": "Twin Icarus ironhail heavy stubber",
            "aliases": [
              "Twin Icarus ironhail heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-death-company-dreadnought-profile-twin-icarus-ironhail-heavy-stubber-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-death-company-dreadnought-weapon-family-blood-talons-selection",
            "title": "➤ Blood Talons",
            "aliases": [
              "➤ Blood Talons"
            ],
            "kind": "weapon",
            "familyId": "unit-death-company-dreadnought-weapon-family-blood-talons",
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-talons-strike-melee-3",
              "unit-death-company-dreadnought-profile-blood-talons-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-death-company-dreadnought-weapon-family-blood-talons",
            "title": "➤ Blood Talons",
            "aliases": [
              "➤ Blood Talons"
            ],
            "profileIds": [
              "unit-death-company-dreadnought-profile-blood-talons-strike-melee-3",
              "unit-death-company-dreadnought-profile-blood-talons-sweep-melee-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-death-company-dreadnought-profile-blood-fists-melee",
            "title": "Blood Fists",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-blood-fists"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-blood-fist-bolt-rifles-ranged-2",
            "title": "Blood Fist Bolt Rifles",
            "mode": "ranged",
            "range": "24\"",
            "a": "4",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-blood-fist-bolt-rifles"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-blood-talons-strike-melee-3",
            "title": "➤ Blood Talons - Strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "3+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-blood-talons-strike",
              "unit-death-company-dreadnought-weapon-family-blood-talons-selection"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-blood-talons-sweep-melee-4",
            "title": "➤ Blood Talons - Sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "10",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-blood-talons-sweep",
              "unit-death-company-dreadnought-weapon-family-blood-talons-selection"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-twin-heavy-bolter-ranged-5",
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
              "unit-death-company-dreadnought-selection-twin-heavy-bolter"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-twin-multi-melta-ranged-6",
            "title": "Twin multi-melta",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-twin-multi-melta"
            ]
          },
          {
            "id": "unit-death-company-dreadnought-profile-twin-icarus-ironhail-heavy-stubber-ranged-7",
            "title": "Twin Icarus ironhail heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-FLY 4+, Rapid Fire 3, Twin-linked",
            "sourceSelectionIds": [
              "unit-death-company-dreadnought-selection-twin-icarus-ironhail-heavy-stubber"
            ]
          }
        ],
        "wargearAbilities": []
      }
    }
  ],
  "detachments": [
    {
      "id": "angelic-inheritors",
      "title": "Angelic Inheritors",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "encarmine-speartip",
      "title": "Encarmine Speartip",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "legacy-of-grace",
      "title": "Legacy of Grace",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "liberator-assault-group",
      "title": "Liberator Assault Group",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "rage-cursed-onslaught",
      "title": "Rage-cursed Onslaught",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "the-angelic-host",
      "title": "The Angelic Host",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "the-lost-brethren",
      "title": "The Lost Brethren",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "wrath-of-the-doomed",
      "title": "Wrath of the Doomed",
      "sourceBookId": "blood-angels",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "vengeful-hosts",
      "title": "Vengeful Hosts",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "fulguris-task-force",
      "title": "Fulguris Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "librarius-conclave",
      "title": "Librarius Conclave",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "subversion-assets",
      "title": "Subversion Assets",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "armoured-speartip",
      "title": "Armoured Speartip",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "headhunter-task-force",
      "title": "Headhunter Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "ceramite-sentinels",
      "title": "Ceramite Sentinels",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "bastion-task-force",
      "title": "Bastion Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "orbital-assault-force",
      "title": "Orbital Assault Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "1st-company-task-force",
      "title": "1st Company Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "anvil-siege-force",
      "title": "Anvil Siege Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "firestorm-assault-force",
      "title": "Firestorm Assault Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "gladius-task-force",
      "title": "Gladius Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "ironstorm-spearhead",
      "title": "Ironstorm Spearhead",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "stormlance-task-force",
      "title": "Stormlance Task Force",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "vanguard-spearhead",
      "title": "Vanguard Spearhead",
      "sourceBookId": "space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    }
  ],
  "enhancements": [
    {
      "legacyKey": "enhancement-prescient-flash",
      "title": "Prescient Flash",
      "text": "A flash of foresight and clarity sings through this warrior’s blood and guides his steps into battle. Adeptus Astartes model only. Models in the bearer’s unit have the Scouts 6\" ability.",
      "value": 20,
      "detachment": "Angelic Inheritors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-prescient-flash",
      "detachmentId": "angelic-inheritors",
      "id": "enhancement-prescient-flash",
      "points": 20,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "prescient-flash",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-troubling-visions",
      "title": "Troubling Visions",
      "text": "In the long run, these strange and intrusive visions of bloodshed bode terribly ill for this champion of the Blood Angels. In this instance, though, they bring him closer than ever to the glory of his gene‑sire. Adeptus Astartes model only. Once per battle, in your Command phase, the bearer can use this Enhancement. When it does, until the start of your next Command phase, all Angelic Legacy abilities (see left) are active for the bearer’s unit, instead of only two of them.",
      "value": 15,
      "detachment": "Angelic Inheritors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-troubling-visions",
      "detachmentId": "angelic-inheritors",
      "id": "enhancement-troubling-visions",
      "points": 15,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "troubling-visions",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-blazing-icon",
      "title": "Blazing Icon",
      "text": "What was before merely a decorative blood drop pendant now shines with a seemingly miraculous light as bright as any star. The foe are forced to avert their gaze from its wrathful magnificence. Adeptus Astartes Infantry model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit.",
      "value": 20,
      "detachment": "Angelic Inheritors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-blazing-icon",
      "detachmentId": "angelic-inheritors",
      "id": "enhancement-blazing-icon",
      "points": 20,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "blazing-icon",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-ordained-sacrifice",
      "title": "Ordained Sacrifice",
      "text": "Knowing only too well the desperate and vital nature of the battle before him, this scion of Sanguinius echoes his Primarch’s resolute determination to fight on even beyond what seems the doors of certain death. Adeptus Astartes model only. (Once per battle, per army) When this model is destroyed, at the end of the phase, roll one D6: ■ On a 2+, set up this model on the battlefield, unengaged and as close as possible to where it was destroyed. This model is not part of an attached unit and its unit has a starting strength of 1. This model has 3 wounds remaining.",
      "value": 25,
      "detachment": "Angelic Inheritors",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-ordained-sacrifice",
      "detachmentId": "angelic-inheritors",
      "id": "enhancement-ordained-sacrifice",
      "points": 25,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "sourceId": "ordained-sacrifice",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-angelic-executioner",
      "title": "Angelic Executioner",
      "text": "This deadly duellist leads his battle‑brothers in masterful strikes capable of carving through their armoured or swarming foes with breathtaking fluidity. ADEPTUS ASTARTES JUMP PACK model only. When this unit is selected to fight, this unit’s melee attacks have: ▪ [LETHAL HITS]. ▪ Or: [SUSTAINED HITS 1].",
      "value": 25,
      "detachment": "Encarmine Speartip",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-angelic-executioner",
      "detachmentId": "encarmine-speartip",
      "id": "enhancement-angelic-executioner",
      "points": 25,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "sourceId": "angelic-executioner",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-shadow-of-abomination",
      "title": "Shadow of Abomination",
      "text": "Granted a glimmer of foresight by his genetic inheritance, this Son of Sanguinius has identified a foe whose future is drenched in the blood of the Imperium. Such an enemy cannot be allowed to live. ADEPTUS ASTARTES JUMP PACK model only. (Once per battle, per army) When this unit is selected to fight you can use this ability. If you do, this model’s melee attacks have +1 D.",
      "value": 25,
      "detachment": "Encarmine Speartip",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-shadow-of-abomination",
      "detachmentId": "encarmine-speartip",
      "id": "enhancement-shadow-of-abomination",
      "points": 25,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "sourceId": "shadow-of-abomination",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-blood-boil",
      "title": "Blood Boil",
      "text": "This psyker bears some of the most esoteric gifts granted by the blood of his Primarch, and his empyric powers surge with a vital potency capable of boiling the foe’s essence in their veins. ADEPTUS ASTARTES PSYKER model only. This model’s [PSYCHIC] attacks: ▪ Have [ANTI: non‑MONSTER/VEHICLE 5+]. ▪ Can re‑roll damage rolls.",
      "value": 10,
      "detachment": "Legacy of Grace",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-blood-boil",
      "detachmentId": "legacy-of-grace",
      "id": "enhancement-blood-boil",
      "points": 10,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "sourceId": "blood-boil",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-aureole-of-the-angel",
      "title": "Aureole of the Angel",
      "text": "An echo of Sanguinius’ magnificence, this gilded halo casts an aura of shimmering and distorted energy spectra that thwarts attempts to pinpoint the bearer’s position. ADEPTUS ASTARTES model only. This unit has ‑3\" detection range.",
      "value": 20,
      "detachment": "Legacy of Grace",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-aureole-of-the-angel",
      "detachmentId": "legacy-of-grace",
      "id": "enhancement-aureole-of-the-angel",
      "points": 20,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "sourceId": "aureole-of-the-angel",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-gift-of-foresight",
      "title": "Gift of Foresight",
      "text": "ADEPTUS ASTARTES model only. Once per battle round, just after making a Hit roll, a Wound roll or a saving throw for the bearer, you can treat the result as an unmodified roll of 6 instead.",
      "value": 15,
      "detachment": "Liberator Assault Group",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-gift-of-foresight",
      "detachmentId": "liberator-assault-group",
      "id": "enhancement-gift-of-foresight",
      "sourceId": "gift-of-foresight",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-icon-of-the-angel",
      "title": "Icon of the Angel",
      "text": "ADEPTUS ASTARTES model only. Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer's unit is selected to Fall Back, models in that enemy unit must take Desperate Escape tests as if their unit was Battle-shocked. If that enemy unit is also Battle-shocked, subtract 1 from each of those tests.",
      "value": 20,
      "detachment": "Liberator Assault Group",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-icon-of-the-angel",
      "detachmentId": "liberator-assault-group",
      "id": "enhancement-icon-of-the-angel",
      "sourceId": "icon-of-the-angel",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-rage-fuelled-warrior",
      "title": "Rage-fuelled Warrior",
      "text": "ADEPTUS ASTARTES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer's melee weapons have the [SUSTAINED HITS 3] ability.",
      "value": 35,
      "detachment": "Liberator Assault Group",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-rage-fuelled-warrior",
      "detachmentId": "liberator-assault-group",
      "id": "enhancement-rage-fuelled-warrior",
      "sourceId": "rage-fuelled-warrior",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-speed-of-the-primarch",
      "title": "Speed of the Primarch",
      "text": "ADEPTUS ASTARTES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer's unit have the Fights First ability.",
      "value": 25,
      "detachment": "Liberator Assault Group",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-speed-of-the-primarch",
      "detachmentId": "liberator-assault-group",
      "id": "enhancement-speed-of-the-primarch",
      "sourceId": "speed-of-the-primarch",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-carmine-reliquary",
      "title": "Carmine Reliquary",
      "text": "This armoured casket contains the skull of a beloved Blood Angels Captain lost to the Black Rage. It is a potent talisman of unfaltering aggression. Chaplain model only. Models in the bearer’s unit have the Scouts 6\" ability. Each time you take a Battle‑shock test for an Adeptus Astartes unit within 6\" of the bearer, you can re‑roll the result.",
      "value": 30,
      "detachment": "Rage-cursed Onslaught",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-carmine-reliquary",
      "detachmentId": "rage-cursed-onslaught",
      "id": "enhancement-carmine-reliquary",
      "points": 30,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "carmine-reliquary",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-master-of-the-red-thirst",
      "title": "Master of the Red Thirst",
      "text": "Long practice has allowed this champion to gain a modicum of focus and control over their Red Thirst – wisdom they pass on in the heat of battle. Adeptus Astartes model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.",
      "value": 25,
      "detachment": "Rage-cursed Onslaught",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-master-of-the-red-thirst",
      "detachmentId": "rage-cursed-onslaught",
      "id": "enhancement-master-of-the-red-thirst",
      "points": 25,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "master-of-the-red-thirst",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "sanguinary-tear-aura",
      "title": "Sanguinary Tear (Aura)",
      "text": "Legend has it that the blood‑red stone set into this relic houses a teardrop shed by the Primarch himself. Those lost to the Black Rage seem to fight all the more furiously in its presence. Adeptus Astartes model only. While a friendly Death Company unit is within 6\" of the bearer, add 1 to the Strength characteristic of weapons equipped by models in that unit.",
      "detachment": "Rage-cursed Onslaught",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "sanguinary-tear-aura",
      "detachmentId": "rage-cursed-onslaught",
      "id": "sanguinary-tear-aura",
      "points": 35,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-angels-fang",
      "title": "Angel's Fang",
      "text": "This artificer ‑crafted weapon has a dark reputation amongst the Chapter. Yet none can deny its lethality, or its machine‑spirit’s desire to drink the blood of the mightiest foes. Adeptus Astartes model only. Each time the bearer makes a melee attack that targets a Character, Monster or Vehicle unit, that attack has the [SUSTAINED HITS 2] ability.",
      "value": 25,
      "detachment": "Rage-cursed Onslaught",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-angels-fang",
      "detachmentId": "rage-cursed-onslaught",
      "id": "enhancement-angels-fang",
      "points": 25,
      "sourcePages": [
        7
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          7
        ]
      },
      "sourceId": "angel-s-fang",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-archangels-shard",
      "title": "Archangel's Shard",
      "text": "ADEPTUS ASTARTES JUMP PACK model only. The bearer's melee weapons have [ANTI-CHAOS 5+] and [LANCE].",
      "value": 15,
      "detachment": "The Angelic Host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-archangels-shard",
      "detachmentId": "the-angelic-host",
      "id": "enhancement-archangels-shard",
      "sourceId": "archangels-shard",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-artisan-of-war",
      "title": "Artisan of War",
      "text": "ADEPTUS ASTARTES JUMP PACK model only. Improve the Armour Penetration characteristic of the bearer's weapons by 1, and the bearer has a Save characteristic of 2+.",
      "value": 20,
      "detachment": "The Angelic Host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-artisan-of-war",
      "detachmentId": "the-angelic-host",
      "id": "enhancement-artisan-of-war",
      "sourceId": "artisan-of-war",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-gleaming-pinions",
      "title": "Gleaming Pinions",
      "text": "ADEPTUS ASTARTES JUMP PACK model only. In your opponent's Movement phase, if an enemy unit ends a move within 8\\\" of this unit and this unit is unengaged, this unit can make a Normal move of up to 6\\\".",
      "value": 25,
      "detachment": "The Angelic Host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-gleaming-pinions",
      "detachmentId": "the-angelic-host",
      "id": "enhancement-gleaming-pinions",
      "sourceId": "gleaming-pinions",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-visage-of-death",
      "title": "Visage of Death",
      "text": "ADEPTUS ASTARTES JUMP PACK model only. In the Battle-shock step of your opponent's Command phase, each enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer must take a Battle-shock test.",
      "value": 15,
      "detachment": "The Angelic Host",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-visage-of-death",
      "detachmentId": "the-angelic-host",
      "id": "enhancement-visage-of-death",
      "sourceId": "visage-of-death",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-blood-shard",
      "title": "Blood Shard",
      "text": "DEATH COMPANY model only. The first time the bearer is destroyed, at the end of the phase, roll one D6: on a 2+, set the bearer back up as close as possible to where it was destroyed and not within Engagement Range of enemy units, with 3 wounds remaining.",
      "value": 25,
      "detachment": "The Lost Brethren",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-blood-shard",
      "detachmentId": "the-lost-brethren",
      "id": "enhancement-blood-shard",
      "sourceId": "blood-shard",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-sanguinius-grace",
      "title": "Sanguinius' Grace",
      "text": "DEATH COMPANY model only. Once per battle, at the end of the Fight phase, if the bearer is within Engagement Range of three or more enemy models, the bearer can fight one additional time.",
      "value": 20,
      "detachment": "The Lost Brethren",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-sanguinius-grace",
      "detachmentId": "the-lost-brethren",
      "id": "enhancement-sanguinius-grace",
      "sourceId": "sanguinius-grace",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-to-slay-the-warmaster",
      "title": "To Slay The Warmaster",
      "text": "DEATH COMPANY model only. Once per battle, at the start of the Fight phase, if the bearer is within Engagement Range of an enemy CHARACTER unit, select one and roll six D6: for each 4+, one CHARACTER model in that unit suffers 1 mortal wound.",
      "value": 15,
      "detachment": "The Lost Brethren",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-to-slay-the-warmaster",
      "detachmentId": "the-lost-brethren",
      "id": "enhancement-to-slay-the-warmaster",
      "sourceId": "to-slay-the-warmaster",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-vengeful-onslaught",
      "title": "Vengeful Onslaught",
      "text": "DEATH COMPANY model only. If the bearer is destroyed, until the end of your next turn, each time a friendly DEATH COMPANY model makes an attack, add 1 to the Hit roll.",
      "value": 10,
      "detachment": "The Lost Brethren",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-vengeful-onslaught",
      "detachmentId": "the-lost-brethren",
      "id": "enhancement-vengeful-onslaught",
      "sourceId": "vengeful-onslaught",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-instinctive-interception",
      "title": "Instinctive Interception",
      "text": "Proudly is Sanguinius remembered for his rapid intercession in the protection of his gene‑sons. Driven on by deathly visions, this lost warrior is a tragic monument to such glory. DEATH COMPANY model only. When you target this unit with the Heroic Intervention stratagem, that use is ‑1 CP.",
      "value": 10,
      "detachment": "Wrath of the Doomed",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-instinctive-interception",
      "detachmentId": "wrath-of-the-doomed",
      "id": "enhancement-instinctive-interception",
      "points": 10,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "sourceId": "instinctive-interception",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-on-the-archtraitors-bridge",
      "title": "On the Archtraitor's Bridge",
      "text": "Lost to a memory shard of the Primarch, in this warrior’s mind, he has entered the Archtraitor’s sanctum, and all that stands between him and Horus is a host of massing traitors. DEATH COMPANY model only. This model’s melee attacks have +2 A.",
      "value": 20,
      "detachment": "Wrath of the Doomed",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-on-the-archtraitors-bridge",
      "detachmentId": "wrath-of-the-doomed",
      "id": "enhancement-on-the-archtraitors-bridge",
      "points": 20,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "blood-angels-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "sourceId": "on-the-archtraitor-s-bridge",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/blood-angels",
        "verifiedAt": "2026-08-12"
      },
      "sourceBookId": "blood-angels"
    },
    {
      "legacyKey": "enhancement-avenging-angel",
      "title": "Avenging Angel",
      "text": "ADEPTUS ASTARTES FLY INFANTRY model only. When this unit ends an ingress move, select up to one enemy unit within 9\" of this unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.",
      "value": 20,
      "detachment": "Vengeful Hosts",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-captain-with-jump-pack",
            "unit-chaplain-with-jump-pack"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-avenging-angel",
      "detachmentId": "vengeful-hosts",
      "id": "enhancement-avenging-angel",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-orksbane",
      "title": "Orksbane",
      "text": "ADEPTUS ASTARTES FLY INFANTRY model only. This model has the following weapon: Orksbane [CLEAVE 2] RANGE A WS S AP D Melee 4 2+ 8 -2",
      "value": 20,
      "detachment": "Vengeful Hosts",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-captain-with-jump-pack",
            "unit-chaplain-with-jump-pack"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-orksbane",
      "detachmentId": "vengeful-hosts",
      "id": "enhancement-orksbane",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          2
        ]
      },
      "profile": {
        "name": "Orksbane",
        "type": "Melee Weapons",
        "characteristics": {
          "Range": "Melee",
          "A": "4",
          "WS": "2+",
          "S": "8",
          "AP": "-2",
          "D": "3",
          "Keywords": "Cleave 2"
        }
      },
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-bellicose-weapon-spirits",
      "title": "Bellicose Weapon Spirits (Upgrade)",
      "text": "SPEEDER unit only. This unit can re-roll: ▪ Damage rolls. ▪ Rolls to determine the A of a weapon.",
      "value": 15,
      "detachment": "Fulguris Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-land-speeder",
            "unit-storm-speeder-hailstrike",
            "unit-storm-speeder-hammerstrike",
            "unit-storm-speeder-thunderstrike"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-bellicose-weapon-spirits",
      "detachmentId": "fulguris-task-force",
      "id": "enhancement-bellicose-weapon-spirits",
      "kind": "Upgrade",
      "points": 15,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-raptorial-cogitator-core",
      "title": "Raptorial Cogitator Core (Upgrade)",
      "text": "SPEEDER unit only. This unit’s ranged attacks have [IGNORES COVER].",
      "value": 15,
      "detachment": "Fulguris Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-land-speeder",
            "unit-storm-speeder-hailstrike",
            "unit-storm-speeder-hammerstrike",
            "unit-storm-speeder-thunderstrike"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-raptorial-cogitator-core",
      "detachmentId": "fulguris-task-force",
      "id": "enhancement-raptorial-cogitator-core",
      "kind": "Upgrade",
      "points": 15,
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-celerity",
      "title": "Celerity",
      "text": "ADEPTUS ASTARTES PSYKER model only. ▪ When this unit is selected to make an advance move, that move does not prevent this unit from being eligible to declare a charge. ▪ When this unit is selected to make a fall-back move, if this unit has the Biomancy Discipline ability, that move does not prevent this unit from being eligible to declare a charge.",
      "value": 35,
      "detachment": "Librarius Conclave",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-celerity",
      "detachmentId": "librarius-conclave",
      "id": "enhancement-celerity",
      "kind": "Enhancement",
      "points": 35,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-fusillade",
      "title": "Fusillade",
      "text": "ADEPTUS ASTARTES PSYKER model only. This unit’s ranged attacks have: ▪ [LETHAL HITS] ▪ If this unit has the Pyromancy Discipline ability, [SUSTAINED HITS 1].",
      "value": 25,
      "detachment": "Librarius Conclave",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-fusillade",
      "detachmentId": "librarius-conclave",
      "id": "enhancement-fusillade",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-obfuscation",
      "title": "Obfuscation",
      "text": "ADEPTUS ASTARTES PSYKER model only. ▪ Enemy units cannot target this unit with snap shooting attacks. ▪ If this unit has the Telepathy Discipline ability, this unit has -3\" detection range.",
      "value": 25,
      "detachment": "Librarius Conclave",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-obfuscation",
      "detachmentId": "librarius-conclave",
      "id": "enhancement-obfuscation",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-prescience",
      "title": "Prescience",
      "text": "ADEPTUS ASTARTES PSYKER model only (excluding TERMINATOR models). (Once per turn per unit) In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is unengaged, this unit can make a normal move of: ▪ Up to D6\". ▪ Or: If this unit has the Divination Discipline ability, up to 6\".",
      "value": 20,
      "detachment": "Librarius Conclave",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-librarian",
            "unit-librarian-in-phobos-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-prescience",
      "detachmentId": "librarius-conclave",
      "id": "enhancement-prescience",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-temporal-corridor",
      "title": "Temporal Corridor",
      "text": "ADEPTUS ASTARTES PSYKER model only. ▪ If this unit has the Telekinesis Discipline ability, this unit has Deep Strike. ▪ At the end of your opponent’s Fight phase, if this unit is unengaged, you can use this ability. If you do: ▫ Place this unit in strategic reserves. ▫ This unit can make an ingress move in your next Movement phase (including in your first turn).",
      "value": 25,
      "detachment": "Librarius Conclave",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-temporal-corridor",
      "detachmentId": "librarius-conclave",
      "id": "enhancement-temporal-corridor",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-death-in-the-dark",
      "title": "Death in the Dark (Upgrade)",
      "text": "INFANTRY PHOBOS unit only. This unit’s attacks that target a hidden unit have +1 to hit rolls.",
      "value": 15,
      "detachment": "Subversion Assets",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-captain-in-phobos-armour",
            "unit-eliminator-squad",
            "unit-incursor-squad",
            "unit-infiltrator-squad",
            "unit-librarian-in-phobos-armour",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-reiver-squad"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-death-in-the-dark",
      "detachmentId": "subversion-assets",
      "id": "enhancement-death-in-the-dark",
      "kind": "Upgrade",
      "points": 15,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-shroud-field",
      "title": "Shroud Field",
      "text": "PHOBOS model only. This model has: ▪ Lone Operative. ▪ Stealth.",
      "value": 20,
      "detachment": "Subversion Assets",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-captain-in-phobos-armour",
            "unit-librarian-in-phobos-armour",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-shroud-field",
      "detachmentId": "subversion-assets",
      "id": "enhancement-shroud-field",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        5
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          5
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-armoured-commander",
      "title": "Armoured Commander",
      "text": "Adeptus Astartes model only. Once per turn, in your Movement phase, the bearer can use this Enhancement. If it does, select one friendly Adeptus Astartes Transport that is in Strategic Reserves. Until the end of the phase, for the purposes of setting up that Transport on the battlefield, treat the current battle round number as being one higher than it actually is.",
      "value": 25,
      "detachment": "Armoured Speartip",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-armoured-commander",
      "detachmentId": "armoured-speartip",
      "id": "enhancement-armoured-commander",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        6
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          6
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-liberator",
      "title": "Liberator",
      "text": "Adeptus Astartes model only. If you control an objective marker at the end of your Command phase, and the bearer’s unit (or any Heavy Transport it is embarked within) is within range of that objective marker, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.",
      "value": 15,
      "detachment": "Armoured Speartip",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-liberator",
      "detachmentId": "armoured-speartip",
      "id": "enhancement-liberator",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        6
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          6
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-shock-deployment",
      "title": "Shock Deployment",
      "text": "Adeptus Astartes Terminator or Gravis model only. In your Shooting phase, each time the bearer’s unit is selected to shoot, if it disembarked from a Transport this turn, until the end of the phase, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
      "value": 20,
      "detachment": "Armoured Speartip",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient-in-terminator-armor",
            "unit-apothecary-biologis",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-terminator-armour",
            "unit-chaplain-in-terminator-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-shock-deployment",
      "detachmentId": "armoured-speartip",
      "id": "enhancement-shock-deployment",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        6
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          6
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-tip-of-the-spear",
      "title": "Tip of the Spear",
      "text": "Adeptus Astartes model only. If the bearer starts the battle embarked within a Transport , that Transport has the Scouts 6\" ability.",
      "value": 40,
      "detachment": "Armoured Speartip",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-tip-of-the-spear",
      "detachmentId": "armoured-speartip",
      "id": "enhancement-tip-of-the-spear",
      "kind": "Enhancement",
      "points": 40,
      "sourcePages": [
        6
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          6
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-astartes-tank-ace-aura",
      "title": "Astartes Tank Ace",
      "text": "Adeptus Astartes Vehicle model only. In your Shooting phase, while a friendly Adeptus Astartes Vehicle unit is within 6\" of the bearer, ranged weapons equipped by models in that unit have the [ASSAULT] ability.",
      "value": 40,
      "detachment": "Headhunter Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-firestrike-servo-turrets",
            "unit-gladiator-lancer",
            "unit-gladiator-reaper",
            "unit-gladiator-valiant",
            "unit-impulsor",
            "unit-land-raider",
            "unit-land-raider-crusader",
            "unit-land-raider-redeemer",
            "unit-predator-annihilator",
            "unit-predator-destructor",
            "unit-razorback",
            "unit-repulsor",
            "unit-repulsor-executioner",
            "unit-rhino",
            "unit-vindicator",
            "unit-whirlwind"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-astartes-tank-ace-aura",
      "detachmentId": "headhunter-task-force",
      "id": "enhancement-astartes-tank-ace-aura",
      "kind": "Enhancement",
      "points": 40,
      "sourcePages": [
        8
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          8
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-firestorm-coordinators",
      "title": "Firestorm Coordinators",
      "text": "Adeptus Astartes Vehicle model only. Ranged weapons equipped by the bearer have the [SUSTAINED HITS 1] ability.",
      "value": 20,
      "detachment": "Headhunter Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-firestrike-servo-turrets",
            "unit-gladiator-lancer",
            "unit-gladiator-reaper",
            "unit-gladiator-valiant",
            "unit-impulsor",
            "unit-land-raider",
            "unit-land-raider-crusader",
            "unit-land-raider-redeemer",
            "unit-predator-annihilator",
            "unit-predator-destructor",
            "unit-razorback",
            "unit-repulsor",
            "unit-repulsor-executioner",
            "unit-rhino",
            "unit-vindicator",
            "unit-whirlwind"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-firestorm-coordinators",
      "detachmentId": "headhunter-task-force",
      "id": "enhancement-firestorm-coordinators",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        8
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          8
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-gunnery-honours",
      "title": "Gunnery Honours",
      "text": "Adeptus Astartes Vehicle model only. Once per phase, you can re‑roll one Hit roll, one Wound roll and one Damage roll for the bearer.",
      "value": 20,
      "detachment": "Headhunter Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-firestrike-servo-turrets",
            "unit-gladiator-lancer",
            "unit-gladiator-reaper",
            "unit-gladiator-valiant",
            "unit-impulsor",
            "unit-land-raider",
            "unit-land-raider-crusader",
            "unit-land-raider-redeemer",
            "unit-predator-annihilator",
            "unit-predator-destructor",
            "unit-razorback",
            "unit-repulsor",
            "unit-repulsor-executioner",
            "unit-rhino",
            "unit-vindicator",
            "unit-whirlwind"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-gunnery-honours",
      "detachmentId": "headhunter-task-force",
      "id": "enhancement-gunnery-honours",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        8
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          8
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-redoubtable-machine-spirit",
      "title": "Redoubtable Machine Spirit",
      "text": "Adeptus Astartes Vehicle model only. The bearer has a 5+ invulnerable save and, at the end of your Command phase, the bearer regains 1 lost wound.",
      "value": 25,
      "detachment": "Headhunter Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-firestrike-servo-turrets",
            "unit-gladiator-lancer",
            "unit-gladiator-reaper",
            "unit-gladiator-valiant",
            "unit-impulsor",
            "unit-land-raider",
            "unit-land-raider-crusader",
            "unit-land-raider-redeemer",
            "unit-predator-annihilator",
            "unit-predator-destructor",
            "unit-razorback",
            "unit-repulsor",
            "unit-repulsor-executioner",
            "unit-rhino",
            "unit-vindicator",
            "unit-whirlwind"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-redoubtable-machine-spirit",
      "detachmentId": "headhunter-task-force",
      "id": "enhancement-redoubtable-machine-spirit",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        8
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          8
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-castellum-omnivox",
      "title": "Castellum Omnivox",
      "text": "Adeptus Astartes model only. Each time the bearer’s unit makes a Fall Back move, select one of the following to apply to that unit until the end of the turn: ■ That unit is eligible to perform an Action in a turn in which it Fell Back. ■ That unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
      "value": 20,
      "detachment": "Ceramite Sentinels",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-castellum-omnivox",
      "detachmentId": "ceramite-sentinels",
      "id": "enhancement-castellum-omnivox",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        10
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          10
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-defensive-mastery",
      "title": "Defensive Mastery",
      "text": "Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "value": 25,
      "detachment": "Ceramite Sentinels",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-defensive-mastery",
      "detachmentId": "ceramite-sentinels",
      "id": "enhancement-defensive-mastery",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        10
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          10
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-honour-indefatigable",
      "title": "Honour Indefatigable",
      "text": "Gravis model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.",
      "value": 25,
      "detachment": "Ceramite Sentinels",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-apothecary-biologis",
            "unit-captain-in-gravis-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-honour-indefatigable",
      "detachmentId": "ceramite-sentinels",
      "id": "enhancement-honour-indefatigable",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        10
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          10
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-spy-skull-data-link",
      "title": "Spy-skull Data Link",
      "text": "Adeptus Astartes model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability.",
      "value": 15,
      "detachment": "CERAMITE SENTINELS",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": []
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-spy-skull-data-link",
      "detachmentId": "ceramite-sentinels",
      "id": "enhancement-spy-skull-data-link",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        10
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          10
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-blades-of-valour",
      "title": "Blades of Valour",
      "text": "Adeptus Astartes model only. Improve the Armour Penetration characteristic of melee weapons equipped by the bearer and Battleline models in the bearer’s unit by 1.",
      "value": 15,
      "detachment": "Bastion Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-blades-of-valour",
      "detachmentId": "bastion-task-force",
      "id": "enhancement-blades-of-valour",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        24
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          24
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-bombast-omnivox",
      "title": "Bombast Omnivox",
      "text": "Adeptus Astartes model only. Each time you select the bearer’s unit as the target of a Stratagem, roll one D6, adding 1 if the bearer’s unit has the Battleline keyword: on a 4+, you gain 1CP .",
      "value": 15,
      "detachment": "Bastion Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-bombast-omnivox",
      "detachmentId": "bastion-task-force",
      "id": "enhancement-bombast-omnivox",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        24
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          24
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-eye-of-the-primarch",
      "title": "Eye of the Primarch",
      "text": "Adeptus Astartes model only. Ranged weapons equipped by the bearer and Battleline models in the bearer’s unit have the [PRECISION] ability.",
      "value": 10,
      "detachment": "Bastion Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-eye-of-the-primarch",
      "detachmentId": "bastion-task-force",
      "id": "enhancement-eye-of-the-primarch",
      "kind": "Enhancement",
      "points": 10,
      "sourcePages": [
        24
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          24
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-hero-of-the-chapter",
      "title": "Hero of the Chapter",
      "text": "Adeptus Astartes model only. While the bearer is leading a unit, the bearer has the Battleline keyword.",
      "value": 20,
      "detachment": "Bastion Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-hero-of-the-chapter",
      "detachmentId": "bastion-task-force",
      "id": "enhancement-hero-of-the-chapter",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        24
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          24
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-dedicated-gunship",
      "title": "Dedicated Gunship",
      "text": "Adeptus Astartes Terminator model only. Once per battle, at the end of your opponent’s Fight phase, if the bearer’s unit is not within Engagement Range of one or more enemy units, the bearer can use this Enhancement. If it does, remove the bearer’s unit from the battlefield and place it into Strategic Reserves.",
      "value": 15,
      "detachment": "Orbital Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient-in-terminator-armor",
            "unit-captain-in-terminator-armour",
            "unit-chaplain-in-terminator-armour",
            "unit-librarian-in-terminator-armour"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-dedicated-gunship",
      "detachmentId": "orbital-assault-force",
      "id": "enhancement-dedicated-gunship",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        26
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          26
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-laurels-of-thunder",
      "title": "Laurels of Thunder",
      "text": "Adeptus Astartes model only. You can re‑roll Charge rolls made for the bearer’s unit in a turn in which it was set up on the battlefield.",
      "value": 15,
      "detachment": "Orbital Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-laurels-of-thunder",
      "detachmentId": "orbital-assault-force",
      "id": "enhancement-laurels-of-thunder",
      "kind": "Enhancement",
      "points": 15,
      "sourcePages": [
        26
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          26
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-orbital-uplink-reliquary",
      "title": "Orbital Uplink Reliquary",
      "text": "Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "value": 25,
      "detachment": "Orbital Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-orbital-uplink-reliquary",
      "detachmentId": "orbital-assault-force",
      "id": "enhancement-orbital-uplink-reliquary",
      "kind": "Enhancement",
      "points": 25,
      "sourcePages": [
        26
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          26
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-veteran-of-the-vanguard",
      "title": "Veteran of the Vanguard",
      "text": "Adeptus Astartes model only. Models in the bearer’s unit have the Scouts 6\" ability.",
      "value": 20,
      "detachment": "Orbital Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-veteran-of-the-vanguard",
      "detachmentId": "orbital-assault-force",
      "id": "enhancement-veteran-of-the-vanguard",
      "kind": "Enhancement",
      "points": 20,
      "sourcePages": [
        26
      ],
      "provenance": {
        "sourceId": "space-marines-faction-pack-v1.1",
        "sourcePages": [
          26
        ]
      },
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-the-imperiums-sword",
      "title": "The Imperium’s Sword",
      "text": "ADEPTUS ASTARTES model only. Add 1 to the Attacks characteristic of the bearers melee weapons. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by all other models in the bearer’s unit as well.",
      "value": 25,
      "detachment": "1ST COMPANY TASK FORCE",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-the-imperiums-sword",
      "detachmentId": "1st-company-task-force",
      "id": "enhancement-the-imperiums-sword",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "1st-company-task-force-fear-made-manifest-aura",
      "title": "FEAR MADE MANIFEST (AURA)",
      "text": "ADEPTUS ASTARTES model only. While an enemy unit (excluding MONSTERS and VEHICLES) is within 6\" of the bearer, each time that unit fails a Battle-shock test, one model in that unit is destroyed (chosen by its controlling player). Once per battle, when such an enemy unit fails a Battle-shock test, you can choose for D3 models in that unit to be destroyed in this way instead.",
      "value": 30,
      "detachment": "1st Company Task Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "1st-company-task-force-fear-made-manifest-aura",
      "detachmentId": "1st-company-task-force",
      "id": "1st-company-task-force-fear-made-manifest-aura",
      "sourceAuthority": "secondary",
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-rites-of-war",
      "title": "Rites of War",
      "text": "ADEPTUS ASTARTES TERMINATOR model only. Improve the Objective Control characteristic of the bearer by 1. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Objective Control characteristic of all other models in the bearer’s unit as well.",
      "value": 10,
      "detachment": "1st Company Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-rites-of-war",
      "detachmentId": "1st-company-task-force",
      "id": "enhancement-rites-of-war",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-iron-resolve",
      "title": "Iron Resolve",
      "text": "ADEPTUS ASTARTES TERMINATOR model only. The bearer has the Feel No Pain 5+ ability. Once per battle, after the bearer’s unit is selected as the target of one or more attacks, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Feel No Pain 5+ ability.",
      "value": 15,
      "detachment": "1st Company Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-iron-resolve",
      "detachmentId": "1st-company-task-force",
      "id": "enhancement-iron-resolve",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-indomitable-fury",
      "title": "Indomitable Fury",
      "text": "GRAVIS model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.",
      "value": 20,
      "detachment": "Anvil Siege Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-indomitable-fury",
      "detachmentId": "anvil-siege-force",
      "id": "enhancement-indomitable-fury",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-fleet-commander",
      "title": "Fleet Commander",
      "text": "CAPTAIN model only. Once per battle, at the start of your Shooting phase, you can select one point on the battlefield and place a marker on that point. At the start of your next Shooting phase, place another marker on the battlefield within 12\" of the centre of the first marker, then draw a straight line between the centre of each of these markers. Roll one D6 for each unit that line passes over or through: on a 3+, that unit suffers D3 mortal wounds. Both markers are then removed.",
      "value": 15,
      "detachment": "Anvil Siege Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-fleet-commander",
      "detachmentId": "anvil-siege-force",
      "id": "enhancement-fleet-commander",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-stoic-defender",
      "title": "Stoic Defender",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 6+ ability while they are within range of an objective marker you control and, while that unit is Battle-shocked, halve the Objective Control characteristic of models in that unit instead of changing it to 0.",
      "value": 15,
      "detachment": "Anvil Siege Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-stoic-defender",
      "detachmentId": "anvil-siege-force",
      "id": "enhancement-stoic-defender",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-architect-of-war",
      "title": "Architect of War",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability.",
      "value": 25,
      "detachment": "Anvil Siege Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-architect-of-war",
      "detachmentId": "anvil-siege-force",
      "id": "enhancement-architect-of-war",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-champion-of-humanity",
      "title": "Champion of Humanity",
      "text": "TACTICUS model only. While the bearer is leading a unit, models in that unit can ignore any or all modifiers to their characteristics and/or to any roll or test made for them (excluding modifiers to saving throws).",
      "value": 10,
      "detachment": "Firestorm Assault Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-champion-of-humanity",
      "detachmentId": "firestorm-assault-force",
      "id": "enhancement-champion-of-humanity",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-war-tempered-artifice",
      "title": "War-tempered Artifice",
      "text": "ADEPTUS ASTARTES INFANTRY model only. Add 3 to the Strength characteristic of the bearer’s melee weapons.",
      "value": 25,
      "detachment": "Firestorm Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-war-tempered-artifice",
      "detachmentId": "firestorm-assault-force",
      "id": "enhancement-war-tempered-artifice",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-forged-in-battle",
      "title": "Forged in Battle",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, once per turn, after making a Hit roll or a saving throw for a model in that unit, you can change the result of that roll to an unmodified 6.",
      "value": 15,
      "detachment": "Firestorm Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-forged-in-battle",
      "detachmentId": "firestorm-assault-force",
      "id": "enhancement-forged-in-battle",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-adamantine-mantle",
      "title": "Adamantine Mantle",
      "text": "ADEPTUS ASTARTES model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made with a Melta or Torrent weapon, change the Damage characteristic of that attack to 1 instead.",
      "value": 20,
      "detachment": "Firestorm Assault Force",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-ancient",
            "unit-ancient-in-terminator-armor",
            "unit-apothecary",
            "unit-apothecary-biologis",
            "unit-bladeguard-ancient",
            "unit-captain",
            "unit-captain-in-gravis-armour",
            "unit-captain-in-phobos-armour",
            "unit-captain-in-terminator-armour",
            "unit-captain-with-jump-pack",
            "unit-chaplain",
            "unit-chaplain-in-terminator-armour",
            "unit-chaplain-on-bike",
            "unit-chaplain-with-jump-pack",
            "unit-judiciar",
            "unit-librarian",
            "unit-librarian-in-phobos-armour",
            "unit-librarian-in-terminator-armour",
            "unit-lieutenant",
            "unit-lieutenant-in-phobos-armour",
            "unit-lieutenant-in-reiver-armour",
            "unit-lieutenant-with-combi-weapon",
            "unit-techmarine"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-adamantine-mantle",
      "detachmentId": "firestorm-assault-force",
      "id": "enhancement-adamantine-mantle",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-artificer-armour",
      "title": "Artificer Armour",
      "text": "ADEPTUS ASTARTES model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.",
      "value": 20,
      "detachment": "Gladius Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-artificer-armour",
      "detachmentId": "gladius-task-force",
      "id": "enhancement-artificer-armour",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-the-honour-vehement",
      "title": "The Honour Vehement",
      "text": "ADEPTUS ASTARTES model only. Add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons. While the bearer is under the effects of the Assault Doctrine, add 2 to the Attacks and Strength characteristics of the bearers melee weapons instead.",
      "value": 15,
      "detachment": "Gladius Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-the-honour-vehement",
      "detachmentId": "gladius-task-force",
      "id": "enhancement-the-honour-vehement",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-adept-of-the-codex",
      "title": "Adept of the Codex",
      "text": "CAPTAIN model only. At the start of your Command phase, if the bearer is on the battlefield, instead of selecting a Combat Doctrine to be active for your army, you can select the Tactical Doctrine. If you do, until the start of your next Command phase, that Combat Doctrine is active for the bearer’s unit only, even if you have already selected that Combat Doctrine to be active for your army this battle.",
      "value": 20,
      "detachment": "Gladius Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-adept-of-the-codex",
      "detachmentId": "gladius-task-force",
      "id": "enhancement-adept-of-the-codex",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-fire-discipline",
      "title": "Fire Discipline",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer’s unit is under the effects of the Devastator Doctrine, you can reroll Advance rolls made for that unit.",
      "value": 25,
      "detachment": "Gladius Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-fire-discipline",
      "detachmentId": "gladius-task-force",
      "id": "enhancement-fire-discipline",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-target-augury-web",
      "title": "Target Augury Web",
      "text": "TECHMARINE model only. In your Command phase, select one ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer. Until the start of your next Command phase, weapons equipped by that VEHICLE model have the [LETHAL HITS] ability.",
      "value": 30,
      "detachment": "Ironstorm Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-target-augury-web",
      "detachmentId": "ironstorm-spearhead",
      "id": "enhancement-target-augury-web",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-the-flesh-is-weak",
      "title": "The Flesh Is Weak",
      "text": "ADEPTUS ASTARTES model only. The bearer has the Feel No Pain 4+ ability.",
      "value": 20,
      "detachment": "Ironstorm Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-the-flesh-is-weak",
      "detachmentId": "ironstorm-spearhead",
      "id": "enhancement-the-flesh-is-weak",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-adept-of-the-omnissiah",
      "title": "Adept of the Omnissiah",
      "text": "TECHMARINE model only. Once per battle round, when a saving throw is failed for a friendly ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer, you can change the Damage characteristic of that attack to 0.",
      "value": 35,
      "detachment": "Ironstorm Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-adept-of-the-omnissiah",
      "detachmentId": "ironstorm-spearhead",
      "id": "enhancement-adept-of-the-omnissiah",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-master-of-machine-war",
      "title": "Master of Machine War",
      "text": "ADEPTUS ASTARTES model only. In your Command phase, select one ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer. Until the start of your next Command phase, that VEHICLE is eligible to shoot even if it Fell Back or Advanced this turn.",
      "value": 20,
      "detachment": "IRONSTORM SPEARHEAD",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-master-of-machine-war",
      "detachmentId": "ironstorm-spearhead",
      "id": "enhancement-master-of-machine-war",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-fury-of-the-storm",
      "title": "Fury of the Storm",
      "text": "ADEPTUS ASTARTES MOUNTED model only. Improve the Strength and Armour Penetration characteristics of the bearer’s melee weapons by 1. Each time the bearer ends a Charge move, until the end of the turn, improve the Strength and Armour Penetration characteristics of the bearers melee weapons by 2 instead.",
      "value": 25,
      "detachment": "Stormlance Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-fury-of-the-storm",
      "detachmentId": "stormlance-task-force",
      "id": "enhancement-fury-of-the-storm",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-portents-of-wisdom",
      "title": "Portents of Wisdom",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit.",
      "value": 15,
      "detachment": "Stormlance Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-portents-of-wisdom",
      "detachmentId": "stormlance-task-force",
      "id": "enhancement-portents-of-wisdom",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-feinting-withdrawal",
      "title": "Feinting Withdrawal",
      "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, that unit is eligible to shoot in a turn in which it Fell Back.",
      "value": 10,
      "detachment": "Stormlance Task Force",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-feinting-withdrawal",
      "detachmentId": "stormlance-task-force",
      "id": "enhancement-feinting-withdrawal",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-hunters-instincts",
      "title": "Hunter’s Instincts",
      "text": "ADEPTUS ASTARTES MOUNTED model only. If the bearer’s unit is in Strategic Reserves, for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.",
      "value": 25,
      "detachment": "STORMLANCE TASK FORCE",
      "tags": [],
      "owner": {
        "subject": "model",
        "selector": {
          "unitIds": [
            "unit-chaplain-on-bike"
          ]
        }
      },
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "ruleId": "enhancement-hunters-instincts",
      "detachmentId": "stormlance-task-force",
      "id": "enhancement-hunters-instincts",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-the-blade-driven-deep",
      "title": "The Blade Driven Deep",
      "text": "ADEPTUS ASTARTES INFANTRY model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.",
      "value": 25,
      "detachment": "Vanguard Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-the-blade-driven-deep",
      "detachmentId": "vanguard-spearhead",
      "id": "enhancement-the-blade-driven-deep",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-ghostweave-cloak",
      "title": "Ghostweave Cloak",
      "text": "ADEPTUS ASTARTES model only. The bearer has the Stealth and Lone Operative abilities.",
      "value": 15,
      "detachment": "Vanguard Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-ghostweave-cloak",
      "detachmentId": "vanguard-spearhead",
      "id": "enhancement-ghostweave-cloak",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-execute-and-redeploy",
      "title": "Execute and Redeploy",
      "text": "PHOBOS model only. In your Shooting phase, after the bearer’s unit has shot, if that unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, that unit is not eligible to declare a charge. This cannot allow the bearer’s unit to move more than once in your Shooting phase.",
      "value": 20,
      "detachment": "Vanguard Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-execute-and-redeploy",
      "detachmentId": "vanguard-spearhead",
      "id": "enhancement-execute-and-redeploy",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    },
    {
      "legacyKey": "enhancement-shadow-war-veteran",
      "title": "Shadow War Veteran",
      "text": "PHOBOS model only. The bearer has the following ability: Lord of Deceit (Aura): Once per turn, when your opponent targets a unit from their army within 12\" of this model with a stratagem, you can use this ability. If you do increase the CP cost of that use of that stratagem by 1CP.",
      "value": 30,
      "detachment": "Vanguard Spearhead",
      "tags": [],
      "owner": null,
      "assignment": null,
      "ruleId": "enhancement-shadow-war-veteran",
      "detachmentId": "vanguard-spearhead",
      "id": "enhancement-shadow-war-veteran",
      "sourceAuthority": "secondary",
      "profile": null,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/space-marines",
        "verifiedAt": "2026-08-11"
      },
      "dependencyBook": "space-marines",
      "sourceBookId": "space-marines"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({
  "enhancement-prescient-flash": {
    "title": "Prescient Flash",
    "text": "A flash of foresight and clarity sings through this warrior’s blood and guides his steps into battle. Adeptus Astartes model only. Models in the bearer’s unit have the Scouts 6\" ability.",
    "value": 20,
    "detachment": "Angelic Inheritors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-prescient-flash",
    "detachmentId": "angelic-inheritors"
  },
  "enhancement-troubling-visions": {
    "title": "Troubling Visions",
    "text": "In the long run, these strange and intrusive visions of bloodshed bode terribly ill for this champion of the Blood Angels. In this instance, though, they bring him closer than ever to the glory of his gene‑sire. Adeptus Astartes model only. Once per battle, in your Command phase, the bearer can use this Enhancement. When it does, until the start of your next Command phase, all Angelic Legacy abilities (see left) are active for the bearer’s unit, instead of only two of them.",
    "value": 15,
    "detachment": "Angelic Inheritors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-troubling-visions",
    "detachmentId": "angelic-inheritors"
  },
  "enhancement-blazing-icon": {
    "title": "Blazing Icon",
    "text": "What was before merely a decorative blood drop pendant now shines with a seemingly miraculous light as bright as any star. The foe are forced to avert their gaze from its wrathful magnificence. Adeptus Astartes Infantry model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer’s unit.",
    "value": 20,
    "detachment": "Angelic Inheritors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-blazing-icon",
    "detachmentId": "angelic-inheritors"
  },
  "enhancement-ordained-sacrifice": {
    "title": "Ordained Sacrifice",
    "text": "Knowing only too well the desperate and vital nature of the battle before him, this scion of Sanguinius echoes his Primarch’s resolute determination to fight on even beyond what seems the doors of certain death. Adeptus Astartes model only. (Once per battle, per army) When this model is destroyed, at the end of the phase, roll one D6: ■ On a 2+, set up this model on the battlefield, unengaged and as close as possible to where it was destroyed. This model is not part of an attached unit and its unit has a starting strength of 1. This model has 3 wounds remaining.",
    "value": 25,
    "detachment": "Angelic Inheritors",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-ordained-sacrifice",
    "detachmentId": "angelic-inheritors"
  },
  "enhancement-angelic-executioner": {
    "title": "Angelic Executioner",
    "text": "This deadly duellist leads his battle‑brothers in masterful strikes capable of carving through their armoured or swarming foes with breathtaking fluidity. ADEPTUS ASTARTES JUMP PACK model only. When this unit is selected to fight, this unit’s melee attacks have: ▪ [LETHAL HITS]. ▪ Or: [SUSTAINED HITS 1].",
    "value": 25,
    "detachment": "Encarmine Speartip",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-angelic-executioner",
    "detachmentId": "encarmine-speartip"
  },
  "enhancement-shadow-of-abomination": {
    "title": "Shadow of Abomination",
    "text": "Granted a glimmer of foresight by his genetic inheritance, this Son of Sanguinius has identified a foe whose future is drenched in the blood of the Imperium. Such an enemy cannot be allowed to live. ADEPTUS ASTARTES JUMP PACK model only. (Once per battle, per army) When this unit is selected to fight you can use this ability. If you do, this model’s melee attacks have +1 D.",
    "value": 25,
    "detachment": "Encarmine Speartip",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-shadow-of-abomination",
    "detachmentId": "encarmine-speartip"
  },
  "enhancement-blood-boil": {
    "title": "Blood Boil",
    "text": "This psyker bears some of the most esoteric gifts granted by the blood of his Primarch, and his empyric powers surge with a vital potency capable of boiling the foe’s essence in their veins. ADEPTUS ASTARTES PSYKER model only. This model’s [PSYCHIC] attacks: ▪ Have [ANTI: non‑MONSTER/VEHICLE 5+]. ▪ Can re‑roll damage rolls.",
    "value": 10,
    "detachment": "Legacy of Grace",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-blood-boil",
    "detachmentId": "legacy-of-grace"
  },
  "enhancement-aureole-of-the-angel": {
    "title": "Aureole of the Angel",
    "text": "An echo of Sanguinius’ magnificence, this gilded halo casts an aura of shimmering and distorted energy spectra that thwarts attempts to pinpoint the bearer’s position. ADEPTUS ASTARTES model only. This unit has ‑3\" detection range.",
    "value": 20,
    "detachment": "Legacy of Grace",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-aureole-of-the-angel",
    "detachmentId": "legacy-of-grace"
  },
  "enhancement-gift-of-foresight": {
    "title": "Gift of Foresight",
    "text": "ADEPTUS ASTARTES model only. Once per battle round, just after making a Hit roll, a Wound roll or a saving throw for the bearer, you can treat the result as an unmodified roll of 6 instead.",
    "value": 15,
    "detachment": "Liberator Assault Group",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-gift-of-foresight",
    "detachmentId": "liberator-assault-group"
  },
  "enhancement-icon-of-the-angel": {
    "title": "Icon of the Angel",
    "text": "ADEPTUS ASTARTES model only. Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer's unit is selected to Fall Back, models in that enemy unit must take Desperate Escape tests as if their unit was Battle-shocked. If that enemy unit is also Battle-shocked, subtract 1 from each of those tests.",
    "value": 20,
    "detachment": "Liberator Assault Group",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-icon-of-the-angel",
    "detachmentId": "liberator-assault-group"
  },
  "enhancement-rage-fuelled-warrior": {
    "title": "Rage-fuelled Warrior",
    "text": "ADEPTUS ASTARTES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer's melee weapons have the [SUSTAINED HITS 3] ability.",
    "value": 35,
    "detachment": "Liberator Assault Group",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-rage-fuelled-warrior",
    "detachmentId": "liberator-assault-group"
  },
  "enhancement-speed-of-the-primarch": {
    "title": "Speed of the Primarch",
    "text": "ADEPTUS ASTARTES model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer's unit have the Fights First ability.",
    "value": 25,
    "detachment": "Liberator Assault Group",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-speed-of-the-primarch",
    "detachmentId": "liberator-assault-group"
  },
  "enhancement-carmine-reliquary": {
    "title": "Carmine Reliquary",
    "text": "This armoured casket contains the skull of a beloved Blood Angels Captain lost to the Black Rage. It is a potent talisman of unfaltering aggression. Chaplain model only. Models in the bearer’s unit have the Scouts 6\" ability. Each time you take a Battle‑shock test for an Adeptus Astartes unit within 6\" of the bearer, you can re‑roll the result.",
    "value": 30,
    "detachment": "Rage-cursed Onslaught",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-carmine-reliquary",
    "detachmentId": "rage-cursed-onslaught"
  },
  "enhancement-master-of-the-red-thirst": {
    "title": "Master of the Red Thirst",
    "text": "Long practice has allowed this champion to gain a modicum of focus and control over their Red Thirst – wisdom they pass on in the heat of battle. Adeptus Astartes model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Fights First ability.",
    "value": 25,
    "detachment": "Rage-cursed Onslaught",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-master-of-the-red-thirst",
    "detachmentId": "rage-cursed-onslaught"
  },
  "sanguinary-tear-aura": {
    "title": "Sanguinary Tear (Aura)",
    "text": "Legend has it that the blood‑red stone set into this relic houses a teardrop shed by the Primarch himself. Those lost to the Black Rage seem to fight all the more furiously in its presence. Adeptus Astartes model only. While a friendly Death Company unit is within 6\" of the bearer, add 1 to the Strength characteristic of weapons equipped by models in that unit.",
    "detachment": "Rage-cursed Onslaught",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "sanguinary-tear-aura",
    "detachmentId": "rage-cursed-onslaught"
  },
  "enhancement-angels-fang": {
    "title": "Angel's Fang",
    "text": "This artificer ‑crafted weapon has a dark reputation amongst the Chapter. Yet none can deny its lethality, or its machine‑spirit’s desire to drink the blood of the mightiest foes. Adeptus Astartes model only. Each time the bearer makes a melee attack that targets a Character, Monster or Vehicle unit, that attack has the [SUSTAINED HITS 2] ability.",
    "value": 25,
    "detachment": "Rage-cursed Onslaught",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-angels-fang",
    "detachmentId": "rage-cursed-onslaught"
  },
  "enhancement-archangels-shard": {
    "title": "Archangel's Shard",
    "text": "ADEPTUS ASTARTES JUMP PACK model only. The bearer's melee weapons have [ANTI-CHAOS 5+] and [LANCE].",
    "value": 15,
    "detachment": "The Angelic Host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-archangels-shard",
    "detachmentId": "the-angelic-host"
  },
  "enhancement-artisan-of-war": {
    "title": "Artisan of War",
    "text": "ADEPTUS ASTARTES JUMP PACK model only. Improve the Armour Penetration characteristic of the bearer's weapons by 1, and the bearer has a Save characteristic of 2+.",
    "value": 20,
    "detachment": "The Angelic Host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-artisan-of-war",
    "detachmentId": "the-angelic-host"
  },
  "enhancement-gleaming-pinions": {
    "title": "Gleaming Pinions",
    "text": "ADEPTUS ASTARTES JUMP PACK model only. In your opponent's Movement phase, if an enemy unit ends a move within 8\\\" of this unit and this unit is unengaged, this unit can make a Normal move of up to 6\\\".",
    "value": 25,
    "detachment": "The Angelic Host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-gleaming-pinions",
    "detachmentId": "the-angelic-host"
  },
  "enhancement-visage-of-death": {
    "title": "Visage of Death",
    "text": "ADEPTUS ASTARTES JUMP PACK model only. In the Battle-shock step of your opponent's Command phase, each enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer must take a Battle-shock test.",
    "value": 15,
    "detachment": "The Angelic Host",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-visage-of-death",
    "detachmentId": "the-angelic-host"
  },
  "enhancement-blood-shard": {
    "title": "Blood Shard",
    "text": "DEATH COMPANY model only. The first time the bearer is destroyed, at the end of the phase, roll one D6: on a 2+, set the bearer back up as close as possible to where it was destroyed and not within Engagement Range of enemy units, with 3 wounds remaining.",
    "value": 25,
    "detachment": "The Lost Brethren",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-blood-shard",
    "detachmentId": "the-lost-brethren"
  },
  "enhancement-sanguinius-grace": {
    "title": "Sanguinius' Grace",
    "text": "DEATH COMPANY model only. Once per battle, at the end of the Fight phase, if the bearer is within Engagement Range of three or more enemy models, the bearer can fight one additional time.",
    "value": 20,
    "detachment": "The Lost Brethren",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-sanguinius-grace",
    "detachmentId": "the-lost-brethren"
  },
  "enhancement-to-slay-the-warmaster": {
    "title": "To Slay The Warmaster",
    "text": "DEATH COMPANY model only. Once per battle, at the start of the Fight phase, if the bearer is within Engagement Range of an enemy CHARACTER unit, select one and roll six D6: for each 4+, one CHARACTER model in that unit suffers 1 mortal wound.",
    "value": 15,
    "detachment": "The Lost Brethren",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-to-slay-the-warmaster",
    "detachmentId": "the-lost-brethren"
  },
  "enhancement-vengeful-onslaught": {
    "title": "Vengeful Onslaught",
    "text": "DEATH COMPANY model only. If the bearer is destroyed, until the end of your next turn, each time a friendly DEATH COMPANY model makes an attack, add 1 to the Hit roll.",
    "value": 10,
    "detachment": "The Lost Brethren",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-vengeful-onslaught",
    "detachmentId": "the-lost-brethren"
  },
  "enhancement-instinctive-interception": {
    "title": "Instinctive Interception",
    "text": "Proudly is Sanguinius remembered for his rapid intercession in the protection of his gene‑sons. Driven on by deathly visions, this lost warrior is a tragic monument to such glory. DEATH COMPANY model only. When you target this unit with the Heroic Intervention stratagem, that use is ‑1 CP.",
    "value": 10,
    "detachment": "Wrath of the Doomed",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-instinctive-interception",
    "detachmentId": "wrath-of-the-doomed"
  },
  "enhancement-on-the-archtraitors-bridge": {
    "title": "On the Archtraitor's Bridge",
    "text": "Lost to a memory shard of the Primarch, in this warrior’s mind, he has entered the Archtraitor’s sanctum, and all that stands between him and Horus is a host of massing traitors. DEATH COMPANY model only. This model’s melee attacks have +2 A.",
    "value": 20,
    "detachment": "Wrath of the Doomed",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-on-the-archtraitors-bridge",
    "detachmentId": "wrath-of-the-doomed"
  },
  "enhancement-avenging-angel": {
    "title": "Avenging Angel",
    "text": "ADEPTUS ASTARTES FLY INFANTRY model only. When this unit ends an ingress move, select up to one enemy unit within 9\" of this unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.",
    "value": 20,
    "detachment": "Vengeful Hosts",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-captain-with-jump-pack",
          "unit-chaplain-with-jump-pack"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-avenging-angel",
    "detachmentId": "vengeful-hosts"
  },
  "enhancement-orksbane": {
    "title": "Orksbane",
    "text": "ADEPTUS ASTARTES FLY INFANTRY model only. This model has the following weapon: Orksbane [CLEAVE 2] RANGE A WS S AP D Melee 4 2+ 8 -2",
    "value": 20,
    "detachment": "Vengeful Hosts",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-captain-with-jump-pack",
          "unit-chaplain-with-jump-pack"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-orksbane",
    "detachmentId": "vengeful-hosts"
  },
  "enhancement-bellicose-weapon-spirits": {
    "title": "Bellicose Weapon Spirits (Upgrade)",
    "text": "SPEEDER unit only. This unit can re-roll: ▪ Damage rolls. ▪ Rolls to determine the A of a weapon.",
    "value": 15,
    "detachment": "Fulguris Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-land-speeder",
          "unit-storm-speeder-hailstrike",
          "unit-storm-speeder-hammerstrike",
          "unit-storm-speeder-thunderstrike"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-bellicose-weapon-spirits",
    "detachmentId": "fulguris-task-force"
  },
  "enhancement-raptorial-cogitator-core": {
    "title": "Raptorial Cogitator Core (Upgrade)",
    "text": "SPEEDER unit only. This unit’s ranged attacks have [IGNORES COVER].",
    "value": 15,
    "detachment": "Fulguris Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-land-speeder",
          "unit-storm-speeder-hailstrike",
          "unit-storm-speeder-hammerstrike",
          "unit-storm-speeder-thunderstrike"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-raptorial-cogitator-core",
    "detachmentId": "fulguris-task-force"
  },
  "enhancement-celerity": {
    "title": "Celerity",
    "text": "ADEPTUS ASTARTES PSYKER model only. ▪ When this unit is selected to make an advance move, that move does not prevent this unit from being eligible to declare a charge. ▪ When this unit is selected to make a fall-back move, if this unit has the Biomancy Discipline ability, that move does not prevent this unit from being eligible to declare a charge.",
    "value": 35,
    "detachment": "Librarius Conclave",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-celerity",
    "detachmentId": "librarius-conclave"
  },
  "enhancement-fusillade": {
    "title": "Fusillade",
    "text": "ADEPTUS ASTARTES PSYKER model only. This unit’s ranged attacks have: ▪ [LETHAL HITS] ▪ If this unit has the Pyromancy Discipline ability, [SUSTAINED HITS 1].",
    "value": 25,
    "detachment": "Librarius Conclave",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-fusillade",
    "detachmentId": "librarius-conclave"
  },
  "enhancement-obfuscation": {
    "title": "Obfuscation",
    "text": "ADEPTUS ASTARTES PSYKER model only. ▪ Enemy units cannot target this unit with snap shooting attacks. ▪ If this unit has the Telepathy Discipline ability, this unit has -3\" detection range.",
    "value": 25,
    "detachment": "Librarius Conclave",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-obfuscation",
    "detachmentId": "librarius-conclave"
  },
  "enhancement-prescience": {
    "title": "Prescience",
    "text": "ADEPTUS ASTARTES PSYKER model only (excluding TERMINATOR models). (Once per turn per unit) In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is unengaged, this unit can make a normal move of: ▪ Up to D6\". ▪ Or: If this unit has the Divination Discipline ability, up to 6\".",
    "value": 20,
    "detachment": "Librarius Conclave",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-librarian",
          "unit-librarian-in-phobos-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-prescience",
    "detachmentId": "librarius-conclave"
  },
  "enhancement-temporal-corridor": {
    "title": "Temporal Corridor",
    "text": "ADEPTUS ASTARTES PSYKER model only. ▪ If this unit has the Telekinesis Discipline ability, this unit has Deep Strike. ▪ At the end of your opponent’s Fight phase, if this unit is unengaged, you can use this ability. If you do: ▫ Place this unit in strategic reserves. ▫ This unit can make an ingress move in your next Movement phase (including in your first turn).",
    "value": 25,
    "detachment": "Librarius Conclave",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-temporal-corridor",
    "detachmentId": "librarius-conclave"
  },
  "enhancement-death-in-the-dark": {
    "title": "Death in the Dark (Upgrade)",
    "text": "INFANTRY PHOBOS unit only. This unit’s attacks that target a hidden unit have +1 to hit rolls.",
    "value": 15,
    "detachment": "Subversion Assets",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-captain-in-phobos-armour",
          "unit-eliminator-squad",
          "unit-incursor-squad",
          "unit-infiltrator-squad",
          "unit-librarian-in-phobos-armour",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-reiver-squad"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-death-in-the-dark",
    "detachmentId": "subversion-assets"
  },
  "enhancement-shroud-field": {
    "title": "Shroud Field",
    "text": "PHOBOS model only. This model has: ▪ Lone Operative. ▪ Stealth.",
    "value": 20,
    "detachment": "Subversion Assets",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-captain-in-phobos-armour",
          "unit-librarian-in-phobos-armour",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-shroud-field",
    "detachmentId": "subversion-assets"
  },
  "enhancement-armoured-commander": {
    "title": "Armoured Commander",
    "text": "Adeptus Astartes model only. Once per turn, in your Movement phase, the bearer can use this Enhancement. If it does, select one friendly Adeptus Astartes Transport that is in Strategic Reserves. Until the end of the phase, for the purposes of setting up that Transport on the battlefield, treat the current battle round number as being one higher than it actually is.",
    "value": 25,
    "detachment": "Armoured Speartip",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-armoured-commander",
    "detachmentId": "armoured-speartip"
  },
  "enhancement-liberator": {
    "title": "Liberator",
    "text": "Adeptus Astartes model only. If you control an objective marker at the end of your Command phase, and the bearer’s unit (or any Heavy Transport it is embarked within) is within range of that objective marker, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.",
    "value": 15,
    "detachment": "Armoured Speartip",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-liberator",
    "detachmentId": "armoured-speartip"
  },
  "enhancement-shock-deployment": {
    "title": "Shock Deployment",
    "text": "Adeptus Astartes Terminator or Gravis model only. In your Shooting phase, each time the bearer’s unit is selected to shoot, if it disembarked from a Transport this turn, until the end of the phase, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
    "value": 20,
    "detachment": "Armoured Speartip",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient-in-terminator-armor",
          "unit-apothecary-biologis",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-terminator-armour",
          "unit-chaplain-in-terminator-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-shock-deployment",
    "detachmentId": "armoured-speartip"
  },
  "enhancement-tip-of-the-spear": {
    "title": "Tip of the Spear",
    "text": "Adeptus Astartes model only. If the bearer starts the battle embarked within a Transport , that Transport has the Scouts 6\" ability.",
    "value": 40,
    "detachment": "Armoured Speartip",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-tip-of-the-spear",
    "detachmentId": "armoured-speartip"
  },
  "enhancement-astartes-tank-ace-aura": {
    "title": "Astartes Tank Ace",
    "text": "Adeptus Astartes Vehicle model only. In your Shooting phase, while a friendly Adeptus Astartes Vehicle unit is within 6\" of the bearer, ranged weapons equipped by models in that unit have the [ASSAULT] ability.",
    "value": 40,
    "detachment": "Headhunter Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-firestrike-servo-turrets",
          "unit-gladiator-lancer",
          "unit-gladiator-reaper",
          "unit-gladiator-valiant",
          "unit-impulsor",
          "unit-land-raider",
          "unit-land-raider-crusader",
          "unit-land-raider-redeemer",
          "unit-predator-annihilator",
          "unit-predator-destructor",
          "unit-razorback",
          "unit-repulsor",
          "unit-repulsor-executioner",
          "unit-rhino",
          "unit-vindicator",
          "unit-whirlwind"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-astartes-tank-ace-aura",
    "detachmentId": "headhunter-task-force"
  },
  "enhancement-firestorm-coordinators": {
    "title": "Firestorm Coordinators",
    "text": "Adeptus Astartes Vehicle model only. Ranged weapons equipped by the bearer have the [SUSTAINED HITS 1] ability.",
    "value": 20,
    "detachment": "Headhunter Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-firestrike-servo-turrets",
          "unit-gladiator-lancer",
          "unit-gladiator-reaper",
          "unit-gladiator-valiant",
          "unit-impulsor",
          "unit-land-raider",
          "unit-land-raider-crusader",
          "unit-land-raider-redeemer",
          "unit-predator-annihilator",
          "unit-predator-destructor",
          "unit-razorback",
          "unit-repulsor",
          "unit-repulsor-executioner",
          "unit-rhino",
          "unit-vindicator",
          "unit-whirlwind"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-firestorm-coordinators",
    "detachmentId": "headhunter-task-force"
  },
  "enhancement-gunnery-honours": {
    "title": "Gunnery Honours",
    "text": "Adeptus Astartes Vehicle model only. Once per phase, you can re‑roll one Hit roll, one Wound roll and one Damage roll for the bearer.",
    "value": 20,
    "detachment": "Headhunter Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-firestrike-servo-turrets",
          "unit-gladiator-lancer",
          "unit-gladiator-reaper",
          "unit-gladiator-valiant",
          "unit-impulsor",
          "unit-land-raider",
          "unit-land-raider-crusader",
          "unit-land-raider-redeemer",
          "unit-predator-annihilator",
          "unit-predator-destructor",
          "unit-razorback",
          "unit-repulsor",
          "unit-repulsor-executioner",
          "unit-rhino",
          "unit-vindicator",
          "unit-whirlwind"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-gunnery-honours",
    "detachmentId": "headhunter-task-force"
  },
  "enhancement-redoubtable-machine-spirit": {
    "title": "Redoubtable Machine Spirit",
    "text": "Adeptus Astartes Vehicle model only. The bearer has a 5+ invulnerable save and, at the end of your Command phase, the bearer regains 1 lost wound.",
    "value": 25,
    "detachment": "Headhunter Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-firestrike-servo-turrets",
          "unit-gladiator-lancer",
          "unit-gladiator-reaper",
          "unit-gladiator-valiant",
          "unit-impulsor",
          "unit-land-raider",
          "unit-land-raider-crusader",
          "unit-land-raider-redeemer",
          "unit-predator-annihilator",
          "unit-predator-destructor",
          "unit-razorback",
          "unit-repulsor",
          "unit-repulsor-executioner",
          "unit-rhino",
          "unit-vindicator",
          "unit-whirlwind"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-redoubtable-machine-spirit",
    "detachmentId": "headhunter-task-force"
  },
  "enhancement-castellum-omnivox": {
    "title": "Castellum Omnivox",
    "text": "Adeptus Astartes model only. Each time the bearer’s unit makes a Fall Back move, select one of the following to apply to that unit until the end of the turn: ■ That unit is eligible to perform an Action in a turn in which it Fell Back. ■ That unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
    "value": 20,
    "detachment": "Ceramite Sentinels",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-castellum-omnivox",
    "detachmentId": "ceramite-sentinels"
  },
  "enhancement-defensive-mastery": {
    "title": "Defensive Mastery",
    "text": "Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
    "value": 25,
    "detachment": "Ceramite Sentinels",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-defensive-mastery",
    "detachmentId": "ceramite-sentinels"
  },
  "enhancement-honour-indefatigable": {
    "title": "Honour Indefatigable",
    "text": "Gravis model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.",
    "value": 25,
    "detachment": "Ceramite Sentinels",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-apothecary-biologis",
          "unit-captain-in-gravis-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-honour-indefatigable",
    "detachmentId": "ceramite-sentinels"
  },
  "enhancement-spy-skull-data-link": {
    "title": "Spy-skull Data Link",
    "text": "Adeptus Astartes model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability.",
    "value": 15,
    "detachment": "Ceramite Sentinels",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": []
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-spy-skull-data-link",
    "detachmentId": "ceramite-sentinels"
  },
  "enhancement-blades-of-valour": {
    "title": "Blades of Valour",
    "text": "Adeptus Astartes model only. Improve the Armour Penetration characteristic of melee weapons equipped by the bearer and Battleline models in the bearer’s unit by 1.",
    "value": 15,
    "detachment": "Bastion Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-blades-of-valour",
    "detachmentId": "bastion-task-force"
  },
  "enhancement-bombast-omnivox": {
    "title": "Bombast Omnivox",
    "text": "Adeptus Astartes model only. Each time you select the bearer’s unit as the target of a Stratagem, roll one D6, adding 1 if the bearer’s unit has the Battleline keyword: on a 4+, you gain 1CP .",
    "value": 15,
    "detachment": "Bastion Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-bombast-omnivox",
    "detachmentId": "bastion-task-force"
  },
  "enhancement-eye-of-the-primarch": {
    "title": "Eye of the Primarch",
    "text": "Adeptus Astartes model only. Ranged weapons equipped by the bearer and Battleline models in the bearer’s unit have the [PRECISION] ability.",
    "value": 10,
    "detachment": "Bastion Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-eye-of-the-primarch",
    "detachmentId": "bastion-task-force"
  },
  "enhancement-hero-of-the-chapter": {
    "title": "Hero of the Chapter",
    "text": "Adeptus Astartes model only. While the bearer is leading a unit, the bearer has the Battleline keyword.",
    "value": 20,
    "detachment": "Bastion Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-hero-of-the-chapter",
    "detachmentId": "bastion-task-force"
  },
  "enhancement-dedicated-gunship": {
    "title": "Dedicated Gunship",
    "text": "Adeptus Astartes Terminator model only. Once per battle, at the end of your opponent’s Fight phase, if the bearer’s unit is not within Engagement Range of one or more enemy units, the bearer can use this Enhancement. If it does, remove the bearer’s unit from the battlefield and place it into Strategic Reserves.",
    "value": 15,
    "detachment": "Orbital Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient-in-terminator-armor",
          "unit-captain-in-terminator-armour",
          "unit-chaplain-in-terminator-armour",
          "unit-librarian-in-terminator-armour"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-dedicated-gunship",
    "detachmentId": "orbital-assault-force"
  },
  "enhancement-laurels-of-thunder": {
    "title": "Laurels of Thunder",
    "text": "Adeptus Astartes model only. You can re‑roll Charge rolls made for the bearer’s unit in a turn in which it was set up on the battlefield.",
    "value": 15,
    "detachment": "Orbital Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-laurels-of-thunder",
    "detachmentId": "orbital-assault-force"
  },
  "enhancement-orbital-uplink-reliquary": {
    "title": "Orbital Uplink Reliquary",
    "text": "Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
    "value": 25,
    "detachment": "Orbital Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-orbital-uplink-reliquary",
    "detachmentId": "orbital-assault-force"
  },
  "enhancement-veteran-of-the-vanguard": {
    "title": "Veteran of the Vanguard",
    "text": "Adeptus Astartes model only. Models in the bearer’s unit have the Scouts 6\" ability.",
    "value": 20,
    "detachment": "Orbital Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-veteran-of-the-vanguard",
    "detachmentId": "orbital-assault-force"
  },
  "enhancement-the-imperiums-sword": {
    "title": "The Imperium’s Sword",
    "text": "ADEPTUS ASTARTES model only. Add 1 to the Attacks characteristic of the bearers melee weapons. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by all other models in the bearer’s unit as well.",
    "value": 25,
    "detachment": "1st Company Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-the-imperiums-sword",
    "detachmentId": "1st-company-task-force"
  },
  "1st-company-task-force-fear-made-manifest-aura": {
    "title": "FEAR MADE MANIFEST (AURA)",
    "text": "ADEPTUS ASTARTES model only. While an enemy unit (excluding MONSTERS and VEHICLES) is within 6\" of the bearer, each time that unit fails a Battle-shock test, one model in that unit is destroyed (chosen by its controlling player). Once per battle, when such an enemy unit fails a Battle-shock test, you can choose for D3 models in that unit to be destroyed in this way instead.",
    "value": 30,
    "detachment": "1st Company Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "1st-company-task-force-fear-made-manifest-aura",
    "detachmentId": "1st-company-task-force"
  },
  "enhancement-rites-of-war": {
    "title": "Rites of War",
    "text": "ADEPTUS ASTARTES TERMINATOR model only. Improve the Objective Control characteristic of the bearer by 1. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Objective Control characteristic of all other models in the bearer’s unit as well.",
    "value": 10,
    "detachment": "1st Company Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-rites-of-war",
    "detachmentId": "1st-company-task-force"
  },
  "enhancement-iron-resolve": {
    "title": "Iron Resolve",
    "text": "ADEPTUS ASTARTES TERMINATOR model only. The bearer has the Feel No Pain 5+ ability. Once per battle, after the bearer’s unit is selected as the target of one or more attacks, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer’s unit have the Feel No Pain 5+ ability.",
    "value": 15,
    "detachment": "1st Company Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-iron-resolve",
    "detachmentId": "1st-company-task-force"
  },
  "enhancement-indomitable-fury": {
    "title": "Indomitable Fury",
    "text": "GRAVIS model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.",
    "value": 20,
    "detachment": "Anvil Siege Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-indomitable-fury",
    "detachmentId": "anvil-siege-force"
  },
  "enhancement-fleet-commander": {
    "title": "Fleet Commander",
    "text": "CAPTAIN model only. Once per battle, at the start of your Shooting phase, you can select one point on the battlefield and place a marker on that point. At the start of your next Shooting phase, place another marker on the battlefield within 12\" of the centre of the first marker, then draw a straight line between the centre of each of these markers. Roll one D6 for each unit that line passes over or through: on a 3+, that unit suffers D3 mortal wounds. Both markers are then removed.",
    "value": 15,
    "detachment": "Anvil Siege Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-fleet-commander",
    "detachmentId": "anvil-siege-force"
  },
  "enhancement-stoic-defender": {
    "title": "Stoic Defender",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 6+ ability while they are within range of an objective marker you control and, while that unit is Battle-shocked, halve the Objective Control characteristic of models in that unit instead of changing it to 0.",
    "value": 15,
    "detachment": "Anvil Siege Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-stoic-defender",
    "detachmentId": "anvil-siege-force"
  },
  "enhancement-architect-of-war": {
    "title": "Architect of War",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability.",
    "value": 25,
    "detachment": "Anvil Siege Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-architect-of-war",
    "detachmentId": "anvil-siege-force"
  },
  "enhancement-champion-of-humanity": {
    "title": "Champion of Humanity",
    "text": "TACTICUS model only. While the bearer is leading a unit, models in that unit can ignore any or all modifiers to their characteristics and/or to any roll or test made for them (excluding modifiers to saving throws).",
    "value": 10,
    "detachment": "Firestorm Assault Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-champion-of-humanity",
    "detachmentId": "firestorm-assault-force"
  },
  "enhancement-war-tempered-artifice": {
    "title": "War-tempered Artifice",
    "text": "ADEPTUS ASTARTES INFANTRY model only. Add 3 to the Strength characteristic of the bearer’s melee weapons.",
    "value": 25,
    "detachment": "Firestorm Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-war-tempered-artifice",
    "detachmentId": "firestorm-assault-force"
  },
  "enhancement-forged-in-battle": {
    "title": "Forged in Battle",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, once per turn, after making a Hit roll or a saving throw for a model in that unit, you can change the result of that roll to an unmodified 6.",
    "value": 15,
    "detachment": "Firestorm Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-forged-in-battle",
    "detachmentId": "firestorm-assault-force"
  },
  "enhancement-adamantine-mantle": {
    "title": "Adamantine Mantle",
    "text": "ADEPTUS ASTARTES model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made with a Melta or Torrent weapon, change the Damage characteristic of that attack to 1 instead.",
    "value": 20,
    "detachment": "Firestorm Assault Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-ancient",
          "unit-ancient-in-terminator-armor",
          "unit-apothecary",
          "unit-apothecary-biologis",
          "unit-bladeguard-ancient",
          "unit-captain",
          "unit-captain-in-gravis-armour",
          "unit-captain-in-phobos-armour",
          "unit-captain-in-terminator-armour",
          "unit-captain-with-jump-pack",
          "unit-chaplain",
          "unit-chaplain-in-terminator-armour",
          "unit-chaplain-on-bike",
          "unit-chaplain-with-jump-pack",
          "unit-judiciar",
          "unit-librarian",
          "unit-librarian-in-phobos-armour",
          "unit-librarian-in-terminator-armour",
          "unit-lieutenant",
          "unit-lieutenant-in-phobos-armour",
          "unit-lieutenant-in-reiver-armour",
          "unit-lieutenant-with-combi-weapon",
          "unit-techmarine"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-adamantine-mantle",
    "detachmentId": "firestorm-assault-force"
  },
  "enhancement-artificer-armour": {
    "title": "Artificer Armour",
    "text": "ADEPTUS ASTARTES model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.",
    "value": 20,
    "detachment": "Gladius Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-artificer-armour",
    "detachmentId": "gladius-task-force"
  },
  "enhancement-the-honour-vehement": {
    "title": "The Honour Vehement",
    "text": "ADEPTUS ASTARTES model only. Add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons. While the bearer is under the effects of the Assault Doctrine, add 2 to the Attacks and Strength characteristics of the bearers melee weapons instead.",
    "value": 15,
    "detachment": "Gladius Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-the-honour-vehement",
    "detachmentId": "gladius-task-force"
  },
  "enhancement-adept-of-the-codex": {
    "title": "Adept of the Codex",
    "text": "CAPTAIN model only. At the start of your Command phase, if the bearer is on the battlefield, instead of selecting a Combat Doctrine to be active for your army, you can select the Tactical Doctrine. If you do, until the start of your next Command phase, that Combat Doctrine is active for the bearer’s unit only, even if you have already selected that Combat Doctrine to be active for your army this battle.",
    "value": 20,
    "detachment": "Gladius Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-adept-of-the-codex",
    "detachmentId": "gladius-task-force"
  },
  "enhancement-fire-discipline": {
    "title": "Fire Discipline",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer’s unit is under the effects of the Devastator Doctrine, you can reroll Advance rolls made for that unit.",
    "value": 25,
    "detachment": "Gladius Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-fire-discipline",
    "detachmentId": "gladius-task-force"
  },
  "enhancement-target-augury-web": {
    "title": "Target Augury Web",
    "text": "TECHMARINE model only. In your Command phase, select one ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer. Until the start of your next Command phase, weapons equipped by that VEHICLE model have the [LETHAL HITS] ability.",
    "value": 30,
    "detachment": "Ironstorm Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-target-augury-web",
    "detachmentId": "ironstorm-spearhead"
  },
  "enhancement-the-flesh-is-weak": {
    "title": "The Flesh Is Weak",
    "text": "ADEPTUS ASTARTES model only. The bearer has the Feel No Pain 4+ ability.",
    "value": 20,
    "detachment": "Ironstorm Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-the-flesh-is-weak",
    "detachmentId": "ironstorm-spearhead"
  },
  "enhancement-adept-of-the-omnissiah": {
    "title": "Adept of the Omnissiah",
    "text": "TECHMARINE model only. Once per battle round, when a saving throw is failed for a friendly ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer, you can change the Damage characteristic of that attack to 0.",
    "value": 35,
    "detachment": "Ironstorm Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-adept-of-the-omnissiah",
    "detachmentId": "ironstorm-spearhead"
  },
  "enhancement-master-of-machine-war": {
    "title": "Master of Machine War",
    "text": "ADEPTUS ASTARTES model only. In your Command phase, select one ADEPTUS ASTARTES VEHICLE model within 6\" of the bearer. Until the start of your next Command phase, that VEHICLE is eligible to shoot even if it Fell Back or Advanced this turn.",
    "value": 20,
    "detachment": "Ironstorm Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-master-of-machine-war",
    "detachmentId": "ironstorm-spearhead"
  },
  "enhancement-fury-of-the-storm": {
    "title": "Fury of the Storm",
    "text": "ADEPTUS ASTARTES MOUNTED model only. Improve the Strength and Armour Penetration characteristics of the bearer’s melee weapons by 1. Each time the bearer ends a Charge move, until the end of the turn, improve the Strength and Armour Penetration characteristics of the bearers melee weapons by 2 instead.",
    "value": 25,
    "detachment": "Stormlance Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-fury-of-the-storm",
    "detachmentId": "stormlance-task-force"
  },
  "enhancement-portents-of-wisdom": {
    "title": "Portents of Wisdom",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit.",
    "value": 15,
    "detachment": "Stormlance Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-portents-of-wisdom",
    "detachmentId": "stormlance-task-force"
  },
  "enhancement-feinting-withdrawal": {
    "title": "Feinting Withdrawal",
    "text": "ADEPTUS ASTARTES model only. While the bearer is leading a unit, that unit is eligible to shoot in a turn in which it Fell Back.",
    "value": 10,
    "detachment": "Stormlance Task Force",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-feinting-withdrawal",
    "detachmentId": "stormlance-task-force"
  },
  "enhancement-hunters-instincts": {
    "title": "Hunter’s Instincts",
    "text": "ADEPTUS ASTARTES MOUNTED model only. If the bearer’s unit is in Strategic Reserves, for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.",
    "value": 25,
    "detachment": "Stormlance Task Force",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-chaplain-on-bike"
        ]
      }
    },
    "assignment": {
      "maxOwners": 1,
      "enhancementChoices": 1,
      "payPointsPerOwner": true
    },
    "ruleId": "enhancement-hunters-instincts",
    "detachmentId": "stormlance-task-force"
  },
  "enhancement-the-blade-driven-deep": {
    "title": "The Blade Driven Deep",
    "text": "ADEPTUS ASTARTES INFANTRY model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.",
    "value": 25,
    "detachment": "Vanguard Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-the-blade-driven-deep",
    "detachmentId": "vanguard-spearhead"
  },
  "enhancement-ghostweave-cloak": {
    "title": "Ghostweave Cloak",
    "text": "ADEPTUS ASTARTES model only. The bearer has the Stealth and Lone Operative abilities.",
    "value": 15,
    "detachment": "Vanguard Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-ghostweave-cloak",
    "detachmentId": "vanguard-spearhead"
  },
  "enhancement-execute-and-redeploy": {
    "title": "Execute and Redeploy",
    "text": "PHOBOS model only. In your Shooting phase, after the bearer’s unit has shot, if that unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, that unit is not eligible to declare a charge. This cannot allow the bearer’s unit to move more than once in your Shooting phase.",
    "value": 20,
    "detachment": "Vanguard Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-execute-and-redeploy",
    "detachmentId": "vanguard-spearhead"
  },
  "enhancement-shadow-war-veteran": {
    "title": "Shadow War Veteran",
    "text": "PHOBOS model only. The bearer has the following ability: Lord of Deceit (Aura): Once per turn, when your opponent targets a unit from their army within 12\" of this model with a stratagem, you can use this ability. If you do increase the CP cost of that use of that stratagem by 1CP.",
    "value": 30,
    "detachment": "Vanguard Spearhead",
    "tags": [],
    "owner": null,
    "assignment": null,
    "ruleId": "enhancement-shadow-war-veteran",
    "detachmentId": "vanguard-spearhead"
  }
});
