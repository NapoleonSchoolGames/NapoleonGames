if (elements.explosion) {
    elements.explosion.category = "tools";
  }
  for (var element in elements) {
    if (elements[element].category !== "tools") {

      elements[element].hidden = true;

      elements[element].category = "alchemy mod";
    }
  }

  settings.unhide = 2;

  if (!settings.unlocked.alchemymod) {
    settings.unlocked = {
      "oxygen": true,
      "dirt": true,
      "fire": true,
      "water": true,
      "alchemymod": true,
    };
  }