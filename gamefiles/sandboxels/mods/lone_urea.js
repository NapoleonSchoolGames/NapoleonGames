if (enabledMods.includes("mods/funny_liquid_2.js")) {
	console.log("lone_urea.js is a subset of funny_liquid_2.js, and having the latter makes this mod redundant.")
  };
  
  elements.urea = {
	  color: "#fef7ee",
  
	  behavior: behaviors.POWDER,
	  state: "solid",
	  density: 1320,
	  tempHigh: 133,
	  category: "powders",
	},
  
	elements.molten_urea = {
	  tempHigh: 350,
	  stateHigh: ["ammonia", "vaporized_isocyanic_acid"],
	},
  
	elements.liquid_isocyanic_acid = {
	  color: "#ffe5f0",
  
	  behavior: behaviors.LIQUID,
	  reactions: {
		"water": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"steam": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"ice": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
	  },
	  state: "liquid",
	  density: 1140,
	  tempHigh: 23,
	  stateHigh: "vaporized_isocyanic_acid",
	  tempLow: -86,
	  stateLow: "frozen_isocyanic_acid",
	  category: "liquids",
	},
  
	elements.frozen_isocyanic_acid = {
	  color: "#ffe5f0",
	  behavior: behaviors.WALL,
	  reactions: {
		"water": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"steam": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"ice": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
	  },
	  state: "solid",
	  density: 1267,
	  tempHigh: -86,
	  stateHigh: "liquid_isocyanic_acid",
	  category: "powders",
	},
  
	elements.vaporized_isocyanic_acid = {
	  color: "#ffe5f0",
	  behavior: behaviors.GAS,
	  reactions: {
		"water": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"steam": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
		"ice": {
		  "elem1": "carbon_dioxide",
		  "elem2": "ammonia"
		},
	  },
	  state: "gas",
	  density: 1026,
	  tempLow: 23,
	  stateLow: "liquid_isocyanic_acid",
	  category: "gases",
	}