elements.mayo = {
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 100000,
    state: "liquid",
    density: 720,
  };
  
  elements.water.color = "#ff0000";
  elements.water.behavior = behaviors.WALL;
  
  delete elements.ketchup;
  
  behaviors.SELFDELETE = [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX",
  ];
  
  behaviors.mud.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y + 1)) {
      console.log("Moved!");
    } else {
      console.log("Couldn't move!")
    }
  };
  
  elements.sand_exploder = {
    color: "#ff0000",
    tool: function(pixel) {
      if (pixel.element == "sand") {
        pixel.element = "explosion"
      }
    },
    category: "tools",
  };
  
  if (!elements.water.reactions) {
    elements.water.reactions = {}
  }
  elements.water.reactions.mayo = {
    "elem1": null,
    "elem2": "mayo_water"
  }
  elements.water.reactions.soap = {
    "elem1": null,
    "elem2": "soapy_water"
  }
  
  runAfterLoad(function() {
  
    console.log("Hello World!");
  });
  
  if (enabledMods.includes("test.js")) {
    runAfterLoad(function() {
  
      console.log("Hello World!");
    });
  }
  
  eLists.CONDIMENT = ["ketchup", "melted_cheese", "mayo"];
  
  eLists.CONDIMENT.push("honey");