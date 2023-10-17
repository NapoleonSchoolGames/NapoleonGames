velocityBlacklist = [];

function explodeAtPlus(x, y, radius, fire = "fire", smoke = "smoke", beforeFunction = null, afterFunction = null, changeTemp = true) {

  if (fire !== null) {
    if (fire.indexOf(",") !== -1) {
      fire = fire.split(",");
    };
  };
  if (smoke !== null) {
    if (smoke.indexOf(",") !== -1) {
      smoke = smoke.split(",");
    };
  };
  var coords = circleCoords(x, y, radius);
  var power = radius / 10;

  for (var i = 0; i < coords.length; i++) {

    var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x - x, 2) + Math.pow(coords[i].y - y, 2)))) / radius;

    damage = 1 - damage;
    if (damage < 0) {
      damage = 0;
    }
    damage *= power;
    if (isEmpty(coords[i].x, coords[i].y)) {

      if (damage < 0.02) {} else if (damage < 0.2) {

        if (smoke !== null) {
          if (Array.isArray(smoke)) {
            createPixel(smoke[Math.floor(Math.random() * smoke.length)], coords[i].x, coords[i].y);
          } else {
            createPixel(smoke, coords[i].x, coords[i].y);
          }
        }
      } else {
        if (fire !== null) {

          if (Array.isArray(fire)) {
            createPixel(fire[Math.floor(Math.random() * fire.length)], coords[i].x, coords[i].y);
          } else {
            createPixel(fire, coords[i].x, coords[i].y);
          }
        }
      }
    } else if (!outOfBounds(coords[i].x, coords[i].y)) {

      var pixel = pixelMap[coords[i].x][coords[i].y];
      var info = elements[pixel.element];
      if (typeof(beforeFunction) === "function") {
        beforeFunction(pixel, x, y, radius, fire, smoke, power, damage);
      };
      if (info.hardness) {
        if (info.hardness < 1) {
          damage = damage * ((1 - info.hardness) * 10);
        } else {
          damage = 0;
        }
      }
      if (damage > 0.9) {
        if (fire !== null) {
          if (Array.isArray(fire)) {
            var newfire = fire[Math.floor(Math.random() * fire.length)];
          } else {
            var newfire = fire;
          }
          changePixel(pixel, newfire, changeTemp);
        } else {
          deletePixel(pixel.x, pixel.y);
        }
        continue;
      } else if (damage > 0.25) {
        if (info.breakInto) {

          if (Array.isArray(info.breakInto)) {
            var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
          } else {
            var result = info.breakInto;
          }
          if (typeof(breakIntoElement) === "undefined") {
            deletePixel(pixel.x, pixel.y);
            continue
          };

          changePixel(pixel, result, changeTemp);
          if (info.onExplosionBreakOrSurvive) {
            info.onExplosionBreakOrSurvive(pixel, x, y, radius, fire, smoke, power, damage);
          };
          continue;
        } else {
          if (fire !== null) {
            if (Array.isArray(fire)) {
              var newfire = fire[Math.floor(Math.random() * fire.length)];
            } else {
              var newfire = fire;
            }
            changePixel(pixel, newfire, changeTemp);
          } else {
            deletePixel(pixel.x, pixel.y);
          }
          continue;
        }
      } else {
        if (info.onExplosionBreakOrSurvive) {
          info.onExplosionBreakOrSurvive(pixel, x, y, radius, fire, smoke, power, damage);
        };
      }
      if (damage > 0.75 && info.burn) {
        pixel.burning = true;
        pixel.burnStart = pixelTicks;
      }
      pixel.temp += damage * radius * power;
      pixelTempCheck(pixel);
      if (enabledMods.includes("mods/velocity.js")) {

        if (!elements[pixel.element].excludeRandom && !elements[pixel.element].excludeVelocity) {
          var angle = Math.atan2(pixel.y - y, pixel.x - x);
          pixel.vx = Math.round((pixel.vx | 0) + Math.cos(angle) * (radius * power / 10));
          pixel.vy = Math.round((pixel.vy | 0) + Math.sin(angle) * (radius * power / 10));
        }
      };
      if (typeof(afterFunction) === "function") {

        afterFunction(pixel, x, y, radius, fire, smoke, power, damage);
      };
    };
  };

  elements.random.extraInfo = "Produces random pixels.";
  elements.pick.extraInfo = "Picks a selected pixel. Works with hidden elements as well.";
  elements.mix.extraInfo = "Mixes pixels in the selection box.";
  elements.lookup.extraInfo = "Brings up the info screen of a selected pixel.";
  elements.shock.extraInfo = "Produces electricity on all pixels in the selection box that can conduct it.";
  elements.uncharge.extraInfo = "Removes electricity on all pixels in the selection box with electricity.";
  elements.smash.extraInfo = "Crushes all elements in the selection box as if they were destroyed by an explosion.";
  elements.cook.extraInfo = "Slowly heats up elements.";
  elements.heat.extraInfo = "Heats up elements.";
  elements.cool.extraInfo = "Cools down elements.";

  elements.bamboo_plant.extraInfo = "Plants a bamboo plant of variable height.";
  elements.sapling.extraInfo = "Plants a tree of variable height and structure.";
  elements.grass_seed.extraInfo = "Plants grass of variable height.";
  elements.wheat_seed.extraInfo = "Plants wheat of variable height.";
  elements.flower_seed.extraInfo = "Plants a flower of variable height.";
  elements.vine.extraInfo = "Holds onto a surface and grows downwards.";
  elements.mushroom_spore.extraInfo = "Plants a mushroom of variable height and structure.";
  elements.corn_seed.extraInfo = "Plants corn of variable height.";
  elements.potato_seed.extraInfo = "Digs through dirt and creates potatoes.";
  elements.grass_seed.extraInfo = "Plants grass of variable height.";
  elements.electric.extraInfo = "Produces a brief electrical spark.";
  elements.neon.extraInfo = "Glows when powered.";
  elements.led_r.extraInfo = "Lights up when powered.";
  elements.led_g.extraInfo = "Lights up when powered.";
  elements.led_b.extraInfo = "Lights up when powered.";
  elements.ecloner.extraInfo = "Clones the first pixel that touches it when powered.";
  elements.cloner.extraInfo = "Clones the first pixel that touches it.";
  elements.slow_cloner.extraInfo = "Clones the first pixel that touches it.";
  elements.clone_powder.extraInfo = "Clones the first pixel that touches it.";
  elements.floating_cloner.extraInfo = "Clones the first pixel that touches it.";
  elements.filler.extraInfo = "Fills the entire screen orthogonally.";
  elements.lattice.extraInfo = "Fills the entire screen diagonally.";
  elements.battery.extraInfo = "Produces electricity.";
  elements.antipowder.extraInfo = "Moves in reverse.";
  elements.antifluid.extraInfo = "Moves in reverse.";
  elements.antimolten.extraInfo = "Moves in reverse.";
  elements.antifire.extraInfo = "Moves in reverse.";
  elements.antigas.extraInfo = "Moves in reverse.";
  elements.static.extraInfo = "Flickers in grayscale.";
  elements.gray_goo.extraInfo = "Duplicates itself when touching other pixels.";
  elements.virus.extraInfo = "Duplicates itself when touching other pixels.";
  elements.snake.extraInfo = "Goes around in a snake-like pattern.";
  elements.shocker.extraInfo = "Produces sparks when powered.";
  elements.pressure_plate.extraInfo = "Produces electricity when something is above it.";
  elements.light_bulb.extraInfo = "Produces light when powered.";
  elements.tesla_coil.extraInfo = "Produces plasma when powered.";
  elements.border.extraInfo = "Produces a border effect.";

};