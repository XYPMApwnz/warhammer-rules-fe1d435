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
            "unitId": "unit-winged-tyranid-prime"
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
              "unitId": "unit-winged-tyranid-prime"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyranid-prime-with-lash-whip"
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
              "unitId": "unit-tyranid-prime-with-lash-whip"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyranid-prime-with-lash-whip"
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
              "unitId": "unit-tyranid-prime-with-lash-whip"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-genestealers"
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
              "unitId": "unit-genestealers"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyrant-guard"
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
              "unitId": "unit-tyrant-guard"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-raveners"
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
              "unitId": "unit-raveners"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-neurogaunts"
          },
          {
            "unitId": "unit-tyrant-guard"
          },
          {
            "unitId": "unit-zoanthropes"
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
              "unitId": "unit-neurogaunts"
            },
            {
              "unitId": "unit-tyrant-guard"
            },
            {
              "unitId": "unit-zoanthropes"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-hormagaunts"
          },
          {
            "unitId": "unit-termagants"
          },
          {
            "unitId": "unit-tyranid-warriors-with-melee-bio-weapons"
          },
          {
            "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
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
              "unitId": "unit-hormagaunts"
            },
            {
              "unitId": "unit-termagants"
            },
            {
              "unitId": "unit-tyranid-warriors-with-melee-bio-weapons"
            },
            {
              "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-gargoyles"
          },
          {
            "unitId": "unit-tyranid-warriors-with-melee-bio-weapons"
          },
          {
            "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
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
              "unitId": "unit-gargoyles"
            },
            {
              "unitId": "unit-tyranid-warriors-with-melee-bio-weapons"
            },
            {
              "unitId": "unit-tyranid-warriors-with-ranged-bio-weapons"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-carnifexes"
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
              "unitId": "unit-carnifexes"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyrant-guard"
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
              "unitId": "unit-tyrant-guard"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-broodlord"
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
              "unitId": "unit-broodlord"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-neurotyrant"
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
              "unitId": "unit-neurotyrant"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-hyperadapted-raveners"
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
              "unitId": "unit-hyperadapted-raveners"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "unitId": "unit-winged-tyranid-prime"
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
              "unitId": "unit-tyranid-prime-with-lash-whip"
            },
            {
              "unitId": "unit-winged-tyranid-prime"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tyranid-prime-with-lash-whip"
          },
          {
            "unitId": "unit-winged-tyranid-prime"
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
              "unitId": "unit-tyranid-prime-with-lash-whip"
            },
            {
              "unitId": "unit-winged-tyranid-prime"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-hive-tyrant"
          },
          {
            "unitId": "unit-neurotyrant"
          },
          {
            "unitId": "unit-the-swarmlord"
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
              "unitId": "unit-hive-tyrant"
            },
            {
              "unitId": "unit-neurotyrant"
            },
            {
              "unitId": "unit-the-swarmlord"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-neurotyrant"
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
              "unitId": "unit-neurotyrant"
            }
          ],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-old-one-eye"
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
              "unitId": "unit-old-one-eye"
            }
          ],
          "canBeSupportedBy": []
        }
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
      }
    }
  ],
  "detachments": [
    {
      "id": "ambush-predators",
      "title": "Ambush Predators",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "assimilation-swarm",
      "title": "Assimilation Swarm",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "crusher-stampede",
      "title": "Crusher Stampede",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "invasion-fleet",
      "title": "Invasion Fleet",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "subterranean-assault",
      "title": "Subterranean Assault",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "synaptic-nexus",
      "title": "Synaptic Nexus",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "talons-of-the-norn-queen",
      "title": "Talons of the Norn Queen",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "unending-swarm",
      "title": "Unending Swarm",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "vanguard-onslaught",
      "title": "Vanguard Onslaught",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "warrior-bioform-onslaught",
      "title": "Warrior Bioform Onslaught",
      "sourceBookId": "tyranids",
      "chapterRestriction": null,
      "keywordGrants": []
    }
  ],
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
