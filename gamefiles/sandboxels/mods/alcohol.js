// Warning: This mod will remove all of your previously unlocked elements.

// loop through the elements object
if (elements.explosion) {
    elements.explosion.category = "tools";
  }
  for (var element in elements) {
    if (elements[element].category !== "tools") {
      // give the element the hidden attribute true
      elements[element].hidden = true;
      // set its category to "alchemy mod"
      elements[element].category = "alchemy mod";
    }
  }
  
  // set the unhide setting to Unlock as Discovered (2)
  settings.unhide = 2;
  
  // unhide oxygen (air), dirt (earth), fire, and water
  if (!settings.unlocked.alchemymod) {
    settings.unlocked = {
      "oxygen": true,
      "dirt": true,
      "fire": true,
      "water": true,
      "alchemymod": true,
    };
  }
  elements.alcohol.name = "ethanol";
  elements.alcohol.viscosity = 1.144;
  elements.water.viscosity = 1;
  
  elements.methanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
      "virus": {
        "elem2": null
      },
      "plague": {
        "elem2": null
      },
      "head": {
        "elem2": "rotten_meat",
        "chance": 0.8
      },
      "body": {
        "elem2": "rotten_meat",
        "chance": 0.8
      },
    },
    viscosity: 0.56,
  
    burn: 100,
    burnTime: 2,
    fireColor: "#b2c5d1",
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
  }
  
  elements.propanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
      "virus": {
        "elem2": null
      },
      "plague": {
        "elem2": null
      },
    },
    viscosity: 2.23,
  
    burn: 100,
    burnTime: 3,
    fireColor: "#ced8de",
    category: "liquids",
    state: "liquid",
    density: 803,
    stain: -0.25,
  }
  
  elements.isopropanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
      "virus": {
        "elem2": null
      },
      "plague": {
        "elem2": null
      },
    },
    viscosity: 2.38,
  
    burn: 100,
    burnTime: 3,
    fireColor: "#d1c958",
    category: "liquids",
    state: "liquid",
    density: 786,
    stain: -0.25,
  }
  
  elements.butanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
      "virus": {
        "elem2": null
      },
      "plague": {
        "elem2": null
      },
    },
    viscosity: 3.0011,
  
    burn: 100,
    burnTime: 3,
    category: "liquids",
    state: "liquid",
    density: 810,
    stain: -0.25,
  }
  
  elements.alcohol.reactions.water = {
    elem1: "vodka",
    elem2: "vodka",
  }
  
  elements.vodka = {
    color: "#9FAEC5",
    behavior: behaviors.LIQUID,
    reactions: {
      "virus": {
        "elem2": null
      },
      "plague": {
        "elem2": null
      },
    },
  
    tick: function(pixel) {
  
    },
  
    category: "liquids",
    state: "liquid",
    density: 916,
    stain: -0.25,
  }