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
