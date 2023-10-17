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
};