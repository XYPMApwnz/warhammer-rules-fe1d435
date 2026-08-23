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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal"
          },
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal"
            },
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal"
          },
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal"
            },
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
              "mandatory": true,
              "removeKeywords": [
                "INFANTRY"
              ]
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-hastarii-exterminators"
          },
          {
            "unitId": "unit-hastarii-fusiliers"
          },
          {
            "unitId": "unit-skitarii-rangers"
          },
          {
            "unitId": "unit-skitarii-vanguard"
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
              "unitId": "unit-hastarii-exterminators"
            },
            {
              "unitId": "unit-hastarii-fusiliers"
            },
            {
              "unitId": "unit-skitarii-rangers"
            },
            {
              "unitId": "unit-skitarii-vanguard"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-corpuscarii-electro-priests"
          },
          {
            "unitId": "unit-fulgurite-electro-priests"
          },
          {
            "unitId": "unit-hastarii-exterminators"
          },
          {
            "unitId": "unit-hastarii-fusiliers"
          },
          {
            "unitId": "unit-kataphron-breachers"
          },
          {
            "unitId": "unit-kataphron-destroyers"
          },
          {
            "unitId": "unit-servitor-battleclade"
          },
          {
            "unitId": "unit-skitarii-rangers"
          },
          {
            "unitId": "unit-skitarii-vanguard"
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
              "unitId": "unit-corpuscarii-electro-priests"
            },
            {
              "unitId": "unit-fulgurite-electro-priests"
            },
            {
              "unitId": "unit-hastarii-exterminators"
            },
            {
              "unitId": "unit-hastarii-fusiliers"
            },
            {
              "unitId": "unit-kataphron-breachers"
            },
            {
              "unitId": "unit-kataphron-destroyers"
            },
            {
              "unitId": "unit-servitor-battleclade"
            },
            {
              "unitId": "unit-skitarii-rangers"
            },
            {
              "unitId": "unit-skitarii-vanguard"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-corpuscarii-electro-priests"
          },
          {
            "unitId": "unit-fulgurite-electro-priests"
          },
          {
            "unitId": "unit-hastarii-exterminators"
          },
          {
            "unitId": "unit-hastarii-fusiliers"
          },
          {
            "unitId": "unit-kataphron-breachers"
          },
          {
            "unitId": "unit-kataphron-destroyers"
          },
          {
            "unitId": "unit-servitor-battleclade"
          },
          {
            "unitId": "unit-skitarii-rangers"
          },
          {
            "unitId": "unit-skitarii-vanguard"
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
              "unitId": "unit-corpuscarii-electro-priests"
            },
            {
              "unitId": "unit-fulgurite-electro-priests"
            },
            {
              "unitId": "unit-hastarii-exterminators"
            },
            {
              "unitId": "unit-hastarii-fusiliers"
            },
            {
              "unitId": "unit-kataphron-breachers"
            },
            {
              "unitId": "unit-kataphron-destroyers"
            },
            {
              "unitId": "unit-servitor-battleclade"
            },
            {
              "unitId": "unit-skitarii-rangers"
            },
            {
              "unitId": "unit-skitarii-vanguard"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-corpuscarii-electro-priests"
          },
          {
            "unitId": "unit-fulgurite-electro-priests"
          },
          {
            "unitId": "unit-hastarii-exterminators"
          },
          {
            "unitId": "unit-hastarii-fusiliers"
          },
          {
            "unitId": "unit-kataphron-breachers"
          },
          {
            "unitId": "unit-kataphron-destroyers"
          },
          {
            "unitId": "unit-servitor-battleclade"
          },
          {
            "unitId": "unit-skitarii-rangers"
          },
          {
            "unitId": "unit-skitarii-vanguard"
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
              "unitId": "unit-corpuscarii-electro-priests"
            },
            {
              "unitId": "unit-fulgurite-electro-priests"
            },
            {
              "unitId": "unit-hastarii-exterminators"
            },
            {
              "unitId": "unit-hastarii-fusiliers"
            },
            {
              "unitId": "unit-kataphron-breachers"
            },
            {
              "unitId": "unit-kataphron-destroyers"
            },
            {
              "unitId": "unit-servitor-battleclade"
            },
            {
              "unitId": "unit-skitarii-rangers"
            },
            {
              "unitId": "unit-skitarii-vanguard"
            }
          ],
          "canSupport": [],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-corpuscarii-electro-priests"
          },
          {
            "unitId": "unit-fulgurite-electro-priests"
          },
          {
            "unitId": "unit-hastarii-exterminators"
          },
          {
            "unitId": "unit-hastarii-fusiliers"
          },
          {
            "unitId": "unit-kataphron-breachers"
          },
          {
            "unitId": "unit-kataphron-destroyers"
          },
          {
            "unitId": "unit-servitor-battleclade"
          },
          {
            "unitId": "unit-skitarii-rangers"
          },
          {
            "unitId": "unit-skitarii-vanguard"
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
              "unitId": "unit-corpuscarii-electro-priests"
            },
            {
              "unitId": "unit-fulgurite-electro-priests"
            },
            {
              "unitId": "unit-hastarii-exterminators"
            },
            {
              "unitId": "unit-hastarii-fusiliers"
            },
            {
              "unitId": "unit-kataphron-breachers"
            },
            {
              "unitId": "unit-kataphron-destroyers"
            },
            {
              "unitId": "unit-servitor-battleclade"
            },
            {
              "unitId": "unit-skitarii-rangers"
            },
            {
              "unitId": "unit-skitarii-vanguard"
            }
          ],
          "canBeLedBy": [],
          "canBeSupportedBy": []
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal"
          },
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal"
            },
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-skitarii-marshal"
          },
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-skitarii-marshal"
            },
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
            "unitId": "unit-tech-priest-dominus"
          },
          {
            "unitId": "unit-tech-priest-enginseer"
          },
          {
            "unitId": "unit-tech-priest-manipulus"
          }
        ],
        "canBeSupportedBy": [
          {
            "unitId": "unit-technoarcheologist"
          }
        ]
      },
      "ruleFacts": {
        "relations": {
          "canLead": [],
          "canSupport": [],
          "canBeLedBy": [
            {
              "unitId": "unit-tech-priest-dominus"
            },
            {
              "unitId": "unit-tech-priest-enginseer"
            },
            {
              "unitId": "unit-tech-priest-manipulus"
            }
          ],
          "canBeSupportedBy": [
            {
              "unitId": "unit-technoarcheologist"
            }
          ]
        }
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
              "removeKeywords": [
                "INFANTRY"
              ]
            }
          ]
        }
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
      }
    }
  ],
  "detachments": [
    {
      "id": "detachment-cohort-acquisitus",
      "title": "Cohort Acquisitus",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-lords-of-the-forge",
      "title": "Lords of the Forge",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-luminen-auto-choir",
      "title": "Luminen Auto-choir",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-cohort-cybernetica",
      "title": "Cohort Cybernetica",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-data-psalm-conclave",
      "title": "Data-psalm Conclave",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-eradication-cohort",
      "title": "Eradication Cohort",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-explorator-maniple",
      "title": "Explorator Maniple",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-haloscreed-battle-clade",
      "title": "Haloscreed Battle Clade",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-rad-zone-corps",
      "title": "Rad-zone Corps",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
    },
    {
      "id": "detachment-skitarii-hunter-cohort",
      "title": "Skitarii Hunter Cohort",
      "sourceBookId": "adeptus-mechanicus",
      "chapterRestriction": null,
      "keywordGrants": []
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
