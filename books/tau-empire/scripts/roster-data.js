window.WH_BOOK_ROSTER_CATALOG=Object.freeze({
  "schema": "wh40k-army-roster-catalog/v1",
  "book": {
    "id": "tau-empire",
    "title": "T'au Empire",
    "factionKeyword": "T'AU EMPIRE",
    "parentBookId": null,
    "dependencies": []
  },
  "units": [
    {
      "id": "unit-breacher-team",
      "title": "Breacher Team",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Markerlight",
        "Fire Warrior",
        "T'au Empire",
        "Breacher Team",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-cadre-fireblade",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-ethereal",
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
              "unitId": "unit-cadre-fireblade",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-ethereal",
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
          "Sv": "4+",
          "W": "1",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-breach-and-clear",
            "sectionId": "tau-empire-ability-breach-and-clear",
            "title": "Breach and Clear",
            "text": "Each time a model in this unit makes a ranged attack that targets an enemy unit within range of an objective marker, you can re-roll the Wound roll.",
            "sourceUnitId": "unit-breacher-team"
          },
          {
            "id": "tau-empire-ability-ds8-support-turret",
            "sectionId": "tau-empire-ability-ds8-support-turret",
            "title": "DS8 Support Turret",
            "text": "In your Movement phase, if this unit Remains Stationary, until the start of your next turn, its Shas’ui model is equipped with the support turret weapon.\n\nDesigner’s Note: Place a Support Turret token next to this unit to remind you.",
            "sourceUnitId": "unit-breacher-team"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-breacher-team"
          }
        ],
        "models": [
          {
            "id": "unit-breacher-team-model-breacher-fire-warriors",
            "title": "Breacher Fire Warriors",
            "aliases": [
              "Breacher Fire Warriors"
            ]
          },
          {
            "id": "unit-breacher-team-model-breacher-fire-warrior-shasui-2",
            "title": "Breacher Fire Warrior Shas'ui",
            "aliases": [
              "Breacher Fire Warrior Shas'ui"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-breacher-team-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-pulse-pistol-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-pulse-blaster",
            "title": "Pulse blaster",
            "aliases": [
              "Pulse blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-pulse-blaster-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-support-turret",
            "title": "Support turret",
            "aliases": [
              "Support turret"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-support-turret-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-twin-pulse-carbine-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-breacher-team-profile-missile-pod-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-breacher-team-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-breacher-team-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-breacher-team-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-breacher-team-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-breacher-team-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-breacher-team-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-breacher-team-profile-pulse-pistol-ranged",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-pulse-pistol"
            ]
          },
          {
            "id": "unit-breacher-team-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-breacher-team-profile-pulse-blaster-ranged-3",
            "title": "Pulse blaster",
            "mode": "ranged",
            "range": "10\"",
            "a": "2",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-pulse-blaster"
            ]
          },
          {
            "id": "unit-breacher-team-profile-support-turret-ranged-4",
            "title": "Support turret",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire, Twin-linked",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-support-turret"
            ]
          },
          {
            "id": "unit-breacher-team-profile-twin-pulse-carbine-ranged-5",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-breacher-team-profile-missile-pod-ranged-6",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-breacher-team-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-breacher-team-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-breacher-team-selection-marker-drone"
            ]
          },
          {
            "id": "unit-breacher-team-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-breacher-team-selection-shield-drone"
            ]
          },
          {
            "id": "unit-breacher-team-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-breacher-team-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-strike-team",
      "title": "Strike Team",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Battleline",
        "Grenades",
        "Markerlight",
        "Fire Warrior",
        "Strike Team",
        "T'au Empire",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-cadre-fireblade",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-ethereal",
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
              "unitId": "unit-cadre-fireblade",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-ethereal",
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
          "Sv": "4+",
          "W": "1",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-suppression-volley",
            "sectionId": "tau-empire-ability-suppression-volley",
            "title": "Suppression Volley",
            "text": "In your Shooting phase, after this unit has shot, select one enemy INFANTRY unit hit by one or more of those attacks. Until the start of your next turn, while unit is on the battlefield, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-strike-team"
          },
          {
            "id": "tau-empire-ability-ds8-support-turret",
            "sectionId": "tau-empire-ability-ds8-support-turret",
            "title": "DS8 Support Turret",
            "text": "In your Movement phase, if this unit Remains Stationary, until the start of your next turn, its Shas’ui model is equipped with the support turret weapon.\n\nDesigner’s Note: Place a Support Turret token next to this unit to remind you.",
            "sourceUnitId": "unit-strike-team"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-strike-team"
          }
        ],
        "models": [
          {
            "id": "unit-strike-team-model-fire-warriors",
            "title": "Fire Warriors",
            "aliases": [
              "Fire Warriors"
            ]
          },
          {
            "id": "unit-strike-team-model-fire-warrior-shasui-2",
            "title": "Fire Warrior Shas'ui",
            "aliases": [
              "Fire Warrior Shas'ui"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-strike-team-selection-pulse-carbine",
            "title": "Pulse carbine",
            "aliases": [
              "Pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-pulse-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-pulse-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-pulse-rifle",
            "title": "Pulse rifle",
            "aliases": [
              "Pulse rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-pulse-rifle-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-support-turret",
            "title": "Support turret",
            "aliases": [
              "Support turret"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-support-turret-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-twin-pulse-carbine-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-strike-team-profile-missile-pod-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-strike-team-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-strike-team-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-strike-team-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-strike-team-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-strike-team-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-strike-team-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-strike-team-profile-pulse-carbine-ranged",
            "title": "Pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-strike-team-selection-pulse-carbine"
            ]
          },
          {
            "id": "unit-strike-team-profile-pulse-pistol-ranged-2",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-strike-team-selection-pulse-pistol"
            ]
          },
          {
            "id": "unit-strike-team-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-strike-team-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-strike-team-profile-pulse-rifle-ranged-4",
            "title": "Pulse rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-strike-team-selection-pulse-rifle"
            ]
          },
          {
            "id": "unit-strike-team-profile-support-turret-ranged-5",
            "title": "Support turret",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire, Twin-linked",
            "sourceSelectionIds": [
              "unit-strike-team-selection-support-turret"
            ]
          },
          {
            "id": "unit-strike-team-profile-twin-pulse-carbine-ranged-6",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-strike-team-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-strike-team-profile-missile-pod-ranged-7",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-strike-team-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-strike-team-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-strike-team-selection-marker-drone"
            ]
          },
          {
            "id": "unit-strike-team-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-strike-team-selection-shield-drone"
            ]
          },
          {
            "id": "unit-strike-team-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-strike-team-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-cadre-fireblade",
      "title": "Cadre Fireblade",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Grenades",
        "T'au Empire",
        "Cadre Fireblade",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-breacher-team",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-strike-team",
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
              "unitId": "unit-breacher-team",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-strike-team",
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
          "Sv": "4+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-volley-fire",
            "sectionId": "tau-empire-ability-volley-fire",
            "title": "Volley Fire",
            "text": "While this model is leading a unit, add 1 to the Attacks characteristic of ranged weapons equipped by models in that unit.",
            "sourceUnitId": "unit-cadre-fireblade"
          },
          {
            "id": "tau-empire-ability-crack-shot",
            "sectionId": "tau-empire-ability-crack-shot",
            "title": "Crack Shot",
            "text": "Each time this model makes a ranged attack, on a Critical Wound, that attack has an Armour Penetration characteristic of -3.",
            "sourceUnitId": "unit-cadre-fireblade"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-cadre-fireblade"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-cadre-fireblade"
          }
        ],
        "models": [
          {
            "id": "unit-cadre-fireblade-model-cadre-fireblade",
            "title": "Cadre Fireblade",
            "aliases": [
              "Cadre Fireblade"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-cadre-fireblade-selection-fireblade-pulse-rifle",
            "title": "Fireblade pulse rifle",
            "aliases": [
              "Fireblade pulse rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cadre-fireblade-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cadre-fireblade-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cadre-fireblade-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cadre-fireblade-profile-twin-pulse-carbine-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cadre-fireblade-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-cadre-fireblade-profile-missile-pod-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-cadre-fireblade-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-cadre-fireblade-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-cadre-fireblade-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-cadre-fireblade-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-cadre-fireblade-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-cadre-fireblade-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged",
            "title": "Fireblade pulse rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-cadre-fireblade-selection-fireblade-pulse-rifle"
            ]
          },
          {
            "id": "unit-cadre-fireblade-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-cadre-fireblade-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-cadre-fireblade-profile-twin-pulse-carbine-ranged-3",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-cadre-fireblade-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-cadre-fireblade-profile-missile-pod-ranged-4",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-cadre-fireblade-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-cadre-fireblade-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-cadre-fireblade-selection-marker-drone"
            ]
          },
          {
            "id": "unit-cadre-fireblade-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-cadre-fireblade-selection-shield-drone"
            ]
          },
          {
            "id": "unit-cadre-fireblade-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-cadre-fireblade-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-commander-in-coldstar-battlesuit",
      "title": "Commander in Coldstar Battlesuit",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "T'au Empire",
        "Commander in Coldstar Battlesuit",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-crisis-fireknife-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits",
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
              "unitId": "unit-crisis-fireknife-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits",
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
          "W": "6",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-coldstar-commander",
            "sectionId": "tau-empire-ability-coldstar-commander",
            "title": "Coldstar Commander",
            "text": "While this model is leading a unit, models in that unit have a Move characteristic of 12\" and ranged weapons equipped by models in that unit have the [ASSAULT] ability.",
            "sourceUnitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "id": "core-assault",
            "sectionId": "core-assault",
            "title": "Assault",
            "text": "Units containing one or more models with an [ASSAULT] weapon can shoot using assault shooting (10.05).",
            "sourceUnitId": "unit-commander-in-coldstar-battlesuit"
          }
        ],
        "models": [
          {
            "id": "unit-commander-in-coldstar-battlesuit-model-commander-in-coldstar-battlesuit",
            "title": "Commander in Coldstar Battlesuit",
            "aliases": [
              "Commander in Coldstar Battlesuit"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-high-output-burst-cannon",
            "title": "High-output burst cannon",
            "aliases": [
              "High-output burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-high-output-burst-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-missile-pod-ranged-2",
              "unit-commander-in-coldstar-battlesuit-profile-missile-pod-ranged-12"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-burst-cannon",
            "title": "Burst cannon",
            "aliases": [
              "Burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-burst-cannon-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-airbursting-fragmentation-projector",
            "title": "Airbursting fragmentation projector",
            "aliases": [
              "Airbursting fragmentation projector"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-airbursting-fragmentation-projector-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-standard",
            "title": "➤ Cyclic ion blaster - standard",
            "aliases": [
              "➤ Cyclic ion blaster - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-standard-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-overcharge",
            "title": "➤ Cyclic ion blaster - overcharge",
            "aliases": [
              "➤ Cyclic ion blaster - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-tau-flamer",
            "title": "T'au flamer",
            "aliases": [
              "T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-tau-flamer-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-fusion-blaster",
            "title": "Fusion blaster",
            "aliases": [
              "Fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-fusion-blaster-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-plasma-rifle",
            "title": "Plasma rifle",
            "aliases": [
              "Plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-plasma-rifle-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-battlesuit-fists-melee-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-twin-pulse-carbine-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-weapon-family-cyclic-ion-blaster-selection",
            "title": "➤ Cyclic ion blaster",
            "aliases": [
              "➤ Cyclic ion blaster"
            ],
            "kind": "weapon",
            "familyId": "unit-commander-in-coldstar-battlesuit-weapon-family-cyclic-ion-blaster",
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-standard-ranged-5",
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-battlesuit-support-system"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-shield-generator",
            "title": "Shield Generator",
            "aliases": [
              "Shield Generator"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-generator-2"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-weapon-support-system",
            "title": "Weapon Support System",
            "aliases": [
              "Weapon Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-weapon-support-system-3"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-marker-drone-4"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-drone-5"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-guardian-drone-6"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-commander-in-coldstar-battlesuit-weapon-family-cyclic-ion-blaster",
            "title": "➤ Cyclic ion blaster",
            "aliases": [
              "➤ Cyclic ion blaster"
            ],
            "profileIds": [
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-standard-ranged-5",
              "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-6"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-high-output-burst-cannon-ranged",
            "title": "High-output burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "8",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-high-output-burst-cannon"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-missile-pod-ranged-2",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-missile-pod"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-burst-cannon-ranged-3",
            "title": "Burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-burst-cannon"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-airbursting-fragmentation-projector-ranged-4",
            "title": "Airbursting fragmentation projector",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-airbursting-fragmentation-projector"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-standard-ranged-5",
            "title": "➤ Cyclic ion blaster - standard",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-standard",
              "unit-commander-in-coldstar-battlesuit-weapon-family-cyclic-ion-blaster-selection"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-6",
            "title": "➤ Cyclic ion blaster - overcharge",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-overcharge",
              "unit-commander-in-coldstar-battlesuit-weapon-family-cyclic-ion-blaster-selection"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-tau-flamer-ranged-7",
            "title": "T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-tau-flamer"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-fusion-blaster-ranged-8",
            "title": "Fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-fusion-blaster"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-plasma-rifle-ranged-9",
            "title": "Plasma rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-plasma-rifle"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-battlesuit-fists-melee-10",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-battlesuit-fists"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-twin-pulse-carbine-ranged-11",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-profile-missile-pod-ranged-12",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-battlesuit-support-system"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-generator-2",
            "title": "Shield Generator",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-shield-generator"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-weapon-support-system-3",
            "title": "Weapon Support System",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-weapon-support-system"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-marker-drone"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-shield-drone"
            ]
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-commander-in-coldstar-battlesuit-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-commander-in-enforcer-battlesuit",
      "title": "Commander in Enforcer Battlesuit",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "T'au Empire",
        "Commander in Enforcer Battlesuit",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-crisis-fireknife-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits",
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
              "unitId": "unit-crisis-fireknife-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits",
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
          "Sv": "2+",
          "W": "6",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-enforcer-commander",
            "sectionId": "tau-empire-ability-enforcer-commander",
            "title": "Enforcer Commander",
            "text": "While this model is leading a unit, each time a ranged attack targets that unit, worsen the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-commander-in-enforcer-battlesuit"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-commander-in-enforcer-battlesuit"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-commander-in-enforcer-battlesuit"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-commander-in-enforcer-battlesuit"
          }
        ],
        "models": [
          {
            "id": "unit-commander-in-enforcer-battlesuit-model-commander-in-enforcer-battlesuit",
            "title": "Commander in Enforcer Battlesuit",
            "aliases": [
              "Commander in Enforcer Battlesuit"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-missile-pod-ranged",
              "unit-commander-in-enforcer-battlesuit-profile-missile-pod-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-burst-cannon",
            "title": "Burst cannon",
            "aliases": [
              "Burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-burst-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-airbursting-fragmentation-projector",
            "title": "Airbursting fragmentation projector",
            "aliases": [
              "Airbursting fragmentation projector"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-airbursting-fragmentation-projector-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-standard",
            "title": "➤ Cyclic ion blaster - standard",
            "aliases": [
              "➤ Cyclic ion blaster - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-standard-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-overcharge",
            "title": "➤ Cyclic ion blaster - overcharge",
            "aliases": [
              "➤ Cyclic ion blaster - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-tau-flamer",
            "title": "T'au flamer",
            "aliases": [
              "T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-tau-flamer-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-fusion-blaster",
            "title": "Fusion blaster",
            "aliases": [
              "Fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-fusion-blaster-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-plasma-rifle",
            "title": "Plasma rifle",
            "aliases": [
              "Plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-plasma-rifle-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-battlesuit-fists-melee-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-twin-pulse-carbine-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-weapon-family-cyclic-ion-blaster-selection",
            "title": "➤ Cyclic ion blaster",
            "aliases": [
              "➤ Cyclic ion blaster"
            ],
            "kind": "weapon",
            "familyId": "unit-commander-in-enforcer-battlesuit-weapon-family-cyclic-ion-blaster",
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-standard-ranged-4",
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-battlesuit-support-system"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-shield-generator",
            "title": "Shield Generator",
            "aliases": [
              "Shield Generator"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-generator-2"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-weapon-support-system",
            "title": "Weapon Support System",
            "aliases": [
              "Weapon Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-weapon-support-system-3"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-marker-drone-4"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-drone-5"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-guardian-drone-6"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-commander-in-enforcer-battlesuit-weapon-family-cyclic-ion-blaster",
            "title": "➤ Cyclic ion blaster",
            "aliases": [
              "➤ Cyclic ion blaster"
            ],
            "profileIds": [
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-standard-ranged-4",
              "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-5"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-missile-pod-ranged",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-missile-pod"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-burst-cannon-ranged-2",
            "title": "Burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-burst-cannon"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-airbursting-fragmentation-projector-ranged-3",
            "title": "Airbursting fragmentation projector",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "3+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Indirect Fire",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-airbursting-fragmentation-projector"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-standard-ranged-4",
            "title": "➤ Cyclic ion blaster - standard",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-standard",
              "unit-commander-in-enforcer-battlesuit-weapon-family-cyclic-ion-blaster-selection"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-cyclic-ion-blaster-overcharge-ranged-5",
            "title": "➤ Cyclic ion blaster - overcharge",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "3+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-overcharge",
              "unit-commander-in-enforcer-battlesuit-weapon-family-cyclic-ion-blaster-selection"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-tau-flamer-ranged-6",
            "title": "T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-tau-flamer"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-fusion-blaster-ranged-7",
            "title": "Fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-fusion-blaster"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-plasma-rifle-ranged-8",
            "title": "Plasma rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "3+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-plasma-rifle"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-battlesuit-fists-melee-9",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-battlesuit-fists"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-twin-pulse-carbine-ranged-10",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-profile-missile-pod-ranged-11",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-battlesuit-support-system"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-generator-2",
            "title": "Shield Generator",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-shield-generator"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-weapon-support-system-3",
            "title": "Weapon Support System",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-weapon-support-system"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-marker-drone"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-shield-drone"
            ]
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-commander-in-enforcer-battlesuit-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-ethereal",
      "title": "Ethereal",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Ethereal",
        "T'au Empire",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-breacher-team",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-strike-team",
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
              "unitId": "unit-breacher-team",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-strike-team",
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
          "Sv": "5+",
          "W": "3",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-coordinated-leadership",
            "sectionId": "tau-empire-ability-coordinated-leadership",
            "title": "Coordinated Leadership",
            "text": "In your Command phase, roll one D6: on a 4+, you gain 1CP.",
            "sourceUnitId": "unit-ethereal"
          },
          {
            "id": "tau-empire-ability-failure-is-not-an-option",
            "sectionId": "tau-empire-ability-failure-is-not-an-option",
            "title": "Failure Is Not an Option",
            "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability.",
            "sourceUnitId": "unit-ethereal"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-ethereal"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-ethereal"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-ethereal"
          }
        ],
        "models": [
          {
            "id": "unit-ethereal-model-ethereal",
            "title": "Ethereal",
            "aliases": [
              "Ethereal"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ethereal-selection-honour-stave",
            "title": "Honour stave",
            "aliases": [
              "Honour stave"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ethereal-profile-honour-stave-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ethereal-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ethereal-profile-twin-pulse-carbine-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ethereal-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ethereal-profile-missile-pod-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ethereal-selection-hover-drone",
            "title": "Hover Drone",
            "aliases": [
              "Hover Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-ethereal-wargear-ability-hover-drone"
            ]
          },
          {
            "id": "unit-ethereal-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-ethereal-wargear-ability-marker-drone-2"
            ]
          },
          {
            "id": "unit-ethereal-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-ethereal-wargear-ability-shield-drone-3"
            ]
          },
          {
            "id": "unit-ethereal-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-ethereal-wargear-ability-guardian-drone-4"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-ethereal-profile-honour-stave-melee",
            "title": "Honour stave",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ethereal-selection-honour-stave"
            ]
          },
          {
            "id": "unit-ethereal-profile-twin-pulse-carbine-ranged-2",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-ethereal-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-ethereal-profile-missile-pod-ranged-3",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ethereal-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-ethereal-wargear-ability-hover-drone",
            "title": "Hover Drone",
            "requiredSelectionIds": [
              "unit-ethereal-selection-hover-drone"
            ]
          },
          {
            "id": "unit-ethereal-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-ethereal-selection-marker-drone"
            ]
          },
          {
            "id": "unit-ethereal-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-ethereal-selection-shield-drone"
            ]
          },
          {
            "id": "unit-ethereal-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-ethereal-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-firesight-team",
      "title": "Firesight Team",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Infantry",
        "Markerlight",
        "T'au Empire",
        "Firesight Team",
        "Non-Kroot"
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
          "T": "3",
          "Sv": "4+",
          "W": "4",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-precise-targeting",
            "sectionId": "tau-empire-ability-precise-targeting",
            "title": "Precise Targeting",
            "text": "Each time a model in this unit makes an attack that targets a Spotted unit, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-firesight-team"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-firesight-team"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-firesight-team"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-firesight-team"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-firesight-team"
          }
        ],
        "models": [
          {
            "id": "unit-firesight-team-model-firesight-team",
            "title": "Firesight Team",
            "aliases": [
              "Firesight Team"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-firesight-team-selection-close-combat-weapons",
            "title": "Close combat weapons",
            "aliases": [
              "Close combat weapons"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firesight-team-profile-close-combat-weapons-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-firesight-team-selection-longshot-pulse-rifles",
            "title": "Longshot pulse rifles",
            "aliases": [
              "Longshot pulse rifles"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firesight-team-profile-longshot-pulse-rifles-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-firesight-team-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-firesight-team-profile-pulse-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-firesight-team-profile-close-combat-weapons-melee",
            "title": "Close combat weapons",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-firesight-team-selection-close-combat-weapons"
            ]
          },
          {
            "id": "unit-firesight-team-profile-longshot-pulse-rifles-ranged-2",
            "title": "Longshot pulse rifles",
            "mode": "ranged",
            "range": "36\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-firesight-team-selection-longshot-pulse-rifles"
            ]
          },
          {
            "id": "unit-firesight-team-profile-pulse-pistol-ranged-3",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-firesight-team-selection-pulse-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-flesh-shaper",
      "title": "Kroot Flesh Shaper",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Kroot",
        "Shaper",
        "T'au Empire",
        "Flesh Shaper"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-kroot-carnivores",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-farstalkers",
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
              "unitId": "unit-kroot-carnivores",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-farstalkers",
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
          "M": "7\"",
          "T": "3",
          "Sv": "6+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-rites-of-feasting",
            "sectionId": "tau-empire-ability-rites-of-feasting",
            "title": "Rites of Feasting",
            "text": "While this model is leading a unit, models in that unit have the Feel Not Pain 6+ ability. If that unit destroys one or more enemy units in the Fight phase, until the end of the battle, models in that unit have the Feel No Pain 5+ ability instead.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "tau-empire-ability-ritual-butchery",
            "sectionId": "tau-empire-ability-ritual-butchery",
            "title": "Ritual Butchery",
            "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          },
          {
            "id": "core-sustained-hits",
            "sectionId": "core-sustained-hits",
            "title": "Sustained Hits",
            "text": "This ability always takes the form [SUSTAINED HITS X]. Each time an attack made with a [SUSTAINED HITS] weapon results in a critical hit, that attack results in a number of additional hits on the target as denoted by X.\n *Example: An attack made with a [SUSTAINED HITS 2] weapon results in a critical hit. That attack therefore hits the target three times (once from the critical hit, and twice more from the [SUSTAINED HITS 2] ability).",
            "sourceUnitId": "unit-kroot-flesh-shaper"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-flesh-shaper-model-kroot-flesh-shaper",
            "title": "Kroot Flesh Shaper",
            "aliases": [
              "Kroot Flesh Shaper"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-flesh-shaper-selection-twin-ritualistic-blades",
            "title": "Twin ritualistic blades",
            "aliases": [
              "Twin ritualistic blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-flesh-shaper-profile-twin-ritualistic-blades-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-flesh-shaper-selection-kroot-scattergun",
            "title": "Kroot scattergun",
            "aliases": [
              "Kroot scattergun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-flesh-shaper-profile-kroot-scattergun-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-flesh-shaper-profile-twin-ritualistic-blades-melee",
            "title": "Twin ritualistic blades",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-kroot-flesh-shaper-selection-twin-ritualistic-blades"
            ]
          },
          {
            "id": "unit-kroot-flesh-shaper-profile-kroot-scattergun-ranged-2",
            "title": "Kroot scattergun",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-kroot-flesh-shaper-selection-kroot-scattergun"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-lone-spear",
      "title": "Kroot Lone-spear",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Mounted",
        "Kroot",
        "T'au Empire",
        "Lone-spear"
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
          "Sv": "5+",
          "W": "6",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-fire-and-fade",
            "sectionId": "tau-empire-ability-fire-and-fade",
            "title": "Fire and Fade",
            "text": "In your Shooting phase, after this model has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this model is not eligible to declare a charge.",
            "sourceUnitId": "unit-kroot-lone-spear"
          },
          {
            "id": "tau-empire-ability-advanced-scouting",
            "sectionId": "tau-empire-ability-advanced-scouting",
            "title": "Advanced Scouting",
            "text": "Each time this model makes a ranged attack that hits an enemy unit, until the end of the turn, each time another KROOT model from your army makes an attack that targets that enemy unit, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-kroot-lone-spear"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-lone-spear"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-lone-spear"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-kroot-lone-spear"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-lone-spear"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-lone-spear-model-kroot-lone-spear",
            "title": "Kroot Lone-spear",
            "aliases": [
              "Kroot Lone-spear"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-lone-spear-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-lone-spear-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-lone-spear-selection-hunting-javelin",
            "title": "Hunting javelin",
            "aliases": [
              "Hunting javelin"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-lone-spear-profile-hunting-javelin-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-lone-spear-selection-blast-javelin",
            "title": "Blast javelin",
            "aliases": [
              "Blast javelin"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-lone-spear-profile-blast-javelin-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-lone-spear-selection-kroot-long-gun",
            "title": "Kroot long gun",
            "aliases": [
              "Kroot long gun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-lone-spear-profile-kroot-long-gun-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-lone-spear-selection-kalamandras-bite",
            "title": "Kalamandra's bite",
            "aliases": [
              "Kalamandra's bite"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-lone-spear-profile-kalamandras-bite-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-lone-spear-profile-close-combat-weapon-melee",
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
              "unit-kroot-lone-spear-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-kroot-lone-spear-profile-hunting-javelin-melee-2",
            "title": "Hunting javelin",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Lance",
            "sourceSelectionIds": [
              "unit-kroot-lone-spear-selection-hunting-javelin"
            ]
          },
          {
            "id": "unit-kroot-lone-spear-profile-blast-javelin-ranged-3",
            "title": "Blast javelin",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "4+",
            "s": "10",
            "ap": "-2",
            "d": "2",
            "abilities": "Assault, Blast",
            "sourceSelectionIds": [
              "unit-kroot-lone-spear-selection-blast-javelin"
            ]
          },
          {
            "id": "unit-kroot-lone-spear-profile-kroot-long-gun-ranged-4",
            "title": "Kroot long gun",
            "mode": "ranged",
            "range": "36\"",
            "a": "1",
            "skill": "3+",
            "s": "6",
            "ap": "-2",
            "d": "3",
            "abilities": "Heavy, Precision",
            "sourceSelectionIds": [
              "unit-kroot-lone-spear-selection-kroot-long-gun"
            ]
          },
          {
            "id": "unit-kroot-lone-spear-profile-kalamandras-bite-melee-5",
            "title": "Kalamandra's bite",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "-1",
            "d": "1",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-kroot-lone-spear-selection-kalamandras-bite"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-trail-shaper",
      "title": "Kroot Trail Shaper",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Kroot",
        "Shaper",
        "T'au Empire",
        "Trail Shaper"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-kroot-carnivores",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-farstalkers",
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
              "unitId": "unit-kroot-carnivores",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-farstalkers",
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
          "M": "7\"",
          "T": "3",
          "Sv": "6+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-kroot-ambush",
            "sectionId": "tau-empire-ability-kroot-ambush",
            "title": "Kroot Ambush",
            "text": "After both players have deployed their armies, you can redeploy this model’s unit and one other friendly KROOT unit. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "tau-empire-ability-trail-finding",
            "sectionId": "tau-empire-ability-trail-finding",
            "title": "Trail Finding",
            "text": "In your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\".",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-trail-shaper"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-kroot-trail-shaper"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-trail-shaper-model-kroot-trail-shaper",
            "title": "Kroot Trail Shaper",
            "aliases": [
              "Kroot Trail Shaper"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-trail-shaper-selection-kroot-rifle",
            "title": "Kroot rifle",
            "aliases": [
              "Kroot rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-trail-shaper-profile-kroot-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-trail-shaper-selection-shapers-blade",
            "title": "Shaper's blade",
            "aliases": [
              "Shaper's blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-trail-shaper-profile-shapers-blade-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-trail-shaper-profile-kroot-rifle-ranged",
            "title": "Kroot rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-kroot-trail-shaper-selection-kroot-rifle"
            ]
          },
          {
            "id": "unit-kroot-trail-shaper-profile-shapers-blade-melee-2",
            "title": "Shaper's blade",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-trail-shaper-selection-shapers-blade"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-war-shaper",
      "title": "Kroot War Shaper",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Character",
        "Kroot",
        "Shaper",
        "T'au Empire",
        "War Shaper"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-kroot-carnivores",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-farstalkers",
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
              "unitId": "unit-kroot-carnivores",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-farstalkers",
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
          "M": "7\"",
          "T": "3",
          "Sv": "6+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-root-of-honour",
            "sectionId": "tau-empire-ability-root-of-honour",
            "title": "Root of Honour",
            "text": "Once per battle, at the start of any phase, you can select one friendly KROOT unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked.",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "tau-empire-ability-war-leader",
            "sectionId": "tau-empire-ability-war-leader",
            "title": "War Leader",
            "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-war-shaper"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-kroot-war-shaper"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-war-shaper-model-kroot-war-shaper",
            "title": "Kroot War Shaper",
            "aliases": [
              "Kroot War Shaper"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-war-shaper-selection-bladestave-and-prey-hook",
            "title": "Bladestave and prey-hook",
            "aliases": [
              "Bladestave and prey-hook"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-war-shaper-profile-bladestave-and-prey-hook-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-war-shaper-selection-dart-bow-and-tri-blade",
            "title": "Dart-bow and tri-blade",
            "aliases": [
              "Dart-bow and tri-blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-war-shaper-profile-dart-bow-and-tri-blade-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-war-shaper-selection-shapers-blade",
            "title": "Shaper's blade",
            "aliases": [
              "Shaper's blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-war-shaper-profile-shapers-blade-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-war-shaper-selection-kroot-pistol",
            "title": "Kroot pistol",
            "aliases": [
              "Kroot pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-war-shaper-profile-kroot-pistol-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-war-shaper-profile-bladestave-and-prey-hook-melee",
            "title": "Bladestave and prey-hook",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "-1",
            "d": "2",
            "abilities": "Lethal Hits",
            "sourceSelectionIds": [
              "unit-kroot-war-shaper-selection-bladestave-and-prey-hook"
            ]
          },
          {
            "id": "unit-kroot-war-shaper-profile-dart-bow-and-tri-blade-ranged-2",
            "title": "Dart-bow and tri-blade",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3+1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "2",
            "abilities": "Anti-Infantry 3+, Assault, Heavy",
            "sourceSelectionIds": [
              "unit-kroot-war-shaper-selection-dart-bow-and-tri-blade"
            ]
          },
          {
            "id": "unit-kroot-war-shaper-profile-shapers-blade-melee-3",
            "title": "Shaper's blade",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-war-shaper-selection-shapers-blade"
            ]
          },
          {
            "id": "unit-kroot-war-shaper-profile-kroot-pistol-ranged-4",
            "title": "Kroot pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-kroot-war-shaper-selection-kroot-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-devilfish",
      "title": "Devilfish",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Transport",
        "Dedicated Transport",
        "Devilfish",
        "T'au Empire",
        "Non-Kroot",
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
          "W": "13",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-rapid-deployment",
            "sectionId": "tau-empire-ability-rapid-deployment",
            "title": "Rapid Deployment",
            "text": "Units can disembark from this TRANSPORT after it has Advanced. Units that do so count as having made a Normal move that phase, and cannot declare a charge in the same turn, but can otherwise act normally in the remainder of the turn.",
            "sourceUnitId": "unit-devilfish"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-devilfish"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-devilfish"
          }
        ],
        "models": [
          {
            "id": "unit-devilfish-model-devilfish",
            "title": "Devilfish",
            "aliases": [
              "Devilfish"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-devilfish-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devilfish-profile-twin-pulse-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devilfish-selection-smart-missile-system",
            "title": "Smart missile system",
            "aliases": [
              "Smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devilfish-profile-smart-missile-system-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devilfish-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devilfish-profile-seeker-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devilfish-selection-accelerator-burst-cannon",
            "title": "Accelerator burst cannon",
            "aliases": [
              "Accelerator burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devilfish-profile-accelerator-burst-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-devilfish-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-devilfish-profile-armoured-hull-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-devilfish-profile-twin-pulse-carbine-ranged",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked, Assault",
            "sourceSelectionIds": [
              "unit-devilfish-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-devilfish-profile-smart-missile-system-ranged-2",
            "title": "Smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire",
            "sourceSelectionIds": [
              "unit-devilfish-selection-smart-missile-system"
            ]
          },
          {
            "id": "unit-devilfish-profile-seeker-missile-ranged-3",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-devilfish-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-devilfish-profile-accelerator-burst-cannon-ranged-4",
            "title": "Accelerator burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devilfish-selection-accelerator-burst-cannon"
            ]
          },
          {
            "id": "unit-devilfish-profile-armoured-hull-melee-5",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-devilfish-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-commander-farsight",
      "title": "Commander Farsight",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Vehicle",
        "Walker",
        "Fly",
        "Character",
        "Battlesuit",
        "Commander Farsight",
        "T'au Empire",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-crisis-fireknife-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits",
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
              "unitId": "unit-crisis-fireknife-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits",
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
          "Sv": "2+",
          "W": "8",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-way-of-the-short-blade",
            "sectionId": "tau-empire-ability-way-of-the-short-blade",
            "title": "Way of the Short Blade",
            "text": "While this model is leading a unit, each time a model in that unit makes an attack that targets an enemy unit within 9\", add 1 to the Wound roll.",
            "sourceUnitId": "unit-commander-farsight"
          },
          {
            "id": "tau-empire-ability-puretides-teachings",
            "sectionId": "tau-empire-ability-puretides-teachings",
            "title": "Puretide's Teachings",
            "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
            "sourceUnitId": "unit-commander-farsight"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-commander-farsight"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-commander-farsight"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-commander-farsight"
          }
        ],
        "models": [
          {
            "id": "unit-commander-farsight-model-commander-farsight",
            "title": "Commander Farsight",
            "aliases": [
              "Commander Farsight"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-commander-farsight-selection-high-intensity-plasma-rifle",
            "title": "High-intensity plasma rifle",
            "aliases": [
              "High-intensity plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-farsight-profile-high-intensity-plasma-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-farsight-selection-dawn-blade-strike",
            "title": "➤ Dawn Blade - strike",
            "aliases": [
              "➤ Dawn Blade - strike"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-farsight-profile-dawn-blade-strike-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-farsight-selection-dawn-blade-sweep",
            "title": "➤ Dawn Blade - sweep",
            "aliases": [
              "➤ Dawn Blade - sweep"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-farsight-profile-dawn-blade-sweep-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-farsight-weapon-family-dawn-blade-selection",
            "title": "➤ Dawn Blade",
            "aliases": [
              "➤ Dawn Blade"
            ],
            "kind": "weapon",
            "familyId": "unit-commander-farsight-weapon-family-dawn-blade",
            "profileIds": [
              "unit-commander-farsight-profile-dawn-blade-strike-melee-2",
              "unit-commander-farsight-profile-dawn-blade-sweep-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-commander-farsight-weapon-family-dawn-blade",
            "title": "➤ Dawn Blade",
            "aliases": [
              "➤ Dawn Blade"
            ],
            "profileIds": [
              "unit-commander-farsight-profile-dawn-blade-strike-melee-2",
              "unit-commander-farsight-profile-dawn-blade-sweep-melee-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-commander-farsight-profile-high-intensity-plasma-rifle-ranged",
            "title": "High-intensity plasma rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-farsight-selection-high-intensity-plasma-rifle"
            ]
          },
          {
            "id": "unit-commander-farsight-profile-dawn-blade-strike-melee-2",
            "title": "➤ Dawn Blade - strike",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "2+",
            "s": "10",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-farsight-selection-dawn-blade-strike",
              "unit-commander-farsight-weapon-family-dawn-blade-selection"
            ]
          },
          {
            "id": "unit-commander-farsight-profile-dawn-blade-sweep-melee-3",
            "title": "➤ Dawn Blade - sweep",
            "mode": "melee",
            "range": "Melee",
            "a": "8",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-farsight-selection-dawn-blade-sweep",
              "unit-commander-farsight-weapon-family-dawn-blade-selection"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-commander-shadowsun",
      "title": "Commander Shadowsun",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Epic Hero",
        "Infantry",
        "Fly",
        "Character",
        "Battlesuit",
        "Commander Shadowsun",
        "T'au Empire",
        "Non-Kroot"
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
          "T": "4",
          "Sv": "3+",
          "W": "6",
          "Ld": "6+",
          "OC": "1",
          "Invulnerable": "5+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-agile-combatant",
            "sectionId": "tau-empire-ability-agile-combatant",
            "title": "Agile Combatant",
            "text": "This model is eligible to shoot in a turn in which it Fell Back.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "tau-empire-ability-hero-of-the-empire-aura",
            "sectionId": "tau-empire-ability-hero-of-the-empire-aura",
            "title": "Hero of the Empire (Aura)",
            "text": "While a friendly T’au Empire unit is within 6\" of this model, each time a model in that unit makes a ranged attack, re-roll a Hit roll of 1.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "tau-empire-ability-advanced-guardian-drone",
            "sectionId": "tau-empire-ability-advanced-guardian-drone",
            "title": "Advanced Guardian Drone",
            "text": "Each time a ranged attack targets the bearer, subtract 1 from the Wound roll.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "tau-empire-ability-command-link-drone-aura",
            "sectionId": "tau-empire-ability-command-link-drone-aura",
            "title": "Command-link Drone (Aura)",
            "text": "While a friendly T’au Empire unit is within 6\" of the bearer, each time you select that unit as the target of a Stratagem, roll one D6: on a 5+, you gain 1CP.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "tau-empire-ability-supreme-commander",
            "sectionId": "tau-empire-ability-supreme-commander",
            "title": "Supreme Commander",
            "text": "If this model is in your army, it must be your Warlord.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-commander-shadowsun"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-commander-shadowsun"
          }
        ],
        "models": [
          {
            "id": "unit-commander-shadowsun-model-commander-shadowsun",
            "title": "Commander Shadowsun",
            "aliases": [
              "Commander Shadowsun"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-commander-shadowsun-selection-light-missile-pod",
            "title": "Light missile pod",
            "aliases": [
              "Light missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-shadowsun-profile-light-missile-pod-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-shadowsun-selection-high-energy-fusion-blaster",
            "title": "High-energy fusion blaster",
            "aliases": [
              "High-energy fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-shadowsun-profile-high-energy-fusion-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-shadowsun-selection-flechette-launcher",
            "title": "Flechette launcher",
            "aliases": [
              "Flechette launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-shadowsun-profile-flechette-launcher-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-shadowsun-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-shadowsun-profile-battlesuit-fists-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-commander-shadowsun-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-commander-shadowsun-profile-pulse-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-commander-shadowsun-profile-light-missile-pod-ranged",
            "title": "Light missile pod",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "2+",
            "s": "7",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-shadowsun-selection-light-missile-pod"
            ]
          },
          {
            "id": "unit-commander-shadowsun-profile-high-energy-fusion-blaster-ranged-2",
            "title": "High-energy fusion blaster",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "2+",
            "s": "10",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-commander-shadowsun-selection-high-energy-fusion-blaster"
            ]
          },
          {
            "id": "unit-commander-shadowsun-profile-flechette-launcher-ranged-3",
            "title": "Flechette launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "5",
            "skill": "2+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-shadowsun-selection-flechette-launcher"
            ]
          },
          {
            "id": "unit-commander-shadowsun-profile-battlesuit-fists-melee-4",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-commander-shadowsun-selection-battlesuit-fists"
            ]
          },
          {
            "id": "unit-commander-shadowsun-profile-pulse-pistol-ranged-5",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-commander-shadowsun-selection-pulse-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-darkstrider",
      "title": "Darkstrider",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Character",
        "Epic Hero",
        "Darkstrider",
        "T'au Empire",
        "Markerlight",
        "Infantry",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [
          {
            "unitId": "unit-pathfinder-team",
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
              "unitId": "unit-pathfinder-team",
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
          "M": "7\"",
          "T": "3",
          "Sv": "4+",
          "W": "3",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-structural-analyser",
            "sectionId": "tau-empire-ability-structural-analyser",
            "title": "Structural Analyser",
            "text": "While this model is leading a unit, each time a model in that unit makes a ranged attack, add 1 to the Wound roll.",
            "sourceUnitId": "unit-darkstrider"
          },
          {
            "id": "tau-empire-ability-jammer-array",
            "sectionId": "tau-empire-ability-jammer-array",
            "title": "Jammer Array",
            "text": "Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of this model.",
            "sourceUnitId": "unit-darkstrider"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-darkstrider"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-darkstrider"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-darkstrider"
          },
          {
            "id": "core-leader",
            "sectionId": "core-leader",
            "title": "Leader",
            "text": "While a Bodyguard unit contains a Leader, it is known as an Attached unit and, with the exception of rules that are triggered when units are destroyed (pg 12), it is treated as a single unit for all rules purposes. Each time an attack targets an Attached unit, until the attacking unit has resolved all of its attacks, you must use the Toughness characteristic of the Bodyguard models in that unit, even if a Leader in that unit has a different Toughness characteristic. Each time an attack successfully wounds an Attached unit, that attack cannot be allocated to a Character model in that unit, even if that Character model has lost one or more wounds or has already had attacks allocated to it this phase. As soon as the last Bodyguard model in an Attached unit has been destroyed, any attacks made against that unit that have yet to be allocated can then be allocated to Character models in that unit.\n\nEach time the last model in a Bodyguard unit is destroyed, each CHARACTER unit that is part of that Attached unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time the last model in a CHARACTER unit that is attached to a Bodyguard unit is destroyed and there is not another CHARACTER unit attached, that Attached unit’s Bodyguard unit becomes a separate unit, with its original Starting Strength. If this happens as the result of an attack, they become separate units after the attacking unit has resolved all of its attacks. \n\nEach time a unit that is part of an Attached unit is destroyed, it does not have the keywords of any other units that make up that Attached unit (unless it has those keywords on its own datasheet) for the purposes of any rules that would be triggered when that unit is destroyed.",
            "sourceUnitId": "unit-darkstrider"
          }
        ],
        "models": [
          {
            "id": "unit-darkstrider-model-darkstrider",
            "title": "Darkstrider",
            "aliases": [
              "Darkstrider"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-darkstrider-selection-shade",
            "title": "Shade",
            "aliases": [
              "Shade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-darkstrider-profile-shade-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-darkstrider-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-darkstrider-profile-close-combat-weapon-melee-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-darkstrider-profile-shade-ranged",
            "title": "Shade",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "2",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-darkstrider-selection-shade"
            ]
          },
          {
            "id": "unit-darkstrider-profile-close-combat-weapon-melee-2",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-darkstrider-selection-close-combat-weapon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-the-twin-lance",
      "title": "The Twin Lance",
      "sourceBookId": "tau-empire",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Epic Hero",
        "Vehicle",
        "Walker",
        "Fly",
        "Character",
        "Battlesuit",
        "T'au Empire",
        "Non-Kroot",
        "The Twin Lance"
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
          "Sv": "2+",
          "W": "8",
          "Ld": "6+",
          "OC": "2",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-neocapacitor-shields",
            "sectionId": "tau-empire-ability-neocapacitor-shields",
            "title": "Neocapacitor Shields",
            "text": "At the start of your opponent’s Charge phase, you can select one visible enemy unit (excluding MONSTER and VEHICLE units) within 12\" of this unit. That unit must take a Battle-shock test and, until the end of the turn, subtract 1 from Charge rolls made for that unit.",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "tau-empire-ability-exemplars-of-montka",
            "sectionId": "tau-empire-ability-exemplars-of-montka",
            "title": "Exemplars of Mont’ka",
            "text": "Each time a model in this unit makes a ranged attack that targets the closest eligible target, that attack has the [SUSTAINED HITS 1] and [IGNORES COVER] abilities.",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "tau-empire-ability-retro-thrusters",
            "sectionId": "tau-empire-ability-retro-thrusters",
            "title": "Retro-thrusters",
            "text": "At the end of the Fight phase, if this unit was eligible to fight this phase, this unit can either make a Normal move of up to 6\" or a Fall Back move.",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "core-sustained-hits",
            "sectionId": "core-sustained-hits",
            "title": "Sustained Hits",
            "text": "This ability always takes the form [SUSTAINED HITS X]. Each time an attack made with a [SUSTAINED HITS] weapon results in a critical hit, that attack results in a number of additional hits on the target as denoted by X.\n *Example: An attack made with a [SUSTAINED HITS 2] weapon results in a critical hit. That attack therefore hits the target three times (once from the critical hit, and twice more from the [SUSTAINED HITS 2] ability).",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 8\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "core-ignores-cover",
            "sectionId": "core-ignores-cover",
            "title": "Ignores Cover",
            "text": "Each time an attack is made with an [IGNORES COVER] weapon, the target cannot have the benefit of cover against that attack (13.08), including from rules that give a model or unit the benefit of cover (e.g. Stealth ).",
            "sourceUnitId": "unit-the-twin-lance"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-the-twin-lance"
          }
        ],
        "models": [
          {
            "id": "unit-the-twin-lance-model-rilantar",
            "title": "Ri'Lantar",
            "aliases": [
              "Ri'Lantar"
            ]
          },
          {
            "id": "unit-the-twin-lance-model-rilocai-2",
            "title": "Ri'Locai",
            "aliases": [
              "Ri'Locai"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-the-twin-lance-selection-fusion-eliminator",
            "title": "Fusion eliminator",
            "aliases": [
              "Fusion eliminator"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-fusion-eliminator-ranged",
              "unit-the-twin-lance-profile-fusion-eliminator-melee-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-shardstorm-burst-system",
            "title": "Shardstorm burst system",
            "aliases": [
              "Shardstorm burst system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-shardstorm-burst-system-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-twin-pulse-blaster",
            "title": "Twin pulse blaster",
            "aliases": [
              "Twin pulse blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-twin-pulse-blaster-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-xv-pulse-pistol",
            "title": "XV pulse pistol",
            "aliases": [
              "XV pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-xv-pulse-pistol-ranged-5",
              "unit-the-twin-lance-profile-xv-pulse-pistol-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-ion-scattercannon-overcharge",
            "title": "➤ Ion scattercannon - overcharge",
            "aliases": [
              "➤ Ion scattercannon - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-ion-scattercannon-overcharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-ion-scattercannon",
            "title": "Ion scattercannon",
            "aliases": [
              "Ion scattercannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-ion-scattercannon-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-ion-scattercannon-standard",
            "title": "➤ Ion scattercannon - standard",
            "aliases": [
              "➤ Ion scattercannon - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-the-twin-lance-profile-ion-scattercannon-standard-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-weapon-family-ion-scattercannon-selection",
            "title": "➤ Ion scattercannon",
            "aliases": [
              "➤ Ion scattercannon"
            ],
            "kind": "weapon",
            "familyId": "unit-the-twin-lance-weapon-family-ion-scattercannon",
            "profileIds": [
              "unit-the-twin-lance-profile-ion-scattercannon-overcharge-ranged-7",
              "unit-the-twin-lance-profile-ion-scattercannon-standard-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-the-twin-lance-selection-mv15-gun-drone",
            "title": "MV15 Gun Drone",
            "aliases": [
              "MV15 Gun Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-the-twin-lance-wargear-ability-mv15-gun-drone"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-the-twin-lance-weapon-family-ion-scattercannon",
            "title": "➤ Ion scattercannon",
            "aliases": [
              "➤ Ion scattercannon"
            ],
            "profileIds": [
              "unit-the-twin-lance-profile-ion-scattercannon-overcharge-ranged-7",
              "unit-the-twin-lance-profile-ion-scattercannon-standard-ranged-9"
            ],
            "ambiguousAlias": true
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-the-twin-lance-profile-fusion-eliminator-ranged",
            "title": "Fusion eliminator",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "2+",
            "s": "10",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-fusion-eliminator"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-fusion-eliminator-melee-2",
            "title": "Fusion eliminator",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "10",
            "ap": "-4",
            "d": "D6+2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-fusion-eliminator"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-shardstorm-burst-system-ranged-3",
            "title": "Shardstorm burst system",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "2+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-shardstorm-burst-system"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-twin-pulse-blaster-ranged-4",
            "title": "Twin pulse blaster",
            "mode": "ranged",
            "range": "10\"",
            "a": "2",
            "skill": "5+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-twin-pulse-blaster"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-xv-pulse-pistol-ranged-5",
            "title": "XV pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "2+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-xv-pulse-pistol"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-xv-pulse-pistol-melee-6",
            "title": "XV pulse pistol",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-xv-pulse-pistol"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-ion-scattercannon-overcharge-ranged-7",
            "title": "➤ Ion scattercannon - overcharge",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "2+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Hazardous, Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-ion-scattercannon-overcharge",
              "unit-the-twin-lance-weapon-family-ion-scattercannon-selection"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-ion-scattercannon-melee-8",
            "title": "Ion scattercannon",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "4+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-ion-scattercannon"
            ]
          },
          {
            "id": "unit-the-twin-lance-profile-ion-scattercannon-standard-ranged-9",
            "title": "➤ Ion scattercannon - standard",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "2+",
            "s": "7",
            "ap": "-2",
            "d": "2",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-the-twin-lance-selection-ion-scattercannon-standard",
              "unit-the-twin-lance-weapon-family-ion-scattercannon-selection"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-the-twin-lance-wargear-ability-mv15-gun-drone",
            "title": "MV15 Gun Drone",
            "requiredSelectionIds": [
              "unit-the-twin-lance-selection-mv15-gun-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-kroot-carnivores",
      "title": "Kroot Carnivores",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Kroot",
        "Carnivores",
        "T'au Empire"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-kroot-flesh-shaper",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-trail-shaper",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-war-shaper",
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
              "unitId": "unit-kroot-flesh-shaper",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-trail-shaper",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-war-shaper",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "7\"",
          "T": "3",
          "Sv": "6+",
          "W": "1",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-fieldcraft",
            "sectionId": "tau-empire-ability-fieldcraft",
            "title": "Fieldcraft",
            "text": "At the end of the your Command phase, if this unit within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
            "sourceUnitId": "unit-kroot-carnivores"
          },
          {
            "id": "core-bodyguard",
            "sectionId": "core-bodyguard",
            "title": "Bodyguard",
            "text": "If this unit has a Starting Strength of 20, you can attach up to two Leader units to it instead of one, provided those Leaders are not duplicates (e.g. you cannot attach two WAR SHAPERS to this unit). If you do, and this unit is destroyed, the Leader units attached to it become separate units with their original Starting Strengths.",
            "sourceUnitId": "unit-kroot-carnivores"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-carnivores"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-carnivores"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-carnivores"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-carnivores-model-9-19-kroot-carnivores",
            "title": "9-19 Kroot Carnivores",
            "aliases": [
              "9-19 Kroot Carnivores"
            ]
          },
          {
            "id": "unit-kroot-carnivores-model-long-quill-2",
            "title": "Long-quill",
            "aliases": [
              "Long-quill"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-carnivores-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-carnivores-profile-close-combat-weapon-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-carnivores-selection-kroot-rifle",
            "title": "Kroot rifle",
            "aliases": [
              "Kroot rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-carnivores-profile-kroot-rifle-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-carnivores-selection-tanglebomb-launcher",
            "title": "Tanglebomb launcher",
            "aliases": [
              "Tanglebomb launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-carnivores-profile-tanglebomb-launcher-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-carnivores-selection-kroot-carbine",
            "title": "Kroot carbine",
            "aliases": [
              "Kroot carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-carnivores-profile-kroot-carbine-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-carnivores-selection-kroot-pistol",
            "title": "Kroot pistol",
            "aliases": [
              "Kroot pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-carnivores-profile-kroot-pistol-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-carnivores-profile-close-combat-weapon-melee",
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
              "unit-kroot-carnivores-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-kroot-carnivores-profile-kroot-rifle-ranged-2",
            "title": "Kroot rifle",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-kroot-carnivores-selection-kroot-rifle"
            ]
          },
          {
            "id": "unit-kroot-carnivores-profile-tanglebomb-launcher-ranged-3",
            "title": "Tanglebomb launcher",
            "mode": "ranged",
            "range": "24\"",
            "a": "D3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-kroot-carnivores-selection-tanglebomb-launcher"
            ]
          },
          {
            "id": "unit-kroot-carnivores-profile-kroot-carbine-ranged-4",
            "title": "Kroot carbine",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-carnivores-selection-kroot-carbine"
            ]
          },
          {
            "id": "unit-kroot-carnivores-profile-kroot-pistol-ranged-5",
            "title": "Kroot pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-kroot-carnivores-selection-kroot-pistol"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-farstalkers",
      "title": "Kroot Farstalkers",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Kroot",
        "Farstalkers",
        "T'au Empire"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-kroot-flesh-shaper",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-trail-shaper",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-kroot-war-shaper",
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
              "unitId": "unit-kroot-flesh-shaper",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-trail-shaper",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-kroot-war-shaper",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "T": "3",
          "Sv": "6+",
          "W": "1",
          "Ld": "7+",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-farstalkers"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-kroot-farstalkers"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-farstalkers"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-farstalkers-model-kroot-hounds",
            "title": "Kroot Hounds",
            "aliases": [
              "Kroot Hounds"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-model-kroot-farstalkers-2",
            "title": "Kroot Farstalkers",
            "aliases": [
              "Kroot Farstalkers"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-model-kroot-kill-broker-3",
            "title": "Kroot Kill-broker",
            "aliases": [
              "Kroot Kill-broker"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-farstalkers-selection-ripping-fangs",
            "title": "Ripping fangs",
            "aliases": [
              "Ripping fangs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-ripping-fangs-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-farstalker-firearm",
            "title": "Farstalker firearm",
            "aliases": [
              "Farstalker firearm"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-farstalker-firearm-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-kroot-pistol",
            "title": "Kroot pistol",
            "aliases": [
              "Kroot pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-kroot-pistol-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-close-combat-weapon-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-dvorgite-skinner",
            "title": "Dvorgite skinner",
            "aliases": [
              "Dvorgite skinner"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-dvorgite-skinner-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-londaxi-tribalest",
            "title": "Londaxi tribalest",
            "aliases": [
              "Londaxi tribalest"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-londaxi-tribalest-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-ritual-blade",
            "title": "Ritual blade",
            "aliases": [
              "Ritual blade"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-ritual-blade-melee-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-kroot-farstalkers-selection-tau-tech-rifle",
            "title": "T'au tech rifle",
            "aliases": [
              "T'au tech rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-farstalkers-profile-tau-tech-rifle-ranged-8"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-farstalkers-profile-ripping-fangs-melee",
            "title": "Ripping fangs",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-ripping-fangs"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-farstalker-firearm-ranged-2",
            "title": "Farstalker firearm",
            "mode": "ranged",
            "range": "24\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-farstalker-firearm"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-kroot-pistol-ranged-3",
            "title": "Kroot pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-kroot-pistol"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-close-combat-weapon-melee-4",
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
              "unit-kroot-farstalkers-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-dvorgite-skinner-ranged-5",
            "title": "Dvorgite skinner",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-dvorgite-skinner"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-londaxi-tribalest-ranged-6",
            "title": "Londaxi tribalest",
            "mode": "ranged",
            "range": "18\"",
            "a": "3",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds, Heavy",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-londaxi-tribalest"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-ritual-blade-melee-7",
            "title": "Ritual blade",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-ritual-blade"
            ]
          },
          {
            "id": "unit-kroot-farstalkers-profile-tau-tech-rifle-ranged-8",
            "title": "T'au tech rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Rapid Fire 1",
            "sourceSelectionIds": [
              "unit-kroot-farstalkers-selection-tau-tech-rifle"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-pathfinder-team",
      "title": "Pathfinder Team",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Infantry",
        "Grenades",
        "Markerlight",
        "Pathfinder Team",
        "T'au Empire",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-darkstrider",
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
              "unitId": "unit-darkstrider",
              "maxCharacters": 1
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
        "stats": {
          "M": "7\"",
          "T": "3",
          "Sv": "4+",
          "W": "1",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-target-uploaded",
            "sectionId": "tau-empire-ability-target-uploaded",
            "title": "Target Uploaded",
            "text": "Each time a model in this unit makes an attack that targets their Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-pathfinder-team"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-pathfinder-team"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-pathfinder-team"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-pathfinder-team"
          },
          {
            "id": "core-ignores-cover",
            "sectionId": "core-ignores-cover",
            "title": "Ignores Cover",
            "text": "Each time an attack is made with an [IGNORES COVER] weapon, the target cannot have the benefit of cover against that attack (13.08), including from rules that give a model or unit the benefit of cover (e.g. Stealth ).",
            "sourceUnitId": "unit-pathfinder-team"
          }
        ],
        "models": [
          {
            "id": "unit-pathfinder-team-model-pathfinders",
            "title": "Pathfinders",
            "aliases": [
              "Pathfinders"
            ]
          },
          {
            "id": "unit-pathfinder-team-model-pathfinder-shasui-2",
            "title": "Pathfinder Shas'ui",
            "aliases": [
              "Pathfinder Shas'ui"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-pathfinder-team-selection-pulse-carbine",
            "title": "Pulse carbine",
            "aliases": [
              "Pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-pulse-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-pulse-pistol-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-emp",
            "title": "➤ Semi-automatic grenade launcher - EMP",
            "aliases": [
              "➤ Semi-automatic grenade launcher - EMP"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-emp-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-fusion",
            "title": "➤ Semi-automatic grenade launcher - fusion",
            "aliases": [
              "➤ Semi-automatic grenade launcher - fusion"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-fusion-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-ion-rifle-standard",
            "title": "➤ Ion rifle - standard",
            "aliases": [
              "➤ Ion rifle - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-ion-rifle-standard-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-ion-rifle-overcharge",
            "title": "➤ Ion rifle - overcharge",
            "aliases": [
              "➤ Ion rifle - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-ion-rifle-overcharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-rail-rifle",
            "title": "Rail rifle",
            "aliases": [
              "Rail rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-rail-rifle-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-drone-burst-cannon",
            "title": "Drone burst cannon",
            "aliases": [
              "Drone burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-drone-burst-cannon-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-twin-pulse-carbine-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-pathfinder-team-profile-missile-pod-ranged-11"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-weapon-family-semi-automatic-grenade-launcher-selection",
            "title": "➤ Semi-automatic grenade launcher",
            "aliases": [
              "➤ Semi-automatic grenade launcher"
            ],
            "kind": "weapon",
            "familyId": "unit-pathfinder-team-weapon-family-semi-automatic-grenade-launcher",
            "profileIds": [
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-emp-ranged-4",
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-fusion-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-weapon-family-ion-rifle-selection",
            "title": "➤ Ion rifle",
            "aliases": [
              "➤ Ion rifle"
            ],
            "kind": "weapon",
            "familyId": "unit-pathfinder-team-weapon-family-ion-rifle",
            "profileIds": [
              "unit-pathfinder-team-profile-ion-rifle-standard-ranged-6",
              "unit-pathfinder-team-profile-ion-rifle-overcharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-pathfinder-team-selection-grav-inhibitor-drone",
            "title": "Grav-inhibitor Drone",
            "aliases": [
              "Grav-inhibitor Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-grav-inhibitor-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-selection-pulse-accelerator-drone",
            "title": "Pulse Accelerator Drone",
            "aliases": [
              "Pulse Accelerator Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-pulse-accelerator-drone-2"
            ]
          },
          {
            "id": "unit-pathfinder-team-selection-recon-drone",
            "title": "Recon Drone",
            "aliases": [
              "Recon Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-recon-drone-3"
            ]
          },
          {
            "id": "unit-pathfinder-team-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-marker-drone-4"
            ]
          },
          {
            "id": "unit-pathfinder-team-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-shield-drone-5"
            ]
          },
          {
            "id": "unit-pathfinder-team-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-guardian-drone-6"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-pathfinder-team-weapon-family-semi-automatic-grenade-launcher",
            "title": "➤ Semi-automatic grenade launcher",
            "aliases": [
              "➤ Semi-automatic grenade launcher"
            ],
            "profileIds": [
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-emp-ranged-4",
              "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-fusion-ranged-5"
            ],
            "ambiguousAlias": false
          },
          {
            "id": "unit-pathfinder-team-weapon-family-ion-rifle",
            "title": "➤ Ion rifle",
            "aliases": [
              "➤ Ion rifle"
            ],
            "profileIds": [
              "unit-pathfinder-team-profile-ion-rifle-standard-ranged-6",
              "unit-pathfinder-team-profile-ion-rifle-overcharge-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-pathfinder-team-profile-pulse-carbine-ranged",
            "title": "Pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-pulse-carbine"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-pulse-pistol-ranged-2",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-pulse-pistol"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-close-combat-weapon-melee-3",
            "title": "Close combat weapon",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "5+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-emp-ranged-4",
            "title": "➤ Semi-automatic grenade launcher - EMP",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Anti-Vehicle 4+, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-emp",
              "unit-pathfinder-team-weapon-family-semi-automatic-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-semi-automatic-grenade-launcher-fusion-ranged-5",
            "title": "➤ Semi-automatic grenade launcher - fusion",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-fusion",
              "unit-pathfinder-team-weapon-family-semi-automatic-grenade-launcher-selection"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-ion-rifle-standard-ranged-6",
            "title": "➤ Ion rifle - standard",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-ion-rifle-standard",
              "unit-pathfinder-team-weapon-family-ion-rifle-selection"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-ion-rifle-overcharge-ranged-7",
            "title": "➤ Ion rifle - overcharge",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "5+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Hazardous, Heavy",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-ion-rifle-overcharge",
              "unit-pathfinder-team-weapon-family-ion-rifle-selection"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-rail-rifle-ranged-8",
            "title": "Rail rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "5+",
            "s": "10",
            "ap": "-4",
            "d": "3",
            "abilities": "Devastating Wounds, Heavy",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-rail-rifle"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-drone-burst-cannon-ranged-9",
            "title": "Drone burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-drone-burst-cannon"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-twin-pulse-carbine-ranged-10",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-pathfinder-team-profile-missile-pod-ranged-11",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-pathfinder-team-selection-missile-pod"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-pathfinder-team-wargear-ability-grav-inhibitor-drone",
            "title": "Grav-inhibitor Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-grav-inhibitor-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-pulse-accelerator-drone-2",
            "title": "Pulse Accelerator Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-pulse-accelerator-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-recon-drone-3",
            "title": "Recon Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-recon-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-marker-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-shield-drone"
            ]
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-pathfinder-team-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-stealth-battlesuits",
      "title": "Stealth Battlesuits",
      "sourceBookId": "tau-empire",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "Battlesuit",
        "Stealth",
        "T'au Empire",
        "Grenades",
        "Markerlight",
        "Non-Kroot"
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
          "Sv": "3+",
          "W": "2",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-forward-observers",
            "sectionId": "tau-empire-ability-forward-observers",
            "title": "Forward Observers",
            "text": "Each time this unit is an Observer unit, until the end of the phase, each time a ranged attack is made by a model in a Guided unit that targets their Spotted unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
            "sourceUnitId": "unit-stealth-battlesuits"
          },
          {
            "id": "tau-empire-ability-localised-stealth-projectors-aura",
            "sectionId": "tau-empire-ability-localised-stealth-projectors-aura",
            "title": "Localised Stealth Projectors (Aura)",
            "text": "When a friendly KROOT/VESPID STINGWINGS unit within 6\" of this unit has shot, those attacks do not prevent that unit from being hidden.",
            "sourceUnitId": "unit-stealth-battlesuits"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-stealth-battlesuits"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-stealth-battlesuits"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-stealth-battlesuits"
          }
        ],
        "models": [
          {
            "id": "unit-stealth-battlesuits-model-4-stealth-shasui",
            "title": "4 Stealth Shas'ui",
            "aliases": [
              "4 Stealth Shas'ui"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-model-stealth-shasvre-2",
            "title": "Stealth Shas'vre",
            "aliases": [
              "Stealth Shas'vre"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-stealth-battlesuits-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-battlesuit-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-burst-cannon",
            "title": "Burst cannon",
            "aliases": [
              "Burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-burst-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-fusion-blaster",
            "title": "Fusion blaster",
            "aliases": [
              "Fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-fusion-blaster-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-twin-pulse-carbine-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-missile-pod-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-pulse-pistol",
            "title": "Pulse pistol",
            "aliases": [
              "Pulse pistol"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stealth-battlesuits-profile-pulse-pistol-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stealth-battlesuits-selection-homing-beacon",
            "title": "Homing Beacon",
            "aliases": [
              "Homing Beacon"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-stealth-battlesuits-wargear-ability-homing-beacon"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-stealth-battlesuits-wargear-ability-marker-drone-2"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-stealth-battlesuits-wargear-ability-shield-drone-3"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-stealth-battlesuits-wargear-ability-guardian-drone-4"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-stealth-battlesuits-profile-battlesuit-fists-melee",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "5+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-battlesuit-fists"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-profile-burst-cannon-ranged-2",
            "title": "Burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-burst-cannon"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-profile-fusion-blaster-ranged-3",
            "title": "Fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-fusion-blaster"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-profile-twin-pulse-carbine-ranged-4",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-profile-missile-pod-ranged-5",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-profile-pulse-pistol-ranged-6",
            "title": "Pulse pistol",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Pistol",
            "sourceSelectionIds": [
              "unit-stealth-battlesuits-selection-pulse-pistol"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-stealth-battlesuits-wargear-ability-homing-beacon",
            "title": "Homing Beacon",
            "requiredSelectionIds": [
              "unit-stealth-battlesuits-selection-homing-beacon"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-stealth-battlesuits-selection-marker-drone"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-stealth-battlesuits-selection-shield-drone"
            ]
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-stealth-battlesuits-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-vespid-stingwings",
      "title": "Vespid Stingwings",
      "sourceBookId": "tau-empire",
      "sourceLayer": "faction-pack",
      "intrinsicKeywords": [
        "Infantry",
        "Fly",
        "T'au Empire",
        "Vespid Stingwings",
        "Non-Kroot"
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
          "W": "1",
          "Ld": "7+",
          "OC": "1",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-airborne-agility",
            "sectionId": "tau-empire-ability-airborne-agility",
            "title": "Airborne Agility",
            "text": "At the end of your opponent’s turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
            "sourceUnitId": "unit-vespid-stingwings"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-vespid-stingwings"
          }
        ],
        "models": [
          {
            "id": "unit-vespid-stingwings-model-vespid-strain-leader",
            "title": "Vespid Strain Leader",
            "aliases": [
              "Vespid Strain Leader"
            ]
          },
          {
            "id": "unit-vespid-stingwings-model-4-9-vespid-stingwings-2",
            "title": "4-9 Vespid Stingwings",
            "aliases": [
              "4-9 Vespid Stingwings"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-vespid-stingwings-selection-stingwing-claws",
            "title": "Stingwing claws",
            "aliases": [
              "Stingwing claws"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vespid-stingwings-profile-stingwing-claws-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vespid-stingwings-selection-neutron-blaster",
            "title": "Neutron blaster",
            "aliases": [
              "Neutron blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vespid-stingwings-profile-neutron-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vespid-stingwings-selection-tau-flamer",
            "title": "T'au flamer",
            "aliases": [
              "T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vespid-stingwings-profile-tau-flamer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vespid-stingwings-selection-neutron-grenade-launcher",
            "title": "Neutron grenade launcher",
            "aliases": [
              "Neutron grenade launcher"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vespid-stingwings-profile-neutron-grenade-launcher-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vespid-stingwings-selection-neutron-rail-rifle",
            "title": "Neutron rail rifle",
            "aliases": [
              "Neutron rail rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-vespid-stingwings-profile-neutron-rail-rifle-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-vespid-stingwings-selection-oversight-drone",
            "title": "Oversight Drone",
            "aliases": [
              "Oversight Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-vespid-stingwings-wargear-ability-oversight-drone"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-vespid-stingwings-profile-stingwing-claws-melee",
            "title": "Stingwing claws",
            "mode": "melee",
            "range": "Melee",
            "a": "1",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-vespid-stingwings-selection-stingwing-claws"
            ]
          },
          {
            "id": "unit-vespid-stingwings-profile-neutron-blaster-ranged-2",
            "title": "Neutron blaster",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "-2",
            "d": "2",
            "abilities": "Assault",
            "sourceSelectionIds": [
              "unit-vespid-stingwings-selection-neutron-blaster"
            ]
          },
          {
            "id": "unit-vespid-stingwings-profile-tau-flamer-ranged-3",
            "title": "T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-vespid-stingwings-selection-tau-flamer"
            ]
          },
          {
            "id": "unit-vespid-stingwings-profile-neutron-grenade-launcher-ranged-4",
            "title": "Neutron grenade launcher",
            "mode": "ranged",
            "range": "18\"",
            "a": "D6",
            "skill": "4+",
            "s": "4",
            "ap": "-1",
            "d": "2",
            "abilities": "Anti-Infantry 3+, Blast",
            "sourceSelectionIds": [
              "unit-vespid-stingwings-selection-neutron-grenade-launcher"
            ]
          },
          {
            "id": "unit-vespid-stingwings-profile-neutron-rail-rifle-ranged-5",
            "title": "Neutron rail rifle",
            "mode": "ranged",
            "range": "30\"",
            "a": "1",
            "skill": "4+",
            "s": "10",
            "ap": "-4",
            "d": "3",
            "abilities": "Devastating Wounds",
            "sourceSelectionIds": [
              "unit-vespid-stingwings-selection-neutron-rail-rifle"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-vespid-stingwings-wargear-ability-oversight-drone",
            "title": "Oversight Drone",
            "requiredSelectionIds": [
              "unit-vespid-stingwings-selection-oversight-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-broadside-battlesuits",
      "title": "Broadside Battlesuits",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Battlesuit",
        "T'au Empire",
        "Broadside",
        "Non-Kroot"
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
          "Sv": "2+",
          "W": "8",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-advanced-armour",
            "sectionId": "tau-empire-ability-advanced-armour",
            "title": "Advanced Armour",
            "text": "Models in this unit have the Feel No Pain 4+ ability against mortal wounds.",
            "sourceUnitId": "unit-broadside-battlesuits"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-broadside-battlesuits"
          },
          {
            "id": "core-feel-no-pain",
            "sectionId": "core-feel-no-pain",
            "title": "Feel No Pain",
            "text": "This ability always takes the form Feel No Pain X+. Each time a model with this ability would lose a wound, roll one D6: on an X+, that wound is not lost.",
            "sourceUnitId": "unit-broadside-battlesuits"
          }
        ],
        "models": [
          {
            "id": "unit-broadside-battlesuits-model-broadside-shasui-0-2",
            "title": "Broadside Shas’ui (0-2)",
            "aliases": [
              "Broadside Shas’ui (0-2)"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-model-broadside-shasvre-2",
            "title": "Broadside Shas’vre",
            "aliases": [
              "Broadside Shas’vre"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-broadside-battlesuits-selection-heavy-rail-rifle",
            "title": "Heavy rail rifle",
            "aliases": [
              "Heavy rail rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-heavy-rail-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-high-yield-missile-pods",
            "title": "High-yield missile pods",
            "aliases": [
              "High-yield missile pods"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-high-yield-missile-pods-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-twin-plasma-rifle",
            "title": "Twin plasma rifle",
            "aliases": [
              "Twin plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-twin-plasma-rifle-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-twin-smart-missile-system",
            "title": "Twin smart missile system",
            "aliases": [
              "Twin smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-twin-smart-missile-system-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-seeker-missile-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-twin-pulse-carbine-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-missile-pod-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-crushing-bulk",
            "title": "Crushing bulk",
            "aliases": [
              "Crushing bulk"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-broadside-battlesuits-profile-crushing-bulk-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-broadside-battlesuits-selection-weapon-support-system",
            "title": "Weapon Support System",
            "aliases": [
              "Weapon Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-broadside-battlesuits-wargear-ability-weapon-support-system"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-broadside-battlesuits-wargear-ability-marker-drone-2"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-broadside-battlesuits-wargear-ability-shield-drone-3"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-broadside-battlesuits-wargear-ability-guardian-drone-4"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-broadside-battlesuits-profile-heavy-rail-rifle-ranged",
            "title": "Heavy rail rifle",
            "mode": "ranged",
            "range": "60\"",
            "a": "2",
            "skill": "4+",
            "s": "12",
            "ap": "-4",
            "d": "D6+1",
            "abilities": "Heavy, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-heavy-rail-rifle"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-high-yield-missile-pods-ranged-2",
            "title": "High-yield missile pods",
            "mode": "ranged",
            "range": "30\"",
            "a": "6",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-high-yield-missile-pods"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-twin-plasma-rifle-ranged-3",
            "title": "Twin plasma rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-twin-plasma-rifle"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-twin-smart-missile-system-ranged-4",
            "title": "Twin smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire, Twin-linked",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-twin-smart-missile-system"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-seeker-missile-ranged-5",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-twin-pulse-carbine-ranged-6",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-missile-pod-ranged-7",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-profile-crushing-bulk-melee-8",
            "title": "Crushing bulk",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-broadside-battlesuits-selection-crushing-bulk"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-broadside-battlesuits-wargear-ability-weapon-support-system",
            "title": "Weapon Support System",
            "requiredSelectionIds": [
              "unit-broadside-battlesuits-selection-weapon-support-system"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-broadside-battlesuits-selection-marker-drone"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-broadside-battlesuits-selection-shield-drone"
            ]
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-broadside-battlesuits-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-crisis-fireknife-battlesuits",
      "title": "Crisis Fireknife Battlesuits",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "Crisis",
        "T'au Empire",
        "Fireknife",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-commander-farsight",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit",
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
              "unitId": "unit-commander-farsight",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit",
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
          "Sv": "3+",
          "W": "4",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-fireknife",
            "sectionId": "tau-empire-ability-fireknife",
            "title": "Fireknife",
            "text": "Each time a model in this unit makes a ranged attack, re-roll a Hit roll of 1. If that attack targets a unit that is at its Starting Strength, you can re-roll the Hit roll instead.",
            "sourceUnitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "id": "tau-empire-ability-weapon-support-system-2",
            "sectionId": "tau-empire-ability-weapon-support-system-2",
            "title": "Weapon Support System",
            "text": "Each time a model in this unit makes a ranged attack, you can ignore any or all modifiers to the Hit roll.",
            "sourceUnitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-crisis-fireknife-battlesuits"
          }
        ],
        "models": [
          {
            "id": "unit-crisis-fireknife-battlesuits-model-crisis-fireknife-shasui",
            "title": "Crisis Fireknife Shas’ui",
            "aliases": [
              "Crisis Fireknife Shas’ui"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-model-crisis-fireknife-shasvre-2",
            "title": "Crisis Fireknife Shas’vre",
            "aliases": [
              "Crisis Fireknife Shas’vre"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-plasma-rifle",
            "title": "Plasma rifle",
            "aliases": [
              "Plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-fireknife-battlesuits-profile-plasma-rifle-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-fireknife-battlesuits-profile-missile-pod-ranged-2",
              "unit-crisis-fireknife-battlesuits-profile-missile-pod-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-fireknife-battlesuits-profile-twin-pulse-carbine-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-fireknife-battlesuits-profile-battlesuit-fists-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-fireknife-battlesuits-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-fireknife-battlesuits-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-fireknife-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-crisis-fireknife-battlesuits-profile-plasma-rifle-ranged",
            "title": "Plasma rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-plasma-rifle"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-profile-missile-pod-ranged-2",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-profile-twin-pulse-carbine-ranged-3",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-profile-missile-pod-ranged-4",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-profile-battlesuit-fists-melee-5",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-battlesuit-fists"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-crisis-fireknife-battlesuits-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-shield-drone"
            ]
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-crisis-fireknife-battlesuits-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-crisis-starscythe-battlesuits",
      "title": "Crisis Starscythe Battlesuits",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "Crisis",
        "T'au Empire",
        "Starscythe",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-commander-farsight",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit",
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
              "unitId": "unit-commander-farsight",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit",
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
          "Sv": "3+",
          "W": "4",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-starscythe",
            "sectionId": "tau-empire-ability-starscythe",
            "title": "Starscythe",
            "text": "Each time a model in this unit makes a ranged attack (excluding attacks that target MONSTERS and VEHICLES), improve the Armour Penetration characteristic of that attack by 1.",
            "sourceUnitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "id": "tau-empire-ability-battlesuit-support-system-2",
            "sectionId": "tau-empire-ability-battlesuit-support-system-2",
            "title": "Battlesuit Support System",
            "text": "The unit is eligible to shoot in a turn in which it Fell Back.",
            "sourceUnitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-crisis-starscythe-battlesuits"
          }
        ],
        "models": [
          {
            "id": "unit-crisis-starscythe-battlesuits-model-crisis-starscythe-shasui",
            "title": "Crisis Starscythe Shas’ui",
            "aliases": [
              "Crisis Starscythe Shas’ui"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-model-crisis-starscythe-shasvre-2",
            "title": "Crisis Starscythe Shas’vre",
            "aliases": [
              "Crisis Starscythe Shas’vre"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-burst-cannon",
            "title": "Burst cannon",
            "aliases": [
              "Burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-starscythe-battlesuits-profile-burst-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-tau-flamer",
            "title": "T'au flamer",
            "aliases": [
              "T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-starscythe-battlesuits-profile-tau-flamer-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-starscythe-battlesuits-profile-twin-pulse-carbine-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-starscythe-battlesuits-profile-missile-pod-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-starscythe-battlesuits-profile-battlesuit-fists-melee-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-starscythe-battlesuits-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-starscythe-battlesuits-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-starscythe-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-crisis-starscythe-battlesuits-profile-burst-cannon-ranged",
            "title": "Burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-burst-cannon"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-profile-tau-flamer-ranged-2",
            "title": "T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent",
            "sourceSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-tau-flamer"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-profile-twin-pulse-carbine-ranged-3",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-profile-missile-pod-ranged-4",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-profile-battlesuit-fists-melee-5",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-battlesuit-fists"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-crisis-starscythe-battlesuits-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-shield-drone"
            ]
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-crisis-starscythe-battlesuits-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-crisis-sunforge-battlesuits",
      "title": "Crisis Sunforge Battlesuits",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "Crisis",
        "T'au Empire",
        "Sunforge",
        "Non-Kroot"
      ],
      "relations": {
        "canLead": [],
        "canSupport": [],
        "canBeLedBy": [
          {
            "unitId": "unit-commander-farsight",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit",
            "maxCharacters": 1
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit",
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
              "unitId": "unit-commander-farsight",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit",
              "maxCharacters": 1
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit",
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
          "Sv": "3+",
          "W": "4",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-sunforge",
            "sectionId": "tau-empire-ability-sunforge",
            "title": "Sunforge",
            "text": "Each time a model in this unit makes a ranged attack that targets a MONSTER or VEHICLE unit, you can re-roll the Wound roll and you can re-roll the Damage roll.",
            "sourceUnitId": "unit-crisis-sunforge-battlesuits"
          },
          {
            "id": "core-deep-strike",
            "sectionId": "core-deep-strike",
            "title": "Deep Strike",
            "text": "Each time this unit makes an ingress move (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from all enemy units, even if that is within your opponent’s deployment zone.",
            "sourceUnitId": "unit-crisis-sunforge-battlesuits"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-crisis-sunforge-battlesuits"
          }
        ],
        "models": [
          {
            "id": "unit-crisis-sunforge-battlesuits-model-crisis-sunforge-shasui",
            "title": "Crisis Sunforge Shas’ui",
            "aliases": [
              "Crisis Sunforge Shas’ui"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-model-crisis-sunforge-shasvre-2",
            "title": "Crisis Sunforge Shas’vre",
            "aliases": [
              "Crisis Sunforge Shas’vre"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-sunforge-battlesuits-profile-twin-pulse-carbine-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-sunforge-battlesuits-profile-missile-pod-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-battlesuit-fists",
            "title": "Battlesuit fists",
            "aliases": [
              "Battlesuit fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-sunforge-battlesuits-profile-battlesuit-fists-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-fusion-blaster",
            "title": "Fusion blaster",
            "aliases": [
              "Fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-crisis-sunforge-battlesuits-profile-fusion-blaster-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-marker-drone",
            "title": "Marker Drone",
            "aliases": [
              "Marker Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-sunforge-battlesuits-wargear-ability-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-shield-drone",
            "title": "Shield Drone",
            "aliases": [
              "Shield Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-sunforge-battlesuits-wargear-ability-shield-drone-2"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-selection-guardian-drone",
            "title": "Guardian Drone",
            "aliases": [
              "Guardian Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-crisis-sunforge-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-crisis-sunforge-battlesuits-profile-twin-pulse-carbine-ranged",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-profile-missile-pod-ranged-2",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-missile-pod"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-profile-battlesuit-fists-melee-3",
            "title": "Battlesuit fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-battlesuit-fists"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-profile-fusion-blaster-ranged-4",
            "title": "Fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-fusion-blaster"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-crisis-sunforge-battlesuits-wargear-ability-marker-drone",
            "title": "Marker Drone",
            "requiredSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-marker-drone"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-shield-drone"
            ]
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": [
              "unit-crisis-sunforge-battlesuits-selection-guardian-drone"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-ghostkeel-battlesuit",
      "title": "Ghostkeel Battlesuit",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Fly",
        "Smoke",
        "Battlesuit",
        "Ghostkeel",
        "T'au Empire",
        "Non-Kroot"
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
          "Sv": "2+",
          "W": "12",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-stealth-drones",
            "sectionId": "tau-empire-ability-stealth-drones",
            "title": "Stealth Drones",
            "text": "Twice per battle, after an attack has been allocated to this model, you can change the Damage characteristic of that attack to 0.\n\nDesigner’s Note: Place two Stealth Drone tokens next to the unit, removing one each time this ability has been used.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "tau-empire-ability-localised-stealth-projectors-aura",
            "sectionId": "tau-empire-ability-localised-stealth-projectors-aura",
            "title": "Localised Stealth Projectors (Aura)",
            "text": "When a friendly KROOT/VESPID STINGWINGS unit within 6\" of this unit has shot, those attacks do not prevent that unit from being hidden.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "core-infiltrators",
            "sectionId": "core-infiltrators",
            "title": "Infiltrators",
            "text": "During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8\" horizontally from your opponent’s deployment zone and all enemy units.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "core-lone-operative",
            "sectionId": "core-lone-operative",
            "title": "Lone Operative",
            "text": "Unless part of an attached unit, this unit is not visible to enemy models unless they are within 12\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within 12\" of this unit. \nIf this ability takes the form Lone Operative X\", unless part of an attached unit, this unit is not visible to enemy models unless they are within X\" of this unit, and it cannot be targeted by [INDIRECT FIRE] weapons unless the attacking model is within X\" of this unit.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-ghostkeel-battlesuit"
          }
        ],
        "models": [
          {
            "id": "unit-ghostkeel-battlesuit-model-ghostkeel-battlesuit",
            "title": "Ghostkeel Battlesuit",
            "aliases": [
              "Ghostkeel Battlesuit"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-ghostkeel-battlesuit-selection-ghostkeel-fists",
            "title": "Ghostkeel fists",
            "aliases": [
              "Ghostkeel fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-ghostkeel-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-twin-burst-cannon",
            "title": "Twin burst cannon",
            "aliases": [
              "Twin burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-twin-burst-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-twin-tau-flamer",
            "title": "Twin T'au flamer",
            "aliases": [
              "Twin T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-twin-tau-flamer-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-twin-fusion-blaster",
            "title": "Twin fusion blaster",
            "aliases": [
              "Twin fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-twin-fusion-blaster-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-fusion-collider",
            "title": "Fusion collider",
            "aliases": [
              "Fusion collider"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-fusion-collider-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-standard",
            "title": "➤ Cyclic ion raker - standard",
            "aliases": [
              "➤ Cyclic ion raker - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-standard-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-overcharge",
            "title": "➤ Cyclic ion raker - overcharge",
            "aliases": [
              "➤ Cyclic ion raker - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-overcharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-weapon-family-cyclic-ion-raker-selection",
            "title": "➤ Cyclic ion raker",
            "aliases": [
              "➤ Cyclic ion raker"
            ],
            "kind": "weapon",
            "familyId": "unit-ghostkeel-battlesuit-weapon-family-cyclic-ion-raker",
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-standard-ranged-6",
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-overcharge-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-ghostkeel-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-ghostkeel-battlesuit-wargear-ability-battlesuit-support-system"
            ]
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-ghostkeel-battlesuit-weapon-family-cyclic-ion-raker",
            "title": "➤ Cyclic ion raker",
            "aliases": [
              "➤ Cyclic ion raker"
            ],
            "profileIds": [
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-standard-ranged-6",
              "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-overcharge-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-ghostkeel-battlesuit-profile-ghostkeel-fists-melee",
            "title": "Ghostkeel fists",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-ghostkeel-fists"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-twin-burst-cannon-ranged-2",
            "title": "Twin burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-twin-burst-cannon"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-twin-tau-flamer-ranged-3",
            "title": "Twin T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-twin-tau-flamer"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-twin-fusion-blaster-ranged-4",
            "title": "Twin fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-twin-fusion-blaster"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-fusion-collider-ranged-5",
            "title": "Fusion collider",
            "mode": "ranged",
            "range": "18\"",
            "a": "2",
            "skill": "4+",
            "s": "12",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-fusion-collider"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-standard-ranged-6",
            "title": "➤ Cyclic ion raker - standard",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-standard",
              "unit-ghostkeel-battlesuit-weapon-family-cyclic-ion-raker-selection"
            ]
          },
          {
            "id": "unit-ghostkeel-battlesuit-profile-cyclic-ion-raker-overcharge-ranged-7",
            "title": "➤ Cyclic ion raker - overcharge",
            "mode": "ranged",
            "range": "36\"",
            "a": "6",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-overcharge",
              "unit-ghostkeel-battlesuit-weapon-family-cyclic-ion-raker-selection"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-ghostkeel-battlesuit-wargear-ability-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "requiredSelectionIds": [
              "unit-ghostkeel-battlesuit-selection-battlesuit-support-system"
            ]
          }
        ]
      }
    },
    {
      "id": "unit-hammerhead-gunship",
      "title": "Hammerhead Gunship",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Hammerhead Gunship",
        "T'au Empire",
        "Non-Kroot",
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
          "W": "14",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-armour-hunter",
            "sectionId": "tau-empire-ability-armour-hunter",
            "title": "Armour Hunter",
            "text": "Each time this model makes an attack that targets a MONSTER or VEHICLE, add 1 to the Hit roll.",
            "sourceUnitId": "unit-hammerhead-gunship"
          },
          {
            "id": "tau-empire-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-hammerhead-gunship"
          },
          {
            "id": "tau-empire-ability-targeting-array",
            "sectionId": "tau-empire-ability-targeting-array",
            "title": "Targeting Array",
            "text": "Each time this model is selected to shoot, you can re-roll one Hit roll or you can re-roll one Wound roll when resolving those attacks.",
            "sourceUnitId": "unit-hammerhead-gunship"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-hammerhead-gunship"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-hammerhead-gunship"
          }
        ],
        "models": [
          {
            "id": "unit-hammerhead-gunship-model-hammerhead-gunship",
            "title": "Hammerhead Gunship",
            "aliases": [
              "Hammerhead Gunship"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-hammerhead-gunship-selection-railgun",
            "title": "Railgun",
            "aliases": [
              "Railgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-railgun-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-ion-cannon-standard",
            "title": "➤ Ion cannon - standard",
            "aliases": [
              "➤ Ion cannon - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-ion-cannon-standard-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-ion-cannon-overcharge",
            "title": "➤ Ion cannon - overcharge",
            "aliases": [
              "➤ Ion cannon - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-ion-cannon-overcharge-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-seeker-missile-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-accelerator-burst-cannon",
            "title": "Accelerator burst cannon",
            "aliases": [
              "Accelerator burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-accelerator-burst-cannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-twin-pulse-carbine-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-smart-missile-system",
            "title": "Smart missile system",
            "aliases": [
              "Smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-smart-missile-system-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-armoured-hull-melee-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-hammerhead-gunship-weapon-family-ion-cannon-selection",
            "title": "➤ Ion cannon",
            "aliases": [
              "➤ Ion cannon"
            ],
            "kind": "weapon",
            "familyId": "unit-hammerhead-gunship-weapon-family-ion-cannon",
            "profileIds": [
              "unit-hammerhead-gunship-profile-ion-cannon-standard-ranged-2",
              "unit-hammerhead-gunship-profile-ion-cannon-overcharge-ranged-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-hammerhead-gunship-weapon-family-ion-cannon",
            "title": "➤ Ion cannon",
            "aliases": [
              "➤ Ion cannon"
            ],
            "profileIds": [
              "unit-hammerhead-gunship-profile-ion-cannon-standard-ranged-2",
              "unit-hammerhead-gunship-profile-ion-cannon-overcharge-ranged-3"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-hammerhead-gunship-profile-railgun-ranged",
            "title": "Railgun",
            "mode": "ranged",
            "range": "72\"",
            "a": "1",
            "skill": "4+",
            "s": "20",
            "ap": "-5",
            "d": "D6+6",
            "abilities": "Heavy, Devastating Wounds",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-railgun"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-ion-cannon-standard-ranged-2",
            "title": "➤ Ion cannon - standard",
            "mode": "ranged",
            "range": "60\"",
            "a": "D6+3",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Blast",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-ion-cannon-standard",
              "unit-hammerhead-gunship-weapon-family-ion-cannon-selection"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-ion-cannon-overcharge-ranged-3",
            "title": "➤ Ion cannon - overcharge",
            "mode": "ranged",
            "range": "60\"",
            "a": "D6+3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "3",
            "abilities": "Blast, Hazardous",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-ion-cannon-overcharge",
              "unit-hammerhead-gunship-weapon-family-ion-cannon-selection"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-seeker-missile-ranged-4",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-accelerator-burst-cannon-ranged-5",
            "title": "Accelerator burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-accelerator-burst-cannon"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-twin-pulse-carbine-ranged-6",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-smart-missile-system-ranged-7",
            "title": "Smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-smart-missile-system"
            ]
          },
          {
            "id": "unit-hammerhead-gunship-profile-armoured-hull-melee-8",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-hammerhead-gunship-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-kroot-hounds",
      "title": "Kroot Hounds",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Beast",
        "Kroot",
        "T'au Empire",
        "Hounds"
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
          "T": "3",
          "Sv": "6+",
          "W": "1",
          "Ld": "8+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-loping-pounce",
            "sectionId": "tau-empire-ability-loping-pounce",
            "title": "Loping Pounce",
            "text": "At the start of your Command phase, if this unit is within 6\" of one or more friendly KROOT INFANTRY units, then until the end of the turn, this unit is eligible to declare a charge in a turn in which it Advanced.",
            "sourceUnitId": "unit-kroot-hounds"
          },
          {
            "id": "tau-empire-ability-hunting-hounds",
            "sectionId": "tau-empire-ability-hunting-hounds",
            "title": "Hunting Hounds",
            "text": "While this unit is within 12\" of one or more friendly KROOT CHARACTER models, the Objective Control characteristic of models in this unit is 1.",
            "sourceUnitId": "unit-kroot-hounds"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-kroot-hounds"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-kroot-hounds"
          },
          {
            "id": "core-stealth",
            "sectionId": "core-stealth",
            "title": "Stealth",
            "text": "If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the benefit of cover against that attack (13.08).",
            "sourceUnitId": "unit-kroot-hounds"
          }
        ],
        "models": [
          {
            "id": "unit-kroot-hounds-model-5-10-kroot-hounds",
            "title": "5-10 Kroot Hounds",
            "aliases": [
              "5-10 Kroot Hounds"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-kroot-hounds-selection-ripping-fangs",
            "title": "Ripping fangs",
            "aliases": [
              "Ripping fangs"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-kroot-hounds-profile-ripping-fangs-melee"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-kroot-hounds-profile-ripping-fangs-melee",
            "title": "Ripping fangs",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-kroot-hounds-selection-ripping-fangs"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-krootox-rampagers",
      "title": "Krootox Rampagers",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Mounted",
        "Grenades",
        "Kroot",
        "T'au Empire",
        "Krootox Rampagers"
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
          "T": "6",
          "Sv": "5+",
          "W": "5",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-kroot-linebreakers",
            "sectionId": "tau-empire-ability-kroot-linebreakers",
            "title": "Kroot Linebreakers",
            "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in this unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers D3 mortal wounds. If one or more enemy models are destroyed as a result of these mortal wounds, that enemy unit must take a Battle-shock test.",
            "sourceUnitId": "unit-krootox-rampagers"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-krootox-rampagers"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-krootox-rampagers"
          }
        ],
        "models": [
          {
            "id": "unit-krootox-rampagers-model-krootox-rampagers",
            "title": "Krootox Rampagers",
            "aliases": [
              "Krootox Rampagers"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-krootox-rampagers-selection-hunting-blades",
            "title": "Hunting blades",
            "aliases": [
              "Hunting blades"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-rampagers-profile-hunting-blades-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-krootox-rampagers-selection-kroot-pistol-and-hunting-javelins",
            "title": "Kroot pistol and hunting javelins",
            "aliases": [
              "Kroot pistol and hunting javelins"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-rampagers-profile-kroot-pistol-and-hunting-javelins-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-krootox-rampagers-selection-rampager-fists",
            "title": "Rampager fists",
            "aliases": [
              "Rampager fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-rampagers-profile-rampager-fists-melee-3"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-krootox-rampagers-profile-hunting-blades-melee",
            "title": "Hunting blades",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "3+",
            "s": "4",
            "ap": "-1",
            "d": "1",
            "abilities": "Lance",
            "sourceSelectionIds": [
              "unit-krootox-rampagers-selection-hunting-blades"
            ]
          },
          {
            "id": "unit-krootox-rampagers-profile-kroot-pistol-and-hunting-javelins-ranged-2",
            "title": "Kroot pistol and hunting javelins",
            "mode": "ranged",
            "range": "12\"",
            "a": "2",
            "skill": "4+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Pistol",
            "sourceSelectionIds": [
              "unit-krootox-rampagers-selection-kroot-pistol-and-hunting-javelins"
            ]
          },
          {
            "id": "unit-krootox-rampagers-profile-rampager-fists-melee-3",
            "title": "Rampager fists",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Extra Attacks, Sustained Hits 1",
            "sourceSelectionIds": [
              "unit-krootox-rampagers-selection-rampager-fists"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-krootox-riders",
      "title": "Krootox Riders",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Mounted",
        "Kroot",
        "Krootox Riders",
        "T'au Empire",
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
          "M": "7\"",
          "T": "6",
          "Sv": "5+",
          "W": "5",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-kroot-packmates",
            "sectionId": "tau-empire-ability-kroot-packmates",
            "title": "Kroot Packmates",
            "text": "Once per turn, in your opponent's Shooting phase, when a friendly KROOT INFANTRY unit within 6\" of this unit is selected as the target of an attack, one unit from your army with this ability can use it. If it does, after that enemy unit has finished making its attacks, that unit with this ability can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target).",
            "sourceUnitId": "unit-krootox-riders"
          },
          {
            "id": "tau-empire-ability-harnessed-alien-instincts",
            "sectionId": "tau-empire-ability-harnessed-alien-instincts",
            "title": "Harnessed Alien Instincts",
            "text": "In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked:\n- While a unit is prey-marked, that unit has +3\" detection range.",
            "sourceUnitId": "unit-krootox-riders"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 7\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-krootox-riders"
          }
        ],
        "models": [
          {
            "id": "unit-krootox-riders-model-krootox-riders",
            "title": "Krootox Riders",
            "aliases": [
              "Krootox Riders"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-krootox-riders-selection-krootox-fists",
            "title": "Krootox fists",
            "aliases": [
              "Krootox fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-riders-profile-krootox-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-krootox-riders-selection-repeater-cannon",
            "title": "Repeater cannon",
            "aliases": [
              "Repeater cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-riders-profile-repeater-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-krootox-riders-selection-close-combat-weapon",
            "title": "Close combat weapon",
            "aliases": [
              "Close combat weapon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-riders-profile-close-combat-weapon-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-krootox-riders-selection-tanglecannon",
            "title": "Tanglecannon",
            "aliases": [
              "Tanglecannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-krootox-riders-profile-tanglecannon-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-krootox-riders-profile-krootox-fists-melee",
            "title": "Krootox fists",
            "mode": "melee",
            "range": "Melee",
            "a": "4",
            "skill": "3+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "Extra Attacks",
            "sourceSelectionIds": [
              "unit-krootox-riders-selection-krootox-fists"
            ]
          },
          {
            "id": "unit-krootox-riders-profile-repeater-cannon-ranged-2",
            "title": "Repeater cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Rapid Fire 2",
            "sourceSelectionIds": [
              "unit-krootox-riders-selection-repeater-cannon"
            ]
          },
          {
            "id": "unit-krootox-riders-profile-close-combat-weapon-melee-3",
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
              "unit-krootox-riders-selection-close-combat-weapon"
            ]
          },
          {
            "id": "unit-krootox-riders-profile-tanglecannon-ranged-4",
            "title": "Tanglecannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "D6+1",
            "skill": "4+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-krootox-riders-selection-tanglecannon"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-piranhas",
      "title": "Piranhas",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "T'au Empire",
        "Piranha",
        "Non-Kroot",
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
          "T": "7",
          "Sv": "4+",
          "W": "7",
          "Ld": "7+",
          "OC": "2",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-drone-harassment-tactics",
            "sectionId": "tau-empire-ability-drone-harassment-tactics",
            "title": "Drone Harassment Tactics",
            "text": "At the end of your Movement phase, select one enemy unit within 12\" of this unit; that enemy unit must take a Battle-shock test.",
            "sourceUnitId": "unit-piranhas"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise 1",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-piranhas"
          },
          {
            "id": "core-scouts",
            "sectionId": "core-scouts",
            "title": "Scouts 9\"",
            "text": "This ability always takes the form Scouts X\". In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do one of the following: \n- If that unit is in strategic reserves, you can set up that unit anywhere that is wholly within your deployment zone. \n- If that unit is wholly within your deployment zone, it can make a scout move. \n- If that unit is embarked within a DEDICATED TRANSPORT that is wholly within your deployment zone, and if every model embarked within that DEDICATED TRANSPORT has the Scouts ability, that DEDICATED TRANSPORT can make a scout move.",
            "sourceUnitId": "unit-piranhas"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-piranhas"
          }
        ],
        "models": [
          {
            "id": "unit-piranhas-model-piranhas",
            "title": "Piranhas",
            "aliases": [
              "Piranhas"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-piranhas-selection-piranha-burst-cannon",
            "title": "Piranha burst cannon",
            "aliases": [
              "Piranha burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-piranhas-profile-piranha-burst-cannon-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-piranhas-selection-piranha-fusion-blaster",
            "title": "Piranha fusion blaster",
            "aliases": [
              "Piranha fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-piranhas-profile-piranha-fusion-blaster-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-piranhas-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-piranhas-profile-seeker-missile-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-piranhas-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-piranhas-profile-armoured-hull-melee-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-piranhas-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-piranhas-profile-twin-pulse-carbine-ranged-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-piranhas-profile-piranha-burst-cannon-ranged",
            "title": "Piranha burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-piranhas-selection-piranha-burst-cannon"
            ]
          },
          {
            "id": "unit-piranhas-profile-piranha-fusion-blaster-ranged-2",
            "title": "Piranha fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 4",
            "sourceSelectionIds": [
              "unit-piranhas-selection-piranha-fusion-blaster"
            ]
          },
          {
            "id": "unit-piranhas-profile-seeker-missile-ranged-3",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-piranhas-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-piranhas-profile-armoured-hull-melee-4",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "2",
            "skill": "5+",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-piranhas-selection-armoured-hull"
            ]
          },
          {
            "id": "unit-piranhas-profile-twin-pulse-carbine-ranged-5",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked, Assault",
            "sourceSelectionIds": [
              "unit-piranhas-selection-twin-pulse-carbine"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-razorshark-strike-fighter",
      "title": "Razorshark Strike Fighter",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Aircraft",
        "Fly",
        "Razorshark Strike Fighter",
        "T'au Empire",
        "Non-Kroot",
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
          "T": "10",
          "Sv": "3+",
          "W": "12",
          "Ld": "7+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-ground-strike-fighter",
            "sectionId": "tau-empire-ability-ground-strike-fighter",
            "title": "Ground Strike Fighter",
            "text": "Each time this model makes a ranged attack that targets an enemy unit that cannot FLY, add 1 to the Hit roll.",
            "sourceUnitId": "unit-razorshark-strike-fighter"
          },
          {
            "id": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-razorshark-strike-fighter"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-razorshark-strike-fighter"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-razorshark-strike-fighter"
          }
        ],
        "models": [
          {
            "id": "unit-razorshark-strike-fighter-model-razorshark-strike-fighter",
            "title": "Razorshark Strike Fighter",
            "aliases": [
              "Razorshark Strike Fighter"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-razorshark-strike-fighter-selection-quad-ion-turret-standard",
            "title": "➤ Quad ion turret - standard",
            "aliases": [
              "➤ Quad ion turret - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-standard-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-selection-quad-ion-turret-overcharge",
            "title": "➤ Quad ion turret - overcharge",
            "aliases": [
              "➤ Quad ion turret - overcharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-overcharge-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-missile-pod-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-selection-accelerator-burst-cannon",
            "title": "Accelerator burst cannon",
            "aliases": [
              "Accelerator burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-accelerator-burst-cannon-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-seeker-missile-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-armoured-hull-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-razorshark-strike-fighter-weapon-family-quad-ion-turret-selection",
            "title": "➤ Quad ion turret",
            "aliases": [
              "➤ Quad ion turret"
            ],
            "kind": "weapon",
            "familyId": "unit-razorshark-strike-fighter-weapon-family-quad-ion-turret",
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-standard-ranged",
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-overcharge-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-razorshark-strike-fighter-weapon-family-quad-ion-turret",
            "title": "➤ Quad ion turret",
            "aliases": [
              "➤ Quad ion turret"
            ],
            "profileIds": [
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-standard-ranged",
              "unit-razorshark-strike-fighter-profile-quad-ion-turret-overcharge-ranged-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-razorshark-strike-fighter-profile-quad-ion-turret-standard-ranged",
            "title": "➤ Quad ion turret - standard",
            "mode": "ranged",
            "range": "30\"",
            "a": "8",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-quad-ion-turret-standard",
              "unit-razorshark-strike-fighter-weapon-family-quad-ion-turret-selection"
            ]
          },
          {
            "id": "unit-razorshark-strike-fighter-profile-quad-ion-turret-overcharge-ranged-2",
            "title": "➤ Quad ion turret - overcharge",
            "mode": "ranged",
            "range": "30\"",
            "a": "8",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Hazardous, Twin-linked",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-quad-ion-turret-overcharge",
              "unit-razorshark-strike-fighter-weapon-family-quad-ion-turret-selection"
            ]
          },
          {
            "id": "unit-razorshark-strike-fighter-profile-missile-pod-ranged-3",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-missile-pod"
            ]
          },
          {
            "id": "unit-razorshark-strike-fighter-profile-accelerator-burst-cannon-ranged-4",
            "title": "Accelerator burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-accelerator-burst-cannon"
            ]
          },
          {
            "id": "unit-razorshark-strike-fighter-profile-seeker-missile-ranged-5",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-razorshark-strike-fighter-profile-armoured-hull-melee-6",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-razorshark-strike-fighter-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-riptide-battlesuit",
      "title": "Riptide Battlesuit",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Fly",
        "Battlesuit",
        "T'au Empire",
        "Riptide",
        "Non-Kroot"
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
          "T": "9",
          "Sv": "2+",
          "W": "14",
          "Ld": "7+",
          "OC": "4",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-nova-charge",
            "sectionId": "tau-empire-ability-nova-charge",
            "title": "Nova Charge",
            "text": "Once per battle, when this unit is selected to shoot in your Shooting phase, select one ranged weapon equipped by this model. Until the end of the phase, that weapon has the [DEVASTATING WOUNDS] ability.",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "tau-empire-ability-battlesuit-support-system",
            "sectionId": "tau-empire-ability-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "text": "The bearer’s unit is eligible to shoot in a turn in which it Fell Back, but when doing so only models equipped with this wargear can make ranged attacks.",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "tau-empire-ability-weapon-support-system",
            "sectionId": "tau-empire-ability-weapon-support-system",
            "title": "Weapon Support System",
            "text": "Each time the bearer makes a ranged attack, you can ignore any or all modifiers to the Hit roll.",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D6",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-riptide-battlesuit"
          },
          {
            "id": "core-devastating-wounds",
            "sectionId": "core-devastating-wounds",
            "title": "Devastating Wounds",
            "text": "Each time an attack made with a [DEVASTATING WOUNDS] weapon results in a critical wound, the attack sequence for that attack ends and the target unit suffers a number of mortal wounds equal to the D characteristic of that weapon. These are inflicted after resolving any normal damage inflicted by those attacks. \n Mortal wounds inflicted by [DEVASTATING WOUNDS] weapons can damage a maximum of one model for each critical wound; any remaining mortal wounds inflicted by that attack are lost. \n Example: An attack made with a [DEVASTATING WOUNDS] weapon with a D characteristic of 3 results in a critical wound against an Intercessor Squad, so inflicts 3 mortal wounds. The first 2 mortal wounds are sufficient to destroy 1 Intercessor model, so the remaining mortal wound is lost.*",
            "sourceUnitId": "unit-riptide-battlesuit"
          }
        ],
        "models": [
          {
            "id": "unit-riptide-battlesuit-model-riptide-battlesuit",
            "title": "Riptide Battlesuit",
            "aliases": [
              "Riptide Battlesuit"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-riptide-battlesuit-selection-riptide-fists",
            "title": "Riptide fists",
            "aliases": [
              "Riptide fists"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-riptide-fists-melee"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-heavy-burst-cannon",
            "title": "Heavy burst cannon",
            "aliases": [
              "Heavy burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-heavy-burst-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-ion-accelerator-standard",
            "title": "➤ Ion accelerator - standard",
            "aliases": [
              "➤ Ion accelerator - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-ion-accelerator-standard-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-ion-accelerator-supercharge",
            "title": "➤ Ion accelerator - supercharge",
            "aliases": [
              "➤ Ion accelerator - supercharge"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-ion-accelerator-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-missile-pod-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-twin-smart-missile-system",
            "title": "Twin smart missile system",
            "aliases": [
              "Twin smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-twin-smart-missile-system-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-twin-fusion-blaster",
            "title": "Twin fusion blaster",
            "aliases": [
              "Twin fusion blaster"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-twin-fusion-blaster-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-selection-twin-plasma-rifle",
            "title": "Twin plasma rifle",
            "aliases": [
              "Twin plasma rifle"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-riptide-battlesuit-profile-twin-plasma-rifle-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-riptide-battlesuit-weapon-family-ion-accelerator-selection",
            "title": "➤ Ion accelerator",
            "aliases": [
              "➤ Ion accelerator"
            ],
            "kind": "weapon",
            "familyId": "unit-riptide-battlesuit-weapon-family-ion-accelerator",
            "profileIds": [
              "unit-riptide-battlesuit-profile-ion-accelerator-standard-ranged-3",
              "unit-riptide-battlesuit-profile-ion-accelerator-supercharge-ranged-4"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-riptide-battlesuit-weapon-family-ion-accelerator",
            "title": "➤ Ion accelerator",
            "aliases": [
              "➤ Ion accelerator"
            ],
            "profileIds": [
              "unit-riptide-battlesuit-profile-ion-accelerator-standard-ranged-3",
              "unit-riptide-battlesuit-profile-ion-accelerator-supercharge-ranged-4"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-riptide-battlesuit-profile-riptide-fists-melee",
            "title": "Riptide fists",
            "mode": "melee",
            "range": "Melee",
            "a": "6",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-riptide-fists"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-heavy-burst-cannon-ranged-2",
            "title": "Heavy burst cannon",
            "mode": "ranged",
            "range": "36\"",
            "a": "12",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-heavy-burst-cannon"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-ion-accelerator-standard-ranged-3",
            "title": "➤ Ion accelerator - standard",
            "mode": "ranged",
            "range": "72\"",
            "a": "6",
            "skill": "4+",
            "s": "9",
            "ap": "-2",
            "d": "3",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-ion-accelerator-standard",
              "unit-riptide-battlesuit-weapon-family-ion-accelerator-selection"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-ion-accelerator-supercharge-ranged-4",
            "title": "➤ Ion accelerator - supercharge",
            "mode": "ranged",
            "range": "72\"",
            "a": "6",
            "skill": "4+",
            "s": "10",
            "ap": "-3",
            "d": "4",
            "abilities": "Hazardous",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-ion-accelerator-supercharge",
              "unit-riptide-battlesuit-weapon-family-ion-accelerator-selection"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-missile-pod-ranged-5",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "5+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-missile-pod"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-twin-smart-missile-system-ranged-6",
            "title": "Twin smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire, Twin-linked",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-twin-smart-missile-system"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-twin-fusion-blaster-ranged-7",
            "title": "Twin fusion blaster",
            "mode": "ranged",
            "range": "12\"",
            "a": "1",
            "skill": "4+",
            "s": "9",
            "ap": "-4",
            "d": "D6",
            "abilities": "Melta 2, Twin-linked",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-twin-fusion-blaster"
            ]
          },
          {
            "id": "unit-riptide-battlesuit-profile-twin-plasma-rifle-ranged-8",
            "title": "Twin plasma rifle",
            "mode": "ranged",
            "range": "18\"",
            "a": "1",
            "skill": "4+",
            "s": "8",
            "ap": "-3",
            "d": "3",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-riptide-battlesuit-selection-twin-plasma-rifle"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sky-ray-gunship",
      "title": "Sky Ray Gunship",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Fly",
        "Markerlight",
        "Sky Ray Gunship",
        "T'au Empire",
        "Non-Kroot",
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
          "W": "14",
          "Ld": "7+",
          "OC": "3",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-velocity-tracker",
            "sectionId": "tau-empire-ability-velocity-tracker",
            "title": "Velocity Tracker",
            "text": "Each time this model makes an attack with a ranged weapon that targets a unit that can FLY, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-sky-ray-gunship"
          },
          {
            "id": "tau-empire-ability-damaged-1-5-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-5-wounds-remaining",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-sky-ray-gunship"
          },
          {
            "id": "tau-empire-ability-targeting-array",
            "sectionId": "tau-empire-ability-targeting-array",
            "title": "Targeting Array",
            "text": "Each time this model is selected to shoot, you can re-roll one Hit roll or you can re-roll one Wound roll when resolving those attacks.",
            "sourceUnitId": "unit-sky-ray-gunship"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-sky-ray-gunship"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-sky-ray-gunship"
          }
        ],
        "models": [
          {
            "id": "unit-sky-ray-gunship-model-sky-ray-gunship",
            "title": "Sky Ray Gunship",
            "aliases": [
              "Sky Ray Gunship"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sky-ray-gunship-selection-seeker-missile-rack",
            "title": "Seeker missile rack",
            "aliases": [
              "Seeker missile rack"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sky-ray-gunship-profile-seeker-missile-rack-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sky-ray-gunship-selection-accelerator-burst-cannon",
            "title": "Accelerator burst cannon",
            "aliases": [
              "Accelerator burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sky-ray-gunship-profile-accelerator-burst-cannon-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sky-ray-gunship-selection-twin-pulse-carbine",
            "title": "Twin pulse carbine",
            "aliases": [
              "Twin pulse carbine"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sky-ray-gunship-profile-twin-pulse-carbine-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sky-ray-gunship-selection-smart-missile-system",
            "title": "Smart missile system",
            "aliases": [
              "Smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sky-ray-gunship-profile-smart-missile-system-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sky-ray-gunship-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sky-ray-gunship-profile-armoured-hull-melee-5"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-sky-ray-gunship-profile-seeker-missile-rack-ranged",
            "title": "Seeker missile rack",
            "mode": "ranged",
            "range": "48\"",
            "a": "3",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-sky-ray-gunship-selection-seeker-missile-rack"
            ]
          },
          {
            "id": "unit-sky-ray-gunship-profile-accelerator-burst-cannon-ranged-2",
            "title": "Accelerator burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "6",
            "ap": "-1",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sky-ray-gunship-selection-accelerator-burst-cannon"
            ]
          },
          {
            "id": "unit-sky-ray-gunship-profile-twin-pulse-carbine-ranged-3",
            "title": "Twin pulse carbine",
            "mode": "ranged",
            "range": "20\"",
            "a": "2",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Twin-linked, Assault",
            "sourceSelectionIds": [
              "unit-sky-ray-gunship-selection-twin-pulse-carbine"
            ]
          },
          {
            "id": "unit-sky-ray-gunship-profile-smart-missile-system-ranged-4",
            "title": "Smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Indirect Fire",
            "sourceSelectionIds": [
              "unit-sky-ray-gunship-selection-smart-missile-system"
            ]
          },
          {
            "id": "unit-sky-ray-gunship-profile-armoured-hull-melee-5",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sky-ray-gunship-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-stormsurge",
      "title": "Stormsurge",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Walker",
        "Titanic",
        "Towering",
        "Stormsurge",
        "T'au Empire",
        "Non-Kroot"
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
          "W": "20",
          "Ld": "7+",
          "OC": "6",
          "Invulnerable": "4+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-damaged-1-5-wounds-remaining-2",
            "sectionId": "tau-empire-ability-damaged-1-5-wounds-remaining-2",
            "title": "Damaged: 1-5 Wounds Remaining",
            "text": "While this model has 1-5 wounds remaining, subtract 3 from this models Objective Control characteristic, and each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-stormsurge"
          },
          {
            "id": "tau-empire-ability-heavy-walker",
            "sectionId": "tau-empire-ability-heavy-walker",
            "title": "Heavy Walker",
            "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding TITANIC models) and terrain features that are 4\" or less in height as if they were not there.",
            "sourceUnitId": "unit-stormsurge"
          },
          {
            "id": "tau-empire-ability-support-system",
            "sectionId": "tau-empire-ability-support-system",
            "title": "Support System",
            "text": "Each time this model makes a ranged attack, you can ignore any or all modifiers to the Hit roll.",
            "sourceUnitId": "unit-stormsurge"
          },
          {
            "id": "tau-empire-ability-titan-killer",
            "sectionId": "tau-empire-ability-titan-killer",
            "title": "Titan-killer",
            "text": "Each time this model makes a ranged attack that targets a TITANIC or TOWERING unit, you can re-roll the Hit roll.",
            "sourceUnitId": "unit-stormsurge"
          },
          {
            "id": "tau-empire-ability-deadly-demise-d6-2",
            "sectionId": "tau-empire-ability-deadly-demise-d6-2",
            "title": "Deadly Demise D6+2",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-stormsurge"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-stormsurge"
          }
        ],
        "models": [
          {
            "id": "unit-stormsurge-model-stormsurge",
            "title": "Stormsurge",
            "aliases": [
              "Stormsurge"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-stormsurge-selection-cluster-rocket-system",
            "title": "Cluster rocket system",
            "aliases": [
              "Cluster rocket system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-cluster-rocket-system-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-destroyer-missiles",
            "title": "Destroyer missiles",
            "aliases": [
              "Destroyer missiles"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-destroyer-missiles-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-thunderous-footfalls",
            "title": "Thunderous footfalls",
            "aliases": [
              "Thunderous footfalls"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-thunderous-footfalls-melee-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-twin-smart-missile-system",
            "title": "Twin smart missile system",
            "aliases": [
              "Twin smart missile system"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-twin-smart-missile-system-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-pulse-driver-cannon",
            "title": "Pulse Driver Cannon",
            "aliases": [
              "Pulse Driver Cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-pulse-driver-cannon-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-pulse-blast-cannon-focused",
            "title": "➤ Pulse blast cannon - focused",
            "aliases": [
              "➤ Pulse blast cannon - focused"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-pulse-blast-cannon-focused-ranged-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-pulse-blast-cannon-dispersed",
            "title": "➤ Pulse blast cannon - dispersed",
            "aliases": [
              "➤ Pulse blast cannon - dispersed"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-pulse-blast-cannon-dispersed-ranged-7"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-twin-airbursting-fragmentation-projector",
            "title": "Twin airbursting fragmentation projector",
            "aliases": [
              "Twin airbursting fragmentation projector"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-twin-airbursting-fragmentation-projector-ranged-8"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-twin-burst-cannon",
            "title": "Twin burst cannon",
            "aliases": [
              "Twin burst cannon"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-twin-burst-cannon-ranged-9"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-selection-twin-tau-flamer",
            "title": "Twin T'au flamer",
            "aliases": [
              "Twin T'au flamer"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-stormsurge-profile-twin-tau-flamer-ranged-10"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-stormsurge-weapon-family-pulse-blast-cannon-selection",
            "title": "➤ Pulse blast cannon",
            "aliases": [
              "➤ Pulse blast cannon"
            ],
            "kind": "weapon",
            "familyId": "unit-stormsurge-weapon-family-pulse-blast-cannon",
            "profileIds": [
              "unit-stormsurge-profile-pulse-blast-cannon-focused-ranged-6",
              "unit-stormsurge-profile-pulse-blast-cannon-dispersed-ranged-7"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-stormsurge-weapon-family-pulse-blast-cannon",
            "title": "➤ Pulse blast cannon",
            "aliases": [
              "➤ Pulse blast cannon"
            ],
            "profileIds": [
              "unit-stormsurge-profile-pulse-blast-cannon-focused-ranged-6",
              "unit-stormsurge-profile-pulse-blast-cannon-dispersed-ranged-7"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-stormsurge-profile-cluster-rocket-system-ranged",
            "title": "Cluster rocket system",
            "mode": "ranged",
            "range": "48\"",
            "a": "4D6",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-cluster-rocket-system"
            ]
          },
          {
            "id": "unit-stormsurge-profile-destroyer-missiles-ranged-2",
            "title": "Destroyer missiles",
            "mode": "ranged",
            "range": "72\"",
            "a": "1",
            "skill": "4+",
            "s": "16",
            "ap": "-4",
            "d": "D6+2",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-destroyer-missiles"
            ]
          },
          {
            "id": "unit-stormsurge-profile-thunderous-footfalls-melee-3",
            "title": "Thunderous footfalls",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "8",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-thunderous-footfalls"
            ]
          },
          {
            "id": "unit-stormsurge-profile-twin-smart-missile-system-ranged-4",
            "title": "Twin smart missile system",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Heavy, Indirect Fire, Twin-Linked",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-twin-smart-missile-system"
            ]
          },
          {
            "id": "unit-stormsurge-profile-pulse-driver-cannon-ranged-5",
            "title": "Pulse Driver Cannon",
            "mode": "ranged",
            "range": "72\"",
            "a": "D6+3",
            "skill": "4+",
            "s": "12",
            "ap": "-3",
            "d": "3",
            "abilities": "Blast, Heavy",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-pulse-driver-cannon"
            ]
          },
          {
            "id": "unit-stormsurge-profile-pulse-blast-cannon-focused-ranged-6",
            "title": "➤ Pulse blast cannon - focused",
            "mode": "ranged",
            "range": "24\"",
            "a": "2",
            "skill": "4+",
            "s": "24",
            "ap": "-6",
            "d": "12",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-pulse-blast-cannon-focused",
              "unit-stormsurge-weapon-family-pulse-blast-cannon-selection"
            ]
          },
          {
            "id": "unit-stormsurge-profile-pulse-blast-cannon-dispersed-ranged-7",
            "title": "➤ Pulse blast cannon - dispersed",
            "mode": "ranged",
            "range": "48\"",
            "a": "6",
            "skill": "4+",
            "s": "10",
            "ap": "-2",
            "d": "4",
            "abilities": "Heavy",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-pulse-blast-cannon-dispersed",
              "unit-stormsurge-weapon-family-pulse-blast-cannon-selection"
            ]
          },
          {
            "id": "unit-stormsurge-profile-twin-airbursting-fragmentation-projector-ranged-8",
            "title": "Twin airbursting fragmentation projector",
            "mode": "ranged",
            "range": "24\"",
            "a": "D6",
            "skill": "4+",
            "s": "3",
            "ap": "0",
            "d": "1",
            "abilities": "Blast, Heavy, Indirect Fire, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-twin-airbursting-fragmentation-projector"
            ]
          },
          {
            "id": "unit-stormsurge-profile-twin-burst-cannon-ranged-9",
            "title": "Twin burst cannon",
            "mode": "ranged",
            "range": "18\"",
            "a": "4",
            "skill": "4+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Heavy, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-twin-burst-cannon"
            ]
          },
          {
            "id": "unit-stormsurge-profile-twin-tau-flamer-ranged-10",
            "title": "Twin T'au flamer",
            "mode": "ranged",
            "range": "12\"",
            "a": "D6",
            "skill": "N/A",
            "s": "4",
            "ap": "0",
            "d": "1",
            "abilities": "Ignores Cover, Torrent, Twin-linked",
            "sourceSelectionIds": [
              "unit-stormsurge-selection-twin-tau-flamer"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-sun-shark-bomber",
      "title": "Sun Shark Bomber",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Vehicle",
        "Aircraft",
        "Fly",
        "Sun Shark Bomber",
        "T'au Empire",
        "Non-Kroot",
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
          "T": "9",
          "Sv": "3+",
          "W": "12",
          "Ld": "7+",
          "OC": "-",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-pulse-bombs",
            "sectionId": "tau-empire-ability-pulse-bombs",
            "title": "Pulse Bombs",
            "text": "At the end of your opponent’s Fight phase, select one visible enemy unit (excluding Lone Operative units) within 24\" of this unit, and roll six D6 for that unit: For each 4+, that unit suffers 1 mortal wound.",
            "sourceUnitId": "unit-sun-shark-bomber"
          },
          {
            "id": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "sectionId": "tau-empire-ability-damaged-1-4-wounds-remaining",
            "title": "Damaged: 1-4 Wounds Remaining",
            "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
            "sourceUnitId": "unit-sun-shark-bomber"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-sun-shark-bomber"
          },
          {
            "id": "tau-empire-ability-for-the-greater-good",
            "sectionId": "tau-empire-ability-for-the-greater-good",
            "title": "For The Greater Good",
            "text": "If your Army Faction is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.\n\nDuring your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding FORTIFICATION and Battle-shocked units) select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.\n\nUnits from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.\n\nUntil the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
            "sourceUnitId": "unit-sun-shark-bomber"
          }
        ],
        "models": [
          {
            "id": "unit-sun-shark-bomber-model-sun-shark-bomber",
            "title": "Sun Shark Bomber",
            "aliases": [
              "Sun Shark Bomber"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-sun-shark-bomber-selection-twin-ion-rifle-standard",
            "title": "➤ Twin ion rifle - standard",
            "aliases": [
              "➤ Twin ion rifle - standard"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-twin-ion-rifle-standard-ranged"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-selection-twin-ion-rifle-overcharged",
            "title": "➤ Twin ion rifle - overcharged",
            "aliases": [
              "➤ Twin ion rifle - overcharged"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-twin-ion-rifle-overcharged-ranged-2"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-selection-twin-missile-pod",
            "title": "Twin missile pod",
            "aliases": [
              "Twin missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-twin-missile-pod-ranged-3"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-selection-missile-pod",
            "title": "Missile pod",
            "aliases": [
              "Missile pod"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-missile-pod-ranged-4"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-selection-seeker-missile",
            "title": "Seeker missile",
            "aliases": [
              "Seeker missile"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-seeker-missile-ranged-5"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-selection-armoured-hull",
            "title": "Armoured hull",
            "aliases": [
              "Armoured hull"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-sun-shark-bomber-profile-armoured-hull-melee-6"
            ],
            "wargearAbilityIds": []
          },
          {
            "id": "unit-sun-shark-bomber-weapon-family-twin-ion-rifle-selection",
            "title": "➤ Twin ion rifle",
            "aliases": [
              "➤ Twin ion rifle"
            ],
            "kind": "weapon",
            "familyId": "unit-sun-shark-bomber-weapon-family-twin-ion-rifle",
            "profileIds": [
              "unit-sun-shark-bomber-profile-twin-ion-rifle-standard-ranged",
              "unit-sun-shark-bomber-profile-twin-ion-rifle-overcharged-ranged-2"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [
          {
            "id": "unit-sun-shark-bomber-weapon-family-twin-ion-rifle",
            "title": "➤ Twin ion rifle",
            "aliases": [
              "➤ Twin ion rifle"
            ],
            "profileIds": [
              "unit-sun-shark-bomber-profile-twin-ion-rifle-standard-ranged",
              "unit-sun-shark-bomber-profile-twin-ion-rifle-overcharged-ranged-2"
            ],
            "ambiguousAlias": false
          }
        ],
        "weaponProfiles": [
          {
            "id": "unit-sun-shark-bomber-profile-twin-ion-rifle-standard-ranged",
            "title": "➤ Twin ion rifle - standard",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "1",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-twin-ion-rifle-standard",
              "unit-sun-shark-bomber-weapon-family-twin-ion-rifle-selection"
            ]
          },
          {
            "id": "unit-sun-shark-bomber-profile-twin-ion-rifle-overcharged-ranged-2",
            "title": "➤ Twin ion rifle - overcharged",
            "mode": "ranged",
            "range": "30\"",
            "a": "3",
            "skill": "4+",
            "s": "8",
            "ap": "-2",
            "d": "2",
            "abilities": "Hazardous, Twin-linked",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-twin-ion-rifle-overcharged",
              "unit-sun-shark-bomber-weapon-family-twin-ion-rifle-selection"
            ]
          },
          {
            "id": "unit-sun-shark-bomber-profile-twin-missile-pod-ranged-3",
            "title": "Twin missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "Twin-linked",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-twin-missile-pod"
            ]
          },
          {
            "id": "unit-sun-shark-bomber-profile-missile-pod-ranged-4",
            "title": "Missile pod",
            "mode": "ranged",
            "range": "30\"",
            "a": "2",
            "skill": "4+",
            "s": "7",
            "ap": "-1",
            "d": "2",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-missile-pod"
            ]
          },
          {
            "id": "unit-sun-shark-bomber-profile-seeker-missile-ranged-5",
            "title": "Seeker missile",
            "mode": "ranged",
            "range": "48\"",
            "a": "1",
            "skill": "4+",
            "s": "14",
            "ap": "-3",
            "d": "D6+1",
            "abilities": "One Shot",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-seeker-missile"
            ]
          },
          {
            "id": "unit-sun-shark-bomber-profile-armoured-hull-melee-6",
            "title": "Armoured hull",
            "mode": "melee",
            "range": "Melee",
            "a": "3",
            "skill": "5+",
            "s": "6",
            "ap": "0",
            "d": "1",
            "abilities": "",
            "sourceSelectionIds": [
              "unit-sun-shark-bomber-selection-armoured-hull"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tidewall-droneport",
      "title": "Tidewall Droneport",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Fortification",
        "Vehicle",
        "Transport",
        "Fly",
        "T'au Empire",
        "Tidewall Droneport",
        "Non-Kroot",
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
          "M": "4\"",
          "T": "8",
          "Sv": "3+",
          "W": "10",
          "Ld": "7+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-droneport",
            "sectionId": "tau-empire-ability-droneport",
            "title": "Droneport",
            "text": "Each time this FORTIFICATION is selected to shoot, its drone defenders weapon will target and resolve attacks against every enemy unit that is an eligible target to this FORTIFICATION.",
            "sourceUnitId": "unit-tidewall-droneport"
          },
          {
            "id": "tau-empire-ability-fortification",
            "sectionId": "tau-empire-ability-fortification",
            "title": "Fortification",
            "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n- That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n- Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so.",
            "sourceUnitId": "unit-tidewall-droneport"
          },
          {
            "id": "tau-empire-ability-tidewall-cover",
            "sectionId": "tau-empire-ability-tidewall-cover",
            "title": "Tidewall Cover",
            "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack.",
            "sourceUnitId": "unit-tidewall-droneport"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tidewall-droneport"
          },
          {
            "id": "core-firing-deck",
            "sectionId": "core-firing-deck",
            "title": "Firing Deck 11",
            "text": "This ability always takes the form Firing Deck X. In your Shooting phase, each time this TRANSPORT is selected to shoot, if one or more units are embarked within it, resolve the following sequence: \n1. Select up to X models embarked within this TRANSPORT (excluding models whose units have already been selected to shoot this phase). \n2. For each selected model, select one of its ranged weapons (excluding [ONE SHOT] weapons). \n3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons. \n4. Until the end of the turn, units embarked within this TRANSPORT are not eligible to shoot.",
            "sourceUnitId": "unit-tidewall-droneport"
          }
        ],
        "models": [
          {
            "id": "unit-tidewall-droneport-model-tidewall-droneport",
            "title": "Tidewall Droneport",
            "aliases": [
              "Tidewall Droneport"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tidewall-droneport-selection-drone-defenders",
            "title": "Drone defenders",
            "aliases": [
              "Drone defenders"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tidewall-droneport-profile-drone-defenders-ranged"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tidewall-droneport-profile-drone-defenders-ranged",
            "title": "Drone defenders",
            "mode": "ranged",
            "range": "20\"",
            "a": "8",
            "skill": "5+",
            "s": "5",
            "ap": "0",
            "d": "1",
            "abilities": "Assault, Twin-linked",
            "sourceSelectionIds": [
              "unit-tidewall-droneport-selection-drone-defenders"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tidewall-gunrig",
      "title": "Tidewall Gunrig",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Fortification",
        "Vehicle",
        "Transport",
        "Fly",
        "Tidewall Gunrig",
        "T'au Empire",
        "Non-Kroot",
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
          "M": "4\"",
          "T": "8",
          "Sv": "3+",
          "W": "14",
          "Ld": "7+",
          "OC": "0",
          "Invulnerable": ""
        },
        "abilities": [
          {
            "id": "tau-empire-ability-fortification",
            "sectionId": "tau-empire-ability-fortification",
            "title": "Fortification",
            "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n- That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n- Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so.",
            "sourceUnitId": "unit-tidewall-gunrig"
          },
          {
            "id": "tau-empire-ability-tidewall-cover",
            "sectionId": "tau-empire-ability-tidewall-cover",
            "title": "Tidewall Cover",
            "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack.",
            "sourceUnitId": "unit-tidewall-gunrig"
          },
          {
            "id": "core-firing-deck",
            "sectionId": "core-firing-deck",
            "title": "Firing Deck 11",
            "text": "This ability always takes the form Firing Deck X. In your Shooting phase, each time this TRANSPORT is selected to shoot, if one or more units are embarked within it, resolve the following sequence: \n1. Select up to X models embarked within this TRANSPORT (excluding models whose units have already been selected to shoot this phase). \n2. For each selected model, select one of its ranged weapons (excluding [ONE SHOT] weapons). \n3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons. \n4. Until the end of the turn, units embarked within this TRANSPORT are not eligible to shoot.",
            "sourceUnitId": "unit-tidewall-gunrig"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tidewall-gunrig"
          }
        ],
        "models": [
          {
            "id": "unit-tidewall-gunrig-model-tidewall-gunrig",
            "title": "Tidewall Gunrig",
            "aliases": [
              "Tidewall Gunrig"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tidewall-gunrig-selection-supremacy-railgun",
            "title": "Supremacy railgun",
            "aliases": [
              "Supremacy railgun"
            ],
            "kind": "weapon",
            "profileIds": [
              "unit-tidewall-gunrig-profile-supremacy-railgun-ranged"
            ],
            "wargearAbilityIds": []
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [
          {
            "id": "unit-tidewall-gunrig-profile-supremacy-railgun-ranged",
            "title": "Supremacy railgun",
            "mode": "ranged",
            "range": "72\"",
            "a": "1",
            "skill": "5+",
            "s": "20",
            "ap": "-5",
            "d": "D6+6",
            "abilities": "Devastating Wounds, Twin-linked",
            "sourceSelectionIds": [
              "unit-tidewall-gunrig-selection-supremacy-railgun"
            ]
          }
        ],
        "wargearAbilities": []
      }
    },
    {
      "id": "unit-tidewall-shieldline",
      "title": "Tidewall Shieldline",
      "sourceBookId": "tau-empire",
      "sourceLayer": "codex",
      "intrinsicKeywords": [
        "Fortification",
        "Vehicle",
        "Transport",
        "Fly",
        "Tidewall Shieldline",
        "T'au Empire",
        "Non-Kroot",
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
          "M": "4\"",
          "T": "8",
          "Sv": "3+",
          "W": "10",
          "Ld": "7+",
          "OC": "0",
          "Invulnerable": "5+"
        },
        "abilities": [
          {
            "id": "tau-empire-ability-fortification",
            "sectionId": "tau-empire-ability-fortification",
            "title": "Fortification",
            "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n- That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n- Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so.",
            "sourceUnitId": "unit-tidewall-shieldline"
          },
          {
            "id": "tau-empire-ability-tidewall-cover",
            "sectionId": "tau-empire-ability-tidewall-cover",
            "title": "Tidewall Cover",
            "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack.",
            "sourceUnitId": "unit-tidewall-shieldline"
          },
          {
            "id": "core-deadly-demise",
            "sectionId": "core-deadly-demise",
            "title": "Deadly Demise D3",
            "text": "This ability always takes the form Deadly Demise X. Each time a model in this unit is destroyed, after the units embarked within it (if any) have made their emergency disembark moves, roll one D6. On a 6, that model suffers a deadly demise; each unit within 6\" of that model suffers a number of mortal wounds denoted by X (if this is a random number, roll separately for each unit within 6\"). \n *Example: An Impulsor with a unit of Intercessors embarked within it is destroyed by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an emergency disembark move. Then the roll is made for the Deadly Demise ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.*",
            "sourceUnitId": "unit-tidewall-shieldline"
          },
          {
            "id": "core-firing-deck",
            "sectionId": "core-firing-deck",
            "title": "Firing Deck 20",
            "text": "This ability always takes the form Firing Deck X. In your Shooting phase, each time this TRANSPORT is selected to shoot, if one or more units are embarked within it, resolve the following sequence: \n1. Select up to X models embarked within this TRANSPORT (excluding models whose units have already been selected to shoot this phase). \n2. For each selected model, select one of its ranged weapons (excluding [ONE SHOT] weapons). \n3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons. \n4. Until the end of the turn, units embarked within this TRANSPORT are not eligible to shoot.",
            "sourceUnitId": "unit-tidewall-shieldline"
          }
        ],
        "models": [
          {
            "id": "unit-tidewall-shieldline-model-tidewall-shieldline",
            "title": "Tidewall Shieldline",
            "aliases": [
              "Tidewall Shieldline"
            ]
          }
        ],
        "selections": [
          {
            "id": "unit-tidewall-shieldline-selection-tidewall-defence-platform",
            "title": "Tidewall Defence Platform",
            "aliases": [
              "Tidewall Defence Platform"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [
              "unit-tidewall-shieldline-wargear-ability-tidewall-defence-platform"
            ]
          }
        ],
        "weaponFamilies": [],
        "weaponProfiles": [],
        "wargearAbilities": [
          {
            "id": "unit-tidewall-shieldline-wargear-ability-tidewall-defence-platform",
            "title": "Tidewall Defence Platform",
            "requiredSelectionIds": [
              "unit-tidewall-shieldline-selection-tidewall-defence-platform"
            ]
          }
        ]
      }
    }
  ],
  "detachments": [
    {
      "id": "advanced-acquisition-cadre",
      "title": "Advanced Acquisition Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-expert-fieldcraft"
      ]
    },
    {
      "id": "auxiliary-cadre",
      "title": "Auxiliary Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-integrated-command-structure"
      ]
    },
    {
      "id": "experimental-prototype-cadre",
      "title": "Experimental Prototype Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-superior-craftsmanship"
      ]
    },
    {
      "id": "kauyon",
      "title": "Kauyon",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-patient-hunter"
      ]
    },
    {
      "id": "kroot-hunting-pack",
      "title": "Kroot Hunting Pack",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-hunters-instincts-skirmish-fighters"
      ]
    },
    {
      "id": "montka",
      "title": "Mont'ka",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-killing-blow"
      ]
    },
    {
      "id": "retaliation-cadre",
      "title": "Retaliation Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": [],
      "detachmentRuleIds": [
        "tau-empire-detachment-rule-bonded-heroes"
      ]
    }
  ],
  "detachmentRules": [
    {
      "id": "tau-empire-detachment-rule-expert-fieldcraft",
      "title": "Expert Fieldcraft",
      "text": "In your Shooting phase, when a friendly PATHFINDER TEAM/STEALTH BATTLESUITS unit is selected to shoot, those ranged attacks do not prevent your unit from being hidden.",
      "sectionId": "advanced-acquisition-cadre-rule",
      "detachmentId": "advanced-acquisition-cadre",
      "detachmentTitle": "Advanced Acquisition Cadre",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-integrated-command-structure",
      "title": "Integrated Command Structure",
      "text": "Friendly KROOT/VESPID STINGWINGS units have the following ability: Harnessed Alien Instincts: In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is prey-marked. While a unit is prey-marked, that unit has +3\" detection range. Friendly GHOSTKEEL BATTLESUIT/STEALTH BATTLESUITS units have the following ability: Localised Stealth Projectors (Aura): When a friendly KROOT/VESPID STINGWINGS unit within 6\" of this unit has shot, those attacks do not prevent that unit from being hidden. This detachment has the AUXILIARIES tag and cannot be taken with another AUXILIARIES detachment.",
      "sectionId": "auxiliary-cadre-rule",
      "detachmentId": "auxiliary-cadre",
      "detachmentTitle": "Auxiliary Cadre",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-superior-craftsmanship",
      "title": "Superior Craftsmanship",
      "text": "Friendly BATTLESUIT CHARACTER units’ ranged attacks have +6\" R. This detachment has the RETALIATION tag and cannot be taken with another RETALIATION detachment.",
      "sectionId": "experimental-prototype-cadre-rule",
      "detachmentId": "experimental-prototype-cadre",
      "detachmentTitle": "Experimental Prototype Cadre",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-patient-hunter",
      "title": "Patient Hunter",
      "text": "During the third, fourth and fifth battle rounds, ranged weapons equipped by T’AU EMPIRE models from your army have the [SUSTAINED HITS 1] ability. During the third, fourth and fifth battle rounds, while a unit is a Guided unit (see For the Greater Good), each time a ranged attack is made by a model in that unit that targets a Spotted unit, you can ignore any or all modifiers to that attack’s Ballistic skill characteristics and/or all modifiers to the Hit roll.",
      "sectionId": "kauyon-rule",
      "detachmentId": "kauyon",
      "detachmentTitle": "Kauyon",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-hunters-instincts-skirmish-fighters",
      "title": "Hunter's Instincts & Skirmish Fighters",
      "text": "Each time a KROOT model from your army makes an attack, add 1 to the Hit roll if the target of that attack is below its Starting Strength, and add 1 to the Wound roll as well if the target of that attack is Below Half-strength.\n\nKROOT models from your army have a 6+ invulnerable save against melee attacks and a 5+ invulnerable save against ranged attacks.",
      "sectionId": "kroot-hunting-pack-rule",
      "detachmentId": "kroot-hunting-pack",
      "detachmentTitle": "Kroot Hunting Pack",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-killing-blow",
      "title": "Killing Blow",
      "text": "During the first, second and third battle rounds, ranged weapons equipped by T’AU EMPIRE models from your army have the [ASSAULT] ability. During the first, second and third battle rounds, while a unit is a Guided unit (see For the Greater Good), its ranged weapons have the [LETHAL HITS] ability.",
      "sectionId": "montka-rule",
      "detachmentId": "montka",
      "detachmentTitle": "Mont'ka",
      "sourceBookId": "tau-empire"
    },
    {
      "id": "tau-empire-detachment-rule-bonded-heroes",
      "title": "Bonded Heroes",
      "text": "Each time a T’AU EMPIRE BATTLESUIT model from your army makes a ranged attack that targets a unit within 12\", improve the Strength characteristic of that attack by 1. If that attack targets a unit within 8\", improve the Armour Penetration characteristic of that attack by 1 as well.",
      "sectionId": "retaliation-cadre-rule",
      "detachmentId": "retaliation-cadre",
      "detachmentTitle": "Retaliation Cadre",
      "sourceBookId": "tau-empire"
    }
  ],
  "enhancements": [
    {
      "id": "negation-emitters-upgrade",
      "title": "Negation Emitters Upgrade",
      "text": "STEALTH BATTLESUITS unit only. This unit has -3\" detection range.",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
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
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "advanced-acquisition-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "negation-emitters-upgrade"
    },
    {
      "id": "unmasking-suite-upgrade",
      "title": "Unmasking Suite Upgrade",
      "text": "GHOSTKEEL BATTLESUIT/PATHFINDER TEAM/STEALTH BATTLESUITS unit only. When this unit is selected to shoot, you can select one enemy unit within 24\" of this unit. That enemy unit has +9\" detection range until this unit has shot.",
      "sourcePages": [
        2
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
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
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "advanced-acquisition-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "unmasking-suite-upgrade"
    },
    {
      "id": "student-of-kauyon",
      "title": "Student of Kauyon",
      "text": "KROOT SHAPER model only. In the Declare Battle Formations step, you can select up to three friendly KROOT CARNIVORES/FARSTALKERS units. Those units have Deep Strike.",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "auxiliary-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "student-of-kauyon"
    },
    {
      "id": "admired-leader",
      "title": "Admired Leader",
      "text": "T’AU EMPIRE model only (excluding KROOT models). In your Command phase, you can select one KROOT/VESPID STINGWINGS unit within 12\" of this model. If you do, that unit has +1 Ld and OC until the start of your next Command phase.",
      "sourcePages": [
        3
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
        "sourcePages": [
          3
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "auxiliary-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "admired-leader"
    },
    {
      "id": "thermoneutronic-projector",
      "title": "Thermoneutronic Projector",
      "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s T’au Flamer weapons. That weapon’s attacks have: +2 S; +1 AP and D.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "tags": [],
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "experimental-prototype-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "thermoneutronic-projector"
    },
    {
      "id": "plasma-accelerator-rifle",
      "title": "Plasma Accelerator Rifle",
      "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s Plasma Rifle weapons. That weapon’s attacks have: +2 S; +1 A, AP and D.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "tags": [],
      "value": 20,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "experimental-prototype-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "plasma-accelerator-rifle"
    },
    {
      "id": "supernova-launcher",
      "title": "Supernova Launcher",
      "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s Airbursting Fragmentation Projector weapons. That weapon’s attacks have: +3 S; +1 AP and D.",
      "sourcePages": [
        4
      ],
      "provenance": {
        "sourceId": "tau-empire-faction-pack-v1.1",
        "sourcePages": [
          4
        ]
      },
      "tags": [],
      "value": 15,
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "experimental-prototype-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "supernova-launcher"
    },
    {
      "id": "enhancement-exemplar-of-the-kauyon",
      "title": "Exemplar of the Kauyon",
      "value": 20,
      "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, the Patient Hunter Detachment rule applies to that unit from the second battle round onwards instead of from the third.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kauyon",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-exemplar-of-the-kauyon"
    },
    {
      "id": "enhancement-precision-of-the-patient-hunter",
      "title": "Precision of the Patient Hunter",
      "value": 15,
      "text": "T’AU EMPIRE model only. Each time the bearer makes a ranged attack, add 1 to the Hit roll. From the third battle round onwards, add 1 to the Wound roll as well.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kauyon",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-precision-of-the-patient-hunter"
    },
    {
      "id": "enhancement-solid-image-projection-unit",
      "title": "Solid-image Projection Unit",
      "value": 20,
      "text": "T’AU EMPIRE model only. After both players have deployed their armies, select up to three T’AU EMPIRE units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kauyon",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-solid-image-projection-unit"
    },
    {
      "id": "enhancement-through-unity-devastation",
      "title": "Through Unity, Devastation",
      "value": 30,
      "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [LETHAL HITS] ability while targeting their Spotted unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kauyon",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-through-unity-devastation"
    },
    {
      "id": "enhancement-borthrod-gland",
      "title": "Borthrod Gland",
      "value": 15,
      "text": "Kroot Flesh Shaper only. While the bearer is leading a unit, each time a model in that unit makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kroot-hunting-pack",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-borthrod-gland"
    },
    {
      "id": "enhancement-kroothawk-flock",
      "title": "Kroothawk Flock",
      "value": 10,
      "text": "KROOT model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability, and enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" horizontally of the bearer.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kroot-hunting-pack",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-kroothawk-flock"
    },
    {
      "id": "enhancement-nomadic-hunter",
      "title": "Nomadic Hunter",
      "value": 20,
      "text": "KROOT TRAIL SHAPER model only. While the bearer is leading a unit, add 3\" to the Move characteristic of models in that unit and ranged weapons equipped by models in that unit have the [ASSAULT] ability.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kroot-hunting-pack",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-nomadic-hunter"
    },
    {
      "id": "enhancement-root-carved-weapons",
      "title": "Root-carved Weapons",
      "value": 10,
      "text": "Kroot War Shaper model only. All weapons equipped by the bearer have the [PRECISION] and [DEVASTATING WOUNDS] abilities.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "kroot-hunting-pack",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-root-carved-weapons"
    },
    {
      "id": "enhancement-coordinated-exploitation",
      "title": "Coordinated Exploitation",
      "value": 30,
      "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [SUSTAINED HITS 1] ability while targeting their Spotted unit.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "montka",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-coordinated-exploitation"
    },
    {
      "id": "enhancement-exemplar-of-the-montka",
      "title": "Exemplar of the Mont’ka",
      "value": 10,
      "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, the Killing Blow Detachment rule applies to that unit during the fourth battle round as well.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "montka",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-exemplar-of-the-montka"
    },
    {
      "id": "enhancement-strategic-conqueror",
      "title": "Strategic Conqueror",
      "value": 15,
      "text": "T’AU EMPIRE model only. At the start of the first battle round, before the first turn begins, select one objective marker on the battlefield. While a friendly T’AU EMPIRE model is within range of that objective marker and the bearer is on the battlefield, add 1 to that friendly model’s Objective Control characteristic.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "montka",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-strategic-conqueror"
    },
    {
      "id": "enhancement-strike-swiftly",
      "title": "Strike Swiftly",
      "value": 35,
      "text": "In the Resolve Pre-battle Abilities step, you can select up to two friendly T’AU EMPIRE units within 6\" of this model that do not have the Scouts ability. Until the end of the battle, all models in the selected units have the Scouts 6\" ability.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "montka",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-strike-swiftly"
    },
    {
      "id": "enhancement-internal-grenade-racks",
      "title": "Internal Grenade Racks",
      "value": 20,
      "text": "T’AU EMPIRE BATTLESUIT model only. The bearer has the GRENADES keyword, and each time the bearer ends a Normal move, you can select one enemy unit that it moved over during that move. If you do, roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "retaliation-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-internal-grenade-racks"
    },
    {
      "id": "enhancement-prototype-weapon-system",
      "title": "Prototype Weapon System",
      "value": 15,
      "text": "T’AU EMPIRE BATTLESUIT model only. Each time the bearer is selected to shoot, select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until those attacks are resolved, ranged weapons equipped by the bearer have the selected ability.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "retaliation-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-prototype-weapon-system"
    },
    {
      "id": "enhancement-puretide-engram-neurochip",
      "title": "Puretide Engram Neurochip",
      "value": 15,
      "text": "T’AU EMPIRE BATTLESUIT model only. Each time you target the bearer’s unit with a Stratagem, roll one D6: on a 4+, you gain 1CP.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "retaliation-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-puretide-engram-neurochip"
    },
    {
      "id": "enhancement-starflare-ignition-system",
      "title": "Starflare Ignition System",
      "value": 20,
      "text": "T’AU EMPIRE BATTLESUIT model only. At the end of your opponent’s turn, if the bearer’s unit is not within Engagement Range of one or more enemy units, you can remove that unit from the battlefield and place it into Strategic Reserves.",
      "pointsSource": {
        "label": "Official MFM v1.2",
        "url": "https://mfm.warhammer-community.com/en/tau-empire",
        "verifiedAt": "2026-08-11"
      },
      "detachmentId": "retaliation-cadre",
      "sourceBookId": "tau-empire",
      "legacyKey": "enhancement-starflare-ignition-system"
    }
  ]
});
window.WH_BOOK_ROSTER_ENHANCEMENTS=Object.freeze({
  "negation emitters upgrade": {
    "title": "Negation Emitters Upgrade",
    "text": "STEALTH BATTLESUITS unit only. This unit has -3\" detection range.",
    "value": 15,
    "detachment": "Advanced Acquisition Cadre",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-stealth-battlesuits"
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
  "unmasking suite upgrade": {
    "title": "Unmasking Suite Upgrade",
    "text": "GHOSTKEEL BATTLESUIT/PATHFINDER TEAM/STEALTH BATTLESUITS unit only. When this unit is selected to shoot, you can select one enemy unit within 24\" of this unit. That enemy unit has +9\" detection range until this unit has shot.",
    "value": 15,
    "detachment": "Advanced Acquisition Cadre",
    "tags": [
      "UPGRADE"
    ],
    "owner": {
      "subject": "unit",
      "selector": {
        "unitIds": [
          "unit-pathfinder-team",
          "unit-stealth-battlesuits",
          "unit-ghostkeel-battlesuit"
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
  "student of kauyon": {
    "title": "Student of Kauyon",
    "text": "KROOT SHAPER model only. In the Declare Battle Formations step, you can select up to three friendly KROOT CARNIVORES/FARSTALKERS units. Those units have Deep Strike.",
    "value": 20,
    "detachment": "Auxiliary Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-kroot-flesh-shaper",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper"
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
  "admired leader": {
    "title": "Admired Leader",
    "text": "T’AU EMPIRE model only (excluding KROOT models). In your Command phase, you can select one KROOT/VESPID STINGWINGS unit within 12\" of this model. If you do, that unit has +1 Ld and OC until the start of your next Command phase.",
    "value": 20,
    "detachment": "Auxiliary Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-commander-in-crisis-battlesuit"
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
  "thermoneutronic projector": {
    "title": "Thermoneutronic Projector",
    "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s T’au Flamer weapons. That weapon’s attacks have: +2 S; +1 AP and D.",
    "value": 15,
    "detachment": "Experimental Prototype Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "plasma accelerator rifle": {
    "title": "Plasma Accelerator Rifle",
    "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s Plasma Rifle weapons. That weapon’s attacks have: +2 S; +1 A, AP and D.",
    "value": 20,
    "detachment": "Experimental Prototype Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "supernova launcher": {
    "title": "Supernova Launcher",
    "text": "BATTLESUIT model only. In the Declare Battle Formations step, select one of this model’s Airbursting Fragmentation Projector weapons. That weapon’s attacks have: +3 S; +1 AP and D.",
    "value": 15,
    "detachment": "Experimental Prototype Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "exemplar of the kauyon": {
    "title": "Exemplar of the Kauyon",
    "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, the Patient Hunter Detachment rule applies to that unit from the second battle round onwards instead of from the third.",
    "value": 20,
    "detachment": "Kauyon",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-lone-spear",
          "unit-commander-in-crisis-battlesuit"
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
  "precision of the patient hunter": {
    "title": "Precision of the Patient Hunter",
    "text": "T’AU EMPIRE model only. Each time the bearer makes a ranged attack, add 1 to the Hit roll. From the third battle round onwards, add 1 to the Wound roll as well.",
    "value": 15,
    "detachment": "Kauyon",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-flesh-shaper",
          "unit-kroot-lone-spear",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper",
          "unit-commander-in-crisis-battlesuit"
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
  "solid image projection unit": {
    "title": "Solid-image Projection Unit",
    "text": "T’AU EMPIRE model only. After both players have deployed their armies, select up to three T’AU EMPIRE units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
    "value": 20,
    "detachment": "Kauyon",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-flesh-shaper",
          "unit-kroot-lone-spear",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper",
          "unit-commander-in-crisis-battlesuit"
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
  "through unity devastation": {
    "title": "Through Unity, Devastation",
    "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [LETHAL HITS] ability while targeting their Spotted unit.",
    "value": 30,
    "detachment": "Kauyon",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-lone-spear",
          "unit-commander-in-crisis-battlesuit"
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
  "borthrod gland": {
    "title": "Borthrod Gland",
    "text": "Kroot Flesh Shaper only. While the bearer is leading a unit, each time a model in that unit makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.",
    "value": 15,
    "detachment": "Kroot Hunting Pack",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-kroot-flesh-shaper"
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
  "kroothawk flock": {
    "title": "Kroothawk Flock",
    "text": "KROOT model only. Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability, and enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" horizontally of the bearer.",
    "value": 10,
    "detachment": "Kroot Hunting Pack",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-kroot-flesh-shaper",
          "unit-kroot-lone-spear",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper"
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
  "nomadic hunter": {
    "title": "Nomadic Hunter",
    "text": "KROOT TRAIL SHAPER model only. While the bearer is leading a unit, add 3\" to the Move characteristic of models in that unit and ranged weapons equipped by models in that unit have the [ASSAULT] ability.",
    "value": 20,
    "detachment": "Kroot Hunting Pack",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-kroot-trail-shaper"
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
  "root carved weapons": {
    "title": "Root-carved Weapons",
    "text": "Kroot War Shaper model only. All weapons equipped by the bearer have the [PRECISION] and [DEVASTATING WOUNDS] abilities.",
    "value": 10,
    "detachment": "Kroot Hunting Pack",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-kroot-war-shaper"
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
  "coordinated exploitation": {
    "title": "Coordinated Exploitation",
    "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [SUSTAINED HITS 1] ability while targeting their Spotted unit.",
    "value": 30,
    "detachment": "Mont'ka",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-lone-spear",
          "unit-commander-in-crisis-battlesuit"
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
  "exemplar of the mont ka": {
    "title": "Exemplar of the Mont’ka",
    "text": "T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, the Killing Blow Detachment rule applies to that unit during the fourth battle round as well.",
    "value": 10,
    "detachment": "Mont'ka",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-lone-spear",
          "unit-commander-in-crisis-battlesuit"
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
  "strategic conqueror": {
    "title": "Strategic Conqueror",
    "text": "T’AU EMPIRE model only. At the start of the first battle round, before the first turn begins, select one objective marker on the battlefield. While a friendly T’AU EMPIRE model is within range of that objective marker and the bearer is on the battlefield, add 1 to that friendly model’s Objective Control characteristic.",
    "value": 15,
    "detachment": "Mont'ka",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-flesh-shaper",
          "unit-kroot-lone-spear",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper",
          "unit-commander-in-crisis-battlesuit"
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
  "strike swiftly": {
    "title": "Strike Swiftly",
    "text": "In the Resolve Pre-battle Abilities step, you can select up to two friendly T’AU EMPIRE units within 6\" of this model that do not have the Scouts ability. Until the end of the battle, all models in the selected units have the Scouts 6\" ability.",
    "value": 35,
    "detachment": "Mont'ka",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-cadre-fireblade",
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-ethereal",
          "unit-firesight-team",
          "unit-kroot-flesh-shaper",
          "unit-kroot-lone-spear",
          "unit-kroot-trail-shaper",
          "unit-kroot-war-shaper",
          "unit-commander-in-crisis-battlesuit"
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
  "internal grenade racks": {
    "title": "Internal Grenade Racks",
    "text": "T’AU EMPIRE BATTLESUIT model only. The bearer has the GRENADES keyword, and each time the bearer ends a Normal move, you can select one enemy unit that it moved over during that move. If you do, roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.",
    "value": 20,
    "detachment": "Retaliation Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "prototype weapon system": {
    "title": "Prototype Weapon System",
    "text": "T’AU EMPIRE BATTLESUIT model only. Each time the bearer is selected to shoot, select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until those attacks are resolved, ranged weapons equipped by the bearer have the selected ability.",
    "value": 15,
    "detachment": "Retaliation Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "puretide engram neurochip": {
    "title": "Puretide Engram Neurochip",
    "text": "T’AU EMPIRE BATTLESUIT model only. Each time you target the bearer’s unit with a Stratagem, roll one D6: on a 4+, you gain 1CP.",
    "value": 15,
    "detachment": "Retaliation Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
  "starflare ignition system": {
    "title": "Starflare Ignition System",
    "text": "T’AU EMPIRE BATTLESUIT model only. At the end of your opponent’s turn, if the bearer’s unit is not within Engagement Range of one or more enemy units, you can remove that unit from the battlefield and place it into Strategic Reserves.",
    "value": 20,
    "detachment": "Retaliation Cadre",
    "tags": [],
    "owner": {
      "subject": "model",
      "selector": {
        "unitIds": [
          "unit-commander-in-coldstar-battlesuit",
          "unit-commander-in-enforcer-battlesuit",
          "unit-commander-in-crisis-battlesuit"
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
