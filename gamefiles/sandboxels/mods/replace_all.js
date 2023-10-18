elements.replace_all = {
	color: "#ef7f3f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
	  if (pixel.charge) {
  
		if (!outOfBounds(pixel.x, pixel.y + 1) && !isEmpty(pixel.x, pixel.y + 1) && !outOfBounds(pixel.x, pixel.y - 1) && !isEmpty(pixel.x, pixel.y - 1)) {
  
		  if (pixelMap[pixel.x][pixel.y - 1].element != pixel.element) {
  
			pixel.target = pixelMap[pixel.x][pixel.y + 1].element
  
			pixel.replacement = pixelMap[pixel.x][pixel.y - 1].element
  
			pixel.active = true
  
		  }
		}
	  }
	  if (pixel.active) {
  
		if (pixel.target && pixel.replacement) {
  
		  for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
			  if (isEmpty(i, j, true) == false) {
  
				if (pixelMap[i][j].element == pixel.target) {
  
				  if (isEmpty(i, j, true) == false) {
					changePixel(pixelMap[i][j], pixel.replacement)
				  }
				}
			  }
			}
		  }
		}
		pixel.active = false
		if (pixel.charge) {
		  delete pixel.charge
		}
		if (pixel.chargeCD) {
		  delete pixel.chargeCD
		}
	  }
	},
	category: "special",
	state: "solid",
	density: 1,
	conduct: elements.water.conduct + 0.1,
  }