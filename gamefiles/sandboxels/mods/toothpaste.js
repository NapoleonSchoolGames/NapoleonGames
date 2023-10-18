elements.tooth = {
    color: "#d9d9d9",
    behavior: behaviors.SUPPORT,
    reactions: {
      "sugar": {
        "elem1": "decayed_tooth",
        "elem2": null,
        "chance": 0.003
      },
      "plaque": {
        "elem1": "decayed_tooth",
        "elem2": null,
        "chance": 0.002
      },
      "acid": {
        "elem1": "decayed_tooth",
        "elem2": null
      },
    },
    category: "life",
    tempHigh: 1000,
    stateHigh: ["steam", "salt", "meat", "hydroxyapatite"],
    state: "solid",
    density: 2000,
    hardness: 0.5,
    breakInto: ["meat", "hydroxyapatite"],
  },

  elements.plaque = {
    color: "#faf6dc",
    behavior: [
      "XX|ST AND CR:plague%0.01 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|XX",
      "ST AND CR:plague%0.01 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|CH:tartar%0.001|ST AND CR:plague%0.01 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01",
      "M2|M1 AND ST AND CR:plague%0.01 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|M2",
    ],
    reactions: {
      "acid": {
        "elem1": null,
        "elem2": null,
        "chance": 0.01
      },
    },
    category: "life",
    tempHigh: 100,
    stateHigh: ["steam", "plague"],
    state: "solid",
    density: 5.4,

    hidden: true,
  },

  elements.tartar = {
    color: ["#e8d595", "#cfb27e", "#f0e989"],
    behavior: [
      "XX|ST AND CR:plague%0.02 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|XX",
      "ST AND CR:plague%0.02 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|CH:tartar%0.01|ST AND CR:plague%0.02 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01",
      "XX|M1 AND ST AND CR:plague%0.02 AND CR:acid%0.01 AND CR:infection%0.003 AND CH:tooth>decayed_tooth%0.01|XX",
    ],
    reactions: {
      "acid": {
        "elem1": null,
        "elem2": null,
        "chance": 0.01
      },
    },
    category: "other",
    tempHigh: elements.calcium.tempHigh,
    stateHigh: ["steam", "plague", "calcium"],
    state: "solid",
    density: 1900,
    hardness: elements.tooth.hardness - 0.05,
    breakInto: ["calcium", "calcium", "calcium", "calcium", "rotten_meat", "rotten_meat", "plague"],
    hidden: true,
  },

  elements.decayed_tooth = {
    color: ["#aba89d", "#85837b", "#7a7972", "#b8b5a5", "#6b6a63"],
    behavior: [
      "XX|XX|XX",
      "SP%99.5|DL%0.04|SP%99.5",
      "XX|M1|XX",
    ],
    reactions: {
      "acid": {
        "elem1": null,
        "elem2": null,
        "chance": 0.7
      },
    },
    tempHigh: 1000,
    stateHigh: ["steam", "salt", "meat", "hydroxyapatite"],
    state: "solid",
    category: "other",
    density: 1900,
    hardness: 0.3,
    breakInto: ["rotten_meat", "hydroxyapatite"],
    hidden: true,
  },

  elements.hydroxyapatite = {
    color: ["#edecda", "#f5f5f5", "#e8e8e8"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 3180,
    tempHigh: 1670,

    category: "powders",
  },

  elements.toothpaste = {
    color: ["#f8f8f8", "#6699ff", "#f8f8f8", "#ff5555"],
    behavior: [
      "XX|SW:plaque%5|XX",
      "SW:plaque%5|XX|SW:plaque%5",
      "M2|SW:plaque%5|M2",
    ],
    reactions: {
      "plaque": {
        "elem1": ["foam", "toothpaste", "toothpaste"],
        "elem2": "foam",
        "chance": 0.7
      },
      "decayed_tooth": {
        "elem1": "tooth",
        "elem2": "foam",
        "chance": 0.5
      },
    },
    state: "solid",
    category: "other",
    density: 1330,
    tempHigh: 250,
    stateHigh: ["toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "toothpaste", "foam", "foam", "fire", "smoke", "ash"],
    burn: 5,
    burnInto: ["fire", "smoke", "smoke", "ash", "ash", "toothpaste"],
    viscosity: 20000,

    category: "powders",
  }

runAfterLoad(function() {
  foodArray = Object.keys(elements).filter(function(e) {
    return elements[e].category == "food";
  });
  if (!elements.tooth.reactions) {
    elements.tooth.reactions = {}
  };
  for (i = 0; i < foodArray.length; i++) {
    elements.tooth.reactions[foodArray[i]] = {
      "elem1": ["tooth", "tooth", "tooth", "tooth", "tooth", "tooth", "tooth", "tooth", "decayed_tooth"],
      "elem2": "plaque",
      "chance": 0.001
    }
  };
  elements.acid.ignore.push("tooth");
  elements.acid.ignore.push("decayed_tooth");
  elements.acid.ignore.push("plaque");
  elements.acid.ignore.push("tartar");

  if (enabledMods.includes("mods/fey_and_more.js")) {

    eLists.IMPURITY.push("plaque");
    eLists.IMPURITY.push("tartar");
    eLists.IMPURITY.push("decayed_tooth");

    elements.pure_water.behavior = [
      "DL:" + eLists.IMPURITY + "|DL:" + eLists.IMPURITY + "|DL:" + eLists.IMPURITY + "",
      "DL:" + eLists.IMPURITY + " AND M2|XX|DL:" + eLists.IMPURITY + " AND M2",
      "DL:" + eLists.IMPURITY + " AND M1|DL:" + eLists.IMPURITY + " AND M1|DL:" + eLists.IMPURITY + " AND M1",
    ];
    elements.pure_steam.behavior = [
      "M2 AND DL:" + eLists.IMPURITY + "|M1 AND DL:" + eLists.IMPURITY + "|M2 AND DL:" + eLists.IMPURITY + "",
      "M1 AND DL:" + eLists.IMPURITY + "|XX|M1 AND DL:" + eLists.IMPURITY + "",
      "M2 AND DL:" + eLists.IMPURITY + "|M1 AND DL:" + eLists.IMPURITY + "|M2 AND DL:" + eLists.IMPURITY + "",
    ];

    elements.concoction.reactions.tooth = {
      "elem1": "mistake",
      "elem2": null
    };
    elements.concoction.reactions.decayed_tooth = {
      "elem1": "mistake",
      "elem2": null
    };
    elements.concoction.reactions.toothpaste = {
      "elem1": "mistake",
      "elem2": null
    };
    elements.concoction.reactions.plaque = {
      "elem1": "mistake",
      "elem2": null
    };
    elements.concoction.reactions.tartar = {
      "elem1": "mistake",
      "elem2": null
    };

  };
});