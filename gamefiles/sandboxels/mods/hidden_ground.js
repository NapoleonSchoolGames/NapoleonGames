runAfterLoad(function() {
	if (enabledMods.includes("mods/the_ground.js")) {
	  let regexRocks = /(granite)|(rhyolite)|(pumice)|(obsidian)|(dacite)|(dacidian)|(andesite)|(diorite)|(scoria)|(andesidian)|(gabbro)|(basalt)|(basalidian)|(peridotite)|(komatiite)|(komatidian)/
	  let regexType = /(_gravel)|(_sand)|(_sandstone)|(_dust)|(_shard)|(hot_)/
	  let toHide = ["dry_permafrost", "hot_sand", "hot_dirt", "hot_rock", "hot_rock_wall", "hot_gravel", "hot_limestone", "hot_calcium_carbonate_dust", "sandy_water", "clay_water", "dry_clay_loam"]
  
	  for (let elem in elements) {
		if (typeof(elements[elem]) == "object" && regexRocks.test(elem)) {
  
		  if (/_wall/.test(elem)) {
			elements[elem].category = "solids"
		  }
  
		  if (regexType.test(elem)) {
			elements[elem].hidden = true;
		  }
		}
	  }
  
	  for (let elem of toHide) {
		if (typeof(elements[elem]) == "object") {
		  elements[elem].hidden = true;
		}
	  }
  
	} else {
	  enabledMods.splice(enabledMods.indexOf("mods/hidden_ground.js"), 1);
	  localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	  alert("Hidden Ground: This mod requires The Ground mod. Removing mod and reloading.");
	  window.location.reload();
	}
  })