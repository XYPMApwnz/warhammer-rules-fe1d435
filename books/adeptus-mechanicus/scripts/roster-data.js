window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "adeptus-mechanicus",
    "title": "Adeptus Mechanicus",
    "factionKeyword": "ADEPTUS MECHANICUS",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-skitarii-rangers",
      "title": "Skitarii Rangers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Rangers",
        "Imperium",
        "Adeptus Mechanicus",
        "Infantry",
        "Skitarii",
        "Battleline"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "4+",
          "W": "1",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-objective-scouted",
            "sectionId": "datasheet-objective-scouted",
            "title": "Objective Scouted",
            "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
            "sourceUnitId": "unit-skitarii-rangers"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 6\"",
            "text": "",
            "sourceUnitId": "unit-skitarii-rangers"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-skitarii-rangers"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-skitarii-rangers"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-skitarii-rangers-selection-alpha-combat-weapon",
            "title": "Alpha combat weapon",
            "aliases": [
              "Alpha combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-alpha-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-galvanic-rifle",
            "title": "Galvanic rifle",
            "aliases": [
              "Galvanic rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-galvanic-rifle-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-mechanicus-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-transuranic-arquebus",
            "title": "Transuranic arquebus",
            "aliases": [
              "Transuranic arquebus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-transuranic-arquebus-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-arc-rifle",
            "title": "Arc rifle",
            "aliases": [
              "Arc rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-arc-rifle-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-plasma-caliver-supercharge",
            "title": "➤ Plasma caliver - supercharge",
            "aliases": [
              "➤ Plasma caliver - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-plasma-caliver-supercharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-plasma-caliver-standard",
            "title": "➤ Plasma caliver - standard",
            "aliases": [
              "➤ Plasma caliver - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-rangers-profile-plasma-caliver-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-weapon-family-plasma-caliver-selection",
            "title": "➤ Plasma caliver",
            "aliases": [
              "➤ Plasma caliver"
            ],
            "kind": "weapon",
            "familyId": "unit-skitarii-rangers-weapon-family-plasma-caliver",
            "profileIds": [
              "unit-skitarii-rangers-profile-plasma-caliver-supercharge-ranged-7",
              "unit-skitarii-rangers-profile-plasma-caliver-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-rangers-selection-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "aliases": [
              "Enhanced data-tether"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-skitarii-rangers-wargear-ability-enhanced-data-tether"
            ]
          },
          {
            "id": "unit-skitarii-rangers-selection-omnispex",
            "title": "Omnispex",
            "aliases": [
              "Omnispex"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-skitarii-rangers-wargear-ability-omnispex-2"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-skitarii-rangers-weapon-family-plasma-caliver",
            "title": "➤ Plasma caliver",
            "aliases": [
              "➤ Plasma caliver"
            ],
            "profileIds": [
              "unit-skitarii-rangers-profile-plasma-caliver-supercharge-ranged-7",
              "unit-skitarii-rangers-profile-plasma-caliver-standard-ranged-8"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-skitarii-rangers-profile-alpha-combat-weapon-melee",
            "title": "Alpha combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-alpha-combat-weapon"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-galvanic-rifle-ranged-2",
            "title": "Galvanic rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-galvanic-rifle"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-mechanicus-pistol-ranged-3",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-mechanicus-pistol"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-close-combat-weapon-melee-4",
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
              "unit-skitarii-rangers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-transuranic-arquebus-ranged-5",
            "title": "Transuranic arquebus",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "D3",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-transuranic-arquebus"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-arc-rifle-ranged-6",
            "title": "Arc rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-1",
            "d": "D3",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-arc-rifle"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-plasma-caliver-supercharge-ranged-7",
            "title": "➤ Plasma caliver - supercharge",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-plasma-caliver-supercharge",
              "unit-skitarii-rangers-weapon-family-plasma-caliver-selection"
            ]
          },
          {
            "id": "unit-skitarii-rangers-profile-plasma-caliver-standard-ranged-8",
            "title": "➤ Plasma caliver - standard",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-rangers-selection-plasma-caliver-standard",
              "unit-skitarii-rangers-weapon-family-plasma-caliver-selection"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-skitarii-rangers-wargear-ability-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "requiredSelectionIds": [
              "unit-skitarii-rangers-selection-enhanced-data-tether"
            ]
          },
          {
            "id": "unit-skitarii-rangers-wargear-ability-omnispex-2",
            "title": "Omnispex",
            "requiredSelectionIds": [
              "unit-skitarii-rangers-selection-omnispex"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-skitarii-vanguard",
      "title": "Skitarii Vanguard",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Vanguard",
        "Imperium",
        "Adeptus Mechanicus",
        "Infantry",
        "Skitarii",
        "Battleline"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "4+",
          "W": "1",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-rad-saturation-aura",
            "sectionId": "datasheet-rad-saturation-aura",
            "title": "Rad-saturation (Aura)",
            "text": "While an enemy unit (excluding Vehicle units) is within 3\" of this unit, subtract 1 from the Objective Control characteristic of models in that unit.",
            "sourceUnitId": "unit-skitarii-vanguard"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-skitarii-vanguard"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-skitarii-vanguard"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-skitarii-vanguard-selection-alpha-combat-weapon",
            "title": "Alpha combat weapon",
            "aliases": [
              "Alpha combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-alpha-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-radium-carbine",
            "title": "Radium carbine",
            "aliases": [
              "Radium carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-radium-carbine-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-mechanicus-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-transuranic-arquebus",
            "title": "Transuranic arquebus",
            "aliases": [
              "Transuranic arquebus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-transuranic-arquebus-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-arc-rifle",
            "title": "Arc rifle",
            "aliases": [
              "Arc rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-arc-rifle-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-plasma-caliver-supercharge",
            "title": "➤ Plasma caliver - supercharge",
            "aliases": [
              "➤ Plasma caliver - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-plasma-caliver-supercharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-plasma-caliver-standard",
            "title": "➤ Plasma caliver - standard",
            "aliases": [
              "➤ Plasma caliver - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-vanguard-profile-plasma-caliver-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-weapon-family-plasma-caliver-selection",
            "title": "➤ Plasma caliver",
            "aliases": [
              "➤ Plasma caliver"
            ],
            "kind": "weapon",
            "familyId": "unit-skitarii-vanguard-weapon-family-plasma-caliver",
            "profileIds": [
              "unit-skitarii-vanguard-profile-plasma-caliver-supercharge-ranged-7",
              "unit-skitarii-vanguard-profile-plasma-caliver-standard-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-vanguard-selection-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "aliases": [
              "Enhanced data-tether"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-skitarii-vanguard-wargear-ability-enhanced-data-tether"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-selection-omnispex",
            "title": "Omnispex",
            "aliases": [
              "Omnispex"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-skitarii-vanguard-wargear-ability-omnispex-2"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-skitarii-vanguard-weapon-family-plasma-caliver",
            "title": "➤ Plasma caliver",
            "aliases": [
              "➤ Plasma caliver"
            ],
            "profileIds": [
              "unit-skitarii-vanguard-profile-plasma-caliver-supercharge-ranged-7",
              "unit-skitarii-vanguard-profile-plasma-caliver-standard-ranged-8"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-skitarii-vanguard-profile-alpha-combat-weapon-melee",
            "title": "Alpha combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-alpha-combat-weapon"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-radium-carbine-ranged-2",
            "title": "Radium carbine",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Infantry 4+",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-radium-carbine"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-mechanicus-pistol-ranged-3",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-mechanicus-pistol"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-close-combat-weapon-melee-4",
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
              "unit-skitarii-vanguard-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-transuranic-arquebus-ranged-5",
            "title": "Transuranic arquebus",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "D3",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-transuranic-arquebus"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-arc-rifle-ranged-6",
            "title": "Arc rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-1",
            "d": "D3",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-arc-rifle"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-plasma-caliver-supercharge-ranged-7",
            "title": "➤ Plasma caliver - supercharge",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-plasma-caliver-supercharge",
              "unit-skitarii-vanguard-weapon-family-plasma-caliver-selection"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-profile-plasma-caliver-standard-ranged-8",
            "title": "➤ Plasma caliver - standard",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-vanguard-selection-plasma-caliver-standard",
              "unit-skitarii-vanguard-weapon-family-plasma-caliver-selection"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-skitarii-vanguard-wargear-ability-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "requiredSelectionIds": [
              "unit-skitarii-vanguard-selection-enhanced-data-tether"
            ]
          },
          {
            "id": "unit-skitarii-vanguard-wargear-ability-omnispex-2",
            "title": "Omnispex",
            "requiredSelectionIds": [
              "unit-skitarii-vanguard-selection-omnispex"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-cybernetica-datasmith",
      "title": "Cybernetica Datasmith",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Cybernetica Datasmith",
        "Tech-Priest",
        "Infantry",
        "Character",
        "Imperium",
        "Adeptus Mechanicus",
        "Legio Cybernetica"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-kastelan-robots",
            "maxCharacters": 1,
            "mandatory": true,
            "removeKeywords": [
              "INFANTRY"
            ]
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
              "unitId": "unit-kastelan-robots",
              "maxCharacters": 1,
              "mandatory": true,
              "removeKeywords": [
                "INFANTRY"
              ]
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
          "Sv": "2+",
          "W": "3",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "core-support",
            "sectionId": "core-support",
            "title": "Support",
            "text": "This model must be attached to the following unit:\n■ Kastelan Robots\n\nYou must attach this model to a Kastelan Robots unit, even if one or more other Cybernetica Datasmith models have already been attached to it. In such cases, if that bodyguard unit is destroyed, the Leader units attached to it become separate units with their original Starting Strengths. If you cannot attach this model to a Kastelan Robots unit, this model cannot be deployed and counts as having been destroyed during the first battle round. While attached to a Kastelan Robots unit, this model loses the INFANTRY keyword.",
            "sourceUnitId": "unit-cybernetica-datasmith"
          },
          {
            "id": "datasheet-battle-protocols",
            "sectionId": "datasheet-battle-protocols",
            "title": "Battle Protocols",
            "text": "At the start of the battle, if this model is leading a Kastelan Robots unit, that unit enters Aegis Protocols (see below). In your Command phase, if this model is leading a Kastelan Robots unit, you can select one protocol from those listed below for that unit to enter. Once a unit enters a protocol, it remains in that protocol until it enters a different one\n- Protector Protocol: Add 2 to the Attacks characteristic of ranged weapons equipped by Kastelan Robot models in that unit.\n- Conqueror Protocol: Add 2 to the Attacks characteristic of melee weapons equipped by Kastelan Robot models in that unit.\n- Aegis Protocol: Add 1 to the Toughness characteristic of Kastelan Robot models in that unit.",
            "sourceUnitId": "unit-cybernetica-datasmith"
          },
          {
            "id": "datasheet-data-severed",
            "sectionId": "datasheet-data-severed",
            "title": "Data-severed",
            "text": "If there are no KASTELAN ROBOT models in this unit: \n- This unit loses VEHICLE. \n- This unit has INFANTRY.",
            "sourceUnitId": "unit-cybernetica-datasmith"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-cybernetica-datasmith"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-cybernetica-datasmith"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-cybernetica-datasmith-selection-power-fist",
            "title": "Power fist",
            "aliases": [
              "Power fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cybernetica-datasmith-profile-power-fist-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cybernetica-datasmith-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cybernetica-datasmith-profile-mechanicus-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-cybernetica-datasmith-profile-power-fist-melee",
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
              "unit-cybernetica-datasmith-selection-power-fist"
            ]
          },
          {
            "id": "unit-cybernetica-datasmith-profile-mechanicus-pistol-ranged-2",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-cybernetica-datasmith-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-skitarii-marshal",
      "title": "Skitarii Marshal",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Marshal",
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Character",
        "Infantry"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-hastarii-exterminators",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-fusiliers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-rangers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-vanguard",
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
              "unitId": "unit-hastarii-exterminators",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-fusiliers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-rangers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-vanguard",
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
          "T": "3",
          "Sv": "4+",
          "W": "3",
          "Ld": "6+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "core-support",
            "sectionId": "core-support",
            "title": "Support",
            "text": "This model can be attached to the following units:\n■ Hastarii Exterminators\n■ Hastarii Fusiliers\n■ Skitarii Rangers\n■ Skitarii Vanguard",
            "sourceUnitId": "unit-skitarii-marshal"
          },
          {
            "id": "datasheet-control-edict",
            "sectionId": "datasheet-control-edict",
            "title": "Control Edict",
            "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-skitarii-marshal"
          },
          {
            "id": "datasheet-servo-skull-uplink",
            "sectionId": "datasheet-servo-skull-uplink",
            "title": "Servo-skull Uplink",
            "text": "Once per battle, at the start of any phase, you can select one friendly Skitarii unit that is Battle-shocked and within 6\" of this model. That unit is no longer Battle-shocked.",
            "sourceUnitId": "unit-skitarii-marshal"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-skitarii-marshal"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-skitarii-marshal"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-skitarii-marshal-selection-control-stave",
            "title": "Control stave",
            "aliases": [
              "Control stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-marshal-profile-control-stave-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skitarii-marshal-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skitarii-marshal-profile-mechanicus-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-skitarii-marshal-profile-control-stave-melee",
            "title": "Control stave",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skitarii-marshal-selection-control-stave"
            ]
          },
          {
            "id": "unit-skitarii-marshal-profile-mechanicus-pistol-ranged-2",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-skitarii-marshal-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sydonian-skatros",
      "title": "Sydonian Skatros",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Infantry",
        "Imperium",
        "Skitarii",
        "Sydonian",
        "Adeptus Mechanicus",
        "Character",
        "Skatros"
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
          "T": "4",
          "Sv": "4+",
          "W": "4",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-dread-snipers",
            "sectionId": "datasheet-dread-snipers",
            "title": "Dread Snipers",
            "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test.",
            "sourceUnitId": "unit-sydonian-skatros"
          },
          {
            "id": "datasheet-sydonian-sentinel",
            "sectionId": "datasheet-sydonian-sentinel",
            "title": "Sydonian Sentinel",
            "text": "This model cannot be your Warlord.",
            "sourceUnitId": "unit-sydonian-skatros"
          },
          {
            "id": "datasheet-achillan-eye",
            "sectionId": "datasheet-achillan-eye",
            "title": "Achillan Eye",
            "text": "Each time this model makes an attack with a radium jezzail that targets an Infantry unit, you can re-roll the Wound roll. Each time this model makes an attack with a Skatros transuranic arquebus that targets a Monster or Vehicle unit, you can re-roll the Wound roll.",
            "sourceUnitId": "unit-sydonian-skatros"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sydonian-skatros"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-sydonian-skatros"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "",
            "sourceUnitId": "unit-sydonian-skatros"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-sydonian-skatros-selection-sydonian-feet",
            "title": "Sydonian Feet",
            "aliases": [
              "Sydonian Feet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-skatros-profile-sydonian-feet-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-skatros-selection-radium-jezzail",
            "title": "Radium Jezzail",
            "aliases": [
              "Radium Jezzail"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-skatros-profile-radium-jezzail-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-skatros-selection-skatros-transuranic-arquebus",
            "title": "Skatros transuranic arquebus",
            "aliases": [
              "Skatros transuranic arquebus"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-skatros-profile-skatros-transuranic-arquebus-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-skatros-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-skatros-profile-mechanicus-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sydonian-skatros-profile-sydonian-feet-melee",
            "title": "Sydonian Feet",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sydonian-skatros-selection-sydonian-feet"
            ]
          },
          {
            "id": "unit-sydonian-skatros-profile-radium-jezzail-ranged-2",
            "title": "Radium Jezzail",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-2",
            "d": "3",
            "abilities": "Heavy, Precision, Anti-Infantry 3+",
            "sourceSelectionIds": [
              "unit-sydonian-skatros-selection-radium-jezzail"
            ]
          },
          {
            "id": "unit-sydonian-skatros-profile-skatros-transuranic-arquebus-ranged-3",
            "title": "Skatros transuranic arquebus",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "D3",
            "abilities": "Heavy, Precision, Anti-Monster 4+, Anti-Vehicle 4+",
            "sourceSelectionIds": [
              "unit-sydonian-skatros-selection-skatros-transuranic-arquebus"
            ]
          },
          {
            "id": "unit-sydonian-skatros-profile-mechanicus-pistol-ranged-4",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-sydonian-skatros-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tech-priest-dominus",
      "title": "Tech-Priest Dominus",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Dominus",
        "Imperium",
        "Adeptus Mechanicus",
        "Tech-Priest",
        "Character",
        "Infantry",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-corpuscarii-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fulgurite-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-exterminators",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-fusiliers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-breachers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-destroyers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-servitor-battleclade",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-rangers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-vanguard",
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
              "unitId": "unit-corpuscarii-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fulgurite-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-exterminators",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-fusiliers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-breachers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-destroyers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-servitor-battleclade",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-rangers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-vanguard",
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
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "This model can be attached to the following units:\n■ Corpuscarii Electro-Priests\n■ Fulgurite Electro-Priests\n■ Hastarii Exterminators\n■ Hastarii Fusiliers\n■ Kataphron Breachers\n■ Kataphron Destroyers\n■ Servitor Battleclade\n■ Skitarii Rangers\n■ Skitarii Vanguard",
            "sourceUnitId": "unit-tech-priest-dominus"
          },
          {
            "id": "datasheet-lord-of-the-machine-cult",
            "sectionId": "datasheet-lord-of-the-machine-cult",
            "title": "Lord of the Machine Cult",
            "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability. If that unit has the Electro-Priests keyword, models in that unit have the Feel No Pain 4+ ability instead",
            "sourceUnitId": "unit-tech-priest-dominus"
          },
          {
            "id": "datasheet-data-spike",
            "sectionId": "datasheet-data-spike",
            "title": "Data-spike",
            "text": "At the start of the Fight phase, you can select one enemy Vehicle unit within Engagement Range of this model’s unit and roll one D6: on a 4+, that enemy unit suffers D6 mortal wounds and, until the end of the phase, the Weapon Skill characteristic of melee weapons equipped by that enemy unit is worsened by 1.",
            "sourceUnitId": "unit-tech-priest-dominus"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-tech-priest-dominus"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-tech-priest-dominus"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-tech-priest-dominus-selection-omnissian-axe",
            "title": "Omnissian axe",
            "aliases": [
              "Omnissian axe"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-omnissian-axe-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-selection-macrostubber",
            "title": "Macrostubber",
            "aliases": [
              "Macrostubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-macrostubber-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-selection-phosphor-serpenta",
            "title": "Phosphor serpenta",
            "aliases": [
              "Phosphor serpenta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-phosphor-serpenta-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-selection-eradication-ray-dissipated",
            "title": "➤ Eradication ray - dissipated",
            "aliases": [
              "➤ Eradication ray - dissipated"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-eradication-ray-dissipated-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-selection-eradication-ray-focused",
            "title": "➤ Eradication ray - focused",
            "aliases": [
              "➤ Eradication ray - focused"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-eradication-ray-focused-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-selection-volkite-blaster",
            "title": "Volkite blaster",
            "aliases": [
              "Volkite blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-dominus-profile-volkite-blaster-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-dominus-weapon-family-eradication-ray-selection",
            "title": "➤ Eradication ray",
            "aliases": [
              "➤ Eradication ray"
            ],
            "kind": "weapon",
            "familyId": "unit-tech-priest-dominus-weapon-family-eradication-ray",
            "profileIds": [
              "unit-tech-priest-dominus-profile-eradication-ray-dissipated-ranged-4",
              "unit-tech-priest-dominus-profile-eradication-ray-focused-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-tech-priest-dominus-weapon-family-eradication-ray",
            "title": "➤ Eradication ray",
            "aliases": [
              "➤ Eradication ray"
            ],
            "profileIds": [
              "unit-tech-priest-dominus-profile-eradication-ray-dissipated-ranged-4",
              "unit-tech-priest-dominus-profile-eradication-ray-focused-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-tech-priest-dominus-profile-omnissian-axe-melee",
            "title": "Omnissian axe",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-omnissian-axe"
            ]
          },
          {
            "id": "unit-tech-priest-dominus-profile-macrostubber-ranged-2",
            "title": "Macrostubber",
            "mode": "ranged",
            "range": "12\"",
            "a": "5",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-macrostubber"
            ]
          },
          {
            "id": "unit-tech-priest-dominus-profile-phosphor-serpenta-ranged-3",
            "title": "Phosphor serpenta",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-phosphor-serpenta"
            ]
          },
          {
            "id": "unit-tech-priest-dominus-profile-eradication-ray-dissipated-ranged-4",
            "title": "➤ Eradication ray - dissipated",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-eradication-ray-dissipated",
              "unit-tech-priest-dominus-weapon-family-eradication-ray-selection"
            ]
          },
          {
            "id": "unit-tech-priest-dominus-profile-eradication-ray-focused-ranged-5",
            "title": "➤ Eradication ray - focused",
            "mode": "ranged",
            "range": "12\"",
            "a": "D3",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-eradication-ray-focused",
              "unit-tech-priest-dominus-weapon-family-eradication-ray-selection"
            ]
          },
          {
            "id": "unit-tech-priest-dominus-profile-volkite-blaster-ranged-6",
            "title": "Volkite blaster",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-tech-priest-dominus-selection-volkite-blaster"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tech-priest-enginseer",
      "title": "Tech-Priest Enginseer",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Enginseer",
        "Imperium",
        "Adeptus Mechanicus",
        "Tech-Priest",
        "Character",
        "Infantry",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-corpuscarii-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fulgurite-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-exterminators",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-fusiliers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-breachers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-destroyers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-servitor-battleclade",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-rangers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-vanguard",
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
              "unitId": "unit-corpuscarii-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fulgurite-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-exterminators",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-fusiliers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-breachers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-destroyers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-servitor-battleclade",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-rangers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-vanguard",
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
          "W": "3",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-enginseer",
            "sectionId": "datasheet-enginseer",
            "title": "Enginseer",
            "text": "While this model is within 3\" of one or more friendly Adeptus Mechanicus Vehicle units, unless it is leading a unit, this model has the Lone Operative ability.",
            "sourceUnitId": "unit-tech-priest-enginseer"
          },
          {
            "id": "datasheet-omnissiahs-blessing",
            "sectionId": "datasheet-omnissiahs-blessing",
            "title": "Omnissiah's Blessing",
            "text": "In your Command phase, select one friendly Adeptus Mechanicus model within 3\" of this model. That model regains up to D3 lost wounds and, if it is a Vehicle model, until the start of your next Command phase, that model has the Feel No Pain 5+ ability. Each model can only be selected for this ability once per Command phase",
            "sourceUnitId": "unit-tech-priest-enginseer"
          },
          {
            "id": "datasheet-vengeance-for-the-omnissiah",
            "sectionId": "datasheet-vengeance-for-the-omnissiah",
            "title": "Vengeance for the Omnissiah",
            "text": "If a friendly Adeptus Mechanicus Vehicle model is destroyed within 12\" of this model, until the end of the battle, this model’s Omnissian axe has an Attacks characteristic of 6.",
            "sourceUnitId": "unit-tech-priest-enginseer"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "This model can be attached to the following units:\n■ Corpuscarii Electro-Priests\n■ Fulgurite Electro-Priests\n■ Kataphron Breachers\n■ Kataphron Destroyers\n■ Skitarii Rangers\n■ Skitarii Vanguard",
            "sourceUnitId": "unit-tech-priest-enginseer"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-tech-priest-enginseer"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-tech-priest-enginseer"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-tech-priest-enginseer-selection-servo-arm",
            "title": "Servo arm",
            "aliases": [
              "Servo arm"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-enginseer-profile-servo-arm-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-enginseer-selection-omnissian-axe",
            "title": "Omnissian axe",
            "aliases": [
              "Omnissian axe"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-enginseer-profile-omnissian-axe-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-enginseer-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-enginseer-profile-mechanicus-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tech-priest-enginseer-profile-servo-arm-melee",
            "title": "Servo arm",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-tech-priest-enginseer-selection-servo-arm"
            ]
          },
          {
            "id": "unit-tech-priest-enginseer-profile-omnissian-axe-melee-2",
            "title": "Omnissian axe",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tech-priest-enginseer-selection-omnissian-axe"
            ]
          },
          {
            "id": "unit-tech-priest-enginseer-profile-mechanicus-pistol-ranged-3",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-tech-priest-enginseer-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tech-priest-manipulus",
      "title": "Tech-Priest Manipulus",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Manipulus",
        "Imperium",
        "Adeptus Mechanicus",
        "Tech-Priest",
        "Character",
        "Infantry",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-corpuscarii-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fulgurite-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-exterminators",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-fusiliers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-breachers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-destroyers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-servitor-battleclade",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-rangers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-vanguard",
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
              "unitId": "unit-corpuscarii-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fulgurite-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-exterminators",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-fusiliers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-breachers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-destroyers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-servitor-battleclade",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-rangers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-vanguard",
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
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "This model can be attached to the following units:\n■ Corpuscarii Electro-Priests\n■ Fulgurite Electro-Priests\n■ Hastarii Exterminators\n■ Hastarii Fusiliers\n■ Kataphron Breachers\n■ Kataphron Destroyers\n■ Servitor Battleclade\n■ Skitarii Rangers\n■ Skitarii Vanguard",
            "sourceUnitId": "unit-tech-priest-manipulus"
          },
          {
            "id": "datasheet-galvanic-field",
            "sectionId": "datasheet-galvanic-field",
            "title": "Galvanic Field",
            "text": "While this model is leading a unit, weapons equipped by models in that unit have the [Lethal Hits] ability.",
            "sourceUnitId": "unit-tech-priest-manipulus"
          },
          {
            "id": "datasheet-defend-the-divine-work",
            "sectionId": "datasheet-defend-the-divine-work",
            "title": "Defend the Divine Work",
            "text": "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, all models in this model’s unit have a 4+ invulnerable save.",
            "sourceUnitId": "unit-tech-priest-manipulus"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-tech-priest-manipulus"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-tech-priest-manipulus"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-tech-priest-manipulus-selection-omnissian-staff",
            "title": "Omnissian staff",
            "aliases": [
              "Omnissian staff"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-manipulus-profile-omnissian-staff-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-manipulus-selection-magnarail-lance",
            "title": "Magnarail lance",
            "aliases": [
              "Magnarail lance"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-manipulus-profile-magnarail-lance-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-tech-priest-manipulus-selection-transonic-cannon",
            "title": "Transonic cannon",
            "aliases": [
              "Transonic cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tech-priest-manipulus-profile-transonic-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tech-priest-manipulus-profile-omnissian-staff-melee",
            "title": "Omnissian staff",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-tech-priest-manipulus-selection-omnissian-staff"
            ]
          },
          {
            "id": "unit-tech-priest-manipulus-profile-magnarail-lance-ranged-2",
            "title": "Magnarail lance",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "7",
            "ap": "-2",
            "d": "3",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-tech-priest-manipulus-selection-magnarail-lance"
            ]
          },
          {
            "id": "unit-tech-priest-manipulus-profile-transonic-cannon-ranged-3",
            "title": "Transonic cannon",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "2",
            "abilities": "Devastating Wounds, Torrent",
            "sourceSelectionIds": [
              "unit-tech-priest-manipulus-selection-transonic-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-technoarcheologist",
      "title": "Technoarcheologist",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Technoarcheologist",
        "Imperium",
        "Adeptus Mechanicus",
        "Tech-Priest",
        "Character",
        "Infantry",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [
          {
            "unitId": "unit-corpuscarii-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-fulgurite-electro-priests",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-exterminators",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-hastarii-fusiliers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-breachers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-kataphron-destroyers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-servitor-battleclade",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-rangers",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-skitarii-vanguard",
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
              "unitId": "unit-corpuscarii-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-fulgurite-electro-priests",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-exterminators",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-hastarii-fusiliers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-breachers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-kataphron-destroyers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-servitor-battleclade",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-rangers",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-skitarii-vanguard",
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
          "W": "3",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-seekers-of-divine-arcana",
            "sectionId": "datasheet-seekers-of-divine-arcana",
            "title": "Seekers of Divine Arcana",
            "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.",
            "sourceUnitId": "unit-technoarcheologist"
          },
          {
            "id": "datasheet-cogitative-instincts",
            "sectionId": "datasheet-cogitative-instincts",
            "title": "Cogitative Instincts",
            "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" horizontally of this model.",
            "sourceUnitId": "unit-technoarcheologist"
          },
          {
            "id": "core-support",
            "sectionId": "core-support",
            "title": "Support",
            "text": "This model can be attached to the following units:\n■ Corpuscarii Electro-Priests\n■ Fulgurite Electro-Priests\n■ Hastarii Exterminators\n■ Hastarii Fusiliers\n■ Kataphron Breachers\n■ Kataphron Destroyers\n■ Servitor Battleclade\n■ Skitarii Rangers\n■ Skitarii Vanguard",
            "sourceUnitId": "unit-technoarcheologist"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-technoarcheologist"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-technoarcheologist"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-technoarcheologist-selection-servo-arc-claw",
            "title": "Servo-arc claw",
            "aliases": [
              "Servo-arc claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-technoarcheologist-profile-servo-arc-claw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-technoarcheologist-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-technoarcheologist-profile-mechanicus-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-technoarcheologist-profile-servo-arc-claw-melee",
            "title": "Servo-arc claw",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-technoarcheologist-selection-servo-arc-claw"
            ]
          },
          {
            "id": "unit-technoarcheologist-profile-mechanicus-pistol-ranged-2",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-technoarcheologist-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-skorpius-dunerider",
      "title": "Skorpius Dunerider",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Skorpius Dunerider",
        "Imperium",
        "Adeptus Mechanicus",
        "Vehicle",
        "Dedicated Transport",
        "Transport",
        "Skitarii",
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
          "W": "11",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-broad-spectrum-data-tether",
            "sectionId": "datasheet-broad-spectrum-data-tether",
            "title": "Broad spectrum data-tether",
            "text": "Each time you target this unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-skorpius-dunerider"
          },
          {
            "id": "datasheet-fire-support",
            "sectionId": "datasheet-fire-support",
            "title": "Fire Support",
            "text": "In your Shooting phase, after this model has shot, select one enemy unit it scored one or more hits against this phase. Until the end of the phase, each time a friendly model that disembarked from this Transport this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll.",
            "sourceUnitId": "unit-skorpius-dunerider"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-skorpius-dunerider"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-skorpius-dunerider"
          },
          {
            "id": "core-firing-deck",
            "sectionId": "core-firing-deck",
            "title": "Firing Deck 2",
            "text": "",
            "sourceUnitId": "unit-skorpius-dunerider"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-skorpius-dunerider-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-dunerider-profile-armoured-hull-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skorpius-dunerider-selection-cognis-heavy-stubber-array",
            "title": "Cognis heavy stubber array",
            "aliases": [
              "Cognis heavy stubber array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-dunerider-profile-cognis-heavy-stubber-array-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-skorpius-dunerider-profile-armoured-hull-melee",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skorpius-dunerider-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-skorpius-dunerider-profile-cognis-heavy-stubber-array-ranged-2",
            "title": "Cognis heavy stubber array",
            "mode": "ranged",
            "range": "36\"",
            "a": "9",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 9, Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-skorpius-dunerider-selection-cognis-heavy-stubber-array"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-belisarius-cawl",
      "title": "Belisarius Cawl",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Belisarius Cawl",
        "Epic Hero",
        "Monster",
        "Character",
        "Tech-Priest",
        "Adeptus Mechanicus",
        "Imperium",
        "Cult Mechanicus",
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
        "stats": {
          "M": "8\"",
          "T": "8",
          "Sv": "2+",
          "W": "10",
          "Ld": "6+",
          "OC": "3"
        },
        "abilities": [
          {
            "id": "datasheet-canticles-of-the-omnissiah",
            "sectionId": "datasheet-canticles-of-the-omnissiah",
            "title": "Canticles of the Omnissiah",
            "text": "",
            "sourceUnitId": "unit-belisarius-cawl"
          },
          {
            "id": "datasheet-mechanicus-bodyguard",
            "sectionId": "datasheet-mechanicus-bodyguard",
            "title": "Mechanicus Bodyguard",
            "text": "While this model is within 3\" of one or more other friendly Adeptus Mechanicus units, this model has the Lone Operative ability.",
            "sourceUnitId": "unit-belisarius-cawl"
          },
          {
            "id": "datasheet-self-repair-mechanisms",
            "sectionId": "datasheet-self-repair-mechanisms",
            "title": "Self-repair Mechanisms",
            "text": "At the start of your Command phase, this model regains up to D3 lost wounds.",
            "sourceUnitId": "unit-belisarius-cawl"
          },
          {
            "id": "datasheet-supreme-commander",
            "sectionId": "datasheet-supreme-commander",
            "title": "Supreme Commander",
            "text": "If this model is in your army, it must be your Warlord.",
            "sourceUnitId": "unit-belisarius-cawl"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-belisarius-cawl"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-belisarius-cawl"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-belisarius-cawl-selection-arc-scourge",
            "title": "Arc Scourge",
            "aliases": [
              "Arc Scourge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-belisarius-cawl-profile-arc-scourge-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-belisarius-cawl-selection-cawls-omnissian-axe",
            "title": "Cawl's Omnissian axe",
            "aliases": [
              "Cawl's Omnissian axe"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-belisarius-cawl-profile-cawls-omnissian-axe-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-belisarius-cawl-selection-mechadendrite-hive",
            "title": "Mechadendrite hive",
            "aliases": [
              "Mechadendrite hive"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-belisarius-cawl-profile-mechadendrite-hive-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-belisarius-cawl-selection-solar-atomiser",
            "title": "Solar atomiser",
            "aliases": [
              "Solar atomiser"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-belisarius-cawl-profile-solar-atomiser-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-belisarius-cawl-profile-arc-scourge-melee",
            "title": "Arc Scourge",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds, Extra Attacks",
            "sourceSelectionIds": [
              "unit-belisarius-cawl-selection-arc-scourge"
            ]
          },
          {
            "id": "unit-belisarius-cawl-profile-cawls-omnissian-axe-melee-2",
            "title": "Cawl's Omnissian axe",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-belisarius-cawl-selection-cawls-omnissian-axe"
            ]
          },
          {
            "id": "unit-belisarius-cawl-profile-mechadendrite-hive-melee-3",
            "title": "Mechadendrite hive",
            "mode": "melee",
            "range": "Melee",
            "a": "2D6",
            "skill": "3+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-belisarius-cawl-selection-mechadendrite-hive"
            ]
          },
          {
            "id": "unit-belisarius-cawl-profile-solar-atomiser-ranged-4",
            "title": "Solar atomiser",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "2+",
            "s": "14",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 3",
            "sourceSelectionIds": [
              "unit-belisarius-cawl-selection-solar-atomiser"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-thulia-ghuld",
      "title": "Thulia Ghuld",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Faction Pack",
      "intrinsicKeywords": [
        "MONSTER",
        "CHARACTER",
        "MOBILE",
        "EPIC HERO",
        "IMPERIUM",
        "CULT MECHANICUS",
        "TECH-PRIEST",
        "THULIA GHULD",
        "ADEPTUS MECHANICUS"
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
          "SV": "2+",
          "W": "10",
          "LD": "6+",
          "OC": "3"
        },
        "abilities": [
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "This unit has the Doctrina Imperatives Faction ability.",
            "sourceUnitId": "unit-thulia-ghuld"
          },
          {
            "id": "datasheet-rod-of-the-war-forge",
            "sectionId": "datasheet-rod-of-the-war-forge",
            "title": "Rod of the War Forge",
            "text": "In your Command phase, select one Icon of War ability. Until your next Command phase, this model has that ability.",
            "sourceUnitId": "unit-thulia-ghuld"
          },
          {
            "id": "datasheet-mechanicus-bodyguard",
            "sectionId": "datasheet-mechanicus-bodyguard",
            "title": "Mechanicus Bodyguard",
            "text": "While this model is within 3\" of one or more other friendly ADEPTUS MECHANICUS units, it has Lone Operative.",
            "sourceUnitId": "unit-thulia-ghuld"
          },
          {
            "id": "datasheet-secutor-of-olympus",
            "sectionId": "datasheet-secutor-of-olympus",
            "title": "Secutor of Olympus",
            "text": "At the start of your Shooting phase, select one enemy VEHICLE within 12\" and roll one D6; on a 2+, it suffers D3+1 mortal wounds.",
            "sourceUnitId": "unit-thulia-ghuld"
          },
          {
            "id": "datasheet-icon-of-war",
            "sectionId": "datasheet-icon-of-war",
            "title": "Icon of War",
            "text": "Fanatical Devotion lets a friendly SKITARII or THULIA GHULD unit within 6\" shoot and charge after Advancing. Adaptive Tactics lets it shoot and charge after Falling Back. The Fires of Mars makes both Imperatives active for it.",
            "sourceUnitId": "unit-thulia-ghuld"
          }
        ],
        "models": [
          {
            "id": "unit-thulia-ghuld-model-archmagos-terminus-thulia-ghuld",
            "title": "Archmagos Terminus Thulia Ghuld",
            "aliases": [
              "Archmagos Terminus Thulia Ghuld",
              "Archmagos Terminus Thulia Ghuld - Epic Hero"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-thulia-ghuld-selection-jericho-class-conversion-resonator-titanic-impact",
            "title": "Jericho-class conversion resonator - titanic impact",
            "aliases": [
              "Jericho-class conversion resonator - titanic impact"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-titanic-impact-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-thulia-ghuld-selection-jericho-class-conversion-resonator-shockwave",
            "title": "Jericho-class conversion resonator - shockwave",
            "aliases": [
              "Jericho-class conversion resonator - shockwave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-shockwave-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-thulia-ghuld-selection-rod-of-the-war-forge-strike",
            "title": "Rod of the War Forge - strike",
            "aliases": [
              "Rod of the War Forge - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-strike-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-thulia-ghuld-selection-rod-of-the-war-forge-sweep",
            "title": "Rod of the War Forge - sweep",
            "aliases": [
              "Rod of the War Forge - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-thulia-ghuld-weapon-family-jericho-class-conversion-resonator-selection",
            "title": "Jericho-class conversion resonator",
            "aliases": [
              "Jericho-class conversion resonator"
            ],
            "kind": "weapon",
            "familyId": "unit-thulia-ghuld-weapon-family-jericho-class-conversion-resonator",
            "profileIds": [
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-titanic-impact-ranged",
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-shockwave-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-thulia-ghuld-weapon-family-rod-of-the-war-forge-selection",
            "title": "Rod of the War Forge",
            "aliases": [
              "Rod of the War Forge"
            ],
            "kind": "weapon",
            "familyId": "unit-thulia-ghuld-weapon-family-rod-of-the-war-forge",
            "profileIds": [
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-strike-melee-3",
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-sweep-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-thulia-ghuld-weapon-family-jericho-class-conversion-resonator",
            "title": "Jericho-class conversion resonator",
            "aliases": [
              "Jericho-class conversion resonator"
            ],
            "profileIds": [
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-titanic-impact-ranged",
              "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-shockwave-ranged-2"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-thulia-ghuld-weapon-family-rod-of-the-war-forge",
            "title": "Rod of the War Forge",
            "aliases": [
              "Rod of the War Forge"
            ],
            "profileIds": [
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-strike-melee-3",
              "unit-thulia-ghuld-profile-rod-of-the-war-forge-sweep-melee-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-titanic-impact-ranged",
            "title": "Jericho-class conversion resonator - titanic impact",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "12",
            "ap": "-3",
            "d": "D6+2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-thulia-ghuld-selection-jericho-class-conversion-resonator-titanic-impact",
              "unit-thulia-ghuld-weapon-family-jericho-class-conversion-resonator-selection"
            ]
          },
          {
            "id": "unit-thulia-ghuld-profile-jericho-class-conversion-resonator-shockwave-ranged-2",
            "title": "Jericho-class conversion resonator - shockwave",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6+2",
            "skill": "2+",
            "s": "6",
            "ap": "-2",
            "d": "1",
            "abilities": "Blast, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-thulia-ghuld-selection-jericho-class-conversion-resonator-shockwave",
              "unit-thulia-ghuld-weapon-family-jericho-class-conversion-resonator-selection"
            ]
          },
          {
            "id": "unit-thulia-ghuld-profile-rod-of-the-war-forge-strike-melee-3",
            "title": "Rod of the War Forge - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "2+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-thulia-ghuld-selection-rod-of-the-war-forge-strike",
              "unit-thulia-ghuld-weapon-family-rod-of-the-war-forge-selection"
            ]
          },
          {
            "id": "unit-thulia-ghuld-profile-rod-of-the-war-forge-sweep-melee-4",
            "title": "Rod of the War Forge - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "12",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-thulia-ghuld-selection-rod-of-the-war-forge-sweep",
              "unit-thulia-ghuld-weapon-family-rod-of-the-war-forge-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-corpuscarii-electro-priests",
      "title": "Corpuscarii Electro-Priests",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Electro-Priests",
        "Corpuscarii",
        "Imperium",
        "Infantry",
        "Adeptus Mechanicus",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "7+",
          "W": "1",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-electro-shock",
            "sectionId": "datasheet-electro-shock",
            "title": "Electro-shock",
            "text": "In your Shooting phase, after this unit has shot, select one enemy unit (excluding Monsters and Vehicles) hit by one or more of those attacks. Until the end of your opponent’s next turn, that enemy unit is shocked. While a unit is shocked, subtract 2\" from its Move characteristic and subtract 2 from Advance and Charge rolls made for it.",
            "sourceUnitId": "unit-corpuscarii-electro-priests"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-corpuscarii-electro-priests"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-corpuscarii-electro-priests"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-corpuscarii-electro-priests-selection-electrostatic-gauntlets",
            "title": "Electrostatic gauntlets",
            "aliases": [
              "Electrostatic gauntlets"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-corpuscarii-electro-priests-profile-electrostatic-gauntlets-ranged",
              "unit-corpuscarii-electro-priests-profile-electrostatic-gauntlets-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-corpuscarii-electro-priests-profile-electrostatic-gauntlets-ranged",
            "title": "Electrostatic gauntlets",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol, Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-corpuscarii-electro-priests-selection-electrostatic-gauntlets"
            ]
          },
          {
            "id": "unit-corpuscarii-electro-priests-profile-electrostatic-gauntlets-melee-2",
            "title": "Electrostatic gauntlets",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-corpuscarii-electro-priests-selection-electrostatic-gauntlets"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-fulgurite-electro-priests",
      "title": "Fulgurite Electro-Priests",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Electro-Priests",
        "Fulgurite",
        "Infantry",
        "Imperium",
        "Adeptus Mechanicus",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "3",
          "Sv": "7+",
          "W": "1",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-electro-infusion",
            "sectionId": "datasheet-electro-infusion",
            "title": "Electro-Infusion",
            "text": "While a Character model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll.",
            "sourceUnitId": "unit-fulgurite-electro-priests"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-fulgurite-electro-priests"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain 5+",
            "text": "",
            "sourceUnitId": "unit-fulgurite-electro-priests"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-fulgurite-electro-priests-selection-electroleech-stave",
            "title": "Electroleech stave",
            "aliases": [
              "Electroleech stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-fulgurite-electro-priests-profile-electroleech-stave-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-fulgurite-electro-priests-profile-electroleech-stave-melee",
            "title": "Electroleech stave",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-fulgurite-electro-priests-selection-electroleech-stave"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hastarii-exterminators",
      "title": "Hastarii Exterminators",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Faction Pack",
      "intrinsicKeywords": [
        "INFANTRY",
        "IMPERIUM",
        "SKITARII",
        "HASTARII",
        "EXTERMINATORS",
        "ADEPTUS MECHANICUS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "4",
          "SV": "3+",
          "W": "2",
          "LD": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "This unit has the Doctrina Imperatives Faction ability.",
            "sourceUnitId": "unit-hastarii-exterminators"
          },
          {
            "id": "datasheet-broad-spectrum-targeting-augurs",
            "sectionId": "datasheet-broad-spectrum-targeting-augurs",
            "title": "Broad-spectrum Targeting Augurs",
            "text": "Each time a model in this unit attacks with an eradication caster against a unit excluding MONSTER and VEHICLE units, that attack has Sustained Hits 1.",
            "sourceUnitId": "unit-hastarii-exterminators"
          }
        ],
        "models": [
          {
            "id": "unit-hastarii-exterminators-model-hastarii-exterminator-alpha-and-4-hastarii-exterminators",
            "title": "Hastarii Exterminator Alpha and 4 Hastarii Exterminators",
            "aliases": [
              "Hastarii Exterminator Alpha and 4 Hastarii Exterminators"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hastarii-exterminators-selection-hastarii-arc-blaster",
            "title": "Hastarii arc blaster",
            "aliases": [
              "Hastarii arc blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-exterminators-profile-hastarii-arc-blaster-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-exterminators-selection-eradication-caster-dissipated",
            "title": "Eradication caster - dissipated",
            "aliases": [
              "Eradication caster - dissipated"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-exterminators-profile-eradication-caster-dissipated-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-exterminators-selection-eradication-caster-focused",
            "title": "Eradication caster - focused",
            "aliases": [
              "Eradication caster - focused"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-exterminators-profile-eradication-caster-focused-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-exterminators-selection-close-combat-weapon",
            "title": "Close-combat weapon",
            "aliases": [
              "Close-combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-exterminators-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-exterminators-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-exterminators-profile-power-weapon-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-exterminators-weapon-family-eradication-caster-selection",
            "title": "Eradication caster",
            "aliases": [
              "Eradication caster"
            ],
            "kind": "weapon",
            "familyId": "unit-hastarii-exterminators-weapon-family-eradication-caster",
            "profileIds": [
              "unit-hastarii-exterminators-profile-eradication-caster-dissipated-ranged-2",
              "unit-hastarii-exterminators-profile-eradication-caster-focused-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-hastarii-exterminators-weapon-family-eradication-caster",
            "title": "Eradication caster",
            "aliases": [
              "Eradication caster"
            ],
            "profileIds": [
              "unit-hastarii-exterminators-profile-eradication-caster-dissipated-ranged-2",
              "unit-hastarii-exterminators-profile-eradication-caster-focused-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-hastarii-exterminators-profile-hastarii-arc-blaster-ranged",
            "title": "Hastarii arc blaster",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-hastarii-exterminators-selection-hastarii-arc-blaster"
            ]
          },
          {
            "id": "unit-hastarii-exterminators-profile-eradication-caster-dissipated-ranged-2",
            "title": "Eradication caster - dissipated",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Infantry 4+",
            "sourceSelectionIds": [
              "unit-hastarii-exterminators-selection-eradication-caster-dissipated",
              "unit-hastarii-exterminators-weapon-family-eradication-caster-selection"
            ]
          },
          {
            "id": "unit-hastarii-exterminators-profile-eradication-caster-focused-ranged-3",
            "title": "Eradication caster - focused",
            "mode": "ranged",
            "range": "15\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Infantry 4+",
            "sourceSelectionIds": [
              "unit-hastarii-exterminators-selection-eradication-caster-focused",
              "unit-hastarii-exterminators-weapon-family-eradication-caster-selection"
            ]
          },
          {
            "id": "unit-hastarii-exterminators-profile-close-combat-weapon-melee-4",
            "title": "Close-combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hastarii-exterminators-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-hastarii-exterminators-profile-power-weapon-melee-5",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hastarii-exterminators-selection-power-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-hastarii-fusiliers",
      "title": "Hastarii Fusiliers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Faction Pack",
      "intrinsicKeywords": [
        "INFANTRY",
        "IMPERIUM",
        "SKITARII",
        "HASTARII",
        "FUSILIERS",
        "ADEPTUS MECHANICUS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "4",
          "SV": "3+",
          "W": "2",
          "LD": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "This unit has the Doctrina Imperatives Faction ability.",
            "sourceUnitId": "unit-hastarii-fusiliers"
          },
          {
            "id": "datasheet-monocular-targeting-helms",
            "sectionId": "datasheet-monocular-targeting-helms",
            "title": "Monocular Targeting Helms",
            "text": "Each time a model in this unit attacks with a neutron fusil against a MONSTER or VEHICLE unit, that attack has Ignores Cover.",
            "sourceUnitId": "unit-hastarii-fusiliers"
          }
        ],
        "models": [
          {
            "id": "unit-hastarii-fusiliers-model-hastarii-fusilier-alpha-and-4-hastarii-fusiliers",
            "title": "Hastarii Fusilier Alpha and 4 Hastarii Fusiliers",
            "aliases": [
              "Hastarii Fusilier Alpha and 4 Hastarii Fusiliers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hastarii-fusiliers-selection-neutron-fusil",
            "title": "Neutron fusil",
            "aliases": [
              "Neutron fusil"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-fusiliers-profile-neutron-fusil-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-fusiliers-selection-hastarii-phosphor-blaster",
            "title": "Hastarii phosphor blaster",
            "aliases": [
              "Hastarii phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-fusiliers-profile-hastarii-phosphor-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-fusiliers-selection-close-combat-weapon",
            "title": "Close-combat weapon",
            "aliases": [
              "Close-combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-fusiliers-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hastarii-fusiliers-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hastarii-fusiliers-profile-power-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-hastarii-fusiliers-profile-neutron-fusil-ranged",
            "title": "Neutron fusil",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hastarii-fusiliers-selection-neutron-fusil"
            ]
          },
          {
            "id": "unit-hastarii-fusiliers-profile-hastarii-phosphor-blaster-ranged-2",
            "title": "Hastarii phosphor blaster",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-hastarii-fusiliers-selection-hastarii-phosphor-blaster"
            ]
          },
          {
            "id": "unit-hastarii-fusiliers-profile-close-combat-weapon-melee-3",
            "title": "Close-combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hastarii-fusiliers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-hastarii-fusiliers-profile-power-weapon-melee-4",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hastarii-fusiliers-selection-power-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kataphron-breachers",
      "title": "Kataphron Breachers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Breachers",
        "Kataphron",
        "Infantry",
        "Adeptus Mechanicus",
        "Imperium",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "5\"",
          "T": "7",
          "Sv": "3+",
          "W": "3",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-breaching-command",
            "sectionId": "datasheet-breaching-command",
            "title": "Breaching Command",
            "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. While this unit is within 6” of one or more friendly Adeptus Mechanicus Battleline units, you can re-roll the Hit roll instead.",
            "sourceUnitId": "unit-kataphron-breachers"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-kataphron-breachers"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-kataphron-breachers-selection-arc-claw",
            "title": "Arc claw",
            "aliases": [
              "Arc claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-breachers-profile-arc-claw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-breachers-selection-heavy-arc-rifle",
            "title": "Heavy arc rifle",
            "aliases": [
              "Heavy arc rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-breachers-profile-heavy-arc-rifle-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-breachers-selection-hydraulic-claw",
            "title": "Hydraulic claw",
            "aliases": [
              "Hydraulic claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-breachers-profile-hydraulic-claw-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-breachers-selection-torsion-cannon",
            "title": "Torsion cannon",
            "aliases": [
              "Torsion cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-breachers-profile-torsion-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kataphron-breachers-profile-arc-claw-melee",
            "title": "Arc claw",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Anti-Vehicle 4+",
            "sourceSelectionIds": [
              "unit-kataphron-breachers-selection-arc-claw"
            ]
          },
          {
            "id": "unit-kataphron-breachers-profile-heavy-arc-rifle-ranged-2",
            "title": "Heavy arc rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "Anti-Vehicle 4+, Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-kataphron-breachers-selection-heavy-arc-rifle"
            ]
          },
          {
            "id": "unit-kataphron-breachers-profile-hydraulic-claw-melee-3",
            "title": "Hydraulic claw",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kataphron-breachers-selection-hydraulic-claw"
            ]
          },
          {
            "id": "unit-kataphron-breachers-profile-torsion-cannon-ranged-4",
            "title": "Torsion cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D3",
            "skill": "4+",
            "s": "6",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Infantry 2+, Blast",
            "sourceSelectionIds": [
              "unit-kataphron-breachers-selection-torsion-cannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kataphron-destroyers",
      "title": "Kataphron Destroyers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Destroyers",
        "Kataphron",
        "Infantry",
        "Adeptus Mechanicus",
        "Imperium",
        "Cult Mechanicus"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist",
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
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-sentinel-directive",
            "sectionId": "datasheet-sentinel-directive",
            "title": "Sentinel Directive",
            "text": "Each time you target this unit with the Fire Overwatch Stratagem, hits are scored on unmodified Hit rolls of 5+ when resolving that Stratagem.",
            "sourceUnitId": "unit-kataphron-destroyers"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-kataphron-destroyers"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-kataphron-destroyers-selection-heavy-grav-cannon",
            "title": "Heavy grav-cannon",
            "aliases": [
              "Heavy grav-cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-heavy-grav-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-selection-cognis-flamer",
            "title": "Cognis flamer",
            "aliases": [
              "Cognis flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-cognis-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-selection-phosphor-blaster",
            "title": "Phosphor blaster",
            "aliases": [
              "Phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-phosphor-blaster-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-selection-kataphron-plasma-culverin-standard",
            "title": "➤ Kataphron plasma culverin - standard",
            "aliases": [
              "➤ Kataphron plasma culverin - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-selection-kataphron-plasma-culverin-supercharge",
            "title": "➤ Kataphron plasma culverin - supercharge",
            "aliases": [
              "➤ Kataphron plasma culverin - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kataphron-destroyers-weapon-family-kataphron-plasma-culverin-selection",
            "title": "➤ Kataphron plasma culverin",
            "aliases": [
              "➤ Kataphron plasma culverin"
            ],
            "kind": "weapon",
            "familyId": "unit-kataphron-destroyers-weapon-family-kataphron-plasma-culverin",
            "profileIds": [
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-standard-ranged-5",
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-supercharge-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-kataphron-destroyers-weapon-family-kataphron-plasma-culverin",
            "title": "➤ Kataphron plasma culverin",
            "aliases": [
              "➤ Kataphron plasma culverin"
            ],
            "profileIds": [
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-standard-ranged-5",
              "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-supercharge-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-kataphron-destroyers-profile-heavy-grav-cannon-ranged",
            "title": "Heavy grav-cannon",
            "mode": "ranged",
            "range": "30\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Vehicle 2+",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-heavy-grav-cannon"
            ]
          },
          {
            "id": "unit-kataphron-destroyers-profile-cognis-flamer-ranged-2",
            "title": "Cognis flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-cognis-flamer"
            ]
          },
          {
            "id": "unit-kataphron-destroyers-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-kataphron-destroyers-profile-phosphor-blaster-ranged-4",
            "title": "Phosphor blaster",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-phosphor-blaster"
            ]
          },
          {
            "id": "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-standard-ranged-5",
            "title": "➤ Kataphron plasma culverin - standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "4",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-kataphron-plasma-culverin-standard",
              "unit-kataphron-destroyers-weapon-family-kataphron-plasma-culverin-selection"
            ]
          },
          {
            "id": "unit-kataphron-destroyers-profile-kataphron-plasma-culverin-supercharge-ranged-6",
            "title": "➤ Kataphron plasma culverin - supercharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "4",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "2",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-kataphron-destroyers-selection-kataphron-plasma-culverin-supercharge",
              "unit-kataphron-destroyers-weapon-family-kataphron-plasma-culverin-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-pteraxii-skystalkers",
      "title": "Pteraxii Skystalkers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Skystalkers",
        "Imperium",
        "Adeptus Mechanicus",
        "Infantry",
        "Fly",
        "Jump Pack",
        "Grenades",
        "Skitarii",
        "Pteraxii"
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
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-ride-the-thermals",
            "sectionId": "datasheet-ride-the-thermals",
            "title": "Ride the Thermals",
            "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of one or more enemy units, it can do one of the following:\n- Make a Normal move of up to 6\".\n- Make a Normal move of up to 12\", provided every model in this unit ends that move wholly within 6\" of one or more friendly Adeptus Mechanicus Battleline units.\n\nIn either case, if it does, until the end of the turn, this unit is not eligible to declare a charge.",
            "sourceUnitId": "unit-pteraxii-skystalkers"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "",
            "sourceUnitId": "unit-pteraxii-skystalkers"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-pteraxii-skystalkers"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-pteraxii-skystalkers-selection-flechette-blaster",
            "title": "Flechette blaster",
            "aliases": [
              "Flechette blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-skystalkers-profile-flechette-blaster-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-skystalkers-selection-taser-goad",
            "title": "Taser goad",
            "aliases": [
              "Taser goad"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-skystalkers-profile-taser-goad-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-skystalkers-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-skystalkers-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-skystalkers-selection-flechette-carbine",
            "title": "Flechette carbine",
            "aliases": [
              "Flechette carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-skystalkers-profile-flechette-carbine-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-pteraxii-skystalkers-profile-flechette-blaster-ranged",
            "title": "Flechette blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "5",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-pteraxii-skystalkers-selection-flechette-blaster"
            ]
          },
          {
            "id": "unit-pteraxii-skystalkers-profile-taser-goad-melee-2",
            "title": "Taser goad",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-pteraxii-skystalkers-selection-taser-goad"
            ]
          },
          {
            "id": "unit-pteraxii-skystalkers-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pteraxii-skystalkers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-pteraxii-skystalkers-profile-flechette-carbine-ranged-4",
            "title": "Flechette carbine",
            "mode": "ranged",
            "range": "18\"",
            "a": "6",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pteraxii-skystalkers-selection-flechette-carbine"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-pteraxii-sterylizors",
      "title": "Pteraxii Sterylizors",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Sterylizors",
        "Imperium",
        "Infantry",
        "Fly",
        "Jump Pack",
        "Skitarii",
        "Adeptus Mechanicus",
        "Pteraxii"
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
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-searing-conflagration",
            "sectionId": "datasheet-searing-conflagration",
            "title": "Searing Conflagration",
            "text": "Each time a model in this unit makes an attack with a phosphor torch that targets an enemy unit within range of an objective marker, re-roll a Wound roll of 1. If this unit is also within 6\" of one or more friendly Adeptus Mechanicus Battleline units, each time such an attack targets such a unit, you can re-roll the Wound roll instead.",
            "sourceUnitId": "unit-pteraxii-sterylizors"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "",
            "sourceUnitId": "unit-pteraxii-sterylizors"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-pteraxii-sterylizors"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-pteraxii-sterylizors-selection-flechette-blaster",
            "title": "Flechette blaster",
            "aliases": [
              "Flechette blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-sterylizors-profile-flechette-blaster-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-sterylizors-selection-taser-goad",
            "title": "Taser goad",
            "aliases": [
              "Taser goad"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-sterylizors-profile-taser-goad-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-sterylizors-selection-pteraxii-talons",
            "title": "Pteraxii talons",
            "aliases": [
              "Pteraxii talons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-sterylizors-profile-pteraxii-talons-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pteraxii-sterylizors-selection-phosphor-torch",
            "title": "Phosphor torch",
            "aliases": [
              "Phosphor torch"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pteraxii-sterylizors-profile-phosphor-torch-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-pteraxii-sterylizors-profile-flechette-blaster-ranged",
            "title": "Flechette blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "5",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-pteraxii-sterylizors-selection-flechette-blaster"
            ]
          },
          {
            "id": "unit-pteraxii-sterylizors-profile-taser-goad-melee-2",
            "title": "Taser goad",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-pteraxii-sterylizors-selection-taser-goad"
            ]
          },
          {
            "id": "unit-pteraxii-sterylizors-profile-pteraxii-talons-melee-3",
            "title": "Pteraxii talons",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pteraxii-sterylizors-selection-pteraxii-talons"
            ]
          },
          {
            "id": "unit-pteraxii-sterylizors-profile-phosphor-torch-ranged-4",
            "title": "Phosphor torch",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-pteraxii-sterylizors-selection-phosphor-torch"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-servitor-battleclade",
      "title": "Servitor Battleclade",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Faction Pack",
      "intrinsicKeywords": [
        "INFANTRY",
        "IMPERIUM",
        "CULT MECHANICUS",
        "SERVITOR BATTLECLADE",
        "TECH-PRIEST",
        "ADEPTUS MECHANICUS"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-tech-priest-dominus",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-enginseer",
            "maxCharacters": 2
          },
          {
            "unitId": "unit-tech-priest-manipulus",
            "maxCharacters": 2
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist",
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
              "unitId": "unit-tech-priest-dominus",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-enginseer",
              "maxCharacters": 2
            },
            {
              "unitId": "unit-tech-priest-manipulus",
              "maxCharacters": 2
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist",
              "maxCharacters": 2
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "4",
          "SV": "4+",
          "W": "2",
          "LD": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "This unit has the Doctrina Imperatives Faction ability.",
            "sourceUnitId": "unit-servitor-battleclade"
          },
          {
            "id": "datasheet-network-override",
            "sectionId": "datasheet-network-override",
            "title": "Network Override",
            "text": "While this unit contains one or more TECH-PRIEST models, it can perform an Action after Advancing and is eligible to shoot in a turn in which it started an Action.",
            "sourceUnitId": "unit-servitor-battleclade"
          }
        ],
        "models": [
          {
            "id": "unit-servitor-battleclade-model-servitor-underseer-2-gun-servitors-and-6-combat-servitors",
            "title": "Servitor Underseer, 2 Gun Servitors and 6 Combat Servitors",
            "aliases": [
              "Servitor Underseer, 2 Gun Servitors and 6 Combat Servitors"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-servitor-battleclade-selection-heavy-arc-rifle",
            "title": "Heavy arc rifle",
            "aliases": [
              "Heavy arc rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-heavy-arc-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-heavy-bolter",
            "title": "Heavy bolter",
            "aliases": [
              "Heavy bolter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-heavy-bolter-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-incendine-igniter",
            "title": "Incendine igniter",
            "aliases": [
              "Incendine igniter"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-incendine-igniter-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-mechanicus-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-meltagun",
            "title": "Meltagun",
            "aliases": [
              "Meltagun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-meltagun-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-phosphor-blaster",
            "title": "Phosphor blaster",
            "aliases": [
              "Phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-phosphor-blaster-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-dataspikes",
            "title": "Dataspikes",
            "aliases": [
              "Dataspikes"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-dataspikes-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-servitor-battleclade-selection-servo-claw",
            "title": "Servo-claw",
            "aliases": [
              "Servo-claw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-servitor-battleclade-profile-servo-claw-melee-8"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-servitor-battleclade-profile-heavy-arc-rifle-ranged",
            "title": "Heavy arc rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "Anti-Vehicle 4+, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-heavy-arc-rifle"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-heavy-bolter-ranged-2",
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
              "unit-servitor-battleclade-selection-heavy-bolter"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-incendine-igniter-ranged-3",
            "title": "Incendine igniter",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-incendine-igniter"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-mechanicus-pistol-ranged-4",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-mechanicus-pistol"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-meltagun-ranged-5",
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
              "unit-servitor-battleclade-selection-meltagun"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-phosphor-blaster-ranged-6",
            "title": "Phosphor blaster",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-phosphor-blaster"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-dataspikes-melee-7",
            "title": "Dataspikes",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-dataspikes"
            ]
          },
          {
            "id": "unit-servitor-battleclade-profile-servo-claw-melee-8",
            "title": "Servo-claw",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-servitor-battleclade-selection-servo-claw"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sicarian-infiltrators",
      "title": "Sicarian Infiltrators",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Infantry",
        "Sicarian",
        "Infiltrators"
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
          "T": "4",
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-neurostatic-interference-aura",
            "sectionId": "datasheet-neurostatic-interference-aura",
            "title": "Neurostatic Interference (Aura)",
            "text": "While an enemy unit is within 6\" of this unit, each time a Battle-shock or Leadership test is taken for that unit, subtract 1 from that test. While this unit is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 2 from that test instead.",
            "sourceUnitId": "unit-sicarian-infiltrators"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "",
            "sourceUnitId": "unit-sicarian-infiltrators"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-sicarian-infiltrators"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sicarian-infiltrators"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-sicarian-infiltrators-selection-power-weapon",
            "title": "Power weapon",
            "aliases": [
              "Power weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-infiltrators-profile-power-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sicarian-infiltrators-selection-stubcarbine",
            "title": "Stubcarbine",
            "aliases": [
              "Stubcarbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-infiltrators-profile-stubcarbine-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sicarian-infiltrators-selection-flechette-blaster",
            "title": "Flechette blaster",
            "aliases": [
              "Flechette blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-infiltrators-profile-flechette-blaster-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sicarian-infiltrators-selection-taser-goad",
            "title": "Taser goad",
            "aliases": [
              "Taser goad"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-infiltrators-profile-taser-goad-melee-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sicarian-infiltrators-profile-power-weapon-melee",
            "title": "Power weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "4",
            "ap": "-2",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sicarian-infiltrators-selection-power-weapon"
            ]
          },
          {
            "id": "unit-sicarian-infiltrators-profile-stubcarbine-ranged-2",
            "title": "Stubcarbine",
            "mode": "ranged",
            "range": "12\"",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-sicarian-infiltrators-selection-stubcarbine"
            ]
          },
          {
            "id": "unit-sicarian-infiltrators-profile-flechette-blaster-ranged-3",
            "title": "Flechette blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "5",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-sicarian-infiltrators-selection-flechette-blaster"
            ]
          },
          {
            "id": "unit-sicarian-infiltrators-profile-taser-goad-melee-4",
            "title": "Taser goad",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-sicarian-infiltrators-selection-taser-goad"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sicarian-ruststalkers",
      "title": "Sicarian Ruststalkers",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Ruststalkers",
        "Imperium",
        "Adeptus Mechanicus",
        "Infantry",
        "Skitarii",
        "Sicarian"
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
          "T": "4",
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "1"
        },
        "abilities": [
          {
            "id": "datasheet-optimised-gait",
            "sectionId": "datasheet-optimised-gait",
            "title": "Optimised Gait",
            "text": "Add 1 to Advance and Charge rolls made for this unit. While this unit is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, add 2 to Advance and Charge rolls made for this unit instead.",
            "sourceUnitId": "unit-sicarian-ruststalkers"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-sicarian-ruststalkers"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sicarian-ruststalkers"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-sicarian-ruststalkers-selection-transonic-razor-chordclaw",
            "title": "Transonic razor & chordclaw",
            "aliases": [
              "Transonic razor & chordclaw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-ruststalkers-profile-transonic-razor-chordclaw-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sicarian-ruststalkers-selection-transonic-blades",
            "title": "Transonic blades",
            "aliases": [
              "Transonic blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-ruststalkers-profile-transonic-blades-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sicarian-ruststalkers-selection-transonic-blades-chordclaw",
            "title": "Transonic blades & chordclaw",
            "aliases": [
              "Transonic blades & chordclaw"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sicarian-ruststalkers-profile-transonic-blades-chordclaw-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sicarian-ruststalkers-profile-transonic-razor-chordclaw-melee",
            "title": "Transonic razor & chordclaw",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Infantry 3+, Precision",
            "sourceSelectionIds": [
              "unit-sicarian-ruststalkers-selection-transonic-razor-chordclaw"
            ]
          },
          {
            "id": "unit-sicarian-ruststalkers-profile-transonic-blades-melee-2",
            "title": "Transonic blades",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-sicarian-ruststalkers-selection-transonic-blades"
            ]
          },
          {
            "id": "unit-sicarian-ruststalkers-profile-transonic-blades-chordclaw-melee-3",
            "title": "Transonic blades & chordclaw",
            "mode": "melee",
            "range": "Melee",
            "a": "5",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "1",
            "abilities": "Anti-Infantry 3+, Devastating Wounds, Precision",
            "sourceSelectionIds": [
              "unit-sicarian-ruststalkers-selection-transonic-blades-chordclaw"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-serberys-raiders",
      "title": "Serberys Raiders",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Serberys Raiders",
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Mounted"
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
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-tactica-obliqua",
            "sectionId": "datasheet-tactica-obliqua",
            "title": "Tactica Obliqua",
            "text": "In your opponent's Movement phase, if an enemy unit ends a move within 8” of this unit, if this unit is not within Engagement Range of one or more enemy units, it can do one of the following:\n- Make a Normal move of up to D6\".\n- Make a Normal move of up to 6\", provided every model in this unit ends that move wholly within 6\" of one or more friendly Adeptus Mechanicus Battleline units.",
            "sourceUnitId": "unit-serberys-raiders"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 9\"",
            "text": "",
            "sourceUnitId": "unit-serberys-raiders"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-serberys-raiders"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-serberys-raiders"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-serberys-raiders-selection-galvanic-carbine",
            "title": "Galvanic carbine",
            "aliases": [
              "Galvanic carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-raiders-profile-galvanic-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-raiders-selection-cavalry-sabre-clawed-limbs",
            "title": "Cavalry sabre & clawed limbs",
            "aliases": [
              "Cavalry sabre & clawed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-raiders-profile-cavalry-sabre-clawed-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-raiders-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-raiders-profile-mechanicus-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-raiders-selection-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "aliases": [
              "Enhanced data-tether"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-serberys-raiders-wargear-ability-enhanced-data-tether"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-serberys-raiders-profile-galvanic-carbine-ranged",
            "title": "Galvanic carbine",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-serberys-raiders-selection-galvanic-carbine"
            ]
          },
          {
            "id": "unit-serberys-raiders-profile-cavalry-sabre-clawed-limbs-melee-2",
            "title": "Cavalry sabre & clawed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-serberys-raiders-selection-cavalry-sabre-clawed-limbs"
            ]
          },
          {
            "id": "unit-serberys-raiders-profile-mechanicus-pistol-ranged-3",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-serberys-raiders-selection-mechanicus-pistol"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-serberys-raiders-wargear-ability-enhanced-data-tether",
            "title": "Enhanced data-tether",
            "requiredSelectionIds": [
              "unit-serberys-raiders-selection-enhanced-data-tether"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-serberys-sulphurhounds",
      "title": "Serberys Sulphurhounds",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Serberys Sulphurhounds",
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Mounted"
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
          "Sv": "4+",
          "W": "2",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-line-breakers",
            "sectionId": "datasheet-line-breakers",
            "title": "Line-breakers",
            "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each model in this unit that is within Engagement Range of that enemy unit, adding 2 to the result if this unit started its Charge move within 6\" of one or more friendly Adeptus Mechanicus Battleline units. For each 4+, that enemy unit suffers 1 mortal wound.",
            "sourceUnitId": "unit-serberys-sulphurhounds"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-serberys-sulphurhounds"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-serberys-sulphurhounds"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-serberys-sulphurhounds-selection-cavalry-arc-maul",
            "title": "Cavalry arc maul",
            "aliases": [
              "Cavalry arc maul"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-cavalry-arc-maul-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-sulphurhounds-selection-clawed-limbs",
            "title": "Clawed limbs",
            "aliases": [
              "Clawed limbs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-clawed-limbs-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-sulphurhounds-selection-mechanicus-pistol",
            "title": "Mechanicus pistol",
            "aliases": [
              "Mechanicus pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-mechanicus-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-sulphurhounds-selection-sulphur-breath",
            "title": "Sulphur breath",
            "aliases": [
              "Sulphur breath"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-sulphur-breath-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-sulphurhounds-selection-phosphor-pistol",
            "title": "Phosphor pistol",
            "aliases": [
              "Phosphor pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-phosphor-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-serberys-sulphurhounds-selection-phosphor-blast-carbine",
            "title": "Phosphor blast carbine",
            "aliases": [
              "Phosphor blast carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-serberys-sulphurhounds-profile-phosphor-blast-carbine-ranged-6"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-serberys-sulphurhounds-profile-cavalry-arc-maul-melee",
            "title": "Cavalry arc maul",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds, Extra Attacks",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-cavalry-arc-maul"
            ]
          },
          {
            "id": "unit-serberys-sulphurhounds-profile-clawed-limbs-melee-2",
            "title": "Clawed limbs",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-clawed-limbs"
            ]
          },
          {
            "id": "unit-serberys-sulphurhounds-profile-mechanicus-pistol-ranged-3",
            "title": "Mechanicus pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Devastating Wounds, Pistol",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-mechanicus-pistol"
            ]
          },
          {
            "id": "unit-serberys-sulphurhounds-profile-sulphur-breath-ranged-4",
            "title": "Sulphur breath",
            "mode": "ranged",
            "range": "9\"",
            "a": "D6",
            "skill": "N/A",
            "s": "3",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Pistol, Torrent",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-sulphur-breath"
            ]
          },
          {
            "id": "unit-serberys-sulphurhounds-profile-phosphor-pistol-ranged-5",
            "title": "Phosphor pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-phosphor-pistol"
            ]
          },
          {
            "id": "unit-serberys-sulphurhounds-profile-phosphor-blast-carbine-ranged-6",
            "title": "Phosphor blast carbine",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Ignores cover",
            "sourceSelectionIds": [
              "unit-serberys-sulphurhounds-selection-phosphor-blast-carbine"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-archaeopter-fusilave",
      "title": "Archaeopter Fusilave",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Archaeopter Fusilave",
        "Vehicle",
        "Aircraft",
        "Fly",
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii"
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
          "Ld": "7+",
          "OC": "-"
        },
        "abilities": [
          {
            "id": "datasheet-bomb-rack",
            "sectionId": "datasheet-bomb-rack",
            "title": "Bomb Rack",
            "text": "At the end of your opponent’s Fight phase, select one visible enemy unit (excluding Lone Operative units) within 24\" of this unit, and roll six D6 for that unit: for each 4+, that unit suffers 1 mortal wound.",
            "sourceUnitId": "unit-archaeopter-fusilave"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-archaeopter-fusilave"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-archaeopter-fusilave"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-archaeopter-fusilave-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-fusilave-profile-armoured-hull-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-fusilave-selection-cognis-heavy-stubber-array",
            "title": "Cognis heavy stubber array",
            "aliases": [
              "Cognis heavy stubber array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-fusilave-profile-cognis-heavy-stubber-array-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-fusilave-selection-chaff-launcher",
            "title": "Chaff Launcher",
            "aliases": [
              "Chaff Launcher"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-fusilave-wargear-ability-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-fusilave-selection-command-uplink",
            "title": "Command Uplink",
            "aliases": [
              "Command Uplink"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-fusilave-wargear-ability-command-uplink-2"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-archaeopter-fusilave-profile-armoured-hull-melee",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-archaeopter-fusilave-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-archaeopter-fusilave-profile-cognis-heavy-stubber-array-ranged-2",
            "title": "Cognis heavy stubber array",
            "mode": "ranged",
            "range": "36\"",
            "a": "9",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 9, Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-archaeopter-fusilave-selection-cognis-heavy-stubber-array"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-archaeopter-fusilave-wargear-ability-chaff-launcher",
            "title": "Chaff Launcher",
            "requiredSelectionIds": [
              "unit-archaeopter-fusilave-selection-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-fusilave-wargear-ability-command-uplink-2",
            "title": "Command Uplink",
            "requiredSelectionIds": [
              "unit-archaeopter-fusilave-selection-command-uplink"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-archaeopter-stratoraptor",
      "title": "Archaeopter Stratoraptor",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Archaeopter Stratoraptor",
        "Skitarii",
        "Vehicle",
        "Aircraft",
        "Fly",
        "Imperium",
        "Adeptus Mechanicus"
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
          "Ld": "7+",
          "OC": "-"
        },
        "abilities": [
          {
            "id": "datasheet-strafing-run",
            "sectionId": "datasheet-strafing-run",
            "title": "Strafing Run",
            "text": "Each time this model makes a ranged attack that targets an enemy unit (excluding units that can Fly), add 1 to the Hit roll.",
            "sourceUnitId": "unit-archaeopter-stratoraptor"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-archaeopter-stratoraptor"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-archaeopter-stratoraptor"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-archaeopter-stratoraptor-selection-cognis-heavy-stubber",
            "title": "Cognis heavy stubber",
            "aliases": [
              "Cognis heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-stratoraptor-profile-cognis-heavy-stubber-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-stratoraptor-selection-heavy-phosphor-blaster",
            "title": "Heavy phosphor blaster",
            "aliases": [
              "Heavy phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-stratoraptor-profile-heavy-phosphor-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-stratoraptor-selection-twin-cognis-lascannon",
            "title": "Twin cognis lascannon",
            "aliases": [
              "Twin cognis lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-stratoraptor-profile-twin-cognis-lascannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-stratoraptor-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-stratoraptor-profile-armoured-hull-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-stratoraptor-selection-chaff-launcher",
            "title": "Chaff Launcher",
            "aliases": [
              "Chaff Launcher"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-stratoraptor-wargear-ability-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-stratoraptor-selection-command-uplink",
            "title": "Command Uplink",
            "aliases": [
              "Command Uplink"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-stratoraptor-wargear-ability-command-uplink-2"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-archaeopter-stratoraptor-profile-cognis-heavy-stubber-ranged",
            "title": "Cognis heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-cognis-heavy-stubber"
            ]
          },
          {
            "id": "unit-archaeopter-stratoraptor-profile-heavy-phosphor-blaster-ranged-2",
            "title": "Heavy phosphor blaster",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-heavy-phosphor-blaster"
            ]
          },
          {
            "id": "unit-archaeopter-stratoraptor-profile-twin-cognis-lascannon-ranged-3",
            "title": "Twin cognis lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Sustained hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-twin-cognis-lascannon"
            ]
          },
          {
            "id": "unit-archaeopter-stratoraptor-profile-armoured-hull-melee-4",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-archaeopter-stratoraptor-wargear-ability-chaff-launcher",
            "title": "Chaff Launcher",
            "requiredSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-stratoraptor-wargear-ability-command-uplink-2",
            "title": "Command Uplink",
            "requiredSelectionIds": [
              "unit-archaeopter-stratoraptor-selection-command-uplink"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-archaeopter-transvector",
      "title": "Archaeopter Transvector",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Archaeopter Transvector",
        "Adeptus Mechanicus",
        "Vehicle",
        "Fly",
        "Imperium",
        "Skitarii",
        "Transport"
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
          "W": "10",
          "Ld": "7+",
          "OC": "0"
        },
        "abilities": [
          {
            "id": "datasheet-aerial-deployment",
            "sectionId": "datasheet-aerial-deployment",
            "title": "Aerial Deployment",
            "text": "In your first Movement phase, this unit can make an ingress move.",
            "sourceUnitId": "unit-archaeopter-transvector"
          },
          {
            "id": "core-hover",
            "sectionId": "core-hover",
            "title": "Hover",
            "text": "",
            "sourceUnitId": "unit-archaeopter-transvector"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "",
            "sourceUnitId": "unit-archaeopter-transvector"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-archaeopter-transvector"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-archaeopter-transvector"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-archaeopter-transvector-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-transvector-profile-armoured-hull-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-transvector-selection-cognis-heavy-stubber-array",
            "title": "Cognis heavy stubber array",
            "aliases": [
              "Cognis heavy stubber array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-archaeopter-transvector-profile-cognis-heavy-stubber-array-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-archaeopter-transvector-selection-chaff-launcher",
            "title": "Chaff Launcher",
            "aliases": [
              "Chaff Launcher"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-transvector-wargear-ability-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-transvector-selection-command-uplink",
            "title": "Command Uplink",
            "aliases": [
              "Command Uplink"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-archaeopter-transvector-wargear-ability-command-uplink-2"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-archaeopter-transvector-profile-armoured-hull-melee",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-archaeopter-transvector-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-archaeopter-transvector-profile-cognis-heavy-stubber-array-ranged-2",
            "title": "Cognis heavy stubber array",
            "mode": "ranged",
            "range": "36\"",
            "a": "9",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 9, Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-archaeopter-transvector-selection-cognis-heavy-stubber-array"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-archaeopter-transvector-wargear-ability-chaff-launcher",
            "title": "Chaff Launcher",
            "requiredSelectionIds": [
              "unit-archaeopter-transvector-selection-chaff-launcher"
            ]
          },
          {
            "id": "unit-archaeopter-transvector-wargear-ability-command-uplink-2",
            "title": "Command Uplink",
            "requiredSelectionIds": [
              "unit-archaeopter-transvector-selection-command-uplink"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-ironstrider-ballistarii",
      "title": "Ironstrider Ballistarii",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Ironstrider Ballistarii",
        "Vehicle",
        "Smoke",
        "Skitarii",
        "Adeptus Mechanicus",
        "Walker",
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
          "M": "10\"",
          "T": "7",
          "Sv": "3+",
          "W": "7",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-elevated-strider",
            "sectionId": "datasheet-elevated-strider",
            "title": "Elevated Strider",
            "text": "This unit is eligible to shoot in a turn in which it Fell Back or Advanced, and you can re-roll Desperate Escape tests taken for models in this unit.",
            "sourceUnitId": "unit-ironstrider-ballistarii"
          },
          {
            "id": "datasheet-broad-spectrum-data-tether",
            "sectionId": "datasheet-broad-spectrum-data-tether",
            "title": "Broad Spectrum Data-tether",
            "text": "Each time you target this unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-ironstrider-ballistarii"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "",
            "sourceUnitId": "unit-ironstrider-ballistarii"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-ironstrider-ballistarii"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-ironstrider-ballistarii"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-ironstrider-ballistarii-selection-twin-cognis-autocannon",
            "title": "Twin cognis autocannon",
            "aliases": [
              "Twin cognis autocannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ironstrider-ballistarii-profile-twin-cognis-autocannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ironstrider-ballistarii-selection-ironstrider-feet",
            "title": "Ironstrider feet",
            "aliases": [
              "Ironstrider feet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ironstrider-ballistarii-profile-ironstrider-feet-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ironstrider-ballistarii-selection-twin-cognis-lascannon",
            "title": "Twin cognis lascannon",
            "aliases": [
              "Twin cognis lascannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ironstrider-ballistarii-profile-twin-cognis-lascannon-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-ironstrider-ballistarii-profile-twin-cognis-autocannon-ranged",
            "title": "Twin cognis autocannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "4",
            "skill": "4+",
            "s": "9",
            "ap": "-1",
            "d": "3",
            "abilities": "Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-ironstrider-ballistarii-selection-twin-cognis-autocannon"
            ]
          },
          {
            "id": "unit-ironstrider-ballistarii-profile-ironstrider-feet-melee-2",
            "title": "Ironstrider feet",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ironstrider-ballistarii-selection-ironstrider-feet"
            ]
          },
          {
            "id": "unit-ironstrider-ballistarii-profile-twin-cognis-lascannon-ranged-3",
            "title": "Twin cognis lascannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Sustained Hits 1, Twin-linked",
            "sourceSelectionIds": [
              "unit-ironstrider-ballistarii-selection-twin-cognis-lascannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kastelan-robots",
      "title": "Kastelan Robots",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Kastelan Robots",
        "Adeptus Mechanicus",
        "Imperium",
        "Vehicle",
        "Walker",
        "Legio Cybernetica"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [],
        "canBeSupportedBy": [
          {
            "unitId": "unit-cybernetica-datasmith",
            "maxCharacters": 1,
            "removeKeywords": [
              "INFANTRY"
            ]
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": [
            {
              "unitId": "unit-cybernetica-datasmith",
              "maxCharacters": 1,
              "removeKeywords": [
                "INFANTRY"
              ]
            }
          ]
        }
      },
      "gameSelections": {
        "stats": {
          "M": "6\"",
          "T": "9",
          "Sv": "2+",
          "W": "7",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-robotic-bodyguard",
            "sectionId": "datasheet-robotic-bodyguard",
            "title": "Robotic Bodyguard",
            "text": "While a Cybernetica Datasmith model is leading this unit, that model has the Feel No Pain 4+ ability.",
            "sourceUnitId": "unit-kastelan-robots"
          },
          {
            "id": "datasheet-repulsor-grid",
            "sectionId": "datasheet-repulsor-grid",
            "title": "Repulsor Grid",
            "text": "When an enemy unit targets this unit with ranged attacks, until that enemy unit has shot, when this unit makes a save roll: \n- On an unmodified 6, that enemy unit suffers 1 mortal wound after that enemy unit has shot.",
            "sourceUnitId": "unit-kastelan-robots"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "",
            "sourceUnitId": "unit-kastelan-robots"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-kastelan-robots"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-kastelan-robots-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-twin-kastelan-phosphor-blaster",
            "title": "Twin Kastelan phosphor blaster",
            "aliases": [
              "Twin Kastelan phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-twin-kastelan-phosphor-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-twin-kastelan-fist",
            "title": "Twin Kastelan fist",
            "aliases": [
              "Twin Kastelan fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-twin-kastelan-fist-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-kastelan-fist",
            "title": "Kastelan fist",
            "aliases": [
              "Kastelan fist"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-kastelan-fist-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-kastelan-phosphor-blaster",
            "title": "Kastelan phosphor blaster",
            "aliases": [
              "Kastelan phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-kastelan-phosphor-blaster-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-incendine-combustor",
            "title": "Incendine combustor",
            "aliases": [
              "Incendine combustor"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-incendine-combustor-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kastelan-robots-selection-heavy-phosphor-blaster",
            "title": "Heavy phosphor blaster",
            "aliases": [
              "Heavy phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kastelan-robots-profile-heavy-phosphor-blaster-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kastelan-robots-profile-close-combat-weapon-melee",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-twin-kastelan-phosphor-blaster-ranged-2",
            "title": "Twin Kastelan phosphor blaster",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Twin-linked",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-twin-kastelan-phosphor-blaster"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-twin-kastelan-fist-melee-3",
            "title": "Twin Kastelan fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-twin-kastelan-fist"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-kastelan-fist-melee-4",
            "title": "Kastelan fist",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "12",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-kastelan-fist"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-kastelan-phosphor-blaster-ranged-5",
            "title": "Kastelan phosphor blaster",
            "mode": "ranged",
            "range": "24\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-kastelan-phosphor-blaster"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-incendine-combustor-ranged-6",
            "title": "Incendine combustor",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-incendine-combustor"
            ]
          },
          {
            "id": "unit-kastelan-robots-profile-heavy-phosphor-blaster-ranged-7",
            "title": "Heavy phosphor blaster",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover",
            "sourceSelectionIds": [
              "unit-kastelan-robots-selection-heavy-phosphor-blaster"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-onager-dunecrawler",
      "title": "Onager Dunecrawler",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Onager Dunecrawler",
        "Imperium",
        "Vehicle",
        "Walker",
        "Skitarii",
        "Adeptus Mechanicus",
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
          "M": "8\"",
          "T": "10",
          "Sv": "2+",
          "W": "11",
          "Ld": "7+",
          "OC": "3"
        },
        "abilities": [
          {
            "id": "datasheet-emanatus-forcefield-aura",
            "sectionId": "datasheet-emanatus-forcefield-aura",
            "title": "Emanatus Forcefield (Aura)",
            "text": "While a friendly Adeptus Mechanicus Battleline model is wholly within 6\" of this model, that Battleline model has a 4+ invulnerable save against ranged attacks.",
            "sourceUnitId": "unit-onager-dunecrawler"
          },
          {
            "id": "datasheet-damaged-1-4-wounds-remaining",
            "sectionId": "datasheet-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-onager-dunecrawler"
          },
          {
            "id": "datasheet-scuttling-walker",
            "sectionId": "datasheet-scuttling-walker",
            "title": "Scuttling Walker",
            "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move through friendly Monster and Vehicle models and sections of terrain features that are 4\" or less in height.",
            "sourceUnitId": "unit-onager-dunecrawler"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-onager-dunecrawler"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-onager-dunecrawler"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-onager-dunecrawler-selection-cognis-heavy-stubber",
            "title": "Cognis heavy stubber",
            "aliases": [
              "Cognis heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-cognis-heavy-stubber-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-dunecrawler-legs",
            "title": "Dunecrawler legs",
            "aliases": [
              "Dunecrawler legs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-dunecrawler-legs-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-eradication-beamer-dissipated",
            "title": "➤ Eradication beamer - dissipated",
            "aliases": [
              "➤ Eradication beamer - dissipated"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-eradication-beamer-dissipated-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-eradication-beamer-focused",
            "title": "➤ Eradication beamer - focused",
            "aliases": [
              "➤ Eradication beamer - focused"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-eradication-beamer-focused-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-daedalus-missile-launcher",
            "title": "Daedalus missile launcher",
            "aliases": [
              "Daedalus missile launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-daedalus-missile-launcher-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-icarus-array",
            "title": "Icarus array",
            "aliases": [
              "Icarus array"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-icarus-array-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-neutron-laser",
            "title": "Neutron laser",
            "aliases": [
              "Neutron laser"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-neutron-laser-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-twin-onager-heavy-phosphor-blaster",
            "title": "Twin Onager heavy phosphor blaster",
            "aliases": [
              "Twin Onager heavy phosphor blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-onager-dunecrawler-profile-twin-onager-heavy-phosphor-blaster-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-weapon-family-eradication-beamer-selection",
            "title": "➤ Eradication beamer",
            "aliases": [
              "➤ Eradication beamer"
            ],
            "kind": "weapon",
            "familyId": "unit-onager-dunecrawler-weapon-family-eradication-beamer",
            "profileIds": [
              "unit-onager-dunecrawler-profile-eradication-beamer-dissipated-ranged-3",
              "unit-onager-dunecrawler-profile-eradication-beamer-focused-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-onager-dunecrawler-selection-broad-spectrum-data-tether",
            "title": "Broad spectrum data-tether",
            "aliases": [
              "Broad spectrum data-tether"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-onager-dunecrawler-wargear-ability-broad-spectrum-data-tether"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-onager-dunecrawler-weapon-family-eradication-beamer",
            "title": "➤ Eradication beamer",
            "aliases": [
              "➤ Eradication beamer"
            ],
            "profileIds": [
              "unit-onager-dunecrawler-profile-eradication-beamer-dissipated-ranged-3",
              "unit-onager-dunecrawler-profile-eradication-beamer-focused-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-onager-dunecrawler-profile-cognis-heavy-stubber-ranged",
            "title": "Cognis heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-cognis-heavy-stubber"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-dunecrawler-legs-melee-2",
            "title": "Dunecrawler legs",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-dunecrawler-legs"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-eradication-beamer-dissipated-ranged-3",
            "title": "➤ Eradication beamer - dissipated",
            "mode": "ranged",
            "range": "36\"",
            "a": "3D3",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "2",
            "abilities": "Blast, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-eradication-beamer-dissipated",
              "unit-onager-dunecrawler-weapon-family-eradication-beamer-selection"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-eradication-beamer-focused-ranged-4",
            "title": "➤ Eradication beamer - focused",
            "mode": "ranged",
            "range": "18\"",
            "a": "3D3",
            "skill": "4+",
            "s": "10",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-eradication-beamer-focused",
              "unit-onager-dunecrawler-weapon-family-eradication-beamer-selection"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-daedalus-missile-launcher-ranged-5",
            "title": "Daedalus missile launcher",
            "mode": "ranged",
            "range": "48\"",
            "a": "2",
            "skill": "4+",
            "s": "10",
            "ap": "-2",
            "d": "D6+1",
            "abilities": "Anti-Fly 2+",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-daedalus-missile-launcher"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-icarus-array-ranged-6",
            "title": "Icarus array",
            "mode": "ranged",
            "range": "48\"",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Fly 4+, Twin-linked",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-icarus-array"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-neutron-laser-ranged-7",
            "title": "Neutron laser",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "4+",
            "s": "16",
            "ap": "-4",
            "d": "D6+2",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-neutron-laser"
            ]
          },
          {
            "id": "unit-onager-dunecrawler-profile-twin-onager-heavy-phosphor-blaster-ranged-8",
            "title": "Twin Onager heavy phosphor blaster",
            "mode": "ranged",
            "range": "36\"",
            "a": "12",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Twin-linked",
            "sourceSelectionIds": [
              "unit-onager-dunecrawler-selection-twin-onager-heavy-phosphor-blaster"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-onager-dunecrawler-wargear-ability-broad-spectrum-data-tether",
            "title": "Broad spectrum data-tether",
            "requiredSelectionIds": [
              "unit-onager-dunecrawler-selection-broad-spectrum-data-tether"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-skorpius-disintegrator",
      "title": "Skorpius Disintegrator",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Skorpius Disintegrator",
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Vehicle",
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
          "M": "10\"",
          "T": "10",
          "Sv": "2+",
          "W": "12",
          "Ld": "7+",
          "OC": "3"
        },
        "abilities": [
          {
            "id": "datasheet-broad-spectrum-data-tether",
            "sectionId": "datasheet-broad-spectrum-data-tether",
            "title": "Broad spectrum data-tether",
            "text": "Each time you target this unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-skorpius-disintegrator"
          },
          {
            "id": "datasheet-blistering-salvoes",
            "sectionId": "datasheet-blistering-salvoes",
            "title": "Blistering Salvoes",
            "text": "Each time this model makes an attack with a belleros energy cannon that targets an Infantry unit, add 1 to the Hit roll. Each time this model makes an attack with a ferrumite cannon that targets a Monster or Vehicle unit, add 1 to the Hit roll.",
            "sourceUnitId": "unit-skorpius-disintegrator"
          },
          {
            "id": "datasheet-damaged-1-4-wounds-remaining",
            "sectionId": "datasheet-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 wounds remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-skorpius-disintegrator"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "",
            "sourceUnitId": "unit-skorpius-disintegrator"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-skorpius-disintegrator"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-skorpius-disintegrator-selection-cognis-heavy-stubber",
            "title": "Cognis heavy stubber",
            "aliases": [
              "Cognis heavy stubber"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-disintegrator-profile-cognis-heavy-stubber-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skorpius-disintegrator-selection-disruptor-missile-launcher",
            "title": "Disruptor missile launcher",
            "aliases": [
              "Disruptor missile launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-disintegrator-profile-disruptor-missile-launcher-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skorpius-disintegrator-selection-belleros-energy-cannon",
            "title": "Belleros energy cannon",
            "aliases": [
              "Belleros energy cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-disintegrator-profile-belleros-energy-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skorpius-disintegrator-selection-ferrumite-cannon",
            "title": "Ferrumite cannon",
            "aliases": [
              "Ferrumite cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-disintegrator-profile-ferrumite-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-skorpius-disintegrator-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-skorpius-disintegrator-profile-armoured-hull-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-skorpius-disintegrator-profile-cognis-heavy-stubber-ranged",
            "title": "Cognis heavy stubber",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 3, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-skorpius-disintegrator-selection-cognis-heavy-stubber"
            ]
          },
          {
            "id": "unit-skorpius-disintegrator-profile-disruptor-missile-launcher-ranged-2",
            "title": "Disruptor missile launcher",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "D6",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-skorpius-disintegrator-selection-disruptor-missile-launcher"
            ]
          },
          {
            "id": "unit-skorpius-disintegrator-profile-belleros-energy-cannon-ranged-3",
            "title": "Belleros energy cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2D6",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "1",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-skorpius-disintegrator-selection-belleros-energy-cannon"
            ]
          },
          {
            "id": "unit-skorpius-disintegrator-profile-ferrumite-cannon-ranged-4",
            "title": "Ferrumite cannon",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skorpius-disintegrator-selection-ferrumite-cannon"
            ]
          },
          {
            "id": "unit-skorpius-disintegrator-profile-armoured-hull-melee-5",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-skorpius-disintegrator-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sydonian-dragoons-with-radium-jezzails",
      "title": "Sydonian Dragoons with radium jezzails",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Vehicle",
        "Walker",
        "Sydonian",
        "Dragoons with Radium Jezzails",
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
          "M": "10\"",
          "T": "7",
          "Sv": "3+",
          "W": "7",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-focused-hunters",
            "sectionId": "datasheet-focused-hunters",
            "title": "Focused Hunters",
            "text": "At the start of the battle, select one unit from your opponent’s army. Until the end of the battle, each time a model in this unit makes an attack that targets that unit, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-sydonian-dragoons-with-radium-jezzails"
          },
          {
            "id": "datasheet-broad-spectrum-data-tether",
            "sectionId": "datasheet-broad-spectrum-data-tether",
            "title": "Broad Spectrum Data-tether",
            "text": "Each time you target this unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-sydonian-dragoons-with-radium-jezzails"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "",
            "sourceUnitId": "unit-sydonian-dragoons-with-radium-jezzails"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-sydonian-dragoons-with-radium-jezzails"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sydonian-dragoons-with-radium-jezzails"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-selection-phosphor-serpenta",
            "title": "Phosphor serpenta",
            "aliases": [
              "Phosphor serpenta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-profile-phosphor-serpenta-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-selection-radium-jezzail",
            "title": "Radium jezzail",
            "aliases": [
              "Radium jezzail"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-profile-radium-jezzail-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-selection-ironstrider-feet",
            "title": "Ironstrider feet",
            "aliases": [
              "Ironstrider feet"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-profile-ironstrider-feet-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-profile-phosphor-serpenta-ranged",
            "title": "Phosphor serpenta",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-selection-phosphor-serpenta"
            ]
          },
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-profile-radium-jezzail-ranged-2",
            "title": "Radium jezzail",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "3",
            "abilities": "Anti-Infantry 3+, Heavy, Precision",
            "sourceSelectionIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-selection-radium-jezzail"
            ]
          },
          {
            "id": "unit-sydonian-dragoons-with-radium-jezzails-profile-ironstrider-feet-melee-3",
            "title": "Ironstrider feet",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sydonian-dragoons-with-radium-jezzails-selection-ironstrider-feet"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sydonian-dragoons-with-taser-lances",
      "title": "Sydonian Dragoons with taser lances",
      "sourceBookId": "adeptus-mechanicus",
      "sourceLayer": "Codex transcription",
      "intrinsicKeywords": [
        "Imperium",
        "Adeptus Mechanicus",
        "Skitarii",
        "Vehicle",
        "Walker",
        "Sydonian",
        "Dragoons with Taser Lances",
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
          "M": "10\"",
          "T": "7",
          "Sv": "3+",
          "W": "7",
          "Ld": "7+",
          "OC": "2"
        },
        "abilities": [
          {
            "id": "datasheet-dynamic-efficiency",
            "sectionId": "datasheet-dynamic-efficiency",
            "title": "Dynamic Efficiency",
            "text": "This unit is eligible to declare a charge in a turn in which it Advanced or Fell Back, and you can re-roll Desperate Escape tests taken for models in this unit.",
            "sourceUnitId": "unit-sydonian-dragoons-with-taser-lances"
          },
          {
            "id": "datasheet-broad-spectrum-data-tether",
            "sectionId": "datasheet-broad-spectrum-data-tether",
            "title": "Broad Spectrum Data-tether",
            "text": "Each time you target this unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-sydonian-dragoons-with-taser-lances"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "",
            "sourceUnitId": "unit-sydonian-dragoons-with-taser-lances"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "",
            "sourceUnitId": "unit-sydonian-dragoons-with-taser-lances"
          },
          {
            "id": "doctrina-imperatives",
            "sectionId": "doctrina-imperatives",
            "title": "Doctrina Imperatives",
            "text": "At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.\n\nPROTECTOR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [HEAVY] ability.\n■ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.\n■ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.\n\nCONQUEROR IMPERATIVE\n■ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.\n■ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.\n■ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6\" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-sydonian-dragoons-with-taser-lances"
          }
        ],
        "models": [],
        "selections": [
          {
            "id": "unit-sydonian-dragoons-with-taser-lances-selection-phosphor-serpenta",
            "title": "Phosphor serpenta",
            "aliases": [
              "Phosphor serpenta"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-dragoons-with-taser-lances-profile-phosphor-serpenta-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sydonian-dragoons-with-taser-lances-selection-taser-lance",
            "title": "Taser lance",
            "aliases": [
              "Taser lance"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sydonian-dragoons-with-taser-lances-profile-taser-lance-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sydonian-dragoons-with-taser-lances-profile-phosphor-serpenta-ranged",
            "title": "Phosphor serpenta",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Ignores Cover, Pistol",
            "sourceSelectionIds": [
              "unit-sydonian-dragoons-with-taser-lances-selection-phosphor-serpenta"
            ]
          },
          {
            "id": "unit-sydonian-dragoons-with-taser-lances-profile-taser-lance-melee-2",
            "title": "Taser lance",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Anti-Walker 2+, Lance, Sustained Hits 2",
            "sourceSelectionIds": [
              "unit-sydonian-dragoons-with-taser-lances-selection-taser-lance"
            ]
          }
        ],
        "wargearAbilities": []
      }
    }
  ],
  "detachments": [
    {
      "id": "detachment-cohort-acquisitus",
      "title": "Cohort Acquisitus",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "cohort-acquisitus-rule"
      ]
    },
    {
      "id": "detachment-lords-of-the-forge",
      "title": "Lords of the Forge",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "lords-of-the-forge-rule"
      ]
    },
    {
      "id": "detachment-luminen-auto-choir",
      "title": "Luminen Auto-choir",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "luminen-auto-choir-rule"
      ]
    },
    {
      "id": "detachment-cohort-cybernetica",
      "title": "Cohort Cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "cohort-cybernetica-rule"
      ]
    },
    {
      "id": "detachment-data-psalm-conclave",
      "title": "Data-psalm Conclave",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "data-psalm-conclave-rule"
      ]
    },
    {
      "id": "detachment-eradication-cohort",
      "title": "Eradication Cohort",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "eradication-cohort-rule"
      ]
    },
    {
      "id": "detachment-explorator-maniple",
      "title": "Explorator Maniple",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "explorator-maniple-rule"
      ]
    },
    {
      "id": "detachment-haloscreed-battle-clade",
      "title": "Haloscreed Battle Clade",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "haloscreed-battle-clade-rule"
      ]
    },
    {
      "id": "detachment-rad-zone-corps",
      "title": "Rad-zone Corps",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "rad-zone-corps-rule"
      ]
    },
    {
      "id": "detachment-skitarii-hunter-cohort",
      "title": "Skitarii Hunter Cohort",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "skitarii-hunter-cohort-rule"
      ]
    }
  ],
  "detachmentRules": [
    {
      "id": "cohort-acquisitus-rule",
      "title": "Noospheric Recon",
      "text": "Friendly PTERAXII, INFILTRATORS, RANGERS, SERBERYS RAIDERS and SERBERYS SULPHURHOUNDS units have RECON AUGURY. Friendly RECON AUGURY units have Enhanced Augurs: in your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is analysed. While a unit is analysed, that unit has +3\" detection range.",
      "sectionId": "cohort-acquisitus-rule",
      "detachmentId": "detachment-cohort-acquisitus",
      "detachmentTitle": "Cohort Acquisitus",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "lords-of-the-forge-rule",
      "title": "War-form Mantles",
      "text": "Friendly TECH-PRIEST models have a 4+ invulnerable save and Feel No Pain 5+. They also have Baffling Data Screed: in your Shooting phase, when this unit is selected to shoot and is not Battle-shocked, roll one D6. On a 2+, select one enemy VEHICLE unit within 12\"; it makes a Battle-shock test with -1. A unit cannot be selected more than once per turn. Alternatively, on a 2+, those ranged attacks do not prevent this unit from being hidden.",
      "sectionId": "lords-of-the-forge-rule",
      "detachmentId": "detachment-lords-of-the-forge",
      "detachmentTitle": "Lords of the Forge",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "luminen-auto-choir-rule",
      "title": "Cyber-static Canticles",
      "text": "Friendly CORPUSCARII units' ranged attacks have [LETHAL HITS]. When a friendly FULGURITE unit has fought, that unit heals D3 wounds. This Detachment has the DATA-PSALM tag and cannot be taken with another DATA-PSALM Detachment.",
      "sectionId": "luminen-auto-choir-rule",
      "detachmentId": "detachment-luminen-auto-choir",
      "detachmentTitle": "Luminen Auto-choir",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "cohort-cybernetica-rule",
      "title": "Cyber-psalm Programming",
      "text": "Add 2\" to the Move characteristic of models in LEGIO CYBERNETICA units from your army. In addition, unless that unit is Battle-shocked, add 1 to the Objective Control characteristic of models in that unit.",
      "sectionId": "cohort-cybernetica-rule",
      "detachmentId": "detachment-cohort-cybernetica",
      "detachmentTitle": "Cohort Cybernetica",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "data-psalm-conclave-rule",
      "title": "Benedictions of the Omnissiah",
      "text": "At the start of the first battle round, select one of the following Benedictions of the Omnissiah to be active for CULT MECHANICUS units from your army until the end of the battle:Panegyric ProcessionEach time a CULT MECHANICUS model from your army makes a ranged attack that targets a unit within half range, improve the Armour Penetration characteristic of that attack by 1.Citation in SavageryEach time a CULT MECHANICUS unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase, add 1 to the Strength and Attacks characteristics of melee weapons equipped by models in that unit.",
      "sectionId": "data-psalm-conclave-rule",
      "detachmentId": "detachment-data-psalm-conclave",
      "detachmentTitle": "Data-psalm Conclave",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "eradication-cohort-rule",
      "title": "Murderous Imperative",
      "text": "Each time a model in a SKITARII unit from your army makes an attack: if the Protector Imperative is active for that unit, re-roll a Hit roll of 1; if the Conqueror Imperative is active for that unit, re-roll a Wound roll of 1.",
      "sectionId": "eradication-cohort-rule",
      "detachmentId": "detachment-eradication-cohort",
      "detachmentTitle": "Eradication Cohort",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "explorator-maniple-rule",
      "title": "Acquisition At Any Cost",
      "text": "At the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is your Acquisition objective marker. Each time an ADEPTUS MECHANICUS model from your army makes an attack, if that model’s unit is within range of your Acquisition objective marker, or if the target of that attack is within range of your Acquisition objective marker, re-roll a Wound roll of 1.",
      "sectionId": "explorator-maniple-rule",
      "detachmentId": "detachment-explorator-maniple",
      "detachmentTitle": "Explorator Maniple",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "haloscreed-battle-clade-rule",
      "title": "Noospheric Transference",
      "text": "In your Command phase, select one or more ADEPTUS MECHANICUS units, including embarked units: 1 at Incursion, 2 at Strike Force, or 3 at Onslaught. Until your next Command phase, they gain HALO OVERRIDE. Select one Override ability: Electromotive Energisation (+2\" Move), Microactuator Bracing (+1 Toughness), Predation Protocols (eligible to charge after Advancing), or Muted Servomotors (Stealth).",
      "sectionId": "haloscreed-battle-clade-rule",
      "detachmentId": "detachment-haloscreed-battle-clade",
      "detachmentTitle": "Haloscreed Battle Clade",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "rad-zone-corps-rule",
      "title": "Rad-bombardment",
      "text": "BATTLE ROUND1BOMBARDMENTAt the start of the first battle round, for each enemy unit within your opponent’s deployment zone, your opponent must decide whether that unit will take cover or stand firm. You then roll one D6 for each of those enemy units and apply the relevant result below:Unit Standing Firm: On a 3+, that unit suffers D3 mortal wounds.Unit Taking Cover: That unit is battle-shocked. On a 5+, that unit suffers D3 mortal woundsBATTLE ROUND2    ONWARDSFALLOUTAt the start of your Command phase during the second, third, fourth and fifth battle rounds, roll one D6 for each enemy unit within your opponent’s deployment zone. On a 3+, that unit suffers 1 mortal wound and must take a Battle-shock test.",
      "sectionId": "rad-zone-corps-rule",
      "detachmentId": "detachment-rad-zone-corps",
      "detachmentTitle": "Rad-zone Corps",
      "sourceBookId": "adeptus-mechanicus"
    },
    {
      "id": "skitarii-hunter-cohort-rule",
      "title": "Stealth Optimisation",
      "text": "Friendly SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units have Stealth.",
      "sectionId": "skitarii-hunter-cohort-rule",
      "detachmentId": "detachment-skitarii-hunter-cohort",
      "detachmentTitle": "Skitarii Hunter Cohort",
      "sourceBookId": "adeptus-mechanicus"
    }
  ],
  "enhancements": [
    {
      "title": "Explorator Dispensation",
      "text": "SKITARII MARSHAL model only. This unit has Infiltrators.",
      "id": "enhancement-explorator-dispensation",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-skitarii-marshal"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-acquisitus",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-explorator-dispensation"
    },
    {
      "title": "Stealth-screened Cybercanids Upgrade",
      "text": "SERBERYS RAIDERS unit only. This unit has Lone Operative 15\".",
      "id": "enhancement-stealth-screened-cybercanids-upgrade",
      "eligibility": {
        "v": 1,
        "tags": [
          "UPGRADE"
        ],
        "owner": {
          "subject": "unit",
          "selector": {
            "unitIds": [
              "unit-serberys-raiders"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 3,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [
        "UPGRADE"
      ],
      "assignment": {
        "maxOwners": 3,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-acquisitus",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-stealth-screened-cybercanids-upgrade"
    },
    {
      "title": "Vingh's Wafers of Dynamism",
      "text": "CYBERNETICA DATASMITH model only. At the start of the first battle round, if this unit is an Attached unit, this unit has MOBILE until the end of the battle.",
      "id": "enhancement-vinghs-wafers-of-dynamism",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-cybernetica-datasmith"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-lords-of-the-forge",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-vinghs-wafers-of-dynamism"
    },
    {
      "title": "TL-4Ø9",
      "text": "TECH-PRIEST model only. The bearer gains TL-4Ø9: Range 24\", A 3, BS 2+, S 11, AP -2, D D3+2, [DEVASTATING WOUNDS, HAZARDOUS].",
      "id": "enhancement-tl-4-9",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-lords-of-the-forge",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-tl-4-9"
    },
    {
      "title": "Voltagheist Reliquary",
      "text": "TECH-PRIEST model only. Enemy units cannot target this unit with Snap Shooting attacks.",
      "id": "enhancement-voltagheist-reliquary",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-luminen-auto-choir",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-voltagheist-reliquary"
    },
    {
      "title": "Electromiasmic Brazier",
      "text": "TECH-PRIEST model only. This unit has Stealth.",
      "id": "enhancement-electromiasmic-brazier",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-luminen-auto-choir",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-electromiasmic-brazier"
    },
    {
      "title": "Necromechanic",
      "text": "TECH-PRIEST model only. Once per battle round, when a saving throw made for a friendly LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE model within 12\" of the bearer is failed, the bearer can use this Enhancement. If they do, change the Damage characteristic of that attack to 0.",
      "id": "enhancement-necromechanic",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-necromechanic"
    },
    {
      "title": "Lord of Machines",
      "text": "TECH-PRIEST model only. Once per turn, at the start of your opponent’s Shooting phase, select one enemy VEHICLE unit within 12\" of and visible to the bearer. That unit must take a Leadership test: if that test is passed, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; if that test is failed, that unit is not eligible to shoot this phase.",
      "id": "enhancement-lord-of-machines",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-lord-of-machines"
    },
    {
      "title": "Emotionless Clarity",
      "text": "TECH-PRIEST model only. Once per turn, when a friendly LEGIO CYBERNETICA or ADEPTUS MECHANICUS VEHICLE model with the Deadly Demise ability that is within 12\" of the bearer is destroyed, the bearer can use this Enhancement. If it does, do not roll to determine whether any mortal wounds are inflicted as a result of that model’s Deadly Demise ability. Instead, mortal wounds are automatically inflicted.",
      "id": "enhancement-emotionless-clarity",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-emotionless-clarity"
    },
    {
      "title": "Arch-negator",
      "text": "TECH-PRIEST model only. Ranged weapons equipped by the bearer have the [ANTI-VEHICLE 4+] ability.",
      "id": "enhancement-arch-negator",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-cohort-cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-arch-negator"
    },
    {
      "title": "Mechanicus Locum",
      "text": "TECH-PRIEST model only. The bearer has a Leadership characteristic of 6+ and, once per battle, at the start of any phase, you can select one friendly CULT MECHANICUS unit that is Battle-shocked and within 12\" of the bearer. That unit is no longer Battle-shocked.",
      "id": "enhancement-mechanicus-locum",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-data-psalm-conclave",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-mechanicus-locum"
    },
    {
      "title": "Mantle of the Gnosticarch",
      "text": "TECH-PRIEST model only. Each time an attack is allocated to the bearer, change the Damage characteristic of that attack to 1.",
      "id": "enhancement-mantle-of-the-gnosticarch",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-data-psalm-conclave",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-mantle-of-the-gnosticarch"
    },
    {
      "title": "Data-blessed Autosermon",
      "text": "TECH-PRIEST model only. Once per battle, at the start of your Command phase, you can select the Benediction of the Omnissiah you did not select at the start of the first battle round. Until the start of your next Command phase, that Benediction of the Omnissiah is active for the bearer’s unit in addition to the one that is currently active for your army.",
      "id": "enhancement-data-blessed-autosermon",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-data-psalm-conclave",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-data-blessed-autosermon"
    },
    {
      "title": "Temporcopia",
      "text": "TECH-PRIEST model only. The bearer’s unit has the Fights First ability.",
      "id": "enhancement-temporcopia",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-data-psalm-conclave",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-temporcopia"
    },
    {
      "title": "Omnicogitator",
      "text": "SKITARII MARSHAL model only. The Conqueror Imperative and Protector Imperative are both active for the bearer's unit.",
      "id": "enhancement-omnicogitator",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-skitarii-marshal"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-eradication-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-omnicogitator"
    },
    {
      "title": "Martial Signatum Amplificator",
      "text": "TECH-PRIEST model only. Models in the bearer's unit have the SKITARII keyword.",
      "id": "enhancement-martial-signatum-amplificator",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-eradication-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-martial-signatum-amplificator"
    },
    {
      "title": "Belicosa-class Capacitor Vanes",
      "text": "ADEPTUS MECHANICUS model only. Add 6\" to the Range characteristic and 1 to the Strength characteristic of ranged weapons equipped by models in the bearer's unit.",
      "id": "enhancement-belicosa-class-capacitor-vanes",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-eradication-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-belicosa-class-capacitor-vanes"
    },
    {
      "title": "Omnissiah's Fury",
      "text": "SKITARII MARSHAL model only. Add 2 to the Attacks characteristic of the bearer's melee weapons, and improve the Armour Penetration and Damage characteristics of those weapons by 1.",
      "id": "enhancement-omnissiahs-fury",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-skitarii-marshal"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-eradication-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-omnissiahs-fury"
    },
    {
      "title": "Artisan",
      "text": "TECH-PRIEST model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, once per phase, you can change the result of one Hit roll, one Wound roll or one saving throw made for that unit to an unmodified 6.",
      "id": "enhancement-artisan",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-explorator-maniple",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-artisan"
    },
    {
      "title": "Magos",
      "text": "TECH-PRIEST model only. At the end of your Command phase, if the bearer is within range of your Acquisition objective marker, roll one D6: on a 4+, you gain 1CP.",
      "id": "enhancement-magos",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-explorator-maniple",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-magos"
    },
    {
      "title": "Logis",
      "text": "TECH-PRIEST model only. While the bearer is leading a unit, each time a model in that unit makes an attack that targets a unit within range of your Acquisition objective marker, add 1 to the Hit roll.",
      "id": "enhancement-logis",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-explorator-maniple",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-logis"
    },
    {
      "title": "Genetor",
      "text": "TECH-PRIEST model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, models in that unit have a 4+ invulnerable save.",
      "id": "enhancement-genetor",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "TECH-PRIEST"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-explorator-maniple",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-genetor"
    },
    {
      "title": "Transoracular Dyad Wafers",
      "text": "CYBERNETICA DATASMITH model only. When attached to KASTELAN ROBOTS, models in that unit gain HALO OVERRIDE until the end of the battle. That unit cannot be selected for Noospheric Transference.",
      "id": "enhancement-transoracular-dyad-wafers",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-cybernetica-datasmith"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-haloscreed-battle-clade",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-transoracular-dyad-wafers"
    },
    {
      "title": "Cognitive Reinforcement",
      "text": "ADEPTUS MECHANICUS model only, excluding CYBERNETICA DATASMITH. The Conqueror and Protector Imperatives are both active for the bearer's unit.",
      "id": "enhancement-cognitive-reinforcement",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO",
              "CYBERNETICA DATASMITH"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-haloscreed-battle-clade",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-cognitive-reinforcement"
    },
    {
      "title": "Sanctified Ordnance",
      "text": "ADEPTUS MECHANICUS model only. Add 6\" to the Range of ranged weapons equipped by models in the bearer's unit; Hazardous tests for that unit can be re-rolled.",
      "id": "enhancement-sanctified-ordnance",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-haloscreed-battle-clade",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-sanctified-ordnance"
    },
    {
      "title": "Inloaded Lethality",
      "text": "TECH-PRIEST DOMINUS or TECH-PRIEST MANIPULUS model only. Add 3 to the Attacks and 1 to the Damage characteristics of the bearer's melee weapons.",
      "id": "enhancement-inloaded-lethality",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-tech-priest-dominus",
              "unit-tech-priest-manipulus"
            ],
            "allKeywords": [
              "CHARACTER"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-haloscreed-battle-clade",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-inloaded-lethality"
    },
    {
      "title": "Autoclavic Denunciation",
      "text": "ADEPTUS MECHANICUS model only. Ranged weapons equipped by the bearer have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 4+] abilities.",
      "id": "enhancement-autoclavic-denunciation",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-rad-zone-corps",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-autoclavic-denunciation"
    },
    {
      "title": "Malphonic Susurrus",
      "text": "ADEPTUS MECHANICUS model only. While the bearer is leading a unit, models in that unit have the Stealth ability.",
      "id": "enhancement-malphonic-susurrus",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-rad-zone-corps",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-malphonic-susurrus"
    },
    {
      "title": "Peerless Eradicator",
      "text": "ADEPTUS MECHANICUS model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
      "id": "enhancement-peerless-eradicator",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-rad-zone-corps",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-peerless-eradicator"
    },
    {
      "title": "Radial Suffusion",
      "text": "ADEPTUS MECHANICUS model only. From the second battle round onwards, when resolving the Fallout effect of the Rad-bombardment Detachment rule, if the bearer is on the battlefield, roll one D6 for each enemy unit within 6\" of your opponent’s deployment zone, in addition to those that are within your opponent’s deployment zone.",
      "id": "enhancement-radial-suffusion",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "ADEPTUS MECHANICUS"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-rad-zone-corps",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-radial-suffusion"
    },
    {
      "title": "Veiled Hunter",
      "text": "SKITARII MARSHAL model only. After both players have deployed their armies, you can select up to three SKITARII INFANTRY units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      "id": "enhancement-veiled-hunter",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-skitarii-marshal"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-skitarii-hunter-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-veiled-hunter"
    },
    {
      "title": "Clandestine Infiltrator",
      "text": "SKITARII model only. The bearer, and models in any unit they are leading, have the Infiltrators and Scouts 6\" abilities.",
      "id": "enhancement-clandestine-infiltrator",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "SKITARII"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-skitarii-hunter-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-clandestine-infiltrator"
    },
    {
      "title": "Cantic Thrallnet",
      "text": "SKITARII MARSHAL model only. At the start of the battle round, you can select one friendly SKITARII unit within 12\" of the bearer. Until the start of the next battle round, the Protector Imperative and the Conqueror Imperative are both active for that unit.",
      "id": "enhancement-cantic-thrallnet",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [
              "unit-skitarii-marshal"
            ],
            "allKeywords": [],
            "anyKeywords": [],
            "noneKeywords": [],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-skitarii-hunter-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-cantic-thrallnet"
    },
    {
      "title": "Battle-sphere Uplink",
      "text": "SKITARII model only. In your Shooting phase, after the bearer’s unit has shot, if it is not within Engagement Range of one or more enemy units, that unit can make a Normal move of up to 6\". If it does, until the end of the turn, that unit is not eligible to declare a charge.",
      "id": "enhancement-battle-sphere-uplink",
      "eligibility": {
        "v": 1,
        "tags": [],
        "owner": {
          "subject": "model",
          "selector": {
            "unitIds": [],
            "allKeywords": [
              "CHARACTER",
              "SKITARII"
            ],
            "anyKeywords": [],
            "noneKeywords": [
              "EPIC HERO"
            ],
            "alternatives": []
          }
        },
        "assignment": {
          "maxOwners": 1,
          "enhancementChoices": 1,
          "payPointsPerOwner": true
        }
      },
      "tags": [],
      "assignment": {
        "maxOwners": 1,
        "enhancementChoices": 1,
        "payPointsPerOwner": true
      },
      "detachmentId": "detachment-skitarii-hunter-cohort",
      "sourceBookId": "adeptus-mechanicus",
      "legacyKey": "enhancement-battle-sphere-uplink"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({});
