var modName = "mods/bananas.js";
var onTryMoveIntoMod = "mods/onTryMoveInto.js";
var libraryMod = "mods/code_library.js";

if (enabledMods.includes(onTryMoveIntoMod) && enabledMods.includes(libraryMod)) {
  randomNumberFromOneToThree = function() {
    return 1 + Math.floor(Math.random() * 3)
  };

  debugSpeedGrowth = false;
  logLeaves = false;
  bananaAttachWhitelist = ["banana_pseudostem", "banana_peduncle_1", "banana_peduncle_2", "petal", "banana_leaf", "banana_plant_top", "banana"];

  bananaDirtElements = ["dirt", "mud", "sand", "wet_sand", "clay_soil", "mycelium", "grass"];

  function logPixelCoords(pixel) {
    return `(${pixel.x}, ${pixel.y})`
  };

  function hasPixel(x, y, elementInput) {
    if (isEmpty(x, y, true)) {
      return false;
    } else {
      if (elementInput.includes(",")) {
        elementInput = elementInput.split(",");
      };
      if (Array.isArray(elementInput)) {
        return elementInput.includes(pixelMap[x][y].element);
      } else {
        return pixelMap[x][y].element === elementInput;
      };
    };
  };

  elements.banana_seed = {
    color: "#3b3b2e",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (isEmpty(pixel.x, pixel.y + 1)) {
        movePixel(pixel, pixel.x, pixel.y + 1);
      } else {
        if (Math.random() < (debugSpeedGrowth ? 0.09 : 0.03) && pixel.age > (debugSpeedGrowth ? 20 : 50) && pixel.temp < 100) {
          if (!outOfBounds(pixel.x, pixel.y + 1)) {
            var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
            if (bananaDirtElements.includes(dirtPixel.element)) {
              changePixel(dirtPixel, "root");
            };
          };
          if (isEmpty(pixel.x, pixel.y - 1)) {
            movePixel(pixel, pixel.x, pixel.y - 1);
            createPixel("banana_pseudostem", pixel.x, pixel.y + 1);
            pixelMap[pixel.x][pixel.y + 1].bananaRange = pixel.bananaRange;
          };
        } else if (pixel.age > (debugSpeedGrowth ? 500 : 1000)) {
          changePixel(pixel, "banana_plant_top");
        };
        pixel.age++;
      };
      if (Math.random() < 0.01 && pixel.age > 200) {
        changePixel(pixel, "banana_plant_top");
      };
      doDefaults(pixel);
    },
    properties: {
      "age": 0,

      "bananaRange": null,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
  };

  elements.banana_pseudostem = {
    hidden: true,
    color: "#d5e39f",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (pixel.age > 60 && pixel.temp < 100 && !pixel.grewPeduncle) {
        var peduncleOffsets = [-1, 1];
        for (i = 0; i < peduncleOffsets.length; i++) {
          if (isEmpty(pixel.x + peduncleOffsets[i], pixel.y, false)) {
            if (Math.random() < 0.005) {
              createPixel("banana_peduncle_1", pixel.x + peduncleOffsets[i], pixel.y);
              pixelMap[pixel.x + peduncleOffsets[i]][pixel.y].dir = Math.sign(peduncleOffsets[i]);
              pixelMap[pixel.x + peduncleOffsets[i]][pixel.y].bananaRange = pixel.bananaRange;
              if (Math.random() < 0.8) {
                pixel.grewPeduncle = true;
              }
            };
          };
        };
      };
      pixel.age++;
      doDefaults(pixel);
    },
    properties: {
      "age": 0,
      "grewPeduncle": false,
      "bananaRange": null,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    category: "life",
    state: "solid",
    density: 1500,
  };

  elements.banana = {
    color: "#ede84c",
    tick: function(pixel) {
      if (pixel.attached) {
        var attachCoords = [pixel.x + Math.sign(pixel.attachDirection), pixel.y];
        if (isEmpty(attachCoords[0], attachCoords[1], false)) {
          pixel.attached = false;
        };
      } else {
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
          if (Math.random() < 0.9) {
            if (Math.random() < 0.5) {
              if (!tryMove(pixel, pixel.x + 1, pixel.y + 1)) {
                tryMove(pixel, pixel.x - 1, pixel.y + 1);
              };
            } else {
              if (!tryMove(pixel, pixel.x - 1, pixel.y + 1)) {
                tryMove(pixel, pixel.x + 1, pixel.y + 1);
              };
            };
          };
        };
      };
      doDefaults(pixel);
      var shouldSpoil = true;
      if (pixel.attached) {
        if (!isEmpty(attachCoords[0], attachCoords[1], true)) {
          var attachPixel = pixelMap[attachCoords[0]][attachCoords[1]];
          var attachElement = attachPixel.element;
          if (bananaAttachWhitelist.includes(attachElement)) {
            shouldSpoil = false;
          };
        };
      };
      if (shouldSpoil) {
        if (pixel.temp > -14 && pixel.temp <= 4) {
          pixel.spoilage += Math.max(Math.min(scale(pixel.temp, -14, 4, 0, 9), 9), 0)
        } else if (pixel.temp > 4) {
          pixel.spoilage += Math.max(Math.min(scale(pixel.temp, 4, 20, 9, 30), 40), 0)
        };
      };
      if (pixel.spoilage > 14400) {
        if (Math.random() < 0.05) {
          changePixel(pixel, "spoiled_banana");
        };
      };
    },
    properties: {
      "spoilage": 0,
      "attached": false,
      "attachDirection": (!Math.floor(Math.random() * 2)) ? 1 : -1,
    },
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    tempHigh: 200,
    stateHigh: ["steam", "ash"],
    onTryMoveInto: function(pixel, otherPixel) {
      var otherInfo = elements[otherPixel.element]
      if (typeof(otherInfo.state) === "string" && otherInfo.state !== "gas") {
        pixel.attached = false;
      };
    },
  };

  elements.banana_peduncle_1 = {
    hidden: true,
    name: "banana peduncle (offshoot)",
    color: "#acb55b",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (pixel.age > 20 && pixel.temp < 100) {
        var peduncleCoords1 = [pixel.x + pixel.dir, pixel.y];
        var peduncleCoords2 = [pixel.x + pixel.dir, pixel.y + 1];
        if (isEmpty(peduncleCoords1[0], peduncleCoords1[1], false) && isEmpty(peduncleCoords2[0], peduncleCoords2[1], false)) {
          if (Math.random() < 0.5) {
            createPixel(pixel.element, peduncleCoords1[0], peduncleCoords1[1]);
            pixelMap[peduncleCoords1[0]][peduncleCoords1[1]].dir = pixel.dir;
            pixelMap[peduncleCoords1[0]][peduncleCoords1[1]].bananaRange = pixel.bananaRange;
          } else {
            createPixel("banana_peduncle_2", peduncleCoords2[0], peduncleCoords2[1]);
            pixelMap[peduncleCoords2[0]][peduncleCoords2[1]].bananaRange = pixel.bananaRange;
          };
        };
      };
      pixel.age++;
      doDefaults(pixel);
    },
    properties: {
      "dir": (!Math.floor(Math.random() * 2)) ? 1 : -1,
      "age": 0,

      "bananaRange": null,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    category: "life",
    state: "solid",
    density: 1500,
  };

  elements.banana_peduncle_2 = {
    hidden: true,
    name: "banana peduncle (hanging)",
    color: "#9bad51",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (pixel.age > 20 && pixel.temp < 100) {
        var growthCoords = [pixel.x, pixel.y + 1];
        if (isEmpty(...growthCoords)) {
          if (Math.random() < 0.9) {
            createPixel(pixel.element, ...growthCoords);
            pixelMap[growthCoords[0]][growthCoords[1]].bananaRange = pixel.bananaRange;
          } else {
            createPixel("petal", ...growthCoords);
          };
        };
      };

      if (pixel.age > 40 && pixel.temp < 100) {
        var bananaOffsets = [-1, 1];
        for (i = 0; i < bananaOffsets.length; i++) {

          for (j = 1; j < pixel.bananaRange + 1; j++) {

            if (isEmpty(pixel.x + (j * bananaOffsets[i]), pixel.y, false)) {

              if (Math.random() < (debugSpeedGrowth ? 0.05 : 0.005)) {

                createPixel("banana", pixel.x + (j * bananaOffsets[i]), pixel.y);
                pixelMap[pixel.x + (j * bananaOffsets[i])][pixel.y].attached = true;
                pixelMap[pixel.x + (j * bananaOffsets[i])][pixel.y].attachDirection = -1 * Math.sign(bananaOffsets[i]);
              } else {

              };

              break;
            } else {

              continue;
            };

          };

        };

      };
      pixel.age++;
      doDefaults(pixel);

    },
    properties: {
      "age": 0,

      "bananaRange": null,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    category: "life",
    state: "solid",
    density: 1500,
  };

  elements.spoiled_banana = {
    hidden: true,
    color: "#594b29",
    behavior: [
      "XX|CR:stench,fly%0.1|XX",
      "M2%0.5|CH:dirty_water,fly,fly%0.007|M2%0.5",
      "M2|M1|M2"
    ],
    stain: 0.01,
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    tempHigh: 200,
    stateHigh: ["steam", "ash"],
  };

  elements.fly.reactions.spoiled_banana = {
    "elem2": null,
    chance: 0.15,
    func: behaviors.FEEDPIXEL
  };

  elements.banana_leaf = {
    hidden: true,
    color: "#9df24e",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (pixel.attached) {
        var attachCoords = [pixel.x + pixel.attachOffsets[0], pixel.y + pixel.attachOffsets[1]];
        if (isEmpty(attachCoords[0], attachCoords[1], false)) {
          pixel.attached = false;
        };
      } else {
        if (Math.random() < 0.2) {
          if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (Math.random() < 0.4) {
              if (Math.random() < 0.5) {
                if (!tryMove(pixel, pixel.x + 1, pixel.y + 1)) {
                  tryMove(pixel, pixel.x - 1, pixel.y + 1);
                };
              } else {
                if (!tryMove(pixel, pixel.x - 1, pixel.y + 1)) {
                  tryMove(pixel, pixel.x + 1, pixel.y + 1);
                };
              };
            };
          };
        };
      };
      doDefaults(pixel);
    },
    properties: {
      "attached": false,
      "attachOffsets": [(!Math.floor(Math.random() * 2)) ? 1 : -1, 0],
      "bananaRange": null,
    },
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    tempHigh: 200,
    stateHigh: ["steam", "ash"],
    onTryMoveInto: function(pixel, otherPixel) {
      var otherElement = otherPixel.element;

      var otherInfo = elements[otherElement];

      var otherState = "solid";
      if (typeof(otherInfo.state) === "string") {
        otherState = otherInfo.state;
      };

      var otherDensity = 1000;
      if (typeof(otherInfo.density) === "number") {
        otherDensity = otherInfo.density;
      };

      var react = false;
      if (typeof(otherInfo.reactions) === "object") {
        if (typeof(otherInfo.reactions[pixel.element]) === "object") {
          react = true;
        };
      };

      if (otherElement.endsWith("head") || otherElement.endsWith("body")) {

        if (otherElement !== "antibody") {

          return false;
        };
      };

      if (otherElement !== pixel.element) {
        if (logLeaves) {
          console.log("Other element is not banana leaves")
        };
        if (react) {
          if (logLeaves) {
            console.log("Reacting pixels")
          };
          reactPixels(otherPixel, pixel);
        } else {
          if (logLeaves) {
            console.log("Moving pixels")
          };
          if ((otherState !== "solid") || (otherState === "solid" && otherDensity > 100)) {
            var pX = pixel.x;
            var pY = pixel.y;
            var oX = otherPixel.x;
            var oY = otherPixel.y;
            if (logLeaves) {
              console.log(`${otherElement} pixel (${oX},${oY}) trying to move info leaf block (${pX},${pY})`)
            };
            var dX = oX - pX;
            var dY = oY - pY;
            var iDX = -1 * dX;
            var iDY = -1 * dY;
            if (logLeaves) {
              console.log(`Old offset (relative to leaf): [${dX},${dY}], new offset [${iDX},${iDY}]`)
            };
            var fX = pX + iDX;

            var fY = pY + iDY;
            if (logLeaves) {
              console.log(`Calculated final position: (${fX},${fY}), moving other pixel from (${oX},${oY})`)
            };
            tryMove(otherPixel, fX, fY);
          };
        };
      };
    },
  };

  elements.banana_plant_top = {
    hidden: true,
    color: "#d5e39f",
    tick: function(pixel) {
      if (pixel.bananaRange === null) {
        pixel.bananaRange = randomNumberFromOneToThree();
      };

      if (pixel.age > 30 && pixel.temp < 100) {
        if (!pixel.grewLeftLeaves) {
          for (i = (0 - pixel.leafRange); i < 0; i++) {
            if (i == 0) {
              continue;
            };

            var leafOffset = i;
            var leafX = pixel.x + leafOffset;
            var leafAttachOffset = [1, 0];
            var leafY = pixel.y;
            if (Math.abs(leafOffset) == pixel.leafRange) {
              leafY++;
              leafAttachOffset[1] = -1;
            };

            if (outOfBounds(leafX, leafY)) {
              continue;
            };

            if (isEmpty(leafX, leafY, false)) {
              createPixel("banana_leaf", leafX, leafY);
              pixelMap[leafX][leafY].attached = true;
              pixelMap[leafX][leafY].attachOffsets = leafAttachOffset;
              pixelMap[leafX][leafY].bananaRange = pixel.bananaRange;
              pixel.grewLeftLeaves = true;
            } else {
              break;
            };
          };
        };

        if (!pixel.grewRightLeaves) {
          for (i = 1; i < (pixel.leafRange + 1); i++) {
            if (i == 0) {
              continue;
            };

            var leafOffset = i;
            var leafX = pixel.x + leafOffset;
            var leafAttachOffset = [-1, 0];
            var leafY = pixel.y;
            if (Math.abs(leafOffset) == pixel.leafRange) {
              leafY++;
              leafAttachOffset[1] = -1;
            };

            if (outOfBounds(leafX, leafY)) {
              continue;
            };

            if (isEmpty(leafX, leafY, false)) {
              createPixel("banana_leaf", leafX, leafY);
              pixelMap[leafX][leafY].attached = true;
              pixelMap[leafX][leafY].attachOffsets = leafAttachOffset;
              pixelMap[leafX][leafY].bananaRange = pixel.bananaRange;
              pixel.grewRightLeaves = true;
            } else {
              break;
            };
          };
        };
      };
      pixel.age++;
      doDefaults(pixel);
    },
    properties: {
      "age": 0,
      "leafRange": 2 + (Math.floor(Math.random() * 3)),
      "grewLeftLeaves": false,
      "grewRightLeaves": false,
      "bananaRange": null,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 5,
    burnInto: ["steam", "ash"],
    burnTime: 600,
    category: "life",
    state: "solid",
    density: 1500,
  };

} else {
  enabledMods.splice(enabledMods.indexOf(modName), 0, onTryMoveIntoMod);
  enabledMods.splice(enabledMods.indexOf(modName), 0, libraryMod);
  localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
  alert(`The ${onTryMoveIntoMod} mod and ${libraryMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};