let __needRefresh = false;

window.addEventListener("load", e => {
  if (__needRefresh) location.reload();
});

function requireMods(mods, cal) {
  if (__checkMods(mods)) {

    cal();
  } else {
    __installMods(mods);
    __needRefresh = true;
  }
}

function __getMissingMods(mods) {
  let missing = [];
  for (let i = 0; i < mods.length; i++) {
    if (enabledMods.includes(mods[i])) {
      continue;
    }
    missing.push(mods[i]);
  }
  return missing;
}

function __checkMods(mods) {
  return __getMissingMods(mods).length === 0;
}

function __installMods(mods) {
  __getMissingMods(mods).forEach(mod => __installMod(mod));
}

function __installMod(mod) {
  let mods = JSON.parse(localStorage.getItem("enabledMods") || "[]");
  mods.push(mod);
  localStorage.setItem("enabledMods", JSON.stringify(mods));
}

window.requireMods = requireMods;