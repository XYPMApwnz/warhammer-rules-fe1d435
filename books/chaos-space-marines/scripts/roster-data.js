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
            "unitId": "unit-cultist-firebrand"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-dark-commune"
          },
          {
            "unitId": "unit-fabius-bile"
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
              "unitId": "unit-cultist-firebrand"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-dark-commune"
            },
            {
              "unitId": "unit-fabius-bile"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-lord"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-fabius-bile"
          },
          {
            "unitId": "unit-huron-blackheart"
          },
          {
            "unitId": "unit-master-of-possession"
          },
          {
            "unitId": "unit-red-corsairs-reave-captain"
          },
          {
            "unitId": "unit-sorcerer"
          },
          {
            "unitId": "unit-warpsmith"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions"
          },
          {
            "unitId": "unit-masters-of-the-maelstrom"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-fabius-bile"
            },
            {
              "unitId": "unit-huron-blackheart"
            },
            {
              "unitId": "unit-master-of-possession"
            },
            {
              "unitId": "unit-red-corsairs-reave-captain"
            },
            {
              "unitId": "unit-sorcerer"
            },
            {
              "unitId": "unit-warpsmith"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions"
            },
            {
              "unitId": "unit-masters-of-the-maelstrom"
            }
          ]
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-terminator-squad"
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
              "unitId": "unit-chaos-terminator-squad"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-raptors"
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
              "unitId": "unit-raptors"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-accursed-cultists"
          },
          {
            "unitId": "unit-cultist-mob"
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
              "unitId": "unit-accursed-cultists"
            },
            {
              "unitId": "unit-cultist-mob"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-accursed-cultists"
          },
          {
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-cultist-mob"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-accursed-cultists"
            },
            {
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-cultist-mob"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-accursed-cultists"
          },
          {
            "unitId": "unit-cultist-mob"
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
              "unitId": "unit-accursed-cultists"
            },
            {
              "unitId": "unit-cultist-mob"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-possessed"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-possessed"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-terminator-squad"
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
              "unitId": "unit-chaos-terminator-squad"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-traitor-guardsmen-squad"
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
              "unitId": "unit-traitor-guardsmen-squad"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-havocs"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-nemesis-claw"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-havocs"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-nemesis-claw"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
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
            "unitId": "unit-chaos-terminator-squad"
          },
          {
            "unitId": "unit-chosen"
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
              "unitId": "unit-chaos-terminator-squad"
            },
            {
              "unitId": "unit-chosen"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-accursed-cultists"
          },
          {
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-cultist-mob"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-accursed-cultists"
            },
            {
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-cultist-mob"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-raptors"
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
              "unitId": "unit-raptors"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-terminator-squad"
          },
          {
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-masters-of-the-maelstrom"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
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
              "unitId": "unit-chaos-terminator-squad"
            },
            {
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-masters-of-the-maelstrom"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-terminator-squad"
          },
          {
            "unitId": "unit-mutilators"
          },
          {
            "unitId": "unit-obliterators"
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
              "unitId": "unit-chaos-terminator-squad"
            },
            {
              "unitId": "unit-mutilators"
            },
            {
              "unitId": "unit-obliterators"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chosen"
          },
          {
            "unitId": "unit-legionaries"
          },
          {
            "unitId": "unit-red-corsairs-raiders"
          }
        ],
        "canBeLedBy": [
          {
            "unitId": "unit-huron-blackheart"
          }
        ],
        "canBeSupportedBy": []
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [
            {
              "unitId": "unit-chosen"
            },
            {
              "unitId": "unit-legionaries"
            },
            {
              "unitId": "unit-red-corsairs-raiders"
            }
          ],
          "canBeLedBy": [
            {
              "unitId": "unit-huron-blackheart"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-cultist-firebrand"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-dark-commune"
          },
          {
            "unitId": "unit-fabius-bile"
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
              "unitId": "unit-cultist-firebrand"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-dark-commune"
            },
            {
              "unitId": "unit-fabius-bile"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-abaddon-the-despoiler"
          },
          {
            "unitId": "unit-chaos-lord-in-terminator-armour"
          },
          {
            "unitId": "unit-huron-blackheart"
          },
          {
            "unitId": "unit-kravek-morne"
          },
          {
            "unitId": "unit-sorcerer-in-terminator-armour"
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
              "unitId": "unit-abaddon-the-despoiler"
            },
            {
              "unitId": "unit-chaos-lord-in-terminator-armour"
            },
            {
              "unitId": "unit-huron-blackheart"
            },
            {
              "unitId": "unit-kravek-morne"
            },
            {
              "unitId": "unit-sorcerer-in-terminator-armour"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-abaddon-the-despoiler"
          },
          {
            "unitId": "unit-chaos-lord"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-fabius-bile"
          },
          {
            "unitId": "unit-huron-blackheart"
          },
          {
            "unitId": "unit-master-of-possession"
          },
          {
            "unitId": "unit-red-corsairs-reave-captain"
          },
          {
            "unitId": "unit-sorcerer"
          },
          {
            "unitId": "unit-warpsmith"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions"
          },
          {
            "unitId": "unit-masters-of-the-maelstrom"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-abaddon-the-despoiler"
            },
            {
              "unitId": "unit-chaos-lord"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-fabius-bile"
            },
            {
              "unitId": "unit-huron-blackheart"
            },
            {
              "unitId": "unit-master-of-possession"
            },
            {
              "unitId": "unit-red-corsairs-reave-captain"
            },
            {
              "unitId": "unit-sorcerer"
            },
            {
              "unitId": "unit-warpsmith"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions"
            },
            {
              "unitId": "unit-masters-of-the-maelstrom"
            }
          ]
        }
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
            "unitId": "unit-warpsmith"
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
              "unitId": "unit-warpsmith"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-kravek-morne"
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
              "unitId": "unit-kravek-morne"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-lord"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-master-of-possession"
          },
          {
            "unitId": "unit-red-corsairs-reave-captain"
          },
          {
            "unitId": "unit-sorcerer"
          },
          {
            "unitId": "unit-warpsmith"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-master-of-possession"
            },
            {
              "unitId": "unit-red-corsairs-reave-captain"
            },
            {
              "unitId": "unit-sorcerer"
            },
            {
              "unitId": "unit-warpsmith"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions"
            }
          ]
        }
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
            "unitId": "unit-kravek-morne"
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
              "unitId": "unit-kravek-morne"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-master-of-possession"
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
              "unitId": "unit-master-of-possession"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-lord-with-jump-pack"
          },
          {
            "unitId": "unit-haarken-worldclaimer"
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
              "unitId": "unit-chaos-lord-with-jump-pack"
            },
            {
              "unitId": "unit-haarken-worldclaimer"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-chaos-lord"
          },
          {
            "unitId": "unit-dark-apostle"
          },
          {
            "unitId": "unit-fabius-bile"
          },
          {
            "unitId": "unit-huron-blackheart"
          },
          {
            "unitId": "unit-master-of-possession"
          },
          {
            "unitId": "unit-red-corsairs-reave-captain"
          },
          {
            "unitId": "unit-sorcerer"
          },
          {
            "unitId": "unit-warpsmith"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-master-of-executions"
          },
          {
            "unitId": "unit-masters-of-the-maelstrom"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-chaos-lord"
            },
            {
              "unitId": "unit-dark-apostle"
            },
            {
              "unitId": "unit-fabius-bile"
            },
            {
              "unitId": "unit-huron-blackheart"
            },
            {
              "unitId": "unit-master-of-possession"
            },
            {
              "unitId": "unit-red-corsairs-reave-captain"
            },
            {
              "unitId": "unit-sorcerer"
            },
            {
              "unitId": "unit-warpsmith"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-master-of-executions"
            },
            {
              "unitId": "unit-masters-of-the-maelstrom"
            }
          ]
        }
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
            "unitId": "unit-traitor-enforcer"
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
              "unitId": "unit-traitor-enforcer"
            }
          ],
          "canBeSupportedBy": []
        }
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
      }
    }
  ],
  "detachments": [
    {
      "id": "cabal-of-chaos",
      "title": "Cabal of Chaos",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "chaos-cult",
      "title": "Chaos Cult",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "creations-of-bile",
      "title": "Creations of Bile",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "cult-of-the-arkifane",
      "title": "Cult of the Arkifane",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "deceptors",
      "title": "Deceptors",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "devotees-of-destruction",
      "title": "Devotees of Destruction",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "dread-talons",
      "title": "Dread Talons",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "fellhammer-siege-host",
      "title": "Fellhammer Siege-host",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "huron-s-marauders",
      "title": "HURON’S MARAUDERS",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "murdertalon-raiders",
      "title": "Murdertalon Raiders",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "nightmare-hunt",
      "title": "Nightmare Hunt",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "pactbound-zealots",
      "title": "Pactbound Zealots",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "renegade-raiders",
      "title": "Renegade Raiders",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "renegade-warband",
      "title": "Renegade Warband",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "soulforged-warpack",
      "title": "Soulforged Warpack",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "veterans-of-the-long-war",
      "title": "Veterans of the Long War",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "warpstrike-champions",
      "title": "Warpstrike Champions",
      "sourceBookId": "chaos-space-marines",
      "chapterRestriction": null,
      "keywordGrants": []
    }
  ],
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
