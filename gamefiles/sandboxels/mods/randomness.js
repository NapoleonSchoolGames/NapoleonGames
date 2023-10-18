var modName = "mods/randomness.js";
var libraryMod = "mods/code_library.js";

if (enabledMods.includes(libraryMod)) {

  elements.warp = {
      name: "warp",
      color: "#111111",
      behavior: [
        "M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
        "M1%30 AND SW%30|DL%1|M1%30 AND SW%30",
        "M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
      ],
      category: "special",
      state: "gases",
    },

    elements.unnamed_gas = {
      color: "#ddee11",
      behavior: [
        "M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1",
        "M1%10 AND SW%2 AND HT:1%1|HT:1%1.000000000000000000|M1%10 AND SW%2 AND HT:1%1",
        "M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1",
      ],
      behaviorOn: [
        "M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2",
        "M1%20 AND SW%4 AND HT:2%2|HT:2%2 AND CH:plasma%0.01|M1%20 AND SW%4 AND HT:2%2",
        "M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2",
      ],
      category: "gases",
      burn: 3000,
      burnTime: 5,
      burnInto: "burning_unnamed_gas",
      state: "gas",
      density: 2,
      tempHigh: 95,
      stateHigh: "burning_unnamed_gas",
      conduct: 0.2,
    },

    elements.burning_unnamed_gas = {
      color: "#eedd11",
      behavior: [
        "M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
        "M1 AND HT:3750%70 AND CR:plasma%10|HT:3750%70.000000 AND CH:plasma%6.71 AND EX:9>plasma,plasma,burning_unnamed_gas%0.25|M1 AND HT:3750%70 AND CR:plasma%10",
        "M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
      ],
      behaviorOn: [
        "M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
        "M1 AND HT:7500%70 AND CR:plasma%15|HT:7500%70 AND CH:plasma%5.60 AND EX:11>plasma,plasma,burning_unnamed_gas%0.5|M2 AND HT:7500%70 AND CR:plasma%15",
        "M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
      ],
      category: "gases",
      burn: 2000,
      burnTime: 950,
      burnInto: "plasma",
      state: "gas",
      density: 1.5,
      tempHigh: 200001,
      stateHigh: "plasma",
      hidden: true,
      excludeRandom: true,
    },

    elements.unnamed_powder = {
      color: "#cddd22",
      behavior: [
        "HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3",
        "HT:2%2 AND CR:unnamed_gas%1|HT:2%2.00000000000000000000|HT:2%2 AND CR:unnamed_gas%1",
        "M2 AND HT:2%2.0000000000000|M1 AND HT:2%2.0000000000000|M2 AND HT:2%2.0000000000000",
      ],
      behaviorOn: [
        "HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6",
        "HT:4%4 AND CR:unnamed_gas%2|HT:4%4.00000000000000000000|HT:4%4 AND CR:unnamed_gas%2",
        "M2 AND HT:4%4.0000000000000|M1 AND HT:4%4.0000000000000|M2 AND HT:4%4.0000000000000",
      ],
      category: "powders",
      burn: 3000,
      burnTime: 5,
      burnInto: "burning_unnamed_gas",
      state: "powders",
      density: 20,
      tempHigh: 95,
      stateHigh: "burning_unnamed_gas",
      conduct: 0.4,
    },

    elements.burning_unnamed_powder = {
      color: "#ddcd22",
      behavior: [
        "HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CR:burning_unnamed_gas%7.0000000000000000000000000000000000000000000000000000000000000000000000000000|HT:89850%70 AND CR:burning_unnamed_gas%7",
        "HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CH:plasma%00000000005.60 AND EX:12>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_powder%0.5|HT:89850%70 AND CR:burning_unnamed_gas%7",
        "M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7|M1 AND HT:89850%70 AND CR:burning_unnamed_gas%7.00000000000000000000000000000000000000000000000000000000000000|M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7",
      ],
      behaviorOn: [
        "HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CR:burning_unnamed_gas%9.00000000000000000000000000000000000000000000000000000000000000000000000000|HT:179700%70 AND CR:burning_unnamed_gas%9",
        "HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CH:plasma%00000000004.79 AND EX:13>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_gas,burning_unnamed_powder%1|HT:179700%70 AND CR:burning_unnamed_gas%9",
        "M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9|M1 AND HT:179700%70 AND CR:burning_unnamed_gas%9.000000000000000000000000000000000000000000000000000000000000|M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9",
      ],
      category: "powders",
      burn: 2000,
      burnTime: 1150,
      burnInto: "plasma",
      state: "powders",
      density: 15,
      tempHigh: 200001,
      stateHigh: "burning_unnamed_gas",
      conduct: 0.4,
      hidden: true,
      excludeRandom: true,
    },

    elements.steam_remover = {
      name: "steam remover",
      color: "#542900",
      behavior: [
        "CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
        "CH:steam>steam_remover|DL%40|CH:steam>steam_remover",
        "CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
      ],
      category: "special",
      excludeRandom: true,
    },

    elements.filler_remover = {
      name: "filler remover",
      color: "#00dd00",
      behavior: [
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|DL%40|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
      ],
      "category": "special",
      excludeRandom: true,
    },

    elements.plasma_remover = {
      name: "plasma remover",
      color: "#77ff00",
      behavior: [
        "CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
        "CH:plasma>plasma_remover|DL%40|CH:plasma>plasma_remover",
        "CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
      ],
      category: "special",
      temp: 7065,
      excludeRandom: true,
    },

    elements.black_decay = {
      name: "black decay",
      color: "#222222",
      behavior: [
        "XX|CH:black_decay%2 AND DL:black_decay%30|XX",
        "CH:black_decay%1|DL%0.2|CH:black_decay%1",
        "XX|CH:black_decay%1 AND M1|XX",
      ],
      category: "special",
      excludeRandom: true,
    },

    elements.steel.behavior = behaviors.FAIRYKILL;

  elements.tungstensteel = {
      color: "#555589",
      behavior: behaviors.FAIRYKILL,
      tempHigh: 3600,
      category: "solids",
      density: 19000,
      conduct: 0.48,
    },

    elements.molten_tungsten = {
      density: 17600,
      temp: 3500,
      tempHigh: 5555,
      stateHigh: "tungsten_gas",
    },

    elements.pop_rock_pop = {
      color: ["#ffb49f", "#ffd9a1", "#ffada1"],
      behavior: [
        "XX|XX|XX",
        "XX|EX:3>carbon_dioxide,sugar|XX",
        "XX|XX|XX",
      ],
      category: "energy",
      state: "gas",
      density: 100,
      excludeRandom: true,
      hidden: true,
    },

    elements.pop_rocks = {
      color: ["#d4d4d4", "#74d4d4", "#d474d4", "#7474d4", "#d4d474", "#74d474", "#d47474", "#747474", "#2f2f2f", "#8f2f2f", "#2f8f2f", "#8f8f2f", "#2f2f8f", "#8f2f8f", "#2f8f8f", "#8f8f8f", "#606060", "#c06060", "#60c060", "#c0c060", "#6060c0", "#c060c0", "#60c0c0", "#c0c0c0"],
      behavior: behaviors.POWDER,
      reactions: {
        water: {
          elem1: "sugar_water",
          elem2: [null, "pop_rock_pop"]
        },
      },
      tempHigh: 138,
      stateHigh: ["caramel", "pop_rock_pop"],
      category: "land",
      state: "solid",
      density: 333.333333333,
      hardness: 0.2,
      breakInto: ["sugar", "pop_rock_pop"],
    },

    elements.tungsten_gas = {
      color: "#FFEEE2",
      behavior: [
        "CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
        "M1|XX|M1",
        "CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
      ],
      density: 15800,
      temp: 5600,
      tempLow: 5555,
      stateLow: "molten_tungsten",
      category: "gases",
      hidden: true,
    },

    elements.molten_steel = {
      reactions: {
        "molten_tungsten": {
          "elem1": "molten_tungstensteel",
          "elem2": "molten_tungstensteel"
        }
      }
    }

  elements.molten_tungstensteel = {
    behavior: [
      "XX|DL:" + eLists.FAIRY + " AND CR:fire%2.5|XX",
      "DL:" + eLists.FAIRY + " AND M2|XX|DL:" + eLists.FAIRY + " AND M2",
      "M1|DL:" + eLists.FAIRY + "|M1",
    ]
  }

  elements.unnamed_substance_bomb = {
      name: "unnamed bomb",
      color: "#cdad52",
      behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>plasma,burning_unnamed_powder,unnamed_powder,unnamed_powder,unnamed_powder,burning_unnamed_gas,unnamed_gas,unnamed_gas,unnamed_gas|M2",
      ],
      category: "weapons",
      state: "solid",
      density: 1300,
      excludeRandom: true,
    },

    elements.warp_bomb = {
      name: "warp bomb",
      color: "#422e4a",
      behavior: [
        "XX|XX|XX",
        "XX|CC:#5b3a69,#382740,#400e61|XX",
        "M2|M1 AND EX:15>warp|M2",
      ],
      category: "weapons",
      state: "solid",
      density: 1300,
      excludeRandom: true,
    },

    elements.estradiol = {
      color: "#f2fcee",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1200,
      tempHigh: 173,
      category: "powders",
    },

    elements.molten_estradiol = {
      tempHigh: 446,
      stateHigh: "vaporized_estradiol",
    },

    elements.vaporized_estradiol = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 972,
      temp: 500,
      tempLow: 446,
      stateLow: "molten_estradiol",
    },

    elements.progesterone = {
      color: "#f7eefc",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1100,
      tempHigh: 121,
      category: "powders",
    },

    elements.molten_progesterone = {
      tempHigh: 447,
      stateHigh: "vaporized_progesterone",
    },

    elements.vaporized_progesterone = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 891,
      tempLow: 447,
      stateLow: "molten_progesterone",
    }

  elements.testosterone = {
      color: "#f7eef7",
      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1100,
      tempHigh: 155,
      category: "powders",
    },

    elements.molten_testosterone = {
      tempHigh: 433,
      temp: 400,
      stateHigh: "vaporized_testosterone",
    },

    elements.vaporized_testosterone = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 891,
      temp: 500,
      tempLow: 433,
      stateLow: "molten_testosterone",
    },

    elements.testosterone_undecanoate = {
      color: "#f8f2fc",
      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1037,
      tempHigh: 63,
      category: "powders",
    },

    elements.molten_testosterone_undecanoate = {
      tempHigh: 550,
      stateHigh: "vaporized_testosterone_undecanoate",
      hidden: true,
    },

    elements.vaporized_testosterone_undecanoate = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 834,
      temp: 600,
      tempLow: 63,
      stateLow: "molten_testosterone_undecanoate",
    },

    elements.cyproterone_acetate = {
      color: "#efeef8",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1068,
      tempHigh: 200,
      category: "powders",
    },

    elements.molten_cyproterone_acetate = {
      tempHigh: 569,
      stateHigh: "vaporized_cyproterone_acetate",
    },

    elements.vaporized_cyproterone_acetate = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 865,
      tempLow: 569,
      stateLow: "molten_cyproterone_acetate",
    },

    elements.spironolactone = {
      color: "#f7eef1",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1200,
      tempHigh: 207,
      category: "powders",
    },

    elements.molten_spironolactone = {
      tempHigh: 597,
      stateHigh: "vaporized_spironolactone",

    },

    elements.vaporized_spironolactone = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 972,
      tempLow: 597,
      stateLow: "molten_spironolactone",
    },

    elements.finasteride = {
      color: "#fcfcf1",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1100,
      tempHigh: 253,
      category: "powders",
    },

    elements.molten_finasteride = {
      tempHigh: 577,
      stateHigh: "vaporized_finasteride",
    },

    elements.vaporized_finasteride = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 891,
      tempLow: 577,
      stateLow: "molten_finasteride",
    },

    elements.dutasteride = {
      color: "#fbf6ee",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1303,
      tempHigh: 243,
      category: "powders",
    },

    elements.molten_dutasteride = {
      tempHigh: 620,
      stateHigh: "vaporized_dutasteride",
    },

    elements.vaporized_dutasteride = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 1055,
      tempLow: 620,
      stateLow: "molten_dutasteride",
    },

    elements.bicalutamide = {
      color: "#f4fcee",

      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1520,
      tempHigh: 192,
      category: "powders",
    },

    elements.molten_bicalutamide = {
      tempHigh: 659,
      stateHigh: "vaporized_bicalutamide",
    },

    elements.vaporized_bicalutamide = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 1231,
      tempLow: 659,
      stateLow: "molten_bicalutamide",
    },

    elements.leuprolide = {
      color: "#f5eefb",
      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1440,
      tempHigh: 150,
      category: "powders",
    },

    elements.molten_leuprolide = {
      tempHigh: 1720,
      stateHigh: "vaporized_leuprolide",
    },

    elements.vaporized_leuprolide = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      density: 1166,
      tempLow: 1720,
      stateLow: "molten_leuprolide",
    },

    elements.histrelin = {
      color: "#f8f5ee",
      behavior: behaviors.POWDER,
      state: "solid",
      category: "solids",
      density: 1500,
      tempHigh: 1800,
      stateHigh: "vaporized_histrelin",
      category: "powders",
    },

    elements.vaporized_histrelin = {
      color: ["#ffbf60", "#ffdc60", "#ff9d60"],
      behavior: behaviors.GAS,
      state: "gas",
      category: "gases",
      hidden: true,
      tempLow: 1800,
      stateLow: "histrelin",
    },

    elements.densinium = {
      color: ["#565656", "#575657", "#565257", "#554d57", "#554659"],
      tempHigh: 4712,
      hardness: 0.9991,
      density: 39180,
      conduct: 0.86,
      behavior: behaviors.WALL,
      state: "solid",
      category: "solids",
    }

  elements.molten_densinium = {
    hardness: 0.9991,
  }

  elements.acid.ignore.push("densinium", "molten_densinium")

  if (!enabledMods.includes("mods/minecraft.js")) {
    elements.netherrack = {
      color: ["#802b2b", "#4f1b1b", "#943232"],
      behavior: behaviors.POWDER,
      tempHigh: 7550,
      category: "land",
      state: "solid",
      density: 2550,
      hardness: 0.07,
      breakInto: ["crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "sulfur"],
      burn: 9,
      burnTime: 9007199254740995,
      burnInto: "netherrack",
    }
    minecraftModEnabled = false
  } else if (enabledMods.includes("mods/minecraft.js")) {
    minecraftModEnabled = true
  }

  if (!enabledMods.includes("mods/minecraft.js")) {
    elements.crushed_netherrack = {
      color: ["#e34b46", "#b04235", "#73431f", "#522510", "#7a3326"],
      behavior: behaviors.POWDER,
      category: "land",
      tempHigh: 7550,
      stateHigh: "molten_netherrack",
      state: "solid",
      density: 1680,
      burn: 20,
      burnTime: 9007199254740995,
      hardness: 0.02,
      hidden: true,
    }
    minecraftModEnabled = false
  } else if (enabledMods.includes("mods/minecraft.js")) {
    minecraftModEnabled = true
  }

  elements.silk_velvet = {
    color: ["#edece8", "#ede7e4"],
    maxColorOffset: 7,
    category: "land",
    state: "solid",
    behavior: [
      "XX|XX|XX",
      "XX|XX|XX",
      "XX|M1|XX",
    ],
    burnInto: "ash",
    burn: 72,
    burnTime: 25,
    density: 182,
  };

  elements.red_velvet = {
    color: ["#a80508", "#b30b0e"],
    maxColorOffset: 7,
    category: "land",
    state: "solid",
    behavior: [
      "XX|XX|XX",
      "XX|XX|XX",
      "XX|M1|XX",
    ],
    tick: function() {
      pixel.element = "silk_velvet";
    },
    burnInto: "ash",
    burn: 72,
    burnTime: 25,
    density: 182,
  };

  runAfterLoad(function() {
    if (enabledMods.includes("mods/fey_and_more.js")) {
      elements.tungstensteel.behavior = [
          "XX|DL:" + eLists.FAIRY + "|XX",
          "DL:" + eLists.FAIRY + "|XX|DL:" + eLists.FAIRY + "",
          "XX|DL:" + eLists.FAIRY + "|XX",
        ],
        elements.molten_tungstensteel.behavior = [
          "XX|DL:" + eLists.FAIRY + " AND CR:fire%2.5|XX",
          "DL:" + eLists.FAIRY + " AND M2|XX|DL:" + eLists.FAIRY + " AND M2",
          "M1|DL:" + eLists.FAIRY + "|M1",
        ]
    }
    if (minecraftModEnabled) {
      elements.netherrack.hardness = 0.07
      elements.netherrack.breakInto = ["crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "crushed_netherrack", "sulfur"]
      elements.netherrack.burn = 9
      elements.netherrack.burnTime = 9007199254740995
      elements.netherrack.burnInto = "netherrack"
      elements.crushed_netherrack = {
        color: ["#e34b46", "#b04235", "#73431f", "#522510", "#7a3326"],
        behavior: behaviors.POWDER,
        category: "land",
        tempHigh: 2750,
        stateHigh: "molten_netherrack",
        state: "solid",
        density: 1680,
        burn: 20,
        burnTime: 9007199254740995,
        hardness: 0.02,
        hidden: true,
      }
    }
  });
} else {
  if (!enabledMods.includes(libraryMod)) {
    enabledMods.splice(enabledMods.indexOf(modName), 0, libraryMod)
  };
  alert(`The "${libraryMod}" mod is required and has been automatically inserted (reload for this to take effect).`)
  localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};