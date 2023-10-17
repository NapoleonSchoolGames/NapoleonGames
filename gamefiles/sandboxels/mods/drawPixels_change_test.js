oldDrawPixels = drawPixels;

suffixFunction = function() {

  var newCurrentPixels = currentPixels;
  var pixelsFirst = [];
  var pixelsLast = [];
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");

  for (var i = 0; i < newCurrentPixels.length; i++) {
    pixel = newCurrentPixels[i];

    if (pixel.del) {
      continue
    };
    if (elements[pixel.element].isGas) {
      pixelsLast.push(pixel);
    } else {
      pixelsFirst.push(pixel);
    }
  }

  var pixelDrawList = pixelsFirst.concat(pixelsLast);
  for (var i = 0; i < pixelDrawList.length; i++) {
    pixel = pixelDrawList[i];
    if (pixelMap[pixel.x][pixel.y] == undefined) {
      continue
    }
    if (pixel.burning && view !== 2) {

      ctx.fillStyle = "rgba(255,0,0,0.5)";
      ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);

    }
  }
}

drawPixels = function(forceTick = false) {
  oldDrawPixels(forceTick);
  suffixFunction();
};