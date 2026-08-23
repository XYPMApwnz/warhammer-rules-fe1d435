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
            "unitId": "unit-cadre-fireblade"
          },
          {
            "unitId": "unit-ethereal"
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
              "unitId": "unit-cadre-fireblade"
            },
            {
              "unitId": "unit-ethereal"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-breacher-team-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-breacher-team-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-breacher-team-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-cadre-fireblade"
          },
          {
            "unitId": "unit-ethereal"
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
              "unitId": "unit-cadre-fireblade"
            },
            {
              "unitId": "unit-ethereal"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-strike-team-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-strike-team-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-strike-team-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-breacher-team"
          },
          {
            "unitId": "unit-strike-team"
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
              "unitId": "unit-breacher-team"
            },
            {
              "unitId": "unit-strike-team"
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-cadre-fireblade-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-cadre-fireblade-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-cadre-fireblade-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits"
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
              "unitId": "unit-crisis-fireknife-battlesuits"
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits"
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits"
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
            "id": "unit-commander-in-coldstar-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-commander-in-coldstar-battlesuit-wargear-ability-guardian-drone-6"
            ]
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
              "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-standard"
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
              "unit-commander-in-coldstar-battlesuit-selection-cyclic-ion-blaster-overcharge"
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-generator-2",
            "title": "Shield Generator",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-weapon-support-system-3",
            "title": "Weapon Support System",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-coldstar-battlesuit-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits"
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
              "unitId": "unit-crisis-fireknife-battlesuits"
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits"
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits"
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
            "id": "unit-commander-in-enforcer-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-commander-in-enforcer-battlesuit-wargear-ability-guardian-drone-6"
            ]
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
              "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-standard"
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
              "unit-commander-in-enforcer-battlesuit-selection-cyclic-ion-blaster-overcharge"
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-generator-2",
            "title": "Shield Generator",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-weapon-support-system-3",
            "title": "Weapon Support System",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-commander-in-enforcer-battlesuit-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-breacher-team"
          },
          {
            "unitId": "unit-strike-team"
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
              "unitId": "unit-breacher-team"
            },
            {
              "unitId": "unit-strike-team"
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-ethereal-wargear-ability-guardian-drone-4"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-ethereal-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-ethereal-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-ethereal-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-kroot-carnivores"
          },
          {
            "unitId": "unit-kroot-farstalkers"
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
              "unitId": "unit-kroot-carnivores"
            },
            {
              "unitId": "unit-kroot-farstalkers"
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
            "unitId": "unit-kroot-carnivores"
          },
          {
            "unitId": "unit-kroot-farstalkers"
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
              "unitId": "unit-kroot-carnivores"
            },
            {
              "unitId": "unit-kroot-farstalkers"
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
            "unitId": "unit-kroot-carnivores"
          },
          {
            "unitId": "unit-kroot-farstalkers"
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
              "unitId": "unit-kroot-carnivores"
            },
            {
              "unitId": "unit-kroot-farstalkers"
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
            "unitId": "unit-crisis-fireknife-battlesuits"
          },
          {
            "unitId": "unit-crisis-starscythe-battlesuits"
          },
          {
            "unitId": "unit-crisis-sunforge-battlesuits"
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
              "unitId": "unit-crisis-fireknife-battlesuits"
            },
            {
              "unitId": "unit-crisis-starscythe-battlesuits"
            },
            {
              "unitId": "unit-crisis-sunforge-battlesuits"
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
              "unit-commander-farsight-selection-dawn-blade-strike"
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
              "unit-commander-farsight-selection-dawn-blade-sweep"
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
            "unitId": "unit-pathfinder-team"
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
              "unitId": "unit-pathfinder-team"
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
            "id": "unit-the-twin-lance-selection-mv15-gun-drone",
            "title": "MV15 Gun Drone",
            "aliases": [
              "MV15 Gun Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-the-twin-lance-wargear-ability-mv15-gun-drone"
            ]
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
              "unit-the-twin-lance-selection-ion-scattercannon-overcharge"
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
              "unit-the-twin-lance-selection-ion-scattercannon-standard"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-the-twin-lance-wargear-ability-mv15-gun-drone",
            "title": "MV15 Gun Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-kroot-flesh-shaper"
          },
          {
            "unitId": "unit-kroot-trail-shaper"
          },
          {
            "unitId": "unit-kroot-war-shaper"
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
              "unitId": "unit-kroot-flesh-shaper"
            },
            {
              "unitId": "unit-kroot-trail-shaper"
            },
            {
              "unitId": "unit-kroot-war-shaper"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "unitId": "unit-kroot-flesh-shaper"
          },
          {
            "unitId": "unit-kroot-trail-shaper"
          },
          {
            "unitId": "unit-kroot-war-shaper"
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
              "unitId": "unit-kroot-flesh-shaper"
            },
            {
              "unitId": "unit-kroot-trail-shaper"
            },
            {
              "unitId": "unit-kroot-war-shaper"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "unitId": "unit-darkstrider"
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
              "unitId": "unit-darkstrider"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "id": "unit-pathfinder-team-selection-grav-inhibitor-drone",
            "title": "Grav-inhibitor Drone",
            "aliases": [
              "Grav-inhibitor Drone"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-pathfinder-team-wargear-ability-guardian-drone-6"
            ]
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
              "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-emp"
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
              "unit-pathfinder-team-selection-semi-automatic-grenade-launcher-fusion"
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
              "unit-pathfinder-team-selection-ion-rifle-standard"
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
              "unit-pathfinder-team-selection-ion-rifle-overcharge"
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-pulse-accelerator-drone-2",
            "title": "Pulse Accelerator Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-recon-drone-3",
            "title": "Recon Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-marker-drone-4",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-shield-drone-5",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-pathfinder-team-wargear-ability-guardian-drone-6",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-stealth-battlesuits-wargear-ability-guardian-drone-4"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-stealth-battlesuits-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-vespid-stingwings-wargear-ability-oversight-drone"
            ]
          }
        ],
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
            "requiredSelectionIds": []
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-broadside-battlesuits-wargear-ability-guardian-drone-4"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-marker-drone-2",
            "title": "Marker Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-shield-drone-3",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-broadside-battlesuits-wargear-ability-guardian-drone-4",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-commander-farsight"
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit"
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
              "unitId": "unit-commander-farsight"
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit"
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-crisis-fireknife-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-fireknife-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-commander-farsight"
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit"
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
              "unitId": "unit-commander-farsight"
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit"
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-crisis-starscythe-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-starscythe-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "unitId": "unit-commander-farsight"
          },
          {
            "unitId": "unit-commander-in-coldstar-battlesuit"
          },
          {
            "unitId": "unit-commander-in-enforcer-battlesuit"
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
              "unitId": "unit-commander-farsight"
            },
            {
              "unitId": "unit-commander-in-coldstar-battlesuit"
            },
            {
              "unitId": "unit-commander-in-enforcer-battlesuit"
            }
          ],
          "canBeSupportedBy": []
        }
      },
      "gameSelections": {
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-crisis-sunforge-battlesuits-wargear-ability-guardian-drone-3"
            ]
          }
        ],
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
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-wargear-ability-shield-drone-2",
            "title": "Shield Drone",
            "requiredSelectionIds": []
          },
          {
            "id": "unit-crisis-sunforge-battlesuits-wargear-ability-guardian-drone-3",
            "title": "Guardian Drone",
            "requiredSelectionIds": []
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
            "id": "unit-ghostkeel-battlesuit-selection-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "aliases": [
              "Battlesuit Support System"
            ],
            "kind": "wargear",
            "profileIds": [],
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-ghostkeel-battlesuit-wargear-ability-battlesuit-support-system"
            ]
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
              "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-standard"
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
              "unit-ghostkeel-battlesuit-selection-cyclic-ion-raker-overcharge"
            ]
          }
        ],
        "wargearAbilities": [
          {
            "id": "unit-ghostkeel-battlesuit-wargear-ability-battlesuit-support-system",
            "title": "Battlesuit Support System",
            "requiredSelectionIds": []
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
              "unit-hammerhead-gunship-selection-ion-cannon-standard"
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
              "unit-hammerhead-gunship-selection-ion-cannon-overcharge"
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
              "unit-razorshark-strike-fighter-selection-quad-ion-turret-standard"
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
              "unit-razorshark-strike-fighter-selection-quad-ion-turret-overcharge"
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
              "unit-riptide-battlesuit-selection-ion-accelerator-standard"
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
              "unit-riptide-battlesuit-selection-ion-accelerator-supercharge"
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
              "unit-stormsurge-selection-pulse-blast-cannon-focused"
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
              "unit-stormsurge-selection-pulse-blast-cannon-dispersed"
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
              "unit-sun-shark-bomber-selection-twin-ion-rifle-standard"
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
              "unit-sun-shark-bomber-selection-twin-ion-rifle-overcharged"
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
            "wargearAbilityIds": [],
            "candidateWargearAbilityIds": [
              "unit-tidewall-shieldline-wargear-ability-tidewall-defence-platform"
            ]
          }
        ],
        "weaponProfiles": [],
        "wargearAbilities": [
          {
            "id": "unit-tidewall-shieldline-wargear-ability-tidewall-defence-platform",
            "title": "Tidewall Defence Platform",
            "requiredSelectionIds": []
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
      "keywordGrants": []
    },
    {
      "id": "auxiliary-cadre",
      "title": "Auxiliary Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "experimental-prototype-cadre",
      "title": "Experimental Prototype Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "kauyon",
      "title": "Kauyon",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "kroot-hunting-pack",
      "title": "Kroot Hunting Pack",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "montka",
      "title": "Mont'ka",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "retaliation-cadre",
      "title": "Retaliation Cadre",
      "sourceBookId": "tau-empire",
      "chapterRestriction": null,
      "keywordGrants": []
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
    },
    {
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
      },
      "id": "negation emitters upgrade",
      "legacyKey": "negation emitters upgrade",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "unmasking suite upgrade",
      "legacyKey": "unmasking suite upgrade",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "student of kauyon",
      "legacyKey": "student of kauyon",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "admired leader",
      "legacyKey": "admired leader",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "thermoneutronic projector",
      "legacyKey": "thermoneutronic projector",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "plasma accelerator rifle",
      "legacyKey": "plasma accelerator rifle",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "supernova launcher",
      "legacyKey": "supernova launcher",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "exemplar of the kauyon",
      "legacyKey": "exemplar of the kauyon",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "precision of the patient hunter",
      "legacyKey": "precision of the patient hunter",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "solid image projection unit",
      "legacyKey": "solid image projection unit",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "through unity devastation",
      "legacyKey": "through unity devastation",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "borthrod gland",
      "legacyKey": "borthrod gland",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "kroothawk flock",
      "legacyKey": "kroothawk flock",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "nomadic hunter",
      "legacyKey": "nomadic hunter",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "root carved weapons",
      "legacyKey": "root carved weapons",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "coordinated exploitation",
      "legacyKey": "coordinated exploitation",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "exemplar of the mont ka",
      "legacyKey": "exemplar of the mont ka",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "strategic conqueror",
      "legacyKey": "strategic conqueror",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "strike swiftly",
      "legacyKey": "strike swiftly",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "internal grenade racks",
      "legacyKey": "internal grenade racks",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "prototype weapon system",
      "legacyKey": "prototype weapon system",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "puretide engram neurochip",
      "legacyKey": "puretide engram neurochip",
      "sourceBookId": "tau-empire"
    },
    {
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
      },
      "id": "starflare ignition system",
      "legacyKey": "starflare ignition system",
      "sourceBookId": "tau-empire"
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
