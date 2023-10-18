function runAfterAutogen(func) {
	runAfterAutogenList.push(func);
  };
  
  function runAfterButtons(func) {
	runAfterButtonsList.push(func);
  };
  
  runAfterAutogenList = [];
  
  runAfterButtonsList = [];
  
  function behaviorStringsToArrays() {
	for (var behavior in behaviors) {
	  if (typeof behaviors[behavior][0] === "string") {
		var newbehavior = [];
		for (var i = 0; i < behaviors[behavior].length; i++) {
		  newbehavior.push(behaviors[behavior][i].split("|"));
		}
		behaviors[behavior] = newbehavior;
	  }
	}
  }
  
  function tripletsToRgbAndGenerateColorObjects() {
	for (var key in elements) {
	  if (elements.hasOwnProperty(key)) {
  
		if (elements[key].color === undefined) {
		  continue;
		}
  
		if (elements[key].color instanceof Array) {
		  var rgbs = [];
		  var rgbos = [];
		  for (var i = 0; i < elements[key].color.length; i++) {
			var c = elements[key].color[i];
			if (c.startsWith("#")) {
			  var rgb = hexToRGB(c);
			  rgbs.push("rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
			  rgbos.push(rgb);
			} else {
			  rgbs.push(c);
			}
		  }
		  elements[key].color = rgbs;
		  elements[key].colorObject = rgbos;
		} else {
  
		  if (elements[key].color.startsWith("#")) {
			var rgb = hexToRGB(elements[key].color);
			elements[key].color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
			elements[key].colorObject = rgb;
		  }
		}
	  }
	}
  }
  
  function autoGen(newname, element, autoType) {
	var autoInfo = autoElements[autoType];
	var newcolor = elements[element].colorObject;
	var colorList = [];
	var colorObjectList = [];
  
	if (!(newcolor instanceof Array)) {
	  newcolor = [newcolor];
	}
  
	for (var i = 0; i < newcolor.length; i++) {
	  var c = newcolor[i];
	  for (var j = 0; j < autoInfo.rgb.length; j++) {
		var newc = autoInfo.rgb[j];
		r = Math.floor(c.r * newc[0]);
		g = Math.floor(c.g * newc[1]);
		b = Math.floor(c.b * newc[2]);
		if (r > 255) {
		  r = 255;
		}
		if (g > 255) {
		  g = 255;
		}
		colorList.push("rgb(" + r + "," + g + "," + b + ")");
		colorObjectList.push({
		  r: r,
		  g: g,
		  b: b
		});
	  }
	}
	var newelem = {
  
	  behavior: autoInfo.behavior,
	  hidden: autoInfo.hidden || false,
	  state: autoInfo.state || "solid",
	  category: autoInfo.category || "states",
	}
	if (colorList.length <= 1) {
	  colorList = colorList[0];
	}
	if (colorObjectList.length <= 1) {
	  colorObjectList = colorObjectList[0];
	}
	newelem.color = colorList;
	newelem.colorObject = colorObjectList;
	var multiplier = 1.1;
	if (autoInfo.type === "high") {
	  if (!elements[element].stateHigh) {
		elements[element].stateHigh = newname;
	  }
	  newelem.temp = elements[element].tempHigh;
	  newelem.tempLow = elements[element].tempHigh + (autoInfo.tempDiff || 0);
	  newelem.stateLow = element;
  
	  if (elements[element].density) {
		newelem.density = Math.round(elements[element].density * 0.9 * 10) / 10;
	  }
	} else if (autoInfo.type === "low") {
	  if (!elements[element].stateLow) {
		elements[element].stateLow = newname;
	  }
	  newelem.temp = elements[element].tempLow;
	  newelem.tempHigh = elements[element].tempLow + (autoInfo.tempDiff || 0);
	  newelem.stateHigh = element;
	  multiplier = 0.5;
  
	  if (elements[element].density) {
		newelem.density = Math.round(elements[element].density * 1.1 * 10) / 10;
	  }
	}
	if (!elements[element].ignore) {
	  elements[element].ignore = []
	}
	elements[element].ignore.push(newname);
	if (elements[element].viscosity || autoInfo.viscosity) {
	  newelem.viscosity = elements[element].viscosity || autoInfo.viscosity;
	}
  
	if (elements[element].conduct) {
	  newelem.conduct = Math.round(elements[element].conduct * multiplier * 10) / 10;
	}
	if (elements[element].burn) {
	  newelem.burn = Math.round(elements[element].burn * multiplier * 10) / 10;
	}
	if (elements[element].burnTime) {
	  newelem.burnTime = Math.round(elements[element].burnTime * multiplier * 10) / 10;
	}
	if (elements[element].burnInto) {
	  newelem.burnInto = elements[element].burnInto;
	}
	if (elements[element].fireColor) {
	  newelem.fireColor = elements[element].fireColor;
	}
  
	if (!elements[newname]) {
	  elements[newname] = newelem;
	} else {
  
	  for (var key in newelem) {
		if (elements[newname][key] == undefined) {
		  elements[newname][key] = newelem[key];
		}
	  }
	}
  
	if (autoType === "molten" && (elements.molten_slag && elements.molten_slag.ignore && elements.molten_slag.ignore.indexOf(element) === -1)) {
	  if (newname !== "molten_slag") {
		if (!elements[newname].reactions) {
		  elements[newname].reactions = {};
		}
		elements[newname].reactions.ash = {
		  "elem1": null,
		  "elem2": "molten_slag"
		};
		elements[newname].reactions.dust = {
		  "elem1": null,
		  "elem2": "molten_slag"
		};
		elements[newname].reactions.magma = {
		  "elem1": null,
		  "elem2": "molten_slag"
		}
	  };
	}
  }
  
  function autoGenAllElements() {
	for (element in elements) {
	  if (elements[element].tempHigh !== undefined && (elements[element].stateHigh === undefined || elements[element].forceAutoGen)) {
		var newname = elements[element].stateHighName;
		if ((elements[element].state === "solid" || !elements[element].state)) {
		  if (!newname) {
			newname = "molten_" + element
		  }
		  autoGen(newname, element, "molten");
		} else if (elements[element].state === "liquid") {
		  if (!newname) {
			newname = element;
			if (newname.startsWith("liquid_")) {
			  newname = newname.substring(7);
			}
			if (newname.startsWith("molten_")) {
			  newname = newname.substring(7);
			}
			newname += "_gas";
		  }
		  autoGen(newname, element, "evaporate");
		}
	  }
	  if (elements[element].tempLow !== undefined && (elements[element].stateLow === undefined || elements[element].forceAutoGen)) {
		var newname = elements[element].stateLowName;
		if (elements[element].state === "liquid") {
		  if (!newname) {
			newname = element;
			if (newname.startsWith("liquid_")) {
			  newname = newname.substring(7);
			}
			if (newname.endsWith("_water")) {
			  newname = newname.substring(0, newname.length - 6);
			}
			newname += "_ice";
		  }
		  autoGen(newname, element, "frozen");
		} else if (elements[element].state === "gas") {
		  if (!newname) {
			newname = element;
			if (newname.endsWith("_gas")) {
			  newname = newname.substring(0, newname.length - 4);
			}
			newname = "liquid_" + newname;
		  }
		  autoGen(newname, element, "condense");
		}
	  }
	  if (elements[element].behavior && typeof elements[element].behavior[0] === "string") {
		var newbehavior = [];
		for (var i = 0; i < elements[element].behavior.length; i++) {
		  newbehavior.push(elements[element].behavior[i].split("|"));
		}
		elements[element].behavior = newbehavior;
	  }
	  if (elements[element].behaviorOn && typeof elements[element].behaviorOn[0] === "string") {
		var newbehavior = [];
		for (var i = 0; i < elements[element].behaviorOn.length; i++) {
		  newbehavior.push(elements[element].behaviorOn[i].split("|"));
		}
		elements[element].behaviorOn = newbehavior;
	  }
	}
  }
  
  function doFinalChecks() {
	nextid = 1;
	for (key in elements) {
	  elements[key].id = nextid;
	  nextid++;
  
	  if (!elements[key].behavior && !elements[key].tick) {
		elements[key].tick = function(pixel) {};
	  }
  
	  if (typeof elements[key].behavior === "function") {
		if (elements[key].tick) {
		  elements[key].tick1 = elements[key].tick;
		  elements[key].tick2 = elements[key].behavior;
		  elements[key].tick = function(pixel) {
			if (pixel.start === pixelTicks) {
			  return
			}
			var id = elements[pixel.element].id;
			elements[pixel.element].tick1(pixel);
			if (!pixel.del && id === elements[pixel.element].id) {
			  elements[pixel.element].tick2(pixel);
			}
		  }
		} else {
		  elements[key].tick = elements[key].behavior;
		}
		delete elements[key].behavior;
	  }
  
	  if (elements[key].color === undefined) {
		elements[key].color = "rgb(255,255,255)";
		elements[key].colorObject = {
		  r: 255,
		  g: 255,
		  b: 255
		};
	  }
  
	  if (elements[key].behavior && typeof elements[key].behavior[0] === "object") {
		var bstring = JSON.stringify(elements[key].behavior);
		if (bstring.indexOf("M1") !== -1 || bstring.indexOf("M2") !== -1) {
		  elements[key].movable = true;
		}
	  }
	  if (elements[key].tick) {
		elements[key].movable = true;
	  }
	  if (elements[key].behavior) {
  
		if (elements[key].behavior[1][1].indexOf("FX") !== -1) {
		  elements[key].flippableX = true;
		}
  
		if (elements[key].behavior[1][1].indexOf("FY") !== -1) {
		  elements[key].flippableY = true;
		}
  
		if (elements[key].behavior.toString().indexOf("BO") !== -1 && !elements[key].rotatable) {
		  for (var i = 0; i < elements[key].behavior.length; i++) {
  
			for (var j = 0; j < elements[key].behavior[i].length; j++) {
  
			  if (elements[key].behavior[i][j].indexOf("BO") !== -1) {
				if ((i == 0 && j == 0) || (i == 0 && j == 2) || (i == 2 && j == 0) && (i == 2 && j == 2)) {
				  elements[key].flippableX = true;
				  elements[key].flippableY = true;
				} else if (i == 0 || i == 2) {
				  elements[key].flippableY = true;
				} else if (j == 0 || j == 2) {
				  elements[key].flippableX = true;
				}
			  }
			}
		  }
		}
  
		if (elements[key].behavior[1][1].indexOf("RT") !== -1) {
		  elements[key].rotatable = true;
		}
  
	  }
  
	  if (elements[key].state === "gas") {
		elements[key].isGas = true;
	  } else if (elements[key].state !== "solid" && elements[key].state !== "liquid") {
		delete elements[key].state;
	  }
  
	  if (elements[key].reactions) {
		for (var reaction in elements[key].reactions) {
  
		  if (elements[key].reactions[reaction].elem1) {
  
			if (Array.isArray(elements[key].reactions[reaction].elem1)) {
			  for (var i = 0; i < elements[key].reactions[reaction].elem1.length; i++) {
				if (elements[key].reactions[reaction].elem1[i] && !elements[elements[key].reactions[reaction].elem1[i]]) {
				  elements[key].reactions[reaction].elem1.splice(i, 1);
				}
			  }
			} else if (elements[key].reactions[reaction].elem1 && !elements[elements[key].reactions[reaction].elem1]) {
			  delete elements[key].reactions[reaction].elem1;
			}
		  }
  
		  if (elements[key].reactions[reaction].elem2) {
  
			if (Array.isArray(elements[key].reactions[reaction].elem2)) {
			  for (var i = 0; i < elements[key].reactions[reaction].elem2.length; i++) {
				if (elements[key].reactions[reaction].elem2[i] && !elements[elements[key].reactions[reaction].elem2[i]]) {
				  elements[key].reactions[reaction].elem2.splice(i, 1);
				}
			  }
			} else if (elements[key].reactions[reaction].elem2 && !elements[elements[key].reactions[reaction].elem2]) {
			  delete elements[key].reactions[reaction].elem2;
			}
		  }
		}
	  }
  
	  if (elements[key].stateHigh) {
  
		if (Array.isArray(elements[key].stateHigh)) {
		  for (var i = 0; i < elements[key].stateHigh.length; i++) {
			if (!elements[elements[key].stateHigh[i]] && elements[key].stateHigh[i] !== null) {
			  elements[key].stateHigh.splice(i, 1);
			}
		  }
		  if (elements[key].stateHigh.length == 0) {
			delete elements[key].stateHigh;
			delete elements[key].tempHigh;
		  }
		} else {
		  if (!elements[elements[key].stateHigh] && elements[key].stateHigh !== null) {
			delete elements[key].stateHigh;
			delete elements[key].tempHigh;
		  }
		}
	  }
	  if (elements[key].stateLow) {
		if (Array.isArray(elements[key].stateLow)) {
		  for (var i = 0; i < elements[key].stateLow.length; i++) {
			if (!elements[elements[key].stateLow[i]] && elements[key].stateLow[i] !== null) {
			  elements[key].stateLow.splice(i, 1);
			}
		  }
		  if (elements[key].stateLow.length == 0) {
			delete elements[key].stateLow;
			delete elements[key].tempLow;
		  }
		} else {
		  if (!elements[elements[key].stateLow] && elements[key].stateLow !== null) {
			delete elements[key].stateLow;
			delete elements[key].tempLow;
		  }
		}
	  }
  
	  if (elements[key].burnInto) {
		if (Array.isArray(elements[key].burnInto)) {
		  for (var i = 0; i < elements[key].burnInto.length; i++) {
			if (!elements[elements[key].burnInto[i]]) {
			  delete elements[key].burnInto[i];
			}
		  }
		  if (elements[key].burnInto.length == 0) {
			delete elements[key].burnInto;
		  }
		} else {
		  if (!elements[elements[key].burnInto]) {
			delete elements[key].burnInto;
		  }
		}
	  }
  
	  if (elements[key].breakInto) {
		if (Array.isArray(elements[key].breakInto)) {
		  for (var i = 0; i < elements[key].breakInto.length; i++) {
			if (elements[key].breakInto[i] !== null && !elements[elements[key].breakInto[i]]) {
			  delete elements[key].breakInto[i];
			}
		  }
		  if (elements[key].breakInto.length == 0) {
			delete elements[key].breakInto;
		  }
		} else {
		  if (elements[key].breakInto[i] !== null && !elements[elements[key].breakInto]) {
			delete elements[key].breakInto;
		  }
		}
	  }
  
	  if (elements[key].colorPattern) {
		if (!elements[key].colorKey) {
		  delete elements[key].colorPattern;
		} else {
		  var newPattern = [];
		  for (var i = 0; i < elements[key].colorPattern.length; i++) {
			newPattern.push([]);
			var line = elements[key].colorPattern[i];
  
			for (var j = 0; j < line.length; j++) {
			  var char = line[j];
			  if (elements[key].colorKey[char]) {
				if (elements[key].colorKey[char].startsWith("#")) {
				  var rgb = hexToRGB(elements[key].colorKey[char]);
				  elements[key].colorKey[char] = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
				}
				newPattern[i].push(elements[key].colorKey[char]);
			  } else {
				newPattern[i].push("rgb(255,255,255)");
			  }
			}
		  }
		  elements[key].colorPattern = newPattern;
		  delete elements[key].colorKey;
		}
	  }
	}
  };
  
  function createWorldGenOptions() {
	for (var key in worldgentypes) {
	  document.getElementById("worldgenselect").innerHTML += "<option value='" + key + "'>" + key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + "</option>";
	}
  };
  
  function validateWorldGenSelection() {
	if (settings["worldgen"] && !worldgentypes[settings["worldgen"]]) {
	  settings["worldgen"] = "off";
	}
  };
  
  function validateRandomEventChoices() {
	for (var key in randomEventChoices) {
	  for (var i = 0; i < randomEventChoices[key].length; i++) {
		if (!elements[randomEventChoices[key][i]]) {
		  randomEventChoices[key].splice(i, 1);
		}
	  }
	}
  };
  
  function setEqualReactions(fromElement, toElement) {
	if (elements[fromElement] && elements[toElement]) {
	  if (elements[fromElement].reactions) {
		elements[toElement].reactions = elements[fromElement].reactions;
		return true;
	  };
	};
	return false;
  };
  
  function loadSettings() {
	var settingSpans = document.getElementsByClassName("setting-span");
	for (var i = 0; i < settingSpans.length; i++) {
	  var setting = settingSpans[i].getAttribute("setting");
	  if (setting in settings) {
		var settingValue = settings[setting];
		var settingElements = settingSpans[i].getElementsByTagName("select") || settingSpans[i].getElementsByTagName("input");
		if (settingElements.length > 0) {
		  settingElements[0].value = settingValue;
		}
	  }
	}
  };
  
  function setCanvasWidthAndHeight(ctx) {
	var newWidth = Math.ceil(window.innerWidth * 0.9 / pixelSize) * pixelSize;
	var newHeight = Math.ceil(window.innerHeight * 0.675 / pixelSize) * pixelSize;
  
	if (newWidth > 1000) {
	  newWidth = 1000;
	}
  
	if (window.innerWidth > 1000 && newHeight > 500) {
	  newHeight = 500;
	}
	ctx.canvas.width = newWidth;
	ctx.canvas.height = newHeight;
	document.getElementById("gameDiv").style.width = newWidth + "px";
	document.getElementById("loadingP").style.display = "none";
	document.getElementById("canvasDiv").style.display = "block";
  
	width = Math.round(newWidth / pixelSize) - 1;
	height = Math.round(newHeight / pixelSize) - 1;
  };
  
  function definePixelMap() {
	if (settings["worldgen"]) {
	  clearAll();
	} else {
  
	  pixelMap = [];
	  for (var i = 0; i < width; i++) {
		pixelMap[i] = [];
	  }
	}
  };
  
  function setRandomChoices() {
	randomChoices = Object.keys(elements).filter(function(e) {
	  return elements[e].excludeRandom != true && elements[e].category != "tools" && !elements[e].tool;
	});
  };
  
  function addCanvasAndWindowListeners(gameCanvas) {
	gameCanvas.addEventListener("mousedown", mouseClick);
	gameCanvas.addEventListener("touchstart", mouseClick, {
	  passive: false
	});
	window.addEventListener("mouseup", mouseUp);
	window.addEventListener("touchend", mouseUp, {
	  passive: false
	});
	window.addEventListener("mousemove", mouseMove);
	gameCanvas.addEventListener("touchmove", mouseMove, {
	  passive: false
	});
	gameCanvas.addEventListener("wheel", wheelHandle);
  };
  
  function generateModManagerList() {
	if (enabledMods.length > 0) {
	  modManagerList = document.getElementById("modManagerList");
	  for (var i = 0; i < enabledMods.length; i++) {
		var mod = enabledMods[i];
  
		var modName = mod.split("/").pop();
		modManagerList.innerHTML += "<li><a href='" + mod + "' target='_blank'>" + modName + "</a> <span class='removeModX' onclick='removeMod(\"" + mod + "\")'>X</span></li>";
	  }
	} else {
	  document.getElementById("noMods").style.display = "block";
	}
  };
  
  function addKeyboardListeners() {
	document.addEventListener("keydown", function(e) {
	  if (e.ctrlKey || e.metaKey) {
		return
	  } else if (e.keyCode == 9) {
		document.body.classList.add("usingTab");
	  }
  
	  if (e.keyCode == 112) {
		e.preventDefault();
		if (document.getElementById("underDiv").style.display == "none") {
		  document.getElementById("underDiv").style.display = "block";
		  document.getElementById("pagetitle").style.display = "block";
		  document.getElementById("colorSelector").style.display = "block";
		  document.getElementById("bottomInfoBox").style.display = "block";
		} else {
		  document.getElementById("underDiv").style.display = "none";
		  if (showingMenu) {
			closeMenu()
		  };
		  document.getElementById("pagetitle").style.display = "none";
		  document.getElementById("colorSelector").style.display = "none";
		  document.getElementById("bottomInfoBox").style.display = "none";
		}
	  }
	  if (showingMenu) {
  
		if (e.keyCode == 27 || (e.keyCode == 191 && showingMenu == "info") || e.keyCode == 9 || (e.keyCode == 220 && showingMenu == "settings")) {
		  e.preventDefault();
		  closeMenu();
		} else if (e.keyCode == 13 && showingMenu == "info") {
		  var infoSearch = document.getElementById("infoSearch");
		  infoSearch.value = "";
		  showInfo();
		}
		return;
	  }
	  if (e.keyCode == 219 || e.keyCode == 189) {
		if (shiftDown) {
		  mouseSize = 1
		} else {
		  mouseSize -= 2;
		  if (mouseSize < 1) {
			mouseSize = 1;
		  }
		}
	  }
  
	  if (e.keyCode == 221 || e.keyCode == 187) {
		if (shiftDown) {
		  mouseSize = (mouseSize + 15) - ((mouseSize + 15) % 15)
		} else {
		  mouseSize += 2;
		}
  
		if (mouseSize > (height > width ? height : width)) {
		  mouseSize = (height > width ? height : width);
		}
	  } else if (e.keyCode == 16) {
		if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
		  shiftDown = 1;
		} else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
		  shiftDown = 3;
		}
	  } else if (e.keyCode == 18) {
		if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
		  shiftDown = 2;
		} else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
		  shiftDown = 4;
		}
	  }
  
	  if (e.keyCode == 80 || e.keyCode == 32 || e.keyCode == 192 || e.keyCode == 75) {
		e.preventDefault();
		togglePause();
	  } else if (e.keyCode == 69) {
		e.preventDefault();
		chooseElementPrompt();
	  } else if (e.keyCode == 190) {
		e.preventDefault();
		doFrame();
	  } else if (e.keyCode == 191 || e.keyCode == 73) {
		e.preventDefault();
		showInfo();
	  } else if (e.keyCode == 70) {
		e.preventDefault();
		if (document.fullscreenElement) {
		  document.exitFullscreen(document.body);
		} else {
		  requestFullScreen(document.body);
		}
	  } else if (e.keyCode >= 48 && e.keyCode <= 57) {
  
		e.preventDefault();
		setView(e.keyCode - 48);
	  } else if (e.keyCode == 39) {
		e.preventDefault();
  
		var currentButton = document.querySelector(".categoryButton[current='true']");
		var currentCategory = currentButton.getAttribute("category");
  
		var nextButton = currentButton.nextElementSibling;
  
		if (nextButton == null) {
		  nextButton = document.querySelector(".categoryButton");
		}
		var nextCategory = nextButton.getAttribute("category");
		selectCategory(nextCategory);
  
		document.getElementById("categoryControls").focus();
	  } else if (e.keyCode == 37) {
		e.preventDefault();
  
		var currentButton = document.querySelector(".categoryButton[current='true']");
		var currentCategory = currentButton.getAttribute("category");
  
		var prevButton = currentButton.previousElementSibling;
  
		if (prevButton == null) {
		  prevButton = document.querySelector(".categoryButton:last-child");
		}
		var prevCategory = prevButton.getAttribute("category");
		selectCategory(prevCategory);
	  } else if (e.keyCode == 77) {
		e.preventDefault();
		closeMenu();
		showModManager();
	  } else if (e.keyCode == 220) {
		e.preventDefault();
		closeMenu();
		showSettings();
	  } else if (e.keyCode == 67 || e.keyCode == 113) {
		e.preventDefault();
		var link = document.createElement('a');
		link.setAttribute('download', 'sandboxels-screenshot.png');
		link.setAttribute('href', document.getElementById("game").toDataURL("image/png").replace("image/png", "image/octet-stream"));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	  }
  
	});
  };
  
  function addUnshiftListeners() {
	document.addEventListener("keyup", function(e) {
	  if (e.keyCode == 16 || e.keyCode == 18) {
		shiftDown = 0;
		if (shaping) {
		  shaping = 0;
		  shapeStart = null;
		}
	  }
	});
  };
  
  function createButtonsAndCountElements() {
	elementCount = 0;
	hiddenCount = 0;
	categoryList = [];
	for (var element in elements) {
	  elementCount++;
	  if (settings.cheerful && elements[element].nocheer) {
		elements[element].hidden = true;
		hiddenCount++;
		continue;
	  }
	  var category = elements[element].category;
	  if (category == null) {
		category = "other"
	  }
	  if (categoryList.indexOf(category) === -1) {
		categoryList.push(category);
	  }
	  if (elements[element].hidden && (!settings["unhide"] || (settings["unhide"] === 2 && !settings.unlocked[element]))) {
		hiddenCount++;
		continue;
	  }
	  var categoryDiv = document.getElementById("category-" + category);
	  if (categoryDiv == null) {
		createCategoryDiv(category);
		categoryDiv = document.getElementById("category-" + category);
	  }
	  createElementButton(element);
	}
  
	document.getElementById("categoryControls").children[0].click()
	document.getElementById("extraInfo").innerHTML += "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>";
	selectElement(currentElement);
	focusGame();
  };
  
  window.onload = function() {
  
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	  document.getElementById("categoryControls").style.paddingBottom = "11px";
	}
  
	for (var i = 0; i < runAfterLoadList.length; i++) {
	  runAfterLoadList[i]();
	}
  
	behaviorStringsToArrays();
  
	tripletsToRgbAndGenerateColorObjects()
  
	autoElements = {
	  "molten": {
		rgb: [
		  [2, 1.25, 0.5],
		  [2, 1, 0.5],
		  [2, 0.75, 0]
		],
		behavior: behaviors.MOLTEN,
		type: "high",
		viscosity: 10000,
		hidden: true,
		state: "liquid",
		tempDiff: -100,
	  },
	  "frozen": {
		rgb: [
		  [1.2, 1.2, 1.3]
		],
		behavior: behaviors.WALL,
		type: "low",
		hidden: true,
		state: "solid",
	  },
	  "condense": {
		rgb: [
		  [0.5, 0.5, 0.5]
		],
		behavior: behaviors.LIQUID,
		type: "low",
		hidden: true,
		state: "liquid",
	  },
	  "evaporate": {
		rgb: [
		  [1.5, 1.5, 1.5]
		],
		behavior: behaviors.GAS,
		type: "high",
		hidden: true,
		state: "gas",
	  }
	}
  
	autoGenAllElements();
  
	for (var i = 0; i < runAfterAutogenList.length; i++) {
	  runAfterAutogenList[i]();
	};
  
	doFinalChecks();
  
	createWorldGenOptions();
	validateWorldGenSelection();
  
	validateRandomEventChoices();
  
	setEqualReactions("poison", "poison_gas");
  
	loadSettings();
  
	var gameCanvas = document.getElementById("game");
  
	var ctx = gameCanvas.getContext("2d");
  
	setCanvasWidthAndHeight(ctx);
  
	mousePos = {
	  x: width / 2,
	  y: height / 2
	};
  
	definePixelMap();
  
	setRandomChoices();
  
	addCanvasAndWindowListeners(gameCanvas);
	gameCanvas.ontouchstart = function(e) {
	  if (e.touches) e = e.touches[0];
	  return false;
	}
	window.onbeforeunload = function() {
	  if (currentPixels.length < -1) {
		return 'Are you sure you want to leave?';
	  }
	};
  
	generateModManagerList();
  
	document.getElementById("game").oncontextmenu = function(e) {
	  e.preventDefault();
	  return false;
	}
  
	addKeyboardListeners();
  
	addUnshiftListeners();
  
	createButtonsAndCountElements();
  
	for (var i = 0; i < runAfterButtonsList.length; i++) {
	  runAfterButtonsList[i]();
	};
  
	selectElement(currentElement);
	focusGame();
  
	var buttonElements = document.getElementsByTagName("button");
	for (var i = 0; i < buttonElements.length; i++) {
	  buttonElements[i].onkeyup = function(e) {
		e.preventDefault();
	  }
	}
	var firstDiv = document.getElementsByClassName("category")[0];
	var firstElementButton = firstDiv.getElementsByClassName("elementButton")[0];
	selectElement(firstElementButton.getAttribute("element"));
  };