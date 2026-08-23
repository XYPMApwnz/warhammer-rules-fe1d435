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
