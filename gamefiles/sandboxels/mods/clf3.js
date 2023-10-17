var modName = "mods/clf3.js";
var chemMod = "mods/chem.js";

if (enabledMods.includes(chemMod)) {
  function finishBurn(pixel) {
    var info = elements[pixel.element];

    var burnInto = info.burnInto;
    if (burnInto == undefined) {
      burnInto = 'fire';
    } else if (burnInto instanceof Array) {
      burnInto = burnInto[Math.floor(Math.random() * burnInto.length)];
    }
    changePixel(pixel, burnInto, (burnInto !== "smoke"));
    if (info.fireColor != undefined && burnInto == "fire") {
      pixel.color = pixelColorPick(pixel, info.fireColor);
    } else {
      pixel.color = pixelColorPick(pixel)
    }
  };

  function clf3Tick(pixel) {
    for (i = 0; i < adjacentCoords.length; i++) {
      var oX = adjacentCoords[i][0];
      var oY = adjacentCoords[i][1];
      var fX = pixel.x + oX;
      var fY = pixel.y + oY;
      if (!isEmpty(fX, fY, true)) {
        var otherPixel = pixelMap[fX][fY];
        var otherElement = otherPixel.element;
        if (otherElement === "water") {
          explodeAt(otherPixel.x, otherPixel.y, 7, "fire,hydrofluoric_acid,oxygen,acid,chlorine")
        };
        if (!elements.chlorine_trifluoride.ignore.includes(otherElement)) {
          if (!otherPixel.burning) {
            otherPixel.burning = true
          };
          if (!otherPixel.burnStart) {
            otherPixel.burnStart = pixelTicks
          };
          var instaburnChance = 0.05 + (pixelTicks - otherPixel.burnStart) / 1000
          if (Math.random() < instaburnChance) {
            finishBurn(otherPixel);
          };
        };
      };
    };
  };

  var clf3IgnoreList = ["FOOF", "solid_FOOF", "oxygen", "liquid_oxygen", "oxygen_ice", "chlorine", "liquid_chlorine", "liquid_hydrogen_fluoride", "liquid_fluorine", "fluorine", "fluorine_ice", "hydrogen_fluoride", "hydrofluoric_acid", "hydrofluoric_acid_gas", "fire", "acid_gas", "neutral_acid", "acid", "acid_cloud", "nitrogen", "helium", "liquid_helium", "tralphium", "liquid_tralphium", "neon", "liquid_neon", "solid_neon", "neon_ice", "neon_snow", "argon", "liquid_argon", "solid_argon", "argon_ice", "argon_snow", "krypton", "liquid_krypton", "solid_krypton", "krypton_ice", "krypton_snow", "xenon", "liquid_xenon", "solid_xenon", "xenon_ice", "xenon_snow", "radon", "liquid_radon", "solid_radon", "radon_ice", "radon_snow", "ionized_helium", "ionized_tralphium", "wall", "chlorine_trifluoride", "chlorine_trifluoride_ice", "chlorine_trifluoride_gas", "quartz"];

  elements.chlorine_trifluoride = {
    color: "#8aa65b",
    behavior: behaviors.LIQUID,

    ignore: clf3IgnoreList,
    tick: function(pixel) {
      clf3Tick(pixel);
    },
    category: "liquids",
    state: "liquid",
    density: 1770,
    tempLow: -76.34,
    tempHigh: 11.75,
    temp: 5,
  };

  elements.chlorine_trifluoride_gas = {
    tick: function(pixel) {
      clf3Tick(pixel);
    },
    density: 3.78,

  };

  elements.chlorine_trifluoride_ice = {
    tick: function(pixel) {
      clf3Tick(pixel);
    },
  };
} else {
  enabledMods.splice(enabledMods.indexOf(modName), 0, chemMod);
  localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
  alert(`The ${chemMod} mod is required and has been automatically inserted (reload for this to take effect).`);
};