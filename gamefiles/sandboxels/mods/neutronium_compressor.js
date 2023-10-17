function whenAvailable(names, callback) {
	var interval = 10;
	window.setTimeout(function() {
	  let bool = true;
	  for (let i = 0; i < names.length; i++) {
		if (!window[names[i]]) {
		  bool = false;
		}
	  }
	  if (bool) {
		callback();
	  } else {
		whenAvailable(names, callback);
	  }
	}, interval);
  }
  var modName = "mods/neutronium_compressor.js";
  var runAfterAutogenMod = "mods/runAfterAutogen2.js";
  var libraryMod = "mods/code_library.js";
  
  if (enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	whenAvailable(["urlParams", "runAfterAutogen"], function() {
	  var singularityColorTemplate = ["#202020", "#505050", "#b0b0b0", "#c7c7c7"];
  
	  singularityNumber = 10000;
  
	  if (urlParams.get('singularityIncludeRandom') !== null) {
		singularityIncludeRandom = true
	  } else {
		singularityIncludeRandom = false
	  }
  
	  if (urlParams.get('generateSingularities') !== null) {
		generateSingularities = true
	  } else {
		generateSingularities = false
	  }
  
	  function haseulitoidSingularityTick(pixel) {
		var s = 1;
		if (elements[pixel.element].singularityNumber !== undefined) {
		  s = elements[pixel.element].singularityNumber;
		};
		if (pixel.value == undefined) {
		  pixel.value = 0
		};
		valueFunction(pixel, haseuliteValueObject, haseuliteSpreadWhitelist);
		if (pixel.oldColor === undefined) {
		  pixel.oldColor = pixelColorPick(pixel)
		};
		if (pixel.oldColor === null) {
		  pixel.oldColor = pixel.color
		};
		pixel.color = lightenColor(pixel.oldColor, pixel.value / 3);
  
		if (pixel.value >= 350) {
		  var coldBoomChance = Math.max(0.006 * ((pixel.value - 350) / (400 / 3)), 0.000075);
		  if (Math.random() < coldBoomChance) {
			var coldBoomRadius = Math.min(120, Math.floor((7 + s) + ((pixel.value - 350) / Math.max(20, 100 - s - s))));
			explodeAtPlus(pixel.x, pixel.y, coldBoomRadius, "cold_fire", "cold_smoke", null, coldExplosionAfterCooling);
		  };
		};
	  };
  
	  function generateSingularity(singularityElements, isAfterScriptLoading = false) {
		var count = 0;
		if (typeof(singularityElements) === "string") {
  
		  if (singularityElements.includes(",")) {
  
			singularityElements = singularityElements.split(",");
		  } else {
  
			singularityElements = [singularityElements];
		  };
		};
		for (aaf = 0; aaf < singularityElements.length; aaf++) {
		  var elementOfSingularity = singularityElements[aaf];
		  var startColor;
		  var randomExcl = 0;
		  var isNocheer = 0;
  
		  var singularityName;
  
		  if (typeof(elementOfSingularity === "string")) {
			if (elementOfSingularity.includes(",")) {
			  elementOfSingularity = elementOfSingularity.split(",");
			  elementOfSingularity = elementOfSingularity.filter(function(e) {
				return typeof(elements[e]) === "object";
			  });
			};
		  };
		  if (Array.isArray(elementOfSingularity)) {
			singularityName = `${elementOfSingularity.join("_")}_singularity`;
  
			startColor = [];
  
			for (ll = 0; ll < elementOfSingularity.length; ll++) {
			  if (typeof(elements[elementOfSingularity[ll]].excludeRandom !== "undefined")) {
				if (elements[elementOfSingularity[ll]].excludeRandom) {
				  randomExcl = 1;
  
				};
			  };
  
			  startColor = startColor.concat(elements[elementOfSingularity[ll]].color);
			};
  
			for (ll = 0; ll < elementOfSingularity.length; ll++) {
			  if (typeof(elements[elementOfSingularity[ll]].nocheer !== "undefined")) {
				if (elements[elementOfSingularity[ll]].nocheer) {
				  isNocheer = 1;
  
				};
			  };
  
			  startColor = startColor.concat(elements[elementOfSingularity[ll]].color);
			};
		  } else {
			singularityName = `${elementOfSingularity}_singularity`;
			startColor = elements[elementOfSingularity].color;
			if (typeof(elements[elementOfSingularity].excludeRandom !== "undefined")) {
			  if (elements[elementOfSingularity].excludeRandom) {
  
				randomExcl = 1;
			  } else {
  
				randomExcl = 0;
			  };
			};
  
			if (typeof(elements[elementOfSingularity].nocheer !== "undefined")) {
			  if (elements[elementOfSingularity].nocheer) {
  
				isNocheer = 1;
			  } else {
  
				isNocheer = 0;
			  };
			};
		  };
  
		  if (Array.isArray(startColor)) {
			startColor = averageRgbPrefixedColorArray(startColor);
		  } else {
			startColor = rgbHexCatcher(startColor);
		  };
  
		  var newColorObjectArray = [];
		  var newColorArray = [];
  
		  for (i = 0; i < singularityColorTemplate.length; i++) {
			var newSingularityColorlet = singularityColorTemplate[i];
			var newColor = multiplyColors(startColor, newSingularityColorlet);
			var newColorJSON = multiplyColors(startColor, newSingularityColorlet, "json");
			newColorArray.push(newColor);
			newColorObjectArray.push(newColorJSON);
		  };
  
		  var firstInfo, firstTemp;
		  if (Array.isArray(elementOfSingularity)) {
			firstInfo = elements[elementOfSingularity[0]];
			firstTemp = airTemp;
			if (typeof(firstInfo.temp) !== "undefined") {
			  firstTemp = firstInfo.temp;
			};
		  } else {
			firstInfo = elements[elementOfSingularity];
			firstTemp = airTemp;
			if (typeof(firstInfo.temp) !== "undefined") {
			  firstTemp = firstInfo.temp;
			};
		  };
  
		  var finalDensity = 0;
		  if (Array.isArray(elementOfSingularity)) {
			for (i = 0; i < elementOfSingularity.length; i++) {
			  info = elements[elementOfSingularity[i]];
			  finalDensity += (info.density || 1000) * singularityNumber;
			};
			finalDensity /= elementOfSingularity.length;
		  } else {
			info = elements[elementOfSingularity];
			finalDensity = (info.density || 1000) * singularityNumber;
		  };
  
		  elementOfSingularity = tryJoin(elementOfSingularity, ",");
  
		  var returns = [];
  
		  if (!elementExists(singularityName)) {
			elements[singularityName] = {
			  color: newColorArray,
			  colorObject: newColorObjectArray,
			  behavior: behaviors.POWDER_OLD,
			  category: "singularities",
			  temp: firstTemp,
			  hardness: 0.995,
			  singularityNumber: null,
			  originalElementDisplay: elements[elementOfSingularity.replaceAll(",", "_")]?.originalElementKey ?? elementOfSingularity.split(","),
			  originalElementKey: elements[elementOfSingularity.replaceAll(",", "_")]?.originalElementKey ?? elementOfSingularity.split(","),
			  state: "solid",
			  density: finalDensity,
			};
			var newInfo = elements[singularityName];
			elements[singularityName].originalElementDisplay = newInfo.originalElementKey.map(x => elements[x].name ?? x);
			if (elements[singularityName].originalElementDisplay.length == 1) {
			  elements[singularityName].originalElementDisplay = elements[singularityName].originalElementDisplay[0]
			};
			if (singularityElements[0] instanceof Array) {
			  elements[singularityName].singularityNumber = 1;
			} else {
			  if (typeof(elements[singularityElements[0]].singularityNumber) === "undefined") {
				elements[singularityName].singularityNumber = 1
			  } else {
				elements[singularityName].singularityNumber = elements[singularityElements[0]].singularityNumber + 1;
			  };
			};
			var num = newInfo.singularityNumber ?? NaN;
			var descTypeString = (num == 1 ? "singularity" : `${num.toString()}-singularity`);
			var descNumberString = (num < 4 ? (10 ** (num * 4)).toLocaleString("en-US") : `10<sup>${num * 4}</sup>`);
			var descElementString = tryJoin((newInfo.originalElementDisplay ?? "[Original element could not be determined]"), ", ");
			elements[singularityName].desc = `A ${descTypeString} normally made of ${descNumberString} pixels of ${descElementString}.`.replaceAll("NaN", "[Quantity could not be determined]");
			if (singularityName.includes("haseulite") && !singularityName.includes("haseulite_vent")) {
			  elements[singularityName].tick = function(pixel) {
				haseulitoidSingularityTick(pixel)
			  };
			  haseuliteSpreadWhitelist.push(singularityName);
			};
			if (typeof(eLists) === "undefined") {
			  eLists = {};
			};
			if (typeof(eLists.SINGULARITY) === "undefined") {
			  eLists.SINGULARITY = [];
			};
			eLists.SINGULARITY.push(singularityName);
			if (!randomExcl) {
			  if (typeof(singularityChoices) === "undefined") {
				singularityChoices = []
			  };
			  if (!singularityChoices.includes(singularityName)) {
				singularityChoices.push(singularityName);
			  };
			}
			if (isNocheer) {
			  elements[singularityName].nocheer = true;
			}
			if (singularityIncludeRandom) {
			  randomExcl ? elements[singularityName].excludeRandom = true : elements[singularityName].excludeRandom = false;
			} else {
			  elements[singularityName].excludeRandom = true;
			};
			if (isAfterScriptLoading) {
			  elementCount++;
			  if (settings.cheerful && elements[singularityName].nocheer) {
				elements[singularityName].hidden = true;
				hiddenCount++;
			  } else {
				createElementButton(singularityName);
			  };
			  elements[singularityName].id = nextid++;
			  document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>";
			};
		  };
		  count++;
		  returns.push(singularityName);
		};
		return returns;
	  };
  
	  elements.neutronium_compressor = {
		color: "#e7e7ee",
		properties: {
		  range: 4,
		  outputOffset: [0, 5],
		  absorbed: {},
		},
		category: "machines",
		behavior: behaviors.WALL,
		state: "solid",
		density: 54000,
		hardness: 1,
		excludeRandom: true,
		tick: function(pixel) {
		  if (pixel.range == undefined) {
			pixel.range = 4;
		  };
		  if (pixel.outputOffset == undefined) {
			pixel.outputOffset = [0, 5];
		  };
		  if (pixel.absorbed == undefined) {
			pixel.absorbed = {};
		  };
		  for (i = -(pixel.range); i <= (pixel.range); i++) {
			for (j = -(pixel.range); j <= (pixel.range); j++) {
			  if (i == 0 & j == 0) {
				continue
			  };
			  var fX = pixel.x + i;
			  var fY = pixel.y + j;
			  if (!isEmpty(fX, fY, true)) {
				var newPixel = pixelMap[fX][fY];
				var newElement = newPixel.element;
				if (newElement !== "neutronium_compressor") {
  
				  if (typeof(jinsouliteSpreadWhitelist) !== "undefined") {
					if (jinsouliteSpreadWhitelist.includes(newPixel.element)) {
					  if (newPixel.value > 0) {
  
						if (typeof(pixel.absorbed.water) === "undefined") {
						  pixel.absorbed.water = 0
						};
  
						pixel.absorbed.water += newPixel.value;
					  };
					};
				  };
  
				  if (newPixel.element === "alkahest") {
  
					var elementEntries = Object.keys(newPixel).filter(function(key) {
					  return elementExists(key)
					});
					for (i = 0; i < elementEntries.length; i++) {
  
					  var key = elementEntries[i];
  
					  var value = newPixel[key];
  
					  if (typeof(pixel.absorbed[key]) === "undefined") {
						pixel.absorbed[key] = 0;
					  };
  
					  pixel.absorbed[key] += value;
					};
				  };
  
				  if (typeof(pixel.absorbed[newElement]) === "undefined") {
					pixel.absorbed[newElement] = 0;
				  };
				  pixel.absorbed[newElement]++;
				  deletePixel(fX, fY);
				};
			  };
			};
		  };
		  var outputPos = {
			x: pixel.x + pixel.outputOffset[0],
			y: pixel.y + pixel.outputOffset[1]
		  };
		  if (Object.keys(pixel.absorbed).length > 0) {
			for (elementName in pixel.absorbed) {
			  if (pixel.absorbed[elementName] >= singularityNumber) {
				if (isEmpty(outputPos.x, outputPos.y, false)) {
				  if (!elementExists(`${elementName}_singularity`)) {
					generateSingularity(elementName, true);
				  };
				  createPixel(`${elementName}_singularity`, outputPos.x, outputPos.y);
				  pixel.absorbed[elementName] -= singularityNumber;
				} else {
				  break;
				};
			  };
			};
		  };
  
		},
	  };
  
	  runAfterAutogen(function() {
		if (generateSingularities) {
		  singularityArray = Object.keys(elements);
		  generateSingularity(singularityArray, false);
		};
	  });
  
	  if (typeof(singularityChoices) === "undefined") {
		singularityChoices = [];
	  };
  
	  elements.spawn_random_singularity = {
		color: ["#3e5f8a", "#a334ec", "#ea96f9", "#a6ecf6", "#70ebc8", "#d9286b", "#7eed91", "#a18b30"],
		behavior: behaviors.WALL,
		category: "special",
		excludeRandom: true,
		tick: function(pixel) {
		  singularityChoices.length == 0 ? deletePixel(pixel.x, pixel.y) : changePixel(pixel, singularityChoices[Math.floor(Math.random() * singularityChoices.length)]);
		},
	  };
  
	});
  } else {
	if (!enabledMods.includes(runAfterAutogenMod)) {
	  enabledMods.splice(enabledMods.indexOf(modName), 0, runAfterAutogenMod)
	};
	if (!enabledMods.includes(libraryMod)) {
	  enabledMods.splice(enabledMods.indexOf(modName), 0, libraryMod)
	};
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
  };