behaviors.POISONED_LIQUID = [
    "XX|DL:" + eLists.ANIMAL + "|XX",
    "DL:" + eLists.ANIMAL + " AND M2|XX|DL:" + eLists.ANIMAL + " AND M2",
    "M1|DL:" + eLists.ANIMAL + " AND M1|M1",
  ];
  behaviors.POISONED_WALL = [
    "XX|DL:" + eLists.ANIMAL + "|XX",
    "DL:" + eLists.ANIMAL + "|XX|DL:" + eLists.ANIMAL + "",
    "XX|DL:" + eLists.ANIMAL + "|XX",
  ];
  behaviors.POISONED_POWDER = [
    "XX|DL:" + eLists.ANIMAL + "|XX",
    "DL:" + eLists.ANIMAL + "|XX|DL:" + eLists.ANIMAL + "",
    "M2|DL:" + eLists.ANIMAL + " AND M1|M2",
  ];
  behaviors.POISONED_GAS = [
    "M2|DL:" + eLists.ANIMAL + " AND M1|M2",
    "DL:" + eLists.ANIMAL + " AND M1|XX|DL:" + eLists.ANIMAL + " AND M1",
    "M2|DL:" + eLists.ANIMAL + " AND M1|M2",
  ];
  
  elements.ketchup.tempLow = -3;
  elements.ketchup.stateLow = "frozen_ketchup";
  elements.ketchup.tempHigh = 100;
  elements.ketchup.stateHigh = "ketchup_gas";
  elements.ketchup.density = 1092;
  elements.ketchup.reactions = {
    "mayonnaise": {
      "elem1": null,
      "elem2": "fry_sauce"
    },
    "plague": {
      "elem1": "poisoned_ketchup",
      "elem2": null
    },
    "infection": {
      "elem1": "poisoned_ketchup",
      "elem2": null
    },
    "fallout": {
      "elem1": "poisoned_ketchup",
      "chance": 25
    },
    "gloomwind": {
      "elem1": "poisoned_ketchup",
      "elem2": null
    },
  };
  
  elements.dirt.reactions = {
    "ketchup": {
      "elem1": null,
      "elem2": "dirty_ketchup",
      "oneway": true
    },
  };
  elements.ash.reactions.ketchup = {
      "elem1": null,
      "elem2": "dirty_ketchup",
      "oneway": true
    },
    elements.dust.reactions = {
      "ketchup": {
        "elem1": null,
        "elem2": "dirty_ketchup",
        "oneway": true
      },
    };
  
  elements.smoke.reactions.ketchup_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.smoke.reactions.poisoned_ketchup_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.smoke.reactions.ketchup_snow_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.smoke.reactions.poisoned_ketchup_snow_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.smoke.reactions.ketchup_rain_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.smoke.reactions.poisoned_ketchup_rain_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.ketchup_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.poisoned_ketchup_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.ketchup_snow_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.poisoned_ketchup_snow_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.ketchup_rain_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
    elements.ash.reactions.poisoned_ketchup_rain_cloud = {
      "elem1": "pyrocumulus",
      "chance": 0.08,
      "y": [0, 15],
      "setting": "clouds"
    },
  
    elements.radiation.reactions.ketchup = {
      "elem1": null,
      "elem2": "poisoned_ketchup",
      "chance": 25
    }
  
  elements.frozen_ketchup = {
    color: "#d44737",
    behavior: behaviors.WALL,
    temp: -5,
    category: "solids",
    tempHigh: 5,
    stateHigh: "ketchup",
    state: "solid",
    density: 917,
    reactions: {
      "plague": {
        "elem1": "frozen_poisoned_ketchup",
        "elem2": null
      },
      "infection": {
        "elem1": "frozen_poisoned_ketchup",
        "elem2": null
      },
      "radiation": {
        "elem1": "frozen_poisoned_ketchup",
        "chance": 25
      },
      "fallout": {
        "elem1": "frozen_poisoned_ketchup",
        "chance": 25
      },
      "gloomwind": {
        "elem1": "frozen_poisoned_ketchup",
        "elem2": null
      },
    },
  };
  elements.poisoned_ketchup = {
    color: "#de0030",
    behavior: behaviors.POISONED_LIQUID,
    tempLow: -3,
    stateLow: "frozen_poisoned_ketchup",
    tempHigh: 100,
    stateHigh: "poisoned_ketchup_gas",
    viscosity: 50000,
    category: "liquids",
    state: "liquid",
    density: 1140,
    stain: 0.05,
  };
  elements.frozen_poisoned_ketchup = {
    color: "#d43754",
    behavior: behaviors.POISONED_WALL,
    temp: -5,
    category: "solids",
    tempHigh: 5,
    stateHigh: "poisoned_ketchup",
    state: "solid",
    density: 917,
  };
  elements.ketchup_spout = {
    color: "#944137",
    behavior: [
      "XX|CR:poisoned_ketchup%0.001 AND CR:ketchup|XX",
      "CR:poisoned_ketchup%0.001 AND CR:ketchup|XX|CR:poisoned_ketchup%0.001 AND CR:ketchup",
      "XX|CR:poisoned_ketchup%0.001 AND CR:ketchup|XX",
    ],
    category: "special",
  };
  elements.ketchup_cloud = {
    color: "#ad655c",
    behavior: [
      "XX|XX|XX",
      "XX|CO:1%5|M1%2.5 AND BO",
      "XX|XX|XX",
    ],
    category: "gases",
    temp: 110,
    tempLow: 100,
    stateLow: "ketchup_rain_cloud",
    state: "gas",
    density: 0.5,
    reactions: {
      "plague": {
        "elem1": "poisoned_ketchup_cloud",
        "elem2": null
      },
      "infection": {
        "elem1": "poisoned_ketchup_cloud"
      },
      "radiation": {
        "elem1": "poisoned_ketchup_cloud",
        "chance": 25
      },
      "fallout": {
        "elem1": "poisoned_ketchup_cloud",
        "chance": 25
      },
      "gloomwind": {
        "elem1": "poisoned_ketchup_cloud",
        "elem2": null
      },
      "ketchup_rain_cloud": {
        "elem1": "ketchup_rain_cloud",
        "temp1": -20
      },
    },
    conduct: 0.03,
    ignoreAir: true,
  };
  elements.ketchup_rain_cloud = {
    color: "#6e413b",
    behavior: [
      "XX|XX|XX",
      "XX|CH:ketchup%0.05|M1%2.5 AND BO",
      "XX|XX|XX|",
    ],
    category: "gases",
    temp: 70,
    tempHigh: 100,
    stateHigh: "ketchup_cloud",
    tempLow: 0,
    stateLow: "ketchup_snow_cloud",
    state: "gas",
    density: "0.5",
    ignoreAir: true,
    conduct: 0.03,
  };
  elements.poisoned_ketchup_cloud = {
    color: "#a8596b",
    behavior: [
      "XX|XX|XX",
      "XX|CO:1%5|M1%2.5 AND BO",
      "XX|XX|XX",
    ],
    reactions: {
      "poisoned_ketchup_rain_cloud": {
        "elem1": "poisoned_ketchup_rain_cloud",
        "temp1": -20
      },
    },
    category: "gases",
    temp: 110,
    tempLow: 100,
    stateLow: "poisoned_ketchup_rain_cloud",
    state: "gas",
    density: 0.5,
    conduct: 0.03,
    ignoreAir: true,
  };
  elements.poisoned_ketchup_rain_cloud = {
    color: "#633640",
    behavior: [
      "XX|XX|XX",
      "XX|CH:poisoned_ketchup%0.05|M1%2.5 AND BO",
      "XX|XX|XX",
    ],
    category: "gases",
    temp: 70,
    tempHigh: 100,
    stateHigh: "poisoned_ketchup_cloud",
    tempLow: 0,
    stateLow: "poisoned_ketchup_snow_cloud",
    state: "gas",
    density: 0.5,
    ignoreAir: true,
    conduct: 0.03,
  };
  elements.ketchup_snow = {
    color: "#ed7a6d",
    behavior: behaviors.POWDER,
    temp: -5,
    tempHigh: 18,
    stateHigh: "ketchup",
    category: "land",
    state: "solid",
    density: 100,
    reactions: {
      "plague": {
        "elem1": "poisoned_ketchup_snow",
        "elem2": null
      },
      "infection": {
        "elem1": "poisoned_ketchup_snow",
        "elem2": null
      },
      "radiation": {
        "elem1": "poisoned_ketchup_snow",
        chance: 25
      },
      "fallout": {
        "elem1": "poisoned_ketchup_snow",
        chance: 25
      },
      "gloomwind": {
        "elem1": "poisoned_ketchup_snow",
        "elem2": null
      },
    },
  };
  elements.ketchup_snow_cloud = {
    color: "#755652",
    behavior: [
      "XX|XX|XX",
      "XX|CH:ketchup_snow%0.05|M1%2.5 AND BO",
      "XX|XX|XX",
    ],
    category: "gases",
    temp: -10,
    tempHigh: 30,
    stateHigh: "ketchup_cloud",
    state: "gas",
    density: 0.55,
    reactions: {
      "plague": {
        "elem1": "poisoned_ketchup_snow_cloud",
        "elem2": null
      },
      "infection": {
        "elem1": "poisoned_ketchup_snow_cloud"
      },
      "radiation": {
        "elem1": "poisoned_ketchup_snow_cloud",
        chance: 25
      },
      "fallout": {
        "elem1": "poisoned_ketchup_snow_cloud",
        chance: 25
      },
      "gloomwind": {
        "elem1": "poisoned_ketchup_snow_cloud",
        "elem2": null
      },
    },
    ignoreAir: true,
  };
  elements.poisoned_ketchup_snow = {
    color: "#d1697f",
    behavior: behaviors.POISONED_POWDER,
    temp: -5,
    tempHigh: 18,
    stateHigh: "poisoned_ketchup",
    category: "land",
    state: "solid",
    density: 100,
  };
  elements.poisoned_ketchup_snow_cloud = {
    color: "#6e4e55",
    behavior: [
      "XX|XX|XX",
      "XX|CH:poisoned_ketchup_snow%0.05|M1%2.5 AND BO",
      "XX|XX|XX",
    ],
    category: "gases",
    temp: -10,
    tempHigh: 30,
    stateHigh: "poisoned_ketchup_cloud",
    state: "gas",
    density: 0.55,
    ignoreAir: true,
  };
  elements.mayonnaise = {
    color: "#F2EEE9",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    category: "liquids",
    state: "liquid",
    density: 1000,
    stain: 0.05,
    isFood: true,
  };
  elements.mustard = {
    color: "#D8AD01",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    category: "liquids",
    state: "liquid",
    density: 1052,
    stain: 0.05,
    isFood: true,
  };
  elements.ketchup_gas = {
    color: "#ffb5ad",
    behavior: behaviors.GAS,
    temp: 150,
    density: 0.6,
    state: "gas",
    tempLow: 95,
    stateLow: "ketchup",
    category: "gases",
    reactions: {
      "plague": {
        "elem1": "poisoned_ketchup_gas",
        "elem2": null
      },
      "ketchup_gas": {
        "elem1": null,
        "elem2": "ketchup_cloud",
        "chance": 0.3,
        "y": [0, 15],
        "setting": "clouds"
      },
      "ketchup_cloud": {
        "elem1": "ketchup_cloud",
        "chance": 0.4,
        "y": [0, 12],
        "setting": "clouds"
      },
      "ketchup_rain_cloud": {
        "elem1": "ketchup_rain_cloud",
        "chance": 0.4,
        "y": [0, 12],
        "setting": "clouds"
      },
      "infection": {
        "elem1": "poisoned_ketchup_gas"
      },
      "radiation": {
        "elem1": "poisoned_ketchup_gas",
        chance: 25
      },
      "fallout": {
        "elem1": "poisoned_ketchup_gas",
        chance: 25
      },
      "gloomwind": {
        "elem1": "poisoned_ketchup_gas",
        "elem2": null
      },
    },
  };
  elements.poisoned_ketchup_gas = {
    color: "#e096a6",
    behavior: behaviors.POISONED_GAS,
    temp: 150,
    density: 0.6,
    state: "gas",
    tempLow: 95,
    stateLow: "poisoned_ketchup",
    category: "gases",
    reactions: {
      "poisoned_ketchup_gas": {
        "elem1": null,
        "elem2": "poisoned_ketchup_cloud",
        "chance": 0.3,
        "y": [0, 15],
        "setting": "clouds"
      },
      "poisoned_ketchup_cloud": {
        "elem1": "poisoned_ketchup_cloud",
        "chance": 0.4,
        "y": [0, 12],
        "setting": "clouds"
      },
      "ketchup_rain_cloud": {
        "elem1": "poisoned_ketchup_rain_cloud",
        "chance": 0.4,
        "y": [0, 12],
        "setting": "clouds"
      },
    },
  };
  elements.fry_sauce = {
    color: "#E8AA7B",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    category: "liquids",
    state: "liquid",
    density: 1149,
    stain: 0.05,
    isFood: true,
  };
  elements.ketchup_powder = {
    color: "#E06320",
    behavior: behaviors.POWDER,
    density: 1879,
    reactions: {
      "plague": {
        "elem1": "poisoned_ketchup_powder",
        "elem2": null
      },
      "infection": {
        "elem1": "poisoned_ketchup_powder",
        "elem2": null
      },
      "radiation": {
        "elem1": "poisoned_ketchup_powder",
        chance: 25
      },
      "fallout": {
        "elem1": "poisoned_ketchup_powder",
        chance: 25
      },
      "gloomwind": {
        "elem1": "poisoned_ketchup_powder",
        "elem2": null
      },
    },
    state: "solid",
    category: "powders",
    isFood: true,
  };
  elements.poisoned_ketchup_powder = {
    color: "#e0204a",
    behavior: behaviors.POISONED_POWDER,
    density: 1879,
    state: "solid",
    category: "powders",
  };
  elements.cumin = {
    color: "#8B7778",
    behavior: behaviors.POWDER,
    category: "food",
    density: 405,
    state: "solid",
    tempHigh: 400,
    stateHigh: "ash",
    burn: 40,
    burnTime: 40,
    burnInto: "ash",
    isFood: true,
  };
  elements.eketchup_spout = {
    name: "E-Ketchup Spout",
    color: "#c75600",
    behavior: behaviors.WALL,
    behaviorOn: [
      "XX|CR:poisoned_ketchup%0.001 AND CR:ketchup|XX",
      "CR:poisoned_ketchup%0.001 AND CR:ketchup|XX|CR:poisoned_ketchup%0.001 AND CR:ketchup",
      "XX|CR:poisoned_ketchup%0.001 AND CR:ketchup|XX",
    ],
    category: "machines",
    conduct: 1,
    insulate: true,
    colorOn: "#fff200",
  };
  elements.ketchup_metal = {
    color: "#ff5c5c",
    behavior: behaviors.WALL,
    category: "solids",
    conduct: 0.47,
    tempHigh: 1500,
    density: 7197,
  };
  elements.antiketchup = {
    color: "#00CEE6",
    behavior: behaviors.AGLIQUID,
    viscosity: 50000,
    category: "special",
    state: "liquid",
    density: 1092,
    stain: 0.05,
  };
  elements.dirty_ketchup = {
    color: "#851a0d",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: ["ketchup_gas", "carbon_dioxide"],
    tempLow: 0,
    stateLow: "frozen_ketchup",
    density: 1140,
    hidden: true,
    stain: 0.05,
  };
  elements.ketchup_gold = {
    color: ["#eb8a8a", "#bf3939", "#ff6161"],
    behavior: behaviors.WALL,
    category: "solids",
    conduct: 0.64,
    tempHigh: 1025,
    density: 10598,
  }
  
  elements.molten_ketchup_metal = {
    reactions: {
      "molten_gold": {
        "elem1": null,
        "elem2": "molten_ketchup_gold"
      },
    }
  }
  
  runAfterLoad(function() {
    if (enabledMods.includes("mods/fey_and_more.js")) {
  
      eLists.FAIRY.push("ketchup_fairy");
      elements.iron.behavior = [
        "XX|DL:" + eLists.FAIRY + "|XX",
        "DL:" + eLists.FAIRY + "|XX|DL:" + eLists.FAIRY + "",
        "XX|DL:" + eLists.FAIRY + "|XX"
      ];
      elements.silver.behavior = [
        "XX|DL:" + eLists.FAIRY + "|XX",
        "DL:" + eLists.FAIRY + "|XX|DL:" + eLists.FAIRY + "",
        "XX|DL:" + eLists.FAIRY + "|XX"
      ];
  
      elements.fairy.reactions = {
        "fire": {
          "elem1": "fire_fairy"
        },
        "magma": {
          "elem1": "fire_fairy"
        },
        "snow": {
          "elem1": "ice_fairy"
        },
        "ice": {
          "elem1": "ice_fairy"
        },
        "petal": {
          "elem1": "nature_fairy"
        },
        "dirt": {
          "elem1": "earth_fairy"
        },
        "mud": {
          "elem1": "earth_fairy"
        },
        "raincloud": {
          "elem1": "rain_fairy"
        },
        "electric": {
          "elem1": "thunder_fairy"
        },
        "little_star": {
          "elem1": "stellar_fairy"
        },
        "moonrock": {
          "elem1": "lunar_fairy"
        },
        "liquid_light": {
          "elem1": "light_fairy"
        },
        "mushroom_cap": {
          "elem1": "mushroom_fairy"
        },
        "magic": {
          "elem1": "magic_fairy"
        },
        "ketchup": {
          "elem1": "ketchup_fairy"
        },
      };
  
      elements.ketchup_fairy = {
        color: ["#d4b0b0", "#e8c5c5", "#e89595"],
        state: "solid",
        behavior: [
          "XX|M1|M1",
          "XX|FX%5|XX",
          "XX|CR:ketchup%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
        ],
        category: "fey",
      };
    };
  });